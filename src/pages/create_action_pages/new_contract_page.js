import React, { Component } from 'react';
import ViewGroups from '../../components/view_groups';
import Tags from '../../components/tags';
import NumberPicker from '../../components/number_picker';
import TextInput from '../../components/text_input';

import Letter from '../../assets/letter.png';

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDateTimePicker } from "@mui/x-date-pickers/StaticDateTimePicker";

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Draggable } from "react-drag-reorder";

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

class NewContractPage extends Component {
    
    state = {
        id: makeid(8), type:'contract', e5:this.props.app_state.selected_e5,
        entered_tag_text: '',entered_indexing_tags:[],entered_title_text:'',
        new_contract_tags_object: this.get_new_contract_tags_object(), new_contract_type_tags_object:this.get_new_contract_type_tags_object(),
        default_vote_bounty_split_proportion:0, max_extend_enter_contract_limit:0, default_minimum_end_vote_bounty_amount:0, default_proposal_expiry_duration_limit:0, max_enter_contract_duration:0, auto_wait_tags_object:this.get_auto_wait_tags_object(), default_minimum_spend_vote_bounty_amount:0, proposal_modify_expiry_duration_limit:0, can_modify_contract_as_moderator: this.get_can_modify_contract_as_moderator(), can_extend_enter_contract_at_any_time: this.get_can_extend_enter_contract_at_any_time(),maximum_proposal_expiry_submit_expiry_time_difference:0, bounty_limit_type: this.get_bounty_limit_type(), contract_force_exit_enabled: this.get_contract_force_exit_enabled(),

        new_token_interactible_moderator_tags_object: this.get_new_token_interactible_moderator_tags_object(),
        moderator_id:'', moderators:[], interactible_id:'', interactible_timestamp:0, interactibles:[],
        exchange_id:'', price_amount:0, price_data:[], 

        page:0, 
    };

    constructor(props) {
        super(props);
        this.number_picker_ref = React.createRef();
    }

    get_new_contract_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['or','',0], ['e','configuration', 'e.authorities', 'entry-fees'], [0]
            ],
            'authorities':[
              ['xor','e',1], ['authorities','moderators', 'interactible'], [1],[1]
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


    get_new_contract_type_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e','private', 'public'], [2]
            ],
        };
    }





    render(){
        return(
            <div>
                <div style={{'padding':'10px 10px 0px 10px'}}>
                    <div className="row">
                        <div className="col-9" style={{'padding': '5px 0px 0px 10px'}}>
                            <Tags page_tags_object={this.state.new_contract_tags_object} tag_size={'l'} when_tags_updated={this.when_new_contract_tags_object.bind(this)} theme={this.props.theme}/>
                        </div>
                        <div className="col-3" style={{'padding': '0px 0px 0px 0px'}}>
                            <div style={{'padding': '5px'}} onClick={()=>this.finish_creating_object()}>
                                {this.render_detail_item('5', {'text':'Finish', 'action':''})}
                            </div>
                            
                        </div>
                    </div>
                    
                    
                    <div style={{'margin':'5px 0px 0px 0px'}}>
                        {this.render_everything()}   
                    </div>
                    
                </div>
            </div>
        )
    }

    set_state(state){
        this.setState(state)
    }

    when_new_contract_tags_object(tag_obj){
        this.setState({new_contract_tags_object: tag_obj, page:0})
    }


    render_everything(){
        var selected_item = this.get_selected_item(this.state.new_contract_tags_object, this.state.new_contract_tags_object['i'].active)

        if(selected_item == 'e'){
            return(
                <div>
                    {this.render_enter_tags_part()}
                </div>
            )    
        }else
        if(selected_item == 'configuration'){
            return(
                <div>
                    {this.render_contract_list()}
                </div>
            ) 
        }
        else if(selected_item == 'moderators' || selected_item == 'interactible'){
            return(
                <div>
                    {this.render_authorities_part()}
                </div>
            ) 
        }
        else if(selected_item == 'entry-fees'){
            return(
                <div>
                    {this.render_prices_part()}
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
                {this.render_detail_item('4',{'font':'Sans-serif', 'textsize':'15px','text':'Set a name for your new Contract'})}
                <div style={{height:10}}/>
                <TextInput height={30} placeholder={'Enter Title...'} when_text_input_field_changed={this.when_title_text_input_field_changed.bind(this)} text={this.state.entered_title_text} theme={this.props.theme}/>
                <div style={{height:10}}/>
                {this.render_detail_item('4',{'font':'Sans-serif', 'textsize':'15px','text':this.state.entered_title_text})}
                {this.render_detail_item('10',{'font':'Sans-serif', 'textsize':'10px','text':'remaining character count: '+(this.props.app_state.title_size - this.state.entered_title_text.length)})}

                {this.render_detail_item('0')}
                {this.render_detail_item('4',{'font':'Sans-serif', 'textsize':'15px','text':'Set tags for indexing your new Contract'})}
                <div style={{height:10}}/>

                <div className="row">
                    <div className="col-9" style={{'margin': '0px 0px 0px 0px'}}>
                        <TextInput height={30} placeholder={'Enter Tag...'} when_text_input_field_changed={this.when_index_text_input_field_changed.bind(this)} text={this.state.entered_tag_text} theme={this.props.theme}/>
                    </div>
                    <div className="col-3" style={{'padding': '0px 5px 0px 0px'}}>
                        {this.render_detail_item('5', {'text':'Add', 'action':'add_indexing_tag'})}
                    </div>
                </div>
                {this.render_detail_item('10',{'font':'Sans-serif', 'textsize':'10px','text':'remaining character count: '+(this.props.app_state.tag_size - this.state.entered_tag_text.length)})}

                {this.render_detail_item('1',{'active_tags':this.state.entered_indexing_tags, 'indexed_option':'indexed', 'when_tapped':'delete_entered_tag_word'})}
                
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
        else if(typed_word.length > this.props.app_state.tag_size){
            this.props.notify('That tag is too long', 400)
        }
        else if(typed_word.length < 3){
            this.props.notify('That tag is too short', 400)
        }
        else if(this.state.entered_indexing_tags.includes(typed_word)){
            this.props.notify('you cant enter the same word twice', 400)
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
                <div style={{'padding': '5px 0px 5px 0px'}}>
                    {this.render_detail_item('1',{'active_tags':this.state.entered_indexing_tags, 'indexed_option':'indexed', 'when_tapped':'delete_entered_tag_word'})}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('4',{'font':'Sans-serif', 'textsize':'15px','text':this.state.entered_title_text})}
                    {this.render_detail_item('0')}

                </div>         
            </div>
        );
    }






    when_new_contract_type_tags_object(tag_obj){
        this.setState({new_contract_type_tags_object: tag_obj})
    }

    when_default_vote_bounty_split_proportion(number){
        this.setState({default_vote_bounty_split_proportion: number})
    }

    when_max_extend_enter_contract_limit(number){
        this.setState({max_extend_enter_contract_limit: number})
    }

    when_default_minimum_end_vote_bounty_amount(number){
        this.setState({default_minimum_end_vote_bounty_amount: number})
    }

    when_default_proposal_expiry_duration_limit(number){
        this.setState({default_proposal_expiry_duration_limit: number})
    }

    when_max_enter_contract_duration(number){
        this.setState({max_enter_contract_duration: number})
    }

    when_auto_wait_tags_object(tag_obj){
        this.setState({auto_wait_tags_object: tag_obj})
    }

    when_default_minimum_spend_vote_bounty_amount(number){
        this.setState({default_minimum_spend_vote_bounty_amount: number})
    }


    when_proposal_modify_expiry_duration_limit(number){
        this.setState({proposal_modify_expiry_duration_limit: number})
    }

    when_can_modify_contract_as_moderator(tag_obj){
        this.setState({can_modify_contract_as_moderator: tag_obj})
    }

    when_can_extend_enter_contract_at_any_time(tag_obj){
        this.setState({can_extend_enter_contract_at_any_time: tag_obj})
    }

    when_maximum_proposal_expiry_submit_expiry_time_difference(number){
        this.setState({maximum_proposal_expiry_submit_expiry_time_difference: number})
    }

    when_bounty_limit_type(tag_obj){
        this.setState({bounty_limit_type: tag_obj})
    }

    when_contract_force_exit_enabled(tag_obj){
        this.setState({contract_force_exit_enabled: tag_obj})
    }




    render_contract_list(){
        return(
            <div>
                {this.render_detail_item('4', {'font':'Sans-serif', 'textsize':'15px','text':'Create a basic E5 contract'})}
                <div style={{height:20}}/>
                {this.render_contract_section_parts()}

                <div style={{height:20}}/>
                <div className="row">
                    <div className="col-6" style={{'padding': '0px 0px 0px 0px'}}>
                        {this.show_previous_button()}
                    </div>
                    <div className="col-6" style={{'padding': '0px 0px 0px 0px'}}>
                        {this.show_next_button()}
                    </div>
                </div>
                <div style={{height:20}}/>
            </div>
        )
    }

    show_next_button(){
        var page = this.state.page
        if(page < 13){
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



    render_contract_section_parts(){
        var page = this.state.page

        if(page == 0){
            return(
                <div>
                    {this.render_detail_item('3', {'title':'Contract Type', 'details':'Set the type of contract, either private or public', 'size':'l'})}
                    <div style={{height:20}}/>
                    <Tags page_tags_object={this.state.new_contract_type_tags_object} tag_size={'l'} when_tags_updated={this.when_new_contract_type_tags_object.bind(this)} theme={this.props.theme}/>

                    <div style={{height:2}}/>
                    {this.render_detail_item('10', {'text':'Note: if set to private, you will be giving new accounts access to the contract manually after its created', 'textsize':'10px', 'font':'Sans-serif'})}
                </div>
            )
        }
        else if(page == 1){
            return(
                <div>
                    {this.render_detail_item('3', {'title':'Vote Bounty Split Proportion(Optional)', 'details':'the mandatory percentage or proportion enforced on each new proposal targeting your new contract. Then the percentage is used to calculate what each voter is set to receive based on the existing proposals balance.', 'size':'l'})}
                    <div style={{height:20}}/>

                    {this.render_detail_item('3', {'title':this.format_proportion(this.state.default_vote_bounty_split_proportion), 'details':'Vote Bounty Split Proportion', 'size':'l'})}

                    <div style={{height:2}}/>
                    {this.render_detail_item('10', {'text':'Recommended: 3% - 5%', 'textsize':'10px', 'font':'Sans-serif'})}

                    <NumberPicker ref={this.number_picker_ref} number_limit={bigInt('1e72')} when_number_picker_value_changed={this.when_default_vote_bounty_split_proportion.bind(this)} power_limit={9} theme={this.props.theme} />
                </div>
            )
        }
        else if(page == 2){
            return(
                <div>
                    {this.render_detail_item('3', {'title':'Maximum Extend Enter Contract Limit', 'details':'the maximum amount of time a sender can extend their stay in your new contract.', 'size':'l'})}
                    <div style={{height:20}}/>

                    {this.render_detail_item('3', {'title':this.get_time_diff(this.state.max_extend_enter_contract_limit), 'details':'Maximum Extend Enter Contract Limit', 'size':'l'})}

                    <div style={{height:2}}/>
                    {this.render_detail_item('10', {'text':'Recommended: 5 hrs', 'textsize':'10px', 'font':'Sans-serif'})}

                    <NumberPicker ref={this.number_picker_ref} number_limit={bigInt('1e72')} when_number_picker_value_changed={this.when_max_extend_enter_contract_limit.bind(this)} theme={this.props.theme} power_limit={63}/>
                </div>
            )
        }
        else if(page == 3){
            return(
                <div>
                    {this.render_detail_item('3', {'title':'Minimum End Bounty Amount (Optional)', 'details':'The imimum amount of end that can be used as bounty for creating a proposal for your new contract.', 'size':'l'})}
                    <div style={{height:20}}/>

                    <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                        {this.render_detail_item('2', { 'style':'l', 'title':'Minimum End Bounty Amount', 'subtitle':this.format_power_figure(this.state.default_minimum_end_vote_bounty_amount), 'barwidth':this.calculate_bar_width(this.state.default_minimum_end_vote_bounty_amount), 'number':this.format_account_balance_figure(this.state.default_minimum_end_vote_bounty_amount), 'barcolor':'', 'relativepower':'units', })}
                    </div>

                    <div style={{height:2}}/>
                    {this.render_detail_item('10', {'text':'Recommended: 500 END', 'textsize':'10px', 'font':'Sans-serif'})}

                    <NumberPicker ref={this.number_picker_ref} number_limit={bigInt('1e72')} when_number_picker_value_changed={this.when_default_minimum_end_vote_bounty_amount.bind(this)} theme={this.props.theme} power_limit={63}/>
                </div>
            )
        }
        else if(page == 4){
            return(
                <div>
                    {this.render_detail_item('3', {'title':'Proposal Expiry Duration Limit', 'details':'the minimum amount of time difference that can be used while setting the expiry time for a new proposal sent to your new contract.', 'size':'l'})}
                    <div style={{height:20}}/>

                    {this.render_detail_item('3', {'title':this.get_time_diff(this.state.default_proposal_expiry_duration_limit), 'details':'Proposal Expiry Duration Limit', 'size':'l'})}

                    <div style={{height:2}}/>
                    {this.render_detail_item('10', {'text':'Recommended: 1hr - 3Hrs', 'textsize':'10px', 'font':'Sans-serif'})}

                    <NumberPicker ref={this.number_picker_ref} number_limit={bigInt('1e72')} when_number_picker_value_changed={this.when_default_proposal_expiry_duration_limit.bind(this)} theme={this.props.theme} power_limit={63}/>
                </div>
            )
        }
        else if(page == 5){
            return(
                <div>
                    {this.render_detail_item('3', {'title':'Maximum Enter Contract Duration', 'details':'maximum amount of time a sender can enter your new contract for.', 'size':'l'})}
                    <div style={{height:20}}/>
                    
                    {this.render_detail_item('3', {'title':this.get_time_diff(this.state.max_enter_contract_duration), 'details':'Maximum Enter Contract Duration', 'size':'l'})}

                    <div style={{height:2}}/>
                    {this.render_detail_item('10', {'text':'Recommended: 4wks', 'textsize':'10px', 'font':'Sans-serif'})}

                    <NumberPicker ref={this.number_picker_ref} number_limit={bigInt('1e72')} when_number_picker_value_changed={this.when_max_enter_contract_duration.bind(this)} theme={this.props.theme} power_limit={63}/>
                </div>
            )
        }
        else if(page == 6){
            return(
                <div>
                    {this.render_detail_item('3', {'title':'Auto Wait', 'details':'If set to yes, all new proposals sent to your new contract are automatically voted wait for each participant in the contract', 'size':'l'})}

                    <div style={{height:20}}/>
                    <Tags page_tags_object={this.state.auto_wait_tags_object} tag_size={'l'} when_tags_updated={this.when_auto_wait_tags_object.bind(this)} theme={this.props.theme}/>

                    <div style={{height:2}}/>
                    {this.render_detail_item('10', {'text':'Recommended: no', 'textsize':'10px', 'font':'Sans-serif'})}

                </div>
            )
        }
        else if(page == 7){
            return(
                <div>
                    {this.render_detail_item('3', {'title':'Proposal Modify Expiry Duration Limit', 'details':'The period of time before the expiry of a proposal, during which the proposal cannot be modified', 'size':'l'})}
                    <div style={{height:20}}/>
                    
                    {this.render_detail_item('3', {'title':this.get_time_diff(this.state.proposal_modify_expiry_duration_limit), 'details':'Proposal Modify Expiry Duration Limit', 'size':'l'})}

                    <div style={{height:2}}/>
                    {this.render_detail_item('10', {'text':'Recommended: 3 Hrs', 'textsize':'10px', 'font':'Sans-serif'})}

                    <NumberPicker ref={this.number_picker_ref} number_limit={bigInt('1e72')} when_number_picker_value_changed={this.when_proposal_modify_expiry_duration_limit.bind(this)} theme={this.props.theme} power_limit={63}/>
                </div>
            )
        }
        else if(page == 8){
            return(
                <div>
                    {this.render_detail_item('3', {'title':'Moderator Modify Privelage', 'details':'If set to modifiable, you as a moderator can directly modify your contracts configuration', 'size':'l'})}

                    <div style={{height:20}}/>
                    <Tags page_tags_object={this.state.can_modify_contract_as_moderator} tag_size={'l'} when_tags_updated={this.when_can_modify_contract_as_moderator.bind(this)} theme={this.props.theme}/>

                    <div style={{height:2}}/>
                    {this.render_detail_item('10', {'text':'Recommended: modifiable', 'textsize':'10px', 'font':'Sans-serif'})}

                </div>
            )
        }
        else if(page == 9){
            return(
                <div>
                    {this.render_detail_item('3', {'title':'Unlimited Extend Contract Time', 'details':'If set to enabled, you can extend your stay in this contract at any time after entry', 'size':'l'})}

                    <div style={{height:20}}/>
                    <Tags page_tags_object={this.state.can_extend_enter_contract_at_any_time} tag_size={'l'} when_tags_updated={this.when_can_extend_enter_contract_at_any_time.bind(this)} theme={this.props.theme}/>

                    <div style={{height:2}}/>
                    {this.render_detail_item('10', {'text':'Recommended: enabled', 'textsize':'10px', 'font':'Sans-serif'})}
                    
                </div>
            )
        }
        else if(page == 10){
            return(
                <div>
                    {this.render_detail_item('3', {'title':'Maximum Proposal Expiry Submit Expiry time difference', 'details':'the maximum difference in time between the proposal expiry and submit expiry time for all proposals set to your new contract.', 'size':'l'})}
                    <div style={{height:20}}/>
                    
                    {this.render_detail_item('3', {'title':this.get_time_diff(this.state.maximum_proposal_expiry_submit_expiry_time_difference), 'details':'Maximum Proposal Expiry Submit Expiry time difference', 'size':'l'})}

                    <div style={{height:2}}/>
                    {this.render_detail_item('10', {'text':'Recommended: at least 2wks', 'textsize':'10px', 'font':'Sans-serif'})}

                    <NumberPicker ref={this.number_picker_ref} number_limit={bigInt('1e72')} when_number_picker_value_changed={this.when_maximum_proposal_expiry_submit_expiry_time_difference.bind(this)} theme={this.props.theme} power_limit={63}/>
                </div>
            )
        }
        else if(page == 11){
            return(
                <div>
                    {this.render_detail_item('3', {'title':'Bounty Limit Type', 'details':'If set to absolute, the bounty limits set for end and spend will be used as is', 'size':'l'})}

                    <div style={{height:20}}/>
                    <Tags page_tags_object={this.state.bounty_limit_type} tag_size={'l'} when_tags_updated={this.when_bounty_limit_type.bind(this)} theme={this.props.theme}/>

                    <div style={{height:2}}/>
                    {this.render_detail_item('10', {'text':'Recommended: absolute', 'textsize':'10px', 'font':'Sans-serif'})}
                    
                </div>
            )
        }
        else if(page == 12){
            return(
                <div>
                    {this.render_detail_item('3', {'title':'Force Exit Enabled', 'details':'If set to enabled, you as a moderator can force other members of the contract to exit the contract', 'size':'l'})}

                    <div style={{height:20}}/>
                    <Tags page_tags_object={this.state.contract_force_exit_enabled} tag_size={'l'} when_tags_updated={this.when_contract_force_exit_enabled.bind(this)} theme={this.props.theme}/>

                    <div style={{height:2}}/>
                    {this.render_detail_item('10', {'text':'Recommended: enabled', 'textsize':'10px', 'font':'Sans-serif'})}
                    
                </div>
            )
        }
        else if(page == 13){
            return(
                <div>
                    {this.render_detail_item('3', {'title':'Minimum Spend Bounty Amount (Optional)', 'details':'the minimum amount of spend that can be used as bounty for new proposals targeting your new contract.', 'size':'l'})}
                    <div style={{height:20}}/>
                    
                    <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                        {this.render_detail_item('2', { 'style':'l', 'title':'Minimum Spend Bounty Amount', 'subtitle':this.format_power_figure(this.state.default_minimum_spend_vote_bounty_amount), 'barwidth':this.calculate_bar_width(this.state.default_minimum_spend_vote_bounty_amount), 'number':this.format_account_balance_figure(this.state.default_minimum_spend_vote_bounty_amount), 'barcolor':'', 'relativepower':'units', })}
                    </div>

                    <div style={{height:2}}/>
                    {this.render_detail_item('10', {'text':'Recommended: 500 SPEND', 'textsize':'10px', 'font':'Sans-serif'})}

                    <NumberPicker ref={this.number_picker_ref} number_limit={bigInt('1e72')} when_number_picker_value_changed={this.when_default_minimum_spend_vote_bounty_amount.bind(this)} theme={this.props.theme} power_limit={63}/>
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

    reset_the_number_picker(){
        var me = this;
        setTimeout(function() {
            if(me.number_picker_ref.current != null){
                me.number_picker_ref.current.reset_number_picker()
            }
        }, (1 * 1000));  
    }




    render_authorities_part(){
        var size = this.props.size
        var height = this.props.height-120

        if(size == 's'){
            return(
                <div style={{overflow: 'auto', maxHeight: height}}>
                    {this.render_moderator_interactible_ui()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row" style={{'padding': '0px 0px 0px 20px', overflow: 'auto', maxHeight: height}}>
                    <div className="col-6" style={{'padding': '0px 0px 0px 0px'}}>
                        {this.render_moderator_interactible_ui()}
                    </div>
                    <div className="col-6">
                    </div>
                </div>
                
            )
        }
    }



    render_moderator_interactible_ui(){
        return(
            <div>
                {/* <Tags page_tags_object={this.state.new_token_interactible_moderator_tags_object} tag_size={'l'} when_tags_updated={this.when_new_token_interactible_moderator_tags_object.bind(this)} theme={this.props.theme}/> */}

                {this.render_moderator_or_interactible_setting()}
            </div>
        )
    }

    when_new_token_interactible_moderator_tags_object(tag_obj){
        this.setState({new_token_interactible_moderator_tags_object: tag_obj})
    }

    render_moderator_or_interactible_setting(){
        var selected_item = this.get_selected_item(this.state.new_contract_tags_object, 'authorities')

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
        var moderator_id = this.state.moderator_id.trim()
        if(isNaN(moderator_id) || parseInt(moderator_id) < 0){
            this.props.notify('please put a valid account id', 600)
        }
        else{
            var moderators_clone = this.state.moderators.slice()
            moderators_clone.push(parseInt(moderator_id))
            this.setState({moderators: moderators_clone, moderator_id:''});
            this.props.notify('added moderator!', 400)
        }
    }

    render_added_moderators(){
        var middle = this.props.height-100;
        var size = this.props.size;
        if(size == 'm'){
            middle = this.props.height-100;
        }
        var items = [].concat(this.state.moderators)

        if(items.length == 0){
            items = [0,3,0]
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
                {this.render_detail_item('3', {'title':'Interactible ID', 'details':'Set the account id for your targeted account, and expiry time for their interactibility', 'size':'l'})}

                <div style={{height:10}}/>
                <TextInput height={30} placeholder={'Interactible ID'} when_text_input_field_changed={this.when_interactible_id_input_field_changed.bind(this)} text={this.state.interactible_id} theme={this.props.theme}/>

                {this.load_account_suggestions('interactible_id')}

                <div style={{height:5}}/>

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
        var interactible_id = this.state.interactible_id.trim()
        if(isNaN(interactible_id)  || parseInt(interactible_id) < 0 || interactible_id == ''){
            this.props.notify('please put a valid account id', 600)
        }
        if(this.state.interactible_timestamp == 0){
            this.props.notify('please put a valid date and time', 600)
        }
        else{
            var interactibles_clone = this.state.interactibles.slice()
            interactibles_clone.push({'id': interactible_id, 'timestamp':this.state.interactible_timestamp})
            this.setState({interactibles: interactibles_clone, interactible_id: ''});
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




    render_prices_part(){
        var size = this.props.size
        var height = this.props.height-120

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

    calculate_minimum_end_amount(){
        var amount = 0
        if(this.props.app_state.created_contract_mapping[this.state.e5] != null){
            var main_contract_data = this.props.app_state.created_contract_mapping[this.state.e5][2]['data']
            var default_end_minimum_contract_amount = main_contract_data[1][3/* <3>default_end_minimum_contract_amount */]
            var gas_price = parseInt(this.props.app_state.gas_price[this.state.e5])
            if(gas_price == null){
                return default_end_minimum_contract_amount
            }
            var gas_anchor_price = parseInt(main_contract_data[1][23/* <23>gas_anchor_price */])
            var a = (gas_price * default_end_minimum_contract_amount)/gas_anchor_price
            if(a < 1) a = 1;
            amount = a
        }
        return parseInt(amount)
    }

    calculate_minimum_spend_amount(){
        var amount = 0
        if(this.props.app_state.created_contract_mapping[this.state.e5] != null){
            var main_contract_data = this.props.app_state.created_contract_mapping[this.state.e5][2]['data']
            var default_spend_minimum_contract_amount = main_contract_data[1][9/* <9>default_spend_minimum_contract_amount */]
            var rp = this.props.app_state.created_token_object_mapping[this.state.e5] == null ? bigInt('1e18') : bigInt(this.props.app_state.created_token_object_mapping[this.state.e5][5] == null ? bigInt('1e18') : this.props.app_state.created_token_object_mapping[this.state.e5][5]['data'][2][6])
            amount = bigInt(rp).multiply(bigInt(default_spend_minimum_contract_amount)).divide(bigInt('1e18'))
        }
        return amount
    }

    render_set_token_and_amount_part(){
        var minimum_end_amount = this.calculate_minimum_end_amount()
        var minimum_spend_amount = this.calculate_minimum_spend_amount()
        return(
            <div>
                {this.render_detail_item('3', {'title':'Exchange ID', 'details':'The an exchange by its id, then the desired amount. The first exchange must be the End or Spend exchange', 'size':'l'})}
                
                <div style={{height:10}}/>
                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                    {this.render_detail_item('2', { 'style':'l', 'title':'Default Minimum End Contract Amount', 'subtitle':this.format_power_figure(minimum_end_amount), 'barwidth':this.calculate_bar_width(minimum_end_amount), 'number':this.format_account_balance_figure(minimum_end_amount), 'barcolor':'', 'relativepower':'END', })}
                </div>
                <div style={{height:10}}/>

                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                    {this.render_detail_item('2', { 'style':'l', 'title':'Default Minimum Spend Contract Amount', 'subtitle':this.format_power_figure(minimum_spend_amount), 'barwidth':this.calculate_bar_width(minimum_spend_amount), 'number':this.format_account_balance_figure(minimum_spend_amount), 'barcolor':'', 'relativepower':'SPEND', })}
                </div>

                {this.render_detail_item('0')}

                <TextInput height={30} placeholder={'Exchange ID'} when_text_input_field_changed={this.when_exchange_id_input_field_changed.bind(this)} text={this.state.exchange_id} theme={this.props.theme}/>

                {this.load_token_suggestions('exchange_id')}
                <div style={{height: 20}}/>

                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                    {this.render_detail_item('2', { 'style':'l', 'title':'Price', 'subtitle':this.format_power_figure(this.state.price_amount), 'barwidth':this.calculate_bar_width(this.state.price_amount), 'number':this.format_account_balance_figure(this.state.price_amount), 'barcolor':'', 'relativepower':'tokens', })}
                </div>

                <NumberPicker number_limit={bigInt('1e72')} when_number_picker_value_changed={this.when_price_amount.bind(this)} theme={this.props.theme} power_limit={63}/>

                <div style={{'padding': '5px'}} onClick={() => this.when_add_price_set()}>
                    {this.render_detail_item('5', {'text':'Add Price', 'action':''})}
                </div>
            </div>
        )
    }

    when_exchange_id_input_field_changed(text){
        this.setState({exchange_id: text})
    }

    when_price_amount(amount){
        this.setState({price_amount: amount})
    }

    when_add_price_set(){
        var exchange_id = this.state.exchange_id.trim()
        var amount = this.state.price_amount
        if(isNaN(exchange_id) || parseInt(exchange_id) < 0 || exchange_id == ''){
            this.props.notify('please put a valid exchange id', 600)
        }
        else if(amount == 0){
            this.props.notify('please put a valid amount', 600)
        }
        else if(this.state.price_data.length == 0 && (exchange_id != '3' && exchange_id != '5')){
            this.props.notify('the first exchange must be the End or Spend exchange', 1100)
        }
        else if(!this.check_if_amount_exceeds_minimum(amount, exchange_id)){

        }
        else{
            var price_data_clone = this.state.price_data.slice()
            price_data_clone.push({'id':exchange_id, 'amount':amount})
            this.setState({price_data: price_data_clone});
            this.props.notify('added price!', 400)
        }
    }

    check_if_amount_exceeds_minimum(amount, exchange){
        var minimum_end_amount = this.calculate_minimum_end_amount()
        var minimum_spend_amount = this.calculate_minimum_spend_amount()

        if(exchange == '3'){
            if(amount < minimum_end_amount){
                this.props.notify('That End amount is less than the minimum required by the main contract', 3500)
                return false
            }
        }
        if(exchange == '5'){
            if(amount < minimum_spend_amount){
                this.props.notify('That Spend amount is less than the minimum required by the main contract', 3500)
                return false
            }
        }
        return true
    }

    render_set_prices_list_part(){
        var middle = this.props.height-100;
        var size = this.props.size;
        if(size == 'm'){
            middle = this.props.height-100;
        }
        var items = [].concat(this.state.price_data)

        if(items.length == 0){
            items = [0,3,0]
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
            return(
                <div style={{overflow: 'auto', maxHeight: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.reverse().map((item, index) => (
                            <li style={{'padding': '5px'}} onClick={()=>this.when_amount_clicked(item)}>
                                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                                    {this.render_detail_item('2', { 'style':'l', 'title':'Exchange ID: '+item['id'], 'subtitle':this.format_power_figure(item['amount']), 'barwidth':this.calculate_bar_width(item['amount']), 'number':this.format_account_balance_figure(item['amount']), 'barcolor':'', 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['id']], })}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
        
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

    when_amount_clicked(item){
        var cloned_array = this.state.price_data.slice()
        const index = cloned_array.indexOf(item);
        if (index > -1) { // only splice array when item is found
            cloned_array.splice(index, 1); // 2nd parameter means remove one item only
        }
        this.setState({price_data: cloned_array})
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
        if(exchanges_from_sync == null) exchanges_from_sync = [];
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

    when_price_suggestion_clicked(item, pos, target_type){
        this.setState({exchange_id: item['id']})
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
        var contacts = this.get_all_sorted_objects(this.props.app_state.contacts)
        var return_array = []

        if(target_type == 'moderator_id'){
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


    when_suggestion_clicked(item, pos, target_type){
        if(target_type == 'authority_id'){
            this.setState({authority_id: item['id']})
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
        var index_tags = this.state.entered_indexing_tags
        var title = this.state.entered_title_text

        if(index_tags.length == 0){
            this.props.notify('add some tags first!', 700)
        }
        else if(title == ''){
            this.props.notify('add a name first!', 700)
        }
        else if(title.length > this.props.app_state.title_size){
            this.props.notify('that name is too long', 700)
        }
        else{
            this.props.when_add_new_object_to_stack(this.state)
        
            this.setState({ id: makeid(32), type:'contract', entered_tag_text: '',entered_indexing_tags:[],entered_title_text:'', new_contract_tags_object: this.get_new_contract_tags_object(), default_vote_bounty_split_proportion:0, max_extend_enter_contract_limit:0, default_minimum_end_vote_bounty_amount:0, default_proposal_expiry_duration_limit:0, max_enter_contract_duration:0, auto_wait_tags_object:this.get_auto_wait_tags_object(), default_minimum_spend_vote_bounty_amount:0, proposal_modify_expiry_duration_limit:0, can_modify_contract_as_moderator: this.get_can_modify_contract_as_moderator(), can_extend_enter_contract_at_any_time: this.get_can_extend_enter_contract_at_any_time(),maximum_proposal_expiry_submit_expiry_time_difference:0, bounty_limit_type: this.get_bounty_limit_type(), contract_force_exit_enabled: this.get_contract_force_exit_enabled(), new_token_interactible_moderator_tags_object: this.get_new_token_interactible_moderator_tags_object(), moderator_id:'', moderators:[], interactible_id:'', interactible_timestamp:0, interactibles:[], exchange_id:'', price_amount:0, price_data:[], })

            this.props.notify('transaction added to stack', 700);
        }
    }


}




export default NewContractPage;