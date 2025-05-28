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

var bigInt = require("big-integer");

function bgN(number, power) {
  return bigInt((number+"e"+power)).toString();
}

function number_with_commas(x) {
    if(x == null) x = '';
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

class CalculatePollResult extends Component {
    
    state = {
        selected: 0, id:makeid(8), poll_object:null, get_title_tags_object:this.get_title_tags_object(), e5: this.props.app_state.selected_e5, json_files:[],
        csv_files:[], nitro:''
    };

    set_data(object){
        this.setState({poll_object: object})
    }

    constructor(props) {
        super(props);
        this.csv_input = React.createRef()
        this.json_input = React.createRef()
    }

    get_title_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e',this.props.app_state.loc['3074']/* 'tally-poll' */], [1]
            ],
        };
    }

    render(){
        return(
            <div style={{'padding':'10px 15px 0px 15px'}}>
                <div className="row" style={{'width':'102%'}}>
                    <div className="col-11" style={{'padding': '0px 0px 0px 10px'}}>
                        <Tags font={this.props.app_state.font} page_tags_object={this.state.get_title_tags_object} tag_size={'l'} when_tags_updated={this.when_get_title_tags_object_updated.bind(this)} theme={this.props.theme}/>
                    </div>
                    <div className="col-1" style={{'padding': '0px 0px 0px 0px'}}>
                        <div className="text-end" style={{'padding': '0px 10px 0px 0px'}} >
                            <img alt="" className="text-end" onClick={()=>this.finish_vote_poll()} src={this.props.theme['close']} style={{height:36, width:'auto'}} />
                        </div>
                    </div>
                </div>

                {this.render_everything()}
            </div>
        )
    }


    when_get_title_tags_object_updated(tag_obj){
        this.setState({get_title_tags_object: tag_obj})
    }


    render_everything(){
        if(this.state.poll_object == null) return;

        var size = this.props.size
        if(size == 's'){
            return(
                <div>
                    {this.render_poll_calculation_details()}
                    {this.render_detail_item('0')}
                    {this.render_poll_results()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_poll_calculation_details()}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_poll_results()}
                    </div>
                </div>
                
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_poll_calculation_details()}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_poll_results()}
                    </div>
                </div>
                
            )
        }
    }

    render_poll_calculation_details(){
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['3074a']/* 'Tally Poll Results.' */, 'details':this.props.app_state.loc['3074b']/* 'Count all the valid votes that have been recorded in this poll and calculate the results.' */, 'size':'l'})}
                <div style={{height:10}}/>
                {this.render_poll_object()}
                {this.render_detail_item('0')}

                {this.render_detail_item('3', {'title':this.props.app_state.loc['3074c']/* 'Tally via Nitro.' */, 'details':this.props.app_state.loc['3074d']/* 'Use a nitro node to calculate the current results of your poll for you.' */, 'size':'l'})}
                <div style={{height:20}}/>
                <TextInput font={this.props.app_state.font} height={30} placeholder={this.props.app_state.loc['3074i']/* Filter... */} when_text_input_field_changed={this.when_nitro_input_field_changed.bind(this)} text={this.state.nitro} theme={this.props.theme}/>
                {/* <div style={{height:10}}/> */}
                {/* {this.load_my_nitro_objects_to_select()} */}
                <div style={{height:10}}/>
                {this.load_selected_nitro_object_details()}
                {this.render_file_pickers_if_needed()}
                {this.render_calculate_poll_button()}
            </div>
        )
    }

    render_poll_object(){
        var object = this.state.poll_object
        var background_color = this.props.theme['card_background_color']
        var card_shadow_color = this.props.theme['card_shadow_color']
        var item = this.format_poll_item(object)
        var opacity = 1.0
        return(
            <div  style={{height:'auto', opacity:opacity, width:'100%', 'background-color': background_color, 'border-radius': '15px','padding':'5px 5px 0px 0px', 'box-shadow': '0px 0px 1px 2px '+card_shadow_color}}>
                <div style={{'padding': '0px 0px 0px 5px'}}>
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

    format_poll_item(object){
        var tags = object['ipfs'] == null ? ['Post'] : [].concat(object['ipfs'].entered_indexing_tags)
        var title = object['ipfs'] == null ? 'Post ID' : object['ipfs'].entered_title_text
        var age = object['event'] == null ? 0 : object['event'].returnValues.p7
        var time = object['event'] == null ? 0 : object['event'].returnValues.p6
        var sender = this.get_senders_name(object['event'].returnValues.p5, object);
        return {
            'tags':{'active_tags':tags, 'index_option':'indexed', 'selected_tags':this.props.app_state.explore_section_tags, 'when_tapped':'select_deselect_tag'},
            'id':{'title':' • '+object['id']+sender, 'details':title, 'size':'l', 'title_image':this.props.app_state.e5s[object['e5']].e5_img, 'border_radius':'0%'},
            'age':{'style':'s', 'title':'Block Number', 'subtitle':'??', 'barwidth':this.get_number_width(age), 'number':` ${number_with_commas(age)}`, 'barcolor':'', 'relativepower':`${this.get_time_difference(time)}`, },
            'min':{'details':object['e5']+' • '+object['id']+sender, 'title':title, 'size':'l', 'border_radius':'0%'}
        }
    }

    when_nitro_input_field_changed(text){
        this.setState({nitro: text})
    }



    load_my_nitro_objects_to_select(){
        var items = this.load_active_nitros()
        var items2 = [0, 1, 2]
        if(items.length == 0){
            return(
                <div style={{'margin':'3px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                    {items2.map(() => (
                        <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}}>
                            {this.render_empty_horizontal_list_item()}
                        </li>
                    ))}
                </ul>
            </div>
            )
        }
        return(
            <div style={{'margin':'3px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                    {items.map((item, index) => (
                        <li style={{'display': 'inline-block', 'margin': '0px 2px 1px 2px', '-ms-overflow-style':'none'}} onClick={()=>this.when_nitro_item_clicked(item)}>
                            {this.render_nitro_item(item)}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    render_empty_horizontal_list_item2(){
        var background_color = this.props.theme['view_group_card_item_background']
        return(
            <div>
                <div style={{height:43, width:127, 'background-color': background_color, 'border-radius': '8px','padding':'10px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                    <div style={{'margin':'0px 0px 0px 0px'}}>
                        <img alt="" src={this.props.app_state.theme['letter']} style={{height:20 ,width:'auto'}} />
                    </div>
                </div>
            </div>
        )
    }

    load_active_nitros(){
        var typed_text = this.state.nitro.trim()
        var my_bought_nitros = []
        var all_nitros = this.get_all_sorted_objects(this.props.app_state.created_nitros)
        for(var i=0; i<all_nitros.length; i++){
            var obj = all_nitros[i]
            var state = this.props.app_state.nitro_node_details[obj['e5_id']]
            var all_e5s_are_supported = this.allElementsAppearOnce(state['tracked_E5s'], this.state.poll_object['ipfs'].poll_e5s)
            if(state != null && state != 'unavailable' && all_e5s_are_supported == true){
                if(typed_text == ''){
                    my_bought_nitros.push(obj)
                }else{
                    var title = obj['ipfs'].entered_title_text
                    var id = obj['id']
                    if(title.toLowerCase().includes(typed_text.toLowerCase()) || id.toString().includes(typed_text)){
                        my_bought_nitros.push(obj)
                    }
                }
                
            }
        }
        return my_bought_nitros
    }

    allElementsAppearOnce(arr1, arr2) {
        const countMap = {};
        for (const el of arr2) {
            countMap[el] = (countMap[el] || 0) + 1;
        }
        return arr1.every(el => countMap[el] >= 1);
    }

    render_nitro_item(item){
        var object = item
        var default_image = this.props.app_state.static_assets['end_img']
        var image = object['ipfs'] == null ? default_image : (object['ipfs'].album_art == null ? default_image : object['ipfs'].album_art)
        var title = item['e5']+' • '+item['id']
        var details = object['ipfs'] == null ? 'Nitropost ID' : start_and_end(object['ipfs'].entered_title_text)
        if(this.state.selected_nitro_item == item['e5_id']){
            return(
                <div>
                    {this.render_detail_item('12', {'title':title, 'image':image,'details':details, 'size':'s', 'border_radius':'9px'})}
                    <div style={{height:'1px', 'background-color':this.props.app_state.theme['line_color'], 'margin': '3px 5px 0px 5px'}}/>
                </div>
            )
        }else{
            return(
                <div>
                    {this.render_detail_item('12', {'title':title, 'image':image, 'details':details, 'size':'s', 'border_radius':'9px'})}
                </div>
            )
        }
    }

    when_nitro_item_clicked(item){
        this.setState({selected_nitro_item: item['e5_id'], selected_nitro_object: item})
        this.props.load_nitro_node_details(item, false)
    }

    load_selected_nitro_object_details(){
        var object = this.state.selected_nitro_object
        if(object == null){
            return(
                <div>
                    {this.render_empty_views(2)}
                </div>
            )
        }
        var node_details = this.props.app_state.nitro_node_details[object['e5_id']]
        if(node_details == null){
            return(
                <div>
                    {this.render_detail_item('4',{'font':this.props.app_state.font, 'textsize':'15px','text':this.props.app_state.loc['c2527f']/* 'Loading Node Details...' */})}
                </div>
            )
        }
        else if(node_details == 'unavailable'){
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['c2527g']/* 'Node Unavailable.' */, 'details':this.props.app_state.loc['c2527h']/* 'The node is unavailable or down.' */, 'size':'l'})}
                </div>
            )
        }
        var e5_data = node_details['e5_data']
        var data = []
        var is_fully_synched = true;
        this.state.poll_object['ipfs'].poll_e5s.forEach(e5 => {
            if(e5_data[e5] != null){
                var height = e5_data[e5]['current_block']['E52e4']
                if(height == null){
                    height = 0
                }
                var block_height = this.props.app_state.number_of_blocks[e5] == null ? 0 : this.props.app_state.number_of_blocks[e5]
                var percentage = this.round_off((height / block_height) * 100)
                if(percentage >= 100){
                    percentage = 99.99
                }
                data.push({'e5':e5, 'block_height':block_height, 'height':height, 'percentage':percentage})
                if(percentage < 95){
                    is_fully_synched = false;
                }
            }
        });
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['3074j']/* 'Node syncronization level.' */, 'details':this.props.app_state.loc['3074k']/* 'The synchronization level for your preferred nitro node for each E5 required.' */, 'size':'l'})}
                <div style={{height:10}}/>
                <div>
                    {data.map((item, index) => (
                        <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px'}}>
                            {this.render_detail_item('2', { 'style':'l', 'title':item['e5'], 'subtitle':this.format_power_figure(item['percentage']), 'barwidth':item['percentage']+'%', 'number':item['percentage']+'%', 'barcolor':'#606060', 'relativepower':this.props.app_state.loc['1881']/* 'proportion' */, })}
                        </div>
                    ))}
                </div>
                {this.render_fully_synced_message(is_fully_synched)}
            </div>
        )
    }

    round_off(float_number){
        return (Math.round(float_number * 100) / 100)
    }

    render_fully_synced_message(is_fully_synched){
        if(is_fully_synched == true){
            return(
                <div>
                    <div style={{height:10}}/>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['3074l']/* 'Node Unsynchronized.' */, 'details':this.props.app_state.loc['3074m']/* 'The node youve selected isnt fully synched with one of the E5s youre using.' */, 'size':'l'})}
                </div>
            )
        }
    }







    render_file_pickers_if_needed(){
        return(
            <div>
                {this.render_detail_item('0')}
                {this.render_csv_files_if_any(this.state.poll_object)}
                {this.render_json_files_if_any(this.state.poll_object)}
            </div>
        )
    }

    render_csv_files_if_any(object){
        var state = object['ipfs']
        if(state.csv_files != null && state.csv_files.length > 0){
            return(
                <div>
                    {this.render_detail_item('4', {'text':this.props.app_state.loc['3074e']/* 'Youll need to reupload the following csv files in their original state.*/, 'textsize':'13px', 'font':this.props.app_state.font})}
                    <div style={{height: 10}}/>
                    {this.render_csv_files(state.csv_files)}
                    <div style={{height:10}}/>
                    <div onClick={() => this.call_input_function('csv')}>
                        {this.render_detail_item('5', {'text':this.props.app_state.loc['c311q']/* 'Select CSV File' */, 'action':''})}
                    </div>
                    <div style={{height:10}}/>
                    {this.render_valid_csv_files_count_message(object)}
                </div>
            )
        }
    }

    render_valid_csv_files_count_message(object){
        var files = object['ipfs'].csv_files
        var valid_files = 0
        this.state.csv_files.forEach(csv_file_obj => {
            const includes = files.find(e => e['data'].data === csv_file_obj['data'].data)
            if(includes != null){
                valid_files++
            }
        });
        var message = this.props.app_state.loc['3074h']/* '$ out of % uploaded files are valid.' */
        message.replace('$', valid_files)
        message.replace('%', files.length)
        return(
            <div>
                {this.render_detail_item('4', {'text':message, 'textsize':'13px', 'font':this.props.app_state.font})}
            </div>
        )
    }

    render_csv_files(items){
        return(
            <div style={{'margin':'3px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent', height:48}}>
                <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                    {items.map((item, index) => (
                        <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}}>
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
        var opacity = this.is_file_valid(item, type) ? 1.0 : 0.6
        return(
            <div style={{'opacity': opacity}}>
                {this.render_detail_item('8', {'details':details,'title':title, 'size':size, 'image':thumbnail, 'border_radius':'15%'})}
            </div>
        )
    }

    is_file_valid(item, type){
        var object = this.state.poll_object
        var files = type == 'csv' ? object['ipfs'].csv_files : object['ipfs'].json_files
        const includes = files.find(e => e['data'].data === item['data'].data)
        if(includes != null){
            return true
        }else{
            return false
        }
    }

    render_json_files_if_any(object){
        var state = object['ipfs']
        if(state.json_files != null && state.json_files.length > 0){
            return(
                <div>
                    {this.render_detail_item('4', {'text':this.props.app_state.loc['3074f']/* 'Youll need to reupload the following json files in their original state. */, 'textsize':'13px', 'font':this.props.app_state.font})}
                    <div style={{height: 10}}/>
                    {this.render_json_files(state.json_files)}
                    <div style={{height:10}}/>
                    <div onClick={() => this.call_input_function('json')}>
                        {this.render_detail_item('5', {'text':this.props.app_state.loc['c311r']/* 'Select JSON File.' */, 'action':''})}
                    </div>
                    <div style={{height:10}}/>
                    {this.render_valid_json_files_count_message(object)}
                </div>
            )
        }
    }

    render_valid_json_files_count_message(object){
        var files = object['ipfs'].json_files
        var valid_files = 0
        this.state.json_files.forEach(json_file_obj => {
            const includes = files.find(e => e['data'].data === json_file_obj['data'].data)
            if(includes != null){
                valid_files++
            }
        });
        var message = this.props.app_state.loc['3074h']/* '$ out of % uploaded files are valid.' */
        message.replace('$', valid_files)
        message.replace('%', files.length)
        return(
            <div>
                {this.render_detail_item('4', {'text':message, 'textsize':'13px', 'font':this.props.app_state.font})}
            </div>
        )
    }

    render_json_files(items){
        return(
            <div style={{'margin':'3px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent', height:48}}>
                <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                    {items.map((item, index) => (
                        <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}}>
                            {this.render_file(item, index, true, 'json')}
                        </li>
                    ))}
                </ul>
            </div>
        )
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
                        var voter_data = await this.props.process_json_file_object(participants_data, true)
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
                    var voter_data = await this.props.process_csv_file_data(participants_data, true)
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






    render_calculate_poll_button(){
        var last_time = this.state.selected_nitro_item == null ? 0 : (this.props.app_state.count_poll_times[this.state.selected_nitro_item] == null ? 0 : this.props.app_state.count_poll_times[this.state.selected_nitro_item])
        var now = Date.now()
        var opacity = 1.0
        if(last_time > (now-240_000)){
            opacity = 0.6
        }
        return(
            <div>
                {this.render_line_if_file_picker_is_showing()}
                {this.render_detail_item('3', {'title':this.props.app_state.loc['3074o']/* 'Start Vote Count.' */, 'details':this.props.app_state.loc['3074p']/* 'Start the vote counting process with your selected E5.' */, 'size':'l'})}
                <div style={{height: 10}}/>
                <div style={{'padding': '5px', 'opacity':opacity}} onClick={() => this.when_start_count_tapped()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['3074n']/* Start Count. */, 'action':''})}
                </div>
            </div>
        )
    }

    render_line_if_file_picker_is_showing(){
        var state = this.state.poll_object['ipfs']
        if(state.csv_files.length > 0 || state.json_files.length > 0){
            return(
                <div>
                    {this.render_detail_item('0')}
                </div>
            )
        }
    }

    when_start_count_tapped(){
        var last_time = this.props.app_state.count_poll_times[this.state.poll_object['e5_id']] == null ? 0 : this.props.app_state.count_poll_times[this.state.poll_object['e5_id']]
        var now = Date.now()
        if(last_time > (now-240_000)){
            this.props.notify(this.props.app_state.loc['3074bp']/* Wait a bit. */, 1900)
            return;
        }

        var nitros = this.load_active_nitros()
        var selected_nitro_objects = []
        if(nitros < 23){
            selected_nitro_objects = nitros
        }else{
            selected_nitro_objects = this.getRandomValues(nitros, 23)
        }

        const final_csv_files = []
        const final_json_files = []
        var missing_files = 0
        const csv_files = this.state.csv_files
        const json_files = this.state.json_files
        const t = this.state.poll_object['ipfs']

        t.csv_files.forEach(csv_file_obj => {
            const includes = csv_files.find(e => e['data'].data === csv_file_obj['data'].data)
            if(includes != null){
                final_csv_files.push(includes)
            }else{
                missing_files++
            }
        });
        t.json_files.forEach(json_file_obj => {
            const includes = json_files.find(e => e['data'].data === json_file_obj['data'].data)
            if(includes != null){
                final_json_files.push(includes)
            }else{
                missing_files++
            }
        });

        if(missing_files != 0){
            this.props.notify(this.props.app_state.loc['3074q']/* $ files are missing or invalid. */.replace('$', missing_files), 7000)
        }
        // else if(nitro_object == null){
        //     this.props.notify(this.props.app_state.loc['3074r']/* You need to select a nitro node first. */, 4000)
        // }
        else{
            const get_changeable_vote_tags_object = this.get_selected_item2(t.get_changeable_vote_tags_object, 'e') == 1
            const static_poll_data = {
                participants: t.participants, 
                json_files: this.sortByAttributeDescending(t.json_files, 'name'), 
                csv_files: this.sortByAttributeDescending(t.csv_files, 'name'), 
                start_time: t.start_time,
                end_time: t.end_time,
                candidates: t.candidates,
                winner_count: t.winner_count,
                poll_e5s: t.poll_e5s,
                randomizer: t.randomizer,
                change_vote_enabled: get_changeable_vote_tags_object,
            }
            const poll_id = this.state.poll_object['id']
            const poll_e5 = this.state.poll_object['e5']
            const file_objects = {
                csv_files: final_csv_files,
                json_files: final_json_files
            }

            this.props.notify(this.props.app_state.loc['3074s']/* Sending the request.. */, 2000)

            this.props.count_poll_votes_and_post_results(static_poll_data, poll_id, poll_e5, file_objects, selected_nitro_objects, t)
        }
    }

    getRandomValues(array, count) {
        // Make a shallow copy to avoid modifying the original array
        const shuffled = [...array].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }






    render_poll_results(){
        return(
            <div>
                {this.load_my_used_nitro_objects()}
                {this.render_poll_result_item()}
            </div>
        )
    }

    load_my_used_nitro_objects(){
        var items = this.load_used_nitros()
        var items2 = [0, 1, 2]
        if(items.length == 0){
            return(
                <div style={{'margin':'3px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                    {items2.map(() => (
                        <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}}>
                            {this.render_empty_horizontal_list_item()}
                        </li>
                    ))}
                </ul>
            </div>
            )
        }
        return(
            <div style={{'margin':'3px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                    {items.map((item, index) => (
                        <li style={{'display': 'inline-block', 'margin': '0px 2px 1px 2px', '-ms-overflow-style':'none'}} onClick={()=>this.when_used_nitro_item_clicked(item)}>
                            {this.render_nitro_item(item)}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    load_used_nitros(){
        var results_obj = this.props.app_state.poll_consensus_results[this.state.poll_object['e5_id']]
        var used_nitro_ids = results_obj == null ? [] : Object.keys(results_obj)
        var all_nitros = this.get_all_sorted_objects(this.props.app_state.created_nitros)
        var nitro_objects_used = []
        for(var i=0; i<all_nitros.length; i++){
            var obj = all_nitros[i]
            if(used_nitro_ids.includes(obj['e5_id'])){
                nitro_objects_used.push(obj)
            }
        }
        return nitro_objects_used
    }

    when_used_nitro_item_clicked(item){
        this.setState({selected_nitro_item: item['e5_id'], selected_nitro_object: item})
    }

    render_poll_result_item(){
        var results_object = this.state.selected_nitro_object == null ? null : this.props.app_state.poll_consensus_results[this.state.poll_object['e5_id']][this.state.selected_nitro_object]
        if(results_object == null){
            return(
                <div>
                    {this.render_empty_views(3)}
                </div>
            )
        }
        var time = results_object.time
        var registered_voters = results_object.registered_voters
        var valid_vote_count = results_object.valid_vote_count
        var targeted_winners = this.state.poll_object['ipfs'].winner_count
        var consensus_snapshots = results_object.consensus_snapshots
        var elimination_snapshot = results_object.elimination_snapshot
        var vote_transfer_snapshots = results_object.vote_transfer_snapshots
        var current_winners = results_object.current_winners
        var vote_donation_snapshots = results_object.vote_donation_snapshots
        var tie_breaker = results_object.tie_breaker
        var inconclusive_ballot = results_object.inconclusive_ballot
        var quota = results_object.quota

        if(inconclusive_ballot == true){
            return (
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['3074ca']/* 'Inconclusive Poll.' */, 'details':this.props.app_state.loc['3074cb']/* 'Not enough votes have been cast to render the poll valid.' */, 'size':'l'})}
                    <div style={{height:10}}/>
                    {this.render_empty_views(2)}
                </div>
            )
        }
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['3074t']/* 'Poll Results' */, 'details':this.props.app_state.loc['3074u']/* 'As of $' */.replace('$', (''+(new Date(time)))), 'size':'l'})}
                <div style={{height:10}}/>
                {this.render_voter_count_message(registered_voters)}
                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px'}}>
                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['3074x']/* Valid Votes Counted. */, 'subtitle':this.format_power_figure(valid_vote_count), 'barwidth':this.calculate_bar_width(valid_vote_count), 'number':this.format_account_balance_figure(valid_vote_count), 'barcolor':'#606060', 'relativepower':this.props.app_state.loc['3074y']/* 'votes' */, })}

                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['3074bz']/* Quota Used. */, 'subtitle':this.format_power_figure(quota), 'barwidth':this.calculate_bar_width(quota), 'number':this.format_account_balance_figure(quota), 'barcolor':'#606060', 'relativepower':this.props.app_state.loc['3074y']/* 'votes' */, })}

                    {this.render_turnout_message(registered_voters, valid_vote_count)}
                </div>
                <div style={{height:10}}/>

                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px'}}>
                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['3074z']/* Targeted Winners. */, 'subtitle':this.format_power_figure(targeted_winners), 'barwidth':this.calculate_bar_width(targeted_winners), 'number':this.format_account_balance_figure(targeted_winners), 'barcolor':'#606060', 'relativepower':this.props.app_state.loc['3074ba']/* 'candidates' */, })}
                </div>
                <div style={{height:10}}/>

                {this.render_detail_item('3', {'title':this.props.app_state.loc['3074bb']/* '$ consensus cycles' */.replace('$', consensus_snapshots.length), 'details':this.props.app_state.loc['3074bc']/* '$ runoffs.' */.replace('$', (''+(consensus_snapshots.length - 1))), 'size':'l'})}

                {this.render_detail_item('0')}

                {this.render_detail_item('3', {'title':this.props.app_state.loc['3074bd']/* 'Counting Results.' */, 'details':this.props.app_state.loc['3074be']/* 'Below are the figures obtained at each cycle and runoff.' */, 'size':'l'})}
                <div style={{height:10}}/>
                {consensus_snapshots.map((item, index) => (
                    <div>
                        {this.render_consensus_cycle(item, elimination_snapshot[index], index, valid_vote_count, vote_transfer_snapshots[index], index == consensus_snapshots.length-1, vote_donation_snapshots[index], quota )}
                    </div>
                ))}
                {this.render_final_winners_if_voting_period_over(current_winners, time, tie_breaker)}
                
                <div style={{height: 10}}/>
                {this.calculate_consistency_metric(results_object)}

                {this.render_detail_item('0')}

                {this.render_detail_item('3', {'title':this.props.app_state.loc['3074bm']/* 'Post Result.' */, 'details':this.props.app_state.loc['3074bn']/* 'Post these results in your poll for others to see.' */, 'size':'l'})}
                <div style={{height: 10}}/>
                <div style={{'padding': '5px'}} onClick={() => this.when_record_poll_tapped()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['3074bo']/* Record Poll.. */, 'action':''})}
                </div>
            </div>
        )
    }

    render_voter_count_message(registered_voters){
        if(registered_voters != 0){
            return(
                <div>
                    <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px'}}>
                        {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['3074v']/* Number of Registered Voters. */, 'subtitle':this.format_power_figure(registered_voters), 'barwidth':this.calculate_bar_width(registered_voters), 'number':this.format_account_balance_figure(registered_voters), 'barcolor':'#606060', 'relativepower':this.props.app_state.loc['3074w']/* 'voters' */, })}
                    </div>
                    <div style={{height:10}}/>
                </div>
            )
        }
    }

    render_turnout_message(registered_voters, vote_count){
        if(registered_voters == 0) return;
        var percentage = vote_count > 0 ? this.round_off((vote_count / registered_voters) * 100) : 0
        if(percentage >= 100){
            percentage = 99.99
        }
        return(
            <div>
                {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['3074bf']/* Turnout Proprtion. */, 'subtitle':this.format_power_figure(percentage), 'barwidth':percentage+'%', 'number':percentage+'%', 'barcolor':'#606060', 'relativepower':this.props.app_state.loc['1881']/* 'proportion' */, })}
            </div>
        )
    }

    render_consensus_cycle(snapshot, eliminated_candidate, index, vote_count, vote_transfer_snapshot, is_last, vote_donation_snapshot, quota){
        var figures = []
        var candidate_index = {}
        this.state.poll_object['ipfs'].candidates.forEach(candidate => {
            candidate_index[candidate['id']] = candidate['name']
        });
        var candidate_ids = Object.keys(snapshot)

        candidate_ids.forEach(candidate_id => {
            var candidates_votes = snapshot[candidate_id]
            var percentage = candidates_votes > 0 ? this.round_off((candidates_votes / vote_count) * 100) : 0
            if(percentage >= 100){
                percentage = 99.99
            }
            var title = candidate_index[candidate_id]
            var number = number_with_commas(candidates_votes)
            if(candidates_votes >= quota){
                var donated_vote_count = vote_donation_snapshot[candidate_id]
                title = '✅ '+title
                if(donated_vote_count > 0){
                    number = number + this.props.app_state.loc['3074bu']/* ' ---> $ surplus votes donated.' */.replace('$', number_with_commas(donated_vote_count))
                }
            }
            figures.push({'name':title, 'number': number, 'votes':candidates_votes, 'surplus':donated_vote_count, 'percentage':percentage})
        });
        return(
            <div>
                {this.render_detail_item('4', {'text':this.props.app_state.loc['3074bg']/* Stage $ */.replace('$', index+1), 'textsize':'15px', 'font':this.props.app_state.font})}
                <div style={{height:10}}/>
                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px'}}>
                    {figures.map((item, index) => (
                        <div>
                            {this.render_detail_item('2', { 'style':'l', 'title':item['name'], 'subtitle':this.format_power_figure(item['votes']), 'barwidth':item['percentage']+'%', 'number':item['number'], 'barcolor':'#606060', 'relativepower':item['percentage']+'%',})}
                        </div>
                    ))}
                </div>
                <div style={{height:10}}/>
                {this.render_eliminated_candidate_data_if_not_null(eliminated_candidate, vote_transfer_snapshot, candidate_index)}
                {this.render_space_if_not_last(is_last)}
            </div>
        )
    }

    render_space_if_not_last(is_last){
        if(!is_last){
            return(
                <div>
                    <div style={{height:30}}/>
                </div>
            )
        }
    }

    render_eliminated_candidate_data_if_not_null(eliminated_candidate, vote_transfer_snapshot, candidate_index){
        if(eliminated_candidate != null){
            var receivers = Object.keys(vote_transfer_snapshot)
            var items = []
            var transferred_vote_count = 0
            receivers.forEach(candidate_recipient => {
                items.push({'name':candidate_index[candidate_recipient], 'votes_received':vote_transfer_snapshot[candidate_recipient]})
                transferred_vote_count += vote_transfer_snapshot[candidate_recipient]
            });
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['3074bi']/* $ was eliminated. */.replace('$', items['name']), 'details':this.props.app_state.loc['3074bj']/* $ votes were transferred to the following candidates. */.replace('$', number_with_commas(transferred_vote_count)), 'size':'l'})}
                    <div style={{height:10}}/>
                    <div style={{'margin':'3px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                        <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                            {items.map((item, index) => (
                                <li style={{'display': 'inline-block', 'margin': '0px 2px 1px 2px', '-ms-overflow-style':'none'}}>
                                    {this.render_detail_item('3', {'title':items['name'], 'details':this.props.app_state.loc['3074bh']/* + $ votes */.replace('$', number_with_commas(items['votes_received'])), 'size':'s'})}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )
        }
    }

    render_final_winners_if_voting_period_over(current_winners, time, tie_breaker){
        var now = time
        if(now < this.state.poll_object['ipfs'].end_time){
            return(
                <div>
                    <div style={{height:30}}/>
                </div>
            )
        }
        var items = tie_breaker != '' ? [tie_breaker] : current_winners
        var candidate_index = {}
        this.state.poll_object['ipfs'].candidates.forEach(candidate => {
            candidate_index[candidate['id']] = candidate['name']
        });
        return(
            <div>
                {this.render_detail_item('0')}
                {this.render_detail_item('3', {'title':this.props.app_state.loc['3074bk']/* 'Current Winners 🎉' */, 'details':this.props.app_state.loc['3074bl']/* 'Below are the current and final winners of the poll.' */, 'size':'l'})}
                <div style={{height:10}}/>
                <div style={{'margin':'3px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                    <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                        {items.map((item, index) => (
                            <li style={{'display': 'inline-block', 'margin': '0px 2px 1px 2px', '-ms-overflow-style':'none'}}>
                                {this.render_detail_item('4', {'text':candidate_index[item], 'textsize':'15px', 'font':this.props.app_state.font})}
                            </li>
                        ))}
                    </ul>
                </div>
                {this.render_tie_breaker_message(tie_breaker)}
                {this.render_detail_item('0')}
            </div>
        )
    }

    render_tie_breaker_message(tie_breaker){
        if(tie_breaker != ''){
            return(
                <div>
                    {this.render_detail_item('10', {'text':this.props.app_state.loc['3074bv']/* 'There was a tie, so the randomizer was used to pick the winner.' */, 'textsize':'11px', 'font':this.props.app_state.font})}
                </div>
            )
        }
    }

    calculate_consistency_metric(results_object){
        var focused_results_obj = this.props.app_state.poll_consensus_results[this.state.poll_object['e5_id']]
        var used_nitro_ids = focused_results_obj == null ? [] : Object.keys(focused_results_obj)
        if(used_nitro_ids.length < 2){
            return;
        }
        var consistency_count = 0

        var time = results_object.time
        var end_time = this.state.poll_object['ipfs'].end_time
        if(time < end_time){
            return;
        }
        
        used_nitro_ids.forEach(used_nitro_id => {
            var results_obj = this.props.app_state.poll_consensus_results[this.state.poll_object['e5_id']][used_nitro_id]
            var registered_voters = results_obj.registered_voters
            var valid_vote_count = results_obj.valid_vote_count
            var current_winners = results_obj.current_winners
            var tie_breaker = results_obj.tie_breaker
            var quota = results_obj.quota
            var tied_candidates = results_obj.tied_candidates
            var inconclusive_ballot = results_obj.inconclusive_ballot
            if(
                registered_voters == results_object.registered_voters &&
                valid_vote_count == results_object.valid_vote_count &&
                current_winners.length == results_object.current_winners.length &&
                this.allElementsAppearOnce(current_winners, results_object.current_winners) &&
                tie_breaker == results_object.tie_breaker &&
                quota == results_object.quota &&
                this.allElementsAppearOnce(tied_candidates, results_object.tied_candidates) &&
                inconclusive_ballot == results_object.inconclusive_ballot
            ){
                consistency_count++
            }
        });

        var percentage = this.round_off((consistency_count / used_nitro_ids.length) * 100)
        if(percentage >= 100){
            percentage = 100
        }

        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['3074bw']/* 'Consistency levels.' */, 'details':this.props.app_state.loc['3074bx']/* 'The similarity in results returned by the randomly selected nitros.' */, 'size':'l'})}
                <div style={{height:10}}/>
                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px'}}>
                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['3074by']/* 'Consistency proportion' */, 'subtitle':this.format_power_figure(percentage), 'barwidth':percentage+'%', 'number':percentage+'%', 'barcolor':'#606060', 'relativepower':this.props.app_state.loc['1881']/* 'proportion' */, })}
                </div>
            </div>
        )
    }




    when_record_poll_tapped(){
        var results_object = this.props.app_state.poll_consensus_results[this.state.poll_object['e5_id']]
        var obj = {
            id:this.state.id, type: this.props.app_state.loc['3074bq']/* 'poll-result' */,
            entered_indexing_tags:[this.props.app_state.loc['3074br']/* 'poll' */, this.props.app_state.loc['3074bs']/* 'result' */, this.props.app_state.loc['3074bt']/* 'post' */],
            e5:this.state.poll_object['e5'], results_object: results_object, poll_object:this.state.poll_object
        }
        this.props.add_poll_result_transaction_to_stack(obj)
        this.props.notify(this.props.app_state.loc['18']/* 'Transaction added to stack' */, 700)
    }







    get_selected_item(object, option){
        var selected_item = object[option][2][0]
        var picked_item = object[option][1][selected_item];
        return picked_item
    }

    get_selected_item2(object, option){
        return object[option][2][0]
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
        if(item_id == '8' || item_id == '7' || item_id == '8'|| item_id == '9' || item_id == '11' || item_id == '12')uploaded_data = this.props.app_state.uploaded_data
        return(
            <div>
                <ViewGroups uploaded_data={uploaded_data} graph_type={this.props.app_state.graph_type} font={this.props.app_state.font} item_id={item_id} object_data={object_data} theme={this.props.theme} width={this.props.app_state.width} />
            </div>
        )
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

    get_number_width(number){
        if(number == null) return '0%'
        var last_two_digits = number.toString().slice(0, 1)+'0';
        if(number > 10){
            last_two_digits = number.toString().slice(0, 2);
        }
        return last_two_digits+'%'
    }

}




export default CalculatePollResult;