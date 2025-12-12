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
import ViewGroups from '../../components/view_groups';
import Tags from '../../components/tags';
import NumberPicker from '../../components/number_picker';
import DurationPicker from '../../components/duration_picker';
import TextInput from '../../components/text_input';
import Slider from '../../components/slider'
// import Letter from '../../assets/letter.png';

import EndImg from '../../assets/end_token_icon.png';
import SpendImg from '../../assets/spend_token_icon.png';
import AddStack from '../../assets/e5empty_icon3.png'; 
// import E5EmptyIcon from '../../assets/e5empty_icon.png';
// import E5EmptyIcon3 from '../../assets/e5empty_icon3.png';


import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDateTimePicker } from "@mui/x-date-pickers/StaticDateTimePicker";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Draggable } from "react-drag-reorder";
import imageCompression from 'browser-image-compression';
import { SwipeableList, SwipeableListItem } from '@sandstreamdev/react-swipeable-list';
import '@sandstreamdev/react-swipeable-list/dist/styles.css';


var bigInt = require("big-integer");

function number_with_commas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function bgN(number, power) {
  return bigInt((number+"e"+power)).toString();
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


class NewTokenPage extends Component {
    
    state = {
        id: makeid(8), object_type:31, type:this.props.app_state.loc['601']/* 'token' */, e5:this.props.app_state.selected_e5,
        new_token_page_tags_object: this.get_new_token_page_tags_object(),
        entered_tag_text: '',entered_indexing_tags:[],entered_title_text:'',entered_symbol_text:'', token_image:null, get_bundle_image_tags_option:this.get_bundle_image_tags_option(),

        new_token_type_tags_object: this.get_new_token_type_tags_object(),
        token_exchange_liquidity_total_supply:0, default_exchange_amount_buy_limit:0,   
        minimum_transactions_between_swap:0, minimum_blocks_between_swap:0, minimum_time_between_swap:0, default_exchange_amount_sell_limit:0, minimum_entered_contracts_between_swap:0, minimum_transactions_for_first_buy:0, trust_fee_proportion:0, block_limit:0, minimum_entered_contracts_for_first_buy:0,

        new_token_unlocked_liquidity_tags_object:this.get_new_token_unlocked_liquidity_tags_object(), new_token_unlocked_supply_tags_object:this.get_new_token_unlocked_supply_tags_object(),
        new_token_fully_custom_tags_object:this.get_new_token_fully_custom_tags_object(),

        internal_block_halfing_proportion:0, block_limit_reduction_proportion:0, block_reset_limit:0,
        new_token_block_limit_sensitivity_tags_object: this.get_new_token_block_limit_sensitivity_tags_object(),
        default_authority_mint_limit:0, new_token_halving_type_tags_object: this.get_new_token_halving_type_tags_object(), maturity_limit:0, token_exchange_ratio_x:0, token_exchange_ratio_y:0,

        exchange_authority:'', trust_fee_target:'',  exchange_id:'', price_amount:0, price_data:[],

        new_token_access_rights_tags_object: this.get_new_token_access_rights_tags_object(), new_token_interactible_moderator_tags_object: this.get_new_token_interactible_moderator_tags_object(),

        moderator_id:'', moderators:[], interactible_id:'', interactible_timestamp:0, interactibles:[],

        page:0, custom_page:0,

        
        content_channeling_setting: this.props.app_state.content_channeling, 
        device_language_setting: this.props.app_state.device_language, 
        device_country: this.props.app_state.device_country,

        default_depth:0,
        get_end_token_base_liquidity:this.get_end_token_base_liquidity(),
        get_end_token_base_stability:this.get_end_token_base_stability(),

        spend_exchange_allowed_countries:[], typed_spend_country_name:'',


        /* simulator stuff */
        simulator_block_time:12000, get_simulator_block_time:this.get_simulator_block_time(),
        simulator_block_number:0,

        simulator_active_mint_block:0,
        simulator_active_block_limit_reduction_proportion: bigInt(bgN(1, 18)),
        simulator_total_minted_for_current_block:0,
        simulator_block_limit_sensitivity:1,/*  */ sim_block_limit_sensitivity_tags:this.get_new_token_block_limit_sensitivity_tags_object(),
        simulator_internal_block_halfing_proportion: bigInt(bgN(50, 16)),/*  */
        simulator_block_limit_reduction_proportion: bigInt(bgN(90, 16)),/*  */
        simulator_block_reset_limit:1,/*  */
        simulator_mint_limit:1000_000,/*  */
        simulator_block_limit:2000_000,/*  */
        simulator_total_supply:0,
        simulator_maturity_limit:5000_000,/*  */
        simulator_block_halving_type:1,/*  */ sim_block_halving_type_tags: this.get_new_token_halving_type_tags_object(),
        UpdateExchangeRatiosEvents:[],
        UpdateProportionRatios:[],
        simulator_speed:100,

        get_simulator_reduction_proportion_chart_filters:this.get_simulator_reduction_proportion_chart_filters(),
        simulator_state:'stopped',

        end_time: Date.now()+(1000*60*5),
        start_time: Date.now(),

    };

    get_new_token_page_tags_object(){
        var obj = {
            'i':{
                active:'e', 
            },
            'e':[
                ['or','',0], ['e','e.'+this.props.app_state.loc['2764']/* 'configuration' */, this.props.app_state.loc['604']/* 'token-authorities 👮' */, this.props.app_state.loc['605']/* 'token-prices 💵' */, 'e.'+this.props.app_state.loc['752b']/* 'spend-simulator' */], [0]
            ],
            'configuration': [
                ['xor', 'e', 1], [this.props.app_state.loc['2764']/* 'configuration' */, this.props.app_state.loc['602']/* 'basic' */, this.props.app_state.loc['603']/* 'custom' */, this.props.app_state.loc['2765']/* ??? */], [1], [1]
            ],
            'spend-simulator': [
                ['xor', 'e', 1], [this.props.app_state.loc['752b']/* 'spend-simulator' */, this.props.app_state.loc['752d']/* 'configuration 🛠️' */, this.props.app_state.loc['752c']/* 'control' */,], [1], [1]
            ],
        };

        obj[this.props.app_state.loc['2764']/* 'configuration' */] = [
            ['xor', 'e', 1], [this.props.app_state.loc['2764']/* 'configuration' */, this.props.app_state.loc['602']/* 'basic' */, this.props.app_state.loc['603']/* 'custom' */, this.props.app_state.loc['2765']/* ??? */], [1], [1]
        ]

        obj[this.props.app_state.loc['752b']/* 'spend-simulator' */] = [
            ['xor', 'e', 1], [this.props.app_state.loc['752b']/* 'spend-simulator' */, this.props.app_state.loc['752d']/* 'config' */, this.props.app_state.loc['752c']/* 'control' */, ], [1], [1]
        ]

        return obj;
    }

    get_new_token_type_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e',this.props.app_state.loc['606']/* 'capped' */, this.props.app_state.loc['607']/* 'uncapped' */], [1]
            ],
        };
    }


    get_new_token_unlocked_liquidity_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e',this.props.app_state.loc['608']/* 'locked' */, this.props.app_state.loc['609']/* 'unlocked' */], [1]
            ],
        };
    }

    get_new_token_unlocked_supply_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e',this.props.app_state.loc['610']/* 'locked' */, this.props.app_state.loc['611']/* 'unlocked' */], [1]
            ],
        };
    }


    get_new_token_fully_custom_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e',this.props.app_state.loc['612']/* 'partially-custom' */, this.props.app_state.loc['613']/* 'fully-custom' */], [1]
            ],
        };
    }

    get_new_token_block_limit_sensitivity_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e','1', '2', '3', '4', '5'], [1]
            ],
        };
    }


    get_new_token_halving_type_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e',this.props.app_state.loc['614']/* 'fixed' */, this.props.app_state.loc['615']/* 'spread' */], [1]
            ],
        };
    }

    get_new_token_access_rights_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e',this.props.app_state.loc['616']/* 'enabled' */, this.props.app_state.loc['617']/* 'disabled' */], [2]
            ],
        };
    }

    get_new_token_interactible_moderator_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e',this.props.app_state.loc['618']/* 'moderators' */, this.props.app_state.loc['619']/* 'interactible' */], [1]
            ],
        };
    }




    get_end_token_base_liquidity(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e', this.props.app_state.loc['2773']/* 'low' */,this.props.app_state.loc['2774']/* 'medium' */, this.props.app_state.loc['2775']/* 'high' */], [1]
            ],
        };
    }

    get_end_token_base_stability(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e', this.props.app_state.loc['2776']/* '1 END' */,this.props.app_state.loc['2777']/* '10 END' */, this.props.app_state.loc['2778']/* '100 END' */], [1]
            ],
        };
    }


    get_simulator_reduction_proportion_chart_filters(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e','25%', '50%', '80%', this.props.app_state.loc['1416']/* 'all-time' */], [4]
            ],
        };
    }

    get_simulator_block_time(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e','3sec', '7sec', '12sec', '30sec', '60sec'], [3]
            ],
        };
    }

    get_bundle_image_tags_option(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['or','',0], ['e',this.props.app_state.loc['a311dw']/* 'bundle' */], [1]
            ],
        };
    }



    render(){
        return(
            <div style={{'padding':'10px 10px 0px 10px'}}>
                
                <div style={{'display': 'flex','flex-direction': 'row','margin':'0px 0px 0px 0px', width: this.props.app_state.width-25}}>
                    <div style={{'padding': '0px 0px 0px 0px', width:this.props.app_state.width-50}}>
                        <Tags app_state={this.props.app_state} font={this.props.app_state.font} page_tags_object={this.state.new_token_page_tags_object} tag_size={'l'} when_tags_updated={this.when_new_token_page_tags_updated.bind(this)} theme={this.props.theme}/>
                    </div>
                    <div style={{'padding': '0px 10px 0px 0px', width:40}}>
                        <img alt="" className="text-end" onClick={()=>this.finish_creating_object()} src={this.props.theme['close']} style={{height:36, width:'auto'}} />
                    </div>
                </div>

                {/* <div className="row" style={{'width':'102%'}}>
                    <div className="col-11" style={{'padding': '0px 0px 0px 10px'}}>
                        <Tags app_state={this.props.app_state} font={this.props.app_state.font} page_tags_object={this.state.new_token_page_tags_object} tag_size={'l'} when_tags_updated={this.when_new_token_page_tags_updated.bind(this)} theme={this.props.theme}/>
                    </div>
                    <div className="col-1" style={{'padding': '0px 0px 0px 0px'}}>
                        <div className="text-end" style={{'padding': '0px 10px 0px 0px'}} >
                            <img className="text-end" onClick={()=>this.finish_creating_object()} src={this.props.theme['close']} style={{height:36, width:'auto'}} />
                        </div>
                    </div>
                </div> */}
                
                
                <div style={{'margin':'0px 0px 0px 0px', 'overflow-y': 'auto', 'overflow-x':'none', maxHeight: this.props.height-120}}>
                    <div style={{'width':'98%'}}>
                        {this.render_everything()}
                    </div>  
                </div>
                
            </div>
        )
    }


    when_new_token_page_tags_updated(tag_obj){
        this.setState({new_token_page_tags_object: tag_obj, page:0, custom_page:0})
    }

    set_state(state){
        this.setState(state)
    }


    render_everything(){
        var selected_item = this.get_selected_item(this.state.new_token_page_tags_object, this.state.new_token_page_tags_object['i'].active)

        // if(this.state.new_token_page_tags_object['i'].active == 'custom'){
        //     selected_item = this.get_selected_item(this.state.new_token_page_tags_object, 'custom')
        // }

        if(selected_item == 'e'){
            return(
                <div>
                    {this.render_enter_tags_part()}
                </div>
            )    
        }
        else if(selected_item == this.props.app_state.loc['602']/* 'basic' */){
            return(
                <div>
                    {this.render_simple_token_list()}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['603']/* 'custom' */){
            return(
                <div>
                    {this.render_custom_configuration_token_part()}
                </div>
            ) 
        }
        else if(selected_item == this.props.app_state.loc['604']/* 'token-authorities' */){
            return(
                <div>
                    {this.render_token_authorities_part()}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['605']/* 'token-prices' */){
            return(
                <div>
                    {this.render_set_token_prices_list()}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['2765']/* ??? */){
            return(
                <div>
                    {this.render_end_token_list()}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['752c']/* 'control' */ || selected_item == this.props.app_state.loc['752d']/* 'config' */){
            return(
                <div>
                    {this.render_simulator_part()}
                </div>
            )
        }
    }

    get_selected_item(object, option){
        var selected_item = object[option][2][0]
        var picked_item = object[option][1][selected_item];
        return picked_item
    }






    componentDidMount(){
        if(this.interval != null) clearInterval(this.interval);
        var me = this;
        setTimeout(function() {
            me.interval = setInterval(() => me.update_object_in_background(), 10*1000);
        }, (1 * 100));
    }

    componentWillUnmount() {
        if(this.interval != null) clearInterval(this.interval);
        if(this.interval2 != null) clearInterval(this.interval2);
    }

    
    render_enter_tags_part(){
        var size = this.props.size

        if(size == 's'){
            return(
                <div>
                    {this.render_title_tags_part()}
                    {this.render_presets_menu()}
                    {this.render_title_tags_part2()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row" style={{}}>
                    <div className="col-6" >
                        {this.render_title_tags_part()}
                    </div>
                    <div className="col-6" >
                        {this.render_presets_menu()}
                        {this.render_title_tags_part2()}
                    </div>
                </div>
                
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" >
                        {this.render_title_tags_part()}
                    </div>
                    <div className="col-5" >
                        {this.render_presets_menu()}
                        {this.render_title_tags_part2()}
                    </div>
                </div>
                
            )
        }
    }

    render_title_tags_part(){
        return(
            <div style={{'padding':'0px 10px 0px 10px'}}>
                {this.render_detail_item('4',{'font':this.props.app_state.font, 'textsize':'15px','text':this.props.app_state.loc['620']/* 'Set a name for your new Token. No spaces should be used.' */})}
                <div style={{height:10}}/>
                <TextInput font={this.props.app_state.font} height={30} placeholder={this.props.app_state.loc['621']/* 'Enter Name...' */} when_text_input_field_changed={this.when_title_text_input_field_changed.bind(this)} text={this.state.entered_title_text} theme={this.props.theme}/>

                <div style={{height: 10}}/>
                {this.render_detail_item('4',{'font':this.props.app_state.font, 'textsize':'15px','text':this.state.entered_title_text})}
                {this.render_detail_item('10',{'font':this.props.app_state.font, 'textsize':'10px','text':this.props.app_state.loc['124']/* 'remaining character count: ' */+(20 - this.state.entered_title_text.length)})}

                {this.render_detail_item('0')}
                {this.render_detail_item('4',{'font':this.props.app_state.font, 'textsize':'15px','text':this.props.app_state.loc['622']/* 'Set a symbol for your new Token. No spaces should be used.' */})}
                <div style={{height:10}}/>
                <TextInput font={this.props.app_state.font} height={30} placeholder={this.props.app_state.loc['623']/* 'Enter Symbol...' */} when_text_input_field_changed={this.when_symbol_text_input_field_changed.bind(this)} text={this.state.entered_symbol_text} theme={this.props.theme}/>

                {this.render_detail_item('0')}
                {this.render_detail_item('4',{'font':this.props.app_state.font, 'textsize':'15px','text':this.props.app_state.loc['624']/* 'Set tags for indexing your new Token' */})}
                <div style={{height:10}}/>

                <div className="row" style={{'width':'99%'}}>
                    <div className="col-11" style={{'margin': '0px 0px 0px 0px'}}>
                        <TextInput font={this.props.app_state.font} height={30} placeholder={this.props.app_state.loc['625']/* 'Enter Tag...' */} when_text_input_field_changed={this.when_index_text_input_field_changed.bind(this)} text={this.state.entered_tag_text} theme={this.props.theme}/>
                    </div>
                    <div className="col-1" style={{'padding': '0px 10px 0px 0px'}}>
                        {/* {this.render_detail_item('5', {'text':this.props.app_state.loc['127'], 'action':'add_indexing_tag', 'prevent_default':true})} */}
                        <div className="text-end" style={{'padding': '5px 0px 0px 0px'}} >
                            <img alt="" className="text-end" onClick={()=>this.add_indexing_tag_for_new_job()} src={this.props.theme['add_text']} style={{height:37, width:'auto'}} />
                        </div>
                    </div>
                </div>
                {this.render_detail_item('10',{'font':this.props.app_state.font, 'textsize':'10px','text':this.props.app_state.loc['124']/* 'remaining character count: ' */+(this.props.app_state.tag_size - this.state.entered_tag_text.length)})}

                {this.render_detail_item('1',{'active_tags':this.state.entered_indexing_tags, 'indexed_option':'indexed', 'when_tapped':'delete_entered_tag_word'})}
                {this.render_detail_item('0')}



                {this.render_detail_item('4',{'font':this.props.app_state.font, 'textsize':'15px','text':this.props.app_state.loc['626']/* 'Set an image for your new Token. Black picks gif, grey picks image.' */})}
                <div style={{height:10}}/>
                {this.render_create_image_ui_buttons_part()}



                {this.render_detail_item('0')}
                {this.render_specific_country_selector()}


            </div>
        )
    }

    render_title_tags_part2(){
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['a311du']/* 'Bundle Thumbnail.' */, 'details':this.props.app_state.loc['a311dv']/* 'Bundle the image set as the thumbnail in the object to be displayed as a default while loading. This will make your object larger.' */, 'size':'l'})}
                <div style={{height:10}}/>
                <Tags font={this.props.app_state.font} page_tags_object={this.state.get_bundle_image_tags_option} tag_size={'l'} when_tags_updated={this.when_get_bundle_image_tags_option_updated.bind(this)} theme={this.props.theme}/>


                {this.render_previous_edits_if_existing()}

                {this.render_detail_item('0')}
                {this.render_detail_item('3', {'title':this.props.app_state.loc['a311dc']/* 'Current post size.' */, 'details':this.props.app_state.loc['a311dd']/* 'Below is the size of your new post with all the details youve set.' */, 'size':'l'})}
                <div style={{height:10}}/>
                {this.render_transaction_size_indicator()}
            </div>
        )
    }

    when_get_bundle_image_tags_option_updated(tag_obj){
        this.setState({get_bundle_image_tags_option: tag_obj})

        const selected_item = this.get_selected_item(tag_obj, 'e')
        if(selected_item == this.props.app_state.loc['a311dw']/* 'bundle' */){
            if(this.state.token_image != null){
                this.setState({image_bundle: this.get_image_from_file(this.state.token_image)})
            }
        }else{
            this.setState({image_bundle: null})
        }
    }

    render_specific_country_selector(){
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['a273t']/* 'Specify State Limits.' */, 'details':this.props.app_state.loc['a273u']/* 'You can restrict your nitro object to specific states.' */, 'size':'l'})}
                <div style={{height:10}}/>
                <TextInput height={30} placeholder={'Search filter country'} when_text_input_field_changed={this.when_spend_country_input_field_changed.bind(this)} text={this.state.typed_spend_country_name} theme={this.props.theme}/>
                <div style={{height:5}}/>
                {this.render_detail_item('1',{'active_tags':this.get_countries_from_typed_text2(), 'indexed_option':'indexed', 'when_tapped':'when_spend_country_selected'})}
                <div style={{height:15}}/>
                {this.render_detail_item('4', {'text':this.props.app_state.loc['a273v']/* 'Tap a state to remove it from the list.' */, 'textsize':'14px', 'font':this.props.app_state.font})}
                <div style={{height:5}}/>
                {this.render_detail_item('1',{'active_tags':this.get_included_countries_from_typed_text2(), 'indexed_option':'indexed', 'when_tapped':'when_spend_included_country_selected'})}
                <div style={{height:10}}/>
                <div className="row">
                    <div className="col-6" >
                        <div onClick={()=> this.add_all_countries()}>
                            {this.render_detail_item('5', {'text':this.props.app_state.loc['a273w']/* 'Add all' */, 'action':''})}
                        </div>
                    </div>
                    <div className="col-6" >
                        <div onClick={()=> this.remove_all_countries()}>
                            {this.render_detail_item('5', {'text':this.props.app_state.loc['a273x']/* 'remove all' */, 'action':''})}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    when_spend_country_input_field_changed(text){
        this.setState({typed_spend_country_name: text})
    }

    get_countries_from_typed_text2(){
        var selected_countries = []
        var all_countries = this.props.app_state.country_data
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
            this.setState({spend_exchange_allowed_countries: clone, typed_spend_country_name:''})
        }
    }

    add_all_countries(){
        var all_countries = this.props.app_state.country_data
        var selected = []
        for(var i=0; i<all_countries.length; i++){
            selected.push(all_countries[i]['name'])
        }
        this.setState({spend_exchange_allowed_countries: selected, typed_spend_country_name:''})
    }

    remove_all_countries(){
       this.setState({spend_exchange_allowed_countries: [], typed_spend_country_name:''}) 
    }






    when_title_text_input_field_changed(text){
        this.setState({entered_title_text: text})
    }

    when_index_text_input_field_changed(text){
        this.setState({entered_tag_text: text})
    }

    when_symbol_text_input_field_changed(text){
        this.setState({entered_symbol_text: text.toUpperCase()})
    }

    add_indexing_tag_for_new_job(){
        var typed_word = this.state.entered_tag_text.trim().toLowerCase();

        if(typed_word == ''){
            this.props.notify(this.props.app_state.loc['128']/* 'type something!' */, 1400)
        }
        else if(this.hasWhiteSpace(typed_word)){
            this.props.notify(this.props.app_state.loc['129']/* 'enter one word!' */, 1400)
        }
        else if(typed_word.length > this.props.app_state.tag_size){
            this.props.notify(this.props.app_state.loc['130']/* 'That tag is too long' */, 1400)
        }
        else if(typed_word.length < 3){
            this.props.notify(this.props.app_state.loc['131']/* 'That tag is too short' */, 1400)
        }
        else if(this.state.entered_indexing_tags.includes(typed_word)){
            this.props.notify(this.props.app_state.loc['132']/* 'you cant enter the same word twice' */, 1400)
        }
        else if(this.state.entered_indexing_tags.length == this.props.app_state.max_tags_count){
            this.props.notify(this.props.app_state.loc['162l']/* The maximum number of tags you can use is 7. */, 5400)
        }
        else if(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(typed_word)){
            this.props.notify(this.props.app_state.loc['162m'], 4400)/* You cant use special characters. */
        }
        else{
            var cloned_seed_array = this.state.entered_indexing_tags.slice()
            cloned_seed_array.push(typed_word)
            this.setState({entered_indexing_tags: cloned_seed_array, entered_tag_text:''})
            // this.props.notify('tag added!', 200)
        }
    }

    hasWhiteSpace(s) {
        return s.indexOf(' ') >= 0;
    }

    delete_entered_tag_word(word, pos){
        var cloned_seed_array = this.state.entered_indexing_tags.slice()
        const index = cloned_seed_array.indexOf(word);
        if (index > -1) { // only splice array when item is found
            cloned_seed_array.splice(index, 1); // 2nd parameter means remove one item only
        }
        this.setState({entered_indexing_tags: cloned_seed_array})
        // this.props.notify('tag removed', 200)
    }


    /* renders the buttons for pick images, set images and clear images */
    render_create_image_ui_buttons_part(){
        var token_type = this.get_selected_item(this.state.new_token_type_tags_object, 'e')
        var default_image = token_type == this.props.app_state.loc['606']/* 'capped' */ ? EndImg: SpendImg
        var image = this.state.token_image == null ? default_image : this.get_image_from_file(this.state.token_image)
        return(
            <div>
                <div style={{'margin':'5px 0px 0px 0px','padding': '0px 5px 0px 10px', width: '99%'}}>
                    <div style={{'position': 'relative', 'width':45, 'height':45, 'padding':'0px 0px 0px 0px'}}>
                        <img alt="" src={this.props.app_state.static_assets['e5_empty_icon3']} style={{height:45, width:'auto', 'z-index':'1' ,'position': 'absolute'}} onClick={() => this.props.show_pick_file_bottomsheet('image', 'create_text_banner_image', 1)}/>
                    </div>

                    <div style={{'margin': '10px 0px 0px 0px'}}>
                        <img alt="" src={image} style={{height:100 ,width:100, 'border-radius':'10px'}} onClick={()=> this.when_icon_image_tapped()}/>
                    </div>
                </div>
            </div>
        )
    }

    when_icon_image_tapped(){
        this.setState({token_image: null})
    }

    when_image_gif_picked = (e) => {
        if(e.target.files && e.target.files[0]){
            for(var i = 0; i < e.target.files.length; i++){ 
                let reader = new FileReader();
                reader.onload = function(ev){
                    if(ev.total < this.props.app_state.image_size_limit){
                        this.setState({token_image: ev.target.result});
                    }else{
                        this.props.notify(this.props.app_state.loc['627']/* 'Use a smaller image!' */, 4000);
                    }
                }.bind(this);
                var imageFile = e.target.files[i];
                imageCompression(imageFile, { maxSizeMB: 0.35, maxWidthOrHeight: 1920, useWebWorker: true }).then(function (compressedFile) {
                    reader.readAsDataURL(compressedFile);
                })
                .catch(function (error) {
                    console.log(error.message);
                });
            }
        }
    }

    when_banner_selected = async (files) => {
        this.setState({token_image: files[0]});
        var cloned_ecid_encryption_passwords = this.state.ecid_encryption_passwords == null ? {} : structuredClone(this.state.ecid_encryption_passwords)
        for(var f=0; f<files.length; f++){
            const file = files[f]
            cloned_ecid_encryption_passwords[file] = await this.props.get_ecid_file_password_if_any(file)
        }
        this.setState({ecid_encryption_passwords: cloned_ecid_encryption_passwords});

        const selected_item = this.get_selected_item(this.state.get_bundle_image_tags_option, 'e')
        if(selected_item == this.props.app_state.loc['a311dw']/* 'bundle' */){
            if(files[0] != null){
                this.setState({image_bundle: this.get_image_from_file(files[0])})
            }
        }else{
            this.setState({image_bundle: null})
        }
    }

    get_image_from_file(ecid){
        var ecid_obj = this.get_cid_split(ecid)
        if(this.props.app_state.uploaded_data[ecid_obj['filetype']] == null) return
        var data = this.props.app_state.uploaded_data[ecid_obj['filetype']][ecid_obj['full']]
        if(data == null) return
return data['data']
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




    render_presets_menu(){
        return(
            <div>
                {this.render_detail_item('4',{'font':this.props.app_state.font, 'textsize':'15px','text':this.props.app_state.loc['628']/* 'Preset the new tokens settings based on common use cases.' */})}
                <div style={{height:10}}/>

                <div onClick={()=>this.preset_e_token()}>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['629']/* '📈 e-Token' */, 'details':this.props.app_state.loc['630']/* 'A fixed supply token used for managing stake and funding a workgroup.' */, 'size':'l'})}
                </div>
                <div style={{height:3}}/>

                <div  onClick={()=>this.preset_paid_token()}>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['631']/* '☝️ Paid Token' */, 'details':this.props.app_state.loc['632']/* 'A fixed supply token with a very large supply similar to END.' */, 'size':'l'})}
                </div>
                <div style={{height:3}}/>

                <div onClick={()=>this.preset_free_token()}>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['633']/* '🫰 Free Token' */, 'details':this.props.app_state.loc['634']/* 'A variable supply token whose supply increases as users mint from its exchange, similar to SPEND.' */, 'size':'l'})}
                </div>
                <div style={{height:3}}/>

                <div onClick={()=>this.preset_utility_token()}>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['635']/* '🔧 Utility Token' */, 'details':this.props.app_state.loc['636']/* 'An uncapped, general purpose token which is bought and sold from its exchange.' */, 'size':'l'})}
                </div>
                <div style={{height:3}}/>

                
                {/* <div onClick={()=>this.preset_end_token()}>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2769'], 'details':this.props.app_state.loc['2770'], 'size':'l'})}
                </div> */}
                <div style={{height:3}}/>
            </div>
        )
    }


    preset_e_token(is_checking_type){
        var type = { 'i':{ active:'e', }, 'e':[ ['xor','',0], ['e',this.props.app_state.loc['606']/* 'capped' */, this.props.app_state.loc['607']/* 'uncapped' */], [1] ], };
        var unlocked_liquidity = { 'i':{ active:'e', }, 'e':[ ['xor','',0], ['e',this.props.app_state.loc['608']/* 'locked' */, this.props.app_state.loc['609']/* 'unlocked' */], [2] ], };
        var unlocked_supply = { 'i':{ active:'e', }, 'e':[ ['xor','',0], ['e',this.props.app_state.loc['608']/* 'locked' */, this.props.app_state.loc['609']/* 'unlocked' */], [2] ], };
        var fully_custom = { 'i':{ active:'e', }, 'e':[ ['xor','',0], ['e',this.props.app_state.loc['612']/* 'partially-custom' */, this.props.app_state.loc['613']/* 'fully-custom' */], [2] ], };
        var block_limit_sensitivity = { 'i':{ active:'e', }, 'e':[ ['xor','',0], ['e','1', '2', '3', '4', '5'], [1] ], };
        var halving_type = { 'i':{ active:'e', }, 'e':[ ['xor','',0], ['e',this.props.app_state.loc['614']/* 'fixed' */, this.props.app_state.loc['615']/* 'spread' */], [1] ], };
        var price = [{'id':'5', 'amount':bigInt('1')}]

        var spend_exchange = this.get_item_in_array(5, this.props.app_state.created_tokens[this.state.e5])
        var spend_exchange_mint_limit = spend_exchange == null ? 72_000_000 : spend_exchange['data'][1][0/* <0>default_exchange_amount_buy_limit */]

        var set_object = {
            new_token_type_tags_object: type, 
            token_exchange_liquidity_total_supply: bigInt(spend_exchange_mint_limit*1000),
            default_exchange_amount_buy_limit: bigInt(spend_exchange_mint_limit*300),
            default_exchange_amount_sell_limit: bigInt(spend_exchange_mint_limit*100),
            trust_fee_proportion: bigInt('25e15'),/* 2.5% */

            new_token_unlocked_liquidity_tags_object: unlocked_liquidity,
            new_token_unlocked_supply_tags_object: unlocked_supply,
            new_token_fully_custom_tags_object: fully_custom,
            
            token_exchange_ratio_x: bigInt(spend_exchange_mint_limit*1000),
            token_exchange_ratio_y: bigInt(spend_exchange_mint_limit),
            price_data: price,

            minimum_transactions_between_swap:0, minimum_blocks_between_swap:0, minimum_time_between_swap:0, minimum_entered_contracts_between_swap:0, minimum_transactions_for_first_buy:0, block_limit:0, minimum_entered_contracts_for_first_buy:0, internal_block_halfing_proportion:0, block_limit_reduction_proportion:0, block_reset_limit:0,
            new_token_block_limit_sensitivity_tags_object: block_limit_sensitivity,
            default_authority_mint_limit:0, new_token_halving_type_tags_object: halving_type, maturity_limit:0,
        }

        if(is_checking_type != null && is_checking_type == true){
            var keys = Object.keys(set_object)
            var is_matching = true;
            keys.forEach(setting => {
                if(JSON.stringify(this.state[setting], (key, value) => typeof value === 'bigint' ? value.toString() : value ) != JSON.stringify(set_object[setting], (key, value) => typeof value === 'bigint' ? value.toString() : value )){
                    is_matching = false
                }
            });
            return is_matching
        }
        else{
            this.setState(set_object);
            this.props.notify(this.props.app_state.loc['637']/* 'e-token preset has been applied' */, 2500)
        }

        

        
    }

    preset_paid_token(is_checking_type){
        var type = { 'i':{ active:'e', }, 'e':[ ['xor','',0], ['e',this.props.app_state.loc['606']/* 'capped' */, this.props.app_state.loc['607']/* 'uncapped' */], [1] ], };
        var unlocked_liquidity = { 'i':{ active:'e', }, 'e':[ ['xor','',0], ['e',this.props.app_state.loc['608']/* 'locked' */, this.props.app_state.loc['609']/* 'unlocked' */], [1] ], };
        var unlocked_supply = { 'i':{ active:'e', }, 'e':[ ['xor','',0], ['e',this.props.app_state.loc['608']/* 'locked' */, this.props.app_state.loc['609']/* 'unlocked' */], [2] ], };
        var fully_custom = { 'i':{ active:'e', }, 'e':[ ['xor','',0], ['e',this.props.app_state.loc['612']/* 'partially-custom' */, this.props.app_state.loc['613']/* 'fully-custom' */], [2] ], };
        var block_limit_sensitivity = { 'i':{ active:'e', }, 'e':[ ['xor','',0], ['e','1', '2', '3', '4', '5'], [1] ], };
        var halving_type = { 'i':{ active:'e', }, 'e':[ ['xor','',0], ['e',this.props.app_state.loc['614']/* 'fixed' */, this.props.app_state.loc['615']/* 'spread' */], [1] ], };
        var price = [{'id':'5', 'amount':bigInt('1')}]

        var set_object = {
            new_token_type_tags_object: type,
            token_exchange_liquidity_total_supply: bigInt('1e72'),
            default_exchange_amount_buy_limit: bigInt('1e6'),
            default_exchange_amount_sell_limit: bigInt('1e6'),
            trust_fee_proportion: bigInt('35e15'),

            new_token_unlocked_liquidity_tags_object: unlocked_liquidity,
            new_token_unlocked_supply_tags_object: unlocked_supply,
            new_token_fully_custom_tags_object: fully_custom,

            token_exchange_ratio_x: bigInt('1e72'),
            token_exchange_ratio_y: bigInt('1e72'),
            price_data: price,

            minimum_transactions_between_swap:0, minimum_blocks_between_swap:0, minimum_time_between_swap:0, 
            minimum_entered_contracts_between_swap:0, minimum_transactions_for_first_buy:0, block_limit:0, minimum_entered_contracts_for_first_buy:0, internal_block_halfing_proportion:0, block_limit_reduction_proportion:0, block_reset_limit:0, new_token_block_limit_sensitivity_tags_object:block_limit_sensitivity, default_authority_mint_limit:0, new_token_halving_type_tags_object:halving_type, maturity_limit:0
        }

        if(is_checking_type != null && is_checking_type == true){
            var keys = Object.keys(set_object)
            var is_matching = true;
            keys.forEach(setting => {
                if(JSON.stringify(this.state[setting], (key, value) => typeof value === 'bigint' ? value.toString() : value ) != JSON.stringify(set_object[setting], (key, value) => typeof value === 'bigint' ? value.toString() : value )){
                    is_matching = false
                }
            });
            return is_matching
        }
        else{
            this.setState(set_object);
            this.props.notify(this.props.app_state.loc['638']/* 'Paid token preset has been applied' */, 2500)
        }

    }

    preset_free_token(is_checking_type){
        var type = { 'i':{ active:'e', }, 'e':[ ['xor','',0], ['e',this.props.app_state.loc['606']/* 'capped' */, this.props.app_state.loc['607']/* 'uncapped' */], [2] ], };
        var unlocked_liquidity = { 'i':{ active:'e', }, 'e':[ ['xor','',0], ['e',this.props.app_state.loc['608']/* 'locked' */, this.props.app_state.loc['609']/* 'unlocked' */], [1] ], };
        var unlocked_supply = { 'i':{ active:'e', }, 'e':[ ['xor','',0], ['e',this.props.app_state.loc['608']/* 'locked' */, this.props.app_state.loc['609']/* 'unlocked' */], [1] ], };
        var fully_custom = { 'i':{ active:'e', }, 'e':[ ['xor','',0], ['e',this.props.app_state.loc['612']/* 'partially-custom' */, this.props.app_state.loc['613']/* 'fully-custom' */], [2] ], };
        var block_limit_sensitivity = { 'i':{ active:'e', }, 'e':[ ['xor','',0], ['e','1', '2', '3', '4', '5'], [3] ], };
        var halving_type = { 'i':{ active:'e', }, 'e':[ ['xor','',0], ['e',this.props.app_state.loc['614']/* 'fixed' */, this.props.app_state.loc['615']/* 'spread' */], [2] ], };
        var price = []

        var set_object = {
            new_token_type_tags_object: type,
            default_exchange_amount_buy_limit: bigInt('720e6'),
            default_exchange_amount_sell_limit:0,
            minimum_transactions_for_first_buy:1,
            trust_fee_proportion:bigInt('35e15'),
            block_limit:bigInt('1e9'),
            
            new_token_unlocked_liquidity_tags_object: unlocked_liquidity,
            new_token_unlocked_supply_tags_object: unlocked_supply,
            new_token_fully_custom_tags_object: fully_custom,

            internal_block_halfing_proportion:bigInt('50e16'),block_limit_reduction_proportion:bigInt('90e16'), block_reset_limit:bigInt('2'), new_token_block_limit_sensitivity_tags_object:block_limit_sensitivity, default_authority_mint_limit:bigInt('720e6'),new_token_halving_type_tags_object:halving_type, maturity_limit:bigInt('10e9'),

            token_exchange_ratio_x: bigInt('1e72'),
            token_exchange_ratio_y: bigInt('1e72'),
            price_data: price,


            token_exchange_liquidity_total_supply:0, minimum_transactions_between_swap:0, minimum_blocks_between_swap:0, minimum_time_between_swap:0, minimum_entered_contracts_between_swap:0, minimum_entered_contracts_for_first_buy:0,
        }

        if(is_checking_type != null && is_checking_type == true){
            var keys = Object.keys(set_object)
            var is_matching = true;
            keys.forEach(setting => {
                if(JSON.stringify(this.state[setting], (key, value) => typeof value === 'bigint' ? value.toString() : value ) != JSON.stringify(set_object[setting], (key, value) => typeof value === 'bigint' ? value.toString() : value )){
                    is_matching = false
                }
            });
            return is_matching
        }
        else{
            this.setState(set_object);
            this.props.notify(this.props.app_state.loc['639']/* 'Free preset has been applied' */, 2500)
        }
    }

    preset_utility_token(is_checking_type){
        var type = { 'i':{ active:'e', }, 'e':[ ['xor','',0], ['e',this.props.app_state.loc['606']/* 'capped' */, this.props.app_state.loc['607']/* 'uncapped' */], [2] ], };
        var unlocked_liquidity = { 'i':{ active:'e', }, 'e':[ ['xor','',0], ['e',this.props.app_state.loc['608']/* 'locked' */, this.props.app_state.loc['609']/* 'unlocked' */], [2] ], };
        var unlocked_supply = { 'i':{ active:'e', }, 'e':[ ['xor','',0], ['e',this.props.app_state.loc['608']/* 'locked' */, this.props.app_state.loc['609']/* 'unlocked' */], [2] ], };
        var fully_custom = { 'i':{ active:'e', }, 'e':[ ['xor','',0], ['e',this.props.app_state.loc['612']/* 'partially-custom' */, this.props.app_state.loc['613']/* 'fully-custom' */], [2] ], };
        var block_limit_sensitivity = { 'i':{ active:'e', }, 'e':[ ['xor','',0], ['e','1', '2', '3', '4', '5'], [1] ], };
        var halving_type = { 'i':{ active:'e', }, 'e':[ ['xor','',0], ['e',this.props.app_state.loc['614']/* 'fixed' */, this.props.app_state.loc['615']/* 'spread' */], [1] ], };
        var price = [{'id':'3', 'amount':bigInt('1')}, {'id':'5', 'amount':bigInt('1')}]

        var set_object = {
            new_token_type_tags_object: type,
            default_exchange_amount_buy_limit:bigInt('1e62'),
            default_exchange_amount_sell_limit:bigInt('1e62'),
            trust_fee_proportion:bigInt('35e15'),

            new_token_unlocked_liquidity_tags_object: unlocked_liquidity,
            new_token_unlocked_supply_tags_object: unlocked_supply,
            new_token_fully_custom_tags_object: fully_custom,

            token_exchange_ratio_x: bigInt('1e72'),
            token_exchange_ratio_y: bigInt('1e72'),
            price_data: price,

            token_exchange_liquidity_total_supply:0, minimum_transactions_between_swap:0, minimum_blocks_between_swap:0, minimum_time_between_swap:0, minimum_entered_contracts_between_swap:0, minimum_transactions_for_first_buy:0, block_limit:0, minimum_entered_contracts_for_first_buy:0, internal_block_halfing_proportion:0, block_limit_reduction_proportion:0, block_reset_limit:0, new_token_block_limit_sensitivity_tags_object: block_limit_sensitivity, default_authority_mint_limit:0, new_token_halving_type_tags_object: halving_type, maturity_limit:0, 
        }

        if(is_checking_type != null && is_checking_type == true){
            var keys = Object.keys(set_object)
            var is_matching = true;
            keys.forEach(setting => {
                if(JSON.stringify(this.state[setting], (key, value) => typeof value === 'bigint' ? value.toString() : value ) != JSON.stringify(set_object[setting], (key, value) => typeof value === 'bigint' ? value.toString() : value )){
                    is_matching = false
                }
            });
            return is_matching
        }
        else{
            this.setState(set_object);
            this.props.notify(this.props.app_state.loc['640']/* 'Utility preset has been applied' */, 2500)
        }
    }

    preset_end_token(is_checking_type){
        var type = { 'i':{ active:'e', }, 'e':[ ['xor','',0], ['e',this.props.app_state.loc['606']/* 'capped' */, this.props.app_state.loc['607']/* 'uncapped' */], [2] ], };
        var unlocked_liquidity = { 'i':{ active:'e', }, 'e':[ ['xor','',0], ['e',this.props.app_state.loc['608']/* 'locked' */, this.props.app_state.loc['609']/* 'unlocked' */], [2] ], };
        var unlocked_supply = { 'i':{ active:'e', }, 'e':[ ['xor','',0], ['e',this.props.app_state.loc['608']/* 'locked' */, this.props.app_state.loc['609']/* 'unlocked' */], [2] ], };
        var fully_custom = { 'i':{ active:'e', }, 'e':[ ['xor','',0], ['e',this.props.app_state.loc['612']/* 'partially-custom' */, this.props.app_state.loc['613']/* 'fully-custom' */], [2] ], };
        var block_limit_sensitivity = { 'i':{ active:'e', }, 'e':[ ['xor','',0], ['e','1', '2', '3', '4', '5'], [1] ], };
        var halving_type = { 'i':{ active:'e', }, 'e':[ ['xor','',0], ['e',this.props.app_state.loc['614']/* 'fixed' */, this.props.app_state.loc['615']/* 'spread' */], [1] ], };
        var price = [{'id':'3', 'amount':bigInt('1')}]

        var number = bigInt('9e143')

        var set_object = {
            new_token_type_tags_object: type,
            default_exchange_amount_buy_limit:bigInt('1e62'),
            default_exchange_amount_sell_limit:bigInt('1e62'),
            trust_fee_proportion:bigInt('35e15'),

            new_token_unlocked_liquidity_tags_object: unlocked_liquidity,
            new_token_unlocked_supply_tags_object: unlocked_supply,
            new_token_fully_custom_tags_object: fully_custom,

            token_exchange_ratio_x: bigInt('1e72'),
            token_exchange_ratio_y: bigInt('1e72'),
            price_data: price,

            minimum_transactions_between_swap:0, minimum_blocks_between_swap:0, minimum_time_between_swap:0, minimum_entered_contracts_between_swap:0, minimum_transactions_for_first_buy:0, block_limit:0, minimum_entered_contracts_for_first_buy:0, internal_block_halfing_proportion:0, block_limit_reduction_proportion:0, block_reset_limit:0, new_token_block_limit_sensitivity_tags_object: block_limit_sensitivity, default_authority_mint_limit:0, new_token_halving_type_tags_object: halving_type, maturity_limit:0, 

            token_exchange_liquidity_total_supply: number, default_depth: this.get_default_depth(number)
        }

        if(is_checking_type != null && is_checking_type == true){
            var keys = Object.keys(set_object)
            var is_matching = true;
            keys.forEach(setting => {
                if(JSON.stringify(this.state[setting], (key, value) => typeof value === 'bigint' ? value.toString() : value ) != JSON.stringify(set_object[setting], (key, value) => typeof value === 'bigint' ? value.toString() : value )){
                    is_matching = false
                }
            });
            return is_matching
        }
        else{
            this.setState(set_object);
            this.props.notify(this.props.app_state.loc['2768']/* 'End preset has been applied' */, 2500)
        }
    }


    get_token_type(){
        if(this.preset_e_token(true) == true){
            return 'e'
        }
        else if(this.preset_paid_token(true) == true){
            return 'paid'
        }
        else if(this.preset_free_token(true) == true){
            return 'free'
        }
        else if(this.preset_utility_token(true) == true){
            return 'utility'
        }
        else if(this.preset_end_token(true) == true){
            return 'end'
        }
        else{
            return 'custom'
        }
    }
   



    
    render_new_job_object(){
        return;
        var background_color = this.props.theme['card_background_color']
        var card_shadow_color = this.props.theme['card_shadow_color']
        return ( 
            <div onClick={() => console.log()} style={{height:'auto', 'background-color': background_color, 'border-radius': '15px','padding':'5px 5px 0px 0px', 'box-shadow': '0px 0px 1px 2px '+card_shadow_color, 'margin':'0px 10px 10px 10px'}}>
                <div style={{'padding': '5px 0px 5px 0px'}}>
                    {this.render_detail_item('1',{'active_tags':this.state.entered_indexing_tags, 'indexed_option':'indexed', 'when_tapped':'delete_entered_tag_word'})}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('4',{'font':this.props.app_state.font, 'textsize':'15px','text':this.state.entered_title_text})}
                    {this.render_detail_item('0')}

                </div>         
            </div>
        );
    }

    render_transaction_size_indicator(){
        var current_stack_size = this.props.app_state.stack_size_in_bytes[this.state.e5] == null ? 50 : this.props.app_state.stack_size_in_bytes[this.state.e5]
        if(current_stack_size != -1){
            const size = this.lengthInUtf8Bytes(JSON.stringify(this.state))
            const stack_size_in_bytes_formatted_data_size = this.format_data_size2(size)
            
            var existing_percentage = this.round_off((current_stack_size / this.props.app_state.upload_object_size_limit) * 100)
            var additional_percentage = this.round_off((size / this.props.app_state.upload_object_size_limit) * 100)
            
            if(existing_percentage >= 100){
                existing_percentage = 99.99
                additional_percentage = 0.01
            }

            if(existing_percentage + additional_percentage >= 100){
                additional_percentage = 100 - existing_percentage;
            }

            return(
                <div>
                    <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px'}}>
                        {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['a311da']/* 'Post Size.' */, 'subtitle':this.format_power_figure(stack_size_in_bytes_formatted_data_size['size']), 'barwidth':this.calculate_bar_width(stack_size_in_bytes_formatted_data_size['size']), 'number':(stack_size_in_bytes_formatted_data_size['size']), 'barcolor':'#606060', 'relativepower':stack_size_in_bytes_formatted_data_size['unit'], })}

                        {this.render_impact_value({'title':this.props.app_state.loc['a311db']/* 'Impact on Run.' */, 'subtitle':'e0', 'barwidth':existing_percentage+'%', 'barwidth2':additional_percentage+'%', 'number':(existing_percentage + additional_percentage)+'%', 'barcolor':'#606060', 'relativepower':this.props.app_state.loc['1881']/* 'proportion' */,})}
                    </div>
                </div>
            )
        }
    }

    render_impact_value(object_data){
        var title = object_data != null ? object_data['title']:'Post Block Number'
        var subtitle = object_data != null ? object_data['subtitle']:'depth'
        var barwidth = object_data != null ? object_data['barwidth']:'84%'
        var barwidth2 = object_data != null ? object_data['barwidth2']:'5%'
        var number = object_data != null ? object_data['number']:'123,445,555'
        var barcolor = this.props.theme['bar_color']
        var relativepower = object_data != null ? object_data['relativepower']:'500 blocks'
        return(
            <div style={{'margin': '5px 20px 0px 15px'}}>
                <div className="row">
                    <div className="col-10" style={{'padding': '0px 0px 0px 14px' }}> 
                    <p style={{'color': this.props.theme['primary_text_color'], 'font-size': '11px', height: 7, 'font-family': this.props.app_state.font}} className="fw-bold">{title}</p>
                    </div>
                    <div className="col-2" style={{'padding': '0px 15px 0px 0px' }}>
                        <p style={{'color': this.props.theme['secondary_text_color'], 'font-size': '11px', height: 7, 'padding-top':' 0.5px', 'font-family': this.props.app_state.font}} className="text-end">{subtitle}</p>
                    </div>
                </div>
                
                <div style={{ height: 3, width: "100%", 'border-radius': '5px', 'box-shadow': '0px 0px 2px 1px '+this.props.theme['bar_shadow'], 'margin': '0px 0px 4px 0px' }}>
                    <div className="progress" style={{ height: 3, width: "100%", 'background-color': this.props.theme['linebar_background_color'] }}>
                        <div className="progress-bar" role="progressbar" style={{ width: barwidth, 'background-image': 'none','background-color': 'white', 'border-radius': '0px 0px 0px 0px' }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"/>

                        <div className="progress-bar" role="progressbar" style={{ width: barwidth2, 'background-image': 'none','background-color': barcolor, 'border-radius': '0px 0px 0px 0px' }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"/>
                    </div>
                </div>

                <div className="row">
                    <div className="col-9" style={{'padding': '0px 0px 0px 14px' }}> 
                        <p style={{'color': this.props.theme['primary_text_color'], 'font-size': '11px', height: '100%', 'font-family': this.props.app_state.font}} className="fw-bold">{number}</p>
                    </div>
                    <div className="col-3" style={{'padding': '0px 15px 0px 0px' }}>
                        <p style={{'color': this.props.theme['secondary_text_color'], 'font-size': '10px', height: '100%', 'padding-top':' 1px', 'font-family': this.props.app_state.font}} className="text-end">{relativepower}</p>
                    </div>
                </div>
            </div>
        )
    }

    format_data_size2(size){
        if(size > 1_000_000_000){
            return {'size':this.round_off(parseFloat(size)/(1_024*1_024*1_024)), 'unit':'GBs'}
        }
        else if(size > 1_000_000){
            return {'size':this.round_off(parseFloat(size)/(1_024*1_024)), 'unit':'MBs'}
        }
        else if(size > 1_000){
            return {'size':this.round_off(parseFloat(size)/1024), 'unit':'KBs'}
        }
        else{
            return {'size':parseFloat(size), 'unit':'bytes'}
        }
    }

    round_off(float_number){
        return (Math.round(float_number * 100) / 100)
    }

    lengthInUtf8Bytes(str) {
        // Matches only the 10.. bytes that are non-initial characters in a multi-byte sequence.
        var m = encodeURIComponent(str).match(/%[89ABab]/g);
        return str.length + (m ? m.length : 0);
    }





    render_previous_edits_if_existing(){
        const previous_edits = this.props.fetch_objects_from_db(this.state.object_type)
        const unfiltered_items = Object.keys(previous_edits)
        if(unfiltered_items.length == 0){
            return;
        }
        const items = this.sort_items(unfiltered_items, previous_edits)
        if(items.length == 0){
            return;
        }
        return(
            <div>
                {this.render_detail_item('0')}
                {this.render_detail_item('3', {'title':this.props.app_state.loc['a311ds']/* 'Set to previous changes.' */, 'details':this.props.app_state.loc['a311dt']/* 'You can continue where you left off in a pevious edit.' */, 'size':'l'})}
                <div style={{height: 10}}/>
                <div style={{'margin':'3px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                    <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                        {items.reverse().map((item, index) => (
                            <li style={{'display': 'inline-block', 'margin': '0px 2px 1px 2px', '-ms-overflow-style':'none'}}>
                                {this.render_previous_edit_item(item)}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        )
    }

    sort_items(items, previous_edits_data){
        const return_data = []
        const current_id = this.state.id
        items.forEach(identifier => {
            if(identifier != current_id){
                return_data.push(previous_edits_data[identifier])
            }
        });
        return this.sortByAttributeDescending(return_data, 'last_modified')
    }

    render_previous_edit_item(data){
        const title = this.truncate(data.entered_title_text, 17);
        const details = (new Date(data.last_modified))+''
        return(
            <div onClick={() => this.when_previous_edit_tapped(data)}>
                {this.render_detail_item('3', {'title':title, 'details':details, 'size':'s'})}
            </div>
        )
    }

    truncate(source, size) {
        return source.length > size ? source.slice(0, size - 1) + "…" : source;
    }

    when_previous_edit_tapped(data){
        this.setState(data)
    }

    update_object_in_background(){
        if(this.state.entered_title_text != ''){
            this.props.update_object_change_in_db(this.state, this.state.object_type)
        }
    }





    when_new_token_type_tags_object(tag_obj){
        this.setState({new_token_type_tags_object: tag_obj})
    }

    when_token_exchange_liquidity_total_supply(amount){
        this.setState({token_exchange_liquidity_total_supply: amount})
    }

    when_default_exchange_amount_buy_limit(amount){
        this.setState({default_exchange_amount_buy_limit: amount})
    }

    when_minimum_time_between_swap(amount){
        this.setState({minimum_time_between_swap: amount})
    }

    when_default_exchange_amount_sell_limit(amount){
        this.setState({default_exchange_amount_sell_limit: amount})
    }

    when_minimum_transactions_between_swap(amount){
        this.setState({minimum_transactions_between_swap: amount})
    }

    when_minimum_blocks_between_swap(amount){
        this.setState({minimum_blocks_between_swap: amount})
    }

    when_trust_fee_proportion(amount){
        this.setState({trust_fee_proportion: amount})
    }

    when_minimum_entered_contracts_between_swap(amount){
        this.setState({minimum_entered_contracts_between_swap: amount})
    }

    when_minimum_transactions_for_first_buy(amount){
        this.setState({minimum_transactions_for_first_buy: amount})
    }

    when_minimum_entered_contracts_for_first_buy(amount){
        this.setState({minimum_entered_contracts_for_first_buy: amount})
    }


    when_new_token_unlocked_liquidity_tags_object(tag_obj){
        this.setState({new_token_unlocked_liquidity_tags_object: tag_obj})
    }

    when_new_token_unlocked_supply_tags_object(tag_obj){
        this.setState({new_token_unlocked_supply_tags_object: tag_obj})
    }

    when_new_token_fully_custom_tags_object(tag_obj){
        this.setState({new_token_fully_custom_tags_object: tag_obj})
    }

    when_block_limit(amount){
        this.setState({block_limit: amount})
    }

    when_default_authority_mint_limit(amount){
        this.setState({default_authority_mint_limit: amount})
    }

    when_new_token_halving_type_tags_object(tag_obj){
        this.setState({new_token_halving_type_tags_object: tag_obj})
    }

    when_maturity_limit(amount){
        this.setState({maturity_limit: amount})
    }

    when_internal_block_halfing_proportion(amount){
        this.setState({internal_block_halfing_proportion: amount})
    }

    when_block_limit_reduction_proportion(amount){
        this.setState({block_limit_reduction_proportion: amount})
    }

    when_block_reset_limit(amount){
        this.setState({block_reset_limit: amount})
    }

    when_new_token_block_limit_sensitivity_tags_object(tag_obj){
        this.setState({new_token_block_limit_sensitivity_tags_object: tag_obj})
    }

    when_token_exchange_ratio_x(amount){
        this.setState({token_exchange_ratio_x: amount})
    }

    when_token_exchange_ratio_y(amount){
        this.setState({token_exchange_ratio_y: amount})
    }




    render_simple_token_list(){
        var size = this.props.app_state.size

        if(size == 's'){
            return(
                <div>
                    {this.render_simple_token_list_config_small()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" >
                        {this.render_simple_token_list_config_medium()}
                    </div>
                    <div className="col-6" >
                        {this.render_simple_token_list_config_medium2()}
                    </div>
                </div>
                
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" >
                        {this.render_simple_token_list_config_medium()}
                    </div>
                    <div className="col-5" >
                        {this.render_simple_token_list_config_medium2()}
                    </div>
                </div>
                
            )
        }
    }

    render_simple_token_list_config_medium(){
        return(
            <div>
                {this.render_detail_item('4', {'font':this.props.app_state.font, 'textsize':'15px','text':'Create a basic E5 token'})}
                <div style={{height:20}}/>

                {this.render_basic_token_section_parts(0)}
                {this.render_detail_item('0')}
                {this.render_basic_token_section_parts(1)}
                {this.render_detail_item('0')}
                {this.render_basic_token_section_parts(2)}
                {this.render_detail_item('0')}
            </div>
        )
    }

    render_simple_token_list_config_medium2(){
        return(
            <div>
                {this.render_basic_token_section_parts(3)}
                {this.render_detail_item('0')}
                {this.render_basic_token_section_parts(4)}
                {this.render_detail_item('0')}
            </div>
        )
    }

    render_simple_token_list_config_small(){
        var page = this.state.page
        return(
            <div>
                {this.render_detail_item('4', {'font':this.props.app_state.font, 'textsize':'15px','text':'Create a basic E5 token'})}
                <div style={{height:20}}/>
                {this.render_basic_token_section_parts(page)}

                <div style={{height:20}}/>
                <div className="row">
                    <div className="col-6" style={{'padding': '0px 0px 0px 10px'}}>
                        {this.show_previous_button()}
                    </div>
                    <div className="col-6" style={{'padding': '0px 0px 0px 0px'}}>
                        {this.show_next_button()}
                    </div>
                </div>
            </div>
        )
    }

    show_next_button(){
        var page = this.state.page
        if(page < 4){
            return(
                <div style={{'padding': '5px'}} onClick={()=>this.enter_next_page()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['641']/* 'Next' */, 'action':''})}
                </div>
            )
        }
    }

    show_previous_button(){
        var page = this.state.page
        if(page != 0){
            return(
                <div style={{'padding': '5px'}} onClick={()=>this.enter_previous_page()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['642']/* 'Previous' */, 'action':''})}
                </div>
            )
        }
    }

    render_basic_token_section_parts(page){
        // var page = this.state.page
        if(page == 0){
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['656']/* 'Set the token type' */, 'details':this.props.app_state.loc['657']/* 'Capped token (with limited supply) or uncapped token (with unlimited supply)' */, 'size':'l'})}

                    <div style={{height:20}}/>
                    <Tags font={this.props.app_state.font} page_tags_object={this.state.new_token_type_tags_object} tag_size={'l'} when_tags_updated={this.when_new_token_type_tags_object.bind(this)} theme={this.props.theme}/>

                </div>
            )
        }
        else if(page == 1){
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['643']/* 'Token Supply(For Capped Tokens)' */, 'details':this.props.app_state.loc['644']/* 'The supply of a capped token available for buying (for capped tokens)' */, 'size':'l'})}
                    <div style={{height:20}}/>

                    <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['645']/* 'Token Supply' */, 'number':this.state.token_exchange_liquidity_total_supply, 'relativepower':this.props.app_state.loc['646']/* 'tokens' */})}>
                        {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['645']/* 'Token Supply' */, 'subtitle':this.format_power_figure(this.state.token_exchange_liquidity_total_supply), 'barwidth':this.calculate_bar_width(this.state.token_exchange_liquidity_total_supply), 'number':this.format_account_balance_figure(this.state.token_exchange_liquidity_total_supply), 'barcolor':'', 'relativepower':this.props.app_state.loc['646']/* 'tokens' */, })}
                    </div>
                    <div style={{height:2}}/>
                    {this.render_detail_item('10', {'text':this.props.app_state.loc['647']/* 'Recommended: 100,000,000e2' */, 'textsize':'10px', 'font':this.props.app_state.font})}

                    <NumberPicker clip_number={this.props.app_state.clip_number} font={this.props.app_state.font} ref={this.number_picker_ref} number_limit={bigInt('1e72')} when_number_picker_value_changed={this.when_token_exchange_liquidity_total_supply.bind(this)} theme={this.props.theme} power_limit={63}/>
                </div>
            )
        }
        else if(page == 2){
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['648']/* 'Buy Limit' */, 'details':this.props.app_state.loc['649']/* 'The maximum amount of tokens that can be bought in one transaction.' */, 'size':'l'})}

                    <div style={{height:20}}/>
                    <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['648']/* 'Buy Limit' */, 'number':this.state.default_exchange_amount_buy_limit, 'relativepower':this.props.app_state.loc['646']/* 'tokens' */})}>
                        {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['648']/* 'Buy Limit' */, 'subtitle':this.format_power_figure(this.state.default_exchange_amount_buy_limit), 'barwidth':this.calculate_bar_width(this.state.default_exchange_amount_buy_limit), 'number':this.format_account_balance_figure(this.state.default_exchange_amount_buy_limit), 'barcolor':'', 'relativepower':this.props.app_state.loc['646']/* 'tokens' */, })}
                    </div>

                    <NumberPicker clip_number={this.props.app_state.clip_number} font={this.props.app_state.font} ref={this.number_picker_ref} number_limit={bigInt('1e72')} when_number_picker_value_changed={this.when_default_exchange_amount_buy_limit.bind(this)} theme={this.props.theme} power_limit={54}/>
                </div>
            )
        }
        else if(page == 3){
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['650']/* 'Trust Fee' */, 'details':this.props.app_state.loc['651']/* 'Proportion or percentage fee enforced on all contract spending that takes place using your new token.' */, 'size':'l'})}

                    <div style={{height:20}}/>
                    {this.render_detail_item('3', {'title':this.format_proportion(this.state.trust_fee_proportion), 'details':this.props.app_state.loc['650']/* 'Trust Fee' */, 'size':'l'})}

                    <div style={{height:2}}/>
                    {this.render_detail_item('10', {'text':this.props.app_state.loc['652']/* 'Recommended: 3.5%' */, 'textsize':'10px', 'font':this.props.app_state.font})}

                    <NumberPicker clip_number={this.props.app_state.clip_number} font={this.props.app_state.font} ref={this.number_picker_ref} number_limit={bigInt('1e18')} when_number_picker_value_changed={this.when_trust_fee_proportion.bind(this)} theme={this.props.theme} power_limit={9} decimal_count={16} pick_with_text_area={true} text_area_hint={'5.3%'}/>
                </div>
            )
        }
        else if(page == 4){
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['653']/* 'Sell Limit' */, 'details':this.props.app_state.loc['654']/* 'The maximum amount of your new token a sender can sell in a transaction.' */, 'size':'l'})}

                    <div style={{height:20}}/>
                    <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['653']/* 'Sell Limit' */, 'number':this.state.default_exchange_amount_sell_limit, 'relativepower':this.props.app_state.loc['646']/* 'tokens' */})}>
                        {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['653']/* 'Sell Limit' */, 'subtitle':this.format_power_figure(this.state.default_exchange_amount_sell_limit), 'barwidth':this.calculate_bar_width(this.state.default_exchange_amount_sell_limit), 'number':this.format_account_balance_figure(this.state.default_exchange_amount_sell_limit), 'barcolor':'', 'relativepower':this.props.app_state.loc['646']/* 'tokens' */, })}
                    </div>

                    <NumberPicker clip_number={this.props.app_state.clip_number} font={this.props.app_state.font} ref={this.number_picker_ref} number_limit={bigInt('1e72')} when_number_picker_value_changed={this.when_default_exchange_amount_sell_limit.bind(this)} theme={this.props.theme} power_limit={54}/>
                </div>
            )
        }

    }

    enter_next_page(){
        var page = this.state.page
        if(page < 18){
            this.setState({page: this.state.page+1})
            this.reset_the_number_picker()
        }
    }

    enter_previous_page(){
        var page = this.state.page
        if(page > 0){
            this.setState({page: this.state.page-1})
            this.reset_the_number_picker()
        }
    }

    constructor(props) {
        super(props);
        this.number_picker_ref = React.createRef();
    }


    reset_the_number_picker(){
        var me = this;
        setTimeout(function() {
            if(me.number_picker_ref.current != null){
                me.number_picker_ref.current.reset_number_picker()
            }
        }, (1 * 1000));  
    }





    render_custom_configuration_token_part(){
        var size = this.props.app_state.size

        if(size == 's'){
            return(
                <div>
                    {this.render_custom_config_small()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" >
                        {this.render_custom_config_medium()}
                    </div>
                    <div className="col-6" >
                        {this.render_custom_config_medium2()}
                    </div>
                </div>
                
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" >
                        {this.render_custom_config_medium()}
                    </div>
                    <div className="col-5" >
                        {this.render_custom_config_medium2()}
                    </div>
                </div>
                
            )
        }
    }


    render_custom_config_medium(){
        return(
            <div>
                {this.render_detail_item('4', {'font':this.props.app_state.font, 'textsize':'15px','text':this.props.app_state.loc['655']/* 'Create a custom E5 token' */})}
                <div style={{height:20}}/>
                {this.render_custom_token_section_parts(0)}
                {this.render_detail_item('0')}
                {this.render_custom_token_section_parts(1)}
                {this.render_detail_item('0')}
                {this.render_custom_token_section_parts(2)}
                {this.render_detail_item('0')}
                {this.render_custom_token_section_parts(3)}
                {this.render_detail_item('0')}
                {this.render_custom_token_section_parts(4)}
                {this.render_detail_item('0')}
                {this.render_custom_token_section_parts(5)}
                {this.render_detail_item('0')}
                {this.render_custom_token_section_parts(6)}
                {this.render_detail_item('0')}
                {this.render_custom_token_section_parts(7)}
                {this.render_detail_item('0')}
                {this.render_custom_token_section_parts(8)}
                {this.render_detail_item('0')}
                {this.render_custom_token_section_parts(9)}
                {this.render_detail_item('0')}
                {this.render_custom_token_section_parts(10)}
                {this.render_detail_item('0')}
            </div>
        )
    }

    render_custom_config_medium2(){
        return(
            <div>
                {this.render_custom_token_section_parts(11)}
                {this.render_detail_item('0')}
                {this.render_custom_token_section_parts(12)}
                {this.render_detail_item('0')}
                {this.render_custom_token_section_parts(13)}
                {this.render_detail_item('0')}
                {this.render_custom_token_section_parts(14)}
                {this.render_detail_item('0')}
                {this.render_custom_token_section_parts(15)}
                {this.render_detail_item('0')}
                {this.render_custom_token_section_parts(16)}
                {this.render_detail_item('0')}
                {this.render_custom_token_section_parts(17)}
                {this.render_detail_item('0')}
                {this.render_custom_token_section_parts(18)}
                {this.render_detail_item('0')}
                {this.render_custom_token_section_parts(19)}
                {this.render_detail_item('0')}
                {this.render_custom_token_section_parts(20)}
                {this.render_detail_item('0')}
                {this.render_custom_token_section_parts(21)}
                {this.render_detail_item('0')}
                {this.render_custom_token_section_parts(22)}
                {this.render_detail_item('0')}
            </div>
        )
    }

    render_custom_config_small(){
        var page = this.state.custom_page
        return(
            <div>
                {this.render_detail_item('4', {'font':this.props.app_state.font, 'textsize':'15px','text':this.props.app_state.loc['655']/* 'Create a custom E5 token' */})}
                <div style={{height:20}}/>
                {this.render_custom_token_section_parts(page)}

                <div style={{height:20}}/>
                <div className="row">
                    <div className="col-6" style={{'padding': '0px 0px 0px 0px'}}>
                        {this.show_custom_previous_button()}
                    </div>
                    <div className="col-6" style={{'padding': '0px 0px 0px 0px'}}>
                        {this.show_custom_next_button()}
                    </div>
                </div>
                <div style={{height:20}}/>
            </div>
        )
    }

    show_custom_next_button(){
        var page = this.state.custom_page
        if(page < 22){
            return(
                <div style={{'padding': '5px'}} onClick={()=>this.enter_custom_next_page()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['641']/* 'Next' */, 'action':''})}
                </div>
            )
        }
    }

    show_custom_previous_button(){
        var page = this.state.custom_page
        if(page != 0){
            return(
                <div style={{'padding': '5px'}} onClick={()=>this.enter_custom_previous_page()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['642']/* 'Previous' */, 'action':''})}
                </div>
            )
        }
    }


    render_custom_token_section_parts(page){
        // var page = this.state.custom_page

        if(page == 0){
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['656']/* 'Set the token type' */, 'details':this.props.app_state.loc['657']/* 'Capped token (with limited supply) or uncapped token (with unlimited supply)' */, 'size':'l'})}
                    <div style={{height:20}}/>

                    <Tags font={this.props.app_state.font} page_tags_object={this.state.new_token_type_tags_object} tag_size={'l'} when_tags_updated={this.when_new_token_type_tags_object.bind(this)} theme={this.props.theme}/>

                </div>
            )
        }
        else if(page == 1){
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['643']/* 'Token Supply' */, 'details':this.props.app_state.loc['644']/* 'The supply of a capped token available for buying (for capped tokens)' */, 'size':'l'})}
                    <div style={{height:20}}/>

                    <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['645']/* 'Token Supply' */, 'number':this.state.token_exchange_liquidity_total_supply, 'relativepower':this.props.app_state.loc['646']/* 'tokens' */})}>
                        {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['645']/* 'Token Supply' */, 'subtitle':this.format_power_figure(this.state.token_exchange_liquidity_total_supply), 'barwidth':this.calculate_bar_width(this.state.token_exchange_liquidity_total_supply), 'number':this.format_account_balance_figure(this.state.token_exchange_liquidity_total_supply), 'barcolor':'', 'relativepower':this.props.app_state.loc['646']/* 'tokens' */, })}
                    </div>

                    <div style={{height:2}}/>
                    {this.render_detail_item('10', {'text':this.props.app_state.loc['647']/* 'Recommended: 100,000,000e2' */, 'textsize':'10px', 'font':this.props.app_state.font})}

                    <NumberPicker clip_number={this.props.app_state.clip_number} font={this.props.app_state.font} ref={this.number_picker_ref} number_limit={bigInt('1e72')} when_number_picker_value_changed={this.when_token_exchange_liquidity_total_supply.bind(this)} theme={this.props.theme} power_limit={63}/>
                </div>
            )
        }
        else if(page == 2){
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['648']/* 'Buy Limit' */, 'details':this.props.app_state.loc['649']/* 'The maximum amount of tokens that can be bought in one transaction.' */, 'size':'l'})}
                    <div style={{height:20}}/>

                    <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['648']/* 'Buy Limit' */, 'number':this.state.default_exchange_amount_buy_limit, 'relativepower':this.props.app_state.loc['646']/* 'tokens' */})}>
                        {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['648']/* 'Buy Limit' */, 'subtitle':this.format_power_figure(this.state.default_exchange_amount_buy_limit), 'barwidth':this.calculate_bar_width(this.state.default_exchange_amount_buy_limit), 'number':this.format_account_balance_figure(this.state.default_exchange_amount_buy_limit), 'barcolor':'', 'relativepower':this.props.app_state.loc['646']/* 'tokens' */, })}
                    </div>

                    <NumberPicker clip_number={this.props.app_state.clip_number} font={this.props.app_state.font} ref={this.number_picker_ref} number_limit={bigInt('1e72')} when_number_picker_value_changed={this.when_default_exchange_amount_buy_limit.bind(this)} theme={this.props.theme} power_limit={54}/>
                </div>
            )
        }
        else if(page == 3){
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['653']/* 'Sell Limit' */, 'details':this.props.app_state.loc['654']/* 'The maximum amount of your new token a sender can sell in a transaction.' */, 'size':'l'})}
                    <div style={{height:20}}/>

                    <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['653']/* 'Sell Limit' */, 'number':this.state.default_exchange_amount_sell_limit, 'relativepower':this.props.app_state.loc['646']/* 'tokens' */})}>
                        {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['653']/* 'Sell Limit' */, 'subtitle':this.format_power_figure(this.state.default_exchange_amount_sell_limit), 'barwidth':this.calculate_bar_width(this.state.default_exchange_amount_sell_limit), 'number':this.format_account_balance_figure(this.state.default_exchange_amount_sell_limit), 'barcolor':'', 'relativepower':this.props.app_state.loc['646']/* 'tokens' */, })}
                    </div>

                    <NumberPicker clip_number={this.props.app_state.clip_number} font={this.props.app_state.font} ref={this.number_picker_ref} number_limit={bigInt('1e72')} when_number_picker_value_changed={this.when_default_exchange_amount_sell_limit.bind(this)} theme={this.props.theme} power_limit={54}/>
                </div>
            )
        }
        else if(page == 4){
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['658']/* 'Minimum Time Between Swap' */, 'details':this.props.app_state.loc['659']/* 'the minimum amount of time a sender has to wait between making a swap for a given token.' */, 'size':'l'})}
                    <div style={{height:20}}/>

                    {this.render_detail_item('3', {'title':this.get_time_diff(this.state.minimum_time_between_swap), 'details':this.props.app_state.loc['658']/* 'Minimum Time Between Swap' */, 'size':'l'})}

                    <DurationPicker font={this.props.app_state.font} ref={this.number_picker_ref} number_limit={bigInt('1e72')} when_number_picker_value_changed={this.when_minimum_time_between_swap.bind(this)} theme={this.props.theme} power_limit={63} loc={this.props.app_state.loc}/>
                </div>
            )
        }
        else if(page == 5){
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['660']/* 'Trust Fee' */, 'details':this.props.app_state.loc['661']/* 'proportion or percentage fee enforced on all contract spending that takes place using token.' */, 'size':'l'})}
                    <div style={{height:20}}/>

                    {this.render_detail_item('3', {'title':this.format_proportion(this.state.trust_fee_proportion), 'details':this.props.app_state.loc['660']/* 'Trust Fee' */, 'size':'l'})}

                    <div style={{height:2}}/>
                    {this.render_detail_item('10', {'text':this.props.app_state.loc['662']/* 'Recommended: 3.5%' */, 'textsize':'10px', 'font':this.props.app_state.font})}

                    <NumberPicker clip_number={this.props.app_state.clip_number} font={this.props.app_state.font} ref={this.number_picker_ref} number_limit={bigInt('1e18')} when_number_picker_value_changed={this.when_trust_fee_proportion.bind(this)} theme={this.props.theme} power_limit={9} decimal_count={16} pick_with_text_area={true} text_area_hint={'5.3%'}/>
                    
                </div>
            )
        }
        else if(page == 6){
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['663']/* 'Minimum Transactions Between Swap' */, 'details':this.props.app_state.loc['664']/* 'The minimum number of transactions sender has to make between swaps for your new token.' */, 'size':'l'})}
                    <div style={{height:20}}/>
                    
                    <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['663']/* 'Minimum Transactions Between Swap' */, 'number':this.state.minimum_transactions_between_swap, 'relativepower':this.props.app_state.loc['665']/* 'transactions' */})}>
                        {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['663']/* 'Minimum Transactions Between Swap' */, 'subtitle':this.format_power_figure(this.state.minimum_transactions_between_swap), 'barwidth':this.calculate_bar_width(this.state.minimum_transactions_between_swap), 'number':this.format_account_balance_figure(this.state.minimum_transactions_between_swap), 'barcolor':'', 'relativepower':this.props.app_state.loc['665']/* 'transactions' */, })}
                    </div>

                    <NumberPicker clip_number={this.props.app_state.clip_number} font={this.props.app_state.font} ref={this.number_picker_ref} number_limit={999} when_number_picker_value_changed={this.when_minimum_transactions_between_swap.bind(this)} theme={this.props.theme} power_limit={63}/>
                </div>
            )
        }
        else if(page == 7){
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['666']/* 'Minimum Blocks Between Swap' */, 'details':this.props.app_state.loc['667']/* 'the minimum number of blocks sender has to wait between making a swap for your new token.' */, 'size':'l'})}
                    <div style={{height:20}}/>
                    
                    <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['666']/* 'Minimum Blocks Between Swap' */, 'number':this.state.minimum_blocks_between_swap, 'relativepower':this.props.app_state.loc['668']/* 'blocks' */})}>
                        {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['666']/* 'Minimum Blocks Between Swap' */, 'subtitle':this.format_power_figure(this.state.minimum_blocks_between_swap), 'barwidth':this.calculate_bar_width(this.state.minimum_blocks_between_swap), 'number':this.format_account_balance_figure(this.state.minimum_blocks_between_swap), 'barcolor':'', 'relativepower':this.props.app_state.loc['668']/* 'blocks' */, })}
                    </div>

                    <NumberPicker clip_number={this.props.app_state.clip_number} font={this.props.app_state.font} ref={this.number_picker_ref} number_limit={999} when_number_picker_value_changed={this.when_minimum_blocks_between_swap.bind(this)} theme={this.props.theme} power_limit={63}/>
                </div>
            )
        }
        else if(page == 8){
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['669']/* 'Minimum Entered Contracts Between Swap' */, 'details':this.props.app_state.loc['670']/* 'the minimum amount of contracts sender should enter before interacting with your new exchange again.' */, 'size':'l'})}
                    <div style={{height:20}}/>
                    
                    <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['669']/* 'Minimum Entered Contracts Between Swap' */, 'number':this.state.minimum_entered_contracts_between_swap, 'relativepower':this.props.app_state.loc['673']/* 'blocks' */})}>
                        {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['669']/* 'Minimum Entered Contracts Between Swap' */, 'subtitle':this.format_power_figure(this.state.minimum_entered_contracts_between_swap), 'barwidth':this.calculate_bar_width(this.state.minimum_entered_contracts_between_swap), 'number':this.format_account_balance_figure(this.state.minimum_entered_contracts_between_swap), 'barcolor':'', 'relativepower':this.props.app_state.loc['673']/* 'blocks' */, })}
                    </div>

                    <NumberPicker clip_number={this.props.app_state.clip_number} font={this.props.app_state.font} ref={this.number_picker_ref} number_limit={999} when_number_picker_value_changed={this.when_minimum_entered_contracts_between_swap.bind(this)} theme={this.props.theme} power_limit={63}/>
                </div>
            )
        }
        else if(page == 9){
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['671']/* 'Minimum Transactions For First Buy' */, 'details':this.props.app_state.loc['672']/* 'The minimum number of transactions sender has to make to buy/sell your new token for the first time.' */, 'size':'l'})}
                    <div style={{height:20}}/>
                    
                    <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['671']/* 'Minimum Transactions For First Buy' */, 'number':this.state.minimum_transactions_for_first_buy, 'relativepower':this.props.app_state.loc['665']/* 'transactions' */})}>
                        {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['671']/* 'Minimum Transactions For First Buy' */, 'subtitle':this.format_power_figure(this.state.minimum_transactions_for_first_buy), 'barwidth':this.calculate_bar_width(this.state.minimum_transactions_for_first_buy), 'number':this.format_account_balance_figure(this.state.minimum_transactions_for_first_buy), 'barcolor':'', 'relativepower':this.props.app_state.loc['665']/* 'transactions' */, })}
                    </div>

                    <NumberPicker clip_number={this.props.app_state.clip_number} font={this.props.app_state.font} ref={this.number_picker_ref} number_limit={999} when_number_picker_value_changed={this.when_minimum_transactions_for_first_buy.bind(this)} theme={this.props.theme} power_limit={63}/>
                </div>
            )
        }
        else if(page == 10){
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['674']/* 'Minimum Entered Contracts For First Buy' */, 'details':this.props.app_state.loc['675']/* 'The minimum number of contracts sender should have entered before first buy.' */, 'size':'l'})}
                    <div style={{height:20}}/>

                    <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['674']/* 'Minimum Entered Contracts For First Buy' */, 'number':this.state.minimum_entered_contracts_for_first_buy, 'relativepower':this.props.app_state.loc['673']/* 'contracts' */})}>
                        {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['674']/* 'Minimum Entered Contracts For First Buy' */, 'subtitle':this.format_power_figure(this.state.minimum_entered_contracts_for_first_buy), 'barwidth':this.calculate_bar_width(this.state.minimum_entered_contracts_for_first_buy), 'number':this.format_account_balance_figure(this.state.minimum_entered_contracts_for_first_buy), 'barcolor':'', 'relativepower':this.props.app_state.loc['673']/* 'contracts' */, })}
                    </div>

                    <NumberPicker clip_number={this.props.app_state.clip_number} font={this.props.app_state.font} ref={this.number_picker_ref} number_limit={999} when_number_picker_value_changed={this.when_minimum_entered_contracts_for_first_buy.bind(this)} theme={this.props.theme} power_limit={63}/>
                    
                </div>
            )
        }
        else if(page == 11){
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['676']/* 'Unlocked Liquidity' */, 'details':this.props.app_state.loc['677']/* 'If set to unlocked, You have direct access to the token exchanges liquidity' */, 'size':'l'})}

                    <div style={{height:20}}/>
                    <Tags font={this.props.app_state.font} page_tags_object={this.state.new_token_unlocked_liquidity_tags_object} tag_size={'l'} when_tags_updated={this.when_new_token_unlocked_liquidity_tags_object.bind(this)} theme={this.props.theme}/>

                    <div style={{height:2}}/>
                    {this.render_detail_item('10', {'text':this.props.app_state.loc['678']/* 'Recommended: unlocked' */, 'textsize':'10px', 'font':this.props.app_state.font})}
                    
                </div>
            )
        }
        else if(page == 12){
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['679']/* 'Unlocked Supply' */, 'details':this.props.app_state.loc['680']/* 'If set to unlocked, you can mint more of the token outside the exchange' */, 'size':'l'})}

                    <div style={{height:20}}/>
                    <Tags font={this.props.app_state.font} page_tags_object={this.state.new_token_unlocked_supply_tags_object} tag_size={'l'} when_tags_updated={this.when_new_token_unlocked_supply_tags_object.bind(this)} theme={this.props.theme}/>

                    <div style={{height:2}}/>
                    {this.render_detail_item('10', {'text':this.props.app_state.loc['681']/* 'Recommended: locked' */, 'textsize':'10px', 'font':this.props.app_state.font})}
                    
                </div>
            )
        }
        else if(page == 13){
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['682']/* 'Fully Custom' */, 'details':this.props.app_state.loc['683']/* 'If set to fully-custom, you have full access to the token exchanges configuration' */, 'size':'l'})}

                    <div style={{height:20}}/>
                    <Tags font={this.props.app_state.font} page_tags_object={this.state.new_token_fully_custom_tags_object} tag_size={'l'} when_tags_updated={this.when_new_token_fully_custom_tags_object.bind(this)} theme={this.props.theme}/>
                    
                    <div style={{height:2}}/>
                    {this.render_detail_item('10', {'text':this.props.app_state.loc['684']/* 'Recommended: fully-custom' */, 'textsize':'10px', 'font':this.props.app_state.font})}
                </div>
            )
        }
        else if(page == 14){
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['685']/* 'Block Limit(For Uncapped Spend Tokens)' */, 'details':this.props.app_state.loc['686']/* 'the maximum amount of your new token that can be minted before the active mint limit is reduced using its internal block halfing proportion.' */, 'size':'l'})}
                    <div style={{height:20}}/>

                    <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['687']/* 'Block Limit' */, 'number':this.state.block_limit, 'relativepower':this.props.app_state.loc['646']/* 'tokens' */})}>
                        {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['687']/* 'Block Limit' */, 'subtitle':this.format_power_figure(this.state.block_limit), 'barwidth':this.calculate_bar_width(this.state.block_limit), 'number':this.format_account_balance_figure(this.state.block_limit), 'barcolor':'', 'relativepower':this.props.app_state.loc['646']/* 'tokens' */, })}
                    </div>

                    <div style={{height:2}}/>
                    {this.render_detail_item('10', {'text':this.props.app_state.loc['688']/* 'Recommended: ' */+this.format_account_balance_figure(bigInt(this.state.default_exchange_amount_buy_limit).multiply(bigInt(2))), 'textsize':'10px', 'font':this.props.app_state.font})}

                    <NumberPicker clip_number={this.props.app_state.clip_number} font={this.props.app_state.font} ref={this.number_picker_ref} number_limit={bigInt('1e72')} when_number_picker_value_changed={this.when_block_limit.bind(this)} theme={this.props.theme} power_limit={63}/>
                    
                </div>
            )
        }
        else if(page == 15){
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['689']/* 'Halving type (for Uncapped Spend Tokens)' */, 'details':this.props.app_state.loc['690']/* 'If set to spread, each minter receives a slightly less ammount than the previous minter in a given block.' */, 'size':'l'})}

                    <div style={{height:20}}/>
                    <Tags font={this.props.app_state.font} page_tags_object={this.state.new_token_halving_type_tags_object} tag_size={'l'} when_tags_updated={this.when_new_token_halving_type_tags_object.bind(this)} theme={this.props.theme}/>

                    <div style={{height:2}}/>
                    {this.render_detail_item('10', {'text':this.props.app_state.loc['691']/* 'Recommended: Spread' */, 'textsize':'10px', 'font':this.props.app_state.font})}
                </div>
            )
        }
        else if(page == 16){
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['692']/* 'Maturity Limit(For Uncapped Spend Tokens)' */, 'details':this.props.app_state.loc['693']/* 'Amount of your token used in calculating the active block limit. If the maturity limit has not been exceeded, the active block limit used is less than its default set value.' */, 'size':'l'})}
                    <div style={{height:20}}/>
                    
                    <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['694']/* 'Maturity Limit' */, 'number':this.state.maturity_limit, 'relativepower':this.props.app_state.loc['646']/* 'tokens' */})}>
                        {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['694']/* 'Maturity Limit' */, 'subtitle':this.format_power_figure(this.state.maturity_limit), 'barwidth':this.calculate_bar_width(this.state.maturity_limit), 'number':this.format_account_balance_figure(this.state.maturity_limit), 'barcolor':'', 'relativepower':this.props.app_state.loc['646']/* 'tokens' */, })}
                    </div>

                    <div style={{height:2}}/>
                    {this.render_detail_item('10', {'text':this.props.app_state.loc['688']/* 'Recommended: ' */+this.format_account_balance_figure(bigInt(this.state.default_exchange_amount_buy_limit).multiply(100)), 'textsize':'10px', 'font':this.props.app_state.font})}

                    <NumberPicker clip_number={this.props.app_state.clip_number} font={this.props.app_state.font} ref={this.number_picker_ref} number_limit={bigInt('1e72')} when_number_picker_value_changed={this.when_maturity_limit.bind(this)} theme={this.props.theme} power_limit={63}/>
                </div>
            )
        }
        else if(page == 17){
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['695']/* 'Internal Block Halving(For Uncapped Spend Tokens)' */, 'details':this.props.app_state.loc['696']/* 'proportion or percentage used in reducing the amount of spend that a sender can mint based on the block limit relative to the current block mint total.(for uncapped tokens)' */, 'size':'l'})}
                    <div style={{height:20}}/>
                    
                    {this.render_detail_item('3', {'title':this.format_proportion(this.state.internal_block_halfing_proportion), 'details':this.props.app_state.loc['697']/* 'Internal Block Halving Proportion' */, 'size':'l'})}

                    <div style={{height:2}}/>
                    {this.render_detail_item('10', {'text':this.props.app_state.loc['698']/* 'Recommended: 40% - 51%' */, 'textsize':'10px', 'font':this.props.app_state.font})}

                    <NumberPicker clip_number={this.props.app_state.clip_number} font={this.props.app_state.font} ref={this.number_picker_ref} number_limit={bigInt('1e18')} when_number_picker_value_changed={this.when_internal_block_halfing_proportion.bind(this)} power_limit={9} theme={this.props.theme} decimal_count={16} pick_with_text_area={true} text_area_hint={'5.3%'}/>
                </div>
            )
        }
        else if(page == 18){
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['699']/* 'Block Limit Reduction(For Uncapped Spend Tokens)' */, 'details':this.props.app_state.loc['700']/* 'proportion or percentage used in reducing the active block limit reduction proportion between blocks if block limit is exceeded in current block.(for uncapped tokens)' */, 'size':'l'})}
                    <div style={{height:20}}/>
                    
                    {this.render_detail_item('3', {'title':this.format_proportion(this.state.block_limit_reduction_proportion), 'details':this.props.app_state.loc['701']/* 'Block Limit Reduction Proportion' */, 'size':'l'})}

                    <div style={{height:2}}/>
                    {this.render_detail_item('10', {'text':this.props.app_state.loc['702']/* 'Recommended: 65% - 91%' */, 'textsize':'10px', 'font':this.props.app_state.font})}

                    <NumberPicker clip_number={this.props.app_state.clip_number} font={this.props.app_state.font} ref={this.number_picker_ref} number_limit={bigInt('1e18')} when_number_picker_value_changed={this.when_block_limit_reduction_proportion.bind(this)} power_limit={9} theme={this.props.theme} decimal_count={16} pick_with_text_area={true} text_area_hint={'5.3%'}/>
                </div>
            )
        }
        else if(page == 19){
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['703']/* 'Block Reset Limit(For Uncapped Spend Tokens)' */, 'details':this.props.app_state.loc['704']/* 'the maximum number of blocks that are counted while reseting active block limit reduction proportion value when multiple blocks have passed without a mint event taking place.' */, 'size':'l'})}
                    <div style={{height:20}}/>
                    
                    <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['705']/* 'Block Reset Limit' */, 'number':this.state.block_reset_limit, 'relativepower':this.props.app_state.loc['668']/* 'blocks' */})}>
                        {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['705']/* 'Block Reset Limit' */, 'subtitle':this.format_power_figure(this.state.block_reset_limit), 'barwidth':this.calculate_bar_width(this.state.block_reset_limit), 'number':this.format_account_balance_figure(this.state.block_reset_limit), 'barcolor':'', 'relativepower':this.props.app_state.loc['668']/* 'blocks' */, })}
                    </div>

                    <div style={{height:2}}/>
                    {this.render_detail_item('10', {'text':this.props.app_state.loc['706']/* 'Recommended: 3' */, 'textsize':'10px', 'font':this.props.app_state.font})}

                    <NumberPicker clip_number={this.props.app_state.clip_number} font={this.props.app_state.font} ref={this.number_picker_ref} number_limit={999} when_number_picker_value_changed={this.when_block_reset_limit.bind(this)} theme={this.props.theme} power_limit={63}/>
                </div>
            )
        }
        else if(page == 20){
            return(
                <div>
                    
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['707']/* 'Block Limit Sensitivity (for Uncapped Spend Tokens)' */, 'details':this.props.app_state.loc['708']/* 'The sensitivity of your new exchange to increasing demand' */, 'size':'l'})}

                    <div style={{height:20}}/>
                    <Tags font={this.props.app_state.font} page_tags_object={this.state.new_token_block_limit_sensitivity_tags_object} tag_size={'l'} when_tags_updated={this.when_new_token_block_limit_sensitivity_tags_object.bind(this)} theme={this.props.theme}/>

                    <div style={{height:2}}/>
                    {this.render_detail_item('10', {'text':this.props.app_state.loc['709']/* 'Recommended: 2' */, 'textsize':'10px', 'font':this.props.app_state.font})}
                </div>
            )
        }
        else if(page == 21){
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['710']/* 'Exchange Ratio X' */, 'details':this.props.app_state.loc['711']/* 'The buy output exchange ratio X for your new token' */, 'size':'l'})}
                    <div style={{height:20}}/>

                    <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['710']/* 'Exchange Ratio X' */, 'number':this.state.token_exchange_ratio_x, 'relativepower':this.props.app_state.loc['646']/* 'tokens' */})}>
                        {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['710']/* 'Exchange Ratio X' */, 'subtitle':this.format_power_figure(this.state.token_exchange_ratio_x), 'barwidth':this.calculate_bar_width(this.state.token_exchange_ratio_x), 'number':this.format_account_balance_figure(this.state.token_exchange_ratio_x), 'barcolor':'', 'relativepower':this.props.app_state.loc['646']/* 'tokens' */, })}
                    </div>

                    <div style={{height:2}}/>
                    {this.render_detail_item('10', {'text':this.props.app_state.loc['688']/* 'Recommended: ' */+this.format_account_balance_figure(this.state.token_exchange_liquidity_total_supply), 'textsize':'10px', 'font':this.props.app_state.font})}

                    <div style={{height:5}}/>

                    {this.render_detail_item('3', {'title':this.format_exchange_ratio(this.state.token_exchange_ratio_x, this.state.token_exchange_ratio_y), 'details':this.props.app_state.loc['712']/* 'Exchange Ratio X:Y' */, 'size':'l'})}

                    <NumberPicker clip_number={this.props.app_state.clip_number} font={this.props.app_state.font} ref={this.number_picker_ref} number_limit={bigInt('1e72')} when_number_picker_value_changed={this.when_token_exchange_ratio_x.bind(this)} theme={this.props.theme} power_limit={63}/>
                    
                </div>
            )
        }
        else if(page == 22){
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['713']/* 'Exchange Ratio Y' */, 'details':this.props.app_state.loc['714']/* 'The buy input exchange ratio Y for your new token' */, 'size':'l'})}
                    <div style={{height:20}}/>
                    
                    <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['713']/* 'Exchange Ratio Y' */, 'number':this.state.token_exchange_ratio_y, 'relativepower':this.props.app_state.loc['646']/* 'tokens' */})}>
                        {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['713']/* 'Exchange Ratio Y' */, 'subtitle':this.format_power_figure(this.state.token_exchange_ratio_y), 'barwidth':this.calculate_bar_width(this.state.token_exchange_ratio_y), 'number':this.format_account_balance_figure(this.state.token_exchange_ratio_y), 'barcolor':'', 'relativepower':this.props.app_state.loc['646']/* 'tokens' */, })}
                    </div>

                    <div style={{height:2}}/>
                    {this.render_detail_item('10', {'text':this.props.app_state.loc['688']/* 'Recommended: ' */+this.format_account_balance_figure(this.state.token_exchange_liquidity_total_supply/100), 'textsize':'10px', 'font':this.props.app_state.font})}

                    <div style={{height:5}}/>

                    {this.render_detail_item('3', {'title':this.format_exchange_ratio(this.state.token_exchange_ratio_x, this.state.token_exchange_ratio_y), 'details':this.props.app_state.loc['712']/* 'Exchange Ratio X:Y' */, 'size':'l'})}

                    <NumberPicker clip_number={this.props.app_state.clip_number} font={this.props.app_state.font} ref={this.number_picker_ref} number_limit={bigInt('1e72')} when_number_picker_value_changed={this.when_token_exchange_ratio_y.bind(this)} theme={this.props.theme} power_limit={63}/>
                </div>
            )
        }
    }

    enter_custom_next_page(){
        var page = this.state.custom_page
        if(page < 22){
            this.setState({custom_page: this.state.custom_page+1})
            this.reset_the_number_picker()
        }
    }

    enter_custom_previous_page(){
        var page = this.state.custom_page
        if(page > 0){
            this.setState({custom_page: this.state.custom_page-1})
            this.reset_the_number_picker()
        }
    }

    format_exchange_ratio(ratio_x, ratio_y){
        // Calculate the ratio
        const gcd = this.calculateGCD(ratio_x, ratio_y);
        const ratio = `${this.format_account_balance_figure(ratio_x / gcd)} : ${this.format_account_balance_figure(ratio_y / gcd)}`;
        return ratio;
    }

    calculateGCD(a, b) {
        if (b === 0) {
            return a;
        }
        return this.calculateGCD(b, a % b);
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

    render_end_token_list(){
        var size = this.props.app_state.size

        if(size == 's'){
            return(
                <div>
                    {this.render_end_token_options()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" >
                        {this.render_end_token_options()}
                    </div>
                    <div className="col-6" >
                        {this.render_empty_views(3)}
                    </div>
                </div>
                
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" >
                        {this.render_end_token_options()}
                    </div>
                    <div className="col-5" >
                        {this.render_empty_views(3)}
                    </div>
                </div>
                
            )
        }
    }


    render_end_token_options(){
        return(
            <div>

                {this.render_detail_item('3', {'title':this.props.app_state.loc['2766']/* 'End Token Supply.' */, 'details':this.props.app_state.loc['2767']/* 'The total supply of the End token that will be minted for you.' */, 'size':'l'})}
                <div style={{height:20}}/>

                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['645']/* 'Token Supply' */, 'number':this.state.token_exchange_liquidity_total_supply, 'relativepower':this.props.app_state.loc['646']/* 'tokens' */})}>
                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['645']/* 'Token Supply' */, 'subtitle':this.format_power_figure(this.state.token_exchange_liquidity_total_supply), 'barwidth':this.calculate_bar_width(this.state.token_exchange_liquidity_total_supply), 'number':this.format_account_balance_figure(this.state.token_exchange_liquidity_total_supply), 'barcolor':'', 'relativepower':this.props.app_state.loc['646']/* 'tokens' */, })}

                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['2779']/* 'Token Depth' */, 'subtitle':this.format_power_figure(this.state.default_depth), 'barwidth':this.calculate_bar_width(this.state.default_depth), 'number':this.format_account_balance_figure(this.state.default_depth), 'barcolor':'', 'relativepower':'??', })}
                </div>

                <NumberPicker clip_number={this.props.app_state.clip_number} font={this.props.app_state.font} ref={this.number_picker_ref} number_limit={bigInt('1e'+(this.get_e5_power_limit()+9))} when_number_picker_value_changed={this.when_end_token_total_supply.bind(this)} theme={this.props.theme} power_limit={this.get_e5_power_limit()}/>

                {this.render_detail_item('0')}



                {this.render_detail_item('3', {'title':this.props.app_state.loc['2780']/* 'Base Liquidity.' */, 'details':this.props.app_state.loc['2781']/* 'Set the base liquidity in End for your End token.' */, 'size':'l'})}
                <div style={{height:20}}/>

                <Tags font={this.props.app_state.font} page_tags_object={this.state.get_end_token_base_liquidity} tag_size={'l'} when_tags_updated={this.when_get_end_token_base_liquidity.bind(this)} theme={this.props.theme}/>

                {this.render_detail_item('0')}



                {this.render_detail_item('3', {'title':this.props.app_state.loc['2782']/* 'Base Stability.' */, 'details':this.props.app_state.loc['2783']/* 'Set the base stability for your new End token. This is equivalent to the tokens sell limit. ' */, 'size':'l'})}
                <div style={{height:20}}/>

                <Tags font={this.props.app_state.font} page_tags_object={this.state.get_end_token_base_stability} tag_size={'l'} when_tags_updated={this.when_get_end_token_base_stability.bind(this)} theme={this.props.theme}/>
            </div>
        )
    }

    when_get_end_token_base_liquidity(tag_obj){
        this.setState({get_end_token_base_liquidity: tag_obj})
    }

    when_get_end_token_base_stability(tag_obj){
        this.setState({get_end_token_base_stability: tag_obj})
    }


    when_end_token_total_supply(number){
        this.setState({token_exchange_liquidity_total_supply: number, default_depth: this.get_default_depth(number)})
    }

    get_e5_power_limit(){
        var current_e5 = this.props.app_state.selected_e5
        var power_limit = this.props.app_state.e5s[current_e5].end_token_power_limit
        if(power_limit == null) return 63
        return power_limit
    }

    get_default_depth(number){
        var number_as_string = number.toString().toLocaleString('fullwide', {useGrouping:false})
        return Math.floor((number_as_string.length-1)/72)
    }









    render_simulator_part(){
         var size = this.props.size

        if(size == 's'){
            return(
                <div style={{}}>
                    {this.render_small_screen_simulator()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" >
                        {this.render_config_ui()}
                        
                    </div>
                    <div className="col-6" >
                        {this.render_control_ui()}
                        {this.render_detail_item('0')}
                        {this.render_empty_views(4)}
                    </div>
                </div>
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" >
                        {this.render_config_ui()}
                    </div>
                    <div className="col-5" >
                        {this.render_control_ui()}
                        {this.render_detail_item('0')}
                        {this.render_empty_views(4)}
                    </div>
                </div>
                
            )
        }
    }

    render_small_screen_simulator(){
        var selected_item = this.get_selected_item(this.state.new_token_page_tags_object, this.state.new_token_page_tags_object['i'].active)

        if(selected_item == this.props.app_state.loc['752c']/* 'control' */){
            return(
                <div>
                    {this.render_control_ui()}
                </div>
            )
        }else{
           return(
                <div>
                    {this.render_config_ui()}
                </div>
            ) 
        }
    }

    render_control_ui(){
        const supply_data_points = this.get_total_supply_data_points()
        const rp_data_points = this.get_proportion_ratio_data_points()
        return(
            <div>
                {this.render_simulator_speed_picker()}
                {this.render_detail_item('0')}

                {this.render_detail_item('3', {'title':this.props.app_state.loc['752aj']/* ''Simulated Block Time.' */, 'details':this.props.app_state.loc['752ak']/* 'Set the simulated block time below.' */, 'size':'l'})}

                <div style={{height:20}}/>
                <Tags font={this.props.app_state.font} page_tags_object={this.state.get_simulator_block_time} tag_size={'l'} when_tags_updated={this.when_get_simulator_block_time.bind(this)} theme={this.props.theme}/>
                

                {supply_data_points.dps.length > 0 && (
                    <div>
                        {this.render_detail_item('0')}
                        {this.render_detail_item('3', {'title':this.props.app_state.loc['2580']/* Total Supply' */, 'details':this.props.app_state.loc['752q']/* `Chart containing the total supply of the simulated token over simulated time.` */, 'size':'l'})}
                        {this.render_detail_item('6', {'dataPoints':supply_data_points.dps, 'interval':110, 'hide_label':false, 'start_time':this.state.start_time, 'end_time':this.state.end_time, 'scale': supply_data_points.scale, 'always_update_chart_plugins':true})}
                        <div style={{height: 10}}/>
                        {this.render_detail_item('3', {'title':this.props.app_state.loc['2581']/* 'Y-Axis: Total Supply' */, 'details':this.props.app_state.loc['2391']/* 'X-Axis: Time' */, 'size':'s'})}
                    </div>
                )}


                {rp_data_points.length > 0 && (
                    <div>
                        <div style={{height: 20}}/>
                        {this.render_detail_item('3', {'title':this.props.app_state.loc['701']/* 'Block Limit Reduction Proportion' */, 'details':this.props.app_state.loc['2577']/* 'Chart containing the block limit reduction proportion over time.' */, 'size':'l'})}
                        {this.render_detail_item('6', {'dataPoints':rp_data_points, 'interval':this.get_proportion_ratio_interval_figure(this.filter_proportion_ratio_data(this.state.UpdateProportionRatios)), 'start_time':this.state.start_time, 'end_time':this.state.end_time, 'always_update_chart_plugins':true})}
                        <div style={{height: 10}}/>
                        <Tags font={this.props.app_state.font} page_tags_object={this.state.get_simulator_reduction_proportion_chart_filters} tag_size={'l'} when_tags_updated={this.when_get_simulator_reduction_proportion_chart_filters.bind(this)} theme={this.props.theme}/>
                        <div style={{height: 10}}/>

                        {this.render_detail_item('3', {'title':this.props.app_state.loc['2578']/* Y-Axis: Proportion' */, 'details':this.props.app_state.loc['1461']/* 'X-Axis: Time' */, 'size':'s'})}
                        {this.render_detail_item('0')}
                    </div>
                )}

                
                {this.render_detail_item('3', {'title':this.get_block_speed_value(), 'details':this.props.app_state.loc['752r']/* 'Simulator Block Time.' */, 'size':'l'})}

                <div style={{height: 10}}/>
                {this.render_detail_item('3', {'title':this.format_account_balance_figure(this.state.simulator_block_number), 'details':this.props.app_state.loc['752s']/* 'Simulator Block Number.' */, 'size':'l'})}

                <div style={{height: 10}}/>
                {this.render_detail_item('3', {'title':this.format_proportion(this.state.simulator_active_block_limit_reduction_proportion), 'details':this.props.app_state.loc['752t']/* 'Simulator Active Block Limit Reduction Proportion.' */, 'size':'l'})}

                <div style={{height: 10}}/>
                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['752u']/* 'Total Minted For Current Block' */, 'number':this.state.simulator_total_minted_for_current_block, 'relativepower':this.props.app_state.loc['646']/* 'tokens' */})}>
                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['752u']/* 'Total Minted For Current Block' */, 'subtitle':this.format_power_figure(this.state.simulator_total_minted_for_current_block), 'barwidth':this.calculate_bar_width(this.state.simulator_total_minted_for_current_block), 'number':this.format_account_balance_figure(this.state.simulator_total_minted_for_current_block), 'barcolor':'', 'relativepower':this.props.app_state.loc['646']/* 'tokens' */, })}
                </div>

                <div style={{height: 10}}/>
                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['752v']/* 'Simulated Total Supply.' */, 'number':this.state.simulator_total_supply, 'relativepower':this.props.app_state.loc['646']/* 'tokens' */})}>
                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['752v']/* 'Simulated Total Supply.' */, 'subtitle':this.format_power_figure(this.state.simulator_total_supply), 'barwidth':this.calculate_bar_width(this.state.simulator_total_supply), 'number':this.format_account_balance_figure(this.state.simulator_total_supply), 'barcolor':'', 'relativepower':this.props.app_state.loc['646']/* 'tokens' */, })}
                </div>

                {this.render_detail_item('0')}


                {this.render_detail_item('3', {'title':this.props.app_state.loc['752w']/* 'Pause/Play ' */, 'details':this.props.app_state.loc['752y']/* 'Pause, Start or Resume the simulator with the set configuration.' */, 'size':'l'})}
                <div style={{height:5}}/>
                <div style={{'padding': '5px'}} onClick={()=> this.pause_play()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['752w']/* 'Pause/Play ' */, 'action':''})}
                </div>

                <div style={{height:10}}/>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['752x']/* 'Reset' */, 'details':this.props.app_state.loc['752z']/* 'Stop and Reset the simulator.' */, 'size':'l'})}
                <div style={{height:5}}/>
                <div style={{'padding': '5px'}} onClick={()=> this.reset_sim()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['752x']/* 'Reset' */, 'action':''})}
                </div>

                <div style={{height:10}}/>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['752ah']/* 'Apply Configuration' */, 'details':this.props.app_state.loc['752ai']/* 'Set and apply the simulator`s configuration in your new token.' */, 'size':'l'})}
                <div style={{height:5}}/>
                <div style={{'padding': '5px'}} onClick={()=> this.set_configuration_for_spend_token()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['752ah']/* 'Apply Configuration' */, 'action':''})}
                </div>

            </div>
        )
    }

    get_block_speed_value(){
        var time = this.state.simulator_block_time
        if(time < 1000){
            return time+"ms"
        }
        else if(time < 1000*60){
            return (time/1000) +"s"
        }
        else{
            return (time /(1000*60))+"min"
        }
    }

    get_mint_rate(){
        var sim_time = this.get_simulator_speed()
        var rate = 1000/sim_time
        var x = Math.round(rate * 100) / 100
        return x
    }

    pause_play(){
        if(this.state.simulator_state == 'stopped'){
            this.start_simulator()
            this.setState({simulator_state: 'running'})
            this.props.notify(this.props.app_state.loc['752aa']/* 'Simulator Started' */, 1000);
        }
        else if(this.state.simulator_state == 'running'){
            this.pause_simulator()
            this.setState({simulator_state: 'paused'})
            this.props.notify(this.props.app_state.loc['752ab']/* 'Simulator Paused.' */, 1000);
        }
        else if(this.state.simulator_state == 'paused'){
            this.resume_simulator()
            this.setState({simulator_state: 'running'})
            this.props.notify(this.props.app_state.loc['752ac']/* 'Simulator Resumed.' */, 1000);
        }
    }

    reset_sim(){
        this.reset_simulator()
        this.setState({simulator_state: 'stopped'})
        this.props.notify(this.props.app_state.loc['752ad']/* 'Simulator Stopped.' */, 1000);
    }

    set_configuration_for_spend_token(){
        this.setState({
            new_token_block_limit_sensitivity_tags_object: this.state.sim_block_limit_sensitivity_tags,
            internal_block_halfing_proportion: this.state.simulator_internal_block_halfing_proportion, 
            block_limit_reduction_proportion: this.state.simulator_block_limit_reduction_proportion,
            block_reset_limit: this.state.simulator_block_reset_limit,
            default_exchange_amount_buy_limit: this.state.simulator_mint_limit,
            block_limit: this.state.simulator_block_limit,
            maturity_limit: this.state.simulator_maturity_limit,
            new_token_halving_type_tags_object: this.state.sim_block_halving_type_tags
        })
        this.props.notify(this.props.app_state.loc['752ag']/* 'The simulator configuration has been applied to your new token.' */, 4500)
    }

    when_get_simulator_block_time(tag_obj){
        var obj = {'3sec':3000, '7sec':7000, '12sec':12000, '30sec':30000, '60sec':60000}
        var selected_speed = this.get_selected_item(tag_obj, tag_obj['i'].active)
        var speed = obj[selected_speed]

        this.setState({get_simulator_block_time: tag_obj, simulator_block_time: speed})
        clearInterval(this.interval);
        this.interval = setInterval(() => this.increase_block(), speed);
    }

    

    when_get_simulator_reduction_proportion_chart_filters(tag_obj){
        this.setState({get_simulator_reduction_proportion_chart_filters: tag_obj})
    }

    get_total_supply_data_points(){
        var data =  this.filter_total_supply_data(this.state.UpdateExchangeRatiosEvents)
        if(data.length <= 5) return { dps: [], scale: 1 }

        var xVal = 1, yVal = 0;
        var dps = [];
        var noOfDps = 100;
        var factor = Math.round(data.length/noOfDps) +1;
        // var noOfDps = data.length
        var largest_number = this.get_total_supply_interval_figure(data)
        if(largest_number == 0) largest_number = 1
        for(var i = 0; i < noOfDps; i++) {
            yVal = parseInt(bigInt(data[factor * xVal]).multiply(100).divide(largest_number))
            // yVal = data[factor * xVal]
            // yVal = data[i]
            var val_35 = data.length < noOfDps ? Math.round(data.length * 0.35) : 35
            var val_65 = data.length < noOfDps ? Math.round(data.length * 0.65) : 65
            if(yVal != null && data[factor * xVal] != null){
                if(i == val_35 || i == val_65){
                    dps.push({x: xVal,y: yVal, indexLabel: ""+this.format_account_balance_figure(data[factor * xVal])});//
                }else{
                    dps.push({x: xVal, y: yVal});//
                }
                xVal++;
            }
            
        }

        // console.log('dps', 'get_total_supply_data_points', dps)
        const scale = bigInt(largest_number).divide(100) == 0 ? 1 : bigInt(largest_number).divide(100)
        return { dps: dps, scale: scale }
    }

    filter_total_supply_data(data){
        var length = 0.8 * data.length
        if(length == 0) return []

        var last20PercentCount = Math.ceil(length);
        const last20Percent = data.slice(-last20PercentCount);
        return last20Percent;
    }

    get_total_supply_interval_figure(events){
        var data = []
        events.forEach(event => {
            data.push(bigInt(event))
        });
        var largest = Math.max.apply(Math, data);
        return largest
    }

    get_lowest_total_supply_figure(events){
        var data = []
        events.forEach(event => {
            data.push(bigInt(event))
        });
        var largest = Math.min.apply(Math, data);
        return largest
    }


    get_proportion_ratio_data_points(){
        var data = this.filter_proportion_ratio_data(this.state.UpdateProportionRatios)
        if(data.length <= 5) return []


        var xVal = 1, yVal = 0;
        var dps = [];
        var noOfDps = 100;
        var factor = Math.round(data.length/noOfDps) +1;
        // var noOfDps = data.length
        for(var i = 0; i < noOfDps; i++) {
            yVal = data[factor * xVal]
            // yVal = data[i]
            var val_35 = data.length < noOfDps ? Math.round(data.length * 0.35) : 35
            var val_65 = data.length < noOfDps ? Math.round(data.length * 0.65) : 65
            if(yVal != null){
                if(i == val_35 || i == val_65){
                    dps.push({x: xVal,y: yVal, indexLabel: ""+yVal+"%"});//
                }else{
                    dps.push({x: xVal, y: yVal});//
                }
                xVal++;
            }
            
        }

        return dps
    }

    filter_proportion_ratio_data(data){
        var obj = {'25%':0.25, '50%':0.5, '80%':0.8}
        obj[this.props.app_state.loc['1416']/* 'all-time' */] = 1
        
        var selected_filter = this.get_selected_item(this.state.get_simulator_reduction_proportion_chart_filters, this.state.get_simulator_reduction_proportion_chart_filters['i'].active)

        var f = obj[selected_filter]
        var length = f * data.length
        if(length == 0) return []

        var last20PercentCount = Math.ceil(length);
        const last20Percent = data.slice(-last20PercentCount);
        return last20Percent;
    }

    get_proportion_ratio_interval_figure(events){
        if(events.length == 0) return 110
        var data = []
        events.forEach(event => {
            data.push((event))
        });
        var largest = Math.max.apply(Math, data);
        return largest + 10
    }




    render_config_ui(){
        return(
            <div>
                {this.render_detail_item('4',{'font':this.props.app_state.font, 'textsize':'15px','text':this.props.app_state.loc['752p']/* 'Simulate a Spend token based on a custom configuration of your choice.' */})}
                <div style={{height:10}}/>

                {this.render_detail_item('3', {'title':this.props.app_state.loc['752g']/* 'Block Limit Sensitivity' */, 'details':this.props.app_state.loc['752h']/* 'The sensitivity of the simulated exchange to increasing demand.' */, 'size':'l'})}

                <div style={{height:20}}/>
                <Tags font={this.props.app_state.font} page_tags_object={this.state.sim_block_limit_sensitivity_tags} tag_size={'l'} when_tags_updated={this.when_sim_block_limit_sensitivity_tags.bind(this)} theme={this.props.theme}/>
                <div style={{height:2}}/>
                {this.render_detail_item('10', {'text':this.props.app_state.loc['709']/* 'Recommended: 2' */, 'textsize':'10px', 'font':this.props.app_state.font})}

                {this.render_detail_item('0')}




                {this.render_detail_item('3', {'title':this.props.app_state.loc['752i']/* 'Internal Block Halving' */, 'details':this.props.app_state.loc['696']/* 'proportion or percentage used in reducing the amount of spend that a sender can mint based on the block limit relative to the current block mint total.' */, 'size':'l'})}
                <div style={{height:20}}/>
                {this.render_detail_item('3', {'title':this.format_proportion(this.state.simulator_internal_block_halfing_proportion), 'details':this.props.app_state.loc['697']/* 'Internal Block Halving Proportion' */, 'size':'l'})}

                <div style={{height:2}}/>
                {this.render_detail_item('10', {'text':this.props.app_state.loc['698']/* 'Recommended: 40% - 51%' */, 'textsize':'10px', 'font':this.props.app_state.font})}

                <NumberPicker clip_number={this.props.app_state.clip_number} font={this.props.app_state.font} number_limit={bigInt('1e18')} when_number_picker_value_changed={this.when_simulator_internal_block_halfing_proportion.bind(this)} power_limit={9} theme={this.props.theme} decimal_count={16} pick_with_text_area={true} text_area_hint={'5.3%'}/>

                {this.render_detail_item('0')}





                {this.render_detail_item('3', {'title':this.props.app_state.loc['752j']/* 'Block Limit Reduction.' */, 'details':this.props.app_state.loc['700']/* 'proportion or percentage used in reducing the active block limit reduction proportion between blocks if block limit is exceeded in current block.(for uncapped tokens)' */, 'size':'l'})}
                <div style={{height:20}}/>
                
                {this.render_detail_item('3', {'title':this.format_proportion(this.state.simulator_block_limit_reduction_proportion), 'details':this.props.app_state.loc['701']/* 'Block Limit Reduction Proportion' */, 'size':'l'})}

                <div style={{height:2}}/>
                {this.render_detail_item('10', {'text':this.props.app_state.loc['702']/* 'Recommended: 65% - 91%' */, 'textsize':'10px', 'font':this.props.app_state.font})}

                <NumberPicker clip_number={this.props.app_state.clip_number} font={this.props.app_state.font} ref={this.number_picker_ref} number_limit={bigInt('1e72')} when_number_picker_value_changed={this.when_simulator_block_limit_reduction_proportion.bind(this)} power_limit={9} theme={this.props.theme} decimal_count={16} pick_with_text_area={true} text_area_hint={'5.3%'}/>

                {this.render_detail_item('0')}





                {this.render_detail_item('3', {'title':this.props.app_state.loc['752k']/* 'Block Reset Limit' */, 'details':this.props.app_state.loc['704']/* 'the maximum number of blocks that are counted while reseting active block limit reduction proportion value when multiple blocks have passed without a mint event taking place.' */, 'size':'l'})}
                <div style={{height:20}}/>
                
                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['705']/* 'Block Reset Limit' */, 'number':this.state.simulator_block_reset_limit, 'relativepower':this.props.app_state.loc['668']/* 'blocks' */})}>
                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['705']/* 'Block Reset Limit' */, 'subtitle':this.format_power_figure(this.state.simulator_block_reset_limit), 'barwidth':this.calculate_bar_width(this.state.simulator_block_reset_limit), 'number':this.format_account_balance_figure(this.state.simulator_block_reset_limit), 'barcolor':'', 'relativepower':this.props.app_state.loc['668']/* 'blocks' */, })}
                </div>

                <div style={{height:2}}/>
                {this.render_detail_item('10', {'text':this.props.app_state.loc['706']/* 'Recommended: 3' */, 'textsize':'10px', 'font':this.props.app_state.font})}

                <NumberPicker clip_number={this.props.app_state.clip_number} font={this.props.app_state.font} ref={this.number_picker_ref} number_limit={999} when_number_picker_value_changed={this.when_simulator_block_reset_limit.bind(this)} theme={this.props.theme} power_limit={63}/>

                {this.render_detail_item('0')}



                {this.render_detail_item('3', {'title':this.props.app_state.loc['752l']/* 'Mint Limit' */, 'details':this.props.app_state.loc['649']/* 'The maximum amount of tokens that can be bought in one transaction.' */, 'size':'l'})}
                <div style={{height:20}}/>

                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['752l']/* 'Mint Limit' */, 'number':this.state.simulator_mint_limit, 'relativepower':this.props.app_state.loc['646']/* 'tokens' */})}>
                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['752l']/* 'Mint Limit' */, 'subtitle':this.format_power_figure(this.state.simulator_mint_limit), 'barwidth':this.calculate_bar_width(this.state.simulator_mint_limit), 'number':this.format_account_balance_figure(this.state.simulator_mint_limit), 'barcolor':'', 'relativepower':this.props.app_state.loc['646']/* 'tokens' */, })}
                </div>

                <NumberPicker clip_number={this.props.app_state.clip_number} font={this.props.app_state.font} ref={this.number_picker_ref} number_limit={bigInt('1e72')} when_number_picker_value_changed={this.when_simulator_mint_limit.bind(this)} theme={this.props.theme} power_limit={54}/>

                {this.render_detail_item('0')}





                {this.render_detail_item('3', {'title':this.props.app_state.loc['752m']/* 'Block Limit.' */, 'details':this.props.app_state.loc['686']/* 'the maximum amount of your new token that can be minted before the active mint limit is reduced using its internal block halfing proportion.' */, 'size':'l'})}
                <div style={{height:20}}/>

                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['687']/* 'Block Limit' */, 'number':this.state.simulator_block_limit, 'relativepower':this.props.app_state.loc['646']/* 'tokens' */})}>
                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['687']/* 'Block Limit' */, 'subtitle':this.format_power_figure(this.state.simulator_block_limit), 'barwidth':this.calculate_bar_width(this.state.simulator_block_limit), 'number':this.format_account_balance_figure(this.state.simulator_block_limit), 'barcolor':'', 'relativepower':this.props.app_state.loc['646']/* 'tokens' */, })}
                </div>

                <div style={{height:2}}/>
                {this.render_detail_item('10', {'text':this.props.app_state.loc['688']/* 'Recommended: ' */+this.format_account_balance_figure(bigInt(this.state.simulator_mint_limit).multiply(bigInt(2))), 'textsize':'10px', 'font':this.props.app_state.font})}

                <NumberPicker clip_number={this.props.app_state.clip_number} font={this.props.app_state.font} ref={this.number_picker_ref} number_limit={bigInt('1e72')} when_number_picker_value_changed={this.when_simulator_block_limit.bind(this)} theme={this.props.theme} power_limit={63}/>

                {this.render_detail_item('0')}





                {this.render_detail_item('3', {'title':this.props.app_state.loc['752n']/* 'Simulated Maturity Limit' */, 'details':this.props.app_state.loc['693']/* 'Amount of your token used in calculating the active block limit.' */, 'size':'l'})}
                <div style={{height:20}}/>
                
                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['694']/* 'Maturity Limit' */, 'number':this.state.simulator_maturity_limit, 'relativepower':this.props.app_state.loc['646']/* 'tokens' */})}>
                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['694']/* 'Maturity Limit' */, 'subtitle':this.format_power_figure(this.state.simulator_maturity_limit), 'barwidth':this.calculate_bar_width(this.state.simulator_maturity_limit), 'number':this.format_account_balance_figure(this.state.simulator_maturity_limit), 'barcolor':'', 'relativepower':this.props.app_state.loc['646']/* 'tokens' */, })}
                </div>

                <div style={{height:2}}/>
                {this.render_detail_item('10', {'text':this.props.app_state.loc['688']/* 'Recommended: ' */+this.format_account_balance_figure(bigInt(this.state.simulator_mint_limit).multiply(100)), 'textsize':'10px', 'font':this.props.app_state.font})}

                <NumberPicker clip_number={this.props.app_state.clip_number} font={this.props.app_state.font} ref={this.number_picker_ref} number_limit={bigInt('1e72')} when_number_picker_value_changed={this.when_simulator_maturity_limit.bind(this)} theme={this.props.theme} power_limit={63}/>

                {this.render_detail_item('0')}


                {this.render_detail_item('3', {'title':this.props.app_state.loc['752o']/* 'Simulated Halving type' */, 'details':this.props.app_state.loc['690']/* 'If set to spread, each minter receives a slightly less ammount than the previous minter in a given block.' */, 'size':'l'})}

                <div style={{height:20}}/>
                <Tags font={this.props.app_state.font} page_tags_object={this.state.sim_block_halving_type_tags} tag_size={'l'} when_tags_updated={this.when_sim_block_halving_type_tags.bind(this)} theme={this.props.theme}/>

                <div style={{height:2}}/>
                {this.render_detail_item('10', {'text':this.props.app_state.loc['691']/* 'Recommended: Spread' */, 'textsize':'10px', 'font':this.props.app_state.font})}

            </div>
        )
    }

    render_simulator_speed_picker(){
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['752e']/* 'Mint Volume.' */, 'details':this.props.app_state.loc['752f']/* 'The simulated mint volume to be used.' */, 'size':'l'})}

                <div style={{height:10}}/>
                {this.render_detail_item('3', {'title':this.get_mint_rate()+this.props.app_state.loc['752af']/* ' mints per second' */, 'details':this.props.app_state.loc['752ae']/* 'Rate' */, 'size':'l'})}
                <div style={{height:5}}/>
                <div style={{height:'100%', width:'94%', 'margin':'7px 0px 0px 0px', 'padding':'0px 0px 0px 10px'}}>
                    <Slider value={this.state.simulator_speed}  whenNumberChanged={(e)=>this.when_number_input_slider_changed(e)} unitIncrease={()=>this.when_number_slider_button_tapped()} unitDecrease={()=>this.when_number_slider_button_double_tapped()} theme={this.props.theme}/>
                </div>

            </div>
        )
    }

    when_number_input_slider_changed(number){
        this.setState({simulator_speed: parseInt(number.target.value)})

        var me = this;
        setTimeout(function() {
            if(me.state.simulator_state == 'running') me.update_mint_action_speed()
        }, (1 * 100));
    }

    when_number_slider_button_tapped(){
        var new_number = this.state.simulator_speed +1
        if(new_number < 999){
            this.setState({simulator_speed: new_number})
        }
        var me = this;
        setTimeout(function() {
            if(me.state.simulator_state == 'running') me.update_mint_action_speed()
        }, (1 * 100));
    }

    when_number_slider_button_double_tapped(){
        var new_number = this.state.simulator_speed -1
        if(new_number > 0){
            this.setState({simulator_speed: new_number})
        }
        var me = this;
        setTimeout(function() {
            if(me.state.simulator_state == 'running') me.update_mint_action_speed()
        }, (1 * 100));
    }

    when_sim_block_limit_sensitivity_tags(tag_obj){
        var value = parseInt(this.get_selected_item(tag_obj, tag_obj['i'].active))
        this.setState({sim_block_limit_sensitivity_tags: tag_obj, simulator_block_limit_sensitivity:value})
    }

    when_simulator_internal_block_halfing_proportion(value){
        this.setState({simulator_internal_block_halfing_proportion: value})
    }

    when_simulator_block_limit_reduction_proportion(value){
        this.setState({simulator_block_limit_reduction_proportion: value})
    }

    when_simulator_block_reset_limit(value){
        this.setState({simulator_block_reset_limit: value})
    }

    when_simulator_mint_limit(value){
        this.setState({simulator_mint_limit: value})
    }

    when_simulator_block_limit(value){
        this.setState({simulator_block_limit: value})
    }

    when_simulator_maturity_limit(value){
        this.setState({simulator_maturity_limit: value})
    }

    when_sim_block_halving_type_tags(tag_obj){
        var value = (this.get_selected_item(tag_obj, tag_obj['i'].active) == this.props.app_state.loc['615']/* 'spread' */ ? 1 : 0)
        this.setState({sim_block_halving_type_tags: tag_obj, simulator_block_halving_type: value})
    }





    start_simulator(){
        console.log()
        this.interval = setInterval(() => this.increase_block(), this.state.simulator_block_time);
        this.interval2 = setInterval(() => this.simulate_mint_action(), this.get_simulator_speed());
    }

    pause_simulator() {
        clearInterval(this.interval);
        clearInterval(this.interval2);
    }

    resume_simulator(){
        this.interval = setInterval(() => this.increase_block(), this.state.simulator_block_time);
        this.interval2 = setInterval(() => this.simulate_mint_action(), this.get_simulator_speed());
    }

    reset_simulator(){
        clearInterval(this.interval);
        clearInterval(this.interval2);
        this.reset_simulator_values()
    }

    update_mint_action_speed(){
        clearInterval(this.interval2);
        this.interval2 = setInterval(() => this.simulate_mint_action(), this.get_simulator_speed());
    }


    increase_block(){
        this.setState({simulator_block_number: this.state.simulator_block_number+1})
    }

    get_simulator_speed(){
        var speed = this.state.simulator_speed
        var inv =  1000 - speed
        return inv + 15
    }

    reset_simulator_values(){
        this.setState({
            simulator_block_time:12000,
            simulator_block_number:0,

            simulator_active_mint_block:0,
            simulator_active_block_limit_reduction_proportion: bigInt(bgN(1, 18)),
            simulator_total_minted_for_current_block:0,
            simulator_block_limit_sensitivity:1,/*  */ sim_block_limit_sensitivity_tags:this.get_new_token_block_limit_sensitivity_tags_object(),
            simulator_internal_block_halfing_proportion: bigInt(bgN(50, 16)),/*  */
            simulator_block_limit_reduction_proportion: bigInt(bgN(90, 16)),/*  */
            simulator_block_reset_limit:1,/*  */
            simulator_mint_limit:1000_000,/*  */
            simulator_block_limit:2000_000,/*  */
            simulator_total_supply:0,
            simulator_maturity_limit:5000_000,/*  */
            simulator_block_halving_type:1,/*  */ sim_block_halving_type_tags: this.get_new_token_halving_type_tags_object(),
            UpdateExchangeRatiosEvents:[],
            UpdateProportionRatios:[],
            simulator_speed:100,

            get_simulator_reduction_proportion_chart_filters:this.get_simulator_reduction_proportion_chart_filters(),

            end_time: Date.now()+(1000*60*5),
            start_time: Date.now()
        })
    }



    simulate_mint_action(){
        this.calculate_reduction_proportion_ratios()
        var final_tokens_to_receive = this.calculate_tokens_to_receive()

        this.update_exchange_ratios(final_tokens_to_receive)
        this.update_total_minted_for_current_block(final_tokens_to_receive)
        this.setState({end_time: this.state.end_time+this.get_simulator_speed()})
    }

    calculate_reduction_proportion_ratios(){
        var new_ratio = this.state.simulator_active_block_limit_reduction_proportion;

        if(this.state.simulator_block_number - this.state.simulator_active_mint_block >= 1){
            if(this.state.simulator_total_minted_for_current_block > this.state.simulator_block_limit){
                var sensitivity = this.state.simulator_block_limit_sensitivity;
                if(sensitivity == 0){
                    sensitivity = 1;
                }

                var factor = this.calculate_factor(this.state.simulator_internal_block_halfing_proportion, this.state.simulator_total_minted_for_current_block, this.state.simulator_block_limit)

                if(factor != 0){
                    var new_proportion = this.calculate_share_of_total(this.state.simulator_active_block_limit_reduction_proportion, this.compound(this.state.simulator_block_limit_reduction_proportion, factor * sensitivity))

                    new_ratio = new_proportion == 0 ? 1 : new_proportion
                }

                if(this.state.simulator_block_number - this.state.simulator_active_mint_block > 1){
                    var numerator = bigInt(new_ratio).multiply(10**18)
                    var power = (this.state.simulator_block_number - this.state.simulator_active_mint_block) - 1

                    new_ratio = this.calculate_new_increased_active_block_limit_reduction_proportion(numerator, power, this.state.simulator_block_reset_limit, this.state.simulator_block_limit_reduction_proportion)
                }
            } else{
                if(this.state.simulator_active_block_limit_reduction_proportion < 10**18){
                    var numerator = bigInt(this.state.simulator_active_block_limit_reduction_proportion).multiply(10**18)
                    var power = this.state.simulator_block_number - this.state.simulator_active_mint_block

                    new_ratio = this.calculate_new_increased_active_block_limit_reduction_proportion(numerator, power, this.state.simulator_block_reset_limit, this.state.simulator_block_limit_reduction_proportion)
                }
            }
        }

        if(new_ratio < 1) new_ratio = 1
        this.setState({simulator_active_block_limit_reduction_proportion: new_ratio})
    }

    calculate_factor(p1/* reduction_proportion */, p2/* total_minted_for_current_block */, p3/* max_block_buyable_amount */){
        if(p1/* reduction_proportion */ == 0 || p2/* total_minted_for_current_block */ == 0 || p3/* max_block_buyable_amount */==0){
            /* if one of the values passed is zero, return zero */
            return 0;
        }

        var total_amount = p2/* total_minted_for_current_block */ == 0 ? 1 /* 1 to avoid exception */ : p2/* total_minted_for_current_block */
        var x = bigInt(10**18).divide(p1/* reduction_proportion */)
        var y = bigInt(total_amount).divide(p3/* max_block_buyable_amount */)
        return bigInt(x).times(y);
    }

    compound(p1/* p1: numb  */, p2/* p2: steps */){
        var v1/* val */ = 0;
        v1 /* v1: val */ = p1/* p1: numb  */;
        /* set the return value as the proportion argument */

        if (p2/* p2: steps */ > 1) {
            /* if the number of steps is more than one */

            for (var t = 0; t < p2/* p2: steps */ - 1; t++) {
                /* for each number of steps required */

                v1/* v1: val */ = (bigInt(v1/* v1: val */).times(p1/* p1: numb  */)).divide(10**18); /* (denominator -> 10**18) */
            }
        }
        if(v1/* v1: val */ == 0 && p1/* p1: numb  */ != 0){
            /* if the compounded steps caused the proprtion to be compounded down to zero, set it as 1 */
            v1/* v1: val */ = 1;
        }

        return v1
    }

    calculate_share_of_total(p1, p2){
        if (p1 /* p1: amount */ == 0 || p2 /* p2: proportion */ == 0) return 0;


        return (bigInt(p1/* p1: amount */).times(p2 /* p2: proportion */)).divide(10**18); /* (denominator -> 10**18) */
        /* prevents an overflow incase the amount is large */
    }

    calculate_new_increased_active_block_limit_reduction_proportion(p1/* numerator */, p2/* power */, p3/* block_reset_limit */, p4/* block_limit_reduction_proportion */){
        if (p2/* power */ > p3/* block_reset_limit */ && p3/* block_reset_limit */ != 0) {
            /* if a reset limit exists and the power is greater than it */

            p2/* power */ = p3/* block_reset_limit */;
            /* set the power to be the reset limit */
        }
        else if(p2/* power */ >= 35){
            /* if the power is greater than thirtyfive */

            p2/* power */ = 35;
            /* set it to 35 */
        }
        var v1/* denominator */ = this.compound(p4/* block_limit_reduction_proportion */, p2/* power */);
        /* intialize a denominator variable thats the compounded value of the block limit reduction proportion using the power */

        var v2/* new_val */ = p1/* numerator */ / v1/* denominator */;
        /* then set the return value as the numerator divided by the denominator */

        if ( v2/* new_val */ > 10**18 /* (denominator -> 10**18) */ ) {
            /* if the value is more than 100% */
            v2/* new_val */ = 10**18; /* (denominator -> 10**18) */
            /*  set it to 100% */
        }
        return v2/* new_val */;
    }


    calculate_tokens_to_receive(){
        var active_mintable_amount = this.calculate_active_mintable_amounts()
        var tokens_to_receive_data = this.calculate_tokens_setup(active_mintable_amount)
        var final_tokens_to_receive = this.calculate_final_tokens_to_receive(tokens_to_receive_data, active_mintable_amount)

        return final_tokens_to_receive;
    }


    calculate_active_mintable_amounts(){
        return this.calculate_share_of_total(this.state.simulator_mint_limit, this.state.simulator_active_block_limit_reduction_proportion)
    }

    calculate_tokens_setup(active_mintable_amount){
        return this.get_tokens_to_receive(active_mintable_amount)
    }


    get_tokens_to_receive(active_mintable_amount){
        var active_block_limit = this.get_active_block_limit(this.state.simulator_block_limit, this.state.simulator_mint_limit, this.state.simulator_total_supply, this.state.simulator_maturity_limit)

        var factor = this.calculate_factor(this.state.simulator_internal_block_halfing_proportion, this.state.simulator_total_minted_for_current_block, active_block_limit)

        var factor_amount = active_mintable_amount

        if(factor > 0){
            factor_amount = factor > active_mintable_amount ? 1 : bigInt(active_mintable_amount).divide(factor)
        }

        if(this.state.simulator_block_halving_type == 1){
            factor_amount = this.calculate_spread_factor_amount(this.state.simulator_internal_block_halfing_proportion, this.state.simulator_total_minted_for_current_block, active_block_limit, factor_amount)
        }

        var ir_parent = 1000
        var or_parent = 1000

        return [factor, ir_parent, or_parent, factor_amount]
    }

    get_active_block_limit(p1/* block_limit */, p2/* mint_limit */, p3/* total_supply */, p4/* maturity_limit */){
        var v = p1/* block_limit */

        if (p4/* maturity_limit */ != 0 && p3/* total_supply */ < p4/* maturity_limit */) {
            v/* active_block_limit */ = (bigInt(p3/* total_supply */).times(p1/* block_limit */)).divide(p4/* maturity_limit */);


            if (v/* active_block_limit */ < p2/* mint_limit */) {
                v/* active_block_limit */ = p2/* mint_limit */;
            }
        }

        return v/* active_block_limit */
    }

    calculate_spread_factor_amount( p1/* internal_block_halfing_proportion */, p2/* total_minted_for_current_block */, p3/* block_limit */, p4/* factor_amount */){
        var v1/* mod_amm */ = p2/* total_minted_for_current_block */ == 0 ? 0 : bigInt(p2/* total_minted_for_current_block */).mod(p3/* block_limit */);
        
        if (v1/* mod_amm */ == 0) {
            return p4/* factor_amount */;
        }

        var v2/* sub_amount */ = 0;
        var v3/* rem */ = this.calculate_share_of_total(p4/* factor_amount */, (10**18 - p1/* internal_block_halfing_proportion */) );


        v2/* sub_amount */ = ((bigInt(v1/* mod_amm */).multiply(v3/* rem */)).divide(p3/* block_limit */));
        return bigInt(p4/* factor_amount */).minus(v2/* sub_amount */)
    }

    calculate_final_tokens_to_receive(tokens_to_receive_data, active_mintable_amount){
        var amount = tokens_to_receive_data[0] == 0 ? active_mintable_amount : tokens_to_receive_data[3]
        return this.price(amount, tokens_to_receive_data[1], tokens_to_receive_data[2])
    }

    price(amount, input_reserve_ratio, output_reserve_ratio){
        return amount
    }

    update_exchange_ratios(final_tokens_to_receive){
        var new_amount = bigInt(this.state.simulator_total_supply).plus(final_tokens_to_receive)
        var clone = this.state.UpdateExchangeRatiosEvents.slice()
        clone.push(new_amount)
        this.setState({simulator_total_supply: new_amount, UpdateExchangeRatiosEvents: clone})
    }

    update_total_minted_for_current_block(final_tokens_to_receive){
        if(this.state.simulator_block_limit != 0){
            if(this.state.simulator_active_mint_block != this.state.simulator_block_number){
                this.setState({simulator_total_minted_for_current_block: final_tokens_to_receive, simulator_active_mint_block: this.state.simulator_block_number})
            }else{
                this.setState({simulator_total_minted_for_current_block: bigInt(this.state.simulator_total_minted_for_current_block).plus(final_tokens_to_receive)})
            }
            var clone = this.state.UpdateProportionRatios.slice()
            var x = this.format_percentage(this.state.simulator_active_block_limit_reduction_proportion)
            clone.push(x)
            this.setState({UpdateProportionRatios:clone})
        }
    }

    format_percentage(p){
        var x = (p / (10**18)) * 100
        return Math.round(x * 1000) / 1000
    }












    render_token_authorities_part(){
        var size = this.props.size

        if(size == 's'){
            return(
                <div style={{}}>
                    {this.render_exchange_authority_trust_fee_target()}
                    {this.render_moderator_interactible_ui()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" >
                        {this.render_exchange_authority_trust_fee_target()}
                    </div>
                    <div className="col-6" >
                        {this.render_moderator_interactible_ui()}
                    </div>
                </div>
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" >
                        {this.render_exchange_authority_trust_fee_target()}
                    </div>
                    <div className="col-5" >
                        {this.render_moderator_interactible_ui()}
                    </div>
                </div>
                
            )
        }
    }  

    render_exchange_authority_trust_fee_target(){
        return(
            <div style={{}}>

                {this.render_detail_item('3', {'title':this.props.app_state.loc['715']/* 'Access Rights' */, 'details':this.props.app_state.loc['716']/* 'If enabled, access to the exchange will be restricted to moderators and specified accounts' */, 'size':'l'})}

                <div style={{height:20}}/>
                <Tags font={this.props.app_state.font} page_tags_object={this.state.new_token_access_rights_tags_object} tag_size={'l'} when_tags_updated={this.when_new_token_access_rights_tags_object.bind(this)} theme={this.props.theme}/>

                {this.render_detail_item('0')}

                {this.render_detail_item('3', {'title':this.props.app_state.loc['717']/* 'Exchange Authority ID' */, 'details':this.props.app_state.loc['718']/* 'The account set to control the exchange' */, 'size':'l'})}

                <div style={{height:10}}/>
                <TextInput font={this.props.app_state.font} height={30} placeholder={this.props.app_state.loc['719']/* 'Set Exchange Authority ID' */} when_text_input_field_changed={this.when_exchange_authority_input_field_changed.bind(this)} text={this.state.exchange_authority} theme={this.props.theme}/>
                
                {this.load_account_suggestions('exchange_authority')}
                <div style={{height: 20}}/>

                {this.render_detail_item('3', {'title':this.props.app_state.loc['720']/* 'Trust Fee Target ID' */, 'details':this.props.app_state.loc['721']/* 'The account set to receive trust fee when collected from contract spend actions' */, 'size':'l'})}

                <div style={{height:10}}/>
                <TextInput font={this.props.app_state.font} height={30} placeholder={this.props.app_state.loc['722']/* 'Set Trust Fee Target ID' */} when_text_input_field_changed={this.when_trust_fee_target_input_field_changed.bind(this)} text={this.state.trust_fee_target} theme={this.props.theme}/>

                {this.load_account_suggestions('trust_fee_target')}
                {this.render_detail_item('0')}
                
            </div>
        )
    }

    when_exchange_authority_input_field_changed(text){
        this.setState({exchange_authority: text})
    }

    when_trust_fee_target_input_field_changed(text){
        this.setState({trust_fee_target: text})
    }

    when_new_token_access_rights_tags_object(tag_obj){
        this.setState({new_token_access_rights_tags_object: tag_obj})
    }


    load_account_suggestions(target_type){
        var items = [].concat(this.get_suggested_accounts(target_type))
        var background_color = this.props.theme['card_background_color']
        var card_shadow_color = this.props.theme['card_shadow_color']
        return(
            <div style={{'margin':'0px 0px 0px 5px','padding': '5px 0px 7px 0px', width: '97%', 'background-color': 'transparent'}}>
                <ul style={{'list-style': 'none', 'padding': '0px 0px 5px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '13px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                    {items.map((item, index) => (
                        <li style={{'display': 'inline-block', 'margin': '5px 5px 5px 5px', '-ms-overflow-style': 'none'}} onClick={() => this.when_suggestion_clicked(item, index, target_type)}>
                            {this.render_detail_item('3', item['label'])}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    get_suggested_accounts(target_type){
        return[
            {'id':'53', 'label':{'title':this.props.app_state.loc['723']/* 'My Account' */, 'details':this.props.app_state.loc['724']/* 'Account' */, 'size':'s'}},
        ].concat(this.get_account_suggestions(target_type))
    }

    get_account_suggestions(target_type){
        var contacts = this.props.app_state.contacts[this.props.app_state.selected_e5]
        if(contacts == null) contacts = [];
        var return_array = []

        if(target_type == 'exchange_authority'){
            contacts.forEach(contact => {
                if(contact['id'].toString().includes(this.state.exchange_authority)){
                    return_array.push({'id':contact['id'],'label':{'title':contact['id'], 'details':this.get_contact_alias(contact), 'size':'s'}})
                }
            });
            return_array = this.filter_and_add_other_accounts(this.state.exchange_authority, return_array)
        }
        else if(target_type == 'trust_fee_target'){
            contacts.forEach(contact => {
                if(contact['id'].toString().includes(this.state.trust_fee_target)){
                    return_array.push({'id':contact['id'],'label':{'title':contact['id'], 'details':this.get_contact_alias(contact), 'size':'s'}})
                }
            });
            return_array = this.filter_and_add_other_accounts(this.state.trust_fee_target, return_array)
        }
        else if(target_type == 'moderator_id'){
            contacts.forEach(contact => {
                if(contact['id'].toString().includes(this.state.moderator_id)){
                    return_array.push({'id':contact['id'],'label':{'title':contact['id'], 'details':this.get_contact_alias(contact), 'size':'s'}})
                }
            });
            return_array = this.filter_and_add_other_accounts(this.state.moderator_id, return_array)
        }
        else if(target_type == 'interactible_id'){
            contacts.forEach(contact => {
                if(contact['id'].toString().includes(this.state.interactible_id)){
                    return_array.push({'id':contact['id'],'label':{'title':contact['id'], 'details':this.get_contact_alias(contact), 'size':'s'}})
                }
            });
            return_array = this.filter_and_add_other_accounts(this.state.interactible_id, return_array)
        }
        
        return return_array;
    }

    filter_and_add_other_accounts(typed_name, return_array){
        if(typed_name.length < 3){
            return return_array
        }
        const added_aliases = []
        return_array.forEach(item => {
            added_aliases.push(item['label']['details'])
        });

        return return_array.concat(this.get_all_aliases(added_aliases, typed_name))
    }

    get_all_aliases(added_aliases, typed_name){
        const aliases = []
        // const e5s = Object.keys(this.props.app_state.alias_bucket)
        // e5s.forEach(e5 => {
        //     const accounts = Object.keys(this.props.app_state.alias_bucket[e5])
        //     accounts.forEach(account_id => {
        //         const alias = this.props.app_state.alias_bucket[e5][account_id]
        //         if(!added_aliases.includes(alias) && alias.startsWith(typed_name.toLowerCase())){
        //             aliases.push({'id':account_id,'label':{'title':account_id, 'details':alias, 'size':'s'}})
        //         }
        //     });
        // });
        const e5 = this.props.app_state.selected_e5
        const accounts = Object.keys(this.props.app_state.alias_bucket[e5])
        accounts.forEach(account_id => {
            const alias = this.props.app_state.alias_bucket[e5][account_id]
            if(!added_aliases.includes(alias) && alias.startsWith(typed_name.toLowerCase())){
                aliases.push({'id':account_id,'label':{'title':account_id, 'details':alias, 'size':'s'}})
            }
        });

        return aliases
    }

    get_contact_alias(contact){
        return (this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[contact['id']] == null ? ((contact['address'].toString()).substring(0, 9) + "...") : this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[contact['id']])
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

    when_suggestion_clicked(item, pos, target_type){
        if(target_type == 'exchange_authority'){
            this.setState({exchange_authority: item['id']})
        }
        else if(target_type == 'trust_fee_target'){
            this.setState({trust_fee_target: item['id']})
        }
        else if(target_type == 'moderator_id'){
            this.setState({moderator_id: item['id']})
        }
        else if(target_type == 'interactible_id'){
            this.setState({interactible_id: item['id']})
        }

    }


    render_moderator_interactible_ui(){
        return(
            <div>
                <Tags font={this.props.app_state.font} page_tags_object={this.state.new_token_interactible_moderator_tags_object} tag_size={'l'} when_tags_updated={this.when_new_token_interactible_moderator_tags_object.bind(this)} theme={this.props.theme}/>

                {this.render_moderator_or_interactible_setting()}
            </div>
        )
    }

    when_new_token_interactible_moderator_tags_object(tag_obj){
        this.setState({new_token_interactible_moderator_tags_object: tag_obj})
    }

    render_moderator_or_interactible_setting(){
        var selected_item = this.get_selected_item(this.state.new_token_interactible_moderator_tags_object, this.state.new_token_interactible_moderator_tags_object['i'].active)

        if(selected_item == this.props.app_state.loc['618']/* 'moderators' */ || selected_item == 'e'){
            return(
                <div>
                    {this.render_moderator_settings()}
                </div>
            )    
        }
        else if(selected_item == this.props.app_state.loc['619']/* 'interactible' */){
            return(
                <div>
                    {this.render_interactible_settings()}
                </div>
            ) 
        }
    }


    render_moderator_settings(){
        return(
            <div>
                <div style={{height:20}}/>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['726']/* 'Moderator ID' */, 'details':this.props.app_state.loc['727']/* 'Set the account id for your targeted moderator' */, 'size':'l'})}

                <div style={{height:10}}/>
                <TextInput font={this.props.app_state.font} height={30} placeholder={this.props.app_state.loc['727']/* 'Moderator ID' */} when_text_input_field_changed={this.when_moderator_id_input_field_changed.bind(this)} text={this.state.moderator_id} theme={this.props.theme}/>

                {this.load_account_suggestions('moderator_id')}
                <div style={{'padding': '5px'}} onClick={() => this.when_add_moderator_button_tapped()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['728']/* 'Add Moderator' */, 'action':''})}
                </div>

                {this.render_added_moderators()}
            </div>
        )
    }

    when_moderator_id_input_field_changed(text){
        this.setState({moderator_id: text})
    }

    async when_add_moderator_button_tapped(){
        var moderator_id = await this.get_typed_alias_id(this.state.moderator_id.toString().trim())
        var moderators_clone = this.state.moderators.slice()
        if(isNaN(moderator_id) || parseInt(moderator_id) < 0 || moderator_id == ''){
            this.props.notify(this.props.app_state.loc['729']/* 'please put a valid account id' */, 600)
        }
        else if(moderators_clone.includes(parseInt(moderator_id))){
            this.props.notify(this.props.app_state.loc['162n'], 4600)
        }
        else{   
            moderators_clone.push(parseInt(moderator_id))
            this.setState({moderators: moderators_clone});
            this.props.notify(this.props.app_state.loc['730']/* 'added moderator!' */, 400)
        }
    }

    async get_typed_alias_id(alias){
        if(!isNaN(alias)){
            return alias
        }
        await this.props.get_account_id_from_alias(alias)
        var id = (this.props.app_state.alias_owners[this.props.app_state.selected_e5][alias] == null ? 
            alias : this.props.app_state.alias_owners[this.props.app_state.selected_e5][alias])

        return id
    }

    render_added_moderators(){
        var middle = this.props.height-500;
        var size = this.props.size;
        if(size == 'm'){
            middle = this.props.height-100;
        }
        var items = [].concat(this.state.moderators)

        if(items.length == 0){
            items = [0,3,0]
            return(
                <div style={{}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px', 'list-style':'none'}}>
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
            )
        }else{
            return(
                <div style={{}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px', 'list-style':'none'}}>
                        {items.reverse().map((item, index) => (
                            <li style={{'padding': '5px'}} onClick={()=>this.when_moderator_account_clicked(item)}>
                                {this.render_detail_item('3', {'title':''+item, 'details':this.props.app_state.loc['731']/* 'Account ID' */, 'size':'l'})}
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
    }

    when_moderator_account_clicked(item){
        var cloned_array = this.state.moderators.slice()
        const index = cloned_array.indexOf(item);
        if (index > -1) { // only splice array when item is found
            cloned_array.splice(index, 1); // 2nd parameter means remove one item only
        }
        this.setState({moderators: cloned_array})
    }

    render_interactible_settings(){
        return(
            <div>
                <div style={{height:20}}/>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['732']/* 'Interactible ID' */, 'details':this.props.app_state.loc['733']/* 'Set the account id for your targeted account, and expiry time for their interactibility' */, 'size':'l'})}

                <div style={{height:10}}/>
                <TextInput font={this.props.app_state.font} height={30} placeholder={this.props.app_state.loc['732']/* 'Interactible ID' */} when_text_input_field_changed={this.when_interactible_id_input_field_changed.bind(this)} text={this.state.interactible_id} theme={this.props.theme}/>

                {this.load_account_suggestions('interactible_id')}

                <div style={{height:20}}/>

                <ThemeProvider theme={createTheme({ palette: { mode: this.props.theme['calendar_color'], }, })}>
                    <CssBaseline />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <StaticDateTimePicker orientation="portrait" onChange={(newValue) => this.when_new_dat_time_value_set(newValue)}/>
                    </LocalizationProvider>
                </ThemeProvider>

                <div style={{height:20}}/>
                <div style={{'padding': '5px'}} onClick={() => this.when_add_interactible_button_tapped()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['734']/* 'Add Interactible Account' */, 'action':''})}
                </div>
                
                <div style={{height:20}}/>
                {this.render_set_interactible_accounts()}
            </div>
        )
    }

    when_interactible_id_input_field_changed(text){
        this.setState({interactible_id: text})
    }

    when_new_dat_time_value_set(value){
        const selectedDate = value instanceof Date ? value : new Date(value);
        const timeInSeconds = Math.floor(selectedDate.getTime() / 1000);
        this.setState({interactible_timestamp: timeInSeconds})
    }

    async when_add_interactible_button_tapped(){
        var interactible_id = await this.get_typed_alias_id(this.state.interactible_id.toString().trim())
        var interactibles_clone = this.state.interactibles.slice()
        if(isNaN(interactible_id) || parseInt(interactible_id) < 0 || interactible_id == ''){
            this.props.notify(this.props.app_state.loc['735']/* 'please put a valid account id' */, 600)
        }
        else if(this.state.interactible_timestamp < (new Date().getTime()/1000)){
            this.props.notify(this.props.app_state.loc['236'], 2600)
        }
        else if(this.is_interactable_included(interactible_id, interactibles_clone)){
            this.props.notify(this.props.app_state.loc['162n'], 3600)
        }
        else{
            interactibles_clone.push({'id': interactible_id, 'timestamp':this.state.interactible_timestamp})
            this.setState({interactibles: interactibles_clone});
            this.props.notify(this.props.app_state.loc['736']/* 'added interactible account!' */, 400)
        }
    }

    is_interactable_included(id, clone){
        var has_been_added = false
        clone.forEach(item => {
            var added_id = item['id']
            if(id == added_id){
                has_been_added = true
            }
        });
        return has_been_added
    }

    // get_typed_alias_id(alias){
    //     if(!isNaN(alias)){
    //         return alias
    //     }
    //     var id = (this.props.app_state.alias_owners[this.props.app_state.selected_e5][alias] == null ? 
    //         alias : this.props.app_state.alias_owners[this.props.app_state.selected_e5][alias])

    //     return id
    // }

    render_set_interactible_accounts(){
        var middle = this.props.height-500;
        var size = this.props.size;
        if(size == 'm'){
            middle = this.props.height-100;
        }
        var items = [].concat(this.state.interactibles)

        if(items.length == 0){
            items = [0,3,0]
            return(
                <div style={{}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px', 'list-style':'none'}}>
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
            )
        }else{
            return(
                <div style={{}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px', 'list-style':'none'}}>
                        {items.reverse().map((item, index) => (
                            <li style={{'padding': '5px'}} onClick={()=>this.when_interactible_account_clicked(item)}>
                                {this.render_detail_item('3', {'title':'Interactible Account ID: '+item['id'], 'details':'Until: '+(new Date(item['timestamp']*1000)), 'size':'l'})}
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
    }

    when_interactible_account_clicked(item){
        var cloned_array = this.state.interactibles.slice()
        const index = cloned_array.indexOf(item);
        if (index > -1) { // only splice array when item is found
            cloned_array.splice(index, 1); // 2nd parameter means remove one item only
        }
        this.setState({interactibles: cloned_array})
    }




    render_set_token_prices_list(){
        var size = this.props.size
        var height = this.props.height-150

        if(size == 's'){
            return(
                <div style={{ 'overflow-x':'hidden'}}>
                    {this.render_set_token_and_amount_part()}
                    <div style={{height: 20}}/>
                    {this.render_set_prices_list_part()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" >
                        {this.render_set_token_and_amount_part()}
                    </div>
                    <div className="col-6" >
                        {this.render_set_prices_list_part()}
                    </div>
                </div>
                
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" >
                        {this.render_set_token_and_amount_part()}
                    </div>
                    <div className="col-5" >
                        {this.render_set_prices_list_part()}
                    </div>
                </div>
                
            )
        }
    }

    render_set_token_and_amount_part(){
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['737']/* 'Exchange ID' */, 'details':this.props.app_state.loc['738']/* 'The an exchange by its id, then the desired price and click add' */, 'size':'l'})}

                <div style={{height:10}}/>
                <TextInput font={this.props.app_state.font} height={30} placeholder={this.props.app_state.loc['737']/* 'Exchange ID' */} when_text_input_field_changed={this.when_exchange_id_input_field_changed.bind(this)} text={this.state.exchange_id} theme={this.props.theme}/>

                {this.load_token_suggestions('exchange_id')}
                <div style={{height: 20}}/>

                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['739']/* 'Price' */, 'number':this.state.price_amount, 'relativepower':this.props.app_state.loc['646']/* 'tokens' */})}>
                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['739']/* 'Price' */, 'subtitle':this.format_power_figure(this.state.price_amount), 'barwidth':this.calculate_bar_width(this.state.price_amount), 'number':this.format_account_balance_figure(this.state.price_amount), 'barcolor':'', 'relativepower':this.props.app_state.loc['646']/* 'tokens' */, })}
                </div>

                <NumberPicker clip_number={this.props.app_state.clip_number} font={this.props.app_state.font} number_limit={bigInt('1e72')} when_number_picker_value_changed={this.when_price_amount.bind(this)} theme={this.props.theme} power_limit={63}/>

                {this.render_detail_item('0')}

                <div style={{'padding': '5px'}} onClick={() => this.when_add_price_set()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['740']/* 'Add Price' */, 'action':''})}
                </div>
            </div>
        )
    }

    load_token_suggestions(target_type){
        var items = [].concat(this.get_suggested_tokens(target_type))
        var background_color = this.props.theme['card_background_color']
        var card_shadow_color = this.props.theme['card_shadow_color']
        return(
            <div style={{'margin':'0px 0px 0px 5px','padding': '5px 0px 7px 0px', width: '97%', 'background-color': 'transparent'}}>
                    <ul style={{'list-style': 'none', 'padding': '0px 0px 5px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '13px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                      {items.map((item, index) => (
                          <li style={{'display': 'inline-block', 'margin': '5px 5px 5px 5px', '-ms-overflow-style': 'none'}} onClick={() => this.when_price_suggestion_clicked(item, index, target_type)}>
                              {this.render_detail_item('14', item['label'])}
                          </li>
                      ))}
                  </ul>
                </div>
        )
    }

    get_suggested_tokens(target_type){
        var items = [
            {'id':'3', 'label':{'title':this.props.app_state.loc['3078']/* END */, 'details':this.props.app_state.selected_e5, 'size':'s', 'image':this.props.app_state.e5s[this.props.app_state.selected_e5].end_image, 'img_size':30}},
            {'id':'5', 'label':{'title':this.props.app_state.loc['3079']/* SPEND */, 'details':this.props.app_state.selected_e5.replace('E', '3'), 'size':'s', 'image':this.props.app_state.e5s[this.props.app_state.selected_e5].spend_image, 'img_size':30}},
        ];
        var exchanges_from_sync = this.props.app_state.created_tokens[this.props.app_state.selected_e5]
        if(exchanges_from_sync == null) exchanges_from_sync = []
        var me = this;
        exchanges_from_sync = exchanges_from_sync.filter(function (exchange) {
            return (me.is_exchange_searched(exchange, target_type))
        })
        var sorted_token_exchange_data = []
        // var myid = this.props.app_state.user_account_id
        for (let i = 0; i < exchanges_from_sync.length; i++) {
            var exchange_e5 = exchanges_from_sync[i]['e5']
            var myid = this.props.app_state.user_account_id[exchange_e5]

            var author_account = exchanges_from_sync[i]['event'] == null ? '':exchanges_from_sync[i]['event'].returnValues.p3.toString() 
            if(author_account == myid.toString()){
                sorted_token_exchange_data.push(exchanges_from_sync[i])
            }
        }
        sorted_token_exchange_data.reverse()
        for (let i = 0; i < exchanges_from_sync.length; i++) {
            if(!sorted_token_exchange_data.includes(exchanges_from_sync[i]) && exchanges_from_sync[i]['balance'] != 0 && exchanges_from_sync[i]['event'] != null){
                if(this.is_exchange_searched(exchanges_from_sync[i], target_type))sorted_token_exchange_data.push(exchanges_from_sync[i])
            }
        }

        for (let i = 0; i < sorted_token_exchange_data.length; i++) {
            if(sorted_token_exchange_data[i]['ipfs'] == null || sorted_token_exchange_data[i]['ipfs'].default_depth == null || sorted_token_exchange_data[i]['ipfs'].default_depth == 0){
                items.push({'id':sorted_token_exchange_data[i]['id'], 'label':{'title':sorted_token_exchange_data[i]['ipfs'].entered_symbol_text, 'details':sorted_token_exchange_data[i]['ipfs'].entered_title_text, 'size':'s', 'image':(sorted_token_exchange_data[i]['ipfs'].token_image == null ? (sorted_token_exchange_data[i]['data'][0][3/* <3>token_type */] == 3 ? this.props.app_state.static_assets['end_img']:this.props.app_state.static_assets['spend_img']) : sorted_token_exchange_data[i]['ipfs'].token_image), 'img_size':30}})
            }
        }

        return items;
    }

    is_exchange_searched(exchange, target_type){
        var filter_text = this.state.exchange_id

        if(filter_text == ''){
            return true
        }
        var token_name = exchange['ipfs'] == null ? '' : exchange['ipfs'].entered_title_text
        var entered_symbol_text = exchange['ipfs'] == null ? '' : exchange['ipfs'].entered_symbol_text
        if(token_name == null){
            token_name = ''
            entered_symbol_text = ''
        }
        if(token_name.toLowerCase().includes(filter_text.toLowerCase()) || entered_symbol_text.toLowerCase().includes(filter_text.toLowerCase())){
            return true
        }
        else if(!isNaN(filter_text) && exchange['id'].toString().startsWith(filter_text)){
            return true
        }
        return false
    }

    when_price_suggestion_clicked(item, pos, target_type){
        this.setState({exchange_id: item['id']})
    }

    when_exchange_id_input_field_changed(text){
        this.setState({exchange_id: text})
    }

    when_price_amount(amount){
        this.setState({price_amount: amount})
    }

    when_add_price_set(){
        var exchange_id = this.get_token_id_from_symbol(this.state.exchange_id.trim())
        var amount = this.state.price_amount

        var target_exchange_data = this.props.app_state.created_token_object_mapping[this.props.app_state.selected_e5][exchange_id]
        var default_depth = 0;
        if(target_exchange_data != null){
            target_exchange_data = target_exchange_data['ipfs']
            if(target_exchange_data != null){
                default_depth = target_exchange_data.default_depth == null ? 0 : target_exchange_data.default_depth
            }
        }

        if(isNaN(exchange_id) || parseInt(exchange_id) < 0 || exchange_id == '' || !this.does_exchange_exist(exchange_id)){
            this.props.notify(this.props.app_state.loc['741']/* 'please put a valid exchange id' */, 2600)
        }
        else if(default_depth != 0){
            this.props.notify(this.props.app_state.loc['2762']/* 'You cant use that exchange.' */, 3600)
        }
        else if(amount == 0){
            this.props.notify(this.props.app_state.loc['742']/* 'please put a valid amount' */, 2600)
        }
        else if(this.is_exchange_already_added(exchange_id)){
            this.props.notify(this.props.app_state.loc['743']/* 'You cant use the same exchange twice' */, 3600)
        }
        else{
            var price_data_clone = this.state.price_data.slice()
            price_data_clone.push({'id':exchange_id, 'amount':amount})
            this.setState({price_data: price_data_clone});
            this.props.notify(this.props.app_state.loc['744']/* 'added price!' */, 1400)
        }
    }


    is_exchange_already_added(exchange_id){
        if(this.get_item_in_array(exchange_id, this.state.price_data) == null){
            return false
        }
        return true
    }

    get_item_in_array(exchange_id, object_array){
        var object = object_array.find(x => x['id'] === exchange_id);
        return object
    }

    does_exchange_exist(exchange_id){
        if(this.props.app_state.created_token_object_mapping[this.props.app_state.selected_e5][parseInt(exchange_id)] == null){
            return false
        }
        return true
    }

    get_token_id_from_symbol(typed_search){
        if(!isNaN(typed_search)){
            return typed_search
        }
        var id = this.props.app_state.token_directory[this.props.app_state.selected_e5][typed_search.toUpperCase()] == null ? typed_search : this.props.app_state.token_directory[this.props.app_state.selected_e5][typed_search.toUpperCase()]

        return id
    }

    render_set_prices_list_part(){
        var middle = this.props.height-500;
        var size = this.props.size;
        if(size == 'm'){
            middle = this.props.height-100;
        }
        var items = [].concat(this.state.price_data)

        if(items.length == 0){
            items = [0,3,0]
            return(
                <div style={{}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px', 'list-style':'none'}}>
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
            )
        }else{
            return(
                <div style={{}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px', 'list-style':'none'}}>
                        {items.reverse().map((item, index) => (
                            <SwipeableList>
                                <SwipeableListItem
                                    swipeLeft={{
                                    content: <p style={{'color': this.props.theme['primary_text_color']}}>{this.props.app_state.loc['2751']/* Delete */}</p>,
                                    action: () =>this.when_amount_clicked(item)
                                    }}>
                                    <div style={{width:'100%', 'background-color':this.props.theme['send_receive_ether_background_color']}}>
                                        <li style={{'padding': '5px'}}>
                                            <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[this.props.app_state.selected_e5+item['id']], 'number':item['amount'], 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['id']]})}>
                                                {this.render_detail_item('2', { 'style':'l', 'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[this.props.app_state.selected_e5+item['id']], 'subtitle':this.format_power_figure(item['amount']), 'barwidth':this.calculate_bar_width(item['amount']), 'number':this.format_account_balance_figure(item['amount']), 'barcolor':'', 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['id']], })}
                                            </div>
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

    when_amount_clicked(item){
        var cloned_array = this.state.price_data.slice()
        const index = cloned_array.indexOf(item);
        if (index > -1) { // only splice array when item is found
            cloned_array.splice(index, 1); // 2nd parameter means remove one item only
        }
        this.setState({price_data: cloned_array})
    }




    /* renders the specific element in the post or detail object */
    render_detail_item(item_id, object_data){
        return(
            <div>
                <ViewGroups graph_type={this.props.app_state.graph_type} font={this.props.app_state.font} item_id={item_id} object_data={object_data} theme={this.props.theme} delete_entered_tag={this.delete_entered_tag_word.bind(this)} add_indexing_tag_for_new_job={this.add_indexing_tag_for_new_job.bind(this)}
                when_spend_country_selected={this.when_spend_country_selected.bind(this)} when_spend_included_country_selected={this.when_spend_included_country_selected.bind(this)}
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


    finish_creating_object(){
        var index_tags = this.state.entered_indexing_tags
        var title = this.state.entered_title_text
        var symbol = this.state.entered_symbol_text;

        if(index_tags.length == 0){
            this.props.notify(this.props.app_state.loc['745']/* 'add some tags first!' */, 3700)
        }
        else if(title == ''){
            this.props.notify(this.props.app_state.loc['746']/* 'add a name first!' */, 3700)
        }
        else if(symbol == ''){
            this.props.notify(this.props.app_state.loc['747']/* 'add a symbol first!' */, 3700)
        }
        else if(title.length > 20){
            this.props.notify(this.props.app_state.loc['748']/* 'that name is too long' */, 3700)
        }
        else if(title.includes(' ') || title == this.props.app_state.loc['3078']/* END */ || title == this.props.app_state.loc['3079']/* SPEND */ || (/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(title))){
            this.props.notify(this.props.app_state.loc['749']/* 'that name is invalid' */, 3700)
        }
        else if(symbol.includes(' ') || symbol == this.props.app_state.loc['3078']/* END */ || symbol == this.props.app_state.loc['3079']/* SPEND */ || (/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(symbol))){
            this.props.notify(this.props.app_state.loc['750']/* 'that symbol is invalid' */, 3700)
        }
        else if(this.is_symbol_in_use(symbol)){
            this.props.notify(this.props.app_state.loc['752']/* 'that symbol is already in use' */, 3700)
        }
        else if(this.is_name_in_use(title)){
            this.props.notify(this.props.app_state.loc['2772']/* 'That name is already in use.' */, 3700)
        }
        else if(symbol.length > 9){
            this.props.notify(this.props.app_state.loc['752']/* 'that symbol is too long' */, 3700)
        }
        else if(!this.is_end_token_ok_if_any()){
            this.props.notify(this.props.app_state.loc['2784']/* 'Your balance in END is insufficient to create your End token.' */, 5700)
        }
        else{
            var me = this
            this.setState({content_channeling_setting: me.props.app_state.content_channeling,
                device_language_setting :me.props.app_state.device_language,
                device_country :me.props.app_state.device_country,
                e5 :me.props.app_state.selected_e5, token_type:this.get_token_type()})
            
            setTimeout(function() {
                me.props.when_add_new_object_to_stack(me.state)

                me.setState({ id: makeid(8), type:me.props.app_state.loc['601']/* 'token' */, entered_tag_text: '',entered_indexing_tags:[],entered_title_text:'', new_token_page_tags_object: me.get_new_token_page_tags_object(), new_token_type_tags_object: me.get_new_token_type_tags_object(), token_exchange_liquidity_total_supply:0, default_exchange_amount_buy_limit:0, minimum_transactions_between_swap:0, minimum_blocks_between_swap:0, minimum_time_between_swap:0, default_exchange_amount_sell_limit:0, minimum_entered_contracts_between_swap:0, minimum_transactions_for_first_buy:0, trust_fee_proportion:bigInt('1e16'), block_limit:0, new_token_unlocked_liquidity_tags_object:me.get_new_token_unlocked_liquidity_tags_object(), new_token_unlocked_supply_tags_object:me.get_new_token_unlocked_supply_tags_object(), new_token_fully_custom_tags_object:me.get_new_token_fully_custom_tags_object(), internal_block_halfing_proportion:0, block_limit_reduction_proportion:0, block_reset_limit:0, new_token_block_limit_sensitivity_tags_object: me.get_new_token_block_limit_sensitivity_tags_object(), default_authority_mint_limit:0, new_token_halving_type_tags_object: me.get_new_token_halving_type_tags_object(), maturity_limit:0, token_exchange_ratio_x:0, token_exchange_ratio_y:0, exchange_authority:'', trust_fee_target:'', exchange_id:'', price_amount:0, price_data:[], new_token_access_rights_tags_object: me.get_new_token_access_rights_tags_object(), new_token_interactible_moderator_tags_object: me.get_new_token_interactible_moderator_tags_object(), moderator_id:'', moderators:[], interactible_id:'', interactible_timestamp:0, interactibles:[] })

                me.props.notify(me.props.app_state.loc['18'], 1700);
            }, (1 * 1000));
        }

    }

    is_symbol_in_use(symbol){
        var record = this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[symbol]
        if(record != null) return true
        record = this.get_all_sorted_objects_mappings(this.props.app_state.registered_token_symbols)[symbol]
        if(record != null) return true

        const coins = Object.keys(this.props.app_state.coins)
        if(coins.includes(symbol.toUpperCase())) return true;
        for(var c=0; c<coins.length; c++){
            const coin = coins[c]
            if(this.props.app_state.coins[coins]['name'].toUpperCase() == symbol.toUpperCase() || this.props.app_state.coins[coins]['symbol'].toUpperCase() == symbol.toUpperCase() || this.props.app_state.coins[coins]['base_unit'].toUpperCase() == symbol.toUpperCase()){
                return true;
            }
        }

        const ethers = this.props.app_state.ether_data
        const includes = ethers.find(e => (e['symbol'].toUpperCase() == symbol.toUpperCase() || e['name'].toUpperCase() == symbol.toUpperCase()))
        if(includes != null) return true;

        if(symbol.startsWith('E') && symbol.endsWith('5')){
            return true;
        }
        if(symbol.startsWith('3') && symbol.endsWith('5')){
            return true;
        }

        var txs = this.props.app_state.stack_items
        for(var i=0; i<txs.length; i++){
            var t = txs[i]
            if(t.type == this.props.app_state.loc['601']/* 'token' */){
                var selected_symbol = t.entered_symbol_text
                if(symbol == selected_symbol) return true
            }
        }

        return false
    }

    is_name_in_use(name){
        var record = this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[name]
        if(record != null) return true
        record = this.get_all_sorted_objects_mappings(this.props.app_state.registered_token_names)[name]
        if(record != null) return true

        const coins = Object.keys(this.props.app_state.coins)
        if(coins.includes(name.toUpperCase())) return true;
        for(var c=0; c<coins.length; c++){
            const coin = coins[c]
            if(this.props.app_state.coins[coins]['name'].toUpperCase() == name.toUpperCase() || this.props.app_state.coins[coins]['symbol'].toUpperCase() == name.toUpperCase() || this.props.app_state.coins[coins]['base_unit'].toUpperCase() == name.toUpperCase()){
                return true;
            }
        }

        const ethers = this.props.app_state.ether_data
        const includes = ethers.find(e => (e['symbol'].toUpperCase() == name.toUpperCase() || e['name'].toUpperCase() == name.toUpperCase()))
        if(includes != null) return true;

        if(name.startsWith('E') && name.endsWith('5')){
            return true;
        }
        if(name.startsWith('3') && name.endsWith('5')){
            return true;
        }

        var txs = this.props.app_state.stack_items
        for(var i=0; i<txs.length; i++){
            var t = txs[i]
            if(t.type == this.props.app_state.loc['601']/* 'token' */){
                var title_text = t.entered_title_text
                if(name == title_text) return true
            }
        }

        return false
    }


    is_end_token_ok_if_any(){
        if(this.state.default_depth == 0) return true
        var obj = {}
        obj[this.props.app_state.loc['2773']/* 'low' */] = '10000'
        obj[this.props.app_state.loc['2774']/* 'medium' */] = '100000'
        obj[this.props.app_state.loc['2775']/* 'high' */] = '1000000'
        var liquidity = this.get_selected_item(this.state.get_end_token_base_liquidity, this.state.get_end_token_base_liquidity['i'].active);
        var buy_amount = obj[liquidity]

        var token_balance = this.props.app_state.created_token_object_mapping[this.props.app_state.selected_e5][3]
        token_balance = token_balance == null ? 0 : token_balance['balance']
        token_balance = bigInt(token_balance).minus(this.get_debit_balance_in_stack(3, this.props.app_state.selected_e5))
        
        if(bigInt(token_balance).lesser(bigInt(buy_amount))){
            return false
        }else{
            return true
        }
    }

    get_debit_balance_in_stack(token_id, e5){
        var txs = this.props.app_state.stack_items
        var total_amount = bigInt(0)
        for(var i=0; i<txs.length; i++){
            var t = txs[i]
            if(txs[i].e5 == e5){
                if(txs[i].type == this.props.app_state.loc['946']/* 'buy-sell' */){
                    var amount = bigInt(txs[i].amount)
                    var exchange = t.token_item['id']
                    var action = this.get_action(t)
                    if(token_id == exchange && action == 1){
                        total_amount = bigInt(total_amount).add(amount)
                    }
                }
                else if(txs[i].type == this.props.app_state.loc['1018']/* 'transfer' */){
                    if(txs[i].token_item['id'] == token_id){
                        total_amount = bigInt(total_amount).add(txs[i].debit_balance)
                    }
                }
                else if(txs[i].type == this.props.app_state.loc['1499']/* 'direct-purchase' */){
                    for(var i=0; i<t.selected_variant['price_data'].length; i++){
                        var exchange = t.selected_variant['price_data'][i]['id']
                        var amount = this.get_amounts_to_be_paid(t.selected_variant['price_data'][i]['amount'], t.purchase_unit_count)
                        if(exchange == token_id){
                            total_amount = bigInt(total_amount).add(amount)
                        }
                    }
                    for(var i=0; i<t.storefront_item['ipfs'].shipping_price_data.length; i++){
                        var exchange = t.storefront_item['ipfs'].shipping_price_data[i]['id']
                        var amount = this.get_amounts_to_be_paid(t.storefront_item['ipfs'].shipping_price_data[i]['amount'], t.purchase_unit_count)
                        if(exchange == token_id){
                            total_amount = bigInt(total_amount).add(amount)
                        }
                    }
                }
                else if(txs[i].type == this.props.app_state.loc['1155']/* 'award' */){
                    if(token_id == 5){
                        total_amount = bigInt(total_amount).add(t.award_amount)
                    }
                    for(var i=0; i<t.price_data.length; i++){
                        var exchange = t.price_data[i]['id']
                        var amount = t.price_data[i]['amount']
                        if(exchange == token_id){
                            total_amount = bigInt(total_amount).add(amount)
                        }
                    }
                }
            }
        }
        return total_amount
    }


}




export default NewTokenPage;