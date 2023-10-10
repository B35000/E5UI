import React, { Component } from 'react';
import ViewGroups from '../../components/view_groups'
import Tags from '../../components/tags';
import TextInput from '../../components/text_input';
import Letter from '../../assets/letter.png';
import E5EmptyIcon from '../../assets/e5empty_icon.png';
import E5EmptyIcon3 from '../../assets/e5empty_icon3.png';

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Draggable } from "react-drag-reorder";

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
        id: makeid(8), type:'mail', entered_indexing_tags:['send', 'mail'], e5:this.props.app_state.selected_e5,
        get_new_job_page_tags_object: this.get_new_job_page_tags_object(),/* i copypasted these! sue me  */
        get_new_job_text_tags_object: this.get_new_job_text_tags_object(),
        entered_tag_text: '', entered_title_text:'', entered_text:'', target_recipient:'',
        entered_indexing_tags:[], entered_text_objects:[], entered_image_objects:[],
        entered_objects:[], recipients:[]
    };

    get_new_job_page_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['or','',0], ['e','text', 'images'], [0]
            ],
        };
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
                ['xor','e',1], ['font','Sans-serif','Courier New','Times New Roman','Papyrus'], [1],[1]
            ],
            'size':[
                ['xor','e',1], ['size','15px','11px','25px','40px'], [1],[1]
            ],
        };
    }

    render(){
        return(
            <div style={{'padding':'10px 10px 0px 10px'}}>

                <div className="row">
                    <div className="col-9" style={{'padding': '5px 0px 0px 10px'}}>
                        <Tags page_tags_object={this.state.get_new_job_page_tags_object} tag_size={'l'} when_tags_updated={this.when_new_job_page_tags_updated.bind(this)} theme={this.props.theme}/>
                    </div>
                    <div className="col-3" style={{'padding': '0px 0px 0px 0px'}}>
                        <div style={{'padding': '5px'}} onClick={()=>this.finish_creating_object()}>
                            {this.render_detail_item('5', {'text':'Finish', 'action':'finish_creating_object'})}
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
        else if(selected_item == 'text'){
            return(
                <div>
                    {this.render_enter_text_part()}
                </div>
            ) 
        }
        else if(selected_item == 'images'){
            return(
                <div>
                    {this.render_enter_image_part()}
                </div>
            ) 
        }
        else if(selected_item == 'recipients'){
            return(
                <div>
                    {this.render_recipients_part()}
                </div>
            )
        }
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
                    {this.render_new_job_object()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row" style={{'padding': '0px 0px 0px 0px'}}>
                    <div className="col-6" style={{'padding': '0px 0px 0px 0px'}}>
                        {this.render_title_tags_part()}
                    </div>
                    <div className="col-6">
                        {this.render_new_job_object()}
                    </div>
                </div>
                
            )
        }
    }

    render_title_tags_part(){
        return(
            <div style={{'padding':'0px 10px 0px 10px'}}>
                {this.render_detail_item('4',{'font':'Sans-serif', 'textsize':'15px','text':'Set a title for your new mail'})}
                <div style={{height:10}}/>
                <TextInput height={60} placeholder={'Enter Title...'} when_text_input_field_changed={this.when_title_text_input_field_changed.bind(this)} text={this.state.entered_title_text} theme={this.props.theme}/>
                <div style={{height: 10}}/>
                {this.render_detail_item('4',{'font':'Sans-serif', 'textsize':'15px','text':this.state.entered_title_text})}
                {this.render_detail_item('10',{'font':'Sans-serif', 'textsize':'10px','text':'remaining character count: '+(this.props.app_state.title_size - this.state.entered_title_text.length)})}

                {this.render_detail_item('0')}
                {this.render_detail_item('4',{'font':'Sans-serif', 'textsize':'14px','text':'Set the recipient for your message'})}
                <div style={{height:10}}/>
                <TextInput height={30} placeholder={'Account ID...'} when_text_input_field_changed={this.when_target_recipient_input_field_changed.bind(this)} text={this.state.target_recipient} theme={this.props.theme}/>
                {this.load_account_suggestions()}
                <div style={{height:10}}/>

                <div style={{height:'1px', 'background-color':'#C1C1C1', 'margin': '0px 20px 20px 20px'}}/>
                {this.render_detail_item('4',{'font':'Sans-serif', 'textsize':'15px','text':'Set tags for indexing your new Post'})}
                <div style={{height:10}}/>

                <div className="row">
                    <div className="col-9" style={{'margin': '0px 0px 0px 0px'}}>
                        <TextInput height={30} placeholder={'Enter Tag...'} when_text_input_field_changed={this.when_index_text_input_field_changed.bind(this)} text={this.state.entered_tag_text} theme={this.props.theme}/>
                    </div>
                    <div className="col-3" style={{'padding': '0px 5px 0px 0px'}}>
                        {this.render_detail_item('5', {'text':'Add', 'action':'add_indexing_tag'})}
                    </div>
                </div>
                {this.render_detail_item('10',{'font':'Sans-serif', 'textsize':'10px','text':'remaining character count: '+(this.props.app_state.tag_size - this.state.entered_tag_text.length)})}

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
        var typed_word = this.state.entered_tag_text.trim();

        if(typed_word == ''){
            this.props.notify('type something!', 400)
        }
        else if(this.hasWhiteSpace(typed_word)){
            this.props.notify('enter one word!', 400)
        }
        else if(typed_word.length > this.props.app_state.tag_size){
            this.props.notify('That tag is too long', 400)
        }
        else if(typed_word.length < 3){
            this.props.notify('That tag is too short', 400)
        }
        else if(this.state.entered_indexing_tags.includes(typed_word)){
            this.props.notify('you cant enter the same word twice', 400)
        }
        else{
            var cloned_seed_array = this.state.entered_indexing_tags.slice()
            cloned_seed_array.push(typed_word)
            this.setState({entered_indexing_tags: cloned_seed_array, entered_tag_text:''})
            this.props.notify('tag added!', 200)
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
        this.props.notify('tag removed', 200)
    }

   



    
    render_new_job_object(){
        var background_color = this.props.theme['card_background_color']
        var card_shadow_color = this.props.theme['card_shadow_color']
        var items = this.state.entered_objects;
        return ( 
            <div onClick={() => console.log()} style={{height:'auto', 'background-color': background_color, 'border-radius': '15px','padding':'5px 5px 0px 0px', 'box-shadow': '0px 0px 1px 2px '+card_shadow_color, 'margin':'0px 10px 10px 10px'}}>
                <div style={{'padding': '5px 0px 5px 0px'}}>
                    {this.render_detail_item('1',{'active_tags':this.state.entered_indexing_tags, 'indexed_option':'indexed', 'when_tapped':'delete_entered_tag_word'})}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('4',{'font':'Sans-serif', 'textsize':'15px','text':this.state.entered_title_text})}
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
                    {this.render_detail_item('0')}
                    {this.render_entered_texts()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row" style={{'padding': '0px 0px 0px 0px'}}>
                    <div className="col-6" style={{'padding': '0px 0px 0px 0px'}}>
                        {this.render_text_part()}
                    </div>
                    <div className="col-6">
                        {this.render_entered_texts()}
                    </div>
                </div>
                
            )
        }
    }

    render_text_part(){
        return(
            <div style={{'margin':'10px 0px 0px 10px'}}>
                {this.render_detail_item('4',{'font':'Sans-serif', 'textsize':'15px','text':'Enter your preferred text then tap add to add it'})}
                {this.render_detail_item('0')}
                {this.render_detail_item('4',this.get_edited_text_object())}
                <div style={{height:10}}/>
                <Tags page_tags_object={this.state.get_new_job_text_tags_object} tag_size={'l'} when_tags_updated={this.when_new_job_font_style_updated.bind(this)} theme={this.props.theme}/>
                <div style={{height:10}}/>

                <TextInput height={60} placeholder={'Type Something...'} when_text_input_field_changed={this.when_entered_text_input_field_changed.bind(this)} text={this.state.entered_text} theme={this.props.theme}/>
                <div style={{height:10}}/>
                {this.render_detail_item('5', {'text':'Add Text', 'action':'when_add_text_button_tapped'})}
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
        var font = this.get_selected_item(this.state.get_new_job_text_tags_object, 'font')
        var size = this.get_selected_item(this.state.get_new_job_text_tags_object, 'size')
        return{
            'font':font, 'textsize':size,'text':this.state.entered_text
        }
    }

    when_add_text_button_tapped(){
        var typed_word = this.state.entered_text.trim();

        if(typed_word == ''){
            this.props.notify('type something!', 400)
        }else{
            var entered_text = this.get_edited_text_object()
            var cloned_entered_text_array = this.state.entered_text_objects.slice()
            cloned_entered_text_array.push(entered_text);
            this.setState({entered_text_objects: cloned_entered_text_array, entered_text:''})

            var cloned_array = this.state.entered_objects.slice()
            cloned_array.push({'data':entered_text, 'type':'4' })
            this.setState({entered_objects: cloned_array})
        }
    }

    render_entered_texts(){
        var middle = this.props.height-500;
        var size = this.props.size;
        if(size == 'm'){
            middle = this.props.height-100;
        }
        var items = this.state.entered_text_objects
        return ( 
            <div style={{overflow: 'auto', maxHeight: middle}}>
                <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                    {items.reverse().map((item, index) => (
                        <li style={{'padding': '5px'}} onClick={()=>this.when_text_clicked(item)}>
                            {this.render_detail_item('4',item)}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }

    when_text_clicked(item){
        var cloned_array = this.state.entered_text_objects.slice()
        const index = cloned_array.indexOf(item);
        if (index > -1) { // only splice array when item is found
            cloned_array.splice(index, 1); // 2nd parameter means remove one item only
        }
        this.setState({entered_text_objects: cloned_array})

        var entered_objects_pos = -1;
        for(var i=0; i<this.state.entered_objects.length; i++){
            if(this.state.entered_objects[i]['data'] == item){
                entered_objects_pos = i;
            }
        }

        var cloned_array = this.state.entered_objects.slice()
        if (entered_objects_pos > -1) { // only splice array when item is found
            cloned_array.splice(entered_objects_pos, 1); // 2nd parameter means remove one item only
        }
        this.setState({entered_objects: cloned_array})

        this.props.notify('item removed!', 600)
    }






    render_enter_image_part(){
        var size = this.props.size
        return(
            <div style={{'padding': '10px 10px 0px 0px'}}>
                {this.render_detail_item('4',{'font':'Sans-serif', 'textsize':'13px','text':'Black stages gif, grey stages image. Then tap to remove and click add images to add them to the object.'})}
                {this.render_detail_item('10',{'font':'Sans-serif', 'textsize':'10px','text':'Images larger than 500Kb will be ignored.'})}
                {this.render_create_image_ui_buttons_part()}
                {this.render_image_part()}
                {this.render_detail_item('0')}
                {this.render_all_images_part()}
                
            </div>
        )
    }

    /* renders the buttons for pick images, set images and clear images */
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

            <div style={{'padding': '5px', width:205}} onClick={()=>this.add_images_to_object()}>
                {this.render_detail_item('5', {'text':'Add Images', 'action':'-'})}
            </div>

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
                reader.readAsDataURL(e.target.files[i]);
            }
            var image = e.target.files.length == 1 ? 'image has' : 'images have';
            // this.props.notify('Your selected '+e.target.files.length+image+' been staged.',500);
        }
    }

    render_all_images_part(){
        var items = this.get_image_objects()

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






    render_recipients_part(){
        return(
            <div>
                {this.render_detail_item('4',{'font':'Sans-serif', 'textsize':'14px','text':'Set some recipients for your new mail'})}
                <div style={{height:10}}/>
                <TextInput height={30} placeholder={'Account ID...'} when_text_input_field_changed={this.when_target_recipient_input_field_changed.bind(this)} text={this.state.target_recipient} theme={this.props.theme}/>
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
        var items = this.state.recipients

        if(items.length == 0){
            items = [0, 1]
            return(
                <div style={{overflow: 'auto', maxHeight: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.map((item, index) => (
                            <li style={{'padding': '5px'}} onClick={()=>console.log()}>
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
        var items = this.get_suggested_accounts()
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
            {'id':'53', 'label':{'title':'My Account', 'details':'Account', 'size':'s'}},
        ].concat(this.get_account_suggestions())
    }

    get_account_suggestions(){
        var contacts = this.get_all_sorted_objects(this.props.app_state.contacts)
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
                <ViewGroups item_id={item_id} object_data={object_data} theme={this.props.theme} add_indexing_tag_for_new_job={this.add_indexing_tag_for_new_job.bind(this)} delete_entered_tag={this.delete_entered_tag_word.bind(this)} when_add_text_button_tapped={this.when_add_text_button_tapped.bind(this)} width={this.props.app_state.width} show_images={this.show_images.bind(this)}/>
            </div>
        )

    }

    show_images(){

    }



    finish_creating_object(){
        var index_tags = this.state.entered_indexing_tags
        var title = this.state.entered_title_text
        var recipient = this.state.target_recipient.trim()

        if(index_tags.length < 3){
            this.props.notify('add at least 3 tags first!', 700)
        }
        else if(title == ''){
            this.props.notify('add a title for your mail', 700)
        }
        else if(title.length > this.props.app_state.title_size){
            this.props.notify('that title is too long', 700)
        }
        // else if(recipients.length == 0){
        //     this.props.notify('set at least one recipient', 700)
        // }
        else if(isNaN(recipient) || parseInt(recipient) < 0 || recipient == ''){
            this.props.notify('that recipient account is invalid', 700)
        }
        else{ 
            this.props.when_add_new_mail_to_stack(this.state)

            this.setState({ selected: 0, id: makeid(8), type:'mail', entered_indexing_tags:['send', 'mail'], get_new_job_page_tags_object: this.get_new_job_page_tags_object(),/* I copypasted these! sue me */ get_new_job_text_tags_object: this.get_new_job_text_tags_object(), entered_tag_text: '', entered_title_text:'', entered_text:'', target_recipient:'', entered_indexing_tags:[], entered_text_objects:[], entered_image_objects:[], entered_objects:[], recipients:[]})
            
            this.props.notify('transaction added to stack', 700);
        }
    }



}




export default NewMailPage;