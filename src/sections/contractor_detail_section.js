import React, { Component } from 'react';
import ViewGroups from './../components/view_groups'
import Tags from './../components/tags';
import TextInput from './../components/text_input';
import Letter from './../assets/letter.png'; 
import E5EmptyIcon3 from './../assets/e5empty_icon3.png';

var bigInt = require("big-integer");

function bgN(number, power) {
  return bigInt((number+"e"+power)).toString();
}

function number_with_commas(x) {
    if(x == null) x = '';
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

class ContractorDetailsSection extends Component {
    
    state = {
        selected: 0, navigate_view_contractors_list_detail_tags_object: this.get_navigate_view_contracts_list_detail_tags(), entered_text:'', focused_message:{'tree':{}}
    };

    get_navigate_view_contracts_list_detail_tags(){
        return{
          'i':{
              active:'e', 
          },
          'e':[
              ['xor','',0], ['e','details','job-requests'],[1]
          ],
        }
    }

    render(){
        return(
        <div>{this.render_contractors_list_detail()}</div>
        )
    }

    render_contractors_list_detail(){
        if(this.props.selected_contractor_item == null){
            return(
                <div>
                    {this.render_empty_detail_object()}
                </div>
            )
        }else{
            return(
                <div style={{}}>
                    {this.render_contractors_details_section()}
                    <div style={{'height':'40px', width:'100%','padding':'0px 0px 0px 0px','margin':'0px 0px 0px 0px', 'max-width':'470px'}}>
                        <Tags page_tags_object={this.state.navigate_view_contractors_list_detail_tags_object} tag_size={'l'} when_tags_updated={this.when_navigate_view_contractors_list_detail_tags_object_updated.bind(this)} theme={this.props.theme}/>
                    </div>
                </div>
            )
        }
    }


    when_navigate_view_contractors_list_detail_tags_object_updated(tag_group){
        this.setState({navigate_view_contractors_list_detail_tags_object: tag_group})
    }

    render_empty_detail_object(){
        var background_color = this.props.theme['card_background_color']
        var he = this.props.height
        var size = this.props.screensize
        if(size == 'm'){
            he = this.props.height-190;
        }
        return(
            <div style={{height:he, width:'100%', 'background-color': background_color, 'border-radius': '15px','padding':'10px 0px 0px 10px', 'max-width':'420px','display': 'flex', 'align-items':'center','justify-content':'center','margin':'0px 0px 20px 0px'}}>
                    <div style={{'margin':'10px 20px 0px 0px'}}>
                        <img src={Letter} style={{height:70 ,width:'auto'}} />
                        <p style={{'display': 'flex', 'align-items':'center','justify-content':'center', 'padding':'5px 0px 0px 7px', 'color': 'gray'}}></p>
                    </div>
                    
                </div>
        );
    }


    get_selected_item(object, option){
        var selected_item = object[option][2][0]
        var picked_item = object[option][1][selected_item];
        return picked_item
    }


    render_contractors_details_section(){
        var selected_item = this.get_selected_item(this.state.navigate_view_contractors_list_detail_tags_object, this.state.navigate_view_contractors_list_detail_tags_object['i'].active)

        if(selected_item == 'details' || selected_item == 'e'){
            return(
                <div>
                    {this.render_contractor_posts_main_details_section()}
                </div>
            )
        }
        else if(selected_item == 'job-requests'){
            return(
                <div>
                    {this.render_contractor_job_responses()}
                </div>
            )
            
        }
    }



    render_contractor_posts_main_details_section(){
        var background_color = this.props.theme['card_background_color']
        var he = this.props.height-70
        var size = this.props.screensize
        if(size == 'm'){
            he = this.props.height-190;
        }
        var object = this.get_contractor_items()[this.props.selected_contractor_item];
        var item = this.get_contractor_details_data(object)
        var items = object['ipfs'] == null ? [] : object['ipfs'].entered_objects

        return(
            <div style={{ 'background-color': background_color, 'border-radius': '15px','margin':'5px 10px 20px 10px', 'padding':'0px 10px 0px 10px', 'max-width':'470px'}}>
                <div style={{ 'overflow-y': 'auto', width:'100%', height: he, padding:'0px 10px 0px 10px'}}>
                    {this.render_detail_item('1', item['tags'])}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', item['id'])}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', {'title':''+object['event'].returnValues.p5, 'details':'Author', 'size':'l'})}
                    <div style={{height: 10}}/>
                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>
                        {this.render_detail_item('2', item['age'])}
                    </div>
                    {this.render_detail_item('0')}
                    {this.render_item_data(items)}

                    {this.render_detail_item('3', {'title':'Send Job Request', 'details':'Send a job request to the contractor to do a job for you', 'size':'l'})}
                    <div style={{height:10}}/>
                    <div onClick={()=>this.open_send_job_request_ui()}>
                        {this.render_detail_item('5', {'text':'Send Request', 'action':''})}
                    </div>

                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            </div>
        )
    }

    render_item_data(items){
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
                            <div style={{height:10}}/>
                        </div>
                    ))}
                </div>
            )
        }
    }

    get_contractor_details_data(object){
        var tags = object['ipfs'] == null ? ['Contractor'] : object['ipfs'].entered_indexing_tags
        var title = object['ipfs'] == null ? 'Contractor ID' : object['ipfs'].entered_title_text
        var age = object['event'] == null ? 0 : object['event'].returnValues.p7
        var time = object['event'] == null ? 0 : object['event'].returnValues.p6
        return {
            'tags':{'active_tags':tags, 'index_option':'indexed'},
            'id':{'title':object['id'], 'details':title, 'size':'l'},
            'age':{'style':'l', 'title':'Block Number', 'subtitle':'??', 'barwidth':this.get_number_width(age), 'number':`block ${number_with_commas(age)}`, 'barcolor':'', 'relativepower':`${this.get_time_difference(time)}`, }
        }
    }

    get_contractor_items(){
        return this.props.get_contractor_items()
    }


    open_send_job_request_ui(){
        var object = this.get_contractor_items()[this.props.selected_contractor_item];
        this.props.open_send_job_request_ui(object)
    }







    render_contractor_job_responses(){
        var he = this.props.height-40

        return(
            <div style={{ 'background-color': 'transparent', 'border-radius': '15px','margin':'0px 0px 0px 0px', 'padding':'0px 0px 0px 0px', 'max-width':'470px'}}>
                <div style={{ 'overflow-y': 'auto', height: he, padding:'5px 0px 5px 0px'}}>
                    {this.render_job_post_top_title()}
                    <div style={{height:'1px', 'background-color':'#C1C1C1', 'margin': '10px 20px 10px 20px'}}/>
                    {this.render_job_requests()}
                </div>
            </div>
        )
    }


    render_job_post_top_title(){
        var object = this.get_contractor_items()[this.props.selected_contractor_item];
        return(
            <div style={{padding:'5px 5px 5px 5px'}}>
                {this.render_detail_item('3', {'title':'In '+object['id'], 'details':'Job Requests', 'size':'l'})} 
            </div>
        )
    }

    render_job_requests(){
        var middle = this.props.height-200;
        var size = this.props.size;
        if(size == 'm'){
            middle = this.props.height-100;
        }
        var items = this.get_job_details_responses()

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
                        {items.reverse().map((item, index) => (
                            <li style={{'padding': '2px 5px 2px 5px'}}>
                                <div key={index}>
                                    {this.render_job_response_item(item)}
                                </div>
                            </li> 
                        ))}
                    </ul>
                </div>
            )
        }
    }

    get_job_details_responses(){
        var object = this.get_contractor_items()[this.props.selected_contractor_item];
        if(object['event'].returnValues.p5 == this.props.app_state.user_account_id){
            return this.props.app_state.job_responses[object['id']]
        }else{
            var filtered_responses = []
            var all_responses = this.props.app_state.job_responses[object['id']]
            for(var i=0; i<all_responses.length; i++){
                if(all_responses[i]['applicant_id'] == this.props.app_state.user_account_id){
                    filtered_responses.push(all_responses[i])
                }
            }
            return filtered_responses
        }
    }


     render_job_response_item(item){
        var background_color = this.props.theme['card_background_color']
        var card_shadow_color = this.props.theme['card_shadow_color']
        var is_application_accepted = item['is_response_accepted'];

        if(is_application_accepted){
            return(
                <div>
                    <div onClick={() => this.view_contract(item)}>
                        {this.render_detail_item('3', {'title':'Expiry time from now: '+this.get_time_diff(item['application_expiry_time'] - (Date.now()/1000)), 'details':''+(new Date(item['application_expiry_time'] * 1000)), 'size':'s'})}
                        <div style={{height:3}}/>

                        {this.render_detail_item('3', {'title':'Job Description', 'details':item['title_description'], 'size':'s'})}
                        <div style={{height:3}}/>

                        {this.render_detail_item('3', {'title':'Accepted', 'details':'The contractor Accepted the job request', 'size':'s'})}
                    </div>
                    {/* <div style={{height:5}}/> */}
                    {/* <div onClick={()=>this.open_contract(item['contract'])}>
                        {this.render_detail_item('5', {'text':'View Contract', 'action':''})}
                    </div> */}
                    <div style={{height:'1px', 'background-color':'#C1C1C1', 'margin': '10px 20px 10px 20px'}}/>
                </div>
            )
        }else{
            return(
                <div onClick={() => this.view_contract(item)}>
                    {this.render_detail_item('3', {'title':'Expiry time from now: '+this.get_time_diff(item['application_expiry_time'] - (Date.now()/1000)), 'details':''+(new Date(item['application_expiry_time'] * 1000)), 'size':'s'})}
                    <div style={{height:3}}/>

                    {this.render_detail_item('3', {'title':'Job Description', 'details':item['title_description'], 'size':'s'})}
                    <div style={{height:3}}/>
                    <div style={{height:'1px', 'background-color':'#C1C1C1', 'margin': '10px 20px 10px 20px'}}/>
                </div>
            )
        }
        
    }

    view_contract(item){
        var object = this.get_contractor_items()[this.props.selected_contractor_item];
        if(object['event'].returnValues.p5 == this.props.app_state.user_account_id){
            this.props.open_view_job_request_ui(item, object)
        }
    }

    open_contract(contract){
        this.props.open_view_contract_ui(contract)
    }













    /* renders the specific element in the post or detail object */
    render_detail_item(item_id, object_data){
        var size = this.props.screensize
        var width = size == 'm' ? this.props.app_state.width/2 : this.props.app_state.width
        return(
            <div>
                <ViewGroups item_id={item_id} object_data={object_data} theme={this.props.theme}  width={width} show_images={this.props.show_images.bind(this)}/>
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
            return number_with_commas(num) + ' yr' + s;
        }
    }









}




export default ContractorDetailsSection;