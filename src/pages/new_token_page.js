import React, { Component } from 'react';
import ViewGroups from './../components/view_groups';
import Tags from './../components/tags';
import NumberPicker from './../components/number_picker';
import TextInput from './../components/text_input';
import Letter from './../assets/letter.png';

import EndImg from './../assets/end_token_icon.png';
import SpendImg from './../assets/spend_token_icon.png';

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDateTimePicker } from "@mui/x-date-pickers/StaticDateTimePicker";

var bigInt = require("big-integer");

function number_with_commas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function bgN(number, power) {
  return bigInt((number+"e"+power)).toString();
}




class NewTokenPage extends Component {
    
    state = {
        selected: 0,
        new_token_page_tags_object: this.get_new_token_page_tags_object(),

        new_token_type_tags_object: this.get_new_token_type_tags_object(),
        token_exchange_liquidity_total_supply:0, default_exchange_amount_buy_limit:0,   
        minimum_transactions_between_swap:0, minimum_blocks_between_swap:0, minimum_time_between_swap:0, default_exchange_amount_sell_limit:0, minimum_entered_contracts_between_swap:0, minimum_transactions_for_first_buy:0, trust_fee_proportion:bigInt('1e16'), block_limit:0,

        new_token_unlocked_liquidity_tags_object:this.get_new_token_unlocked_liquidity_tags_object(), new_token_unlocked_supply_tags_object:this.get_new_token_unlocked_supply_tags_object(),
        new_token_fully_custom_tags_object:this.get_new_token_fully_custom_tags_object(),

        internal_block_halfing_proportion:0, block_limit_reduction_proportion:0, block_reset_limit:0,
        new_token_block_limit_sensitivity_tags_object: this.get_new_token_block_limit_sensitivity_tags_object(),
        default_authority_mint_limit:0, new_token_halving_type_tags_object: this.get_new_token_halving_type_tags_object(), maturity_limit:0, token_exchange_ratio_x:0, token_exchange_ratio_y:0,

        exchange_authority:'', trust_fee_target:'', exchange_id:'', price_amount:0, price_data:[],

        new_token_access_rights_tags_object: this.get_new_token_access_rights_tags_object(), new_token_interactible_moderator_tags_object: this.get_new_token_interactible_moderator_tags_object(),

        moderator_id:'', moderators:[], interactible_id:'', interactible_timestamp:0, interactibles:[]
    };

    get_new_token_page_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e','basic-configuration', 'secondary-configuration', 'token-authorities', 'token-prices'], [1]
            ],
        };
    }

    get_new_token_type_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e','capped', 'uncapped'], [1]
            ],
        };
    }


    get_new_token_unlocked_liquidity_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e','locked', 'unlocked'], [1]
            ],
        };
    }

    get_new_token_unlocked_supply_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e','locked', 'unlocked'], [1]
            ],
        };
    }


    get_new_token_fully_custom_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e','partially-custom', 'fully-custom'], [1]
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
                ['xor','',0], ['e','fixed', 'spread'], [1]
            ],
        };
    }

    get_new_token_access_rights_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e','enabled', 'disabled'], [1]
            ],
        };
    }

    get_new_token_interactible_moderator_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e','moderators', 'interactible'], [1]
            ],
        };
    }



    render(){
        return(
            <div style={{'padding':'10px 20px 0px 10px'}}>

                <div className="row">
                    <div className="col-10" style={{'padding': '5px 0px 0px 10px'}}>
                        <Tags page_tags_object={this.state.new_token_page_tags_object} tag_size={'l'} when_tags_updated={this.when_new_token_page_tags_updated.bind(this)} theme={this.props.theme}/>
                    </div>
                    <div className="col-2" style={{'padding': '0px 0px 0px 0px'}}>
                        <div style={{'padding': '5px'}} onClick={()=>this.finish_creating_object()}>
                            {this.render_detail_item('5', {'text':'Finish', 'action':''})}
                        </div>
                        
                    </div>
                </div>
                
                
                <div style={{'margin':'20px 0px 0px 0px'}}>
                    {this.render_everything()}   
                </div>
                
            </div>
        )
    }


    when_new_token_page_tags_updated(tag_obj){
        this.setState({new_token_page_tags_object: tag_obj})
    }


    render_everything(){
        var selected_item = this.get_selected_item(this.state.new_token_page_tags_object, this.state.new_token_page_tags_object['i'].active)

        if(selected_item == 'basic-configuration' || selected_item == 'e'){
            return(
                <div>
                    {this.render_basic_configuration_token_part()}
                </div>
            )    
        }
        else if(selected_item == 'secondary-configuration'){
            return(
                <div>
                    {this.render_secondary_configuration_token_part()}
                </div>
            ) 
        }
        else if(selected_item == 'token-authorities'){
            return(
                <div>
                    {this.render_token_authorities_part()}
                </div>
            )
        }
        else if(selected_item == 'token-prices'){
            return(
                <div>
                    {this.render_set_token_prices_list()}
                </div>
            )
        }
    }

    get_selected_item(object, option){
        var selected_item = object[option][2][0]
        var picked_item = object[option][1][selected_item];
        return picked_item
    }


    render_basic_configuration_token_part(){
        var size = this.props.size
        var height = this.props.height-150

        if(size == 's'){
            return(
                <div style={{overflow: 'auto', maxHeight: height}}>
                    {this.render_basic_configuration_token_part_one()}
                    <div style={{height: 20}}/>
                    {this.render_basic_configuration_token_part_two()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row" style={{'padding': '0px 0px 0px 20px', overflow: 'auto', maxHeight: height}}>
                    <div className="col-6" style={{'padding': '0px 0px 0px 0px'}}>
                        {this.render_basic_configuration_token_part_one()}
                    </div>
                    <div className="col-6">
                        {this.render_basic_configuration_token_part_two()}
                    </div>
                </div>
                
            )
        }
    }


    render_basic_configuration_token_part_one(){

        return(
            <div style={{'padding':'0px 0px 0px 0px'}}>

                {this.render_detail_item('3', {'title':'Set the token type', 'details':'Capped token (with limited supply) or uncapped token (with unlimited supply)', 'size':'l'})}

                <div style={{height:20}}/>
                <Tags page_tags_object={this.state.new_token_type_tags_object} tag_size={'l'} when_tags_updated={this.when_new_token_type_tags_object.bind(this)} theme={this.props.theme}/>

                {this.render_detail_item('0')}

                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                    {this.render_detail_item('2', { 'style':'l', 'title':'Token Supply', 'subtitle':this.format_power_figure(this.state.token_exchange_liquidity_total_supply), 'barwidth':this.calculate_bar_width(this.state.token_exchange_liquidity_total_supply), 'number':this.format_account_balance_figure(this.state.token_exchange_liquidity_total_supply), 'barcolor':'', 'relativepower':'tokens', })}
                </div>

                <NumberPicker number_limit={bigInt('1e72')} when_number_picker_value_changed={this.when_token_exchange_liquidity_total_supply.bind(this)} theme={this.props.theme} power_limit={63}/>

                {this.render_detail_item('0')}


                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                    {this.render_detail_item('2', { 'style':'l', 'title':'Buy Limit', 'subtitle':this.format_power_figure(this.state.default_exchange_amount_buy_limit), 'barwidth':this.calculate_bar_width(this.state.default_exchange_amount_buy_limit), 'number':this.format_account_balance_figure(this.state.default_exchange_amount_buy_limit), 'barcolor':'', 'relativepower':'tokens', })}
                </div>

                <NumberPicker number_limit={bigInt('1e72')} when_number_picker_value_changed={this.when_default_exchange_amount_buy_limit.bind(this)} theme={this.props.theme} power_limit={54}/>

                {this.render_detail_item('0')}


                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                    {this.render_detail_item('2', { 'style':'l', 'title':'Sell Limit', 'subtitle':this.format_power_figure(this.state.default_exchange_amount_sell_limit), 'barwidth':this.calculate_bar_width(this.state.default_exchange_amount_sell_limit), 'number':this.format_account_balance_figure(this.state.default_exchange_amount_sell_limit), 'barcolor':'', 'relativepower':'tokens', })}
                </div>

                <NumberPicker number_limit={bigInt('1e72')} when_number_picker_value_changed={this.when_default_exchange_amount_sell_limit.bind(this)} theme={this.props.theme} power_limit={54}/>

                {this.render_detail_item('0')}



                {this.render_detail_item('3', {'title':this.get_time_diff(this.state.minimum_time_between_swap), 'details':'Minimum Time Between Swap', 'size':'l'})}

                <NumberPicker number_limit={bigInt('1e72')} when_number_picker_value_changed={this.when_minimum_time_between_swap.bind(this)} theme={this.props.theme} power_limit={63}/>

                {this.render_detail_item('0')}


                {this.render_detail_item('3', {'title':this.format_proportion(this.state.trust_fee_proportion), 'details':'Trust Fee', 'size':'l'})}

                <NumberPicker number_limit={bigInt('1e72')} when_number_picker_value_changed={this.when_trust_fee_proportion.bind(this)} theme={this.props.theme} power_limit={9}/>

                {this.render_detail_item('0')}
            </div>
        )
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



    render_basic_configuration_token_part_two(){
       
        return(
            <div style={{'padding':'0px 0px 0px 0px'}}>
                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                    {this.render_detail_item('2', { 'style':'l', 'title':'Minimum Transactions Between Swap', 'subtitle':this.format_power_figure(this.state.minimum_transactions_between_swap), 'barwidth':this.calculate_bar_width(this.state.minimum_transactions_between_swap), 'number':this.format_account_balance_figure(this.state.minimum_transactions_between_swap), 'barcolor':'', 'relativepower':'transactions', })}
                </div>

                <NumberPicker number_limit={999} when_number_picker_value_changed={this.when_minimum_transactions_between_swap.bind(this)} theme={this.props.theme} power_limit={63}/>

                {this.render_detail_item('0')}


                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                    {this.render_detail_item('2', { 'style':'l', 'title':'Minimum Blocks Between Swap', 'subtitle':this.format_power_figure(this.state.minimum_blocks_between_swap), 'barwidth':this.calculate_bar_width(this.state.minimum_blocks_between_swap), 'number':this.format_account_balance_figure(this.state.minimum_blocks_between_swap), 'barcolor':'', 'relativepower':'blocks', })}
                </div>

                <NumberPicker number_limit={999} when_number_picker_value_changed={this.when_minimum_blocks_between_swap.bind(this)} theme={this.props.theme} power_limit={63}/>

                {this.render_detail_item('0')}



                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                    {this.render_detail_item('2', { 'style':'l', 'title':'Minimum Entered Contracts Between Swap', 'subtitle':this.format_power_figure(this.state.minimum_entered_contracts_between_swap), 'barwidth':this.calculate_bar_width(this.state.minimum_entered_contracts_between_swap), 'number':this.format_account_balance_figure(this.state.minimum_entered_contracts_between_swap), 'barcolor':'', 'relativepower':'blocks', })}
                </div>

                <NumberPicker number_limit={999} when_number_picker_value_changed={this.when_minimum_entered_contracts_between_swap.bind(this)} theme={this.props.theme} power_limit={63}/>

                {this.render_detail_item('0')}


                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                    {this.render_detail_item('2', { 'style':'l', 'title':'Minimum Transactions For First Buy', 'subtitle':this.format_power_figure(this.state.minimum_transactions_for_first_buy), 'barwidth':this.calculate_bar_width(this.state.minimum_transactions_for_first_buy), 'number':this.format_account_balance_figure(this.state.minimum_transactions_for_first_buy), 'barcolor':'', 'relativepower':'blocks', })}
                </div>

                <NumberPicker number_limit={999} when_number_picker_value_changed={this.when_minimum_transactions_for_first_buy.bind(this)} theme={this.props.theme} power_limit={63}/>

                {this.render_detail_item('0')}


                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                    {this.render_detail_item('2', { 'style':'l', 'title':'Minimum Entered Contracts For First Buy', 'subtitle':this.format_power_figure(this.state.minimum_entered_contracts_for_first_buy), 'barwidth':this.calculate_bar_width(this.state.minimum_entered_contracts_for_first_buy), 'number':this.format_account_balance_figure(this.state.minimum_entered_contracts_for_first_buy), 'barcolor':'', 'relativepower':'blocks', })}
                </div>

                <NumberPicker number_limit={999} when_number_picker_value_changed={this.when_minimum_entered_contracts_for_first_buy.bind(this)} theme={this.props.theme} power_limit={63}/>

                {this.render_detail_item('0')}
            </div>
        )
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





    render_secondary_configuration_token_part(){
        var size = this.props.size
        var height = this.props.height-150

        if(size == 's'){
            return(
                <div style={{overflow: 'auto', maxHeight: height}}>
                    {this.render_secondary_token_configuration_part_one()}
                    <div style={{height: 20}}/>
                    {this.render_secondary_token_configuration_part_two()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row" style={{'padding': '0px 0px 0px 20px', overflow: 'auto', maxHeight: height}}>
                    <div className="col-6" style={{'padding': '0px 0px 0px 0px'}}>
                        {this.render_secondary_token_configuration_part_one()}
                    </div>
                    <div className="col-6">
                        {this.render_secondary_token_configuration_part_two()}
                    </div>
                </div>
                
            )
        }
    }

    render_secondary_token_configuration_part_one(){
        return(
            <div style={{'padding':'0px 0px 0px 0px'}}>
                {this.render_detail_item('3', {'title':'Unlocked Liquidity', 'details':'If set to unlocked, You have direct access to the token exchanges liquidity', 'size':'l'})}

                <div style={{height:20}}/>
                <Tags page_tags_object={this.state.new_token_unlocked_liquidity_tags_object} tag_size={'l'} when_tags_updated={this.when_new_token_unlocked_liquidity_tags_object.bind(this)} theme={this.props.theme}/>

                {this.render_detail_item('0')}

                {this.render_detail_item('3', {'title':'Unlocked Supply', 'details':'If set to unlocked, you can mint more of the token outside the exchange', 'size':'l'})}

                <div style={{height:20}}/>
                <Tags page_tags_object={this.state.new_token_unlocked_supply_tags_object} tag_size={'l'} when_tags_updated={this.when_new_token_unlocked_supply_tags_object.bind(this)} theme={this.props.theme}/>

                {this.render_detail_item('0')}


                {this.render_detail_item('3', {'title':'Fully Custom', 'details':'If set to fully-custom, you have full access to the token exchanges configuration', 'size':'l'})}

                <div style={{height:20}}/>
                <Tags page_tags_object={this.state.new_token_fully_custom_tags_object} tag_size={'l'} when_tags_updated={this.when_new_token_fully_custom_tags_object.bind(this)} theme={this.props.theme}/>

                {this.render_detail_item('0')}

                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                    {this.render_detail_item('2', { 'style':'l', 'title':'Block Limit', 'subtitle':this.format_power_figure(this.state.block_limit), 'barwidth':this.calculate_bar_width(this.state.block_limit), 'number':this.format_account_balance_figure(this.state.block_limit), 'barcolor':'', 'relativepower':'tokens', })}
                </div>

                <NumberPicker number_limit={bigInt('1e72')} when_number_picker_value_changed={this.when_block_limit.bind(this)} theme={this.props.theme} power_limit={63}/>

                {this.render_detail_item('0')}



                {this.render_detail_item('3', {'title':this.format_proportion(this.state.default_authority_mint_limit), 'details':'Authority Mint Limit', 'size':'l'})}

                <NumberPicker number_limit={bigInt('1e72')} when_number_picker_value_changed={this.when_default_authority_mint_limit.bind(this)} theme={this.props.theme} power_limit={9}/>

                {this.render_detail_item('0')}


                {this.render_detail_item('3', {'title':'Halving type (for Uncapped Tokens)', 'details':'If set to spread, each minter receives a slightly less ammount than the previous minter in a given block.', 'size':'l'})}

                <div style={{height:20}}/>
                <Tags page_tags_object={this.state.new_token_halving_type_tags_object} tag_size={'l'} when_tags_updated={this.when_new_token_halving_type_tags_object.bind(this)} theme={this.props.theme}/>

                {this.render_detail_item('0')}


                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                    {this.render_detail_item('2', { 'style':'l', 'title':'Maturity Limit', 'subtitle':this.format_power_figure(this.state.maturity_limit), 'barwidth':this.calculate_bar_width(this.state.maturity_limit), 'number':this.format_account_balance_figure(this.state.maturity_limit), 'barcolor':'', 'relativepower':'tokens', })}
                </div>

                <NumberPicker number_limit={bigInt('1e72')} when_number_picker_value_changed={this.when_maturity_limit.bind(this)} theme={this.props.theme} power_limit={63}/>

                {this.render_detail_item('0')}

            </div>
        )
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
    


    render_secondary_token_configuration_part_two(){
        return(
            <div style={{'padding':'0px 0px 0px 0px'}}>
                {this.render_detail_item('3', {'title':this.format_proportion(this.state.internal_block_halfing_proportion), 'details':'Internal Block Halving Proportion', 'size':'l'})}

                <NumberPicker number_limit={bigInt('1e72')} when_number_picker_value_changed={this.when_internal_block_halfing_proportion.bind(this)} power_limit={9} theme={this.props.theme} />

                {this.render_detail_item('0')}


                {this.render_detail_item('3', {'title':this.format_proportion(this.state.block_limit_reduction_proportion), 'details':'Block Limit Reduction Proportion', 'size':'l'})}

                <NumberPicker number_limit={bigInt('1e72')} when_number_picker_value_changed={this.when_block_limit_reduction_proportion.bind(this)} power_limit={9} theme={this.props.theme} />

                {this.render_detail_item('0')}


                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                    {this.render_detail_item('2', { 'style':'l', 'title':'Block Reset Limit', 'subtitle':this.format_power_figure(this.state.block_reset_limit), 'barwidth':this.calculate_bar_width(this.state.block_reset_limit), 'number':this.format_account_balance_figure(this.state.block_reset_limit), 'barcolor':'', 'relativepower':'blocks', })}
                </div>

                <NumberPicker number_limit={999} when_number_picker_value_changed={this.when_block_reset_limit.bind(this)} theme={this.props.theme} power_limit={63}/>

                {this.render_detail_item('0')}


                {this.render_detail_item('3', {'title':'Block Limit Sensitivity (for Uncapped Tokens)', 'details':'The sensitivity of your new exchange to increasing demand', 'size':'l'})}

                <div style={{height:20}}/>
                <Tags page_tags_object={this.state.new_token_block_limit_sensitivity_tags_object} tag_size={'l'} when_tags_updated={this.when_new_token_block_limit_sensitivity_tags_object.bind(this)} theme={this.props.theme}/>

                {this.render_detail_item('0')}


                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                    {this.render_detail_item('2', { 'style':'l', 'title':'Exchange Ratio X', 'subtitle':this.format_power_figure(this.state.token_exchange_ratio_x), 'barwidth':this.calculate_bar_width(this.state.token_exchange_ratio_x), 'number':this.format_account_balance_figure(this.state.token_exchange_ratio_x), 'barcolor':'', 'relativepower':'tokens', })}
                </div>

                <NumberPicker number_limit={999} when_number_picker_value_changed={this.when_token_exchange_ratio_x.bind(this)} theme={this.props.theme} power_limit={63}/>

                {this.render_detail_item('0')}


                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                    {this.render_detail_item('2', { 'style':'l', 'title':'Exchange Ratio Y', 'subtitle':this.format_power_figure(this.state.token_exchange_ratio_y), 'barwidth':this.calculate_bar_width(this.state.token_exchange_ratio_y), 'number':this.format_account_balance_figure(this.state.token_exchange_ratio_y), 'barcolor':'', 'relativepower':'tokens', })}
                </div>

                <NumberPicker number_limit={999} when_number_picker_value_changed={this.when_token_exchange_ratio_y.bind(this)} theme={this.props.theme} power_limit={63}/>

                {this.render_detail_item('0')}
                
            </div>
        )
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

                {this.render_detail_item('3', {'title':'Access Rights', 'details':'If enabled, access to the exchange will be restricted to moderators and specified accounts', 'size':'l'})}

                <div style={{height:20}}/>
                <Tags page_tags_object={this.state.new_token_access_rights_tags_object} tag_size={'l'} when_tags_updated={this.when_new_token_access_rights_tags_object.bind(this)} theme={this.props.theme}/>
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
        var items = this.get_suggested_accounts()
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

    get_suggested_accounts(){
        return[
            {'id':'53', 'label':{'title':'My Account', 'details':'Account', 'size':'s'}},
            {'id':'2', 'label':{'title':'Main Contract', 'details':'Contract ID 2', 'size':'s'}},
            {'id':'0','label':{'title':'Burn Account', 'details':'Account ID 0', 'size':'s'}},
        ]
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
        var moderator_id = this.state.moderator_id
        if(isNaN(moderator_id)){
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
        var items = this.state.moderators

        if(items.length == 0){
            items = [0,3,0]
            return(
                <div style={{overflow: 'auto', maxHeight: middle}}>
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
                <div style={{overflow: 'auto', maxHeight: middle}}>
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

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <StaticDateTimePicker orientation="portrait" onChange={(newValue) => this.when_new_dat_time_value_set(newValue)}/>
                </LocalizationProvider>

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
        var interactible_id = this.state.interactible_id
        if(isNaN(interactible_id)){
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
        var items = this.state.interactibles

        if(items.length == 0){
            items = [0,3,0]
            return(
                <div style={{overflow: 'auto', maxHeight: middle}}>
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
                <div style={{overflow: 'auto', maxHeight: middle}}>
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
        var items = this.get_suggested_tokens()
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
        return[
            {'id':'3', 'label':{'title':'END', 'details':'Account 3', 'size':'s', 'image':EndImg}},
            {'id':'5', 'label':{'title':'SPEND', 'details':'Account 5', 'size':'s','image':SpendImg}},
        ]
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
        var exchange_id = this.state.exchange_id
        var amount = this.state.price_amount
        if(isNaN(exchange_id)){
            this.props.notify('please put a valid exchange id', 600)
        }
        else if(amount == 0){
            this.props.notify('please put a valid amount', 600)
        }
        else{
            var price_data_clone = this.state.price_data.slice()
            price_data_clone.push({'id':exchange_id, 'amount':amount})
            this.setState({price_data: price_data_clone});
            this.props.notify('added price!', 400)
        }
    }

    render_set_prices_list_part(){
        var middle = this.props.height-500;
        var size = this.props.size;
        if(size == 'm'){
            middle = this.props.height-100;
        }
        var items = this.state.price_data

        if(items.length == 0){
            items = [0,3,0]
            return(
                <div style={{overflow: 'auto', maxHeight: middle}}>
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
                <div style={{overflow: 'auto', maxHeight: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.reverse().map((item, index) => (
                            <li style={{'padding': '5px'}} onClick={()=>this.when_amount_clicked(item)}>
                                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                                    {this.render_detail_item('2', { 'style':'l', 'title':'Exchange ID: '+item['id'], 'subtitle':this.format_power_figure(item['amount']), 'barwidth':this.calculate_bar_width(item['amount']), 'number':this.format_account_balance_figure(item['amount']), 'barcolor':'', 'relativepower':'tokens', })}
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
                <ViewGroups item_id={item_id} object_data={object_data} theme={this.props.theme} />
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


    finish_creating_object(){
        var token_type = this.get_selected_item(this.state.new_token_type_tags_object, this.state.new_token_type_tags_object['i'].active)

        if(this.state.trust_fee_proportion == 0){
            this.props.notify('you cant set 0% as a trust fee', 1800)
        }
        else if(token_type =='uncapped' && this.state.block_limit <= this.state.default_exchange_amount_buy_limit && this.state.block_limit !=0){
            this.props.notify('your preferred block limit should exceed the buy limit set',1800)
        }
        else if(token_type == 'uncapped' && this.state.maturity_limit <= this.state.block_limit && this.state.maturity_limit !=0){
            this.props.notify('your preferred maturity limit should exceed the block limit set',1800)
        }
        else if(this.state.token_exchange_ratio_x == 0){
            this.props.notify('please set your preferred exchange ratio x', 1800)
        }
        else if(this.state.token_exchange_ratio_y == 0){
            this.props.notify('please set your preferred exchange ratio y', 1800)
        }
        else if(token_type == 'capped' && this.state.price_data.length == 0){
            this.props.notify('please specify token prices for buying your token',1800)
        }
        else if(token_type == 'capped' && this.state.token_exchange_liquidity_total_supply != this.state.token_exchange_ratio_x){
            this.props.notify('your tokens supply and exchange ratio x should match',1800)
        }
        else if(token_type == 'capped' && this.state.token_exchange_liquidity_total_supply <100_000){
            this.props.notify('your tokens supply should be greater than 100,000',1800)
        }
        else{
            var obj = this.state

        }

    }


}




export default NewTokenPage;