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

var bigInt = require("big-integer");

function bgN(number, power) {
  return bigInt((number+"e"+power)).toString();
}

function number_with_commas(x) {
    if(x == null) x = '';
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function start_and_end(str) {
    if (str.length > 13) {
      return str.substr(0, 6) + '...' + str.substr(str.length-6, str.length);
    }
    return str;
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

class VotePollPage extends Component {
    
    state = {
        selected: 0, id:makeid(8), poll_object:null, get_title_tags_object:this.get_title_tags_object(), e5: this.props.app_state.selected_e5, candidate_preference:[], type: this.props.app_state.loc['3073']/* 'vote-poll' */, entered_indexing_tags:[this.props.app_state.loc['3073i']/* 'vote' */, this.props.app_state.loc['3073j']/* 'poll' */, this.props.app_state.loc['3073k']/* 'participate' */]
    };

    set_data(object){
        this.setState({poll_object: object})
    }

    get_title_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e',this.props.app_state.loc['3073']/* 'vote-poll' */], [1]
            ],
        };
    }

    render(){
        return(
            <div style={{'padding':'10px 15px 0px 15px'}}>
                <div className="row" style={{'width':'102%'}}>
                    <div className="col-11" style={{'padding': '0px 0px 0px 10px'}}>
                        <Tags font={this.props.app_state.font} page_tags_object={this.state.get_title_tags_object} tag_size={'l'} when_tags_updated={this.when_get_title_tags_object_updated.bind(this)} theme={this.props.theme}/>
                    </div>
                    <div className="col-1" style={{'padding': '0px 0px 0px 0px'}}>
                        <div className="text-end" style={{'padding': '0px 10px 0px 0px'}} >
                            <img alt="" className="text-end" onClick={()=>this.finish_vote_poll()} src={this.props.theme['close']} style={{height:36, width:'auto'}} />
                        </div>
                    </div>
                </div>

                {this.render_everything()}
            </div>
        )
    }


    when_get_title_tags_object_updated(tag_obj){
        this.setState({get_title_tags_object: tag_obj})
    }


    render_everything(){
        if(this.state.poll_object == null) return;

        var size = this.props.size
        if(size == 's'){
            return(
                <div>
                    {this.render_poll_details()}
                    {this.render_detail_item('0')}
                    {this.render_poll_details2()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_poll_details()}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_poll_details2()}
                    </div>
                </div>
                
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_poll_details()}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_poll_details2()}
                    </div>
                </div>
                
            )
        }
    }

    render_poll_details(){
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['3073a']/* 'Vote in Poll.' */, 'details':this.props.app_state.loc['3073b']/* 'Participate in this poll by casting your vote.' */, 'size':'l'})}
                {this.show_message_if_private(this.state.poll_object)}
                <div style={{height:10}}/>
                {this.render_poll_object()}
                {this.render_detail_item('0')}

                
                {this.render_detail_item('3', {'title':this.props.app_state.loc['c311cb']/* 'Participation E5s.' */, 'details':this.props.app_state.loc['3073e']/* 'Pick the account you registered with in this poll.' */, 'size':'l'})}
                <div style={{height:10}}/>
                {this.load_my_e5_accounts()}
                {this.render_switch_message()}
                
            </div>
        )
    }

    render_poll_details2(){
        return(
            <div>
                {this.render_detail_item('4', {'text':this.props.app_state.loc['3073c']/* 'Select the candidates listed below in the order of your preference. Your most preferred candidate will be listed on the left.' */, 'textsize':'13px', 'font':this.props.app_state.font})}
                {this.render_my_selected_candidates()}
                <div style={{height:20}}/>
                {this.render_added_candidates()}
            </div>
        )
    }

    render_switch_message(){
        if(this.props.app_state.selected_e5 != this.state.e5){
            return(
                <div>
                    {this.render_detail_item('10', {'text':this.props.app_state.loc['3073f']/* 'Youll need to switch to the accounts E5 to make this transaction in your next run.' */, 'textsize':'11px', 'font':this.props.app_state.font})}
                </div>
            )
        }
    }

    show_message_if_private(object){
        var participants_count = object['ipfs'].participants.length
        object['ipfs'].csv_files.forEach(file => {
            participants_count += file['data'].account_entries;
        });
        object['ipfs'].json_files.forEach(file => {
            participants_count += file['data'].account_entries
        });
        if(participants_count != 0){
            return(
                <div>
                    {this.render_detail_item('10', {'text':this.props.app_state.loc['3072l']/* 'If you werent registered for this poll, your vote will be discarded during counting. Be advised.' */, 'textsize':'11px', 'font':this.props.app_state.font})}
                </div>
            )
        }
    }

    render_poll_object(){
        var object = this.state.poll_object
        var background_color = this.props.theme['card_background_color']
        var card_shadow_color = this.props.theme['card_shadow_color']
        var item = this.format_poll_item(object)
        var opacity = 1.0
        return(
            <div  style={{height:'auto', opacity:opacity, width:'100%', 'background-color': background_color, 'border-radius': '15px','padding':'5px 5px 0px 0px', 'box-shadow': '0px 0px 1px 2px '+card_shadow_color}}>
                <div style={{'padding': '0px 0px 0px 5px'}}>
                    {this.render_detail_item('1', item['tags'])}
                    <div style={{height: 10}}/>
                    <div style={{'padding': '0px 0px 0px 0px'}}>
                        {this.render_detail_item('3', item['id'])}
                    </div>
                    <div style={{'padding': '20px 0px 0px 0px'}}>
                        {this.render_detail_item('2', item['age'])}
                    </div>
                    
                </div>         
            </div>
        )
    }

    format_poll_item(object){
        var tags = object['ipfs'] == null ? ['Post'] : [].concat(object['ipfs'].entered_indexing_tags)
        var title = object['ipfs'] == null ? 'Post ID' : object['ipfs'].entered_title_text
        var age = object['event'] == null ? 0 : object['event'].returnValues.p7
        var time = object['event'] == null ? 0 : object['event'].returnValues.p6
        var sender = this.get_senders_name2(object['event'].returnValues.p5, object);
        return {
            'tags':{'active_tags':tags, 'index_option':'indexed', 'selected_tags':this.props.app_state.explore_section_tags, 'when_tapped':'select_deselect_tag'},
            'id':{'title':' • '+object['id']+sender, 'details':title, 'size':'l', 'title_image':this.props.app_state.e5s[object['e5']].e5_img, 'border_radius':'0%'},
            'age':{'style':'s', 'title':'Block Number', 'subtitle':'??', 'barwidth':this.get_number_width(age), 'number':` ${number_with_commas(age)}`, 'barcolor':'', 'relativepower':`${this.get_time_difference(time)}`, },
            'min':{'details':object['e5']+' • '+object['id']+sender, 'title':title, 'size':'l', 'border_radius':'0%'}
        }
    }

    get_senders_name2(sender, object){
        // var object = this.get_mail_items()[this.props.selected_mail_item];
        if(sender == this.props.app_state.user_account_id[object['e5']]){
            return ' • '+this.props.app_state.loc['1694']/* 'You' */
        }else{
            var alias = (this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[sender] == null ? '' : ' • '+this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[sender])
            return alias
        }
    }

    render_my_selected_candidates(){
        var items = this.state.candidate_preference
        if(items.length == 0){
            items = [1, 2, 3]
            return(
                <div style={{'margin':'3px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent', height:48}}>
                    <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden', 'scrollbar-width': 'none'}}>
                        {items.map((item, index) => (
                            <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}}>
                                <div style={{height:47, width:97, 'background-color': this.props.theme['card_background_color'], 'border-radius': '8px','padding':'10px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                                    <div style={{'margin':'0px 0px 0px 0px'}}>
                                        <img alt="" src={this.props.app_state.theme['letter']} style={{height:20 ,width:'auto'}} />
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
        return(
            <div style={{'margin':'3px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent', height:48}}>
                <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                    {items.map((item, index) => (
                        <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}} onClick={() => this.when_candidate_tapped(index)}>
                            {this.render_detail_item('3', {'title':start_and_end(item['name']), 'details':this.props.app_state.loc['3073d']/* 'Pick $' */.replace('$', index+1), 'size':'l'})}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    when_candidate_tapped(index){
        var cloned_array = this.state.candidate_preference.slice()
        if (index > -1) { // only splice array when item is found
            cloned_array.splice(index, 1); // 2nd parameter means remove one item only
        }
        this.setState({candidate_preference: cloned_array})
    }

    render_added_candidates(){
        var items = [].concat(this.state.poll_object['ipfs'].candidates)
        if(items.length == 0){
            items = [0,3,0]
            return(
                <div style={{}}>
                    {this.render_empty_views(3)}
                </div>
            )
        }else{
            return(
                <div style={{}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.reverse().map((item, index) => (
                            <div style={{'padding': '3px'}} >
                                {this.render_candidate_choice(item)}
                            </div>
                        ))}
                    </ul>
                </div>
            )
        }
    }

    render_candidate_choice(candidate){
        const includes = this.state.candidate_preference.find(e => e['name'] === candidate['name'])
        var opacity = 0.6
        if(includes == null){
            opacity = 1.0
        }
        return(
            <div style={{'opacity':opacity}} onClick={() => this.when_candidate_option_tapped(candidate)}>
                {this.render_detail_item('4', {'text':candidate['name'], 'textsize':'13px', 'font':this.props.app_state.font})}
            </div>
        )
    }

    when_candidate_option_tapped(item){
        var clone = this.state.candidate_preference.slice();
        var index = clone.findIndex(candidate => candidate['name'] === item['name'])
        if(index != -1){
            clone.splice(index, 1)
        }else{
            clone.push(item)
        }
        this.setState({candidate_preference: clone})
    }


    load_my_e5_accounts(){
        var items = this.load_active_e5_accounts()
        return(
            <div style={{'margin':'3px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                    {items.map((item, index) => (
                        <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}} onClick={()=>this.when_e5_clicked(item)}>
                            {this.render_e5_item(item)}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    load_active_e5_accounts(){
        var active_e5s = this.load_active_e5s()
        var accounts = []
        active_e5s.forEach(e5 => {
            var account_id = this.props.app_state.user_account_id[e5]
            var associated_alias = this.get_senders_name(account_id, e5)
            if(account_id == null || account_id == 1){
                account_id = start_and_end('0x00')
            }
            accounts.push({'id':account_id, 'alias':associated_alias, 'e5':e5})
        });
        return accounts
    }

    load_active_e5s(){
        var active_e5s = []
        var preferred_e5s = this.state.poll_object['ipfs'].poll_e5s
        for(var i=0; i<this.props.app_state.e5s['data'].length; i++){
            var e5 = this.props.app_state.e5s['data'][i]
            if(this.props.app_state.e5s[e5].active == true && preferred_e5s.includes(e5)){
                active_e5s.push(e5)
            }
        }
        return active_e5s
    }

    get_senders_name(sender, e5){
        var obj = this.props.app_state.alias_bucket[e5]
        var alias = (obj[sender] == null ? '~~~~' : obj[sender])
        return alias
    }

    render_e5_item(item){
        var image = this.props.app_state.e5s[item['e5']].e5_img
        var details = item['alias']
        var title = item['id']
        if(this.state.e5 == item['e5']){
            return(
                <div>
                    {this.render_detail_item('12', {'title':title, 'image':image,'details':details, 'size':'s'})}
                    <div style={{height:'1px', 'background-color':this.props.app_state.theme['line_color'], 'margin': '3px 5px 0px 5px'}}/>
                </div>
            )
        }else{
            return(
                <div>
                    {this.render_detail_item('12', {'title':title, 'image':image, 'details':details, 'size':'s'})}
                </div>
            )
        }
    }

    when_e5_clicked(item){
        this.setState({e5: item['e5']})
    }







    finish_vote_poll(){
        var candidate_preference = this.state.candidate_preference
        var candidates = this.state.poll_object['ipfs'].candidates
        
        if(candidate_preference.length != candidates.length){
            this.props.notify(this.props.app_state.loc['3073g']/* You need to select all the candidates in your preferrential order. */, 7200)
        }
        else if(this.does_vote_already_exist_in_stack()){
            this.props.notify(this.props.app_state.loc['3073h']/* You already have a transaction in your stack matching this poll. */, 7200)
        }
        else{
            this.props.add_poll_vote_transaction_to_stack(this.state)
            this.props.notify(this.props.app_state.loc['18']/* 'Transaction added to stack' */, 1000)
            this.setState({candidate_preference:[]})
        }
    }

    does_vote_already_exist_in_stack(){
        var stack_transactions = this.props.app_state.stack_items
        for(var i=0; i<stack_transactions.length; i++){
            if(stack_transactions[i].poll_object['e5_id'] == this.state.poll_object['e5_id'] && stack_transactions[i].id != this.state.id){
                return true
            }
        }
        return false
    }







    get_selected_item(object, option){
        var selected_item = object[option][2][0]
        var picked_item = object[option][1][selected_item];
        return picked_item
    }

    render_empty_views(size){
        var items = []
        for(var i=0; i<size; i++){
            items.push(i)
        }
        
        return(
            <div>
                <ul style={{ 'padding': '0px 0px 0px 0px', 'list-style':'none'}}>
                    {items.map((item, index) => (
                        <li style={{'padding': '2px'}}>
                            <div style={{height:60, width:'100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px','padding':'10px 0px 10px 10px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                                <div style={{'margin':'10px 20px 10px 0px'}}>
                                    <img alt="" src={this.props.app_state.theme['letter']} style={{height:30 ,width:'auto'}} />
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    /* renders the specific element in the post or detail object */
    render_detail_item(item_id, object_data){
        var uploaded_data = {}
        if(item_id == '8' || item_id == '7' || item_id == '8'|| item_id == '9' || item_id == '11' || item_id == '12')uploaded_data = this.props.app_state.uploaded_data
        return(
            <div>
                <ViewGroups uploaded_data={uploaded_data} graph_type={this.props.app_state.graph_type} font={this.props.app_state.font} item_id={item_id} object_data={object_data} theme={this.props.theme} width={this.props.app_state.width} />
            </div>
        )
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

    get_time_diff(diff){
        if(diff < 60){//less than 1 min
            var num = parseInt(diff)
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

    get_number_width(number){
        if(number == null) return '0%'
        var last_two_digits = number.toString().slice(0, 1)+'0';
        if(number > 10){
            last_two_digits = number.toString().slice(0, 2);
        }
        return last_two_digits+'%'
    }

    
}




export default VotePollPage;