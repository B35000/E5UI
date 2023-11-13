import React, { Component } from 'react';
import Tags from './../components/tags';
import ViewGroups from './../components/view_groups'
import TextInput from './../components/text_input';
import NumberPicker from './../components/number_picker';

import Letter from './../assets/letter.png';
import Dialog from "@mui/material/Dialog";
import { SwipeableList, SwipeableListItem } from '@sandstreamdev/react-swipeable-list';
import '@sandstreamdev/react-swipeable-list/dist/styles.css';
import { Draggable } from "react-drag-reorder";

var bigInt = require("big-integer");

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

        get_wallet_thyme_tags_object:this.get_wallet_thyme_tags_object(),
        gas_history_chart_tags_object:this.get_gas_history_chart_tags_object(),

        typed_word:'',added_tags:[],set_salt: 0,
        run_gas_limit:0, run_gas_price:0, hidden:[], invalid_ether_amount_dialog_box: false,

        typed_contact_word:'', typed_alias_word:'', typed_blocked_account_word:'',
    };

    get_stack_page_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['or','',0], ['e','e.stack-data','e.settings-data', 'e.account-data'], [0]
            ],
            'stack-data':[
              ['xor','e',1], ['stack-data','stack 📥','history 📜'], [1],[1]
            ],
            'settings-data':[
              ['xor','e',1], ['settings-data','settings ⚙️','wallet 👛'], [1],[1]
            ],
            'account-data':[
              ['xor','e',1], ['account-data','alias 🏷️','contacts 👤', 'blacklisted 🚫'], [1],[1]
            ],
        };
        
    }

    get_gas_history_chart_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e','1h','24h', '7d', '30d', '6mo', 'all-time'], [4]
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
                ['xor','',0], ['e','light','dark'], [this.get_light_dark_option()]
            ],
        };
        
    }

    get_light_dark_option(){
        if(this.props.app_state.theme['name'] == 'light'){
            return 1
        }
        else if(this.props.app_state.theme['name'] == 'dark'){
            return 2
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
                ['xor','',0], ['e','right','left'], [1]
            ],
        };
        
    }




    get_selected_e5_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e','E15', 'E25'], [this.get_selected_e5_option()]
            ],
        };
        
    }

    get_selected_e5_option(){
        if(this.props.app_state.selected_e5 == 'E15'){
            return 1
        }
        else if(this.props.app_state.selected_e5 == 'E25'){
            return 2
        }
        return 1
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
                ['xor','',0], ['e','sluggish', 'slow','average', 'fast'], [this.get_selected_refresh_speed_option()]
            ],
        };
    }

    get_selected_refresh_speed_option(){
        if(this.props.app_state.refresh_speed == 'sluggish'){
            return 1
        }
        else if(this.props.app_state.refresh_speed == 'slow'){
            return 2
        }
        else if(this.props.app_state.refresh_speed == 'average'){
            return 3
        }
        else if(this.props.app_state.refresh_speed == 'fast'){
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
                ['or','',0], ['e','hide'], [this.get_selected_masked_data_option()]
            ],
        };
    }

    get_selected_masked_data_option(){
        if(this.props.app_state.masked_content == 'e'){
            return 0
        }
        else if(this.props.app_state.masked_content == 'hide'){
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
                ['xor','',0], ['e','local','language','international'], [this.get_content_channeling_option()]
            ],
        };
    }

    get_content_channeling_option(){
        if(this.props.app_state.content_channeling == 'local'){
            return 1
        }
        else if(this.props.app_state.content_channeling == 'language'){
            return 2
        }
        else if(this.props.app_state.content_channeling == 'international'){
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
                ['xor','',0], ['e','all', 'filtered'], [this.get_content_filter_settings_option()]
            ],
        };
    }

    get_content_filter_settings_option(){
        if(this.props.app_state.section_tags_setting == 'all'){
            return 1
        }
        else if(this.props.app_state.section_tags_setting == 'filtered'){
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
                ['or','',0], ['e','enabled'], [this.get_selected_tabs_data_option()]
            ],
        };
    }

    get_selected_tabs_data_option(){
        if(this.props.app_state.visible_tabs == 'e'){
            return 0
        }
        else if(this.props.app_state.visible_tabs == 'enabled'){
            return 1
        }
        return 0;
    }

    set_tabs_tag(){
        this.setState({get_tabs_tags_object: this.get_tabs_tags_object(),})
    }




















    render(){
        return(
            <div style={{'margin':'10px 10px 0px 10px', 'padding':'0px'}}>
                <Tags page_tags_object={this.state.get_stack_page_tags_object} tag_size={'l'} when_tags_updated={this.when_stack_tags_updated.bind(this)} theme={this.props.theme}/>
                
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
        if(selected_item == 'stack 📥'){
            return(
                <div>
                    {this.render_stack_transactions_part()}
                </div>
            )    
        }
        if(selected_item == 'history 📜'){
            return(
                <div>
                    {this.render_run_history_items()}
                </div>
            )    
        }
        else if(selected_item == 'settings ⚙️'){
            return(
                <div>
                    {this.render_settings_section()}
                </div>
            ) 
        }
        else if(selected_item == 'wallet 👛'){
            return(
                <div>
                    {this.render_wallet_settings_section()}
                </div>
            ) 
        }
        else if(selected_item == 'contacts 👤'){
            return(
                <div>
                    {this.render_contacts_section()}
                </div>
            )
        }
        else if(selected_item == 'alias 🏷️'){
            return(
                <div>
                    {this.render_alias_stuff()}
                </div>
            )
        }
        else if(selected_item == 'blacklisted 🚫'){
            return(
                <div>
                    {this.render_blacklisted_section()}
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
                {this.render_detail_item('3', {'title':'Transaction Gas Limit', 'details':'The gas budget for your next run with E5. The default is set to 5.3 million gas.', 'size':'l'})}
                <div style={{height:10}}/>

                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                    {this.render_detail_item('2', { 'style':'l', 'title':'Transaction Gas Limit', 'subtitle':this.format_power_figure(this.state.run_gas_limit), 'barwidth':this.calculate_bar_width(this.state.run_gas_limit), 'number':this.format_account_balance_figure(this.state.run_gas_limit), 'barcolor':'', 'relativepower':'units', })}
                </div>

                <NumberPicker number_limit={bigInt('1e72')} when_number_picker_value_changed={this.when_run_gas_limit.bind(this)} theme={this.props.theme} power_limit={63}/>



                {this.render_detail_item('3', {'title':'Transaction Gas Price', 'details':'The gas price for your next run with E5. The default is set to the amount set by the network.', 'size':'l'})}
                <div style={{height:10}}/>

                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                    {this.render_detail_item('2', { 'style':'l', 'title':'Transaction Gas Price', 'subtitle':this.format_power_figure(this.state.run_gas_price), 'barwidth':this.calculate_bar_width(this.state.run_gas_price), 'number':this.format_account_balance_figure(this.state.run_gas_price), 'barcolor':'', 'relativepower':'wei', })}
                </div>

                <NumberPicker number_limit={bigInt('1e72')} when_number_picker_value_changed={this.when_run_gas_price.bind(this)} theme={this.props.theme} power_limit={63}/>

            </div>
        )
    }

    when_run_gas_limit(number){
        this.setState({run_gas_limit: number})
    }

    when_run_gas_price(number){
        this.setState({run_gas_price: number})
    }

    render_run_history_items(){
        var background_color = this.props.theme['card_background_color']
        var card_shadow_color = this.props.theme['card_shadow_color']
        var middle = this.props.height-100;
        var size = this.props.size;
        if(size == 'm'){
            middle = this.props.height-100;
        }
        var items = [].concat(this.props.app_state.E5_runs[this.props.app_state.selected_e5])

        if(items.length == 0){
            items = [0,3,0]
            return(
                <div style={{overflow: 'auto', maxHeight: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.map((item, index) => (
                            <li style={{'padding': '5px'}} onClick={()=>console.log()}>
                                <div style={{height:160, width:'100%', 'background-color': background_color, 'border-radius': '15px','padding':'10px 0px 0px 10px', 'max-width':'420px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                                    <div style={{'margin':'10px 20px 0px 0px'}}>
                                        <img src={Letter} style={{height:60 ,width:'auto'}} />
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
                <div style={{overflow: 'auto', maxHeight: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.map((item, index) => (
                            <li style={{'padding': '2px'}} onClick={()=>console.log()}>
                                <div onClick={() => this.props.show_view_transaction_log_bottomsheet(item)} style={{height:'auto', 'background-color': background_color, 'border-radius': '13px','padding':'5px 5px 0px 0px', 'box-shadow': '0px 0px 1px 2px '+card_shadow_color, 'margin':'0px 0px 5px 0px'}}>
                                    <div style={{'padding': '5px 0px 0px 5px'}}>
                                        {this.render_detail_item('3',{'title':'Transaction ID: '+item.returnValues.p3, 'details':'Age: '+this.get_time_difference(item.returnValues.p8),'size':'s'})}
            
                                        <div style={{height: 10}}/>
                                        {this.render_detail_item('2', { 'style':'s', 'title':'Gas Consumed', 'subtitle':this.format_power_figure(item.returnValues.p5), 'barwidth':this.calculate_bar_width(item.returnValues.p5), 'number':this.format_account_balance_figure(item.returnValues.p5), 'barcolor':'', 'relativepower':'gas', })}
                                        
                                    </div>         
                                </div>
                            </li>
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
                    {this.render_detail_item('0')}
                    {this.render_stack_run_settings_part()}
                    {this.render_gas_history_chart()}
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
                <div style={{overflow: 'auto', maxHeight: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.map((item, index) => (
                            <li style={{'padding': '5px'}} onClick={()=>console.log()}>
                                <div style={{height:160, width:'100%', 'background-color': background_color, 'border-radius': '15px','padding':'10px 0px 0px 10px', 'max-width':'420px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                                    <div style={{'margin':'10px 20px 0px 0px'}}>
                                        <img src={Letter} style={{height:60 ,width:'auto'}} />
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
                    <div style={{overflow: 'auto', maxHeight: middle}}>
                        <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                            {items.map((item, index) => (
                                <li style={{'padding': '2px 2px 2px 2px'}} onClick={()=>console.log()}>
                                    {this.render_stack_item(item, index)}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                
            )
        }
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
            <div onClick={() => this.props.view_transaction(item, index)} style={{height:'auto', 'background-color': background_color, 'border-radius': '15px','padding':'5px 5px 0px 0px', 'box-shadow': '0px 0px 1px 2px '+card_shadow_color, 'margin':'0px 0px 10px 0px', opacity: op}}>
                <div style={{'padding': '5px 0px 5px 5px'}}>
                    {this.render_detail_item('1',{'active_tags':[item.e5].concat(item.entered_indexing_tags), 'indexed_option':'indexed', 'when_tapped':''})}
                    <div style={{height: 10}}/>

                    {this.render_detail_item('3',{'details':'Stack ID ', 'title':item.id,'size':'s'})}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3',{'title':'Type: '+item.type, 'details':'Gas: '+number_with_commas(this.get_estimated_gas(item))+' - '+number_with_commas(Math.floor(this.get_estimated_gas(item)*1.6)),'size':'s'})}
                    <div style={{height: 10}}/>

                </div>         
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
        var state_data = localStorage.getItem("state") == null ? "":localStorage.getItem("state")
        var viewed_data = localStorage.getItem("viewed") == null ? "":localStorage.getItem("viewed")
        var data = state_data+viewed_data
        var data_size = this.lengthInUtf8Bytes(data)

        var gas_price = this.props.app_state.gas_price[this.props.app_state.selected_e5]
        if(gas_price == null){
            gas_price = this.get_gas_price_from_runs()
        }
        
        var gas_transactions =this.props.app_state.account_balance[this.props.app_state.selected_e5] == 0 ? 0 : Math.floor((this.props.app_state.account_balance[this.props.app_state.selected_e5]/gas_price)/2_300_000)

        return(
            <div>  
                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                    {this.render_detail_item('2', { 'style':'l', 'title':'Balance in Wei', 'subtitle':this.format_power_figure(this.props.app_state.account_balance[this.props.app_state.selected_e5]), 'barwidth':this.calculate_bar_width(this.props.app_state.account_balance[this.props.app_state.selected_e5]), 'number':this.format_account_balance_figure(this.props.app_state.account_balance[this.props.app_state.selected_e5]), 'barcolor':'#606060', 'relativepower':'wei', })}

                    {this.render_detail_item('2', { 'style':'l', 'title':'Balance in Ether', 'subtitle':this.format_power_figure(this.props.app_state.account_balance[this.props.app_state.selected_e5]/10**18), 'barwidth':this.calculate_bar_width(this.props.app_state.account_balance[this.props.app_state.selected_e5]/10**18), 'number':(this.props.app_state.account_balance[this.props.app_state.selected_e5]/10**18), 'barcolor':'#606060', 'relativepower':'ether', })}

                    {this.render_detail_item('2', { 'style':'l', 'title':'Transactions (2.3M Gas average)', 'subtitle':this.format_power_figure(gas_transactions), 'barwidth':this.calculate_bar_width(gas_transactions), 'number':this.format_account_balance_figure(gas_transactions), 'barcolor':'#606060', 'relativepower':'transactions', })}
                </div>
                <div style={{height:10}}/>

                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                    {this.render_detail_item('2', { 'style':'l', 'title':'Number of Stacked Transactions', 'subtitle':this.format_power_figure(this.props.app_state.stack_items.length), 'barwidth':this.calculate_bar_width(this.props.app_state.stack_items.length), 'number':this.format_account_balance_figure(this.props.app_state.stack_items.length), 'barcolor':'', 'relativepower':'units', })}
                </div>
                <div style={{height:10}}/>

                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>
                    {/* <p style={{'color': this.props.theme['primary_text_color'], 'font-size': '11px', height: 7, 'margin':'0px 0px 20px 10px'}} className="fw-bold">Local Storage Size limit and Amount Used</p>
                     */}
                    {this.render_detail_item('2', { 'style':'l', 'title':'Local Storage Size limit', 'subtitle':this.format_power_figure(cache_size*1024), 'barwidth':this.calculate_bar_width(cache_size*1024), 'number':this.format_account_balance_figure(cache_size*1024), 'barcolor':'#606060', 'relativepower':'bytes', })}

                    {this.render_detail_item('2', { 'style':'l', 'title':'Amount Used', 'subtitle':this.format_power_figure(data_size), 'barwidth':this.calculate_bar_width(data_size), 'number':this.format_account_balance_figure(data_size), 'barcolor':'#606060', 'relativepower':'bytes', })}
                </div>
                <div style={{height:10}}/>

                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                    {this.render_detail_item('2', { 'style':'l', 'title':'Estimated Gas To Be Consumed', 'subtitle':this.format_power_figure(this.estimated_gas_consumed()), 'barwidth':this.calculate_bar_width(this.estimated_gas_consumed()), 'number':this.format_account_balance_figure(this.estimated_gas_consumed())+' - '+this.format_account_balance_figure((Math.floor(this.estimated_gas_consumed()*1.6))), 'barcolor':'', 'relativepower':'gas', })}
                </div>
                <div style={{height:10}}/>

                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                    {this.render_detail_item('2', { 'style':'l', 'title':'Gas Price', 'subtitle':this.format_power_figure(gas_price), 'barwidth':this.calculate_bar_width(gas_price), 'number':this.format_account_balance_figure(gas_price), 'barcolor':'#606060', 'relativepower':'wei', })}

                    {this.render_detail_item('2', { 'style':'l', 'title':'Gas Price in Gwei', 'subtitle':this.format_power_figure(gas_price/10**9), 'barwidth':this.calculate_bar_width(gas_price/10**9), 'number':this.format_account_balance_figure(gas_price/10**9), 'barcolor':'#606060', 'relativepower':'gwei', })}
                </div>
                

                <div style={{height:10}}/>
                <div style={{'padding': '5px'}} onClick={()=>this.run_transactions()}>
                    {this.render_detail_item('5', {'text':'Run Transactions', 'action':''})}
                </div>
            </div>
        )
    }

    estimated_gas_consumed(){
        var txs = this.props.app_state.stack_items
        var gas = 0;

        for(var i=0; i<txs.length; i++){
            var g = this.get_estimated_gas(txs[i])
            gas += g
        }

        return gas
    }

    get_estimated_gas(t){
        if(t.type == 'channel' || t.type == 'job' || t.type == 'post' || t.type == 'contractor'){
            return 344622
        }
        else if(t.type == 'mail'){
            return 279695
        }
        else if(t.type == 'contract'){
            return 964043 + (60_000 * t.price_data.length)
        }
        else if(t.type == 'storefront-item'){
            return 261200
        }
        else if(t.type == 'subscription'){
            return 630605 + (60_000 * t.price_data.length)
        }
        else if(t.type == 'token'){
            return 976263 + (50_000 * t.price_data.length)
        }
        else if(t.type == 'buy-sell'){
            return 793469
        }
        else if(t.type == 'transfer'){
            return 100_132 +(32_000 * t.stack_items.length)
        }
        else if(t.type == 'enter-contract'){
            return 563061
        }
        else if(t.type == 'extend-contract'){
            return 426227
        }
        else if(t.type == 'exit-contract'){
            return 481612
        }
        else if(t.type == 'proposal'){
            return 809949 + (98_818 * t.bounty_values.length)
        }
        else if(t.type == 'vote'){
            return 485179
        }
        else if(t.type == 'submit'){
            return 562392
        }
        else if(t.type == 'pay-subscription'){
            return 351891
        }
        else if(t.type == 'cancel-subscription'){
            return 276496
        }
        else if(t.type == 'collect-subscription'){
            return 273441
        }
        else if(t.type == 'modify-subscription'){
            return 234392
        }
        else if(t.type == 'modify-contract'){
            return 630599
        }
        else if(t.type == 'modify-token'){
            return 376037
        }
        else if(t.type == 'exchange-transfer'){
            return 240068
        }
        else if(t.type == 'force-exit'){
            return 438394
        }
        else if(t.type == 'archive'){
            return 1037673
        }
        else if(t.type == 'freeze/unfreeze'){
            return 405717
        }
        else if(t.type == 'authmint'){
            return 493989
        }
        else if(t.type == 'access-rights-settings'){
            return 170897
        }
        else if(t.type == 'mail-messages' || t.type == 'channel-messages' || t.type == 'post-messages' || t.type == 'job-messages' || t.type == 'proposal-messages' || t.type == 'bag-messages' || t.type == 'storefront-messages' || t.type == 'job-request-messages'){
            return 279695 +(18000 * t.messages_to_deliver.length)
        }
        else if(t.type == 'job-response'){
            return 279695
        }
        else if(t.type == 'accept-job-application'){
            return 279695
        }
        else if(t.type == 'storefront-bag'){
            return 300622
        }
        else if(t.type == 'bag-response'){
            return 279695
        }
        else if(t.type == 'accept-bag-application'){
            return 279695
        }
        else if(t.type == 'direct-purchase'){
            return 279695
        }
        else if(t.type == 'clear-purchase'){
            return 279695
        }
        else if(t.type == 'job-request'){
            return 279695
        }
        else if(t.type == 'accept-job-request'){
            return 279695
        }
        else if(t.type == 'alias' || t.type == 'unalias' || t.type == 're-alias'){
            return 279695
        }
        else if(t.type == 'edit-channel' || t.type == 'edit-contractor' || t.type == 'edit-job' || t.type == 'edit-post' || t.type == 'edit-storefront' || t.type == 'edit-token'){
            return 276073
        }
        else if(t.type == 'depthmint'){
            return 623115
        }

    }



    render_gas_history_chart(){
        var events = this.props.app_state.all_E5_runs[this.props.app_state.selected_e5]
        if(events != null && events.length > 10){
            return(
                <div>
                    {this.render_detail_item('0')}
                    {this.render_detail_item('3', {'title':'Gas Prices', 'details':`The gas price data recorded on your selected E5 over time.`, 'size':'l'})}
                    
                    {this.render_detail_item('6', {'dataPoints':this.get_gas_history_data_points(events), 'interval':this.get_gas_history_interval_figure(events)})}
                    <div style={{height: 10}}/>
                    <Tags page_tags_object={this.state.gas_history_chart_tags_object} tag_size={'l'} when_tags_updated={this.when_gas_history_chart_tags_object_updated.bind(this)} theme={this.props.theme}/>

                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', {'title':'Y-Axis: Gas Prices in Gwei', 'details':'X-Axis: Time', 'size':'s'})}
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
        else if(selected_item == 'all-time'){
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









    run_transactions = async () => {
        if(this.props.app_state.is_running){
            this.props.notify('e is already running a transaction for you', 1200)
            return;
        }
        this.props.lock_run(true)
        var txs = this.props.app_state.stack_items
        if(txs.length > 0){
            this.props.notify('running your transactions...', 600)
        }
        var strs = []
        var ints = []
        var adds = []
        var wei = 0;
        var delete_pos_array = []
        var pushed_txs = []
        for(var i=0; i<txs.length; i++){
            if(!this.props.app_state.hidden.includes(txs[i]) && txs[i].e5 == this.props.app_state.selected_e5){
                if(txs[i].type == 'contract'){
                    var contract_obj = this.format_contract_object(txs[i])
                    strs.push([])
                    adds.push([])
                    ints.push(contract_obj)
                    
                    var contract_type = this.get_selected_item(txs[i].new_contract_type_tags_object, txs[i].new_contract_type_tags_object['i'].active)

                    var contract_stack_id = ints.length-1
                    if(contract_type == 'private'){
                        var enable_interactibles_checker = [ /* enable interactible checkers */
                            [20000, 5, 0],
                            [contract_stack_id], [35]/* target objects */
                        ]
                        strs.push([])
                        adds.push([])
                        ints.push(enable_interactibles_checker)
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
                    }
                }
                else if(txs[i].type == 'token'){
                    var token_obj = this.format_token_object(txs[i])
                    strs.push([])
                    adds.push([])
                    ints.push(token_obj)

                    var token_stack_id = ints.length-1
                    
                    var access_rights_setting = this.get_selected_item(txs[i].new_token_access_rights_tags_object, txs[i].new_token_access_rights_tags_object['i'].active);

                    if(access_rights_setting == 'enabled'){
                        var enable_interactibles_checker = [ /* enable interactible checkers */
                            [20000, 5, 0],
                            [token_stack_id], [35]/* target objects */
                        ]
                        strs.push([])
                        adds.push([])
                        ints.push(enable_interactibles_checker)
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
                    }
                }
                else if(txs[i].type == 'subscription'){
                    var subscription_obj = this.format_subscription_object(txs[i])
                    strs.push([])
                    adds.push([])
                    ints.push(subscription_obj)

                    var subscription_stack_id = ints.length-1

                    var access_rights_setting = this.get_selected_item(txs[i].new_token_access_rights_tags_object, txs[i].new_token_access_rights_tags_object['i'].active);

                    if(access_rights_setting == 'enabled'){
                        var enable_interactibles_checker = [ /* enable interactible checkers */
                            [20000, 5, 0],
                            [subscription_stack_id], [35]/* target objects */
                        ]
                        strs.push([])
                        adds.push([])
                        ints.push(enable_interactibles_checker)
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
                    }
                }
                else if(txs[i].type == 'post'){
                    var post_obj = this.format_post_object(txs[i])
                    strs.push([])
                    adds.push([])
                    ints.push(post_obj)
                }
                else if(txs[i].type == 'job'){
                    var job_obj = this.format_job_object(txs[i])
                    strs.push([])
                    adds.push([])
                    ints.push(job_obj)
                }
                else if(txs[i].type == 'channel'){
                    var channel_obj = this.format_channel_object(txs[i])
                    strs.push([['']])
                    adds.push([])
                    ints.push(channel_obj)

                    var channel_stack_id = ints.length-1
                    
                    var access_rights_setting = this.get_selected_item(txs[i].new_token_access_rights_tags_object, txs[i].new_token_access_rights_tags_object['i'].active);

                    if(access_rights_setting == 'enabled'){
                        var enable_interactibles_checker = [ /* enable interactible checkers */
                            [20000, 5, 0],
                            [channel_stack_id], [35]/* target objects */
                        ]
                        strs.push([])
                        adds.push([])
                        ints.push(enable_interactibles_checker)
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
                    }
                }
                else if(txs[i].type == 'storefront-item'){
                    var storefront_data = this.format_storefront_object(txs[i])
                    strs.push([])
                    adds.push([])
                    ints.push(storefront_data)
                }
                else if(txs[i].type == 'buy-sell'){
                    var buy_sell_obj = this.format_buy_sell_object(txs[i])
                    strs.push([])
                    adds.push([])
                    ints.push(buy_sell_obj)
                    if(txs[i].token_item['id'] == 3 && this.get_action(txs[i]) == 0){
                        //if we're buying end
                        wei = (bigInt(txs[i].token_item['data'][4][0]).multiply(txs[i].amount).add(35)).toString()
                    }
                }
                else if(txs[i].type == 'transfer'){
                    var transfer_object = this.format_transfer_object(txs[i])
                    strs.push([])
                    adds.push([])
                    ints.push(transfer_object)
                }
                else if(txs[i].type == 'enter-contract'){
                    var enter_object = this.format_enter_contract_object(txs[i])
                    strs.push([])
                    adds.push([])
                    ints.push(enter_object)
                }
                else if(txs[i].type == 'extend-contract'){
                    var extend_object = this.format_extend_contract_object(txs[i])
                    strs.push([])
                    adds.push([])
                    ints.push(extend_object)
                }
                else if(txs[i].type == 'exit-contract'){
                    var exit_object = this.format_exit_contract_object(txs[i])
                    strs.push([])
                    adds.push([])
                    ints.push(exit_object)
                }
                else if(txs[i].type == 'proposal'){
                    var proposal_obj = this.format_proposal_object(txs[i])
                    strs.push([])
                    adds.push([])
                    ints.push(proposal_obj)
                }
                else if(txs[i].type == 'vote'){
                    var vote_obj = this.format_vote_object(txs[i])
                    strs.push([])
                    adds.push([])
                    ints.push(vote_obj)
                }
                else if(txs[i].type == 'submit'){
                    var submit_obj = this.format_submit_object(txs[i])
                    strs.push([])
                    adds.push([])
                    ints.push(submit_obj)
                }
                else if(txs[i].type == 'pay-subscription'){
                    var pay_subscription = this.format_pay_subscription_object(txs[i])
                    strs.push([])
                    adds.push([])
                    ints.push(pay_subscription)
                }
                else if(txs[i].type == 'cancel-subscription'){
                    var cancel_subscription = this.format_cancel_subscription_object(txs[i])
                    strs.push([])
                    adds.push([])
                    ints.push(cancel_subscription)
                } 
                else if(txs[i].type == 'collect-subscription'){
                    var collect_subscription = this.format_collect_subscription_object(txs[i])
                    strs.push([])
                    adds.push([])
                    ints.push(collect_subscription)
                }
                else if(txs[i].type == 'modify-subscription'){
                    var modify_subscription = this.format_modify_subscription_object(txs[i])
                    strs.push([])
                    adds.push([])
                    ints.push(modify_subscription)
                }   
                else if(txs[i].type == 'modify-contract'){
                    var modify_contract = this.format_modify_contract_object(txs[i])
                    strs.push([])
                    adds.push([])
                    ints.push(modify_contract)
                }
                else if(txs[i].type == 'modify-token'){
                    var modify_token = this.format_modify_token_object(txs[i])
                    strs.push([])
                    adds.push([])
                    ints.push(modify_token)
                }
                else if(txs[i].type == 'exchange-transfer'){
                    var exchange_transfer_obj = this.format_exchange_transfer_object(txs[i])
                    strs.push([])
                    adds.push([])
                    ints.push(exchange_transfer_obj)
                }
                else if(txs[i].type == 'force-exit'){
                    var force_exit_obj = this.format_force_exit_object(txs[i])
                    strs.push([])
                    adds.push([])
                    ints.push(force_exit_obj)
                }
                else if(txs[i].type == 'archive'){
                    var archive_obj = this.format_archive_object(txs[i])
                    strs.push([])
                    adds.push([])
                    ints.push(archive_obj)
                }
                else if(txs[i].type == 'freeze/unfreeze'){
                    var freeze_unfreeze_obj = this.format_freeze_unfreeze_object(txs[i])
                    strs.push([])
                    adds.push([])
                    ints.push(freeze_unfreeze_obj)
                }
                else if(txs[i].type == 'authmint'){
                    var authmint_obj = this.format_authmint_object(txs[i])
                    strs.push([])
                    adds.push([])
                    ints.push(authmint_obj)
                }
                else if(txs[i].type == 'access-rights-settings'){
                    var access_rights_obj = this.format_access_rights_object(txs[i])
                    
                    for(var t=0; t<access_rights_obj.length; t++){
                        strs.push([])
                        adds.push([])
                        ints.push(access_rights_obj[t])
                    }    
                }
                else if(txs[i].type == 'mail'){
                    var mail_obj = await this.format_mail_object(txs[i])
                    
                    strs.push(mail_obj.str)
                    adds.push([])
                    ints.push(mail_obj.int)    
                }
                else if(txs[i].type == 'mail-messages'){
                    var message_obj = await this.format_message_object(txs[i])
                    
                    strs.push(message_obj.str)
                    adds.push([])
                    ints.push(message_obj.int)    
                }
                else if(txs[i].type == 'channel-messages'){
                    var message_obj = await this.format_channel_message_object(txs[i])
                    
                    strs.push(message_obj.str)
                    adds.push([])
                    ints.push(message_obj.int)    
                }
                else if(txs[i].type == 'post-messages'){
                    var message_obj = await this.format_post_comment_object(txs[i])
                    
                    strs.push(message_obj.str)
                    adds.push([])
                    ints.push(message_obj.int)    
                }
                else if(txs[i].type == 'job-response'){
                    var message_obj = await this.format_job_application_object(txs[i])
                    
                    strs.push(message_obj.str)
                    adds.push([])
                    ints.push(message_obj.int)    
                }
                else if(txs[i].type == 'accept-job-application'){
                    var message_obj = await this.format_accept_application_object(txs[i])
                    
                    strs.push(message_obj.str)
                    adds.push([])
                    ints.push(message_obj.int)
                }
                else if(txs[i].type == 'job-messages'){
                    var message_obj = await this.format_job_comment_object(txs[i])
                    
                    strs.push(message_obj.str)
                    adds.push([])
                    ints.push(message_obj.int)    
                }
                else if(txs[i].type == 'proposal-messages'){
                    var message_obj = await this.format_proposal_message_object(txs[i])
                    
                    strs.push(message_obj.str)
                    adds.push([])
                    ints.push(message_obj.int)    
                }
                else if(txs[i].type == 'storefront-bag'){
                    var storefront_bag_obj = this.format_storefront_bag_object(txs[i])
                    strs.push([])
                    adds.push([])
                    ints.push(storefront_bag_obj)

                    var bag_variants = []
                    txs[i].items_to_deliver.forEach(item => {
                        bag_variants.push({'storefront_item_id':item.storefront_item['id'], 'storefront_variant_id':item.selected_variant['variant_id'], 'purchase_unit_count':item.purchase_unit_count})
                    });

                    var final_bag_object = {'bag_orders':bag_variants, 'timestamp':Date.now()}
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
                    var ipfs_obj = await this.get_object_ipfs_index(final_bag_object);
                    metadata_strings[0].push(ipfs_obj.toString())

                    ints.push(metadata_action)
                    strs.push(metadata_strings)
                    adds.push([])
                }
                else if(txs[i].type == 'bag-response'){
                    var message_obj = await this.format_bag_application_object(txs[i])
                    
                    strs.push(message_obj.str)
                    adds.push([])
                    ints.push(message_obj.int)    
                }
                else if(txs[i].type == 'accept-bag-application'){
                    var message_obj = await this.format_accept_bag_application_object(txs[i])
                    
                    strs.push(message_obj.str)
                    adds.push([])
                    ints.push(message_obj.int)
                }
                else if(txs[i].type == 'direct-purchase'){
                    var message_obj = await this.format_direct_purchase_object(txs[i])
                    
                    strs.push(message_obj.str)
                    adds.push([])
                    ints.push(message_obj.int)
                }
                else if(txs[i].type == 'clear-purchase'){
                    var clear_obj = await this.format_clear_purchase_object(txs[i])
                    
                    strs.push(clear_obj.str)
                    adds.push([])
                    ints.push(clear_obj.int)    
                }
                else if(txs[i].type == 'bag-messages'){
                    var message_obj = await this.format_bag_comment_object(txs[i])
                    
                    strs.push(message_obj.str)
                    adds.push([])
                    ints.push(message_obj.int)    
                }
                else if(txs[i].type == 'storefront-messages'){
                    var message_obj = await this.format_storefront_comment_object(txs[i])
                    
                    strs.push(message_obj.str)
                    adds.push([])
                    ints.push(message_obj.int)    
                }
                else if(txs[i].type == 'contractor'){
                    var contractor_obj = this.format_contractor_object(txs[i])
                    strs.push([])
                    adds.push([])
                    ints.push(contractor_obj)
                }
                else if(txs[i].type == 'job-request'){
                    var message_obj = await this.format_job_request_object(txs[i])
                    
                    strs.push(message_obj.str)
                    adds.push([])
                    ints.push(message_obj.int)    
                }
                else if(txs[i].type == 'accept-job-request'){
                    var message_obj = await this.format_accept_job_request_object(txs[i])
                    
                    strs.push(message_obj.str)
                    adds.push([])
                    ints.push(message_obj.int)
                }  
                else if(txs[i].type == 'job-request-messages'){
                    var message_obj = await this.format_job_request_comment_object(txs[i])
                    
                    strs.push(message_obj.str)
                    adds.push([])
                    ints.push(message_obj.int)
                }
                else if(txs[i].type == 'alias'){
                    var alias_obj = await this.format_alias_object(txs[i])
                    
                    strs.push(alias_obj.str)
                    adds.push([])
                    ints.push(alias_obj.int)
                }
                else if(txs[i].type == 'unalias'){
                    var alias_obj = await this.format_unalias_object(txs[i])
                    
                    strs.push(alias_obj.str)
                    adds.push([])
                    ints.push(alias_obj.int)
                }
                else if(txs[i].type == 're-alias'){
                    var alias_obj = await this.format_realias_object(txs[i])
                    
                    strs.push(alias_obj.str)
                    adds.push([])
                    ints.push(alias_obj.int)

                    strs.push(alias_obj.str)
                    adds.push([])
                    ints.push(alias_obj.int)
                }
                else if(txs[i].type == 'edit-channel' || txs[i].type == 'edit-contractor' || txs[i].type == 'edit-job' || txs[i].type == 'edit-post' || txs[i].type == 'edit-storefront' || txs[i].type == 'edit-token'){
                    var format_edit_object = await this.format_edit_object(txs[i])
                    strs.push(format_edit_object.metadata_strings)
                    adds.push([])
                    ints.push(format_edit_object.metadata_action)
                }
                else if(txs[i].type == 'award'){
                    var format_object = await this.format_award_object(txs[i])
                    strs.push(format_object.str)
                    adds.push([])
                    ints.push(format_object.int)
                }
                else if(txs[i].type == 'depthmint'){
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
            if(pushed_txs[i].type == 'contract' || pushed_txs[i].type == 'token' || pushed_txs[i].type == 'subscription' || pushed_txs[i].type == 'post' || pushed_txs[i].type == 'job' || pushed_txs[i].type == 'channel' || pushed_txs[i].type == 'storefront-item'|| pushed_txs[i].type == 'proposal' || pushed_txs[i].type == 'contractor'){
                metadata_action[1].push(i)
                metadata_action[2].push(35)
                metadata_action[3].push(0)
                metadata_action[4].push(0)
                var ipfs_obj = await this.get_object_ipfs_index(pushed_txs[i]);
                metadata_strings[0].push(ipfs_obj.toString())
            }
        }
        ints.push(metadata_action)
        strs.push(metadata_strings)
        adds.push([])






        var index_data_in_tags = [ /* index data in tags */
            [20000, 12, 0],
            [], []/* target objects */
        ]

        var index_data_strings = [ [], [] ]

        for(var i=0; i<pushed_txs.length; i++){
            if(pushed_txs[i].type == 'contract' || pushed_txs[i].type == 'token' || pushed_txs[i].type == 'subscription' || pushed_txs[i].type == 'post' || pushed_txs[i].type == 'job' || pushed_txs[i].type == 'channel' || pushed_txs[i].type == 'storefront-item' || pushed_txs[i].type == 'proposal' || pushed_txs[i].type == 'contractor'){
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

        ints.push(index_data_in_tags)
        strs.push(index_data_strings)
        adds.push([])




        if(this.props.app_state.E5_runs[this.props.app_state.selected_e5].length == 0){
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
            var contacts_clone = this.props.app_state.contacts[this.props.app_state.selected_e5].slice()
            var data = {'contacts':contacts_clone, 'time':Date.now()}
            var string_data = await this.get_object_ipfs_index(data);
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
            var blocked_accounts = this.props.app_state.blocked_accounts[this.props.app_state.selected_e5].slice()
            var data = {'blocked_accounts':blocked_accounts, 'time':Date.now()}
            var string_data = await this.get_object_ipfs_index(data);
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
            var string_data = await this.get_object_ipfs_index(data);
            string_obj[0].push(string_data)
            
            strs.push(string_obj)
            adds.push([])
            ints.push(transaction_obj)
        }



        var account_balance = this.props.app_state.account_balance[this.props.app_state.selected_e5]
        var run_gas_limit = this.state.run_gas_limit == 0 ? 5_300_000 : this.state.run_gas_limit
        var run_gas_price = this.state.run_gas_price == 0 ? this.props.app_state.gas_price[this.props.app_state.selected_e5] : this.state.run_gas_price

        if(pushed_txs.length > 0){
            if(account_balance == 0){
                this.props.open_wallet_guide_bottomsheet('one')
                this.props.lock_run(false)
            }
            else if(account_balance < (run_gas_limit * run_gas_price)){
                this.setState({invalid_ether_amount_dialog_box: true})
                this.props.lock_run(false)
            }
            else if(run_gas_limit < 35000){
                this.props.notify('That transaction gas limit is too low',2900)
            }
            else{
                this.props.run_transaction_with_e(strs, ints, adds, run_gas_limit, wei, delete_pos_array, run_gas_price)
            }
        }else{
            this.props.lock_run(false)
            this.props.notify('add some transactions first!',1600)
        }
        
    }

    get_object_ipfs_index(tx){
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
            <Dialog onClose = {() => this.cancel_dialog_box()} open = {this.state.invalid_ether_amount_dialog_box}>
                <div style={{'padding': '10px', 'background-color':this.props.theme['send_receive_ether_background_color']}}>
                    
                    <h4 style={{'margin':'0px 0px 5px 10px', 'color':this.props.theme['primary_text_color']}}>Issue With Run</h4>

                    {this.render_detail_item('3', {'title':'Theres an issue with your Balance', 'details':'You need ether to run your transactions', 'size':'s'})}
                    <div style={{height: 10}}/>

                    <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '20px 0px 5px 0px','border-radius': '8px' }}>
                        <p style={{'color': this.props.theme['primary_text_color'], 'font-size': '11px', height: 7, 'margin':'0px 0px 20px 10px'}} className="fw-bold">Wallet Balance in Ether and Wei</p>
                        {this.render_detail_item('2', this.get_balance_amount_in_wei())}
                        {this.render_detail_item('2', this.get_balance_amount_in_ether())}
                    </div>

                    <div style={{height: 10}}/>

                    <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '20px 0px 5px 0px','border-radius': '8px' }}>
                        <p style={{'color': this.props.theme['primary_text_color'], 'font-size': '11px', height: 7, 'margin':'0px 0px 20px 10px'}} className="fw-bold">Required Balance in Ether and Wei</p>
                        
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
        var max_extend_enter_contract_limit = t.max_extend_enter_contract_limit == 0 ? 36_000_000 : t.max_extend_enter_contract_limit.toString().toLocaleString('fullwide', {useGrouping:false})
        var default_minimum_end_vote_bounty_amount = t.default_minimum_end_vote_bounty_amount == 0 ? 0 : t.default_minimum_end_vote_bounty_amount.toString().toLocaleString('fullwide', {useGrouping:false})
        var default_proposal_expiry_duration_limit = t.default_proposal_expiry_duration_limit == 0 ? 30_000 : t.default_proposal_expiry_duration_limit.toString().toLocaleString('fullwide', {useGrouping:false})
        var max_enter_contract_duration = t.max_enter_contract_duration == 0 ? bgN(1, 16) : t.max_enter_contract_duration.toString().toLocaleString('fullwide', {useGrouping:false})
        var auto_wait_for_all_proposals_for_all_voters = this.get_selected_item(t.auto_wait_tags_object, t.auto_wait_tags_object['i'].active) == 'no' ? 0 : 1
        var default_minimum_spend_vote_bounty_amount = t.default_minimum_spend_vote_bounty_amount == 0 ? 0 : t.default_minimum_spend_vote_bounty_amount.toString().toLocaleString('fullwide', {useGrouping:false})
        var proposal_modify_expiry_duration_limit = t.proposal_modify_expiry_duration_limit == 0 ? 3600 : t.proposal_modify_expiry_duration_limit.toString().toLocaleString('fullwide', {useGrouping:false})
        var can_modify_contract_as_moderator = this.get_selected_item(t.can_modify_contract_as_moderator, t.can_modify_contract_as_moderator['i'].active) == 'modifiable' ? 1 : 0
        var can_extend_enter_contract_at_any_time = this.get_selected_item(t.can_extend_enter_contract_at_any_time, t.can_extend_enter_contract_at_any_time['i'].active) == 'enabled' ? 1 : 0
        var maximum_proposal_expiry_submit_expiry_time_difference = t.maximum_proposal_expiry_submit_expiry_time_difference == 0 ? bgN(1,16).toString().toLocaleString('fullwide', {useGrouping:false}) : t.maximum_proposal_expiry_submit_expiry_time_difference.toString().toLocaleString('fullwide', {useGrouping:false})
        var bounty_limit_type = this.get_selected_item(t.bounty_limit_type, t.bounty_limit_type['i'].active) == 'relative' ? 0 : 1
        var contract_force_exit_enabled = this.get_selected_item(t.contract_force_exit_enabled, t.contract_force_exit_enabled['i'].active) == 'enabled' ? 1 : 0

        var obj = [/* create contract */
        [10000, 0, 0, 0, 0/* 4 */, 0, 0, 0, 0, 30, 0],
        [30], [23],
        [0, default_vote_bounty_split_proportion, max_extend_enter_contract_limit/* 2 */, 0, default_minimum_end_vote_bounty_amount, default_proposal_expiry_duration_limit, max_enter_contract_duration/* 6 */, 0, auto_wait_for_all_proposals_for_all_voters, 0, default_minimum_spend_vote_bounty_amount, 0, 0, 0/* 13 */, 0, bgN(1, 63), 0,0,0,0,0/* 20 */,0,0,0,0,0,0,proposal_modify_expiry_duration_limit/* 27 */,can_modify_contract_as_moderator,can_extend_enter_contract_at_any_time,0,0,0,0,0/* 34 */,0,maximum_proposal_expiry_submit_expiry_time_difference,bounty_limit_type,contract_force_exit_enabled,0,0], 
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
            obj[7].push(parseInt(t.price_data[i]['amount']))
            obj[8].push(23)
            obj[9].push(0)
            obj[10].push(23)
        }
      }

      return obj
    }

    format_token_object(t){
        //.toString().toLocaleString('fullwide', {useGrouping:false})
        var type = this.get_selected_item(t.new_token_type_tags_object, t.new_token_type_tags_object['i'].active);
        var new_token_type_tags_object = type == 'capped' ? 3 : 5
        var token_exchange_liquidity_total_supply = t.token_exchange_liquidity_total_supply <= 100_000 ? 1_000_000_000 : t.token_exchange_liquidity_total_supply.toString().toLocaleString('fullwide', {useGrouping:false})
        if(type == 'uncapped'){
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
        
        var new_token_unlocked_liquidity_tags_object = this.get_selected_item(t.new_token_unlocked_liquidity_tags_object, t.new_token_unlocked_liquidity_tags_object['i'].active) == 'unlocked' ? 1 : 0
        var new_token_unlocked_supply_tags_object = this.get_selected_item(t.new_token_unlocked_supply_tags_object, t.new_token_unlocked_supply_tags_object['i'].active) == 'unlocked' ? 1 : 0
        var new_token_fully_custom_tags_object = this.get_selected_item(t.new_token_fully_custom_tags_object, t.new_token_fully_custom_tags_object['i'].active) == 'fully-custom' ? 1 : 0
        var internal_block_halfing_proportion = t.internal_block_halfing_proportion.toString().toLocaleString('fullwide', {useGrouping:false})
        var block_limit_reduction_proportion = t.block_limit_reduction_proportion.toString().toLocaleString('fullwide', {useGrouping:false})
        var block_reset_limit = t.block_reset_limit.toString().toLocaleString('fullwide', {useGrouping:false})
        
        var new_token_block_limit_sensitivity_tags_object = parseInt(this.get_selected_item(t.new_token_block_limit_sensitivity_tags_object, t.new_token_block_limit_sensitivity_tags_object['i'].active)).toString().toLocaleString('fullwide', {useGrouping:false})
        var default_authority_mint_limit = t.default_authority_mint_limit == 0 ? bgN(1,16).toString().toLocaleString('fullwide', {useGrouping:false}) : t.default_authority_mint_limit.toString().toLocaleString('fullwide', {useGrouping:false})
        
        var new_token_halving_type_tags_object = (this.get_selected_item(t.new_token_halving_type_tags_object, t.new_token_halving_type_tags_object['i'].active) == 'spread' ? 1 : 0).toString().toLocaleString('fullwide', {useGrouping:false})
        var maturity_limit = t.maturity_limit.toString().toLocaleString('fullwide', {useGrouping:false})
        
        var minimum_entered_contracts_for_first_buy = t.minimum_entered_contracts_for_first_buy.toString().toLocaleString('fullwide', {useGrouping:false})

        var default_exchange_ratio_value = '1000';
        if(type == 'capped'){
            default_exchange_ratio_value = token_exchange_liquidity_total_supply;
        }

        var active_block_limit_reduction_proportion = type == 'capped' ? 0 : bgN(100,16)
        var token_exchange_ratio_x = t.token_exchange_ratio_x == 0 ? default_exchange_ratio_value: t.token_exchange_ratio_x.toString().toLocaleString('fullwide', {useGrouping:false})

        var token_exchange_ratio_y = t.token_exchange_ratio_y == 0 ? default_exchange_ratio_value : t.token_exchange_ratio_y.toString().toLocaleString('fullwide', {useGrouping:false})

        if(type == 'capped' && token_exchange_ratio_x != token_exchange_liquidity_total_supply){
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

    format_subscription_object(t){
        var exchange_authority = t.authority_id == '' ? 53 : parseInt(t.authority_id)
        var exchange_authority_type = 23
        if(exchange_authority == 53){
            exchange_authority_type = 53
        }
        var minimum_buy_amount = t.minimum_buy_amount == 0 ? 1 : t.minimum_buy_amount.toString().toLocaleString('fullwide', {useGrouping:false})
        var cancellable_tags_object = this.get_selected_item(t.cancellable_tags_object, t.cancellable_tags_object['i'].active) == 'true' ? 1 : 0
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

    format_buy_sell_object(t){
        var obj = [/* buy end/spend */
        [30000, 8, 0],
        [], [],/* exchanges */
        [], [],/* receivers */
        []/* amounts */, [],/* action */
        []/* lower_bounds */, []/* upper_bounds */
      ];


      var amount = bigInt(t.amount).toString().toLocaleString('fullwide', {useGrouping:false})
      obj[5].push(amount)

      obj[1].push(t.token_item['id'])
      obj[2].push(23)
      obj[3].push(t.recipient_id)
      if(t.recipient_id == 53){
        obj[4].push(53)
      }else{
        obj[4].push(23)
      }
      
      obj[6].push(this.get_action(t))

      if(t.upper_bound != 0 && t.lower_bound != 0){
        obj[7].push(t.lower_bound.toString().toLocaleString('fullwide', {useGrouping:false}))
        obj[8].push(t.upper_bound.toString().toLocaleString('fullwide', {useGrouping:false}))
      }

      return obj
    }

    get_action(t){
        var action = this.get_selected_item(t.new_mint_dump_action_page_tags_object, 'e')
        var stack_action = 1
        if(action == 'mint-buy') stack_action = 0
        return stack_action
    }

    format_transfer_object(t){
        var obj = [/* send tokens to another account */
        [30000, 1, 0],
        [], [],/* exchanges */
        [], [],/* receivers */
        [],/* amounts */
        []/* depths */
      ]
      var added_txs = t.stack_items
      for(var i=0; i<added_txs.length; i++){
        obj[1].push(added_txs[i]['exchange']['id'])
        obj[2].push(23)

        obj[3].push(added_txs[i]['recipient'])
        if(added_txs[i]['recipient'] == 53){
            obj[4].push(53)
        }else{
            obj[4].push(23)
        }
        obj[5].push(added_txs[i]['amount'])
        obj[6].push(0)
      }

    //   console.log('-------------------------format_transfer_object-------------------')
    //   console.log(obj)
      
      return obj
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
        var consensus_type_tag = this.get_selected_item(t.new_proposal_type_tags_object, t.new_proposal_type_tags_object['i'].active)
        var consensus_type = consensus_obj[consensus_type_tag]
        var proposal_expiry_time = t.proposal_expiry_time.toString().toLocaleString('fullwide', {useGrouping:false})
        var consensus_submit_expiry_time = t.proposal_submit_expiry_time.toString().toLocaleString('fullwide', {useGrouping:false})
        var target_contract_authority = t.contract_item['id'].toString().toLocaleString('fullwide', {useGrouping:false})
        var modify_target = t.modify_target_id.toString().toLocaleString('fullwide', {useGrouping:false})
        if(modify_target == ''){
            modify_target = '0'
        }

        var obj = [/* create proposal */
            [10000, 0, 0, 0, 0/* 4 */, 0, 0, 0, 0, 32, 0],
            [0], [23],
            [consensus_type, proposal_expiry_time, 0/* 2 */, consensus_submit_expiry_time, 0, target_contract_authority, 0/* 6 */, 0, 0, modify_target], 
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

        if(consensus_type_tag == 'spend'){
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
        else if(consensus_type_tag == 'reconfig'){
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
        else if(consensus_type_tag == 'exchange-transfer'){
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

    format_mail_object = async (t) =>{
        var obj = [ /* set data */
        [20000, 13, 0],
        [], [],/* target objects */
        [], /* contexts */
        [] /* int_data */
      ]

        var string_obj = [[]]
        var string_data = await this.get_object_ipfs_index(await this.get_encrypted_mail_message(t, t.target_recipient));

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
        var recipients_pub_key_hash = await this.props.get_accounts_public_key(recipient, 'E15')

        if(recipients_pub_key_hash != ''){
            var encrypted_key = await this.props.encrypt_key_with_accounts_public_key_hash(key, recipients_pub_key_hash)
            recipent_data[parseInt(recipient)] = encrypted_key
        }

        var uint8array = await this.props.get_account_raw_public_key() 
        var my_encrypted_key = await this.props.encrypt_key_with_accounts_public_key_hash(key, uint8array)
        recipent_data[this.props.app_state.user_account_id[this.props.app_state.selected_e5]] = my_encrypted_key

        return {'obj':encrypted_obj, 'recipient_data':recipent_data}
    }

    format_message_object = async (t) =>{
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

            var string_data = await this.get_object_ipfs_index(await this.get_encrypted_mail_message(t.messages_to_deliver[i], t.messages_to_deliver[i]['recipient']));

            obj[1].push(recipient_account)
            obj[2].push(23)
            obj[3].push(context)
            obj[4].push(int_data)

            string_obj[0].push(string_data)
        }

        return {int: obj, str: string_obj}
    }

    format_channel_message_object = async (t) =>{
        var obj = [ /* set data */
            [20000, 13, 0],
            [], [],/* target objects */
            [], /* contexts */
            [] /* int_data */
        ]

        var string_obj = [[]]

        for(var i=0; i<t.messages_to_deliver.length; i++){
            var target_id = t.messages_to_deliver[i]['id']
            var context = 35
            var int_data = 0

            var string_data = await this.get_object_ipfs_index(t.messages_to_deliver[i]);

            obj[1].push(target_id)
            obj[2].push(23)
            obj[3].push(context)
            obj[4].push(int_data)

            string_obj[0].push(string_data)
        }

        return {int: obj, str: string_obj}
    }

    format_post_comment_object = async (t) =>{
        var obj = [ /* set data */
            [20000, 13, 0],
            [], [],/* target objects */
            [], /* contexts */
            [] /* int_data */
        ]

        var string_obj = [[]]

        for(var i=0; i<t.messages_to_deliver.length; i++){
            var target_id = t.messages_to_deliver[i]['id']
            var context = 35
            var int_data = 0

            var string_data = await this.get_object_ipfs_index(t.messages_to_deliver[i]);

            obj[1].push(target_id)
            obj[2].push(23)
            obj[3].push(context)
            obj[4].push(int_data)

            string_obj[0].push(string_data)
        }

        return {int: obj, str: string_obj}
    }

    format_job_application_object = async (t) =>{
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

        var application_obj = {'price_data':t.price_data, 'picked_contract_id':t.picked_contract['id'], 'application_expiry_time':t.application_expiry_time, 'applicant_id':this.props.app_state.user_account_id[this.props.app_state.selected_e5], 'pre_post_paid_option':t.pre_post_paid_option, 'type':'job_application'}

        var string_data = await this.get_object_ipfs_index(application_obj);

        obj[1].push(target_id)
        obj[2].push(23)
        obj[3].push(context)
        obj[4].push(int_data)

        string_obj[0].push(string_data)

        return {int: obj, str: string_obj}
    }

    format_accept_application_object = async (t) =>{
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

        var string_data = await this.get_object_ipfs_index(application_obj);

        obj[1].push(target_id)
        obj[2].push(23)
        obj[3].push(context)
        obj[4].push(int_data)

        string_obj[0].push(string_data)



        return {int: obj, str: string_obj}
    }

    format_job_comment_object = async (t) =>{
        var obj = [ /* set data */
            [20000, 13, 0],
            [], [],/* target objects */
            [], /* contexts */
            [] /* int_data */
        ]

        var string_obj = [[]]

        for(var i=0; i<t.messages_to_deliver.length; i++){
            var target_id = t.messages_to_deliver[i]['id']
            var context = 35
            var int_data = 0

            var string_data = await this.get_object_ipfs_index(t.messages_to_deliver[i]);

            obj[1].push(target_id)
            obj[2].push(23)
            obj[3].push(context)
            obj[4].push(int_data)

            string_obj[0].push(string_data)
        }

        return {int: obj, str: string_obj}
    }

    format_proposal_message_object = async (t) => {
        var obj = [ /* set data */
            [20000, 13, 0],
            [], [],/* target objects */
            [], /* contexts */
            [] /* int_data */
        ]

        var string_obj = [[]]

        for(var i=0; i<t.messages_to_deliver.length; i++){
            var target_id = t.messages_to_deliver[i]['id']
            var context = 35
            var int_data = 0

            var string_data = await this.get_object_ipfs_index(t.messages_to_deliver[i]);

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

    format_bag_application_object = async (t) =>{
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

        var string_data = await this.get_object_ipfs_index(application_obj);

        obj[1].push(target_id)
        obj[2].push(23)
        obj[3].push(context)
        obj[4].push(int_data)

        string_obj[0].push(string_data)

        return {int: obj, str: string_obj}
    }

    format_accept_bag_application_object = async (t) =>{
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

        var string_data = await this.get_object_ipfs_index(application_obj);

        obj[1].push(target_id)
        obj[2].push(23)
        obj[3].push(context)
        obj[4].push(int_data)

        string_obj[0].push(string_data)



        return {int: obj, str: string_obj}
    }

    format_direct_purchase_object = async (t) => {
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
            
            obj[4].push(exchange)
            obj[5].push(23)
            obj[6].push(amount)
            obj[7].push(0)
        }

        for(var i=0; i < t.storefront_item['ipfs'].shipping_price_data.length; i++){
            var shipping_fee_exchange = t.storefront_item['ipfs'].shipping_price_data[i]['id']
            var shipping_fee_amount = t.storefront_item['ipfs'].shipping_price_data[i]['amount'].toString().toLocaleString('fullwide', {useGrouping:false})
            
            obj[4].push(shipping_fee_exchange)
            obj[5].push(23)
            obj[6].push(shipping_fee_amount)
            obj[7].push(0)
        }

        var purchase_object = {'shipping_detail':t.fulfilment_location, 'variant_id':t.selected_variant['variant_id'], 'purchase_unit_count':t.purchase_unit_count, 'sender_account':this.props.app_state.user_account_id[this.props.app_state.selected_e5], 'signature_data':Date.now(), 'sender_address':this.props.app_state.accounts[this.props.app_state.selected_e5].address}
        
        var string_data = await this.get_object_ipfs_index(purchase_object);

        string_obj[0].push(string_data)

        return {int: obj, str: string_obj}
    }

    get_amounts_to_be_paid(amount, count){
        return bigInt(amount).multiply(bigInt(count))
    }

    format_clear_purchase_object = async (t) =>{
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
            var string_data = await this.get_object_ipfs_index(string_object);

            obj[1].push(target_id)
            obj[2].push(23)
            obj[3].push(context)
            obj[4].push(int_data)

            string_obj[0].push(string_data)
        }

        return {int: obj, str: string_obj}
    }

    format_bag_comment_object = async (t) => {
        var obj = [ /* set data */
            [20000, 13, 0],
            [], [],/* target objects */
            [], /* contexts */
            [] /* int_data */
        ]

        var string_obj = [[]]

        for(var i=0; i<t.messages_to_deliver.length; i++){
            var target_id = t.messages_to_deliver[i]['id']
            var context = 35
            var int_data = 0

            var string_data = await this.get_object_ipfs_index(t.messages_to_deliver[i]);

            obj[1].push(target_id)
            obj[2].push(23)
            obj[3].push(context)
            obj[4].push(int_data)

            string_obj[0].push(string_data)
        }

        return {int: obj, str: string_obj}
    }

    format_storefront_comment_object = async (t) => {
        var obj = [ /* set data */
            [20000, 13, 0],
            [], [],/* target objects */
            [], /* contexts */
            [] /* int_data */
        ]

        var string_obj = [[]]

        for(var i=0; i<t.messages_to_deliver.length; i++){
            var target_id = t.messages_to_deliver[i]['id']
            var context = 35
            var int_data = 0

            var string_data = await this.get_object_ipfs_index(t.messages_to_deliver[i]);

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

    format_job_request_object = async (t) => {
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

        var string_data = await this.get_object_ipfs_index(application_obj);

        obj[1].push(target_id)
        obj[2].push(23)
        obj[3].push(context)
        obj[4].push(int_data)

        string_obj[0].push(string_data)

        return {int: obj, str: string_obj}
    }

    format_accept_job_request_object = async (t) =>{
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

        var string_data = await this.get_object_ipfs_index(application_obj);

        obj[1].push(target_id)
        obj[2].push(23)
        obj[3].push(context)
        obj[4].push(int_data)

        string_obj[0].push(string_data)



        return {int: obj, str: string_obj}
    }

    format_job_request_comment_object = async (t) =>{
        var obj = [ /* set data */
            [20000, 13, 0],
            [], [],/* target objects */
            [], /* contexts */
            [] /* int_data */
        ]

        var string_obj = [[]]

        for(var i=0; i<t.messages_to_deliver.length; i++){
            var target_id = t.messages_to_deliver[i]['contractor_id']
            var context = t.messages_to_deliver[i]['id']
            var int_data = 0

            var string_data = await this.get_object_ipfs_index(t.messages_to_deliver[i]);

            obj[1].push(target_id)
            obj[2].push(23)
            obj[3].push(context)
            obj[4].push(int_data)

            string_obj[0].push(string_data)
        }

        return {int: obj, str: string_obj}
    }

    format_alias_object = async (t) =>{
        var obj = [ /* add data */
            [20000, 13, 0],
            [11], [23],/* 11(alias_obj_id) */
            [], /* contexts */
            [] /* int_data */
        ]

        var string_obj = [[]]

        var context = this.props.app_state.user_account_id[this.props.app_state.selected_e5]
        var int_data = Date.now()

        var string_data = await this.get_object_ipfs_index(t.alias);

        obj[3].push(context)
        obj[4].push(int_data)

        string_obj[0].push(string_data)

        return {int: obj, str: string_obj}
    }

    format_unalias_object = async (t) =>{
        var obj = [ /* add data */
            [20000, 13, 0],
            [11], [23],/* 11(alias_obj_id) */
            [], /* contexts */
            [] /* int_data */
        ]

        var string_obj = [[]]

        var context = this.props.app_state.user_account_id[this.props.app_state.selected_e5]
        var int_data = Date.now()

        var string_data = await this.get_object_ipfs_index(t.alias);

        obj[3].push(context)
        obj[4].push(int_data)

        string_obj[0].push(string_data)

        return {int: obj, str: string_obj}
    }

    format_realias_object = async (t) =>{
        var obj = [ /* add data */
            [20000, 13, 0],
            [11], [23],/* 11(alias_obj_id) */
            [], /* contexts */
            [] /* int_data */
        ]

        var string_obj = [[]]

        var context = this.props.app_state.user_account_id[this.props.app_state.selected_e5]
        var int_data = Date.now()

        var string_data = await this.get_object_ipfs_index(t.alias);

        obj[3].push(context)
        obj[4].push(int_data)

        string_obj[0].push(string_data)

        return {int: obj, str: string_obj}
    }

    format_edit_object = async (t) => {
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
        // var object_clone = structuredClone(t)
        
        // if(object_clone.type == 'edit-channel'){
        //     object_clone.type = 'channel'

        // }
        // else if(object_clone.type == 'edit-contractor'){
        //     object_clone.type = 'contractor'
        // }
        // else if(t.type == 'edit-job'){
        //     t.type = 'job'
        // }
        // else if(object_clone.type == 'edit-post'){
        //     object_clone.type = 'post'
        // }
        // else if(object_clone.type == 'edit-storefront'){
        //     object_clone.type = 'storefront-item'
        // }
        // else if(object_clone.type == 'edit-token'){
        //     object_clone.type = 'token'
        // }
        var ipfs_obj = await this.get_object_ipfs_index(t);
        metadata_strings[0].push(ipfs_obj.toString())

        return {metadata_action: metadata_action, metadata_strings:metadata_strings}
    }

    format_award_object = async (t) => {
        var author = t.post_item['event'].returnValues.p5
        var post_id = t.post_item['id'];
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

            obj[4].push(exchange)
            obj[5].push(23)
            obj[6].push(amount)
            obj[7].push(0)
        }

        var award_object = {'selected_tier_object':t.selected_tier_object, 'post_id':post_id, 'multiplier':t.multiplier, 'custom_amounts':t.price_data, 'entered_message':t.entered_message_text}
        
        var string_data = await this.get_object_ipfs_index(award_object);
        string_obj[0].push(string_data)

        return {int: obj, str: string_obj}
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

    render_settings_details(){
        return(
            <div>
                <div style={{height: 10}}/>
                <div style={{'padding': '0px 0px 0px 0px'}}>

                    {this.render_detail_item('3',{'title':'App Theme', 'details':'Set the look and feel of E5.', 'size':'l'})}
                    <div style={{height: 10}}/>

                    <Tags page_tags_object={this.state.get_themes_tags_object} tag_size={'l'} when_tags_updated={this.when_theme_tags_updated.bind(this)} theme={this.props.theme}/>

                    {this.render_detail_item('0')}


                    {/* {this.render_detail_item('3',{'title':'Orientation (for larger screens)', 'details':'Set the orientation for viewing a posts details', 'size':'l'})}
                    <div style={{height: 10}}/>

                    <Tags page_tags_object={this.state.get_orientation_tags_object} tag_size={'l'} when_tags_updated={this.when_details_orientation_changed.bind(this)} theme={this.props.theme}/>

                    {this.render_detail_item('0')} */}

                    
                    {this.render_detail_item('3',{'title':'Preferred E5', 'details':'Set the E5 you preferr to use', 'size':'l'})}
                    <div style={{height: 10}}/>

                    <Tags page_tags_object={this.state.get_selected_e5_tags_object} tag_size={'l'} when_tags_updated={this.when_get_selected_e5_tags_object_updated.bind(this)} theme={this.props.theme}/>

                    {this.render_detail_item('0')}



                    {this.render_detail_item('3',{'title':'Preferred storage option', 'details':'Set the storage option you prefer to use', 'size':'l'})}
                    <div style={{height: 10}}/>

                    <Tags page_tags_object={this.state.get_selected_storage_tags_object} tag_size={'l'} when_tags_updated={this.when_get_selected_storage_tags_object_updated.bind(this)} theme={this.props.theme}/>

                    {this.render_detail_item('0')}



                    {this.render_detail_item('3',{'title':'Clear Browser Cache', 'details':'Delete browser data such as your pins and viewed history.', 'size':'l'})}
                    <div style={{height: 10}}/>

                    <div onClick={()=> this.when_clear_cache_clicked()} style={{margin:'0px 10px 0px 10px'}}>
                        {this.render_detail_item('5', {'text':'Clear Cache', 'action':''},)}
                    </div>

                    {this.render_detail_item('0')}




                    {this.render_detail_item('3',{'title':'Preferred Refresh Speed', 'details':'Set the background refresh speed for E5. Fast consumes more data.', 'size':'l'})}
                    <div style={{height: 10}}/>

                    <Tags page_tags_object={this.state.get_refresh_speed_tags_object} tag_size={'l'} when_tags_updated={this.when_get_refresh_speed_tags_object_updated.bind(this)} theme={this.props.theme}/>

                    {this.render_detail_item('0')}






                    {this.render_detail_item('3',{'title':'Hide Masked Content', 'details':'Hide masked content sent from your blocked accounts', 'size':'l'})}
                    <div style={{height: 10}}/>

                    <Tags page_tags_object={this.state.get_masked_data_tags_object} tag_size={'l'} when_tags_updated={this.when_get_masked_data_tags_object_updated.bind(this)} theme={this.props.theme}/>

                    {this.render_detail_item('0')}






                    {this.render_detail_item('3',{'title':'Content Channeling', 'details':'Set which channeling option your content and feed is directed to.', 'size':'l'})}
                    <div style={{height: 10}}/>

                    <Tags page_tags_object={this.state.get_content_channeling_object} tag_size={'l'} when_tags_updated={this.when_get_content_channeling_object_updated.bind(this)} theme={this.props.theme}/>

                    {this.render_detail_item('0')}






                    {this.render_detail_item('3',{'title':'Content Language', 'details':'Set which language you prefer to use', 'size':'l'})}
                    <div style={{height: 10}}/>

                    <Tags page_tags_object={this.state.get_content_language_object} tag_size={'l'} when_tags_updated={this.when_get_content_language_object_updated.bind(this)} theme={this.props.theme}/>

                    {this.render_detail_item('0')}






                    
                    {this.render_detail_item('3',{'title':'Content Filter', 'details':'If set to filtered, the content including the tags you follow will be prioritized in your feed.', 'size':'l'})}
                    <div style={{height: 10}}/>

                    <Tags page_tags_object={this.state.get_content_filtered_setting_object} tag_size={'l'} when_tags_updated={this.when_get_content_filtered_setting_object_updated.bind(this)} theme={this.props.theme}/>

                    {this.render_detail_item('0')}


                    
                    {this.render_detail_item('3',{'title':'Content Tabs', 'details':'If set to enabled, tabs that help keep track of viewing history will be shown above an objects details.', 'size':'l'})}
                    <div style={{height: 10}}/>

                    <Tags page_tags_object={this.state.get_tabs_tags_object} tag_size={'l'} when_tags_updated={this.when_get_tabs_tags_object_updated.bind(this)} theme={this.props.theme}/>

                    {this.render_detail_item('0')}
                </div>
            </div>
        )
    }

    

    when_theme_tags_updated(tag_group){
        this.setState({get_themes_tags_object: tag_group})

        var selected_item = this.get_selected_item(this.state.get_themes_tags_object, this.state.get_themes_tags_object['i'].active)

        if(selected_item == 'e'){
            selected_item = 'light'
        }

        this.props.when_device_theme_changed(selected_item)
    }

    when_details_orientation_changed(tag_group){
        this.setState({get_orientation_tags_object: tag_group})
        var selected_item = this.get_selected_item(this.state.get_orientation_tags_object, this.state.get_orientation_tags_object['i'].active)

        if(selected_item == 'e'){
            selected_item = 'right'
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
        this.props.notify('Cache cleared!', 900)
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
                    {this.render_detail_item('4',{'font':'Sans-serif', 'textsize':'15px', 'text':'Set the seed and salt for your preferred wallet', 'color':'dark-grey'})}
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
                        <p style={{'color': this.props.theme['primary_text_color'], 'font-size': '11px', height: 7, 'margin':'0px 0px 20px 10px'}} className="fw-bold">Wallet Balance in Ether and Wei</p>
                        {this.render_detail_item('2', this.get_balance_amount_in_wei())}
                        {this.render_detail_item('2', this.get_balance_amount_in_ether())}
                </div>
                
                
            </div>
        )
    }

    render_wallet_address(){
        if(this.props.app_state.has_wallet_been_set){
            return(
                <div>
                    <div onClick={() => this.copy_to_clipboard(this.get_account_address())}>
                        {this.render_detail_item('3', {'title':'Wallet Address', 'details':this.get_account_address(), 'size':'s'})}
                    </div>
                    <div style={{height: 10}}/>
                </div>
            )
        }else{
            return(
                <div>
                    <div>
                        {this.render_detail_item('3', {'title':'Wallet Address', 'details':'0x0000000000000000000000000000000000000000', 'size':'s'})}
                    </div>
                    <div style={{height: 10}}/>
                </div>
            )
        }
    }


    render_wallet_settings_part(){
        return(
            <div>
                
                {this.render_detail_item('3',{'title':'Wallet Seed', 'details':'Set your preferred seed. Type a word then click add to add a word, or tap the word to remove', 'size':'l'})}
                <div style={{height: 10}}/>
                
                <div className="row" style={{width:'103%'}}>
                    <div className="col-9" style={{'margin': '0px 0px 0px 0px'}}>
                        <TextInput height={30} placeholder={'Enter word...'} when_text_input_field_changed={this.when_text_input_field_changed.bind(this)} text={this.state.typed_word} theme={this.props.theme}/>
                    </div>
                    <div className="col-3" style={{'padding': '0px 10px 0px 0px'}}>
                        {this.render_detail_item('5',{'text':'Add','action':'when_add_word_button_tapped'})}
                    </div>
                </div>

                {this.render_detail_item('1',{'active_tags':this.state.added_tags, 'indexed_option':'indexed', 'when_tapped':'delete_entered_seed_word'})}
                

                {this.render_detail_item('0')}

                {this.render_detail_item('3',{'title':'Wallet Salt', 'details':'Set the preferred salt for your wallet', 'size':'l'})}
                <NumberPicker number_limit={bigInt('1e72')} when_number_picker_value_changed={this.when_new_salt_figure_set.bind(this)} theme={this.props.theme} power_limit={63}/>

                {this.render_detail_item('0')}

                {this.render_detail_item('3',{'title':'Wallet Thyme', 'details':'Set the preferred thyme for your wallet', 'size':'l'})}
                <Tags page_tags_object={this.state.get_wallet_thyme_tags_object} tag_size={'l'} when_tags_updated={this.when_thyme_tags_updated.bind(this)} theme={this.props.theme}/>
                <div style={{height: 10}}/>
                
                {this.render_detail_item('5',{'text':'Set Wallet','action':'when_set_wallet_button_tapped'})}
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
            this.props.notify('set your wallets seed', 600)
        }
        else if(this.state.set_salt == 0){
            this.props.notify('set a salt', 200)
        }
        else{
            this.props.when_wallet_data_updated(this.state.added_tags, this.state.set_salt, selected_item, false)
            this.props.notify('setting your wallet...', 900)
        }
        
    }


    when_text_input_field_changed(text){
        this.setState({typed_word: text})
    }

    when_add_word_button_tapped(){
        var typed_word = this.state.typed_word.trim();

        if(typed_word == ''){
            this.props.notify('type something', 1400)
        }
        else if(this.hasWhiteSpace(typed_word)){
            this.props.notify('enter one word', 1400)
        }
        else{
            var cloned_seed_array = this.state.added_tags.slice()
            cloned_seed_array.push(typed_word)
            this.setState({added_tags: cloned_seed_array, typed_word:''})
            this.props.notify('word added', 800)
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
        this.props.notify('copied address to clipboard', 600)
    }

    get_account_address(){
        if(this.props.app_state.accounts[this.props.app_state.selected_e5] != null){
            return this.props.app_state.accounts[this.props.app_state.selected_e5].address;
        }
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
                {this.render_detail_item('3', {'title':'Add Contact', 'details':'You can add a contact manually using their Contact ID.', 'size':'l'})}
                <div style={{height: 10}}/>

                <div className="row" style={{width:'103%'}}>
                    <div className="col-9" style={{'margin': '0px 0px 0px 0px'}}>
                        <TextInput height={30} placeholder={'Enter Account ID...'} when_text_input_field_changed={this.when_add_contacts_changed.bind(this)} text={this.state.typed_contact_word} theme={this.props.theme}/>
                    </div>
                    <div className="col-3" style={{'padding': '0px 10px 0px 0px'}} onClick={()=> this.add_cotact_to_list()} >
                        {this.render_detail_item('5',{'text':'Add','action':''})}
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
            this.props.notify('That ID is not valid', 800)
        }
        else if(!this.props.app_state.has_wallet_been_set){
            this.props.notify('please set your wallet first', 1200);
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
                <div style={{overflow: 'auto', maxHeight: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.map((item, index) => (
                            <li style={{'padding': '2px'}} onClick={()=>console.log()}>
                                <div style={{height:60, width:'100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px','padding':'10px 0px 10px 10px', 'max-width':'420px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                                    <div style={{'margin':'10px 20px 10px 0px'}}>
                                        <img src={Letter} style={{height:30 ,width:'auto'}} />
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }else{
            return(
                <div style={{overflow: 'auto', maxHeight: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px', 'listStyle':'none'}}>
                        {items.map((item, index) => (
                            <SwipeableList>
                                <SwipeableListItem
                                    swipeRight={{
                                    content: <div></div>,
                                    action: () => console.log()
                                    }}
                                    swipeLeft={{
                                    content: <div>Delete</div>,
                                    action: () =>this.props.remove_account_from_contacts(item)
                                    }}>
                                    <div style={{width:'100%', 'background-color':this.props.theme['send_receive_ether_background_color']}}>
                                        <li style={{'padding': '2px'}} onClick={()=>this.when_message_clicked(item)}>
                                            {this.render_detail_item('3', {'title':''+item['id'], 'details':''+item['address'], 'size':'s'})}
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
        this.props.notify('copied address to clipboard!', 600)
    }

    copy_id_to_clipboard(text){
        navigator.clipboard.writeText(text)
        this.props.notify('copied id to clipboard!', 600)
    }









    render_blacklisted_section(){
        return(
            <div>
                {this.render_detail_item('3', {'title':'Add Blocked Account', 'details':'Block an accounts content from being visible in your feed.', 'size':'l'})}
                <div style={{height: 10}}/>

                <div className="row" style={{width:'103%'}}>
                    <div className="col-9" style={{'margin': '0px 0px 0px 0px'}}>
                        <TextInput height={30} placeholder={'Enter Account ID...'} when_text_input_field_changed={this.when_add_blocked_account_changed.bind(this)} text={this.state.typed_blocked_account_word} theme={this.props.theme}/>
                    </div>
                    <div className="col-3" style={{'padding': '0px 10px 0px 0px'}} onClick={()=> this.add_blocked_account_to_list()} >
                        {this.render_detail_item('5',{'text':'Add','action':''})}
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
            this.props.notify('That ID is not valid', 1800)
        }
        else if(!this.props.app_state.has_wallet_been_set){
            this.props.notify('please set your wallet first', 2200);
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
                <div style={{overflow: 'auto', maxHeight: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.map((item, index) => (
                            <li style={{'padding': '2px'}} onClick={()=>console.log()}>
                                <div style={{height:60, width:'100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px','padding':'10px 0px 10px 10px', 'max-width':'420px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                                    <div style={{'margin':'10px 20px 10px 0px'}}>
                                        <img src={Letter} style={{height:30 ,width:'auto'}} />
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }else{
            return(
                <div style={{overflow: 'auto', maxHeight: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px', 'listStyle':'none'}}>
                        {items.map((item, index) => (
                            <SwipeableList>
                                <SwipeableListItem
                                    swipeRight={{
                                    content: <div></div>,
                                    action: () => console.log()
                                    }}
                                    swipeLeft={{
                                    content: <div>Delete</div>,
                                    action: () =>this.props.remove_account_from_blocked_accounts(item)
                                    }}>
                                    <div style={{width:'100%', 'background-color':this.props.theme['send_receive_ether_background_color']}}>
                                        <li style={{'padding': '2px'}} onClick={()=>this.when_message_clicked(item)}>
                                            {this.render_detail_item('3', {'title':''+item['id'], 'details':''+item['address'], 'size':'s'})}
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
                {/* {this.render_my_account_id()} */}
                {/* {this.render_detail_item('0')} */}
                <div style={{height:10}}/>
                {this.render_detail_item('3', {'title':'Reserve Alias', 'details':'Reserve an alias for your account ID', 'size':'l'})}
                <div style={{height:10}}/>
                <div className="row" style={{width:'103%'}}>
                    <div className="col-9" style={{'margin': '0px 0px 0px 0px'}}>
                        <TextInput height={30} placeholder={'Enter New Alias Name...'} when_text_input_field_changed={this.when_typed_alias_changed.bind(this)} text={this.state.typed_alias_word} theme={this.props.theme}/>
                    </div>
                    <div className="col-3" style={{'padding': '0px 10px 0px 0px'}} onClick={()=>this.reserve_alias_list()} >
                        {this.render_detail_item('5',{'text':'Reserve','action':''})}
                    </div>
                </div>

                <div style={{height:10}}/>
                {/* {this.render_detail_item('3', {'title':this.state.typed_alias_word, 'details':'Typed Alias', 'size':'l'})} */}
                {this.render_detail_item('10',{'font':'Sans-serif', 'textsize':'10px','text':'remaining character count: '+(this.props.app_state.tag_size - this.state.typed_alias_word.length)})}

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
            if(stack[i].type == 'alias'){
                picked_alias = stack[i].alias
                break;
            }
        }

        if(picked_alias != ''){
            return(
                <div>
                    {this.render_detail_item('3', {'title':picked_alias, 'details':'Stacked Alias', 'size':'l'})}
                </div>
            )
        }
    }

    when_typed_alias_changed(text){
        this.setState({typed_alias_word: text})
    }

    render_my_account_id(){
        // console.log('--------------------render_my_account_id-----------------------')
        // console.log(this.props.app_state.user_account_id)
        // console.log(this.props.app_state.selected_e5)
        var display = this.props.app_state.user_account_id[this.props.app_state.selected_e5] == 1 ? '0000' : this.props.app_state.user_account_id[this.props.app_state.selected_e5]
        
        var alias = (this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[this.props.app_state.user_account_id[this.props.app_state.selected_e5]] == null ? 'Alias Unknown' : this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[this.props.app_state.user_account_id[this.props.app_state.selected_e5]])
        return(
            <div>
                {/* {this.render_detail_item('3', {'title':display, 'details':alias, 'size':'l'})} */}
                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                    {this.render_detail_item('10', {'text':display, 'textsize':'30px', 'font':'Sans-serif'})}
                    <div style={{'padding':'0px 0px 0px 5px'}}>
                        {this.render_detail_item('10', {'text':'Alias: '+alias, 'textsize':'12px', 'font':'Sans-serif'})} 
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
            this.props.notify('type something!', 1400)
        }
        else if(this.hasWhiteSpace(typed_word)){
            this.props.notify('enter one word!', 1400)
        }
        else if(typed_word.length > 23){
            this.props.notify('That alias is too long', 1900)
        }
        else if(typed_word.length < 3){
            this.props.notify('That alias is too short', 1900)
        }
        else if(this.props.app_state.user_account_id[this.props.app_state.selected_e5] < 1000){
            this.props.notify('you need to make at least 1 transaction to reserve an alias', 3200)
        }
        else if(this.get_all_sorted_objects_mappings(this.props.app_state.alias_owners)[typed_word] != null){
            this.props.notify('That alias has already been reserved', 1400)
        }
        else if(this.is_word_reserved(typed_word)){
            this.props.notify('That word is reserved', 2000)
        }
        else{
            this.props.add_alias_transaction_to_stack(this.state.typed_alias_word)
            this.setState({typed_alias_word: ''})
        }
    }

    is_word_reserved(typed_word){
        var obj = ['Unknown', 'Alias Unknown']
        if(obj.includes(typed_word)){
            return true
        }
        return false
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
                <div style={{overflow: 'auto', maxHeight: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.map((item, index) => (
                            <li style={{'padding': '2px'}} onClick={()=>console.log()}>
                                <div style={{height:60, width:'100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px','padding':'10px 0px 10px 10px', 'max-width':'420px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                                    <div style={{'margin':'10px 20px 10px 0px'}}>
                                        <img src={Letter} style={{height:30 ,width:'auto'}} />
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }else{
            return(
                <div style={{overflow: 'auto', maxHeight: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px', 'listStyle':'none'}}>
                        {items.reverse().map((item, index) => (
                            <SwipeableList>
                                <SwipeableListItem
                                    swipeRight={{
                                    content: <div>Set Alias</div>,
                                    action: () => this.reset_alias(item)
                                    }}
                                    swipeLeft={{
                                    content: <div>Release</div>,
                                    action: () =>this.unreserve_alias(item)
                                    }}>
                                    <div style={{width:'100%', 'background-color':this.props.theme['send_receive_ether_background_color']}}>
                                        <li style={{'padding': '2px'}} onClick={()=> console.log()}>
                                            {this.render_detail_item('3', {'title':''+item['alias'], 'details':'Reserved '+this.get_time_difference(item['event'].returnValues.p6)+' ago', 'size':'s'})}
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



    








    /* renders the specific element in the post or detail object */
    render_detail_item(item_id, object_data){
        return(
            <div>
                <ViewGroups item_id={item_id} object_data={object_data} theme={this.props.theme} when_add_word_button_tapped={this.when_add_word_button_tapped.bind(this)} delete_entered_seed_word={this.delete_entered_seed_word.bind(this)} when_set_wallet_button_tapped={this.when_set_wallet_button_tapped.bind(this)}/>
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
            return num + ' yr' + s;
        }
    }

    format_proportion(proportion){
        return ((proportion/10**18) * 100)+'%';
    }



}




export default StackPage;