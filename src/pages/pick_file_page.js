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

    set_data(type, function_name, max){
        this.setState({type: type, get_pick_file_tags_object: this.get_pick_file_tags_object(type), function_name: function_name, max: max, selected_ecids:[], search_text:''})
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
        return(
            <div>
                {this.render_detail_item('4',{'font':this.props.app_state.font, 'textsize':'14px','text':this.render_title_text()})}
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
            var text = this.props.app_state.loc['2958']/* 'Pick one or multiple zip files from your storage.To see an audio file here, you need to upload it in the stack page.' */
            var t = text.replaceAll(this.props.app_state.loc['2955']/* image */,this.props.app_state.loc['1593hb']/* 'lyric' */)
            t = t.replaceAll('an lyric','a lyric')
            return t
        }
        else if(type == 'subtitle'){
            var text = this.props.app_state.loc['2958']/* 'Pick one or multiple zip files from your storage.To see an audio file here, you need to upload it in the stack page.' */
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
                            <div style={{'margin':'3px 0px 3px 0px'}} onClick={() => this.when_file_selected(item)}>
                                {this.render_uploaded_file(item, index, false)}
                            </div>
                        ))}
                    </ul>
                </div>
            )
        }
    }

    when_file_selected(ecid){
        var clone = this.state.selected_ecids.slice()
        clone.push(ecid['full'])
        this.setState({selected_ecids: clone})
    }

    get_all_uploaded_file_item_cids(){
        var file_type = this.state.type
        var items = this.props.app_state.uploaded_data_cids
        var return_items = []
        items.forEach(ecid => {
            var data = this.get_cid_split(ecid)
            if(data != null && data['filetype'] == file_type && !this.includes_function(this.state.selected_ecids, ecid)){
                if(this.props.app_state.uploaded_data[data['filetype']] != null && this.props.app_state.uploaded_data[data['filetype']][data['full']] != null){
                    var file_data = this.props.app_state.uploaded_data[data['filetype']][data['full']]
                    var title = file_data['name']
                    const time = file_data['id']
                    if(title.includes(this.state.search_text)){
                        return_items.push({'data':data, 'time':time})
                    }
                    else if(this.state.search_text === ''){
                        return_items.push({'data':data, 'time':time})
                    }
                }
                
                
            }
        });

        var sorted_items = this.sortByAttributeDescending(return_items, 'time')
        var final_items = []
        sorted_items.forEach(item => {
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
        var background_color = this.props.theme['view_group_card_item_background'];
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
        else if(size > (1024^4)){
            return {'size':Math.round(size/(1024^4)), 'unit':'TBs'}
        }
        else if(size > (1024^3)){
            return {'size':Math.round(size/(1024^3)), 'unit':'GBs'}
        }
        else if(size > (1024^2)){
            return {'size':Math.round(size/(1024^2)), 'unit':'MBs'}
        }
        else if(size > 1024){
            return {'size':Math.round(size/1024), 'unit':'KBs'}
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