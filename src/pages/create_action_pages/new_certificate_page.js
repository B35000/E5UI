// Copyright (c) 2023 - Present, Bry Onyoni
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
import ViewGroups from '../../components/view_groups';
import Tags from '../../components/tags';
import TextInput from '../../components/text_input';
import NumberPicker from '../../components/number_picker';
import DurationPicker from '../../components/duration_picker';
import Slider from '../../components/slider'
import MySwipeableViews from '../../components/my_swipeable_views';

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Draggable } from "react-drag-reorder";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDateTimePicker } from "@mui/x-date-pickers/StaticDateTimePicker";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { SwipeableList, SwipeableListItem } from '@sandstreamdev/react-swipeable-list';
import '@sandstreamdev/react-swipeable-list/dist/styles.css';
import imageCompression from 'browser-image-compression';

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

function make_number_id(length) {
    let result = '';
    const characters = '0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return parseInt(result);
}

class NewCertificatePage extends Component {
    
    state = {
        selected: 0, id: makeid(8), object_type:31, type:this.props.app_state.loc['d311a']/* 'certificate' */, e5:this.props.app_state.selected_e5,

        get_new_job_page_tags_object: this.get_new_job_page_tags_object(),
        entered_tag_text: '', entered_title_text:'', entered_text:'',
        entered_indexing_tags:[], entered_text_objects:[], entered_image_objects:[],
        entered_objects:[],

        content_channeling_setting: this.props.app_state.content_channeling, 
        device_language_setting: this.props.app_state.device_language, 
        device_country: this.props.app_state.device_country,
        device_region: this.props.app_state.device_region,
        device_city: '', selected_device_city:'',

        my_country: this.props.app_state.obligation_subscriptions[this.props.app_state.accounts[this.props.app_state.selected_e5].address] != null ? this.props.app_state.obligation_subscriptions[this.props.app_state.accounts[this.props.app_state.selected_e5].address].my_original_country : this.props.app_state.device_country,

        my_city: this.props.app_state.obligation_subscriptions[this.props.app_state.accounts[this.props.app_state.selected_e5].address] != null ? this.props.app_state.obligation_subscriptions[this.props.app_state.accounts[this.props.app_state.selected_e5].address].my_original_city : this.props.app_state.device_city,

        edit_text_item_pos:-1,

        get_content_channeling_object:this.get_content_channeling_object(), entered_pdf_objects:[], markdown:'',get_markdown_preview_or_editor_object: this.get_markdown_preview_or_editor_object(), entered_zip_objects:[], get_new_certificate_fractionalizable_tags_object:this.get_new_certificate_fractionalizable_tags_object(),

        new_token_access_rights_tags_object: this.get_new_token_access_rights_tags_object(), new_token_interactible_moderator_tags_object: this.get_new_token_interactible_moderator_tags_object(),
        exchange_authority:'',moderator_id:'', moderators:[], interactible_id:'',  interactibles:[], interactible_timestamp:0, 

        exchange_id:'', price_amount:0, price_data:[{'id':'5', 'amount':'1'}],

        class_name:'', maximum_supply:0, purchase_start_time: (Date.now()+(1000*60*60*5))/1000, purchase_end_time: (Date.now()+(1000*60*60*24))/1000, split_period:0, base_fee_price_multiplier:1, 
        certificate_models:{}, class_markdown:'', posession_rights:0,
    };


    get_new_job_page_tags_object(){
        var obj = {
            'i':{
                active:'e', 
            },
            'e':[
                ['or','',0], ['e', this.props.app_state.loc['d311j']/* 'certificate-model 🏗️' */, this.props.app_state.loc['d311d']/* 'certificate-authorities 👮' */, this.props.app_state.loc['d311f']/* 'base-fee 💵' */, 'e.'+this.props.app_state.loc['110']/* text */, this.props.app_state.loc['112']/* images */, this.props.app_state.loc['162r']/* 'pdfs' */, this.props.app_state.loc['162q']/* 'zip-files' */, this.props.app_state.loc['a311bq']/* 'markdown' */ ], [0]
            ],
            'text':[
                ['or','',0], [this.props.app_state.loc['115'], 'e.'+this.props.app_state.loc['120'], 'e.'+this.props.app_state.loc['121']], [0]
            ],
            'font':[
                ['xor','e',1], [this.props.app_state.loc['116'],'Sans-serif','Courier New','Times New Roman','ComicSans','papyrus'], [1],[1]
            ],
            'size':[
                ['xor','e',1], [this.props.app_state.loc['117'],'15px','11px','25px','40px'], [1],[1]
            ],
        };

        obj[this.props.app_state.loc['115']] = [
                ['or','',0], [this.props.app_state.loc['115'], 'e.'+this.props.app_state.loc['120'], 'e.'+this.props.app_state.loc['121']], [0]
            ]
        obj[this.props.app_state.loc['116']] = [
                ['xor','e',1], [this.props.app_state.loc['116'],'Sans-serif','Courier New','Times New Roman','ComicSans','papyrus'], [1],[1]
            ]
        obj[this.props.app_state.loc['117']] = [
                ['xor','e',1], [this.props.app_state.loc['117'],'15px','11px','25px','40px'], [1],[1]
            ]
        return obj;
    }

    get_content_channeling_object(){
        const channeling_setting = this.props.app_state.get_content_channeling_tags_object
        var obj = {
            'local-only':['e', this.props.app_state.loc['1231']/* 'local' */], 
            
            'local-language':['e', this.props.app_state.loc['1231']/* 'local' */, this.props.app_state.loc['1232']/* 'language' */ ], 
            
            'all':['e', this.props.app_state.loc['1231']/* 'local' */, this.props.app_state.loc['1232']/* 'language' */, this.props.app_state.loc['1233']/* 'international' */ ]
        }
        var setting = {}
        setting[this.props.app_state.loc['1231']/* 'local' */] = 1
        setting[this.props.app_state.loc['1232']/* 'language' */] = 2
        setting[this.props.app_state.loc['1233']/* 'international' */ ] = 3
        var pos = setting[this.props.app_state.content_channeling]
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], obj[channeling_setting], [pos]
            ],
        };
    }

    get_markdown_preview_or_editor_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e',this.props.app_state.loc['a311bt']/* 'Editor' */, this.props.app_state.loc['a311bu']/* 'preview' */], [1]
            ],
        };
    }

    get_new_token_access_rights_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e',this.props.app_state.loc['616']/* 'enabled' */, this.props.app_state.loc['617']/* 'disabled' */], [2]
            ],
        };
    }

    get_new_token_interactible_moderator_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e',this.props.app_state.loc['618']/* 'moderators' */, this.props.app_state.loc['619']/* 'interactible' */], [1]
            ],
        };
    }

    get_new_certificate_fractionalizable_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['or','',0], ['e',this.props.app_state.loc['616']/* 'enabled' */], [0]
            ],
        };
    }





    render(){
        return(
            <div style={{'padding':'10px 10px 0px 10px'}}>
                <div style={{'display': 'flex','flex-direction': 'row','margin':'0px 0px 0px 0px', width: this.props.app_state.width-(25 + (this.props.app_state.rounded_edges == this.props.app_state.loc['1593li']/* sharp */ ? 0 : 10 ))}}>
                    <div style={{'padding': '0px 0px 0px 0px', width:this.props.app_state.width-(50+ (this.props.app_state.rounded_edges == this.props.app_state.loc['1593li']/* sharp */ ? 0 : 10 ))}}>
                        <Tags font={this.props.app_state.font} app_state={this.props.app_state} page_tags_object={this.state.get_new_job_page_tags_object} tag_size={'l'} when_tags_updated={this.when_new_job_page_tags_updated.bind(this)} theme={this.props.theme}/>
                    </div>
                    <div style={{'padding': '0px 10px 0px 0px', width:40}}>
                        <img alt="" className="text-end" onClick={()=>this.finish_creating_object()} src={this.props.theme['close']} style={{height:36, width:'auto'}} />
                    </div>
                </div>
                
                <div style={{'margin':'0px 0px 0px 0px', overflow: 'auto', maxHeight: this.props.height-(120 + (this.props.app_state.rounded_edges == this.props.app_state.loc['1593li']/* sharp */ ? 0 : 20 ))}}>
                    <div style={{'width':'98%'}}>
                        {this.render_everything()}
                    </div>  
                </div> 
            </div>
        )
    }

    when_new_job_page_tags_updated(tag_group){
        this.setState({get_new_job_page_tags_object: tag_group})
    }






    render_everything(){
        var selected_item = this.get_selected_item(this.state.get_new_job_page_tags_object, this.state.get_new_job_page_tags_object['i'].active)

        if(selected_item == 'e'){
            return(
                <div>
                    {this.render_enter_tags_part()}
                </div>
            )    
        }
        else if(this.is_text_selected_item(selected_item)){
            return(
                <div>
                    {this.render_enter_text_part()}
                </div>
            ) 
        }
        else if(selected_item == this.props.app_state.loc['112']/* images */){
            return(
                <div>
                    {this.render_enter_image_part()}
                </div>
            ) 
        }
        else if(selected_item == this.props.app_state.loc['162r']/* 'pdfs' */){
            return(
                <div>
                    {this.render_enter_pdf_part()}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['a311bq']/* 'markdown' */){
            return(
                <div>
                    {this.render_enter_markdown_part()}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['162q']/* 'zip-files' */){
            return(
                <div>
                    {this.render_enter_zip_part()}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['d311d']/* 'certificate-authorities 👮' */){
            return(
                <div>
                    {this.render_token_authorities_part()}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['d311f']/* 'base-fee 💵' */){
            return this.render_set_token_prices_list()
        }
        else if(selected_item == this.props.app_state.loc['d311j']/* 'certificate-model 🏗️' */){
            return this.render_set_certificate_model_data()
        }
    }

    is_text_selected_item(selected_item){
        var obj = [this.props.app_state.loc['115'],this.props.app_state.loc['116'],this.props.app_state.loc['117'],'Sans-serif','Courier New','Times New Roman','ComicSans','papyrus', '15px','11px','25px','40px']
        if(obj.includes(selected_item)){
            return true
        }
        return false
    }




    componentDidMount(){
        this.setState({screen_width: this.screen.current.offsetWidth})
        if(this.interval != null) clearInterval(this.interval);
        var me = this;
        setTimeout(function() {
            me.interval = setInterval(() => me.update_object_in_background(), 10*1000);
        }, (1 * 100));
    }

    componentWillUnmount() {
        if(this.interval != null)clearInterval(this.interval);
    }

    constructor(props) {
        super(props);
        this.screen = React.createRef()
    }






    render_enter_tags_part(){
        var size = this.props.size

        if(size == 's'){
            return(
                <div>
                    {this.render_title_tags_part()}
                    {this.render_detail_item('0')}
                    {this.render_title_tags_part2()}
                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" >
                        {this.render_title_tags_part()}
                        {this.render_detail_item('0')}
                        {this.render_detail_item('0')}
                    </div>
                    <div className="col-6" >
                        {this.render_title_tags_part2()}
                    </div>
                </div>
                
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" >
                        {this.render_title_tags_part()}
                        {this.render_detail_item('0')}
                        {this.render_detail_item('0')}
                    </div>
                    <div className="col-5" >
                        {this.render_title_tags_part2()}
                    </div>
                </div>
                
            )
        }
    }

    render_title_tags_part(){
        return(
            <div ref={this.screen} style={{'padding':'0px 0px 0px 3px'}}>
                {this.render_detail_item('4',{'font':this.props.app_state.font, 'textsize':'14px','text':this.props.app_state.loc['d311b']/* Specify a title for your new Certificate. */})}
                <div style={{height:10}}/>
                <TextInput height={30} placeholder={this.props.app_state.loc['d311c']/* Certificate Name... */} when_text_input_field_changed={this.when_title_text_input_field_changed.bind(this)} text={this.state.entered_title_text} theme={this.props.theme}/>
                <div style={{height: 10}}/>
                {this.render_detail_item('4',{'font':this.props.app_state.font, 'textsize':'15px','text':this.state.entered_title_text})}
                {this.render_detail_item('10',{'font':this.props.app_state.font, 'textsize':'10px','text':this.props.app_state.loc['124']+(this.props.app_state.title_size - this.state.entered_title_text.length)})}

                {this.render_detail_item('0')}
                {this.render_detail_item('4',{'font':this.props.app_state.font, 'textsize':'14px','text':this.props.app_state.loc['302']})}
                <div style={{height:10}}/>

                <div className="row" style={{width:'99%'}}>
                    <div className="col-11" style={{'margin': '0px 0px 0px 0px'}}>
                        <TextInput height={30} placeholder={this.props.app_state.loc['126']} when_text_input_field_changed={this.when_index_text_input_field_changed.bind(this)} text={this.state.entered_tag_text} theme={this.props.theme}/>
                    </div>
                    <div className="col-1" style={{'padding': '0px 10px 0px 0px'}}>
                        {/* {this.render_detail_item('5', {'text':this.props.app_state.loc['127'], 'action':'add_indexing_tag', 'prevent_default':true})} */}
                        <div className="text-end" style={{'padding': '5px 0px 0px 0px'}} >
                            <img alt="" className="text-end" onClick={()=>this.add_indexing_tag_for_new_job()} src={this.props.theme['add_text']} style={{height:37, width:'auto'}} />
                        </div>
                    </div>
                </div>
                {this.render_detail_item('10',{'font':this.props.app_state.font, 'textsize':'10px','text':this.props.app_state.loc['124']+(this.props.app_state.tag_size - this.state.entered_tag_text.length)})}

                {this.render_detail_item('1',{'active_tags':this.state.entered_indexing_tags, 'indexed_option':'indexed', 'when_tapped':'delete_entered_tag_word'})}



                {this.render_detail_item('0')}
                {this.render_detail_item('3', {'title':this.props.app_state.loc['a311bl']/* 'Content Channeling' */, 'details':this.props.app_state.loc['a311bm']/* 'Specify the conetnt channel you wish to publish your new post. This setting cannot be changed.' */, 'size':'l'})}
                <div style={{height:10}}/>
                <Tags font={this.props.app_state.font} page_tags_object={this.state.get_content_channeling_object} tag_size={'l'} when_tags_updated={this.when_get_content_channeling_object_updated.bind(this)} theme={this.props.theme}/>





                {this.render_detail_item('0')}
                {this.render_detail_item('3', {'title':this.props.app_state.loc['a311bn']/* 'Channeling City (Optional)' */, 'details':this.props.app_state.loc['a311bo']/* 'If you\'ve set local channeling, you can restrict your post to a specific city.' */, 'size':'l'})}
                <div style={{height:10}}/>

                <TextInput height={30} placeholder={this.props.app_state.loc['a311bp']/* 'Enter City...' */} when_text_input_field_changed={this.when_device_city_input_field_changed.bind(this)} text={this.state.device_city} theme={this.props.theme}/>
                
                <div style={{height:5}}/>
                {this.render_detail_item('1',{'active_tags':this.get_cities_from_typed_text(), 'indexed_option':'indexed', 'when_tapped':'when_city_selected'})}
                
                <div style={{height:10}}/>
                {this.render_detail_item('4',{'font':this.props.app_state.font, 'textsize':'14px','text':this.state.selected_device_city})}

            </div>
        )
    }

    render_title_tags_part2(){
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['d311bu']/* 'Fractionalizable Certificate.' */, 'details':this.props.app_state.loc['d311bv']/* 'If set to enabled, users will be able to fractionalize certificates aquired from this exchange.' */, 'size':'l'})}
                <div style={{height:10}}/>
                <Tags font={this.props.app_state.font} page_tags_object={this.state.get_new_certificate_fractionalizable_tags_object} tag_size={'l'} when_tags_updated={this.when_get_new_certificate_fractionalizable_tags_object_updated.bind(this)} theme={this.props.theme}/>
                {this.render_detail_item('0')}


                {this.render_previous_edits_if_existing()}


                {this.render_detail_item('0')}
                {this.render_detail_item('3', {'title':this.props.app_state.loc['a311dc']/* 'Current post size.' */, 'details':this.props.app_state.loc['a311dd']/* 'Below is the size of your new post with all the details youve set.' */, 'size':'l'})}
                <div style={{height:10}}/>
                {this.render_transaction_size_indicator()}
            </div>
        )
    }

    when_get_new_certificate_fractionalizable_tags_object_updated(tag_obj){
        this.setState({get_new_certificate_fractionalizable_tags_object: tag_obj})
    }

    when_title_text_input_field_changed(text){
        this.setState({entered_title_text: text})
    }

    when_index_text_input_field_changed(text){
        this.setState({entered_tag_text: text})
    }

    when_get_content_channeling_object_updated(tag_obj){
        var selected_item = this.get_selected_item(tag_obj, tag_obj['i'].active)
        this.setState({get_content_channeling_object: tag_obj, content_channeling_setting: selected_item})
    }

    when_device_city_input_field_changed(text){
        this.setState({device_city: text.toLowerCase()})
    }

    get_cities_from_typed_text(){
        var selected_cities = []
        var typed_text = this.state.device_city
        var all_cities = this.props.app_state.all_cities
        var specific_cities = []
        var device_country = this.props.app_state.device_country_code

        if(typed_text != ''){
            specific_cities = all_cities.filter(function (el) {
                return (el['city'].startsWith(typed_text) || el['city'] == typed_text) && el['country'].startsWith(device_country)
            });
        }else{
            specific_cities = all_cities.filter(function (el) {
                return el['country'].startsWith(device_country)
            });
        }

        var l = specific_cities.length > 7 ? 7 : specific_cities.length
        for(var i=0; i<l; i++){
            selected_cities.push(specific_cities[i]['city'])
        }
        return selected_cities;
    }

    when_city_selected(tag, pos){
        if(tag != 'e'){
            if(this.state.selected_device_city == tag) this.setState({selected_device_city: ''});
            else this.setState({selected_device_city: tag, device_city:''})
        } 
    }

    add_indexing_tag_for_new_job(){
        var typed_word = this.state.entered_tag_text.trim().toLowerCase();

        if(this.add_multiple_indexing_tags_for_new_job(typed_word) == true){
            return;
        }

        if(typed_word == ''){
            this.props.notify(this.props.app_state.loc['128'], 1400)
        }
        else if(this.hasWhiteSpace(typed_word)){
            this.props.notify(this.props.app_state.loc['129'], 1400)
        }
        else if(typed_word.length > this.props.app_state.tag_size){
            this.props.notify(this.props.app_state.loc['130'], 1400)
        }
        else if(typed_word.length < 3){
            this.props.notify(this.props.app_state.loc['131'], 1400)
        }
        else if(this.state.entered_indexing_tags.includes(typed_word)){
            this.props.notify(this.props.app_state.loc['132'], 1400)
        }
        else if(this.state.entered_indexing_tags.length == this.props.app_state.max_tags_count){
            this.props.notify(this.props.app_state.loc['162l']/* The maximum number of tags you can use is 7. */, 5400)
        }
        else if(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(typed_word)){
            this.props.notify(this.props.app_state.loc['162m'], 4400)/* You cant use special characters. */
        }
        else{
            var cloned_seed_array = this.state.entered_indexing_tags.slice()
            cloned_seed_array.push(typed_word)
            this.setState({entered_indexing_tags: cloned_seed_array, entered_tag_text:''})
            // this.props.notify('tag added!', 200)
        }
    }

    add_multiple_indexing_tags_for_new_job(typed_statement){
        if(!this.hasWhiteSpace(typed_statement)){
            return false
        }
        else if(typed_statement == ''){
            this.props.notify(this.props.app_state.loc['128'], 1400)
            return true
        }
        var cloned_seed_array = this.state.entered_indexing_tags.slice()
        let added_items = 0
        const add_tag = (typed_word) => {
            if(
                typed_word != '' &&
                typed_word.length <= this.props.app_state.tag_size &&
                typed_word.length >= 3 &&
                !this.state.entered_indexing_tags.includes(typed_word) &&
                this.state.entered_indexing_tags.length < this.props.app_state.max_tags_count &&
                /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(typed_word) == false
            ){
                cloned_seed_array.push(typed_word)
                added_items++
            }
        }
        const typed_tags = typed_statement.split(' ')
        typed_tags.forEach(tag_item => {
            add_tag(tag_item)
        });
        
        if(added_items == 0){
            this.props.notify(this.props.app_state.loc['284br']/* 'nothing added.' */, 1800)
            return true;
        }
        else{
            this.setState({entered_indexing_tags: cloned_seed_array, entered_tag_text:''})
            this.props.notify(this.props.app_state.loc['284bs']/* '$ tags added.' */.replace('$', added_items), 2800)
            return true;
        }
    }

    hasWhiteSpace(s) {
        return s.indexOf(' ') >= 0;
    }

    delete_entered_tag_word(word, pos){
        var cloned_seed_array = this.state.entered_indexing_tags.slice()
        const index = cloned_seed_array.indexOf(word);
        if (index > -1) { // only splice array when item is found
            cloned_seed_array.splice(index, 1); // 2nd parameter means remove one item only
        }
        this.setState({entered_indexing_tags: cloned_seed_array})
        // this.props.notify('tag removed', 200)
    }




    render_transaction_size_indicator(){
        var current_stack_size = this.props.app_state.stack_size_in_bytes[this.state.e5] == null ? 50 : this.props.app_state.stack_size_in_bytes[this.state.e5]
        if(current_stack_size != -1){
            const size = this.lengthInUtf8Bytes(JSON.stringify(this.state))
            const stack_size_in_bytes_formatted_data_size = this.format_data_size2(size)
            
            const post_indexing = this.get_selected_item(this.state.get_chain_or_indexer_job_object, 'e')
            const upload_limit = post_indexing == this.props.app_state.loc['1593cw']/* 'nitro 🛰️' */ ? (1024*23) : this.props.app_state.upload_object_size_limit;
            
            var existing_percentage = this.round_off((current_stack_size / upload_limit) * 100)
            var additional_percentage = this.round_off((size / upload_limit) * 100)
            
            if(existing_percentage >= 100){
                existing_percentage = 99.99
                additional_percentage = 0.01
            }

            if(existing_percentage + additional_percentage >= 100){
                additional_percentage = 100 - existing_percentage;
            }

            return(
                <div>
                    <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px'}}>
                        {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['a311da']/* 'Post Size.' */, 'subtitle':this.format_power_figure(stack_size_in_bytes_formatted_data_size['size']), 'barwidth':this.calculate_bar_width(stack_size_in_bytes_formatted_data_size['size']), 'number':(stack_size_in_bytes_formatted_data_size['size']), 'barcolor':'#606060', 'relativepower':stack_size_in_bytes_formatted_data_size['unit'], })}

                        {this.render_impact_value({'title':this.props.app_state.loc['a311db']/* 'Impact on Run.' */, 'subtitle':'e0', 'barwidth':existing_percentage+'%', 'barwidth2':additional_percentage+'%', 'number':(existing_percentage + additional_percentage)+'%', 'barcolor':'#606060', 'relativepower':this.props.app_state.loc['1881']/* 'proportion' */,})}
                    </div>
                </div>
            )
        }
    }

    render_impact_value(object_data){
        var title = object_data != null ? object_data['title']:'Post Block Number'
        var subtitle = object_data != null ? object_data['subtitle']:'depth'
        var barwidth = object_data != null ? object_data['barwidth']:'84%'
        var barwidth2 = object_data != null ? object_data['barwidth2']:'5%'
        var number = object_data != null ? object_data['number']:'123,445,555'
        var barcolor = this.props.theme['bar_color']
        var relativepower = object_data != null ? object_data['relativepower']:'500 blocks'
        return(
            <div style={{'margin': '5px 20px 0px 15px'}}>
                <div className="row">
                    <div className="col-10" style={{'padding': '0px 0px 0px 14px' }}> 
                    <p style={{'color': this.props.theme['primary_text_color'], 'font-size': '11px', height: 7, 'font-family': this.props.app_state.font}} className="fw-bold">{title}</p>
                    </div>
                    <div className="col-2" style={{'padding': '0px 15px 0px 0px' }}>
                        <p style={{'color': this.props.theme['secondary_text_color'], 'font-size': '11px', height: 7, 'padding-top':' 0.5px', 'font-family': this.props.app_state.font}} className="text-end">{subtitle}</p>
                    </div>
                </div>
                
                <div style={{ height: 3, width: "100%", 'border-radius': '5px', 'box-shadow': '0px 0px 2px 1px '+this.props.theme['bar_shadow'], 'margin': '0px 0px 4px 0px' }}>
                    <div className="progress" style={{ height: 3, width: "100%", 'background-color': this.props.theme['linebar_background_color'] }}>
                        <div className="progress-bar" role="progressbar" style={{ width: barwidth, 'background-image': 'none','background-color': 'white', 'border-radius': '0px 0px 0px 0px' }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"/>

                        <div className="progress-bar" role="progressbar" style={{ width: barwidth2, 'background-image': 'none','background-color': barcolor, 'border-radius': '0px 0px 0px 0px' }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"/>
                    </div>
                </div>

                <div className="row">
                    <div className="col-9" style={{'padding': '0px 0px 0px 14px' }}> 
                        <p style={{'color': this.props.theme['primary_text_color'], 'font-size': '11px', height: '100%', 'font-family': this.props.app_state.font}} className="fw-bold">{number}</p>
                    </div>
                    <div className="col-3" style={{'padding': '0px 15px 0px 0px' }}>
                        <p style={{'color': this.props.theme['secondary_text_color'], 'font-size': '10px', height: '100%', 'padding-top':' 1px', 'font-family': this.props.app_state.font}} className="text-end">{relativepower}</p>
                    </div>
                </div>
            </div>
        )
    }

    format_data_size2(size){
        if(size > 1_000_000_000){
            return {'size':this.round_off(parseFloat(size)/(1_024*1_024*1_024)), 'unit':'GBs'}
        }
        else if(size > 1_000_000){
            return {'size':this.round_off(parseFloat(size)/(1_024*1_024)), 'unit':'MBs'}
        }
        else if(size > 1_000){
            return {'size':this.round_off(parseFloat(size)/1024), 'unit':'KBs'}
        }
        else{
            return {'size':parseFloat(size), 'unit':'bytes'}
        }
    }

    round_off(float_number){
        return (Math.round(float_number * 100) / 100)
    }

    lengthInUtf8Bytes(str) {
        // Matches only the 10.. bytes that are non-initial characters in a multi-byte sequence.
        var m = encodeURIComponent(str).match(/%[89ABab]/g);
        return str.length + (m ? m.length : 0);
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

    calculate_bar_width(num){
        if(num == null) return '0%'
        var last_two_digits = num.toString().slice(0, 1)+'0';
        if(num > 10){
            last_two_digits = num.toString().slice(0, 2);
        }
        return last_two_digits+'%'
    }





    render_previous_edits_if_existing(){
        const previous_edits = this.props.fetch_objects_from_db(this.state.object_type+0.1)
        const unfiltered_items = Object.keys(previous_edits)
        if(unfiltered_items.length == 0){
            return;
        }
        const items = this.sort_items(unfiltered_items, previous_edits)
        if(items.length == 0){
            return;
        }
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['a311ds']/* 'Set to previous changes.' */, 'details':this.props.app_state.loc['a311dt']/* 'You can continue where you left off in a pevious edit.' */, 'size':'l'})}
                <div style={{height: 10}}/>
                <div style={{'margin':'3px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                    <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                        {items.reverse().map((item, index) => (
                            <li style={{'display': 'inline-block', 'margin': '0px 2px 1px 2px', '-ms-overflow-style':'none'}}>
                                {this.render_previous_edit_item(item)}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        )
    }

    sort_items(items, previous_edits_data){
        const return_data = []
        const current_id = this.state.id
        items.forEach(identifier => {
            if(identifier != current_id){
                return_data.push(previous_edits_data[identifier])
            }
        });
        return this.sortByAttributeDescending(return_data, 'last_modified')
    }

    render_previous_edit_item(data){
        const title = this.truncate(data.entered_title_text, 23);
        const details = (new Date(data.last_modified).toLocaleString())
        return(
            <div onClick={() => this.when_previous_edit_tapped(data)}>
                {this.render_detail_item('3', {'title':title, 'details':details, 'size':'s'})}
            </div>
        )
    }

    when_previous_edit_tapped(data){
        this.setState(data)
    }

    update_object_in_background(){
        if(this.state.entered_title_text != ''){
            this.props.update_object_change_in_db(this.state, this.state.object_type+0.1)
        }
    }








    render_enter_text_part(){
        var size = this.props.size

        if(size == 's'){
            return(
                <div style={{}}>
                    {this.render_text_part()}
                    {this.render_entered_texts()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" >
                        {this.render_text_part()}
                        {this.render_entered_texts()}
                    </div>
                    <div className="col-6">
                        {this.render_empty_views(3)}
                    </div>
                </div>
                
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" >
                        {this.render_text_part()}
                        {this.render_entered_texts()}
                    </div>
                    <div className="col-5" >
                        {this.render_empty_views(3)}
                    </div>
                </div>
                
            )
        }
    }

    render_text_part(){
        var add_text_button = this.state.edit_text_item_pos == -1 ? this.props.app_state.loc['136'] : this.props.app_state.loc['137']
        return(
            <div style={{'margin':'10px 0px 0px 10px'}}>
                {/* {this.render_detail_item('4',{'font':this.props.app_state.font, 'textsize':'15px','text':this.props.app_state.loc['307']})}
                {this.render_detail_item('0')} */}
                
                {/* <Tags font={this.props.app_state.font} page_tags_object={this.state.get_new_job_text_tags_object} tag_size={'l'} when_tags_updated={this.when_new_job_font_style_updated.bind(this)} theme={this.props.theme}/>
                <div style={{height:10}}/> */}

                <TextInput font={this.props.app_state.font} height={60} placeholder={this.props.app_state.loc['135']} when_text_input_field_changed={this.when_entered_text_input_field_changed.bind(this)} text={this.state.entered_text} theme={this.props.theme}/>
                <div style={{height:10}}/>

                <div style={{'display': 'flex','flex-direction': 'row','margin':'0px 0px 0px 0px','padding': '7px 5px 10px 10px', width: '99%'}}>
                    {/* <div style={{'position': 'relative', 'width':45, 'height':45, 'padding':'0px 0px 0px 0px'}}>
                        <img src={this.props.app_state.static_assets['e5_empty_icon']} style={{height:45, width:'auto', 'z-index':'1' ,'position': 'absolute'}} />
                        <input style={{height:30, width:40, opacity:0, 'z-index':'2' ,'position': 'absolute', 'margin':'5px 0px 0px 0px'}} id="upload" type="file" accept =".gif" onChange ={this.when_banner_image_picked.bind(this)} />
                    </div> */}

                    {/* <div style={{'position': 'relative', 'width':45, 'height':45, 'padding':'0px 0px 0px 0px'}}>
                        <img src={this.props.app_state.static_assets['e5_empty_icon3']} style={{height:45, width:'auto', 'z-index':'1' ,'position': 'absolute'}} />
                        <input style={{height:30, width:40, opacity:0, 'z-index':'2' ,'position': 'absolute', 'margin':'5px 0px 0px 0px'}} id="upload" type="file" accept ="image/*" onChange ={this.when_banner_image_picked.bind(this)} />
                    </div> */}

                    <div style={{'position': 'relative', 'width':45, 'height':45, 'padding':'0px 0px 0px 0px'}}>
                        <img alt="" src={this.props.app_state.static_assets['e5_empty_icon3']} style={{height:45, width:'auto', 'z-index':'1' ,'position': 'absolute'}} onClick={() => this.props.show_pick_file_bottomsheet('image', 'create_text_banner_image', 1)}/>
                    </div>

                    <div style={{'padding': '5px', width:205}}>
                        {this.render_detail_item('5', {'text':add_text_button, 'action':'when_add_text_button_tapped', 'prevent_default':true})}
                    </div>
                </div>
                <div style={{height:10}}/>
                {this.render_detail_item('4',this.get_edited_text_object())}
                <div style={{height:10}}/>
                {this.render_kaomoji_list()}
                {this.render_detail_item('0')}
            </div>
        )
    }

    when_entered_text_input_field_changed(text){
        this.setState({entered_text: text})
    }

    when_new_job_font_style_updated(tag_group){
        this.setState({get_new_job_text_tags_object: tag_group})
    }

    get_edited_text_object(){
        var font = this.get_selected_item(this.state.get_new_job_page_tags_object, 'font')
        var size = this.get_selected_item(this.state.get_new_job_page_tags_object, 'size')
        if(this.props.app_state.kaomojis.includes(this.state.entered_text.trim())){
            font = 'Sans-serif'
            size = '40px'
        }
        return{
            'font':font, 'textsize':size, 'text':this.state.entered_text
        }
    }

    when_add_text_button_tapped(){
        var typed_word = this.state.entered_text.trim();

        if(typed_word == ''){
            this.props.notify(this.props.app_state.loc['128'], 1400)
        }else{
            var entered_text = this.get_edited_text_object()
            if(this.state.edit_text_item_pos != -1){
                this.finish_editing_text_item(entered_text)
            }else{
                var cloned_entered_text_array = this.state.entered_text_objects.slice()
                cloned_entered_text_array.push(entered_text);
                this.setState({entered_text_objects: cloned_entered_text_array, entered_text:''})

                var cloned_array = this.state.entered_objects.slice()
                cloned_array.push({'data':entered_text, 'type':'4' })
                this.setState({entered_objects: cloned_array})
            }
            
        }
    }

    render_entered_texts(){
        var middle = this.props.height-420;
        var size = this.props.size;
        if(size == 'm'){
            middle = this.props.height-100;
        }
        var items = [].concat(this.state.entered_objects)
        return ( 
            <div style={{}}>
                <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                    {items.map((item, index) => (
                        <SwipeableList>
                            <SwipeableListItem
                                swipeLeft={{
                                content: <p style={{'color': this.props.theme['primary_text_color']}}>{this.props.app_state.loc['2908']/* Delete. */}</p>,
                                action: () => this.delete_text_item(item)
                                }}>
                                <div style={{width:'100%', /* 'background-color':this.props.theme['send_receive_ether_background_color'] */}}><li style={{'padding': '5px'}} onClick={()=>this.edit_text_item(item)}>
                                    {this.render_text_or_banner_if_any(item, index)}
                                </li></div>
                            </SwipeableListItem>
                        </SwipeableList>
                        
                    ))}
                </ul>
            </div>
        );
    }

    render_text_or_banner_if_any(item, index){
        if(item['type'] == '11'){
            return(
                <div>
                    <div style={{'display': 'flex','flex-direction': 'row','margin':'0px 0px 0px 0px','padding': '7px 5px 10px 10px', width: '99%'}}>
                        <div>
                            {/* <div style={{'position': 'relative', 'width':45, 'height':45, 'padding':'0px 0px 0px 0px'}}>
                                <img src={this.props.app_state.static_assets['e5_empty_icon']} style={{height:45, width:'auto', 'z-index':'1' ,'position': 'absolute'}} />
                                <input style={{height:30, width:40, opacity:0, 'z-index':'2' ,'position': 'absolute', 'margin':'5px 0px 0px 0px'}} id="upload" type="file" accept =".gif" onChange ={(e) => this.when_banner_image_updated(e, index)} />
                            </div> */}

                            {/* <div style={{'position': 'relative', 'width':45, 'height':45, 'padding':'0px 0px 0px 0px'}}>
                                <img src={this.props.app_state.static_assets['e5_empty_icon3']} style={{height:45, width:'auto', 'z-index':'1' ,'position': 'absolute'}} />
                                <input style={{height:30, width:40, opacity:0, 'z-index':'2' ,'position': 'absolute', 'margin':'5px 0px 0px 0px'}} id="upload" type="file" accept ="image/*" onChange ={(e) => this.when_banner_image_updated(e, index)} />
                            </div> */}
                        </div>
                        <div style={{width:2}}/>
                        {this.render_detail_item('11',item['data'])}
                    </div>
                </div>
            )
        }
        else if(item['type'] == '4'){
            var object = structuredClone(item['data'])
            if(this.state.edit_text_item_pos == index) object['text'] = ''
            return(
                <div>
                    {this.render_detail_item('4', object)}
                </div>
            )
        }
    }

    delete_text_item(item){
        var cloned_array = this.state.entered_text_objects.slice()
        const index = cloned_array.indexOf(item);
        if (index > -1) { // only splice array when item is found
            cloned_array.splice(index, 1); // 2nd parameter means remove one item only
        }
        this.setState({entered_text_objects: cloned_array})

        var entered_objects_pos = -1;
        for(var i=0; i<this.state.entered_objects.length; i++){
            if(this.state.entered_objects[i]['data'] == item['data']){
                entered_objects_pos = i;
            }
        }

        var cloned_array = this.state.entered_objects.slice()
        if (entered_objects_pos > -1) { // only splice array when item is found
            cloned_array.splice(entered_objects_pos, 1); // 2nd parameter means remove one item only
        }
        this.setState({entered_objects: cloned_array})

        // this.props.notify('item removed!', 600)
    }

    when_banner_selected = async (files) => {
        this.add_banner_to_object(files[0])
        var cloned_ecid_encryption_passwords = this.state.ecid_encryption_passwords == null ? {} : structuredClone(this.state.ecid_encryption_passwords)
        for(var f=0; f<files.length; f++){
            const file = files[f]
            cloned_ecid_encryption_passwords[file] = await this.props.get_ecid_file_password_if_any(file)
        }
        this.setState({ecid_encryption_passwords: cloned_ecid_encryption_passwords});
    }

    when_banner_image_updated = (e, index) => {
        if(e.target.files && e.target.files[0]){
            for(var i = 0; i < e.target.files.length; i++){ 
                let reader = new FileReader();
                reader.onload = function(ev){
                    if(ev.total < this.props.app_state.image_size_limit){
                        this.update_banner_in_object(ev.target.result, index)
                        // this.setState({selected_banner_image: ev.target.result});
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
            // this.props.notify('Your selected '+e.target.files.length+image+' been staged.',500);
        }
    }

    add_banner_to_object(image){
        var entered_text = this.get_edited_text_object()
        entered_text['textsize'] = '10px'
        var obj = {'image':this.get_image_from_file(image), 'caption':entered_text}
        var cloned_array = this.state.entered_objects.slice()
        cloned_array.push({'data':obj, 'type':'11' }) 
        this.setState({entered_objects: cloned_array, entered_text:''})
    }

    update_banner_in_object(image, index){
        var entered_text = this.get_edited_text_object()
        entered_text['textsize'] = '10px'
        var obj = {'image':image, 'caption':entered_text}
        var cloned_array = this.state.entered_objects.slice()
        var pos = index
        cloned_array[pos] = {'data':obj, 'type':'11' }
        this.setState({entered_objects: cloned_array, entered_text:''})
    }

    edit_text_item(item){
        var entered_objects_pos = -1;
        for(var i=0; i<this.state.entered_objects.length; i++){
            if(this.state.entered_objects[i]['data'] == item['data']){
                entered_objects_pos = i;
            }
        }
        if(item['type'] == '11'){
            return;
        }else{
            var text = item['data']['text']
            this.setState({edit_text_item_pos: entered_objects_pos, entered_text:text})
        }
        // this.props.notify('editing item', 600)
    }

    finish_editing_text_item(item){
        var cloned_array = this.state.entered_objects.slice()
        var pos = this.state.edit_text_item_pos
        cloned_array[pos] = {'data':item, 'type':'4' }
        console.log(cloned_array)
        this.setState({entered_objects: cloned_array, entered_text:'', edit_text_item_pos: -1})
    }

    render_kaomoji_list(){
        var items = this.props.app_state.kaomojis

        return(
            <div style={{'margin':'0px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                    {items.map((item, index) => (
                        <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}} onClick={() => this.when_kamoji_clicked(item)}>
                            {this.render_detail_item('4',this.get_kamoji_text_object(item))}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    get_kamoji_text_object(text){
        return{
            'font':'Sans-serif', 'textsize':'15px','text':text
        }
    }

    when_kamoji_clicked(text){
        this.setState({entered_text: this.state.entered_text+' '+text})
    }










    render_enter_image_part(){
        var size = this.props.size
        if(size == 's'){
            return(
                <div>
                    {this.render_pick_images_parts()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" >
                        {this.render_pick_images_parts()}
                    </div>
                    <div className="col-6" >
                        {this.render_empty_views(3)}
                    </div>
                </div>
                
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" >
                        {this.render_pick_images_parts()}
                    </div>
                    <div className="col-5" >
                        {this.render_empty_views(3)}
                    </div>
                </div>
                
            )
        }
    }

    render_pick_images_parts(){
        return(
            <div>
                {this.render_detail_item('4',{'font':this.props.app_state.font, 'textsize':'13px','text':this.props.app_state.loc['145']})}
                {this.render_detail_item('10',{'font':this.props.app_state.font, 'textsize':'10px','text':this.props.app_state.loc['146']})}
                {this.render_create_image_ui_buttons_part()}
                {this.render_image_part()}
            </div>
        )
    }

    /* renders the buttons for pick images, set images and clear images */
    render_create_image_ui_buttons_part(){
      return(
        <div style={{'display': 'flex','flex-direction': 'row','margin':'0px 0px 0px 0px','padding': '7px 5px 10px 10px', width: '99%'}}>
            {/* <div style={{'position': 'relative', 'width':45, 'height':45, 'padding':'0px 0px 0px 0px'}}>
                <img src={this.props.app_state.static_assets['e5_empty_icon']} style={{height:45, width:'auto', 'z-index':'1' ,'position': 'absolute'}} />
                <input style={{height:30, width:40, opacity:0, 'z-index':'2' ,'position': 'absolute', 'margin':'5px 0px 0px 0px'}} id="upload" type="file" accept =".gif" onChange ={this.when_image_gif_picked.bind(this)} multiple/>
            </div> */}

            {/* <div style={{'position': 'relative', 'width':45, 'height':45, 'padding':'0px 0px 0px 0px'}}>
                <img src={this.props.app_state.static_assets['e5_empty_icon3']} style={{height:45, width:'auto', 'z-index':'1' ,'position': 'absolute'}} />
                <input style={{height:30, width:40, opacity:0, 'z-index':'2' ,'position': 'absolute', 'margin':'5px 0px 0px 0px'}} id="upload" type="file" accept ="image/*" onChange ={this.when_image_gif_picked.bind(this)} multiple/>
            </div> */}

            <div style={{'position': 'relative', 'width':45, 'height':45, 'padding':'0px 0px 0px 0px'}}>
                <img alt="" src={this.props.app_state.static_assets['e5_empty_icon3']} style={{height:45, width:'auto', 'z-index':'1' ,'position': 'absolute'}} onClick={() => this.props.show_pick_file_bottomsheet('image', 'create_image', 10**16)}/>
            </div>

            {/* <div style={{'padding': '5px', width:205}} onClick={()=>this.add_images_to_object()}>
                {this.render_detail_item('5', {'text':'Add Images', 'action':'-'})}
            </div> */}

        </div>
      )
    }

    add_images_to_object(){
        var images_to_add = this.state.entered_image_objects
        var id = Math.round(new Date().getTime()/1000);
        if(images_to_add.length == 0){
            this.props.notify('add some images or gifs first!', 800)
        }else{
            var cloned_array = this.state.entered_objects.slice()
            cloned_array.push({'data':{'images':images_to_add}, 'type':'9', 'id':id})
            this.setState({entered_objects: cloned_array, entered_image_objects:[]})
            this.props.notify('images added!', 800)
        }
    }

    when_image_gif_files_picked = async (files) => {
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

    render_all_images_part(){
        var items = [].concat(this.get_image_objects())

        return(
            <div>
                {items.map((item, index) => (
                    <div onClick={()=>this.remove_image_group(item)}>
                        {this.render_detail_item('9', item['data'])} 
                    </div>
                ))}
            </div>
        )
    }

    get_image_objects(){
        var all_objs = this.state.entered_objects
        var image_objs = []
        for(var i = 0; i < all_objs.length; i++){
            var obj_in_focus = all_objs[i]
            if(obj_in_focus['type'] == '9'){
                image_objs.push(obj_in_focus)
            }
        }
        return image_objs
    }

    remove_image_group(item){
        var cloned_array = this.state.entered_objects.slice()
        const index = cloned_array.indexOf(item);
        if (index > -1) { // only splice array when item is found
            cloned_array.splice(index, 1); // 2nd parameter means remove one item only
        }
        this.setState({entered_objects: cloned_array})
        this.props.notify('items removed!',600)
    }

    render_image_part(){
        var background_color = this.props.theme['card_background_color']
        var col = Math.round((this.state.screen_width-25) / 100)
        var rowHeight = 100;

        if(this.state.entered_image_objects.length == 0){
            var items = ['1','1','1']
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
            var items = [].concat(this.state.entered_image_objects);
            return(
                <div>
                    <ImageList sx={{ width: 'auto', height: 'auto' }} cols={col} rowHeight={rowHeight}>
                        {items.map((item, index) => (
                            <ImageListItem key={item}>
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







    render_enter_pdf_part(){
        var size = this.props.size
        if(size == 's'){
            return(
                <div>
                    {this.render_pick_pdf_parts()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" >
                        {this.render_pick_pdf_parts()}
                    </div>
                    <div className="col-6" >
                        {this.render_empty_views(3)}
                    </div>
                </div>
                
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" >
                        {this.render_pick_pdf_parts()}
                    </div>
                    <div className="col-5" >
                        {this.render_empty_views(3)}
                    </div>
                </div>
                
            )
        }
    }

    render_pick_pdf_parts(){
        return(
            <div>
                {this.render_detail_item('4',{'font':this.props.app_state.font, 'textsize':'13px','text':this.props.app_state.loc['162o']/* 'The gray circle stages a pdf file. Then swipe it to remove.' */})}
                {this.render_create_pdf_ui_buttons_part()}
                {this.render_pdfs_part()}
            </div>
        )
    }

    render_create_pdf_ui_buttons_part(){
        return(
        <div style={{'display': 'flex','flex-direction': 'row','margin':'0px 0px 0px 0px','padding': '7px 5px 10px 10px', width: '99%'}}>
            <div style={{'position': 'relative', 'width':45, 'height':45, 'padding':'0px 0px 0px 0px'}}>
                <img alt="" src={this.props.app_state.static_assets['e5_empty_icon3']} style={{height:45, width:'auto', 'z-index':'1' ,'position': 'absolute'}} onClick={() => this.props.show_pick_file_bottomsheet('pdf', 'create_pdf', 10**16)}/>
            </div>
        </div>
        )
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

        if(items.length == 0){
            return(
                <div style={{}}>
                    {this.render_empty_views(3)}
                </div>
            )
        }else{
            return(
                <div style={{}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px', 'listStyle':'none'}}>
                        {items.map((item, index) => (
                            <SwipeableList>
                                <SwipeableListItem
                                    swipeLeft={{
                                    content: <p style={{'color': this.props.theme['primary_text_color']}}>{this.props.app_state.loc['2751']/* Delete */}</p>,
                                    action: () =>this.when_pdf_clicked(item, index)
                                    }}>
                                    <div style={{width:'100%', /* 'background-color':this.props.theme['send_receive_ether_background_color'] */}}>
                                        <div style={{'margin':'3px 0px 3px 0px'}}>
                                            {this.render_uploaded_file(item, index)}
                                        </div>
                                    </div>
                                </SwipeableListItem>
                            </SwipeableList>
                        ))}
                    </ul>
                </div>
            )
        }
    }

    render_uploaded_file(item, index){
        var ecid_obj = this.get_cid_split(item)
        if(this.props.app_state.uploaded_data[ecid_obj['filetype']] == null) return
        var data = this.props.app_state.uploaded_data[ecid_obj['filetype']][ecid_obj['full']]
        //
        var formatted_size = this.format_data_size(data['size'])
        var fs = formatted_size['size']+' '+formatted_size['unit']
        var title = data['type']+' • '+fs+' • '+this.get_time_difference(data['id']/1000)+this.props.app_state.loc['1593bx']/* ' ago.' */;
        var details = data['name']
        var thumbnail = data['thumbnail']

        return(
            <div>
                {this.render_detail_item('8', {'details':title,'title':details, 'size':'l', 'image':thumbnail, 'border_radius':'15%'})}
            </div>
        )
    }

    when_pdf_clicked(item, index){
        var cloned_array = this.state.entered_pdf_objects.slice()
        if (index > -1) { // only splice array when item is found
            cloned_array.splice(index, 1); // 2nd parameter means remove one item only
        }
        this.setState({entered_pdf_objects: cloned_array})
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








    render_enter_zip_part(){
        var size = this.props.size
        if(size == 's'){
            return(
                <div>
                    {this.render_pick_zip_parts()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" >
                        {this.render_pick_zip_parts()}
                    </div>
                    <div className="col-6" >
                        {this.render_empty_views(3)}
                    </div>
                </div>
                
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" >
                        {this.render_pick_zip_parts()}
                    </div>
                    <div className="col-5" >
                        {this.render_empty_views(3)}
                    </div>
                </div>
                
            )
        }
    }
    
    render_pick_zip_parts(){
        return(
            <div>
                {this.render_detail_item('4',{'font':this.props.app_state.font, 'textsize':'13px','text':this.props.app_state.loc['162p']/* 'The gray circle stages a pdf file. Then swipe it to remove.' */})}
                {this.render_create_zip_ui_buttons_part()}
                {this.render_zips_part()}
            </div>
        )
    }
    
    render_create_zip_ui_buttons_part(){
        return(
        <div style={{'display': 'flex','flex-direction': 'row','margin':'0px 0px 0px 0px','padding': '7px 5px 10px 10px', width: '99%'}}>
            <div style={{'position': 'relative', 'width':45, 'height':45, 'padding':'0px 0px 0px 0px'}}>
                <img alt="" src={this.props.app_state.static_assets['e5_empty_icon3']} style={{height:45, width:'auto', 'z-index':'1' ,'position': 'absolute'}} onClick={() => this.props.show_pick_file_bottomsheet('zip', 'create_zip', 10**16)}/>
            </div>
        </div>
        )
    }
    
    when_zip_files_picked = async (files) => {
        var clonedArray = this.state.entered_zip_objects == null ? [] : this.state.entered_zip_objects.slice();
        files.forEach(file => {
            clonedArray.push(file);
        });
        var cloned_ecid_encryption_passwords = this.state.ecid_encryption_passwords == null ? {} : structuredClone(this.state.ecid_encryption_passwords)
        for(var f=0; f<files.length; f++){
            const file = files[f]
            cloned_ecid_encryption_passwords[file] = await this.props.get_ecid_file_password_if_any(file)
        }
        this.setState({entered_zip_objects: clonedArray, ecid_encryption_passwords: cloned_ecid_encryption_passwords});
    }
    
    render_zips_part(){
        var items = [].concat(this.state.entered_zip_objects)
    
        if(items.length == 0){
            return(
                <div style={{}}>
                    {this.render_empty_views(3)}
                </div>
            )
        }else{
            return(
                <div style={{}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px', 'listStyle':'none'}}>
                        {items.map((item, index) => (
                            <SwipeableList>
                                <SwipeableListItem
                                    swipeLeft={{
                                    content: <p style={{'color': this.props.theme['primary_text_color']}}>{this.props.app_state.loc['2751']/* Delete */}</p>,
                                    action: () =>this.when_zip_clicked(item, index)
                                    }}>
                                    <div style={{width:'100%', /* 'background-color':this.props.theme['send_receive_ether_background_color'] */}}>
                                        <div style={{'margin':'3px 0px 3px 0px'}}>
                                            {this.render_uploaded_zip_file(item, index)}
                                        </div>
                                    </div>
                                </SwipeableListItem>
                            </SwipeableList>
                        ))}
                    </ul>
                </div>
            )
        }
    }
    
    render_uploaded_zip_file(item, index){
        var ecid_obj = this.get_cid_split(item)
        if(this.props.app_state.uploaded_data[ecid_obj['filetype']] == null) return
        var data = this.props.app_state.uploaded_data[ecid_obj['filetype']][ecid_obj['full']]
        //
        var formatted_size = this.format_data_size(data['size'])
        var fs = formatted_size['size']+' '+formatted_size['unit']
        var title = data['type']+' • '+fs+' • '+this.get_time_difference(data['id']/1000)+this.props.app_state.loc['1593bx']/* ' ago.' */;
        var details = data['name']
        var thumbnail = this.props.app_state.static_assets['zip_file']
    
        return(
            <div>
                {this.render_detail_item('8', {'details':title,'title':details, 'size':'l', 'image':thumbnail, 'border_radius':'15%'})}
            </div>
        )
    }
    
    when_zip_clicked(item, index){
        var cloned_array = this.state.entered_zip_objects.slice()
        if (index > -1) { // only splice array when item is found
            cloned_array.splice(index, 1); // 2nd parameter means remove one item only
        }
        this.setState({entered_zip_objects: cloned_array})
    }










    render_enter_markdown_part(){
        var size = this.props.size
        if(size == 's' || size == 'm'){
            return(
                <div>
                    {this.render_edit_markdown_parts()}
                </div>
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-6" >
                        {this.render_detail_item('4', {'text':this.props.app_state.loc['a311bv']/* 'You can add some Markdown text below. */, 'textsize':'13px', 'font':this.props.app_state.font})}
                        <div style={{height:10}}/>

                        <div style={{'margin':'0px 0px 0px 10px'}}>
                            <TextInput height={this.props.height-350} placeholder={this.props.app_state.loc['a311bs']/* 'New Markdown here...' */} when_text_input_field_changed={this.when_markdown_field_changed.bind(this)} text={this.state.markdown} theme={this.props.theme}/>
                        </div>

                        {this.render_markdown_shortcut_list()}
                    </div>
                    <div className="col-6" >
                        {this.render_markdown_or_empty()}
                    </div>
                </div>
                
            )
        }
    }

    render_markdown_or_empty(){
        if(this.state.markdown.trim() == ''){
            return(
                <div>
                    {this.render_empty_views(2)}
                </div>
            )
        }else{
            return(
                <div>
                    {this.render_detail_item('13', {'source':this.state.markdown})}
                </div>
            )
        }
    }

    render_edit_markdown_parts(){
        return(
            <div>
                {this.render_detail_item('4', {'text':this.props.app_state.loc['a311bv']/* 'You can add some Markdown text below. */, 'textsize':'13px', 'font':this.props.app_state.font})}
                <div style={{height:10}}/>

                <Tags font={this.props.app_state.font} page_tags_object={this.state.get_markdown_preview_or_editor_object} tag_size={'l'} when_tags_updated={this.when_get_markdown_preview_or_editor_object_updated.bind(this)} theme={this.props.theme}/>

                {this.render_preview_or_editor_option_ui()}
            </div>
        )
    }

    when_get_markdown_preview_or_editor_object_updated(tags_obj){
        this.setState({get_markdown_preview_or_editor_object: tags_obj})
    }

    render_preview_or_editor_option_ui(){
        var selected_item = this.get_selected_item(this.state.get_markdown_preview_or_editor_object, this.state.get_markdown_preview_or_editor_object['i'].active)

        if(selected_item == this.props.app_state.loc['a311bt']/* 'Editor' */){
            return(
                <div>
                    <div style={{'margin':'0px 0px 0px 10px'}}>
                        <TextInput height={this.props.height-350} placeholder={this.props.app_state.loc['a311bs']/* 'New Markdown here...' */} when_text_input_field_changed={this.when_markdown_field_changed.bind(this)} text={this.state.markdown} theme={this.props.theme}/>
                    </div>

                    {this.render_markdown_shortcut_list()}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['a311bu']/* 'preview' */){
            return(
                <div>
                    {this.render_markdown_or_empty()}
                </div>
            )
        }
    }

    when_markdown_field_changed(text){
        this.setState({markdown: text})
    }

    render_markdown_shortcut_list(){
        var items = this.props.app_state.markdown_shortcut_list

        return(
            <div>
                {this.render_detail_item('0')}
                <div style={{'margin':'0px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                    <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                        {items.map((item, index) => (
                            <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}} onClick={() => this.when_markdown_shortcut_clicked(item['details'])}>
                                {this.render_detail_item('3', item)}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        )
    }

    when_markdown_shortcut_clicked(text){
        if(text == this.props.app_state.loc['a311ei']/* '![eImage alt text](image.jpg)' */){
            this.props.show_pick_file_bottomsheet('image', 'create_markdown_image', 1000000000000)
        }else{
            this.setState({markdown: this.state.markdown+'\n'+text})
        }
    }

    when_markdown_image_selected = async (files) => {
        var cloned_ecid_encryption_passwords = this.state.ecid_encryption_passwords == null ? {} : structuredClone(this.state.ecid_encryption_passwords)
        var current_markdown = this.state.markdown.slice()
        for(var f=0; f<files.length; f++){
            const file = files[f]
            cloned_ecid_encryption_passwords[file] = await this.props.get_ecid_file_password_if_any(file)
            current_markdown += `\n![${this.props.app_state.loc['a311ej']/* eImage alt text */}](${file})`
        }
        this.setState({ecid_encryption_passwords: cloned_ecid_encryption_passwords, markdown: current_markdown});
    }











    render_token_authorities_part(){
        var size = this.props.size

        if(size == 's'){
            return(
                <div style={{}}>
                    {this.render_exchange_authority_trust_fee_target()}
                    {this.render_moderator_interactible_ui()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" >
                        {this.render_exchange_authority_trust_fee_target()}
                    </div>
                    <div className="col-6" >
                        {this.render_moderator_interactible_ui()}
                    </div>
                </div>
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" >
                        {this.render_exchange_authority_trust_fee_target()}
                    </div>
                    <div className="col-5" >
                        {this.render_moderator_interactible_ui()}
                    </div>
                </div>
                
            )
        }
    }

    render_exchange_authority_trust_fee_target(){
        return(
            <div style={{}}>

                {this.render_detail_item('3', {'title':this.props.app_state.loc['715']/* 'Access Rights' */, 'details':this.props.app_state.loc['d311e']/* 'If enabled, access to the certificate\'s exchange will be restricted to moderators and specified accounts' */, 'size':'l'})}

                <div style={{height:20}}/>
                <Tags font={this.props.app_state.font} page_tags_object={this.state.new_token_access_rights_tags_object} tag_size={'l'} when_tags_updated={this.when_new_token_access_rights_tags_object.bind(this)} theme={this.props.theme}/>

                {this.render_detail_item('0')}

                {this.render_detail_item('3', {'title':this.props.app_state.loc['717']/* 'Exchange Authority ID' */, 'details':this.props.app_state.loc['718']/* 'The account set to control the exchange' */, 'size':'l'})}

                <div style={{height:10}}/>
                <TextInput font={this.props.app_state.font} height={30} placeholder={this.props.app_state.loc['719']/* 'Set Exchange Authority ID' */} when_text_input_field_changed={this.when_exchange_authority_input_field_changed.bind(this)} text={this.state.exchange_authority} theme={this.props.theme}/>
                
                {this.load_account_suggestions('exchange_authority')}
                {this.render_detail_item('0')}
                
            </div>
        )
    }

    when_exchange_authority_input_field_changed(text){
        this.setState({exchange_authority: text})
    }

    when_trust_fee_target_input_field_changed(text){
        this.setState({trust_fee_target: text})
    }

    when_new_token_access_rights_tags_object(tag_obj){
        this.setState({new_token_access_rights_tags_object: tag_obj})
    }

    render_moderator_interactible_ui(){
        return(
            <div>
                <Tags font={this.props.app_state.font} page_tags_object={this.state.new_token_interactible_moderator_tags_object} tag_size={'l'} when_tags_updated={this.when_new_token_interactible_moderator_tags_object.bind(this)} theme={this.props.theme}/>

                {this.render_moderator_or_interactible_setting()}
            </div>
        )
    }

    when_new_token_interactible_moderator_tags_object(tag_obj){
        this.setState({new_token_interactible_moderator_tags_object: tag_obj})
    }

    render_moderator_or_interactible_setting(){
        var selected_item = this.get_selected_item(this.state.new_token_interactible_moderator_tags_object, this.state.new_token_interactible_moderator_tags_object['i'].active)

        if(selected_item == this.props.app_state.loc['618']/* 'moderators' */ || selected_item == 'e'){
            return(
                <div>
                    {this.render_moderator_settings()}
                </div>
            )    
        }
        else if(selected_item == this.props.app_state.loc['619']/* 'interactible' */){
            return(
                <div>
                    {this.render_interactible_settings()}
                </div>
            ) 
        }
    }

    render_moderator_settings(){
        return(
            <div>
                <div style={{height:20}}/>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['726']/* 'Moderator ID' */, 'details':this.props.app_state.loc['727']/* 'Set the account id for your targeted moderator' */, 'size':'l'})}

                <div style={{height:10}}/>
                <TextInput font={this.props.app_state.font} height={30} placeholder={this.props.app_state.loc['727']/* 'Moderator ID' */} when_text_input_field_changed={this.when_moderator_id_input_field_changed.bind(this)} text={this.state.moderator_id} theme={this.props.theme}/>

                {this.load_account_suggestions('moderator_id')}
                <div style={{'padding': '5px'}} onClick={() => this.when_add_moderator_button_tapped()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['728']/* 'Add Moderator' */, 'action':''})}
                </div>

                {this.render_added_moderators()}
            </div>
        )
    }

    when_moderator_id_input_field_changed(text){
        this.setState({moderator_id: text})
    }

    async when_add_moderator_button_tapped(){
        var moderator_id = await this.get_typed_alias_id(this.state.moderator_id.toString().trim())
        var moderators_clone = this.state.moderators.slice()
        if(isNaN(moderator_id) || parseInt(moderator_id) < 0 || moderator_id == ''){
            this.props.notify(this.props.app_state.loc['729']/* 'please put a valid account id' */, 600)
        }
        else if(moderators_clone.includes(parseInt(moderator_id))){
            this.props.notify(this.props.app_state.loc['162n'], 4600)
        }
        else{   
            moderators_clone.push(parseInt(moderator_id))
            this.setState({moderators: moderators_clone});
            this.props.notify(this.props.app_state.loc['730']/* 'added moderator!' */, 400)
        }
    }

    async get_typed_alias_id(alias){
        if(!isNaN(alias)){
            return alias
        }
        await this.props.get_account_id_from_alias(alias)
        var id = (this.props.app_state.alias_owners[this.props.app_state.selected_e5][alias] == null ? 
            alias : this.props.app_state.alias_owners[this.props.app_state.selected_e5][alias])

        return id
    }

    render_added_moderators(){
        var middle = this.props.height-500;
        var size = this.props.size;
        if(size == 'm'){
            middle = this.props.height-100;
        }
        var items = [].concat(this.state.moderators)

        if(items.length == 0){
            items = [0,3,0]
            return(
                <div style={{}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px', 'list-style':'none'}}>
                        {items.map((item, index) => (
                            <li style={{ 'padding': '2px 5px 2px 5px' }} onClick={() => console.log()}>
                                <div style={{ height: 60, width: '100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px', 'padding': '10px 0px 10px 10px', 'display': 'flex', 'align-items': 'center', 'justify-content': 'center' }}>
                                    <div style={{ 'margin': '10px 20px 10px 0px' }}>
                                        <img src={this.props.app_state.theme['letter']} style={{ height: 30, width: 'auto' }} />
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
                            <li style={{'padding': '5px'}} onClick={()=>this.when_moderator_account_clicked(item)}>
                                {this.render_detail_item('3', {'title':''+item, 'details':this.props.app_state.loc['731']/* 'Account ID' */, 'size':'l'})}
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
    }

    when_moderator_account_clicked(item){
        var cloned_array = this.state.moderators.slice()
        const index = cloned_array.indexOf(item);
        if (index > -1) { // only splice array when item is found
            cloned_array.splice(index, 1); // 2nd parameter means remove one item only
        }
        this.setState({moderators: cloned_array})
    }

    render_interactible_settings(){
        return(
            <div>
                <div style={{height:20}}/>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['732']/* 'Interactible ID' */, 'details':this.props.app_state.loc['733']/* 'Set the account id for your targeted account, and expiry time for their interactibility' */, 'size':'l'})}

                <div style={{height:10}}/>
                <TextInput font={this.props.app_state.font} height={30} placeholder={this.props.app_state.loc['732']/* 'Interactible ID' */} when_text_input_field_changed={this.when_interactible_id_input_field_changed.bind(this)} text={this.state.interactible_id} theme={this.props.theme}/>

                {this.load_account_suggestions('interactible_id')}

                <div style={{height:20}}/>

                <ThemeProvider theme={createTheme({ palette: { mode: this.props.theme['calendar_color'], }, })}>
                    <CssBaseline />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <StaticDateTimePicker orientation="portrait" onChange={(newValue) => this.when_new_dat_time_value_set(newValue)}/>
                    </LocalizationProvider>
                </ThemeProvider>

                <div style={{height:20}}/>
                <div style={{'padding': '5px'}} onClick={() => this.when_add_interactible_button_tapped()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['734']/* 'Add Interactible Account' */, 'action':''})}
                </div>
                
                <div style={{height:20}}/>
                {this.render_set_interactible_accounts()}
            </div>
        )
    }

    when_interactible_id_input_field_changed(text){
        this.setState({interactible_id: text})
    }

    when_new_dat_time_value_set(value){
        const selectedDate = value instanceof Date ? value : new Date(value);
        const timeInSeconds = Math.floor(selectedDate.getTime() / 1000);
        this.setState({interactible_timestamp: timeInSeconds})
    }

    async when_add_interactible_button_tapped(){
        var interactible_id = await this.get_typed_alias_id(this.state.interactible_id.toString().trim())
        var interactibles_clone = this.state.interactibles.slice()
        if(isNaN(interactible_id) || parseInt(interactible_id) < 0 || interactible_id == ''){
            this.props.notify(this.props.app_state.loc['735']/* 'please put a valid account id' */, 600)
        }
        else if(this.state.interactible_timestamp < (new Date().getTime()/1000)){
            this.props.notify(this.props.app_state.loc['236'], 2600)
        }
        else if(this.is_interactable_included(interactible_id, interactibles_clone)){
            this.props.notify(this.props.app_state.loc['162n'], 3600)
        }
        else{
            interactibles_clone.push({'id': interactible_id, 'timestamp':this.state.interactible_timestamp})
            this.setState({interactibles: interactibles_clone});
            this.props.notify(this.props.app_state.loc['736']/* 'added interactible account!' */, 400)
        }
    }

    is_interactable_included(id, clone){
        var has_been_added = false
        clone.forEach(item => {
            var added_id = item['id']
            if(id == added_id){
                has_been_added = true
            }
        });
        return has_been_added
    }

    render_set_interactible_accounts(){
        var middle = this.props.height-500;
        var size = this.props.size;
        if(size == 'm'){
            middle = this.props.height-100;
        }
        var items = [].concat(this.state.interactibles)

        if(items.length == 0){
            items = [0,3,0]
            return(
                <div style={{}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px', 'list-style':'none'}}>
                        {items.map((item, index) => (
                            <li style={{ 'padding': '2px 5px 2px 5px' }} onClick={() => console.log()}>
                                    <div style={{ height: 60, width: '100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px', 'padding': '10px 0px 10px 10px', 'display': 'flex', 'align-items': 'center', 'justify-content': 'center' }}>
                                        <div style={{ 'margin': '10px 20px 10px 0px' }}>
                                            <img src={this.props.app_state.theme['letter']} style={{ height: 30, width: 'auto' }} />
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
                            <li style={{'padding': '5px'}} onClick={()=>this.when_interactible_account_clicked(item)}>
                                {this.render_detail_item('3', {'title':'Interactible Account ID: '+item['id'], 'details':'Until: '+(new Date(item['timestamp']*1000)), 'size':'l'})}
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
    }

    when_interactible_account_clicked(item){
        var cloned_array = this.state.interactibles.slice()
        const index = cloned_array.indexOf(item);
        if (index > -1) { // only splice array when item is found
            cloned_array.splice(index, 1); // 2nd parameter means remove one item only
        }
        this.setState({interactibles: cloned_array})
    }










    render_set_token_prices_list(){
        var size = this.props.size
        var height = this.props.height-150

        if(size == 's'){
            return(
                <div style={{ 'overflow-x':'hidden'}}>
                    {this.render_set_token_and_amount_part()}
                    <div style={{height: 20}}/>
                    {this.render_set_prices_list_part()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" >
                        {this.render_set_token_and_amount_part()}
                    </div>
                    <div className="col-6" >
                        {this.render_set_prices_list_part()}
                    </div>
                </div>
                
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" >
                        {this.render_set_token_and_amount_part()}
                    </div>
                    <div className="col-5" >
                        {this.render_set_prices_list_part()}
                    </div>
                </div>
                
            )
        }
    }

    render_set_token_and_amount_part(){
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['d311g']/* 'Base Fee Exchange.' */, 'details':this.props.app_state.loc['d311h']/* 'Specify an exchange by its id, then the desired base price, and click add' */, 'size':'l'})}

                <div style={{height:10}}/>
                <TextInput font={this.props.app_state.font} height={30} placeholder={this.props.app_state.loc['737']/* 'Exchange ID' */} when_text_input_field_changed={this.when_exchange_id_input_field_changed.bind(this)} text={this.state.exchange_id} theme={this.props.theme}/>

                {this.load_token_suggestions('exchange_id')}
                <div style={{height: 20}}/>

                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['739']/* 'Price' */, 'number':this.state.price_amount, 'relativepower':this.props.app_state.loc['646']/* 'tokens' */})}>
                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['739']/* 'Price' */, 'subtitle':this.format_power_figure(this.state.price_amount), 'barwidth':this.calculate_bar_width(this.state.price_amount), 'number':this.format_account_balance_figure(this.state.price_amount), 'barcolor':'', 'relativepower':this.props.app_state.loc['646']/* 'tokens' */, })}
                </div>

                <NumberPicker clip_number={this.props.app_state.clip_number} font={this.props.app_state.font} number_limit={bigInt('1e72')} when_number_picker_value_changed={this.when_price_amount.bind(this)} theme={this.props.theme} power_limit={63}/>

                {this.render_detail_item('0')}

                <div style={{'padding': '5px'}} onClick={() => this.when_add_price_set()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['740']/* 'Add Price' */, 'action':''})}
                </div>
            </div>
        )
    }

    when_exchange_id_input_field_changed(text){
        this.setState({exchange_id: text})
    }

    when_price_amount(amount){
        this.setState({price_amount: amount})
    }

    when_add_price_set(){
        var exchange_id = this.get_token_id_from_symbol(this.state.exchange_id.trim())
        var amount = this.state.price_amount

        var target_exchange_data = this.props.app_state.created_token_object_mapping[this.props.app_state.selected_e5][exchange_id]
        var default_depth = 0;
        if(target_exchange_data != null){
            target_exchange_data = target_exchange_data['ipfs']
            if(target_exchange_data != null){
                default_depth = target_exchange_data.default_depth == null ? 0 : target_exchange_data.default_depth
            }
        }

        if(isNaN(exchange_id) || parseInt(exchange_id) < 0 || exchange_id == '' || !this.does_exchange_exist(exchange_id)){
            this.props.notify(this.props.app_state.loc['741']/* 'please put a valid exchange id' */, 2600)
        }
        else if(default_depth != 0){
            this.props.notify(this.props.app_state.loc['2762']/* 'You cant use that exchange.' */, 3600)
        }
        else if(amount == 0){
            this.props.notify(this.props.app_state.loc['742']/* 'please put a valid amount' */, 2600)
        }
        else if(this.is_exchange_already_added(exchange_id)){
            this.props.notify(this.props.app_state.loc['743']/* 'You cant use the same exchange twice' */, 3600)
        }
        else{
            var price_data_clone = this.state.price_data.slice()
            price_data_clone.push({'id':exchange_id, 'amount':amount})
            this.setState({price_data: price_data_clone});
            this.props.notify(this.props.app_state.loc['744']/* 'added price!' */, 1400)
        }
    }

    is_exchange_already_added(exchange_id){
        if(this.get_item_in_array(exchange_id, this.state.price_data) == null){
            return false
        }
        return true
    }

    get_item_in_array(exchange_id, object_array){
        var object = object_array.find(x => x['id'] === exchange_id);
        return object
    }

    does_exchange_exist(exchange_id){
        if(this.props.app_state.created_token_object_mapping[this.props.app_state.selected_e5][parseInt(exchange_id)] == null){
            return false
        }
        return true
    }

    get_token_id_from_symbol(typed_search){
        if(!isNaN(typed_search)){
            return typed_search
        }
        var id = this.props.app_state.token_directory[this.props.app_state.selected_e5][typed_search.toUpperCase()] == null ? typed_search : this.props.app_state.token_directory[this.props.app_state.selected_e5][typed_search.toUpperCase()]

        return id
    }

    render_set_prices_list_part(){
        var middle = this.props.height-500;
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
                            <li style={{ 'padding': '2px 5px 2px 5px' }} onClick={() => console.log()}>
                                <div style={{ height: 60, width: '100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px', 'padding': '10px 0px 10px 10px', 'display': 'flex', 'align-items': 'center', 'justify-content': 'center' }}>
                                    <div style={{ 'margin': '10px 20px 10px 0px' }}>
                                        <img src={this.props.app_state.theme['letter']} style={{ height: 30, width: 'auto' }} />
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
                                    <div style={{width:'100%', /* 'background-color':this.props.theme['send_receive_ether_background_color'] */}}>
                                        <li style={{'padding': '5px'}}>
                                            <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[this.props.app_state.selected_e5+item['id']], 'number':item['amount'], 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['id']]})}>
                                                {this.render_detail_item('2', { 'style':'l', 'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[this.props.app_state.selected_e5+item['id']], 'subtitle':this.format_power_figure(item['amount']), 'barwidth':this.calculate_bar_width(item['amount']), 'number':this.format_account_balance_figure(item['amount']), 'barcolor':'', 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['id']], })}
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












    render_set_certificate_model_data(){
        var size = this.props.size

        if(size == 's'){
            return(
                <div style={{ 'overflow-x':'hidden'}}>
                    {this.render_set_certificate_model_part()}
                    {this.render_detail_item('0')}
                    {this.render_set_certificate_model_part2()}
                    {this.render_detail_item('0')}
                    {this.render_set_models_list_part()}
                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" >
                        {this.render_set_certificate_model_part()}
                        {this.render_detail_item('0')}
                        {this.render_detail_item('0')}
                    </div>
                    <div className="col-6" >
                        {this.render_set_certificate_model_part2()}
                        {this.render_detail_item('0')}
                        {this.render_set_models_list_part()}
                    </div>
                </div>
                
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" >
                        {this.render_set_certificate_model_part()}
                        {this.render_detail_item('0')}
                        {this.render_detail_item('0')}
                    </div>
                    <div className="col-5" >
                        {this.render_set_certificate_model_part2()}
                        {this.render_detail_item('0')}
                        {this.render_set_models_list_part()}
                    </div>
                </div>
                
            )
        }
    }

    render_set_certificate_model_part(){
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['d311k']/* 'Certificate Model Details.' */, 'details':this.props.app_state.loc['d311l']/* 'Specify the structure of your certificate and the type of valid tokens that may be minted.' */, 'size':'l'})}
                {this.render_detail_item('0')}

                {this.render_detail_item('3', {'title':this.props.app_state.loc['d311m']/* 'New Class.' */, 'details':this.props.app_state.loc['d311n']/* 'Specify a Class Name or Identifier. One word, no spaces.' */, 'size':'l'})}
                <div style={{height:10}}/>

                <TextInput font={this.props.app_state.font} height={30} placeholder={this.props.app_state.loc['d311o']/* 'Class Name...' */} when_text_input_field_changed={this.when_class_id_input_field_changed.bind(this)} text={this.state.class_name} theme={this.props.theme}/>
                {this.render_detail_item('10',{'font':this.props.app_state.font, 'textsize':'10px','text':this.props.app_state.loc['124']/* 'remaining character count: ' */+(35 - this.state.class_name.length)})}

                {this.render_detail_item('0')}

                {this.render_detail_item('3', {'title':this.props.app_state.loc['d311p']/* 'Class Maximum Supply.' */, 'details':this.props.app_state.loc['d311q']/* 'The total number of non-fungible tokens that can be minted as certificates for this new class.' */, 'size':'l'})}
                <div style={{height:10}}/>

                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['d311r']/* 'Number of Certificates.' */, 'subtitle':this.format_power_figure(this.state.maximum_supply), 'barwidth':this.calculate_bar_width(this.state.maximum_supply), 'number':this.format_account_balance_figure(this.state.maximum_supply), 'barcolor':'', 'relativepower':this.props.app_state.loc['d311s']/* 'certificates' */, })}
                </div>

                <NumberPicker clip_number={this.props.app_state.clip_number} font={this.props.app_state.font} number_limit={bigInt(999_999_999)} when_number_picker_value_changed={this.when_maximum_supply.bind(this)} theme={this.props.theme} power_limit={9}/>

                {this.render_detail_item('0')}

                {this.render_detail_item('3', {'title':this.props.app_state.loc['d311t']/* 'Purchase Start Time.' */, 'details':this.props.app_state.loc['d311u']/* 'Specify a time after which the class\'s certificates can be purcahsed.' */, 'size':'l'})}
                <div style={{height:10}}/>

                {this.render_detail_item('3', {'title':(new Date(this.state.purchase_start_time).toLocaleString()), 'details':this.get_time_diff(this.state.purchase_start_time), 'size':'l'})}

                <ThemeProvider theme={createTheme({ palette: { mode: this.props.theme['calendar_color'], }, })}>
                    <CssBaseline />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <StaticDateTimePicker orientation="portrait" onChange={(newValue) => this.when_new_purchase_start_date_time_value_set(newValue)}/>
                    </LocalizationProvider>
                </ThemeProvider>


                {this.render_detail_item('0')}


                {this.render_detail_item('3', {'title':this.props.app_state.loc['d311w']/* 'Purchase End Time.' */, 'details':this.props.app_state.loc['d311x']/* 'Specify a time after which the class\'s certificates cannot be purchased.' */, 'size':'l'})}
                <div style={{height:10}}/>

                {this.render_detail_item('3', {'title':(new Date(this.state.purchase_end_time).toLocaleString()), 'details':this.get_time_diff(this.state.purchase_end_time), 'size':'l'})}

                <ThemeProvider theme={createTheme({ palette: { mode: this.props.theme['calendar_color'], }, })}>
                    <CssBaseline />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <StaticDateTimePicker orientation="portrait" onChange={(newValue) => this.when_new_purchase_end_date_time_value_set(newValue)}/>
                    </LocalizationProvider>
                </ThemeProvider>

            </div>
        )
    }

    render_set_certificate_model_part2(){
        return(
            <div>
                {/* {this.render_detail_item('3', {'title':this.props.app_state.loc['d311y'] 'Split Periods.', 'details':this.props.app_state.loc['d311z']'You may optionally specify a periodic split, meaning the certificates will be purchased in a specified frequency within the time bounds set.', 'size':'l'})}
                <div style={{height:10}}/>
                
                {this.render_detail_item('3', {'title':this.get_time_diff(this.state.split_period), 'details':this.props.app_state.loc['1439'] 'Estimated Time.', 'size':'l'})}
                
                <DurationPicker font={this.props.app_state.font} when_number_picker_value_changed={this.when_split_period_time_set.bind(this)} theme={this.props.theme} loc={this.props.app_state.loc}/>

                {this.render_detail_item('0')} */}

                {this.render_detail_item('3', {'size':'l', 'details':this.props.app_state.loc['d311bz']/* 'The threshold after which an owner has rights to posess the item this certificate represents if fractionalization is enabled and carried out.' */, 'title':this.props.app_state.loc['d311bx']/* 'Posession Rights Threshold' */})}
                {this.render_detail_item('10', {'font':this.props.app_state.font, 'textsize':'15px', 'text':this.props.app_state.loc['d311ca']/* 'If unset, the default used will be 100%' */})}
                
                <div style={{height:10}}/>
                {this.render_detail_item('3', {'title':this.format_proportion(this.state.posession_rights), 'details':this.props.app_state.loc['d311by']/* 'Posession Rights Proportion.' */, 'size':'l'})}

                <NumberPicker clip_number={this.props.app_state.clip_number} font={this.props.app_state.font} number_limit={bigInt('1e18')} when_number_picker_value_changed={this.when_posession_rights_proportion.bind(this)} power_limit={9} theme={this.props.theme} decimal_count={16} pick_with_text_area={true} text_area_hint={'50.1%'}/>

                {this.render_detail_item('0')}

                {this.render_detail_item('3', {'title':this.props.app_state.loc['d311ba']/* 'Base-fee Price Multiplier' */, 'details':this.props.app_state.loc['d311bb']/* 'The base fee that will be applied when acquiring certificates in this class.' */, 'size':'l'})}
                <div style={{height:10}}/>

                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['d311bc']/* 'Price Multiplier' */, 'subtitle':this.format_power_figure(this.state.base_fee_price_multiplier), 'barwidth':this.calculate_bar_width(this.state.base_fee_price_multiplier), 'number':this.format_account_balance_figure(this.state.base_fee_price_multiplier), 'barcolor':'', 'relativepower':this.props.app_state.loc['d311bd']/* 'tokens' */, })}
                </div>

                {this.render_multiplied_prices()}

                <NumberPicker clip_number={this.props.app_state.clip_number} font={this.props.app_state.font} number_limit={bigInt('1e72')} when_number_picker_value_changed={this.when_base_fee_price_multiplier.bind(this)} theme={this.props.theme} power_limit={63}/>

                {this.render_detail_item('0')}

                {this.render_detail_item('3', {'title':this.props.app_state.loc['d311bq']/* Class Details */, 'details':this.props.app_state.loc['d311br']/* You can optionally specify some details about the class. */, 'size':'l'})}
                <div style={{height:10}}/>

                <Tags font={this.props.app_state.font} page_tags_object={this.state.get_markdown_preview_or_editor_object} tag_size={'l'} when_tags_updated={this.when_get_markdown_preview_or_editor_object_updated.bind(this)} theme={this.props.theme}/>

                {this.render_preview_or_editor_option_ui2()}
                <div style={{height:10}}/>

                {this.render_detail_item('0')}

                {this.render_detail_item('3', {'title':this.props.app_state.loc['d311be']/* 'Create New Class.' */, 'details':this.props.app_state.loc['d311bf']/* 'Create the new class with the specified details.' */, 'size':'l'})}
                <div style={{height:10}}/>

                <div style={{'padding': '5px'}} onClick={() => this.when_add_class_tapped()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['d311bh']/* 'Create Class' */, 'action':''})}
                </div>
            </div>
        )
    }

    when_posession_rights_proportion(number){
        this.setState({posession_rights: number})
    }

    when_class_id_input_field_changed(text){
        if(this.state.edit_id == null) this.setState({class_name: text});
    }

    when_maximum_supply(number){
        this.setState({maximum_supply: number})
    }

    when_new_purchase_start_date_time_value_set(value){
        const selectedDate = value instanceof Date ? value : new Date(value);
        const timeInSeconds = Math.floor(selectedDate.getTime() / 1000);
        this.setState({purchase_start_time: timeInSeconds})
    }

    when_new_purchase_end_date_time_value_set(value){
        const selectedDate = value instanceof Date ? value : new Date(value);
        const timeInSeconds = Math.floor(selectedDate.getTime() / 1000);
        this.setState({purchase_end_time: timeInSeconds})
    }

    when_split_period_time_set(number){
        this.setState({split_period: number})
    }

    when_base_fee_price_multiplier(number){
        this.setState({base_fee_price_multiplier: number})
    }

    render_multiplied_prices(){
        return(
            <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                {this.state.price_data.map((item, index) => (
                    <div style={{'padding': '1px'}} onClick={() => this.props.view_number({'number':bigInt(item['amount']).multiply(this.state.base_fee_price_multiplier), 'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[this.state.e5+item['id']], 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['id']]})}>
                        {this.render_detail_item('2', {'style':'l','title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[this.state.e5+item['id']], 'subtitle':this.format_power_figure(bigInt(item['amount']).multiply(this.state.base_fee_price_multiplier)), 'barwidth':this.calculate_bar_width(bigInt(item['amount']).multiply(this.state.base_fee_price_multiplier)), 'number':this.format_account_balance_figure(bigInt(item['amount']).multiply(this.state.base_fee_price_multiplier)), 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['id']]})}
                    </div>
                ))}
            </div>
        )
    }

    when_add_class_tapped(){
        const class_name = this.state.class_name.trim()
        const maximum_supply = this.state.maximum_supply
        const purchase_start_time = this.state.purchase_start_time
        const purchase_end_time = this.state.purchase_end_time
        // const split_period = this.state.split_period
        const base_fee_price_multiplier = this.state.base_fee_price_multiplier
        const class_markdown = this.state.class_markdown
        const posession_rights = this.state.posession_rights

        if(class_name == ''){
            this.props.notify(this.props.app_state.loc['128']/* 'type something!' */, 1400)
        }
        else if(this.hasWhiteSpace(class_name)){
            this.props.notify(this.props.app_state.loc['129']/* 'enter one word!' */, 1400)
        }
        else if(class_name.length > 35){
            this.props.notify(this.props.app_state.loc['d311bi']/* 'That class name is too long' */, 4400)
        }
        else if(purchase_start_time > purchase_end_time){
            this.props.notify(this.props.app_state.loc['d311bj']/* 'The start time cannot be after the end time' */, 6400)
        }
        else if(base_fee_price_multiplier == 0){
            this.props.notify(this.props.app_state.loc['d311bk']/* 'base fee multiplier cannot be 0' */, 4400)
        }
        else{
            const clone = structuredClone(this.state.certificate_models)
            clone[class_name] = {
                'id':make_number_id(9),
                'class_name':class_name,
                'maximum_supply':maximum_supply,
                'purchase_start_time':purchase_start_time,
                'purchase_end_time':purchase_end_time,
                // 'split_period':split_period,
                'base_fee_price_multiplier':base_fee_price_multiplier,
                'class_markdown':class_markdown,
                'posession_rights': posession_rights == 0 ? bgN(1,18) : posession_rights
            }
            this.setState({certificate_models: clone, class_name: '', class_markdown:''})
            this.props.notify(this.props.app_state.loc['d311bl']/* 'class data set.' */, 900)
        }
    }

    render_set_models_list_part(){
        var middle = this.props.height-500;
        var size = this.props.size;
        if(size == 'm'){
            middle = this.props.height-100;
        }
        var items = [].concat(Object.keys(this.state.certificate_models))

        if(items.length == 0){
            items = [0,3,0]
            return(
                <div style={{}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px', 'list-style':'none'}}>
                        {items.map((item, index) => (
                            <li style={{ 'padding': '2px 5px 2px 5px' }} onClick={() => console.log()}>
                                <div style={{ height: 60, width: '100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px', 'padding': '10px 0px 10px 10px', 'display': 'flex', 'align-items': 'center', 'justify-content': 'center' }}>
                                    <div style={{ 'margin': '10px 20px 10px 0px' }}>
                                        <img src={this.props.app_state.theme['letter']} style={{ height: 30, width: 'auto' }} />
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
                                    action: () =>this.when_model_clicked(item)
                                    }}>
                                    <div style={{width:'100%', /* 'background-color':this.props.theme['send_receive_ether_background_color'] */}}>
                                        {this.render_model_item(item)}
                                    </div>
                                </SwipeableListItem>
                            </SwipeableList>
                            
                        ))}
                    </ul>
                </div>
            )
        }
        
    }

    render_model_item(item){
        const data = this.state.certificate_models[item]
        const title = item
        const details = this.format_account_balance_figure(data['maximum_supply']) + ' • ' + this.props.app_state.loc['d311bm']/* 'from $' */.replace('$', (new Date(data['purchase_start_time']).toLocaleString()))
        const opacity = this.state.edit_id == data['id'] ? 0.5 : 1.0
        return(
            <div style={{opacity: opacity}} onClick={() => this.edit_model_item(item)}>
                {this.render_detail_item('3', {'title':title, 'details':details, 'size':'l'})}
            </div>
        )
    }

    edit_model_item(item){
        const clone = structuredClone(this.state.certificate_models)
        const clone2 = structuredClone(this.state.certificate_models)
        // delete clone[item]

        if(this.state.edit_id == clone2['id']){
            this.setState({edit_id: null, class_name: ''})
        }else{
            this.setState({class_name: clone2['class_name'], maximum_supply: clone2['maximum_supply'], purchase_start_time: clone2['purchase_start_time'], purchase_end_time: clone2['purchase_end_time'], /* split_period: clone2['split_period'], */ base_fee_price_multiplier: clone2['base_fee_price_multiplier'], 
            certificate_models: clone, class_markdown: clone2['class_markdown'], posession_rights: clone2['posession_rights'], edit_id: clone2['id']})

            this.props.notify(this.props.app_state.loc['d311bn']/* 'editing selected class.' */, 1900)
        }
    }

    when_model_clicked(item){
        const clone = structuredClone(this.state.certificate_models)
        delete clone[item]
        this.setState({certificate_models: clone})
    }

    render_preview_or_editor_option_ui2(){
        var selected_item = this.get_selected_item(this.state.get_markdown_preview_or_editor_object, this.state.get_markdown_preview_or_editor_object['i'].active)

        if(selected_item == this.props.app_state.loc['a311bt']/* 'Editor' */){
            return(
                <div>
                    <div style={{'margin':'0px 0px 0px 10px'}}>
                        <TextInput height={200} placeholder={this.props.app_state.loc['d311bs']/* 'Class\' Details in Markdown..' */} when_text_input_field_changed={this.when_class_markdown_field_changed.bind(this)} text={this.state.class_markdown} theme={this.props.theme}/>
                    </div>
                    {this.render_markdown_shortcut_list2()}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['a311bu']/* 'preview' */){
            return(
                <div>
                    {this.render_markdown_or_empty2()}
                </div>
            )
        }
    }

    render_markdown_or_empty2(){
        if(this.state.class_markdown.trim() == ''){
            return(
                <div>
                    {this.render_empty_views(2)}
                </div>
            )
        }else{
            return(
                <div>
                    {this.render_detail_item('13', {'source':this.state.class_markdown})}
                </div>
            )
        }
    }

    when_class_markdown_field_changed(text){
        this.setState({class_markdown: text})
    }

    render_markdown_shortcut_list2(){
        var items = this.props.app_state.markdown_shortcut_list

        return(
            <div>
                {this.render_detail_item('0')}
                <div style={{'margin':'0px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                    <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                        {items.map((item, index) => (
                            <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}} onClick={() => this.when_markdown_shortcut_clicked2(item['details'])}>
                                {this.render_detail_item('3', item)}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        )
    }

    when_markdown_shortcut_clicked2(text){
        if(text == this.props.app_state.loc['a311ei']/* '![eImage alt text](image.jpg)' */){
            this.props.show_pick_file_bottomsheet('image', 'create_markdown_image2', 1000000000000)
        }else{
            this.setState({class_markdown: this.state.class_markdown+'\n'+text})
        }
    }

    when_markdown_image_selected2 = async (files) => {
        var cloned_ecid_encryption_passwords = this.state.ecid_encryption_passwords == null ? {} : structuredClone(this.state.ecid_encryption_passwords)
        var current_markdown = this.state.class_markdown.slice()
        for(var f=0; f<files.length; f++){
            const file = files[f]
            cloned_ecid_encryption_passwords[file] = await this.props.get_ecid_file_password_if_any(file)
            current_markdown += `\n![${this.props.app_state.loc['a311ej']/* eImage alt text */}](${file})`
        }
        this.setState({ecid_encryption_passwords: cloned_ecid_encryption_passwords, class_markdown: current_markdown});
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
            {'id':'3', 'label':{'title':this.props.app_state.loc['3078']/* END */, 'details':this.props.app_state.selected_e5, 'size':'s', 'image':this.props.app_state.e5s[this.props.app_state.selected_e5].end_image, 'img_size':30}},
            {'id':'5', 'label':{'title':this.props.app_state.loc['3079']/* SPEND */, 'details':this.props.app_state.selected_e5.replace('E', '3'), 'size':'s', 'image':this.props.app_state.e5s[this.props.app_state.selected_e5].spend_image, 'img_size':30}},
        ];
        var exchanges_from_sync = this.props.app_state.created_tokens[this.props.app_state.selected_e5]
        if(exchanges_from_sync == null) exchanges_from_sync = []
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
            if(sorted_token_exchange_data[i]['ipfs'] == null || sorted_token_exchange_data[i]['ipfs'].default_depth == null || sorted_token_exchange_data[i]['ipfs'].default_depth == 0){
                items.push({'id':sorted_token_exchange_data[i]['id'], 'label':{'title':sorted_token_exchange_data[i]['ipfs'].entered_symbol_text, 'details':sorted_token_exchange_data[i]['ipfs'].entered_title_text, 'size':'s', 'image':(sorted_token_exchange_data[i]['ipfs'].token_image == null ? (sorted_token_exchange_data[i]['data'][0][3/* <3>token_type */] == 3 ? this.props.app_state.static_assets['end_img']:this.props.app_state.static_assets['spend_img']) : sorted_token_exchange_data[i]['ipfs'].token_image), 'img_size':30}})
            }
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
        this.setState({exchange_id: item['id']})
    }







    load_account_suggestions(target_type){
        var items = [].concat(this.get_suggested_accounts(target_type))
        var background_color = this.props.theme['card_background_color']
        var card_shadow_color = this.props.theme['card_shadow_color']
        return(
            <div style={{'margin':'0px 0px 0px 5px','padding': '5px 0px 7px 0px', width: '97%', 'background-color': 'transparent'}}>
                <ul style={{'list-style': 'none', 'padding': '0px 0px 5px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '13px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                    {items.map((item, index) => (
                        <li style={{'display': 'inline-block', 'margin': '5px 5px 5px 5px', '-ms-overflow-style': 'none'}} onClick={() => this.when_suggestion_clicked(item, index, target_type)}>
                            {this.render_detail_item('3', item['label'])}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    get_suggested_accounts(target_type){
        return[
            {'id':'53', 'label':{'title':this.props.app_state.loc['723']/* 'My Account' */, 'details':this.props.app_state.loc['724']/* 'Account' */, 'size':'s'}},
        ].concat(this.get_account_suggestions(target_type))
    }

    get_account_suggestions(target_type){
        var contacts = this.props.app_state.contacts[this.props.app_state.selected_e5]
        if(contacts == null) contacts = [];
        var return_array = []

        if(target_type == 'exchange_authority'){
            contacts.forEach(contact => {
                if(contact['id'].toString().includes(this.state.exchange_authority)){
                    return_array.push({'id':contact['id'],'label':{'title':contact['id'], 'details':this.get_contact_alias(contact), 'size':'s'}})
                }
            });
            return_array = this.filter_and_add_other_accounts(this.state.exchange_authority, return_array)
        }
        else if(target_type == 'trust_fee_target'){
            contacts.forEach(contact => {
                if(contact['id'].toString().includes(this.state.trust_fee_target)){
                    return_array.push({'id':contact['id'],'label':{'title':contact['id'], 'details':this.get_contact_alias(contact), 'size':'s'}})
                }
            });
            return_array = this.filter_and_add_other_accounts(this.state.trust_fee_target, return_array)
        }
        else if(target_type == 'moderator_id'){
            contacts.forEach(contact => {
                if(contact['id'].toString().includes(this.state.moderator_id)){
                    return_array.push({'id':contact['id'],'label':{'title':contact['id'], 'details':this.get_contact_alias(contact), 'size':'s'}})
                }
            });
            return_array = this.filter_and_add_other_accounts(this.state.moderator_id, return_array)
        }
        else if(target_type == 'interactible_id'){
            contacts.forEach(contact => {
                if(contact['id'].toString().includes(this.state.interactible_id)){
                    return_array.push({'id':contact['id'],'label':{'title':contact['id'], 'details':this.get_contact_alias(contact), 'size':'s'}})
                }
            });
            return_array = this.filter_and_add_other_accounts(this.state.interactible_id, return_array)
        }
        
        return return_array;
    }

    filter_and_add_other_accounts(typed_name, return_array){
        if(typed_name.length < 3){
            return return_array
        }
        const added_aliases = []
        return_array.forEach(item => {
            added_aliases.push(item['label']['details'])
        });

        return return_array.concat(this.get_all_aliases(added_aliases, typed_name))
    }

    get_all_aliases(added_aliases, typed_name){
        const aliases = []
        const e5 = this.props.app_state.selected_e5
        if(this.props.app_state.alias_bucket[e5] == null) return []
        const accounts = Object.keys(this.props.app_state.alias_bucket[e5])
        accounts.forEach(account_id => {
            const alias = this.props.app_state.alias_bucket[e5][account_id]
            if(!added_aliases.includes(alias) && alias.startsWith(typed_name.toLowerCase())){
                aliases.push({'id':account_id,'label':{'title':account_id, 'details':alias, 'size':'s'}})
            }
        });

        return aliases
    }

    get_contact_alias(contact){
        return (this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[contact['id']] == null ? ((contact['address'].toString()).substring(0, 9) + "...") : this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[contact['id']])
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

    when_suggestion_clicked(item, pos, target_type){
        if(target_type == 'exchange_authority'){
            this.setState({exchange_authority: item['id']})
        }
        else if(target_type == 'trust_fee_target'){
            this.setState({trust_fee_target: item['id']})
        }
        else if(target_type == 'moderator_id'){
            this.setState({moderator_id: item['id']})
        }
        else if(target_type == 'interactible_id'){
            this.setState({interactible_id: item['id']})
        }

    }








    finish_creating_object(){
        var index_tags = this.state.entered_indexing_tags
        var title = this.state.entered_title_text
        var texts = this.state.entered_text_objects
        var images = this.state.entered_image_objects
        var price_data = this.state.price_data
        var certificate_models = this.state.certificate_models

        const post_indexing = this.get_selected_item(this.state.get_chain_or_indexer_job_object, 'e')
        const size = this.lengthInUtf8Bytes(JSON.stringify(this.state))

        if(index_tags.length < 3){
            this.props.notify(this.props.app_state.loc['270'], 2700)
        }
        else if(title == ''){
            this.props.notify(this.props.app_state.loc['311'], 2700)
        }
        else if(title.length > this.props.app_state.title_size){
            this.props.notify(this.props.app_state.loc['272'], 2700)
        }
        else if(price_data.length == 0){
            this.props.notify(this.props.app_state.loc['d311i']/* 'A base fee for acquiring this certificate is required.' */, 7700)
        }
        else if(/!\[.*?\]\(.*?\)/.test(this.state.markdown) == true && this.props.can_sender_include_image_in_markdown() == false){
            this.props.notify(this.props.app_state.loc['2738au']/* 'You cant use media links in markdown right now.' */, 4000)
        }
        else if(Object.keys(certificate_models).length == 0){
            this.props.notify(this.props.app_state.loc['d311bo']/* 'You need to define your new certificate\'s model with classes.' */, 9000)
        }
        else{
            var me = this;
            setTimeout(function() {
                if(post_indexing == me.props.app_state.loc['1593cw']/* 'nitro 🛰️' */){
                    me.props.emit_new_object_in_socket(me.state)
                }else{
                    me.props.when_add_new_object_to_stack(me.state)
                    me.reset_state()
                }
            }, (1 * 1000));
            
            this.props.notify(this.props.app_state.loc['18']/* transaction added to stack' */, 1700);
        }
    }









    render_empty_object(){
        var background_color = this.props.theme['card_background_color']
        return(
                <div style={{height:160, width:'100%', 'background-color': background_color, 'border-radius': '15px','padding':'10px 0px 0px 10px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                    <div style={{'margin':'10px 20px 0px 0px'}}>
                        <img src={this.props.app_state.theme['letter']} style={{height:60 ,width:'auto'}} />
                        <p style={{'display': 'flex', 'align-items':'center','justify-content':'center', 'padding':'5px 0px 0px 7px', 'color': 'gray'}}></p>
                    </div>
                </div>
            );
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
        if(item_id == '3' || item_id == '7' || item_id == '8'|| item_id == '9' || item_id == '11' || item_id == '12' || item_id == '13' || item_id == '14') uploaded_data = this.props.app_state.uploaded_data
        return(
            <div>
                <ViewGroups uploaded_data={uploaded_data} graph_type={this.props.app_state.graph_type} font={this.props.app_state.font} item_id={item_id} object_data={object_data} theme={this.props.theme} add_indexing_tag_for_new_job={this.add_indexing_tag_for_new_job.bind(this)} delete_entered_tag={this.delete_entered_tag_word.bind(this)} when_add_text_button_tapped={this.when_add_text_button_tapped.bind(this)} width={this.props.app_state.width} when_city_selected={this.when_city_selected.bind(this)} show_images={this.props.show_images.bind(this)}
                
                />
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




export default NewCertificatePage;