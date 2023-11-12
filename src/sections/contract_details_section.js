import React, { Component } from 'react';
import ViewGroups from './../components/view_groups'
import Tags from './../components/tags';
import Letter from './../assets/letter.png';
import TextInput from './../components/text_input';

var bigInt = require("big-integer");


function bgN(number, power) {
    return bigInt((number + "e" + power)).toString();
}

function number_with_commas(x) {
    if (x == null) x = '';
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


class ContractDetailsSection extends Component {

    state = {
        selected: 0, navigate_view_contract_list_detail_tags_object: this.get_navigate_view_contract_list_detail_tags(), enter_contract_search_text:'', exit_contract_search_text:''
    };

    componentDidMount() {
        this.interval = setInterval(() => this.check_for_new_responses_and_messages(), 10000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    check_for_new_responses_and_messages() {
        if (this.props.selected_contract_item != null) {
            var object = this.get_item_in_array(this.get_contract_items(), this.props.selected_contract_item)
            if(object == null) return;
            this.props.get_contract_event_data(object['id'], object['e5'])
            this.props.get_moderator_event_data(object['id'], object['e5'])
        }
    }

    get_navigate_view_contract_list_detail_tags() {
        return {
            'i': {
                active: 'e',
            },
            'e': [
                ['xor', '', 0], ['e', 'details', 'e.events', 'e.moderator-events'], [1]
            ],
            'events': [
                ['xor', 'e', 1], ['events', 'transfers', 'create-proposal', 'modify-contract', 'enter-contract', 'extend-contract-stay', 'exit-contract', 'force-exit-accounts'], [1], [1]
            ],
            'moderator-events': [
                ['xor', 'e', 1], ['moderator-events', 'modify-moderators', 'interactable-checkers', 'interactable-accounts', 'block-accounts'], [1], [1]
            ],
        }
    }

    render() {
        return (
            <div>{this.render_contracts_list_detail()}</div>
        )
    }

    render_contracts_list_detail() {
        if (this.props.selected_contract_item == null) {
            return (
                <div>
                    {this.render_empty_detail_object()}
                </div>
            )
        } else {
            return (
                <div>
                    {this.render_contract_details_section()}
                    <div style={{ width: '100%', 'padding': '0px 0px 0px 0px', 'margin': '0px 0px 0px 0px', 'max-width': '470px' }}>
                        <Tags page_tags_object={this.state.navigate_view_contract_list_detail_tags_object} tag_size={'l'} when_tags_updated={this.when_navigate_view_contract_list_detail_tags_object_updated.bind(this)} theme={this.props.theme} />
                    </div>
                </div>
            )
        }
    }

    when_navigate_view_contract_list_detail_tags_object_updated(tag_obj) {
        this.setState({ navigate_view_contract_list_detail_tags_object: tag_obj })
    }

    get_selected_item(object, option) {
        var selected_item = object[option][2][0]
        var picked_item = object[option][1][selected_item];
        return picked_item
    }

    get_item_in_array(object_array, id){
        var object = object_array.find(x => x['e5_id'] === id);
        return object
    }


    render_contract_details_section() {
        var selected_item = this.get_selected_item(this.state.navigate_view_contract_list_detail_tags_object, this.state.navigate_view_contract_list_detail_tags_object['i'].active)
        var object = this.get_item_in_array(this.get_contract_items(), this.props.selected_contract_item)
        if(object == null){
            return(
                <div>
                    {this.render_empty_detail_object()}
                </div>
            )
        }

        if(object != null){
            if (selected_item == 'details') {
                return (
                    <div>
                        {this.render_contracts_main_details_section(object)}
                    </div>
                )
            }
            else if (selected_item == 'create-proposal') {
                return (
                    <div>
                        {this.render_create_proposal_logs(object)}
                    </div>
                )

            }
            else if (selected_item == 'modify-contract') {
                return (
                    <div>
                        {this.render_modify_contract_logs(object)}
                    </div>
                )

            }
            else if (selected_item == 'enter-contract') {
                return (
                    <div>
                        {this.render_enter_contract_logs(object)}
                    </div>
                )

            }
            else if (selected_item == 'extend-contract-stay') {
                return (
                    <div>
                        {this.render_extend_contract_logs(object)}
                    </div>
                )

            }
            else if (selected_item == 'exit-contract') {
                return (
                    <div>
                        {this.render_exit_contract_logs(object)}
                    </div>
                )

            }
            else if (selected_item == 'force-exit-accounts') {
                return (
                    <div>
                        {this.force_exit_accounts_logs(object)}
                    </div>
                )

            }
            else if (selected_item == 'transfers') {
                return (
                    <div>
                        {this.render_transfer_logs(object)}
                    </div>
                )

            }
            else if(selected_item == 'modify-moderators'){
                return(
                    <div>
                        {this.render_modify_moderator_logs(object)}
                    </div>
                )
            }
            else if(selected_item == 'interactable-checkers'){
                return(
                    <div>
                        {this.render_interactable_checker_logs(object)}
                    </div>
                )
            }
            else if(selected_item == 'interactable-accounts'){
                return(
                    <div>
                        {this.render_interactable_accounts_logs(object)}
                    </div>
                )
            }
            else if(selected_item == 'block-accounts'){
                return(
                    <div>
                        {this.render_blocked_accounts_logs(object)}
                    </div>
                )
            }
        }
    }

    render_empty_detail_object(){
        var background_color = this.props.theme['card_background_color']
        var he = this.props.height
        return(
            <div style={{height:this.props.height-45, width:'100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px','padding':'10px 0px 0px 10px', 'max-width':'420px','display': 'flex', 'align-items':'center','justify-content':'center','margin':'0px 0px 20px 0px'}}>
                <div style={{'margin':'10px 20px 0px 0px'}}>
                    <img src={Letter} style={{height:70 ,width:'auto'}} />
                    <p style={{'display': 'flex', 'align-items':'center','justify-content':'center', 'padding':'5px 0px 0px 7px', 'color': 'gray'}}></p>
                </div>
            </div>
        );
    }

    render_contracts_main_details_section(object) {
        var background_color = this.props.theme['card_background_color']
        var he = this.props.height - 50
        var item = this.get_contract_details_data(object)
        // var object = this.get_contract_items()[this.props.selected_contract_item]
        var author = object['event'] != null ? this.get_senders_name(object['event'].returnValues.p3, object) : 'Unknown'
        return (
            <div style={{ 'background-color': background_color, 'border-radius': '15px', 'margin': '5px 10px 2px 10px', 'padding': '0px 10px 0px 10px', 'max-width': '470px' }}>
                <div style={{ 'overflow-y': 'auto', width: '100%', height: he, padding: '0px 10px 0px 10px' }}>
                    {this.render_detail_item('1', item['tags'])}
                    <div style={{ height: 10 }} />
                    {this.render_detail_item('3', item['id'])}
                    <div style={{ height: 10 }} />
                    {this.render_detail_item('3', { 'title': '' + author, 'details': 'Author', 'size': 'l' })}
                    <div style={{ height: 10 }} />
                    {this.render_detail_item('3', { 'size': 'l', 'details': 'Access Rights', 'title': this.get_access_rights_status(object['access_rights_enabled']) })}
                    <div style={{ height: 10 }} />

                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 0px 5px 0px', 'border-radius': '8px' }}>
                        {this.render_detail_item('2', item['age'])}
                    </div>
                    <div style={{ height: 10 }} />
                    {this.render_detail_item('3', item['default_vote_bounty_split_proportion'])}

                    <div style={{ height: 10 }} />
                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 0px 5px 0px', 'border-radius': '8px' }}>
                        {this.render_detail_item('2', item['default_minimum_end_vote_bounty_amount'])}
                    </div>

                    <div style={{ height: 10 }} />
                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 0px 5px 0px', 'border-radius': '8px' }}>
                        {this.render_detail_item('2', item['default_minimum_spend_vote_bounty_amount'])}
                    </div>
                    <div style={{ height: 10 }} />
                    {this.render_detail_item('3', item['default_proposal_expiry_duration_limit'])}
                    <div style={{ height: 10 }} />
                    {this.render_detail_item('3', item['max_enter_contract_duration'])}
                    <div style={{ height: 10 }} />
                    {this.render_detail_item('3', item['auto_wait_for_all_proposals_for_all_voters'])}
                    <div style={{ height: 10 }} />
                    {this.render_detail_item('3', item['proposal_modify_expiry_duration_limit'])}
                    <div style={{ height: 10 }} />
                    {this.render_detail_item('3', item['can_modify_contract_as_moderator'])}
                    <div style={{ height: 10 }} />
                    {this.render_detail_item('3', item['can_extend_enter_contract_at_any_time'])}
                    <div style={{ height: 10 }} />
                    {this.render_detail_item('3', item['maximum_proposal_expiry_submit_expiry_time_difference'])}
                    <div style={{ height: 10 }} />
                    {this.render_detail_item('3', item['bounty_limit_type'])}
                    <div style={{ height: 10 }} />
                    {this.render_detail_item('3', item['contract_force_exit_enabled'])}

                    <div style={{height: 10}}/>
                    {this.render_revoke_author_privelages_event(object)}
                    
                    {this.render_participants(object)}
                      

                    {this.show_contract_balance(item, object)}

                    {this.render_entry_fees(object, item)}

                    {this.show_normal_contract_buttons(object)}

                    {this.show_send_proposal_button(object)}

                    {this.show_send_main_contract_proposal(object)}

                    {this.render_auth_modify_button(object)}

                    {this.render_force_exit_button(object)}

                    {this.render_moderator_button(object)}

                    {this.render_pin_contract_button(object)}

                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            </div>
        )
    }

    get_senders_name(sender, object){
        // var object = this.get_mail_items()[this.props.selected_mail_item];
        if(sender == this.props.app_state.user_account_id[object['e5']]){
            return 'You'
        }else{
            var alias = (this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[sender] == null ? sender : this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[sender])
            return alias
        }
    }

    render_participants(object){
        if(object['id'] != 2){
            return(
                <div>
                    {this.render_detail_item('0')}

                    {this.render_detail_item('3', {'title':'Participant Accounts', 'details':'The accounts that have entered the contract', 'size':'l'})}
                    <div style={{height: 10}}/>
                    {this.render_participant_accounts(object)}
                </div>
            )
        }
    }

    render_participant_accounts(object){
        var items = [].concat(object['participants'])
        var background_color = this.props.theme['card_background_color']
        var card_shadow_color = this.props.theme['card_shadow_color']
        return(
            <div style={{'margin':'0px 0px 0px 0px','padding': '0px 0px 0px 0px', width: '97%', 'background-color': 'transparent'}}>
                <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '13px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                    {items.map((item, index) => (
                        <li style={{'display': 'inline-block', 'margin': '5px 5px 5px 5px', '-ms-overflow-style':'none'}}>
                            {this.render_detail_item('3', {'title':this.get_senders_name(item, object), 'details':'Participant', 'size':'s'})}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    render_pin_contract_button(object){
        return(
            <div>
                {this.render_detail_item('0')}
                {this.render_detail_item('3', {'size':'l', 'details':'Pin the contract to your feed', 'title':'Pin Contract'})}
                <div style={{height:10}}/>
                <div onClick={()=> this.when_pin_contract_clicked(object)}>
                    {this.render_detail_item('5', {'text':'Pin/Unpin Contract', 'action':''},)}
                </div>
            </div>
        )
    }

    when_pin_contract_clicked(object){
        this.props.pin_contract(object)
    }

    render_entry_fees(object, item){
        if(object['id'] != 2){
            return(
                <div>
                    {this.render_detail_item('0')}
                    {this.render_detail_item('3', item['entry_fees'])}
                    <div style={{ height: 10 }} />
                    {this.render_buy_token_uis(object['data'][2], object['data'][3], object['data'][4], object)}
                    {this.render_detail_item('0')}
                </div>
            )
        }
    }

    render_revoke_author_privelages_event(object){
        // var object = this.get_contract_items()[this.props.selected_contract_item]
        var events = this.get_moderator_item_logs(object, 'revoke_privelages')

        if(object['id'] != 2){
            if(events.length != 0){
                return(
                    <div>
                        {this.render_detail_item('3', {'title':'Author Moderator Privelages Disabled', 'details':'Author of Object is not a Moderator by default', 'size':'l'})}
                    </div>
                )
            }else{
                return(
                    <div>
                        {this.render_detail_item('3', {'title':'Author Moderator Privelages Enabled', 'details':'Author of Object is a Moderator by default', 'size':'l'})}
                    </div>
                )
            }
        }
    }

    get_access_rights_status(value) {
        if (value == true) {
            return 'Enabled'
        } else {
            return 'Disabled'
        }
    }

    show_normal_contract_buttons(object) {
        // var object = this.get_contract_items()[this.props.selected_contract_item]
        if (object['id'] != 2) {
            return (
                <div>
                    {this.show_enter_contract_button(object)}

                    <div style={{ height: 10 }} />

                    {this.show_extend_stay_in_contract_button(object)}

                    {this.show_exit_contract_action(object)}

                    {this.render_archive_button_if_author(object)}

                </div>
            )
        }
    }

    show_enter_contract_button(object) {
        return (
            <div>
                {this.show_entered_contract_data(object)}
                <div style={{ height: 10 }} />

                {this.render_detail_item('3', { 'size': 'l', 'details': 'Enter a contract to participate in its consensus', 'title': 'Enter Contract' })}
                <div style={{ height: 10 }} />

                <div onClick={() => this.open_enter_contract_ui(object)}>
                    {this.render_detail_item('5', { 'text': 'Enter', 'action': '' },)}
                </div>
            </div>
        )
    }

    show_extend_stay_in_contract_button(object) {
        // var object = this.get_contract_items()[this.props.selected_contract_item]
        var expiry_time_in_seconds = object['entry_expiry']
        var time_to_expiry = expiry_time_in_seconds - Math.floor(new Date() / 1000);
        var contract_config = object['data'][1]

        if (expiry_time_in_seconds != 0 && time_to_expiry > contract_config[2]) {
            return (
                <div>
                    {this.render_detail_item('0')}

                    {this.render_detail_item('3', { 'size': 'l', 'details': 'Max Extend Enter Contract Limit', 'title': this.get_time_diff(contract_config[2]) })}
                    <div style={{ height: 10 }} />

                    {this.render_detail_item('3', { 'size': 'l', 'details': 'Extend your stay in the contract', 'title': 'Extend Stay' })}
                    <div style={{ height: 10 }} />

                    <div onClick={() => this.open_extend_contract_ui(object)}>
                        {this.render_detail_item('5', { 'text': 'Extend', 'action': '' },)}
                    </div>

                </div>
            )
        }
    }

    show_send_proposal_button(object) {
        // var object = this.get_contract_items()[this.props.selected_contract_item]
        var expiry_time_in_seconds = object['entry_expiry']
        var time_to_expiry = expiry_time_in_seconds - Math.floor(new Date() / 1000);

        if ((expiry_time_in_seconds != 0 && time_to_expiry > 0) && object['id'] != 2) {
            return (
                <div>
                    {this.render_detail_item('0')}
                    {this.render_detail_item('3', { 'size': 'l', 'details': 'Send a proposal to the contract to perform a specified action', 'title': 'Send Proposal' })}
                    <div style={{ height: 10 }} />
                    <div onClick={() => this.open_new_proposal_ui(object)}>
                        {this.render_detail_item('5', { 'text': 'Send', 'action': '' },)}
                    </div>
                </div>
            )
        }

    }

    show_send_main_contract_proposal(object){
        if(object['id'] == 2){
            var e5 = object['e5']
            var entered_contracts_count = this.props.app_state.basic_transaction_data[e5][2]
            var e5_runs_count = this.props.app_state.basic_transaction_data[e5][3]
            var minimum_entered_contracts = object['data'][1][14 /* minimum_entered_contracts */]
            var minimum_transaction_count = object['data'][1][19 /* minimum_transaction_count */]

            if(entered_contracts_count>= minimum_entered_contracts && e5_runs_count>= minimum_transaction_count){
                return (
                    <div>
                        {this.render_detail_item('0')}
                        {this.render_detail_item('3', { 'size': 'l', 'details': 'Send a proposal to the contract to perform a specified action', 'title': 'Send Proposal' })}
                        <div style={{ height: 10 }} />
                        <div onClick={() => this.open_new_proposal_ui(object)}>
                            {this.render_detail_item('5', { 'text': 'Send', 'action': '' },)}
                        </div>
                    </div>
                )
            }
        }
    }

    show_exit_contract_action(object) {
        // var object = this.get_contract_items()[this.props.selected_contract_item]
        var expiry_time_in_seconds = object['entry_expiry']
        var time_to_expiry = expiry_time_in_seconds - Math.floor(new Date() / 1000);

        if (expiry_time_in_seconds != 0) {
            return (
                <div>
                    {this.render_detail_item('0')}
                    {this.render_detail_item('3', { 'size': 'l', 'details': 'Exit from the contract and no longer participate in its consensus', 'title': 'Exit Contract' })}
                    <div style={{ height: 10 }} />

                    <div onClick={() => this.open_exit_contract_ui(object)}>
                        {this.render_detail_item('5', { 'text': 'Exit', 'action': '' },)}
                    </div>
                </div>
            )
        }
    }

    show_entered_contract_data(object) {
        // var object = this.get_contract_items()[this.props.selected_contract_item]
        var expiry_time_in_seconds = object['entry_expiry']
        var time_to_expiry = expiry_time_in_seconds - Math.floor(new Date() / 1000);

        if (expiry_time_in_seconds != 0 && time_to_expiry > 0) {
            return (
                <div>
                    {this.render_detail_item('3', { 'size': 'l', 'details': 'Until: ' + (new Date(expiry_time_in_seconds * 1000)), 'title': 'Entry Exipry Time' })}
                    <div style={{ height: 10 }} />

                    {this.render_detail_item('3', { 'size': 'l', 'details': '' + (this.get_time_diff(time_to_expiry)), 'title': 'Time remaining' })}
                </div>
            )
        } else if (expiry_time_in_seconds != 0 && time_to_expiry < 0) {
            return (
                <div>
                    {this.render_detail_item('4', { 'text': 'Your time in the contract has exipred, you have to enter it again.', 'textsize': '13px', 'font': 'Sans-serif' })}
                </div>
            )
        }
        else {
            return (
                <div>
                    {this.render_detail_item('4', { 'text': 'Youre not part of the contract', 'textsize': '13px', 'font': 'Sans-serif' })}
                </div>
            )
        }
    }

    render_auth_modify_button(object) {
        // var object = this.get_contract_items()[this.props.selected_contract_item]
        var contract_config = object['data'][1]
        var my_account = this.props.app_state.user_account_id[object['e5']]
        if (object['id'] != 2 && object['event'].returnValues.p3 == my_account && contract_config[28/* can_modify_contract_as_moderator */] == 1) {
            return (
                <div>
                    {this.render_detail_item('0')}

                    {this.render_detail_item('3', { 'title': 'Modify Contract', 'details': 'Modify the configuration of the contract directly.', 'size': 'l' })}
                    <div style={{ height: 10 }} />
                    <div onClick={() => this.open_modify_contract_ui(object)}>
                        {this.render_detail_item('5', { 'text': 'Modify Contract', 'action': '' })}
                    </div>
                </div>
            )
        }
    }

    render_force_exit_button(object) {
        // var object = this.get_contract_items()[this.props.selected_contract_item]
        var contract_config = object['data'][1]
        var my_account = this.props.app_state.user_account_id[object['e5']]
        if (object['id'] != 2 && object['event'].returnValues.p3 == my_account && contract_config[38/* contract_force_exit_enabled */] == 1) {
            return (
                <div>
                    {this.render_detail_item('0')}

                    {this.render_detail_item('3', { 'title': 'Force Exit Accounts', 'details': 'Remove an account from the contract directly.', 'size': 'l' })}
                    <div style={{ height: 10 }} />
                    <div onClick={() => this.open_force_exit_ui(object)}>
                        {this.render_detail_item('5', { 'text': 'Force Exit Accounts', 'action': '' })}
                    </div>
                </div>
            )
        }
    }

    render_archive_button_if_author(object) {
        // var object = this.get_contract_items()[this.props.selected_contract_item]
        var my_account = this.props.app_state.user_account_id[object['e5']]
        if (object['event'].returnValues.p3 == my_account && object['data'][1][15] < Date.now() / 1000) {
            return (
                <div>
                    {this.render_detail_item('0')}
                    {this.render_detail_item('3', { 'title': 'Archive Contract', 'details': 'Delete the contracts data to free up space in the blockchain', 'size': 'l' })}
                    <div style={{ height: 10 }} />
                    <div onClick={() => this.open_archive_contract_ui(object)}>
                        {this.render_detail_item('5', { 'text': 'Archive Contract', 'action': '' })}
                    </div>
                </div>
            )
        }
    }

    render_moderator_button(object) {
        // var object = this.get_contract_items()[this.props.selected_contract_item]
        var my_account = this.props.app_state.user_account_id[object['e5']]

        if (object['id'] != 2 && (object['moderators'].includes(my_account) || object['event'].returnValues.p3 == my_account)) {
            return (
                <div>
                    {this.render_detail_item('0')}

                    {this.render_detail_item('3', { 'title': 'Perform Moderator Actions', 'details': 'Set an accounts access rights, moderator privelages or block an account', 'size': 'l' })}
                    <div style={{ height: 10 }} />
                    <div onClick={() => this.open_moderator_ui(object)}>
                        {this.render_detail_item('5', { 'text': 'Perform Action', 'action': '' })}
                    </div>
                </div>
            )
        }
    }

    open_enter_contract_ui(object) {
        // var object = this.get_contract_items()[this.props.selected_contract_item]
        this.props.open_enter_contract_ui(object)
    }

    open_extend_contract_ui(object) {
        // var object = this.get_contract_items()[this.props.selected_contract_item]
        this.props.open_extend_contract_ui(object)
    }

    open_exit_contract_ui(object) {
        // var object = this.get_contract_items()[this.props.selected_contract_item]
        this.props.open_exit_contract_ui(object)
    }

    open_new_proposal_ui(object) {
        // var object = this.get_contract_items()[this.props.selected_contract_item]
        this.props.open_new_proposal_ui(object)
    }

    open_modify_contract_ui(object) {
        // var object = this.get_contract_items()[this.props.selected_contract_item]
        this.props.open_modify_contract_ui(object)
    }

    open_force_exit_ui(object) {
        // var object = this.get_contract_items()[this.props.selected_contract_item]
        this.props.open_force_exit_ui(object)
    }

    open_archive_contract_ui(object) {
        // var object = this.get_contract_items()[this.props.selected_contract_item]
        this.props.open_archive_proposal_ui(object)
    }

    open_moderator_ui(object) {
        // var object = this.get_contract_items()[this.props.selected_contract_item]
        this.props.open_moderator_ui(object)
    }

    show_contract_balance(item, object) {
        // var object = this.get_contract_items()[this.props.selected_contract_item]
        var expiry_time_in_seconds = object['entry_expiry']
        var time_to_expiry = expiry_time_in_seconds - Math.floor(new Date() / 1000);

        if (time_to_expiry > 0) {
            return (
                <div>
                    {this.render_detail_item('0')}
                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }}>
                        {this.render_detail_item('2', item['end_balance'])}
                    </div>

                    <div style={{ height: 10 }} />
                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }}>
                        {this.render_detail_item('2', item['spend_balance'])}
                    </div>
                </div>
            )
        }
    }


    get_contract_details_data(object) {
        // var object = this.get_contract_items()[this.props.selected_contract_item]
        var tags = object['ipfs'] == null ? [object['e5'], 'Contract'] : [object['e5']].concat(object['ipfs'].entered_indexing_tags)
        var title = object['ipfs'] == null ? 'Contract ID' : object['ipfs'].entered_title_text
        var age = object['event'] == null ? 0 : object['event'].returnValues.p5
        var contract_config = object['data'][1]
        var auto_wait = contract_config[8] == 0 ? 'false' : 'true'
        var can_modify_contract_as_moderator = contract_config[28] == 0 ? 'false' : 'true'
        var can_extend_enter_contract_at_any_time = contract_config[29] == 0 ? 'false' : 'true'
        var bounty_limit_type = contract_config[37] == 0 ? 'relative' : 'absolute'
        var contract_force_exit_enabled = contract_config[38] == 0 ? 'disabled' : 'enabled'
        return {
            'tags': { 'active_tags': tags, 'index_option': 'indexed' },
            'id': { 'title': object['id'], 'details': title, 'size': 'l' },
            'age': { 'style': 'l', 'title': 'Block ID', 'subtitle': '??', 'barwidth': this.get_number_width(age), 'number': `${number_with_commas(age)}`, 'barcolor': '', 'relativepower': 'block', },

            'default_vote_bounty_split_proportion': { 'title': this.format_proportion(contract_config[1]), 'details': 'Vote Bounty Split Proportion', 'size': 'l' },

            'default_minimum_end_vote_bounty_amount': { 'style': 'l', 'title': 'Minimum End Bounty Amount', 'subtitle': this.format_power_figure(contract_config[4]), 'barwidth': this.calculate_bar_width(contract_config[4]), 'number': this.format_account_balance_figure(contract_config[4]), 'relativepower': 'tokens' },

            'default_minimum_spend_vote_bounty_amount': { 'style': 'l', 'title': 'Minimum Spend Bounty Amount', 'subtitle': this.format_power_figure(contract_config[10]), 'barwidth': this.calculate_bar_width(contract_config[10]), 'number': this.format_account_balance_figure(contract_config[10]), 'relativepower': 'tokens' },

            'default_proposal_expiry_duration_limit': { 'title': this.get_time_diff(contract_config[5]), 'details': 'Proposal Expiry Duration Limit', 'size': 'l' },

            'max_enter_contract_duration': { 'title': this.get_time_diff(contract_config[6]), 'details': 'Max Enter Contract Duration', 'size': 'l' },

            'auto_wait_for_all_proposals_for_all_voters': { 'title': auto_wait, 'details': 'Auto Wait For All Proposals For All Voters', 'size': 'l' },

            'proposal_modify_expiry_duration_limit': { 'title': this.get_time_diff(contract_config[27]), 'details': 'Proposal Modify Expiry Duration Limit', 'size': 'l' },

            'can_modify_contract_as_moderator': { 'title': can_modify_contract_as_moderator, 'details': 'Can Modify Contract As Moderator', 'size': 'l' },

            'can_extend_enter_contract_at_any_time': { 'title': can_extend_enter_contract_at_any_time, 'details': 'Can Extend Enter Contract At Any Time', 'size': 'l' },

            'maximum_proposal_expiry_submit_expiry_time_difference': { 'title': this.get_time_diff(contract_config[36]), 'details': 'Maximum Proposal Expiry Submit Expiry Time Difference', 'size': 'l' },

            'bounty_limit_type': { 'title': bounty_limit_type, 'details': 'Bounty Limit Type', 'size': 'l' },

            'contract_force_exit_enabled': { 'title': contract_force_exit_enabled, 'details': 'Contract Force Exit', 'size': 'l' },

            'entry_fees': { 'title': 'Entry Fees', 'details': object['data'][2].length + ' tokens used', 'size': 'l' },

            'end_balance': { 'style': 'l', 'title': 'End Bounty Balance', 'subtitle': this.format_power_figure(object['end_balance']), 'barwidth': this.get_number_width(object['end_balance']), 'number': `${number_with_commas(object['end_balance'])}`, 'barcolor': '', 'relativepower': `END`, },

            'spend_balance': { 'style': 'l', 'title': 'Spend Bounty Balance', 'subtitle': this.format_power_figure(object['spend_balance']), 'barwidth': this.get_number_width(object['spend_balance']), 'number': ` ${number_with_commas(object['spend_balance'])}`, 'barcolor': '', 'relativepower': `SPEND`, },
        }
    }


    get_contract_items() {
        return this.props.get_contract_items()
    }

    render_buy_token_uis(buy_tokens, buy_amounts, buy_depths) {
        var bt = [].concat(buy_tokens)
        return (
            <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 0px 5px 0px', 'border-radius': '8px' }}>
                <ul style={{ 'padding': '0px 0px 0px 0px', 'margin': '0px' }}>
                    {bt.map((item, index) => (
                        <li style={{ 'padding': '1px' }}>
                            {this.render_detail_item('2', { 'style': 'l', 'title': 'Token ID: ' + item, 'subtitle': 'depth:' + buy_depths[index], 'barwidth': this.calculate_bar_width(buy_amounts[index]), 'number': this.format_account_balance_figure(buy_amounts[index]), 'relativepower': this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item] })}
                        </li>
                    ))}
                </ul>
            </div>

        )
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











    render_create_proposal_logs(object) {
        var he = this.props.height - 45
        // var object = this.get_contract_items()[this.props.selected_contract_item]
        return (
            <div style={{ 'background-color': 'transparent', 'border-radius': '15px', 'margin': '0px 0px 0px 0px', 'padding': '0px 0px 0px 0px', 'max-width': '470px' }}>
                <div style={{ 'overflow-y': 'auto', height: he, padding: '5px 0px 5px 0px' }}>
                    <div style={{ padding: '5px 5px 5px 5px' }}>
                        {this.render_detail_item('3', { 'title': 'In Contract ' + object['id'], 'details': 'Created Proposal Events', 'size': 'l' })}
                    </div>
                    <div style={{ height: '1px', 'background-color': '#C1C1C1', 'margin': '10px 20px 10px 20px' }} />
                    {this.render_created_proposal_item_logs(object)}
                </div>
            </div>
        )
    }


    render_created_proposal_item_logs(object) {
        var middle = this.props.height - 120;
        var items = [].concat(this.get_item_logs(object, 'make_proposal'))
        if (items.length == 0) {
            items = [0, 1]
            return (
                <div>
                    <div style={{ overflow: 'auto', maxHeight: middle }}>
                        <ul style={{ 'padding': '0px 0px 0px 0px' }}>
                            {items.map((item, index) => (
                                <li style={{ 'padding': '2px 5px 2px 5px' }} onClick={() => console.log()}>
                                    <div style={{ height: 60, width: '100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px', 'padding': '10px 0px 10px 10px', 'max-width': '420px', 'display': 'flex', 'align-items': 'center', 'justify-content': 'center' }}>
                                        <div style={{ 'margin': '10px 20px 10px 0px' }}>
                                            <img src={Letter} style={{ height: 30, width: 'auto' }} />
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )
        } else {
            return (
                <div style={{ overflow: 'auto', maxHeight: middle, 'display': 'flex', 'flex-direction': 'column-reverse' }}>
                    <ul style={{ 'padding': '0px 0px 0px 0px' }}>
                        {items.map((item, index) => (
                            <li style={{ 'padding': '2px 5px 2px 5px' }}>
                                <div key={index} onClick={() => this.when_proposal_item_clicked(index)}>
                                    {this.render_created_proposal_event_item(item, object, index)}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
    }

    when_proposal_item_clicked(index) {
        if (this.state.selected_proposal_event_item == index) {
            this.setState({ selected_proposal_event_item: null })
        } else {
            this.setState({ selected_proposal_event_item: index })
        }
    }


    get_item_logs(object, event) {
        if (this.props.app_state.contract_events[object['id']] == null) {
            return []
        }
        return this.props.app_state.contract_events[object['id']][event]
    }


    render_created_proposal_event_item(item, object, index) {
        if (this.state.selected_proposal_event_item == index) {
            return (
                <div>
                    {this.render_detail_item('3', { 'title': this.get_consensus_type(item.returnValues.p3), 'details': 'Consensus Type', 'size': 's' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': this.get_sender_title_text(item.returnValues.p4, object), 'details': 'Proposer Account ID', 'size': 's' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': item.returnValues.p2, 'details': 'Proposal ID', 'size': 's' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': this.get_time_difference(item.returnValues.p5), 'details': 'Age', 'size': 's' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': item.returnValues.p6, 'details': 'Block Number', 'size': 's' })}
                    <div style={{ height: '1px', 'background-color': '#C1C1C1', 'margin': '10px 20px 10px 20px' }} />
                </div>
            )
        } else {
            return (
                <div>
                    {this.render_detail_item('3', { 'title': item.returnValues.p2, 'details': 'Proposal ID', 'size': 's' })}
                    <div style={{ height: 2 }} />
                </div>
            )
        }
    }

    get_consensus_type(type) {
        var obj = { '0': 'Spend Proposal', '1': 'Reconfig Proposal', '6': 'Exchange-Transfer' }
        return obj[type]
    }


    get_sender_title_text(sender, object) {
        if (sender == this.props.app_state.user_account_id[object['e5']]) {
            return 'You'
        } else {
            var alias = (this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[sender] == null ? sender : this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[sender])
            return alias
        }
    }

    get_all_sorted_objects_mappings(object) {
        var all_objects = {}
        for (var i = 0; i < this.props.app_state.e5s['data'].length; i++) {
            var e5 = this.props.app_state.e5s['data'][i]
            var e5_objects = object[e5]
            var all_objects_clone = structuredClone(all_objects)
            all_objects = { ...all_objects_clone, ...e5_objects }
        }

        return all_objects
    }










    render_modify_contract_logs(object) {
        var he = this.props.height - 45
        // var object = this.get_contract_items()[this.props.selected_contract_item]
        return (
            <div style={{ 'background-color': 'transparent', 'border-radius': '15px', 'margin': '0px 0px 0px 0px', 'padding': '0px 0px 0px 0px', 'max-width': '470px' }}>
                <div style={{ 'overflow-y': 'auto', height: he, padding: '5px 0px 5px 0px' }}>
                    <div style={{ padding: '5px 5px 5px 5px' }}>
                        {this.render_detail_item('3', { 'title': 'In Contract ' + object['id'], 'details': 'Modify Proposal Events', 'size': 'l' })}
                    </div>
                    <div style={{ height: '1px', 'background-color': '#C1C1C1', 'margin': '10px 20px 10px 20px' }} />
                    {this.render_modify_contract_item_logs(object)}
                </div>
            </div>
        )
    }


    render_modify_contract_item_logs(object) {
        var middle = this.props.height - 120;
        var items = [].concat(this.get_item_logs(object, 'modify_object'))
        if (items.length == 0) {
            items = [0, 1]
            return (
                <div>
                    <div style={{ overflow: 'auto', maxHeight: middle }}>
                        <ul style={{ 'padding': '0px 0px 0px 0px' }}>
                            {items.map((item, index) => (
                                <li style={{ 'padding': '2px 5px 2px 5px' }} onClick={() => console.log()}>
                                    <div style={{ height: 60, width: '100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px', 'padding': '10px 0px 10px 10px', 'max-width': '420px', 'display': 'flex', 'align-items': 'center', 'justify-content': 'center' }}>
                                        <div style={{ 'margin': '10px 20px 10px 0px' }}>
                                            <img src={Letter} style={{ height: 30, width: 'auto' }} />
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )
        } else {
            return (
                <div style={{ overflow: 'auto', maxHeight: middle, 'display': 'flex', 'flex-direction': 'column-reverse' }}>
                    <ul style={{ 'padding': '0px 0px 0px 0px' }}>
                        {items.map((item, index) => (
                            <li style={{ 'padding': '2px 5px 2px 5px' }}>
                                <div key={index} onClick={() => this.when_modify_item_clicked(index)}>
                                    {this.render_modified_contract_event_item(item, object, index)}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
    }


    when_modify_item_clicked(index) {
        if (this.state.selected_modify_event_item == index) {
            this.setState({ selected_modify_event_item: null })
        } else {
            this.setState({ selected_modify_event_item: index })
        }
    }

    render_modified_contract_event_item(item, object, index) {
        if (this.state.selected_modify_event_item == index) {
            return (
                <div>
                    {this.render_detail_item('3', { 'title': this.get_sender_title_text(item.returnValues.p2, object), 'details': 'Modifier', 'size': 's' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': this.get_target_identifier(item), 'details': 'Targeted Modify Item', 'size': 's' })}
                    <div style={{ height: 2 }} />
                    {this.get_value_ui(item)}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': this.get_time_difference(item.returnValues.p6), 'details': 'Age', 'size': 's' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': item.returnValues.p7, 'details': 'Block Number', 'size': 's' })}
                    <div style={{ height: '1px', 'background-color': '#C1C1C1', 'margin': '10px 20px 10px 20px' }} />
                </div>
            )
        } else {
            return (
                <div>
                    {this.render_detail_item('3', { 'title': this.get_target_identifier(item), 'details': 'Targeted Modify Item', 'size': 's' })}
                    <div style={{ height: 2 }} />
                </div>
            )
        }
    }

    get_target_identifier(item) {
        var obj = this.get_contract_modify_details()

        var target_array_pos = item.returnValues.p3
        var target_array_item = item.returnValues.p4
        var selected_key = ''
        for (let key in obj) {
            if (obj[key]['position'][0] == target_array_pos && obj[key]['position'][1] == target_array_item) {
                selected_key = key
                break;
            }
        }

        return selected_key
    }


    get_value_ui(item) {
        var identifier = this.get_target_identifier(item)
        var type = this.get_contract_modify_details()[identifier]['picker']
        var number = item.returnValues.p5

        if (type == 'proportion') {
            return (
                <div>
                    {this.render_detail_item('3', { 'title': this.format_proportion(number), 'details': 'proportion', 'size': 'l' })}
                </div>
            )
        }
        else if (type == 'time') {
            return (
                <div>
                    {this.render_detail_item('3', { 'title': this.get_time_diff(number), 'details': 'duration', 'size': 'l' })}
                </div>
            )
        }
        else if (type == 'number') {
            return (
                <div>
                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }}>
                        {this.render_detail_item('2', { 'style': 'l', 'title': identifier, 'subtitle': this.format_power_figure(number), 'barwidth': this.calculate_bar_width(number), 'number': this.format_account_balance_figure(number), 'barcolor': '', 'relativepower': 'units', })}
                    </div>
                </div>
            )
        }
        else if (type == 'tag') {
            return (
                <div>
                    {this.render_detail_item('3', { 'title': this.get_tag_selected_item(identifier, number), 'details': 'value: ' + number, 'size': 'l' })}
                </div>
            )
        }
        else if (type == 'id') {
            return (
                <div>
                    {this.render_detail_item('3', { 'title': number, 'details': 'target ID', 'size': 'l' })}
                </div>
            )
        }
    }

    get_tag_selected_item(title, number) {
        var obj = { 'Auto Wait': { 0: 'no', 1: 'yes' }, 'Moderator Modify Privelage': { 1: 'modifiable', 0: 'non-modifiable' }, 'Unlimited Extend Contract Time': { 1: 'enabled', 0: 'disabled' }, 'Bounty Limit Type': { 0: 'relative', 1: 'absolute' }, 'Force Exit Enabled': { 1: 'enabled', 0: 'disabled' }, 'Halving type': { 0: 'fixed', 1: 'spread' }, 'Block Limit Sensitivity': { 1: '1', 2: '2', 3: '3', 4: '4', 5: '5' } }

        return obj[title][number]
    }

    get_contract_modify_details() {
        var obj = {
            'Vote Bounty Split Proportion': { 'position': [1, 1], 'picker': 'proportion', 'powerlimit': 9 },
            'Maximum Extend Enter Contract Limit': { 'position': [1, 2], 'picker': 'time', 'powerlimit': 63 },
            'Minimum End Bounty Amount': { 'position': [1, 4], 'picker': 'number', 'powerlimit': 63 },
            'Proposal Expiry Duration Limit': { 'position': [1, 5], 'picker': 'time', 'powerlimit': 63 },
            'Maximum Enter Contract Duration': { 'position': [1, 6], 'picker': 'time', 'powerlimit': 63 },
            'Auto Wait': { 'position': [1, 8], 'picker': 'tag', 'powerlimit': 63 },
            'Proposal Modify Expiry Duration Limit': { 'position': [1, 27], 'picker': 'time', 'powerlimit': 63 },
            'Moderator Modify Privelage': { 'position': [1, 28], 'picker': 'tag', 'powerlimit': 9 },
            'Unlimited Extend Contract Time': { 'position': [1, 29], 'picker': 'tag', 'powerlimit': 9 },
            'Maximum Proposal Expiry Submit Expiry time difference': { 'position': [1, 36], 'picker': 'time', 'powerlimit': 63 },
            'Bounty Limit Type': { 'position': [1, 37], 'picker': 'tag', 'powerlimit': 9 },
            'Force Exit Enabled': { 'position': [1, 38], 'picker': 'tag', 'powerlimit': 9 },
            'Minimum Spend Bounty Amount': { 'position': [1, 10], 'picker': 'number', 'powerlimit': 63 },
        }
        return obj
    }










    render_enter_contract_logs(object) {
        var he = this.props.height - 45
        // var object = this.get_contract_items()[this.props.selected_contract_item]
        return (
            <div style={{ 'background-color': 'transparent', 'border-radius': '15px', 'margin': '0px 0px 0px 0px', 'padding': '0px 0px 0px 0px', 'max-width': '470px' }}>
                <div style={{ 'overflow-y': 'auto', height: he, padding: '5px 0px 5px 0px' }}>
                    <div style={{ padding: '5px 5px 5px 5px' }}>
                        {this.render_detail_item('3', { 'title': 'In Contract ' + object['id'], 'details': 'Enter Contract Events', 'size': 'l' })}
                    </div>
                    <div style={{margin:'5px 10px 0px 10px'}}>
                        <TextInput height={20} placeholder={'Search account ID...'} when_text_input_field_changed={this.when_enter_contract_search_text_input_field_changed.bind(this)} text={this.state.enter_contract_search_text} theme={this.props.theme}/>
                    </div>
                    
                    <div style={{ height: '1px', 'background-color': '#C1C1C1', 'margin': '10px 20px 10px 20px' }} />
                    {this.render_entered_contract_item_logs(object)}
                </div>
            </div>
        )
    }

    when_enter_contract_search_text_input_field_changed(text){
        this.setState({enter_contract_search_text: text})
    }

    //inefficient
    filter_enter_contract_event_logs(logs, typed_id, object){
        var results = []
        if(typed_id == '') return logs;
        logs.forEach(log => {
            if(log.returnValues.p2.includes(typed_id.trim()) || this.get_sender_title_text(log.returnValues.p2, object).includes(typed_id.trim())){
                results.push(log)
            }
        });
        return results
    }


    render_entered_contract_item_logs(object) {
        var middle = this.props.height - 120;
        var items = [].concat(this.filter_enter_contract_event_logs(this.get_item_logs(object, 'enter_contract'), this.state.enter_contract_search_text, object))
        if (items.length == 0) {
            items = [0, 1]
            return (
                <div>
                    <div style={{ overflow: 'auto', maxHeight: middle }}>
                        <ul style={{ 'padding': '0px 0px 0px 0px' }}>
                            {items.map((item, index) => (
                                <li style={{ 'padding': '2px 5px 2px 5px' }} onClick={() => console.log()}>
                                    <div style={{ height: 60, width: '100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px', 'padding': '10px 0px 10px 10px', 'max-width': '420px', 'display': 'flex', 'align-items': 'center', 'justify-content': 'center' }}>
                                        <div style={{ 'margin': '10px 20px 10px 0px' }}>
                                            <img src={Letter} style={{ height: 30, width: 'auto' }} />
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )
        } else {
            return (
                <div style={{ overflow: 'auto', maxHeight: middle, 'display': 'flex', 'flex-direction': 'column-reverse' }}>
                    <ul style={{ 'padding': '0px 0px 0px 0px' }}>
                        {items.map((item, index) => (
                            <li style={{ 'padding': '2px 5px 2px 5px' }}>
                                <div key={index} onClick={() => this.when_entered_contract_item_clicked(index)}>
                                    {this.render_enter_contract_event_item(item, object, index)}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
    }

    when_entered_contract_item_clicked(index) {
        if (this.state.selected_enter_contract_event_item == index) {
            this.setState({ selected_enter_contract_event_item: null })
        } else {
            this.setState({ selected_enter_contract_event_item: index })
        }
    }

    render_enter_contract_event_item(item, object, index) {
        if (this.state.selected_enter_contract_event_item == index) {
            return (
                <div>
                    {this.render_detail_item('3', { 'title': this.get_sender_title_text(item.returnValues.p2, object), 'details': 'Entering Account ID', 'size': 's' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': this.get_time_diff(item.returnValues.p4 - Date.now() / 1000), 'details': 'Entry Expiry', 'size': 's' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': this.get_time_difference(item.returnValues.p7), 'details': 'Age', 'size': 's' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': item.returnValues.p6, 'details': 'Block Number', 'size': 's' })}
                    <div style={{ height: '1px', 'background-color': '#C1C1C1', 'margin': '10px 20px 10px 20px' }} />
                </div>
            )
        } else {
            return (
                <div>
                    {this.render_detail_item('3', { 'title': this.get_sender_title_text(item.returnValues.p2, object), 'details': 'Entering Account ID', 'size': 's' })}
                    <div style={{ height: 2 }} />
                </div>
            )
        }
    }












    render_extend_contract_logs(object) {
        var he = this.props.height - 45
        // var object = this.get_contract_items()[this.props.selected_contract_item]
        return (
            <div style={{ 'background-color': 'transparent', 'border-radius': '15px', 'margin': '0px 0px 0px 0px', 'padding': '0px 0px 0px 0px', 'max-width': '470px' }}>
                <div style={{ 'overflow-y': 'auto', height: he, padding: '5px 0px 5px 0px' }}>
                    <div style={{ padding: '5px 5px 5px 5px' }}>
                        {this.render_detail_item('3', { 'title': 'In Contract ' + object['id'], 'details': 'Extend Contract Stay Events', 'size': 'l' })}
                    </div>
                    <div style={{ height: '1px', 'background-color': '#C1C1C1', 'margin': '10px 20px 10px 20px' }} />
                    {this.render_extend_contract_item_logs(object)}
                </div>
            </div>
        )
    }

    render_extend_contract_item_logs(object) {
        var middle = this.props.height - 120;
        var items = [].concat(this.get_item_logs(object, 'extend_contract'))
        if (items.length == 0) {
            items = [0, 1]
            return (
                <div>
                    <div style={{ overflow: 'auto', maxHeight: middle }}>
                        <ul style={{ 'padding': '0px 0px 0px 0px' }}>
                            {items.map((item, index) => (
                                <li style={{ 'padding': '2px 5px 2px 5px' }} onClick={() => console.log()}>
                                    <div style={{ height: 60, width: '100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px', 'padding': '10px 0px 10px 10px', 'max-width': '420px', 'display': 'flex', 'align-items': 'center', 'justify-content': 'center' }}>
                                        <div style={{ 'margin': '10px 20px 10px 0px' }}>
                                            <img src={Letter} style={{ height: 30, width: 'auto' }} />
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )
        } else {
            return (
                <div style={{ overflow: 'auto', maxHeight: middle, 'display': 'flex', 'flex-direction': 'column-reverse' }}>
                    <ul style={{ 'padding': '0px 0px 0px 0px' }}>
                        {items.map((item, index) => (
                            <li style={{ 'padding': '2px 5px 2px 5px' }}>
                                <div key={index} onClick={() => this.when_extend_contract_item_clicked(index)}>
                                    {this.render_extend_contract_event_item(item, object, index)}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
    }

    when_extend_contract_item_clicked(index) {
        if (this.state.selected_extend_contract_event_item == index) {
            this.setState({ selected_extend_contract_event_item: null })
        } else {
            this.setState({ selected_extend_contract_event_item: index })
        }
    }

    render_extend_contract_event_item(item, object, index) {
        if (this.state.selected_extend_contract_event_item == index) {
            return (
                <div>
                    {this.render_detail_item('3', { 'title': this.get_sender_title_text(item.returnValues.p2, object), 'details': 'Extending Account ID', 'size': 's' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': this.get_time_diff(item.returnValues.p4 - Date.now() / 1000), 'details': 'Entry Expiry', 'size': 's' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': this.get_time_difference(item.returnValues.p7), 'details': 'Age', 'size': 's' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': item.returnValues.p6, 'details': 'Block Number', 'size': 's' })}
                    <div style={{ height: '1px', 'background-color': '#C1C1C1', 'margin': '10px 20px 10px 20px' }} />
                </div>
            )
        } else {
            return (
                <div>
                    {this.render_detail_item('3', { 'title': this.get_sender_title_text(item.returnValues.p4, object), 'details': 'Extending Account ID', 'size': 's' })}
                    <div style={{ height: 2 }} />
                </div>
            )
        }
    }













    render_exit_contract_logs(object) {
        var he = this.props.height - 45
        // var object = this.get_contract_items()[this.props.selected_contract_item]
        return (
            <div style={{ 'background-color': 'transparent', 'border-radius': '15px', 'margin': '0px 0px 0px 0px', 'padding': '0px 0px 0px 0px', 'max-width': '470px' }}>
                <div style={{ 'overflow-y': 'auto', height: he, padding: '5px 0px 5px 0px' }}>
                    <div style={{ padding: '5px 5px 5px 5px' }}>
                        {this.render_detail_item('3', { 'title': 'In Contract ' + object['id'], 'details': 'Exit Contract Events', 'size': 'l' })}
                    </div>
                    <div style={{margin:'5px 10px 0px 10px'}}>
                        <TextInput height={20} placeholder={'Search account ID...'} when_text_input_field_changed={this.when_exit_contract_search_text_input_field_changed.bind(this)} text={this.state.exit_contract_search_text} theme={this.props.theme}/>
                    </div>
                    <div style={{ height: '1px', 'background-color': '#C1C1C1', 'margin': '10px 20px 10px 20px' }} />
                    {this.render_exit_contract_item_logs(object)}
                </div>
            </div>
        )
    }

    when_exit_contract_search_text_input_field_changed(text){
        this.setState({exit_contract_search_text: text})
    }

    //inefficient
    filter_exit_contract_event_logs(logs, typed_id, object){
        var results = []
        if(typed_id == '') return logs;
        logs.forEach(log => {
            if(log.returnValues.p2.includes(typed_id.trim()) || this.get_sender_title_text(log.returnValues.p2, object).includes(typed_id.trim())){
                results.push(log)
            }
        });
        return results
    }


    render_exit_contract_item_logs(object) {
        var middle = this.props.height - 120;
        var items = [].concat(this.filter_exit_contract_event_logs(this.get_item_logs(object, 'exit_contract'), this.state.exit_contract_search_text, object))
        if (items.length == 0) {
            items = [0, 1]
            return (
                <div>
                    <div style={{ overflow: 'auto', maxHeight: middle }}>
                        <ul style={{ 'padding': '0px 0px 0px 0px' }}>
                            {items.map((item, index) => (
                                <li style={{ 'padding': '2px 5px 2px 5px' }} onClick={() => console.log()}>
                                    <div style={{ height: 60, width: '100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px', 'padding': '10px 0px 10px 10px', 'max-width': '420px', 'display': 'flex', 'align-items': 'center', 'justify-content': 'center' }}>
                                        <div style={{ 'margin': '10px 20px 10px 0px' }}>
                                            <img src={Letter} style={{ height: 30, width: 'auto' }} />
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )
        } else {
            return (
                <div style={{ overflow: 'auto', maxHeight: middle, 'display': 'flex', 'flex-direction': 'column-reverse' }}>
                    <ul style={{ 'padding': '0px 0px 0px 0px' }}>
                        {items.map((item, index) => (
                            <li style={{ 'padding': '2px 5px 2px 5px' }}>
                                <div key={index} onClick={() => this.when_exit_contract_item_clicked(index)}>
                                    {this.render_exit_contract_event_item(item, object, index)}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
    }


    when_exit_contract_item_clicked(index) {
        if (this.state.selected_exit_contract_event_item == index) {
            this.setState({ selected_exit_contract_event_item: null })
        } else {
            this.setState({ selected_exit_contract_event_item: index })
        }
    }

    render_exit_contract_event_item(item, object, index) {
        if (this.state.selected_exit_contract_event_item == index) {
            return (
                <div>
                    {this.render_detail_item('3', { 'title': this.get_sender_title_text(item.returnValues.p2, object), 'details': 'Exiting Account ID', 'size': 's' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': this.get_time_difference(item.returnValues.p7), 'details': 'Age', 'size': 's' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': item.returnValues.p6, 'details': 'Block Number', 'size': 's' })}
                    <div style={{ height: '1px', 'background-color': '#C1C1C1', 'margin': '10px 20px 10px 20px' }} />
                </div>
            )
        } else {
            return (
                <div>
                    {this.render_detail_item('3', { 'title': this.get_sender_title_text(item.returnValues.p2, object), 'details': 'Exiting Account ID', 'size': 's' })}
                    <div style={{ height: 2 }} />
                </div>
            )
        }
    }














    force_exit_accounts_logs(object) {
        var he = this.props.height - 45
        // var object = this.get_contract_items()[this.props.selected_contract_item]
        return (
            <div style={{ 'background-color': 'transparent', 'border-radius': '15px', 'margin': '0px 0px 0px 0px', 'padding': '0px 0px 0px 0px', 'max-width': '470px' }}>
                <div style={{ 'overflow-y': 'auto', height: he, padding: '5px 0px 5px 0px' }}>
                    <div style={{ padding: '5px 5px 5px 5px' }}>
                        {this.render_detail_item('3', { 'title': 'In Contract ' + object['id'], 'details': 'Force Exit Contract Events', 'size': 'l' })}
                    </div>
                    <div style={{ height: '1px', 'background-color': '#C1C1C1', 'margin': '10px 20px 10px 20px' }} />
                    {this.render_force_exit_contract_item_logs(object)}
                </div>
            </div>
        )
    }

    render_force_exit_contract_item_logs(object) {
        var middle = this.props.height - 120;
        var items = [].concat(this.get_item_logs(object, 'force_exit'))
        if (items.length == 0) {
            items = [0, 1]
            return (
                <div>
                    <div style={{ overflow: 'auto', maxHeight: middle }}>
                        <ul style={{ 'padding': '0px 0px 0px 0px' }}>
                            {items.map((item, index) => (
                                <li style={{ 'padding': '2px 5px 2px 5px' }} onClick={() => console.log()}>
                                    <div style={{ height: 60, width: '100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px', 'padding': '10px 0px 10px 10px', 'max-width': '420px', 'display': 'flex', 'align-items': 'center', 'justify-content': 'center' }}>
                                        <div style={{ 'margin': '10px 20px 10px 0px' }}>
                                            <img src={Letter} style={{ height: 30, width: 'auto' }} />
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )
        } else {
            return (
                <div style={{ overflow: 'auto', maxHeight: middle, 'display': 'flex', 'flex-direction': 'column-reverse' }}>
                    <ul style={{ 'padding': '0px 0px 0px 0px' }}>
                        {items.map((item, index) => (
                            <li style={{ 'padding': '2px 5px 2px 5px' }}>
                                <div key={index} onClick={() => this.when_force_exit_contract_item_clicked(index)}>
                                    {this.render_force_exit_contract_event_item(item, object, index)}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
    }


    when_force_exit_contract_item_clicked(index) {
        if (this.state.selected_force_exit_contract_event_item == index) {
            this.setState({ selected_force_exit_contract_event_item: null })
        } else {
            this.setState({ selected_force_exit_contract_event_item: index })
        }
    }


    render_force_exit_contract_event_item(item, object, index) {
        if (this.state.selected_force_exit_contract_event_item == index) {
            return (
                <div>
                    {this.render_detail_item('3', { 'title': this.get_sender_title_text(item.returnValues.p2, object), 'details': 'Moderator Account ID', 'size': 's' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': this.get_sender_title_text(item.returnValues.p5, object), 'details': 'Exiting Account ID', 'size': 's' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': this.get_time_difference(item.returnValues.p7), 'details': 'Age', 'size': 's' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': item.returnValues.p6, 'details': 'Block Number', 'size': 's' })}
                    <div style={{ height: '1px', 'background-color': '#C1C1C1', 'margin': '10px 20px 10px 20px' }} />
                </div>
            )
        } else {
            return (
                <div>
                    {this.render_detail_item('3', { 'title': this.get_sender_title_text(item.returnValues.p5, object), 'details': 'Exiting Account ID', 'size': 's' })}
                    <div style={{ height: 2 }} />
                </div>
            )
        }
    }











    render_transfer_logs(object){
        var he = this.props.height - 45
        // var object = this.get_contract_items()[this.props.selected_contract_item]
        return (
            <div style={{ 'background-color': 'transparent', 'border-radius': '15px', 'margin': '0px 0px 0px 0px', 'padding': '0px 0px 0px 0px', 'max-width': '470px' }}>
                <div style={{ 'overflow-y': 'auto', height: he, padding: '5px 0px 5px 0px' }}>
                    <div style={{ padding: '5px 5px 5px 5px' }}>
                        {this.render_detail_item('3', { 'title': 'In Contract ' + object['id'], 'details': 'Contract Transfer Events', 'size': 'l' })}
                    </div>
                    <div style={{ height: '1px', 'background-color': '#C1C1C1', 'margin': '10px 20px 10px 20px' }} />
                    {this.render_contract_transfer_item_logs(object)}
                </div>
            </div>
        )
    }


    render_contract_transfer_item_logs(object){
        var middle = this.props.height - 120;
        var items = [].concat(this.get_item_logs(object, 'transfer'))
        if (items.length == 0) {
            items = [0, 1]
            return (
                <div>
                    <div style={{ overflow: 'auto', maxHeight: middle }}>
                        <ul style={{ 'padding': '0px 0px 0px 0px' }}>
                            {items.map((item, index) => (
                                <li style={{ 'padding': '2px 5px 2px 5px' }} onClick={() => console.log()}>
                                    <div style={{ height: 60, width: '100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px', 'padding': '10px 0px 10px 10px', 'max-width': '420px', 'display': 'flex', 'align-items': 'center', 'justify-content': 'center' }}>
                                        <div style={{ 'margin': '10px 20px 10px 0px' }}>
                                            <img src={Letter} style={{ height: 30, width: 'auto' }} />
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )
        } else {
            return (
                <div style={{ overflow: 'auto', maxHeight: middle, 'display': 'flex', 'flex-direction': 'column-reverse' }}>
                    <ul style={{ 'padding': '0px 0px 0px 0px' }}>
                        {items.map((item, index) => (
                            <li style={{ 'padding': '2px 5px 2px 5px' }}>
                                <div key={index} onClick={() => this.when_contract_transfer_item_clicked(index)}>
                                    {this.render_contract_transfer_event_item(item, object, index)}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
    }


    when_contract_transfer_item_clicked(index){
        if (this.state.selected_contract_transfer_event_item == index) {
            this.setState({ selected_contract_transfer_event_item: null })
        } else {
            this.setState({ selected_contract_transfer_event_item: index })
        }
    }


    render_contract_transfer_event_item(item, object, index){
        var exchange_id = item['event'].returnValues.p1;
        var number = item['event'].returnValues.p4
        var depth = item['event'].returnValues.p7
        var from_to = item['action'] == 'Sent' ? 'To: '+this.get_sender_title_text(item['event'].returnValues.p3, object) : 'From: '+this.get_sender_title_text(item['event'].returnValues.p2, object)
        if (this.state.selected_contract_transfer_event_item == index) {
            return (
                <div>
                    {this.render_detail_item('3', { 'title': from_to, 'details': 'Action: '+item['action'], 'size': 's' })}
                    <div style={{ height: 2 }} />

                    <div style={{ 'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }}>
                        {this.render_detail_item('2', { 'style': 'l', 'title': 'Token ID:  '+exchange_id+', depth: '+depth, 'subtitle': this.format_power_figure(number), 'barwidth': this.calculate_bar_width(number), 'number': this.format_account_balance_figure(number), 'barcolor': '', 'relativepower': this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[exchange_id], })}
                    </div>

                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': this.get_time_difference(item['event'].returnValues.p5), 'details': 'Age', 'size': 's' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': item['event'].returnValues.p6, 'details': 'Block Number', 'size': 's' })}
                    <div style={{ height: '1px', 'background-color': '#C1C1C1', 'margin': '10px 20px 10px 20px' }} />
                </div>
            )
        } else {
            return (
                <div>
                    {this.render_detail_item('3', { 'title': from_to, 'details': 'Action: '+item['action'], 'size': 's' })}
                    <div style={{ height: 2 }} />
                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }}>
                        {this.render_detail_item('2', { 'style': 'l', 'title': 'Token ID:  '+exchange_id+', depth: '+depth, 'subtitle': this.format_power_figure(number), 'barwidth': this.calculate_bar_width(number), 'number': this.format_account_balance_figure(number), 'barcolor': '', 'relativepower': this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[exchange_id], })}
                    </div>
                    <div style={{ height: '1px', 'background-color': '#C1C1C1', 'margin': '10px 20px 10px 20px' }} />
                </div>
            )
        }
    }














    render_modify_moderator_logs(object){
        var he = this.props.height - 45
        // var object = this.get_contract_items()[this.props.selected_contract_item]
        return (
            <div style={{ 'background-color': 'transparent', 'border-radius': '15px', 'margin': '0px 0px 0px 0px', 'padding': '0px 0px 0px 0px', 'max-width': '470px' }}>
                <div style={{ 'overflow-y': 'auto', height: he, padding: '5px 0px 5px 0px' }}>
                    <div style={{ padding: '5px 5px 5px 5px' }}>
                        {this.render_detail_item('3', { 'title': 'In Contract ' + object['id'], 'details': 'Contract Modify Moderator Events', 'size': 'l' })}
                    </div>
                    <div style={{ height: '1px', 'background-color': '#C1C1C1', 'margin': '10px 20px 10px 20px' }} />
                    {this.render_modify_moderator_item_logs(object)}
                </div>
            </div>
        )
    }

    get_moderator_item_logs(object, event){
        if (this.props.app_state.moderator_events[object['id']] == null) {
            return []
        }
        return this.props.app_state.moderator_events[object['id']][event]
    }


    render_modify_moderator_item_logs(object){
        var middle = this.props.height - 120;
        var items = [].concat(this.get_moderator_item_logs(object, 'modify_moderator'))
        if (items.length == 0) {
            items = [0, 1]
            return (
                <div>
                    <div style={{ overflow: 'auto', maxHeight: middle }}>
                        <ul style={{ 'padding': '0px 0px 0px 0px' }}>
                            {items.map((item, index) => (
                                <li style={{ 'padding': '2px 5px 2px 5px' }} onClick={() => console.log()}>
                                    <div style={{ height: 60, width: '100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px', 'padding': '10px 0px 10px 10px', 'max-width': '420px', 'display': 'flex', 'align-items': 'center', 'justify-content': 'center' }}>
                                        <div style={{ 'margin': '10px 20px 10px 0px' }}>
                                            <img src={Letter} style={{ height: 30, width: 'auto' }} />
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )
        } else {
            return (
                <div style={{ overflow: 'auto', maxHeight: middle, 'display': 'flex', 'flex-direction': 'column-reverse' }}>
                    <ul style={{ 'padding': '0px 0px 0px 0px' }}>
                        {items.map((item, index) => (
                            <li style={{ 'padding': '2px 5px 2px 5px' }}>
                                <div key={index} onClick={() => this.when_modify_moderator_item_clicked(index)}>
                                    {this.render_modify_moderator_event_item(item, object, index)}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
    }


    when_modify_moderator_item_clicked(index){
        if (this.state.selected_modify_moderator_event_item == index) {
            this.setState({ selected_modify_moderator_event_item: null })
        } else {
            this.setState({ selected_modify_moderator_event_item: index })
        }
    }


    render_modify_moderator_event_item(item, object, index){
        var authority_val_obj = {'0':'Not Moderator', '1':'Moderator'}
        var authority_val = authority_val_obj[item.returnValues.p6]
        if (this.state.selected_modify_moderator_event_item == index) {
            return (
                <div>
                    {this.render_detail_item('3', { 'title': this.get_sender_title_text(item.returnValues.p3, object), 'details': 'Targeted Account', 'size': 's' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': this.get_sender_title_text(item.returnValues.p4, object), 'details': 'Moderator Account', 'size': 's' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': authority_val, 'details': 'Authority value', 'size': 's' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': this.get_time_difference(item.returnValues.p7), 'details': 'Age', 'size': 's' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': item.returnValues.p8, 'details': 'Block Number', 'size': 's' })}
                    <div style={{ height: '1px', 'background-color': '#C1C1C1', 'margin': '10px 20px 10px 20px' }} />
                </div>
            )
        } else {
            return (
                <div>
                    {this.render_detail_item('3', { 'title': this.get_sender_title_text(item.returnValues.p3, object), 'details': 'Targeted Account', 'size': 's' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', {'title': authority_val, 'details': 'Authority value', 'size': 's' })}
                    <div style={{ height: '1px', 'background-color': '#C1C1C1', 'margin': '10px 20px 10px 20px' }} />
                </div>
            )
        }
    }














    render_interactable_checker_logs(object){
        var he = this.props.height - 45
        // var object = this.get_contract_items()[this.props.selected_contract_item]
        return (
            <div style={{ 'background-color': 'transparent', 'border-radius': '15px', 'margin': '0px 0px 0px 0px', 'padding': '0px 0px 0px 0px', 'max-width': '470px' }}>
                <div style={{ 'overflow-y': 'auto', height: he, padding: '5px 0px 5px 0px' }}>
                    <div style={{ padding: '5px 5px 5px 5px' }}>
                        {this.render_detail_item('3', { 'title': 'In Contract ' + object['id'], 'details': 'Contract Access Rights Settings Events', 'size': 'l' })}
                    </div>
                    <div style={{ height: '1px', 'background-color': '#C1C1C1', 'margin': '10px 20px 10px 20px' }} />
                    {this.render_interactable_checker_item_logs(object)}
                </div>
            </div>
        )
    }


    render_interactable_checker_item_logs(object){
        var middle = this.props.height - 120;
        var items = [].concat(this.get_moderator_item_logs(object, 'enable_interactible'))
        if (items.length == 0) {
            items = [0, 1]
            return (
                <div>
                    <div style={{ overflow: 'auto', maxHeight: middle }}>
                        <ul style={{ 'padding': '0px 0px 0px 0px' }}>
                            {items.map((item, index) => (
                                <li style={{ 'padding': '2px 5px 2px 5px' }} onClick={() => console.log()}>
                                    <div style={{ height: 60, width: '100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px', 'padding': '10px 0px 10px 10px', 'max-width': '420px', 'display': 'flex', 'align-items': 'center', 'justify-content': 'center' }}>
                                        <div style={{ 'margin': '10px 20px 10px 0px' }}>
                                            <img src={Letter} style={{ height: 30, width: 'auto' }} />
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )
        } else {
            return (
                <div style={{ overflow: 'auto', maxHeight: middle, 'display': 'flex', 'flex-direction': 'column-reverse' }}>
                    <ul style={{ 'padding': '0px 0px 0px 0px' }}>
                        {items.map((item, index) => (
                            <li style={{ 'padding': '2px 5px 2px 5px' }}>
                                <div key={index} onClick={() => this.when_interactable_checker_item_clicked(index)}>
                                    {this.render_interactable_checker_event_item(item, object, index)}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
    }


    when_interactable_checker_item_clicked(index){
        if (this.state.selected_interactable_checker_event_item == index) {
            this.setState({ selected_interactable_checker_event_item: null })
        } else {
            this.setState({ selected_interactable_checker_event_item: index })
        }
    }


    render_interactable_checker_event_item(item, object, index){
        var interactable_checker_obj = {'0':'Access Rights Disabled(Public)','1':'Access Rights Enabled(Private)'}
        var interactable_checker = interactable_checker_obj[item.returnValues.p6]
        if (this.state.selected_interactable_checker_event_item == index) {
            return (
                <div>
                    {this.render_detail_item('3', { 'title': interactable_checker, 'details': 'Access Rights Status', 'size': 's' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': this.get_sender_title_text(item.returnValues.p4, object), 'details': 'Moderator Account', 'size': 's' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': this.get_time_difference(item.returnValues.p7), 'details': 'Age', 'size': 's' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': item.returnValues.p8, 'details': 'Block Number', 'size': 's' })}
                    <div style={{ height: '1px', 'background-color': '#C1C1C1', 'margin': '10px 20px 10px 20px' }} />
                </div>
            )
        } else {
            return (
                <div>
                    {this.render_detail_item('3', { 'title': interactable_checker, 'details': 'Acces Rights Status', 'size': 's' })}
                    <div style={{ height: 2 }} />
                </div>
            )
        }
    }













    render_interactable_accounts_logs(object){
        var he = this.props.height - 45
        // var object = this.get_contract_items()[this.props.selected_contract_item]
        return (
            <div style={{ 'background-color': 'transparent', 'border-radius': '15px', 'margin': '0px 0px 0px 0px', 'padding': '0px 0px 0px 0px', 'max-width': '470px' }}>
                <div style={{ 'overflow-y': 'auto', height: he, padding: '5px 0px 5px 0px' }}>
                    <div style={{ padding: '5px 5px 5px 5px' }}>
                        {this.render_detail_item('3', { 'title': 'In Contract ' + object['id'], 'details': 'Contract  Account Access Settings Events', 'size': 'l' })}
                    </div>
                    <div style={{ height: '1px', 'background-color': '#C1C1C1', 'margin': '10px 20px 10px 20px' }} />
                    {this.render_interactable_accounts_item_logs(object)}
                </div>
            </div>
        )
    }


    render_interactable_accounts_item_logs(object){
        var middle = this.props.height - 120;
        var items = [].concat(this.get_moderator_item_logs(object, 'add_interactible'))
        if (items.length == 0) {
            items = [0, 1]
            return (
                <div>
                    <div style={{ overflow: 'auto', maxHeight: middle }}>
                        <ul style={{ 'padding': '0px 0px 0px 0px' }}>
                            {items.map((item, index) => (
                                <li style={{ 'padding': '2px 5px 2px 5px' }} onClick={() => console.log()}>
                                    <div style={{ height: 60, width: '100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px', 'padding': '10px 0px 10px 10px', 'max-width': '420px', 'display': 'flex', 'align-items': 'center', 'justify-content': 'center' }}>
                                        <div style={{ 'margin': '10px 20px 10px 0px' }}>
                                            <img src={Letter} style={{ height: 30, width: 'auto' }} />
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )
        } else {
            return (
                <div style={{ overflow: 'auto', maxHeight: middle, 'display': 'flex', 'flex-direction': 'column-reverse' }}>
                    <ul style={{ 'padding': '0px 0px 0px 0px' }}>
                        {items.map((item, index) => (
                            <li style={{ 'padding': '2px 5px 2px 5px' }}>
                                <div key={index} onClick={() => this.when_interactable_account_item_clicked(index)}>
                                    {this.render_interactable_account_event_item(item, object, index)}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
    }


    when_interactable_account_item_clicked(index){
        if (this.state.selected_interactable_account_event_item == index) {
            this.setState({ selected_interactable_account_event_item: null })
        } else {
            this.setState({ selected_interactable_account_event_item: index })
        }
    }


    render_interactable_account_event_item(item, object, index){
        if (this.state.selected_interactable_account_event_item == index) {
            return (
                <div>
                    {this.render_detail_item('3', { 'title': this.get_sender_title_text(item.returnValues.p3, object), 'details': 'Targeted Account', 'size': 's' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': this.get_sender_title_text(item.returnValues.p4, object), 'details': 'Moderator Account', 'size': 's' })}
                    <div style={{ height: 2 }} />

                    {this.render_detail_item('3', { 'title': this.get_future_time_difference(item.returnValues.p6), 'details': 'Until: '+(new Date(item.returnValues.p6*1000)), 'size': 's' })}
                    
                    {this.render_detail_item('3', { 'title': this.get_time_difference(item.returnValues.p7), 'details': 'Age', 'size': 's' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': item.returnValues.p8, 'details': 'Block Number', 'size': 's' })}
                    <div style={{ height: '1px', 'background-color': '#C1C1C1', 'margin': '10px 20px 10px 20px' }} />
                </div>
            )
        } else {
            return (
                <div>
                    {this.render_detail_item('3', { 'title': this.get_sender_title_text(item.returnValues.p3, object), 'details': 'Targeted Account', 'size': 's' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': this.get_future_time_difference(item.returnValues.p6), 'details': 'Until: '+(new Date(item.returnValues.p6*1000)), 'size': 's' })}
                    <div style={{ height: '1px', 'background-color': '#C1C1C1', 'margin': '10px 20px 10px 20px' }} />
                </div>
            )
        }
    }


















    render_blocked_accounts_logs(object){
        var he = this.props.height - 45
        // var object = this.get_contract_items()[this.props.selected_contract_item]
        return (
            <div style={{ 'background-color': 'transparent', 'border-radius': '15px', 'margin': '0px 0px 0px 0px', 'padding': '0px 0px 0px 0px', 'max-width': '470px' }}>
                <div style={{ 'overflow-y': 'auto', height: he, padding: '5px 0px 5px 0px' }}>
                    <div style={{ padding: '5px 5px 5px 5px' }}>
                        {this.render_detail_item('3', { 'title': 'In Contract ' + object['id'], 'details': 'Contract  Blocked Account Events', 'size': 'l' })}
                    </div>
                    <div style={{ height: '1px', 'background-color': '#C1C1C1', 'margin': '10px 20px 10px 20px' }} />
                    {this.render_blocked_accounts_item_logs(object)}
                </div>
            </div>
        )
    }

    render_blocked_accounts_item_logs(object){
        var middle = this.props.height - 120;
        var items = [].concat(this.get_moderator_item_logs(object, 'block_account'))
        if (items.length == 0) {
            items = [0, 1]
            return (
                <div>
                    <div style={{ overflow: 'auto', maxHeight: middle }}>
                        <ul style={{ 'padding': '0px 0px 0px 0px' }}>
                            {items.map((item, index) => (
                                <li style={{ 'padding': '2px 5px 2px 5px' }} onClick={() => console.log()}>
                                    <div style={{ height: 60, width: '100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px', 'padding': '10px 0px 10px 10px', 'max-width': '420px', 'display': 'flex', 'align-items': 'center', 'justify-content': 'center' }}>
                                        <div style={{ 'margin': '10px 20px 10px 0px' }}>
                                            <img src={Letter} style={{ height: 30, width: 'auto' }} />
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )
        } else {
            return (
                <div style={{ overflow: 'auto', maxHeight: middle, 'display': 'flex', 'flex-direction': 'column-reverse' }}>
                    <ul style={{ 'padding': '0px 0px 0px 0px' }}>
                        {items.map((item, index) => (
                            <li style={{ 'padding': '2px 5px 2px 5px' }}>
                                <div key={index} onClick={() => this.when_blocked_account_item_clicked(index)}>
                                    {this.render_blocked_account_event_item(item, object, index)}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
    }


    when_blocked_account_item_clicked(index){
        if (this.state.selected_blocked_account_event_item == index) {
            this.setState({ selected_blocked_account_event_item: null })
        } else {
            this.setState({ selected_blocked_account_event_item: index })
        }
    }


    render_blocked_account_event_item(item, object, index){
        if (this.state.selected_blocked_account_event_item == index) {
            return (
                <div>
                    {this.render_detail_item('3', { 'title': this.get_sender_title_text(item.returnValues.p3, object), 'details': 'Targeted Account', 'size': 's' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': this.get_sender_title_text(item.returnValues.p4, object), 'details': 'Moderator Account', 'size': 's' })}
                    <div style={{ height: 2 }} />

                    {this.render_detail_item('3', { 'title': this.get_future_time_difference(item.returnValues.p6), 'details': 'Until: '+(new Date(item.returnValues.p6*1000)), 'size': 's' })}
                    
                    {this.render_detail_item('3', { 'title': this.get_time_difference(item.returnValues.p7), 'details': 'Age', 'size': 's' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': item.returnValues.p8, 'details': 'Block Number', 'size': 's' })}
                    <div style={{ height: '1px', 'background-color': '#C1C1C1', 'margin': '10px 20px 10px 20px' }} />
                </div>
            )
        } else {
            return (
                <div>
                    {this.render_detail_item('3', { 'title': this.get_sender_title_text(item.returnValues.p3, object), 'details': 'Targeted Account', 'size': 's' })}
                    <div style={{ height: 2 }} />

                    {this.render_detail_item('3', { 'title': this.get_future_time_difference(item.returnValues.p6), 'details': 'Until: '+(new Date(item.returnValues.p6*1000)), 'size': 's' })}
                    <div style={{ height: '1px', 'background-color': '#C1C1C1', 'margin': '10px 20px 10px 20px' }} />
                </div>
            )
        }
    }






















    /* renders the specific element in the post or detail object */
    render_detail_item(item_id, object_data) {
        var size = this.props.screensize
        var width = size == 'm' ? this.props.app_state.width / 2 : this.props.app_state.width
        return (
            <div>
                <ViewGroups item_id={item_id} object_data={object_data} theme={this.props.theme} width={width} />
            </div>
        )

    }


    format_account_balance_figure(amount) {
        if (amount == null) {
            amount = 0;
        }
        if (amount < 1_000_000_000) {
            return number_with_commas(amount.toString())
        } else {
            var power = amount.toString().length - 9
            return number_with_commas(amount.toString().substring(0, 9)) + 'e' + power
        }

    }

    get_number_width(number) {
        var last_two_digits = number.toString().slice(0, 1) + '0';
        if (number > 10) {
            last_two_digits = number.toString().slice(0, 2);
        }
        return last_two_digits + '%'
    }

    calculate_bar_width(amount) {
        var figure = ''
        if (amount == null) {
            amount = 0
        }
        if (amount < bigInt('1e9')) {
            figure = Math.round((amount.toString().length * 100) / bigInt('1e9').toString().length)
        }
        else if (amount < bigInt('1e18')) {
            figure = Math.round((amount.toString().length * 100) / bigInt('1e18').toString().length)
        }
        else if (amount < bigInt('1e36')) {
            figure = Math.round((amount.toString().length * 100) / bigInt('1e36').toString().length)
        }
        else {
            figure = Math.round((amount.toString().length * 100) / bigInt('1e72').toString().length)
        }

        return figure + '%'
    }

    format_power_figure(amount) {
        var power = 'e72'
        if (amount < bigInt('1e9')) {
            power = 'e9'
        }
        else if (amount < bigInt('1e18')) {
            power = 'e18'
        }
        else if (amount < bigInt('1e36')) {
            power = 'e36'
        }
        else {
            power = 'e72'
        }
        return power
    }

    format_proportion(proportion) {
        return ((proportion / 10 ** 18) * 100) + '%';
    }

    /* gets a formatted time diffrence from now to a given time */
    get_time_difference(time) {
        var number_date = Math.round(parseInt(time));
        var now = Math.round(new Date().getTime() / 1000);

        var diff = now - number_date;
        return this.get_time_diff(diff)
    }

    get_future_time_difference(time) {
        var number_date = Math.round(parseInt(time));
        var now = Math.round(new Date().getTime() / 1000);

        var diff = number_date - now;
        return this.get_time_diff(diff)
    }

    get_time_diff(diff) {
        if (diff < 60) {//less than 1 min
            var num = diff
            var s = num > 1 ? 's' : '';
            return num + ' sec'
        }
        else if (diff < 60 * 60) {//less than 1 hour
            var num = Math.floor(diff / (60));
            var s = num > 1 ? 's' : '';
            return num + ' min'
        }
        else if (diff < 60 * 60 * 24) {//less than 24 hours
            var num = Math.floor(diff / (60 * 60));
            var s = num > 1 ? 's' : '';
            return num + ' hr' + s;
        }
        else if (diff < 60 * 60 * 24 * 7) {//less than 7 days
            var num = Math.floor(diff / (60 * 60 * 24));
            var s = num > 1 ? 's' : '';
            return num + ' dy' + s;
        }
        else if (diff < 60 * 60 * 24 * 7 * 53) {//less than 1 year
            var num = Math.floor(diff / (60 * 60 * 24 * 7));
            var s = num > 1 ? 's' : '';
            return num + ' wk' + s;
        }
        else {//more than a year
            var num = Math.floor(diff / (60 * 60 * 24 * 7 * 53));
            var s = num > 1 ? 's' : '';
            return number_with_commas(num) + ' yr' + s;
        }
    }


}




export default ContractDetailsSection;