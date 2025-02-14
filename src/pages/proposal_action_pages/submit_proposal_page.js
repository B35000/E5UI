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
import ViewGroups from '../../components/view_groups'
import Tags from '../../components/tags';

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

class SubmitProposalPage extends Component {
    
    state = {
        selected: 0,id:makeid(8), type:this.props.app_state.loc['783']/* 'submit' */, proposal_item:{'id':'', 'consensus_data':[0,0,0], 'account_vote':0, 'end_balance':0, 'spend_balance':0, 'data':[[],[0,0,0,0,0,0,0,0,0,0,0,]]}, entered_indexing_tags:[this.props.app_state.loc['783']/* 'submit' */, this.props.app_state.loc['784']/* 'proposal' */],
        submit_proposal_title_tags_object: this.get_submit_proposal_title_tags_object()
    };

    get_submit_proposal_title_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e',this.props.app_state.loc['785']/* 'submit-proposal' */], [1]
            ],
        };
    }

    render(){
        return(
            <div>
                <div style={{'padding':'10px 10px 0px 10px'}}>
                    <div className="row">
                        <div className="col-11" style={{'padding': '0px 0px 0px 10px'}}>
                            <Tags font={this.props.app_state.font} page_tags_object={this.state.submit_proposal_title_tags_object} tag_size={'l'} when_tags_updated={this.when_submit_proposal_title_tags_object_updated.bind(this)} theme={this.props.theme}/>
                        </div>
                        <div className="col-1" style={{'padding': '0px 0px 0px 0px'}}>
                            <div className="text-end" style={{'padding': '0px 10px 0px 0px'}} >
                                <img className="text-end" onClick={()=>this.finish()} src={this.props.theme['close']} style={{height:36, width:'auto'}} />
                            </div>
                        </div>
                    </div>
                    <div style={{'margin':'10px 0px 0px 0px'}}>
                        {this.render_everything()}   
                    </div>
                </div>

                
            </div>
        )
    }

    when_submit_proposal_title_tags_object_updated(tag_obj){
        this.setState({submit_proposal_title_tags_object: tag_obj})
    }


    render_everything(){
        var size = this.props.app_state.size

        if(size == 's'){
            return(
                <div>
                    {this.render_consensus_object()}
                    {this.render_consensus_data()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_consensus_data()}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_consensus_object()}
                        <div style={{height:10}}/>
                        {this.render_empty_views(3)}
                    </div>
                </div>
                
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_consensus_data()}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_consensus_object()}
                        <div style={{height:10}}/>
                        {this.render_empty_views(3)}
                    </div>
                </div>
                
            )
        }
    }


    render_consensus_object(){
        var background_color = this.props.theme['card_background_color']
        var card_shadow_color = this.props.theme['card_shadow_color']
        var item = this.format_proposal_item(this.state.proposal_item)
        return(
            <div>
                <div style={{height:'auto', width:'100%', 'background-color': background_color, 'border-radius': '15px','padding':'5px 5px 0px 0px', 'max-width':'420px', 'box-shadow': '0px 0px 1px 2px '+card_shadow_color}}>
                    <div style={{'padding': '5px 0px 5px 5px'}}>
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
            </div>
        )
    }

    render_consensus_data(){
        var object = this.state.proposal_item
        var proposal_config = object['data'][1];
        return(
            <div>
                {this.render_detail_item('4', {'text':this.props.app_state.loc['786']/* 'The consensus results are shown below.' */, 'textsize':'13px', 'font':this.props.app_state.font})}
                <div style={{height:10}}/>

                {this.render_detail_item('3', {'title':''+this.format_account_balance_figure(object['consensus_data'][0])+this.props.app_state.loc['787']/* ' WAIT votes' */, 'details':this.get_proportion_of_total(object, object['consensus_data'][0])+'%', 'size':'l'})}

                <div style={{height:10}}/>
                {this.render_detail_item('3', {'title':''+this.format_account_balance_figure(object['consensus_data'][1])+this.props.app_state.loc['788']/* ' YES votes' */, 'details':this.get_proportion_of_total(object, object['consensus_data'][1])+'%', 'size':'l'})}

                <div style={{height:10}}/>
                {this.render_detail_item('3', {'title':''+this.format_account_balance_figure(object['consensus_data'][2])+this.props.app_state.loc['789']/* ' NO votes' */, 'details':this.get_proportion_of_total(object, object['consensus_data'][2])+'%', 'size':'l'})}


                {this.render_detail_item('0')}
                {this.render_detail_item('3', {'title':this.props.app_state.loc['790']/* 'Proposal Expiry time' */, 'details':''+(new Date(proposal_config[1]*1000)), 'size':'l'})}
                    
                <div style={{height:10}}/>
                {this.render_detail_item('3', {'title':this.get_time_from_now(proposal_config[1]), 'details':this.props.app_state.loc['791']/* 'Proposal expiry time from now' */, 'size':'l'})}

                <div style={{height:10}}/>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['792']/* 'Proposal Submit Expiry time' */, 'details':''+(new Date(proposal_config[3]*1000)), 'size':'l'})}

                <div style={{height:10}}/>
                {this.render_detail_item('3', {'title':this.get_time_from_now(proposal_config[3]), 'details':this.props.app_state.loc['793']/* 'Proposal submit expiry time from now' */, 'size':'l'})}
            </div>
        )
    }


    get_proportion_of_total(object, vote_count){
        var sum = bigInt(object['consensus_data'][0]) + bigInt(object['consensus_data'][1]) + bigInt(object['consensus_data'][2]);

        if(sum == bigInt(0)){
            return 0
        }

        var prop = (bigInt(vote_count).divide(sum)).multiply(100)

        if(isNaN(prop)){
            return 0
        }
        return prop
    }

    format_proposal_item(object){
        var tags = object['ipfs'] == null ? ['Proposal'] : object['ipfs'].entered_indexing_tags
        var title = object['ipfs'] == null ? 'Proposal ID' : object['ipfs'].entered_title_text
        var age = object['event'] == null ? 0 : object['event'].returnValues.p6
        var time = object['event'] == null ? 0 : object['event'].returnValues.p5
        return {
            'tags':{'active_tags':tags, 'index_option':'indexed'},
            'id':{'title':object['id'], 'details':title, 'size':'l'},
            'age':{'style':'s', 'title':'', 'subtitle':'', 'barwidth':this.get_number_width(age), 'number':`${number_with_commas(age)}`, 'barcolor':'', 'relativepower':`${this.get_time_difference(time)}`, }
        }
    }


    set_proposal(proposal){
        if(this.state.proposal_item['id'] != proposal['id']){
            this.setState({
                selected: 0,id:makeid(8), type:this.props.app_state.loc['783']/* 'submit' */, proposal_item:{'id':'', 'consensus_data':[0,0,0], 'account_vote':0, 'end_balance':0, 'spend_balance':0, 'data':[[],[0,0,0,0,0,0,0,0,0,0,0,]]}, entered_indexing_tags:[this.props.app_state.loc['783']/* 'submit' */, this.props.app_state.loc['784']/* 'proposal' */],
                submit_proposal_title_tags_object: this.get_submit_proposal_title_tags_object()
            })
        }
        this.setState({proposal_item: proposal, e5: proposal['e5']})
    }


    finish(){
        var object = this.state.proposal_item
        var proposal_config = object['data'][1];
        var current_time_in_seconds = Math.floor(new Date() / 1000)

        if(current_time_in_seconds < proposal_config[1] ){
            this.props.notify(this.props.app_state.loc['794']/* 'You cant submit this proposal yet.' */, 700);
        }
        else if(current_time_in_seconds > proposal_config[3]){
            this.props.notify(this.props.app_state.loc['795']/* 'You cant submit this proposal.' */, 700);
        }
        else{
            var clone = structuredClone(this.state)
            // clone.e5 = this.props.app_state.selected_e5
            this.props.add_submit_proposal_action_to_stack(clone)
            this.props.notify(this.props.app_state.loc['18']/* transaction added to stack' */, 1700);
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
                                    <img src={this.props.app_state.theme['letter']} style={{height:30 ,width:'auto'}} />
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
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

}




export default SubmitProposalPage;