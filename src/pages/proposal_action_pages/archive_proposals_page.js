import React, { Component } from 'react';
import ViewGroups from '../../components/view_groups'
import Tags from '../../components/tags';
import TextInput from '../../components/text_input';

import Letter from '../../assets/letter.png';

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

class ArchiveProposalPage extends Component {
    
    state = {
        selected: 0, id:makeid(8), type:'archive', object_item:{'id':'', 'end_balance':0, 'spend_balance':0, 'archive_accounts':0, 'data':[[],[0,0,0,0,0,0,0,0,0,0,0,]]}, entered_indexing_tags:['archive', 'object'],

        archive_proposal_title_tags_object: this.get_archive_proposal_title_tags_object(),
        bounty_target:'', bounty_exchanges:[]
    };

    get_archive_proposal_title_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e','archive-object'], [1]
            ],
        };
    }

    render(){
        return(
            <div>
                <div style={{'padding':'10px 20px 0px 10px'}}>
                    <div className="row">
                        <div className="col-9" style={{'padding': '5px 0px 0px 10px'}}>
                            <Tags page_tags_object={this.state.archive_proposal_title_tags_object} tag_size={'l'} when_tags_updated={this.when_archive_proposal_title_tags_object_updated.bind(this)} theme={this.props.theme}/>
                        </div>
                        <div className="col-3" style={{'padding': '0px 0px 0px 0px'}}>
                            <div style={{'padding': '5px'}} onClick={()=>this.finish()}>
                                {this.render_detail_item('5', {'text':'Finish', 'action':''})}
                            </div>
                        </div>
                    </div>
                    <div style={{height:10}}/>
                    {this.render_detail_item('4', {'text':'Archive your specified contract or proposal ID: '+this.state.object_item['id'], 'textsize':'14px', 'font':'Sans-serif'})} 
                    <div style={{height:10}}/>
                    {this.render_everything()}
                </div>

                
            </div>
        )
    }

    when_archive_proposal_title_tags_object_updated(tag_obj){
        this.setState({archive_proposal_title_tags_object: tag_obj})
    }

    render_everything(){
        var object = this.state.object_item
        return(
            <div>
                {this.render_detail_item('3', {'title':this.state.object_item['archive_accounts'].length+' accounts', 'details':'The number of participants in the proposal /contract.', 'size':'l'})}
                
                <div style={{height:10}}/>
                <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                    {this.render_detail_item('2', {'style':'l', 'title':'End Bounty Balance', 'subtitle':'End', 'barwidth':this.get_number_width(object['end_balance']), 'number':`${number_with_commas(object['end_balance'])}`, 'barcolor':'', 'relativepower':'END', })}
                </div>

                <div style={{height:10}}/>
                <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                    {this.render_detail_item('2', {'style':'l', 'title':'Spend Bounty Balance', 'subtitle':'Spend', 'barwidth':this.get_number_width(object['spend_balance']), 'number':` ${number_with_commas(object['spend_balance'])}`, 'barcolor':'', 'relativepower':`SPEND`, })}
                </div>

                {this.render_detail_item('0')}

                {this.render_detail_item('3', {'title':'Bounty Exchanges', 'details':'Specify Bounty Exchange to collect the contracts/proposals remaining balance', 'size':'l'})}
                
                <div style={{height:10}}/>
                <TextInput height={30} placeholder={'Target Exchange ID...'} when_text_input_field_changed={this.when_bounty_target_text_input_field_changed.bind(this)} text={this.state.bounty_exchange_target} theme={this.props.theme}/>
                <div style={{height:10}}/>
                {this.load_token_suggestions('bounty_exchange_target')}

                <div style={{height:10}}/>
                <div onClick={()=>this.add_bounty_exchange_item()}>
                    {this.render_detail_item('5', {'text':'Add Bounty Exchange', 'action':''})}
                </div>

                {this.render_detail_item('0')}
                {this.render_bounty_exchanges()}
            </div>
        )
    }

    when_bounty_target_text_input_field_changed(text){
        this.setState({bounty_target: text})
    }

    add_bounty_exchange_item(){
        var exchange = this.state.bounty_exchange_target.trim()

        if(isNaN(exchange) || parseInt(exchange) < 0 || exchange == ''){
            this.props.notify('please put a valid exchange id', 600)
        }
        else if(this.includes_function(exchange)){
            this.props.notify('you cant include the same exchange more than once', 600)
        }
        else{
            var tx = {'exchange': exchange}
            var bounty_exchanges_clone = this.state.bounty_exchanges.slice()
            bounty_exchanges_clone.push(tx)
            this.setState({bounty_exchanges: bounty_exchanges_clone, bounty_exchange_target:''})
            this.props.notify('bounty exchange added!', 600)
        }
    }

    includes_function(exchange){
        var includes = false
        for(var i=0; i<this.state.bounty_exchanges.length; i++){
            var exchange_included = this.state.bounty_exchanges[i]['exchange']
            if(exchange_included == exchange){
                includes = true
            }
        }
        return includes;
    }


    render_bounty_exchanges(){
        var middle = this.props.height-100;
        var size = this.props.size;
        if(size == 'm'){
            middle = this.props.height-100;
        }
        var items = [].concat(this.state.bounty_exchanges)

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
                            <li style={{'padding': '5px'}} onClick={()=>this.when_when_exchange_clicked(item)}>
                                {this.render_detail_item('3', {'title':'Bounty Exchange ID: '+item['exchange'], 'details':'Default depth 0', 'size':'s'})}
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
    }

    when_when_exchange_clicked(item){
        var cloned_array = this.state.bounty_exchanges.slice()
        const index = cloned_array.indexOf(item);
        if (index > -1) { // only splice array when item is found
            cloned_array.splice(index, 1); // 2nd parameter means remove one item only
        }
        this.setState({bounty_exchanges: cloned_array})
        this.props.notify('bounty exchange removed!', 600)
    }



    load_token_suggestions(type){
        var items = [].concat(this.get_suggested_exchange_accounts(type))
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

    get_suggested_exchange_accounts(type){
        var items = [
            {'id':'3', 'label':{'title':'END', 'details':'Account 3', 'size':'s'}},
            {'id':'5', 'label':{'title':'SPEND', 'details':'Account 5', 'size':'s'}},
        ];
        var exchanges_from_sync = this.props.app_state.created_tokens[this.state.object_item['e5']]
        var sorted_token_exchange_data = []
        if(exchanges_from_sync == null){
            exchanges_from_sync = [];
        } 
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

    when_suggestion_clicked(item, pos, type){
        if(type == 'bounty_exchange_target'){
            this.setState({bounty_exchange_target: item['id']})
        }

    }


    set_object(proposal){
        if(this.state.object_item['id'] != proposal['id']){
            this.setState({
                selected: 0, id:makeid(8), type:'archive', object_item:{'id':0, 'end_balance':0, 'spend_balance':0, 'archive_accounts':0, 'data':[[],[0,0,0,0,0,0,0,0,0,0,0,]]}, entered_indexing_tags:['archive', 'object'],
                archive_proposal_title_tags_object: this.get_archive_proposal_title_tags_object(),
                bounty_target:'', bounty_exchanges:[]
            })
        }
        this.setState({object_item: proposal, e5: proposal['e5']})
    }

    finish(){
        this.props.add_archive_proposal_action_to_stack(this.state)
        this.props.notify('transaction added to stack!', 600)
    }


    /* renders the specific element in the post or detail object */
    render_detail_item(item_id, object_data){
        return(
            <div>
                <ViewGroups item_id={item_id} object_data={object_data} theme={this.props.theme} width={this.props.app_state.width} />
            </div>
        )

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
            return number_with_commas(num) + ' yr' + s;
        }
    }

}




export default ArchiveProposalPage;