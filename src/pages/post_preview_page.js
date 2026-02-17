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

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

// import Letter from './../assets/letter.png';

var bigInt = require("big-integer");

function bgN(number, power) {
  return bigInt((number+"e"+power)).toString();
}

function number_with_commas(x) {
    if(x == null) x = '';
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

class PostPreview extends Component {
    
    state = {
        selected: 0, post_object: null,
    };

    render(){
        if(this.state.post_object == null) return;
        
        return(
            <div style={{'padding':'10px 10px 0px 10px'}}>
                {this.render_everything()}
            </div>
        )
    }


    render_everything(){
        var size = this.props.app_state.size

        if(size == 's'){
            return(
                <div>
                    {this.render_content()}
                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_content()}
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

    render_content(){
        const { subscriptions, all_subscriptions_available, missing_subscriptions } = this.get_post_object_subscriptions()
        return(
            <div>
                {this.render_detail_item('3', {'size':'l', 'details':this.props.app_state.loc['1302']/* 'You need to pay those subscriptions first before you can view the full post.' */, 'title':this.props.app_state.loc['1301']/* Subscription Locked' */})}
                <div style={{height: 10}}/>

                {this.render_post_object(this.state.post_object)}
                {this.render_detail_item('0')}
                {this.render_detail_item('4', {'text':this.props.app_state.loc['1303']/* 'Subscriptions to pay.' */, 'textsize':'13px', 'font':this.props.app_state.font})}
                <div style={{height: 10}}/>
                {this.render_subscription_objects(subscriptions, all_subscriptions_available, missing_subscriptions)}
                {this.render_detail_item('0')}
                {this.render_pin_post_or_channel(this.state.post_object)}
            </div>
        )
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


    set_post(post, type){
        this.setState({post_object: post, type: type})
    }

    get_post_object_subscriptions(){
        var subscriptions = []
        var item = this.state.post_object
        var required_subscriptions = (item['ipfs'].selected_subscriptions != null && item['ipfs'].selected_subscriptions.length > 0) ? item['ipfs'].selected_subscriptions : item['ipfs'].selected_subscriptions
        var all_subscriptions_available = true;
        var missing_subscriptions = []
        // console.log('get_post_object_subscriptions', 'created_subscription_object_mapping',this.props.app_state.created_subscription_object_mapping)
        required_subscriptions.forEach(subscription_e5_id => {
            var subscription_id = subscription_e5_id
            var subscription_e5 = 'E25'
            if(subscription_e5_id.includes('E')){
                subscription_id = subscription_e5_id.split('E')[0]
                subscription_e5 = 'E'+subscription_e5_id.split('E')[1]
            }
            if(this.props.app_state.created_subscription_object_mapping[subscription_e5] != null && this.props.app_state.created_subscription_object_mapping[subscription_e5][subscription_id] != null){
                var subscription_item = this.props.app_state.created_subscription_object_mapping[subscription_e5][subscription_id]
                subscriptions.push(subscription_item)
            }else{
                all_subscriptions_available = false
                missing_subscriptions.push(subscription_id)
            }
        });
        return {subscriptions, all_subscriptions_available, missing_subscriptions}
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


    render_post_object(object, index){
        var background_color = this.props.theme['card_background_color']
        var card_shadow_color = this.props.theme['card_shadow_color']
        var item = this.format_post_item(object)
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

    format_post_item(object){
        var tags = object['ipfs'] == null ? ['Post'] : [object['e5']].concat(object['ipfs'].entered_indexing_tags)
        var title = object['ipfs'] == null ? 'Post ID' : object['ipfs'].entered_title_text
        var age = object['event'] == null ? 0 : object['event'].returnValues.p7
        var time = object['event'] == null ? 0 : object['event'].returnValues.p6
        return {
            'tags':{'active_tags':tags, 'index_option':'indexed', 'selected_tags':this.props.app_state.explore_section_tags, 'when_tapped':'select_deselect_tag'},
            'id':{'title':object['id'], 'details':title, 'size':'l'},
            'age':{'style':'s', 'title':'Block Number', 'subtitle':'??', 'barwidth':this.get_number_width(age), 'number':`block ${number_with_commas(age)}`, 'barcolor':'', 'relativepower':`${this.get_time_difference(time)}`, }
        }
    }










    render_subscription_objects(subscriptions, all_subscriptions_available, missing_subscriptions){
        if(all_subscriptions_available == false){
            return(
                <div style={{margin:'5px 0px 5px 0px'}}>
                    {missing_subscriptions.map((item, index) => (
                        <div style={{'padding': '2px 0px 2px 0px'}}>
                            {this.render_skeleton_object()}
                        </div>
                    ))}
                </div>
            )
        }
        const items = this.sort_subscriptions(subscriptions)
        return ( 
            <div style={{}}>
                <div style={{ 'padding': '0px 0px 0px 0px'}}>
                    {items.map((item, index) => (
                        <div style={{'padding': '2px 0px 2px 0px'}}>
                            {this.render_subscription_object(item, index)}
                        </div>
                    ))}
                </div>
            </div>
        );
    }


    render_skeleton_object(){
        const styles = {
            container: {
                position: 'relative',
                width: '100%',
                height: 160,
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
                height: 60,
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

    sort_subscriptions(items){
        var my_selected_e5 = this.props.app_state.selected_e5
        var my_selected_e5_subscriptions = []
        var subscriptions_with_account = []
        var other_subscriptions = []
        items.forEach(subscription => {
            if(subscription['e5'] == my_selected_e5){
                my_selected_e5_subscriptions.push(subscription)
            }
            else if(this.props.app_state.user_account_id[subscription['e5']] != null && this.props.app_state.user_account_id[subscription['e5']] != 1){
                subscriptions_with_account.push(subscription)
            }
            else{
                other_subscriptions.push(subscription)
            }
        });
        return my_selected_e5_subscriptions.concat(subscriptions_with_account, other_subscriptions)
    }


    render_subscription_object(object, index){
        var background_color = this.props.theme['card_background_color']
        var card_shadow_color = this.props.theme['card_shadow_color']
        var item = this.format_subscription_item(object)
        return(
            <div  style={{height:'auto', width:'100%', 'background-color': background_color, 'border-radius': '15px','padding':'5px 5px 0px 0px', 'max-width':'420px', 'box-shadow': '0px 0px 1px 2px '+card_shadow_color}}>
                <div style={{'padding': '0px 0px 0px 5px'}}>
                    {this.render_detail_item('1', item['tags'])}
                    <div style={{height: 10}}/>
                    <div style={{'padding': '0px 0px 0px 0px'}} onClick={() => this.when_subscription_item_clicked(index, object)}>
                        {this.render_detail_item('3', item['id'])}
                    </div>
                    <div style={{'padding': '20px 0px 0px 0px'}} onClick={() => this.when_subscription_item_clicked(index, object)}>
                        {this.render_detail_item('2', item['age'])}
                    </div>
                    
                </div>         
            </div>
        )
    }


    when_subscription_item_clicked(index, object){
        this.props.when_post_preview_subscription_tapped(object)
    }

    format_subscription_item(object){
        var tags = object['ipfs'] == null ? ['Subscription'] : [object['e5']].concat(object['ipfs'].entered_indexing_tags)
        var title = object['ipfs'] == null ? 'Subscription ID' : object['ipfs'].entered_title_text
        var age = object['event'] == null ? 0 : object['event'].returnValues.p5
        var time = object['event'] == null ? 0 : object['event'].returnValues.p4
        return {
            'tags':{'active_tags':tags, 'index_option':'indexed', 'selected_tags':this.props.app_state.job_section_tags, 'when_tapped':'select_deselect_tag'},
            'id':{'title':object['id'], 'details':title, 'size':'l'},
            'age':{'style':'s', 'title':'', 'subtitle':'', 'barwidth':this.get_number_width(age), 'number':`${number_with_commas(age)}`, 'barcolor':'', 'relativepower':`${this.get_time_difference(time)}`, }
        }
    }




    is_object_sender_blocked(object){
        var blocked_account_obj = this.get_all_sorted_objects(this.props.app_state.blocked_accounts)
        var blocked_accounts = []
        blocked_account_obj.forEach(account => {
            if(!blocked_accounts.includes(account['id'])){
                blocked_accounts.push(account['id'])
            }
        });

        if(blocked_accounts.includes(object['author'])){
            return true
        }
        return false
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

        return all_objects
    }





    render_pin_post_or_channel(object){
        if(this.state.type == 'channel'){
            return(
                <div>
                    {this.render_pin_channel_button(object)}
                </div>
            )
        }
        else if(this.state.type == 'post'){
            return(
                <div>
                    {this.render_pin_post_button(object)}
                </div>
            )
        }
        else if(this.state.type == 'audio'){
            return(
                <div>
                    {this.render_pin_audio_button(object)}
                </div>
            )
        }
        else if(this.state.type == 'video'){
            return(
                <div>
                    {this.render_pin_video_button(object)}
                </div>
            )
        }
    }

    render_pin_post_button(object){
        return(
            <div>
                {this.render_detail_item('3', {'size':'l', 'details':this.props.app_state.loc['1304']/* 'Pin the post to your feed' */, 'title':this.props.app_state.loc['1305']/* 'Pin Post' */})}
                <div style={{height:10}}/>
                <div onClick={()=> this.when_pin_post_clicked(object)}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['1306']/* 'Pin/Unpin Post' */, 'action':''},)}
                </div>
            </div>
        )
    }

    render_pin_channel_button(object){
        return(
            <div>
                {this.render_detail_item('3', {'size':'l', 'details':this.props.app_state.loc['2076']/* 'Pin the channel to your feed' */, 'title':this.props.app_state.loc['2077']/* 'Pin Channel' */})}
                <div style={{height:10}}/>
                <div onClick={()=> this.when_pin_post_clicked(object)}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['2078']/* 'Pin/Unpin Channel' */, 'action':''},)}
                </div>
            </div>
        )
    }

    render_pin_audio_button(object){
        return(
            <div>
                {this.render_detail_item('3', {'size':'l', 'details':this.props.app_state.loc['1306a']/* 'Pin the Audiopost to  your feed.' */, 'title':this.props.app_state.loc['1306b']/* 'Pin Audiopost' */})}
                <div style={{height:10}}/>
                <div onClick={()=> this.when_pin_post_clicked(object)}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['1306c']/* 'Pin/Unpin Audiopost' */, 'action':''},)}
                </div>
            </div>
        )
    }

    render_pin_video_button(object){
        return(
            <div>
                {this.render_detail_item('3', {'size':'l', 'details':this.props.app_state.loc['1306e']/* 'Pin the Audiopost to  your feed.' */, 'title':this.props.app_state.loc['1306d']/* 'Pin Videopost' */})}
                <div style={{height:10}}/>
                <div onClick={()=> this.when_pin_post_clicked(object)}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['1306f']/* 'Pin/Unpin Videopost' */, 'action':''},)}
                </div>
            </div>
        )
    }

    when_pin_post_clicked(object){
        if(this.state.type == 'channel'){
            this.props.pin_channel(object)
        }
        else if(this.state.type == 'post'){
            this.props.pin_post(object)
        }
        else if(this.state.type == 'audio'){
            this.props.pin_audio(object)
        }
        else if(this.state.type == 'video'){
            this.props.pin_video(object)
        }
        
    }













    /* renders the specific element in the post or detail object */
    render_detail_item(item_id, object_data){
        var censor_list = this.props.app_state.censored_keyword_phrases.concat(this.props.app_state.censored_keywords_by_my_following)
        return(
            <div>
                <ViewGroups graph_type={this.props.app_state.graph_type} font={this.props.app_state.font} item_id={item_id} object_data={object_data} theme={this.props.theme} width={this.props.app_state.width} censored_keyword_phrases={censor_list}/>
            </div>
        )

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


}




export default PostPreview;