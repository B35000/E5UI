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
import Tags from './../components/tags';
import ViewGroups from './../components/view_groups'
import TextInput from './../components/text_input';
import NumberPicker from './../components/number_picker';
import DurationPicker from './../components/duration_picker';
import QRCode from "react-qr-code";
import { parseBlob } from 'music-metadata';
import { uint8ArrayToBase64 } from 'uint8array-extras';
import EndImg from './../assets/end_token_icon.png';

import Dialog from "@mui/material/Dialog";
import { SwipeableList, SwipeableListItem } from '@sandstreamdev/react-swipeable-list';
import '@sandstreamdev/react-swipeable-list/dist/styles.css';

// import { ethToEvmos, evmosToEth } from '@evmos/address-converter'
import { from } from "@iotexproject/iotex-address-ts";
import imageCompression from 'browser-image-compression';
import * as pdfjsLib from 'pdfjs-dist/build/pdf';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';
import { constants } from 'buffer';

const { toBech32, fromBech32,} = require('@harmony-js/crypto');
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

var bigInt = require("big-integer");
const ecies = require('ecies-geth');


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

function bgN(number, power) {
  return bigInt((number+"e"+power)).toString();
}

function start_and_end(str) {
  if (str.length > 13) {
    return str.substr(0, 6) + '...' + str.substr(str.length-6, str.length);
  }
  return str;
}

class StackPage extends Component {
    
    state = {
        selected: 0,
        get_stack_page_tags_object: this.get_stack_page_tags_object(),

        get_themes_tags_object: this.get_theme_tags_object(),
        get_orientation_tags_object: this.get_orientation_tags_object(),
        get_selected_e5_tags_object: this.get_selected_e5_tags_object(),
        get_selected_storage_tags_object: this.get_selected_storage_tags_object(),
        get_refresh_speed_tags_object: this.get_refresh_speed_tags_object(),
        get_masked_data_tags_object: this.get_masked_data_tags_object(),
        get_content_channeling_object: this.get_content_channeling_object(),
        get_content_language_object: this.get_content_language_object(),
        get_content_filtered_setting_object: this.get_content_filtered_setting_object(),
        get_tabs_tags_object: this.get_tabs_tags_object(),
        get_storage_permissions_tags_object: this.get_storage_permissions_tags_object(),
        get_stack_optimizer_tags_object: this.get_stack_optimizer_tags_object(),
        get_homepage_tags_position_tags_object: this.get_homepage_tags_position_tags_object(),
        get_preferred_font_tags_object: this.get_preferred_font_tags_object(),
        get_skip_nsfw_warning_tags_object: this.get_skip_nsfw_warning_tags_object(),
        get_graph_type_tags_object: this.get_graph_type_tags_object(),
        get_remember_account_tags_object: this.get_remember_account_tags_object(),
        get_file_data_option_tags_object: this.get_file_data_option_tags_object(),
        get_upload_storage_option_tags_object: this.get_upload_storage_option_tags_object(),
        get_hide_pip_tags_object:this.get_hide_pip_tags_object(),
        get_preferred_currency_tags_object:this.get_preferred_currency_tags_object(),
        get_minified_content_setting_object:this.get_minified_content_setting_object(),
        get_auto_run_setting_object:this.get_auto_run_setting_object(),

        get_wallet_thyme_tags_object:this.get_wallet_thyme_tags_object(),
        gas_history_chart_tags_object:this.get_gas_history_chart_tags_object(),

        typed_word:'',added_tags:[],set_salt: 0,
        run_gas_limit:0, run_gas_price:0, hidden:[], invalid_ether_amount_dialog_box: false,

        typed_contact_word:'', typed_alias_word:'', typed_blocked_account_word:'',
        run_time_expiry:0, confirm_clear_stack_dialog:false,

        picked_max_priority_per_gas_amount:0,
        picked_max_fee_per_gas_amount:0,

        typed_watch_account_input:'', sign_data_input:'', selected_signature_e5: this.props.app_state.default_e5, verify_signed_data_input:'', signed_data_input:'', storage_email_input:'',

        default_upload_limit:(0), custom_gateway_text:'', follow_account_text:'', censor_keyword_text:'', search_identifier:'', stack_size_in_bytes:0, is_calculating_stack:{}, can_switch_e5s:true,
    };

    get_stack_page_tags_object(){
        var obj = {
            'i':{
                active:'e', 
            },
            'e':[
                ['or','',0], ['e','e.'+this.props.app_state.loc['1260']/* 'e.stack-data' */,'e.'+this.props.app_state.loc['1261']/* 'e.settings-data' */, 'e.'+this.props.app_state.loc['1262']/* 'e.account-data' */, 'e.'+this.props.app_state.loc['1593aj']/* 'e.signatures' */, this.props.app_state.loc['1593x']/* 'Watch 👁️' */, this.props.app_state.loc['1593gf']/* 'iTransfer 💳'' */], [0]
            ],
            'stack-data':[
              ['xor','e',1], [this.props.app_state.loc['1260']/* 'stack-data' */,this.props.app_state.loc['1408']/* 'stack 📥' */,this.props.app_state.loc['1409']/* 'history 📜' */], [1],[1]
            ],
            'settings-data':[
              ['xor','e',1], [this.props.app_state.loc['1261']/* 'settings-data' */,this.props.app_state.loc['1410']/* settings ⚙️' */,this.props.app_state.loc['1411']/* 'wallet 👛' */, this.props.app_state.loc['1593ba']/* 'storage 💾' */, this.props.app_state.loc['1593cr']/* 'gateway 🚧' */ ], [1],[1]
            ],
            'account-data':[
              ['xor','e',1], [this.props.app_state.loc['1262']/* 'account-data' */,this.props.app_state.loc['1412']/* 'alias 🏷️' */,this.props.app_state.loc['1413']/* 'contacts 👤' */, this.props.app_state.loc['1414']/* 'blacklisted 🚫' */, this.props.app_state.loc['1593df']/* 'following 👥' */, this.props.app_state.loc['1593dq']/* 'Censor 🚫' */], [1],[1]
            ],
            'signatures':[
              ['xor','e',1], [this.props.app_state.loc['1593aj']/* 'signatures' */,this.props.app_state.loc['1593ak']/* 'sign' */,this.props.app_state.loc['1593al']/* 'verify' */], [1],[1]
            ],
        };

        obj[this.props.app_state.loc['1260']/* 'stack-data' */] = [
              ['xor','e',1], [this.props.app_state.loc['1260']/* 'stack-data' */,this.props.app_state.loc['1408']/* 'stack 📥' */,this.props.app_state.loc['1409']/* 'history 📜' */], [1],[1]
            ]
        obj[this.props.app_state.loc['1261']/* 'settings-data' */] = [
              ['xor','e',1], [this.props.app_state.loc['1261']/* 'settings-data' */,this.props.app_state.loc['1410']/* settings ⚙️' */,this.props.app_state.loc['1411']/* 'wallet 👛' */, this.props.app_state.loc['1593ba']/* 'storage 💾' *//* , this.props.app_state.loc['1593cr'] *//* 'gateway 🚧' */, ], [1],[1]
            ]
        obj[this.props.app_state.loc['1262']/* 'account-data' */] = [
              ['xor','e',1], [this.props.app_state.loc['1262']/* 'account-data' */,this.props.app_state.loc['1412']/* 'alias 🏷️' */,this.props.app_state.loc['1413']/* 'contacts 👤' */, this.props.app_state.loc['1414']/* 'blacklisted 🚫' */, this.props.app_state.loc['1593df']/* 'following 👥' */, this.props.app_state.loc['1593dq']/* 'Censor 🚫' */], [1],[1]
            ]
        obj[this.props.app_state.loc['1593aj']/* 'signatures' */] = [
              ['xor','e',1], [this.props.app_state.loc['1593aj']/* 'signatures' */,this.props.app_state.loc['1593ak']/* 'sign' */,this.props.app_state.loc['1593al']/* 'verify' */], [1],[1]
            ]

        return obj
        
    }

    get_gas_history_chart_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e','1h','24h', '7d', '30d', '6mo', this.props.app_state.loc['1416']/* 'all-time' */], [4]
            ],
        };
    }

    get_wallet_thyme_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e','a','i','o','u','?','$','%','#','!'], [1]
            ],
        };
    }





    get_theme_tags_object(){
        var theme_stage = this.props.app_state.get_theme_stage_tags_object
        const my_state_color = this.get_my_state_color('dark');
        const my_state_color_light = this.get_my_state_color('light');
        const my_state_code = this.props.app_state.device_country_code
        const obj = {
            'none':['e',this.props.app_state.loc['1417']/* 'light' */,this.props.app_state.loc['1418']/* 'dark' */, this.props.app_state.loc['1593a']/* 'auto' */], 
            
            'darkcolor-available':['e',this.props.app_state.loc['1417']/* 'light' */,this.props.app_state.loc['1418']/* 'dark' */, my_state_color, this.props.app_state.loc['1593a']/* 'auto' */], 
            
            'lightcolor-available':['e',this.props.app_state.loc['1417']/* 'light' */,this.props.app_state.loc['1418']/* 'dark' */, this.props.app_state.loc['2740']/* midnight */, my_state_color, my_state_color_light, this.props.app_state.loc['1593a']/* 'auto' */],
            
            'all-available':['e',this.props.app_state.loc['1417']/* 'light' */,this.props.app_state.loc['1418']/* 'dark' */, this.props.app_state.loc['2740']/* midnight */, this.props.app_state.loc['2741']/* green */,this.props.app_state.loc['3056']/* 'light-green' */, this.props.app_state.loc['3057']/* 'red' */,this.props.app_state.loc['3058']/* 'light-red' */, this.props.app_state.loc['3059']/* 'blue' */,this.props.app_state.loc['3060']/* 'light-blue' */, this.props.app_state.loc['3061']/* 'yellow' */,this.props.app_state.loc['3062']/* 'light-yellow' */,  this.props.app_state.loc['3063']/* 'pink' */,this.props.app_state.loc['3064']/* 'light-pink' */,  this.props.app_state.loc['3065']/* 'orange' */, this.props.app_state.loc['3066']/* 'light-orange' */, this.props.app_state.loc['1593a']/* 'auto' */]
        }
        if(my_state_code === '254'){
            var dark = this.get_254_state_colors('dark')
            var light = this.get_254_state_colors('light')
            obj['darkcolor-available'] = dark;
            obj['lightcolor-available'] = light;
        }

        // var theme_stage = 'all-available'
        var final_array = obj[theme_stage]
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], final_array, [this.get_light_dark_option(final_array)]
            ],
        };
    }

    get_254_state_colors(theme){
        const country_data = this.props.app_state.country_data
        const included_states = this.props.app_state.allowed_countries

        var selected_objs = country_data.filter(function (el) {
            return (included_states.includes(el['name']))
        });

        var colors = []
        selected_objs.forEach(element => {
            if(!colors.includes(element['color'][0])){
                colors.push(element['color'][0])
            }
        });
        
        var obj = {
            'g':this.props.app_state.loc['2741']/* green */, 
            'r':this.props.app_state.loc['3057']/* 'red' */, 
            'b':this.props.app_state.loc['3059']/* 'blue' */, 
            'y':this.props.app_state.loc['3061']/* 'yellow' */, 
            'p':this.props.app_state.loc['3063']/* 'pink' */, 
            'o':this.props.app_state.loc['3065']/* 'orange' */
        }
        var obj2 = {
            'g':this.props.app_state.loc['3056']/* 'light-green' */, 
            'r':this.props.app_state.loc['3058']/* 'light-red' */, 
            'b':this.props.app_state.loc['3060']/* 'light-blue' */, 
            'y':this.props.app_state.loc['3062']/* 'light-yellow' */, 
            'p':this.props.app_state.loc['3064']/* 'light-pink' */, 
            'o':this.props.app_state.loc['3066']/* 'light-orange' */
        }
        var array = ['e',]
        for(var i = 0; i<colors.length; i++){
            array.push(obj[colors[i]])
            if(theme === 'light'){
               array.push(obj2[colors[i]]) 
            }
        }
        return array
    }

    get_my_state_color(theme){
        const my_state_code = this.props.app_state.device_country_code
        const country_data = this.props.app_state.country_data

        var selected_objs = country_data.filter(function (el) {
            return (el['code'] === my_state_code)
        });

        var color = 'g'
        if(selected_objs.length > 0){
            color = selected_objs[0]['color'][0];
        }

        var obj = {
            'g':this.props.app_state.loc['2741']/* green */, 
            'r':this.props.app_state.loc['3057']/* 'red' */, 
            'b':this.props.app_state.loc['3059']/* 'blue' */, 
            'y':this.props.app_state.loc['3061']/* 'yellow' */, 
            'p':this.props.app_state.loc['3063']/* 'pink' */, 
            'o':this.props.app_state.loc['3065']/* 'orange' */
        }
        if(theme === 'light'){
            obj = {
                'g':this.props.app_state.loc['3056']/* 'light-green' */, 
                'r':this.props.app_state.loc['3058']/* 'light-red' */, 
                'b':this.props.app_state.loc['3060']/* 'light-blue' */, 
                'y':this.props.app_state.loc['3062']/* 'light-yellow' */, 
                'p':this.props.app_state.loc['3064']/* 'light-pink' */, 
                'o':this.props.app_state.loc['3066']/* 'light-orange' */
            } 
        }
        return obj[color]
    }

    get_light_dark_option(final_array){
        var pos = final_array.indexOf(this.props.app_state.theme['name'])
        if(pos == -1) return 1
        else return pos
    }

    set_light_dark_setting_tag(){
        this.setState({get_themes_tags_object: this.get_theme_tags_object()})
    }





    get_orientation_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e',this.props.app_state.loc['1419']/* 'right' */,this.props.app_state.loc['1420']/* 'left' */], [1]
            ],
        };
        
    }




    get_selected_e5_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e',/* 'E15', */ 'E25', /* ,'E35' *//* , 'E45' */ /* 'E55', */ /* 'E65' *//* , 'E75' *//* , 'E85' *//* 'E95' *//* , 'E105' */ /* 'E115' *//* , 'E125' *//* , 'E135' */ /* 'E145', *//* 'E155' */ /* 'E165' */ /* 'E175' */], [this.get_selected_e5_option()]
            ],
        };
    }

    get_selected_e5_option(){
        var obj = {'E25':1,'E35':0,'E45':0,'E55':0,'E65':0,'E75':0,'E85':0,'E95':0, 'E105':0, 'E115':0, 'E125':0, 'E135':0,'E145':0, 'E155':0, 'E165':0, 'E175':0}
        if(obj[this.props.app_state.selected_e5] == null) return 1
        return obj[this.props.app_state.selected_e5]
    }

    set_e5_option_tag(){
        this.setState({get_selected_e5_tags_object: this.get_selected_e5_tags_object(),})
    }




    get_selected_storage_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e', this.props.app_state.loc['1593cw']/* 'nitro 🛰️' */, /* 'infura', */ 'arweave'], [this.get_selected_storage_option()]
            ],
        };
    }

    get_selected_storage_option(){
        // if(this.props.app_state.storage_option == 'infura'){
        //     return 0
        // }
        // else 
        if(this.props.app_state.storage_option == this.props.app_state.loc['1593cw']/* 'nitro 🛰️' */){
            return 1
        }
        else if(this.props.app_state.storage_option == 'arweave'){
            return 2
        }
        
        return 1;
    }

    set_storage_option_tag(){
        this.setState({get_selected_storage_tags_object: this.get_selected_storage_tags_object(),})
    }




    get_refresh_speed_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e',this.props.app_state.loc['1421']/* 'sluggish' */,this.props.app_state.loc['1422'] /* 'slow' */,this.props.app_state.loc['1423']/* 'average' */, this.props.app_state.loc['1424']/* 'fast' */], [this.get_selected_refresh_speed_option()]
            ],
        };
    }

    get_selected_refresh_speed_option(){
        if(this.props.app_state.refresh_speed == this.props.app_state.loc['1421']/* 'sluggish' */){
            return 1
        }
        else if(this.props.app_state.refresh_speed == this.props.app_state.loc['1422']/* 'slow' */){
            return 2
        }
        else if(this.props.app_state.refresh_speed == this.props.app_state.loc['1423']/* 'average' */){
            return 3
        }
        else if(this.props.app_state.refresh_speed == this.props.app_state.loc['fast']/* 'fast' */){
            return 4
        }
        return 1;
    }

    set_refresh_speed_tag(){
        this.setState({get_refresh_speed_tags_object: this.get_refresh_speed_tags_object(),})
    }




    get_masked_data_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['or','',0], ['e',this.props.app_state.loc['1425']/* 'hide' */], [this.get_selected_masked_data_option()]
            ],
        };
    }

    get_selected_masked_data_option(){
        if(this.props.app_state.masked_content == 'e'){
            return 0
        }
        else if(this.props.app_state.masked_content == this.props.app_state.loc['1425']/* 'hide' */){
            return 1
        }
        return 0;
    }

    set_masked_content_tag(){
        this.setState({get_masked_data_tags_object: this.get_masked_data_tags_object(),})
    }




    get_content_channeling_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e',this.props.app_state.loc['1231']/* 'local' */,this.props.app_state.loc['1232']/* 'language' */,this.props.app_state.loc['1233']/* 'international' */], [this.get_content_channeling_option()]
            ],
        };
    }

    get_content_channeling_option(){
        if(this.props.app_state.content_channeling == this.props.app_state.loc['1231']/* 'local' */){
            return 1
        }
        else if(this.props.app_state.content_channeling == this.props.app_state.loc['1232']/* 'language' */){
            return 2
        }
        else if(this.props.app_state.content_channeling == this.props.app_state.loc['1233']/* 'international' */){
            return 3
        }
        return 1;
    }

    set_content_channeling_tags(){
        this.setState({get_content_channeling_object: this.get_content_channeling_object(),})
    }





    get_content_language_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e'].concat(this.get_languages()), [this.get_content_language_option()]
            ],
        };
    }

    get_languages(){
        var languages = ['ar'/* arabic */, 'de'/* german */, 'en'/* english */, 'es'/* spanish */, 'fr'/* french */, 'hi'/* hindi */, 'ja'/* japanese */, 'ko'/* korean */,'pt'/* portuguese */, 'ru'/* russian */, 'sw'/* swahili */, 'tr'/* turkish */, 'zh'/* chinese */]
        return languages
    }

    get_content_language_option(){
        if(this.props.app_state.device_language == 'ar'){
            return 1
        }
        else if(this.props.app_state.device_language == 'de'){
            return 2
        }
        else if(this.props.app_state.device_language == 'en'){
            return 3
        }
        else if(this.props.app_state.device_language == 'es'){
            return 4
        }
        else if(this.props.app_state.device_language == 'fr'){
            return 5
        }
        else if(this.props.app_state.device_language == 'hi'){
            return 6
        }
        else if(this.props.app_state.device_language == 'ja'){
            return 7
        }
        else if(this.props.app_state.device_language == 'ko'){
            return 8
        }
        else if(this.props.app_state.device_language == 'pt'){
            return 9
        }
        else if(this.props.app_state.device_language == 'ru'){
            return 10
        }
        else if(this.props.app_state.device_language == 'sw'){
            return 11
        }
        else if(this.props.app_state.device_language == 'tr'){
            return 12
        }
        else if(this.props.app_state.device_language == 'zh'){
            return 13
        }
        return 1;
    }

    set_content_language_tags(){
        this.setState({get_content_language_object: this.get_content_language_object(),})
    }





    get_content_filtered_setting_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e',this.props.app_state.loc['1426']/* 'all' */, this.props.app_state.loc['1427'] /* 'filtered' */], [this.get_content_filter_settings_option()]
            ],
        };
    }

    get_content_filter_settings_option(){
        if(this.props.app_state.section_tags_setting == this.props.app_state.loc['1426']/* 'all' */){
            return 1
        }
        else if(this.props.app_state.section_tags_setting == this.props.app_state.loc['1427']/* 'filtered' */){
            return 2
        }
        return 1
    }

    set_content_filter_settings_tags(){
        this.setState({get_content_filtered_setting_object: this.get_content_filtered_setting_object(),})
    }







    get_tabs_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['or','',0], ['e',this.props.app_state.loc['1428']/* 'enabled' */], [this.get_selected_tabs_data_option()]
            ],
        };
    }

    get_selected_tabs_data_option(){
        if(this.props.app_state.visible_tabs == 'e'){
            return 0
        }
        else if(this.props.app_state.visible_tabs == this.props.app_state.loc['1428']/* 'enabled' */){
            return 1
        }
        return 0;
    }

    set_tabs_tag(){
        this.setState({get_tabs_tags_object: this.get_tabs_tags_object(),})
    }








    get_storage_permissions_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['or','',0], ['e',this.props.app_state.loc['1428']/* 'enabled' */], [this.get_selected_storage_permissions_option()]
            ],
        };
    }

    get_selected_storage_permissions_option(){
        if(this.props.app_state.storage_permissions == 'e'){
            return 0
        }
        else if(this.props.app_state.storage_permissions == this.props.app_state.loc['1428']/* 'enabled' */){
            return 1
        }
        return 0;
    }

    set_storage_permissions_tag(){
        this.setState({get_storage_permissions_tags_object: this.get_storage_permissions_tags_object(),})
    }










    get_stack_optimizer_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['or','',0], ['e',this.props.app_state.loc['1428']/* 'enabled' */], [this.get_selected_stack_optimizer_option()]
            ],
        };
    }

    get_selected_stack_optimizer_option(){
        if(this.props.app_state.stack_optimizer == 'e'){
            return 0
        }
        else if(this.props.app_state.stack_optimizer == this.props.app_state.loc['1428']/* 'enabled' */){
            return 1
        }
        return 0;
    }

    set_stack_optimizer_tag(){
        this.setState({get_stack_optimizer_tags_object: this.get_stack_optimizer_tags_object(),})
    }









    get_homepage_tags_position_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e',this.props.app_state.loc['1593k']/* 'top' */, this.props.app_state.loc['1593l']/* 'bottom' */], [this.get_homepage_tags_position_option()]
            ],
        };
    }

    get_homepage_tags_position_option(){
        if(this.props.app_state.homepage_tags_position == this.props.app_state.loc['1593k']/* 'top' */){
            return 1
        }
        else if(this.props.app_state.homepage_tags_position == this.props.app_state.loc['1593l']/* 'bottom' */){
            return 2
        }
        return 1;
    }

    set_homepage_tags_position_tag(){
        this.setState({get_homepage_tags_position_tags_object: this.get_homepage_tags_position_tags_object(),})
    }






    get_preferred_font_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e','Sans-serif','Courier New','Times New Roman','ComicSans','papyrus'], [this.get_selected_font_option()]
            ],
        };
    }

    get_selected_font_option(){
        var obj = {'Sans-serif':1,'Courier New':2,'Times New Roman':3,'ComicSans':4,'papyrus':5}
        return obj[this.props.app_state.font]
    }

    set_preferred_font_tag(){
        this.setState({get_preferred_font_tags_object: this.get_preferred_font_tags_object(),})
    }









    get_skip_nsfw_warning_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['or','',0], ['e',this.props.app_state.loc['1428']/* 'enabled' */], [this.get_selected_skip_nsfw_warning_option()]
            ],
        };
    }

    get_selected_skip_nsfw_warning_option(){
        if(this.props.app_state.auto_skip_nsfw_warning == 'e'){
            return 0
        }
        else if(this.props.app_state.auto_skip_nsfw_warning == this.props.app_state.loc['1428']/* 'enabled' */){
            return 1
        }
        return 0;
    }

    set_skip_nsfw_warning_tag(){
        this.setState({get_skip_nsfw_warning_tags_object: this.get_skip_nsfw_warning_tags_object(),})
    }










    get_graph_type_tags_object(){
        return{
           'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e',this.props.app_state.loc['2753']/* 'area' */, this.props.app_state.loc['2752']/* 'splineArea' */], [this.get_selected_graph_type_option()]
            ], 
        }
    }


    get_selected_graph_type_option(){
        if(this.props.app_state.graph_type == this.props.app_state.loc['2753']/* 'area' */){
            return 1
        }
        else if(this.props.app_state.graph_type == this.props.app_state.loc['2752']/* 'splineArea' */){
            return 2
        }
        return 1;
    }


    set_selected_graph_type_tag(){
        this.setState({get_graph_type_tags_object: this.get_graph_type_tags_object(),})
    }






    get_remember_account_tags_object(){
        return{
           'i':{
                active:'e', 
            },
            'e':[
                ['or','',0], ['e', this.props.app_state.loc['2892']/* 'remember' */], [this.get_selected_remember_account_type_option()]
            ], 
        }
    }

    get_selected_remember_account_type_option(){
        if(this.props.app_state.remember_account == 'e'){
            return 0
        }
        else if(this.props.app_state.remember_account == this.props.app_state.loc['2892']/* 'remember' */){
            return 1
        }
        return 0;
    }

    set_selected_remember_account_type_tag(){
        this.setState({get_remember_account_tags_object: this.get_remember_account_tags_object(),})
    }




    get_upload_storage_option_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e', this.props.app_state.loc['1593cw']/* 'nitro 🛰️' */, this.props.app_state.loc['1593ew']/* arweave *//* this.props.app_state.loc['1593cv'], web3.storage  */ ], [1]
            ],
        };
    }

    get_file_data_option_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e',this.props.app_state.loc['1593bk']/* all */, this.props.app_state.loc['1593bl']/* 'images' */, this.props.app_state.loc['1593bm']/* 'audio' */, this.props.app_state.loc['1593bn']/* 'video' */, this.props.app_state.loc['1593cd']/* 'documents' */, this.props.app_state.loc['1593ed']/* 'zip' */], [1]
            ],
        };
    }

    set_web3_email_account(){
        this.setState({storage_email_input: this.props.app_state.web3_account_email})
    }

    set_my_preferred_nitro(){
        if(this.props.app_state.my_preferred_nitro != '') this.setState({selected_nitro_item: this.props.app_state.my_preferred_nitro})
    }





    get_hide_pip_tags_object(){
        return{
           'i':{
                active:'e', 
            },
            'e':[
                ['or','',0], ['e', this.props.app_state.loc['1593ec']/* 'hidden' */], [this.get_selected_hide_pip_type_option()]
            ], 
        }
    }

    get_selected_hide_pip_type_option(){
        if(this.props.app_state.hide_pip == 'e'){
            return 0
        }
        else if(this.props.app_state.hide_pip == this.props.app_state.loc['1593ec']/* 'hidden' */){
            return 1
        }
        return 0;
    }

    set_selected_hide_pip_type_tag(){
        this.setState({get_hide_pip_tags_object: this.get_hide_pip_tags_object(),})
    }









    get_preferred_currency_tags_object(){
        return{
           'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e', this.props.app_state.loc['1593ef']/* 'USD' */, this.props.app_state.loc['1593eg']/* 'SAT' */], [this.get_selected_preferred_currency_type_option()]
            ], 
        }
    }

    get_selected_preferred_currency_type_option(){
        if(this.props.app_state.preferred_currency == this.props.app_state.loc['1593ef']/* 'USD' */){
            return 1
        }
        else if(this.props.app_state.preferred_currency == this.props.app_state.loc['1593eg']/* 'SAT' */){
            return 2
        }
        return 1;
    }

    set_selected_preferred_currency_type_tag(){
        this.setState({get_preferred_currency_tags_object: this.get_preferred_currency_tags_object(),})
    }










    get_minified_content_setting_object(){
        return{
           'i':{
                active:'e', 
            },
            'e':[
                ['or','',0], ['e', this.props.app_state.loc['1593fj']/* 'enabled' */], [this.get_selected_minified_content_setting_option()]
            ], 
        }
    }

    get_selected_minified_content_setting_option(){
        if(this.props.app_state.minified_content == this.props.app_state.loc['1593fj']/* 'enabled' */){
            return 1
        }
        return 0;
    }

    set_selected_minified_content_setting_tag(){
        this.setState({get_minified_content_setting_object: this.get_minified_content_setting_object(),})
    }








    get_auto_run_setting_object(){
        return{
           'i':{
                active:'e', 
            },
            'e':[
                ['or','',0], ['e', this.props.app_state.loc['1593ft']/* '2min' */, this.props.app_state.loc['1593fu']/* '5min' */, this.props.app_state.loc['1593fv']/* '10min' */], [this.get_selected_auto_run_setting_option()]
            ], 
        }
    }

    get_selected_auto_run_setting_option(){
        var obj = {'e':0}
        obj[this.props.app_state.loc['1593ft']/* '2min' */] = 1
        obj[this.props.app_state.loc['1593fu']/* '5min' */] = 2
        obj[this.props.app_state.loc['1593fv']/* '10min' */] = 3
        return obj[this.props.app_state.auto_run]
    }

    set_selected_auto_run_setting_tag(){
        this.setState({get_auto_run_setting_object: this.get_auto_run_setting_object(),})
    }









    render(){
        return(
            <div style={{'margin':'10px 10px 0px 10px', 'padding':'0px'}}>
                <Tags font={this.props.app_state.font} page_tags_object={this.state.get_stack_page_tags_object} tag_size={'l'} when_tags_updated={this.when_stack_tags_updated.bind(this)} theme={this.props.theme} app_state={this.props.app_state}/>
                
                <div style={{'margin':'0px 0px 0px 0px', overflow: 'auto', 'overflow-x':'none', maxHeight: this.props.height-(this.props.os == 'iOS' ? 85 : 120)}}>
                    {this.render_everything()}
                </div>
                
            </div>
        )
    }

    when_stack_tags_updated(tag_group){
        this.setState({get_stack_page_tags_object: tag_group})
    }


    render_everything(){
        var selected_item = this.get_selected_item(this.state.get_stack_page_tags_object, this.state.get_stack_page_tags_object['i'].active)

        if(selected_item == 'e'){
            return(
                <div>
                    {this.render_stack_run_section()}
                </div>
            )    
        }
        else if(selected_item == this.props.app_state.loc['1408']/* 'stack 📥' */){
            return(
                <div>
                    {this.render_stack_transactions_part()}
                </div>
            )    
        }
        else if(selected_item == this.props.app_state.loc['1409']/* 'history 📜' */){
            return(
                <div>
                    {this.render_run_history_items()}
                </div>
            )    
        }
        else if(selected_item == this.props.app_state.loc['1410']/* 'settings ⚙️' */){
            return(
                <div>
                    {this.render_settings_section()}
                </div>
            ) 
        }
        else if(selected_item == this.props.app_state.loc['1411']/* 'wallet 👛' */){
            return(
                <div>
                    {this.render_wallet_settings_section()}
                </div>
            ) 
        }
        else if(selected_item == this.props.app_state.loc['1413']/* 'contacts 👤' */){
            return(
                <div>
                    {this.render_contacts_section()}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['1412']/* 'alias 🏷️' */){
            return(
                <div>
                    {this.render_alias_stuff()}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['1414']/* 'blacklisted 🚫' */){
            return(
                <div>
                    {this.render_blacklisted_section()}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['1593x']/* 'Watch 👁️' */){
            return(
                <div>
                    {this.render_watched_account_ui()}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['1593ak']/* 'sign' */){
            return(
                <div>
                    {this.render_sign_data_ui()}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['1593al']/* 'verify' */){
            return(
                <div>
                    {this.render_verify_data_ui()}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['1593ba']/* 'storage 💾' */){
            return(
                <div>
                    {this.render_storage_settings_ui()}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['1593cr']/* 'gateway 🚧' */){
            return(
                <div>
                    {this.render_set_custom_ipfs_gateway()}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['1593df']/* 'following 👥' */){
            return(
                <div>
                    {this.render_set_following_moderator()}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['1593dq']/* 'Censor 🚫' */){
            return(
                <div>
                    {this.render_censor_keywords_ui()}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['1593gf']/* 'iTransfer 💳'' */){
            return(
                <div>
                    {this.render_contextual_transfers_ui()}
                </div>
            )
        }

    }

    get_selected_item(object, option){
        var selected_item = object[option][2][0]
        var picked_item = object[option][1][selected_item];
        return picked_item
    }


    render_stack_run_settings_part(){
        var height = this.props.height-150
        return(
            <div style={{}}>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['1429']/* 'Transaction Gas Limit' */, 'details':this.props.app_state.loc['1431']/* 'The gas budget for your next run with E5. The default is set to 5.3 million gas. You can auto-set the value to be the estimated gas to be comsumed.' */, 'size':'l'})}
                <div style={{height:10}}/>

                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['1429']/* 'Transaction Gas Limit' */, 'number':this.state.run_gas_limit, 'relativepower':this.props.app_state.loc['1430']/* 'units' */})}>
                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['1429']/* 'Transaction Gas Limit' */, 'subtitle':this.format_power_figure(this.state.run_gas_limit), 'barwidth':this.calculate_bar_width(this.state.run_gas_limit), 'number':this.format_account_balance_figure(this.state.run_gas_limit), 'barcolor':'', 'relativepower':this.props.app_state.loc['1430']/* 'units' */, })}
                </div>

                <NumberPicker clip_number={this.props.app_state.clip_number} font={this.props.app_state.font} number_limit={bigInt('1e72')} when_number_picker_value_changed={this.when_run_gas_limit.bind(this)} theme={this.props.theme} power_limit={63}/>
                
                <div style={{height:10}}/>
                <div style={{'padding': '5px'}} onClick={()=>this.set_tx_gas_limit()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['1432']/* 'Auto-Set Gas Limit' */, 'action':''})}
                </div>

                {this.render_detail_item('0')}

                {this.show_gas_price_or_eip_options()}

                

                {this.render_detail_item('3', {'title':this.props.app_state.loc['1437']/* 'Run Expiry Duration' */, 'details':this.props.app_state.loc['1438']/* 'The duration of time after which your transaction will be reverted if it stays too long in the mempool. The default duration used is 1 hour.' */, 'size':'l'})}
                <div style={{height:20}}/>
                
                {this.render_detail_item('3', {'title':this.get_time_diff(this.state.run_time_expiry), 'details':this.props.app_state.loc['1439']/* 'Estimated Time.' */, 'size':'l'})}

                <DurationPicker font={this.props.app_state.font} when_number_picker_value_changed={this.when_run_expiry_time_set.bind(this)} theme={this.props.theme} loc={this.props.app_state.loc}/>

            </div>
        )
    }

    show_gas_price_or_eip_options(){
        var e5 = this.props.app_state.selected_e5
        if(this.props.app_state.e5s[e5].type == '1559'){
            return;
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['1593q']/* 'Transaction Max Priority Fee Per Gas.' */, 'details':this.props.app_state.loc['1593r']/* 'The max priority fee per gas(miner tip) for your next run with E5.' */, 'size':'l'})}
                    <div style={{height:10}}/>

                    <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['1593q']/* 'Transaction Max Priority Fee Per Gas.' */, 'number':this.state.picked_max_priority_per_gas_amount, 'relativepower':'wei'})}>
                        {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['1593q']/* ' Max Priority Fee Per Gas.' */, 'subtitle':this.format_power_figure(this.state.picked_max_priority_per_gas_amount), 'barwidth':this.calculate_bar_width(this.state.picked_max_priority_per_gas_amount), 'number':this.format_account_balance_figure(this.state.picked_max_priority_per_gas_amount), 'barcolor':'', 'relativepower':'wei', })}

                        {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['1593cb']/* ' Max Priority Fee Per Gas in Gwei.' */, 'subtitle':this.format_power_figure(this.state.picked_max_priority_per_gas_amount /10**9), 'barwidth':this.calculate_bar_width(this.state.picked_max_priority_per_gas_amount /10**9), 'number':(this.state.picked_max_priority_per_gas_amount/10**9), 'barcolor':'', 'relativepower':'gwei', })}
                    </div>

                    <NumberPicker clip_number={this.props.app_state.clip_number} font={this.props.app_state.font} number_limit={bigInt('1e72')} when_number_picker_value_changed={this.when_max_priority_amount.bind(this)} theme={this.props.theme} power_limit={63}/>




                    {this.render_detail_item('3', {'title':this.props.app_state.loc['1593s']/* 'Max Fee per Gas.' */, 'details':this.props.app_state.loc['1593t']/* 'The maximum amount of gas fee your willing to pay for your next run with E5.' */, 'size':'l'})}
                    <div style={{height:10}}/>

                    <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['1593s']/* 'Max Fee per Gas.' */, 'number':this.state.picked_max_fee_per_gas_amount, 'relativepower':'wei'})}>
                        {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['1593s']/* 'Max Fee per Gas.' */, 'subtitle':this.format_power_figure(this.state.picked_max_fee_per_gas_amount), 'barwidth':this.calculate_bar_width(this.state.picked_max_fee_per_gas_amount), 'number':this.format_account_balance_figure(this.state.picked_max_fee_per_gas_amount), 'barcolor':'', 'relativepower':'wei', })}

                        {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['1593ca']/* 'Max Fee per Gas in Gwei.' */, 'subtitle':this.format_power_figure(this.state.picked_max_fee_per_gas_amount/10**9), 'barwidth':this.calculate_bar_width(this.state.picked_max_fee_per_gas_amount/10**9), 'number':(this.state.picked_max_fee_per_gas_amount/10**9), 'barcolor':'', 'relativepower':'gwei', })}
                    </div>

                    <NumberPicker clip_number={this.props.app_state.clip_number} font={this.props.app_state.font} number_limit={bigInt('1e72')} when_number_picker_value_changed={this.when_max_fee_per_gas_amount.bind(this)} theme={this.props.theme} power_limit={63}/>

                    <div style={{height:10}}/>
                    {this.render_gas_price_options()}

                    {this.render_detail_item('0')}
                </div>
            )
        }else{
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['1433']/* 'Transaction Gas Price' */, 'details':this.props.app_state.loc['1434']/* 'The gas price for your next run with E5. The default is set to the amount set by the network.' */, 'size':'l'})}
                    <div style={{height:10}}/>

                    <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['1433']/* 'Transaction Gas Price' */, 'number':this.state.run_gas_price, 'relativepower':'wei'})}>
                        {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['1433']/* 'Transaction Gas Price' */, 'subtitle':this.format_power_figure(this.state.run_gas_price), 'barwidth':this.calculate_bar_width(this.state.run_gas_price), 'number':this.format_account_balance_figure(this.state.run_gas_price), 'barcolor':'', 'relativepower':'wei', })}

                        {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['1593bz']/* 'Transaction Gas Price in Gwei' */, 'subtitle':this.format_power_figure(this.state.run_gas_price/10**9), 'barwidth':this.calculate_bar_width(this.state.run_gas_pric/10**9), 'number':(this.state.run_gas_price/10**9), 'barcolor':'', 'relativepower':'gwei', })}
                    </div>

                    <NumberPicker clip_number={this.props.app_state.clip_number} font={this.props.app_state.font} number_limit={bigInt('1e72')} when_number_picker_value_changed={this.when_run_gas_price.bind(this)} theme={this.props.theme} power_limit={63} decimal_count={9}/>
                    
                    <div style={{height:10}}/>
                    {this.render_gas_price_options()}

                    {this.render_detail_item('0')}
                </div>
            )
        }
    }

    render_gas_price_options(){
        var gas_price = this.props.app_state.gas_price[this.props.app_state.selected_e5]
        if(gas_price == null){
            gas_price = this.get_gas_price_from_runs()
        }

        if(gas_price == null || isNaN(gas_price)) return;
        
        var items = [
            {'title':this.props.app_state.loc['1593cg']/* 'slow' */, 'price':Math.round(1.2 * gas_price)},
            {'title':this.props.app_state.loc['1593ch']/* 'average' */, 'price':Math.round(1.7 * gas_price)},
            {'title':this.props.app_state.loc['1593ci']/* 'fast' */, 'price':Math.round(2.6 * gas_price)},
            {'title':this.props.app_state.loc['1593cj']/* 'asap' */, 'price':Math.round(4.1 * gas_price)},
        ]

        var e5 = this.props.app_state.selected_e5
        if(this.props.app_state.e5s[e5].type == '1559'){
            items = [
                {'title':this.props.app_state.loc['1593cg']/* 'slow' */, 'price':Math.round(1.2 * gas_price), 'max_priority_fee':2_000_000_000 },
                {'title':this.props.app_state.loc['1593ch']/* 'average' */, 'price':Math.round(1.8 * gas_price), 'max_priority_fee':3_000_000_000},
                {'title':this.props.app_state.loc['1593ci']/* 'fast' */, 'price':Math.round(2.9 * gas_price), 'max_priority_fee':4_000_000_000},
                {'title':this.props.app_state.loc['1593cj']/* 'asap' */, 'price':Math.round(4.6 * gas_price), 'max_priority_fee':5_000_000_000},
            ]
        }

        return(
            <div style={{'margin':'0px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                    {items.map((item, index) => (
                        <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}} onClick={()=>this.when_custom_price_picked(item)}>
                            {this.render_detail_item('3', {'title':item['title'], 'details':this.round_off(item['price']/10**9)+' gwei', 'size':'s'})}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    round_off(float_number){
        return (Math.round(float_number * 100) / 100)
    }

    when_custom_price_picked(item){
        this.props.notify(item['title']+this.props.app_state.loc['1593cf']/* ' price set.' */, 1200)
        var e5 = this.props.app_state.selected_e5
        if(this.props.app_state.e5s[e5].type == '1559'){
            this.when_max_fee_per_gas_amount(item['price'] + item['max_priority_fee'])
            this.when_max_priority_amount(item['max_priority_fee'])
        }else{
            this.when_run_gas_price(item['price'])
        }
    }

    set_tx_gas_limit(){
        var estimated_gas = this.estimated_gas_consumed()
        this.setState({run_gas_limit: estimated_gas+80_000})
    }

    when_run_gas_limit(number){
        this.setState({run_gas_limit: number})
    }

    when_run_gas_price(number){
        this.setState({run_gas_price: number})
        this.props.when_run_gas_price_set(number)
    }

    when_max_priority_amount(number){
        this.setState({picked_max_priority_per_gas_amount: number+0})
    }

    when_max_fee_per_gas_amount(number){
        this.setState({picked_max_fee_per_gas_amount: number+0})
    }

    when_run_expiry_time_set(number){
        this.setState({run_time_expiry: number})
    }

    render_run_history_items(){
        var size = this.props.size
        if(size == 's'){
            return(
                <div>
                    {this.render_my_transaction_history()}
                </div>
            )
        }else if(size == 'm'){
            return(
                <div>
                    <div className="row">
                        <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                            {this.render_my_transaction_history()}
                        </div>
                        <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                            {this.render_empty_views(3)}
                        </div>
                    </div>
                </div>
            )
        }else if(size == 'l'){
            return(
                <div>
                    <div className="row">
                        <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                            {this.render_my_transaction_history()}
                        </div>
                        <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                            {this.render_empty_views(3)}
                        </div>
                    </div>
                </div>
            )
        }
    }

    render_my_transaction_history(){
        var background_color = this.props.theme['card_background_color']
        var card_shadow_color = this.props.theme['card_shadow_color']
        var middle = this.props.height-100;
        var size = this.props.size;
        if(size == 'm'){
            middle = this.props.height-100;
        }
        var runs = this.props.app_state.E5_runs[this.props.app_state.selected_e5] == null ? [] : this.props.app_state.E5_runs[this.props.app_state.selected_e5]
        var items = [].concat(runs)

        if(items.length == 0){
            items = [0,3,0]
            return(
                <div style={{}}>
                    {this.render_detail_item('3',{'title':this.props.app_state.loc['1593gc']/* 'Your Run History.' */, 'details':this.props.app_state.loc['1593ge']/* 'When you run some transactions with e, they will show here.' */, 'size':'l'})}
                    <div style={{height: 10}}/>
                    {this.render_empty_views(3)}
                </div>
            )
        }else{
            return(
                <div style={{}}>
                    {this.render_detail_item('3',{'title':this.props.app_state.loc['1593gc']/* 'Your Run History.' */, 'details':this.props.app_state.loc['1593gd']/* 'Blow are all the runs youve made before.' */, 'size':'l'})}
                    <div style={{height: 10}}/>

                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.map((item, index) => (
                            <div style={{'padding': '2px 0px 2px 0px'}} onClick={() => this.props.show_view_transaction_log_bottomsheet(item)}>
                                {this.render_detail_item('3',{'title':'🏃 '+item.returnValues.p3, 'details':this.get_time_difference(item.returnValues.p8)+this.props.app_state.loc['1698a']+' • '+this.format_account_balance_figure(item.returnValues.p5)+' gas.','size':'l'})}
                            </div>
                        ))}
                    </ul>
                </div>
            )
        }
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



    render_stack_run_section(){
        var size = this.props.size

        if(size == 's'){
            return(
                <div style={{'padding': '0px 0px 0px 0px'}}>
                    {this.render_stack_gas_part()}
                    {this.render_simplified_stack_history()}
                    {this.render_detail_item('0')}
                    {this.render_stack_run_settings_part()}
                    {this.render_gas_history_chart()}
                    {this.render_mempool_metrics()}
                    {this.render_dialog_ui()}
                    {this.render_beacon_node_enabled_message()}
                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            )
        }else if(size == 'm'){
            return(
                <div>
                    <div className="row">
                        <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                            {this.render_stack_gas_part()}
                            {this.render_simplified_stack_history()}
                            {this.render_gas_history_chart()}
                            {this.render_beacon_node_enabled_message()}
                        </div>
                        <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                            {this.render_stack_run_settings_part()}
                            {/* {this.render_mempool_metrics()} */}
                        </div>
                    </div>
                    {this.render_dialog_ui()}
                </div>
            )
        }else if(size == 'l'){
            return(
                <div>
                    <div className="row">
                        <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                            {this.render_stack_gas_part()}
                            {this.render_simplified_stack_history()}
                            {this.render_gas_history_chart()}
                            {this.render_beacon_node_enabled_message()}
                        </div>
                        <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                            {this.render_stack_run_settings_part()}
                            {/* {this.render_mempool_metrics()} */}
                        </div>
                        <div className="col-2" style={{'padding': '10px'}}>
                            
                        </div>
                    </div>
                    {this.render_dialog_ui()}
                </div>
            ) 
        }
    }

    render_beacon_node_enabled_message(){
        if(this.props.app_state.beacon_node_enabled == true){
            return(
                <div onClick={() => this.props.show_dialer_bottomsheet()}>
                    <div style={{height: 20}}/>
                    {this.render_detail_item('4',{'font':this.props.app_state.font, 'textsize':'12px','text':this.props.app_state.loc['1593ej']/* 'Beacon Node Online.' */})}
                </div>
            )
        }else{
            return(
                <div onClick={() => this.props.show_dialer_bottomsheet()}>
                    <div style={{height: 20}}/>
                    {this.render_detail_item('4',{'font':this.props.app_state.font, 'textsize':'12px','text':this.props.app_state.loc['1593ek']/* 'Beacon Node Offline.' */})}
                </div>
            )
        }
    }

    render_stack_transactions_part(){
        var size = this.props.size
        if(size == 's'){
            return(
                <div>
                    {this.render_stack_transactions()}
                </div>
            )
        }else if(size == 'm'){
            return(
                <div>
                    <div className="row">
                        <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                            {this.render_stack_transactions()}
                        </div>
                        <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                            {this.render_empty_views(3)}
                        </div>
                    </div>
                </div>
            )
        }else if(size == 'l'){
            return(
                <div>
                    <div className="row">
                        <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                            {this.render_stack_transactions()}
                        </div>
                        <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                            {this.render_empty_views(3)}
                        </div>
                    </div>
                </div>
            )
        }
    }

    render_stack_transactions(){
        var items = [].concat(this.props.app_state.stack_items)

        if(items.length == 0){
            return(
                <div style={{}}>
                    {this.render_detail_item('3',{'title':this.props.app_state.loc['1593fz']/* 'Your Transactions.' */, 'details':this.props.app_state.loc['1593gb']/* 'When you create a transaction in e, it will show here.' */, 'size':'l'})}
                    <div style={{height: 10}}/>
                    {this.render_empty_views(3)}
                </div>
            )
        }else{
            return(
                <div>
                    <div style={{}}>
                        {this.render_detail_item('3',{'title':this.props.app_state.loc['1593fz']/* 'Your Transactions.' */, 'details':this.props.app_state.loc['1593ga']/* 'Below are all the transactions youve stacked ready for your next run.' */, 'size':'l'})}
                        <div style={{height: 10}}/>
                        {this.render_clear_stack_button()}
                        <div style={{height: 10}}/>
                        <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                            {items.map((item, index) => (
                                <li style={{'padding': '2px 2px 2px 2px'}}>
                                    {this.render_stack_item(item, index)}
                                </li>
                            ))}
                        </ul>
                    </div>
                    {this.render_confirm_clear_dialog()}
                </div>
                
            )
        }
    }

    render_clear_stack_button(){
        var items = [].concat(this.props.app_state.stack_items)
        if(items.length > 0){
            return(
                <div>
                    <div style={{'padding': '5px'}} onClick={()=> this.open_confirm_clear_stack_dialog()}>
                        {this.render_detail_item('5', {'text':this.props.app_state.loc['1442']/* 'Clear Transactions' */, 'action':''})}
                    </div>
                </div>
            )
        }
    }

    open_confirm_clear_stack_dialog(){
        this.props.show_dialog_bottomsheet({}, 'confirm_clear_stack_dialog')
        // this.setState({confirm_clear_stack_dialog: true})
    }

    render_confirm_clear_dialog(){
        return(
            <Dialog PaperProps={{ sx: { borderRadius: "15px" } }} onClose = {() => this.cancel_clear_transactions_dialog_box()} open = {this.state.confirm_clear_stack_dialog}>
                <div style={{'padding': '10px', 'background-color':this.props.theme['send_receive_ether_background_color']}}>
                    <h4 style={{'margin':'0px 0px 5px 10px', 'color':this.props.theme['primary_text_color']}}>{this.props.app_state.loc['1443']/* Confirm Action */}</h4>

                    {this.render_detail_item('3', {'title':this.props.app_state.loc['1445']/* 'Confirm Clear Stack Action' */, 'details':'This action cannot be undone.', 'size':'l'})}

                    <div style={{height: 5, width: 300}}/>

                    <div style={{'padding': '5px'}} onClick={()=> this.clear_stack()}>
                        {this.render_detail_item('5', {'text':this.props.app_state.loc['1444']/* 'Confirm' */, 'action':''})}
                    </div>
                </div>
                
            </Dialog>
        )
    }

    clear_stack(){
        this.cancel_clear_transactions_dialog_box()
        this.props.clear_transaction_stack()
    }

    cancel_clear_transactions_dialog_box(){
        this.setState({confirm_clear_stack_dialog: false})
    }



    lengthInUtf8Bytes(str) {
        // Matches only the 10.. bytes that are non-initial characters in a multi-byte sequence.
        var m = encodeURIComponent(str).match(/%[89ABab]/g);
        return str.length + (m ? m.length : 0);
    }

    get_browser_cache_size_limit(){
        if (localStorage && !localStorage.getItem('size')) {
            var i = 0;
            try {
                // Test up to 10 MB
                for (i = 250; i <= 10000; i += 250) {
                    localStorage.setItem('test', new Array((i * 1024) + 1).join('a'));
                }
            } catch (e) {
                localStorage.removeItem('test');
                localStorage.setItem('size', i - 250);            
            }
        }
        return localStorage.getItem('size')
    }

    render_stack_item(item, index){
        var background_color = this.props.theme['card_background_color']
        var card_shadow_color = this.props.theme['card_shadow_color']
        var op = this.props.app_state.hidden.includes(item) ? 0.5 : 1.0
        var txt = this.props.app_state.hidden.includes(item) ? 'show' : 'hide'
        var e5_img = this.props.app_state.e5s[item.e5].e5_img
        return(
            <div style={{'margin': '2px 0px 2px 0px', opacity: op}} onClick={() => this.props.view_transaction(item, index)}>
                {this.render_detail_item('3',{'title':item.type, 'details':this.props.app_state.loc['1446']/* 'Stack ID: ' */+item.id,'size':'l', 'title_image':e5_img})}
            </div>
        )
    }

    show_hide_stack_item(item){
        this.props.show_hide_stack_item(item)
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

    //here
    render_stack_gas_part(){
        var cache_size = this.get_browser_cache_size_limit();
        var viewed_data = localStorage.getItem("viewed") == null ? "":localStorage.getItem("viewed")
        var data_size = this.lengthInUtf8Bytes(viewed_data) + this.props.app_state.index_db_size
        var formatted_data_size = this.format_data_size(data_size)
        

        var gas_price = this.props.app_state.gas_price[this.props.app_state.selected_e5]
        if(gas_price == null){
            gas_price = this.get_gas_price_from_runs()
        }
        
        var gas_transactions = this.props.app_state.account_balance[this.props.app_state.selected_e5] == 0 ? 0 : Math.floor((this.props.app_state.account_balance[this.props.app_state.selected_e5]/gas_price)/2_300_000)

        var is_running = this.props.app_state.is_running[this.props.app_state.selected_e5]
        if(is_running == null) is_running = false
        var button_opacity = is_running == true ? 0.4 : 1.0
        var button_text = is_running == true ? this.props.app_state.loc['1593cs']/* 'Running...' */ : (this.props.app_state.loc['1456']/* 'Run ' */+this.props.app_state.selected_e5+this.props.app_state.loc['1457']/* ' Transactions' */)
        return(
            <div>
                {this.render_now_playing_media_if_any()}

                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'number':this.props.app_state.account_balance[this.props.app_state.selected_e5], 'title':this.props.app_state.loc['1448']/* 'Balance in Wei' */, 'relativepower':'wei'})}>
                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['1448']/* 'Balance in Wei' */, 'subtitle':this.format_power_figure(this.props.app_state.account_balance[this.props.app_state.selected_e5]), 'barwidth':this.calculate_bar_width(this.props.app_state.account_balance[this.props.app_state.selected_e5]), 'number':this.format_account_balance_figure(this.props.app_state.account_balance[this.props.app_state.selected_e5]), 'barcolor':'#606060', 'relativepower':'wei', })}

                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['1449']/* 'Balance in Ether' */, 'subtitle':this.format_power_figure(this.props.app_state.account_balance[this.props.app_state.selected_e5]/10**18), 'barwidth':this.calculate_bar_width(this.props.app_state.account_balance[this.props.app_state.selected_e5]/10**18), 'number':(this.props.app_state.account_balance[this.props.app_state.selected_e5]/10**18), 'barcolor':'#606060', 'relativepower':'ether', })}

                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['1377']/* 'Transactions (2.3M Gas average)' */, 'subtitle':this.format_power_figure(gas_transactions), 'barwidth':this.calculate_bar_width(gas_transactions), 'number':this.format_account_balance_figure(gas_transactions), 'barcolor':'#606060', 'relativepower':this.props.app_state.loc['1378']/* 'transactions' */, })}
                </div>
                <div style={{height:10}}/>

                {this.render_total_wallet_value()}

                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['1450']/* 'Number of Stacked Transactions' */, 'subtitle':this.format_power_figure(this.props.app_state.stack_items.length), 'barwidth':this.calculate_bar_width(this.props.app_state.stack_items.length), 'number':this.format_account_balance_figure(this.props.app_state.stack_items.length), 'barcolor':'', 'relativepower':this.props.app_state.loc['1378']/* 'transactions' */, })}
                </div>
                <div style={{height:10}}/>

                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>
                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['1451']/* 'Storage Space Utilized' */, 'subtitle':this.format_power_figure(formatted_data_size['size']), 'barwidth':this.calculate_bar_width(formatted_data_size['size']), 'number':this.format_account_balance_figure(formatted_data_size['size']), 'barcolor':'#606060', 'relativepower':formatted_data_size['unit'], })}
                </div>
                <div style={{height:10}}/>

                {this.render_stack_run_space_utilization_if_non_zero()}

                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}  onClick={()=>this.fetch_gas_figures()}>
                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['1452']/* 'Estimated Gas To Be Consumed' */, 'subtitle':this.format_power_figure(this.estimated_gas_consumed()), 'barwidth':this.calculate_bar_width(this.estimated_gas_consumed()), 'number':this.format_account_balance_figure(this.estimated_gas_consumed()), 'barcolor':'', 'relativepower':'gas', })}

                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['1453']/* 'Wallet Impact' */, 'subtitle':this.format_power_figure(this.calculate_wallet_impact_figure()), 'barwidth':this.calculate_bar_width(this.calculate_wallet_impact_figure()), 'number':this.calculate_wallet_impact_figure()+'%', 'barcolor':'', 'relativepower':'proportion', })}
                </div>
                <div style={{height:10}}/>
                {this.render_message_if_calculating_stack_gas_figures()}

                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['1454']/* 'Gas Price' */, 'number':gas_price, 'relativepower':'wei'})}>
                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['1454']/* 'Gas Price' */, 'subtitle':this.format_power_figure(gas_price), 'barwidth':this.calculate_bar_width(gas_price), 'number':this.format_account_balance_figure(gas_price), 'barcolor':'#606060', 'relativepower':'wei', })}

                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['1455']/* 'Gas Price in Gwei' */, 'subtitle':this.format_power_figure(gas_price/10**9), 'barwidth':this.calculate_bar_width(gas_price/10**9), 'number':(gas_price/10**9), 'barcolor':'#606060', 'relativepower':'gwei', })}
                </div>

                {this.render_arweave_network_fee_if_selected()}

                <div style={{height:10}}/>
                <div style={{'padding': '5px', 'opacity':button_opacity}} onClick={()=> this.open_confirmation_bottomsheet(false)}>
                    {this.render_detail_item('5', {'text':button_text, 'action':''})}
                </div>
                <div style={{height:7}}/>
            </div>
        )
    }

    render_message_if_calculating_stack_gas_figures(){
        if(this.state.is_calculating_stack[this.props.app_state.selected_e5] == true){
            return(
                <div>
                    {this.render_detail_item('4', {'text':this.props.app_state.loc['1593gs']/* 'Calculating your next runs gas figures...' */, 'textsize':'13px', 'font':this.props.app_state.font})}
                    <div style={{height:10}}/>
                </div>
            )
        }
    }

    render_stack_run_space_utilization_if_non_zero(){
        if(this.state.stack_size_in_bytes > 100){
            var stack_size_in_bytes_formatted_data_size = this.format_data_size(this.state.stack_size_in_bytes)
            
            var percentage = this.round_off((this.state.stack_size_in_bytes / this.props.app_state.upload_object_size_limit) * 100)
            if(percentage >= 100){
                percentage = 99.99
            }
            return(
                <div>
                    <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px'}}>
                        {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['1593go']/* 'Stack Run Storage Utilization' */, 'subtitle':this.format_power_figure(stack_size_in_bytes_formatted_data_size['size']), 'barwidth':this.calculate_bar_width(stack_size_in_bytes_formatted_data_size['size']), 'number':this.format_account_balance_figure(stack_size_in_bytes_formatted_data_size['size']), 'barcolor':'#606060', 'relativepower':stack_size_in_bytes_formatted_data_size['unit'], })}

                        {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['1593gp']/* 'Run Storage Utilization Proportion' */, 'subtitle':this.format_power_figure(percentage), 'barwidth':percentage, 'number':percentage+'%', 'barcolor':'#606060', 'relativepower':this.props.app_state.loc['1881']/* 'proportion' */, })}
                    </div>
                    <div style={{height:10}}/>
                </div>
            )
        }
        else if(this.state.stack_size_in_bytes == -1){
            return(
                <div>
                    {this.render_detail_item('4', {'text':this.props.app_state.loc['1593gq']/* 'Calculating Stack Run Storage Utilization...' */, 'textsize':'13px', 'font':this.props.app_state.font})}
                    <div style={{height:10}}/>
                </div>
            )
        }
        
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

    render_total_wallet_value(){
        if(this.props.app_state.asset_price_data['BTC'] == null) return;
        var total_wallet_value_in_usd = this.round_off(this.get_total_wallet_value_in_usd())
        var bitcoin_price = this.props.app_state.asset_price_data['BTC']['price']
        var number_of_btc_for_one_usd = 1 / bitcoin_price
        var balance_value_in_btc = number_of_btc_for_one_usd * total_wallet_value_in_usd
        var balance_value_in_sat = parseInt(balance_value_in_btc * this.props.app_state.coins['BTC']['conversion'])
        return(
            <div>
                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['1593eh']/* 'Wallet Value in USD.' */, 'subtitle':this.format_power_figure(total_wallet_value_in_usd), 'barwidth':this.calculate_bar_width(total_wallet_value_in_usd), 'number':this.format_account_balance_figure(total_wallet_value_in_usd), 'barcolor':'#606060', 'relativepower':'USD', })}

                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['1593ei']/* 'Wallet Value in SATs' */, 'subtitle':this.format_power_figure(balance_value_in_sat), 'barwidth':this.calculate_bar_width(balance_value_in_sat), 'number':this.format_account_balance_figure(balance_value_in_sat), 'barcolor':'#606060', 'relativepower':'SATs', })}
                </div>
                <div style={{height:10}}/>
            </div>
        )
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

    calculate_wallet_impact_figure(){
        var estimated_gas_to_be_consumed = this.estimated_gas_consumed()
        var gas_price = this.props.app_state.gas_price[this.props.app_state.selected_e5]
        if(gas_price == null){
            gas_price = this.get_gas_price_from_runs()
        }
        if(this.state.run_gas_price != 0){
            gas_price = this.state.run_gas_price
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

    format_data_size(size){
        if(size > 1_000_000_000){
            return {'size':this.round_off(size/1_000_000_000), 'unit':'GBs'}
        }
        else if(size > 1_000_000){
            return {'size':this.round_off(size/1_000_000), 'unit':'MBs'}
        }
        else if(size > 1_000){
            return {'size':this.round_off(size/1_000), 'unit':'KBs'}
        }
        else{
            return {'size':size, 'unit':'bytes'}
        }
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
                            <div style={{width:'100%', 'background-color':this.props.theme['send_receive_ether_background_color']}}>
                                {this.render_song_item(item)}
                            </div>
                        </SwipeableListItem>
                    </SwipeableList>
                    <div style={{height:10}}/>
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

    set_media_data(queue, song_pos, unshuffled_songs, is_shuffling){
        // console.log('stack_part','queue loaded', queue)
        // this.setState({queue: queue, pos: song_pos, original_song_list: unshuffled_songs, is_shuffling: is_shuffling})
    }

    get_image_from_file(ecid){
        if(!ecid.startsWith('image')) return ecid
        var ecid_obj = this.get_cid_split(ecid)
        if(this.props.app_state.uploaded_data[ecid_obj['filetype']] == null) return 'https://bafkreihhphkul4fpsqougigu4oenl3nbbnjjav4fzkgpjlwfya5ie2tu2u.ipfs.w3s.link/'
        var data = this.props.app_state.uploaded_data[ecid_obj['filetype']][ecid_obj['full']]

        if(data == null) return 'https://bafkreihhphkul4fpsqougigu4oenl3nbbnjjav4fzkgpjlwfya5ie2tu2u.ipfs.w3s.link/'

        if(data == null) return
return data['data']
    }

    render_pause_button(){
        var image = this.props.app_state.play_pause_state == 1/* playing */ ? this.props.theme['pause']: this.props.theme['play']     
        return(
            <img onClick={()=>this.play_pause_from_here()} alt="" src={image} style={{height:25 ,width:'auto', 'text-align':'center'}}/>
        )
    }

    play_pause_from_here(){
        // this.play_pause()
        this.props.play_pause_from_stack()
    }

    play_pause(){
        // if(this.state.play_pause_state == 0/* paused */){
        //     this.setState({play_pause_state: 1/* playing */})
        // }else{
        //     this.setState({play_pause_state: 0/* paused */})
        // }
    }

    when_next_track_reached(){
        // if(this.state.pos != this.state.queue.length - 1){
        //     this.setState({pos: this.state.pos +1})
        // }
    }

    play_previous(){
        // if(this.state.pos != 0){
        //     this.setState({pos: this.state.pos -1})
        // }
    }

    play_next(){
        // if(this.state.pos != this.state.queue.length - 1){
        //     this.setState({pos: this.state.pos +1})
        // }
    }

    skip_to(index){
        // this.setState({pos: index})
    }

    shuffle_songs_in_stack(shuffle_list, its_pos){
        // if(this.state.is_shuffling == true){
        //     this.setState({is_shuffling: !this.state.is_shuffling, queue: shuffle_list, pos:its_pos})
        // }else{
        //     this.setState({is_shuffling: !this.state.is_shuffling, queue: shuffle_list})
        // }
    }







    render_gas_history_chart(){
        var events = this.props.app_state.all_E5_runs[this.props.app_state.selected_e5]
        if(events != null && events.length > 10){
            return(
                <div>
                    {this.render_detail_item('0')}
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['1458']/* Gas Prices' */, 'details':this.props.app_state.loc['1459']/* `The gas price data recorded on your selected E5 over time.` */, 'size':'l'})}
                    
                    {this.render_detail_item('6', {'dataPoints':this.get_gas_history_data_points(events), 'interval':this.get_gas_history_interval_figure(events)})}
                    <div style={{height: 10}}/>
                    <Tags font={this.props.app_state.font} page_tags_object={this.state.gas_history_chart_tags_object} tag_size={'l'} when_tags_updated={this.when_gas_history_chart_tags_object_updated.bind(this)} theme={this.props.theme}/>

                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['1460']/* 'Y-Axis: Gas Prices in Gwei' */, 'details':this.props.app_state.loc['1461']/* 'X-Axis: Time' */, 'size':'s'})}
                </div>
            )
        }
    }

    when_gas_history_chart_tags_object_updated(tag_group){
        this.setState({gas_history_chart_tags_object: tag_group})
    }

    get_gas_history_data_points(event_data){
        var events = this.filter_proportion_ratio_events(event_data)
        var data = []
        for(var i=0; i<events.length; i++){
            data.push(parseInt(events[i].returnValues.p7)/1000_000_000)
        }

        data = data.reverse();

        var xVal = 1, yVal = 0;
        var dps = [];
        var recorded = false
        for(var i = 0; i < data.length; i++) {
            yVal = data[i]
            if(yVal != null){
                if(i%(20) == 0 && i != 0 && !recorded){
                    dps.push({x: xVal,y: yVal, indexLabel: yVal+" gwei"});//
                    recorded = true
                }else{
                    dps.push({x: xVal, y: yVal});//
                }
                xVal++;
            }
        }

        return dps
    }

    get_gas_history_interval_figure(events){
        var data = []
        events.forEach(event => {
            data.push(parseInt(event.returnValues.p7)/1000_000_000)
        });
        var largest = Math.max.apply(Math, data);
        return largest
    }

    filter_proportion_ratio_events(events){
        var selected_item = this.get_selected_item(this.state.gas_history_chart_tags_object, this.state.gas_history_chart_tags_object['i'].active)

        var filter_value = 60*60
        if(selected_item == '1h'){
            filter_value = 60*60
        }
        else if(selected_item == '24h'){
            filter_value = 60*60*24
        }
        else if(selected_item == '7d'){
            filter_value = 60*60*24*7
        }
        else if(selected_item == '30d'){
            filter_value = 60*60*24*30
        }
        else if(selected_item == '6mo'){
            filter_value = 60*60*24*30*6
        }
        else if(selected_item == this.props.app_state.loc['1416']/* 'all-time' */){
            filter_value = 10**10
        }
        var data = []
        var cutoff_time = Date.now()/1000 - filter_value
        events.forEach(event => {
            if(event.returnValues.p8 > cutoff_time){
                data.push(event)
            }
        });

        return data
    }




    render_simplified_stack_history(){
        var runs = this.props.app_state.E5_runs[this.props.app_state.selected_e5] == null ? [] : this.props.app_state.E5_runs[this.props.app_state.selected_e5]
        var items = [].concat(this.remove_duplicates(runs))
        var background_color = this.props.theme['card_background_color']

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
                        <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}} onClick={() => this.props.show_view_transaction_log_bottomsheet(item)}>
                            {this.render_detail_item('3',{'title':'ID: '+item.returnValues.p3, 'details':this.get_time_difference(item.returnValues.p8)+this.props.app_state.loc['1462']/* ' ago' */,'size':'s'})}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    remove_duplicates(list){
        var filtered = []
        var item_mapping = {}
        list.forEach(element => {
            if(!filtered.includes(element) && item_mapping[element.returnValues.p3] == null){
                filtered.push(element)
                item_mapping[element.returnValues.p3] = element.returnValues.p3
            }
        });
        return filtered
    }

    get_average_mempool_data(e5){
        var mempool_items = this.props.app_state.mempool[e5]
        if(mempool_items == null) return;
        var items = this.sortByAttributeDescending(mempool_items, 'gasPrice')
        if(items.length == 0){
            return;
        }

        var twenty_percent_figure = Math.ceil(0.2 * items.length)
        var top_twenty_percent_txs = []
        var bottom_twenty_percent_txs = []

        for(var i=0; i<twenty_percent_figure; i++){
            top_twenty_percent_txs.push(items[i])
        }

        var items_in_reverse = items.reverse()
        for(var i=0; i<twenty_percent_figure; i++){
            bottom_twenty_percent_txs.push(items_in_reverse[i])
        }
        bottom_twenty_percent_txs = bottom_twenty_percent_txs.reverse()




        var top_total = 0;
        var top_total_transactions = 0;
        top_twenty_percent_txs.forEach(tx => {
            top_total += parseInt(tx.gasPrice)
            top_total_transactions++;
        });
        var top_av = Math.round(top_total/top_twenty_percent_txs.length)




        var bottom_total = 0
        bottom_twenty_percent_txs.forEach(tx => {
            bottom_total += parseInt(tx.gasPrice)
        });
        var bottom_av =  Math.round(bottom_total / bottom_twenty_percent_txs.length)

        var all_av = Math.round((top_av+bottom_av)/2)

        
        if(this.props.app_state.addresses[e5] == null) return;
        var e5_address = this.props.app_state.addresses[e5][0]
        
        var e5_txs_count = 0
        var top_twenty_e5_txs_count = 0;
        items.forEach(tx => {
            if(tx.to == e5_address){
                e5_txs_count++;
            }
        });
        top_twenty_percent_txs.forEach(tx => {
            if(tx.to == e5_address){
                top_twenty_e5_txs_count++;
            }
        });


        var dominance_percentage = items.length==0? 0 : Math.round((e5_txs_count*100)/items.length)
        var top_twenty_dominance_percentage = top_twenty_percent_txs.length==0? 0: Math.round((top_twenty_e5_txs_count*100)/top_twenty_percent_txs.length)

        var total_value_transfer = 0;
        var e5_value_transfer = 0;
        items.forEach(tx => {
            if(tx.to == e5_address){
                total_value_transfer += parseInt(tx.value)
                e5_value_transfer += parseInt(tx.value)
            }else{
                total_value_transfer += parseInt(tx.value)
            }
        });

        var obj =  {'mempool_size':items.length, 'top_20_size':top_total_transactions, 'top_av': top_av, 'bottom_av':bottom_av, 'all_av':all_av, 'e5_txs_count':e5_txs_count, 'top_twenty_e5_txs_count':top_twenty_e5_txs_count, 'dominance_percentage':dominance_percentage, 'top_twenty_dominance_percentage':top_twenty_dominance_percentage, 'total_value_transfer':total_value_transfer, 'e5_value_transfer':e5_value_transfer}


        return obj
    }

    render_mempool_metrics(){
        var e5 = this.props.app_state.selected_e5
        var data = this.get_average_mempool_data(e5)
        if(data == null) return;
        return(
            <div>
                {this.render_detail_item('0')}
                {this.render_detail_item('3', {'title':this.props.app_state.loc['1463']/* 'Mempool Metrics' */, 'details':this.props.app_state.loc['1464']/* 'Below is some useful information about the state of the mempool for your selected E5s ether.' */, 'size':'l'})}
                <div style={{height:10}}/>
                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['1465']/* 'Mempool size' */, 'subtitle':this.format_power_figure(data['mempool_size']), 'barwidth':this.calculate_bar_width(data['mempool_size']), 'number':this.format_account_balance_figure(data['mempool_size']), 'barcolor':'', 'relativepower':this.props.app_state.loc['1378']/* 'transactions' */, })}
                </div>
                <div style={{height:10}}/>



                {this.render_detail_item('3', {'title':this.props.app_state.loc['1466']/* 'Top 20% Average' */, 'details':this.props.app_state.loc['1467']/* 'The average gas price offered for the top 20% transactions set to be included in the next blocks.' */, 'size':'l'})}
                <div style={{height:10}}/>
                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['1468']/* 'Gas prices in wei' */, 'subtitle':this.format_power_figure(data['top_av']), 'barwidth':this.calculate_bar_width(data['top_av']), 'number':this.format_account_balance_figure(data['top_av']), 'barcolor':'', 'relativepower':'wei', })}

                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['1469']/* 'Gas prices in gwei' */, 'subtitle':this.format_power_figure(data['top_av']/10**9), 'barwidth':this.calculate_bar_width(data['top_av']/10**9), 'number':(data['top_av']/10**9), 'barcolor':'', 'relativepower':'gwei', })}
                </div>
                <div style={{height:10}}/>



                {this.render_detail_item('3', {'title':this.props.app_state.loc['1470']/* 'Bottom 20% Average' */, 'details':this.props.app_state.loc['1471']/* 'The average gas price offered for the bottom 20% transactions least likely to be included in the next blocks.' */, 'size':'l'})}
                <div style={{height:10}}/>
                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['1468']/* 'Gas prices in wei' */, 'subtitle':this.format_power_figure(data['bottom_av']), 'barwidth':this.calculate_bar_width(data['bottom_av']), 'number':this.format_account_balance_figure(data['bottom_av']), 'barcolor':'', 'relativepower':'wei', })}

                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['1469']/* 'Gas prices in gwei' */, 'subtitle':this.format_power_figure(data['bottom_av']/10**9), 'barwidth':this.calculate_bar_width(data['bottom_av']/10**9), 'number':(data['bottom_av']/10**9), 'barcolor':'', 'relativepower':'gwei', })}
                </div>
                <div style={{height:10}}/>



                {this.render_detail_item('3', {'title':this.props.app_state.loc['1472']/* 'Gas Price Average' */, 'details':this.props.app_state.loc['1473']/* 'The average gas price offered for all transactions in the mempool.' */, 'size':'l'})}
                <div style={{height:10}}/>
                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['1468']/* 'Gas prices in wei' */, 'subtitle':this.format_power_figure(data['all_av']), 'barwidth':this.calculate_bar_width(data['all_av']), 'number':this.format_account_balance_figure(data['all_av']), 'barcolor':'', 'relativepower':'wei', })}

                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['1469']/* 'Gas prices in gwei' */, 'subtitle':this.format_power_figure(data['all_av']/10**9), 'barwidth':this.calculate_bar_width(data['all_av']/10**9), 'number':(data['all_av']/10**9), 'barcolor':'', 'relativepower':'gwei', })}
                </div>
                <div style={{height:10}}/>



                {this.render_detail_item('3', {'title':this.props.app_state.loc['1474']/* 'E5 Transactions Count' */, 'details':this.props.app_state.loc['1475']/* 'The total number of E5 transactions in the mempool and in the top 20% transactions set for the next set of blocks.' */, 'size':'l'})}
                <div style={{height:10}}/>
                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['1476']/* 'Total E5 Transaction Count' */, 'subtitle':this.format_power_figure(data['e5_txs_count']), 'barwidth':this.calculate_bar_width(data['e5_txs_count']), 'number':this.format_account_balance_figure(data['e5_txs_count'])+'/'+this.format_account_balance_figure(data['mempool_size']), 'barcolor':'', 'relativepower':'units', })}

                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['1477']/* 'Top 20% Transaction Count' */, 'subtitle':this.format_power_figure(data['top_twenty_e5_txs_count']), 'barwidth':this.calculate_bar_width(data['top_twenty_e5_txs_count']), 'number':this.format_account_balance_figure(data['top_twenty_e5_txs_count'])+'/'+this.format_account_balance_figure(data['top_20_size']), 'barcolor':'', 'relativepower':'units', })}
                </div>
                <div style={{height:10}}/>



                {this.render_detail_item('3', {'title':this.props.app_state.loc['1478']/* 'E5 Mempool Dominance' */, 'details':this.props.app_state.loc['1479']/* 'Percentage of E5 transactions in the mempool, and in the top 20% transactions set for the next set of blocks.' */, 'size':'l'})}
                <div style={{height:10}}/>
                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['1480']/* 'E5 Dominance' */, 'subtitle':this.format_power_figure(data['dominance_percentage']), 'barwidth':this.calculate_bar_width(data['dominance_percentage']), 'number':this.format_account_balance_figure(data['dominance_percentage'])+'%', 'barcolor':'', 'relativepower':'proportion', })}

                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['1481']/* 'E5 Top 20% Dominance' */, 'subtitle':this.format_power_figure(data['top_twenty_dominance_percentage']), 'barwidth':this.calculate_bar_width(data['top_twenty_dominance_percentage']), 'number':this.format_account_balance_figure(data['top_twenty_dominance_percentage'])+'%', 'barcolor':'', 'relativepower':this.props.app_state.loc['1482']/* 'proportion' */, })}
                </div>
                <div style={{height:10}}/>
                

                {this.render_detail_item('3', {'title':this.props.app_state.loc['1483']/* 'Value Transfer' */, 'details':this.props.app_state.loc['1484']/* 'The total amount of value transfer thats pending in the mempool.' */, 'size':'l'})}
                <div style={{height:10}}/>
                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['1485']/* 'Value in wei' */, 'subtitle':this.format_power_figure(data['total_value_transfer']), 'barwidth':this.calculate_bar_width(data['total_value_transfer']), 'number':this.format_account_balance_figure(data['total_value_transfer']), 'barcolor':'', 'relativepower':'wei', })}

                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['1486']/* 'Value in ether' */, 'subtitle':this.format_power_figure(data['total_value_transfer']/10**18), 'barwidth':this.calculate_bar_width(data['total_value_transfer']/10**18), 'number':this.format_account_balance_figure(data['total_value_transfer']/10**18), 'barcolor':'', 'relativepower':'ether', })}
                </div>
                <div style={{height:10}}/>


                {this.render_detail_item('3', {'title':this.props.app_state.loc['1488']/* 'Value Transfer into E5' */, 'details':this.props.app_state.loc['1489']/* 'The total amount of ether going into E5 thats pending in the mempool.' */, 'size':'l'})}
                <div style={{height:10}}/>
                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['1485']/* 'Value in wei' */, 'subtitle':this.format_power_figure(data['e5_value_transfer']), 'barwidth':this.calculate_bar_width(data['e5_value_transfer']), 'number':this.format_account_balance_figure(data['e5_value_transfer']), 'barcolor':'', 'relativepower':'wei', })}

                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['1486']/* 'Value in ether' */, 'subtitle':this.format_power_figure(data['e5_value_transfer']/10**18), 'barwidth':this.calculate_bar_width(data['e5_value_transfer']/10**18), 'number':this.format_account_balance_figure(data['e5_value_transfer']/10**18), 'barcolor':'', 'relativepower':'ether', })}
                </div>
                <div style={{height:10}}/>
            </div>
        )
    }




    
    set_calculate_stack_complete(e5){
        var clone = structuredClone(this.state.is_calculating_stack)
        clone[e5] = false
        this.setState({is_calculating_stack: clone})
    }

    auto_run_in_background(){
        this.open_confirmation_bottomsheet(true)
    }

    open_confirmation_bottomsheet(silently){
        var account_balance = this.props.app_state.account_balance[this.props.app_state.selected_e5]
        var run_gas_limit = this.state.run_gas_limit == 0 ? 5_300_000 : this.state.run_gas_limit
        var run_gas_price = this.state.run_gas_price == 0 ? this.props.app_state.gas_price[this.props.app_state.selected_e5] : this.state.run_gas_price
        var run_expiry_duration = this.state.run_time_expiry == 0 ? (60*60*1/* 1 hour */) : this.state.run_time_expiry

        var run_data = {'run_gas_limit':run_gas_limit, 'run_gas_price':run_gas_price, 'run_expiry_duration':run_expiry_duration}

        var pushed_txs = []
        var txs = this.props.app_state.stack_items
        for(var i=0; i<txs.length; i++){
            if(!this.props.app_state.hidden.includes(txs[i]) && txs[i].e5 == this.props.app_state.selected_e5){
                pushed_txs.push(txs[i])
            }
        }

        var gas_limit = this.get_latest_block_data(this.props.app_state.selected_e5).gasLimit
        var estimated_gas_to_be_consumed = this.estimated_gas_consumed()

        var is_running = this.props.app_state.is_running[this.props.app_state.selected_e5]
        if(is_running == null){
            is_running = false;
        }
        if(pushed_txs.length == 0){
            if(!silently) this.props.notify(this.props.app_state.loc['1487']/* 'Add some transactions first.' */,3600)
        }
        else if(account_balance == 0){
            if(!silently)this.props.open_wallet_guide_bottomsheet('one')
        }
        else if(account_balance < (estimated_gas_to_be_consumed * run_gas_price)){
            // this.setState({invalid_ether_amount_dialog_box: true})
            if(!silently) this.props.show_dialog_bottomsheet({'run_gas_limit':run_gas_limit}, 'invalid_ether_amount_dialog_box')
        }
        else if(run_gas_limit < 35000){
            if(!silently)this.props.notify(this.props.app_state.loc['1490']/* 'That transaction gas limit is too low.' */,3900)
        }
        else if(estimated_gas_to_be_consumed > gas_limit){
            if(!silently)this.props.notify(this.props.app_state.loc['1491']/* 'That transaction is too large, please reduce your stack size.' */,4900)
        }
        else if(estimated_gas_to_be_consumed > run_gas_limit){
            if(!silently)this.props.notify(this.props.app_state.loc['1492']/* 'Set a gas limit above ' */+estimated_gas_to_be_consumed+this.props.app_state.loc['1493']/* ' gas' */,5900)
        }
        else if(is_running){
            if(!silently)this.props.notify(this.props.app_state.loc['1495']/* 'e is already running a transaction for you.' */, 5200)
        }
        else if(!this.props.app_state.has_wallet_been_set){
            if(!silently)this.props.notify(this.props.app_state.loc['2906']/* 'You need to set your wallet first.' */, 5000)
        }
        else if(!this.is_areweave_checkers_ok(silently)){
            
        }
        else if(this.is_e5_public_disabled_for_sender()){
            if(!silently)this.props.notify(this.props.app_state.loc['1593et']/* 'The E5 you wish to use is not active yet.' */, 9000)
        }
        else{
            if(!silently){
                this.props.show_confirm_run_bottomsheet(run_data)
            }else{
                this.run_transactions(false/* calculate_gas */, true/* silently */)
            }
            
        }
    }

    is_e5_public_disabled_for_sender(){
        var setting = this.props.app_state.e5s[this.props.app_state.selected_e5].public_enabled
        if(setting == null || setting == false){
            var my_address = this.props.app_state.accounts[this.props.app_state.selected_e5] == null ? '0x00' : this.props.app_state.accounts[this.props.app_state.selected_e5].address
            return !this.props.app_state.dialer_addresses.includes(my_address)
        }else{
            return false
        }
    }

    is_areweave_checkers_ok(silently){
        var set_storage_option = this.props.app_state.storage_option
        var my_preferred_nitro = this.props.app_state.my_preferred_nitro
        var wallet_data = this.props.app_state.coin_data['AR']
        var wallet_address = wallet_data != null ? wallet_data['address'] : 'LPaDEyLV_65-koonfKiay_DU8Ti2nEZU6GU56bb1C_U'
        var my_arweave_balance = wallet_data != null ? wallet_data['balance'] : 0
        var fees = this.props.app_state.calculated_arewave_storage_fees_figures[this.props.app_state.selected_e5]
        if(fees == null) fees = 0;
        if(my_preferred_nitro == '' && set_storage_option == 'arweave'){
            if(wallet_address == 'LPaDEyLV_65-koonfKiay_DU8Ti2nEZU6GU56bb1C_U'){
                if(!silently) this.props.notify(this.props.app_state.loc['2738h']/* 'Please wait for your Arweave wallet to finish loading first.' */, 9000)
                return false
            }
            else if(fees > my_arweave_balance){
                if(!silently) this.props.notify(this.props.app_state.loc['1593er']/* 'Your Arweave balance is insufficient to make the transaction.' */, 9000)
                return false
            }else{
                return true
            }
        }else{
            return true
        }
    }

    fetch_gas_figures(){
        this.props.notify(this.props.app_state.loc['1494']/* 'calculating your stacks gas figure...' */, 2200)
        this.run_transactions(true, false)
    }

    run_transactions = async (calculate_gas, silently) => {
        const txs = this.props.app_state.stack_items
        const e5 = this.props.app_state.selected_e5
        this.setState({can_switch_e5s: false})
        if(!calculate_gas){
            var is_running = this.props.app_state.is_running[e5]
            if(is_running == null) is_running = false
            if(is_running){
                if(!silently){
                    this.props.notify(this.props.app_state.loc['1495']/* 'e is already running a transaction for you.' */, 5200)
                }
                this.setState({can_switch_e5s: true})
                return;
            }
            this.props.lock_run(true)
            
            if(txs.length > 0){
                this.props.notify(this.props.app_state.loc['1496']/* 'Running your transactions...' */, 7600)
            }
        }else{
            var clone = structuredClone(this.state.is_calculating_stack)
            if(clone[e5] == true){
                return;
            }
            clone[e5] = true
            this.setState({is_calculating_stack: clone})
        }
        var strs = []
        var ints = []
        var adds = []
        var wei = 0;
        var delete_pos_array = []
        var pushed_txs = []
        var should_optimize_run = true;
        var now = Date.now()
        
        
        var ipfs_index = await this.get_ipfs_index_object(txs, now, calculate_gas)
        // var ipfs_index = await this.props.get_ipfs_index_object_max(now, calculate_gas)
        
        
        if(ipfs_index == ''){
            this.props.lock_run(false)
            this.setState({can_switch_e5s: true})
            return;
        }

        if(ipfs_index == 'large'){
            if(!silently) this.props.show_dialog_bottomsheet({'stack_size':this.current_object_size}, 'invalid_stack_size_dialog_box')
            this.setState({can_switch_e5s: true})
            this.props.lock_run(false)
            return;
        }

        var new_transaction_index_obj={}
        for(var i=0; i<txs.length; i++){
            if(!this.props.app_state.hidden.includes(txs[i]) && txs[i].e5 == e5){
                var new_tx_index = -1
                if(txs[i].type == this.props.app_state.loc['1311']/* 'contract' */){
                    var contract_obj = this.format_contract_object(txs[i])
                    strs.push([])
                    adds.push([])
                    ints.push(contract_obj)

                    new_tx_index = ints.length -1
                    
                    var contract_type = this.get_selected_item(txs[i].new_contract_type_tags_object, txs[i].new_contract_type_tags_object['i'].active)

                    var contract_stack_id = ints.length-1

                    // var index_data = this.format_indexing_post_item(txs[i], false/* should_index_title */, ints.length-1, ints[ints.length-1][0][9])
                    // strs.push(index_data.str)
                    // adds.push([])
                    // ints.push(index_data.int)

                    if(contract_type == this.props.app_state.loc['165']/* 'private' */){
                        var enable_interactibles_checker = [ /* enable interactible checkers */
                            [20000, 5, 0],
                            [contract_stack_id], [35]/* target objects */
                        ]
                        strs.push([])
                        adds.push([])
                        ints.push(enable_interactibles_checker)
                        should_optimize_run = false
                    }
                    if(txs[i].interactibles.length != 0){
                        var add_interactibles_accounts = [ /* set account to be interactible */
                            [20000, 2, 0],
                            [], [],/* target objects */
                            [], [],/* target account ids*/
                            []/* interacible expiry time limit */
                        ]

                        for(var j = 0; j < txs[i].interactibles.length; j++){
                            add_interactibles_accounts[1].push(contract_stack_id)
                            add_interactibles_accounts[2].push(35)
                            add_interactibles_accounts[3].push(txs[i].interactibles[j]['id'])
                            txs[i].interactibles[j]['id'] == 53 ? add_interactibles_accounts[4].push(53) :add_interactibles_accounts[4].push(23)
                            add_interactibles_accounts[5].push(txs[i].interactibles[j]['timestamp'])
                        }

                        strs.push([])
                        adds.push([])
                        ints.push(add_interactibles_accounts)
                        should_optimize_run = false
        
                    }
                    if(txs[i].moderators.length != 0){
                        var add_moderator_accounts = [ /* set account as mod */
                            [20000, 4, 0],
                            [], [],/* target objects */
                            [], []/* target moderator account ids*/
                        ]

                        for(var j = 0; j < txs[i].moderators.length; j++){
                            add_moderator_accounts[1].push(contract_stack_id)
                            add_moderator_accounts[2].push(35)
                            add_moderator_accounts[3].push(txs[i].moderators[j])
                            txs[i].moderators[j] == 53 ? add_moderator_accounts[4].push(53):add_moderator_accounts[4].push(23)
                        }

                        strs.push([])
                        adds.push([])
                        ints.push(add_moderator_accounts)
                        should_optimize_run = false
                    }

                    var include_enter_value = this.get_selected_item(txs[i].include_enter_contract_action_tags_object, txs[i].include_enter_contract_action_tags_object['i'].active)

                    if(include_enter_value == this.props.app_state.loc['1']/* 'enter-contract' */){
                        var t = txs[i];
                        var max_enter_contract_duration = t.max_enter_contract_duration == 0 ? bgN(1, 16) : t.max_enter_contract_duration.toString().toLocaleString('fullwide', {useGrouping:false})

                        var obj = [/* enter a contract */
                            [30000, 3, 0],
                            [], [],/* contract ids */
                            []/* expiry time (seconds) */
                        ];

                        var expiry_time = Math.floor(Date.now()/1000) + bigInt(max_enter_contract_duration)
                        var ex = expiry_time.toLocaleString('fullwide', {useGrouping:false})

                        console.log('expiry_time: ', ex)

                        obj[1].push(contract_stack_id)
                        obj[2].push(35)
                        obj[3].push(ex)

                        strs.push([])
                        adds.push([])
                        ints.push(obj)
                        should_optimize_run = false
                    }
                }
                else if(txs[i].type == this.props.app_state.loc['601']/* 'token' */){
                    var default_depth = txs[i].default_depth
                    if(default_depth != 0){
                        //its an end token
                        var token_obj = this.format_end_token_object(txs[i])
                        strs.push([])
                        adds.push([])
                        ints.push(token_obj)

                        new_tx_index = ints.length -1

                        var obj = {}
                        obj[this.props.app_state.loc['2773']/* 'low' */] = '10000'
                        obj[this.props.app_state.loc['2774']/* 'medium' */] = '100000'
                        obj[this.props.app_state.loc['2775']/* 'high' */] = '1000000'
                        var liquidity = this.get_selected_item(txs[i].get_end_token_base_liquidity, txs[i].get_end_token_base_liquidity['i'].active);
                        var buy_amount = obj[liquidity]

                        var token_stack_id = ints.length-1

                        // var index_data = this.format_indexing_post_item(txs[i], true/* should_index_title */, ints.length-1, ints[ints.length-1][0][9])
                        // strs.push(index_data.str)
                        // adds.push([])
                        // ints.push(index_data.int)

                        var buy_token = [
                            [30000, 8, 0],
                            [token_stack_id], [35],/* exchanges */
                            [0], [53],/* receivers */
                            [buy_amount]/* amounts */, [0],/* action */
                            []/* lower_bounds */, []/* upper_bounds */
                        ]
                        strs.push([])
                        adds.push([])
                        ints.push(buy_token)


                        var depth_mint_obj = this.format_depth_mint_transaction(txs[i], token_stack_id)
                        strs.push([])
                        adds.push([])
                        ints.push(depth_mint_obj)

                        var modify_token_as_authority_obj = [
                            [20000, 3, 0],
                            [token_stack_id], [35],/* targets */
                            [1],/* target_array_pos */
                            [9],/* target_array_items */
                            [0], [23]/* new_items */
                        ]
                        strs.push([])
                        adds.push([])
                        ints.push(modify_token_as_authority_obj)

                    }
                    else{
                        var token_obj = this.format_token_object(txs[i])
                        strs.push([])
                        adds.push([])
                        ints.push(token_obj)

                        new_tx_index = ints.length -1

                        var token_stack_id = ints.length-1

                        // var index_data = this.format_indexing_post_item(txs[i], true/* should_index_title */, ints.length-1, ints[ints.length-1][0][9])
                        // strs.push(index_data.str)
                        // adds.push([])
                        // ints.push(index_data.int)
                        
                        var access_rights_setting = this.get_selected_item(txs[i].new_token_access_rights_tags_object, txs[i].new_token_access_rights_tags_object['i'].active);

                        if(access_rights_setting == this.props.app_state.loc['616']/* 'enabled' */){
                            var enable_interactibles_checker = [ /* enable interactible checkers */
                                [20000, 5, 0],
                                [token_stack_id], [35]/* target objects */
                            ]
                            strs.push([])
                            adds.push([])
                            ints.push(enable_interactibles_checker)
                            should_optimize_run = false
                        }
                        if(txs[i].interactibles.length != 0){
                            var add_interactibles_accounts = [ /* set account to be interactible */
                                [20000, 2, 0],
                                [], [],/* target objects */
                                [], [],/* target account ids*/
                                []/* interacible expiry time limit */
                            ]

                            for(var j = 0; j < txs[i].interactibles.length; j++){
                                add_interactibles_accounts[1].push(token_stack_id)
                                add_interactibles_accounts[2].push(35)
                                add_interactibles_accounts[3].push(txs[i].interactibles[j]['id'])
                                txs[i].interactibles[j]['id'] == 53 ? add_interactibles_accounts[4].push(53) :add_interactibles_accounts[4].push(23)
                                add_interactibles_accounts[5].push(txs[i].interactibles[j]['timestamp'])
                            }

                            strs.push([])
                            adds.push([])
                            ints.push(add_interactibles_accounts)
                            should_optimize_run = false
            
                        }
                        if(txs[i].moderators.length != 0){
                            var add_moderator_accounts = [ /* set account as mod */
                                [20000, 4, 0],
                                [], [],/* target objects */
                                [], []/* target moderator account ids*/
                            ]

                            for(var j = 0; j < txs[i].moderators.length; j++){
                                add_moderator_accounts[1].push(token_stack_id)
                                add_moderator_accounts[2].push(35)
                                add_moderator_accounts[3].push(txs[i].moderators[j])
                                txs[i].moderators[j] == 53 ? add_moderator_accounts[4].push(53):add_moderator_accounts[4].push(23)
                            }

                            strs.push([])
                            adds.push([])
                            ints.push(add_moderator_accounts)
                            should_optimize_run = false
                        }
                    }
                    var transaction_obj = [ /* set data */
                        [20000, 13, 0],
                        [19], [23],/* target objects */
                        [0], /* contexts */
                        [0] /* int_data */
                    ]

                    var string_obj = [[]]
                    var token_name = txs[i].entered_title_text
                    var token_symbol = txs[i].entered_symbol_text
                    var data = {'name':token_name, 'symbol':token_symbol, 'time':Date.now()}
                    string_obj[0].push(JSON.stringify(data))
                    
                    strs.push(string_obj)
                    adds.push([])
                    ints.push(transaction_obj)
                }
                else if(txs[i].type == this.props.app_state.loc['823']/* 'subscription' */){
                    var subscription_obj = this.format_subscription_object(txs[i])
                    strs.push([])
                    adds.push([])
                    ints.push(subscription_obj)

                    new_tx_index = ints.length -1

                    var subscription_stack_id = ints.length-1

                    // var index_data = this.format_indexing_post_item(txs[i], false/* should_index_title */, ints.length-1, ints[ints.length-1][0][9])
                    // strs.push(index_data.str)
                    // adds.push([])
                    // ints.push(index_data.int)

                    var access_rights_setting = this.get_selected_item(txs[i].new_token_access_rights_tags_object, txs[i].new_token_access_rights_tags_object['i'].active);

                    if(access_rights_setting == this.props.app_state.loc['1428']/* 'enabled' */){
                        var enable_interactibles_checker = [ /* enable interactible checkers */
                            [20000, 5, 0],
                            [subscription_stack_id], [35]/* target objects */
                        ]
                        strs.push([])
                        adds.push([])
                        ints.push(enable_interactibles_checker)
                        should_optimize_run = false
                    }
                    
                    if(txs[i].interactibles.length != 0){
                        var add_interactibles_accounts = [ /* set account to be interactible */
                            [20000, 2, 0],
                            [], [],/* target objects */
                            [], [],/* target account ids*/
                            []/* interacible expiry time limit */
                        ]
                    
                        for(var j = 0; j < txs[i].interactibles.length; j++){
                            add_interactibles_accounts[1].push(subscription_stack_id)
                            add_interactibles_accounts[2].push(35)
                            add_interactibles_accounts[3].push(txs[i].interactibles[j]['id'])
                            
                            txs[i].interactibles[j]['id'] == 53 ? add_interactibles_accounts[4].push(53) :add_interactibles_accounts[4].push(23)
                            
                            add_interactibles_accounts[5].push(txs[i].interactibles[j]['timestamp'])
                        }

                        strs.push([])
                        adds.push([])
                        ints.push(add_interactibles_accounts)
                        should_optimize_run = false
        
                    }
                    if(txs[i].moderators.length != 0){
                        var add_moderator_accounts = [ /* set account as mod */
                            [20000, 4, 0],
                            [], [],/* target objects */
                            [], []/* target moderator account ids*/
                        ]

                        for(var j = 0; j < txs[i].moderators.length; j++){
                            add_moderator_accounts[1].push(subscription_stack_id)
                            add_moderator_accounts[2].push(35)
                            add_moderator_accounts[3].push(txs[i].moderators[j])
                            txs[i].moderators[j] == 53 ? add_moderator_accounts[4].push(53):add_moderator_accounts[4].push(23)
                        }

                        strs.push([])
                        adds.push([])
                        ints.push(add_moderator_accounts)
                        should_optimize_run = false
                    }
                }
                else if(txs[i].type == this.props.app_state.loc['297']/* 'post' */){
                    var post_obj = this.format_post_object(txs[i])
                    strs.push([])
                    adds.push([])
                    ints.push(post_obj)

                    new_tx_index = ints.length -1

                    // var index_data = this.format_indexing_post_item(txs[i], false/* should_index_title */, ints.length-1, ints[ints.length-1][0][9])
                    // strs.push(index_data.str)
                    // adds.push([])
                    // ints.push(index_data.int)
                }
                else if(txs[i].type == this.props.app_state.loc['760']/* 'job' */){
                    var job_obj = this.format_job_object(txs[i])
                    strs.push([])
                    adds.push([])
                    ints.push(job_obj)

                    new_tx_index = ints.length -1

                    // var index_data = this.format_indexing_post_item(txs[i], false/* should_index_title */, ints.length-1, ints[ints.length-1][0][9])
                    // strs.push(index_data.str)
                    // adds.push([])
                    // ints.push(index_data.int)
                }
                else if(txs[i].type == this.props.app_state.loc['109']/* 'channel' */){
                    var channel_obj = this.format_channel_object(txs[i])
                    strs.push([['']])
                    adds.push([])
                    ints.push(channel_obj)

                    new_tx_index = ints.length -1

                    var channel_stack_id = ints.length-1

                    // var index_data = this.format_indexing_post_item(txs[i], false/* should_index_title */, ints.length-1, ints[ints.length-1][0][9])
                    // strs.push(index_data.str)
                    // adds.push([])
                    // ints.push(index_data.int)
                    
                    var access_rights_setting = this.get_selected_item(txs[i].new_token_access_rights_tags_object, txs[i].new_token_access_rights_tags_object['i'].active);

                    if(access_rights_setting == this.props.app_state.loc['544']/* 'enabled' */){
                        var enable_interactibles_checker = [ /* enable interactible checkers */
                            [20000, 5, 0],
                            [channel_stack_id], [35]/* target objects */
                        ]
                        strs.push([])
                        adds.push([])
                        ints.push(enable_interactibles_checker)
                        should_optimize_run = false
                    }

                    if(txs[i].interactibles.length != 0){
                        var add_interactibles_accounts = [ /* set account to be interactible */
                            [20000, 2, 0],
                            [], [],/* target objects */
                            [], [],/* target account ids*/
                            []/* interacible expiry time limit */
                        ]

                        for(var j = 0; j < txs[i].interactibles.length; j++){
                            add_interactibles_accounts[1].push(channel_stack_id)
                            add_interactibles_accounts[2].push(35)
                            add_interactibles_accounts[3].push(txs[i].interactibles[j]['id'])
                            txs[i].interactibles[j]['id'] == 53 ? add_interactibles_accounts[4].push(53) :add_interactibles_accounts[4].push(23)
                            add_interactibles_accounts[5].push(txs[i].interactibles[j]['timestamp'])
                        }

                        strs.push([])
                        adds.push([])
                        ints.push(add_interactibles_accounts)
                        should_optimize_run = false
        
                    }
                    if(txs[i].moderators.length != 0){
                        var add_moderator_accounts = [ /* set account as mod */
                            [20000, 4, 0],
                            [], [],/* target objects */
                            [], []/* target moderator account ids*/
                        ]

                        for(var j = 0; j < txs[i].moderators.length; j++){
                            add_moderator_accounts[1].push(channel_stack_id)
                            add_moderator_accounts[2].push(35)
                            add_moderator_accounts[3].push(txs[i].moderators[j])
                            txs[i].moderators[j] == 53 ? add_moderator_accounts[4].push(53):add_moderator_accounts[4].push(23)
                        }

                        strs.push([])
                        adds.push([])
                        ints.push(add_moderator_accounts)
                        should_optimize_run = false
                    }
                }
                else if(txs[i].type == this.props.app_state.loc['1046']/* 'storefront-item' */){
                    var storefront_data = this.format_storefront_object(txs[i])
                    strs.push([])
                    adds.push([])
                    ints.push(storefront_data)

                    new_tx_index = ints.length -1

                    // var index_data = this.format_indexing_post_item(txs[i], true/* should_index_title */, ints.length-1, ints[ints.length-1][0][9])
                    // strs.push(index_data.str)
                    // adds.push([])
                    // ints.push(index_data.int)
                }
                else if(txs[i].type == this.props.app_state.loc['946']/* 'buy-sell' */){
                    var buy_sell_obj = this.format_buy_sell_object(txs[i], ints)
                    if(buy_sell_obj['depth'][1].length > 0){
                        strs.push([])
                        adds.push([])
                        ints.push(buy_sell_obj['depth'])
                    }

                    strs.push([])
                    adds.push([])
                    ints.push(buy_sell_obj['obj'])
                    
                    if(txs[i].token_item['id'] == 3 && this.get_action(txs[i]) == 0){
                        //if we're buying end
                        wei = (bigInt(txs[i].token_item['data'][4][0]).multiply(txs[i].amount).add(35)).toString()
                    }
                }
                else if(txs[i].type == this.props.app_state.loc['1018']/* 'transfer' */){
                    var transfer_object = this.format_transfer_object(txs[i], ints)
                    if(transfer_object['swaps'][1].length > 0){
                        strs.push([])
                        adds.push([])
                        ints.push(transfer_object['swaps'])
                    }

                    strs.push([])
                    adds.push([])
                    ints.push(transfer_object['transfers'])
                }
                else if(txs[i].type == this.props.app_state.loc['1']/* 'enter-contract' */){
                    var enter_object = this.format_enter_contract_object(txs[i])
                    strs.push([])
                    adds.push([])
                    ints.push(enter_object)
                }
                else if(txs[i].type == this.props.app_state.loc['35']/* 'extend-contract' */){
                    var extend_object = this.format_extend_contract_object(txs[i])
                    strs.push([])
                    adds.push([])
                    ints.push(extend_object)
                }
                else if(txs[i].type == this.props.app_state.loc['19']/* 'exit-contract' */){
                    var exit_object = this.format_exit_contract_object(txs[i])
                    strs.push([])
                    adds.push([])
                    ints.push(exit_object)
                }
                else if(txs[i].type == this.props.app_state.loc['312']/* 'proposal' */){
                    var proposal_obj = this.format_proposal_object(txs[i])
                    strs.push([])
                    adds.push([])
                    ints.push(proposal_obj)

                    new_tx_index = ints.length -1

                    var include_yes_vote = this.get_selected_item(txs[i].get_auto_vote_yes_object, txs[i].get_auto_vote_yes_object['i'].active)

                    var proposal_stack_id = ints.length-1

                    // var index_data = this.format_indexing_post_item(txs[i], false/* should_index_title */, ints.length-1, ints[ints.length-1][0][9])
                    // strs.push(index_data.str)
                    // adds.push([])
                    // ints.push(index_data.int)

                    if(include_yes_vote == this.props.app_state.loc['438o']/* 'vote' */){
                        var yes_vote_object = [/* vote proposal */
                            [30000, 4, 0],
                            [proposal_stack_id], [35],/* proposal ids */
                            [1],/* votes */
                            [], [], []/* target bounty exchanges */
                        ]
                        
                        var bounty_exchanges = txs[i].bounty_values
                        for(var j=0; j<bounty_exchanges.length; j++){
                            yes_vote_object[4].push(bounty_exchanges[j]['exchange'].toString().toLocaleString('fullwide', {useGrouping:false}))
                            yes_vote_object[5].push(23)
                            yes_vote_object[6].push(0)
                        }

                        strs.push([])
                        adds.push([])
                        ints.push(yes_vote_object)
                    }
                }
                else if(txs[i].type == this.props.app_state.loc['796']/* 'vote' */){
                    var vote_obj = this.format_vote_object(txs[i])
                    strs.push([])
                    adds.push([])
                    ints.push(vote_obj)
                }
                else if(txs[i].type == this.props.app_state.loc['783']/* 'submit' */){
                    var submit_obj = this.format_submit_object(txs[i])
                    strs.push([])
                    adds.push([])
                    ints.push(submit_obj)
                }
                else if(txs[i].type == this.props.app_state.loc['862']/* 'pay-subscription' */){
                    var pay_subscription = this.format_pay_subscription_object(txs[i])
                    strs.push([])
                    adds.push([])
                    ints.push(pay_subscription)
                }
                else if(txs[i].type == this.props.app_state.loc['821']/* 'cancel-subscription' */){
                    var cancel_subscription = this.format_cancel_subscription_object(txs[i])
                    strs.push([])
                    adds.push([])
                    ints.push(cancel_subscription)
                } 
                else if(txs[i].type == this.props.app_state.loc['829']/* 'collect-subscription' */){
                    var collect_subscription = this.format_collect_subscription_object(txs[i])
                    strs.push([])
                    adds.push([])
                    ints.push(collect_subscription)
                }
                else if(txs[i].type == this.props.app_state.loc['840']/* 'modify-subscription' */){
                    var modify_subscription = this.format_modify_subscription_object(txs[i])
                    strs.push([])
                    adds.push([])
                    ints.push(modify_subscription)
                }   
                else if(txs[i].type == this.props.app_state.loc['64']/* 'modify-contract' */){
                    var modify_contract = this.format_modify_contract_object(txs[i])
                    strs.push([])
                    adds.push([])
                    ints.push(modify_contract)
                }
                else if(txs[i].type == this.props.app_state.loc['997']/* 'modify-token' */){
                    var modify_token = this.format_modify_token_object(txs[i])
                    strs.push([])
                    adds.push([])
                    ints.push(modify_token)
                }
                else if(txs[i].type == this.props.app_state.loc['907']/* 'exchange-transfer' */){
                    var exchange_transfer_obj = this.format_exchange_transfer_object(txs[i])
                    strs.push([])
                    adds.push([])
                    ints.push(exchange_transfer_obj)
                }
                else if(txs[i].type == this.props.app_state.loc['48']/* 'force-exit' */){
                    var force_exit_obj = this.format_force_exit_object(txs[i])
                    strs.push([])
                    adds.push([])
                    ints.push(force_exit_obj)
                }
                else if(txs[i].type == this.props.app_state.loc['768']/* 'archive' */){
                    var archive_obj = this.format_archive_object(txs[i])
                    strs.push([])
                    adds.push([])
                    ints.push(archive_obj)
                }
                else if(txs[i].type == this.props.app_state.loc['930']/* 'freeze/unfreeze' */){
                    var freeze_unfreeze_obj = this.format_freeze_unfreeze_object(txs[i])
                    strs.push([])
                    adds.push([])
                    ints.push(freeze_unfreeze_obj)
                }
                else if(txs[i].type == this.props.app_state.loc['880']/* 'authmint' */){
                    var authmint_obj = this.format_authmint_object(txs[i])
                    strs.push([])
                    adds.push([])
                    ints.push(authmint_obj)
                }
                else if(txs[i].type == this.props.app_state.loc['1265']/* 'access-rights-settings' */){
                    var access_rights_obj = this.format_access_rights_object(txs[i])
                    
                    for(var t=0; t<access_rights_obj.length; t++){
                        strs.push([])
                        adds.push([])
                        ints.push(access_rights_obj[t])
                    }    
                }
                else if(txs[i].type == this.props.app_state.loc['285']/* 'mail' */){
                    var mail_obj = await this.format_mail_object(txs[i], calculate_gas, ipfs_index)
                    
                    strs.push(mail_obj.str)
                    adds.push([])
                    ints.push(mail_obj.int)    
                }
                else if(txs[i].type == this.props.app_state.loc['1509']/* 'mail-messages' */){
                    var message_obj = await this.format_message_object(txs[i], calculate_gas, ipfs_index)
                    
                    strs.push(message_obj.str)
                    adds.push([])
                    ints.push(message_obj.int) 
                    
                    var message_transfers = this.get_message_transfers(txs[i], ints);
                    if(message_transfers.transfers_included == true){
                        for(var x=0; x<message_transfers.create_account_array.length; x++){
                            strs.push([])
                            adds.push([message_transfers.create_address_array[x]])
                            ints.push(message_transfers.create_account_array[x]);
                        }
                        strs.push([])
                        adds.push([])
                        ints.push(message_transfers.transfers_obj);
                    }
                }
                else if(txs[i].type == this.props.app_state.loc['1510']/* 'channel-messages' */){
                    var message_obj = await this.format_channel_message_object(txs[i], calculate_gas, ipfs_index)
                    
                    strs.push(message_obj.str)
                    adds.push([])
                    ints.push(message_obj.int)    

                    var message_transfers = this.get_message_transfers(txs[i], ints);
                    if(message_transfers.transfers_included == true){
                        for(var x=0; x<message_transfers.create_account_array.length; x++){
                            strs.push([])
                            adds.push([message_transfers.create_address_array[x]])
                            ints.push(message_transfers.create_account_array[x]);
                        }
                        strs.push([])
                        adds.push([])
                        ints.push(message_transfers.transfers_obj);
                    }
                }
                else if(txs[i].type == this.props.app_state.loc['1511']/* 'post-messages' */){
                    var message_obj = await this.format_post_comment_object(txs[i], calculate_gas, ipfs_index)
                    
                    strs.push(message_obj.str)
                    adds.push([])
                    ints.push(message_obj.int)
                    
                    var message_transfers = this.get_message_transfers(txs[i], ints);
                    if(message_transfers.transfers_included == true){
                        for(var x=0; x<message_transfers.create_account_array.length; x++){
                            strs.push([])
                            adds.push([message_transfers.create_address_array[x]])
                            ints.push(message_transfers.create_account_array[x]);
                        }
                        strs.push([])
                        adds.push([])
                        ints.push(message_transfers.transfers_obj);
                    }
                }
                else if(txs[i].type == this.props.app_state.loc['1512']/* 'job-response' */){
                    var message_obj = await this.format_job_application_object(txs[i], calculate_gas, ipfs_index)
                    
                    strs.push(message_obj.str)
                    adds.push([])
                    ints.push(message_obj.int)  
                    
                    // var message_transfers = this.get_message_transfers(txs[i]);
                    // if(message_transfers[1].length != 0){
                    //     strs.push([])
                    //     adds.push([])
                    //     ints.push(message_transfers);
                    // }
                }
                else if(txs[i].type == this.props.app_state.loc['1513']/* 'accept-job-application' */){
                    var message_obj = await this.format_accept_application_object(txs[i], calculate_gas, ipfs_index)
                    
                    strs.push(message_obj.str)
                    adds.push([])
                    ints.push(message_obj.int)
                }
                else if(txs[i].type == this.props.app_state.loc['1514']/* 'job-messages' */){
                    var message_obj = await this.format_job_comment_object(txs[i], calculate_gas, ipfs_index)
                    
                    strs.push(message_obj.str)
                    adds.push([])
                    ints.push(message_obj.int)  
                    
                    var message_transfers = this.get_message_transfers(txs[i], ints);
                    if(message_transfers.transfers_included == true){
                        for(var x=0; x<message_transfers.create_account_array.length; x++){
                            strs.push([])
                            adds.push([message_transfers.create_address_array[x]])
                            ints.push(message_transfers.create_account_array[x]);
                        }
                        strs.push([])
                        adds.push([])
                        ints.push(message_transfers.transfers_obj);
                    }
                }
                else if(txs[i].type == this.props.app_state.loc['1515']/* 'proposal-messages' */){
                    var message_obj = await this.format_proposal_message_object(txs[i], calculate_gas, ipfs_index)
                    
                    strs.push(message_obj.str)
                    adds.push([])
                    ints.push(message_obj.int) 
                    
                    var message_transfers = this.get_message_transfers(txs[i], ints);
                    if(message_transfers.transfers_included == true){
                        for(var x=0; x<message_transfers.create_account_array.length; x++){
                            strs.push([])
                            adds.push([message_transfers.create_address_array[x]])
                            ints.push(message_transfers.create_account_array[x]);
                        }
                        strs.push([])
                        adds.push([])
                        ints.push(message_transfers.transfers_obj);
                    }
                }
                else if(txs[i].type == this.props.app_state.loc['1516']/* 'storefront-bag' */){
                    var storefront_bag_obj = this.format_storefront_bag_object(txs[i])
                    strs.push([])
                    adds.push([])
                    ints.push(storefront_bag_obj)

                    new_tx_index = ints.length -1

                    // var index_data = this.format_indexing_post_item(txs[i], false/* should_index_title */, ints.length-1, ints[ints.length-1][0][9])
                    // strs.push(index_data.str)
                    // adds.push([])
                    // ints.push(index_data.int)

                    var bag_variants = []
                    
                    txs[i].items_to_deliver.forEach(item => {
                        var variant_images = []
                        if(item.selected_variant['image_data']['data']['images'].length > 0){
                            variant_images.push(item.selected_variant['image_data']['data']['images'][0])
                        }
                        bag_variants.push({'storefront_item_id':item.storefront_item['id'], 'storefront_variant_id':item.selected_variant['variant_id'], 'purchase_unit_count':item.purchase_unit_count, 'variant_images':variant_images })
                    });

                    var final_bag_object = { 'bag_orders':bag_variants, 'timestamp':Date.now(), content_channeling_setting: txs[i].content_channeling_setting, device_language_setting: txs[i].device_language_setting, device_country: txs[i].device_country, device_city: txs[i].selected_device_city, delivery_location: txs[i].delivery_location  }

                    var metadata_action = [ /* set metadata */
                        [20000, 1, 0],
                        [], [],/* target objects */
                        []/* contexts */, 
                        []/* int_data */
                    ]
                    var metadata_strings = [ [] ]
                    metadata_action[1].push(new_tx_index)
                    metadata_action[2].push(35)
                    metadata_action[3].push(0)
                    metadata_action[4].push(0)
                    var ipfs_obj = await this.get_object_ipfs_index(final_bag_object, calculate_gas, ipfs_index, txs[i].id);
                    metadata_strings[0].push(ipfs_obj.toString())

                    should_optimize_run = false

                    ints.push(metadata_action)
                    strs.push(metadata_strings)
                    adds.push([])
                }
                else if(txs[i].type == this.props.app_state.loc['1497']/* 'bag-response' */){
                    var message_obj = await this.format_bag_application_object(txs[i], calculate_gas, ipfs_index)
                    
                    strs.push(message_obj.str)
                    adds.push([])
                    ints.push(message_obj.int)    
                }
                else if(txs[i].type == this.props.app_state.loc['1498']/* 'accept-bag-application' */){
                    var message_obj = await this.format_accept_bag_application_object(txs[i], calculate_gas, ipfs_index)
                    
                    strs.push(message_obj.str)
                    adds.push([])
                    ints.push(message_obj.int)
                }
                else if(txs[i].type == this.props.app_state.loc['1499']/* 'direct-purchase' */){
                    var message_obj = await this.format_direct_purchase_object(txs[i], calculate_gas, ints, ipfs_index)
                    if(message_obj.depth[1].length > 0){
                        strs.push([])
                        adds.push([])
                        ints.push(message_obj.depth)
                    }

                    strs.push(message_obj.str)
                    adds.push([])
                    ints.push(message_obj.int)
                }
                else if(txs[i].type == this.props.app_state.loc['1500']/* 'clear-purchase' */){
                    var clear_obj = await this.format_clear_purchase_object(txs[i], calculate_gas, ipfs_index)
                    
                    strs.push(clear_obj.str)
                    adds.push([])
                    ints.push(clear_obj.int)    
                }
                else if(txs[i].type == this.props.app_state.loc['1501']/* 'bag-messages' */){
                    var message_obj = await this.format_bag_comment_object(txs[i], calculate_gas, ipfs_index)
                    
                    strs.push(message_obj.str)
                    adds.push([])
                    ints.push(message_obj.int) 
                    
                    var message_transfers = this.get_message_transfers(txs[i], ints);
                    if(message_transfers.transfers_included == true){
                        for(var x=0; x<message_transfers.create_account_array.length; x++){
                            strs.push([])
                            adds.push([message_transfers.create_address_array[x]])
                            ints.push(message_transfers.create_account_array[x]);
                        }
                        strs.push([])
                        adds.push([])
                        ints.push(message_transfers.transfers_obj);
                    }
                }
                else if(txs[i].type == this.props.app_state.loc['1502']/* 'storefront-messages' */){
                    var message_obj = await this.format_storefront_comment_object(txs[i], calculate_gas, ipfs_index)
                    
                    strs.push(message_obj.str)
                    adds.push([])
                    ints.push(message_obj.int)

                    var message_transfers = this.get_message_transfers(txs[i], ints);
                    if(message_transfers.transfers_included == true){
                        for(var x=0; x<message_transfers.create_account_array.length; x++){
                            strs.push([])
                            adds.push([message_transfers.create_address_array[x]])
                            ints.push(message_transfers.create_account_array[x]);
                        }
                        strs.push([])
                        adds.push([])
                        ints.push(message_transfers.transfers_obj);
                    }
                }
                else if(txs[i].type == this.props.app_state.loc['1503']/* 'contractor' */){
                    var contractor_obj = this.format_contractor_object(txs[i])
                    strs.push([])
                    adds.push([])
                    ints.push(contractor_obj)

                    new_tx_index = ints.length -1

                    // var index_data = this.format_indexing_post_item(txs[i], false/* should_index_title */, ints.length-1, ints[ints.length-1][0][9])
                    // strs.push(index_data.str)
                    // adds.push([])
                    // ints.push(index_data.int)
                }
                else if(txs[i].type == this.props.app_state.loc['1363']/* 'job-request' */){
                    var now = parseInt(now.toString() + i)
                    var message_obj = await this.format_job_request_object(txs[i], calculate_gas, now, ipfs_index)
                    
                    strs.push(message_obj.str)
                    adds.push([])
                    ints.push(message_obj.int)    
                }
                else if(txs[i].type == this.props.app_state.loc['1504']/* 'accept-job-request' */){
                    var message_obj = await this.format_accept_job_request_object(txs[i], calculate_gas, ipfs_index)
                    
                    strs.push(message_obj.str)
                    adds.push([])
                    ints.push(message_obj.int)
                }  
                else if(txs[i].type == this.props.app_state.loc['1505']/* 'job-request-messages' */){
                    var message_obj = await this.format_job_request_comment_object(txs[i], calculate_gas, ipfs_index)
                    
                    strs.push(message_obj.str)
                    adds.push([])
                    ints.push(message_obj.int)

                    var message_transfers = this.get_message_transfers(txs[i], ints);
                    if(message_transfers.transfers_included == true){
                        for(var x=0; x<message_transfers.create_account_array.length; x++){
                            strs.push([])
                            adds.push([message_transfers.create_address_array[x]])
                            ints.push(message_transfers.create_account_array[x]);
                        }
                        strs.push([])
                        adds.push([])
                        ints.push(message_transfers.transfers_obj);
                    }
                }
                else if(txs[i].type == this.props.app_state.loc['1506']/* 'alias' */){
                    var alias_obj = await this.format_alias_object(txs[i], calculate_gas, ipfs_index)
                    
                    strs.push(alias_obj.str)
                    adds.push([])
                    ints.push(alias_obj.int)
                }
                else if(txs[i].type == this.props.app_state.loc['1507']/* 'unalias' */){
                    var alias_obj = await this.format_unalias_object(txs[i], calculate_gas)
                    
                    strs.push(alias_obj.str)
                    adds.push([])
                    ints.push(alias_obj.int)
                }
                else if(txs[i].type == this.props.app_state.loc['1508']/* 're-alias' */){
                    var alias_obj = await this.format_realias_object(txs[i], calculate_gas)
                    
                    strs.push(alias_obj.str)
                    adds.push([])
                    ints.push(alias_obj.int)

                    strs.push(alias_obj.str)
                    adds.push([])
                    ints.push(alias_obj.int)
                }
                else if(
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
                    txs[i].type == this.props.app_state.loc['3072h']/* 'edit-poll' */
                ){
                    var format_edit_object = await this.format_edit_object(txs[i], calculate_gas, ipfs_index)
                    strs.push(format_edit_object.metadata_strings)
                    adds.push([])
                    ints.push(format_edit_object.metadata_action)

                    if(txs[i].type == this.props.app_state.loc['3030']/* 'edit-nitro' */){
                        var url = txs[i].node_url
                        var original_url = this.get_all_sorted_objects_mappings(this.props.app_state.nitro_links)[txs[i].object_id]

                        if(original_url != url){
                            var transaction_obj = [ /* set data */
                                [20000, 13, 0],
                                [txs[i].object_id], [23],/* target objects */
                                [400], /* contexts */
                                [0] /* int_data */
                            ]

                            var string_obj = [[]]
                            string_obj[0].push(url)
                            
                            strs.push(string_obj)
                            adds.push([])
                            ints.push(transaction_obj)
                        }
                    }
                }
                else if(txs[i].type == this.props.app_state.loc['1155']/* 'award' */){
                    var format_object = await this.format_award_object(txs[i], calculate_gas, ints, ipfs_index)
                    if(format_object.depth[1].length > 0){
                        strs.push([])
                        adds.push([])
                        ints.push(format_object.depth)
                    }
                    if(format_object.should_include_create_recipient == true){
                        strs.push([])
                        adds.push([format_object.final_receiver_string])
                        ints.push(format_object.create_account_obj)
                    }
                    strs.push(format_object.str)
                    adds.push([])
                    ints.push(format_object.int)
                }
                else if(txs[i].type == this.props.app_state.loc['898']/* 'depthmint' */){
                    var depthmint_obj = this.format_depthmint_object(txs[i])
                    strs.push([])
                    adds.push([])
                    ints.push(depthmint_obj)
                }
                else if(txs[i].type == this.props.app_state.loc['2846']/* stage-royalty */){
                    var stage_royalty_obj = await this.format_stage_royalty_object(txs[i], calculate_gas, ipfs_index)
                    
                    strs.push(stage_royalty_obj.str)
                    adds.push([])
                    ints.push(stage_royalty_obj.int)
                }
                else if(txs[i].type == this.props.app_state.loc['2884']/* 'royalty-payouts' */){
                    var royalty_payout_obj = await this.format_make_royalty_payout_object(txs[i], calculate_gas, ipfs_index)

                    //the transfers
                    strs.push([])
                    adds.push([])
                    ints.push(royalty_payout_obj.transfers_obj)

                    //the record of the transafers
                    strs.push(royalty_payout_obj.str)
                    adds.push([])
                    ints.push(royalty_payout_obj.transfers_record)
                }
                else if(txs[i].type == this.props.app_state.loc['2896']/* 'upcoming-subscriptions' */){
                    var pay_subscription = this.format_pay_upcoming_subscriptions(txs[i])
                    strs.push([])
                    adds.push([])
                    ints.push(pay_subscription)
                }
                else if(txs[i].type == this.props.app_state.loc['a311a']/* audio */){
                    var contractor_obj = this.format_audio_object(txs[i])
                    strs.push([])
                    adds.push([])
                    ints.push(contractor_obj)

                    new_tx_index = ints.length -1

                    // var index_data = this.format_indexing_post_item(txs[i], false/* should_index_title */, ints.length-1, ints[ints.length-1][0][9])
                    // strs.push(index_data.str)
                    // adds.push([])
                    // ints.push(index_data.int)
                }
                else if(txs[i].type == this.props.app_state.loc['1593cc']/* 'audio-messages' */){
                    var message_obj = await this.format_audiopost_comment_object(txs[i], calculate_gas, ipfs_index)
                    
                    strs.push(message_obj.str)
                    adds.push([])
                    ints.push(message_obj.int)
                    
                    var message_transfers = this.get_message_transfers(txs[i], ints);
                    if(message_transfers.transfers_included == true){
                        for(var x=0; x<message_transfers.create_account_array.length; x++){
                            strs.push([])
                            adds.push([message_transfers.create_address_array[x]])
                            ints.push(message_transfers.create_account_array[x]);
                        }
                        strs.push([])
                        adds.push([])
                        ints.push(message_transfers.transfers_obj);
                    }
                }
                else if(txs[i].type == this.props.app_state.loc['2962']/* 'buy-album' */){
                    var buy_album_obj = await this.format_buy_album_songs(txs[i], calculate_gas, ints, ipfs_index)
                    
                    if(buy_album_obj.depth_swap_obj[1].length > 0){
                        strs.push([])
                        adds.push([])
                        ints.push(buy_album_obj.depth_swap_obj)
                    }

                    if(buy_album_obj.transfers_obj[1].length > 0){
                        strs.push([])
                        adds.push([])
                        ints.push(buy_album_obj.transfers_obj)
                    }
                    
                    strs.push(buy_album_obj.string_obj)
                    adds.push([])
                    ints.push(buy_album_obj.obj)
                }
                else if(txs[i].type == this.props.app_state.loc['b311a']/* video */){
                    var contractor_obj = this.format_video_object(txs[i])
                    strs.push([])
                    adds.push([])
                    ints.push(contractor_obj)

                    new_tx_index = ints.length -1

                    // var index_data = this.format_indexing_post_item(txs[i], false/* should_index_title */, ints.length-1, ints[ints.length-1][0][9])
                    // strs.push(index_data.str)
                    // adds.push([])
                    // ints.push(index_data.int)
                }
                else if(txs[i].type == this.props.app_state.loc['1593ct']/* 'video-messages' */){
                    var message_obj = await this.format_videopost_comment_object(txs[i], calculate_gas, ipfs_index)
                    
                    strs.push(message_obj.str)
                    adds.push([])
                    ints.push(message_obj.int)
                    
                    var message_transfers = this.get_message_transfers(txs[i], ints);
                    if(message_transfers.transfers_included == true){
                        for(var x=0; x<message_transfers.create_account_array.length; x++){
                            strs.push([])
                            adds.push([message_transfers.create_address_array[x]])
                            ints.push(message_transfers.create_account_array[x]);
                        }
                        strs.push([])
                        adds.push([])
                        ints.push(message_transfers.transfers_obj);
                    }
                }
                else if(txs[i].type == this.props.app_state.loc['a2962a']/* 'buy-video' */){
                    var buy_album_obj = await this.format_buy_videopost_videos(txs[i], calculate_gas, ints, ipfs_index)
                    
                    if(buy_album_obj.depth_swap_obj[1].length > 0){
                        strs.push([])
                        adds.push([])
                        ints.push(buy_album_obj.depth_swap_obj)
                    }

                    if(buy_album_obj.transfers_obj[1].length > 0){
                        strs.push([])
                        adds.push([])
                        ints.push(buy_album_obj.transfers_obj)
                    }
                    
                    strs.push(buy_album_obj.string_obj)
                    adds.push([])
                    ints.push(buy_album_obj.obj)
                }
                else if(txs[i].type == this.props.app_state.loc['a273a']/* 'nitro' */){
                    var contractor_obj = this.format_nitro_object(txs[i])
                    strs.push([])
                    adds.push([])
                    ints.push(contractor_obj)

                    new_tx_index = ints.length -1

                    // var index_data = this.format_indexing_post_item(txs[i], false/* should_index_title */, ints.length-1, ints[ints.length-1][0][9])
                    // strs.push(index_data.str)
                    // adds.push([])
                    // ints.push(index_data.int)


                    var transaction_obj = [ /* set data */
                        [20000, 13, 0],
                        [new_tx_index], [35],/* target objects */
                        [400], /* contexts */
                        [0] /* int_data */
                    ]

                    var string_obj = [[]]
                    var url = txs[i].node_url
                    string_obj[0].push(url)
                    
                    strs.push(string_obj)
                    adds.push([])
                    ints.push(transaction_obj)
                }
                else if(txs[i].type == this.props.app_state.loc['1593cu']/* 'nitro-messages' */){
                    var message_obj = await this.format_nitropost_comment_object(txs[i], calculate_gas, ipfs_index)
                    
                    strs.push(message_obj.str)
                    adds.push([])
                    ints.push(message_obj.int)
                    
                    var message_transfers = this.get_message_transfers(txs[i], ints);
                    if(message_transfers.transfers_included == true){
                        for(var x=0; x<message_transfers.create_account_array.length; x++){
                            strs.push([])
                            adds.push([message_transfers.create_address_array[x]])
                            ints.push(message_transfers.create_account_array[x]);
                        }
                        strs.push([])
                        adds.push([])
                        ints.push(message_transfers.transfers_obj);
                    }
                }
                else if(txs[i].type == this.props.app_state.loc['3031']/* 'buy-storage' */){
                    var buy_album_obj = this.format_buy_nitro_object(txs[i], ints)
                    if(buy_album_obj.depth_swap_obj[1].length > 0){
                        strs.push([])
                        adds.push([])
                        ints.push(buy_album_obj.depth_swap_obj)
                    }

                    if(buy_album_obj.transfers_obj[1].length > 0){
                        strs.push([])
                        adds.push([])
                        ints.push(buy_album_obj.transfers_obj)
                    }
                    
                    strs.push(buy_album_obj.string_obj)
                    adds.push([])
                    ints.push(buy_album_obj.obj)
                }
                else if(txs[i].type == 'admin'){
                    var obj = await this.format_admin_object(txs[i], calculate_gas, ipfs_index)
                    
                    strs.push(obj.str)
                    adds.push([])
                    ints.push(obj.int)
                }
                else if(txs[i].type == this.props.app_state.loc['3068ac']/* 'iTransfer' */){
                    var format_object = await this.format_iTransfer_object(txs[i], calculate_gas, ints, ipfs_index)
                    if(format_object.depth[1].length > 0){
                        strs.push([])
                        adds.push([])
                        ints.push(format_object.depth)
                    }
                    strs.push(format_object.str)
                    adds.push([])
                    ints.push(format_object.int)
                }
                else if(txs[i].type == this.props.app_state.loc['3068af']/* 'bill' */){
                    var bill_obj = await this.format_bill_object(txs[i], calculate_gas, ipfs_index)
                    
                    strs.push(bill_obj.str)
                    adds.push([])
                    ints.push(bill_obj.int)
                }
                else if(txs[i].type == this.props.app_state.loc['3071j']/* 'bill-payment' */){
                    var format_object = await this.format_bill_payment_object(txs[i], calculate_gas, ints, ipfs_index)
                    if(format_object.depth[1].length > 0){
                        strs.push([])
                        adds.push([])
                        ints.push(format_object.depth)
                    }
                    strs.push(format_object.str)
                    adds.push([])
                    ints.push(format_object.int)
                }
                else if(txs[i].type == this.props.app_state.loc['c311a']/* 'poll' */){
                    var job_obj = this.format_poll_object(txs[i])
                    strs.push([])
                    adds.push([])
                    ints.push(job_obj)

                    new_tx_index = ints.length -1
                    var hash_obj = this.format_hash_record(txs[i], new_tx_index)
                    strs.push(hash_obj.str)
                    adds.push([])
                    ints.push(hash_obj.int)

                    // var index_data = this.format_indexing_post_item(txs[i], false/* should_index_title */, ints.length-1, ints[ints.length-1][0][9])
                    // strs.push(index_data.str)
                    // adds.push([])
                    // ints.push(index_data.int)
                }
                
                delete_pos_array.push(i)
                pushed_txs.push(txs[i])
                if(new_tx_index != -1) new_transaction_index_obj[txs[i].id] = new_tx_index
            }
            
        }


        var metadata_action = [ /* set metadata */
            [20000, 1, 0],
            [], [],/* target objects */
            []/* contexts */, 
            []/* int_data */
        ]
        var metadata_strings = [ [] ]


        for(var i=0; i<pushed_txs.length; i++){
            if(
                pushed_txs[i].type == this.props.app_state.loc['1130']/* 'contract' */ || 
                pushed_txs[i].type == this.props.app_state.loc['601']/* 'token' */ || 
                pushed_txs[i].type == this.props.app_state.loc['823']/* 'subscription' */ || 
                pushed_txs[i].type == this.props.app_state.loc['297']/* 'post' */ || 
                pushed_txs[i].type == this.props.app_state.loc['760']/* 'job' */ || 
                pushed_txs[i].type == this.props.app_state.loc['109']/* 'channel' */ || 
                pushed_txs[i].type == this.props.app_state.loc['439']/* 'storefront-item' */|| 
                pushed_txs[i].type == this.props.app_state.loc['784']/* 'proposal' */ || 
                pushed_txs[i].type == this.props.app_state.loc['253']/* 'contractor' */ || 
                pushed_txs[i].type == this.props.app_state.loc['a311a']/* audio */ || 
                pushed_txs[i].type == this.props.app_state.loc['b311a']/* video */ || 
                pushed_txs[i].type == this.props.app_state.loc['a273a']/* 'nitro' */||
                pushed_txs[i].type == this.props.app_state.loc['c311a']/* 'poll' */
            ){
                metadata_action[1].push(new_transaction_index_obj[pushed_txs[i].id])
                metadata_action[2].push(35)
                metadata_action[3].push(0)
                metadata_action[4].push(0)
                var ipfs_obj = await this.get_object_ipfs_index(pushed_txs[i], calculate_gas, ipfs_index, pushed_txs[i].id);
                metadata_strings[0].push(ipfs_obj.toString())
            }
        }

        if(metadata_action[1].length != 0){
            ints.push(metadata_action)
            strs.push(metadata_strings)
            adds.push([])
        }
        






        var index_data_in_tags = [ /* index data in tags */
            [20000, 12, 0],
            [], []/* target objects */
        ]

        var index_data_strings = [ [], [] ]

        for(var i=0; i<pushed_txs.length; i++){
            if(
                pushed_txs[i].type == this.props.app_state.loc['1130']/* 'contract' */ || pushed_txs[i].type == this.props.app_state.loc['601']/* 'token' */ || 
                pushed_txs[i].type == this.props.app_state.loc['823']/* 'subscription' */ || pushed_txs[i].type == this.props.app_state.loc['297']/* 'post' */ || 
                pushed_txs[i].type == this.props.app_state.loc['760']/* 'job' */ || 
                pushed_txs[i].type == this.props.app_state.loc['109']/* 'channel' */ || 
                pushed_txs[i].type == this.props.app_state.loc['439']/* 'storefront-item' */ || 
                pushed_txs[i].type == this.props.app_state.loc['784']/* 'proposal' */ || 
                pushed_txs[i].type == this.props.app_state.loc['253']/* 'contractor' */ || 
                pushed_txs[i].type == this.props.app_state.loc['a311a']/* audio */ || 
                pushed_txs[i].type == this.props.app_state.loc['b311a']/* video */|| 
                pushed_txs[i].type == this.props.app_state.loc['a273a']/* 'nitro' */||
                pushed_txs[i].type == this.props.app_state.loc['c311a']/* 'poll' */
            ){
                // var tx_tags = pushed_txs[i].entered_indexing_tags
                index_data_in_tags[1].push(new_transaction_index_obj[pushed_txs[i].id])
                index_data_in_tags[2].push(35)
                index_data_strings[0].push('en')
                index_data_strings[1].push('')
                // for(var t=0; t<tx_tags.length; t++){
                //     index_data_in_tags[1].push(i)
                //     index_data_in_tags[2].push(35)
                //     index_data_strings[0].push(tx_tags[t])
                //     index_data_strings[1].push('')
                // }
            }
        }

        if(index_data_in_tags[1].length != 0){
            ints.push(index_data_in_tags)
            strs.push(index_data_strings)
            adds.push([])
        }



        var runs = this.props.app_state.E5_runs[e5] == null ? [] : this.props.app_state.E5_runs[e5]

        if(runs.length == 0){
            //if its the first time running a transaction
            const obj = [ /* set data */
                [20000, 13, 0],
                [0], [53],/* target objects */
                [0], /* contexts */
                [0] /* int_data */
            ]

            const string_obj = [[]]
            var pub_key_link = calculate_gas == true ? "TVlfS2g5aTNWaENoSnVUem9fQ3l1NmJHNmhDdmFzcXpXR2ZvNG9uaU5uQV8xeGppQVl4Vw==" : await this.get_account_public_key()
            string_obj[0].push(pub_key_link)
            
            strs.push(string_obj)
            adds.push([])
            ints.push(obj)
        }

        if(this.props.app_state.should_update_contacts_onchain){
            const transaction_obj = [ /* set data */
                [20000, 13, 0],
                [0], [53],/* target objects */
                [1], /* contexts */
                [0] /* int_data */
            ]

            const string_obj = [[]]
            var contacts_clone = structuredClone(this.props.app_state.contacts)
            const data = {'all_contacts':contacts_clone, 'time':Date.now()}
            const string_data = await this.get_object_ipfs_index(data, calculate_gas, ipfs_index, 'contacts');
            string_obj[0].push(string_data)
            
            strs.push(string_obj)
            adds.push([])
            ints.push(transaction_obj)
        }

        if(this.props.app_state.should_update_blocked_accounts_onchain){
            const transaction_obj = [ /* set data */
                [20000, 13, 0],
                [0], [53],/* target objects */
                [2], /* contexts */
                [0] /* int_data */
            ]

            const string_obj = [[]]
            var blocked_accounts = structuredClone(this.props.app_state.blocked_accounts)
            const data = {'all_blocked_accounts':blocked_accounts, 'time':Date.now()}
            const string_data = await this.get_object_ipfs_index(data, calculate_gas, ipfs_index, 'blocked');
            string_obj[0].push(string_data)
            
            strs.push(string_obj)
            adds.push([])
            ints.push(transaction_obj)
        }

        if(this.props.app_state.should_update_section_tags_onchain){
            const transaction_obj = [ /* set data */
                [20000, 13, 0],
                [0], [53],/* target objects */
                [3], /* contexts */
                [0] /* int_data */
            ]

            const string_obj = [[]]
            var job_section_tags = this.props.app_state.job_section_tags
            var explore_section_tags = this.props.app_state.explore_section_tags
            const data = {'job_section_tags': job_section_tags, 'explore_section_tags':explore_section_tags, 'time':Date.now()}
            const string_data = await this.get_object_ipfs_index(data, calculate_gas, ipfs_index, 'tags');
            string_obj[0].push(string_data)
            
            strs.push(string_obj)
            adds.push([])
            ints.push(transaction_obj)
        }

        if(this.props.app_state.update_data_in_E5){
            const transaction_obj = [ /* set data */
                [20000, 13, 0],
                [0], [53],/* target objects */
                [4], /* contexts */
                [0] /* int_data */
            ]

            const string_obj = [[]]
            var uploaded_data = this.props.app_state.uploaded_data_cids
            const data = {'cids': uploaded_data, 'time':Date.now()}
            const string_data = await this.get_object_ipfs_index(data, calculate_gas, ipfs_index, 'ciddata');
            string_obj[0].push(string_data)

            strs.push(string_obj)
            adds.push([])
            ints.push(transaction_obj)
        }

        var added_song_album_data = this.get_songs_and_albums_to_add(pushed_txs);
        if(added_song_album_data.tracks.length != 0){
            const transaction_obj = [ /* set data */
                [20000, 13, 0],
                [0], [53],/* target objects */
                [5], /* contexts */
                [0] /* int_data */
            ]

            const string_obj = [[]]
            var my_albums = this.props.app_state.my_albums.slice()
            var my_tracks = this.props.app_state.my_tracks.slice()

            added_song_album_data.albums.forEach(album => {
                my_albums.push(album)
            });
            added_song_album_data.tracks.forEach(track => {
                my_tracks.push(track)
            });

            const data = {'my_albums': my_albums, 'my_tracks':my_tracks, 'time':Date.now()}
            const string_data = await this.get_object_ipfs_index(data, calculate_gas, ipfs_index, 'myaudio');
            string_obj[0].push(string_data)

            strs.push(string_obj)
            adds.push([])
            ints.push(transaction_obj)
        }

        if(this.props.app_state.should_update_playlists_in_E5 == true){
            const transaction_obj = [ /* set data */
                [20000, 13, 0],
                [0], [53],/* target objects */
                [6], /* contexts */
                [0] /* int_data */
            ]

            const string_obj = [[]]
            var my_playlists = this.props.app_state.my_playlists
            const data = {'playlists': my_playlists, 'time':Date.now()}
            const string_data = await this.get_object_ipfs_index(data, calculate_gas, ipfs_index, 'myplaylists');
            string_obj[0].push(string_data)

            strs.push(string_obj)
            adds.push([])
            ints.push(transaction_obj)
        }

        if(this.props.app_state.should_update_song_plays == true){
            const transaction_obj = [ /* set data */
                [20000, 13, 0],
                [0], [53],/* target objects */
                [7], /* contexts */
                [0] /* int_data */
            ]

            const string_obj = [[]]
            var song_plays = this.props.app_state.song_plays
            const data = {'plays': song_plays, 'time':Date.now()}
            const string_data = await this.get_object_ipfs_index(data, calculate_gas, ipfs_index, 'myplays');
            string_obj[0].push(string_data)

            strs.push(string_obj)
            adds.push([])
            ints.push(transaction_obj)
        }

        if(this.props.app_state.should_update_followed_accounts == true){
            const transaction_obj = [ /* set data */
                [20000, 13, 0],
                [0], [53],/* target objects */
                [8], /* contexts */
                [0] /* int_data */
            ]

            const string_obj = [[]]
            var followed_accounts = this.props.app_state.followed_accounts
            const data = {'followed_accounts': followed_accounts, 'time':Date.now()}
            const string_data = await this.get_object_ipfs_index(data, calculate_gas, ipfs_index, 'following');
            string_obj[0].push(string_data)
            
            strs.push(string_obj)
            adds.push([])
            ints.push(transaction_obj)
        }

        if(this.props.app_state.should_update_posts_blocked_by_me == true){
            const transaction_obj = [ /* set data */
                [20000, 13, 0],
                [0], [53],/* target objects */
                [9], /* contexts */
                [0] /* int_data */
            ]

            const string_obj = [[]]
            var posts_blocked_by_me = this.props.app_state.posts_blocked_by_me
            const data = {'posts_blocked_by_me': posts_blocked_by_me, 'time':Date.now()}
            const string_data = await this.get_object_ipfs_index(data, calculate_gas, ipfs_index, 'blockedposts');
            string_obj[0].push(string_data)
            
            strs.push(string_obj)
            adds.push([])
            ints.push(transaction_obj)
        }

        if(this.props.app_state.should_update_censored_keyword_phrases == true){
            const transaction_obj = [ /* set data */
                [20000, 13, 0],
                [0], [53],/* target objects */
                [10], /* contexts */
                [0] /* int_data */
            ]

            const string_obj = [[]]
            var censored_keyword_phrases = this.props.app_state.censored_keyword_phrases
            const data = {'censored_keywords': censored_keyword_phrases, 'time':Date.now()}
            const string_data = await this.get_object_ipfs_index(data, calculate_gas, ipfs_index, 'censoredkeywords');
            string_obj[0].push(string_data)
            
            strs.push(string_obj)
            adds.push([])
            ints.push(transaction_obj)
        }

        var added_video_data = this.get_videos_to_add(pushed_txs);
        if(added_video_data.videos.length != 0){
            const transaction_obj = [ /* set data */
                [20000, 13, 0],
                [0], [53],/* target objects */
                [11], /* contexts */
                [0] /* int_data */
            ]

            const string_obj = [[]]
            var my_videoposts = this.props.app_state.my_videoposts.slice()
            var my_videos = this.props.app_state.my_videos.slice()

            added_video_data.videoposts.forEach(videopost => {
                my_videoposts.push(videopost)
            });
            added_video_data.videos.forEach(video => {
                my_videos.push(video)
            });

            const data = {'my_videoposts': my_videoposts, 'my_videos':my_videos, 'time':Date.now()}
            const string_data = await this.get_object_ipfs_index(data, calculate_gas, ipfs_index, 'myvideo');
            string_obj[0].push(string_data)

            strs.push(string_obj)
            adds.push([])
            ints.push(transaction_obj)
        }

        if(this.props.app_state.should_update_posts_reposted_by_me == true){
            const transaction_obj = [ /* set data */
                [20000, 13, 0],
                [0], [53],/* target objects */
                [12], /* contexts */
                [0] /* int_data */
            ]

            const string_obj = [[]]
            var posts_reposted_by_me = this.props.app_state.posts_reposted_by_me
            const data = {'data': posts_reposted_by_me, 'time':Date.now()}
            const string_data = await this.get_object_ipfs_index(data, calculate_gas, ipfs_index, 'promoted');
            string_obj[0].push(string_data)
            
            strs.push(string_obj)
            adds.push([])
            ints.push(transaction_obj)
        }

        //context ->> 13 in use!!!!!!!


        var optimized_run = this.optimize_run_if_enabled(ints, strs, adds, should_optimize_run)
        console.log('rundata',optimized_run)
        ints = optimized_run['ints']
        strs = optimized_run['strs']
        adds = optimized_run['adds']

        // this.props.lock_run(false)
        // return;
        


        var account_balance = this.props.app_state.account_balance[e5]
        var run_gas_limit = this.state.run_gas_limit == 0 ? 5_300_000 : this.state.run_gas_limit
        // var run_gas_price = this.state.run_gas_price == 0 ? this.props.app_state.gas_price[e5] : this.state.run_gas_price
        var run_gas_price = this.get_gas_price()
        var run_expiry_duration = this.state.run_time_expiry == 0 ? (60*60*5/* 5 hours */) : this.state.run_time_expiry

        var gas_limit = this.get_latest_block_data(e5).gasLimit
        var estimated_gas_to_be_consumed = this.estimated_gas_consumed()

        if(!calculate_gas){
            if(pushed_txs.length > 0){
                if(account_balance == 0){
                    if(!silently) this.props.open_wallet_guide_bottomsheet('one')
                    this.props.lock_run(false)
                }
                else if(account_balance < (estimated_gas_to_be_consumed * run_gas_price)){
                    // this.setState({invalid_ether_amount_dialog_box: true})
                    if(!silently) this.props.show_dialog_bottomsheet({'run_gas_limit':run_gas_limit}, 'invalid_ether_amount_dialog_box')
                    this.props.lock_run(false)
                }
                else if(run_gas_limit < 35000){
                    if(!silently) this.props.notify(this.props.app_state.loc['1517']/* 'That transaction gas limit is too low.' */,5900)
                    this.props.lock_run(false)
                }
                else if(estimated_gas_to_be_consumed > gas_limit){
                    if(!silently) this.props.notify(this.props.app_state.loc['1518']/* 'That transaction is too large, please reduce your stack size.' */,6900)
                    this.props.lock_run(false)
                }
                else if(estimated_gas_to_be_consumed > run_gas_limit){
                    if(!silently) this.props.notify(this.props.app_state.loc['1519']/* 'Set a gas limit above ' */+number_with_commas(estimated_gas_to_be_consumed)+this.props.app_state.loc['1520']/* ' gas' */,3900)
                    this.props.lock_run(false)
                }
                else{
                    var gas_lim = run_gas_limit.toString().toLocaleString('fullwide', {useGrouping:false})
                    this.props.run_transaction_with_e(strs, ints, adds, gas_lim, wei, delete_pos_array, run_gas_price, run_expiry_duration, e5)
                }
            }else{
                this.props.lock_run(false)
                if(!silently) this.props.notify(this.props.app_state.loc['1521']/* 'Add some transactions first.' */,1600)
            }
        }else{
            var gas_lim = run_gas_limit.toString().toLocaleString('fullwide', {useGrouping:false})
            this.props.calculate_gas_with_e(strs, ints, adds, gas_lim, wei, delete_pos_array, run_gas_price, this.set_max_priority_per_gas(), this.set_max_fee_per_gas())
        }
        this.setState({can_switch_e5s: true})
    }

    get_ipfs_index_object = async (txs, now, calculate_gas) => {
        this.setState({stack_size_in_bytes: -1})
        const ipfs_index_object = {'version':this.props.app_state.version, 'color':this.get_device_color()}
        const obj = {'version':this.props.app_state.version, 'color':this.get_device_color(), 'tags':{'color':this.get_device_color()}}
        const ipfs_index_array = []
        console.log('stack_page_ipfs', 'initial object data', ipfs_index_object)
        const pushed_txs = []
        for(var i=0; i<txs.length; i++){
            if(!this.props.app_state.hidden.includes(txs[i]) && txs[i].e5 == this.props.app_state.selected_e5){
                console.log('stackitem', 'pushing type', txs[i].type)
                pushed_txs.push(txs[i])
                if(txs[i].type == this.props.app_state.loc['285']/* 'mail' */){
                    var t = txs[i]
                    var mail_obj = await this.get_encrypted_mail_message(t, t.target_recipient)
                    ipfs_index_object[t.id] = mail_obj

                    ipfs_index_array.push({'id':t.id, 'data':mail_obj})
                }
                else if(txs[i].type == this.props.app_state.loc['1509']/* 'mail-messages' */){
                    var t = txs[i]
                    for(var m=0; m<t.messages_to_deliver.length; m++){
                        const data = await this.get_encrypted_mail_message(t.messages_to_deliver[m], t.messages_to_deliver[m]['recipient'])
                        ipfs_index_object[t.messages_to_deliver[m]['message_id']] = data

                        ipfs_index_array.push({'id':t.messages_to_deliver[m]['message_id'], 'data':data})
                    }
                }
                else if(txs[i].type == this.props.app_state.loc['1510']/* 'channel-messages' */){
                    var t = txs[i]
                    for(var m=0; m<t.messages_to_deliver.length; m++){
                        var message_obj = t.messages_to_deliver[m]
                        if(message_obj['key_to_use'] != ''){
                            const key = message_obj['key_to_use']
                            const key_index = message_obj['key_index']
                            var encrypted_obj = this.props.encrypt_data_object(JSON.stringify(message_obj), key)
                            message_obj = {'encrypted_data':encrypted_obj, 'key_index':key_index}
                        }
                        ipfs_index_object[t.messages_to_deliver[m]['message_id']] = message_obj
                        ipfs_index_array.push({'id':t.messages_to_deliver[m]['message_id'], 'data':message_obj})
                    }  
                }
                else if(txs[i].type == this.props.app_state.loc['1511']/* 'post-messages' */){
                    var t = txs[i]
                    for(var m=0; m<t.messages_to_deliver.length; m++){
                        ipfs_index_object[t.messages_to_deliver[m]['message_id']] = t.messages_to_deliver[m]
                        ipfs_index_array.push({'id':t.messages_to_deliver[m]['message_id'], 'data':t.messages_to_deliver[m]})
                    }   
                }
                else if(txs[i].type == this.props.app_state.loc['1513']/* 'accept-job-application' */){
                    var t = txs[i]
                    var application_obj = {'accepted':true}
                    ipfs_index_object[t.id] = application_obj
                    ipfs_index_array.push({'id':t.id, 'data':application_obj})
                }
                else if(txs[i].type == this.props.app_state.loc['1512']/* 'job-response' */){
                    const t = txs[i]
                    const job_response = {'price_data':t.price_data, 'picked_contract_id':t.picked_contract['id'], 'picked_contract_e5':t.picked_contract['e5'], 'application_expiry_time':t.application_expiry_time, 'applicant_id':this.props.app_state.user_account_id[this.props.app_state.selected_e5], 'pre_post_paid_option':t.pre_post_paid_option, 'type':'job_application', 'custom_specifications':t.custom_specifications}

                    ipfs_index_object[t.id] = job_response
                    ipfs_index_array.push({'id':t.id, 'data':job_response})
                }
                else if(txs[i].type == this.props.app_state.loc['1514']/* 'job-messages' */){
                    var t = txs[i]
                    for(var m=0; m<t.messages_to_deliver.length; m++){
                        ipfs_index_object[t.messages_to_deliver[m]['message_id']] = t.messages_to_deliver[m]
                        ipfs_index_array.push({'id':t.messages_to_deliver[m]['message_id'], 'data':t.messages_to_deliver[m]})
                    }  
                }
                else if(txs[i].type == this.props.app_state.loc['1515']/* 'proposal-messages' */){
                    var t = txs[i]
                    for(var m=0; m<t.messages_to_deliver.length; m++){
                        ipfs_index_object[t.messages_to_deliver[m]['message_id']] = t.messages_to_deliver[m]
                        ipfs_index_array.push({'id':t.messages_to_deliver[m]['message_id'], 'data':t.messages_to_deliver[m]})
                    }  
                }
                else if(txs[i].type == this.props.app_state.loc['1516']/* 'storefront-bag' */){
                    var t = txs[i]
                    const bag_variants = []
                    const bag_tags = []
                    txs[i].items_to_deliver.forEach(item => {
                        var variant_images = []
                        if(item.selected_variant['image_data']['data']['images'].length > 0){
                            variant_images.push(item.selected_variant['image_data']['data']['images'][0])
                        }

                        item.storefront_item['ipfs'].entered_indexing_tags.forEach(tag => {
                            bag_tags.push(tag)
                        })
                        
                        bag_variants.push({'storefront_item_id':item.storefront_item['id'], 'storefront_item_e5':item.storefront_item['e5'],'storefront_variant_id':item.selected_variant['variant_id'], 'purchase_unit_count':item.purchase_unit_count, 'variant_images':variant_images, 'custom_specifications':item.order_specifications, 'options':item.purchase_option_tags_array, 'storefront_options':(item.storefront_item['ipfs'].option_groups == null ? [] : item.storefront_item['ipfs'].option_groups)})
                    });

                    var final_bag_object = { 'bag_orders':bag_variants, 'timestamp':Date.now(), content_channeling_setting: txs[i].content_channeling_setting, device_language_setting: txs[i].device_language_setting, device_country: txs[i].device_country, 'tags': bag_tags, device_city: txs[i].selected_device_city, delivery_location: txs[i].delivery_location, frequency_enabled: txs[i].frequency_enabled, delivery_frequency_time: txs[i].delivery_frequency_time }

                    ipfs_index_object[t.id] = final_bag_object
                    ipfs_index_array.push({'id':t.id, 'data':final_bag_object})
                }
                else if(txs[i].type == this.props.app_state.loc['1497']/* 'bag-response' */){
                    var t = txs[i]
                    var application_obj = {'price_data':t.price_data, 'picked_contract_id':t.picked_contract['id'], 'application_expiry_time':t.application_expiry_time, 'applicant_id':this.props.app_state.user_account_id[this.props.app_state.selected_e5], 'pre_post_paid_option':t.pre_post_paid_option, 'estimated_delivery_time': t.estimated_delivery_time , 'type':'bag_application'}

                    ipfs_index_object[t.id] = application_obj 
                    ipfs_index_array.push({'id':t.id, 'data':application_obj})
                }
                else if(txs[i].type == this.props.app_state.loc['1498']/* 'accept-bag-application' */){
                    var t = txs[i]
                    var application_obj = {'accepted':true}
                    ipfs_index_object[t.id] = application_obj
                    ipfs_index_array.push({'id':t.id, 'data':application_obj})
                }
                else if(txs[i].type == this.props.app_state.loc['1499']/* 'direct-purchase' */){
                    var t = txs[i]
                    var purchase_object = {'shipping_detail':t.fulfilment_location, 'custom_specifications':t.custom_specifications, 'variant_id':t.selected_variant['variant_id'], 'purchase_unit_count':t.purchase_unit_count, 'sender_account':this.props.app_state.user_account_id[this.props.app_state.selected_e5], 'signature_data':Date.now(), 'sender_address':this.format_address(this.props.app_state.accounts[this.props.app_state.selected_e5].address, this.props.app_state.selected_e5), 'options':t.purchase_option_tags_array, 'storefront_options':(t.storefront_item['ipfs'].option_groups == null ? [] : t.storefront_item['ipfs'].option_groups)}

                    ipfs_index_object[t.id] = purchase_object
                    ipfs_index_array.push({'id':t.id, 'data':purchase_object})
                }
                else if(txs[i].type == this.props.app_state.loc['1500']/* 'clear-purchase' */){
                    var t = txs[i]
                    for(var v=0; v<t.items_to_clear.length; v++){
                        var string_object = {
                            'id':t.items_to_clear[v].id,
                            'variant_id':t.items_to_clear[v].order_data['variant_id'], 
                            'purchase_unit_count':t.items_to_clear[v].order_data['purchase_unit_count'], 
                            'sender_address':t.items_to_clear[v].order_data['sender_address'], 
                            'sender_account':t.items_to_clear[v].order_data['sender_account'],
                            'signature_data':t.items_to_clear[v].order_data['signature_data'],
                            'signature': t.items_to_clear[v].received_signature
                        }
                        ipfs_index_object[t.items_to_clear[v].id] = string_object
                        ipfs_index_array.push({'id':t.items_to_clear[v].id, 'data':string_object})
                    }  
                }
                else if(txs[i].type == this.props.app_state.loc['1501']/* 'bag-messages' */){
                    var t = txs[i]
                    for(var m=0; m<t.messages_to_deliver.length; m++){
                        ipfs_index_object[t.messages_to_deliver[m]['message_id']] = t.messages_to_deliver[m]
                        ipfs_index_array.push({'id':t.messages_to_deliver[m]['message_id'], 'data':t.messages_to_deliver[m]})
                    }   
                }
                else if(txs[i].type == this.props.app_state.loc['1502']/* 'storefront-messages' */){
                    var t = txs[i]
                    for(var m=0; m<t.messages_to_deliver.length; m++){
                        ipfs_index_object[t.messages_to_deliver[m]['message_id']] = t.messages_to_deliver[m]
                        ipfs_index_array.push({'id':t.messages_to_deliver[m]['message_id'], 'data':t.messages_to_deliver[m]})
                    }   
                }
                else if(txs[i].type == this.props.app_state.loc['1363']/* 'job-request' */){
                    var t = txs[i]
                    var now = parseInt(now.toString() + i)
                    var key_data = await this.get_encrypted_job_request_key(t)
                    var application_obj = {'price_data':t.price_data, /* 'picked_contract_id':t.picked_contract['id'], */ 'application_expiry_time':t.application_expiry_time, 'applicant_id':this.props.app_state.user_account_id[this.props.app_state.selected_e5], 'pre_post_paid_option':t.pre_post_paid_option, 'title_description':t.entered_title_text, 'entered_images':t.entered_image_objects, 'job_request_id':now, 'entered_pdfs':t.entered_pdf_objects, 'key_data':key_data}

                    ipfs_index_object[t.id] = application_obj
                    ipfs_index_array.push({'id':t.id, 'data':application_obj})
                }
                else if(txs[i].type == this.props.app_state.loc['1504']/* 'accept-job-request' */){
                    var t = txs[i]
                    var application_obj = {'accepted':true, 'contract_id':t.picked_contract['id']}
                    ipfs_index_object[t.id] = application_obj
                    ipfs_index_array.push({'id':t.id, 'data':application_obj})
                }
                else if(txs[i].type == this.props.app_state.loc['1505']/* 'job-request-messages' */){
                    var t = txs[i]
                    const my_unique_crosschain_identifier = bigInt(await this.get_my_unique_crosschain_identifier_number())
                    const private_key_to_use = this.props.get_my_private_key()

                    for(var m=0; m<t.messages_to_deliver.length; m++){
                        var message_obj = t.messages_to_deliver[m]
                        if(t.messages_to_deliver[m]['key_data'] != null && t.messages_to_deliver[m]['key_data'][my_unique_crosschain_identifier] != null){
                            // console.log('key_data',t.messages_to_deliver[m]['key_data'], private_key_to_use)
                            var focused_encrypted_key = t.messages_to_deliver[m]['key_data'][my_unique_crosschain_identifier]
                            if(focused_encrypted_key != null){
                                var uint8array = Uint8Array.from(focused_encrypted_key.split(',').map(x=>parseInt(x,10)));
                                var my_key = await ecies.decrypt(private_key_to_use, uint8array)
                                var encrypted_obj = this.props.encrypt_data_object(JSON.stringify(message_obj), my_key.toString())
                                message_obj = {'encrypted_data':encrypted_obj}
                            }
                        }
                        ipfs_index_object[t.messages_to_deliver[m]['message_id']] = message_obj
                        ipfs_index_array.push({'id':t.messages_to_deliver[m]['message_id'], 'data':message_obj})
                    }
                }
                else if(
                    txs[i].type == this.props.app_state.loc['753']/* 'edit-channel' */ || 
                    txs[i].type == this.props.app_state.loc['763']/* 'edit-contractor' */ || 
                    txs[i].type == this.props.app_state.loc['764']/* 'edit-job' */ || 
                    txs[i].type == this.props.app_state.loc['765']/* 'edit-post' */ || 
                    txs[i].type == this.props.app_state.loc['766']/* 'edit-storefront' */ || 
                    txs[i].type == this.props.app_state.loc['767']/* 'edit-token' */ || 
                    txs[i].type == this.props.app_state.loc['2739']/* 'edit-proposal' */ || 
                    txs[i].type == this.props.app_state.loc['2975']/* 'edit-audio' */|| 
                    txs[i].type == this.props.app_state.loc['3023']/* 'edit-video' */ || 
                    txs[i].type == this.props.app_state.loc['3030']/* 'edit-nitro' */ ||
                    txs[i].type == this.props.app_state.loc['3072h']/* 'edit-poll' */
                ){
                    const t = txs[i]
                    if(txs[i].type == this.props.app_state.loc['753']/* 'edit-channel' */){
                        t = await this.process_channel_object(txs[i])
                    }
                    var extra_tags = [].concat(t.entered_title_text)
                    if(txs[i].type == this.props.app_state.loc['2975']/* 'edit-audio' */){
                        var songs = t.songs
                        songs.forEach(song => {
                            extra_tags.push(song['song_title'].toLowerCase())
                            if(!extra_tags.includes(song['song_composer'].toLowerCase())){
                                extra_tags.push(song['song_composer'].toLowerCase())
                            }
                        });
                        extra_tags.push(t.entered_author_text.toLowerCase())
                    }
                    if(txs[i].type == this.props.app_state.loc['3023']/* 'edit-video' */){
                        var videos = t.videos
                        videos.forEach(video => {
                            extra_tags.push(video['video_title'].toLowerCase())
                            if(!extra_tags.includes(video['video_composer'].toLowerCase())){
                                extra_tags.push(video['video_composer'].toLowerCase())
                            }
                        });
                    }
                    
                    ipfs_index_object[t.id] = t
                    var all_elements = extra_tags.concat(t.entered_indexing_tags)
                    const all_final_elements = all_elements.map(word => word.toLowerCase());
                    obj['tags'][t.id] = {'elements':all_final_elements, 'type':t.object_type}
                    ipfs_index_array.push({'id':t.id, 'data':t})
                }
                else if(txs[i].type == this.props.app_state.loc['1155']/* 'award' */){
                    var t = txs[i]
                    var award_object = {'selected_tier_object':t.selected_tier_object, 'post_id':t.post_item['id'], 'multiplier':t.multiplier, 'custom_amounts':t.price_data, 'entered_message':t.entered_message_text}
                    ipfs_index_object[t.id] = award_object
                    ipfs_index_array.push({'id':t.id, 'data':award_object})
                }
                else if(txs[i].type == this.props.app_state.loc['2846']/* stage-royalty */){
                    var t = txs[i]
                    ipfs_index_object[t.id] = t.payout_data
                    ipfs_index_array.push({'id':t.id, 'data':t.payout_data})
                }
                else if(txs[i].type == this.props.app_state.loc['2884']/* 'royalty-payouts' */){
                    var t = txs[i]
                    var batches = t.selected_batches
                    var transacted_batches = []
                    batches.forEach(batch => {
                        transacted_batches.push(batch['id'])
                    });
                    var payout_record_info = {'payout_id':t.staging_data['payout_id'], 'id':Date.now(), 'transacted_batches':transacted_batches}
                    ipfs_index_object[t.id] = payout_record_info
                    ipfs_index_array.push({'id':t.id, 'data':payout_record_info})
                }
                else if(txs[i].type == this.props.app_state.loc['1593cc']/* 'audio-messages' */){
                    var t = txs[i]
                    for(var m=0; m<t.messages_to_deliver.length; m++){
                        ipfs_index_object[t.messages_to_deliver[m]['message_id']] = t.messages_to_deliver[m]
                        ipfs_index_array.push({'id':t.messages_to_deliver[m]['message_id'], 'data':t.messages_to_deliver[m]})
                    }   
                }
                else if(txs[i].type == this.props.app_state.loc['2962']/* 'buy-album' */){
                    var t = txs[i]
                    var sale_type = this.get_album_sale_type(t)
                    var award_object = {'sale_type':sale_type, 'songs_included':this.get_selected_song_ids(t)}
                    ipfs_index_object[t.id] = award_object
                    ipfs_index_array.push({'id':t.id, 'data':award_object})
                }
                else if(txs[i].type == this.props.app_state.loc['1593ct']/* 'video-messages' */){
                    var t = txs[i]
                    for(var m=0; m<t.messages_to_deliver.length; m++){
                        ipfs_index_object[t.messages_to_deliver[m]['message_id']] = t.messages_to_deliver[m]
                        ipfs_index_array.push({'id':t.messages_to_deliver[m]['message_id'], 'data':t.messages_to_deliver[m]})
                    }   
                }
                else if(txs[i].type == this.props.app_state.loc['a2962a']/* 'buy-video' */){
                    var t = txs[i]
                    var sale_type = this.get_video_sale_type(t)
                    var award_object = {'sale_type':sale_type, 'videos_included':this.get_selected_video_ids(t)}
                    ipfs_index_object[t.id] = award_object
                    ipfs_index_array.push({'id':t.id, 'data':award_object})
                }
                else if(txs[i].type == this.props.app_state.loc['1593cu']/* 'nitro-messages' */){
                    var t = txs[i]
                    for(var m=0; m<t.messages_to_deliver.length; m++){
                        ipfs_index_object[t.messages_to_deliver[m]['message_id']] = t.messages_to_deliver[m]
                        ipfs_index_array.push({'id':t.messages_to_deliver[m]['message_id'], 'data':t.messages_to_deliver[m]})
                    }   
                }
                else if(
                    txs[i].type == this.props.app_state.loc['1130']/* 'contract' */ || 
                    txs[i].type == this.props.app_state.loc['601']/* 'token' */ || 
                    txs[i].type == this.props.app_state.loc['823']/* 'subscription' */ || 
                    txs[i].type == this.props.app_state.loc['297']/* 'post' */ || 
                    txs[i].type == this.props.app_state.loc['760']/* 'job' */ || 
                    txs[i].type == this.props.app_state.loc['109']/* 'channel' */ || 
                    txs[i].type == this.props.app_state.loc['439']/* 'storefront-item' */|| 
                    txs[i].type == this.props.app_state.loc['784']/* 'proposal' */ || 
                    txs[i].type == this.props.app_state.loc['253']/* 'contractor' */ || 
                    txs[i].type == this.props.app_state.loc['a311a']/* audio */ || 
                    txs[i].type == this.props.app_state.loc['b311a']/* video */|| 
                    txs[i].type == this.props.app_state.loc['a273a']/* 'nitro' */ ||
                    txs[i].type == this.props.app_state.loc['c311a']/* 'poll' */
                ){
                    var data = txs[i]
                    if(txs[i].type == this.props.app_state.loc['109']/* 'channel' */){
                        data = await this.process_channel_object(txs[i])
                    }
                    ipfs_index_object[data.id] = data
                    var extra_tags = [].concat(data.entered_title_text)
                    if(txs[i].type == this.props.app_state.loc['a311a']/* audio */){
                        var songs = data.songs
                        songs.forEach(song => {
                            extra_tags.push(song['song_title'].toLowerCase())
                            if(!extra_tags.includes(song['song_composer'].toLowerCase())){
                                extra_tags.push(song['song_composer'].toLowerCase())
                            }
                        });
                        extra_tags.push(data.entered_author_text.toLowerCase())
                    }
                    if(txs[i].type == this.props.app_state.loc['b311a']/* video */){
                        var videos = data.videos
                        videos.forEach(video => {
                            extra_tags.push(video['video_title'].toLowerCase())
                            if(!extra_tags.includes(video['video_composer'].toLowerCase())){
                                extra_tags.push(video['video_composer'].toLowerCase())
                            }
                        });
                    }
                    var all_elements = extra_tags.concat(data.entered_indexing_tags)
                    const all_final_elements = all_elements.map(word => word.toLowerCase());
                    obj['tags'][data.id] = {'elements':all_final_elements, 'type':data.object_type}
                    ipfs_index_array.push({'id':data.id, 'data':data})
                }
                else if(txs[i].type == 'admin'){
                    ipfs_index_object[txs[i].id] = txs[i]
                    ipfs_index_array.push({'id':txs[i].id, 'data':txs[i]})
                }
                else if(txs[i].type == this.props.app_state.loc['3068af']/* 'bill' */){
                    var encrypted_object = await this.get_encrypted_bill_object(txs[i])
                    ipfs_index_object[txs[i].id] = encrypted_object
                    ipfs_index_array.push({'id':txs[i].id, 'data':encrypted_object})
                }
            }
        }




        
        if(this.props.app_state.should_update_contacts_onchain){
            var contacts_clone = structuredClone(this.props.app_state.contacts)
            var data = {'all_contacts':contacts_clone, 'time':Date.now()}
            ipfs_index_object['contacts'] = data
            ipfs_index_array.push({'id':'contacts', 'data':data})
        }

        if(this.props.app_state.should_update_blocked_accounts_onchain){
            var blocked_accounts = structuredClone(this.props.app_state.blocked_accounts)
            var data = {'all_blocked_accounts':blocked_accounts, 'time':Date.now()}
            ipfs_index_object['blocked'] = data
            ipfs_index_array.push({'id':'blocked', 'data':data})
        }

        if(this.props.app_state.should_update_section_tags_onchain){
            var job_section_tags = this.props.app_state.job_section_tags
            var explore_section_tags = this.props.app_state.explore_section_tags
            var data = {'job_section_tags': job_section_tags, 'explore_section_tags':explore_section_tags, 'time':Date.now()}
            ipfs_index_object['tags'] = data
            ipfs_index_array.push({'id':'tags', 'data':data})
        }

        if(this.props.app_state.update_data_in_E5){
            var uploaded_data = this.props.app_state.uploaded_data_cids
            var key = this.props.app_state.accounts['E25'].privateKey.toString()
            var data = JSON.stringify({'data':uploaded_data})
            var encrypted_obj = this.props.encrypt_data_object(data, key)

            var data = {'cids': encrypted_obj, 'time':Date.now(), 'encrypted':true}
            ipfs_index_object['ciddata'] = data
            ipfs_index_array.push({'id':'ciddata', 'data':data})
        }

        var added_song_album_data = this.get_songs_and_albums_to_add(pushed_txs)
        if(added_song_album_data.tracks.length != 0){
            var my_albums = this.props.app_state.my_albums.slice()
            var my_tracks = this.props.app_state.my_tracks.slice()

            added_song_album_data.albums.forEach(album => {
                if(my_albums.includes(album)){
                    var index = my_albums.indexOf(album)
                    my_albums.splice(index, 1)
                }
                my_albums.push(album)
            });
            added_song_album_data.tracks.forEach(track => {
                if(my_tracks.includes(track)){
                    var index = my_tracks.indexOf(track)
                    my_tracks.splice(index, 1)
                }
                my_tracks.push(track)
            });

            var data = {'my_albums': my_albums, 'my_tracks':my_tracks, 'time':Date.now()}
            ipfs_index_object['myaudio'] = data
            ipfs_index_array.push({'id':'myaudio', 'data':data})
        }

        if(this.props.app_state.should_update_playlists_in_E5 == true){
            var my_playlists = this.props.app_state.my_playlists
            var data = {'playlists': my_playlists, 'time':Date.now()}
            ipfs_index_object['myplaylists'] = data
            ipfs_index_array.push({'id':'myplaylists', 'data':data})
        }

        if(this.props.app_state.should_update_song_plays == true){
            var song_plays = this.props.app_state.song_plays
            var data = {'plays': song_plays, 'time':Date.now()}
            ipfs_index_object['myplays'] = data
            ipfs_index_array.push({'id':'myplays', 'data':data})
        }

        var added_video_data = this.get_videos_to_add(pushed_txs);
        if(added_video_data.videos.length != 0){
            var my_videoposts = this.props.app_state.my_videoposts.slice()
            var my_videos = this.props.app_state.my_videos.slice()

            added_video_data.videoposts.forEach(videoposts => {
                if(my_videoposts.includes(videoposts)){
                    var index = my_videoposts.indexOf(videoposts)
                    my_videoposts.splice(index, 1)
                }
                my_videoposts.push(videoposts)
            });
            added_video_data.videos.forEach(video => {
                if(my_videos.includes(video)){
                    var index = my_videos.indexOf(video)
                    my_videos.splice(index, 1)
                }
                my_videos.push(video)
            });

            var data = {'my_videoposts': my_videoposts, 'my_videos':my_videos, 'time':Date.now()}
            ipfs_index_object['myvideo'] = data
            ipfs_index_array.push({'id':'myvideo', 'data':data})
        }

        if(this.props.app_state.should_update_followed_accounts == true){
            var followed_accounts = this.props.app_state.followed_accounts
            var data = {'followed_accounts': followed_accounts, 'time':Date.now()}
            ipfs_index_object['following'] = data
            ipfs_index_array.push({'id':'following', 'data':data})
        }

        if(this.props.app_state.should_update_posts_blocked_by_me == true){
            var posts_blocked_by_me = this.props.app_state.posts_blocked_by_me
            var data = {'posts_blocked_by_me': posts_blocked_by_me, 'time':Date.now()}
            ipfs_index_object['blockedposts'] = data
            ipfs_index_array.push({'id':'blockedposts', 'data':data})
        }

        if(this.props.app_state.should_update_censored_keyword_phrases == true){
            var censored_keyword_phrases = this.props.app_state.censored_keyword_phrases
            var data = {'censored_keywords': censored_keyword_phrases, 'time':Date.now()}
            ipfs_index_object['censoredkeywords'] = data
            ipfs_index_array.push({'id':'censoredkeywords', 'data':data})
        }

        if(this.props.app_state.should_update_posts_reposted_by_me == true){
            var posts_reposted_by_me = this.props.app_state.posts_reposted_by_me
            var data = {'data': posts_reposted_by_me, 'time':Date.now()}
            ipfs_index_object['promoted'] = data
            ipfs_index_array.push({'id':'promoted', 'data':data})
        }


        
        ipfs_index_array.forEach(item => {
            obj[item['id']] = item['data']
        });
        console.log('stack_page_ipfs', 'unupdated ipfs-object', obj)

        const size = this.lengthInUtf8Bytes(JSON.stringify(obj))
        this.setState({stack_size_in_bytes: size})
        this.props.set_stack_depth_value(size)
        if(size > this.props.app_state.upload_object_size_limit && calculate_gas == false && ipfs_index_array.length > 0){
            this.current_object_size = size
            return 'large'
        }
        console.log('stack_page_ipfs', 'updated ipfs-array', ipfs_index_array)
        const link = await this.get_object_ipfs_index(obj, calculate_gas);
        if(calculate_gas != null && calculate_gas == true && ipfs_index_array.length > 0){
            this.props.calculate_arweave_data_fees(obj)
        }
        console.log('stack_page_ipfs', 'link', link)
        return link
    }

    get_encrypted_bill_object = async (t) =>{
        var key = makeid(35)
        var encrypted_obj = this.props.encrypt_data_object(t, key)
        var recipent_data = {}
        var recipient = t.recipient
        var e5 = t.e5
        var recipients_pub_key_hash = await this.props.get_accounts_public_key(recipient, e5)

        if(recipients_pub_key_hash != ''){
            var encrypted_key = await this.props.encrypt_key_with_accounts_public_key_hash(key, recipients_pub_key_hash)
            recipent_data[await this.calculate_unique_crosschain_identifier_number(recipients_pub_key_hash)] = encrypted_key
        }

        var uint8array = await this.props.get_account_raw_public_key() 
        var my_encrypted_key = await this.props.encrypt_key_with_accounts_public_key_hash(key, uint8array)
        recipent_data[await this.get_my_unique_crosschain_identifier_number()] = my_encrypted_key

        return {'obj':encrypted_obj, 'recipient_data':recipent_data}
    }

    get_encrypted_job_request_key = async (t) =>{
        var key = makeid(35)
        var recipient = t.contractor_item['author']
        var author_e5 = t.contractor_item['e5']
        var key_data = {}
        var recipients_pub_key_hash = await this.props.get_accounts_public_key(recipient, author_e5)
        if(recipients_pub_key_hash != ''){
            var encrypted_key = await this.props.encrypt_key_with_accounts_public_key_hash(key, recipients_pub_key_hash)
            key_data[await this.calculate_unique_crosschain_identifier_number(recipients_pub_key_hash)] = encrypted_key
        }
        var uint8array = await this.props.get_account_raw_public_key() 
        var my_encrypted_key = await this.props.encrypt_key_with_accounts_public_key_hash(key, uint8array)
        key_data[await this.get_my_unique_crosschain_identifier_number()] = my_encrypted_key

        return key_data
    }

    get_device_color(){
        const my_state_code = this.props.app_state.device_country_code
        const country_data = this.props.app_state.country_data

        var selected_objs = country_data.filter(function (el) {
            return (el['code'] === my_state_code)
        });

        var color = 'g'
        if(selected_objs.length > 0){
            color = selected_objs[0]['color'][0];
        }
        return color
    }

    get_gas_price(){
        var base_fee = this.state.run_gas_price == 0 ? this.props.app_state.gas_price[this.props.app_state.selected_e5] : this.state.run_gas_price

        var e5 = this.props.app_state.selected_e5
        if(this.props.app_state.e5s[e5].type == '1559'){
            var gas_price = base_fee + this.set_max_priority_per_gas()
            return gas_price
        }else{
            return base_fee
        }
        
    }

    set_max_priority_per_gas(){
        if(this.state.picked_max_priority_per_gas_amount == 0){
            var e5 = this.props.app_state.selected_e5
            var gas_price = this.props.app_state.gas_price[e5]
            if(gas_price == null){
                gas_price = this.get_gas_price_from_runs()
            }
            return gas_price + 1;
        }else return this.state.picked_max_priority_per_gas_amount
    }

    set_max_fee_per_gas(){
        if(this.state.picked_max_fee_per_gas_amount == 0){
            var e5 = this.props.app_state.selected_e5
            var gas_price = this.props.app_state.gas_price[e5]
            if(gas_price == null){
                gas_price = this.get_gas_price_from_runs()
            }
            return gas_price + 2;
        }else return this.state.picked_max_fee_per_gas_amount
    }

    get_latest_block_data(e5){
        if(this.props.app_state.last_blocks[e5] == null || this.props.app_state.last_blocks[e5].length  ==  0){
            return {}
        }
        return this.props.app_state.last_blocks[e5][0];
    }

    get_object_ipfs_index = async (tx, calculate_gas, ipfs_index, data_index) => {
        if(Object.keys(tx).length <= 3 && ipfs_index == null){
            return null
        }

        console.log('stack_page_ipfs', Object.keys(tx).length, ipfs_index, calculate_gas)
        if(calculate_gas != null && calculate_gas == true){
            return 'ar.TVlfS2g5aTNWaENoSnVUem9fQ3l1NmJHNmhDdmFzcXpXR2ZvNG9uaU5uQV8xeGppQVl4Vw=='
            // return 'in.QmWBaeu6y1zEcKbsEqCuhuDHPL3W8pZouCPdafMCRCSUWk_qwsedrf'
        }
        if(ipfs_index != null){
            console.log('stack_page', 'ipfs_index', data_index)
            return ipfs_index+'_'+data_index
        }
        var object_as_string = JSON.stringify(tx, (key, value) =>
            typeof value === 'bigint'
                ? value.toString()
                : value // return everything else unchanged));
        )
        var obj_cid = await this.props.store_objects_data_in_ipfs_using_option(object_as_string, null, null, tx['tags'])
        return obj_cid
    }

    get_account_public_key = async () => {
        return await this.props.get_account_public_key()
    }

    render_dialog_ui(){
        var run_gas_limit = this.state.run_gas_limit == 0 ? 5_300_000 : this.state.run_gas_limit
        var run_gas_price = this.props.app_state.gas_price[this.props.app_state.selected_e5]
        var required_ether = (run_gas_limit * run_gas_price);
        return(
            <Dialog PaperProps={{ sx: { borderRadius: "15px" } }} onClose = {() => this.cancel_dialog_box()} open = {this.state.invalid_ether_amount_dialog_box}>
                <div style={{'padding': '10px', 'background-color':this.props.theme['send_receive_ether_background_color']}}>
                    
                    <h4 style={{'margin':'0px 0px 5px 10px', 'color':this.props.theme['primary_text_color']}}>{this.props.app_state.loc['1522']/* Issue With Run */}</h4>

                    {this.render_detail_item('3', {'title':this.props.app_state.loc['1523']/* 'Theres an issue with your Balance' */, 'details':this.props.app_state.loc['1524']/* 'You need more ether to run your transactions' */, 'size':'s'})}
                    <div style={{height: 10}}/>

                    <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '20px 0px 5px 0px','border-radius': '8px' }}>
                        <p style={{'color': this.props.theme['primary_text_color'], 'font-size': '11px', height: 7, 'margin':'0px 0px 20px 10px'}} className="fw-bold">{this.props.app_state.loc['1525']/* Wallet Balance in Ether and Wei */}</p>
                        {this.render_detail_item('2', this.get_balance_amount_in_wei())}
                        {this.render_detail_item('2', this.get_balance_amount_in_ether())}
                    </div>

                    <div style={{height: 10}}/>

                    <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '20px 0px 5px 0px','border-radius': '8px' }}>
                        <p style={{'color': this.props.theme['primary_text_color'], 'font-size': '11px', height: 7, 'margin':'0px 0px 20px 10px'}} className="fw-bold">{this.props.app_state.loc['1526']/* Required Balance in Ether and Wei */}</p>
                        
                        {this.render_detail_item('2', { 'style':'s', 'title':'', 'subtitle':'', 'barwidth':this.calculate_bar_width(required_ether), 'number':this.format_account_balance_figure(required_ether), 'barcolor':'#606060', 'relativepower':'wei', })}

                        {this.render_detail_item('2', { 'style':'s', 'title':'', 'subtitle':'', 'barwidth':this.calculate_bar_width(required_ether/10**18), 'number':required_ether/10**18, 'barcolor':'#606060', 'relativepower':'ether', })}
                    </div>

                </div>
                
            </Dialog>
        )
    }

    cancel_dialog_box(){
        this.setState({invalid_ether_amount_dialog_box: false})
    }

    format_contract_object(t){
        var default_vote_bounty_split_proportion = t.default_vote_bounty_split_proportion == 0 ? bgN(1,16) : t.default_vote_bounty_split_proportion.toString().toLocaleString('fullwide', {useGrouping:false})
        var max_extend_enter_contract_limit = t.max_extend_enter_contract_limit == 0 ? '36000000' : t.max_extend_enter_contract_limit.toString().toLocaleString('fullwide', {useGrouping:false})
        var default_minimum_end_vote_bounty_amount = t.default_minimum_end_vote_bounty_amount == 0 ? 0 : t.default_minimum_end_vote_bounty_amount.toString().toLocaleString('fullwide', {useGrouping:false})
        var default_proposal_expiry_duration_limit = t.default_proposal_expiry_duration_limit == 0 ? 30_000 : t.default_proposal_expiry_duration_limit.toString().toLocaleString('fullwide', {useGrouping:false})
        var max_enter_contract_duration = t.max_enter_contract_duration == 0 ? bgN(1, 16) : t.max_enter_contract_duration.toString().toLocaleString('fullwide', {useGrouping:false})
        var auto_wait_for_all_proposals_for_all_voters = this.get_selected_item(t.auto_wait_tags_object, t.auto_wait_tags_object['i'].active) == this.props.app_state.loc['802']/* 'no' */ ? 0 : 1
        var default_minimum_spend_vote_bounty_amount = t.default_minimum_spend_vote_bounty_amount == 0 ? 0 : t.default_minimum_spend_vote_bounty_amount.toString().toLocaleString('fullwide', {useGrouping:false})
        var proposal_modify_expiry_duration_limit = t.proposal_modify_expiry_duration_limit == 0 ? 3600 : t.proposal_modify_expiry_duration_limit.toString().toLocaleString('fullwide', {useGrouping:false})
        var can_modify_contract_as_moderator = this.get_selected_item(t.can_modify_contract_as_moderator, t.can_modify_contract_as_moderator['i'].active) == this.props.app_state.loc['83']/* 'modifiable' */ ? 1 : 0
        var can_extend_enter_contract_at_any_time = this.get_selected_item(t.can_extend_enter_contract_at_any_time, t.can_extend_enter_contract_at_any_time['i'].active) == this.props.app_state.loc['85']/* 'enabled' */ ? 1 : 0
        var maximum_proposal_expiry_submit_expiry_time_difference = t.maximum_proposal_expiry_submit_expiry_time_difference == 0 ? bgN(1,16).toString().toLocaleString('fullwide', {useGrouping:false}) : t.maximum_proposal_expiry_submit_expiry_time_difference.toString().toLocaleString('fullwide', {useGrouping:false})
        var bounty_limit_type = this.get_selected_item(t.bounty_limit_type, t.bounty_limit_type['i'].active) == 'relative' ? 0 : 1
        var contract_force_exit_enabled = this.get_selected_item(t.contract_force_exit_enabled, t.contract_force_exit_enabled['i'].active) == this.props.app_state.loc['85']/* 'enabled' */ ? 1 : 0

        var default_consensus_majority_limit = t.default_consensus_majority_limit.toString().toLocaleString('fullwide', {useGrouping:false});

        var voter_weight_exchange_target = '0'
        if(t.voter_weight_exchange_id != ''){
            voter_weight_exchange_target = t.voter_weight_exchange_id 
            auto_wait_for_all_proposals_for_all_voters = 0
        }

        var obj = [/* create contract */
        [10000, 0, 0, 0, 0/* 4 */, 0, 0, 0, 0, 30, 0],
        [30], [23],
        [0, default_vote_bounty_split_proportion, max_extend_enter_contract_limit/* 2 */, 0, default_minimum_end_vote_bounty_amount, default_proposal_expiry_duration_limit, max_enter_contract_duration/* 6 */, default_consensus_majority_limit, auto_wait_for_all_proposals_for_all_voters, 0, default_minimum_spend_vote_bounty_amount, 0, 0, 0/* 13 */, 0, bgN(1, 63), 0,0,0,0,0/* 20 */,0,0,0,0,0,0,proposal_modify_expiry_duration_limit/* 27 */,can_modify_contract_as_moderator,can_extend_enter_contract_at_any_time,0,0,0,voter_weight_exchange_target,0/* 34 */,0,maximum_proposal_expiry_submit_expiry_time_difference,bounty_limit_type,contract_force_exit_enabled,0,0], 
        [23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23],
        [], [],
        [], [],
        [], [],
        [0], [23],
        [0], [23],
        [0], [23],
        [0], [23],
        [0], [23]
      ]

      if(t.price_data.length == 0){
        obj[5].push(3)
        obj[6].push(23)
        obj[7].push(10_000)
        obj[8].push(23)
        obj[9].push(0)
        obj[10].push(23)
      }else{
        for(var i=0; i<t.price_data.length; i++){
            obj[5].push(parseInt(t.price_data[i]['id']))
            obj[6].push(23)
            obj[7].push((t.price_data[i]['amount']).toString().toLocaleString('fullwide', {useGrouping:false}))
            obj[8].push(23)
            obj[9].push(0)
            obj[10].push(23)
        }
      }

      console.log(obj)

      return obj
    }

    format_token_object(t){
        //.toString().toLocaleString('fullwide', {useGrouping:false})
        var type = this.get_selected_item(t.new_token_type_tags_object, t.new_token_type_tags_object['i'].active);
        var new_token_type_tags_object = type == this.props.app_state.loc['606']/* 'capped' */ ? 3 : 5
        var token_exchange_liquidity_total_supply = t.token_exchange_liquidity_total_supply <= 100_000 ? 1_000_000_000 : t.token_exchange_liquidity_total_supply.toString().toLocaleString('fullwide', {useGrouping:false})
        if(type == this.props.app_state.loc['607']/* 'uncapped' */){
            token_exchange_liquidity_total_supply = 0
        }
        var default_exchange_amount_buy_limit = t.default_exchange_amount_buy_limit == 0 ? 100_000_000 : 
        t.default_exchange_amount_buy_limit.toString().toLocaleString('fullwide', {useGrouping:false})
        
        var minimum_transactions_between_swap = t.minimum_transactions_between_swap.toString().toLocaleString('fullwide', {useGrouping:false})
        var minimum_blocks_between_swap = t.minimum_blocks_between_swap.toString().toLocaleString('fullwide', {useGrouping:false})
        var minimum_time_between_swap = t.minimum_time_between_swap.toString().toLocaleString('fullwide', {useGrouping:false})
        var default_exchange_amount_sell_limit = t.default_exchange_amount_sell_limit == 0 ? 100_000_000 : t.default_exchange_amount_sell_limit.toString().toLocaleString('fullwide', {useGrouping:false})
        var minimum_entered_contracts_between_swap = t.minimum_entered_contracts_between_swap.toString().toLocaleString('fullwide', {useGrouping:false})
        var minimum_transactions_for_first_buy = t.minimum_transactions_for_first_buy.toString().toLocaleString('fullwide', {useGrouping:false})
        var trust_fee_proportion = t.trust_fee_proportion == 0 ? bgN(1,16) : t.trust_fee_proportion.toString().toLocaleString('fullwide', {useGrouping:false})
        
        var block_limit = t.block_limit.toString().toLocaleString('fullwide', {useGrouping:false})
        if(t.block_limit != 0 && t.block_limit <= t.default_exchange_amount_buy_limit){
            block_limit = (t.default_exchange_amount_buy_limit+1).toString().toLocaleString('fullwide', {useGrouping:false})
        }
        
        var new_token_unlocked_liquidity_tags_object = this.get_selected_item(t.new_token_unlocked_liquidity_tags_object, t.new_token_unlocked_liquidity_tags_object['i'].active) == this.props.app_state.loc['609']/* 'unlocked' */ ? 1 : 0
        var new_token_unlocked_supply_tags_object = this.get_selected_item(t.new_token_unlocked_supply_tags_object, t.new_token_unlocked_supply_tags_object['i'].active) == this.props.app_state.loc['609']/* 'unlocked' */ ? 1 : 0
        var new_token_fully_custom_tags_object = this.get_selected_item(t.new_token_fully_custom_tags_object, t.new_token_fully_custom_tags_object['i'].active) == this.props.app_state.loc['613']/* 'fully-custom' */ ? 1 : 0
        var internal_block_halfing_proportion = t.internal_block_halfing_proportion.toString().toLocaleString('fullwide', {useGrouping:false})
        var block_limit_reduction_proportion = t.block_limit_reduction_proportion.toString().toLocaleString('fullwide', {useGrouping:false})
        var block_reset_limit = t.block_reset_limit.toString().toLocaleString('fullwide', {useGrouping:false})
        
        var new_token_block_limit_sensitivity_tags_object = parseInt(this.get_selected_item(t.new_token_block_limit_sensitivity_tags_object, t.new_token_block_limit_sensitivity_tags_object['i'].active)).toString().toLocaleString('fullwide', {useGrouping:false})
        var default_authority_mint_limit = t.default_authority_mint_limit == 0 ? bgN(1,16).toString().toLocaleString('fullwide', {useGrouping:false}) : t.default_authority_mint_limit.toString().toLocaleString('fullwide', {useGrouping:false})

        console.log(t.new_token_halving_type_tags_object)
        var new_token_halving_type_tags_object = (this.get_selected_item(t.new_token_halving_type_tags_object, t.new_token_halving_type_tags_object['i'].active) == this.props.app_state.loc['615']/* 'spread' */ ? 1 : 0).toString().toLocaleString('fullwide', {useGrouping:false})
        
        var maturity_limit = t.maturity_limit.toString().toLocaleString('fullwide', {useGrouping:false})
        
        var minimum_entered_contracts_for_first_buy = t.minimum_entered_contracts_for_first_buy.toString().toLocaleString('fullwide', {useGrouping:false})

        var default_exchange_ratio_value = '1000';
        if(type == this.props.app_state.loc['606']/* 'capped' */){
            default_exchange_ratio_value = token_exchange_liquidity_total_supply;
        }

        var active_block_limit_reduction_proportion = type == this.props.app_state.loc['606']/* 'capped' */ ? 0 : bgN(100,16)
        var token_exchange_ratio_x = t.token_exchange_ratio_x == 0 ? default_exchange_ratio_value: t.token_exchange_ratio_x.toString().toLocaleString('fullwide', {useGrouping:false})

        var token_exchange_ratio_y = t.token_exchange_ratio_y == 0 ? default_exchange_ratio_value : t.token_exchange_ratio_y.toString().toLocaleString('fullwide', {useGrouping:false})

        if(type == this.props.app_state.loc['606']/* 'capped' */ && token_exchange_ratio_x != token_exchange_liquidity_total_supply){
            token_exchange_ratio_x = token_exchange_liquidity_total_supply;
        }
        
        
        var exchange_authority = t.exchange_authority == '' ? 53 : parseInt(t.exchange_authority)
        var exchange_authority_type = 23
        if(exchange_authority == 53){
            exchange_authority_type = 53
        }
        var trust_fee_target = t.trust_fee_target == '' ? 53 : parseInt(t.trust_fee_target)
        var trust_fee_target_type = 23
        if(trust_fee_target == 53){
            trust_fee_target_type = 53
        }

        var obj = [/* create token */
            [10000, 0, 0, 0, 0/* 4 */, 0, 0, 0, 0, 31, 0],
            [new_token_unlocked_supply_tags_object, new_token_unlocked_liquidity_tags_object, new_token_fully_custom_tags_object, new_token_type_tags_object],
            [23, 23, 23, 23],

            [ default_exchange_amount_buy_limit, block_limit, minimum_transactions_between_swap, minimum_blocks_between_swap/* 3 */, minimum_time_between_swap, internal_block_halfing_proportion, block_limit_reduction_proportion, trust_fee_proportion/* 7 */, block_reset_limit, exchange_authority, trust_fee_target, default_exchange_amount_sell_limit/* 11 */, new_token_block_limit_sensitivity_tags_object, minimum_entered_contracts_between_swap, default_authority_mint_limit, new_token_halving_type_tags_object/* 15 */, maturity_limit, minimum_transactions_for_first_buy, minimum_entered_contracts_for_first_buy],
            [23, 23, 23, 23, 23, 23, 23, 23, 23, exchange_authority_type, trust_fee_target_type, 23, 23, 23, 23, 23, 23, 23, 23],

            [token_exchange_ratio_x, token_exchange_ratio_y, token_exchange_liquidity_total_supply/* 2 */, 0, 0, 0, active_block_limit_reduction_proportion],
            [23, 23, 23, 23, 23, 23, 23],

            [], [],
            [], [],
            [], []
        ]

      if(t.price_data.length == 0){
        if(new_token_type_tags_object == 5){
            obj[7].push(0)
            obj[8].push(23)
            obj[9].push(0)
            obj[10].push(23)
            obj[11].push(0)
            obj[12].push(23)
        }else{
            obj[7].push(3)
            obj[8].push(23)
            obj[9].push(1)
            obj[10].push(23)
            obj[11].push(0)
            obj[12].push(23)
        }
        
      }else{
        for(var i=0; i<t.price_data.length; i++){
            obj[7].push(parseInt(t.price_data[i]['id']))
            obj[8].push(23)
            obj[9].push(parseInt(t.price_data[i]['amount']))
            obj[10].push(23)
            obj[11].push(0)
            obj[12].push(23)
        }
      }

      return obj
    }

    format_end_token_object(t){
        var obj = {'1 END':1, '10 END':10, '100 END':100}
        obj[this.props.app_state.loc['2776']/* '1 END' */] = 1
        obj[this.props.app_state.loc['2777']/* '10 END' */] = 10
        obj[this.props.app_state.loc['2778']/* '100 END' */] = 100
        var stability = this.get_selected_item(t.get_end_token_base_stability, t.get_end_token_base_stability['i'].active);
        var default_exchange_amount_sell_limit = obj[stability]

        var obj = [/* create token */
            [10000, 0, 0, 0, 0/* 4 */, 0, 0, 0, 0, 31, 0],
            [1/* new_token_unlocked_supply_tags_object */, 0/* new_token_unlocked_liquidity_tags_object */, 0/* new_token_fully_custom_tags_object */, 5/* new_token_type_tags_object */],
            [23, 23, 23, 23],

            [ bigInt('1e6').toString().toLocaleString('fullwide', {useGrouping:false})/* default_exchange_amount_buy_limit */, 0/* block_limit */, 0/* minimum_transactions_between_swap */, 0/* minimum_blocks_between_swap *//* 3 */, 0/* minimum_time_between_swap */, 0/* internal_block_halfing_proportion */, 0/* block_limit_reduction_proportion */, bigInt('3e16').toString().toLocaleString('fullwide', {useGrouping:false})/* trust_fee_proportion *//* 7 */, 0/* block_reset_limit */, 0/* exchange_authority */, 0/* trust_fee_target */, default_exchange_amount_sell_limit/* 11 */, 0/* new_token_block_limit_sensitivity_tags_object */, 0/* minimum_entered_contracts_between_swap */, 0/* default_authority_mint_limit */, 0/* new_token_halving_type_tags_object *//* 15 */, 0/* maturity_limit */, 0/* minimum_transactions_for_first_buy */, 0/* minimum_entered_contracts_for_first_buy */],
            [23, 23, 23, 23, 23, 23, 23, 23, 23, 53, 53, 23, 23, 23, 23, 23, 23, 23, 23],

            [bigInt('1e72').toString().toLocaleString('fullwide', {useGrouping:false})/* token_exchange_ratio_x */, bigInt('1e72').toString().toLocaleString('fullwide', {useGrouping:false})/* token_exchange_ratio_y */, 0/* token_exchange_liquidity_total_supply *//* 2 */, 0, 0, 0, bigInt('1e18').toString().toLocaleString('fullwide', {useGrouping:false})/* active_block_limit_reduction_proportion */],
            [23, 23, 23, 23, 23, 23, 23],

            [3], [23],
            [1], [23],
            [0], [23]
        ]

        return obj
    }

    format_depth_mint_transaction(t, token_stack_id){
        /* depth_mint\swap up\swap down tokens [2(depth_auth_mint), 1(swap_up), 0(swap_down)] */
        var depth_mint_action = [
            [30000,16,0],
            [], [],/* target exchange ids */
            [], [],/* receivers */
            [],/* action */ 
            [],/* depth */
            []/* amount */
        ]

        var default_depth = t.default_depth
        var total_supply = t.token_exchange_liquidity_total_supply.toString().toLocaleString('fullwide', {useGrouping:false})
        
        var end = total_supply.length - 1
        var start = (end - 71) < 0 ? 0 : (end-71)
        for(var j=0; j<=default_depth; j++){
            var depth_amount = bigInt(total_supply.substring(start, end+1)).toString().toLocaleString('fullwide', {useGrouping:false})
            var depth = j

            if(!bigInt(depth_amount).equals(0)){
                depth_mint_action[1].push(token_stack_id)
                depth_mint_action[2].push(35)
                depth_mint_action[3].push(0)
                depth_mint_action[4].push(53)
                depth_mint_action[5].push(2)
                depth_mint_action[6].push(depth)
                depth_mint_action[7].push(depth_amount)
            }

            end -= 72
            start -= 72
        }


        return depth_mint_action

    }

    format_subscription_object(t){
        var exchange_authority = t.authority_id == '' ? 53 : parseInt(t.authority_id)
        var exchange_authority_type = 23
        if(exchange_authority == 53){
            exchange_authority_type = 53
        }
        var minimum_buy_amount = t.minimum_buy_amount == 0 ? 1 : t.minimum_buy_amount.toString().toLocaleString('fullwide', {useGrouping:false})
        var cancellable_tags_object = this.get_selected_item(t.cancellable_tags_object, t.cancellable_tags_object['i'].active) == this.props.app_state.loc['541']/* 'true' */ ? 1 : 0
        var maximum_buy_amount = t.maximum_buy_amount.toString().toLocaleString('fullwide', {useGrouping:false})
        if(t.maximum_buy_amount == 0) maximum_buy_amount = (bigInt('1e72')).toString().toLocaleString('fullwide', {useGrouping:false})
        var minimum_cancellable_balance_amount = t.minimum_cancellable_balance_amount.toString().toLocaleString('fullwide', {useGrouping:false})
        var time_unit = t.time_unit.toString().toLocaleString('fullwide', {useGrouping:false})
        var subscription_beneficiary = t.subscription_beneficiary == '' ? 53 : parseInt(t.subscription_beneficiary).toString().toLocaleString('fullwide', {useGrouping:false})
        var subscription_beneficiary_type = 23
        if(subscription_beneficiary == 53){
            subscription_beneficiary_type = 53
        }

        var obj = [/* create subscription */
            [10000, 0, 0, 0, 0/* 4 */, 0, 0, 0, 0, 33, 0],
            [0], [23],
            [exchange_authority, minimum_buy_amount, cancellable_tags_object, maximum_buy_amount, minimum_cancellable_balance_amount/* 4 */, time_unit, subscription_beneficiary], [exchange_authority_type, 23, 23, 23, 23, 23, subscription_beneficiary_type],
            [], [],
            [], [],
            [], []
        ]

      if(t.price_data.length == 0){
        obj[5].push(3)
        obj[6].push(23)
        obj[7].push(1)
        obj[8].push(23)
        obj[9].push(0)
        obj[10].push(23)
      }else{
        for(var i=0; i<t.price_data.length; i++){
            obj[5].push(parseInt(t.price_data[i]['id']))
            obj[6].push(23)
            obj[7].push(parseInt(t.price_data[i]['amount']))
            obj[8].push(23)
            obj[9].push(0)
            obj[10].push(23)
        }
      }

      return obj
    }

    format_post_object(t){
        var obj = [/* custom object */
            [10000, 0, 0, 0, 0/* 4 */, 0, 0, 0, 0, 18, 0]
        ]
        return obj
    }

    format_job_object(t){
        var obj = [/* custom object */
            [10000, 0, 0, 0, 0/* 4 */, 0, 0, 0, 0, 17, 0]
        ]
        return obj
    }

    format_channel_object(t){
        var obj = [/* custom object */
            [10000, 0, 0, 0, 0/* 4 */, 0, 0, 0, 0, 36, 0]
        ]
        return obj
    }

    format_storefront_object(t){
        var obj = [/* custom object */
            [10000, 0, 0, 0, 0/* 4 */, 0, 0, 0, 0, 27, 0]
        ]
        return obj
    }

    format_buy_sell_object(t, ints){
        var depth_swap_obj = [
            [30000,16,0],
            [], [],/* target exchange ids */
            [], [],/* receivers */
            [],/* action */ 
            [],/* depth */
            []/* amount */
        ]

        var obj = [/* buy end/spend */
            [30000, 8, 0],
            [], [],/* exchanges */
            [], [],/* receivers */
            []/* amounts */, [],/* action */
            []/* lower_bounds */, []/* upper_bounds */
        ];


      var amount = bigInt(t.amount).toString().toLocaleString('fullwide', {useGrouping:false})
      var exchange = t.token_item['id']
      var action = this.get_action(t)
    
      if(action == 1){
        //if its a sell action
        var exchange_obj = this.props.app_state.created_token_object_mapping[this.props.app_state.selected_e5][parseInt(exchange)]
        var swap_actions = this.get_exchange_swap_down_actions(amount, exchange_obj, ints)
        for(var s=0; s<swap_actions.length; s++){
            depth_swap_obj[1].push(exchange)
            depth_swap_obj[2].push(23)
            depth_swap_obj[3].push(0)
            depth_swap_obj[4].push(53)
            depth_swap_obj[5/* action */].push(0)
            depth_swap_obj[6/* depth */].push(swap_actions[s])
            depth_swap_obj[7].push('1')
        }
      }
      
      obj[5].push(amount)
      obj[1].push(exchange)
      obj[2].push(23)
      obj[3].push(t.recipient_id)
      if(t.recipient_id == 53){
        obj[4].push(53)
      }else{
        obj[4].push(23)
      }
      
      obj[6].push(action)

      if(t.upper_bound != 0 && t.lower_bound != 0){
        obj[7].push(t.lower_bound.toString().toLocaleString('fullwide', {useGrouping:false}))
        obj[8].push(t.upper_bound.toString().toLocaleString('fullwide', {useGrouping:false}))
      }

      return {'obj':obj, 'depth':depth_swap_obj}
    }

    get_action(t){
        var action = this.get_selected_item(t.new_mint_dump_action_page_tags_object, 'e')
        var stack_action = 1
        if(action == this.props.app_state.loc['949']/* 'mint-buy' */) stack_action = 0
        return stack_action
    }




    format_transfer_object(t, ints){
        var ints_clone = ints.slice()
        var transfers_obj = [/* send tokens to another account */
            [30000, 1, 0],
            [], [],/* exchanges */
            [], [],/* receivers */
            [],/* amounts */
            []/* depths */
        ]
        /* depth_mint\swap up\swap down tokens [2(depth_auth_mint), 1(swap_up), 0(swap_down)] */
        var depth_swap_obj = [
            [30000,16,0],
            [], [],/* target exchange ids */
            [], [],/* receivers */
            [],/* action */ 
            [],/* depth */
            []/* amount */
        ]

        var added_txs = t.stack_items
        for(var i=0; i<added_txs.length; i++){
            var swap_actions = this.get_exchange_swap_down_actions(added_txs[i]['amount'], t.token_item, ints_clone.concat([depth_swap_obj, transfers_obj]))
            for(var s=0; s<swap_actions.length; s++){
                depth_swap_obj[1].push(added_txs[i]['exchange']['id'])
                depth_swap_obj[2].push(23)
                depth_swap_obj[3].push(0)
                depth_swap_obj[4].push(53)
                depth_swap_obj[5/* action */].push(0)
                depth_swap_obj[6/* depth */].push(swap_actions[s])
                depth_swap_obj[7].push('1')
            }


            var transfer_actions = this.get_exchange_transfer_actions(added_txs[i]['amount'])
            for(var tx=0; tx<transfer_actions.length; tx++){
                transfers_obj[1].push(added_txs[i]['exchange']['id'])
                transfers_obj[2].push(23)
                transfers_obj[3].push(added_txs[i]['recipient'])
                if(added_txs[i]['recipient'] == 53){
                    transfers_obj[4].push(53)
                }else{
                    transfers_obj[4].push(23)
                }
                transfers_obj[5].push(transfer_actions[tx]['amount'])
                transfers_obj[6].push(transfer_actions[tx]['depth'])
            }

            // console.log('-------------------e------------------')
        }
      
        return {'transfers':transfers_obj, 'swaps':depth_swap_obj}
    }

    get_active_exchange_depth_balance(exchange, ints){
        var token_balance_data = structuredClone(exchange['token_balances_data'])

        for(var i=0; i<ints.length; i++){
            //all the transactions
            if(ints[i][0][0] == 30000 && ints[i][0][1] == 16){
                //its a swap down action
                for(var j=0; j<ints[i][1].length; j++){
                    //for each targeted exchange id
                    if(ints[i][1][j] == exchange['id'] && ints[i][5][j] == 0){
                        //if the target is the exchange id and its a swap down
                        var depth = parseInt(ints[i][6][j])
                        // console.log('adding 1e72 end at depth: ', depth-1)
                        token_balance_data[depth-1] = bigInt(token_balance_data[depth-1]).add(bigInt('1e72')).toString().toLocaleString('fullwide', {useGrouping:false})
                        /* update the new depth balance */
                        token_balance_data[(depth)] = bigInt(token_balance_data[(depth)]).minus(1).toString().toLocaleString('fullwide', {useGrouping:false})
                        /* remove one from the next depth balance */
                    }
                }
            }
        }

        for(var i=0; i<ints.length; i++){
            //all the transactions
            if(ints[i][0][0] == 30000 && ints[i][0][1] == 1){
                //its a transfer action
                for(var j=0; j<ints[i][1].length; j++){
                    //for each targeted exchange
                    if(ints[i][1][j] == exchange['id']){
                        //if the target is the exchange id
                        var amount = ints[i][5][j]
                        var depth = parseInt(ints[i][6][j])
                        token_balance_data[depth] = bigInt(token_balance_data[depth]).minus(bigInt(amount)).toString().toLocaleString('fullwide', {useGrouping:false})
                    }
                }
            }
        }

        for(var i=0; i<ints.length; i++){
            //all the transactions
            if(ints[i][0][0] == 30000 && ints[i][0][1] == 7){
                //if the action is a award action
                for(var j=0; j<ints[i][4].length; j++){
                    //for each targeted exchange
                    if(ints[i][4][j] == exchange['id']){
                        //if the target is the exchange id
                        var amount = ints[i][6][j]
                        var depth = parseInt(ints[i][7][j])
                        token_balance_data[depth] = bigInt(token_balance_data[depth]).minus(bigInt(amount)).toString().toLocaleString('fullwide', {useGrouping:false})
                    }
                }
            }
        }

        // console.log('token_balance_data: ',JSON.stringify(token_balance_data))

        return token_balance_data
    }

    get_exchange_swap_down_actions(amount, exchange, ints){
        if(exchange['balance'] == 0) return []
        var active_exchange_depth_data = this.get_active_exchange_depth_balance(exchange, ints)
        //get the depth balances
        var swap_down_actions = []
        
        var transactions = this.get_exchange_transfer_actions(amount)
        //get the individual transfer actions for each depth
        transactions.forEach(item => {
            //for each transaction
            var transaction_amount = bigInt(item['amount'])
            var transaction_amount_depth = parseInt(item['depth'])
            //record the amount and depth

            var my_balance_at_depth = active_exchange_depth_data[transaction_amount_depth]
            //record the accounts balance at the depth in focus

            // console.log('my_balance_at_depth: ', this.format_account_balance_figure(my_balance_at_depth))
            // console.log('transaction_amount', this.format_account_balance_figure(transaction_amount))

            if(bigInt(my_balance_at_depth).lesser(transaction_amount)){
                //if my balance at depth in focus is less than the transactions amount
                var a = true;
                var starting_search_depth = transaction_amount_depth+1
                var starting_point_depth = -1
                while(a) {
                    if(bigInt(active_exchange_depth_data[starting_search_depth]).greater(0)){
                        starting_point_depth = starting_search_depth
                        a = false
                    }else{
                        starting_search_depth +=1
                    }
                }

                for(var i=starting_point_depth; i>transaction_amount_depth; i--){
                    swap_down_actions.push(i)
                    active_exchange_depth_data[i] = bigInt(active_exchange_depth_data[i]).minus(1)
                    //decrement by 1 since were swapping down
                    active_exchange_depth_data[i-1] = bigInt(active_exchange_depth_data[i-1]).add(bigInt('1e72'))
                    //increment by 1e72 since were swapping down
                }
            }
        });

        console.log('swap down actions for ', amount, ' ', swap_down_actions)

        return swap_down_actions
    }

    get_default_depth(number){
        var number_as_string = number.toString().toLocaleString('fullwide', {useGrouping:false})
        return Math.floor((number_as_string.length-1)/72)
    }

    get_exchange_transfer_actions(amount){
        var transaction_amount = amount.toString().toLocaleString('fullwide', {useGrouping:false})
        var transaction_amount_depth = this.get_default_depth(transaction_amount)

        var end = transaction_amount.length - 1
        var start = (end - 71) < 0 ? 0 : (end-71)

        var data = []
        for(var j=0; j<=transaction_amount_depth; j++){
            var depth_amount = bigInt(transaction_amount.substring(start, end+1)).toString().toLocaleString('fullwide', {useGrouping:false})
            var depth = j
            if(!bigInt(depth_amount).equals(0)){
                data.push({'amount':depth_amount, 'depth':depth})
            }

            end -= 72
            start -= 72
        }
        return data
    }






    format_enter_contract_object(t){
        var obj = [/* enter a contract */
            [30000, 3, 0],
            [], [],/* contract ids */
            []/* expiry time (seconds) */
        ];

        obj[1].push(t.contract_item['id'])
        obj[2].push(23)
        obj[3].push(t.interactible_timestamp.toString().toLocaleString('fullwide', {useGrouping:false}))

        return obj
    }

    format_extend_contract_object(t){
        var obj = [/* extend enter contract */
        [30000, 14, 0],
        [], [],/* contract ids */
        []/* expiry time (seconds) */
      ]

      obj[1].push(t.contract_item['id'])
      obj[2].push(23)
      obj[3].push(t.interactible_timestamp)

      return obj
    }

    format_exit_contract_object(t){
        var obj = [/* exit contract */
            [30000, 11, 0],
            [], []/* contract ids */
        ]
        obj[1].push(t.contract_item['id'])
        obj[2].push(23)

        return obj;
    }

    format_proposal_object(t){
        var consensus_obj = {'spend':0,'reconfig':1, 'exchange-transfer':6}
        consensus_obj[this.props.app_state.loc['316']/* spend */] = 0
        consensus_obj[this.props.app_state.loc['317']/* reconfig */] = 1
        consensus_obj[this.props.app_state.loc['318']/* exchange-transfer */] = 6

        var consensus_type_tag = this.get_selected_item(t.new_proposal_type_tags_object, t.new_proposal_type_tags_object['i'].active)
        var consensus_type = consensus_obj[consensus_type_tag]
        var proposal_expiry_time = t.proposal_expiry_time.toString().toLocaleString('fullwide', {useGrouping:false})
        var consensus_submit_expiry_time = t.proposal_submit_expiry_time.toString().toLocaleString('fullwide', {useGrouping:false})
        var target_contract_authority = t.contract_item['id'].toString().toLocaleString('fullwide', {useGrouping:false})
        var modify_target = t.modify_target_id.toString().toLocaleString('fullwide', {useGrouping:false})
        if(modify_target == ''){
            modify_target = '0'
        }
        var consensus_majority_target_proportion = t.contract_item['data'][1][7/* <7>default_consensus_majority_limit */].toString().toLocaleString('fullwide', {useGrouping:false})

        var voter_weight_exchange_id = t.contract_item['data'][1][33/* <33>default_voter_weight_exchange */].toString().toLocaleString('fullwide', {useGrouping:false})

        var voter_weight_exchange_id_depth = t.contract_item['data'][1][34/* <34>default_voter_weight_exchange_depth */].toString().toLocaleString('fullwide', {useGrouping:false})

        var obj = [/* create proposal */
            [10000, 0, 0, 0, 0/* 4 */, 0, 0, 0, 0, 32, 0],
            [0], [23],
            [consensus_type, proposal_expiry_time, 0/* 2 */, consensus_submit_expiry_time, 0, target_contract_authority, consensus_majority_target_proportion/* 6 */, voter_weight_exchange_id, voter_weight_exchange_id_depth, modify_target], 
            [23, 23, 23, 23, 23, 23, 23, 23, 23, 23],
            [], [],
            [], [],/* 8 */
            [], [],/* 4 <exchanges> */
            [], [],
            [], [],/* 14 */
            [], [],
            [], [],/* 18 */
            [], [],
            [], []/* bounty depths */
        ]

        for(var i = 0; i<t.bounty_values.length; i++){
            //set the bounty data
            obj[5].push(t.bounty_values[i]['exchange'].toString().toLocaleString('fullwide', {useGrouping:false}))
            obj[6].push(23)

            obj[7].push(t.bounty_values[i]['amount'].toString().toLocaleString('fullwide', {useGrouping:false}))
            obj[8].push(23)

            obj[21].push(0)
            obj[22].push(23)
        }

        if(consensus_type_tag == this.props.app_state.loc['316']/* 'spend' */){
            for(var i=0; i<t.spend_actions.length; i++){
                obj[9].push(t.spend_actions[i]['spend_token'].toString().toLocaleString('fullwide', {useGrouping:false}))
                obj[10].push(23)

                obj[11].push(t.spend_actions[i]['amount'].toString().toLocaleString('fullwide', {useGrouping:false}))
                obj[12].push(23)

                var receiver = t.spend_actions[i]['spend_target']
                var receiver_type = 23
                if(receiver == 53){
                    receiver_type = 53
                }

                obj[13].push(receiver.toString().toLocaleString('fullwide', {useGrouping:false}))
                obj[14].push(receiver_type)

                obj[15].push(0)/* depths */
                obj[16].push(23)

                obj[17].push(0)/* depths */
                obj[18].push(23)

                obj[19].push(0)/* depths */
                obj[20].push(23)
            }
        }
        else if(consensus_type_tag == this.props.app_state.loc['317']/* 'reconfig' */){
            for(var i=0; i<t.reconfig_values.length; i++){
                obj[9].push(t.reconfig_values[i]['pos'][0])
                obj[10].push(23)

                obj[11].push(t.reconfig_values[i]['pos'][1])
                obj[12].push(23)

                obj[13].push(t.reconfig_values[i]['value'].toString().toLocaleString('fullwide', {useGrouping:false}))
                obj[14].push(23)

                obj[15].push(0)/* depths */
                obj[16].push(23)

                obj[17].push(0)/* depths */
                obj[18].push(23)

                obj[19].push(0)/* depths */
                obj[20].push(23)

            }
        }
        else if(consensus_type_tag == this.props.app_state.loc['318']/* 'exchange-transfer' */){
            for(var i=0; i<t.exchange_transfer_values.length; i++){
                obj[9].push(t.exchange_transfer_values[i]['exchange'].toString().toLocaleString('fullwide', {useGrouping:false}))
                obj[10].push(23)

                var receiver = t.exchange_transfer_values[i]['receiver']
                var receiver_type = 23
                if(receiver == 53){
                    receiver_type = 53
                }

                obj[11].push(receiver.toString().toLocaleString('fullwide', {useGrouping:false}))
                obj[12].push(receiver_type)

                obj[13].push(t.exchange_transfer_values[i]['amount'].toString().toLocaleString('fullwide', {useGrouping:false}))
                obj[14].push(23)

                obj[15].push(0)/* depths */
                obj[16].push(23)

                obj[17].push(t.exchange_transfer_values[i]['token'].toString().toLocaleString('fullwide', {useGrouping:false}))
                obj[18].push(23)
                
                obj[19].push(0)/* depths */
                obj[20].push(23)
            }
        }

        return obj
    }

    format_vote_object(t){
        var vote = this.get_selected_item(t.new_vote_tags_object, t.new_vote_tags_object['i'].active)
        var votes_obj = {'yes':1, 'wait':2, 'no':3}
        votes_obj[this.props.app_state.loc['801']/* yes */] = 1
        votes_obj[this.props.app_state.loc['800']/* wait */] = 2
        votes_obj[this.props.app_state.loc['802']/* no */] = 3
        var obj = [/* vote proposal */
            [30000, 4, 0],
            [t.proposal_item['id'].toString().toLocaleString('fullwide', {useGrouping:false})], [23],/* proposal ids */
            [votes_obj[vote]],/* votes */
            [], [], []/* target bounty exchanges */
        ]

        for(var i=0; i<t.bounty_exchanges.length; i++){
            obj[4].push(t.bounty_exchanges[i]['exchange'].toString().toLocaleString('fullwide', {useGrouping:false}))
            obj[5].push(23)
            obj[6].push(0)
        }

        return obj
    }

    format_submit_object(t){
        var obj = [/* submit consensus request */
            [30000, 5, 0/* payer_account_data_start */, 0/* payer_account_data_end */, 0/* vote_proposal_bounty_data_start */, 0/* vote_proposal_bounty_data_end */, 0],
            [t.proposal_item['id'].toString().toLocaleString('fullwide', {useGrouping:false})], [23],/* targets */
        ]

        return obj
    }

    format_pay_subscription_object(t){
        var obj = [/* pay subscription */
        [30000, 2, 0],
        [t.subscription_item['id'].toString().toLocaleString('fullwide', {useGrouping:false})], [23],/* target subscription ids */
        [t.time_units.toString().toLocaleString('fullwide', {useGrouping:false})]/* subscription buy amounts */
      ]
      return obj
    }

    format_cancel_subscription_object(t){
        var obj = [/* pay subscription */
        [30000, 12, 0],
        [t.subscription_item['id'].toString().toLocaleString('fullwide', {useGrouping:false})], [23],/* target subscription ids */
        [t.time_units.toString().toLocaleString('fullwide', {useGrouping:false})]/* subscription buy amounts */
      ]
      return obj
    }

    format_collect_subscription_object(t){
        var obj = [/* collect subscription */
        [30000, 13, 0],
        [t.subscription_item['id'].toString().toLocaleString('fullwide', {useGrouping:false})], [23],/* target subscription ids */
        [],/* subscription collect accounts */
      ]

      for(var i=0; i< t.subscription_item['paid_accounts'].length; i++){
        obj[3].push(t.subscription_item['paid_accounts'][i].toString().toLocaleString('fullwide', {useGrouping:false}))
      }

        return obj
    }

    format_modify_subscription_object(t){
        var obj = [/* auth modify subscription */
            [20000, 11, 0],
            [], [],/* targets */
            [],/* target_array_pos */
            [],/* target_array_items */
            [], []/* new_items */
        ]

        for(var i=0; i<t.reconfig_values.length; i++){
            obj[1].push(t.subscription_item['id'].toString().toLocaleString('fullwide', {useGrouping:false}))
            obj[2].push(23)
            obj[3].push(t.reconfig_values[i]['pos'][0].toString().toLocaleString('fullwide', {useGrouping:false}))
            obj[4].push(t.reconfig_values[i]['pos'][1].toString().toLocaleString('fullwide', {useGrouping:false}))
            obj[5].push(t.reconfig_values[i]['value'].toString().toLocaleString('fullwide', {useGrouping:false}))
            obj[6].push(23)
        }

        return obj
    }

    format_modify_contract_object(t){
        var obj = [/* auth modify contract */
            [20000, 15, 0],
            [], [],/* targets */
            [],/* target_array_pos */
            [],/* target_array_items */
            [], []/* new_items */
        ]

        for(var i=0; i<t.reconfig_values.length; i++){
            obj[1].push(t.contract_item['id'].toString().toLocaleString('fullwide', {useGrouping:false}))
            obj[2].push(23)
            obj[3].push(t.reconfig_values[i]['pos'][0].toString().toLocaleString('fullwide', {useGrouping:false}))
            obj[4].push(t.reconfig_values[i]['pos'][1].toString().toLocaleString('fullwide', {useGrouping:false}))
            obj[5].push(t.reconfig_values[i]['value'].toString().toLocaleString('fullwide', {useGrouping:false}))
            obj[6].push(23)
        }

        return obj
    }

    format_modify_token_object(t){
        var obj = [/* auth modify token exchange */
            [20000, 3, 0],
            [], [],/* targets */
            [],/* target_array */
            [],/* target_array_items */
            [], []/* new_items */
        ]

        for(var i=0; i<t.reconfig_values.length; i++){
            obj[1].push(t.token_item['id'].toString().toLocaleString('fullwide', {useGrouping:false}))
            obj[2].push(23)
            obj[3].push(t.reconfig_values[i]['pos'][0].toString().toLocaleString('fullwide', {useGrouping:false}))
            obj[4].push(t.reconfig_values[i]['pos'][1].toString().toLocaleString('fullwide', {useGrouping:false}))
            obj[5].push(t.reconfig_values[i]['value'].toString().toLocaleString('fullwide', {useGrouping:false}))
            obj[6].push(23)
        }

        return obj
    }

    format_exchange_transfer_object(t){
        var obj = [/* exchange transfer */
            [30000, 17, 0],
            [], [],/* exchange ids */
            [], [],/* receivers */
            [], [],/* amounts/depths */
            [], [],/* token targets */
        ]


        for(var i=0; i<t.exchange_transfer_values.length; i++){
            obj[1].push(t.exchange_transfer_values[i]['exchange'].toString().toLocaleString('fullwide', {useGrouping:false}))
            obj[2].push(23)

            var receiver = t.exchange_transfer_values[i]['receiver']
            var receiver_type = 23
            if(receiver == 53){
                receiver_type = 53
            }

            obj[3].push(receiver.toString().toLocaleString('fullwide', {useGrouping:false}))
            obj[4].push(receiver_type)

            obj[5].push(t.exchange_transfer_values[i]['amount'].toString().toLocaleString('fullwide', {useGrouping:false}))

            obj[6].push(0)/* depths */

            obj[7].push(t.exchange_transfer_values[i]['token'].toString().toLocaleString('fullwide', {useGrouping:false}))
            obj[8].push(23)
        }

        return obj;
    }

    format_force_exit_object(t){
        //.toString().toLocaleString('fullwide', {useGrouping:false})
        var obj = [/* force exit account */
            [30000, 18, 0],
            [], [],/* contract ids */
            []/* target account */
        ]

        for(var i=0; i<t.force_exit_accounts.length; i++){
            obj[1].push(t.contract_item['id'].toString().toLocaleString('fullwide', {useGrouping:false}))
            obj[2].push(23)
            obj[3].push(t.force_exit_accounts[i].toString().toLocaleString('fullwide', {useGrouping:false}))
        }

        return obj
    }

    format_archive_object(t){
        var obj = [/* archive proposal/contract */
            [30000, 15, 0],
            [t.object_item['id'].toString().toLocaleString('fullwide', {useGrouping:false})], [23],/* proposal/contract ids */
            /* for target 1004 */
            [],/* voters/participants */
            [],[]/* exchanges to loot */
        ]

        for(var i=0; i<t.object_item['archive_accounts'].length; i++){
            obj[3].push(t.object_item['archive_accounts'][i].toString().toLocaleString('fullwide', {useGrouping:false}));
        }

        for(var i=0; i<t.bounty_exchanges.length; i++){
            obj[4].push(t.bounty_exchanges[i]['exchange'].toString().toLocaleString('fullwide', {useGrouping:false}));
            obj[5].push(0)
        }

        return obj
    }

    format_freeze_unfreeze_object(t){
        var obj = [/* auth freeze tokens [1-freeze_tokens , 0-unfreeze_tokens] */
            [30000, 6, 0],
            [], [],/* target_exchanges */
            [], [],/* target_account_ids */
            [],/* freeze_amounts */
            [],/* action */
            []/* depths */
        ]

        for(var i=0; i<t.freeze_unfreeze_actions.length; i++){
            obj[1].push(t.token_item['id'].toString().toLocaleString('fullwide', {useGrouping:false}))
            obj[2].push(23)
            obj[3].push(t.freeze_unfreeze_actions[i]['recipient'].toString().toLocaleString('fullwide', {useGrouping:false}))
            obj[4].push(23)
            obj[5].push(t.freeze_unfreeze_actions[i]['amount'].toString().toLocaleString('fullwide', {useGrouping:false}))
            obj[6].push(t.freeze_unfreeze_actions[i]['action'].toString().toLocaleString('fullwide', {useGrouping:false}))
            obj[7].push(0)
        }

        return obj
    }

    format_authmint_object(t){
        var obj = [/* auth mint token */
            [30000, 9, 0],
            [], [],/* exchanges */
            [], [],/* receivers */
            []/* amounts */, [],/* action */
            []/* lower_bounds */, []/* upper_bounds */
        ]

        for(var i=0; i<t.authmint_actions.length; i++){
            obj[1].push(t.token_item['id'].toString().toLocaleString('fullwide', {useGrouping:false}))
            obj[2].push(23)

            var receiver = t.authmint_actions[i]['recipient']
            var receiver_type = 23
            if(receiver == 53){
                receiver_type = 53
            }
            obj[3].push(receiver.toString().toLocaleString('fullwide', {useGrouping:false}))
            obj[4].push(receiver_type)
            obj[5].push(t.authmint_actions[i]['amount'].toString().toLocaleString('fullwide', {useGrouping:false}))
            obj[6].push(0)
        }

        return obj
    }

    format_access_rights_object(t){
        //.toString().toLocaleString('fullwide', {useGrouping:false})
        var obj = []
        var set_account_as_mod_obj = [ /* set account as mod */
            [20000, 4, 0],
            [], [],/* target objects */
            [], []/* target moderator account ids*/
        ];

        var enable_interactable_checkers = [ /* enable interactible checkers */
            [20000, 5, 0],
            [], []/* target objects */
        ]

        var revoke_auth_mod_privelages = [/* revoke author's moderator privelages */
            [20000, 16, 0],
            [], [],/* target objects */
        ]

        var access_rights = [ /* set account to be interactible */
            [20000, 2, 0],
            [], [],/* target objects */
            [], [],/* target account ids*/
            []/* interacible expiry time limit */
        ]

        var blocked_accounts = [/* block account */
            [20000, 17, 0],
            [], [],/* target objects */
            [], [],/* target account ids */
            []/* expiry_time */
        ]

        for(var i=0; i<t.all_actions.length; i++){
            var action = t.all_actions[i].type;
            if(action == 'moderator'){
                set_account_as_mod_obj[1].push(t.object_item['id'].toString().toLocaleString('fullwide', {useGrouping:false}))
                set_account_as_mod_obj[2].push(23)
                set_account_as_mod_obj[3].push(t.all_actions[i]['account'].toString().toLocaleString('fullwide', {useGrouping:false}))
                set_account_as_mod_obj[4].push(23)
            }
            else if(action == 'interactable-checkers'){
                enable_interactable_checkers[1].push(t.object_item['id'].toString().toLocaleString('fullwide', {useGrouping:false}))
                enable_interactable_checkers[2].push(23)
            }
            else if(action == 'author-moderator-privelages'){
                revoke_auth_mod_privelages[1].push(t.object_item['id'].toString().toLocaleString('fullwide', {useGrouping:false}))
                revoke_auth_mod_privelages[2].push(23)
            }
            else if(action == 'access-rights'){
                access_rights[1].push(t.object_item['id'].toString().toLocaleString('fullwide', {useGrouping:false}))
                access_rights[2].push(23)
                access_rights[3].push(t.all_actions[i]['account'].toString().toLocaleString('fullwide', {useGrouping:false}))
                access_rights[4].push(23)
                access_rights[5].push(t.all_actions[i]['time'].toString().toLocaleString('fullwide', {useGrouping:false}))
            }
            else if(action == 'blocked-access'){
                blocked_accounts[1].push(t.object_item['id'].toString().toLocaleString('fullwide', {useGrouping:false}))
                blocked_accounts[2].push(23)
                blocked_accounts[3].push(t.all_actions[i]['account'].toString().toLocaleString('fullwide', {useGrouping:false}))
                blocked_accounts[4].push(23)
                blocked_accounts[5].push(t.all_actions[i]['time'].toString().toLocaleString('fullwide', {useGrouping:false}))
            }
        }

        if(set_account_as_mod_obj[1].length > 0){
            obj.push(set_account_as_mod_obj)
        }
        if(enable_interactable_checkers[1].length > 0){
            obj.push(enable_interactable_checkers)
        }
        if(revoke_auth_mod_privelages[1].length > 0){
            obj.push(revoke_auth_mod_privelages)
        }
        if(access_rights[1].length > 0){
            obj.push(access_rights)
        }
        if(blocked_accounts[1].length > 0){
            obj.push(blocked_accounts)
        }

        return obj
    }

    format_mail_object = async (t, calculate_gas, ipfs_index) =>{
        var obj = [ /* set data */
            [20000, 13, 0],
            [], [],/* target objects */
            [], /* contexts */
            [] /* int_data */
        ]

        var string_obj = [[]]
        var string_data = ''
        if(calculate_gas) string_data = await this.get_object_ipfs_index('', calculate_gas, ipfs_index)
        else string_data = await this.get_object_ipfs_index(await this.get_encrypted_mail_message(t, t.target_recipient), calculate_gas, ipfs_index, t.id);

        // var recipient_account = t.target_recipient
        console.log('object',t)
        var recipient_account = (await this.get_unique_crosschain_identifier_number(t.target_recipient, t, t.recipients_e5))
        var context = this.props.app_state.selected_e5 == t.recipients_e5 ? 30 : 31
        var int_data = t.convo_id

        obj[1].push(recipient_account)
        obj[2].push(23)
        obj[3].push(context)
        obj[4].push(int_data)

        string_obj[0].push(string_data)

      return {int: obj, str: string_obj}
    }

    process_channel_object = async (t) => {
        var data = structuredClone(t)
        var channel_keys_obj = {}
        if(data.participants.length > 0 || (data.channel_keys.length > 0 && t.type == this.props.app_state.loc['753']/* 'edit-channel' */)){
            //channel is private
            var key = makeid(35)
            for(var i=0; i<data.participants.length; i++){
                var participant_account = data.participants[i].id
                var participant_e5 = data.participants[i].e5
                var recipients_pub_key_hash = await this.props.get_accounts_public_key(participant_account, participant_e5)
                if(recipients_pub_key_hash != ''){
                    var encrypted_key = await this.props.encrypt_key_with_accounts_public_key_hash(key, recipients_pub_key_hash)
                    channel_keys_obj[this.calculate_unique_crosschain_identifier_number(recipients_pub_key_hash)] = encrypted_key
                }
            }
            var uint8array = await this.props.get_account_raw_public_key() 
            var my_encrypted_key = await this.props.encrypt_key_with_accounts_public_key_hash(key, uint8array)
            channel_keys_obj[await this.get_my_unique_crosschain_identifier_number()] = my_encrypted_key
        }
        data.channel_keys.push(channel_keys_obj)

        var blocked_object = {'identifiers':{}, 'e5_ids':{}}
        if(data.blocked_participants.length > 0){
            for(var i=0; i<data.blocked_participants.length; i++){
                const blocked_account = data.blocked_participants[i]
                const blocked_account_e5_id = blocked_account.id+blocked_account.e5
                if(data.blocked_data != null && data.blocked_data['e5_ids'][blocked_account_e5_id] != null){
                    const existing_identifier = data.blocked_data['e5_ids'][blocked_account_e5_id];
                    blocked_object['identifiers'][existing_identifier] = blocked_account_e5_id;
                    blocked_object['e5_ids'][blocked_account_e5_id] = existing_identifier;
                }else{
                    var recipients_pub_key_hash = await this.props.get_accounts_public_key(blocked_account.id, blocked_account.e5)
                    var identifier = this.calculate_unique_crosschain_identifier_number(recipients_pub_key_hash)
                    blocked_object['identifiers'][identifier] = blocked_account_e5_id
                    blocked_object['e5_ids'][blocked_account_e5_id] = identifier
                }
            }
        }
        data.blocked_data = blocked_object

        return data
    }

    get_encrypted_mail_message = async (t, recip) =>{
        var key = makeid(35)
        // t.my_pub_key = this.props.app_state.my_pub_key
        // console.log('stackpage', 'message', t)
        var encrypted_obj = this.props.encrypt_data_object(t, key)
        var recipent_data = {}
        var recipient = recip
        var recipients_pub_key_hash = await this.props.get_accounts_public_key(recipient, t['recipients_e5'])

        if(recipients_pub_key_hash != ''){
            var encrypted_key = await this.props.encrypt_key_with_accounts_public_key_hash(key, recipients_pub_key_hash)
            // recipent_data[parseInt(recipient)] = encrypted_key
            recipent_data[await this.calculate_unique_crosschain_identifier_number(recipients_pub_key_hash)] = encrypted_key
        }

        var uint8array = await this.props.get_account_raw_public_key() 
        var my_encrypted_key = await this.props.encrypt_key_with_accounts_public_key_hash(key, uint8array)
        // recipent_data[this.props.app_state.user_account_id[this.props.app_state.selected_e5]] = my_encrypted_key
        recipent_data[await this.get_my_unique_crosschain_identifier_number()] = my_encrypted_key

        return {'obj':encrypted_obj, 'recipient_data':recipent_data}
    }

    get_my_unique_crosschain_identifier_number = async () => {
        var uint8array_string = await this.props.get_my_entire_public_key() 
        var uint8array = Uint8Array.from(uint8array_string.split(',').map(x=>parseInt(x,10)));
        var arr = uint8array.toString().replaceAll(',','')
        if(arr.length > 36){
            arr = arr.slice(0, 36);
        }
        console.log('stackpage', 'arr', arr)        
        return arr
    }

    format_message_object = async (t, calculate_gas, ipfs_index) =>{
        var obj = [ /* set data */
            [20000, 13, 0],
            [], [],/* target objects */
            [], /* contexts */
            [] /* int_data */
        ]

        var string_obj = [[]]

        for(var i=0; i<t.messages_to_deliver.length; i++){
            // var recipient_account = t.messages_to_deliver[i]['recipient']
            var recipient_account = (await this.get_unique_crosschain_identifier_number(t.messages_to_deliver[i]['recipient'], t.messages_to_deliver[i], t.messages_to_deliver[i]['recipients_e5']))
            
            var context = this.props.app_state.selected_e5 == t.messages_to_deliver[i]['e5'] ? 32 : 33
            var int_data = t.messages_to_deliver[i].convo_id

            var string_data = await this.get_object_ipfs_index(await this.get_encrypted_mail_message(t.messages_to_deliver[i], t.messages_to_deliver[i]['recipient']), calculate_gas, ipfs_index, t.messages_to_deliver[i]['message_id']);

            obj[1].push(recipient_account)
            obj[2].push(23)
            obj[3].push(context)
            obj[4].push(int_data)

            string_obj[0].push(string_data)
        }

        return {int: obj, str: string_obj}
    }

    get_unique_crosschain_identifier_number = async (recipient, t, default_e5) => {
        var arr = null;
        var hash = await this.props.get_accounts_public_key(recipient, default_e5)
        arr = hash.toString().replaceAll(',','')
        if(arr.length > 36){
            arr = arr.slice(0, 36);
        }
        return arr
    }

    calculate_unique_crosschain_identifier_number(hash){
        var arr = null;
        arr = hash.toString().replaceAll(',','')
        if(arr.length > 36){
            arr = arr.slice(0, 36);
        }
        return arr
    }

    format_channel_message_object = async (t, calculate_gas, ipfs_index) =>{
        var obj = [ /* set data */
            [20000, 13, 0],
            [], [],/* target objects */
            [], /* contexts */
            [] /* int_data */
        ]

        var string_obj = [[]]

        for(var i=0; i<t.messages_to_deliver.length; i++){
            // var target_id = t.messages_to_deliver[i]['id']
            // var context = 35
            // var int_data = 0
            var target_id = 17/* shadow_object_container */
            var context = t.messages_to_deliver[i]['id']
            var int_data = parseInt(t.messages_to_deliver[i]['e5'].replace('E',''))

            var string_data = await this.get_object_ipfs_index(t.messages_to_deliver[i], calculate_gas, ipfs_index, t.messages_to_deliver[i]['message_id']);

            obj[1].push(target_id)
            obj[2].push(23)
            obj[3].push(context)
            obj[4].push(int_data)

            string_obj[0].push(string_data)
        }

        return {int: obj, str: string_obj}
    }

    format_post_comment_object = async (t, calculate_gas, ipfs_index) =>{
        var obj = [ /* set data */
            [20000, 13, 0],
            [], [],/* target objects */
            [], /* contexts */
            [] /* int_data */
        ]

        var string_obj = [[]]

        for(var i=0; i<t.messages_to_deliver.length; i++){
            // var target_id = t.messages_to_deliver[i]['id']
            // var context = 35
            // var int_data = 0

            var target_id = 17/* shadow_object_container */
            var context = t.messages_to_deliver[i]['id']
            var int_data = parseInt(t.messages_to_deliver[i]['e5'].replace('E',''))

            var string_data = await this.get_object_ipfs_index(t.messages_to_deliver[i], calculate_gas, ipfs_index, t.messages_to_deliver[i]['message_id']);

            obj[1].push(target_id)
            obj[2].push(23)
            obj[3].push(context)
            obj[4].push(int_data)

            string_obj[0].push(string_data)
        }

        return {int: obj, str: string_obj}
    }

    format_job_application_object = async (t, calculate_gas, ipfs_index) =>{
        var obj = [ /* set data */
            [20000, 13, 0],
            [], [],/* target objects */
            [], /* contexts */
            [] /* int_data */
        ]

        var string_obj = [[]]

        var target_id = t.job_item['id']
        var context = 36
        var int_data = Date.now()

        var application_obj = {'price_data':t.price_data, 'picked_contract_id':t.picked_contract['id'], 'picked_contract_e5':t.picked_contract['e5'], 'application_expiry_time':t.application_expiry_time, 'applicant_id':this.props.app_state.user_account_id[this.props.app_state.selected_e5], 'pre_post_paid_option':t.pre_post_paid_option, 'type':'job_application', 'custom_specifications':t.custom_specifications}

        var string_data = await this.get_object_ipfs_index(application_obj, calculate_gas, ipfs_index, t.id);

        obj[1].push(target_id)
        obj[2].push(23)
        obj[3].push(context)
        obj[4].push(int_data)

        string_obj[0].push(string_data)

        return {int: obj, str: string_obj}
    }

    format_accept_application_object = async (t, calculate_gas, ipfs_index) =>{
        var obj = [ /* set data */
            [20000, 13, 0],
            [], [],/* target objects */
            [], /* contexts */
            [] /* int_data */
        ]

        var string_obj = [[]]

        var target_id = t.application_item['job_id']
        var context = 37
        var int_data = t.application_item['id']

        // var application_obj = {'accepted':true}
        // var string_data = await this.get_object_ipfs_index(application_obj, calculate_gas, ipfs_index, t.id);
        var string_data = 'true'

        obj[1].push(target_id)
        obj[2].push(23)
        obj[3].push(context)
        obj[4].push(int_data)

        string_obj[0].push(string_data)



        return {int: obj, str: string_obj}
    }

    format_job_comment_object = async (t, calculate_gas, ipfs_index) =>{
        var obj = [ /* set data */
            [20000, 13, 0],
            [], [],/* target objects */
            [], /* contexts */
            [] /* int_data */
        ]

        var string_obj = [[]]

        for(var i=0; i<t.messages_to_deliver.length; i++){
            // var target_id = t.messages_to_deliver[i]['id']
            // var context = 35
            // var int_data = 0

            var target_id = 17/* shadow_object_container */
            var context = t.messages_to_deliver[i]['id']
            var int_data = parseInt(t.messages_to_deliver[i]['e5'].replace('E',''))

            var string_data = await this.get_object_ipfs_index(t.messages_to_deliver[i], calculate_gas, ipfs_index, t.messages_to_deliver[i]['message_id']);

            obj[1].push(target_id)
            obj[2].push(23)
            obj[3].push(context)
            obj[4].push(int_data)

            string_obj[0].push(string_data)
        }

        return {int: obj, str: string_obj}
    }

    format_proposal_message_object = async (t, calculate_gas, ipfs_index) => {
        var obj = [ /* set data */
            [20000, 13, 0],
            [], [],/* target objects */
            [], /* contexts */
            [] /* int_data */
        ]

        var string_obj = [[]]

        for(var i=0; i<t.messages_to_deliver.length; i++){
            // var target_id = t.messages_to_deliver[i]['id']
            // var context = 35
            // var int_data = 0

            var target_id = 17/* shadow_object_container */
            var context = t.messages_to_deliver[i]['id']
            var int_data = parseInt(t.messages_to_deliver[i]['e5'].replace('E',''))

            var string_data = await this.get_object_ipfs_index(t.messages_to_deliver[i], calculate_gas, ipfs_index, t.messages_to_deliver[i]['message_id']);

            obj[1].push(target_id)
            obj[2].push(23)
            obj[3].push(context)
            obj[4].push(int_data)

            string_obj[0].push(string_data)
        }

        return {int: obj, str: string_obj}
    }

    format_storefront_bag_object = (t) => {
        var obj = [/* custom object */
            [10000, 0, 0, 0, 0/* 4 */, 0, 0, 0, 0, 25, 0]
        ]
        return obj
    }

    format_bag_application_object = async (t, calculate_gas, ipfs_index) =>{
        var obj = [ /* set data */
            [20000, 13, 0],
            [], [],/* target objects */
            [], /* contexts */
            [] /* int_data */
        ]

        var string_obj = [[]]

        var target_id = t.bag_item['id']
        var context = 36
        var int_data = Date.now()

        var application_obj = {'price_data':t.price_data, 'picked_contract_id':t.picked_contract['id'], 'application_expiry_time':t.application_expiry_time, 'applicant_id':this.props.app_state.user_account_id[this.props.app_state.selected_e5], 'pre_post_paid_option':t.pre_post_paid_option, 'estimated_delivery_time': t.estimated_delivery_time , 'type':'bag_application'}

        var string_data = await this.get_object_ipfs_index(application_obj, calculate_gas, ipfs_index, t.id);

        obj[1].push(target_id)
        obj[2].push(23)
        obj[3].push(context)
        obj[4].push(int_data)

        string_obj[0].push(string_data)

        return {int: obj, str: string_obj}
    }

    format_accept_bag_application_object = async (t, calculate_gas, ipfs_index) =>{
        var obj = [ /* set data */
            [20000, 13, 0],
            [], [],/* target objects */
            [], /* contexts */
            [] /* int_data */
        ]

        var string_obj = [[]]

        var target_id = t.application_item['job_id']
        var context = 37
        var int_data = t.application_item['id']

        var application_obj = {'accepted':true}

        var string_data = await this.get_object_ipfs_index(application_obj, calculate_gas, ipfs_index, t.id);

        obj[1].push(target_id)
        obj[2].push(23)
        obj[3].push(context)
        obj[4].push(int_data)

        string_obj[0].push(string_data)



        return {int: obj, str: string_obj}
    }

    format_direct_purchase_object = async (t, calculate_gas, ints, ipfs_index) => {
        var ints_clone = ints.slice()
        var depth_swap_obj = [
            [30000,16,0],
            [], [],/* target exchange ids */
            [], [],/* receivers */
            [],/* action */ 
            [],/* depth */
            []/* amount */
        ]

        console.log('stack_page', t.id, t)
        const storefront_item = t.storefront_item
        console.log('stack_page', 'storefront item', storefront_item)
        const object = storefront_item['ipfs']
        const purchase_options_tags = t.purchase_option_tags_array
        const t_id = t.id

        var obj = [/* send awwards */
            [30000, 7, 0],
            [object.target_receiver], [23],/* target receivers */
            [storefront_item['id']],/* awward contexts */
            
            [], [],/* exchange ids for first target receiver */
            [],/* amounts for first target receiver */
            [],/* depths for the first targeted receiver*/
        ]
        var string_obj = [[]]

        const selected_variant = t.selected_variant
        const price_data = selected_variant['price_data']
        console.log('stack_page', 'selected variant', price_data)
        for(var i=0; i<price_data.length; i++){
            var exchange = price_data[i]['id']
            var amount = this.get_amounts_to_be_paid(price_data[i]['amount'], t.purchase_unit_count).toString().toLocaleString('fullwide', {useGrouping:false})

            var exchange_obj = this.props.app_state.created_token_object_mapping[this.props.app_state.selected_e5][parseInt(exchange)]
            var swap_actions = this.get_exchange_swap_down_actions(amount, exchange_obj, ints_clone.concat([depth_swap_obj, obj]))
            for(var s=0; s<swap_actions.length; s++){
                depth_swap_obj[1].push(exchange)
                depth_swap_obj[2].push(23)
                depth_swap_obj[3].push(0)
                depth_swap_obj[4].push(53)
                depth_swap_obj[5/* action */].push(0)
                depth_swap_obj[6/* depth */].push(swap_actions[s])
                depth_swap_obj[7].push('1')
            }

            var transfer_actions = this.get_exchange_transfer_actions(amount)
            for(var f=0; f<transfer_actions.length; f++){
                obj[4].push(exchange)
                obj[5].push(23)
                obj[6].push(transfer_actions[f]['amount'])
                obj[7].push(transfer_actions[f]['depth'])
            }
        }

        
        for(var i=0; i<object.shipping_price_data.length; i++){
            var exchange = object.shipping_price_data[i]['id']
            var amount = (object.shipping_price_data[i]['amount']).toString().toLocaleString('fullwide', {useGrouping:false})

            var exchange_obj = this.props.app_state.created_token_object_mapping[this.props.app_state.selected_e5][parseInt(exchange)]
            var swap_actions = this.get_exchange_swap_down_actions(amount, exchange_obj, ints_clone.concat([depth_swap_obj, obj]))
            for(var s=0; s<swap_actions.length; s++){
                depth_swap_obj[1].push(exchange)
                depth_swap_obj[2].push(23)
                depth_swap_obj[3].push(0)
                depth_swap_obj[4].push(53)
                depth_swap_obj[5/* action */].push(0)
                depth_swap_obj[6/* depth */].push(swap_actions[s])
                depth_swap_obj[7].push('1')
            }

            var transfer_actions = this.get_exchange_transfer_actions(amount)
            for(var t=0; t<transfer_actions.length; t++){
                obj[4].push(exchange)
                obj[5].push(23)
                obj[6].push(transfer_actions[t]['amount'])
                obj[7].push(transfer_actions[t]['depth'])
            }
        }

        
        if(object != null && object.option_groups != null && object.option_groups.length > 0){
            var option_fees = this.get_final_purchase_option_fees(object.option_groups, purchase_options_tags)
            for(var i=0; i<option_fees.length; i++){
                var exchange = option_fees[i]['id']
                var amount = (option_fees[i]['amount']).toString().toLocaleString('fullwide', {useGrouping:false})

                var exchange_obj = this.props.app_state.created_token_object_mapping[this.props.app_state.selected_e5][parseInt(exchange)]
                var swap_actions = this.get_exchange_swap_down_actions(amount, exchange_obj, ints_clone.concat([depth_swap_obj, obj]))
                for(var s=0; s<swap_actions.length; s++){
                    depth_swap_obj[1].push(exchange)
                    depth_swap_obj[2].push(23)
                    depth_swap_obj[3].push(0)
                    depth_swap_obj[4].push(53)
                    depth_swap_obj[5/* action */].push(0)
                    depth_swap_obj[6/* depth */].push(swap_actions[s])
                    depth_swap_obj[7].push('1')
                }

                var transfer_actions = this.get_exchange_transfer_actions(amount)
                for(var t=0; t<transfer_actions.length; t++){
                    obj[4].push(exchange)
                    obj[5].push(23)
                    obj[6].push(transfer_actions[t]['amount'])
                    obj[7].push(transfer_actions[t]['depth'])
                }
            }
        }

        var purchase_object = {'shipping_detail':t.fulfilment_location, 'custom_specifications':t.custom_specifications, 'variant_id':selected_variant['variant_id'], 'purchase_unit_count':t.purchase_unit_count, 'sender_account':this.props.app_state.user_account_id[this.props.app_state.selected_e5], 'signature_data':Date.now(), 'sender_address':this.format_address(this.props.app_state.accounts[this.props.app_state.selected_e5].address, this.props.app_state.selected_e5)}
        
        var string_data = await this.get_object_ipfs_index(purchase_object, calculate_gas, ipfs_index, t_id);

        console.log('stack_page', 'string_data', string_data)

        string_obj[0].push(string_data)

        return {int: obj, str: string_obj, depth: depth_swap_obj}
    }

    get_final_purchase_option_fees(options, purchase_options_tags){
        var price_obj = {}
        console.log('stack_page','purchase_options_tags', purchase_options_tags)
        for(var i=0; i<purchase_options_tags.length; i++){
            var tag_obj = purchase_options_tags[i]
            var selected_items = []
            for(var j=0; j<tag_obj['e'][2].length; j++){
                var selected_item_pos = tag_obj['e'][2][j]
                if(selected_item_pos != 0){
                    selected_items.push(selected_item_pos-1)
                }
            }
            for(var k=0; k<selected_items.length; k++){
                var selected_pos = selected_items[k]
                var option_prices = options[i]['options'][selected_pos]['price']
                option_prices.forEach(price => {
                    if(price_obj[price['id']] == null){
                        price_obj[price['id']] = bigInt(0)
                    }
                    price_obj[price['id']] = bigInt(price_obj[price['id']]).plus(price['amount'])
                });
            } 
        }

        var return_array = []
        for (const exchange in price_obj) {
            if (price_obj.hasOwnProperty(exchange)) {
                return_array.push({'id':exchange, 'amount':price_obj[exchange]})
            }
        }

        return return_array
    }

    get_amounts_to_be_paid(amount, count){
        return bigInt(amount).multiply(bigInt(count))
    }

    format_clear_purchase_object = async (t, calculate_gas, ipfs_index) =>{
        var obj = [ /* set data */
            [20000, 13, 0],
            [], [],/* target objects */
            [], /* contexts */
            [] /* int_data */
        ]

        var string_obj = [[]]

        for(var i=0; i<t.items_to_clear.length; i++){
            var target_id = t.items_to_clear[i].order_storefront['id']
            var context = 38
            var int_data = 0

            var string_object = {
                'id':t.items_to_clear[i].id,
                'variant_id':t.items_to_clear[i].order_data['variant_id'], 
                'purchase_unit_count':t.items_to_clear[i].order_data['purchase_unit_count'], 
                'sender_address':t.items_to_clear[i].order_data['sender_address'], 
                'sender_account':t.items_to_clear[i].order_data['sender_account'],
                'signature_data':t.items_to_clear[i].order_data['signature_data'],
                'signature': t.items_to_clear[i].received_signature
            }
            var string_data = await this.get_object_ipfs_index(string_object, calculate_gas, ipfs_index, t.items_to_clear[i].id);

            obj[1].push(target_id)
            obj[2].push(23)
            obj[3].push(context)
            obj[4].push(int_data)

            string_obj[0].push(string_data)
        }

        return {int: obj, str: string_obj}
    }

    format_bag_comment_object = async (t, calculate_gas, ipfs_index) => {
        var obj = [ /* set data */
            [20000, 13, 0],
            [], [],/* target objects */
            [], /* contexts */
            [] /* int_data */
        ]

        var string_obj = [[]]

        for(var i=0; i<t.messages_to_deliver.length; i++){
            // var target_id = t.messages_to_deliver[i]['id']
            // var context = 35
            // var int_data = 0

            var target_id = 17/* shadow_object_container */
            var context = t.messages_to_deliver[i]['id']
            var int_data = parseInt(t.messages_to_deliver[i]['e5'].replace('E',''))

            var string_data = await this.get_object_ipfs_index(t.messages_to_deliver[i], calculate_gas, ipfs_index, t.messages_to_deliver[i]['message_id']);

            obj[1].push(target_id)
            obj[2].push(23)
            obj[3].push(context)
            obj[4].push(int_data)

            string_obj[0].push(string_data)
        }

        return {int: obj, str: string_obj}
    }

    format_storefront_comment_object = async (t, calculate_gas, ipfs_index) => {
        var obj = [ /* set data */
            [20000, 13, 0],
            [], [],/* target objects */
            [], /* contexts */
            [] /* int_data */
        ]

        var string_obj = [[]]

        for(var i=0; i<t.messages_to_deliver.length; i++){
            // var target_id = t.messages_to_deliver[i]['id']
            // var context = 35
            // var int_data = 0

            var target_id = 17/* shadow_object_container */
            var context = t.messages_to_deliver[i]['id']
            var int_data = parseInt(t.messages_to_deliver[i]['e5'].replace('E',''))

            var string_data = await this.get_object_ipfs_index(t.messages_to_deliver[i], calculate_gas, ipfs_index, t.messages_to_deliver[i]['message_id']);

            obj[1].push(target_id)
            obj[2].push(23)
            obj[3].push(context)
            obj[4].push(int_data)

            string_obj[0].push(string_data)
        }

        return {int: obj, str: string_obj}
    }

    format_contractor_object(t){
        var obj = [/* custom object */
            [10000, 0, 0, 0, 0/* 4 */, 0, 0, 0, 0, 26, 0]
        ]
        return obj
    }

    format_job_request_object = async (t, calculate_gas, now, ipfs_index) => {
        var obj = [ /* set data */
            [20000, 13, 0],
            [], [],/* target objects */
            [], /* contexts */
            [] /* int_data */
        ]

        var string_obj = [[]]

        var target_id = t.contractor_item['id']
        var context = 38
        var int_data = now

        var application_obj = {'price_data':t.price_data, /* 'picked_contract_id':t.picked_contract['id'], */ 'application_expiry_time':t.application_expiry_time, 'applicant_id':this.props.app_state.user_account_id[this.props.app_state.selected_e5], 'pre_post_paid_option':t.pre_post_paid_option, 'title_description':t.entered_title_text, 'entered_images':t.entered_image_objects, 'job_request_id':int_data, 'entered_pdfs':t.entered_pdf_objects}

        var string_data = await this.get_object_ipfs_index(application_obj, calculate_gas, ipfs_index, t.id);

        obj[1].push(target_id)
        obj[2].push(23)
        obj[3].push(context)
        obj[4].push(int_data)

        string_obj[0].push(string_data)

        return {int: obj, str: string_obj}
    }

    format_accept_job_request_object = async (t, calculate_gas, ipfs_index) =>{
        var obj = [ /* set data */
            [20000, 13, 0],
            [], [],/* target objects */
            [], /* contexts */
            [] /* int_data */
        ]

        var string_obj = [[]]

        var target_id = t.contractor_object['id']
        var context = 39
        var int_data = t.request_item['job_request_id']

        var application_obj = t.picked_contract['id'].toString()

        // var string_data = await this.get_object_ipfs_index(application_obj, calculate_gas, ipfs_index, t.id);
        var string_data = application_obj

        obj[1].push(target_id)
        obj[2].push(23)
        obj[3].push(context)
        obj[4].push(int_data)

        string_obj[0].push(string_data)



        return {int: obj, str: string_obj}
    }

    format_job_request_comment_object = async (t, calculate_gas, ipfs_index) =>{
        var obj = [ /* set data */
            [20000, 13, 0],
            [], [],/* target objects */
            [], /* contexts */
            [] /* int_data */
        ]

        var string_obj = [[]]

        for(var i=0; i<t.messages_to_deliver.length; i++){
            // var target_id = t.messages_to_deliver[i]['contractor_id']
            // var context = t.messages_to_deliver[i]['id']
            // var int_data = 0

            var target_id = 17/* shadow_object_container */
            var context = t.messages_to_deliver[i]['contractor_id']
            var int_data = t.messages_to_deliver[i]['id']

            var string_data = await this.get_object_ipfs_index(t.messages_to_deliver[i], calculate_gas, ipfs_index, t.messages_to_deliver[i]['message_id']);

            obj[1].push(target_id)
            obj[2].push(23)
            obj[3].push(context)
            obj[4].push(int_data)

            string_obj[0].push(string_data)
        }

        return {int: obj, str: string_obj}
    }

    format_alias_object = async (t, calculate_gas) =>{
        var obj = [ /* add data */
            [20000, 13, 0],
            [11], [23],/* 11(alias_obj_id) */
            [], /* contexts */
            [] /* int_data */
        ]

        var string_obj = [[]]

        var context = this.props.app_state.user_account_id[this.props.app_state.selected_e5]
        var int_data = Date.now()

        // var string_data = await this.get_object_ipfs_index(t.alias, calculate_gas);
        var string_data = t.alias //it doesnt make sense to store alias data as hashes when the alias character limit is less than hash size.

        obj[3].push(context)
        obj[4].push(int_data)

        string_obj[0].push(string_data)

        return {int: obj, str: string_obj}
    }

    format_unalias_object = async (t, calculate_gas) =>{
        var obj = [ /* add data */
            [20000, 13, 0],
            [11], [23],/* 11(alias_obj_id) */
            [], /* contexts */
            [] /* int_data */
        ]

        var string_obj = [[]]

        var context = this.props.app_state.user_account_id[this.props.app_state.selected_e5]
        var int_data = Date.now()

        // var string_data = await this.get_object_ipfs_index(t.alias, calculate_gas);
        var string_data = t.alias

        obj[3].push(context)
        obj[4].push(int_data)

        string_obj[0].push(string_data)

        return {int: obj, str: string_obj}
    }

    format_realias_object = async (t, calculate_gas) =>{
        var obj = [ /* add data */
            [20000, 13, 0],
            [11], [23],/* 11(alias_obj_id) */
            [], /* contexts */
            [] /* int_data */
        ]

        var string_obj = [[]]

        var context = this.props.app_state.user_account_id[this.props.app_state.selected_e5]
        var int_data = Date.now()

        // var string_data = await this.get_object_ipfs_index(t.alias, calculate_gas);
        var string_data = t.alias

        obj[3].push(context)
        obj[4].push(int_data)

        string_obj[0].push(string_data)

        return {int: obj, str: string_obj}
    }

    format_edit_object = async (t, calculate_gas, ipfs_index) => {
        var metadata_action = [ /* set metadata */
            [20000, 1, 0],
            [], [],/* target objects */
            []/* contexts */, 
            []/* int_data */
        ]
        var metadata_strings = [ [] ]

        metadata_action[1].push(t.object_id)
        metadata_action[2].push(23)
        metadata_action[3].push(0)
        metadata_action[4].push(0)
        
        var ipfs_obj = await this.get_object_ipfs_index(t, calculate_gas, ipfs_index, t.id);
        metadata_strings[0].push(ipfs_obj.toString())

        return {metadata_action: metadata_action, metadata_strings:metadata_strings}
    }

    format_award_object = async (t, calculate_gas, ints, ipfs_index) => {
        var ints_clone = ints.slice()
        // var author = t.post_item['event'].returnValues.p5
        var author = t.award_target_account_or_address_on_my_e5
        var post_id = t.post_item['id'];
        var post_e5 = t.post_item['e5']

        if(t.post_item['ipfs'].purchase_recipient != null){
            author = t.post_item['ipfs'].purchase_recipient
        }

        var depth_swap_obj = [
            [30000,16,0],
            [], [],/* target exchange ids */
            [], [],/* receivers */
            [],/* action */ 
            [],/* depth */
            []/* amount */
        ]

        var create_account_obj = [/* custom object */
            [10000, 0, 0, 0, 0/* 4 */, 0, 0, 0, 0, 29 /* 29(account_obj_id) */, 0]
        ]

        const isEthereumAddress = (input) => /^0x[a-fA-F0-9]{40}$/.test(input);
        const final_receiver_string = author.toString().toLocaleString('fullwide', {useGrouping:false})
        var obj = [/* send awwards */
            [30000, 7, 0],
            [author.toString().toLocaleString('fullwide', {useGrouping:false})], [23],/* target receivers */
            [post_id.toString().toLocaleString('fullwide', {useGrouping:false})],/* awward contexts */
            
            [5], [23],/* exchange ids for first target receiver */
            [t.award_amount.toString().toLocaleString('fullwide', {useGrouping:false})],/* amounts for first target receiver */
            [0],/* depths for the first targeted receiver*/
        ]
        var should_include_create_recipient = false;
        if(isEthereumAddress(final_receiver_string)){
            ints_clone.push(create_account_obj)
            obj = [/* send awwards */
                [30000, 7, 0],
                [ints_clone.length-1], [35],/* target receivers */
                [post_id.toString().toLocaleString('fullwide', {useGrouping:false})],/* awward contexts */
                
                [5], [23],/* exchange ids for first target receiver */
                [t.award_amount.toString().toLocaleString('fullwide', {useGrouping:false})],/* amounts for first target receiver */
                [0],/* depths for the first targeted receiver*/
            ]
            should_include_create_recipient = true
        }
        var string_obj = [[]]

        for(var i=0; i<t.price_data.length; i++){
            var exchange = t.price_data[i]['id'].toString().toLocaleString('fullwide', {useGrouping:false})
            var amount = t.price_data[i]['amount'].toString().toLocaleString('fullwide', {useGrouping:false})

            var exchange_obj = this.props.app_state.created_token_object_mapping[this.props.app_state.selected_e5][parseInt(exchange)]
            var swap_actions = this.get_exchange_swap_down_actions(amount, exchange_obj, ints_clone.concat([depth_swap_obj, obj]))
            for(var s=0; s<swap_actions.length; s++){
                depth_swap_obj[1].push(exchange)
                depth_swap_obj[2].push(23)
                depth_swap_obj[3].push(0)
                depth_swap_obj[4].push(53)
                depth_swap_obj[5/* action */].push(0)
                depth_swap_obj[6/* depth */].push(swap_actions[s])
                depth_swap_obj[7].push('1')
            }

            var transfer_actions = this.get_exchange_transfer_actions(amount)
            for(var f=0; f<transfer_actions.length; f++){
                obj[4].push(exchange)
                obj[5].push(23)
                obj[6].push(transfer_actions[f]['amount'])
                obj[7].push(transfer_actions[f]['depth'])
            }
        }

        var award_object = {'selected_tier_object':t.selected_tier_object, 'post_id':post_id, 'multiplier':t.multiplier, 'custom_amounts':t.price_data, 'entered_message':t.entered_message_text, 'e5_id':post_id+post_e5}
        
        var string_data = await this.get_object_ipfs_index(award_object, calculate_gas, ipfs_index, t.id);
        string_obj[0].push(string_data)

        return {int: obj, str: string_obj, depth: depth_swap_obj, should_include_create_recipient, final_receiver_string, create_account_obj}
    }

    format_depthmint_object(t){
        var obj = [/* depth_mint\swap up\swap down tokens [2(depth_auth_mint), 1(swap_up), 0(swap_down)] */
            [30000,16,0],
            [], [],/* target exchange ids */
            [], [],/* receivers */
            [],/* action */ 
            [],/* depth */
            []/* amount */
        ]

        for(var i=0; i<t.authmint_actions.length; i++){
            obj[1].push(t.token_item['id'].toString().toLocaleString('fullwide', {useGrouping:false}))
            obj[2].push(23)

            var receiver = t.authmint_actions[i]['recipient']
            var receiver_type = 23
            if(receiver == 53){
                receiver_type = 53
            }
            obj[3].push(receiver.toString().toLocaleString('fullwide', {useGrouping:false}))
            obj[4].push(receiver_type)

            obj[5].push(2)
            
            obj[6].push(0)
            obj[7].push(t.authmint_actions[i]['amount'].toString().toLocaleString('fullwide', {useGrouping:false}))
        }

        return obj
    }

    format_stage_royalty_object = async(t, calculate_gas, ipfs_index) => {
        var obj = [ /* add data */
            [20000, 13, 0],
            [12], [23],/* 12(stage_royalty_id) */
            [], /* contexts */
            [] /* int_data */
        ]
        var string_obj = [[]]

        var context = t.token_item['id']
        var int_data = Date.now()

        var string_data = await this.get_object_ipfs_index(t.payout_data, calculate_gas, ipfs_index, t.id);

        obj[3].push(context)
        obj[4].push(int_data)

        string_obj[0].push(string_data)

        return {int: obj, str: string_obj}
    }

    format_make_royalty_payout_object= async (t, calculate_gas, ipfs_index) => {
        var transfers_obj = [/* send tokens to another account */
            [30000, 1, 0],
            [], [],/* exchanges */
            [], [],/* receivers */
            [],/* amounts */
            []/* depths */
        ]

        var transfers_record = [ /* add data */
            [20000, 13, 0],
            [13], [23],/* 13(record_royalty_payout_id) */
            [], /* contexts */
            [] /* int_data */
        ]

        var batches = t.selected_batches
        var payout_amount = t.staging_data['payout_amount']
        var total_held_shares = t.staging_data['total_held_shares']
        var transacted_batches = []
        batches.forEach(batch => {
            transacted_batches.push(batch['id'])
            batch['data'].forEach(transaction => {
                var transaction_receiver = transaction['account']
                var transaction_payout_info = this.get_transaction_payout_info(transaction, t.token_item, payout_amount, total_held_shares)

                transaction_payout_info.forEach(item => {
                    transfers_obj[1].push(item['token_id'].toString().toLocaleString('fullwide', {useGrouping:false}))
                    transfers_obj[2].push(23)
                    transfers_obj[3].push(transaction_receiver)
                    transfers_obj[4].push(23)
                    transfers_obj[5].push(item['amount'].toString().toLocaleString('fullwide', {useGrouping:false}))
                    transfers_obj[6].push(item['depth'].toString().toLocaleString('fullwide', {useGrouping:false}))
                });
            });
        });


        var context = t.token_item['id']
        var int_data = t.staging_data['payout_id']

        var string_obj = [[]]
        var payout_record_info = {'payout_id':t.staging_data['payout_id'], 'id':Date.now(), 'transacted_batches':transacted_batches}

        var string_data = await this.get_object_ipfs_index(payout_record_info, calculate_gas, ipfs_index, t.id);
        string_obj[0].push(string_data)

        transfers_record[3].push(context)
        transfers_record[4].push(int_data)

        return {transfers_obj: transfers_obj, str: string_obj, transfers_record: transfers_record}
    }

    get_transaction_payout_info(transaction, token_exchange, payout_amount,total_held_shares){
        var receivers_recorded_balance = transaction['balance']
        var buy_tokens = [].concat(token_exchange['data'][3])
        var buy_amounts = [].concat(token_exchange['data'][4])
        var buy_amounts_depths = [].concat(token_exchange['data'][5])
        var transfers = []
        for(var i=0; i<buy_tokens.length; i++){
            var token_id = buy_tokens[i]
            var amount = this.calculate_payout_amount_for_individual_shareholder(buy_amounts[i],total_held_shares, receivers_recorded_balance, payout_amount)
            var depth = buy_amounts_depths[i]
            transfers.push({'token_id':token_id, 'amount':amount, 'depth':depth})
        }
        return transfers
    }

    calculate_payout_amount_for_individual_shareholder(price, total_shares, shareholder_amount, payout_amount){
        var total_amount_of_token_being_distributed =  bigInt(price).multiply(payout_amount);
        return bigInt(total_amount_of_token_being_distributed).multiply(bigInt(shareholder_amount)).divide(total_shares)
    }

    get_message_transfers(t, ints){
        var transfers_obj = [/* send tokens to another account */
            [30000, 1, 0],
            [], [],/* exchanges */
            [], [],/* receivers */
            [],/* amounts */
            []/* depths */
        ]
        const create_account_array = []
        const create_address_array = []
        var create_account_pos = ints.length
        for(var i=0; i<t.messages_to_deliver.length; i++){
            if(t.messages_to_deliver[i]['award_amount'] != 0 && t.messages_to_deliver[i]['award_receiver'] != null){
                var award_receiver = t.messages_to_deliver[i]['award_receiver'].toString().toLocaleString('fullwide', {useGrouping:false})
                var award_amount = t.messages_to_deliver[i]['award_amount'].toString().toLocaleString('fullwide', {useGrouping:false})

                transfers_obj[1].push('5')
                transfers_obj[2].push(23)

                const isEthereumAddress = (input) => /^0x[a-fA-F0-9]{40}$/.test(input);

                if(isEthereumAddress(award_receiver)){
                    //receiver doesnt have an account in my e5, so I need to create one for them
                    var obj = [/* custom object */
                        [10000, 0, 0, 0, 0/* 4 */, 0, 0, 0, 0, 29 /* 29(account_obj_id) */, 0]
                    ]
                    create_account_array.push(obj)
                    create_address_array.push(award_receiver)

                    transfers_obj[3].push(create_account_pos)
                    transfers_obj[4].push(35)
                    create_account_pos++
                }else{
                    transfers_obj[3].push(award_receiver)
                    transfers_obj[4].push(23)
                }
                transfers_obj[5].push(award_amount)
                transfers_obj[6].push(0)
            }
        }
        var transfers_included = (transfers_obj[1].length > 0)
        return {transfers_obj, create_account_array, create_address_array, transfers_included}
    }

    format_pay_upcoming_subscriptions(t){
        var obj = [/* ✔️pay subscription */
            [30000, 2, 0],
            [], [],/* target subscription ids */
            []/* subscription buy amounts */
        ];

        var time_units_to_pay = t.time_units_to_pay
        var subscriptions = t.subscriptions

        for(var i=0; i<subscriptions.length; i++){
            obj[1].push(subscriptions[i].toString().toLocaleString('fullwide', {useGrouping:false}))
            obj[2].push(23)
            obj[3].push(time_units_to_pay[i].toString().toLocaleString('fullwide', {useGrouping:false}))
        }

        return obj
    }

    format_indexing_post_item(t, should_index_title, target_stack_index, target_type){
        var transaction_obj = [ /* set data */
            [20000, 13, 0],
            [], [],/* target objects */
            [], /* contexts */
            [] /* int_data */
        ]
        var string_obj = [[]]

        for(var i=0; i<t.entered_indexing_tags.length; i++){
            transaction_obj[1].push(target_stack_index)
            transaction_obj[2].push(35)
            transaction_obj[3].push(20/* 20(tag_registry) */)
            transaction_obj[4].push(target_type)

            string_obj[0].push(t.entered_indexing_tags[i].toString())
        }

        if(should_index_title){
            transaction_obj[1].push(target_stack_index)
            transaction_obj[2].push(35)
            transaction_obj[3].push(20/* 20(tag_registry) */)
            transaction_obj[4].push(target_type)

            string_obj[0].push(t.entered_title_text.toString())
        }


        var main_index = t.device_country
        if(t.content_channeling_setting == this.props.app_state.loc['1233']/* 'international' */){
            main_index = this.props.app_state.loc['1233']/* 'international' */
        }
        else if(t.content_channeling_setting == this.props.app_state.loc['1232']/* 'language' */){
            main_index = this.props.app_state.loc['1232']/* 'language' */
        }
        transaction_obj[1].push(target_stack_index)
        transaction_obj[2].push(35)
        transaction_obj[3].push(20/* 20(tag_registry) */)
        transaction_obj[4].push(target_type)

        string_obj[0].push(main_index)



        //index city if set
        var city = t.selected_device_city
        if(city != '' && city != null){
            transaction_obj[1].push(target_stack_index)
            transaction_obj[2].push(35)
            transaction_obj[3].push(20/* 20(tag_registry) */)
            transaction_obj[4].push(target_type)

            string_obj[0].push(city)
        }


        var audio_type = t.audio_type
        if(audio_type != null){
            transaction_obj[1].push(target_stack_index)
            transaction_obj[2].push(35)
            transaction_obj[3].push(20/* 20(tag_registry) */)
            transaction_obj[4].push(target_type)

            string_obj[0].push(audio_type)
        }



        return {int: transaction_obj, str: string_obj}
        
    }

    format_audio_object(t){
        var obj = [/* custom object */
            [10000, 0, 0, 0, 0/* 4 */, 0, 0, 0, 0, 19/* 19(audio_object) */, 0]
        ]
        return obj
    }

    format_audiopost_comment_object = async (t, calculate_gas, ipfs_index) =>{
        var obj = [ /* set data */
            [20000, 13, 0],
            [], [],/* target objects */
            [], /* contexts */
            [] /* int_data */
        ]

        var string_obj = [[]]

        for(var i=0; i<t.messages_to_deliver.length; i++){
            // var target_id = t.messages_to_deliver[i]['id']
            // var context = 35
            // var int_data = 0

            var target_id = 17/* shadow_object_container */
            var context = t.messages_to_deliver[i]['id']
            var int_data = parseInt(t.messages_to_deliver[i]['e5'].replace('E',''))

            var string_data = await this.get_object_ipfs_index(t.messages_to_deliver[i], calculate_gas, ipfs_index, t.messages_to_deliver[i]['message_id']);

            obj[1].push(target_id)
            obj[2].push(23)
            obj[3].push(context)
            obj[4].push(int_data)

            string_obj[0].push(string_data)
        }

        return {int: obj, str: string_obj}
    }

    format_buy_album_songs = async (t, calculate_gas, ints, ipfs_index) => {
        var ints_clone = ints.slice()
        var purchase_recipient = t.album['ipfs'].purchase_recipient
        var post_id = t.album['id'];
        var sale_type = this.get_album_sale_type(t)

        var depth_swap_obj = [
            [30000,16,0],
            [], [],/* target exchange ids */
            [], [],/* receivers */
            [],/* action */ 
            [],/* depth */
            []/* amount */
        ]
        var transfers_obj = [/* send tokens to another account */
            [30000, 1, 0],
            [], [],/* exchanges */
            [], [],/* receivers */
            [],/* amounts */
            []/* depths */
        ]
        var obj = [ /* add data */
            [20000, 13, 0],
            [21], [23],/* 21(album_sale) */
            [post_id], /* contexts */
            [sale_type] /* int_data */
        ]

        var string_obj = [[]]

        var exchanges_used = t.exchanges_used
        var exchange_amounts = t.exchange_amounts

        for(var i=0; i<exchanges_used.length; i++){
            var exchange = exchanges_used[i]
            var amount = (exchange_amounts[exchange]).toString().toLocaleString('fullwide', {useGrouping:false})

            var exchange_obj = this.props.app_state.created_token_object_mapping[this.props.app_state.selected_e5][parseInt(exchange)]

            var swap_actions = this.get_exchange_swap_down_actions(amount, exchange_obj, ints_clone.concat([depth_swap_obj, transfers_obj]))
            for(var s=0; s<swap_actions.length; s++){
                depth_swap_obj[1].push(exchange)
                depth_swap_obj[2].push(23)
                depth_swap_obj[3].push(0)
                depth_swap_obj[4].push(53)
                depth_swap_obj[5/* action */].push(0)
                depth_swap_obj[6/* depth */].push(swap_actions[s])
                depth_swap_obj[7].push('1')
            }

            var transfer_actions = this.get_exchange_transfer_actions(amount)
            for(var u=0; u<transfer_actions.length; u++){
                transfers_obj[1].push(exchange.toString().toLocaleString('fullwide', {useGrouping:false}))
                transfers_obj[2].push(23)
                transfers_obj[3].push(purchase_recipient.toString().toLocaleString('fullwide', {useGrouping:false}))
                transfers_obj[4].push(23)
                transfers_obj[5].push(transfer_actions[u]['amount'])
                transfers_obj[6].push(transfer_actions[u]['depth'])
            }
        }


        var award_object = {'sale_type':sale_type, 'songs_included':this.get_selected_song_ids(t)}
        
        var string_data = await this.get_object_ipfs_index(award_object, calculate_gas, ipfs_index, t.id);
        string_obj[0].push(string_data)


        return {depth_swap_obj:depth_swap_obj, transfers_obj:transfers_obj, obj:obj, string_obj:string_obj}
    }

    get_album_sale_type(t){
        var selected_tracks = t.selected_tracks

        var object = t.album
        var all_tracks = object['ipfs'].songs
        if(selected_tracks.length == all_tracks.length && object['ipfs'].price_data.length > 0){
            //buying entire album
            return 0
        }else{
            //buying individual tracks
            return 1
        }
    }

    get_selected_song_ids(t){
        var selected_tracks = t.selected_tracks
        var ids = []
        selected_tracks.forEach(track => {
            ids.push(track['song_id'])
        });
        return ids
    }

    get_songs_and_albums_to_add(pushed_txs){
        var albums = []
        var tracks = []
        pushed_txs.forEach(transaction => {
            if(transaction.type == this.props.app_state.loc['2962']/* 'buy-album' */){
                albums.push(transaction.album['id'])
                
                var selected_tracks = transaction.selected_tracks
                selected_tracks.forEach(track => {
                    tracks.push(track['song_id'])
                });
            }
        });

        return {albums:albums, tracks:tracks}
    }

    format_video_object(t){
        var obj = [/* custom object */
            [10000, 0, 0, 0, 0/* 4 */, 0, 0, 0, 0, 20/* 20(video_object) */, 0]
        ]
        return obj
    }

    format_videopost_comment_object = async (t, calculate_gas, ipfs_index) =>{
        var obj = [ /* set data */
            [20000, 13, 0],
            [], [],/* target objects */
            [], /* contexts */
            [] /* int_data */
        ]

        var string_obj = [[]]

        for(var i=0; i<t.messages_to_deliver.length; i++){
            // var target_id = t.messages_to_deliver[i]['id']
            // var context = 35
            // var int_data = 0

            var target_id = 17/* shadow_object_container */
            var context = t.messages_to_deliver[i]['id']
            var int_data = parseInt(t.messages_to_deliver[i]['e5'].replace('E',''))

            var string_data = await this.get_object_ipfs_index(t.messages_to_deliver[i], calculate_gas, ipfs_index, t.messages_to_deliver[i]['message_id']);

            obj[1].push(target_id)
            obj[2].push(23)
            obj[3].push(context)
            obj[4].push(int_data)

            string_obj[0].push(string_data)
        }

        return {int: obj, str: string_obj}
    }

    format_buy_videopost_videos = async (t, calculate_gas, ints, ipfs_index) => {
        var ints_clone = ints.slice()
        var purchase_recipient = t.videopost['event'].returnValues.p5
        var post_id = t.videopost['id'];
        var sale_type = this.get_video_sale_type(t)

        var depth_swap_obj = [
            [30000,16,0],
            [], [],/* target exchange ids */
            [], [],/* receivers */
            [],/* action */ 
            [],/* depth */
            []/* amount */
        ]
        var transfers_obj = [/* send tokens to another account */
            [30000, 1, 0],
            [], [],/* exchanges */
            [], [],/* receivers */
            [],/* amounts */
            []/* depths */
        ]
        var obj = [ /* add data */
            [20000, 13, 0],
            [21], [23],/* 21(album_sale) */
            [post_id], /* contexts */
            [sale_type] /* int_data */
        ]

        var string_obj = [[]]

        var exchanges_used = t.exchanges_used
        var exchange_amounts = t.exchange_amounts

        for(var i=0; i<exchanges_used.length; i++){
            var exchange = exchanges_used[i]
            var amount = (exchange_amounts[exchange]).toString().toLocaleString('fullwide', {useGrouping:false})

            var exchange_obj = this.props.app_state.created_token_object_mapping[this.props.app_state.selected_e5][parseInt(exchange)]

            var swap_actions = this.get_exchange_swap_down_actions(amount, exchange_obj, ints_clone.concat([depth_swap_obj, transfers_obj]))
            for(var s=0; s<swap_actions.length; s++){
                depth_swap_obj[1].push(exchange)
                depth_swap_obj[2].push(23)
                depth_swap_obj[3].push(0)
                depth_swap_obj[4].push(53)
                depth_swap_obj[5/* action */].push(0)
                depth_swap_obj[6/* depth */].push(swap_actions[s])
                depth_swap_obj[7].push('1')
            }

            var transfer_actions = this.get_exchange_transfer_actions(amount)
            for(var u=0; u<transfer_actions.length; u++){
                transfers_obj[1].push(exchange.toString().toLocaleString('fullwide', {useGrouping:false}))
                transfers_obj[2].push(23)
                transfers_obj[3].push(purchase_recipient.toString().toLocaleString('fullwide', {useGrouping:false}))
                transfers_obj[4].push(23)
                transfers_obj[5].push(transfer_actions[u]['amount'])
                transfers_obj[6].push(transfer_actions[u]['depth'])
            }
        }


        var award_object = {'sale_type':sale_type, 'videos_included':this.get_selected_video_ids(t)}
        
        var string_data = await this.get_object_ipfs_index(award_object, calculate_gas, ipfs_index, t.id);
        string_obj[0].push(string_data)


        return {depth_swap_obj:depth_swap_obj, transfers_obj:transfers_obj, obj:obj, string_obj:string_obj}
    }

    get_video_sale_type(t){
        var selected_videos = t.selected_videos

        var object = t.videopost
        var all_videos = object['ipfs'].videos
        if(selected_videos.length == all_videos.length && object['ipfs'].price_data.length > 0){
            //buying entire videopost
            return 0
        }else{
            //buying individual video
            return 1
        }
    }

    get_selected_video_ids(t){
        var selected_videos = t.selected_videos
        var ids = []
        selected_videos.forEach(video => {
            ids.push(video['video_id'])
        });
        return ids
    }

    get_videos_to_add(pushed_txs){
        var videoposts = []
        var videos = []
        pushed_txs.forEach(transaction => {
            if(transaction.type == this.props.app_state.loc['a2962a']/* 'buy-video' */){
                videoposts.push(transaction.videopost['id'])
                
                var selected_videos = transaction.selected_videos
                selected_videos.forEach(video => {
                    videos.push(video['video_id'])
                });
            }
        });

        return {videoposts:videoposts, videos:videos}
    }

    format_nitro_object(t){
        var obj = [/* custom object */
            [10000, 0, 0, 0, 0/* 4 */, 0, 0, 0, 0, 21/* 21(nitro_object) */, 0]
        ]
        return obj
    }

    format_nitropost_comment_object = async (t, calculate_gas, ipfs_index) =>{
        var obj = [ /* set data */
            [20000, 13, 0],
            [], [],/* target objects */
            [], /* contexts */
            [] /* int_data */
        ]

        var string_obj = [[]]

        for(var i=0; i<t.messages_to_deliver.length; i++){
            // var target_id = t.messages_to_deliver[i]['id']
            // var context = 35
            // var int_data = 0

            var target_id = 17/* shadow_object_container */
            var context = t.messages_to_deliver[i]['id']
            var int_data = parseInt(t.messages_to_deliver[i]['e5'].replace('E',''))

            var string_data = await this.get_object_ipfs_index(t.messages_to_deliver[i], calculate_gas, ipfs_index, t.messages_to_deliver[i]['message_id']);

            obj[1].push(target_id)
            obj[2].push(23)
            obj[3].push(context)
            obj[4].push(int_data)

            string_obj[0].push(string_data)
        }

        return {int: obj, str: string_obj}
    }

    format_buy_nitro_object = (t, ints) => {
        var ints_clone = ints.slice()
        var object = t.nitro_object
        var node_details = this.props.app_state.nitro_node_details[object['e5_id']]
        var purchase_recipient = node_details['target_storage_purchase_recipient_account']
        var post_id = t.nitro_object['id'];

        var depth_swap_obj = [
            [30000,16,0],
            [], [],/* target exchange ids */
            [], [],/* receivers */
            [],/* action */ 
            [],/* depth */
            []/* amount */
        ]
        var transfers_obj = [/* send tokens to another account */
            [30000, 1, 0],
            [], [],/* exchanges */
            [], [],/* receivers */
            [],/* amounts */
            []/* depths */
        ]
        var obj = [ /* add data */
            [20000, 13, 0],
            [23], [23],/* 23(nitro node storage sale) */
            [post_id], /* contexts */
            [purchase_recipient] /* int_data */
        ]

        var string_obj = [[]]

        var data = t.amounts_to_transfer

        for(var i=0; i<data.length; i++){
            var exchange = data[i]['exchange']
            var amount = (data[i]['amount']).toString().toLocaleString('fullwide', {useGrouping:false})

            var exchange_obj = this.props.app_state.created_token_object_mapping[this.props.app_state.selected_e5][parseInt(exchange)]

            var swap_actions = this.get_exchange_swap_down_actions(amount, exchange_obj, ints_clone.concat([depth_swap_obj, transfers_obj]))
            for(var s=0; s<swap_actions.length; s++){
                depth_swap_obj[1].push(exchange)
                depth_swap_obj[2].push(23)
                depth_swap_obj[3].push(0)
                depth_swap_obj[4].push(53)
                depth_swap_obj[5/* action */].push(0)
                depth_swap_obj[6/* depth */].push(swap_actions[s])
                depth_swap_obj[7].push('1')
            }

            var transfer_actions = this.get_exchange_transfer_actions(amount)
            for(var u=0; u<transfer_actions.length; u++){
                transfers_obj[1].push(exchange.toString().toLocaleString('fullwide', {useGrouping:false}))
                transfers_obj[2].push(23)
                transfers_obj[3].push(purchase_recipient.toString().toLocaleString('fullwide', {useGrouping:false}))
                transfers_obj[4].push(23)
                transfers_obj[5].push(transfer_actions[u]['amount'])
                transfers_obj[6].push(transfer_actions[u]['depth'])
            }
        }
        
        var string_data = 'storage'
        string_obj[0].push(string_data)


        return {depth_swap_obj:depth_swap_obj, transfers_obj:transfers_obj, obj:obj, string_obj:string_obj}
    }

    format_admin_object = async (t, calculate_gas, ipfs_index) =>{
        var obj = [ /* add data */
            [20000, 13, 0],
            [24], [23],/* 24(dialer admin registry) */
            [], /* contexts */
            [] /* int_data */
        ]

        var string_obj = [[]]

        var context = 0
        var int_data = 0

        var string_data = await this.get_object_ipfs_index(t, calculate_gas, ipfs_index, t.id);

        obj[3].push(context)
        obj[4].push(int_data)

        string_obj[0].push(string_data)

        return {int: obj, str: string_obj}
    }

    format_iTransfer_object = async (t, calculate_gas, ints, ipfs_index) => {
        var ints_clone = ints.slice()
        var author = t.recipient
        var string_data = this.props.hash_data(t.identifier)
        var depth_swap_obj = [
            [30000,16,0],
            [], [],/* target exchange ids */
            [], [],/* receivers */
            [],/* action */ 
            [],/* depth */
            []/* amount */
        ]

        var obj = [/* send awwards */
            [30000, 7, 0],
            [author.toString().toLocaleString('fullwide', {useGrouping:false})], [23],/* target receivers */
            ['1'],/* awward contexts */
            
            [], [],/* exchange ids for first target receiver */
            [],/* amounts for first target receiver */
            [],/* depths for the first targeted receiver*/
        ]
        var string_obj = [[]]

        for(var i=0; i<t.price_data.length; i++){
            var exchange = t.price_data[i]['id'].toString().toLocaleString('fullwide', {useGrouping:false})
            var amount = t.price_data[i]['amount'].toString().toLocaleString('fullwide', {useGrouping:false})

            var exchange_obj = this.props.app_state.created_token_object_mapping[this.props.app_state.selected_e5][parseInt(exchange)]
            var swap_actions = this.get_exchange_swap_down_actions(amount, exchange_obj, ints_clone.concat([depth_swap_obj, obj]))
            for(var s=0; s<swap_actions.length; s++){
                depth_swap_obj[1].push(exchange)
                depth_swap_obj[2].push(23)
                depth_swap_obj[3].push(0)
                depth_swap_obj[4].push(53)
                depth_swap_obj[5/* action */].push(0)
                depth_swap_obj[6/* depth */].push(swap_actions[s])
                depth_swap_obj[7].push('1')
            }

            var transfer_actions = this.get_exchange_transfer_actions(amount)
            for(var f=0; f<transfer_actions.length; f++){
                obj[4].push(exchange)
                obj[5].push(23)
                obj[6].push(transfer_actions[f]['amount'])
                obj[7].push(transfer_actions[f]['depth'])
            }
        }
        
        
        string_obj[0].push(string_data)

        return {int: obj, str: string_obj, depth: depth_swap_obj}
    }

    format_bill_object = async(t, calculate_gas, ipfs_index) => {
        var bill_target = t.recipient
        var obj = [ /* add data */
            [20000, 13, 0],
            [bill_target.toString().toLocaleString('fullwide', {useGrouping:false})], [23],
            [], /* contexts */
            [] /* int_data */
        ]
        var string_obj = [[]]

        var context = 13
        var int_data = Date.now()

        var string_data = await this.get_object_ipfs_index(t, calculate_gas, ipfs_index, t.id);

        obj[3].push(context)
        obj[4].push(int_data)

        string_obj[0].push(string_data)

        return {int: obj, str: string_obj}
    }

    format_bill_payment_object = async (t, calculate_gas, ints, ipfs_index) => {
        var ints_clone = ints.slice()
        var author = t.recipient
        var string_data = this.props.hash_data(t.identifier)
        var depth_swap_obj = [
            [30000,16,0],
            [], [],/* target exchange ids */
            [], [],/* receivers */
            [],/* action */ 
            [],/* depth */
            []/* amount */
        ]

        var obj = [/* send awwards */
            [30000, 7, 0],
            [author.toString().toLocaleString('fullwide', {useGrouping:false})], [23],/* target receivers */
            ['2'],/* awward contexts */
            
            [], [],/* exchange ids for first target receiver */
            [],/* amounts for first target receiver */
            [],/* depths for the first targeted receiver*/
        ]
        var string_obj = [[]]
        for(var i=0; i<t['price_data'].length; i++){
            var exchange = t['price_data'][i]['id'].toString().toLocaleString('fullwide', {useGrouping:false})
            var amount = t['price_data'][i]['amount'].toString().toLocaleString('fullwide', {useGrouping:false})

            var exchange_obj = this.props.app_state.created_token_object_mapping[this.props.app_state.selected_e5][parseInt(exchange)]
            var swap_actions = this.get_exchange_swap_down_actions(amount, exchange_obj, ints_clone.concat([depth_swap_obj, obj]))
            for(var s=0; s<swap_actions.length; s++){
                depth_swap_obj[1].push(exchange)
                depth_swap_obj[2].push(23)
                depth_swap_obj[3].push(0)
                depth_swap_obj[4].push(53)
                depth_swap_obj[5/* action */].push(0)
                depth_swap_obj[6/* depth */].push(swap_actions[s])
                depth_swap_obj[7].push('1')
            }

            var transfer_actions = this.get_exchange_transfer_actions(amount)
            for(var f=0; f<transfer_actions.length; f++){
                obj[4].push(exchange)
                obj[5].push(23)
                obj[6].push(transfer_actions[f]['amount'])
                obj[7].push(transfer_actions[f]['depth'])
            }
        }
        
        
        string_obj[0].push(string_data)

        return {int: obj, str: string_obj, depth: depth_swap_obj}
    }

    format_poll_object(t){
        var obj = [/* custom object */
            [10000, 0, 0, 0, 0/* 4 */, 0, 0, 0, 0, 28/* 28(poll-object) */, 0]
        ]
        return obj
    }

    format_hash_record = async (t, target_stack_index) => {
        var obj = [ /* set data */
            [20000, 13, 0],
            [], [],/* target objects */
            [], /* contexts */
            [] /* int_data */
        ]
        var string_obj = [[]]

        var target_id = target_stack_index
        var target_id_type = 35
        var context = 42
        var int_data = 0

        var obj = {
            participants: t.participants, 
            json_files: this.sortByAttributeDescending(t.json_files, 'name'), 
            csv_files: this.sortByAttributeDescending(t.csv_files, 'name'), 
            start_time: t.start_time,
            end_time: t.end_time,
            candidates: t.candidates,
            winner_count: t.winner_count,
            poll_e5s: t.poll_e5s
        }/* try not to change this at all. even the order. */
        var string_data = await this.props.hash_data(JSON.stringify(obj))

        obj[1].push(target_id)
        obj[2].push(target_id_type)
        obj[3].push(context)
        obj[4].push(int_data)

        string_obj[0].push(string_data)

        return {int: obj, str: string_obj}
    }











    optimize_run_if_enabled(ints, strs, adds, should_optimize_run){
        var selected_item = this.get_selected_item(this.state.get_stack_optimizer_tags_object, 'e')
        if(selected_item == 'e'){
            return {'ints':ints, 'strs':strs, 'adds':adds}
        }
        else if(!should_optimize_run){
            return {'ints':ints, 'strs':strs, 'adds':adds}
        }
        else{
            var new_ints = []
            var new_adds = []
            var new_strs = []

            for(var i=0; i<ints.length; i++){
                var global_action = ints[i][0][0]
                if(global_action == 10000){
                    return {'ints':ints, 'strs':strs, 'adds':adds}
                    new_ints.push(ints[i])
                    new_strs.push(strs[i])
                    new_adds.push(adds[i])
                }
            }  


            var obj = [ /* set metadata */
                [20000, 1, 0],
                [], [],/* target objects */
                []/* contexts */, 
                []/* int_data */
            ]
            var str_obj = [[]]
            var add_obj = []
            for(var i=0; i<ints.length; i++){
                var global_action = ints[i][0][0]
                if(global_action == 20000){
                    var action = ints[i][0][1]
                    if(action == 1/* modify_metadata */){
                        for(var j=1; j<ints[i].length; j++){
                            ints[i][j].forEach(element => {
                                obj[j].push(element)
                            });
                        }

                        strs[i][0].forEach(element => {
                            str_obj[0].push(element)
                        });
                        adds[i].forEach(element => {
                            add_obj.push(element)
                        });
                    }
                }
            }
            if(obj[1].length != 0){
                new_ints.push(obj)
                new_strs.push(str_obj)
                new_adds.push(add_obj)
            }




            var obj = [/* depth_mint\swap up\swap down tokens [2(depth_auth_mint), 1(swap_up), 0(swap_down)] */
                [30000,16,0],
                [], [],/* target exchange ids */
                [], [],/* receivers */
                [],/* action */ 
                [],/* depth */
                []/* amount */
            ]
            var str_obj = [[]]
            var add_obj = []
            for(var i=0; i<ints.length; i++){
                var global_action = ints[i][0][0]
                if(global_action == obj[0][0]){
                    var action = ints[i][0][1]
                    if(action == obj[0][1]){
                        for(var j=1; j<ints[i].length; j++){
                            ints[i][j].forEach(element => {
                                obj[j].push(element)
                            });
                        }

                        // strs[i][0].forEach(element => {
                        //     str_obj[0].push(element)
                        // });
                        // adds[i].forEach(element => {
                        //     add_obj.push(element)
                        // });
                    }
                }
            }
            if(obj[1].length != 0){
                new_ints.push(obj)
                new_strs.push(str_obj)
                new_adds.push(add_obj)
            }




            var obj = [ /* set account to be interactible */
                [20000, 2, 0],
                [], [],/* target objects */
                [], [],/* target account ids*/
                []/* interacible expiry time limit */
            ]
            var str_obj = [[]]
            var add_obj = []
            for(var i=0; i<ints.length; i++){
                var global_action = ints[i][0][0]
                if(global_action == obj[0][0]){
                    var action = ints[i][0][1]
                    if(action == obj[0][1]){
                        for(var j=1; j<ints[i].length; j++){
                            ints[i][j].forEach(element => {
                                obj[j].push(element)
                            });
                        }

                        // strs[i][0].forEach(element => {
                        //     str_obj[0].push(element)
                        // });
                        // adds[i].forEach(element => {
                        //     add_obj.push(element)
                        // });
                    }
                }
            }
            if(obj[1].length != 0){
                new_ints.push(obj)
                new_strs.push(str_obj)
                new_adds.push(add_obj)
            }


            var obj = [/* ✔️auth modify token exchange */
                [20000, 3, 0],
                [], [],/* targets */
                [],/* target_array */
                [],/* target_array_items */
                [], []/* new_items */
            ]
            var str_obj = [[]]
            var add_obj = []
            for(var i=0; i<ints.length; i++){
                var global_action = ints[i][0][0]
                if(global_action == obj[0][0]){
                    var action = ints[i][0][1]
                    if(action == obj[0][1]){
                        for(var j=1; j<ints[i].length; j++){
                            ints[i][j].forEach(element => {
                                obj[j].push(element)
                            });
                        }

                        // strs[i][0].forEach(element => {
                        //     str_obj[0].push(element)
                        // });
                        // adds[i].forEach(element => {
                        //     add_obj.push(element)
                        // });
                    }
                }
            }
            if(obj[1].length != 0){
                new_ints.push(obj)
                new_strs.push(str_obj)
                new_adds.push(add_obj)
            }


            var obj = [ /* set account as mod */
                [20000, 4, 0],
                [], [],/* target objects */
                [], []/* target moderator account ids*/
            ]
            var str_obj = [[]]
            var add_obj = []
            for(var i=0; i<ints.length; i++){
                var global_action = ints[i][0][0]
                if(global_action == obj[0][0]){
                    var action = ints[i][0][1]
                    if(action == obj[0][1]){
                        for(var j=1; j<ints[i].length; j++){
                            ints[i][j].forEach(element => {
                                obj[j].push(element)
                            });
                        }

                        // strs[i][0].forEach(element => {
                        //     str_obj[0].push(element)
                        // });
                        // adds[i].forEach(element => {
                        //     add_obj.push(element)
                        // });
                    }
                }
            }
            if(obj[1].length != 0){
                new_ints.push(obj)
                new_strs.push(str_obj)
                new_adds.push(add_obj)
            }


            var obj = [ /* enable interactible checkers */
                [20000, 5, 0],
                [], []/* target objects */
            ]
            var str_obj = [[]]
            var add_obj = []
            for(var i=0; i<ints.length; i++){
                var global_action = ints[i][0][0]
                if(global_action == obj[0][0]){
                    var action = ints[i][0][1]
                    if(action == obj[0][1]){
                        for(var j=1; j<ints[i].length; j++){
                            ints[i][j].forEach(element => {
                                obj[j].push(element)
                            });
                        }

                        // strs[i][0].forEach(element => {
                        //     str_obj[0].push(element)
                        // });
                        // adds[i].forEach(element => {
                        //     add_obj.push(element)
                        // });
                    }
                }
            }
            if(obj[1].length != 0){
                new_ints.push(obj)
                new_strs.push(str_obj)
                new_adds.push(add_obj)
            }


            var obj = [ /* alias data */
                [20000, 10, 0],
                [], [],/* target objects */
                [], /* contexts */
                [] /* int_data */
            ]
            var str_obj = [[]]
            var add_obj = []
            for(var i=0; i<ints.length; i++){
                var global_action = ints[i][0][0]
                if(global_action == obj[0][0]){
                    var action = ints[i][0][1]
                    if(action == obj[0][1]){
                        for(var j=1; j<ints[i].length; j++){
                            ints[i][j].forEach(element => {
                                obj[j].push(element)
                            });
                        }

                        strs[i][0].forEach(element => {
                            str_obj[0].push(element)
                        });
                        adds[i].forEach(element => {
                            add_obj.push(element)
                        });
                    }
                }
            }
            if(obj[1].length != 0){
                new_ints.push(obj)
                new_strs.push(str_obj)
                new_adds.push(add_obj)
            }


            var obj = [/* ✔️auth modify subscription */
                [20000, 11, 0],
                [], [],/* targets */
                [],/* target_array_pos */
                [],/* target_array_items */
                [], []/* new_items */
            ]
            var str_obj = [[]]
            var add_obj = []
            for(var i=0; i<ints.length; i++){
                var global_action = ints[i][0][0]
                if(global_action == obj[0][0]){
                    var action = ints[i][0][1]
                    if(action == obj[0][1]){
                        for(var j=1; j<ints[i].length; j++){
                            ints[i][j].forEach(element => {
                                obj[j].push(element)
                            });
                        }

                        // strs[i][0].forEach(element => {
                        //     str_obj[0].push(element)
                        // });
                        // adds[i].forEach(element => {
                        //     add_obj.push(element)
                        // });
                    }
                }
            }
            if(obj[1].length != 0){
                new_ints.push(obj)
                new_strs.push(str_obj)
                new_adds.push(add_obj)
            }





            var obj = [/* index data in tags */
                [20000, 12, 0],
                [], []/* target objects */
            ]
            var str_obj = [[], [], []]
            var add_obj = []
            for(var i=0; i<ints.length; i++){
                var global_action = ints[i][0][0]
                if(global_action == obj[0][0]){
                    var action = ints[i][0][1]
                    if(action == obj[0][1]){
                        for(var j=1; j<ints[i].length; j++){
                            ints[i][j].forEach(element => {
                                obj[j].push(element)
                            });
                        }
                        
                        for(var j=0; j<strs[i].length; j++){
                            strs[i][j].forEach(element => {
                                str_obj[j].push(element)
                            });
                        }
                        
                        adds[i].forEach(element => {
                            add_obj.push(element)
                        });
                    }
                }
            }
            if(obj[1].length != 0){
                new_ints.push(obj)
                new_strs.push(str_obj)
                new_adds.push(add_obj)
            }

            

            var obj = [ /* set data */
                [20000, 13, 0],
                [], [],/* target objects */
                [], /* contexts */
                [] /* int_data */
            ]
            var str_obj = [[]]
            var add_obj = []
            for(var i=0; i<ints.length; i++){
                var global_action = ints[i][0][0]
                if(global_action == obj[0][0]){
                    var action = ints[i][0][1]
                    if(action == obj[0][1]){
                        for(var j=1; j<ints[i].length; j++){
                            ints[i][j].forEach(element => {
                                obj[j].push(element)
                            });
                        }

                        strs[i][0].forEach(element => {
                            str_obj[0].push(element)
                        });
                        adds[i].forEach(element => {
                            add_obj.push(element)
                        });
                    }
                }
            }
            if(obj[1].length != 0){
                new_ints.push(obj)
                new_strs.push(str_obj)
                new_adds.push(add_obj)
            }



            var obj = [/* auth modify proposal */
                [20000, 14, 0],
                [], [],/* targets */
                [],/* target_array_pos */
                [],/* target_array_items */
                [], []/* new_items */
            ]
            var str_obj = [[]]
            var add_obj = []
            for(var i=0; i<ints.length; i++){
                var global_action = ints[i][0][0]
                if(global_action == obj[0][0]){
                    var action = ints[i][0][1]
                    if(action == obj[0][1]){
                        for(var j=1; j<ints[i].length; j++){
                            ints[i][j].forEach(element => {
                                obj[j].push(element)
                            });
                        }

                        // strs[i][0].forEach(element => {
                        //     str_obj[0].push(element)
                        // });
                        // adds[i].forEach(element => {
                        //     add_obj.push(element)
                        // });
                    }
                }
            }
            if(obj[1].length != 0){
                new_ints.push(obj)
                new_strs.push(str_obj)
                new_adds.push(add_obj)
            }


            var obj = [/* ✔️auth modify contract */
                [20000, 15, 0],
                [], [],/* targets */
                [],/* target_array_pos */
                [],/* target_array_items */
                [], []/* new_items */
            ]
            var str_obj = [[]]
            var add_obj = []
            for(var i=0; i<ints.length; i++){
                var global_action = ints[i][0][0]
                if(global_action == obj[0][0]){
                    var action = ints[i][0][1]
                    if(action == obj[0][1]){
                        for(var j=1; j<ints[i].length; j++){
                            ints[i][j].forEach(element => {
                                obj[j].push(element)
                            });
                        }

                        // strs[i][0].forEach(element => {
                        //     str_obj[0].push(element)
                        // });
                        // adds[i].forEach(element => {
                        //     add_obj.push(element)
                        // });
                    }
                }
            }
            if(obj[1].length != 0){
                new_ints.push(obj)
                new_strs.push(str_obj)
                new_adds.push(add_obj)
            }



            var obj = [/* revoke author's moderator privelages */
                [20000, 16, 0],
                [], [],/* target objects */
            ]
            var str_obj = [[]]
            var add_obj = []
            for(var i=0; i<ints.length; i++){
                var global_action = ints[i][0][0]
                if(global_action == obj[0][0]){
                    var action = ints[i][0][1]
                    if(action == obj[0][1]){
                        for(var j=1; j<ints[i].length; j++){
                            ints[i][j].forEach(element => {
                                obj[j].push(element)
                            });
                        }

                        // strs[i][0].forEach(element => {
                        //     str_obj[0].push(element)
                        // });
                        // adds[i].forEach(element => {
                        //     add_obj.push(element)
                        // });
                    }
                }
            }
            if(obj[1].length != 0){
                new_ints.push(obj)
                new_strs.push(str_obj)
                new_adds.push(add_obj)
            }



            var obj = [/* block account */
                [20000, 17, 0],
                [], [],/* target objects */
                [], [],/* target account ids */
                []/* expiry_time */
            ]
            var str_obj = [[]]
            var add_obj = []
            for(var i=0; i<ints.length; i++){
                var global_action = ints[i][0][0]
                if(global_action == obj[0][0]){
                    var action = ints[i][0][1]
                    if(action == obj[0][1]){
                        for(var j=1; j<ints[i].length; j++){
                            ints[i][j].forEach(element => {
                                obj[j].push(element)
                            });
                        }

                        // strs[i][0].forEach(element => {
                        //     str_obj[0].push(element)
                        // });
                        // adds[i].forEach(element => {
                        //     add_obj.push(element)
                        // });
                    }
                }
            }
            if(obj[1].length != 0){
                new_ints.push(obj)
                new_strs.push(str_obj)
                new_adds.push(add_obj)
            }







            var obj = [/* ✔️send tokens to another account */
                [30000, 1, 0],
                [], [],/* exchanges */
                [], [],/* receivers */
                [],/* amounts */
                []/* depths */
            ]
            var str_obj = [[]]
            var add_obj = []
            for(var i=0; i<ints.length; i++){
                var global_action = ints[i][0][0]
                if(global_action == obj[0][0]){
                    var action = ints[i][0][1]
                    if(action == obj[0][1]){
                        for(var j=1; j<ints[i].length; j++){
                            ints[i][j].forEach(element => {
                                obj[j].push(element)
                            });
                        }

                        // strs[i][0].forEach(element => {
                        //     str_obj[0].push(element)
                        // });
                        // adds[i].forEach(element => {
                        //     add_obj.push(element)
                        // });
                    }
                }
            }
            if(obj[1].length != 0){
                new_ints.push(obj)
                new_strs.push(str_obj)
                new_adds.push(add_obj)
            }


            var obj = [/* ✔️pay subscription */
                [30000, 2, 0],
                [], [],/* target subscription ids */
                []/* subscription buy amounts */
            ]
            var str_obj = [[]]
            var add_obj = []
            for(var i=0; i<ints.length; i++){
                var global_action = ints[i][0][0]
                if(global_action == obj[0][0]){
                    var action = ints[i][0][1]
                    if(action == obj[0][1]){
                        for(var j=1; j<ints[i].length; j++){
                            ints[i][j].forEach(element => {
                                obj[j].push(element)
                            });
                        }

                        // strs[i][0].forEach(element => {
                        //     str_obj[0].push(element)
                        // });
                        // adds[i].forEach(element => {
                        //     add_obj.push(element)
                        // });
                    }
                }
            }
            if(obj[1].length != 0){
                new_ints.push(obj)
                new_strs.push(str_obj)
                new_adds.push(add_obj)
            }


            var obj = [/* ✔️enter a contract */
                [30000, 3, 0],
                [], [],/* contract ids */
                []/* expiry time (seconds) */
            ]
            var str_obj = [[]]
            var add_obj = []
            for(var i=0; i<ints.length; i++){
                var global_action = ints[i][0][0]
                if(global_action == obj[0][0]){
                    var action = ints[i][0][1]
                    if(action == obj[0][1]){
                        for(var j=1; j<ints[i].length; j++){
                            ints[i][j].forEach(element => {
                                obj[j].push(element)
                            });
                        }

                        // strs[i][0].forEach(element => {
                        //     str_obj[0].push(element)
                        // });
                        // adds[i].forEach(element => {
                        //     add_obj.push(element)
                        // });
                    }
                }
            }
            if(obj[1].length != 0){
                new_ints.push(obj)
                new_strs.push(str_obj)
                new_adds.push(add_obj)
            }


            var obj = [/* ✔️vote proposal */
                [30000, 4, 0],
                [], [],/* proposal ids */
                [],/* votes */
            ]
            var str_obj = [[]]
            var add_obj = []
            for(var i=0; i<ints.length; i++){
                var global_action = ints[i][0][0]
                if(global_action == obj[0][0]){
                    var action = ints[i][0][1]
                    if(action == obj[0][1]){
                        for(var j=1; j<4; j++){
                            ints[i][j].forEach(element => {
                                obj[j].push(element)
                            });
                        }
                        for(var j=4; j<ints[i].length; j++){
                            obj.push(ints[i][j])
                        }

                        // strs[i][0].forEach(element => {
                        //     str_obj[0].push(element)
                        // });
                        // adds[i].forEach(element => {
                        //     add_obj.push(element)
                        // });
                    }
                }
            }
            if(obj[1].length != 0){
                new_ints.push(obj)
                new_strs.push(str_obj)
                new_adds.push(add_obj)
            }


            var obj = [/* ✔️submit consensus request */
                [30000, 5, 0/* payer_account_data_start */, 0/* payer_account_data_end */, 0/* vote_proposal_bounty_data_start */, 0/* vote_proposal_bounty_data_end */, 0],
                [], [],/* targets */
            ]
            var str_obj = [[]]
            var add_obj = []
            for(var i=0; i<ints.length; i++){
                var global_action = ints[i][0][0]
                if(global_action == obj[0][0]){
                    var action = ints[i][0][1]
                    if(action == obj[0][1]){
                        for(var j=1; j<ints[i].length; j++){
                            ints[i][j].forEach(element => {
                                obj[j].push(element)
                            });
                        }

                        // strs[i][0].forEach(element => {
                        //     str_obj[0].push(element)
                        // });
                        // adds[i].forEach(element => {
                        //     add_obj.push(element)
                        // });
                    }
                }
            }
            if(obj[1].length != 0){
                new_ints.push(obj)
                new_strs.push(str_obj)
                new_adds.push(add_obj)
            }



            var obj = [/* ✔️auth freeze tokens [1-freeze_tokens , 0-unfreeze_tokens] */
                [30000, 6, 0],
                [], [],/* target_exchanges */
                [], [],/* target_account_ids */
                [],/* freeze_amounts */
                [],/* action */
                []/* depths */
            ]
            var str_obj = [[]]
            var add_obj = []
            for(var i=0; i<ints.length; i++){
                var global_action = ints[i][0][0]
                if(global_action == obj[0][0]){
                    var action = ints[i][0][1]
                    if(action == obj[0][1]){
                        for(var j=1; j<ints[i].length; j++){
                            ints[i][j].forEach(element => {
                                obj[j].push(element)
                            });
                        }

                        // strs[i][0].forEach(element => {
                        //     str_obj[0].push(element)
                        // });
                        // adds[i].forEach(element => {
                        //     add_obj.push(element)
                        // });
                    }
                }
            }
            if(obj[1].length != 0){
                new_ints.push(obj)
                new_strs.push(str_obj)
                new_adds.push(add_obj)
            }



            var obj = [/* send awwards */
                [30000, 7, 0],
                [], [],/* target receivers */
                [],/* awward contexts */
            ]
            var str_obj = [[]]
            var add_obj = []
            for(var i=0; i<ints.length; i++){
                var global_action = ints[i][0][0]
                if(global_action == obj[0][0]){
                    var action = ints[i][0][1]
                    if(action == obj[0][1]){
                        for(var j=1; j<4; j++){
                            ints[i][j].forEach(element => {
                                obj[j].push(element)
                            });
                        }
                        for(var j=4; j<ints[i].length; j++){
                            obj.push(ints[i][j])
                        }

                        strs[i][0].forEach(element => {
                            str_obj[0].push(element)
                        });
                        // adds[i].forEach(element => {
                        //     add_obj.push(element)
                        // });
                    }
                }
            }
            if(obj[1].length != 0){
                new_ints.push(obj)
                new_strs.push(str_obj)
                new_adds.push(add_obj)
            }



            var obj = [/* ✔️buy end/spend */
                [30000, 8, 0],
                [], [],/* exchanges */
                [], [],/* receivers */
                []/* amounts */, [],/* action */
                []/* lower_bounds */, []/* upper_bounds */
            ]
            var str_obj = [[]]
            var add_obj = []
            for(var i=0; i<ints.length; i++){
                var global_action = ints[i][0][0]
                if(global_action == obj[0][0]){
                    var action = ints[i][0][1]
                    if(action == obj[0][1]){
                        for(var j=1; j<ints[i].length; j++){
                            ints[i][j].forEach(element => {
                                obj[j].push(element)
                            });
                        }

                        // strs[i][0].forEach(element => {
                        //     str_obj[0].push(element)
                        // });
                        // adds[i].forEach(element => {
                        //     add_obj.push(element)
                        // });
                    }
                }
            }
            if(obj[1].length != 0){
                new_ints.push(obj)
                new_strs.push(str_obj)
                new_adds.push(add_obj)
            }


            var obj = [/* ✔️auth mint token */
                [30000, 9, 0],
                [], [],/* exchanges */
                [], [],/* receivers */
                []/* amounts */, [],/* action */
                []/* lower_bounds */, []/* upper_bounds */
            ]
            var str_obj = [[]]
            var add_obj = []
            for(var i=0; i<ints.length; i++){
                var global_action = ints[i][0][0]
                if(global_action == obj[0][0]){
                    var action = ints[i][0][1]
                    if(action == obj[0][1]){
                        for(var j=1; j<ints[i].length; j++){
                            ints[i][j].forEach(element => {
                                obj[j].push(element)
                            });
                        }

                        // strs[i][0].forEach(element => {
                        //     str_obj[0].push(element)
                        // });
                        // adds[i].forEach(element => {
                        //     add_obj.push(element)
                        // });
                    }
                }
            }
            if(obj[1].length != 0){
                new_ints.push(obj)
                new_strs.push(str_obj)
                new_adds.push(add_obj)
            }



            var obj = [/* ✔️exit contract */
                [30000, 11, 0],
                [], []/* contract ids */
            ]
            var str_obj = [[]]
            var add_obj = []
            for(var i=0; i<ints.length; i++){
                var global_action = ints[i][0][0]
                if(global_action == obj[0][0]){
                    var action = ints[i][0][1]
                    if(action == obj[0][1]){
                        for(var j=1; j<ints[i].length; j++){
                            ints[i][j].forEach(element => {
                                obj[j].push(element)
                            });
                        }

                        // strs[i][0].forEach(element => {
                        //     str_obj[0].push(element)
                        // });
                        // adds[i].forEach(element => {
                        //     add_obj.push(element)
                        // });
                    }
                }
            }
            if(obj[1].length != 0){
                new_ints.push(obj)
                new_strs.push(str_obj)
                new_adds.push(add_obj)
            }



            var obj = [/* ✔️cancel subscription */
                [30000, 12, 0],
                [], [],/* target subscription ids */
                []/* subscription sell amounts */
            ]
            var str_obj = [[]]
            var add_obj = []
            for(var i=0; i<ints.length; i++){
                var global_action = ints[i][0][0]
                if(global_action == obj[0][0]){
                    var action = ints[i][0][1]
                    if(action == obj[0][1]){
                        for(var j=1; j<ints[i].length; j++){
                            ints[i][j].forEach(element => {
                                obj[j].push(element)
                            });
                        }

                        // strs[i][0].forEach(element => {
                        //     str_obj[0].push(element)
                        // });
                        // adds[i].forEach(element => {
                        //     add_obj.push(element)
                        // });
                    }
                }
            }
            if(obj[1].length != 0){
                new_ints.push(obj)
                new_strs.push(str_obj)
                new_adds.push(add_obj)
            }


            var obj = [/* ✔️collect subscription */
                [30000, 13, 0],
                [], [],/* target subscription ids */
            ]
            var str_obj = [[]]
            var add_obj = []
            for(var i=0; i<ints.length; i++){
                var global_action = ints[i][0][0]
                if(global_action == obj[0][0]){
                    var action = ints[i][0][1]
                    if(action == obj[0][1]){
                        for(var j=1; j<3; j++){
                            ints[i][j].forEach(element => {
                                obj[j].push(element)
                            });
                        }
                        for(var j=3; j<ints[i].length; j++){
                            obj.push(ints[i][j])
                        }

                        // strs[i][0].forEach(element => {
                        //     str_obj[0].push(element)
                        // });
                        // adds[i].forEach(element => {
                        //     add_obj.push(element)
                        // });
                    }
                }
            }
            if(obj[1].length != 0){
                new_ints.push(obj)
                new_strs.push(str_obj)
                new_adds.push(add_obj)
            }



            var obj = [/* ✔️extend enter contract */
                [30000, 14, 0],
                [], [],/* contract ids */
                []/* expiry time (seconds) */
            ]
            var str_obj = [[]]
            var add_obj = []
            for(var i=0; i<ints.length; i++){
                var global_action = ints[i][0][0]
                if(global_action == obj[0][0]){
                    var action = ints[i][0][1]
                    if(action == obj[0][1]){
                        for(var j=1; j<ints[i].length; j++){
                            ints[i][j].forEach(element => {
                                obj[j].push(element)
                            });
                        }

                        // strs[i][0].forEach(element => {
                        //     str_obj[0].push(element)
                        // });
                        // adds[i].forEach(element => {
                        //     add_obj.push(element)
                        // });
                    }
                }
            }
            if(obj[1].length != 0){
                new_ints.push(obj)
                new_strs.push(str_obj)
                new_adds.push(add_obj)
            }



            var obj = [/* ✔️archive proposal/contract */
                [30000, 15, 0],
                [], [],/* proposal/contract ids */
            ]
            var str_obj = [[]]
            var add_obj = []
            for(var i=0; i<ints.length; i++){
                var global_action = ints[i][0][0]
                if(global_action == obj[0][0]){
                    var action = ints[i][0][1]
                    if(action == obj[0][1]){
                        for(var j=1; j<3; j++){
                            ints[i][j].forEach(element => {
                                obj[j].push(element)
                            });
                        }
                        for(var j=3; j<ints[i].length; j++){
                            obj.push(ints[i][j])
                        }

                        // strs[i][0].forEach(element => {
                        //     str_obj[0].push(element)
                        // });
                        // adds[i].forEach(element => {
                        //     add_obj.push(element)
                        // });
                    }
                }
            }
            if(obj[1].length != 0){
                new_ints.push(obj)
                new_strs.push(str_obj)
                new_adds.push(add_obj)
            }



            var obj = [/* ✔️exchange transfer */
                [30000, 17, 0],
                [], [],/* exchange ids */
                [], [],/* receivers */
                [], [],/* amounts/depths */
                [], [],/* token targets */
            ]
            var str_obj = [[]]
            var add_obj = []
            for(var i=0; i<ints.length; i++){
                var global_action = ints[i][0][0]
                if(global_action == obj[0][0]){
                    var action = ints[i][0][1]
                    if(action == obj[0][1]){
                        for(var j=1; j<ints[i].length; j++){
                            ints[i][j].forEach(element => {
                                obj[j].push(element)
                            });
                        }

                        // strs[i][0].forEach(element => {
                        //     str_obj[0].push(element)
                        // });
                        // adds[i].forEach(element => {
                        //     add_obj.push(element)
                        // });
                    }
                }
            }
            if(obj[1].length != 0){
                new_ints.push(obj)
                new_strs.push(str_obj)
                new_adds.push(add_obj)
            }



            var obj = [/* ✔️force exit account */
                [30000, 18, 0],
                [], [],/* contract ids */
                []/* target account */
            ]
            var str_obj = [[]]
            var add_obj = []
            for(var i=0; i<ints.length; i++){
                var global_action = ints[i][0][0]
                if(global_action == obj[0][0]){
                    var action = ints[i][0][1]
                    if(action == obj[0][1]){
                        for(var j=1; j<ints[i].length; j++){
                            ints[i][j].forEach(element => {
                                obj[j].push(element)
                            });
                        }

                        // strs[i][0].forEach(element => {
                        //     str_obj[0].push(element)
                        // });
                        // adds[i].forEach(element => {
                        //     add_obj.push(element)
                        // });
                    }
                }
            }
            if(obj[1].length != 0){
                new_ints.push(obj)
                new_strs.push(str_obj)
                new_adds.push(add_obj)
            }

            return {'ints':new_ints, 'adds':new_adds, 'strs':new_strs}
        }
    }

    







    render_settings_section(){
        var size = this.props.size

        if(size == 's'){
            return(
                <div>
                    {this.render_settings_details()}
                    {this.render_settings_details2()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_settings_details()}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_settings_details2()}
                    </div>
                </div>
                
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_settings_details()}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_settings_details2()}
                    </div>
                </div>
                
            )
        }
        
    }

    

    render_settings_details(){
        return(
            <div>
                {this.render_detail_item('3',{'title':this.props.app_state.loc['1528']/* 'App Theme' */, 'details':this.props.app_state.loc['1529']/* 'Set the look and feel of E5.' */, 'size':'l'})}
                <div style={{height: 10}}/>

                <Tags font={this.props.app_state.font} page_tags_object={this.state.get_themes_tags_object} tag_size={'l'} when_tags_updated={this.when_theme_tags_updated.bind(this)} theme={this.props.theme} app_state={this.props.app_state}/>

                {this.render_detail_item('0')}


                {this.render_detail_item('3',{'title':this.props.app_state.loc['2813']/* 'Feed Orientation' */, 'details':this.props.app_state.loc['2814']/* 'Set the orientation for viewing your content feed.' */, 'size':'l'})}
                <div style={{height: 10}}/>

                <Tags font={this.props.app_state.font} page_tags_object={this.state.get_orientation_tags_object} tag_size={'l'} when_tags_updated={this.when_details_orientation_changed.bind(this)} theme={this.props.theme}/>

                {this.render_detail_item('0')}

                
                {/* preferred E5 */}
                {this.render_detail_item('3',{'title':this.props.app_state.loc['1530'], 'details':this.props.app_state.loc['1531'], 'size':'l'})}
                <div style={{height: 10}}/>
                {this.load_preferred_e5_ui()}
                {this.render_detail_item('0')}

                



                {this.render_detail_item('3',{'title':this.props.app_state.loc['1593dd']/* 'Preferred nitro storage option' */, 'details':this.props.app_state.loc['1593de']/* 'Set the nitro storage option you prefer to use for your files and posts. To see a nitro option, first buy storage from it in the nitro section.' */, 'size':'l'})}
                <div style={{height: 10}}/>

                {this.load_my_nitro_objects_to_select()}
                {this.render_detail_item('0')}






                {this.render_detail_item('3',{'title':this.props.app_state.loc['1593en']/* 'Default Data Storage Option.' */, 'details':this.props.app_state.loc['1593eo']/* 'Set the defaut data storage option you prefer to use. If you set a nitro storage option above, the nitro option will take precedence.' */, 'size':'l'})}
                <div style={{height: 10}}/>

                <Tags font={this.props.app_state.font} page_tags_object={this.state.get_selected_storage_tags_object} tag_size={'l'} when_tags_updated={this.when_get_selected_storage_tags_object_updated.bind(this)} theme={this.props.theme}/>
                
                {this.render_detail_item('10', {'text':this.props.app_state.loc['1593es']/* 'Arweave takes about 15 to 20 minutes to finalize uploads.' */, 'textsize':'9px', 'font':this.props.app_state.font})}

                {this.render_detail_item('0')}





                {/* {this.render_detail_item('3',{'title':this.props.app_state.loc['1532'], 'details':this.props.app_state.loc['1533'], 'size':'l'})}
                <div style={{height: 10}}/>

                <div onClick={()=> this.when_clear_cache_clicked()} style={{margin:'0px 10px 0px 10px'}}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['1534'], 'action':''},)}
                </div>

                {this.render_detail_item('0')} */}




                {this.render_detail_item('3',{'title':this.props.app_state.loc['1535']/* 'Preferred Refresh Speed' */, 'details':this.props.app_state.loc['1536']/* 'Set the background refresh speed for E5. Fast consumes more data.' */, 'size':'l'})}
                <div style={{height: 10}}/>

                <Tags font={this.props.app_state.font} page_tags_object={this.state.get_refresh_speed_tags_object} tag_size={'l'} when_tags_updated={this.when_get_refresh_speed_tags_object_updated.bind(this)} theme={this.props.theme} app_state={this.props.app_state}/>

                {this.render_detail_item('0')}






                {this.render_detail_item('3',{'title':this.props.app_state.loc['1537']/* 'Hide Masked Content' */, 'details':this.props.app_state.loc['1538']/* 'Hide masked content sent from your blocked accounts' */, 'size':'l'})}
                <div style={{height: 10}}/>

                <Tags font={this.props.app_state.font} page_tags_object={this.state.get_masked_data_tags_object} tag_size={'l'} when_tags_updated={this.when_get_masked_data_tags_object_updated.bind(this)} theme={this.props.theme} app_state={this.props.app_state}/>

                {this.render_detail_item('0')}





                {this.render_detail_item('3',{'title':this.props.app_state.loc['1539']/* 'Content Channeling' */, 'details':this.props.app_state.loc['1540']/* 'Set which channeling option your content and feed is directed to.' */, 'size':'l'})}
                <div style={{height: 10}}/>

                <Tags font={this.props.app_state.font} page_tags_object={this.state.get_content_channeling_object} tag_size={'l'} when_tags_updated={this.when_get_content_channeling_object_updated.bind(this)} theme={this.props.theme} app_state={this.props.app_state}/>

                {this.render_detail_item('0')}






                {/* {this.render_detail_item('3',{'title':'Content Language', 'details':'Set which language you prefer to use', 'size':'l'})}
                <div style={{height: 10}}/>

                <Tags font={this.props.app_state.font} page_tags_object={this.state.get_content_language_object} tag_size={'l'} when_tags_updated={this.when_get_content_language_object_updated.bind(this)} theme={this.props.theme}/>

                {this.render_detail_item('0')} */}





                
                {this.render_detail_item('3',{'title':this.props.app_state.loc['2893']/* 'Remember Account.' */, 'details':this.props.app_state.loc['2894']/* 'If set to remember, your account will be remembered when you refresh the webapp. You have to enable preserve state (cookies) to activate this setting.' */, 'size':'l'})}
                <div style={{height: 10}}/>

                <Tags font={this.props.app_state.font} page_tags_object={this.state.get_remember_account_tags_object} tag_size={'l'} when_tags_updated={this.when_get_remember_account_tags_object_updated.bind(this)} theme={this.props.theme} app_state={this.props.app_state}/>

                {this.render_detail_item('0')}




                {this.render_detail_item('3',{'title':this.props.app_state.loc['1593fh']/* 'Minify Posts.' */, 'details':this.props.app_state.loc['1593fi']/* 'Compact the posts displayed in your feed.' */, 'size':'l'})}
                <div style={{height: 10}}/>

                <Tags font={this.props.app_state.font} page_tags_object={this.state.get_minified_content_setting_object} tag_size={'l'} when_tags_updated={this.when_get_minified_content_setting_object_updated.bind(this)} theme={this.props.theme} app_state={this.props.app_state}/>

                {this.render_detail_item('0')}

                
                {this.render_auto_run_setting_if_not_ios()}
            </div>
        )
    }

    render_auto_run_setting_if_not_ios(){
        if(this.props.app_state.os == 'iOS') return;

        return(
            <div>
                {this.render_detail_item('3',{'title':this.props.app_state.loc['1593fw']/* 'Auto-Run Stack.' */, 'details':this.props.app_state.loc['1593fx']/* 'Run all your stacked transactions automatically in the background at the frequency you set below.' */, 'size':'l'})}
                <div style={{height: 10}}/>

                <Tags font={this.props.app_state.font} page_tags_object={this.state.get_auto_run_setting_object} tag_size={'l'} when_tags_updated={this.when_get_auto_run_setting_object_updated.bind(this)} theme={this.props.theme} app_state={this.props.app_state}/>

                {this.render_detail_item('10', {'text':this.props.app_state.loc['1593fy']/* 'Youll need to set your wallet for the runs to occur.' */, 'textsize':'10px', 'font':this.props.app_state.font})}

                {this.render_detail_item('0')}
            </div>
        )
    }

    //here
    render_settings_details2(){
        return(
            <div>
                <div style={{'padding': '0px 0px 0px 0px'}}>
                    {this.render_detail_item('3',{'title':this.props.app_state.loc['1543']/* 'Content Tabs' */, 'details':this.props.app_state.loc['1544']/* 'If set to enabled, tabs that help keep track of viewing history will be shown above an objects details.' */, 'size':'l'})}
                    <div style={{height: 10}}/>

                    <Tags font={this.props.app_state.font} page_tags_object={this.state.get_tabs_tags_object} tag_size={'l'} when_tags_updated={this.when_get_tabs_tags_object_updated.bind(this)} theme={this.props.theme} app_state={this.props.app_state}/>

                    {this.render_detail_item('0')}




                    {this.render_detail_item('3',{'title':this.props.app_state.loc['1545']/* 'Preserve State (cookies)' */, 'details':this.props.app_state.loc['1546']/* 'If set to enabled, the state of E5 including your stack and settings will be preserved in memory.' */, 'size':'l'})}
                    <div style={{height: 10}}/>

                    <Tags font={this.props.app_state.font} page_tags_object={this.state.get_storage_permissions_tags_object} tag_size={'l'} when_tags_updated={this.when_storage_permissions_object_updated.bind(this)} theme={this.props.theme} app_state={this.props.app_state}/>

                    {this.render_detail_item('0')}





                    {this.render_detail_item('3',{'title':this.props.app_state.loc['1547']/* 'Stack Optimizer (Experimental)' */, 'details':this.props.app_state.loc['1548']/* 'If set to enabled, similar transactions will be bundled together to consume less gas during runtime.' */, 'size':'l'})}
                    <div style={{height: 10}}/>

                    <Tags font={this.props.app_state.font} page_tags_object={this.state.get_stack_optimizer_tags_object} tag_size={'l'} when_tags_updated={this.when_stack_optimizer_object_updated.bind(this)} theme={this.props.theme} app_state={this.props.app_state}/>

                    {this.render_detail_item('0')}






                    {this.render_detail_item('3',{'title':this.props.app_state.loc['1593i']/* 'Homepage Tags Position' */, 'details':this.props.app_state.loc['1593j']/* 'If set to bottom, the Homepage Tags position will be at the bottom instead of the top.' */, 'size':'l'})}
                    <div style={{height: 10}}/>

                    <Tags font={this.props.app_state.font} page_tags_object={this.state.get_homepage_tags_position_tags_object} tag_size={'l'} when_tags_updated={this.when_homepage_tags_position_tags_object_updated.bind(this)} theme={this.props.theme} app_state={this.props.app_state}/>

                    {this.render_detail_item('0')}





                    
                    {this.render_detail_item('3',{'title':this.props.app_state.loc['1593m']/* 'App Font.' */, 'details':this.props.app_state.loc['1593n']/* 'You can change your preferred font displayed by the app.' */, 'size':'l'})}
                    <div style={{height: 10}}/>

                    <Tags font={this.props.app_state.font} page_tags_object={this.state.get_preferred_font_tags_object} tag_size={'l'} when_tags_updated={this.when_get_preferred_font_tags_object_updated.bind(this)} theme={this.props.theme} app_state={this.props.app_state}/>

                    {this.render_detail_item('0')}



                    {this.render_detail_item('3',{'title':this.props.app_state.loc['1593o']/* 'Auto-Skip NSFW warning.' */, 'details':this.props.app_state.loc['1593p']/* 'If set to enabled, you wont be seeing the NSFW warning while viewing NSFW posts in the explore section.' */, 'size':'l'})}
                    <div style={{height: 10}}/>

                    <Tags font={this.props.app_state.font} page_tags_object={this.state.get_skip_nsfw_warning_tags_object} tag_size={'l'} when_tags_updated={this.when_get_skip_nsfw_warning_tags_object_updated.bind(this)} theme={this.props.theme} app_state={this.props.app_state}/>

                    {this.render_detail_item('0')}




                    {this.render_detail_item('3',{'title':this.props.app_state.loc['2754']/* 'Graph Type' */, 'details':this.props.app_state.loc['2755']/* 'If set to splineArea, E5 graphs will appear smooth, with area will make them jaggered.' */, 'size':'l'})}
                    <div style={{height: 10}}/>

                    <Tags font={this.props.app_state.font} page_tags_object={this.state.get_graph_type_tags_object} tag_size={'l'} when_tags_updated={this.when_get_graph_type_tags_object_updated.bind(this)} theme={this.props.theme} app_state={this.props.app_state}/>

                    {this.render_detail_item('0')}





                    {this.render_detail_item('3',{'title':this.props.app_state.loc['1593ea'], 'details':this.props.app_state.loc['1593eb'], 'size':'l'})}
                    <div style={{height: 10}}/>

                    <Tags font={this.props.app_state.font} page_tags_object={this.state.get_hide_pip_tags_object} tag_size={'l'} when_tags_updated={this.when_get_hide_pip_tags_object_updated.bind(this)} theme={this.props.theme} app_state={this.props.app_state}/>

                    {this.render_detail_item('0')}





                    {this.render_detail_item('3',{'title':this.props.app_state.loc['1593el']/* 'Wallet Value Denomination' */, 'details':this.props.app_state.loc['1593em']/* 'Set the currency you wish to be displayed in your wallets value. */, 'size':'l'})}
                    <div style={{height: 10}}/>

                    <Tags font={this.props.app_state.font} page_tags_object={this.state.get_preferred_currency_tags_object} tag_size={'l'} when_tags_updated={this.when_get_preferred_currency_tags_object_updated.bind(this)} theme={this.props.theme} app_state={this.props.app_state}/>

                    {this.render_detail_item('0')}



                    {this.render_theme_image_setting_if_any()}

                </div>
            </div>
        )
    }

    render_theme_image_setting_if_any(){
        if(this.props.app_state.theme_images_enabled == false) return;
        var selected_theme = this.get_selected_item(this.state.get_themes_tags_object, this.state.get_themes_tags_object['i'].active)

        const findKeyByValue = (obj, value) => {
            return Object.entries(obj).find(([key, val]) => val === value)?.[0];
        };

        var name_key = findKeyByValue(this.props.app_state.loc, selected_theme)
        var english_theme_name = this.props.app_state.all_locales['en'][name_key]

        var default_items = this.props.app_state.theme['backgrounds']

        if(default_items.length > 0 || (this.props.app_state.theme_images[english_theme_name] != null && this.props.app_state.theme_images[english_theme_name].length > 0)){
            var items = this.props.app_state.theme_images[english_theme_name]
            items = items == null ? default_items : items.concat(default_items)
            return(
                <div>
                    {this.render_detail_item('3',{'title':this.props.app_state.loc['1593eu']/* 'Background Theme' */, 'details':this.props.app_state.loc['1593ev']/* 'Set the background theme image for the webapp. */, 'size':'l'})}
                    <div style={{height: 10}}/>
                    <div style={{'margin':'3px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                        <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                            {items.map((item, index) => (
                                <li style={{'display': 'inline-block', 'margin': '0px 2px 1px 2px', '-ms-overflow-style':'none'}} onClick={() => this.set_background_image(item)}>
                                    {this.render_image(item)}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )
        }
    }

    render_image(item){
        if(this.props.app_state.theme_image == item){
            return(
                <div>
                    <img alt="" src={item} style={{height:100 ,width:100, 'border-radius':'8px'}} />
                    <div style={{height:'1px', 'background-color':this.props.app_state.theme['line_color'], 'margin': '4px 5px 0px 5px'}}/>
                </div>
            )
        }else{
            return(
                <div>
                    <img alt="" src={item} style={{height:100 ,width:100, 'border-radius':'8px'}} />
                </div>
            )
        }
    }

    set_background_image(item){
        this.props.when_device_theme_image_changed(item)
    }



    

    when_theme_tags_updated(tag_group){
        this.setState({get_themes_tags_object: tag_group})

        var selected_item = this.get_selected_item(this.state.get_themes_tags_object, this.state.get_themes_tags_object['i'].active)

        if(selected_item == 'e'){
            selected_item = this.props.app_state.loc['1417']/* 'light' */
        }

        this.props.when_device_theme_changed(selected_item)
    }

    when_details_orientation_changed(tag_group){
        this.setState({get_orientation_tags_object: tag_group})
        var selected_item = this.get_selected_item(this.state.get_orientation_tags_object, this.state.get_orientation_tags_object['i'].active)

        if(selected_item == 'e'){
            selected_item = this.props.app_state.loc['1419']/* 'right' */
        }

        this.props.when_details_orientation_changed(selected_item)
    }

    when_get_selected_e5_tags_object_updated(tag_group){
        this.setState({get_selected_e5_tags_object:tag_group})

        var selected_item = this.get_selected_item(this.state.get_selected_e5_tags_object, 'e')

        this.props.when_selected_e5_changed(selected_item)
    }

    when_get_selected_storage_tags_object_updated(tag_group){
        this.setState({get_selected_storage_tags_object: tag_group})
        var selected_item = this.get_selected_item(this.state.get_selected_storage_tags_object, 'e')
        this.props.when_storage_option_changed(selected_item)
    }

    when_clear_cache_clicked(){
        this.props.clear_cache()
        localStorage.setItem("viewed", "");
        this.props.notify(this.props.app_state.loc['1549']/* 'Cache cleared.' */, 1900)
    }

    when_get_refresh_speed_tags_object_updated(tag_group){
        this.setState({get_refresh_speed_tags_object: tag_group})
        var selected_item = this.get_selected_item(this.state.get_refresh_speed_tags_object, 'e')
        this.props.when_refresh_speed_changed(selected_item)
    }

    when_get_masked_data_tags_object_updated(tag_group){
        this.setState({get_masked_data_tags_object: tag_group})
        var selected_item = this.get_selected_item(this.state.get_masked_data_tags_object, 'e')
        this.props.when_masked_data_setting_changed(selected_item)
    }


    when_get_content_channeling_object_updated(tag_group){
        this.setState({get_content_channeling_object: tag_group})
        var selected_item = this.get_selected_item(this.state.get_content_channeling_object, 'e')
        this.props.when_content_channeling_changed(selected_item)
    }


    when_get_content_language_object_updated(tag_group){
        this.setState({get_content_language_object: tag_group})
        var selected_item = this.get_selected_item(this.state.get_content_language_object, 'e')
        this.props.when_content_language_changed(selected_item)
    }

    when_get_content_filtered_setting_object_updated(tag_group){
        this.setState({get_content_filtered_setting_object: tag_group})
        var selected_item = this.get_selected_item(this.state.get_content_filtered_setting_object, 'e')
        this.props.when_content_filter_setting_changed(selected_item)
    }

    when_get_tabs_tags_object_updated(tag_group){
        this.setState({get_tabs_tags_object: tag_group})
        var selected_item = this.get_selected_item(this.state.get_tabs_tags_object, 'e')
        this.props.when_tabs_setting_changed(selected_item)
    }

    when_storage_permissions_object_updated(tag_group){
        this.setState({get_storage_permissions_tags_object: tag_group})
        var selected_item = this.get_selected_item(this.state.get_storage_permissions_tags_object, 'e')
        this.props.when_storage_permission_setting_changed(selected_item)
    }

    when_stack_optimizer_object_updated(tag_object){
        this.setState({get_stack_optimizer_tags_object: tag_object})
        var selected_item = this.get_selected_item(this.state.get_stack_optimizer_tags_object, 'e')
        this.props.when_stack_optimizer_setting_changed(selected_item)
        this.run_transactions(true, false)
    }

    when_homepage_tags_position_tags_object_updated(tag_group){
        this.setState({get_homepage_tags_position_tags_object: tag_group})
        var selected_item = this.get_selected_item(this.state.get_homepage_tags_position_tags_object, 'e')
        this.props.when_homepage_tags_position_tags_changed(selected_item)
    }

    when_get_preferred_font_tags_object_updated(tag_group){
        this.setState({get_preferred_font_tags_object: tag_group})
        var selected_item = this.get_selected_item(this.state.get_preferred_font_tags_object, 'e')
        this.props.when_preferred_font_tags_changed(selected_item)
    }

    when_get_skip_nsfw_warning_tags_object_updated(tag_object){
        this.setState({get_skip_nsfw_warning_tags_object: tag_object})
        var selected_item = this.get_selected_item(this.state.get_skip_nsfw_warning_tags_object, 'e')
        this.props.when_skip_nsfw_warning_tags_changed(selected_item)
    }

    when_get_graph_type_tags_object_updated(tag_object){
        this.setState({get_graph_type_tags_object: tag_object})
        var selected_item = this.get_selected_item(this.state.get_graph_type_tags_object, 'e')
        this.props.when_graph_type_tags_changed(selected_item)
    }

    when_get_remember_account_tags_object_updated(tag_object){
        this.setState({get_remember_account_tags_object: tag_object});
        var selected_item = this.get_selected_item(this.state.get_remember_account_tags_object, 'e')
        this.props.when_remember_account_tags_changed(selected_item)
    }

    when_get_hide_pip_tags_object_updated(tag_object){
        this.setState({get_hide_pip_tags_object: tag_object})
        var selected_item = this.get_selected_item(this.state.get_hide_pip_tags_object, 'e')
        this.props.when_hide_pip_tags_changed(selected_item)
    }

    when_get_preferred_currency_tags_object_updated(tag_object){
        this.setState({get_preferred_currency_tags_object: tag_object})
        var selected_item = this.get_selected_item(this.state.get_preferred_currency_tags_object, 'e')
        this.props.when_preferred_currency_tags_changed(selected_item)
    }

    when_get_minified_content_setting_object_updated(tag_object){
        this.setState({get_minified_content_setting_object: tag_object})
        var selected_item = this.get_selected_item(this.state.get_minified_content_setting_object, 'e')
        this.props.when_minified_content_setting_changed(selected_item)
    }

    when_get_auto_run_setting_object_updated(tag_object){
        this.setState({get_auto_run_setting_object: tag_object})
        var selected_item = this.get_selected_item(this.state.get_auto_run_setting_object, 'e')
        this.props.when_auto_run_setting_changed(selected_item)
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
                        <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}} onClick={()=>this.when_e5_clicked(item)}>
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
            <div>
                <div style={{height:57, width:85, 'background-color': background_color, 'border-radius': '8px','padding':'10px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
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
                    <div style={{height:'1px', 'background-color':this.props.app_state.theme['line_color'], 'margin': '3px 5px 0px 5px'}}/>
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
        if(this.state.can_switch_e5s == false){
            this.props.notify(this.props.app_state.loc['1593gr']/* Wait a bit.' */, 1200)
            return;
        }
        this.props.when_selected_e5_changed(item)
    }
















    render_wallet_settings_section(){
        var size = this.props.size

        if(size == 's'){
            return(
                <div style={{'padding': '0px 0px 0px 0px', 'margin':'0px 0px 0px 0px'}}>
                    {this.render_set_wallet_data()}
                    {this.render_detail_item('0')}

                    {this.render_wallet_settings_part()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row" style={{'padding': '0px 0px 0px 0px'}}>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_wallet_settings_part()}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_set_wallet_data()}
                        {this.render_detail_item('0')}
                        {this.render_my_balances()}
                    </div>
                </div>
                
            )
        }
        else if(size == 'l'){
            return(
                <div className="row" style={{'padding': '0px 0px 0px 0px'}}>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_wallet_settings_part()}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_set_wallet_data()}
                        {this.render_detail_item('0')}
                        {this.render_my_balances()}
                    </div>
                </div>
            )
        }
    }

    render_my_balances(){
        var items = this.get_my_balances()
        var coin_items = this.get_my_coin_balances()
        if(items.length == 0 && coin_items.length == 0){
            return(
                <div>
                    {this.render_empty_views(3)}
                </div> 
            )
        }
        return(
            <div style={{}}>
                <ul style={{ 'padding': '0px 0px 0px 0px', 'list-style':'none'}}>
                    {items.map((item, index) => (
                        <li style={{'padding': '3px 0px 3px 0px'}}>
                            <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.e5s[item].token, 'number':this.props.app_state.account_balance[item], 'relativepower':'wei'})}>
                                {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.e5s[item].token, 'subtitle':this.format_power_figure(this.props.app_state.account_balance[item]), 'barwidth':this.calculate_bar_width(this.props.app_state.account_balance[item]), 'number':this.format_account_balance_figure(this.props.app_state.account_balance[item]), 'barcolor':'', 'relativepower':'wei', })}
                            </div>
                        </li>
                    ))}
                </ul>
                <ul style={{ 'padding': '0px 0px 0px 0px', 'list-style':'none'}}>
                    {coin_items.map((item, index) => (
                        <li style={{'padding': '3px 0px 3px 0px'}}>
                            <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':item['title'], 'number':item['balance'], 'relativepower':item['base_unit']})}>
                                {this.render_detail_item('2', { 'style':'l', 'title':item['title'], 'subtitle':this.format_power_figure(item['balance']), 'barwidth':this.calculate_bar_width(item['balance']), 'number':this.format_account_balance_figure(item['balance']), 'barcolor':'', 'relativepower':item['base_unit'], })}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        )
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


    render_my_balances_if_small_screen_size(){
        var size = this.props.size
        if(size == 's'){
            return(
                <div>
                    {this.render_my_balances_horizontal()}
                </div>
            )
        }
    }

    render_my_balances_horizontal(){
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
                        {/* {items2.map(() => (
                            <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}}>
                                {this.render_empty_horizontal_list_item2()}
                            </li>
                        ))} */}
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




    render_set_wallet_data(){
        return(
            <div>
                {this.render_wallet_address()}
                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '20px 0px 5px 0px','border-radius': '8px' }}>
                        <p style={{'color': this.props.theme['primary_text_color'], 'font-size': '11px', height: 7, 'margin':'0px 0px 20px 10px', 'font-family': this.props.app_state.font}} className="fw-bold">{this.props.app_state.loc['1593b']/* Wallet Balance in Ether and Wei */}</p>
                        {this.render_detail_item('2', this.get_balance_amount_in_wei())}
                        {this.render_detail_item('2', this.get_balance_amount_in_ether())}
                </div>
                <div style={{height: 10}}/>
                
                {this.render_reload_wallet_if_wallet_is_set()}
                <div style={{height: 10}}/>
                {this.render_my_balances_if_small_screen_size()}
            </div>
        )
    }

    render_reload_wallet_if_wallet_is_set(){
        if(this.props.app_state.has_wallet_been_set || this.props.app_state.accounts[this.props.app_state.selected_e5] != null){
            return(
                <div style={{'padding':'0px 5px 0px 5px'}} onClick={() => this.props.get_wallet_data_for_specific_e5(this.props.app_state.selected_e5)}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['2449']/* reload wallet' */, 'action': ''})}
                </div>
            )
        }
    }

    render_wallet_address(){
        var ether_name = this.props.app_state.e5s[this.props.app_state.selected_e5].token
        if(this.props.app_state.has_wallet_been_set || this.props.app_state.has_account_been_loaded_from_storage){
            return(
                <div>
                    <div onClick={() => this.copy_to_clipboard(this.get_account_address())}>
                        {this.render_detail_item('3', {'title':ether_name+' '+this.props.app_state.loc['1550']/* 'Wallet Address' */, 'details':this.get_account_address(), 'size':'l'})}
                    </div>
                    <div style={{height: 10}}/>
                </div>
            )
        }else{
            return(
                <div>
                    <div>
                        {this.render_detail_item('3', {'title':ether_name+' '+this.props.app_state.loc['1550']/* 'Wallet Address' */, 'details':this.format_address('0x0000000000000000000000000000000000000000', this.props.app_state.selected_e5), 'size':'l'})}
                    </div>
                    <div style={{height: 10}}/>
                </div>
            )
        }
    }


    render_wallet_settings_part(){
        var size = this.props.size
        var w = size == 's' ? '95%' : '99%'
        return(
            <div>
                {this.render_detail_item('3',{'title':this.props.app_state.loc['1551']/* 'Wallet Seed' */, 'details':this.props.app_state.loc['1552']/* 'Set your preferred seed. Type a word then click add to add a word, or tap the word to remove' */, 'size':'l'})}
                <div style={{height: 10}}/>
                
                <div className="row" style={{width:w, 'margin':'0px 0px 0px 1px'}}>
                    <div className="col-11" style={{'margin': '0px 0px 0px 0px'}}>
                        <TextInput font={this.props.app_state.font} height={30} placeholder={this.props.app_state.loc['1553']/* 'Enter word...' */} when_text_input_field_changed={this.when_text_input_field_changed.bind(this)} text={this.state.typed_word} theme={this.props.theme}/>
                    </div>
                    <div className="col-1" style={{'padding': '0px 10px 0px 0px'}}>
                        <div className="text-end" style={{'padding': '5px 0px 0px 0px'}} >
                            <img className="text-end" onClick={()=>this.when_add_word_button_tapped()} src={this.props.theme['add_text']} style={{height:37, width:'auto'}} />
                        </div>
                    </div>
                </div>

                {this.render_detail_item('1',{'active_tags':this.state.added_tags, 'indexed_option':'indexed', 'when_tapped':'delete_entered_seed_word', 'masked':true})}

                {this.render_detail_item('0')}

                {this.render_detail_item('3',{'title':this.props.app_state.loc['1554']/* 'Wallet Salt' */, 'details':this.props.app_state.loc['1555']/* 'Set the preferred salt for your wallet' */, 'size':'l'})}
                <NumberPicker clip_number={this.props.app_state.clip_number} font={this.props.app_state.font} number_limit={bigInt('1e999')} when_number_picker_value_changed={this.when_new_salt_figure_set.bind(this)} theme={this.props.theme} power_limit={990}/>

                {this.render_detail_item('0')}

                {this.render_detail_item('3',{'title':this.props.app_state.loc['1556']/* 'Wallet Thyme' */, 'details':this.props.app_state.loc['1557']/* 'Set the preferred thyme for your wallet' */, 'size':'l'})}
                <div style={{height: 10}}/>
                <Tags font={this.props.app_state.font} page_tags_object={this.state.get_wallet_thyme_tags_object} tag_size={'l'} when_tags_updated={this.when_thyme_tags_updated.bind(this)} theme={this.props.theme}/>
                <div style={{height: 10}}/>
                
                <div style={{'padding':'0px 5px 0px 5px'}}>
                    {this.render_detail_item('5',{'text':this.props.app_state.loc['1558']/* 'Set Wallet' */,'action':'when_set_wallet_button_tapped'})}
                </div>
                {this.render_detail_item('0')}
                {this.render_detail_item('0')}
            </div>
        )
    }

    when_thyme_tags_updated(tag_group){
        this.setState({get_wallet_thyme_tags_object: tag_group})
    }

    when_new_salt_figure_set(number){
        this.setState({set_salt: number})
    }

    when_set_wallet_button_tapped(){
        var selected_item = this.get_selected_item(this.state.get_wallet_thyme_tags_object, this.state.get_wallet_thyme_tags_object['i'].active)

        if(selected_item == 'e'){
            selected_item = 'a'
        }

        if(this.state.added_tags.length == 0){
            this.props.notify(this.props.app_state.loc['1559']/* 'Set your wallets seed.' */, 4600)
        }
        else if(this.state.set_salt == 0){
            this.props.notify(this.props.app_state.loc['1560']/* 'Please set a salt.' */, 4200)
        }
        else{
            this.props.notify(this.props.app_state.loc['1561']/* 'Setting your wallet.' */, 5500)

            var me = this;
            setTimeout(function() {
                me.props.when_wallet_data_updated2(me.state.added_tags, me.state.set_salt, selected_item, false)
            }, (1 * 900));
        }
        
    }


    when_text_input_field_changed(text){
        this.setState({typed_word: text})
    }

    when_add_word_button_tapped(){
        var typed_word = this.state.typed_word.trim();

        if(typed_word == ''){
            this.props.notify(this.props.app_state.loc['1562']/* 'Type something.' */, 1400)
        }
        else if(this.hasWhiteSpace(typed_word)){
            this.props.notify(this.props.app_state.loc['1563']/* 'Enter one word.' */, 1400)
        }
        else{
            var cloned_seed_array = this.state.added_tags.slice()
            cloned_seed_array.push(typed_word)
            this.setState({added_tags: cloned_seed_array, typed_word:''})
            // this.props.notify('word added', 800)
        }
    }

    delete_entered_seed_word(word, pos){
        var cloned_seed_array = this.state.added_tags.slice()
        const index = cloned_seed_array.indexOf(word);
        if (index > -1) { // only splice array when item is found
            cloned_seed_array.splice(index, 1); // 2nd parameter means remove one item only
        }
        this.setState({added_tags: cloned_seed_array})
    }

    hasWhiteSpace(s) {
        return s.indexOf(' ') >= 0;
    }


    copy_to_clipboard(signature_data){
        navigator.clipboard.writeText(signature_data)
        this.props.notify(this.props.app_state.loc['1564']/* 'Copied address to clipboard.' */, 3600)
    }

    get_account_address(){
        if(this.props.app_state.accounts[this.props.app_state.selected_e5] != null){
            return this.format_address(this.props.app_state.accounts[this.props.app_state.selected_e5].address, this.props.app_state.selected_e5);
        }
    }

    format_address(address, e5){
        if(e5 == 'E45'){
            return toBech32(address)
        }
        else if(e5 == 'E115'){
            return this.replace_0x_with_xdc(address)
        }
        // else if(e5 == 'E175'){
        //     return ethToEvmos(address)
        // }
        else if(e5 == 'E425'){
            return this.convert_to_iotx(address)
        }
        return address
    }

    replace_0x_with_xdc(address){
        return 'xdc'+address.toString().slice(2)
    }

    convert_to_iotx(address){
        const addr = from(address.toString());
        return addr.string();
    }

    get_balance_amount_in_wei(){
        return{
            'style':'s',
            'title':'',
            'subtitle':'',
            'barwidth':this.calculate_bar_width(this.props.app_state.account_balance[this.props.app_state.selected_e5]),
            'number':this.format_account_balance_figure(this.props.app_state.account_balance[this.props.app_state.selected_e5]),
            'barcolor':'#606060',
            'relativepower':'wei',
        }
    }


    get_balance_amount_in_ether(){
        return{
            'style':'s',
            'title':'',
            'subtitle':'',
            'barwidth':this.calculate_bar_width(this.props.app_state.account_balance[this.props.app_state.selected_e5]/10**18),
            'number':this.props.app_state.account_balance[this.props.app_state.selected_e5]/10**18,
            'barcolor':'#606060',
            'relativepower':'ether',
        }
    }













    render_contacts_section(){
        var size = this.props.size
        if(size == 's'){
            return(
                <div>
                    {this.render_new_contact_ui()}
                    {this.render_users_contacts()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_new_contact_ui()}
                        {this.render_users_contacts()}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_empty_views(3)}
                    </div>
                </div>
                
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_new_contact_ui()}
                        {this.render_users_contacts()}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_empty_views(3)}
                    </div>
                </div>
                
            )
        }
    }

    render_new_contact_ui(){
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['1565']/* 'Add Contact' */, 'details':this.props.app_state.loc['1566']/* 'You can add a contact manually using their Contact ID.' */, 'size':'l'})}
                <div style={{height: 10}}/>

                <div className="row" style={{width:'100%'}}>
                    <div className="col-11" style={{'margin': '0px 0px 0px 0px'}}>
                        <TextInput font={this.props.app_state.font} height={30} placeholder={this.props.app_state.loc['1567']/* 'Enter Account ID...' */} when_text_input_field_changed={this.when_add_contacts_changed.bind(this)} text={this.state.typed_contact_word} theme={this.props.theme}/>
                    </div>
                    <div className="col-1" style={{'padding': '0px 10px 0px 0px'}} onClick={()=> this.add_cotact_to_list()} >
                        <div className="text-end" style={{'padding': '5px 0px 0px 0px'}} >
                            <img className="text-end" src={this.props.theme['add_text']} style={{height:37, width:'auto'}} />
                        </div>
                    </div>
                </div>
                <div style={{height: 10}}/>
            </div>
        )
    }

    when_add_contacts_changed(text){
        this.setState({typed_contact_word: text})
    }

    add_cotact_to_list(){
        var typed_contact = this.get_typed_alias_id(this.state.typed_contact_word.trim())

        if(isNaN(typed_contact) || typed_contact =='' || parseInt(typed_contact)<1001){
            this.props.notify(this.props.app_state.loc['1569']/* 'That ID is not valid' */, 800)
        }
        else if(!this.props.app_state.has_wallet_been_set){
            this.props.notify(this.props.app_state.loc['1571']/* 'Please set your wallet first.' */, 1200);
        }
        else{
            this.props.add_account_to_contacts(parseInt(typed_contact), this.props.app_state.selected_e5)
            this.setState({typed_contact_word:''})
        }
    }

    render_users_contacts(){
        // var items = this.props.app_state.contacts[this.props.app_state.selected_e5];
        var items = this.get_all_sorted_objects_mappings(this.props.app_state.contacts)
        if(items == null){
            items = []
        }
        items = [].concat(items)

        var middle = this.props.height-100;
        var size = this.props.size;
        if(size == 'm'){
            middle = this.props.height-100;
        }

        if(items.length == 0){
            items = [0, 0]
            return(
                <div style={{}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.map((item, index) => (
                            <li style={{'padding': '2px'}} onClick={()=>console.log()}>
                                <div style={{height:60, width:'100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px','padding':'10px 0px 10px 10px', 'max-width':'420px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                                    <div style={{'margin':'10px 20px 10px 0px'}}>
                                        <img src={this.props.app_state.theme['letter']} style={{height:30 ,width:'auto'}} />
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }else{
            return(
                <div style={{}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px', 'listStyle':'none'}}>
                        {items.map((item, index) => (
                            <SwipeableList>
                                <SwipeableListItem
                                    swipeLeft={{
                                    content: <p style={{'color': this.props.theme['primary_text_color']}}>{this.props.app_state.loc['2751']/* Delete */}</p>,
                                    action: () =>this.props.remove_account_from_contacts(item)
                                    }}>
                                    <div style={{width:'100%', 'background-color':this.props.theme['send_receive_ether_background_color']}}>
                                        <li style={{'padding': '2px'}} onClick={()=>this.when_message_clicked(item)}>
                                            {this.render_detail_item('3', {'title':item['id']+' • '+this.get_senders_name(item['id'], item['e5']), 'details':''+item['address'], 'size':'s'})}
                                        </li>
                                    </div>
                                </SwipeableListItem>
                            </SwipeableList>
                            
                        ))}
                    </ul>
                </div>
            )
        }
    }

    get_senders_name(sender, provided_e5){
        if(sender == null) return sender
        var e5 = provided_e5 == null ? this.props.app_state.selected_e5 : provided_e5
        var obj = this.props.app_state.alias_bucket[e5] == null ? {} : this.props.app_state.alias_bucket[e5]
        var alias = (obj[sender] == null ? sender : obj[sender])
        return alias
    }


    when_message_clicked = (item) => {
        let me = this;
        if(Date.now() - this.last_all_click_time < 200){
            //double tap
            // me.copy_id_to_clipboard(item['id'])
            me.copy_address_to_clipboard(item['address'])
            clearTimeout(this.all_timeout);
        }else{
            this.all_timeout = setTimeout(function() {
                clearTimeout(this.all_timeout);
                // single tap
                
            }, 200);
        }
        this.last_all_click_time = Date.now();
    }


    copy_address_to_clipboard(text){
        navigator.clipboard.writeText(text)
        this.props.notify(this.props.app_state.loc['1564']/* 'Copied address to clipboard.' */, 1600)
    }

    copy_id_to_clipboard(text){
        navigator.clipboard.writeText(text)
        this.props.notify(this.props.app_state.loc['1572']/* 'Copied ID to clipboard.' */, 1600)
    }









    render_blacklisted_section(){
        var size = this.props.size
        if(size == 's'){
            return(
                <div>
                    {this.render_blacklisted_picker_ui()}
                    {this.render_users_blocked_accounts()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_blacklisted_picker_ui()}
                        {this.render_users_blocked_accounts()}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_empty_views(3)}
                    </div>
                </div>
                
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_blacklisted_picker_ui()}
                        {this.render_users_blocked_accounts()}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_empty_views(3)}
                    </div>
                </div>
                
            )
        }
    }

    render_blacklisted_picker_ui(){
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['1573']/* 'Add Blocked Account' */, 'details':this.props.app_state.loc['1574']/* 'Block an accounts content from being visible in your feed.' */, 'size':'l'})}
                <div style={{height: 10}}/>

                <div className="row" style={{width:'100%'}}>
                    <div className="col-11" style={{'margin': '0px 0px 0px 0px'}}>
                        <TextInput font={this.props.app_state.font} height={30} placeholder={this.props.app_state.loc['1575']/* 'Enter Account ID...' */} when_text_input_field_changed={this.when_add_blocked_account_changed.bind(this)} text={this.state.typed_blocked_account_word} theme={this.props.theme}/>
                    </div>
                    <div className="col-1" style={{'padding': '0px 10px 0px 0px'}} onClick={()=> this.add_blocked_account_to_list()} >
                        <div className="text-end" style={{'padding': '5px 0px 0px 0px'}} >
                            <img className="text-end" src={this.props.theme['add_text']} style={{height:37, width:'auto'}} />
                        </div>
                    </div>
                </div>
                <div style={{height: 10}}/>
            </div>
        )
    }

    when_add_blocked_account_changed(text){
        this.setState({typed_blocked_account_word: text})
    }

    add_blocked_account_to_list(){
        var typed_contact = this.get_typed_alias_id(this.state.typed_blocked_account_word.trim())

        if(isNaN(typed_contact) || typed_contact =='' || parseInt(typed_contact)<1001){
            this.props.notify(this.props.app_state.loc['1576']/* 'That ID is not valid.' */, 3800)
        }
        else if(!this.props.app_state.has_wallet_been_set){
            this.props.notify(this.props.app_state.loc['1577']/* 'Please set your wallet first.' */, 3200);
        }
        else{
            this.props.add_account_to_blocked_list(parseInt(typed_contact), this.props.app_state.selected_e5)
            this.setState({typed_blocked_account_word:''})
        }
    }

    render_users_blocked_accounts(){
        // var items = this.props.app_state.blocked_accounts[this.props.app_state.selected_e5];
        var items = this.get_all_sorted_objects_mappings(this.props.app_state.blocked_accounts)
        if(items == null){
            items = []
        }
        items = [].concat(items)
        var middle = this.props.height-100;
        var size = this.props.size;
        if(size == 'm'){
            middle = this.props.height-100;
        }

        if(items.length == 0){
            items = [0, 0]
            return(
                <div style={{}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.map((item, index) => (
                            <li style={{'padding': '2px'}} onClick={()=>console.log()}>
                                <div style={{height:60, width:'100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px','padding':'10px 0px 10px 10px', 'max-width':'420px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                                    <div style={{'margin':'10px 20px 10px 0px'}}>
                                        <img src={this.props.app_state.theme['letter']} style={{height:30 ,width:'auto'}} />
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }else{
            return(
                <div style={{}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px', 'listStyle':'none'}}>
                        {items.map((item, index) => (
                            <SwipeableList>
                                <SwipeableListItem
                                    swipeLeft={{
                                    content: <p style={{'color': this.props.theme['primary_text_color']}}>{this.props.app_state.loc['2751']/* Delete */}</p>,
                                    action: () =>this.props.remove_account_from_blocked_accounts(item)
                                    }}>
                                    <div style={{width:'100%', 'background-color':this.props.theme['send_receive_ether_background_color']}}>
                                        <li style={{'padding': '2px'}} onClick={()=>this.when_message_clicked(item)}>
                                            {this.render_detail_item('3', {'title':item['id']+' • '+this.get_senders_name(item['id'], item['e5']), 'details':''+item['address'], 'size':'s'})}
                                        </li>
                                    </div>
                                </SwipeableListItem>
                            </SwipeableList>
                            
                        ))}
                    </ul>
                </div>
            )
        }
    }

    get_typed_alias_id(alias){
        if(!isNaN(alias)){
            return alias
        }
        var id = (this.props.app_state.alias_owners[this.props.app_state.selected_e5][alias] == null ? alias : this.props.app_state.alias_owners[this.props.app_state.selected_e5][alias])

        return id
    }







    render_alias_stuff(){
        var size = this.props.size
        if(size == 's'){
            return(
                <div>
                    {this.render_alias_picker_ui()}
                    {this.render_users_aliases()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_alias_picker_ui()}
                        {this.render_users_aliases()}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_empty_views(3)}
                    </div>
                </div>
                
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_alias_picker_ui()}
                        {this.render_users_aliases()}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_empty_views(3)}
                    </div>
                </div>
                
            )
        }
    }

    render_alias_picker_ui(){
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['1578']/* 'Reserve Alias' */, 'details':this.props.app_state.loc['1579']/* 'Reserve an alias for your account ID' */, 'size':'l'})}
                <div style={{height:10}}/>
                <div className="row" style={{width:'100%'}}>
                    <div className="col-11" style={{'margin': '0px 0px 0px 0px'}}>
                        <TextInput font={this.props.app_state.font} height={30} placeholder={this.props.app_state.loc['1580']/* 'Enter New Alias Name...' */} when_text_input_field_changed={this.when_typed_alias_changed.bind(this)} text={this.state.typed_alias_word} theme={this.props.theme}/>
                    </div>
                    <div className="col-1" style={{'padding': '0px 10px 0px 0px'}} onClick={()=>this.reserve_alias()} >
                        <div className="text-end" style={{'padding': '5px 0px 0px 0px'}} >
                            <img className="text-end" src={this.props.theme['add_text']} style={{height:37, width:'auto'}} />
                        </div>
                    </div>
                </div>

                <div style={{height:10}}/>
                {/* {this.render_detail_item('3', {'title':this.state.typed_alias_word, 'details':'Typed Alias', 'size':'l'})} */}
                {this.render_detail_item('10',{'font':this.props.app_state.font, 'textsize':'10px','text':this.props.app_state.loc['124']/* 'remaining character count: ' */+(this.props.app_state.tag_size - this.state.typed_alias_word.length)})}

                {this.render_detail_item('0')}
                {this.render_my_account_id()}
                <div style={{height:10}}/>

                {this.render_picked_alias_if_any()}
                
                <div style={{height:10}}/>
            </div>
        )
    }

    render_picked_alias_if_any(){
        var stack = this.props.app_state.stack_items
        var picked_alias = ''
        for(var i=0; i<stack.length; i++){
            if(stack[i].type == this.props.app_state.loc['1582']/* 'alias' */){
                picked_alias = stack[i].alias
                break;
            }
        }

        if(picked_alias != ''){
            return(
                <div>
                    {this.render_detail_item('3', {'title':picked_alias, 'details':this.props.app_state.loc['1583']/* 'Stacked Alias' */, 'size':'l'})}
                </div>
            )
        }
    }

    when_typed_alias_changed(text){
        this.setState({typed_alias_word: text.toLowerCase()})
    }

    render_my_account_id(){
        var display = this.props.app_state.user_account_id[this.props.app_state.selected_e5] == 1 ? '0000' : this.props.app_state.user_account_id[this.props.app_state.selected_e5]
        
        var obj = this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)
        var alias = (obj[this.props.app_state.user_account_id[this.props.app_state.selected_e5]] == null ? this.props.app_state.loc['1584']/* 'Alias Unknown' */ : obj[this.props.app_state.user_account_id[this.props.app_state.selected_e5]])
        return(
            <div>
                {/* {this.render_detail_item('3', {'title':display, 'details':alias, 'size':'l'})} */}
                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                    {this.render_detail_item('10', {'text':display, 'textsize':'30px', 'font':this.props.app_state.font})}
                    <div style={{'padding':'0px 0px 0px 5px'}}>
                        {this.render_detail_item('10', {'text':alias, 'textsize':'12px', 'font':this.props.app_state.font})} 
                    </div>
                </div>
            </div>
            
        )
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


    reserve_alias(){
        var typed_word = this.state.typed_alias_word.trim()
        
        if(typed_word == ''){
            this.props.notify(this.props.app_state.loc['128']/* 'Type something.' */, 3400)
        }
        else if(this.hasWhiteSpace(typed_word)){
            this.props.notify(this.props.app_state.loc['129']/* 'Enter one word.' */, 3400)
        }
        else if(!this.onlyLettersAndNumbers(typed_word)){
            this.props.notify(this.props.app_state.loc['1593h']/* 'Special characters are not allowed.' */, 5400)
        }
        else if(typed_word.length > 23){
            this.props.notify(this.props.app_state.loc['1586']/* 'That alias is too long.' */, 3900)
        }
        else if(typed_word.length < 3){
            this.props.notify(this.props.app_state.loc['1587']/* 'That alias is too short.' */, 3900)
        }
        else if(this.props.app_state.user_account_id[this.props.app_state.selected_e5] < 1000){
            this.props.notify(this.props.app_state.loc['1588']/* 'You need to make at least 1 transaction to reserve an alias.' */, 6200)
        }
        else if(this.get_all_sorted_objects_mappings(this.props.app_state.alias_owners)[typed_word] != null){
            this.props.notify(this.props.app_state.loc['1589']/* 'That alias has already been reserved.' */, 4400)
        }
        else if(this.is_word_reserved(typed_word)){
            this.props.notify(this.props.app_state.loc['1590']/* 'That word is reserved, you cant use it.' */, 5000)
        }
        else if(this.does_stack_contain_reserve_action()){
            this.props.notify(this.props.app_state.loc['1593aa']/* 'You cant reserve more than one alias in one run.' */, 5000)
        }
        else{
            this.props.add_alias_transaction_to_stack(this.state.typed_alias_word)
            this.setState({typed_alias_word: ''})
        }
    }

    is_word_reserved(typed_word){
        var obj = [this.props.app_state.loc['1591']/* 'Unknown' */, this.props.app_state.loc['1592']/* 'Alias Unknown' */, this.props.app_state.loc['1694']/* 'You' */, this.props.app_state.loc['311m']/* 'Hidden' */]
        if(obj.includes(typed_word)){
            return true
        }
        return false
    }

    does_stack_contain_reserve_action(){
        var does_stack_contain_reserve = false
        var txs = this.props.app_state.stack_items
        for(var i=0; i<txs.length; i++){
            if(txs[i].type == this.props.app_state.loc['1506']/* 'alias' */){
                does_stack_contain_reserve = true
            }
        }

        return does_stack_contain_reserve
    }

    onlyLettersAndNumbers(str) {
        return /^[A-Za-z0-9]*$/.test(str);
    }


    render_users_aliases(){
        var data = this.props.app_state.my_alias_events[this.props.app_state.selected_e5]
        if(data == null){
            data = []
        }
        var items = [].concat(data);
        var middle = this.props.height-100;
        var size = this.props.size;
        if(size == 'm'){
            middle = this.props.height-100;
        }
        
        if(items.length == 0){
            items = [0, 0]
            return(
                <div style={{}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.map((item, index) => (
                            <li style={{'padding': '2px'}} onClick={()=>console.log()}>
                                <div style={{height:60, width:'100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px','padding':'10px 0px 10px 10px', 'max-width':'420px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                                    <div style={{'margin':'10px 20px 10px 0px'}}>
                                        <img src={this.props.app_state.theme['letter']} style={{height:30 ,width:'auto'}} />
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }else{
            return(
                <div style={{}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px', 'listStyle':'none'}}>
                        {items.reverse().map((item, index) => (
                            <SwipeableList>
                                <SwipeableListItem
                                    swipeRight={{
                                    content: <p style={{'color': this.props.theme['primary_text_color']}}>{this.props.app_state.loc['2749']/* Set Alias */}</p>,
                                    action: () => this.reset_alias(item)
                                    }}
                                    swipeLeft={{
                                    content: <p style={{'color': this.props.theme['primary_text_color']}}>{this.props.app_state.loc['2750']/* Release */}</p>,
                                    action: () =>this.unreserve_alias(item)
                                    }}>
                                    <div style={{width:'100%', 'background-color':this.props.theme['send_receive_ether_background_color']}}>
                                        <li style={{'padding': '2px'}} onClick={()=> console.log()}>
                                            {this.render_detail_item('3', {'title':''+item['alias'], 'details':this.props.app_state.loc['1593']/* 'Reserved ' */+this.get_time_difference(item['event'].returnValues.p6)+' ago', 'size':'s'})}
                                        </li>
                                    </div>
                                </SwipeableListItem>
                            </SwipeableList>
                            
                        ))}
                    </ul>
                </div>
            )
        }
    }


    unreserve_alias(item){
        this.props.unreserve_alias_transaction_to_stack(item)
    }

    reset_alias(item){
        this.props.reset_alias_transaction_to_stack(item)
    }











    render_notifications(){
        var size = this.props.size
        if(size == 's'){
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['1593e']/* 'My Notifications.' */, 'details':this.props.app_state.loc['1593f']/* 'All your important notifications are shown below.' */, 'size':'l'})}
                    <div style={{height: 10}}/>
                    {this.render_my_notifications()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_detail_item('3', {'title':this.props.app_state.loc['1593e']/* 'My Notifications.' */, 'details':this.props.app_state.loc['1593f']/* 'All your important notifications are shown below.' */, 'size':'l'})}
                        <div style={{height: 10}}/>
                        {this.render_my_notifications()}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_empty_views(3)}
                    </div>
                </div>
                
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_detail_item('3', {'title':this.props.app_state.loc['1593e']/* 'My Notifications.' */, 'details':this.props.app_state.loc['1593f']/* 'All your important notifications are shown below.' */, 'size':'l'})}
                        <div style={{height: 10}}/>
                        {this.render_my_notifications()}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_empty_views(3)}
                    </div>
                </div>
                
            )
        }
    }

    get_all_sorted_notifications(){
        // var my_job_responses_notifications = this.get_all_sorted_objects_mappings(this.props.app_state.my_job_responses_notifications)

        // var my_job_application_responses_notifications = this.get_all_sorted_objects_mappings(this.props.app_state.my_job_application_responses_notifications)

        // var my_contractor_job_request_notifications = this.get_all_sorted_objects_mappings(this.props.app_state.my_contractor_job_request_notifications)

        var my_token_event_notifications = this.get_all_sorted_objects_mappings(this.props.app_state.my_token_event_notifications)

        // var my_bag_responses_notifications = this.get_all_sorted_objects_mappings(this.props.app_state.my_bag_responses_notifications)

        // var my_bag_application_responses_notifications = this.get_all_sorted_objects_mappings(this.props.app_state.my_bag_application_responses_notifications)

        // var enter_exit_accounts_notifications = this.get_all_sorted_objects_mappings(this.props.app_state.enter_exit_accounts_notifications)

        // var my_store_direct_purchases_notifications = this.get_all_sorted_objects_mappings(this.props.app_state.my_store_direct_purchases_notifications)

        // var my_mail_messages_notifications = this.get_all_sorted_objects_mappings(this.props.app_state.received_mail_notifications)


        var all_object_list = []
        // for (const key in my_job_responses_notifications) {
        //     all_object_list.push(my_job_responses_notifications[key])
        // }
        // for (const key in my_job_application_responses_notifications) {
        //     all_object_list.push(my_job_application_responses_notifications[key])
        // }
        // for (const key in my_contractor_job_request_notifications) {
        //     all_object_list.push(my_contractor_job_request_notifications[key])
        // }
        for (const key in my_token_event_notifications) {
            all_object_list.push(my_token_event_notifications[key])
        }
        // for (const key in my_bag_responses_notifications) {
        //     all_object_list.push(my_bag_responses_notifications[key])
        // }
        // for (const key in my_bag_application_responses_notifications) {
        //     all_object_list.push(my_bag_application_responses_notifications[key])
        // }
        // for (const key in enter_exit_accounts_notifications) {
        //     all_object_list.push(enter_exit_accounts_notifications[key])
        // }
        // for (const key in my_store_direct_purchases_notifications) {
        //     all_object_list.push(my_store_direct_purchases_notifications[key])
        // }
        // for(const key in my_mail_messages_notifications){
        //     all_object_list.push(my_mail_messages_notifications[key])
        // }

        var sorted_notifs = this.sortByAttributeDescending(all_object_list, 'timestamp')
        // console.log('sorted notifications: ', sorted_notifs)

        return sorted_notifs
    }

    render_my_notifications(){
        var items = [].concat(this.get_all_sorted_notifications())
        if(items == null){
            items = []
        }
        items = [].concat(items)
        var middle = this.props.height-150;
        var size = this.props.size;
        if(size == 'm'){
            middle = this.props.height-150;
        }

        if(items.length == 0){
            items = [0, 0]
            return(
                <div style={{}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.map((item, index) => (
                            <li style={{'padding': '2px'}} onClick={()=>console.log()}>
                                <div style={{height:60, width:'100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px','padding':'10px 0px 10px 10px', 'max-width':'420px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                                    <div style={{'margin':'10px 20px 10px 0px'}}>
                                        <img src={this.props.app_state.theme['letter']} style={{height:30 ,width:'auto'}} />
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }else{
            return(
                <div style={{}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px', 'listStyle':'none'}}>
                        {items.map((item, index) => (
                            <div style={{'margin':'3px 0px 3px 0px'}}>
                                {this.render_notification_item(item, index)}
                            </div>
                        ))}
                    </ul>
                </div>
            )
        }
    }

    render_notification_item(item, index){
        if(item['type'] == 'token_event_notification'){
            var sender = item['event'].returnValues.p2
            var amount = item['event'].returnValues.p4
            var depth = item['event'].returnValues.p7
            var exchange = item['event'].returnValues.p1
            var timestamp = item['event'].returnValues.p5
            return(
                <div onClick={() => this.props.view_number({'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[item['e5']+exchange], 'number':this.get_actual_number(amount, depth), 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[exchange]})} /* onClick={() => this.open_object(exchange, item['e5'], 'token')} */>
                    {this.render_detail_item('3', {'title':'💸 '+this.get_senders_name_or_you(sender, item['e5'])+' sent you '+this.format_account_balance_figure(this.get_actual_number(amount, depth))+' '+this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[exchange], 'details':''+(new Date(timestamp*1000))+', '+(this.get_time_difference(timestamp))+this.props.app_state.loc['1698a']/* ago. */, 'size':'s'})}
                </div>
            )
        }
        else if(item['type'] == 'my_job_application_response_notification'){
            var timestamp = item['timestamp']
            var sender = item['event'].returnValues.p2
            var job_id = item['event'].returnValues.p1
            return(
                <div onClick={() => this.open_object(job_id, item['e5'], 'job')}>
                    {this.render_detail_item('3', {'title':'💼 '+this.get_senders_name_or_you(sender, item['e5'])+' selected your application for the job '+job_id, 'details':''+(new Date(timestamp*1000))+', '+(this.get_time_difference(timestamp))+this.props.app_state.loc['1698a']/* ago. */, 'size':'s'})}
                </div>
            )
        }
        else if(item['type'] == 'job_response_notification'){
            var timestamp = item['timestamp']
            var sender = item['event'].returnValues.p2
            var job_id = item['event'].returnValues.p1
            return(
                <div onClick={() => this.open_object(job_id, item['e5'], 'job')}>
                    {this.render_detail_item('3', {'title':'💼 '+this.get_senders_name_or_you(sender, item['e5'])+' applied for your job '+job_id, 'details':''+(new Date(timestamp*1000))+', '+(this.get_time_difference(timestamp))+this.props.app_state.loc['1698a']/* ago. */, 'size':'s'})}
                </div>
            )
        }
        else if(item['type'] == 'bag_response_notification'){
            var timestamp = item['timestamp']
            var sender = item['event'].returnValues.p2
            var bag_id = item['event'].returnValues.p1
            return(
                <div onClick={() => this.open_object(bag_id, item['e5'], 'bag')}>
                    {this.render_detail_item('3', {'title':'🛍 '+this.get_senders_name_or_you(sender, item['e5'])+' requested to fulfil your bag '+bag_id, 'details':''+(new Date(timestamp*1000))+', '+(this.get_time_difference(timestamp))+this.props.app_state.loc['1698a']/* ago. */, 'size':'s'})}
                </div>
            )
        }
        else if(item['type'] == 'my_bag_application_response_notification'){
            var timestamp = item['timestamp']
            var sender = item['event'].returnValues.p2
            var bag_id = item['event'].returnValues.p1
            return(
                <div onClick={() => this.open_object(bag_id, item['e5'], 'bag')}>
                    {this.render_detail_item('3', {'title':'🛍 '+this.get_senders_name_or_you(sender, item['e5'])+' selected you to fulfil their bag '+bag_id, 'details':''+(new Date(timestamp*1000))+', '+(this.get_time_difference(timestamp))+this.props.app_state.loc['1698a']/* ago. */, 'size':'s'})}
                </div>
            )
        }
        else if(item['type'] == 'contractor_request_notification'){
            var timestamp = item['timestamp']
            var sender = item['event'].returnValues.p2
            var contractor_id = item['event'].returnValues.p1
            return(
                <div onClick={() => this.open_object(contractor_id, item['e5'], 'contractor')}>
                    {this.render_detail_item('3', {'title':'👷🏻‍♀️ '+this.get_senders_name_or_you(sender, item['e5'])+' sent a job request to your contractor post '+contractor_id, 'details':''+(new Date(timestamp*1000))+', '+(this.get_time_difference(timestamp))+this.props.app_state.loc['1698a']/* ago. */, 'size':'s'})}
                </div>
            )
        }
        else if(item['type'] == 'contract_entry_notification'){
            var timestamp = item['event'].returnValues.p7
            var sender = item['event'].returnValues.p2
            var contract_id = item['event'].returnValues.p1
            return(
                <div onClick={() => this.open_object(contract_id, item['e5'], 'contract')}>
                    {this.render_detail_item('3', {'title':'📑 '+this.get_senders_name_or_you(sender, item['e5'])+' entered your contract '+contract_id, 'details':''+(new Date(timestamp*1000))+', '+(this.get_time_difference(timestamp))+this.props.app_state.loc['1698a']/* ago. */, 'size':'s'})}
                </div>
            )
        }
        else if(item['type'] == 'contract_exit_notification'){
            var timestamp = item['event'].returnValues.p7
            var sender = item['event'].returnValues.p2
            var contract_id = item['event'].returnValues.p1
            return(
                <div onClick={() => this.open_object(contract_id, item['e5'], 'contract')}>
                    {this.render_detail_item('3', {'title':'📜 '+this.get_senders_name_or_you(sender, item['e5'])+' exited your contract '+contract_id, 'details':''+(new Date(timestamp*1000))+', '+(this.get_time_difference(timestamp))+this.props.app_state.loc['1698a']/* ago. */, 'size':'s'})}
                </div>
            )
        }
        else if(item['type'] == 'direct_purchase_notification'){
            var timestamp = item['timestamp']
            var sender = item['event'].returnValues.p1
            var storefront_id = item['event'].returnValues.p3
            return(
                <div onClick={() => this.open_object(storefront_id, item['e5'], 'storefront')}>
                    {this.render_detail_item('3', {'title':'🏪 '+this.get_senders_name_or_you(sender, item['e5'])+' purchased your storefront item '+storefront_id, 'details':''+(new Date(timestamp*1000))+', '+(this.get_time_difference(timestamp))+this.props.app_state.loc['1698a']/* ago. */, 'size':'s'})}
                </div>
            )
        }
        else if(item['type'] == 'mail_message_notification'){
            var timestamp = item['timestamp']
            var sender = item['event'].returnValues.p2
            var message = this.truncate(item['ipfs']['message'], 53)
            var id = item['convo_id']
            return(
                <div onClick={() => this.open_object(id, item['e5'], 'mail')}>
                    {this.render_detail_item('3', {'title':'📩 '+this.get_senders_name_or_you(sender, item['e5'])+': '+message, 'details':''+(new Date(timestamp*1000))+', '+(this.get_time_difference(timestamp))+this.props.app_state.loc['1698a']/* ago. */, 'size':'s'})}
                </div>
            )
        }
    }

    get_actual_number(number, depth){
        var p = (bigInt(depth).times(72)).toString().toLocaleString('fullwide', {useGrouping:false})
        var depth_vaule = bigInt(('1e'+p))
        return (bigInt(number).times(depth_vaule)).toString().toLocaleString('fullwide', {useGrouping:false})
    }

    truncate(source, size) {
        return source.length > size ? source.slice(0, size - 1) + "…" : source;
    }

    open_object(target, e5, type){
        this.props.open_object_in_homepage(target, e5, type)
    }

    get_senders_name_or_you(sender, e5){
        if(sender == this.props.app_state.user_account_id[e5]){
            return this.props.app_state.loc['1694']/* 'You' */
        }
        var alias = (this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[sender] == null ? sender : this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[sender])
            return alias
    }







    render_watched_account_ui(){
        var size = this.props.size
        if(size == 's'){
            return(
                <div>
                    {this.render_watched_account_ui_data()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_watched_account_ui_data()}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_empty_views(3)}
                    </div>
                </div>
                
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_watched_account_ui_data()}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_empty_views(3)}
                    </div>
                </div>
                
            )
        }
    }

    render_watched_account_ui_data(){
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['1593v']/* 'Watch Account.' */, 'details':this.props.app_state.loc['1593w']/* 'Track receive transactions for a specified account from here.' */, 'size':'l'})}

                <div style={{ 'margin': '10px 5px 10px 5px'}}>
                    <div className="row" style={{width:'100%'}}>
                        <div className="col-11" style={{'margin': '0px 0px 0px 0px'}}>
                            <TextInput font={this.props.app_state.font} height={25} placeholder={this.props.app_state.loc['1593u']/* 'Name or Account ID...' */} when_text_input_field_changed={this.when_watch_account_input_field_changed.bind(this)} text={this.state.typed_watch_account_input} theme={this.props.theme} />
                        </div>
                        <div className="col-1" style={{'padding': '0px 10px 0px 0px'}}>
                            <div onClick={()=>this.watch()}>
                                <div className="text-end" style={{'padding': '5px 0px 0px 0px'}} >
                                    <img className="text-end" src={this.props.theme['add_text']} style={{height:37, width:'auto'}} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* {this.render_transfers_item_logs()} */}
                {this.render_incoming_transactions_data()}
            </div>
        )
    }

    render_incoming_transactions_data(){
        var items = this.props.app_state.watched_account_data
        if(items == null){
            items = []
        }
        if(items.length == 0){
            return(
                <div>
                    {this.render_empty_views(3)}
                </div>
            )
        }
        return(
            <div>
                <div style={{overflow: 'auto'}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px', 'listStyle':'none'}}>
                        {items.map((item, index) => (
                            <div style={{'margin':'3px 0px 3px 0px'}}>
                                {this.render_notification_item(item, index)}
                            </div>
                        ))}
                    </ul>
                </div>
            </div>
        )
    }

    render_notification_item(item, index){
        var sender = item.returnValues.p2
        var amount = item.returnValues.p4
        var depth = item.returnValues.p7
        var exchange = item.returnValues.p1
        var timestamp = item.returnValues.p5
        var e5 = item['e5']
        return(
            <div onClick={() => this.props.view_number({'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[e5+exchange], 'number':this.get_actual_number(amount, depth), 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[exchange]})}>
                {this.render_detail_item('3', {'title':'💸 '+this.get_senders_name_or_you(sender, item['e5'])+this.props.app_state.loc['1593fg']/* ' sent you ' */+this.format_account_balance_figure(this.get_actual_number(amount, depth))+' '+this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[exchange], 'details':''+(this.get_time_difference(timestamp))+this.props.app_state.loc['1698a']/* ago. */, 'size':'l'})}
            </div>
        )
    }

    when_watch_account_input_field_changed(text){
        this.setState({typed_watch_account_input: text})
    }

    watch(){
        var text = this.state.typed_watch_account_input
        var name_id = this.get_typed_alias_id(text.trim())
        if(!isNaN(name_id) && parseInt(name_id) > 1000 &&  name_id != ''){
            this.props.set_watched_account_id(name_id)
            this.props.notify(this.props.app_state.loc['1593z'], 2000)
        }
    }


    render_transfers_item_logs(){
        var e5 = this.props.app_state.selected_e5
        var watched_account_id = this.state.typed_watch_account_input;
        var pointer = e5+watched_account_id
        var items = this.props.app_state.watched_account_data[pointer]
        if(items == null) items = []

        if (items.length == 0) {
            items = [0, 1]
            return (
                <div>
                    <div style={{}}>
                        <ul style={{ 'padding': '0px 0px 0px 0px' ,'list-style':'none'}}>
                            {items.map((item, index) => (
                                <li style={{ 'padding': '2px 5px 2px 5px' }} onClick={() => console.log()}>
                                    <div style={{ height: 60, width: '100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px', 'padding': '10px 0px 10px 10px', 'display': 'flex', 'align-items': 'center', 'justify-content': 'center' }}>
                                        <div style={{ 'margin': '10px 20px 10px 0px' }}>
                                            <img src={this.props.app_state.theme['letter']} style={{ height: 30, width: 'auto' }} />
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )
        } else {
            return (
                <div style={{}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px','list-style':'none' }}>
                        {items.map((item, index) => (
                            <li style={{ 'padding': '2px 5px 2px 5px' }}>
                                <div key={index}>
                                    {this.render_transfers_event_item(item, index)}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
    }

    when_transfers_item_clicked(index){
        if (this.state.selected_transfers_event_item == index) {
            this.setState({ selected_transfers_event_item: null })
        } else {
            this.setState({ selected_transfers_event_item: index })
        }
    }

    render_transfers_event_item(item, index){
        var e5 = this.props.app_state.selected_e5

        var exchange_id = item['event'].returnValues.p1;
        var number = item['event'].returnValues.p4
        var depth = item['event'].returnValues.p7
        number = this.get_actual_number(number, depth)
        var from_to = item['action'] == 'Sent' ? 'To: '+this.get_sender_title_text(item['event'].returnValues.p3): 'From: '+this.get_sender_title_text(item['event'].returnValues.p2)
        
        if (this.state.selected_transfers_event_item == index) {
            return (
                <div>
                    <div onClick={() => this.when_transfers_item_clicked(index)}>
                        {this.render_detail_item('3', { 'title': from_to, 'details': this.props.app_state.loc['1770']/* 'Action: ' */+item['action'], 'size': 's'})}
                    </div>
                    <div style={{ height: 2 }} />
                    <div style={{ 'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[e5+exchange_id], 'number':number, 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[exchange_id]})}>
                        {this.render_detail_item('2', { 'style': 'l', 'title': this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[e5+exchange_id], 'subtitle': this.format_power_figure(number), 'barwidth': this.calculate_bar_width(number), 'number': this.format_account_balance_figure(number), 'barcolor': '', 'relativepower': this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[exchange_id], })}
                    </div>

                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': this.get_time_difference(item['event'].returnValues.p5), 'details': 'Age', 'size': 's' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': item['event'].returnValues.p6, 'details': 'Block Number', 'size': 's' })}
                    <div style={{ height: '1px', 'background-color': this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px' }} />
                </div>
            )
        } else {
            return (
                <div onClick={() => this.when_transfers_item_clicked(index)}>
                    {this.render_detail_item('3', { 'title': from_to, 'details': this.format_account_balance_figure(number)+' '+this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[exchange_id], 'size': 's' })}
    
                </div>
            )
        }
    }

    get_sender_title_text(sender) {
        var e5 = this.props.app_state.selected_e5
        if (sender == this.props.app_state.user_account_id[e5]) {
            return 'You'
        } else {
            var alias = (this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[sender] == null ? sender : this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[sender])
            return alias
        }
    }

    get_actual_number(number, depth){
        var p = (bigInt(depth).times(72)).toString().toLocaleString('fullwide', {useGrouping:false})
        var depth_vaule = bigInt(('1e'+p))
        return (bigInt(number).times(depth_vaule)).toString().toLocaleString('fullwide', {useGrouping:false})
    }










    render_sign_data_ui(){
        var size = this.props.size
        if(size == 's'){
            return(
                <div>
                    {this.render_sign_data_ui_data()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_sign_data_ui_data()}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_empty_views(3)}
                    </div>
                </div>
                
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_sign_data_ui_data()}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_empty_views(3)}
                    </div>
                </div>
                
            )
        }
    }

    render_sign_data_ui_data(){
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['1593ab']/* 'Sign Some Data.' */, 'details':this.props.app_state.loc['1593ac']/* 'Generate a signature of some data to have your account verified externally.' */, 'size':'l'})}
                <div style={{height: 10}}/>

                {/* {this.render_signature_e5s()}
                <div style={{height: 20}}/> */}

                <TextInput font={this.props.app_state.font} height={35} placeholder={this.props.app_state.loc['1593ad']/* 'Data...' */} when_text_input_field_changed={this.when_sign_data_input_field_changed.bind(this)} text={this.state.sign_data_input} theme={this.props.theme} />
                <div style={{height: 10}}/>

                <div onClick={()=>this.sign_data()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['1593ae']/* 'Sign Data..' */, 'action':''})}
                </div>
                
                {this.show_generated_signature_data()}
            </div>
        )
    }

    when_sign_data_input_field_changed(text){
        this.setState({sign_data_input: text})
    }

    render_signature_e5s(){
        var items = this.load_active_e5s()
        var items2 = [0, 1]
        return(
            <div style={{'margin':'3px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                    {items.map((item, index) => (
                        <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}} onClick={()=>this.when_signature_e5_clicked(item)}>
                            {this.render_signature_e5_item(item)}
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

    render_signature_e5_item(item){
        var image = this.props.app_state.e5s[item].e5_img
        var details = this.props.app_state.e5s[item].token
        if(this.state.selected_signature_e5 == item){
            return(
                <div>
                    {this.render_detail_item('12', {'title':item, 'image':image,'details':details, 'size':'s'})}
                    <div style={{height:'1px', 'background-color':this.props.app_state.theme['line_color'], 'margin': '3px 5px 0px 5px'}}/>
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

    when_signature_e5_clicked(item){
        this.setState({selected_signature_e5: item})
    }

    sign_data(){
        var e5 = this.state.selected_signature_e5
        var data = this.state.sign_data_input.trim()

        if(data == ''){
            this.props.notify(this.props.app_state.loc['1593af']/* 'Please type something.' */, 3000)
        } 
        else if(data.length > 65){
            this.props.notify(this.props.app_state.loc['1593ao']/* 'That text is too long to sign.' */, 3000)
        }
        else if(e5 == null){
            this.props.notify(this.props.app_state.loc['1593am']/* 'Please pick an E5.' */, 3000)
        }
        else if(!this.props.app_state.has_wallet_been_set){
            this.props.notify(this.props.app_state.loc['2906']/* 'You need to set your wallet first.' */, 5000)
        }
        else{
            this.props.sign_custom_data_using_wallet(e5, data)
        }
    }

    show_generated_signature_data(){
        if(this.props.app_state.generated_signature != null){
            return(
                <div>
                    {this.render_detail_item('0')}

                    {this.render_detail_item('4', {'font':this.props.app_state.font, 'textsize':'13px', 'text':this.props.app_state.generated_signature})}
                    <div style={{height: 10}}/>

                    <div onClick={()=>this.copy_signature_to_clipboard(this.props.app_state.generated_signature)}>
                        {this.render_detail_item('5', {'text':this.props.app_state.loc['1593ah']/* 'Copy to Clipboard.' */, 'action':''})}
                    </div>

                    <div style={{height: 10}}/>
                    <div style={{height: 200, width:'100%','display': 'flex', 'align-items':'center','justify-content':'center', 'margin':'30px 0px 0px 0px'}}>
                        <QRCode
                            size={150}
                            style={{ height: "auto", maxWidth: "100%", width: "50%" }}
                            value={this.props.app_state.generated_signature}
                            viewBox={`0 0 100 100`}
                        />
                    </div>

                    <p style={{'margin':'5% 0% 0% 0%', 'text-align': 'center', 'color':this.props.theme['primary_text_color']}}>{this.props.app_state.loc['1593an']/* 'Scan' */}</p>
                </div>
            )
        }
    }

    copy_signature_to_clipboard(signature){
        navigator.clipboard.writeText(signature)
        this.props.notify(this.props.app_state.loc['1593ai']/* 'Copied Signature to clipboard.' */, 1600)
    }







    render_verify_data_ui(){
        var size = this.props.size
        if(size == 's'){
            return(
                <div>
                    {this.render_verify_data_ui_data()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_verify_data_ui_data()}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_empty_views(3)}
                    </div>
                </div>
                
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_verify_data_ui_data()}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_empty_views(3)}
                    </div>
                </div>
                
            )
        }
    }


    render_verify_data_ui_data(){
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['1593aw']/* 'Verify  a Signature.' */, 'details':this.props.app_state.loc['1593ax']/* 'erive an account and address from some data and its corresponding signature.' */, 'size':'l'})}
                <div style={{height: 10}}/>

                {/* {this.render_signature_e5s()}
                <div style={{height: 20}}/> */}

                <TextInput font={this.props.app_state.font} height={35} placeholder={this.props.app_state.loc['1593ad']/* 'Data...' */} when_text_input_field_changed={this.when_verify_signed_data_input_field_changed.bind(this)} text={this.state.verify_signed_data_input} theme={this.props.theme} />
                <div style={{height: 10}}/>

                <TextInput font={this.props.app_state.font} height={65} placeholder={this.props.app_state.loc['1593ap']/* 'Signature...' */} when_text_input_field_changed={this.when_signature_input_field_changed.bind(this)} text={this.state.signed_data_input} theme={this.props.theme} />
                <div style={{height: 10}}/>

                <div onClick={()=>this.verify_signature()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['1593aq']/* 'Verify Signature.' */, 'action':''})}
                </div>

                {this.show_verified_signature_data()}
            </div>
        )
    }

    when_verify_signed_data_input_field_changed(text){
        this.setState({verify_signed_data_input: text})
    }

    when_signature_input_field_changed(text){
        this.setState({signed_data_input: text})
    }


    verify_signature(){
        var e5 = this.state.selected_signature_e5
        var data = this.state.verify_signed_data_input.trim()
        var signature = this.state.signed_data_input.trim()

        if(data == ''){
            this.props.notify(this.props.app_state.loc['1593af']/* 'Please type something.' */, 3000)
        } 
        if(signature == ''){
            this.props.notify(this.props.app_state.loc['1593ar']/* 'Please paste a signature.' */, 3000)
        }
        else if(data.length > 65){
            this.props.notify(this.props.app_state.loc['1593as']/* 'That data is too long.' */, 3000)
        }
        else if(e5 == null){
            this.props.notify(this.props.app_state.loc['1593am']/* 'Please pick an E5.' */, 3000)
        }
        else{
            this.props.verify_custom_data_using_wallet(data, signature, e5)
        }
    }


    show_verified_signature_data(){
        if(this.props.app_state.verified_account_data_from_signature != null){
            var signer_address = this.props.app_state.verified_account_data_from_signature['address']
            var signer_account = this.props.app_state.verified_account_data_from_signature['account']
            return(
                <div>
                    {this.render_detail_item('0')}

                    {this.render_detail_item('3', {'title':this.props.app_state.loc['1593au']/* 'Signer Address.' */, 'details':signer_address, 'size':'l'})}
                    <div style={{height: 10}}/>

                    {this.render_detail_item('3', {'details':this.get_senders_name2(signer_account), 'title':signer_account, 'size':'l'})}
                </div>
            )
        }
    }

    get_senders_name2(sender){
         var alias = (this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[sender] == null ? 'Alias Unknown' : this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[sender])
            return alias
    }

    






    render_storage_settings_ui(){
        var size = this.props.size
        if(size == 's'){
            return(
                <div>
                    {this.render_storage_settings_data()}
                    {this.render_detail_item('0')}
                    {this.render_upload_files_ui()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_storage_settings_data()}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_upload_files_ui()}
                    </div>
                </div>
                
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_storage_settings_data()}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_upload_files_ui()}
                    </div>
                </div>
                
            )
        }
    }

    render_storage_settings_data(){
        var max_size = this.get_upload_file_size_limit()
        var formatted_size = this.format_data_size(max_size)
        var fs = formatted_size['size']+' '+formatted_size['unit']

        var upload_metrics = this.get_uploaded_data_details()
        var image_count = upload_metrics['image_count'] +''
        var audio_count = upload_metrics['audio_count']+''
        var video_count = upload_metrics['video_count']+''
        var pdf_count = upload_metrics['pdf_count']+''
        var zip_count = upload_metrics['zip_count']+''
        var total_size = this.format_data_size(upload_metrics['total_size'])
        var ts = total_size['size']+' '+total_size['unit']
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['1593bc']/* 'File Upload Limit.' */, 'details':fs, 'size':'l'})}
                <div style={{height: 10}}/>

                <div style={{'margin':'0px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                    <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                        <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}}>
                            {this.render_detail_item('3', {'details':this.props.app_state.loc['1593br']/* 'Images' */, 'title':this.format_number(image_count), 'size':'l'})}
                            <div style={{width: 10}}/>
                        </li>
                        <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}}>
                            {this.render_detail_item('3', {'details':this.props.app_state.loc['1593bs']/* 'Audio Files.' */, 'title':this.format_number(audio_count), 'size':'l'})}
                            <div style={{width: 10}}/>
                        </li>
                        <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}}>
                            {this.render_detail_item('3', {'details':this.props.app_state.loc['1593bt']/* 'Videos.' */, 'title':this.format_number(video_count), 'size':'l'})}
                            <div style={{width: 10}}/>
                        </li>
                        <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}}>
                            {this.render_detail_item('3', {'details':this.props.app_state.loc['1593ce']/* 'Uploaded PDFs.' */, 'title':this.format_number(pdf_count), 'size':'l'})}
                            <div style={{width: 10}}/>
                        </li>
                        <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}}>
                            {this.render_detail_item('3', {'details':this.props.app_state.loc['1593ee']/* 'Uploaded Zips.' */, 'title':this.format_number(zip_count), 'size':'l'})}
                            <div style={{width: 10}}/>
                        </li>
                    </ul>
                </div>
                <div style={{height: 10}}/>

                {this.render_detail_item('3', {'details':this.props.app_state.loc['1593bu']/* 'Total Storage Space Utilized.' */, 'title':ts, 'size':'l'})}

                {this.render_detail_item('0')}

                {this.render_detail_item('3', {'title':this.props.app_state.loc['1593az']/* 'Storage Configuration' */, 'details':this.props.app_state.loc['1593bb']/* 'Connect your account to a third party storage provider to store larger files.' */, 'size':'l'})}
                <div style={{height: 10}}/>

                <Tags font={this.props.app_state.font} page_tags_object={this.state.get_upload_storage_option_tags_object} tag_size={'l'} when_tags_updated={this.when_get_upload_storage_option_tags_object_updated.bind(this)} theme={this.props.theme}/>
                <div style={{height: 10}}/>

                {this.render_storage_option()}

            </div>
        )
    }

    when_get_upload_storage_option_tags_object_updated(tag_obj){
        this.setState({get_upload_storage_option_tags_object: tag_obj})
    }

    render_storage_option(){
        var selected_item = this.get_selected_item(this.state.get_upload_storage_option_tags_object, this.state.get_upload_storage_option_tags_object['i'].active)
        
        if(selected_item == this.props.app_state.loc['1593cv']/* web3.storage */){
            return(
                <div>
                    <div className="row" style={{width:'100%'}}>
                        <div className="col-11" style={{'margin': '0px 0px 0px 0px'}}>
                            <TextInput font={this.props.app_state.font} height={35} placeholder={this.props.app_state.loc['1593bd']/* 'zaphod@beeblebrox.galaxy' */} when_text_input_field_changed={this.when_storage_email_input_field_changed.bind(this)} text={this.state.storage_email_input} theme={this.props.theme} />
                        </div>
                        <div className="col-1" style={{'padding': '0px 10px 0px 0px'}}>
                            <div onClick={()=>this.verify_email()}>
                                <div className="text-end" style={{'padding': '5px 0px 0px 0px'}} >
                                    <img className="text-end" src={this.props.theme['add_text']} style={{height:37, width:'auto'}} />
                                </div>
                            </div>
                        </div>
                    </div>
                    {this.render_current_storage_email()}

                    <div style={{height: 10}}/>
                    {this.render_detail_item('4', {'text':this.props.app_state.loc['1593be']/* 'Note: You have to set this in every new device you use.' */, 'textsize':'12px', 'font':this.props.app_state.font})}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['1593cw']/* 'nitro 🛰️' */){
            return(
                <div>
                    {this.render_detail_item('4',{'font':this.props.app_state.font, 'textsize':'14px','text':this.props.app_state.loc['1593cx']/* ''To see a nitro option here, first purchase storage from it in the nitro section.' */})}
                    <div style={{height: 10}}/>
                    {this.load_my_nitro_objects_to_select()}
                    <div style={{height: 10}}/>
                    {this.render_node_account_storage_details()}
                    <div style={{height: 10}}/>
                    {this.show_nitro_upload_progress_if_any()}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['1593ew']/* arweave */){
            return(
                <div>
                    
                    {this.show_last_transaction_data()}

                    <div style={{height: 10}}/>
                    {this.render_detail_item('4', {'text':this.props.app_state.loc['1593fb']/* 'Note: Arweave usually takes 10 to 20 minutes to finialize uploads.' */, 'textsize':'12px', 'font':this.props.app_state.font})}
                </div>
            )
        }
    }

    show_nitro_upload_progress_if_any(){
        var data = this.props.app_state.nitro_upload_progress_data
        if(data == null) {
            return(
                <div>
                    
                </div>
            )
        }
        var percentage = data['percentage'];
        var file_number = data['file_number']
        var file_count = data['file_count']
        var total_size = data['total_size']
        var formatted_size = this.format_data_size(total_size)
        var fs = formatted_size['size']+' '+formatted_size['unit']
        return(
            <div>
                <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>
                    {this.render_detail_item('2', {'style':'l','title':this.props.app_state.loc['1593fc']/* 'Upload progress.' */, 'subtitle':'', 'barwidth':percentage+'%', 'number':percentage+'%', 'relativepower':this.props.app_state.loc['3055k']/* 'proportion' */})}
                </div>
                <div style={{height: 10}}/>

                {this.render_detail_item('3', {'details':this.props.app_state.loc['1593fe']/* 'File Upload Number' */, 'title':file_number+'/'+file_count, 'size':'l'})}
                <div style={{height: 10}}/>

                {this.render_detail_item('3', {'details':this.props.app_state.loc['1593ff']/* 'Total Upload Size' */, 'title':fs, 'size':'l'})}
            </div>
        )
    }

    show_last_transaction_data(){
        var data = this.props.app_state.current_upload_transaction_reward
        if(data == null) {
            return(
                <div>
                    
                </div>
            )
        }
        var reward = data.transaction_reward
        var transaction_reward_in_ar = data.transaction_reward_in_ar
        var transaction_hash = data.transaction_hash
        var formatted_size = this.format_data_size(this.props.app_state.current_upload_data['size'])
        var fs = formatted_size['size']+' '+formatted_size['unit']
        var uploader_percentage = this.props.app_state.uploader_percentage
        return(
            <div>
                <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>
                    {this.render_detail_item('2', {'style':'l','title':this.props.app_state.loc['1593fc']/* 'Upload progress.' */, 'subtitle':'', 'barwidth':uploader_percentage+'%', 'number':uploader_percentage+'%', 'relativepower':this.props.app_state.loc['3055k']/* 'proportion' */})}
                </div>
                <div style={{height: 10}}/>
                <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>
                    {this.render_detail_item('2', {'style':'l','title':this.props.app_state.loc['3055d']/* 'Upload fee in winston.' */, 'subtitle':this.format_power_figure(reward), 'barwidth':this.calculate_bar_width(reward), 'number':this.format_account_balance_figure(reward), 'relativepower':'winston'})}

                    {this.render_detail_item('2', {'style':'l','title':this.props.app_state.loc['3055e']/* 'Upload fee in Arweave.' */, 'subtitle':this.format_power_figure(transaction_reward_in_ar), 'barwidth':this.calculate_bar_width(transaction_reward_in_ar), 'number':(transaction_reward_in_ar), 'relativepower':'Arweave'})}
                </div>
                <div style={{height: 10}}/>

                {this.render_detail_item('3', {'details':this.props.app_state.loc['3055f']/* 'Upload File type.' */, 'title':this.props.app_state.current_upload_data['name'], 'size':'l'})}
                <div style={{height: 10}}/>

                {this.render_detail_item('3', {'details':this.props.app_state.loc['3055m']/* 'Upload File size.' */, 'title':fs, 'size':'l'})}
                <div style={{height: 10}}/>

                <div onClick={() => this.copy_hash_to_clipboard(transaction_hash)}>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['3055g']/* 'Upload file Hash' */, 'details':transaction_hash, 'size':'l'})}
                </div>
            </div>
        )
    }

    copy_hash_to_clipboard(text){
        navigator.clipboard.writeText(text)
        this.props.notify(this.props.app_state.loc['3055h']/* 'Copied Hash to Clipboard.' */, 1600)
    }








    load_my_nitro_objects_to_select(){
        var items = this.load_active_nitros()
        var items2 = [0, 1, 2]
        if(items.length == 0){
            return(
                <div style={{'margin':'3px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                    {items2.map(() => (
                        <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}}>
                            {this.render_empty_horizontal_list_item()}
                        </li>
                    ))}
                </ul>
            </div>
            )
        }
        return(
            <div style={{'margin':'3px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                    {items.map((item, index) => (
                        <li style={{'display': 'inline-block', 'margin': '0px 2px 1px 2px', '-ms-overflow-style':'none'}} onClick={()=>this.when_nitro_item_clicked(item)}>
                            {this.render_nitro_item(item)}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    load_active_nitros(){
        var my_bought_nitros = []
        var all_nitros = this.get_all_sorted_objects(this.props.app_state.created_nitros)
        for(var i=0; i<all_nitros.length; i++){
            var obj = all_nitros[i]
            var state = this.props.app_state.nitro_node_details[obj['e5_id']]
            if(obj['bought'] == true && state != null && state != 'unavailable') my_bought_nitros.push(obj)
        }
        return my_bought_nitros
    }

    render_nitro_item(item){
        var object = item
        var default_image = EndImg
        var image = object['ipfs'] == null ? default_image : (object['ipfs'].album_art == null ? default_image : object['ipfs'].album_art)
        var title = item['e5']+' • '+item['id']
        var details = object['ipfs'] == null ? 'Nitropost ID' : start_and_end(object['ipfs'].entered_title_text)
        if(this.state.selected_nitro_item == item['e5_id']){
            return(
                <div>
                    {this.render_detail_item('12', {'title':title, 'image':image,'details':details, 'size':'s', 'border_radius':'9px'})}
                    <div style={{height:'1px', 'background-color':this.props.app_state.theme['line_color'], 'margin': '3px 5px 0px 5px'}}/>
                </div>
            )
        }else{
            return(
                <div>
                    {this.render_detail_item('12', {'title':title, 'image':image, 'details':details, 'size':'s', 'border_radius':'9px'})}
                </div>
            )
        }
    }

    when_nitro_item_clicked(item){
        if(item['e5_id'] == this.state.selected_nitro_item){
            this.setState({selected_nitro_item: null})
            this.props.set_my_nitro_selection(null)
        }else{
            this.setState({selected_nitro_item: item['e5_id']})
            this.props.set_my_nitro_selection(item['e5_id'])
            this.props.load_nitro_node_details(item, false)
            this.props.load_my_account_storage_info(item)
        }
    }




    render_node_account_storage_details(){
        if(this.state.selected_nitro_item == null) return;
        var node_details = this.props.app_state.nitro_node_storage_payment_info[this.state.selected_nitro_item]
        if(node_details == null){
            return(
                <div>
                    {this.render_detail_item('4',{'font':this.props.app_state.font, 'textsize':'15px','text':this.props.app_state.loc['c2527u']/* 'Loading Your Storage Info...' */})}
                </div>
            )
        }
        else if(node_details == 'unavailable'){
            return(
                <div>
                    {this.render_detail_item('4',{'font':this.props.app_state.font, 'textsize':'15px','text':this.props.app_state.loc['c2527v']/* 'Your account doesnt exist in the node.' */})}
                </div>
            )
        }
        else{
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.format_account_balance_figure(node_details['acquired_space'])+' Mbs', 'details':this.props.app_state.loc['c2527y']/* 'Acquired Space.' */, 'size':'l'})}
                    <div style={{height:10}}/>

                    {this.render_detail_item('3', {'title':this.round_off(node_details['utilized_space'])+' Mbs', 'details':this.props.app_state.loc['c2527z']/* 'Utilized Space.' */, 'size':'l'})}

                    <div style={{height:10}}/>
                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>
                        {this.render_detail_item('2', {'style':'l', 'title':this.props.app_state.loc['c2527w']/* 'Files Stored.' */, 'subtitle':this.format_power_figure(node_details['files']), 'barwidth':this.get_number_width(node_details['files']), 'number':`${number_with_commas(node_details['files'])}`, 'barcolor':'', 'relativepower':this.props.app_state.loc['c2527x']/* files */, })}
                    </div>
                </div>
            )
        }
    }

    round_off(number){
        return (Math.round(number * 100) / 100)
    }




    format_number(number){
        if(number == 0){
            return '000'
        }
        return number
    }

    render_current_storage_email(){
        var email = this.props.app_state.web3_account_email
        if(email != ''){
            return(
                <div>
                    <div style={{height: 10}}/>
                    {this.render_detail_item('4', {'text':email, 'textsize':'12px', 'font':this.props.app_state.font})}
                </div>
            )
        }
    }

    get_uploaded_data_details(){
        var images = 0;
        var audios = 0;
        var videos = 0;
        var pdfs = 0;
        var zips = 0;
        var total_size = 0;

        var items = this.props.app_state.uploaded_data_cids
        items.forEach(ecid => {
            var ecid_obj = this.get_cid_split(ecid)
            var data = this.props.app_state.uploaded_data[ecid_obj['filetype']] == null ? null : this.props.app_state.uploaded_data[ecid_obj['filetype']][ecid_obj['full']]
            if(data != null){
                total_size += data['size']
                if(data['type'] == 'image') images++
                else if(data['type'] == 'audio') audios++
                else if(data['type'] == 'video') videos++
                else if(data['type'] == 'pdf') pdfs++
                else if(data['type'] == 'zip') zips++
            }
        });

        return {'image_count':images, 'audio_count':audios, 'video_count':videos, 'total_size':total_size, 'pdf_count':pdfs, 'zip_count':zips}
    }

    get_upload_file_size_limit(){
        var max_size = this.state.default_upload_limit
        var selected_item = this.get_selected_item(this.state.get_upload_storage_option_tags_object, this.state.get_upload_storage_option_tags_object['i'].active)

        if(selected_item == this.props.app_state.loc['1593cv']/* web3.storage */){
            if(this.props.app_state.web3_account_email != ''){
                max_size = (1.5*1024*1024*1024)
            }
        }
        else if(selected_item == this.props.app_state.loc['1593cw']/* 'nitro 🛰️' */){
            if(this.state.selected_nitro_item != null){
                var node_details = this.props.app_state.nitro_node_storage_payment_info[this.state.selected_nitro_item]
                if(node_details != null){
                    var available_space = parseFloat(node_details['acquired_space']) - parseFloat(node_details['utilized_space'])

                    max_size = (available_space * 1024 * 1024)
                }
            }
        }
        else if(selected_item == this.props.app_state.loc['1593ew']/* arweave */){
            max_size = (1.5*1024*1024*1024)
        }
        
        return max_size
    }

    when_storage_email_input_field_changed(text){
        this.setState({storage_email_input: text})
    }

    verify_email(){
        var email = this.state.storage_email_input.trim()

        if(email == ''){
            this.props.notify(this.props.app_state.loc['1593bh']/* 'Type something.' */, 4000)
        }
        else if(!this.validateEmail(email)){
            this.props.notify(this.props.app_state.loc['1593bg']/* 'That email is not valid.' */, 4000)
        }else{
            this.props.set_up_web3_account(email)
        }
    }

    validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }



    render_upload_files_ui(){
        return(
            <div>
                {this.render_detail_item('4', {'text':this.props.app_state.loc['1593bj']/* 'Upload a file to storage.' */, 'textsize':'14px', 'font':this.props.app_state.font})}
                {this.render_message_if_no_storage_option_is_selected()}
                {this.render_detail_item('0')}
                {this.render_detail_item('10', {'text':this.props.app_state.loc['1593fk']/* 'Your files are encypted with your wallets private key. So you need to set your wallet to see them here.' */, 'textsize':'10px', 'font':this.props.app_state.font})}
                <div style={{height: 10}}/>
                {this.render_uploaded_files()}
            </div>
        )
    }

    render_message_if_no_storage_option_is_selected(){
        var max_size = this.get_upload_file_size_limit()
        if(max_size == 0){
            return(
                <div>
                    {this.render_detail_item('10', {'text':this.props.app_state.loc['1593gk']/* 'You need to select a storage option to use.' */, 'textsize':'10px', 'font':this.props.app_state.font})}
                </div>
            )
        }else{
            return(
                <div>
                    <div style={{height: 10}}/>
                    {this.render_open_options_picker_upload_button()}
                </div>
            )
        }
    }

    when_get_file_data_option_tags_object_updated(tag_obj){
        this.setState({get_file_data_option_tags_object: tag_obj})
    }

    constructor(props) {
        super(props);
        this.image_input = React.createRef()
        this.audio_input = React.createRef()
        this.video_input = React.createRef()
        this.pdf_input = React.createRef()
        this.zip_input = React.createRef()
    }

    render_open_options_picker_upload_button(){
        return(
            <div>
                <input ref={this.image_input} style={{display: 'none'}} id="upload" type="file" accept =".png, .jpeg, .jpg, .gif" onChange ={this.when_image_gif_picked.bind(this)} multiple/>
                
                <input ref={this.audio_input} style={{display: 'none'}} id="upload" type="file" accept =".mp3, audio/mpeg" onChange ={this.when_audio_picked.bind(this)} multiple/>

                <input ref={this.video_input} style={{display: 'none'}} id="upload" type="file" accept =".mp4,video/mp4" onChange ={this.when_video_picked.bind(this)} multiple/>

                <input ref={this.pdf_input} style={{display: 'none'}} id="upload" type="file" accept =".pdf" onChange ={this.when_pdf_picked.bind(this)} multiple/>

                <input ref={this.zip_input} style={{display: 'none'}} id="upload" type="file" accept =".zip" onChange ={this.when_zip_picked.bind(this)} multiple/>

                <div onClick={() => this.props.show_dialog_bottomsheet({}, 'file_type_picker')}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['1593gj']/* 'Upload File.' */, 'action':''})}
                </div>
            </div>
        )
    }

    call_input_function(type){
        if(type == 'image'){
            this.image_input.current?.click()
        }
        else if(type == 'audio'){
            this.audio_input.current?.click()
        }
        else if(type == 'video'){
            this.video_input.current?.click()
        }
        else if(type == 'pdf'){
            this.pdf_input.current?.click()
        }
        else if(type == 'zip'){
            this.zip_input.current?.click()
        }
    }

    render_upload_button(){
        var selected_item = this.get_selected_item(this.state.get_file_data_option_tags_object, this.state.get_file_data_option_tags_object['i'].active);
        var icon = this.props.theme['close']

        var upload_storage_selected_item = this.get_selected_item(this.state.get_upload_storage_option_tags_object, this.state.get_upload_storage_option_tags_object['i'].active)

        if(upload_storage_selected_item == this.props.app_state.loc['1593ew']/* arweave */){
            if(selected_item == this.props.app_state.loc['1593bk']/* all */ || selected_item == this.props.app_state.loc['1593bl']/* 'images' */){
            return(
                <div>
                    <div style={{'position': 'relative', 'width':45, 'height':45, 'padding':'0px 0px 0px 0px'}}>
                        <img src={icon} style={{height:36, width:'auto', 'z-index':'1' ,'position': 'absolute'}} />
                        
                        <input style={{height:30, width:40, opacity:0, 'z-index':'2' ,'position': 'absolute', 'margin':'5px 0px 0px 0px'}} id="upload" type="file" accept =".png, .jpeg, .jpg, .gif" onChange ={this.when_image_gif_picked.bind(this)}/>
                    </div>
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['1593bm']/* 'audio' */){
            return(
                <div>
                    <div style={{'position': 'relative', 'width':45, 'height':45, 'padding':'0px 0px 0px 0px'}}>
                        <img src={icon} style={{height:36, width:'auto', 'z-index':'1' ,'position': 'absolute'}} />
                        
                        <input style={{height:30, width:40, opacity:0, 'z-index':'2' ,'position': 'absolute', 'margin':'5px 0px 0px 0px'}} id="upload" type="file" accept =".mp3, audio/mpeg" onChange ={this.when_audio_picked.bind(this)}/>
                    </div>
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['1593bn']/* 'video' */){
            return(
                <div>
                    <div style={{'position': 'relative', 'width':45, 'height':45, 'padding':'0px 0px 0px 0px'}}>
                        <img src={icon} style={{height:36, width:'auto', 'z-index':'1' ,'position': 'absolute'}} />
                        
                        <input style={{height:30, width:40, opacity:0, 'z-index':'2' ,'position': 'absolute', 'margin':'5px 0px 0px 0px'}} id="upload" type="file" accept =".mp4,video/mp4" onChange ={this.when_video_picked.bind(this)}/>
                    </div>
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['1593cd']/* 'pdf' */){
            return(
                <div>
                    <div style={{'position': 'relative', 'width':45, 'height':45, 'padding':'0px 0px 0px 0px'}}>
                        <img src={icon} style={{height:36, width:'auto', 'z-index':'1' ,'position': 'absolute'}} />
                        
                        <input style={{height:30, width:40, opacity:0, 'z-index':'2' ,'position': 'absolute', 'margin':'5px 0px 0px 0px'}} id="upload" type="file" accept =".pdf" onChange ={this.when_pdf_picked.bind(this)}/>
                    </div>
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['1593ed']/* 'zip' */){
           return(
                <div>
                    <div style={{'position': 'relative', 'width':45, 'height':45, 'padding':'0px 0px 0px 0px'}}>
                        <img src={icon} style={{height:36, width:'auto', 'z-index':'1' ,'position': 'absolute'}} />
                        
                        <input style={{height:30, width:40, opacity:0, 'z-index':'2' ,'position': 'absolute', 'margin':'5px 0px 0px 0px'}} id="upload" type="file" accept =".zip" onChange ={this.when_zip_picked.bind(this)}/>
                    </div>
                </div>
            ) 
        }
        }

        if(selected_item == this.props.app_state.loc['1593bk']/* all */ || selected_item == this.props.app_state.loc['1593bl']/* 'images' */){
            return(
                <div>
                    <div style={{'position': 'relative', 'width':45, 'height':45, 'padding':'0px 0px 0px 0px'}}>
                        <img src={icon} style={{height:36, width:'auto', 'z-index':'1' ,'position': 'absolute'}} />
                        
                        <input style={{height:30, width:40, opacity:0, 'z-index':'2' ,'position': 'absolute', 'margin':'5px 0px 0px 0px'}} id="upload" type="file" accept =".png, .jpeg, .jpg, .gif" onChange ={this.when_image_gif_picked.bind(this)} multiple/>
                    </div>
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['1593bm']/* 'audio' */){
            return(
                <div>
                    <div style={{'position': 'relative', 'width':45, 'height':45, 'padding':'0px 0px 0px 0px'}}>
                        <img src={icon} style={{height:36, width:'auto', 'z-index':'1' ,'position': 'absolute'}} />
                        
                        <input style={{height:30, width:40, opacity:0, 'z-index':'2' ,'position': 'absolute', 'margin':'5px 0px 0px 0px'}} id="upload" type="file" accept =".mp3, audio/mpeg" onChange ={this.when_audio_picked.bind(this)} multiple/>
                    </div>
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['1593bn']/* 'video' */){
            return(
                <div>
                    <div style={{'position': 'relative', 'width':45, 'height':45, 'padding':'0px 0px 0px 0px'}}>
                        <img src={icon} style={{height:36, width:'auto', 'z-index':'1' ,'position': 'absolute'}} />
                        
                        <input style={{height:30, width:40, opacity:0, 'z-index':'2' ,'position': 'absolute', 'margin':'5px 0px 0px 0px'}} id="upload" type="file" accept =".mp4,video/mp4" onChange ={this.when_video_picked.bind(this)} multiple/>
                    </div>
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['1593cd']/* 'pdf' */){
            return(
                <div>
                    <div style={{'position': 'relative', 'width':45, 'height':45, 'padding':'0px 0px 0px 0px'}}>
                        <img src={icon} style={{height:36, width:'auto', 'z-index':'1' ,'position': 'absolute'}} />
                        
                        <input style={{height:30, width:40, opacity:0, 'z-index':'2' ,'position': 'absolute', 'margin':'5px 0px 0px 0px'}} id="upload" type="file" accept =".pdf" onChange ={this.when_pdf_picked.bind(this)} multiple/>
                    </div>
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['1593ed']/* 'zip' */){
           return(
                <div>
                    <div style={{'position': 'relative', 'width':45, 'height':45, 'padding':'0px 0px 0px 0px'}}>
                        <img src={icon} style={{height:36, width:'auto', 'z-index':'1' ,'position': 'absolute'}} />
                        
                        <input style={{height:30, width:40, opacity:0, 'z-index':'2' ,'position': 'absolute', 'margin':'5px 0px 0px 0px'}} id="upload" type="file" accept =".zip" onChange ={this.when_zip_picked.bind(this)} multiple/>
                    </div>
                </div>
            ) 
        }
    }


    /* called when images have been picked from picker */
    when_image_gif_picked = (e) => {
        var upload_storage_selected_item = this.get_selected_item(this.state.get_upload_storage_option_tags_object, this.state.get_upload_storage_option_tags_object['i'].active)
        if(upload_storage_selected_item == this.props.app_state.loc['1593ew']/* arweave */){
            this.when_file_picked_for_arweave(e, 'image')
            return;
        }
        this.when_file_picked(e, 'image')
        return;
    }

    /* called when audio files have been picked from picker */
    when_audio_picked = (e) => {
        var upload_storage_selected_item = this.get_selected_item(this.state.get_upload_storage_option_tags_object, this.state.get_upload_storage_option_tags_object['i'].active)
        if(upload_storage_selected_item == this.props.app_state.loc['1593ew']/* arweave */){
            this.when_file_picked_for_arweave(e, 'audio')
            return;
        }
        this.when_file_picked(e, 'audio')
        return;
    }

    get_audio_file_image(metadata){
        console.log('stackpage',metadata);
        const picture = metadata.common.picture;

        if (picture && picture.length > 0) {
            // Convert album art to a base64 URL
            const base64String = uint8ArrayToBase64(picture[0].data);
            const albumArtUrl = `data:${picture[0].format};base64,${base64String}`;
            return albumArtUrl
        } else {
            console.log('No album art found.');
            return this.props.app_state.static_assets['music_label']
        }
    }

    /* called when videos have been picked from picker */
    when_video_picked = (e) => {
        var upload_storage_selected_item = this.get_selected_item(this.state.get_upload_storage_option_tags_object, this.state.get_upload_storage_option_tags_object['i'].active)
        if(upload_storage_selected_item == this.props.app_state.loc['1593ew']/* arweave */){
            this.when_file_picked_for_arweave(e, 'video')
            return;
        }
        this.when_file_picked(e, 'video')
        return;
    }

    when_pdf_picked = (e) => {
        var upload_storage_selected_item = this.get_selected_item(this.state.get_upload_storage_option_tags_object, this.state.get_upload_storage_option_tags_object['i'].active)
        if(upload_storage_selected_item == this.props.app_state.loc['1593ew']/* arweave */){
            this.when_file_picked_for_arweave(e, 'pdf')
            return;
        }
        this.when_file_picked(e, 'pdf')
        return;
    }

    when_zip_picked = (e) => {
        var upload_storage_selected_item = this.get_selected_item(this.state.get_upload_storage_option_tags_object, this.state.get_upload_storage_option_tags_object['i'].active)
        if(upload_storage_selected_item == this.props.app_state.loc['1593ew']/* arweave */){
            this.when_file_picked_for_arweave(e, 'zip')
            return;
        }
        this.when_file_picked(e, 'zip')
        return;
    }




    when_file_picked = async (e, type) => {
        if(e.target.files && e.target.files[0]){
            this.props.notify(this.props.app_state.loc['1593by']/* 'Preparing Files...' */, 2000)

            this.selected_files_count = e.target.files.length
            this.selected_files_type = type
            this.file_names = []
            this.audio_file_images = []
            this.audio_file_metadatas = []

            this.files = []
            this.too_big_files = []
            for(var i = 0; i < e.target.files.length; i++){
                this.is_loading_file = true
                let reader = new FileReader();
                reader.onload = function(ev){
                    // console.log('stackpage',ev)
                    var obj = {'data':ev.target.result, 'size': ev.total, 'id':Date.now(), 'type':this.selected_files_type, 'name': '', 'thumbnail':'', 'data_type':type, 'metadata':''}

                    if(ev.total < this.get_upload_file_size_limit()){
                        this.files.push(obj)
                    }else{
                        this.too_big_files.push(obj)
                    }

                    if(this.files.length + this.too_big_files.length == this.selected_files_count){
                        //were done loading the files
                        if(this.too_big_files.length == 0){
                            this.upload_files()
                        }else{
                            var formatted_size = this.format_data_size(this.get_upload_file_size_limit())
                            var fs = formatted_size['size']+' '+formatted_size['unit']
                            this.props.notify(this.props.app_state.loc['1593bw']/* 'One of the files exceeds the current file size limit of ' */+fs, 6000)
                        }
                    }
                    this.is_loading_file = false
                }.bind(this);

                this.file_names.push(e.target.files[i]['name']);

                if(type == 'image'){
                    var imageFile = e.target.files[i];
                    reader.readAsDataURL(imageFile);
                }
                else if(type == 'audio'){
                    var audioFile = e.target.files[i];
                    var me = this
                    parseBlob(audioFile).then(metadata => {
                        this.audio_file_images.push(me.get_audio_file_image(metadata))
                        this.audio_file_metadatas.push(metadata)
                        this.audio_file_metadatas[this.audio_file_metadatas.length - 1].common.picture = null
                        reader.readAsDataURL(audioFile);
                    }).catch(err => {
                        console.error('Error parsing metadata:', err);
                        this.audio_file_images.push(this.props.app_state.static_assets['music_label'])
                        this.audio_file_metadatas.push({})
                        reader.readAsDataURL(audioFile);
                    });
                }
                else if(type == 'video'){
                    var videoFile = e.target.files[i];
                    reader.readAsDataURL(videoFile);
                }
                else if(type == 'pdf'){
                    var pdfFile = e.target.files[i];
                    reader.readAsDataURL(pdfFile)
                }
                else if(type == 'zip'){
                    var zipFile = e.target.files[i];
                    reader.readAsDataURL(zipFile);
                }

                while (this.is_loading_file == true) {
                    if (this.is_loading_file == false) break
                    console.log('stackdata','Waiting for file to be loaded')
                    await new Promise(resolve => setTimeout(resolve, 1000))
                }
            }
        }
    }

    when_file_picked_for_arweave = async (e, type) => {
        if(e.target.files && e.target.files[0]){
            this.props.notify(this.props.app_state.loc['1593ex']/* 'Preparing File...' */, 2000)
            this.selected_file_type = type
            let reader = new FileReader();
            reader.onload = function(ev){
                this.file = {'data':new Uint8Array(ev.target.result), 'size': ev.total, 'id':Date.now(), 'type':this.selected_file_type, 'name': '', 'thumbnail':'', 'data_type':type, 'metadata':''}

                if(ev.total < this.get_upload_file_size_limit()){
                    this.upload_file_to_arweave()
                }else{
                    this.props.notify(this.props.app_state.loc['1593ey']/* 'The file size exceeds the current upload limit.' */, 9000)
                }
            }.bind(this);
            
            this.file_name = e.target.files[0]['name'];
            if(type == 'image'){
                var imageFile = e.target.files[0];
                reader.readAsArrayBuffer(imageFile);
            }
            else if(type == 'audio'){
                var audioFile = e.target.files[0];
                var me = this
                parseBlob(audioFile).then(metadata => {
                    this.audio_file_image = (me.get_audio_file_image(metadata))
                    this.audio_file_metadata = (metadata)
                    this.audio_file_metadata.common.picture = null
                    reader.readAsArrayBuffer(audioFile);
                }).catch(err => {
                    console.error('Error parsing metadata:', err);
                    this.audio_file_image = (this.props.app_state.static_assets['music_label'])
                    this.audio_file_metadatas = {}
                    reader.readAsArrayBuffer(audioFile);
                });
            }
            else if(type == 'video'){
                var videoFile = e.target.files[0];
                reader.readAsArrayBuffer(videoFile);
            }
            else if(type == 'pdf'){
                var pdfFile = e.target.files[0];
                this.pdf_file_image = await this.get_pdf_image_from_file(pdfFile)
                reader.readAsArrayBuffer(pdfFile)
            }
            else if(type == 'zip'){
                var zipFile = e.target.files[0];
                reader.readAsArrayBuffer(zipFile);
            }
        }
    }

    get_pdf_image_from_file = async (file) => {
        let reader = new FileReader();
        this.is_loading_file = true
        reader.onload = function(ev){
            this.pdf_file_image = ev.target.result
            this.is_loading_file = false
        }.bind(this);
        reader.readAsDataURL(file)
        while (this.is_loading_file == true) {
            if (this.is_loading_file == false) break
            console.log('stackdata','Waiting for pdf file image data to be loaded')
            await new Promise(resolve => setTimeout(resolve, 1000))
        }
        return await this.get_pdf_image(this.pdf_file_image)
    }

    get_pdf_image = async (pdfDataUrl) => {
        const pdf = await pdfjsLib.getDocument(pdfDataUrl).promise;
        const firstPage = await pdf.getPage(1);
        const scale = 1.5;
        const viewport = firstPage.getViewport({ scale });
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = viewport.width;
        canvas.height = viewport.width;
        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };
        await firstPage.render(renderContext).promise;
        const thumbnailDataUrl = canvas.toDataURL('image/png');
        return thumbnailDataUrl
    }

    upload_file(file, size, id, type, name, thumbnail, metadata){
        var obj = {'data':file, 'size': size, 'id':id, 'type':type, 'name':name, 'thumbnail':thumbnail, 'data_type':type, 'metadata':metadata}
        // this.props.upload_file_to_web3_or_chainsafe(obj, type)
    }

    upload_files = async () => {
        var size_total = 0
        for(var i = 0; i<this.file_names.length; i++){
            this.files[i]['name'] = this.file_names[i]
            if(this.selected_files_type == 'audio'){
                this.files[i]['thumbnail'] = this.audio_file_images[i];
                this.files[i]['metadata'] = this.audio_file_metadatas[i];
            }
            else if(this.selected_files_type == 'pdf'){
                this.files[i]['thumbnail'] = await this.get_pdf_image(this.files[i]['data'])
            }
            size_total += this.files[i]['size']
        }
        
        var selected_item = this.get_selected_item(this.state.get_upload_storage_option_tags_object, this.state.get_upload_storage_option_tags_object['i'].active)

        if(selected_item == this.props.app_state.loc['1593cw']/* 'nitro 🛰️' */){
            if(size_total > this.get_upload_file_size_limit()){
                this.props.notify(this.props.app_state.loc['1593cy']/* 'The total space for all the selected files exceeds the amount of space youve acquired in the nitro node.' */, 9000)
            }else{
                if(this.state.selected_nitro_item == null){
                   this.props.notify(this.props.app_state.loc['1593coz']/* 'You need to select a nitro node first.' */, 9000) 
                }else if(!this.props.app_state.has_wallet_been_set){
                    this.props.notify(this.props.app_state.loc['2906']/* 'You need to set your wallet first.' */, 9000)
                }
                else{
                    var all_nitros = this.get_all_sorted_objects(this.props.app_state.created_nitros)
                    var obj = this.get_item_in_array2(this.state.selected_nitro_item, all_nitros)
                    var node_details = this.props.app_state.nitro_node_details[this.state.selected_nitro_item]
                    
                    if(obj == null){
                        this.props.notify(this.props.app_state.loc['1593da']/* 'Please wait a few moments for E5 to syncronize fully.' */, 5000)
                    }
                    else if(node_details == null){
                        this.props.notify(this.props.app_state.loc['1593db']/* 'Please wait a few moments for your selected node to come online.' */, 5000)
                    }
                    else{
                        this.props.upload_multiple_files_to_nitro_node(this.files, this.selected_files_type, obj, node_details)
                    }
                }
                
            }
        }
        else{
            this.props.upload_multiple_files_to_web3_or_chainsafe(this.files, this.selected_files_type)
        }
    }

    upload_file_to_arweave = async () => {
        this.file['name'] = this.file_name
        if(this.selected_files_type == 'audio'){
            this.file['thumbnail'] = this.audio_file_image;
            this.file['metadata'] = this.audio_file_metadata;
        }
        else if(this.selected_files_type == 'pdf'){
            this.file['thumbnail'] = this.pdf_file_image
        }

        if(!this.props.app_state.has_wallet_been_set){
            this.props.notify(this.props.app_state.loc['2906']/* 'You need to set your wallet first.' */, 5000)
            return;
        }

        var wallet_data = this.props.app_state.coin_data['AR']
        var wallet_address = wallet_data != null ? wallet_data['address'] : 'LPaDEyLV_65-koonfKiay_DU8Ti2nEZU6GU56bb1C_U'
        var my_arweave_balance = wallet_data != null ? wallet_data['balance'] : 0
        if(wallet_address == 'LPaDEyLV_65-koonfKiay_DU8Ti2nEZU6GU56bb1C_U'){
            this.props.notify(this.props.app_state.loc['2738h']/* 'Please wait for your Arweave wallet to finish loading first.' */, 9000)
            return;
        }
        else if(my_arweave_balance == 0){
            this.props.notify(this.props.app_state.loc['1593er']/* 'Your Arweave balance is insufficient to make the transaction.' */, 9000)
            return;
        }
        else if(this.props.app_state.is_uploading_to_arweave == true){
            this.props.notify(this.props.app_state.loc['1593ez']/* 'Please wait for arweave to finish uploading your previous file.' */, 11000)
            return;
        }
        
        this.props.prompt_confirmation_for_arweave_upload(this.file, this.selected_file_type)
    }

    get_item_in_array2(e5_id, object_array){
        var object = object_array.find(x => x['e5_id'] === e5_id);
        return object
    }



    

    render_uploaded_files(){
        var items = this.get_all_uploaded_file_item_cids()

        if(items.length == 0){
            return(
                <div style={{}}>
                    {this.render_empty_views(3)}
                </div>
            )
        }else{
            return(
                <div style={{}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px', 'listStyle':'none'}}>
                        {items.map((item, index) => (
                            <div style={{'margin':'3px 0px 3px 0px'}}>
                                {this.render_uploaded_file(item, index)}
                            </div>
                        ))}
                    </ul>
                </div>
            )
        }
    }

    get_all_uploaded_file_item_cids(){
        var selected_item = this.get_selected_item(this.state.get_file_data_option_tags_object, this.state.get_file_data_option_tags_object['i'].active);
        
        var file_type = ''
        if(selected_item == this.props.app_state.loc['1593bk']/* all */ || selected_item == this.props.app_state.loc['1593bl']/* 'images' */){
            file_type = 'image'
        }
        else if(selected_item == this.props.app_state.loc['1593bm']/* 'audio' */){
            file_type = 'audio'
        }
        else if(selected_item == this.props.app_state.loc['1593bn']/* 'video' */){
            file_type = 'video'
        }
        else if(selected_item == this.props.app_state.loc['1593cd']/* 'pdf' */){
            file_type = 'pdf'
        }
        else if(selected_item == this.props.app_state.loc['1593ed']/* 'zip' */){
            file_type = 'zip'
        }

        var items = this.props.app_state.uploaded_data_cids
        var return_items = []
        items.forEach(ecid => {
            const data = this.get_cid_split(ecid)
            if(data != null && (data['filetype'] == file_type || selected_item == this.props.app_state.loc['1593bk']/* all */)){
                if(this.props.app_state.uploaded_data[data['filetype']] != null){
                    const file_data = this.props.app_state.uploaded_data[data['filetype']][data['full']]
                    if(file_data != null){
                        const time = file_data['id']
                        return_items.push({'data':data, 'time':time})
                    }
                }
            }
        });

        var sorted_items = this.sortByAttributeDescending(return_items, 'time')
        var final_items = []
        sorted_items.forEach(item => {
            final_items.push(item['data'])
        });

        return final_items
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

    render_uploaded_file(ecid_obj, index){
        var background_color = this.props.theme['view_group_card_item_background'];
        if(this.props.app_state.uploaded_data[ecid_obj['filetype']] == null) return
        var data = this.props.app_state.uploaded_data[ecid_obj['filetype']][ecid_obj['full']]
        var opacity = this.props.app_state.uncommitted_upload_cids.includes(ecid_obj['full']) ? 0.6 : 1.0
        if(data != null){
            if(data['type'] == 'image'){
                var img = data['data']
                var formatted_size = this.format_data_size(data['size'])
                var fs = formatted_size['size']+' '+formatted_size['unit']
                var title = data['type']+' • '+fs+' • '+this.get_time_difference(data['id']/1000)+this.props.app_state.loc['1593bx']/* ' ago.' */
                var details = data['name']
                return(
                    <div style={{opacity:opacity}} onClick={() => this.when_file_clicked(ecid_obj)}>
                        {this.render_detail_item('8', {'details':title,'title':details, 'size':'l', 'image':img, 'border_radius':'15%', 'image_width':'auto'})}
                    </div>
                )
            }
            else if(data['type'] == 'audio'){
                var formatted_size = this.format_data_size(data['size'])
                var fs = formatted_size['size']+' '+formatted_size['unit']
                var title = data['type']+' • '+fs+' • '+this.get_time_difference(data['id']/1000)+this.props.app_state.loc['1593bx']/* ' ago.' */;
                var details = data['name']
                var thumbnail = data['thumbnail']
                return(
                    <div style={{opacity:opacity}} onClick={() => this.when_file_clicked(ecid_obj)}>
                        {this.render_detail_item('8', {'details':title,'title':details, 'size':'l', 'image':thumbnail, 'border_radius':'15%', 'image_width':50})}
                    </div>
                )
            }
            else if(data['type'] == 'video'){
                var video = encodeURI(data['data'])
                var font_size = ['15px', '12px', 19];
                var formatted_size = this.format_data_size(data['size'])
                var fs = formatted_size['size']+' '+formatted_size['unit']
                var details = data['type']+' • '+fs+' • '+this.get_time_difference(data['id']/1000)+this.props.app_state.loc['1593bx']/* ' ago.' */
                var title = data['name']
                if(this.props.app_state.video_thumbnails[ecid_obj['full']] != null){
                    var thumbnail = this.props.app_state.video_thumbnails[ecid_obj['full']]
                    return(
                        <div style={{opacity:opacity}} onClick={() => this.when_file_clicked(ecid_obj)}>
                            {this.render_detail_item('8', {'details':title,'title':details, 'size':'l', 'image':thumbnail, 'border_radius':'9px', 'image_width':'auto'})}
                        </div>
                    )
                }
                return(
                    <div style={{'display': 'flex','flex-direction': 'row','padding': '10px 15px 10px 0px','margin':'0px 0px 0px 0px', 'background-color': background_color,'border-radius': '8px', opacity:opacity}} onClick={() => this.when_file_clicked(ecid_obj)}>
                        <div style={{'display': 'flex','flex-direction': 'row','padding': '0px 0px 0px 5px', width: '99%'}}>
                            <div>
                                <video height="50" style={{'border-radius':'7px'}}>
                                    <source src={video} type="video/mp4"/>
                                    <source src={video} type="video/ogg"/>
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                            <div style={{'margin':'0px 0px 0px 10px'}}>
                                <p style={{'font-size': font_size[0],'color': this.props.theme['primary_text_color'],'margin': '5px 0px 0px 0px','font-family': this.props.font,'text-decoration': 'none', height:'auto', 'word-wrap': 'break-word'}}>{title}</p> 
                                
                                <p style={{'font-size': font_size[1],'color': this.props.theme['secondary_text_color'],'margin': '0px 0px 0px 0px','font-family': this.props.font,'text-decoration': 'none', 'white-space': 'pre-line', 'word-wrap': 'break-word' }}>{details}</p>
                            </div>
                        </div>
                    </div>
                )
            }
            else if(data['type'] == 'pdf'){
                var formatted_size = this.format_data_size(data['size'])
                var fs = formatted_size['size']+' '+formatted_size['unit']
                var title = data['type']+' • '+fs+' • '+this.get_time_difference(data['id']/1000)+this.props.app_state.loc['1593bx']/* ' ago.' */;
                var details = data['name']
                var thumbnail = data['thumbnail']
                return(
                    <div style={{opacity:opacity}} onClick={() => this.when_file_clicked(ecid_obj)}>
                        {this.render_detail_item('8', {'details':title,'title':details, 'size':'l', 'image':thumbnail, 'border_radius':'15%'})}
                    </div>
                )
            }
            else if(data['type'] == 'zip'){
                var formatted_size = this.format_data_size(data['size'])
                var fs = formatted_size['size']+' '+formatted_size['unit']
                var title = data['type']+' • '+fs+' • '+this.get_time_difference(data['id']/1000)+this.props.app_state.loc['1593bx']/* ' ago.' */;
                var details = data['name']
                var thumbnail = this.props.app_state.static_assets['zip_file']
                return(
                    <div style={{opacity:opacity}} onClick={() => this.when_file_clicked(ecid_obj)}>
                        {this.render_detail_item('8', {'details':title,'title':details, 'size':'l', 'image':thumbnail, 'border_radius':'15%'})}
                    </div>
                )
            }
        }
    }

    when_file_clicked(ecid_obj){
        this.props.when_file_tapped(ecid_obj)
    }













    render_set_custom_ipfs_gateway(){
        var size = this.props.size
        if(size == 's'){
            return(
                <div>
                    {this.render_set_custom_gateway_data()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_set_custom_gateway_data()}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_empty_views(3)}
                    </div>
                </div>
                
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_set_custom_gateway_data()}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_empty_views(3)}
                    </div>
                </div>
                
            )
        }
    }

    render_set_custom_gateway_data(){
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['1593ck']/* 'Set Custom Ipfs Gateway' */, 'details':this.props.app_state.loc['1593cl']/* 'You can specify a custom gateway for serving all your content.' */, 'size':'l'})}
                <div style={{height:10}}/>
                <div className="row" style={{width:'100%'}}>
                    <div className="col-11" style={{'margin': '0px 0px 0px 0px'}}>
                        <TextInput font={this.props.app_state.font} height={30} placeholder={this.props.app_state.loc['1593cm']/* 'https://ipfs.io/cid' */} when_text_input_field_changed={this.when_custom_gateway_text_changed.bind(this)} text={this.state.custom_gateway_text} theme={this.props.theme}/>
                    </div>
                    <div className="col-1" style={{'padding': '0px 10px 0px 0px'}} onClick={()=>this.set_custom_ipfs_gateway()} >
                        <div className="text-end" style={{'padding': '5px 0px 0px 0px'}} >
                            <img className="text-end" src={this.props.theme['add_text']} style={{height:37, width:'auto'}} />
                        </div>
                    </div>
                </div>
                {this.render_detail_item('10',{'font':this.props.app_state.font, 'textsize':'10px','text':this.props.app_state.loc['1593cn']/* 'paste \'cid\' whenre the content cid would be used.' */})}
                <div style={{height:10}}/>
                {this.render_detail_item('4', {'text':this.props.app_state.custom_gateway, 'textsize':'13px', 'font':this.props.app_state.font})}
            </div>
        )
    }

    when_custom_gateway_text_changed(text){
        this.setState({custom_gateway_text:text})
    }

    set_custom_ipfs_gateway(){
        var custom_gateway_text = this.state.custom_gateway_text.trim()

        if(custom_gateway_text == ''){
            this.props.notify(this.props.app_state.loc['1593bh']/* 'Type something.' */, 4000)
        }
        else if(!this.isValidURL(custom_gateway_text)){
            this.props.notify(this.props.app_state.loc['1593co']/* 'That gateway link is not valid.' */, 4000)
        }
        else if(!custom_gateway_text.includes('cid')){
            this.props.notify(this.props.app_state.loc['1593cq']/* 'The url needs to include the keyword \'cid\'' */, 4000)
        }
        else{
            this.props.notify(this.props.app_state.loc['1593cp']/* 'gateway set. */, 1400)
            this.props.set_custom_gateway(custom_gateway_text)
        }
    }

    isValidURL(url) {
        const pattern = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/\S*)?$/;
        return pattern.test(url);
    }











    render_set_following_moderator(){
        var size = this.props.size
        if(size == 's'){
            return(
                <div>
                    {this.render_set_following_moderator_data()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_set_following_moderator_data()}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_empty_views(3)}
                    </div>
                </div>
                
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_set_following_moderator_data()}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_empty_views(3)}
                    </div>
                </div>
                
            )
        }
    }

    render_set_following_moderator_data(){
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['1593dg']/* 'Followed Moderators.' */, 'details':this.props.app_state.loc['1593dh']/* 'You can specify specific accounts you wish to moderate the content you see here in E5.' */, 'size':'l'})}

                <div style={{height:10}}/>
                <div className="row" style={{width:'100%'}}>
                    <div className="col-11" style={{'margin': '0px 0px 0px 0px'}}>
                        <TextInput font={this.props.app_state.font} height={30} placeholder={this.props.app_state.loc['1593di']/* 'Account ID...' */} when_text_input_field_changed={this.when_follow_account_text_changed.bind(this)} text={this.state.follow_account_text} theme={this.props.theme}/>
                    </div>
                    <div className="col-1" style={{'padding': '0px 10px 0px 0px'}} onClick={()=>this.add_follow_account()} >
                        <div className="text-end" style={{'padding': '5px 0px 0px 0px'}} >
                            <img className="text-end" src={this.props.theme['add_text']} style={{height:37, width:'auto'}} />
                        </div>
                    </div>
                </div>
                <div style={{height:20}}/>
                {this.render_my_followed_accounts()}
            </div>
        )
    }

    when_follow_account_text_changed(text){
        this.setState({follow_account_text: text})
    }

    add_follow_account(){
        var account = this.state.follow_account_text
        var account_id = this.get_typed_alias_id(account)

        if(account == ''){
            this.props.notify(this.props.app_state.loc['1593dj']/* 'You need to specify an account first.' */, 4000)
        }
        else if(this.is_account_aleady_followed(account)){
            this.props.notify(this.props.app_state.loc['1593dk']/* 'Youre already following that account.' */, 4000)
        }
        else if(this.props.app_state.user_account_id[this.props.app_state.selected_e5] == account_id){
            this.props.notify(this.props.app_state.loc['1593dn']/* 'You cant follow yourself.' */, 4000)
        }
        else{
            this.props.follow_account(account_id)
            this.props.notify(this.props.app_state.loc['1593dl']/* 'You are now following that account.' */, 2000)
        }
    }

    get_typed_alias_id(alias){
        if(!isNaN(alias)){
            return alias
        }
        var id = (this.props.app_state.alias_owners[this.props.app_state.selected_e5][alias] == null ? 
            alias : this.props.app_state.alias_owners[this.props.app_state.selected_e5][alias])

        return id
    }

    is_account_aleady_followed(account){
        var n = this.props.app_state.selected_e5 + ':' + account
        return this.props.app_state.followed_accounts.includes(n)
    }

    render_my_followed_accounts(){
        var items = [].concat(this.props.app_state.followed_accounts)

        if(items.length == 0){
            items = [0, 0]
            return(
                <div style={{}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.map((item, index) => (
                            <li style={{'padding': '2px'}} onClick={()=>console.log()}>
                                <div style={{height:60, width:'100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px','padding':'10px 0px 10px 10px', 'max-width':'420px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                                    <div style={{'margin':'10px 20px 10px 0px'}}>
                                        <img src={this.props.app_state.theme['letter']} style={{height:30 ,width:'auto'}} />
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }else{
            return(
                <div style={{}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px', 'listStyle':'none'}}>
                        {items.reverse().map((item, index) => (
                            <SwipeableList>
                                <SwipeableListItem
                                    swipeLeft={{
                                    content: <p style={{'color': this.props.theme['primary_text_color']}}>{this.props.app_state.loc['1593dm']/* Unfollow */}</p>,
                                    action: () =>this.props.remove_followed_account(item, index)
                                    }}>
                                    <div style={{width:'100%', 'background-color':this.props.theme['send_receive_ether_background_color']}}>
                                        <li style={{'padding': '2px'}}>
                                            {this.render_followed_account_item(item)}
                                        </li>
                                    </div>
                                </SwipeableListItem>
                            </SwipeableList>
                        ))}
                    </ul>
                </div>
            )
        }
    }

    render_followed_account_item(item){
        var split_account_array = item.split(':')
        var e5 = split_account_array[0]
        var account = split_account_array[1]
        var alias = this.get_followed_account_name_from_id(account, e5)
        return(
            <div>
                {this.render_detail_item('3', {'title':' • '+(account), 'details':alias, 'title_image':this.props.app_state.e5s[e5].e5_img, 'size':'l'})}
            </div>
        )
    }

    get_followed_account_name_from_id(account, e5) {
        if (account == this.props.app_state.user_account_id[e5]) {
            return this.props.app_state.loc['1694']/* 'You' */
        } else {
            var alias = (this.props.app_state.alias_bucket[e5][account] == null ? account : this.props.app_state.alias_bucket[e5][account])
            return alias
        }
    }













    render_censor_keywords_ui(){
        var size = this.props.size
        if(size == 's'){
            return(
                <div>
                    {this.render_censor_keywords_data()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_censor_keywords_data()}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_empty_views(3)}
                    </div>
                </div>
                
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_censor_keywords_data()}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_empty_views(3)}
                    </div>
                </div>
                
            )
        }
    }

    render_censor_keywords_data(){
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['1593dr']/* 'Censor Keywords.' */, 'details':this.props.app_state.loc['1593ds']/* 'You can specify phrases, keywords and accounts you wish to not see any content from. The censored phrases will be applied to all accounts you moderate.' */, 'size':'l'})}
                <div style={{height:10}}/>

                <div className="row" style={{width:'100%'}}>
                    <div className="col-11" style={{'margin': '0px 0px 0px 0px'}}>
                        <TextInput font={this.props.app_state.font} height={30} placeholder={this.props.app_state.loc['1593dt']/* 'Keyword or phrase...' */} when_text_input_field_changed={this.when_censor_keyword_text_text_changed.bind(this)} text={this.state.censor_keyword_text} theme={this.props.theme}/>
                    </div>
                    <div className="col-1" style={{'padding': '0px 10px 0px 0px'}} onClick={()=>this.add_censored_keyword()} >
                        <div className="text-end" style={{'padding': '5px 0px 0px 0px'}} >
                            <img className="text-end" src={this.props.theme['add_text']} style={{height:37, width:'auto'}} />
                        </div>
                    </div>
                </div>
                <div style={{height:20}}/>
                {this.render_my_censored_keywords()}
            </div>
        )
    }

    when_censor_keyword_text_text_changed(text){
        this.setState({censor_keyword_text: text})
    }

    add_censored_keyword(){
        var censor_keyword_text = this.state.censor_keyword_text.trim()

        if(censor_keyword_text == ''){
            this.props.notify(this.props.app_state.loc['1593du']/* 'You need to specify an account first.' */, 4000)
        }
        else if(this.already_censored_keyword(censor_keyword_text)){
            this.props.notify(this.props.app_state.loc['1593dv']/* 'Youve already censored that keyword.' */, 4000)
        }
        else if(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(censor_keyword_text) /* || /\p{Emoji}/u.test(typed_word) */){
            this.props.notify(this.props.app_state.loc['162m'], 4400)/* You cant use special characters. */
        }
        else{
            this.props.censor_keyword(censor_keyword_text)
            this.props.notify(this.props.app_state.loc['1593dw']/* 'You are now censoring that keyword or phrase.' */, 2000)
        }
    }

    already_censored_keyword(already_censored_keyword){
        return this.props.app_state.censored_keyword_phrases.includes(already_censored_keyword)
    }

    render_my_censored_keywords(){
        var items = [].concat(this.props.app_state.censored_keyword_phrases)

        if(items.length == 0){
            items = [0, 0]
            return(
                <div style={{}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.map((item, index) => (
                            <li style={{'padding': '2px'}} onClick={()=>console.log()}>
                                <div style={{height:60, width:'100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px','padding':'10px 0px 10px 10px', 'max-width':'420px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                                    <div style={{'margin':'10px 20px 10px 0px'}}>
                                        <img src={this.props.app_state.theme['letter']} style={{height:30 ,width:'auto'}} />
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }else{
            return(
                <div style={{}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px', 'listStyle':'none'}}>
                        {items.reverse().map((item, index) => (
                            <SwipeableList>
                                <SwipeableListItem
                                    swipeLeft={{
                                    content: <p style={{'color': this.props.theme['primary_text_color']}}>{this.props.app_state.loc['1593dy']/* Uncensor */}</p>,
                                    action: () =>this.props.uncensor_keyword(item, index)
                                    }}>
                                    <div style={{width:'100%', 'background-color':this.props.theme['send_receive_ether_background_color']}}>
                                        <li style={{'padding': '2px'}}>
                                            {this.render_detail_item('4',{'font':this.props.app_state.font, 'textsize':'15px','text':item})}
                                        </li>
                                    </div>
                                </SwipeableListItem>
                            </SwipeableList>
                        ))}
                    </ul>
                </div>
            )
        }
    }









    render_contextual_transfers_ui(){
        var size = this.props.size
        if(size == 's'){
            return(
                <div>
                    {this.render_contextual_transfers_data()}
                    {this.load_itransfer_search_results()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_contextual_transfers_data()}
                        {this.render_empty_views(2)}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.load_itransfer_search_results()}
                    </div>
                </div>
                
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_contextual_transfers_data()}
                        {this.render_empty_views(2)}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.load_itransfer_search_results()}
                    </div>
                </div>
                
            )
        }
    }

    render_contextual_transfers_data(){
        return(
            <div style={{'padding': '0px 0px 0px 10px'}}>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['1593gg']/* 'Create or Verify an iTransfer.' */, 'details':this.props.app_state.loc['1593gh']/* 'Create or verify a set of transfers that have been made with an attached identifier.' */, 'size':'l'})}
                <div style={{height:10}}/>

                <div onClick={() => this.open_create_itransfer_ui()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['1593gi']/* 'Create or Verify iTransfer' */, 'action':'', 'text_transform': 'none'})}
                </div>

                {this.render_detail_item('0')}

                {this.render_detail_item('3', {'title':this.props.app_state.loc['1593gl']/* 'Track Recent iTransfers.' */, 'details':this.props.app_state.loc['1593gm']/* 'Track the most recent iTransfers that have been made to your account with a specific identifier.' */, 'size':'l'})}
                <div style={{height:10}}/>
                <div className="row" style={{width:'100%'}}>
                    <div className="col-11" style={{'margin': '0px 0px 0px 0px'}}>
                        <TextInput font={this.props.app_state.font} height={30} placeholder={this.props.app_state.loc['3068f']/* 'Unique Identifier...' */} when_text_input_field_changed={this.when_search_identifier_input_field_changed.bind(this)} text={this.state.search_identifier} theme={this.props.theme}/>
                    </div>
                    <div className="col-1" style={{'padding': '0px 10px 0px 0px'}} onClick={()=>this.perform_verify_itransfer_search()}>
                        <div className="text-end" style={{'padding': '5px 0px 0px 0px'}} >
                            <img className="text-end" src={this.props.theme['add_text']} style={{height:37, width:'auto'}} />
                        </div>
                    </div>
                </div>
                <div style={{height:20}}/>
            </div>
        )
    }

    open_create_itransfer_ui(){
        this.props.show_view_contextual_transfer_bottomsheet('')
    }

    when_search_identifier_input_field_changed(text){
        this.setState({search_identifier: text})
    }

    perform_verify_itransfer_search(){
        var identifier = this.state.search_identifier.trim()
        
        if(identifier == ''){
            this.props.notify(this.props.app_state.loc['3068o']/* 'You need to set an identifier first.' */, 6000)
        }
        else if(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(identifier) || /\p{Emoji}/u.test(identifier)){
            this.props.notify(this.props.app_state.loc['162m'], 4400)/* You cant use special characters. */
        }
        else{
            this.props.notify(this.props.app_state.loc['1593gn']/* 'Listening for current iTransfers..' */, 4000)
            this.props.set_contextual_transfer_identifier(identifier)
        }
    }

    load_itransfer_search_results(){
        var items = [].concat(this.load_itransfer_result_items())
        if(items.length == 0){
            return(
                <div>
                    {this.render_empty_views(3)}
                </div>
            )
        }else{
            return(
                <div>
                    {items.map((item, index) => (
                        <div key={index}>
                            {this.render_itransfer_item(item)}
                        </div>
                    ))}
                </div>
            )
        }
    }

    render_itransfer_item(item){
        var alias = this.get_senders_name_or_you2(item['account'], item['e5'])
        return(
            <div>
                {this.render_detail_item('3', {'title':alias, 'details':item['account'], 'size':'l', 'border_radius':'0%'},)}
                <div style={{height: 3}}/>

                {this.render_detail_item('3', {'title':''+(new Date(item['time']*1000)), 'details':this.get_time_diff((Date.now()/1000) - (parseInt(item['time'])))+this.props.app_state.loc['1698a']/* ' ago' */, 'size':'l'})}
                <div style={{height: 3}}/>

                <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['view_group_card_item_background'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                    <div style={{'margin':'0px 0px 0px 5px'}}>
                        {this.render_detail_item('10',{'font':this.props.app_state.font, 'textsize':'12px','text':this.props.app_state.loc['3068y']/* All Transfers */})}
                    </div>

                    {item['transfers'].map((transfer, index) => (
                        <div onClick={() => this.props.view_number({'title':this.props.app_state.loc['1182']/* 'Amount' */, 'number':transfer['amount'], 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[transfer['exchange']]})}>
                            {this.render_detail_item('2', { 'style':'s', 'title':'', 'subtitle':'', 'barwidth':this.calculate_bar_width(transfer['amount']), 'number':this.format_account_balance_figure(transfer['amount']), 'barcolor':'', 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[transfer['exchange']], })}
                        </div>
                    ))}
                </div>
                {this.render_detail_item('0')}
            </div>
        )
    }

    get_senders_name_or_you2(sender, e5){
        if(sender == this.props.app_state.user_account_id[e5]){
            return this.props.app_state.loc['1694']/* You. */
        }
        var bucket = this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)
        var alias = (bucket[sender] == null ? this.props.app_state.loc['1591']/* Unknown */ : bucket[sender])
        return alias
    }

    load_itransfer_result_items(){
        var key = this.props.app_state.tracked_contextual_transfer_identifier
        var selected_e5 = this.props.app_state.tracked_contextual_transfer_e5
        var object = this.props.app_state.stack_contextual_transfer_data[key]
        if(object == null) return []

        var blocks = Object.keys(object)
        var object_array = []
        blocks.forEach(block => {
            var sender_accounts = Object.keys(object[block])
            sender_accounts.forEach(account => {
                var transfers = this.process_transfers(object[block][account])
                var time = object[block][account][0].returnValues.p5/* timestamp */
                object_array.push({'account':account, 'block':block, 'transfers':transfers, 'time':time, 'e5':selected_e5})
            });
        });

        return this.sortByAttributeDescending(object_array, 'time')
    }

    process_transfers(transfers){
        var obj = {}
        transfers.forEach(transfer => {
            var exchange = transfer.returnValues.p1
            var amount = transfer.returnValues.p4/* amount */
            var depth = transfer.returnValues.p7/* depth */
            if(obj[exchange] == null){
                obj[exchange] = bigInt('0')
            }
            var actual_amount = this.get_actual_number(amount, depth)
            obj[exchange] = bigInt(obj[exchange]).plus(bigInt(actual_amount))
        });

        var exchange_transfers = Object.keys(obj)
        var final_transfers = []
        exchange_transfers.forEach(key => {
            final_transfers.push({'amount':obj[key], 'exchange':key})
        });

        return final_transfers
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

    /* renders the specific element in the post or detail object */
    render_detail_item(item_id, object_data){
        var uploaded_data = {}
        if(item_id == '8' || item_id == '7' || item_id == '8'|| item_id == '9' || item_id == '11' || item_id == '12')uploaded_data = this.props.app_state.uploaded_data
        return(
            <div>
                <ViewGroups uploaded_data={uploaded_data} graph_type={this.props.app_state.graph_type} font={this.props.app_state.font} item_id={item_id} object_data={object_data} theme={this.props.theme} when_add_word_button_tapped={this.when_add_word_button_tapped.bind(this)} delete_entered_seed_word={this.delete_entered_seed_word.bind(this)} when_set_wallet_button_tapped={this.when_set_wallet_button_tapped.bind(this)}/>
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

    format_proportion(proportion){
        return ((proportion/10**18) * 100)+'%';
    }



}




export default StackPage;