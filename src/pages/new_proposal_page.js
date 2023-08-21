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

class template extends Component {
    
    state = {
        selected: 0, type:'new-proposal', entered_indexing_tags:['new', 'proposal'],
        contract_item: {'data':[[],[0,0,0,0,0,0,0,0,0,0]]},
        new_proposal_title_tags_object:this.get_new_proposal_title_tags_object(), new_proposal_type_tags_object:this.get_new_proposal_type_tags_object(),
        page:0, proposal_expiry_time:Math.round(new Date().getTime()/1000), 
        proposal_submit_expiry_time:Math.round(new Date().getTime()/1000), 
        modify_target_id:'', spend_target_input_text:'', spend_token_input_text:'', 
        spend_amount:0, spend_actions:[],
    };


    get_new_proposal_title_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e','proposal-configuration','proposal-data','bounty-data'], [1]
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
                {this.render_detail_item('4', {'font':'Sans-serif', 'textsize':'15px', 'text':'Create your new proposal for contract ID: '+this.state.contract_item['id']})}

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

        if(selected_item == 'proposal-configuration'){
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

        }
    }


    get_selected_item(object, option){
        var selected_item = object[option][2][0]
        var picked_item = object[option][1][selected_item];
        return picked_item
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
        else if(selected_item == 'buy'){

        }
        else if(selected_item == 'reconfig'){

        }
        else if(selected_item == 'exchange-transfer'){

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
        var spend_target = this.state.spend_target_input_text;
        var spend_token = this.state.spend_token_input_text;
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
                            <li style={{'padding': '5px'}} onClick={()=>this.when_when_spend_action_clicked(index)}>
                                {this.render_detail_item('3', {'title':''+this.format_account_balance_figure(item['amount'])+' tokens', 'details':'target: '+item['spend_target']+', token: '+item['spend_token'], 'size':'s'})}
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
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




export default template;