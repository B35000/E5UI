import React, { Component } from 'react';
import ViewGroups from './../components/view_groups'
import Tags from './../components/tags';
import TextInput from './../components/text_input';
import NumberPicker from './../components/number_picker';
import DurationPicker from './../components/duration_picker';

import Letter from './../assets/letter.png';

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDateTimePicker } from "@mui/x-date-pickers/StaticDateTimePicker";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

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

class FulfilBagPage extends Component {
    
    state = {
        selected: 0, bag_item:{'id':0} ,  type:this.props.app_state.loc['1126']/* 'bag-response' */, id:makeid(8),
        entered_indexing_tags:[this.props.app_state.loc['1127']/* 'respond' */, this.props.app_state.loc['1128']/* 'fulfil' */, this.props.app_state.loc['1129']/* 'bag' */], respond_to_bag_title_tags_object: this.get_respond_to_bag_title_tags_object(), picked_contract: null, application_expiry_time: (Date.now()/1000)+6000, exchange_id: '', price_amount:0, price_data:[], pre_post_paid_option: this.get_pre_post_paid_option_tags_object(), estimated_delivery_time:0,
        e5: this.props.app_state.selected_e5
    };

    get_respond_to_bag_title_tags_object(){
         return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e',this.props.app_state.loc['1130']/* 'contract' */, this.props.app_state.loc['1131']/* 'expiry-time' */, this.props.app_state.loc['1132']/* 'amount' */], [1]
            ],
        };
    }


    get_pre_post_paid_option_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e',this.props.app_state.loc['1133']/* 'prepaid' */, this.props.app_state.loc['1134']/* 'postpaid' */], [1]
            ],
        }
    }

    render(){
        return(
            <div style={{'padding':'10px 10px 0px 10px', 'overflow-x':'hidden'}}>
                <div className="row">
                    <div className="col-9" style={{'padding': '5px 0px 0px 10px'}}>
                        <Tags font={this.props.app_state.font} page_tags_object={this.state.respond_to_bag_title_tags_object} tag_size={'l'} when_tags_updated={this.when_respond_to_bag_title_tags_object_updated.bind(this)} theme={this.props.theme}/>
                    </div>
                    <div className="col-3" style={{'padding': '0px 0px 0px 0px'}}>
                        <div style={{'padding': '5px'}} onClick={()=>this.finish_creating_response()}>
                            {this.render_detail_item('5', {'text':this.props.app_state.loc['4']/* 'Finish' */, 'action':''})}
                        </div>
                        
                    </div>
                </div>

                {this.render_everything()}

            </div>
        )
    }

    when_respond_to_bag_title_tags_object_updated(tag_obj){
        this.setState({respond_to_bag_title_tags_object: tag_obj})
    }

    set_bag(item){
        if(this.state.bag_item['id'] != item['id']){
            this.setState({selected: 0 ,  type:this.props.app_state.loc['1126']/* 'bag-response' */, id:makeid(8),
            entered_indexing_tags:[this.props.app_state.loc['1127']/* 'respond' */, this.props.app_state.loc['1128']/* 'fulfil' */, this.props.app_state.loc['1129']/* 'bag' */], respond_to_bag_title_tags_object: this.get_respond_to_bag_title_tags_object(), picked_contract: null, application_expiry_time: (Date.now()/1000)+6000, exchange_id: '', price_amount:0, price_data:[], pre_post_paid_option: this.get_pre_post_paid_option_tags_object()})
        }
        this.setState({bag_item: item, e5: item['e5']})
    }


    render_everything(){
        var selected_item = this.get_selected_item(this.state.respond_to_bag_title_tags_object, this.state.respond_to_bag_title_tags_object['i'].active)

        if(selected_item == this.props.app_state.loc['1130']/* 'contract' */){
            return(
                <div>
                    {this.render_select_contract_parts()}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['1131']/* 'expiry-time' */){
            return(
                <div>
                    {this.render_application_expiry_time()}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['1132']/* 'amount' */){
            return(
                <div>
                    {this.render_application_prices()}
                </div>
            )
        }
    }

    get_selected_item(object, option){
        var selected_item = object[option][2][0]
        var picked_item = object[option][1][selected_item];
        return picked_item
    }



    render_select_contract_parts(){
        var items = this.get_contract_items()

        return(
            <div>
                {this.render_detail_item('4',{'font':this.props.app_state.font, 'textsize':'13px','text':this.props.app_state.loc['1135']/* 'Select the contract youll be using. If you have no contracts, first create one then youll see it here.' */})}
                <div style={{height:10}}/>

                {this.render_my_contracts()}
            </div>
        )
    }

    render_my_contracts(){
        var background_color = this.props.theme['card_background_color']
        var middle = this.props.height-123;
        var size = this.props.size;
        if(size == 'l'){
            middle = this.props.height-80;
        }
        var items = [].concat(this.get_contract_items())

        if(items.length == 0){
            items = ['0','1'];
            return ( 
                <div style={{}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.map((item, index) => (
                            <li style={{'padding': '5px'}}>
                                <div style={{height:160, width:'100%', 'background-color': background_color, 'border-radius': '15px','padding':'10px 0px 0px 10px', 'max-width':'420px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                                    <div style={{'margin':'10px 20px 0px 0px'}}>
                                        <img src={Letter} style={{height:60 ,width:'auto'}} />
                                        <p style={{'display': 'flex', 'align-items':'center','justify-content':'center', 'padding':'5px 0px 0px 7px', 'color': 'gray'}}></p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            );
        }else{
            var background_color = this.props.theme['card_background_color']
            var card_shadow_color = this.props.theme['card_shadow_color']
            return ( 
                <div style={{}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.map((item, index) => (
                            <li style={{'padding': '5px'}}>
                                {this.render_contract_item(item, index)}
                            </li>
                        ))}
                    </ul>
                </div>
            );
        }
        
    }

    get_contract_items(){
        var my_contracts = []
        // var myid = this.props.app_state.user_account_id
        var created_cons = this.get_all_sorted_objects(this.props.app_state.created_contracts)
        for(var i = 0; i < created_cons.length; i++){
            var post_author = created_cons[i]['event'] == null ? 0 : created_cons[i]['event'].returnValues.p3
            // console.log('----------------------get_contract_items------------------------------')
            // console.log(this.props.app_state.user_account_id)
            // console.log(created_cons[i]['e5'])

            var myid = this.props.app_state.user_account_id[created_cons[i]['e5']]
            if(myid == null){
                myid = 1
            }
            if(post_author.toString() == myid.toString()){
                // if(this.props.app_state.my_contract_applications[this.props.app_state.created_contracts[i]['id']] == null){
                //     my_contracts.push(this.props.app_state.created_contracts[i])
                // }else{
                //     if(this.props.app_state.my_contract_applications[this.props.app_state.created_contracts[i]['id']] < Date.now()/1000){
                //     }
                //     my_contracts.push(this.props.app_state.created_contracts[i])
                // }
                my_contracts.push(created_cons[i])
            }
        }
        return my_contracts
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

    render_contract_item(object, index){
        var background_color = this.props.theme['card_background_color']
        var card_shadow_color = this.props.theme['card_shadow_color']
        var item = this.format_contract_item(object)

        if(this.state.picked_contract == object){
            return(
                <div onClick={() => this.when_contract_item_clicked(object)} style={{height:'auto', width:'100%', 'background-color': background_color, 'border-radius': '15px','padding':'5px 5px 0px 0px', 'max-width':'420px', 'box-shadow': '0px 0px 1px 2px '+card_shadow_color}}>
                    <div style={{'padding': '5px 0px 5px 5px'}}>
                        {this.render_detail_item('1', item['tags'])}
                        <div style={{height: 10}}/>
                        <div style={{'padding': '0px 0px 0px 0px'}}>
                            {this.render_detail_item('3', item['id'])}
                        </div>
                        <div style={{'padding': '20px 0px 0px 0px'}}>
                            {this.render_detail_item('2', item['age'])}
                        </div>
                        <div style={{height:'1px', 'background-color':'#C1C1C1', 'margin': '0px 10px 15px 10px'}}/>
                        <div style={{height:'1px', 'background-color':'#C1C1C1', 'margin': '0px 10px 15px 10px'}}/>
                    </div>         
                </div>
            )
        }else{
            return(
                <div onClick={() => this.when_contract_item_clicked(object)} style={{height:'auto', width:'100%', 'background-color': background_color, 'border-radius': '15px','padding':'5px 5px 0px 0px', 'max-width':'420px', 'box-shadow': '0px 0px 1px 2px '+card_shadow_color}}>
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
            )
        }

        
    }

    format_contract_item(object){
        var tags = object['ipfs'] == null ? ['Contract'] : object['ipfs'].entered_indexing_tags
        var title = object['ipfs'] == null ? 'Contract ID' : object['ipfs'].entered_title_text
        var age = object['event'] == null ? 0 : object['event'].returnValues.p5
        return {
            'tags':{'active_tags':tags, 'index_option':'indexed'},
            'id':{'title':object['id'], 'details':title, 'size':'l'},
            'age':{ 'style':'s', 'title':'', 'subtitle':'', 'barwidth':this.get_number_width(age), 'number':`${number_with_commas(age)}`, 'barcolor':'', 'relativepower':this.props.app_state.loc['1136']/* 'block' */, }
        }
    }

    when_contract_item_clicked(object){
        if(this.state.picked_contract == object){
            this.setState({picked_contract: null})
        }else{
            this.setState({picked_contract: object})
        }
        
    }





    render_application_expiry_time(){
        return(
            <div>
                {this.render_detail_item('4',{'font':this.props.app_state.font, 'textsize':'13px','text':this.props.app_state.loc['1137']/* 'Select an expiry time for your fulfilment application.' */})}

                <div style={{height:20}}/>
                <ThemeProvider theme={createTheme({ palette: { mode: this.props.theme['calendar_color'], }, })}>
                    <CssBaseline />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <StaticDateTimePicker orientation="portrait" onChange={(newValue) => this.when_new_date_time_value_set(newValue)} />
                    </LocalizationProvider>
                </ThemeProvider>
                <div style={{height:10}}/>

                {this.render_detail_item('3', {'title':this.get_time_diff(this.state.application_expiry_time - (Date.now()/1000)), 'details':''+(new Date(this.state.application_expiry_time * 1000)), 'size':'l'})}
                <div style={{height:20}}/>

            </div>
        )
    }


    when_new_date_time_value_set(value){
        const selectedDate = value instanceof Date ? value : new Date(value);
        const timeInSeconds = Math.floor(selectedDate.getTime() / 1000);
        this.setState({application_expiry_time: timeInSeconds})
    }







    render_application_prices(){
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['1138']/* 'Prepaid or Postpaid' */, 'details':this.props.app_state.loc['1139']/* 'Set the payment option you prefer for the application' */, 'size':'l'})}
                <div style={{height: 10}}/>
                <Tags font={this.props.app_state.font} page_tags_object={this.state.pre_post_paid_option} tag_size={'l'} when_tags_updated={this.when_pre_post_paid_option_tags_object_updated.bind(this)} theme={this.props.theme}/>
                <div style={{height: 10}}/>



                {this.render_detail_item('3', {'title':this.props.app_state.loc['1140']/* 'Estimated Delivery time' */, 'details':this.props.app_state.loc['1141']/* 'set the estimated amount of time youll take to deliver the items in the bag' */, 'size':'l'})}
                <div style={{height:20}}/>
                    
                {this.render_detail_item('3', {'title':this.get_time_diff(this.state.estimated_delivery_time), 'details':this.props.app_state.loc['1142']/* 'Estimated Delivery time' */, 'size':'l'})}

                <DurationPicker font={this.props.app_state.font} number_limit={bigInt('1e72')} when_number_picker_value_changed={this.when_estimated_delivery_time_updated.bind(this)} theme={this.props.theme} power_limit={63} loc={this.props.app_state.loc}/>





                {this.render_detail_item('3', {'title':this.props.app_state.loc['1143']/* 'Exchange ID' */, 'details':this.props.app_state.loc['1144']/* 'Select an exchange by its id, then the desired price and click add' */, 'size':'l'})}

                <div style={{height:10}}/>
                <TextInput font={this.props.app_state.font} height={30} placeholder={this.props.app_state.loc['1143']/* 'Exchange ID' */} when_text_input_field_changed={this.when_exchange_id_input_field_changed.bind(this)} text={this.state.exchange_id} theme={this.props.theme}/>

                {this.load_token_suggestions('exchange_id')}
                <div style={{height: 10}}/>

                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['1145']/* 'Price' */, 'subtitle':this.format_power_figure(this.state.price_amount), 'barwidth':this.calculate_bar_width(this.state.price_amount), 'number':this.format_account_balance_figure(this.state.price_amount), 'barcolor':'', 'relativepower':this.props.app_state.loc['1146']/* 'tokens' */, })}
                </div>

                <NumberPicker font={this.props.app_state.font} number_limit={bigInt('1e72')} when_number_picker_value_changed={this.when_price_amount.bind(this)} theme={this.props.theme} power_limit={63}/>

                <div style={{'padding': '5px'}} onClick={() => this.when_add_price_set()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['1147']/* 'Add Price' */, 'action':''})}
                </div>

                {this.render_set_prices_list_part()}
            </div>
        )
    }

    when_exchange_id_input_field_changed(text){
        this.setState({exchange_id: text})
    }

    when_price_amount(amount){
        this.setState({price_amount: amount})
    }

    when_pre_post_paid_option_tags_object_updated(tag_obj){
        this.setState({pre_post_paid_option:tag_obj})
    }

    when_estimated_delivery_time_updated(amount){
        this.setState({estimated_delivery_time: amount})
    }

    when_add_price_set(){
        var exchange_id = this.state.exchange_id.trim()
        var amount = this.state.price_amount
        if(isNaN(exchange_id) || parseInt(exchange_id) < 0 || exchange_id == ''){
            this.props.notify(this.props.app_state.loc['1148']/* 'Please put a valid exchange ID.' */, 600)
        }
        else if(amount == 0){
            this.props.notify(this.props.app_state.loc['1149']/* 'Please put a valid amount.' */, 600)
        }
        else{
            var price_data_clone = this.state.price_data.slice()
            price_data_clone.push({'id':exchange_id, 'amount':amount})
            this.setState({price_data: price_data_clone});
            this.props.notify(this.props.app_state.loc['1150']/* 'Added price.' */, 400)
        }
    }

    render_set_prices_list_part(){
        var middle = this.props.height-300;
        var size = this.props.size;
        if(size == 'm'){
            middle = this.props.height-100;
        }
        var items = [].concat(this.state.price_data)

        if(items.length == 0){
            items = [0,3,0]
            return(
                <div style={{}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.map((item, index) => (
                            <li style={{'padding': '2px 5px 2px 5px'}} onClick={()=>console.log()}>
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
                <div style={{}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.reverse().map((item, index) => (
                            <li style={{'padding': '5px'}} onClick={()=>this.when_amount_clicked(item)}>
                                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                                    {this.render_detail_item('2', { 'style':'l', 'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[this.state.e5+item['id']], 'subtitle':this.format_power_figure(item['amount']), 'barwidth':this.calculate_bar_width(item['amount']), 'number':this.format_account_balance_figure(item['amount']), 'barcolor':'', 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['id']], })}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
        
    }

    when_amount_clicked(item){
        var cloned_array = this.state.price_data.slice()
        const index = cloned_array.indexOf(item);
        if (index > -1) { // only splice array when item is found
            cloned_array.splice(index, 1); // 2nd parameter means remove one item only
        }
        this.setState({price_data: cloned_array})
    }



    load_token_suggestions(target_type){
        var items = [].concat(this.get_suggested_tokens())
        var background_color = this.props.theme['card_background_color']
        var card_shadow_color = this.props.theme['card_shadow_color']
        return(
            <div style={{'margin':'0px 0px 0px 5px','padding': '5px 0px 7px 0px', width: '97%', 'background-color': 'transparent'}}>
                    <ul style={{'list-style': 'none', 'padding': '0px 0px 5px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '13px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                      {items.map((item, index) => (
                          <li style={{'display': 'inline-block', 'margin': '5px 5px 5px 5px', '-ms-overflow-style': 'none'}} onClick={() => this.when_price_suggestion_clicked(item, index, target_type)}>
                              {this.render_detail_item('3', item['label'])}
                          </li>
                      ))}
                  </ul>
                </div>
        )
    }

   get_suggested_tokens(){
        var items = [
            {'id':'3', 'label':{'title':'END', 'details':this.props.app_state.loc['1151']/* 'Account 3' */, 'size':'s'}},
            {'id':'5', 'label':{'title':'SPEND', 'details':this.props.app_state.loc['1152']/* 'Account 5' */, 'size':'s'}},
        ];
        var exchanges_from_sync = this.props.app_state.created_tokens[this.state.e5]
        var sorted_token_exchange_data = []
        // var myid = this.props.app_state.user_account_id
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



    when_price_suggestion_clicked(item, pos, target_type){
        this.setState({exchange_id: item['id']})
    }


    finish_creating_response(){
        var selected_contract = this.state.picked_contract
        var selected_time = this.state.application_expiry_time

        if(selected_contract == null){
            this.props.notify(this.props.app_state.loc['1153']/* 'You need to pick a contract first.' */, 3600)
        }
        else if(selected_time-Date.now()/1000 < 900){
            this.props.notify(this.props.app_state.loc['1154']/* 'You cant set an expiry time thats less than fifteen minutes from now.' */, 5600)
        }
        else{
            this.props.add_respond_to_bag_to_stack(this.state)
            this.setState({selected: 0,  type:this.props.app_state.loc['1126']/* 'bag-response' */, id:makeid(8),
            entered_indexing_tags:[this.props.app_state.loc['1127']/* 'respond' */, this.props.app_state.loc['1128']/* 'fulfil' */, this.props.app_state.loc['1129']/* 'bag' */], respond_to_bag_title_tags_object: this.get_respond_to_bag_title_tags_object(), picked_contract: null, application_expiry_time: (Date.now()/1000)+6000, exchange_id: '', price_amount:0, price_data:[], pre_post_paid_option: this.get_pre_post_paid_option_tags_object()})

            this.props.notify(this.props.app_state.loc['18']/* 'transaction added to stack' */, 600)
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

    format_proportion(proportion){
        return ((proportion/10**18) * 100)+'%';
    }

}




export default FulfilBagPage;