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
import ViewGroups from './../components/view_groups'
import Tags from './../components/tags';
// import Letter from './../assets/letter.png';
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
        selected: 0, navigate_view_contract_list_detail_tags_object: this.get_navigate_view_contract_list_detail_tags(), enter_contract_search_text:'', exit_contract_search_text:'', selected_exchange:{}, typed_search_participant_id:''
    };

    componentDidMount() {
        this.interval = setInterval(() => this.check_for_new_responses_and_messages(), this.props.app_state.details_section_syncy_time);
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
        var obj =  {
            'i': {
                active: 'e',
            },
            'e': [
                ['xor', '', 0], ['e', this.props.app_state.loc['2118']/* 'details' */, this.props.app_state.loc['2214d']/* 'participants' */, 'e.'+this.props.app_state.loc['2119']/* 'e.events' */, 'e.'+this.props.app_state.loc['2120']/* 'e.moderator-events' */], [1]
            ],
            'events': [
                ['xor', 'e', 1], [this.props.app_state.loc['2119']/* 'events' */, this.props.app_state.loc['2121']/* 'transfers' */, this.props.app_state.loc['2122']/* 'create-proposal' */, this.props.app_state.loc['2123']/* 'modify-contract' */, this.props.app_state.loc['2125']/* 'enter-contract' */, this.props.app_state.loc['2126']/* 'extend-contract-stay' */, this.props.app_state.loc['2127']/* 'exit-contract' */, this.props.app_state.loc['2128']/* 'force-exit-accounts' */], [1], [1]
            ],
            'moderator-events': [
                ['xor', 'e', 1], [this.props.app_state.loc['2120']/* 'moderator-events' */, this.props.app_state.loc['2066']/* 'modify-moderators' */, this.props.app_state.loc['2067']/* 'interactable-checkers' */, this.props.app_state.loc['2068']/* 'interactable-accounts' */, this.props.app_state.loc['2069']/* 'block-accounts' */], [1], [1]
            ],
        }
        
        obj[this.props.app_state.loc['2119']/* events */] = [
                ['xor', 'e', 1], [this.props.app_state.loc['2119']/* 'events' */, this.props.app_state.loc['2121']/* 'transfers' */, this.props.app_state.loc['2122']/* 'create-proposal' */, this.props.app_state.loc['2123']/* 'modify-contract' */, this.props.app_state.loc['2125']/* 'enter-contract' */, this.props.app_state.loc['2126']/* 'extend-contract-stay' */, this.props.app_state.loc['2127']/* 'exit-contract' */, this.props.app_state.loc['2128']/* 'force-exit-accounts' */], [1], [1]
            ]
        obj[this.props.app_state.loc['2120']/* moderator-events */] = [
                ['xor', 'e', 1], [this.props.app_state.loc['2120']/* 'moderator-events' */, this.props.app_state.loc['2066']/* 'modify-moderators' */, this.props.app_state.loc['2067']/* 'interactable-checkers' */, this.props.app_state.loc['2068']/* 'interactable-accounts' */, this.props.app_state.loc['2069']/* 'block-accounts' */], [1], [1]
            ]

        return obj
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
                    <div style={{ width: '100%', 'padding': '0px 0px 0px 0px', 'margin': '0px 0px 0px 0px',  }}>
                        <Tags font={this.props.app_state.font} page_tags_object={this.state.navigate_view_contract_list_detail_tags_object} tag_size={'l'} when_tags_updated={this.when_navigate_view_contract_list_detail_tags_object_updated.bind(this)} theme={this.props.theme} />
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
            if (selected_item == this.props.app_state.loc['2118']/* 'details' */) {
                return (
                    <div key={selected_item}>
                        {this.render_contracts_main_details_section(object)}
                    </div>
                )
            }
            else if (selected_item == this.props.app_state.loc['2122']/* 'create-proposal' */) {
                return (
                    <div key={selected_item}>
                        {this.render_create_proposal_logs(object)}
                    </div>
                )

            }
            else if (selected_item == this.props.app_state.loc['2123']/* 'modify-contract' */) {
                return (
                    <div key={selected_item}>
                        {this.render_modify_contract_logs(object)}
                    </div>
                )

            }
            else if (selected_item == this.props.app_state.loc['2125']/* 'enter-contract' */) {
                return (
                    <div key={selected_item}>
                        {this.render_enter_contract_logs(object)}
                    </div>
                )

            }
            else if (selected_item == this.props.app_state.loc['2126']/* 'extend-contract-stay' */) {
                return (
                    <div key={selected_item}>
                        {this.render_extend_contract_logs(object)}
                    </div>
                )

            }
            else if (selected_item == this.props.app_state.loc['2127']/* 'exit-contract' */) {
                return (
                    <div key={selected_item}>
                        {this.render_exit_contract_logs(object)}
                    </div>
                )

            }
            else if (selected_item == this.props.app_state.loc['2128']/* 'force-exit-accounts' */) {
                return (
                    <div key={selected_item}>
                        {this.force_exit_accounts_logs(object)}
                    </div>
                )

            }
            else if (selected_item == this.props.app_state.loc['1713']/* 'transfers' */) {
                return (
                    <div key={selected_item}>
                        {this.render_transfer_logs(object)}
                    </div>
                )

            }
            else if(selected_item == this.props.app_state.loc['2066']/* 'modify-moderators' */){
                return(
                    <div key={selected_item}>
                        {this.render_modify_moderator_logs(object)}
                    </div>
                )
            }
            else if(selected_item == this.props.app_state.loc['2067']/* 'interactable-checkers' */){
                return(
                    <div key={selected_item}>
                        {this.render_interactable_checker_logs(object)}
                    </div>
                )
            }
            else if(selected_item == this.props.app_state.loc['2068']/* 'interactable-accounts' */){
                return(
                    <div key={selected_item}>
                        {this.render_interactable_accounts_logs(object)}
                    </div>
                )
            }
            else if(selected_item == this.props.app_state.loc['2069']/* 'block-accounts' */){
                return(
                    <div key={selected_item}>
                        {this.render_blocked_accounts_logs(object)}
                    </div>
                )
            }
            else if(selected_item == this.props.app_state.loc['2214d']/* 'participants' */){
                return(
                    <div key={selected_item}>
                        {this.render_participant_accounts_and_their_expiry_times(object)}
                    </div>
                )
            }
        }
    }

    render_empty_detail_object(){
        var background_color = this.props.theme['card_background_color']
        var he = this.props.height
        return(
            <div>
                <div style={{height:he, 'background-color': 'transparent', 'border-radius': '15px','padding':'10px 5px 5px 10px','display': 'flex', 'align-items':'center','justify-content':'center','margin':'0px 0px 10px 0px'}}>
                    <img alt="" src={this.props.app_state.theme['letter']} style={{height:70 ,width:'auto'}} />
                </div>
            </div>
        )
    }







    render_contracts_main_details_section(object) {
        var background_color = this.props.theme['card_background_color']
        var he = this.props.height - 50
        var item = this.get_contract_details_data(object)
        // var object = this.get_contract_items()[this.props.selected_contract_item]
        var author = object['event'] != null ? this.get_senders_name(object['event'].returnValues.p3, object) : 'Unknown'
        if(this.should_hide_contract_info_because_private(object)){
            author = '????'
        }
        return (
            <div style={{ 'background-color': background_color, 'border-radius': '15px', 'margin': '5px 10px 2px 10px', 'padding': '0px 10px 0px 10px' }}>
                <div style={{ 'overflow-y': 'auto', width: '100%', height: he, padding: '0px 10px 0px 10px' }}>
                    {this.render_detail_item('1', item['tags'])}
                    <div style={{ height: 10 }} />
                    {this.render_detail_item('3', item['id'])}
                    <div style={{ height: 10 }} />
                    {this.show_moderator_note_if_any(object)}
                    {this.render_post_state(object)}
                    {this.render_contract_type(object)}
                    <div onClick={() => this.add_to_contacts2(object)}>
                        {this.render_detail_item('3', { 'title': '' + author, 'details': this.props.app_state.loc['2070']/* 'Author' */, 'size': 'l' })}
                    </div>
                    
                    <div style={{ height: 10 }} />
                    {this.render_detail_item('3', { 'size': 'l', 'details': 'Access Rights', 'title': this.get_access_rights_status(object['access_rights_enabled']) })}
                    <div style={{ height: 10 }} />

                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 0px 5px 0px', 'border-radius': '8px' }}>
                        {this.render_detail_item('2', item['age'])}
                    </div>
                    <div style={{ height: 10 }} />
                    {this.render_detail_item('3', item['default_vote_bounty_split_proportion'])}
                    <div style={{ height: 10 }} />
                    {this.render_detail_item('3', item['default_consensus_majority_limit'])}
                    <div style={{ height: 10 }} />
                    {this.render_detail_item('3', item['default_voter_weight_exchange'])}

                    <div style={{ height: 10 }} />
                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }} onClick={() => this.props.view_number({'title':item['voter_weight_balance']['title'], 'number':item['voter_weight_balance']['n'], 'relativepower':item['voter_weight_balance']['relativepower']})}>
                        {this.render_detail_item('2', item['voter_weight_balance'])}
                    </div>

                    <div style={{ height: 10 }} />
                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 0px 5px 0px', 'border-radius': '8px' }} onClick={() => this.props.view_number({'title':item['default_minimum_end_vote_bounty_amount']['title'], 'number':item['default_minimum_end_vote_bounty_amount']['n'], 'relativepower':item['default_minimum_end_vote_bounty_amount']['relativepower']})}>
                        {this.render_detail_item('2', item['default_minimum_end_vote_bounty_amount'])}
                    </div>

                    <div style={{ height: 10 }} />
                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 0px 5px 0px', 'border-radius': '8px' }} onClick={() => this.props.view_number({'title':item['default_minimum_spend_vote_bounty_amount']['title'], 'number':item['default_minimum_spend_vote_bounty_amount']['n'], 'relativepower':item['default_minimum_spend_vote_bounty_amount']['relativepower']})}>
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

    show_moderator_note_if_any(object){
        if(this.props.app_state.moderator_notes_by_my_following.length == 0 || this.props.app_state.user_account_id[object['e5']] == object['author']) return;
        var note_to_apply = []
        for(var n=0; n<this.props.app_state.moderator_notes_by_my_following.length; n++){
            const focused_note = this.props.app_state.moderator_notes_by_my_following[n]
            var hit_count = 0
            for(var k=0; k<focused_note['keywords'].length; k++){
                const keyword_target = focused_note['keywords'][k]
                if(object['ipfs'].entered_title_text.includes(keyword_target)){
                    hit_count ++
                }
                else if(this.get_senders_name(object['author'], object) == keyword_target || object['author'] == keyword_target){
                    if(!this.should_hide_contract_info_because_private(object)) hit_count++
                }
                else if(object['ipfs'].entered_indexing_tags.includes(keyword_target)){
                    hit_count ++
                }
            }

            if(((focused_note['type'] == 'all' && hit_count == focused_note['keywords'].length) || (focused_note['type'] == 'one' && hit_count != 0)) && focused_note['visibility_end_time'] >= (Date.now()/1000)){
                note_to_apply.push(focused_note)
            }
        }
        if(note_to_apply.length != 0){
            const identifier = object['e5_id']
            const note_index = this.state.note_index == null || this.state.note_index[identifier] == null ? 0 : this.state.note_index[identifier];
            const note_count_message = `(${note_index+1}/${note_to_apply.length})`
            return(
                <div>
                    <div onClick={() => this.update_note_object_index(note_to_apply, identifier)}>
                        {this.render_detail_item('3', {'size':'s', 'title':this.props.app_state.loc['1593is']/* '⚠️ Moderator Note $' */.replace('$', note_count_message), 'details':note_to_apply[note_index]['message']})}
                    </div>
                    <div style={{height:10}}/>
                </div>
            )
        }
    }

    update_note_object_index(note_to_apply, identifier){
        var clone = this.state.note_index == null ? {} : structuredClone(this.state.note_index)
        if(clone[identifier] == null){
            clone[identifier] = 0
        }
        if(clone[identifier] + 1 == note_to_apply.length){
            clone[identifier] = 0
        }
        else{
            clone[identifier] ++
        }
        this.setState({note_index: clone})
    }

    add_to_contacts2(object){
        this.props.add_id_to_contacts(object['author'], object)
    }

    render_post_state(object){
        const country_data = this.props.app_state.country_data
        const object_country = object['ipfs'].device_country
        const country_item_data = country_data.find(e => e.name === object_country)
        if(country_item_data != null){
            var obj = {'g':'🟢', 'r':'🔴', 'b':'🔵', 'y':'🟡', 'o':'🟠', 'p':'🟣'}
            var country_color = obj[country_item_data.color[0]]
            var title = country_item_data.code /* +' '+country_item_data.emoji */
            var details = country_color+' '+country_item_data.call_code
            var channeling_id = object['ipfs'].get_content_channeling_object == null ? 3 : this.get_selected_item2(object['ipfs'].get_content_channeling_object, 'e')
            if(channeling_id == 1){
                return(
                    <div>
                        {this.render_detail_item('3', {'size':'l', 'title':title, 'details':details})}
                        <div style={{height:10}}/>
                    </div>
                )
            }
            else if(channeling_id == 2){
                var text = country_color+' '+object['ipfs'].device_language_setting
                return(
                    <div>
                        {this.render_detail_item('4', {'text':text, 'textsize':'13px', 'font':this.props.app_state.font})}
                        <div style={{height:10}}/>
                    </div>
                )
            }
            else{
                var text = '⚫ '+this.props.app_state.loc['1233']/* 'international' */
                return(
                    <div>
                        {this.render_detail_item('4', {'text':text, 'textsize':'13px', 'font':this.props.app_state.font})}
                        <div style={{height:10}}/>
                    </div>
                )
            }
        }
    }

    get_selected_item2(object, option){
        return object[option][2][0]
    }

    render_contract_type(object){
        if(object['ipfs'].contract_type != null){
            var obj = {
                'workgroup':this.props.app_state.loc['173'],
                'personal':this.props.app_state.loc['175'],
                'work':this.props.app_state.loc['177'],
                'life':this.props.app_state.loc['179'],
                'custom':this.props.app_state.loc['2214g'],
            }
            const title = this.props.app_state.loc['2214h']/* 'Contract Type.' */
            const details = obj[object['ipfs'].contract_type]
            return(
                <div>
                    {this.render_detail_item('3', {'size':'l', 'title':title, 'details':details})}
                    <div style={{height:10}}/>
                </div>
            )
        }
    }

    get_senders_name(sender, object){
        // var object = this.get_mail_items()[this.props.selected_mail_item];
        if(sender == this.props.app_state.user_account_id[object['e5']]){
            return this.props.app_state.loc['1694']/* 'You' */
        }else{
            var alias = (this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[sender] == null ? sender : this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[sender])
            return alias
        }
    }

    render_participants(object){
        var participans_data = this.get_active_participants(object)
        var active_participants = participans_data.active_participants
        if(object['id'] != 2 && active_participants.length > 0){
            return(
                <div>
                    {this.render_detail_item('0')}

                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2129']/* Participant Accounts' */, 'details':this.props.app_state.loc['2130']/* 'The accounts that have entered the contract.' */, 'size':'l'})}
                    <div style={{height: 10}}/>
                    {this.render_participant_accounts(object, active_participants)}
                </div>
            )
        }
    }

    render_participant_accounts(object, active_participants){
        var items = [].concat(active_participants)
        var background_color = this.props.theme['card_background_color']
        var card_shadow_color = this.props.theme['card_shadow_color']
        return(
            <div style={{'margin':'0px 0px 0px 0px','padding': '0px 0px 0px 0px', width: '97%', 'background-color': 'transparent'}}>
                <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '13px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                    {items.map((item, index) => (
                        <li style={{'display': 'inline-block', 'margin': '5px 5px 5px 5px', '-ms-overflow-style':'none'}}>
                            {this.render_detail_item('3', {'title':this.get_senders_name(item, object), 'details':this.props.app_state.loc['62']/* 'Account' */, 'size':'s'})}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    get_active_participants(object){
        var active_participants = []
        var inactive_participants = []
        var searched_text = this.state.typed_search_participant_id.trim()
        if(object['id'] != 2){
            object['participants'].forEach(participant => {
                if(
                    (searched_text != '' && 
                        (
                            participant.toString().includes(searched_text) || 
                            searched_text == participant.toString() || 
                            this.get_typed_alias_id(searched_text, object['e5']) == participant || 
                            this.get_senders_name2(participant, object['e5']).includes(searched_text)
                        )
                    ) || searched_text == ''){
                    if(object['participant_times'][participant] > (Date.now()/1000)){
                        active_participants.push(participant)
                    }else{
                        inactive_participants.push(participant)
                    }
                }
                
            });
        }
        return {active_participants: active_participants, inactive_participants: inactive_participants}
    }

    get_typed_alias_id(alias, e5){
        if(!isNaN(alias)){
            return alias
        }
        var id = (this.props.app_state.alias_owners[e5][alias] == null ? alias : this.props.app_state.alias_owners[e5][alias])

        return id
    }

    get_senders_name2(sender, e5){
        var alias = (this.props.app_state.alias_bucket[e5][sender] == null ? sender : this.props.app_state.alias_bucket[e5][sender])
        return alias
    }

    render_pin_contract_button(object){
        return(
            <div>
                {this.render_detail_item('0')}
                {this.render_detail_item('3', {'size':'l', 'details':this.props.app_state.loc['2131']/* 'Pin the contract to your feed' */, 'title':this.props.app_state.loc['2132']/* 'Pin Contract' */})}
                <div style={{height:10}}/>
                <div onClick={()=> this.when_pin_contract_clicked(object)}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['2134']/* 'Pin/Unpin Contract' */, 'action':''},)}
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
                        {this.render_detail_item('3', {'title':this.props.app_state.loc['2135']/* 'Author Moderator Privelages Disabled' */, 'details':this.props.app_state.loc['2137']/* 'Author of Object is not a Moderator by default' */, 'size':'l'})}
                    </div>
                )
            }else{
                return(
                    <div>
                        {this.render_detail_item('3', {'title':this.props.app_state.loc['2138']/* 'Author Moderator Privelages Enabled' */, 'details':this.props.app_state.loc['2139']/* 'Author of Object is a Moderator by default' */, 'size':'l'})}
                    </div>
                )
            }
        }
    }

    get_access_rights_status(value) {
        if (value == true) {
            return this.props.app_state.loc['2140']/* 'Enabled' */
        } else {
            return this.props.app_state.loc['2141']/* 'Disabled' */
        }
    }

    show_normal_contract_buttons(object) {
        // var object = this.get_contract_items()[this.props.selected_contract_item]
        if (object['id'] != 2 && object['hidden'] == false) {
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
                {this.show_enter_contract_button_if_possible(object)}   
            </div>
        )
    }

    show_enter_contract_button_if_possible(object){
        var expiry_time_in_seconds = object['entry_expiry']
        var time_to_expiry = expiry_time_in_seconds - Math.floor(new Date() / 1000);
        if(time_to_expiry <= 0){
            return(
                <div>
                    <div style={{ height: 10 }} />
                    {this.render_detail_item('3', { 'size': 'l', 'details': this.props.app_state.loc['2142']/* 'Enter a contract to participate in its consensus' */, 'title': this.props.app_state.loc['2143']/* 'Enter Contract' */ })}
                    <div style={{ height: 10 }} />

                    <div onClick={() => this.open_enter_contract_ui(object)}>
                        {this.render_detail_item('5', { 'text': this.props.app_state.loc['2144']/* 'Enter' */, 'action': '' },)}
                    </div>
                </div>
            )
        }
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

                    {this.render_detail_item('3', { 'size': 'l', 'details': this.props.app_state.loc['2145']/* 'Max Extend Enter Contract Limit' */, 'title': this.get_time_diff(contract_config[2]) })}
                    <div style={{ height: 10 }} />

                    {this.render_detail_item('3', { 'size': 'l', 'details': this.props.app_state.loc['2146']/* 'Extend your stay in the contract' */, 'title': this.props.app_state.loc['2147']/* 'Extend Stay' */ })}
                    <div style={{ height: 10 }} />

                    <div onClick={() => this.open_extend_contract_ui(object)}>
                        {this.render_detail_item('5', { 'text':this.props.app_state.loc['2148']/*  'Extend' */, 'action': '' },)}
                    </div>

                </div>
            )
        }
    }

    show_send_proposal_button(object) {
        // var object = this.get_contract_items()[this.props.selected_contract_item]
        var expiry_time_in_seconds = object['entry_expiry']
        var time_to_expiry = expiry_time_in_seconds - Math.floor(new Date() / 1000);

        if ((expiry_time_in_seconds != 0 && time_to_expiry > 0) && object['id'] != 2 && object['hidden'] == false) {
            return (
                <div>
                    {this.render_detail_item('0')}
                    {this.render_detail_item('3', { 'size': 'l', 'details': this.props.app_state.loc['2149']/* 'Send a proposal to the contract to perform a specified action' */, 'title': this.props.app_state.loc['2150']/* 'Send Proposal' */ })}
                    <div style={{ height: 10 }} />
                    <div onClick={() => this.open_new_proposal_ui(object)}>
                        {this.render_detail_item('5', { 'text': this.props.app_state.loc['2151']/* 'Send' */, 'action': '' },)}
                    </div>
                </div>
            )
        }

    }

    show_send_main_contract_proposal(object){
        if(object['id'] == 2 && object['hidden'] == false){
            var e5 = object['e5']
            
            var entered_contracts_count = this.props.app_state.basic_transaction_data[e5] == null ? 0 : this.props.app_state.basic_transaction_data[e5][2]
            var e5_runs_count = this.props.app_state.basic_transaction_data[e5] == null ? 0 : this.props.app_state.basic_transaction_data[e5][3]
            var minimum_entered_contracts = object['data'][1][14 /* minimum_entered_contracts */]
            var minimum_transaction_count = object['data'][1][19 /* minimum_transaction_count */]

            if(entered_contracts_count>= minimum_entered_contracts && e5_runs_count>= minimum_transaction_count && this.props.app_state.user_account_id[object['e5']] != 1 && this.props.app_state.user_account_id[object['e5']] != null){
                return (
                    <div>
                        {this.render_detail_item('0')}
                        {this.render_detail_item('3', { 'size': 'l', 'details': this.props.app_state.loc['2152']/* 'Send a proposal to the contract to perform a specified action.' */, 'title': this.props.app_state.loc['2158']/* 'Send Proposal' */ })}
                        <div style={{ height: 10 }} />
                        <div onClick={() => this.open_new_proposal_ui(object)}>
                            {this.render_detail_item('5', { 'text': this.props.app_state.loc['2151']/* 'Send' */, 'action': '' },)}
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
                    {this.render_detail_item('3', { 'size': 'l', 'details': this.props.app_state.loc['2159']/* 'Exit from the contract and no longer participate in its consensus' */, 'title': this.props.app_state.loc['2160']/* 'Exit Contract' */ })}
                    <div style={{ height: 10 }} />

                    <div onClick={() => this.open_exit_contract_ui(object)}>
                        {this.render_detail_item('5', { 'text': this.props.app_state.loc['2161']/* 'Exit' */, 'action': '' },)}
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
                    {this.render_detail_item('3', { 'size': 'l', 'details': 'Until: ' + (new Date(expiry_time_in_seconds * 1000)), 'title': this.props.app_state.loc['2162']/* 'Entry Exipry Time' */ })}
                    <div style={{ height: 10 }} />

                    {this.render_detail_item('3', { 'size': 'l', 'details': '' + (this.get_time_diff(time_to_expiry)), 'title': this.props.app_state.loc['2163']/* 'Time remaining' */ })}
                </div>
            )
        } else if (expiry_time_in_seconds != 0 && time_to_expiry < 0) {
            return (
                <div>
                    {this.render_detail_item('4', { 'text': this.props.app_state.loc['2164']/* 'Your time in the contract has exipred, you have to enter it again.' */, 'textsize': '13px', 'font': this.props.app_state.font })}
                </div>
            )
        }
        else {
            return (
                <div>
                    {this.render_detail_item('4', { 'text': this.props.app_state.loc['2165']/* 'Youre not part of the contract' */, 'textsize': '13px', 'font': this.props.app_state.font })}
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

                    {this.render_detail_item('3', { 'title': this.props.app_state.loc['2166']/* 'Modify Contract' */, 'details': this.props.app_state.loc['2167']/* 'Modify the configuration of the contract directly.' */, 'size': 'l' })}
                    <div style={{ height: 10 }} />
                    <div onClick={() => this.open_modify_contract_ui(object)}>
                        {this.render_detail_item('5', { 'text': this.props.app_state.loc['2166']/* 'Modify Contract' */, 'action': '' })}
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

                    {this.render_detail_item('3', { 'title': this.props.app_state.loc['2168']/* 'Force Exit Accounts' */, 'details': this.props.app_state.loc['2169']/* 'Remove an account from the contract directly.' */, 'size': 'l' })}
                    <div style={{ height: 10 }} />
                    <div onClick={() => this.open_force_exit_ui(object)}>
                        {this.render_detail_item('5', { 'text': this.props.app_state.loc['2168']/* 'Force Exit Accounts' */, 'action': '' })}
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
                    {this.render_detail_item('3', { 'title': this.props.app_state.loc['2170']/* 'Archive Contract' */, 'details': this.props.app_state.loc['2171']/* Delete the contracts data to free up space in the blockchain' */, 'size': 'l' })}
                    <div style={{ height: 10 }} />
                    <div onClick={() => this.open_archive_contract_ui(object)}>
                        {this.render_detail_item('5', { 'text': this.props.app_state.loc['2170']/* 'Archive Contract' */, 'action': '' })}
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

                    {this.render_detail_item('3', { 'title': this.props.app_state.loc['2172']/* 'Perform Moderator Actions' */, 'details': this.props.app_state.loc['2173']/* 'Set an accounts access rights, moderator privelages or block an account' */, 'size': 'l' })}
                    <div style={{ height: 10 }} />
                    <div onClick={() => this.open_moderator_ui(object)}>
                        {this.render_detail_item('5', { 'text': this.props.app_state.loc['2174']/* 'Perform Action' */, 'action': '' })}
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
        var expiry_time_in_seconds = object['entry_expiry']
        var time_to_expiry = expiry_time_in_seconds - Math.floor(new Date() / 1000);

        if (time_to_expiry > 0 || object['id'] == 2){
            return (
                <div>
                    {this.render_detail_item('0')}
                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }} onClick={() => this.props.view_number({'title':item['end_balance']['title'], 'number':item['end_balance']['n'], 'relativepower':item['end_balance']['relativepower']})}>
                        {this.render_detail_item('2', item['end_balance'])}
                    </div>

                    <div style={{ height: 10 }} />
                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }} onClick={() => this.props.view_number({'title':item['spend_balance']['title'], 'number':item['spend_balance']['n'], 'relativepower':item['spend_balance']['relativepower']})}>
                        {this.render_detail_item('2', item['spend_balance'])}
                    </div>

                    {this.show_contract_token_balances_data_chart(object)}
                </div>
            )
        }
    }


    get_contract_details_data(object) {
        // var object = this.get_contract_items()[this.props.selected_contract_item]
        var main_contract_tags = ['Contract', 'main', object['e5'] ]
        var tags = object['ipfs'] == null ? (object['id'] == 2 ? main_contract_tags : ['Contract']) : [object['e5']].concat(object['ipfs'].entered_indexing_tags)
        var title = object['ipfs'] == null ? 'Contract ID' : object['ipfs'].entered_title_text
        var age = object['event'] == null ? this.props.app_state.boot_times[object['e5']]['block'] : object['event'].returnValues.p5
        var time = object['event'] == null ? this.props.app_state.boot_times[object['e5']]['time'] : object['event'].returnValues.p4
        var contract_config = object['data'][1]
        var auto_wait = contract_config[8] == 0 ? this.props.app_state.loc['540']/* 'false' */ : this.props.app_state.loc['541']/* 'true' */
        var can_modify_contract_as_moderator = contract_config[28] == 0 ? this.props.app_state.loc['540']/* 'false' */ : this.props.app_state.loc['541']/* 'true' */
        var can_extend_enter_contract_at_any_time = contract_config[29] == 0 ? this.props.app_state.loc['540']/* 'false' */ : this.props.app_state.loc['541']/* 'true' */
        var bounty_limit_type = contract_config[37] == 0 ? this.props.app_state.loc['87']/* relative' */ : this.props.app_state.loc['88']/* 'absolute' */
        var contract_force_exit_enabled = contract_config[38] == 0 ? this.props.app_state.loc['90']/* 'disabled' */ : this.props.app_state.loc['89']/* 'enabled' */
        var consensus_majority = contract_config[7] == 0 ? bigInt('1e18') : contract_config[7]
        var voter_weight_target_name = this.get_exchange_name_from_id(contract_config[33], object)
        var voter_weight_balance = this.get_voter_weight_balance(contract_config[33], object)

        var number = number_with_commas(age)
        var barwidth = this.get_number_width(age)
        var relativepower = this.get_time_difference(time)
        var object_id = object['id']
        if(this.should_hide_contract_info_because_private(object)){
            object_id = '????'
            number = '????'
            relativepower = '????'
        }

        return {
            'tags': { 'active_tags': tags, 'index_option': 'indexed', 'selected_tags':this.props.app_state.job_section_tags,'when_tapped':'select_deselect_tag' },
            'id': { 'title': object['e5']+' • '+object_id, 'details': title, 'size': 'l' },
            'age': { 'style': 'l', 'title': this.props.app_state.loc['1744']/* 'Block Number' */, 'subtitle': '', 'barwidth': barwidth, 'number': `${number}`, 'barcolor': '', 'relativepower': `${relativepower} `+this.props.app_state.loc['2047']/* ago */, },

            'default_vote_bounty_split_proportion': { 'title': this.format_proportion(contract_config[1]), 'details': this.props.app_state.loc['68']/* 'Vote Bounty Split Proportion' */, 'size': 'l' },

            'default_minimum_end_vote_bounty_amount': { 'style': 'l', 'title': this.props.app_state.loc['70']/* 'Minimum End Bounty Amount' */, 'subtitle': this.format_power_figure(contract_config[4]), 'barwidth': this.calculate_bar_width(contract_config[4]), 'number': this.format_account_balance_figure(contract_config[4]), 'relativepower': this.props.app_state.loc['483']/* 'tokens' */, 'n': contract_config[4]},

            'default_minimum_spend_vote_bounty_amount': { 'style': 'l', 'title': this.props.app_state.loc['80']/* 'Minimum Spend Bounty Amount' */, 'subtitle': this.format_power_figure(contract_config[10]), 'barwidth': this.calculate_bar_width(contract_config[10]), 'number': this.format_account_balance_figure(contract_config[10]), 'relativepower': this.props.app_state.loc['483']/* 'tokens' */,'n':contract_config[10] },

            'default_proposal_expiry_duration_limit': { 'title': this.get_time_diff(contract_config[5]), 'details': this.props.app_state.loc['228']/* 'Proposal Expiry Duration Limit' */, 'size': 'l' },

            'max_enter_contract_duration': { 'title': this.get_time_diff(contract_config[6]), 'details': this.props.app_state.loc['1615']/* 'Max Enter Contract Duration' */, 'size': 'l' },

            'auto_wait_for_all_proposals_for_all_voters': { 'title': auto_wait, 'details': this.props.app_state.loc['1616']/* 'Auto Wait For All Proposals For All Voters' */, 'size': 'l' },

            'proposal_modify_expiry_duration_limit': { 'title': this.get_time_diff(contract_config[27]), 'details': this.props.app_state.loc['1617']/* 'Proposal Modify Expiry Duration Limit' */, 'size': 'l' },

            'can_modify_contract_as_moderator': { 'title': can_modify_contract_as_moderator, 'details':this.props.app_state.loc['1618']/*  'Can Modify Contract As Moderator' */, 'size': 'l' },

            'can_extend_enter_contract_at_any_time': { 'title': can_extend_enter_contract_at_any_time, 'details': this.props.app_state.loc['1619']/* 'Can Extend Enter Contract At Any Time' */, 'size': 'l' },

            'maximum_proposal_expiry_submit_expiry_time_difference': { 'title': this.get_time_diff(contract_config[36]), 'details': this.props.app_state.loc['1620']/* 'Maximum Proposal Expiry Submit Expiry Time Difference' */, 'size': 'l' },

            'bounty_limit_type': { 'title': bounty_limit_type, 'details': this.props.app_state.loc['1621']/* 'Bounty Limit Type' */, 'size': 'l' },

            'contract_force_exit_enabled': { 'title': contract_force_exit_enabled, 'details': this.props.app_state.loc['1622']/* 'Contract Force Exit' */, 'size': 'l' },

            'entry_fees': { 'title': this.props.app_state.loc['1623']/* 'Entry Fees' */, 'details': object['data'][2].length + this.props.app_state.loc['1624']/* ' tokens used' */, 'size': 'l' },

            'end_balance': { 'style': 'l', 'title': this.props.app_state.loc['377'],/* 'End Balance' */ 'subtitle': this.format_power_figure(object['end_balance']), 'barwidth': this.get_number_width(object['end_balance']), 'number':this.format_account_balance_figure(object['end_balance']), 'barcolor': '', 'relativepower': `END`, 'n':object['end_balance'] },

            'spend_balance': { 'style': 'l', 'title': this.props.app_state.loc['378']/* 'Spend Balance' */, 'subtitle': this.format_power_figure(object['spend_balance']), 'barwidth': this.get_number_width(object['spend_balance']), 'number':this.format_account_balance_figure(object['spend_balance']), 'barcolor': '', 'relativepower': `SPEND`, 'n':object['spend_balance']},


            'default_consensus_majority_limit': { 'title': this.format_proportion(consensus_majority), 'details': this.props.app_state.loc['1625']/* 'Consensus Majority Proportion' */, 'size': 'l' },

            'default_voter_weight_exchange': { 'title': voter_weight_target_name, 'details': this.props.app_state.loc['1626']/* 'Voter Weight Exchange' */, 'size': 'l' },

            'voter_weight_balance': { 'style': 'l', 'title': this.props.app_state.loc['1627']/* 'Voter Weight Balance' */, 'subtitle': this.format_power_figure(voter_weight_balance), 'barwidth': this.get_number_width(voter_weight_balance), 'number': ` ${number_with_commas(voter_weight_balance)}`, 'barcolor': '', 'relativepower': this.props.app_state.loc['1628']/* `units` */, 'n':voter_weight_balance},
            
        }
    }

    should_hide_contract_info_because_private(object){
        var should_show =  object['ipfs'].contract_type == 'personal' || object['ipfs'].contract_type == 'life';
        if(this.props.app_state.user_account_id[object['e5']] == object['author'] || this.is_sender_part_of_contract(object)){
            return false
        }
        return should_show
    }

    get_exchange_name_from_id(id, object){
        if(id == 0) return this.props.app_state.loc['808']/* 'None' */
        return this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[object['e5']+id]
    }

    get_voter_weight_balance(id, object){
        if(id == 0) return this.is_sender_part_of_contract(object) ? 1 : 0
        if(this.props.app_state.created_token_object_mapping[object['e5']] != null){
            var voter_exchange = this.props.app_state.created_token_object_mapping[object['e5']][id]
            if(voter_exchange != null){
                var balance = voter_exchange['balance']
                return balance
            }
        }
        return this.is_sender_part_of_contract(object) ? 1 : 0
    }

    is_sender_part_of_contract(object){
        var expiry_time_in_seconds = object['entry_expiry']
        var time_to_expiry = expiry_time_in_seconds - Math.floor(new Date() / 1000);

        if ((expiry_time_in_seconds != 0 && time_to_expiry > 0) && object['id'] != 2) {
            return true
        }
        return false;
    }


    get_contract_items(){
        return this.props.get_contract_items('')
    }

    render_buy_token_uis(buy_tokens, buy_amounts, buy_depths, object) {
        var bt = [].concat(buy_tokens)
        return (
            <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 0px 5px 0px', 'border-radius': '8px' }}>
                <ul style={{ 'padding': '0px 0px 0px 0px', 'margin': '0px' }}>
                    {bt.map((item, index) => (
                        <li style={{ 'padding': '1px' }} onClick={() => this.props.view_number({'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[object['e5']+item], 'number':buy_amounts[index], 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item]})}>
                            {this.render_detail_item('2', { 'style': 'l', 'title': this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[object['e5']+item], 'subtitle': this.format_power_figure(buy_amounts[index]), 'barwidth': this.calculate_bar_width(buy_amounts[index]), 'number': this.format_account_balance_figure(buy_amounts[index]), 'relativepower': this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item] })}
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





    show_contract_token_balances_data_chart(object){
        var data = this.props.app_state.contract_exchange_interactions_data[object['e5']+object['id']]
        if(data == null) return;
        var interacted_exchange_data = this.get_interacted_exchanges(data, object)
        if(interacted_exchange_data.length == 0) return;
        var selected_exchange = this.get_selected_interacted_exchange(object, data)[0]
        var event_data = this.get_selected_exchange_data(data, selected_exchange)
        return(
            <div>
                <div style={{height: 10}}/>
                {/* {this.render_detail_item('1', {'active_tags':interacted_exchange_data, 'index_option':'indexed', 'when_tapped': 'when_contract_exchange_tapped', 'selected_tags':this.get_selected_interacted_exchange(object, data)}, object)} */}
                {this.load_my_used_exchange_objects(interacted_exchange_data, object, selected_exchange)}
                <div style={{height: 10}}/>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['2214a']/* 'Balance Changes.' */, 'details':this.props.app_state.loc['2214b']/* `The changes in balance for the selected token.` */, 'size':'l'})}
                
                {this.render_detail_item('6', {'dataPoints':this.get_deposit_amount_data_points(event_data), 'interval':110, 'hide_label': true})}
                <div style={{height: 10}}/>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['2214c']/* 'Y-Axis: Total in ' */+selected_exchange, 'details':this.props.app_state.loc['2275']/* 'X-Axis: Time' */, 'size':'s'})}
               
            </div>
        )
    }

    load_my_used_exchange_objects(items, object, selected_exchange){
        var items2 = [0, 1, 2]
        if(items.length == 0){
            return(
                <div style={{'margin':'3px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                    {items2.map(() => (
                        <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}}>
                            {this.render_empty_horizontal_list_item2()}
                        </li>
                    ))}
                </ul>
            </div>
            )
        }
        return(
            <div style={{'margin':'3px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                    {items.map((item, index) => (
                        <li style={{'display': 'inline-block', 'margin': '0px 2px 1px 2px', '-ms-overflow-style':'none'}} onClick={()=>this.when_contract_exchange_tapped(item.symbol, index, object)}>
                            {this.render_exchange_item(item, object, selected_exchange)}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    render_exchange_item(item, object, selected_exchange){
        var e5 = object['e5']
        var title = item.name
        var details = item.symbol
        var image = this.props.app_state.token_thumbnail_directory[e5][item.exchange_id]
        if(selected_exchange == item.symbol){
            return(
                <div>
                    {this.render_detail_item('14', {'title':title, 'image':image,'details':details, 'size':'s', 'border_radius':'9px', 'img_size':30})}
                    <div style={{height:'1px', 'background-color':this.props.app_state.theme['line_color'], 'margin': '3px 5px 0px 5px'}}/>
                </div>
            )
        }else{
            return(
                <div>
                    {this.render_detail_item('14', {'title':title, 'image':image, 'details':details, 'size':'s', 'border_radius':'9px', 'img_size':30})}
                </div>
            )
        }
    }

    get_interacted_exchanges(data, object){
        var keys = Object.keys(data)
        var exchange_data = []
        keys.forEach(key => {
            var symbol = this.get_token_symbol_from_id(key, object)
            var name = this.get_token_name_from_id(key, object)
            if(this.is_exchange_valid(data[key], name, key, object)){
                exchange_data.push({name, exchange_id: key, symbol})
            } 
        });
        return exchange_data
    }

    get_token_name_from_id(exchange_id, object){
        var e5 = object['e5']
        var name = this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[e5+exchange_id]
        if(name == null) return exchange_id
        return name
    }

    is_exchange_valid(events, key, exchange_id, object){
        for(var i=0; i<events.length; i++){
            if(events[i]['action'] === 'DepthMint' && events[i]['event'].returnValues.p4/* depth_val */ !== 0){
                return false
            }
        }
        var e5 = object['e5']
        if(this.props.app_state.end_tokens[e5] != null && this.props.app_state.end_tokens[e5].includes(exchange_id)){
            return false
        }
        return true
    }

    get_selected_interacted_exchange(object, data){
        if(this.state.selected_exchange[object['id']] == null){
            var name = data[3] == null ? this.get_token_symbol_from_id(5, object) : this.get_token_symbol_from_id(3, object)
            return [name]
        }
        return [this.state.selected_exchange[object['id']]]
    }

    get_selected_exchange_data(data, selected_exchange_name){
        var id = parseInt(this.get_token_id_from_symbol(selected_exchange_name))
        return data[id]
    }

    get_token_id_from_symbol(typed_search){
        if(!isNaN(typed_search)){
            return typed_search
        }
        var id = this.props.app_state.token_directory[this.props.app_state.selected_e5][typed_search.toUpperCase()] == null ? typed_search : this.props.app_state.token_directory[this.props.app_state.selected_e5][typed_search.toUpperCase()]

        return id
    }

    get_token_symbol_from_id(exchange_id){
        var symbol = this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[exchange_id]
        if(symbol == null) return exchange_id
        return symbol
    }

    when_contract_exchange_tapped(tag, pos, object){
        var clone = structuredClone(this.state.selected_exchange)
        clone[object['id']] = tag
        this.setState({selected_exchange: clone})
    }

    get_deposit_amount_data_points(events){
        var data = []
        var active_balance = bigInt(0)
        var max_amount = bigInt(0);
        try{
            for(var i=0; i<events.length; i++){
                if(i == 0){
                    if(events[i]['action'] == 'Received'){
                        data.push(bigInt(this.get_actual_number(events[i]['event'].returnValues.p4/* amount */, events[i]['event'].returnValues.p7/* depth */)))
                    }
                    else if(events[i]['action'] == 'Update'){
                        data.push(bigInt(events[i]['event'].returnValues.p3/* new_balance */))
                    }
                    else if(events[i]['action'] == 'DepthMint'){
                        var val = bigInt(this.get_actual_number(events[i]['event'].returnValues.p5/* amount */, events[i]['event'].returnValues.p4/* depth_val */))
                        data.push(val)
                        active_balance = val
                    }
                    max_amount = bigInt(data[data.length-1])
                }else{
                    if(events[i]['action'] == 'Received'){
                        data.push(bigInt(data[data.length-1]).add(bigInt(this.get_actual_number(events[i]['event'].returnValues.p4/* amount */, events[i]['event'].returnValues.p7/* depth */))))
                    }
                    else if(events[i]['action'] == 'Update'){
                        var val = bigInt(events[i]['event'].returnValues.p3/* new_balance */)
                        if(!active_balance.greater(bigInt('1e72'))){
                            data.push(val)
                        }
                    }
                    else if(events[i]['action'] == 'DepthMint'){
                        var val = bigInt(this.get_actual_number(events[i]['event'].returnValues.p5/* amount */, events[i]['event'].returnValues.p4/* depth_val */))
                        data.push(active_balance.plus(val))
                        active_balance = active_balance.plus(val)
                    }
                    else{
                        data.push(bigInt(data[data.length-1]).minus(bigInt(this.get_actual_number(events[i]['event'].returnValues.p4/* amount */, events[i]['event'].returnValues.p7/* depth */))))
                    }
                    if(bigInt(max_amount).lesser(data[data.length-1])){
                       max_amount = bigInt(data[data.length-1]) 
                    }
                }

                if(i==events.length-1){
                    var diff = Date.now()/1000 - events[i]['event'].returnValues.p5
                    for(var t=0; t<diff; t+=(61*2651)){
                        data.push(data[data.length-1])      
                    }
                }
                else{
                    var diff = events[i+1]['event'].returnValues.p5 - events[i]['event'].returnValues.p5
                    for(var t=0; t<diff; t+=(61*2651)){
                        data.push(data[data.length-1])      
                    }
                }
                
            }
        }catch(e){
            console.log(e)
        }

        data = data.slice(Math.floor(data.length * this.props.app_state.graph_slice_proportion))
        

        var xVal = 1, yVal = 0;
        var dps = [];
        var noOfDps = 100;
        var factor = Math.round(data.length/noOfDps) +1;
        var largest_number = max_amount
        var recorded = false;
        for(var i = 0; i < noOfDps; i++) {
            if(largest_number == 0) yVal = 0
            else yVal = parseInt(bigInt(data[factor * xVal]).multiply(100).divide(largest_number))
            
            if(yVal != null && data[factor * xVal] != null){
                if(i%(Math.round(noOfDps/4)) == 0 && i != 0 && !recorded){
                    // recorded = true
                    dps.push({x: xVal,y: yVal, indexLabel: ""+this.format_account_balance_figure(data[factor * xVal])});//
                }else{
                    dps.push({x: xVal, y: yVal});//
                }
                xVal++;
            }
        }
        
        return dps
    }














    render_participant_accounts_and_their_expiry_times(object){
        var he = this.props.height-45
        var object_item = this.get_contract_details_data(object)
        var participans_data = this.get_active_participants(object)
        var active_participants = participans_data.active_participants
        var inactive_participants = participans_data.inactive_participants
        return(
            <div style={{ 'background-color': 'transparent', 'border-radius': '15px','margin':'0px 0px 0px 0px', 'padding':'0px 0px 0px 0px'}}>
                <div style={{ 'overflow-y': 'auto', height: he, padding:'10px 10px 5px 10px'}}>
                    {this.render_detail_item('3', object_item['id'])}
                    <div style={{ 'margin': '10px 5px 5px 5px'}}>
                        <TextInput font={this.props.app_state.font} height={25} placeholder={this.props.app_state.loc['2509e']/* 'Account ID or Alias...' */} when_text_input_field_changed={this.when_search_participant_input_field_changed.bind(this)} text={this.state.typed_search_participant_id} theme={this.props.theme} />
                    </div>
                    {this.render_detail_item('0')}
                    {this.render_active_participants(object, active_participants, inactive_participants)}
                    {this.render_inactive_participants(object, inactive_participants)}
                    {this.render_empty_views_if_no_participants(active_participants, inactive_participants)}
                </div>
            </div>
        )
    }

    when_search_participant_input_field_changed(text){
        this.setState({typed_search_participant_id: text})
    }

    render_empty_views_if_no_participants(active_participants, inactive_participants){
        if(inactive_participants.length == 0 && active_participants.length == 0){
            var items = ['0','1','2'];
            return ( 
                <div>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.map((item, index) => (
                            <li style={{'padding': '2px 0px 2px 0px'}}>
                                {this.render_small_empty_object()}
                            </li>
                        ))}
                    </ul>
                </div>
            );
        }
    }

    render_small_empty_object(){
        return(
            <div>
                <div style={{ height: 75, 'background-color': this.props.theme['card_background_color'], 'border-radius': '7px', 'padding': '10px 0px 10px 10px', 'display': 'flex', 'align-items': 'center', 'justify-content': 'center' }}>
                    <div style={{ 'margin': '10px 20px 10px 0px' }}>
                        <img alt="" src={this.props.app_state.theme['letter']} style={{ height: 30, width: 'auto' }} />
                    </div>
                </div>
            </div>
        )
    }

    render_active_participants(object, active_participants, inactive_participants){
        if(active_participants.length == 0) return;
        return(
            <div>
                {this.render_detail_item('4', {'text':this.props.app_state.loc['2214e']/* 'Accounts that can participate in the contracts consensus and the times to their participation expiry.' */, 'textsize':'13px', 'font':this.props.app_state.font})}
                <div style={{height:5}}/>
                {active_participants.map((item, index) => (
                    <div key={index}>
                        {this.render_detail_item('3', {'title':this.get_senders_name(item, object), 'details':this.get_account_time(item, object), 'size':'l'})}
                        <div style={{height:5}}/>
                    </div>
                ))}
                {this.render_line_if_inactive_participants_present(inactive_participants)}
            </div>
        )
    }

    render_line_if_inactive_participants_present(inactive_participants){
        if(inactive_participants.length > 0){
            return(
                <div>
                    {this.render_detail_item('0')}
                </div>
            )
        }
    }

    render_inactive_participants(object, inactive_participants){
        if(inactive_participants.length == 0) return;
        return(
            <div>
                {this.render_detail_item('4', {'text':this.props.app_state.loc['2214f']/* 'Accounts that can no longer participate in the contracts consensus and the times past thier participation expiry' */, 'textsize':'13px', 'font':this.props.app_state.font})}
                <div style={{height:5}}/>
                {inactive_participants.map((item, index) => (
                    <div key={index}>
                        {this.render_detail_item('3', {'title':this.get_senders_name(item, object), 'details':this.get_account_time(item, object), 'size':'l'})}
                        <div style={{height:5}}/>
                    </div>
                ))}
            </div>
        )
    }

    get_account_time(participant, object){
        var expiry_time = object['participant_times'][participant]
        var now = (Date.now()/1000)
        if(expiry_time > now){
            //account can still vote in contract
            return '+'+this.get_time_diff(expiry_time - now)
        }else{
            //account can no longer vote
            return '-'+this.get_time_difference(expiry_time)
        }
    }




















    render_create_proposal_logs(object) {
        var he = this.props.height - 45
        // var object = this.get_contract_items()[this.props.selected_contract_item]
        return (
            <div style={{ 'background-color': 'transparent', 'border-radius': '15px', 'margin': '0px 0px 0px 0px', 'padding': '0px 0px 0px 0px',  }}>
                <div style={{ 'overflow-y': 'auto', height: he, padding: '5px 0px 5px 0px' }}>
                    <div style={{ padding: '5px 5px 5px 5px' }}>
                        {this.render_detail_item('3', { 'title': this.props.app_state.loc['2175']/* 'In Contract '  */+ object['id'], 'details': this.props.app_state.loc['2176']/* 'Created Proposal Events' */, 'size': 'l' })}
                    </div>
                    <div style={{ height: '1px', 'background-color': this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px' }} />
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
                                    <div style={{ height: 60, width: '100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px', 'padding': '10px 0px 10px 10px',  'display': 'flex', 'align-items': 'center', 'justify-content': 'center' }}>
                                        <div style={{ 'margin': '10px 20px 10px 0px' }}>
                                            <img src={this.props.app_state.theme['letter']} style={{ height: 30, width: 'auto' }} />
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
                <div style={{  }}>
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
        if (this.props.app_state.contract_events[object['id']] == null || this.should_hide_contract_info_because_private(object)) {
            return []
        }
        return this.props.app_state.contract_events[object['id']][event]
    }


    render_created_proposal_event_item(item, object, index) {
        if (this.state.selected_proposal_event_item == index) {
            return (
                <div>
                    {this.render_detail_item('3', { 'title': this.get_consensus_type(item.returnValues.p3), 'details': this.props.app_state.loc['346']/* 'Consensus Type' */, 'size': 's' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': this.get_sender_title_text(item.returnValues.p4, object), 'details': this.props.app_state.loc['2178']/* 'Proposer Account ID' */, 'size': 'l' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': item.returnValues.p2, 'details': this.props.app_state.loc['1761']/* 'Proposal ID' */, 'size': 'l' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': this.get_time_difference(item.returnValues.p5), 'details': this.props.app_state.loc['1748']/* 'Age' */, 'size': 'l' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': item.returnValues.p6, 'details': this.props.app_state.loc['1744']/* 'Block Number' */, 'size': 'l' })}
                    <div style={{ height: '1px', 'background-color': this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px' }} />
                </div>
            )
        } else {
            return (
                <div>
                    {this.render_detail_item('3', { 'title': item.returnValues.p2, 'details': this.props.app_state.loc['1761']/* 'Proposal ID' */, 'size': 'l' })}
                    <div style={{ height: 2 }} />
                </div>
            )
        }
    }

    get_consensus_type(type) {
        var obj = { '0': this.props.app_state.loc['2180']/* 'Spend Proposal' */, '1': this.props.app_state.loc['2181']/* 'Reconfiguration Proposal' */, '6': this.props.app_state.loc['2182']/* 'Exchange-Transfer' */ }
        return obj[type]
    }


    get_sender_title_text(sender, object) {
        if (sender == this.props.app_state.user_account_id[object['e5']]) {
            return this.props.app_state.loc['1694']/* 'You' */
        } else {
            var alias = (this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[sender] == null ? sender : this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[sender])
            return alias
        }
    }










    render_modify_contract_logs(object) {
        var he = this.props.height - 45
        // var object = this.get_contract_items()[this.props.selected_contract_item]
        return (
            <div style={{ 'background-color': 'transparent', 'border-radius': '15px', 'margin': '0px 0px 0px 0px', 'padding': '0px 0px 0px 0px',  }}>
                <div style={{ 'overflow-y': 'auto', height: he, padding: '5px 0px 5px 0px' }}>
                    <div style={{ padding: '5px 5px 5px 5px' }}>
                        {this.render_detail_item('3', { 'title': this.props.app_state.loc['2175']/* 'In Contract '  */+ object['id'], 'details': this.props.app_state.loc['2177']/* 'Modify Proposal Events' */, 'size': 'l' })}
                    </div>
                    <div style={{ height: '1px', 'background-color': this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px' }} />
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
                                    <div style={{ height: 60, width: '100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px', 'padding': '10px 0px 10px 10px',  'display': 'flex', 'align-items': 'center', 'justify-content': 'center' }}>
                                        <div style={{ 'margin': '10px 20px 10px 0px' }}>
                                            <img src={this.props.app_state.theme['letter']} style={{ height: 30, width: 'auto' }} />
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
                <div style={{  }}>
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
                    {this.render_detail_item('3', { 'title': this.get_sender_title_text(item.returnValues.p2, object), 'details': this.props.app_state.loc['2179']/* 'Modifier' */, 'size': 'l' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': this.get_target_identifier(item), 'details': this.props.app_state.loc['2183']/* 'Targeted Modify Item' */, 'size': 'l' })}
                    <div style={{ height: 2 }} />
                    {this.get_value_ui(item, object)}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': this.get_time_difference(item.returnValues.p6), 'details': this.props.app_state.loc['1748']/* 'Age' */, 'size': 'l' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': item.returnValues.p7, 'details': this.props.app_state.loc['1744']/* 'Block Number' */, 'size': 'l' })}
                    <div style={{ height: '1px', 'background-color': this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px' }} />
                </div>
            )
        } else {
            return (
                <div>
                    {this.render_detail_item('3', { 'title': this.get_target_identifier(item), 'details': this.props.app_state.loc['2183']/* 'Targeted Modify Item' */, 'size': 'l' })}
                    <div style={{ height: 2 }} />
                </div>
            )
        }
    }

    get_target_identifier(item) {
        var obj = this.get_contract_modify_details()

        var target_array_pos = item.returnValues.p3
        var target_array_item = item.returnValues.p4

        if(target_array_pos == 3/* contract_entry_amounts */){
            return 'price'
        }
        var selected_key = ''
        for (let key in obj) {
            if (obj[key]['position'][0] == target_array_pos && obj[key]['position'][1] == target_array_item) {
                selected_key = key
                break;
            }
        }

        return selected_key
    }


    get_value_ui(item, object) {
        var identifier = this.get_target_identifier(item)
        var number = item.returnValues.p5

        var target_array_pos = item.returnValues.p3
        var target_array_item = item.returnValues.p4

        var type = identifier == 'price' ? 'number' : this.get_contract_modify_details()[identifier]['picker']
        var contract = object['data']
        var exchange_id = contract[2][target_array_item]

        var title = identifier == 'price' ? this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[object['e5']+exchange_id] : identifier

        if (type == 'proportion') {
            return (
                <div>
                    {this.render_detail_item('3', { 'title': this.format_proportion(number), 'details': this.props.app_state.loc['1013']/* 'proportion' */, 'size': 'l' })}
                </div>
            )
        }
        else if (type == 'time') {
            return (
                <div>
                    {this.render_detail_item('3', { 'title': this.get_time_diff(number), 'details': this.props.app_state.loc['1014']/* 'duration' */, 'size': 'l' })}
                </div>
            )
        }
        else if (type == 'number') {
            return (
                <div>
                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }} onClick={() => this.props.view_number({'title':title, 'number':number, 'relativepower':this.props.app_state.loc['1430']/* 'units' */})}>
                        {this.render_detail_item('2', { 'style': 'l', 'title': title, 'subtitle': this.format_power_figure(number), 'barwidth': this.calculate_bar_width(number), 'number': this.format_account_balance_figure(number), 'barcolor': '', 'relativepower': this.props.app_state.loc['1430']/* 'units' */, })}
                    </div>
                </div>
            )
        }
        else if (type == 'tag') {
            return (
                <div>
                    {this.render_detail_item('3', { 'title': this.get_tag_selected_item(identifier, number), 'details': this.props.app_state.loc['1883']/* 'value: ' */ + number, 'size': 'l' })}
                </div>
            )
        }
        else if (type == 'id') {
            return (
                <div>
                    {this.render_detail_item('3', { 'title': number, 'details': this.props.app_state.loc['2184']/* 'target ID' */, 'size': 'l' })}
                </div>
            )
        }
    }

    get_tag_selected_item(title, number) {
        var obj = { 'Auto Wait': { 0: 'no', 1: 'yes' }, 'Moderator Modify Privelage': { 1: 'modifiable', 0: 'non-modifiable' }, 'Unlimited Extend Contract Time': { 1: 'enabled', 0: 'disabled' }, 'Bounty Limit Type': { 0: 'relative', 1: 'absolute' }, 'Force Exit Enabled': { 1: 'enabled', 0: 'disabled' }, 'Halving type': { 0: 'fixed', 1: 'spread' }, 'Block Limit Sensitivity': { 1: '1', 2: '2', 3: '3', 4: '4', 5: '5' } }

        obj[this.props.app_state.loc['73']]/* 'Auto Wait' */ = {0:'no', 1:'yes'}
        obj[this.props.app_state.loc['75']]/* 'Moderator Modify Privelage' */ = {1:'modifiable', 0:'non-modifiable'} 
        obj[this.props.app_state.loc['76']]/* 'Unlimited Extend Contract Time' */ = {1:'enabled', 0:'disabled'} 
        obj[this.props.app_state.loc['78']]/* 'Bounty Limit Type' */ = {0:'relative', 1:'absolute'}
        obj[this.props.app_state.loc['79']]/* 'Force Exit Enabled' */ = {1:'enabled', 0:'disabled'} 
        obj[this.props.app_state.loc['336']]/* 'Halving type' */ = {0:'fixed', 1:'spread'} 
        obj[this.props.app_state.loc['341']]/* 'Block Limit Sensitivity' */ = {1:'1', 2:'2', 3:'3', 4:'4', 5:'5'}


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

        obj[this.props.app_state.loc['68']] = {'position':[1,1], 'picker':'proportion', 'powerlimit':9};
        obj[this.props.app_state.loc['69']] = {'position':[1,2], 'picker':'time', 'powerlimit':63};
        obj[this.props.app_state.loc['70']] = {'position':[1,4], 'picker':'number', 'powerlimit':63};
        obj[this.props.app_state.loc['71']] = {'position':[1,5], 'picker':'time', 'powerlimit':63};
        obj[this.props.app_state.loc['72']] = {'position':[1,6], 'picker':'time', 'powerlimit':63};
        obj[this.props.app_state.loc['73']] = {'position':[1,8], 'picker':'tag', 'powerlimit':63};
        obj[this.props.app_state.loc['74']] = {'position':[1,27], 'picker':'time', 'powerlimit':63};
        obj[this.props.app_state.loc['75']] = {'position':[1,28], 'picker':'tag', 'powerlimit':9};
        obj[this.props.app_state.loc['76']] = {'position':[1,29], 'picker':'tag', 'powerlimit':9};
        obj[this.props.app_state.loc['77']] = {'position':[1,36], 'picker':'time', 'powerlimit':63};
        obj[this.props.app_state.loc['78']] = {'position':[1,37], 'picker':'tag', 'powerlimit':9};
        obj[this.props.app_state.loc['79']] = {'position':[1,38], 'picker':'tag', 'powerlimit':9};
        obj[this.props.app_state.loc['80']] = {'position':[1,10], 'picker':'number', 'powerlimit':63};

        return obj
    }










    render_enter_contract_logs(object) {
        var he = this.props.height - 45
        // var object = this.get_contract_items()[this.props.selected_contract_item]
        return (
            <div style={{ 'background-color': 'transparent', 'border-radius': '15px', 'margin': '0px 0px 0px 0px', 'padding': '0px 0px 0px 0px',  }}>
                <div style={{ 'overflow-y': 'auto', height: he, padding: '5px 0px 5px 0px' }}>
                    <div style={{ padding: '5px 5px 5px 5px' }}>
                        {this.render_detail_item('3', { 'title': this.props.app_state.loc['2185']/* In Contract '  */+ object['id'], 'details': this.props.app_state.loc['2186']/* 'Enter Contract Events' */, 'size': 'l' })}
                    </div>
                    <div style={{margin:'5px 10px 0px 10px'}}>
                        <TextInput font={this.props.app_state.font} height={20} placeholder={this.props.app_state.loc['2187']/* 'Search account ID...' */} when_text_input_field_changed={this.when_enter_contract_search_text_input_field_changed.bind(this)} text={this.state.enter_contract_search_text} theme={this.props.theme}/>
                    </div>
                    
                    <div style={{ height: '1px', 'background-color': this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px' }} />
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
                                    <div style={{ height: 60, width: '100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px', 'padding': '10px 0px 10px 10px',  'display': 'flex', 'align-items': 'center', 'justify-content': 'center' }}>
                                        <div style={{ 'margin': '10px 20px 10px 0px' }}>
                                            <img src={this.props.app_state.theme['letter']} style={{ height: 30, width: 'auto' }} />
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
                <div style={{  }}>
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
                    {this.render_detail_item('3', { 'title': this.get_sender_title_text(item.returnValues.p2, object), 'details': this.props.app_state.loc['2188']/* 'Entering Account ID' */, 'size': 'l' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': this.get_time_diff(item.returnValues.p4 - Date.now() / 1000), 'details': this.props.app_state.loc['2189']/* 'Entry Expiry' */, 'size': 'l' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': this.get_time_difference(item.returnValues.p7), 'details': this.props.app_state.loc['1748']/* 'Age' */, 'size': 'l' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': item.returnValues.p6, 'details': this.props.app_state.loc['1744']/* 'Block Number' */, 'size': 'l' })}
                    <div style={{ height: '1px', 'background-color': this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px' }} />
                </div>
            )
        } else {
            return (
                <div>
                    {this.render_detail_item('3', { 'title': this.get_sender_title_text(item.returnValues.p2, object), 'details': this.props.app_state.loc['2188']/* 'Entering Account ID' */, 'size': 'l' })}
                    <div style={{ height: 2 }} />
                </div>
            )
        }
    }












    render_extend_contract_logs(object) {
        var he = this.props.height - 45
        // var object = this.get_contract_items()[this.props.selected_contract_item]
        return (
            <div style={{ 'background-color': 'transparent', 'border-radius': '15px', 'margin': '0px 0px 0px 0px', 'padding': '0px 0px 0px 0px',  }}>
                <div style={{ 'overflow-y': 'auto', height: he, padding: '5px 0px 5px 0px' }}>
                    <div style={{ padding: '5px 5px 5px 5px' }}>
                        {this.render_detail_item('3', { 'title': 'In Contract ' + object['id'], 'details': this.props.app_state.loc['2190']/* 'Extend Contract Stay Events' */, 'size': 'l' })}
                    </div>
                    <div style={{ height: '1px', 'background-color': this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px' }} />
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
                                    <div style={{ height: 60, width: '100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px', 'padding': '10px 0px 10px 10px',  'display': 'flex', 'align-items': 'center', 'justify-content': 'center' }}>
                                        <div style={{ 'margin': '10px 20px 10px 0px' }}>
                                            <img src={this.props.app_state.theme['letter']} style={{ height: 30, width: 'auto' }} />
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
                <div style={{  }}>
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
                    {this.render_detail_item('3', { 'title': this.get_sender_title_text(item.returnValues.p2, object), 'details': this.props.app_state.loc['2191']/* 'Extending Account ID' */, 'size': 'l' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': this.get_time_diff(item.returnValues.p4 - Date.now() / 1000), 'details': this.props.app_state.loc['2192']/* 'Entry Expiry' */, 'size': 'l' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': this.get_time_difference(item.returnValues.p7), 'details': this.props.app_state.loc['1748']/* 'Age' */, 'size': 'l' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': item.returnValues.p6, 'details': this.props.app_state.loc['1744']/* 'Block Number' */, 'size': 'l' })}
                    <div style={{ height: '1px', 'background-color': this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px' }} />
                </div>
            )
        } else {
            return (
                <div>
                    {this.render_detail_item('3', { 'title': this.get_sender_title_text(item.returnValues.p4, object), 'details': this.props.app_state.loc['2191']/* 'Extending Account ID' */, 'size': 'l' })}
                    <div style={{ height: 2 }} />
                </div>
            )
        }
    }













    render_exit_contract_logs(object) {
        var he = this.props.height - 45
        // var object = this.get_contract_items()[this.props.selected_contract_item]
        return (
            <div style={{ 'background-color': 'transparent', 'border-radius': '15px', 'margin': '0px 0px 0px 0px', 'padding': '0px 0px 0px 0px',  }}>
                <div style={{ 'overflow-y': 'auto', height: he, padding: '5px 0px 5px 0px' }}>
                    <div style={{ padding: '5px 5px 5px 5px' }}>
                        {this.render_detail_item('3', { 'title': this.props.app_state.loc['2175']/* 'In Contract ' */ + object['id'], 'details': this.props.app_state.loc['2193']/* 'Exit Contract Events' */, 'size': 'l' })}
                    </div>
                    <div style={{margin:'5px 10px 0px 10px'}}>
                        <TextInput font={this.props.app_state.font} height={20} placeholder={this.props.app_state.loc['2187']/* 'Search account ID...' */} when_text_input_field_changed={this.when_exit_contract_search_text_input_field_changed.bind(this)} text={this.state.exit_contract_search_text} theme={this.props.theme}/>
                    </div>
                    <div style={{ height: '1px', 'background-color': this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px' }} />
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
                                    <div style={{ height: 60, width: '100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px', 'padding': '10px 0px 10px 10px',  'display': 'flex', 'align-items': 'center', 'justify-content': 'center' }}>
                                        <div style={{ 'margin': '10px 20px 10px 0px' }}>
                                            <img src={this.props.app_state.theme['letter']} style={{ height: 30, width: 'auto' }} />
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
                <div style={{  }}>
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
                    {this.render_detail_item('3', { 'title': this.get_sender_title_text(item.returnValues.p2, object), 'details': this.props.app_state.loc['2194']/* 'Exiting Account ID' */, 'size': 'l' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': this.get_time_difference(item.returnValues.p7), 'details': this.props.app_state.loc['1748']/* 'Age' */, 'size': 'l' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': item.returnValues.p6, 'details': this.props.app_state.loc['1744']/* 'Block Number' */, 'size': 'l' })}
                    <div style={{ height: '1px', 'background-color': this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px' }} />
                </div>
            )
        } else {
            return (
                <div>
                    {this.render_detail_item('3', { 'title': this.get_sender_title_text(item.returnValues.p2, object), 'details': this.props.app_state.loc['2194']/* 'Exiting Account ID' */, 'size': 'l' })}
                    <div style={{ height: 2 }} />
                </div>
            )
        }
    }














    force_exit_accounts_logs(object) {
        var he = this.props.height - 45
        // var object = this.get_contract_items()[this.props.selected_contract_item]
        return (
            <div style={{ 'background-color': 'transparent', 'border-radius': '15px', 'margin': '0px 0px 0px 0px', 'padding': '0px 0px 0px 0px',  }}>
                <div style={{ 'overflow-y': 'auto', height: he, padding: '5px 0px 5px 0px' }}>
                    <div style={{ padding: '5px 5px 5px 5px' }}>
                        {this.render_detail_item('3', { 'title': this.props.app_state.loc['2175']/* 'In Contract ' */ + object['id'], 'details': this.props.app_state.loc['2195']/* 'Force Exit Contract Events' */, 'size': 'l' })}
                    </div>
                    <div style={{ height: '1px', 'background-color': this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px' }} />
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
                                    <div style={{ height: 60, width: '100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px', 'padding': '10px 0px 10px 10px',  'display': 'flex', 'align-items': 'center', 'justify-content': 'center' }}>
                                        <div style={{ 'margin': '10px 20px 10px 0px' }}>
                                            <img src={this.props.app_state.theme['letter']} style={{ height: 30, width: 'auto' }} />
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
                <div style={{  }}>
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
                    {this.render_detail_item('3', { 'title': this.get_sender_title_text(item.returnValues.p2, object), 'details': this.props.app_state.loc['2196']/* 'Moderator Account ID' */, 'size': 'l' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': this.get_sender_title_text(item.returnValues.p5, object), 'details': this.props.app_state.loc['2197']/* 'Exiting Account ID' */, 'size': 'l' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': this.get_time_difference(item.returnValues.p7), 'details': this.props.app_state.loc['2198']/* 'Age' */, 'size': 'l' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': item.returnValues.p6, 'details': this.props.app_state.loc['1744']/* 'Block Number' */, 'size': 'l' })}
                    <div style={{ height: '1px', 'background-color': this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px' }} />
                </div>
            )
        } else {
            return (
                <div>
                    {this.render_detail_item('3', { 'title': this.get_sender_title_text(item.returnValues.p5, object), 'details': this.props.app_state.loc['2197']/* 'Exiting Account ID' */, 'size': 'l' })}
                    <div style={{ height: 2 }} />
                </div>
            )
        }
    }











    render_transfer_logs(object){
        var he = this.props.height - 45
        // var object = this.get_contract_items()[this.props.selected_contract_item]
        return (
            <div style={{ 'background-color': 'transparent', 'border-radius': '15px', 'margin': '0px 0px 0px 0px', 'padding': '0px 0px 0px 0px' }}>
                <div style={{ 'overflow-y': 'auto', height: he, padding: '5px 0px 5px 0px' }}>
                    <div style={{ padding: '5px 5px 5px 5px' }}>
                        {this.render_detail_item('3', { 'title': this.props.app_state.loc['2175']/* 'In Contract ' */ + object['id'], 'details': this.props.app_state.loc['2199']/* 'Contract Transfer Events' */, 'size': 'l' })}
                    </div>
                    <div style={{ height: '1px', 'background-color': this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px' }} />
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
                                    <div style={{ height: 60, width: '100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px', 'padding': '10px 0px 10px 10px',  'display': 'flex', 'align-items': 'center', 'justify-content': 'center' }}>
                                        <div style={{ 'margin': '10px 20px 10px 0px' }}>
                                            <img src={this.props.app_state.theme['letter']} style={{ height: 30, width: 'auto' }} />
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
                <div style={{  }}>
                    <ul style={{ 'padding': '0px 0px 0px 0px' }}>
                        {items.map((item, index) => (
                            <li style={{ 'padding': '2px 5px 2px 5px' }}>
                                <div key={index}>
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
        number = this.get_actual_number(number, depth)
        var from_to = item['action'] == 'Sent' ? this.props.app_state.loc['2419']/* 'To: ' */+this.get_sender_title_text(item['event'].returnValues.p3, object) : this.props.app_state.loc['2420']/* 'From: ' */+this.get_sender_title_text(item['event'].returnValues.p2, object)
        if (this.state.selected_contract_transfer_event_item == index) {
            return (
                <div>
                    <div onClick={() => this.when_contract_transfer_item_clicked(index)}>
                        {this.render_detail_item('3', { 'title': from_to, 'details': this.props.app_state.loc['1770']/* 'Action: ' */+item['action'], 'size': 'l' })}
                    </div>
                    <div style={{ height: 2 }} />

                    <div style={{ 'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[object['e5']+exchange_id], 'number':number, 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[exchange_id]})}>
                        {this.render_detail_item('2', { 'style': 'l', 'title': this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[object['e5']+exchange_id], 'subtitle': this.format_power_figure(number), 'barwidth': this.calculate_bar_width(number), 'number': this.format_account_balance_figure(number), 'barcolor': '', 'relativepower': this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[exchange_id], })}
                    </div>

                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': this.get_time_difference(item['event'].returnValues.p5), 'details': this.props.app_state.loc['2198']/* 'Age' */, 'size': 'l' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': item['event'].returnValues.p6, 'details': this.props.app_state.loc['1744']/* 'Block Number' */, 'size': 'l' })}
                    <div style={{ height: '1px', 'background-color': this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px' }} />
                </div>
            )
        } else {
            return (
                <div onClick={() => this.when_contract_transfer_item_clicked(index)}>
                    {this.render_detail_item('3', { 'title': from_to, 'details': this.format_account_balance_figure(number)+' '+this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[exchange_id], 'size': 'l' })}
              
                </div>
            )
        }
    }

    get_actual_number(number, depth){
        var p = (bigInt(depth).times(72)).toString().toLocaleString('fullwide', {useGrouping:false})
        var depth_vaule = bigInt(('1e'+p))
        return (bigInt(number).times(depth_vaule)).toString().toLocaleString('fullwide', {useGrouping:false})
    }














    render_modify_moderator_logs(object){
        var he = this.props.height - 45
        // var object = this.get_contract_items()[this.props.selected_contract_item]
        return (
            <div style={{ 'background-color': 'transparent', 'border-radius': '15px', 'margin': '0px 0px 0px 0px', 'padding': '0px 0px 0px 0px',  }}>
                <div style={{ 'overflow-y': 'auto', height: he, padding: '5px 0px 5px 0px' }}>
                    <div style={{ padding: '5px 5px 5px 5px' }}>
                        {this.render_detail_item('3', { 'title': this.props.app_state.loc['2175']/* 'In Contract '  */+ object['id'], 'details': this.props.app_state.loc['2202']/* 'Contract Modify Moderator Events' */, 'size': 'l' })}
                    </div>
                    <div style={{ height: '1px', 'background-color': this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px' }} />
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
                                    <div style={{ height: 60, width: '100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px', 'padding': '10px 0px 10px 10px',  'display': 'flex', 'align-items': 'center', 'justify-content': 'center' }}>
                                        <div style={{ 'margin': '10px 20px 10px 0px' }}>
                                            <img src={this.props.app_state.theme['letter']} style={{ height: 30, width: 'auto' }} />
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
                <div style={{  }}>
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
        var authority_val_obj = {'0':this.props.app_state.loc['2211']/* 'Not Moderator' */, '1':this.props.app_state.loc['2212']/* 'Moderator' */}
        var authority_val = authority_val_obj[item.returnValues.p6]
        if (this.state.selected_modify_moderator_event_item == index) {
            return (
                <div>
                    {this.render_detail_item('3', { 'title': this.get_sender_title_text(item.returnValues.p3, object), 'details': this.props.app_state.loc['2213']/* 'Targeted Account' */, 'size': 'l' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': this.get_sender_title_text(item.returnValues.p4, object), 'details': this.props.app_state.loc['2214']/* 'Moderator Account' */, 'size': 'l' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': authority_val, 'details': this.props.app_state.loc['2203']/* 'Authority value' */, 'size': 'l' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': this.get_time_difference(item.returnValues.p7), 'details': this.props.app_state.loc['2198']/* 'Age' */, 'size': 'l' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': item.returnValues.p8, 'details': this.props.app_state.loc['1744']/* 'Block Number' */, 'size': 'l' })}
                    <div style={{ height: '1px', 'background-color': this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px' }} />
                </div>
            )
        } else {
            return (
                <div>
                    {this.render_detail_item('3', { 'title': this.get_sender_title_text(item.returnValues.p3, object), 'details': this.props.app_state.loc['2213']/* 'Targeted Account' */, 'size': 'l' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', {'title': authority_val, 'details': this.props.app_state.loc['2203']/* 'Authority value' */, 'size': 'l' })}
                    <div style={{ height: '1px', 'background-color': this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px' }} />
                </div>
            )
        }
    }














    render_interactable_checker_logs(object){
        var he = this.props.height - 45
        // var object = this.get_contract_items()[this.props.selected_contract_item]
        return (
            <div style={{ 'background-color': 'transparent', 'border-radius': '15px', 'margin': '0px 0px 0px 0px', 'padding': '0px 0px 0px 0px',  }}>
                <div style={{ 'overflow-y': 'auto', height: he, padding: '5px 0px 5px 0px' }}>
                    <div style={{ padding: '5px 5px 5px 5px' }}>
                        {this.render_detail_item('3', { 'title': this.props.app_state.loc['2185']/* 'In Contract ' */ + object['id'], 'details': this.props.app_state.loc['2204']/* 'Contract Access Rights Settings Events' */, 'size': 'l' })}
                    </div>
                    <div style={{ height: '1px', 'background-color': this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px' }} />
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
                                    <div style={{ height: 60, width: '100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px', 'padding': '10px 0px 10px 10px',  'display': 'flex', 'align-items': 'center', 'justify-content': 'center' }}>
                                        <div style={{ 'margin': '10px 20px 10px 0px' }}>
                                            <img src={this.props.app_state.theme['letter']} style={{ height: 30, width: 'auto' }} />
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
                <div style={{  }}>
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
                    {this.render_detail_item('3', { 'title': interactable_checker, 'details': this.props.app_state.loc['2205']/* 'Access Rights Status' */, 'size': 'l' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': this.get_sender_title_text(item.returnValues.p4, object), 'details': this.props.app_state.loc['2214']/* 'Moderator Account' */, 'size': 'l' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': this.get_time_difference(item.returnValues.p7), 'details': this.props.app_state.loc['2198']/* 'Age' */, 'size': 'l' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': item.returnValues.p8, 'details': this.props.app_state.loc['2206']/* 'Block Number' */, 'size': 'l' })}
                    <div style={{ height: '1px', 'background-color': this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px' }} />
                </div>
            )
        } else {
            return (
                <div>
                    {this.render_detail_item('3', { 'title': interactable_checker, 'details': this.props.app_state.loc['2205']/* Acces Rights Status' */, 'size': 'l' })}
                    <div style={{ height: 2 }} />
                </div>
            )
        }
    }













    render_interactable_accounts_logs(object){
        var he = this.props.height - 45
        // var object = this.get_contract_items()[this.props.selected_contract_item]
        return (
            <div style={{ 'background-color': 'transparent', 'border-radius': '15px', 'margin': '0px 0px 0px 0px', 'padding': '0px 0px 0px 0px',  }}>
                <div style={{ 'overflow-y': 'auto', height: he, padding: '5px 0px 5px 0px' }}>
                    <div style={{ padding: '5px 5px 5px 5px' }}>
                        {this.render_detail_item('3', { 'title':this.props.app_state.loc['2185']/*  'In Contract ' */ + object['id'], 'details': this.props.app_state.loc['2207']/* 'Contract  Account Access Settings Events' */, 'size': 'l' })}
                    </div>
                    <div style={{ height: '1px', 'background-color': this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px' }} />
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
                                    <div style={{ height: 60, width: '100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px', 'padding': '10px 0px 10px 10px',  'display': 'flex', 'align-items': 'center', 'justify-content': 'center' }}>
                                        <div style={{ 'margin': '10px 20px 10px 0px' }}>
                                            <img src={this.props.app_state.theme['letter']} style={{ height: 30, width: 'auto' }} />
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
                <div style={{  }}>
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
                    {this.render_detail_item('3', { 'title': this.get_sender_title_text(item.returnValues.p3, object), 'details': this.props.app_state.loc['2213']/* 'Targeted Account' */, 'size': 'l' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': this.get_sender_title_text(item.returnValues.p4, object), 'details': this.props.app_state.loc['2214']/* 'Moderator Account' */, 'size': 'l' })}
                    <div style={{ height: 2 }} />

                    {this.render_detail_item('3', { 'title': this.get_future_time_difference(item.returnValues.p6), 'details': this.props.app_state.loc['2208']/* 'Until: ' */+(new Date(item.returnValues.p6*1000)), 'size': 'l' })}
                    
                    {this.render_detail_item('3', { 'title': this.get_time_difference(item.returnValues.p7), 'details': this.props.app_state.loc['2198']/* 'Age' */, 'size': 'l' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': item.returnValues.p8, 'details': this.props.app_state.loc['2206']/* 'Block Number' */, 'size': 'l' })}
                    <div style={{ height: '1px', 'background-color': this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px' }} />
                </div>
            )
        } else {
            return (
                <div>
                    {this.render_detail_item('3', { 'title': this.get_sender_title_text(item.returnValues.p3, object), 'details': this.props.app_state.loc['2213']/* 'Targeted Account' */, 'size': 'l' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': this.get_future_time_difference(item.returnValues.p6), 'details': this.props.app_state.loc['2208']/* 'Until: ' */+(new Date(item.returnValues.p6*1000)), 'size': 'l' })}
                    <div style={{ height: '1px', 'background-color': this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px' }} />
                </div>
            )
        }
    }


















    render_blocked_accounts_logs(object){
        var he = this.props.height - 45
        // var object = this.get_contract_items()[this.props.selected_contract_item]
        return (
            <div style={{ 'background-color': 'transparent', 'border-radius': '15px', 'margin': '0px 0px 0px 0px', 'padding': '0px 0px 0px 0px',  }}>
                <div style={{ 'overflow-y': 'auto', height: he, padding: '5px 0px 5px 0px' }}>
                    <div style={{ padding: '5px 5px 5px 5px' }}>
                        {this.render_detail_item('3', { 'title': this.props.app_state.loc['2185']/* 'In Contract ' */ + object['id'], 'details': this.props.app_state.loc['2209']/* 'Contract  Blocked Account Events' */, 'size': 'l' })}
                    </div>
                    <div style={{ height: '1px', 'background-color': this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px' }} />
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
                                    <div style={{ height: 60, width: '100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px', 'padding': '10px 0px 10px 10px',  'display': 'flex', 'align-items': 'center', 'justify-content': 'center' }}>
                                        <div style={{ 'margin': '10px 20px 10px 0px' }}>
                                            <img src={this.props.app_state.theme['letter']} style={{ height: 30, width: 'auto' }} />
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
                <div style={{  }}>
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
                    {this.render_detail_item('3', { 'title': this.get_sender_title_text(item.returnValues.p3, object), 'details': this.props.app_state.loc['2106']/* 'Targeted Account' */, 'size': 'l' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': this.get_sender_title_text(item.returnValues.p4, object), 'details': this.props.app_state.loc['2107']/* 'Moderator Account' */, 'size': 'l' })}
                    <div style={{ height: 2 }} />

                    {this.render_detail_item('3', { 'title': this.get_future_time_difference(item.returnValues.p6), 'details': this.props.app_state.loc['2117']/* 'Until: ' */+(new Date(item.returnValues.p6*1000)), 'size': 'l' })}
                    
                    {this.render_detail_item('3', { 'title': this.get_time_difference(item.returnValues.p7), 'details': this.props.app_state.loc['2198']/* 'Age' */, 'size': 'l' })}
                    <div style={{ height: 2 }} />
                    {this.render_detail_item('3', { 'title': item.returnValues.p8, 'details': this.props.app_state.loc['2206']/* 'Block Number' */, 'size': 'l' })}
                    <div style={{ height: '1px', 'background-color': this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px' }} />
                </div>
            )
        } else {
            return (
                <div>
                    {this.render_detail_item('3', { 'title': this.get_sender_title_text(item.returnValues.p3, object), 'details': this.props.app_state.loc['2106']/* 'Targeted Account' */, 'size': 'l' })}
                    <div style={{ height: 2 }} />

                    {this.render_detail_item('3', { 'title': this.get_future_time_difference(item.returnValues.p6), 'details': this.props.app_state.loc['2117']/* 'Until: ' */+(new Date(item.returnValues.p6*1000)), 'size': 'l' })}
                    <div style={{ height: '1px', 'background-color': this.props.app_state.theme['line_color'], 'margin': '10px 20px 10px 20px' }} />
                </div>
            )
        }
    }






















    /* renders the specific element in the post or detail object */
    render_detail_item(item_id, object_data, contract_object) {
        var size = this.props.screensize
        var width = size == 'm' ? this.props.app_state.width / 2 : this.props.app_state.width
        return (
            <div>
                <ViewGroups graph_type={this.props.app_state.graph_type} font={this.props.app_state.font} item_id={item_id} object_data={object_data} theme={this.props.theme} width={width} when_contract_exchange_tapped={this.when_contract_exchange_tapped.bind(this)} object={contract_object} select_deselect_tag={this.props.select_deselect_tag.bind(this)} />
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

    calculate_bar_width(num) {
        var last_two_digits = num.toString().slice(0, 1)+'0';
        if(num > 10){
            last_two_digits = num.toString().slice(0, 2);
        }
        return last_two_digits+'%'
    }

    format_power_figure(amount) {
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
            var num = (Math.floor(diff/(60*60*24*7*53))).toLocaleString('fullwide', {useGrouping:false});
            var s = num > 1 ? 's': '';
            return this.format_account_balance_figure(num) + this.props.app_state.loc['34'] + s;
        }
    }


}




export default ContractDetailsSection;