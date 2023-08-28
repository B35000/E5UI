import React, { Component } from 'react';
import ViewGroups from './../components/view_groups'
import Tags from './../components/tags';
import Letter from './../assets/letter.png';

var bigInt = require("big-integer");


function bgN(number, power) {
  return bigInt((number+"e"+power)).toString();
}

function number_with_commas(x) {
    if(x == null) x = '';
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


class ContractDetailsSection extends Component {
    
    state = {
        selected: 0, navigate_view_contract_list_detail_tags_object: this.get_navigate_view_contract_list_detail_tags(),
    };

    get_navigate_view_contract_list_detail_tags(){
        return{
          'i':{
              active:'e', 
          },
          'e':[
              ['xor','',0], ['e','details','transactions'],[1]
          ],
        }
    }

    render(){
        return(
            <div>{this.render_contracts_list_detail()}</div>
        )
    }

    render_contracts_list_detail(){
        if(this.props.selected_contract_item == null){
            return(
                <div>
                    {this.render_empty_detail_object()}
                </div>
            )
        }else{
            return(
                <div>
                    {this.render_contract_details_section()}
                    <div style={{ width:'100%','padding':'0px 0px 0px 0px','margin':'0px 0px 20px 0px', 'max-width':'470px'}}>
                        <Tags page_tags_object={this.state.navigate_view_contract_list_detail_tags_object} tag_size={'l'} when_tags_updated={this.when_navigate_view_contract_list_detail_tags_object_updated.bind(this)} theme={this.props.theme}/>
                    </div>
                </div>
            )
        }
    }

    when_navigate_view_contract_list_detail_tags_object_updated(tag_obj){
        this.setState({navigate_view_contract_list_detail_tags_object: tag_obj})
    }

    get_selected_item(object, option){
        var selected_item = object[option][2][0]
        var picked_item = object[option][1][selected_item];
        return picked_item
    }


    render_contract_details_section(){
        var selected_item = this.get_selected_item(this.state.navigate_view_contract_list_detail_tags_object, this.state.navigate_view_contract_list_detail_tags_object['i'].active)

        if(selected_item == 'details'){
            return(
                <div>
                    {this.render_contracts_main_details_section()}
                </div>
            )
        }else if(selected_item == 'transactions'){
            return(
                <div>
                    {this.render_contracts_logs()}
                </div>
            )
            
        }
    }

    render_empty_detail_object(){
        var background_color = this.props.theme['card_background_color']
        var he = this.props.height
        var size = this.props.screensize
        if(size == 'm'){
            he = this.props.height-190;
        }
        return(
            <div style={{height:he, width:'100%', 'background-color': background_color, 'border-radius': '15px','padding':'10px 0px 0px 10px', 'max-width':'420px','display': 'flex', 'align-items':'center','justify-content':'center','margin':'0px 0px 20px 0px'}}>
                    <div style={{'margin':'10px 20px 0px 0px'}}>
                        <img src={Letter} style={{height:70 ,width:'auto'}} />
                        <p style={{'display': 'flex', 'align-items':'center','justify-content':'center', 'padding':'5px 0px 0px 7px', 'color': 'gray'}}></p>
                    </div>
                    
                </div>
        );
    }

    render_contracts_main_details_section(){
        var background_color = this.props.theme['card_background_color']
        var he = this.props.height-70
        var size = this.props.screensize
        if(size == 'm'){
            he = this.props.height-190;
        }
        var item = this.get_contract_details_data()
        var object = this.get_contract_items()[this.props.selected_contract_item]
        return(
            <div style={{ width:'99%', 'background-color': background_color, 'border-radius': '15px','margin':'5px 10px 20px 10px', 'padding':'0px 10px 0px 10px', 'max-width':'470px'}}>
                <div style={{ 'overflow-y': 'auto', width:'100%', height: he, padding:'0px 10px 0px 10px'}}>
                    {this.render_detail_item('1', item['tags'])}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', item['id'])}
                    <div style={{height: 10}}/>
                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>
                        {this.render_detail_item('2', item['age'])}
                    </div>
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', item['default_vote_bounty_split_proportion'])}

                    <div style={{height: 10}}/>
                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>
                        {this.render_detail_item('2', item['default_minimum_end_vote_bounty_amount'])}
                    </div>

                    <div style={{height: 10}}/>
                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>
                        {this.render_detail_item('2', item['default_minimum_spend_vote_bounty_amount'])}
                    </div>
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', item['default_proposal_expiry_duration_limit'])}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', item['max_enter_contract_duration'])}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', item['auto_wait_for_all_proposals_for_all_voters'])}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', item['proposal_modify_expiry_duration_limit'])}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', item['can_modify_contract_as_moderator'])}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', item['can_extend_enter_contract_at_any_time'])}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', item['maximum_proposal_expiry_submit_expiry_time_difference'])}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', item['bounty_limit_type'])}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', item['contract_force_exit_enabled'])}
                    
                    {this.render_detail_item('0')}
                    {this.render_detail_item('3', item['entry_fees'])}
                    <div style={{height: 10}}/>
                    {this.render_buy_token_uis(object['data'][2], object['data'][3], object['data'][4])}
                    {this.render_detail_item('0')}

                    {this.show_enter_contract_button()}

                    {this.render_detail_item('0')}
                    {this.render_detail_item('3', {'size':'l', 'details':'Send a proposal to the contract to perform a specified action', 'title':'Send Proposal'})}
                    <div style={{height:10}}/>

                    <div onClick={()=> this.open_new_proposal_ui()}>
                        {this.render_detail_item('5', {'text':'Send', 'action':''},)}
                    </div>

                    {this.render_auth_modify_button()}

                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            </div>
        )
    }

    show_enter_contract_button(){
        var object = this.get_contract_items()[this.props.selected_contract_item]
        var contract_config = object['data'][1]
        if(object['id'] != 2){
            return(
                <div>
                    {this.show_entered_contract_data()}
                    <div style={{height:10}}/>

                    {this.render_detail_item('3', {'size':'l', 'details':'Enter a contract to participate in its consensus', 'title':'Enter Contract'})}
                    <div style={{height:10}}/>

                    <div onClick={()=>this.open_enter_contract_ui()}>
                        {this.render_detail_item('5', {'text':'Enter', 'action':''},)}
                    </div>
                    
                    <div style={{height:10}}/>


                    {this.render_detail_item('0')}

                    {this.render_detail_item('3', {'size':'l', 'details':'Max Extend Enter Contract Limit', 'title':this.get_time_diff(contract_config[2])})}
                    <div style={{height:10}}/>

                    {this.render_detail_item('3', {'size':'l', 'details':'Extend your stay in the contract', 'title':'Extend Stay'})}
                    <div style={{height:10}}/>

                    <div onClick={()=>this.open_extend_contract_ui()}>
                        {this.render_detail_item('5', {'text':'Extend', 'action':''},)}
                    </div>


                    {this.render_detail_item('0')}

                    {this.render_detail_item('3', {'size':'l', 'details':'Exit from the contract and no longer participate in its consensus', 'title':'Exit Contract'})}
                    <div style={{height:10}}/>

                    <div onClick={()=>this.open_exit_contract_ui()}>
                        {this.render_detail_item('5', {'text':'Exit', 'action':''},)}
                    </div>
                    
                </div>
            )
        }
    }


    show_entered_contract_data(){
        var object = this.get_contract_items()[this.props.selected_contract_item]
        var expiry_time_in_seconds = object['entry_expiry']
        var time_to_expiry =  expiry_time_in_seconds - Math.floor(new Date() / 1000);

        if(expiry_time_in_seconds != 0){
            return(
                <div>
                    {this.render_detail_item('3', {'size':'l', 'details':'Until: '+(new Date(expiry_time_in_seconds*1000)), 'title':'Entry Exipry Time'})}
                    <div style={{height:10}}/>

                    {this.render_detail_item('3', {'size':'l', 'details':''+(this.get_time_diff(time_to_expiry)), 'title':'Time remaining'})}
                </div>
            )
        }
    }

    render_auth_modify_button(){
        var object = this.get_contract_items()[this.props.selected_contract_item]
        var contract_config = object['data'][1]
        var my_account = this.props.app_state.user_account_id
        if(object['id'] != 2 && object['event'].returnValues.p3 == my_account && contract_config[28/* can_modify_contract_as_moderator */] == 1){
            return(
                <div>
                    {this.render_detail_item('0')}

                    {this.render_detail_item('3', {'title':'Modify Contract', 'details':'Modify the configuration of the contract directly.', 'size':'l'})}
                    <div style={{height:10}}/>
                    <div onClick={()=>this.open_modify_contract_ui()}>
                        {this.render_detail_item('5', {'text':'Modify Subscription', 'action':''})}
                    </div>
                </div>
            )
        }
    }

    open_enter_contract_ui(){
        var object = this.get_contract_items()[this.props.selected_contract_item]
        this.props.open_enter_contract_ui(object)
    }

    open_extend_contract_ui(){
        var object = this.get_contract_items()[this.props.selected_contract_item]
        this.props.open_extend_contract_ui(object)
    }

    open_exit_contract_ui(){
        var object = this.get_contract_items()[this.props.selected_contract_item]
        this.props.open_exit_contract_ui(object)
    }

    open_new_proposal_ui(){
        var object = this.get_contract_items()[this.props.selected_contract_item]
        this.props.open_new_proposal_ui(object)
    }

    open_modify_contract_ui(){
        var object = this.get_contract_items()[this.props.selected_contract_item]
        this.props.open_modify_contract_ui(object)
    }


    get_contract_details_data(){
        var object = this.get_contract_items()[this.props.selected_contract_item]
        var tags = object['ipfs'] == null ? ['Contract'] : object['ipfs'].entered_indexing_tags
        var title = object['ipfs'] == null ? 'Contract ID' : object['ipfs'].entered_title_text
        var age = object['event'] == null ? 0 : object['event'].returnValues.p5
        var contract_config = object['data'][1]
        var auto_wait = contract_config[8] == 0 ? 'false' : 'true'
        var can_modify_contract_as_moderator = contract_config[28] == 0 ? 'false' : 'true'
        var can_extend_enter_contract_at_any_time = contract_config[29] == 0 ? 'false' : 'true'
        var bounty_limit_type = contract_config[37] == 0 ? 'relative' : 'absolute'
        var contract_force_exit_enabled = contract_config[38] == 0 ? 'disabled': 'enabled'
        return{
            'tags':{'active_tags':tags, 'index_option':'indexed'},
            'id':{'title':object['id'], 'details':title, 'size':'l'},
            'age':{ 'style':'l', 'title':'Block ID', 'subtitle':'??', 'barwidth':this.get_number_width(age), 'number':`${number_with_commas(age)}`, 'barcolor':'', 'relativepower':'block', },

            'default_vote_bounty_split_proportion': {'title':this.format_proportion(contract_config[1]), 'details':'Vote Bounty Split Proportion', 'size':'l'},

            'default_minimum_end_vote_bounty_amount':{'style':'l','title':'Minimum End Bounty Amount', 'subtitle':this.format_power_figure(contract_config[4]), 'barwidth':this.calculate_bar_width(contract_config[4]), 'number':this.format_account_balance_figure(contract_config[4]), 'relativepower':'tokens'},

            'default_minimum_spend_vote_bounty_amount':{'style':'l','title':'Minimum Spend Bounty Amount', 'subtitle':this.format_power_figure(contract_config[10]), 'barwidth':this.calculate_bar_width(contract_config[10]), 'number':this.format_account_balance_figure(contract_config[10]), 'relativepower':'tokens'},

            'default_proposal_expiry_duration_limit': {'title':this.get_time_diff(contract_config[5]), 'details':'Proposal Expiry Duration Limit', 'size':'l'},

            'max_enter_contract_duration': {'title':this.get_time_diff(contract_config[6]), 'details':'Max Enter Contract Duration', 'size':'l'},

            'auto_wait_for_all_proposals_for_all_voters': {'title':auto_wait, 'details':'Auto Wait For All Proposals For All Voters', 'size':'l'},

            'proposal_modify_expiry_duration_limit': {'title':this.get_time_diff(contract_config[27]), 'details':'Proposal Modify Expiry Duration Limit', 'size':'l'},

            'can_modify_contract_as_moderator': {'title':can_modify_contract_as_moderator, 'details':'Can Modify Contract As Moderator', 'size':'l'},

            'can_extend_enter_contract_at_any_time': {'title':can_extend_enter_contract_at_any_time, 'details':'Can Extend Enter Contract At Any Time', 'size':'l'},

            'maximum_proposal_expiry_submit_expiry_time_difference': {'title':this.get_time_diff(contract_config[36]), 'details':'Maximum Proposal Expiry Submit Expiry Time Difference', 'size':'l'},

            'bounty_limit_type': {'title':bounty_limit_type, 'details':'Bounty Limit Type', 'size':'l'},

            'contract_force_exit_enabled': {'title':contract_force_exit_enabled, 'details':'Contract Force Exit', 'size':'l'},

            'entry_fees': {'title':'Entry Fees', 'details':object['data'][2].length+' tokens used', 'size':'l'},
        }
    }


    get_contract_items(){
        var selected_option_name = this.get_selected_item(this.props.work_page_tags_object, this.props.work_page_tags_object['i'].active)

        if(this.props.work_page_tags_object['i'].active != 'contracts'){
            return this.props.app_state.created_contracts
        }

        if(selected_option_name == 'all'){
            return this.props.app_state.created_contracts
        }
        else if(selected_option_name == 'viewed'){
            var my_viewed_contracts = []
            for(var i=0; i<this.props.viewed_contracts.length; i++){
                my_viewed_contracts.push(this.props.app_state.created_contracts[this.props.viewed_contracts[i]])
            }
            return my_viewed_contracts
        }
        else if(selected_option_name == 'received'){
            return this.props.app_state.created_contracts
        }
        else {
            var my_contracts = []
            var myid = this.props.app_state.user_account_id
            for(var i = 0; i < this.props.app_state.created_contracts.length; i++){
                var post_author = this.props.app_state.created_contracts[i]['event'] == null ? 0 : this.props.app_state.created_contracts[i]['event'].returnValues.p3
                if(post_author.toString() == myid.toString()){
                    my_contracts.push(this.props.app_state.created_contracts[i])
                }else{
                    console.log('sender not post author: author->'+post_author+', sender id->'+myid)
                }
            }
            return my_contracts
        }
    }

    render_buy_token_uis(buy_tokens, buy_amounts, buy_depths){
        return(
            <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px', overflow: 'auto' }}>
                <ul style={{ 'padding': '0px 0px 0px 0px', 'margin':'0px'}}>
                    {buy_tokens.map((item, index) => (
                        <li style={{'padding': '1px'}}>
                            {this.render_detail_item('2', {'style':'l','title':'Token ID: '+item, 'subtitle':'depth: '+buy_depths[index], 'barwidth':this.calculate_bar_width(buy_amounts[index]), 'number':this.format_account_balance_figure(buy_amounts[index]), 'relativepower':'tokens'})}
                        </li>
                    ))}
                </ul>
            </div>
            
        )
    }


    render_contracts_logs(){

    }

    /* renders the specific element in the post or detail object */
    render_detail_item(item_id, object_data){
        var size = this.props.screensize
        var width = size == 'm' ? this.props.app_state.width/2 : this.props.app_state.width
        return(
            <div>
                <ViewGroups item_id={item_id} object_data={object_data}  theme={this.props.theme} width={width}/>
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

    get_number_width(number){
        var last_two_digits = number.toString().slice(0, 1)+'0';
        if(number > 10){
            last_two_digits = number.toString().slice(0, 2);
        }
        return last_two_digits+'%'
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

    format_proportion(proportion){
        return ((proportion/10**18) * 100)+'%';
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
            return number_with_commas(num) + ' yr' + s;
        }
    }


}




export default ContractDetailsSection;