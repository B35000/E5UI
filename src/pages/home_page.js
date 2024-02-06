import React, { Component } from 'react';
import Background from './../assets/background.png'
import JobIconImg from './../assets/job_icon.png';  
import ExploreIconImg from './../assets/explore_icon.png'; 
import WalletIconImg from './../assets/wallet_icon.png'; 
import StackIconImg from './../assets/stack_icon.png';
import Letter from './../assets/letter.png'; 
import EndImg from './../assets/end_token_icon.png';
import SpendImg from './../assets/spend_token_icon.png';

import SwipeableBottomSheet from 'react-swipeable-bottom-sheet';
import Dialog from "@mui/material/Dialog";
import ViewGroups from './../components/view_groups'
import { motion } from "framer-motion"

import Tags from './../components/tags';
import PostDetailSection from '../sections/detail_section';
import PostListSection from './../sections/list_section';
import FilterSection from './filter_section';
import PostPreview from './post_preview_page'

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
        view_post_bottomsheet: false, selected_contractor_item:null, filter_section_bottomsheet:false, post_preview_bottomsheet:false,

        viewed_posts:[],viewed_channels:[],viewed_jobs:[], viewed_contracts:[], viewed_subscriptions:[], viewed_proposals:[],viewed_stores:[], viewed_bags:[], viewed_contractors:[], confirmation_dialog_box: false, contact_to_add:0, 
        
        pinned_bags:[], pinned_channels:[], pinned_item:[], pinned_post:[], pinned_subscriptions:[], pinned_proposal:[], pinned_contractor:[], pinned_contract:[], pinned_job:[], 
        
        page_scroll_data:{}, page_search_data:{}, tags_search_data:{}, detail_page:'?', detail_selected_tag:'', tabs:[]
    };

    constructor(props) {
        super(props);
        this.list_section = React.createRef();
        this.filter_section_page = React.createRef();
        this.post_preview_page = React.createRef();
    }


    set_cookies(){
        if(this.props.app_state.storage_permissions =='enabled'){
            localStorage.setItem("viewed", JSON.stringify(this.get_persistent_data()));
        }else{
            localStorage.setItem("viewed", '');
        }
    }

    componentDidMount() {
        this.set_cupcake_data()
    }

    componentWillUnmount(){
    }

    set_cupcake_data(){
        var cupcake_state = localStorage.getItem("viewed");
        if(cupcake_state != null && cupcake_state != ""){
            cupcake_state = JSON.parse(cupcake_state)
        }

        if(cupcake_state != null && cupcake_state != ""){
            if(cupcake_state.viewed_posts != null){
                this.setState({viewed_posts:cupcake_state.viewed_posts})
            }
            if(cupcake_state.viewed_channels != null){
                this.setState({viewed_channels:cupcake_state.viewed_channels})
            }
            if(cupcake_state.viewed_jobs != null){
                this.setState({viewed_jobs:cupcake_state.viewed_jobs})
            }
            if(cupcake_state.viewed_contracts != null){
                this.setState({viewed_contracts:cupcake_state.viewed_contracts})
            }
            if(cupcake_state.viewed_subscriptions != null){
                this.setState({viewed_subscriptions:cupcake_state.viewed_subscriptions})
            }
            if(cupcake_state.viewed_proposals != null){
                this.setState({viewed_proposals:cupcake_state.viewed_proposals})
            }
            if(cupcake_state.viewed_stores != null){
                this.setState({viewed_stores:cupcake_state.viewed_stores})
            }
            if(cupcake_state.viewed_bags != null){
                this.setState({viewed_bags:cupcake_state.viewed_bags})
            }
            if(cupcake_state.viewed_contractors != null){
                this.setState({viewed_contractors:cupcake_state.viewed_contractors})
            }
            if(cupcake_state.pinned_bags != null){
                this.setState({pinned_bags: cupcake_state.pinned_bags})
            }
            if(cupcake_state.pinned_channels != null){
                this.setState({pinned_channels: cupcake_state.pinned_channels})
            }
            if(cupcake_state.pinned_item != null){
                this.setState({pinned_item: cupcake_state.pinned_item})
            }
            if(cupcake_state.pinned_post != null){
                this.setState({pinned_post: cupcake_state.pinned_post})
            }
            if(cupcake_state.pinned_subscriptions != null){
                this.setState({pinned_subscriptions: cupcake_state.pinned_subscriptions})
            }
            if(cupcake_state.pinned_proposal != null){
                this.setState({pinned_proposal: cupcake_state.pinned_proposal})
            }
            if(cupcake_state.pinned_contractor != null){
                this.setState({pinned_contractor: cupcake_state.pinned_contractor})
            } 
            if(cupcake_state.pinned_contract != null){
                this.setState({pinned_contract: cupcake_state.pinned_contract})
            }
            if(cupcake_state.pinned_job != null){
                this.setState({pinned_job: cupcake_state.pinned_job})
            }
            if(cupcake_state.tabs != null){
                this.setState({tabs: cupcake_state.tabs})
            }
        }
    }

    get_persistent_data(){
        return{
            viewed_posts:this.state.viewed_posts,
            viewed_channels:this.state.viewed_channels,
            viewed_jobs:this.state.viewed_jobs, 
            viewed_contracts:this.state.viewed_contracts, 
            viewed_subscriptions:this.state.viewed_subscriptions, 
            viewed_proposals:this.state.viewed_proposals,
            viewed_stores:this.state.viewed_stores, 
            viewed_bags:this.state.viewed_bags, 
            viewed_contractors:this.state.viewed_contractors,
            pinned_bags: this.state.pinned_bags,
            pinned_channels: this.state.pinned_channels,
            pinned_item: this.state.pinned_item,
            pinned_post: this.state.pinned_post,
            pinned_subscriptions: this.state.pinned_subscriptions,
            pinned_proposal: this.state.pinned_proposal,
            pinned_contractor: this.state.pinned_contractor,
            pinned_contract: this.state.pinned_contract,
            pinned_job: this.state.pinned_job,
            tabs: this.state.tabs
        }
    }

    /* returns the tag object used for the main page */
    get_main_page_tag_object(page){
      if(page == '?'/* jobs_section */){
        var obj = {
          'i':{
              active:'e', 
          },
          'e':[
              ['or','',0], ['e','e.'+this.props.app_state.loc['1196']/* 'e.jobs' */,'e.'+this.props.app_state.loc['1197']/* 'e.contracts' */,'e.'+this.props.app_state.loc['1198']/* 'e.contractors' */, 'e.'+this.props.app_state.loc['1199']/* 'e.proposals' */,'e.'+this.props.app_state.loc['1200']/* 'e.subscriptions' */, 'e.'+this.props.app_state.loc['1201']/* 'e.mail' */], [0]
          ],
          'jobs':[
              ['xor','e',1], [this.props.app_state.loc['1196']/* 'jobs' */,this.props.app_state.loc['1202']/* 'all' */,this.props.app_state.loc['1203']/* 'viewed' */,this.props.app_state.loc['1204']/* 'created' */,this.props.app_state.loc['1205']/* 'applied' */, this.props.app_state.loc['1222']/* 'pinned' */], [1],[1]
          ],
          'contracts':[
              ['xor','e',1], [this.props.app_state.loc['1197']/* 'contracts' */,this.props.app_state.loc['1202']/* 'all' */,this.props.app_state.loc['1204']/* 'created' */,this.props.app_state.loc['1203']/* 'viewed' */,this.props.app_state.loc['1206']/* 'entered' */, this.props.app_state.loc['1222']/* 'pinned' */], [1],[1]
          ],
          'contractors':[
              ['xor','e',1], [this.props.app_state.loc['1198']/* 'contractors' */,this.props.app_state.loc['1202']/* 'all' */,this.props.app_state.loc['1203']/* 'viewed' */,this.props.app_state.loc['1204']/* 'created' */,this.props.app_state.loc['1222']/* 'pinned' */], [1],[1]
          ],
          'proposals':[
              ['xor','e',1], [this.props.app_state.loc['1199']/* 'proposals' */,this.props.app_state.loc['1211']/* 'my-proposals' */, this.props.app_state.loc['1203']/* 'viewed' */, this.props.app_state.loc['1204']/* 'created' */, this.props.app_state.loc['1222']/* 'pinned' */], [1],[1]
          ],
          'subscriptions':[
              ['xor','e',1], [this.props.app_state.loc['1200']/* 'subscriptions' */,this.props.app_state.loc['1202']/* 'all' */,this.props.app_state.loc['1207']/* 'paid' */,this.props.app_state.loc['1203']/* 'viewed' */,this.props.app_state.loc['1204']/* 'created' */, this.props.app_state.loc['1222']/* 'pinned' */], [1],[1]
          ],
          'mail':[
              ['xor','e',1], [this.props.app_state.loc['1201']/* 'mail' */,this.props.app_state.loc['1208']/* 'received' */,this.props.app_state.loc['1209']/* 'sent' */, this.props.app_state.loc['1210']/* 'active' */], [1],[1]
          ]
        };

        obj[this.props.app_state.loc['1196']/* 'jobs' */] = [
              ['xor','e',1], [this.props.app_state.loc['1196']/* 'jobs' */,this.props.app_state.loc['1202']/* 'all' */,this.props.app_state.loc['1203']/* 'viewed' */,this.props.app_state.loc['1204']/* 'created' */,this.props.app_state.loc['1205']/* 'applied' */, this.props.app_state.loc['1222']/* 'pinned' */], [1],[1]
          ];

        obj[this.props.app_state.loc['1197']/* 'contracts' */] = [
              ['xor','e',1], [this.props.app_state.loc['1197']/* 'contracts' */,this.props.app_state.loc['1202']/* 'all' */,this.props.app_state.loc['1204']/* 'created' */,this.props.app_state.loc['1203']/* 'viewed' */,this.props.app_state.loc['1206']/* 'entered' */, this.props.app_state.loc['1222']/* 'pinned' */], [1],[1]
          ]
        obj[this.props.app_state.loc['1198']/* 'contractors' */] = [
              ['xor','e',1], [this.props.app_state.loc['1198']/* 'contractors' */,this.props.app_state.loc['1202']/* 'all' */,this.props.app_state.loc['1203']/* 'viewed' */,this.props.app_state.loc['1204']/* 'created' */,this.props.app_state.loc['1222']/* 'pinned' */], [1],[1]
          ]
        obj[this.props.app_state.loc['1199']/* 'proposals' */] = [
              ['xor','e',1], [this.props.app_state.loc['1199']/* 'proposals' */,this.props.app_state.loc['1211']/* 'my-proposals' */, this.props.app_state.loc['1203']/* 'viewed' */, this.props.app_state.loc['1204']/* 'created' */, this.props.app_state.loc['1222']/* 'pinned' */], [1],[1]
          ]
        obj[this.props.app_state.loc['1200']/* 'subscriptions' */] = [
              ['xor','e',1], [this.props.app_state.loc['1200']/* 'subscriptions' */,this.props.app_state.loc['1202']/* 'all' */,this.props.app_state.loc['1207']/* 'paid' */,this.props.app_state.loc['1203']/* 'viewed' */,this.props.app_state.loc['1204']/* 'created' */, this.props.app_state.loc['1222']/* 'pinned' */], [1],[1]
          ]
        obj[this.props.app_state.loc['1201']/* 'mail' */] = [
              ['xor','e',1], [this.props.app_state.loc['1201']/* 'mail' */,this.props.app_state.loc['1208']/* 'received' */,this.props.app_state.loc['1209']/* 'sent' */, this.props.app_state.loc['1210']/* 'active' */], [1],[1]
          ]

        return obj;
      }
      else if(page == 'e'/* content_section */){
        var obj = {
          'i':{
              active:'e', 
          },
          'e':[
              ['or','',0], ['e','e.'+this.props.app_state.loc['1212']/* 'e.E5s' */,'e.'+this.props.app_state.loc['1213']/* 'e.posts' */,'e.'+this.props.app_state.loc['1214']/* 'e.channels' */, 'e.'+this.props.app_state.loc['1215']/* 'e.storefront' */, 'e.'+this.props.app_state.loc['1216']/* 'e.bags' */], [0]
          ],
          'E5s':[
              ['xor','',0], [this.props.app_state.loc['1212']/* 'E5s' */,this.props.app_state.loc['1220']/* 'info ℹ️' */,this.props.app_state.loc['1221']/* 'blockexplorer 🗺️' */], [1],[1]
          ],
          'posts':[
              ['xor','',0], [this.props.app_state.loc['1213']/* 'posts' */,this.props.app_state.loc['1202']/* 'all' */,this.props.app_state.loc['1203']/* 'viewed' */,this.props.app_state.loc['1204']/* 'created' */,this.props.app_state.loc['1222']/* 'pinned' */], [1],[1]
          ],
          'channels':[
              ['xor','',0], [this.props.app_state.loc['1214']/* 'channels' */,this.props.app_state.loc['1202']/* 'all' */,this.props.app_state.loc['1203']/* 'viewed' */,this.props.app_state.loc['1204']/* 'created' */, this.props.app_state.loc['1222']/* 'pinned' */], [1],[1]
          ],
          'storefront':[
              ['xor','',0], [this.props.app_state.loc['1215']/* 'storefront' */,this.props.app_state.loc['1202']/* 'all' */, this.props.app_state.loc['1203']/* 'viewed' */,this.props.app_state.loc['1204']/* 'created' */, this.props.app_state.loc['1222']/* 'pinned' */], [1],[1]
          ],
          'bags':[
              ['xor','e',1], [this.props.app_state.loc['1216']/* 'bags' */,this.props.app_state.loc['1202']/* 'all' */, this.props.app_state.loc['1203']/* 'viewed' */,this.props.app_state.loc['1204']/* 'created' */, this.props.app_state.loc['1222']/* 'pinned' */], [1],[1]
          ],  
        }

        obj[this.props.app_state.loc['1212']/* 'E5s' */] = [
              ['xor','',0], [this.props.app_state.loc['1212']/* 'E5s' */,this.props.app_state.loc['1220']/* 'info ℹ️' */,this.props.app_state.loc['1221']/* 'blockexplorer 🗺️' */], [1],[1]
          ]
        obj[this.props.app_state.loc['1213']/* 'posts' */] = [
              ['xor','',0], [this.props.app_state.loc['1213']/* 'posts' */,this.props.app_state.loc['1202']/* 'all' */,this.props.app_state.loc['1203']/* 'viewed' */,this.props.app_state.loc['1204']/* 'created' */,this.props.app_state.loc['1222']/* 'pinned' */], [1],[1]
          ]
        obj[this.props.app_state.loc['1214']/* 'channels' */] = [
              ['xor','',0], [this.props.app_state.loc['1214']/* 'channels' */,this.props.app_state.loc['1202']/* 'all' */,this.props.app_state.loc['1203']/* 'viewed' */,this.props.app_state.loc['1204']/* 'created' */, this.props.app_state.loc['1222']/* 'pinned' */], [1],[1]
          ]
        obj[this.props.app_state.loc['1215']/* 'storefront' */] = [
              ['xor','',0], [this.props.app_state.loc['1215']/* 'storefront' */,this.props.app_state.loc['1202']/* 'all' */, this.props.app_state.loc['1203']/* 'viewed' */,this.props.app_state.loc['1204']/* 'created' */, this.props.app_state.loc['1222']/* 'pinned' */], [1],[1]
          ]
        obj[this.props.app_state.loc['1216']/* 'bags' */] = [
              ['xor','e',1], [this.props.app_state.loc['1216']/* 'bags' */,this.props.app_state.loc['1202']/* 'all' */, this.props.app_state.loc['1203']/* 'viewed' */,this.props.app_state.loc['1204']/* 'created' */, this.props.app_state.loc['1222']/* 'pinned' */], [1],[1]
          ]

        return obj
      }
      else{/* wallet_section */
        return{
          'i':{
              active:'e', 
          },
          'e':[
              ['xor','',0], ['e',this.props.app_state.loc['1217']/* 'ethers ⚗️' */, this.props.app_state.loc['1218']/* 'ends ☝️' */, this.props.app_state.loc['1219']/* 'spends 🫰' */],[1]
          ],
        }
      }
      
    }

    

    render(){
        var size = this.props.screensize;
        var top_bar = 50;
        var middle = this.props.height-126;
        var bottom_bar = 75;
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
                    {this.render_filter_section_bottomsheet()}
                    {this.render_post_preview_bottomsheet()}
                </div>
            );
        }
        else if(size == 's'){
            return ( 
                <div style={{height: this.props.height, width:'100%','background-color':background_color, backgroundImage: `url(${Background})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', 'overflow-y':'hidden'}}>
                    <div style={{height:top_bar, width:width, 'padding':'9px 0px 0px 0px'}}>
                        {this.render_top_tag_bar(size)}
                    </div>
                    
                    <div style={{height:this.props.height-129, width:width, 'padding':'0px 5px 0px 5px'}}  >
                        {this.render_post_list_group(size)}
                    </div>
                    
                    <div style={{height:5}}/>
                    <div style={{height:bottom_bar, width:width, 'background-color': navbar_color,'display':'flex', 'align-items': 'center', 'border-radius': '0px 0px 0px 0px', 'padding':'0px 0px 0px 15px'}}>
                        {this.render_navbar_button_group(size)}
                    </div>

                    {this.render_view_object_bottomsheet()}
                    {this.render_filter_section_bottomsheet()}
                    {this.render_post_preview_bottomsheet()}
                    {this.render_dialog_ui()}
                </div>
            );
        }
        else{
            return(
                <div style={{height: this.props.height, width:'100%','display': 'flex', 'align-items':'center','justify-content':'center', 'background-color':background_color}}>
                    <img src={Letter} style={{height:'auto',width:'18%'}} />
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
        // if(this.state.view_post_bottomsheet2 != true) return;
        var background_color = this.props.theme['send_receive_ether_background_color'];
        var overlay_background = this.props.theme['send_receive_ether_overlay_background'];
        var overlay_shadow_color = this.props.theme['send_receive_ether_overlay_shadow'];
        var size = this.props.screensize;
        return(
        <SwipeableBottomSheet  overflowHeight={0} marginTop={0} onChange={this.open_view_object_bottomsheet.bind(this)} open={this.state.view_post_bottomsheet} style={{'z-index':'5'}} bodyStyle={{'background-color': 'transparent', 'margin':'0px -11px 0px 0px'}} overlayStyle={{'background-color': overlay_background}}>
            <div style={{ height: this.props.height+10, 'background-color':background_color, 'border-style': 'solid', 'border-color': overlay_shadow_color, 'border-radius': '0px 0px 0px 0px','margin': '0px 5px 0px 0px', 'padding':'0px 0px 0px 0px', }}>
                {this.render_post_detail_object(size)}
            </div>
        </SwipeableBottomSheet>
        )
    }

    open_view_object_bottomsheet(){
        if(this.state.view_post_bottomsheet == true){
            //closing
            this.setState({view_post_bottomsheet: !this.state.view_post_bottomsheet});
            var me = this;
            setTimeout(function() {
                me.setState({view_post_bottomsheet2: false});
            }, (1 * 1000));
        }else{
            //opening
            this.setState({view_post_bottomsheet2: true});
            var me = this;
            setTimeout(function() {
                if(me.state != null){
                me.setState({view_post_bottomsheet: !me.state.view_post_bottomsheet});
                }
            }, (1 * 200));
        }
    }


    render_navbar_button_group(size){
        //#545454 - highlight color

        if(size == 'm'){
          return ( 
              <div className="row" style={{'padding':'0px 0px 0px 10px', height:'100%', width:'100%'}}>
                  <div className="col" style={{'background-color': this.get_navbar_normal_or_highlighted_button_background('?'),'padding':'5px 0px 0px 30px', 'border-radius': '0px 0px 0px 0px'}} onClick={()=> this.when_bottom_navbar_button_clicked('?')}>
                      {this.render_navbar_button('l','1px 0px 0px 12px', JobIconImg, 'auto', '70px','3px 12px 3px 19px','????',this.props.app_state.loc['1223']/* 'Work Contracts' */)}
                  </div>

                  <div className="col" style={{'padding':'5px 0px 0px 30px','background-color': this.get_navbar_normal_or_highlighted_button_background('e')}} onClick={() => this.when_bottom_navbar_button_clicked('e')}>
                    {this.render_navbar_button('l','2px 0px 0px 3px', ExploreIconImg, 'auto', '60px','5px 11px 0px 20px',this.props.app_state.loc['1224']/* 'Explore' */,this.props.app_state.loc['1225']/* 'Deployed E5s' */)}
                  </div>

                  <div className="col" style={{'padding':'5px 0px 0px 30px', 'background-color': this.get_navbar_normal_or_highlighted_button_background('w')}} onClick={() => this.when_bottom_navbar_button_clicked('w')}>
                    {this.render_navbar_button('l','2px 0px 0px 15px', WalletIconImg, 'auto', '70px','5px 10px 6px 17px',this.props.app_state.loc['1226']/* 'Wallet' */,this.props.app_state.loc['1227']/* 'Coin & Tokens' */)}
                  </div>
                  
                  <div className="col" style={{'padding':'5px 0px 0px 30px'}} onClick={() => this.when_bottom_navbar_button_clicked('s')}>
                    {this.render_navbar_button('l','2px 0px 0px 5px', StackIconImg, 'auto', '59px','3px 11px 2px 12px',this.props.app_state.loc['1228']/* 'Stack' */,this.props.app_state.loc['1229']/* 'Runs on e' */)}
                  </div>
              </div>
          );
        }
        else if(size == 's'){
          return(
            <div className="row" style={{'padding':'0px 0px 0px 0px','display':'flex', 'align-items': 'center', height:'100%', width:'103%'}}>
                  <div className="col" style={{height: '100%', width:'100%', padding:'0px 0px 0px 0px', 'background-color': this.get_navbar_normal_or_highlighted_button_background('?'),'border-radius': '1px 0px 0px 0px'}} onClick={() => this.when_bottom_navbar_button_clicked('?')}>
                      {this.render_navbar_button('s','0px 0px 0px 0px', JobIconImg, 'auto', '38px','5px 0px 0px 0px','????',this.props.app_state.loc['1223']/* 'Work Contracts' */)}
                  </div>

                  <div className="col" style={{height: '100%', width:'100%', padding:'0px 0px 0px 1px', 'background-color': this.get_navbar_normal_or_highlighted_button_background('e')}} onClick={() => this.when_bottom_navbar_button_clicked('e')}>
                      {this.render_navbar_button('s','0px 0px 0px 0px', ExploreIconImg, 'auto', '30px','5px 0px 0px 0px',this.props.app_state.loc['1224']/* 'Explore' */,this.props.app_state.loc['1225']/* 'Deployed E5s' */)}
                  </div>

                  <div className="col" style={{height: '100%', width:'100%', padding:'0px 0px 0px 1px', 'background-color': this.get_navbar_normal_or_highlighted_button_background('w')}} onClick={() => this.when_bottom_navbar_button_clicked('w')}>
                    {this.render_navbar_button('s','0px 0px 0px 0px', WalletIconImg, 'auto', '42px','6px 0px 0px 0px',this.props.app_state.loc['1226']/* 'Wallet' */,this.props.app_state.loc['1227']/* 'Coin & Tokens' */)}
                      
                  </div>

                  <div className="col" style={{height: '100%', width:'100%', padding:'5px 0px 0px 1px'}} onClick={() => this.when_bottom_navbar_button_clicked('s')}>
                    {this.render_navbar_button('s','0px 0px 0px 0px', StackIconImg, 'auto', '31px','4px 0px 0px 0px',this.props.app_state.loc['1228']/* 'Stack' */,this.props.app_state.loc['1229']/* 'Runs on e' */)}
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
            var me = this;
            setTimeout(function() {
                me.update_scroll_position()
            }, (1 * 10));
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
                
                <button style={{'text-decoration': 'none', 'border': 'none','background-color': 'transparent' ,'float': 'right', width: 70,'padding': '2px 0px 12px 0px', opacity:1}}>
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
        <img onClick={()=> this.when_e_button_tapped()} src={this.props.theme['add_icon']} style={{height:36, width:'auto', opacity:alpha}} />
      )
    }

    /* gets the tag object id for creating new objects associated with the tag option active in the top bar */
    get_e_plus_button_mapping(){
      if(this.state.page == '?'){
        var selected_item = this.state.work_page_tags_object['i'].active
        var data = {'jobs':'0','contracts':'1','subscriptions':'3','contractors':'9', 'mail':'5'};
        data[this.props.app_state.loc['1196']/* jobs */] = '0'
        data[this.props.app_state.loc['1197']/* contracts */] = '1'
        data[this.props.app_state.loc['1200']/* subscriptions */] = '3'
        data[this.props.app_state.loc['1198']/* contractors */] = '9'
        data[this.props.app_state.loc['1201']/* mail */] = '5'
        if(data[selected_item] == null) return ''
        return data[selected_item];
      }
      else if(this.state.page == 'e'){
        var selected_item = this.state.explore_page_tags_object['i'].active
        var data = {'storefront':'4','posts':'6','channels':'7'};
        data[this.props.app_state.loc['1215']/* storefront */] = '4'
        data[this.props.app_state.loc['1213']/* posts */] = '6'
        data[this.props.app_state.loc['1214']/* channels */] = '7'
        if(data[selected_item] == null) return ''
        return data[selected_item];
      }
      else{
        var selected_item = this.get_selected_item(this.state.wallet_page_tags_object, this.state.wallet_page_tags_object['i'].active)
        var data = {'ends ☝️':'8','spends 🫰':'8'};
        data[this.props.app_state.loc['1218']/* ends ☝️ */] = '8'
        data[this.props.app_state.loc['1219']/* spends 🫰 */] = '8'
        if(data[selected_item] == null) return ''
        return data[selected_item];
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

    when_e_button_tapped = () => {
        let me = this;
        if(Date.now() - this.last_all_click_time < 200){
            //double tap
            me.open_search_filter_section()
            clearTimeout(this.all_timeout);
        }else{
            this.all_timeout = setTimeout(function() {
                clearTimeout(this.all_timeout);
                // single tap
                me.when_e_plus_letter_clicked()
            }, 200);
        }
        this.last_all_click_time = Date.now();
    }







    open_search_filter_section(){
        this.open_filter_section_bottomsheet()
        if(this.filter_section_page.current != null){
            var id = this.get_page_id()
            
            var typed_searched_word = this.state.page_search_data[id]
            if(typed_searched_word == null) typed_searched_word = ''
            
            var added_tags = this.state.tags_search_data[id]
            if(added_tags == null) added_tags = []
            
            this.filter_section_page.current?.set_data(typed_searched_word, added_tags)
        }
    }

    render_filter_section_bottomsheet(){
        if(this.state.filter_section_bottomsheet2 != true) return;
        var background_color = this.props.theme['send_receive_ether_background_color'];
        var size = this.props.size
        return(
        <SwipeableBottomSheet  overflowHeight={0} marginTop={0} onChange={this.open_filter_section_bottomsheet.bind(this)} open={this.state.filter_section_bottomsheet} style={{'z-index':'5'}} bodyStyle={{'background-color': 'transparent'}} overlayStyle={{'background-color': this.props.theme['send_receive_ether_overlay_background'],'box-shadow': '0px 0px 0px 0px '+this.props.theme['send_receive_ether_overlay_shadow']}}>
            <div style={{ height: 400, 'background-color': background_color, 'border-style': 'solid', 'border-color': this.props.theme['send_receive_ether_overlay_background'], 'border-radius': '1px 1px 0px 0px', 'border-width': '0px', 'box-shadow': '0px 0px 2px 1px '+this.props.theme['send_receive_ether_overlay_shadow'],'margin': '0px 0px 0px 0px', 'overflow-y':'auto'}}>  
                <FilterSection ref={this.filter_section_page} app_state={this.props.app_state} size={size} height={this.props.height} theme={this.props.theme} notify={this.props.notify.bind(this)} when_search_button_tapped={this.when_search_button_tapped.bind(this)} when_add_tags_button_tapped={this.when_add_tags_button_tapped.bind(this)} reset_scroll_height={this.reset_scroll_height.bind(this)}/>
            </div>
        </SwipeableBottomSheet>
        )
    }

    open_filter_section_bottomsheet(){
        if(this.state.filter_section_bottomsheet == true){
            //closing
            this.setState({filter_section_bottomsheet: !this.state.filter_section_bottomsheet});
            var me = this;
            setTimeout(function() {
                me.setState({filter_section_bottomsheet2: false});
            }, (1 * 1000));
        }else{
            //opening
            this.setState({filter_section_bottomsheet2: true});
            var me = this;
            setTimeout(function() {
                if(me.state != null){
                me.setState({filter_section_bottomsheet: !me.state.filter_section_bottomsheet});
                }
            }, (1 * 200));
        }
    }

    when_search_button_tapped(entered_text){
        var id = this.get_page_id()
        var clone = structuredClone(this.state.page_search_data)
        clone[id] = entered_text;
        this.setState({page_search_data: clone})
        var me = this;
        setTimeout(function() {    
            me.reset_scroll_height()
        }, (1 * 100));
    }

    when_add_tags_button_tapped(tag_obj){
        var id = this.get_page_id()
        var clone = structuredClone(this.state.tags_search_data)
        clone[id] = tag_obj
        this.setState({tags_search_data: clone})
        var me = this;
        setTimeout(function() {    
            me.reset_scroll_height()
        }, (1 * 100));
    }

    get_page_id(){
        var id = ''
        if(this.state.page == '?'){
            var selected_item = this.get_selected_item(this.state.work_page_tags_object, this.state.work_page_tags_object['i'].active)
            id = this.state.work_page_tags_object['i'].active + selected_item
        }
        else if(this.state.page == 'e'){
            var selected_item = this.get_selected_item(this.state.explore_page_tags_object, this.state.explore_page_tags_object['i'].active)
            id = this.state.explore_page_tags_object['i'].active + selected_item
        }
        else{
            //wallet
            var selected_item = this.get_selected_item(this.state.wallet_page_tags_object, this.state.wallet_page_tags_object['i'].active)
            id = selected_item
        }

        return id
    }

    reset_scroll_height(){
        var id = this.get_page_id()
        var typed_searched_word = this.state.page_search_data[id]
        if(typed_searched_word == null) typed_searched_word = ''
        
        var added_tags = this.state.tags_search_data[id]
        if(added_tags == null) added_tags = []

        if(typed_searched_word == '' && added_tags.length == 0){
            var me = this;
            setTimeout(function() {
                me.update_scroll_position()
            }, (1 * 10));
        }
    }





    render_post_preview_bottomsheet(){
        if(this.state.post_preview_bottomsheet2 != true) return;
        var background_color = this.props.theme['send_receive_ether_background_color'];
        var size = this.props.size
        return(
        <SwipeableBottomSheet  overflowHeight={0} marginTop={0} onChange={this.open_post_preview_bottomsheet.bind(this)} open={this.state.post_preview_bottomsheet} style={{'z-index':'5'}} bodyStyle={{'background-color': 'transparent'}} overlayStyle={{'background-color': this.props.theme['send_receive_ether_overlay_background'],'box-shadow': '0px 0px 0px 0px '+this.props.theme['send_receive_ether_overlay_shadow']}}>
            <div style={{ height: this.props.height-60, 'background-color': background_color, 'border-style': 'solid', 'border-color': this.props.theme['send_receive_ether_overlay_background'], 'border-radius': '1px 1px 0px 0px', 'border-width': '0px', 'box-shadow': '0px 0px 2px 1px '+this.props.theme['send_receive_ether_overlay_shadow'],'margin': '0px 0px 0px 0px', 'overflow-y':'auto'}}>
                <PostPreview ref={this.post_preview_page} app_state={this.props.app_state} size={size} height={this.props.height} theme={this.props.theme} notify={this.props.notify.bind(this)} when_post_preview_subscription_tapped={this.when_post_preview_subscription_tapped.bind(this)} pin_post={this.pin_post.bind(this)}/>
            </div>
        </SwipeableBottomSheet>
        )
    }

    open_post_preview_bottomsheet(){
        if(this.state.post_preview_bottomsheet == true){
            //closing
            this.setState({post_preview_bottomsheet: !this.state.post_preview_bottomsheet});
            var me = this;
            setTimeout(function() {
                me.setState({post_preview_bottomsheet2: false});
            }, (1 * 1000));
        }else{
            //opening
            this.setState({post_preview_bottomsheet2: true});
            var me = this;
            setTimeout(function() {
                if(me.state != null){
                me.setState({post_preview_bottomsheet: !me.state.post_preview_bottomsheet});
                }
            }, (1 * 200));
        }
    }

    open_post_preview_section(post){
        this.open_post_preview_bottomsheet()

        var me = this;
        setTimeout(function() {
            if(me.post_preview_page.current != null){
                me.post_preview_page.current?.set_post(post) 
            }
        }, (1 * 500));
        
        
    }


    when_post_preview_subscription_tapped(subscription){
        this.props.show_pay_subscription_bottomsheet(subscription)
    }








    render_tag_bar_group(option, size){
        return(
            <div>
                <Tags page_tags_object={option} tag_size={size} when_tags_updated={this.when_tags_updated.bind(this)} theme={this.props.theme} app_state={this.props.app_state}/>
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
            //wallet
            this.setState({wallet_page_tags_object: tag_group})
        }

        this.setState({ selected_job_post_item:null, selected_contract_item:null, selected_subscription_item:null, selected_post_item:null, selected_channel_item:null, selected_proposal_item:null, selected_storefront_item:null, selected_bag_item:null, selected_contractor_item: null})

        var me = this;
        setTimeout(function() {
            me.update_scroll_position()
        }, (1 * 10));
    }

    
    set_page_scroll(pos){
        if(this.page_scroll_data == null) this.page_scroll_data = {}

        if(this.state.page == '?'){
            var selected_item = this.get_selected_item(this.state.work_page_tags_object, this.state.work_page_tags_object['i'].active)
            var id = this.state.work_page_tags_object['i'].active + selected_item
            if(pos == 0){
                if(this.page_scroll_data[id] != null && this.page_scroll_data[id] <= 65){
                    this.page_scroll_data[id] = pos
                }
            }else{
                this.page_scroll_data[id] = pos
            }
        }
        else if(this.state.page == 'e'){
            var selected_item = this.get_selected_item(this.state.explore_page_tags_object, this.state.explore_page_tags_object['i'].active)
            var id = this.state.explore_page_tags_object['i'].active + selected_item
            if(pos == 0){
                if(this.page_scroll_data[id] != null && this.page_scroll_data[id] <= 65){
                    this.page_scroll_data[id] = pos
                }
            }else{
                this.page_scroll_data[id] = pos
            }
        }
        else{
            //wallet
            var selected_item = this.get_selected_item(this.state.wallet_page_tags_object, this.state.wallet_page_tags_object['i'].active)
            var id = selected_item
            if(pos == 0){
                if(this.page_scroll_data[id] != null && this.page_scroll_data[id] <= 65){
                    this.page_scroll_data[id] = pos
                }
            }else{
                this.page_scroll_data[id] = pos
            }
        }
    }

    update_scroll_position(){
        if(this.page_scroll_data == null) this.page_scroll_data = {}

        if(this.state.page == '?'){
            var selected_item = this.get_selected_item(this.state.work_page_tags_object, this.state.work_page_tags_object['i'].active)
            var id = this.state.work_page_tags_object['i'].active + selected_item

            var scroll_pos = this.page_scroll_data[id]
            if(scroll_pos == null) scroll_pos = 0;
           
            var selected_tag = this.state.work_page_tags_object['i'].active
            if(selected_tag == 'e' || selected_tag == this.props.app_state.loc['1196']/* 'jobs' */){
                if(this.list_section.current != null){
                    this.list_section.current?.set_jobs_list(scroll_pos)
                }
            } 
            else if(selected_tag == this.props.app_state.loc['1197']/* 'contracts' */){
                if(this.list_section.current != null){
                    this.list_section.current?.set_contract_list(scroll_pos)
                }
            }
            else if(selected_tag == this.props.app_state.loc['1199']/* 'proposals' */ ){
                if(this.list_section.current != null){
                    this.list_section.current?.set_proposal_list(scroll_pos)
                }
            }
            else if(selected_tag == this.props.app_state.loc['1200']/* 'subscriptions' */ ){
                if(this.list_section.current != null){
                    this.list_section.current?.set_subscription_list(scroll_pos)
                }
            }
            else if(selected_tag == this.props.app_state.loc['1201']/* 'mail' */){
                if(this.list_section.current != null){
                    this.list_section.current?.set_mail_list(scroll_pos)
                }
            }
            else if(selected_tag == this.props.app_state.loc['1198']/* 'contractors' */){
                if(this.list_section.current != null){
                    this.list_section.current?.set_contractor_list(scroll_pos)
                }
            }
        }
        else if(this.state.page == 'e'){
            var selected_item = this.get_selected_item(this.state.explore_page_tags_object, this.state.explore_page_tags_object['i'].active)
            var id = this.state.explore_page_tags_object['i'].active + selected_item

            var scroll_pos = this.page_scroll_data[id]
            if(scroll_pos == null) scroll_pos = 0;
            
            var selected_tag = this.state.explore_page_tags_object['i'].active
            if(selected_tag == this.props.app_state.loc['1212']/* 'E5s' */ || selected_tag == 'e'){
                var selected_item = this.get_selected_item(this.state.explore_page_tags_object, selected_tag)
                if(selected_item == this.props.app_state.loc['1221']/* 'blockexplorer 🗺️' */){
                    if(this.list_section.current != null){
                        this.list_section.current?.set_searched_account_list(scroll_pos)
                    }
                }else{
                    if(this.list_section.current != null){
                        this.list_section.current?.set_e5_list(scroll_pos)
                    }
                }
            }
            else if(selected_tag == this.props.app_state.loc['1213']/* 'posts' */ ){
               if(this.list_section.current != null){
                    this.list_section.current?.set_post_list(scroll_pos)
                }
            }
            else if(selected_tag == this.props.app_state.loc['1214']/* 'channels' */ ){
                if(this.list_section.current != null){
                    this.list_section.current?.set_channel_list(scroll_pos)
                }
            }
            else if(selected_tag == this.props.app_state.loc['1215']/* 'storefront' */){
                if(this.list_section.current != null){
                    this.list_section.current?.set_storefront_list(scroll_pos)
                }
            }
            else if(selected_tag == this.props.app_state.loc['1216']/* 'bags' */){
                if(this.list_section.current != null){
                    this.list_section.current?.set_bag_list(scroll_pos)
                }
            }
        }
        else{
            //wallet
            var selected_item = this.get_selected_item(this.state.wallet_page_tags_object, this.state.wallet_page_tags_object['i'].active)
            var id = selected_item

            var scroll_pos = this.page_scroll_data[id]
            if(scroll_pos == null) scroll_pos = 0;

            if(selected_item == this.props.app_state.loc['1217']/* 'ethers ⚗️' */ || selected_item == 'e'){
                if(this.list_section.current != null){
                    this.list_section.current?.set_ether_list(scroll_pos)
                }
            }
            else if(selected_item == this.props.app_state.loc['1218']/* 'ends ☝️' */ ){
                if(this.list_section.current != null){
                    this.list_section.current?.set_end_list(scroll_pos)
                }
            }
            else if(selected_item == this.props.app_state.loc['1219']/* 'spends 🫰' */ ){
                if(this.list_section.current != null){
                    this.list_section.current?.set_spend_list(scroll_pos)
                }
            }
        }
    }

    get_tags_object(page){
        if(page == '?'){
            return this.state.work_page_tags_object;
        }
        else if(page == 'e'){
            return this.state.explore_page_tags_object;
        }
        else{
            //wallet
            return this.state.wallet_page_tags_object;
        }
    }






    get_e5_data(){
        var data = []
        var contract_id_data = this.props.app_state.e5s['data']
        for (let i = 0; i < contract_id_data.length; i++) {
            if(this.props.app_state.created_contract_mapping[contract_id_data[i]] != null && this.props.app_state.addresses[contract_id_data[i]] != null){
                data.push({'data':this.props.app_state.created_contract_mapping[contract_id_data[i]][2]['data'], 'id':contract_id_data[i]})
            }
        }
        return data
    }

    get_contract_items(){
        var selected_option_name = this.get_selected_item(this.state.work_page_tags_object, this.state.work_page_tags_object['i'].active)

        if(this.state.work_page_tags_object['i'].active != this.props.app_state.loc['1197']/* 'contracts' */){
            return this.sort_feed_based_on_my_section_tags(this.filter_using_searched_text(this.filter_for_blocked_accounts(this.get_all_sorted_objects(this.props.app_state.created_contracts))))
        }

        if(selected_option_name == this.props.app_state.loc['1202']/* 'all' */){
            return this.sort_feed_based_on_my_section_tags(this.filter_using_searched_text(this.filter_for_blocked_accounts(this.get_all_sorted_objects(this.props.app_state.created_contracts))))
        }
        else if(selected_option_name == this.props.app_state.loc['1203']/* 'viewed' */){
            var my_viewed_contracts = []
            var all_contracts = this.get_all_sorted_objects(this.props.app_state.created_contracts)
            for(var i=0; i<this.state.viewed_contracts.length; i++){
                var obj = this.get_item_in_array(this.state.viewed_contracts[i], all_contracts)
                if(obj != null) my_viewed_contracts.push(obj)
            }
            return this.sort_feed_based_on_my_section_tags(this.filter_using_searched_text(this.filter_for_blocked_accounts(my_viewed_contracts)))
        }
        else if(selected_option_name == this.props.app_state.loc['1222']/* 'pinned' */){
            var my_viewed_contracts = []
            var all_contracts = this.get_all_sorted_objects(this.props.app_state.created_contracts)
            for(var i=0; i<this.state.pinned_contract.length; i++){
                var obj = this.get_item_in_array(this.state.pinned_contract[i], all_contracts)
                if(obj != null) my_viewed_contracts.push(obj)
            }
            return this.sort_feed_based_on_my_section_tags(this.filter_using_searched_text(this.filter_for_blocked_accounts(my_viewed_contracts)))
        }
        else if(selected_option_name == this.props.app_state.loc['1206']/* 'entered' */){
            var my_entered_contracts = []
            var all_contracts = this.get_all_sorted_objects(this.props.app_state.created_contracts)

            for(var i=0; i<all_contracts.length; i++){
                var object = all_contracts[i]
                var expiry_time_in_seconds = object['entry_expiry']
                if(expiry_time_in_seconds != 0){
                    my_entered_contracts.push(object)
                }
            }
            return this.sort_feed_based_on_my_section_tags(this.filter_using_searched_text(this.filter_for_blocked_accounts(my_entered_contracts)))
        }
        else {
            var my_contracts = []
            var all_contracts = this.get_all_sorted_objects(this.props.app_state.created_contracts)
            
            for(var i = 0; i < all_contracts.length; i++){
                var post_author = all_contracts[i]['event'] == null ? 0 : all_contracts[i]['event'].returnValues.p3
                var myid = this.props.app_state.user_account_id[all_contracts[i]['e5']]
                if(myid == null) myid = 1
                if(post_author.toString() == myid.toString()){
                    my_contracts.push(all_contracts[i])
                }
            }
            return this.sort_feed_based_on_my_section_tags(this.filter_using_searched_text(this.filter_for_blocked_accounts(my_contracts)))
        }
    }

    get_bag_items(){
        var selected_option_name = this.get_selected_item(this.state.explore_page_tags_object, this.state.explore_page_tags_object['i'].active)

        if(this.state.explore_page_tags_object['i'].active != this.props.app_state.loc['1216']/* 'bags' */){
            return this.filter_by_content_channeling(this.filter_using_searched_text(this.filter_for_blocked_accounts(this.get_all_sorted_objects(this.props.app_state.created_bags))))
        }

        if(selected_option_name == this.props.app_state.loc['1202']/* 'all' */){
            return this.filter_by_content_channeling(this.filter_using_searched_text(this.filter_for_blocked_accounts(this.get_all_sorted_objects(this.props.app_state.created_bags))))
        }
        else if(selected_option_name == this.props.app_state.loc['1203']/* 'viewed' */){
            var my_viewed_bags = []
            var all_bags = this.get_all_sorted_objects(this.props.app_state.created_bags)
            for(var i=0; i<this.state.viewed_bags.length; i++){
                var obj = this.get_item_in_array(this.state.viewed_bags[i], all_bags)
                if(obj != null) my_viewed_bags.push(obj)
            }
            return this.filter_by_content_channeling(this.filter_using_searched_text(this.filter_for_blocked_accounts(my_viewed_bags)))
        }
        else if(selected_option_name == this.props.app_state.loc['1222']/* 'pinned' */){
            var my_viewed_bags = []
            var all_bags = this.get_all_sorted_objects(this.props.app_state.created_bags)
            for(var i=0; i<this.state.pinned_bags.length; i++){
                var obj = this.get_item_in_array(this.state.pinned_bags[i], all_bags)
                if(obj != null) my_viewed_bags.push(obj)
            }
            return this.filter_by_content_channeling(this.filter_using_searched_text(this.filter_for_blocked_accounts(my_viewed_bags)))
        }
        else {
            var my_bags = []
            var all_bags = this.get_all_sorted_objects(this.props.app_state.created_bags)
            
            for(var i = 0; i < all_bags.length; i++){
                var post_author = all_bags[i]['event'].returnValues.p3
                var myid = this.props.app_state.user_account_id[all_bags[i]['e5']]
                if(myid == null) myid = 1
                if(post_author.toString() == myid.toString()){
                    my_bags.push(all_bags[i])
                }
            }
            return this.filter_by_content_channeling(this.filter_using_searched_text(this.filter_for_blocked_accounts(my_bags)))
        }
    }

    get_channel_items(){
        var selected_option_name = this.get_selected_item(this.state.explore_page_tags_object, this.state.explore_page_tags_object['i'].active)

        if(this.state.explore_page_tags_object['i'].active != this.props.app_state.loc['1214']/* 'channels' */){
            return this.sort_feed_based_on_my_section_tags(this.filter_by_content_channeling(this.filter_using_searched_text(this.filter_for_blocked_accounts(this.get_all_sorted_objects(this.props.app_state.created_channels)))))
        }

        if(selected_option_name == this.props.app_state.loc['1202']/* 'all' */){
            return this.sort_feed_based_on_my_section_tags(this.filter_by_content_channeling(this.filter_using_searched_text(this.filter_for_blocked_accounts(this.get_all_sorted_objects(this.props.app_state.created_channels)))))
        }
        else if(selected_option_name == this.props.app_state.loc['1203']/* 'viewed' */){
            var my_viewed_channels = []
            var created_channels = this.get_all_sorted_objects(this.props.app_state.created_channels)
            for(var i=0; i<this.state.viewed_channels.length; i++){
                var obj = this.get_item_in_array(this.state.viewed_channels[i], created_channels)
                if(obj != null) my_viewed_channels.push(obj)
            }
            return this.sort_feed_based_on_my_section_tags(this.filter_by_content_channeling(this.filter_using_searched_text(this.filter_for_blocked_accounts(my_viewed_channels))))
        }
        else if(selected_option_name == this.props.app_state.loc['1222']/* 'pinned' */){
            var my_viewed_channels = []
            var created_channels = this.get_all_sorted_objects(this.props.app_state.created_channels)
            for(var i=0; i<this.state.pinned_channels.length; i++){
                var obj = this.get_item_in_array(this.state.pinned_channels[i], created_channels)
                if(obj != null) my_viewed_channels.push(obj)
            }
            return this.sort_feed_based_on_my_section_tags(this.filter_by_content_channeling(this.filter_using_searched_text(this.filter_for_blocked_accounts(my_viewed_channels))))
        }
        else {
            var my_channels = []
            var created_channels = this.get_all_sorted_objects(this.props.app_state.created_channels)
            
            for(var i = 0; i < created_channels.length; i++){
                var channel_author = created_channels[i]['event'].returnValues.p5
                var myid = this.props.app_state.user_account_id[created_channels[i]['e5']]
                if(myid == null) myid = 1
                if(channel_author.toString() == myid.toString()){
                    my_channels.push(created_channels[i])
                }
            }
            return this.sort_feed_based_on_my_section_tags(this.filter_by_content_channeling(this.filter_using_searched_text(this.filter_for_blocked_accounts(my_channels))))
        }
    }

    get_contractor_items(){
        var selected_option_name = this.get_selected_item(this.state.work_page_tags_object, this.state.work_page_tags_object['i'].active)

        if(this.state.work_page_tags_object['i'].active != this.props.app_state.loc['1198']/* 'contractors' */){
            return this.sort_feed_based_on_my_section_tags(this.filter_by_content_channeling(this.filter_using_searched_text(this.filter_for_blocked_accounts(this.get_all_sorted_objects(this.props.app_state.created_contractors)))))
        }

        if(selected_option_name == this.props.app_state.loc['1202']/* 'all' */){
            return this.sort_feed_based_on_my_section_tags(this.filter_by_content_channeling(this.filter_using_searched_text(this.filter_for_blocked_accounts(this.get_all_sorted_objects(this.props.app_state.created_contractors)))))
        }
        else if(selected_option_name == this.props.app_state.loc['1203']/* 'viewed' */){
            var my_viewed_contractors = []
            var all_contractors = this.get_all_sorted_objects(this.props.app_state.created_contractors)
            for(var i=0; i<this.state.viewed_contractors.length; i++){
                var obj = this.get_item_in_array(this.state.viewed_contractors[i], all_contractors)
                if(obj != null) my_viewed_contractors.push(obj)
            }
            return this.sort_feed_based_on_my_section_tags(this.filter_by_content_channeling(this.filter_using_searched_text(this.filter_for_blocked_accounts(my_viewed_contractors))))
        }
        else if(selected_option_name == this.props.app_state.loc['1222']/* 'pinned' */){
            var my_viewed_contractors = []
            var all_contractors = this.get_all_sorted_objects(this.props.app_state.created_contractors)
            for(var i=0; i<this.state.pinned_contractor.length; i++){
                var obj = this.get_item_in_array(this.state.pinned_contractor[i], all_contractors)
                if(obj != null) my_viewed_contractors.push(obj)
            }
            return this.sort_feed_based_on_my_section_tags(this.filter_by_content_channeling(this.filter_using_searched_text(this.filter_for_blocked_accounts(my_viewed_contractors))))
        }
        else {
            var my_contractors = []
            var all_contractors = this.get_all_sorted_objects(this.props.app_state.created_contractors)
            
            for(var i = 0; i < all_contractors.length; i++){
                var post_author = all_contractors[i]['event'].returnValues.p5
                var myid = this.props.app_state.user_account_id[all_contractors[i]['e5']]
                if(myid == null) myid = 1
                if(post_author.toString() == myid.toString()){
                    my_contractors.push(all_contractors[i])
                }
            }
            return this.sort_feed_based_on_my_section_tags(this.filter_by_content_channeling(this.filter_using_searched_text(this.filter_for_blocked_accounts(my_contractors))))
        }
    }

    get_exchange_tokens(exchange_type){
        var token_exchanges = []
        var exchanges_from_sync = this.get_all_sorted_objects(this.props.app_state.created_tokens)
        for (let i = 0; i < exchanges_from_sync.length; i++) {
            var type = exchanges_from_sync[i]['data'][0][3/* <3>token_type */]
            var e5 = exchanges_from_sync[i]['e5']
            // var obj = {
            //     'E15':{3:E35EndImg, 5:E35SpendImg}, 
            //     'E25':{3:E25EndImg, 5:E25SpendImg},
            // }
            var img = type  == 3 ? EndImg: SpendImg
            // if(exchanges_from_sync[i]['id'] == 3) img = obj[e5][3]
            // else if(exchanges_from_sync[i]['id'] == 5) img = obj[e5][5]

            if(exchanges_from_sync[i]['id'] == 3) img = this.props.app_state.e5s[e5].end_image
            else if(exchanges_from_sync[i]['id'] == 5) img = this.props.app_state.e5s[e5].spend_image
            
            var exchange_id =  exchanges_from_sync[i]['id'] + exchanges_from_sync[i]['e5']

            if(type == exchange_type){
                token_exchanges.push({'data': exchanges_from_sync[i]['data'], 'id':exchanges_from_sync[i]['id'], 'e5_id':exchange_id, 'E5': exchanges_from_sync[i]['e5'], 'img':img, 'balance':exchanges_from_sync[i]['balance'], 'account_data':exchanges_from_sync[i]['account_data'], 'event':exchanges_from_sync[i]['event'], 'ipfs':exchanges_from_sync[i]['ipfs'],'exchanges_balances':exchanges_from_sync[i]['exchanges_balances'], 'moderators':exchanges_from_sync[i]['moderators'], 'access_rights_enabled':exchanges_from_sync[i]['access_rights_enabled'], 'e5':exchanges_from_sync[i]['e5'], 'exchange_ratio_data':exchanges_from_sync[i]['exchange_ratio_data'], 'proportion_ratio_data':exchanges_from_sync[i]['proportion_ratio_data'] })
            }
        }

        var sorted_token_exchange_data = []
        // var myid = this.props.app_state.user_account_id
        for (let i = 0; i < token_exchanges.length; i++) {
            var myid = this.props.app_state.user_account_id[token_exchanges[i]['e5']]
            if(myid == null){
                myid = 1;
            } 
            var author_account = token_exchanges[i]['event'] == null ? '':token_exchanges[i]['event'].returnValues.p3.toString() 
            if(author_account == myid.toString()){
                sorted_token_exchange_data.push(token_exchanges[i])
            }
        }
        sorted_token_exchange_data.reverse()
        for (let i = 0; i < token_exchanges.length; i++) {
            if(!sorted_token_exchange_data.includes(token_exchanges[i]) && token_exchanges[i]['balance'] != 0){
                sorted_token_exchange_data.push(token_exchanges[i])
            }
        }
        for (let i = 0; i < token_exchanges.length; i++) {
            if(!sorted_token_exchange_data.includes(token_exchanges[i]) && (token_exchanges[i]['id'] == 3 || token_exchanges[i]['id'] == 5)){
                sorted_token_exchange_data.push(token_exchanges[i])
            }
        }
        for (let i = 0; i < token_exchanges.length; i++) {
            if(!sorted_token_exchange_data.includes(token_exchanges[i])){
                sorted_token_exchange_data.push(token_exchanges[i])
            }
        }

        return this.filter_using_searched_text(this.filter_for_blocked_accounts(sorted_token_exchange_data))
    }

    get_job_items(){
        var selected_option_name = this.get_selected_item(this.state.work_page_tags_object, this.state.work_page_tags_object['i'].active)

        if(this.state.work_page_tags_object['i'].active != this.props.app_state.loc['1196']/* 'jobs' */){
            return this.sort_feed_based_on_my_section_tags(this.filter_by_content_channeling(this.filter_using_searched_text(this.filter_for_blocked_accounts(this.get_all_sorted_objects(this.props.app_state.created_jobs)))))
        }

        if(selected_option_name == this.props.app_state.loc['1202']/* 'all' */){
            return this.sort_feed_based_on_my_section_tags(this.filter_by_content_channeling(this.filter_using_searched_text(this.filter_for_blocked_accounts(this.get_all_sorted_objects(this.props.app_state.created_jobs)))))
        }
        else if(selected_option_name == this.props.app_state.loc['1203']/* 'viewed' */){
            var my_viewed_jobs = []
            var all_jobs = this.get_all_sorted_objects(this.props.app_state.created_jobs)
            for(var i=0; i<this.state.viewed_jobs.length; i++){
                var obj = this.get_item_in_array(this.state.viewed_jobs[i], all_jobs)
                if(obj != null) my_viewed_jobs.push(obj)
            }
            
            return this.sort_feed_based_on_my_section_tags(this.filter_by_content_channeling(this.filter_using_searched_text(this.filter_for_blocked_accounts(my_viewed_jobs))))
        }
        else if(selected_option_name == this.props.app_state.loc['1222']/* 'pinned' */){
            var my_viewed_jobs = []
            var all_jobs = this.get_all_sorted_objects(this.props.app_state.created_jobs)
            for(var i=0; i<this.state.pinned_job.length; i++){
                var obj = this.get_item_in_array(this.state.pinned_job[i], all_jobs)
                if(obj != null) my_viewed_jobs.push(obj)
            }
            
            return this.sort_feed_based_on_my_section_tags(this.filter_by_content_channeling(this.filter_using_searched_text(this.filter_for_blocked_accounts(my_viewed_jobs))))
        }
        else if(selected_option_name == this.props.app_state.loc['1205']/* 'applied' */){
            var my_applied_jobs = []
            var all_jobs = this.get_all_sorted_objects(this.props.app_state.created_jobs)
            var all_applications = this.get_all_sorted_objects(this.props.app_state.my_applications)
            var all_job_mappings = this.get_all_sorted_objects_mappings(this.props.app_state.created_job_mappings)
            
            for(var i=0; i<all_applications.length; i++){
                var job_id = all_applications[i]['event'].returnValues.p1
                var job_obj = all_job_mappings[job_id]
                if(job_obj != null && !my_applied_jobs.includes(job_obj)){
                    my_applied_jobs.push(job_obj)
                }
            }
            return this.sort_feed_based_on_my_section_tags(this.filter_by_content_channeling(this.filter_using_searched_text(this.filter_for_blocked_accounts(my_applied_jobs))))
        }
        else {
            var my_jobs = []
            var all_jobs = this.get_all_sorted_objects(this.props.app_state.created_jobs)
            
            for(var i = 0; i < all_jobs.length; i++){
                var post_author = all_jobs[i]['event'].returnValues.p5
                var myid = this.props.app_state.user_account_id[all_jobs[i]['e5']]
                if(myid == null) myid = 1
                if(post_author.toString() == myid.toString()){
                    my_jobs.push(all_jobs[i])
                }
            }
            return this.sort_feed_based_on_my_section_tags(this.filter_by_content_channeling(this.filter_using_searched_text(this.filter_for_blocked_accounts(my_jobs))))
        }
    }

    get_mail_items(){
        var selected_option_name = this.get_selected_item(this.state.work_page_tags_object, this.state.work_page_tags_object['i'].active)

        if(this.state.work_page_tags_object['i'].active != this.props.app_state.loc['1201']/* 'mail' */){
            var all_mail = []
            var received_mail = this.get_combined_created_mail('received_mail')
            for(var i=0; i<received_mail['received_mail'].length; i++){
                var convo_id = received_mail['received_mail'][i]
                var context_object = received_mail['mail_activity'][convo_id][0]
                if(context_object['ipfs'] != null && context_object['ipfs'].selected != null){
                    all_mail.push(context_object)
                }
            }
            return this.filter_using_searched_text(this.filter_for_blocked_accounts(this.sortByAttributeDescending(all_mail, 'time')))
        }

        else if(selected_option_name == this.props.app_state.loc['1208']/* 'received' */){
            var all_mail = []
            var received_mail = this.get_combined_created_mail('received_mail')

            for(var i=0; i<received_mail['received_mail'].length; i++){
                var convo_id = received_mail['received_mail'][i]
                var context_object = received_mail['mail_activity'][convo_id][0]
                if(context_object['ipfs'] != null && context_object['ipfs'].selected != null){
                    all_mail.push(context_object)
                }
            }
            return this.filter_using_searched_text(this.filter_for_blocked_accounts(this.sortByAttributeDescending(all_mail, 'time')))
        }
        else if(selected_option_name == this.props.app_state.loc['1210']/* 'active' */){
            var all_mail = []
            
            var received_mail = this.get_combined_created_mail('received_mail')
            for(var i=0; i<received_mail['received_mail'].length; i++){
                var convo_id = received_mail['received_mail'][i]
                var context_object = received_mail['mail_activity'][convo_id][0]
                var is_active = this.is_active(convo_id)
                if(context_object['ipfs'] != null && context_object['ipfs'].selected != null){
                    if(is_active) all_mail.push(context_object)
                }
            }

            return this.filter_using_searched_text(this.filter_for_blocked_accounts(this.sortByAttributeDescending(all_mail, 'time')))
        }
        else {
            //sent
            var all_mail = []
            var created_mail = this.get_combined_created_mail('created_mail')
            for(var i=0; i<created_mail['created_mail'].length; i++){
                var convo_id = created_mail['created_mail'][i]
                var context_object = created_mail['mail_activity'][convo_id][0]
                if(context_object['ipfs'] != null && context_object['ipfs'].selected != null){
                    all_mail.push(context_object)
                }
            }
            return this.filter_using_searched_text(this.filter_for_blocked_accounts(this.sortByAttributeDescending(all_mail, 'time')))
        }
    }

    is_active(convo_id){
        var is_active = false
        var convo_messages = this.get_convo_messages(convo_id)
        for(var j=0; j<convo_messages.length; j++){
            var message = convo_messages[j]
            var message_sender = message['ipfs']
            if(message_sender != null){
                message_sender = message_sender['sender']
                var myid = this.props.app_state.user_account_id[message['e5']]
                if(message_sender == myid){
                    is_active = true
                    break;
                }
            }
        }
        return is_active
    }

    get_convo_messages(convo_id){
        var all_messages = []

        var created_mail = this.get_combined_created_mail('created_mail')
        var received_mail = this.get_combined_created_mail('received_mail')
        
        var created_messages = created_mail['mail_activity'][convo_id]
        var received_messages = received_mail['mail_activity'][convo_id]

        if(received_messages != null){
            for(var i=0; i<received_messages.length; i++){
                if(received_messages[i]['ipfs']!=null && received_messages[i]['ipfs'].entered_title_text == null){
                    all_messages.push(received_messages[i])
                }
            }
        }
        if(created_messages != null){
            for(var i=0; i<created_messages.length; i++){
                if(created_messages[i]['ipfs']!=null && created_messages[i]['ipfs'].entered_title_text == null){
                    all_messages.push(created_messages[i])
                }
            }
        }

        // all_messages = (this.sortByAttributeDescending(all_messages, 'time')).reverse()
                
        return all_messages
    }

    get_combined_created_mail(created_or_received){
        var created_mail = []
        var mail_activity = {}
        var created_mail_obj = created_or_received == 'created_mail' ? this.props.app_state.created_mail : this.props.app_state.received_mail
        for(var i=0; i<this.props.app_state.e5s['data'].length; i++){
            var e5 = this.props.app_state.e5s['data'][i]
            var e5_data = created_mail_obj[e5]

            if(e5_data != null){
                if(e5_data[created_or_received] != null){
                    created_mail = created_mail.concat(e5_data[created_or_received])
                }
                var mail_activity_clone = structuredClone(mail_activity)
                mail_activity = { ...mail_activity_clone, ...e5_data['mail_activity']}
            } 
        }

        if(created_or_received == 'created_mail'){
            return {'created_mail':created_mail, 'mail_activity':mail_activity}
        }else{
            return {'received_mail':created_mail, 'mail_activity':mail_activity}
        }
    }
    

    get_post_items(){
        var selected_option_name = this.get_selected_item(this.state.explore_page_tags_object, this.state.explore_page_tags_object['i'].active)

        if(this.state.explore_page_tags_object['i'].active != this.props.app_state.loc['1213']/* 'posts' */){
            return this.sort_feed_based_on_my_section_tags(this.filter_by_content_channeling(this.filter_using_searched_text(this.filter_for_blocked_accounts(this.get_all_sorted_objects(this.props.app_state.created_posts)))))
        }

        if(selected_option_name == this.props.app_state.loc['1202']/* 'all' */){
            return this.sort_feed_based_on_my_section_tags(this.filter_by_content_channeling(this.filter_using_searched_text(this.filter_for_blocked_accounts(this.get_all_sorted_objects(this.props.app_state.created_posts)))))
        }
        else if(selected_option_name == this.props.app_state.loc['1203']/* 'viewed' */){
            var my_viewed_posts = []
            var all_posts = this.get_all_sorted_objects(this.props.app_state.created_posts)
            for(var i=0; i<this.state.viewed_posts.length; i++){
                var obj = this.get_item_in_array(this.state.viewed_posts[i], all_posts)
                if(obj != null) my_viewed_posts.push(obj)
            }
            return this.sort_feed_based_on_my_section_tags(this.filter_by_content_channeling(this.filter_using_searched_text(this.filter_for_blocked_accounts(my_viewed_posts))))
        }
        else if(selected_option_name == this.props.app_state.loc['1222']/* 'pinned' */){
            var my_viewed_posts = []
            var all_posts = this.get_all_sorted_objects(this.props.app_state.created_posts)
            for(var i=0; i<this.state.pinned_post.length; i++){
                var obj = this.get_item_in_array(this.state.pinned_post[i], all_posts)
                if(obj != null) my_viewed_posts.push(obj)
            }
            return this.sort_feed_based_on_my_section_tags(this.filter_by_content_channeling(this.filter_using_searched_text(this.filter_for_blocked_accounts(my_viewed_posts))))
        }
        else {
            var my_posts = []
            var all_posts = this.get_all_sorted_objects(this.props.app_state.created_posts)
            
            for(var i = 0; i < all_posts.length; i++){
                var post_author = all_posts[i]['event'].returnValues.p5
                var myid = this.props.app_state.user_account_id[all_posts[i]['e5']]
                if(myid == null) myid = 1
                if(post_author.toString() == myid.toString()){
                    my_posts.push(all_posts[i])
                }
            }
            return this.sort_feed_based_on_my_section_tags(this.filter_by_content_channeling(this.filter_using_searched_text(this.filter_for_blocked_accounts(my_posts))))
        }
    }

    get_proposal_items(){
        var selected_option_name = this.get_selected_item(this.state.work_page_tags_object, this.state.work_page_tags_object['i'].active)

        if(this.state.work_page_tags_object['i'].active != this.props.app_state.loc['1199']/* 'proposals' */){
            return this.sort_feed_based_on_my_section_tags(this.filter_using_searched_text(this.get_all_sorted_objects(this.props.app_state.my_proposals)))
        }

        if(selected_option_name == this.props.app_state.loc['1211']/* 'my-proposals' */){
            return this.sort_feed_based_on_my_section_tags(this.filter_using_searched_text(this.get_all_sorted_objects(this.props.app_state.my_proposals)))
        }
        else if(selected_option_name == this.props.app_state.loc['1203']/* 'viewed' */){
            var my_viewed_proposals = []
            var all_proposals = this.get_all_sorted_objects(this.props.app_state.my_proposals)
            for(var i=0; i<this.state.viewed_proposals.length; i++){
                var obj = this.get_item_in_array(this.state.viewed_proposals[i], all_proposals)
                if(obj != null) my_viewed_proposals.push(obj)
            }
            return this.sort_feed_based_on_my_section_tags(this.filter_using_searched_text(my_viewed_proposals))
        }
        else if(selected_option_name == this.props.app_state.loc['1222']/* 'pinned' */){
            var my_viewed_proposals = []
            var all_proposals = this.get_all_sorted_objects(this.props.app_state.my_proposals)
            for(var i=0; i<this.state.pinned_proposal.length; i++){
                var obj = this.get_item_in_array(this.state.pinned_proposal[i], all_proposals)
                if(obj != null) my_viewed_proposals.push(obj)
            }
            return this.sort_feed_based_on_my_section_tags(this.filter_using_searched_text(my_viewed_proposals))
        }
        else {
            var proposals = []
            var all_proposals = this.get_all_sorted_objects(this.props.app_state.my_proposals)
            
            for(var i = 0; i < all_proposals.length; i++){
                var proposal_author = all_proposals[i]['event'].returnValues.p4/* should be p3 */
                var myid = this.props.app_state.user_account_id[all_proposals[i]['e5']]
                if(myid == null) myid = 1
                if(proposal_author.toString() == myid.toString()){
                    proposals.push(all_proposals[i])
                }else{
                    console.log('sender not proposal author: author->'+proposal_author+', sender id->'+myid)
                }
            }
            return this.sort_feed_based_on_my_section_tags(this.filter_using_searched_text(proposals))
        }
    }

    get_storefront_items(){
        var selected_option_name = this.get_selected_item(this.state.explore_page_tags_object, this.state.explore_page_tags_object['i'].active)

        if(this.state.explore_page_tags_object['i'].active != this.props.app_state.loc['1215']/* 'storefront' */){
            return this.sort_feed_based_on_my_section_tags(this.filter_by_content_channeling(this.filter_using_searched_text(this.filter_for_blocked_accounts(this.get_all_sorted_objects(this.props.app_state.created_stores)))))
        }

        if(selected_option_name == this.props.app_state.loc['1202']/* 'all' */){
            return this.sort_feed_based_on_my_section_tags(this.filter_by_content_channeling(this.filter_using_searched_text(this.filter_for_blocked_accounts(this.get_all_sorted_objects(this.props.app_state.created_stores)))))
        }
        else if(selected_option_name == this.props.app_state.loc['1203']/* 'viewed' */){
            var my_viewed_stores = []
            var all_stores = this.get_all_sorted_objects(this.props.app_state.created_stores)
            for(var i=0; i<this.state.viewed_stores.length; i++){
                var obj = this.get_item_in_array(this.state.viewed_stores[i], all_stores)
                if(obj != null) my_viewed_stores.push(obj)
            }
            return this.sort_feed_based_on_my_section_tags(this.filter_by_content_channeling(this.filter_using_searched_text(this.filter_for_blocked_accounts(my_viewed_stores))))
        }
        else if(selected_option_name == this.props.app_state.loc['1222']/* 'pinned' */){
            var my_viewed_stores = []
            var all_stores = this.get_all_sorted_objects(this.props.app_state.created_stores)
            for(var i=0; i<this.state.pinned_item.length; i++){
                var obj = this.get_item_in_array(this.state.pinned_item[i], all_stores)
                if(obj != null) my_viewed_stores.push(obj)
            }
            return this.sort_feed_based_on_my_section_tags(this.filter_by_content_channeling(this.filter_using_searched_text(this.filter_for_blocked_accounts(my_viewed_stores))))
        }
        else {
            var my_stores = []
            
            var all_stores = this.get_all_sorted_objects(this.props.app_state.created_stores)
            
            for(var i = 0; i < all_stores.length; i++){
                var post_author = all_stores[i]['event'].returnValues.p5
                var myid = this.props.app_state.user_account_id[all_stores[i]['e5']]
                if(myid == null) myid = 1
                if(post_author.toString() == myid.toString()){
                    my_stores.push(all_stores[i])
                }
            }
            return this.sort_feed_based_on_my_section_tags(this.filter_by_content_channeling(this.filter_using_searched_text(this.filter_for_blocked_accounts(my_stores))))
        }
    }

    get_subscription_items(){
        var selected_option_name = this.get_selected_item(this.state.work_page_tags_object, this.state.work_page_tags_object['i'].active)

        if(this.state.work_page_tags_object['i'].active != this.props.app_state.loc['1200']/* 'subscriptions' */){
            return this.sort_feed_based_on_my_section_tags(this.filter_using_searched_text(this.filter_for_blocked_accounts(this.get_all_sorted_objects(this.props.app_state.created_subscriptions))))
        }

        if(selected_option_name == this.props.app_state.loc['1202']/* 'all' */){
            return this.sort_feed_based_on_my_section_tags(this.filter_using_searched_text(this.filter_for_blocked_accounts(this.get_all_sorted_objects(this.props.app_state.created_subscriptions))))
        }
        else if(selected_option_name == this.props.app_state.loc['1203']/* 'viewed' */){
            var my_viewed_subscriptions = []
            var all_subscriptions = this.get_all_sorted_objects(this.props.app_state.created_subscriptions)
            for(var i=0; i<this.state.viewed_subscriptions.length; i++){
                var obj = this.get_item_in_array(this.state.viewed_subscriptions[i], all_subscriptions)
                if(obj != null) my_viewed_subscriptions.push(obj)
            }
            return this.sort_feed_based_on_my_section_tags(this.filter_using_searched_text(this.filter_for_blocked_accounts(my_viewed_subscriptions)))
        }
        else if(selected_option_name == this.props.app_state.loc['1222']/* 'pinned' */){
            var my_viewed_subscriptions = []
            var all_subscriptions = this.get_all_sorted_objects(this.props.app_state.created_subscriptions)
            for(var i=0; i<this.state.pinned_subscriptions.length; i++){
                var obj = this.get_item_in_array(this.state.pinned_subscriptions[i], all_subscriptions)
                if(obj != null) my_viewed_subscriptions.push(obj)
            }
            return this.sort_feed_based_on_my_section_tags(this.filter_using_searched_text(this.filter_for_blocked_accounts(my_viewed_subscriptions)))
        }
        else if(selected_option_name == this.props.app_state.loc['1207']/* 'paid' */){
            var my_paid_subscriptions = []
            var all_subscriptions = this.get_all_sorted_objects(this.props.app_state.created_subscriptions)
            for(var i=0; i<all_subscriptions.length; i++){
                var object = all_subscriptions[i]
                if(object['payment'] != 0){
                    my_paid_subscriptions.push(object)
                }
            }
            return this.sort_feed_based_on_my_section_tags(this.filter_using_searched_text(this.filter_for_blocked_accounts(my_paid_subscriptions)))
        }
        else {
            var my_subscriptions = []
            var all_subscriptions = this.get_all_sorted_objects(this.props.app_state.created_subscriptions)
            
            for(var i = 0; i < all_subscriptions.length; i++){
                var post_author = all_subscriptions[i]['event'] == null ? 0 : all_subscriptions[i]['event'].returnValues.p3
                var myid = this.props.app_state.user_account_id[all_subscriptions[i]['e5']]
                if(myid == null) myid = 1
                if(post_author.toString() == myid.toString()){
                    my_subscriptions.push(all_subscriptions[i])
                }
            }
            return this.sort_feed_based_on_my_section_tags(this.filter_using_searched_text(this.filter_for_blocked_accounts(my_subscriptions)))
        }
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


    get_item_in_array(id, object_array){
        var object = object_array.find(x => x['id'] === id);
        return object
    }

    get_item_in_array2(e5_id, object_array){
        var object = object_array.find(x => x['e5_id'] === e5_id);
        return object
    }

    filter_for_blocked_accounts(objects){
        var blocked_account_obj = this.get_all_sorted_objects(this.props.app_state.blocked_accounts)
        var blocked_accounts = []
        blocked_account_obj.forEach(account => {
            if(!blocked_accounts.includes(account['id'])){
                blocked_accounts.push(account['id'])
            }
        });
        var filtered_objects = [];
        objects.forEach(object => {
            if(!blocked_accounts.includes(object['author'])){
                filtered_objects.push(object)
            }
        })

        if(this.props.app_state.masked_content == 'hide'){
            return filtered_objects
        }
        return objects;
    }

    filter_using_searched_text(objects){
        var return_objs = []
        var id = this.get_page_id();
        var searched_input = this.state.page_search_data[id]
        var searched_tags = this.state.tags_search_data[id]

        if(searched_input == null) searched_input = ''
        if(searched_tags == null) searched_tags = []

        objects.forEach(object => {
            var entered_title_text = object['ipfs'] == null ? '' : object['ipfs'].entered_title_text
            if(object['id'].toString().includes(searched_input) || entered_title_text.includes(searched_input)){
                if(this.check_if_object_includes_tags(object, searched_tags)){
                    return_objs.push(object)
                }
            }
        });
        return return_objs;
    }

    check_if_object_includes_tags(object, searched_tags){
        var return_value = true
        searched_tags.forEach(tag => {
            var obj_tags = object['ipfs'] == null ? [] : [object['e5']].concat(object['ipfs'].entered_indexing_tags)
            if(!obj_tags.includes(tag)){
                return_value = false;
            }
        });
        return return_value;
    }

    filter_by_content_channeling(objects){
        var return_objs = []
        var content_channeling_setting = this.props.app_state.content_channeling
        var device_country = this.props.app_state.device_country
        var device_language = this.props.app_state.device_language

        objects.forEach(object => {
            var ipfs = object['ipfs'] == null ? {} : object['ipfs']
            var object_country = ipfs.device_country
            var object_content_channeling_setting = ipfs.content_channeling_setting
            var object_language = ipfs.device_language_setting

            // console.log('--------------------------------filter_by_content_channeling---------------------')
            // console.log(ipfs)
            // console.log(object_country, ' ',object_content_channeling_setting, ' ', object_language)
            
            if(content_channeling_setting == this.props.app_state.loc['1231']/* 'local' */){
                if(device_country == object_country && object_content_channeling_setting == this.props.app_state.loc['1231']/* 'local' */){
                    return_objs.push(object)
                }
            }
            else if(content_channeling_setting == this.props.app_state.loc['1232']/* 'language' */){
                if(device_language == object_language && object_content_channeling_setting == this.props.app_state.loc['1232']/* 'language' */){
                    return_objs.push(object)
                }
            }
            else if(content_channeling_setting == this.props.app_state.loc['1233']/* 'international' */){
                if(object_content_channeling_setting == this.props.app_state.loc['1233']/* 'international' */){
                    return_objs.push(object)
                }
            } 
            else{
                console.log('invalid content channeling setting!')
            }
        });

        return return_objs;
    }


    sort_feed_based_on_my_section_tags(objects){
        var feed_objs = []
        var like_tags = []
        var section_tags = this.state.page == '?' ?  this.props.app_state.job_section_tags : this.props.app_state.explore_section_tags

        if(this.props.app_state.section_tags_setting == this.props.app_state.loc['1202']/* 'all' */){
            return objects
        }

        objects.forEach(object => {
            var object_tags = object['ipfs'].entered_indexing_tags
            var includes = section_tags.some(r=> object_tags.includes(r))
            if(includes && !feed_objs.includes(object)){
                feed_objs.push(object)
                like_tags.concat(object_tags)
            }
        });

        objects.forEach(object => {
            var object_tags = object['ipfs'].entered_indexing_tags
            var includes = like_tags.some(r=> object_tags.includes(r))
            if(includes && !feed_objs.includes(object)){
                feed_objs.push(object)
            }
        });

        objects.forEach(object => {
            if(!feed_objs.includes(object)){
                feed_objs.push(object)
            }
        });

        return feed_objs
    }
    






    
    



    render_post_list_group(size){
        return(
            <PostListSection ref={this.list_section} size={size} height={this.props.height} width={this.props.width} page={this.state.page} work_page_tags_object={this.state.work_page_tags_object} explore_page_tags_object={this.state.explore_page_tags_object} wallet_page_tags_object={this.state.wallet_page_tags_object} app_state={this.props.app_state} notify={this.props.notify.bind(this)}
            when_ether_object_clicked={this.when_ether_object_clicked.bind(this)} when_spends_object_clicked={this.when_spends_object_clicked.bind(this)} when_ends_object_clicked={this.when_ends_object_clicked.bind(this)} when_E5_item_clicked={this.when_E5_item_clicked.bind(this)} when_job_post_item_clicked={this.when_job_post_item_clicked.bind(this)} when_contract_item_clicked={this.when_contract_item_clicked.bind(this)} when_subscription_item_clicked={this.when_subscription_item_clicked.bind(this)} when_post_item_clicked={this.when_post_item_clicked.bind(this)} when_channel_item_clicked={this.when_channel_item_clicked.bind(this)} when_proposal_item_clicked={this.when_proposal_item_clicked.bind(this)} when_mail_item_clicked={this.when_mail_item_clicked.bind(this)} when_storefront_post_item_clicked={this.when_storefront_post_item_clicked.bind(this)} when_bag_post_item_clicked={this.when_bag_post_item_clicked.bind(this)} when_contractor_post_item_clicked={this.when_contractor_post_item_clicked.bind(this)}

            theme={this.props.theme} fetch_objects_data={this.props.fetch_objects_data.bind(this)} when_view_image_clicked={this.when_view_image_clicked.bind(this)}
            
            viewed_posts={this.state.viewed_posts} viewed_channels={this.state.viewed_channels} viewed_jobs={this.state.viewed_jobs} viewed_contracts={this.state.viewed_contracts} viewed_subscriptions={this.state.viewed_subscriptions} viewed_proposals={this.state.viewed_proposals} viewed_stores={this.state.viewed_stores} viewed_bags={this.state.viewed_bags} viewed_contractors={this.state.viewed_contractors}

            get_contract_items={this.get_contract_items.bind(this)} get_bag_items={this.get_bag_items.bind(this)} get_channel_items={this.get_channel_items.bind(this)} get_contractor_items={this.get_contractor_items.bind(this)} get_exchange_tokens={this.get_exchange_tokens.bind(this)} get_job_items={this.get_job_items.bind(this)} get_mail_items={this.get_mail_items.bind(this)} get_post_items={this.get_post_items.bind(this)} get_proposal_items={this.get_proposal_items.bind(this)} get_storefront_items={this.get_storefront_items.bind(this)} get_subscription_items={this.get_subscription_items.bind(this)} get_e5_data={this.get_e5_data.bind(this)} set_page_scroll={this.set_page_scroll.bind(this)} select_deselect_tag={this.select_deselect_tag.bind(this)} get_searched_account_data={this.props.get_searched_account_data.bind(this)} when_searched_account_clicked={this.props.when_searched_account_clicked.bind(this)}

            show_post_item_preview_with_subscription={this.show_post_item_preview_with_subscription.bind(this)}
            />
        )
    }

    when_ether_object_clicked(index, id){
        this.setState({selected_ether_item: id})
        this.set_detail_data()
        if(this.props.screensize == 's'){
            this.open_view_object_bottomsheet()
        }
    }

    when_ends_object_clicked(index, id, e5){
        this.setState({selected_end_item: id+e5})
        this.set_detail_data()
        this.add_to_tab(id+e5, id)
        if(this.props.screensize == 's'){
            this.open_view_object_bottomsheet()
        }

        this.props.get_exchange_event_data(id, e5)
        this.props.get_moderator_event_data(id, e5)
    }

    when_spends_object_clicked(index, id, e5){
        this.setState({selected_spend_item: id+e5})
        this.set_detail_data()
        this.add_to_tab(id+e5, id)
        if(this.props.screensize == 's'){
            this.open_view_object_bottomsheet()
        }
        this.props.get_exchange_event_data(id, e5)
        this.props.get_moderator_event_data(id, e5)
    }

    when_E5_item_clicked(index, id){
        this.setState({selected_e5_item: id})
        this.set_detail_data()
        if(this.props.screensize == 's'){
            this.open_view_object_bottomsheet()
        }
    }

    update_cookies(){
        var me = this;
        setTimeout(function() {
           me.set_cookies()
        }, (1 * 1000));
    }

    when_job_post_item_clicked(index, id, e5){
        this.setState({selected_job_post_item: id+e5})
        this.set_detail_data()
        this.add_to_tab(id+e5, id)
        var viewed_jobs_clone = this.state.viewed_jobs.slice()
        var pos = viewed_jobs_clone.indexOf(id)
        if(pos == -1){
            viewed_jobs_clone.push(id)
            this.setState({viewed_jobs: viewed_jobs_clone})
            this.update_cookies()
        }

        this.props.get_job_objects_responses(id, e5)
        this.props.get_objects_messages(id, e5)

        if(this.props.screensize == 's'){
            this.open_view_object_bottomsheet()
        }
    }

    when_contract_item_clicked(index, id, e5){
        this.setState({selected_contract_item: id+e5})
        this.set_detail_data()
        this.add_to_tab(id+e5, id)
        var viewed_contracts_clone = this.state.viewed_contracts.slice()
        var pos = viewed_contracts_clone.indexOf(id)
        if(pos == -1){
            viewed_contracts_clone.push(id)
            this.setState({viewed_contracts: viewed_contracts_clone})
            this.update_cookies()
        }

        this.props.get_contract_event_data(id, e5)
        this.props.get_moderator_event_data(id, e5)

        if(this.props.screensize == 's'){
            this.open_view_object_bottomsheet()
        }
    }

    when_subscription_item_clicked(index, id, e5){
        this.setState({selected_subscription_item: id+e5})
        this.set_detail_data()
        this.add_to_tab(id+e5, id)
        var viewed_subscriptions_clone = this.state.viewed_subscriptions.slice()
        var pos = viewed_subscriptions_clone.indexOf(id)
        if(pos == -1){
            viewed_subscriptions_clone.push(id)
            this.setState({viewed_subscriptions: viewed_subscriptions_clone})
            this.update_cookies()
        }

        this.props.get_subscription_event_data(id, e5)
        this.props.get_moderator_event_data(id, e5)

        if(this.props.screensize == 's'){
            this.open_view_object_bottomsheet()
        }
    }

    when_post_item_clicked(index, id, e5){
        this.setState({selected_post_item: id+e5})
        this.set_detail_data()
        this.add_to_tab(id+e5, id)
        var viewed_posts_clone = this.state.viewed_posts.slice()
        var pos = viewed_posts_clone.indexOf(id)
        if(pos == -1){
            viewed_posts_clone.push(id)
            this.setState({viewed_posts: viewed_posts_clone})
            this.update_cookies()
        }

        this.props.get_objects_messages(id, e5)
        this.props.get_post_award_data(id, e5)

        if(this.props.screensize == 's'){
            this.open_view_object_bottomsheet()
        }
    }

    when_channel_item_clicked(index, id, e5){
        this.setState({selected_channel_item: id+e5})
        this.set_detail_data()
        this.add_to_tab(id+e5, id)
        var viewed_channel_clone = this.state.viewed_channels.slice()
        var pos = viewed_channel_clone.indexOf(id)
        if(pos == -1){
            viewed_channel_clone.push(id)
            this.setState({viewed_channels: viewed_channel_clone})
            this.update_cookies()
        }

        this.props.get_objects_messages(id, e5)
        this.props.get_channel_event_data(id, e5)
        this.props.get_moderator_event_data(id, e5)

        if(this.props.screensize == 's'){
            this.open_view_object_bottomsheet()
        }
    }

    when_proposal_item_clicked(index, id, e5){
        this.setState({selected_proposal_item: id+e5})
        this.set_detail_data()
        this.add_to_tab(id+e5, id)
        var viewed_proposals_clone = this.state.viewed_proposals.slice()
        var pos = viewed_proposals_clone.indexOf(id)
        if(pos == -1){
            viewed_proposals_clone.push(id)
            this.setState({viewed_proposals: viewed_proposals_clone})
            this.update_cookies()
        }

        this.props.get_objects_messages(id, e5)
        this.props.get_proposal_event_data(id, e5)

        if(this.props.screensize == 's'){
            this.open_view_object_bottomsheet()
        }
    }

    when_mail_item_clicked(index, id){
        this.setState({selected_mail_item: id})
        this.set_detail_data()
        if(this.props.screensize == 's'){
            this.open_view_object_bottomsheet()
        }
    }

    when_storefront_post_item_clicked(index, id, e5){
        this.setState({selected_storefront_item: id+e5})
        this.set_detail_data()
        this.add_to_tab(id+e5, id)
        var viewed_storefront_clone = this.state.viewed_stores.slice()
        var pos = viewed_storefront_clone.indexOf(id)
        if(pos == -1){
            viewed_storefront_clone.push(id)
            this.setState({viewed_stores: viewed_storefront_clone})
            this.update_cookies()
        }

        this.props.get_direct_purchase_events(id, e5)
        this.props.get_objects_messages(id, e5)

        if(this.props.screensize == 's'){
            this.open_view_object_bottomsheet()
        }
    }

    when_bag_post_item_clicked(index, id, e5){
        this.setState({selected_bag_item: id+e5})
        this.set_detail_data()
        this.add_to_tab(id+e5, id)
        var viewed_bag_clone = this.state.viewed_bags.slice()
        var pos = viewed_bag_clone.indexOf(id)
        if(pos == -1){
            viewed_bag_clone.push(id)
            this.setState({viewed_bags: viewed_bag_clone})
            this.update_cookies()
        }

        this.props.get_job_objects_responses(id, e5)
        this.props.get_objects_messages(id, e5)

        if(this.props.screensize == 's'){
            this.open_view_object_bottomsheet()
        }
    }

    when_contractor_post_item_clicked(index, id, e5){
        this.setState({selected_contractor_item: id+e5})
        this.set_detail_data()
        this.add_to_tab(id+e5, id)
        var viewed_contractors_clone = this.state.viewed_contractors.slice()
        var pos = viewed_contractors_clone.indexOf(id)
        if(pos == -1){
            viewed_contractors_clone.push(id)
            this.setState({viewed_contractors: viewed_contractors_clone})
            this.update_cookies()
        }

        this.props.get_contractor_applications(id, e5)

        if(this.props.screensize == 's'){
            this.open_view_object_bottomsheet()
        }
    }

    select_deselect_tag(tag, pos){
        if(!this.props.app_state.has_wallet_been_set){
            this.props.notify(this.props.app_state.loc['1234']/* 'First set your wallet to follow that tag.' */, 4500)
            return;
        }
        var page = this.state.page
        if(page == '?'){
            this.props.when_select_deselect_work_tag(tag, pos)
        }
        else if(page == 'e'){
            this.props.when_select_deselect_explore_tag(tag, pos)
        }
        else{}
    }

    set_detail_data(){
        var selected_page = this.state.page
        var selected_tag = ''
        if(selected_page == '?'){
            selected_tag = this.state.work_page_tags_object['i'].active
        }
        else if(selected_page == 'e'){
            selected_tag = this.state.explore_page_tags_object['i'].active
        }
        else if(selected_page == 'w'){
            var selected_item = this.state.wallet_page_tags_object['e'][2][0];
            selected_tag = this.state.wallet_page_tags_object['e'][1][selected_item];
        }
        this.setState({detail_page:selected_page, detail_selected_tag:selected_tag})
    }

    add_to_tab(object_e5_id, object_id){
        var clone = this.state.tabs.slice()
        if(this.props.app_state.visible_tabs == 'e') return;

        if(this.does_tabs_contain_id(object_e5_id)){
            for(var i=0; i<clone.length; i++){
                if(clone[i]['e5_id'] == object_e5_id){
                    const index = i;
                    clone.splice(index, 1); // 2nd parameter means remove one item only
                }
            }
        }
        var selected_page = this.state.page
        var selected_tag = ''
        if(selected_page == '?'){
            selected_tag = this.state.work_page_tags_object['i'].active
            if(selected_tag == 'e'){
                selected_tag = this.props.app_state.loc['1196']/* 'jobs' */
            }
        }
        else if(selected_page == 'e'){
            selected_tag = this.state.explore_page_tags_object['i'].active
        }
        else if(selected_page == 'w'){
            var selected_item = this.state.wallet_page_tags_object['e'][2][0];
            selected_tag = this.state.wallet_page_tags_object['e'][1][selected_item];
        }
        var obj = {'selected_tag':selected_tag, 'selected_page':selected_page, 'e5_id':object_e5_id, 'id':object_id}
        clone.push(obj)


        var me = this;
        setTimeout(function() {
            me.setState({tabs: clone})
            me.update_cookies()
        }, (1 * 100));
    }

    does_tabs_contain_id(e5_id){
        var contains = false
        this.state.tabs.forEach(element => {
            if(element['e5_id'] == e5_id){
                contains = true
            }
        });
        return contains
    }

    show_post_item_preview_with_subscription(post){
        this.open_post_preview_section(post)
    }




















    render_post_detail_object(size){
        var h = this.props.height - 48
        if(this.props.app_state.visible_tabs == 'e') h = this.props.height
        return(
            <div>
                {this.render_page_tabs()}
                <PostDetailSection page={this.state.page} screensize={size} work_page_tags_object={this.state.work_page_tags_object} wallet_page_tags_object={this.state.wallet_page_tags_object} explore_page_tags_object={this.state.explore_page_tags_object} detail_page={this.state.detail_page} detail_selected_tag={this.state.detail_selected_tag}

                selected_ether_item={this.state.selected_ether_item} selected_end_item={this.state.selected_end_item} selected_spend_item={this.state.selected_spend_item} selected_e5_item={this.state.selected_e5_item} selected_job_post_item={this.state.selected_job_post_item} selected_contract_item={this.state.selected_contract_item} selected_subscription_item={this.state.selected_subscription_item} selected_post_item={this.state.selected_post_item} selected_channel_item={this.state.selected_channel_item} selected_proposal_item={this.state.selected_proposal_item} selected_mail_item={this.state.selected_mail_item} selected_storefront_item={this.state.selected_storefront_item} selected_bag_item={this.state.selected_bag_item} selected_contractor_item={this.state.selected_contractor_item}

                height={h} screensize={this.props.screensize} width={this.props.width} app_state={this.props.app_state} open_send_receive_ether_bottomsheet={this.props.open_send_receive_ether_bottomsheet.bind(this)} theme={this.props.theme} open_wiki_bottomsheet={this.props.open_wiki_bottomsheet.bind(this)} notify={this.props.notify.bind(this)}
                
                when_view_image_clicked={this.when_view_image_clicked.bind(this)} when_edit_job_tapped={this.when_edit_job_tapped.bind(this)} fetch_objects_data={this.props.fetch_objects_data.bind(this)}
                
                viewed_posts={this.state.viewed_posts} viewed_channels={this.state.viewed_channels} viewed_jobs={this.state.viewed_jobs} viewed_contracts={this.state.viewed_contracts} viewed_subscriptions={this.state.viewed_subscriptions} viewed_proposals={this.state.viewed_proposals} viewed_stores={this.state.viewed_stores} viewed_bags={this.state.viewed_bags} viewed_contractors={this.state.viewed_contractors}

                open_mint_burn_token_ui={this.open_mint_burn_token_ui.bind(this)} open_transfer_ui={this.open_transfer_ui.bind(this)} open_enter_contract_ui={this.open_enter_contract_ui.bind(this)} open_extend_contract_ui={this.open_extend_contract_ui.bind(this)} open_exit_contract_ui={this.open_exit_contract_ui.bind(this)} open_new_proposal_ui={this.open_new_proposal_ui.bind(this)}
                open_vote_proposal_ui={this.open_vote_proposal_ui.bind(this)} open_sumbit_proposal_ui={this.open_sumbit_proposal_ui.bind(this)} open_pay_subscription_ui={this.open_pay_subscription_ui.bind(this)} open_cancel_subscription_ui={this.open_cancel_subscription_ui.bind(this)} open_collect_subscription_ui={this.open_collect_subscription_ui.bind(this)} open_modify_subscription_ui={this.open_modify_subscription_ui.bind(this)} open_modify_contract_ui={this.open_modify_contract_ui.bind(this)} open_modify_token_ui={this.open_modify_token_ui.bind(this)} open_exchange_transfers_ui={this.open_exchange_transfers_ui.bind(this)} open_force_exit_ui={this.open_force_exit_ui.bind(this)} open_archive_proposal_ui={this.open_archive_proposal_ui.bind(this)} open_freeze_unfreeze_ui={this.open_freeze_unfreeze_ui.bind(this)} open_authmint_ui={this.open_authmint_ui.bind(this)} open_moderator_ui={this.open_moderator_ui.bind(this)} show_images={this.props.show_images.bind(this)}

                add_mail_to_stack_object={this.props.add_mail_to_stack_object.bind(this)} add_channel_message_to_stack_object={this.props.add_channel_message_to_stack_object.bind(this)} add_post_reply_to_stack={this.props.add_post_reply_to_stack.bind(this)} open_respond_to_job_ui={this.open_respond_to_job_ui.bind(this)} view_application_contract={this.view_application_contract.bind(this)} add_job_message_to_stack_object={this.props.add_job_message_to_stack_object.bind(this)} add_proposal_message_to_stack_object={this.props.add_proposal_message_to_stack_object.bind(this)} open_add_to_bag={this.props.open_add_to_bag.bind(this)} open_fulfil_bag_request={this.props.open_fulfil_bag_request.bind(this)} view_bag_application_contract={this.view_bag_application_contract.bind(this)} open_direct_purchase={this.open_direct_purchase.bind(this)} open_send_job_request_ui={this.props.open_send_job_request_ui.bind(this)} show_withdraw_ether_bottomsheet={this.props.show_withdraw_ether_bottomsheet.bind(this)}

                open_clear_purchase={this.props.open_clear_purchase.bind(this)} add_bag_message_to_stack_object={this.props.add_bag_message_to_stack_object.bind(this)} add_storefront_message_to_stack_object={this.props.add_storefront_message_to_stack_object.bind(this)} open_view_job_request_ui={this.props.open_view_job_request_ui} open_view_contract_ui={this.props.open_view_contract_ui.bind(this)}

                get_contract_items={this.get_contract_items.bind(this)} get_bag_items={this.get_bag_items.bind(this)} get_channel_items={this.get_channel_items.bind(this)} get_contractor_items={this.get_contractor_items.bind(this)} get_exchange_tokens={this.get_exchange_tokens.bind(this)} get_job_items={this.get_job_items.bind(this)} get_mail_items={this.get_mail_items.bind(this)} get_post_items={this.get_post_items.bind(this)}
                get_proposal_items={this.get_proposal_items.bind(this)} get_storefront_items={this.get_storefront_items.bind(this)} get_subscription_items={this.get_subscription_items.bind(this)}

                add_id_to_contacts={this.add_id_to_contacts.bind(this)} open_edit_object={this.props.open_edit_object.bind(this)} open_award_ui={this.open_give_awards.bind(this)}

                get_job_objects_responses={this.props.get_job_objects_responses.bind(this)} get_objects_messages={this.props.get_objects_messages.bind(this)} get_contractor_applications={this.props.get_contractor_applications.bind(this)} get_post_award_data={this.props.get_post_award_data.bind(this)} get_e5_data={this.get_e5_data.bind(this)} show_add_comment_bottomsheet={this.props.show_add_comment_bottomsheet.bind(this)}

                get_contract_event_data={this.props.get_contract_event_data.bind(this)} get_proposal_event_data={this.props.get_proposal_event_data.bind(this)} get_subscription_event_data={this.props.get_subscription_event_data.bind(this)} get_exchange_event_data={this.props.get_exchange_event_data.bind(this)} get_moderator_event_data={this.props.get_moderator_event_data.bind(this)} get_accounts_payment_information={this.props.get_accounts_payment_information.bind(this)} show_depthmint_bottomsheet={this.props.show_depthmint_bottomsheet.bind(this)} open_wallet_guide_bottomsheet={this.props.open_wallet_guide_bottomsheet.bind(this)} pin_bag={this.pin_bag.bind(this)} pin_channel={this.pin_channel.bind(this)} pin_item={this.pin_item.bind(this)} pin_post={this.pin_post.bind(this)} pin_subscription={this.pin_subscription.bind(this)} pin_proposal={this.pin_proposal.bind(this)} pin_contractor={this.pin_contractor.bind(this)} pin_contract={this.pin_contract.bind(this)} pin_job={this.pin_job.bind(this)} get_channel_event_data={this.props.get_channel_event_data.bind(this)} open_e5_link={this.open_e5_link.bind(this)} open_rpc_settings={this.open_rpc_settings.bind(this)} get_wallet_data_for_specific_e5={this.props.get_wallet_data_for_specific_e5.bind(this)}
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

    open_give_awards(item){
        this.props.show_give_award_bottomsheet(item)
    }

    open_rpc_settings(item){
        this.props.show_rpc_settings_bottomsheet(item)
    }




    

    is_in_pinned_section(){
        if(this.state.page == '?'){
            var selected_item = this.get_selected_item(this.state.work_page_tags_object, this.state.work_page_tags_object['i'].active)

            if(selected_item == this.props.app_state.loc['1222']/* 'pinned' */){
                return true
            } 
            return false
        }
        else if(this.state.page == 'e'){
            var selected_item = this.get_selected_item(this.state.explore_page_tags_object, this.state.explore_page_tags_object['i'].active)

            if(selected_item == this.props.app_state.loc['1222']/* 'pinned' */){
                return true
            } 
            return false
        }
        return false
    }

    pin_bag(item){
        var id = item['id']
        var pinned_bag_clone = this.state.pinned_bags.slice()
        var pos = pinned_bag_clone.indexOf(id)
        if(pos == -1){
            pinned_bag_clone.push(id)
            this.setState({pinned_bags: pinned_bag_clone})
            this.update_cookies()
            this.props.notify(this.props.app_state.loc['1235']/* 'Bag Pinned.' */,900)
        }else{
            pinned_bag_clone.splice(pos, 1)
            this.setState({pinned_bags: pinned_bag_clone})
            this.update_cookies()
            this.props.notify(this.props.app_state.loc['1236']/* 'Bag Unpinned' */,900)

            if(this.is_in_pinned_section){
                if(this.props.screensize == 's'){
                    this.open_view_object_bottomsheet()
                }
            }
        }
    }

    pin_channel(item){
        var id = item['id']
        var pinned_channel_clone = this.state.pinned_channels.slice()
        var pos = pinned_channel_clone.indexOf(id)
        if(pos == -1){
            pinned_channel_clone.push(id)
            this.setState({pinned_channels: pinned_channel_clone})
            this.update_cookies()
            this.props.notify(this.props.app_state.loc['1237']/* 'Channel Pinned' */,900)
        }else{
            pinned_channel_clone.splice(pos, 1)
            this.setState({pinned_channels: pinned_channel_clone})
            this.update_cookies()
            this.props.notify(this.props.app_state.loc['1238']/* 'Channel Unpinned' */,900)

            if(this.is_in_pinned_section){
                if(this.props.screensize == 's'){
                    this.open_view_object_bottomsheet()
                }
            }
        }
    }

    pin_item(item){
        var id = item['id']
        var pinned_item_clone = this.state.pinned_item.slice()
        var pos = pinned_item_clone.indexOf(id)
        if(pos == -1){
            pinned_item_clone.push(id)
            this.setState({pinned_item: pinned_item_clone})
            this.update_cookies()
            this.props.notify(this.props.app_state.loc['1239']/* 'Item Pinned' */,900)
        }else{
            pinned_item_clone.splice(pos, 1)
            this.setState({pinned_item: pinned_item_clone})
            this.update_cookies()
            this.props.notify(this.props.app_state.loc['1240']/* 'Item Unpinned' */,900)

            if(this.is_in_pinned_section){
                if(this.props.screensize == 's'){
                    this.open_view_object_bottomsheet()
                }
            }
        } 
    }

    pin_post(item){
        var id = item['id']
        var pinned_item_clone = this.state.pinned_post.slice()
        var pos = pinned_item_clone.indexOf(id)
        if(pos == -1){
            pinned_item_clone.push(id)
            this.setState({pinned_post: pinned_item_clone})
            this.update_cookies()
            this.props.notify(this.props.app_state.loc['1241']/* 'Post Pinned' */,900)
        }else{
            pinned_item_clone.splice(pos, 1)
            this.setState({pinned_post: pinned_item_clone})
            this.update_cookies()
            this.props.notify(this.props.app_state.loc['1242']/* 'Post Unpinned' */,900)

            if(this.is_in_pinned_section){
                if(this.props.screensize == 's'){
                    this.open_view_object_bottomsheet()
                }
            }
        }  
    }

    pin_subscription(item){
        var id = item['id']
        var pinned_item_clone = this.state.pinned_subscriptions.slice()
        var pos = pinned_item_clone.indexOf(id)
        if(pos == -1){
            pinned_item_clone.push(id)
            this.setState({pinned_subscriptions: pinned_item_clone})
            this.update_cookies()
            this.props.notify(this.props.app_state.loc['1243']/* 'Subscription Pinned' */,900)
        }else{
            pinned_item_clone.splice(pos, 1)
            this.setState({pinned_subscriptions: pinned_item_clone})
            this.update_cookies()
            this.props.notify(this.props.app_state.loc['1244']/* 'Subscription Unpinned' */,900)

            if(this.is_in_pinned_section){
                if(this.props.screensize == 's'){
                    this.open_view_object_bottomsheet()
                }
            }
        } 
    }

    pin_proposal(item){
        var id = item['id']
        var pinned_item_clone = this.state.pinned_proposal.slice()
        var pos = pinned_item_clone.indexOf(id)
        if(pos == -1){
            pinned_item_clone.push(id)
            this.setState({pinned_proposal: pinned_item_clone})
            this.update_cookies()
            this.props.notify(this.props.app_state.loc['1245']/* 'Proposal Pinned' */,900)
        }else{
            pinned_item_clone.splice(pos, 1)
            this.setState({pinned_proposal: pinned_item_clone})
            this.update_cookies()
            this.props.notify(this.props.app_state.loc['1246']/* 'Proposal Unpinned' */,900)

            if(this.is_in_pinned_section){
                if(this.props.screensize == 's'){
                    this.open_view_object_bottomsheet()
                }
            }
        }
    }

    pin_contractor(item){
        var id = item['id']
        var pinned_item_clone = this.state.pinned_contractor.slice()
        var pos = pinned_item_clone.indexOf(id)
        if(pos == -1){
            pinned_item_clone.push(id)
            this.setState({pinned_contractor: pinned_item_clone})
            this.update_cookies()
            this.props.notify(this.props.app_state.loc['1247']/* 'Contractor Pinned' */,900)
        }else{
            pinned_item_clone.splice(pos, 1)
            this.setState({pinned_contractor: pinned_item_clone})
            this.update_cookies()
            this.props.notify(this.props.app_state.loc['1248']/* 'Contractor Unpinned' */,900)

            if(this.is_in_pinned_section){
                if(this.props.screensize == 's'){
                    this.open_view_object_bottomsheet()
                }
            }
        }
    }

    pin_contract(item){
        var id = item['id']
        var pinned_item_clone = this.state.pinned_contract.slice()
        var pos = pinned_item_clone.indexOf(id)
        if(pos == -1){
            pinned_item_clone.push(id)
            this.setState({pinned_contract: pinned_item_clone})
            this.update_cookies()
            this.props.notify(this.props.app_state.loc['1249']/* 'Contract Pinned' */,900)
        }else{
            pinned_item_clone.splice(pos, 1)
            this.setState({pinned_contract: pinned_item_clone})
            this.update_cookies()
            this.props.notify(this.props.app_state.loc['1250']/* 'Contract Unpinned' */,900)

            if(this.is_in_pinned_section){
                if(this.props.screensize == 's'){
                    this.open_view_object_bottomsheet()
                }
            }
        }
    }

    pin_job(item){
        var id = item['id']
        var pinned_item_clone = this.state.pinned_job.slice()
        var pos = pinned_item_clone.indexOf(id)
        if(pos == -1){
            pinned_item_clone.push(id)
            this.setState({pinned_job: pinned_item_clone})
            this.update_cookies()
            this.props.notify(this.props.app_state.loc['1251']/* 'Job Pinned' */,900)
        }else{
            pinned_item_clone.splice(pos, 1)
            this.setState({pinned_job: pinned_item_clone})
            this.update_cookies()
            this.props.notify(this.props.app_state.loc['1252']/* 'Job Unpinned' */,900)

            if(this.is_in_pinned_section){
                if(this.props.screensize == 's'){
                    this.open_view_object_bottomsheet()
                }
            }
        }
    }




    add_id_to_contacts(account_id, item){
        if(account_id != this.props.app_state.user_account_id[item['e5']]){
            this.setState({contact_to_add: account_id, confirmation_dialog_box: true})
        }
    }

    render_dialog_ui(){
        return(
            <Dialog onClose = {() => this.cancel_dialog_box()} open = {this.state.confirmation_dialog_box}>
                <div style={{'padding': '10px', 'background-color':this.props.theme['send_receive_ether_background_color']}}>
                    <h3 style={{'margin':'0px 0px 5px 10px', 'color':this.props.theme['primary_text_color']}}>{this.props.app_state.loc['1253']/* Confirmation */}</h3>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['1254']/* 'Add To Contacts Confirmation' */, 'details':this.props.app_state.loc['1255']/* 'Confirm that you want to add the account ' */+this.state.contact_to_add+this.props.app_state.loc['1256']/* ' to your contacts' */, 'size':'s'})}

                    <div style={{height: 10}}/>
                    <div onClick={() => this.when_add_to_contacts_confirmation_received()}>
                        {this.render_detail_item('5', {'text':this.props.app_state.loc['1257']/* 'Add to Contacts' */, 'action':''})}
                    </div>
                </div>
                
            </Dialog>
        )
    }

    cancel_dialog_box(){
        this.setState({confirmation_dialog_box: false})
    }

    when_add_to_contacts_confirmation_received(){
        this.setState({confirmation_dialog_box: false})
        this.props.add_account_to_contacts(this.state.contact_to_add)
    }





    render_page_tabs(){
        var items = [].concat(this.state.tabs).reverse()
        var background_color = this.props.theme['card_background_color']

        if(this.props.app_state.visible_tabs == 'e') return;

        if(items.length == 0){
            items = [1, 2, 3]
            return(
                <div style={{'margin':'3px 0px 0px 10px','padding': '0px 0px 0px 0px', 'background-color': 'transparent', height:48}}>
                    <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                        {items.map((item, index) => (
                            <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}}>
                                <div style={{height:47, width:97, 'background-color': background_color, 'border-radius': '8px','padding':'10px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                                    <div style={{'margin':'0px 0px 0px 0px'}}>
                                        <img src={Letter} style={{height:20 ,width:'auto'}} />
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
        return(
            <div style={{'margin':'3px 0px 0px 10px','padding': '0px 0px 0px 0px', 'background-color': 'transparent', height:48}}>
                <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                    {items.map((item, index) => (
                        <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}} onClick={()=>this.when_tab_clicked(item)}>
                            {this.render_tab_item(item)}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    truncate(source, size) {
        return source.length > size ? source.slice(0, size - 1) + "…" : source;
    }


    get_object_details(tem){
        if(tem['selected_tag'] == this.props.app_state.loc['1196']/* 'jobs' */){
            var object = this.get_item_in_array2(tem['e5_id'],this.get_all_sorted_objects(this.props.app_state.created_jobs))
            if(object != null){
                return object['ipfs'].entered_title_text
            }
        }
        else if(tem['selected_tag'] == this.props.app_state.loc['contracts']/* 'contracts' */){
            var object = this.get_item_in_array2(tem['e5_id'],this.get_all_sorted_objects(this.props.app_state.created_contracts))
            if(object != null && object['ipfs'] != null){
                return object['ipfs'].entered_title_text
            }else{
                return tem['e5_id']
            }
        }
        else if(tem['selected_tag'] == this.props.app_state.loc['1198']/* 'contractors' */){
            var object = this.get_item_in_array2(tem['e5_id'],this.get_all_sorted_objects(this.props.app_state.created_contractors))
            if(object != null){
                return object['ipfs'].entered_title_text
            }
        }
        else if(tem['selected_tag'] == this.props.app_state.loc['1199']/* 'proposals' */){
            var object = this.get_item_in_array2(tem['e5_id'],this.get_all_sorted_objects(this.props.app_state.my_proposals))
            if(object != null){
                return object['ipfs'].entered_title_text
            }
        }
        else if(tem['selected_tag'] == this.props.app_state.loc['1200']/* 'subscriptions' */){
            var object = this.get_item_in_array2(tem['e5_id'],this.get_all_sorted_objects(this.props.app_state.created_subscriptions))
            if(object != null){
                return object['ipfs'].entered_title_text
            }
        }
        else if(tem['selected_tag'] == this.props.app_state.loc['1213']/* 'posts' */){
            var object = this.get_item_in_array2(tem['e5_id'],this.get_all_sorted_objects(this.props.app_state.created_posts))
            if(object != null){
                return object['ipfs'].entered_title_text
            }
        }
        else if(tem['selected_tag'] == this.props.app_state.loc['1214']/* 'channels' */){
            var object = this.get_item_in_array2(tem['e5_id'],this.get_all_sorted_objects(this.props.app_state.created_channels))
            if(object != null){
                return object['ipfs'].entered_title_text
            }
        }
        else if(tem['selected_tag'] == this.props.app_state.loc['1215']/* 'storefront' */){
            var object = this.get_item_in_array2(tem['e5_id'],this.get_all_sorted_objects(this.props.app_state.created_stores))
            if(object != null){
                return object['ipfs'].entered_title_text
            }
        }
        else if(tem['selected_tag'] == this.props.app_state.loc['1216']/* 'bags' */){
            var object = this.get_item_in_array2(tem['e5_id'],this.get_all_sorted_objects(this.props.app_state.created_stores))
            if(object != null){
                return object['ipfs'].entered_title_text
            }
        }
        else if(tem['selected_tag'] == this.props.app_state.loc['1218']/* 'ends ☝️' */){
            var object = this.get_item_in_array2(tem['e5_id'],this.get_all_sorted_objects(this.props.app_state.created_tokens))
            if(object != null && object['ipfs'] != null){
                return object['ipfs'].entered_title_text
            }else{
                return tem['e5_id']
            }
        }
        else if(tem['selected_tag'] == this.props.app_state.loc['1219']/* 'spends 🫰' */){
            var object = this.get_item_in_array2(tem['e5_id'],this.get_all_sorted_objects(this.props.app_state.created_tokens))
            if(object != null && object['ipfs'] != null){
                return object['ipfs'].entered_title_text
            }else{
                return tem['e5_id']
            }
        }
        return ''
    }

    render_tab_item(item){
        if(this.is_tab_active(item)){
            return(
                <div>
                    <div style={{height:'1px', 'background-color':'#C1C1C1', 'margin': '0px 5px 3px 5px'}}/>
                    {this.render_detail_item('3', {'title':this.get_title(item), 'details':this.truncate(this.get_object_details(item), 15), 'size':'s', 'padding':'5px 12px 5px 12px'})}
                </div>
            )
        }else{
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.get_title(item), 'details':this.truncate(this.get_object_details(item), 15), 'size':'s', 'padding':'5px 12px 5px 12px'})}
                </div>
            )
        }
    }

    get_title(item){
        var obj = {'contracts':'📑', 'jobs':'💼', 'contractors':'👷🏻‍♀️', 'storefront':'🏪','subscriptions':'🎫', 'posts':'📰','channels':'📡','E5tokens':'🪙','externals':'🌕', 'proposals':'🧎', 'mail':'📬', 'bags':'🛍', 'ends ☝️':'', 'spends 🫰':''}
        obj[this.props.app_state.loc['1197']/* contracts */] = '📑'
        obj[this.props.app_state.loc['1196']/* jobs */] = '💼'
        obj[this.props.app_state.loc['1198']/* contractors */] = '👷🏻‍♀️'
        obj[this.props.app_state.loc['1215']/* storefront */] = '🏪'
        obj[this.props.app_state.loc['1200']/* subscriptions */] = '🎫'
        obj[this.props.app_state.loc['1213']/* posts */] = '📰'
        obj[this.props.app_state.loc['1214']/* channels */] = '📡'
        obj[this.props.app_state.loc['1258']/* E5tokens */] = '🪙'
        obj[this.props.app_state.loc['1259']/* externals */] = '🌕'
        obj[this.props.app_state.loc['1199']/* proposals */] = '🧎'
        obj[this.props.app_state.loc['1201']/* mail */] = '📬'
        obj[this.props.app_state.loc['1216']/* bags */] = '🛍'
        obj[this.props.app_state.loc['1218']/* ends ☝️ */] = ''
        obj[this.props.app_state.loc['1219']/* spends 🫰 */] = ''
        return `${obj[item['selected_tag']]} ${item['selected_tag']}`
    }

    is_tab_active(tem){
        var is_tab_active = false
        if(tem['selected_tag'] == this.props.app_state.loc['1196']/* 'jobs' */){
            var selected_item = this.state.selected_job_post_item
            var detail_selected_tag = this.state.detail_selected_tag == 'e' ? 'jobs' : this.state.detail_selected_tag
            if(detail_selected_tag == tem['selected_tag']){
                if(selected_item == tem['e5_id']){
                    is_tab_active = true
                }
            }
        }
        else if(tem['selected_tag'] == this.props.app_state.loc['1197']/* 'contracts' */){
            var selected_item = this.state.selected_contract_item
            if(this.state.detail_selected_tag == tem['selected_tag']){
                if(selected_item == tem['e5_id']){
                    is_tab_active = true
                }
            }
        }
        else if(tem['selected_tag'] == this.props.app_state.loc['1198']/* 'contractors' */){
            var selected_item = this.state.selected_contractor_item
            if(this.state.detail_selected_tag == tem['selected_tag']){
                if(selected_item == tem['e5_id']){
                    is_tab_active = true
                }
            }
        }
        else if(tem['selected_tag'] == this.props.app_state.loc['1199']/* 'proposals' */){
            var selected_item = this.state.selected_proposal_item
            if(this.state.detail_selected_tag == tem['selected_tag']){
                if(selected_item == tem['e5_id']){
                    is_tab_active = true
                }
            }
        }
        else if(tem['selected_tag'] == this.props.app_state.loc['1200']/* 'subscriptions' */){
            var selected_item = this.state.selected_subscription_item
            if(this.state.detail_selected_tag == tem['selected_tag']){
                if(selected_item == tem['e5_id']){
                    is_tab_active = true
                }
            }
        }
        else if(tem['selected_tag'] == this.props.app_state.loc['1213']/* 'posts' */){
            var selected_item = this.state.selected_post_item
            if(this.state.detail_selected_tag == tem['selected_tag']){
                if(selected_item == tem['e5_id']){
                    is_tab_active = true
                }
            }
        }
        else if(tem['selected_tag'] == this.props.app_state.loc['1214']/* 'channels' */){
            var selected_item = this.state.selected_channel_item
            if(this.state.detail_selected_tag == tem['selected_tag']){
                if(selected_item == tem['e5_id']){
                    is_tab_active = true
                }
            }
        }
        else if(tem['selected_tag'] == this.props.app_state.loc['1215']/* 'storefront' */){
            var selected_item = this.state.selected_storefront_item
            if(this.state.detail_selected_tag == tem['selected_tag']){
                if(selected_item == tem['e5_id']){
                    is_tab_active = true
                }
            }
        }
        else if(tem['selected_tag'] == this.props.app_state.loc['1216']/* 'bags' */){
            var selected_item = this.state.selected_bag_item
            if(this.state.detail_selected_tag == tem['selected_tag']){
                if(selected_item == tem['e5_id']){
                    is_tab_active = true
                }
            }
        }
        else if(tem['selected_tag'] == this.props.app_state.loc['1218']/* 'ends ☝️' */){
            var selected_item = this.state.selected_end_item
            if(this.state.detail_selected_tag == tem['selected_tag']){
                if(selected_item == tem['e5_id']){
                    is_tab_active = true
                }
            }
        }
        else if(tem['selected_tag'] == this.props.app_state.loc['1219']/* 'spends 🫰' */){
            var selected_item = this.state.selected_spend_item
            if(this.state.detail_selected_tag == tem['selected_tag']){
                if(selected_item == tem['e5_id']){
                    is_tab_active = true
                }
            }
        }

        return is_tab_active;
    }


    when_tab_clicked(item){
        let me = this;
        if(Date.now() - this.last_all_click_time < 200){
            //double tap
            me.remove_tab_item(item)
            clearTimeout(this.all_timeout);
        }else{
            this.all_timeout = setTimeout(function() {
                clearTimeout(this.all_timeout);
                // single tap
                me.focus_tab(item)
            }, 200);
        }
        this.last_all_click_time = Date.now();
    }

    remove_tab_item(item){
        var cloned_array = this.state.tabs.slice()
        const index = cloned_array.indexOf(item);
        if (index > -1) { // only splice array when item is found
            cloned_array.splice(index, 1); // 2nd parameter means remove one item only

            var prev_index = index -1;
            if(this.is_tab_active(item) && prev_index > -1){
                this.focus_tab(this.state.tabs[prev_index])
            }
            this.setState({tabs: cloned_array})
            this.update_cookies()
        }
    }

    focus_tab(tem){
        if(tem['selected_tag'] == this.props.app_state.loc['1196']/* 'jobs' */){
            this.setState({detail_page: tem['selected_page'], detail_selected_tag: tem['selected_tag'], selected_job_post_item:  tem['e5_id']})
        }
        else if(tem['selected_tag'] == this.props.app_state.loc['1197']/* 'contracts' */){
            this.setState({detail_page: tem['selected_page'], detail_selected_tag:tem['selected_tag'], selected_contract_item: tem['e5_id']})
        }
        else if(tem['selected_tag'] == this.props.app_state.loc['1198']/* 'contractors' */){
            this.setState({detail_page: tem['selected_page'], detail_selected_tag:tem['selected_tag'], selected_contractor_item: tem['e5_id']})
        }
        else if(tem['selected_tag'] == this.props.app_state.loc['1199']/* 'proposals' */){
            this.setState({detail_page: tem['selected_page'], detail_selected_tag:tem['selected_tag'], selected_proposal_item: tem['e5_id']})
        }
        else if(tem['selected_tag'] == this.props.app_state.loc['1200']/* 'subscriptions' */){
            this.setState({detail_page: tem['selected_page'], detail_selected_tag:tem['selected_tag'], selected_subscription_item: tem['e5_id']})
        }
        else if(tem['selected_tag'] == this.props.app_state.loc['1213']/* 'posts' */){
           this.setState({detail_page: tem['selected_page'], detail_selected_tag:tem['selected_tag'], selected_post_item: tem['e5_id']})
        }
        else if(tem['selected_tag'] == this.props.app_state.loc['1214']/* 'channels' */){
           this.setState({detail_page: tem['selected_page'], detail_selected_tag:tem['selected_tag'], selected_channel_item: tem['e5_id']})
        }
        else if(tem['selected_tag'] == this.props.app_state.loc['1215']/* 'storefront' */){
            this.setState({detail_page: tem['selected_page'], detail_selected_tag:tem['selected_tag'], selected_storefront_item: tem['e5_id']})
        }
        else if(tem['selected_tag'] == this.props.app_state.loc['1216']/* 'bags' */){
            this.setState({detail_page: tem['selected_page'], detail_selected_tag:tem['selected_tag'], selected_bag_item: tem['e5_id']})
        }
        else if(tem['selected_tag'] == this.props.app_state.loc['1218']/* 'ends ☝️' */){
            this.setState({detail_page: tem['selected_page'], detail_selected_tag:tem['selected_tag'], selected_end_item: tem['e5_id'] })
        }
        else if(tem['selected_tag'] == this.props.app_state.loc['1219']/* 'spends 🫰' */){
           this.setState({detail_page: tem['selected_page'], detail_selected_tag:tem['selected_tag'], selected_spend_item: tem['e5_id']})
        }
    }


    open_e5_link(item, object){
        this.props.enable_tabs()
        var me = this;
        setTimeout(function() {
            me.add_to_tab(object['e5_id'], object['id'])
        }, (1 * 500));

        setTimeout(function() {
            me.check_if_link_is_visible(item)
        }, (1 * 900));
    }

    check_if_link_is_visible(item){
        if(item['type'] == 'post'){
            var all_posts = this.get_all_sorted_objects(this.props.app_state.created_posts)
            var post = this.get_item_in_array2(item['id']+item['e5'], all_posts)
            if(post == null){
                this.props.notify(this.props.app_state.loc['1264a']/* That link is unavailable. */)
            }else{
                var required_subscriptions = post['ipfs'].selected_subscriptions
                if(required_subscriptions == null) {
                    this.open_link(item)
                }
                if(this.check_if_sender_has_paid_subscriptions(required_subscriptions)){
                   this.open_link(item) 
                }else{
                    this.show_post_item_preview_with_subscription(post)
                }
            }
        }else{
            this.open_link(item)
        }
    }

    check_if_sender_has_paid_subscriptions(required_subscriptions){
        var has_sender_paid_all_subs = true
        required_subscriptions.forEach(subscription_id => {
            var subscription_item = this.get_all_sorted_objects_mappings(this.props.app_state.created_subscription_object_mapping)[subscription_id]
            if(subscription_item == null) return false
            if(subscription_item['payment'] == 0){
                has_sender_paid_all_subs = false
            }
        });

        return has_sender_paid_all_subs
    }

    open_link(item){
        console.log('opening link')
        var obj = {'contract':['?','contracts'],'channel':['e','channels'],'contractor':['?','contractors'],'job':['?','jobs'],'post':['e','posts'],'proposal':['?','proposals'],'storefront':['e','storefront'],'subscription':['?','subscriptions'],'token':['w',this.get_token_type_if_token(item)],}

        var selected_page = obj[item['type']][0]
        var selected_tag = obj[item['type']][1]

        this.setState({detail_page:selected_page, detail_selected_tag:selected_tag})
        this.add_link_to_tab(item['id']+item['e5'], item['id'], selected_page, selected_tag)

        var tem = selected_tag;
        if(tem == this.props.app_state.loc['1196']/* 'jobs' */){
            this.setState({selected_job_post_item:  item['id']+item['e5']})
        }
        else if(tem == this.props.app_state.loc['1197']/* 'contracts' */){
            this.setState({selected_contract_item: item['id']+item['e5']})
        }
        else if(tem == this.props.app_state.loc['1198']/* 'contractors' */){
            this.setState({selected_contractor_item: item['id']+item['e5']})
        }
        else if(tem == this.props.app_state.loc['1199']/* 'proposals' */){
            this.setState({selected_proposal_item: item['id']+item['e5']})
        }
        else if(tem == this.props.app_state.loc['1200']/* 'subscriptions' */){
            this.setState({selected_subscription_item: item['id']+item['e5']})
        }
        else if(tem == this.props.app_state.loc['1213']/* 'posts' */){
           this.setState({selected_post_item: item['id']+item['e5']})
        }
        else if(tem == this.props.app_state.loc['1214']/* 'channels' */){
           this.setState({selected_channel_item: item['id']+item['e5']})
        }
        else if(tem == this.props.app_state.loc['1215']/* 'storefront' */){
            this.setState({selected_storefront_item: item['id']+item['e5']})
        }
        else if(tem == this.props.app_state.loc['1216']/* 'bags' */){
            this.setState({selected_bag_item: item['id']+item['e5']})
        }
        else if(tem == this.props.app_state.loc['1218']/* 'ends ☝️' */){
            this.setState({selected_end_item: item['id']+item['e5']})
        }
        else if(tem == this.props.app_state.loc['1219']/* 'spends 🫰' */){
           this.setState({selected_spend_item: item['id']+item['e5']})
        }

    }


    get_token_type_if_token(item){
        var obj = this.get_item_in_array2(item['id']+item['e5'], this.get_all_sorted_objects(this.props.app_state.created_tokens))

        if(obj != null){
            if(obj['data'][0][3/* <3>token_type */] == 3){
                return this.props.app_state.loc['1218']/* 'ends ☝️' */
            }else{
                return this.props.app_state.loc['1219']/* 'spends 🫰' */
            }
        }
    }

    add_link_to_tab(object_e5_id, object_id, selected_page, selected_tag){
        var clone = this.state.tabs.slice()

        if(this.does_tabs_contain_id(object_e5_id)){
            for(var i=0; i<clone.length; i++){
                if(clone[i]['e5_id'] == object_e5_id){
                    const index = i;
                    clone.splice(index, 1); // 2nd parameter means remove one item only
                }
            }
        }
        
        var obj = {'selected_tag':selected_tag, 'selected_page':selected_page, 'e5_id':object_e5_id, 'id':object_id}
        clone.push(obj)

        var me = this;
        setTimeout(function() {
            me.setState({tabs: clone})
            me.update_cookies()
        }, (1 * 100));

    }




    open_notification_link(id, e5, type){
        var obj = {'contract':['?','contracts'], 'mail':['?', 'mail'],'contractor':['?','contractors'],'job':['?','jobs'],'storefront':['e','storefront'],'bag':['e','bags'],'token':['w',this.get_token_type(id, e5)],}

        var selected_page = obj[type][0]
        var selected_tag = obj[type][1]
        var e5_id = id+e5

        this.setState({detail_page:selected_page, detail_selected_tag:selected_tag})
        
        if(selected_tag == this.props.app_state.loc['1196']/* 'jobs' */){
            this.setState({selected_job_post_item:  e5_id})
        }
        else if(selected_tag == this.props.app_state.loc['1197']/* 'contracts' */){
            this.setState({selected_contract_item: e5_id})
        }
        else if(selected_tag == this.props.app_state.loc['1198']/* 'contractors' */){
            this.setState({selected_contractor_item: e5_id})
        }
        else if(selected_tag == this.props.app_state.loc['1215']/* 'storefront' */){
            this.setState({selected_storefront_item: e5_id})
        }
        else if(selected_tag == this.props.app_state.loc['1216']/* 'bags' */){
            this.setState({selected_bag_item: e5_id})
        }
        else if(selected_tag == this.props.app_state.loc['1218']/* 'ends ☝️' */){
            this.setState({selected_end_item: e5_id})
        }
        else if(selected_tag == this.props.app_state.loc['1219']/* 'spends 🫰' */){
           this.setState({selected_spend_item: e5_id})
        }
        else if(selected_tag == this.props.app_state.loc['1201']/* 'mail' */){
            this.setState({selected_mail_item: id})
        }

        if(this.props.screensize == 's'){
            this.open_view_object_bottomsheet()
        }

        if(this.props.app_state.visible_tabs != 'e' && type != 'bag' && type != 'mail'){
            this.add_link_to_tab(e5_id, id, selected_page, selected_tag)
        }
    }

    get_token_type(id, e5){
        var obj = this.get_item_in_array2(id+e5, this.get_all_sorted_objects(this.props.app_state.created_tokens))

        if(obj != null){
            if(obj['data'][0][3/* <3>token_type */] == 3){
                return this.props.app_state.loc['1218']/* 'ends ☝️' */
            }else{
                return this.props.app_state.loc['1219']/* 'spends 🫰' */
            }
        }
    }

















    /* renders the specific element in the post or detail object */
    render_detail_item(item_id, object_data){
        return(
            <div>
                <ViewGroups item_id={item_id} object_data={object_data} theme={this.props.theme} />
            </div>
        )

    }


}




export default home_page;