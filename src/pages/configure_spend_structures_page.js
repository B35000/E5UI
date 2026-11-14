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

function start_and_end(str) {
  if (str.length > 13) {
    return str.substr(0, 6) + '...' + str.substr(str.length-6, str.length);
  }
  return str;
}

class ConfigureSpendStructuresPage extends Component {
    
  state = {
    selected: 0, contract: null, id: makeid(8), type: this.props.app_state.loc['3120']/* 'configure-spend-structures' */, entered_indexing_tags:[this.props.app_state.loc['3093a']/* 'configure' */, this.props.app_state.loc['3093b']/* 'change' */,this.props.app_state.loc['3120a']/* 'spend-structures' */],

    get_configure_spend_structures_title_tags_object:this.get_configure_spend_structures_title_tags_object(),
    spend_channel_title:'', exchange_id:'', amount:0, price_data:[],

    tag_allocation:0, channel_allocations:{}, channels:{}
  };


  get_configure_spend_structures_title_tags_object(){
    const obj = {
      'i':{
        active:'e', 
      },
      'e':[
        ['or','',0], ['e', this.props.app_state.loc['3120b']/* 'spend-channels 🌀' */], [0]
      ],
    };

    return obj
  }







  set_data(object){
    this.setState({contract: object, e5: object['e5']})
    if(object['spend_structures_configurations'] != null){
      const items = [].concat(this.sortByAttributeDescending(object['spend_structures_configurations'], 'time'))
      if(items.length > 0){
        const default_setting = items[0]
        setTimeout(() => {
          this.when_spend_structures_configuration_item_clicked(default_setting, true)
        }, (1000));
      }
    }
  }









  render(){
    return(
      <div style={{'padding':'10px 10px 0px 10px'}}>
        <div className="row">
          <div className="col-11" style={{'padding': '0px 0px 0px 10px'}}>
            <Tags font={this.props.app_state.font} app_state={this.props.app_state} page_tags_object={this.state.get_configure_spend_structures_title_tags_object} tag_size={'l'} when_tags_updated={this.when_get_configure_spend_structures_title_tags_object_updated.bind(this)} theme={this.props.theme}/>
          </div>
          <div className="col-1" style={{'padding': '0px 0px 0px 0px'}}>
            <div className="text-end" style={{'padding': '0px 10px 0px 0px'}} >
              <div className="text-end" onClick={()=>this.finish()}>
                {this.render_detail_item('17', {'src':this.props.theme['close'], 'style': { height:36, width:'auto' }})}
              </div>
            </div>
          </div>
        </div>

        {this.render_everything()}
      </div>
    )
  }

  when_get_configure_spend_structures_title_tags_object_updated(tag_obj){
    this.setState({get_configure_spend_structures_title_tags_object: tag_obj})
  }




  render_everything(){
    if(this.state.contract == null) return;
        
    const active = this.state.get_configure_spend_structures_title_tags_object['i'].active
    const selected_item = this.get_selected_item(this.state.get_configure_spend_structures_title_tags_object, active)

    if(selected_item == 'e'){
      return this.render_default_general_info_ui()
    }
    else if(selected_item == this.props.app_state.loc['3120b']/* 'spend-channels 🌀' */){
      return this.configure_new_spend_channel_ui()
    }
  }




  render_default_general_info_ui(){
    var size = this.props.size
    if(size == 's'){
      return(
        <div>
          {this.render_default_general_data()}
          {this.render_detail_item('0')}
          {this.render_detail_item('0')}
        </div>
      )
    }
    else if(size == 'm'){
      return(
        <div className="row">
          <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
            {this.render_default_general_data()}
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
            {this.render_default_general_data()}
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

  render_default_general_data(){
    return(
      <div>
        {this.render_detail_item('3', { 'title': this.props.app_state.loc['3120bq']/* 'Configured Spend Channels.' */, 'details': this.props.app_state.loc['3120br']/* 'The configured spend channel information for this contract.' */, 'size': 'l' })}
        <div style={{ height:10 }}/>
        {this.render_contract(this.state.contract)}
        
        <div style={{ height:15 }}/>
        {this.render_restore_from_previous_data()}

        {this.render_detail_item('0')}

        {this.render_all_set_channels()}
      </div>
    )
  }

  render_set_values(){
    return this.render_empty_views(3)
  }

  render_contract(object){
      const item = this.format_contract_item(object)
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

  format_contract_item(object){
      var main_contract_tags = ['Contract', 'main', object['e5'] ]
      var tags = object['ipfs'] == null ? (object['id'] == 2 ? main_contract_tags : ['Contract']) : [object['e5']].concat(object['ipfs'].entered_indexing_tags)
      var title = object['ipfs'] == null ? 'Contract ID' : object['ipfs'].entered_title_text
      var age = object['event'] == null ? 0 : object['event'].returnValues.p5
      var time = object['event'] == null ? 0 : object['event'].returnValues.p4
      var object_id = number_with_commas(object['id'])
      var id_text = '• '+object_id
      var sender = ' • '+this.get_senders_name_or_you(object['event'].returnValues.p3, object['e5'])
      if(object['id'] == 2){
          id_text = '• '+'Main Contract'
          sender = ''
      } 
      var number = number_with_commas(age)
      var barwidth = this.get_number_width(age)
      var relativepower = this.get_time_difference(time)
      
      return {
          'tags':{'active_tags':tags, 'index_option':'indexed', 'selected_tags':this.props.app_state.job_section_tags, 'when_tapped':'select_deselect_tag'},
          'id':{'title':id_text+sender, 'details':title, 'size':'l', 'title_image':this.props.app_state.e5s[object['e5']].e5_img, 'border_radius':'0%'},
          'age':{ 'style':'s', 'title':'', 'subtitle':'', 'barwidth':barwidth, 'number':`${number}`, 'barcolor':'', 'relativepower':relativepower, }
      }
  }

  get_senders_name_or_you(sender, e5){
    if(sender == this.props.app_state.user_account_id[e5]){
        return this.props.app_state.loc['1694']/* You. */
    }
    var bucket = this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)
    var alias = (bucket[sender] == null ? sender : bucket[sender])
    return alias
  }


  render_restore_from_previous_data(){
    const contract = this.state.contract

    const items = [].concat((contract['spend_structures_configurations'] == null ? [] : this.sortByAttributeDescending(contract['spend_structures_configurations'], 'time')))
    const items2 = [0, 1]
    return(
        <div>
            {this.render_detail_item('3', { 'title': this.props.app_state.loc['3093eh']/* 'Restore Previous Setting' */, 'details': this.props.app_state.loc['3093ei']/* 'You may optionally restore a previous configuration from your history.' */, 'size': 'l' })}
            <div style={{ height:10 }}/>

            <div style={{'margin':'3px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                    {items.map((item, index) => (
                        <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}}>
                            {this.render_spend_structure_configuration_item(item)}
                        </li>
                    ))}
                    {items.length == 0 && items2.map(() => (
                        <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}}>
                            {this.render_empty_horizontal_list_item()}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
  }

  render_spend_structure_configuration_item(item){
    const time = item['time']
    const details = (new Date(time*1000).toLocaleString())
    const title = this.props.app_state.loc['2214bp']/* 'As of $' */.replace('$', this.get_time_diff((Date.now()/1000) - (parseInt(time))))
    return(
      <div onClick={() => this.when_spend_structures_configuration_item_clicked(item)}>
          {this.render_detail_item('3', {'title':title, 'details':''+details, 'size':'l'})}
      </div>
    )
  }

  when_spend_structures_configuration_item_clicked(item, silently=false){
    const contract = this.state.contract;
    const new_state = {}
    Object.assign(new_state, item['ipfs'])
    new_state.contract = contract;
    new_state.get_configure_spend_structures_title_tags_object = this.get_configure_spend_structures_title_tags_object();
    this.setState(new_state)
    if(silently == false) this.props.notify(this.props.app_state.loc['3093ej']/* 'Configuration set from history item.' */, 6000)
  }



  render_all_set_channels(){
    var items = [].concat(Object.keys(this.state.channels))
    if(items.length == 0){
      return(
        <div>
          {this.render_detail_item('3', { 'title': this.props.app_state.loc['3120bq']/* 'Configured Spend Channels.' */, 'details': this.props.app_state.loc['3120bs']/* 'All your configured spend channels will show here after being added.' */, 'size': 'l' })}
          <div style={{ height:10 }}/>
          {this.render_empty_views(3)}
        </div>
      )
    }

    return(
      <div>
        {this.render_detail_item('3', { 'title': this.props.app_state.loc['3120bq']/* 'Configured Spend Channels.' */, 'details': this.props.app_state.loc['3120bt']/* 'All your configured spend channels.' */, 'size': 'l' })}
        <div style={{ height:10 }}/>
        <ul style={{ 'padding': '0px 5px 0px 5px'}}>
          <SwipeableList>
            {items.map((item, index) => (
              <li style={{'padding': '2px 5px 2px 5px'}}>
                <div key={index}>
                  <SwipeableListItem
                    swipeLeft={{
                      content: <p style={{'color': this.props.theme['primary_text_color']}}>{this.props.app_state.loc['3120bu']/* 'Delete' */}</p>,
                      action: () =>this.when_spend_channel_delete(item)
                    }}>
                    <div style={{width:'100%'}}>
                      {this.render_spend_channel_item(item)}
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

  render_spend_channel_item(item){
    const title = item
    const channel_data = this.state.channels[item]
    const details = this.props.app_state.loc['3120bo']/* '$ Exchanges Used.' */.replace('$', channel_data.budget.length)
    const footer = this.props.app_state.loc['3120bp']/* '$ Tags Specified.' */.replace('$', Object.keys(channel_data.allocations).length)

    return(
      <div onClick={() => this.when_channel_clicked(item)}>
        {this.render_detail_item('3', {'size':'l', 'details':details, 'title':title, 'footer':footer})}
        <div style={{'margin':'3px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
            <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
              {channel_data.budget.map((budget_item, index) => (
                <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}}>
                  {this.render_spend_channel_budget_amount_item2(budget_item, index)}
                </li>
              ))}
            </ul>
          </div>
      </div>
    )
  }

  render_spend_channel_budget_amount_item2(item, index){
    const e5 = this.state.contract['e5']
    const title = this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[e5+item['id']]
    const details = this.format_account_balance_figure(item['amount']) + ' ' + this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['id']]
    const thumbnail = this.props.app_state.token_name_thumbnail_directory[title]
    return(
      <div>
        {this.render_detail_item('12', {'title':title, 'details':details, 'image': thumbnail, 'size':'s'})}
      </div>
    )
  }

  when_spend_channel_delete(item){
    const clone = structuredClone(this.state.channels)
    delete clone[item]
    this.setState({channels: clone})
  }







  configure_new_spend_channel_ui(){
    var size = this.props.size
    if(size == 's'){
      return(
        <div>
          {this.configure_new_spend_channel_data()}
          {this.render_detail_item('0')}
          {this.configure_new_spend_channel_data2()}
          {this.render_detail_item('0')}
          {this.render_detail_item('0')}
        </div>
      )
    }
    else if(size == 'm'){
      return(
        <div className="row">
          <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
            {this.configure_new_spend_channel_data()}
            {this.render_detail_item('0')}
            {this.render_detail_item('0')}
          </div>
          <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
            {this.configure_new_spend_channel_data2()}
          </div>
        </div>
      )
    }
    else if(size == 'l'){
      return(
        <div className="row">
          <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
            {this.configure_new_spend_channel_data()}
            {this.render_detail_item('0')}
            {this.render_detail_item('0')}
          </div>
          <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
            {this.configure_new_spend_channel_data2()}
          </div>
        </div>
      )
    }
  }

  configure_new_spend_channel_data(){
    return(
      <div>
        {this.render_detail_item('3', { 'title': this.props.app_state.loc['3120c']/* 'Spend Channels.' */, 'details': this.props.app_state.loc['3120d']/* 'Structure how money will be spent from this contract.' */, 'size': 'l' })}
        <div style={{ height:10 }}/>

        {this.render_my_added_channels()}
        {this.render_detail_item('0')}

        {this.render_detail_item('3', { 'title': this.props.app_state.loc['3120e']/* 'Spend Channel Title' */, 'details': this.props.app_state.loc['3120f']/* 'A brief description of your new spend channel.' */, 'size': 'l' })}
        <div style={{ height:10 }}/>
        <TextInput font={this.props.app_state.font} height={60} placeholder={this.props.app_state.loc['3120g']/* 'Channel Description...' */} when_text_input_field_changed={this.when_spend_channel_title_input_field_changed.bind(this)} text={this.state.spend_channel_title} theme={this.props.theme}/>

        {this.render_detail_item('0')}

        {this.render_detail_item('3', { 'title': this.props.app_state.loc['3120h']/* 'Spend Channel Budget.' */, 'details': this.props.app_state.loc['3120i']/* 'The total amount of money allocated to the channel for spending.' */, 'size': 'l' })}
        <div style={{ height:10 }}/>

        <TextInput font={this.props.app_state.font} height={30} placeholder={this.props.app_state.loc['1180']/* 'Exchange ID' */} when_text_input_field_changed={this.when_exchange_id_input_field_changed.bind(this)} text={this.state.exchange_id} theme={this.props.theme}/>

        {this.load_token_suggestions('exchange')}
        <div style={{height:10}}/>

        {this.render_detail_item('3', {'size':'l', 'title':this.props.app_state.loc['3120j']/* 'Budget Amount.' */, 'details':this.props.app_state.loc['3120k']/* 'Specify the total amount of the token allocated for the channel.' */})}
        <div style={{height:10}}/>

        <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['1182']/* 'Amount' */, 'number':this.state.amount, 'relativepower':this.props.app_state.loc['1183']/* 'tokens' */})}>
          {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['1182']/* 'Amount' */, 'subtitle':this.format_power_figure(this.state.amount), 'barwidth':this.calculate_bar_width(this.state.amount), 'number':this.format_account_balance_figure(this.state.amount), 'barcolor':'', 'relativepower':this.props.app_state.loc['1183']/* 'tokens' */, })}
        </div>

        <NumberPicker clip_number={this.props.app_state.clip_number} ref={(el) => (this.amount_picker = el)} font={this.props.app_state.font} number_limit={bigInt('1e'+(this.get_power_limit_for_exchange(this.state.exchange_id)+9))} when_number_picker_value_changed={this.when_amount.bind(this)} theme={this.props.theme} power_limit={this.get_power_limit_for_exchange(this.state.exchange_id)} pick_with_text_area={true} text_area_hint={'1000'} />

        <div style={{'padding': '5px'}} onClick={() => this.when_add_allocation_set()}>
          {this.render_detail_item('5', {'text':this.props.app_state.loc['3120l']/* 'Add Allocation.' */, 'action':''})}
        </div>

        {this.render_allocations_ui()}
      </div>
    )
  }

  configure_new_spend_channel_data2(){
    const current_total_proportion_used = this.get_current_total_channel_allocations()
    const set_remaining_proportion_in_field = () => {
      const remaining = bigInt('1e18').minus(current_total_proportion_used)
      this.when_tag_allocation_proportion(remaining)
    }
    return(
      <div>
        {this.render_detail_item('3', { 'title': this.props.app_state.loc['3120q']/* 'Spend Tags.' */, 'details': this.props.app_state.loc['3120r']/* 'Set some tags and their respective proportions of money allocated for them in the new channel budget.' */, 'size': 'l' })}
        <div style={{height:10}}/>
        
        <div onClick={() => set_remaining_proportion_in_field()}>
          {this.render_detail_item('3', {'title':this.format_proportion(current_total_proportion_used), 'details':this.props.app_state.loc['3120ba']/* 'Total Proportion Used' */, 'size':'l', 'footer':this.props.app_state.loc['3120bb']/* 'Tap this to set the remaining proportion amount for the new tag.' */})}
        </div>
        <div style={{height:10}}/>

        <TextInput font={this.props.app_state.font} height={30} placeholder={this.props.app_state.loc['3120s']/* 'Tag...' */} when_text_input_field_changed={this.when_channel_tag_input_field_changed.bind(this)} text={this.state.channel_tag} theme={this.props.theme}/>
        <div style={{height:10}}/>


        {this.render_detail_item('3', { 'title': this.props.app_state.loc['3120t']/* 'Allocated Proportion of Channel Budget.' */, 'details': this.props.app_state.loc['3120u']/* 'The proportion of the new channel\'s budget that can be used under the new tag.' */, 'size': 'l' })}
        <div style={{height:10}}/>

        {this.render_detail_item('3', {'title':this.format_proportion(this.state.tag_allocation), 'details':this.props.app_state.loc['3120v']/* 'Tag Allocation Proportion' */, 'size':'l'})}
        
        <NumberPicker clip_number={this.props.app_state.clip_number} ref={(el) => (this.proportion_picker = el)} font={this.props.app_state.font} number_limit={bigInt('1e18')} when_number_picker_value_changed={this.when_tag_allocation_proportion.bind(this)} theme={this.props.theme} power_limit={9} decimal_count={16} pick_with_text_area={true} text_area_hint={'1.35%'}/>
        

        <div style={{'padding': '5px'}} onClick={() => this.when_add_tag_proportion_set()}>
          {this.render_detail_item('5', {'text':this.props.app_state.loc['3120w']/* 'Set Proportion' */, 'action':''})}
        </div>
        <div style={{height:10}}/>

        {this.render_set_channel_tags()}

        {this.render_detail_item('0')}

        {this.render_detail_item('3', { 'title': this.props.app_state.loc['3120bg']/* 'Add Channel.' */, 'details': this.props.app_state.loc['3120bh']/* 'Add the specified budget and tag allocations to the new channel.' */, 'size': 'l' })}
        <div style={{height:10}}/>
        <div style={{'padding': '5px'}} onClick={() => this.when_add_channel_set_set()}>
          {this.render_detail_item('5', {'text':this.props.app_state.loc['3120bi']/* 'Add Channel' */, 'action':''})}
        </div>
      </div>
    )
  }



  when_channel_tag_input_field_changed(text){
    this.setState({channel_tag: text})
  }

  when_tag_allocation_proportion(number){
    this.setState({tag_allocation: number})
  }

  when_spend_channel_title_input_field_changed(text){
    this.setState({spend_channel_title: text})
  }

  when_exchange_id_input_field_changed(text){
    this.setState({exchange_id: text})
  }

  reset_the_number_picker(){
    var me = this;
    setTimeout(function() {
      if(me.amount_picker != null){
        me.amount_picker.reset_number_picker()
      }
    }, (1 * 1000));  
  }

  when_amount(amount){
    this.setState({amount: amount})
  }

  get_power_limit_for_exchange(exchange){
    var exchange_id = this.get_token_id_from_symbol(exchange.trim())

    if(!isNaN(exchange_id) && parseInt(exchange_id) > 0 && exchange_id != '' && this.does_exchange_exist(exchange_id)){
        var target_exchange_data = this.props.app_state.created_token_object_mapping[this.props.app_state.selected_e5][exchange_id]
        var default_depth = 0;
        if(target_exchange_data != null){
            target_exchange_data = target_exchange_data['ipfs']
            if(target_exchange_data != null){
                default_depth = target_exchange_data.default_depth == null ? 0 : target_exchange_data.default_depth
            }
        }

        return (default_depth*72)+63
    }
    else{
        return 63
    }
  }

  get_token_id_from_symbol(typed_search){
    const e5 = this.state.contract['e5']
    if(!isNaN(typed_search)){
      return typed_search
    }
    var id = this.props.app_state.token_directory[e5][typed_search.toUpperCase()] == null ? typed_search : this.props.app_state.token_directory[e5][typed_search.toUpperCase()]

    return id
  }

  does_exchange_exist(exchange_id){
    const e5 = this.state.contract['e5']
    if(this.props.app_state.created_token_object_mapping[e5][parseInt(exchange_id)] == null){
      return false
    }
    return true
  }



  async when_add_allocation_set(){
    const exchange_id = this.get_token_id_from_symbol(this.state.exchange_id.trim())
    const amount = this.state.amount
    const interacted = this.state.price_data.find(e => e['id'] == exchange_id)

    if(isNaN(exchange_id) || parseInt(exchange_id) < 0 || exchange_id == '' || !this.does_exchange_exist(exchange_id)){
      this.props.notify(this.props.app_state.loc['1185']/* 'Please put a valid exchange ID.' */, 3600)
    }
    else if(amount == 0){
      this.props.notify(this.props.app_state.loc['1186']/* 'Please put a valid amount.' */, 3600)
    }
    else if(interacted != null){
      this.props.notify(this.props.app_state.loc['3120m']/* 'You cant set the same exchange twice.' */, 7600)
    }
    else{
      const price_data_clone = this.state.price_data.slice()
      price_data_clone.push({'id':exchange_id, 'amount':amount})
      this.setState({price_data: price_data_clone, exchange_id:'', amount:0});
      this.props.notify(this.props.app_state.loc['1187']/* 'Added amount.' */, 1400)
      this.reset_the_number_picker()
    }
  }

  render_allocations_ui(){
    var items = [].concat(this.state.price_data)
    if(items.length == 0){
      items = [0,3,0]
      return(
        <div>
          {this.render_detail_item('3', {'size':'l', 'title':this.props.app_state.loc['3120n']/* 'Set Budget.' */, 'details':this.props.app_state.loc['3120o']/* 'Once you specify an allocation, it will show here.' */})}
          <div style={{height:10}}/>
          <div style={{'margin':'3px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
            <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
              {items.map(() => (
                <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}}>
                  {this.render_empty_horizontal_list_item()}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )
    }

    return(
      <div>
        {this.render_detail_item('3', {'size':'l', 'title':this.props.app_state.loc['3120n']/* 'Set Budget.' */, 'details':this.props.app_state.loc['3120p']/* 'The budget for the new spend channel.' */})}
          <div style={{height:10}}/>
          <div style={{'margin':'3px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
            <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
              {items.map((item, index) => (
                <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}}>
                  {this.render_spend_channel_budget_amount_item(item, index)}
                </li>
              ))}
            </ul>
          </div>
      </div>
    )
  }

  render_spend_channel_budget_amount_item(item, index){
    const e5 = this.state.contract['e5']
    const title = this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[e5+item['id']]
    const details = this.format_account_balance_figure(item['amount']) + ' '+ this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['id']]
    const thumbnail = this.props.app_state.token_name_thumbnail_directory[title]
    return(
      <div onClick={() => this.when_spend_channel_item_clicked(item, index)}>
        {this.render_detail_item('8', {'size':'s', 'details':details, 'title':title, 'image':thumbnail})}
      </div>
    )
  }

  when_spend_channel_item_clicked(item, index){
    const price_data_clone = this.state.price_data.slice()
    price_data_clone.splice(index, 1)
    this.setState({price_data: price_data_clone,});
  }

  when_add_tag_proportion_set(){
    const typed_word = this.state.channel_tag.trim()
    const tag_allocation = this.state.tag_allocation
    const clone = structuredClone(this.state.channel_allocations)
    const current_total_proportion_used = this.get_current_total_channel_allocations()

    if(typed_word == ''){
      this.props.notify(this.props.app_state.loc['128']/* 'Type something' */, 3400)
    }
    else if(typed_word.length > 23){
      this.props.notify(this.props.app_state.loc['3120z']/* 'That tag is too long.' */, 3400)
    }
    else if(bigInt(tag_allocation).isZero()){
      this.props.notify(this.props.app_state.loc['3120x']/* 'Set a valid proportion.' */, 4400)
    }
    else if(bigInt(tag_allocation).greater(bigInt('1e18'))){
      this.props.notify(this.props.app_state.loc['3120y']/* 'You cant set more than 100%' */, 4400)
    }
    else if(bigInt(tag_allocation).plus(current_total_proportion_used).greater(bigInt('1e18'))){
      this.props.notify(this.props.app_state.loc['3120bc']/* 'The amount set exceeds the remainder.' */, 4400)
    }
    else{
      clone[typed_word] = tag_allocation.toString()
      this.setState({channel_allocations: clone, channel_tag:'', tag_allocation:0})
      this.reset_the_proportion_picker()
    }
  }

  get_current_total_channel_allocations(){
    const allocations = Object.values(this.state.channel_allocations).map(e => bigInt(e))
    let total_proportion = bigInt(0)
    allocations.forEach(proportion => {
      total_proportion = bigInt(total_proportion).plus(proportion)
    });
    return total_proportion
  }

  reset_the_proportion_picker(){
    var me = this;
    setTimeout(function() {
      if(me.proportion_picker != null){
        me.proportion_picker.reset_number_picker()
      }
    }, (1 * 1000));  
  }




  render_set_channel_tags(){
    const items = [].concat(Object.keys(this.state.channel_allocations))
    if(items.length == 0){
      return(
        <div>
          {this.render_detail_item('3', { 'title': this.props.app_state.loc['3120bd']/* 'Added Tags.' */, 'details': this.props.app_state.loc['3120be']/* 'When you specify a tag and its proportioned allocation, it will show here.' */, 'size': 'l' })}
          <div style={{ height:10 }}/>
          {this.render_empty_views(3)}
        </div>
      )
    }

    return(
      <div style={{}}>
        {this.render_detail_item('3', { 'title': this.props.app_state.loc['3093bu']/* 'Added Keywords' */, 'details': this.props.app_state.loc['3120bf']/* 'All the new channel\'s tags and their proportioned allocation.' */, 'size': 'l' })}
        <div style={{ height:10 }}/>
        <ul style={{ 'padding': '0px 5px 0px 5px'}}>
          <SwipeableList>
            {items.map((item, index) => (
              <li style={{'padding': '2px 5px 2px 5px'}}>
                <div key={index}>
                  <SwipeableListItem
                    swipeLeft={{
                      content: <p style={{'color': this.props.theme['primary_text_color']}}>{this.props.app_state.loc['3093bt']/* Edit */}</p>,
                      action: () =>this.when_tag_item_clicked(item)
                    }}>
                    <div style={{width:'100%'}}>
                      {this.render_tag_item(item)}
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

  render_tag_item(item){
    const proportion = this.state.channel_allocations[item]
    const title = item
    const details = this.format_proportion(proportion)
    let footer = null
    if(this.state.price_data.length > 0){
      const first_amount = this.state.price_data[0]
      const proportion_of_budget = bigInt(first_amount['amount']).times(proportion).divide('1e18')
      const token_symbol = this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[first_amount['id']]
      const amount = this.format_account_balance_figure(proportion_of_budget)
      footer = amount+' '+token_symbol
    }

    return(
      <div>
        {this.render_detail_item('3', {'size':'l', 'details':details, 'title':title, 'footer':footer})}
      </div>
    )
  }

  when_tag_item_clicked(item){
    const channel_tag = item;
    const tag_allocation = this.state.channel_allocations[item]
    const clone = structuredClone(this.state.channel_allocations)
    delete clone[item]
    this.setState({channel_allocations: clone, channel_tag:channel_tag, tag_allocation:tag_allocation})
  }





  when_add_channel_set_set(){
    const price_data = this.state.price_data
    const channel_allocations = this.state.channel_allocations
    const spend_channel_title = this.state.spend_channel_title.trim()

    if(spend_channel_title == ''){
      this.props.notify(this.props.app_state.loc['3120bl']/* 'You haven\'t specified a channel title.' */, 5400)
    }
    else if(price_data.length == 0){
      this.props.notify(this.props.app_state.loc['3120bj']/* 'You havent set the new channels budget.' */, 5400)
    }
    else if(Object.keys(channel_allocations).length == 0){
      this.props.notify(this.props.app_state.loc['3120bk']/* 'You havent set tags for the new channel.' */, 5400)
    }
    else{
      const clone = structuredClone(this.state.channels)
      clone[spend_channel_title] = {
        budget: price_data,
        allocations: channel_allocations,
      }
      this.setState({channels: clone, price_data:[], channel_allocations:{}, spend_channel_title:''})
      this.props.notify(this.props.app_state.loc['3120bm']/* 'Channel details Set.' */, 2000)
    }
  }

  render_my_added_channels(){
    var items = [].concat(Object.keys(this.state.channels))
    if(items.length == 0){
      items = [0,3,0]
      return(
        <div>
          <div style={{'margin':'3px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
            <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
              {items.map(() => (
                <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}}>
                  {this.render_empty_horizontal_list_item()}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )
    }

    return(
      <div>
        <div style={{'margin':'3px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
          <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
            {items.map((item, index) => (
              <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}}>
                {this.render_channel_item(item)}
              </li>
            ))}
          </ul>
        </div>
        {this.render_detail_item('10', {'text':this.props.app_state.loc['3120bn']/* 'Tap a spend channel to edit it.' */, 'textsize':'12px', 'font':this.props.app_state.font})}
      </div>
    )
  }

  render_channel_item(item){
    const title = start_and_end(item)
    const channel_data = this.state.channels[item]
    const details = this.props.app_state.loc['3120bo']/* '$ Exchanges Used.' */.replace('$', channel_data.budget.length)
    const footer = this.props.app_state.loc['3120bp']/* '$ Tags Specified.' */.replace('$', Object.keys(channel_data.allocations).length)

    return(
      <div onClick={() => this.when_channel_clicked(item)}>
        {this.render_detail_item('3', {'size':'s', 'details':details, 'title':title, 'footer':footer})}
      </div>
    )
  }

  when_channel_clicked(item){
    const channel_data = this.state.channels[item]
    const price_data = channel_data.budget
    const spend_channel_title = item
    const channel_allocations = channel_data.allocations;
    const clone = structuredClone(this.state.channels)
    delete clone[item]
    this.setState({channels: clone, price_data:price_data, channel_allocations:channel_allocations, spend_channel_title:spend_channel_title})
  }
















  load_token_suggestions(target_type){
    var items = [].concat(this.get_suggested_tokens())
    var background_color = this.props.theme['card_background_color']
    var card_shadow_color = this.props.theme['card_shadow_color']
    return(
      <div style={{'margin':'0px 0px 0px 5px','padding': '5px 0px 7px 0px', width: '97%', 'background-color': 'transparent'}}>
          <ul style={{'list-style': 'none', 'padding': '0px 0px 5px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '13px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
            {items.map((item, index) => (
                <li style={{'display': 'inline-block', 'margin': '5px 5px 5px 5px', '-ms-overflow-style': 'none'}} onClick={() => this.when_price_suggestion_clicked(item, index, target_type)}>
                    {this.render_detail_item('14', item['label'])}
                </li>
            ))}
        </ul>
      </div>
    )
  }

  get_suggested_tokens(){
    const e5 = this.state.contract['e5']
    var items = [
        {'id':'3', 'label':{'title':this.props.app_state.loc['3078']/* END */, 'details':e5, 'size':'s', 'image':this.props.app_state.e5s[e5].end_image, 'img_size':30}},
        {'id':'5', 'label':{'title':this.props.app_state.loc['3079']/* SPEND */, 'details':e5.replace('E', '3'), 'size':'s', 'image':this.props.app_state.e5s[e5].spend_image, 'img_size':30}},
    ];
    var exchanges_from_sync = this.props.app_state.created_tokens[e5]
    var sorted_token_exchange_data = []
    // var myid = this.props.app_state.user_account_id
    for (let i = 0; i < exchanges_from_sync.length; i++) {
        var exchange_e5 = exchanges_from_sync[i]['e5']
        var myid = this.props.app_state.user_account_id[exchange_e5]

        var author_account = exchanges_from_sync[i]['event'] == null ? '':exchanges_from_sync[i]['event'].returnValues.p3.toString() 
        if(author_account == myid.toString()){
            sorted_token_exchange_data.push(exchanges_from_sync[i])
        }
    }
    sorted_token_exchange_data.reverse()
    for (let i = 0; i < exchanges_from_sync.length; i++) {
        if(!sorted_token_exchange_data.includes(exchanges_from_sync[i]) && exchanges_from_sync[i]['balance'] != 0 && exchanges_from_sync[i]['event'] != null){
            sorted_token_exchange_data.push(exchanges_from_sync[i])
        }
    }

    for (let i = 0; i < sorted_token_exchange_data.length; i++) {
        items.push({'id':sorted_token_exchange_data[i]['id'], 'label':{'title':sorted_token_exchange_data[i]['ipfs'].entered_symbol_text, 'details':sorted_token_exchange_data[i]['ipfs'].entered_title_text, 'size':'s', 'image':(sorted_token_exchange_data[i]['ipfs'].token_image == null ? (sorted_token_exchange_data[i]['data'][0][3/* <3>token_type */] == 3 ? this.props.app_state.static_assets['end_img']:this.props.app_state.static_assets['spend_img']) : sorted_token_exchange_data[i]['ipfs'].token_image), 'img_size':30}})
    }

    return items;
  }

  when_price_suggestion_clicked(item, pos){
    this.setState({exchange_id: item['id'].toString()})
    this.reset_the_number_picker()
  }







  finish(){
    if(Object.keys(this.state.channels).length == 0){
      this.props.notify(this.props.app_state.loc['3120bw']/* 'You need to configure some spend channels first.' */, 9500)
    }
    else if(this.check_if_configure_spend_structures_already_exists()){
      this.props.notify(this.props.app_state.loc['3120bv']/* 'You cant configure configure spend structures for a given contract twice in one run.' */, 9500)
    }
    else{
      this.props.add_configure_spend_structures_transaction_to_stack(this.state)
      this.props.notify(this.props.app_state.loc['18'], 1700);
    }
  }

  check_if_configure_spend_structures_already_exists(){
    const stack_transactions = this.props.app_state.stack_items
    for(var i=0; i<stack_transactions.length; i++){
      if(stack_transactions[i].type == this.props.app_state.loc['3120']/* 'configure-spend-structures' */ && stack_transactions[i].contract['e5_id'] == this.state.contract['e5_id'] && stack_transactions[i].id != this.state.id){
        return true
      }
    }
    return false
  }








  render_empty_horizontal_list_item(){
    var background_color = this.props.theme['view_group_card_item_background']
    return(
      <div>
        <div style={{height:57, width:85, 'background-color': background_color, 'border-radius': '8px','padding':'10px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
          <div style={{'margin':'0px 0px 0px 0px'}}>
            <img src={this.props.app_state.theme['letter']} style={{height:20 ,width:'auto'}} />
          </div>
        </div>
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




export default ConfigureSpendStructuresPage;