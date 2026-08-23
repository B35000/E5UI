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

class SelectCertificatePage extends Component {
    
    state = {
        selected: 0, id: makeid(8), type: this.props.app_state.loc['3111']/* 'link-certificate' */, entered_indexing_tags:[this.props.app_state.loc['3111a']/* 'link' */, this.props.app_state.loc['3111b']/* 'connect' */,this.props.app_state.loc['3111c']/* 'join' */],

        get_select_certificate_title_tags_object:this.get_select_certificate_title_tags_object(),
        typed_certificate_account:'', verified_certificates:[]
    };


    get_select_certificate_title_tags_object(){
        const obj = {
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e',this.props.app_state.loc['3111']/* 'link-certificate' */], [1]
            ],
        };

        return obj
    }


    set_data(item, object, model_data, certificate_ui){
        this.setState({
            depth_item: item, 
            token_item: object, 
            model_data: model_data, 
            e5: object['e5'],
            certificate_ui: certificate_ui
        })
    }




    render(){
        return(
            <div style={{'padding':'10px 10px 0px 10px'}}>
                <div className="row">
                    <div className="col-11" style={{'padding': '0px 0px 0px 10px'}}>
                        <Tags font={this.props.app_state.font} app_state={this.props.app_state} page_tags_object={this.state.get_select_certificate_title_tags_object} tag_size={'l'} when_tags_updated={this.when_get_select_certificate_title_tags_object_updated.bind(this)} theme={this.props.theme}/>
                    </div>
                    <div className="col-1" style={{'padding': '0px 0px 0px 0px'}}>
                        <div className="text-end" style={{'padding': '0px 10px 0px 0px'}} >
                            <img alt="" className="text-end" onClick={()=>this.finish()} src={this.props.theme['close']} style={{height:36, width:'auto'}} />
                        </div>
                    </div>
                </div>

                {this.render_everything()}
            </div>
        )
    }

    when_get_select_certificate_title_tags_object_updated(tag_obj){
        this.setState({get_select_certificate_title_tags_object: tag_obj})
    }


    render_everything(){
        if(this.state.token_item == null) return;
        var size = this.props.app_state.size
        if(size == 's'){
            return(
                <div>
                    {this.render_searched_certificates_data()}
                    {this.render_detail_item('0')}
                    {this.render_set_certificate_authorities()}
                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_searched_certificates_data()}
                        {this.render_detail_item('0')}
                        {this.render_detail_item('0')}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_set_certificate_authorities()}
                    </div>
                </div>
                
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_searched_certificates_data()}
                        {this.render_detail_item('0')}
                        {this.render_detail_item('0')}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_set_certificate_authorities()}
                    </div>
                </div>
            )
        }
    }

    render_searched_certificates_data(){
        return(
            <div>
                {this.render_detail_item('3', { 'title': this.props.app_state.loc['3111d']/* 'Selected Certificates.' */, 'details': this.props.app_state.loc['3111e']/* 'Tap a certificate object to select it and link your minted token to it.' */, 'size': 'l' })}
                {/* <div style={{ height:10 }}/>
                {this.state.certificate_ui} */}

                <div style={{ height:10 }}/>
                <div style={{'width':'98%'}}>
                    <div className="row">
                        <div className="col-11" style={{'margin': '0px 0px 0px 0px'}}>
                            <TextInput height={30} placeholder={this.props.app_state.loc['3093ga']/* 'Certificate Object Id...' */} when_text_input_field_changed={this.when_typed_certificate_account_input_field_changed.bind(this)} text={this.state.typed_certificate_account} theme={this.props.theme}/>
                        </div>
                        <div className="col-1" style={{'padding': '0px 0px 0px 0px'}} onClick={()=> this.search_certificate_id()}>
                            <div className="text-end" style={{'padding': '5px 10px 0px 0px'}} >
                                <img alt="" className="text-end" src={this.props.theme['add_text']} style={{height:37, width:'auto'}} />
                            </div>
                        </div>
                    </div>
                </div>
                
                <div style={{height:10}}/>

                {this.render_searched_certificate()}
            </div>
        )
    }

    render_set_certificate_authorities(){
        const items = [].concat(this.state.verified_certificates)
        if(items.length == 0){
            return(
                <div>
                    {this.render_detail_item('3', { 'title': this.props.app_state.loc['3093gc']/* 'Added Certificates.' */, 'details': this.props.app_state.loc['3111f']/* 'When you add a certificate object, it will show here.' */, 'size': 'l' })}
                    <div style={{ height:10 }}/>
                    {this.render_empty_object()}
                </div>
            )
        }
        return(
            <div style={{}}>
                {this.render_detail_item('3', { 'title': this.props.app_state.loc['3093gc']/* 'Added Certificates.' */, 'details': this.props.app_state.loc['3111g']/* 'All the added certificate objects are shown below.' */, 'size': 'l' })}
                <div style={{ height:10 }}/>
                <ul style={{ 'padding': '0px 5px 0px 5px'}}>
                    <SwipeableList>
                        {items.map((item, index) => (
                            <li style={{}}>
                                <div key={index}>
                                    <SwipeableListItem
                                        swipeLeft={{
                                        content: <p style={{'color': this.props.theme['primary_text_color']}}>{this.props.app_state.loc['3093eq']/* Delete */}</p>,
                                        action: () =>this.when_certificate_item_clicked(item, index)
                                        }}>
                                        <div style={{width:'100%', 'padding': '2px 5px 2px 5px'}}>
                                            {this.render_certificate(this.get_certificate_object(item))}
                                        </div>
                                    </SwipeableListItem>
                                </div>
                            </li> 
                        ))}
                    </SwipeableList>
                    
                </ul>
            </div>
        )
    }

    when_typed_certificate_account_input_field_changed(text){
        this.setState({typed_certificate_account: text})
    }

    async search_certificate_id(){
        const typed_certificate_account = this.state.typed_certificate_account.trim().replace('e', '')
        const selected_e5 = this.state.e5
        const typed_certificate_e5_id = typed_certificate_account+selected_e5

        if(isNaN(typed_certificate_account) || parseInt(typed_certificate_account) < 1001){
            this.props.notify(this.props.app_state.loc['3093eu']/* 'That ID is not valid.' */)
        }
        else{
            this.props.notify(this.props.app_state.loc['3093ew']/* 'Searching...' */)
            const type = await this.props.load_obligation_contract(typed_certificate_account, selected_e5)
            this.setState({searched_certificate_e5_id: typed_certificate_e5_id})
            
            if(type != 31/* 31(token_exchange) */){
                this.props.notify(this.props.app_state.loc['3093eu']/* 'That ID is not valid.' */)
            }
        }
    }

    get_certificate_object(id){
        const all_certificates = this.props.app_state.created_certificates[this.state.e5]
        const matching_certificate = all_certificates.filter((object) => {
            return (object['id'] == id)
        })
        return matching_certificate[0]
    }

    render_searched_certificate(){
        const all_certificates = this.get_all_sorted_objects(this.props.app_state.created_certificates)
        const searched_certificate_e5_id = this.state.searched_certificate_e5_id;
        const matching_certificate = all_certificates.filter((object) => {
            return (object['e5_id'] == searched_certificate_e5_id)
        })
        if(matching_certificate.length == 0){
            return(
                <div>
                    {this.render_empty_object()}
                </div>
            )
        }else{
            return(
                <div onClick={() => this.when_searched_certificate_clicked(matching_certificate[0])}>
                    {this.render_certificate(matching_certificate[0])}
                </div>
            )
        }
    }

    render_certificate(object){
        const item = this.format_certificate_item(object)
        var background_color = this.props.theme['card_background_color']
        var card_shadow_color = this.props.theme['card_shadow_color']

        return(
                <div style={{height:'auto', width:'100%', 'background-color': background_color, 'border-radius': '15px','padding':'5px 5px 0px 0px', 'box-shadow': '0px 0px 1px 2px '+card_shadow_color}}>
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

    format_certificate_item(object){
        var tags = object['ipfs'] == null ? ['Certificate'] : [].concat(object['ipfs'].entered_indexing_tags)
        var title = object['ipfs'] == null ? 'Certificate ID' : object['ipfs'].entered_title_text
        var age = object['event'].returnValues.p5
        var time = object['event'].returnValues.p4
        var sender = this.get_senders_name_or_you(object['author'], object);
        return {
            'tags':{'active_tags':tags, 'index_option':'indexed', 'selected_tags':this.props.app_state.explore_section_tags, 'when_tapped':'select_deselect_tag'},
            'id':{'title':'• '+number_with_commas(object['id'])+sender, 'details':title, 'size':'l', 'title_image':this.props.app_state.e5s[object['e5']].e5_img, 'border_radius':'0%'},
            'age':{'style':'s', 'title':'', 'subtitle':'', 'barwidth':this.get_number_width(age), 'number':`${number_with_commas(age)}`, 'barcolor':'', 'relativepower':`${this.get_time_difference(time)}`, 'number_when_tapped':`${new Date(time*1000).toLocaleDateString(undefined, { weekday: 'short' })} ${(new Date(time*1000).toLocaleString())}` },
        }
    }

    when_searched_certificate_clicked(object){
        const clone = this.state.verified_certificates.slice()
        const my_account = this.props.app_state.user_account_id[object['e5']]
        if(clone.includes(object['id'])){
            this.props.notify(this.props.app_state.loc['3093gb']/* 'Youve already added this certificate.' */, 4400);
        }
        else if(my_account != object['author']){
            this.props.notify(this.props.app_state.loc['3111h']/* 'You are not the owner of that certificate.' */, 4400);
        }
        else{
            clone.push(object['id'])
            this.setState({verified_certificates: clone})
        }
        
    }

    when_certificate_item_clicked(item, index){
        const clone = this.state.verified_certificates.slice()
        clone.splice(index, 1)
        this.setState({verified_certificates: clone})
    }

    get_senders_name_or_you(sender, e5){
        if(sender == this.props.app_state.user_account_id[e5]){
            return this.props.app_state.loc['1694']/* You. */
        }
        var bucket = this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)
        var alias = (bucket[sender] == null ? sender : bucket[sender])
            return alias
    }










    finish(){
        const verified_certificates = this.state.verified_certificates;

        if(verified_certificates.length == 0){
            this.props.notify(this.props.app_state.loc['3111i']/* 'You havent selected any certificate objects.' */, 6700)
        }
        else{
            this.props.add_selected_certificate_to_stack(this.state)
            this.props.notify(this.props.app_state.loc['18']/* 'Transaction added to stack' */, 700)
        }
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




export default SelectCertificatePage;