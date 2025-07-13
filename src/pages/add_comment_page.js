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

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import imageCompression from 'browser-image-compression';

// import Rating from '@mui/material/Rating'
import Rating from 'react-rating';
import { FaStar } from 'react-icons/fa';

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

class AddCommentPage extends Component {
    
    state = {
        selected: 0, object: null, focused_message_id: 0, page: '', contractor_object: null,
        entered_title_text:'', entered_image_objects:[], award_amount:0, get_comment_font_size_settings_object:this.get_comment_font_size_settings_object(), entered_pdf_objects:[], get_text_or_markdown_tags_object:this.get_text_or_markdown_tags_object(), markdown:'', get_markdown_preview_or_editor_object: this.get_markdown_preview_or_editor_object(), 
        rating:0.0, is_setting_rating: false, rating_total:10.0,

        entered_video_object_dimensions:{}
    };

    get_comment_font_size_settings_object(){
        var obj = {
            'i':{
                active:'e', 
            },
            'e':[
                ['or','',0], ['e','e.'+this.props.app_state.loc['1042b']/* font */, 'e.'+this.props.app_state.loc['1042c']/* size */], [0]
            ],
            'font':[
                ['xor','e',1], ['font','Sans-serif','Courier New','Times New Roman','ComicSans','papyrus'], [1],[1]
            ],
            'size':[
                ['xor','e',1], ['size','15px','11px','25px','40px'], [1],[1]
            ],
        };

        obj[this.props.app_state.loc['1042b']/* font */] = [
            ['xor','e',1], ['font','Sans-serif','Courier New','Times New Roman','ComicSans','papyrus'], [1],[1]
        ]
        obj[this.props.app_state.loc['1042c']/* size */] = [
            ['xor','e',1], ['size','15px','11px','25px','40px'], [1],[1]
        ]
        return obj
    }

    get_text_or_markdown_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e',this.props.app_state.loc['1042g']/* 'text' */, this.props.app_state.loc['1042h']/* 'markdown' */], [1]
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



    set_comment_data(object, focused_message_id, page, contractor_object, starting_text){
        var text = starting_text == null ? '' : starting_text
        var rating_total = page == 'storefront' ? 5.0 : 5.0
        this.setState({object: object, focused_message_id: focused_message_id, page: page, contractor_object: contractor_object, entered_title_text: text, rating_total: rating_total, rating: 0.0, is_setting_rating: false})
    }







    render(){
        return(
            <div style={{'padding':'10px 10px 0px 10px'}}>
                {this.render_top_title()}
                {this.render_everything()}
            </div>
        )
    }

    render_top_title(){
        var size = this.props.app_state.size

        if(size == 's'){
            return(
                <div>
                    <div className="row">
                        <div className="col-10" style={{'padding': '0px 0px 0px 10px'}}>
                            {this.render_detail_item('4',{'font':this.props.app_state.font, 'textsize':'16px','text':this.props.app_state.loc['1038']/* 'Detailed message.' */})}
                        </div>
                        <div className="col-2" style={{'padding': '0px 0px 0px 0px'}}>
                            <div className="text-end" style={{'padding': '3px 10px 0px 0px'}} >
                                <img alt="" className="text-end" onClick={()=>this.finish()} src={this.props.theme['close']} style={{height:36, width:'auto'}} />
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '0px 0px 0px 10px'}}>
                        {this.render_detail_item('4',{'font':this.props.app_state.font, 'textsize':'16px','text':this.props.app_state.loc['1038']/* 'Detailed message.' */})}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        <div className="col-11" style={{'padding': '0px 0px 0px 10px'}}>
                            
                        </div>
                    </div>
                    <div className="col-1" style={{'padding': '0px 0px 0px 0px'}}>
                        <div className="text-end" style={{'padding': '3px 10px 0px 0px'}} >
                            <img alt="" className="text-end" onClick={()=>this.finish()} src={this.props.theme['close']} style={{height:36, width:'auto'}} />
                        </div>
                    </div>
                </div>
                
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" style={{'padding': '0px 0px 0px 10px'}}>
                        {this.render_detail_item('4',{'font':this.props.app_state.font, 'textsize':'16px','text':this.props.app_state.loc['1038']/* 'Detailed message.' */})}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        
                    </div>
                    <div className="col-1" style={{'padding': '0px 0px 0px 0px'}}>
                        <div className="text-end" style={{'padding': '3px 10px 0px 0px'}} >
                            <img alt="" className="text-end" onClick={()=>this.finish()} src={this.props.theme['close']} style={{height:36, width:'auto'}} />
                        </div>
                    </div>
                </div>
                
            )
        }
    }


    render_everything(){
        var size = this.props.app_state.size

        if(size == 's'){
            return(
                <div>
                    {this.render_content()}
                    <div style={{height:10}}/>
                    {this.render_award_ui()}
                    {/* {this.render_finish()} */}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_content()}
                        {/* {this.render_finish()} */}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_award_ui()}
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
                        {/* {this.render_finish()} */}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_award_ui()}
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
                                    <img src={this.props.app_state.theme['letter']} style={{height:30 ,width:'auto'}} />
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    render_content(){
        return(
            <div>
                {this.render_focused_message()}
                <Tags font={this.props.app_state.font} page_tags_object={this.state.get_text_or_markdown_tags_object} tag_size={'l'} when_tags_updated={this.when_get_text_or_markdown_tags_object_updated.bind(this)} theme={this.props.theme}/>
                <div style={{height:10}}/>
                {this.render_text_or_markdown()}
                {this.render_detail_item('0')}

                {this.render_detail_item('4',{'font':this.props.app_state.font, 'textsize':'13px','text':this.props.app_state.loc['1042f']/* 'Gray stages images and black stages a pdf. Then tap to remove.' */})}
                
                {this.render_create_image_ui_buttons_part()}
                {this.render_pdfs_part()}
                <div style={{height:10}}/>
                {this.render_image_part()}
                {this.render_ratings_picker_if_enabled()}
            </div>
        )
    }

    when_get_text_or_markdown_tags_object_updated(tags_obj){
        this.setState({get_text_or_markdown_tags_object: tags_obj})
    }


    render_text_or_markdown(){
        var selected_item = this.get_selected_item(this.state.get_text_or_markdown_tags_object, this.state.get_text_or_markdown_tags_object['i'].active)

        if(selected_item == this.props.app_state.loc['1042g']/* 'text' */){
            return(
                <div>
                    <TextInput font={this.props.app_state.font} height={110} placeholder={this.props.app_state.loc['1039']/* 'Enter Message...' */} when_text_input_field_changed={this.when_title_text_input_field_changed.bind(this)} text={this.state.entered_title_text} theme={this.props.theme}/> 
                    <div style={{height:10}}/>
                    <Tags font={this.props.app_state.font} page_tags_object={this.state.get_comment_font_size_settings_object} tag_size={'l'} when_tags_updated={this.when_get_comment_font_size_settings_object_updated.bind(this)} theme={this.props.theme}/>
                    <div style={{height:10}}/>
                    {this.render_detail_item('4',this.get_edited_text_object())}
                    <div style={{height:10}}/>
                    {this.render_kaomoji_list()}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['1042h']/* 'markdown' */){
            return(
                <div>
                    {this.render_edit_markdown_parts()}
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
                    <div style={{height:10}}/>
                    <TextInput height={120} placeholder={this.props.app_state.loc['a311bs']/* 'New Markdown here...' */} when_text_input_field_changed={this.when_markdown_field_changed.bind(this)} text={this.state.markdown} theme={this.props.theme}/>

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
                <div style={{height:20}}/>
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







    render_ratings_picker_if_enabled(){
        if(!this.can_i_leave_rating_in_object()) return;
        var value = this.state.rating
        var rating_total = this.state.rating_total
        var percentage = Math.floor((value/rating_total) * 100)
        return(
            <div>
                {this.render_detail_item('0')}
                {this.render_detail_item('4',{'font':this.props.app_state.font, 'textsize':'13px','text':this.props.app_state.loc['1042i']/* 'You can also leave a rating if youd like to.' */})}
                <div style={{height:10}}/>
                <div style={{ width: '100%', display: 'flex', alignItems: 'center', 'margin': '0px 0px 0px 10px' }}>
                    <Rating 
                        initialRating={value}
                        onChange={(new_value) => this.when_rating_changed(new_value)}
                        step={1}
                        fractions={10}
                        stop={rating_total}
                        emptySymbol={<FaStar color={this.props.theme['bar_background_color']} size={35} />}
                        fullSymbol={<FaStar color={this.props.theme['bar_color']} size={35} />}
                    />
                    {value > 0 && (
                        <p style={{ 'margin': '2px 0px 0px 10px', color: this.props.theme['primary_text_color'], 'font-family': this.props.app_state.font, 'font-size': '15px' }} onClick={() => this.setState({rating: 0.0, is_setting_rating: false})} className="fw-bold">{percentage}%</p>
                    )}
                </div>
            </div>
        )
    }

    when_rating_changed(newRating){
        this.setState({ rating: newRating, is_setting_rating: true });
    }

    can_i_leave_rating_in_object(){
        const page = this.state.page
        const object = this.state.object
        if(page == 'storefront'){
            const purchases = this.props.app_state.direct_purchases[object['id']]
            if(purchases == null || purchases.length == 0) return false
            for(var i=0; i<purchases.length; i++){
                if(purchases[i]['sender_account'] == this.props.app_state.user_account_id[object['e5']]){
                    return true
                }
            }
            var direct_purchase_option = object['ipfs'].purchase_option_tags_object == null ? 2/* 'disabled' */ : this.get_selected_item2(object['ipfs'].purchase_option_tags_object, 'e')

            if(direct_purchase_option != 1/* 'enabled' */){
                return true
            }

            return false
        }
        else if(page == 'audio'){
            var required_subscriptions = object['ipfs'].selected_subscriptions
            var creator_group_subscriptions = object['ipfs'].creator_group_subscriptions
            if((creator_group_subscriptions != null && creator_group_subscriptions.length > 0) || (required_subscriptions != null && required_subscriptions.length > 0)){
                return true
            }
            const my_albums = this.props.app_state.my_albums
            return my_albums.includes(object['id'])
        }
        else if(page == 'video'){
            var required_subscriptions = object['ipfs'].selected_subscriptions
            var creator_group_subscriptions = object['ipfs'].creator_group_subscriptions
            if((creator_group_subscriptions != null && creator_group_subscriptions.length > 0) || (required_subscriptions != null && required_subscriptions.length > 0)){
                return true
            }
            const my_videos = this.props.app_state.my_videoposts
            return my_videos.includes(object['id'])
        }
        return false
    }





    when_get_comment_font_size_settings_object_updated(tag_obj){
        this.setState({get_comment_font_size_settings_object: tag_obj})
    }

    get_edited_text_object(){
        var font = this.get_selected_item(this.state.get_comment_font_size_settings_object, this.props.app_state.loc['1042b']/* font */)
        var size = this.get_selected_item(this.state.get_comment_font_size_settings_object, this.props.app_state.loc['1042c']/* size */)
        return{
            'font':font, 'textsize':size,'text':this.state.entered_title_text
        }
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
        this.setState({entered_title_text: this.state.entered_title_text+' '+text})
    }

    render_finish(){
        return(
            <div style={{'padding': '5px 0px 0px 0px', 'margin':'10px 0px 20px 0px'}} onClick={()=>this.finish()}>
                {this.render_detail_item('5', {'text':this.props.app_state.loc['4']/* 'Finish' */, 'action':'-'})}
            </div>
        )
    }

    when_title_text_input_field_changed(text){
        this.setState({entered_title_text: text})
    }


    get_selected_item(object, option){
        var selected_item = object[option][2][0]
        var picked_item = object[option][1][selected_item];
        return picked_item
    }



    render_create_image_ui_buttons_part(){
        return(
            <div style={{'display': 'flex','flex-direction': 'row','margin':'0px 0px 0px 0px','padding': '7px 5px 10px 10px', width: '99%'}}>
                <div style={{'position': 'relative', 'width':45, 'height':45, 'padding':'0px 0px 0px 0px', 'margin':'0px 10px 0px 0px'}}>
                    <img alt="" src={this.props.app_state.static_assets['e5_empty_icon3']} style={{height:45, width:'auto', 'z-index':'1' ,'position': 'absolute'}} onClick={() => this.props.show_pick_file_bottomsheet('image', 'create_image', 10**16)}/>
                </div>

                <div style={{'position': 'relative', 'width':45, 'height':45, 'padding':'0px 0px 0px 0px', 'margin':'0px 10px 0px 0px'}}>
                    <img alt="" src={this.props.app_state.static_assets['pdf_icon']} style={{height:45, width:'auto', 'z-index':'1' ,'position': 'absolute', 'border-radius': '50%'}} onClick={() => this.props.show_pick_file_bottomsheet('pdf', 'create_pdf', 10**16)}/>
                </div>

                {this.render_media_pickers_if_valid()}

            </div>
        )
    }

    render_media_pickers_if_valid(){
        const accepted = ['channel', 'mail', 'post']
        if(!accepted.includes(this.state.page)) return;
        return(
            <div style={{'display': 'flex','flex-direction': 'row','margin':'0px 0px 0px 0px','padding': '0px 0px 0px 0px', width: '99%'}}>
                <div style={{'position': 'relative', 'width':45, 'height':45, 'padding':'0px 0px 0px 0px', 'margin':'0px 10px 0px 0px'}}>
                    <img alt="" src={this.props.app_state.static_assets['music_label']} style={{height:45, width:'auto', 'z-index':'1' ,'position': 'absolute', 'border-radius': '50%'}} onClick={() => this.props.show_pick_file_bottomsheet('audio', 'create_audio_pick_audio_file', 10**16)}/>
                </div>

                <div style={{'position': 'relative', 'width':45, 'height':45, 'padding':'0px 0px 0px 0px', 'margin':'0px 10px 0px 0px'}}>
                    <img alt="" src={this.props.app_state.static_assets['video_label']} style={{height:45, width:'auto', 'z-index':'1' ,'position': 'absolute', 'border-radius': '50%'}} onClick={() => this.props.show_pick_file_bottomsheet('video', 'create_video_pick_video_file', 10**16)}/>
                </div>

                <div style={{'position': 'relative', 'width':45, 'height':45, 'padding':'0px 0px 0px 0px', 'margin':'0px 10px 0px 0px'}}>
                    <img alt="" src={this.props.app_state.static_assets['zip_file']} style={{height:45, width:'auto', 'z-index':'1' ,'position': 'absolute', 'border-radius': '50%'}} onClick={() => this.props.show_pick_file_bottomsheet('zip', 'create_zip', 10**16)}/>
                </div>
            </div>
        )
    }


    /* called when images have been picked from picker */
    when_image_gif_picked = (e) => {
        if(e.target.files && e.target.files[0]){
            for(var i = 0; i < e.target.files.length; i++){ 
                let reader = new FileReader();
                reader.onload = async function(ev){
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
        clonedArray = clonedArray.concat(files)
        this.setState({entered_image_objects: clonedArray});
    }

    when_pdf_files_picked(files){
        var clonedArray = this.state.entered_pdf_objects == null ? [] : this.state.entered_pdf_objects.slice();
        var clone = structuredClone(this.state.entered_video_object_dimensions)
        files.forEach(file => {
            if(!clonedArray.includes(file)){
                clonedArray.push(file);

                var ecid_obj = this.get_cid_split(file)
                if(this.props.app_state.uploaded_data[ecid_obj['filetype']] != null){
                    var data = this.props.app_state.uploaded_data[ecid_obj['filetype']][ecid_obj['full']]
                    if(data['width'] != null && data['height'] != null){
                        clone[file] = {'width': data['width'], 'height': data['height']}
                    }
                }
            }
        });
        this.setState({entered_pdf_objects: clonedArray, entered_video_object_dimensions: clone});
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




    render_image_part(){
        var col = Math.round(400 / 100)
        var rowHeight = 100;

        if(this.state.entered_image_objects.length == 0){
            var items = ['1','1','1']
            var background_color = this.props.theme['card_background_color']
            return(
                <div>
                    <ImageList sx={{ width: 400, height: 'auto' }} cols={col} rowHeight={rowHeight}>
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
            var items = [].concat(this.state.entered_image_objects)
            var background_color = this.props.theme['card_background_color']
            return(
                <div>
                    <ImageList sx={{ width: 'auto', height: 'auto' }} cols={col} rowHeight={rowHeight}>
                        {items.map((item, index) => (
                            <ImageListItem key={item.img}>
                                <div onClick={() => this.when_image_clicked(index)}>
                                    {this.render_image_item(item, index)}
                                </div> 
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





    render_focused_message(){
        var item = this.state.focused_message_id;
        if(item != null && item != 0 && item['ipfs'] != null){
            item = item['ipfs']
        }
        if(item != 0 && item != null){
            return(
                <div>
                    {this.render_space_if_small_screen()}
                    <div style={{'padding': '7px 15px 10px 15px','margin':'0px 0px 10px 0px', 'background-color': this.props.theme['messsage_reply_background'],'border-radius': '10px 10px 10px 10px'}}> 
                        <div className="row" style={{'padding':'0px 0px 0px 0px'}}>
                            <div className="col-9" style={{'padding': '0px 0px 0px 14px', 'height':'20px' }}> 
                                <p style={{'color': this.props.theme['primary_text_color'], 'font-size': '14px', 'margin':'0px'}} >{this.get_sender_title_text(item)}</p>
                            </div>
                            <div className="col-3" style={{'padding': '0px 15px 0px 0px','height':'20px'}}>
                                <p style={{'color': this.props.theme['secondary_text_color'], 'font-size': '9px', 'margin': '3px 0px 0px 0px'}} className="text-end">{this.get_time_difference(item['time'])}</p>
                            </div>
                        </div>
                        <p style={{'font-size': '11px','color': this.props.theme['secondary_text_color'],'margin': '0px 0px 0px 0px','font-family': this.props.app_state.font,'text-decoration': 'none', 'white-space': 'pre-line'}}>{this.truncate(item['message'], 41)}</p>
                    </div>
                </div>
                
            )
        }else{
            return(
                <div>
                    <div style={{height:10}}/>
                </div>
            )
        }
    }

    get_sender_title_text(item){
        if(item['sender'] == this.props.app_state.user_account_id[this.state.object['e5']]){
            return 'You'
        }else{
            var alias = (this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[item['sender']] == null ? item['sender'] : this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[item['sender']])
            return alias
        }
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

    truncate(source, size) {
        return source.length > size ? source.slice(0, size - 1) + "…" : source;
    }

    render_space_if_small_screen(){
        var size = this.props.app_state.size
        if(size == 's'){
            return(
                <div>
                    <div style={{height:10}}/>
                </div>
            )
        }
    }






    render_award_ui(){
        var focused_message_id = this.state.focused_message_id;
        if(focused_message_id == 0) return;
        // if(focused_message_id['e5'] != this.props.app_state.selected_e5) return;
        if(this.state.award_target_account_or_address_on_my_e5 == null) return;
        var award_amount = this.state.award_amount
        var my_balance = this.props.calculate_actual_balance(this.props.app_state.selected_e5, 5)
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['1164']/* 'Award Tiers' */, 'details':this.props.app_state.loc['1042a']/* 'Pick an award tier you wish to send to the comment\'s author.' */, 'size':'l'})}
                {this.load_award_tiers()}
                <div style={{height:10}}/>

                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['1168']/* 'Total amount of SPEND' */, 'number':award_amount, 'relativepower':'SPEND'})}>
                    {this.render_detail_item('2', {'style':'l', 'title':this.props.app_state.loc['1168']/* 'Total amount of SPEND' */, 'subtitle':this.format_power_figure(award_amount), 'barwidth':this.calculate_bar_width(award_amount), 'number':this.format_account_balance_figure(award_amount), 'barcolor':'', 'relativepower':'SPEND', })}
                </div>
                <div style={{height:10}}/>
                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['1042d']/* 'Your balance in SPEND.' */, 'number':award_amount, 'relativepower':'SPEND'})}>
                    {this.render_detail_item('2', {'style':'l', 'title':this.props.app_state.loc['1042d']/* 'Your balance in SPEND.' */, 'subtitle':this.format_power_figure(my_balance), 'barwidth':this.calculate_bar_width(my_balance), 'number':this.format_account_balance_figure(my_balance), 'barcolor':'', 'relativepower':'SPEND', })}
                </div>
                <div style={{height:10}}/>
            </div>
        )
    }

    load_award_tiers(){
        var items = [].concat(this.get_award_tiers())
        return(
            <div style={{'margin':'0px 0px 0px 5px','padding': '5px 0px 0px 0px', width: '97%', 'background-color': 'transparent'}}>
                <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '13px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden', 'scrollbar-width': 'none'}}>
                    {items.map((item, index) => (
                        <li style={{'display': 'inline-block', 'margin': '5px 5px 5px 5px', '-ms-overflow-style': 'none'}} onClick={() => this.when_tier_clicked(item, index)}>
                            {this.render_tier_element(item, index)}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    get_award_tiers(){
        var tiers = [
            {'id':'1', 'label':{'title':'🌕', 'details':this.props.app_state.loc['1171']/* 'Gold' */, 'size':'l'}},
            {'id':'2', 'label':{'title':'💎', 'details':this.props.app_state.loc['1172']/* 'Diamond' */, 'size':'l'}},
            {'id':'3', 'label':{'title':'🪙', 'details':this.props.app_state.loc['1173']/* 'Silver' */, 'size':'l'}},
            {'id':'4', 'label':{'title':'🛢️', 'details':this.props.app_state.loc['1174']/* 'Oil' */, 'size':'l'}},
            {'id':'5', 'label':{'title':'🪵', 'details':this.props.app_state.loc['1175']/* 'Wood' */, 'size':'l'}},
            {'id':'6', 'label':{'title':'🍺', 'details':this.props.app_state.loc['1176']/* 'Beer' */, 'size':'l'}},
            {'id':'7', 'label':{'title':'🌽', 'details':this.props.app_state.loc['1177']/* 'Corn' */, 'size':'l'}},
            {'id':'8', 'label':{'title':'🥩', 'details':this.props.app_state.loc['1178']/* 'Beef' */, 'size':'l'}},
            {'id':'9', 'label':{'title':'🍫', 'details':this.props.app_state.loc['1179']/* 'Chocolate' */, 'size':'l'}},
        ]

        return tiers
    }

    get_award_amount(tier){
        var spend_exchange = this.props.app_state.created_token_object_mapping[this.state.object['e5']][5]
        var min_amount = bigInt(spend_exchange['data'][1][0]).divide(bigInt(10000))
        var obj = {'1':5000, '2':1000, '3':600, '4':300, '5':100, '6':50, '7':10, '8':5, '9':1}
        return bigInt(obj[tier]).multiply(min_amount)
    }

    render_tier_element(item, index){
        if(this.state.selected_tier == index){
            return(
                <div>
                    {this.render_detail_item('3', item['label'])}
                    <div style={{height:'1px', 'background-color':this.props.app_state.theme['line_color'], 'margin': '5px 0px 0px 0px'}}/>
                </div>
            )
        }else{
            return(
                <div>
                    {this.render_detail_item('3', item['label'])}
                </div>
            )
        }
    }

    when_tier_clicked(item, index){
        if(this.state.selected_tier == index){
            this.setState({selected_tier: null, selected_tier_object: null, award_amount:0})
            this.set_award_amount(index)
        }else{
            this.setState({selected_tier: index, selected_tier_object: item})
            this.set_award_amount(index)
        }
    }

    set_award_amount(selected_tier){
        if(selected_tier != null){
            var award_amount = this.get_award_amount(this.get_award_tiers()[selected_tier]['id'])
            this.setState({award_amount: award_amount})
        }
    }










    

    set_focused_message_target_account(account_or_address){
        this.setState({award_target_account_or_address_on_my_e5: account_or_address})
    }


    finish(){
        var object = this.state.object
        if(this.props.app_state.user_account_id[this.props.app_state.selected_e5] == 1){
            this.props.notify(this.props.app_state.loc['1040']/* 'You need to make at least 1 transaction to participate.' */, 1200)
            return
        }
        var message = this.state.entered_title_text.trim()
        var markdown = this.state.markdown
        var message_id = Date.now()
        var focused_message_id = this.state.focused_message_id == 0 ? 0 : this.state.focused_message_id['message_id']

        if(message == '' && markdown == ''){
            this.props.notify(this.props.app_state.loc['1041']/* 'Type something.' */, 1700)
            return
        }
        var tx = {};
        var page = this.state.page

        var award_tier = this.state.selected_tier_object == null ? '' : this.state.selected_tier_object;
        var award_amount = this.state.award_amount
        // var award_receiver = this.state.focused_message_id != 0 ? this.state.focused_message_id['sender'] : 0
        var award_receiver = this.state.award_target_account_or_address_on_my_e5 == null ? 0 : this.state.award_target_account_or_address_on_my_e5

        if(award_amount != 0){
            if(this.props.calculate_actual_balance(this.props.app_state.selected_e5, 5) < award_amount){
                this.props.notify(this.props.app_state.loc['2909a']/* 'You dont have enough spend to include that award.' */, 4000)
                return;
            }
        }

        var font = this.get_selected_item(this.state.get_comment_font_size_settings_object, this.props.app_state.loc['1042b']/* font */)
        var size = this.get_selected_item(this.state.get_comment_font_size_settings_object, this.props.app_state.loc['1042c']/* size */)

        if((size == '25px' && message.length > 75) || (size == '40px' && message.length > 45)){
            this.props.notify(this.props.app_state.loc['1042e']/* 'that message is inconveniencingly long for its size.' */, 4000)
            return;
        }

        const rating = this.state.is_setting_rating == true ? this.state.rating : null
        const rating_total = this.state.rating_total

        if(page == 'channel'){
            var unencrypted_keys = object['unencrypted_keys']
            var key_to_use = ''
            var key_index = 0
            if(unencrypted_keys != null && unencrypted_keys.length > 0){
                key_to_use = unencrypted_keys[unencrypted_keys.length-1]
                key_index = unencrypted_keys.length-1
            }
            tx = {'id':object['id'], type:'image', 'message': message, entered_indexing_tags:['send', 'image'], 'image-data':{'images':this.state.entered_image_objects,'pos':0}, 'sender':this.props.app_state.user_account_id[this.props.app_state.selected_e5],'time':Date.now()/1000, 'message_id':message_id, 'focused_message_id':focused_message_id, 'e5':object['e5'], 'award_tier':award_tier, 'award_amount':award_amount, 'award_receiver':award_receiver, 'font':font, 'size':size, 'pdf-data':this.state.entered_pdf_objects, 'markdown':markdown, 'sender_e5':this.props.app_state.selected_e5, 'key_to_use':key_to_use, 'key_index':key_index, 'lan':this.props.app_state.device_language, 'dim':this.state.entered_video_object_dimensions}
        }
        else if(page == 'job'){
            tx = {'id':object['id'], type:'image', 'message': message, entered_indexing_tags:['send', 'image'], 'image-data':{'images':this.state.entered_image_objects,'pos':0}, 'sender':this.props.app_state.user_account_id[this.props.app_state.selected_e5],'time':Date.now()/1000, 'message_id':message_id, 'focused_message_id':focused_message_id, 'e5':object['e5'], 'award_tier':award_tier, 'award_amount':award_amount, 'award_receiver':award_receiver, 'font':font, 'size':size, 'pdf-data':this.state.entered_pdf_objects, 'markdown':markdown, 'sender_e5':this.props.app_state.selected_e5, 'lan':this.props.app_state.device_language}
        }
        else if(page == 'mail'){
            var mail = object;
            var convo_id = mail['convo_id']
            var recipients_e5 = mail['author'] == this.props.app_state.user_account_id[mail['ipfs']['e5']] ? mail['ipfs']['recipients_e5'] : mail['ipfs']['e5']

            tx = {convo_id: convo_id, type:'image', 'message': message, entered_indexing_tags:['send', 'image'], 'image-data':{'images':this.state.entered_image_objects,'pos':0}, 'sender':this.props.app_state.user_account_id[this.props.app_state.selected_e5], 'recipient':mail['convo_with'],'time':Date.now()/1000, 'message_id':message_id, 'focused_message_id':focused_message_id, 'e5':object['e5'], 'award_tier':award_tier, 'award_amount':award_amount, 'award_receiver':award_receiver, 'font':font, 'size':size, 'pdf-data':this.state.entered_pdf_objects, 'markdown':markdown, 'my_pub_key':this.props.app_state.my_pub_key, 'my_preferred_account_id':this.props.app_state.user_account_id[this.props.app_state.selected_e5], 'my_preferred_e5':this.props.app_state.selected_e5, 'recipients_e5':recipients_e5, 'lan':this.props.app_state.device_language, 'dim':this.state.entered_video_object_dimensions}
        }
        else if(page == 'post'){
            tx = {'id':object['id'], type:'image', 'message': message, entered_indexing_tags:['send', 'image'], 'image-data':{'images':this.state.entered_image_objects,'pos':0,}, 'message_id':message_id, 'focused_message_id':focused_message_id, 'sender':this.props.app_state.user_account_id[this.props.app_state.selected_e5],'time':Date.now()/1000, 'e5':object['e5'], 'award_tier':award_tier, 'award_amount':award_amount, 'award_receiver':award_receiver, 'font':font, 'size':size, 'pdf-data':this.state.entered_pdf_objects, 'markdown':markdown, 'sender_e5':this.props.app_state.selected_e5, 'lan':this.props.app_state.device_language, 'dim':this.state.entered_video_object_dimensions}
        }
        else if(page == 'proposal'){
            tx = {'id':object['id'], type:'image', 'message': message, entered_indexing_tags:['send', 'image'], 'image-data':{'images':this.state.entered_image_objects,'pos':0,}, 'message_id':message_id, 'focused_message_id':focused_message_id, 'sender':this.props.app_state.user_account_id[this.props.app_state.selected_e5],'time':Date.now()/1000, 'e5':object['e5'], 'award_tier':award_tier, 'award_amount':award_amount, 'award_receiver':award_receiver, 'font':font, 'size':size, 'pdf-data':this.state.entered_pdf_objects, 'markdown':markdown, 'sender_e5':this.props.app_state.selected_e5, 'lan':this.props.app_state.device_language}
        }
        else if(page == 'storefront'){
            tx = {'id':object['id'], type:'image', 'message': message, entered_indexing_tags:['send', 'image'], 'image-data':{'images':this.state.entered_image_objects,'pos':0}, 'sender':this.props.app_state.user_account_id[this.props.app_state.selected_e5],'time':Date.now()/1000, 'message_id':message_id, 'focused_message_id':focused_message_id, 'e5':object['e5'], 'award_tier':award_tier, 'award_amount':award_amount, 'award_receiver':award_receiver, 'font':font, 'size':size, 'pdf-data':this.state.entered_pdf_objects, 'markdown':markdown, 'sender_e5':this.props.app_state.selected_e5, 'rating':rating, 'rating_total':rating_total, 'lan':this.props.app_state.device_language}
        }
        else if(page == 'bag'){
            tx = {'id':object['id'], type:'image', 'message': message, entered_indexing_tags:['send', 'image'], 'image-data':{'images':this.state.entered_image_objects,'pos':0}, 'sender':this.props.app_state.user_account_id[this.props.app_state.selected_e5],'time':Date.now()/1000, 'message_id':message_id, 'focused_message_id':focused_message_id, 'e5':object['e5'], 'award_tier':award_tier, 'award_amount':award_amount, 'award_receiver':award_receiver, 'font':font, 'size':size, 'pdf-data':this.state.entered_pdf_objects, 'markdown':markdown, 'sender_e5':this.props.app_state.selected_e5, 'lan':this.props.app_state.device_language}
        }
        else if(page == 'request'){
            var key_data = object['key_data']
            tx = {'id':object['job_request_id'], type:'image', 'message': message, entered_indexing_tags:['send', 'image'], 'image-data':{'images':this.state.entered_image_objects,'pos':0}, 'sender':this.props.app_state.user_account_id[this.props.app_state.selected_e5],'time':Date.now()/1000, 'message_id':message_id, 'focused_message_id':focused_message_id, 'contractor_id':this.state.contractor_object, 'e5':object['e5'], 'award_tier':award_tier, 'award_amount':award_amount, 'award_receiver':award_receiver, 'font':font, 'size':size, 'pdf-data':this.state.entered_pdf_objects, 'markdown':markdown, 'sender_e5':this.props.app_state.selected_e5, 'key_data':key_data, 'lan':this.props.app_state.device_language}
        }
        else if(page == 'audio'){
            tx = {'id':object['id'], type:'image', 'message': message, entered_indexing_tags:['send', 'image'], 'image-data':{'images':this.state.entered_image_objects,'pos':0,}, 'message_id':message_id, 'focused_message_id':focused_message_id, 'sender':this.props.app_state.user_account_id[this.props.app_state.selected_e5],'time':Date.now()/1000, 'e5':object['e5'], 'award_tier':award_tier, 'award_amount':award_amount, 'award_receiver':award_receiver, 'font':font, 'size':size, 'pdf-data':this.state.entered_pdf_objects, 'markdown':markdown, 'sender_e5':this.props.app_state.selected_e5, 'rating':rating, 'rating_total':rating_total, 'lan':this.props.app_state.device_language}
        }
        else if(page == 'video'){
            tx = {'id':object['id'], type:'image', 'message': message, entered_indexing_tags:['send', 'image'], 'image-data':{'images':this.state.entered_image_objects,'pos':0,}, 'message_id':message_id, 'focused_message_id':focused_message_id, 'sender':this.props.app_state.user_account_id[this.props.app_state.selected_e5],'time':Date.now()/1000, 'e5':object['e5'], 'award_tier':award_tier, 'award_amount':award_amount, 'award_receiver':award_receiver, 'font':font, 'size':size, 'pdf-data':this.state.entered_pdf_objects, 'markdown':markdown, 'sender_e5':this.props.app_state.selected_e5, 'rating':rating, 'rating_total':rating_total, 'lan':this.props.app_state.device_language}
        }
        else if(page == 'nitro'){
            tx = {'id':object['id'], type:'image', 'message': message, entered_indexing_tags:['send', 'image'], 'image-data':{'images':this.state.entered_image_objects,'pos':0,}, 'message_id':message_id, 'focused_message_id':focused_message_id, 'sender':this.props.app_state.user_account_id[this.props.app_state.selected_e5],'time':Date.now()/1000, 'e5':object['e5'], 'award_tier':award_tier, 'award_amount':award_amount, 'award_receiver':award_receiver, 'font':font, 'size':size, 'pdf-data':this.state.entered_pdf_objects, 'markdown':markdown, 'sender_e5':this.props.app_state.selected_e5, 'lan':this.props.app_state.device_language}
        }
        else if(page == 'video-comment'){
            tx = {'id':object['video_id'], type:'image', 'message': message, entered_indexing_tags:['send', 'image'], 'image-data':{'images':this.state.entered_image_objects,'pos':0}, 'sender':this.props.app_state.user_account_id[this.props.app_state.selected_e5],'time':Date.now()/1000, 'message_id':message_id, 'focused_message_id':focused_message_id, 'videopost_id':this.state.contractor_object, 'e5':object['e5'], 'award_tier':award_tier, 'award_amount':award_amount, 'award_receiver':award_receiver, 'font':font, 'size':size, 'pdf-data':this.state.entered_pdf_objects, 'markdown':markdown, 'sender_e5':this.props.app_state.selected_e5, 'lan':this.props.app_state.device_language}
        }

        this.props.add_comment_to_respective_forum_page(tx, page)
        this.setState({entered_title_text: '', entered_image_objects:[], get_comment_font_size_settings_object:this.get_comment_font_size_settings_object(), markdown:'', entered_pdf_objects:[], award_amount:0})
        this.props.notify(this.props.app_state.loc['1042']/* 'Message added to stack.' */, 1600)
    }









    /* renders the specific element in the post or detail object */
    render_detail_item(item_id, object_data){
        return(
            <div>
                <ViewGroups graph_type={this.props.app_state.graph_type} font={this.props.app_state.font} item_id={item_id} object_data={object_data} theme={this.props.theme} width={this.props.app_state.width} />
            </div>
        )

    }

    /* gets a formatted time diffrence from now to a given time */
    get_time_difference(time){
        var number_date = Math.round(parseInt(time));
        var now = Math.round(new Date().getTime()/1000);

        var diff = now - number_date;
        return this.get_time_diff(diff)
    }

    format_proportion(proportion){
        return ((proportion/10**18) * 100)+'%';
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

    get_selected_item2(object, option){
        return object[option][2][0]
    }


}




export default AddCommentPage;