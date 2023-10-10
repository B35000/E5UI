import React, { Component } from 'react';
import ViewGroups from './../components/view_groups'
import Tags from './../components/tags';
import NumberPicker from './../components/number_picker';
import TextInput from './../components/text_input';

import Letter from './../assets/letter.png';

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDateTimePicker } from "@mui/x-date-pickers/StaticDateTimePicker";

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

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

class ModeratorPage extends Component {
    
    state = {
        selected: 0, id:makeid(8), type: 'access-rights-settings', entered_indexing_tags:['access', 'rights', 'settings'], new_moderator_action_page_tags_object: this.get_new_moderator_action_page_tags_object(), object_item:{'id':0, 'moderators':[]}, all_actions:[],

        access_rights_enabled_tags_object: this.get_access_rights_enabled_tags_object(),

        entered_moderator_text:'', has_added_remove_auth_mod_status_tx:false,

        entered_interactable_text:'', interactable_expiry_time: Date.now()/1000,
        entered_blocked_text:'', blocked_expiry_time: Date.now()/1000
    };

    get_new_moderator_action_page_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e','moderators','access-rights','block-accounts'], [1]
            ],
        };
    }

    get_access_rights_enabled_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e','private', 'public'], [1]
            ],
        };
    }

    render(){
        return(
            <div style={{'padding':'10px 10px 0px 10px'}}>
                
                <div className="row">
                    <div className="col-9" style={{'padding': '5px 0px 0px 10px'}}>
                        <Tags page_tags_object={this.state.new_moderator_action_page_tags_object} tag_size={'l'} when_tags_updated={this.when_new_moderator_action_page_tags_object_updated.bind(this)} theme={this.props.theme}/>
                    </div>
                    <div className="col-3" style={{'padding': '0px 0px 0px 0px'}}>
                        <div style={{'padding': '5px'}} onClick={()=>this.finish()}>
                            {this.render_detail_item('5', {'text':'Finish', 'action':''})}
                        </div>
                    </div>
                </div>

                <div style={{height:10}}/>
                {this.render_everything()}

                <div style={{height:10}}/>
                {this.render_all_transactions()}
            </div>
        )
    }



    when_new_moderator_action_page_tags_object_updated(tag_obj){
        this.setState({new_moderator_action_page_tags_object: tag_obj})
    }


    render_everything(){
        var selected_item = this.get_selected_item(this.state.new_moderator_action_page_tags_object, this.state.new_moderator_action_page_tags_object['i'].active)

        if(selected_item == 'moderators'){
            return(
                <div>
                    {this.render_moderators_part()}
                </div>
            )
        }
        else if(selected_item == 'access-rights'){
            return(
                <div>
                    {this.render_access_rights_data()}
                </div>
            )
        }
        else if(selected_item == 'block-accounts'){
            return(
                <div>
                    {this.render_block_accounts_ui()}
                </div>
            )
        }
    }

    get_selected_item(object, option){
        var selected_item = object[option][2][0]
        var picked_item = object[option][1][selected_item];
        return picked_item
    }



    render_moderators_part(){
        return(
            <div>
                {this.render_detail_item('3', {'title':'Moderator', 'details':'Add/Remove a moderator by their account ID', 'size':'l'})}
                <div style={{height:10}}/>
                <TextInput height={30} placeholder={'Account ID...'} when_text_input_field_changed={this.when_moderator_text_input_field_changed.bind(this)} text={this.state.entered_moderator_text} theme={this.props.theme}/>
                <div style={{height:10}}/>
                {this.load_account_suggestions()}

                <div style={{height:10}}/>
                <div onClick={() => this.add_remove_moderator()}>
                    {this.render_detail_item('5', {'text':'Add/Remove Moderator', 'action':''})}
                </div>


                {this.render_detail_item('0')}


                {this.render_detail_item('3', {'title':'Enable/Disable Access Rights', 'details':'Enable or Disable access rights to make the object public or private', 'size':'l'})}
                <div style={{height:10}}/>

                {this.render_detail_item('3', {'title':this.get_current_access_rights(), 'details':'Current access rights settings', 'size':'l'})}

                <div style={{height:10}}/>
                <Tags page_tags_object={this.state.access_rights_enabled_tags_object} tag_size={'l'} when_tags_updated={this.when_access_rights_enabled_tags_object_updated.bind(this)} theme={this.props.theme}/>
                <div style={{height:10}}/>

                <div onClick={() => this.enable_disable_interactible_checker()}>
                    {this.render_detail_item('5', {'text':'Enable/Disable', 'action':''})}
                </div>


                {this.render_detail_item('0')}

                {this.render_detail_item('3', {'title':'Revoke Authors Moderator Privelages', 'details':'Click Disable to disable moderator privelages for the author of the object. This action cannot be undone.', 'size':'l'})}
                <div style={{height:10}}/>

                <div onClick={() => this.revoke_author_mod_privelages_checker()}>
                    {this.render_detail_item('5', {'text':'Revoke', 'action':''})}
                </div>

            </div>
        )
    }

    when_access_rights_enabled_tags_object_updated(tag_obj){
        this.setState({access_rights_enabled_tags_object: tag_obj})
    }

    when_moderator_text_input_field_changed(text){
        this.setState({entered_moderator_text: text})
    }

    get_current_access_rights(){
        var value = this.state.object_item['access_rights_enabled']
        if(value == true){
            return 'Access Rights: Enabled'
        }else{
            return 'Access Rights: Disabled'
        }
    }

    add_remove_moderator(){
        var clone = this.state.all_actions.slice()
        var recipient = this.state.entered_moderator_text.trim()

        if(isNaN(recipient) || parseInt(recipient) < 0 || recipient == ''){
            this.props.notify('please put a valid account id', 600)
        }else{
            var action = 'Add moderator'
            if(this.state.object_item['moderators'].includes(recipient)) action = 'Remove moderator'
            var tx = {'account':recipient, entered_indexing_tags:['moderator', 'action'], 'action':action, type:'moderator', id:makeid(8), 'object':this.state.object_item}
            clone.push(tx)
            this.setState({all_actions: clone, entered_moderator_text: ''})
            this.props.notify('action added!', 600)
        }
    }

    enable_disable_interactible_checker(){
        var clone = this.state.all_actions.slice()
        var setting = this.get_selected_item(this.state.access_rights_enabled_tags_object, this.state.access_rights_enabled_tags_object['i'].active)
        
        var value = this.state.object_item['access_rights_enabled']
        if(value == true && setting == 'private'){
            this.props.notify('the thing is already private', 600)
            return;
        }
        if(value == false && setting == 'public'){
            this.props.notify('the thing is already public', 600)
            return;
        }
        var tx = {'setting':setting, entered_indexing_tags:['access-rights', 'action'], type:'interactable-checkers', id:makeid(8), 'object':this.state.object_item}
        clone.push(tx)
        this.setState({all_actions: clone})
        this.props.notify('action added!', 600)
    }


    revoke_author_mod_privelages_checker(){
        if(this.state.has_added_remove_auth_mod_status_tx){
            this.props.notify('you cant do that twice', 600)
        }else{
            var clone = this.state.all_actions.slice()
            var tx = { entered_indexing_tags:['revoke', 'author','moderator','privelages'], type:'author-moderator-privelages', id:makeid(8), 'object':this.state.object_item }
            clone.push(tx)
            this.setState({all_actions: clone, has_added_remove_auth_mod_status_tx: true})
            this.props.notify('action added!', 600)
        }
    }





    render_access_rights_data(){
        var today = new Date()
        return(
            <div>
                {this.render_detail_item('3', {'title':'Access Rights', 'details':'Add/Remove an interactable account by their account ID', 'size':'l'})}
                <div style={{height:10}}/>
                <TextInput height={30} placeholder={'Account ID...'} when_text_input_field_changed={this.when_interactable_text_input_field_changed.bind(this)} text={this.state.entered_interactable_text} theme={this.props.theme}/>

                <div style={{height:20}}/>
                <ThemeProvider theme={createTheme({ palette: { mode: this.props.theme['calendar_color'], }, })}>
                    <CssBaseline />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <StaticDateTimePicker orientation="portrait" onChange={(newValue) => this.when_new_dat_time_value_set(newValue)}/>
                    </LocalizationProvider>
                </ThemeProvider>

                <div style={{height:20}}/>
                {this.render_detail_item('3', {'title':this.get_time_from_now(this.state.interactable_expiry_time), 'details':'Time from now', 'size':'l'})}

                <div style={{height:10}}/>

                <div onClick={() => this.add_interactable_account()}>
                    {this.render_detail_item('5', {'text':'Add account setting', 'action':''})}
                </div>
                <div style={{height:20}}/>
            </div>
        )
    }

    when_interactable_text_input_field_changed(text){
        this.setState({entered_interactable_text: text})
    }

    when_new_dat_time_value_set(value){
        const selectedDate = value instanceof Date ? value : new Date(value);
        const timeInSeconds = Math.floor(selectedDate.getTime() / 1000);
        this.setState({interactable_expiry_time: timeInSeconds})
    }


    add_interactable_account(){
        var clone = this.state.all_actions.slice()
        var recipient = this.state.entered_interactable_text.trim()

        if(isNaN(recipient) || parseInt(recipient) < 0 || recipient == ''){
            this.props.notify('please put a valid account id', 600)
        }else{
            var tx = {'account':recipient, 'time':this.state.interactable_expiry_time, entered_indexing_tags:['access', 'rights','action'], type:'access-rights', id:makeid(8), 'object':this.state.object_item}
            clone.push(tx)
            this.setState({all_actions: clone, entered_interactable_text: '', interactable_expiry_time: Date.now()/1000})
            this.props.notify('action added!', 600)
        }
    }




    render_block_accounts_ui(){
        var today = new Date(0)
        return(
            <div>
                {this.render_detail_item('3', {'title':'Block Accounts', 'details':'Deny an account access to your object', 'size':'l'})}
                <div style={{height:10}}/>
                <TextInput height={30} placeholder={'Account ID...'} when_text_input_field_changed={this.when_blocked_text_input_field_changed.bind(this)} text={this.state.entered_blocked_text} theme={this.props.theme}/>

                <div style={{height:20}}/>
                <ThemeProvider theme={createTheme({ palette: { mode: this.props.theme['calendar_color'], }, })}>
                    <CssBaseline />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <StaticDateTimePicker orientation="portrait" onChange={(newValue) => this.when_new_date_time_value_set(newValue)} />
                    </LocalizationProvider>
                </ThemeProvider>

                <div style={{height:20}}/>
                {this.render_detail_item('3', {'title':this.get_time_from_now(this.state.blocked_expiry_time), 'details':'Time from now', 'size':'l'})}

                <div style={{height:10}}/>

                <div onClick={() => this.add_blocked_account()}>
                    {this.render_detail_item('5', {'text':'Add Blocked Account', 'action':''})}
                </div>
                <div style={{height:20}}/>
            </div>
        )
    }

    when_blocked_text_input_field_changed(text){
        this.setState({entered_blocked_text: text})
    }

    when_new_date_time_value_set(value){
        const selectedDate = value instanceof Date ? value : new Date(value);
        const timeInSeconds = Math.floor(selectedDate.getTime() / 1000);
        this.setState({blocked_expiry_time: timeInSeconds})
    }

    add_blocked_account(){
        var clone = this.state.all_actions.slice()
        var recipient = this.state.entered_blocked_text.trim()

        if(isNaN(recipient) || parseInt(recipient) < 0 || recipient == ''){
            this.props.notify('please put a valid account id', 600)
        }else{
            var tx = {'account':recipient, 'time':this.state.blocked_expiry_time, entered_indexing_tags:['blocked', 'accounts','action'], type:'blocked-access', id:makeid(8), 'object':this.state.object_item}
            clone.push(tx)
            this.setState({all_actions: clone, entered_blocked_text: '', blocked_expiry_time: Date.now()/1000})
            this.props.notify('action added!', 600)
        }
    }


    render_all_transactions(){
        var middle = this.props.height-500;
        var size = this.props.size;
        if(size == 'm'){
            middle = this.props.height-100;
        }
        var items = this.state.all_actions

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
            return(
                <div style={{overflow: 'auto', maxHeight: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.reverse().map((item, index) => (
                            <li style={{'padding': '5px'}} onClick={()=>this.when_item_clicked(item)}>
                                {this.render_all_action_item(item)}
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
    }

    render_all_action_item(item){
        var action = item.type;
        if(action == 'moderator'){
            return(
                <div>
                    {this.render_detail_item('3', {'title':action+' action: '+item['action'], 'details':'Target: '+item['account'], 'size':'s'})}
                </div>
            )
        }
        else if(action == 'interactable-checkers'){
            return(
                <div>
                    {this.render_detail_item('3', {'title':action+' action.', 'details':'Target: '+item['setting'], 'size':'s'})}
                </div>
            )
        }
        else if(action == 'author-moderator-privelages'){
            return(
                <div>
                    {this.render_detail_item('3', {'title':action+' action.', 'details':'Target: Revoke Privelages', 'size':'s'})}
                </div>
            )
        }
        else if(action == 'access-rights'){
            return(
                <div>
                    {this.render_detail_item('3', {'title':action+' action.', 'details':'Target: '+item['account']+', time from now: '+this.get_time_from_now(item['time']), 'size':'s'})}
                </div>
            )
        }
        else if(action == 'blocked-access'){
            return(
                <div>
                    {this.render_detail_item('3', {'title':action+' action.', 'details':'Target: '+item['account']+', time from now: '+this.get_time_from_now(item['time']), 'size':'s'})}
                </div>
            )
        }
    }


    when_item_clicked(item){
        var cloned_array = this.state.all_actions.slice()
        const index = cloned_array.indexOf(item);
        if (index > -1) { // only splice array when item is found
            cloned_array.splice(index, 1); // 2nd parameter means remove one item only
        }
        this.setState({all_actions: cloned_array})
        if(item.type == 'author-moderator-privelages'){
            this.setState({has_added_remove_auth_mod_status_tx:false})
        }
        this.props.notify('action removed!', 600)
    }




    load_account_suggestions(){
        var items = this.get_suggested_accounts()
        var background_color = this.props.theme['card_background_color']
        var card_shadow_color = this.props.theme['card_shadow_color']
        return(
            <div style={{'margin':'0px 0px 0px 5px','padding': '5px 0px 0px 0px', width: '97%', 'background-color': 'transparent'}}>
                <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '13px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                    {items.map((item, index) => (
                        <li style={{'display': 'inline-block', 'margin': '5px 5px 5px 5px', '-ms-overflow-style': 'none'}} onClick={() => this.when_suggestion_clicked(item, index)}>
                            {this.render_detail_item('3', item['label'])}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    get_suggested_accounts(){
        var obj = []
        var mods = this.state.object_item['moderators']
        for(var i=0; i<mods.length; i++){
            obj.push({'id':mods[i], 'label':{'title':mods[i], 'details':'Account', 'size':'s'}})
        }
        return obj
    }

    when_suggestion_clicked(item, pos){
        this.setState({entered_moderator_text: item['id']})
    }


    set_object(item){
        if(this.state.object_item['id'] != item['id']){
            this.setState({
                selected: 0, id:makeid(8), type: 'access-rights-settings', entered_indexing_tags:['access', 'rights', 'settings'], new_moderator_action_page_tags_object: this.get_new_moderator_action_page_tags_object(), object_item:{'id':0, 'moderators':[]}, all_actions:[],
                access_rights_enabled_tags_object: this.get_access_rights_enabled_tags_object(),
                entered_moderator_text:'', has_added_remove_auth_mod_status_tx:false,
                entered_interactable_text:'', interactable_expiry_time: Date.now()/1000,
                entered_blocked_text:'', blocked_expiry_time: Date.now()/1000
            })
        }
        this.setState({object_item: item, e5:item['e5']})
    }


    finish(){
        if(this.state.all_actions.length == 0){
            this.props.notify('you cant stack no changes', 700)
        }else{
            this.props.add_moderator_to_stack(this.state)
            this.setState({all_actions:[]})
            this.props.notify('transaction added to stack', 700);
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

    format_proportion(proportion){
        return ((proportion/10**18) * 100)+'%';
    }


}




export default ModeratorPage;