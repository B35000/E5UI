import React, { Component } from 'react';
import Tags from '../../components/tags';
import ViewGroups from '../../components/view_groups'
import TextInput from '../../components/text_input';
import NumberPicker from '../../components/number_picker';


var bigInt = require("big-integer");

function number_with_commas(x) {
    if(x == null) x = '';
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function bgN(number, power) {
  return bigInt((number+"e"+power)).toString();
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

class ExitContractPage extends Component {
    
    state = {
        selected: 0, type:'exit-contract', id:makeid(8),
        contract_item: {'data':[[],[0,0,0,0,0,0,0,0,0,0]], 'entry_expiry':0},
        exit_contract_title_tags_object:this.get_exit_contract_title_tags_object(), 
        entered_indexing_tags:['exit', 'contract']
    };


    get_exit_contract_title_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e','exit-contract'], [1]
            ],
        };
    }

    render(){
        return(
            <div style={{'padding':'10px 20px 0px 10px'}}>

                <div className="row">
                    <div className="col-9" style={{'padding': '5px 0px 0px 10px'}}>
                        <Tags page_tags_object={this.state.exit_contract_title_tags_object} tag_size={'l'} when_tags_updated={this.when_exit_contract_title_tags_object_updated.bind(this)} theme={this.props.theme}/>
                    </div>
                    <div className="col-3" style={{'padding': '0px 0px 0px 0px'}}>
                        
                        
                    </div>
                </div>

                {this.render_everything()}

            </div>
        )
    }

    when_exit_contract_title_tags_object_updated(tag_obj){
        this.setState({exit_contract_title_tags_object: tag_obj})
    }


    render_everything(){
        var contract_config = this.state.contract_item['data'][1]
        var item = this.format_contract_item()

        return(
            <div>
                <div style={{height:10}}/>
                {this.render_detail_item('3', {'title':this.get_time_diff(contract_config[6]), 'details':'Max Enter Contract Duration', 'size':'l'})}
                <div style={{height:10}}/>

                <div style={{height:'auto', width:'100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px','padding':'5px 5px 0px 0px', 'max-width':'420px', 'box-shadow': '0px 0px 1px 2px '+this.props.theme['card_shadow_color']}}>
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

                <div style={{height: 10}}/>
                {this.show_entered_contract_data()}

                {this.render_detail_item('0')}

                {this.render_detail_item('4', {'font':'Sans-serif', 'textsize':'15px', 'text':'Exit the specific contract'})}
                <div style={{height: 10}}/>
                <div style={{'padding': '5px'}} onClick={()=>this.finish_exiting_contract_ui()}>
                    {this.render_detail_item('5', {'text':'Exit Contract', 'action':''})}
                </div>
            </div>
        )
    }


    show_entered_contract_data(){
        var expiry_time_in_seconds = this.state.contract_item['entry_expiry']
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


    format_contract_item(){
        var object = this.state.contract_item
        var tags = object['ipfs'] == null ? ['Contract'] : object['ipfs'].entered_indexing_tags
        var title = object['ipfs'] == null ? 'Contract ID' : object['ipfs'].entered_title_text
        var age = object['event'] == null ? 0 : object['event'].returnValues.p5
        return {
            'tags':{'active_tags':tags, 'index_option':'indexed'},
            'id':{'title':object['id'], 'details':title, 'size':'l'},
            'age':{ 'style':'s', 'title':'', 'subtitle':'', 'barwidth':this.get_number_width(age), 'number':`${number_with_commas(age)}`, 'barcolor':'', 'relativepower':'block', }
        }
    }



    set_contract(contract){
        if(this.state.contract_item['id'] != contract['id']){
            this.setState({
                selected: 0, type:'exit-contract', id:makeid(8),
                contract_item: {'data':[[],[0,0,0,0,0,0,0,0,0,0]], 'entry_expiry':0},
                exit_contract_title_tags_object:this.get_exit_contract_title_tags_object(), 
                entered_indexing_tags:['exit', 'contract']
            })
        }
        this.setState({contract_item: contract, e5: contract['e5']})
    }


    /* renders the specific element in the post or detail object */
    render_detail_item(item_id, object_data){
        return(
            <div>
                <ViewGroups item_id={item_id} object_data={object_data} theme={this.props.theme} width={this.props.app_state.width} />
            </div>
        )

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

    get_number_width(number){
        var last_two_digits = number.toString().slice(0, 1)+'0';
        if(number > 10){
            last_two_digits = number.toString().slice(0, 2);
        }
        return last_two_digits+'%'
    }


    finish_exiting_contract_ui(){
        if(this.state.contract_item['entry_expiry'] == 0){
            this.props.notify(`You can't exit a contract you haven't entered`, 1500);
        }else{
            this.props.exit_contract(this.state)
            this.props.notify('transaction added to stack', 700);
        }
        
    }


}




export default ExitContractPage;