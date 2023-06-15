import React, { Component } from 'react';
import Background from './../assets/background.png'
import JobIconImg from './../assets/job_icon.png';  
import ExploreIconImg from './../assets/explore_icon.png'; 
import WalletIconImg from './../assets/wallet_icon.png'; 
import StackIconImg from './../assets/stack_icon.png';
import Letter from './../assets/letter.png'; 
import AddLetter from './../assets/add_icon.png';

import SwipeableBottomSheet from 'react-swipeable-bottom-sheet';

import Tags from './../components/tags';
import PostDetailSection from '../sections/post_detail_section';
import PostListSection from './../sections/post_list_section';

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
        selected_ether_item: null, selected_end_item: null, selected_spend_item: null,
        view_post_bottomsheet: false,
    };


    /* returns the tag object used for the main page */
    get_main_page_tag_object(page){
      if(page == '?'/* jobs_section */){
        return{
          'i':{
              active:'e', 
          },
          'e':[
              ['or','',0], ['e','e.contracts', 'e.proposals','e.subscriptions'], [0]
          ],
          'contracts':[
              ['or','e',1], ['contracts','all','viewed','created','received'], [1],[1]
          ],
          'proposals':[
              ['or','e',1], ['proposals','all','received','created','voted'], [1],[1]
          ],
          'subscriptions':[
              ['or','e',1], ['subscriptions','all','paid','created'], [1],[1]
          ],
          'my':[
              ['or','',0], ['my','carts','bags'], [1],[1]
          ],
        };
      }
      else if(page == 'e'/* content_section */){
        return{
          'i':{
              active:'e', 
          },
          'e':[
              ['or','',0], ['e','e.posts','e.channels','e.E5s'], [0]
          ],
          'posts':[
              ['or','',0], ['posts','all','viewed','created'], [1],[1]
          ],
          'channels':[
              ['or','',0], ['channels','all','viewed','created'], [1],[1]
          ],
          'E5s':[
              ['or','',0], ['E5s','info ℹ️','indexdata 📊','blockexplorer 🗺️', 'tipjar 🍯'], [1],[1]
          ]
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
          'E5tokens':[
              ['or','',0], ['E5tokens','ends ☝️','spends 🫰'], [1],[1]
          ]
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
                <div className="row" style={{height:middle, width:width, 'margin':'0px 0px 0px 3px'}}>
                    <div className="col-6" style={{}}>
                        {this.render_post_list_group(size)}
                    </div>

                    <div className="col-6" style={{'padding':'0px 10px 0px 10px'}}>
                        {this.render_post_detail_object(size)}
                    </div>

                </div>
            );
        }else{
            return(
                <div className="row" style={{height:middle, width:width, 'margin':'0px 0px 0px 3px'}}>
                    <div className="col-6" style={{'padding':'0px 10px 0px 10px'}}>
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
            <div style={{ height: this.props.height, 'background-color': background_color, 'border-style': 'solid', 'border-color': 'white', 'border-radius': '0px 0px 0px 0px', 'border-width': '1px', 'box-shadow': '0px 0px 2px 1px #CECDCD','margin': '0px 0px 0px 0px', 'overflow-y':'auto'}}>
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
                      {this.render_navbar_button('s','0px 0px 0px 0px', JobIconImg, 'auto', '38px','5px 0px 0px 0px','????','44 tabs')}
                  </div>

                  <div className="col" style={{height: '100%', width:'100%', padding:'0px 0px 0px 1px', 'background-color': this.get_navbar_normal_or_highlighted_button_background('e')}} onClick={() => this.when_bottom_navbar_button_clicked('e')}>
                      {this.render_navbar_button('s','0px 0px 0px 0px', ExploreIconImg, 'auto', '30px','5px 0px 0px 0px','????','44 tabs')}
                  </div>

                  <div className="col" style={{height: '100%', width:'100%', padding:'0px 0px 0px 1px', 'background-color': this.get_navbar_normal_or_highlighted_button_background('w')}} onClick={() => this.when_bottom_navbar_button_clicked('w')}>
                    {this.render_navbar_button('s','0px 0px 0px 0px', WalletIconImg, 'auto', '42px','6px 0px 0px 0px','Wallet','44 tabs')}
                      
                  </div>

                  <div className="col" style={{height: '100%', width:'100%', padding:'5px 0px 0px 1px'}} onClick={() => this.when_bottom_navbar_button_clicked('s')}>
                    {this.render_navbar_button('s','0px 0px 0px 0px', StackIconImg, 'auto', '30px','3px 0px 0px 0px','Stack','44 tabs')}
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
                <div style={{ height: 40,  width: width}}>
                    {this.render_tag_bar_group(this.get_tag_group_option(),'l')}
                </div>
                
                <button style={{'text-decoration': 'none', 'border': 'none','background-color': 'transparent' ,'float': 'right', width: 70,'padding': '0px 0px 12px 0px', opacity:1}}>
                    {this.render_e_plus_button()}
                </button>
            </div>
        );
    }

    /* called when the eplus letter is clicked on the main page */
    when_e_plus_letter_clicked(){
      var button_target = this.get_e_plus_button_mapping();
      if(button_target != ''){
        this.open_new_object_bottomsheet();
      }
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
      var active_page_tag_item = this.get_tag_group_option()['i'].active;
      var data = {'contracts':'6','jobs':'7','contractors':'8','storefronts':'9','E5tokens':'11','subscriptions':'12','posts':'13','channels':'14',};

      if(data[active_page_tag_item] == null) return ''
      return data[active_page_tag_item];
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







    render_tag_bar_group(option, size){
        return(
            <div>
                <Tags page_tags_object={option} tag_size={size} when_tags_updated={this.when_tags_updated.bind(this)} theme={this.props.theme}/>
            </div>
        )
    }

    when_tags_updated(tag_group){
        if(this.state.page == '?'){
            return this.setState({work_page_tags_object: tag_group})
        }
        else if(this.state.page == 'e'){
            return this.setState({explore_page_tags_object: tag_group})
        }
        else{
            return this.setState({wallet_page_tags_object: tag_group})
        }
    }





    



    render_post_list_group(size){
        return(
            <PostListSection size={size} height={this.props.height} width={this.props.width} page={this.state.page} work_page_tags_object={this.state.work_page_tags_object} explore_page_tags_object={this.state.explore_page_tags_object} wallet_page_tags_object={this.state.wallet_page_tags_object} app_state={this.props.app_state} 
            when_ether_object_clicked={this.when_ether_object_clicked.bind(this)} when_spends_object_clicked={this.when_spends_object_clicked.bind(this)} when_ends_object_clicked={this.when_ends_object_clicked.bind(this)}
            open_send_receive_ether_bottomsheet={this.props.open_send_receive_ether_bottomsheet.bind(this)} theme={this.props.theme}/>
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

    render_post_detail_object(size){
        return(
            <PostDetailSection page={this.state.page} screensize={size} work_page_tags_object={this.state.work_page_tags_object} wallet_page_tags_object={this.state.wallet_page_tags_object} explore_page_tags_object={this.state.explore_page_tags_object} 
            selected_ether_item={this.state.selected_ether_item} selected_end_item={this.state.selected_end_item} selected_spend_item={this.state.selected_spend_item} 
            height={this.props.height} width={this.props.width} app_state={this.props.app_state} open_send_receive_ether_bottomsheet={this.props.open_send_receive_ether_bottomsheet.bind(this)} theme={this.props.theme}/>
        )
    }



    

}




export default home_page;