import React, { Component } from 'react';
// import Letter from './../assets/letter.png'; 
import EndImg from './../assets/end_token_icon.png';
import SpendImg from './../assets/spend_token_icon.png';

import SwipeableBottomSheet from './../externals/SwipeableBottomSheet';
import { Sheet } from 'react-modal-sheet';
import './../main.css'

import Dialog from "@mui/material/Dialog";
import ViewGroups from './../components/view_groups'
import SwipeableViews from 'react-swipeable-views';
import TextInput from './../components/text_input';

import Tags from './../components/tags';
import PostDetailSection from '../sections/detail_section';
import PostListSection from './../sections/list_section';
import FilterSection from './filter_section';
import PostPreview from './post_preview_page';
import NsfwPage from './nsfw_warning_page'

import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import CanvasJSReact from './../externals/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;


var bigInt = require("big-integer");
const Web3 = require('web3');



/* numberWithCommas */
function number_with_commas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function getOS() {
    // return 'iOS'
    if(iOS()) return 'iOS'
    const userAgent = window.navigator.userAgent,
        platform = window.navigator?.userAgentData?.platform || window.navigator.platform,
        macosPlatforms = ['macOS', 'Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
        windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
        iosPlatforms = ['iPhone', 'iPad', 'iPod'];
    let os = null;

    if (macosPlatforms.indexOf(platform) !== -1) {
        os = 'Mac OS';
    } else if (iosPlatforms.indexOf(platform) !== -1) {
        os = 'iOS';
    } else if (windowsPlatforms.indexOf(platform) !== -1) {
        os = 'Windows';
    } else if (/Android/.test(userAgent)) {
        os = 'Android';
    } else if (/Linux/.test(platform)) {
        os = 'Linux';
    }

    return os;
}

function iOS() {
  return [
    'iPad Simulator',
    'iPhone Simulator',
    'iPod Simulator',
    'iPad',
    'iPhone',
    'iPod'
  ].includes(navigator.platform)
  // iPad on iOS 13 detection
  || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
}


class home_page extends Component {
    
    state = {
        page: '?',
        work_page_tags_object:this.get_main_page_tag_object('?'), 
        explore_page_tags_object:this.get_main_page_tag_object('e'), 
        wallet_page_tags_object:this.get_main_page_tag_object('w'),
        selected_ether_item: null, selected_end_item: null, selected_spend_item: null, selected_e5_item: null, selected_proposal_item: null, selected_mail_item: null, selected_storefront_item: null, selected_bag_item: null, selected_coin_item:null, selected_audio_item:null, selected_video_item:null,
        
        view_post_bottomsheet: false, selected_contractor_item:null, filter_section_bottomsheet:false, post_preview_bottomsheet:false, post_nsfw_bottomsheet: false,

        viewed_posts:[],viewed_channels:[],viewed_jobs:[], viewed_contracts:[], viewed_subscriptions:[], viewed_proposals:[],viewed_stores:[], viewed_bags:[], viewed_contractors:[], viewed_audios:[],confirmation_dialog_box: false, contact_to_add:0, 
        
        pinned_bags:[], pinned_channels:[], pinned_item:[], pinned_post:[], pinned_subscriptions:[], pinned_proposal:[], pinned_contractor:[], pinned_contract:[], pinned_job:[], pinned_audios:[], pinned_videos:[],
        
        page_scroll_data:{}, page_search_data:{}, tags_search_data:{}, detail_page:'?', detail_selected_tag:'e', tabs:[], 

        details_container_width:0, typed_tag:'', search_visible:false
    };

    constructor(props) {
        super(props);
        this.work_list_section = React.createRef();
        this.explore_list_section = React.createRef();
        this.wallet_list_section = React.createRef();

        this.filter_section_page = React.createRef();
        this.post_preview_page = React.createRef();
        this.post_nsfw_page = React.createRef();

        this.details_container = React.createRef()
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
        var w = this.details_container.current?.getBoundingClientRect().width
        if(w == null) w = 0
        this.setState({details_container_width: w})
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
            if(cupcake_state.viewed_audios != null){
                this.setState({viewed_audios: cupcake_state.viewed_audios})
            }
            if(cupcake_state.pinned_audios != null){
                this.setState({pinned_audios: cupcake_state.pinned_audios})
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
            viewed_audios:this.state.viewed_audios,

            pinned_bags: this.state.pinned_bags,
            pinned_channels: this.state.pinned_channels,
            pinned_item: this.state.pinned_item,
            pinned_post: this.state.pinned_post,
            pinned_subscriptions: this.state.pinned_subscriptions,
            pinned_proposal: this.state.pinned_proposal,
            pinned_contractor: this.state.pinned_contractor,
            pinned_contract: this.state.pinned_contract,
            pinned_job: this.state.pinned_job,
            pinned_audios:this.state.pinned_audios,
            // tabs: this.state.tabs
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
              ['xor','e',1], [this.props.app_state.loc['1197']/* 'contracts' */,this.props.app_state.loc['1202']/* 'all' */,this.props.app_state.loc['1332e']/* 'main' */,this.props.app_state.loc['1204']/* 'created' */,this.props.app_state.loc['1203']/* 'viewed' */,this.props.app_state.loc['1206']/* 'entered' */, this.props.app_state.loc['1222']/* 'pinned' */], [1],[1]
          ],
          'contractors':[
              ['xor','e',1], [this.props.app_state.loc['1198']/* 'contractors' */,this.props.app_state.loc['1202']/* 'all' */,this.props.app_state.loc['1203']/* 'viewed' */,this.props.app_state.loc['1204']/* 'created' */,this.props.app_state.loc['1222']/* 'pinned' */], [1],[1]
          ],
          'proposals':[
              ['xor','e',1], [this.props.app_state.loc['1199']/* 'proposals' */,this.props.app_state.loc['1211']/* 'my-proposals' */, this.props.app_state.loc['1203']/* 'viewed' */, this.props.app_state.loc['1204']/* 'created' */, this.props.app_state.loc['1222']/* 'pinned' */], [1],[1]
          ],
          'subscriptions':[
              ['xor','e',1], [this.props.app_state.loc['1200']/* 'subscriptions' */,this.props.app_state.loc['1202']/* 'all' */,this.props.app_state.loc['1207']/* 'paid' */, this.props.app_state.loc['1332f']/* 'history' */,this.props.app_state.loc['1203']/* 'viewed' */,this.props.app_state.loc['1204']/* 'created' */, this.props.app_state.loc['1222']/* 'pinned' */], [1],[1]
          ],
          'mail':[
              ['xor','e',1], [this.props.app_state.loc['1201']/* 'mail' */,this.props.app_state.loc['1208']/* 'received' */,this.props.app_state.loc['1209']/* 'sent' */, this.props.app_state.loc['1210']/* 'active' */], [1],[1]
          ]
        };

        obj[this.props.app_state.loc['1196']/* 'jobs' */] = [
              ['xor','e',1], [this.props.app_state.loc['1196']/* 'jobs' */,this.props.app_state.loc['1202']/* 'all' */,this.props.app_state.loc['1203']/* 'viewed' */,this.props.app_state.loc['1204']/* 'created' */,this.props.app_state.loc['1205']/* 'applied' */, this.props.app_state.loc['1222']/* 'pinned' */, this.props.app_state.loc['1264c']/* 'job-notifications' */], [1],[1]
          ];

        obj[this.props.app_state.loc['1197']/* 'contracts' */] = [
              ['xor','e',1], [this.props.app_state.loc['1197']/* 'contracts' */,this.props.app_state.loc['1202']/* 'all' */, this.props.app_state.loc['1332e']/* 'main' */,this.props.app_state.loc['1204']/* 'created' */,this.props.app_state.loc['1203']/* 'viewed' */,this.props.app_state.loc['1206']/* 'entered' */, this.props.app_state.loc['1222']/* 'pinned' */, this.props.app_state.loc['1264d']/* 'contract-notifications' */], [1],[1]
          ]
        obj[this.props.app_state.loc['1198']/* 'contractors' */] = [
              ['xor','e',1], [this.props.app_state.loc['1198']/* 'contractors' */,this.props.app_state.loc['1202']/* 'all' */,this.props.app_state.loc['1203']/* 'viewed' */,this.props.app_state.loc['1204']/* 'created' */,this.props.app_state.loc['1222']/* 'pinned' */, this.props.app_state.loc['1264e']/* 'contractor-notifications' */], [1],[1]
          ]
        obj[this.props.app_state.loc['1199']/* 'proposals' */] = [
              ['xor','e',1], [this.props.app_state.loc['1199']/* 'proposals' */,this.props.app_state.loc['1211']/* 'my-proposals' */, this.props.app_state.loc['1203']/* 'viewed' */, this.props.app_state.loc['1204']/* 'created' */, this.props.app_state.loc['1222']/* 'pinned' */], [1],[1]
          ]
        obj[this.props.app_state.loc['1200']/* 'subscriptions' */] = [
              ['xor','e',1], [this.props.app_state.loc['1200']/* 'subscriptions' */,this.props.app_state.loc['1202']/* 'all' */,this.props.app_state.loc['1207']/* 'paid' */, this.props.app_state.loc['1332f']/* 'history' */,this.props.app_state.loc['1203']/* 'viewed' */,this.props.app_state.loc['1204']/* 'created' */, this.props.app_state.loc['1222']/* 'pinned' */, this.props.app_state.loc['1264b']/* upcoming */], [1],[1]
          ]
        obj[this.props.app_state.loc['1201']/* 'mail' */] = [
              ['xor','e',1], [this.props.app_state.loc['1201']/* 'mail' */,this.props.app_state.loc['1208']/* 'received' */,this.props.app_state.loc['1209']/* 'sent' */, this.props.app_state.loc['1210']/* 'active' */, this.props.app_state.loc['1264f']/* 'mail-notifications' */], [1],[1]
          ]

        return obj;
      }
      else if(page == 'e'/* content_section */){
        var obj = {
          'i':{
              active:'e', 
          },
          'e':[
              ['or','',0], ['e','e.'+this.props.app_state.loc['1212']/* 'e.E5s' */,'e.'+this.props.app_state.loc['1213']/* 'e.posts' */,'e.'+this.props.app_state.loc['1214']/* 'e.channels' */, 'e.'+this.props.app_state.loc['1215']/* 'e.storefront' */, 'e.'+this.props.app_state.loc['1216']/* 'e.bags' */, 'e.'+this.props.app_state.loc['1264k']/* 'e.audioport' */, 'e.'+this.props.app_state.loc['1264p']/* 'e.videoport' */], [0]
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
          'audioport':[
              ['xor','',0], [this.props.app_state.loc['1264k']/* 'audioport' */,this.props.app_state.loc['1202']/* 'all' */, this.props.app_state.loc['1264l']/* 'acquired' */, this.props.app_state.loc['1264m']/* 'playlists' */,this.props.app_state.loc['1203']/* 'viewed' */,this.props.app_state.loc['1204']/* 'created' */,this.props.app_state.loc['1222']/* 'pinned' */], [1],[1]
          ],
          'videoport':[
              ['xor','',0], [this.props.app_state.loc['1264p']/* 'videoport' */,this.props.app_state.loc['1202']/* 'all' */, this.props.app_state.loc['1264l']/* 'acquired' */,this.props.app_state.loc['1203']/* 'viewed' */,this.props.app_state.loc['1204']/* 'created' */,this.props.app_state.loc['1222']/* 'pinned' */], [1],[1]
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
              ['xor','',0], [this.props.app_state.loc['1215']/* 'storefront' */,this.props.app_state.loc['1202']/* 'all' */, this.props.app_state.loc['1203']/* 'viewed' */,this.props.app_state.loc['1204']/* 'created' */, this.props.app_state.loc['1222']/* 'pinned' */, this.props.app_state.loc['1264g']/* 'storefront-notifications' */], [1],[1]
          ]
        obj[this.props.app_state.loc['1216']/* 'bags' */] = [
              ['xor','e',1], [this.props.app_state.loc['1216']/* 'bags' */,this.props.app_state.loc['1202']/* 'all' */, this.props.app_state.loc['1203']/* 'viewed' */,this.props.app_state.loc['1204']/* 'created' */, this.props.app_state.loc['1222']/* 'pinned' */, this.props.app_state.loc['1264h']/* 'bag-notifications' */], [1],[1]
          ]
        obj[this.props.app_state.loc['1264k']/* 'audioport' */] = [
              ['xor','',0], [this.props.app_state.loc['1264k']/* 'audioport' */,this.props.app_state.loc['1202']/* 'all' */, this.props.app_state.loc['1264l']/* 'acquired' */, this.props.app_state.loc['1264m']/* 'playlists' */,this.props.app_state.loc['1203']/* 'viewed' */,this.props.app_state.loc['1204']/* 'created' */,this.props.app_state.loc['1222']/* 'pinned' */], [1],[1]
          ]
        obj[this.props.app_state.loc['1264p']/* 'videoport' */] = [
            ['xor','',0], [this.props.app_state.loc['1264p']/* 'videoport' */,this.props.app_state.loc['1202']/* 'all' */, this.props.app_state.loc['1264l']/* 'acquired' */,this.props.app_state.loc['1203']/* 'viewed' */,this.props.app_state.loc['1204']/* 'created' */,this.props.app_state.loc['1222']/* 'pinned' */], [1],[1]
        ]

        return obj
      }
      else{/* wallet_section */
        return{
          'i':{
              active:'e', 
          },
          'e':[
              ['xor','',0], ['e',this.props.app_state.loc['1264j']/* 'coins 🪙' */,this.props.app_state.loc['1217']/* 'ethers ⚗️' */, this.props.app_state.loc['1218']/* 'ends ☝️' */, this.props.app_state.loc['1219']/* 'spends 🫰' */, this.props.app_state.loc['1264i']/* 'wallet-notifications' */],[1]
          ],
        }
      }
      
    }

    

    render(){
        var size = this.props.screensize;
        var top_bar = 50;
        var middle = this.props.height-126;
        var bottom_bar = 65;
        var width = this.props.width;
        var navbar_color = this.props.theme['nav_bar_color'];
        var background_color = this.props.theme['homepage_background_color'];
        var back = this.props.theme['background']

        if(size == 'l'){
            var middle = this.props.height-112;
            return (
                <div style={{}}>
                    <div className="row" style={{height: this.props.height, width:width+13, 'background-color':background_color, 'padding':'0px 0px 0px 15px'}}>
                        {this.render_side_bar()}

                        <div className="col-11" style={{backgroundImage: `url(${back})` , backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}} >
                            <div style={{height:top_bar, 'padding':'9px 0px 0px 5px'}}>
                                {this.render_top_tag_bar(size)}
                            </div>
                            
                            {this.render_large_screen_ui(middle, size)}
                        </div>   
                    </div>
                    {this.render_filter_section_bottomsheet()}
                    {this.render_post_preview_bottomsheet()}
                    {this.render_nsfw_preview_bottomsheet()}
                    {this.render_dialog_ui()}
                    <ToastContainer limit={3} containerId="id3"/>
                </div>
            );
        }
        else if(size == 'xl'){
            var middle = this.props.height-113;
            return(
                <div style={{}}>
                    <div className="row" style={{height: this.props.height, width:width+13, 'background-color':background_color, 'padding':'0px 0px 0px 15px'}}>
                        {this.render_side_bar()}

                        <div className="col-11" style={{backgroundImage: `url(${back})` , backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}} >
                            <div style={{height:top_bar, width:'99%', 'padding':'9px 0px 0px 5px'}}>
                                {this.render_top_tag_bar(size)}
                            </div>
                            
                            <div className="row" style={{height:(middle+54), 'padding':'0px 10px 0px 15px'}}>
                                <div className="col-4" style={{height: (middle+55)}}>
                                    {this.render_post_list_group(size, (middle+55))}
                                </div>
                                
                                <div ref={this.details_container} className="col-4" style={{'padding':'3px 0px 0px 0px', 'margin':'0px 0px 0px 0px', 'background-color':this.props.theme['send_receive_ether_background_color'],'border-radius': '15px', height: (middle+55)}}>
                                    {this.render_post_detail_object(size, (middle+50), this.state.details_container_width)}
                                </div>
                                
                                <div className="col-4" style={{height: (middle+55)}}>
                                    {this.render_watch_account_ui()}
                                </div>

                            </div>
                        </div>   
                    </div>
                    {this.render_filter_section_bottomsheet()}
                    {this.render_post_preview_bottomsheet()}
                    {this.render_nsfw_preview_bottomsheet()}
                    {this.render_dialog_ui()}
                    <ToastContainer limit={3} containerId="id3"/>
                </div>
            )
        }
        else if(size == 'm'){
            var middle = this.props.height-126;
            return ( 
                <div className="row" style={{height: this.props.height, width:'102%','background-color':background_color, 'overflow': 'hidden'}}>
                    <div className="col" style={{backgroundImage: `url(${back})` , backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}>
                        <div style={{height:top_bar, width:width, 'padding':'9px 0px 0px 15px'}}>
                            {this.render_top_tag_bar(size)}
                        </div>
                        
                        <div style={{height:5}}/>
                        {this.render_post_details_with_orientation(middle, width, size)}
                        <div style={{height:10}}/>
                        
                        <div style={{height:bottom_bar, width: '103%', 'background-color':  navbar_color, 'border-radius': '0px 0px 0px 0px', 'padding':'0px 0px 0px 0px'}}>
                            {this.render_navbar_button_group(size)}
                        </div>
                        
                    </div>
                    {this.render_filter_section_bottomsheet()}
                    {this.render_post_preview_bottomsheet()}
                    {this.render_nsfw_preview_bottomsheet()}
                    {this.render_dialog_ui()}
                    <ToastContainer limit={3} containerId="id3"/>
                </div>
            );
        }
        else if(size == 's'){
            var bottom_bar = 75;
            return (
                <div style={{height: this.props.height, width:'100%','background-color':background_color, backgroundImage: `url(${back})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', 'overflow-y':'hidden'}}>
                    {this.render_small_screen_size_ui(size, top_bar, width)}
                    
                    <div style={{height:5}}/>
                    <div style={{height:bottom_bar, width:width, 'background-color': navbar_color,'display':'flex', 'align-items': 'center', 'border-radius': '0px 0px 0px 0px', 'padding':'0px 0px 0px 15px'}}>
                        {this.render_navbar_button_group(size)}
                    </div>

                    {this.render_view_object_bottomsheet()}
                    {this.render_filter_section_bottomsheet()}
                    {this.render_post_preview_bottomsheet()}
                    {this.render_nsfw_preview_bottomsheet()}
                    {this.render_dialog_ui()}
                    <ToastContainer limit={3} containerId="id3"/>
                </div>
            );
        }
        else{
            return(
                <div style={{height: this.props.height, width:'100%','display': 'flex', 'align-items':'center','justify-content':'center', 'background-color':background_color}}>
                    <img src={this.props.app_state.static_assets['letter']} style={{height:'auto',width:'18%'}} />
                </div>
            );
        }

    }

    render_large_screen_ui(middle, size){
        var width = this.props.width;
        if(width < 1100){
            //large
            return(
                <div>
                    <div className="row" style={{height:(middle+54), 'padding':'0px 10px 0px 15px'}}>
                        <div className="col-5" style={{height: (middle+55)}}>
                            {this.render_post_list_group(size, (middle+133))}
                        </div>
                        
                        <div ref={this.details_container} className="col-7" style={{'padding':'3px 0px 0px 0px', 'margin':'0px 0px 0px 0px', 'background-color':this.props.theme['send_receive_ether_background_color'],'border-radius': '15px', height: (middle+55)}}>
                            {this.render_post_detail_object(size, (middle+50), this.state.details_container_width)}
                        </div>
                    </div>
                </div>
            )
        }else{
            //extra-large
            return(
                <div>
                    <div className="row" style={{height:(middle+54), 'padding':'0px 1px 0px 15px'}}>
                        <div className="col-4" style={{height: (middle+55)}}>
                            {this.render_post_list_group(size, (middle+133))}
                        </div>
                        
                        <div ref={this.details_container} className="col-4" style={{'padding':'3px 0px 0px 0px', 'margin':'0px 0px 0px 0px', 'background-color':this.props.theme['send_receive_ether_background_color'],'border-radius': '15px', height: (middle+55)}}>
                            {this.render_post_detail_object(size, (middle+50), this.state.details_container_width)}
                        </div>
                        
                        <div className="col-4" style={{height: (middle+55)}}>
                            {this.render_metrics_section((middle+55))}
                        </div>

                    </div>
                </div>
            )
        }
    }

    render_small_screen_size_ui(size, top_bar, width){
        var orientation = this.props.app_state.homepage_tags_position

        if(orientation == this.props.app_state.loc['1593k']/* top */){
            return(
                <div>
                    <div style={{height:top_bar, width:width, 'padding':'9px 0px 0px 0px'}}>
                        {this.render_top_tag_bar(size)}
                    </div>
                    
                    <div style={{height:this.props.height-129, width:width, 'padding':'0px 5px 0px 5px'}}  >
                        {this.render_post_list_group(size, this.props.height-129)}
                    </div>
                </div>
            )
        }else{
            return(
                <div>
                    <div style={{height:this.props.height-129, width:width, 'padding':'0px 5px 0px 5px'}}  >
                        {this.render_post_list_group(size, this.props.height-129)}
                    </div>
                    <div style={{height:top_bar, width:width, 'padding':'9px 0px 0px 0px'}}>
                        {this.render_top_tag_bar(size)}
                    </div>
                </div>
            )
        }
    }

    render_side_bar(){
        var size = this.props.screensize;
        var top_bar = 50;
        var middle = this.props.height-126;
        var bottom_bar = 75;
        var width = this.props.width;
        var navbar_color = this.props.theme['nav_bar_color'];
        var background_color = this.props.theme['homepage_background_color'];
        var back = this.props.theme['background']
        var bar_width = 77
        return(
            <div className="col-1" style={{'margin':'20px 0px 2px 0px'}}>
                <div style={{height:15, width:bar_width, 'background-color': background_color,'border-radius': '20px 20px 0px 0px',  'border-width':'0px', 'border-color':navbar_color, 'border-style': 'solid solid hidden solid'}}/>
                <div style={{height:15, width:bar_width, 'background-color': navbar_color, opacity:0.2}}/>
                <div style={{height:15, width:bar_width, 'background-color': navbar_color, opacity:0.4}}/>
                <div style={{height:15, width:bar_width, 'background-color': navbar_color, opacity:0.6}}/>
                <div style={{height:(this.props.height-89), width:bar_width, 'background-color':  navbar_color,'border-radius': '0px 0px 20px 20px'}}>
                    {this.render_navbar_button_group(size)}
                </div>
            </div>
        )
    }

    render_post_details_with_orientation(middle, width, size){
        var orientation = this.props.details_orientation;
        var h = middle
        var w = this.props.width/2
        if(orientation == 'right'){
            return(
                <div className="row" style={{height:middle, width:width-10, 'margin':'0px 0px 0px 0px'}}>
                    <div className="col-6" style={{}}>
                        {this.render_post_list_group(size, h+10)}
                    </div>

                    <div className="col-6" style={{'padding':'3px 1px 0px 0px', 'background-color':this.props.theme['send_receive_ether_background_color'],'border-radius': '15px', height: (middle)}}>
                        {this.render_post_detail_object(size, h, w)}
                    </div>

                </div>
            );
        }else{
            return(
                <div className="row" style={{height:middle, width:width-10, 'margin':'0px 0px 0px 0px'}}>
                    <div className="col-6" style={{'padding':'3px 1px 0px 0px', 'background-color':this.props.theme['send_receive_ether_background_color'],'border-radius': '15px', height: (middle)}}>
                        {this.render_post_detail_object(size, h, w)}
                    </div>

                    <div className="col-6" style={{}}>
                        {this.render_post_list_group(size, h+10)}
                    </div>

                </div>
            );
        }
    }

    render_view_object_bottomsheet(){
        if(this.state.view_post_bottomsheet2 != true) return;
        var background_color = this.props.theme['send_receive_ether_background_color'];
        var overlay_background = this.props.theme['send_receive_ether_overlay_background'];
        var size = this.props.screensize;
        var os = getOS()
        if(os == 'iOS'){
            return(
                <Sheet isOpen={this.state.view_post_bottomsheet} onClose={this.open_view_object_bottomsheet.bind(this)} detent="content-height" disableDrag={true} >
                    <Sheet.Container>
                        <Sheet.Content>
                            <div style={{ height: this.props.height-1, 'background-color':background_color, 'border-style': 'solid', 'border-color': 'transparent', 'border-radius': '0px 0px 0px 0px','margin': '0px 0px 0px 0px', 'padding':'0px 0px 0px 0px' }}>
                                {this.render_post_detail_object(size, this.props.height-40, this.props.width)}
                            </div>
                        </Sheet.Content>
                        <ToastContainer limit={3} containerId="id3"/>
                    </Sheet.Container>
                    <Sheet.Backdrop onTap={()=> this.open_view_object_bottomsheet()}/>
                </Sheet>
            )
        }
        var m = '0px -11px 0px 0px';
        m = '0px 0px 0px 0px'
        return(
            <SwipeableBottomSheet fullScreen={true}  overflowHeight={0} marginTop={0} onChange={this.open_view_object_bottomsheet.bind(this)} open={this.state.view_post_bottomsheet} style={{'z-index':'5',}} bodyStyle={{'background-color': 'transparent', 'margin':m, 'padding':'0px 0px 0px 0px'}} overlayStyle={{'background-color': overlay_background}}>
                <div style={{ height: this.props.height-1, 'background-color':background_color, 'border-style': 'solid', 'border-color': 'transparent', 'border-radius': '5px 5px 0px 0px','margin': '0px 0px 0px 0px', 'padding':'0px 0px 0px 0px' }}>
                    {this.render_post_detail_object(size, this.props.height, this.props.width)}
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
        var line_margin = '0px '+this.get_navbar_line_margin_percentage()+' 0px 0px'
        if(size == 'm'){
          return ( 
              <div className="row" style={{'padding':'0px 0px 0px 10px', height:'100%', width:'100%'}}>
                  <div className="col" style={{'background-color': this.get_navbar_normal_or_highlighted_button_background('?'),'padding':'5px 0px 0px 30px', 'border-radius': '0px 0px 0px 0px'}} onClick={()=> this.when_bottom_navbar_button_clicked('?')}>
                      {this.render_navbar_button('l','4px 0px 0px 12px', this.props.theme['JobIcon'], 'auto', '70px','3px 12px 3px 19px','????',this.props.app_state.loc['1223']/* 'Work Contracts' */)}
                  </div>

                  <div className="col" style={{'padding':'5px 0px 0px 30px','background-color': this.get_navbar_normal_or_highlighted_button_background('e')}} onClick={() => this.when_bottom_navbar_button_clicked('e')}>
                    {this.render_navbar_button('l','5px 0px 0px 3px', this.props.theme['ExploreIcon'], 'auto', '60px','5px 11px 0px 20px',this.props.app_state.loc['1224']/* 'Explore' */,this.props.app_state.loc['1225']/* 'Deployed E5s' */)}
                  </div>

                  <div className="col" style={{'padding':'5px 0px 0px 30px', 'background-color': this.get_navbar_normal_or_highlighted_button_background('w')}} onClick={() => this.when_bottom_navbar_button_clicked('w')}>
                    {this.render_navbar_button('l','5px 0px 0px 15px', this.props.theme['WalletIcon'], 'auto', '70px','5px 10px 6px 17px',this.props.app_state.loc['1226']/* 'Wallet' */,this.props.app_state.loc['1227']/* 'Coin & Tokens' */)}
                  </div>
                  
                  <div className="col" style={{'padding':'5px 0px 0px 30px'}} onClick={() => this.when_bottom_navbar_button_clicked('s')}>
                    {this.render_navbar_button('l','5px 0px 0px 5px', this.props.theme['StackIcon'], 'auto', '59px','3px 11px 2px 12px',this.props.app_state.loc['1228']/* 'Stack' */,this.props.app_state.loc['1229']/* 'Runs on e' */)}
                  </div>
              </div>
          );
        }
        else if(size == 's'){
          return(
            <div className="row" style={{'padding':'0px 0px 0px 0px','display':'flex', 'align-items': 'center', height:'100%', width:'103%'}}>
                  <div className="col" style={{height: '100%', width:'100%', padding:'0px 0px 0px 0px', 'background-color': this.get_navbar_normal_or_highlighted_button_background('?'),'border-radius': '1px 0px 0px 0px'}} onClick={() => this.when_bottom_navbar_button_clicked('?')}>
                      {this.render_navbar_button('s','0px 0px 0px 0px', this.props.theme['JobIcon'], 'auto', '38px','5px 0px 0px 0px','????',this.props.app_state.loc['1223']/* 'Work Contracts' */)}
                  </div>

                  <div className="col" style={{height: '100%', width:'100%', padding:'0px 0px 0px 1px', 'background-color': this.get_navbar_normal_or_highlighted_button_background('e')}} onClick={() => this.when_bottom_navbar_button_clicked('e')}>
                      {this.render_navbar_button('s','0px 0px 0px 0px', this.props.theme['ExploreIcon'], 'auto', '30px','5px 0px 0px 0px',this.props.app_state.loc['1224']/* 'Explore' */,this.props.app_state.loc['1225']/* 'Deployed E5s' */)}
                  </div>

                  <div className="col" style={{height: '100%', width:'100%', padding:'0px 0px 0px 1px', 'background-color': this.get_navbar_normal_or_highlighted_button_background('w')}} onClick={() => this.when_bottom_navbar_button_clicked('w')}>
                    {this.render_navbar_button('s','0px 0px 0px 0px', this.props.theme['WalletIcon'], 'auto', '42px','6px 0px 0px 0px',this.props.app_state.loc['1226']/* 'Wallet' */,this.props.app_state.loc['1227']/* 'Coin & Tokens' */)}
                      
                  </div>

                  <div className="col" style={{height: '100%', width:'100%', padding:'5px 0px 0px 1px'}} onClick={() => this.when_bottom_navbar_button_clicked('s')}>
                    {this.render_navbar_button('s','0px 0px 0px 0px', this.props.theme['StackIcon'], 'auto', '31px','4px 0px 0px 0px',this.props.app_state.loc['1228']/* 'Stack' */,this.props.app_state.loc['1229']/* 'Runs on e' */)}
                  </div>
              </div>
          );
        }
        else if(size == 'l' || size == 'xl'){
            return ( 
                <div style={{height: '100%', width:'100%', padding:'5px 0px 0px 0px'}}>
                  <div style={{height:'1px', 'background-color':'#7E7E7E', 'margin': line_margin}}/>
                  <div style={{'background-color':this.get_navbar_normal_or_highlighted_button_background('?'), padding:'0px 5px 0px 0px'}} onClick={() => this.when_bottom_navbar_button_clicked('?')}>
                      {this.render_navbar_button('s', '1px 0px 10px 6px', this.props.theme['JobIcon'], 'auto', '60px','5px 12px 0px 11px','????',this.props.app_state.loc['1223']/* 'Work Contracts' */)} 
                  </div>
                

                  <div style={{height:'1px', 'background-color':'transparent', 'margin': '20px 12px 5px 0px'}}/>
                  <div style={{'background-color':this.get_navbar_normal_or_highlighted_button_background('e'), padding:'0px 5px 0px 0px'}} onClick={() => this.when_bottom_navbar_button_clicked('e')}>
                      {this.render_navbar_button('s', '0px 0px 10px 9px', this.props.theme['ExploreIcon'], 'auto', '50px','5px 11px 0px 10px',this.props.app_state.loc['1224']/* 'Explore' */,this.props.app_state.loc['1225']/* 'Deployed E5s' */)}
                      
                  </div>
                

                  <div style={{height:'1px', 'background-color':'transparent', 'margin': '20px 12px 5px 0px'}}/>
                  <div style={{'background-color':this.get_navbar_normal_or_highlighted_button_background('w'), padding:'0px 5px 0px 0px'}} onClick={() => this.when_bottom_navbar_button_clicked('w')}>
                    {this.render_navbar_button('s', '0px 0px 10px 9px', this.props.theme['WalletIcon'], 'auto', '55px','5px 10px 6px 10px',this.props.app_state.loc['1226']/* 'Wallet' */,this.props.app_state.loc['1227']/* 'Coin & Tokens' */)}
                      
                  </div>
                

                  <div style={{height:'1px', 'background-color':'transparent', 'margin': '10px 12px '+(this.props.height-460)+'px 0px'}} />
                    <div style={{'background-color':'transparent', padding:'0px 5px 0px 0px'}} onClick={() => this.when_bottom_navbar_button_clicked('s')}>
                        {this.render_navbar_button('s', '0px 0px 0px 9px', this.props.theme['StackIcon'], 'auto', '50px','1px 11px 2px 12px',this.props.app_state.loc['1228']/* 'Stack' */,this.props.app_state.loc['1229']/* 'Runs on e' */)}
                    </div>
                  <div style={{height:'1px', 'background-color':'transparent', 'margin': '0px 12px 5px 0px'}}/>
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

    get_navbar_line_margin_percentage(){
        var page = this.state.page
        if(page == '?'){
            return '80%'
        }
        else if(page == 'e'){
            return '55%'
        }
        else return '25%'
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

                    <p style={{'font-size': '12px','color': navbar_button_text_color,'margin': '0px 0px 0px 0px','font-family': this.props.app_state.font,'text-decoration': 'none', 'text-shadow': '-1px -1px 2px '+this.props.theme['navbar_text_shadow_color']}}>{title}</p>

                    <p style={{'font-size': '8px','color': navbar_button_secondary_text,'margin': '0px 0px 0px 0px','font-family': this.props.app_state.font,'text-decoration': 'none', 'font-weight': 'bold'}} className="text-capitalize">{tabs}</p>
                </div>
            );
        }else{
            return ( 
                <div className="row" style={{ width:'100%', 'padding':'7px 0px 0px 10px', 'border-radius': '0px 0px 0px 0px'}}>
                    <div className="col-3" style={{'padding':'0px 0px 10px 0px'}}>
                        <div style={{height:'7%', width:'100%'}}>
                            <img src={img} style={{height:img_height,width:img_width, padding: img_padding}}/>
                        </div>
                    </div>
                    <div className="col" style={{'padding':'0px 0px 0px 10px'}}>
                        <div style={{height:'7%', width:'100%', 'padding':text_padding}}>
                            <p style={{'font-size': '15px','color': navbar_button_text_color,'margin': '0px 0px 0px 0px','font-family': this.props.app_state.font,'text-decoration': 'none', 'text-shadow': '-1px -1px 2px '+this.props.theme['navbar_text_shadow_color']}}>{title}</p> 
                            <p style={{'font-size': '10px','color': navbar_button_secondary_text,'margin': '-5px 0px 0px 0px','font-family': this.props.app_state.font,'text-decoration': 'none', 'font-weight': 'bold'}} className="text-capitalize">{tabs}</p>
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
        var width = this.props.width-10;
        if(size == 'l'){
            var w = this.props.width
            if(w < 1100){
                width = this.props.width - 120;
            }else{
                width = this.props.width - 130;
            }
        } 
        if(size == 'xl') width = this.props.width - 120;
        if(size == 's') width = this.props.width
        return(
            <div style={{'display': 'flex','flex-direction': 'row','margin':'0px 0px 0px 0px', width: width}}>
                <div style={{'padding': '0px 0px 0px 10px', width:width-60}}>
                    {this.render_tag_bar_group(this.get_tag_group_option(),'l')}
                </div>
                <div style={{'padding': '0px 0px 0px 0px', width:60}}>
                    {this.render_e_plus_button()}
                </div>
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
        <img alt="" className="text-end" onClick={()=> this.when_e_button_tapped()} src={this.props.theme['add_icon']} style={{height:36, width:'auto', opacity:alpha}} />
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
        var data = {'storefront':'4','posts':'6','channels':'7', 'audioport':'10', 'videoport':'11'};
        data[this.props.app_state.loc['1215']/* storefront */] = '4'
        data[this.props.app_state.loc['1213']/* posts */] = '6'
        data[this.props.app_state.loc['1214']/* channels */] = '7'
        data[this.props.app_state.loc['1264k']/* audioport */] = '10'
        data[this.props.app_state.loc['1264p']/* 'videoport' */] = '11'
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
            // if(this.is_page_valid()) me.setState({search_visible: !me.state.search_visible})
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
        var me = this;
        setTimeout(function() {
            me.set_filter_section_data()
        }, (1 * 500));
        
    }

    set_filter_section_data(){
        var id = this.get_page_id() 
        var typed_searched_word = this.state.page_search_data[id]
        if(typed_searched_word == null) typed_searched_word = ''
        
        var added_tags = this.state.tags_search_data[id]
        if(added_tags == null) added_tags = []
        
        this.filter_section_page.current?.set_data(typed_searched_word, added_tags)
    }

    render_filter_section_bottomsheet(){
        if(this.state.filter_section_bottomsheet2 != true) return;
        var background_color = this.props.theme['send_receive_ether_background_color'];
        var size = this.props.size
        var os = getOS()
        var id = this.get_page_id()
        if(os == 'iOS'){
            return(
                <Sheet isOpen={this.state.filter_section_bottomsheet} onClose={this.open_filter_section_bottomsheet.bind(this)} detent="content-height" disableScrollLocking={true}>
                    <Sheet.Container>
                        {/* <Sheet.Header>
                            <div style={{'height':20, 'background-color':background_color,  'display': 'block', 'margin-left': 'auto', 'border-radius': '8px 8px 0px 0px', 'margin-right': 'auto', 'padding':'11px 0px 0px '+((this.props.width / 2) - 50)+'px'}} onClick={()=> this.open_filter_section_bottomsheet()}>
                                <div style={{height:5, width: 100, 'background-color':this.props.theme['bar_color'], 'border-radius': '2px', 'margin':'0px 0px 0px 0px'}}/>
                            </div>
                        </Sheet.Header> */}
                        <Sheet.Content>
                            <div style={{ height: 410, 'background-color': background_color, 'border-style': 'solid', 'border-color': 'transparent', 'border-radius': '1px 1px 0px 0px', 'border-width': '0px', 'box-shadow': '0px 0px 0px 0px '+this.props.theme['send_receive_ether_overlay_shadow'],'margin': '0px 0px 0px 0px', 'overflow-y':'auto'}}>
                                <FilterSection ref={this.filter_section_page} app_state={this.props.app_state} size={size} height={this.props.height} theme={this.props.theme} notify={this.props.notify.bind(this)} when_search_button_tapped={this.when_search_button_tapped.bind(this)} when_add_tags_button_tapped={this.when_add_tags_button_tapped.bind(this)} reset_scroll_height={this.reset_scroll_height.bind(this)}/>
                            </div>
                        </Sheet.Content>
                        <ToastContainer limit={3} containerId="id3"/>
                    </Sheet.Container>
                    <Sheet.Backdrop onTap={()=> this.open_filter_section_bottomsheet()}/>
                </Sheet>
            )
        }
        return(
        <SwipeableBottomSheet  overflowHeight={0} marginTop={0} onChange={this.open_filter_section_bottomsheet.bind(this)} open={this.state.filter_section_bottomsheet} style={{'z-index':'5'}} bodyStyle={{'background-color': 'transparent'}} overlayStyle={{'background-color': this.props.theme['send_receive_ether_overlay_background'],'box-shadow': '0px 0px 0px 0px '+this.props.theme['send_receive_ether_overlay_shadow']}}>
            <div style={{ height: 410, 'background-color': background_color, 'border-style': 'solid', 'border-color': this.props.theme['send_receive_ether_overlay_background'], 'border-radius': '1px 1px 0px 0px', 'border-width': '0px', 'box-shadow': '0px 0px 2px 1px '+this.props.theme['send_receive_ether_overlay_shadow'],'margin': '0px 0px 0px 0px', 'overflow-y':'auto'}}>
                <FilterSection ref={this.filter_section_page} app_state={this.props.app_state} size={size} height={this.props.height} theme={this.props.theme} notify={this.props.notify.bind(this)} when_search_button_tapped={this.when_search_button_tapped.bind(this)} when_add_tags_button_tapped={this.when_add_tags_button_tapped.bind(this)} reset_scroll_height={this.reset_scroll_height.bind(this)} />
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
            me.get_searched_data()
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
            me.get_searched_data()
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

    get_searched_data(){
        var id = this.get_page_id()
        var posts_to_load = []
        var searched_data = this.state.page_search_data[id]
        var searched_tags = this.state.tags_search_data[id]
        if(searched_data != null){
            posts_to_load = [searched_data].concat(posts_to_load)
        }
        if(searched_tags != null){
            posts_to_load = posts_to_load.concat(searched_tags)
        }
        this.props.fetch_objects_to_load_from_searched_tags(posts_to_load, this.get_selected_page())
    }

    get_selected_page(){
        var selected_page = ''
        if(this.state.page == '?'){
            selected_page = this.state.work_page_tags_object['i'].active
            if(selected_page == 'e') selected_page = this.props.app_state.loc['1196']/* 'jobs' */
        }
        else if(this.state.page == 'e'){
            selected_page = this.state.explore_page_tags_object['i'].active
        }
        else{
            //wallet
            selected_page = 'w'
        }
        return selected_page;
    }





    render_post_preview_bottomsheet(){
        if(this.state.post_preview_bottomsheet2 != true) return;
        var background_color = this.props.theme['send_receive_ether_background_color'];
        var size = this.props.size
        var os = getOS()
        if(os == 'iOS'){
            return(
                <Sheet isOpen={this.state.post_preview_bottomsheet} onClose={this.open_post_preview_bottomsheet.bind(this)} detent="content-height" disableDrag={true}>
                    <Sheet.Container>
                        <Sheet.Content>
                            {this.render_post_preview_element()}
                        </Sheet.Content>
                        <ToastContainer limit={3} containerId="id3"/>
                    </Sheet.Container>
                    <Sheet.Backdrop onTap={()=> this.open_post_preview_bottomsheet()}/>
                </Sheet>
            )
        }
        return(
        <SwipeableBottomSheet  overflowHeight={0} marginTop={0} onChange={this.open_post_preview_bottomsheet.bind(this)} open={this.state.post_preview_bottomsheet} style={{'z-index':'5'}} bodyStyle={{'background-color': 'transparent'}} overlayStyle={{'background-color': this.props.theme['send_receive_ether_overlay_background'],'box-shadow': '0px 0px 0px 0px '+this.props.theme['send_receive_ether_overlay_shadow']}}>
            {this.render_post_preview_element()}
        </SwipeableBottomSheet>
        )
    }

    render_post_preview_element(){
        var background_color = this.props.theme['send_receive_ether_background_color'];
        var size = this.props.size
        return(
            <div style={{ height: this.props.height-60, 'background-color': background_color, 'border-style': 'solid', 'border-color': this.props.theme['send_receive_ether_overlay_background'], 'border-radius': '1px 1px 0px 0px', 'border-width': '0px', 'box-shadow': '0px 0px 0px 0px '+this.props.theme['send_receive_ether_overlay_shadow'],'margin': '0px 0px 0px 0px', 'overflow-y':'auto'}}>
                <PostPreview ref={this.post_preview_page} app_state={this.props.app_state} size={size} height={this.props.height} theme={this.props.theme} notify={this.props.notify.bind(this)} when_post_preview_subscription_tapped={this.when_post_preview_subscription_tapped.bind(this)} pin_post={this.pin_post.bind(this)} pin_channel={this.pin_channel.bind(this)}  pin_audio={this.pin_audio.bind(this)} pin_video={this.pin_video.bind(this)}/>
            </div>
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

    open_post_preview_section(post, type){
        this.open_post_preview_bottomsheet()

        var me = this;
        setTimeout(function() {
            if(me.post_preview_page.current != null){
                me.post_preview_page.current?.set_post(post, type) 
            }
        }, (1 * 500));
    }

    when_post_preview_subscription_tapped(subscription){
        this.props.show_pay_subscription_bottomsheet(subscription)
    }









    render_nsfw_preview_bottomsheet(){
        if(this.state.post_nsfw_bottomsheet2 != true) return;
        var background_color = this.props.theme['send_receive_ether_background_color'];
        var size = this.props.size
        var os = getOS()
        if(os == 'iOS'){
             return(
                <Sheet isOpen={this.state.post_nsfw_bottomsheet} onClose={this.open_post_nsfw_bottomsheet.bind(this)} detent="content-height">
                    <Sheet.Container>
                        {/* <Sheet.Header>
                            <div style={{'height':20, 'background-color':background_color,  'display': 'block', 'margin-left': 'auto', 'border-radius': '8px 8px 0px 0px', 'margin-right': 'auto', 'padding':'11px 0px 0px '+((this.props.width / 2) - 50)+'px'}} onClick={()=> this.open_post_nsfw_bottomsheet()}>
                                <div style={{height:5, width: 100, 'background-color':this.props.theme['bar_color'], 'border-radius': '2px', 'margin':'0px 0px 0px 0px'}}/>
                            </div>
                        </Sheet.Header> */}
                        <Sheet.Content>
                            <div style={{ height: 370, 'background-color': background_color, 'border-style': 'solid', 'border-color': this.props.theme['send_receive_ether_overlay_background'], 'border-radius': '1px 1px 0px 0px', 'border-width': '0px', 'box-shadow': '0px 0px 0px 0px '+this.props.theme['send_receive_ether_overlay_shadow'],'margin': '0px 0px 0px 0px', 'overflow-y':'auto'}}>
                                <NsfwPage ref={this.post_nsfw_page} app_state={this.props.app_state} size={size} height={this.props.height} theme={this.props.theme} notify={this.props.notify.bind(this)} when_warning_ignored={this.when_warning_ignored.bind(this)}/>
                            </div>
                        </Sheet.Content>
                        <ToastContainer limit={3} containerId="id3"/>
                    </Sheet.Container>
                    <Sheet.Backdrop onTap={()=> this.open_post_nsfw_bottomsheet()}/>
                </Sheet>
            )
        }
        return(
        <SwipeableBottomSheet overflowHeight={0} marginTop={0} onChange={this.open_post_nsfw_bottomsheet.bind(this)} open={this.state.post_nsfw_bottomsheet} style={{'z-index':'5'}} bodyStyle={{'background-color': 'transparent'}} overlayStyle={{'background-color': this.props.theme['send_receive_ether_overlay_background'],'box-shadow': '0px 0px 0px 0px '+this.props.theme['send_receive_ether_overlay_shadow']}}>
            <div style={{ height: 370, 'background-color': background_color, 'border-style': 'solid', 'border-color': this.props.theme['send_receive_ether_overlay_background'], 'border-radius': '1px 1px 0px 0px', 'border-width': '0px', 'box-shadow': '0px 0px 2px 1px '+this.props.theme['send_receive_ether_overlay_shadow'],'margin': '0px 0px 0px 0px', 'overflow-y':'auto'}}>
                <NsfwPage ref={this.post_nsfw_page} app_state={this.props.app_state} size={size} height={this.props.height} theme={this.props.theme} notify={this.props.notify.bind(this)} when_warning_ignored={this.when_warning_ignored.bind(this)}/>
            </div>
        </SwipeableBottomSheet>
        )
    }

    open_post_nsfw_bottomsheet(){
        if(this.state.post_nsfw_bottomsheet == true){
            //closing
            this.setState({post_nsfw_bottomsheet: !this.state.post_nsfw_bottomsheet});
            var me = this;
            setTimeout(function() {
                me.setState({post_nsfw_bottomsheet2: false});
            }, (1 * 1000));
        }else{
            //opening
            this.setState({post_nsfw_bottomsheet2: true});
            var me = this;
            setTimeout(function() {
                if(me.state != null){
                    me.setState({post_nsfw_bottomsheet: !me.state.post_nsfw_bottomsheet});
                }
            }, (1 * 200));
        }
    }

    open_post_nsfw_section(index, id, e5, object, post_type){
        this.open_post_nsfw_bottomsheet()

        var me = this;
        setTimeout(function() {
            if(me.post_nsfw_page.current != null){
                me.post_nsfw_page.current?.set_data(index, id, e5, object, post_type) 
            }
        }, (1 * 500));  
        
    }

    when_warning_ignored(index, id, e5, object, type){
        this.open_post_nsfw_bottomsheet()
        if(type == 'post'){
            this.open_post(index, id, e5, object)
        }
        else if(type == 'video'){
            this.open_video(index, id, e5, object)
        }
        
    }







    render_tag_bar_group(option, size){
        return(
            <div>
                <Tags font={this.props.app_state.font} page_tags_object={option} tag_size={size} when_tags_updated={this.when_tags_updated.bind(this)} theme={this.props.theme} app_state={this.props.app_state}/>
            </div>
        )
    }

    when_tags_updated(tag_group){
        var selected_page = ''
        if(this.state.page == '?'){
            this.setState({work_page_tags_object: tag_group})
            selected_page = tag_group['i'].active
            if(selected_page == 'e') selected_page = this.props.app_state.loc['1196']/* 'jobs' */
        }
        else if(this.state.page == 'e'){
            this.setState({explore_page_tags_object: tag_group})
            selected_page = tag_group['i'].active
        }
        else{
            //wallet
            this.setState({wallet_page_tags_object: tag_group})
            selected_page = 'w'
        }

        var id = this.get_page_id()
        var posts_to_load = []
        var searched_data = this.state.page_search_data[id]
        var searched_tags = this.state.tags_search_data[id]
        if(searched_data != null){
            posts_to_load = [searched_data].concat(posts_to_load)
        }
        if(searched_tags != null){
            posts_to_load = posts_to_load.concat(searched_tags)
        }
        if(posts_to_load.length == 0 && (id == this.props.app_state.loc['1264k']/* 'audioport' */+this.props.app_state.loc['1264l']/* 'acquired' */ || id == this.props.app_state.loc['1264k']/* 'audioport' */+this.props.app_state.loc['1264m']/* 'playlists' */)){
            //if viewing my collection or my playlists, load my albums first
            posts_to_load = posts_to_load.concat(this.props.app_state.my_albums)
        }
        this.props.fetch_objects_to_load_from_searched_tags(posts_to_load, selected_page)

        // this.setState({ selected_job_post_item:null, selected_contract_item:null, selected_subscription_item:null, selected_post_item:null, selected_channel_item:null, selected_proposal_item:null, selected_storefront_item:null, selected_bag_item:null, selected_contractor_item: null})

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
                if(this.work_list_section.current != null){
                    this.work_list_section.current?.set_jobs_list(scroll_pos)
                }
            } 
            else if(selected_tag == this.props.app_state.loc['1197']/* 'contracts' */){
                if(this.work_list_section.current != null){
                    this.work_list_section.current?.set_contract_list(scroll_pos)
                }
            }
            else if(selected_tag == this.props.app_state.loc['1199']/* 'proposals' */ ){
                if(this.work_list_section.current != null){
                    this.work_list_section.current?.set_proposal_list(scroll_pos)
                }
            }
            else if(selected_tag == this.props.app_state.loc['1200']/* 'subscriptions' */ ){
                if(this.work_list_section.current != null){
                    this.work_list_section.current?.set_subscription_list(scroll_pos)
                }
            }
            else if(selected_tag == this.props.app_state.loc['1201']/* 'mail' */){
                if(this.work_list_section.current != null){
                    this.work_list_section.current?.set_mail_list(scroll_pos)
                }
            }
            else if(selected_tag == this.props.app_state.loc['1198']/* 'contractors' */){
                if(this.work_list_section.current != null){
                    this.work_list_section.current?.set_contractor_list(scroll_pos)
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
                    if(this.explore_list_section.current != null){
                        this.explore_list_section.current?.set_searched_account_list(scroll_pos)
                    }
                }else{
                    if(this.explore_list_section.current != null){
                        this.explore_list_section.current?.set_e5_list(scroll_pos)
                    }
                }
            }
            else if(selected_tag == this.props.app_state.loc['1213']/* 'posts' */ ){
               if(this.explore_list_section.current != null){
                    this.explore_list_section.current?.set_post_list(scroll_pos)
                }
            }
            else if(selected_tag == this.props.app_state.loc['1214']/* 'channels' */ ){
                if(this.explore_list_section.current != null){
                    this.explore_list_section.current?.set_channel_list(scroll_pos)
                }
            }
            else if(selected_tag == this.props.app_state.loc['1215']/* 'storefront' */){
                if(this.explore_list_section.current != null){
                    this.explore_list_section.current?.set_storefront_list(scroll_pos)
                }
            }
            else if(selected_tag == this.props.app_state.loc['1216']/* 'bags' */){
                if(this.explore_list_section.current != null){
                    this.explore_list_section.current?.set_bag_list(scroll_pos)
                }
            }
            else if(selected_tag == this.props.app_state.loc['1264k']/* 'audioport' */){
                if(this.explore_list_section.current != null){
                    this.explore_list_section.current?.set_audio_list(scroll_pos)
                }
            }
            else if(selected_tag == this.props.app_state.loc['1264p']/* 'videoport' */){
                if(this.explore_list_section.current != null){
                    this.explore_list_section.current?.set_video_list(scroll_pos)
                }
            }
        }
        else{
            //wallet
            var selected_item = this.get_selected_item(this.state.wallet_page_tags_object, this.state.wallet_page_tags_object['i'].active)
            var id = selected_item

            var scroll_pos = this.page_scroll_data[id]
            if(scroll_pos == null) scroll_pos = 0;

            if(selected_item == this.props.app_state.loc['1264j']/* 'coins 🪙' */){
                if(this.wallet_list_section.current != null){
                    this.wallet_list_section.current?.set_coin_list(scroll_pos)
                }
            }
            else if(selected_item == this.props.app_state.loc['1217']/* 'ethers ⚗️' */){
                if(this.wallet_list_section.current != null){
                    this.wallet_list_section.current?.set_ether_list(scroll_pos)
                }
            }
            else if(selected_item == this.props.app_state.loc['1218']/* 'ends ☝️' */ ){
                if(this.wallet_list_section.current != null){
                    this.wallet_list_section.current?.set_end_list(scroll_pos)
                }
            }
            else if(selected_item == this.props.app_state.loc['1219']/* 'spends 🫰' */ ){
                if(this.wallet_list_section.current != null){
                    this.wallet_list_section.current?.set_spend_list(scroll_pos)
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

    get_contract_items(all){
        var selected_option_name = this.get_selected_item(this.state.work_page_tags_object, this.state.work_page_tags_object['i'].active)

        if(this.state.work_page_tags_object['i'].active != this.props.app_state.loc['1197']/* 'contracts' */|| all != null){
            return this.sort_feed_based_on_my_section_tags(this.filter_using_searched_text(this.filter_for_blocked_accounts(this.get_all_sorted_objects(this.props.app_state.created_contracts))))
        }

        if(selected_option_name == this.props.app_state.loc['1202']/* 'all' */){
            return (this.sort_feed_based_on_my_section_tags(this.filter_using_searched_text(this.filter_for_blocked_accounts(this.get_all_sorted_objects(this.props.app_state.created_contracts)))))
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
        else if(selected_option_name == this.props.app_state.loc['1332e']/* 'main' */){
            var my_contracts = []
            var all_contracts = this.get_all_sorted_objects(this.props.app_state.created_contracts)
            for(var i = 0; i < all_contracts.length; i++){
                var id = all_contracts[i]['id']
                if(id == 2){
                    my_contracts.push(all_contracts[i])
                }
            }
            return my_contracts
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

    get_bag_items(all){
        var selected_option_name = this.get_selected_item(this.state.explore_page_tags_object, this.state.explore_page_tags_object['i'].active)

        if(this.state.explore_page_tags_object['i'].active != this.props.app_state.loc['1216']/* 'bags' */|| all != null){
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

    get_channel_items(all){
        var selected_option_name = this.get_selected_item(this.state.explore_page_tags_object, this.state.explore_page_tags_object['i'].active)

        if(this.state.explore_page_tags_object['i'].active != this.props.app_state.loc['1214']/* 'channels' */|| all != null){
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

    get_contractor_items(all){
        var selected_option_name = this.get_selected_item(this.state.work_page_tags_object, this.state.work_page_tags_object['i'].active)

        if(this.state.work_page_tags_object['i'].active != this.props.app_state.loc['1198']/* 'contractors' */|| all != null){
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
                token_exchanges.push(
                    {'data': exchanges_from_sync[i]['data'], 'id':exchanges_from_sync[i]['id'], 'e5_id':exchange_id, 'E5': exchanges_from_sync[i]['e5'], 'img':img, 'balance':exchanges_from_sync[i]['balance'], 'account_data':exchanges_from_sync[i]['account_data'], 'event':exchanges_from_sync[i]['event'], 'ipfs':exchanges_from_sync[i]['ipfs'],'exchanges_balances':exchanges_from_sync[i]['exchanges_balances'], 'moderators':exchanges_from_sync[i]['moderators'], 'access_rights_enabled':exchanges_from_sync[i]['access_rights_enabled'], 'e5':exchanges_from_sync[i]['e5'], 'exchange_ratio_data':exchanges_from_sync[i]['exchange_ratio_data'], 'proportion_ratio_data':exchanges_from_sync[i]['proportion_ratio_data'], 'token_balances_data':exchanges_from_sync[i]['token_balances_data'] }
                )
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

        return this.filter_by_content_channeling(this.filter_using_searched_text(this.filter_for_blocked_accounts(sorted_token_exchange_data)))
    }

    get_job_items(all){
        var selected_option_name = this.get_selected_item(this.state.work_page_tags_object, this.state.work_page_tags_object['i'].active)

        if(this.state.work_page_tags_object['i'].active != this.props.app_state.loc['1196']/* 'jobs' */|| all != null){
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

    get_mail_items(all){
        var selected_option_name = this.get_selected_item(this.state.work_page_tags_object, this.state.work_page_tags_object['i'].active)

        if(this.state.work_page_tags_object['i'].active != this.props.app_state.loc['1201']/* 'mail' */|| all != null){
            var all_mail = this.get_all_mail()
            return this.filter_using_searched_text(this.filter_for_blocked_accounts(this.sortByAttributeDescending(all_mail, 'time')))
        }

        else if(selected_option_name == this.props.app_state.loc['1208']/* 'received' */){
            var all_mail = []
            var received_mail = this.get_combined_created_mail('received_mail')

            for(var i=0; i<received_mail['received_mail'].length; i++){
                var convo_id = received_mail['received_mail'][i]
                var context_object = received_mail['mail_activity'][convo_id][0]
                if(context_object != null && context_object['ipfs'] != null && context_object['ipfs'].selected != null){
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
                if(context_object != null && context_object['ipfs'] != null && context_object['ipfs'].selected != null){
                    all_mail.push(context_object)
                }
            }
            return this.filter_using_searched_text(this.filter_for_blocked_accounts(this.sortByAttributeDescending(all_mail, 'time')))
        }
    }

    get_all_mail(){
        var all_mail = []
        var received_mail = this.get_combined_created_mail('received_mail')
        var created_mail = this.get_combined_created_mail('created_mail')

        for(var i=0; i<received_mail['received_mail'].length; i++){
            var convo_id = received_mail['received_mail'][i]
            var context_object = received_mail['mail_activity'][convo_id][0]
            if(context_object != null && context_object['ipfs'] != null && context_object['ipfs'].selected != null){
                all_mail.push(context_object)
            }
        }

        for(var i=0; i<created_mail['created_mail'].length; i++){
            var convo_id = created_mail['created_mail'][i]
            var context_object = created_mail['mail_activity'][convo_id][0]
            if(context_object != null && context_object['ipfs'] != null && context_object['ipfs'].selected != null){
                all_mail.push(context_object)
            }
        }
        return all_mail
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
    

    get_post_items(all){
        var selected_option_name = this.get_selected_item(this.state.explore_page_tags_object, this.state.explore_page_tags_object['i'].active)

        if(this.state.explore_page_tags_object['i'].active != this.props.app_state.loc['1213']/* 'posts' */|| all != null){
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

    get_proposal_items(all){
        var selected_option_name = this.get_selected_item(this.state.work_page_tags_object, this.state.work_page_tags_object['i'].active)

        if(this.state.work_page_tags_object['i'].active != this.props.app_state.loc['1199']/* 'proposals' */|| all != null){
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

    get_storefront_items(all){
        var selected_option_name = this.get_selected_item(this.state.explore_page_tags_object, this.state.explore_page_tags_object['i'].active)

        if(this.state.explore_page_tags_object['i'].active != this.props.app_state.loc['1215']/* 'storefront' */|| all != null){
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

    get_subscription_items(all){
        var selected_option_name = this.get_selected_item(this.state.work_page_tags_object, this.state.work_page_tags_object['i'].active)

        if(this.state.work_page_tags_object['i'].active != this.props.app_state.loc['1200']/* 'subscriptions' */|| all != null){
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
        else if(selected_option_name == this.props.app_state.loc['1264b']/* upcoming */){
            var my_paid_subscriptions = []
            var all_subscriptions = this.get_all_sorted_objects(this.props.app_state.created_subscriptions)
            var now = Math.floor(Date.now()/1000)
            var selected_e5 = this.props.app_state.selected_e5
            for(var i=0; i<all_subscriptions.length; i++){
                var object = all_subscriptions[i]
                if(object['payment'] != 0 && object['payment'] <= 60*60*24*5 && object['e5'] == selected_e5){
                    my_paid_subscriptions.push(object)
                }
                else if(parseInt(object['last_expiration_time'].toString()) >= (now-(60*60*24*5)) && object['e5'] == selected_e5){
                    my_paid_subscriptions.push(object)
                }
            }
            return this.sort_feed_based_on_my_section_tags(this.filter_using_searched_text(this.filter_for_blocked_accounts(my_paid_subscriptions)))
        }
        else if(selected_option_name == this.props.app_state.loc['1332f']/* 'history' */){
            var my_paid_subscriptions = []
            var all_subscriptions = this.get_all_sorted_objects(this.props.app_state.created_subscriptions)
            for(var i=0; i<all_subscriptions.length; i++){
               var object = all_subscriptions[i]
                if(parseInt(object['last_expiration_time'].toString()) > 0){
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

    get_audio_items(all){
        var selected_option_name = this.get_selected_item(this.state.explore_page_tags_object, this.state.explore_page_tags_object['i'].active)

        //[this.props.app_state.loc['1264k']/* 'audioport' */,this.props.app_state.loc['1202']/* 'all' */, this.props.app_state.loc['1264l']/* 'acquired' */, this.props.app_state.loc['1264m']/* 'playlists' */,this.props.app_state.loc['1203']/* 'viewed' */,this.props.app_state.loc['1204']/* 'created' */,this.props.app_state.loc['1222']/* 'pinned' */]

        if(this.state.explore_page_tags_object['i'].active != this.props.app_state.loc['1264k']/* 'audioport' */ || all != null){
            return (this.sort_feed_based_on_my_section_tags(this.filter_by_content_channeling(this.filter_using_searched_text(this.filter_for_blocked_accounts(this.get_all_sorted_objects(this.props.app_state.created_audios)))))).concat(this.props.app_state.my_playlists)
        }

        if(selected_option_name == this.props.app_state.loc['1202']/* 'all' */){
            return this.sort_feed_based_on_my_section_tags(this.filter_by_content_channeling(this.filter_using_searched_text(this.filter_for_blocked_accounts(this.get_all_sorted_objects(this.props.app_state.created_audios)))))
        }
        else if(selected_option_name == this.props.app_state.loc['1203']/* 'viewed' */){
            var my_viewed_audios = []
            var all_audios = this.get_all_sorted_objects(this.props.app_state.created_audios)
            for(var i=0; i<this.state.viewed_audios.length; i++){
                var obj = this.get_item_in_array(this.state.viewed_audios[i], all_audios)
                if(obj != null) my_viewed_audios.push(obj)
            }
            return this.sort_feed_based_on_my_section_tags(this.filter_by_content_channeling(this.filter_using_searched_text(this.filter_for_blocked_accounts(my_viewed_audios))))
        }
        else if(selected_option_name == this.props.app_state.loc['1222']/* 'pinned' */){
            var my_viewed_audios = []
            var all_audios = this.get_all_sorted_objects(this.props.app_state.created_audios)
            for(var i=0; i<this.state.pinned_audios.length; i++){
                var obj = this.get_item_in_array(this.state.pinned_audios[i], all_audios)
                if(obj != null) my_viewed_audios.push(obj)
            }
            return this.sort_feed_based_on_my_section_tags(this.filter_by_content_channeling(this.filter_using_searched_text(this.filter_for_blocked_accounts(my_viewed_audios))))
        }
        else if(selected_option_name == this.props.app_state.loc['1264l']/* 'acquired' */){
            var my_added_album_ids = this.props.app_state.my_albums
            var all_audios = this.get_all_sorted_objects(this.props.app_state.created_audios)
            var my_acquired_albums = []
            for(var i=0; i<my_added_album_ids.length; i++){
                var obj = this.get_item_in_array(my_added_album_ids[i], all_audios)
                if(obj != null) my_acquired_albums.push(obj)
            }
            return this.sort_feed_based_on_my_section_tags(this.filter_by_content_channeling(this.filter_using_searched_text(this.filter_for_blocked_accounts(my_acquired_albums))))
        }
        else if(selected_option_name == this.props.app_state.loc['1264m']/* 'playlists' */){
            return this.props.app_state.my_playlists
        }
        else {
            var my_audios = []
            var all_audios = this.get_all_sorted_objects(this.props.app_state.created_audios)
            
            for(var i = 0; i < all_audios.length; i++){
                var audio_author = all_audios[i]['event'].returnValues.p5
                var myid = this.props.app_state.user_account_id[all_audios[i]['e5']]
                if(myid == null) myid = 1
                if(audio_author.toString() == myid.toString()){
                    my_audios.push(all_audios[i])
                }
            }
            return this.sort_feed_based_on_my_section_tags(this.filter_by_content_channeling(this.filter_using_searched_text(this.filter_for_blocked_accounts(my_audios))))
        }
    }

    get_video_items(all){
        var selected_option_name = this.get_selected_item(this.state.explore_page_tags_object, this.state.explore_page_tags_object['i'].active)

        
        if(this.state.explore_page_tags_object['i'].active != this.props.app_state.loc['1264p']/* 'videoport' */ || all != null){
            return (this.sort_feed_based_on_my_section_tags(this.filter_by_content_channeling(this.filter_using_searched_text(this.filter_for_blocked_accounts(this.get_all_sorted_objects(this.props.app_state.created_videos)))))).concat(this.props.app_state.my_playlists)
        }

        if(selected_option_name == this.props.app_state.loc['1202']/* 'all' */){
            return this.sort_feed_based_on_my_section_tags(this.filter_by_content_channeling(this.filter_using_searched_text(this.filter_for_blocked_accounts(this.get_all_sorted_objects(this.props.app_state.created_videos)))))
        }
        else if(selected_option_name == this.props.app_state.loc['1203']/* 'viewed' */){
            var my_viewed_videos = []
            var all_videos = this.get_all_sorted_objects(this.props.app_state.created_videos)
            for(var i=0; i<this.state.viewed_videos.length; i++){
                var obj = this.get_item_in_array(this.state.viewed_videos[i], all_videos)
                if(obj != null) my_viewed_videos.push(obj)
            }
            return this.sort_feed_based_on_my_section_tags(this.filter_by_content_channeling(this.filter_using_searched_text(this.filter_for_blocked_accounts(my_viewed_videos))))
        }
        else if(selected_option_name == this.props.app_state.loc['1222']/* 'pinned' */){
            var my_viewed_videos = []
            var all_videos = this.get_all_sorted_objects(this.props.app_state.created_videos)
            for(var i=0; i<this.state.pinned_videos.length; i++){
                var obj = this.get_item_in_array(this.state.pinned_videos[i], all_videos)
                if(obj != null) my_viewed_videos.push(obj)
            }
            return this.sort_feed_based_on_my_section_tags(this.filter_by_content_channeling(this.filter_using_searched_text(this.filter_for_blocked_accounts(my_viewed_videos))))
        }
        else if(selected_option_name == this.props.app_state.loc['1264l']/* 'acquired' */){
            var my_added_album_ids = this.props.app_state.my_albums
            var all_videos = this.get_all_sorted_objects(this.props.app_state.created_videos)
            var my_acquired_albums = []
            for(var i=0; i<my_added_album_ids.length; i++){
                var obj = this.get_item_in_array(my_added_album_ids[i], all_videos)
                if(obj != null) my_acquired_albums.push(obj)
            }
            return this.sort_feed_based_on_my_section_tags(this.filter_by_content_channeling(this.filter_using_searched_text(this.filter_for_blocked_accounts(my_acquired_albums))))
        }
        else {
            var my_videos = []
            var all_videos = this.get_all_sorted_objects(this.props.app_state.created_videos)
            
            for(var i = 0; i < all_videos.length; i++){
                var audio_author = all_videos[i]['event'].returnValues.p5
                var myid = this.props.app_state.user_account_id[all_videos[i]['e5']]
                if(myid == null) myid = 1
                if(audio_author.toString() == myid.toString()){
                    my_videos.push(all_videos[i])
                }
            }
            return this.sort_feed_based_on_my_section_tags(this.filter_by_content_channeling(this.filter_using_searched_text(this.filter_for_blocked_accounts(my_videos))))
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
        filtered_objects = objects.filter(function (object) {
            return (!blocked_accounts.includes(object['author']))
        });
        // objects.forEach(object => {
        //     if(!blocked_accounts.includes(object['author'])){
        //         filtered_objects.push(object)
        //     }
        // })

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
            if(entered_title_text == null) entered_title_text = ''
            var object_author = object['author'] == null ? '0' : object['author']
            if(object['id'].toString() == (searched_input) || entered_title_text.toLowerCase().includes(searched_input.toLowerCase()) || this.get_searched_input_account_id(searched_input) == object_author.toString()){
                if(this.check_if_object_includes_tags(object, searched_tags)){
                    return_objs.push(object)
                }
            }
        });
        return return_objs;
    }

    get_searched_input_account_id(name){
        if(!isNaN(name)) return name
        return (this.get_all_sorted_objects_mappings(this.props.app_state.alias_owners)[name] == null ? name : this.get_all_sorted_objects_mappings(this.props.app_state.alias_owners)[name])
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

            if(object['id'] == 2 || object['id'] == 3 || object['id'] == 5 ){
                return_objs.push(object)
            }
       
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
        });

        return return_objs;
    }


    sort_feed_based_on_my_section_tags(objects){
        var feed_objs = []
        var like_tags = []

        var section_tags = this.state.page == '?' ?  this.get_job_section_tags() : this.get_explore_section_tags()

        if(this.props.app_state.section_tags_setting == this.props.app_state.loc['1202']/* 'all' */){
            return objects
        }

        objects.forEach(object => {
            //first add the objects with the tags i follow
            if(object['ipfs'] != null){
                var object_tags = object['ipfs'].entered_indexing_tags
                if(object['ipfs'].selected_device_city != null && object['ipfs'].selected_device_city != ''){
                    object_tags = [object['ipfs'].selected_device_city].concat(object_tags)
                }
                if(object['ipfs'].audio_type != null){
                    object_tags = [object['ipfs'].audio_type].concat(object_tags)
                }
                var includes = section_tags.some(r=> object_tags.includes(r))
                if(includes && !feed_objs.includes(object)){
                    feed_objs.push(object)
                    like_tags.concat(object_tags)
                }
            }
        });

        objects.forEach(object => {
            //then add the objects with the tags closely associated to the tags i follow
            if(object['ipfs'] != null){
                var object_tags = object['ipfs'].entered_indexing_tags
                if(object['ipfs'].selected_device_city != null && object['ipfs'].selected_device_city != ''){
                    object_tags = [object['ipfs'].selected_device_city].concat(object_tags)
                }
                if(object['ipfs'].audio_type != null){
                    object_tags = [object['ipfs'].audio_type].concat(object_tags)
                }
                var includes = like_tags.some(r=> object_tags.includes(r))
                if(includes && !feed_objs.includes(object)){
                    feed_objs.push(object)
                }
            }
        });

        objects.forEach(object => {
            //then load everything else
            if(!feed_objs.includes(object)){
                feed_objs.push(object)
            }
        });

        return feed_objs
    }

    get_job_section_tags(){
        if(this.state.job_section_tags == null){
            this.setState({job_section_tags: this.props.app_state.job_section_tags})
            return this.props.app_state.job_section_tags;
        }else{
            return this.state.job_section_tags
        }
    }

    get_explore_section_tags(){
        if(this.state.explore_section_tags == null){
            this.setState({explore_section_tags: this.props.app_state.explore_section_tags})
            return this.props.app_state.explore_section_tags
        }else{
            return this.state.explore_section_tags
        }
    }



    get_all_sorted_notifications(tag_id){
        var all_object_list = []

        if(tag_id == this.props.app_state.loc['1264c']/* 'job-notifications' */){
            var my_job_responses_notifications = this.get_all_sorted_objects_mappings(this.props.app_state.my_job_responses_notifications)

            var my_job_application_responses_notifications = this.get_all_sorted_objects_mappings(this.props.app_state.my_job_application_responses_notifications)

            for (const key in my_job_responses_notifications) {
                all_object_list.push(my_job_responses_notifications[key])
            }

            for (const key in my_job_application_responses_notifications) {
                all_object_list.push(my_job_application_responses_notifications[key])
            }
        }
        else if(tag_id == this.props.app_state.loc['1264e']/* 'contractor-notifications' */){
            var my_contractor_job_request_notifications = this.get_all_sorted_objects_mappings(this.props.app_state.my_contractor_job_request_notifications)

            for (const key in my_contractor_job_request_notifications) {
                all_object_list.push(my_contractor_job_request_notifications[key])
            }
        }
        else if(tag_id == this.props.app_state.loc['1264f']/* 'mail-notifications' */){
            var my_mail_messages_notifications = this.get_all_sorted_objects_mappings(this.props.app_state.received_mail_notifications)

            for(const key in my_mail_messages_notifications){
                all_object_list.push(my_mail_messages_notifications[key])
            }
        }
        else if(tag_id == this.props.app_state.loc['1264g']/* 'storefront-notifications' */){
            var my_store_direct_purchases_notifications = this.get_all_sorted_objects_mappings(this.props.app_state.my_store_direct_purchases_notifications)

            for (const key in my_store_direct_purchases_notifications) {
                all_object_list.push(my_store_direct_purchases_notifications[key])
            }
        }
        else if(tag_id == this.props.app_state.loc['1264h']/* 'bag-notifications' */){
            var my_bag_responses_notifications = this.get_all_sorted_objects_mappings(this.props.app_state.my_bag_responses_notifications)

            var my_bag_application_responses_notifications = this.get_all_sorted_objects_mappings(this.props.app_state.my_bag_application_responses_notifications)

            for (const key in my_bag_responses_notifications) {
                all_object_list.push(my_bag_responses_notifications[key])
            }
            for (const key in my_bag_application_responses_notifications) {
                all_object_list.push(my_bag_application_responses_notifications[key])
            }
        }
        else if(tag_id == this.props.app_state.loc['1264i']/* 'wallet-notifications' */){
            var my_token_event_notifications = this.get_all_sorted_objects_mappings(this.props.app_state.my_token_event_notifications)

            for (const key in my_token_event_notifications) {
                all_object_list.push(my_token_event_notifications[key])
            }
        }
        else if(tag_id == this.props.app_state.loc['1264d']/* 'contract-notifications' */){
            var enter_exit_accounts_notifications = this.get_all_sorted_objects_mappings(this.props.app_state.enter_exit_accounts_notifications)

            for (const key in enter_exit_accounts_notifications) {
                all_object_list.push(enter_exit_accounts_notifications[key])
            }
        }

        return this.sortByAttributeDescending(all_object_list, 'timestamp')
    }
    










    
    handleChange = (value) => {
        var obj = {0:'?', 1:'e', 2:'w'}
        this.setState({page: obj[value]})
    };

    render_post_list_group(size, height){
        var obj = {'?':0, 'e':1, 'w':2}
        var pos = obj[this.state.page];
        var h = (this.state.search_visible && this.is_page_valid()) ? height-110 : height
        return(
            <div>
                {this.render_search_tags_views()}
                <SwipeableViews index={pos} onChangeIndex={this.handleChange} disabled>
                    <div>{this.render_post_list_group2(size, '?', this.work_list_section, h)}</div>
                    <div>{this.render_post_list_group2(size, 'e', this.explore_list_section, h)}</div>
                    <div>{this.render_post_list_group2(size, 'w', this.wallet_list_section, h)}</div>
                </SwipeableViews>
            </div>
        )
        
    }

    render_search_tags_views(){
        if(this.state.search_visible && this.is_page_valid()){
            var background = this.props.theme['card_background_color']
            return(
                <div>
                    <div style={{'background-color': background, 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 10px 5px 10px','border-radius': '15px' }}>
                        <div className="row" style={{width:'100%'}}>
                            <div className="col-11" style={{'margin': '0px 0px 0px 0px'}}>
                                <TextInput font={this.props.app_state.font} height={30} placeholder={this.props.app_state.loc['1120']/* 'Enter tag...' */} when_text_input_field_changed={this.when_tag_input_field_changed.bind(this)} text={this.state.typed_tag} theme={this.props.theme}/>
                            </div>
                            <div className="col-1" style={{'padding': '0px 10px 0px 0px'}} onClick={()=> this.add_tag()}>
                                <div className="text-end" style={{'padding': '5px 0px 0px 0px'}} >
                                    <img alt="" className="text-end" src={this.props.theme['add_text']} style={{height:37, width:'auto'}} />
                                </div>
                            </div>
                        </div>
                        {this.render_detail_item('1',{'active_tags':this.get_filter_tags(), 'indexed_option':'indexed', 'when_tapped':'delete_added_tag'})}
                    </div>
                    <div style={{height: 5}}/>
                </div>
            )
        }
    }

    is_page_valid(){
        if(this.state.page == '?'){
            var selected_item = this.state.work_page_tags_object['i'].active
            if(selected_item == 'e'){
                return false
            }
            else return true
        }
        else if(this.state.page == 'e'){
            var selected_item = this.state.explore_page_tags_object['i'].active
            if(selected_item == 'e' || selected_item == this.props.app_state.loc['1212']/* 'e.E5s' */ || selected_item == this.props.app_state.loc['1216']/* 'e.bags' */){
                return false
            }
            else return true
        }
        else{
            //wallet
            var selected_item = this.get_selected_item(this.state.wallet_page_tags_object, this.state.wallet_page_tags_object['i'].active)
            if(selected_item == this.props.app_state.loc['1218']/* 'ends ☝️' */ || selected_item == this.props.app_state.loc['1219']/* 'spends 🫰' */ ){
                return true
            }
            else return false
        }
    }

    when_tag_input_field_changed(text){
        this.setState({typed_tag: text})
    }

    add_tag(){
        var typed_word = this.state.typed_tag.trim();

        if(typed_word == ''){
            this.props.notify(this.props.app_state.loc['1124']/* 'Type something.' */, 1400)
        }
        else if(this.hasWhiteSpace(typed_word)){
            this.props.notify(this.props.app_state.loc['1125']/* 'Enter one word.' */, 1400)
        }
        else{
            typed_word = typed_word.trim()
            var cloned_seed_array = this.get_filter_tags().slice()
            cloned_seed_array.push(typed_word)
            this.setState({typed_tag:''})
            this.when_add_tags_button_tapped(cloned_seed_array)
        }
    }

    hasWhiteSpace(s) {
        return s.indexOf(' ') >= 0;
    }

    get_filter_tags(){
       var id = this.get_page_id()  
       var added_tags = this.state.tags_search_data[id]
        if(added_tags == null) added_tags = []
        return added_tags
    }

    delete_added_tag(tag, pos){
        var cloned_seed_array = this.get_filter_tags().slice()
        const index = cloned_seed_array.indexOf(tag);
        if (index > -1) { // only splice array when item is found
            cloned_seed_array.splice(index, 1); // 2nd parameter means remove one item only
        }
        this.when_add_tags_button_tapped(cloned_seed_array)
    }






    render_post_list_group2(size, p, list_section, h){
        return(
            <PostListSection ref={list_section} size={size} height={h} width={this.props.width} page={p} work_page_tags_object={this.state.work_page_tags_object} explore_page_tags_object={this.state.explore_page_tags_object} wallet_page_tags_object={this.state.wallet_page_tags_object} app_state={this.props.app_state} notify={this.render_top_notification.bind(this)}
            when_ether_object_clicked={this.when_ether_object_clicked.bind(this)} when_spends_object_clicked={this.when_spends_object_clicked.bind(this)} when_ends_object_clicked={this.when_ends_object_clicked.bind(this)} when_E5_item_clicked={this.when_E5_item_clicked.bind(this)} when_job_post_item_clicked={this.when_job_post_item_clicked.bind(this)} when_contract_item_clicked={this.when_contract_item_clicked.bind(this)} when_subscription_item_clicked={this.when_subscription_item_clicked.bind(this)} when_post_item_clicked={this.when_post_item_clicked.bind(this)} when_channel_item_clicked={this.when_channel_item_clicked.bind(this)} when_proposal_item_clicked={this.when_proposal_item_clicked.bind(this)} when_mail_item_clicked={this.when_mail_item_clicked.bind(this)} when_storefront_post_item_clicked={this.when_storefront_post_item_clicked.bind(this)} when_bag_post_item_clicked={this.when_bag_post_item_clicked.bind(this)} when_contractor_post_item_clicked={this.when_contractor_post_item_clicked.bind(this)} when_audio_item_clicked={this.when_audio_item_clicked.bind(this)} when_video_item_clicked={this.when_video_item_clicked.bind(this)}

            theme={this.props.theme} fetch_objects_data={this.props.fetch_objects_data.bind(this)} when_view_image_clicked={this.when_view_image_clicked.bind(this)}
            
            viewed_posts={this.state.viewed_posts} viewed_channels={this.state.viewed_channels} viewed_jobs={this.state.viewed_jobs} viewed_contracts={this.state.viewed_contracts} viewed_subscriptions={this.state.viewed_subscriptions} viewed_proposals={this.state.viewed_proposals} viewed_stores={this.state.viewed_stores} viewed_bags={this.state.viewed_bags} viewed_contractors={this.state.viewed_contractors} viewed_audios={this.state.viewed_audios} viewed_videos={this.state.viewed_videos}

            get_contract_items={this.get_contract_items.bind(this)} get_bag_items={this.get_bag_items.bind(this)} get_channel_items={this.get_channel_items.bind(this)} get_contractor_items={this.get_contractor_items.bind(this)} get_exchange_tokens={this.get_exchange_tokens.bind(this)} get_job_items={this.get_job_items.bind(this)} get_mail_items={this.get_mail_items.bind(this)} get_post_items={this.get_post_items.bind(this)} get_proposal_items={this.get_proposal_items.bind(this)} get_storefront_items={this.get_storefront_items.bind(this)} get_subscription_items={this.get_subscription_items.bind(this)} get_e5_data={this.get_e5_data.bind(this)} set_page_scroll={this.set_page_scroll.bind(this)} select_deselect_tag={this.select_deselect_tag.bind(this)} get_searched_account_data={this.props.get_searched_account_data.bind(this)} when_searched_account_clicked={this.props.when_searched_account_clicked.bind(this)} get_audio_items={this.get_audio_items.bind(this)} get_video_items={this.get_video_items.bind(this)}

            show_post_item_preview_with_subscription={this.show_post_item_preview_with_subscription.bind(this)}
            get_all_sorted_notifications={this.get_all_sorted_notifications.bind(this)} open_object_in_homepage={this.open_object_in_homepage.bind(this)} view_number={this.props.view_number.bind(this)}

            show_pay_upcoming_subscriptions_bottomsheet={this.props.show_pay_upcoming_subscriptions_bottomsheet.bind(this)}

            when_coin_object_clicked={this.when_coin_object_clicked.bind(this)} when_playlist_selected={this.when_playlist_selected.bind(this)}
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

    when_coin_object_clicked(item){
        this.setState({selected_coin_item: item})
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
        this.props.load_exchanges_royalty_event_data(id, e5)
        this.props.load_exchanges_royalty_payout_event_data(id, e5)
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
        this.props.load_burn_address_end_balance_events(id)
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

    when_job_post_item_clicked(index, id, e5, object){
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

        this.props.fetch_uploaded_files_for_object(object)
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
        this.props.load_contracts_exchange_interactions_data(id, e5)

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

    when_post_item_clicked(index, id, e5, is_post_nsfw, object){
        if(is_post_nsfw){
            if(this.props.app_state.auto_skip_nsfw_warning == 'e'){
                this.open_post_nsfw_section(index, id, e5, object, 'post')
            }else{
                this.open_post(index, id, e5, object)
            }
        }else{
            this.open_post(index, id, e5, object)
        }
    }

    open_post(index, id, e5, object){
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

        this.props.fetch_uploaded_files_for_object(object)
        this.props.get_objects_messages(id, e5)
        this.props.get_post_award_data(id, e5)

        if(this.props.screensize == 's'){
            this.open_view_object_bottomsheet()
        }
    }

    when_channel_item_clicked(index, id, e5, object){
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

        this.props.fetch_uploaded_files_for_object(object)
        this.props.get_objects_messages(id, e5)
        this.props.get_channel_event_data(id, e5)
        this.props.get_moderator_event_data(id, e5)

        if(this.props.screensize == 's'){
            this.open_view_object_bottomsheet()
        }
    }

    when_proposal_item_clicked(index, id, e5, object){
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

        this.props.fetch_uploaded_files_for_object(object)
        this.props.get_objects_messages(id, e5)
        this.props.get_proposal_event_data(id, e5)

        if(this.props.screensize == 's'){
            this.open_view_object_bottomsheet()
        }
    }

    when_mail_item_clicked(index, id, object){
        this.setState({selected_mail_item: id})
        this.set_detail_data()
        this.props.fetch_uploaded_files_for_object(object)
        if(this.props.screensize == 's'){
            this.open_view_object_bottomsheet()
        }
    }

    when_storefront_post_item_clicked(index, id, e5, object){
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

        this.props.fetch_uploaded_files_for_object(object)
        this.props.get_direct_purchase_events(id, e5)
        this.props.get_objects_messages(id, e5)

        if(this.props.screensize == 's'){
            this.open_view_object_bottomsheet()
        }
    }

    when_bag_post_item_clicked(index, id, e5, object){
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

        this.props.load_bags_stores(e5, this.get_bag_stores(object))
        this.props.get_job_objects_responses(id, e5)
        this.props.get_objects_messages(id, e5)
        if(this.props.screensize == 's'){
            this.open_view_object_bottomsheet()
        }
    }

    get_bag_stores( object){
        var items_to_deliver = object['ipfs']['bag_orders']
        if(items_to_deliver.length == 0) return []
        var stores = [];
        items_to_deliver.forEach(item => {
            stores.push(item['storefront_item_id'])
        });
        return stores
    }

    when_contractor_post_item_clicked(index, id, e5, object){
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

        this.props.fetch_uploaded_files_for_object(object)
        this.props.get_contractor_applications(id, e5)

        if(this.props.screensize == 's'){
            this.open_view_object_bottomsheet()
        }
    }

    when_audio_item_clicked(index, id, e5, object){
        this.setState({selected_audio_item: id+e5})
        this.set_detail_data()
        this.add_to_tab(id+e5, id)
        var viewed_audios_clone = this.state.viewed_audios.slice()
        var pos = viewed_audios_clone.indexOf(id)
        if(pos == -1){
            viewed_audios_clone.push(id)
            this.setState({viewed_audios: viewed_audios_clone})
            this.update_cookies()
        }

        this.props.fetch_uploaded_files_for_object(object)
        this.props.get_objects_messages(id, e5)
        this.props.get_post_award_data(id, e5)

        if(this.props.screensize == 's'){
            this.open_view_object_bottomsheet()
        }
    }

    when_playlist_selected(song, index){
        this.setState({selected_audio_item: song['song_id']})
        this.set_detail_data()

        if(this.props.screensize == 's'){
            this.open_view_object_bottomsheet()
        }
    }

    when_video_item_clicked(index, id, e5, is_post_nsfw, object){
        if(is_post_nsfw){
            if(this.props.app_state.auto_skip_nsfw_warning == 'e'){
                this.open_post_nsfw_section(index, id, e5, object, 'video')
            }else{
                this.open_video(index, id, e5, object)
            }
        }else{
            this.open_video(index, id, e5, object)
        }
    }

    open_video(index, id, e5, object){
        this.setState({selected_video_item: id+e5})
        this.set_detail_data()
        this.add_to_tab(id+e5, id)

        var viewed_videos_clone = this.state.viewed_videos.slice()
        var pos = viewed_videos_clone.indexOf(id)
        if(pos == -1){
            viewed_videos_clone.push(id)
            this.setState({viewed_videos: viewed_videos_clone})
            this.update_cookies()
        }

        this.props.fetch_uploaded_files_for_object(object)
        this.props.get_objects_messages(id, e5)
        this.props.get_post_award_data(id, e5)

        if(this.props.screensize == 's'){
            this.open_view_object_bottomsheet()
        }
    }




    select_deselect_tag(tag, pos){
        if(!this.props.app_state.has_wallet_been_set && !this.props.app_state.has_account_been_loaded_from_storage){
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
        else if(page == 'w'){
            this.props.when_select_deselect_explore_tag(tag, pos)
        }
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
        this.setState({detail_page: selected_page, detail_selected_tag: selected_tag})
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

    show_post_item_preview_with_subscription(post, type){
        this.open_post_preview_section(post, type)
    }

    open_object_in_homepage(target, e5, type){
        this.open_notification_link(target, e5, type)
    }



















    render_post_detail_object(size, height, width){
        var h = height - 48
        if(this.props.app_state.visible_tabs == 'e') h = height
        return(
            <div>
                {this.render_page_tabs()}
                <PostDetailSection page={this.state.page} work_page_tags_object={this.state.work_page_tags_object} wallet_page_tags_object={this.state.wallet_page_tags_object} explore_page_tags_object={this.state.explore_page_tags_object} detail_page={this.state.detail_page} detail_selected_tag={this.state.detail_selected_tag}

                selected_ether_item={this.state.selected_ether_item} selected_end_item={this.state.selected_end_item} selected_spend_item={this.state.selected_spend_item} selected_e5_item={this.state.selected_e5_item} selected_job_post_item={this.state.selected_job_post_item} selected_contract_item={this.state.selected_contract_item} selected_subscription_item={this.state.selected_subscription_item} selected_post_item={this.state.selected_post_item} selected_channel_item={this.state.selected_channel_item} selected_proposal_item={this.state.selected_proposal_item} selected_mail_item={this.state.selected_mail_item} selected_storefront_item={this.state.selected_storefront_item} selected_bag_item={this.state.selected_bag_item} selected_contractor_item={this.state.selected_contractor_item} selected_coin_item={this.state.selected_coin_item} selected_audio_item={this.state.selected_audio_item} selected_video_item={this.state.selected_video_item}

                height={h} screensize={this.props.screensize} width={width} app_state={this.props.app_state} open_send_receive_ether_bottomsheet={this.props.open_send_receive_ether_bottomsheet.bind(this)} theme={this.props.theme} open_wiki_bottomsheet={this.props.open_wiki_bottomsheet.bind(this)} notify={this.render_top_notification.bind(this)}
                
                when_view_image_clicked={this.when_view_image_clicked.bind(this)} when_edit_job_tapped={this.when_edit_job_tapped.bind(this)} fetch_objects_data={this.props.fetch_objects_data.bind(this)}
                
                viewed_posts={this.state.viewed_posts} viewed_channels={this.state.viewed_channels} viewed_jobs={this.state.viewed_jobs} viewed_contracts={this.state.viewed_contracts} viewed_subscriptions={this.state.viewed_subscriptions} viewed_proposals={this.state.viewed_proposals} viewed_stores={this.state.viewed_stores} viewed_bags={this.state.viewed_bags} viewed_contractors={this.state.viewed_contractors} viewed_audios={this.state.viewed_audios} viewed_videos={this.state.viewed_videos}

                open_mint_burn_token_ui={this.open_mint_burn_token_ui.bind(this)} open_transfer_ui={this.open_transfer_ui.bind(this)} open_enter_contract_ui={this.open_enter_contract_ui.bind(this)} open_extend_contract_ui={this.open_extend_contract_ui.bind(this)} open_exit_contract_ui={this.open_exit_contract_ui.bind(this)} open_new_proposal_ui={this.open_new_proposal_ui.bind(this)}
                open_vote_proposal_ui={this.open_vote_proposal_ui.bind(this)} open_sumbit_proposal_ui={this.open_sumbit_proposal_ui.bind(this)} open_pay_subscription_ui={this.open_pay_subscription_ui.bind(this)} open_cancel_subscription_ui={this.open_cancel_subscription_ui.bind(this)} open_collect_subscription_ui={this.open_collect_subscription_ui.bind(this)} open_modify_subscription_ui={this.open_modify_subscription_ui.bind(this)} open_modify_contract_ui={this.open_modify_contract_ui.bind(this)} open_modify_token_ui={this.open_modify_token_ui.bind(this)} open_exchange_transfers_ui={this.open_exchange_transfers_ui.bind(this)} open_force_exit_ui={this.open_force_exit_ui.bind(this)} open_archive_proposal_ui={this.open_archive_proposal_ui.bind(this)} open_freeze_unfreeze_ui={this.open_freeze_unfreeze_ui.bind(this)} open_authmint_ui={this.open_authmint_ui.bind(this)} open_moderator_ui={this.open_moderator_ui.bind(this)} show_images={this.props.show_images.bind(this)}

                add_mail_to_stack_object={this.props.add_mail_to_stack_object.bind(this)} add_channel_message_to_stack_object={this.props.add_channel_message_to_stack_object.bind(this)} add_post_reply_to_stack={this.props.add_post_reply_to_stack.bind(this)} open_respond_to_job_ui={this.open_respond_to_job_ui.bind(this)} view_application_contract={this.view_application_contract.bind(this)} add_job_message_to_stack_object={this.props.add_job_message_to_stack_object.bind(this)} add_proposal_message_to_stack_object={this.props.add_proposal_message_to_stack_object.bind(this)} add_audio_reply_to_stack={this.props.add_audio_reply_to_stack.bind(this)} add_video_reply_to_stack={this.props.add_video_reply_to_stack.bind(this)}
                delete_message_from_stack={this.props.delete_message_from_stack.bind(this)}
                
                open_add_to_bag={this.props.open_add_to_bag.bind(this)} open_fulfil_bag_request={this.props.open_fulfil_bag_request.bind(this)} view_bag_application_contract={this.view_bag_application_contract.bind(this)} open_direct_purchase={this.open_direct_purchase.bind(this)} open_send_job_request_ui={this.props.open_send_job_request_ui.bind(this)} show_withdraw_ether_bottomsheet={this.props.show_withdraw_ether_bottomsheet.bind(this)}

                open_clear_purchase={this.props.open_clear_purchase.bind(this)} add_bag_message_to_stack_object={this.props.add_bag_message_to_stack_object.bind(this)} add_storefront_message_to_stack_object={this.props.add_storefront_message_to_stack_object.bind(this)} open_view_job_request_ui={this.props.open_view_job_request_ui} open_view_contract_ui={this.props.open_view_contract_ui.bind(this)}

                get_contract_items={this.get_contract_items.bind(this)} get_bag_items={this.get_bag_items.bind(this)} get_channel_items={this.get_channel_items.bind(this)} get_contractor_items={this.get_contractor_items.bind(this)} get_exchange_tokens={this.get_exchange_tokens.bind(this)} get_job_items={this.get_job_items.bind(this)} get_mail_items={this.get_mail_items.bind(this)} get_post_items={this.get_post_items.bind(this)}
                get_proposal_items={this.get_proposal_items.bind(this)} get_storefront_items={this.get_storefront_items.bind(this)} get_subscription_items={this.get_subscription_items.bind(this)} get_audio_items={this.get_audio_items.bind(this)} get_video_items={this.get_video_items.bind(this)}

                add_id_to_contacts={this.add_id_to_contacts.bind(this)} open_edit_object={this.props.open_edit_object.bind(this)} open_award_ui={this.open_give_awards.bind(this)}

                get_job_objects_responses={this.props.get_job_objects_responses.bind(this)} get_objects_messages={this.props.get_objects_messages.bind(this)} get_contractor_applications={this.props.get_contractor_applications.bind(this)} get_post_award_data={this.props.get_post_award_data.bind(this)} get_e5_data={this.get_e5_data.bind(this)} show_add_comment_bottomsheet={this.props.show_add_comment_bottomsheet.bind(this)}

                get_contract_event_data={this.props.get_contract_event_data.bind(this)} get_proposal_event_data={this.props.get_proposal_event_data.bind(this)} get_subscription_event_data={this.props.get_subscription_event_data.bind(this)} get_exchange_event_data={this.props.get_exchange_event_data.bind(this)} get_moderator_event_data={this.props.get_moderator_event_data.bind(this)} get_accounts_payment_information={this.props.get_accounts_payment_information.bind(this)} show_depthmint_bottomsheet={this.props.show_depthmint_bottomsheet.bind(this)} open_wallet_guide_bottomsheet={this.props.open_wallet_guide_bottomsheet.bind(this)} pin_bag={this.pin_bag.bind(this)} pin_channel={this.pin_channel.bind(this)} pin_item={this.pin_item.bind(this)} pin_post={this.pin_post.bind(this)} pin_subscription={this.pin_subscription.bind(this)} pin_proposal={this.pin_proposal.bind(this)} pin_contractor={this.pin_contractor.bind(this)} pin_contract={this.pin_contract.bind(this)} pin_job={this.pin_job.bind(this)} pin_audio={this.pin_audio.bind(this)} pin_video={this.pin_video.bind(this)}
                
                get_channel_event_data={this.props.get_channel_event_data.bind(this)} open_e5_link={this.open_e5_link.bind(this)} open_rpc_settings={this.open_rpc_settings.bind(this)} get_wallet_data_for_specific_e5={this.props.get_wallet_data_for_specific_e5.bind(this)}
                view_number={this.props.view_number.bind(this)}

                open_royalty_staging_ui={this.open_royalty_staging.bind(this)}
                view_royalty_staging={this.open_view_posted_royalty_staging.bind(this)}

                load_exchanges_royalty_event_data={this.props.load_exchanges_royalty_event_data.bind(this)}
                load_exchanges_royalty_payout_event_data={this.props.load_exchanges_royalty_payout_event_data.bind(this)} start_send_receive_coin_bottomsheet={this.props.start_send_receive_coin_bottomsheet.bind(this)} update_coin_balances={this.props.update_coin_balances.bind(this)}

                open_purchase_album_ui={this.props.show_buy_album_bottomsheet.bind(this)} play_song={this.props.play_song.bind(this)} get_page_id={this.get_page_id.bind(this)} show_dialog_bottomsheet={this.props.show_dialog_bottomsheet.bind(this)} play_song_in_playlist={this.props.play_song_in_playlist.bind(this)}
                update_order_of_songs_in_playlist={this.props.update_order_of_songs_in_playlist.bind(this)} download_playlist={this.props.download_playlist.bind(this)}

                when_pdf_file_opened={this.props.when_pdf_file_opened.bind(this)}
                />
            </div>
        )
    }

    render_top_notification(data, duration){
        var os = getOS()
        if(os != 'iOS'){
            this.props.notify(data, duration)
        }else{
            var time = duration == null ? 1000: duration;
            var id = "id3"
            toast(this.render_toast_item(data), {
                position: "top-center",
                autoClose: time,
                closeButton: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                transition: Slide,
                containerId:id,
                toastId:data,
                hideProgressBar: true,
                style:{'background-color':'transparent','box-shadow': '0px 0px 0px 0px #CECDCD', width:'auto'}
            });
        }
    }

    /* renders the toast item used */
    render_toast_item(message){
        var width = this.props.app_state.width
        if(width > 330){
        width = 330
        }
        return (
            <div>
                <div style={{'background-color':this.props.theme['toast_background_color'], 'border-radius': '20px', 'box-shadow': '0px 0px 2px 1px '+this.props.theme['card_shadow_color'],'padding': '3px 3px 3px 3px','display': 'flex','flex-direction': 'row', width: width-40}}>
                    <div style={{'padding': '10px 0px 5px 5px','display': 'flex','align-items': 'center', height:35}}> 
                        <img src={this.props.theme['alert_icon']} style={{height:25,width:'auto','scale': '0.9'}} />
                    </div>
                    <div style={{'padding': '0px 0px 0px 8px', 'margin':'5px 0px 0px 0px','display': 'flex','align-items': 'center'}}>
                        <p style={{'font-size': '13px', 'color':this.props.theme['primary_text_color'],'text-shadow': '-0px -0px 0px #A1A1A1', 'margin':'0px', 'font-family': this.props.app_state.font}}>{message}</p>
                    </div>
                </div>
            </div>
        );
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

    open_royalty_staging(item){
        this.props.show_stage_royalties_bottomsheet(item)
    }

    open_view_posted_royalty_staging(staging_data, token_item){
        this.props.show_view_staged_royalties_bottomsheet(staging_data, token_item)
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

            if(this.is_in_pinned_section()){
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

            if(this.is_in_pinned_section()){
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

            if(this.is_in_pinned_section()){
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

            if(this.is_in_pinned_section()){
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

            if(this.is_in_pinned_section()){
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

            if(this.is_in_pinned_section()){
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

            if(this.is_in_pinned_section()){
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
            // console.log('pinning contract')
            pinned_item_clone.push(id)
            this.setState({pinned_contract: pinned_item_clone})
            this.update_cookies()
            
            this.props.notify(this.props.app_state.loc['1249']/* 'Contract Pinned' */,900)
        }else{
            // console.log('unpinning contract')
            pinned_item_clone.splice(pos, 1)
            this.setState({pinned_contract: pinned_item_clone})
            this.update_cookies()
            this.props.notify(this.props.app_state.loc['1250']/* 'Contract Unpinned' */,900)

            if(this.is_in_pinned_section()){
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

            if(this.is_in_pinned_section()){
                if(this.props.screensize == 's'){
                    this.open_view_object_bottomsheet()
                }
            }
        }
    }

    pin_audio(item){
        var id = item['id']
        var pinned_item_clone = this.state.pinned_audios.slice()
        var pos = pinned_item_clone.indexOf(id)
        if(pos == -1){
            pinned_item_clone.push(id)
            this.setState({pinned_audios: pinned_item_clone})
            this.update_cookies()
            this.props.notify(this.props.app_state.loc['1264n']/* 'Audiopost Pinned' */,900)
        }else{
            pinned_item_clone.splice(pos, 1)
            this.setState({pinned_audios: pinned_item_clone})
            this.update_cookies()
            this.props.notify(this.props.app_state.loc['1264o']/* 'Audiopost Unpinned' */,900)

            if(this.is_in_pinned_section()){
                if(this.props.screensize == 's'){
                    this.open_view_object_bottomsheet()
                }
            }
        }
    }

    pin_video(item){
        var id = item['id']
        var pinned_item_clone = this.state.pinned_videos.slice()
        var pos = pinned_item_clone.indexOf(id)
        if(pos == -1){
            pinned_item_clone.push(id)
            this.setState({pinned_videos: pinned_item_clone})
            this.update_cookies()
            this.props.notify(this.props.app_state.loc['1264q']/* 'Videopost Pinned' */,900)
        }else{
            pinned_item_clone.splice(pos, 1)
            this.setState({pinned_audios: pinned_item_clone})
            this.update_cookies()
            this.props.notify(this.props.app_state.loc['1264r']/* 'Videopost Unpinned' */,900)

            if(this.is_in_pinned_section()){
                if(this.props.screensize == 's'){
                    this.open_view_object_bottomsheet()
                }
            }
        }
    }




    add_id_to_contacts(account_id, item){
        // if(account_id != this.props.app_state.user_account_id[item['e5']]){
        //     this.setState({contact_to_add: account_id, confirmation_dialog_box: true})
        // }
    }

    render_dialog_ui(){
        return(
            <Dialog PaperProps={{ sx: { borderRadius: "15px" } }} onClose = {() => this.cancel_dialog_box()} open = {this.state.confirmation_dialog_box}>
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
                                        <img src={this.props.app_state.static_assets['letter']} style={{height:20 ,width:'auto'}} />
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
        else if(tem['selected_tag'] == this.props.app_state.loc['1264k']/* 'audioport' */){
            var object = this.get_item_in_array2(tem['e5_id'],this.get_all_sorted_objects(this.props.app_state.created_audios))
            if(object != null){
                return object['ipfs'].entered_title_text
            }
        }
        else if(tem['selected_tag'] == this.props.app_state.loc['1264p']/* 'videoport' */){
            var object = this.get_item_in_array2(tem['e5_id'],this.get_all_sorted_objects(this.props.app_state.created_videos))
            if(object != null){
                return object['ipfs'].entered_title_text
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
        var obj = {'contracts':'📑', 'jobs':'💼', 'contractors':'👷🏻‍♀️', 'storefront':'🏪','subscriptions':'🎫', 'posts':'📰','channels':'📡','E5tokens':'🪙','externals':'🌕', 'proposals':'🧎', 'mail':'📬', 'bags':'🛍', 'ends ☝️':'', 'spends 🫰':'', 'audioport':'🎧', 'videoport':'📺'}
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
        obj[this.props.app_state.loc['1264k']/* audioport */] = '🎧'
        obj[this.props.app_state.loc['1264p']/* 'videoport' */] = '📺'
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
        else if(tem['selected_tag'] == this.props.app_state.loc['1264k']/* 'audioport' */){
            var selected_item = this.state.selected_audio_item
            if(this.state.detail_selected_tag == tem['selected_tag']){
                if(selected_item == tem['e5_id']){
                    is_tab_active = true
                }
            }
        }
        else if(tem['selected_tag'] == this.props.app_state.loc['1264p']/* 'videoport' */){
            var selected_item = this.state.selected_video_item
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
        else if(tem['selected_tag'] == this.props.app_state.loc['1264k']/* 'audioport' */){
           this.setState({detail_page: tem['selected_page'], detail_selected_tag:tem['selected_tag'], selected_audio_item: tem['e5_id']})
        }
        else if(tem['selected_tag'] == this.props.app_state.loc['1264p']/* 'videoport' */){
           this.setState({detail_page: tem['selected_page'], detail_selected_tag:tem['selected_tag'], selected_video_item: tem['e5_id']})
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
            }
            else{
                if(this.is_post_taken_down_for_sender(post)){
                    this.props.notify(this.props.app_state.loc['1264a']/* That link is unavailable. */)
                    return;
                }
                if(!this.should_show_post_if_masked_for_outsiders(post)){
                    this.props.notify(this.props.app_state.loc['1264a']/* That link is unavailable. */)
                    return;
                }
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
        }
        else if(item['type'] == 'contractor'){
            var contractors = this.get_all_sorted_objects(this.props.app_state.created_contractors)
            var post = this.get_item_in_array2(item['id']+item['e5'], contractors)
            if(post == null){
                this.props.notify(this.props.app_state.loc['1264a']/* That link is unavailable. */)
            }
            else{
                if(this.is_post_taken_down_for_sender(post)){
                    this.props.notify(this.props.app_state.loc['1264a']/* That link is unavailable. */)
                    return;
                }else{
                    this.open_link(item)
                }
            }
        }
        else if(item['type'] == 'job'){
            var jobs = this.get_all_sorted_objects(this.props.app_state.created_jobs)
            var post = this.get_item_in_array2(item['id']+item['e5'], jobs)
            if(post == null){
                this.props.notify(this.props.app_state.loc['1264a']/* That link is unavailable. */)
            }
            else{
                if(this.is_post_taken_down_for_sender(post)){
                    this.props.notify(this.props.app_state.loc['1264a']/* That link is unavailable. */)
                    return;
                }else{
                    this.open_link(item)
                }
            }
        }
        else if(item['type'] == 'storefront'){
            var storefronts = this.get_all_sorted_objects(this.props.app_state.created_stores)
            var post = this.get_item_in_array2(item['id']+item['e5'], storefronts)
            if(post == null){
                this.props.notify(this.props.app_state.loc['1264a']/* That link is unavailable. */)
            }
            else{
                if(!this.is_item_listed(post)){
                    this.props.notify(this.props.app_state.loc['1264a']/* That link is unavailable. */)
                    return;
                }else{
                    this.open_link(item)
                }
            }
        }
        else{
            this.open_link(item)
        }
    }

    is_post_taken_down_for_sender(object){
        var post_author = object['event'].returnValues.p5
        var me = this.props.app_state.user_account_id[object['e5']]
        if(me == null) me = 1
        if(post_author == me) return false

        if(object['ipfs'].get_take_down_option == null) return false
        var selected_take_down_option = this.get_selected_item2(object['ipfs'].get_take_down_option, 'e')
        if(selected_take_down_option == 1) return true
    }

    get_selected_item2(object, option){
        return object[option][2][0]
    }

    is_item_listed(object){
        if(object['ipfs'].get_storefront_item_listing_option == null) return true

        var selected_option = this.get_selected_item2(object['ipfs'].get_storefront_item_listing_option, 'e')
        var myid = this.props.app_state.user_account_id[object['e5']]
        if(myid == null) myid = 1
        if(selected_option == 2 && object['event'].returnValues.p5 != myid){
            return false
        }
        return true
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

    should_show_post_if_masked_for_outsiders(object){
        var selected_option = this.is_post_marked_as_masked_for_outsiders(object)
        if(selected_option == false) return true
        else{
            var me = this.props.app_state.user_account_id[object['e5']]
            if(me == null) me = 1
            if(me <1000){
                return false
            }else{
                return true
            }
        }
    }

    is_post_marked_as_masked_for_outsiders(object){
        if(object['ipfs'].get_masked_from_outsiders_option == null) return false
        var selected_masked_option = this.get_selected_item2(object['ipfs'].get_masked_from_outsiders_option, 'e')
        if(selected_masked_option == 1) return true
        else return false
    }

    open_link(item){
        
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
            var _id = this.find_mail_object_from_convo_id(id)
            this.setState({selected_mail_item: _id})
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

    find_mail_object_from_convo_id(convo_id){
        var all_mail = this.get_all_mail()
        var object = all_mail.find(x => x['convo_id'] === convo_id);
        if(object == null) return;
        return object['id']
    }










    render_metrics_section(h){
        return(
            <div>
                <div style={{'padding':'10px 10px 10px 10px', 'margin':'0px 0px 0px 5px', 'background-color':this.props.theme['card_background_color'],'border-radius': '15px', height:h, 'overflow-y': 'auto',}}>

                    {this.render_detail_item('3',{'title':this.props.app_state.loc['2817']/* 'Available E5s.' */, 'details':this.props.app_state.loc['2818']/* 'The E5s that are currently in use.' */, 'size':'l'})}
                    {this.load_preferred_e5_ui()}
                    {this.render_detail_item('0')} 


                    {this.render_detail_item('3',{'title':this.props.app_state.loc['2819']/* 'Active Wallets.' */, 'details':this.props.app_state.loc['2820']/* 'Your wallet ethers that have balances.' */, 'size':'l'})}
                    {this.render_my_balances()}
                    {this.render_detail_item('0')} 

                    {this.render_detail_item('3',{'title':this.props.app_state.loc['2821']/* 'Estimated Gas.' */, 'details':this.props.app_state.loc['2822']/* 'The estimated gas set to be consumed in your next run.' */, 'size':'l'})}
                    <div style={{height: 5}}/>
                    {this.render_stack_gas_figure()}


                    {this.render_detail_item('0')}
                    {this.render_detail_item('3',{'title':this.props.app_state.loc['2844']/* 'Acitve E5 Info.' */, 'details':this.props.app_state.loc['2845']/* 'Telemetries for your selected E5' */, 'size':'l'})}
                    <div style={{height: 5}}/>
                    {this.load_E5_charts()}




                    {this.render_detail_item('0')} 
                    {this.render_detail_item('3',{'title':this.props.app_state.loc['2823']/* 'Stats and Telemetries.' */, 'details':this.props.app_state.loc['2824']/* 'Some info about E5 in its entirety.' */, 'size':'l'})}
                    <div style={{height: 5}}/>
                    {this.render_transaction_data()}


                    

                </div>
            </div>
        )
    }

    load_active_e5s(){
        var active_e5s = []
        for(var i=0; i<this.props.app_state.e5s['data'].length; i++){
            var e5 = this.props.app_state.e5s['data'][i]
            if(this.props.app_state.e5s[e5].active == true){
                active_e5s.push(e5)
            }
        }
        return active_e5s
    }

    load_preferred_e5_ui(){
        var items = this.load_active_e5s()
        var items2 = [0, 1]
        return(
            <div style={{'margin':'3px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                    {items.map((item, index) => (
                        <li style={{'display': 'inline-block', 'margin': '0px 2px 1px 2px', '-ms-overflow-style':'none'}}>
                            {this.render_e5_item(item)}
                        </li>
                    ))}
                    {/* {items2.map(() => (
                        <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}}>
                            {this.render_empty_horizontal_list_item()}
                        </li>
                    ))} */}
                </ul>
            </div>
        )

    }

    render_empty_horizontal_list_item(){
        var background_color = this.props.theme['view_group_card_item_background']
        return(
            <div style={{'padding':'0px 0px 0px 0px'}}>
                <div style={{height:54, width:85, 'background-color': background_color, 'border-radius': '8px','padding':'10px','margin':'0px 0px 0px 0px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                    <div style={{'margin':'0px 0px 0px 0px'}}>
                        <img src={this.props.app_state.static_assets['letter']} style={{height:20 ,width:'auto'}} />
                    </div>
                </div>
            </div>
        )
    }

    render_e5_item(item){
        var image = this.props.app_state.e5s[item].e5_img
        var details = this.props.app_state.e5s[item].token
        if(this.props.app_state.selected_e5 == item){
            return(
                <div>
                    {this.render_detail_item('12', {'title':item, 'image':image,'details':details, 'size':'s'})}
                    {/* <div style={{height:'1px', 'background-color':'#C1C1C1', 'margin': '3px 5px 0px 5px'}}/> */}
                </div>
            )
        }else{
            return(
                <div>
                    {this.render_detail_item('12', {'title':item, 'image':image, 'details':details, 'size':'s'})}
                </div>
            )
        }
    }





    get_my_balances(){
        var e5s = this.props.app_state.e5s['data']
        var selected_e5s = []
        for(var i=0; i<e5s.length; i++){
            var focused_e5 = e5s[i]
            var balance = this.props.app_state.account_balance[focused_e5]
            if(balance > 0){
                if(focused_e5 == 'E35' && selected_e5s.includes('E25')){

                }else{
                    selected_e5s.push(focused_e5)
                }
            }
        }
        return selected_e5s
    }

    render_my_balances(){
        var items = this.get_my_balances()
        var coin_items = this.get_my_coin_balances()
        if(items.length == 0 && coin_items.length == 0){
            items = [1, 2, 3]
            return(
                <div style={{'margin':'3px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                    <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                        {items.map((item, index) => (
                            <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}}>
                                {this.render_empty_horizontal_list_item2()}
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }else{
            var items2 = [0, 1]
            return(
                <div style={{'margin':'3px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                    <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                        {items.map((item, index) => (
                            <li style={{'display': 'inline-block', 'margin': '0px 2px 1px 2px', '-ms-overflow-style':'none'}}>
                                {this.render_ether_balance_item(item)}
                            </li>
                        ))}
                        {coin_items.map((item, index) => (
                            <li style={{'display': 'inline-block', 'margin': '0px 2px 1px 2px', '-ms-overflow-style':'none'}}>
                                <div onClick={() => this.props.view_number({'title':item['title'], 'number':item['balance'], 'relativepower':item['base_unit']})}>
                                    {this.render_coin_item({'title':item['title'], 'image':item['image'], 'details':this.format_account_balance_figure(item['balance']) + ' '+item['base_unit']+'s', 'size':'s', 'img_size':30})}
                                </div>
                            </li>
                        ))}
                        {/* {items2.map(() => (
                            <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}}>
                                {this.render_empty_horizontal_list_item2()}
                            </li>
                        ))} */}
                    </ul>
                </div>
            )
        }
    }


    render_ether_balance_item(item){
        var image = this.props.app_state.e5s[item].ether_image
        var token_name = this.props.app_state.e5s[item].token
        var details = this.format_account_balance_figure(this.props.app_state.account_balance[item]) + ' wei'
        return(
            <div onClick={() => this.props.view_number({'title':this.props.app_state.e5s[item].token, 'number':this.props.app_state.account_balance[item], 'relativepower':'wei'})}>
                {this.render_coin_item({'title':token_name, 'image':image, 'details':details, 'size':'s', 'img_size':30})}
            </div>
        )
    }

    render_empty_horizontal_list_item2(){
        var background_color = this.props.theme['view_group_card_item_background']
        return(
            <div>
                <div style={{height:43, width:127, 'background-color': background_color, 'border-radius': '8px','padding':'10px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                    <div style={{'margin':'0px 0px 0px 0px'}}>
                        <img src={this.props.app_state.static_assets['letter']} style={{height:20 ,width:'auto'}} />
                    </div>
                </div>
            </div>
        )
    }

    render_coin_item(object_data){
        var background_color = this.props.theme['view_group_card_item_background'];
        var border_radius = '7px';
        var E5EmptyIcon = 'https://nftstorage.link/ipfs/bafkreib7qp2bgl3xnlgflwmqh7lsb7cwgevlr4s2n5ti4v4wi4mcfzv424'
        var title = 'Author';
        var details = 'e25885';
        var size = 'l';
        var img_size = 45
        if(object_data != null){
            title = object_data['title']
            details = object_data['details']
            size = object_data['size']
        }
        var font_size = ['12px', '10px', 16];
        if(size == 'l'){
            font_size = ['17px', '13px', 19];
        }
        if(title == ''){
            title = '...'
        }
        if(details == ''){
            details = '...'
        }
        var img = E5EmptyIcon;
        if(object_data != null){
            img = object_data['image'];
        }
        if(object_data != null && object_data['img_size'] != null){
            img_size = object_data['img_size']
        }
        return (
            <div style={{'display': 'flex','flex-direction': 'row','padding': '5px 15px 5px 0px','margin':'0px 0px 0px 0px', 'background-color': background_color,'border-radius': border_radius}}>
                <div style={{'display': 'flex','flex-direction': 'row','padding': '0px 0px 0px 5px'}}>
                    <div style={{'margin':'0px 0px 0px 0px'}}>
                        <img src={img} style={{height:img_size ,width:img_size}} />
                    </div>
                    <div style={{'margin':'0px 0px 0px 5px'}}>
                        <p style={{'font-size': font_size[0],'color': this.props.theme['primary_text_color'],'margin': '0px 0px 0px 0px','font-family': this.props.font,'text-decoration': 'none', height:'auto', 'word-wrap': 'break-word'}}>{title}</p> 
                        
                        <p style={{'font-size': font_size[1],'color': this.props.theme['secondary_text_color'],'margin': '0px 0px 0px 0px','font-family': this.props.font,'text-decoration': 'none', 'white-space': 'pre-line', 'word-wrap': 'break-word' }}>{details}</p>
                    </div>
                </div>
            </div>
        ); 
    }

    get_my_coin_balances(){
        var selected_coins = []
        var coins = this.props.app_state.coin_data
        for (const coin in coins) {
            if (coins.hasOwnProperty(coin)) {
                var balance = coins[coin]['balance'];
                if(balance != 0){
                    selected_coins.push({'title':coin, 'balance':balance , 'base_unit':this.get_coin_data(coin)['base_unit'], 'image':this.get_coin_data(coin)['label']['image']})
                }
            }
        }
        return selected_coins
    }

    get_coin_data(symbol){
        return this.props.app_state.coins[symbol]
    }





    render_stack_gas_figure(){
        return(
            <div>
                <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                    
                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['1452']/* 'Estimated Gas To Be Consumed' */, 'subtitle':this.format_power_figure(this.estimated_gas_consumed()), 'barwidth':this.calculate_bar_width(this.estimated_gas_consumed()), 'number':this.format_account_balance_figure(this.estimated_gas_consumed()), 'barcolor':'', 'relativepower':'gas', })}

                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['1453']/* 'Wallet Impact' */, 'subtitle':this.format_power_figure(this.calculate_wallet_impact_figure()), 'barwidth':this.calculate_bar_width(this.calculate_wallet_impact_figure()), 'number':this.calculate_wallet_impact_figure()+'%', 'barcolor':'', 'relativepower':'proportion', })}

                </div>
            </div>
        )
    }

    calculate_wallet_impact_figure(){
        var estimated_gas_to_be_consumed = this.estimated_gas_consumed()
        var gas_price = this.props.app_state.gas_price[this.props.app_state.selected_e5]
        if(gas_price == null){
            gas_price = this.get_gas_price_from_runs()
        }
        if(this.props.app_state.run_gas_price != 0){
            gas_price = this.props.app_state.run_gas_price
        }
        var total_ether_to_be_spent = estimated_gas_to_be_consumed * gas_price
        var my_balance = this.props.app_state.account_balance[this.props.app_state.selected_e5]

        if(my_balance == 0) return 0

        var x = (total_ether_to_be_spent / my_balance) * 100
        return Math.round(x * 1000) / 1000
    }

    estimated_gas_consumed(){
        var gas_figure = this.props.app_state.calculated_gas_figures[this.props.app_state.selected_e5]
        if(gas_figure == null) return 0
        return gas_figure
    }

    get_gas_price_from_transactions(){
        var last_blocks = this.props.app_state.last_blocks[this.props.app_state.selected_e5]
        var sum = 0
        if(last_blocks != null){
            for(var i=0; i<last_blocks.length; i++){
                sum += last_blocks[i].baseFeePerGas
            }
            sum = sum/last_blocks.length;
        }
        return sum
    }

    get_gas_price_from_runs(){
        var last_events = this.props.app_state.all_E5_runs[this.props.app_state.selected_e5]
        var sum = 0
        if(last_events != null){
            var last_check = last_events.length < 50 ? last_events.length : 50
            for(var i=0; i<last_check; i++){
                sum += last_events[i].returnValues.p7
            }
            sum = sum/last_check;
        }
        return sum
    }





    render_transaction_data(){
        var transaction_events = this.load_all_event_data('transaction').length
        var transfer_events = this.load_all_event_data('transfer').length
        var traffic_proportion_events = this.load_traffic_proportion_data()

        var subscription_events = this.load_all_event_data('subscription').length
        var contract_events = this.load_all_event_data('contract').length
        var proposal_events = this.load_all_event_data('proposal').length
        var exchange_events = this.load_all_event_data('exchange').length
        var post_events = this.load_all_event_data('post').length
        var channel_events = this.load_all_event_data('channel').length
        var job_events = this.load_all_event_data('job').length
        var store_events = this.load_all_event_data('store').length
        var bag_events = this.load_all_event_data('bag').length
        var contractor_events = this.load_all_event_data('contractor').length

        return(
            <div>
                <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['2836']/* 'Total E5 Runs.' */, 'subtitle':this.format_power_figure(transaction_events), 'barwidth':this.calculate_bar_width(transaction_events), 'number':this.format_account_balance_figure(transaction_events), 'barcolor':'', 'relativepower':this.props.app_state.loc['2837']/* 'Runs.' */, })}
                </div>
                <div style={{height: 10}}/>

                <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '20px 10px 5px 10px','border-radius': '8px' }}>
                        <p style={{'color': this.props.theme['primary_text_color'], 'font-size': '11px', height: 7, 'margin':'0px 0px 20px 10px', 'font-family': this.props.app_state.font}} className="fw-bold">{this.props.app_state.loc['2825']/* Total E5 Subscriptions, Contracts and Proposals created. */}</p>
                        {this.render_detail_item('2', this.render_small_number(subscription_events, this.props.app_state.loc['2826']/* subscriptions */))}
                        {this.render_detail_item('2', this.render_small_number(contract_events, this.props.app_state.loc['2827']/* contracts */))}
                        {this.render_detail_item('2', this.render_small_number(proposal_events, this.props.app_state.loc['2828']/* proposals */))}  
                </div>
                <div style={{height: 10}}/>


                <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '20px 10px 5px 10px','border-radius': '8px' }}>
                        <p style={{'color': this.props.theme['primary_text_color'], 'font-size': '11px', height: 7, 'margin':'0px 0px 20px 10px', 'font-family': this.props.app_state.font}} className="fw-bold">{this.props.app_state.loc['2841']/* Total Exchanges, Posts and Channels created. */}</p>
                        
                        {this.render_detail_item('2', this.render_small_number(exchange_events, this.props.app_state.loc['2829']/* exchanges */))}
                        {this.render_detail_item('2', this.render_small_number(post_events, this.props.app_state.loc['2830']/* posts */))}
                        {this.render_detail_item('2', this.render_small_number(channel_events, this.props.app_state.loc['2831']/* channels */))}
                        {this.render_detail_item('2', this.render_small_number(job_events, this.props.app_state.loc['2832']/* jobs */))}
                </div>
                <div style={{height: 10}}/>

                <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '20px 10px 5px 10px','border-radius': '8px' }}>
                        <p style={{'color': this.props.theme['primary_text_color'], 'font-size': '11px', height: 7, 'margin':'0px 0px 20px 10px', 'font-family': this.props.app_state.font}} className="fw-bold">{this.props.app_state.loc['2843']/* Total Storefront-items, Bags and Contractors created */}</p>
                        {this.render_detail_item('2', this.render_small_number(store_events, this.props.app_state.loc['2833']/* storefront-items */))}
                        {this.render_detail_item('2', this.render_small_number(bag_events, this.props.app_state.loc['2834']/* bags */))}
                        {this.render_detail_item('2', this.render_small_number(contractor_events, this.props.app_state.loc['2835']/* contractors */))}
                </div>
                <div style={{height: 10}}/>

                <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['2838']/* 'Total E5 Transfers.' */, 'subtitle':this.format_power_figure(transfer_events), 'barwidth':this.calculate_bar_width(transfer_events), 'number':this.format_account_balance_figure(transfer_events), 'barcolor':'', 'relativepower':this.props.app_state.loc['2839']/* 'transfers' */, })}
                </div>
                <div style={{height: 10}}/>

                <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '20px 10px 5px 10px','border-radius': '8px' }}>
                        <p style={{'color': this.props.theme['primary_text_color'], 'font-size': '11px', height: 7, 'margin':'0px 0px 20px 10px', 'font-family': this.props.app_state.font}} className="fw-bold">{this.props.app_state.loc['2840']/* E5 Traffic Distribution. */}</p>
                        
                        <ul style={{ 'padding': '0px 0px 0px 0px', 'listStyle':'none'}}>
                        {traffic_proportion_events.map((item, index) => (
                            <div>
                                {this.render_detail_item('2', { 'style':'s', 'title':'', 'subtitle':'', 'barwidth':(item['percentage']+'%'), 'number':item['e5'], 'relativepower':item['percentage']+'%', })}
                            </div>
                            
                        ))}
                    </ul>   
                </div>
                <div style={{height: 10}}/>

            </div>
        )
    }


    load_all_event_data(chart_id){
        var all_objects = []
        for(var i=0; i<this.props.app_state.e5s['data'].length; i++){
            var e5 = this.props.app_state.e5s['data'][i]

            var e5_chart_data = this.props.app_state.all_data[e5]
            if(e5_chart_data != null){
                var e5s_events = e5_chart_data[chart_id]
                all_objects = all_objects.concat(e5s_events)
            }
        }

        return all_objects
    }

    load_traffic_proportion_data(){
        var all_data = this.load_all_event_data('data').length
        var return_data = []
        for(var i=0; i<this.props.app_state.e5s['data'].length; i++){
            var e5 = this.props.app_state.e5s['data'][i]

            var e5_chart_data = this.props.app_state.all_data[e5]
            if(e5_chart_data != null){
                var e5s_events = e5_chart_data['data'].length
                var x = ((e5s_events * 100) / all_data)
                var rounded_proportion = Math.round(x * 1000) / 1000
                return_data.push({'e5':e5, 'percentage':rounded_proportion})
            }
        }

        return this.sortByAttributeDescending(return_data, 'percentage')
    }

    render_small_number(number, name){
        return{
            'style':'s',
            'title':'',
            'subtitle':'',
            'barwidth':this.calculate_bar_width(number),
            'number':this.format_account_balance_figure(number),
            'relativepower':name,
        }
    }






    load_E5_charts(){
        var e5_chart_data = this.props.app_state.all_data[this.props.app_state.selected_e5]
        if(e5_chart_data != null){
           return(
               <div>
                    {this.show_subscription_transaction_count_chart(e5_chart_data)}
                    {this.show_contract_transaction_count_chart(e5_chart_data)}
                    {this.show_proposal_transaction_count_chart(e5_chart_data)}
                    {this.show_exchange_transaction_count_chart(e5_chart_data)}
                    {this.show_post_transaction_count_chart(e5_chart_data)}
                    {this.show_channel_transaction_count_chart(e5_chart_data)}
                    {this.show_job_transaction_count_chart(e5_chart_data)}
                    {this.show_stores_transaction_count_chart(e5_chart_data)}
                    {this.show_bag_transaction_count_chart(e5_chart_data)}
                    {this.show_contractor_transaction_count_chart(e5_chart_data)}
                    {this.show_data_transaction_count_chart(e5_chart_data)}
                    {this.show_metadata_transaction_count_chart(e5_chart_data)}
                    {/* {this.show_withdraw_amount_data_chart(e5_chart_data)} */}
                    {this.show_deposit_amount_data_chart(e5_chart_data)}
                    {this.show_transfer_events_chart(e5_chart_data)}
                    {this.show_transaction_transaction_count_chart(e5_chart_data)}
               </div>
           ) 
        }
    }

    show_subscription_transaction_count_chart(e5_chart_data){
        var events = e5_chart_data['subscription']
        var amount = events.length
        if(events.length >= 23){
            return(
                <div>
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2262']/* Subscriptions Created' */, 'details':this.props.app_state.loc['2263']/* `Chart containing the total number of subscriptions made over time.` */, 'size':'l'})}
                    
                    {this.render_detail_item('6', {'dataPoints':this.get_transaction_count_data_points(events), 'interval':this.get_transaction_count_interval_figure(events)})}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2269e']/* 'Y-Axis: Total Subscriptions Made' */, 'details':this.props.app_state.loc['2269']/* 'X-Axis: Time' */, 'size':'s'})}
                    <div style={{height: 10}}/>
                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['2270']/* 'Total Subscriptions' */, 'number':amount, 'relativepower':this.props.app_state.loc['2271']/* 'subscriptions' */})}>
                        {this.render_detail_item('2', { 'style': 'l', 'title': this.props.app_state.loc['2270']/* 'Total Subscriptions' */, 'subtitle': this.format_power_figure(amount), 'barwidth': this.calculate_bar_width(amount), 'number': this.format_account_balance_figure(amount), 'barcolor': '', 'relativepower': this.props.app_state.loc['2271']/* 'subscriptions' */, })}
                    </div>
                    {this.render_detail_item('0')}
                </div>
            )
        }
    }

    get_transaction_count_data_points(events){
        var data = []
        try{
            for(var i=0; i<events.length; i++){
                if(i==0){
                    data.push(1)
                }
                else{
                    data.push(parseInt(data[data.length-1]) + (1))
                }

                if(i==events.length-1){
                    var diff = Date.now()/1000 - events[i].returnValues.p4
                    for(var t=0; t<diff; t+=(61*265100)){
                        data.push(data[data.length-1])      
                    }
                }
                else{
                    var diff = events[i+1].returnValues.p4 - events[i].returnValues.p4
                    for(var t=0; t<diff; t+=(61*265100)){
                        data.push(data[data.length-1])      
                    }
                }
                
            }
        }catch(e){

        }
        


        var xVal = 1, yVal = 0;
        var dps = [];
        var noOfDps = 100;
        var factor = Math.round(data.length/noOfDps) +1;
        // var noOfDps = data.length
        for(var i = 0; i < noOfDps; i++) {
            yVal = data[factor * xVal]
            // yVal = data[i]
            if(yVal != null){
                if(i%(Math.round(noOfDps/3)) == 0 && i != 0){
                    dps.push({x: xVal,y: yVal, indexLabel: ""+this.format_account_balance_figure(yVal)});//
                }else{
                    dps.push({x: xVal, y: yVal});//
                }
                xVal++;
            }
            
        }


        return dps
    }

    get_transaction_count_interval_figure(events){
        return events.length
    }



    show_contract_transaction_count_chart(e5_chart_data){
        var events = e5_chart_data['contract']
        var amount = events.length
        if(events.length >= 23){
            return(
                <div>
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2272']/* 'Contracts Created' */, 'details':this.props.app_state.loc['2273']/* `Chart containing the total number of contracts made over time.` */, 'size':'l'})}
                    
                    {this.render_detail_item('6', {'dataPoints':this.get_transaction_count_data_points(events), 'interval':this.get_transaction_count_interval_figure(events)})}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2274']/* 'Y-Axis: Total Contracts Made' */, 'details':this.props.app_state.loc['2275']/* 'X-Axis: Time' */, 'size':'s'})}
                    <div style={{height: 10}}/>
                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['2276']/* 'Total Contracts' */, 'number':amount, 'relativepower':this.props.app_state.loc['2277']/* 'contracts' */})}>
                        {this.render_detail_item('2', { 'style': 'l', 'title': this.props.app_state.loc['2276']/* 'Total Contracts' */, 'subtitle': this.format_power_figure(amount), 'barwidth': this.calculate_bar_width(amount), 'number': this.format_account_balance_figure(amount), 'barcolor': '', 'relativepower': this.props.app_state.loc['2277']/* 'contracts' */, })}
                    </div>
                    {this.render_detail_item('0')}
                </div>
            )
        }
    }

    show_proposal_transaction_count_chart(e5_chart_data){
        var events = e5_chart_data['proposal']
        var amount = events.length
        if(events.length >= 23){
            return(
                <div>
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2278']/* 'Proposals Created' */, 'details':this.props.app_state.loc['2279']/* `Chart containing the total number of proposals made over time.` */, 'size':'l'})}
                    
                    {this.render_detail_item('6', {'dataPoints':this.get_transaction_count_data_points(events), 'interval':this.get_transaction_count_interval_figure(events)})}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2280']/* 'Y-Axis: Total Proposals Made' */, 'details':this.props.app_state.loc['2275']/* 'X-Axis: Time' */, 'size':'s'})}
                    <div style={{height: 10}}/>
                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['2281']/* 'Total Proposals' */, 'number':amount, 'relativepower':this.props.app_state.loc['2282']/* 'proposals' */})}>
                        {this.render_detail_item('2', { 'style': 'l', 'title': this.props.app_state.loc['2281']/* 'Total Proposals' */, 'subtitle': this.format_power_figure(amount), 'barwidth': this.calculate_bar_width(amount), 'number': this.format_account_balance_figure(amount), 'barcolor': '', 'relativepower': this.props.app_state.loc['2282']/* 'proposals' */, })}
                    </div>
                    {this.render_detail_item('0')}
                </div>
            )
        }
    }

    show_exchange_transaction_count_chart(e5_chart_data){
        var events = e5_chart_data['exchange']
        var amount = events.length
        if(events.length >= 23){
            return(
                <div>
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2283']/* 'Exchanges Created' */, 'details':this.props.app_state.loc['2284']/* `Chart containing the total number of exchanges made over time.` */, 'size':'l'})}
                    
                    {this.render_detail_item('6', {'dataPoints':this.get_transaction_count_data_points(events), 'interval':this.get_transaction_count_interval_figure(events)})}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2285']/* 'Y-Axis: Total Exchanges Made' */, 'details':this.props.app_state.loc['2275']/* 'X-Axis: Time' */, 'size':'s'})}
                    <div style={{height: 10}}/>
                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['2286']/* 'Total Exchanges' */, 'number':amount, 'relativepower':this.props.app_state.loc['2287']/* 'exchanges' */})}>
                        {this.render_detail_item('2', { 'style': 'l', 'title': this.props.app_state.loc['2286']/* 'Total Exchanges' */, 'subtitle': this.format_power_figure(amount), 'barwidth': this.calculate_bar_width(amount), 'number': this.format_account_balance_figure(amount), 'barcolor': '', 'relativepower': this.props.app_state.loc['2287']/* 'exchanges' */, })}
                    </div>
                    {this.render_detail_item('0')}
                </div>
            )
        }
    }



    show_post_transaction_count_chart(e5_chart_data){
        var events = e5_chart_data['post']
        var amount = events.length
        if(events.length >= 23){
            return(
                <div>
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2288']/* 'Indexed Posts Created' */, 'details':this.props.app_state.loc['2289']/* `Chart containing the total number of indexed posts made over time.` */, 'size':'l'})}
                    
                    {this.render_detail_item('6', {'dataPoints':this.get_post_transaction_count_data_points(events), 'interval':this.get_post_transaction_count_interval_figure(events)})}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2290']/* 'Y-Axis: Total Posts Made' */, 'details':this.props.app_state.loc['2275']/* 'X-Axis: Time' */, 'size':'s'})}
                    <div style={{height: 10}}/>
                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['2291']/* 'Total Posts' */, 'number':amount, 'relativepower':this.props.app_state.loc['2292']/* 'posts' */})}>
                        {this.render_detail_item('2', { 'style': 'l', 'title': this.props.app_state.loc['2291']/* 'Total Posts' */, 'subtitle': this.format_power_figure(amount), 'barwidth': this.calculate_bar_width(amount), 'number': this.format_account_balance_figure(amount), 'barcolor': '', 'relativepower': this.props.app_state.loc['2292']/* 'posts' */, })}
                    </div>
                    {this.render_detail_item('0')}
                </div>
            )
        }
    }

    get_post_transaction_count_data_points(events){
        var data = []
        try{
            for(var i=0; i<events.length; i++){
                if(i==0){
                    data.push(1)
                }
                else{
                    data.push(parseInt(data[data.length-1]) + (1))
                }

                if(i==events.length-1){
                    var diff = Date.now()/1000 - events[i].returnValues.p6
                    for(var t=0; t<diff; t+=(60*60*3)){
                        data.push(data[data.length-1])      
                    }
                }
                else{
                    var diff = events[i+1].returnValues.p6 - events[i].returnValues.p6
                    for(var t=0; t<diff; t+=(60*60*3)){
                        data.push(data[data.length-1])      
                    }
                }
                
            }
        }catch(e){

        }
        


        var xVal = 1, yVal = 0;
        var dps = [];
        var noOfDps = 100;
        var factor = Math.round(data.length/noOfDps) +1;
        // var noOfDps = data.length
        for(var i = 0; i < noOfDps; i++) {
            yVal = data[factor * xVal]
            // yVal = data[i]
            if(yVal != null){
                if(i%(Math.round(noOfDps/3)) == 0 && i != 0){
                    dps.push({x: xVal,y: yVal, indexLabel: ""+this.format_account_balance_figure(yVal)});//
                }else{
                    dps.push({x: xVal, y: yVal});//
                }
                xVal++;
            }
            
        }


        return dps
    }

    get_post_transaction_count_interval_figure(events){
        return events.length
    }



    show_channel_transaction_count_chart(e5_chart_data){
        var events = e5_chart_data['channel']
        var amount = events.length
        if(events.length >= 23){
            return(
                <div>
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2293']/* 'Indexed Channels Created' */, 'details':this.props.app_state.loc['2294']/* `Chart containing the total number of indexed channels made over time.` */, 'size':'l'})}
                    
                    {this.render_detail_item('6', {'dataPoints':this.get_post_transaction_count_data_points(events), 'interval':this.get_post_transaction_count_interval_figure(events)})}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2295']/* 'Y-Axis: Total Channels Made' */, 'details':this.props.app_state.loc['2275']/* 'X-Axis: Time' */, 'size':'s'})}
                    <div style={{height: 10}}/>
                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['2296']/* 'Total Channels' */, 'number':amount, 'relativepower':this.props.app_state.loc['2297']/* 'channels' */})}>
                        {this.render_detail_item('2', { 'style': 'l', 'title': this.props.app_state.loc['2296']/* 'Total Channels' */, 'subtitle': this.format_power_figure(amount), 'barwidth': this.calculate_bar_width(amount), 'number': this.format_account_balance_figure(amount), 'barcolor': '', 'relativepower': this.props.app_state.loc['2297']/* 'channels' */, })}
                    </div>
                    {this.render_detail_item('0')}
                </div>
            )
        }
    }
    
    show_job_transaction_count_chart(e5_chart_data){
        var events = e5_chart_data['job']
        var amount = events.length
        if(events.length >= 23){
            return(
                <div>
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2298']/* 'Indexed Jobs Created' */, 'details':this.props.app_state.loc['2299']/* `Chart containing the total number of indexed jobs made over time.` */, 'size':'l'})}
                    
                    {this.render_detail_item('6', {'dataPoints':this.get_post_transaction_count_data_points(events), 'interval':this.get_post_transaction_count_interval_figure(events)})}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2300']/* 'Y-Axis: Total Jobs Made' */, 'details':this.props.app_state.loc['2275']/* 'X-Axis: Time' */, 'size':'s'})}
                    <div style={{height: 10}}/>
                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['2301']/* 'Total Jobs' */, 'number':amount, 'relativepower':this.props.app_state.loc['2302']/* 'jobs' */})}>
                        {this.render_detail_item('2', { 'style': 'l', 'title': this.props.app_state.loc['2301']/* 'Total Jobs' */, 'subtitle': this.format_power_figure(amount), 'barwidth': this.calculate_bar_width(amount), 'number': this.format_account_balance_figure(amount), 'barcolor': '', 'relativepower': this.props.app_state.loc['2302']/* 'jobs' */, })}
                    </div>
                    {this.render_detail_item('0')}
                </div>
            )
        }
    }

    show_stores_transaction_count_chart(e5_chart_data){
        var events = e5_chart_data['store']
        var amount = events.length
        if(events.length >= 23){
            return(
                <div>
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2303']/* 'Indexed Storefront Items Created' */, 'details':this.props.app_state.loc['2304']/* `Chart containing the total number of indexed storefront items made over time.` */, 'size':'l'})}
                    
                    {this.render_detail_item('6', {'dataPoints':this.get_post_transaction_count_data_points(events), 'interval':this.get_post_transaction_count_interval_figure(events)})}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2305']/* 'Y-Axis: Total Storefront Items Made' */, 'details':this.props.app_state.loc['2269']/* 'X-Axis: Time' */, 'size':'s'})}
                    <div style={{height: 10}}/>
                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['2306']/* 'Total Storefront Items' */, 'number':amount, 'relativepower':this.props.app_state.loc['445']/* 'items' */})}>
                        {this.render_detail_item('2', { 'style': 'l', 'title': this.props.app_state.loc['2306']/* 'Total Storefront Items' */, 'subtitle': this.format_power_figure(amount), 'barwidth': this.calculate_bar_width(amount), 'number': this.format_account_balance_figure(amount), 'barcolor': '', 'relativepower': this.props.app_state.loc['445']/* 'items' */, })}
                    </div>
                    {this.render_detail_item('0')}
                </div>
            )
        }
    }

    show_bag_transaction_count_chart(e5_chart_data){
        var events = e5_chart_data['bag']
        var amount = events.length
        if(events.length >= 23){
            return(
                <div>
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2308']/* 'Bags Created' */, 'details':this.props.app_state.loc['2309']/* `Chart containing the total number of bags made over time.` */, 'size':'l'})}
                    
                    {this.render_detail_item('6', {'dataPoints':this.get_transaction_count_data_points(events), 'interval':this.get_transaction_count_interval_figure(events)})}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2310']/* 'Y-Axis: Total Bags Made' */, 'details':this.props.app_state.loc['1461']/* 'X-Axis: Time' */, 'size':'s'})}
                    <div style={{height: 10}}/>
                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['2311']/* 'Total Bags' */, 'number':amount, 'relativepower':this.props.app_state.loc['2312']/* 'bags' */})}>
                        {this.render_detail_item('2', { 'style': 'l', 'title': this.props.app_state.loc['2311']/* 'Total Bags' */, 'subtitle': this.format_power_figure(amount), 'barwidth': this.calculate_bar_width(amount), 'number': this.format_account_balance_figure(amount), 'barcolor': '', 'relativepower': this.props.app_state.loc['2312']/* 'bags' */, })}
                    </div>
                    {this.render_detail_item('0')}
                </div>
            )
        }
    }

    show_contractor_transaction_count_chart(e5_chart_data){
        var events = e5_chart_data['contractor']
        var amount = events.length
        if(events.length >= 23){
            return(
                <div>
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2313']/* 'Indexed Contractors Created' */, 'details':this.props.app_state.loc['2314']/* `Chart containing the total number of indexed contractors made over time.` */, 'size':'l'})}
                    
                    {this.render_detail_item('6', {'dataPoints':this.get_post_transaction_count_data_points(events), 'interval':this.get_post_transaction_count_interval_figure(events)})}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2315']/* 'Y-Axis: Total Contractor Posts' */, 'details':this.props.app_state.loc['2275']/* 'X-Axis: Time' */, 'size':'s'})}
                    <div style={{height: 10}}/>
                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['2316']/* 'Total Contractor Posts' */, 'number':amount, 'relativepower':this.props.app_state.loc['1198']/* 'contractors' */})}>
                        {this.render_detail_item('2', { 'style': 'l', 'title': this.props.app_state.loc['2316']/* 'Total Contractor Posts' */, 'subtitle': this.format_power_figure(amount), 'barwidth': this.calculate_bar_width(amount), 'number': this.format_account_balance_figure(amount), 'barcolor': '', 'relativepower': this.props.app_state.loc['1198']/* 'contractors' */, })}
                    </div>
                    {this.render_detail_item('0')}
                </div>
            )
        }
    }

    show_data_transaction_count_chart(e5_chart_data){
        var events = e5_chart_data['data']
        var amount = events.length
        if(events.length >= 23){
            return(
                <div>
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2317']/* 'Data Throughput' */, 'details':this.props.app_state.loc['2318']/* `Chart containing the data throughput over time.` */, 'size':'l'})}
                    
                    {this.render_detail_item('6', {'dataPoints':this.get_post_transaction_count_data_points(events), 'interval':this.get_post_transaction_count_interval_figure(events)})}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2319']/* 'Y-Axis: Total Data Events' */, 'details':this.props.app_state.loc['1461']/* 'X-Axis: Time' */, 'size':'s'})}
                    <div style={{height: 10}}/>
                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['2320']/* 'Total Data Events' */, 'number':amount, 'relativepower':this.props.app_state.loc['1263']/* 'events' */})}>
                        {this.render_detail_item('2', { 'style': 'l', 'title': this.props.app_state.loc['2320']/* 'Total Data Events' */, 'subtitle': this.format_power_figure(amount), 'barwidth': this.calculate_bar_width(amount), 'number': this.format_account_balance_figure(amount), 'barcolor': '', 'relativepower': this.props.app_state.loc['1263']/* 'events' */, })}
                    </div>
                    {this.render_detail_item('0')}
                </div>
            )
        }
    }



    show_metadata_transaction_count_chart(e5_chart_data){
        var events = e5_chart_data['metadata']
        var amount = events.length
        if(events.length >= 23){
            return(
                <div>
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2321']/* 'Metadata Throughput' */, 'details':this.props.app_state.loc['2322']/* `Chart containing the total number of metadata events made over time.` */, 'size':'l'})}
                    
                    {this.render_detail_item('6', {'dataPoints':this.get_metadata_transaction_count_data_points(events), 'interval':this.get_metadata_transaction_count_interval_figure(events)})}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2323']/* 'Y-Axis: Total Metadata Events' */, 'details':this.props.app_state.loc['2275']/* 'X-Axis: Time' */, 'size':'s'})}
                    <div style={{height: 10}}/>
                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['2324']/* 'Total Metadata Events' */, 'number':amount, 'relativepower':this.props.app_state.loc['2325']/* 'events' */})}>
                        {this.render_detail_item('2', { 'style': 'l', 'title': this.props.app_state.loc['2324']/* 'Total Metadata Events' */, 'subtitle': this.format_power_figure(amount), 'barwidth': this.calculate_bar_width(amount), 'number': this.format_account_balance_figure(amount), 'barcolor': '', 'relativepower': this.props.app_state.loc['2325']/* 'events' */, })}
                    </div>
                    {this.render_detail_item('0')}
                </div>
            )
        }
    }

    get_metadata_transaction_count_data_points(events){
        var data = []
        try{
            for(var i=0; i<events.length; i++){
                if(i==0){
                    data.push(1)
                }
                else{
                    data.push(parseInt(data[data.length-1]) + (1))
                }

                if(i==events.length-1){
                    var diff = Date.now()/1000 - events[i].returnValues.p5
                    for(var t=0; t<diff; t+=(60*60*3)){
                        data.push(data[data.length-1])      
                    }
                }
                else{
                    var diff = events[i+1].returnValues.p5 - events[i].returnValues.p5
                    for(var t=0; t<diff; t+=(60*60*3)){
                        data.push(data[data.length-1])      
                    }
                }
                
            }
        }catch(e){

        }
        


        var xVal = 1, yVal = 0;
        var dps = [];
        var noOfDps = 100;
        var factor = Math.round(data.length/noOfDps) +1;
        // var noOfDps = data.length
        for(var i = 0; i < noOfDps; i++) {
            yVal = data[factor * xVal]
            // yVal = data[i]
            if(yVal != null){
                if(i%(Math.round(noOfDps/3)) == 0 && i != 0){
                    dps.push({x: xVal,y: yVal, indexLabel: ""+this.format_account_balance_figure(yVal)});//
                }else{
                    dps.push({x: xVal, y: yVal});//
                }
                xVal++;
            }
            
        }


        return dps
    }

    get_metadata_transaction_count_interval_figure(events){
        return events.length
    }



    show_withdraw_amount_data_chart(e5_chart_data){
        var events = e5_chart_data['withdraw']
        if(events.length >= 23){
            return(
                <div>
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2326']/* 'Withdrawn Ether' */, 'details':this.props.app_state.loc['2327']/* `The total amount of ether thats been withdrawn from the E5 over time.` */, 'size':'l'})}
                    
                    {this.render_detail_item('6', {'dataPoints':this.get_withdraw_amount_data_points(events), 'interval':110, 'hide_label': true})}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2328']/* 'Y-Axis: Total Withdrawn Ether' */, 'details':this.props.app_state.loc['2275']/* 'X-Axis: Time' */, 'size':'s'})}
                    {this.render_detail_item('0')}
                </div>
            )
        }
    }

    get_withdraw_amount_data_points(events){
        var data = []
        try{
            for(var i=0; i<events.length; i++){
                if(i == 0){
                    data.push(bigInt(events[i].returnValues.p5))
                }else{
                    data.push(bigInt(data[data.length-1]).add(bigInt(events[i].returnValues.p5)))
                }

                if(i==events.length-1){
                    var diff = Date.now()/1000 - events[i].returnValues.p6
                    for(var t=0; t<diff; t+=(61*265100)){
                        data.push(data[data.length-1])      
                    }
                }
                else{
                    var diff = events[i+1].returnValues.p6 - events[i].returnValues.p6
                    for(var t=0; t<diff; t+=(61*265100)){
                        data.push(data[data.length-1])      
                    }
                }
                
            }
        }catch(e){

        }

        var xVal = 1, yVal = 0;
        var dps = [];
        var noOfDps = 100;
        var factor = Math.round(data.length/noOfDps) +1;
        // var noOfDps = data.length
        var largest_number = this.get_withdraw_amount_interval_figure(events)
        var recorded = false
        for(var i = 0; i < noOfDps; i++) {
            yVal = parseInt(bigInt(data[factor * xVal]).multiply(100).divide(largest_number))
            // yVal = data[factor * xVal]
            // yVal = data[i]
            if(yVal != null && data[factor * xVal] != null){
                if(i%(Math.round(noOfDps/3)) == 0 && i != 0 && !recorded){
                    recorded = true
                    dps.push({x: xVal,y: yVal, indexLabel: ""+this.format_account_balance_figure(data[factor * xVal])});//
                }else{
                    dps.push({x: xVal, y: yVal});//
                }
                xVal++;
            }
            
        }


        return dps
    }

    get_withdraw_amount_interval_figure(events){
        var data = []
        events.forEach(event => {
            data.push(bigInt(event.returnValues.p5))
        });
        var largest = Math.max.apply(Math, data);
        return largest
    }





    show_deposit_amount_data_chart(e5_chart_data){
        var events = e5_chart_data['transaction']
        var withdraw_events = e5_chart_data['withdraw']
        var data = this.format_deposit_witdraw_ether_events(events, withdraw_events)
        if(data.length > 3){
            return(
                <div>
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2329']/* 'Deposited Ether' */, 'details':this.props.app_state.loc['2330']/* `The total amount of ether thats been deposited into the E5 over time.` */, 'size':'l'})}
                    
                    {this.render_detail_item('6', {'dataPoints':this.get_deposit_amount_data_points(data), 'interval':110, 'hide_label': true})}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2331']/* 'Y-Axis: Total Deposited Ether' */, 'details':this.props.app_state.loc['2275']/* 'X-Axis: Time' */, 'size':'s'})}
                    {this.render_detail_item('0')}
                </div>
            )
        }
    }

    get_deposit_amount_data_points(events){
        var data = []
        var largest_number = bigInt(0)
        try{
            for(var i=0; i<events.length; i++){
                if(i == 0){
                    if(events[i]['type'] == 'deposit'){
                        var amount = bigInt(events[i]['event'].returnValues.p6)
                        data.push(amount)
                        if(largest_number.lesser(amount)) largest_number = amount
                    }else{
                        data.push(0)
                    }
                }else{
                    if(events[i]['type'] == 'deposit'){
                        var amount = bigInt(data[data.length-1]).add(bigInt(events[i]['event'].returnValues.p6))
                        data.push(amount)
                        if(largest_number.lesser(amount)) largest_number = amount
                    }else{
                        var amount = bigInt(data[data.length-1]).minus(bigInt(events[i]['event'].returnValues.p5))
                        data.push(amount)
                        if(largest_number.lesser(amount)) largest_number = amount
                    }
                    
                }

                if(i==events.length-1){
                    var diff = Date.now()/1000 - events[i]['timestamp']
                    for(var t=0; t<diff; t+=(61*26510)){
                        data.push(data[data.length-1])      
                    }
                }
                else{
                    var diff = events[i+1]['timestamp'] - events[i]['timestamp']
                    for(var t=0; t<diff; t+=(61*26510)){
                        data.push(data[data.length-1])      
                    }
                }
                
            }
        }catch(e){

        }

        // console.log('deposit_amount_data', 'largest_number', largest_number)
        // console.log('deposit_amount_data', 'data', data)

        var xVal = 1, yVal = 0;
        var dps = [];
        var noOfDps = 100;
        var factor = Math.round(data.length/noOfDps) +1;
        // var noOfDps = data.length
        // var largest_number = this.get_deposit_amount_interval_figure(events)
        var recorded = false;
        for(var i = 0; i < noOfDps; i++) {
            if(largest_number == 0) yVal = 0
            else yVal = parseInt(bigInt(data[factor * xVal]).multiply(100).divide(largest_number))
            // yVal = data[factor * xVal]
            // yVal = data[i]

            
            if(yVal != null && data[factor * xVal] != null){
                if(i%(Math.round(noOfDps/10)) == 0 && i != 0 && !recorded){
                    recorded = true
                    var label = ""+this.format_account_balance_figure(data[factor * xVal])
                    dps.push({x: xVal,y: yVal, indexLabel: label});
                }else{
                    dps.push({x: xVal, y: yVal});
                }
                xVal++;
            }
        }

        return dps
    }

    get_deposit_amount_interval_figure(events){
        var data = []
        events.forEach(event => {
            data.push(bigInt(event.returnValues.p6))
        });
        var largest = Math.max.apply(Math, data);
        return largest
    }

    format_deposit_witdraw_ether_events(deposit_events, withdraw_events){
        var all_events = []
        deposit_events.forEach(event => {
            if(!bigInt(event.returnValues.p6/* msg_value */).equals(0)){
                all_events.push({'type':'deposit', 'event':event, 'timestamp':parseInt(event.returnValues.p8/* timestamp */)})
            }
        });

        withdraw_events.forEach(event => {
            all_events.push({'type':'withdraw', 'event':event, 'timestamp':parseInt(event.returnValues.p6/* timestamp */)})
        });

        var sorted_events = this.sortByAttributeDescending(all_events, 'timestamp')
        return sorted_events.reverse()
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






    show_transaction_transaction_count_chart(e5_chart_data){
        var events = e5_chart_data['transaction']
        var amount = events.length
        if(events.length >= 23){
            return(
                <div>
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2332']/* 'Transaction Runs' */, 'details':this.props.app_state.loc['2333']/* `Chart containing the total number of E5 runs made over time.` */, 'size':'l'})}
                    
                    {this.render_detail_item('6', {'dataPoints':this.get_transaction_transaction_count_data_points(events), 'interval':this.get_transaction_transaction_count_interval_figure(events)})}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2334']/* 'Y-Axis: Total Runs Made' */, 'details':this.props.app_state.loc['2275']/* 'X-Axis: Time' */, 'size':'s'})}
                    <div style={{height: 10}}/>
                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['2335']/* 'Total Runs' */, 'number':amount, 'relativepower':this.props.app_state.loc['2336']/* 'runs' */})}>
                        {this.render_detail_item('2', { 'style': 'l', 'title': this.props.app_state.loc['2335']/* 'Total Runs' */, 'subtitle': this.format_power_figure(amount), 'barwidth': this.calculate_bar_width(amount), 'number': this.format_account_balance_figure(amount), 'barcolor': '', 'relativepower': this.props.app_state.loc['2336']/* 'runs' */, })}
                    </div>
                    {/* {this.render_detail_item('0')} */}
                </div>
            )
        }
    }

    get_transaction_transaction_count_data_points(events){
        var data = []
        try{
            for(var i=0; i<events.length; i++){
                if(i==0){
                    data.push(1)
                }
                else{
                    data.push(parseInt(data[data.length-1]) + (1))
                }

                if(i==events.length-1){
                    var diff = Date.now()/1000 - events[i].returnValues.p8
                    for(var t=0; t<diff; t+=(60*60*3)){
                        data.push(data[data.length-1])      
                    }
                }
                else{
                    var diff = events[i+1].returnValues.p8 - events[i].returnValues.p8
                    for(var t=0; t<diff; t+=(60*60*3)){
                        data.push(data[data.length-1])      
                    }
                }
                
            }
        }catch(e){

        }
        


        var xVal = 1, yVal = 0;
        var dps = [];
        var noOfDps = 100;
        var factor = Math.round(data.length/noOfDps) +1;
        // var noOfDps = data.length
        for(var i = 0; i < noOfDps; i++) {
            yVal = data[factor * xVal]
            // yVal = data[i]
            if(yVal != null){
                if(i%(Math.round(noOfDps/3)) == 0 && i != 0){
                    dps.push({x: xVal,y: yVal, indexLabel: ""+this.format_account_balance_figure(yVal)});//
                }else{
                    dps.push({x: xVal, y: yVal});//
                }
                xVal++;
            }
            
        }


        return dps
    }

    get_transaction_transaction_count_interval_figure(events){
        return events.length
    }



    show_transfer_events_chart(e5_chart_data){
        var events = e5_chart_data['transfer']
        var amount = events.length
        if(events.length >= 23){
            return(
                <div>
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2336a']/* 'Transfers' */, 'details':this.props.app_state.loc['2336b']/* `Chart containing the total number of transfers made over time.` */, 'size':'l'})}
                    
                    {this.render_detail_item('6', {'dataPoints':this.get_transfers_data_points(events), 'interval':this.get_transfers_interval_figure(events)})}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2336c']/* 'Y-Axis: Total Transfers Made' */, 'details':this.props.app_state.loc['2275']/* 'X-Axis: Time' */, 'size':'s'})}
                    <div style={{height: 10}}/>
                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['2336d']/* 'Total Transfers' */, 'number':amount, 'relativepower':this.props.app_state.loc['2336e']/* 'transfers' */})}>
                        {this.render_detail_item('2', { 'style': 'l', 'title': this.props.app_state.loc['2336d']/* 'Total Transfers' */, 'subtitle': this.format_power_figure(amount), 'barwidth': this.calculate_bar_width(amount), 'number': this.format_account_balance_figure(amount), 'barcolor': '', 'relativepower': this.props.app_state.loc['2336e']/* 'transfers' */, })}
                    </div>
                    {this.render_detail_item('0')}
                </div>
            )
        }
    }

    get_transfers_data_points(events){
        var data = []
        try{
            for(var i=0; i<events.length; i++){
                if(i==0){
                    data.push(1)
                }
                else{
                    data.push(parseInt(data[data.length-1]) + (1))
                }

                if(i==events.length-1){
                    var diff = Date.now()/1000 - events[i].returnValues.p5
                    for(var t=0; t<diff; t+=(60*60*3)){
                        data.push(data[data.length-1])      
                    }
                }
                else{
                    var diff = events[i+1].returnValues.p5 - events[i].returnValues.p5
                    for(var t=0; t<diff; t+=(60*60*3)){
                        data.push(data[data.length-1])      
                    }
                }
                
            }
        }catch(e){

        }
        


        var xVal = 1, yVal = 0;
        var dps = [];
        var noOfDps = 100;
        var factor = Math.round(data.length/noOfDps) +1;
        // var noOfDps = data.length
        for(var i = 0; i < noOfDps; i++) {
            yVal = data[factor * xVal]
            // yVal = data[i]
            if(yVal != null){
                if(i%(Math.round(noOfDps/3)) == 0 && i != 0){
                    dps.push({x: xVal,y: yVal, indexLabel: ""+this.format_account_balance_figure(yVal)});//
                }else{
                    dps.push({x: xVal, y: yVal});//
                }
                xVal++;
            }
            
        }


        return dps
    }

    get_transfers_interval_figure(events){
        return events.length
    }















    /* renders the specific element in the post or detail object */
    render_detail_item(item_id, object_data){
        return(
            <div>
                <ViewGroups graph_type={this.props.app_state.graph_type} font={this.props.app_state.font} item_id={item_id} object_data={object_data} theme={this.props.theme} delete_added_tag={this.delete_added_tag.bind(this)}/>
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


}




export default home_page;