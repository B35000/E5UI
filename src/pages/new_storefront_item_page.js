import React, { Component } from 'react';
import ViewGroups from './../components/view_groups';
import Tags from './../components/tags';
import TextInput from './../components/text_input';
import NumberPicker from './../components/number_picker';

import Letter from './../assets/letter.png';
import E5EmptyIcon from './../assets/e5empty_icon.png';
import E5EmptyIcon3 from './../assets/e5empty_icon3.png';

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Draggable } from "react-drag-reorder";

var bigInt = require("big-integer");

function number_with_commas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

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

class NewStorefrontItemPage extends Component {
    
    state = {
        id: makeid(32), type:'storefront-item',
        get_new_job_page_tags_object: this.get_new_job_page_tags_object(),
        get_new_job_text_tags_object: this.get_new_job_text_tags_object(),
        entered_tag_text: '', entered_title_text:'', entered_text:'',
        entered_indexing_tags:[], entered_text_objects:[], entered_image_objects:[],
        entered_objects:[], exchange_id:'', price_amount:0, price_data:[],
        purchase_option_tags_object:this.get_purchase_option_tags_object(), available_unit_count:0
    };

    get_new_job_page_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['or','',0], ['e','text', 'images', 'item-price'], [0]
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


    get_purchase_option_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e','direct', 'via-contract'], [1]
            ],
        };
    }




    render(){
        return(
            <div style={{'padding':'10px 20px 0px 10px'}}>

                <div className="row">
                    <div className="col-10" style={{'padding': '0px 0px 0px 10px'}}>
                        <Tags page_tags_object={this.state.get_new_job_page_tags_object} tag_size={'l'} when_tags_updated={this.when_new_job_page_tags_updated.bind(this)} theme={this.props.theme}/>
                    </div>
                    <div className="col-2" style={{'padding': '0px 0px 0px 0px'}}>
                        <div style={{'padding': '5px'}} onClick={()=>this.finish_creating_object()}>
                            {this.render_detail_item('5', {'text':'Finish', 'action':'finish_creating_object'})}
                        </div>
                        
                    </div>
                </div>
                
                
                <div style={{'margin':'20px 0px 0px 0px'}}>
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
        else if(selected_item == 'item-price'){
            return(
                <div>
                    {this.render_enter_item_price_part()}
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
            <div style={{'padding':'0px 15px 0px 10px'}}>
                {this.render_detail_item('4',{'font':'Sans-serif', 'textsize':'15px','text':'Set a title for your new Storefront Item'})}
                <div style={{height:10}}/>
                <TextInput height={30} placeholder={'Enter Title...'} when_text_input_field_changed={this.when_title_text_input_field_changed.bind(this)} text={this.state.entered_title_text} theme={this.props.theme}/>

                {this.render_detail_item('0')}
                {this.render_detail_item('4',{'font':'Sans-serif', 'textsize':'15px','text':'Set tags for indexing your new Storefront Item'})}
                <div style={{height:10}}/>

                <div className="row">
                    <div className="col-9" style={{'margin': '0px 0px 0px 10px'}}>
                        <TextInput height={30} placeholder={'Enter Tag...'} when_text_input_field_changed={this.when_index_text_input_field_changed.bind(this)} text={this.state.entered_tag_text} theme={this.props.theme}/>
                    </div>
                    <div className="col-2" style={{'padding': '0px 5px 0px 0px'}}>
                        {this.render_detail_item('5', {'text':'Add', 'action':'add_indexing_tag'})}
                    </div>
                </div>
                {this.render_detail_item('0')}

                {this.render_detail_item('3', {'title':'Purchase Options', 'details':'If set to direct, buyers will make direct transfers when adding the items to their bags and carts while via-contract, youre set to receive a contract (if the item is of high value)', 'size':'l'})}

                <div style={{height:20}}/>
                <Tags page_tags_object={this.state.purchase_option_tags_object} tag_size={'l'} when_tags_updated={this.when_purchase_option_tags_object.bind(this)} theme={this.props.theme}/>

                {this.render_detail_item('0')}

                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                    {this.render_detail_item('2', { 'style':'l', 'title':'Number of Units', 'subtitle':this.format_power_figure(this.state.available_unit_count), 'barwidth':this.calculate_bar_width(this.state.available_unit_count), 'number':this.format_account_balance_figure(this.state.available_unit_count), 'barcolor':'', 'relativepower':'units', })}
                </div>

                <NumberPicker number_limit={bigInt('1e72')} when_number_picker_value_changed={this.when_available_unit_count.bind(this)} theme={this.props.theme} power_limit={63}/>


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

    when_purchase_option_tags_object(tag_obj){
        this.setState({purchase_option_tags_object: tag_obj})
    }

    when_available_unit_count(number){
        this.setState({available_unit_count: number})
    }

    add_indexing_tag_for_new_job(){
        var typed_word = this.state.entered_tag_text.trim();

        if(typed_word == ''){
            this.props.notify('type something!', 400)
        }
        else if(this.hasWhiteSpace(typed_word)){
            this.props.notify('enter one word!', 400)
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
                <div style={{'padding': '5px 0px 5px 5px'}}>
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
                {this.render_detail_item('4',{'font':'Sans-serif', 'textsize':'15px','text':'Black picks gif, grey picks image. Then tap to remove.'})}
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
                    clonedArray.push(ev.target.result);
                    this.setState({entered_image_objects: clonedArray});
                }.bind(this);
                reader.readAsDataURL(e.target.files[i]);
            }
            var image = e.target.files.length == 1 ? 'image has' : 'images have';
            this.props.notify('Your selected '+e.target.files.length+image+' been added.',500);
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






    render_enter_item_price_part(){
        var size = this.props.size
        var height = this.props.height-150

        if(size == 's'){
            return(
                <div style={{overflow: 'auto', maxHeight: height}}>
                    {this.render_set_token_and_amount_part()}
                    <div style={{height: 20}}/>
                    {this.render_set_prices_list_part()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row" style={{'padding': '0px 0px 0px 20px', overflow: 'auto', maxHeight: height}}>
                    <div className="col-6" style={{'padding': '0px 0px 0px 0px'}}>
                        {this.render_set_token_and_amount_part()}
                    </div>
                    <div className="col-6">
                        {this.render_set_prices_list_part()}
                    </div>
                </div>
                
            )
        }
    }


    render_set_token_and_amount_part(){
        return(
            <div>
                {this.render_detail_item('3', {'title':'Exchange ID', 'details':'The an exchange by its id, then the desired price and click add', 'size':'l'})}

                <div style={{height:10}}/>
                <TextInput height={30} placeholder={'Exchange ID'} when_text_input_field_changed={this.when_exchange_id_input_field_changed.bind(this)} text={this.state.exchange_id} theme={this.props.theme}/>

                {this.load_token_suggestions('exchange_id')}
                <div style={{height: 20}}/>

                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                    {this.render_detail_item('2', { 'style':'l', 'title':'Price', 'subtitle':this.format_power_figure(this.state.price_amount), 'barwidth':this.calculate_bar_width(this.state.price_amount), 'number':this.format_account_balance_figure(this.state.price_amount), 'barcolor':'', 'relativepower':'transactions', })}
                </div>

                <NumberPicker number_limit={bigInt('1e72')} when_number_picker_value_changed={this.when_price_amount.bind(this)} theme={this.props.theme} power_limit={63}/>

                {this.render_detail_item('0')}

                <div style={{'padding': '5px'}} onClick={() => this.when_add_price_set()}>
                    {this.render_detail_item('5', {'text':'Add Price', 'action':''})}
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
        var exchange_id = this.state.exchange_id
        var amount = this.state.price_amount
        if(isNaN(exchange_id)){
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
        var middle = this.props.height-500;
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
                            <li style={{'padding': '5px'}} onClick={()=>console.log()}>
                                <div style={{height:140, width:'100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px','padding':'10px 0px 0px 10px', 'max-width':'420px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                                    <div style={{'margin':'10px 20px 0px 0px'}}>
                                        <img src={Letter} style={{height:40 ,width:'auto'}} />
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
                                    {this.render_detail_item('2', { 'style':'l', 'title':'Exchange ID: '+item['id'], 'subtitle':this.format_power_figure(item['amount']), 'barwidth':this.calculate_bar_width(item['amount']), 'number':this.format_account_balance_figure(item['amount']), 'barcolor':'', 'relativepower':'tokens', })}
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
        // var stack_items = this.props.app_state.stack_items;
        // for(var i=0; i<stack_items.length; i++){
        //     if(stack_items[i].type == 'token'){
        //         items.push({'id':'-'+i, 'label':{'title':'TOKEN', 'details':'Stack Account '+i, 'size':'s'}})
        //     }
        // }

        return items;
    }

    when_price_suggestion_clicked(item, pos, target_type){
        this.setState({exchange_id: item['id']})
    }



    /* renders the specific element in the post or detail object */
    render_detail_item(item_id, object_data){
        return(
            <div>
                <ViewGroups item_id={item_id} object_data={object_data} theme={this.props.theme} add_indexing_tag_for_new_job={this.add_indexing_tag_for_new_job.bind(this)} delete_entered_tag={this.delete_entered_tag_word.bind(this)} when_add_text_button_tapped={this.when_add_text_button_tapped.bind(this)} width={this.props.app_state.width} />
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



    finish_creating_object(){
        var index_tags = this.state.entered_indexing_tags
        var title = this.state.entered_title_text
        var texts = this.state.entered_text_objects
        var images = this.state.entered_image_objects
        var id = Math.round(new Date().getTime()/1000);

        if(index_tags.length == 0){
            this.props.notify('add some tags first!', 700)
        }
        else if(title == ''){
            this.props.notify('add a title for your Item', 700)
        }else{
            
            var data = this.state;
            this.props.add_data_to_new_store_item(data)

            this.setState({ id: makeid(32), get_new_job_page_tags_object: this.get_new_job_page_tags_object(), get_new_job_text_tags_object: this.get_new_job_text_tags_object(), entered_tag_text: '', entered_title_text:'', entered_text:'', entered_indexing_tags:[], entered_text_objects:[], entered_image_objects:[], entered_objects:[], exchange_id:'', price_amount:0, price_data:[],
            purchase_option_tags_object:this.get_purchase_option_tags_object(), available_unit_count:0 })

            this.props.notify('transaction added to stack', 700);
        }
    }


    set_fileds_for_edit_action(obj){
        this.setState(obj)
    }


}




export default NewStorefrontItemPage;