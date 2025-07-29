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
import ViewGroups from '../../components/view_groups';
import Tags from '../../components/tags';
import TextInput from '../../components/text_input';
import NumberPicker from '../../components/number_picker';

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Draggable } from "react-drag-reorder";

import { SwipeableList, SwipeableListItem } from '@sandstreamdev/react-swipeable-list';
import '@sandstreamdev/react-swipeable-list/dist/styles.css';
import imageCompression from 'browser-image-compression';
import ReactJson from 'react-json-view'

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDateTimePicker } from "@mui/x-date-pickers/StaticDateTimePicker";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';


var bigInt = require("big-integer");

function number_with_commas(x) {
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

class NewPollPage extends Component {
    
    state = {
        selected: 0, id: makeid(8), object_type:28, type:this.props.app_state.loc['c311a']/* 'poll' */, e5:this.props.app_state.selected_e5,
        get_new_job_page_tags_object: this.get_new_job_page_tags_object(),
        entered_tag_text: '', entered_title_text:'', entered_text:'',
        entered_indexing_tags:[], entered_text_objects:[], entered_image_objects:[],
        entered_objects:[],

        content_channeling_setting: this.props.app_state.content_channeling, 
        device_language_setting: this.props.app_state.device_language, 
        device_country: this.props.app_state.device_country,
        device_region: this.props.app_state.device_region,

        edit_text_item_pos:-1,
        get_content_channeling_object:this.get_content_channeling_object(),

        entered_pdf_objects:[], markdown:'', get_markdown_preview_or_editor_object: this.get_markdown_preview_or_editor_object(), entered_zip_objects:[],

        participant_id:'', participants:[], json_files:[], csv_files:[],
        start_time:(new Date().getTime()/1000)+7200,
        end_time:(new Date().getTime()/1000)+64800,

        winner_count:1, candidate:'', candidates:[], poll_e5s:[this.props.app_state.selected_e5], viewers:[], randomizer: Math.random() + 0.001, get_changeable_vote_tags_object:this.get_changeable_vote_tags_object(),

        viewer:'',
    };


    get_new_job_page_tags_object(){
        var obj = {
            'i':{
                active:'e', 
            },
            'e':[
                ['or','',0], ['e', this.props.app_state.loc['c311bh']/* candidates */, this.props.app_state.loc['c311c']/* 'participants' */, this.props.app_state.loc['c311z']/* 'schedule' */, this.props.app_state.loc['c311cf']/* access */, 'e.'+this.props.app_state.loc['110']/* e.text */, this.props.app_state.loc['112']/* images */, this.props.app_state.loc['162r']/* 'pdfs' */, this.props.app_state.loc['162q']/* 'zip-files' */, this.props.app_state.loc['a311bq']/* 'markdown' */], [0]
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

    get_changeable_vote_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['or','',0], ['e',this.props.app_state.loc['c311cp']/* 'enabled' */], [0]
            ],
        };
    }
    





    render(){
        return(
            <div style={{'padding':'10px 10px 0px 10px'}}>
                <div style={{'display': 'flex','flex-direction': 'row','margin':'0px 0px 0px 0px', width: this.props.app_state.width}}>
                    <div style={{'padding': '0px 0px 0px 0px', width:this.props.app_state.width-50}}>
                        <Tags font={this.props.app_state.font} app_state={this.props.app_state} page_tags_object={this.state.get_new_job_page_tags_object} tag_size={'l'} when_tags_updated={this.when_new_job_page_tags_updated.bind(this)} theme={this.props.theme}/>
                    </div>
                    <div style={{'padding': '0px 10px 0px 0px', width:40}}>
                        <img alt="" className="text-end" onClick={()=>this.finish_creating_object()} src={this.props.theme['close']} style={{height:36, width:'auto'}} />
                    </div>
                </div>
                {/* <div className="row" style={{'width':'102%'}}>
                    <div className="col-11" style={{'padding': '0px 0px 0px 10px'}}>
                        <Tags font={this.props.app_state.font} app_state={this.props.app_state} page_tags_object={this.state.get_new_job_page_tags_object} tag_size={'l'} when_tags_updated={this.when_new_job_page_tags_updated.bind(this)} theme={this.props.theme}/>
                    </div>
                    <div className="col-1" style={{'padding': '0px 0px 0px 0px'}}>
                        <div className="text-end" style={{'padding': '0px 10px 0px 0px'}} >
                            <img alt="" className="text-end" onClick={()=>this.finish_creating_object()} src={this.props.theme['close']} style={{height:36, width:'auto'}} />
                        </div>
                    </div>
                </div> */}
                
                
                <div style={{'margin':'0px 0px 0px 0px', overflow: 'auto', maxHeight: this.props.height-120}}>
                    {this.render_everything()}   
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
        else if(selected_item == this.props.app_state.loc['112']){
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
        else if(selected_item == this.props.app_state.loc['c311c']/* 'participants' */){
            return(
                <div>
                    {this.render_enter_participants_part()}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['c311z']/* 'schedule' */){
            return(
                <div>
                    {this.render_enter_schedule_time_part()}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['c311bh']/* candidates */){
            return(
                <div>
                    {this.render_enter_candidates_part()}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['c311cf']/* access */){
            return(
                <div>
                    {this.render_access_rights_part()}
                </div>
            )
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
        this.setState({screen_width: this.screen.current?.offsetWidth})
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
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_title_tags_part()}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_title_tags_part2()}
                    </div>
                </div>
                
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_title_tags_part()}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_title_tags_part2()}
                    </div>
                </div>
                
            )
        }
    }

    render_title_tags_part(){
        return(
            <div ref={this.screen} style={{'padding':'0px 0px 0px 0px'}}>
                {this.render_detail_item('4',{'font':this.props.app_state.font, 'textsize':'14px','text':this.props.app_state.loc['c311b']})}
                <div style={{height:10}}/>
                
                <TextInput height={30} placeholder={this.props.app_state.loc['123']} when_text_input_field_changed={this.when_title_text_input_field_changed.bind(this)} text={this.state.entered_title_text} theme={this.props.theme}/>
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

            </div>
        )
    }

    render_title_tags_part2(){
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['c311cb']/* 'Participation E5s.' */, 'details':this.props.app_state.loc['c311cc']/* 'Restrict participation of this poll to specific E5s.' */, 'size':'l'})}
                <div style={{height:10}}/>
                {this.load_preferred_e5_ui()}
                {this.render_detail_item('10', {'text':this.props.app_state.loc['c311cd']/* 'If you specify a participant in an E5 that you dont select here, their vote will be discarded.' */, 'textsize':'11px', 'font':this.props.app_state.font})}


                
                {this.render_detail_item('0')}
                {this.render_detail_item('3', {'title':this.props.app_state.loc['c311cq']/* 'Changeable Vote.' */, 'details':this.props.app_state.loc['c311cr']/* 'If se to enabled, voters can change their vote during the valid period.' */, 'size':'l'})}
                <div style={{height:10}}/>
                <Tags font={this.props.app_state.font} page_tags_object={this.state.get_changeable_vote_tags_object} tag_size={'l'} when_tags_updated={this.when_get_changeable_vote_tags_object_updated.bind(this)} theme={this.props.theme}/>

                

                {this.render_detail_item('0')}
                {this.render_detail_item('3', {'title':this.props.app_state.loc['a311dc']/* 'Current post size.' */, 'details':this.props.app_state.loc['a311dd']/* 'Below is the size of your new post with all the details youve set.' */, 'size':'l'})}
                <div style={{height:10}}/>
                {this.render_transaction_size_indicator()}
            </div>
        )
    }

    when_get_changeable_vote_tags_object_updated(tag_obj){
        this.setState({get_changeable_vote_tags_object: tag_obj})
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

    add_indexing_tag_for_new_job(){
        var typed_word = this.state.entered_tag_text.trim().toLowerCase();

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
    }

    

    load_preferred_e5_ui(){
        var items = this.load_active_e5s()
        var items2 = [0, 1]
        return(
            <div style={{'margin':'3px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                    {items.map((item, index) => (
                        <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}} onClick={()=>this.when_e5_clicked(item)}>
                            {this.render_e5_item(item)}
                        </li>
                    ))}
                    {items2.map(() => (
                        <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}}>
                            {this.render_empty_horizontal_list_item()}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    load_active_e5s(){
        var active_e5s = []
        for(var i=0; i<this.props.app_state.e5s['data'].length; i++){
            var e5 = this.props.app_state.e5s['data'][i]
            if(this.props.app_state.e5s[e5].active == true){
                active_e5s.push(e5)
            }
        }
        return active_e5s
    }

    render_empty_horizontal_list_item(){
        var background_color = this.props.theme['view_group_card_item_background']
        return(
            <div>
                <div style={{height:57, width:85, 'background-color': background_color, 'border-radius': '8px','padding':'10px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                    <div style={{'margin':'0px 0px 0px 0px'}}>
                        <img alt="" src={this.props.app_state.theme['letter']} style={{height:20 ,width:'auto'}} />
                    </div>
                </div>
            </div>
        )
    }

    render_e5_item(item){
        var image = this.props.app_state.e5s[item].e5_img
        var details = this.props.app_state.e5s[item].token
        if(this.state.poll_e5s.includes(item)){
            return(
                <div>
                    {this.render_detail_item('12', {'title':item, 'image':image,'details':details, 'size':'s'})}
                    <div style={{height:'1px', 'background-color':this.props.app_state.theme['line_color'], 'margin': '3px 5px 0px 5px'}}/>
                </div>
            )
        }else{
            return(
                <div>
                    {this.render_detail_item('12', {'title':item, 'image':image, 'details':details, 'size':'s'})}
                </div>
            )
        }
    }

    when_e5_clicked(item){
        if(item == this.props.app_state.selected_e5){
            this.props.notify(this.props.app_state.loc['c311ca']/* You cant remove that E5. */, 1800)
            return;
        }
        var clone = this.state.poll_e5s.slice()
        const index = clone.indexOf(item)
        if (index > -1) { // only splice array when item is found
            clone.splice(index, 1); // 2nd parameter means remove one item only
        }else{
            clone.push(item)
        }
        this.setState({poll_e5s: clone})
    }




    render_transaction_size_indicator(){
        var current_stack_size = this.props.app_state.stack_size_in_bytes[this.state.e5] == null ? 50 : this.props.app_state.stack_size_in_bytes[this.state.e5]
        if(current_stack_size != -1){
            const size = this.lengthInUtf8Bytes(JSON.stringify(this.state))
            const stack_size_in_bytes_formatted_data_size = this.format_data_size2(size)
            
            var existing_percentage = this.round_off((current_stack_size / this.props.app_state.upload_object_size_limit) * 100)
            var additional_percentage = this.round_off((size / this.props.app_state.upload_object_size_limit) * 100)
            
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
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
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
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_text_part()}
                        {this.render_entered_texts()}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
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
                                <div style={{width:'100%', 'background-color':this.props.theme['send_receive_ether_background_color']}}><li style={{'padding': '5px'}} onClick={()=>this.edit_text_item(item)}>
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


    when_banner_image_picked = (e) => {
        if(e.target.files && e.target.files[0]){
            for(var i = 0; i < e.target.files.length; i++){ 
                let reader = new FileReader();
                reader.onload = function(ev){
                    if(ev.total < this.props.app_state.image_size_limit){
                        this.add_banner_to_object(ev.target.result)
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

    when_banner_selected(files){
        this.add_banner_to_object(files[0])
        var cloned_ecid_encryption_passwords = this.state.ecid_encryption_passwords == null ? {} : structuredClone(this.state.ecid_encryption_passwords)
        cloned_ecid_encryption_passwords[files[0]] = this.props.get_ecid_file_password_if_any(files[0])
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
        var items = ['⸜(｡˃ ᵕ ˂ )⸝♡','( ˶ˆᗜˆ˵ )','(๑>◡<๑)','ദ്ദി ˉ͈̀꒳ˉ͈́ )✧','( ˶°ㅁ°) !!','(*ᴗ͈ˬᴗ͈)ꕤ*.ﾟ','(｡>﹏<)','(๑-﹏-๑)','ᓚ₍ ^. .^₎','(˵ •̀ ᴗ - ˵ ) ✧','ᕙ(  •̀ ᗜ •́  )ᕗ','( ｡ •̀ ᴖ •́ ｡)','৻(  •̀ ᗜ •́  ৻)','( ˶ˆ꒳ˆ˵ )','(¬`‸´¬)','≽^•⩊•^≼','(ó﹏ò｡)']

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
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_pick_images_parts()}
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
                        {this.render_pick_images_parts()}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
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
            // this.props.notify('Your selected '+e.target.files.length+image+' been staged.',500);
        }
    }

    when_image_gif_files_picked(files){
        var clonedArray = this.state.entered_image_objects == null ? [] : this.state.entered_image_objects.slice();
        var cloned_ecid_encryption_passwords = this.state.ecid_encryption_passwords == null ? {} : structuredClone(this.state.ecid_encryption_passwords)
        files.forEach(file => {
            clonedArray.push(file);
            cloned_ecid_encryption_passwords[file] = this.props.get_ecid_file_password_if_any(file)
        });
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

    constructor(props) {
        super(props);
        this.screen = React.createRef()
        this.csv_input = React.createRef()
        this.json_input = React.createRef()
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
                                        <img alt="" src={this.props.app_state.theme['letter']} style={{height:40 ,width:'auto'}} />
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
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_pick_pdf_parts()}
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
                        {this.render_pick_pdf_parts()}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
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

    when_pdf_files_picked(files){
        var clonedArray = this.state.entered_pdf_objects == null ? [] : this.state.entered_pdf_objects.slice();
        files.forEach(file => {
            clonedArray.push(file);
        });

        var cloned_ecid_encryption_passwords = this.state.ecid_encryption_passwords == null ? {} : structuredClone(this.state.ecid_encryption_passwords)
        files.forEach(file => {
            cloned_ecid_encryption_passwords[file] = this.props.get_ecid_file_password_if_any(file)
        });
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
                                    <div style={{width:'100%', 'background-color':this.props.theme['send_receive_ether_background_color']}}>
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
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_pick_zip_parts()}
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
                        {this.render_pick_zip_parts()}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
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
    
    when_zip_files_picked(files){
        var clonedArray = this.state.entered_zip_objects == null ? [] : this.state.entered_zip_objects.slice();
        files.forEach(file => {
            clonedArray.push(file);
        });
        var cloned_ecid_encryption_passwords = this.state.ecid_encryption_passwords == null ? {} : structuredClone(this.state.ecid_encryption_passwords)
        files.forEach(file => {
            cloned_ecid_encryption_passwords[file] = this.props.get_ecid_file_password_if_any(file)
        });
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
                                    <div style={{width:'100%', 'background-color':this.props.theme['send_receive_ether_background_color']}}>
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
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_detail_item('4', {'text':this.props.app_state.loc['a311bv']/* 'You can add some Markdown text below. */, 'textsize':'13px', 'font':this.props.app_state.font})}
                        <div style={{height:10}}/>

                        <TextInput height={this.props.height-350} placeholder={this.props.app_state.loc['a311bs']/* 'New Markdown here...' */} when_text_input_field_changed={this.when_markdown_field_changed.bind(this)} text={this.state.markdown} theme={this.props.theme}/>
                        {this.render_markdown_shortcut_list()}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
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
                    <TextInput height={this.props.height-350} placeholder={this.props.app_state.loc['a311bs']/* 'New Markdown here...' */} when_text_input_field_changed={this.when_markdown_field_changed.bind(this)} text={this.state.markdown} theme={this.props.theme}/>

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
        var items = [
            {'title':this.props.app_state.loc['a311ca']/* 'Headings' */, 'details':'# H1 \n## H2 \n### H3', 'size':'l'},
            {'title':this.props.app_state.loc['a311cd']/* 'Bold' */, 'details':'**bold text**', 'size':'l'},
            {'title':this.props.app_state.loc['a311ce']/* 'Italic' */, 'details':'*italicized text*', 'size':'l'},
            {'title':this.props.app_state.loc['a311cf']/* 'Blockquote' */, 'details':'> blockquote', 'size':'l'},
            {'title':this.props.app_state.loc['a311cg']/* 'Ordered List' */, 'details':'1. First item \n2. Second item \n3. Third item', 'size':'l'},
            {'title':this.props.app_state.loc['a311ch']/* 'Unordered List' */, 'details':'- First item \n- Second item \n- Third item', 'size':'l'},
            {'title':this.props.app_state.loc['a311ci']/* 'Code' */, 'details':'`code`', 'size':'l'},
            {'title':this.props.app_state.loc['a311cj']/* 'Horizontal rule' */, 'details':'---', 'size':'l'},
            {'title':this.props.app_state.loc['a311ck']/* 'Link' */, 'details':'[title](https://www.example.com)', 'size':'l'},
            {'title':this.props.app_state.loc['a311cl']/* 'Image' */, 'details':'![alt text](image.jpg)', 'size':'l'},
        ]

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
        this.setState({markdown: this.state.markdown+'\n'+text})
    }










    render_enter_participants_part(){
        var size = this.props.size
        if(size == 's'){
            return(
                <div>
                    {this.render_pick_participants_parts()}
                    {this.render_detail_item('0')}
                    {this.render_pick_participants_parts2()}
                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_pick_participants_parts()}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_pick_participants_parts2()}
                    </div>
                </div>
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_pick_participants_parts()}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_pick_participants_parts2()}
                    </div>
                </div>
                
            )
        }
    }

    render_pick_participants_parts(){
        return(
            <div>
                {this.render_detail_item('4', {'text':this.props.app_state.loc['c311d']/* 'Specify the accounts set to participate in the poll. */, 'textsize':'13px', 'font':this.props.app_state.font})}
                {this.render_detail_item('10', {'text':this.props.app_state.loc['c311n']/* 'This action cannot be undone or changed after youre next run. */, 'textsize':'11px', 'font':this.props.app_state.font})}

                {this.render_detail_item('0')}

                {this.render_detail_item('3', {'title':this.props.app_state.loc['c311e']/* Participant Account */, 'details':this.props.app_state.loc['c311f']/* Manually add an account to the accepted participants */, 'size':'l'})}

                <div style={{height:10}}/>
                <TextInput font={this.props.app_state.font} height={60} placeholder={this.props.app_state.loc['c311g']/* Account... */} when_text_input_field_changed={this.when_participant_id_input_field_changed.bind(this)} text={this.state.participant_id} theme={this.props.theme}/>
                {this.render_detail_item('10', {'text':this.props.app_state.loc['c311cm']/* You can specify multiple accounts at once separated by commas, eg ( E25:1002,E25:1204... ) */, 'textsize':'11px', 'font':this.props.app_state.font})}
                {this.load_account_suggestions('participants')}

                <div style={{height: 10}}/>
                <div style={{'padding': '5px'}} onClick={() => this.when_add_participant_button_tapped()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['c311h']/* Add Account. */, 'action':''})}
                </div>
                <div style={{height: 10}}/>
                {this.render_added_participants()}
            </div>
        )
    }

    render_pick_participants_parts2(){
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['c311o']/* Add from File. */, 'details':this.props.app_state.loc['c311p']/* You can add multiple account ids from a csv or json file if youre dealing with a large number of participants. */, 'size':'l'})}
                {this.render_detail_item('10', {'text':this.props.app_state.loc['c311y']/* 'You will be required to reproduce these files in their current condition while calculating and posting results. Do not change them after your post this poll.*/, 'textsize':'11px', 'font':this.props.app_state.font})}
                {this.render_detail_item('0')}

                {this.render_detail_item('4', {'text':this.props.app_state.loc['c311s']/* 'Select a CSV file to use. You can select multiple files at once. */, 'textsize':'13px', 'font':this.props.app_state.font})}
                {this.render_detail_item('10', {'text':this.props.app_state.loc['c311t']/* 'Make sure each value in the file is separated by a comma \',\' character. \n eg ---> E25:1002,E25:1120,E25:1125,E25:31300,,,...*/, 'textsize':'11px', 'font':this.props.app_state.font})}
                <div style={{height:10}}/>
                <div onClick={() => this.call_input_function('csv')}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['c311q']/* 'Select CSV File' */, 'action':''})}
                </div>
                {this.render_detail_item('10', {'text':this.props.app_state.loc['c311x']/* '$ files selected.*/.replace('$', this.state.csv_files.length), 'textsize':'11px', 'font':this.props.app_state.font})}
                {this.render_csv_files()}


                {this.render_detail_item('0')}
                {this.render_detail_item('4', {'text':this.props.app_state.loc['c311u']/* 'Select a JSON file to use. You can select multiple files at once. Kindly observe the required format as shown below. */, 'textsize':'13px', 'font':this.props.app_state.font})}
                <div style={{height:10}}/>
                <div onClick={() => this.props.show_dialog_bottomsheet({}, 'view_json_example')}>
                    {this.render_detail_item('4', {'text':this.props.app_state.loc['c311ce']/* 'Tap this to view an example.' */, 'textsize':'13px', 'font':this.props.app_state.font})}
                </div>
                <div style={{height:10}}/>
                <div onClick={() => this.call_input_function('json')}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['c311r']/* 'Select JSON File.' */, 'action':''})}
                </div>
                {this.render_detail_item('10', {'text':this.props.app_state.loc['c311x']/* '$ files selected.*/.replace('$', this.state.csv_files.length), 'textsize':'11px', 'font':this.props.app_state.font})}
                {this.render_json_files()}

                {this.render_open_options_picker_upload_button()}
            </div>
        )
    }

    when_participant_id_input_field_changed(text){
        this.setState({participant_id: text})
    }

    when_add_participant_button_tapped(){
        var typed_text = this.state.participant_id.trim()
        if(typed_text.includes(',')){
            this.add_multiple_participants(typed_text)
            return;
        }
        var participant_id = this.get_typed_alias_id(typed_text)
        var participant_e5 = isNaN(typed_text) ? this.get_alias_e5(typed_text) : this.state.e5
        var final_value = participant_e5+':'+participant_id
        var participants_clone = this.state.participants.slice()
        if(typed_text == ''){
            this.props.notify(this.props.app_state.loc['c311cs']/* Type something */, 3600)
        }
        if(isNaN(participant_id) || parseInt(participant_id) < 1000 || participant_id == ''){
            this.props.notify(this.props.app_state.loc['c311i']/* That account is invalid. */, 3600)
        }
        else if(participants_clone.includes(final_value)){
            this.props.notify(this.props.app_state.loc['c311j']/* 'Youve already added that account.' */, 4600)
        }
        else{
            participants_clone.push(final_value)
            this.setState({participants: participants_clone, participant_id:''});
        }
    }

    add_multiple_participants(data){
        var entities = data.split(',')
        var final_obj = []
        var account_entries = 0
        var participants_clone = this.state.participants.slice()
        entities.forEach(account_data => {
            if(account_data != null && account_data != ''){
                var data_point_array = account_data.split(':')
                var e5 = ''
                var account = ''
                if(data_point_array.length == 2){
                    e5 = data_point_array[0].trim().replace(/[^a-zA-Z0-9 ]/g, '')
                    account = data_point_array[1].trim().replace(/[^a-zA-Z0-9 ]/g, '')
                }
                else if(data_point_array.length == 1){
                    e5 = this.state.e5
                    account = data_point_array[0].trim().replace(/[^a-zA-Z0-9 ]/g, '')
                }
                if(e5 != '' && account != ''){
                    if(this.props.app_state.e5s['data'].includes(e5) && this.props.app_state.e5s[e5].active == true){
                        if(!isNaN(account) && parseInt(account) < 10**16 && parseInt(account)>1000){
                            var final_value = e5+':'+parseInt(account)
                            if(!participants_clone.includes(final_value) && !final_obj.includes(final_value)){
                                final_obj.push(final_value)
                                account_entries++
                            }
                        }
                    }
                }
            }
        });
        if(account_entries == 0){
            this.props.notify(this.props.app_state.loc['c311cn']/* 'No accounts added.' */, 1200)
        }else{
            participants_clone = participants_clone.concat(final_obj)
            this.setState({participants: participants_clone, viewer:''});
            this.props.notify(this.props.app_state.loc['c311co']/* '$ accounts added.' */.replace('$', account_entries), 1200)
        }
    }
    

    get_typed_alias_id(alias){
        if(!isNaN(alias)){
            return alias
        }
        var obj = this.get_all_sorted_objects_mappings(this.props.app_state.alias_owners)
        var id = (obj[alias] == null ? alias : obj[alias])
        return id
    }

    get_alias_e5(recipient){
        var e5s = this.props.app_state.e5s['data']
        var recipients_e5 = this.props.app_state.selected_e5
        for (let i = 0; i < e5s.length; i++) {
            var e5 = e5s[i]
            if(this.props.app_state.alias_owners[e5] != null){
                var id = this.props.app_state.alias_owners[e5][recipient]
                if(id != null && !isNaN(id)){
                    recipients_e5 = e5
                }
            }
        }
        return recipients_e5
    }

    render_added_participants(){
        var items = [].concat(this.state.participants)
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
                        {items.map((item, index) => (
                            <SwipeableList>
                                <SwipeableListItem
                                    swipeLeft={{
                                    content: <p style={{'color': this.props.theme['primary_text_color']}}>{this.props.app_state.loc['2751']/* Delete */}</p>,
                                    action: () =>this.when_added_participant_clicked(item, index)
                                    }}>
                                    <div style={{width:'100%', 'background-color':this.props.theme['send_receive_ether_background_color']}}>
                                        <li style={{'padding': '3px'}}>
                                            {this.render_detail_item('3', {'title':' • '+this.get_data(item).id, 'details':this.get_senders_name(item), 'size':'l', 'title_image':this.props.app_state.e5s[this.get_data(item).e5].e5_img})}
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

    get_data(item){
        var obj = item.split(':')
        return { e5: obj[0], id: obj[1]}
    }

    get_senders_name(item){
        var data_item = this.get_data(item)
        var sender = data_item.id
        var e5 = data_item.e5
        if(sender == this.props.app_state.user_account_id[e5]){
            return this.props.app_state.loc['1694']/* 'You' */
        }else{
            var obj = this.props.app_state.alias_bucket[e5]
            var alias = (obj[sender] == null ? this.props.app_state.loc['c311m']/* 'Account' */ : obj[sender])
            return alias
        }
    }

    when_added_participant_clicked(item, index){
        var cloned_array = this.state.participants.slice()
        if (index > -1) { // only splice array when item is found
            cloned_array.splice(index, 1); // 2nd parameter means remove one item only
        }
        this.setState({participants: cloned_array})
    }

    render_open_options_picker_upload_button(){
        return(
            <div>
                <input ref={this.json_input} style={{display: 'none'}} id="upload" type="file" accept =".json" onChange ={this.when_json_file_picked.bind(this)} multiple/>
                
                <input ref={this.csv_input} style={{display: 'none'}} id="upload" type="file" accept =".csv" onChange ={this.when_csv_file_picked.bind(this)} multiple/>
            </div>
        )
    }

    call_input_function(type){
        if(this.is_preparing == true){
            this.props.notify(this.props.app_state.loc['3074g']/* Please wait for e to finish loading your selected files. */, 1200);
            return;
        }
        if(type == 'json'){
            this.json_input.current?.click()
        }
        else if(type == 'csv'){
            this.csv_input.current?.click()
        }
    }

    when_json_file_picked = async (e) => {
        this.props.notify(this.props.app_state.loc['c311v']/* Preparing files... */, 1200);
        this.is_preparing = true;
        await new Promise(resolve => setTimeout(resolve, 1400))
        if(e.target.files && e.target.files[0]){
            for(var i = 0; i < e.target.files.length; i++){
                this.is_loading_file = true
                let reader = new FileReader();
                reader.onload = async function(ev){
                    var data = ev.target.result
                    try{
                        var participants_data = JSON.parse(data)
                        var voter_data = await this.props.process_json_file_object(participants_data)
                        var clone = this.state.json_files.slice()
                        clone.push({'size':ev.total, 'name':this.current_file, 'data':voter_data})
                        this.setState({json_files: clone})
                    }catch(ex){
                        console.log('new_poll', ex)
                    }
                    this.is_loading_file = false
                    if(this.current_pos == e.target.files.length -1){
                        //its the last one
                        this.is_preparing = false;
                    }
                }.bind(this);
                var jsonFile = e.target.files[i];
                this.current_file = jsonFile['name']
                this.current_pos = i;
                const includes = this.state.json_files.find(e => e['name'] === this.current_file)
                if(includes == null){
                    reader.readAsText(jsonFile);
                }else{
                    this.is_loading_file = false
                }

                while (this.is_loading_file == true) {
                    if (this.is_loading_file == false) break
                    console.log('poll_data','Waiting for file to be loaded')
                    await new Promise(resolve => setTimeout(resolve, 1000))
                }
            }
        }
    }

    when_csv_file_picked = async(e) => {
        this.props.notify(this.props.app_state.loc['c311v']/* Preparing files... */, 1200);
        this.is_preparing = true;
        await new Promise(resolve => setTimeout(resolve, 1400))
        if(e.target.files && e.target.files[0]){
            for(var i = 0; i < e.target.files.length; i++){ 
                this.is_loading_file = true
                let reader = new FileReader();
                reader.onload = async function(ev){
                    var data = ev.target.result
                    var participants_data = data.toString()
                    var voter_data = await this.props.process_csv_file_data(participants_data)
                    var clone = this.state.csv_files.slice()
                    clone.push({'size':ev.total, 'name':this.current_file, 'data':voter_data})
                    this.setState({csv_files: clone})

                    this.is_loading_file = false
                    if(this.current_pos == e.target.files.length -1){
                        //its the last one
                        this.is_preparing = false;
                    }
                }.bind(this);
                var csvFile = e.target.files[i];
                this.current_pos = i;
                this.current_file = csvFile['name']
                const includes = this.state.csv_files.find(e => e['name'] === this.current_file)
                if(includes == null){
                    reader.readAsText(csvFile);
                }else{
                    this.is_loading_file = false
                }

                while (this.is_loading_file == true) {
                    if (this.is_loading_file == false) break
                    console.log('poll_data','Waiting for file to be loaded')
                    await new Promise(resolve => setTimeout(resolve, 1000))
                }
            }
        }
    }

    render_json_format_example(){
        var data = {
            'E25':[1002, 1003, 1004, 1005], 
            'E35':[1032, 7003, 29304, 39205], 
            'E45':[1032, 10009, 19829, 182928]
        }
        var view_theme = this.props.app_state.theme['json_view_theme']
        return(
            <div>
                <ReactJson src={data} theme={view_theme} collapsed={false} iconStyle={'circle'} displayObjectSize={false} displayDataTypes={false}
                />
            </div>
        )
    }

    render_csv_files(){
        var items = this.state.csv_files
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
                        <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}} onClick={() => this.when_csv_file_tapped(index)}>
                            {this.render_file(item, index, true, 'csv')}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    render_file(item, index, minified, type){
        var formatted_size = this.format_data_size(item['size'])
        var fs = formatted_size['size']+' '+formatted_size['unit']
        var txt = this.props.app_state.loc['c311w']/* $ accounts */.replace('$', number_with_commas(item['data'].account_entries))
        var details = fs+' • '+txt;
        var title = item['name']
        var size = 'l'
        var thumbnail = type == 'csv' ? this.props.app_state.static_assets['csv_file'] : this.props.app_state.static_assets['json_file']
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

    when_csv_file_tapped(index){
        var cloned_array = this.state.csv_files.slice()
        if (index > -1) { // only splice array when item is found
            cloned_array.splice(index, 1); // 2nd parameter means remove one item only
        }
        this.setState({csv_files: cloned_array})
    }

    render_json_files(){
        var items = this.state.json_files
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
                        <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}} onClick={() => this.when_json_file_tapped(index)}>
                            {this.render_file(item, index, true, 'json')}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    when_json_file_tapped(index){
        var cloned_array = this.state.json_files.slice()
        if (index > -1) { // only splice array when item is found
            cloned_array.splice(index, 1); // 2nd parameter means remove one item only
        }
        this.setState({json_files: cloned_array})
    }








    load_account_suggestions(target_type){
        var items = [].concat(this.get_suggested_accounts(target_type))
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
        var me = this.props.app_state.user_account_id[this.state.e5]
        if(me == null || me == 1){
            return this.get_account_suggestions(target_type)
        }
        return[
            {'id':me, 'label':{'title':this.props.app_state.loc['c311l']/* My Account. */, 'details':this.props.app_state.loc['c311m']/* 'Account' */, 'size':'s'}},
        ].concat(this.get_account_suggestions(target_type))
    }

    get_account_suggestions(target_type){
        var contacts = this.props.app_state.contacts[this.props.app_state.selected_e5]
        if(contacts == null) contacts = [];
        var return_array = []

        if(target_type == 'participants'){
            contacts.forEach(contact => {
                if(contact['id'].toString().includes(this.state.participants)){
                    return_array.push({'id':contact['id'],'label':{'title':contact['id'], 'details':this.get_contact_alias(contact), 'size':'s'}})
                }
            });
            return_array = this.filter_and_add_other_accounts(this.state.participants, return_array)
        }
        else if(target_type == 'viewer'){
            contacts.forEach(contact => {
                if(contact['id'].toString().includes(this.state.viewers)){
                    return_array.push({'id':contact['id'],'label':{'title':contact['id'], 'details':this.get_contact_alias(contact), 'size':'s'}})
                }
            });
            return_array = this.filter_and_add_other_accounts(this.state.viewers, return_array)
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
        // const e5s = Object.keys(this.props.app_state.alias_bucket)
        // e5s.forEach(e5 => {
        //     const accounts = Object.keys(this.props.app_state.alias_bucket[e5])
        //     accounts.forEach(account_id => {
        //         const alias = this.props.app_state.alias_bucket[e5][account_id]
        //         if(!added_aliases.includes(alias) && alias.startsWith(typed_name.toLowerCase())){
        //             aliases.push({'id':account_id,'label':{'title':account_id, 'details':alias, 'size':'s'}})
        //         }
        //     });
        // });
        const e5 = this.state.e5
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
        var obj = this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)
        return (obj[contact['id']] == null ? ((contact['address'].toString()).substring(0, 9) + "...") : obj[contact['id']])
    }

    when_suggestion_clicked(item, pos, target_type){
        if(target_type == 'participants'){
            this.setState({participant_id: item['id']})
        }
        else if(target_type == 'viewer'){
            this.setState({viewer: item['id']})
        }
    }










    render_enter_schedule_time_part(){
        var size = this.props.size
        if(size == 's'){
            return(
                <div>
                    {this.render_pick_starting_time_calendar()}
                    {this.render_detail_item('0')}
                    {this.render_pick_ending_time_calendar()}
                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_pick_starting_time_calendar()}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_pick_ending_time_calendar()}
                    </div>
                </div>
                
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_pick_starting_time_calendar()}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_pick_ending_time_calendar()}
                    </div>
                </div>
                
            )
        }
    }

    render_pick_starting_time_calendar(){
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['c311ba']/* Poll Start Time */, 'details':this.props.app_state.loc['c311bb']/* Set the starting time after which votes can be submitted to the poll. */, 'size':'l'})}
                {this.render_detail_item('10', {'text':this.props.app_state.loc['c311bf']/* 'Events logged before the time set below are rendered invalid during consensus.*/, 'textsize':'11px', 'font':this.props.app_state.font})}
                {this.render_detail_item('0')}

                {this.render_detail_item('3', {'details':this.props.app_state.loc['c311bc']/* 'In: ' */+this.get_time_diff(this.state.start_time - Date.now()/1000), 'title':''+(new Date(this.state.start_time * 1000)), 'size':'l'})}

                <div style={{height:10}}/>
                <ThemeProvider theme={createTheme({ palette: { mode: this.props.theme['calendar_color'], }, })}>
                    <CssBaseline />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <StaticDateTimePicker orientation="portrait" onChange={(newValue) => this.when_start_time_set(newValue)}/>
                    </LocalizationProvider>
                </ThemeProvider>
                <div style={{height:10}}/>
            </div>
        )
    }

    when_start_time_set(value){
        const selectedDate = value instanceof Date ? value : new Date(value);
        var timeInSeconds = Math.floor(selectedDate.getTime() / 1000);
        if(timeInSeconds > Date.now() + 600){
            timeInSeconds = Date.now() + 600
        }
        if(this.state.end_time < timeInSeconds){
            this.setState({end_time: timeInSeconds + 600})
        }
        this.setState({start_time: timeInSeconds})
    }

    render_pick_ending_time_calendar(){
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['c311bd']/* Poll Ending Time. */, 'details':this.props.app_state.loc['c311be']/* Set the time after which no new votes can be submitted to the poll. */, 'size':'l'})}
                
                {this.render_detail_item('10', {'text':this.props.app_state.loc['c311bg']/* 'Events logged after the time set below are discarded during consensus.*/, 'textsize':'11px', 'font':this.props.app_state.font})}
                {this.render_detail_item('0')}

                {this.render_detail_item('3', {'details':this.props.app_state.loc['c311bc']/* 'In: ' */+this.get_time_diff(this.state.end_time - Date.now()/1000), 'title':''+(new Date(this.state.end_time * 1000)), 'size':'l'})}

                <div style={{height:10}}/>
                <ThemeProvider theme={createTheme({ palette: { mode: this.props.theme['calendar_color'], }, })}>
                    <CssBaseline />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <StaticDateTimePicker orientation="portrait" onChange={(newValue) => this.when_end_time_set(newValue)}/>
                    </LocalizationProvider>
                </ThemeProvider>
                <div style={{height:10}}/>
            </div>
        )
    }

    when_end_time_set(value){
        const selectedDate = value instanceof Date ? value : new Date(value);
        var timeInSeconds = Math.floor(selectedDate.getTime() / 1000);
        if(timeInSeconds > Date.now() + 600){
            timeInSeconds = Date.now() + 600
        }
        if(this.state.start_time > timeInSeconds){
            timeInSeconds = this.state.start_time + 1200
        }
        this.setState({end_time: timeInSeconds})
    }








    render_enter_candidates_part(){
        var size = this.props.size
        if(size == 's'){
            return(
                <div>
                    {this.render_pick_candidates_parts()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_pick_candidates_parts()}
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
                        {this.render_pick_candidates_parts()}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_empty_views(3)}
                    </div>
                </div>
                
            )
        }
    }

    render_pick_candidates_parts(){
        var winner_text = this.state.winner_count == 0 ? '000' : this.state.winner_count
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['c311bi']/* Poll Targeted Winners. */, 'details':this.props.app_state.loc['c311bj']/* Specify the number of winners for the poll.*/, 'size':'l'})}
                <div style={{height:10}}/>

                {this.render_detail_item('4', {'text':winner_text.toString(), 'textsize':'13px', 'font':this.props.app_state.font})}

                <NumberPicker clip_number={this.props.app_state.clip_number} font={this.props.app_state.font} number_limit={999} when_number_picker_value_changed={this.when_winner_count.bind(this)} theme={this.props.theme} power_limit={9} pick_with_text_area={true} text_area_hint={'1'}/>

                {this.show_consensus_type_message()}

                {this.render_detail_item('0')}

                {this.render_detail_item('3', {'title':this.props.app_state.loc['c311bl']/* Poll Candidates. */, 'details':this.props.app_state.loc['c311bm']/* Specify the candidates for the poll. */, 'size':'l'})}
                <div style={{height:10}}/>

                <TextInput font={this.props.app_state.font} height={30} placeholder={this.props.app_state.loc['c311bn']/* Name... */} when_text_input_field_changed={this.when_candidate_input_field_changed.bind(this)} text={this.state.candidate} theme={this.props.theme}/>

                <div style={{height: 10}}/>
                <div style={{'padding': '5px'}} onClick={() => this.when_add_candidate_button_tapped()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['c311bo']/* Add Candidate. */, 'action':''})}
                </div>
                <div style={{height: 10}}/>
                {this.render_added_candidates()}
            </div>
        )
    }

    show_consensus_type_message(){
        var text = this.props.app_state.loc['c311bv']/* instant-runoff voting shall be used. */
        if(this.state.winner_count > 1){
            text = this.props.app_state.loc['c311bu']/* single transferrable vote (propotinal-ranked choice voting) shall be used. */
        }
        if(this.state.winner_count == 0) return;

        return(
            <div>
                {this.render_detail_item('10', {'text':text, 'textsize':'11px', 'font':this.props.app_state.font})}
            </div>
        )
    }

    when_winner_count(number){
        this.setState({winner_count: parseInt(number)})
    }

    when_candidate_input_field_changed(text){
        this.setState({candidate: text})
    }

    when_add_candidate_button_tapped(){
        var candidate = this.state.candidate.trim()
        const includes = this.state.candidates.find(e => e['name'] === candidate)
        
        var id = makeid(2)
        while(this.state.candidates.find(e => e['id'] === id) != null){
            id = makeid(2)
        }

        if(candidate == ''){
            this.props.notify(this.props.app_state.loc['128'], 1400)
        }
        else if(this.hasWhiteSpace(candidate)){
            this.props.notify(this.props.app_state.loc['129'], 1400)
        }
        else if(candidate.length < 3){
            this.props.notify(this.props.app_state.loc['c311bp']/* 'That name is too short.' */, 1400)
        }
        else if(includes != null){
            this.props.notify(this.props.app_state.loc['c311bq']/* 'Youve already added that candidate.' */, 2400)
        }
        else if(this.state.candidates.length == this.props.app_state.max_candidates_count){
            this.props.notify(this.props.app_state.loc['c311br']/* 'You cant use more than $ candidates.' */.replace('$', this.props.app_state.max_candidates_count), 5400)
        }
        else{
            var clone = this.state.candidates.slice()
            clone.push({'name': candidate, 'id':id})
            this.setState({candidates: clone, candidate:''})
        }
    }

    render_added_candidates(){
        var items = [].concat(this.state.candidates)
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
                            <SwipeableList>
                                <SwipeableListItem
                                    swipeLeft={{
                                    content: <p style={{'color': this.props.theme['primary_text_color']}}>{this.props.app_state.loc['2751']/* Delete */}</p>,
                                    action: () =>this.when_added_candidate_tapped(item, index)
                                    }}>
                                    <div style={{width:'100%', 'background-color':this.props.theme['send_receive_ether_background_color']}}>
                                        <li style={{'padding': '3px'}}>
                                            {this.render_detail_item('4', {'text':`${index+1}. ${item['name']}`, 'textsize':'13px', 'font':this.props.app_state.font})}
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

    when_added_candidate_tapped(item, index){
        var cloned_array = this.state.candidates.slice()
        if (index > -1) { // only splice array when item is found
            cloned_array.splice(index, 1); // 2nd parameter means remove one item only
        }
        this.setState({candidates: cloned_array})
    }








    render_access_rights_part(){
        var size = this.props.size
        if(size == 's'){
            return(
                <div>
                    {this.render_set_access_rights_parts()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_set_access_rights_parts()}
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
                        {this.render_set_access_rights_parts()}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_empty_views(3)}
                    </div>
                </div>
                
            )
        }
    }

    render_set_access_rights_parts(){
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['c311cg']/* Poll Accessibility. */, 'details':this.props.app_state.loc['c311ch']/* Specify which accounts can view the poll if it is a private poll. */, 'size':'l'})}
                <div style={{height:10}}/>

                <TextInput font={this.props.app_state.font} height={60} placeholder={this.props.app_state.loc['c311ci']/* Alias or Account ID... */} when_text_input_field_changed={this.when_viewer_input_field_changed.bind(this)} text={this.state.viewer} theme={this.props.theme}/>
                {this.render_detail_item('10', {'text':this.props.app_state.loc['c311cm']/* You can specify multiple accounts at once separated by commas, eg ( E25:1002,E25:1204... ) */, 'textsize':'11px', 'font':this.props.app_state.font})}
                {this.load_account_suggestions('viewer')}

                <div style={{height: 10}}/>
                <div style={{'padding': '5px'}} onClick={() => this.when_add_viewer_button_tapped()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['c311cj']/* Add viewer. */, 'action':''})}
                </div>
                <div style={{height: 20}}/>
                {this.render_added_viewers()}
            </div>
        )
    }

    when_viewer_input_field_changed(text){
        this.setState({viewer: text})
    }

    when_add_viewer_button_tapped(){
        var typed_text = this.state.viewer.trim()
        if(typed_text.includes(',')){
            this.add_multiple_viewers(typed_text)
            return;
        }
        var participant_id = this.get_typed_alias_id(typed_text)
        var participant_e5 = isNaN(typed_text) ? this.get_alias_e5(typed_text) : this.state.e5
        var final_value = participant_e5+':'+participant_id
        var participants_clone = this.state.viewers.slice()
        if(typed_text == ''){
            this.props.notify(this.props.app_state.loc['c311cs']/* Type something */, 3600)
        }
        else if(isNaN(participant_id) || parseInt(participant_id) < 1000 || participant_id == ''){
            this.props.notify(this.props.app_state.loc['c311i']/* That account is invalid. */, 3600)
        }
        else if(participants_clone.includes(final_value)){
            this.props.notify(this.props.app_state.loc['c311j']/* 'Youve already added that account.' */, 4600)
        }
        else{
            participants_clone.push(final_value)
            this.setState({viewers: participants_clone, viewer:''});
        }
    }

    add_multiple_viewers(data){
        var entities = data.split(',')
        var final_obj = []
        var account_entries = 0
        var participants_clone = this.state.viewers.slice()
        entities.forEach(account_data => {
            if(account_data != null && account_data != ''){
                var data_point_array = account_data.split(':')
                var e5 = ''
                var account = ''
                if(data_point_array.length == 2){
                    e5 = data_point_array[0].trim().replace(/[^a-zA-Z0-9 ]/g, '')
                    account = data_point_array[1].trim().replace(/[^a-zA-Z0-9 ]/g, '')
                }
                else if(data_point_array.length == 1){
                    e5 = this.state.e5
                    account = data_point_array[0].trim().replace(/[^a-zA-Z0-9 ]/g, '')
                }
                if(e5 != '' && account != ''){
                    if(this.props.app_state.e5s['data'].includes(e5) && this.props.app_state.e5s[e5].active == true){
                        if(!isNaN(account) && parseInt(account) < 10**16){
                            var final_value = e5+':'+parseInt(account)
                            if(!participants_clone.includes(final_value) && !final_obj.includes(final_value)){
                                final_obj.push(final_value)
                                account_entries++
                            }
                        }
                    }
                }
            }
        });
        if(account_entries == 0){
            this.props.notify(this.props.app_state.loc['c311cn']/* 'No accounts added.' */, 1200)
        }else{
            participants_clone = participants_clone.concat(final_obj)
            this.setState({viewers: participants_clone, viewer:''});
            this.props.notify(this.props.app_state.loc['c311co']/* '$ accounts added.' */.replace('$', account_entries), 1200)
        }
    }

    render_added_viewers(){
        var items = [].concat(this.state.viewers)
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
                        {items.map((item, index) => (
                            <SwipeableList>
                                <SwipeableListItem
                                    swipeLeft={{
                                    content: <p style={{'color': this.props.theme['primary_text_color']}}>{this.props.app_state.loc['2751']/* Delete */}</p>,
                                    action: () =>this.when_added_viewer_tapped(item, index)
                                    }}>
                                    <div style={{width:'100%', 'background-color':this.props.theme['send_receive_ether_background_color']}}>
                                        <li style={{'padding': '3px'}}>
                                        {this.render_detail_item('3', {'title':' • '+this.get_data(item).id, 'details':this.get_senders_name(item), 'size':'l', 'title_image':this.props.app_state.e5s[this.get_data(item).e5].e5_img})}
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

    when_added_viewer_tapped(item, index){
        var cloned_array = this.state.viewers.slice()
        if (index > -1) { // only splice array when item is found
            cloned_array.splice(index, 1); // 2nd parameter means remove one item only
        }
        this.setState({viewers: cloned_array})
    }






    finish_creating_object(){
        var index_tags = this.state.entered_indexing_tags
        var title = this.state.entered_title_text
        var winner_count = this.state.winner_count
        var candidates = this.state.candidates

        if(index_tags.length < 3){
            this.props.notify(this.props.app_state.loc['270'], 4700)
        }
        else if(title == ''){
            this.props.notify(this.props.app_state.loc['311'], 4700)
        }
        else if(title.length > this.props.app_state.title_size){
            this.props.notify(this.props.app_state.loc['272'], 4700)
        }
        else if(winner_count == 0){
            this.props.notify(this.props.app_state.loc['c311bs']/* Your targeted winners cannot be 0 */, 4700)
        }
        else if(candidates.length < 2 ){
            this.props.notify(this.props.app_state.loc['c311bw']/* A minimum of 2 candidates is required for any poll. */, 4700)
        }
        else if(candidates.length <= winner_count){
            this.props.notify(this.props.app_state.loc['c311bt']/* The number of targeted winners cannot be equal or greater than your candidates. */, 9700)
        }
        else{
            var me = this;
            setTimeout(function() {
                me.props.when_add_new_object_to_stack(me.state)
        
                me.setState({ 
                    id: makeid(8), type:me.props.app_state.loc['c311a']/* 'poll' */, e5:me.props.app_state.selected_e5, get_new_job_page_tags_object: me.get_new_job_page_tags_object(), entered_tag_text: '', entered_title_text:'', entered_text:'', entered_indexing_tags:[], entered_text_objects:[], entered_image_objects:[], entered_objects:[], content_channeling_setting: me.props.app_state.content_channeling, device_language_setting: me.props.app_state.device_language, device_country: me.props.app_state.device_country, device_region: me.props.app_state.device_region, edit_text_item_pos:-1, get_content_channeling_object:me.get_content_channeling_object(), entered_pdf_objects:[], markdown:'', participant_id:'', participants:[], json_files:[], csv_files:[],
                    start_time:(new Date().getTime()/1000)+7200,
                    end_time:(new Date().getTime()/1000)+64800,
                    winner_count:1, candidate:'', candidates:[], poll_e5s:[me.props.app_state.selected_e5]
                })
            }, (1 * 1000));
            
            this.props.notify(this.props.app_state.loc['18'], 1700);
            
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
                                    <img alt="" src={this.props.app_state.theme['letter']} style={{height:30 ,width:'auto'}} />
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
        return(
            <div>
                <ViewGroups graph_type={this.props.app_state.graph_type} font={this.props.app_state.font} item_id={item_id} object_data={object_data} theme={this.props.theme} add_indexing_tag_for_new_job={this.add_indexing_tag_for_new_job.bind(this)} delete_entered_tag={this.delete_entered_tag_word.bind(this)} when_add_text_button_tapped={this.when_add_text_button_tapped.bind(this)} width={this.props.app_state.width} show_images={this.show_images.bind(this)}  />
            </div>
        )

    }


    show_images(){

    }

    get_number_width(number){
        var last_two_digits = number.toString().slice(0, 1)+'0';
        if(number > 10){
            last_two_digits = number.toString().slice(0, 2);
        }
        return last_two_digits+'%'
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




export default NewPollPage;