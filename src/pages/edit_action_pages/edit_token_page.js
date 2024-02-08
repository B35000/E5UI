import React, { Component } from 'react';
import ViewGroups from '../../components/view_groups';
import Tags from '../../components/tags';
import NumberPicker from '../../components/number_picker';
import TextInput from '../../components/text_input';
import Letter from '../../assets/letter.png';

import EndImg from '../../assets/end_token_icon.png';
import SpendImg from '../../assets/spend_token_icon.png';
import AddStack from '../../assets/e5empty_icon3.png'; 
import E5EmptyIcon from '../../assets/e5empty_icon.png';
import E5EmptyIcon3 from '../../assets/e5empty_icon3.png';


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
        id: makeid(8), type:this.props.app_state.loc['767']/* 'edit-token' */,
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

        page:0, custom_page:0, e5: this.props.app_state.selected_e5
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
        this.setState({new_token_page_tags_object: this.get_new_token_page_tags_object(), type:this.props.app_state.loc['761']/* 'edit-token' */})
    }

    set_token_symbol(symbol){
        console.log('setting symbol: '+symbol)
        this.setState({existing_symbol: symbol})
    }


    render(){
        return(
            <div style={{'padding':'10px 10px 0px 10px'}}>

                <div className="row">
                    <div className="col-9" style={{'padding': '5px 0px 0px 10px'}}>
                        <Tags page_tags_object={this.state.new_token_page_tags_object} tag_size={'l'} when_tags_updated={this.when_new_token_page_tags_updated.bind(this)} theme={this.props.theme}/>
                    </div>
                    <div className="col-3" style={{'padding': '0px 0px 0px 0px'}}>
                        <div style={{'padding': '5px'}} onClick={()=>this.finish_creating_object()}>
                            {this.render_detail_item('5', {'text':this.props.app_state.loc['4']/* 'Finish' */, 'action':''})}
                        </div>
                        
                    </div>
                </div>
                
                
                <div style={{'margin':'0px 0px 0px 0px'}}>
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

        // if(this.state.new_token_page_tags_object['i'].active == 'custom'){
        //     selected_item = this.get_selected_item(this.state.new_token_page_tags_object, 'custom')
        // }

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

    render_enter_tags_part(){
        var size = this.props.size

        if(size == 's'){
            return(
                <div>
                    {this.render_title_tags_part()}
                    
                    {this.render_new_job_object()}
                    {this.render_detail_item('0')}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row" style={{'padding': '0px 0px 0px 0px'}}>
                    <div className="col-6" style={{'padding': '0px 0px 0px 0px'}}>
                        {this.render_title_tags_part()}
                    </div>
                    <div className="col-6">
                        {this.render_new_job_object()}
                        {this.render_detail_item('0')}
                    </div>
                </div>
                
            )
        }
    }

    render_title_tags_part(){
        return(
            <div style={{'padding':'0px 10px 0px 10px'}}>

                {this.render_detail_item('4',{'font':'Sans-serif', 'textsize':'15px','text':this.props.app_state.loc['620']/* 'Set a name for your new Token. No spaces should be used.' */})}
                <div style={{height:10}}/>
                <TextInput height={30} placeholder={this.props.app_state.loc['621']/* 'Enter Name...' */} when_text_input_field_changed={this.when_title_text_input_field_changed.bind(this)} text={this.state.entered_title_text} theme={this.props.theme}/>

                <div style={{height: 10}}/>
                {this.render_detail_item('4',{'font':'Sans-serif', 'textsize':'15px','text':this.state.entered_title_text})}
                {this.render_detail_item('10',{'font':'Sans-serif', 'textsize':'10px','text':this.props.app_state.loc['124']/* 'remaining character count: ' */+(20 - this.state.entered_title_text.length)})}

                {this.render_detail_item('0')}
                {this.render_detail_item('4',{'font':'Sans-serif', 'textsize':'15px','text':this.props.app_state.loc['622']/* 'Set a symbol for your new Token. No spaces should be used.' */})}
                <div style={{height:10}}/>
                <TextInput height={30} placeholder={this.props.app_state.loc['623']/* 'Enter Symbol...' */} when_text_input_field_changed={this.when_symbol_text_input_field_changed.bind(this)} text={this.state.entered_symbol_text} theme={this.props.theme}/>

                {this.render_detail_item('0')}
                {this.render_detail_item('4',{'font':'Sans-serif', 'textsize':'15px','text':this.props.app_state.loc['624']/* 'Set tags for indexing your new Token' */})}
                <div style={{height:10}}/>

                <div className="row">
                    <div className="col-9" style={{'margin': '0px 0px 0px 0px'}}>
                        <TextInput height={30} placeholder={this.props.app_state.loc['625']/* 'Enter Tag...' */} when_text_input_field_changed={this.when_index_text_input_field_changed.bind(this)} text={this.state.entered_tag_text} theme={this.props.theme}/>
                    </div>
                    <div className="col-3" style={{'padding': '0px 5px 0px 0px'}}>
                        {this.render_detail_item('5', {'text':this.props.app_state.loc['550']/* 'Add' */, 'action':'add_indexing_tag', 'prevent_default':true})}
                    </div>
                </div>
                {this.render_detail_item('10',{'font':'Sans-serif', 'textsize':'10px','text':this.props.app_state.loc['124']/* 'remaining character count: ' */+(this.props.app_state.tag_size - this.state.entered_tag_text.length)})}

                {this.render_detail_item('1',{'active_tags':this.state.entered_indexing_tags, 'indexed_option':'indexed', 'when_tapped':'delete_entered_tag_word'})}

                {this.render_detail_item('0')}

                {this.render_detail_item('4',{'font':'Sans-serif', 'textsize':'15px','text':this.props.app_state.loc['626']/* 'Set an image for your new Token. Black picks gif, grey picks image.' */})}
                {this.render_detail_item('10',{'font':'Sans-serif', 'textsize':'10px','text':this.props.app_state.loc['146']/* 'Images larger than 500Kb will be ignored.' */})}
                <div style={{height:10}}/>
                {this.render_create_image_ui_buttons_part()}

                {this.render_detail_item('0')}
                
                {this.render_detail_item('0')}
                {this.render_detail_item('0')}
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
        var image = this.state.token_image == null ? default_image : this.state.token_image
        return(
            <div style={{'display': 'flex','flex-direction': 'row','margin':'5px 0px 0px 0px','padding': '0px 5px 0px 10px', width: '99%'}}>
                <div style={{'padding': '5px', width:45, 'height':45}}>
                    <img src={image} style={{height:50 ,width:50}} />
                </div>

                {/* <div style={{'position': 'relative', 'width':45, 'height':45, 'padding':'7px 0px 0px 0px', 'margin':'0px 0px 0px 10px'}}>
                    <img src={E5EmptyIcon} style={{height:45, width:'auto', 'z-index':'1' ,'position': 'absolute'}} />
                    <input style={{height:30, width:40, opacity:0, 'z-index':'2' ,'position': 'absolute', 'margin':'5px 0px 0px 0px'}} id="upload" type="file" accept =".gif" onChange ={this.when_image_gif_picked.bind(this)}/>
                </div> */}

                <div style={{'position': 'relative', 'width':45, 'height':45, 'padding':'7px 0px 0px 0px','margin':'0px 0px 0px 10px'}}>
                    <img src={E5EmptyIcon3} style={{height:45, width:'auto', 'z-index':'1' ,'position': 'absolute'}} />
                    <input style={{height:30, width:40, opacity:0, 'z-index':'2' ,'position': 'absolute', 'margin':'5px 0px 0px 0px'}} id="upload" type="file" accept ="image/*" onChange ={this.when_image_gif_picked.bind(this)}/>
                </div>
            </div>
        )
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



   



    
    render_new_job_object(){
        return;
        var background_color = this.props.theme['card_background_color']
        var card_shadow_color = this.props.theme['card_shadow_color']
        return ( 
            <div onClick={() => console.log()} style={{height:'auto', 'background-color': background_color, 'border-radius': '15px','padding':'5px 5px 0px 0px', 'box-shadow': '0px 0px 1px 2px '+card_shadow_color, 'margin':'0px 10px 10px 10px'}}>
                <div style={{'padding': '5px 0px 5px 0px'}}>
                    {this.render_detail_item('1',{'active_tags':this.state.entered_indexing_tags, 'indexed_option':'indexed', 'when_tapped':'delete_entered_tag_word'})}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('4',{'font':'Sans-serif', 'textsize':'15px','text':this.state.entered_title_text})}
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
                {this.render_detail_item('4', {'font':'Sans-serif', 'textsize':'15px','text':'Create a basic E5 token'})}
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
                    <Tags page_tags_object={this.state.new_token_type_tags_object} tag_size={'l'} when_tags_updated={this.when_new_token_type_tags_object.bind(this)} theme={this.props.theme}/>

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
                    {this.render_detail_item('10', {'text':'Recommended: 100,000,000e2', 'textsize':'10px', 'font':'Sans-serif'})}

                    <NumberPicker ref={this.number_picker_ref} number_limit={bigInt('1e72')} when_number_picker_value_changed={this.when_token_exchange_liquidity_total_supply.bind(this)} theme={this.props.theme} power_limit={63}/>
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

                    <NumberPicker ref={this.number_picker_ref} number_limit={bigInt('1e72')} when_number_picker_value_changed={this.when_default_exchange_amount_buy_limit.bind(this)} theme={this.props.theme} power_limit={54}/>
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
                    {this.render_detail_item('10', {'text':'Recommended: 3.5%', 'textsize':'10px', 'font':'Sans-serif'})}

                    <NumberPicker ref={this.number_picker_ref} number_limit={bigInt('1e72')} when_number_picker_value_changed={this.when_trust_fee_proportion.bind(this)} theme={this.props.theme} power_limit={9}/>
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

                    <NumberPicker ref={this.number_picker_ref} number_limit={bigInt('1e72')} when_number_picker_value_changed={this.when_default_exchange_amount_sell_limit.bind(this)} theme={this.props.theme} power_limit={54}/>
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





    render_custom_configuration_token_part(){
        return(
            <div>
                {this.render_detail_item('4', {'font':'Sans-serif', 'textsize':'15px','text':'Create a custom E5 token'})}
                <div style={{height:20}}/>
                {this.render_custom_token_section_parts()}

                <div style={{height:20}}/>
                <div className="row">
                    <div className="col-6" style={{'padding': '0px 0px 0px 10px'}}>
                        {this.show_custom_previous_button()}
                    </div>
                    <div className="col-6" style={{'padding': '0px 0px 0px 0px'}}>
                        {this.show_custom_next_button()}
                    </div>
                </div>
                
            </div>
        )
    }

    show_custom_next_button(){
        var page = this.state.custom_page
        if(page < 22){
            return(
                <div style={{'padding': '5px'}} onClick={()=>this.enter_custom_next_page()}>
                    {this.render_detail_item('5', {'text':'Next', 'action':''})}
                </div>
            )
        }
    }

    show_custom_previous_button(){
        var page = this.state.custom_page
        if(page != 0){
            return(
                <div style={{'padding': '5px'}} onClick={()=>this.enter_custom_previous_page()}>
                    {this.render_detail_item('5', {'text':'Previous', 'action':''})}
                </div>
            )
        }
    }


    render_custom_token_section_parts(){
         var page = this.state.custom_page

        if(page == 0){
            return(
                <div>
                    {this.render_detail_item('3', {'title':'Set the token type', 'details':'Capped token (with limited supply) or uncapped token (with unlimited supply)', 'size':'l'})}
                    <div style={{height:20}}/>

                    <Tags page_tags_object={this.state.new_token_type_tags_object} tag_size={'l'} when_tags_updated={this.when_new_token_type_tags_object.bind(this)} theme={this.props.theme}/>

                </div>
            )
        }
        else if(page == 1){
            return(
                <div>
                    {this.render_detail_item('3', {'title':'Token Supply', 'details':'The supply of a capped token available for buying (for capped tokens)', 'size':'l'})}
                    <div style={{height:20}}/>

                    <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                        {this.render_detail_item('2', { 'style':'l', 'title':'Token Supply', 'subtitle':this.format_power_figure(this.state.token_exchange_liquidity_total_supply), 'barwidth':this.calculate_bar_width(this.state.token_exchange_liquidity_total_supply), 'number':this.format_account_balance_figure(this.state.token_exchange_liquidity_total_supply), 'barcolor':'', 'relativepower':'tokens', })}
                    </div>

                    <div style={{height:2}}/>
                    {this.render_detail_item('10', {'text':'Recommended: 100,000,000e2', 'textsize':'10px', 'font':'Sans-serif'})}

                    <NumberPicker ref={this.number_picker_ref} number_limit={bigInt('1e72')} when_number_picker_value_changed={this.when_token_exchange_liquidity_total_supply.bind(this)} theme={this.props.theme} power_limit={63}/>
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

                    <NumberPicker ref={this.number_picker_ref} number_limit={bigInt('1e72')} when_number_picker_value_changed={this.when_default_exchange_amount_buy_limit.bind(this)} theme={this.props.theme} power_limit={54}/>
                </div>
            )
        }
        else if(page == 3){
            return(
                <div>
                    {this.render_detail_item('3', {'title':'Sell Limit', 'details':'The maximum amount of your new token a sender can sell in a transaction.', 'size':'l'})}
                    <div style={{height:20}}/>

                    <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                        {this.render_detail_item('2', { 'style':'l', 'title':'Sell Limit', 'subtitle':this.format_power_figure(this.state.default_exchange_amount_sell_limit), 'barwidth':this.calculate_bar_width(this.state.default_exchange_amount_sell_limit), 'number':this.format_account_balance_figure(this.state.default_exchange_amount_sell_limit), 'barcolor':'', 'relativepower':'tokens', })}
                    </div>

                    <NumberPicker ref={this.number_picker_ref} number_limit={bigInt('1e72')} when_number_picker_value_changed={this.when_default_exchange_amount_sell_limit.bind(this)} theme={this.props.theme} power_limit={54}/>
                </div>
            )
        }
        else if(page == 4){
            return(
                <div>
                    {this.render_detail_item('3', {'title':'Minimum Time Between Swap', 'details':'the minimum amount of time a sender has to wait between making a swap for a given token.', 'size':'l'})}
                    <div style={{height:20}}/>

                    {this.render_detail_item('3', {'title':this.get_time_diff(this.state.minimum_time_between_swap), 'details':'Minimum Time Between Swap', 'size':'l'})}

                    <NumberPicker ref={this.number_picker_ref} number_limit={bigInt('1e72')} when_number_picker_value_changed={this.when_minimum_time_between_swap.bind(this)} theme={this.props.theme} power_limit={63}/>
                </div>
            )
        }
        else if(page == 5){
            return(
                <div>
                    {this.render_detail_item('3', {'title':'Trust Fee', 'details':'proportion or percentage fee enforced on all contract spending that takes place using token.', 'size':'l'})}
                    <div style={{height:20}}/>

                    {this.render_detail_item('3', {'title':this.format_proportion(this.state.trust_fee_proportion), 'details':'Trust Fee', 'size':'l'})}

                    <div style={{height:2}}/>
                    {this.render_detail_item('10', {'text':'Recommended: 3.5%', 'textsize':'10px', 'font':'Sans-serif'})}

                    <NumberPicker ref={this.number_picker_ref} number_limit={bigInt('1e72')} when_number_picker_value_changed={this.when_trust_fee_proportion.bind(this)} theme={this.props.theme} power_limit={9}/>
                    
                </div>
            )
        }
        else if(page == 6){
            return(
                <div>
                    {this.render_detail_item('3', {'title':'Minimum Transactions Between Swap', 'details':'the minimum number of transactions sender has to make between swaps for your new token.', 'size':'l'})}
                    <div style={{height:20}}/>
                    
                    <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                        {this.render_detail_item('2', { 'style':'l', 'title':'Minimum Transactions Between Swap', 'subtitle':this.format_power_figure(this.state.minimum_transactions_between_swap), 'barwidth':this.calculate_bar_width(this.state.minimum_transactions_between_swap), 'number':this.format_account_balance_figure(this.state.minimum_transactions_between_swap), 'barcolor':'', 'relativepower':'transactions', })}
                    </div>

                    <NumberPicker ref={this.number_picker_ref} number_limit={999} when_number_picker_value_changed={this.when_minimum_transactions_between_swap.bind(this)} theme={this.props.theme} power_limit={63}/>
                </div>
            )
        }
        else if(page == 7){
            return(
                <div>
                    {this.render_detail_item('3', {'title':'Minimum Blocks Between Swap', 'details':'the minimum number of blocks sender has to wait between making a swap for your new token.', 'size':'l'})}
                    <div style={{height:20}}/>
                    
                    <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                        {this.render_detail_item('2', { 'style':'l', 'title':'Minimum Blocks Between Swap', 'subtitle':this.format_power_figure(this.state.minimum_blocks_between_swap), 'barwidth':this.calculate_bar_width(this.state.minimum_blocks_between_swap), 'number':this.format_account_balance_figure(this.state.minimum_blocks_between_swap), 'barcolor':'', 'relativepower':'blocks', })}
                    </div>

                    <NumberPicker ref={this.number_picker_ref} number_limit={999} when_number_picker_value_changed={this.when_minimum_blocks_between_swap.bind(this)} theme={this.props.theme} power_limit={63}/>
                </div>
            )
        }
        else if(page == 8){
            return(
                <div>
                    {this.render_detail_item('3', {'title':'Minimum Entered Contracts Between Swap', 'details':'the minimum amount of contracts sender should enter before interacting with your new exchange again.', 'size':'l'})}
                    <div style={{height:20}}/>
                    
                    <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                        {this.render_detail_item('2', { 'style':'l', 'title':'Minimum Entered Contracts Between Swap', 'subtitle':this.format_power_figure(this.state.minimum_entered_contracts_between_swap), 'barwidth':this.calculate_bar_width(this.state.minimum_entered_contracts_between_swap), 'number':this.format_account_balance_figure(this.state.minimum_entered_contracts_between_swap), 'barcolor':'', 'relativepower':'blocks', })}
                    </div>

                    <NumberPicker ref={this.number_picker_ref} number_limit={999} when_number_picker_value_changed={this.when_minimum_entered_contracts_between_swap.bind(this)} theme={this.props.theme} power_limit={63}/>
                </div>
            )
        }
        else if(page == 9){
            return(
                <div>
                    {this.render_detail_item('3', {'title':'Minimum Transactions For First Buy', 'details':'The minimum number of transactions sender has to make to buy/sell your new token for the first time.', 'size':'l'})}
                    <div style={{height:20}}/>
                    
                    <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                        {this.render_detail_item('2', { 'style':'l', 'title':'Minimum Transactions For First Buy', 'subtitle':this.format_power_figure(this.state.minimum_transactions_for_first_buy), 'barwidth':this.calculate_bar_width(this.state.minimum_transactions_for_first_buy), 'number':this.format_account_balance_figure(this.state.minimum_transactions_for_first_buy), 'barcolor':'', 'relativepower':'blocks', })}
                    </div>

                    <NumberPicker ref={this.number_picker_ref} number_limit={999} when_number_picker_value_changed={this.when_minimum_transactions_for_first_buy.bind(this)} theme={this.props.theme} power_limit={63}/>
                </div>
            )
        }
        else if(page == 10){
            return(
                <div>
                    {this.render_detail_item('3', {'title':'Minimum Entered Contracts For First Buy', 'details':'The minimum number of contracts sender should have entered before first buy.', 'size':'l'})}
                    <div style={{height:20}}/>

                    <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                        {this.render_detail_item('2', { 'style':'l', 'title':'Minimum Entered Contracts For First Buy', 'subtitle':this.format_power_figure(this.state.minimum_entered_contracts_for_first_buy), 'barwidth':this.calculate_bar_width(this.state.minimum_entered_contracts_for_first_buy), 'number':this.format_account_balance_figure(this.state.minimum_entered_contracts_for_first_buy), 'barcolor':'', 'relativepower':'blocks', })}
                    </div>

                    <NumberPicker ref={this.number_picker_ref} number_limit={999} when_number_picker_value_changed={this.when_minimum_entered_contracts_for_first_buy.bind(this)} theme={this.props.theme} power_limit={63}/>
                    
                </div>
            )
        }
        else if(page == 11){
            return(
                <div>
                    {this.render_detail_item('3', {'title':'Unlocked Liquidity', 'details':'If set to unlocked, You have direct access to the token exchanges liquidity', 'size':'l'})}

                    <div style={{height:20}}/>
                    <Tags page_tags_object={this.state.new_token_unlocked_liquidity_tags_object} tag_size={'l'} when_tags_updated={this.when_new_token_unlocked_liquidity_tags_object.bind(this)} theme={this.props.theme}/>

                    <div style={{height:2}}/>
                    {this.render_detail_item('10', {'text':'Recommended: unlocked', 'textsize':'10px', 'font':'Sans-serif'})}
                    
                </div>
            )
        }
        else if(page == 12){
            return(
                <div>
                    {this.render_detail_item('3', {'title':'Unlocked Supply', 'details':'If set to unlocked, you can mint more of the token outside the exchange', 'size':'l'})}

                    <div style={{height:20}}/>
                    <Tags page_tags_object={this.state.new_token_unlocked_supply_tags_object} tag_size={'l'} when_tags_updated={this.when_new_token_unlocked_supply_tags_object.bind(this)} theme={this.props.theme}/>

                    <div style={{height:2}}/>
                    {this.render_detail_item('10', {'text':'Recommended: locked', 'textsize':'10px', 'font':'Sans-serif'})}
                    
                </div>
            )
        }
        else if(page == 13){
            return(
                <div>
                    {this.render_detail_item('3', {'title':'Fully Custom', 'details':'If set to fully-custom, you have full access to the token exchanges configuration', 'size':'l'})}

                    <div style={{height:20}}/>
                    <Tags page_tags_object={this.state.new_token_fully_custom_tags_object} tag_size={'l'} when_tags_updated={this.when_new_token_fully_custom_tags_object.bind(this)} theme={this.props.theme}/>
                    
                    <div style={{height:2}}/>
                    {this.render_detail_item('10', {'text':'Recommended: fully-custom', 'textsize':'10px', 'font':'Sans-serif'})}
                </div>
            )
        }
        else if(page == 14){
            return(
                <div>
                    {this.render_detail_item('3', {'title':'Block Limit(For Uncapped Spend Tokens)', 'details':'the maximum amount of your new token that can be minted before the active mint limit is reduced using its internal block halfing proportion.', 'size':'l'})}
                    <div style={{height:20}}/>

                    <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                        {this.render_detail_item('2', { 'style':'l', 'title':'Block Limit', 'subtitle':this.format_power_figure(this.state.block_limit), 'barwidth':this.calculate_bar_width(this.state.block_limit), 'number':this.format_account_balance_figure(this.state.block_limit), 'barcolor':'', 'relativepower':'tokens', })}
                    </div>

                    <div style={{height:2}}/>
                    {this.render_detail_item('10', {'text':'Recommended: '+this.format_account_balance_figure(this.state.default_exchange_amount_buy_limit), 'textsize':'10px', 'font':'Sans-serif'})}

                    <NumberPicker ref={this.number_picker_ref} number_limit={bigInt('1e72')} when_number_picker_value_changed={this.when_block_limit.bind(this)} theme={this.props.theme} power_limit={63}/>
                    
                </div>
            )
        }
        else if(page == 15){
            return(
                <div>
                    {this.render_detail_item('3', {'title':'Halving type (for Uncapped Spend Tokens)', 'details':'If set to spread, each minter receives a slightly less ammount than the previous minter in a given block.', 'size':'l'})}

                    <div style={{height:20}}/>
                    <Tags page_tags_object={this.state.new_token_halving_type_tags_object} tag_size={'l'} when_tags_updated={this.when_new_token_halving_type_tags_object.bind(this)} theme={this.props.theme}/>

                    <div style={{height:2}}/>
                    {this.render_detail_item('10', {'text':'Recommended: Spread', 'textsize':'10px', 'font':'Sans-serif'})}
                </div>
            )
        }
        else if(page == 16){
            return(
                <div>
                    {this.render_detail_item('3', {'title':'Maturity Limit(For Uncapped Spend Tokens)', 'details':'Amount of your token used in calculating the active block limit. If the maturity limit has not been exceeded, the active block limit used is less than its default set value.', 'size':'l'})}
                    <div style={{height:20}}/>
                    
                    <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                        {this.render_detail_item('2', { 'style':'l', 'title':'Maturity Limit', 'subtitle':this.format_power_figure(this.state.maturity_limit), 'barwidth':this.calculate_bar_width(this.state.maturity_limit), 'number':this.format_account_balance_figure(this.state.maturity_limit), 'barcolor':'', 'relativepower':'tokens', })}
                    </div>

                    <div style={{height:2}}/>
                    {this.render_detail_item('10', {'text':'Recommended: '+this.format_account_balance_figure(this.state.default_exchange_amount_buy_limit * 100), 'textsize':'10px', 'font':'Sans-serif'})}

                    <NumberPicker ref={this.number_picker_ref} number_limit={bigInt('1e72')} when_number_picker_value_changed={this.when_maturity_limit.bind(this)} theme={this.props.theme} power_limit={63}/>
                </div>
            )
        }
        else if(page == 17){
            return(
                <div>
                    {this.render_detail_item('3', {'title':'Internal Block Halving(For Uncapped Spend Tokens)', 'details':'proportion or percentage used in reducing the amount of spend that a sender can mint based on the block limit relative to the current block mint total.(for uncapped tokens)', 'size':'l'})}
                    <div style={{height:20}}/>
                    
                    {this.render_detail_item('3', {'title':this.format_proportion(this.state.internal_block_halfing_proportion), 'details':'Internal Block Halving Proportion', 'size':'l'})}

                    <div style={{height:2}}/>
                    {this.render_detail_item('10', {'text':'Recommended: 40% - 51%', 'textsize':'10px', 'font':'Sans-serif'})}

                    <NumberPicker ref={this.number_picker_ref} number_limit={bigInt('1e72')} when_number_picker_value_changed={this.when_internal_block_halfing_proportion.bind(this)} power_limit={9} theme={this.props.theme} />
                </div>
            )
        }
        else if(page == 18){
            return(
                <div>
                    {this.render_detail_item('3', {'title':'Block Limit Reduction(For Uncapped Spend Tokens)', 'details':'proportion or percentage used in reducing the active block limit reduction proportion between blocks if block limit is exceeded in current block.(for uncapped tokens)', 'size':'l'})}
                    <div style={{height:20}}/>
                    
                    {this.render_detail_item('3', {'title':this.format_proportion(this.state.block_limit_reduction_proportion), 'details':'Block Limit Reduction Proportion', 'size':'l'})}

                    <div style={{height:2}}/>
                    {this.render_detail_item('10', {'text':'Recommended: 65% - 91%', 'textsize':'10px', 'font':'Sans-serif'})}

                    <NumberPicker ref={this.number_picker_ref} number_limit={bigInt('1e72')} when_number_picker_value_changed={this.when_block_limit_reduction_proportion.bind(this)} power_limit={9} theme={this.props.theme} />
                </div>
            )
        }
        else if(page == 19){
            return(
                <div>
                    {this.render_detail_item('3', {'title':'Block Reset Limit(For Uncapped Spend Tokens)', 'details':'the maximum number of blocks that are counted while reseting active block limit reduction proportion value when multiple blocks have passed without a mint event taking place.', 'size':'l'})}
                    <div style={{height:20}}/>
                    
                    <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                        {this.render_detail_item('2', { 'style':'l', 'title':'Block Reset Limit', 'subtitle':this.format_power_figure(this.state.block_reset_limit), 'barwidth':this.calculate_bar_width(this.state.block_reset_limit), 'number':this.format_account_balance_figure(this.state.block_reset_limit), 'barcolor':'', 'relativepower':'blocks', })}
                    </div>

                    <div style={{height:2}}/>
                    {this.render_detail_item('10', {'text':'Recommended: 4', 'textsize':'10px', 'font':'Sans-serif'})}

                    <NumberPicker ref={this.number_picker_ref} number_limit={999} when_number_picker_value_changed={this.when_block_reset_limit.bind(this)} theme={this.props.theme} power_limit={63}/>
                </div>
            )
        }
        else if(page == 20){
            return(
                <div>
                    
                    {this.render_detail_item('3', {'title':'Block Limit Sensitivity (for Uncapped Spend Tokens)', 'details':'The sensitivity of your new exchange to increasing demand', 'size':'l'})}

                    <div style={{height:20}}/>
                    <Tags page_tags_object={this.state.new_token_block_limit_sensitivity_tags_object} tag_size={'l'} when_tags_updated={this.when_new_token_block_limit_sensitivity_tags_object.bind(this)} theme={this.props.theme}/>

                    <div style={{height:2}}/>
                    {this.render_detail_item('10', {'text':'Recommended: 3', 'textsize':'10px', 'font':'Sans-serif'})}
                </div>
            )
        }
        else if(page == 21){
            return(
                <div>
                    {this.render_detail_item('3', {'title':'Exchange Ratio X', 'details':'The buy output exchange ratio X for your new token (formula used: xy = k)', 'size':'l'})}
                    <div style={{height:20}}/>

                    <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                        {this.render_detail_item('2', { 'style':'l', 'title':'Exchange Ratio X', 'subtitle':this.format_power_figure(this.state.token_exchange_ratio_x), 'barwidth':this.calculate_bar_width(this.state.token_exchange_ratio_x), 'number':this.format_account_balance_figure(this.state.token_exchange_ratio_x), 'barcolor':'', 'relativepower':'tokens', })}
                    </div>

                    <div style={{height:2}}/>
                    {this.render_detail_item('10', {'text':'Recommended: '+this.format_account_balance_figure(this.state.token_exchange_liquidity_total_supply), 'textsize':'10px', 'font':'Sans-serif'})}

                    <NumberPicker ref={this.number_picker_ref} number_limit={bigInt('1e72')} when_number_picker_value_changed={this.when_token_exchange_ratio_x.bind(this)} theme={this.props.theme} power_limit={63}/>
                    
                </div>
            )
        }
        else if(page == 22){
            return(
                <div>
                    {this.render_detail_item('3', {'title':'Exchange Ratio Y', 'details':'The buy input exchange ratio Y for your new token (formula being: x * y = k)', 'size':'l'})}
                    <div style={{height:20}}/>
                    
                    <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                        {this.render_detail_item('2', { 'style':'l', 'title':'Exchange Ratio Y', 'subtitle':this.format_power_figure(this.state.token_exchange_ratio_y), 'barwidth':this.calculate_bar_width(this.state.token_exchange_ratio_y), 'number':this.format_account_balance_figure(this.state.token_exchange_ratio_y), 'barcolor':'', 'relativepower':'tokens', })}
                    </div>

                    {this.render_detail_item('10', {'text':'Recommended: '+this.format_account_balance_figure(this.state.token_exchange_liquidity_total_supply), 'textsize':'10px', 'font':'Sans-serif'})}

                    <NumberPicker ref={this.number_picker_ref} number_limit={bigInt('1e72')} when_number_picker_value_changed={this.when_token_exchange_ratio_y.bind(this)} theme={this.props.theme} power_limit={63}/>
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







    render_token_authorities_part(){
        var size = this.props.size
        var height = this.props.height-150

        if(size == 's'){
            return(
                <div style={{overflow: 'auto', maxHeight: height}}>
                    {this.render_exchange_authority_trust_fee_target()}
                    {this.render_moderator_interactible_ui()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row" style={{'padding': '0px 0px 0px 20px', overflow: 'auto', maxHeight: height}}>
                    <div className="col-6" style={{'padding': '0px 0px 0px 0px'}}>
                        {this.render_exchange_authority_trust_fee_target()}
                    </div>
                    <div className="col-6">
                        {this.render_moderator_interactible_ui()}
                    </div>
                </div>
                
            )
        }
    }  

    render_exchange_authority_trust_fee_target(){
        return(
            <div style={{}}>

                {this.render_detail_item('3', {'title':'Access Rights', 'details':'If enabled, access to the exchange will be restricted to moderators and specified accounts', 'size':'l'})}

                <div style={{height:20}}/>
                <Tags page_tags_object={this.state.new_token_access_rights_tags_object} tag_size={'l'} when_tags_updated={this.when_new_token_access_rights_tags_object.bind(this)} theme={this.props.theme}/>

                {this.render_detail_item('0')}

                {this.render_detail_item('3', {'title':'Exchange Authority ID', 'details':'The account set to control the exchange', 'size':'l'})}

                <div style={{height:10}}/>
                <TextInput height={30} placeholder={'Set Exchange Authority ID'} when_text_input_field_changed={this.when_exchange_authority_input_field_changed.bind(this)} text={this.state.exchange_authority} theme={this.props.theme}/>
                
                {this.load_account_suggestions('exchange_authority')}
                <div style={{height: 20}}/>

                {this.render_detail_item('3', {'title':'Trust Fee Target ID', 'details':'The account set to receive trust fee when collected from contract spend actions', 'size':'l'})}

                <div style={{height:10}}/>
                <TextInput height={30} placeholder={'Set Trust Fee Target ID'} when_text_input_field_changed={this.when_trust_fee_target_input_field_changed.bind(this)} text={this.state.trust_fee_target} theme={this.props.theme}/>

                {this.load_account_suggestions('trust_fee_target')}
                <div style={{height: 20}}/>

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
            {'id':'53', 'label':{'title':'My Account', 'details':'Account', 'size':'s'}},
        ].concat(this.get_account_suggestions(target_type))
    }

    get_account_suggestions(target_type){
        var contacts = this.props.app_state.contacts[this.state.e5]
        var return_array = []

        if(target_type == 'exchange_authority'){
            contacts.forEach(contact => {
                if(contact['id'].toString().includes(this.state.exchange_authority)){
                    return_array.push({'id':contact['id'],'label':{'title':contact['id'], 'details':this.get_contact_alias(contact), 'size':'s'}})
                }
            });
        }
        else if(target_type == 'trust_fee_target'){
            contacts.forEach(contact => {
                if(contact['id'].toString().includes(this.state.trust_fee_target)){
                    return_array.push({'id':contact['id'],'label':{'title':contact['id'], 'details':this.get_contact_alias(contact), 'size':'s'}})
                }
            });
        }
        else if(target_type == 'moderator_id'){
            contacts.forEach(contact => {
                if(contact['id'].toString().includes(this.state.moderator_id)){
                    return_array.push({'id':contact['id'],'label':{'title':contact['id'], 'details':this.get_contact_alias(contact), 'size':'s'}})
                }
            });
        }
        else if(target_type == 'interactible_id'){
            contacts.forEach(contact => {
                if(contact['id'].toString().includes(this.state.interactible_id)){
                    return_array.push({'id':contact['id'],'label':{'title':contact['id'], 'details':this.get_contact_alias(contact), 'size':'s'}})
                }
            });
        }
        
        return return_array;
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
                <Tags page_tags_object={this.state.new_token_interactible_moderator_tags_object} tag_size={'l'} when_tags_updated={this.when_new_token_interactible_moderator_tags_object.bind(this)} theme={this.props.theme}/>

                {this.render_moderator_or_interactible_setting()}
            </div>
        )
    }

    when_new_token_interactible_moderator_tags_object(tag_obj){
        this.setState({new_token_interactible_moderator_tags_object: tag_obj})
    }

    render_moderator_or_interactible_setting(){
        var selected_item = this.get_selected_item(this.state.new_token_interactible_moderator_tags_object, this.state.new_token_interactible_moderator_tags_object['i'].active)

        if(selected_item == 'moderators' || selected_item == 'e'){
            return(
                <div>
                    {this.render_moderator_settings()}
                </div>
            )    
        }
        else if(selected_item == 'interactible'){
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
                {this.render_detail_item('3', {'title':'Moderator ID', 'details':'Set the account id for your targeted moderator', 'size':'l'})}

                <div style={{height:10}}/>
                <TextInput height={30} placeholder={'Moderator ID'} when_text_input_field_changed={this.when_moderator_id_input_field_changed.bind(this)} text={this.state.moderator_id} theme={this.props.theme}/>

                {this.load_account_suggestions('moderator_id')}

                <div style={{height: 10}}/>
                <div style={{'padding': '5px'}} onClick={() => this.when_add_moderator_button_tapped()}>
                    {this.render_detail_item('5', {'text':'Add Moderator', 'action':''})}
                </div>

                {this.render_added_moderators()}
            </div>
        )
    }

    when_moderator_id_input_field_changed(text){
        this.setState({moderator_id: text})
    }

    when_add_moderator_button_tapped(){
        var moderator_id = this.state.moderator_id.toString().trim()
        if(isNaN(moderator_id) || parseInt(moderator_id) < 0 || moderator_id == ''){
            this.props.notify('please put a valid account id', 600)
        }
        else{
            var moderators_clone = this.state.moderators.slice()
            moderators_clone.push(parseInt(moderator_id))
            this.setState({moderators: moderators_clone});
            this.props.notify('added moderator!', 400)
        }
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
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.map((item, index) => (
                            <li style={{'padding': '5px'}} onClick={()=>console.log()}>
                                <div style={{height:140, width:'100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px','padding':'10px 0px 0px 10px', 'max-width':'420px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                                    <div style={{'margin':'10px 20px 0px 0px'}}>
                                        <img src={Letter} style={{height:40 ,width:'auto'}} />
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
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.reverse().map((item, index) => (
                            <li style={{'padding': '5px'}} onClick={()=>this.when_moderator_account_clicked(item)}>
                                {this.render_detail_item('3', {'title':''+item, 'details':'Account ID', 'size':'l'})}
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
                {this.render_detail_item('3', {'title':'Interactible ID', 'details':'Set the account id for your targeted account, and expiry time for their interactibility', 'size':'l'})}

                <div style={{height:10}}/>
                <TextInput height={30} placeholder={'Interactible ID'} when_text_input_field_changed={this.when_interactible_id_input_field_changed.bind(this)} text={this.state.interactible_id} theme={this.props.theme}/>

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
                    {this.render_detail_item('5', {'text':'Add Interactible Account', 'action':''})}
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

    when_add_interactible_button_tapped(){
        var interactible_id = this.state.interactible_id.toString().trim()
        if(isNaN(interactible_id) || parseInt(interactible_id) < 0 || interactible_id == ''){
            this.props.notify('please put a valid account id', 600)
        }
        else{
            var interactibles_clone = this.state.interactibles.slice()
            interactibles_clone.push({'id': interactible_id, 'timestamp':this.state.interactible_timestamp})
            this.setState({interactibles: interactibles_clone});
            this.props.notify('added interactible account!', 400)
        }
    }

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
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.map((item, index) => (
                            <li style={{'padding': '5px'}} onClick={()=>console.log()}>
                                <div style={{height:140, width:'100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px','padding':'10px 0px 0px 10px', 'max-width':'420px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                                    <div style={{'margin':'10px 20px 0px 0px'}}>
                                        <img src={Letter} style={{height:40 ,width:'auto'}} />
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
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
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
                <div style={{overflow: 'auto', maxHeight: height}}>
                    {this.render_set_token_and_amount_part()}
                    <div style={{height: 20}}/>
                    {this.render_set_prices_list_part()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row" style={{'padding': '0px 0px 0px 20px', overflow: 'auto', maxHeight: height}}>
                    <div className="col-6" style={{'padding': '0px 0px 0px 0px'}}>
                        {this.render_set_token_and_amount_part()}
                    </div>
                    <div className="col-6">
                        {this.render_set_prices_list_part()}
                    </div>
                </div>
                
            )
        }
    }

    render_set_token_and_amount_part(){
        return(
            <div>
                {this.render_detail_item('3', {'title':'Exchange ID', 'details':'The an exchange by its id, then the desired price and click add', 'size':'l'})}

                <div style={{height:10}}/>
                <TextInput height={30} placeholder={'Exchange ID'} when_text_input_field_changed={this.when_exchange_id_input_field_changed.bind(this)} text={this.state.exchange_id} theme={this.props.theme}/>

                {this.load_token_suggestions('exchange_id')}
                <div style={{height: 20}}/>

                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                    {this.render_detail_item('2', { 'style':'l', 'title':'Price', 'subtitle':this.format_power_figure(this.state.price_amount), 'barwidth':this.calculate_bar_width(this.state.price_amount), 'number':this.format_account_balance_figure(this.state.price_amount), 'barcolor':'', 'relativepower':'transactions', })}
                </div>

                <NumberPicker number_limit={bigInt('1e72')} when_number_picker_value_changed={this.when_price_amount.bind(this)} theme={this.props.theme} power_limit={63}/>

                {this.render_detail_item('0')}

                <div style={{'padding': '5px'}} onClick={() => this.when_add_price_set()}>
                    {this.render_detail_item('5', {'text':'Add Price', 'action':''})}
                </div>
            </div>
        )
    }

    load_token_suggestions(target_type){
        var items = [].concat(this.get_suggested_tokens())
        var background_color = this.props.theme['card_background_color']
        var card_shadow_color = this.props.theme['card_shadow_color']
        return(
            <div style={{'margin':'0px 0px 0px 5px','padding': '5px 0px 7px 0px', width: '97%', 'background-color': 'transparent'}}>
                    <ul style={{'list-style': 'none', 'padding': '0px 0px 5px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '13px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                      {items.map((item, index) => (
                          <li style={{'display': 'inline-block', 'margin': '5px 5px 5px 5px', '-ms-overflow-style': 'none'}} onClick={() => this.when_price_suggestion_clicked(item, index, target_type)}>
                              {this.render_detail_item('3', item['label'])}
                          </li>
                      ))}
                  </ul>
                </div>
        )
    }

   get_suggested_tokens(){
        var items = [
            {'id':'3', 'label':{'title':'END', 'details':'Account 3', 'size':'s'}},
            {'id':'5', 'label':{'title':'SPEND', 'details':'Account 5', 'size':'s'}},
        ];
        var exchanges_from_sync = this.props.app_state.created_tokens[this.state.e5]
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
                sorted_token_exchange_data.push(exchanges_from_sync[i])
            }
        }

        for (let i = 0; i < sorted_token_exchange_data.length; i++) {
            items.push({'id':sorted_token_exchange_data[i]['id'], 'label':{'title':sorted_token_exchange_data[i]['id'], 'details':sorted_token_exchange_data[i]['ipfs'].entered_title_text, 'size':'s'}})
        }

        return items;
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
        if(isNaN(exchange_id) || parseInt(exchange_id) < 0 || exchange_id == '' || !this.does_exchange_exist(exchange_id)){
            this.props.notify('please put a valid exchange id', 2600)
        }
        else if(amount == 0){
            this.props.notify('please put a valid amount', 2600)
        }
        else{
            var price_data_clone = this.state.price_data.slice()
            price_data_clone.push({'id':exchange_id, 'amount':amount})
            this.setState({price_data: price_data_clone});
            this.props.notify('added price!', 1400)
        }
    }

    does_exchange_exist(exchange_id){
        if(this.props.app_state.created_token_object_mapping[this.state.e5][parseInt(exchange_id)] == null){
            return false
        }
        return true
    }

    get_token_id_from_symbol(typed_search){
        if(!isNaN(typed_search)){
            return typed_search
        }
        var id = this.props.app_state.token_directory[this.state.e5][typed_search.toUpperCase()] == null ? typed_search : this.props.app_state.token_directory[this.state.e5][typed_search.toUpperCase()]

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
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.map((item, index) => (
                            <li style={{'padding': '5px'}} onClick={()=>console.log()}>
                                <div style={{height:140, width:'100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px','padding':'10px 0px 0px 10px', 'max-width':'420px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                                    <div style={{'margin':'10px 20px 0px 0px'}}>
                                        <img src={Letter} style={{height:40 ,width:'auto'}} />
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
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.reverse().map((item, index) => (
                            <li style={{'padding': '5px'}} onClick={()=>this.when_amount_clicked(item)}>
                                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                                    {this.render_detail_item('2', { 'style':'l', 'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[this.state.e5+item['id']], 'subtitle':this.format_power_figure(item['amount']), 'barwidth':this.calculate_bar_width(item['amount']), 'number':this.format_account_balance_figure(item['amount']), 'barcolor':'', 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['id']], })}
                                </div>
                            </li>
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
                <ViewGroups item_id={item_id} object_data={object_data} theme={this.props.theme} delete_entered_tag={this.delete_entered_tag_word.bind(this)} add_indexing_tag_for_new_job={this.add_indexing_tag_for_new_job.bind(this)}/>
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
            console.log(this.state.existing_symbol)
            console.log(symbol)
            this.props.notify(this.props.app_state.loc['752']/* 'that symbol is already in use' */, 3700)
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


}




export default NewTokenPage;