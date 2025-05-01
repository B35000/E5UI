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
import TextInput from './../components/text_input';
import NumberPicker from './../components/number_picker';

// import Letter from './../assets/letter.png';
// import E5EmptyIcon from './../assets/e5empty_icon.png';
// import E5EmptyIcon3 from './../assets/e5empty_icon3.png';

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDateTimePicker } from "@mui/x-date-pickers/StaticDateTimePicker";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import imageCompression from 'browser-image-compression';

import { SwipeableList, SwipeableListItem } from '@sandstreamdev/react-swipeable-list';
import '@sandstreamdev/react-swipeable-list/dist/styles.css';

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

function start_and_end(str) {
  if (str.length > 13) {
    return str.substr(0, 6) + '...' + str.substr(str.length-6, str.length);
  }
  return str;
}

class SendJobRequestPage extends Component {
    
    state = {
        selected: 0, contractor_item:{'id':0},  type:this.props.app_state.loc['1363']/* 'job-request' */, id:makeid(8),
        entered_indexing_tags:[this.props.app_state.loc['1364']/* 'send' */, this.props.app_state.loc['1365']/* 'job' */, this.props.app_state.loc['1366']/* 'request' */], send_job_request_title_tags_object: this.get_send_job_request_title_tags_object(), picked_contract: null, application_expiry_time: (Date.now()/1000)+6000, exchange_id: '', price_amount:0, price_data:[], pre_post_paid_option: this.get_pre_post_paid_option_tags_object(),
        entered_title_text:'', entered_image_objects:[], e5: this.props.app_state.selected_e5, entered_pdf_objects:[],
    };

    get_send_job_request_title_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['or','',0], ['e'/* , this.props.app_state.loc['1311'] *//* 'contract' */, this.props.app_state.loc['1312']/* 'expiry-time' */, this.props.app_state.loc['1313']/* 'amount' */], [0]
            ],
        };
    }

    get_pre_post_paid_option_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e',this.props.app_state.loc['1314']/* 'prepaid' */, this.props.app_state.loc['1315']/* 'postpaid' */], [1]
            ],
        }
    }

    render(){
        return(
            <div style={{'padding':'10px 10px 0px 10px'}}>
                <div className="row">
                    <div className="col-11" style={{'padding': '0px 0px 0px 10px'}}>
                        <Tags font={this.props.app_state.font} page_tags_object={this.state.send_job_request_title_tags_object} tag_size={'l'} when_tags_updated={this.when_send_job_request_title_tags_object_updated.bind(this)} theme={this.props.theme}/>
                    </div>
                    <div className="col-1" style={{'padding': '0px 0px 0px 0px'}}>
                        <div className="text-end" style={{'padding': '0px 10px 0px 0px'}} >
                            <img className="text-end" onClick={()=>this.finish_creating_response()} src={this.props.theme['close']} style={{height:36, width:'auto'}} />
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
        else if(selected_item == this.props.app_state.loc['1311']/* 'contract' */){
            return(
                <div>
                    {this.render_select_contract_parts()}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['1312']/* 'expiry-time' */){
            return(
                <div>
                    {this.render_application_expiry_time()}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['1313']/* 'amount' */){
            return(
                <div>
                    {this.render_application_prices()}
                </div>
            )
        }
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

    render_title_details_part(){
        var size = this.props.app_state.size

        if(size == 's'){
            return(
                <div>
                    {this.render_title_details_part_data()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_title_details_part_data()}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_empty_views(3)}
                    </div>
                </div>
                
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_title_details_part_data()}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_empty_views(3)}
                    </div>
                </div>
                
            )
        }
    }

    render_title_details_part_data(){
        return(
            <div ref={this.pick_images_view_width}>
                {this.render_detail_item('4',{'font':this.props.app_state.font, 'textsize':'13px','text':this.props.app_state.loc['1345']/* 'Set some details for your new job request. It should be task specific.' */})}
                <div style={{height:10}}/>
                <TextInput font={this.props.app_state.font} height={70} placeholder={this.props.app_state.loc['1346']/* 'Enter Details...' */} when_text_input_field_changed={this.when_title_text_input_field_changed.bind(this)} text={this.state.entered_title_text} theme={this.props.theme}/> 
                {this.render_detail_item('0')}

                {this.render_detail_item('4',{'font':this.props.app_state.font, 'textsize':'13px','text':this.props.app_state.loc['1042f']/* 'Gray stages images and black stages a pdf. Then tap to remove.' */})}
                {this.render_create_image_ui_buttons_part()}
                {this.render_pdfs_part()}
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
                <div style={{'position': 'relative', 'width':45, 'height':45, 'padding':'0px 0px 0px 0px', 'margin':'0px 10px 0px 0px'}}>
                    <img alt="" src={this.props.app_state.static_assets['e5_empty_icon3']} style={{height:45, width:'auto', 'z-index':'1' ,'position': 'absolute'}} onClick={() => this.props.show_pick_file_bottomsheet('image', 'create_image', 10**16)}/>
                </div>

                <div style={{'position': 'relative', 'width':45, 'height':45, 'padding':'0px 0px 0px 0px'}}>
                    <img alt="" src={this.props.app_state.static_assets['e5_empty_icon']} style={{height:45, width:'auto', 'z-index':'1' ,'position': 'absolute'}} onClick={() => this.props.show_pick_file_bottomsheet('pdf', 'create_pdf', 10**16)}/>
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
                    if(ev.total < this.props.app_state.image_size_limit){
                        clonedArray.push(ev.target.result);
                        this.setState({entered_image_objects: clonedArray});
                    }
                }.bind(this);
                var imageFile = e.target.files[i];
                imageCompression(imageFile, { maxSizeMB: 0.35, maxWidthOrHeight: 1920, useWebWorker: true }).then(function (compressedFile) {
                    reader.readAsDataURL(compressedFile);
                })
                .catch(function (error) {
                    console.log(error.message);
                });
            }
            var image = e.target.files.length == 1 ? 'image has' : 'images have';
            // this.props.notify('Your selected '+e.target.files.length+image+' been added.',500);
        }
    }

    when_image_gif_files_picked(files){
        var clonedArray = this.state.entered_image_objects == null ? [] : this.state.entered_image_objects.slice();
        files.forEach(file => {
            clonedArray.push(file);
        });
        this.setState({entered_image_objects: clonedArray});
    }




    when_pdf_files_picked(files){
        var clonedArray = this.state.entered_pdf_objects == null ? [] : this.state.entered_pdf_objects.slice();
        files.forEach(file => {
            clonedArray.push(file);
        });
        this.setState({entered_pdf_objects: clonedArray});
    }

    render_pdfs_part(){
        var items = [].concat(this.state.entered_pdf_objects)

        if(items.length == 0) return;

        return(
            <div style={{'margin':'0px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                    {items.map((item, index) => (
                        <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}} onClick={()=>this.when_uploaded_pdf_item_clicked(item, index)}>
                            {this.render_uploaded_file(item, index)}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    when_uploaded_pdf_item_clicked(item, index){
        var cloned_array = this.state.entered_pdf_objects.slice()
        if (index > -1) { // only splice array when item is found
            cloned_array.splice(index, 1); // 2nd parameter means remove one item only
        }
        this.setState({entered_pdf_objects: cloned_array})
    }

    render_uploaded_file(item, index){
        var ecid_obj = this.get_cid_split(item)
        if(this.props.app_state.uploaded_data[ecid_obj['filetype']] == null) return
        var data = this.props.app_state.uploaded_data[ecid_obj['filetype']][ecid_obj['full']]
        //
        var formatted_size = this.format_data_size(data['size'])
        var fs = formatted_size['size']+' '+formatted_size['unit']
        var title = data['type']+' • '+fs+' • '+this.get_time_difference(data['id']/1000)+this.props.app_state.loc['1593bx']/* ' ago.' */;
        title = fs;
        var details = start_and_end(data['name'])
        var thumbnail = data['thumbnail']

        return(
            <div>
                {this.render_detail_item('8', {'details':title,'title':details, 'size':'s', 'image':thumbnail, 'border_radius':'15%'})}
            </div>
        )
    }

    format_data_size(size){
        if(size > 1_000_000_000){
            return {'size':Math.round(size/1_000_000_000), 'unit':'GBs'}
        }
        else if(size > 1_000_000){
            return {'size':Math.round(size/1_000_000), 'unit':'MBs'}
        }
        else if(size > 1_000){
            return {'size':Math.round(size/1_000), 'unit':'KBs'}
        }
        else{
            return {'size':size, 'unit':'bytes'}
        }
    }



    constructor(props) {
        super(props);
        this.pick_images_view_width = React.createRef();
        this.amount_picker = React.createRef();
    }

    componentDidMount(){
        this.setState({screen_width: this.pick_images_view_width.current.offsetWidth})
    }


    render_image_part(){
        var col = Math.round(this.state.screen_width / 100)
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
                                        <img src={this.props.app_state.theme['letter']} style={{height:40 ,width:'auto'}} />
                                    </div>
                                </div>
                            </ImageListItem>
                        ))}
                    </ImageList>
                </div>
            )
        }else{
            var items = [].concat(this.state.entered_image_objects)
            var background_color = this.props.theme['card_background_color']
            return(
                <div>
                    <ImageList sx={{ width: 'auto', height: 'auto' }} cols={col} rowHeight={rowHeight}>
                        {items.map((item, index) => (
                            <ImageListItem key={item.img}>
                                {this.render_image_item(item, index)}
                            </ImageListItem>
                        ))}
                    </ImageList>
                </div>
            )
        }
    }



    render_image_item(ecid, index){
        return(
            <div onClick={() => this.when_image_clicked(index)}>
                <img alt="" src={this.get_image_from_file(ecid)} style={{height:100 ,width:100}} />
            </div>
        )
    }

    get_image_from_file(ecid){
        var ecid_obj = this.get_cid_split(ecid)
        if(this.props.app_state.uploaded_data[ecid_obj['filetype']] == null) return
        var data = this.props.app_state.uploaded_data[ecid_obj['filetype']][ecid_obj['full']]
        if(data == null) return
return data['data']
    }

    get_cid_split(ecid){
        var split_cid_array = ecid.split('_');
        var filetype = split_cid_array[0]
        var cid_with_storage = split_cid_array[1]
        var cid = cid_with_storage
        var storage = 'ch'
        if(cid_with_storage.includes('.')){
            var split_cid_array2 = cid_with_storage.split('.')
            cid = split_cid_array2[0]
            storage = split_cid_array2[1]
        }

        return{'filetype':filetype, 'cid':cid, 'storage':storage, 'full':ecid}
    }

    when_image_clicked(index){
        var cloned_array = this.state.entered_image_objects.slice()
        if (index > -1) { // only splice array when item is found
            cloned_array.splice(index, 1); // 2nd parameter means remove one item only
        }
        this.setState({entered_image_objects: cloned_array})
    }






    render_select_contract_parts(){
        var size = this.props.app_state.size

        if(size == 's'){
            return(
                <div>
                    {this.render_select_contract_parts_data()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_select_contract_parts_data()}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_empty_views(3)}
                    </div>
                </div>
                
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_select_contract_parts_data()}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_empty_views(3)}
                    </div>
                </div>
                
            )
        }
    }


    render_select_contract_parts_data(){
        var items = this.get_contract_items()

        return(
            <div>
                {this.render_detail_item('4',{'font':this.props.app_state.font, 'textsize':'13px','text':this.props.app_state.loc['1347']/* 'Select the contract youll be using. If you have no contracts, first create one then youll see it here.' */})}
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
                                        <img src={this.props.app_state.theme['letter']} style={{height:60 ,width:'auto'}} />
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
        var created_contracts = this.get_all_sorted_objects(this.props.app_state.my_created_contracts)
        for(var i = 0; i < created_contracts.length; i++){
            var post_author = created_contracts[i]['event'] == null ? 0 : created_contracts[i]['event'].returnValues.p3
            var myid = this.props.app_state.user_account_id[created_contracts[i]['e5']]
            if(post_author.toString() == myid.toString()){
                // if(this.props.app_state.my_contract_applications[this.props.app_state.created_contracts[i]['id']] == null){
                //     my_contracts.push(this.props.app_state.created_contracts[i])
                // }else{
                //     if(this.props.app_state.my_contract_applications[this.props.app_state.created_contracts[i]['id']] < Date.now()/1000){
                //     }
                // }
                my_contracts.push(created_contracts[i])
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
                        <div style={{height:'1px', 'background-color':this.props.app_state.theme['line_color'], 'margin': '0px 10px 15px 10px'}}/>
                        <div style={{height:'1px', 'background-color':this.props.app_state.theme['line_color'], 'margin': '0px 10px 15px 10px'}}/>
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
            'age':{ 'style':'s', 'title':'', 'subtitle':'', 'barwidth':this.get_number_width(age), 'number':`${number_with_commas(age)}`, 'barcolor':'', 'relativepower':this.props.app_state.loc['1348']/* 'block' */, }
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
        var size = this.props.app_state.size

        if(size == 's'){
            return(
                <div>
                    {this.render_application_expiry_time_data()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_application_expiry_time_data()}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_empty_views(3)}
                    </div>
                </div>
                
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_application_expiry_time_data()}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_empty_views(3)}
                    </div>
                </div>
                
            )
        }
    }

    render_application_expiry_time_data(){
        return(
            <div>
                {this.render_detail_item('4',{'font':this.props.app_state.font, 'textsize':'13px','text':this.props.app_state.loc['1349']/* 'Select an expiry time for your job request.' */})}

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
        var size = this.props.app_state.size

        if(size == 's'){
            return(
                <div>
                    {this.render_application_prices_data()}
                    {this.render_set_prices_list_part()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_application_prices_data()}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_set_prices_list_part()}
                    </div>
                </div>
                
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_application_prices_data()}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_set_prices_list_part()}
                    </div>
                </div>
                
            )
        }
    }


    render_application_prices_data(){
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['1350']/* 'Prepaid or Postpaid' */, 'details':this.props.app_state.loc['1351']/* 'Set the payment option you prefer for the job request.' */, 'size':'l'})}
                <div style={{height: 10}}/>
                
                <Tags font={this.props.app_state.font} page_tags_object={this.state.pre_post_paid_option} tag_size={'l'} when_tags_updated={this.when_pre_post_paid_option_tags_object_updated.bind(this)} theme={this.props.theme}/>
                <div style={{height: 10}}/>

                {this.render_detail_item('3', {'title':this.props.app_state.loc['1352']/* 'Requested Pay' */, 'details':this.props.app_state.loc['1353']/* 'Select an exchange by its id, then the desired price and click add' */, 'size':'l'})}

                <div style={{height:10}}/>
                <TextInput font={this.props.app_state.font} height={30} placeholder={this.props.app_state.loc['1354']/* 'Exchange ID' */} when_text_input_field_changed={this.when_exchange_id_input_field_changed.bind(this)} text={this.state.exchange_id} theme={this.props.theme}/>

                {this.load_token_suggestions('exchange_id')}
                <div style={{height: 10}}/>

                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['1355']/* 'Price' */, 'number':this.state.price_amount, 'relativepower':this.props.app_state.loc['1356']/* 'tokens' */})}>
                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['1355']/* 'Price' */, 'subtitle':this.format_power_figure(this.state.price_amount), 'barwidth':this.calculate_bar_width(this.state.price_amount), 'number':this.format_account_balance_figure(this.state.price_amount), 'barcolor':'', 'relativepower':this.props.app_state.loc['1356']/* 'tokens' */, })}
                </div>

                <NumberPicker clip_number={this.props.app_state.clip_number} ref={this.amount_picker} font={this.props.app_state.font} number_limit={bigInt('1e'+(this.get_power_limit_for_exchange(this.state.exchange_id)+9))} when_number_picker_value_changed={this.when_price_amount.bind(this)} theme={this.props.theme} power_limit={this.get_power_limit_for_exchange(this.state.exchange_id)}/>

                <div style={{'padding': '5px'}} onClick={() => this.when_add_price_set()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['1357']/* 'Add Pay' */, 'action':''})}
                </div>

            </div>
        )
    }

    get_power_limit_for_exchange(exchange){
        var exchange_id = this.get_token_id_from_symbol(exchange.trim())

        if(!isNaN(exchange_id) && parseInt(exchange_id) > 0 && exchange_id != '' && this.does_exchange_exist(exchange_id)){
            var target_exchange_data = this.props.app_state.created_token_object_mapping[this.props.app_state.selected_e5][exchange_id]
            var default_depth = 0;
            if(target_exchange_data != null){
                target_exchange_data = target_exchange_data['ipfs']
                if(target_exchange_data != null){
                    default_depth = target_exchange_data.default_depth == null ? 0 : target_exchange_data.default_depth
                }
            }

            return (default_depth*72)+63
        }
        else{
            return 63
        }
    }

    when_pre_post_paid_option_tags_object_updated(tag_obj){
        this.setState({pre_post_paid_option: tag_obj})
    }

    when_exchange_id_input_field_changed(text){
        this.setState({exchange_id: text})
        this.reset_the_number_picker()
    }

    reset_the_number_picker(){
        var me = this;
        setTimeout(function() {
            if(me.amount_picker.current != null){
                me.amount_picker.current.reset_number_picker()
            }
        }, (1 * 1000));  
    }

    when_price_amount(amount){
        this.setState({price_amount: amount})
    }

    when_add_price_set(){
        var exchange_id = this.get_token_id_from_symbol(this.state.exchange_id.trim())
        var amount = this.state.price_amount
        if(isNaN(exchange_id) || parseInt(exchange_id) < 0 || exchange_id == '' || !this.does_exchange_exist(exchange_id)){
            this.props.notify(this.props.app_state.loc['1358']/* 'Please put a valid exchange ID.' */, 1600)
        }
        else if(amount == 0){
            this.props.notify(this.props.app_state.loc['1359']/* 'Please put a valid amount.' */, 1600)
        }
        else{
            var price_data_clone = this.state.price_data.slice()
            price_data_clone.push({'id':exchange_id, 'amount':amount})
            this.setState({price_data: price_data_clone});
            this.props.notify(this.props.app_state.loc['1360']/* 'Added price.' */, 1400)
        }
    }

    does_exchange_exist(exchange_id){
        if(this.props.app_state.created_token_object_mapping[this.state.e5][parseInt(exchange_id)] == null){
            return false
        }
        return true
    }

    get_token_id_from_symbol(typed_search){
        if(!isNaN(typed_search)){
            return typed_search
        }
        var id = this.props.app_state.token_directory[this.state.e5][typed_search.toUpperCase()] == null ? typed_search : this.props.app_state.token_directory[this.state.e5][typed_search.toUpperCase()]

        return id
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
                    <ul style={{ 'padding': '0px 0px 0px 0px', 'list-style':'none'}}>
                        {items.map((item, index) => (
                            <li style={{'padding': '2px 5px 2px 5px'}} onClick={()=>console.log()}>
                                <div style={{height:60, width:'100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px','padding':'10px 0px 10px 10px', 'display': 'flex', 'align-items':'center','justify-content':'center'}}>
                                    <div style={{'margin':'10px 20px 10px 0px'}}>
                                        <img src={this.props.app_state.theme['letter']} style={{height:30 ,width:'auto'}} />
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
                    <ul style={{ 'padding': '0px 0px 0px 0px', 'list-style':'none'}}>
                        {items.reverse().map((item, index) => (
                            <SwipeableList>
                                <SwipeableListItem
                                    swipeLeft={{
                                    content: <p style={{'color': this.props.theme['primary_text_color']}}>{this.props.app_state.loc['2751']/* Delete */}</p>,
                                    action: () =>this.when_amount_clicked(item)
                                    }}>
                                    <div style={{width:'100%', 'background-color':this.props.theme['send_receive_ether_background_color']}}>
                                        <li style={{'padding': '5px'}}>
                                            <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[this.state.e5+item['id']], 'number':item['amount'], 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['id']]})}>
                                                {this.render_detail_item('2', { 'style':'l', 'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[this.state.e5+item['id']], 'subtitle':this.format_power_figure(item['amount']), 'barwidth':this.calculate_bar_width(item['amount']), 'number':this.format_account_balance_figure(item['amount']), 'barcolor':'', 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['id']], })}
                                            </div>
                                        </li>
                                    </div>
                                </SwipeableListItem>
                            </SwipeableList>
                            
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
            {'id':'3', 'label':{'title':'END', 'details':this.props.app_state.loc['1361']/* 'Account 3' */, 'size':'s'}},
            {'id':'5', 'label':{'title':'SPEND', 'details':this.props.app_state.loc['1362']/* 'Account 5' */, 'size':'s'}},
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
        this.reset_the_number_picker()
    }

    set_object(contractor_item){
        if(this.state.contractor_item['id'] != contractor_item['id']){
            this.setState({
                selected: 0,  type:this.props.app_state.loc['1363']/* 'job-request' */, id:makeid(8),
                entered_indexing_tags:[this.props.app_state.loc['1364']/* 'send' */, this.props.app_state.loc['1365']/* 'job' */, this.props.app_state.loc['1366']/* 'request' */], send_job_request_title_tags_object: this.get_send_job_request_title_tags_object(), picked_contract: null, application_expiry_time: (Date.now()/1000)+6000, exchange_id: '', price_amount:0, price_data:[], pre_post_paid_option: this.get_pre_post_paid_option_tags_object(),
                entered_title_text:'', entered_image_objects:[]
            })
        }
        this.setState({contractor_item: contractor_item, e5: contractor_item['e5']})
    }

    finish_creating_response(){
        var selected_contract = this.state.picked_contract
        var selected_time = this.state.application_expiry_time
        var entered_title_text = this.state.entered_title_text.trim()

        if(selected_time-Date.now()/1000 < 900){
            this.props.notify(this.props.app_state.loc['1367']/* 'You cant set an expiry time thats less than fifteen minutes from now.' */, 600)
        }
        else if(entered_title_text == ''){
            this.props.notify(this.props.app_state.loc['1368']/* 'You need to set a description for the job request.' */)
        }
        else{
            this.props.add_send_job_request_to_stack(this.state)
            this.setState({
                selected: 0, type:this.props.app_state.loc['1363']/* 'job-request' */, id:makeid(8),
                entered_indexing_tags:[this.props.app_state.loc['1364']/* 'send' */, this.props.app_state.loc['1365']/* 'job' */, this.props.app_state.loc['1366']/* 'request' */], send_job_request_title_tags_object: this.get_send_job_request_title_tags_object(), picked_contract: null, application_expiry_time: (Date.now()/1000)+6000, exchange_id: '', price_amount:0, price_data:[], pre_post_paid_option: this.get_pre_post_paid_option_tags_object(),
                entered_title_text:'', entered_image_objects:[], entered_pdf_objects:[]
            })
            this.props.notify(this.props.app_state.loc['18']/* 'transaction added to stack' */, 1600)
        }
    }















    get_selected_item(object, option){
        var selected_item = object[option][2][0]
        var picked_item = object[option][1][selected_item];
        return picked_item
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




export default SendJobRequestPage;