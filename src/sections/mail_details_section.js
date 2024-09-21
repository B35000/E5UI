import React, { Component } from 'react';
import ViewGroups from './../components/view_groups'
import Tags from './../components/tags';
import TextInput from './../components/text_input';
// import Letter from './../assets/letter.png'; 
// import E5EmptyIcon from './../assets/e5empty_icon.png';
// import E5EmptyIcon3 from './../assets/e5empty_icon3.png';

import { SwipeableList, SwipeableListItem } from '@sandstreamdev/react-swipeable-list';
import '@sandstreamdev/react-swipeable-list/dist/styles.css';
import Linkify from "linkify-react";

var bigInt = require("big-integer");

function bgN(number, power) {
  return bigInt((number+"e"+power)).toString();
}

function number_with_commas(x) {
    if(x == null) x = '';
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

class MailDetailsSection extends Component {
    
    state = {
        selected: 0, navigate_view_mail_list_detail_tags_object: this.get_navigate_view_mail_list_detail_tags_object_tags(), entered_text:'', entered_image_objects:[],
        stacked_messages:[{}], focused_message:{'tree':{}}
    };

    get_navigate_view_mail_list_detail_tags_object_tags(){
        return{
          'i':{
              active:'e', 
          },
          'e':[
              ['xor','',0], ['e',this.props.app_state.loc['2510']/* 'data' */,this.props.app_state.loc['1674']/* 'activity' */],[1]
          ],
        }
    }

    render(){
        return(
            <div>
                {this.render_mail_list_detail()}
            </div>
        )
    }


    render_mail_list_detail(){
        if(this.props.selected_mail_item == null){
            return(
                <div>
                    {this.render_empty_detail_object()}
                </div>
            )
        }else{
            return(
                <div>
                    {this.render_mail_details_section()}
                    <div style={{ width:'100%','padding':'0px 0px 0px 0px','margin':'0px 0px 0px 0px', 'max-width':'470px'}}>
                        <Tags font={this.props.app_state.font} page_tags_object={this.state.navigate_view_mail_list_detail_tags_object} tag_size={'l'} when_tags_updated={this.when_navigate_view_mail_list_detail_tags_object_updated.bind(this)} theme={this.props.theme}/>
                    </div>
                </div>
            )
        }
    }

    render_empty_detail_object(){
        var background_color = this.props.theme['card_background_color']
        var he = this.props.height
        return(
            <div>
                <div style={{height:he, 'background-color': 'transparent', 'border-radius': '15px','padding':'10px 5px 5px 10px','display': 'flex', 'align-items':'center','justify-content':'center','margin':'0px 0px 10px 0px'}}>
                    <img src={this.props.app_state.static_assets['letter']} style={{height:70 ,width:'auto'}} />
                </div>
            </div>
        )
    }

    when_navigate_view_mail_list_detail_tags_object_updated(tag_obj){
        this.setState({navigate_view_mail_list_detail_tags_object: tag_obj})
    }


    get_item_in_array(object_array, id){
        var object = object_array.find(x => x['id'] === id);
        return object
    }


    render_mail_details_section(){
        var selected_item = this.get_selected_item(this.state.navigate_view_mail_list_detail_tags_object, this.state.navigate_view_mail_list_detail_tags_object['i'].active)
        var object = this.get_item_in_array(this.get_mail_items(), this.props.selected_mail_item);
        if(object == null){
            return(
                <div>
                    {this.render_empty_detail_object()}
                </div>
            )
        }

        if(object!=null){
            if(selected_item == this.props.app_state.loc['2510']/* 'data' */){
                return(
                    <div>
                        {this.render_mail_main_details_section(object)}
                    </div>
                )
            }else if(selected_item == this.props.app_state.loc['1674']/* 'activity' */){
                return(
                    <div>
                        {this.render_mail_responses(object)}
                    </div>
                )
                
            }
        }
    }

    render_mail_main_details_section(object){
        var background_color = this.props.theme['card_background_color']
        var he = this.props.height-55
        var size = this.props.screensize
       
        // var object = this.get_mail_items()[this.props.selected_mail_item];
        var item = this.get_mail_details_data(object)
        var items = object['ipfs'] == null ? [] : object['ipfs'].entered_objects
        return(
            <div style={{'background-color': background_color, 'border-radius': '15px','margin':'5px 10px 5px 10px', 'padding':'0px 10px 0px 10px'}}>
                <div style={{ 'overflow-y': 'auto', width:'99%', height: he, padding:'0px 10px 0px 10px'}}>
                    {this.render_detail_item('1', item['tags'])}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('4', item['id'])}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', {'title':''+(this.get_senders_name(object['event'].returnValues.p2, object)), 'details':this.props.app_state.loc['2070']/* 'Author' */, 'size':'l'})}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', {'title':''+(this.get_senders_name(object['event'].returnValues.p1,object)), 'details':this.props.app_state.loc['888']/* 'Recipient' */, 'size':'l'})}
                    <div style={{height: 10}}/>
                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>
                        {this.render_detail_item('2', item['age'])}
                    </div>
                    {this.render_detail_item('0')}
                    {this.render_item_data(items, object)}
                    {this.render_item_images(object)}
                    {this.render_selected_links(object)}

                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            </div>
        )
    }

    render_selected_links(object){
        if(object['ipfs'].added_links == null) return;
        var items = [].concat(object['ipfs'].added_links).reverse()

        return(
            <div style={{'margin':'0px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                    {items.map((item, index) => (
                        <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}} onClick={()=>this.when_link_item_clicked(item, object)}>
                            {this.render_detail_item('3', {'title':this.get_title(item), 'details':this.truncate(item['title'], 15), 'size':'s', 'padding':'7px 12px 7px 12px'})}
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


    when_link_item_clicked(item, object){
        this.props.open_e5_link(item, object)
    }

    get_senders_name(sender, object){
        // var object = this.get_mail_items()[this.props.selected_mail_item];
        if(sender == this.props.app_state.user_account_id[object['e5']]){
            return this.props.app_state.loc['1694']/* 'You' */
        }else{
            var alias = (this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[sender] == null ? sender : this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[sender])
            return alias
        }
    }

    render_item_data(items, object){
        var middle = this.props.height-200;
        var size = this.props.size;
        if(size == 'm'){
            middle = this.props.height-100;
        }
        if(items.length == 0){
            items = [0, 1, 2]
            return(
                <div>
                    <div style={{overflow: 'auto', maxHeight: middle}}>
                        <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                            {items.map((item, index) => (
                                <li style={{'padding': '2px 5px 2px 5px'}} onClick={()=>console.log()}>
                                    <div style={{height:60, width:'100%', 'background-color': this.props.theme['view_group_card_item_background'], 'border-radius': '15px','padding':'10px 0px 10px 10px', 'display': 'flex', 'align-items':'center','justify-content':'center'}}>
                                        <div style={{'margin':'10px 20px 10px 0px'}}>
                                            <img src={this.props.app_state.static_assets['letter']} style={{height:30 ,width:'auto'}} />
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )
        }else{
            return(
                <div>
                    {items.map((item, index) => (
                        <div key={index}>
                            {this.render_detail_item(item['type'], item['data'])} 
                            <div style={{height:2}}/>
                        </div>
                    ))}
                </div>
            )
        }
    }

    render_item_images(object){
        var images_to_add = object['ipfs'].entered_image_objects
        if(images_to_add.length == 0) return;
        return(
            <div>
                {this.render_detail_item('9', {'images':images_to_add, 'pos':0})}
            </div>
        )
    }


    get_mail_items(){
        return this.props.get_mail_items()
    }



    get_mail_details_data(object){
        // var tags_to_use = [object['type']];
        var tags = object['ipfs'] == null ? ['Mail'] : [object['e5']].concat(object['ipfs'].entered_indexing_tags)
        var final_tags = [].concat(tags)
        var title = object['ipfs'] == null ? 'Mail ID' : object['ipfs'].entered_title_text
        var age = object['event'] == null ? 0 : object['event'].returnValues.p7
        var time = object['event'] == null ? 0 : object['event'].returnValues.p6
        return {
            'tags':{'active_tags':final_tags, 'index_option':'indexed'},
            'id':{'textsize':'14px', 'text':title, 'font':this.props.app_state.font},
            'age':{'style':'l', 'title':this.props.app_state.loc['1744']/* 'Block Number' */, 'subtitle':'age', 'barwidth':this.get_number_width(age), 'number':`${number_with_commas(age)}`, 'barcolor':'', 'relativepower':`${this.get_time_difference(time)} ago`, }
        }
    }














    render_mail_responses(object){
        var he = this.props.height-100
        if(this.get_focused_message(object) != null) he = this.props.height-175
        var size = this.props.screensize
        var ww = '80%'
        if(size == 'l') ww = '90%'
        if(this.props.app_state.width > 1100){
            ww = '80%'
        }
        if(object != null){
            return(
                <div>
                    <div style={{ 'background-color': 'transparent', 'border-radius': '15px','margin':'0px 0px 0px 0px', 'padding':'0px 0px 0px 0px', 'max-width':'470px'}}>
                        <div onScroll={event => this.handleScroll(event, object)} style={{ 'overflow-y': 'auto', height: he, padding:'5px 0px 5px 0px'}}>
                            {this.render_top_title(object)}
                            {/* {this.render_focus_list(object)} */}
                            <div style={{height:'1px', 'background-color':'#C1C1C1', 'margin': '10px 20px 10px 20px'}}/>
                            {this.render_sent_received_messages(object)}
                        </div>
                    </div>
                    {this.render_focused_message(object)}
                    <div style={{'display': 'flex','flex-direction': 'row','margin':'0px 0px 5px 5px', width: '99%'}}>
                        <div style={{'margin':'1px 0px 0px 0px'}}>
                            {/* {this.render_image_picker()} */}
                            <div>
                                <div style={{'position': 'relative', 'width':45, 'height':45, 'padding':'0px 0px 0px 0px'}} onClick={()=> this.when_circle_clicked(object)}>
                                    <img alt="" src={this.props.app_state.static_assets['e5_empty_icon3']} style={{height:45, width:'auto', 'z-index':'1' ,'position': 'absolute'}}/>
                                </div>
                            </div>
                        </div>
                        <div style={{width:10}}/>
                        <div className="row" style={{width:ww}}>
                            <div className="col-11" style={{'margin': '0px 0px 0px 0px'}}>
                                <TextInput font={this.props.app_state.font} height={20} placeholder={this.props.app_state.loc['1039']/* 'Enter Message...' */} when_text_input_field_changed={this.when_entered_text_input_field_changed.bind(this)} text={this.state.entered_text} theme={this.props.theme}/>
                            </div>
                            <div className="col-1" style={{'padding': '0px 10px 0px 0px'}}>
                                <div className="text-end" style={{'padding': '5px 0px 0px 0px'}} >
                                    <img alt="" className="text-end" onClick={()=>this.add_message_to_stack(object)} src={this.props.theme['add_text']} style={{height:37, width:'auto'}} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div> 
            )
        }
        
    }

    when_circle_clicked = (object) => {
        let me = this;
        if(Date.now() - this.last_all_click_time2 < 200){
            clearTimeout(this.all_timeout);
            //double tap
            me.scroll_to_bottom()
        }else{
            this.all_timeout = setTimeout(function() {
                clearTimeout(this.all_timeout);
                // single tap
                me.show_add_comment_bottomsheet(object)
            }, 200);
        }
        this.last_all_click_time2 = Date.now();
    }

    scroll_to_bottom(){
        this.is_auto_scrolling = true
        this.messagesEnd.current?.scrollIntoView({ behavior: "smooth" });
        var me = this;
        setTimeout(function() {
            me.is_auto_scrolling = false
        }, (1 * 500));
    }

    handleScroll = (event, object) => {
        if(!this.is_auto_scrolling) this.has_user_scrolled[object['e5_id']] = true
    };

    render_focused_message(object){
        var item_arg = this.get_focused_message(object);
        var item = item_arg
        if(item != null && item['ipfs'] != null){
            item = item_arg['ipfs']
        }
        if(item != null){ 
            return(
                <div style={{'padding': '7px 15px 10px 15px','margin':'0px 70px 5px 50px', 'background-color': this.props.theme['messsage_reply_background'],'border-radius': '10px 10px 10px 10px'}} onClick={()=>this.unfocus_message(object)}> 
                    <div className="row" style={{'padding':'0px 0px 0px 0px'}}>
                        <div className="col-9" style={{'padding': '0px 0px 0px 14px', 'height':'20px' }}> 
                            <p style={{'color': this.props.theme['primary_text_color'], 'font-size': '14px', 'margin':'0px'}} >{this.get_sender_title_text(item, object)}</p>
                        </div>
                        <div className="col-3" style={{'padding': '0px 15px 0px 0px','height':'20px'}}>
                            <p style={{'color': this.props.theme['secondary_text_color'], 'font-size': '9px', 'margin': '3px 0px 0px 0px'}} className="text-end">{this.get_time_difference(item['time'], object)}</p>
                        </div>
                    </div>
                    <p style={{'font-size': '11px','color': this.props.theme['secondary_text_color'],'margin': '0px 0px 0px 0px','font-family': this.props.app_state.font,'text-decoration': 'none', 'white-space': 'pre-line'}}>{this.truncate(item['message'], 41)}</p>
                </div>
            )
        }
    }

    show_add_comment_bottomsheet(object){
        // var object = this.get_mail_items()[this.props.selected_mail_item];
        var focused_message_id = this.get_focused_message(object) != null ? this.get_focused_message(object)['message_id'] : 0
        this.props.show_add_comment_bottomsheet(object, focused_message_id, 'mail')
    }

    render_top_title(mail){
        // var mail = this.get_mail_items()[this.props.selected_mail_item];
        var sender = this.get_account_alias(mail['sender'], mail)
        var recipient = this.get_account_alias(mail['recipient'], mail)
        return(
            <div style={{padding:'5px 5px 5px 5px'}}>
                {this.render_detail_item('3', {'title':sender+this.props.app_state.loc['2512']/* ' with ' */+recipient, 'details':this.props.app_state.loc['2513']/* 'conversation' */, 'size':'l'})} 
            </div>
        )
    }

    get_account_alias(sender, object){
        if(sender == this.props.app_state.user_account_id[object['e5']]){
            return 'You'
        }else{
            var alias = (this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[sender] == null ? sender : this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[sender])
            return alias
        }
    }

    constructor(props) {
        super(props);
        this.messagesEnd = React.createRef();
        this.has_user_scrolled = {}
    }

    componentDidUpdate(){
        // var has_scrolled = this.has_user_scrolled[this.props.selected_mail_item]
        // if(has_scrolled == null){
        //     this.scroll_to_bottom()
        // }
    }


    render_sent_received_messages(object){
        var middle = this.props.height-200;
        if(this.get_focused_message(object) != null) middle = this.props.height-300
        var size = this.props.size;
        if(size == 'm'){
            middle = this.props.height-100;
        }
        var items = [].concat(this.get_convo_messages(object))
        var stacked_items = [].concat(this.get_stacked_items(object))

        if(items.length == 0 && stacked_items.length == 0){
            items = [0,1]
            return(
                <div>
                    <div style={{overflow: 'auto', maxHeight: middle}}>
                        <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                            {items.map((item, index) => (
                                <li style={{'padding': '2px 5px 2px 5px'}} onClick={()=>console.log()}>
                                    <div style={{height:60, width:'100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px','padding':'10px 0px 10px 10px', 'display': 'flex', 'align-items':'center','justify-content':'center'}}>
                                        <div style={{'margin':'10px 20px 10px 0px'}}>
                                            <img src={this.props.app_state.static_assets['letter']} style={{height:30 ,width:'auto'}} />
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )
        }
        // else if(this.get_focused_message(object) != null){
        //     var focused_message_replies = this.get_focused_message_replies(object)
        //     return(
        //         <div>
        //             <div style={{'padding': '2px 5px 2px 5px'}}>
        //                 {this.render_message_as_focused_if_so(this.get_focused_message(object), object)}
        //             </div>
        //             <div style={{'display': 'flex','flex-direction': 'row','margin':'0px 0px 5px 5px'}}>
        //                 <div style={{overflow: 'auto', 'width':'100%', maxHeight: middle}}>
        //                     <ul style={{ 'padding': '0px 0px 0px 20px', 'listStyle':'none'}}>
        //                         {this.render_messages(focused_message_replies, object)}
        //                         <div ref={this.messagesEnd}/>
        //                     </ul>
        //                 </div>
        //             </div>
        //         </div>
        //     )
        // }
        else{
            return(
                <div style={{overflow: 'scroll'}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        <div ref={this.messagesEnd}/>
                        {this.render_messages(items.concat(stacked_items), object)}
                    </ul>
                </div>
            )
        }
    }

    render_messages(items, object){
        var middle = this.props.height-200;        
        if(items.length == 0){
            var items = [0,1]
            return(
                <div>
                    <div style={{overflow: 'auto', maxHeight: middle}}>
                        <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                            {items.map((item, index) => (
                                <li style={{'padding': '2px 5px 2px 5px'}} onClick={()=>console.log()}>
                                    <div style={{height:60, width:'100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px','padding':'10px 0px 10px 10px', 'display': 'flex', 'align-items':'center','justify-content':'center'}}>
                                        <div style={{'margin':'10px 20px 10px 0px'}}>
                                            <img src={this.props.app_state.static_assets['letter']} style={{height:30 ,width:'auto'}} />
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )
        }
        else{
            return(
                <div style={{'display': 'flex', 'flex-direction': 'column-reverse'}}>
                    {items.map((item, index) => (
                        <li style={{'padding': '2px 5px 2px 5px'}} onClick={()=>console.log()}>
                            <div>
                                {this.render_message_as_focused_if_so(item, object)}
                                <div style={{height:3}}/>
                            </div>
                        </li>
                    ))}    
                </div>
            )
        }
        
    }

    focus_message(item, object){
        var clone = JSON.parse(JSON.stringify(this.state.focused_message))
        // var object = this.get_mail_items()[this.props.selected_mail_item];

        if(this.state.focused_message[object['id']] != item){
            clone[object['id']] = item
            if(clone['tree'][object['id']] == null) {
                clone['tree'][object['id']] = []
            }
            // if(!this.includes_function(clone['tree'][object['id']], item)){
            // }
            clone['tree'][object['id']].push(item)
        }
        this.setState({focused_message: clone})
    }

    // includes_function(array, item){
    //     var return_value = false;
    //     array.forEach(element => {
    //         if(element['id'] == item['id']){
    //             console.log('found clone: '+item['id'])
    //             return_value = true
    //         }
    //     });
    //     return return_value
    // }

    unfocus_message(object){
        var clone = JSON.parse(JSON.stringify(this.state.focused_message))
        // var object = this.get_mail_items()[this.props.selected_mail_item];
        if(clone['tree'][object['id']] != null){
            var index = this.get_index_of_item(object)
            if(index != -1){
                clone['tree'][object['id']].splice(index, 1)
            }
        }

        var latest_message = clone['tree'][object['id']].length > 0 ? clone['tree'][object['id']][clone['tree'][object['id']].length -1] : null
        clone[object['id']] = latest_message
        this.setState({focused_message: clone})
    }

    get_index_of_item(object){
        // var object = this.get_mail_items()[this.props.selected_mail_item];
        var focused_item = this.state.focused_message[object['id']]
        var focused_items = this.state.focused_message['tree'][object['id']]
        var pos = -1
        for(var i=0; i<focused_items.length; i++){
            if(focused_items[i]['message_id'] == focused_item['message_id']){
                pos = i
                break
            }
        }
        return pos
    }

    render_message_as_focused_if_so(item, object){
        return(
            <div>
                <SwipeableList>
                        <SwipeableListItem
                            swipeLeft={{
                            content: <p style={{'color': this.props.theme['primary_text_color']}}>{this.props.app_state.loc['2507a']/* Reply */}</p>,
                            action: () => this.focus_message(item, object)
                            }}>
                            <div style={{width:'100%', 'background-color':this.props.theme['send_receive_ether_background_color']}}>{this.render_stack_message_item(item, object)}</div>
                        </SwipeableListItem>
                    </SwipeableList>
            </div>
        )
        var focused_message = this.get_focused_message(object)

        if(item == focused_message){
            return(
                <div>
                    <SwipeableList>
                        <SwipeableListItem
                            swipeLeft={{
                            content: <div>Focus</div>,
                            action: () => console.log()
                            }}
                            swipeRight={{
                            content: <div>Unfocus</div>,
                            action: () => this.unfocus_message(object)
                            }}>
                            <div style={{width:'100%', 'background-color':this.props.theme['send_receive_ether_background_color']}}>{this.render_stack_message_item(item, object)}</div>
                        </SwipeableListItem>
                    </SwipeableList>
                    {/* <div onClick={(e) => this.when_message_clicked(e, item, 'focused_message')}>
                        {this.render_stack_message_item(item)}
                    </div> */}
                    <div style={{height:'1px', 'background-color':'#C1C1C1', 'margin': '5px 20px 5px 20px'}}/>
                </div>
            )
        }else{
            return(
                <div>
                    <SwipeableList>
                        <SwipeableListItem
                            swipeLeft={{
                            content: <div>Focus</div>,
                            action: () => this.focus_message(item, object)
                            }}
                            swipeRight={{
                            content: <div>Unfocus</div>,
                            action: () => this.unfocus_message(object)
                            }}>
                            <div style={{width:'100%', 'background-color':this.props.theme['send_receive_ether_background_color']}}>{this.render_stack_message_item(item, object)}</div>
                        </SwipeableListItem>
                    </SwipeableList>
                    {/* <div onClick={(e) => this.when_message_clicked(e, item)}>
                        {this.render_stack_message_item(item)}
                    </div> */}
                </div>
            )
        }
    }

    when_message_clicked = (event, item, focused_message) => {
        let me = this;
        if(Date.now() - this.last_all_click_time < 200){
            //double tap
            me.when_message_double_tapped(item)
            clearTimeout(this.all_timeout);
        }else{
            this.all_timeout = setTimeout(function() {
                clearTimeout(this.all_timeout);
                // single tap
                
            }, 200);
        }
        this.last_all_click_time = Date.now();
    }


    when_message_double_tapped(item){
        var message = item['message'];
        this.copy_to_clipboard(message)
    }

    copy_to_clipboard(signature_data){
        navigator.clipboard.writeText(signature_data)
        this.props.notify(this.props.app_state.loc['1692']/* 'Copied message to clipboard.' */, 600)
    }

    render_stack_message_item(item_arg, object){
        var item = item_arg
        if(item['ipfs'] != null){
            item = item_arg['ipfs']
        }

        return(
            <div>
                <div style={{'padding': '7px 15px 10px 15px','margin':'0px 0px 0px 0px', 'background-color': this.props.theme['view_group_card_item_background'],'border-radius': '7px'}}>
                    
                    <div className="row" style={{'padding':'0px 0px 0px 0px'}}>
                        <div className="col-9" style={{'padding': '0px 0px 0px 14px', 'height':'20px' }}> 
                            <p style={{'color': this.props.theme['primary_text_color'], 'font-size': '14px', 'margin':'0px'}} onClick={()=>this.props.add_id_to_contacts(item['sender'], object)} >{this.get_sender_title_text(item, object)}</p>
                        </div>
                        <div className="col-3" style={{'padding': '0px 15px 0px 0px','height':'20px'}}>
                            <p style={{'color': this.props.theme['secondary_text_color'], 'font-size': '9px', 'margin': '3px 0px 0px 0px'}} className="text-end">{this.get_time_difference(item['time'], object)}</p>
                        </div>
                    </div>
                    <p style={{'font-size': '11px','color': this.props.theme['secondary_text_color'],'margin': '0px 0px 0px 0px','font-family': this.props.app_state.font,'text-decoration': 'none', 'white-space': 'pre-line'}} onClick={(e) => this.when_message_clicked(e, item)}><Linkify options={{target: '_blank'}}>{this.format_message(item['message'], object)}</Linkify></p>

                    {this.render_image_if_image_message(item)}

                    <p style={{'font-size': '8px','color': this.props.theme['primary_text_color'],'margin': '1px 0px 0px 0px','font-family': this.props.app_state.font,'text-decoration': 'none', 'white-space': 'pre-line'}} className="fw-bold">{this.get_message_replies(item, object).length} responses</p>
                </div>
                {this.render_response_if_any(item, object)}
            </div>
        )
   
    }

    render_response_if_any(_item, object){
        console.log(_item)
        if(_item['focused_message_id'] == 0) return;
        // if(this.get_focused_message(object) != null) return;
        var message_items = this.get_convo_messages(object).concat(this.get_stacked_items(object))
        var item = this.get_item_in_message_array(_item['focused_message_id'], message_items)
        console.log(item)
        if(item == null) return;
        if(item['ipfs'] != null){
            item = item['ipfs']
        }
        // 
        
        return(
            <div style={{'padding': '7px 15px 10px 15px','margin':'2px 5px 0px 20px', 'background-color': this.props.theme['messsage_reply_background'],'border-radius': '0px 0px 10px 10px'}}> 
                <div className="row" style={{'padding':'0px 0px 0px 10px'}}>
                    <div className="col-9" style={{'padding': '0px 0px 0px 0px', 'height':'20px' }}> 
                        <p style={{'color': this.props.theme['primary_text_color'], 'font-size': '14px', 'margin':'0px'}} onClick={()=>this.props.add_id_to_contacts(item['sender'], item, object)} >{this.get_sender_title_text(item, object)}</p>
                    </div>
                    <div className="col-3" style={{'padding': '0px 15px 0px 0px','height':'20px'}}>
                        <p style={{'color': this.props.theme['secondary_text_color'], 'font-size': '9px', 'margin': '3px 0px 0px 0px'}} className="text-end">{this.get_time_difference(item['time'], object)}</p>
                    </div>
                </div>
                <p style={{'font-size': '11px','color': this.props.theme['secondary_text_color'],'margin': '0px 0px 0px 0px','font-family': this.props.app_state.font,'text-decoration': 'none', 'white-space': 'pre-line'}}>{this.truncate(item['message'], 53)}</p>
            </div>
        )
    }

    truncate(source, size) {
        return source.length > size ? source.slice(0, size - 1) + "…" : source;
    }

    get_item_in_message_array(message_id, object_array){
        var object = object_array.find(x => x['message_id'] === message_id);
        if(object == null){
            try{
                object = object_array.find(x => x['ipfs']['message_id'] === message_id);
            }catch(e){
                console.log(e)
            } 
        } 
        return object
    }

    render_image_if_image_message(item){
        if(item.type == 'image'){
            return(
                <div>
                    {this.render_detail_item('9',item['image-data'])}
                </div>
            )
        }
    }

    get_sender_title_text(item, object){
        // var object = this.get_mail_items()[this.props.selected_mail_item];
        if(item['sender'] == this.props.app_state.user_account_id[object['e5']]){
            return this.props.app_state.loc['1694']/* 'You' */
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

    format_message(message){
        if(message == ''){
            return '...'
        }
        return message
    }

    get_convo_messages(mail){
        var all_messages = []
        // var mail = this.get_mail_items()[this.props.selected_mail_item];
        var convo_id = mail['convo_id']

        var created_mail = this.get_combined_created_mail('created_mail')
        var received_mail = this.get_combined_created_mail('received_mail')
        
        var created_messages = created_mail['mail_activity'][convo_id]
        var received_messages = received_mail['mail_activity'][convo_id]

        if(received_messages != null){
            for(var i=0; i<received_messages.length; i++){
                if(received_messages[i]['ipfs'].entered_title_text == null){
                    all_messages.push(received_messages[i])
                }
            }
        }
        if(created_messages != null){
            for(var i=0; i<created_messages.length; i++){
                if(created_messages[i]['ipfs'].entered_title_text == null){
                    all_messages.push(created_messages[i])
                }
            }
        }

        all_messages = (this.sortByAttributeDescending(all_messages, 'time')).reverse()
        
        // console.log('---------------------------get_convo_messages------------------------')
        // console.log(all_messages)

        // if(mail['type'] == 'received'){
        //     var received_mail = this.get_combined_created_mail('received_mail')
        //     var messages = received_mail['mail_activity'][convo_id]
        //     for(var i=0; i<messages.length; i++){
        //         if(i!=0){
        //             all_messages.push(messages[i])
        //         }
        //     }
        // }
        return all_messages
    }

    get_combined_created_mail(created_or_received){
        var created_mail = []
        var mail_activity = {}
        var created_mail_obj = created_or_received == 'created_mail' ? this.props.app_state.created_mail : this.props.app_state.received_mail
        for(var i=0; i<this.props.app_state.e5s['data'].length; i++){
            var e5 = this.props.app_state.e5s['data'][i]
            var e5_data = created_mail_obj[e5]

            if(e5_data && e5_data[created_or_received] != null){
                created_mail = created_mail.concat(e5_data[created_or_received])

                var mail_activity_clone = structuredClone(mail_activity)
                mail_activity = { ...mail_activity_clone, ...e5_data['mail_activity']}
            }

            
        }

        if(created_or_received == 'created_mail'){
            return {'created_mail':created_mail, 'mail_activity':mail_activity}
        }else{
            return {'received_mail':created_mail, 'mail_activity':mail_activity}
        }
    }

    sortByAttributeDescending(array, attribute) {
      return array.sort((a, b) => {
          if (parseInt(a[attribute]) < parseInt(b[attribute])) {
          return 1;
          }
          if (parseInt(a[attribute]) > parseInt(b[attribute])) {
          return -1;
          }
          if(parseInt(a[attribute]) == parseInt(b[attribute])){
              if(a['ipfs']['time'] < b['ipfs']['time']){
                  return 1
              }
              if(a['ipfs']['time'] > b['ipfs']['time']){
                  return -1
              }
          }
          return 0;
      });
    }

    get_stacked_items(mail){
        // var mail = this.get_mail_items()[this.props.selected_mail_item];
        var convo_id = mail['convo_id']

        var stack = this.props.app_state.stack_items
        var stacked_items = []
        for(var i=0; i<stack.length; i++){
            if(stack[i].type == 'mail-messages'){
                for(var e=0; e<stack[i].messages_to_deliver.length; e++){
                    var message_obj = stack[i].messages_to_deliver[e]
                    if(message_obj.convo_id == convo_id){
                        stacked_items.push(message_obj)
                    }
                }
            }
        }
        return stacked_items
    }

    get_focused_message_replies(object){
        var all_messages = this.get_convo_messages(object).concat(this.get_stacked_items(object))
        var focused_message_message_id = this.get_focused_message_message_id(object)
        var replies = []
        for(var i=0; i<all_messages.length; i++){
            var focused_message_id = this.get_focused_message_id(all_messages[i])
            if(focused_message_id != null && focused_message_message_id != null &&  focused_message_id == focused_message_message_id){
                replies.push(all_messages[i])
            }
        }
        
        return replies
    }

    get_focused_message_message_id(object){
        var focused_message = this.get_focused_message(object)
        var focused_message_message_id = 0
        if(focused_message['ipfs'] != null){
            focused_message_message_id = focused_message['ipfs']['message_id'];
        }else{
            focused_message_message_id = focused_message['message_id'];
        }
        return focused_message_message_id
    }

    get_focused_message_id(message){
        if(message['ipfs'] != null){
            return message['ipfs']['focused_message_id']
        }else{
            return message['focused_message_id']
        }
    }

    get_message_replies(item, object){
        var all_messages = this.get_convo_messages(object).concat(this.get_stacked_items(object))
        var replies = []
    
        for(var i=0; i<all_messages.length; i++){
            var focused_message_id = this.get_focused_message_id(all_messages[i])
            if(focused_message_id != null && item['message_id'] != null &&  focused_message_id == item['message_id']){
                replies.push(all_messages[i])
            }
            
        }
        return replies
    }

    get_focused_message(object){
        // var object = this.get_mail_items()[this.props.selected_mail_item];
        return this.state.focused_message[object['id']]
    }

    render_image_picker(){
        return(
            <div>
                <div style={{'position': 'relative', 'width':45, 'height':45, 'padding':'0px 0px 0px 0px'}}>
                    <img src={this.props.app_state.static_assets['e5_empty_icon3']} style={{height:45, width:'auto', 'z-index':'1' ,'position': 'absolute'}} />
                    <input style={{height:30, width:40, opacity:0, 'z-index':'2' ,'position': 'absolute', 'margin':'5px 0px 0px 0px'}} id="upload" type="file" accept ="image/*" onChange ={this.when_image_gif_picked.bind(this)}/>
                </div>
            </div>
        )
    }

    /* called when images have been picked from picker */
    when_image_gif_picked = (e) => {
        if(e.target.files && e.target.files[0]){
            for(var i = 0; i < e.target.files.length; i++){ 
                let reader = new FileReader();
                reader.onload = function(ev){
                    var image = ev.target.result
                    this.add_image_to_stack(image)
                }.bind(this);
                reader.readAsDataURL(e.target.files[i]);
            }
            // var image = e.target.files.length == 1 ? 'image has' : 'images have';
            // this.props.notify('Your selected '+e.target.files.length+image+' been staged.',500);
        }
    }

    when_entered_text_input_field_changed(text){
        this.setState({entered_text: text})
    }

    add_message_to_stack(mail){
        var message = this.state.entered_text.trim()
        // var mail = this.get_mail_items()[this.props.selected_mail_item];
        var message_id = Date.now()

        console.log('-------------------add_message_to_stack----------------------')
        console.log(this.get_focused_message(mail))
        var focused_message_id = this.get_focused_message(mail) != null ? this.get_focused_message(mail)['message_id'] : 0
        if(focused_message_id == null){
            focused_message_id = this.get_focused_message(mail)['ipfs']['message_id']
        }
        console.log(focused_message_id)
        
        if(message == ''){
            this.props.notify(this.props.app_state.loc['1695']/* 'Type something first.' */, 3600)
        }else{
            var convo_id = mail['convo_id']
            var tx = {convo_id: convo_id, type:'message', entered_indexing_tags:['send', 'message'], 'message':message, 'sender':this.props.app_state.user_account_id[mail['e5']], 'recipient':mail['convo_with'], 'time':Date.now()/1000, 'message_id':message_id, 'focused_message_id':focused_message_id, 'e5':mail['e5']}
            this.props.add_mail_to_stack_object(tx)

            this.setState({entered_text:''})
            this.props.notify(this.props.app_state.loc['1697']/* 'Message added to stack.' */, 1600)

            // if (this.messagesEnd.current){
            //     this.messagesEnd.current?.scrollIntoView({ behavior: 'smooth' })
            // }
        }
    }

    add_image_to_stack(image){
        var message = this.state.entered_text.trim()
        var mail = this.get_mail_items()[this.props.selected_mail_item];
        var convo_id = mail['convo_id']
        var message_id = Date.now()
        var focused_message_id = this.get_focused_message() != null ? this.get_focused_message_id() : 0

        var tx = {convo_id: convo_id, type:'image', 'message': message, entered_indexing_tags:['send', 'image'], 'image-data':{'images':[image],'pos':0}, 'sender':this.props.app_state.user_account_id[mail['e5']], 'recipient':mail['convo_with'],'time':Date.now()/1000, 'message_id':message_id, 'focused_message_id':focused_message_id, 'e5':mail['e5']}
        this.props.add_mail_to_stack_object(tx)

        this.setState({entered_text:''})
        this.props.notify('message added to stack', 600)

        if (this.messagesEnd.current){
            this.messagesEnd.current?.scrollIntoView({ behavior: 'smooth' })
        }
    }



    render_focus_list(object){
        // var object = this.get_mail_items()[this.props.selected_mail_item];
        var items = this.state.focused_message['tree'][object['id']]

        if(items != null && items.length > 0){
            return(
                <div style={{'margin':'0px 0px 0px 5px','padding': '5px 0px 0px 0px', width: '97%', 'background-color': 'transparent'}}>
                    <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '13px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                        {items.map((item, index) => (
                            <li style={{'display': 'inline-block', 'margin': '5px 5px 5px 5px', '-ms-overflow-style': 'none'}} onClick={() => this.when_focus_chain_item_clicked(item, index, object)}>
                                {this.render_detail_item('3', {'title':this.get_sender_title_text(item, object), 'details':this.shorten_message_item(this.format_message(item, object), object), 'size':'s'})}
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
    }


    shorten_message_item(item){
        var final_item = item
        if(item['ipfs']!= null){
            final_item = item['ipfs']
        }
        var message = final_item['message']
        var return_val = message
        if(message.length > 10){
            return_val = message.substring(0, 10).concat('...');
        }
        return return_val
    }


    when_focus_chain_item_clicked(item, pos, object){
        var clone = JSON.parse(JSON.stringify(this.state.focused_message))
        // var object = this.get_mail_items()[this.props.selected_mail_item];

        var new_array = []
        for(var i=0; i<=pos; i++){
            new_array.push(clone['tree'][object['id']][i])
        }
        clone[object['id']] = item
        clone['tree'][object['id']] = new_array
        
        this.setState({focused_message: clone})
    }





    
    get_selected_item(object, option){
        var selected_item = object[option][2][0]
        var picked_item = object[option][1][selected_item];
        return picked_item
    }

    /* renders the specific element in the post or detail object */
    render_detail_item(item_id, object_data){
        var size = this.props.screensize
        var width = size == 'm' ? this.props.app_state.width/2 : this.props.app_state.width
        return(
            <div>
                <ViewGroups graph_type={this.props.app_state.graph_type} font={this.props.app_state.font} item_id={item_id} object_data={object_data} theme={this.props.theme} width={width} show_images={this.props.show_images.bind(this)}/>
            </div>
        )

    }


    get_number_width(number){
        var last_two_digits = number.toString().slice(0, 1)+'0';
        if(number > 10){
            last_two_digits = number.toString().slice(0, 2);
        }
        return last_two_digits+'%'
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







}




export default MailDetailsSection;