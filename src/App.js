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

const Web3 = require('web3');
const ethers = require("ethers");
window.Buffer = window.Buffer || require("buffer").Buffer;


class App extends Component {

  state = { 
    page:'?',/* the page thats being shown, ?{jobs}, e{explore}, w{wallet} */
    syncronizing_page_bottomsheet:true,/* set to true if the syncronizing page bottomsheet is visible */
    should_keep_synchronizing_bottomsheet_open: false,/* set to true if the syncronizing page bottomsheet is supposed to remain visible */
    send_receive_bottomsheet: false, stack_bottomsheet: false, wiki_bottomsheet: false, new_object_bottomsheet: false, view_image_bottomsheet:false,
    syncronizing_progress:0,/* progress of the syncronize loading screen */
    theme: this.get_theme_data('light'),
    details_orientation: 'right',
    new_object_target: '0',
    created_object_array:[],
    account_balance:0
  };


  constructor(props) {
    super(props);
    this.new_job_page = React.createRef();
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
        
        'slider_color':'white', 'toast_background_color':'white',
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

        'number_picker_label_color':'#3C3C3C','number_picker_label_shadow':'#868686',
        'number_picker_power_color':'white','number_picker_power_shadow_color':'#CECDCD','number_picker_label_text_color':'#878787', 
        
        'slider_color':'white','toast_background_color':'#333333',
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
              
              <StackPage app_state={this.state} size={size} theme={this.state.theme} when_device_theme_changed={this.when_device_theme_changed.bind(this)} when_details_orientation_changed={this.when_details_orientation_changed.bind(this)} notify={this.prompt_top_notification.bind(this)} when_wallet_data_updated={this.when_wallet_data_updated.bind(this)}/>
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
    this.new_job_page.current.set_action('create')
    this.open_new_object_bottomsheet()
  }

  render_create_object_ui(){
    var target = this.state.new_object_target;
    var size = this.getScreenSize();
    if(target == '0'){
      return(
        <div>
          <NewJobPage ref={this.new_job_page} app_state={this.state} size={size} height={this.state.height} theme={this.state.theme} notify={this.prompt_top_notification.bind(this)} create_job_object={this.create_job_object.bind(this)}/>
        </div>
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






  load_e5_data = async () => {
    this.setState({should_keep_synchronizing_bottomsheet_open: true});
    
    const steps = 10;
    const incr_count = 100/steps;
    const web3 = new Web3('http://127.0.0.1:8545/');
    const contractArtifact = require('./contract_abis/E5.json');
    const contractAddress = '0x02b0B4EFd909240FCB2Eb5FAe060dC60D112E3a4'
    const contractInstance = new web3.eth.Contract(contractArtifact.abi, contractAddress);


    const privateKey = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80'; 
    const account = web3.eth.accounts.privateKeyToAccount(privateKey);
    this.setState({account: account});

    this.get_transaction_history(account)
    this.setState({syncronizing_progress:this.state.syncronizing_progress+incr_count})

    web3.eth.getBalance(account.address).then(balance => {
      this.setState({syncronizing_progress:this.state.syncronizing_progress+incr_count, account_balance: balance});
    }).catch(error => {
      console.error('Error:', error);
    });

    await web3.eth.net.getId().then(id =>{
      this.setState({syncronizing_progress:this.state.syncronizing_progress+incr_count, chain_id: id});
    })

    await web3.eth.net.getPeerCount().then(peers =>{
      this.setState({syncronizing_progress:this.state.syncronizing_progress+incr_count, number_of_peers: peers});
    })

    await web3.eth.net.getNetworkType().then(type =>{
      this.setState({syncronizing_progress:this.state.syncronizing_progress+incr_count, network_type: type});
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

        this.setState({E15last_blocks: last_blocks, E15number_of_blocks: blockNumber, syncronizing_progress:this.state.syncronizing_progress+incr_count});
    });
    
    contractInstance.getPastEvents('e7', {
      fromBlock: 0,
      toBlock: 'latest'
    }, (error, events) => {
      if (error) {
        console.error(error);
      } else {
        console.log('loaded addresses')
        this.setState({E35_addresses: events[0].returnValues.p5, syncronizing_progress:this.state.syncronizing_progress+incr_count}); 
        
      }
    });

    contractInstance.getPastEvents('e4', {}, (error, events) => {
      if (error) {
        console.error(error);
      } else {
        this.setState({E15_runs: events, syncronizing_progress:this.state.syncronizing_progress+incr_count}); 
      }
    });

    const G5contractArtifact = require('./contract_abis/G5.json');
    const G5_address = '0xFD6F7A6a5c21A3f503EBaE7a473639974379c351'
    const G5contractInstance = new web3.eth.Contract(G5contractArtifact.abi, G5_address);
    var main_contract_ids = [2];
    G5contractInstance.methods.f78(main_contract_ids, false).call((error, result) => {
      if (error) {
        console.error(error);
      } else {
        this.setState({E15_contract_data: result, contract_id_data:['E35'], syncronizing_progress:this.state.syncronizing_progress+incr_count});
      }
    });

    const H5contractArtifact = require('./contract_abis/H5.json');
    const H5_address = '0x5302E909d1e93e30F05B5D6Eea766363D14F9892';
    const H5contractInstance = new web3.eth.Contract(H5contractArtifact.abi, H5_address);
    var token_ids = [3, 5];
    H5contractInstance.methods.f86(token_ids).call((error, result) => {
      if (error) {
        console.error(error);
      } else {
        this.setState({E15_exchange_data: result, E15_exchange_id_data:token_ids, should_keep_synchronizing_bottomsheet_open: false, syncronizing_progress:this.state.syncronizing_progress+incr_count});
        this.prompt_top_notification('syncronized!', 500);
      }
    });

  }


  /* prompts an alert notification from the top */
  prompt_top_notification(data, duration){
      var time = duration == null ? 1000: duration;
      console.log('prompting notification!-------------')
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
              <div style={{'background-color':this.state.theme['toast_background_color'], 'border-radius': '20px', 'box-shadow': '0px 0px 2px 1px '+this.state.theme['card_shadow_color'],'padding': '0px 0px 0px 5px', 'height':'40px', 'width':'auto','display': 'flex','flex-direction': 'row'}}>
                  <div style={{'padding': '0px 0px 0px 15px','display': 'flex','align-items': 'center'}}> 
                      <img src={AlertIcon} style={{height:'20px',width:'auto'}} />
                  </div>
                  <div style={{'padding': '0px 0px 0px 8px', 'margin':'17px 0px 0px 0px','display': 'flex','align-items': 'center'}}>
                      <p style={{'font-size': '13px', 'color':this.state.theme['primary_text_color'],'text-shadow': '-0px -0px 0px #A1A1A1'}}>{message}</p>
                  </div>
              </div>
          </div>
      );
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
      this.prompt_top_notification('wallet set!', 200)
    }).catch(error => {
      console.error('Error:', error);
    });

    this.get_transaction_history(account)
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


}

export default App;
