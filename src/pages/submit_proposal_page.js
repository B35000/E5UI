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
        selected: 0,id:makeid(8), type:'submit', proposal_item:{'id':'', 'consensus_data':[0,0,0], 'account_vote':0, 'end_balance':0, 'spend_balance':0, 'data':[[],[0,0,0,0,0,0,0,0,0,0,0,]]}, entered_indexing_tags:['submit', 'proposal'],
        submit_proposal_title_tags_object: this.get_submit_proposal_title_tags_object()
    };

    get_submit_proposal_title_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e','submit-proposal'], [1]
            ],
        };
    }

    render(){
        return(
            <div>
                <div style={{'padding':'10px 20px 0px 10px'}}>
                    <div className="row">
                        <div className="col-9" style={{'padding': '5px 0px 0px 10px'}}>
                            <Tags page_tags_object={this.state.submit_proposal_title_tags_object} tag_size={'l'} when_tags_updated={this.when_submit_proposal_title_tags_object_updated.bind(this)} theme={this.props.theme}/>
                        </div>
                        <div className="col-3" style={{'padding': '0px 0px 0px 0px'}}>
                            <div style={{'padding': '5px'}} onClick={()=>this.finish()}>
                                {this.render_detail_item('5', {'text':'Finish', 'action':''})}
                            </div>
                        </div>
                    </div>
                    <div style={{height:10}}/>
                    {this.render_detail_item('4', {'text':'Click finish to submit the proposal. You can only submit the proposal if the proposal expiry time has passed', 'textsize':'13px', 'font':'Sans-serif'})}
                    <div style={{height:10}}/>
                    {this.render_everything()}
                </div>

                
            </div>
        )
    }

    when_submit_proposal_title_tags_object_updated(tag_obj){
        this.setState({submit_proposal_title_tags_object: tag_obj})
    }


    render_everything(){
        var background_color = this.props.theme['card_background_color']
        var card_shadow_color = this.props.theme['card_shadow_color']
        var item = this.format_proposal_item(this.state.proposal_item)
        var object = this.state.proposal_item
        var proposal_config = object['data'][1];
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

                {this.render_detail_item('0')}

                {this.render_detail_item('3', {'title':''+object['consensus_data'][0]+' WAIT votes', 'details':this.get_proportion_of_total(object, object['consensus_data'][0])+'%', 'size':'l'})}

                <div style={{height:10}}/>
                {this.render_detail_item('3', {'title':''+object['consensus_data'][1]+' YES votes', 'details':this.get_proportion_of_total(object, object['consensus_data'][1])+'%', 'size':'l'})}

                <div style={{height:10}}/>
                {this.render_detail_item('3', {'title':''+object['consensus_data'][2]+' NO votes', 'details':this.get_proportion_of_total(object, object['consensus_data'][2])+'%', 'size':'l'})}


                {this.render_detail_item('0')}
                {this.render_detail_item('3', {'title':'Proposal Expiry time', 'details':''+(new Date(proposal_config[1]*1000)), 'size':'l'})}
                    
                <div style={{height:10}}/>
                {this.render_detail_item('3', {'title':this.get_time_from_now(proposal_config[1]), 'details':'Proposal expiry time from now', 'size':'l'})}

                <div style={{height:10}}/>
                {this.render_detail_item('3', {'title':'Proposal Submit Expiry time', 'details':''+(new Date(proposal_config[3]*1000)), 'size':'l'})}

                <div style={{height:10}}/>
                {this.render_detail_item('3', {'title':this.get_time_from_now(proposal_config[3]), 'details':'Proposal submit expiry time from now', 'size':'l'})}

                {this.render_detail_item('0')}
                {this.render_detail_item('0')}
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
                selected: 0,id:makeid(8), type:'submit', proposal_item:{'id':'', 'consensus_data':[0,0,0], 'account_vote':0, 'end_balance':0, 'spend_balance':0, 'data':[[],[0,0,0,0,0,0,0,0,0,0,0,]]}, entered_indexing_tags:['submit', 'proposal'],
                submit_proposal_title_tags_object: this.get_submit_proposal_title_tags_object()
            })
        }
        this.setState({proposal_item: proposal})
    }


    finish(){
        var object = this.state.proposal_item
        var proposal_config = object['data'][1];
        var current_time_in_seconds = Math.floor(new Date() / 1000)

        if(current_time_in_seconds < proposal_config[1] ){
            this.props.notify('You cant submit this proposal yet', 700);
        }
        else if(current_time_in_seconds > proposal_config[3]){
            this.props.notify('You cant submit this proposal', 700);
        }
        else{
            this.props.add_submit_proposal_action_to_stack(this.state)
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




export default SubmitProposalPage;