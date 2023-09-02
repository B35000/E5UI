import React, { Component } from 'react';
import ViewGroups from './../components/view_groups'
import Tags from './../components/tags';
import TextInput from './../components/text_input';
import Letter from './../assets/letter.png'; 
import E5EmptyIcon from './../assets/e5empty_icon.png';
import E5EmptyIcon3 from './../assets/e5empty_icon3.png';
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
        stacked_messages:[{}],
    };

    get_navigate_view_mail_list_detail_tags_object_tags(){
        return{
          'i':{
              active:'e', 
          },
          'e':[
              ['xor','',0], ['e','data','activity'],[1]
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
                    <div style={{ width:'100%','padding':'0px 0px 0px 0px','margin':'0px 0px 20px 0px', 'max-width':'470px'}}>
                        <Tags page_tags_object={this.state.navigate_view_mail_list_detail_tags_object} tag_size={'l'} when_tags_updated={this.when_navigate_view_mail_list_detail_tags_object_updated.bind(this)} theme={this.props.theme}/>
                    </div>
                </div>
            )
        }
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

    when_navigate_view_mail_list_detail_tags_object_updated(tag_obj){
        this.setState({navigate_view_mail_list_detail_tags_object: tag_obj})
    }


    render_mail_details_section(){
        var selected_item = this.get_selected_item(this.state.navigate_view_mail_list_detail_tags_object, this.state.navigate_view_mail_list_detail_tags_object['i'].active)

        if(selected_item == 'data'){
            return(
                <div>
                    {this.render_mail_main_details_section()}
                </div>
            )
        }else if(selected_item == 'activity'){
            return(
                <div>
                    {this.render_mail_responses()}
                </div>
            )
            
        }
    }

    render_mail_main_details_section(){
        var background_color = this.props.theme['card_background_color']
        var he = this.props.height-70
        var size = this.props.screensize
        if(size == 'm'){
            he = this.props.height-190;
        }
        var object = this.get_mail_items()[this.props.selected_mail_item];
        var item = this.get_mail_details_data(object)
        var items = object['ipfs'] == null ? [] : object['ipfs'].entered_objects
        return(
            <div style={{  'background-color': background_color, 'border-radius': '15px','margin':'5px 10px 20px 10px', 'padding':'0px 10px 0px 10px', 'max-width':'470px'}}>
                <div style={{ 'overflow-y': 'auto', width:'99%', height: he, padding:'0px 10px 0px 10px'}}>
                    {this.render_detail_item('1', item['tags'])}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('4', item['id'])}
                    <div style={{height: 10}}/>
                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>
                        {this.render_detail_item('2', item['age'])}
                    </div>
                    {this.render_detail_item('0')}
                    {items.map((item, index) => (
                        <div key={index}>
                            {this.render_detail_item(item['type'], item['data'])} 
                            <div style={{height:10}}/>
                        </div>
                    ))}

                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            </div>
        )
    }


    get_mail_items(){
        var selected_option_name = this.get_selected_item(this.props.work_page_tags_object, this.props.work_page_tags_object['i'].active)

        if(this.props.work_page_tags_object['i'].active != 'mail'){
            var all_mail = []
            for(var i=0; i<this.props.app_state.received_mail['received_mail'].length; i++){
                var convo_id = this.props.app_state.received_mail['received_mail'][i]
                var context_object = this.props.app_state.received_mail['mail_activity'][convo_id][0]
                all_mail.push(context_object)
            }
            return this.sortByAttributeDescending(all_mail, 'time')
        }

        if(selected_option_name == 'all'){
            var all_mail = []
            for(var i=0; i<this.props.app_state.created_mail['created_mail'].length; i++){
                var convo_id = this.props.app_state.created_mail['created_mail'][i]
                var context_object = this.props.app_state.created_mail['mail_activity'][convo_id][0]
                all_mail.push(context_object)
            }
            for(var i=0; i<this.props.app_state.received_mail['received_mail'].length; i++){
                var convo_id = this.props.app_state.received_mail['received_mail'][i]
                var context_object = this.props.app_state.received_mail['mail_activity'][convo_id][0]
                all_mail.push(context_object)
            }
            return this.sortByAttributeDescending(all_mail, 'time')
        }
        else if(selected_option_name == 'received'){
            var all_mail = []
            for(var i=0; i<this.props.app_state.received_mail['received_mail'].length; i++){
                var convo_id = this.props.app_state.received_mail['received_mail'][i]
                var context_object = this.props.app_state.received_mail['mail_activity'][convo_id][0]
                all_mail.push(context_object)
            }
            return this.sortByAttributeDescending(all_mail, 'time')
        }
        else {
            //sent
            var all_mail = []
            for(var i=0; i<this.props.app_state.created_mail['created_mail'].length; i++){
                var convo_id = this.props.app_state.created_mail['created_mail'][i]
                var context_object = this.props.app_state.created_mail['mail_activity'][convo_id][0]
                all_mail.push(context_object)
            }
            return this.sortByAttributeDescending(all_mail, 'time')
        }
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


    get_mail_details_data(object){
        var tags_to_use = [object['type']];
        var tags = object['ipfs'] == null ? ['Mail'] : object['ipfs'].entered_indexing_tags
        var final_tags = tags_to_use.concat(tags)
        var title = object['ipfs'] == null ? 'Mail ID' : object['ipfs'].entered_title_text
        var age = object['event'] == null ? 0 : object['event'].returnValues.p7
        var time = object['event'] == null ? 0 : object['event'].returnValues.p6
        return {
            'tags':{'active_tags':final_tags, 'index_option':'indexed'},
            'id':{'textsize':'14px', 'text':title, 'font':'Sans-serif'},
            'age':{'style':'l', 'title':'Block Number', 'subtitle':'??', 'barwidth':this.get_number_width(age), 'number':`block ${number_with_commas(age)}`, 'barcolor':'', 'relativepower':`${this.get_time_difference(time)}`, }
        }
    }




    render_mail_responses(){
        var he = this.props.height-90
        var size = this.props.screensize
        
        return(
            <div>
                <div style={{ 'background-color': 'transparent', 'border-radius': '15px','margin':'0px 0px 0px 0px', 'padding':'0px 0px 0px 0px', 'max-width':'470px'}}>
                    <div style={{ 'overflow-y': 'auto', height: he, padding:'5px 0px 5px 0px'}}>
                        {this.render_sent_received_messages()}
                    </div>
                </div>

                <div style={{'display': 'flex','flex-direction': 'row','margin':'0px 0px 5px 5px', width: '99%'}}>
                    {/* {this.render_image_picker()} */}
                    <div style={{'margin': '0px 0px 0px 0px', width:this.props.width}}>
                        <TextInput height={30} placeholder={'Enter Message...'} when_text_input_field_changed={this.when_entered_text_input_field_changed.bind(this)} text={this.state.entered_text} theme={this.props.theme}/>
                    </div>

                    <div style={{'padding': '2px 5px 0px 5px', 'width':100}} onClick={()=>this.add_message_to_stack()}>
                        {this.render_detail_item('5', {'text':'Send', 'action':'-'})}
                    </div>
                </div>
            </div>
            
        )
    }


    render_sent_received_messages(){
        var middle = this.props.height-100;
        var size = this.props.size;
        if(size == 'm'){
            middle = this.props.height-100;
        }
        var items = this.get_convo_messages()
        var stacked_items = this.get_stacked_items()

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
        }else{
            return(
                <div style={{overflow: 'auto', maxHeight: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.map((item, index) => (
                            <li style={{'padding': '2px 5px 2px 5px'}} onClick={()=>console.log()}>
                                <div key={index}>
                                    {this.render_detail_item('3', {'title':item['sender'], 'details':item['ipfs']['message'], 'size':'s'})} 
                                    <div style={{height:3}}/>
                                </div>
                            </li> 
                        ))}
                        {stacked_items.map((item, index) => (
                            <li style={{'padding': '2px 5px 2px 5px'}} onClick={()=>console.log()}>
                                <div >
                                    {this.render_detail_item('3', {'title':item['sender'], 'details':item['message'], 'size':'s'})} 
                                    <div style={{height:3}}/>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
    }

    get_convo_messages(){
        var all_messages = []
        var mail = this.get_mail_items()[this.props.selected_mail_item];
        var convo_id = mail['convo_id']
        if(mail['type'] == 'received'){
            var messages = this.props.app_state.received_mail['mail_activity'][convo_id]
            for(var i=0; i<messages.length; i++){
                if(i!=0){
                    all_messages.push(messages[i])
                }
            }
        }
        return all_messages
    }

    get_stacked_items(){
        var mail = this.get_mail_items()[this.props.selected_mail_item];
        var convo_id = mail['convo_id']
        var stacked_items = this.state.stacked_messages[0][convo_id]
        if(stacked_items == null) return []
        return stacked_items
    }

    render_image_picker(){
        return(
            <div>
                <div style={{'position': 'relative', 'width':45, 'height':45, 'padding':'0px 0px 0px 0px'}}>
                    <img src={E5EmptyIcon3} style={{height:45, width:'auto', 'z-index':'1' ,'position': 'absolute'}} />
                    <input style={{height:30, width:40, opacity:0, 'z-index':'2' ,'position': 'absolute', 'margin':'5px 0px 0px 0px'}} id="upload" type="file" accept ="image/*" onChange ={this.when_image_gif_picked.bind(this)} multiple/>
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
                    const clonedArray = this.state.entered_image_objects == null ? [] : this.state.entered_image_objects.slice();
                    clonedArray.push(ev.target.result);
                    this.setState({entered_image_objects: clonedArray});
                }.bind(this);
                reader.readAsDataURL(e.target.files[i]);
            }
            var image = e.target.files.length == 1 ? 'image has' : 'images have';
            this.props.notify('Your selected '+e.target.files.length+image+' been staged.',500);
        }
    }

    when_entered_text_input_field_changed(text){
        this.setState({entered_text: text})
    }

    add_message_to_stack(){
        var message = this.state.entered_text.trim()
        var mail = this.get_mail_items()[this.props.selected_mail_item];
        if(message == ''){
            this.props.notify('type something first', 600)
        }else{
            var convo_id = mail['convo_id']
            var tx = {convo_id: convo_id, type:'message', entered_indexing_tags:['send', 'message'], 'message':message, 'sender':this.props.app_state.user_account_id, 'recipient':mail['convo_with']}
            this.props.add_mail_to_stack_object(tx)
            
            var clone = this.state.stacked_messages.slice()
            if(clone[0][convo_id] == null){
                clone[0][convo_id] = []
            }
            clone[0][convo_id].push(tx)

            this.setState({entered_text:'', stacked_messages: clone})
            this.props.notify('message added to stack', 600)
        }
    }

    add_images_to_stack(){

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
                <ViewGroups item_id={item_id} object_data={object_data} theme={this.props.theme} width={width} show_images={this.props.show_images.bind(this)}/>
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




export default MailDetailsSection;