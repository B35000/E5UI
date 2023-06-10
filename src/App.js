import React, { Component } from 'react';

/* blockchain stuff */
import { ethers } from 'ethers';
import { mnemonicToSeedSync } from 'bip39';
import { Buffer } from 'buffer';
import { bigInt } from 'big-integer';


/* shared component stuff */
import SwipeableBottomSheet from 'react-swipeable-bottom-sheet'; 
import { ToastContainer, toast, Slide } from 'react-toastify';
import SwipeableViews from 'react-swipeable-views';

/* pages stuff */
import Syncronizing_page from './pages/synchronizing_page';
import Home_page from './pages/home_page';

const Web3 = require('web3');


class App extends Component {

  state = { 
    page:'?',/* the page thats being shown, ?{jobs}, e{explore}, w{wallet} */
    syncronizing_page_bottomsheet:true,/* set to true if the syncronizing page bottomsheet is visible */
    should_keep_synchronizing_bottomsheet_open: false,/* set to true if the syncronizing page bottomsheet is supposed to remain visible */
    syncronizing_progress:0,/* progress of the syncronize loading screen */
  };

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






  render(){
    return (
      <div className="App">
        {this.render_page()}
        {this.render_synchronizing_bottomsheet()}
      </div>
    );
  }

  render_page(){
    return(
      <Home_page screensize={this.getScreenSize()} width={this.state.width} height={this.state.height} app_state={this.state}/>
    )
  }

  render_synchronizing_bottomsheet(){
    var background_color = '#F1F1F1';
    var size = this.getScreenSize();
    return(
      <SwipeableBottomSheet overflowHeight={0} marginTop={50} onChange={this.open_syncronizing_page_bottomsheet.bind(this)} open={this.state.syncronizing_page_bottomsheet} onTransitionEnd={this.keep_syncronizing_page_open()}  style={{'z-index':'3'}} bodyStyle={{'background-color': 'transparent'}} overlayStyle={{'background-color': 'grey'}}>
          <div style={{ height: this.state.height, 'background-color': background_color, 'margin': '0px 0px 0px 0px', 'padding':'10px 10px 0px 10px', 'overflow-y':'auto'}}>
            <Syncronizing_page sync_progress={this.state.syncronizing_progress}/>
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





  load_e5_data = async () => {
    this.setState({should_keep_synchronizing_bottomsheet_open: true});
    
    const steps = 5;
    const incr_count = 100/steps;
    const web3 = new Web3('http://127.0.0.1:8545/');
    const contractArtifact = require('./contract_abis/E5.json');
    const contractAddress = '0x02b0B4EFd909240FCB2Eb5FAe060dC60D112E3a4'
    const contractInstance = new web3.eth.Contract(contractArtifact.abi, contractAddress);

    web3.eth.getBlockNumber().then(blockNumber => {
        var last_blocks = [];
        var start = blockNumber-30;
        if(blockNumber < 30){
          start = 0;
        }
        for (let i = start; i <= blockNumber; i++) {
          web3.eth.getBlock(i).then(block => {
            last_blocks.push(block);
          })
        }
        this.setState({last_blocks: last_blocks, number_of_blocks: blockNumber, syncronizing_progress:this.state.syncronizing_progress+incr_count});
    });
    
    console.log('attempting to load addresses')
    contractInstance.getPastEvents('e7', {
      fromBlock: 0,
      toBlock: 'latest'
    }, (error, events) => {
      if (error) {
        console.error(error);
      } else {
        console.log('loaded addresses')
        this.setState({E5_addresses: events[0].returnValues.p5, syncronizing_progress:this.state.syncronizing_progress+incr_count}); 
        
      }
    });

    contractInstance.getPastEvents('e4', {}, (error, events) => {
      if (error) {
        console.error(error);
      } else {
        this.setState({E5_runs: events, syncronizing_progress:this.state.syncronizing_progress+incr_count}); 
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
        console.log(result); 
        this.setState({E5_main_contract_data: result[0], syncronizing_progress:this.state.syncronizing_progress+incr_count});
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
        console.log(result); 
        this.setState({E5_End_exchange: result[0], E5_Spend_exchange: result[1], should_keep_synchronizing_bottomsheet_open: false, syncronizing_progress:this.state.syncronizing_progress+incr_count});
      }
    });

  }



}

export default App;
