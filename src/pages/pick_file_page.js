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

import { parseBlob } from 'music-metadata';
import { uint8ArrayToBase64 } from 'uint8array-extras';
import imageCompression from 'browser-image-compression';
import * as pdfjsLib from 'pdfjs-dist/build/pdf';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';
import media_processors from '../resources/media_processors';

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

var bigInt = require("big-integer");
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

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

class PickFilePage extends Component {
    
    state = {
        selected: 0, get_pick_file_tags_object:this.get_pick_file_tags_object('image'), function_name:'',
        selected_ecids:[], max:10000, search_text:''
    };

    get_pick_file_tags_object(type){
         return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], this.get_array(type), [1]
            ],
        };
    }

    get_array(type){
        if(type == 'image'){
            return ['e',this.props.app_state.loc['2955']/* 'image' */]
        }
        else if(type == 'audio'){
            return ['e',this.props.app_state.loc['2956']/* 'audio' */]
        }
        else if(type == 'pdf'){
            return ['e',this.props.app_state.loc['1593cd']/* 'pdf' */]
        }
        else if(type == 'zip'){
            return['e', this.props.app_state.loc['1593ed']/* 'zip' */]
        }
        else if(type == 'lyric'){
            return['e', this.props.app_state.loc['1593hb']/* 'lyric' */]
        }
        else if(type == 'subtitle'){
            return['e', this.props.app_state.loc['1593hc']/* 'subtitle' */]
        }
        else{
            return ['e', this.props.app_state.loc['2957']/* 'video' */]
        }
    }

    async set_data(type, function_name, max){
        const selected_nitro_item = this.props.app_state.my_preferred_nitro == '' ? this.props.app_state.default_nitro_e5_id : this.props.app_state.my_preferred_nitro
        const all_nitros = this.get_all_sorted_objects(this.props.app_state.created_nitros)
        const nitro_object = this.get_item_in_array2(selected_nitro_item, all_nitros)

        this.setState({type: type, get_pick_file_tags_object: this.get_pick_file_tags_object(type), function_name: function_name, max: max, selected_ecids:[], search_text:'', selected_nitro_item: selected_nitro_item})

        await this.props.load_nitro_node_details(nitro_object, false)
        await this.props.load_my_account_storage_info(nitro_object)
    }

    constructor(props) {
        super(props);
        this.image_input = React.createRef()
        this.audio_input = React.createRef()
        this.video_input = React.createRef()
        this.pdf_input = React.createRef()
        this.zip_input = React.createRef()
        this.lrc_input = React.createRef()
        this.vtt_input = React.createRef()
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

    get_item_in_array2(e5_id, object_array){
        var object = object_array.find(x => x['e5_id'] === e5_id);
        return object
    }

    render(){
        return(
            <div style={{'padding':'10px 10px 0px 10px', 'overflow-x':'hidden'}}>
                <div className="row">
                    <div className="col-11" style={{'padding': '0px 0px 0px 10px'}}>
                        <Tags font={this.props.app_state.font} page_tags_object={this.state.get_pick_file_tags_object} tag_size={'l'} when_tags_updated={this.when_get_pick_file_tags_object_updated.bind(this)} theme={this.props.theme}/>
                    </div>
                    <div className="col-1" style={{'padding': '0px 0px 0px 0px'}}>
                        <div className="text-end" style={{'padding': '0px 10px 0px 0px'}} >
                            <img className="text-end" alt="" onClick={()=>this.finish()} src={this.props.theme['close']} style={{height:36, width:'auto'}} />
                        </div>
                    </div>
                </div>

                {this.render_everything()}
            </div>
        )
    }

    when_get_pick_file_tags_object_updated(tag_obj){
        this.setState({get_pick_file_tags_object: tag_obj})
    }


    render_everything(){
        var size = this.props.app_state.size

        if(size == 's'){
            return(
                <div>
                    {this.render_everything_ui()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_everything_ui()}
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
                        {this.render_everything_ui()}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_empty_views(3)}
                    </div>
                </div>
                
            )
        }
    }


    render_everything_ui(){
        var max_size = this.get_upload_file_size_limit()
        var formatted_size = this.format_data_size(max_size)
        var fs = formatted_size['size']+' '+formatted_size['unit']

        return(
            <div>
                {this.render_detail_item('4',{'font':this.props.app_state.font, 'textsize':'14px','text':this.render_title_text().replace(/\p{Extended_Pictographic}/gu, '')})}
                <div style={{height:10}}/>

                <div className="row">
                    <div className="col-8" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_detail_item('3', {'title':this.props.app_state.loc['1593bc']/* 'File Upload Limit.' */, 'details':`~ ${fs}`, 'size':'l'})}
                    </div>
                    <div className="col-4" style={{'padding': '10px 10px 10px 10px'}}>
                        <div style={{'padding': '12px 0px 0px 0px'}}>
                            {this.render_open_options_picker_upload_button()}
                        </div>
                    </div>
                </div>
                <div style={{height:10}}/>

                <div style={{ 'margin': '5px 5px 5px 5px'}}>
                    <TextInput font={this.props.app_state.font} height={25} placeholder={this.props.app_state.loc['2961a']/* 'Filter Files...' */} when_text_input_field_changed={this.when_search_text_input_field_changed.bind(this)} text={this.state.search_text} theme={this.props.theme} />
                </div>

                <div style={{height:10}}/>

                {this.render_selected_files()}
                {this.render_detail_item('0')} 

                {this.render_uploaded_files()}
            </div>
        )
    }

    get_upload_file_size_limit(){
        var max_size = 0
        if(this.state.selected_nitro_item != null){
            var node_details = this.props.app_state.nitro_node_storage_payment_info[this.state.selected_nitro_item]
            var state = this.props.app_state.nitro_node_details[this.state.selected_nitro_item]

            if(node_details != null && node_details != 'unavailable'){
                var available_space = parseFloat(node_details['acquired_space']) - parseFloat(node_details['utilized_space'])
                max_size = (available_space * 1024 * 1024)
            }
            else if(state != null && state != 'unavailable' && state['free_default_storage'] != 0){
                const my_balance = this.props.app_state.account_balance[state['target_account_e5']]
                const minimum_balance = state['target_minimum_balance_amounts'][this.props.app_state.selected_e5] || 1
                if(my_balance != null && bigInt(my_balance).greaterOrEquals(bigInt(minimum_balance))){
                    var free_storage_amount = state['free_default_storage']
                    max_size = (free_storage_amount  * 1024 * 1024)
                }
            }
        }
        return max_size
    }

    render_open_options_picker_upload_button(){
        const opacity = this.props.app_state.file_upload_status == '' ? 1.0 : 0.5
        const text_obj = {
            '': this.props.app_state.loc['1593gj']/* 'Upload File.' */,
            'preparing': this.props.app_state.loc['1593jn']/* 'Preparing...' */,
            'uploading': this.props.app_state.loc['1593jo']/* 'Uploading..' */,
        }
        const text = text_obj[this.props.app_state.file_upload_status]
        return(
            <div>
                <input ref={this.image_input} style={{display: 'none'}} id="upload" type="file" accept =".png, .jpeg, .jpg, .gif" onChange ={this.when_image_gif_picked.bind(this)} multiple/>
                
                <input ref={this.audio_input} style={{display: 'none'}} id="upload" type="file" accept =".mp3, audio/mpeg" onChange ={this.when_audio_picked.bind(this)} multiple/>

                <input ref={this.video_input} style={{display: 'none'}} id="upload" type="file" accept =".mp4,video/mp4" /* "video/mp4, video/webm, .mp4, .webm" */ onChange ={this.when_video_picked.bind(this)} multiple/>

                <input ref={this.pdf_input} style={{display: 'none'}} id="upload" type="file" accept =".pdf" onChange ={this.when_pdf_picked.bind(this)} multiple/>

                <input ref={this.zip_input} style={{display: 'none'}} id="upload" type="file" accept =".zip" onChange ={this.when_zip_picked.bind(this)} multiple/>

                <input ref={this.lrc_input} style={{display: 'none'}} id="upload" type="file" accept =".lrc" onChange ={this.when_lrc_picked.bind(this)} multiple/>

                <input ref={this.vtt_input} style={{display: 'none'}} id="upload" type="file" accept =".vtt" onChange ={this.when_vtt_picked.bind(this)} multiple/>

                <div>
                    <div style={{'opacity':opacity}} onClick={() => this.call_input_function()}>
                        {this.render_detail_item('5', {'text':text, 'action':'', 'opacity':opacity})}
                    </div>
                </div>
            </div>
        )
    }

    call_input_function(){
        var type = this.state.type
        if(type == 'image'){
            this.image_input.current?.click()
        }
        else if(type == 'audio'){
            this.audio_input.current?.click()
        }
        else if(type == 'video'){
            this.video_input.current?.click()
        }
        else if(type == 'pdf'){
            this.pdf_input.current?.click()
        }
        else if(type == 'zip'){
            this.zip_input.current?.click()
        }
        else if(type == 'lyric'){
            this.lrc_input.current?.click()
        }
        else if(type == 'subtitle'){
            this.vtt_input.current?.click()
        }
    }

    render_small_skeleton_object(){
        const styles = {
            container: {
                position: 'relative',
                width: '100%',
                height: 60,
                borderRadius: '15px',
                overflow: 'hidden',
            },
            skeletonBox: {
                width: '100%',
                height: '100%',
                borderRadius: '15px',
            },
            centerImage: {
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 'auto',
                height: 30,
                objectFit: 'contain',
                opacity: 0.9,
            },
        };
        return(
            <div>
                <SkeletonTheme baseColor={this.props.theme['loading_base_color']} highlightColor={this.props.theme['loading_highlight_color']}>
                    <div style={styles.container}>
                        <Skeleton style={styles.skeletonBox} />
                        <img src={this.props.app_state.theme['letter']} alt="" style={styles.centerImage} />
                    </div>
                </SkeletonTheme>
            </div>
        )
    }

    when_search_text_input_field_changed(text){
        this.setState({search_text: text})
    }

    render_title_text(){
        var type = this.state.type
        if(type == 'image'){
            return this.props.app_state.loc['2958']/* 'Pick one or multiple image files from your storage.To see an image file here, you need to upload it in the stack page.' */
        }
        else if(type == 'audio'){
            var text = this.props.app_state.loc['2958']/* 'Pick one or multiple audio files from your storage.To see an audio file here, you need to upload it in the stack page.' */
            var t = text.replaceAll(this.props.app_state.loc['2955']/* image */,this.props.app_state.loc['2956']/* 'audio' */)
            return t
        }
        else if(type == 'pdf'){
            var text = this.props.app_state.loc['2958']/* 'Pick one or multiple audio files from your storage.To see an audio file here, you need to upload it in the stack page.' */
            var t = text.replaceAll(this.props.app_state.loc['2955']/* image */, this.props.app_state.loc['1593cd']/* 'pdf' */)
            t = t.replaceAll('an pdf','a pdf')
            return t
        }
        else if(type == 'zip'){
            var text = this.props.app_state.loc['2958']/* 'Pick one or multiple zip files from your storage.To see an audio file here, you need to upload it in the stack page.' */
            var t = text.replaceAll(this.props.app_state.loc['2955']/* image */,this.props.app_state.loc['1593ed']/* 'zip' */)
            t = t.replaceAll('an zip','a zip')
            return t
        }
        else if(type == 'lyric'){
            var text = this.props.app_state.loc['2958']/* 'Pick one or multiple lyric files from your storage.To see an lyric file here, you need to upload it in the stack page.' */
            var t = text.replaceAll(this.props.app_state.loc['2955']/* image */,this.props.app_state.loc['1593hb']/* 'lyric' */)
            t = t.replaceAll('an lyric','a lyric')
            return t
        }
        else if(type == 'subtitle'){
            var text = this.props.app_state.loc['2958']/* 'Pick one or multiple subtitle files from your storage.To see an subtitle file here, you need to upload it in the stack page.' */
            var t = text.replaceAll(this.props.app_state.loc['2955']/* image */,this.props.app_state.loc['1593hc']/* 'subtitle' */)
            t = t.replaceAll('an subtitle','a subtitle')
            return t
        }
        else{
            var text = this.props.app_state.loc['2958']/* 'Pick one or multiple video files from your storage.To see an video here, you need to upload it in the stack page.' */
            var t = text.replaceAll(this.props.app_state.loc['2955']/* image */, this.props.app_state.loc['2957']/* 'video' */)
            t = t.replaceAll('an video','a video')
            return t 
        }
        
    }

    render_uploaded_files(){
        var items = this.get_all_uploaded_file_item_cids()

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
                            <div style={{'margin':'3px 0px 3px 0px', 'opacity':this.get_opactiy_of_file(item)}} onClick={() => this.when_file_selected(item)}>
                                {this.render_uploaded_file(item, index, false)}
                            </div>
                        ))}
                    </ul>
                </div>
            )
        }
    }

    get_opactiy_of_file(ecid_obj){
        if(this.props.app_state.uploaded_data[ecid_obj['filetype']] == null) return
        var data = this.props.app_state.uploaded_data[ecid_obj['filetype']][ecid_obj['full']]
        if(data['nitro'] != null && !this.is_file_available(data['hash'])){
            return 0.4
        }
        return 1.0
    }

    when_file_selected(ecid_obj){
        if(this.props.app_state.uploaded_data[ecid_obj['filetype']] == null) return
        var data = this.props.app_state.uploaded_data[ecid_obj['filetype']][ecid_obj['full']]
        if(data['nitro'] != null && !this.is_file_available(data['hash'])){
            this.props.notify(this.props.app_state.loc['2961b']/* You cant use that file, its been deleted. */, 4000)
            return;
        }
        var clone = this.state.selected_ecids.slice()
        clone.push(ecid_obj['full'])
        this.setState({selected_ecids: clone})
    }

    is_file_available(file){
        if(file == null) return true;
        var is_file_available = this.props.app_state.file_streaming_data == null ? true : (this.props.app_state.file_streaming_data[file] == null ? true : this.props.app_state.file_streaming_data[file].is_file_deleted == false)
        return is_file_available
    }

    get_all_uploaded_file_item_cids(){
        var file_type = this.state.type
        var items = this.props.app_state.uploaded_data_cids
        var return_items = []
        var deleted_return_items = []
        items.forEach(ecid => {
            const data = this.get_cid_split(ecid)
            if(data != null && data['filetype'] == file_type && !this.includes_function(this.state.selected_ecids, ecid)){
                if(this.props.app_state.uploaded_data[data['filetype']] != null && this.props.app_state.uploaded_data[data['filetype']][data['full']] != null){
                    const file_data = this.props.app_state.uploaded_data[data['filetype']][data['full']]
                    const title = file_data['name']
                    const time = file_data['id']
                    if(title.includes(this.state.search_text)){
                        if(file_data['nitro'] != null && !this.is_file_available(file_data['hash'])){
                            deleted_return_items.push({'data':data, 'time':time})
                        }else{
                            return_items.push({'data':data, 'time':time})
                        }
                    }
                    else if(this.state.search_text === ''){
                        return_items.push({'data':data, 'time':time})
                    }
                }
                
                
            }
        });

        var sorted_items = this.sortByAttributeDescending(return_items, 'time')
        var sorted_deleted_items = this.sortByAttributeDescending(deleted_return_items, 'time')
        var final_items = []
        sorted_items.forEach(item => {
            final_items.push(item['data'])
        });
        sorted_deleted_items.forEach(item => {
            final_items.push(item['data'])
        });

        return final_items
    }

    includes_function(array, ecid){
        // console.log('pick_file', array, ecid)
        for(var i=0; i<array.length; i++){
            if(array[i] == ecid) return true
        }
        return false
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

    render_uploaded_file(ecid_obj, index, minified){
        if(this.props.app_state.uploaded_data[ecid_obj['filetype']] == null) return
        var data = this.props.app_state.uploaded_data[ecid_obj['filetype']][ecid_obj['full']]
        
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
                        {this.render_detail_item('8', {'details':details,'title':title, 'size':size, 'image':img, 'border_radius':'15%', 'image_width':'auto'})}
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
                // return(
                //     <div style={{'display': 'flex','flex-direction': 'row','padding': '10px 15px 10px 0px','margin':'0px 0px 0px 0px', 'background-color': background_color,'border-radius': '8px'}}>
                //         <div style={{'display': 'flex','flex-direction': 'row','padding': '0px 0px 0px 5px', width: '99%'}}>
                //             <div>
                //                 <video height={video_height} style={{'border-radius':'7px'}}>
                //                     <source src={video} type="video/mp4"/>
                //                     <source src={video} type="video/ogg"/>
                //                     Your browser does not support the video tag.
                //                 </video>
                //             </div>
                //             <div style={{'margin':'0px 0px 0px 10px'}}>
                //                 <p style={{'font-size': font_size[0],'color': this.props.theme['primary_text_color'],'margin': '5px 0px 0px 0px','font-family': this.props.font,'text-decoration': 'none', height:'auto', 'word-wrap': 'break-word'}}>{title}</p> 
                                
                //                 <p style={{'font-size': font_size[1],'color': this.props.theme['secondary_text_color'],'margin': '0px 0px 0px 0px','font-family': this.props.font,'text-decoration': 'none', 'white-space': 'pre-line', 'word-wrap': 'break-word' }}>{details}</p>
                //             </div>
                //         </div>
                //     </div>
                // )
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



    render_selected_files(){
        var items = this.state.selected_ecids
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
                        <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}} onClick={() => this.when_selected_file_tapped(index)}>
                            {this.render_uploaded_file(this.get_cid_split(item), index, true)}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    when_selected_file_tapped(index){
        var cloned_array = this.state.selected_ecids.slice()
        if (index > -1) { // only splice array when item is found
            cloned_array.splice(index, 1); // 2nd parameter means remove one item only
        }
        this.setState({selected_ecids: cloned_array})
    }







    when_image_gif_picked = (e) => {
        this.when_file_picked(e, 'image')
        return;
    }

    when_audio_picked = (e) => {
        this.when_file_picked(e, 'audio')
        return;
    }

    when_video_picked = (e) => {
        this.when_file_picked(e, 'video')
        return;
    }

    when_pdf_picked = (e) => {
        this.when_file_picked(e, 'pdf')
        return;
    }

    when_zip_picked = (e) => {
        this.when_file_picked(e, 'zip')
        return;
    }

    when_lrc_picked = (e) => {
        this.when_file_picked(e, 'lyric')
        return;
    }

    when_vtt_picked = (e) =>{
        this.when_file_picked(e, 'subtitle')
        return;
    }

    when_file_picked = async (e, type) => {
        this.when_encrypted_file_picked(e, type)
        return;
    }

    when_encrypted_file_picked = async (e, type) => {
        if(e.target.files && e.target.files[0]){
            var selected_files_length = e.target.files.length
            if(e.target.files.length + this.props.app_state.uncommitted_upload_cids.length > 720){
                selected_files_length = 720 - this.props.app_state.uncommitted_upload_cids.length
                this.props.notify(this.props.app_state.loc['1593hx']/* 'Only the first $ files will be prepared.' */.replace('$', selected_files_length), 4000);
            }
            else{
                this.props.notify(this.props.app_state.loc['1593by']/* 'Preparing Files...' */, 2000)
            }
            const selected_nitro_item = this.state.selected_nitro_item
            const files_to_upload = []
            const time_in_mills = Date.now()
            this.props.set_file_upload_status('preparing');

            for(var i = 0; i < selected_files_length; i++){
                const unencrypted_file_name = e.target.files[i]['name']
                const file_name = await this.props.encrypt_data_string(unencrypted_file_name, process.env.REACT_APP_FILE_NAME_ENCRYPTION_KEY)
                const private_key = this.props.app_state.accounts['E25'].privateKey.toString()
                const password = this.props.hash_data_with_randomizer(unencrypted_file_name + time_in_mills + private_key)
                const extension = this.props.get_file_extension(unencrypted_file_name)
                
                if(type == 'image'){
                    var imageFile = e.target.files[i];
                    // reader.readAsDataURL(imageFile);
                    const encrypted_file_data = await this.encrypt_singular_file(imageFile,password, 'e')
                    const size = this.props.get_encrypted_file_size_from_uintarray(encrypted_file_data)
                    const compressed_image = await this.compressImageFromFile(URL.createObjectURL(imageFile))
                    
                    const obj = {
                        'data':this.props.process_encrypted_file(encrypted_file_data), 'size': size, 'id':time_in_mills, 'type':type, 'name': file_name, 'data_type':type, 'metadata':'', 'nitro':selected_nitro_item, 'binary_size':size, 'encrypted':true, 'extension':extension, 'thumbnail':await this.props.encrypt_data_string(compressed_image, password), 'author':this.props.hash_data_with_randomizer(this.props.app_state.accounts['E25'].address)
                    }
                    files_to_upload.push(obj)
                }
                else if(type == 'audio'){
                    var audioFile = e.target.files[i];
                    const audioType = audioFile.type
                    const duration = await this.get_audio_duration(audioFile)
                    const chunk_duration = duration < 35 ? 5 : 35
                    const timeToByteMap = await media_processors.buildTimeToByteMap(audioFile, chunk_duration)
                    if(timeToByteMap == null){
                        this.props.notify(this.props.app_state.loc['1593hs']/* 'Unable to process one of your selected files "$"' */.replace('$', unencrypted_file_name), 7000)
                        continue;
                    }
                    const encrypted_file_data_object = await this.encrypt_file_in_chunks(audioFile, password, 'e', timeToByteMap)
                    const encrypted_file_data = encrypted_file_data_object.encryptedChunks
                    const encrypted_file_data_info = encrypted_file_data_object.encryptedChunksInfo
                    const size = this.props.get_encrypted_file_size(encrypted_file_data)
                    var is_loading_mp3_file = true;
                    var me = this
                    parseBlob(audioFile).then(metadata => {
                        me.compressImageFromFile(me.get_audio_file_image(metadata)).then(async metadata_image => {
                            const processed_metadata = me.process_metadata(metadata)
                            // reader.readAsDataURL(audioFile);
                            const obj = { 
                                'data':me.props.process_encrypted_chunks(encrypted_file_data), 'size': size, 'id':time_in_mills, 'type':type, 'name': file_name, 'data_type':type, 'metadata':await me.props.encrypt_data_string(JSON.stringify(processed_metadata), password), 'nitro':selected_nitro_item, 'binary_size':size, 'thumbnail': await me.props.encrypt_data_string(metadata_image, password), 'encrypted':true, 'duration':duration, 'extension':extension,
                                'timeToByteMap':timeToByteMap, 'encrypted_file_data_info':  await me.props.encrypt_data_string(JSON.stringify(encrypted_file_data_info), password),
                                'audio_type':audioType, 'author':me.props.hash_data_with_randomizer(me.props.app_state.accounts['E25'].address)
                            }
                            files_to_upload.push(obj)
                            is_loading_mp3_file = false;
                        })
                    }).catch(async err => {
                        console.error('Error parsing metadata:', err);
                        // reader.readAsDataURL(audioFile);
                        const obj = { 
                            'data':me.props.process_encrypted_chunks(encrypted_file_data), 'size': size, 'id':time_in_mills, 'type':type, 'name': file_name, 'data_type':type, 'metadata': null, 'nitro':selected_nitro_item, 'binary_size':size, 'thumbnail': null, 'encrypted':true, 'duration':duration, 'extension':extension, 'timeToByteMap':timeToByteMap, 'encrypted_file_data_info': await me.props.encrypt_data_string(JSON.stringify(encrypted_file_data_info), password), 'audio_type':audioType, 'author':me.props.hash_data_with_randomizer(me.props.app_state.accounts['E25'].address)
                        }
                        files_to_upload.push(obj)
                        is_loading_mp3_file = false;
                    });
                    while (is_loading_mp3_file == true) {
                        if (is_loading_mp3_file == false) break
                        await new Promise(resolve => setTimeout(resolve, 1000))
                    }
                }
                else if(type == 'video'){
                    var videoFile = e.target.files[i];
                    // reader.readAsDataURL(videoFile);
                    const duration = await this.get_video_duration(videoFile)
                    const videoType = videoFile.type;
                    const chunk_duration = duration < 53 ? 5 : 53
                    let codec;
                    let return_packaged_data;
                    if(extension == 'webm'){
                        const webm_data = await media_processors.buildWebMVideoTimeToByteMap(videoFile, chunk_duration)
                        codec = webm_data.codec
                        return_packaged_data = webm_data.return_packaged_data
                    }else{
                        codec = await media_processors.extractMP4Codec(videoFile)
                        return_packaged_data = await media_processors.buildVideoTimeToByteMap(videoFile, chunk_duration)
                    }
                    const timeToByteMap = return_packaged_data.mapping
                    if(timeToByteMap == null || codec == null){
                        this.props.notify(this.props.app_state.loc['1593hs']/* 'Unable to process one of your selected files "$"' */.replace('$', unencrypted_file_name), 7000)
                        continue;
                    }
                    const encrypted_file_data_object = await this.encrypt_file_in_chunks2(return_packaged_data.combined, password, 'e', timeToByteMap)
                    const encrypted_file_data = encrypted_file_data_object.encryptedChunks
                    const encrypted_file_data_info = encrypted_file_data_object.encryptedChunksInfo
                    
                    const thumb_data = await this.extractFirstFrame(URL.createObjectURL(videoFile))
                    const size = this.props.get_encrypted_file_size(encrypted_file_data)
                    
                    const obj = {
                        'data':this.props.process_encrypted_chunks(encrypted_file_data), 'size': size, 'id':time_in_mills, 'type':type, 'name': file_name, 'data_type':type, 'metadata':'', 'nitro':selected_nitro_item, 'binary_size':size, 'encrypted':true, 'duration':duration, 'extension':extension, 'timeToByteMap':timeToByteMap, 'encrypted_file_data_info': await this.props.encrypt_data_string(JSON.stringify(encrypted_file_data_info), password),
                        'video_type':videoType, 'codec':codec, 'author':this.props.hash_data_with_randomizer(this.props.app_state.accounts['E25'].address)
                    }
                    
                    if(thumb_data != null && thumb_data != ''){
                        obj['thumbnail'] = await this.props.encrypt_data_string(thumb_data.return_blob, password) 
                        obj['width'] = thumb_data.width
                        obj['height'] = thumb_data.height
                    }

                    files_to_upload.push(obj)
                }
                else if(type == 'pdf'){
                    var pdfFile = e.target.files[i];
                    // reader.readAsDataURL(pdfFile)
                    const encrypted_file_data = await this.encrypt_singular_file(pdfFile, password, 'e')
                    const pdf_image = await this.get_pdf_image(URL.createObjectURL(pdfFile))
                    const size = this.props.get_encrypted_file_size_from_uintarray(encrypted_file_data)

                    const obj = { 'data':this.props.process_encrypted_file(encrypted_file_data), 'size': size, 'id':time_in_mills, 'type':type, 'name': file_name, 'data_type':type, 'metadata':'', 'nitro':selected_nitro_item, 'binary_size':size, 'thumbnail':await this.props.encrypt_data_string(pdf_image, password), 'encrypted':true, 'extension':extension, 'author':this.props.hash_data_with_randomizer(this.props.app_state.accounts['E25'].address) }

                    files_to_upload.push(obj)
                }
                else if(type == 'zip'){
                    var zipFile = e.target.files[i];
                    // reader.readAsDataURL(zipFile);
                    const encrypted_file_data = await this.encrypt_singular_file(zipFile, password, 'e')
                    const size = this.props.get_encrypted_file_size_from_uintarray(encrypted_file_data)

                    const obj = { 'data':this.props.process_encrypted_file(encrypted_file_data), 'size': size, 'id':time_in_mills, 'type':type, 'name': file_name, 'data_type':type, 'metadata':'', 'nitro':selected_nitro_item, 'binary_size':size, 'encrypted':true, 'extension':extension, 'author':this.props.hash_data_with_randomizer(this.props.app_state.accounts['E25'].address) }

                    files_to_upload.push(obj)
                }
                else if(type == 'lyric'){
                    var lyricFile = e.target.files[i];
                    // reader.readAsDataURL(lyricFile);
                    const encrypted_file_data = await this.encrypt_singular_file(lyricFile, password, 'e')
                    const size = this.props.get_encrypted_file_size_from_uintarray(encrypted_file_data)

                    const obj = { 'data':this.props.process_encrypted_file(encrypted_file_data), 'size': size, 'id':time_in_mills, 'type':type, 'name': file_name, 'data_type':type, 'metadata':'', 'nitro':selected_nitro_item, 'binary_size':size, 'encrypted':true, 'extension':extension, 'author':this.props.hash_data_with_randomizer(this.props.app_state.accounts['E25'].address) }

                    files_to_upload.push(obj)
                }
                else if(type == 'subtitle'){
                    var subtitleFile = e.target.files[i];
                    // reader.readAsDataURL(subtitleFile);
                    const encrypted_file_data = await this.encrypt_singular_file(subtitleFile, password, 'e')
                    const size = this.props.get_encrypted_file_size_from_uintarray(encrypted_file_data)

                    const obj = { 'data':this.props.process_encrypted_file(encrypted_file_data), 'size': size, 'id':time_in_mills, 'type':type, 'name': file_name, 'data_type':type, 'metadata':'', 'nitro':selected_nitro_item, 'binary_size':size, 'encrypted':true, 'extension':extension, 'author':this.props.hash_data_with_randomizer(this.props.app_state.accounts['E25'].address) }

                    files_to_upload.push(obj)
                }
            }
            
            if(files_to_upload.length > 0){
                this.upload_encrypted_files(selected_nitro_item, files_to_upload, type);
            }else{
                this.props.set_file_upload_status('');
            }
        }
    }

    encrypt_singular_file = async (file, password, salt) => {
        return await this.props.encrypt_singular_file(file, password, salt)
    }

    encrypt_file_in_chunks2 = async (combined, password, salt, timeToByteMap) => {
        return await this.props.encrypt_file_in_chunks2(combined, password, salt, timeToByteMap)
    }

    encrypt_file_in_chunks = async (file, password, salt, timeToByteMap) => {
        return await this.props.encrypt_file_in_chunks(file, password, salt, timeToByteMap)
    }

    readChunkAsArrayBuffer(blob) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = e => resolve(e.target.result);
            reader.onerror = reject;
            reader.readAsArrayBuffer(blob);
        });
    }

    get_video_duration(file) {
        return new Promise((resolve, reject) => {
            const video = document.createElement('video');
            video.preload = 'metadata';
            video.src = URL.createObjectURL(file);
            video.onloadedmetadata = () => {
                resolve(video.duration); // duration in seconds
                URL.revokeObjectURL(video.src);
            };
            video.onerror = () => reject(new Error('Could not load video metadata'));
        });
    }

    get_audio_duration(file) {
        return new Promise((resolve, reject) => {
            const audio = document.createElement('audio');
            audio.preload = 'metadata';
            const url = URL.createObjectURL(file);
            audio.src = url;

            audio.onloadedmetadata = () => {
                URL.revokeObjectURL(url); // Clean up
                resolve(audio.duration);
            };

            audio.onerror = (e) => {
                reject(new Error('Failed to load audio metadata'));
            };
        });
    }

    get_file_sizes(dataURL){
        const base64Data = dataURL.split(",")[1];
        const binaryData = Buffer.from(base64Data, "base64");
        return binaryData.length
    }

    process_metadata(metadata){
        var metadata_clone = {'common':{}, 'format':{}}
        if(metadata != null){
            if(metadata['common'] != null){
                metadata_clone['common']['composer'] = metadata['common']['composer']
            }
            if(metadata['format'] != null){
                metadata_clone['format']['bitrate'] = metadata['format']['bitrate']
                metadata_clone['format']['codec'] = metadata['format']['codec']
                metadata_clone['format']['codecProfile'] = metadata['format']['codecProfile']
                metadata_clone['format']['container'] = metadata['format']['container']
                metadata_clone['format']['lossless'] = metadata['format']['lossless']
                metadata_clone['format']['numberOfChannels'] = metadata['format']['numberOfChannels']
                metadata_clone['format']['numberOfSamples'] = metadata['format']['numberOfSamples']
                metadata_clone['format']['sampleRate'] = metadata['format']['sampleRate']
                metadata_clone['format']['duration'] = metadata['format']['duration']
            } 
        }
        return metadata_clone
    }

    extractFirstFrame(videoUrl) {
        return new Promise((resolve, reject) => {
          const video = document.createElement("video");
    
          video.src = videoUrl;
          video.crossOrigin = "anonymous"; // Needed if video is from another domain
          video.preload = "auto";
          video.muted = true;
    
          video.addEventListener("loadeddata", () => {
            video.currentTime = 0; // Seek to the beginning
          });
    
          video.addEventListener("seeked", () => {
            const canvas = document.createElement("canvas");
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

            const image_size = 35 * 1024
            canvas.toBlob(blob => {
                var quality = 1.0
                var blob_size = blob.size
                if(blob_size > image_size){
                    quality = image_size / blob_size
                }
                var return_blob = canvas.toDataURL("image/jpeg", quality);
                resolve({return_blob, width: canvas.width, height: canvas.height});
            }, "image/jpeg")
          });
    
          video.addEventListener("error", (err) => {
            reject("Error loading video: " + err.message);
          });
        });
    }

    get_pdf_image_from_file = async (file) => {
        let reader = new FileReader();
        this.is_loading_file = true
        reader.onload = function(ev){
            this.pdf_file_image = ev.target.result
            this.is_loading_file = false
        }.bind(this);
        reader.readAsDataURL(file)
        while (this.is_loading_file == true) {
            if (this.is_loading_file == false) break
            console.log('stackdata','Waiting for pdf file image data to be loaded')
            await new Promise(resolve => setTimeout(resolve, 1000))
        }
        return await this.get_pdf_image(this.pdf_file_image)
    }

    get_pdf_image = async (pdfDataUrl) => {
        const pdf = await pdfjsLib.getDocument(pdfDataUrl).promise;
        const firstPage = await pdf.getPage(1);
        const scale = 1.5;
        const viewport = firstPage.getViewport({ scale });
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = viewport.width;
        canvas.height = viewport.width;
        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };
        await firstPage.render(renderContext).promise;
        const thumbnailDataUrl = canvas.toDataURL('image/png', 0.3);
        return thumbnailDataUrl
    }

    upload_encrypted_files = async (nitro_id, files, type) => {
        var size_total = 0
        for(var i = 0; i<files.length; i++){
            size_total += files[i]['size']
        }
        
        if(size_total > this.get_upload_file_size_limit()){
            this.props.notify(this.props.app_state.loc['1593cy']/* 'The total space for all the selected files exceeds the amount of space youve acquired in the nitro node.' */, 9000)
        }else{
            if(nitro_id == null){
                this.props.notify(this.props.app_state.loc['1593coz']/* 'You need to select a nitro node first.' */, 9000) 
            }
            else if(!this.props.app_state.has_wallet_been_set){
                this.props.notify(this.props.app_state.loc['2906']/* 'You need to set your wallet first.' */, 9000)
            }
            else{
                var all_nitros = this.get_all_sorted_objects(this.props.app_state.created_nitros)
                var obj = this.get_item_in_array2(nitro_id, all_nitros)
                var node_details = this.props.app_state.nitro_node_details[nitro_id]
                
                if(obj == null){
                    this.props.notify(this.props.app_state.loc['1593da']/* 'Please wait a few moments for E5 to syncronize fully.' */, 5000)
                }
                else if(node_details == null){
                    this.props.notify(this.props.app_state.loc['1593db']/* 'Please wait a few moments for your selected node to come online.' */, 5000)
                }
                else{
                    const ecids = await this.props.upload_multiple_encrypted_files_to_nitro_node(files, type, obj, node_details)

                    // console.log('upload_encrypted_files', ecids)
                    const clone = this.state.selected_ecids.slice().concat(ecids)
                    this.setState({selected_ecids: clone})
                }
            }
        }
    }








    get_audio_file_image = (metadata) => {
        console.log('stackpage',metadata);
        const picture = metadata.common.picture;

        if (picture && picture.length > 0) {
            // Convert album art to a base64 URL
            const base64String = uint8ArrayToBase64(picture[0].data);
            const albumArtUrl = `data:${picture[0].format};base64,${base64String}`;
            return albumArtUrl
        } else {
            console.log('No album art found.');
            // return this.props.app_state.static_assets['music_label']
            return ''
        }
    }

    compressImageFromFile(image_url) {
        return new Promise((resolve, reject) => {
          const img = new Image();
          const maxWidth = 200 
      
          img.onload = () => {
            const canvas = document.createElement('canvas');
            const scale = maxWidth / img.width;
            canvas.width = maxWidth;
            canvas.height = img.height * scale;
      
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      
            const image_size = 35 * 1024
            canvas.toBlob(blob => {
                var quality = 1.0
                var blob_size = blob.size
                if(blob_size > image_size){
                    quality = image_size / blob_size
                }
                var return_blob = canvas.toDataURL("image/jpeg", quality);
                resolve(return_blob);
            }, "image/jpeg")
          };
      
          img.src = image_url;
          img.onerror = reject;
        });
    }


    finish(){
        var selected_files = this.state.selected_ecids
        if(selected_files.length == 0){
            this.props.notify(this.props.app_state.loc['2959']/* 'You can\'t finish with no files selected.' */, 4000)
        }
        else if(selected_files.length > this.state.max){
            this.props.notify(this.props.app_state.loc['2960']/* 'You can\'t pick more than ' */+this.state.max+this.props.app_state.loc['2961']/* ' files.' */, 4000)
        }
        else{
            this.props.return_selected_files(selected_files, this.state.function_name)
            this.setState({selected_ecids:[]})
        }
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




export default PickFilePage;