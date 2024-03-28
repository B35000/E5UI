import React, { Component } from 'react';
import Tags from './../components/tags';
import ViewGroups from './../components/view_groups'
import TextInput from './../components/text_input';
import NumberPicker from './../components/number_picker';
import DurationPicker from './../components/duration_picker';

// import Letter from './../assets/letter.png';
import Dialog from "@mui/material/Dialog";
import { SwipeableList, SwipeableListItem } from '@sandstreamdev/react-swipeable-list';
import '@sandstreamdev/react-swipeable-list/dist/styles.css';

// import { ethToEvmos, evmosToEth } from '@evmos/address-converter'
import { from } from "@iotexproject/iotex-address-ts";

var bigInt = require("big-integer");
const { toBech32, fromBech32,} = require('@harmony-js/crypto');


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

        get_wallet_thyme_tags_object:this.get_wallet_thyme_tags_object(),
        gas_history_chart_tags_object:this.get_gas_history_chart_tags_object(),

        typed_word:'',added_tags:[],set_salt: 0,
        run_gas_limit:0, run_gas_price:0, hidden:[], invalid_ether_amount_dialog_box: false,

        typed_contact_word:'', typed_alias_word:'', typed_blocked_account_word:'',
        run_time_expiry:0, confirm_clear_stack_dialog:false,

        picked_max_priority_per_gas_amount:0,
        picked_max_fee_per_gas_amount:0
    };

    get_stack_page_tags_object(){
        var obj = {
            'i':{
                active:'e', 
            },
            'e':[
                ['or','',0], ['e','e.'+this.props.app_state.loc['1260']/* 'e.stack-data' */,'e.'+this.props.app_state.loc['1261']/* 'e.settings-data' */, 'e.'+this.props.app_state.loc['1262']/* 'e.account-data' */, this.props.app_state.loc['1593d']/* 'Notifications 🔔' */], [0]
            ],
            'stack-data':[
              ['xor','e',1], [this.props.app_state.loc['1260']/* 'stack-data' */,this.props.app_state.loc['1408']/* 'stack 📥' */,this.props.app_state.loc['1409']/* 'history 📜' */], [1],[1]
            ],
            'settings-data':[
              ['xor','e',1], [this.props.app_state.loc['1261']/* 'settings-data' */,this.props.app_state.loc['1410']/* settings ⚙️' */,this.props.app_state.loc['1411']/* 'wallet 👛' */], [1],[1]
            ],
            'account-data':[
              ['xor','e',1], [this.props.app_state.loc['1262']/* 'account-data' */,this.props.app_state.loc['1412']/* 'alias 🏷️' */,this.props.app_state.loc['1413']/* 'contacts 👤' */, this.props.app_state.loc['1414']/* 'blacklisted 🚫' */], [1],[1]
            ],
        };

        obj[this.props.app_state.loc['1260']/* 'stack-data' */] = [
              ['xor','e',1], [this.props.app_state.loc['1260']/* 'stack-data' */,this.props.app_state.loc['1408']/* 'stack 📥' */,this.props.app_state.loc['1409']/* 'history 📜' */], [1],[1]
            ]
        obj[this.props.app_state.loc['1261']/* 'settings-data' */] = [
              ['xor','e',1], [this.props.app_state.loc['1261']/* 'settings-data' */,this.props.app_state.loc['1410']/* settings ⚙️' */,this.props.app_state.loc['1411']/* 'wallet 👛' */], [1],[1]
            ]
        obj[this.props.app_state.loc['1262']/* 'account-data' */] = [
              ['xor','e',1], [this.props.app_state.loc['1262']/* 'account-data' */,this.props.app_state.loc['1412']/* 'alias 🏷️' */,this.props.app_state.loc['1413']/* 'contacts 👤' */, this.props.app_state.loc['1414']/* 'blacklisted 🚫' */], [1],[1]
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
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e',this.props.app_state.loc['1417']/* 'light' */,this.props.app_state.loc['1418']/* 'dark' */, this.props.app_state.loc['1593a']/* 'auto' *//* , this.props.app_state.loc['2741'] *//* green */], [this.get_light_dark_option()]
            ],
        };
        
    }

    get_light_dark_option(){
        if(this.props.app_state.theme['name'] == this.props.app_state.loc['1417']/* 'light' */){
            return 1
        }
        else if(this.props.app_state.theme['name'] == this.props.app_state.loc['1418']/* 'dark' */){
            return 2
        }
        else if(this.props.app_state.theme['name'] == this.props.app_state.loc['1593a']/* 'auto' */){
            return 3
        }
        else if(this.props.app_state.theme['name'] == this.props.app_state.loc['2741']/* green */){
            return 4
        }
        return 1
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
                ['xor','',0], ['e', 'infura', 'web3-storage', 'nft-storage'], [this.get_selected_storage_option()]
            ],
        };
    }

    get_selected_storage_option(){
        if(this.props.app_state.storage_option == 'infura'){
            return 1
        }
        else if(this.props.app_state.storage_option == 'web3-storage'){
            return 2
        }
        else if(this.props.app_state.storage_option == 'nft-storage'){
            return 3
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










    render(){
        return(
            <div style={{'margin':'10px 10px 0px 10px', 'padding':'0px'}}>
                <Tags font={this.props.app_state.font} page_tags_object={this.state.get_stack_page_tags_object} tag_size={'l'} when_tags_updated={this.when_stack_tags_updated.bind(this)} theme={this.props.theme} app_state={this.props.app_state}/>
                
                <div style={{'margin':'10px 0px 0px 0px', overflow: 'auto', maxHeight: this.props.height-120}}>
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
        }else 
        if(selected_item == this.props.app_state.loc['1408']/* 'stack 📥' */){
            return(
                <div>
                    {this.render_stack_transactions_part()}
                </div>
            )    
        }
        if(selected_item == this.props.app_state.loc['1409']/* 'history 📜' */){
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
        else if(selected_item == this.props.app_state.loc['1593d']/* 'Notifications 🔔' */){
            return(
                <div>
                    {this.render_notifications()}
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

                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['1429']/* 'Transaction Gas Limit' */, 'subtitle':this.format_power_figure(this.state.run_gas_limit), 'barwidth':this.calculate_bar_width(this.state.run_gas_limit), 'number':this.format_account_balance_figure(this.state.run_gas_limit), 'barcolor':'', 'relativepower':this.props.app_state.loc['1430']/* 'units' */, })}
                </div>

                <NumberPicker font={this.props.app_state.font} number_limit={bigInt('1e72')} when_number_picker_value_changed={this.when_run_gas_limit.bind(this)} theme={this.props.theme} power_limit={63}/>
                
                <div style={{height:10}}/>
                <div style={{'padding': '5px'}} onClick={()=>this.set_tx_gas_limit()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['1432']/* 'Auto-Set Gas Limit' */, 'action':''})}
                </div>

                {this.render_detail_item('0')}

                {this.show_gas_price_or_eip_options()}

                {this.render_detail_item('0')}

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
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['1593q']/* 'Transaction Max Priority Fee Per Gas.' */, 'details':this.props.app_state.loc['1593r']/* 'The max priority fee per gas(miner tip) for your next run with E5.' */, 'size':'l'})}
                    <div style={{height:10}}/>

                    <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                        {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['1593q']/* 'Transaction Max Priority Fee Per Gas.' */, 'subtitle':this.format_power_figure(this.state.picked_max_priority_per_gas_amount), 'barwidth':this.calculate_bar_width(this.state.picked_max_priority_per_gas_amount), 'number':this.format_account_balance_figure(this.state.picked_max_priority_per_gas_amount), 'barcolor':'', 'relativepower':'wei', })}
                    </div>

                    <NumberPicker font={this.props.app_state.font} number_limit={bigInt('1e72')} when_number_picker_value_changed={this.when_max_priority_amount.bind(this)} theme={this.props.theme} power_limit={63}/>




                    {this.render_detail_item('3', {'title':this.props.app_state.loc['1593s']/* 'Max Fee per Gas.' */, 'details':this.props.app_state.loc['1593t']/* 'The maximum amount of gas fee your willing to pay for your next run with E5.' */, 'size':'l'})}
                    <div style={{height:10}}/>

                    <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                        {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['1593s']/* 'Max Fee per Gas.' */, 'subtitle':this.format_power_figure(this.state.picked_max_fee_per_gas_amount), 'barwidth':this.calculate_bar_width(this.state.picked_max_fee_per_gas_amount), 'number':this.format_account_balance_figure(this.state.picked_max_fee_per_gas_amount), 'barcolor':'', 'relativepower':'wei', })}
                    </div>

                    <NumberPicker font={this.props.app_state.font} number_limit={bigInt('1e72')} when_number_picker_value_changed={this.when_max_fee_per_gas_amount.bind(this)} theme={this.props.theme} power_limit={63}/>

                </div>
            )
        }else{
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['1433']/* 'Transaction Gas Price' */, 'details':this.props.app_state.loc['1434']/* 'The gas price for your next run with E5. The default is set to the amount set by the network.' */, 'size':'l'})}
                    <div style={{height:10}}/>

                    <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                        {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['1433']/* 'Transaction Gas Price' */, 'subtitle':this.format_power_figure(this.state.run_gas_price), 'barwidth':this.calculate_bar_width(this.state.run_gas_price), 'number':this.format_account_balance_figure(this.state.run_gas_price), 'barcolor':'', 'relativepower':'wei', })}
                    </div>

                    <NumberPicker font={this.props.app_state.font} number_limit={bigInt('1e72')} when_number_picker_value_changed={this.when_run_gas_price.bind(this)} theme={this.props.theme} power_limit={63}/>
                </div>
            )
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
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.map((item, index) => (
                            <div style={{ height: 75, width: '100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '7px', 'padding': '10px 0px 10px 10px', 'max-width': '420px', 'display': 'flex', 'align-items': 'center', 'justify-content': 'center', 'margin':'5px 0px 5px 0px' }}>
                                <div style={{ 'margin': '10px 20px 10px 0px' }}>
                                    <img src={this.props.app_state.static_assets['letter']} style={{ height: 30, width: 'auto' }} />
                                </div>
                            </div>
                        ))}
                    </ul>
                </div>
            )
        }else{
            return(
                <div style={{}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.map((item, index) => (
                            <div style={{'padding': '2px 0px 2px 0px'}} onClick={() => this.props.show_view_transaction_log_bottomsheet(item)}>
                                {this.render_detail_item('3',{'title':this.props.app_state.loc['1593g']/* 'Run ID: ' */+item.returnValues.p3, 'details':this.get_time_difference(item.returnValues.p8)+this.props.app_state.loc['1698a']+' • '+this.format_account_balance_figure(item.returnValues.p5)+' gas.','size':'l'})}
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
                <div style={{'padding': '0px 0px 0px 0px', 'overflow-x':'hidden'}}>
                    {this.render_stack_gas_part()}
                    {this.render_simplified_stack_history()}
                    {this.render_detail_item('0')}
                    {this.render_stack_run_settings_part()}
                    {this.render_gas_history_chart()}
                    {this.render_mempool_metrics()}
                    {this.render_dialog_ui()}
                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            )
        }
    }

    render_stack_transactions_part(){
        var background_color = this.props.theme['card_background_color']
        var middle = this.props.height-130;
        var size = this.props.size;
        if(size == 'm'){
            middle = this.props.height-100;
        }
        var items = [].concat(this.props.app_state.stack_items)

        if(items.length == 0){
            items = [0,3,0]
            return(
                <div style={{}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.map((item, index) => (
                            <div style={{ height: 75, width: '100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '7px', 'padding': '10px 0px 10px 10px', 'max-width': '420px', 'display': 'flex', 'align-items': 'center', 'justify-content': 'center', 'margin':'5px 0px 5px 0px' }}>
                                <div style={{ 'margin': '10px 20px 10px 0px' }}>
                                    <img src={this.props.app_state.static_assets['letter']} style={{ height: 30, width: 'auto' }} />
                                </div>
                            </div>
                        ))}
                    </ul>
                </div>
            )
        }else{
            return(
                <div>
                    <div style={{}}>
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
        this.setState({confirm_clear_stack_dialog: true})
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
        return(
            <div style={{'margin': '2px 0px 2px 0px', opacity: op}} onClick={() => this.props.view_transaction(item, index)}>
                {this.render_detail_item('3',{'title':item.e5+' • '+item.type, 'details':this.props.app_state.loc['1446']/* 'Stack ID: ' */+item.id,'size':'l'})}
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

        return(
            <div>
                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.get_wallet_data_for_specific_e5(this.props.app_state.selected_e5)}>
                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['1448']/* 'Balance in Wei' */, 'subtitle':this.format_power_figure(this.props.app_state.account_balance[this.props.app_state.selected_e5]), 'barwidth':this.calculate_bar_width(this.props.app_state.account_balance[this.props.app_state.selected_e5]), 'number':this.format_account_balance_figure(this.props.app_state.account_balance[this.props.app_state.selected_e5]), 'barcolor':'#606060', 'relativepower':'wei', })}

                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['1449']/* 'Balance in Ether' */, 'subtitle':this.format_power_figure(this.props.app_state.account_balance[this.props.app_state.selected_e5]/10**18), 'barwidth':this.calculate_bar_width(this.props.app_state.account_balance[this.props.app_state.selected_e5]/10**18), 'number':(this.props.app_state.account_balance[this.props.app_state.selected_e5]/10**18), 'barcolor':'#606060', 'relativepower':'ether', })}

                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['1377']/* 'Transactions (2.3M Gas average)' */, 'subtitle':this.format_power_figure(gas_transactions), 'barwidth':this.calculate_bar_width(gas_transactions), 'number':this.format_account_balance_figure(gas_transactions), 'barcolor':'#606060', 'relativepower':this.props.app_state.loc['1378']/* 'transactions' */, })}
                </div>
                <div style={{height:10}}/>

                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['1450']/* 'Number of Stacked Transactions' */, 'subtitle':this.format_power_figure(this.props.app_state.stack_items.length), 'barwidth':this.calculate_bar_width(this.props.app_state.stack_items.length), 'number':this.format_account_balance_figure(this.props.app_state.stack_items.length), 'barcolor':'', 'relativepower':this.props.app_state.loc['1378']/* 'transactions' */, })}
                </div>
                <div style={{height:10}}/>

                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>
                    {/* <p style={{'color': this.props.theme['primary_text_color'], 'font-size': '11px', height: 7, 'margin':'0px 0px 20px 10px'}} className="fw-bold">Local Storage Size limit and Amount Used</p>
                     */}
                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['1451']/* 'Storage Space Utilized' */, 'subtitle':this.format_power_figure(formatted_data_size['size']), 'barwidth':this.calculate_bar_width(formatted_data_size['size']), 'number':this.format_account_balance_figure(formatted_data_size['size']), 'barcolor':'#606060', 'relativepower':formatted_data_size['unit'], })}
                </div>
                <div style={{height:10}}/>

                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}  onClick={()=>this.fetch_gas_figures()}>
                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['1452']/* 'Estimated Gas To Be Consumed' */, 'subtitle':this.format_power_figure(this.estimated_gas_consumed()), 'barwidth':this.calculate_bar_width(this.estimated_gas_consumed()), 'number':this.format_account_balance_figure(this.estimated_gas_consumed()), 'barcolor':'', 'relativepower':'gas', })}

                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['1453']/* 'Wallet Impact' */, 'subtitle':this.format_power_figure(this.calculate_wallet_impact_figure()), 'barwidth':this.calculate_bar_width(this.calculate_wallet_impact_figure()), 'number':this.calculate_wallet_impact_figure()+'%', 'barcolor':'', 'relativepower':'proportion', })}

                </div>
                <div style={{height:10}}/>

                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['1454']/* 'Gas Price' */, 'subtitle':this.format_power_figure(gas_price), 'barwidth':this.calculate_bar_width(gas_price), 'number':this.format_account_balance_figure(gas_price), 'barcolor':'#606060', 'relativepower':'wei', })}

                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['1455']/* 'Gas Price in Gwei' */, 'subtitle':this.format_power_figure(gas_price/10**9), 'barwidth':this.calculate_bar_width(gas_price/10**9), 'number':this.format_account_balance_figure(gas_price/10**9), 'barcolor':'#606060', 'relativepower':'gwei', })}
                </div>
                

                <div style={{height:10}}/>
                <div style={{'padding': '5px'}} onClick={()=>/* this.run_transactions(false) */ this.open_confirmation_bottomsheet()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['1456']/* 'Run ' */+this.props.app_state.selected_e5+this.props.app_state.loc['1457']/* ' Transactions' */, 'action':''})}
                </div>
            </div>
        )
    }

    calculate_wallet_impact_figure(){
        var estimated_gas_to_be_consumed = this.estimated_gas_consumed()
        var gas_price = this.props.app_state.gas_price[this.props.app_state.selected_e5]
        if(gas_price == null){
            gas_price = this.get_gas_price_from_runs()
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
            return {'size':Math.round(size/1_000_000_000), 'unit':'gigabytes'}
        }
        else if(size > 1_000_000){
            return {'size':Math.round(size/1_000_000), 'unit':'megabytes'}
        }
        else if(size > 1_000){
            return {'size':Math.round(size/1_000), 'unit':'kilobytes'}
        }
        else{
            return {'size':size, 'unit':'bytes'}
        }
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
                                        <img src={this.props.app_state.static_assets['letter']} style={{height:20 ,width:'auto'}} />
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




    


    open_confirmation_bottomsheet(){
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

        if(pushed_txs.length == 0){
            this.props.notify(this.props.app_state.loc['1487']/* 'Add some transactions first.' */,3600)
        }
        else if(account_balance == 0){
            this.props.open_wallet_guide_bottomsheet('one')
        }
        else if(account_balance < (estimated_gas_to_be_consumed * run_gas_price)){
            this.setState({invalid_ether_amount_dialog_box: true})
        }
        else if(run_gas_limit < 35000){
            this.props.notify(this.props.app_state.loc['1490']/* 'That transaction gas limit is too low.' */,3900)
        }
        else if(estimated_gas_to_be_consumed > gas_limit){
            this.props.notify(this.props.app_state.loc['1491']/* 'That transaction is too large, please reduce your stack size.' */,4900)
        }
        else if(estimated_gas_to_be_consumed > run_gas_limit){
            this.props.notify(this.props.app_state.loc['1492']/* 'Set a gas limit above ' */+estimated_gas_to_be_consumed+this.props.app_state.loc['1493']/* ' gas' */,5900)
        }
        else{
            this.props.show_confirm_run_bottomsheet(run_data)
        }
    }


    fetch_gas_figures(){
        this.props.notify(this.props.app_state.loc['1494']/* 'calculating your stacks gas figure...' */, 2200)
        this.run_transactions(true)
    }

    run_transactions = async (calculate_gas) => {
        var txs = this.props.app_state.stack_items
        if(!calculate_gas){
            var is_running = this.props.app_state.is_running[this.props.app_state.selected_e5]
            if(is_running == null) is_running = false
            if(is_running){
                this.props.notify(this.props.app_state.loc['1495']/* 'e is already running a transaction for you.' */, 5200)
                return;
            }
            this.props.lock_run(true)
            
            if(txs.length > 0){
                this.props.notify(this.props.app_state.loc['1496']/* 'Running your transactions...' */, 7600)
            }
        }
        var strs = []
        var ints = []
        var adds = []
        var wei = 0;
        var delete_pos_array = []
        var pushed_txs = []
        var should_optimize_run = true;
        for(var i=0; i<txs.length; i++){
            if(!this.props.app_state.hidden.includes(txs[i]) && txs[i].e5 == this.props.app_state.selected_e5){
                if(txs[i].type == this.props.app_state.loc['1311']/* 'contract' */){
                    var contract_obj = this.format_contract_object(txs[i])
                    strs.push([])
                    adds.push([])
                    ints.push(contract_obj)
                    
                    var contract_type = this.get_selected_item(txs[i].new_contract_type_tags_object, txs[i].new_contract_type_tags_object['i'].active)

                    var contract_stack_id = ints.length-1
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

                        var obj = {}
                        obj[this.props.app_state.loc['2773']/* 'low' */] = '10000'
                        obj[this.props.app_state.loc['2774']/* 'medium' */] = '100000'
                        obj[this.props.app_state.loc['2775']/* 'high' */] = '1000000'
                        var liquidity = this.get_selected_item(txs[i].get_end_token_base_liquidity, txs[i].get_end_token_base_liquidity['i'].active);
                        var buy_amount = obj[liquidity]

                        var token_stack_id = ints.length-1
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

                        var token_stack_id = ints.length-1
                        
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

                    var subscription_stack_id = ints.length-1

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
                }
                else if(txs[i].type == this.props.app_state.loc['760']/* 'job' */){
                    var job_obj = this.format_job_object(txs[i])
                    strs.push([])
                    adds.push([])
                    ints.push(job_obj)
                }
                else if(txs[i].type == this.props.app_state.loc['109']/* 'channel' */){
                    var channel_obj = this.format_channel_object(txs[i])
                    strs.push([['']])
                    adds.push([])
                    ints.push(channel_obj)

                    var channel_stack_id = ints.length-1
                    
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

                    var include_yes_vote = this.get_selected_item(txs[i].get_auto_vote_yes_object, txs[i].get_auto_vote_yes_object['i'].active)

                    var proposal_stack_id = ints.length-1

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
                    var mail_obj = await this.format_mail_object(txs[i], calculate_gas)
                    
                    strs.push(mail_obj.str)
                    adds.push([])
                    ints.push(mail_obj.int)    
                }
                else if(txs[i].type == this.props.app_state.loc['1509']/* 'mail-messages' */){
                    var message_obj = await this.format_message_object(txs[i], calculate_gas)
                    
                    strs.push(message_obj.str)
                    adds.push([])
                    ints.push(message_obj.int)    
                }
                else if(txs[i].type == this.props.app_state.loc['1510']/* 'channel-messages' */){
                    var message_obj = await this.format_channel_message_object(txs[i], calculate_gas)
                    
                    strs.push(message_obj.str)
                    adds.push([])
                    ints.push(message_obj.int)    
                }
                else if(txs[i].type == this.props.app_state.loc['1511']/* 'post-messages' */){
                    var message_obj = await this.format_post_comment_object(txs[i], calculate_gas)
                    
                    strs.push(message_obj.str)
                    adds.push([])
                    ints.push(message_obj.int)    
                }
                else if(txs[i].type == this.props.app_state.loc['1512']/* 'job-response' */){
                    var message_obj = await this.format_job_application_object(txs[i], calculate_gas)
                    
                    strs.push(message_obj.str)
                    adds.push([])
                    ints.push(message_obj.int)    
                }
                else if(txs[i].type == this.props.app_state.loc['1513']/* 'accept-job-application' */){
                    var message_obj = await this.format_accept_application_object(txs[i], calculate_gas)
                    
                    strs.push(message_obj.str)
                    adds.push([])
                    ints.push(message_obj.int)
                }
                else if(txs[i].type == this.props.app_state.loc['1514']/* 'job-messages' */){
                    var message_obj = await this.format_job_comment_object(txs[i], calculate_gas)
                    
                    strs.push(message_obj.str)
                    adds.push([])
                    ints.push(message_obj.int)    
                }
                else if(txs[i].type == this.props.app_state.loc['1515']/* 'proposal-messages' */){
                    var message_obj = await this.format_proposal_message_object(txs[i], calculate_gas)
                    
                    strs.push(message_obj.str)
                    adds.push([])
                    ints.push(message_obj.int)    
                }
                else if(txs[i].type == this.props.app_state.loc['1516']/* 'storefront-bag' */){
                    var storefront_bag_obj = this.format_storefront_bag_object(txs[i])
                    strs.push([])
                    adds.push([])
                    ints.push(storefront_bag_obj)

                    var bag_variants = []
                    txs[i].items_to_deliver.forEach(item => {
                        bag_variants.push({'storefront_item_id':item.storefront_item['id'], 'storefront_variant_id':item.selected_variant['variant_id'], 'purchase_unit_count':item.purchase_unit_count})
                    });

                    var final_bag_object = { 'bag_orders':bag_variants, 'timestamp':Date.now(), content_channeling_setting: txs[i].content_channeling_setting, device_language_setting: txs[i].device_language_setting, device_country: txs[i].device_country }

                    var metadata_action = [ /* set metadata */
                        [20000, 1, 0],
                        [], [],/* target objects */
                        []/* contexts */, 
                        []/* int_data */
                    ]
                    var metadata_strings = [ [] ]
                    metadata_action[1].push(i)
                    metadata_action[2].push(35)
                    metadata_action[3].push(0)
                    metadata_action[4].push(0)
                    var ipfs_obj = await this.get_object_ipfs_index(final_bag_object, calculate_gas);
                    metadata_strings[0].push(ipfs_obj.toString())

                    should_optimize_run = false

                    ints.push(metadata_action)
                    strs.push(metadata_strings)
                    adds.push([])
                }
                else if(txs[i].type == this.props.app_state.loc['1497']/* 'bag-response' */){
                    var message_obj = await this.format_bag_application_object(txs[i], calculate_gas)
                    
                    strs.push(message_obj.str)
                    adds.push([])
                    ints.push(message_obj.int)    
                }
                else if(txs[i].type == this.props.app_state.loc['1498']/* 'accept-bag-application' */){
                    var message_obj = await this.format_accept_bag_application_object(txs[i], calculate_gas)
                    
                    strs.push(message_obj.str)
                    adds.push([])
                    ints.push(message_obj.int)
                }
                else if(txs[i].type == this.props.app_state.loc['1499']/* 'direct-purchase' */){
                    var message_obj = await this.format_direct_purchase_object(txs[i], calculate_gas, ints)
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
                    var clear_obj = await this.format_clear_purchase_object(txs[i], calculate_gas)
                    
                    strs.push(clear_obj.str)
                    adds.push([])
                    ints.push(clear_obj.int)    
                }
                else if(txs[i].type == this.props.app_state.loc['1501']/* 'bag-messages' */){
                    var message_obj = await this.format_bag_comment_object(txs[i], calculate_gas)
                    
                    strs.push(message_obj.str)
                    adds.push([])
                    ints.push(message_obj.int)    
                }
                else if(txs[i].type == this.props.app_state.loc['1502']/* 'storefront-messages' */){
                    var message_obj = await this.format_storefront_comment_object(txs[i], calculate_gas)
                    
                    strs.push(message_obj.str)
                    adds.push([])
                    ints.push(message_obj.int)    
                }
                else if(txs[i].type == this.props.app_state.loc['1503']/* 'contractor' */){
                    var contractor_obj = this.format_contractor_object(txs[i])
                    strs.push([])
                    adds.push([])
                    ints.push(contractor_obj)
                }
                else if(txs[i].type == this.props.app_state.loc['1363']/* 'job-request' */){
                    var message_obj = await this.format_job_request_object(txs[i], calculate_gas)
                    console.log('format_job_request_object --------------------------------------------------')
                    
                    strs.push(message_obj.str)
                    adds.push([])
                    ints.push(message_obj.int)    
                }
                else if(txs[i].type == this.props.app_state.loc['1504']/* 'accept-job-request' */){
                    var message_obj = await this.format_accept_job_request_object(txs[i], calculate_gas)
                    
                    strs.push(message_obj.str)
                    adds.push([])
                    ints.push(message_obj.int)
                }  
                else if(txs[i].type == this.props.app_state.loc['1505']/* 'job-request-messages' */){
                    var message_obj = await this.format_job_request_comment_object(txs[i], calculate_gas)
                    
                    strs.push(message_obj.str)
                    adds.push([])
                    ints.push(message_obj.int)
                }
                else if(txs[i].type == this.props.app_state.loc['1506']/* 'alias' */){
                    var alias_obj = await this.format_alias_object(txs[i], calculate_gas)
                    
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
                else if(txs[i].type == this.props.app_state.loc['753']/* 'edit-channel' */ || txs[i].type == this.props.app_state.loc['763']/* 'edit-contractor' */ || txs[i].type == this.props.app_state.loc['764']/* 'edit-job' */ || txs[i].type == this.props.app_state.loc['765']/* 'edit-post' */ || txs[i].type == this.props.app_state.loc['766']/* 'edit-storefront' */ || txs[i].type == this.props.app_state.loc['767']/* 'edit-token' */ || txs[i].type == this.props.app_state.loc['2739']/* 'edit-proposal' */){
                    var format_edit_object = await this.format_edit_object(txs[i], calculate_gas)
                    strs.push(format_edit_object.metadata_strings)
                    adds.push([])
                    ints.push(format_edit_object.metadata_action)
                }
                else if(txs[i].type == this.props.app_state.loc['1155']/* 'award' */){
                    var format_object = await this.format_award_object(txs[i], calculate_gas, ints)
                    if(format_object.depth[1].length > 0){
                        strs.push([])
                        adds.push([])
                        ints.push(transfer_object.depth)
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
                
                delete_pos_array.push(i)
                pushed_txs.push(txs[i])
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
            if(pushed_txs[i].type == this.props.app_state.loc['1130']/* 'contract' */ || pushed_txs[i].type == this.props.app_state.loc['601']/* 'token' */ || pushed_txs[i].type == this.props.app_state.loc['823']/* 'subscription' */ || pushed_txs[i].type == this.props.app_state.loc['297']/* 'post' */ || pushed_txs[i].type == this.props.app_state.loc['760']/* 'job' */ || pushed_txs[i].type == this.props.app_state.loc['109']/* 'channel' */ || pushed_txs[i].type == this.props.app_state.loc['439']/* 'storefront-item' */|| pushed_txs[i].type == this.props.app_state.loc['784']/* 'proposal' */ || pushed_txs[i].type == this.props.app_state.loc['253']/* 'contractor' */){
                metadata_action[1].push(i)
                metadata_action[2].push(35)
                metadata_action[3].push(0)
                metadata_action[4].push(0)
                var ipfs_obj = await this.get_object_ipfs_index(pushed_txs[i], calculate_gas);
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
            if(pushed_txs[i].type == this.props.app_state.loc['1130']/* 'contract' */ || pushed_txs[i].type == this.props.app_state.loc['601']/* 'token' */ || pushed_txs[i].type == this.props.app_state.loc['823']/* 'subscription' */ || pushed_txs[i].type == this.props.app_state.loc['297']/* 'post' */ || pushed_txs[i].type == 'job' || pushed_txs[i].type == this.props.app_state.loc['109']/* 'channel' */ || pushed_txs[i].type == this.props.app_state.loc['439']/* 'storefront-item' */ || pushed_txs[i].type == this.props.app_state.loc['784']/* 'proposal' */ || pushed_txs[i].type == this.props.app_state.loc['253']/* 'contractor' */){
                var tx_tags = pushed_txs[i].entered_indexing_tags
                index_data_in_tags[1].push(i)
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



        var runs = this.props.app_state.E5_runs[this.props.app_state.selected_e5] == null ? [] : this.props.app_state.E5_runs[this.props.app_state.selected_e5]

        if(runs.length == 0){
            //if its the first time running a transaction
            var obj = [ /* set data */
                [20000, 13, 0],
                [0], [53],/* target objects */
                [0], /* contexts */
                [0] /* int_data */
            ]

            var string_obj = [[]]
            string_obj[0].push(await this.get_account_public_key())
            
            strs.push(string_obj)
            adds.push([])
            ints.push(obj)
        }

        if(this.props.app_state.should_update_contacts_onchain){
            var transaction_obj = [ /* set data */
                [20000, 13, 0],
                [0], [53],/* target objects */
                [1], /* contexts */
                [0] /* int_data */
            ]

            var string_obj = [[]]
            var contacts_clone = this.props.app_state.contacts[this.props.app_state.selected_e5] == null ? [] : this.props.app_state.contacts[this.props.app_state.selected_e5].slice()
            var data = {'contacts':contacts_clone, 'time':Date.now()}
            var string_data = await this.get_object_ipfs_index(data, calculate_gas);
            string_obj[0].push(string_data)
            
            strs.push(string_obj)
            adds.push([])
            ints.push(transaction_obj)
        }

        if(this.props.app_state.should_update_blocked_accounts_onchain){
            var transaction_obj = [ /* set data */
                [20000, 13, 0],
                [0], [53],/* target objects */
                [2], /* contexts */
                [0] /* int_data */
            ]

            var string_obj = [[]]
            var blocked_accounts = this.props.app_state.blocked_accounts[this.props.app_state.selected_e5] == null ? []: this.props.app_state.blocked_accounts[this.props.app_state.selected_e5].slice()
            var data = {'blocked_accounts':blocked_accounts, 'time':Date.now()}
            var string_data = await this.get_object_ipfs_index(data, calculate_gas);
            string_obj[0].push(string_data)
            
            strs.push(string_obj)
            adds.push([])
            ints.push(transaction_obj)
        }

        if(this.props.app_state.should_update_section_tags_onchain){
            var transaction_obj = [ /* set data */
                [20000, 13, 0],
                [0], [53],/* target objects */
                [3], /* contexts */
                [0] /* int_data */
            ]

            var string_obj = [[]]
            var job_section_tags = this.props.app_state.job_section_tags
            var explore_section_tags = this.props.app_state.explore_section_tags
            var data = {'job_section_tags': job_section_tags, 'explore_section_tags':explore_section_tags, 'time':Date.now()}
            var string_data = await this.get_object_ipfs_index(data, calculate_gas);
            string_obj[0].push(string_data)
            
            strs.push(string_obj)
            adds.push([])
            ints.push(transaction_obj)
        }


        var optimized_run = this.optimize_run_if_enabled(ints, strs, adds, should_optimize_run)
        console.log(optimized_run)
        ints = optimized_run['ints']
        strs = optimized_run['strs']
        adds = optimized_run['adds']
        console.log('-------------------------------------------run-transactions--------------------------------')

        // this.props.lock_run(false)
        // return;
        


        var account_balance = this.props.app_state.account_balance[this.props.app_state.selected_e5]
        var run_gas_limit = this.state.run_gas_limit == 0 ? 5_300_000 : this.state.run_gas_limit
        // var run_gas_price = this.state.run_gas_price == 0 ? this.props.app_state.gas_price[this.props.app_state.selected_e5] : this.state.run_gas_price
        var run_gas_price = this.get_gas_price()
        var run_expiry_duration = this.state.run_time_expiry == 0 ? (60*60*1/* 1 hour */) : this.state.run_time_expiry

        var gas_limit = this.get_latest_block_data(this.props.app_state.selected_e5).gasLimit
        var estimated_gas_to_be_consumed = this.estimated_gas_consumed()

        if(!calculate_gas){
            if(pushed_txs.length > 0){
                if(account_balance == 0){
                    this.props.open_wallet_guide_bottomsheet('one')
                    this.props.lock_run(false)
                }
                else if(account_balance < (estimated_gas_to_be_consumed * run_gas_price)){
                    this.setState({invalid_ether_amount_dialog_box: true})
                    this.props.lock_run(false)
                }
                else if(run_gas_limit < 35000){
                    this.props.notify(this.props.app_state.loc['1517']/* 'That transaction gas limit is too low.' */,5900)
                    this.props.lock_run(false)
                }
                else if(estimated_gas_to_be_consumed > gas_limit){
                    this.props.notify(this.props.app_state.loc['1518']/* 'That transaction is too large, please reduce your stack size.' */,6900)
                    this.props.lock_run(false)
                }
                else if(estimated_gas_to_be_consumed > run_gas_limit){
                    this.props.notify(this.props.app_state.loc['1519']/* 'Set a gas limit above ' */+estimated_gas_to_be_consumed+this.props.app_state.loc['1520']/* ' gas' */,3900)
                    this.props.lock_run(false)
                }
                else{
                    var gas_lim = run_gas_limit.toString().toLocaleString('fullwide', {useGrouping:false})
                    this.props.run_transaction_with_e(strs, ints, adds, gas_lim, wei, delete_pos_array, run_gas_price, run_expiry_duration, )
                }
            }else{
                this.props.lock_run(false)
                this.props.notify(this.props.app_state.loc['1521']/* 'Add some transactions first.' */,1600)
            }
        }else{
            var gas_lim = run_gas_limit.toString().toLocaleString('fullwide', {useGrouping:false})
            this.props.calculate_gas_with_e(strs, ints, adds, gas_lim, wei, delete_pos_array, run_gas_price, this.set_max_priority_per_gas(), this.set_max_fee_per_gas())
        }  
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

    get_object_ipfs_index(tx, calculate_gas){
        if(calculate_gas != null && calculate_gas == true){
            return 'QmWBaeu6y1zEcKbsEqCuhuDHPL3W8pZouCPdafMCRCSUWk'
        }
        var object_as_string = JSON.stringify(tx, (key, value) =>
            typeof value === 'bigint'
                ? value.toString()
                : value // return everything else unchanged));
        )
        var obj_cid = this.props.store_objects_data_in_ipfs_using_option(object_as_string)
        return obj_cid
    }

    get_account_public_key = async () => {
        return await this.props.get_account_public_key()
    }

    render_dialog_ui(){
        var account_balance = this.props.app_state.account_balance[this.props.app_state.selected_e5]
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
      obj[3].push(t.interactible_timestamp)

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

    format_mail_object = async (t, calculate_gas) =>{
        var obj = [ /* set data */
        [20000, 13, 0],
        [], [],/* target objects */
        [], /* contexts */
        [] /* int_data */
      ]

        var string_obj = [[]]
        var string_data = ''
        if(calculate_gas) string_data = await this.get_object_ipfs_index('', calculate_gas)
        else string_data = await this.get_object_ipfs_index(await this.get_encrypted_mail_message(t, t.target_recipient), calculate_gas);

        var recipient_account = t.target_recipient
        var context = 30
        var int_data = Date.now()

        obj[1].push(recipient_account)
        if(recipient_account == 53) obj[2].push(53)
        else obj[2].push(23)
        obj[3].push(context)
        obj[4].push(int_data)

        string_obj[0].push(string_data)

      return {int: obj, str: string_obj}
    }

    get_encrypted_mail_message = async (t, recip) =>{
        var key = makeid(35)
        var encrypted_obj = this.props.encrypt_data_object(t, key)
        var recipent_data = {}
        var recipient = recip
        var recipients_pub_key_hash = await this.props.get_accounts_public_key(recipient, t.e5)

        if(recipients_pub_key_hash != ''){
            var encrypted_key = await this.props.encrypt_key_with_accounts_public_key_hash(key, recipients_pub_key_hash)
            recipent_data[parseInt(recipient)] = encrypted_key
        }

        var uint8array = await this.props.get_account_raw_public_key() 
        var my_encrypted_key = await this.props.encrypt_key_with_accounts_public_key_hash(key, uint8array)
        recipent_data[this.props.app_state.user_account_id[this.props.app_state.selected_e5]] = my_encrypted_key

        return {'obj':encrypted_obj, 'recipient_data':recipent_data}
    }

    format_message_object = async (t, calculate_gas) =>{
        var obj = [ /* set data */
            [20000, 13, 0],
            [], [],/* target objects */
            [], /* contexts */
            [] /* int_data */
        ]

        var string_obj = [[]]

        for(var i=0; i<t.messages_to_deliver.length; i++){
            var recipient_account = t.messages_to_deliver[i]['recipient']
            var context = 30
            var int_data = t.messages_to_deliver[i].convo_id

            var string_data = await this.get_object_ipfs_index(await this.get_encrypted_mail_message(t.messages_to_deliver[i], t.messages_to_deliver[i]['recipient']), calculate_gas);

            obj[1].push(recipient_account)
            obj[2].push(23)
            obj[3].push(context)
            obj[4].push(int_data)

            string_obj[0].push(string_data)
        }

        return {int: obj, str: string_obj}
    }

    format_channel_message_object = async (t, calculate_gas) =>{
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

            var string_data = await this.get_object_ipfs_index(t.messages_to_deliver[i], calculate_gas);

            obj[1].push(target_id)
            obj[2].push(23)
            obj[3].push(context)
            obj[4].push(int_data)

            string_obj[0].push(string_data)
        }

        return {int: obj, str: string_obj}
    }

    format_post_comment_object = async (t, calculate_gas) =>{
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

            var string_data = await this.get_object_ipfs_index(t.messages_to_deliver[i], calculate_gas);

            obj[1].push(target_id)
            obj[2].push(23)
            obj[3].push(context)
            obj[4].push(int_data)

            string_obj[0].push(string_data)
        }

        return {int: obj, str: string_obj}
    }

    format_job_application_object = async (t, calculate_gas) =>{
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

        var string_data = await this.get_object_ipfs_index(application_obj, calculate_gas);

        obj[1].push(target_id)
        obj[2].push(23)
        obj[3].push(context)
        obj[4].push(int_data)

        string_obj[0].push(string_data)

        return {int: obj, str: string_obj}
    }

    format_accept_application_object = async (t, calculate_gas) =>{
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

        var string_data = await this.get_object_ipfs_index(application_obj, calculate_gas);

        obj[1].push(target_id)
        obj[2].push(23)
        obj[3].push(context)
        obj[4].push(int_data)

        string_obj[0].push(string_data)



        return {int: obj, str: string_obj}
    }

    format_job_comment_object = async (t, calculate_gas) =>{
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

            var string_data = await this.get_object_ipfs_index(t.messages_to_deliver[i], calculate_gas);

            obj[1].push(target_id)
            obj[2].push(23)
            obj[3].push(context)
            obj[4].push(int_data)

            string_obj[0].push(string_data)
        }

        return {int: obj, str: string_obj}
    }

    format_proposal_message_object = async (t, calculate_gas) => {
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

            var string_data = await this.get_object_ipfs_index(t.messages_to_deliver[i], calculate_gas);

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

    format_bag_application_object = async (t, calculate_gas) =>{
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

        var string_data = await this.get_object_ipfs_index(application_obj, calculate_gas);

        obj[1].push(target_id)
        obj[2].push(23)
        obj[3].push(context)
        obj[4].push(int_data)

        string_obj[0].push(string_data)

        return {int: obj, str: string_obj}
    }

    format_accept_bag_application_object = async (t, calculate_gas) =>{
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

        var string_data = await this.get_object_ipfs_index(application_obj, calculate_gas);

        obj[1].push(target_id)
        obj[2].push(23)
        obj[3].push(context)
        obj[4].push(int_data)

        string_obj[0].push(string_data)



        return {int: obj, str: string_obj}
    }

    format_direct_purchase_object = async (t, calculate_gas, ints) => {
        var ints_clone = ints.slice()
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
            [t.storefront_item['ipfs'].target_receiver], [23],/* target receivers */
            [t.storefront_item['id']],/* awward contexts */
            
            [], [],/* exchange ids for first target receiver */
            [],/* amounts for first target receiver */
            [],/* depths for the first targeted receiver*/
        ]
        var string_obj = [[]]

        for(var i=0; i<t.selected_variant['price_data'].length; i++){
            var exchange = t.selected_variant['price_data'][i]['id']
            var amount = this.get_amounts_to_be_paid(t.selected_variant['price_data'][i]['amount'], t.purchase_unit_count).toString().toLocaleString('fullwide', {useGrouping:false})

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

        for(var i=0; i<t.storefront_item['ipfs'].shipping_price_data.length; i++){
            var exchange = t.storefront_item['ipfs'].shipping_price_data[i]['id']
            var amount = this.get_amounts_to_be_paid(t.storefront_item['ipfs'].shipping_price_data[i]['amount'], t.purchase_unit_count).toString().toLocaleString('fullwide', {useGrouping:false})


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

        var purchase_object = {'shipping_detail':t.fulfilment_location, 'custom_specifications':t.custom_specifications, 'variant_id':t.selected_variant['variant_id'], 'purchase_unit_count':t.purchase_unit_count, 'sender_account':this.props.app_state.user_account_id[this.props.app_state.selected_e5], 'signature_data':Date.now(), 'sender_address':this.format_address(this.props.app_state.accounts[this.props.app_state.selected_e5].address, this.props.app_state.selected_e5)}
        
        var string_data = await this.get_object_ipfs_index(purchase_object, calculate_gas);

        string_obj[0].push(string_data)

        return {int: obj, str: string_obj, depth: depth_swap_obj}
    }

    get_amounts_to_be_paid(amount, count){
        return bigInt(amount).multiply(bigInt(count))
    }

    format_clear_purchase_object = async (t, calculate_gas) =>{
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
                'variant_id':t.items_to_clear[i].order_data['variant_id'], 
                'purchase_unit_count':t.items_to_clear[i].order_data['purchase_unit_count'], 
                'sender_address':t.items_to_clear[i].order_data['sender_address'], 
                'sender_account':t.items_to_clear[i].order_data['sender_account'],
                'signature_data':t.items_to_clear[i].order_data['signature_data'],
                'signature': t.items_to_clear[i].received_signature
            }
            var string_data = await this.get_object_ipfs_index(string_object, calculate_gas);

            obj[1].push(target_id)
            obj[2].push(23)
            obj[3].push(context)
            obj[4].push(int_data)

            string_obj[0].push(string_data)
        }

        return {int: obj, str: string_obj}
    }

    format_bag_comment_object = async (t, calculate_gas) => {
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

            var string_data = await this.get_object_ipfs_index(t.messages_to_deliver[i], calculate_gas);

            obj[1].push(target_id)
            obj[2].push(23)
            obj[3].push(context)
            obj[4].push(int_data)

            string_obj[0].push(string_data)
        }

        return {int: obj, str: string_obj}
    }

    format_storefront_comment_object = async (t, calculate_gas) => {
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

            var string_data = await this.get_object_ipfs_index(t.messages_to_deliver[i], calculate_gas);

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

    format_job_request_object = async (t, calculate_gas) => {
        var obj = [ /* set data */
            [20000, 13, 0],
            [], [],/* target objects */
            [], /* contexts */
            [] /* int_data */
        ]

        var string_obj = [[]]

        var target_id = t.contractor_item['id']
        var context = 38
        var int_data = Date.now()

        var application_obj = {'price_data':t.price_data, /* 'picked_contract_id':t.picked_contract['id'], */ 'application_expiry_time':t.application_expiry_time, 'applicant_id':this.props.app_state.user_account_id[this.props.app_state.selected_e5], 'pre_post_paid_option':t.pre_post_paid_option, 'title_description':t.entered_title_text, 'entered_images':t.entered_image_objects, 'job_request_id':int_data}

        var string_data = await this.get_object_ipfs_index(application_obj, calculate_gas);

        obj[1].push(target_id)
        obj[2].push(23)
        obj[3].push(context)
        obj[4].push(int_data)

        string_obj[0].push(string_data)

        return {int: obj, str: string_obj}
    }

    format_accept_job_request_object = async (t, calculate_gas) =>{
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

        var application_obj = {'accepted':true, 'contract_id':t.picked_contract['id']}

        var string_data = await this.get_object_ipfs_index(application_obj, calculate_gas);

        obj[1].push(target_id)
        obj[2].push(23)
        obj[3].push(context)
        obj[4].push(int_data)

        string_obj[0].push(string_data)



        return {int: obj, str: string_obj}
    }

    format_job_request_comment_object = async (t, calculate_gas) =>{
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

            var string_data = await this.get_object_ipfs_index(t.messages_to_deliver[i], calculate_gas);

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

        var string_data = await this.get_object_ipfs_index(t.alias, calculate_gas);

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

        var string_data = await this.get_object_ipfs_index(t.alias, calculate_gas);

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

        var string_data = await this.get_object_ipfs_index(t.alias, calculate_gas);

        obj[3].push(context)
        obj[4].push(int_data)

        string_obj[0].push(string_data)

        return {int: obj, str: string_obj}
    }

    format_edit_object = async (t, calculate_gas) => {
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
        
        var ipfs_obj = await this.get_object_ipfs_index(t, calculate_gas);
        metadata_strings[0].push(ipfs_obj.toString())

        return {metadata_action: metadata_action, metadata_strings:metadata_strings}
    }

    format_award_object = async (t, calculate_gas, ints) => {
        var ints_clone = ints.slice()
        var author = t.post_item['event'].returnValues.p5
        var post_id = t.post_item['id'];

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
            [post_id.toString().toLocaleString('fullwide', {useGrouping:false})],/* awward contexts */
            
            [5], [23],/* exchange ids for first target receiver */
            [t.award_amount.toString().toLocaleString('fullwide', {useGrouping:false})],/* amounts for first target receiver */
            [0],/* depths for the first targeted receiver*/
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
            for(var t=0; t<transfer_actions.length; t++){
                obj[4].push(exchange)
                obj[5].push(23)
                obj[6].push(transfer_actions[t]['amount'])
                obj[7].push(transfer_actions[t]['depth'])
            }

        }

        var award_object = {'selected_tier_object':t.selected_tier_object, 'post_id':post_id, 'multiplier':t.multiplier, 'custom_amounts':t.price_data, 'entered_message':t.entered_message_text}
        
        var string_data = await this.get_object_ipfs_index(award_object, calculate_gas);
        string_obj[0].push(string_data)

        return {int: obj, str: string_obj, depth: depth_swap_obj}
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
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row" style={{'padding': '0px 0px 0px 0px'}}>
                    <div className="col-6" style={{'padding': '0px 0px 0px 0px'}}>
                        {this.render_settings_details()}
                    </div>
                    <div className="col-6">
                        
                    </div>
                </div>
                
            )
        }
        
    }

    //here
    render_settings_details(){
        return(
            <div>
                <div style={{height: 10}}/>
                <div style={{'padding': '0px 0px 0px 0px'}}>

                    {this.render_detail_item('3',{'title':this.props.app_state.loc['1528']/* 'App Theme' */, 'details':this.props.app_state.loc['1529']/* 'Set the look and feel of E5.' */, 'size':'l'})}
                    <div style={{height: 10}}/>

                    <Tags font={this.props.app_state.font} page_tags_object={this.state.get_themes_tags_object} tag_size={'l'} when_tags_updated={this.when_theme_tags_updated.bind(this)} theme={this.props.theme} app_state={this.props.app_state}/>

                    {this.render_detail_item('0')}


                    {/* {this.render_detail_item('3',{'title':'Orientation (for larger screens)', 'details':'Set the orientation for viewing a posts details', 'size':'l'})}
                    <div style={{height: 10}}/>

                    <Tags font={this.props.app_state.font} page_tags_object={this.state.get_orientation_tags_object} tag_size={'l'} when_tags_updated={this.when_details_orientation_changed.bind(this)} theme={this.props.theme}/>

                    {this.render_detail_item('0')} */}

                    

                    {this.render_detail_item('3',{'title':this.props.app_state.loc['1530'], 'details':this.props.app_state.loc['1531'], 'size':'l'})}
                    <div style={{height: 10}}/>
                    {this.load_preferred_e5_ui()}
                    {this.render_detail_item('0')}

                    



                    {/* {this.render_detail_item('3',{'title':'Preferred storage option', 'details':'Set the storage option you prefer to use', 'size':'l'})}
                    <div style={{height: 10}}/>

                    <Tags font={this.props.app_state.font} page_tags_object={this.state.get_selected_storage_tags_object} tag_size={'l'} when_tags_updated={this.when_get_selected_storage_tags_object_updated.bind(this)} theme={this.props.theme}/>

                    {this.render_detail_item('0')} */}



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






                    
                    {this.render_detail_item('3',{'title':this.props.app_state.loc['1541']/* 'Content Filter' */, 'details':this.props.app_state.loc['1542']/* 'If set to filtered, the content including the tags you follow will be prioritized in your feed.' */, 'size':'l'})}
                    <div style={{height: 10}}/>

                    <Tags font={this.props.app_state.font} page_tags_object={this.state.get_content_filtered_setting_object} tag_size={'l'} when_tags_updated={this.when_get_content_filtered_setting_object_updated.bind(this)} theme={this.props.theme} app_state={this.props.app_state}/>

                    {this.render_detail_item('0')}


                    
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
                </div>
            </div>
        )
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
        this.run_transactions(true)
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
        // var items = structuredClone(this.state.get_selected_e5_tags_object['e'][1])
        // items.splice(0, 1)
        var items = this.load_active_e5s()

        return(
            <div style={{'margin':'3px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                    {items.map((item, index) => (
                        <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}} onClick={()=>this.when_e5_clicked(item)}>
                            {this.render_e5_item(item)}
                        </li>
                    ))}
                </ul>
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
                    <div style={{height:'1px', 'background-color':'#C1C1C1', 'margin': '3px 5px 0px 5px'}}/>
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
        this.props.when_selected_e5_changed(item)
    }
















    render_wallet_settings_section(){
        var size = this.props.size

        if(size == 's'){
            return(
                <div style={{'padding': '0px 0px 0px 0px', 'margin':'0px 0px 0px 0px','overflow-x':'hidden'}}>
                    {this.render_set_wallet_data()}
                    {this.render_detail_item('0')}

                    {this.render_wallet_settings_part()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row" style={{'padding': '0px 0px 0px 0px'}}>
                    {this.render_detail_item('4',{'font':this.props.app_state.font, 'textsize':'15px', 'text':'Set the seed and salt for your preferred wallet', 'color':'dark-grey'})}
                    <div style={{height: 20}}/>

                    <div className="col-6" style={{'padding': '0px 0px 0px 20px'}}>
                        {this.render_wallet_settings_part()}
                    </div>
                    <div className="col-6">
                        {this.render_set_wallet_data()}
                    </div>
                </div>
                
            )
        }
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
                
            </div>
        )
    }

    render_reload_wallet_if_wallet_is_set(){
        if(this.props.app_state.has_wallet_been_set){
            return(
                <div style={{'padding':'0px 5px 0px 5px'}} onClick={() => this.props.get_wallet_data_for_specific_e5(this.props.app_state.selected_e5)}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['2449']/* reload wallet' */, 'action': ''})}
                </div>
            )
        }
    }

    render_wallet_address(){
        if(this.props.app_state.has_wallet_been_set){
            return(
                <div>
                    <div onClick={() => this.copy_to_clipboard(this.get_account_address())}>
                        {this.render_detail_item('3', {'title':this.props.app_state.loc['1550']/* 'Wallet Address' */, 'details':this.get_account_address(), 'size':'l'})}
                    </div>
                    <div style={{height: 10}}/>
                </div>
            )
        }else{
            return(
                <div>
                    <div>
                        {this.render_detail_item('3', {'title':this.props.app_state.loc['1550']/* 'Wallet Address' */, 'details':this.format_address('0x0000000000000000000000000000000000000000', this.props.app_state.selected_e5), 'size':'l'})}
                    </div>
                    <div style={{height: 10}}/>
                </div>
            )
        }
    }


    render_wallet_settings_part(){
        return(
            <div>
                {this.render_detail_item('3',{'title':this.props.app_state.loc['1551']/* 'Wallet Seed' */, 'details':this.props.app_state.loc['1552']/* 'Set your preferred seed. Type a word then click add to add a word, or tap the word to remove' */, 'size':'l'})}
                <div style={{height: 10}}/>
                
                <div className="row" style={{width:'103%'}}>
                    <div className="col-9" style={{'margin': '0px 0px 0px 0px'}}>
                        <TextInput font={this.props.app_state.font} height={30} placeholder={this.props.app_state.loc['1553']/* 'Enter word...' */} when_text_input_field_changed={this.when_text_input_field_changed.bind(this)} text={this.state.typed_word} theme={this.props.theme}/>
                    </div>
                    <div className="col-3" style={{'padding': '0px 10px 0px 0px'}}>
                        {this.render_detail_item('5',{'text':this.props.app_state.loc['1121']/* 'Add' */,'action':'when_add_word_button_tapped'/* , 'prevent_default':true */})}
                    </div>
                </div>

                {this.render_detail_item('1',{'active_tags':this.state.added_tags, 'indexed_option':'indexed', 'when_tapped':'delete_entered_seed_word'})}
                

                {this.render_detail_item('0')}

                {this.render_detail_item('3',{'title':this.props.app_state.loc['1554']/* 'Wallet Salt' */, 'details':this.props.app_state.loc['1555']/* 'Set the preferred salt for your wallet' */, 'size':'l'})}
                <NumberPicker font={this.props.app_state.font} number_limit={bigInt('1e999')} when_number_picker_value_changed={this.when_new_salt_figure_set.bind(this)} theme={this.props.theme} power_limit={990}/>

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
            this.props.notify(this.props.app_state.loc['1561']/* 'Setting your wallet. This might take a while...' */, 5500)

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
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['1565']/* 'Add Contact' */, 'details':this.props.app_state.loc['1566']/* 'You can add a contact manually using their Contact ID.' */, 'size':'l'})}
                <div style={{height: 10}}/>

                <div className="row" style={{width:'103%'}}>
                    <div className="col-9" style={{'margin': '0px 0px 0px 0px'}}>
                        <TextInput font={this.props.app_state.font} height={30} placeholder={this.props.app_state.loc['1567']/* 'Enter Account ID...' */} when_text_input_field_changed={this.when_add_contacts_changed.bind(this)} text={this.state.typed_contact_word} theme={this.props.theme}/>
                    </div>
                    <div className="col-3" style={{'padding': '0px 10px 0px 0px'}} onClick={()=> this.add_cotact_to_list()} >
                        {this.render_detail_item('5',{'text':this.props.app_state.loc['1568']/* 'Add' */,'action':''})}
                    </div>
                </div>
                <div style={{height: 10}}/>
                {this.render_users_contacts()}
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
            this.props.add_account_to_contacts(parseInt(typed_contact))
            this.setState({typed_contact_word:''})
        }
    }

    render_users_contacts(){
        var items = this.props.app_state.contacts[this.props.app_state.selected_e5];
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
                                        <img src={this.props.app_state.static_assets['letter']} style={{height:30 ,width:'auto'}} />
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
                                    swipeRight={{
                                    content: <div></div>,
                                    action: () => console.log()
                                    }}
                                    swipeLeft={{
                                    content: <p style={{'color': this.props.theme['primary_text_color']}}>{this.props.app_state.loc['2751']/* Delete */}</p>,
                                    action: () =>this.props.remove_account_from_contacts(item)
                                    }}>
                                    <div style={{width:'100%', 'background-color':this.props.theme['send_receive_ether_background_color']}}>
                                        <li style={{'padding': '2px'}} onClick={()=>this.when_message_clicked(item)}>
                                            {this.render_detail_item('3', {'title':item['id']+' • '+this.get_senders_name(item['id']), 'details':''+item['address'], 'size':'s'})}
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

    get_senders_name(sender){
         var alias = (this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[sender] == null ? sender : this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[sender])
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
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['1573']/* 'Add Blocked Account' */, 'details':this.props.app_state.loc['1574']/* 'Block an accounts content from being visible in your feed.' */, 'size':'l'})}
                <div style={{height: 10}}/>

                <div className="row" style={{width:'103%'}}>
                    <div className="col-9" style={{'margin': '0px 0px 0px 0px'}}>
                        <TextInput font={this.props.app_state.font} height={30} placeholder={this.props.app_state.loc['1575']/* 'Enter Account ID...' */} when_text_input_field_changed={this.when_add_blocked_account_changed.bind(this)} text={this.state.typed_blocked_account_word} theme={this.props.theme}/>
                    </div>
                    <div className="col-3" style={{'padding': '0px 10px 0px 0px'}} onClick={()=> this.add_blocked_account_to_list()} >
                        {this.render_detail_item('5',{'text':this.props.app_state.loc['1568']/* 'Add' */,'action':''})}
                    </div>
                </div>
                <div style={{height: 10}}/>
                {this.render_users_blocked_accounts()}
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
            this.props.add_account_to_blocked_list(parseInt(typed_contact))
            this.setState({typed_blocked_account_word:''})
        }
    }


    render_users_blocked_accounts(){
        var items = this.props.app_state.blocked_accounts[this.props.app_state.selected_e5];
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
                                        <img src={this.props.app_state.static_assets['letter']} style={{height:30 ,width:'auto'}} />
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
                                    swipeRight={{
                                    content: <div></div>,
                                    action: () => console.log()
                                    }}
                                    swipeLeft={{
                                    content: <p style={{'color': this.props.theme['primary_text_color']}}>{this.props.app_state.loc['2751']/* Delete */}</p>,
                                    action: () =>this.props.remove_account_from_blocked_accounts(item)
                                    }}>
                                    <div style={{width:'100%', 'background-color':this.props.theme['send_receive_ether_background_color']}}>
                                        <li style={{'padding': '2px'}} onClick={()=>this.when_message_clicked(item)}>
                                            {this.render_detail_item('3', {'title':item['id']+' • '+this.get_senders_name(item['id']), 'details':''+item['address'], 'size':'s'})}
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
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['1578']/* 'Reserve Alias' */, 'details':this.props.app_state.loc['1579']/* 'Reserve an alias for your account ID' */, 'size':'l'})}
                <div style={{height:10}}/>
                <div className="row" style={{width:'103%'}}>
                    <div className="col-9" style={{'margin': '0px 0px 0px 0px'}}>
                        <TextInput font={this.props.app_state.font} height={30} placeholder={this.props.app_state.loc['1580']/* 'Enter New Alias Name...' */} when_text_input_field_changed={this.when_typed_alias_changed.bind(this)} text={this.state.typed_alias_word} theme={this.props.theme}/>
                    </div>
                    <div className="col-3" style={{'padding': '0px 10px 0px 0px'}} onClick={()=>this.reserve_alias_list()} >
                        {this.render_detail_item('5',{'text':this.props.app_state.loc['1581']/* 'Reserve' */,'action':''})}
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
                {this.render_users_aliases()}
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
        this.setState({typed_alias_word: text})
    }

    render_my_account_id(){
        var display = this.props.app_state.user_account_id[this.props.app_state.selected_e5] == 1 ? '0000' : this.props.app_state.user_account_id[this.props.app_state.selected_e5]
        
        var alias = (this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[this.props.app_state.user_account_id[this.props.app_state.selected_e5]] == null ? this.props.app_state.loc['1584']/* 'Alias Unknown' */ : this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[this.props.app_state.user_account_id[this.props.app_state.selected_e5]])
        return(
            <div>
                {/* {this.render_detail_item('3', {'title':display, 'details':alias, 'size':'l'})} */}
                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                    {this.render_detail_item('10', {'text':display, 'textsize':'30px', 'font':this.props.app_state.font})}
                    <div style={{'padding':'0px 0px 0px 5px'}}>
                        {this.render_detail_item('10', {'text':this.props.app_state.loc['1585']/* 'Alias: ' */+alias, 'textsize':'12px', 'font':this.props.app_state.font})} 
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


    reserve_alias_list(){
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
        else{
            this.props.add_alias_transaction_to_stack(this.state.typed_alias_word)
            this.setState({typed_alias_word: ''})
        }
    }

    is_word_reserved(typed_word){
        var obj = [this.props.app_state.loc['1591']/* 'Unknown' */, this.props.app_state.loc['1592']/* 'Alias Unknown' */]
        if(obj.includes(typed_word)){
            return true
        }
        return false
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
        // console.log('-----------------------render_users_aliases-------------------------------')
        // console.log(items)
        if(items.length == 0){
            items = [0, 0]
            return(
                <div style={{}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.map((item, index) => (
                            <li style={{'padding': '2px'}} onClick={()=>console.log()}>
                                <div style={{height:60, width:'100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px','padding':'10px 0px 10px 10px', 'max-width':'420px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                                    <div style={{'margin':'10px 20px 10px 0px'}}>
                                        <img src={this.props.app_state.static_assets['letter']} style={{height:30 ,width:'auto'}} />
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
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['1593e']/* 'My Notifications.' */, 'details':this.props.app_state.loc['1593f']/* 'All your important notifications are shown below.' */, 'size':'l'})}
                <div style={{height: 10}}/>
                {this.render_my_notifications()}
            </div>
        )

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
        console.log('sorted notifications: ', sorted_notifs)

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
                                        <img src={this.props.app_state.static_assets['letter']} style={{height:30 ,width:'auto'}} />
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
                <div onClick={() => this.open_object(exchange, item['e5'], 'token')}>
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
            return 'You'
        }
         var alias = (this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[sender] == null ? sender : this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[sender])
            return alias
    }

    








    /* renders the specific element in the post or detail object */
    render_detail_item(item_id, object_data){
        return(
            <div>
                <ViewGroups graph_type={this.props.app_state.graph_type} font={this.props.app_state.font} item_id={item_id} object_data={object_data} theme={this.props.theme} when_add_word_button_tapped={this.when_add_word_button_tapped.bind(this)} delete_entered_seed_word={this.delete_entered_seed_word.bind(this)} when_set_wallet_button_tapped={this.when_set_wallet_button_tapped.bind(this)}/>
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




export default StackPage;