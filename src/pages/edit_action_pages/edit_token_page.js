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
import TextInput from '../../components/text_input';
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
        id: makeid(8), object_type:31, type:this.props.app_state.loc['767']/* 'edit-token' */,
        new_token_page_tags_object: this.get_new_token_page_tags_object(),
        entered_tag_text: '',entered_indexing_tags:[],entered_title_text:'',entered_symbol_text:'', token_image:null,

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

        page:0, custom_page:0, e5: this.props.app_state.selected_e5,

        spend_exchange_allowed_countries:[], typed_spend_country_name:''
    };

    get_new_token_page_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['or','',0], ['e', this.props.app_state.loc['761']/* 'edit-token' */], [0]
            ],
        };
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



    set_edit_data(){
        if(this.state.spend_exchange_allowed_countries == null){
            this.setState({spend_exchange_allowed_countries:[], typed_spend_country_name:''})
        }
        this.setState({new_token_page_tags_object: this.get_new_token_page_tags_object(), type:this.props.app_state.loc['761']/* 'edit-token' */})
    }

    set_token_symbol(symbol, name){
        this.setState({existing_symbol: symbol, existing_name: name})
    }


    render(){
        return(
            <div style={{'padding':'10px 10px 0px 10px'}}>
                <div style={{'display': 'flex','flex-direction': 'row','margin':'0px 0px 0px 0px', width: this.props.app_state.width}}>
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
                            <img alt="" className="text-end" onClick={()=>this.finish_creating_object()} src={this.props.theme['close']} style={{height:36, width:'auto'}} />
                        </div>
                    </div>
                </div> */}
                
                
                <div style={{'margin':'10px 0px 0px 0px'}}>
                    {this.render_everything()}   
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
        var selected_item = this.get_selected_item(this.state.new_token_page_tags_object, 'e')

        if(selected_item == 'e' || selected_item == this.props.app_state.loc['761']/* 'edit-token' */){
            return(
                <div>
                    {this.render_enter_tags_part()}
                </div>
            )    
        }
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
                                    <img src={this.props.app_state.theme['letter']} style={{height:30 ,width:'auto'}} />
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    render_enter_tags_part(){
        var size = this.props.size

        if(size == 's'){
            return(
                <div>
                    {this.render_title_tags_part()}
                    {this.render_detail_item('0')}
                    {this.render_title_tags_part2()}
                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row" style={{}}>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_title_tags_part()}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_title_tags_part2()}
                    </div>
                </div>
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_title_tags_part()}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
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
                {this.render_detail_item('10',{'font':this.props.app_state.font, 'textsize':'10px','text':this.props.app_state.loc['146']/* 'Images larger than 500Kb will be ignored.' */})}
                <div style={{height:10}}/>
                {this.render_create_image_ui_buttons_part()}
            </div>
        )
    }

    render_title_tags_part2(){
        return(
            <div>
                {this.render_specific_country_selector()}

                {this.render_detail_item('0')}
                {this.render_detail_item('3', {'title':this.props.app_state.loc['a311dc']/* 'Current post size.' */, 'details':this.props.app_state.loc['a311dd']/* 'Below is the size of your new post with all the details youve set.' */, 'size':'l'})}
                <div style={{height:10}}/>
                {this.render_transaction_size_indicator()}
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




    render_specific_country_selector(){
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['a273t']/* 'Specify State Limits.' */, 'details':this.props.app_state.loc['a273u']/* 'You can restrict your object to specific states.' */, 'size':'l'})}
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
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        <div onClick={()=> this.add_all_countries()}>
                            {this.render_detail_item('5', {'text':this.props.app_state.loc['a273w']/* 'Add all' */, 'action':''})}
                        </div>
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        <div onClick={()=> this.remove_all_countries()}>
                            {this.render_detail_item('5', {'text':this.props.app_state.loc['a273x']/* 'remove all' */, 'action':''})}
                        </div>
                    </div>
                </div>
            </div>
        )
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
                        this.props.notify(this.props.app_state.loc['627']/* 'Use a smaller image!' */, 1000);
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


    when_banner_selected(files){
        this.setState({token_image: files[0]});
    }

    get_image_from_file(ecid){
        if(!ecid.startsWith('image')) return ecid
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
        return(
            <div>
                {this.render_detail_item('4', {'font':this.props.app_state.font, 'textsize':'15px','text':'Create a basic E5 token'})}
                <div style={{height:20}}/>
                {this.render_basic_token_section_parts()}

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
                    {this.render_detail_item('5', {'text':'Next', 'action':''})}
                </div>
            )
        }
    }

    show_previous_button(){
        var page = this.state.page
        if(page != 0){
            return(
                <div style={{'padding': '5px'}} onClick={()=>this.enter_previous_page()}>
                    {this.render_detail_item('5', {'text':'Previous', 'action':''})}
                </div>
            )
        }
    }

    render_basic_token_section_parts(){
        var page = this.state.page

        if(page == 0){
            return(
                <div>
                    {this.render_detail_item('3', {'title':'Set the token type', 'details':'Capped token (with limited supply) or uncapped token (with unlimited supply)', 'size':'l'})}

                    <div style={{height:20}}/>
                    <Tags font={this.props.app_state.font} page_tags_object={this.state.new_token_type_tags_object} tag_size={'l'} when_tags_updated={this.when_new_token_type_tags_object.bind(this)} theme={this.props.theme}/>

                </div>
            )
        }
        else if(page == 1){
            return(
                <div>
                    {this.render_detail_item('3', {'title':'Token Supply(For Capped Tokens)', 'details':'The supply of a capped token available for buying (for capped tokens)', 'size':'l'})}
                    <div style={{height:20}}/>

                    <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                        {this.render_detail_item('2', { 'style':'l', 'title':'Token Supply', 'subtitle':this.format_power_figure(this.state.token_exchange_liquidity_total_supply), 'barwidth':this.calculate_bar_width(this.state.token_exchange_liquidity_total_supply), 'number':this.format_account_balance_figure(this.state.token_exchange_liquidity_total_supply), 'barcolor':'', 'relativepower':'tokens', })}
                    </div>
                    <div style={{height:2}}/>
                    {this.render_detail_item('10', {'text':'Recommended: 100,000,000e2', 'textsize':'10px', 'font':this.props.app_state.font})}

                    <NumberPicker clip_number={this.props.app_state.clip_number} font={this.props.app_state.font} ref={this.number_picker_ref} number_limit={bigInt('1e72')} when_number_picker_value_changed={this.when_token_exchange_liquidity_total_supply.bind(this)} theme={this.props.theme} power_limit={63}/>
                </div>
            )
        }
        else if(page == 2){
            return(
                <div>
                    {this.render_detail_item('3', {'title':'Buy Limit', 'details':'the maximum amount of tokens that can be bought in one transaction.', 'size':'l'})}

                    <div style={{height:20}}/>
                    <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                        {this.render_detail_item('2', { 'style':'l', 'title':'Buy Limit', 'subtitle':this.format_power_figure(this.state.default_exchange_amount_buy_limit), 'barwidth':this.calculate_bar_width(this.state.default_exchange_amount_buy_limit), 'number':this.format_account_balance_figure(this.state.default_exchange_amount_buy_limit), 'barcolor':'', 'relativepower':'tokens', })}
                    </div>

                    <NumberPicker clip_number={this.props.app_state.clip_number} font={this.props.app_state.font} ref={this.number_picker_ref} number_limit={bigInt('1e72')} when_number_picker_value_changed={this.when_default_exchange_amount_buy_limit.bind(this)} theme={this.props.theme} power_limit={54}/>
                </div>
            )
        }
        else if(page == 3){
            return(
                <div>
                    {this.render_detail_item('3', {'title':'Trust Fee', 'details':'Proportion or percentage fee enforced on all contract spending that takes place using your new token.', 'size':'l'})}

                    <div style={{height:20}}/>
                    {this.render_detail_item('3', {'title':this.format_proportion(this.state.trust_fee_proportion), 'details':'Trust Fee', 'size':'l'})}

                    <div style={{height:2}}/>
                    {this.render_detail_item('10', {'text':'Recommended: 3.5%', 'textsize':'10px', 'font':this.props.app_state.font})}

                    <NumberPicker clip_number={this.props.app_state.clip_number} font={this.props.app_state.font} ref={this.number_picker_ref} number_limit={bigInt('1e72')} when_number_picker_value_changed={this.when_trust_fee_proportion.bind(this)} theme={this.props.theme} power_limit={9}/>
                </div>
            )
        }
        else if(page == 4){
            return(
                <div>
                    {this.render_detail_item('3', {'title':'Sell Limit', 'details':'The maximum amount of your new token a sender can sell in a transaction.', 'size':'l'})}

                    <div style={{height:20}}/>
                    <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                        {this.render_detail_item('2', { 'style':'l', 'title':'Sell Limit', 'subtitle':this.format_power_figure(this.state.default_exchange_amount_sell_limit), 'barwidth':this.calculate_bar_width(this.state.default_exchange_amount_sell_limit), 'number':this.format_account_balance_figure(this.state.default_exchange_amount_sell_limit), 'barcolor':'', 'relativepower':'tokens', })}
                    </div>

                    <NumberPicker clip_number={this.props.app_state.clip_number} font={this.props.app_state.font} ref={this.number_picker_ref} number_limit={bigInt('1e72')} when_number_picker_value_changed={this.when_default_exchange_amount_sell_limit.bind(this)} theme={this.props.theme} power_limit={54}/>
                </div>
            )
        }
        else if(page == 5){
            return(
                <div>
                    
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
            {'id':'53', 'label':{'title':'My Account', 'details':'Account', 'size':'s'}},
        ].concat(this.get_account_suggestions(target_type))
    }

    get_account_suggestions(target_type){
        var contacts = this.props.app_state.contacts[this.state.e5]
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
        const e5 = this.state.e5
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
        var title = this.state.entered_title_text.trim()
        var symbol = this.state.entered_symbol_text.trim();

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
        else if(title.includes(' ') || title == 'END' || title == 'SPEND' || (/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(title))){
            this.props.notify(this.props.app_state.loc['749']/* 'that name is invalid' */, 3700)
        }
        else if(symbol.includes(' ') || symbol == 'END' || symbol == 'SPEND' || (/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(symbol)) ){
            this.props.notify(this.props.app_state.loc['750']/* 'that symbol is invalid' */, 3700)
        }
        else if(this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[symbol] != null && this.state.existing_symbol != symbol){
            this.props.notify(this.props.app_state.loc['752']/* 'that symbol is already in use' */, 3700)
        }
        else if(this.is_symbol_in_use(symbol) && this.state.existing_symbol != symbol){
            this.props.notify(this.props.app_state.loc['752']/* 'that symbol is already in use' */, 3700)
        }
        else if(this.is_name_in_use(title) && this.state.existing_name != title){
            this.props.notify(this.props.app_state.loc['2772']/* 'That name is already in use.' */, 3700)
        }
        else if(symbol.length > 9){
            this.props.notify(this.props.app_state.loc['752a']/* 'That token symbol is too long.' */, 3700)
        }
        else{
            this.props.when_add_edit_object_to_stack(this.state)

            // this.setState({ id: makeid(32), type:'token', entered_tag_text: '',entered_indexing_tags:[],entered_title_text:'', new_token_page_tags_object: this.get_new_token_page_tags_object(), new_token_type_tags_object: this.get_new_token_type_tags_object(), token_exchange_liquidity_total_supply:0, default_exchange_amount_buy_limit:0, minimum_transactions_between_swap:0, minimum_blocks_between_swap:0, minimum_time_between_swap:0, default_exchange_amount_sell_limit:0, minimum_entered_contracts_between_swap:0, minimum_transactions_for_first_buy:0, trust_fee_proportion:bigInt('1e16'), block_limit:0, new_token_unlocked_liquidity_tags_object:this.get_new_token_unlocked_liquidity_tags_object(), new_token_unlocked_supply_tags_object:this.get_new_token_unlocked_supply_tags_object(), new_token_fully_custom_tags_object:this.get_new_token_fully_custom_tags_object(), internal_block_halfing_proportion:0, block_limit_reduction_proportion:0, block_reset_limit:0, new_token_block_limit_sensitivity_tags_object: this.get_new_token_block_limit_sensitivity_tags_object(), default_authority_mint_limit:0, new_token_halving_type_tags_object: this.get_new_token_halving_type_tags_object(), maturity_limit:0, token_exchange_ratio_x:0, token_exchange_ratio_y:0, exchange_authority:'', trust_fee_target:'', exchange_id:'', price_amount:0, price_data:[], new_token_access_rights_tags_object: this.get_new_token_access_rights_tags_object(), new_token_interactible_moderator_tags_object: this.get_new_token_interactible_moderator_tags_object(), moderator_id:'', moderators:[], interactible_id:'', interactible_timestamp:0, interactibles:[] })

            this.props.notify(this.props.app_state.loc['18'], 1700);
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


}




export default NewTokenPage;