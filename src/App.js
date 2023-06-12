import React, { Component } from 'react';
import AlertIcon from './assets/alert_icon.png';

/* blockchain stuff */
import { ethers } from 'ethers';
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

const Web3 = require('web3');




class App extends Component {

  state = { 
    page:'?',/* the page thats being shown, ?{jobs}, e{explore}, w{wallet} */
    syncronizing_page_bottomsheet:true,/* set to true if the syncronizing page bottomsheet is visible */
    should_keep_synchronizing_bottomsheet_open: false,/* set to true if the syncronizing page bottomsheet is supposed to remain visible */
    send_receive_bottomsheet: false,
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
        {this.render_send_receive_ether_bottomsheet()}
        <ToastContainer limit={3} containerId="id" />
      </div>
    );
  }

  render_page(){
    return(
      <Home_page screensize={this.getScreenSize()} width={this.state.width} height={this.state.height} app_state={this.state} open_send_receive_ether_bottomsheet={this.open_send_receive_ether_bottomsheet.bind(this)}/>
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


  render_send_receive_ether_bottomsheet(){
    var background_color = '#F1F1F1';
    var size = this.getScreenSize();
    return(
      <SwipeableBottomSheet  overflowHeight={0} marginTop={0} onChange={this.open_send_receive_ether_bottomsheet.bind(this)} open={this.state.send_receive_bottomsheet} style={{'z-index':'5'}} bodyStyle={{'background-color': 'transparent'}} overlayStyle={{'background-color': '#474747','box-shadow': '0px 0px 0px 0px #CECDCD'}}>
          <div style={{ height: this.state.height-60, 'background-color': background_color, 'border-style': 'solid', 'border-color': 'white', 'border-radius': '15px 15px 0px 0px', 'border-width': '1px', 'box-shadow': '0px 0px 2px 1px #CECDCD','margin': '0px 0px 0px 0px', 'overflow-y':'auto'}}>
              <SendReceiveEtherPage app_state={this.state} size={size} notify={this.prompt_top_notification.bind(this)} send_ether_to_target={this.send_ether_to_target.bind(this)} transaction_history={this.state.account_transaction_history}/>
          </div>
      </SwipeableBottomSheet>
    )
  }

  open_send_receive_ether_bottomsheet(){
    if(this.state != null){
        this.setState({send_receive_bottomsheet: !this.state.send_receive_bottomsheet});
      }
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

    let block = await web3.eth.getBlock('latest');
    let number = block.number;
    const targetAddress = account.address;
    var transactions = []
    var start = 0;
    const blocks_checked = 350;
    if(number > blocks_checked){
      start = number - blocks_checked
    }
    for (let i = start; i <= number; i++) {
      web3.eth.getBlock(i).then(block => {
        let transactions = block.transactions;
        if (block != null && transactions != null) {
          for (let txHash of transactions) {

            web3.eth.getTransaction(txHash).then(tx => {
              if (targetAddress == tx.to || targetAddress == tx.from) {
                transactions.push(tx)
                console.log('added transaction :'+transactions.length)
                this.setState({account_transaction_history: transactions})
              }
            })
            
          }
        }
      });
    }
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
        this.setState({E15_addresses: events[0].returnValues.p5, syncronizing_progress:this.state.syncronizing_progress+incr_count}); 
        
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
        console.log(result); 
        this.setState({E15_main_contract_data: result[0], syncronizing_progress:this.state.syncronizing_progress+incr_count});
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
        this.setState({E15_End_exchange: result[0], E15_Spend_exchange: result[1], should_keep_synchronizing_bottomsheet_open: false, syncronizing_progress:this.state.syncronizing_progress+incr_count});
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
          style:{'background-color':'transparent','box-shadow': '0px 0px 0px 0px #CECDCD', width:350}
      });
  }


    /* renders the toast item used */
    render_toast_item(message){
      return ( 
            <div>
                <div style={{'background-color':'white', 'border-radius': '20px', 'box-shadow': '0px 0px 2px 1px #CECDCD','padding': '0px 0px 0px 5px', 'height':'40px', 'width':'auto','display': 'flex','flex-direction': 'row'}}>
                    <div style={{'padding': '0px 0px 0px 15px','display': 'flex','align-items': 'center'}}> 
                        <img src={AlertIcon} style={{height:'20px',width:'auto'}} />
                    </div>
                    <div style={{'padding': '0px 0px 0px 8px', 'margin':'17px 0px 0px 0px','display': 'flex','align-items': 'center'}}>
                        <p style={{'font-size': '13px', 'color':'#696969','text-shadow': '-0px -0px 0px #A1A1A1'}}>{message}</p>
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




}

export default App;
