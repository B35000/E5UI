import React, { Component } from 'react';
import ViewGroups from './../components/view_groups'
import Tags from './../components/tags';
import TextInput from './../components/text_input';
import NumberPicker from './../components/number_picker';

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDateTimePicker } from "@mui/x-date-pickers/StaticDateTimePicker";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import Letter from './../assets/letter.png';

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

class NewProposalPage extends Component {
    
    state = {
        selected: 0, id: makeid(32), type:'proposal', entered_indexing_tags:['new', 'proposal'],
        contract_item: {'data':[[],[0,0,0,0,0,0,0,0,0,0]]},
        entered_tag_text: '',entered_indexing_tags:[],entered_title_text:'',

        new_proposal_title_tags_object:this.get_new_proposal_title_tags_object(), new_proposal_type_tags_object:this.get_new_proposal_type_tags_object(),
        reconfig_items_tags_object:this.get_reconfig_items_tags_object(),

        auto_wait_tags_object:this.get_auto_wait_tags_object(),
        can_modify_contract_as_moderator: this.get_can_modify_contract_as_moderator(),
        can_extend_enter_contract_at_any_time: this.get_can_extend_enter_contract_at_any_time(),
        bounty_limit_type: this.get_bounty_limit_type(),
        contract_force_exit_enabled: this.get_contract_force_exit_enabled(),
        new_token_halving_type_tags_object: this.get_new_token_halving_type_tags_object(),
        new_token_block_limit_sensitivity_tags_object: this.get_new_token_block_limit_sensitivity_tags_object(),

        page:0, proposal_expiry_time:Math.round(new Date().getTime()/1000), 
        proposal_submit_expiry_time:Math.round(new Date().getTime()/1000), 
        
        modify_target_id:'', 
        
        spend_target_input_text:'', spend_token_input_text:'', 
        spend_amount:0, spend_actions:[], 
        
        reconfig_number:0, reconfig_proportion:0, reconfig_duration:0, reconfig_target_id:'',
        reconfig_values:[],

        exchange_transfer_target:'', exchange_transfer_amount:0, exchange_transfer_values:[], exchange_transfer_receiver:'', token_target:'',

        bounty_exchange_target:'', bounty_amount:0, bounty_values:[]
    };


    get_new_proposal_title_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['or','',0], ['e','proposal-configuration','proposal-data','bounty-data'], [0]
            ],
        };
    }

    get_new_proposal_type_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e','spend','reconfig', 'exchange-transfer'], [1]
            ],
        };
    }


    get_reconfig_items_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['or','',0], ['e','e.contract','e.subscription', 'e.exchange'], [0]
            ],
            'contract':[
                ['xor','',0], ['contract','Vote Bounty Split Proportion','Maximum Extend Enter Contract Limit', 'Minimum End Bounty Amount', 'Proposal Expiry Duration Limit', 'Maximum Enter Contract Duration', 'Auto Wait', 'Proposal Modify Expiry Duration Limit', 'Moderator Modify Privelage', 'Unlimited Extend Contract Time', 'Maximum Proposal Expiry Submit Expiry time difference', 'Bounty Limit Type', 'Force Exit Enabled', 'Minimum Spend Bounty Amount'], [1]
            ],
            'subscription':[
                ['xor','',0], ['subscription','Minimum Buy Amount','Target Authority', 'Target Beneficiary', 'Maximum Buy Amount', 'Minimum Cancellable Balance Amount'], [1]
            ],
            'exchange':[
                ['xor','',0], ['exchange','Buy Limit','Trust Fee', 'Sell Limit', 'Minimum Time Between Swap', 'Minimum Transactions Between Swap', 'Minimum Blocks Between Swap', 'Minimum Entered Contracts Between Swap', 'Minimum Transactions For First Buy', 'Minimum Entered Contracts For First Buy', 'Block Limit', 'Halving type', 'Maturity Limit', 'Internal Block Halving Proportion', 'Block Limit Reduction Proportion', 'Block Reset Limit', 'Block Limit Sensitivity', 'Exchange Ratio X', 'Exchange Ratio Y'], [1]
            ],
        };
    }

    get_auto_wait_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e','no', 'yes'], [1]
            ],
        };
    }

    get_can_modify_contract_as_moderator(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e','modifiable', 'non-modifiable'], [1]
            ],
        };
    }

    get_can_extend_enter_contract_at_any_time(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e','enabled', 'disabled'], [1]
            ],
        };
    }

    get_bounty_limit_type(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e','relative', 'absolute'], [2]
            ],
        };
    }

    get_contract_force_exit_enabled(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e','enabled', 'disabled'], [1]
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


    render(){
        return(
            <div style={{'padding':'10px 20px 0px 10px'}}>
                <div className="row">
                    <div className="col-9" style={{'padding': '5px 0px 0px 10px'}}>
                        <Tags page_tags_object={this.state.new_proposal_title_tags_object} tag_size={'l'} when_tags_updated={this.when_new_proposal_title_tags_object_updated.bind(this)} theme={this.props.theme}/>
                    </div>
                    <div className="col-3" style={{'padding': '0px 0px 0px 0px'}}>
                        <div style={{'padding': '5px'}} onClick={()=>this.finish_creating_object()}>
                            {this.render_detail_item('5', {'text':'Finish', 'action':''})}
                        </div>
                    </div>
                </div>

                <div style={{height: 10}}/>
                {this.render_detail_item('4', {'font':'Sans-serif', 'textsize':'13px', 'text':'Create your new proposal for contract ID: '+this.state.contract_item['id']})}

                <div style={{'margin':'20px 0px 0px 0px'}}>
                    {this.render_everything()}   
                </div>
                
            </div>
        )
    }

    when_new_proposal_title_tags_object_updated(tag_obj){
        this.setState({new_proposal_title_tags_object: tag_obj})
    }


    render_everything(){
        var selected_item = this.get_selected_item(this.state.new_proposal_title_tags_object, this.state.new_proposal_title_tags_object['i'].active)

        if(selected_item == 'e'){
            return(
                <div>
                    {this.render_enter_tags_part()}
                </div>
            )
        }
        else if(selected_item == 'proposal-configuration'){
            return(
                <div>
                    {this.render_proposal_configuration_data()}
                </div>
            )
        }
        else if(selected_item == 'proposal-data'){
            return(
                <div>
                    {this.render_proposal_data_ui()}
                </div>
            )
        }
        else if(selected_item == 'bounty-data'){
            return(
                <div>
                    {this.render_bounty_data_ui()}
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
        return(
            <div>
                {this.render_title_tags_part()}
                
                {this.render_new_job_object()}
                {this.render_detail_item('0')}
            </div>
        )
    }

        render_title_tags_part(){
        return(
            <div style={{'padding':'0px 15px 0px 10px'}}>
                <TextInput height={30} placeholder={'Enter Title...'} when_text_input_field_changed={this.when_title_text_input_field_changed.bind(this)} text={this.state.entered_title_text} theme={this.props.theme}/>

                {this.render_detail_item('0')}
                {this.render_detail_item('4',{'font':'Sans-serif', 'textsize':'15px','text':'Set tags for indexing your new Proposal'})}
                <div style={{height:10}}/>

                <div className="row">
                    <div className="col-9" style={{'margin': '0px 0px 0px 0px'}}>
                        <TextInput height={30} placeholder={'Enter Tag...'} when_text_input_field_changed={this.when_index_text_input_field_changed.bind(this)} text={this.state.entered_tag_text} theme={this.props.theme}/>
                    </div>
                    <div className="col-3" style={{'padding': '0px 5px 0px 0px'}} onClick={() => this.add_indexing_tag_for_new_job()}>
                        {this.render_detail_item('5', {'text':'Add', 'action':''})}
                    </div>
                </div>
                
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

    add_indexing_tag_for_new_job(){
        var typed_word = this.state.entered_tag_text.trim();

        if(typed_word == ''){
            this.props.notify('type something!', 400)
        }
        else if(this.hasWhiteSpace(typed_word)){
            this.props.notify('enter one word!', 400)
        }
        else{
            var cloned_seed_array = this.state.entered_indexing_tags.slice()
            cloned_seed_array.push(typed_word)
            this.setState({entered_indexing_tags: cloned_seed_array, entered_tag_text:''})
            this.props.notify('tag added!', 200)
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
        this.props.notify('tag removed', 200)
    }

    render_new_job_object(){
        var background_color = this.props.theme['card_background_color']
        var card_shadow_color = this.props.theme['card_shadow_color']
        return ( 
            <div onClick={() => console.log()} style={{height:'auto', 'background-color': background_color, 'border-radius': '15px','padding':'5px 5px 0px 0px', 'box-shadow': '0px 0px 1px 2px '+card_shadow_color, 'margin':'0px 10px 10px 10px'}}>
                <div style={{'padding': '5px 0px 5px 5px'}}>
                    {this.render_detail_item('1',{'active_tags':this.state.entered_indexing_tags, 'indexed_option':'indexed', 'when_tapped':'delete_entered_tag_word'})}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('4',{'font':'Sans-serif', 'textsize':'15px','text':this.state.entered_title_text})}
                    {this.render_detail_item('0')}

                </div>         
            </div>
        );
    }







    render_proposal_configuration_data(){
        return(
            <div>
                {this.render_configuration_section_parts()}

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
        if(page < 3){
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


    render_configuration_section_parts(){
        var page = this.state.page

        if(page == 0){
            return(
                <div>
                    {this.render_detail_item('3', {'title':'Consensus Type', 'details':'Set the type of action you wish to perform with the contract through your new proposal', 'size':'l'})}
                    <div style={{height:20}}/>

                    <Tags page_tags_object={this.state.new_proposal_type_tags_object} tag_size={'l'} when_tags_updated={this.when_new_proposal_type_tags_object_updated.bind(this)} theme={this.props.theme}/>
                </div>
            )
        }
        else if(page == 1){
            return(
                <div>
                    {this.render_detail_item('3', {'title':'Proposal Exipry Time', 'details':'Set the time after which youre set to submit the new proposal during whichno new votes can be cast.', 'size':'l'})}
                    <div style={{height:20}}/>
                    <ThemeProvider theme={createTheme({ palette: { mode: this.props.theme['calendar_color'], }, })}>
                        <CssBaseline />
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <StaticDateTimePicker orientation="portrait" onChange={(newValue) => this.when_new_dat_time_value_set(newValue)}/>
                        </LocalizationProvider>
                    </ThemeProvider>

                    <div style={{height:20}}/>
                    {this.render_detail_item('3', {'title':this.get_time_from_now(this.state.proposal_expiry_time), 'details':'Time from now', 'size':'l'})}
                </div>
            )
        }
        else if(page == 2){
            return(
                <div>
                    {this.render_detail_item('3', {'title':'Consensus Submit Expiry Time', 'details':'The time after which you cannot sumbit your new proposal.', 'size':'l'})}
                    <div style={{height:20}}/>

                    <ThemeProvider theme={createTheme({ palette: { mode: this.props.theme['calendar_color'], }, })}>
                        <CssBaseline />
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <StaticDateTimePicker orientation="portrait" onChange={(newValue) => this.when_new_submit_time_value_set(newValue)}/>
                        </LocalizationProvider>
                    </ThemeProvider>

                    <div style={{height:20}}/>
                    {this.render_detail_item('3', {'title':this.get_time_from_now(this.state.proposal_submit_expiry_time), 'details':'Time from now', 'size':'l'})}
                </div>
            )
        }
        else if(page == 3){
            return(
                <div>
                    {this.render_detail_item('3', {'title':'Modify Target', 'details':'The target object thats being modified if the consensus type is reconfig', 'size':'l'})}
                    <div style={{height:20}}/>

                    <TextInput height={30} placeholder={'Object ID...'} when_text_input_field_changed={this.when_modify_target_text_input_field_changed.bind(this)} text={this.state.modify_target_id} theme={this.props.theme}/>

                    {this.load_account_suggestions('modify_target')}

                </div>
            )
        }
    }

    when_new_dat_time_value_set(value){
        const selectedDate = value instanceof Date ? value : new Date(value);
        const timeInSeconds = Math.floor(selectedDate.getTime() / 1000);
        this.setState({proposal_expiry_time: timeInSeconds})
    }

    when_new_submit_time_value_set(value){
        const selectedDate = value instanceof Date ? value : new Date(value);
        const timeInSeconds = Math.floor(selectedDate.getTime() / 1000);
        this.setState({proposal_submit_expiry_time: timeInSeconds})
    }


    when_new_proposal_type_tags_object_updated(tag_obj){
        this.setState({new_proposal_type_tags_object: tag_obj})
    }


    when_modify_target_text_input_field_changed(text){
        this.setState({modify_target_id: text})
    }


    enter_next_page(){
        var page = this.state.page
        if(page < 18){
            this.setState({page: this.state.page+1})
        }
    }

    enter_previous_page(){
        var page = this.state.page
        if(page > 0){
            this.setState({page: this.state.page-1})
        }
    }


    load_account_suggestions(type){
        var items = this.get_suggested_accounts(type)
        var background_color = this.props.theme['card_background_color']
        var card_shadow_color = this.props.theme['card_shadow_color']
        return(
            <div style={{'margin':'0px 0px 0px 5px','padding': '5px 0px 0px 0px', width: '97%', 'background-color': 'transparent'}}>
                    <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '13px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                      {items.map((item, index) => (
                          <li style={{'display': 'inline-block', 'margin': '5px 5px 5px 5px', '-ms-overflow-style': 'none'}} onClick={() => this.when_suggestion_clicked(item, index, type)}>
                              {this.render_detail_item('3', item['label'])}
                          </li>
                      ))}
                  </ul>
                </div>
        )
    }

    get_suggested_accounts(type){
        if(type == 'modify_target'){
            return[
                {'id':''+this.state.contract_item['id'], 'label':{'title':'This Contract', 'details':'Contract', 'size':'s'}},
                {'id':'2', 'label':{'title':'Main Contract', 'details':'Contract ID 2', 'size':'s'}},
                {'id':'3','label':{'title':'End Exchange', 'details':'Account ID 3', 'size':'s'}},
                {'id':'5','label':{'title':'Spend Exchange', 'details':'Account ID 5', 'size':'s'}},
            ]
        }
        else if(type == 'spend_target'){
            return[
                {'id':'53', 'label':{'title':'My Account', 'details':'Account', 'size':'s'}},
                {'id':'2', 'label':{'title':'Main Contract', 'details':'Contract ID 2', 'size':'s'}},
                {'id':'0','label':{'title':'Burn Account', 'details':'Account ID 0', 'size':'s'}},
            ]
        }
        else if(type == 'spend_token'){
            return[
                {'id':'3', 'label':{'title':'End Token', 'details':'Exchange ID 3', 'size':'s'}},
                {'id':'5', 'label':{'title':'Spend Token', 'details':'Exchange ID 5', 'size':'s'}},
            ]
        }
        else if(type == 'reconfig_target_id'){
            return[
                {'id':'53', 'label':{'title':'My Account', 'details':'Account', 'size':'s'}},
                {'id':'2', 'label':{'title':'Main Contract', 'details':'Contract ID 2', 'size':'s'}},
                {'id':'0','label':{'title':'Burn Account', 'details':'Account ID 0', 'size':'s'}},
            ]
        }
        else if(type == 'exchange_transfer_target'){
            return[
                {'id':'3', 'label':{'title':'End Token', 'details':'Exchange ID 3', 'size':'s'}},
                {'id':'5', 'label':{'title':'Spend Token', 'details':'Exchange ID 5', 'size':'s'}},
            ]
        }
        else if(type =='bounty_exchange_target'){
            return[
                {'id':'3', 'label':{'title':'End Token', 'details':'Exchange ID 3', 'size':'s'}},
                {'id':'5', 'label':{'title':'Spend Token', 'details':'Exchange ID 5', 'size':'s'}},
            ]
        }
        else if(type == 'exchange_transfer_receiver'){
            return[
                {'id':'53', 'label':{'title':'My Account', 'details':'Account', 'size':'s'}},
                {'id':'2', 'label':{'title':'Main Contract', 'details':'Contract ID 2', 'size':'s'}},
                {'id':'0','label':{'title':'Burn Account', 'details':'Account ID 0', 'size':'s'}},
            ]
        }
        else if(type == 'token_target'){
            return[
                {'id':'3', 'label':{'title':'End Token', 'details':'Exchange ID 3', 'size':'s'}},
                {'id':'5', 'label':{'title':'Spend Token', 'details':'Exchange ID 5', 'size':'s'}},
            ]
        }
        
    }

    when_suggestion_clicked(item, pos, type){
        if(type == 'modify_target'){
            this.setState({modify_target_id: item['id']})
        }
        else if(type == 'spend_target'){
            this.setState({spend_target_input_text: item['id']})
        }
        else if(type == 'spend_token'){
            this.setState({spend_token_input_text: item['id']})
        }
        else if(type == 'reconfig_target_id'){
            this.setState({reconfig_target_id: item['id']})
        }
        else if(type == 'exchange_transfer_target'){
            this.setState({exchange_transfer_target: item['id']})
        }
        else if(type == 'bounty_exchange_target'){
            this.setState({bounty_exchange_target: item['id']})
        }
        else if(type == 'exchange_transfer_receiver'){
            this.setState({exchange_transfer_receiver: item['id']})
        }
        else if(type == 'token_target'){
            this.setState({token_target: item['id']})
        }
    }









    render_proposal_data_ui(){
        var selected_item = this.get_selected_item(this.state.new_proposal_type_tags_object, this.state.new_proposal_type_tags_object['i'].active)

        if(selected_item == 'spend'){
            return(
                <div>
                    {this.render_spend_proposal_ui()}
                </div>
            )
        }
        else if(selected_item == 'reconfig'){
            return(
                <div>
                    {this.render_reconfig_proposal_ui()}
                </div>
            )
        }
        else if(selected_item == 'exchange-transfer'){
            return(
                <div>
                    {this.render_exchange_transfer_ui()}
                </div>
            )
        }
    }


    render_spend_proposal_ui(){
        return(
            <div>
                <div style={{height:10}}/>
                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                    {this.render_detail_item('2', { 'style':'l', 'title':'End Balance', 'subtitle':this.format_power_figure(this.state.contract_item['end_balance']), 'barwidth':this.calculate_bar_width(this.state.contract_item['end_balance']), 'number':this.format_account_balance_figure(this.state.contract_item['end_balance']), 'barcolor':'', 'relativepower':'END', })}

                    {this.render_detail_item('2', { 'style':'l', 'title':'Spend Balance', 'subtitle':this.format_power_figure(this.state.contract_item['spend_balance']), 'barwidth':this.calculate_bar_width(this.state.contract_item['spend_balance']), 'number':this.format_account_balance_figure(this.state.contract_item['spend_balance']), 'barcolor':'', 'relativepower':'SPEND', })}

                </div>

                {this.render_detail_item('0')}

                {this.render_detail_item('3', {'title':'Spend Target', 'details':'Set a target for the spend action', 'size':'l'})}
                <div style={{height:20}}/>

                <TextInput height={30} placeholder={'Target ID...'} when_text_input_field_changed={this.when_spend_target_text_input_field_changed.bind(this)} text={this.state.spend_target_input_text} theme={this.props.theme}/>

                {this.load_account_suggestions('spend_target')}


                {this.render_detail_item('0')}


                {this.render_detail_item('3', {'title':'Exchange', 'details':'Set the token exchange your spending', 'size':'l'})}
                <div style={{height:20}}/>

                <TextInput height={30} placeholder={'Target ID...'} when_text_input_field_changed={this.when_spend_token_text_input_field_changed.bind(this)} text={this.state.spend_token_input_text} theme={this.props.theme}/>

                {this.load_account_suggestions('spend_token')}

                {this.render_detail_item('0')}

                {this.render_detail_item('3', {'title':'Spend Amount', 'details':'Set an amount for the spend action', 'size':'l'})}

                <div style={{height:20}}/>

                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                    {this.render_detail_item('2', { 'style':'l', 'title':'Picked Amount', 'subtitle':this.format_power_figure(this.state.spend_amount), 'barwidth':this.calculate_bar_width(this.state.spend_amount), 'number':this.format_account_balance_figure(this.state.spend_amount), 'barcolor':'', 'relativepower':'END', })}

                </div>

                <NumberPicker number_limit={bigInt('1e72')} when_number_picker_value_changed={this.when_spend_amount_set.bind(this)} theme={this.props.theme} power_limit={63}/>

                <div style={{'padding': '5px'}} onClick={()=>this.add_spend_action_to_list()}>
                    {this.render_detail_item('5', {'text':'Add', 'action':''})}
                </div>

                <div style={{height:20}}/>

                {this.render_spend_actions()}

                {this.render_detail_item('0')}
                {this.render_detail_item('0')}

            </div>
        )
    }


    when_spend_target_text_input_field_changed(new_text){
        this.setState({spend_target_input_text: new_text})
    }


    when_spend_token_text_input_field_changed(new_text){
        this.setState({spend_token_input_text: new_text})
    }


    when_spend_amount_set(amount){
        this.setState({spend_amount: amount})
    }


    add_spend_action_to_list(){
        var spend_target = this.state.spend_target_input_text.trim()
        var spend_token = this.state.spend_token_input_text.trim()
        var amount = this.state.spend_amount;

        if(isNaN(spend_target) || spend_target == ''){
            this.props.notify('please put a valid spend target', 600)
        }
        else if(isNaN(spend_token) || spend_token == ''){
            this.props.notify('please put a valid exchange id', 600)
        }
        else if(amount == 0){
            this.props.notify('please put a valid amount', 600)
        }
        else{
            var tx = {'amount': amount, 'spend_token':spend_token, 'spend_target':spend_target}
            var spend_actions_clone = this.state.spend_actions.slice()
            spend_actions_clone.push(tx)
            this.setState({spend_actions: spend_actions_clone, spend_target_input_text:'', spend_token_input_text:'', spend_amount:0})
            this.props.notify('spend action added to proposal!', 600)
        }
    }


    render_spend_actions(){
        var middle = this.props.height-100;
        var size = this.props.size;
        if(size == 'm'){
            middle = this.props.height-100;
        }
        var items = this.state.spend_actions

        if(items.length == 0){
            items = [0, 1]
            return(
                <div style={{overflow: 'auto', maxHeight: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.map((item, index) => (
                            <li style={{'padding': '5px'}} onClick={()=>console.log()}>
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
            var items = this.state.spend_actions
            return(
                <div style={{overflow: 'auto', maxHeight: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.reverse().map((item, index) => (
                            <li style={{'padding': '5px'}} onClick={()=>this.when_when_spend_action_clicked(item)}>
                                {this.render_detail_item('3', {'title':''+this.format_account_balance_figure(item['amount'])+' tokens', 'details':'target: '+item['spend_target']+', token: '+item['spend_token'], 'size':'s'})}
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
    }

    when_when_spend_action_clicked(item){
        var cloned_array = this.state.spend_actions.slice()
        const index = cloned_array.indexOf(item);
        if (index > -1) { // only splice array when item is found
            cloned_array.splice(index, 1); // 2nd parameter means remove one item only
        }
        this.setState({spend_actions: cloned_array})
        this.props.notify('spend action removed!', 600)
    }












    render_reconfig_proposal_ui(){
        return(
            <div>
                <Tags page_tags_object={this.state.reconfig_items_tags_object} tag_size={'l'} when_tags_updated={this.when_reconfig_items_tags_object_updated.bind(this)} theme={this.props.theme}/>
                <div style={{height:20}}/>

                {this.load_reconfig_item_selectors()}
                <div style={{height:20}}/>

                {this.load_reconfig_items()}
            </div>
        )
    }

    when_reconfig_items_tags_object_updated(tag_obj){
        this.setState({reconfig_items_tags_object:tag_obj})
    }


    load_reconfig_item_selectors(){
        var selected_item = this.get_selected_item(this.state.reconfig_items_tags_object, this.state.reconfig_items_tags_object['i'].active)


        if(selected_item == 'e'){
            return(<div></div>)
        }

        var properties = this.get_target_configuration(selected_item)
        var ui = properties['picker']

        if(ui == 'number'){
            return(
                <div>
                    <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                        {this.render_detail_item('2', { 'style':'l', 'title':selected_item, 'subtitle':this.format_power_figure(this.state.reconfig_number), 'barwidth':this.calculate_bar_width(this.state.reconfig_number), 'number':this.format_account_balance_figure(this.state.reconfig_number), 'barcolor':'', 'relativepower':'units', })}
                    </div>

                    <NumberPicker number_limit={bigInt('1e72')} when_number_picker_value_changed={this.when_amount_changed.bind(this)} theme={this.props.theme} power_limit={properties['powerlimit']}/>

                    <div style={{height:20}}/>
                    <div style={{'padding': '5px'}} onClick={()=>this.add_reconfiguration_item()}>
                    {this.render_detail_item('5', {'text':'Add Change', 'action':''})}
                </div>
                </div>
            )
        }
        else if(ui == 'proportion'){
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.format_proportion(this.state.reconfig_proportion), 'details':selected_item, 'size':'l'})}

                    <NumberPicker number_limit={bigInt('1e72')} when_number_picker_value_changed={this.when_proportion_changed.bind(this)} power_limit={properties['powerlimit']} theme={this.props.theme} />

                    <div style={{height:20}}/>
                    <div style={{'padding': '5px'}} onClick={()=>this.add_reconfiguration_item()}>
                    {this.render_detail_item('5', {'text':'Add Change', 'action':''})}
                </div>
                </div>
            )
        }
        else if(ui == 'time'){
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.get_time_diff(this.state.reconfig_duration), 'details':selected_item, 'size':'l'})}

                    <NumberPicker number_limit={bigInt('1e72')} when_number_picker_value_changed={this.when_time_changed.bind(this)} theme={this.props.theme} power_limit={properties['powerlimit']}/>
                    <div style={{height:20}}/>
                    <div style={{'padding': '5px'}} onClick={()=>this.add_reconfiguration_item()}>
                    {this.render_detail_item('5', {'text':'Add Change', 'action':''})}
                </div>
                </div>
            )
        }
        else if(ui == 'tag'){
            return(
                <div>
                    {this.load_tags_ui()}
                    <div style={{height:20}}/>
                    <div style={{'padding': '5px'}} onClick={()=>this.add_reconfiguration_item()}>
                    {this.render_detail_item('5', {'text':'Add Change', 'action':''})}
                </div>
                </div>
            )
        }
        else if(ui == 'id'){
            return(
                <div>
                    <TextInput height={30} placeholder={'Target ID...'} when_text_input_field_changed={this.when_reconfig_target_id_text_input_field_changed.bind(this)} text={this.state.reconfig_target_id} theme={this.props.theme}/>

                    {this.load_account_suggestions('reconfig_target_id')}

                    <div style={{height:20}}/>
                    <div style={{'padding': '5px'}} onClick={()=>this.add_reconfiguration_item()}>
                    {this.render_detail_item('5', {'text':'Add Change', 'action':''})}
                </div>
                </div>
            )
        }
    }

    when_amount_changed(number){
        this.setState({reconfig_number: number})
    }

    when_proportion_changed(number){
        this.setState({reconfig_proportion: number})
    }

    when_time_changed(number){
        this.setState({reconfig_duration: number})
    }

    when_reconfig_target_id_text_input_field_changed(text){
        this.setState({reconfig_target_id: text})
    }

    get_target_configuration(property){
        var obj = {
            'Vote Bounty Split Proportion':{'position':[1,1], 'picker':'proportion', 'powerlimit':9},
            'Maximum Extend Enter Contract Limit':{'position':[1,2], 'picker':'time', 'powerlimit':63}, 
            'Minimum End Bounty Amount':{'position':[1,4], 'picker':'number', 'powerlimit':63}, 
            'Proposal Expiry Duration Limit':{'position':[1,5], 'picker':'time', 'powerlimit':63}, 
            'Maximum Enter Contract Duration':{'position':[1,6], 'picker':'time', 'powerlimit':63}, 
            'Auto Wait':{'position':[1,8], 'picker':'tag', 'powerlimit':63}, 
            'Proposal Modify Expiry Duration Limit':{'position':[1,27], 'picker':'time', 'powerlimit':63},
            'Moderator Modify Privelage':{'position':[1,28], 'picker':'tag', 'powerlimit':9}, 
            'Unlimited Extend Contract Time':{'position':[1,29], 'picker':'tag', 'powerlimit':9}, 
            'Maximum Proposal Expiry Submit Expiry time difference':{'position':[1,36], 'picker':'time', 'powerlimit':63}, 
            'Bounty Limit Type':{'position':[1,37], 'picker':'tag', 'powerlimit':9}, 
            'Force Exit Enabled':{'position':[1,38], 'picker':'tag', 'powerlimit':9}, 
            'Minimum Spend Bounty Amount':{'position':[1,10], 'picker':'number', 'powerlimit':63},


            'Target Authority':{'position':[1,0], 'picker':'id', 'powerlimit':63},
            'Target Beneficiary':{'position':[1,6], 'picker':'id', 'powerlimit':63},
            'Minimum Buy Amount':{'position':[1,1], 'picker':'number', 'powerlimit':63},
            'Maximum Buy Amount':{'position':[1,3], 'picker':'number', 'powerlimit':63}, 
            'Minimum Cancellable Balance Amount':{'position':[1,4], 'picker':'number', 'powerlimit':63},


            'Buy Limit':{'position':[1,0], 'picker':'number', 'powerlimit':63},
            'Trust Fee':{'position':[1,7], 'picker':'proportion', 'powerlimit':9}, 
            'Sell Limit':{'position':[1,11], 'picker':'number', 'powerlimit':63}, 
            'Minimum Time Between Swap':{'position':[1,4], 'picker':'time', 'powerlimit':63}, 
            'Minimum Transactions Between Swap':{'position':[1,2], 'picker':'number', 'powerlimit':63}, 
            'Minimum Blocks Between Swap':{'position':[1,3], 'picker':'number', 'powerlimit':63}, 
            'Minimum Entered Contracts Between Swap':{'position':[1,13], 'picker':'number', 'powerlimit':63}, 
            'Minimum Transactions For First Buy':{'position':[1,17], 'picker':'number', 'powerlimit':63}, 
            'Minimum Entered Contracts For First Buy':{'position':[1,18], 'picker':'number', 'powerlimit':63}, 
            'Block Limit':{'position':[1,1], 'picker':'number', 'powerlimit':63}, 
            'Halving type':{'position':[1,15], 'picker':'tag', 'powerlimit':63}, 
            'Maturity Limit':{'position':[1,16], 'picker':'number', 'powerlimit':63}, 
            'Internal Block Halving Proportion':{'position':[1,5], 'picker':'proportion', 'powerlimit':9}, 
            'Block Limit Reduction Proportion':{'position':[1,6], 'picker':'proportion', 'powerlimit':9}, 
            'Block Reset Limit':{'position':[1,8], 'picker':'number', 'powerlimit':63}, 
            'Block Limit Sensitivity':{'position':[1,12], 'picker':'tag', 'powerlimit':63}, 
            'Exchange Ratio X':{'position':[2,0], 'picker':'number', 'powerlimit':63}, 
            'Exchange Ratio Y':{'position':[2,1], 'picker':'number', 'powerlimit':63},
        }

        return obj[property]
    }


    load_tags_ui(){
        var selected_item = this.get_selected_item(this.state.reconfig_items_tags_object, this.state.reconfig_items_tags_object['i'].active)

        if(selected_item == 'Auto Wait'){
            return(
                <div>
                    {this.render_detail_item('4', {'text':selected_item, 'textsize':'15px', 'font':'Sans-serif'})}

                    <div style={{height:20}}/>
                    <Tags page_tags_object={this.state.auto_wait_tags_object} tag_size={'l'} when_tags_updated={this.when_auto_wait_tags_object.bind(this)} theme={this.props.theme}/>
                </div>
            )
        }
        else if(selected_item == 'Moderator Modify Privelage'){
            return(
                <div>
                    {this.render_detail_item('4', {'text':selected_item, 'textsize':'15px', 'font':'Sans-serif'})}

                    <div style={{height:20}}/>
                    <Tags page_tags_object={this.state.can_modify_contract_as_moderator} tag_size={'l'} when_tags_updated={this.when_can_modify_contract_as_moderator.bind(this)} theme={this.props.theme}/>
                </div>
            )
        }
        else if(selected_item == 'Unlimited Extend Contract Time'){
            return(
                <div>
                    {this.render_detail_item('4', {'text':selected_item, 'textsize':'15px', 'font':'Sans-serif'})}

                    <div style={{height:20}}/>
                    <Tags page_tags_object={this.state.can_extend_enter_contract_at_any_time} tag_size={'l'} when_tags_updated={this.when_can_extend_enter_contract_at_any_time.bind(this)} theme={this.props.theme}/>
                </div>
            )
        }
        else if(selected_item == 'Bounty Limit Type'){
            return(
                <div>
                    {this.render_detail_item('4', {'text':selected_item, 'textsize':'15px', 'font':'Sans-serif'})}

                    <div style={{height:20}}/>
                    <Tags page_tags_object={this.state.bounty_limit_type} tag_size={'l'} when_tags_updated={this.when_bounty_limit_type.bind(this)} theme={this.props.theme}/>
                </div>
            )
        }
        else if(selected_item == 'Force Exit Enabled'){
            return(
                <div>
                    {this.render_detail_item('4', {'text':selected_item, 'textsize':'15px', 'font':'Sans-serif'})}

                    <div style={{height:20}}/>
                    <Tags page_tags_object={this.state.contract_force_exit_enabled} tag_size={'l'} when_tags_updated={this.when_contract_force_exit_enabled.bind(this)} theme={this.props.theme}/>
                </div>
            )
        }
        else if(selected_item == 'Halving type'){
            return(
                <div>
                    {this.render_detail_item('4', {'text':selected_item, 'textsize':'15px', 'font':'Sans-serif'})}
                    
                    <div style={{height:20}}/>
                    <Tags page_tags_object={this.state.new_token_halving_type_tags_object} tag_size={'l'} when_tags_updated={this.when_new_token_halving_type_tags_object.bind(this)} theme={this.props.theme}/>
                </div>
            )
        }
        else if(selected_item == 'Block Limit Sensitivity'){
            return(
                <div>
                    {this.render_detail_item('4', {'text':selected_item, 'textsize':'15px', 'font':'Sans-serif'})}
                    
                    <div style={{height:20}}/>
                    <Tags page_tags_object={this.state.new_token_block_limit_sensitivity_tags_object} tag_size={'l'} when_tags_updated={this.when_new_token_block_limit_sensitivity_tags_object.bind(this)} theme={this.props.theme}/>
                </div>
            )
        }
    }

    when_auto_wait_tags_object(tag_obj){
        this.setState({auto_wait_tags_object: tag_obj})
    }

    when_can_modify_contract_as_moderator(tag_obj){
        this.setState({can_modify_contract_as_moderator: tag_obj})
    }

    when_can_extend_enter_contract_at_any_time(tag_obj){
        this.setState({can_extend_enter_contract_at_any_time: tag_obj})
    }

    when_bounty_limit_type(tag_obj){
        this.setState({bounty_limit_type: tag_obj})
    }

    when_contract_force_exit_enabled(tag_obj){
        this.setState({contract_force_exit_enabled: tag_obj})
    }

    when_new_token_halving_type_tags_object(tag_obj){
        this.setState({new_token_halving_type_tags_object: tag_obj})
    }

    when_new_token_block_limit_sensitivity_tags_object(tag_obj){
        this.setState({new_token_block_limit_sensitivity_tags_object: tag_obj})
    }


    add_reconfiguration_item(){
        var selected_item = this.get_selected_item(this.state.reconfig_items_tags_object, this.state.reconfig_items_tags_object['i'].active)

        var properties = this.get_target_configuration(selected_item)
        var ui = properties['picker']
        var position = properties['position']
        var reconfig_vaules_clone = this.state.reconfig_values.slice()

        if(ui == 'number'){
            var number = this.state.reconfig_number;
            reconfig_vaules_clone.push({'value':number, 'pos':position, 'title': selected_item, 'type':ui})
            this.setState({reconfig_values: reconfig_vaules_clone, reconfig_number:0})
            this.props.notify('reconfig action added!', 600)
        }
        else if(ui == 'proportion'){
            var number = this.state.reconfig_proportion;
            reconfig_vaules_clone.push({'value':number, 'pos':position, 'title': selected_item, 'type':ui})
            this.setState({reconfig_values: reconfig_vaules_clone, reconfig_proportion: 0})
            this.props.notify('reconfig action added!', 600)
        }
        else if(ui == 'time'){
            var number = this.state.reconfig_duration;
            reconfig_vaules_clone.push({'value':number, 'pos':position, 'title': selected_item, 'type':ui})
            this.setState({reconfig_values: reconfig_vaules_clone, reconfig_duration:0})
            this.props.notify('reconfig action added!', 600)
        }
        else if(ui == 'tag'){
            var number = this.get_tag_value()
            reconfig_vaules_clone.push({'value':number, 'pos':position, 'title': selected_item, 'type':ui})
            this.setState({reconfig_values: reconfig_vaules_clone})
            this.props.notify('reconfig action added!', 600)
        }
        else if(ui == 'id'){
            var number = this.state.reconfig_target_id.trim()
            if(isNaN(number)){
                this.props.notify('please put a valid account id', 600)
            }
            else{
                reconfig_vaules_clone.push({'value':number, 'pos':position, 'title': selected_item, 'type':ui})
                this.setState({reconfig_values: reconfig_vaules_clone, reconfig_duration:0})
                this.props.notify('reconfig action added!', 600)
            }
        }
    }


    get_tag_value(){
        var selected_item = this.get_selected_item(this.state.reconfig_items_tags_object, this.state.reconfig_items_tags_object['i'].active)

        if(selected_item == 'Auto Wait'){
            var item = this.get_selected_item(this.state.auto_wait_tags_object, this.state.auto_wait_tags_object['i'].active)
            var value = item == 'no' ? 0 : 1
            return value;
        }
        else if(selected_item == 'Moderator Modify Privelage'){
            var item = this.get_selected_item(this.state.can_modify_contract_as_moderator, this.state.can_modify_contract_as_moderator['i'].active)
            var value = item == 'non-modifiable' ? 0 : 1
            return value;
        }
        else if(selected_item == 'Unlimited Extend Contract Time'){
            var item = this.get_selected_item(this.state.can_extend_enter_contract_at_any_time, this.state.can_extend_enter_contract_at_any_time['i'].active)
            var value = item == 'disabled' ? 0 : 1
            return value;
        }
        else if(selected_item == 'Bounty Limit Type'){
            var item = this.get_selected_item(this.state.bounty_limit_type, this.state.bounty_limit_type['i'].active)
            var value = item == 'relative' ? 0 : 1
            return value;
        }
        else if(selected_item == 'Force Exit Enabled'){
            var item = this.get_selected_item(this.state.contract_force_exit_enabled, this.state.contract_force_exit_enabled['i'].active)
            var value = item == 'disabled' ? 0 : 1
            return value;
        }
        else if(selected_item == 'Halving type'){
            var item = this.get_selected_item(this.state.new_token_halving_type_tags_object, this.state.new_token_halving_type_tags_object['i'].active)
            var value = item == 'fixed' ? 0 : 1
            return value;
        }
        else if(selected_item == 'Block Limit Sensitivity'){
            var item = this.get_selected_item(this.state.new_token_block_limit_sensitivity_tags_object, this.state.new_token_block_limit_sensitivity_tags_object['i'].active)
            var value = parseInt(item)
            return value;
        }
    }


    load_reconfig_items(){
        var middle = this.props.height-100;
        var size = this.props.size;
        if(size == 'm'){
            middle = this.props.height-100;
        }
        var items = this.state.reconfig_values

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
                        {items.map((item, index) => (
                            <li style={{'padding': '5px'}} onClick={()=>this.when_added_modify_item_clicked(item)}>
                                {this.render_detail_item('3', {'title':''+item['title'], 'details':'Modify Target', 'size':'l'})}
                                <div style={{height:5}}/>
                                {this.render_detail_item('3', {'title':''+item['pos'], 'details':'position', 'size':'l'})}
                                <div style={{height:5}}/>
                                {this.render_reconfig_value(item)}
                                <div style={{height:'1px', 'background-color':'#C1C1C1', 'margin': '5px 20px 5px 20px'}}/>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
    }


    render_reconfig_value(item){
        var title = item['title'];
        var ui = item['type']
        var number = item['value']
        if(ui == 'number'){
            return(
                <div>
                    <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                        {this.render_detail_item('2', { 'style':'l', 'title':title, 'subtitle':this.format_power_figure(number), 'barwidth':this.calculate_bar_width(number), 'number':this.format_account_balance_figure(number), 'barcolor':'', 'relativepower':'units', })}
                    </div>
                </div>
            )
        }
        else if(ui == 'proportion'){
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.format_proportion(number), 'details':'proportion', 'size':'l'})}
                </div>
            )
        }
        else if(ui == 'time'){
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.get_time_diff(number), 'details':'duration', 'size':'l'})}

                </div>
            )
        }
        else if(ui == 'tag'){
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.get_tag_selected_item(title, number), 'details':'value: '+number, 'size':'l'})}
                </div>
            )
        }
        else if(ui == 'id'){
            return(
                <div>
                    {this.render_detail_item('3', {'title':number, 'details':'target ID', 'size':'l'})}
                </div>
            )
        }
    }

    get_tag_selected_item(title, number){
        var obj = {'Auto Wait':{0:'no', 1:'yes'}, 'Moderator Modify Privelage':{1:'modifiable', 0:'non-modifiable'}, 'Unlimited Extend Contract Time':{1:'enabled', 0:'disabled'}, 'Bounty Limit Type':{0:'relative', 1:'absolute'}, 'Force Exit Enabled':{1:'enabled', 0:'disabled'}, 'Halving type':{0:'fixed', 1:'spread'}, 'Block Limit Sensitivity':{1:'1', 2:'2', 3:'3', 4:'4', 5:'5'}}

        return obj[title][number]
    }


    when_added_modify_item_clicked(item){
        var cloned_array = this.state.reconfig_values.slice()
        const index = cloned_array.indexOf(item);
        if (index > -1) { // only splice array when item is found
            cloned_array.splice(index, 1); // 2nd parameter means remove one item only
        }
        this.setState({reconfig_values: cloned_array})
        this.props.notify('reconfig action removed!', 600)
    }









    render_exchange_transfer_ui(){
        return(
            <div>
                {this.render_detail_item('3', {'title':'Target Exchange', 'details':'Set the exchange id you wish to run the exchange transfer from', 'size':'l'})}
                <div style={{height:20}}/>
                <TextInput height={30} placeholder={'Target ID...'} when_text_input_field_changed={this.when_exchange_transfer_target_text_input_field_changed.bind(this)} text={this.state.exchange_transfer_target} theme={this.props.theme}/>

                {this.load_account_suggestions('exchange_transfer_target')}
                {this.render_detail_item('0')}


                {this.render_detail_item('3', {'title':'Target Receiver', 'details':'Set the account set to receive the token amounts', 'size':'l'})}
                <div style={{height:20}}/>
                <TextInput height={30} placeholder={'Target Receiver...'} when_text_input_field_changed={this.when_exchange_transfer_receiver_text_input_field_changed.bind(this)} text={this.state.exchange_transfer_receiver} theme={this.props.theme}/>

                {this.load_account_suggestions('exchange_transfer_receiver')}
                {this.render_detail_item('0')}


                {this.render_detail_item('3', {'title':'Token Targets', 'details':'Set the targeted token ID your transfering from the exchange', 'size':'l'})}
                <div style={{height:20}}/>
                <TextInput height={30} placeholder={'Token Target ID...'} when_text_input_field_changed={this.when_token_target_text_input_field_changed.bind(this)} text={this.state.token_target} theme={this.props.theme}/>

                {this.load_account_suggestions('token_target')}
                {this.render_detail_item('0')}


                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                    {this.render_detail_item('2', { 'style':'l', 'title':'Targeted Amount', 'subtitle':this.format_power_figure(this.state.exchange_transfer_amount), 'barwidth':this.calculate_bar_width(this.state.exchange_transfer_amount), 'number':this.format_account_balance_figure(this.state.exchange_transfer_amount), 'barcolor':'', 'relativepower':'units', })}
                </div>

                <NumberPicker number_limit={bigInt('1e72')} when_number_picker_value_changed={this.when_exchange_transfer_amount_changed.bind(this)} theme={this.props.theme} power_limit={63}/>

                <div style={{height:20}}/>
                <div style={{'padding': '5px'}} onClick={()=>this.add_exchange_transfer_item()}>
                    {this.render_detail_item('5', {'text':'Add Transfer Action', 'action':''})}
                </div>

                {this.load_transfer_actions()}

            </div>
        )
    }

    when_exchange_transfer_target_text_input_field_changed(text){
        this.setState({exchange_transfer_target: text})
    }

    when_exchange_transfer_amount_changed(amount){
        this.setState({exchange_transfer_amount:amount})
    }

    when_exchange_transfer_receiver_text_input_field_changed(text){
        this.setState({exchange_transfer_receiver: text})
    }

    when_token_target_text_input_field_changed(text){
        this.setState({token_target: text})
    }


    add_exchange_transfer_item(){
        var target_exchange = this.state.exchange_transfer_target.trim()
        var target_amount = this.state.exchange_transfer_amount
        var target_receiver = this.state.exchange_transfer_receiver.trim()
        var targeted_token = this.state.token_target.trim()

        if(isNaN(target_exchange) || target_exchange == ''){
            this.props.notify('please put a valid exchange id', 600)
        }
        else if(isNaN(target_receiver) || target_receiver == ''){
            this.props.notify('please put a valid receiver id', 600)
        }
        else if(isNaN(targeted_token) || targeted_token == ''){
            this.props.notify('please put a valid token id', 600)
        }
        else if(target_amount == 0){
            this.props.notify('please put a valid amount', 600)
        }
        else{
            var exchange_transfer_values_clone = this.state.exchange_transfer_values.slice()
            var tx = {'exchange':target_exchange, 'amount':target_amount, 'receiver':target_receiver, 'token':targeted_token}
            exchange_transfer_values_clone.push(tx)
            this.setState({exchange_transfer_values: exchange_transfer_values_clone, exchange_transfer_target:'', exchange_transfer_amount:0, exchange_transfer_receiver:'', token_target:''})

            this.props.notify('transfer action added', 600)
        }
    }

    load_transfer_actions(){
        var middle = this.props.height-100;
        var size = this.props.size;
        if(size == 'm'){
            middle = this.props.height-100;
        }
        var items = this.state.exchange_transfer_values

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
                            <li style={{'padding': '5px'}} onClick={()=>this.when_transfer_action_value_clicked(item)}>
                                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                                    {this.render_detail_item('2', { 'style':'l', 'title':'Token: '+item['token'], 'subtitle':this.format_power_figure(item['amount']), 'barwidth':this.calculate_bar_width(item['amount']), 'number':this.format_account_balance_figure(item['amount']), 'barcolor':'', 'relativepower':'tokens', })}
                                </div>
                                <div style={{height:5}}/>
                                {this.render_detail_item('3', {'title':'Receiver ID: '+item['receiver'], 'details':'Exchange ID:'+item['exchange'], 'size':'s'})}
                                <div style={{height:'1px', 'background-color':'#C1C1C1', 'margin': '5px 20px 5px 20px'}}/>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
    }

    when_transfer_action_value_clicked(item){
        var cloned_array = this.state.exchange_transfer_values.slice()
        const index = cloned_array.indexOf(item);
        if (index > -1) { // only splice array when item is found
            cloned_array.splice(index, 1); // 2nd parameter means remove one item only
        }
        this.setState({exchange_transfer_values: cloned_array})
        this.props.notify('transfer action removed!', 600)
    }








    render_bounty_data_ui(){
        return(
            <div>
                {this.render_detail_item('4', {'font':'Sans-serif', 'textsize':'13px', 'text':'The first bounty exchange should be the End or Spend Exchange'})}
                {this.render_detail_item('0')}

                <TextInput height={30} placeholder={'Target ID...'} when_text_input_field_changed={this.when_bounty_exchange_target_text_input_field_changed.bind(this)} text={this.state.bounty_exchange_target} theme={this.props.theme}/>

                {this.load_account_suggestions('bounty_exchange_target')}
                {this.render_detail_item('0')}

                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                    {this.render_detail_item('2', { 'style':'l', 'title':'Targeted Amount', 'subtitle':this.format_power_figure(this.state.bounty_amount), 'barwidth':this.calculate_bar_width(this.state.bounty_amount), 'number':this.format_account_balance_figure(this.state.bounty_amount), 'barcolor':'', 'relativepower':'units', })}
                </div>

                <NumberPicker number_limit={bigInt('1e72')} when_number_picker_value_changed={this.when_bounty_amount_changed.bind(this)} theme={this.props.theme} power_limit={63}/>

                <div style={{height:20}}/>
                <div style={{'padding': '5px'}} onClick={()=>this.add_bounty_item()}>
                    {this.render_detail_item('5', {'text':'Add Bounty', 'action':''})}
                </div>

                {this.render_bounty_amounts()}
            </div>
        )
    }

    when_bounty_exchange_target_text_input_field_changed(text){
        this.setState({bounty_exchange_target: text})
    }

    when_bounty_amount_changed(amount){
        this.setState({bounty_amount: amount})
    }

    add_bounty_item(){
        var target_exchange = this.state.bounty_exchange_target.trim()
        var target_amount = this.state.bounty_amount

        if(isNaN(target_exchange) || target_exchange == ''){
            this.props.notify('please put a valid exchange id', 600)
        }
        else if(target_amount == 0){
            this.props.notify('please put a valid amount', 600)
        }
        else{
            var bounty_values_clone = this.state.bounty_values.slice()
            var tx = {'exchange':target_exchange, 'amount':target_amount}
            bounty_values_clone.push(tx)

            this.setState({bounty_values: bounty_values_clone, bounty_exchange_target:'', bounty_amount:0})

            this.props.notify('bounty value added', 600)
        }
    }


    render_bounty_amounts(){
        var middle = this.props.height-100;
        var size = this.props.size;
        if(size == 'm'){
            middle = this.props.height-100;
        }
        var items = this.state.bounty_values

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
                            <li style={{'padding': '5px'}} onClick={()=>this.when_bounty_value_clicked(item)}>
                                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                                    {this.render_detail_item('2', { 'style':'l', 'title':'Token ID: '+item['exchange'], 'subtitle':this.format_power_figure(item['amount']), 'barwidth':this.calculate_bar_width(item['amount']), 'number':this.format_account_balance_figure(item['amount']), 'barcolor':'', 'relativepower':'tokens', })}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
    }

    when_bounty_value_clicked(item){
        var cloned_array = this.state.bounty_values.slice()
        const index = cloned_array.indexOf(item);
        if (index > -1) { // only splice array when item is found
            cloned_array.splice(index, 1); // 2nd parameter means remove one item only
        }
        this.setState({bounty_values: cloned_array})
        this.props.notify('bounty action removed!', 600)
    }











    /* renders the specific element in the post or detail object */
    render_detail_item(item_id, object_data){
        return(
            <div>
                <ViewGroups item_id={item_id} object_data={object_data} theme={this.props.theme} width={this.props.app_state.width} />
            </div>
        )

    }


    set_contract(contract){
        this.setState({contract_item: contract})
    }

    finish_creating_object(){
        var index_tags = this.state.entered_indexing_tags
        var title = this.state.entered_title_text

        if(index_tags.length == 0){
            this.props.notify('add some tags first!', 700)
        }
        else if(title == ''){
            this.props.notify('add a title first!', 700)
        }else{
            this.props.when_add_new_proposal_to_stack(this.state)

            this.setState({selected: 0, id: makeid(32), type:'proposal', entered_indexing_tags:['new', 'proposal'],
            contract_item: {'data':[[],[0,0,0,0,0,0,0,0,0,0]]},
            entered_tag_text: '',entered_indexing_tags:[],entered_title_text:'',

            new_proposal_title_tags_object:this.get_new_proposal_title_tags_object(), new_proposal_type_tags_object:this.get_new_proposal_type_tags_object(),
            reconfig_items_tags_object:this.get_reconfig_items_tags_object(),

            auto_wait_tags_object:this.get_auto_wait_tags_object(),
            can_modify_contract_as_moderator: this.get_can_modify_contract_as_moderator(),
            can_extend_enter_contract_at_any_time: this.get_can_extend_enter_contract_at_any_time(),
            bounty_limit_type: this.get_bounty_limit_type(),
            contract_force_exit_enabled: this.get_contract_force_exit_enabled(),
            new_token_halving_type_tags_object: this.get_new_token_halving_type_tags_object(),
            new_token_block_limit_sensitivity_tags_object: this.get_new_token_block_limit_sensitivity_tags_object(),

            page:0, proposal_expiry_time:Math.round(new Date().getTime()/1000), 
            proposal_submit_expiry_time:Math.round(new Date().getTime()/1000), 
            modify_target_id:'', spend_target_input_text:'', spend_token_input_text:'', 
            spend_amount:0, spend_actions:[], 
            
            reconfig_number:0, reconfig_proportion:0, reconfig_duration:0, reconfig_target_id:'',
            reconfig_values:[],

            exchange_transfer_target:'', exchange_transfer_amount:0, exchange_transfer_values:[], exchange_transfer_receiver:'', token_target:'',

            bounty_exchange_target:'', bounty_amount:0, bounty_values:[]})

            this.props.notify('transaction added to stack', 700);
        }
    }







    format_proportion(proportion){
        return ((proportion/10**18) * 100)+'%';
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




}




export default NewProposalPage;