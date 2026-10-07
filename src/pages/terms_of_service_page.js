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
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

var bigInt = require("big-integer");

function bgN(number, power) {
  return bigInt((number+"e"+power)).toString();
}

function number_with_commas(x) {
    if(x == null) x = '';
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

class TermsOfServicePage extends Component {
    
    state = {
        selected: 0, get_terms_of_service_tags_object:this.get_terms_of_service_tags_object(),
    };


    get_terms_of_service_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e', this.props.app_state.loc['3117c']/* 'terms-of-service' */, this.props.app_state.loc['3117d']/* 'privacy-policy' */, this.props.app_state.loc['3117j']/* 'content-policy' */], [1]
            ],
        };
    }




    render(){
        return(
            <div style={{'padding':'10px 10px 0px 10px', 'overflow-x':'hidden'}}>
                <Tags font={this.props.app_state.font} page_tags_object={this.state.get_terms_of_service_tags_object} tag_size={'l'} when_tags_updated={this.when_get_terms_of_service_tags_object_updated.bind(this)} theme={this.props.theme}/>

                {this.render_everything()}
                
            </div>
        )
    }

    when_get_terms_of_service_tags_object_updated(tag_obj){
        this.setState({get_terms_of_service_tags_object: tag_obj})
    }




    render_everything(){
        const selected_item = this.get_selected_item(this.state.get_terms_of_service_tags_object, 'e')

        if(selected_item == this.props.app_state.loc['3117c']/* 'terms-of-service' */){
            return this.render_terms_of_service()
        }
        else if(selected_item == this.props.app_state.loc['3117d']/* 'privacy-policy' */){
            return this.render_privacy_policy()
        }
        else if(selected_item == this.props.app_state.loc['3117j']/* 'content-policy' */){
            return this.render_content_policy()
        }
    }



    render_terms_of_service(){
        var size = this.props.size
        if(size == 's'){
            return(
                <div>
                    {this.render_terms_of_service_details()}
                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_terms_of_service_details()}
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
                        {this.render_terms_of_service_details()}
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

    render_terms_of_service_details(){
        const items = this.props.app_state.loc['3116']/* terms of service */
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['3117e']/* 'E5 Terms Of Service.' */, 'details':this.props.app_state.loc['3117f']/* 'Below is the terms of service as mandated by E5\'s developers and maintainers. Read them carefully before closing this modal and proceeding to use the webapp.' */, 'size':'l'})}
                {this.render_detail_item('0')}
                {items.map((term, index) => (
                    <div>
                        {this.render_detail_item('4', {'text':term, 'textsize':'13px', 'font':this.props.app_state.font})}
                        <div style={{height:4}}/>
                    </div>
                ))}
            </div>
        )
    }





    render_privacy_policy(){
        var size = this.props.size
        if(size == 's'){
            return(
                <div>
                    {this.render_privacy_policy_details()}
                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_privacy_policy_details()}
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
                        {this.render_privacy_policy_details()}
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

    render_privacy_policy_details(){
        const items = this.props.app_state.loc['3117']/* privacy policy */
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['3117h']/* 'E5 Privacy Policy.' */, 'details':this.props.app_state.loc['3117g']/* 'Below is the privacy policy as mandated by E5\'s developers and maintainers. Read them carefully before closing this modal and proceeding to use the webapp.' */, 'size':'l'})}
                {this.render_detail_item('0')}
                {items.map((term, index) => (
                    <div>
                        {this.render_detail_item('4', {'text':term, 'textsize':'13px', 'font':this.props.app_state.font})}
                        <div style={{height:4}}/>
                    </div>
                ))}
            </div>
        )
    }




    render_content_policy(){
        var size = this.props.size
        if(size == 's'){
            return(
                <div>
                    {this.render_content_policy_details()}
                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_content_policy_details()}
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
                        {this.render_content_policy_details()}
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

    render_content_policy_details(){
        const items = this.props.app_state.loc['3117i']/* content policy */
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['3117k']/* 'E5 Content Policy.' */, 'details':this.props.app_state.loc['3117l']/* 'Below is the content policy as mandated by E5\'s developers and maintainers. Read them carefully before closing this modal and proceeding to use the webapp.' */, 'size':'l'})}
                {this.render_detail_item('0')}
                {items.map((term, index) => (
                    <div>
                        {this.render_detail_item('4', {'text':term, 'textsize':'13px', 'font':this.props.app_state.font})}
                        <div style={{height:4}}/>
                    </div>
                ))}
            </div>
        )
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
                        <img alt="" src={this.props.app_state.theme['letter']} style={{height:60 ,width:'auto'}} />
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




export default TermsOfServicePage;