import React, { Component } from 'react';
import ViewGroups from '../../components/view_groups'
import Tags from '../../components/tags';
import TextInput from '../../components/text_input';
// import Letter from '../../assets/letter.png';
// import E5EmptyIcon from '../../assets/e5empty_icon.png';
// import E5EmptyIcon3 from '../../assets/e5empty_icon3.png';

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Draggable } from "react-drag-reorder";

import { SwipeableList, SwipeableListItem } from '@sandstreamdev/react-swipeable-list';
import '@sandstreamdev/react-swipeable-list/dist/styles.css';
import imageCompression from 'browser-image-compression';

var bigInt = require("big-integer");

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

function number_with_commas(x) {
    if(x == null) x = '';
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

class NewMailPage extends Component {
    
    state = {
        selected: 0,
        id: makeid(8), type:this.props.app_state.loc['285'], e5:this.props.app_state.selected_e5,
        get_new_job_page_tags_object: this.get_new_job_page_tags_object(),/* i copypasted these! sue me  */
        // get_new_job_text_tags_object: this.get_new_job_text_tags_object(),
        entered_tag_text: '', entered_title_text:'', entered_text:'', target_recipient:'',
        entered_indexing_tags:[], entered_text_objects:[], entered_image_objects:[],
        entered_objects:[], recipients:[],

        content_channeling_setting: this.props.app_state.content_channeling, 
        device_language_setting: this.props.app_state.device_language, 
        device_country: this.props.app_state.device_country,

        typed_link_text:'', link_search_results:[], added_links:[], 
        edit_text_item_pos:-1,

        get_sort_links_tags_object:this.get_sort_links_tags_object(),
    };

    get_new_job_page_tags_object(){
        var obj = {
            'i':{
                active:'e', 
            },
            'e':[
                ['or','',0], ['e',this.props.app_state.loc['110']/* ,this.props.app_state.loc['111'] */, this.props.app_state.loc['112']], [0]
            ],
            'text':[
                ['or','',0], [this.props.app_state.loc['115'],this.props.app_state.loc['120'], this.props.app_state.loc['121']], [0]
            ],
            'font':[
                ['xor','e',1], [this.props.app_state.loc['116'],'Sans-serif','Courier New','Times New Roman','ComicSans','papyrus'], [1],[1]
            ],
            'size':[
                ['xor','e',1], [this.props.app_state.loc['117'],'15px','11px','25px','40px'], [1],[1]
            ],
        };

        obj[this.props.app_state.loc['115']] = [
                ['or','',0], [this.props.app_state.loc['115'],this.props.app_state.loc['120'], this.props.app_state.loc['121']], [0]
            ]
        obj[this.props.app_state.loc['116']] = [
                ['xor','e',1], [this.props.app_state.loc['116'],'Sans-serif','Courier New','Times New Roman','ComicSans','papyrus'], [1],[1]
            ]
        obj[this.props.app_state.loc['117']] = [
                ['xor','e',1], [this.props.app_state.loc['117'],'15px','11px','25px','40px'], [1],[1]
            ]

        return obj;
    }

    get_new_job_text_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['or','',0], ['e','e.font', 'e.size'], [0]
            ],
            'font':[
                ['xor','e',1], ['font','Sans-serif','Courier New','Times New Roman','ComicSans','papyrus'], [1],[1]
            ],
            'size':[
                ['xor','e',1], ['size','15px','11px','25px','40px'], [1],[1]
            ],
        };
    }

    get_sort_links_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['or','',0], ['e',this.props.app_state.loc['162a']/* '📑 contract' */, this.props.app_state.loc['162b']/* '💼 job' */, this.props.app_state.loc['162c']/* '👷🏻‍♀️ contractor' */, this.props.app_state.loc['162d']/* '🏪 storefront' */, this.props.app_state.loc['162e']/* '🎫 subscription' */,this.props.app_state.loc['162f']/* '📰 post' */,this.props.app_state.loc['162g'] /* '📡 channel' */, this.props.app_state.loc['162h']/* '🪙 token' */, this.props.app_state.loc['162i']/* '🧎 proposal' */], [0]
            ],
        };
    }

    render(){
        return(
            <div style={{'padding':'10px 10px 0px 10px'}}>

                <div className="row">
                    <div className="col-11" style={{'padding': '0px 0px 0px 10px'}}>
                        <Tags font={this.props.app_state.font} page_tags_object={this.state.get_new_job_page_tags_object} tag_size={'l'} when_tags_updated={this.when_new_job_page_tags_updated.bind(this)} theme={this.props.theme}/>
                    </div>
                    <div className="col-1" style={{'padding': '0px 0px 0px 0px'}}>
                        <div className="text-end" style={{'padding': '0px 10px 0px 0px'}} >
                            <img className="text-end" onClick={()=>this.finish_creating_object()} src={this.props.theme['close']} style={{height:36, width:'auto'}} />
                        </div>
                    </div>
                </div>
                
                
                <div style={{'margin':'0px 0px 0px 0px'}}>
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
        else if(selected_item == this.props.app_state.loc['111']){
            return(
                <div>
                    {this.render_enter_links_part()}
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
        // else if(selected_item == 'recipients'){
        //     return(
        //         <div>
        //             {this.render_recipients_part()}
        //         </div>
        //     )
        // }
    }

    is_text_selected_item(selected_item){
        var obj = [this.props.app_state.loc['115'],this.props.app_state.loc['116'],this.props.app_state.loc['117'],'Sans-serif','Courier New','Times New Roman','ComicSans','papyrus', '15px','11px','25px','40px']
        if(obj.includes(selected_item)){
            return true
        }
        return false
    }

    get_selected_item(object, option){
        var selected_item = object[option][2][0]
        var picked_item = object[option][1][selected_item];
        return picked_item
    }


    render_enter_tags_part(){
        var size = this.props.size

        if(size == 's'){
            return(
                <div>
                    {this.render_title_tags_part()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_title_tags_part()}
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
                        {this.render_title_tags_part()}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_empty_views(3)}
                    </div>
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
                                    <img src={this.props.app_state.static_assets['letter']} style={{height:30 ,width:'auto'}} />
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    render_title_tags_part(){
        return(
            <div style={{'padding':'0px 10px 0px 10px'}}>
                {this.render_detail_item('4',{'font':this.props.app_state.font, 'textsize':'15px','text':this.props.app_state.loc['286']})}
                <div style={{height:10}}/>
                <TextInput font={this.props.app_state.font} height={60} placeholder={this.props.app_state.loc['123']} when_text_input_field_changed={this.when_title_text_input_field_changed.bind(this)} text={this.state.entered_title_text} theme={this.props.theme}/>
                <div style={{height: 10}}/>
                {this.render_detail_item('4',{'font':this.props.app_state.font, 'textsize':'15px','text':this.state.entered_title_text})}
                {this.render_detail_item('10',{'font':this.props.app_state.font, 'textsize':'10px','text':this.props.app_state.loc['124']+(this.props.app_state.title_size - this.state.entered_title_text.length)})}

                {this.render_detail_item('0')}
                {this.render_detail_item('4',{'font':this.props.app_state.font, 'textsize':'14px','text':this.props.app_state.loc['287']})}
                <div style={{height:10}}/>
                <TextInput font={this.props.app_state.font} height={30} placeholder={this.props.app_state.loc['288']} when_text_input_field_changed={this.when_target_recipient_input_field_changed.bind(this)} text={this.state.target_recipient} theme={this.props.theme}/>
                {this.load_account_suggestions()}
                <div style={{height:10}}/>

                <div style={{height:'1px', 'background-color':'#C1C1C1', 'margin': '0px 20px 20px 20px'}}/>
                {this.render_detail_item('4',{'font':this.props.app_state.font, 'textsize':'15px','text':this.props.app_state.loc['289']})}
                <div style={{height:10}}/>

                <div className="row">
                    <div className="col-9" style={{'margin': '0px 0px 0px 0px'}}>
                        <TextInput font={this.props.app_state.font} height={30} placeholder={this.props.app_state.loc['126']} when_text_input_field_changed={this.when_index_text_input_field_changed.bind(this)} text={this.state.entered_tag_text} theme={this.props.theme}/>
                    </div>
                    <div className="col-3" style={{'padding': '0px 5px 0px 0px'}}>
                        {this.render_detail_item('5', {'text':this.props.app_state.loc['127'], 'action':'add_indexing_tag', 'prevent_default':true})}
                    </div>
                </div>
                {this.render_detail_item('10',{'font':this.props.app_state.font, 'textsize':'10px','text':this.props.app_state.loc['124']+(this.props.app_state.tag_size - this.state.entered_tag_text.length)})}

                {this.render_detail_item('1',{'active_tags':this.state.entered_indexing_tags, 'indexed_option':'indexed', 'when_tapped':'delete_entered_tag_word'})}

                {this.render_detail_item('0')}
                {this.render_detail_item('0')}
            </div>
        )
    }

    when_title_text_input_field_changed(text){
        this.setState({entered_title_text: text})
    }

    when_index_text_input_field_changed(text){
        this.setState({entered_tag_text: text})
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
        // this.props.notify('tag removed', 200)
    }

   



    
    render_new_job_object(){
        return;
        var background_color = this.props.theme['card_background_color']
        var card_shadow_color = this.props.theme['card_shadow_color']
        var items = [].concat(this.state.entered_objects);
        return ( 
            <div onClick={() => console.log()} style={{height:'auto', 'background-color': background_color, 'border-radius': '15px','padding':'5px 5px 0px 0px', 'box-shadow': '0px 0px 1px 2px '+card_shadow_color, 'margin':'0px 10px 10px 10px'}}>
                <div style={{'padding': '5px 0px 5px 0px'}}>
                    {this.render_detail_item('1',{'active_tags':this.state.entered_indexing_tags, 'indexed_option':'indexed', 'when_tapped':'delete_entered_tag_word'})}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('4',{'font':this.props.app_state.font, 'textsize':'15px','text':this.state.entered_title_text})}
                    {this.render_detail_item('0')}

                    <Draggable>
                        {items.map((item, index) => (
                            <div key={index}>
                                {this.render_detail_item(item['type'], item['data'])} 
                                <div style={{height:10}}/>
                            </div>
                        ))}
                    </Draggable>
                </div>         
            </div>
        );
    }





    render_enter_text_part(){
        var size = this.props.size

        if(size == 's'){
            return(
                <div style={{'padding': '0px 10px 0px 0px'}}>
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
                        {this.render_content()}
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
                {/* {this.render_detail_item('4',{'font':this.props.app_state.font, 'textsize':'15px','text':this.props.app_state.loc['290']})}
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

                    <div style={{'position': 'relative', 'width':45, 'height':45, 'padding':'0px 0px 0px 0px'}}>
                        <img src={this.props.app_state.static_assets['e5_empty_icon3']} style={{height:45, width:'auto', 'z-index':'1' ,'position': 'absolute'}} />
                        <input style={{height:30, width:40, opacity:0, 'z-index':'2' ,'position': 'absolute', 'margin':'5px 0px 0px 0px'}} id="upload" type="file" accept ="image/*" onChange ={this.when_banner_image_picked.bind(this)} />
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
            'font':font, 'textsize':size,'text':this.state.entered_text
        }
    }

    when_add_text_button_tapped(){
        var typed_word = this.state.entered_text.trim();

        if(typed_word == ''){
            this.props.notify(this.props.app_state.loc['128'], 400)
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
                                content: <div>Delete</div>,
                                action: () => this.delete_text_item(item)
                                }}
                                swipeRight={{
                                content: <div></div>,
                                action: () => console.log() }}>
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

                            <div style={{'position': 'relative', 'width':45, 'height':45, 'padding':'0px 0px 0px 0px'}}>
                                <img src={this.props.app_state.static_assets['e5_empty_icon3']} style={{height:45, width:'auto', 'z-index':'1' ,'position': 'absolute'}} />
                                <input style={{height:30, width:40, opacity:0, 'z-index':'2' ,'position': 'absolute', 'margin':'5px 0px 0px 0px'}} id="upload" type="file" accept ="image/*" onChange ={(e) => this.when_banner_image_updated(e, index)} />
                            </div>
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
        var obj = {'image':image, 'caption':entered_text}
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








    render_enter_links_part(){
        return(
            <div style={{'margin':'10px 0px 0px 0px'}}>
                {this.render_detail_item('4',{'font':this.props.app_state.font, 'textsize':'15px','text':this.props.app_state.loc['291']})}
                <div style={{height:10}}/>
                <div className="row" style={{width:'103%'}}>
                    <div className="col-9" style={{'margin': '0px 0px 0px 0px'}}>
                        <TextInput font={this.props.app_state.font} height={30} placeholder={this.props.app_state.loc['292']} when_text_input_field_changed={this.when_typed_link_text_changed.bind(this)} text={this.state.typed_link_text} theme={this.props.theme}/>
                    </div>
                    <div className="col-3" style={{'padding': '0px 10px 0px 0px'}} onClick={()=> this.search_object()} >
                        {this.render_detail_item('5',{'text':this.props.app_state.loc['140'],'action':'', 'prevent_default':true})}
                    </div>
                </div>
                <div style={{height:10}}/>
                {this.render_selected_links()}

                {this.render_detail_item('0')}
                <Tags font={this.props.app_state.font} page_tags_object={this.state.get_sort_links_tags_object} tag_size={'l'} when_tags_updated={this.when_get_sort_links_tags_object_updated.bind(this)} theme={this.props.theme}/>

                <div style={{height:10}}/>
                {this.render_searched_link_results()}

            </div>
        )
    }

    when_get_sort_links_tags_object_updated(tag_obj){
        this.setState({get_sort_links_tags_object: tag_obj})
    }

    when_typed_link_text_changed(text){
        this.setState({typed_link_text: text})
    }


    search_object(){
        var typed_text = this.state.typed_link_text

        if(typed_text == ''){
            this.props.notify(this.props.app_state.loc['128'], 1800)
        }else{
            this.props.notify(this.props.app_state.loc['141'], 1600)
            var return_data = this.search_for_object(typed_text)
            this.setState({link_search_results: return_data})
        }
    }


    search_for_object(typed_text){
        var contracts = this.get_all_sorted_objects(this.props.app_state.created_contracts)
        var channels = this.get_all_sorted_objects(this.props.app_state.created_channels)
        var contractors = this.get_all_sorted_objects(this.props.app_state.created_contractors)
        var jobs = this.get_all_sorted_objects(this.props.app_state.created_jobs)
        var posts = this.get_all_sorted_objects(this.props.app_state.created_posts)
        var proposals = this.get_all_sorted_objects(this.props.app_state.my_proposals)
        var storefronts = this.get_all_sorted_objects(this.props.app_state.created_stores)
        var subscriptions = this.get_all_sorted_objects(this.props.app_state.created_subscriptions)
        var tokens = this.get_all_sorted_objects(this.props.app_state.created_tokens)
    

        var return_objects = []
        var my_objects = []
        contracts.forEach(object => {
            var ipfs_title = object['ipfs'] == null ? '' : object['ipfs'].entered_title_text
            var full_id = (object['e5'] + 'e' + object['id']).toLowerCase()
            console.log(object['id'])
            if(object['id'].toString().includes(typed_text) || ipfs_title.includes(typed_text) || full_id.includes(typed_text)){
                return_objects.push({'id':object['id'], 'title':ipfs_title, 'e5':object['e5'], 'type':'contract'})
            }
            var me = this.props.app_state.user_account_id[object['e5']]
            if(me == null) me = 1
            if(object['author'] == me){
                my_objects.push({'id':object['id'], 'title':ipfs_title, 'e5':object['e5'], 'type':'contract'})
            }
        });

        channels.forEach(object => {
            var ipfs_title = object['ipfs'] == null ? '' : object['ipfs'].entered_title_text
            var full_id = (object['e5'] + 'e' + object['id']).toLowerCase()
            if(object['id'].toString().includes(typed_text) || ipfs_title.includes(typed_text) || full_id.includes(typed_text)){
                return_objects.push({'id':object['id'], 'title':ipfs_title, 'e5':object['e5'], 'type':'channel'})
            }
            var me = this.props.app_state.user_account_id[object['e5']]
            if(me == null) me = 1
            if(object['author'] == me){
                my_objects.push({'id':object['id'], 'title':ipfs_title, 'e5':object['e5'], 'type':'channel'})
            }
        });

        contractors.forEach(object => {
            var ipfs_title = object['ipfs'] == null ? '' : object['ipfs'].entered_title_text
            var full_id = (object['e5'] + 'e' + object['id']).toLowerCase()
            if(object['id'].toString().includes(typed_text) || ipfs_title.includes(typed_text) || full_id.includes(typed_text)){
                return_objects.push({'id':object['id'], 'title':ipfs_title, 'e5':object['e5'], 'type':'contractor'})
            }
            var me = this.props.app_state.user_account_id[object['e5']]
            if(me == null) me = 1
            if(object['author'] == me){
                my_objects.push({'id':object['id'], 'title':ipfs_title, 'e5':object['e5'], 'type':'contractor'})
            }
        });

        jobs.forEach(object => {
            var ipfs_title = object['ipfs'] == null ? '' : object['ipfs'].entered_title_text
            var full_id = (object['e5'] + 'e' + object['id']).toLowerCase()
            if(object['id'].toString().includes(typed_text) || ipfs_title.includes(typed_text) || full_id.includes(typed_text)){
                return_objects.push({'id':object['id'], 'title':ipfs_title, 'e5':object['e5'], 'type':'job'})
            }
            var me = this.props.app_state.user_account_id[object['e5']]
            if(me == null) me = 1
            if(object['author'] == me){
                my_objects.push({'id':object['id'], 'title':ipfs_title, 'e5':object['e5'], 'type':'job'})
            }
        });


        posts.forEach(object => {
            var ipfs_title = object['ipfs'] == null ? '' : object['ipfs'].entered_title_text
            var full_id = (object['e5'] + 'e' + object['id']).toLowerCase()
            if(object['id'].toString().includes(typed_text) || ipfs_title.includes(typed_text) || full_id.includes(typed_text)){
                return_objects.push({'id':object['id'], 'title':ipfs_title, 'e5':object['e5'], 'type':'post'})
            }
            var me = this.props.app_state.user_account_id[object['e5']]
            if(me == null) me = 1
            if(object['author'] == me){
                my_objects.push({'id':object['id'], 'title':ipfs_title, 'e5':object['e5'], 'type':'post'})
            }
        });


        proposals.forEach(object => {
            var ipfs_title = object['ipfs'] == null ? '' : object['ipfs'].entered_title_text
            var full_id = (object['e5'] + 'e' + object['id']).toLowerCase()
            if(object['id'].toString().includes(typed_text) || ipfs_title.includes(typed_text) || full_id.includes(typed_text)){
                return_objects.push({'id':object['id'], 'title':ipfs_title, 'e5':object['e5'], 'type':'proposal'})
            }
            var me = this.props.app_state.user_account_id[object['e5']]
            if(me == null) me = 1
            if(object['author'] == me){
                my_objects.push({'id':object['id'], 'title':ipfs_title, 'e5':object['e5'], 'type':'proposal'})
            }
        });

        storefronts.forEach(object => {
            var ipfs_title = object['ipfs'] == null ? '' : object['ipfs'].entered_title_text
            var full_id = (object['e5'] + 'e' + object['id']).toLowerCase()
            if(object['id'].toString().includes(typed_text) || ipfs_title.includes(typed_text) || full_id.includes(typed_text)){
                return_objects.push({'id':object['id'], 'title':ipfs_title, 'e5':object['e5'], 'type':'storefront'})
            }
            var me = this.props.app_state.user_account_id[object['e5']]
            if(me == null) me = 1
            if(object['author'] == me){
                my_objects.push({'id':object['id'], 'title':ipfs_title, 'e5':object['e5'], 'type':'storefront'})
            }
        });


        subscriptions.forEach(object => {
            var ipfs_title = object['ipfs'] == null ? '' : object['ipfs'].entered_title_text
            var full_id = (object['e5'] + 'e' + object['id']).toLowerCase()
            if(object['id'].toString().includes(typed_text) || ipfs_title.includes(typed_text) || full_id.includes(typed_text)){
                return_objects.push({'id':object['id'], 'title':ipfs_title, 'e5':object['e5'], 'type':'subscription'})
            }
            var me = this.props.app_state.user_account_id[object['e5']]
            if(me == null) me = 1
            if(object['author'] == me){
                my_objects.push({'id':object['id'], 'title':ipfs_title, 'e5':object['e5'], 'type':'subscription'})
            }
        });

        tokens.forEach(object => {
            var ipfs_title = object['ipfs'] == null ? '' : object['ipfs'].entered_title_text
            var full_id = (object['e5'] + 'e' + object['id']).toLowerCase()
            if(object['id'].toString().includes(typed_text) || ipfs_title.includes(typed_text) || full_id.includes(typed_text)){
                return_objects.push({'id':object['id'], 'title':ipfs_title, 'e5':object['e5'], 'type':'token'})
            }
            var me = this.props.app_state.user_account_id[object['e5']]
            if(me == null) me = 1
            if(object['author'] == me){
                my_objects.push({'id':object['id'], 'title':ipfs_title, 'e5':object['e5'], 'type':'token'})
            }
        });

        if(return_objects.length == 0 || typed_text == '') return my_objects;
        return return_objects
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


    render_selected_links(){
        var items = [].concat(this.state.added_links).reverse()
        var background_color = this.props.theme['card_background_color']

        if(items.length == 0){
            items = [1, 2, 3]
            return(
                <div style={{'margin':'3px 0px 0px 10px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                    <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                        {items.map((item, index) => (
                            <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}}>
                                <div style={{height:47, width:97, 'background-color': background_color, 'border-radius': '8px','padding':'10px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                                    <div style={{'margin':'0px 0px 0px 0px'}}>
                                        <img src={this.props.app_state.static_assets['letter']} style={{height:20 ,width:'auto'}} />
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
        return(
            <div style={{'margin':'0px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                    {items.map((item, index) => (
                        <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}} onClick={()=>this.when_link_item_clicked(item)}>
                            {this.render_detail_item('3', {'title':this.get_title(item), 'details':this.truncate(item['title'], 15), 'size':'s', 'padding':'5px 12px 5px 12px'})}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    truncate(source, size) {
        return source.length > size ? source.slice(0, size - 1) + "…" : source;
    }

    get_title(item){
        var obj = {'contract':'📑', 'job':'💼', 'contractor':'👷🏻‍♀️', 'storefront':'🏪','subscription':'🎫', 'post':'📰','channel':'📡','token':'🪙', 'proposal':'🧎'}
        var item_id = ((item['e5']).toUpperCase()+' • '+item['id'])
        return `${obj[item['type']]} ${item_id}`
    }


    when_link_item_clicked(item){
        var clone = this.state.added_links.slice()
        var pos = clone.indexOf(item)
        if(pos > -1){
            clone.splice(pos, 1)
        }
        this.setState({added_links: clone})
        // this.props.notify('Link removed from object', 700)
    }


    render_searched_link_results(){
        var middle = this.props.height-400;
        var size = this.props.size;
        if(size == 'm'){
            middle = this.props.height-100;
        }
        var items = [].concat(this.state.link_search_results)

        if(items.length == 0){
            items = this.search_for_object('')
        }

        items = this.sort_searched_link_results(items)

        if(items.length == 0){
            items = [0,3,0]
            return(
                <div style={{overflow: 'auto', maxHeight: middle}}>
                        <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                            {items.map((item, index) => (
                                <li style={{'padding': '2px 5px 2px 5px'}} onClick={()=>console.log()}>
                                    <div style={{height:60, width:'100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px','padding':'10px 0px 10px 10px', 'max-width':'420px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                                        <div style={{'margin':'10px 20px 10px 0px'}}>
                                            <img src={this.props.app_state.static_assets['letter']} style={{height:30 ,width:'auto'}} />
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
                        {items.map((item, index) => (
                            <li style={{'padding': '2px 0px 2px 0px'}} onClick={()=>this.when_searched_link_tapped(item)}>
                                {this.render_detail_item('3', {'title':''+this.get_title(item), 'details':item['title'], 'size':'s'})}
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
    }

    sort_searched_link_results(items){
        var selected_item = this.get_selected_item2(this.state.get_sort_links_tags_object, 'e')
        var results = []
        if(selected_item == 0/* e */){
            return items
        }
        else if(selected_item == 1/* 📑 contract */){
            items.forEach(item => {
                if(item['type'] == 'contract'){
                    results.push(item)
                }
            });
        }
        else if(selected_item == 2/* 💼 job */){
            items.forEach(item => {
                if(item['type'] == 'job'){
                    results.push(item)
                }
            });
        }
        else if(selected_item == 3/* 👷🏻‍♀️ contractor */){
            items.forEach(item => {
                if(item['type'] == 'contractor'){
                    results.push(item)
                }
            });
        }
        else if(selected_item == 4/* 🏪 storefront */){
            items.forEach(item => {
                if(item['type'] == 'storefront'){
                    results.push(item)
                }
            });
        }
        else if(selected_item == 5/* 🎫 subscription */){
            items.forEach(item => {
                if(item['type'] == 'subscription'){
                    results.push(item)
                }
            });
        }
        else if(selected_item == 6/* 📰 post */){
            items.forEach(item => {
                if(item['type'] == 'post'){
                    results.push(item)
                }
            });
        }
        else if(selected_item == 7/* 📡 channel */){
            items.forEach(item => {
                if(item['type'] == 'channel'){
                    results.push(item)
                }
            });
        }
        else if(selected_item == 8/* 🪙 token */){
            items.forEach(item => {
                if(item['type'] == 'token'){
                    results.push(item)
                }
            });
        }
        else if(selected_item == 9/* 🧎 proposal */){
            items.forEach(item => {
                if(item['type'] == 'proposal'){
                    results.push(item)
                }
            });
        }

        return results;
    }

    get_selected_item2(object, option){
        return object[option][2][0]
    }

    when_searched_link_tapped(item){
        var clone = this.state.added_links.slice()
        var pos = this.position_of(item, clone)

        if(pos > -1){
            this.props.notify(this.props.app_state.loc['143'], 1700)
        }else{
            clone.push(item)
            this.setState({added_links: clone})
            this.props.notify(this.props.app_state.loc['144'], 1400)
        }
    }

    position_of(item, added_links){
        var pos = -1
        added_links.forEach(element => {
            if(element['id'] == item['id'] && element['e5'] == item['e5']){
                pos = added_links.indexOf(element)
            }
        });
        return pos
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

            <div style={{'position': 'relative', 'width':45, 'height':45, 'padding':'0px 0px 0px 0px'}}>
                <img src={this.props.app_state.static_assets['e5_empty_icon3']} style={{height:45, width:'auto', 'z-index':'1' ,'position': 'absolute'}} />
                <input style={{height:30, width:40, opacity:0, 'z-index':'2' ,'position': 'absolute', 'margin':'5px 0px 0px 0px'}} id="upload" type="file" accept ="image/*" onChange ={this.when_image_gif_picked.bind(this)} multiple/>
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
        var size = this.props.size
        var col = Math.round(400 / 100)
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
                                        <img src={this.props.app_state.static_assets['letter']} style={{height:40 ,width:'auto'}} />
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






    render_recipients_part(){
        return(
            <div>
                {this.render_detail_item('4',{'font':this.props.app_state.font, 'textsize':'14px','text':'Set some recipients for your new mail'})}
                <div style={{height:10}}/>
                <TextInput font={this.props.app_state.font} height={30} placeholder={'Account ID...'} when_text_input_field_changed={this.when_target_recipient_input_field_changed.bind(this)} text={this.state.target_recipient} theme={this.props.theme}/>
                <div style={{height:10}}/>

                <div style={{'padding': '5px'}} onClick={()=>this.add_recipient_account()}>
                    {this.render_detail_item('5', {'text':'Add Account', 'action':''})}
                </div>
                <div style={{height:10}}/>

                {this.render_recipients_transactions()}
            </div>
        )
    }

    when_target_recipient_input_field_changed(text){
        this.setState({target_recipient: text})
    }

    add_recipient_account(){
        var clone = this.state.recipients.slice()
        var recipient = this.state.target_recipient

        if(isNaN(recipient) || parseInt(recipient) < 0 || recipient == ''){
            this.props.notify('please put a valid account id', 600)
        }
        else if(clone.includes(recipient)){
            this.props.notify('you cant include the same recipient twice', 600)
        }
        else{
            clone.push(recipient)
            this.setState({recipients: clone, target_recipient:''})
            this.props.notify('recipent account added!', 600)
        }
    }



    render_recipients_transactions(){
        var middle = this.props.height-500;
        var size = this.props.size;
        if(size == 'm'){
            middle = this.props.height-100;
        }
        var items = [].concat(this.state.recipients)

        if(items.length == 0){
            items = [0, 1]
            return(
                <div style={{}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.map((item, index) => (
                            <li style={{'padding': '5px'}} onClick={()=>console.log()}>
                                <div style={{height:60, width:'100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px','padding':'10px 0px 10px 10px', 'max-width':'420px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                                    <div style={{'margin':'10px 20px 10px 0px'}}>
                                        <img src={this.props.app_state.static_assets['letter']} style={{height:30 ,width:'auto'}} />
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
                            <li style={{'padding': '5px'}} onClick={()=>this.when_item_clicked(item)}>
                                {this.render_detail_item('3', {'title':'Recipient ID: '+item, 'details':'Account', 'size':'s'})}
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
    }


    when_item_clicked(item){
        var cloned_array = this.state.recipients.slice()
        const index = cloned_array.indexOf(item);
        if (index > -1) { // only splice array when item is found
            cloned_array.splice(index, 1); // 2nd parameter means remove one item only
        }
        this.setState({recipients: cloned_array})
        this.props.notify('account removed!', 600)
    }




    load_account_suggestions(){
        var items = [].concat(this.get_suggested_accounts())
        var background_color = this.props.theme['card_background_color']
        var card_shadow_color = this.props.theme['card_shadow_color']
        return(
            <div style={{'margin':'0px 0px 0px 5px','padding': '5px 0px 7px 0px', width: '97%', 'background-color': 'transparent'}}>
                    <ul style={{'list-style': 'none', 'padding': '0px 0px 5px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '13px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                      {items.map((item, index) => (
                          <li style={{'display': 'inline-block', 'margin': '5px 5px 5px 5px', '-ms-overflow-style': 'none'}} onClick={() => this.when_suggestion_clicked(item, index)}>
                              {this.render_detail_item('3', item['label'])}
                          </li>
                      ))}
                  </ul>
                </div>
        )
    }

    get_suggested_accounts(){
        return[
        ].concat(this.get_account_suggestions())
    }

    get_account_suggestions(){
        var contacts = this.props.app_state.contacts[this.props.app_state.selected_e5] == null ? [] : this.props.app_state.contacts[this.props.app_state.selected_e5]
        var return_array = []
        contacts.forEach(contact => {
            if(contact['id'].toString().includes(this.state.target_recipient)){
                return_array.push({'id':contact['id'],'label':{'title':contact['id'], 'details':this.get_contact_alias(contact), 'size':'s'}})
            }
        });
        return return_array
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

    get_contact_alias(contact){
        return (this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[contact['id']] == null ? ((contact['address'].toString()).substring(0, 9) + "...") : this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[contact['id']])
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

    when_suggestion_clicked(item){
        this.setState({target_recipient: item['id']})
    }






    /* renders the specific element in the post or detail object */
    render_detail_item(item_id, object_data){
        return(
            <div>
                <ViewGroups graph_type={this.props.app_state.graph_type} font={this.props.app_state.font} item_id={item_id} object_data={object_data} theme={this.props.theme} add_indexing_tag_for_new_job={this.add_indexing_tag_for_new_job.bind(this)} delete_entered_tag={this.delete_entered_tag_word.bind(this)} when_add_text_button_tapped={this.when_add_text_button_tapped.bind(this)} width={this.props.app_state.width} show_images={this.show_images.bind(this)}/>
            </div>
        )

    }

    show_images(){

    }

    get_recipient_id(recipient){
        var id = (this.get_all_sorted_objects_mappings(this.props.app_state.alias_owners)[recipient] == null ? recipient : this.get_all_sorted_objects_mappings(this.props.app_state.alias_owners)[recipient])

        return id
    }


    finish_creating_object(){
        var index_tags = this.state.entered_indexing_tags
        var title = this.state.entered_title_text
        var recipient = this.state.target_recipient.trim()

        if(isNaN(recipient)){
            recipient = this.get_recipient_id(recipient)
            this.setState({target_recipient: recipient})
        }

        if(index_tags.length < 1){
            this.props.notify(this.props.app_state.loc['160'], 2700)
        }
        else if(title == ''){
            this.props.notify(this.props.app_state.loc['295'], 2700)
        }
        else if(title.length > this.props.app_state.title_size){
            this.props.notify(this.props.app_state.loc['162'], 2700)
        }
        // else if(recipients.length == 0){
        //     this.props.notify('set at least one recipient', 700)
        // }
        else if(isNaN(recipient) || parseInt(recipient) < 0 || recipient == ''){
            this.props.notify(this.props.app_state.loc['296'], 2700)
        }
        else{ 
            // var images_to_add = this.state.entered_image_objects
            // var id = Math.round(new Date().getTime()/1000);
            // if(images_to_add.length != 0){
            //     var cloned_array = this.state.entered_objects.slice()
            //     cloned_array.push({'data':{'images':images_to_add}, 'type':'9', 'id':id})
            //     this.setState({entered_objects: cloned_array, entered_image_objects:[]})
            // }
            
            var me = this;
            this.setState({content_channeling_setting: me.props.app_state.content_channeling,
                device_language_setting :me.props.app_state.device_language,
                device_country :me.props.app_state.device_country,
                e5 :me.props.app_state.selected_e5,})

            setTimeout(function() {
                me.props.when_add_new_mail_to_stack(me.state)
        
                me.setState({ selected: 0, id: makeid(8), type:me.props.app_state.loc['285'], get_new_job_page_tags_object: me.get_new_job_page_tags_object(),get_new_job_text_tags_object: me.get_new_job_text_tags_object(), entered_tag_text: '', entered_title_text:'', entered_text:'', target_recipient:'', entered_indexing_tags:[], entered_text_objects:[], entered_image_objects:[], entered_objects:[], recipients:[], typed_link_text:'', link_search_results:[], added_links:[],})
            }, (1 * 1000));

            this.props.notify(this.props.app_state.loc['18'], 1700);
        }
    }



}




export default NewMailPage;