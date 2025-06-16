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
import NumberPicker from './../components/number_picker';

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

class StageCreatorPayoutPage extends Component {
    
    state = {
        selected: 0, channel_obj:null, get_new_creator_payout_action_page_tags_object:this.get_new_creator_payout_action_page_tags_object()
    };

    set_data(channel_obj){
        this.setState({channel_obj: channel_obj})
    }

    get_new_creator_payout_action_page_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e',this.props.app_state.loc['3075']/* 'stage-payouts' */], [1]
            ],
        };
    }








    render(){
        return(
            <div style={{'padding':'10px 10px 0px 10px'}}>
                
                <div className="row">
                    <div className="col-11" style={{'padding': '0px 0px 0px 10px'}}>
                        <Tags font={this.props.app_state.font} page_tags_object={this.state.get_new_creator_payout_action_page_tags_object} tag_size={'l'} when_tags_updated={this.when_get_new_creator_payout_action_page_tags_object_updated.bind(this)} theme={this.props.theme}/>
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

    when_get_new_creator_payout_action_page_tags_object_updated(tag_obj){
        this.setState({get_new_creator_payout_action_page_tags_object: tag_obj})   
    }


    render_everything(){
        var size = this.props.app_state.size
        if(this.state.channel_obj == null) return;

        if(size == 's'){
            return(
                <div>
                    {this.render_stage_creator_payout_data()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_stage_creator_payout_data()}
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
                        {this.render_stage_creator_payout_data()}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_empty_views(3)}
                    </div>
                </div>
            )
        }
    }


    render_stage_creator_payout_data(){
        var files = this.get_logged_files()
        var logged_files = files.length
        var load_proportion = this.get_loaded_proportion(files) * 100
        var subscriptions = this.state.channel_obj['ipfs'].selected_creator_group_subscriptions
        return(
            <div>
                {this.render_detail_item('4', {'font':this.props.app_state.font, 'textsize':'15px', 'text':this.props.app_state.loc['3075a']/* 'Stage royalty payouts for the creators in your creator group for the months preceding this month.' */})}
                <div style={{height:10}}/>

                {this.render_channel_object()}
                <div style={{height:10}}/>

                {this.render_creators()}
                <div style={{height:10}}/>

                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['3075d']/* 'Proportion Loaded.' */, 'subtitle':this.format_power_figure(logged_files), 'barwidth':this.calculate_bar_width(logged_files), 'number':this.format_account_balance_figure(logged_files), 'barcolor':'', 'relativepower':this.props.app_state.loc['3075c']/* 'files' */, })}

                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['3075b']/* 'Currently Tracked Files.' */, 'subtitle':this.format_power_figure(load_proportion), 'barwidth':(Math.floor(load_proportion)+'%'), 'number':(load_proportion+'%'), 'barcolor':'', 'relativepower':this.props.app_state.loc['1881']/* 'proportion' */, })}
                </div>
                <div style={{height:10}}/>

                {this.render_subscriptions()}
                <div style={{height:10}}/>

                {this.render_detail_item('4', {'font':this.props.app_state.font, 'textsize':'13px', 'text':this.props.app_state.loc['3075g']/* '$ subscriptions used.' */.replace('$', subscriptions.length)})}
                
                {this.render_calculate_payout_button_if_ready(load_proportion)}

            </div>
        )
    }

    render_calculate_payout_button_if_ready(proportion){
        if(proportion == 100 && this.has_all_subscriptions_loaded()){
            return(
                <div>
                    {this.render_detail_item('0')}

                    {this.render_detail_item('3', {'size':'l', 'details':this.props.app_state.loc['3075f']/* 'Calculate the required payout amounts to each creator.' */, 'title':this.props.app_state.loc['3075e']/* 'Calculate Payouts' */})}
                    <div style={{height:10}}/>

                    <div onClick={()=>this.start_payout_calculation_process()}>
                        {this.render_detail_item('5', {'text':this.props.app_state.loc['2081']/* 'Perform Action' */, 'action':''})}
                    </div>
                </div>
            )
        }
    }

    

    start_payout_calculation_process(){
        var files = this.get_logged_files()
        var file_view_data = []

        files.forEach(file => {
            var view_data = this.get_file_view_data(file['file'])
            if(view_data != null && this.is_file_nitro_valid(file['file'])){
                var obj = structuredClone(file)
                obj['view_data'] = view_data
                file_view_data.push(obj)
            }
        });

        this.props.notify(this.props.app_state.loc['3075h']/* 'Sending payout data request...' */, 2300);
        this.props.calcualte_creator_payouts(this.state.channel_obj, file_view_data)
    }
    
    get_file_view_data(file_link){
        var ecid_obj = this.get_cid_split(file_link)
        if(this.props.app_state.uploaded_data[ecid_obj['filetype']] == null) return false
        var data = this.props.app_state.uploaded_data[ecid_obj['filetype']][ecid_obj['full']]
        var file = data['hash']
        var stream_data = this.props.app_state.file_streaming_data[file]
        if(stream_data != null){
            return stream_data
        }
    }

    is_file_nitro_valid(file_link){
        var ecid_obj = this.get_cid_split(file_link)
        if(this.props.app_state.uploaded_data[ecid_obj['filetype']] == null) return false
        var data = this.props.app_state.uploaded_data[ecid_obj['filetype']][ecid_obj['full']]
        var nitro_id = data['nitro']
        var selected_creator_group_nitros = this.state.channel_obj['ipfs'].selected_creator_group_nitros
        if(selected_creator_group_nitros != null && selected_creator_group_nitros.length > 0){
            if(!selected_creator_group_nitros.includes(nitro_id)){
                return false
            }
        }
        return true
    }

    has_all_subscriptions_loaded(){
        var has_all_subscriptions_loaded = true;
        var items = this.state.channel_obj['ipfs'].selected_creator_group_subscriptions
        items.forEach(item => {
            var e5 = 'E'+item.split('E')[1]
            var id = item.split('E')[0]
            var subscription_item = this.props.app_state.created_subscription_object_mapping[e5][id]
            if(subscription_item == null){
                has_all_subscriptions_loaded = false;
            }
        });
        return has_all_subscriptions_loaded
    }

    render_subscriptions(){
        var items = this.state.channel_obj['ipfs'].selected_creator_group_subscriptions
        return(
            <div style={{'margin':'3px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                    {items.reverse().map((item, index) => (
                        <li style={{'display': 'inline-block', 'margin': '0px 2px 1px 2px', '-ms-overflow-style':'none'}}>
                            {this.render_subscription_item(item)}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    render_subscription_item(item){
        var e5 = 'E'+item.split('E')[1]
        var id = item.split('E')[0]
        var subscription_item = this.props.app_state.created_subscription_object_mapping[e5][id]
        var opacity = 0.7
        var details = '????';
        if(subscription_item != null){
            opacity = 1.0
            details = this.truncate(subscription_item['ipfs'].entered_title_text, 17)
        }
        return(
            <div style={{'opacity':opacity}}>
                {this.render_detail_item('3', {'title':' • '+id, 'details':details, 'size':'l', 'title_image':this.props.app_state.e5s[e5].e5_img})}
            </div>
        )
    }
    
    truncate(source, size) {
        var firstLine = source.includes("\n") ? source.split("\n")[0] : source;
        return firstLine.length > size ? firstLine.slice(0, size - 1) + "…" : firstLine;
    }

    render_creators(){
        var items = this.state.channel_obj['ipfs'].creators
        return(
            <div style={{'margin':'3px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                    {items.reverse().map((item, index) => (
                        <li style={{'display': 'inline-block', 'margin': '0px 2px 1px 2px', '-ms-overflow-style':'none'}}>
                            {this.render_creator_item(item)}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    render_empty_horizontal_list_item2(){
        var background_color = this.props.theme['view_group_card_item_background']
        return(
            <div>
                <div style={{height:43, width:90, 'background-color': background_color, 'border-radius': '8px','padding':'10px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                    <div style={{'margin':'0px 0px 0px 0px'}}>
                        <img alt="" src={this.props.app_state.theme['letter']} style={{height:20 ,width:'auto'}} />
                    </div>
                </div>
            </div>
        )
    }

    render_creator_item(item){
        return(
            <div>
                {this.render_detail_item('3', {'title':' • '+this.get_data(item).id, 'details':this.get_senders_name(item), 'size':'l', 'title_image':this.props.app_state.e5s[this.get_data(item).e5].e5_img})}
            </div>
        )
    }

    get_data(item){
        var obj = item.split(':')
        return { e5: obj[0], id: obj[1]}
    }

    get_senders_name(item){
        var data_item = this.get_data(item)
        var sender = data_item.id
        var e5 = data_item.e5
        if(sender == this.props.app_state.user_account_id[e5]){
            return this.props.app_state.loc['1694']/* 'You' */
        }else{
            var obj = this.props.app_state.alias_bucket[e5]
            var alias = (obj[sender] == null ? this.props.app_state.loc['c311m']/* 'Account' */ : obj[sender])
            return alias
        }
    }

    round_off(float_number){
        return (Math.round(float_number * 100) / 100)
    }

    get_logged_files(){
        var object = this.state.channel_obj
        var uploaded_files = this.props.app_state.object_creator_files[object['e5_id']]
        
        if(uploaded_files == null){
            return []
        }
        return uploaded_files
    }

    get_loaded_proportion(files){
        var total_files = files.length
        var loaded_files = 0

        files.forEach(file => {
            if(this.has_file_loaded(file['file'])){
                loaded_files++
            }
        });

        if(loaded_files == 0){
            return 0
        }
        return this.round_off(loaded_files / total_files)
    }

    has_file_loaded(file){
        var ecid_obj = this.get_cid_split(file)
        if(this.props.app_state.uploaded_data[ecid_obj['filetype']] == null) return false
        var data = this.props.app_state.uploaded_data[ecid_obj['filetype']][ecid_obj['full']]
        if(data == null) return false
        if(data['data'] == null) return false
        var file = data['hash']
        var nitro_id = data['nitro']
        if(nitro_id != null){
            var stream_data = this.props.app_state.file_streaming_data[file]
            if(stream_data == null){
                return false
            }
        }
        return true
    }

    render_channel_object(){
        var object = this.state.channel_obj
        var background_color = this.props.theme['card_background_color']
        var card_shadow_color = this.props.theme['card_shadow_color']
        var item = this.format_channel_item(object)
        return(
            <div  style={{height:'auto', width:'100%', 'background-color': background_color, 'border-radius': '15px','padding':'5px 5px 0px 0px', 'box-shadow': '0px 0px 1px 2px '+card_shadow_color}}>
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

    format_channel_item(object){
        var tags = object['ipfs'] == null ? ['Post'] : [].concat(object['ipfs'].entered_indexing_tags)
        if(object['ipfs'].selected_device_city != null && object['ipfs'].selected_device_city != ''){
            tags = [object['ipfs'].selected_device_city].concat(tags)
        }
        var title = object['ipfs'] == null ? 'Post ID' : object['ipfs'].entered_title_text
        var extra = ''
        if(object['ipfs']['blocked_data'] != null){
            extra = extra+'🗝️'
        }
        
        if(extra != ''){
            extra = extra+' '
        }
        var age = object['event'] == null ? 0 : object['event'].returnValues.p7
        var time = object['event'] == null ? 0 : object['event'].returnValues.p6
        var sender = this.get_senders_name2(object['event'].returnValues.p5, object);
        return {
            'tags':{'active_tags':tags, 'index_option':'indexed', 'selected_tags':this.props.app_state.explore_section_tags, 'when_tapped':'select_deselect_tag'},
            'id':{'title':' • '+object['id']+sender, 'details':extra+title, 'size':'l', 'title_image':this.props.app_state.e5s[object['e5']].e5_img, 'border_radius':'0%'},
            'age':{'style':'s', 'title':'Block Number', 'subtitle':'??', 'barwidth':this.get_number_width(age), 'number':` ${number_with_commas(age)}`, 'barcolor':'', 'relativepower':`${this.get_time_difference(time)}`, },
            'min':{'details':object['e5']+' • '+object['id']+sender, 'title':extra+title, 'size':'l', 'border_radius':'0%'}
        }
    }

    get_senders_name2(sender, object){
        // var object = this.get_mail_items()[this.props.selected_mail_item];
        if(sender == this.props.app_state.user_account_id[object['e5']]){
            return ' • '+this.props.app_state.loc['1694']/* 'You' */
        }else{
            var alias = (this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[sender] == null ? '' : ' • '+this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[sender])
            return alias
        }
    }






    render_payout_information(){
        
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
            return {'size':parseFloat(size/(1024^4)).toFixed(3), 'unit':'TBs'}
        }
        else if(size > (1024^3)){
            return {'size':parseFloat(size/(1024^3)).toFixed(3), 'unit':'GBs'}
        }
        else if(size > (1024^2)){
            return {'size':parseFloat(size/(1024^2)).toFixed(3), 'unit':'MBs'}
        }
        else if(size > 1024){
            return {'size':parseFloat(size/1024).toFixed(3), 'unit':'KBs'}
        }
        else{
            return {'size':size, 'unit':'bytes'}
        }
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

    get_number_width(number){
        if(number == null) return '0%'
        var last_two_digits = number.toString().slice(0, 1)+'0';
        if(number > 10){
            last_two_digits = number.toString().slice(0, 2);
        }
        return last_two_digits+'%'
    }

}




export default StageCreatorPayoutPage;