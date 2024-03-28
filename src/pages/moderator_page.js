import React, { Component } from 'react';
import ViewGroups from './../components/view_groups'
import Tags from './../components/tags';
import NumberPicker from './../components/number_picker';
import TextInput from './../components/text_input';

// import Letter from './../assets/letter.png';

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
        selected: 0, id:makeid(8), type: this.props.app_state.loc['1265']/* 'access-rights-settings' */, entered_indexing_tags:[this.props.app_state.loc['1266']/* 'access' */, this.props.app_state.loc['1267']/* 'rights' */, this.props.app_state.loc['1268']/* 'settings' */], new_moderator_action_page_tags_object: this.get_new_moderator_action_page_tags_object(), object_item:{'id':0, 'moderators':[]}, all_actions:[],

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
                ['xor','',0], ['e',this.props.app_state.loc['1269']/* 'moderators' */,this.props.app_state.loc['1270']/* 'access-rights' */,this.props.app_state.loc['1271']/* 'block-accounts' */], [1]
            ],
        };
    }

    get_access_rights_enabled_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e',this.props.app_state.loc['1272']/* 'private' */, this.props.app_state.loc['1273']/* 'public' */], [1]
            ],
        };
    }

    render(){
        return(
            <div style={{'padding':'10px 10px 0px 10px'}}>
                
                <div className="row">
                    <div className="col-9" style={{'padding': '5px 0px 0px 10px'}}>
                        <Tags font={this.props.app_state.font} page_tags_object={this.state.new_moderator_action_page_tags_object} tag_size={'l'} when_tags_updated={this.when_new_moderator_action_page_tags_object_updated.bind(this)} theme={this.props.theme}/>
                    </div>
                    <div className="col-3" style={{'padding': '0px 0px 0px 0px'}}>
                        <div style={{'padding': '5px'}} onClick={()=>this.finish()}>
                            {this.render_detail_item('5', {'text':this.props.app_state.loc['4']/* 'Finish' */, 'action':''})}
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

        if(selected_item == this.props.app_state.loc['1269']/* 'moderators' */){
            return(
                <div>
                    {this.render_moderators_part()}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['1270']/* 'access-rights' */){
            return(
                <div>
                    {this.render_access_rights_data()}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['1271']/* 'block-accounts' */){
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
                {this.render_detail_item('3', {'title':this.props.app_state.loc['1274']/* 'Moderator' */, 'details':this.props.app_state.loc['1275']/* 'Add or Remove a moderator by their account ID.' */, 'size':'l'})}
                <div style={{height:10}}/>
                <TextInput font={this.props.app_state.font} height={30} placeholder={this.props.app_state.loc['1276']/* 'Account ID...' */} when_text_input_field_changed={this.when_moderator_text_input_field_changed.bind(this)} text={this.state.entered_moderator_text} theme={this.props.theme}/>
                <div style={{height:10}}/>
                {this.load_account_suggestions()}

                <div style={{height:10}}/>
                <div onClick={() => this.add_remove_moderator()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['1277']/* 'Add/Remove Moderator' */, 'action':''})}
                </div>


                {this.render_detail_item('0')}


                {this.render_detail_item('3', {'title':this.props.app_state.loc['1278']/* 'Enable/Disable Access Rights' */, 'details':this.props.app_state.loc['1279']/* 'Enable or Disable access rights to make the object public or private' */, 'size':'l'})}
                <div style={{height:10}}/>

                {this.render_detail_item('3', {'title':this.get_current_access_rights(), 'details':this.props.app_state.loc['1280']/* 'Current access rights settings' */, 'size':'l'})}

                <div style={{height:10}}/>
                <Tags font={this.props.app_state.font} page_tags_object={this.state.access_rights_enabled_tags_object} tag_size={'l'} when_tags_updated={this.when_access_rights_enabled_tags_object_updated.bind(this)} theme={this.props.theme}/>
                <div style={{height:10}}/>

                <div onClick={() => this.enable_disable_interactible_checker()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['1281']/* 'Enable/Disable' */, 'action':''})}
                </div>


                {this.render_detail_item('0')}

                {this.render_detail_item('3', {'title':this.props.app_state.loc['1282']/* 'Revoke Authors Moderator Privelages' */, 'details':this.props.app_state.loc['1283']/* 'Click Disable to disable moderator privelages for the author of the object. This action cannot be undone.' */, 'size':'l'})}
                <div style={{height:10}}/>

                <div onClick={() => this.revoke_author_mod_privelages_checker()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['1284']/* 'Revoke' */, 'action':''})}
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
            return this.props.app_state.loc['1285']/* 'Access Rights: Enabled' */
        }else{
            return this.props.app_state.loc['1286']/* 'Access Rights: Disabled' */
        }
    }

    add_remove_moderator(){
        var clone = this.state.all_actions.slice()
        var recipient = this.get_typed_alias_id(this.state.entered_moderator_text.trim())

        if(isNaN(recipient) || parseInt(recipient) < 0 || recipient == ''){
            this.props.notify(this.props.app_state.loc['1287']/* 'Please put a valid account ID.' */, 4600)
        }else{
            var action = 'Add moderator'
            if(this.state.object_item['moderators'].includes(recipient)) action = 'Remove moderator'
            var tx = {'account':recipient, entered_indexing_tags:['moderator', 'action'], 'action':action, type:'moderator', id:makeid(8), 'object':this.state.object_item}
            clone.push(tx)
            this.setState({all_actions: clone, entered_moderator_text: ''})
            this.props.notify(this.props.app_state.loc['1288']/* 'Action added.' */, 4600)
        }
    }

    get_typed_alias_id(alias){
        if(!isNaN(alias)){
            return alias
        }
        var id = (this.props.app_state.alias_owners[this.state.object_item['e5']][alias] == null ? 
            alias : this.props.app_state.alias_owners[this.state.object_item['e5']][alias])

        return id
    }

    enable_disable_interactible_checker(){
        var clone = this.state.all_actions.slice()
        var setting = this.get_selected_item(this.state.access_rights_enabled_tags_object, this.state.access_rights_enabled_tags_object['i'].active)
        
        var value = this.state.object_item['access_rights_enabled']
        if(value == true && setting == 'private'){
            this.props.notify(this.props.app_state.loc['1289']/* 'The thing is already private.' */, 5600)
            return;
        }
        if(value == false && setting == 'public'){
            this.props.notify(this.props.app_state.loc['1290']/* 'The thing is already public.' */, 5600)
            return;
        }
        var tx = {'setting':setting, entered_indexing_tags:['access-rights', 'action'], type:'interactable-checkers', id:makeid(8), 'object':this.state.object_item}
        clone.push(tx)
        this.setState({all_actions: clone})
        this.props.notify(this.props.app_state.loc['1288']/* 'Action added' */, 1600)
    }


    revoke_author_mod_privelages_checker(){
        if(this.state.has_added_remove_auth_mod_status_tx){
            this.props.notify(this.props.app_state.loc['1291']/* 'You cant do that twice.' */, 4600)
        }else{
            var clone = this.state.all_actions.slice()
            var tx = { entered_indexing_tags:['revoke', 'author','moderator','privelages'], type:'author-moderator-privelages', id:makeid(8), 'object':this.state.object_item }
            clone.push(tx)
            this.setState({all_actions: clone, has_added_remove_auth_mod_status_tx: true})
            this.props.notify(this.props.app_state.loc['1288']/* 'Action added' */, 1600)
        }
    }





    render_access_rights_data(){
        var today = new Date()
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['1292']/* 'Access Rights' */, 'details':this.props.app_state.loc['1293']/* 'Add/Remove an interactable account by their account ID.' */, 'size':'l'})}
                <div style={{height:10}}/>
                <TextInput font={this.props.app_state.font} height={30} placeholder={this.props.app_state.loc['1276']/* 'Account ID...' */} when_text_input_field_changed={this.when_interactable_text_input_field_changed.bind(this)} text={this.state.entered_interactable_text} theme={this.props.theme}/>

                <div style={{height:20}}/>
                <ThemeProvider theme={createTheme({ palette: { mode: this.props.theme['calendar_color'], }, })}>
                    <CssBaseline />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <StaticDateTimePicker orientation="portrait" onChange={(newValue) => this.when_new_dat_time_value_set(newValue)}/>
                    </LocalizationProvider>
                </ThemeProvider>

                <div style={{height:20}}/>
                {this.render_detail_item('3', {'title':this.get_time_from_now(this.state.interactable_expiry_time), 'details':this.props.app_state.loc['1294']/* 'Time from now' */, 'size':'l'})}

                <div style={{height:10}}/>

                <div onClick={() => this.add_interactable_account()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['1295']/* 'Add account setting' */, 'action':''})}
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
        var recipient = this.get_typed_alias_id(this.state.entered_interactable_text.trim())

        if(isNaN(recipient) || parseInt(recipient) < 0 || recipient == ''){
            this.props.notify(this.props.app_state.loc['1296']/* 'Please put a valid account ID.' */, 4600)
        }else{
            var tx = {'account':recipient, 'time':this.state.interactable_expiry_time, entered_indexing_tags:['access', 'rights','action'], type:'access-rights', id:makeid(8), 'object':this.state.object_item}
            clone.push(tx)
            this.setState({all_actions: clone, entered_interactable_text: '', interactable_expiry_time: Date.now()/1000})
            this.props.notify(this.props.app_state.loc['1288']/* 'Action added.' */, 1600)
        }
    }




    render_block_accounts_ui(){
        var today = new Date(0)
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['1297']/* 'Block Accounts' */, 'details':this.props.app_state.loc['1298']/* 'Deny an account access to your object' */, 'size':'l'})}
                <div style={{height:10}}/>
                <TextInput font={this.props.app_state.font} height={30} placeholder={this.props.app_state.loc['1276']/* 'Account ID...' */} when_text_input_field_changed={this.when_blocked_text_input_field_changed.bind(this)} text={this.state.entered_blocked_text} theme={this.props.theme}/>

                <div style={{height:20}}/>
                <ThemeProvider theme={createTheme({ palette: { mode: this.props.theme['calendar_color'], }, })}>
                    <CssBaseline />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <StaticDateTimePicker orientation="portrait" onChange={(newValue) => this.when_new_date_time_value_set(newValue)} />
                    </LocalizationProvider>
                </ThemeProvider>

                <div style={{height:20}}/>
                {this.render_detail_item('3', {'title':this.get_time_from_now(this.state.blocked_expiry_time), 'details':this.props.app_state.loc['1294']/* 'Time from now' */, 'size':'l'})}

                <div style={{height:10}}/>

                <div onClick={() => this.add_blocked_account()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['1299']/* 'Add Blocked Account' */, 'action':''})}
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
        var recipient = this.get_typed_alias_id(this.state.entered_blocked_text.trim())

        if(isNaN(recipient) || parseInt(recipient) < 0 || recipient == ''){
            this.props.notify(this.props.app_state.loc['1291e']/* 'Please put a valid account ID.' */, 4600)
        }else{
            var tx = {'account':recipient, 'time':this.state.blocked_expiry_time, entered_indexing_tags:['blocked', 'accounts','action'], type:'blocked-access', id:makeid(8), 'object':this.state.object_item}
            clone.push(tx)
            this.setState({all_actions: clone, entered_blocked_text: '', blocked_expiry_time: Date.now()/1000})
            this.props.notify(this.props.app_state.loc['1288']/* 'Action added.' */, 1600)
        }
    }


    render_all_transactions(){
        var middle = this.props.height-500;
        var size = this.props.size;
        if(size == 'm'){
            middle = this.props.height-100;
        }
        var items = [].concat(this.state.all_actions)

        if(items.length == 0){
            items = [0, 1]
            return(
                <div style={{}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.map((item, index) => (
                            <li style={{'padding': '5px'}} onClick={()=>console.log()}>
                                <div style={{height:60, width:'100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px','padding':'10px 0px 10px 10px', 'max-width':'420px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                                    <div style={{'margin':'10px 20px 10px 0px'}}>
                                        <img src={this.props.app_state.static_assets['letter']} style={{height:30 ,width:'auto'}} />
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
                    {this.render_detail_item('3', {'title':action+this.props.app_state.loc['1292e']/* ' action: ' */+item['action'], 'details':this.props.app_state.loc['1293e']/* 'Target: ' */+item['account'], 'size':'s'})}
                </div>
            )
        }
        else if(action == 'interactable-checkers'){
            return(
                <div>
                    {this.render_detail_item('3', {'title':action+this.props.app_state.loc['1294e']/* ' action.' */, 'details':this.props.app_state.loc['1293e']/* 'Target: ' */+item['setting'], 'size':'s'})}
                </div>
            )
        }
        else if(action == 'author-moderator-privelages'){
            return(
                <div>
                    {this.render_detail_item('3', {'title':action+this.props.app_state.loc['1294e']/* ' action.' */, 'details':this.props.app_state.loc['1295e']/* 'Target: Revoke Privelages' */, 'size':'s'})}
                </div>
            )
        }
        else if(action == 'access-rights'){
            return(
                <div>
                    {this.render_detail_item('3', {'title':action+this.props.app_state.loc['1294e']/* ' action.' */, 'details':this.props.app_state.loc['1293e']/* 'Target: ' */+item['account']+this.props.app_state.loc['1296e']/* ', time from now: ' */+this.get_time_from_now(item['time']), 'size':'s'})}
                </div>
            )
        }
        else if(action == 'blocked-access'){
            return(
                <div>
                    {this.render_detail_item('3', {'title':action+this.props.app_state.loc['1294e']/* ' action.' */, 'details':this.props.app_state.loc['1293e']/* 'Target: ' */+item['account']+this.props.app_state.loc['1297e']/* ', time from now: ' */+this.get_time_from_now(item['time']), 'size':'s'})}
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
        this.props.notify(this.props.app_state.loc['1298e']/* 'Action removed.' */, 1600)
    }




    load_account_suggestions(){
        var items = [].concat(this.get_suggested_accounts())
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
            obj.push({'id':mods[i], 'label':{'title':mods[i], 'details':this.props.app_state.loc['1299e']/* 'Account' */, 'size':'s'}})
        }
        return obj
    }

    when_suggestion_clicked(item, pos){
        this.setState({entered_moderator_text: item['id']})
    }


    set_object(item){
        if(this.state.object_item['id'] != item['id']){
            this.setState({
                selected: 0, id:makeid(8), type: this.props.app_state.loc['1265']/* 'access-rights-settings' */, entered_indexing_tags:[this.props.app_state.loc['1266']/* 'access' */, this.props.app_state.loc['1267']/* 'rights' */, this.props.app_state.loc['1268']/* 'settings' */], new_moderator_action_page_tags_object: this.get_new_moderator_action_page_tags_object(), object_item:{'id':0, 'moderators':[]}, all_actions:[],
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
            this.props.notify(this.props.app_state.loc['1300']/* 'You cant stack no changes.' */, 3700)
        }else{
            this.props.add_moderator_to_stack(this.state)
            this.setState({all_actions:[]})
            this.props.notify(this.props.app_state.loc['18']/* 'transaction added to stack' */, 1700);
        }
    }




     /* renders the specific element in the post or detail object */
    render_detail_item(item_id, object_data){
        return(
            <div>
                <ViewGroups graph_type={this.props.app_state.graph_type} font={this.props.app_state.font} item_id={item_id} object_data={object_data} theme={this.props.theme} width={this.props.app_state.width} />
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

    format_proportion(proportion){
        return ((proportion/10**18) * 100)+'%';
    }


}




export default ModeratorPage;