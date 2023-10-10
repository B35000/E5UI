import React, { Component } from 'react';
import Tags from '../../components/tags';
import ViewGroups from '../../components/view_groups'
import TextInput from '../../components/text_input';
import NumberPicker from '../../components/number_picker';


import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDateTimePicker } from "@mui/x-date-pickers/StaticDateTimePicker";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

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

class EnterContractPage extends Component {
    
    state = {
        selected: 0, type:'enter-contract', id:makeid(8),
        contract_item: {'data':[[],[0,0,0,0,0,0,0,0,0,0]]}, enter_contract_title_tags_object:this.get_enter_contract_title_tags_object(), interactible_timestamp:0,
        entered_indexing_tags:['enter', 'contract']
    };

    get_enter_contract_title_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e','enter-contract'], [1]
            ],
        };
    }

    render(){
        return(
            <div style={{'padding':'10px 20px 0px 10px'}}>

                <div className="row">
                    <div className="col-9" style={{'padding': '5px 0px 0px 10px'}}>
                        <Tags page_tags_object={this.state.enter_contract_title_tags_object} tag_size={'l'} when_tags_updated={this.when_enter_contract_title_tags_object_updated.bind(this)} theme={this.props.theme}/>
                    </div>
                    <div className="col-3" style={{'padding': '0px 0px 0px 0px'}}>
                        <div style={{'padding': '5px'}} onClick={()=>this.finish_entering_contract_ui()}>
                            {this.render_detail_item('5', {'text':'Finish', 'action':''})}
                        </div>
                        
                    </div>
                </div>

                {this.render_everything()}

            </div>
        )
    }

    when_enter_contract_title_tags_object_updated(tag_obj){
        this.setState({enter_contract_title_tags_object:tag_obj})
    }

    render_everything(){
        var contract_config = this.state.contract_item['data'][1]
        return(
            <div>
                <div style={{height:10}}/>
                {this.render_detail_item('3', {'title':this.get_time_diff(contract_config[6]), 'details':'Max Enter Contract Duration', 'size':'l'})}

                {this.render_detail_item('0')}

                {this.render_detail_item('3', {'title':'Entry exipry time', 'details':'Set the time after which you will not participate in the contract', 'size':'l'})}

                <div style={{height:10}}/>
                <ThemeProvider theme={createTheme({ palette: { mode: this.props.theme['calendar_color'], }, })}>
                    <CssBaseline />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <StaticDateTimePicker orientation="portrait" onChange={(newValue) => this.when_new_dat_time_value_set(newValue)}/>
                    </LocalizationProvider>
                </ThemeProvider>
                <div style={{height:10}}/>

                
            </div>
        )
    }

    when_new_dat_time_value_set(value){
        const selectedDate = value instanceof Date ? value : new Date(value);
        const timeInSeconds = Math.floor(selectedDate.getTime() / 1000);
        this.setState({interactible_timestamp: timeInSeconds})
    }


    set_contract(contract){
        if(this.state.contract_item['id'] != contract['id']){
            this.setState({
                selected: 0, type:'enter-contract', id:makeid(8),
                contract_item: {'data':[[],[0,0,0,0,0,0,0,0,0,0]]}, enter_contract_title_tags_object:this.get_enter_contract_title_tags_object(), interactible_timestamp:0,
                entered_indexing_tags:['enter', 'contract']
            })
        }
        this.setState({contract_item: contract, e5: contract['e5']})
        console.log('---------------------------set_contract-------------------------')
        console.log(contract['e5'])
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


    finish_entering_contract_ui(){
        this.props.enter_contract(this.state)
        this.props.notify('transaction added to stack', 700);
    }


}




export default EnterContractPage;