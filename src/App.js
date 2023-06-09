import React, { Component } from 'react';
import AlertIcon from './assets/alert_icon.png';

/* blockchain stuff */
import { mnemonicToSeedSync } from 'bip39';
import { Buffer } from 'buffer';
import { bigInt } from 'big-integer';


/* shared component stuff */
import SwipeableBottomSheet from 'react-swipeable-bottom-sheet'; 
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SwipeableViews from 'react-swipeable-views';

/* pages stuff */
import Syncronizing_page from './pages/synchronizing_page';
import Home_page from './pages/home_page';
import SendReceiveEtherPage from './pages/send_receive_ether_page'
import StackPage from './pages/stack_page'
import WikiPage from './pages/wiki_page'
import NewJobPage from './pages/new_job_page'
import NewTokenPage from './pages/new_token_page'
import NewSubscriptionPage from './pages/new_subscription_page'
import NewContractPage from './pages/new_contract_page'
import NewPostPage from './pages/new_post_page'
import NewChannelPage from './pages/new_channel_page'
import NewStorefrontPage from './pages/new_storefront_page'
import NewStorefrontItemPage from './pages/new_storefront_item_page';

import { HttpJsonRpcConnector, MnemonicWalletProvider} from 'filecoin.js';
import { LotusClient } from 'filecoin.js'
import { create } from 'ipfs-http-client'


const Web3 = require('web3');
const ethers = require("ethers");
window.Buffer = window.Buffer || require("buffer").Buffer;


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

function bgN(number, power) {
  return bigInt((number+"e"+power)).toString();
}

class App extends Component {

  state = { 
    page:'?',/* the page thats being shown, ?{jobs}, e{explore}, w{wallet} */
    syncronizing_page_bottomsheet:true,/* set to true if the syncronizing page bottomsheet is visible */
    should_keep_synchronizing_bottomsheet_open: false,/* set to true if the syncronizing page bottomsheet is supposed to remain visible */
    send_receive_bottomsheet: false, stack_bottomsheet: false, wiki_bottomsheet: false, new_object_bottomsheet: false, view_image_bottomsheet:false, new_store_item_bottomsheet:false,
    syncronizing_progress:0,/* progress of the syncronize loading screen */
    theme: this.get_theme_data('light'),
    details_orientation: 'right',
    new_object_target: '0',
    created_object_array:[],
    account_balance:0, stack_items:[], 
    created_subscriptions:[], all_subscriptions:[], 
    created_contracts:[], all_contracts:[], 
    created_tokens:[], all_tokens:[]
  };


  constructor(props) {
    super(props);
    this.new_job_page = React.createRef();
    this.new_storefront_page = React.createRef();
    this.new_storefront_item_page = React.createRef();
  }

  componentDidMount() {
    console.log("mounted");
    this.load_e5_data(); 

    /* listens for when the window is resized */
    window.addEventListener("resize", this.resize.bind(this));
    this.resize();
    
  }

  /* called when the component is unmounted or closed */
  componentWillUnmount() {
    console.log("unmounted");
    window.removeEventListener("resize", this.resize.bind(this));
  }

  /* called when screensize is changed */
  resize() {
    /* set the width and height in the state */
    var post_object_w = 300;
    var detail_object_w = 400;
    
    this.setState({height: window.screen.availHeight, width: window.screen.availWidth});
  }

  /* gets the screensize in three categories, small medium and large */
  getScreenSize() {
      var width = this.state.width;
      var height = this.state.height;

      if(width<350 || height <550){
          return 'e';
      }

      else if(width == 1366 && height == 1024){
          return 'e';//l
      }

      else if(width > 1250){
          return 'e';
      }

      if(width > 1020){
          return 'e';//l
      }
      else if(width > 730){
          return 'm';
      }else{
          if(width < 280){
              return 'e';
          }
          return 's';
          
      }

  }

  get_theme_data(theme){
    //this.props.theme['']
    if(theme == 'light'){
      return{
        'bar_shadow':'#CECDCD','bar_color':'#444444', 'bar_background_color':'#919191','nav_bar_color':'#444444',
        
        'homepage_background_color':'#F1F1F1','syncronizing_page_background_color':'#F1F1F1','send_receive_ether_background_color':'#F1F1F1','send_receive_ether_overlay_background':'#474747','send_receive_ether_overlay_shadow':'#CECDCD',
        
        'primary_text_color':'#393e46','secondary_text_color':'grey',
        
        'navbar_button_selected_color':'#545454','primary_navbar_text_color':'white','secondary_navbar_text_color':'#e6e6e6','card_background_color':'rgb(225, 225, 225,.9)','card_shadow_color':'#DCDCDC',
        
        'view_group_card_item_background':'rgb(217, 217, 217,.6)','tag_background_color':'#787878','indexed_tag_background':'#5e5e5e','tag_shadow':'#868686',
        
        'chart_color':'#FCFCFC','chart_background_color':'#D5D5D5',
  
        'number_picker_label_color':'#3C3C3C','number_picker_label_shadow':'#868686',
        'number_picker_power_color':'white','number_picker_power_shadow_color':'#CECDCD','number_picker_label_text_color':'#878787',
        
        'slider_color':'white', 'toast_background_color':'white', 'calendar_color':'light'
      }
    }
    else if(theme == 'dark'){
      return{
        'bar_shadow':'#919191','bar_color':'white', 'bar_background_color':'#919191','nav_bar_color':'#444444',
        
        'homepage_background_color':'#292929','syncronizing_page_background_color':'#292929','send_receive_ether_background_color':'#292929','send_receive_ether_overlay_background':'#424242','send_receive_ether_overlay_shadow':'#424242',

        'primary_text_color':'white', 'secondary_text_color':'#e6e6e6',
        
        'navbar_button_selected_color':'#545454','card_background_color':'rgb(51, 51, 51,.9)', 'primary_navbar_text_color':'white','secondary_navbar_text_color':'#e6e6e6','card_shadow_color':'#424242',

        'view_group_card_item_background':'#2e2e2e','tag_background_color':'#444444', 'indexed_tag_background':'#404040', 'tag_shadow':'#424242',

        'chart_color':'#333333','chart_background_color':'#232323',

        'number_picker_label_color':'#3C3C3C','number_picker_label_shadow':'#262626',
        'number_picker_power_color':'white','number_picker_power_shadow_color':'#CECDCD','number_picker_label_text_color':'#878787', 
        
        'slider_color':'white','toast_background_color':'#333333', 'calendar_color':'dark'
      }
    }
  }




  render(){
    return (
      <div className="App">
        {this.render_page()}
        {this.render_synchronizing_bottomsheet()}
        {this.render_send_receive_ether_bottomsheet()}
        {this.render_stack_bottomsheet()}
        {this.render_wiki_bottomsheet()}
        {this.render_new_object_bottomsheet()}
        {this.render_view_image_bottomsheet()}
        {this.render_create_store_item_bottomsheet()}
        <ToastContainer limit={3} containerId="id"/>
      </div>
    );
  }

  render_page(){
    return(
      <Home_page 
      screensize={this.getScreenSize()} 
      width={this.state.width} height={this.state.height} app_state={this.state} open_send_receive_ether_bottomsheet={this.open_send_receive_ether_bottomsheet.bind(this)} open_stack_bottomsheet={this.open_stack_bottomsheet.bind(this)} theme={this.state.theme} details_orientation={this.state.details_orientation} 
      open_wiki_bottomsheet={this.open_wiki_bottomsheet.bind(this)} 
      open_new_object={this.open_new_object.bind(this)} 
      when_view_image_clicked={this.when_view_image_clicked.bind(this)} when_edit_job_tapped={this.when_edit_created_job_tapped.bind(this)}/>
    )
  }


  render_synchronizing_bottomsheet(){
    var background_color = this.state.theme['syncronizing_page_background_color'];
    var size = this.getScreenSize();
    return(
      <SwipeableBottomSheet overflowHeight={0} marginTop={50} onChange={this.open_syncronizing_page_bottomsheet.bind(this)} open={this.state.syncronizing_page_bottomsheet} onTransitionEnd={this.keep_syncronizing_page_open()}  style={{'z-index':'3'}} bodyStyle={{'background-color': 'transparent'}} overlayStyle={{'background-color': 'grey'}}>
          <div style={{ height: this.state.height, 'background-color': background_color, 'margin': '0px 0px 0px 0px', 'padding':'10px 10px 0px 10px', 'overflow-y':'auto'}}>
            <Syncronizing_page sync_progress={this.state.syncronizing_progress} theme={this.state.theme}/>
          </div>  
      </SwipeableBottomSheet>
    );
  }

  /* opens the bottomsheet for veiwing a post and its details when clicked */
  open_syncronizing_page_bottomsheet(){
      if(this.state != null){
        this.setState({syncronizing_page_bottomsheet: !this.state.syncronizing_page_bottomsheet});
      }
  };

  keep_syncronizing_page_open(){
    if(!this.state.syncronizing_page_bottomsheet && this.state.should_keep_synchronizing_bottomsheet_open){
        this.open_syncronizing_page_bottomsheet();
    }
  };


  render_send_receive_ether_bottomsheet(){
    var background_color = this.state.theme['send_receive_ether_background_color'];
    var overlay_background = this.state.theme['send_receive_ether_overlay_background'];
    var overlay_shadow_color = this.state.theme['send_receive_ether_overlay_shadow'];
    var size = this.getScreenSize();
    return(
      <SwipeableBottomSheet  overflowHeight={0} marginTop={0} onChange={this.open_send_receive_ether_bottomsheet.bind(this)} open={this.state.send_receive_bottomsheet} style={{'z-index':'5'}} bodyStyle={{'background-color': 'transparent'}} overlayStyle={{'background-color': overlay_background,'box-shadow': '0px 0px 0px 0px '+overlay_shadow_color}}>
          <div style={{ height: this.state.height-60, 'background-color': background_color, 'border-style': 'solid', 'border-color': overlay_shadow_color, 'border-radius': '5px 5px 0px 0px', 'border-width': '1px', 'box-shadow': '0px 0px 0px 0px '+overlay_shadow_color,'margin': '0px 0px 0px 0px', 'overflow-y':'auto'}}>
              
              <SendReceiveEtherPage app_state={this.state} size={size} notify={this.prompt_top_notification.bind(this)} send_ether_to_target={this.send_ether_to_target.bind(this)} transaction_history={this.state.account_transaction_history} theme={this.state.theme} ether_balance={this.state.account_balance}/>
          </div>
      </SwipeableBottomSheet>
    )
  }

  open_send_receive_ether_bottomsheet(){
    if(this.state != null){
        this.setState({send_receive_bottomsheet: !this.state.send_receive_bottomsheet});
      }
  }


  render_stack_bottomsheet(){
    var background_color = this.state.theme['send_receive_ether_background_color'];
    var size = this.getScreenSize();
    return(
      <SwipeableBottomSheet  overflowHeight={0} marginTop={0} onChange={this.open_stack_bottomsheet.bind(this)} open={this.state.stack_bottomsheet} style={{'z-index':'5'}} bodyStyle={{'background-color': 'transparent'}} overlayStyle={{'background-color': this.state.theme['send_receive_ether_overlay_background'],'box-shadow': '0px 0px 0px 0px '+this.state.theme['send_receive_ether_overlay_shadow']}}>
          <div style={{ height: this.state.height-60, 'background-color': background_color, 'border-style': 'solid', 'border-color': this.state.theme['send_receive_ether_overlay_background'], 'border-radius': '1px 1px 0px 0px', 'border-width': '1px', 'box-shadow': '0px 0px 2px 1px '+this.state.theme['send_receive_ether_overlay_shadow'],'margin': '0px 0px 0px 0px', 'overflow-y':'auto'}}>
              
              <StackPage app_state={this.state} size={size} theme={this.state.theme} when_device_theme_changed={this.when_device_theme_changed.bind(this)} when_details_orientation_changed={this.when_details_orientation_changed.bind(this)} notify={this.prompt_top_notification.bind(this)} when_wallet_data_updated={this.when_wallet_data_updated.bind(this)} height={this.state.height} run_transaction_with_e={this.run_transaction_with_e.bind(this)}/>
          </div>
      </SwipeableBottomSheet>
    )
  }


  open_stack_bottomsheet(){
    if(this.state != null){
        this.setState({stack_bottomsheet: !this.state.stack_bottomsheet});
      }
  }


  when_device_theme_changed(theme){
    this.setState({theme: this.get_theme_data(theme)})
  }

  when_details_orientation_changed(orientation){
    this.setState({details_orientation: orientation})
  }

  run_transaction_with_e = async (strs, ints, adds, run_gas_limit) => {
    const web3 = new Web3('http://127.0.0.1:8545/');
    const contractArtifact = require('./contract_abis/E5.json');
    const contractAddress = '0xA51c1fc2f0D1a1b8494Ed1FE312d7C3a78Ed91C0'
    const contractInstance = new web3.eth.Contract(contractArtifact.abi, contractAddress); 
    const me = this

    var v5/* t_limits */ = [1000000000000, 1000000000000];
    const gasPrice = await web3.eth.getGasPrice();
    console.log("gasPrice: "+gasPrice);
    const gasLimit = run_gas_limit;

    var encoded = contractInstance.methods.e(v5/* t_limits */, adds, ints, strs).encodeABI()

    var tx = {
        gas: gasLimit,
        to: contractAddress,
        data: encoded
    }
    web3.eth.accounts.signTransaction(tx, me.state.account.privateKey).then(signed => {
        web3.eth.sendSignedTransaction(signed.rawTransaction).on('receipt', (receipt) => {
          console.log('e Transaction receipt:', receipt);
          me.setState({stack_items: []})
          me.get_accounts_data(me.state.account)
        });
    })

  }




  render_wiki_bottomsheet(){
    var background_color = this.state.theme['send_receive_ether_background_color'];
    var size = this.getScreenSize();
    return(
      <SwipeableBottomSheet  overflowHeight={0} marginTop={0} onChange={this.open_wiki_bottomsheet.bind(this)} open={this.state.wiki_bottomsheet} style={{'z-index':'5'}} bodyStyle={{'background-color': 'transparent'}} overlayStyle={{'background-color': this.state.theme['send_receive_ether_overlay_background'],'box-shadow': '0px 0px 0px 0px '+this.state.theme['send_receive_ether_overlay_shadow']}}>
          <div style={{ height: this.state.height-60, 'background-color': background_color, 'border-style': 'solid', 'border-color': this.state.theme['send_receive_ether_overlay_background'], 'border-radius': '1px 1px 0px 0px', 'border-width': '1px', 'box-shadow': '0px 0px 2px 1px '+this.state.theme['send_receive_ether_overlay_shadow'],'margin': '0px 0px 0px 0px', 'overflow-y':'auto'}}>
              
              <WikiPage app_state={this.state} size={size} height={this.state.height} theme={this.state.theme} />
          </div>
      </SwipeableBottomSheet>
    )
  }


  open_wiki_bottomsheet(){
    if(this.state != null){
        this.setState({wiki_bottomsheet: !this.state.wiki_bottomsheet});
      }
  }




  render_new_object_bottomsheet(){
    var background_color = this.state.theme['send_receive_ether_background_color'];
    return(
      <SwipeableBottomSheet  overflowHeight={0} marginTop={0} onChange={this.open_new_object_bottomsheet.bind(this)} open={this.state.new_object_bottomsheet} style={{'z-index':'5'}} bodyStyle={{'background-color': 'transparent'}} overlayStyle={{'background-color': this.state.theme['send_receive_ether_overlay_background'],'box-shadow': '0px 0px 0px 0px '+this.state.theme['send_receive_ether_overlay_shadow']}}>
          <div style={{ height: this.state.height-60, 'background-color': background_color, 'border-style': 'solid', 'border-color': this.state.theme['send_receive_ether_overlay_background'], 'border-radius': '1px 1px 0px 0px', 'border-width': '1px', 'box-shadow': '0px 0px 2px 1px '+this.state.theme['send_receive_ether_overlay_shadow'],'margin': '0px 0px 0px 0px', 'overflow-y':'auto'}}>  
            {this.render_create_object_ui()}
          </div>
      </SwipeableBottomSheet>
    )
  }

  open_new_object_bottomsheet(){
    if(this.state != null){
      this.setState({new_object_bottomsheet: !this.state.new_object_bottomsheet});
    }
  }

  open_new_object(target){
    this.setState({new_object_target: target});
    if(this.new_job_page.current != null){
      this.new_job_page.current.set_action('create')
    }
    this.open_new_object_bottomsheet()
  }

  render_create_object_ui(){
    var target = this.state.new_object_target;
    var size = this.getScreenSize();
    if(target == '0'){
      return(
        <div>
          <NewJobPage ref={this.new_job_page} app_state={this.state} size={size} height={this.state.height} theme={this.state.theme} notify={this.prompt_top_notification.bind(this)} create_job_object={this.create_job_object.bind(this)} when_add_new_object_to_stack={this.when_add_new_object_to_stack.bind(this)} delete_object_from_stack={this.delete_object_from_stack.bind(this)}/>
        </div>
      )
    }
    else if(target == '8'){
      return(
        <div>
          <NewTokenPage app_state={this.state} size={size} height={this.state.height} theme={this.state.theme} notify={this.prompt_top_notification.bind(this)} when_add_new_object_to_stack={this.when_add_new_object_to_stack.bind(this)} delete_object_from_stack={this.delete_object_from_stack.bind(this)}/>
        </div>
      )
    }
    else if(target == '3'){
      return(
        <NewSubscriptionPage app_state={this.state} size={size} height={this.state.height} theme={this.state.theme} notify={this.prompt_top_notification.bind(this)} when_add_new_object_to_stack={this.when_add_new_object_to_stack.bind(this)} delete_object_from_stack={this.delete_object_from_stack.bind(this)}/>
      )
    }
    else if(target == '1'){
      return(
        <NewContractPage app_state={this.state} size={size} height={this.state.height} theme={this.state.theme} notify={this.prompt_top_notification.bind(this)} when_add_new_object_to_stack={this.when_add_new_object_to_stack.bind(this)} delete_object_from_stack={this.delete_object_from_stack.bind(this)}/>
      )
    }
    else if(target == '6'){
      return(
        <NewPostPage app_state={this.state} size={size} height={this.state.height} theme={this.state.theme} notify={this.prompt_top_notification.bind(this)} when_add_new_object_to_stack={this.when_add_new_object_to_stack.bind(this)} delete_object_from_stack={this.delete_object_from_stack.bind(this)}/>
      )
    }
    else if(target == '7'){
      return(
        <NewChannelPage app_state={this.state} size={size} height={this.state.height} theme={this.state.theme} notify={this.prompt_top_notification.bind(this)} when_add_new_object_to_stack={this.when_add_new_object_to_stack.bind(this)} delete_object_from_stack={this.delete_object_from_stack.bind(this)}/>
      )
    }
    else if(target == '4'){
      return(
        <NewStorefrontPage ref={this.new_storefront_page} app_state={this.state} size={size} height={this.state.height} theme={this.state.theme} notify={this.prompt_top_notification.bind(this)} open_new_store_item_bottomsheet={this.open_new_store_item_bottomsheet.bind(this)} edit_storefront_item={this.edit_storefront_item.bind(this)} when_add_new_object_to_stack={this.when_add_new_object_to_stack.bind(this)} delete_object_from_stack={this.delete_object_from_stack.bind(this)}/>
      )
    }
    
  }

  create_job_object(obj, action){
    var clone_created_object_array = this.state.created_object_array.slice()
    if(action == 'create'){
      obj['pos'] = clone_created_object_array.length
      clone_created_object_array.push(obj)
    }else{
       //it was an edit action
      var index = clone_created_object_array.indexOf(obj);
      if (index > -1) { // only splice array when item is found
        clone_created_object_array.splice(index, 1); // 2nd parameter means remove one item only
      }else{
        index = obj['pos'];
        clone_created_object_array.splice(index, 1);
      }
      clone_created_object_array.push(obj)
    }
    this.setState({created_object_array: clone_created_object_array})
    
    var me = this;
    setTimeout(function() {
      me.open_new_object_bottomsheet()
    }, (1 * 1000));
    
  }

  when_edit_created_job_tapped(obj){
    this.new_job_page.current.set_fileds_for_edit_action(obj)
    this.new_job_page.current.set_action('edit')
    this.open_new_object_bottomsheet()
  }

  edit_storefront_item(item){
    this.new_storefront_item_page.current.set_fileds_for_edit_action(item)
    this.open_new_store_item_bottomsheet()
  }



  render_create_store_item_bottomsheet(){
        var background_color = this.state.theme['send_receive_ether_background_color'];
        var size = this.getScreenSize();
        return(
            <SwipeableBottomSheet  overflowHeight={0} marginTop={0} onChange={this.open_new_store_item_bottomsheet.bind(this)} open={this.state.new_store_item_bottomsheet} style={{'z-index':'7'}} bodyStyle={{'background-color': 'transparent'}} overlayStyle={{'background-color': this.state.theme['send_receive_ether_overlay_background'],'box-shadow': '0px 0px 0px 0px '+this.state.theme['send_receive_ether_overlay_shadow']}}>
                <div style={{ height: this.state.height-70, 'background-color': background_color, 'border-style': 'solid', 'border-color': this.state.theme['send_receive_ether_overlay_background'], 'border-radius': '1px 1px 0px 0px', 'border-width': '1px', 'box-shadow': '0px 0px 2px 1px '+this.state.theme['send_receive_ether_overlay_shadow'],'margin': '0px 0px 0px 0px', 'overflow-y':'auto'}}>
                    <NewStorefrontItemPage ref={this.new_storefront_item_page} app_state={this.state} size={size} height={this.state.height} theme={this.state.theme} notify={this.prompt_top_notification.bind(this)} add_data_to_new_store_item={this.add_data_to_new_store_item.bind(this)}/>
                </div>
            </SwipeableBottomSheet>
        )
  }


    open_new_store_item_bottomsheet(){
      if(this.state != null){
        this.setState({new_store_item_bottomsheet: !this.state.new_store_item_bottomsheet});
      }
    }

    add_data_to_new_store_item(data){
      this.new_storefront_page.current.add_data_to_new_store_item(data)
      this.open_new_store_item_bottomsheet()
    }

    when_add_new_object_to_stack(state_obj){
      var stack_clone = this.state.stack_items.slice()
      var edit_id = -1
      for(var i=0; i<stack_clone.length; i++){
        if(stack_clone[i].id == state_obj.edit_object){
          edit_id = i
        }
      }
      if(edit_id != -1){
        
      }
      stack_clone.push(state_obj)
      this.setState({stack_items: stack_clone})
    }

    delete_object_from_stack(item){
      var stack_clone = this.state.stack_items.slice()
      const index = stack_clone.indexOf(item);
      if (index > -1) { // only splice array when item is found
        stack_clone.splice(index, 1); // 2nd parameter means remove one item only
      }
      this.setState({stack_items: stack_clone})
    }









  render_view_image_bottomsheet(){
      var background_color = 'transparent';
      return(
        <SwipeableBottomSheet  overflowHeight={0} marginTop={0} onChange={this.open_view_image_bottomsheet.bind(this)} open={this.state.view_image_bottomsheet} style={{'z-index':'6'}} bodyStyle={{'background-color': 'transparent'}} overlayStyle={{'background-color': 'transparent','box-shadow': '0px 0px 0px 0px #CECDCD'}}>
            <div style={{ height: this.state.height, width: this.state.width, 'background-color': background_color, 'border-style': 'solid', 'border-color': 'black', 'border-radius': '0px 0px 0px 0px', 'border-width': '0px','margin': '0px 0px 0px 0px'}}>
                {this.render_view_image()}
            </div>
        </SwipeableBottomSheet>
      )
    }

    open_view_image_bottomsheet(){
        if(this.state != null){
            this.setState({view_image_bottomsheet: !this.state.view_image_bottomsheet});
        }
    }

    /* fullscreen image rendered in bottomsheet when image item is tapped */
    render_view_image(){
      var images = this.state.view_images == null ? [] : this.state.view_images;
      var pos = this.state.view_images_pos == null ? 0 : this.state.view_images_pos;
      return(
        <div style={{'position': 'relative', height:'100%', width:'100%', 'background-color':'rgb(0, 0, 0,.9)','border-radius': '0px','display': 'flex', 'align-items':'center','justify-content':'center', 'margin':'0px 0px 0px 0px'}}>
          <SwipeableViews index={pos}>
            {images.map((item, index) => ( 
              <img src={item} style={{height:'auto',width:'100%'}} />
            ))}
          </SwipeableViews>
        </div> 
      );
    }

    when_view_image_clicked(index, images){
        this.setState({view_images: images, view_images_pos: index})
        this.open_view_image_bottomsheet()
    }





  /* prompts an alert notification from the top */
  prompt_top_notification(data, duration){
      var time = duration == null ? 1000: duration;
      // data = 'toast item blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah '
      // time = 1500000
      toast(this.render_toast_item(data), {
          position: "top-center",
          autoClose: time,
          closeButton: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          transition: Slide,
          containerId:"id",
          toastId:"tid",
          hideProgressBar: true,
          style:{'background-color':'transparent','box-shadow': '0px 0px 0px 0px #CECDCD', width:'auto'}
      });
  }


  /* renders the toast item used */
  render_toast_item(message){

    return ( 
          <div>
              <div style={{'background-color':this.state.theme['toast_background_color'], 'border-radius': '20px', 'box-shadow': '0px 0px 2px 1px '+this.state.theme['card_shadow_color'],'padding': '0px 0px 0px 5px','display': 'flex','flex-direction': 'row', width: 300}}>
                  <div style={{'padding': '10px 0px 5px 5px','display': 'flex','align-items': 'center', height:35}}> 
                      <img src={AlertIcon} style={{height:25,width:'auto','scale': '0.7'}} />
                  </div>
                  <div style={{'padding': '0px 0px 0px 8px', 'margin':'5px 0px 0px 0px','display': 'flex','align-items': 'center'}}>
                      <p style={{'font-size': '13px', 'color':this.state.theme['primary_text_color'],'text-shadow': '-0px -0px 0px #A1A1A1', 'margin':'0px'}}>{message}</p>
                  </div>
              </div>
          </div>
      );
  }





  load_e5_data = async () => {
    this.setState({should_keep_synchronizing_bottomsheet_open: true});
    

    const web3 = new Web3('ws://127.0.0.1:8545/');
    const contractArtifact = require('./contract_abis/E5.json');
    const contractAddress = '0xA51c1fc2f0D1a1b8494Ed1FE312d7C3a78Ed91C0'
    const contractInstance = new web3.eth.Contract(contractArtifact.abi, contractAddress);



    await web3.eth.net.getId().then(id =>{
      this.inc_synch_progress()
      this.setState({chain_id: id});
    })

    await web3.eth.net.getPeerCount().then(peers =>{
      this.setState({ number_of_peers: peers});
      this.inc_synch_progress()
    })

    await web3.eth.net.getNetworkType().then(type =>{
      this.setState({ network_type: type});
      this.inc_synch_progress()
    })

    web3.eth.getBlockNumber().then(blockNumber => {
        var last_blocks = [];
        var start = blockNumber-100;
        if(blockNumber < 100){
          start = 0;
        }
        for (let i = start; i <= blockNumber; i++) {
          web3.eth.getBlock(i).then(block => {
            last_blocks.push(block);
          })
        }

        this.setState({E15last_blocks: last_blocks, E15number_of_blocks: blockNumber});
        this.inc_synch_progress()
    });

    const gasPrice = await web3.eth.getGasPrice();
    this.setState({gas_price: gasPrice})



    contractInstance.events['e4']({
      filter: { p1/* sender_account_id */: 1002 }
    })
    .on('data', event => {
      console.log('Event:', event);
      
    })
    .on('error', error => {
      console.error('Error-----------:', error);
    });

    this.when_wallet_data_updated(['(32)'], 0, '')
    this.inc_synch_progress()

    

    const G5contractArtifact = require('./contract_abis/G5.json');
    const G5_address = '0x0B306BF915C4d645ff596e518fAf3F9669b97016'
    const G5contractInstance = new web3.eth.Contract(G5contractArtifact.abi, G5_address);
    var main_contract_ids = [2];
    G5contractInstance.methods.f78(main_contract_ids, false).call((error, result) => {
      if (error) {
        console.error(error);
      } else {
        this.setState({E15_contract_data: result, contract_id_data:['E35']});
        this.inc_synch_progress()
      }
    });

    const H5contractArtifact = require('./contract_abis/H5.json');
    const H5_address = '0x9A9f2CCfdE556A7E9Ff0848998Aa4a0CFD8863AE';
    const H5contractInstance = new web3.eth.Contract(H5contractArtifact.abi, H5_address);
    var token_ids = [3, 5];
    H5contractInstance.methods.f86(token_ids).call((error, result) => {
      if (error) {
        console.error(error);
      } else {
        this.setState({E15_exchange_data: result, E15_exchange_id_data:token_ids, should_keep_synchronizing_bottomsheet_open: false});
        this.inc_synch_progress()
        this.prompt_top_notification('syncronized!', 500);
      }
    });

  }

  inc_synch_progress(){
    const steps = 4;
    const incr_count = 100/steps;
    this.setState({syncronizing_progress:this.state.syncronizing_progress+incr_count})
  }

  send_ether_to_target(recipientAddress, amount, gasPrice, state){
    const web3 = new Web3('http://127.0.0.1:8545/');
    const me = this;
    web3.eth.sendTransaction({
    from: state.account.address,
    to: recipientAddress,
    value: amount.toString(),
    gasPrice: gasPrice.toString() // Adjust gas price as needed
  }).on('transactionHash', function (hash) {
      console.log('Transaction sent:', hash);

      web3.eth.getTransaction(hash).then(tx => {
          var transactions = state.account_transaction_history.slice();
          transactions.push(tx)
          me.setState({account_transaction_history: transactions})
          
          setTimeout(function() {
            me.prompt_top_notification('transaction completed!', 1200)
          }, (3 * 1000));
      })
      
      web3.eth.getBalance(state.account.address).then(balance => {
        me.setState({account_balance: balance});
      }).catch(error => {
        console.error('Error:', error);
      });
    })
    .on('error', function (error) {
      console.error('Failed to send transaction:', error);
    });
  }


  when_wallet_data_updated(added_tags, set_salt, selected_item){
    var seed = added_tags.join(' | ') + set_salt + selected_item;

    const web3 = new Web3('http://127.0.0.1:8545/');
    const account = this.get_account_from_seed(seed);
    this.setState({account: account});

    web3.eth.getBalance(account.address).then(balance => {
      this.setState({account_balance: balance});
    }).catch(error => {
      console.error('Error:', error);
    });

    this.get_filecoin_wallet(seed);
    this.store_data_in_ipfs()
    this.get_accounts_data(account)
  }

  get_account_from_seed(seed){
    const web3 = new Web3('http://127.0.0.1:8545/');
    const mnemonic = seed.trim();
    const seedBytes = mnemonicToSeedSync(mnemonic);
    const hdNode = ethers.utils.HDNode.fromSeed(seedBytes);
    const wallet = new ethers.Wallet(hdNode.privateKey);

    const account = web3.eth.accounts.privateKeyToAccount(wallet.privateKey);
    return account;
  }

  get_filecoin_wallet = async (seed) => {
    const connector = new HttpJsonRpcConnector({ url: 'https://rpc.ankr.com/filecoin', token: '' });
    const hdWalletMnemonic = seed;
    const hdDerivationPath = `m/44'/461'/0'/0/0`;
    const lotusClient = new LotusClient(connector);

    const walletProvider = new MnemonicWalletProvider( lotusClient, hdWalletMnemonic, hdDerivationPath );
    const myAddress = await walletProvider.getDefaultAddress();
    console.log(myAddress);

    const balance = await lotusClient.wallet.balance(myAddress);
    console.log('Wallet balance:', balance);



    const recipientAddress = 'f1vyte2sq5qcntdchamob3efvaapay5e4eebuwfty';
    const amount = 10**14; // Amount in FIL (1 FIL = 1e18)
    // Send the transaction
    // const message = await walletProvider.createMessage({
    //   From: lotusClient.wallet.getDefaultAddress(),
    //   To: recipientAddress,
    //   Value: amount,
    // });
    // const cid = await walletProvider.sendMessage(message)

    // console.log('Transaction CID:', cid);
    // const receipt = await walletProvider.client.state.waitMsg(cid);
    // if (receipt) {
    //   console.log('Transaction confirmed!');
    // } else {
    //   console.log('Transaction failed or pending.');
    // }
  }

  store_data_in_ipfs = async () => {
    const projectId = '2RryKWCGNDlwzCa9yTG25TumLK4';
    const projectSecret = '494188d509a288e4df6da34864f6e141';
    const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');
    const client = create({
      host: 'ipfs.infura.io',
      port: 5001,
      protocol: 'https',
      apiPath: '/api/v0',
      headers: {
        authorization: auth,
      }
    })

    try {
      const added = await client.add('hello world bry onyoni')
      console.log(added)
      console.log('Stored string on IPFS with CID:', added.path.toString());

      const response = await fetch(`https://ipfs.io/ipfs/${added.cid}`);
      if (!response.ok) {
        throw new Error(`Failed to retrieve data from IPFS. Status: ${response.status}`);
      }
      const data = await response.text();
      console.log('Retrieved data from IPFS:', data);
      // Do something with the retrieved data
    } catch (error) {
      console.log('Error uploading file: ', error)
    }


  }

  send_filecoin = async (seed) => {
    const provider = new HttpJsonRpcConnector({ url: 'https://rpc.ankr.com/filecoin', token: '' });
    const lotusClient = new LotusClient(provider);
    const hdDerivationPath = `m/44'/461'/0'/0/0`;
    const walletProvider = new MnemonicWalletProvider(lotusClient, seed, hdDerivationPath);

    const recipientAddress = 'f1vyte2sq5qcntdchamob3efvaapay5e4eebuwfty';
    const amount = 10**14; // Amount in FIL (1 FIL = 1e18)
    // const myAddress = await walletProvider.getDefaultAddress();

    // console.log('walletProvider.address:---------------',myAddress)

    // Send the transaction
    // const message = await walletProvider.createMessage({
    //   From: walletProvider.address,
    //   To: recipientAddress,
    //   Value: amount,
    // });
    // const cid = await walletProvider.sendMessage(message)

    // console.log('Transaction CID:', cid);
    // const receipt = await walletProvider.client.state.waitMsg(cid);
    // if (receipt) {
    //   console.log('Transaction confirmed!');
    // } else {
    //   console.log('Transaction failed or pending.');
    // }

  }

  


  get_transaction_history = async (account) => {
    const web3 = new Web3('http://127.0.0.1:8545/');
    
    let block = await web3.eth.getBlock('latest');
    this.setState({current_block: block});

    let number = block.number;
    const targetAddress = account.address;
    var transactions = []
    var start = 0;
    const blocks_checked = 50;
    if(number > blocks_checked){
      start = number - blocks_checked
    }
    for (let i = start; i <= number; i++) {
      web3.eth.getBlock(i).then(block => {
        let txs = block.transactions;
        if (block != null && txs != null) {
          for (let txHash of txs) {

            web3.eth.getTransaction(txHash).then(tx => {
              if (targetAddress == tx.to || targetAddress == tx.from) {
                transactions.push(tx)
                const sortedData = this.sortByAttributeDescending(transactions, 'blockNumber');
                this.setState({account_transaction_history: sortedData})
              }
            })
            
          }
        }
      });
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

  get_accounts_data = async (account) => {
    const web3 = new Web3('ws://127.0.0.1:8545/');
    const contractArtifact = require('./contract_abis/E5.json');
    const contractAddress = '0xA51c1fc2f0D1a1b8494Ed1FE312d7C3a78Ed91C0'
    const contractInstance = new web3.eth.Contract(contractArtifact.abi, contractAddress);

    var contract_addresses_events = await contractInstance.getPastEvents('e7', { fromBlock: 0, toBlock: 'latest' }, (error, events) => {});
    var contract_addresses = contract_addresses_events[0].returnValues.p5
    this.setState({E35_addresses: contract_addresses})
    
    var accounts = await contractInstance.methods.f167([],[account.address], 2).call((error, result) => {});
    console.log('account id----------------',accounts[0])


    var events = await contractInstance.getPastEvents('e4', { fromBlock: 0, toBlock: 'latest', filter: { p1/* sender_account_id */: accounts[0] } }, (error, events) => {});
    this.setState({E15_runs: events});
    console.log(events[0])

    

    const F5contractArtifact = require('./contract_abis/F5.json');
    const F5_address = contract_addresses[2];
    const F5contractInstance = new web3.eth.Contract(F5contractArtifact.abi, F5_address);
    
    var created_subscription_events = await contractInstance.getPastEvents('e1', { fromBlock: 0, toBlock: 'latest', filter: { p3/* sender_account_id */: accounts[0], p2/* object_type */:33/* subscription_object */ } }, (error, events) => {});
    var created_subscriptions = []
    for(var i=0; i<created_subscription_events.length; i++){
      var id = created_subscription_events[i].returnValues.p1
      created_subscriptions.push(id)
    }
    var created_subscription_data = await F5contractInstance.methods.f74(created_subscriptions).call((error, result) => {});
    var created_subscription_object_data = []
    for(var i=0; i<created_subscription_events.length; i++){
      created_subscription_object_data.push({'id':created_subscription_events[i], 'data':created_subscription_data[i]})
    }
    this.setState({created_subscriptions: created_subscription_object_data})
    console.log('subscription count: '+created_subscription_object_data.length)

    var all_subscription_events = await contractInstance.getPastEvents('e1', { fromBlock: 0, toBlock: 'latest', filter: { p2/* object_type */:33/* subscription_object */ } }, (error, events) => {});
    this.setState({all_subscriptions: all_subscription_events})



    const G5contractArtifact = require('./contract_abis/G5.json');
    const G5_address = contract_addresses[3];
    const G5contractInstance = new web3.eth.Contract(G5contractArtifact.abi, G5_address);

    var created_contract_events = await contractInstance.getPastEvents('e1', { fromBlock: 0, toBlock: 'latest', filter: { p3/* sender_account_id */: accounts[0], p2/* object_type */:30/* contract_obj_id */ } }, (error, events) => {});
    var created_contracts = [2]
    for(var i=0; i<created_contract_events.length; i++){
      var id = created_contract_events[i].returnValues.p1
      created_contracts.push(id)
    }

    var created_contract_data = await G5contractInstance.methods.f78(created_contracts, false).call((error, result) => {});
    var created_contract_object_data = []
    for(var i=0; i<created_contracts.length; i++){
      created_contract_object_data.push({'id':created_contracts[i], 'data':created_contract_data[i]})
    }

    this.setState({created_contracts: created_contract_object_data})
    console.log('contract count: '+created_contract_object_data.length)

    var all_contract_events = await contractInstance.getPastEvents('e1', { fromBlock: 0, toBlock: 'latest', filter: { p2/* object_type */:30/* contract_obj_id */ } }, (error, events) => {});
    this.setState({all_contracts: all_contract_events})





    const H5contractArtifact = require('./contract_abis/H5.json');
    const H5_address = contract_addresses[5];
    const H5contractInstance = new web3.eth.Contract(H5contractArtifact.abi, H5_address);

    var created_token_events = await contractInstance.getPastEvents('e1', { fromBlock: 0, toBlock: 'latest', filter: { p3/* sender_account_id */: accounts[0], p2/* object_type */:31/* token_exchange */ } }, (error, events) => {});
    var created_tokens = [3, 5]
    for(var i=0; i<created_token_events.length; i++){
      var id = created_token_events[i].returnValues.p1
      created_tokens.push(id)
    }

    var created_token_data = await H5contractInstance.methods.f86(created_tokens).call((error, result) => {});
    var created_token_object_data = []
    for(var i=0; i<created_tokens.length; i++){
      created_token_object_data.push({'id':created_tokens[i], 'data':created_token_data[i]})
    }

    this.setState({created_tokens: created_token_object_data})
    console.log('token count: '+created_token_object_data.length)

    var all_token_events = await contractInstance.getPastEvents('e1', { fromBlock: 0, toBlock: 'latest', filter: { p2/* object_type */:31/* token_exchange_id */ } }, (error, events) => {});
    this.setState({all_tokens: all_token_events})

  }


}

export default App;
