import React, { Component } from 'react';
import ViewGroups from './../components/view_groups'
import Tags from './../components/tags';
import TextInput from './../components/text_input';
import NumberPicker from './../components/number_picker';

import Letter from './../assets/letter.png';
import E5EmptyIcon from './../assets/e5empty_icon.png';
import E5EmptyIcon3 from './../assets/e5empty_icon3.png';

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDateTimePicker } from "@mui/x-date-pickers/StaticDateTimePicker";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

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

class SendJobRequestPage extends Component {
    
    state = {
        selected: 0, contractor_item:{'id':0},  type:'job-request', id:makeid(8),
        entered_indexing_tags:['send', 'job', 'request'], send_job_request_title_tags_object: this.get_send_job_request_title_tags_object(), picked_contract: null, application_expiry_time: (Date.now()/1000)+6000, exchange_id: '', price_amount:0, price_data:[], pre_post_paid_option: this.get_pre_post_paid_option_tags_object(),
        entered_title_text:'', entered_image_objects:[]
    };

    get_send_job_request_title_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['or','',0], ['e', 'expiry-time', 'amount'], [0]
            ],
        };
    }

    get_pre_post_paid_option_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e','prepaid', 'postpaid'], [1]
            ],
        }
    }

    render(){
        return(
            <div style={{'padding':'10px 10px 0px 10px'}}>
                <div className="row">
                    <div className="col-9" style={{'padding': '5px 0px 0px 10px'}}>
                        <Tags page_tags_object={this.state.send_job_request_title_tags_object} tag_size={'l'} when_tags_updated={this.when_send_job_request_title_tags_object_updated.bind(this)} theme={this.props.theme}/>
                    </div>
                    <div className="col-3" style={{'padding': '0px 0px 0px 0px'}}>
                        <div style={{'padding': '5px'}} onClick={()=>this.finish_creating_response()}>
                            {this.render_detail_item('5', {'text':'Finish', 'action':''})}
                        </div>
                        
                    </div>
                </div>

                {this.render_everything()}
            </div>
        )
    }

    when_send_job_request_title_tags_object_updated(tag_obj){
        this.setState({send_job_request_title_tags_object: tag_obj})
    }



    render_everything(){
        var selected_item = this.get_selected_item(this.state.send_job_request_title_tags_object, this.state.send_job_request_title_tags_object['i'].active)

        if(selected_item == 'e'){
            return(
                <div>
                    {this.render_title_details_part()}
                </div>
            )
        }
        else if(selected_item == 'contract'){
            return(
                <div>
                    {this.render_select_contract_parts()}
                </div>
            )
        }
        else if(selected_item == 'expiry-time'){
            return(
                <div>
                    {this.render_application_expiry_time()}
                </div>
            )
        }
        else if(selected_item == 'amount'){
            return(
                <div>
                    {this.render_application_prices()}
                </div>
            )
        }
    }



    render_title_details_part(){
        return(
            <div>
                {this.render_detail_item('4',{'font':'Sans-serif', 'textsize':'13px','text':'Set some details for your new job request. It should be task specific'})}
                <div style={{height:10}}/>
                <TextInput height={70} placeholder={'Enter Details...'} when_text_input_field_changed={this.when_title_text_input_field_changed.bind(this)} text={this.state.entered_title_text} theme={this.props.theme}/> 
                {this.render_detail_item('0')}

                {this.render_detail_item('4',{'font':'Sans-serif', 'textsize':'13px','text':'Black stages gif, grey stages image and tap to remove.'})}
                {this.render_create_image_ui_buttons_part()}
                {this.render_image_part()}

            </div>
        )
    }


    when_title_text_input_field_changed(text){
        this.setState({entered_title_text: text})
    }


    render_create_image_ui_buttons_part(){
        return(
        <div style={{'display': 'flex','flex-direction': 'row','margin':'0px 0px 0px 0px','padding': '7px 5px 10px 10px', width: '99%'}}>
            <div style={{'position': 'relative', 'width':45, 'height':45, 'padding':'0px 0px 0px 0px'}}>
                <img src={E5EmptyIcon} style={{height:45, width:'auto', 'z-index':'1' ,'position': 'absolute'}} />
                <input style={{height:30, width:40, opacity:0, 'z-index':'2' ,'position': 'absolute', 'margin':'5px 0px 0px 0px'}} id="upload" type="file" accept =".gif" onChange ={this.when_image_gif_picked.bind(this)} multiple/>
            </div>

            <div style={{'position': 'relative', 'width':45, 'height':45, 'padding':'0px 0px 0px 0px'}}>
                <img src={E5EmptyIcon3} style={{height:45, width:'auto', 'z-index':'1' ,'position': 'absolute'}} />
                <input style={{height:30, width:40, opacity:0, 'z-index':'2' ,'position': 'absolute', 'margin':'5px 0px 0px 0px'}} id="upload" type="file" accept ="image/*" onChange ={this.when_image_gif_picked.bind(this)} multiple/>
            </div>

        </div>
      )
    }

    /* called when images have been picked from picker */
    when_image_gif_picked = (e) => {
        if(e.target.files && e.target.files[0]){
            for(var i = 0; i < e.target.files.length; i++){ 
                let reader = new FileReader();
                reader.onload = function(ev){
                    const clonedArray = this.state.entered_image_objects == null ? [] : this.state.entered_image_objects.slice();
                    clonedArray.push(ev.target.result);
                    this.setState({entered_image_objects: clonedArray});
                }.bind(this);
                reader.readAsDataURL(e.target.files[i]);
            }
            var image = e.target.files.length == 1 ? 'image has' : 'images have';
            this.props.notify('Your selected '+e.target.files.length+image+' been added.',500);
        }
    }



    render_image_part(){
        var col = Math.round(this.props.app_state.width / 100)
        var rowHeight = 100;

        if(this.state.entered_image_objects.length == 0){
            var items = ['1','1','1']
            var background_color = this.props.theme['card_background_color']
            return(
                <div>
                    <ImageList sx={{ width: 'auto', height: 'auto' }} cols={col} rowHeight={rowHeight}>
                        {items.map((item, index) => (
                            <ImageListItem key={item.img}>
                                <div style={{height:100, width:100, 'background-color': background_color, 'border-radius': '5px','padding':'10px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                                    <div style={{'margin':'0px 0px 0px 0px'}}>
                                        <img src={Letter} style={{height:40 ,width:'auto'}} />
                                    </div>
                                    
                                </div>
                            </ImageListItem>
                        ))}
                    </ImageList>
                </div>
            )
        }else{
            var items = this.state.entered_image_objects
            var background_color = this.props.theme['card_background_color']
            return(
                <div>
                    <ImageList sx={{ width: 'auto', height: 'auto' }} cols={col} rowHeight={rowHeight}>
                        {items.map((item, index) => (
                            <ImageListItem key={item.img}>
                                <div onClick={() => this.when_image_clicked(index)}>
                                    <img src={item} style={{height:100 ,width:100}} />
                                </div> 
                            </ImageListItem>
                        ))}
                    </ImageList>
                </div>
            )
        }
    }

    when_image_clicked(index){
        var cloned_array = this.state.entered_image_objects.slice()
        if (index > -1) { // only splice array when item is found
            cloned_array.splice(index, 1); // 2nd parameter means remove one item only
        }
        this.setState({entered_image_objects: cloned_array})
    }









    render_select_contract_parts(){
        var items = this.get_contract_items()

        return(
            <div>
                {this.render_detail_item('4',{'font':'Sans-serif', 'textsize':'13px','text':'Select the contract youll be using. If you have no contracts, first create one then youll see it here.'})}
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
        var items = this.get_contract_items()

        if(items.length == 0){
            items = ['0','1'];
            return ( 
                <div style={{overflow: 'auto', maxHeight: middle}}>
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
                <div style={{overflow: 'auto', maxHeight: middle}}>
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
        var myid = this.props.app_state.user_account_id
        for(var i = 0; i < this.props.app_state.created_contracts.length; i++){
            var post_author = this.props.app_state.created_contracts[i]['event'] == null ? 0 : this.props.app_state.created_contracts[i]['event'].returnValues.p3
            if(post_author.toString() == myid.toString()){
                if(this.props.app_state.my_contract_applications[this.props.app_state.created_contracts[i]['id']] == null){
                    my_contracts.push(this.props.app_state.created_contracts[i])
                }else{
                    if(this.props.app_state.my_contract_applications[this.props.app_state.created_contracts[i]['id']] < Date.now()/1000){
                    }
                    my_contracts.push(this.props.app_state.created_contracts[i])
                }
            }
        }
        return my_contracts
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
            'age':{ 'style':'s', 'title':'', 'subtitle':'', 'barwidth':this.get_number_width(age), 'number':`${number_with_commas(age)}`, 'barcolor':'', 'relativepower':'block', }
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
                {this.render_detail_item('4',{'font':'Sans-serif', 'textsize':'13px','text':'Select an expiry time for your job request'})}

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
                {this.render_detail_item('3', {'title':'Prepaid or Postpaid', 'details':'Set the payment option you prefer for the job request', 'size':'l'})}
                <div style={{height: 10}}/>
                
                <Tags page_tags_object={this.state.pre_post_paid_option} tag_size={'l'} when_tags_updated={this.when_pre_post_paid_option_tags_object_updated.bind(this)} theme={this.props.theme}/>
                <div style={{height: 10}}/>

                {this.render_detail_item('3', {'title':'Requested Pay', 'details':'Select an exchange by its id, then the desired price and click add', 'size':'l'})}

                <div style={{height:10}}/>
                <TextInput height={30} placeholder={'Exchange ID'} when_text_input_field_changed={this.when_exchange_id_input_field_changed.bind(this)} text={this.state.exchange_id} theme={this.props.theme}/>

                {this.load_token_suggestions('exchange_id')}
                <div style={{height: 10}}/>

                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                    {this.render_detail_item('2', { 'style':'l', 'title':'Price', 'subtitle':this.format_power_figure(this.state.price_amount), 'barwidth':this.calculate_bar_width(this.state.price_amount), 'number':this.format_account_balance_figure(this.state.price_amount), 'barcolor':'', 'relativepower':'transactions', })}
                </div>

                <NumberPicker number_limit={bigInt('1e72')} when_number_picker_value_changed={this.when_price_amount.bind(this)} theme={this.props.theme} power_limit={63}/>

                <div style={{'padding': '5px'}} onClick={() => this.when_add_price_set()}>
                    {this.render_detail_item('5', {'text':'Add Price', 'action':''})}
                </div>

                {this.render_set_prices_list_part()}
            </div>
        )
    }

    when_pre_post_paid_option_tags_object_updated(tag_obj){
        this.setState({pre_post_paid_option: tag_obj})
    }

    when_exchange_id_input_field_changed(text){
        this.setState({exchange_id: text})
    }

    when_price_amount(amount){
        this.setState({price_amount: amount})
    }

    when_add_price_set(){
        var exchange_id = this.state.exchange_id.trim()
        var amount = this.state.price_amount
        if(isNaN(exchange_id) || exchange_id == ''){
            this.props.notify('please put a valid exchange id', 600)
        }
        else if(amount == 0){
            this.props.notify('please put a valid amount', 600)
        }
        else{
            var price_data_clone = this.state.price_data.slice()
            price_data_clone.push({'id':exchange_id, 'amount':amount})
            this.setState({price_data: price_data_clone});
            this.props.notify('added price!', 400)
        }
    }

    render_set_prices_list_part(){
        var middle = this.props.height-300;
        var size = this.props.size;
        if(size == 'm'){
            middle = this.props.height-100;
        }
        var items = this.state.price_data

        if(items.length == 0){
            items = [0,3,0]
            return(
                <div style={{overflow: 'auto', maxHeight: middle}}>
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
                <div style={{overflow: 'auto', maxHeight: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.reverse().map((item, index) => (
                            <li style={{'padding': '5px'}} onClick={()=>this.when_amount_clicked(item)}>
                                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                                    {this.render_detail_item('2', { 'style':'l', 'title':'Exchange ID: '+item['id'], 'subtitle':this.format_power_figure(item['amount']), 'barwidth':this.calculate_bar_width(item['amount']), 'number':this.format_account_balance_figure(item['amount']), 'barcolor':'', 'relativepower':this.props.app_state.token_directory[item['id']], })}
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
        var items = this.get_suggested_tokens()
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
            {'id':'3', 'label':{'title':'END', 'details':'Account 3', 'size':'s'}},
            {'id':'5', 'label':{'title':'SPEND', 'details':'Account 5', 'size':'s'}},
        ];
        var exchanges_from_sync = this.props.app_state.created_tokens
        var sorted_token_exchange_data = []
        var myid = this.props.app_state.user_account_id
        for (let i = 0; i < exchanges_from_sync.length; i++) {
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

    set_object(contractor_item){
        if(this.state.contractor_item['id'] != contractor_item['id']){
            this.setState({
                selected: 0,  type:'job-request', id:makeid(8),
                entered_indexing_tags:['send', 'job', 'request'], send_job_request_title_tags_object: this.get_send_job_request_title_tags_object(), picked_contract: null, application_expiry_time: (Date.now()/1000)+6000, exchange_id: '', price_amount:0, price_data:[], pre_post_paid_option: this.get_pre_post_paid_option_tags_object(),
                entered_title_text:'', entered_image_objects:[]
            })
        }
        this.setState({contractor_item: contractor_item})
    }

    finish_creating_response(){
        var selected_contract = this.state.picked_contract
        var selected_time = this.state.application_expiry_time
        var entered_title_text = this.state.entered_title_text.trim()

        if(selected_time-Date.now()/1000 < 900){
            this.props.notify('you cant set an expiry time thats less than fifteen minutes from now', 600)
        }
        else if(entered_title_text == ''){
            this.props.notify('you need to set a description for the job request')
        }
        else{
            this.props.add_send_job_request_to_stack(this.state)
            this.setState({
                selected: 0, type:'job-request', id:makeid(8),
                entered_indexing_tags:['send', 'job', 'request'], send_job_request_title_tags_object: this.get_send_job_request_title_tags_object(), picked_contract: null, application_expiry_time: (Date.now()/1000)+6000, exchange_id: '', price_amount:0, price_data:[], pre_post_paid_option: this.get_pre_post_paid_option_tags_object(),
                entered_title_text:'', entered_image_objects:[]
            })
            this.props.notify('transaction added to stack', 600)
        }
    }















    get_selected_item(object, option){
        var selected_item = object[option][2][0]
        var picked_item = object[option][1][selected_item];
        return picked_item
    }


    /* renders the specific element in the post or detail object */
    render_detail_item(item_id, object_data){
        return(
            <div>
                <ViewGroups item_id={item_id} object_data={object_data} theme={this.props.theme} width={this.props.app_state.width} />
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


}




export default SendJobRequestPage;