import React, { Component } from 'react';
import ViewGroups from './../components/view_groups'
import Tags from './../components/tags';
import TextInput from './../components/text_input';
import Letter from './../assets/letter.png'; 
import E5EmptyIcon3 from './../assets/e5empty_icon3.png';

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

function TreeNode(data) {
  this.data     = data;
  this.parent   = null;
  this.children = [];
}

TreeNode.comparer = function (a, b) { 
  return a.data.sort < b.data.sort ? 0 : 1; 
};

TreeNode.prototype.sortRecursive = function () {
  this.children.sort(TreeNode.comparer);
  for (var i=0, l=this.children.length; i<l; i++) {
    this.children[i].sortRecursive();
  }
  return this;
};

function toTree(data) {
  var nodeById = {}, i = 0, l = data.length, node;

  nodeById[0] = new TreeNode(); // that's the root node

  for (i=0; i<l; i++) {  // make TreeNode objects for each item
    nodeById[ data[i].index ] = new TreeNode(data[i]);
  }
  for (i=0; i<l; i++) {  // link all TreeNode objects
    node = nodeById[ data[i].index ];
    node.parent = nodeById[node.data.parent];
    node.parent.children.push(node);
  }
  return nodeById[0].sortRecursive();
}

class JobDetailsSection extends Component {
    
    state = {
        selected: 0, navigate_view_jobs_list_detail_tags_object: this.get_navigate_view_jobs_list_detail_tags(), entered_text:'', focused_message:{'tree':{}}, comment_structure_tags: this.get_comment_structure_tags(), hidden_message_children_array:[],
    };

    get_comment_structure_tags(){
        return{
            'i':{
                active:'e',
            },
            'e':[
                ['xor','',0], ['e',this.props.app_state.loc['1671']/* 'channel-structure' */, this.props.app_state.loc['1672']/* 'comment-structure' */], [1]
            ],
        };
    }

    componentDidMount() {
        this.interval = setInterval(() => this.check_for_new_responses_and_messages(), 10000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    check_for_new_responses_and_messages() {
        if(this.props.selected_job_post_item != null){
            var object = this.get_item_in_array(this.get_job_items(), this.props.selected_job_post_item)
            if(object == null) return;
            this.props.get_job_objects_responses(object['id'], object['e5'])
            this.props.get_objects_messages(object['id'],  object['e5'])
        }
    }

    get_navigate_view_jobs_list_detail_tags(){
        return{
          'i':{
              active:'e', 
          },
          'e':[
              ['xor','',0], ['e',this.props.app_state.loc['2118']/* 'details' */,this.props.app_state.loc['1693']/* 'responses' */, this.props.app_state.loc['2030']/* 'activity' */],[1]
          ],
        }
    }

    render(){
        return(
        <div>{this.render_jobs_list_detail()}</div>
        )
    }


    render_jobs_list_detail(){
        if(this.props.selected_job_post_item == null){
            return(
                <div>
                    {this.render_empty_detail_object()}
                </div>
            )
        }else{
            return(
                <div style={{}}>
                    {this.render_jobs_details_section()}
                    <div style={{'height':'50px', width:'100%','padding':'0px 0px 0px 0px','margin':'0px 0px 0px 0px'}}>
                        <Tags font={this.props.app_state.font} page_tags_object={this.state.navigate_view_jobs_list_detail_tags_object} tag_size={'l'} when_tags_updated={this.when_navigate_view_jobs_list_detail_tags_object_updated.bind(this)} theme={this.props.theme}/>
                    </div>
                </div>
            )
        }
    }

    when_navigate_view_jobs_list_detail_tags_object_updated(tag_group){
        this.setState({navigate_view_jobs_list_detail_tags_object: tag_group})
    }

    render_empty_detail_object2(){
        var background_color = this.props.theme['card_background_color']
        var he = this.props.height
        return(
            <div style={{height:this.props.height-445, width:'50%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px','padding':'110px 5px 5px 10px', 'max-width':'420px','display': 'flex', 'align-items':'center','justify-content':'center','margin':'20px 0px 20px 0px'}}>
                <div style={{'margin':'10px 20px 0px 0px'}}>
                    <img src={Letter} style={{height:70 ,width:'auto'}} />
                    <p style={{'display': 'flex', 'align-items':'center','justify-content':'center', 'padding':'5px 0px 0px 7px', 'color': 'gray'}}></p>
                </div>
            </div>
        );
    }

    render_empty_detail_object(){
        var background_color = this.props.theme['card_background_color']
        var he = this.props.height
        return(
            <div>
                <div style={{height:this.props.height-70, 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px','padding':'10px 5px 5px 10px', 'max-width':'420px','display': 'flex', 'align-items':'center','justify-content':'center','margin':'10px 10px 10px 10px'}}>
                    <img src={Letter} style={{height:70 ,width:'auto'}} />
                </div>
            </div>
        )
    }

    get_selected_item(object, option){
        var selected_item = object[option][2][0]
        var picked_item = object[option][1][selected_item];
        return picked_item
    }


    get_item_in_array(object_array, id){
        var object = object_array.find(x => x['e5_id'] === id);
        return object
    }

    render_jobs_details_section(){
        var selected_item = this.get_selected_item(this.state.navigate_view_jobs_list_detail_tags_object, this.state.navigate_view_jobs_list_detail_tags_object['i'].active)
        var object = this.get_item_in_array(this.get_job_items(), this.props.selected_job_post_item)

        if(object == null){
            return(
                <div>
                    {this.render_empty_detail_object()}
                </div>
            )
        }

        if(object != null){
            if(selected_item == this.props.app_state.loc['2118']/* 'details' */ || selected_item == 'e'){
                return(
                    <div>
                        {this.render_job_posts_main_details_section(object)}
                    </div>
                )
            }
            else if(selected_item == this.props.app_state.loc['1693']/* 'responses' */){
                return(
                    <div>
                        {this.render_job_post_responses(object)}
                    </div>
                )
                
            }
            else if(selected_item == this.props.app_state.loc['2030']/* 'activity' */){
                return(
                    <div>
                        {this.render_job_message_activity(object)}
                    </div>
                )
            }
        }
    }

    render_job_posts_main_details_section(object){
        var background_color = this.props.theme['card_background_color']
        var he = this.props.height-50
        var size = this.props.screensize
        if(size == 'm'){
            he = this.props.height-190;
        }
        // var object = this.get_job_items()[this.props.selected_job_post_item];
        var item = this.get_job_details_data(object)
        var items = object['ipfs'] == null ? [] : object['ipfs'].entered_objects

        return(
            <div style={{ 'background-color': background_color, 'border-radius': '15px','margin':'5px 10px 2px 10px', 'padding':'0px 10px 0px 10px'}}>
                <div style={{ 'overflow-y': 'auto', width:'100%', height: he, padding:'0px 10px 0px 10px'}}>
                    {this.render_detail_item('1', item['tags'])}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', item['id'])}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', {'title':''+this.get_senders_name(object['event'].returnValues.p5, object), 'details':this.props.app_state.loc['2070']/* 'Author' */, 'size':'l'})}
                    <div style={{height: 10}}/>
                    
                    {this.render_taken_down_message_if_post_is_down(object)}
                    <div style={{height: 10}}/>

                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>
                        {this.render_detail_item('2', item['age'])}
                    </div>
                    {this.render_detail_item('0')}
                    {this.render_item_data(items, object)}
                    {this.render_item_images(object)}
                    {this.render_selected_links(object)}

                    {this.render_detail_item('0')}
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2482']/* 'Job Offers' */, 'details':this.props.app_state.loc['2483']/* 'The amounts they are offering for the job.' */, 'size':'l'})}
                    <div style={{height:10}}/>
                    {this.render_price_amounts(object)}
                    <div style={{height:10}}/>
                    
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2484']/* 'Apply for the job' */, 'details':this.props.app_state.loc['2485']/* 'Respond to the ad with a contract and apply for the job' */, 'size':'l'})}
                    <div style={{height:10}}/>
                    <div onClick={()=>this.open_respond_to_job_ui(object)}>
                        {this.render_detail_item('5', {'text':this.props.app_state.loc['2486']/* 'Apply' */, 'action':''})}
                    </div>

                    {this.render_edit_object_button(object)}

                    {this.render_pin_job_button(object)}

                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            </div>
        )
    }

    render_taken_down_message_if_post_is_down(object){
        if(this.is_post_taken_down_for_sender(object)){
            return(
                <div>
                    {this.render_detail_item('3', {'size':'l', 'details':this.props.app_state.loc['2526b']/* The object has been taken down.' */, 'title':this.props.app_state.loc['2526a']/* '🔒 Taken Down' */})}
                </div>
            )
        }
    }

    is_post_taken_down_for_sender(object){
        if(object['ipfs'].get_take_down_option == null) return false
        var selected_take_down_option = this.get_selected_item2(object['ipfs'].get_take_down_option, 'e')
        if(selected_take_down_option == 1) return true
    }

    get_selected_item2(object, option){
        return object[option][2][0]
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
            return 'You'
        }else{
            var alias = (this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[sender] == null ? sender : this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[sender])
            return alias
        }
    }

    render_pin_job_button(object){
        return(
            <div>
                {this.render_detail_item('0')}
                {this.render_detail_item('3', {'size':'l', 'details':this.props.app_state.loc['2487']/* 'Pin the job to your feed' */, 'title':this.props.app_state.loc['2488']/* 'Pin Job' */})}
                <div style={{height:10}}/>
                <div onClick={()=> this.when_pin_job_clicked(object)}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['2489']/* 'Pin/Unpin Job' */, 'action':''},)}
                </div>
            </div>
        )
    }

    when_pin_job_clicked(object){
        this.props.pin_job(object)
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
                                    <div style={{height:60, width:'100%', 'background-color': this.props.theme['view_group_card_item_background'], 'border-radius': '15px','padding':'10px 0px 10px 10px', 'max-width':'420px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                                        <div style={{'margin':'10px 20px 10px 0px'}}>
                                            <img src={Letter} style={{height:30 ,width:'auto'}} />
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

    open_respond_to_job_ui(object){
        // var object = this.get_job_items()[this.props.selected_job_post_item];
        this.props.open_respond_to_job_ui(object)
    }


    render_edit_object_button(object){
        // var object = this.get_job_items()[this.props.selected_job_post_item];
        var my_account = this.props.app_state.user_account_id[object['e5']]

        if(object['event'].returnValues.p5 == my_account){
            return(
                <div>
                    {this.render_detail_item('0')}

                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2490']/* 'Edit Job Post' */, 'details':this.props.app_state.loc['2491']/* 'Change the basic details for your Job Post' */, 'size':'l'})}
                    <div style={{height:10}}/>
                    <div onClick={()=>this.open_basic_edit_object_ui(object)}>
                        {this.render_detail_item('5', {'text':this.props.app_state.loc['2492']/* 'Perform Action' */, 'action':''})}
                    </div>
                </div>
            )
        }
    }


    open_basic_edit_object_ui(object){
        // var object = this.get_job_items()[this.props.selected_job_post_item];
        this.props.open_edit_object('0', object)
    }






    render_price_amounts(object){
        var middle = this.props.height-500;
        var size = this.props.size;
        if(size == 'm'){
            middle = this.props.height-100;
        }
        // var object = this.get_job_items()[this.props.selected_job_post_item];
        var items = [].concat(object['ipfs'].price_data)
        if(items.length == 0){
            items = [0, 1, 2]
            return(
                <div>
                    <div style={{overflow: 'auto', maxHeight: middle}}>
                        <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                            {items.map((item, index) => (
                                <li style={{'padding': '2px 5px 2px 5px'}} onClick={()=>console.log()}>
                                    <div style={{height:60, width:'100%', 'background-color': this.props.theme['view_group_card_item_background'], 'border-radius': '15px','padding':'10px 0px 10px 10px', 'max-width':'420px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                                        <div style={{'margin':'10px 20px 10px 0px'}}>
                                            <img src={Letter} style={{height:30 ,width:'auto'}} />
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div> 
            )
        }
        return(
            <div style={{}}>
                <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                    {items.map((item, index) => (
                        <li style={{'padding': '3px 0px 3px 0px'}}>
                            <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                                {this.render_detail_item('2', { 'style':'l', 'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[object['e5']+item['id']], 'subtitle':this.format_power_figure(item['amount']), 'barwidth':this.calculate_bar_width(item['amount']), 'number':this.format_account_balance_figure(item['amount']), 'barcolor':'', 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['id']], })}
                            </div>
                        </li>
                    ))}
                </ul>
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


    get_job_details_data(object){
        var tags = object['ipfs'] == null ? ['Job'] : [].concat(object['ipfs'].entered_indexing_tags)
        var title = object['ipfs'] == null ? 'Job ID' : object['ipfs'].entered_title_text
        var age = object['event'] == null ? 0 : object['event'].returnValues.p7
        var time = object['event'] == null ? 0 : object['event'].returnValues.p6
        return {
            'tags':{'active_tags':tags, 'index_option':'indexed'},
            'id':{'title':object['e5']+' • '+object['id'], 'details':title, 'size':'l'},
            'age':{'style':'l', 'title':this.props.app_state.loc['2493']/* 'Block Number' */, 'subtitle':this.props.app_state.loc['2494']/* 'age' */, 'barwidth':this.get_number_width(age), 'number':`${number_with_commas(age)}`, 'barcolor':'', 'relativepower':`${this.get_time_difference(time)} `+this.props.app_state.loc['2495']/* ago */, }
        }
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

    get_job_items(){
        return this.props.get_job_items()
    }








    render_job_post_responses(object){
        var he = this.props.height-45

        return(
            <div style={{ 'background-color': 'transparent', 'border-radius': '15px','margin':'0px 0px 0px 0px', 'padding':'0px 0px 0px 0px', 'max-width':'470px'}}>
                <div style={{ 'overflow-y': 'auto', height: he, padding:'5px 0px 5px 0px'}}>
                    {this.render_job_post_top_title(object)}
                    <div style={{height:'1px', 'background-color':'#C1C1C1', 'margin': '10px 20px 10px 20px'}}/>
                    {this.render_job_post_sent_received_messages(object)}
                </div>
            </div>
        )
    }

    render_job_post_top_title(object){
        // var object = this.get_job_items()[this.props.selected_job_post_item];
        return(
            <div style={{padding:'5px 5px 5px 5px'}}>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['2496']/* 'In ' */+object['id'], 'details':this.props.app_state.loc['2497']/* 'Job Responses' */, 'size':'l'})} 
            </div>
        )
    }

    render_job_post_sent_received_messages(object){
        var middle = this.props.height-200;
        var size = this.props.size;
        if(size == 'm'){
            middle = this.props.height-100;
        }
        var items = [].concat(this.get_job_details_responses(object))

        if(items.length == 0){
            items = [0,1]
            return(
                <div>
                    <div style={{overflow: 'auto', maxHeight: middle}}>
                        <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                            {items.map((item, index) => (
                                <li style={{'padding': '2px 5px 2px 5px'}} onClick={()=>console.log()}>
                                    <div style={{height:60, width:'100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px','padding':'10px 0px 10px 10px', 'max-width':'420px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                                        <div style={{'margin':'10px 20px 10px 0px'}}>
                                            <img src={Letter} style={{height:30 ,width:'auto'}} />
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
                <div style={{overflow: 'auto', maxHeight: middle, 'display': 'flex', 'flex-direction': 'column-reverse'}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.map((item, index) => (
                            <li style={{'padding': '2px 5px 2px 5px'}}>
                                <div key={index}>
                                    {this.render_job_response_item(item, object)}
                                </div>
                            </li> 
                        ))}
                    </ul>
                </div>
            )
        }
    }

    get_job_details_responses(object){
        // var object = this.get_job_items()[this.props.selected_job_post_item];
        if(object['event'].returnValues.p5 == this.props.app_state.user_account_id[object['e5']]){
            if(this.props.app_state.job_responses[object['id']] == null) return []
            return this.props.app_state.job_responses[object['id']]
        }else{
            var filtered_responses = []
            if(this.props.app_state.job_responses[object['id']] == null) return []
            var all_responses = this.props.app_state.job_responses[object['id']]
            for(var i=0; i<all_responses.length; i++){
                if(all_responses[i]['applicant_id'] == this.props.app_state.user_account_id[object['e5']]){
                    filtered_responses.push(all_responses[i])
                }
            }
            return filtered_responses
        }
    }

    render_job_response_item(item, object){
        var background_color = this.props.theme['card_background_color']
        var card_shadow_color = this.props.theme['card_shadow_color']
        var is_application_accepted = item['is_response_accepted'];

        if(is_application_accepted){
            return(
                <div onClick={() => this.view_contract(item, object)}>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2498']/* 'Expiry time from now: ' */+this.get_expiry_time(item), 'details':''+(new Date(item['application_expiry_time'] * 1000)), 'size':'s'})}
                    <div style={{height:3}}/>
                    
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2499']/* 'Contract ID: ' */+item['picked_contract_id'], 'details':this.props.app_state.loc['2500']/* 'Sender ID: ' */+item['applicant_id']+', '+this.get_senders_name2(item['applicant_id'], object), 'size':'s'})}
                    <div style={{height:3}}/>

                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2501']/* 'Accepted' */, 'details':this.props.app_state.loc['2502']/* 'The job owner picked this application' */, 'size':'s'})}
                    <div style={{height:'1px', 'background-color':'#C1C1C1', 'margin': '10px 20px 10px 20px'}}/>
                    <div style={{height:'1px', 'background-color':'#C1C1C1', 'margin': '10px 20px 10px 20px'}}/>
                </div>
            )
        }else{
            return(
                <div onClick={() => this.view_contract(item, object)}>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2503']/* 'Expiry time from now: ' */+this.get_expiry_time(item), 'details':''+(new Date(item['application_expiry_time'] * 1000)), 'size':'s'})}
                    <div style={{height:3}}/>
                    
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2504']/* 'Contract ID: ' */+item['picked_contract_id'], 'details':this.props.app_state.loc['2505']/* 'Sender ID: ' */+item['applicant_id']+', '+this.get_senders_name2(item['applicant_id'], object), 'size':'s'})}
                    <div style={{height:'1px', 'background-color':'#C1C1C1', 'margin': '10px 20px 10px 20px'}}/>
                </div>
            )
        }
        
    }

    get_senders_name2(sender, object){
        // var object = this.get_mail_items()[this.props.selected_mail_item];
        if(sender == this.props.app_state.user_account_id[object['e5']]){
            return 'You'
        }else{
            var alias = (this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[sender] == null ? '' : this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[sender])
            return alias
        }
    }

    get_expiry_time(item){
        var time_diff = item['application_expiry_time'] - Math.round(Date.now()/1000)
        var t = ''
        if(time_diff < 0){
            t = this.get_time_diff(time_diff*-1) +this.props.app_state.loc['1698a']/* ' ago.' */
        }else{
            t = this.props.app_state.loc['1698b']/* 'In ' */+this.get_time_diff(time_diff)
        }

        return t
    }

    view_contract(item, object){
        // var object = this.get_job_items()[this.props.selected_job_post_item];
        if(object['event'].returnValues.p5 == this.props.app_state.user_account_id[object['e5']]){
            this.props.view_application_contract(item)
        }
    }






    



    render_job_message_activity(object){
        var he = this.props.height-95
        if(this.get_focused_message(object) != null) he = this.props.height-170
        var size = this.props.screensize
        return(
            <div style={{}}>
                <div style={{ 'background-color': 'transparent', 'border-radius': '15px','margin':'0px 0px 0px 0px', 'padding':'0px 0px 0px 0px', 'max-width':'470px'}}>
                    <div style={{ 'overflow-y': 'scroll', height: he, padding:'5px 0px 5px 0px'}}>
                        <Tags font={this.props.app_state.font} page_tags_object={this.state.comment_structure_tags} tag_size={'l'} when_tags_updated={this.when_comment_structure_tags_updated.bind(this)} theme={this.props.theme}/>

                        {this.render_top_title(object)}
                        {/* {this.render_focus_list(object)} */}
                        <div style={{height:'1px', 'background-color':'#C1C1C1', 'margin': '10px 20px 10px 20px'}}/>
                        {this.render_sent_received_messages(object)}
                    </div>
                </div>
                {this.render_focused_message(object)}
                <div style={{'display': 'flex','flex-direction': 'row','margin':'0px 0px 5px 5px', width: '99%'}}>
                    <div style={{'margin':'0px 0px 0px 0px'}}>
                        {/* {this.render_image_picker()} */}
                        <div>
                            <div style={{'position': 'relative', 'width':45, 'height':45, 'padding':'0px 0px 0px 0px'}} onClick={()=> this.when_circle_clicked(object)}>
                                <img src={E5EmptyIcon3} style={{height:45, width:'auto', 'z-index':'1' ,'position': 'absolute'}}/>
                            </div>
                        </div>
                    </div>
                    <div style={{'margin': '0px 0px 0px 0px', width:this.props.width}}>
                        <TextInput font={this.props.app_state.font} height={20} placeholder={this.props.app_state.loc['1039']/* 'Enter Message...' */} when_text_input_field_changed={this.when_entered_text_input_field_changed.bind(this)} text={this.state.entered_text} theme={this.props.theme}/>
                    </div>
                    
                    <div style={{'padding': '2px 5px 0px 5px', 'width':100}} onClick={()=>this.add_message_to_stack(object)}>
                        {this.render_detail_item('5', {'text':this.props.app_state.loc['2151']/* 'Send' */, 'action':'-'})}
                    </div>
                </div>
            </div> 
        )
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
        this.messagesEnd.current?.scrollIntoView({ behavior: "smooth" });
    }

    render_focused_message(object){
        var item = this.get_focused_message(object);
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

    when_comment_structure_tags_updated(tag_obj){
        this.setState({comment_structure_tags: tag_obj})
    }

    show_add_comment_bottomsheet(object){
        // var object = this.get_job_items()[this.props.selected_job_post_item];
        var focused_message_id = this.get_focused_message(object) != null ? this.get_focused_message(object)['message_id'] : 0
        this.props.show_add_comment_bottomsheet(object, focused_message_id, 'job')
    }
  

    render_top_title(object){
        // var object = this.get_job_items()[this.props.selected_job_post_item];
        var top_title = object['ipfs'] == null ? '': object['ipfs'].entered_title_text
        return(
            <div style={{padding:'5px 5px 5px 5px'}}>
                {this.render_detail_item('3', {'title':'In '+object['id'], 'details':top_title, 'size':'l'})} 
            </div>
        )
    }

    constructor(props) {
        super(props);
        this.messagesEnd = React.createRef();
    }

    render_sent_received_messages(object){
        var middle = this.props.height-250;
        if(this.get_focused_message(object) != null) middle = this.props.height-300
        var size = this.props.size;
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
                                    <div style={{height:60, width:'100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px','padding':'10px 0px 10px 10px', 'max-width':'420px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                                        <div style={{'margin':'10px 20px 10px 0px'}}>
                                            <img src={Letter} style={{height:30 ,width:'auto'}} />
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
            var selected_view_option = this.get_selected_item(this.state.comment_structure_tags, 'e')
            if(selected_view_option == this.props.app_state.loc['1671']/* 'channel-structure' */){
                return(
                <div style={{overflow: 'scroll', 'display': 'flex', 'flex-direction': 'column-reverse'}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {this.render_messages(items.concat(stacked_items), object)}
                        <div ref={this.messagesEnd}/>
                    </ul>
                </div>
            )
            }else{
                return(
                    <div style={{overflow: 'scroll', 'display': 'flex', 'flex-direction': 'column-reverse'}}>
                        <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                            {this.render_all_comments(object)}
                            <div ref={this.messagesEnd}/>
                        </ul>
                    </div>
                )
            }
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
                                    <div style={{height:60, width:'100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px','padding':'10px 0px 10px 10px', 'max-width':'420px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                                        <div style={{'margin':'10px 20px 10px 0px'}}>
                                            <img src={Letter} style={{height:30 ,width:'auto'}} />
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
                        <li style={{'padding': '2px 5px 2px 5px'}} onClick={()=>console.log()}>
                            <div >
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
        // var object = this.get_job_items()[this.props.selected_job_post_item];

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
        // var object = this.get_job_items()[this.props.selected_job_post_item];
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
        // var object = this.get_job_items()[this.props.selected_job_post_item];
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

        // var focused_message = this.get_focused_message(object)
        // if(item == focused_message){
        //     return(
        //         <div>
        //             <SwipeableList>
        //                 <SwipeableListItem
        //                     swipeLeft={{
        //                     content: <div>Focus</div>,
        //                     action: () => console.log()
        //                     }}
        //                     swipeRight={{
        //                     content: <div>Unfocus</div>,
        //                     action: () => this.unfocus_message(object)
        //                     }}>
        //                     <div style={{width:'100%', 'background-color':this.props.theme['send_receive_ether_background_color']}}>{this.render_stack_message_item(item, object)}</div>
        //                 </SwipeableListItem>
        //             </SwipeableList>
        //             {/* <div onClick={(e) => this.when_message_clicked(e, item, 'focused_message')}>
        //                 {this.render_stack_message_item(item)}
        //             </div> */}
        //             {/* <div style={{height:'1px', 'background-color':'#C1C1C1', 'margin': '5px 20px 5px 20px'}}/> */}
        //         </div>
        //     )
        // }else{
        //     return(
        //         <div>
        //             <SwipeableList>
        //                 <SwipeableListItem
        //                     swipeLeft={{
        //                     content: <div>Focus</div>,
        //                     action: () => this.focus_message(item, object)
        //                     }}
        //                     swipeRight={{
        //                     content: <div>Unfocus</div>,
        //                     action: () => this.unfocus_message(object)
        //                     }}>
        //                     <div style={{width:'100%', 'background-color':this.props.theme['send_receive_ether_background_color']}}>{this.render_stack_message_item(item, object)}</div>
        //                 </SwipeableListItem>
        //             </SwipeableList>

        //             {/* <div onClick={(e) => this.when_message_clicked(e, item)}>
        //                 {this.render_stack_message_item(item)}
        //             </div> */}
        //         </div>
        //     )
        // }
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
        this.props.notify(this.props.app_state.loc['2506']/* 'copied message to clipboard' */, 600)
    }




    render_stack_message_item(item, object){
        if(this.is_sender_in_blocked_accounts(item)){
            return(
                <div>
                    <div style={{height:60, width:'100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px','padding':'10px 0px 10px 10px', 'max-width':'420px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                        <div style={{'margin':'10px 20px 10px 0px'}}>
                            <img src={Letter} style={{height:30 ,width:'auto'}} />
                        </div>
                    </div>
                </div>
            )
        }
        return(
            <div>
                <div style={{'padding': '7px 15px 10px 15px','margin':'0px 0px 0px 0px', 'background-color': this.props.theme['view_group_card_item_background'],'border-radius': '7px'}}> 
                    <div className="row" style={{'padding':'0px 0px 0px 0px'}}>
                        <div className="col-9" style={{'padding': '0px 0px 0px 14px', 'height':'20px' }}> 
                            <p style={{'color': this.props.theme['primary_text_color'], 'font-size': '14px', 'margin':'0px'}} onClick={()=>this.props.add_id_to_contacts(item['sender'], item, object)} >{this.get_sender_title_text(item, object)}</p>
                        </div>
                        <div className="col-3" style={{'padding': '0px 15px 0px 0px','height':'20px'}}>
                            <p style={{'color': this.props.theme['secondary_text_color'], 'font-size': '9px', 'margin': '3px 0px 0px 0px'}} className="text-end">{this.get_time_difference(item['time'], object)}</p>
                        </div>
                    </div>
                    <p style={{'font-size': '11px','color': this.props.theme['secondary_text_color'],'margin': '0px 0px 0px 0px','font-family': this.props.app_state.font,'text-decoration': 'none', 'white-space': 'pre-line'}} onClick={(e) => this.when_message_clicked(e, item)}><Linkify options={{target: '_blank'}}>{this.format_message(item['message'], object)}</Linkify></p>

                    {this.render_images_if_any(item)}
                    <p style={{'font-size': '8px','color': this.props.theme['primary_text_color'],'margin': '1px 0px 0px 0px','font-family': this.props.app_state.font,'text-decoration': 'none', 'white-space': 'pre-line'}} className="fw-bold">{this.get_message_replies(item, object).length} {this.props.app_state.loc['2507']}</p>
                </div>
                {this.render_response_if_any(item, object)}
            </div>
            
        )
    }

    render_response_if_any(_item, object){
        if(_item['focused_message_id'] == 0) return;
        // if(this.get_focused_message(object) != null) return;
        var message_items = this.get_convo_messages(object).concat(this.get_stacked_items(object))
        var item = this.get_item_in_message_array(_item['focused_message_id'], message_items)
        if(item == null) return;
        var selected_view_option = this.get_selected_item(this.state.comment_structure_tags, 'e')
        if(selected_view_option == this.props.app_state.loc['1672']/* 'comment-structure' */) return
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
        return object
    }


    is_sender_in_blocked_accounts(item){
        var blocked_account_obj = this.get_all_sorted_objects(this.props.app_state.blocked_accounts)
        var blocked_accounts = []
        blocked_account_obj.forEach(account => {
            if(!blocked_accounts.includes(account['id'])){
                blocked_accounts.push(account['id'])
            }
        });

        if(blocked_accounts.includes(item['sender'])){
            return true
        }
        return false
    }

    render_images_if_any(item){
        if(item.type == 'image'){
            return(
                <div>
                    {this.render_detail_item('9',item['image-data'])}
                </div>
            )
        }
    }

    get_sender_title_text(item, object){
        // var object = this.get_job_items()[this.props.selected_job_post_item];
        if(item['sender'] == this.props.app_state.user_account_id[object['e5']]){
            return this.props.app_state.loc['1694']/* 'You' */
        }else{
            var alias = (this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[item['sender']] == null ? item['sender'] : this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[item['sender']])
            return alias
        }
    }

    format_message(message){
        if(message == ''){
            return '...'
        }
        return message
    }

    get_convo_messages(object){
        // var object = this.get_job_items()[this.props.selected_job_post_item];
        if(this.props.app_state.object_messages[object['id']] == null) return [];
        return this.filter_messages_for_blocked_accounts(this.props.app_state.object_messages[object['id']])
    }

    filter_messages_for_blocked_accounts(objects){
        var blocked_account_obj = this.get_all_sorted_objects(this.props.app_state.blocked_accounts)
        var blocked_accounts = []
        blocked_account_obj.forEach(account => {
            if(!blocked_accounts.includes(account['id'])){
                blocked_accounts.push(account['id'])
            }
        });
        var filtered_objects = [];
        objects.forEach(object => {
            if(!blocked_accounts.includes(object['sender'])){
                filtered_objects.push(object)
            }
        })

        if(this.props.app_state.masked_content == 'hide'){
            return filtered_objects
        }
        return objects;
    }

    get_stacked_items(object){
        // var object = this.get_job_items()[this.props.selected_job_post_item];
        var convo_id = object['id']

        var stack = this.props.app_state.stack_items
        var stacked_items = []
        for(var i=0; i<stack.length; i++){
            if(stack[i].type == this.props.app_state.loc['1514']/* 'job-messages' */){
                for(var e=0; e<stack[i].messages_to_deliver.length; e++){
                    var message_obj = stack[i].messages_to_deliver[e]
                    if(message_obj['id'] == convo_id){
                        stacked_items.push(message_obj)
                    }
                }
            }
        }
        return stacked_items
    }

    get_focused_message_replies(object){
        var focused_message = this.get_focused_message(object)
        var all_messages = this.get_convo_messages(object).concat(this.get_stacked_items(object))
        var replies = []
        for(var i=0; i<all_messages.length; i++){
            if(all_messages[i]['focused_message_id'] != null && focused_message['message_id'] != null &&  all_messages[i]['focused_message_id'] == focused_message['message_id']){
                replies.push(all_messages[i])
            }
        }
        return replies
    }

    get_message_replies(item, object){
        var all_messages = this.get_convo_messages(object).concat(this.get_stacked_items(object))
        var replies = []
        for(var i=0; i<all_messages.length; i++){
            if(all_messages[i]['focused_message_id'] != null && item['message_id'] != null &&  all_messages[i]['focused_message_id'] == item['message_id']){
                replies.push(all_messages[i])
            }
        }
        return replies
    }

    get_focused_message(object){
        // var object = this.get_job_items()[this.props.selected_job_post_item];
        return this.state.focused_message[object['id']]
    }





    render_image_picker(){
        return(
            <div>
                <div style={{'position': 'relative', 'width':45, 'height':45, 'padding':'0px 0px 0px 0px'}}>
                    <img src={E5EmptyIcon3} style={{height:45, width:'auto', 'z-index':'1' ,'position': 'absolute'}} />
                    <input style={{height:30, width:40, opacity:0, 'z-index':'2' ,'position': 'absolute', 'margin':'5px 0px 0px 0px'}} id="upload" type="file" accept ="image/*" onChange ={this.when_image_gif_picked.bind(this)} />
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

    add_message_to_stack(object){
        var message = this.state.entered_text.trim()
        // var object = this.get_job_items()[this.props.selected_job_post_item];
        var message_id = Date.now()
        var focused_message_id = this.get_focused_message(object) != null ? this.get_focused_message(object)['message_id'] : 0
        if(message == ''){
            this.props.notify(this.props.app_state.loc['1695']/* 'Type something first.' */, 4600)
        }
        else if(this.props.app_state.user_account_id[object['e5']] == 1){
            this.props.notify(this.props.app_state.loc['1696']/* 'You need to make at least 1 transaction to participate.' */, 5200)
        }
        else{
            var tx = {'id':object['id'], type:'message', entered_indexing_tags:['send', 'message'], 'message':message, 'sender':this.props.app_state.user_account_id[object['e5']], 'time':Date.now()/1000, 'message_id':message_id, 'focused_message_id':focused_message_id, 'e5':object['e5']}

            this.props.add_job_message_to_stack_object(tx)

            this.setState({entered_text:''})
            this.props.notify(this.props.app_state.loc['1697']/* 'Message added to stack.' */, 1600)
            
            if (this.messagesEnd.current){
                this.messagesEnd.current?.scrollIntoView({ behavior: 'smooth' })
            }
        }
    }

    add_image_to_stack(image){
        var object = this.get_job_items()[this.props.selected_job_post_item];
        if(this.props.app_state.user_account_id[object['e5']] == 1){
            this.props.notify('you need to make at least 1 transaction to participate', 1200)
            return
        }
        var message_id = Date.now()
        var focused_message_id = this.get_focused_message() != null ? this.get_focused_message()['message_id'] : 0
        var message = this.state.entered_text.trim()
        var object = this.get_job_items()[this.props.selected_job_post_item];

        var tx = {'id':object['id'], type:'image', 'message': message, entered_indexing_tags:['send', 'image'], 'image-data':{'images':[image],'pos':0}, 'sender':this.props.app_state.user_account_id[object['e5']],'time':Date.now()/1000, 'message_id':message_id, 'focused_message_id':focused_message_id, 'e5':object['e5']}

        this.props.add_job_message_to_stack_object(tx)

        this.setState({entered_text:''})
        this.props.notify('message added to stack', 600)

        if (this.messagesEnd.current){
            this.messagesEnd.current?.scrollIntoView({ behavior: 'smooth' })
        }
    }


    render_focus_list(object){
        // var object = this.get_job_items()[this.props.selected_job_post_item];
        var items = this.state.focused_message['tree'][object['id']]

        if(items != null && items.length > 0){
            return(
                <div style={{'margin':'0px 0px 0px 5px','padding': '5px 0px 0px 0px', width: '97%', 'background-color': 'transparent'}}>
                    <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '13px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                        {items.map((item, index) => (
                            <li style={{'display': 'inline-block', 'margin': '5px 5px 5px 5px', '-ms-overflow-style': 'none'}} onClick={() => this.when_focus_chain_item_clicked(item, index, object)}>
                                {this.render_detail_item('3', {'title':this.get_sender_title_text(item, object), 'details':this.shorten_message_item(this.format_message(item['message'], object), object), 'size':'s'})}
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
    }


    shorten_message_item(message){
        var return_val = message
        if(message.length > 10){
            return_val = message.substring(0, 10).concat('...');
        }
        return return_val
    }


    when_focus_chain_item_clicked(item, pos, object){
        var clone = JSON.parse(JSON.stringify(this.state.focused_message))
        // var object = this.get_job_items()[this.props.selected_job_post_item];

        var new_array = []
        for(var i=0; i<=pos; i++){
            new_array.push(clone['tree'][object['id']][i])
        }
        clone[object['id']] = item
        clone['tree'][object['id']] = new_array
        
        this.setState({focused_message: clone})
    }




    render_all_comments(object){
        var sorted_messages_in_tree = this.get_message_replies_in_sorted_object(object)
        return(
            <div>
                {sorted_messages_in_tree.children.map((item, index) => (
                    <li style={{'padding': '1px 5px 0px 5px'}} onClick={()=>console.log()}>
                        <div >
                            {this.render_main_comment(item, 0, object)}
                            <div style={{height:3}}/>
                        </div>
                    </li>
                ))}    
            </div>
        )
    }

    render_main_comment(comment, depth, object){
        return(
            <div>
                <div style={{'padding': '1px 0px 0px 0px'}} onClick={()=> this.when_message_item_clicked(comment.data.message, object)}>
                    {this.render_message_as_focused_if_so(comment.data.message, object)}
                </div>

                {this.render_message_children(comment, depth, object)}
            </div>
        )
    }

    render_message_children(comment, depth, object){
        var padding = depth > 4 ? '0px 0px 0px 5px' : '0px 0px 0px 20px'
        if(this.state.hidden_message_children_array.includes(comment.data.message['message_id'])){
            return(
                <div style={{'display': 'flex','flex-direction': 'row','margin':'0px 0px 0px 0px'}}>
                    <div style={{width:'100%'}}>
                        <ul style={{ 'padding': padding, 'listStyle':'none'}}>
                            {comment.children.map((item, index) => (
                                <li style={{'padding': '4px 0px 0px 0px'}}>
                                    <div>
                                        {this.render_main_comment(item, depth+1, object)}
                                        <div style={{height:3}}/>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )
        }
    }

    when_message_item_clicked(message){
        var clone = this.state.hidden_message_children_array.slice();
        
        if(clone.includes(message['message_id'])){
            var index = clone.indexOf(message['message_id']);
            if(index > -1){
                clone.splice(index, 1);
            }
        }else{
            clone.push(message['message_id'])
        }

        this.setState({hidden_message_children_array:clone})
        
    }

    get_message_replies_in_sorted_object(object){
        var messages = this.get_convo_messages(object).concat(this.get_stacked_items(object))
        var data = []
        messages.forEach(message => {
            data.push({ index : message['message_id'], sort : message['time'], parent : message['focused_message_id'], message: message })
        });
        var tree = toTree(data);
        return tree;
    }










    /* renders the specific element in the post or detail object */
    render_detail_item(item_id, object_data){
        var size = this.props.screensize
        var width = size == 'm' ? this.props.app_state.width/2 : this.props.app_state.width
        return(
            <div>
                <ViewGroups font={this.props.app_state.font} item_id={item_id} object_data={object_data} theme={this.props.theme}  width={width} show_images={this.props.show_images.bind(this)}/>
            </div>
        )

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


}




export default JobDetailsSection;