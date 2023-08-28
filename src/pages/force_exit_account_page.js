import React, { Component } from 'react';
import ViewGroups from './../components/view_groups'
import Tags from './../components/tags';
import TextInput from './../components/text_input';
import NumberPicker from './../components/number_picker';

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

class ForceExitPage extends Component {
    
    state = {
        selected: 0,id: makeid(32), type:'force-exit', entered_indexing_tags:['force', 'exit', 'accounts'],
        contract_item: {'data':[[],[0,0,0,0,0,0,0,0,0,0]], 'participants':[]},
        new_force_exit_title_tags_object:this.get_new_force_exit_title_tags_object(),

        force_exit_target:'', force_exit_accounts:[]
    };

    get_new_force_exit_title_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['or','',0], ['e','force-exit'], [0]
            ],
        };
    }

    render(){
        return(
            <div style={{'padding':'10px 20px 0px 10px'}}>
                <div className="row">
                    <div className="col-9" style={{'padding': '5px 0px 0px 10px'}}>
                        <Tags page_tags_object={this.state.new_force_exit_title_tags_object} tag_size={'l'} when_tags_updated={this.when_new_force_exit_title_tags_object_updated.bind(this)} theme={this.props.theme}/>
                    </div>
                    <div className="col-3" style={{'padding': '0px 0px 0px 0px'}}>
                        <div style={{'padding': '5px'}} onClick={()=>this.finish()}>
                            {this.render_detail_item('5', {'text':'Finish', 'action':''})}
                        </div>
                    </div>
                </div>

                <div style={{height: 10}}/>
                {this.render_detail_item('4', {'font':'Sans-serif', 'textsize':'13px', 'text':'Run a force edit action for the contract ID: '+this.state.contract_item['id']})}

                <div style={{'margin':'20px 0px 0px 0px'}}>
                    {this.render_everything()}   
                </div>
                
            </div>
        )
    }

    when_new_force_exit_title_tags_object_updated(tag_obj){
        this.setState({new_force_exit_title_tags_object: tag_obj})
    }



    render_everything(){
        return(
            <div>
                {this.render_detail_item('3', {'title':'Target Account', 'details':'Set the account ID to remove', 'size':'l'})}
                <div style={{height:20}}/>
                <TextInput height={30} placeholder={'Target Account...'} when_text_input_field_changed={this.when_force_exit_target_text_input_field_changed.bind(this)} text={this.state.force_exit_target} theme={this.props.theme}/>

                {this.load_account_suggestions()}
                <div style={{height:20}}/>
                <div style={{'padding': '5px'}} onClick={()=>this.add_force_exit_item()}>
                    {this.render_detail_item('5', {'text':'Add Force Exit Action', 'action':''})}
                </div>


                {this.load_transfer_actions()}

            </div>
        )
    }

    when_force_exit_target_text_input_field_changed(text){
        this.setState({force_exit_target: text})
    }

    add_force_exit_item(){
        var account = this.state.force_exit_target

        if(!this.state.contract_item['participants'].includes(account)){
            this.props.notify('That account isnt part of the contract', 600)
        }
        else if(this.state.force_exit_accounts.includes(account)){
            this.props.notify('you cant force exit an account twice', 600)
        }
        else{
            var force_exit_accounts_clone = this.state.force_exit_accounts.slice()
            force_exit_accounts_clone.push(account)
            this.setState({force_exit_accounts: force_exit_accounts_clone, force_exit_target: ''})
        }
    }


    load_transfer_actions(){
        var middle = this.props.height-100;
        var size = this.props.size;
        if(size == 'm'){
            middle = this.props.height-100;
        }
        var items = this.state.force_exit_accounts

        if(items.length == 0){
            items = [0,3,0]
            return(
                <div style={{overflow: 'auto', maxHeight: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.map((item, index) => (
                            <li style={{'padding': '5px'}} onClick={()=>console.log()}>
                                <div style={{height:60, width:'100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px','padding':'0px 0px 0px 10px', 'max-width':'420px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                                    <div style={{'margin':'0px 20px 0px 0px'}}>
                                        <img src={Letter} style={{height:20 ,width:'auto'}} />
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
                            <li style={{'padding': '5px'}} onClick={()=>this.when_force_exit_value_clicked(item)}>
                                <div style={{height:5}}/>
                                {this.render_detail_item('3', {'title':'Account ID: '+item, 'details':'Contract ID: '+this.state.contract_item['id'], 'size':'s'})}
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
    }

    when_force_exit_value_clicked(item){
        var cloned_array = this.state.force_exit_accounts.slice()
        const index = cloned_array.indexOf(item);
        if (index > -1) { // only splice array when item is found
            cloned_array.splice(index, 1); // 2nd parameter means remove one item only
        }
        this.setState({force_exit_accounts: cloned_array})
        this.props.notify('force exit action removed!', 600)
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
        var accounts = this.state.contract_item['participants']
        var obj = []
        for(var i=0; i<accounts.length; i++){
            obj.push({'id':''+accounts[i], 'label':{'title':'Account '+accounts[i], 'details':'Account', 'size':'s'}})
        }
        return obj
        
    }

    when_suggestion_clicked(item, pos){
        this.setState({force_exit_target: item['id']})
    }



    set_contract(contract_item){
        this.setState({contract_item: contract_item})
    }

    finish(){
        if(this.state.force_exit_accounts.length == 0){
            this.props.notify('you cant stack no changes', 700)
        }else{
            this.props.add_force_exit_to_stack(this.state)
            this.setState({force_exit_accounts:[]})
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




export default ForceExitPage;