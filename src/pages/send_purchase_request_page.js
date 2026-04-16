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

class SendPurchaseRequestPage extends Component {
    
    state = {
        selected: 0, storefront_item:{'id':0},  type:this.props.app_state.loc['3096']/* 'purchase-request' */, id:makeid(8), entered_indexing_tags:[this.props.app_state.loc['1364']/* 'send' */, this.props.app_state.loc['3096a']/* 'purchase' */, this.props.app_state.loc['1366']/* 'request' */], send_job_request_title_tags_object: this.get_send_job_request_title_tags_object(), picked_contract: null, application_expiry_time: (Date.now()/1000)+6000, exchange_id: '', price_amount:0, price_data:[],
        entered_title_text:'', entered_image_objects:[], e5: this.props.app_state.selected_e5, entered_pdf_objects:[], pins:[], get_chain_or_indexer_job_object: this.get_chain_or_indexer_job_object(),

        purchase_unit_count:1, selected_variant:null, purchase_option_tags_array:[], fulfilment_location:'', condition_data:[],

        exchange_id2: '', price_amount2:0, price_data2:[],
    };

    get_send_job_request_title_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['or','',0], ['e', this.props.app_state.loc['1312']/* 'expiry-time' */, this.props.app_state.loc['3096c']/* 'order' */, this.props.app_state.loc['3096b']/* conditions */, this.props.app_state.loc['3096s']/* custom-pay */], [0]
            ],
        };
    }

    get_chain_or_indexer_job_object(){
        const pos = this.props.do_i_have_an_account() == true ? 1 : 2
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e', this.props.app_state.loc['1593cw']/* 'nitro 🛰️' */, this.props.app_state.loc['284v']/* 'blockchain' */], [pos]
            ],
        };
    }

    constructor(props) {
        super(props);
        this.pick_images_view_width = React.createRef();
        this.amount_picker = React.createRef();
        this.amount_picker2 = React.createRef();
    }

    componentDidMount(){
        this.setState({screen_width: this.pick_images_view_width.current.offsetWidth})
        this.get_fulfilment_location_from_local_storage()
    }

    get_fulfilment_location_from_local_storage = async () => {
        var fulfilment_locations = await this.props.get_local_storage_data_if_enabled("fulfilment");
        if(fulfilment_locations != null && fulfilment_locations != ""){
            fulfilment_locations = JSON.parse(fulfilment_locations)
            this.setState({fulfilment_locations_data: fulfilment_locations['data']})
        }
    }

    set_object(storefront_item){
        if(this.state.storefront_item['id'] != storefront_item['id']){
            this.setState({
                selected: 0, storefront_item:{'id':0},  type:this.props.app_state.loc['3096']/* 'purchase-request' */, id:makeid(8), entered_indexing_tags:[this.props.app_state.loc['1364']/* 'send' */, this.props.app_state.loc['3096a']/* 'purchase' */, this.props.app_state.loc['1366']/* 'request' */], send_job_request_title_tags_object: this.get_send_job_request_title_tags_object(), picked_contract: null, application_expiry_time: (Date.now()/1000)+6000, exchange_id: '', price_amount:0, price_data:[],
                entered_title_text:'', entered_image_objects:[], e5: this.props.app_state.selected_e5, entered_pdf_objects:[], pins:[], get_chain_or_indexer_job_object: this.get_chain_or_indexer_job_object(), purchase_unit_count:1, selected_variant:null, purchase_option_tags_array:[], fulfilment_location:'', condition_data:[]
            })
        }
        this.setState({storefront_item: storefront_item, e5: storefront_item['e5']})
        this.set_up_option_groups(storefront_item)
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
        else if(selected_item == this.props.app_state.loc['1312']/* 'expiry-time' */){
            return(
                <div>
                    {this.render_application_expiry_time()}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['3096c']/* 'order' */){
            return(
                <div>
                    {this.render_direct_purchase_order_details()}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['3096b']/* conditions */){
            return(
                <div>
                    {this.render_purchase_order_condition_details()}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['3096s']/* custom-pay */){
            return this.render_custom_pay_details()
        }
    }

    render_title_details_part(){
        var size = this.props.app_state.size

        if(size == 's'){
            return(
                <div>
                    {this.render_title_details_part_data()}
                    {this.render_detail_item('0')}
                    {this.render_title_details_part_data2()}
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
                        {this.render_title_details_part_data2()}
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
                        {this.render_title_details_part_data2()}
                    </div>
                </div>
                
            )
        }
    }

    render_title_details_part_data(){
        return(
            <div ref={this.pick_images_view_width}> 
                {this.render_detail_item('3', {'title':this.props.app_state.loc['1097']/* 'Fulfilment Location' */, 'details':this.props.app_state.loc['1098']/* 'Set the delivery location, and be sure to be specific to avoid shipping issues' */, 'size':'l'})}
                <div style={{height:10}}/>
                <TextInput font={this.props.app_state.font} height={70} placeholder={this.props.app_state.loc['1099']/* 'Shipping Details...' */} when_text_input_field_changed={this.when_fulfilment_location_input_field_changed.bind(this)} text={this.state.fulfilment_location} theme={this.props.theme}/>
                <div style={{height:10}}/>
                {this.render_shipping_detail_suggestions()}

                {this.render_detail_item('3', {'title':this.props.app_state.loc['1368a']/* 'Location Info.' */, 'details':this.props.app_state.loc['1368b']/* 'You can optionally specify some locations from your saved pins or on a map if the job is location specific.' */, 'size':'l'})}
                <div style={{height:10}}/>
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        <div onClick={()=> this.props.show_set_map_location(this.state.pins)}>
                            {this.render_detail_item('5', {'text':this.props.app_state.loc['284c']/* Add Location. */, 'action':''})}
                        </div>
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        <div onClick={()=> this.props.show_dialog_bottomsheet({'pins':this.state.pins}, 'pick_from_my_locations')}>
                            {this.render_detail_item('5', {'text':this.props.app_state.loc['535bk']/* Add From Saved */, 'action':''})}
                        </div>
                    </div>
                </div>
                <div style={{height:10}}/>
                {this.render_selected_pins()}

                {this.render_detail_item('0')}
                {this.render_detail_item('3', {'title':this.props.app_state.loc['1368c']/* 'Request Indexing' */, 'details':this.props.app_state.loc['1368d']/* 'If set to blockchain, the reference to your new request will be recorded on a blockchain and indexer while if left to indexer, your new request will be referenced in an indexer only..' */, 'size':'l'})}
                <div style={{height:10}}/>
                <Tags font={this.props.app_state.font} page_tags_object={this.state.get_chain_or_indexer_job_object} tag_size={'l'} when_tags_updated={this.when_get_chain_or_indexer_job_object_updated.bind(this)} theme={this.props.theme}/>

                
            </div>
        )
    }

    render_title_details_part_data2(){
        return(
            <div>
                {this.render_detail_item('4',{'font':this.props.app_state.font, 'textsize':'13px','text':this.props.app_state.loc['1042f']/* 'Gray stages images and black stages a pdf. Then tap to remove.' */})}
                {this.render_create_image_ui_buttons_part()}
                {this.render_pdfs_part()}
                {this.render_image_part()}
            </div>
        )
    }

    render_shipping_detail_suggestions(){
        var items = [].concat(this.state.fulfilment_locations_data || [])
        if(items.length == 0) return;
        return(
            <div style={{'margin':'0px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                    {items.map((item, index) => (
                        <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}} onClick={()=> this.when_suggestion_clicked(item, index)}>
                            {this.render_detail_item('3',{'title':this.truncate(item['text'], 15), 'details':this.get_time_difference(item['time']),'size':'s'})}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    when_get_chain_or_indexer_job_object_updated(tag_obj){
        this.setState({get_chain_or_indexer_job_object: tag_obj})
    }

    render_selected_pins(){
        var items = [].concat(this.state.pins)
        if(items.length == 0){
            items = [1, 2, 3]
            return(
                <div>
                    <div style={{'margin':'3px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                        <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                            {items.map((item, index) => (
                                <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}}>
                                    {this.render_empty_horizontal_list_item2()}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )
        }
        return(
            <div>
                <div style={{'margin':'3px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                    <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                        {items.reverse().map((item, index) => (
                            <li style={{'display': 'inline-block', 'margin': '0px 2px 1px 2px', '-ms-overflow-style':'none'}}>
                                {this.render_pin_item(item)}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        )
    }

    render_pin_item(item){
        const title = item['id']
        const details = item['description'] == '' ? this.props.app_state.loc['284q']/* 'latitude: $, longitude: %' */.replace('$', item['lat']).replace('%', item['lng']) : this.truncate(item['description'], 17)
        return(
            <div>
                {this.render_detail_item('3', {'title':title, 'details':details, 'size':'s'})}
            </div>
        )
    }

    set_pins(pins){
        this.setState({pins: pins})
    }

    when_suggestion_clicked = (item, pos) => {
        let me = this;
        if(Date.now() - this.last_all_click_time2 < 200){
            clearTimeout(this.all_timeout);
            //double tap
            me.when_location_suggestion_double_tapped(item, pos)
        }else{
            this.all_timeout = setTimeout(function() {
                clearTimeout(this.all_timeout);
                // single tap
                me.when_location_suggestion_tapped(item, pos)
            }, 200);
        }
        this.last_all_click_time2 = Date.now();
    }

    when_location_suggestion_tapped(item, pos){
        this.setState({fulfilment_location: item['text']})
    }

    when_location_suggestion_double_tapped(item, pos){
        this.remove_fulfilment_location_from_local_storage(pos)
    }

    when_fulfilment_location_input_field_changed(text){
        this.setState({fulfilment_location: text})
    }

    render_create_image_ui_buttons_part(){
        //csv_file_button, json_file_button, lrc_file_button, pdf_file_button, vtt_file_button, image_file_button, zip_file_button, music_file_button, video_file_button
        return(
            <div style={{'display': 'flex','flex-direction': 'row','margin':'0px 0px 0px 0px','padding': '7px 5px 10px 10px', width: '99%'}}>
                <div style={{'position': 'relative', 'width':45, 'height':45, 'padding':'0px 0px 0px 0px', 'margin':'0px 10px 0px 0px'}}>
                    <img alt="" src={this.props.app_state.static_assets['image_file_button']} style={{height:45, width:'auto', 'z-index':'1' ,'position': 'absolute'}} onClick={() => this.props.show_pick_file_bottomsheet('image', 'create_image', 10**16)}/>
                </div>

                <div style={{'position': 'relative', 'width':45, 'height':45, 'padding':'0px 0px 0px 0px'}}>
                    <img alt="" src={this.props.app_state.static_assets['pdf_file_button']} style={{height:45, width:'auto', 'z-index':'1' ,'position': 'absolute'}} onClick={() => this.props.show_pick_file_bottomsheet('pdf', 'create_pdf', 10**16)}/>
                </div>

            </div>
      )
    }

    when_image_gif_files_picked = async (files) =>{
        var clonedArray = this.state.entered_image_objects == null ? [] : this.state.entered_image_objects.slice();
        var cloned_ecid_encryption_passwords = this.state.ecid_encryption_passwords == null ? {} : structuredClone(this.state.ecid_encryption_passwords)
        files.forEach(file => {
            clonedArray.push(file);
        });
        for(var f=0; f<files.length; f++){
            const file = files[f]
            cloned_ecid_encryption_passwords[file] = await this.props.get_ecid_file_password_if_any(file)
        }
        this.setState({entered_image_objects: clonedArray, ecid_encryption_passwords: cloned_ecid_encryption_passwords});
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



    when_pdf_files_picked = async (files) => {
        var clonedArray = this.state.entered_pdf_objects == null ? [] : this.state.entered_pdf_objects.slice();
        files.forEach(file => {
            clonedArray.push(file);
        });

        var cloned_ecid_encryption_passwords = this.state.ecid_encryption_passwords == null ? {} : structuredClone(this.state.ecid_encryption_passwords)
        for(var f=0; f<files.length; f++){
            const file = files[f]
            cloned_ecid_encryption_passwords[file] = await this.props.get_ecid_file_password_if_any(file)
        }
        this.setState({entered_pdf_objects: clonedArray, ecid_encryption_passwords: cloned_ecid_encryption_passwords});
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
                {this.render_detail_item('4',{'font':this.props.app_state.font, 'textsize':'13px','text':this.props.app_state.loc['3096v']/* 'Set an expiry time for your purchase request; a time after which the storefront owner cannot respond to this new request.' */})}

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







    render_direct_purchase_order_details(){
        var size = this.props.app_state.size

        if(size == 's'){
            return(
                <div>
                    {this.render_content()}
                    {this.render_purchase_options()}
                    {this.render_price_content()}
                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_content()}
                        {this.render_detail_item('0')}
                        {this.render_detail_item('0')}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_purchase_options()}
                        {this.render_price_content()}
                        {this.render_empty_views(3)}
                    </div>
                </div>
                
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_content()}
                        {this.render_detail_item('0')}
                        {this.render_detail_item('0')}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_purchase_options()}
                        {this.render_price_content()}
                        {this.render_empty_views(3)}
                    </div>
                </div>
                
            )
        }
    }

    render_content(){
        var object = this.state.storefront_item

        if(object['ipfs'] != null){
            var composition_type = object['ipfs'].composition_type == null ? 'items' : this.get_selected_item(object['ipfs'].composition_type, 'e')

            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['1100']/* 'Item Variants' */, 'details':this.props.app_state.loc['1101']/* 'Pick the variant you want to purchase' */, 'size':'l'})}
                    <div style={{height:10}}/>
                    {this.render_item_variants()}
                    {this.render_selected_variant()}

                    <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['1102']/* 'Amount in ' */+composition_type, 'number':this.state.purchase_unit_count, 'relativepower':composition_type})}>
                        {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['1102']/* 'Amount in ' */+composition_type, 'subtitle':this.format_power_figure(this.state.purchase_unit_count), 'barwidth':this.calculate_bar_width(this.state.purchase_unit_count), 'number':this.format_account_balance_figure(this.state.purchase_unit_count), 'barcolor':'', 'relativepower':composition_type, })}
                    </div>

                    <div style={{height:10}}/>
                    <TextInput height={30} placeholder={this.props.app_state.loc['1058f']/* 'Amount...' */} when_text_input_field_changed={this.when_purchase_unit_count_input_field_changed.bind(this)} text={this.state.purchase_unit_count.toString()} theme={this.props.theme}/>

                    {this.render_detail_item('0')}

                    {this.render_detail_item('3', {'title':this.props.app_state.loc['1114c']/* 'Custom Specifications.' */, 'details':this.props.app_state.loc['1114d']/* 'You can also include custom requirements for the item variant your ordering such as color, material and such.' */, 'size':'l'})}
                    <div style={{height:10}}/>
                    <TextInput font={this.props.app_state.font} height={70} placeholder={this.props.app_state.loc['1114e']/* 'Custom Specifications.' */} when_text_input_field_changed={this.when_custom_specifications_input_field_changed.bind(this)} text={this.state.custom_specifications} theme={this.props.theme}/>
                    

                </div>
            )
        }
    }

    when_purchase_unit_count_input_field_changed(text){
        if(!isNaN(text)){
            this.setState({purchase_unit_count: bigInt(text)})
        }
    }

    get_variant_supply(){
        if(this.state.selected_variant != null){
            return this.state.selected_variant['available_unit_count']
        }else{
            return bigInt('1e72')
        }
    }

    when_purchase_unit_count(amount){
        this.setState({purchase_unit_count: amount})
    }

    when_custom_specifications_input_field_changed(text){
        this.setState({custom_specifications: text})
    }


    render_price_content(){
        var object = this.state.storefront_item
        if(object['ipfs'] != null){
            return(
                <div>
                    {this.render_set_storefront_prices_list_part()}
                    {this.render_direct_purchase_shipping_fees()}
                    {this.render_purchase_option_fees()}
                    {this.render_my_balances()}
                    {this.props.app_state.size != 's' && (
                        <div style={{height:20}}/>
                    )}
                </div>
            )
        }
    }

    render_set_storefront_prices_list_part(){
        var middle = this.props.height-200;
        var size = this.props.size;
        if(this.state.selected_variant != null){
            var items = [].concat(this.state.selected_variant['price_data'])
            return(
                <div style={{}}>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['1103']/* 'Purchase Amounts' */, 'details':this.props.app_state.loc['1104']/* 'This is the final amount for the price of the items your buying' */, 'size':'l'})}
                    <div style={{height:10}}/>

                    <ul style={{ 'padding': '0px 0px 0px 0px', 'list-style':'none'}}>
                        {items.map((item, index) => (
                            <li style={{'padding': '5px 0px 5px 0px'}}>
                                <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[this.state.e5+item['id']], 'number':item['amount'], 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['id']]})}>
                                    {this.render_detail_item('2', { 'style':'l', 'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[this.state.e5+item['id']], 'subtitle':this.format_power_figure(this.get_amounts_to_be_paid(item['amount'])), 'barwidth':this.calculate_bar_width(this.get_amounts_to_be_paid(item['amount'])), 'number':this.format_account_balance_figure(this.get_amounts_to_be_paid(item['amount'])), 'barcolor':'', 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['id']], })}
                                </div>
                            </li>
                        ))}
                    </ul>
                    {this.render_detail_item('0')}
                </div>
            )
        }
    }

    render_direct_purchase_shipping_fees(){
        var object = this.state.storefront_item
        var items = [].concat(object['ipfs'].shipping_price_data)

        return(
            <div style={{}}>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['1114a']/* 'Purchase Amounts' */, 'details':this.props.app_state.loc['1114b']/* 'This is the final amount for the shipping fee for the items your buying.' */, 'size':'l'})}
                <div style={{height:10}}/>

                <div style={{ 'padding': '0px 0px 0px 0px', 'list-style':'none'}}>
                    {items.map((item, index) => (
                        <div style={{'padding': '5px 0px 5px 0px'}}>
                            <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[this.state.e5+item['id']], 'number':item['amount'], 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['id']]})}>
                                {this.render_detail_item('2', { 'style':'l', 'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[this.state.e5+item['id']], 'subtitle':this.format_power_figure(item['amount']), 'barwidth':this.calculate_bar_width(item['amount']), 'number':this.format_account_balance_figure(item['amount']), 'barcolor':'', 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['id']], })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    render_my_balances(){
        if(this.state.selected_variant != null){
            var items = [].concat(this.state.selected_variant['price_data'])
            var buy_amount_balances = []

            for(var i=0; i<items.length; i++){
                var token_id = items[i]['id']
                // var token_balance = this.props.app_state.created_token_object_mapping[this.state.e5][token_id]
                // token_balance = token_balance == null ? 0 : token_balance['balance']
                var token_balance = this.props.calculate_actual_balance(this.state.e5, token_id)
                buy_amount_balances.push(token_balance)
            }
            return(
                <div>
                    {this.render_detail_item('0')}
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['1105']/* 'Your balances' */, 'details':this.props.app_state.loc['1106']/* 'This is how much you have available for the direct purchase' */, 'size':'l'})}
                    <div style={{height:10}}/>

                    <ul style={{ 'padding': '0px 0px 0px 0px', 'list-style':'none'}}>
                        {items.map((item, index) => (
                            <li style={{'padding': '5px 0px 5px 0px'}}>
                                <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[this.state.e5+item['id']], 'number':buy_amount_balances[index], 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['id']]})}>
                                    {this.render_detail_item('2', { 'style':'l', 'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[this.state.e5+item['id']], 'subtitle':this.format_power_figure(buy_amount_balances[index]), 'barwidth':this.calculate_bar_width(buy_amount_balances[index]), 'number':this.format_account_balance_figure(buy_amount_balances[index]), 'barcolor':'', 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['id']], })}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
    }

    get_amounts_to_be_paid(amount){
        return bigInt(amount).multiply(bigInt(this.state.purchase_unit_count))
    }

    render_item_variants(){
        var items = [].concat(this.state.storefront_item['ipfs'].variants)
        return(
            <div style={{'margin':'0px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                    {items.map((item, index) => (
                        <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}} onClick={()=> this.when_variant_item_clicked(item)}>
                            {this.render_variant_item_if_selected(item)}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    render_variant_item_if_selected(item){
        var composition_type = this.get_composition_type()

        if(this.state.selected_variant == item){
            return(
                <div>
                    <div style={{height:'1px', 'background-color':this.props.app_state.theme['line_color'], 'margin': '0px 5px 3px 5px'}}/>
                    {this.render_item(item, composition_type)}
                </div>
            )
        }else{
            return(
                <div>
                    {this.render_item(item, composition_type)}
                </div>
            )
        }
    }

    render_item(variant_in_store, composition_type){
        const out_of_stock_items = this.props.app_state.contractor_availability_info[this.state.storefront_item['e5_id']]
        const alpha = out_of_stock_items == null || out_of_stock_items.includes(variant_in_store['variant_id']) ? 0.4 : 1.0;

        if(variant_in_store['image_data']['data'] != null && variant_in_store['image_data']['data']['images'] != null && variant_in_store['image_data']['data']['images'].length > 0){
            var image = variant_in_store['image_data']['data']['images'][0]
            return(
                <div style={{opacity: alpha}}>
                    {this.render_detail_item('8',{'title':this.format_account_balance_figure(variant_in_store['available_unit_count'])+' '+composition_type, 'details':this.truncate(variant_in_store['variant_description'], 15),'size':'s', 'image':image, 'border_radius':'4px', 'image_width':'auto'})}
                </div>
            )
        }else{
            var image = this.props.app_state.static_assets['empty_image']
            return(
                <div style={{opacity: alpha}}>
                    {this.render_detail_item('8',{'title':this.format_account_balance_figure(variant_in_store['available_unit_count'])+' '+composition_type, 'details':this.truncate(variant_in_store['variant_description'], 15),'size':'s', 'image':image, 'border_radius':'4px', 'image_width':'auto'})}
                </div>
            )
        }
    }

    truncate(source, size) {
        return source.length > size ? source.slice(0, size - 1) + "…" : source;
    }

    when_variant_item_clicked(item){
        const out_of_stock_items = this.props.app_state.contractor_availability_info[this.state.storefront_item['e5_id']]
        if(out_of_stock_items == null || out_of_stock_items.includes(item['variant_id'])){
            this.props.notify(this.props.app_state.loc['2624']/* 'The item is not available for purchasing.' */, 3000);
            return;
        }
        if(this.selected_variant == item){
            this.setState({selected_variant: null})
        }else{
            this.setState({selected_variant: item, purchase_unit_count: 1})
        }
        
    }

    render_selected_variant(){
        var item = this.state.selected_variant
        if(item != null){
            return(
                <div>
                    <div style={{height:10}}/>
                    {this.render_detail_item('4', {'text':item['variant_description'], 'textsize':'13px', 'font':this.props.app_state.font})}
                    <div style={{height:3}}/>
                    <div style={{padding:'0px 0px 0px 0px'}}>
                        {this.render_detail_item('9', item['image_data']['data'])}
                    </div>
                    <div style={{height:5}}/>
                    {this.render_detail_item('3', {'title':this.format_account_balance_figure(item['available_unit_count']), 'details':this.props.app_state.loc['1107']/* 'Number of Units' */, 'size':'l'})}
                    <div style={{height:5}}/>
                    {item['purchase_accessible_objects'] != null && this.render_purchase_accessible_objects(item['purchase_accessible_objects'])}
                    <div style={{height:5}}/>
                    {this.render_variant_price_data(item)}
                    {this.render_detail_item('0')}
                </div>
            )
        }
        else return(
            <div>
                <div style={{height:10}}/>
            </div>
        )
    }

    render_variant_price_data(variant){
        var items = [].concat(variant['price_data'])
        return(
            <div>
                {items.map((item, index) => (
                    <div style={{'padding': '0px 0px 0px 0px'}}>
                        <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[this.state.e5+item['id']], 'number':item['amount'], 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['id']]})}>
                            {this.render_detail_item('2', { 'style':'l', 'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[this.state.e5+item['id']], 'subtitle':this.format_power_figure(item['amount']), 'barwidth':this.calculate_bar_width(item['amount']), 'number':this.format_account_balance_figure(item['amount']), 'barcolor':'', 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['id']],})}
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    render_purchase_accessible_objects(purchase_accessible_data){
        var items = [].concat(purchase_accessible_data)
        if(items.length == 0) return;
        return(
            <div style={{'margin':'0px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                    {items.map((item, index) => (
                        <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}}>
                            {this.render_uploaded_file2(item, index)}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    render_uploaded_file2(item, index){
        var ecid_obj = this.get_cid_split(item)
        if(this.props.app_state.uploaded_data[ecid_obj['filetype']] == null) return
        var data = this.props.app_state.uploaded_data[ecid_obj['filetype']][ecid_obj['full']]
        const minified = false;
        
        if(data != null){
            if(data['type'] == 'image'){
                var img = data['data']
                var formatted_size = this.format_data_size(data['size'])
                var fs = formatted_size['size']+' '+formatted_size['unit']
                var details = data['type']+' • '+fs+' • '+this.get_time_difference(data['id']/1000)+this.props.app_state.loc['1593bx']/* ' ago.' */
                var title = data['name']
                var size = 'l'
                if(minified == true){
                    details = fs
                    title = start_and_end(title)
                    size = 's'
                }
                return(
                    <div>
                        {this.render_detail_item('8', {'details':details,'title':title, 'size':size, 'image':img, 'border_radius':'15%'})}
                    </div>
                )
            }
            else if(data['type'] == 'audio'){
                var formatted_size = this.format_data_size(data['size'])
                var fs = formatted_size['size']+' '+formatted_size['unit']
                var details = data['type']+' • '+fs+' • '+this.get_time_difference(data['id']/1000)+this.props.app_state.loc['1593bx']/* ' ago.' */;
                var title = data['name']
                var size = 'l'
                var thumbnail = data['thumbnail'] == '' ? this.props.app_state.static_assets['music_label'] : data['thumbnail']
                 if(minified == true){
                    details = fs
                    title = start_and_end(title)
                    size = 's'
                }
                return(
                    <div>
                        {this.render_detail_item('8', {'details':details,'title':title, 'size':size, 'image':thumbnail, 'border_radius':'15%'})}
                    </div>
                )
            }
            else if(data['type'] == 'video'){
                var video = data['data']
                var font_size = ['15px', '12px', 19];
                var formatted_size = this.format_data_size(data['size'])
                var fs = formatted_size['size']+' '+formatted_size['unit']
                var details = data['type']+' • '+fs+' • '+this.get_time_difference(data['id']/1000)+this.props.app_state.loc['1593bx']/* ' ago.' */
                var title = data['name']
                var video_height = "50"
                if(minified == true){
                    details = fs
                    title = start_and_end(title)
                    font_size = ['12px', '10px', 16];
                    video_height = "40"
                }

                if(this.props.app_state.video_thumbnails[ecid_obj['full']] != null){
                    var thumbnail = this.props.app_state.video_thumbnails[ecid_obj['full']]
                    return(
                        <div>
                            {this.render_detail_item('8', {'title':title,'details':details, 'size':size, 'image':thumbnail, 'border_radius':'15%', 'image_width':'auto'})}
                        </div>
                    )
                }else{
                    var thumbnail = this.props.app_state.static_assets['video_label']
                    return(
                        <div>
                            {this.render_detail_item('8', {'title':title,'details':details, 'size':size, 'image':thumbnail, 'border_radius':'15%', 'image_width':'auto'})}
                        </div>
                    )
                }
            }
            else if(data['type'] == 'pdf'){
                var formatted_size = this.format_data_size(data['size'])
                var fs = formatted_size['size']+' '+formatted_size['unit']
                var details = data['type']+' • '+fs+' • '+this.get_time_difference(data['id']/1000)+this.props.app_state.loc['1593bx']/* ' ago.' */;
                var title = data['name']
                var size = 'l'
                var thumbnail = data['thumbnail']
                 if(minified == true){
                    details = fs
                    title = start_and_end(title)
                    size = 's'
                }
                return(
                    <div>
                        {this.render_detail_item('8', {'details':details,'title':title, 'size':size, 'image':thumbnail, 'border_radius':'15%'})}
                    </div>
                )
            }
            else if(data['type'] == 'zip'){
                var formatted_size = this.format_data_size(data['size'])
                var fs = formatted_size['size']+' '+formatted_size['unit']
                var details = data['type']+' • '+fs+' • '+this.get_time_difference(data['id']/1000)+this.props.app_state.loc['1593bx']/* ' ago.' */;
                var title = data['name']
                var size = 'l'
                var thumbnail = this.props.app_state.static_assets['zip_file']
                if(minified == true){
                    details = fs
                    title = start_and_end(title)
                    size = 's'
                }
                return(
                    <div>
                        {this.render_detail_item('8', {'details':details,'title':title, 'size':size, 'image':thumbnail, 'border_radius':'15%'})}
                    </div>
                )
            }
            else if(data['type'] == 'lyric'){
                var formatted_size = this.format_data_size(data['size'])
                var fs = formatted_size['size']+' '+formatted_size['unit']
                var details = data['type']+' • '+fs+' • '+this.get_time_difference(data['id']/1000)+this.props.app_state.loc['1593bx']/* ' ago.' */;
                var title = data['name']
                var size = 'l'
                var thumbnail = this.props.app_state.static_assets['lyric_icon']
                if(minified == true){
                    details = fs
                    title = start_and_end(title)
                    size = 's'
                }
                return(
                    <div>
                        {this.render_detail_item('8', {'details':details,'title':title, 'size':size, 'image':thumbnail, 'border_radius':'15%'})}
                    </div>
                )
            }
            else if(data['type'] == 'subtitle'){
                var formatted_size = this.format_data_size(data['size'])
                var fs = formatted_size['size']+' '+formatted_size['unit']
                var details = data['type']+' • '+fs+' • '+this.get_time_difference(data['id']/1000)+this.props.app_state.loc['1593bx']/* ' ago.' */;
                var title = data['name']
                var size = 'l'
                var thumbnail = this.props.app_state.static_assets['subtitle_icon']
                if(minified == true){
                    details = fs
                    title = start_and_end(title)
                    size = 's'
                }
                return(
                    <div>
                        {this.render_detail_item('8', {'details':details,'title':title, 'size':size, 'image':thumbnail, 'border_radius':'15%'})}
                    </div>
                )
            }
        }
    }

    set_up_option_groups(object){
        if(object['ipfs'] != null && object['ipfs'].option_groups != null && object['ipfs'].option_groups.length > 0){
            var items = object['ipfs'].option_groups
            var purchase_option_tags_array = []
            items.forEach(item => {
                purchase_option_tags_array.push(this.get_option_group_tags(item))
            });
            this.setState({purchase_option_tags_array: purchase_option_tags_array})
        }
    }

    render_purchase_options(){
        var object = this.state.storefront_item
        if(object['ipfs'] != null && object['ipfs'].option_groups != null && object['ipfs'].option_groups.length > 0){
            var items = object['ipfs'].option_groups
            return(
                <div>
                    <div style={{height:10}}/>
                    {this.render_detail_item('4',{'font':this.props.app_state.font, 'textsize':'13px','text':this.props.app_state.loc['1058l']/* 'Some purchasing options have been specified. Please set as specified.' */})}
                    <div style={{height:10}}/>
                    {items.map((item, index) => (
                        <div style={{'padding': '0px 0px 0px 0px'}}>
                            {this.render_detail_item('3', {'title':item['title'], 'details':item['details'], 'size':'l'})}
                            <div style={{height:10}}/>
                            <Tags font={this.props.app_state.font} page_tags_object={this.state.purchase_option_tags_array[index]} tag_size={'l'} when_tags_updated={(tag_obj) => this.when_group_tags_updated(tag_obj, index)} theme={this.props.theme}/>
                        </div>
                    ))}
                </div>
            )
        }
    }

    when_group_tags_updated(tag_obj, index){
        var clone = this.state.purchase_option_tags_array.slice()
        clone[index] = tag_obj
        this.setState({purchase_option_tags_array: clone})
    }

    get_option_group_tags(item){
        var group_type = item['group_type_tags']
        var selected_type = this.get_selected_item2(group_type, 'e')
        var options = {1: 'xor'/* single-mandatory */, 2: 'or'/* single */, 3:'and'/* multiple */}
        var default_option_array = {1:[1], 2:[0], 3:[0]}

        var tag_items = ['e']
        item['options'].forEach(option => {
            var option_name = option['name']
            tag_items.push(option_name)
        });

        var obj = {
            'i':{
                active:'e', 
            },
            'e':[
                [options[selected_type],'',0], tag_items, default_option_array[selected_type]
            ],
        };

        return obj
    }

    render_purchase_option_fees(){
        var middle = this.props.height-200;
        var object = this.state.storefront_item
        if(object['ipfs'] != null && object['ipfs'].option_groups != null && object['ipfs'].option_groups.length > 0){
            var items = this.get_final_purchase_option_fees(object['ipfs'].option_groups)
            return(
                <div style={{overflow: 'auto', maxHeight: middle}}>
                    {this.render_detail_item('0')}
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['1058m']/* 'Selected Option Fees.' */, 'details':this.props.app_state.loc['1058n']/* 'Below is the extra price for the selected options youve chosen.' */, 'size':'l'})}
                    <div style={{height:10}}/>

                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.map((item, index) => (
                            <li style={{'padding': '5px 0px 5px 0px'}}>
                                <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[this.state.e5+item['id']], 'number':this.get_amounts_to_be_paid(item['amount']), 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['id']]})}>
                                    {this.render_detail_item('2', { 'style':'l', 'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[this.state.e5+item['id']], 'subtitle':this.format_power_figure(this.get_amounts_to_be_paid(item['amount'])), 'barwidth':this.calculate_bar_width(this.get_amounts_to_be_paid(item['amount'])), 'number':this.format_account_balance_figure(this.get_amounts_to_be_paid(item['amount'])), 'barcolor':'', 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['id']], })}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
    }

    get_final_purchase_option_fees(options){
        var price_obj = {}
        for(var i=0; i<this.state.purchase_option_tags_array.length; i++){
            var tag_obj = this.state.purchase_option_tags_array[i]
            var selected_items = []
            for(var j=0; j<tag_obj['e'][2].length; j++){
                var selected_item_pos = tag_obj['e'][2][j]
                if(selected_item_pos != 0){
                    selected_items.push(selected_item_pos-1)
                }
            }
            for(var k=0; k<selected_items.length; k++){
                var selected_pos = selected_items[k]
                var option_prices = options[i]['options'][selected_pos]['price']
                option_prices.forEach(price => {
                    if(price_obj[price['id']] == null){
                        price_obj[price['id']] = bigInt(0)
                    }
                    price_obj[price['id']] = bigInt(price_obj[price['id']]).plus(price['amount'])
                });
            } 
        }

        var return_array = []
        for (const exchange in price_obj) {
            if (price_obj.hasOwnProperty(exchange)) {
                return_array.push({'id':exchange, 'amount':price_obj[exchange]})
            }
        }

        if(return_array.length == 0){
            return_array.push({'id':5, 'amount':bigInt(0)})
        }

        return return_array
    }
    










    render_purchase_order_condition_details(){
        var size = this.props.app_state.size

        if(size == 's'){
            return(
                <div>
                    {this.render_application_prices_data()}
                    {this.render_set_conditions_list_part()}
                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_application_prices_data()}
                        {this.render_detail_item('0')}
                        {this.render_detail_item('0')}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_set_conditions_list_part()}
                    </div>
                </div>
                
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_application_prices_data()}
                        {this.render_detail_item('0')}
                        {this.render_detail_item('0')}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_set_conditions_list_part()}
                    </div>
                </div>
                
            )
        }
    }

    render_application_prices_data(){
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['3096d']/* 'New Condition' */, 'details':this.props.app_state.loc['3096e']/* 'Specify a descriptor for your new purchase condition. This is usually tied to real world conditions such as delivery times for instance.' */, 'size':'l'})}
                <div style={{height:10}}/>
                <TextInput font={this.props.app_state.font} height={70} placeholder={this.props.app_state.loc['1346']/* 'Enter Details...' */} when_text_input_field_changed={this.when_title_text_input_field_changed.bind(this)} text={this.state.entered_title_text} theme={this.props.theme}/> 
                {this.render_detail_item('10',{'font':this.props.app_state.font, 'textsize':'10px','text':this.props.app_state.loc['124']/* 'remaining character count: ' */+(this.props.app_state.indexed_title_size - this.state.entered_title_text.length)})}

                {this.render_detail_item('0')}

                {this.render_detail_item('3', {'title':this.props.app_state.loc['3096f']/* 'Purchase Condition Bonus.' */, 'details':this.props.app_state.loc['1353']/* 'Select an exchange by its id, then the desired price and click add' */, 'size':'l'})}

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

                <div style={{height: 10}}/>
                {this.render_selected_pay_amounts()}

                {this.render_detail_item('0')}

                {this.render_detail_item('3', {'title':this.props.app_state.loc['3096i']/* 'Add Condition.' */, 'details':this.props.app_state.loc['3096j']/* 'Add the specified condition with the amounts set as a new bonus.' */, 'size':'l'})}

                <div style={{'padding': '5px'}} onClick={() => this.when_condition_set()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['3096k']/* 'Add Condition' */, 'action':''})}
                </div>

            </div>
        )
    }

    when_title_text_input_field_changed(text){
        this.setState({entered_title_text: text})
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

    render_selected_pay_amounts(){
        var items = [].concat(this.state.price_data)
        if(items.length == 0){
            items = [1, 2, 3]
            return(
                <div>
                    <div style={{'margin':'3px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                        <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                            {items.map((item, index) => (
                                <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}}>
                                    {this.render_empty_horizontal_list_item2()}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )
        }
        return(
            <div>
                <div style={{'margin':'3px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                    <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                        {items.reverse().map((item, index) => (
                            <li style={{'display': 'inline-block', 'margin': '0px 2px 1px 2px', '-ms-overflow-style':'none'}}>
                                {this.render_price_item(item)}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        )
    }

    render_price_item(item){
        const title = this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['id']]
        const details = this.format_account_balance_figure(item['amount'])
        const image = this.props.app_state.token_thumbnail_directory[this.state.storefront_item['e5']][item['id']]
        return(
            <div onClick={() => this.remove_price_item(item)}>
                {this.render_detail_item('14', {'title':title, 'details':details, 'image':image, 'size':'s'})}
            </div>
        )
    }

    remove_price_item(item){
        var cloned_array = this.state.price_data.slice()
        const index = cloned_array.indexOf(item);
        if (index > -1) { // only splice array when item is found
            cloned_array.splice(index, 1); // 2nd parameter means remove one item only
        }
        this.setState({price_data: cloned_array})
    }

    when_condition_set(){
        const price_data = this.state.price_data
        const condition = this.state.entered_title_text.trim()

        if(price_data.length == 0){
            this.props.notify(this.props.app_state.loc['3096l']/* 'You need to specify payments for the condition.' */, 5600)
        }
        else if(condition == ''){
            this.props.notify(this.props.app_state.loc['3096g']/* 'Please specify a condition description.' */, 3600)
        }
        else if(condition.length > this.props.app_state.condition_title_size){
            this.props.notify(this.props.app_state.loc['3096h']/* 'That condition description is too long.' */, 3600)
        }
        else{
            var condition_data_clone = this.state.condition_data.slice()
            condition_data_clone.push({'price_data':price_data, 'condition':condition})
            this.setState({condition_data: condition_data_clone, price_data:[], entered_title_text:''});
            this.props.notify(this.props.app_state.loc['3096m']/* 'Condition Added.' */, 1400)
        }
    }

    render_set_conditions_list_part(){
        var middle = this.props.height-300;
        var size = this.props.size;
        if(size == 'm'){
            middle = this.props.height-100;
        }
        var items = [].concat(this.state.condition_data)

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
                    <style>{`
                    .swipeable-list-item__content {
                        background-color: transparent !important;
                    }
                `}</style>
                    <ul style={{ 'padding': '0px 0px 0px 0px', 'list-style':'none'}}>
                        {items.map((item, index) => (
                            <SwipeableList>
                                <SwipeableListItem
                                    swipeLeft={{
                                    content: <p style={{'color': this.props.theme['primary_text_color']}}>{this.props.app_state.loc['2751']/* Delete */}</p>,
                                    action: () =>this.when_amount_clicked(item)
                                    }}>
                                    <div style={{width:'100%'}}>
                                        <li style={{'padding': '5px'}}>
                                            {this.render_condition_item(item)}
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

    render_condition_item(item){
        const title = item['condition']
        const details = this.props.app_state.loc['3096n']/* $ exchanges added. */.replace('$', number_with_commas(item['price_data'].length))
        return(
            <div>
                {this.render_detail_item('3', {'title':title, 'details':details, 'size':'l'})}
            </div>
        )
    }

    when_amount_clicked(item){
        var cloned_array = this.state.condition_data.slice()
        const index = cloned_array.indexOf(item);
        if (index > -1) { // only splice array when item is found
            cloned_array.splice(index, 1); // 2nd parameter means remove one item only
        }
        this.setState({condition_data: cloned_array})
    }













    render_custom_pay_details(){
        var size = this.props.app_state.size

        if(size == 's'){
            return(
                <div>
                    {this.render_custom_pay_data()}
                    {this.render_custom_pay_list_part()}
                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_custom_pay_data()}
                        {this.render_detail_item('0')}
                        {this.render_detail_item('0')}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_custom_pay_list_part()}
                    </div>
                </div>
                
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_custom_pay_data()}
                        {this.render_detail_item('0')}
                        {this.render_detail_item('0')}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_custom_pay_list_part()}
                    </div>
                </div>
                
            )
        }
    }

    render_custom_pay_data(){
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['3096t']/* 'Set Custom Amounts' */, 'details':this.props.app_state.loc['3096u']/* 'Specify custom amounts you wish to pay for the requested variant you\'re purchasing.' */, 'size':'l'})}
                <div style={{height:10}}/>
                
                <TextInput font={this.props.app_state.font} height={30} placeholder={this.props.app_state.loc['1354']/* 'Exchange ID' */} when_text_input_field_changed={this.when_exchange_id_input_field_changed2.bind(this)} text={this.state.exchange_id2} theme={this.props.theme}/>

                {this.load_token_suggestions('exchange_id2')}
                <div style={{height: 10}}/>

                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['1355']/* 'Price' */, 'number':this.state.price_amount2, 'relativepower':this.props.app_state.loc['1356']/* 'tokens' */})}>
                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['1355']/* 'Price' */, 'subtitle':this.format_power_figure(this.state.price_amount2), 'barwidth':this.calculate_bar_width(this.state.price_amount2), 'number':this.format_account_balance_figure(this.state.price_amount2), 'barcolor':'', 'relativepower':this.props.app_state.loc['1356']/* 'tokens' */, })}
                </div>

                <NumberPicker clip_number={this.props.app_state.clip_number} ref={this.amount_picker2} font={this.props.app_state.font} number_limit={bigInt('1e'+(this.get_power_limit_for_exchange(this.state.exchange_id2)+9))} when_number_picker_value_changed={this.when_price_amount2.bind(this)} theme={this.props.theme} power_limit={this.get_power_limit_for_exchange(this.state.exchange_id2)}/>

                <div style={{'padding': '5px'}} onClick={() => this.when_add_price_set2()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['1357']/* 'Add Pay' */, 'action':''})}
                </div>
            </div>
        )
    }

    when_exchange_id_input_field_changed2(text){
        this.setState({exchange_id2: text})
        this.reset_the_number_picker2()
    }

    reset_the_number_picker2(){
        var me = this;
        setTimeout(function() {
            if(me.amount_picker2.current != null){
                me.amount_picker2.current.reset_number_picker()
            }
        }, (1 * 1000));  
    }

    when_price_amount2(amount){
        this.setState({price_amount2: amount})
    }

    when_add_price_set2(){
        var exchange_id = this.get_token_id_from_symbol(this.state.exchange_id2.trim())
        var amount = this.state.price_amount2
        if(isNaN(exchange_id) || parseInt(exchange_id) < 0 || exchange_id == '' || !this.does_exchange_exist(exchange_id)){
            this.props.notify(this.props.app_state.loc['1358']/* 'Please put a valid exchange ID.' */, 1600)
        }
        else if(amount == 0){
            this.props.notify(this.props.app_state.loc['1359']/* 'Please put a valid amount.' */, 1600)
        }
        else{
            var price_data_clone = this.state.price_data2.slice()
            price_data_clone.push({'id':exchange_id, 'amount':amount})
            this.setState({price_data2: price_data_clone});
            this.props.notify(this.props.app_state.loc['1360']/* 'Added price.' */, 1400)
        }
    }

    render_custom_pay_list_part(){
        var middle = this.props.height-300;
        var size = this.props.size;
        if(size == 'm'){
            middle = this.props.height-100;
        }
        var items = [].concat(this.state.price_data2)

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
                    <style>{`
                    .swipeable-list-item__content {
                        background-color: transparent !important;
                    }
                `}</style>
                    <ul style={{ 'padding': '0px 0px 0px 0px', 'list-style':'none'}}>
                        {items.map((item, index) => (
                            <SwipeableList>
                                <SwipeableListItem
                                    swipeLeft={{
                                    content: <p style={{'color': this.props.theme['primary_text_color']}}>{this.props.app_state.loc['2751']/* Delete */}</p>,
                                    action: () =>this.when_custom_amount_clicked(item)
                                    }}>
                                    <div style={{width:'100%', /* 'background-color':this.props.theme['send_receive_ether_background_color'] */}}>
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
    
    when_custom_amount_clicked(item){
        var cloned_array = this.state.price_data2.slice()
        const index = cloned_array.indexOf(item);
        if (index > -1) { // only splice array when item is found
            cloned_array.splice(index, 1); // 2nd parameter means remove one item only
        }
        this.setState({price_data2: cloned_array})
    }












    load_token_suggestions(target_type){
        var items = [].concat(this.get_suggested_tokens(target_type))
        var background_color = this.props.theme['card_background_color']
        var card_shadow_color = this.props.theme['card_shadow_color']
        return(
            <div style={{'margin':'0px 0px 0px 5px','padding': '5px 0px 7px 0px', width: '97%', 'background-color': 'transparent'}}>
                <ul style={{'list-style': 'none', 'padding': '0px 0px 5px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '13px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                    {items.map((item, index) => (
                        <li style={{'display': 'inline-block', 'margin': '5px 5px 5px 5px', '-ms-overflow-style': 'none'}} onClick={() => this.when_price_suggestion_clicked(item, index, target_type)}>
                            {this.render_detail_item('14', item['label'])}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    get_suggested_tokens(target_type){
        var items = [
            {'id':'3', 'label':{'title':this.props.app_state.loc['3078']/* END */, 'details':this.state.e5, 'size':'s', 'image':this.props.app_state.e5s[this.state.e5].end_image, 'img_size':30}},
            {'id':'5', 'label':{'title':this.props.app_state.loc['3079']/* SPEND */, 'details':this.state.e5.replace('E', '3'), 'size':'s', 'image':this.props.app_state.e5s[this.state.e5].spend_image, 'img_size':30}},
        ];
        var exchanges_from_sync = this.props.app_state.created_tokens[this.state.e5]
        var me = this;
        exchanges_from_sync = exchanges_from_sync.filter(function (exchange) {
            return (me.is_exchange_searched(exchange, target_type))
        })
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
                if(this.is_exchange_searched(exchanges_from_sync[i], target_type))sorted_token_exchange_data.push(exchanges_from_sync[i])
            }
        }

        for (let i = 0; i < sorted_token_exchange_data.length; i++) {
            items.push({'id':sorted_token_exchange_data[i]['id'], 'label':{'title':sorted_token_exchange_data[i]['ipfs'].entered_symbol_text, 'details':sorted_token_exchange_data[i]['ipfs'].entered_title_text, 'size':'s', 'image':(sorted_token_exchange_data[i]['ipfs'].token_image == null ? (sorted_token_exchange_data[i]['data'][0][3/* <3>token_type */] == 3 ? this.props.app_state.static_assets['end_img']:this.props.app_state.static_assets['spend_img']) : sorted_token_exchange_data[i]['ipfs'].token_image), 'img_size':30}})
        }

        return items;
    }

    is_exchange_searched(exchange, target_type){
        var filter_text = this.state.exchange_id

        if(filter_text == ''){
            return true
        }
        var token_name = exchange['ipfs'] == null ? '' : exchange['ipfs'].entered_title_text
        var entered_symbol_text = exchange['ipfs'] == null ? '' : exchange['ipfs'].entered_symbol_text
        if(token_name == null){
            token_name = ''
            entered_symbol_text = ''
        }
        if(token_name.toLowerCase().includes(filter_text.toLowerCase()) || entered_symbol_text.toLowerCase().includes(filter_text.toLowerCase())){
            return true
        }
        else if(!isNaN(filter_text) && exchange['id'].toString().startsWith(filter_text)){
            return true
        }
        return false
    }

    when_price_suggestion_clicked(item, pos, target_type){
        if(target_type == 'exchange_id'){
            this.setState({exchange_id: item['id']})
            this.reset_the_number_picker()
        }
        else if(target_type == 'exchange_id2'){
            this.setState({exchange_id2: item['id']})
            this.reset_the_number_picker2()
        }
    }











    finish_creating_response(){
        var selected_time = this.state.application_expiry_time
        const post_indexing = this.get_selected_item(this.state.get_chain_or_indexer_job_object, 'e')

        if(selected_time-Date.now()/1000 < 900){
            this.props.notify(this.props.app_state.loc['1367']/* 'You cant set an expiry time thats less than fifteen minutes from now.' */, 600)
        }
        if(this.state.selected_variant == null){
            this.props.notify(this.props.app_state.loc['1109']/* 'Pick one variant first.' */, 3500)
        }
        else if(this.state.purchase_unit_count == 0){
            this.props.notify(this.props.app_state.loc['1110']/* 'Please specify an amount of the item your adding.' */, 5200)
        }
        else if(this.state.purchase_unit_count > this.get_variant_supply()){
            this.props.notify(this.props.app_state.loc['1111']/* 'The most you can add is ' */+this.format_account_balance_figure(this.get_variant_supply())+' '+this.get_composition_type(), 5000)
        }
        else if(this.state.fulfilment_location.trim() == ''){
            this.props.notify(this.props.app_state.loc['1112']/* 'Please specify a shipping adress.' */, 4200)
        }
        else if(!this.can_afford_purchase()){
            this.props.notify(this.props.app_state.loc['1113']/* 'Your balance is insufficient to fulfil that direct purchase.' */, 5900)
        }
        else if(post_indexing == this.props.app_state.loc['1593cw']/* 'nitro 🛰️' */ && !this.props.app_state.has_wallet_been_set){
            this.props.notify(this.props.app_state.loc['a2527p']/* 'You need to set your account first.' */, 5000)
        }
        else if(post_indexing == this.props.app_state.loc['1593cw']/* 'nitro 🛰️' */ && !this.props.do_i_have_an_account(this.props.app_state.selected_e5)){
            this.props.notify(this.props.app_state.loc['284bb']/* 'You need an account to log indexer jobs.' */, 5000)
        }
        else{
            if(post_indexing == this.props.app_state.loc['1593cw']/* 'nitro 🛰️' */){
                this.props.emit_new_object_in_socket(this.state)
            }else{
                this.props.add_send_purchase_request_to_stack(this.state)
                this.reset_state()
                this.props.notify(this.props.app_state.loc['18']/* 'transaction added to stack' */, 1600)
            } 
        }
    }

    reset_state(){
        this.setState({
            selected: 0,  type:this.props.app_state.loc['3096']/* 'purchase-request' */, id:makeid(8), entered_indexing_tags:[this.props.app_state.loc['1364']/* 'send' */, this.props.app_state.loc['3096a']/* 'purchase' */, this.props.app_state.loc['1366']/* 'request' */], send_job_request_title_tags_object: this.get_send_job_request_title_tags_object(), picked_contract: null, application_expiry_time: (Date.now()/1000)+6000, exchange_id: '', price_amount:0, price_data:[],
            entered_title_text:'', entered_image_objects:[], entered_pdf_objects:[], pins:[], get_chain_or_indexer_job_object: this.get_chain_or_indexer_job_object(), purchase_unit_count:1, selected_variant:null, purchase_option_tags_array:[], fulfilment_location:'', condition_data:[]
        })
    }

    add_fulfilment_location_to_local_storage(){
        var fulfilment_locations = this.state.fulfilment_locations_data || []
        if(fulfilment_locations != null && fulfilment_locations != ""){
            fulfilment_locations = JSON.parse(fulfilment_locations)
        }else{
            fulfilment_locations = {'data':[]}
        }
        var set_fulfilment_location = this.state.fulfilment_location
        var obj = {'text':set_fulfilment_location, 'time':((new Date()).getTime()/1000)}

        if(!this.fulfilment_location_includes(fulfilment_locations['data'], obj)){
            fulfilment_locations['data'].push(obj)
        }

        this.props.set_local_storage_data_if_enabled("fulfilment", JSON.stringify(fulfilment_locations));
    }

    remove_fulfilment_location_from_local_storage(pos){
        var fulfilment_locations = this.state.fulfilment_locations_data || []
        if(fulfilment_locations != null && fulfilment_locations != ""){
            fulfilment_locations = JSON.parse(fulfilment_locations)
        }else{
            fulfilment_locations = {'data':[]}
        }
        fulfilment_locations['data'].splice(pos, 1);

        this.props.set_local_storage_data_if_enabled("fulfilment", JSON.stringify(fulfilment_locations));
    }

    fulfilment_location_includes(array, item){
        var includes = false
        array.forEach(element => {
            if(element['text'] == item['text']){
                includes = true
            }
        });

        return includes
    }

    get_composition_type(){
        var object = this.state.storefront_item
        var composition_type = object['ipfs'].composition_type == null ? this.props.app_state.loc['1114']/* 'items' */ : this.get_selected_item(object['ipfs'].composition_type, 'e')

        return composition_type
    }

    can_afford_purchase(){
        var object = this.state.storefront_item
        var items = [].concat(this.state.selected_variant['price_data'])
        var items2 = [].concat(object['ipfs'].shipping_price_data)
        var price_data = {}
        var exchanges_to_check = []
        items.forEach(item => {
            if(price_data[item['id']] == null){
                price_data[item['id']] = 0 
            }
            var amount = this.get_amounts_to_be_paid(bigInt(item['amount']))
            price_data[item['id']] = bigInt(price_data[item['id']]).add(amount)
            if(!exchanges_to_check.includes(item['id'])){
                exchanges_to_check.push(item['id'])
            }
        });

        items2.forEach(item => {
            if(price_data[item['id']] == null){
                price_data[item['id']] = 0 
            }
            price_data[item['id']] = bigInt(price_data[item['id']]).add(bigInt(item['amount']))
            if(!exchanges_to_check.includes(item['id'])){
                exchanges_to_check.push(item['id'])
            }
        });

        if(object['ipfs'] != null && object['ipfs'].option_groups != null && object['ipfs'].option_groups.length > 0){
            var items3 = this.get_final_purchase_option_fees(object['ipfs'].option_groups)
            items3.forEach(item => {
                if(price_data[item['id']] == null){
                    price_data[item['id']] = 0 
                }
                price_data[item['id']] = bigInt(price_data[item['id']]).add(bigInt(item['amount']))
                if(!exchanges_to_check.includes(item['id'])){
                    exchanges_to_check.push(item['id'])
                }
            });
        }
        

        var can_afford = true;
        for(var i=0; i<exchanges_to_check.length; i++){
            var item = exchanges_to_check[i]
            var item_price = price_data[item]
            // var token_balance = this.props.app_state.created_token_object_mapping[this.state.e5][item]
            // token_balance = token_balance == null ? 0 : token_balance['balance']
            var token_balance = this.props.calculate_actual_balance(this.state.e5, item)
            token_balance = bigInt(token_balance).minus(this.get_debit_balance_in_stack(item, this.state.e5))

            if(bigInt(token_balance).lesser(bigInt(item_price))){
                can_afford = false
            }
        }

        return can_afford
    }

    get_debit_balance_in_stack(token_id, e5){
        var txs = this.props.app_state.stack_items
        var total_amount = bigInt(0)
        for(var i=0; i<txs.length; i++){
            var t = txs[i]
            if(txs[i].e5 == e5){
                if(txs[i].type == this.props.app_state.loc['946']/* 'buy-sell' */){
                    var amount = bigInt(txs[i].amount)
                    var exchange = t.token_item['id']
                    var action = this.get_action(t)
                    if(token_id == exchange && action == 1){
                        total_amount = bigInt(total_amount).add(amount)
                    }
                }
                else if(txs[i].type == this.props.app_state.loc['1018']/* 'transfer' */){
                    if(txs[i].token_item['id'] == token_id){
                        total_amount = bigInt(total_amount).add(txs[i].debit_balance)
                    }
                }
                else if(txs[i].type == this.props.app_state.loc['1499']/* 'direct-purchase' */){
                    for(var i=0; i<t.selected_variant['price_data'].length; i++){
                        var exchange = t.selected_variant['price_data'][i]['id']
                        var amount = this.get_amounts_to_be_paid2(t.selected_variant['price_data'][i]['amount'], t.purchase_unit_count)
                        if(exchange == token_id){
                            total_amount = bigInt(total_amount).add(amount)
                        }
                    }
                    for(var i=0; i<t.storefront_item['ipfs'].shipping_price_data.length; i++){
                        var exchange = t.storefront_item['ipfs'].shipping_price_data[i]['id']
                        var amount = this.get_amounts_to_be_paid2(t.storefront_item['ipfs'].shipping_price_data[i]['amount'], t.purchase_unit_count)
                        if(exchange == token_id){
                            total_amount = bigInt(total_amount).add(amount)
                        }
                    }
                }
                else if(txs[i].type == this.props.app_state.loc['1155']/* 'award' */){
                    if(token_id == 5){
                        total_amount = bigInt(total_amount).add(t.award_amount)
                    }
                    for(var j=0; j<t.price_data.length; j++){
                        var exchange = t.price_data[j]['id']
                        var amount = t.price_data[j]['amount']
                        if(exchange == token_id){
                            total_amount = bigInt(total_amount).add(amount)
                        }
                    }
                }
                else if(
                    txs[i].type == this.props.app_state.loc['1509']/* 'mail-messages' */ || 
                    txs[i].type == this.props.app_state.loc['1511']/* 'post-messages' */ || 
                    txs[i].type == this.props.app_state.loc['1512']/* 'job-response' */ || 
                    txs[i].type == this.props.app_state.loc['1514']/* 'job-messages' */ || 
                    txs[i].type == this.props.app_state.loc['1515']/* 'proposal-messages' */ || 
                    txs[i].type == this.props.app_state.loc['1501']/* 'bag-messages' */ || 
                    txs[i].type == this.props.app_state.loc['1505']/* 'job-request-messages' */){
                    for(var j=0; j<t.messages_to_deliver.length; j++){
                        if(t.messages_to_deliver[j]['award_amount'] != 0 && t.messages_to_deliver[j]['award_receiver'] != null){
                            total_amount = bigInt(total_amount).add(t.messages_to_deliver[j]['award_amount'])
                        }
                    }
                }
                // else if(txs[i].type == this.props.app_state.loc['946']/* 'buy-sell' */){
                //     var buy_tokens = t.token_item['data'][3]
                //     var required_amounts = this.calculate_token_prices(t, t.token_item['data'][4])
                //     var action = this.get_action(t)
                //     for(var i=0; i<buy_tokens.length; i++){
                //         var buy_token_id = buy_tokens[i]
                //         if(buy_token_id == token_id && action == 1){
                //             var required_amount = required_amounts[i]
                //             total_amount = bigInt(total_amount).add(required_amount)
                //         }
                //     }
                // }
                // else if(txs[i].type == this.props.app_state.loc['1']/* 'enter-contract' */){
                //     var entry_tokens = t.contract_item['data'][2]
                //     var entry_amounts = t.contract_item['data'][3]
                //     for(var i=0; i<entry_tokens.length; i++){
                //         var entry_token_id = entry_tokens[i]
                //         if(entry_token_id == token_id){
                //             var required_amount = entry_amounts[i]
                //             total_amount = bigInt(total_amount).add(required_amount)
                //         }
                //     }
                // }
                // else if(txs[i].type == this.props.app_state.loc['312']/* 'proposal' */){
                //     for(var i = 0; i<t.bounty_values.length; i++){
                //         if(t.bounty_values[i]['exchange'] == token_id){
                //             var required_amount = t.bounty_values[i]['amount']
                //             total_amount = bigInt(total_amount).add(required_amount)
                //         }
                //     }
                // }
                // else if(txs[i].type == this.props.app_state.loc['862']/* 'pay-subscription' */){
                //     var entry_tokens = this.state.subscription_item['data'][2]
                //     var entry_fees = this.state.subscription_item['data'][3]
                //     for(var i=0; i<entry_tokens.length; i++){
                //         if(token_id == entry_tokens[i]){
                //             var required_amount = this.calculate_final_amount(entry_fees[i], t)
                //             total_amount = bigInt(total_amount).add(required_amount)
                //         }
                //     }
                // }
                // else if(txs[i].type == this.props.app_state.loc['2896']/* 'upcoming-subscriptions' */){
                //     var exchanges_used = t.data.exchanges_used
                //     var exchange_amounts = t.data.exchange_amounts
                //     for(var i=0; i<exchanges_used.length; i++){
                //         if(token_id == exchanges_used[i]){
                //             var required_amount = exchange_amounts[token_id]
                //             total_amount = bigInt(total_amount).add(required_amount)
                //         }
                //     }
                // }
            }
        }
        return total_amount
    }

    get_action(t){
        var action = this.get_selected_item(t.new_mint_dump_action_page_tags_object, 'e')
        var stack_action = 1
        if(action == this.props.app_state.loc['949']/* 'mint-buy' */) stack_action = 0
        return stack_action
    }

    get_amounts_to_be_paid2(amount, count){
        return bigInt(amount).multiply(bigInt(count))
    }












    get_selected_item2(object, option){
        return object[option][2][0]
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

    format_data_size(size){
        if(bigInt(size).greater(bigInt(1024).pow(8))){
            var mod = bigInt(size).mod(bigInt(1024).pow(8)).toString().toLocaleString('fullwide', {useGrouping:false})
            var prim = bigInt(size).divide(bigInt(1024).pow(8)).toString().toLocaleString('fullwide', {useGrouping:false})
            var value = mod+'.'+prim
            return {'size':parseFloat(value).toFixed(3), 'unit':'YBs'}
        }
        else if(bigInt(size).greater(bigInt(1024).pow(7))){
            var mod = bigInt(size).mod(bigInt(1024).pow(7)).toString().toLocaleString('fullwide', {useGrouping:false})
            var prim = bigInt(size).divide(bigInt(1024).pow(7)).toString().toLocaleString('fullwide', {useGrouping:false})
            var value = mod+'.'+prim
            return {'size':parseFloat(value).toFixed(3), 'unit':'ZBs'}
        }
        else if(bigInt(size).greater(bigInt(1024).pow(6))){
            var mod = bigInt(size).mod(bigInt(1024).pow(6)).toString().toLocaleString('fullwide', {useGrouping:false})
            var prim = bigInt(size).divide(bigInt(1024).pow(6)).toString().toLocaleString('fullwide', {useGrouping:false})
            var value = mod+'.'+prim
            return {'size':parseFloat(value).toFixed(3), 'unit':'EBs'}
        }
        else if(bigInt(size).greater(bigInt(1024).pow(5))){
            var mod = bigInt(size).mod(bigInt(1024).pow(5)).toString().toLocaleString('fullwide', {useGrouping:false})
            var prim = bigInt(size).divide(bigInt(1024).pow(5)).toString().toLocaleString('fullwide', {useGrouping:false})
            var value = mod+'.'+prim
            return {'size':parseFloat(value).toFixed(3), 'unit':'PBs'}
        }
        else if(size > (1024*1024*1024*1024)){
            return {'size':parseFloat(size/(1024*1024*1024*1024)).toFixed(3), 'unit':'TBs'}
        }
        else if(size > (1024*1024*1024)){
            return {'size':parseFloat(size/(1024*1024*1024)).toFixed(3), 'unit':'GBs'}
        }
        else if(size > (1024*1024)){
            return {'size':parseFloat(size/(1024*1024)).toFixed(3), 'unit':'MBs'}
        }
        else if(size > 1024){
            return {'size':parseFloat(size/1024).toFixed(3), 'unit':'KBs'}
        }
        else{
            return {'size':size, 'unit':'bytes'}
        }
    }

    truncate(source, size) {
        return source.length > size ? source.slice(0, size - 1) + "…" : source;
    }

    render_empty_horizontal_list_item2(){
        var background_color = this.props.theme['view_group_card_item_background']
        return(
            <div>
                <div style={{height:43, width:90, 'background-color': background_color, 'border-radius': '8px','padding':'10px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                    <div style={{'margin':'0px 0px 0px 0px'}}>
                        <img alt="" src={this.props.app_state.theme['letter']} style={{height:20 ,width:'auto'}} />
                    </div>
                </div>
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

    get_selected_item(object, option){
        var selected_item = object[option][2][0]
        var picked_item = object[option][1][selected_item];
        return picked_item
    }

    /* renders the specific element in the post or detail object */
    render_detail_item(item_id, object_data){
        var uploaded_data = {}
        if(item_id == '8' || item_id == '7' || item_id == '8'|| item_id == '9' || item_id == '11' || item_id == '12' || item_id == '14')uploaded_data = this.props.app_state.uploaded_data
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
}




export default SendPurchaseRequestPage;