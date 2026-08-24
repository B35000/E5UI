// Copyright (c) 2023 - Present, Bry Onyoni
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
import NumberPicker from './../components/number_picker';
import TextInput from './../components/text_input';

import { SwipeableList, SwipeableListItem } from '@sandstreamdev/react-swipeable-list';
import '@sandstreamdev/react-swipeable-list/dist/styles.css';
import { Virtuoso } from "react-virtuoso";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

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
  console.log('toTree', 'nodeById', nodeById);
  for (i=0; i<l; i++) {  // link all TreeNode objects
    node = nodeById[ data[i].index ];
    console.log('toTree', 'data[i].index', data[i].index, 'node', node);
    
    node.parent = nodeById[node.data.parent];
    console.log('toTree', 'node.data.parent', node.data.parent, 'node.parent', node.parent);
    
    node.parent?.children.push(node);
  }
  return nodeById[0].sortRecursive();
}


class CertificateChainPage extends Component {
    
    state = {
        selected: 0, get_show_linked_certificates_title_tags_object: this.get_show_linked_certificates_title_tags_object(), 
        
        focused_message:{'tree':{}}, hidden_message_children_array:[], visible_hidden_messages:[],
    };



    get_show_linked_certificates_title_tags_object(){
        const obj = {
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e',this.props.app_state.loc['3112']/* 'certificate-chain' */], [1]
            ],
        };

        return obj
    }




    set_data(item, object, certificate_ui){
        this.setState({
            depth_item: item, 
            token_item: object, 
            e5: object['e5'],
            certificate_ui: certificate_ui
        })
    }





    render(){
        return(
            <div style={{'padding':'10px 10px 0px 10px'}}>
                <Tags font={this.props.app_state.font} app_state={this.props.app_state} page_tags_object={this.state.get_show_linked_certificates_title_tags_object} tag_size={'l'} when_tags_updated={this.when_get_show_linked_certificates_title_tags_object_updated.bind(this)} theme={this.props.theme}/>

                {this.render_everything()}
            </div>
        )
    }

    when_get_show_linked_certificates_title_tags_object_updated(tags_obj){
        this.setState({get_show_linked_certificates_title_tags_object: tags_obj})
    }


    render_everything(){
        if(this.state.token_item == null) return;
        var size = this.props.app_state.size
        if(size == 's'){
            return(
                <div>
                    {this.render_certificate_chain_data()}
                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_certificate_chain_data()}
                        {this.render_detail_item('0')}
                        {this.render_detail_item('0')}
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
                        {this.render_certificate_chain_data()}
                        {this.render_detail_item('0')}
                        {this.render_detail_item('0')}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_empty_views(3)}
                    </div>
                </div>
            )
        }
    }

    render_certificate_chain_data(){
        return(
            <div>
                {this.render_detail_item('3', { 'title': this.props.app_state.loc['3112a']/* 'Certificate Chain.' */, 'details': this.props.app_state.loc['3112b']/* 'Tap a certificate to see its parent certificate in the certificate chain. Then swipe right to view the certificate\'s details.' */, 'size': 'l' })}
                <div style={{ height:10 }}/>
                {this.state.certificate_ui}

                <div style={{ height:10 }}/>
                {this.render_certificate_chain()}
            </div>
        )
    }



    render_certificate_chain(){
        const height = this.props.height - 390
        const sorted_messages_in_tree = this.get_message_replies_in_sorted_object()
        console.log('render_certificate_chain', 'sorted_messages_in_tree', sorted_messages_in_tree)
        const items = sorted_messages_in_tree.children.map((item, index) => {
            return item
        })
        return(
            <div>
                <Virtuoso
                    ref={(el) => (this.virtuoso_list = el)}
                    style={{ height: height }}
                    initialTopMostItemIndex={0}
                    totalCount={items.length}
                    itemContent={(index) => {
                        const item = items[index]
                        return (
                            <div>
                                <div>
                                    {this.render_main_comment(item, 0)}
                                    <div style={{height:3}}/>
                                </div>
                            </div>
                        );
                    }}
                />
            </div>
        )
    }

    render_main_comment(comment, depth){
        return(
            <div>
                <SwipeableList>
                    <SwipeableListItem
                        swipeRight={{
                        content: <p style={{'color': this.props.theme['primary_text_color']}}>{this.props.app_state.loc['3112c']/* Open */}</p>,
                        action: () => this.view_acquired_class_item_details(comment.data.message)
                        }}>
                        <div style={{width:'100%'}}>
                            <div style={{'padding': '1px 0px 0px 0px'}} onClick={()=> this.when_message_item_clicked(comment.data.message)}>
                                {this.render_certificate_item(comment.data.message)}
                            </div>
                        </div>
                    </SwipeableListItem>
                </SwipeableList>

                {this.render_message_children(comment, depth)}
            </div>
        )
    }

    render_message_children(comment, depth){
        var padding = depth > 4 ? '0px 0px 0px 5px' : '0px 0px 0px 20px'
        const line_color = this.props.theme['line_color']

        if(this.state.hidden_message_children_array.includes(comment.data.message['child'])){
            return(
                <div style={{'display': 'flex','flex-direction': 'row','margin':'0px 0px 0px 0px'}}>
                    <div style={{width:'100%'}}>
                        <ul style={{
                            padding: padding,
                            listStyle: 'none',
                            marginLeft: 10,
                            borderLeft: `2px solid ${line_color}`
                        }}>
                            {comment.children.map((item, index) => (
                                <li key={index} style={{padding: '4px 0px 0px 0px', position: 'relative'}}>
                                    {/* horizontal branch connecting the vertical trace to this item */}
                                    <div style={{
                                        position: 'absolute',
                                        top: 18,
                                        left: -10,
                                        width: 10,
                                        height: 2,
                                        background: line_color
                                    }}/>
                                    <div>
                                        {this.render_main_comment(item, depth+1)}
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
        if(clone.includes(parseInt(message['child']))){
            var index = clone.indexOf(parseInt(message['child']));
            if(index > -1){
                clone.splice(index, 1);
            }
        }else{
            clone.push(parseInt(message['child']))
        }

        this.setState({hidden_message_children_array:clone})
    }

    get_message_replies_in_sorted_object(){
        var messages = this.get_object_certificates()
        console.log('get_message_replies_in_sorted_object', 'messages', messages)
        var data = []
        const object_id = this.state.token_item['id']
        messages.forEach(message => {
            const parent = parseInt(object_id) == parseInt(message['child']) ? 0 : parseInt(message['child'])//if the parent in the tree is the current certificate object, set as zero.
            data.push({
                index : parseInt(message['certificate_id']), 
                sort : message['time'],
                parent : parent, 
                message: message 
            })
        });
        var tree = toTree(data);
        return tree;
    }

    get_object_certificates(){
        const e5_id = this.state.token_item['e5_id']
        const certificate_chain_data = this.props.app_state.objects_showcased_certificate_chain[e5_id] || []
        return certificate_chain_data
    }





    get_listing_token_object(listing){
        const object = this.state.token_item
        const listing_token_id = listing['ipfs']['token_id']
        const token_object = this.props.get_object_by_id_and_type(31/* 31(token_exchange) */, parseInt(listing_token_id), object['e5'])
        return token_object
    }

    render_certificate_item(listing){
        const object = this.state.token_item
        const listing_depth = listing['ipfs']['depth']
        const listing_token_e5_id = listing['ipfs']['token_e5_id']
        const listing_token_id = listing['ipfs']['token_id']
        const item = this.props.app_state.non_fungible_token_data[listing_token_e5_id]?.[object['e5']+':'+object['id']]?.[listing_depth]
        if(item == null){
            return this.render_small_skeleton_object()
        }
        const token_object = this.props.get_object_by_id_and_type(31/* 31(token_exchange) */, parseInt(listing_token_id), object['e5'])

        const depth = item['depth']
        const depth_data = item['depth_data']
        const ipfs = item['ipfs']
        const event = item['event']
        const time = item['time']
        const model_config = this.get_model_config(depth_data, token_object, time)
        const class_name = model_config['class_name']
        const maximum_supply = model_config['maximum_supply']
        const identifier_text = this.props.app_state.loc['3098be']/* '$ out of &' */.replace('$', depth_data['identifier']).replace('&', maximum_supply)
        const title = identifier_text + ' • '+ class_name
        const details = this.props.app_state.loc['3098y']/* 'Minted on $' */.replace('$', (new Date(time * 1000).toLocaleString()))
        const op = model_config['archived'] == true ? 0.6 : 1.0
        return(
            <div style={{opacity: op}}>
                {this.render_detail_item('3', {'title':title, 'details':details, 'size':'l'})}
            </div>
        )
    }

    get_model_config(depth_data, object, time){
        const certificate_models = object['ipfs'].certificate_models
        var valid_models = []
        Object.keys(certificate_models).forEach(model => {
          if(
            certificate_models[model]['id'] == depth_data['class'] && 
            (certificate_models[model]['base_fee_price_multiplier'] == depth_data['price'] || certificate_models[model]['base_fee_price_multiplier'] == 0) &&
            parseInt(depth_data['start_time']) == Math.floor(parseInt(certificate_models[model]['purchase_start_time']) / 60) &&
            parseInt(depth_data['end_time']) == Math.floor(parseInt(certificate_models[model]['purchase_end_time']) / 60)
        ){
            valid_models.push(certificate_models[model])
          }
        });

        const my_valid_models = valid_models.concat(this.get_model_config_from_archives(depth_data, object))
        return this.filter_valid_models_by_acquired_time(my_valid_models, time)
    }

    get_model_config_from_archives(depth_data, object){
        const certificate_model_history = object['ipfs'].certificate_model_history
        if(certificate_model_history == null) return []
        const valid_models = []
        Object.values(certificate_model_history).forEach(model_config => {
            if(
                (model_config['base_fee_price_multiplier'] == depth_data['price'] || model_config['base_fee_price_multiplier'] == 0) && 
                model_config['maximum_supply'] == depth_data['supply'] &&
                parseInt(depth_data['start_time']) == Math.floor(parseInt(model_config['purchase_start_time']) / 60) &&
                parseInt(depth_data['end_time']) == Math.floor(parseInt(model_config['purchase_end_time']) / 60)
            ){
                valid_models.push(certificate_model_history[model_config]);
            }
        });
        return valid_models
    }

    filter_valid_models_by_acquired_time(valid_models, time){
        if(valid_models.length == 1) return valid_models[0]
        const sorted_models = this.sortByAttributeDescending(valid_models, 'time');
        const filtered_models = sorted_models.filter((model) => {
            return (model['time']/1000 < time)
        })
        if(filtered_models.length == 0) return null
        return filtered_models[0]
    }

    view_acquired_class_item_details(listing){
        const object = this.get_listing_token_object(listing)
        const listing_depth = listing['ipfs']['depth']
        const listing_token_e5_id = listing['ipfs']['token_e5_id']
        const listing_token_id = listing['ipfs']['token_id']
        const item = this.props.app_state.non_fungible_token_data[listing_token_e5_id]?.[this.state.token_item['e5']+':'+this.state.token_item['id']]?.[listing_depth]
        
        this.props.get_verified_certificate_data(object)
        this.props.fetch_uploaded_files_for_object(item, true)
        this.props.show_dialog_bottomsheet({'item':item, 'object':object, 'view_only': true, 'neglect_certificate_chain': true }, 'view_acquired_certificate_item_details')
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

    render_empty_object(){
        var background_color = this.props.theme['card_background_color']
        return(
                <div style={{height:160, width:'100%', 'background-color': background_color, 'border-radius': '15px','padding':'10px 0px 0px 10px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                    <div style={{'margin':'10px 20px 0px 0px'}}>
                        <img src={this.props.app_state.theme['letter']} style={{height:60 ,width:'auto'}} />
                        <p style={{'display': 'flex', 'align-items':'center','justify-content':'center', 'padding':'5px 0px 0px 7px', 'color': 'gray'}}></p>
                    </div>
                </div>
            );
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
        var uploaded_data = {}
        if(item_id == '8' || item_id == '7' || item_id == '8'|| item_id == '9' || item_id == '11' || item_id == '12')uploaded_data = this.props.app_state.uploaded_data
        return(
            <div>
                <ViewGroups token_name_thumbnail_directory={this.props.app_state?.token_name_thumbnail_directory} e5s={this.props.app_state?.e5s} show_view_iframe_link_bottomsheet={this.props.show_view_iframe_link_bottomsheet.bind(this)} uploaded_data={uploaded_data} graph_type={this.props.app_state.graph_type} font={this.props.app_state.font} item_id={item_id} object_data={object_data} theme={this.props.theme} width={this.props.app_state.width} />
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
            var power = amount.toLocaleString('fullwide', {useGrouping:false}).length - 9
            return number_with_commas(amount.toLocaleString('fullwide', {useGrouping:false}).substring(0, 9)) +'e'+power
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
            var power = amount.toLocaleString('fullwide', {useGrouping:false}).length - 9
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
            var num = parseInt(diff)
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




export default CertificateChainPage;