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
import NumberPicker from './../components/number_picker';
import { SwipeableList, SwipeableListItem } from '@sandstreamdev/react-swipeable-list';
import '@sandstreamdev/react-swipeable-list/dist/styles.css';

import EndImg from './../assets/end_token_icon.png';

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

class DialerPage extends Component {
    
    state = {
        selected: 0, id: makeid(8), type:'admin', e5:this.props.app_state.selected_e5,entered_indexing_tags:['dialer', 'admin', 'update'],

        get_title_tags_object: this.get_title_tags_object(),
        typed_country_name:'', data:null, get_logo_title_tags_object:this.get_logo_title_tags_object(),
        typed_dark_emblem_country_name:'', selected_dark_emblem_country:'', 
        
        get_theme_stage_tags_object:this.get_theme_stage_tags_object(), get_content_channeling_tags_object:this.get_content_channeling_tags_object(),

        typed_beacon_chain_url:'', editing_e5_item: '', 
        
        typed_e5_id:'', typed_symbol_id:'', typed_token_name:'', typed_rpc_url:'', added_rpc_urls:[], typed_e5_address:'', get_e5_image_setting_tags_object:this.get_e5_image_setting_tags_object(), end_image:'', spend_image:'', e5_image:'', ether_image:'', get_e5_active_setting_object:this.get_e5_active_setting_object(false), power_limit:'', get_ether_disabled_setting_object:this.get_ether_disabled_setting_object(false), typed_first_block:'', typed_iteration:'',

        get_ether_list_sort_order_object:this.get_ether_list_sort_order_object(), picked_translation_object:{}, add_translation_language:'', override_object:{}, typed_language:'', typed_language_override_url:'', typed_language_url:'', 
        
        typed_spend_country_name: '', spend_exchange_allowed_countries:[], get_e5_public_enabled_tags_object:this.get_e5_public_enabled_tags_object(false), typed_dialer_address:'',

        get_theme_images_tags_object:this.get_theme_images_tags_object(), typed_image_link:'',
        get_line_setting_object:this.get_line_setting_object(), typed_blockexplorer_link:'',

        get_available_for_all_tags_object:this.get_available_for_all_tags_object(),
        get_audio_video_recommendation_threshold_setting_object:this.get_audio_video_recommendation_threshold_setting_object(),
        get_custom_background_images_object:this.get_custom_background_images_object(),
    };


    get_title_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e', 'admin-stuff', 'e5-stuff'], [1]
            ],
        };
    }

    get_logo_title_tags_object(){
        const logo_title = this.props.app_state.logo_title
        var pos = ['e', 'start-white', 'crack-stage-0', 'crack-stage-1', 'crack-stage-2', 'crack-stage-3', 'crack-stage-4', 'crack-stage-5', 'E5'].indexOf(logo_title)
        if(pos == -1) pos = 1
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e', 'start-white', 'crack-stage-0', 'crack-stage-1', 'crack-stage-2', 'crack-stage-3', 'crack-stage-4', 'crack-stage-5', 'E5'], [pos]
            ],
        };
    }

    get_theme_stage_tags_object(){
        const get_theme_stage_tags_object = this.props.app_state.get_theme_stage_tags_object
        var pos = ['e', 'none', 'darkcolor-available', 'lightcolor-available', 'all-available'].indexOf(get_theme_stage_tags_object)
        if(pos == -1) pos = 1
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e', 'none', 'darkcolor-available', 'lightcolor-available', 'all-available'], [pos]
            ],
        };
    }

    get_content_channeling_tags_object(){
        const get_content_channeling_tags_object = this.props.app_state.get_content_channeling_tags_object
        var pos = ['e', 'local-only', 'local-language', 'all'].indexOf(get_content_channeling_tags_object)
        if(pos == -1) pos = 1
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e', 'local-only', 'local-language', 'all'], [pos]
            ],
        };
    }

    get_e5_image_setting_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e', 'end_image', 'spend_image', 'e5_image', 'ether_image'], [1]
            ],
        };
    }

    get_e5_active_setting_object(active){
        var n = active == true ? 1 : 0
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['or','',0], ['e', 'active'], [n]
            ],
        };
    }

    get_ether_disabled_setting_object(disabled){
        var n = disabled == true ? 1 : 0
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['or','',0], ['e', 'disabled'], [n]
            ],
        };
    }

    get_ether_list_sort_order_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e', 'E5-ID', 'Ticker'], [1]
            ],
        };
    }

    get_e5_public_enabled_tags_object(enabled){
        var n = enabled == true ? 1 : 0
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['or','',0], ['e', 'public-enabled'], [n]
            ],
        };
    }

    get_theme_images_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e', this.props.app_state.loc['2741']/* green */,this.props.app_state.loc['3056']/* 'light-green' */, this.props.app_state.loc['3057']/* 'red' */,this.props.app_state.loc['3058']/* 'light-red' */, this.props.app_state.loc['3059']/* 'blue' */,this.props.app_state.loc['3060']/* 'light-blue' */, this.props.app_state.loc['3061']/* 'yellow' */,this.props.app_state.loc['3062']/* 'light-yellow' */,  this.props.app_state.loc['3063']/* 'pink' */,this.props.app_state.loc['3064']/* 'light-pink' */,  this.props.app_state.loc['3065']/* 'orange' */, this.props.app_state.loc['3066']/* 'light-orange' */], [1]
            ],
        };
    }

    get_line_setting_object(){
        const line_setting = this.props.app_state.line_setting
        var pos = ['e', 'enabled'].indexOf(line_setting)
        if(pos == -1) pos = 0
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['or','',0], ['e', 'enabled'], [pos]
            ],
        };
    }

    get_available_for_all_tags_object(){
        const get_available_for_all_tags_object = this.props.app_state.get_available_for_all_tags_object
        var pos = ['e', 'enabled'].indexOf(get_available_for_all_tags_object)
        if(pos == -1) pos = 1
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['or','',0], ['e', 'enabled'], [pos]
            ],
        };
    }

    get_audio_video_recommendation_threshold_setting_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e', 'videopost_threshold', 'video_threshold', 'audiopost_threshold', 'audio_threshold'], [1]
            ],
        };
    }

    get_custom_background_images_object(){
        const theme_images_enabled = this.props.app_state.theme_images_enabled
        var pos = ['e', 'enabled'].indexOf(theme_images_enabled)
        if(pos == -1) pos = 0
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['or','',0], ['e', 'enabled'], [0]
            ],
        };
    }







    set_data(data){
        this.setState({data: data})
    }





    render(){
        return(
            <div style={{'padding':'10px 15px 0px 15px'}}>

                <div className="row" style={{'width':'102%'}}>
                    <div className="col-11" style={{'padding': '0px 0px 0px 10px'}}>
                        <Tags font={this.props.app_state.font} page_tags_object={this.state.get_title_tags_object} tag_size={'l'} when_tags_updated={this.when_get_title_tags_object_updated.bind(this)} theme={this.props.theme}/>
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

    when_get_title_tags_object_updated(tag_obj){
        this.setState({get_title_tags_object: tag_obj})
    }

    render_everything(){
        if(this.state.data == null) return;
        var selected_item = this.get_selected_item(this.state.get_title_tags_object, this.state.get_title_tags_object['i'].active)

        if(selected_item == 'admin-stuff'){
            return(
                <div>
                    {this.render_admin_stuff()}
                </div>
            )
        }
        else if(selected_item == 'e5-stuff'){
            return(
                <div>
                    {this.render_e5_stuff()}
                </div>
            )
        }
    }

    render_admin_stuff(){
        var size = this.props.app_state.size
        if(size == 's'){
            return(
                <div>
                    {this.render_admin_content()}
                    {this.render_detail_item('0')}
                    {this.render_admin_content2()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_admin_content()}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_admin_content2()}
                    </div>
                </div>
                
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_admin_content()}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_admin_content2()}
                    </div>
                </div>
            )
        }
    }



    render_admin_content(){
        return(
            <div>
                {this.render_detail_item('4', {'text':'Change the countries that can access E5. Tap a country to add or remove from accessible list.', 'textsize':'14px', 'font':this.props.app_state.font})}
                <div style={{height:10}}/>
                <TextInput height={30} placeholder={'Search filter country'} when_text_input_field_changed={this.when_country_input_field_changed.bind(this)} text={this.state.typed_country_name} theme={this.props.theme}/>
                <div style={{height:5}}/>
                {this.render_detail_item('1',{'active_tags':this.get_countries_from_typed_text(), 'indexed_option':'indexed', 'when_tapped':'when_dialer_country_selected'})}
                <div style={{height:15}}/>
                {this.render_detail_item('4', {'text':'Tap a country to remove from accessible list.', 'textsize':'14px', 'font':this.props.app_state.font})}
                <div style={{height:5}}/>
                {this.render_detail_item('1',{'active_tags':this.get_included_countries_from_typed_text(), 'indexed_option':'indexed', 'when_tapped':'when_dialer_included_country_selected'})}

                {this.render_detail_item('0')}

                {this.render_detail_item('4', {'text':'Set the default logo to display for every page viewer.', 'textsize':'14px', 'font':this.props.app_state.font})}
                <div style={{height:10}}/>
                <Tags font={this.props.app_state.font} page_tags_object={this.state.get_logo_title_tags_object} tag_size={'l'} when_tags_updated={this.when_get_logo_title_tags_object_updated.bind(this)} theme={this.props.theme}/>
                
                {this.render_detail_item('0')}

                {this.render_detail_item('4', {'text':'Set the dark logo location.', 'textsize':'14px', 'font':this.props.app_state.font})}
                <div style={{height:10}}/>
                <TextInput height={30} placeholder={'Search filter country'} when_text_input_field_changed={this.when_dark_emblem_country_input_field_changed.bind(this)} text={this.state.typed_dark_emblem_country_name} theme={this.props.theme}/>
                <div style={{height:10}}/>
                {this.render_detail_item('1',{'active_tags':this.get_included_dark_emblem_countries_from_typed_text(), 'indexed_option':'indexed', 'when_tapped':'when_dialer_dark_emblem_country_selected'})}
                <div style={{height:10}}/>
                {this.render_detail_item('4', {'text':this.state.selected_dark_emblem_country, 'textsize':'14px', 'font':this.props.app_state.font})}

                {this.render_detail_item('0')}

                {this.render_detail_item('4', {'text':'Set the theme stage.', 'textsize':'14px', 'font':this.props.app_state.font})}
                <div style={{height:10}}/>
                <Tags font={this.props.app_state.font} page_tags_object={this.state.get_theme_stage_tags_object} tag_size={'l'} when_tags_updated={this.when_get_theme_stage_tags_object_updated.bind(this)} theme={this.props.theme}/>

                {this.render_detail_item('0')}

                {this.render_detail_item('4', {'text':'Set the content channelling stage', 'textsize':'14px', 'font':this.props.app_state.font})}
                <div style={{height:10}}/>
                <Tags font={this.props.app_state.font} page_tags_object={this.state.get_content_channeling_tags_object} tag_size={'l'} when_tags_updated={this.when_get_content_channeling_tags_object_updated.bind(this)} theme={this.props.theme}/>

                {this.render_detail_item('0')}


                {this.render_detail_item('4', {'text':'Add or remove a dialer address', 'textsize':'14px', 'font':this.props.app_state.font})}
                <div style={{height:10}}/>
                <div className="row" style={{width:'100%'}}>
                    <div className="col-11" style={{'margin': '0px 0px 0px 0px'}}>
                        <TextInput height={60} placeholder={'Enter address here...'} when_text_input_field_changed={this.when_typed_dialer_address_input_field_changed.bind(this)} text={this.state.typed_dialer_address} theme={this.props.theme}/>
                    </div>
                    <div className="col-1" style={{'padding': '0px 10px 0px 0px'}} onClick={()=> this.add_dialer_address()}>
                        <div className="text-end" style={{'padding': '5px 0px 0px 0px'}} >
                            <img alt="" className="text-end" src={this.props.theme['add_text']} style={{height:37, width:'auto'}} />
                        </div>
                    </div>
                </div>
                <div style={{height:10}}/>
                {this.render_dialer_addresses_horizontal()}


                {this.render_detail_item('0')}
                {this.render_detail_item('4', {'text':'Set the threshold for each recommendation instance.', 'textsize':'14px', 'font':this.props.app_state.font})}
                <div style={{height:10}}/>

                <Tags font={this.props.app_state.font} page_tags_object={this.state.get_audio_video_recommendation_threshold_setting_object} tag_size={'l'} when_tags_updated={this.when_get_audio_video_recommendation_threshold_setting_object_updated.bind(this)} theme={this.props.theme}/>
                <div style={{height:10}}/>

                <TextInput height={30} placeholder={'Enter value here...'} when_text_input_field_changed={this.when_audio_video_threshold_value_changed.bind(this)} text={this.get_audio_video_threshold_value()} theme={this.props.theme}/>
            </div>
        )
    }

    render_admin_content2(){
        return(
            <div>
                {this.render_detail_item('4', {'text':'Beacon node url.', 'textsize':'14px', 'font':this.props.app_state.font})}
                <div style={{height:10}}/>
                <div className="row" style={{width:'100%'}}>
                    <div className="col-11" style={{'margin': '0px 0px 0px 0px'}}>
                        <TextInput height={30} placeholder={'Enter url here...'} when_text_input_field_changed={this.when_typed_beacon_chain_url_input_field_changed.bind(this)} text={this.state.typed_beacon_chain_url} theme={this.props.theme}/>
                    </div>
                    <div className="col-1" style={{'padding': '0px 10px 0px 0px'}} onClick={()=> this.add_beacon_chain_url()}>
                        <div className="text-end" style={{'padding': '5px 0px 0px 0px'}} >
                            <img alt="" className="text-end" src={this.props.theme['add_text']} style={{height:37, width:'auto'}} />
                        </div>
                    </div>
                </div>
                <div style={{height:10}}/>
                {this.render_detail_item('4', {'text':this.state.data['beacon_chain_url'], 'textsize':'14px', 'font':this.props.app_state.font})}
                

                {this.render_detail_item('0')}


                {this.render_detail_item('4', {'text':'Add or remove a translation object.', 'textsize':'14px', 'font':this.props.app_state.font})}
                <div style={{height:10}}/>

                <TextInput height={30} placeholder={'Search filter language.'} when_text_input_field_changed={this.when_typed_language_input_field_changed.bind(this)} text={this.state.typed_language} theme={this.props.theme}/>
                <div style={{height:10}}/>
                
                {this.render_detail_item('1',{'active_tags':this.get_specified_languages(), 'indexed_option':'indexed', 'when_tapped':'when_add_translation_language_tapped'})}
                <div style={{height:10}}/>

                {this.render_detail_item('4', {'text':this.state.add_translation_language, 'textsize':'14px', 'font':this.props.app_state.font})}

                <div style={{height:20}}/>
                <div className="row" style={{width:'100%'}}>
                    <div className="col-11" style={{'margin': '0px 0px 0px 0px'}}>
                        <TextInput height={30} placeholder={'Url for language object'} when_text_input_field_changed={this.when_typed_language_url_input_field_changed.bind(this)} text={this.state.typed_language_url} theme={this.props.theme}/>
                    </div>
                    <div className="col-1" style={{'padding': '0px 10px 0px 0px'}} onClick={()=> this.test_typed_language_url()}>
                        <div className="text-end" style={{'padding': '5px 0px 0px 0px'}} >
                            <img alt="" className="text-end" src={this.props.theme['add_text']} style={{height:37, width:'auto'}} />
                        </div>
                    </div>
                </div>
                <div style={{height:10}}/>
                <div onClick={()=> this.add_or_edit_language_link()}>
                    {this.render_detail_item('5', {'text':'Add/Change language', 'action':''})}
                </div>
                <div style={{height:10}}/>

                {this.render_added_languages()}


                {this.render_detail_item('0')}
                {this.render_detail_item('4', {'text':'Tranlsation Override link', 'textsize':'14px', 'font':this.props.app_state.font})}
                <div style={{height:10}}/>

                <TextInput height={30} placeholder={'Url for override file'} when_text_input_field_changed={this.when_typed_language_override_url_input_field_changed.bind(this)} text={this.state.typed_language_override_url} theme={this.props.theme}/>
                <div style={{height:10}}/>

                <div onClick={()=> this.add_or_edit_language_override_link()}>
                    {this.render_detail_item('5', {'text':'Add/Change language override', 'action':''})}
                </div>


                {this.render_detail_item('0')}


                {this.render_detail_item('4', {'text':'Add or remove a theme image', 'textsize':'14px', 'font':this.props.app_state.font})}
                <div style={{height:10}}/>
                <Tags font={this.props.app_state.font} page_tags_object={this.state.get_theme_images_tags_object} tag_size={'l'} when_tags_updated={this.when_get_theme_images_tags_object_updated.bind(this)} theme={this.props.theme}/>

                <div style={{height:10}}/>
                <div className="row" style={{width:'100%'}}>
                    <div className="col-11" style={{'margin': '0px 0px 0px 0px'}}>
                        <TextInput height={60} placeholder={'Enter link to image here...'} when_text_input_field_changed={this.when_typed_image_link_input_field_changed.bind(this)} text={this.state.typed_image_link} theme={this.props.theme}/>
                    </div>
                    <div className="col-1" style={{'padding': '0px 10px 0px 0px'}} onClick={()=> this.add_theme_image()}>
                        <div className="text-end" style={{'padding': '5px 0px 0px 0px'}} >
                            <img alt="" className="text-end" src={this.props.theme['add_text']} style={{height:37, width:'auto'}} />
                        </div>
                    </div>
                </div>
                <div style={{height:10}}/>
                {this.render_theme_images_horizontal()}


                {this.render_detail_item('0')}
                {this.render_detail_item('4', {'text':'Enable or disable the line showing traffic distribution among colors.', 'textsize':'14px', 'font':this.props.app_state.font})}
                <div style={{height:10}}/>
                <Tags font={this.props.app_state.font} page_tags_object={this.state.get_line_setting_object} tag_size={'l'} when_tags_updated={this.when_get_line_setting_object_updated.bind(this)} theme={this.props.theme}/>
                


                
                {this.render_detail_item('0')}
                {this.render_detail_item('4', {'text':'Enable access for all countries.', 'textsize':'14px', 'font':this.props.app_state.font})}
                <div style={{height:10}}/>
                <Tags font={this.props.app_state.font} page_tags_object={this.state.get_available_for_all_tags_object} tag_size={'l'} when_tags_updated={this.when_get_available_for_all_tags_object.bind(this)} theme={this.props.theme}/>


                {this.render_detail_item('0')}
                {this.render_detail_item('4', {'text':'Enable custom theme image background settings.', 'textsize':'14px', 'font':this.props.app_state.font})}
                <div style={{height:10}}/>
                <Tags font={this.props.app_state.font} page_tags_object={this.state.get_custom_background_images_object} tag_size={'l'} when_tags_updated={this.when_get_custom_background_images_object.bind(this)} theme={this.props.theme}/>
                
            </div>
        )
    }

    when_country_input_field_changed(country_name){
        this.setState({typed_country_name: country_name})
    }

    get_countries_from_typed_text(){
        var selected_countries = []
        var all_countries = this.state.data['country_data']
        var typed_text = this.state.typed_country_name
        var already_included_countries = this.state.data['allowed_countries'].map(e => e.toLowerCase())

        if(typed_text != ''){
            selected_countries = all_countries.filter(function (el) {
                return (el['name'].toLowerCase().includes(typed_text.toLowerCase())) && 
                !already_included_countries.includes(el['name'].toLowerCase())
            });
        }else{
            selected_countries = all_countries.filter(function (el) {
                return (!already_included_countries.includes(el['name'].toLowerCase()))
            });
        }

        var selected = []
        var l = selected_countries.length > 7 ? 7 : selected_countries.length
        for(var i=0; i<l; i++){
            selected.push(selected_countries[i]['name'])
        }
        return selected;
    }

    when_dialer_country_selected(tag, pos){
        if(tag != 'e'){
            var clone = structuredClone(this.state.data)
            clone['allowed_countries'].push(tag)
            this.setState({data: clone, typed_country_name:''})
        }
    }

    get_included_countries_from_typed_text(){
        var selected_countries = []
        var all_countries = this.state.data['allowed_countries']
        var typed_text = this.state.typed_country_name

        if(typed_text != ''){
            selected_countries = all_countries.filter(function (el) {
                return (el.toLowerCase().startsWith(typed_text.toLowerCase()))
            });
        }else{
            selected_countries = all_countries.filter(function (el) {
                return (true)
            });
        }

        return selected_countries
    }

    when_dialer_included_country_selected(tag, pos){
        if(tag != 'e'){
            var clone = structuredClone(this.state.data)
            var index = clone['allowed_countries'].indexOf(tag)
            if(index != -1){
                clone['allowed_countries'].splice(index, 1)
            }
            this.setState({data: clone, typed_country_name:''})
        }
    }


    when_get_logo_title_tags_object_updated(tag_obj){
        this.setState({get_logo_title_tags_object: tag_obj})
    }


    when_dark_emblem_country_input_field_changed(text){
        this.setState({typed_dark_emblem_country_name: text})
    }

    get_included_dark_emblem_countries_from_typed_text(){
        var selected_countries = []
        var all_countries = this.state.data['country_data']
        var typed_text = this.state.typed_dark_emblem_country_name

        if(typed_text != ''){
            selected_countries = all_countries.filter(function (el) {
                return (el['name'].toLowerCase().startsWith(typed_text.toLowerCase()) || el['code'] == typed_text.toUpperCase())
            });
        }else{
            selected_countries = all_countries.filter(function (el) {
                return (true)
            });
        }

        var selected = []
        var l = selected_countries.length > 7 ? 7 : selected_countries.length
        for(var i=0; i<l; i++){
            selected.push(selected_countries[i]['name'])
        }
        return selected;
    }

    when_dialer_dark_emblem_country_selected(tag, pos){
        if(tag != 'e'){
            if(this.state.selected_dark_emblem_country == tag){
                this.setState({selected_dark_emblem_country: ''})
            }else{
                this.setState({selected_dark_emblem_country: tag, typed_dark_emblem_country_name:''})
            }   
        }
    }


    when_get_theme_stage_tags_object_updated(tag_obj){
        this.setState({get_theme_stage_tags_object: tag_obj})
    }


    when_get_content_channeling_tags_object_updated(tag_obj){
        this.setState({get_content_channeling_tags_object: tag_obj})
    }


    when_typed_beacon_chain_url_input_field_changed(text){
        this.setState({typed_beacon_chain_url: text})
    }

    add_beacon_chain_url(){
        var typed_beacon_chain_url = this.state.typed_beacon_chain_url

        if(!this.isValidHttpUrl(typed_beacon_chain_url)){
            this.props.notify('that url is invalid', 5000)
            return;
        }

        var clone = structuredClone(this.state.data)
        clone['beacon_chain_url'] = typed_beacon_chain_url
        this.setState({data: clone})
    }

    isValidHttpUrl(string) {
        let url;
        
        try {
            url = new URL(string);
        } catch (_) {
            return false;  
        }

        return url.protocol == "http:" || url.protocol == "https:" || url.protocol == "wss:";
    }

    

    when_typed_language_input_field_changed(text){
        this.setState({typed_language: text})
    }

    get_specified_languages(){
        var selected_languages = []
        var data = this.props.app_state.language_data
        var typed_text = this.state.typed_language

        var all_languages = []
        for (const language_code in data) {
            if (data.hasOwnProperty(language_code)) {
                all_languages.push(data[language_code])
            }
        }

        if(typed_text != ''){
            selected_languages = all_languages.filter(function (el) {
                return (el['name'].toLowerCase().includes(typed_text.toLowerCase()))
            });
        }else{
            selected_languages = all_languages.filter(function (el) {
                return true
            });
        }

        var selected = []
        var l = selected_languages.length > 7 ? 7 : selected_languages.length
        for(var i=0; i<l; i++){
            selected.push(selected_languages[i]['name'])
        }
        return selected;
    }

    when_add_translation_language_tapped(tag, pos){
       if(tag != 'e'){
            if(this.state.add_translation_language == tag){
                this.setState({add_translation_language: ''})
            }else{
                this.setState({add_translation_language: tag, typed_language:''})
            }   
        }
    }



    when_typed_language_url_input_field_changed(text){
        this.setState({typed_language_url: text})
    }

    test_typed_language_url(){
        var typed_url = this.state.typed_language_url
        var add_translation_language = this.state.add_translation_language
        if(typed_url == ''){
            this.props.notify('type a url first', 5000)
        }
        else if(add_translation_language == ''){
            this.props.notify('first set a translation language', 5000)
        }
        else if(!this.isValidHttpUrl(typed_url)){
            this.props.notify('that url is invalid', 5000)
        }
        else{
            this.props.test_entered_link_data(typed_url, add_translation_language)
        }
    }

    add_or_edit_language_link(){
        var typed_url = this.state.typed_language_url
        var add_translation_language = this.state.add_translation_language
        if(typed_url == ''){
            this.props.notify('type a url first', 5000)
        }
        else if(add_translation_language == ''){
            this.props.notify('first set a translation language', 5000)
        }
        else if(!this.isValidHttpUrl(typed_url)){
            this.props.notify('that url is invalid', 5000)
        }
        else{
            var language_id = this.find_language_id_from_name(add_translation_language)
            if(this.props.app_state.loaded_language_object == null || this.props.app_state.loaded_language_object['0'] != language_id){
                this.props.notify('You need to first test the link you set.', 5000)
            }else{
                var clone = structuredClone(this.state.data)
                clone['all_locales'][language_id] = typed_url
                this.setState({data: clone})
                this.props.notify(`${add_translation_language} added.`, 2000)
            }
        }
    }

    find_language_id_from_name(name){
        var data = this.props.app_state.language_data
        for (const language_code in data) {
            if (data.hasOwnProperty(language_code) && data[language_code]['name'] == name) {
                return language_code
            }
        }
    }

    get_language_name_from_id(id){
        var language_data = this.props.app_state.language_data
        return language_data[id] == null ? 'Unknown' : language_data[id]['name']
    }

    render_added_languages(){
        var items = []
        var data = this.state.data['all_locales']
        for (const language_code in data) {
            if (data.hasOwnProperty(language_code)) {
                items.push(language_code)
            }
        }
        items = [].concat(items)
        if(items.length == 0){
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
            return(
                <div style={{'margin':'3px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                    <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                        {items.map((item, index) => (
                            <li style={{'display': 'inline-block', 'margin': '0px 2px 1px 2px', '-ms-overflow-style':'none'}} onClick={() => this.delete_language_url(item)}>
                                {this.render_detail_item('3', {'title':this.get_language_name_from_id(item), 'details':item, 'size':'l'})}
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
        // if(items.length == 0){
        //     items = [0, 0]
        //     return(
        //         <div style={{}}>
        //             <ul style={{ 'padding': '0px 0px 0px 0px'}}>
        //                 {items.map((item, index) => (
        //                     <li style={{'padding': '2px'}} onClick={()=>console.log()}>
        //                         <div style={{height:60, width:'100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px','padding':'10px 0px 10px 10px', 'max-width':'420px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
        //                             <div style={{'margin':'10px 20px 10px 0px'}}>
        //                                 <img alt="" src={this.props.app_state.theme['letter']} style={{height:30 ,width:'auto'}} />
        //                             </div>
        //                         </div>
        //                     </li>
        //                 ))}
        //             </ul>
        //         </div>
        //     )
        // }else{
        //     return(
        //         <div style={{}}>
        //             <ul style={{ 'padding': '0px 0px 0px 0px', 'listStyle':'none'}}>
        //                 {items.map((item, index) => (
        //                     <SwipeableList>
        //                         <SwipeableListItem
        //                             swipeLeft={{
        //                             content: <p style={{'color': this.props.theme['primary_text_color']}}>{this.props.app_state.loc['2751']/* Delete */}</p>,
        //                             action: () =>this.delete_language_url(item)
        //                             }}>
        //                             <div style={{width:'100%', 'background-color':this.props.theme['send_receive_ether_background_color']}}>
        //                                 <li style={{'padding': '2px'}}>
        //                                     {this.render_detail_item('3', {'title':this.get_language_name_from_id(item), 'details':item, 'size':'l'})}
        //                                 </li>
        //                             </div>
        //                         </SwipeableListItem>
        //                     </SwipeableList>
                            
        //                 ))}
        //             </ul>
        //         </div>
        //     )
        // }
    }

    delete_language_url(language_id){
        if(language_id == 'en'){
            this.props.notify('You cant delete english', 5000)
            return
        }
        var clone = structuredClone(this.state.data)
        delete clone['all_locales'][language_id]
        this.setState({data: clone})
    }



    when_typed_language_override_url_input_field_changed(text){
        this.setState({typed_language_override_url: text})
    }

    add_or_edit_language_override_link = async () => {
        var typed_language_override_url = this.state.typed_language_override_url
        if(typed_language_override_url == ''){
            this.props.notify('type a url first', 5000)
        }
        else if(!this.isValidHttpUrl(typed_language_override_url)){
            this.props.notify('that url is not valid', 5000)
        }
        else{
            var obj = await this.props.test_and_return_language_override_data(typed_language_override_url)
            this.setState({override_object: obj})
        }
    }



    when_typed_dialer_address_input_field_changed(text){
        this.setState({typed_dialer_address: text})
    }

    add_dialer_address(){
        var address = this.state.typed_dialer_address

        if(address == ''){
            this.props.notify('type something first', 4000)
        }
        else if(!this.props.is_valid_ether_address(address)){
            this.props.notify('that ether address is invalid', 4000)
        }
        else{
            var clone = structuredClone(this.state.data)
            clone['dialer_addresses'].push(address)
            this.setState({data: clone, typed_dialer_address:''})
            this.props.notify('Address added', 2000)
        }
    }

    render_dialer_addresses_horizontal(){
        var items = this.state.data['dialer_addresses']
        if(items.length == 0){
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
            return(
                <div style={{'margin':'3px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                    <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                        {items.map((item, index) => (
                            <li style={{'display': 'inline-block', 'margin': '0px 2px 1px 2px', '-ms-overflow-style':'none'}} onClick={() => this.delete_dialer_address(index)}>
                                {this.render_detail_item('4', {'text':start_and_end(item), 'textsize':'13px', 'font':this.props.app_state.font})}
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
    }

    delete_dialer_address(index){
        var clone = structuredClone(this.state.data)
        clone['dialer_addresses'].splice(index, 1)
        this.setState({data: clone})
        this.props.notify('Address deleted', 2000)
    }




    when_get_theme_images_tags_object_updated(tag_obj){
        this.setState({get_theme_images_tags_object:tag_obj})
    }

    when_typed_image_link_input_field_changed(text){
        this.setState({typed_image_link: text})
    }

    add_theme_image(){
        var link = this.state.typed_image_link
        var selected_theme = this.get_selected_item(this.state.get_theme_images_tags_object, 'e')

        if(link == ''){
            this.props.notify('type something', 4000)
        }
        else if(!this.isValidHttpUrl(link)){
            this.props.notify('that image link isnt valid', 4000)
        }
        else{
            var clone = structuredClone(this.state.data)
            if(clone['theme_images'][selected_theme] == null) clone['theme_images'][selected_theme] = [];
            clone['theme_images'][selected_theme].push(link)
            this.setState({data: clone, typed_image_link:''})
        }
    }

    render_theme_images_horizontal(){
        var selected_theme = this.get_selected_item(this.state.get_theme_images_tags_object, 'e')
        var items = this.state.data['theme_images'][selected_theme]
        if(items == null) items = [];

        if(items.length == 0){
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
            return(
                <div style={{'margin':'3px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                    <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                        {items.map((item, index) => (
                            <li style={{'display': 'inline-block', 'margin': '0px 2px 1px 2px', '-ms-overflow-style':'none'}} onClick={() => this.delete_image(index)}>
                                <img alt="" src={item} style={{height:70 ,width:'auto', 'border-radius':'8px'}} />
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
    }

    render_empty_horizontal_list_item3(){
        var background_color = this.props.theme['view_group_card_item_background']
        return(
            <div>
                <div style={{height:70, width:140, 'background-color': background_color, 'border-radius': '8px','padding':'10px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                    <div style={{'margin':'0px 0px 0px 0px'}}>
                        <img alt="" src={this.props.app_state.theme['letter']} style={{height:35 ,width:'auto'}} />
                    </div>
                </div>
            </div>
        )
    }

    delete_image(index){
        var selected_theme = this.get_selected_item(this.state.get_theme_images_tags_object, 'e')
        var clone = structuredClone(this.state.data)
        clone['theme_images'][selected_theme].splice(index, 1)
        this.setState({data: clone})
        this.props.notify('Image deleted', 2000)
    }


    when_get_line_setting_object_updated(tag_obj){
        this.setState({get_line_setting_object: tag_obj})
    }


    when_get_available_for_all_tags_object(tag_obj){
        this.setState({get_available_for_all_tags_object: tag_obj})
    }


    when_get_audio_video_recommendation_threshold_setting_object_updated(tag_obj){
        this.setState({get_audio_video_recommendation_threshold_setting_object: tag_obj})
    }

    get_audio_video_threshold_value(){
        var selected_item = this.get_selected_item(this.state.get_audio_video_recommendation_threshold_setting_object, 'e')

        if(selected_item == 'videopost_threshold'){
            return this.state.data['recommended_videopost_threshold']
        }
        else if(selected_item == 'video_threshold'){
            return this.state.data['recommended_video_threshold']
        }
        else if(selected_item == 'audiopost_threshold'){
            return this.state.data['recommended_audiopost_threshold']
        }
        else if(selected_item == 'audio_threshold'){
            return this.state.data['recommended_audio_threshold']
        }
    }

    when_audio_video_threshold_value_changed(text){
        if(!isNaN(text)){
            var value = parseInt(text)
            var clone = structuredClone(this.state.data)

            var selected_item = this.get_selected_item(this.state.get_audio_video_recommendation_threshold_setting_object, 'e')

            if(selected_item == 'videopost_threshold'){
                clone['recommended_videopost_threshold'] = value
            }
            else if(selected_item == 'video_threshold'){
                clone['recommended_video_threshold'] = value
            }
            else if(selected_item == 'audiopost_threshold'){
                clone['recommended_audiopost_threshold'] = value
            }
            else if(selected_item == 'audio_threshold'){
                clone['recommended_audio_threshold'] = value
            }

            this.setState({data: clone})
        }
    }

    when_get_custom_background_images_object(tag_obj){
        this.setState({get_custom_background_images_object: tag_obj})
    }



    




    render_e5_stuff(){
        var size = this.props.app_state.size
        if(size == 's'){
            return(
                <div>
                    {this.render_e5_content()}
                    {this.render_detail_item('0')}
                    {this.render_e5_content2()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_e5_content()}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_e5_content2()}
                    </div>
                </div>
                
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_e5_content()}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_e5_content2()}
                    </div>
                </div>
            )
        }
    }

    render_e5_content(){
        return(
            <div>
                {this.render_detail_item('4', {'text':'Add or edit a new ether and its respective E5.', 'textsize':'14px', 'font':this.props.app_state.font})}
                <div style={{height:10}}/>
                <Tags font={this.props.app_state.font} page_tags_object={this.state.get_ether_list_sort_order_object} tag_size={'l'} when_tags_updated={this.when_get_ether_list_sort_order_object_updated.bind(this)} theme={this.props.theme}/>

                {this.render_my_balances_horizontal()}
                <div style={{height:30}}/>


                {this.render_detail_item('4', {'text':'Set the ether E5 below', 'textsize':'14px', 'font':this.props.app_state.font})}
                <div style={{height:10}}/>

                <TextInput height={30} placeholder={'Enter ether E5 id here'} when_text_input_field_changed={this.when_typed_e5_id_input_field_changed.bind(this)} text={this.state.typed_e5_id} theme={this.props.theme}/>
                {this.render_detail_item('0')}



                {this.render_detail_item('4', {'text':'Set the ether symbol below.', 'textsize':'14px', 'font':this.props.app_state.font})}
                <div style={{height:10}}/>

                <TextInput height={30} placeholder={'Enter ether symbol here'} when_text_input_field_changed={this.when_typed_symbol_id_input_field_changed.bind(this)} text={this.state.typed_symbol_id} theme={this.props.theme}/>
                {this.render_detail_item('0')}



                {this.render_detail_item('4', {'text':'Set the ether name below', 'textsize':'14px', 'font':this.props.app_state.font})}
                <div style={{height:10}}/>

                <TextInput height={30} placeholder={'Enter token name here'} when_text_input_field_changed={this.when_typed_token_name_input_field_changed.bind(this)} text={this.state.typed_token_name} theme={this.props.theme}/>
                {this.render_detail_item('0')}



                {this.render_detail_item('4', {'text':'Set the ethers blockexplorer link. Set {hash} where the transaction hash is to be placed', 'textsize':'14px', 'font':this.props.app_state.font})}
                <div style={{height:10}}/>

                <TextInput height={30} placeholder={'Enter link'} when_text_input_field_changed={this.when_blockexplorer_input_field_changed.bind(this)} text={this.state.typed_blockexplorer_link} theme={this.props.theme}/>
                {this.render_detail_item('0')}



                {this.render_detail_item('4', {'text':'Add or remove rpc urls for the ether', 'textsize':'14px', 'font':this.props.app_state.font})}
                <div style={{height:10}}/>

                <div className="row" style={{width:'100%'}}>
                    <div className="col-11" style={{'margin': '0px 0px 0px 0px'}}>
                        <TextInput height={30} placeholder={'Web3 RPC url...'} when_text_input_field_changed={this.when_typed_rpc_url_input_field_changed.bind(this)} text={this.state.typed_rpc_url} theme={this.props.theme}/>
                    </div>
                    <div className="col-1" style={{'padding': '0px 10px 0px 0px'}} onClick={()=> this.add_rpc_url()}>
                        <div className="text-end" style={{'padding': '5px 0px 0px 0px'}} >
                            <img alt="" className="text-end" src={this.props.theme['add_text']} style={{height:37, width:'auto'}} />
                        </div>
                    </div>
                </div>
                <div style={{height:10}}/>
                {this.render_added_rpcs()}
                {this.render_detail_item('0')}


                {this.render_detail_item('4', {'text':'Tap disabled to disable the ether.', 'textsize':'14px', 'font':this.props.app_state.font})}
                <div style={{height:10}}/>
                <Tags font={this.props.app_state.font} page_tags_object={this.state.get_ether_disabled_setting_object} tag_size={'l'} when_tags_updated={this.when_get_ether_disabled_setting_object_updated.bind(this)} theme={this.props.theme}/>

                {this.render_detail_item('0')}

                {this.render_detail_item('4', {'text':'Pick the tag, then set the image after.', 'textsize':'14px', 'font':this.props.app_state.font})}
                <div style={{height:10}}/>

                <Tags font={this.props.app_state.font} page_tags_object={this.state.get_e5_image_setting_tags_object} tag_size={'l'} when_tags_updated={this.when_get_e5_image_setting_tags_object_updated.bind(this)} theme={this.props.theme}/>
                <div style={{height:10}}/>

                <div className="row" style={{width:'100%'}}>
                    <div className="col-11" style={{'margin': '0px 0px 0px 0px'}}>
                        <TextInput height={60} placeholder={'Image url...'} when_text_input_field_changed={this.when_typed_image_url_input_field_changed.bind(this)} text={this.get_typed_image_text()} theme={this.props.theme}/>
                    </div>
                    <div className="col-1" style={{'padding': '0px 10px 0px 0px'}}>
                        <div className="text-end" style={{'padding': '5px 0px 0px 0px'}} >
                            <img alt="" className="text-end" src={this.get_typed_image_text()} style={{height:37, width:'auto'}} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    render_e5_content2(){
        return(
            <div>
                {this.render_detail_item('4', {'text':'Set the ethers E5 address below', 'textsize':'14px', 'font':this.props.app_state.font})}
                <div style={{height:10}}/>

                <TextInput height={30} placeholder={'Enter E5 address'} when_text_input_field_changed={this.when_typed_e5_address_input_field_changed.bind(this)} text={this.state.typed_e5_address} theme={this.props.theme}/>
                {this.render_detail_item('0')}


                {this.render_detail_item('4', {'text':'Set the first block for the E5.', 'textsize':'14px', 'font':this.props.app_state.font})}
                <div style={{height:10}}/>

                <TextInput height={30} placeholder={'Enter first block'} when_text_input_field_changed={this.when_first_block_input_field_changed.bind(this)} text={this.state.typed_first_block} theme={this.props.theme}/>
                {this.render_detail_item('0')}


                {this.render_detail_item('4', {'text':'Set the iteration for synchronizing with the E5.', 'textsize':'14px', 'font':this.props.app_state.font})}
                <div style={{height:10}}/>

                <TextInput height={30} placeholder={'Enter iteration'} when_text_input_field_changed={this.when_iteration_input_field_changed.bind(this)} text={this.state.typed_iteration} theme={this.props.theme}/>
                {this.render_detail_item('0')}





                {this.render_detail_item('4', {'text':'Tap active to set the new E5 as active.', 'textsize':'14px', 'font':this.props.app_state.font})}
                <div style={{height:10}}/>
                <Tags font={this.props.app_state.font} page_tags_object={this.state.get_e5_active_setting_object} tag_size={'l'} when_tags_updated={this.when_get_e5_active_setting_object_updated.bind(this)} theme={this.props.theme}/>
                {this.render_detail_item('0')}


                {this.render_detail_item('4', {'text':'Tap active to set the new E5 as public enabled.', 'textsize':'14px', 'font':this.props.app_state.font})}
                <div style={{height:10}}/>
                <Tags font={this.props.app_state.font} page_tags_object={this.state.get_e5_public_enabled_tags_object} tag_size={'l'} when_tags_updated={this.when_get_e5_public_enabled_tags_object_updated.bind(this)} theme={this.props.theme}/>
                {this.render_detail_item('0')}

                
                

                {this.render_detail_item('4', {'text':'Set the end token power limit for the E5', 'textsize':'14px', 'font':this.props.app_state.font})}
                <div style={{height:10}}/>

                <TextInput height={30} placeholder={'Enter End token power limit'} when_text_input_field_changed={this.when_power_limit_input_field_changed.bind(this)} text={this.state.power_limit} theme={this.props.theme}/>
                {this.render_detail_item('0')}


                {this.render_detail_item('4', {'text':'Change the countries that can access the E5s spend exchange.', 'textsize':'14px', 'font':this.props.app_state.font})}
                <div style={{height:10}}/>
                <TextInput height={30} placeholder={'Search filter country'} when_text_input_field_changed={this.when_spend_country_input_field_changed.bind(this)} text={this.state.typed_spend_country_name} theme={this.props.theme}/>
                <div style={{height:5}}/>
                {this.render_detail_item('1',{'active_tags':this.get_countries_from_typed_text2(), 'indexed_option':'indexed', 'when_tapped':'when_spend_country_selected'})}
                <div style={{height:15}}/>
                {this.render_detail_item('4', {'text':'Tap a country to remove from the spend exchange accessible list.', 'textsize':'14px', 'font':this.props.app_state.font})}
                <div style={{height:5}}/>
                {this.render_detail_item('1',{'active_tags':this.get_included_countries_from_typed_text2(), 'indexed_option':'indexed', 'when_tapped':'when_spend_included_country_selected'})}
                <div style={{height:10}}/>
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        <div onClick={()=> this.add_all_countries()}>
                            {this.render_detail_item('5', {'text':'Add all', 'action':''})}
                        </div>
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        <div onClick={()=> this.remove_all_countries()}>
                            {this.render_detail_item('5', {'text':'remove all', 'action':''})}
                        </div>
                    </div>
                </div>                

                <div style={{height:30}}/>
                <div onClick={()=> this.add_or_edit_ether_e5()}>
                    {this.render_detail_item('5', {'text':(this.state.editing_e5_item == '' ? 'Add E5': 'Edit E5'), 'action':''})}
                </div>
            </div>
        )
    }

    render_my_balances_horizontal(){
        var items = this.get_my_balances()
        if(items.length == 0){
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
            return(
                <div style={{'margin':'3px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                    <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                        {items.map((item, index) => (
                            <li style={{'display': 'inline-block', 'margin': '0px 2px 1px 2px', '-ms-overflow-style':'none'}}>
                                {this.render_ether_balance_item(item)}
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
    }

    get_my_balances(){
        var e5s = this.state.data['e5s']['data']
        var list = []
        for(var i=0; i<e5s.length; i++){
            var focused_e5 = e5s[i]
            list.push({'name': this.state.data['e5s'][focused_e5]['token'], 'e5':focused_e5 });
        }
        var sort_id = this.get_selected_item(this.state.get_ether_list_sort_order_object, 'e') == 'E5-ID' ? 'e5' : 'name'
        if(sort_id == 'e5') return e5s
        var sorted_list =  this.sortByAttributeDescending(list, sort_id)
        var selected = []
        for(var j=0; j<sorted_list.length; j++){
            selected.push(sorted_list[j]['e5'])
        }
        return selected
    }

    sortByAttributeDescending(array, attribute) {
      return array.sort((a, b) => {
          if (a[attribute] > b[attribute]) {
          return 1;
          }
          if (a[attribute] < b[attribute]) {
          return -1;
          }
          return 0;
      });
    }

    render_ether_balance_item(item){
        var image = this.props.app_state.e5s[item].ether_image
        var token_name = this.props.app_state.e5s[item].token
        var details = item
        return(
            <div onClick={() => this.edit_selected_e5(item)}>
                {this.render_coin_item({'title':token_name, 'image':image, 'details':details, 'size':'s', 'img_size':30})}
                {this.render_line_if_editing_e5(item)}
            </div>
        )
    }

    render_line_if_editing_e5(item){
        if(this.state.editing_e5_item == item){
            return(
                <div>
                    <div style={{height:'1px', 'background-color':this.props.app_state.theme['line_color'], 'margin': '3px 5px 0px 5px'}}/>
                </div>
            )
        }
    }

    render_empty_horizontal_list_item2(){
        var background_color = this.props.theme['view_group_card_item_background']
        return(
            <div>
                <div style={{height:43, width:127, 'background-color': background_color, 'border-radius': '8px','padding':'10px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                    <div style={{'margin':'0px 0px 0px 0px'}}>
                        <img alt="" src={this.props.app_state.theme['letter']} style={{height:20 ,width:'auto'}} />
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

    edit_selected_e5(item){
        if(this.state.editing_e5_item == item){
            this.setState({editing_e5_item: '',
                typed_e5_id:'', typed_symbol_id:'', typed_token_name:'', typed_rpc_url:'', added_rpc_urls:[], typed_e5_address:'', get_e5_image_setting_tags_object:this.get_e5_image_setting_tags_object(), end_image:'', spend_image:'', e5_image:'', ether_image:'', get_e5_active_setting_object:this.get_e5_active_setting_object(false), power_limit:'', get_ether_disabled_setting_object:this.get_ether_disabled_setting_object(false), typed_first_block:'', typed_iteration:'', spend_exchange_allowed_countries:[], get_e5_public_enabled_tags_object:this.get_e5_public_enabled_tags_object(false), typed_blockexplorer_link:''
            })
        }else{
            const obj = this.state.data['e5s'][item]
            const token_obj = this.get_item_in_array(this.state.data['ether_data'], obj.token, 'symbol')
            const symbol = token_obj['symbol']
            const name = token_obj['name']
            const ether_disabled = token_obj['disabled']
            
            const rpcs = obj.web3
            const e5_address = obj.e5_address
            const end_image = obj.end_image
            const spend_image = obj.spend_image
            const ether_image = obj.ether_image
            const e5_image = obj.e5_img
            const first_block = obj.first_block
            const iteration = obj.iteration
            const spend_access = obj.spend_access == null ? []: obj.spend_access
            const public_enabled = obj.public_enabled == null ? false: obj.public_enabled
            const typed_blockexplorer_link = obj.blockexplorer_link == null ? '':obj.blockexplorer_link
            this.setState({editing_e5_item: item, 
                typed_e5_id:item, typed_symbol_id: symbol, typed_token_name:name, typed_rpc_url:'', added_rpc_urls:rpcs, typed_e5_address:e5_address, end_image:end_image, spend_image:spend_image, e5_image:e5_image, ether_image:ether_image, get_e5_active_setting_object:this.get_e5_active_setting_object(obj.active), power_limit:obj.end_token_power_limit, get_ether_disabled_setting_object:this.get_ether_disabled_setting_object(ether_disabled), typed_first_block: first_block.toString(), typed_iteration: iteration.toString(), spend_exchange_allowed_countries: spend_access, get_e5_public_enabled_tags_object:this.get_e5_public_enabled_tags_object(public_enabled), typed_blockexplorer_link: typed_blockexplorer_link
            })
        }
    }

    get_item_in_array(object_array, id, attribute){
        var object = object_array.find(x => x[attribute] == id);
        return object
    }


    when_typed_e5_id_input_field_changed(text){
        this.setState({typed_e5_id: text})
    }

    when_typed_symbol_id_input_field_changed(text){
        this.setState({typed_symbol_id: text})
    }

    when_typed_token_name_input_field_changed(text){
        this.setState({typed_token_name: text})
    }

    when_typed_rpc_url_input_field_changed(text){
        this.setState({typed_rpc_url: text})
    }

    add_rpc_url(){
        var url = this.state.typed_rpc_url
        var clone = this.state.added_rpc_urls.slice()

        if(!this.isValidHttpUrl(url)){
            this.props.notify('that rpc url is invalid', 5000)
            return;
        }
        else if(clone.includes(url)){
            this.props.notify('that rpc url is already added', 5000)
            return;
        }
        clone.push(url)
        this.setState({added_rpc_urls: clone})
    }

    render_added_rpcs(){
        var items = this.state.added_rpc_urls;
        if(items == null){
            items = []
        }
        items = [].concat(items)

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
                                    action: () =>this.delete_rpc_url(index)
                                    }}>
                                    <div style={{width:'100%', 'background-color':this.props.theme['send_receive_ether_background_color']}}>
                                        <li style={{'padding': '2px'}}>
                                            {this.render_detail_item('4', {'text':item, 'textsize':'11px', 'font':this.props.app_state.font})}
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

    delete_rpc_url(index){
        var clone = this.state.added_rpc_urls.slice()
        clone.splice(index, 1)
        this.setState({added_rpc_urls: clone})
    }

    when_typed_e5_address_input_field_changed(text){
        this.setState({typed_e5_address: text})
    }

    when_get_e5_image_setting_tags_object_updated(tag_obj){
        this.setState({get_e5_image_setting_tags_object: tag_obj})
    }

    get_selected_item(object, option){
        var selected_item = object[option][2][0]
        var picked_item = object[option][1][selected_item];
        return picked_item
    }

    get_typed_image_text(){
        var selected_item = this.get_selected_item(this.state.get_e5_image_setting_tags_object, 'e')
        var obj = {'end_image':this.state.end_image, 'spend_image':this.state.spend_image, 'e5_image':this.state.e5_image, 'ether_image':this.state.ether_image}
        return obj[selected_item]
    }

    when_typed_image_url_input_field_changed(text){
        var selected_item = this.get_selected_item(this.state.get_e5_image_setting_tags_object, 'e')
        if(selected_item == 'end_image'){
            this.setState({end_image: text})
        }
        else if(selected_item == 'spend_image'){
            this.setState({spend_image: text})
        }
        else if(selected_item == 'e5_image'){
            this.setState({e5_image: text})
        }
        else if(selected_item == 'ether_image'){
            this.setState({ether_image: text})
        }
    }

    when_first_block_input_field_changed(text){
        if(!isNaN(text)){
            this.setState({typed_first_block: text})
        }
    }

    when_iteration_input_field_changed(text){
        if(!isNaN(text)){
            this.setState({typed_iteration: text})
        }
    }

    when_get_e5_active_setting_object_updated(tag_obj){
        this.setState({get_e5_active_setting_object: tag_obj})
    }

    when_power_limit_input_field_changed(text){
        if(!isNaN(text)){
            this.setState({power_limit: text})
        }
    }

    when_get_ether_disabled_setting_object_updated(tag_obj){
        this.setState({get_ether_disabled_setting_object: tag_obj})
    }

    when_get_ether_list_sort_order_object_updated(tag_obj){
        this.setState({get_ether_list_sort_order_object: tag_obj})
    }



    when_spend_country_input_field_changed(text){
        this.setState({typed_spend_country_name: text})
    }

    get_countries_from_typed_text2(){
        var selected_countries = []
        var all_countries = this.state.data['country_data']
        var typed_text = this.state.typed_spend_country_name
        var already_included_countries = this.state.spend_exchange_allowed_countries.map(e => e.toLowerCase())

        if(typed_text != ''){
            selected_countries = all_countries.filter(function (el) {
                return (el['name'].toLowerCase().includes(typed_text.toLowerCase())) && 
                !already_included_countries.includes(el['name'].toLowerCase())
            });
        }else{
            selected_countries = all_countries.filter(function (el) {
                return (!already_included_countries.includes(el['name'].toLowerCase()))
            });
        }

        var selected = []
        var l = selected_countries.length > 7 ? 7 : selected_countries.length
        for(var i=0; i<l; i++){
            selected.push(selected_countries[i]['name'])
        }
        return selected;
    }

    when_spend_country_selected(tag, pos){
        if(tag != 'e'){
            var clone = this.state.spend_exchange_allowed_countries.slice()
            clone.push(tag)
            this.setState({spend_exchange_allowed_countries: clone})
        }
    }

    get_included_countries_from_typed_text2(){
        var selected_countries = []
        var all_countries = this.state.spend_exchange_allowed_countries
        var typed_text = this.state.typed_spend_country_name

        if(typed_text != ''){
            selected_countries = all_countries.filter(function (el) {
                return (el.toLowerCase().startsWith(typed_text.toLowerCase()))
            });
        }else{
            selected_countries = all_countries.filter(function (el) {
                return (true)
            });
        }

        return selected_countries
    }

    when_spend_included_country_selected(tag, pos){
        if(tag != 'e'){
            var clone = this.state.spend_exchange_allowed_countries.slice()
            var index = clone.indexOf(tag)
            if(index != -1){
                clone.splice(index, 1)
            }
            this.setState({spend_exchange_allowed_countries: clone})
        }
    }

    add_all_countries(){
        var all_countries = this.state.data['country_data']
        var selected = []
        for(var i=0; i<all_countries.length; i++){
            selected.push(all_countries[i]['name'])
        }
        this.setState({spend_exchange_allowed_countries: selected})
    }

    remove_all_countries(){
       this.setState({spend_exchange_allowed_countries: []}) 
    }

    when_get_e5_public_enabled_tags_object_updated(tag_obj){
        this.setState({get_e5_public_enabled_tags_object: tag_obj})
    }

    when_blockexplorer_input_field_changed(text){
        this.setState({typed_blockexplorer_link: text})
    }



    add_or_edit_ether_e5(){
        const e5 = this.state.typed_e5_id
        const symbol = this.state.typed_symbol_id
        const name = this.state.typed_token_name
        const rpcs = this.state.added_rpc_urls
        const e5_address = this.state.typed_e5_address
        const end_image = this.state.end_image
        const spend_image = this.state.spend_image
        const e5_image = this.state.e5_image
        const ether_image = this.state.ether_image
        const first_block = parseInt(this.state.typed_first_block)
        const iteration = parseInt(this.state.typed_iteration)
        const typed_blockexplorer_link = this.state.typed_blockexplorer_link
        const spend_exchange_allowed_countries = this.state.spend_exchange_allowed_countries
        const e5_active = this.get_selected_item(this.state.get_e5_active_setting_object, 'e') == 'active' ? true : false
        const power_limit = parseInt(this.state.power_limit)
        const ether_disabled = this.get_selected_item(this.state.get_ether_disabled_setting_object, 'e') == 'disabled' ? true : false
        const public_enabled = this.get_selected_item(this.state.get_e5_public_enabled_tags_object, 'e') == 'public-enabled' ? true : false
        const editing_e5_item = this.state.editing_e5_item
        
        var clone = structuredClone(this.state.data)
        //this.props.notify('', 5000)

        if(e5 == '' || !e5.startsWith('E') || !e5.endsWith('5')){
            this.props.notify('that e5 id is invalid', 5000)
            return;
        }
        else if(symbol == ''){
            this.props.notify('that token ticker id is invalid', 5000)
            return;
        }
        else if(name == ''){
            this.props.notify('that token name is invalid', 5000)
            return;
        }
        else if(rpcs.length == 0){
            this.props.notify('Your new e5 cant have no rpcs', 5000)
            return;
        }
        else if(ether_image == ''){
            this.props.notify('You need to set an ether image', 5000)
            return;
        }
        else if(power_limit < 72){
            this.props.notify('The power limit cant be less than 72', 5000)
            return;
        }
        // else if(typed_blockexplorer_link == '' || !typed_blockexplorer_link.includes('{hash}')){
        //     this.props.notify('You need to specify a valid blockexplorer link', 5000)
        //     return;
        // }
        else if(e5_address != ''){
            if(end_image == ''){
                this.props.notify('You need to speficy a valid end image', 5000)
                return;
            }
            else if(spend_image == ''){
                this.props.notify('You need to specify a valid spend image', 5000)
                return;
            }
            else if(e5_image == ''){
                this.props.notify('You need to specify a valid e5 image', 5000)
                return;
            }
            else if(!this.props.is_valid_ether_address(e5_address)){
                this.props.notify('that E5 address is invalid', 5000)
            }
        }
        else if(first_block == 0){
            this.props.notify('First block cannot be zero', 5000)
            return;
        }
        else if(iteration < 1000){
            this.props.notify('Iteration cannot be less than 1000', 5000)
            return;
        }
        else if(e5 == 'E25' && e5_address != clone['e5s'][e5]['e5_address']){
            this.props.notify('You cant change the address for E25 from here.', 5000)
            return;
        }
            
        if(editing_e5_item != ''){
            //were editing an e5
            if(e5 != editing_e5_item){
                this.props.notify('You cant change the E5 id', 5000)
                return;
            }
        }
        else{
            const existing = clone['e5s'][e5]
            if(existing != null || clone['e5s']['data'].includes(e5)){
                this.props.notify('You cant create a new E5 with an id that alredy exists', 5000)
                return;
            }
        }

        var pos = -1
        for(var i=0; i<clone['ether_data'].length; i++){
            if(clone['ether_data'][i]['symbol'] == symbol){
                pos = i
            }
        }
        var updated_data = {symbol: symbol, name: name, e5: e5, disabled: ether_disabled}
        if(pos != -1){
            //a token exists with the symbol used
            clone['ether_data'][pos] = updated_data
        }else{
            clone['ether_data'].push(updated_data)
        }
        var e5_data = {
            web3:rpcs, 
            token:symbol,
            e5_address:e5_address, 
            first_block:first_block, end_image:end_image, spend_image:spend_image, ether_image:ether_image, 
            iteration:iteration, url:0, active:e5_active, e5_img:e5_image,
            end_token_power_limit: power_limit, spend_access:spend_exchange_allowed_countries, public_enabled: public_enabled,
            blockexplorer_link:typed_blockexplorer_link,
        }
        clone['e5s'][e5] = e5_data
        if(editing_e5_item == '') clone['e5s']['data'].push(e5)
        this.setState({data: clone,
            editing_e5_item: '',
            typed_e5_id:'', typed_symbol_id:'', typed_token_name:'', typed_rpc_url:'', added_rpc_urls:[], typed_e5_address:'', get_e5_image_setting_tags_object:this.get_e5_image_setting_tags_object(), end_image:'', spend_image:'', e5_image:'', ether_image:'', get_e5_active_setting_object:this.get_e5_active_setting_object(false), power_limit:'', get_ether_disabled_setting_object:this.get_ether_disabled_setting_object(false), typed_first_block:'', typed_iteration:'', spend_exchange_allowed_countries:[], get_e5_public_enabled_tags_object:this.get_e5_public_enabled_tags_object(false), typed_blockexplorer_link:'',
        });
    }









    finish(){
        this.props.add_dialer_admin_config_update_object_to_stack(this.state)
        this.props.notify(this.props.app_state.loc['1058']/* 'Transaction added to Stack' */, 700)
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
        if(item_id == '8' || item_id == '7' || item_id == '8'|| item_id == '9' || item_id == '11' || item_id == '12') uploaded_data = this.props.app_state.uploaded_data
        return(
            <div>
                <ViewGroups uploaded_data={uploaded_data} graph_type={this.props.app_state.graph_type} font={this.props.app_state.font} item_id={item_id} object_data={object_data} theme={this.props.theme} when_dialer_country_selected={this.when_dialer_country_selected.bind(this)}
                when_dialer_included_country_selected={this.when_dialer_included_country_selected.bind(this)} when_dialer_dark_emblem_country_selected={this.when_dialer_dark_emblem_country_selected.bind(this)} when_add_translation_language_tapped={this.when_add_translation_language_tapped.bind(this)} when_spend_country_selected={this.when_spend_country_selected.bind(this)} when_spend_included_country_selected={this.when_spend_included_country_selected.bind(this)}
                />
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




export default DialerPage;