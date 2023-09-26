import React, { Component } from 'react';
import Background from './../assets/background.png'
import JobIconImg from './../assets/job_icon.png';  
import ExploreIconImg from './../assets/explore_icon.png'; 
import WalletIconImg from './../assets/wallet_icon.png'; 
import StackIconImg from './../assets/stack_icon.png';
import Letter from './../assets/letter.png'; 
import AddLetter from './../assets/add_icon.png';
import EndImg from './../assets/end_token_icon.png';
import SpendImg from './../assets/spend_token_icon.png';
import End35 from './../assets/end35.png';
import E35EndImg from './../assets/e35_end_token.png';
import E35SpendImg from './../assets/e35_spend_token.png';

import SwipeableBottomSheet from 'react-swipeable-bottom-sheet';

import Tags from './../components/tags';
import PostDetailSection from '../sections/detail_section';
import PostListSection from './../sections/list_section';


import CanvasJSReact from './../externals/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

var bigInt = require("big-integer");
const Web3 = require('web3');



/* numberWithCommas */
function number_with_commas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}




class home_page extends Component {
    
    state = {
        page: '?',
        work_page_tags_object:this.get_main_page_tag_object('?'), 
        explore_page_tags_object:this.get_main_page_tag_object('e'), 
        wallet_page_tags_object:this.get_main_page_tag_object('w'),
        selected_ether_item: null, selected_end_item: null, selected_spend_item: null, selected_e5_item: null, selected_proposal_item: null, selected_mail_item: null, selected_storefront_item: null, selected_bag_item: null,
        view_post_bottomsheet: false, selected_contractor_item:null,

        viewed_posts:[],viewed_channels:[],viewed_jobs:[], viewed_contracts:[], viewed_subscriptions:[], viewed_proposals:[],viewed_stores:[], viewed_bags:[], viewed_contractors:[]
    };


    /* returns the tag object used for the main page */
    get_main_page_tag_object(page){
      if(page == '?'/* jobs_section */){
        return{
          'i':{
              active:'e', 
          },
          'e':[
              ['or','',0], ['e','e.jobs','e.contracts','e.contractors', 'e.proposals','e.subscriptions', 'e.mail'], [0]
          ],
          'jobs':[
              ['xor','e',1], ['jobs','all','viewed','created','applied'], [1],[1]
          ],
          'contracts':[
              ['xor','e',1], ['contracts','all','viewed','created','entered'], [1],[1]
          ],
          'contractors':[
              ['xor','e',1], ['contractors','all','viewed','created'], [1],[1]
          ],
          'proposals':[
              ['xor','e',1], ['proposals','my-proposals', 'viewed', 'created'], [1],[1]
          ],
          'subscriptions':[
              ['xor','e',1], ['subscriptions','all','paid','viewed','created'], [1],[1]
          ],
          'mail':[
              ['xor','e',1], ['mail','received','sent'], [1],[1]
          ]
        };
      }
      else if(page == 'e'/* content_section */){
        return{
          'i':{
              active:'e', 
          },
          'e':[
              ['or','',0], ['e','e.E5s','e.posts','e.channels', 'e.storefront', 'e.bags'], [0]
          ],
          'E5s':[
              ['xor','',0], ['E5s','info ℹ️','blockexplorer 🗺️'], [1],[1]
          ],
          'posts':[
              ['xor','',0], ['posts','all','viewed','created'], [1],[1]
          ],
          'channels':[
              ['xor','',0], ['channels','all','viewed','created'], [1],[1]
          ],
          'storefront':[
              ['xor','',0], ['storefront','all', 'viewed','created'], [1],[1]
          ],
          'bags':[
              ['xor','e',1], ['bags','all', 'viewed','created'], [1],[1]
          ],  
        }
      }
      else{/* wallet_section */
        return{
          'i':{
              active:'e', 
          },
          'e':[
              ['or','',0], ['e','ethers ⚗️', 'ends ☝️', 'spends 🫰'],[0]
          ],
        }
      }
      
    }

    

    render(){
        var size = this.props.screensize;
        var top_bar = 50;
        var middle = this.props.height-126;
        var bottom_bar = 70;
        var width = this.props.width;
        var navbar_color = this.props.theme['nav_bar_color'];
        var background_color = this.props.theme['homepage_background_color'];


        if(size == 'm'){
            return ( 
                <div className="row" style={{height: this.props.height, width:'102%','background-color':background_color, 'overflow': 'hidden'}}>
                    <div className="col" style={{backgroundImage: `url(${Background})` , backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}>
                        <div style={{height:top_bar, width:width, 'padding':'9px 0px 0px 15px'}}>
                            {this.render_top_tag_bar(size)}
                        </div>
                        
                        <div style={{height:5}}/>
                        {this.render_post_details_with_orientation(middle, width, size)}
                        <div style={{height:5}}/>
                        
                        <div style={{height:bottom_bar, width: '103%', 'background-color':  navbar_color, 'border-radius': '0px 0px 0px 0px', 'padding':'0px 0px 0px 0px'}}>
                            {this.render_navbar_button_group(size)}
                        </div>
                        
                    </div>
                </div>
            );
        }
        else if(size == 's'){
            return ( 
                <div style={{height: this.props.height, width:'100%','background-color':background_color, backgroundImage: `url(${Background})` , backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}>
                    <div style={{height:top_bar, width:width, 'padding':'9px 0px 0px 0px'}}>
                        {this.render_top_tag_bar(size)}
                    </div>
                    
                    <div style={{height:this.props.height-123, width:width, 'padding':'0px 5px 0px 5px'}}  >
                        {this.render_post_list_group(size)}
                    </div>
                    
                    <div style={{height:5}}/>
                    <div style={{height:bottom_bar, width:width, 'background-color': navbar_color,'display':'flex', 'align-items': 'center', 'border-radius': '0px 0px 0px 0px', 'padding':'0px 0px 0px 15px'}}>
                        {this.render_navbar_button_group(size)}
                    </div>

                    {this.render_view_object_bottomsheet()}
                    
                </div>
            );
        }
        else{
            return(
                <div style={{height: this.props.height, width:'100%','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                    <img src={Letter} style={{height:'auto',width:'35%'}} />
                </div>
            );
        }

    }

    render_post_details_with_orientation(middle, width, size){
        var orientation = this.props.details_orientation;

        if(orientation == 'right'){
            return(
                <div className="row" style={{height:middle, width:width, 'margin':'0px 0px 0px 0px'}}>
                    <div className="col-6" style={{}}>
                        {this.render_post_list_group(size)}
                    </div>

                    <div className="col-6" style={{'padding':'0px 0px 0px 0px'}}>
                        {this.render_post_detail_object(size)}
                    </div>

                </div>
            );
        }else{
            return(
                <div className="row" style={{height:middle, width:width, 'margin':'0px 0px 0px 0px'}}>
                    <div className="col-6" style={{'padding':'0px 0px 0px 0px'}}>
                        {this.render_post_detail_object(size)}
                    </div>

                    <div className="col-6" style={{}}>
                        {this.render_post_list_group(size)}
                    </div>

                </div>
            );
        }
    }

    render_view_object_bottomsheet(){
        var background_color = this.props.theme['send_receive_ether_background_color'];
        var overlay_background = this.props.theme['send_receive_ether_overlay_background'];
        var overlay_shadow_color = this.props.theme['send_receive_ether_overlay_shadow'];
        var size = this.props.screensize;
        return(
        <SwipeableBottomSheet  overflowHeight={0} marginTop={0} onChange={this.open_view_object_bottomsheet.bind(this)} open={this.state.view_post_bottomsheet} style={{'z-index':'5'}} bodyStyle={{'background-color': 'transparent'}} overlayStyle={{'background-color': overlay_background,'box-shadow': '0px 0px 0px 0px '+overlay_shadow_color}}>
            <div style={{ height: this.props.height, 'background-color':background_color, 'border-style': 'solid', 'border-color': overlay_shadow_color, 'border-radius': '0px 0px 0px 0px', 'border-width': '1px', 'box-shadow': '0px 0px 2px 1px #CECDCD','margin': '0px 0px 0px 0px', 'padding':'0px 0px 0px 0px', 'overflow-y':'auto'}}>
                {this.render_post_detail_object(size)}
            </div>
        </SwipeableBottomSheet>
        )
    }

    open_view_object_bottomsheet(){
        if(this.state != null){
            this.setState({view_post_bottomsheet: !this.state.view_post_bottomsheet});
        }
    }


    render_navbar_button_group(size){
        //#545454 - highlight color

        if(size == 'm'){
          return ( 
              <div className="row" style={{'padding':'0px 0px 0px 10px', height:'100%', width:'100%'}}>
                  <div className="col" style={{'background-color': this.get_navbar_normal_or_highlighted_button_background('?'),'padding':'5px 0px 0px 30px', 'border-radius': '0px 0px 0px 0px'}} onClick={()=> this.when_bottom_navbar_button_clicked('?')}>
                      {this.render_navbar_button('l','1px 0px 0px 12px', JobIconImg, 'auto', '70px','3px 12px 3px 19px','????','Work Contracts')}
                  </div>

                  <div className="col" style={{'padding':'5px 0px 0px 30px','background-color': this.get_navbar_normal_or_highlighted_button_background('e')}} onClick={() => this.when_bottom_navbar_button_clicked('e')}>
                    {this.render_navbar_button('l','2px 0px 0px 3px', ExploreIconImg, 'auto', '60px','5px 11px 0px 20px','Explore','Deployed E5s')}
                  </div>

                  <div className="col" style={{'padding':'5px 0px 0px 30px', 'background-color': this.get_navbar_normal_or_highlighted_button_background('w')}} onClick={() => this.when_bottom_navbar_button_clicked('w')}>
                    {this.render_navbar_button('l','2px 0px 0px 15px', WalletIconImg, 'auto', '70px','5px 10px 6px 17px','Wallet','Coin & Tokens')}
                  </div>
                  
                  <div className="col" style={{'padding':'5px 0px 0px 30px'}} onClick={() => this.when_bottom_navbar_button_clicked('s')}>
                    {this.render_navbar_button('l','2px 0px 0px 5px', StackIconImg, 'auto', '59px','3px 11px 2px 12px','Stack','Runs on e')}
                  </div>
              </div>
          );
        }
        else if(size == 's'){
          return(
            <div className="row" style={{'padding':'0px 0px 0px 0px','display':'flex', 'align-items': 'center', height:'100%', width:'100%'}}>
                  <div className="col" style={{height: '100%', width:'100%', padding:'0px 0px 0px 0px', 'background-color': this.get_navbar_normal_or_highlighted_button_background('?'),'border-radius': '1px 0px 0px 0px'}} onClick={() => this.when_bottom_navbar_button_clicked('?')}>
                      {this.render_navbar_button('s','0px 0px 0px 0px', JobIconImg, 'auto', '38px','5px 0px 0px 0px','????','Work Contracts')}
                  </div>

                  <div className="col" style={{height: '100%', width:'100%', padding:'0px 0px 0px 1px', 'background-color': this.get_navbar_normal_or_highlighted_button_background('e')}} onClick={() => this.when_bottom_navbar_button_clicked('e')}>
                      {this.render_navbar_button('s','0px 0px 0px 0px', ExploreIconImg, 'auto', '30px','5px 0px 0px 0px','Explore','Deployed E5s')}
                  </div>

                  <div className="col" style={{height: '100%', width:'100%', padding:'0px 0px 0px 1px', 'background-color': this.get_navbar_normal_or_highlighted_button_background('w')}} onClick={() => this.when_bottom_navbar_button_clicked('w')}>
                    {this.render_navbar_button('s','0px 0px 0px 0px', WalletIconImg, 'auto', '42px','6px 0px 0px 0px','Wallet','Coin & Tokens')}
                      
                  </div>

                  <div className="col" style={{height: '100%', width:'100%', padding:'5px 0px 0px 1px'}} onClick={() => this.when_bottom_navbar_button_clicked('s')}>
                    {this.render_navbar_button('s','0px 0px 0px 0px', StackIconImg, 'auto', '30px','3px 0px 0px 0px','Stack','Runs on e')}
                  </div>
              </div>
          );
        }
    }

    /* returns if button selected is highlighted */
    get_navbar_normal_or_highlighted_button_background(val){
      var color = 'transparent';
        if(val == this.state.page){
            color = this.props.theme['navbar_button_selected_color'];
        }
        return color;
    }

    /* called when a bottom navbar item has been clicked */
    when_bottom_navbar_button_clicked(item){
        if(item == 's'){
            console.log('stack item clicked');
            this.open_view_stack_bottomsheet();
        }
        else {
            this.setState({page: item});
        }
    }

    render_navbar_button(icontype, text_padding, img, img_height, img_width, img_padding, title, tabs){
        var navbar_button_text_color = this.props.theme['primary_navbar_text_color']
        var navbar_button_secondary_text = this.props.theme['secondary_navbar_text_color']
      if(icontype == 's' || icontype == 'xs'){
            return (
                <div style={{height:'100%', width:'93%', 'padding':text_padding, 'text-align':'center', 'background-color':'transparent'}}>
                    <img src={img} style={{height:img_height,width:img_width, padding: img_padding}} />

                    <p style={{'font-size': '12px','color': navbar_button_text_color,'margin': '0px 0px 0px 0px','font-family': 'Sans-serif','text-decoration': 'none', 'text-shadow': '-1px -1px 2px #BABABA'}}>{title}</p>

                    <p style={{'font-size': '8px','color': navbar_button_secondary_text,'margin': '0px 0px 0px 0px','font-family': 'Sans-serif','text-decoration': 'none', 'font-weight': 'bold'}} className="text-capitalize">{tabs}</p>
                </div>
            );
        }else{
            return ( 
                <div className="row" style={{ width:'100%', 'padding':'7px 0px 0px 10px', 'border-radius': '0px 0px 0px 0px'}}>
                    <div className="col-3" style={{'padding':'0px 0px 10px 0px'}}>
                        <div style={{height:'7%', width:'100%'}}>
                            <img src={img} style={{height:img_height,width:img_width, padding: img_padding}} />
                        </div>
                    </div>
                    <div className="col" style={{'padding':'0px 0px 0px 10px'}}>
                        <div style={{height:'7%', width:'100%', 'padding':text_padding}}>
                            <p style={{'font-size': '18px','color': navbar_button_text_color,'margin': '0px 0px 0px 0px','font-family': 'Sans-serif','text-decoration': 'none', 'text-shadow': '-1px -1px 2px #BABABA'}}>{title}</p> 
                            <p style={{'font-size': '10px','color': navbar_button_secondary_text,'margin': '-5px 0px 0px 0px','font-family': 'Sans-serif','text-decoration': 'none', 'font-weight': 'bold'}} className="text-capitalize">{tabs}</p>
                        </div>
                    </div>
                </div> 
            );
        }
    }

    open_view_stack_bottomsheet(){
        this.props.open_stack_bottomsheet()
    }










    /* render the top bar tags with the create object button */
    render_top_tag_bar(size){
        var width = this.props.width - 80;
        if(size == 'l') width = this.props.width - 10;
        return(
            <div style={{'display': 'flex','flex-direction': 'row','padding': '0px 0px 0px 5px', height: 40,  width: '99%'}}>
                <div style={{width: width}}>
                    {this.render_tag_bar_group(this.get_tag_group_option(),'l')}
                </div>
                
                <button style={{'text-decoration': 'none', 'border': 'none','background-color': 'transparent' ,'float': 'right', width: 70,'padding': '0px 0px 12px 0px', opacity:1}}>
                    {this.render_e_plus_button()}
                </button>
            </div>
        );
    }


    /* renders the e plus button and sets its opacity */
    render_e_plus_button(){
      var button_target = this.get_e_plus_button_mapping();
      var alpha = 1.0;
      if(button_target == ''){
        alpha = 0.2;
      }
      return(
        <img onClick={()=> this.when_e_plus_letter_clicked()} src={AddLetter} style={{height:36, width:'auto', opacity:alpha}} />
      )
    }

    /* gets the tag object id for creating new objects associated with the tag option active in the top bar */
    get_e_plus_button_mapping(){
      if(this.state.page == '?'){
        var selected_item = this.state.work_page_tags_object['i'].active
        var data = {'jobs':'0','contracts':'1','subscriptions':'3','contractors':'9', 'mail':'5'};
        if(data[selected_item] == null) return ''
        return data[selected_item];
      }
      else if(this.state.page == 'e'){
        var selected_item = this.state.explore_page_tags_object['i'].active
        var data = {'storefront':'4','posts':'6','channels':'7'};
        if(data[selected_item] == null) return ''
        return data[selected_item];
      }
      else{
        return '8'
      }
    }

    /* gets the option of tags to use depending on the bottom navbar button clicked */
    get_tag_group_option(){
      if(this.state.page == '?'){
        return this.state.work_page_tags_object
      }
      else if(this.state.page == 'e'){
        return this.state.explore_page_tags_object
      }
      else{
        return this.state.wallet_page_tags_object
      }
    }

    get_selected_item(object, option){
        var selected_item = object[option][2][0]
        var picked_item = object[option][1][selected_item];
        return picked_item
    }

     /* called when the eplus letter is clicked on the main page */
    when_e_plus_letter_clicked(){
      var button_target = this.get_e_plus_button_mapping();
      if(button_target != ''){
        this.props.open_new_object(button_target);
      }
    }







    render_tag_bar_group(option, size){
        return(
            <div>
                <Tags page_tags_object={option} tag_size={size} when_tags_updated={this.when_tags_updated.bind(this)} theme={this.props.theme}/>
            </div>
        )
    }

    when_tags_updated(tag_group){
        if(this.state.page == '?'){
            this.setState({work_page_tags_object: tag_group})
        }
        else if(this.state.page == 'e'){
            this.setState({explore_page_tags_object: tag_group})
        }
        else{
            this.setState({wallet_page_tags_object: tag_group})
        }
        this.setState({ selected_job_post_item:null, selected_contract_item:null, selected_subscription_item:null, selected_post_item:null, selected_channel_item:null, selected_proposal_item:null, selected_storefront_item:null, selected_bag_item:null, selected_contractor_item: null})
    }








    get_contract_items(){
        var selected_option_name = this.get_selected_item(this.state.work_page_tags_object, this.state.work_page_tags_object['i'].active)

        if(this.state.work_page_tags_object['i'].active != 'contracts'){
            return this.props.app_state.created_contracts
        }

        if(selected_option_name == 'all'){
            return this.props.app_state.created_contracts
        }
        else if(selected_option_name == 'viewed'){
            var my_viewed_contracts = []
            for(var i=0; i<this.state.viewed_contracts.length; i++){
                my_viewed_contracts.push(this.props.app_state.created_contracts[this.state.viewed_contracts[i]])
            }
            return my_viewed_contracts
        }
        else if(selected_option_name == 'entered'){
            var my_entered_contracts = []
            for(var i=0; i<this.props.app_state.created_contracts.length; i++){
                var object = this.props.app_state.created_contracts[i]
                var expiry_time_in_seconds = object['entry_expiry']
                if(expiry_time_in_seconds != 0){
                    my_entered_contracts.push(object)
                }
            }
            return my_entered_contracts
        }
        else {
            var my_contracts = []
            var myid = this.props.app_state.user_account_id
            for(var i = 0; i < this.props.app_state.created_contracts.length; i++){
                var post_author = this.props.app_state.created_contracts[i]['event'] == null ? 0 : this.props.app_state.created_contracts[i]['event'].returnValues.p3
                if(post_author.toString() == myid.toString()){
                    my_contracts.push(this.props.app_state.created_contracts[i])
                }
            }
            return my_contracts
        }
    }

    get_bag_items(){
        var selected_option_name = this.get_selected_item(this.state.explore_page_tags_object, this.state.explore_page_tags_object['i'].active)

        if(this.state.explore_page_tags_object['i'].active != 'bags'){
            return this.props.app_state.created_stores 
        }

        if(selected_option_name == 'all'){
            return this.props.app_state.created_bags
        }
        else if(selected_option_name == 'viewed'){
            var my_viewed_bags = []
            for(var i=0; i<this.state.viewed_bags.length; i++){
                my_viewed_bags.push(this.props.app_state.created_bags[this.state.viewed_bags[i]])
            }
            return my_viewed_bags
        }
        else {
            var my_bags = []
            var myid = this.props.app_state.user_account_id
            for(var i = 0; i < this.props.app_state.created_bags.length; i++){
                var post_author = this.props.app_state.created_bags[i]['event'].returnValues.p3
                if(post_author.toString() == myid.toString()){
                    my_bags.push(this.props.app_state.created_bags[i])
                }
            }
            return my_bags
        }
    }

    get_channel_items(){
        var selected_option_name = this.get_selected_item(this.state.explore_page_tags_object, this.state.explore_page_tags_object['i'].active)

        if(this.state.explore_page_tags_object['i'].active != 'channels'){
            return this.props.app_state.created_channels 
        }

        if(selected_option_name == 'all'){
            return this.props.app_state.created_channels
        }
        else if(selected_option_name == 'viewed'){
            var my_viewed_channels = []
            for(var i=0; i<this.state.viewed_channels.length; i++){
                my_viewed_channels.push(this.props.app_state.created_channels[this.state.viewed_channels[i]])
            }
            return my_viewed_channels
        }
        else {
            var my_channels = []
            var myid = this.props.app_state.user_account_id
            for(var i = 0; i < this.props.app_state.created_channels.length; i++){
                var channel_author = this.props.app_state.created_channels[i]['event'].returnValues.p5
                if(channel_author.toString() == myid.toString()){
                    my_channels.push(this.props.app_state.created_channels[i])
                }
            }
            return my_channels
        }
    }

    get_contractor_items(){
        var selected_option_name = this.get_selected_item(this.state.work_page_tags_object, this.state.work_page_tags_object['i'].active)

        if(this.state.work_page_tags_object['i'].active != 'contractors'){
            return this.props.app_state.created_contractors
        }

        if(selected_option_name == 'all'){
            return this.props.app_state.created_contractors
        }
        else if(selected_option_name == 'viewed'){
            var my_viewed_contractors = []
            for(var i=0; i<this.state.viewed_contractors.length; i++){
                my_viewed_contractors.push(this.props.app_state.created_contractors[this.state.viewed_contractors[i]])
            }
            return my_viewed_contractors
        }
        else {
            var my_contractors = []
            var myid = this.props.app_state.user_account_id
            for(var i = 0; i < this.props.app_state.created_contractors.length; i++){
                var post_author = this.props.app_state.created_contractors[i]['event'].returnValues.p5
                if(post_author.toString() == myid.toString()){
                    my_contractors.push(this.props.app_state.created_contractors[i])
                }
            }
            return my_contractors
        }
    }

    get_exchange_tokens(exchange_type){
        var token_exchanges = []
        var exchanges_from_sync = this.props.app_state.created_tokens
        for (let i = 0; i < exchanges_from_sync.length; i++) {
            var type = exchanges_from_sync[i]['data'][0][3/* <3>token_type */]
            
            var img = type  == 3 ? EndImg: SpendImg
            if(exchanges_from_sync[i]['id'] == 3) img = E35EndImg
            else if(exchanges_from_sync[i]['id'] == 5) img = E35SpendImg
            
            if(type == exchange_type){
                token_exchanges.push({'data': exchanges_from_sync[i]['data'], 'id':exchanges_from_sync[i]['id'], 'E5': 'E15', 'img':img, 'balance':exchanges_from_sync[i]['balance'], 'account_data':exchanges_from_sync[i]['account_data'], 'event':exchanges_from_sync[i]['event'], 'ipfs':exchanges_from_sync[i]['ipfs'],'exchanges_balances':exchanges_from_sync[i]['exchanges_balances'], 'moderators':exchanges_from_sync[i]['moderators'], 'access_rights_enabled':exchanges_from_sync[i]['access_rights_enabled'] })
            }
        }

        var sorted_token_exchange_data = []
        var myid = this.props.app_state.user_account_id
        for (let i = 0; i < token_exchanges.length; i++) {
            var author_account = token_exchanges[i]['event'] == null ? '':token_exchanges[i]['event'].returnValues.p3.toString() 
            if(author_account == myid.toString()){
                sorted_token_exchange_data.push(token_exchanges[i])
            }
        }
        sorted_token_exchange_data.reverse()
        for (let i = 0; i < token_exchanges.length; i++) {
            if(!sorted_token_exchange_data.includes(token_exchanges[i]) && token_exchanges['balance'] != 0){
                sorted_token_exchange_data.push(token_exchanges[i])
            }
        }
        for (let i = 0; i < token_exchanges.length; i++) {
            if(!sorted_token_exchange_data.includes(token_exchanges[i])){
                sorted_token_exchange_data.push(token_exchanges[i])
            }
        }

        return sorted_token_exchange_data
    }

    get_job_items(){
        var selected_option_name = this.get_selected_item(this.state.work_page_tags_object, this.state.work_page_tags_object['i'].active)

        if(this.state.work_page_tags_object['i'].active != 'jobs'){
            return this.props.app_state.created_jobs 
        }

        if(selected_option_name == 'all'){
            return this.props.app_state.created_jobs
        }
        else if(selected_option_name == 'viewed'){
            var my_viewed_jobs = []
            for(var i=0; i<this.state.viewed_jobs.length; i++){
                my_viewed_jobs.push(this.props.app_state.created_jobs[this.state.viewed_jobs[i]])
            }
            
            return my_viewed_jobs
        }
        else if(selected_option_name == 'applied'){
            var my_applied_jobs = []
            for(var i=0; i<this.props.app_state.my_applications.length; i++){
                var job_id = this.props.app_state.my_applications[i]['event'].returnValues.p1
                var job_obj = this.props.app_state.created_job_mappings[job_id]
                if(job_obj != null && !my_applied_jobs.includes(job_obj)){
                    my_applied_jobs.push(job_obj)
                }
            }
            return my_applied_jobs
        }
        else {
            var my_jobs = []
            var myid = this.props.app_state.user_account_id
            for(var i = 0; i < this.props.app_state.created_jobs.length; i++){
                var post_author = this.props.app_state.created_jobs[i]['event'].returnValues.p5
                if(post_author.toString() == myid.toString()){
                    my_jobs.push(this.props.app_state.created_jobs[i])
                }
            }
            return my_jobs
        }
    }

    get_mail_items(){
        var selected_option_name = this.get_selected_item(this.state.work_page_tags_object, this.state.work_page_tags_object['i'].active)

        if(this.state.work_page_tags_object['i'].active != 'mail'){
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

    get_post_items(){
        var selected_option_name = this.get_selected_item(this.state.explore_page_tags_object, this.state.explore_page_tags_object['i'].active)

        if(this.state.explore_page_tags_object['i'].active != 'posts'){
            return this.props.app_state.created_posts 
        }

        if(selected_option_name == 'all'){
            return this.props.app_state.created_posts
        }
        else if(selected_option_name == 'viewed'){
            var my_viewed_posts = []
            for(var i=0; i<this.state.viewed_posts.length; i++){
                my_viewed_posts.push(this.props.app_state.created_posts[this.state.viewed_posts[i]])
            }
            return my_viewed_posts
        }
        else {
            var my_posts = []
            var myid = this.props.app_state.user_account_id
            for(var i = 0; i < this.props.app_state.created_posts.length; i++){
                var post_author = this.props.app_state.created_posts[i]['event'].returnValues.p5
                if(post_author.toString() == myid.toString()){
                    my_posts.push(this.props.app_state.created_posts[i])
                }
            }
            return my_posts
        }
    }

    get_proposal_items(){
        var selected_option_name = this.get_selected_item(this.state.work_page_tags_object, this.state.work_page_tags_object['i'].active)

        if(this.state.work_page_tags_object['i'].active != 'proposals'){
            return this.props.app_state.my_proposals 
        }

        if(selected_option_name == 'my-proposals'){
            return this.props.app_state.my_proposals
        }
        else if(selected_option_name == 'viewed'){
            var my_viewed_proposals = []
            for(var i=0; i<this.state.viewed_proposals.length; i++){
                my_viewed_proposals.push(this.props.app_state.my_proposals[this.state.viewed_proposals[i]])
            }
            return my_viewed_proposals
        }
        else {
            var proposals = []
            var myid = this.props.app_state.user_account_id
            for(var i = 0; i < this.props.app_state.my_proposals.length; i++){
                var proposal_author = this.props.app_state.my_proposals[i]['event'].returnValues.p4/* should be p3 */
                if(proposal_author.toString() == myid.toString()){
                    proposals.push(this.props.app_state.my_proposals[i])
                }else{
                    console.log('sender not proposal author: author->'+proposal_author+', sender id->'+myid)
                }
            }
            return proposals
        }
    }

    get_storefront_items(){
        var selected_option_name = this.get_selected_item(this.state.explore_page_tags_object, this.state.explore_page_tags_object['i'].active)

        if(this.state.explore_page_tags_object['i'].active != 'storefront'){
            return this.props.app_state.created_stores 
        }

        if(selected_option_name == 'all'){
            return this.props.app_state.created_stores
        }
        else if(selected_option_name == 'viewed'){
            var my_viewed_stores = []
            for(var i=0; i<this.state.viewed_stores.length; i++){
                my_viewed_stores.push(this.props.app_state.created_stores[this.state.viewed_stores[i]])
            }
            return my_viewed_stores
        }
        else {
            var my_stores = []
            var myid = this.props.app_state.user_account_id
            for(var i = 0; i < this.props.app_state.created_stores.length; i++){
                var post_author = this.props.app_state.created_stores[i]['event'].returnValues.p5
                if(post_author.toString() == myid.toString()){
                    my_stores.push(this.props.app_state.created_stores[i])
                }
            }
            return my_stores
        }
    }

    get_subscription_items(){
        var selected_option_name = this.get_selected_item(this.state.work_page_tags_object, this.state.work_page_tags_object['i'].active)

        if(this.state.work_page_tags_object['i'].active != 'subscriptions'){
            return this.props.app_state.created_subscriptions
        }

        if(selected_option_name == 'all'){
            return this.props.app_state.created_subscriptions
        }
        else if(selected_option_name == 'viewed'){
            var my_viewed_subscriptions = []
            for(var i=0; i<this.state.viewed_subscriptions.length; i++){
                my_viewed_subscriptions.push(this.props.app_state.created_subscriptions[this.state.viewed_subscriptions[i]])
            }
            return my_viewed_subscriptions
        }
        else if(selected_option_name == 'paid'){
            var my_paid_subscriptions = []
            for(var i=0; i<this.props.app_state.created_subscriptions.length; i++){
                var object = this.props.app_state.created_subscriptions[i]
                if(object['payment'] != 0){
                    my_paid_subscriptions.push(object)
                }
            }
            return my_paid_subscriptions
        }
        else {
            var my_subscriptions = []
            var myid = this.props.app_state.user_account_id
            for(var i = 0; i < this.props.app_state.created_subscriptions.length; i++){
                var post_author = this.props.app_state.created_subscriptions[i]['event'] == null ? 0 : this.props.app_state.created_subscriptions[i]['event'].returnValues.p3
                if(post_author.toString() == myid.toString()){
                    my_subscriptions.push(this.props.app_state.created_subscriptions[i])
                }
            }
            return my_subscriptions
        }
    }






    
    



    render_post_list_group(size){
        return(
            <PostListSection size={size} height={this.props.height} width={this.props.width} page={this.state.page} work_page_tags_object={this.state.work_page_tags_object} explore_page_tags_object={this.state.explore_page_tags_object} wallet_page_tags_object={this.state.wallet_page_tags_object} app_state={this.props.app_state} 
            when_ether_object_clicked={this.when_ether_object_clicked.bind(this)} when_spends_object_clicked={this.when_spends_object_clicked.bind(this)} when_ends_object_clicked={this.when_ends_object_clicked.bind(this)} when_E5_item_clicked={this.when_E5_item_clicked.bind(this)} when_job_post_item_clicked={this.when_job_post_item_clicked.bind(this)} when_contract_item_clicked={this.when_contract_item_clicked.bind(this)} when_subscription_item_clicked={this.when_subscription_item_clicked.bind(this)} when_post_item_clicked={this.when_post_item_clicked.bind(this)} when_channel_item_clicked={this.when_channel_item_clicked.bind(this)} when_proposal_item_clicked={this.when_proposal_item_clicked.bind(this)} when_mail_item_clicked={this.when_mail_item_clicked.bind(this)} when_storefront_post_item_clicked={this.when_storefront_post_item_clicked.bind(this)} when_bag_post_item_clicked={this.when_bag_post_item_clicked.bind(this)} when_contractor_post_item_clicked={this.when_contractor_post_item_clicked.bind(this)}

            open_send_receive_ether_bottomsheet={this.props.open_send_receive_ether_bottomsheet.bind(this)} theme={this.props.theme} fetch_objects_data={this.props.fetch_objects_data.bind(this)} 
            
            viewed_posts={this.state.viewed_posts} viewed_channels={this.state.viewed_channels} viewed_jobs={this.state.viewed_jobs} viewed_contracts={this.state.viewed_contracts} viewed_subscriptions={this.state.viewed_subscriptions} viewed_proposals={this.state.viewed_proposals} viewed_stores={this.state.viewed_stores} viewed_bags={this.state.viewed_bags} viewed_contractors={this.state.viewed_contractors}

            get_contract_items={this.get_contract_items.bind(this)} get_bag_items={this.get_bag_items.bind(this)} get_channel_items={this.get_channel_items.bind(this)} get_contractor_items={this.get_contractor_items.bind(this)} get_exchange_tokens={this.get_exchange_tokens.bind(this)} get_job_items={this.get_job_items.bind(this)} get_mail_items={this.get_mail_items.bind(this)} get_post_items={this.get_post_items.bind(this)} get_proposal_items={this.get_proposal_items.bind(this)} get_storefront_items={this.get_storefront_items.bind(this)} get_subscription_items={this.get_subscription_items.bind(this)}
            />
        )
    }

    when_ether_object_clicked(index){
        this.setState({selected_ether_item: index})
        if(this.props.screensize == 's'){
            this.open_view_object_bottomsheet()
        }
    }

    when_ends_object_clicked(index){
        this.setState({selected_end_item: index})
        if(this.props.screensize == 's'){
            this.open_view_object_bottomsheet()
        }
    }

    when_spends_object_clicked(index){
        this.setState({selected_spend_item: index})
        if(this.props.screensize == 's'){
            this.open_view_object_bottomsheet()
        }
    }

    when_E5_item_clicked(index){
        this.setState({selected_e5_item: index})
        if(this.props.screensize == 's'){
            this.open_view_object_bottomsheet()
        }
    }

    when_job_post_item_clicked(index, id){
        this.setState({selected_job_post_item: index})
        var viewed_jobs_clone = this.state.viewed_jobs.slice()
        var pos = viewed_jobs_clone.indexOf(index)
        if(pos == -1){
            viewed_jobs_clone.push(index)
            this.setState({viewed_jobs: viewed_jobs_clone})
        }

        this.props.get_job_objects_responses(id)
        this.props.get_objects_messages(id)

        if(this.props.screensize == 's'){
            this.open_view_object_bottomsheet()
        }
    }

    when_contract_item_clicked(index){
        this.setState({selected_contract_item: index})

        var viewed_contracts_clone = this.state.viewed_contracts.slice()
        var pos = viewed_contracts_clone.indexOf(index)
        if(pos == -1){
            viewed_contracts_clone.push(index)
            this.setState({viewed_contracts: viewed_contracts_clone})
        }

        if(this.props.screensize == 's'){
            this.open_view_object_bottomsheet()
        }
    }

    when_subscription_item_clicked(index){
        this.setState({selected_subscription_item: index})

        var viewed_subscriptions_clone = this.state.viewed_subscriptions.slice()
        var pos = viewed_subscriptions_clone.indexOf(index)
        if(pos == -1){
            viewed_subscriptions_clone.push(index)
            this.setState({viewed_subscriptions: viewed_subscriptions_clone})
        }

        if(this.props.screensize == 's'){
            this.open_view_object_bottomsheet()
        }
    }

    when_post_item_clicked(index, id){
        this.setState({selected_post_item: index})

        var viewed_posts_clone = this.state.viewed_posts.slice()
        var pos = viewed_posts_clone.indexOf(index)
        if(pos == -1){
            viewed_posts_clone.push(index)
            this.setState({viewed_posts: viewed_posts_clone})
        }

        this.props.get_objects_messages(id)

        if(this.props.screensize == 's'){
            this.open_view_object_bottomsheet()
        }
    }

    when_channel_item_clicked(index, id){
        this.setState({selected_channel_item: index})

        var viewed_channel_clone = this.state.viewed_channels.slice()
        var pos = viewed_channel_clone.indexOf(index)
        if(pos == -1){
            viewed_channel_clone.push(index)
            this.setState({viewed_channels: viewed_channel_clone})
        }

        this.props.get_objects_messages(id)

        if(this.props.screensize == 's'){
            this.open_view_object_bottomsheet()
        }
    }

    when_proposal_item_clicked(index, id){
        this.setState({selected_proposal_item: index})

        var viewed_proposals_clone = this.state.viewed_proposals.slice()
        var pos = viewed_proposals_clone.indexOf(index)
        if(pos == -1){
            viewed_proposals_clone.push(index)
            this.setState({viewed_proposals: viewed_proposals_clone})
        }

        this.props.get_objects_messages(id)

        if(this.props.screensize == 's'){
            this.open_view_object_bottomsheet()
        }
    }

    when_mail_item_clicked(index){
        this.setState({selected_mail_item: index})

        if(this.props.screensize == 's'){
            this.open_view_object_bottomsheet()
        }
    }

    when_storefront_post_item_clicked(index, id){
        this.setState({selected_storefront_item: index})

        var viewed_storefront_clone = this.state.viewed_stores.slice()
        var pos = viewed_storefront_clone.indexOf(index)
        if(pos == -1){
            viewed_storefront_clone.push(index)
            this.setState({viewed_stores: viewed_storefront_clone})
        }

        this.props.get_direct_purchase_events(id)
        this.props.get_objects_messages(id)

        if(this.props.screensize == 's'){
            this.open_view_object_bottomsheet()
        }
    }

    when_bag_post_item_clicked(index, id){
        this.setState({selected_bag_item: index})

        var viewed_bag_clone = this.state.viewed_bags.slice()
        var pos = viewed_bag_clone.indexOf(index)
        if(pos == -1){
            viewed_bag_clone.push(index)
            this.setState({viewed_bags: viewed_bag_clone})
        }

        this.props.get_job_objects_responses(id)
        this.props.get_objects_messages(id)

        if(this.props.screensize == 's'){
            this.open_view_object_bottomsheet()
        }
    }

    when_contractor_post_item_clicked(index, id){
        this.setState({selected_contractor_item: index})
        var viewed_contractors_clone = this.state.viewed_contractors.slice()
        var pos = viewed_contractors_clone.indexOf(index)
        if(pos == -1){
            viewed_contractors_clone.push(index)
            this.setState({viewed_contractors: viewed_contractors_clone})
        }

        this.props.get_contractor_applications(id)

        if(this.props.screensize == 's'){
            this.open_view_object_bottomsheet()
        }
    }






    render_post_detail_object(size){
        return(
            <div>
                <PostDetailSection page={this.state.page} screensize={size} work_page_tags_object={this.state.work_page_tags_object} wallet_page_tags_object={this.state.wallet_page_tags_object} explore_page_tags_object={this.state.explore_page_tags_object} 

                selected_ether_item={this.state.selected_ether_item} selected_end_item={this.state.selected_end_item} selected_spend_item={this.state.selected_spend_item} selected_e5_item={this.state.selected_e5_item} selected_job_post_item={this.state.selected_job_post_item} selected_contract_item={this.state.selected_contract_item} selected_subscription_item={this.state.selected_subscription_item} selected_post_item={this.state.selected_post_item} selected_channel_item={this.state.selected_channel_item} selected_proposal_item={this.state.selected_proposal_item} selected_mail_item={this.state.selected_mail_item} selected_storefront_item={this.state.selected_storefront_item} selected_bag_item={this.state.selected_bag_item} selected_contractor_item={this.state.selected_contractor_item}

                height={this.props.height} screensize={this.props.screensize} width={this.props.width} app_state={this.props.app_state} open_send_receive_ether_bottomsheet={this.props.open_send_receive_ether_bottomsheet.bind(this)} theme={this.props.theme} open_wiki_bottomsheet={this.props.open_wiki_bottomsheet.bind(this)} notify={this.props.notify.bind(this)}
                
                when_view_image_clicked={this.when_view_image_clicked.bind(this)} when_edit_job_tapped={this.when_edit_job_tapped.bind(this)} fetch_objects_data={this.props.fetch_objects_data.bind(this)}
                
                viewed_posts={this.state.viewed_posts} viewed_channels={this.state.viewed_channels} viewed_jobs={this.state.viewed_jobs} viewed_contracts={this.state.viewed_contracts} viewed_subscriptions={this.state.viewed_subscriptions} viewed_proposals={this.state.viewed_proposals} viewed_stores={this.state.viewed_stores} viewed_bags={this.state.viewed_bags} viewed_contractors={this.state.viewed_contractors}

                open_mint_burn_token_ui={this.open_mint_burn_token_ui.bind(this)} open_transfer_ui={this.open_transfer_ui.bind(this)} open_enter_contract_ui={this.open_enter_contract_ui.bind(this)} open_extend_contract_ui={this.open_extend_contract_ui.bind(this)} open_exit_contract_ui={this.open_exit_contract_ui.bind(this)} open_new_proposal_ui={this.open_new_proposal_ui.bind(this)}
                open_vote_proposal_ui={this.open_vote_proposal_ui.bind(this)} open_sumbit_proposal_ui={this.open_sumbit_proposal_ui.bind(this)} open_pay_subscription_ui={this.open_pay_subscription_ui.bind(this)} open_cancel_subscription_ui={this.open_cancel_subscription_ui.bind(this)} open_collect_subscription_ui={this.open_collect_subscription_ui.bind(this)} open_modify_subscription_ui={this.open_modify_subscription_ui.bind(this)} open_modify_contract_ui={this.open_modify_contract_ui.bind(this)} open_modify_token_ui={this.open_modify_token_ui.bind(this)} open_exchange_transfers_ui={this.open_exchange_transfers_ui.bind(this)} open_force_exit_ui={this.open_force_exit_ui.bind(this)} open_archive_proposal_ui={this.open_archive_proposal_ui.bind(this)} open_freeze_unfreeze_ui={this.open_freeze_unfreeze_ui.bind(this)} open_authmint_ui={this.open_authmint_ui.bind(this)} open_moderator_ui={this.open_moderator_ui.bind(this)} show_images={this.props.show_images.bind(this)}

                add_mail_to_stack_object={this.props.add_mail_to_stack_object.bind(this)} add_channel_message_to_stack_object={this.props.add_channel_message_to_stack_object.bind(this)} add_post_reply_to_stack={this.props.add_post_reply_to_stack.bind(this)} open_respond_to_job_ui={this.open_respond_to_job_ui.bind(this)} view_application_contract={this.view_application_contract.bind(this)} add_job_message_to_stack_object={this.props.add_job_message_to_stack_object.bind(this)} add_proposal_message_to_stack_object={this.props.add_proposal_message_to_stack_object.bind(this)} open_add_to_bag={this.props.open_add_to_bag.bind(this)} open_fulfil_bag_request={this.props.open_fulfil_bag_request.bind(this)} view_bag_application_contract={this.view_bag_application_contract.bind(this)} open_direct_purchase={this.open_direct_purchase.bind(this)} open_send_job_request_ui={this.props.open_send_job_request_ui.bind(this)} show_withdraw_ether_bottomsheet={this.props.show_withdraw_ether_bottomsheet.bind(this)}

                open_clear_purchase={this.props.open_clear_purchase.bind(this)} add_bag_message_to_stack_object={this.props.add_bag_message_to_stack_object.bind(this)} add_storefront_message_to_stack_object={this.props.add_storefront_message_to_stack_object.bind(this)} open_view_job_request_ui={this.props.open_view_job_request_ui} open_view_contract_ui={this.props.open_view_contract_ui.bind(this)}

                get_contract_items={this.get_contract_items.bind(this)} get_bag_items={this.get_bag_items.bind(this)} get_channel_items={this.get_channel_items.bind(this)} get_contractor_items={this.get_contractor_items.bind(this)} get_exchange_tokens={this.get_exchange_tokens.bind(this)} get_job_items={this.get_job_items.bind(this)} get_mail_items={this.get_mail_items.bind(this)} get_post_items={this.get_post_items.bind(this)}
                get_proposal_items={this.get_proposal_items.bind(this)} get_storefront_items={this.get_storefront_items.bind(this)} get_subscription_items={this.get_subscription_items.bind(this)}
                />
            </div>
        )
    }


    when_view_image_clicked(index, images){
        this.props.when_view_image_clicked(index, images)
    }

    when_edit_job_tapped(){
        this.props.when_edit_job_tapped(this.props.app_state.created_object_array[this.state.selected_job_post_item])
    }

    open_mint_burn_token_ui(item){
        this.props.show_mint_token_bottomsheet(item);
    }

    open_transfer_ui(item){
        this.props.show_transfer_bottomsheet(item)
    }

    open_enter_contract_ui(item){
        this.props.show_enter_contract_bottomsheet(item)
    }

    open_extend_contract_ui(item){
        this.props.show_extend_contract_bottomsheet(item)
    }

    open_exit_contract_ui(item){
        this.props.show_exit_contract_bottomsheet(item)
    }

    open_new_proposal_ui(item){
        this.props.show_new_proposal_bottomsheet(item)
    }

    open_vote_proposal_ui(item){
        this.props.show_vote_proposal_bottomsheet(item)
    }

    open_sumbit_proposal_ui(item){
        this.props.show_submit_proposal_bottomsheet(item)
    }

    open_pay_subscription_ui(item){
        this.props.show_pay_subscription_bottomsheet(item)
    }

    open_cancel_subscription_ui(item){
        this.props.show_cancel_subscription_bottomsheet(item)
    }

    open_collect_subscription_ui(item){
        this.props.show_collect_subscription_bottomsheet(item)
    }

    open_modify_subscription_ui(item){
        this.props.show_modify_subscription_bottomsheet(item)
    }

    open_modify_contract_ui(item){
        this.props.show_modify_contract_bottomsheet(item)
    }

    open_modify_token_ui(item){
        this.props.show_modify_token_bottomsheet(item)
    }

    open_exchange_transfers_ui(item){
        this.props.show_exchange_transfer_bottomsheet(item)
    }

    open_force_exit_ui(item){
        this.props.show_force_exit_bottomsheet(item)
    }

    open_archive_proposal_ui(item){
        this.props.show_archive_proposal_bottomsheet(item)
    }
    
    open_freeze_unfreeze_ui(item){
        this.props.show_freeze_unfreeze_bottomsheet(item)
    }

    open_authmint_ui(item){
        this.props.show_authmint_bottomsheet(item)
    }

    open_moderator_ui(item){
        this.props.show_moderator_bottomsheet(item)
    }

    open_respond_to_job_ui(item){
        this.props.show_respond_to_job_bottomsheet(item)
    }

    view_application_contract(item){
        this.props.show_view_application_contract_bottomsheet(item)
    }

    view_bag_application_contract(item){
        this.props.show_view_bag_application_contract_bottomsheet(item)
    }

    open_direct_purchase(item){
        this.props.show_direct_purchase_bottomsheet(item)
    }

}




export default home_page;