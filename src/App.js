import React, { Component } from 'react';
import AlertIcon from './assets/alert_icon.png';
import AlertIconDark from './assets/alert_icon_dark.png'
import AddIcon from './assets/add_icon.png'
import AddIconDark from './assets/add_icon_dark.png'

/* ether images */
import EthereumTestnet from './assets/ethereum_testnet.png'
import Harmony from './assets/harmony.png'
import Celo from './assets/celo.png'
import Flare from './assets/flare.png'
import xDai from './assets/xdai.png'
import fuse from './assets/fuse.png'
import glmr from './assets/glmr.png'
import movr from './assets/movr.png'
import matic from './assets/matic.png'
import bnb from './assets/bnb.png'
import xdc from './assets/xdc.png'
import tt from './assets/tt.png'
import nrg from './assets/nrg.png'
import viction from './assets/viction.png'
import evmos from './assets/evmos.png'
import eth from './assets/ethereum.png'
import optimism from './assets/optimism.png'
import base from './assets/base.png'
import arbitrum from './assets/arbitrum.png'
import astar from './assets/astar.png'
import cronos from './assets/cronos.png'
import kava from './assets/kava.png'
import neon from './assets/neon.png'
import mAda from './assets/milkomeda.png'
import fantom from './assets/fantom.png'
import brise from './assets/brise.png'
import syscoin from './assets/syscoin.png'
import avalanche from './assets/avalanche.png'
import findora from './assets/findora.png'
import iexec from './assets/iexec.png'
import oasis from './assets/oasis.png'
import ozone from './assets/ozone.png'
import pixie from './assets/pixie.png'
import rei from './assets/rei.png'
import klaytn from './assets/klaytn.png'
import mantle from './assets/mantle.png'
import pulse from './assets/pulse.png'
import canto from './assets/canto.png'
import eos from './assets/eos.png'
import iotex from './assets/iotex.png'
import songbird from './assets/songbird.png'
import ultron from './assets/ultron.png'
import coinex from './assets/coinex.png'
import tfuel from './assets/tfuel.png'
import step from './assets/step.png'
import energyweb from './assets/energyweb.png'
import callisto from './assets/callisto.png'
import shiden from './assets/shiden.png'
import tenet from './assets/tenet.png'
import ubiq from './assets/ubiq.png'
import gochain from './assets/gochain.png'
import omax from './assets/omax.png'
import wemix from './assets/wemix.png'
import confulx from './assets/conflux.png'
import telos from './assets/telos.png'
import rsk from './assets/rsk.png'
import metadium from './assets/metadium.png'
import kardiachain from './assets/kardiachain.png'
import cmp from './assets/cmp.png'
import seele from './assets/seele.png'
import btt from './assets/btt.png'
import doublea from './assets/doublea.png'
import karura from './assets/karura.png'
import acala from './assets/acala.png'
import edgeware from './assets/edgeware.png'
import bloxberg from './assets/bloxberg.png'
import phoenix from './assets/phoenix.png'
import omchain from './assets/omchain.png'
import om from './assets/om.png'
import mintme from './assets/mintme.png'
import ecredits from './assets/ecredits.png'
import eluv from './assets/eluv.png'
import etho from './assets/etho.png'
import oneledger from './assets/oneledger.png'


/* e5 images */
import E25EndImg from './assets/E25.png';
import E25SpendImg from './assets/325.png';
import End25Img from './assets/End25.png'

import E35EndImg from './assets/e35_end_token.png';
import E35SpendImg from './assets/e35_spend_token.png';

import E45EndImg from './assets/E45.png';
import E45SpendImg from './assets/345.png';

import E55EndImg from './assets/E55.png';
import E55SpendImg from './assets/355.png';

import E65EndImg from './assets/E65.png';
import E65SpendImg from './assets/365.png';

import E75EndImg from './assets/E75.png';
import E75SpendImg from './assets/375.png';

import E85EndImg from './assets/E85.png';
import E85SpendImg from './assets/385.png';

import E95EndImg from './assets/E95.png';
import E95SpendImg from './assets/395.png';

import E105EndImg from './assets/E105.png';
import E105SpendImg from './assets/3105.png';

import E115EndImg from './assets/E115.png';
import E115SpendImg from './assets/3115.png';

import E125EndImg from './assets/E125.png';
import E125SpendImg from './assets/3125.png';

import E135EndImg from './assets/E135.png';
import E135SpendImg from './assets/3135.png';

import E145EndImg from './assets/E145.png';
import E145SpendImg from './assets/3145.png';

import E155EndImg from './assets/E155.png';
import E155SpendImg from './assets/3155.png';

import E165EndImg from './assets/E165.png';
import E165SpendImg from './assets/3165.png';

import E175EndImg from './assets/E175.png';
import E175SpendImg from './assets/3175.png';



/* blockchain stuff */
import { mnemonicToSeedSync } from 'bip39';
import { Buffer } from 'buffer';
import { bigInt } from 'big-integer';


/* shared component stuff */
import SwipeableBottomSheet from 'react-swipeable-bottom-sheet'; 
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SwipeableViews from 'react-swipeable-views';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

/* pages stuff */
import Syncronizing_page from './pages/synchronizing_page';
import Home_page from './pages/home_page';
import SendReceiveEtherPage from './pages/send_receive_ether_page'
import StackPage from './pages/stack_page'
import WikiPage from './pages/wiki_page'

import NewJobPage from './pages/create_action_pages/new_job_page'
import NewTokenPage from './pages/create_action_pages/new_token_page'
import NewSubscriptionPage from './pages/create_action_pages/new_subscription_page'
import NewContractPage from './pages/create_action_pages/new_contract_page'
import NewPostPage from './pages/create_action_pages/new_post_page'
import NewChannelPage from './pages/create_action_pages/new_channel_page'
// import NewStorefrontPage from './pages/create_action_pages/new_storefront_page'
import NewStorefrontItemPage from './pages/create_action_pages/new_storefront_item_page';
import NewProposalPage from './pages/create_action_pages/new_proposal_page';
import NewMailPage from './pages/create_action_pages/new_mail_page';
import NewContractorPage from './pages/create_action_pages/new_contractor_page';

import EditJobPage from './pages/edit_action_pages/edit_job_page'
import EditTokenPage from './pages/edit_action_pages/edit_token_page'
import EditPostPage from './pages/edit_action_pages/edit_post_page'
import EditChannelPage from './pages/edit_action_pages/edit_channel_page'
import EditStorefrontItemPage from './pages/edit_action_pages/edit_storefront_item_page';
import EditContractorPage from './pages/edit_action_pages/edit_contractor_page';

import EnterContractPage from './pages/contract_action_pages/enter_contract_page';
import ExtendContractPage from './pages/contract_action_pages/extend_contract_page';
import ExitContractPage from './pages/contract_action_pages/exit_contract_page';
import ModifyContractPage from './pages/contract_action_pages/modify_contract_page';
import ForceExitPage from './pages/contract_action_pages/force_exit_account_page';

import NewMintActionPage from './pages/token_action_pages/mint_dump_token_page';
import NewTransferActionPage from './pages/token_action_pages/transfer_token_page';
import ModifyTokenPage from './pages/token_action_pages/modify_token_page';
import ExchangeTransferPage from './pages/token_action_pages/exchanage_transfer_page';
import FreezeUnfreezePage from './pages/token_action_pages/freeze_unfreeze_page';
import AuthMintPage from './pages/token_action_pages/authmint_page';
import DepthMintPage from './pages/token_action_pages/depthmint_page'

import VoteProposalPage from './pages/proposal_action_pages/vote_proposal_page';
import SubmitProposalPage from './pages/proposal_action_pages/submit_proposal_page';
import ArchiveProposalPage from './pages/proposal_action_pages/archive_proposals_page';

import PaySubscriptionPage from './pages/subscription_action_pages/pay_subscription_page';
import CancelSubscriptionPage from './pages/subscription_action_pages/cancel_subscription_page';
import CollectSubscriptionPage from './pages/subscription_action_pages/collect_subscription_page';
import ModifySubscriptionPage from './pages/subscription_action_pages/modify_subscription_page';

import ModeratorPage from './pages/moderator_page';
import RespondToJobPage from './pages/respond_to_job_page';
import ViewApplicationContractPage from './pages/view_application_contract_page';
import ViewTransactionPage from './pages/view_transaction_page'
import ViewTransactionLogPage from './pages/view_transaction_log'
import AddToBagPage from './pages/add_to_bag_page'
import FulfilBagPage from './pages/fulfil_bag_page'
import ViewBagApplicationContractPage from './pages/view_bag_application_contract_page'
import DirectPurchasetPage from './pages/direct_purchase_page'
import ClearPurchasePage from './pages/clear_purchase_page'
import ScanQrPage from './pages/scan_qr_page'
import SendJobRequestPage from './pages/send_job_request'
import ViewJobRequestPage from './pages/view_job_request'
import ViewJobRequestContractPage from './pages/view_job_request_contract_page'
import WithdrawEtherPage from './pages/withdraw_ether_page'
import GiveAwardPage from './pages/give_award_page'
import AddCommentPage from './pages/add_comment_page'
import SearchedAccountPage from './pages/view_searched_account'
import RPCSettingsPage from './pages/rpc_settings_page'
import ConfirmRunPage from './pages/confirm_run_page'

import { HttpJsonRpcConnector, MnemonicWalletProvider} from 'filecoin.js';
import { LotusClient } from 'filecoin.js'
import { create } from 'ipfs-http-client'
import { Web3Storage } from 'web3.storage'
import { NFTStorage, Blob } from 'nft.storage'

import Dexie from 'dexie';


const Web3 = require('web3');
const { ethers } = require("ethers");
const ecies = require('ecies-geth');
var textEncoding = require('text-encoding'); 
var CryptoJS = require("crypto-js"); 

const { countries, zones } = require("moment-timezone/data/meta/latest.json");
const { toBech32, fromBech32,} = require('@harmony-js/crypto');

var TextDecoder = textEncoding.TextDecoder;

window.Buffer = window.Buffer || Buffer;

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

String.prototype.hexEncode = function(){
    var hex, i;

    var result = "";
    for (i=0; i<this.length; i++) {
        hex = this.charCodeAt(i).toString(16);
        result += ("000"+hex).slice(-4);
    }

    return result
}

function random(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

class App extends Component {

  state = {
    page:'?',/* the page thats being shown, ?{jobs}, e{explore}, w{wallet} */
    syncronizing_page_bottomsheet:true,/* set to true if the syncronizing page bottomsheet is visible */
    should_keep_synchronizing_bottomsheet_open: false,/* set to true if the syncronizing page bottomsheet is supposed to remain visible */
    send_receive_bottomsheet: false, stack_bottomsheet: false, wiki_bottomsheet: false, new_object_bottomsheet: false, view_image_bottomsheet:false, new_store_item_bottomsheet:false, mint_token_bottomsheet:false, transfer_token_bottomsheet:false, enter_contract_bottomsheet: false, extend_contract_bottomsheet: false, exit_contract_bottomsheet:false, new_proposal_bottomsheet:false, vote_proposal_bottomsheet: false, submit_proposal_bottomsheet:false, pay_subscription_bottomsheet:false, cancel_subscription_bottomsheet: false,collect_subscription_bottomsheet: false, modify_subscription_bottomsheet:false, modify_contract_bottomsheet:false, modify_token_bottomsheet:false,exchange_transfer_bottomsheet:false, force_exit_bottomsheet:false, archive_proposal_bottomsheet:false, freeze_unfreeze_bottomsheet:false, authmint_bottomsheet:false, moderator_bottomsheet:false, respond_to_job_bottomsheet:false, view_application_contract_bottomsheet:false, view_transaction_bottomsheet:false, view_transaction_log_bottomsheet:false, add_to_bag_bottomsheet:false, fulfil_bag_bottomsheet:false, view_bag_application_contract_bottomsheet: false, direct_purchase_bottomsheet: false, scan_code_bottomsheet:false, send_job_request_bottomsheet:false, view_job_request_bottomsheet:false, view_job_request_contract_bottomsheet:false, withdraw_ether_bottomsheet: false, edit_object_bottomsheet:false, edit_token_bottomsheet:false, edit_channel_bottomsheet: false, edit_contractor_bottomsheet: false, edit_job_bottomsheet:false, edit_post_bottomsheet: false, edit_storefront_bottomsheet:false, give_award_bottomsheet: false, add_comment_bottomsheet:false, depthmint_bottomsheet:false, searched_account_bottomsheet: false, rpc_settings_bottomsheet:false, confirm_run_bottomsheet:false,

    syncronizing_progress:0,/* progress of the syncronize loading screen */
    account:null,

    theme: this.get_theme_data('light'), storage_option:'nft-storage',
    details_orientation: 'right', refresh_speed:'average', masked_content:'e', content_channeling:'international', device_language:this.get_language(), section_tags_setting:'all', visible_tabs:'e', storage_permissions: 'e', stack_optimizer: 'e',

    new_object_target: '0', edit_object_target:'0',
    account_balance:{}, stack_items:[],
    created_subscriptions:{}, all_subscriptions:{}, created_subscription_object_mapping:{},
    my_proposals:{},
    created_contracts:{}, all_contracts:{}, created_contract_mapping:{},
    created_tokens:{}, all_tokens:{}, created_token_object_mapping:{},end_balance_of_E5:{},spend_balance_of_E5:{},end_balance_of_burn_account:{},token_directory:{},
    created_posts:{},created_channels:{},
    created_jobs:{}, created_job_mappings:{}, my_applications:{},
    created_mail:{}, received_mail:{},
    created_stores:{}, created_store_mappings:{}, created_bags:{}, 
    created_contractors:{},
    mint_dump_actions:[{},], contacts:{}, should_update_contacts_onchain: false, blocked_accounts:{}, should_update_blocked_accounts_onchain: false,

    web3:'https://etc.etcdesktop.com', e5_address:'0x24d7436eC90392f20AfeD800523E0d995Ec4310d',
    
    sync_steps:(40), qr_code_scanning_page:'clear_purchaase', tag_size:13, title_size:65, image_size_limit:500_000, ipfs_delay:90, web3_delay:400,

    token_directory:{}, object_messages:{}, job_responses:{}, contractor_applications:{}, my_applications:[], my_contract_applications:{}, hidden:[], direct_purchases:{}, direct_purchase_fulfilments:{}, my_contractor_applications:{}, award_data:{},
    
    alias_bucket: {}, alias_owners: {}, my_alias_events: {}, alias_timestamp: {},
    created_token_object_mapping:{}, E5_runs:{}, user_account_id:{}, addresses:{}, last_blocks:{}, number_of_blocks:{}, gas_price:{}, network_type:{}, number_of_peers:{}, chain_id:{}, account_balance:{'E15':0}, withdraw_balance:{'E15':0}, basic_transaction_data:{}, E5_balance:{}, contacts:{},

    contract_events:{}, proposal_events:{}, subscription_events:{}, exchange_events:{}, moderator_events:{},
    subscription_search_result:{}, all_data:{}, gateway_traffic_cache:{}, channel_events:{}, all_E5_runs:{}, 

    e5s:this.get_e5s(),
    selected_e5:'E25', default_e5:'E25',
    accounts:{}, has_wallet_been_set:false, is_running: {},

    device_country:this.get_country(), 
    
    job_section_tags:[], explore_section_tags:[], should_update_section_tags_onchain:false,
    searched_accounts_data:{}, searched_account_exchange_balances:{}, withdraw_event_data:{}, pending_withdraw_event_data:{}, object_directory:{},
    
    e5_ether_tx_history:{}, e5_ether_supply_data:{}, index_db_size:0, calculated_gas_figures:{}, rpc_times:{}, added_providers:[], mempool:{}, token_name_directory:{},
  };


  get_e5s(){
    var others = ['E185', 'E195', 'E205', 'E215', 'E225', 'E235', 'E245', 'E255', 'E265', 'E275', 'E285', 'E295', 'E305', 'E315', 'E325', 'E335', 'E345', 'E355', 'E365', 'E375', 'E385', 'E395', 'E405', 'E415', 'E425', 'E435', 'E445', 'E455', 'E465', 'E475', 'E485', 'E495', 'E505', 'E515', 'E525', 'E535', 'E545', 'E555', 'E565', 'E575', 'E585', 'E595', 'E605', 'E615', 'E625', 'E635', 'E645', 'E655', 'E665', 'E675', 'E685', 'E695', 'E705', 'E715', 'E725', 'E735', 'E745', 'E755', 'E765']
    return{
      'data':[/* 'E15', */ 'E25', 'E35', 'E45', 'E55', 'E65', 'E75', 'E85', 'E95', 'E105', 'E115', 'E125', 'E135','E145', 'E155', 'E165', 'E175',].concat(others),
      'E15':{
        web3:['http://127.0.0.1:8545/'], 
        token:'ETHT',
        e5_address:'0xA51c1fc2f0D1a1b8494Ed1FE312d7C3a78Ed91C0', 
        first_block:20, end_image:E35EndImg, spend_image:E35SpendImg, ether_image:EthereumTestnet, iteration:40_000, url:0, active:false, e5_img:End25Img
      },
      'E25':{
        web3:['https://etc.etcdesktop.com'], 
        token:'ETC',
        e5_address:'0x57d2189085D4F4e0156F70B71F0c90897836967E', 
        first_block:18730085, end_image:E25EndImg, spend_image:E25SpendImg, ether_image:EthereumTestnet, iteration:40_000, url:0, active:true, e5_img:End25Img
      },
      'E35':{
        web3:['https://etc.etcdesktop.com'],
        token:'ETC',
        e5_address:'0x24d7436eC90392f20AfeD800523E0d995Ec4310d', 
        first_block:18716990, end_image:E35EndImg, spend_image:E35SpendImg, ether_image:EthereumTestnet, iteration:40_000, url:0, active:false, e5_img:End25Img
      },
      'E45':{
        web3:['https://api.harmony.one'],
        token:'ONE',
        e5_address:'0xC621A0305D1826AB1E24C7d78792035cD9204eD4', 
        first_block:50166065, end_image:E45EndImg, spend_image:E45SpendImg, ether_image:Harmony, iteration:1_024/* this limit is horrible! bad blockchain. */, url:0, active:false, e5_img:End25Img
      },
      'E55':{
        web3:['https://1rpc.io/celo', 'https://forno.celo.org'],
        token:'CELO',
        e5_address:'0xdfaE4E1a8447E560a0064fdB89D1919bF7cC0902', 
        first_block:22528756, end_image:E55EndImg, spend_image:E55SpendImg, ether_image:Celo, iteration:40_000, url:0, active:false, e5_img:End25Img
      },
      'E65':{
        web3:['https://rpc.ftso.au/flare'],
        token:'FLR',
        e5_address:'0x6433Ec901f5397106Ace7018fBFf15cf7434F6b6', 
        first_block:15492557, end_image:E65EndImg, spend_image:E65SpendImg, ether_image:Flare, iteration:40_000, url:0, active:false, e5_img:End25Img
      },
      'E75':{
        web3:['https://rpc.gnosischain.com'],
        token:'XDAI',
        e5_address:'0x6433Ec901f5397106Ace7018fBFf15cf7434F6b6', 
        first_block:31015240, end_image:E75EndImg, spend_image:E75SpendImg, ether_image:xDai, iteration:40_000, url:0, active:false, e5_img:End25Img
      },
      'E85':{
        web3:['https://rpc.fuse.io'],
        token:'FUSE',
        e5_address:'0x6433Ec901f5397106Ace7018fBFf15cf7434F6b6', 
        first_block:26508302, end_image:E85EndImg, spend_image:E85SpendImg, ether_image:fuse, iteration:40_000, url:0, active:false, e5_img:End25Img
      },
      'E95':{
        web3:['https://rpc.api.moonbeam.network'],
        token:'GLMR',
        e5_address:'0x6433Ec901f5397106Ace7018fBFf15cf7434F6b6', 
        first_block:4910897, end_image:E95EndImg, spend_image:E95SpendImg, ether_image:glmr, iteration:40_000, url:0, active:false, e5_img:End25Img
      },
      'E105':{
        web3:['https://rpc.api.moonriver.moonbeam.network', 'https://moonriver.unitedbloc.com:2000'],
        token:'MOVR',
        e5_address:'0x6433Ec901f5397106Ace7018fBFf15cf7434F6b6',
        first_block:5587390, end_image:E105EndImg, spend_image:E105SpendImg, ether_image:movr, iteration:40_000, url:0, active:false, e5_img:End25Img
      },
      'E115':{
        web3:['https://xdc.public-rpc.com'],
        token:'XDC',
        e5_address:'0xAf7e201B3424D0Cc43392C8Eae71FBdc983932Fb',
        first_block:68418980, end_image:E115EndImg, spend_image:E115SpendImg, ether_image:xdc, iteration:40_000, url:0, active:false, e5_img:End25Img
      },
      'E125':{
        web3:['https://polygon.llamarpc.com'],
        token:'MATIC',
        e5_address:'0x3D610010C43fC1Af89D8d040ED530398817A8E94',
        first_block:50258928, end_image:E125EndImg, spend_image:E125SpendImg, ether_image:matic, iteration:40_000, url:0, active:false, e5_img:End25Img
      },
      'E135':{
        web3:['https://binance.llamarpc.com'],
        token:'BNB',
        e5_address:'0x6433Ec901f5397106Ace7018fBFf15cf7434F6b6',
        first_block:33723227, end_image:E135EndImg, spend_image:E135SpendImg, ether_image:bnb, iteration:40_000, url:0, active:false, e5_img:End25Img
      },
      'E145':{
        web3:['https://nodeapi.energi.network'],
        token:'NRG',
        e5_address:'0x6433Ec901f5397106Ace7018fBFf15cf7434F6b6',
        first_block:1955370, end_image:E145EndImg, spend_image:E145SpendImg, ether_image:nrg, iteration:10_000, url:1	, active:false, e5_img:End25Img
      },
      'E155':{
        web3:['https://mainnet-rpc.thundercore.io'],
        token:'TT',
        e5_address:'0x6433Ec901f5397106Ace7018fBFf15cf7434F6b6',
        first_block:148816985, end_image:E155EndImg, spend_image:E155SpendImg, ether_image:tt, iteration:40_000, url:0	, active:false, e5_img:End25Img
      },
      'E165':{
        web3:['https://rpc.tomochain.com'],
        token:'VIC',
        e5_address:'0xd3B4c06c7514a72284fCe95DCAD911c8EaD9Be3F',
        first_block:73021490, end_image:E165EndImg, spend_image:E165SpendImg, ether_image:viction, iteration:40_000, url:0, active:false, e5_img:End25Img
      },
      'E175':{
        web3:['https://evmos-jsonrpc.theamsolutions.info'],
        token:'EVMOS',
        e5_address:'0x6433Ec901f5397106Ace7018fBFf15cf7434F6b6',
        first_block:17475951, end_image:E175EndImg, spend_image:E175SpendImg, ether_image:evmos, iteration:40_000, url:0, active:false, e5_img:End25Img
      },









      'E5':{
        web3:[''],
        token:'',
        e5_address:'',
        first_block:0, end_image:E135EndImg, spend_image:E135SpendImg, ether_image:bnb, iteration:3_000, url:0, active:false, e5_img:End25Img
      },

      'E185':{
        web3:['https://rpc.ankr.com/eth'],
        token:'ETH',
        e5_address:'',
        first_block:0, end_image:E135EndImg, spend_image:E135SpendImg, ether_image:eth, iteration:3_000, url:0, active:false, e5_img:End25Img
      },
      'E195':{
        web3:['https://optimism.llamarpc.com'],
        token:'OETH',
        e5_address:'',
        first_block:0, end_image:E135EndImg, spend_image:E135SpendImg, ether_image:optimism, iteration:3_000, url:0, active:false, e5_img:End25Img
      },
      'E205':{
        web3:['https://base.llamarpc.com'],
        token:'BETH',
        e5_address:'',
        first_block:0, end_image:E135EndImg, spend_image:E135SpendImg, ether_image:base, iteration:3_000, url:0, active:false, e5_img:End25Img
      },
      'E215':{
        web3:['https://arbitrum.llamarpc.com'],
        token:'AETH',
        e5_address:'',
        first_block:0, end_image:E135EndImg, spend_image:E135SpendImg, ether_image:arbitrum, iteration:3_000, url:0, active:false, e5_img:End25Img
      },
      'E225':{
        web3:['https://astar-rpc.dwellir.com'],
        token:'ASTR',
        e5_address:'',
        first_block:0, end_image:E135EndImg, spend_image:E135SpendImg, ether_image:astar, iteration:3_000, url:0, active:false, e5_img:End25Img
      },
      'E235':{
        web3:['https://cronos-evm.publicnode.com'],
        token:'CRO',
        e5_address:'',
        first_block:0, end_image:E135EndImg, spend_image:E135SpendImg, ether_image:cronos, iteration:3_000, url:0, active:false, e5_img:End25Img
      },
      'E245':{
        web3:['https://evm.kava.io'],
        token:'KAVA',
        e5_address:'',
        first_block:0, end_image:E135EndImg, spend_image:E135SpendImg, ether_image:kava, iteration:3_000, url:0, active:false, e5_img:End25Img
      },
      'E255':{
        web3:['https://neon-proxy-mainnet.solana.p2p.org'],
        token:'NEON',
        e5_address:'',
        first_block:0, end_image:E135EndImg, spend_image:E135SpendImg, ether_image:neon, iteration:3_000, url:0, active:false, e5_img:End25Img
      },
      'E265':{
        web3:['https://rpc-mainnet-cardano-evm.c1.milkomeda.com'],
        token:'mADA',
        e5_address:'',
        first_block:0, end_image:E135EndImg, spend_image:E135SpendImg, ether_image:mAda, iteration:3_000, url:0, active:false, e5_img:End25Img
      },
      'E275':{
        web3:['https://fantom-mainnet.public.blastapi.io'],
        token:'FTM',
        e5_address:'',
        first_block:0, end_image:E135EndImg, spend_image:E135SpendImg, ether_image:fantom, iteration:3_000, url:0, active:false, e5_img:End25Img
      },
      'E285':{
        web3:['https://flux-rpc2.brisescan.com'],
        token:'BRISE',
        e5_address:'',
        first_block:0, end_image:E135EndImg, spend_image:E135SpendImg, ether_image:brise, iteration:3_000, url:0, active:false, e5_img:End25Img
      },
      'E295':{
        web3:['https://syscoin.public-rpc.com'],
        token:'SYS',
        e5_address:'',
        first_block:0, end_image:E135EndImg, spend_image:E135SpendImg, ether_image:syscoin, iteration:3_000, url:0, active:false, e5_img:End25Img
      },
      'E305':{
        web3:['https://avalanche.drpc.org'],
        token:'AVAX',
        e5_address:'',
        first_block:0, end_image:E135EndImg, spend_image:E135SpendImg, ether_image:avalanche, iteration:3_000, url:0, active:false, e5_img:End25Img
      },
      'E315':{
        web3:['https://rpc-mainnet.findora.org'],
        token:'FRA',
        e5_address:'',
        first_block:0, end_image:E135EndImg, spend_image:E135SpendImg, ether_image:findora, iteration:3_000, url:0, active:false, e5_img:End25Img
      },
      'E325':{
        web3:['https://bellecour.iex.ec'],
        token:'xRLC',
        e5_address:'',
        first_block:0, end_image:E135EndImg, spend_image:E135SpendImg, ether_image:iexec, iteration:3_000, url:0, active:false, e5_img:End25Img
      },
      'E335':{
        web3:['https://emerald.oasis.dev'],
        token:'ROSE',
        e5_address:'',
        first_block:0, end_image:E135EndImg, spend_image:E135SpendImg, ether_image:oasis, iteration:3_000, url:0, active:false, e5_img:End25Img
      },
      'E345':{
        web3:['https://node1.ozonechain.io'],
        token:'OZO',
        e5_address:'',
        first_block:0, end_image:E135EndImg, spend_image:E135SpendImg, ether_image:ozone, iteration:3_000, url:0, active:false, e5_img:End25Img
      },
      'E355':{
        web3:['https://http-mainnet.chain.pixie.xyz'],
        token:'PIX',
        e5_address:'',
        first_block:0, end_image:E135EndImg, spend_image:E135SpendImg, ether_image:pixie, iteration:3_000, url:0, active:false, e5_img:End25Img
      },
      'E365':{
        web3:['https://rpc.rei.network'],
        token:'REI',
        e5_address:'',
        first_block:0, end_image:E135EndImg, spend_image:E135SpendImg, ether_image:rei, iteration:3_000, url:0, active:false, e5_img:End25Img
      },
      'E375':{
        web3:['https://public-en-cypress.klaytn.net'],
        token:'KLAY',
        e5_address:'',
        first_block:0, end_image:E135EndImg, spend_image:E135SpendImg, ether_image:klaytn, iteration:3_000, url:0, active:false, e5_img:End25Img
      },
      'E385':{
        web3:['https://rpc.mantle.xyz'],
        token:'MNT',
        e5_address:'',
        first_block:0, end_image:E135EndImg, spend_image:E135SpendImg, ether_image:mantle, iteration:3_000, url:0, active:false, e5_img:End25Img
      },
      'E395':{
        web3:['https://rpc.pulsechain.com'],
        token:'PLS',
        e5_address:'',
        first_block:0, end_image:E135EndImg, spend_image:E135SpendImg, ether_image:pulse, iteration:3_000, url:0, active:false, e5_img:End25Img
      },
      'E405':{
        web3:['https://jsonrpc.canto.nodestake.top'],
        token:'CANTO',
        e5_address:'',
        first_block:0, end_image:E135EndImg, spend_image:E135SpendImg, ether_image:canto, iteration:3_000, url:0, active:false, e5_img:End25Img
      },
      'E415':{
        web3:['https://api.evm.eosnetwork.com'],
        token:'EOS',
        e5_address:'',
        first_block:0, end_image:E135EndImg, spend_image:E135SpendImg, ether_image:eos, iteration:3_000, url:0, active:false, e5_img:End25Img
      },
      'E425':{
        web3:['https://babel-api.mainnet.iotex.io'],
        token:'IOTX',
        e5_address:'',
        first_block:0, end_image:E135EndImg, spend_image:E135SpendImg, ether_image:iotex, iteration:3_000, url:0, active:false, e5_img:End25Img
      },
      'E435':{
        web3:['https://sgb.ftso.com.au/ext/bc/C/rpc'],
        token:'SGB',
        e5_address:'',
        first_block:0, end_image:E135EndImg, spend_image:E135SpendImg, ether_image:songbird, iteration:3_000, url:0, active:false, e5_img:End25Img
      },
      'E445':{
        web3:['https://ultron-rpc.net'],
        token:'ULX',
        e5_address:'',
        first_block:0, end_image:E135EndImg, spend_image:E135SpendImg, ether_image:ultron, iteration:3_000, url:0, active:false, e5_img:End25Img
      },
      'E455':{
        web3:['https://rpc.coinex.net'],
        token:'CET',
        e5_address:'',
        first_block:0, end_image:E135EndImg, spend_image:E135SpendImg, ether_image:coinex, iteration:3_000, url:0, active:false, e5_img:End25Img
      },
      'E465':{
        web3:['https://eth-rpc-api.thetatoken.org/rpc'],
        token:'TFUEL',
        e5_address:'',
        first_block:0, end_image:E135EndImg, spend_image:E135SpendImg, ether_image:tfuel, iteration:3_000, url:0, active:false, e5_img:End25Img
      },
      'E475':{
        web3:['https://rpc.step.network'],
        token:'FITFI',
        e5_address:'',
        first_block:0, end_image:E135EndImg, spend_image:E135SpendImg, ether_image:step, iteration:3_000, url:0, active:false, e5_img:End25Img
      },
      'E485':{
        web3:['https://rpc.energyweb.org'],
        token:'EWT',
        e5_address:'',
        first_block:0, end_image:E135EndImg, spend_image:E135SpendImg, ether_image:energyweb, iteration:3_000, url:0, active:false, e5_img:End25Img
      },
      'E495':{
        web3:['https://rpc.callisto.network'],
        token:'CLO',
        e5_address:'',
        first_block:0, end_image:E135EndImg, spend_image:E135SpendImg, ether_image:callisto, iteration:3_000, url:0, active:false, e5_img:End25Img
      },
      'E505':{
        web3:['https://shiden-rpc.dwellir.com'],
        token:'SDN',
        e5_address:'',
        first_block:0, end_image:E135EndImg, spend_image:E135SpendImg, ether_image:shiden, iteration:3_000, url:0, active:false, e5_img:End25Img
      },
      'E515':{
        web3:['https://tenet-evm.publicnode.com'],
        token:'TENET',
        e5_address:'',
        first_block:0, end_image:E135EndImg, spend_image:E135SpendImg, ether_image:tenet, iteration:3_000, url:0, active:false, e5_img:End25Img
      },
      'E525':{
        web3:['https://pyrus2.ubiqscan.io'],
        token:'UBQ',
        e5_address:'',
        first_block:0, end_image:E135EndImg, spend_image:E135SpendImg, ether_image:ubiq, iteration:3_000, url:0, active:false, e5_img:End25Img
      },
      'E535':{
        web3:['https://rpc.gochain.io'],
        token:'GO',
        e5_address:'',
        first_block:0, end_image:E135EndImg, spend_image:E135SpendImg, ether_image:gochain, iteration:3_000, url:0, active:false, e5_img:End25Img
      },
      'E545':{
        web3:['https://mainapi.omaxray.com'],
        token:'OMAX',
        e5_address:'',
        first_block:0, end_image:E135EndImg, spend_image:E135SpendImg, ether_image:omax, iteration:3_000, url:0, active:false, e5_img:End25Img
      },
      'E555':{
        web3:['https://api.wemix.com'],
        token:'WEMIX',
        e5_address:'',
        first_block:0, end_image:E135EndImg, spend_image:E135SpendImg, ether_image:wemix, iteration:3_000, url:0, active:false, e5_img:End25Img
      },
      'E565':{
        web3:['https://evm.confluxrpc.com'],
        token:'CFX',
        e5_address:'',
        first_block:0, end_image:E135EndImg, spend_image:E135SpendImg, ether_image:confulx, iteration:3_000, url:0, active:false, e5_img:End25Img
      },
      'E575':{
        web3:['https://rpc1.eu.telos.net/evm'],
        token:'TLOS',
        e5_address:'',
        first_block:0, end_image:E135EndImg, spend_image:E135SpendImg, ether_image:telos, iteration:3_000, url:0, active:false, e5_img:End25Img
      },
      'E585':{
        web3:['https://mycrypto.rsk.co'],
        token:'RSK',
        e5_address:'',
        first_block:0, end_image:E135EndImg, spend_image:E135SpendImg, ether_image:rsk, iteration:3_000, url:0, active:false, e5_img:End25Img
      },
      'E595':{
        web3:['https://api.metadium.com/prod'],
        token:'META',
        e5_address:'',
        first_block:0, end_image:E135EndImg, spend_image:E135SpendImg, ether_image:metadium, iteration:3_000, url:0, active:false, e5_img:End25Img
      },
      'E605':{
        web3:['https://rpc.kardiachain.io'],
        token:'KAI',
        e5_address:'',
        first_block:0, end_image:E135EndImg, spend_image:E135SpendImg, ether_image:kardiachain, iteration:3_000, url:0, active:false, e5_img:End25Img
      },
      'E615':{
        web3:['https://mainnet.block.caduceus.foundation'],
        token:'CMP',
        e5_address:'',
        first_block:0, end_image:E135EndImg, spend_image:E135SpendImg, ether_image:cmp, iteration:3_000, url:0, active:false, e5_img:End25Img
      },
      'E625':{
        web3:['https://rpc.seelen.pro'],
        token:'SEELE',
        e5_address:'',
        first_block:0, end_image:E135EndImg, spend_image:E135SpendImg, ether_image:seele, iteration:3_000, url:0, active:false, e5_img:End25Img
      },
      'E635':{
        web3:['https://rpc.bittorrentchain.io'],
        token:'BTT',
        e5_address:'',
        first_block:0, end_image:E135EndImg, spend_image:E135SpendImg, ether_image:btt, iteration:3_000, url:0, active:false, e5_img:End25Img
      },
      'E645':{
        web3:['https://rpc.acuteangle.com'],
        token:'AAC',
        e5_address:'',
        first_block:0, end_image:E135EndImg, spend_image:E135SpendImg, ether_image:doublea, iteration:3_000, url:0, active:false, e5_img:End25Img
      },
      'E655':{
        web3:['https://rpc.evm.karura.network'],
        token:'KAR',
        e5_address:'',
        first_block:0, end_image:E135EndImg, spend_image:E135SpendImg, ether_image:karura, iteration:3_000, url:0, active:false, e5_img:End25Img
      },
      'E665':{
        web3:['https://eth-rpc-acala.aca-staging.network'],
        token:'ACA',
        e5_address:'',
        first_block:0, end_image:E135EndImg, spend_image:E135SpendImg, ether_image:acala, iteration:3_000, url:0, active:false, e5_img:End25Img
      },
      'E675':{
        web3:['https://mainnet3.edgewa.re/evm'],
        token:'EDG',
        e5_address:'',
        first_block:0, end_image:E135EndImg, spend_image:E135SpendImg, ether_image:edgeware, iteration:3_000, url:0, active:false, e5_img:End25Img
      },
      'E685':{
        web3:['https://core.bloxberg.org'],
        token:'BERG',
        e5_address:'',
        first_block:0, end_image:E135EndImg, spend_image:E135SpendImg, ether_image:bloxberg, iteration:3_000, url:0, active:false, e5_img:End25Img
      },
      'E695':{
        web3:['https://rpc.phoenixplorer.com'],
        token:'PHOENIX',
        e5_address:'',
        first_block:0, end_image:E135EndImg, spend_image:E135SpendImg, ether_image:phoenix, iteration:3_000, url:0, active:false, e5_img:End25Img
      },
      'E705':{
        web3:['https://seed.omlira.com'],
        token:'OMC',
        e5_address:'',
        first_block:0, end_image:E135EndImg, spend_image:E135SpendImg, ether_image:omchain, iteration:3_000, url:0, active:false, e5_img:End25Img
      },
      'E715':{
        web3:['https://rpc-cnx.omplatform.com'],
        token:'OM',
        e5_address:'',
        first_block:0, end_image:E135EndImg, spend_image:E135SpendImg, ether_image:om, iteration:3_000, url:0, active:false, e5_img:End25Img
      },
      'E725':{
        web3:['https://node1.mintme.com'],
        token:'MINTME',
        e5_address:'',
        first_block:0, end_image:E135EndImg, spend_image:E135SpendImg, ether_image:mintme, iteration:3_000, url:0, active:false, e5_img:End25Img
      },
      'E735':{
        web3:['https://rpc.ecredits.com'],
        token:'ECS',
        e5_address:'',
        first_block:0, end_image:E135EndImg, spend_image:E135SpendImg, ether_image:ecredits, iteration:3_000, url:0, active:false, e5_img:End25Img
      },
      'E745':{
        web3:['https://host-154-14-192-66.contentfabric.io/eth'],
        token:'ELV',
        e5_address:'',
        first_block:0, end_image:E135EndImg, spend_image:E135SpendImg, ether_image:eluv, iteration:3_000, url:0, active:false, e5_img:End25Img
      },
      'E755':{
        web3:['https://rpc.ethoprotocol.com'],
        token:'ETHO',
        e5_address:'',
        first_block:0, end_image:E135EndImg, spend_image:E135SpendImg, ether_image:etho, iteration:3_000, url:0, active:false, e5_img:End25Img
      },
      'E765':{
        web3:['https://mainnet-rpc.oneledger.network'],
        token:'OLT',
        e5_address:'',
        first_block:0, end_image:E135EndImg, spend_image:E135SpendImg, ether_image:oneledger, iteration:3_000, url:0, active:false, e5_img:End25Img
      },
    }
  }


  constructor(props) {
    super(props);
    this.homepage = React.createRef();
    this.send_receive_ether_page = React.createRef();
    this.wiki_page = React.createRef();
    this.new_contract_page = React.createRef();
    this.new_token_page = React.createRef();
    this.new_subscription_page = React.createRef();
    this.new_post_page = React.createRef();
    this.new_channel_page = React.createRef();
    this.new_job_page = React.createRef();
    this.new_storefront_page = React.createRef();
    this.new_storefront_item_page = React.createRef();
    this.new_mint_dump_token_page = React.createRef();
    this.new_transfer_token_page = React.createRef();
    this.enter_contract_page = React.createRef();
    this.extend_contract_page = React.createRef();
    this.exit_contract_page = React.createRef();
    this.new_proposal_page = React.createRef();
    this.vote_proposal_page = React.createRef();
    this.submit_proposal_page = React.createRef();
    this.pay_subscription_page = React.createRef();
    this.cancel_subscription_page = React.createRef();
    this.collect_subscription_page = React.createRef();
    this.modify_subscription_page = React.createRef();
    this.modify_contract_page = React.createRef();
    this.modify_token_page = React.createRef();
    this.exchange_transfer_page = React.createRef();
    this.force_exit_page = React.createRef();
    this.archive_proposal_page = React.createRef();
    this.freeze_unfreeze_page = React.createRef();
    this.authmint_page = React.createRef();
    this.moderator_page = React.createRef();
    this.new_mail_page = React.createRef();
    this.respond_to_job_page = React.createRef();
    this.view_application_contract_page = React.createRef();
    this.view_transaction_page = React.createRef();
    this.view_transaction_log_page = React.createRef();
    this.add_to_bag_page = React.createRef();
    this.fulfil_bag_page = React.createRef();
    this.view_bag_application_contract_page = React.createRef();
    this.direct_purchase_page = React.createRef();
    this.clear_purchase_page = React.createRef();
    this.scan_code_page = React.createRef();
    this.new_contractor_page = React.createRef()
    this.send_job_request_page = React.createRef();
    this.view_job_request_page = React.createRef();
    this.view_job_request_contract_page = React.createRef();
    this.withdraw_ether_page = React.createRef();

    this.edit_job_page = React.createRef();
    this.edit_token_page = React.createRef();
    this.edit_post_page = React.createRef();
    this.edit_channel_page = React.createRef();
    this.edit_storefront_page = React.createRef()
    this.edit_contractor_page = React.createRef();

    this.give_award_page = React.createRef();
    this.add_comment_page = React.createRef();
    this.stack_page = React.createRef();
    this.depthmint_page = React.createRef();
    this.searched_account_page = React.createRef();
    this.rpc_settings_page = React.createRef();
    this.confirm_run_page = React.createRef();
  }

  componentDidMount() {
    console.log("mounted");
    
    this.load_cookies();
    this.load_e5_data();
     
    /* listens for when the window is resized */
    window.addEventListener("resize", this.resize.bind(this));
    this.resize();

    var obj = {'sluggish':1000_000, 'slow':500_000, 'average':100_000, 'fast':20_000}
    this.interval = setInterval(() => this.background_sync(), obj[this.state.refresh_speed]);

    this.get_key()
    this.init_db()
  }

  /* called when the component is unmounted or closed */
  componentWillUnmount() {
    console.log("unmounted");
    window.removeEventListener("resize", this.resize.bind(this));

    clearInterval(this.interval);

    this.set_cookies()
  }

  reset_background_sync(){
    clearInterval(this.interval);
    var obj = {'sluggish':1000_000, 'slow':500_000, 'average':100_000, 'fast':20_000}
    this.interval = setInterval(() => this.background_sync(), obj[this.state.refresh_speed]);
  }


  lengthInUtf8Bytes(str) {
    // Matches only the 10.. bytes that are non-initial characters in a multi-byte sequence.
    var m = encodeURIComponent(str).match(/%[89ABab]/g);
    return str.length + (m ? m.length : 0);
  }

  set_cookies(){
    // localStorage.setItem("state", JSON.stringify(this.get_persistent_data(), (key, value) =>
    //         typeof value === 'bigint'
    //             ? value.toString()
    //             : value // return everything else unchanged));
    // ))

    var x = JSON.stringify(this.get_persistent_data(), (key, value) =>
            typeof value === 'bigint'
                ? value.toString()
                : value // return everything else unchanged));
    )

    if(this.state.storage_permissions =='enabled'){
      this.update_data_in_db(x)
      this.setState({index_db_size: this.lengthInUtf8Bytes(x)})
    }else{
      this.update_data_in_db('')
      this.setState({index_db_size: this.lengthInUtf8Bytes('')})
      
      if(this.homepage.current){
        this.homepage.current?.set_cookies()
      }
    }
  }

  get_persistent_data(){
    return {
      theme: this.state.theme, 
      storage_option: this.state.storage_option, 
      stack_items:this.state.stack_items, 
      selected_e5_item:this.state.selected_e5, 
      contacts:this.state.contacts, 
      should_update_contacts_onchain: this.state.should_update_contacts_onchain, 
      refresh_speed:this.state.refresh_speed, 
      masked_content: this.state.masked_content,
      blocked_accounts: this.state.blocked_accounts,
      should_update_blocked_accounts_onchain: this.state.should_update_blocked_accounts_onchain,
      content_channeling:this.state.content_channeling,
      device_language: this.state.device_language,
      job_section_tags: this.state.job_section_tags,
      explore_section_tags: this.state.explore_section_tags,
      should_update_section_tags_onchain: this.state.should_update_section_tags_onchain,
      section_tags_setting: this.state.section_tags_setting,
      visible_tabs: this.state.visible_tabs,
      storage_permissions: this.state.storage_permissions,

      from:this.from,
      e5_events:this.e5_events,
      e52_events:this.e52_events,
      f5_events:this.f5_events,
      g5_events:this.g5_events,
      g52_events:this.g52_events,
      h5_events:this.h5_events,
      h52_events:this.h52_events,

      added_providers: this.state.added_providers,
      selected_providers: this.get_selected_urls(),
      stack_optimizer: this.state.stack_optimizer
    }
  }

  get_selected_urls(){
    var array = this.state.e5s['data']
    var selected_array = []
    array.forEach(e5 => {
      selected_array.push([e5, this.state.e5s[e5].url])
    });
    return selected_array
  }

  load_cookies = async () =>{
    // var cupcake_state = localStorage.getItem("state");
    var cupcake_state = await this.load_data_from_indexdb()
    if(cupcake_state != null){
      this.setState({index_db_size: this.lengthInUtf8Bytes(cupcake_state)})
      cupcake_state = this.fetch_data(cupcake_state)
    }
    if(cupcake_state != null){
      var cupcake_theme = cupcake_state.theme;
      var cupcake_stack_items = cupcake_state.stack_items
      var cupcake_storage_option = cupcake_state.storage_option
      var cupcake_selected_e5 = cupcake_state.selected_e5_item
      var cupcake_contacts = cupcake_state.contacts
      var cupcake_should_update_contacts_onchain = cupcake_state.should_update_contacts_onchain
      var cupcake_refresh_speed = cupcake_state.refresh_speed
      var cupcake_masked_content = cupcake_state.masked_content
      var cupcake_blocked_accounts = cupcake_state.blocked_accounts
      var cupcake_should_update_blocked_accounts_onchain = cupcake_state.should_update_blocked_accounts_onchain
      var cupcake_content_channeling = cupcake_state.content_channeling
      var cupcake_device_language = cupcake_state.device_language
      var cupcake_job_section_tags = cupcake_state.job_section_tags
      var cupcake_explore_section_tags = cupcake_state.explore_section_tags
      var cupcake_should_update_section_tags_onchain = cupcake_state.should_update_section_tags_onchain
      var cupcake_section_tags_setting = cupcake_state.section_tags_setting
      var cupcake_visible_tabs = cupcake_state.visible_tabs
      var cupcake_storage_permissions = cupcake_state.storage_permissions
      var cupcake_added_providers = cupcake_state.added_providers
      var cupcake_selected_providers = cupcake_state.selected_providers
      
      var cupcake_from = cupcake_state.from
      var cupcake_e5_events = cupcake_state.e5_events
      var cupcake_e52_events = cupcake_state.e52_events
      var cupcake_f5_events = cupcake_state.f5_events
      var cupcake_g5_events = cupcake_state.g5_events
      var cupcake_g52_events = cupcake_state.g52_events
      var cupcake_h5_events = cupcake_state.h5_events
      var cupcake_h52_events = cupcake_state.h52_events

      var cupcake_stack_optimizer = cupcake_state.stack_optimizer
      
      if(cupcake_theme != null){
        this.setState({theme:cupcake_theme})
      }

      if(cupcake_stack_items != null){
        this.setState({stack_items:cupcake_stack_items})
      }

      if(cupcake_storage_option != null){
        this.setState({storage_option:cupcake_storage_option})
      }

      if(cupcake_selected_e5 != null){
        this.setState({selected_e5: cupcake_selected_e5})
      }

      if(cupcake_contacts != null){
        this.setState({contacts: cupcake_contacts})
      }

      if(cupcake_should_update_contacts_onchain != null){
        this.setState({should_update_contacts_onchain: cupcake_should_update_contacts_onchain})
      }

      if(cupcake_masked_content != null){
        this.setState({masked_content: cupcake_masked_content})
      }

      if(cupcake_refresh_speed != null){
        this.setState({refresh_speed: cupcake_refresh_speed})
      }

      if(cupcake_blocked_accounts != null){
        this.setState({blocked_accounts: cupcake_blocked_accounts})
      }

      if(cupcake_should_update_blocked_accounts_onchain != null){
        this.setState({should_update_blocked_accounts_onchain: cupcake_should_update_blocked_accounts_onchain})
      }

      if(cupcake_content_channeling != null){
        this.setState({content_channeling: cupcake_content_channeling})
      }

      if(cupcake_device_language != null){
        this.setState({device_language: cupcake_device_language})
      }

      if(cupcake_job_section_tags != null){
        this.setState({job_section_tags: cupcake_job_section_tags})
      }

      if(cupcake_explore_section_tags != null){
        this.setState({explore_section_tags: cupcake_explore_section_tags})
      }

      if(cupcake_should_update_section_tags_onchain != null){
        this.setState({should_update_section_tags_onchain: cupcake_should_update_section_tags_onchain})
      }

      if(cupcake_section_tags_setting != null){
        this.setState({section_tags_setting: cupcake_section_tags_setting})
      }

      if(cupcake_visible_tabs != null){
        this.setState({visible_tabs: cupcake_visible_tabs})
      }

      if(cupcake_storage_permissions != null){
        this.setState({storage_permissions: cupcake_storage_permissions})
      }

      if(cupcake_selected_providers != null && cupcake_added_providers != null){
        this.setState({added_providers: cupcake_added_providers})
        var me = this;
        setTimeout(function() {
          me.set_providers(cupcake_selected_providers, cupcake_added_providers)
        }, (1 * 800));
      }

      if(cupcake_from != null){
        this.from = cupcake_from
      }

      if(cupcake_e5_events != null){
        this.e5_events = cupcake_e5_events
      }

      if(cupcake_e52_events != null){
        this.e52_events = cupcake_e52_events
      }

      if(cupcake_f5_events != null){
        this.f5_events = cupcake_f5_events
      }

      if(cupcake_g5_events != null){
        this.g5_events = cupcake_g5_events
      }

      if(cupcake_g52_events != null){
        this.g52_events = cupcake_g52_events
      }

      if(cupcake_h5_events != null){
        this.h5_events = cupcake_h5_events
      }

      if(cupcake_h52_events != null){
        this.h52_events = cupcake_h52_events
        console.log('---------------------------cupcake_from--------------------------')
        console.log(this.h52_events)
      }

      if(cupcake_stack_optimizer != null){
        this.setState({stack_optimizer: cupcake_stack_optimizer})
      }

    }

    var me = this;
    setTimeout(function() {
        me.stack_page.current?.set_light_dark_setting_tag()
        me.stack_page.current?.set_storage_option_tag()
        me.stack_page.current?.set_e5_option_tag()
        me.stack_page.current?.set_refresh_speed_tag()
        me.stack_page.current?.set_masked_content_tag()
        me.stack_page.current?.set_content_channeling_tags()
        me.stack_page.current?.set_content_language_tags()
        me.stack_page.current?.set_content_filter_settings_tags()
        me.stack_page.current?.set_tabs_tag()
        me.stack_page.current?.set_storage_permissions_tag()
        me.stack_page.current?.set_stack_optimizer_tag()
    }, (1 * 1000));
  }


  set_providers(cupcake_selected_providers, cached_providers){
    var clone = structuredClone(this.state.e5s)
    cupcake_selected_providers.forEach(provider => {
      clone[provider[0]].url = provider[1]
    })
    cached_providers.forEach(provider => {
      clone[provider[0]]['web3'].push(provider[1])
    });
    this.setState({e5s:clone})
  }

  fetch_data(cupcake_state){
    try{  
      var ce = JSON.parse(cupcake_state)
      return ce
    }catch(e){
      console.log(e)
      return null
    }
  }

  get_country(){
    const timeZoneCityToCountry = {};
    Object.keys(zones).forEach(z => {
      const cityArr = z.split("/");
      const city = cityArr[cityArr.length-1];
      timeZoneCityToCountry[city] = countries[zones[z].countries[0]].name;
    });

    var userRegion;
    var userCity;
    var userCountry;
    var userTimeZone;

    if (Intl) {
      userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      var tzArr = userTimeZone.split("/");
      userRegion = tzArr[0];
      userCity = tzArr[tzArr.length - 1];
      userCountry = timeZoneCityToCountry[userCity];
    }
    
    console.log("Time Zone:", userTimeZone);
    console.log("Region:", userRegion);
    console.log("City:", userCity);
    console.log("Country:", userCountry);

    return userCountry

  }

  get_language(){
    var lang = navigator.language || navigator.userLanguage;
    var language = lang.toString().toLowerCase()
    if(language.includes('-')){
      var ln = language.split('-')
      language = ln[0]
    }
    console.log(language)
    return language
  }


  get_key = async () => {
    // 0xD637CBbc18fa589bd9d3708ecA90bf71e2A8B243 <----dont use this address, REACT_APP_SEED_API_KEY is compromised!

    var seed = ''+process.env.REACT_APP_SEED_API_KEY
    var web3_url = this.get_web3_url_from_e5('E175')
    var account = this.get_account_from_seed(seed, web3_url)
    console.log(account)
    // console.log(toBech32(account.address))

    const web3 = new Web3(web3_url);
    var balance = await web3.eth.getBalance(account.address)
    console.log('-----------------get_key------------------------')
    console.log('deploy account balance: ',(balance/10**18))



    var recipientAddress = '0xa88FcDa55dFE3929E3f089FbEce6Ce2728f8bf3a'
    const me = this;
    web3.eth.accounts.wallet.add(account.privateKey);

    // web3.eth.sendTransaction({
    //   from: account.address,
    //   to: recipientAddress,
    //   value: (6.5 * 10**18),
    //   gas: 50000,
    //   gasPrice: 30_000_000_000 // Adjust gas price as needed
    // }).on('transactionHash', function (hash) {
    //   me.prompt_top_notification('send complete!', 600)
    // })
    // .on('error', function (error) {
    //   console.error('Failed to send transaction:', error);
    //   if(error == 'Error: Invalid JSON RPC response: {}'){
    //     me.prompt_top_notification('send complete!', 600)
    //   }else{
    //     me.prompt_top_notification('send failed, '+error, 6000)
    //   }
    // });


    const address = '14ZivGjRUMyUXWaakBYDzEfLTiiN5ZZ4Qo';
    var link = `https://blockchain.info/unspent?active=${address}`//get utxos
    link = `https://blockchain.info/rawaddr/${address}`//get transaction history

    link = `https://api.fullstack.cash/v5/electrumx/unconfirmed/${address}`

    try {
        const response = await fetch(link);
        if (!response.ok) {
          throw new Error(`Status: ${response}`);
        }
        const data = await response.text();
        var e5_address_obj = JSON.parse(data);
        console.log(e5_address_obj)
      } catch (error) {
        console.log('Error fetching data: ', error)
      }
  }

  init_db = async () => {
    
    // try {
    //   const db = new Dexie('E5LocalStorage');
    //   db.version(2).stores({
    //     data: 'id, data', // Primary key and indexed props
    //   });

    //   var name = 'bry'
    //   var id = 'id'
    //   // // Add the new friend!
    //   // var data = await db.data.toArray()
    //   // if(data.length != 0){
    //   //   await db.data.delete(1)
    //   // } 
    //   // await db.data.add({ name });

    //   // var data = await db.data.toArray()
    //   // var stored_name = data[0]

    //   try{
    //     await db.data.delete(id)
    //   }catch(e){
    //     console.log(`Failed : ${e}`);
    //   }

    //   await db.data.add({ id, name });
    //   var data = await db.data.get({id: 'id'})

    //   console.log('loaded data: ', data['name'])
    // } catch (error) {
    //   console.log(`Failed : ${error}`);
    // }

    // await this.update_data_in_db('footloose')
    // await this.wait(10000)
    // var data = await this.load_data_from_indexdb()
    // console.log('loaded data: ', data)
    
  }

  update_data_in_db = async (data) => {
    try {
      const db = new Dexie('twentythreeinreverse');
      db.version(2).stores({
        data: 'id, data', // Primary key and indexed props
      });

      var id = '123'
      try{
        await db.data.delete(id)
      }catch(e){
        console.log(`Failed : ${e}`);
      }
      await db.data.add({ id, data });
      
    } catch (error) {
      console.log(`Failed : ${error}`);
    }
  }

  load_data_from_indexdb = async () => {
    try{
      const db = new Dexie('twentythreeinreverse');
      db.version(2).stores({
        data: 'id, data', // Primary key and indexed props
      });
      var data = await db.data.get({id: '123'})
      return data['data']
    }catch(e){
      console.log(`Failed : ${e}`);
      return null
    }
  }









  background_sync(){
    if(this.state.accounts[this.state.selected_e5] != null){
      // this.get_accounts_data(this.state.account, false, this.state.web3, this.state.e5_address)
      this.start_get_accounts_data(false)
    }
  }


  get_selected_web3_url(){
    var random = this.random(0,this.state.e5s[this.state.selected_e5].web3.length-1)
    return this.state.e5s[this.state.selected_e5].web3[random]
  }

  get_selected_E5_contract(){
    return this.state.e5s[this.state.selected_e5].e5_address
  }

  get_contract_from_e5(e5){
    return this.state.e5s[e5].e5_address
  }

  get_web3_url_from_e5(e5){
    // var random = this.random(0,this.state.e5s[e5].web3.length-1)
    var random = this.state.e5s[e5].url
    return this.state.e5s[e5].web3[random]
  }

  get_web3_instance_from_e5(e5){
    return new Web3(this.get_web3_url_from_e5(e5));
  }

  get_first_block(e5){
    return this.state.e5s[e5].first_block
  }

  get_iteration(e5){
    return this.state.e5s[e5].iteration
  }

  random(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
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
          return 'e'; //m
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
        'name':'light',
        'bar_shadow':'#CECDCD','bar_color':'#444444', 'bar_background_color':'#919191','nav_bar_color':'#444444',
        
        'homepage_background_color':'#F1F1F1','syncronizing_page_background_color':'#F1F1F1','send_receive_ether_background_color':'#F1F1F1','send_receive_ether_overlay_background':'#474747','send_receive_ether_overlay_shadow':'#CECDCD',
        
        'primary_text_color':'#393e46','secondary_text_color':'grey',
        
        'navbar_button_selected_color':'#545454','primary_navbar_text_color':'white','secondary_navbar_text_color':'#e6e6e6','card_background_color':'rgb(225, 225, 225,.9)','card_shadow_color':'#DCDCDC',
        
        'view_group_card_item_background':'rgb(217, 217, 217,.6)','tag_background_color':'#787878','indexed_tag_background':'#5e5e5e','tag_shadow':'#868686',
        
        'chart_color':'#FCFCFC','chart_background_color':'#D5D5D5',
  
        'number_picker_label_color':'#3C3C3C','number_picker_label_shadow':'#868686',
        'number_picker_power_color':'white','number_picker_power_shadow_color':'#CECDCD','number_picker_label_text_color':'#878787',
        
        'slider_color':'white', 'toast_background_color':'white', 'calendar_color':'light', 'alert_icon':AlertIcon, 'add_icon':AddIcon, 'text_input_background':'rgb(217, 217, 217,.6)', 'text_input_color':'#393e46', 'messsage_reply_background':'white'
      }
    }
    else if(theme == 'dark'){
      return{
        'name':'dark',
        'bar_shadow':'#919191','bar_color':'white', 'bar_background_color':'#919191','nav_bar_color':'#444444',
        
        'homepage_background_color':'#292929','syncronizing_page_background_color':'#292929','send_receive_ether_background_color':'#292929','send_receive_ether_overlay_background':'#424242','send_receive_ether_overlay_shadow':'#424242',

        'primary_text_color':'white', 'secondary_text_color':'#e6e6e6',
        
        'navbar_button_selected_color':'#545454','card_background_color':'rgb(51, 51, 51,.9)', 'primary_navbar_text_color':'white','secondary_navbar_text_color':'#e6e6e6','card_shadow_color':'#424242',

        'view_group_card_item_background':'#2e2e2e','tag_background_color':'#444444', 'indexed_tag_background':'#404040', 'tag_shadow':'#424242',

        'chart_color':'#333333','chart_background_color':'#232323',

        'number_picker_label_color':'#3C3C3C','number_picker_label_shadow':'#262626',
        'number_picker_power_color':'white','number_picker_power_shadow_color':'#CECDCD','number_picker_label_text_color':'#878787', 
        
        'slider_color':'white','toast_background_color':'#333333', 'calendar_color':'dark', 'alert_icon':AlertIconDark, 'add_icon':AddIconDark, 'text_input_background':'rgb(217, 217, 217,.6)', 'text_input_color':'#393e46', 'messsage_reply_background':'black'
      }
    }
  }




  render(){
    if(this.getScreenSize() == 'e'){
      return(
        <div>
          {this.render_page()}
        </div>
      )
    }else{
      return (
        <div className="App">
          {this.render_page()}
          {this.render_synchronizing_bottomsheet()}
          {this.render_send_receive_ether_bottomsheet()}
          {this.render_stack_bottomsheet()}
          {this.render_view_transaction_bottomsheet()}
          {this.render_wiki_bottomsheet()}
          {this.render_new_object_bottomsheet()}
          {this.render_view_image_bottomsheet()}
          {this.render_mint_token_bottomsheet()}
          {this.render_transfer_token_bottomsheet()}
          {this.render_extend_contract_bottomsheet()}
          {this.render_exit_contract_bottomsheet()}
          {this.render_new_proposal_bottomsheet()}
          {this.render_vote_proposal_bottomsheet()}
          {this.render_submit_proposal_bottomsheet()}
          {this.render_pay_subscription_bottomsheet()}
          {this.render_cancel_subscription_bottomsheet()}
          {this.render_collect_subscription_bottomsheet()}
          {this.render_modify_subscription_bottomsheet()}
          {this.render_modify_contract_bottomsheet()}
          {this.render_modify_token_bottomsheet()}
          {this.render_exchange_transfer_bottomsheet()}
          {this.render_force_exit_bottomsheet()}
          {this.render_archive_proposal_bottomsheet()}
          {this.render_freeze_unfreeze_bottomsheet()}
          {this.render_authmint_bottomsheet()}
          {this.render_moderator_bottomsheet()}
          {this.render_respond_to_job_bottomsheet()}
          {this.render_view_application_contract_bottomsheet()}
          {this.render_view_transaction_log_bottomsheet()}
          {this.render_add_to_bag_bottomsheet()}
          {this.render_fulfil_bag_bottomsheet()}
          {this.render_view_bag_application_contract_bottomsheet()}
          {this.render_direct_purchase_bottomsheet()}
          {this.render_clear_purchase_bottomsheet()}
          {this.render_scan_code_bottomsheet()}
          {this.render_send_job_request_bottomsheet()}
          {this.render_view_job_request_bottomsheet()}
          {this.render_enter_contract_bottomsheet()}
          {this.render_view_job_request_contract_bottomsheet()}
          {this.render_withdraw_ether_bottomsheet()}

          {this.render_edit_token_object_bottomsheet()}
          {this.render_edit_channel_object_bottomsheet()}
          {this.render_edit_contractor_object_bottomsheet()}
          {this.render_edit_job_object_bottomsheet()}
          {this.render_edit_post_object_bottomsheet()}
          {this.render_edit_storefront_object_bottomsheet()}
          {this.render_give_award_bottomsheet()}
          {this.render_add_comment_bottomsheet()}
          {this.render_depthmint_bottomsheet()}
          {this.render_searched_account_bottomsheet()}
          {this.render_rpc_settings_bottomsheet()}
          {this.render_confirm_run_bottomsheet()}
          <ToastContainer limit={3} containerId="id"/>
        </div>
      );
    }
  }

  render_page(){
    return(
      <Home_page ref={this.homepage}
      screensize={this.getScreenSize()} 
      width={this.state.width} height={this.state.height} app_state={this.state} notify={this.prompt_top_notification.bind(this)} open_send_receive_ether_bottomsheet={this.start_send_receive_ether_bottomsheet.bind(this)} open_stack_bottomsheet={this.open_stack_bottomsheet.bind(this)} theme={this.state.theme} details_orientation={this.state.details_orientation} 
      open_wiki_bottomsheet={this.open_wiki_bottomsheet.bind(this)} 
      open_new_object={this.open_new_object.bind(this)} 
      when_view_image_clicked={this.when_view_image_clicked.bind(this)} when_edit_job_tapped={this.when_edit_created_job_tapped.bind(this)} fetch_objects_data={this.fetch_objects_data.bind(this)}
      
      show_mint_token_bottomsheet={this.show_mint_token_bottomsheet.bind(this)}
      show_transfer_bottomsheet={this.show_transfer_bottomsheet.bind(this)}
      show_enter_contract_bottomsheet={this.show_enter_contract_bottomsheet.bind(this)}
      show_extend_contract_bottomsheet={this.show_extend_contract_bottomsheet.bind(this)}
      show_exit_contract_bottomsheet={this.show_exit_contract_bottomsheet.bind(this)}
      show_new_proposal_bottomsheet={this.show_new_proposal_bottomsheet.bind(this)}
      show_vote_proposal_bottomsheet={this.show_vote_proposal_bottomsheet.bind(this)}
      show_submit_proposal_bottomsheet={this.show_submit_proposal_bottomsheet.bind(this)}
      show_pay_subscription_bottomsheet={this.show_pay_subscription_bottomsheet.bind(this)}
      show_cancel_subscription_bottomsheet={this.show_cancel_subscription_bottomsheet.bind(this)}
      show_collect_subscription_bottomsheet={this.show_collect_subscription_bottomsheet.bind(this)}
      show_modify_subscription_bottomsheet={this.show_modify_subscription_bottomsheet.bind(this)}
      show_modify_contract_bottomsheet={this.show_modify_contract_bottomsheet.bind(this)}
      show_modify_token_bottomsheet={this.show_modify_token_bottomsheet.bind(this)}
      show_exchange_transfer_bottomsheet={this.show_exchange_transfer_bottomsheet.bind(this)}
      show_force_exit_bottomsheet={this.show_force_exit_bottomsheet.bind(this)}
      show_archive_proposal_bottomsheet={this.show_archive_proposal_bottomsheet.bind(this)}
      show_freeze_unfreeze_bottomsheet={this.show_freeze_unfreeze_bottomsheet.bind(this)}
      show_authmint_bottomsheet={this.show_authmint_bottomsheet.bind(this)}
      show_moderator_bottomsheet={this.show_moderator_bottomsheet.bind(this)}
      show_images={this.show_images.bind(this)} show_respond_to_job_bottomsheet={this.show_respond_to_job_bottomsheet.bind(this)}

      add_mail_to_stack_object={this.add_mail_to_stack_object.bind(this)} add_channel_message_to_stack_object={this.add_channel_message_to_stack_object.bind(this)} get_objects_messages={this.get_objects_messages.bind(this)} add_post_reply_to_stack={this.add_post_reply_to_stack.bind(this)} get_job_objects_responses={this.get_job_objects_responses.bind(this)} show_view_application_contract_bottomsheet={this.show_view_application_contract_bottomsheet.bind(this)} add_job_message_to_stack_object={this.add_job_message_to_stack_object.bind(this)} add_proposal_message_to_stack_object={this.add_proposal_message_to_stack_object.bind(this)} open_add_to_bag={this.show_add_to_bag_bottomsheet.bind(this)} open_fulfil_bag_request={this.show_fulfil_bag_bottomsheet.bind(this)} show_view_bag_application_contract_bottomsheet={this.show_view_bag_application_contract_bottomsheet.bind(this)} show_direct_purchase_bottomsheet={this.show_direct_purchase_bottomsheet.bind(this)} open_send_job_request_ui={this.open_send_job_request_ui.bind(this)}

      get_direct_purchase_events={this.get_direct_purchase_events.bind(this)} open_clear_purchase={this.show_clear_purchase_bottomsheet.bind(this)} add_bag_message_to_stack_object={this.add_bag_message_to_stack_object.bind(this)} add_storefront_message_to_stack_object={this.add_storefront_message_to_stack_object.bind(this)} get_contractor_applications={this.get_contractor_applications.bind(this)} open_view_job_request_ui={this.open_view_job_request_ui.bind(this)} open_view_contract_ui={this.show_view_job_request_contract_bottomsheet.bind(this)} show_withdraw_ether_bottomsheet={this.show_withdraw_ether_bottomsheet.bind(this)}

      add_account_to_contacts={this.add_account_to_contacts.bind(this)} open_edit_object={this.open_edit_object.bind(this)}
      show_give_award_bottomsheet={this.show_give_award_bottomsheet.bind(this)} get_post_award_data={this.get_post_award_data.bind(this)} show_add_comment_bottomsheet={this.show_add_comment_bottomsheet.bind(this)}

      get_contract_event_data={this.get_contract_event_data.bind(this)} get_proposal_event_data={this.get_proposal_event_data.bind(this)} get_subscription_event_data={this.get_subscription_event_data.bind(this)} get_exchange_event_data={this.get_exchange_event_data.bind(this)} get_moderator_event_data={this.get_moderator_event_data.bind(this)} get_accounts_payment_information={this.get_accounts_payment_information.bind(this)} show_depthmint_bottomsheet={this.show_depthmint_bottomsheet.bind(this)} open_wallet_guide_bottomsheet={this.open_wallet_guide_bottomsheet.bind(this)} get_channel_event_data={this.get_channel_event_data.bind(this)}

      when_select_deselect_work_tag={this.when_select_deselect_work_tag.bind(this)} when_select_deselect_explore_tag={this.when_select_deselect_explore_tag.bind(this)} get_searched_account_data={this.get_searched_account_data.bind(this)} when_searched_account_clicked={this.when_searched_account_clicked.bind(this)} when_searched_account_clicked={this.when_searched_account_clicked.bind(this)} enable_tabs={this.enable_tabs.bind(this)} show_rpc_settings_bottomsheet={this.show_rpc_settings_bottomsheet.bind(this)} get_wallet_data_for_specific_e5={this.get_wallet_data_for_specific_e5.bind(this)}
      />
    )
  }

  set_cookies_after_stack_action(stack_items){
    var me = this;
    setTimeout(function() { 
      if(me.stack_page.current!= null){
        me.stack_page.current?.run_transactions(true)
      } 
      me.set_cookies()
    }, (1 * 1000));
  }

  add_mail_to_stack_object(message){
    var stack = this.state.stack_items.slice()
    var pos = -1
    for(var i=0; i<stack.length; i++){
      if(stack[i].type == 'mail-messages' && stack[i].e5 == message['e5']){
        pos = i
        break;
      }
    }
    if(pos == -1){
      var tx = {selected: 0, id: makeid(8), type:'mail-messages', entered_indexing_tags:['send', 'mail'], messages_to_deliver:[], e5:message['e5']}
      tx.messages_to_deliver.push(message)
      stack.push(tx)
    }else{
      stack[pos].messages_to_deliver.push(message)
    }
    this.setState({stack_items: stack})
    this.set_cookies_after_stack_action(stack)
  }

  add_channel_message_to_stack_object(message){
    var stack = this.state.stack_items.slice()
    var pos = -1
    for(var i=0; i<stack.length; i++){
      if(stack[i].type == 'channel-messages' && stack[i].e5 == this.state.selected_e5){
        pos = i
        break;
      }
    }
    if(pos == -1){
      var tx = {selected: 0, id: makeid(8), type:'channel-messages', entered_indexing_tags:['send', 'channel','messages'], messages_to_deliver:[], e5:this.state.selected_e5}
      tx.messages_to_deliver.push(message)
      stack.push(tx)
    }else{
      stack[pos].messages_to_deliver.push(message)
    }
    this.setState({stack_items: stack})
    this.set_cookies_after_stack_action(stack)
  }

  add_post_reply_to_stack(message){
    var stack = this.state.stack_items.slice()
    var pos = -1
    for(var i=0; i<stack.length; i++){
      if(stack[i].type == 'post-messages' && stack[i].e5 == this.state.selected_e5){
        pos = i
        break;
      }
    }
    if(pos == -1){
      var tx = {selected: 0, id: makeid(8), type:'post-messages', entered_indexing_tags:['send', 'post','comment'], messages_to_deliver:[], e5:this.state.selected_e5}
      tx.messages_to_deliver.push(message)
      stack.push(tx)
    }else{
      stack[pos].messages_to_deliver.push(message)
    }
    this.setState({stack_items: stack})
    this.set_cookies_after_stack_action(stack)
  }

  add_job_message_to_stack_object(message){
    var stack = this.state.stack_items.slice()
    var pos = -1
    for(var i=0; i<stack.length; i++){
      if(stack[i].type == 'job-messages' && stack[i].e5 == this.state.selected_e5){
        pos = i
        break;
      }
    }
    if(pos == -1){
      var tx = {selected: 0, id: makeid(8), type:'job-messages', entered_indexing_tags:['send', 'job','comment'], messages_to_deliver:[], e5:this.state.selected_e5}
      tx.messages_to_deliver.push(message)
      stack.push(tx)
    }else{
      stack[pos].messages_to_deliver.push(message)
    }
    this.setState({stack_items: stack})
    this.set_cookies_after_stack_action(stack)
  }

  add_proposal_message_to_stack_object(message){
    var stack = this.state.stack_items.slice()
    var pos = -1
    for(var i=0; i<stack.length; i++){
      if(stack[i].type == 'proposal-messages' && stack[i].e5 == this.state.selected_e5){
        pos = i
        break;
      }
    }
    if(pos == -1){
      var tx = {selected: 0, id: makeid(8), type:'proposal-messages', entered_indexing_tags:['send', 'job','comment'], messages_to_deliver:[], e5:this.state.selected_e5}
      tx.messages_to_deliver.push(message)
      stack.push(tx)
    }else{
      stack[pos].messages_to_deliver.push(message)
    }
    this.setState({stack_items: stack})
    this.set_cookies_after_stack_action(stack)
  }

  add_bag_message_to_stack_object(message){
    var stack = this.state.stack_items.slice()
    var pos = -1
    for(var i=0; i<stack.length; i++){
      if(stack[i].type == 'bag-messages' && stack[i].e5 == this.state.selected_e5){
        pos = i
        break;
      }
    }
    if(pos == -1){
      var tx = {selected: 0, id: makeid(8), type:'bag-messages', entered_indexing_tags:['send', 'bag','comment'], messages_to_deliver:[], e5:this.state.selected_e5}
      tx.messages_to_deliver.push(message)
      stack.push(tx)
    }else{
      stack[pos].messages_to_deliver.push(message)
    }
    this.setState({stack_items: stack})
    this.set_cookies_after_stack_action(stack)
  }

  add_storefront_message_to_stack_object(message){
    var stack = this.state.stack_items.slice()
    var pos = -1
    for(var i=0; i<stack.length; i++){
      if(stack[i].type == 'storefront-messages' && stack[i].e5 == this.state.selected_e5){
        pos = i
        break;
      }
    }
    if(pos == -1){
      var tx = {selected: 0, id: makeid(8), type:'storefront-messages', entered_indexing_tags:['send', 'storefront','message','review'], messages_to_deliver:[], e5:this.state.selected_e5}
      tx.messages_to_deliver.push(message)
      stack.push(tx)
    }else{
      stack[pos].messages_to_deliver.push(message)
    }
    this.setState({stack_items: stack})
    this.set_cookies_after_stack_action(stack)
  }

  when_select_deselect_work_tag(tag, pos){
    var clone = this.state.job_section_tags.slice()
    const index = clone.indexOf(tag);
    if (index > -1) { // only splice array when item is found
      clone.splice(index, 1); // 2nd parameter means remove one item only
    } else {
      clone.push(tag)
    }
    this.setState({job_section_tags: clone, should_update_section_tags_onchain: true})
    var me = this;
    setTimeout(function() {
        me.set_cookies()
    }, (1 * 1000));
  }

  when_select_deselect_explore_tag(tag, pos){
    var clone = this.state.explore_section_tags.slice()
    const index = clone.indexOf(tag);
    if (index > -1) { // only splice array when item is found
      clone.splice(index, 1); // 2nd parameter means remove one item only
    } else {
      clone.push(tag)
    }
    this.setState({explore_section_tags: clone, should_update_section_tags_onchain: true})
    var me = this;
    setTimeout(function() {
        me.set_cookies()
    }, (1 * 1000));
  }

  enable_tabs(){
    this.setState({visible_tabs: 'enabled'})
    var me = this;
    setTimeout(function() {
        me.set_cookies()
        me.stack_page.current?.set_tabs_tag()
    }, (1 * 1000));
  }







  render_synchronizing_bottomsheet(){
    var background_color = this.state.theme['syncronizing_page_background_color'];
    var size = this.getScreenSize();
    return(
      <SwipeableBottomSheet overflowHeight={0} marginTop={50} onChange={this.open_syncronizing_page_bottomsheet.bind(this)} open={this.state.syncronizing_page_bottomsheet} onTransitionEnd={this.keep_syncronizing_page_open()}  style={{'z-index':'3'}} bodyStyle={{'background-color': 'transparent'}} overlayStyle={{'background-color': 'grey'}}>
          <div style={{ height: this.state.height, 'background-color': background_color, 'margin': '0px 0px 0px 0px', 'padding':'10px 10px 0px 10px', 'overflow-y':'auto'}}>
            <Syncronizing_page sync_progress={this.state.syncronizing_progress} theme={this.state.theme} close_syncronizing_page={this.close_syncronizing_page.bind(this)} />
          </div>
      </SwipeableBottomSheet>
    );
  }

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

  close_syncronizing_page(){
    if(this.state.syncronizing_progress >= 100 && this.state.should_keep_synchronizing_bottomsheet_open == false){
      this.open_syncronizing_page_bottomsheet()
    }else{
      // this.prompt_top_notification('Not yet!', 700)
    }
  }







  render_send_receive_ether_bottomsheet(){
    var background_color = this.state.theme['send_receive_ether_background_color'];
    var overlay_background = this.state.theme['send_receive_ether_overlay_background'];
    var overlay_shadow_color = this.state.theme['send_receive_ether_overlay_shadow'];
    var size = this.getScreenSize();
    return(
      <SwipeableBottomSheet  overflowHeight={0} marginTop={0} onChange={this.open_send_receive_ether_bottomsheet.bind(this)} open={this.state.send_receive_bottomsheet} style={{'z-index':'5'}} bodyStyle={{'background-color': 'transparent'}} overlayStyle={{'background-color': overlay_background,'box-shadow': '0px 0px 0px 0px '+overlay_shadow_color}}>
          <div style={{ height: this.state.height-60, 'background-color': background_color, 'border-style': 'solid', 'border-color': overlay_shadow_color, 'border-radius': '5px 5px 0px 0px', 'border-width': '0px', 'box-shadow': '0px 0px 0px 0px '+overlay_shadow_color,'margin': '0px 0px 0px 0px', 'overflow-y':'auto'}}>
              
              <SendReceiveEtherPage ref={this.send_receive_ether_page}  app_state={this.state} size={size} width={this.state.width} height={this.state.height} notify={this.prompt_top_notification.bind(this)} send_ether_to_target={this.send_ether_to_target.bind(this)} transaction_history={this.state.account_transaction_history} theme={this.state.theme} ether_balance={this.state.account_balance} start_scan={this.start_scan.bind(this)} get_wallet_data_for_specific_e5={this.get_wallet_data_for_specific_e5.bind(this)}/>
          </div>
      </SwipeableBottomSheet>
    )
  }

  open_send_receive_ether_bottomsheet(){
    if(this.state != null){
        this.setState({send_receive_bottomsheet: !this.state.send_receive_bottomsheet});
      }
  }

  start_send_receive_ether_bottomsheet(item){
    if(this.send_receive_ether_page.current != null){
      this.send_receive_ether_page.current.set_object(item)
    }
    this.open_send_receive_ether_bottomsheet()
  }





  render_stack_bottomsheet(){
    var background_color = this.state.theme['send_receive_ether_background_color'];
    var size = this.getScreenSize();
    return(
      <SwipeableBottomSheet  overflowHeight={0} marginTop={0} onChange={this.open_stack_bottomsheet.bind(this)} open={this.state.stack_bottomsheet} style={{'z-index':'5'}} bodyStyle={{'background-color': 'transparent'}} overlayStyle={{'background-color': this.state.theme['send_receive_ether_overlay_background'],'box-shadow': '0px 0px 0px 0px '+this.state.theme['send_receive_ether_overlay_shadow']}}>
          <div style={{ height: this.state.height-60, 'background-color': background_color, 'border-style': 'solid', 'border-color': this.state.theme['send_receive_ether_overlay_background'], 'border-radius': '1px 1px 0px 0px', 'border-width': '0px', 'box-shadow': '0px 0px 2px 1px '+this.state.theme['send_receive_ether_overlay_shadow'],'margin': '0px 0px 0px 0px', 'overflow-y':'auto'}}>
              <StackPage ref={this.stack_page} app_state={this.state} size={size} theme={this.state.theme} when_device_theme_changed={this.when_device_theme_changed.bind(this)} when_details_orientation_changed={this.when_details_orientation_changed.bind(this)} notify={this.prompt_top_notification.bind(this)} when_wallet_data_updated={this.when_wallet_data_updated.bind(this)} height={this.state.height} run_transaction_with_e={this.run_transaction_with_e.bind(this)} store_data_in_infura={this.store_data_in_infura.bind(this)} get_accounts_public_key={this.get_accounts_public_key.bind(this)} encrypt_data_object={this.encrypt_data_object.bind(this)} encrypt_key_with_accounts_public_key_hash={this.encrypt_key_with_accounts_public_key_hash.bind(this)} get_account_public_key={this.get_account_public_key.bind(this)} get_account_raw_public_key={this.get_account_raw_public_key.bind(this)} view_transaction={this.view_transaction.bind(this)} show_hide_stack_item={this.show_hide_stack_item.bind(this)} show_view_transaction_log_bottomsheet={this.show_view_transaction_log_bottomsheet.bind(this)} add_account_to_contacts={this.add_account_to_contacts.bind(this)} remove_account_from_contacts={this.remove_account_from_contacts.bind(this)} add_alias_transaction_to_stack={this.add_alias_transaction_to_stack.bind(this)} unreserve_alias_transaction_to_stack={this.unreserve_alias_transaction_to_stack.bind(this)} reset_alias_transaction_to_stack={this.reset_alias_transaction_to_stack.bind(this)} when_selected_e5_changed={this.when_selected_e5_changed.bind(this)} when_storage_option_changed={this.when_storage_option_changed.bind(this)} store_objects_data_in_ipfs_using_option={this.store_objects_data_in_ipfs_using_option.bind(this)} lock_run={this.lock_run.bind(this)} open_wallet_guide_bottomsheet={this.open_wallet_guide_bottomsheet.bind(this)} clear_cache={this.clear_cache.bind(this)} when_refresh_speed_changed={this.when_refresh_speed_changed.bind(this)} remove_account_from_blocked_accounts={this.remove_account_from_blocked_accounts.bind(this)} add_account_to_blocked_list={this.add_account_to_blocked_list.bind(this)} when_masked_data_setting_changed={this.when_masked_data_setting_changed.bind(this)} when_content_channeling_changed={this.when_content_channeling_changed.bind(this)} when_content_language_changed={this.when_content_language_changed.bind(this)} when_content_filter_setting_changed={this.when_content_filter_setting_changed.bind(this)} when_tabs_setting_changed={this.when_tabs_setting_changed.bind(this)} when_storage_permission_setting_changed={this.when_storage_permission_setting_changed.bind(this)} calculate_gas_with_e={this.calculate_gas_with_e.bind(this)} get_wallet_data_for_specific_e5={this.get_wallet_data_for_specific_e5.bind(this)} show_confirm_run_bottomsheet={this.show_confirm_run_bottomsheet.bind(this)} when_stack_optimizer_setting_changed={this.when_stack_optimizer_setting_changed.bind(this)} />
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
    var me = this;
    setTimeout(function() {
        me.set_cookies()
    }, (1 * 1000));
    
  }

  when_details_orientation_changed(orientation){
    this.setState({details_orientation: orientation})
  }

  when_selected_e5_changed(e5){
    this.setState({selected_e5: e5})
    var me = this;
    setTimeout(function() {
        // console.log('------------------when_selected_e5_changed---------------------')
        // console.log(me.state.selected_e5)
        me.set_cookies()
    }, (1 * 1000));
  }

  when_storage_option_changed(option){
    this.setState({storage_option: option})
    var me = this;
    setTimeout(function() {
        me.set_cookies()
    }, (1 * 1000));
  }

  clear_cache(){
    if(this.homepage.current != null){
      this.homepage.current?.setState({viewed_posts:[],viewed_channels:[],viewed_jobs:[], viewed_contracts:[], viewed_subscriptions:[], viewed_proposals:[],viewed_stores:[], viewed_bags:[], viewed_contractors:[], pinned_bags:[], pinned_channels:[], pinned_item:[], pinned_post:[], pinned_subscriptions:[], pinned_proposal:[], pinned_contractor:[], pinned_contract:[], pinned_job:[],})
    }
  }

  when_refresh_speed_changed(item){
    this.setState({refresh_speed: item})
    var me = this;
    setTimeout(function() {
        me.set_cookies()
        me.reset_background_sync()
    }, (1 * 1000));
  }

  when_masked_data_setting_changed(item){
    this.setState({masked_content: item})
    var me = this;
    setTimeout(function() {
        me.set_cookies()
    }, (1 * 1000));
  }

  when_content_channeling_changed(item){
    this.setState({content_channeling: item})
    var me = this;
    setTimeout(function() {
        me.set_cookies()
    }, (1 * 1000));
  }

  when_content_language_changed(item){
    this.setState({device_language: item})
    var me = this;
    setTimeout(function() {
        me.set_cookies()
    }, (1 * 1000));
  }

  when_content_filter_setting_changed(item){
    this.setState({section_tags_setting:item})
    var me = this;
    setTimeout(function() {
        me.set_cookies()
    }, (1 * 1000));
  }

  when_tabs_setting_changed(item){
    this.setState({visible_tabs: item})
    var me = this;
    setTimeout(function() {
        me.set_cookies()
    }, (1 * 1000));
  }

  when_storage_permission_setting_changed(item){
    this.setState({storage_permissions: item})
    var me = this;
    setTimeout(function() {
        me.set_cookies()
    }, (1 * 1000));
  }

  when_stack_optimizer_setting_changed(item){
    this.setState({stack_optimizer: item})
    var me = this;
    setTimeout(function() {
      me.set_cookies()
    }, (1 * 1000));
  }






  lock_run(value){
    var clone = structuredClone(this.state.is_running)
    clone[this.state.selected_e5] = true
    this.setState({is_running: clone})

    var me = this;
    setTimeout(function() {
      var clone = structuredClone(me.state.is_running)
      clone[me.state.selected_e5] = false
      me.setState({is_running: clone})
    }, (60 * 1000));
  }

  calculate_gas_with_e = async (strs, ints, adds, run_gas_limit, wei, delete_pos_array, run_gas_price) => {
    const web3 = new Web3(this.get_selected_web3_url());
    const contractArtifact = require('./contract_abis/E5.json');
    const contractAddress = this.get_selected_E5_contract()
    const contractInstance = new web3.eth.Contract(contractArtifact.abi, contractAddress); 
    const me = this

    var v5/* t_limits */ = [1000000000000, 1000000000000];
    console.log('calculating gas price for current stack...')
    console.log(ints)
    if(this.state.stack_items.length == 0){
      var clone = structuredClone(me.state.calculated_gas_figures)
      clone[me.state.selected_e5] = 0
      me.setState({calculated_gas_figures: clone})
      return;
    }
    contractInstance.methods.e(v5/* t_limits */, adds, ints, strs).estimateGas({from: me.state.accounts[me.state.selected_e5].address, gas: run_gas_limit, value: wei}, function(error, gasAmount){
        console.log('---------------------calculate_gas_with_e-------------------------')
        console.log(gasAmount)
        if(gasAmount == null){
          me.prompt_top_notification('Your next run might fail with its current stack', 4000)
        }
        var clone = structuredClone(me.state.calculated_gas_figures)
        clone[me.state.selected_e5] = gasAmount
        me.setState({calculated_gas_figures: clone})
    });
  }

  run_transaction_with_e = async (strs, ints, adds, run_gas_limit, wei, delete_pos_array, run_gas_price, run_expiry_duration) => {
    const web3 = new Web3(this.get_selected_web3_url());
    const contractArtifact = require('./contract_abis/E5.json');
    const contractAddress = this.get_selected_E5_contract()
    const contractInstance = new web3.eth.Contract(contractArtifact.abi, contractAddress); 
    const me = this

    var now = await contractInstance.methods.f147(2).call((error, result) => {})
    var run_expiry_time = now + run_expiry_duration

    var v5/* t_limits */ = [100000000000000, run_expiry_time];
    var network_gp = await web3.eth.getGasPrice()
    var run_gas_price = run_gas_price == null ? network_gp : run_gas_price
    console.log("gasPrice: "+run_gas_price);
    const gasLimit = run_gas_limit;

    var encoded = contractInstance.methods.e(v5/* t_limits */, adds, ints, strs).encodeABI()

    var tx = {
        gas: gasLimit,
        value: wei,
        to: contractAddress,
        data: encoded,
        gasPrice: run_gas_price.toString(),
        time:now
    }

    
    web3.eth.accounts.signTransaction(tx, me.state.accounts[this.state.selected_e5].privateKey).then(signed => {
        web3.eth.sendSignedTransaction(signed.rawTransaction).on('receipt', (receipt) => {
          var clone = structuredClone(this.state.is_running)
          clone[this.state.selected_e5] = false
          me.setState({should_update_contacts_onchain: false, is_running: clone, should_update_section_tags_onchain: false, should_update_blocked_accounts_onchain: false})
          this.delete_stack_items(delete_pos_array)
          // this.start_get_accounts_data(false)
          this.start_get_accounts_for_specific_e5(false, this.state.selected_e5)
          me.reset_gas_calculation_figure(me)
          this.prompt_top_notification('run complete!', 600)
        }).on('error', (error) => {
          console.error('Transaction error:', error);
          var clone = structuredClone(this.state.is_running)
          clone[this.state.selected_e5] = false
          me.setState({is_running: clone})
          this.prompt_top_notification('Your transaction was reverted.', 9500)
        });
    })

    // this.prompt_top_notification('running your transactions...', 600)
    // web3.eth.accounts.wallet.add(me.state.account.privateKey);
    // contractInstance.methods.e(v5/* t_limits */, adds, ints, strs)
    //     .send({
    //       from: me.state.account.address, 
    //       value: wei,
    //       gasPrice, 
    //       gasLimit 
    //     })
    //     .on('transactionHash', (hash) => {
    //       console.log('e Transaction hash:', hash);
    //     })
    //     .on('receipt', (receipt) => {
    //       console.log('e Transaction receipt:', receipt);
    //       me.setState({stack_items: []})
    //       me.get_accounts_data(me.state.account)
    //       this.prompt_top_notification('run complete!', 600)
    //     }).on('error', (error) => {
    //       console.error('Transaction error:', error);
    //       this.prompt_top_notification('run failed. Check your stacks transactions and try again', 1500)
    //     });


    // this.prompt_top_notification('running your transactions...', 600)
    // const provider = new ethers.providers.JsonRpcProvider(this.state.web3);
    // const wallet = new ethers.Wallet(me.state.account.privateKey, provider);
    // const signer = provider.getSigner();
    // const contract = new ethers.Contract(contractAddress, contractArtifact.abi, signer);
    // const tx = await contract.connect(wallet).e(v5/* t_limits */, adds, ints, strs, { gasLimit: gasLimit, value: wei })
    // const receipt = await tx.wait();

    // if (receipt.status === 1) {
    //   console.log('Transaction successful. Transaction hash:', receipt.transactionHash);
    //   me.setState({stack_items: []})
    //   me.get_accounts_data(me.state.account)
    //   this.prompt_top_notification('run complete!', 600)
    // } else {
    //   console.log('Transaction failed. Transaction hash:', receipt.transactionHash);
    //   this.prompt_top_notification('run failed. Check your stacks transactions and try again', 1500)
    // }
  }

  reset_gas_calculation_figure(me){
    var clone = structuredClone(me.state.calculated_gas_figures)
    clone[me.state.selected_e5] = 0
    me.setState({calculated_gas_figures: clone})
  }

  delete_stack_items(delete_pos_array){
    var stack = this.state.stack_items.slice()
    var new_stack = []
    for(var i=0; i<stack.length; i++){
      if(!delete_pos_array.includes(i)){
        new_stack.push(stack[i])
      }
    }

    this.setState({stack_items: new_stack})
    this.set_cookies_after_stack_action(new_stack)
  }

  view_transaction(tx, index){
    this.show_view_transaction_bottomsheet(tx, index)
  }

  show_hide_stack_item(item){
    var clone_array = this.state.hidden.slice()
    const index = clone_array.indexOf(item);
    if (index > -1) { // only splice array when item is found
        clone_array.splice(index, 1); // 2nd parameter means remove one item only
    }else{
        clone_array.push(item)
    }
    this.setState({hidden: clone_array})
  }

  remove_account_from_contacts(item){
    var clone = structuredClone(this.state.contacts)
    // var clone_array = this.state.contacts.slice()
    const index = this.index_of(clone[this.state.selected_e5], item);
    if (index > -1) { // only splice array when item is found
      clone[this.state.selected_e5].splice(index, 1); // 2nd parameter means remove one item only
    }
    this.setState({contacts: clone, should_update_contacts_onchain: true})
    this.prompt_top_notification('Contact Deleted', 700)

    var me = this;
    setTimeout(function() {
      me.set_cookies()
    }, (1 * 1000));
  }

  index_of(array, item){
    var index = -1
    for(var i=0; i<array.length; i++){
      if(array[i]['address'] == item['address']){
        index = i
        break;
      }
    }
    return index
  }

  add_alias_transaction_to_stack(id){
    var stack_clone = this.state.stack_items.slice()
    var existing_alias_transaction = false
    for(var i=0; i<stack_clone.length; i++){
      if(stack_clone[i].type == 'alias'){
        this.prompt_top_notification('You cant do that more than once.', 1000)
        existing_alias_transaction = true
        break;
      }
    }
    if(!existing_alias_transaction){
      stack_clone.push({id: makeid(8), e5:this.state.selected_e5, type:'alias', entered_indexing_tags:['alias', 'reserve', 'identification'], alias:id})
      this.prompt_top_notification('Transaction added to stack', 1000)
      this.setState({stack_items: stack_clone})
      this.set_cookies_after_stack_action(stack_clone)
    }
  }

  unreserve_alias_transaction_to_stack(id){
    var stack_clone = this.state.stack_items.slice()
    var existing_alias_transaction = false
    for(var i=0; i<stack_clone.length; i++){
      if(stack_clone[i].type == 'unalias'){
        this.prompt_top_notification('You cant do that more than once.', 1000)
        existing_alias_transaction = true
        break;
      }
    }
    if(!existing_alias_transaction){
      stack_clone.push({id: makeid(8), e5:this.state.selected_e5, type:'unalias', entered_indexing_tags:['unalias', 'unreserve', 'identification'], alias:id['alias']})
      this.prompt_top_notification('Unreserve transaction added to stack', 1000)
      this.setState({stack_items: stack_clone})
      this.set_cookies_after_stack_action(stack_clone)
    }
  }

  reset_alias_transaction_to_stack(id){
    var stack_clone = this.state.stack_items.slice()
    var existing_alias_transaction = false
    for(var i=0; i<stack_clone.length; i++){
      if(stack_clone[i].type == 're-alias'){
        this.prompt_top_notification('You cant do that more than once.', 1000)
        existing_alias_transaction = true
        break;
      }
    }
    if(!existing_alias_transaction){
      stack_clone.push({id: makeid(8), e5:this.state.selected_e5, type:'re-alias', entered_indexing_tags:['re-alias', 'reserve', 'identification'], alias:id['alias']})
      this.prompt_top_notification('Reset transaction added to stack', 1000)
      this.setState({stack_items: stack_clone})
      this.set_cookies_after_stack_action(stack_clone)
    }
  }

  remove_account_from_blocked_accounts(item){
    var clone = structuredClone(this.state.blocked_accounts)
    const index = this.index_of(clone[this.state.selected_e5], item);
    if (index > -1) { // only splice array when item is found
      clone[this.state.selected_e5].splice(index, 1); // 2nd parameter means remove one item only
    }
    this.setState({blocked_accounts: clone, should_update_blocked_accounts_onchain: true})
    this.prompt_top_notification('Blocked account removed', 1700)
    
    var me = this;
    setTimeout(function() {
      me.set_cookies()
    }, (1 * 1000));
  }











  render_wiki_bottomsheet(){
    var background_color = this.state.theme['send_receive_ether_background_color'];
    var size = this.getScreenSize();
    return(
      <SwipeableBottomSheet  overflowHeight={0} marginTop={0} onChange={this.open_wiki_bottomsheet.bind(this)} open={this.state.wiki_bottomsheet} style={{'z-index':'5'}} bodyStyle={{'background-color': 'transparent'}} overlayStyle={{'background-color': this.state.theme['send_receive_ether_overlay_background'],'box-shadow': '0px 0px 0px 0px '+this.state.theme['send_receive_ether_overlay_shadow']}}>
          <div style={{ height: this.state.height-90, 'background-color': background_color, 'border-style': 'solid', 'border-color': this.state.theme['send_receive_ether_overlay_background'], 'border-radius': '1px 1px 0px 0px', 'border-width': '0px', 'box-shadow': '0px 0px 2px 1px '+this.state.theme['send_receive_ether_overlay_shadow'],'margin': '0px 0px 0px 0px', 'overflow-y':'auto'}}>   
              <WikiPage ref={this.wiki_page} app_state={this.state} size={size} height={this.state.height} theme={this.state.theme} />
          </div>
      </SwipeableBottomSheet>
    )
  }


  open_wiki_bottomsheet(){
    if(this.state != null){
        this.setState({wiki_bottomsheet: !this.state.wiki_bottomsheet});
      }
  }


  open_wallet_guide_bottomsheet(option){
    if(this.wiki_page.current != null){
      this.wiki_page.current?.set(option)
    }
    this.open_wiki_bottomsheet()
  }




  render_new_object_bottomsheet(){
    var background_color = this.state.theme['send_receive_ether_background_color'];
    return(
      <SwipeableBottomSheet  overflowHeight={0} marginTop={0} onChange={this.open_new_object_bottomsheet.bind(this)} open={this.state.new_object_bottomsheet} style={{'z-index':'5'}} bodyStyle={{'background-color': 'transparent'}} overlayStyle={{'background-color': this.state.theme['send_receive_ether_overlay_background'],'box-shadow': '0px 0px 0px 0px '+this.state.theme['send_receive_ether_overlay_shadow']}}>
          <div style={{ height: this.state.height-60, 'background-color': background_color, 'border-style': 'solid', 'border-color': this.state.theme['send_receive_ether_overlay_background'], 'border-radius': '1px 1px 0px 0px', 'border-width': '0px', 'box-shadow': '0px 0px 2px 1px '+this.state.theme['send_receive_ether_overlay_shadow'],'margin': '0px 0px 0px 0px', 'overflow-y':'auto'}}>  
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
    this.open_new_object_bottomsheet()
  }

  render_create_object_ui(){
    var target = this.state.new_object_target;
    var size = this.getScreenSize();
    if(target == '0'){
      return(
        <div>
          <NewJobPage ref={this.new_job_page} app_state={this.state} size={size} height={this.state.height} theme={this.state.theme} notify={this.prompt_top_notification.bind(this)} when_add_new_object_to_stack={this.when_add_new_object_to_stack.bind(this)}/>
        </div>
      )
    }
    else if(target == '8'){
      return(
        <div>
          <NewTokenPage ref={this.new_token_page} app_state={this.state} size={size} height={this.state.height} theme={this.state.theme} notify={this.prompt_top_notification.bind(this)} when_add_new_object_to_stack={this.when_add_new_object_to_stack.bind(this)}/>
        </div>
      )
    }
    else if(target == '3'){
      return(
        <NewSubscriptionPage ref={this.new_subscription_page} app_state={this.state} size={size} height={this.state.height} theme={this.state.theme} notify={this.prompt_top_notification.bind(this)} when_add_new_object_to_stack={this.when_add_new_object_to_stack.bind(this)}/>
      )
    }
    else if(target == '1'){
      return(
        <NewContractPage ref={this.new_contract_page} app_state={this.state} size={size} height={this.state.height} theme={this.state.theme} notify={this.prompt_top_notification.bind(this)} when_add_new_object_to_stack={this.when_add_new_object_to_stack.bind(this)}/>
      )
    }
    else if(target == '6'){
      return(
        <NewPostPage ref={this.new_post_page} app_state={this.state} size={size} height={this.state.height} theme={this.state.theme} notify={this.prompt_top_notification.bind(this)} when_add_new_object_to_stack={this.when_add_new_object_to_stack.bind(this)}/>
      )
    }
    else if(target == '7'){
      return(
        <NewChannelPage ref={this.new_channel_page} app_state={this.state} size={size} height={this.state.height} theme={this.state.theme} notify={this.prompt_top_notification.bind(this)} when_add_new_object_to_stack={this.when_add_new_object_to_stack.bind(this)} />
      )
    }
    else if(target == '4'){
      return(
        <NewStorefrontItemPage ref={this.new_storefront_item_page} app_state={this.state} size={size} height={this.state.height} theme={this.state.theme} notify={this.prompt_top_notification.bind(this)} when_add_new_object_to_stack={this.when_add_new_object_to_stack.bind(this)} show_images={this.show_images.bind(this)}/>
      )
    }
    else if(target == '5'){
      return(
        <NewMailPage ref={this.new_mail_page} app_state={this.state} size={size} height={this.state.height} theme={this.state.theme} notify={this.prompt_top_notification.bind(this)} when_add_new_mail_to_stack={this.when_add_new_mail_to_stack.bind(this)}/>
      );
    }
    else if(target == '9'){
      return(
        <NewContractorPage ref={this.new_contractor_page} app_state={this.state} size={size} height={this.state.height} theme={this.state.theme} notify={this.prompt_top_notification.bind(this)} when_add_new_object_to_stack={this.when_add_new_object_to_stack.bind(this)}/>
      );
    }
    
  }

  when_edit_created_job_tapped(obj){
    this.new_job_page.current.set_fileds_for_edit_action(obj)
    this.new_job_page.current.set_action('edit')
    this.open_new_object_bottomsheet()
  }


  when_add_new_mail_to_stack(state_obj){
    var stack_clone = this.state.stack_items.slice()
    var edit_id = -1
      for(var i=0; i<stack_clone.length; i++){
        if(stack_clone[i].id == state_obj.id){
          edit_id = i
        }
      }
      if(edit_id != -1){
        stack_clone[edit_id] = state_obj
      }else{
        stack_clone.push(state_obj)
      }
    this.setState({stack_items: stack_clone})
    this.set_cookies_after_stack_action(stack_clone)
  }


  when_add_new_object_to_stack(state_obj){
    var stack_clone = this.state.stack_items.slice()
    var edit_id = -1
    for(var i=0; i<stack_clone.length; i++){
      if(stack_clone[i].id == state_obj.id){
        edit_id = i
      }
    }
    if(edit_id != -1){
      stack_clone[edit_id] = state_obj
    }else{
      stack_clone.push(state_obj)
    }
    this.setState({stack_items: stack_clone})
    this.set_cookies_after_stack_action(stack_clone)
  }











  render_edit_token_object_bottomsheet(){
    var background_color = this.state.theme['send_receive_ether_background_color'];
    var size = this.getScreenSize();
    return(
      <SwipeableBottomSheet  overflowHeight={0} marginTop={0} onChange={this.open_edit_token_bottomsheet.bind(this)} open={this.state.edit_token_bottomsheet} style={{'z-index':'5'}} bodyStyle={{'background-color': 'transparent'}} overlayStyle={{'background-color': this.state.theme['send_receive_ether_overlay_background'],'box-shadow': '0px 0px 0px 0px '+this.state.theme['send_receive_ether_overlay_shadow']}}>
          <div style={{ height: this.state.height-60, 'background-color': background_color, 'border-style': 'solid', 'border-color': this.state.theme['send_receive_ether_overlay_background'], 'border-radius': '1px 1px 0px 0px', 'border-width': '0px', 'box-shadow': '0px 0px 2px 1px '+this.state.theme['send_receive_ether_overlay_shadow'],'margin': '0px 0px 0px 0px', 'overflow-y':'auto'}}>  
              <div>
                <EditTokenPage ref={this.edit_token_page} app_state={this.state} size={size} height={this.state.height} theme={this.state.theme} notify={this.prompt_top_notification.bind(this)} when_add_edit_object_to_stack={this.when_add_edit_object_to_stack.bind(this)}/>
              </div>
          </div>
      </SwipeableBottomSheet>
    )
  }

  open_edit_token_bottomsheet(){
    if(this.state != null){
      this.setState({edit_token_bottomsheet: !this.state.edit_token_bottomsheet});
    }
  }

  open_edit_token_object(target, object){
    this.open_edit_token_bottomsheet()
    if(this.edit_token_page.current){
      this.edit_token_page.current?.setState(object['ipfs'])
      this.edit_token_page.current?.set_edit_data()
      this.edit_token_page.current?.setState({object_id: object['id']})
    }
  }








  render_edit_channel_object_bottomsheet(){
    var background_color = this.state.theme['send_receive_ether_background_color'];
    var size = this.getScreenSize();
    return(
      <SwipeableBottomSheet  overflowHeight={0} marginTop={0} onChange={this.open_edit_channel_bottomsheet.bind(this)} open={this.state.edit_channel_bottomsheet} style={{'z-index':'5'}} bodyStyle={{'background-color': 'transparent'}} overlayStyle={{'background-color': this.state.theme['send_receive_ether_overlay_background'],'box-shadow': '0px 0px 0px 0px '+this.state.theme['send_receive_ether_overlay_shadow']}}>
          <div style={{ height: this.state.height-60, 'background-color': background_color, 'border-style': 'solid', 'border-color': this.state.theme['send_receive_ether_overlay_background'], 'border-radius': '1px 1px 0px 0px', 'border-width': '0px', 'box-shadow': '0px 0px 2px 1px '+this.state.theme['send_receive_ether_overlay_shadow'],'margin': '0px 0px 0px 0px', 'overflow-y':'auto'}}>  
              <div>
                <EditChannelPage ref={this.edit_channel_page} app_state={this.state} size={size} height={this.state.height} theme={this.state.theme} notify={this.prompt_top_notification.bind(this)} when_add_edit_object_to_stack={this.when_add_edit_object_to_stack.bind(this)}/>
              </div>
          </div>
      </SwipeableBottomSheet>
    )
  }

  open_edit_channel_bottomsheet(){
    if(this.state != null){
      this.setState({edit_channel_bottomsheet: !this.state.edit_channel_bottomsheet});
    }
  }

  open_edit_channel_object(target, object){
    this.open_edit_channel_bottomsheet()
    if(this.edit_channel_page.current){
      this.edit_channel_page.current?.setState(object['ipfs'])
      this.edit_channel_page.current?.set_edit_data()
      this.edit_channel_page.current?.setState({object_id: object['id']})
    }
  }













  render_edit_contractor_object_bottomsheet(){
    var background_color = this.state.theme['send_receive_ether_background_color'];
    var size = this.getScreenSize();
    return(
      <SwipeableBottomSheet  overflowHeight={0} marginTop={0} onChange={this.open_edit_contractor_bottomsheet.bind(this)} open={this.state.edit_contractor_bottomsheet} style={{'z-index':'5'}} bodyStyle={{'background-color': 'transparent'}} overlayStyle={{'background-color': this.state.theme['send_receive_ether_overlay_background'],'box-shadow': '0px 0px 0px 0px '+this.state.theme['send_receive_ether_overlay_shadow']}}>
          <div style={{ height: this.state.height-60, 'background-color': background_color, 'border-style': 'solid', 'border-color': this.state.theme['send_receive_ether_overlay_background'], 'border-radius': '1px 1px 0px 0px', 'border-width': '0px', 'box-shadow': '0px 0px 2px 1px '+this.state.theme['send_receive_ether_overlay_shadow'],'margin': '0px 0px 0px 0px', 'overflow-y':'auto'}}>  
              <div>
                <EditContractorPage ref={this.edit_contractor_page} app_state={this.state} size={size} height={this.state.height} theme={this.state.theme} notify={this.prompt_top_notification.bind(this)} when_add_edit_object_to_stack={this.when_add_edit_object_to_stack.bind(this)}/>
              </div>
          </div>
      </SwipeableBottomSheet>
    )
  }

  open_edit_contractor_bottomsheet(){
    if(this.state != null){
      this.setState({edit_contractor_bottomsheet: !this.state.edit_contractor_bottomsheet});
    }
  }

  open_edit_contractor_object(target, object){
    this.open_edit_contractor_bottomsheet()
    if(this.edit_contractor_page.current){
      this.edit_contractor_page.current?.setState(object['ipfs'])
      this.edit_contractor_page.current?.setState({type:'edit-contractor'})
      this.edit_contractor_page.current?.setState({object_id: object['id']})
      this.edit_contractor_page.current?.set()
    }
  }










  render_edit_job_object_bottomsheet(){
    var background_color = this.state.theme['send_receive_ether_background_color'];
    var size = this.getScreenSize();
    return(
      <SwipeableBottomSheet  overflowHeight={0} marginTop={0} onChange={this.open_edit_job_bottomsheet.bind(this)} open={this.state.edit_job_bottomsheet} style={{'z-index':'5'}} bodyStyle={{'background-color': 'transparent'}} overlayStyle={{'background-color': this.state.theme['send_receive_ether_overlay_background'],'box-shadow': '0px 0px 0px 0px '+this.state.theme['send_receive_ether_overlay_shadow']}}>
          <div style={{ height: this.state.height-60, 'background-color': background_color, 'border-style': 'solid', 'border-color': this.state.theme['send_receive_ether_overlay_background'], 'border-radius': '1px 1px 0px 0px', 'border-width': '0px', 'box-shadow': '0px 0px 2px 1px '+this.state.theme['send_receive_ether_overlay_shadow'],'margin': '0px 0px 0px 0px', 'overflow-y':'auto'}}>  
              <div>
                <EditJobPage ref={this.edit_job_page} app_state={this.state} size={size} height={this.state.height} theme={this.state.theme} notify={this.prompt_top_notification.bind(this)} when_add_edit_object_to_stack={this.when_add_edit_object_to_stack.bind(this)}/>
              </div>
          </div>
      </SwipeableBottomSheet>
    )
  }

  open_edit_job_bottomsheet(){
    if(this.state != null){
      this.setState({edit_job_bottomsheet: !this.state.edit_job_bottomsheet});
    }
  }

  open_edit_job_object(target, object){
    this.open_edit_job_bottomsheet()
    if(this.edit_job_page.current){
      this.edit_job_page.current?.setState(object['ipfs'])
      this.edit_job_page.current?.setState({type:'edit-job'})
      this.edit_job_page.current?.setState({object_id: object['id']})
      this.edit_job_page.current?.set()
    }
  }










  render_edit_post_object_bottomsheet(){
    var background_color = this.state.theme['send_receive_ether_background_color'];
    var size = this.getScreenSize();
    return(
      <SwipeableBottomSheet  overflowHeight={0} marginTop={0} onChange={this.open_edit_post_bottomsheet.bind(this)} open={this.state.edit_post_bottomsheet} style={{'z-index':'5'}} bodyStyle={{'background-color': 'transparent'}} overlayStyle={{'background-color': this.state.theme['send_receive_ether_overlay_background'],'box-shadow': '0px 0px 0px 0px '+this.state.theme['send_receive_ether_overlay_shadow']}}>
          <div style={{ height: this.state.height-60, 'background-color': background_color, 'border-style': 'solid', 'border-color': this.state.theme['send_receive_ether_overlay_background'], 'border-radius': '1px 1px 0px 0px', 'border-width': '0px', 'box-shadow': '0px 0px 2px 1px '+this.state.theme['send_receive_ether_overlay_shadow'],'margin': '0px 0px 0px 0px', 'overflow-y':'auto'}}>  
              <div>
                <EditPostPage ref={this.edit_post_page} app_state={this.state} size={size} height={this.state.height} theme={this.state.theme} notify={this.prompt_top_notification.bind(this)} when_add_edit_object_to_stack={this.when_add_edit_object_to_stack.bind(this)}/>
              </div>
          </div>
      </SwipeableBottomSheet>
    )
  }

  open_edit_post_bottomsheet(){
    if(this.state != null){
      this.setState({edit_post_bottomsheet: !this.state.edit_post_bottomsheet});
    }
  }

  open_edit_post_object(target, object){
    this.open_edit_post_bottomsheet()
    if(this.edit_post_page.current){
      this.edit_post_page.current?.setState(object['ipfs'])
      this.edit_post_page.current?.setState({type:'edit-post'})
      this.edit_post_page.current?.setState({object_id: object['id']})
      this.edit_post_page.current?.set()
    }
  }










  render_edit_storefront_object_bottomsheet(){
    var background_color = this.state.theme['send_receive_ether_background_color'];
    var size = this.getScreenSize();
    return(
      <SwipeableBottomSheet  overflowHeight={0} marginTop={0} onChange={this.open_edit_storefront_bottomsheet.bind(this)} open={this.state.edit_storefront_bottomsheet} style={{'z-index':'5'}} bodyStyle={{'background-color': 'transparent'}} overlayStyle={{'background-color': this.state.theme['send_receive_ether_overlay_background'],'box-shadow': '0px 0px 0px 0px '+this.state.theme['send_receive_ether_overlay_shadow']}}>
          <div style={{ height: this.state.height-60, 'background-color': background_color, 'border-style': 'solid', 'border-color': this.state.theme['send_receive_ether_overlay_background'], 'border-radius': '1px 1px 0px 0px', 'border-width': '0px', 'box-shadow': '0px 0px 2px 1px '+this.state.theme['send_receive_ether_overlay_shadow'],'margin': '0px 0px 0px 0px', 'overflow-y':'auto'}}>  
              <div>
                <EditStorefrontItemPage ref={this.edit_storefront_page} app_state={this.state} size={size} height={this.state.height} theme={this.state.theme} notify={this.prompt_top_notification.bind(this)} when_add_edit_object_to_stack={this.when_add_edit_object_to_stack.bind(this)}/>
              </div>
          </div>
      </SwipeableBottomSheet>
    )
  }

  open_edit_storefront_bottomsheet(){
    if(this.state != null){
      this.setState({edit_storefront_bottomsheet: !this.state.edit_storefront_bottomsheet});
    }
  }

  open_edit_storefront_object(target, object){
    this.open_edit_storefront_bottomsheet()
    if(this.edit_storefront_page.current){
      this.edit_storefront_page.current?.setState(object['ipfs'])
      this.edit_storefront_page.current?.setState({type:'edit-storefront'})
      this.edit_storefront_page.current?.setState({object_id: object['id']})
      this.edit_storefront_page.current?.set()
    }
  }


















  open_edit_object(target, object){
    if(target == '0'){
      this.open_edit_job_object(target, object)
    }
    else if(target == '8'){
      this.open_edit_token_object(target, object)
    }
    else if(target == '6'){
      this.open_edit_post_object(target, object)
    }
    else if(target == '7'){
      this.open_edit_channel_object(target, object)
    }
    else if(target == '4'){
      this.open_edit_storefront_object(target, object)
    }
    else if(target == '9'){
      this.open_edit_contractor_object(target, object)
    }
  }


  when_add_edit_object_to_stack(state_obj){
    var stack_clone = this.state.stack_items.slice()
    var edit_id = -1
    for(var i=0; i<stack_clone.length; i++){
      if(stack_clone[i].id == state_obj.id){
        edit_id = i
      }
    }
    if(edit_id != -1){
      stack_clone[edit_id] = state_obj
    }else{
      stack_clone.push(state_obj)
    }
    this.setState({stack_items: stack_clone})
    this.set_cookies_after_stack_action(stack_clone)
  }












  render_mint_token_bottomsheet(){
    var background_color = this.state.theme['send_receive_ether_background_color'];
    var size = this.getScreenSize();
    return(
      <SwipeableBottomSheet  overflowHeight={0} marginTop={0} onChange={this.open_mint_token_bottomsheet.bind(this)} open={this.state.mint_token_bottomsheet} style={{'z-index':'5'}} bodyStyle={{'background-color': 'transparent'}} overlayStyle={{'background-color': this.state.theme['send_receive_ether_overlay_background'],'box-shadow': '0px 0px 0px 0px '+this.state.theme['send_receive_ether_overlay_shadow']}}>
          <div style={{ height: this.state.height-60, 'background-color': background_color, 'border-style': 'solid', 'border-color': this.state.theme['send_receive_ether_overlay_background'], 'border-radius': '1px 1px 0px 0px', 'border-width': '0px', 'box-shadow': '0px 0px 2px 1px '+this.state.theme['send_receive_ether_overlay_shadow'],'margin': '0px 0px 0px 0px', 'overflow-y':'auto'}}>  
            <NewMintActionPage ref={this.new_mint_dump_token_page} app_state={this.state} size={size} height={this.state.height} theme={this.state.theme} notify={this.prompt_top_notification.bind(this)} add_buy_sell_transaction_to_stack={this.add_buy_sell_transaction.bind(this)}get_balance_in_exchange={this.get_balance_in_exchange.bind(this)}/>
          </div>
      </SwipeableBottomSheet>
    )
  }


  open_mint_token_bottomsheet(){
    if(this.state != null){
        this.setState({mint_token_bottomsheet: !this.state.mint_token_bottomsheet});
      }
  }

  show_mint_token_bottomsheet(mint_burn_token_item){
    if(this.new_mint_dump_token_page.current != null){
      this.new_mint_dump_token_page.current.set_token(mint_burn_token_item)
    }

    this.open_mint_token_bottomsheet()
  }


  add_buy_sell_transaction(state_obj){
    var stack_clone = this.state.stack_items.slice()
    var edit_id = -1
    for(var i=0; i<stack_clone.length; i++){
      if(stack_clone[i].id == state_obj.id){
        edit_id = i
      }
    }
    if(edit_id != -1){
      stack_clone[edit_id] = state_obj
    }else{
      stack_clone.push(state_obj)
    }
    this.setState({stack_items: stack_clone})
    this.set_cookies_after_stack_action(stack_clone)
  }







  render_transfer_token_bottomsheet(){
    var background_color = this.state.theme['send_receive_ether_background_color'];
    var size = this.getScreenSize();
    return(
      <SwipeableBottomSheet  overflowHeight={0} marginTop={0} onChange={this.open_transfer_token_bottomsheet.bind(this)} open={this.state.transfer_token_bottomsheet} style={{'z-index':'5'}} bodyStyle={{'background-color': 'transparent'}} overlayStyle={{'background-color': this.state.theme['send_receive_ether_overlay_background'],'box-shadow': '0px 0px 0px 0px '+this.state.theme['send_receive_ether_overlay_shadow']}}>
          <div style={{ height: this.state.height-60, 'background-color': background_color, 'border-style': 'solid', 'border-color': this.state.theme['send_receive_ether_overlay_background'], 'border-radius': '1px 1px 0px 0px', 'border-width': '0px', 'box-shadow': '0px 0px 2px 1px '+this.state.theme['send_receive_ether_overlay_shadow'],'margin': '0px 0px 0px 0px', 'overflow-y':'auto'}}>  
            <NewTransferActionPage ref={this.new_transfer_token_page} app_state={this.state} size={size} height={this.state.height} theme={this.state.theme} notify={this.prompt_top_notification.bind(this)} add_transfer_transactions_to_stack={this.add_transfer_transactions_to_stack.bind(this)}/>
          </div>
      </SwipeableBottomSheet>
    )
  }


  open_transfer_token_bottomsheet(){
    if(this.state != null){
        this.setState({transfer_token_bottomsheet: !this.state.transfer_token_bottomsheet});
      }
  }

  show_transfer_bottomsheet(token_item){
    if(this.new_transfer_token_page.current != null){
      this.new_transfer_token_page.current.set_token(token_item)
    }

    this.open_transfer_token_bottomsheet()
  }

  add_transfer_transactions_to_stack(state_obj){
    var stack_clone = this.state.stack_items.slice()
    var edit_id = -1
    for(var i=0; i<stack_clone.length; i++){
      if(stack_clone[i].id == state_obj.id){
        edit_id = i
      }
    }
    if(edit_id != -1){
      stack_clone[edit_id] = state_obj
    }else{
      stack_clone.push(state_obj)
    }
    this.setState({stack_items: stack_clone})
    this.set_cookies_after_stack_action(stack_clone)
  }







  render_enter_contract_bottomsheet(){
    var background_color = this.state.theme['send_receive_ether_background_color'];
    var size = this.getScreenSize();
    return(
      <SwipeableBottomSheet  overflowHeight={0} marginTop={0} onChange={this.open_enter_contract_bottomsheet.bind(this)} open={this.state.enter_contract_bottomsheet} style={{'z-index':'5'}} bodyStyle={{'background-color': 'transparent'}} overlayStyle={{'background-color': this.state.theme['send_receive_ether_overlay_background'],'box-shadow': '0px 0px 0px 0px '+this.state.theme['send_receive_ether_overlay_shadow']}}>
          <div style={{ height: this.state.height-60, 'background-color': background_color, 'border-style': 'solid', 'border-color': this.state.theme['send_receive_ether_overlay_background'], 'border-radius': '1px 1px 0px 0px', 'border-width': '0px', 'box-shadow': '0px 0px 2px 1px '+this.state.theme['send_receive_ether_overlay_shadow'],'margin': '0px 0px 0px 0px', 'overflow-y':'auto'}}>  
            <EnterContractPage ref={this.enter_contract_page} app_state={this.state} size={size} height={this.state.height} theme={this.state.theme} notify={this.prompt_top_notification.bind(this)} enter_contract={this.enter_contract.bind(this)}/>
          </div>
      </SwipeableBottomSheet>
    )
  }

  open_enter_contract_bottomsheet(){
    if(this.state != null){
        this.setState({enter_contract_bottomsheet: !this.state.enter_contract_bottomsheet});
      }
  }

  show_enter_contract_bottomsheet(contract_item){
    if(this.enter_contract_page.current != null){
      this.enter_contract_page.current.set_contract(contract_item)
    }

    this.open_enter_contract_bottomsheet()
  }

  enter_contract(state_obj){
    var stack_clone = this.state.stack_items.slice()
    var edit_id = -1
    for(var i=0; i<stack_clone.length; i++){
      if(stack_clone[i].id == state_obj.id){
        edit_id = i
      }
    }
    if(edit_id != -1){
      stack_clone[edit_id] = state_obj
    }else{
      stack_clone.push(state_obj)
    }
    this.setState({stack_items: stack_clone})
    this.set_cookies_after_stack_action(stack_clone)
  }








  render_extend_contract_bottomsheet(){
    var background_color = this.state.theme['send_receive_ether_background_color'];
    var size = this.getScreenSize();
    return(
      <SwipeableBottomSheet  overflowHeight={0} marginTop={0} onChange={this.open_extend_contract_bottomsheet.bind(this)} open={this.state.extend_contract_bottomsheet} style={{'z-index':'5'}} bodyStyle={{'background-color': 'transparent'}} overlayStyle={{'background-color': this.state.theme['send_receive_ether_overlay_background'],'box-shadow': '0px 0px 0px 0px '+this.state.theme['send_receive_ether_overlay_shadow']}}>
          <div style={{ height: this.state.height-60, 'background-color': background_color, 'border-style': 'solid', 'border-color': this.state.theme['send_receive_ether_overlay_background'], 'border-radius': '1px 1px 0px 0px', 'border-width': '0px', 'box-shadow': '0px 0px 2px 1px '+this.state.theme['send_receive_ether_overlay_shadow'],'margin': '0px 0px 0px 0px', 'overflow-y':'auto'}}>  
            <ExtendContractPage ref={this.extend_contract_page} app_state={this.state} size={size} height={this.state.height} theme={this.state.theme} notify={this.prompt_top_notification.bind(this)} extend_contract={this.extend_contract.bind(this)}/>
          </div>
      </SwipeableBottomSheet>
    )
  }

  open_extend_contract_bottomsheet(){
    if(this.state != null){
        this.setState({extend_contract_bottomsheet: !this.state.extend_contract_bottomsheet});
      }
  }

  show_extend_contract_bottomsheet(contract_item){
    if(this.extend_contract_page.current != null){
      this.extend_contract_page.current.set_contract(contract_item)
    }

    this.open_extend_contract_bottomsheet()
  }

  extend_contract(state_obj){
    var stack_clone = this.state.stack_items.slice()
    var edit_id = -1
    for(var i=0; i<stack_clone.length; i++){
      if(stack_clone[i].id == state_obj.id){
        edit_id = i
      }
    }
    if(edit_id != -1){
      stack_clone[edit_id] = state_obj
    }else{
      stack_clone.push(state_obj)
    }
    this.setState({stack_items: stack_clone})
    this.set_cookies_after_stack_action(stack_clone)
  }




  render_exit_contract_bottomsheet(){
    var background_color = this.state.theme['send_receive_ether_background_color'];
    var size = this.getScreenSize();
    return(
      <SwipeableBottomSheet  overflowHeight={0} marginTop={0} onChange={this.open_exit_contract_bottomsheet.bind(this)} open={this.state.exit_contract_bottomsheet} style={{'z-index':'5'}} bodyStyle={{'background-color': 'transparent'}} overlayStyle={{'background-color': this.state.theme['send_receive_ether_overlay_background'],'box-shadow': '0px 0px 0px 0px '+this.state.theme['send_receive_ether_overlay_shadow']}}>
          <div style={{ height: this.state.height-60, 'background-color': background_color, 'border-style': 'solid', 'border-color': this.state.theme['send_receive_ether_overlay_background'], 'border-radius': '1px 1px 0px 0px', 'border-width': '0px', 'box-shadow': '0px 0px 2px 1px '+this.state.theme['send_receive_ether_overlay_shadow'],'margin': '0px 0px 0px 0px', 'overflow-y':'auto'}}>  
            <ExitContractPage ref={this.exit_contract_page} app_state={this.state} size={size} height={this.state.height} theme={this.state.theme} notify={this.prompt_top_notification.bind(this)} exit_contract={this.exit_contract.bind(this)}/>
          </div>
      </SwipeableBottomSheet>
    )
  }

  open_exit_contract_bottomsheet(){
    if(this.state != null){
        this.setState({exit_contract_bottomsheet: !this.state.exit_contract_bottomsheet});
      }
  }

  show_exit_contract_bottomsheet(contract_item){
    if(this.exit_contract_page.current != null){
      this.exit_contract_page.current.set_contract(contract_item)
    }

    this.open_exit_contract_bottomsheet()
  }

  exit_contract(state){
    var stack_clone = this.state.stack_items.slice()
    stack_clone.push(state)
    this.setState({stack_items: stack_clone})
    this.set_cookies_after_stack_action(stack_clone)
  }





  //new proposal
  render_new_proposal_bottomsheet(){
    var background_color = this.state.theme['send_receive_ether_background_color'];
    var size = this.getScreenSize();
    return(
      <SwipeableBottomSheet  overflowHeight={0} marginTop={0} onChange={this.open_new_proposal_bottomsheet.bind(this)} open={this.state.new_proposal_bottomsheet} style={{'z-index':'5'}} bodyStyle={{'background-color': 'transparent'}} overlayStyle={{'background-color': this.state.theme['send_receive_ether_overlay_background'],'box-shadow': '0px 0px 0px 0px '+this.state.theme['send_receive_ether_overlay_shadow']}}>
          <div style={{ height: this.state.height-60, 'background-color': background_color, 'border-style': 'solid', 'border-color': this.state.theme['send_receive_ether_overlay_background'], 'border-radius': '1px 1px 0px 0px', 'border-width': '0px', 'box-shadow': '0px 0px 2px 1px '+this.state.theme['send_receive_ether_overlay_shadow'],'margin': '0px 0px 0px 0px', 'overflow-y':'auto'}}>  
            <NewProposalPage ref={this.new_proposal_page} app_state={this.state} size={size} height={this.state.height} theme={this.state.theme} notify={this.prompt_top_notification.bind(this)} when_add_new_proposal_to_stack={this.when_add_new_proposal_to_stack.bind(this)} load_modify_item_data={this.load_modify_item_data.bind(this)}/>
          </div>
      </SwipeableBottomSheet>
    )
  }

  open_new_proposal_bottomsheet(){
    if(this.state != null){
        this.setState({new_proposal_bottomsheet: !this.state.new_proposal_bottomsheet});
      }
  }

  show_new_proposal_bottomsheet(contract_item){
    if(this.new_proposal_page.current != null){
      this.new_proposal_page.current.reset_state()
      this.new_proposal_page.current.set_contract(contract_item)
    }

    this.open_new_proposal_bottomsheet()
  }

  when_add_new_proposal_to_stack(state_obj){
    var stack_clone = this.state.stack_items.slice()      
    var edit_id = -1
    for(var i=0; i<stack_clone.length; i++){
      if(stack_clone[i].id == state_obj.id){
        edit_id = i
      }
    }
    if(edit_id != -1){
      stack_clone[edit_id] = state_obj
    }else{
      stack_clone.push(state_obj)
    }
    this.setState({stack_items: stack_clone})
    this.set_cookies_after_stack_action(stack_clone)
  }







  render_vote_proposal_bottomsheet(){
    var background_color = this.state.theme['send_receive_ether_background_color'];
    var size = this.getScreenSize();
    return(
      <SwipeableBottomSheet  overflowHeight={0} marginTop={0} onChange={this.open_vote_proposal_bottomsheet.bind(this)} open={this.state.vote_proposal_bottomsheet} style={{'z-index':'5'}} bodyStyle={{'background-color': 'transparent'}} overlayStyle={{'background-color': this.state.theme['send_receive_ether_overlay_background'],'box-shadow': '0px 0px 0px 0px '+this.state.theme['send_receive_ether_overlay_shadow']}}>
          <div style={{ height: this.state.height-60, 'background-color': background_color, 'border-style': 'solid', 'border-color': this.state.theme['send_receive_ether_overlay_background'], 'border-radius': '1px 1px 0px 0px', 'border-width': '0px', 'box-shadow': '0px 0px 2px 1px '+this.state.theme['send_receive_ether_overlay_shadow'],'margin': '0px 0px 0px 0px', 'overflow-y':'auto'}}>  
            <VoteProposalPage ref={this.vote_proposal_page} app_state={this.state} size={size} height={this.state.height} theme={this.state.theme} notify={this.prompt_top_notification.bind(this)} add_vote_proposal_action_to_stack={this.add_vote_proposal_action_to_stack.bind(this)} />
          </div>
      </SwipeableBottomSheet>
    )
  }

  open_vote_proposal_bottomsheet(){
    if(this.state != null){
        this.setState({vote_proposal_bottomsheet: !this.state.vote_proposal_bottomsheet});
      }
  }


  show_vote_proposal_bottomsheet(proposal_item){
    if(this.vote_proposal_page.current != null){
      this.vote_proposal_page.current.set_proposal(proposal_item)
    }

    this.open_vote_proposal_bottomsheet()
  }


  add_vote_proposal_action_to_stack(state_obj){
    var stack_clone = this.state.stack_items.slice()      
    var edit_id = -1
    for(var i=0; i<stack_clone.length; i++){
      if(stack_clone[i].id == state_obj.id){
        edit_id = i
      }
    }
    if(edit_id != -1){
      stack_clone[edit_id] = state_obj
    }else{
      stack_clone.push(state_obj)
    }
    this.setState({stack_items: stack_clone})
    this.set_cookies_after_stack_action(stack_clone)
  }





  render_submit_proposal_bottomsheet(){
    var background_color = this.state.theme['send_receive_ether_background_color'];
    var size = this.getScreenSize();
    return(
      <SwipeableBottomSheet  overflowHeight={0} marginTop={0} onChange={this.open_submit_proposal_bottomsheet.bind(this)} open={this.state.submit_proposal_bottomsheet} style={{'z-index':'5'}} bodyStyle={{'background-color': 'transparent'}} overlayStyle={{'background-color': this.state.theme['send_receive_ether_overlay_background'],'box-shadow': '0px 0px 0px 0px '+this.state.theme['send_receive_ether_overlay_shadow']}}>
          <div style={{ height: this.state.height-60, 'background-color': background_color, 'border-style': 'solid', 'border-color': this.state.theme['send_receive_ether_overlay_background'], 'border-radius': '1px 1px 0px 0px', 'border-width': '0px', 'box-shadow': '0px 0px 2px 1px '+this.state.theme['send_receive_ether_overlay_shadow'],'margin': '0px 0px 0px 0px', 'overflow-y':'auto'}}>  
            <SubmitProposalPage ref={this.submit_proposal_page} app_state={this.state} size={size} height={this.state.height} theme={this.state.theme} notify={this.prompt_top_notification.bind(this)} add_submit_proposal_action_to_stack={this.add_submit_proposal_action_to_stack.bind(this)}/>
          </div>
      </SwipeableBottomSheet>
    )
  }

  open_submit_proposal_bottomsheet(){
    if(this.state != null){
        this.setState({submit_proposal_bottomsheet: !this.state.submit_proposal_bottomsheet});
      }
  }

  show_submit_proposal_bottomsheet(proposal_item){
    if(this.submit_proposal_page.current != null){
      this.submit_proposal_page.current.set_proposal(proposal_item)
    }

    this.open_submit_proposal_bottomsheet()
  }


  add_submit_proposal_action_to_stack(state_obj){
    var stack_clone = this.state.stack_items.slice()      
    stack_clone.push(state_obj)
    this.setState({stack_items: stack_clone})
    this.set_cookies_after_stack_action(stack_clone)
  }














  render_pay_subscription_bottomsheet(){
    var background_color = this.state.theme['send_receive_ether_background_color'];
    var size = this.getScreenSize();
    return(
      <SwipeableBottomSheet  overflowHeight={0} marginTop={0} onChange={this.open_pay_subscription_bottomsheet.bind(this)} open={this.state.pay_subscription_bottomsheet} style={{'z-index':'5'}} bodyStyle={{'background-color': 'transparent'}} overlayStyle={{'background-color': this.state.theme['send_receive_ether_overlay_background'],'box-shadow': '0px 0px 0px 0px '+this.state.theme['send_receive_ether_overlay_shadow']}}>
          <div style={{ height: this.state.height-60, 'background-color': background_color, 'border-style': 'solid', 'border-color': this.state.theme['send_receive_ether_overlay_background'], 'border-radius': '1px 1px 0px 0px', 'border-width': '0px', 'box-shadow': '0px 0px 2px 1px '+this.state.theme['send_receive_ether_overlay_shadow'],'margin': '0px 0px 0px 0px', 'overflow-y':'auto'}}>  
            <PaySubscriptionPage ref={this.pay_subscription_page} app_state={this.state} size={size} height={this.state.height} theme={this.state.theme} notify={this.prompt_top_notification.bind(this)} add_pay_subscription_to_stack={this.add_pay_subscription_to_stack.bind(this)}/>
          </div>
      </SwipeableBottomSheet>
    )
  }

  open_pay_subscription_bottomsheet(){
    if(this.state != null){
        this.setState({pay_subscription_bottomsheet: !this.state.pay_subscription_bottomsheet});
      }
  }

  show_pay_subscription_bottomsheet(subscription_item){
    if(this.pay_subscription_page.current != null){
      this.pay_subscription_page.current.set_subscription(subscription_item)
    }

    this.open_pay_subscription_bottomsheet()
  }

  add_pay_subscription_to_stack(state_obj){
    var stack_clone = this.state.stack_items.slice()      
    var edit_id = -1
    for(var i=0; i<stack_clone.length; i++){
      if(stack_clone[i].id == state_obj.id){
        edit_id = i
      }
    }
    if(edit_id != -1){
      stack_clone[edit_id] = state_obj
    }else{
      stack_clone.push(state_obj)
    }
    this.setState({stack_items: stack_clone})
    this.set_cookies_after_stack_action(stack_clone)
  }









  render_cancel_subscription_bottomsheet(){
    var background_color = this.state.theme['send_receive_ether_background_color'];
    var size = this.getScreenSize();
    return(
      <SwipeableBottomSheet  overflowHeight={0} marginTop={0} onChange={this.open_cancel_subscription_bottomsheet.bind(this)} open={this.state.cancel_subscription_bottomsheet} style={{'z-index':'5'}} bodyStyle={{'background-color': 'transparent'}} overlayStyle={{'background-color': this.state.theme['send_receive_ether_overlay_background'],'box-shadow': '0px 0px 0px 0px '+this.state.theme['send_receive_ether_overlay_shadow']}}>
          <div style={{ height: this.state.height-60, 'background-color': background_color, 'border-style': 'solid', 'border-color': this.state.theme['send_receive_ether_overlay_background'], 'border-radius': '1px 1px 0px 0px', 'border-width': '0px', 'box-shadow': '0px 0px 2px 1px '+this.state.theme['send_receive_ether_overlay_shadow'],'margin': '0px 0px 0px 0px', 'overflow-y':'auto'}}>  
            <CancelSubscriptionPage ref={this.cancel_subscription_page} app_state={this.state} size={size} height={this.state.height} theme={this.state.theme} notify={this.prompt_top_notification.bind(this)} add_cancel_subscription_to_stack={this.add_cancel_subscription_to_stack.bind(this)}/>
          </div>
      </SwipeableBottomSheet>
    )
  }

  open_cancel_subscription_bottomsheet(){
    if(this.state != null){
        this.setState({cancel_subscription_bottomsheet: !this.state.cancel_subscription_bottomsheet});
      }
  }

  show_cancel_subscription_bottomsheet(subscription_item){
    if(this.cancel_subscription_page.current != null){
      this.cancel_subscription_page.current.set_subscription(subscription_item)
    }

    this.open_cancel_subscription_bottomsheet()
  }

  add_cancel_subscription_to_stack(state_obj){
    var stack_clone = this.state.stack_items.slice()      
    var edit_id = -1
    for(var i=0; i<stack_clone.length; i++){
      if(stack_clone[i].id == state_obj.id){
        edit_id = i
      }
    }
    if(edit_id != -1){
      stack_clone[edit_id] = state_obj
    }else{
      stack_clone.push(state_obj)
    }
    this.setState({stack_items: stack_clone})
    this.set_cookies_after_stack_action(stack_clone)
  }












  render_collect_subscription_bottomsheet(){
    var background_color = this.state.theme['send_receive_ether_background_color'];
    var size = this.getScreenSize();
    return(
      <SwipeableBottomSheet  overflowHeight={0} marginTop={0} onChange={this.open_collect_subscription_bottomsheet.bind(this)} open={this.state.collect_subscription_bottomsheet} style={{'z-index':'5'}} bodyStyle={{'background-color': 'transparent'}} overlayStyle={{'background-color': this.state.theme['send_receive_ether_overlay_background'],'box-shadow': '0px 0px 0px 0px '+this.state.theme['send_receive_ether_overlay_shadow']}}>
          <div style={{ height: this.state.height-60, 'background-color': background_color, 'border-style': 'solid', 'border-color': this.state.theme['send_receive_ether_overlay_background'], 'border-radius': '1px 1px 0px 0px', 'border-width': '0px', 'box-shadow': '0px 0px 2px 1px '+this.state.theme['send_receive_ether_overlay_shadow'],'margin': '0px 0px 0px 0px', 'overflow-y':'auto'}}>  
            <CollectSubscriptionPage ref={this.collect_subscription_page} app_state={this.state} size={size} height={this.state.height} theme={this.state.theme} notify={this.prompt_top_notification.bind(this)} add_collect_subscription_to_stack={this.add_collect_subscription_to_stack.bind(this)}/>
          </div>
      </SwipeableBottomSheet>
    )
  }

  open_collect_subscription_bottomsheet(){
    if(this.state != null){
        this.setState({collect_subscription_bottomsheet: !this.state.collect_subscription_bottomsheet});
      }
  }

  show_collect_subscription_bottomsheet(subscription_item){
    if(this.collect_subscription_page.current != null){
      this.collect_subscription_page.current.set_subscription(subscription_item)
    }

    this.open_collect_subscription_bottomsheet()
  }

  add_collect_subscription_to_stack(state_obj){
    var stack_clone = this.state.stack_items.slice()      
    var edit_id = -1
    for(var i=0; i<stack_clone.length; i++){
      if(stack_clone[i].id == state_obj.id){
        edit_id = i
      }
    }
    if(edit_id != -1){
      stack_clone[edit_id] = state_obj
    }else{
      stack_clone.push(state_obj)
    }
    this.setState({stack_items: stack_clone})
    this.set_cookies_after_stack_action(stack_clone)
  }











  render_modify_subscription_bottomsheet(){
    var background_color = this.state.theme['send_receive_ether_background_color'];
    var size = this.getScreenSize();
    return(
      <SwipeableBottomSheet  overflowHeight={0} marginTop={0} onChange={this.open_modify_subscription_bottomsheet.bind(this)} open={this.state.modify_subscription_bottomsheet} style={{'z-index':'5'}} bodyStyle={{'background-color': 'transparent'}} overlayStyle={{'background-color': this.state.theme['send_receive_ether_overlay_background'],'box-shadow': '0px 0px 0px 0px '+this.state.theme['send_receive_ether_overlay_shadow']}}>
          <div style={{ height: this.state.height-60, 'background-color': background_color, 'border-style': 'solid', 'border-color': this.state.theme['send_receive_ether_overlay_background'], 'border-radius': '1px 1px 0px 0px', 'border-width': '0px', 'box-shadow': '0px 0px 2px 1px '+this.state.theme['send_receive_ether_overlay_shadow'],'margin': '0px 0px 0px 0px', 'overflow-y':'auto'}}>  
            <ModifySubscriptionPage ref={this.modify_subscription_page} app_state={this.state} size={size} height={this.state.height} theme={this.state.theme} notify={this.prompt_top_notification.bind(this)} add_modify_subscription_to_stack={this.add_modify_subscription_to_stack.bind(this)}/>
          </div>
      </SwipeableBottomSheet>
    )
  }

  open_modify_subscription_bottomsheet(){
    if(this.state != null){
        this.setState({modify_subscription_bottomsheet: !this.state.modify_subscription_bottomsheet});
      }
  }

  show_modify_subscription_bottomsheet(subscription_item){
    if(this.modify_subscription_page.current != null){
      this.modify_subscription_page.current.set_subscription(subscription_item)
    }

    this.open_modify_subscription_bottomsheet()
  }

  add_modify_subscription_to_stack(state_obj){
    var stack_clone = this.state.stack_items.slice()      
    var edit_id = -1
    for(var i=0; i<stack_clone.length; i++){
      if(stack_clone[i].id == state_obj.id){
        edit_id = i
      }
    }
    if(edit_id != -1){
      stack_clone[edit_id] = state_obj
    }else{
      stack_clone.push(state_obj)
    }
    this.setState({stack_items: stack_clone})
    this.set_cookies_after_stack_action(stack_clone)
  }










  render_modify_contract_bottomsheet(){
    var background_color = this.state.theme['send_receive_ether_background_color'];
    var size = this.getScreenSize();
    return(
      <SwipeableBottomSheet  overflowHeight={0} marginTop={0} onChange={this.open_modify_contract_bottomsheet.bind(this)} open={this.state.modify_contract_bottomsheet} style={{'z-index':'5'}} bodyStyle={{'background-color': 'transparent'}} overlayStyle={{'background-color': this.state.theme['send_receive_ether_overlay_background'],'box-shadow': '0px 0px 0px 0px '+this.state.theme['send_receive_ether_overlay_shadow']}}>
          <div style={{ height: this.state.height-60, 'background-color': background_color, 'border-style': 'solid', 'border-color': this.state.theme['send_receive_ether_overlay_background'], 'border-radius': '1px 1px 0px 0px', 'border-width': '0px', 'box-shadow': '0px 0px 2px 1px '+this.state.theme['send_receive_ether_overlay_shadow'],'margin': '0px 0px 0px 0px', 'overflow-y':'auto'}}>  
            <ModifyContractPage ref={this.modify_contract_page} app_state={this.state} size={size} height={this.state.height} theme={this.state.theme} notify={this.prompt_top_notification.bind(this)} add_modify_contract_to_stack={this.add_modify_contract_to_stack.bind(this)}/>
          </div>
      </SwipeableBottomSheet>
    )
  }

  open_modify_contract_bottomsheet(){
    if(this.state != null){
        this.setState({modify_contract_bottomsheet: !this.state.modify_contract_bottomsheet});
      }
  }

  show_modify_contract_bottomsheet(contract_item){
    if(this.modify_contract_page.current != null){
      this.modify_contract_page.current.set_contract(contract_item)
    }

    this.open_modify_contract_bottomsheet()
  }

  add_modify_contract_to_stack(state_obj){
    var stack_clone = this.state.stack_items.slice()      
    var edit_id = -1
    for(var i=0; i<stack_clone.length; i++){
      if(stack_clone[i].id == state_obj.id){
        edit_id = i
      }
    }
    if(edit_id != -1){
      stack_clone[edit_id] = state_obj
    }else{
      stack_clone.push(state_obj)
    }
    this.setState({stack_items: stack_clone})
    this.set_cookies_after_stack_action(stack_clone)
  }










  render_modify_token_bottomsheet(){
    var background_color = this.state.theme['send_receive_ether_background_color'];
    var size = this.getScreenSize();
    return(
      <SwipeableBottomSheet  overflowHeight={0} marginTop={0} onChange={this.open_modify_token_bottomsheet.bind(this)} open={this.state.modify_token_bottomsheet} style={{'z-index':'5'}} bodyStyle={{'background-color': 'transparent'}} overlayStyle={{'background-color': this.state.theme['send_receive_ether_overlay_background'],'box-shadow': '0px 0px 0px 0px '+this.state.theme['send_receive_ether_overlay_shadow']}}>
          <div style={{ height: this.state.height-60, 'background-color': background_color, 'border-style': 'solid', 'border-color': this.state.theme['send_receive_ether_overlay_background'], 'border-radius': '1px 1px 0px 0px', 'border-width': '0px', 'box-shadow': '0px 0px 2px 1px '+this.state.theme['send_receive_ether_overlay_shadow'],'margin': '0px 0px 0px 0px', 'overflow-y':'auto'}}>  
            <ModifyTokenPage ref={this.modify_token_page} app_state={this.state} size={size} height={this.state.height} theme={this.state.theme} notify={this.prompt_top_notification.bind(this)} add_modify_token_to_stack={this.add_modify_token_to_stack.bind(this)}/>
          </div>
      </SwipeableBottomSheet>
    )
  }

  open_modify_token_bottomsheet(){
    if(this.state != null){
        this.setState({modify_token_bottomsheet: !this.state.modify_token_bottomsheet});
      }
  }

  show_modify_token_bottomsheet(token_item){
    if(this.modify_token_page.current != null){
      this.modify_token_page.current.set_token(token_item)
    }

    this.open_modify_token_bottomsheet()
  }

  add_modify_token_to_stack(state_obj){
    var stack_clone = this.state.stack_items.slice()      
    var edit_id = -1
    for(var i=0; i<stack_clone.length; i++){
      if(stack_clone[i].id == state_obj.id){
        edit_id = i
      }
    }
    if(edit_id != -1){
      stack_clone[edit_id] = state_obj
    }else{
      stack_clone.push(state_obj)
    }
    this.setState({stack_items: stack_clone})
    this.set_cookies_after_stack_action(stack_clone)
  }









  render_exchange_transfer_bottomsheet(){
    var background_color = this.state.theme['send_receive_ether_background_color'];
    var size = this.getScreenSize();
    return(
      <SwipeableBottomSheet  overflowHeight={0} marginTop={0} onChange={this.open_exchange_transfer_bottomsheet.bind(this)} open={this.state.exchange_transfer_bottomsheet} style={{'z-index':'5'}} bodyStyle={{'background-color': 'transparent'}} overlayStyle={{'background-color': this.state.theme['send_receive_ether_overlay_background'],'box-shadow': '0px 0px 0px 0px '+this.state.theme['send_receive_ether_overlay_shadow']}}>
          <div style={{ height: this.state.height-60, 'background-color': background_color, 'border-style': 'solid', 'border-color': this.state.theme['send_receive_ether_overlay_background'], 'border-radius': '1px 1px 0px 0px', 'border-width': '0px', 'box-shadow': '0px 0px 2px 1px '+this.state.theme['send_receive_ether_overlay_shadow'],'margin': '0px 0px 0px 0px', 'overflow-y':'auto'}}>  
            <ExchangeTransferPage ref={this.exchange_transfer_page} app_state={this.state} size={size} height={this.state.height} theme={this.state.theme} notify={this.prompt_top_notification.bind(this)} add_exchange_transfer_to_stack={this.add_exchange_transfer_to_stack.bind(this)}/>
          </div>
      </SwipeableBottomSheet>
    )
  }

  open_exchange_transfer_bottomsheet(){
    if(this.state != null){
        this.setState({exchange_transfer_bottomsheet: !this.state.exchange_transfer_bottomsheet});
      }
  }

  show_exchange_transfer_bottomsheet(token_item){
    if(this.exchange_transfer_page.current != null){
      this.exchange_transfer_page.current.set_token(token_item)
    }

    this.open_exchange_transfer_bottomsheet()
  }

  add_exchange_transfer_to_stack(state_obj){
    var stack_clone = this.state.stack_items.slice()      
    var edit_id = -1
    for(var i=0; i<stack_clone.length; i++){
      if(stack_clone[i].id == state_obj.id){
        edit_id = i
      }
    }
    if(edit_id != -1){
      stack_clone[edit_id] = state_obj
    }else{
      stack_clone.push(state_obj)
    }
    this.setState({stack_items: stack_clone})
    this.set_cookies_after_stack_action(stack_clone)
  }






  render_force_exit_bottomsheet(){
    var background_color = this.state.theme['send_receive_ether_background_color'];
    var size = this.getScreenSize();
    return(
      <SwipeableBottomSheet  overflowHeight={0} marginTop={0} onChange={this.open_force_exit_bottomsheet.bind(this)} open={this.state.force_exit_bottomsheet} style={{'z-index':'5'}} bodyStyle={{'background-color': 'transparent'}} overlayStyle={{'background-color': this.state.theme['send_receive_ether_overlay_background'],'box-shadow': '0px 0px 0px 0px '+this.state.theme['send_receive_ether_overlay_shadow']}}>
          <div style={{ height: this.state.height-60, 'background-color': background_color, 'border-style': 'solid', 'border-color': this.state.theme['send_receive_ether_overlay_background'], 'border-radius': '1px 1px 0px 0px', 'border-width': '0px', 'box-shadow': '0px 0px 2px 1px '+this.state.theme['send_receive_ether_overlay_shadow'],'margin': '0px 0px 0px 0px', 'overflow-y':'auto'}}>  
            <ForceExitPage ref={this.force_exit_page} app_state={this.state} size={size} height={this.state.height} theme={this.state.theme} notify={this.prompt_top_notification.bind(this)} add_force_exit_to_stack={this.add_force_exit_to_stack.bind(this)}/>
          </div>
      </SwipeableBottomSheet>
    )
  }

  open_force_exit_bottomsheet(){
    if(this.state != null){
        this.setState({force_exit_bottomsheet: !this.state.force_exit_bottomsheet});
      }
  }

  show_force_exit_bottomsheet(contract_item){
    if(this.force_exit_page.current != null){
      this.force_exit_page.current.set_contract(contract_item)
    }

    this.open_force_exit_bottomsheet()
  }

  add_force_exit_to_stack(state_obj){
    var stack_clone = this.state.stack_items.slice()      
    var edit_id = -1
    for(var i=0; i<stack_clone.length; i++){
      if(stack_clone[i].id == state_obj.id){
        edit_id = i
      }
    }
    if(edit_id != -1){
      stack_clone[edit_id] = state_obj
    }else{
      stack_clone.push(state_obj)
    }
    this.setState({stack_items: stack_clone})
    this.set_cookies_after_stack_action(stack_clone)
  }










  render_archive_proposal_bottomsheet(){
    var background_color = this.state.theme['send_receive_ether_background_color'];
    var size = this.getScreenSize();
    return(
      <SwipeableBottomSheet  overflowHeight={0} marginTop={0} onChange={this.open_archive_proposal_bottomsheet.bind(this)} open={this.state.archive_proposal_bottomsheet} style={{'z-index':'5'}} bodyStyle={{'background-color': 'transparent'}} overlayStyle={{'background-color': this.state.theme['send_receive_ether_overlay_background'],'box-shadow': '0px 0px 0px 0px '+this.state.theme['send_receive_ether_overlay_shadow']}}>
          <div style={{ height: this.state.height-60, 'background-color': background_color, 'border-style': 'solid', 'border-color': this.state.theme['send_receive_ether_overlay_background'], 'border-radius': '1px 1px 0px 0px', 'border-width': '0px', 'box-shadow': '0px 0px 2px 1px '+this.state.theme['send_receive_ether_overlay_shadow'],'margin': '0px 0px 0px 0px', 'overflow-y':'auto'}}>  
            <ArchiveProposalPage ref={this.archive_proposal_page} app_state={this.state} size={size} height={this.state.height} theme={this.state.theme} notify={this.prompt_top_notification.bind(this)} add_archive_proposal_action_to_stack={this.add_archive_proposal_action_to_stack.bind(this)}/>
          </div>
      </SwipeableBottomSheet>
    )
  }

  open_archive_proposal_bottomsheet(){
    if(this.state != null){
        this.setState({archive_proposal_bottomsheet: !this.state.archive_proposal_bottomsheet});
      }
  }

  show_archive_proposal_bottomsheet(proposal_item){
    if(this.archive_proposal_page.current != null){
      this.archive_proposal_page.current.set_object(proposal_item)
    }

    this.open_archive_proposal_bottomsheet()
  }


  add_archive_proposal_action_to_stack(state_obj){
    var stack_clone = this.state.stack_items.slice()      
    var edit_id = -1
    for(var i=0; i<stack_clone.length; i++){
      if(stack_clone[i].id == state_obj.id){
        edit_id = i
      }
    }
    if(edit_id != -1){
      stack_clone[edit_id] = state_obj
    }else{
      stack_clone.push(state_obj)
    }
    this.setState({stack_items: stack_clone})
    this.set_cookies_after_stack_action(stack_clone)
  }







  render_freeze_unfreeze_bottomsheet(){
    var background_color = this.state.theme['send_receive_ether_background_color'];
    var size = this.getScreenSize();
    return(
      <SwipeableBottomSheet  overflowHeight={0} marginTop={0} onChange={this.open_freeze_unfreeze_bottomsheet.bind(this)} open={this.state.freeze_unfreeze_bottomsheet} style={{'z-index':'5'}} bodyStyle={{'background-color': 'transparent'}} overlayStyle={{'background-color': this.state.theme['send_receive_ether_overlay_background'],'box-shadow': '0px 0px 0px 0px '+this.state.theme['send_receive_ether_overlay_shadow']}}>
          <div style={{ height: this.state.height-60, 'background-color': background_color, 'border-style': 'solid', 'border-color': this.state.theme['send_receive_ether_overlay_background'], 'border-radius': '1px 1px 0px 0px', 'border-width': '0px', 'box-shadow': '0px 0px 2px 1px '+this.state.theme['send_receive_ether_overlay_shadow'],'margin': '0px 0px 0px 0px', 'overflow-y':'auto'}}>  
            <FreezeUnfreezePage ref={this.freeze_unfreeze_page} app_state={this.state} size={size} height={this.state.height} theme={this.state.theme} notify={this.prompt_top_notification.bind(this)} add_freeze_unfreeze_to_stack={this.add_freeze_unfreeze_to_stack.bind(this)}/>
          </div>
      </SwipeableBottomSheet>
    )
  }

  open_freeze_unfreeze_bottomsheet(){
    if(this.state != null){
        this.setState({freeze_unfreeze_bottomsheet: !this.state.freeze_unfreeze_bottomsheet});
      }
  }

  show_freeze_unfreeze_bottomsheet(token_item){
    if(this.freeze_unfreeze_page.current != null){
      this.freeze_unfreeze_page.current.set_token(token_item)
    }

    this.open_freeze_unfreeze_bottomsheet()
  }

  add_freeze_unfreeze_to_stack(state_obj){
    var stack_clone = this.state.stack_items.slice()      
    var edit_id = -1
    for(var i=0; i<stack_clone.length; i++){
      if(stack_clone[i].id == state_obj.id){
        edit_id = i
      }
    }
    if(edit_id != -1){
      stack_clone[edit_id] = state_obj
    }else{
      stack_clone.push(state_obj)
    }
    this.setState({stack_items: stack_clone})
    this.set_cookies_after_stack_action(stack_clone)
  }










  render_authmint_bottomsheet(){
    var background_color = this.state.theme['send_receive_ether_background_color'];
    var size = this.getScreenSize();
    return(
      <SwipeableBottomSheet  overflowHeight={0} marginTop={0} onChange={this.open_authmint_bottomsheet.bind(this)} open={this.state.authmint_bottomsheet} style={{'z-index':'5'}} bodyStyle={{'background-color': 'transparent'}} overlayStyle={{'background-color': this.state.theme['send_receive_ether_overlay_background'],'box-shadow': '0px 0px 0px 0px '+this.state.theme['send_receive_ether_overlay_shadow']}}>
          <div style={{ height: this.state.height-60, 'background-color': background_color, 'border-style': 'solid', 'border-color': this.state.theme['send_receive_ether_overlay_background'], 'border-radius': '1px 1px 0px 0px', 'border-width': '0px', 'box-shadow': '0px 0px 2px 1px '+this.state.theme['send_receive_ether_overlay_shadow'],'margin': '0px 0px 0px 0px', 'overflow-y':'auto'}}>  
            <AuthMintPage ref={this.authmint_page} app_state={this.state} size={size} height={this.state.height} theme={this.state.theme} notify={this.prompt_top_notification.bind(this)} add_authmint_to_stack={this.add_authmint_to_stack.bind(this)}/>
          </div>
      </SwipeableBottomSheet>
    )
  }

  open_authmint_bottomsheet(){
    if(this.state != null){
        this.setState({authmint_bottomsheet: !this.state.authmint_bottomsheet});
      }
  }

  show_authmint_bottomsheet(token_item){
    if(this.authmint_page.current != null){
      this.authmint_page.current.set_token(token_item)
    }

    this.open_authmint_bottomsheet()
  }

  add_authmint_to_stack(state_obj){
    var stack_clone = this.state.stack_items.slice()      
    var edit_id = -1
    for(var i=0; i<stack_clone.length; i++){
      if(stack_clone[i].id == state_obj.id){
        edit_id = i
      }
    }
    if(edit_id != -1){
      stack_clone[edit_id] = state_obj
    }else{
      stack_clone.push(state_obj)
    }
    this.setState({stack_items: stack_clone})
    this.set_cookies_after_stack_action(stack_clone)
  }









  render_moderator_bottomsheet(){
    var background_color = this.state.theme['send_receive_ether_background_color'];
    var size = this.getScreenSize();
    return(
      <SwipeableBottomSheet  overflowHeight={0} marginTop={0} onChange={this.open_moderator_bottomsheet.bind(this)} open={this.state.moderator_bottomsheet} style={{'z-index':'5'}} bodyStyle={{'background-color': 'transparent'}} overlayStyle={{'background-color': this.state.theme['send_receive_ether_overlay_background'],'box-shadow': '0px 0px 0px 0px '+this.state.theme['send_receive_ether_overlay_shadow']}}>
          <div style={{ height: this.state.height-60, 'background-color': background_color, 'border-style': 'solid', 'border-color': this.state.theme['send_receive_ether_overlay_background'], 'border-radius': '1px 1px 0px 0px', 'border-width': '0px', 'box-shadow': '0px 0px 2px 1px '+this.state.theme['send_receive_ether_overlay_shadow'],'margin': '0px 0px 0px 0px', 'overflow-y':'auto'}}>  
            <ModeratorPage ref={this.moderator_page} app_state={this.state} size={size} height={this.state.height} theme={this.state.theme} notify={this.prompt_top_notification.bind(this)} add_moderator_to_stack={this.add_moderator_to_stack.bind(this)}/>
          </div>
      </SwipeableBottomSheet>
    )
  }

  open_moderator_bottomsheet(){
    if(this.state != null){
        this.setState({moderator_bottomsheet: !this.state.moderator_bottomsheet});
      }
  }

  show_moderator_bottomsheet(item){
    if(this.moderator_page.current != null){
      this.moderator_page.current.set_object(item)
    }

    this.open_moderator_bottomsheet()
  }

  add_moderator_to_stack(state_obj){
    var stack_clone = this.state.stack_items.slice()      
    var edit_id = -1
    for(var i=0; i<stack_clone.length; i++){
      if(stack_clone[i].id == state_obj.id){
        edit_id = i
      }
    }
    if(edit_id != -1){
      stack_clone[edit_id] = state_obj
    }else{
      stack_clone.push(state_obj)
    }
    this.setState({stack_items: stack_clone})
    this.set_cookies_after_stack_action(stack_clone)
  }








  render_respond_to_job_bottomsheet(){
    var background_color = this.state.theme['send_receive_ether_background_color'];
    var size = this.getScreenSize();
    return(
      <SwipeableBottomSheet  overflowHeight={0} marginTop={0} onChange={this.open_respond_to_job_bottomsheet.bind(this)} open={this.state.respond_to_job_bottomsheet} style={{'z-index':'5'}} bodyStyle={{'background-color': 'transparent'}} overlayStyle={{'background-color': this.state.theme['send_receive_ether_overlay_background'],'box-shadow': '0px 0px 0px 0px '+this.state.theme['send_receive_ether_overlay_shadow']}}>
          <div style={{ height: this.state.height-60, 'background-color': background_color, 'border-style': 'solid', 'border-color': this.state.theme['send_receive_ether_overlay_background'], 'border-radius': '1px 1px 0px 0px', 'border-width': '0px', 'box-shadow': '0px 0px 2px 1px '+this.state.theme['send_receive_ether_overlay_shadow'],'margin': '0px 0px 0px 0px', 'overflow-y':'auto'}}>  
            <RespondToJobPage ref={this.respond_to_job_page} app_state={this.state} size={size} height={this.state.height} theme={this.state.theme} notify={this.prompt_top_notification.bind(this)} add_respond_to_job_to_stack={this.add_respond_to_job_to_stack.bind(this)}/>
          </div>
      </SwipeableBottomSheet>
    )
  }

  open_respond_to_job_bottomsheet(){
    if(this.state != null){
      this.setState({respond_to_job_bottomsheet: !this.state.respond_to_job_bottomsheet});
    }
  }

  show_respond_to_job_bottomsheet(item){
    if(this.respond_to_job_page.current != null){
      this.respond_to_job_page.current.set_object(item)
    }

    this.open_respond_to_job_bottomsheet()
  }

  add_respond_to_job_to_stack(state_obj){
    var stack_clone = this.state.stack_items.slice()      
    var edit_id = -1
    for(var i=0; i<stack_clone.length; i++){
      if(stack_clone[i].id == state_obj.id){
        edit_id = i
      }
    }
    if(edit_id != -1){
      stack_clone[edit_id] = state_obj
    }else{
      stack_clone.push(state_obj)
    }
    this.setState({stack_items: stack_clone})
    this.set_cookies_after_stack_action(stack_clone)

    var clone = JSON.parse(JSON.stringify(this.state.my_contract_applications))
    clone[state_obj.picked_contract['id']] = state_obj.application_expiry_time
    this.setState({my_contract_applications: clone})
  }










  render_view_application_contract_bottomsheet(){
    var background_color = this.state.theme['send_receive_ether_background_color'];
    var size = this.getScreenSize();
    return(
      <SwipeableBottomSheet  overflowHeight={0} marginTop={0} onChange={this.open_view_application_contract_bottomsheet.bind(this)} open={this.state.view_application_contract_bottomsheet} style={{'z-index':'5'}} bodyStyle={{'background-color': 'transparent'}} overlayStyle={{'background-color': this.state.theme['send_receive_ether_overlay_background'],'box-shadow': '0px 0px 0px 0px '+this.state.theme['send_receive_ether_overlay_shadow']}}>
          <div style={{ height: this.state.height-60, 'background-color': background_color, 'border-style': 'solid', 'border-color': this.state.theme['send_receive_ether_overlay_background'], 'border-radius': '1px 1px 0px 0px', 'border-width': '0px', 'box-shadow': '0px 0px 2px 1px '+this.state.theme['send_receive_ether_overlay_shadow'],'margin': '0px 0px 0px 0px', 'overflow-y':'auto'}}>  
            <ViewApplicationContractPage ref={this.view_application_contract_page} app_state={this.state} size={size} height={this.state.height} theme={this.state.theme} notify={this.prompt_top_notification.bind(this)} add_job_acceptance_action_to_stack={this.add_job_acceptance_action_to_stack.bind(this)}/>
          </div>
      </SwipeableBottomSheet>
    )
  }

  open_view_application_contract_bottomsheet(){
    if(this.state != null){
      this.setState({view_application_contract_bottomsheet: !this.state.view_application_contract_bottomsheet});
    }
  }

  show_view_application_contract_bottomsheet(item){
    if(this.view_application_contract_page.current != null){
      this.view_application_contract_page.current.set_object(item)
    }

    this.open_view_application_contract_bottomsheet()
  }


  add_job_acceptance_action_to_stack(state_obj){
    var contract = state_obj.application_item['contract']
    if(contract['access_rights_enabled'] == true && (contract['my_interactable_time_value'] < Date.now()/1000 && !contract['moderators'].includes(this.state.user_account_id[contract['e5']]))){
      this.prompt_top_notification('The contract owner hasnt granted you access to their contract yet', 4000)
    }
    else if(contract['my_blocked_time_value'] > Date.now()/1000){
      this.prompt_top_notification('Your account was blocked from entering the contract', 4000)
    }
    else{
      var stack_clone = this.state.stack_items.slice()      
      stack_clone.push(state_obj)
      this.setState({stack_items: stack_clone})
      this.set_cookies_after_stack_action(stack_clone)

      this.show_enter_contract_bottomsheet(state_obj.application_item['contract'])
      this.open_view_application_contract_bottomsheet()
    }
  }












  render_view_transaction_bottomsheet(){
    var background_color = this.state.theme['send_receive_ether_background_color'];
    var size = this.getScreenSize();
    return(
      <SwipeableBottomSheet  overflowHeight={0} marginTop={0} onChange={this.open_view_transaction_bottomsheet.bind(this)} open={this.state.view_transaction_bottomsheet} style={{'z-index':'5'}} bodyStyle={{'background-color': 'transparent'}} overlayStyle={{'background-color': this.state.theme['send_receive_ether_overlay_background'],'box-shadow': '0px 0px 0px 0px '+this.state.theme['send_receive_ether_overlay_shadow']}}>
          <div style={{ height: this.state.height-90, 'background-color': background_color, 'border-style': 'solid', 'border-color': this.state.theme['send_receive_ether_overlay_background'], 'border-radius': '1px 1px 0px 0px', 'border-width': '0px', 'box-shadow': '0px 0px 2px 1px '+this.state.theme['send_receive_ether_overlay_shadow'],'margin': '0px 0px 0px 0px', 'overflow-y':'auto'}}>  
            <ViewTransactionPage ref={this.view_transaction_page} app_state={this.state} size={size} height={this.state.height} theme={this.state.theme} notify={this.prompt_top_notification.bind(this)} show_images={this.show_images.bind(this)} open_edit_object_uis={this.open_edit_object_uis.bind(this)} delete_transaction={this.delete_transaction.bind(this)} show_hide_stack_item={this.show_hide_stack_item.bind(this)} delete_message_item={this.delete_message_item.bind(this)} when_edit_bag_item_tapped={this.when_edit_bag_item_tapped.bind(this)} delete_bag_item={this.delete_bag_item.bind(this)} delete_collected_signature={this.delete_collected_signature.bind(this)}/>
          </div>
      </SwipeableBottomSheet>
    )
  }

  open_view_transaction_bottomsheet(){
    if(this.state != null){
      this.setState({view_transaction_bottomsheet: !this.state.view_transaction_bottomsheet});
    }
  }

  show_view_transaction_bottomsheet(item, index){
    if(this.view_transaction_page.current != null){
      this.view_transaction_page.current.set_transaction(item, index)
    }

    this.open_view_transaction_bottomsheet()
  }


  delete_transaction(item){
    var stack_clone = this.state.stack_items.slice()
    const index = stack_clone.indexOf(item);
    if (index > -1) { // only splice array when item is found
      stack_clone.splice(index, 1); // 2nd parameter means remove one item only
    }
    this.setState({stack_items: stack_clone})
    this.set_cookies_after_stack_action(stack_clone)
    this.open_view_transaction_bottomsheet()
  }


  open_edit_object_uis(tx){
    if(tx.type == 'contract'){
        this.open_new_object('1')
        if(this.new_contract_page.current){
          this.new_contract_page.current?.set_state(tx)
        }
    }
    else if(tx.type == 'token'){
        this.open_new_object('8')
        if(this.new_token_page.current){
          this.new_token_page.current?.set_state(tx)
        }
    }
    else if(tx.type == 'subscription'){
        this.open_new_object('3')
        if(this.new_subscription_page.current){
          this.new_subscription_page.current?.set_state(tx)
        }
    }
    else if(tx.type == 'post'){
        this.open_new_object('6')
        if(this.new_post_page.current){
          this.new_post_page.current?.setState(tx)
        }
    }
    else if(tx.type == 'job'){
        this.open_new_object('0')
        if(this.new_job_page.current){
          this.new_job_page.current?.setState(tx)
        }
    }
    else if(tx.type == 'channel'){
        this.open_new_object('7')
        if(this.new_channel_page.current){
          this.new_channel_page.current?.setState(tx)
        }
    }
    else if(tx.type == 'storefront-item'){
        this.open_new_object('4')
        if(this.new_storefront_item_page.current){
          this.new_storefront_item_page.current?.setState(tx)
        }
    }
    else if(tx.type == 'buy-sell'){
      this.open_mint_token_bottomsheet()
      if(this.new_mint_dump_token_page.current){
        this.new_mint_dump_token_page.current?.setState(tx)
      }
    }
    else if(tx.type == 'transfer'){
      this.open_transfer_token_bottomsheet()
      if(this.new_transfer_token_page.current){
        this.new_transfer_token_page.current?.setState(tx)
      }
    }
    else if(tx.type == 'enter-contract'){
      this.open_enter_contract_bottomsheet()
      if(this.enter_contract_page.current){
        this.enter_contract_page.current?.setState(tx)
      } 
    }
    else if(tx.type == 'extend-contract'){
      this.open_extend_contract_bottomsheet()
      if(this.extend_contract_page.current){
        this.extend_contract_page.current?.setState(tx)
      } 
    }
    else if(tx.type == 'proposal'){
      this.open_new_proposal_bottomsheet()
      if(this.new_proposal_page.current){
        this.new_proposal_page.current?.setState(tx)
      } 
    }
    else if(tx.type == 'vote'){
      this.open_vote_proposal_bottomsheet()
      if(this.vote_proposal_page.current){
        this.vote_proposal_page.current?.setState(tx)
      }
    }
    else if(tx.type == 'pay-subscription'){
      this.open_pay_subscription_bottomsheet()
      if(this.pay_subscription_page.current){
        this.pay_subscription_page.current?.setState(tx)
      } 
    }
    else if(tx.type == 'cancel-subscription'){
      this.open_cancel_subscription_bottomsheet()
      if(this.cancel_subscription_page.current){
        this.cancel_subscription_page.current?.setState(tx)
      }
    }
    else if(tx.type == 'modify-subscription'){
        this.open_modify_subscription_bottomsheet()
        if(this.modify_subscription_page.current){
          this.modify_subscription_page.current?.setState(tx)
        }
    }   
    else if(tx.type == 'modify-contract'){
        this.open_modify_contract_bottomsheet()
        if(this.modify_contract_page.current){
          this.modify_contract_page.current?.setState(tx)
        }
    }
    else if(tx.type == 'modify-token'){
        this.open_modify_token_bottomsheet()
        if(this.modify_token_page.current){
          this.modify_token_page.current?.setState(tx)
        }
    }
    else if(tx.type == 'exchange-transfer'){
        this.open_exchange_transfer_bottomsheet()
        if(this.exchange_transfer_page.current){
          this.exchange_transfer_page.current?.setState(tx)
        }
    }
    else if(tx.type == 'force-exit'){
        this.open_force_exit_bottomsheet()
        if(this.force_exit_page.current){
          this.force_exit_page.current?.setState(tx)
        }
    }
    else if(tx.type == 'archive'){
        this.open_archive_proposal_bottomsheet()
        if(this.archive_proposal_page.current){
          this.archive_proposal_page.current?.setState(tx)
        }
    }
    else if(tx.type == 'freeze/unfreeze'){
        this.open_freeze_unfreeze_bottomsheet()
        if(this.freeze_unfreeze_page.current){
          this.freeze_unfreeze_page.current?.setState(tx)
        }
    }
    else if(tx.type == 'authmint'){
        this.open_authmint_bottomsheet()
        if(this.authmint_page.current){
          this.authmint_page.current?.setState(tx)
        }
    }
    else if(tx.type == 'access-rights-settings'){
        this.open_moderator_bottomsheet()
        if(this.moderator_page.current){
          this.moderator_page.current?.setState(tx)
        }  
    }
    else if(tx.type == 'mail'){
        this.open_new_object('5')
        if(this.new_mail_page.current){
          this.new_mail_page.current?.setState(tx)
        } 
    }  
    else if(tx.type == 'job-response'){
        this.open_respond_to_job_bottomsheet()
        if(this.respond_to_job_page.current){
          this.respond_to_job_page.current?.setState(tx)
        }   
    }
    else if(tx.type == 'direct-purchase'){
      this.open_direct_purchase_bottomsheet()
      if(this.direct_purchase_page.current){
        this.direct_purchase_page.current?.setState(tx)
      } 
    }
    else if(tx.type == 'contractor'){
      this.open_new_object('9')
        if(this.new_contractor_page.current){
          this.new_contractor_page.current?.setState(tx)
        }
      
    }
    else if(tx.type == 'job-request'){
        this.open_send_job_request_bottomsheet()
        if(this.send_job_request_page.current){
          this.send_job_request_page.current?.setState(tx)
        } 
    }
    else if(tx.type == 'edit-channel'){
      this.open_edit_channel_bottomsheet()
      if(this.edit_channel_page.current){
        this.edit_channel_page.current?.setState(tx)
      }
    }
    else if(tx.type == 'edit-contractor'){
      this.open_edit_contractor_bottomsheet()
      if(this.edit_contractor_page.current){
        this.edit_contractor_page.current?.setState(tx)
      }
    }
    else if(tx.type == 'edit-job'){
        this.open_edit_job_bottomsheet()
        if(this.edit_job_page.current){
          this.edit_job_page.current?.setState(tx)
        }
    }
    else if(tx.type == 'edit-post'){
        this.open_edit_post_bottomsheet()
        if(this.edit_post_page.current){
          this.edit_post_page.current?.setState(tx)
        }
    }
    else if(tx.type == 'edit-storefront'){
        this.open_edit_storefront_bottomsheet()
        if(this.edit_storefront_page.current){
          this.edit_storefront_page.current?.setState(tx)
        }
    }
    else if(tx.type == 'edit-token'){
        this.open_edit_token_bottomsheet()
        if(this.edit_token_page.current){
          this.edit_token_page.current?.setState(tx)
        }
    }
    else if(tx.type == 'depthmint'){
        this.open_depthmint_bottomsheet()
        if(this.depthmint_page.current){
          this.depthmint_page.current?.setState(tx)
        }
    }
        
  }

  delete_message_item(item, transaction_item){
    var stack = this.state.stack_items.slice()
    var pos = -1
    for(var i=0; i<stack.length; i++){
      if(stack[i].id == transaction_item.id){
        pos = i
        break;
      }
    }
    if(pos != -1){
      const index = stack[pos].messages_to_deliver.indexOf(item);
      if (index > -1) { // only splice array when item is found
        stack[pos].messages_to_deliver.splice(index, 1); // 2nd parameter means remove one item only
      }
      this.setState({stack_items: stack})
      this.set_cookies_after_stack_action(stack)
    }
  }

  when_edit_bag_item_tapped(item){
    if(this.add_to_bag_page.current != null){
      this.add_to_bag_page.current.setState(item)
    }
    this.open_add_to_bag_bottomsheet()
  }

  delete_bag_item(item){
    var stack = this.state.stack_items.slice() 
    var pos = -1
    for(var i=0; i<stack.length; i++){
      if(stack[i].type == 'storefront-bag'){
        pos = i
        break;
      }
    }

    if(pos != -1){
      const index = stack[pos].items_to_deliver.indexOf(item);
      if (index > -1) { // only splice array when item is found
        stack[pos].items_to_deliver.splice(index, 1); // 2nd parameter means remove one item only
      }
      this.setState({stack_items: stack})
      this.set_cookies_after_stack_action(stack)
    }

  }

  delete_collected_signature(item, transaction_item){
    var stack = this.state.stack_items.slice()
    var pos = -1
    for(var i=0; i<stack.length; i++){
      if(stack[i].id == transaction_item.id){
        pos = i
        break;
      }
    }
    if(pos != -1){
      const index = stack[pos].items_to_clear.indexOf(item);
      if (index > -1) { // only splice array when item is found
        stack[pos].items_to_clear.splice(index, 1); // 2nd parameter means remove one item only
      }
      this.setState({stack_items: stack})
      this.set_cookies_after_stack_action(stack)
    }
  }








  render_view_transaction_log_bottomsheet(){
    var background_color = this.state.theme['send_receive_ether_background_color'];
    var size = this.getScreenSize();
    return(
      <SwipeableBottomSheet  overflowHeight={0} marginTop={0} onChange={this.open_view_transaction_log_bottomsheet.bind(this)} open={this.state.view_transaction_log_bottomsheet} style={{'z-index':'5'}} bodyStyle={{'background-color': 'transparent'}} overlayStyle={{'background-color': this.state.theme['send_receive_ether_overlay_background'],'box-shadow': '0px 0px 0px 0px '+this.state.theme['send_receive_ether_overlay_shadow']}}>
          <div style={{ height: this.state.height-90, 'background-color': background_color, 'border-style': 'solid', 'border-color': this.state.theme['send_receive_ether_overlay_background'], 'border-radius': '1px 1px 0px 0px', 'border-width': '0px', 'box-shadow': '0px 0px 2px 1px '+this.state.theme['send_receive_ether_overlay_shadow'],'margin': '0px 0px 0px 0px', 'overflow-y':'auto'}}>  
            <ViewTransactionLogPage ref={this.view_transaction_log_page} app_state={this.state} size={size} height={this.state.height} theme={this.state.theme} notify={this.prompt_top_notification.bind(this)}/>
          </div>
      </SwipeableBottomSheet>
    )
  }

  open_view_transaction_log_bottomsheet(){
    if(this.state != null){
      this.setState({view_transaction_log_bottomsheet: !this.state.view_transaction_log_bottomsheet});
    }
  }

  show_view_transaction_log_bottomsheet(item){
    if(this.view_transaction_log_page.current != null){
      this.view_transaction_log_page.current.set_transaction(item)
    }
    this.open_view_transaction_log_bottomsheet()
  }










  render_add_to_bag_bottomsheet(){
    var background_color = this.state.theme['send_receive_ether_background_color'];
    var size = this.getScreenSize();
    return(
      <SwipeableBottomSheet  overflowHeight={0} marginTop={0} onChange={this.open_add_to_bag_bottomsheet.bind(this)} open={this.state.add_to_bag_bottomsheet} style={{'z-index':'5'}} bodyStyle={{'background-color': 'transparent'}} overlayStyle={{'background-color': this.state.theme['send_receive_ether_overlay_background'],'box-shadow': '0px 0px 0px 0px '+this.state.theme['send_receive_ether_overlay_shadow']}}>
          <div style={{ height: this.state.height-60, 'background-color': background_color, 'border-style': 'solid', 'border-color': this.state.theme['send_receive_ether_overlay_background'], 'border-radius': '1px 1px 0px 0px', 'border-width': '0px', 'box-shadow': '0px 0px 2px 1px '+this.state.theme['send_receive_ether_overlay_shadow'],'margin': '0px 0px 0px 0px', 'overflow-y':'auto'}}>  
            <AddToBagPage ref={this.add_to_bag_page} app_state={this.state} size={size} height={this.state.height} theme={this.state.theme} notify={this.prompt_top_notification.bind(this)} add_bag_item_to_bag_in_stack={this.add_bag_item_to_bag_in_stack.bind(this)} show_images={this.show_images.bind(this)}/>
          </div>
      </SwipeableBottomSheet>
    )
  }

  open_add_to_bag_bottomsheet(){
    if(this.state != null){
      this.setState({add_to_bag_bottomsheet: !this.state.add_to_bag_bottomsheet});
    }
  }

  show_add_to_bag_bottomsheet(item){
    if(this.add_to_bag_page.current != null){
      this.add_to_bag_page.current.set_transaction(item)
    }
    this.open_add_to_bag_bottomsheet()
  }

  add_bag_item_to_bag_in_stack(state_obj){
    var stack = this.state.stack_items.slice() 
    var pos = -1
    for(var i=0; i<stack.length; i++){
      if(stack[i].type == 'storefront-bag' && stack[i].e5 == state_obj.e5){
        pos = i
        break;
      }
    }
    if(pos == -1){
      var tx = {selected: 0, id: makeid(8), type:'storefront-bag', entered_indexing_tags:['storefront', 'bag', 'cart'], items_to_deliver:[], e5: state_obj.e5, content_channeling_setting: this.state.content_channeling, device_language_setting: this.state.device_language, device_country: this.state.device_country}
      
      tx.items_to_deliver.push(state_obj)
      stack.push(tx)
    }else{
      var is_replica_found = false
      for(var j=0; j<stack[pos].items_to_deliver.length; j++){
        if(state_obj.id == stack[pos].items_to_deliver[j].id){
          stack[pos].items_to_deliver[j] = state_obj
          is_replica_found = true
          break;
        }
      }
      if(!is_replica_found){
        stack[pos].items_to_deliver.push(state_obj)
      }
    }
    this.setState({stack_items: stack})
    this.set_cookies_after_stack_action(stack)
  }










  render_fulfil_bag_bottomsheet(){
    var background_color = this.state.theme['send_receive_ether_background_color'];
    var size = this.getScreenSize();
    return(
      <SwipeableBottomSheet  overflowHeight={0} marginTop={0} onChange={this.open_fulfil_bag_bottomsheet.bind(this)} open={this.state.fulfil_bag_bottomsheet} style={{'z-index':'5'}} bodyStyle={{'background-color': 'transparent'}} overlayStyle={{'background-color': this.state.theme['send_receive_ether_overlay_background'],'box-shadow': '0px 0px 0px 0px '+this.state.theme['send_receive_ether_overlay_shadow']}}>
          <div style={{ height: this.state.height-60, 'background-color': background_color, 'border-style': 'solid', 'border-color': this.state.theme['send_receive_ether_overlay_background'], 'border-radius': '1px 1px 0px 0px', 'border-width': '0px', 'box-shadow': '0px 0px 2px 1px '+this.state.theme['send_receive_ether_overlay_shadow'],'margin': '0px 0px 0px 0px', 'overflow-y':'auto'}}>  
            <FulfilBagPage ref={this.fulfil_bag_page} app_state={this.state} size={size} height={this.state.height} theme={this.state.theme} notify={this.prompt_top_notification.bind(this)} add_respond_to_bag_to_stack={this.add_respond_to_bag_to_stack.bind(this)}/>
          </div>
      </SwipeableBottomSheet>
    )
  }

  open_fulfil_bag_bottomsheet(){
    if(this.state != null){
      this.setState({fulfil_bag_bottomsheet: !this.state.fulfil_bag_bottomsheet});
    }
  }

  show_fulfil_bag_bottomsheet(item){
    if(this.fulfil_bag_page.current != null){
      this.fulfil_bag_page.current.set_bag(item)
    }
    this.open_fulfil_bag_bottomsheet()
  }

  add_respond_to_bag_to_stack(state_obj){
    var stack_clone = this.state.stack_items.slice()      
    var edit_id = -1
    for(var i=0; i<stack_clone.length; i++){
      if(stack_clone[i].id == state_obj.id){
        edit_id = i
      }
    }
    if(edit_id != -1){
      stack_clone[edit_id] = state_obj
    }else{
      stack_clone.push(state_obj)
    }
    this.setState({stack_items: stack_clone})
    this.set_cookies_after_stack_action(stack_clone)
  }










  render_view_bag_application_contract_bottomsheet(){
    var background_color = this.state.theme['send_receive_ether_background_color'];
    var size = this.getScreenSize();
    return(
      <SwipeableBottomSheet  overflowHeight={0} marginTop={0} onChange={this.open_view_bag_application_contract_bottomsheet.bind(this)} open={this.state.view_bag_application_contract_bottomsheet} style={{'z-index':'5'}} bodyStyle={{'background-color': 'transparent'}} overlayStyle={{'background-color': this.state.theme['send_receive_ether_overlay_background'],'box-shadow': '0px 0px 0px 0px '+this.state.theme['send_receive_ether_overlay_shadow']}}>
          <div style={{ height: this.state.height-60, 'background-color': background_color, 'border-style': 'solid', 'border-color': this.state.theme['send_receive_ether_overlay_background'], 'border-radius': '1px 1px 0px 0px', 'border-width': '0px', 'box-shadow': '0px 0px 2px 1px '+this.state.theme['send_receive_ether_overlay_shadow'],'margin': '0px 0px 0px 0px', 'overflow-y':'auto'}}>  
            <ViewBagApplicationContractPage ref={this.view_bag_application_contract_page} app_state={this.state} size={size} height={this.state.height} theme={this.state.theme} notify={this.prompt_top_notification.bind(this)} add_bag_acceptance_action_to_stack={this.add_bag_acceptance_action_to_stack.bind(this)}/>
          </div>
      </SwipeableBottomSheet>
    )
  }

  open_view_bag_application_contract_bottomsheet(){
    if(this.state != null){
      this.setState({view_bag_application_contract_bottomsheet: !this.state.view_bag_application_contract_bottomsheet});
    }
  }

  show_view_bag_application_contract_bottomsheet(item){
    if(this.view_bag_application_contract_page.current != null){
      this.view_bag_application_contract_page.current.set_object(item)
    }
    this.open_view_bag_application_contract_bottomsheet()
  }

  add_bag_acceptance_action_to_stack(state_obj){
    var stack_clone = this.state.stack_items.slice()      
    stack_clone.push(state_obj)
    this.setState({stack_items: stack_clone})
    this.set_cookies_after_stack_action(stack_clone)

    this.show_enter_contract_bottomsheet(state_obj.application_item['contract'])
    this.open_view_bag_application_contract_bottomsheet()
  }











  render_direct_purchase_bottomsheet(){
    var background_color = this.state.theme['send_receive_ether_background_color'];
    var size = this.getScreenSize();
    return(
      <SwipeableBottomSheet  overflowHeight={0} marginTop={0} onChange={this.open_direct_purchase_bottomsheet.bind(this)} open={this.state.direct_purchase_bottomsheet} style={{'z-index':'5'}} bodyStyle={{'background-color': 'transparent'}} overlayStyle={{'background-color': this.state.theme['send_receive_ether_overlay_background'],'box-shadow': '0px 0px 0px 0px '+this.state.theme['send_receive_ether_overlay_shadow']}}>
          <div style={{ height: this.state.height-60, 'background-color': background_color, 'border-style': 'solid', 'border-color': this.state.theme['send_receive_ether_overlay_background'], 'border-radius': '1px 1px 0px 0px', 'border-width': '0px', 'box-shadow': '0px 0px 2px 1px '+this.state.theme['send_receive_ether_overlay_shadow'],'margin': '0px 0px 0px 0px', 'overflow-y':'auto'}}>  
            <DirectPurchasetPage ref={this.direct_purchase_page} app_state={this.state} size={size} height={this.state.height} theme={this.state.theme} notify={this.prompt_top_notification.bind(this)} add_direct_purchase_to_stack={this.add_direct_purchase_to_stack.bind(this)} show_images={this.show_images.bind(this)}/>
          </div>
      </SwipeableBottomSheet>
    )
  }

  open_direct_purchase_bottomsheet(){
    if(this.state != null){
      this.setState({direct_purchase_bottomsheet: !this.state.direct_purchase_bottomsheet});
    }
  }

  show_direct_purchase_bottomsheet(item){
    if(this.direct_purchase_page.current != null){
      this.direct_purchase_page.current.set_object(item)
    }

    this.open_direct_purchase_bottomsheet()
  }

  add_direct_purchase_to_stack(state_obj){
    var stack_clone = this.state.stack_items.slice()      
    var edit_id = -1
    for(var i=0; i<stack_clone.length; i++){
      if(stack_clone[i].id == state_obj.id){
        edit_id = i
      }
    }
    if(edit_id != -1){
      stack_clone[edit_id] = state_obj
    }else{
      stack_clone.push(state_obj)
    }
    this.setState({stack_items: stack_clone})
    this.set_cookies_after_stack_action(stack_clone)
  }







  render_clear_purchase_bottomsheet(){
    var background_color = this.state.theme['send_receive_ether_background_color'];
    var size = this.getScreenSize();
    return(
      <SwipeableBottomSheet  overflowHeight={0} marginTop={0} onChange={this.open_clear_purchase_bottomsheet.bind(this)} open={this.state.clear_purchase_bottomsheet} style={{'z-index':'5'}} bodyStyle={{'background-color': 'transparent'}} overlayStyle={{'background-color': this.state.theme['send_receive_ether_overlay_background'],'box-shadow': '0px 0px 0px 0px '+this.state.theme['send_receive_ether_overlay_shadow']}}>
          <div style={{ height: this.state.height-60, 'background-color': background_color, 'border-style': 'solid', 'border-color': this.state.theme['send_receive_ether_overlay_background'], 'border-radius': '1px 1px 0px 0px', 'border-width': '0px', 'box-shadow': '0px 0px 2px 1px '+this.state.theme['send_receive_ether_overlay_shadow'],'margin': '0px 0px 0px 0px', 'overflow-y':'auto'}}>  
            <ClearPurchasePage ref={this.clear_purchase_page} app_state={this.state} size={size} height={this.state.height} theme={this.state.theme} notify={this.prompt_top_notification.bind(this)} show_images={this.show_images.bind(this)} generate_signature={this.generate_signature.bind(this)} confirm_signature={this.confirm_signature.bind(this)} add_clearing_purchase_action_to_stack={this.add_clearing_purchase_action_to_stack.bind(this)} start_scan={this.start_scan.bind(this)}/>
          </div>
      </SwipeableBottomSheet>
    )
  }

  open_clear_purchase_bottomsheet(){
    if(this.state != null){
      this.setState({clear_purchase_bottomsheet: !this.state.clear_purchase_bottomsheet});
    }
  }

  show_clear_purchase_bottomsheet(item, client_type, storefront){
    if(this.clear_purchase_page.current != null){
      this.clear_purchase_page.current.set_object(item, client_type, storefront)
    }

    this.open_clear_purchase_bottomsheet()
  }


  generate_signature = async (data) => {
    const web3 = new Web3(this.state.web3);
    var address = this.state.accounts[this.state.default_e5].address
    web3.eth.accounts.wallet.add(this.state.accounts[this.state.default_e5].privateKey);

    var signature = await web3.eth.sign(data.toString(), address)
    return signature
  }

  confirm_signature = async (signature, data, address) => {
    const web3 = new Web3(this.get_web3_url_from_e5(this.state.default_e5));
    try{
      var original_address = await web3.eth.accounts.recover(data.toString(), signature)
      if(original_address.toString() != address.toString()){
        return false
      }
      return true
    }catch(e){
      console.log(e)
      return false
    }
    
  }


  add_clearing_purchase_action_to_stack(state_obj){
    var stack = this.state.stack_items.slice()
    var pos = -1
    for(var i=0; i<stack.length; i++){
      if(stack[i].type == 'clear-purchase'){
        pos = i
        break;
      }
    }
    if(pos == -1){
      var tx = {selected: 0, e5:state_obj.order_storefront['e5'], id: makeid(8), type: 'clear-purchase', entered_indexing_tags:['clear', 'finalize', 'purchase'], items_to_clear:[]}
      tx.items_to_clear.push(state_obj)
      stack.push(tx)
    }else{
      stack[pos].items_to_clear.push(state_obj)
    }
    this.setState({stack_items: stack})
    this.set_cookies_after_stack_action(stack)
  }








  render_send_job_request_bottomsheet(){
    var background_color = this.state.theme['send_receive_ether_background_color'];
    var size = this.getScreenSize();
    return(
      <SwipeableBottomSheet  overflowHeight={0} marginTop={0} onChange={this.open_send_job_request_bottomsheet.bind(this)} open={this.state.send_job_request_bottomsheet} style={{'z-index':'5'}} bodyStyle={{'background-color': 'transparent'}} overlayStyle={{'background-color': this.state.theme['send_receive_ether_overlay_background'],'box-shadow': '0px 0px 0px 0px '+this.state.theme['send_receive_ether_overlay_shadow']}}>
          <div style={{ height: this.state.height-60, 'background-color': background_color, 'border-style': 'solid', 'border-color': this.state.theme['send_receive_ether_overlay_background'], 'border-radius': '1px 1px 0px 0px', 'border-width': '0px', 'box-shadow': '0px 0px 2px 1px '+this.state.theme['send_receive_ether_overlay_shadow'],'margin': '0px 0px 0px 0px', 'overflow-y':'auto'}}>  
            <SendJobRequestPage ref={this.send_job_request_page} app_state={this.state} size={size} height={this.state.height} theme={this.state.theme} notify={this.prompt_top_notification.bind(this)} add_send_job_request_to_stack={this.add_send_job_request_to_stack.bind(this)} show_images={this.show_images.bind(this)}/>
          </div>
      </SwipeableBottomSheet>
    )
  }

  open_send_job_request_bottomsheet(){
    if(this.state != null){
      this.setState({send_job_request_bottomsheet: !this.state.send_job_request_bottomsheet});
    }
  }

  open_send_job_request_ui(item){
    if(this.send_job_request_page.current != null){
      this.send_job_request_page.current.set_object(item)
    }

    this.open_send_job_request_bottomsheet()
  }

  add_send_job_request_to_stack(state_obj){
    var stack_clone = this.state.stack_items.slice()      
    var edit_id = -1
    for(var i=0; i<stack_clone.length; i++){
      if(stack_clone[i].id == state_obj.id){
        edit_id = i
      }
    }
    if(edit_id != -1){
      stack_clone[edit_id] = state_obj
    }else{
      stack_clone.push(state_obj)
    }
    this.setState({stack_items: stack_clone})
    this.set_cookies_after_stack_action(stack_clone)
  }









  render_view_job_request_bottomsheet(){
    var background_color = this.state.theme['send_receive_ether_background_color'];
    var size = this.getScreenSize();
    return(
      <SwipeableBottomSheet  overflowHeight={0} marginTop={0} onChange={this.open_view_job_request_bottomsheet.bind(this)} open={this.state.view_job_request_bottomsheet} style={{'z-index':'5'}} bodyStyle={{'background-color': 'transparent'}} overlayStyle={{'background-color': this.state.theme['send_receive_ether_overlay_background'],'box-shadow': '0px 0px 0px 0px '+this.state.theme['send_receive_ether_overlay_shadow']}}>
          <div style={{ height: this.state.height-60, 'background-color': background_color, 'border-style': 'solid', 'border-color': this.state.theme['send_receive_ether_overlay_background'], 'border-radius': '1px 1px 0px 0px', 'border-width': '0px', 'box-shadow': '0px 0px 2px 1px '+this.state.theme['send_receive_ether_overlay_shadow'],'margin': '0px 0px 0px 0px', 'overflow-y':'auto'}}>  
            <ViewJobRequestPage ref={this.view_job_request_page} app_state={this.state} size={size} width={this.state.width} height={this.state.height} theme={this.state.theme} notify={this.prompt_top_notification.bind(this)} show_images={this.show_images.bind(this)} add_response_action_to_stack={this.add_response_action_to_stack.bind(this)} add_job_request_message_to_stack_object={this.add_job_request_message_to_stack_object.bind(this)} load_job_request_messages={this.load_job_request_messages.bind(this)} open_view_contract_ui={this.show_view_job_request_contract_bottomsheet.bind(this)} show_add_comment_bottomsheet={this.show_add_comment_bottomsheet.bind(this)}/>
          </div>
      </SwipeableBottomSheet>
    )
  }

  open_view_job_request_bottomsheet(){
    if(this.state != null){
      this.setState({view_job_request_bottomsheet: !this.state.view_job_request_bottomsheet});
    }
  }

  open_view_job_request_ui(item, object){
    if(this.view_job_request_page.current != null){
      this.view_job_request_page.current.set_object(item, object)
    }

    this.open_view_job_request_bottomsheet()
  }


  add_response_action_to_stack(state_obj){
    var stack_clone = this.state.stack_items.slice()      
    var edit_id = -1
    for(var i=0; i<stack_clone.length; i++){
      if(stack_clone[i].id == state_obj.id){
        edit_id = i
      }
    }
    if(edit_id != -1){
      stack_clone[edit_id] = state_obj
    }else{
      stack_clone.push(state_obj)
    }
    this.setState({stack_items: stack_clone})
    this.set_cookies_after_stack_action(stack_clone)
  }

  add_job_request_message_to_stack_object(message){
    var stack = this.state.stack_items.slice()
    var pos = -1
    for(var i=0; i<stack.length; i++){
      if(stack[i].type == 'job-request-messages' && stack[i].e5 == this.state.selected_e5){
        pos = i
        break;
      }
    }
    if(pos == -1){
      var tx = {selected: 0, id: makeid(8), type:'job-request-messages', entered_indexing_tags:['send','job','request','messages'], messages_to_deliver:[], e5: this.state.selected_e5}
      tx.messages_to_deliver.push(message)
      stack.push(tx)
    }else{
      stack[pos].messages_to_deliver.push(message)
    }
    this.setState({stack_items: stack})
    this.set_cookies_after_stack_action(stack)
  }











  render_view_job_request_contract_bottomsheet(){
    var background_color = this.state.theme['send_receive_ether_background_color'];
    var size = this.getScreenSize();
    return(
      <SwipeableBottomSheet  overflowHeight={0} marginTop={0} onChange={this.open_view_job_request_contract_bottomsheet.bind(this)} open={this.state.view_job_request_contract_bottomsheet} style={{'z-index':'5'}} bodyStyle={{'background-color': 'transparent'}} overlayStyle={{'background-color': this.state.theme['send_receive_ether_overlay_background'],'box-shadow': '0px 0px 0px 0px '+this.state.theme['send_receive_ether_overlay_shadow']}}>
          <div style={{ height: this.state.height-60, 'background-color': background_color, 'border-style': 'solid', 'border-color': this.state.theme['send_receive_ether_overlay_background'], 'border-radius': '1px 1px 0px 0px', 'border-width': '0px', 'box-shadow': '0px 0px 2px 1px '+this.state.theme['send_receive_ether_overlay_shadow'],'margin': '0px 0px 0px 0px', 'overflow-y':'auto'}}>  
            <ViewJobRequestContractPage ref={this.view_job_request_contract_page} app_state={this.state} size={size} height={this.state.height} theme={this.state.theme} notify={this.prompt_top_notification.bind(this)} add_job_request_action_to_stack={this.add_job_request_action_to_stack.bind(this)}/>
          </div>
      </SwipeableBottomSheet>
    )
  }

  open_view_job_request_contract_bottomsheet(){
    if(this.state != null){
      this.setState({view_job_request_contract_bottomsheet: !this.state.view_job_request_contract_bottomsheet});
    }
  }

  show_view_job_request_contract_bottomsheet(item){
    if(this.view_job_request_contract_page.current != null){
      this.view_job_request_contract_page.current.set_object(item)
    }
    this.open_view_job_request_contract_bottomsheet()
  }

  add_job_request_action_to_stack(state_obj){
    var contract = state_obj.contract_data
    if(contract['access_rights_enabled'] == true && (contract['my_interactable_time_value'] < Date.now()/1000 && !contract['moderators'].includes(this.state.user_account_id[contract['e5']]))){
      this.prompt_top_notification('The contract owner hasnt granted you access to their contract yet', 4000)
    }
    else if(contract['my_blocked_time_value'] > Date.now()/1000){
      this.prompt_top_notification('Your account was blocked from entering the contract', 4000)
    }
    else{
      this.show_enter_contract_bottomsheet(state_obj.contract_data)
      this.open_view_job_request_contract_bottomsheet()
    }
    
  }



















  render_withdraw_ether_bottomsheet(){
    var background_color = this.state.theme['send_receive_ether_background_color'];
    var size = this.getScreenSize();
    return(
      <SwipeableBottomSheet  overflowHeight={0} marginTop={0} onChange={this.open_withdraw_ether_bottomsheet.bind(this)} open={this.state.withdraw_ether_bottomsheet} style={{'z-index':'5'}} bodyStyle={{'background-color': 'transparent'}} overlayStyle={{'background-color': this.state.theme['send_receive_ether_overlay_background'],'box-shadow': '0px 0px 0px 0px '+this.state.theme['send_receive_ether_overlay_shadow']}}>
          <div style={{ height: this.state.height-60, 'background-color': background_color, 'border-style': 'solid', 'border-color': this.state.theme['send_receive_ether_overlay_background'], 'border-radius': '1px 1px 0px 0px', 'border-width': '0px', 'box-shadow': '0px 0px 2px 1px '+this.state.theme['send_receive_ether_overlay_shadow'],'margin': '0px 0px 0px 0px', 'overflow-y':'auto'}}>  
            <WithdrawEtherPage ref={this.withdraw_ether_page} app_state={this.state} size={size} height={this.state.height} theme={this.state.theme} notify={this.prompt_top_notification.bind(this)} withdraw_ether_to_address={this.withdraw_ether_to_address.bind(this)}/>
          </div>
      </SwipeableBottomSheet>
    )
  }

  open_withdraw_ether_bottomsheet(){
    if(this.state != null){
      this.setState({withdraw_ether_bottomsheet: !this.state.withdraw_ether_bottomsheet});
    }
  }

  show_withdraw_ether_bottomsheet(item){
    if(this.withdraw_ether_page.current != null){
      this.withdraw_ether_page.current.set_object(item)
    }
    this.open_withdraw_ether_bottomsheet()
  }

  withdraw_ether_to_address = async (target_recipient_address, e5, run_expiry_duration, _run_gas_price) =>{
    this.prompt_top_notification('withdrawing your ether...', 600)

    const web3 = new Web3(this.get_selected_web3_url());
    const contractArtifact = require('./contract_abis/E5.json');
    const contractAddress = this.state.addresses[e5][0]
    const contractInstance = new web3.eth.Contract(contractArtifact.abi, contractAddress); 
    const me = this
    const gasPrice = await web3.eth.getGasPrice();
    var run_gas_price = _run_gas_price == 0 ? gasPrice : _run_gas_price
    
    var now = await contractInstance.methods.f147(2).call((error, result) => {})
    var run_expiry_time = now + run_expiry_duration

    var v5/* t_limits */ = [100000000000000, run_expiry_time];
    var encoded = contractInstance.methods.f145(target_recipient_address, v5/* t_limits */).encodeABI()

    var tx = {
        gas: 65000,
        value: 0,
        to: contractAddress,
        data: encoded,
        gasPrice: run_gas_price.toString(),
        time:now,
    }
    web3.eth.accounts.signTransaction(tx, me.state.accounts[e5].privateKey).then(signed => {
        web3.eth.sendSignedTransaction(signed.rawTransaction).on('receipt', (receipt) => {
          // me.get_accounts_data(me.state.account, false, this.state.web3, this.state.e5_address)
          // this.start_get_accounts_data(false)
          this.update_withdraw_balance(e5)
          this.start_get_accounts_for_specific_e5(false, e5)
          this.prompt_top_notification('withdraw complete!', 600)
        }) .on('error', (error) => {
          console.error('Transaction error:', error);
          this.prompt_top_notification('Withdraw failed. Something went wrong', 1500)
        });
    })

  }

  update_withdraw_balance(e5){
    var clone = structuredClone(this.state.withdraw_balance)
    clone[e5] = 0
    this.setState({withdraw_balance: clone})
  }













  render_give_award_bottomsheet(){
    var background_color = this.state.theme['send_receive_ether_background_color'];
    var size = this.getScreenSize();
    return(
      <SwipeableBottomSheet  overflowHeight={0} marginTop={0} onChange={this.open_give_award_bottomsheet.bind(this)} open={this.state.give_award_bottomsheet} style={{'z-index':'5'}} bodyStyle={{'background-color': 'transparent'}} overlayStyle={{'background-color': this.state.theme['send_receive_ether_overlay_background'],'box-shadow': '0px 0px 0px 0px '+this.state.theme['send_receive_ether_overlay_shadow']}}>
          <div style={{ height: this.state.height-60, 'background-color': background_color, 'border-style': 'solid', 'border-color': this.state.theme['send_receive_ether_overlay_background'], 'border-radius': '1px 1px 0px 0px', 'border-width': '0px', 'box-shadow': '0px 0px 2px 1px '+this.state.theme['send_receive_ether_overlay_shadow'],'margin': '0px 0px 0px 0px', 'overflow-y':'auto'}}>  
            <GiveAwardPage ref={this.give_award_page} app_state={this.state} size={size} height={this.state.height} theme={this.state.theme} notify={this.prompt_top_notification.bind(this)} add_award_transaction_to_stack={this.add_award_transaction_to_stack.bind(this)}/>
          </div>
      </SwipeableBottomSheet>
    )
  }

  open_give_award_bottomsheet(){
    if(this.state != null){
      this.setState({give_award_bottomsheet: !this.state.give_award_bottomsheet});
    }
  }

  show_give_award_bottomsheet(item){
    if(this.give_award_page.current != null){
      this.give_award_page.current?.set_post(item)
    }
    this.open_give_award_bottomsheet()
  }

  add_award_transaction_to_stack(state_obj){
    var stack_clone = this.state.stack_items.slice()      
    var edit_id = -1
    for(var i=0; i<stack_clone.length; i++){
      if(stack_clone[i].id == state_obj.id){
        edit_id = i
      }
    }
    if(edit_id != -1){
      stack_clone[edit_id] = state_obj
    }else{
      stack_clone.push(state_obj)
    }
    this.setState({stack_items: stack_clone})
    this.set_cookies_after_stack_action(stack_clone)
  }


















  render_add_comment_bottomsheet(){
    var background_color = this.state.theme['send_receive_ether_background_color'];
    var size = this.getScreenSize();
    return(
      <SwipeableBottomSheet  overflowHeight={0} marginTop={0} onChange={this.open_add_comment_bottomsheet.bind(this)} open={this.state.add_comment_bottomsheet} style={{'z-index':'5'}} bodyStyle={{'background-color': 'transparent'}} overlayStyle={{'background-color': this.state.theme['send_receive_ether_overlay_background'],'box-shadow': '0px 0px 0px 0px '+this.state.theme['send_receive_ether_overlay_shadow']}}>
          <div style={{ height: 550, 'background-color': background_color, 'border-style': 'solid', 'border-color': this.state.theme['send_receive_ether_overlay_background'], 'border-radius': '1px 1px 0px 0px', 'border-width': '0px', 'box-shadow': '0px 0px 2px 1px '+this.state.theme['send_receive_ether_overlay_shadow'],'margin': '0px 0px 0px 0px', 'overflow-y':'auto'}}>  
            <AddCommentPage ref={this.add_comment_page} app_state={this.state} size={size} height={this.state.height} theme={this.state.theme} notify={this.prompt_top_notification.bind(this)} add_comment_to_respective_forum_page={this.add_comment_to_respective_forum_page.bind(this)}/>
          </div>
      </SwipeableBottomSheet>
    )
  }

  open_add_comment_bottomsheet(){
    if(this.state != null){
      this.setState({add_comment_bottomsheet: !this.state.add_comment_bottomsheet});
    }
  }

  show_add_comment_bottomsheet(object, focused_message_id, page, contractor_object){
    if(this.add_comment_page.current != null){
      this.add_comment_page.current.set_comment_data(object, focused_message_id, page, contractor_object)
    }
    this.open_add_comment_bottomsheet()
  }

  add_comment_to_respective_forum_page(tx, page){
    if(page == 'channel'){
      this.add_channel_message_to_stack_object(tx)      
    }
    else if(page == 'job'){
      this.add_job_message_to_stack_object(tx)
    }
    else if(page == 'mail'){
      this.add_mail_to_stack_object(tx)
    }
    else if(page == 'post'){
      this.add_post_reply_to_stack(tx)
    }
    else if(page == 'proposal'){
      this.add_proposal_message_to_stack_object(tx)
    }
    else if(page == 'storefront'){
      this.add_storefront_message_to_stack_object(tx)
    }
    else if(page == 'bag'){
      this.add_bag_message_to_stack_object(tx)
    }
    else if(page == 'request'){
      this.add_job_request_message_to_stack_object(tx)
    }
    this.open_add_comment_bottomsheet()
  }











  render_depthmint_bottomsheet(){
    var background_color = this.state.theme['send_receive_ether_background_color'];
    var size = this.getScreenSize();
    return(
      <SwipeableBottomSheet overflowHeight={0} marginTop={0} onChange={this.open_depthmint_bottomsheet.bind(this)} open={this.state.depthmint_bottomsheet} style={{'z-index':'5'}} bodyStyle={{'background-color': 'transparent'}} overlayStyle={{'background-color': this.state.theme['send_receive_ether_overlay_background'],'box-shadow': '0px 0px 0px 0px '+this.state.theme['send_receive_ether_overlay_shadow']}}>
          <div style={{ height: this.state.height-60, 'background-color': background_color, 'border-style': 'solid', 'border-color': this.state.theme['send_receive_ether_overlay_background'], 'border-radius': '1px 1px 0px 0px', 'border-width': '0px', 'box-shadow': '0px 0px 2px 1px '+this.state.theme['send_receive_ether_overlay_shadow'],'margin': '0px 0px 0px 0px', 'overflow-y':'auto'}}>  
            <DepthMintPage ref={this.depthmint_page} app_state={this.state} size={size} height={this.state.height} theme={this.state.theme} notify={this.prompt_top_notification.bind(this)} add_depthmint_to_stack={this.add_depthmint_to_stack.bind(this)}/>
          </div>
      </SwipeableBottomSheet>
    )
  }

  open_depthmint_bottomsheet(){
    if(this.state != null){
        this.setState({depthmint_bottomsheet: !this.state.depthmint_bottomsheet});
      }
  }

  show_depthmint_bottomsheet(token_item){
    if(this.depthmint_page.current != null){
      this.depthmint_page.current.set_token(token_item)
    }

    this.open_depthmint_bottomsheet()
  }

  add_depthmint_to_stack(state_obj){
    var stack_clone = this.state.stack_items.slice()      
    var edit_id = -1
    for(var i=0; i<stack_clone.length; i++){
      if(stack_clone[i].id == state_obj.id){
        edit_id = i
      }
    }
    if(edit_id != -1){
      stack_clone[edit_id] = state_obj
    }else{
      stack_clone.push(state_obj)
    }
    this.setState({stack_items: stack_clone})
    this.set_cookies_after_stack_action(stack_clone)
  }











  render_searched_account_bottomsheet(){
    var background_color = this.state.theme['send_receive_ether_background_color'];
    var size = this.getScreenSize();
    return(
      <SwipeableBottomSheet overflowHeight={0} marginTop={0} onChange={this.open_searched_account_bottomsheet.bind(this)} open={this.state.searched_account_bottomsheet} style={{'z-index':'5'}} bodyStyle={{'background-color': 'transparent'}} overlayStyle={{'background-color': this.state.theme['send_receive_ether_overlay_background'],'box-shadow': '0px 0px 0px 0px '+this.state.theme['send_receive_ether_overlay_shadow']}}>
          <div style={{ height: this.state.height-60, 'background-color': background_color, 'border-style': 'solid', 'border-color': this.state.theme['send_receive_ether_overlay_background'], 'border-radius': '1px 1px 0px 0px', 'border-width': '0px', 'box-shadow': '0px 0px 2px 1px '+this.state.theme['send_receive_ether_overlay_shadow'],'margin': '0px 0px 0px 0px', 'overflow-y':'auto'}}>  
            <SearchedAccountPage ref={this.searched_account_page} app_state={this.state} size={size} height={this.state.height} theme={this.state.theme} notify={this.prompt_top_notification.bind(this)} perform_searched_account_balance_search={this.perform_searched_account_balance_search.bind(this)}/>
          </div>
      </SwipeableBottomSheet>
    )
  }

  open_searched_account_bottomsheet(){
    if(this.state != null){
        this.setState({searched_account_bottomsheet: !this.state.searched_account_bottomsheet});
      }
  }

  when_searched_account_clicked(item, searched_id){
    if(this.searched_account_page.current != null){
      this.searched_account_page.current?.set_searched_item(item, searched_id)
    }

    this.open_searched_account_bottomsheet()
  }

  perform_searched_account_balance_search = async (exchange_id, id, e5) => {
    var balance = await this.get_balance_in_exchange(exchange_id, id, e5, this.state.addresses[e5])
    var clone = structuredClone(this.state.searched_account_exchange_balances);
    clone[exchange_id+id+e5] = balance
    this.setState({searched_account_exchange_balances: clone})
  }









  render_rpc_settings_bottomsheet(){
    var background_color = this.state.theme['send_receive_ether_background_color'];
    var size = this.getScreenSize();
    return(
      <SwipeableBottomSheet overflowHeight={0} marginTop={0} onChange={this.open_rpc_settings_bottomsheet.bind(this)} open={this.state.rpc_settings_bottomsheet} style={{'z-index':'5'}} bodyStyle={{'background-color': 'transparent'}} overlayStyle={{'background-color': this.state.theme['send_receive_ether_overlay_background'],'box-shadow': '0px 0px 0px 0px '+this.state.theme['send_receive_ether_overlay_shadow']}}>
          <div style={{ height: this.state.height-60, 'background-color': background_color, 'border-style': 'solid', 'border-color': this.state.theme['send_receive_ether_overlay_background'], 'border-radius': '1px 1px 0px 0px', 'border-width': '0px', 'box-shadow': '0px 0px 2px 1px '+this.state.theme['send_receive_ether_overlay_shadow'],'margin': '0px 0px 0px 0px', 'overflow-y':'auto'}}>
            <RPCSettingsPage ref={this.rpc_settings_page} app_state={this.state} size={size} height={this.state.height} theme={this.state.theme} notify={this.prompt_top_notification.bind(this)} add_rpc_url={this.add_rpc_url.bind(this)} when_rpc_tapped={this.when_rpc_tapped.bind(this)}/>
          </div>
      </SwipeableBottomSheet>
    )
  }

  open_rpc_settings_bottomsheet(){
    if(this.state != null){
        this.setState({rpc_settings_bottomsheet: !this.state.rpc_settings_bottomsheet});
      }
  }

  show_rpc_settings_bottomsheet(ether){
    if(this.rpc_settings_page.current != null){
      this.rpc_settings_page.current.set_ether(ether)
    }

    this.open_rpc_settings_bottomsheet()
  }



  add_rpc_url(url, ether){
    var clone = structuredClone(this.state.e5s)
    clone[ether['e5']].web3.push(url)

    var added_providers_clone = this.state.added_providers.slice()
    added_providers_clone.push([ether['e5'], url])
    this.setState({e5s: clone, added_providers: added_providers_clone})
    
    var me = this;
    setTimeout(function() {
        me.set_cookies()
    }, (1 * 1000));
  }

  when_rpc_tapped(url, index, ether){
    var clone = structuredClone(this.state.e5s)
    clone[ether['e5']].url = index
    this.setState({e5s: clone})

    var me = this;
    setTimeout(function() {
      me.set_cookies()
      me.start_get_accounts_for_specific_e5(false, ether['e5'])
    }, (1 * 1000));
  }

  load_rpc_times = async (e5) => {
    var items = this.state.e5s[e5].web3
    for(var i=0; i<items.length; i++){
      var url = items[i]
      const web3 = new Web3(url);
      var is_conn = await web3.eth.net.isListening()
      if(is_conn){
        var now = Date.now()
        await web3.eth.getBlockNumber()
        var time = Date.now() - now;
        var clone = structuredClone(this.state.rpc_times)
        clone[url] = ''+time+' milliseconds'
        this.setState({rpc_times: clone})
      }else{
        var clone = structuredClone(this.state.rpc_times)
        clone[url] = 'offline'
        this.setState({rpc_times: clone})
      }
    }

  }













  render_confirm_run_bottomsheet(){
    var background_color = this.state.theme['send_receive_ether_background_color'];
    var size = this.getScreenSize();
    return(
      <SwipeableBottomSheet overflowHeight={0} marginTop={0} onChange={this.open_confirm_run_bottomsheet.bind(this)} open={this.state.confirm_run_bottomsheet} style={{'z-index':'5'}} bodyStyle={{'background-color': 'transparent'}} overlayStyle={{'background-color': this.state.theme['send_receive_ether_overlay_background'],'box-shadow': '0px 0px 0px 0px '+this.state.theme['send_receive_ether_overlay_shadow']}}>
          <div style={{ height: this.state.height-90, 'background-color': background_color, 'border-style': 'solid', 'border-color': this.state.theme['send_receive_ether_overlay_background'], 'border-radius': '1px 1px 0px 0px', 'border-width': '0px', 'box-shadow': '0px 0px 2px 1px '+this.state.theme['send_receive_ether_overlay_shadow'],'margin': '0px 0px 0px 0px', 'overflow-y':'auto'}}>
            <ConfirmRunPage ref={this.confirm_run_page} app_state={this.state} size={size} height={this.state.height} theme={this.state.theme} notify={this.prompt_top_notification.bind(this)} start_run={this.start_run.bind(this)}/>
          </div>
      </SwipeableBottomSheet>
    )
  }

  open_confirm_run_bottomsheet(){
    if(this.state != null){
        this.setState({confirm_run_bottomsheet: !this.state.confirm_run_bottomsheet});
    }
  }

  show_confirm_run_bottomsheet(data){
    if(this.confirm_run_page.current != null){
      this.confirm_run_page.current.set_data(data)
    }

    this.open_confirm_run_bottomsheet()
  }

  start_run(){
    this.open_confirm_run_bottomsheet()
    if(this.stack_page.current != null){
      this.stack_page.current?.run_transactions(false)
    }
  }














  render_scan_code_bottomsheet(){
    var background_color = this.state.theme['send_receive_ether_background_color'];
    var size = this.getScreenSize();
    return(
      <SwipeableBottomSheet  overflowHeight={0} marginTop={0} onChange={this.open_scan_code_bottomsheet.bind(this)} open={this.state.scan_code_bottomsheet} style={{'z-index':'5'}} bodyStyle={{'background-color': 'transparent'}} overlayStyle={{'background-color': this.state.theme['send_receive_ether_overlay_background'],'box-shadow': '0px 0px 0px 0px '+this.state.theme['send_receive_ether_overlay_shadow']}}>
          <div style={{ height: 450, 'background-color': background_color, 'border-style': 'solid', 'border-color': this.state.theme['send_receive_ether_overlay_background'], 'border-radius': '1px 1px 0px 0px', 'border-width': '0px', 'box-shadow': '0px 0px 2px 1px '+this.state.theme['send_receive_ether_overlay_shadow'],'margin': '0px 0px 0px 0px', 'overflow-y':'auto'}}>  
            <ScanQrPage ref={this.scan_code_page} app_state={this.state} size={size} height={this.state.height} theme={this.state.theme} notify={this.prompt_top_notification.bind(this)} finish_scan={this.finish_scan.bind(this)}/>
          </div>
      </SwipeableBottomSheet>
    )
  }

  open_scan_code_bottomsheet(){
    if(this.state != null){
      this.setState({scan_code_bottomsheet: !this.state.scan_code_bottomsheet});
    }
  }

  show_scan_code_bottomsheet(option){
    if(this.scan_code_page.current != null){
      this.scan_code_page.current.set_page(option)
    }
    this.open_scan_code_bottomsheet()
  }

  start_scan(page){
    this.show_scan_code_bottomsheet(page)
  }

  finish_scan(data, page){
    this.open_scan_code_bottomsheet()
    if(page == 'clear_purchase_page'){
      if(this.clear_purchase_page.current != null){
        this.clear_purchase_page.current.set_scan_data(data)
      }
    }
    else if(page == 'send_receive_ether_page'){
      if(this.send_receive_ether_page.current != null){
        this.send_receive_ether_page.current.set_scan_data(data)
      }
    }
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

  show_images(images, pos){
    this.setState({view_images:images, view_images_pos: pos })
    this.open_view_image_bottomsheet()
  }

  /* fullscreen image rendered in bottomsheet when image item is tapped */
  render_view_image(){
    var images = this.state.view_images == null ? [] : this.state.view_images;
    var pos = this.state.view_images_pos == null ? 0 : this.state.view_images_pos;
    return(
      <div style={{'position': 'relative', height:'100%', width:'100%', 'background-color':'rgb(0, 0, 0,.9)','border-radius': '0px','display': 'flex', 'align-items':'center','justify-content':'center', 'margin':'0px 0px 0px 0px', 'text-align':'center'}}>
        <SwipeableViews index={pos}>
          {images.map((item, index) => ( 
            // <TransformWrapper>
            //   <TransformComponent>
            //     <img src={item} style={{height:'auto',width:'100%'}} />
            //   </TransformComponent>
            // </TransformWrapper>
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
          toastId:data,
          hideProgressBar: true,
          style:{'background-color':'transparent','box-shadow': '0px 0px 0px 0px #CECDCD', width:'auto'}
      });
  }


  /* renders the toast item used */
  render_toast_item(message){
    var width = this.state.width
    if(width > 400){
      width = 350
    }
    return (
          <div>
              <div style={{'background-color':this.state.theme['toast_background_color'], 'border-radius': '20px', 'box-shadow': '0px 0px 2px 1px '+this.state.theme['card_shadow_color'],'padding': '3px 3px 3px 3px','display': 'flex','flex-direction': 'row', width: width-40}}>
                  <div style={{'padding': '10px 0px 5px 5px','display': 'flex','align-items': 'center', height:35}}> 
                      <img src={this.state.theme['alert_icon']} style={{height:25,width:'auto','scale': '0.9'}} />
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
    // contractInstance.events['e4']({
    //   filter: { p1/* sender_account_id */: 1002 }
    // })
    // .on('data', event => {
    //   console.log('Event:', event);
      
    // })
    // .on('error', error => {
    //   console.error('Error-----------:', error);
    // });

    // var obj = {name:'hello world'}
    // var cid = await this.store_data_in_web3(JSON.stringify(obj))
    // console.log('---------------------load_e5_data-------------------------------')
    // console.log(cid)
    // var data = await this.fetch_objects_data_from_nft_storage(cid)
    // console.log(data)
    // const node = await IPFS.create()
    // var data = node.cat(cid)
    // console.log(data)

    this.get_browser_cache_size_limit()
    this.when_wallet_data_updated(['(32)'], 0, '', true)  
    
  }

  inc_synch_progress(){
    const steps = this.state.sync_steps;
    const incr_count = 100/steps;
    if(this.state.syncronizing_progress+incr_count >= 99 && this.state.should_keep_synchronizing_bottomsheet_open == true){
      this.prompt_top_notification('syncronized!', 500);
      this.setState({should_keep_synchronizing_bottomsheet_open: false})
    }
    this.setState({syncronizing_progress:this.state.syncronizing_progress+incr_count})

  }

  send_ether_to_target(recipientAddress, amount, gasPrice, state, e5){
    const web3 = new Web3(this.get_web3_url_from_e5(e5));
    const me = this;

    web3.eth.accounts.wallet.add(state.accounts[e5].privateKey);

    web3.eth.sendTransaction({
      from: state.accounts[e5].address,
      to: recipientAddress,
      value: amount.toString(),
      gas: 50000,
      gasPrice: gasPrice.toString() // Adjust gas price as needed
    }).on('transactionHash', function (hash) {
      me.start_get_accounts_data(false)
      me.prompt_top_notification('send complete!', 600)

    })
    .on('error', function (error) {
      console.error('Failed to send transaction:', error);
      if(error == 'Error: Invalid JSON RPC response: {}'){
        me.start_get_accounts_data(false)
        me.prompt_top_notification('send complete!', 15600)
      }else{
        me.prompt_top_notification('send failed, '+error, 16000)
      }
    });
  }


  when_wallet_data_updated(added_tags, set_salt, selected_item, is_synching){
    var seed = added_tags.join(' | ') + set_salt + selected_item;

    // const account = this.get_account_from_seed(seed, this.state.web3);
    // this.setState({account: account});
    // this.get_accounts_data(account, true, this.state.web3, this.state.e5_address)

    this.generate_account_for_each_e5(seed)
    var me = this
    setTimeout(function() {
        me.start_get_accounts_data(is_synching)
    }, (3 * 1000));

    if(selected_item != ''){
      this.setState({has_wallet_been_set: true})
    }
    
  }

  generate_account_for_each_e5(seed){
    var _accounts = {}
    for(var i=0; i<this.state.e5s['data'].length; i++){
      var e5 = this.state.e5s['data'][i]
      var web3_url = this.get_web3_url_from_e5(e5)
      var account = this.get_account_from_seed(seed, web3_url)
      _accounts[e5] = account
    }
    this.setState({accounts: _accounts})
  }

  get_account_from_seed(seed, web3_url){
    const web3 = new Web3(web3_url);
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

    try{
      const balance = await lotusClient.wallet.balance(myAddress);
      console.log('Wallet balance:', balance);
    }catch(e){
      console.log(e)
    }
    

    // this.send_filecoin(seed)
    // this.initialize_storage_deal(seed)
    this.store_data_in_web3('hello world!')
  }

  send_filecoin = async (seed) => {
    const provider = new HttpJsonRpcConnector({ url: 'https://api.node.glif.io', token: '' });
    const lotusClient = new LotusClient(provider);
    const hdDerivationPath = `m/44'/461'/0'/0/0`;
    const walletProvider = new MnemonicWalletProvider(lotusClient, seed, hdDerivationPath);

    const recipientAddress = 'f1vyte2sq5qcntdchamob3efvaapay5e4eebuwfty';
    const amount = '1000000000000'; // Amount in FIL (1 FIL = 1e18)
    const myAddress = await walletProvider.getDefaultAddress();

    console.log('walletProvider.address:---------------',myAddress)
    console.log(walletProvider)

    var privateKey = await walletProvider.getSigner().getPrivateKey(myAddress)
    console.log('private key: ---------------',privateKey);


    const nonce = await lotusClient.mpool.getNonce(myAddress);

    // Send the transaction
    const message = await walletProvider.createMessage({
      From: myAddress,
      To: recipientAddress,
      Value: amount.toString().toLocaleString('fullwide', {useGrouping:false}),
      GasPrice: '1000000000',
      GasLimit: 900000,
      gasPremium: 17768082,
      GasFeeCap:17768082,
      Nonce: nonce,
    });

    try{
      const cid = await walletProvider.sendSignedMessage(
        await walletProvider.signMessage(message)
      );
      console.log('Transaction CID:', cid);
    }catch(e){
      console.log(e)
    }




    

  }

  initialize_storage_deal = async (seed) => {
    const provider = new HttpJsonRpcConnector({ url: 'https://api.node.glif.io/rpc/v0', token: '' });
    const lotusClient = new LotusClient(provider);
    const hdDerivationPath = `m/44'/461'/0'/0/0`;
    const walletProvider = new MnemonicWalletProvider(lotusClient, seed, hdDerivationPath);

    const myAddress = await walletProvider.getDefaultAddress();

    console.log('walletProvider.address:---------------',myAddress)
    console.log(walletProvider)

    var privateKey = await walletProvider.getSigner().getPrivateKey(myAddress)
    console.log('private key: ---------------',privateKey);

    const minerAddress = 'f01393827';
    const data = 'Hello, Filecoin!';

    // const userKey = WalletKey.fromPrivateKey(Buffer.from(privateKey, 'hex'));

    const storageDealParams = {
      Data: data,
      Wallet: myAddress,
      Miner: minerAddress, // Replace with the miner's address
      StartEpoch: -1, // Use -1 to start the deal ASAP
      EndEpoch: 0,
    }
    const signedProposal = await lotusClient.wallet.signMessage(storageDealParams);
    const dealCid = await lotusClient.client.import()
    console.log('Storage Deal Proposal CID:', dealCid);
    
    // const dealInfo = await walletProvider.client.startDeal();
    // console.log('Storage Deal CID:', dealInfo.ProposalCid);

  }

  

  //unused
  get_transaction_history = async (account) => {
    const web3 = new Web3(this.get_selected_web3_url());
    
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





  get_browser_cache_size_limit(){
        if (localStorage && !localStorage.getItem('size')) {
            var i = 0;
            try {
                // Test up to 10 MB
                for (i = 250; i <= 10000; i += 250) {
                    localStorage.setItem('test', new Array((i * 1024) + 1).join('a'));
                }
            } catch (e) {
                localStorage.removeItem('test');
                localStorage.setItem('size', i - 250);            
            }
        }
        return localStorage.getItem('size')
  }

  start_get_accounts_data = async (is_synching) => {
    for(var i=0; i<this.state.e5s['data'].length; i++){
      var e5 = this.state.e5s['data'][i]
      this.start_get_accounts_for_specific_e5(is_synching, e5)
    }
  }

  start_get_accounts_for_specific_e5 = async (is_syncing, e5) =>{
    var web3_url = this.get_web3_url_from_e5(e5)
    var e5_address = this.state.e5s[e5].e5_address;
    var account_for_e5 = this.state.accounts[e5]
    if(web3_url != ''){
      this.get_wallet_data(account_for_e5, is_syncing, web3_url, e5_address, e5)
      if(this.get_contract_from_e5(e5) != ''){
        this.get_all_events_from_e5(account_for_e5, is_syncing, web3_url, e5_address, e5)
      }
    }else{
      console.log(e5, ' e5 missing web3_url')
    }
  }

  load_all_event_data = async (_web3, contract_instance, event_id, e5, filter, starting_block) => {
    var web3 = this.get_web3_instance_from_e5(e5)
    var latest = await web3.eth.getBlockNumber()
    var events = []
    var iteration = this.get_iteration(e5)
    if(this.log_directory == null) this.log_directory = {}
    
    if(latest - starting_block < iteration){
      events = await contract_instance.getPastEvents(event_id, { fromBlock: starting_block, toBlock: 'latest' }, (error, events) => {});
    }
    else{
      var pos = starting_block
      while (pos < latest) {
        await this.wait(this.state.web3_delay)
        var to = pos+iteration < latest ? pos+iteration : latest
        var from = pos
        var id = contract_instance['_address'] + e5 + event_id + JSON.stringify(filter) + from + to

        if(this.log_directory[id] != null){
          events = this.log_directory[id]
        }
        else{
          await this.wait(this.state.web3_delay)
          events = events.concat(await contract_instance.getPastEvents(event_id, { fromBlock: from, toBlock: to }, (error, events) => {}))
          this.log_directory[id] = events
        }
        pos = to+1
      }
    }

    if(this.from == null) this.from = {}
    this.from[e5] = latest

    return events
  }

  load_event_data = async (_web3, contract_instance, event_id, e5, filter) => {
    var focused_events = this.e5_events[e5]

    if(contract_instance['_address'] == this.e5_contract_addresses[e5][1]){
      focused_events = this.e52_events[e5]
    }
    else if(contract_instance['_address'] == this.e5_contract_addresses[e5][2]){
      focused_events = this.f5_events[e5]
    }
    else if(contract_instance['_address'] == this.e5_contract_addresses[e5][3]){
      focused_events = this.g5_events[e5]
    }
    else if(contract_instance['_address'] == this.e5_contract_addresses[e5][4]){
      focused_events = this.g52_events[e5]
    }
    else if(contract_instance['_address'] == this.e5_contract_addresses[e5][5]){
      focused_events = this.h5_events[e5]
    }
    else if(contract_instance['_address'] == this.e5_contract_addresses[e5][6]){
      focused_events = this.h52_events[e5]
    }

    var filtered_events = []
    focused_events.forEach(event => {
      var accepted = true
      if(event['event'] != event_id){
        accepted = false
      }

      for (const key in filter) {
        if(event['returnValues'][key] != filter[key]){
          accepted = false
        }
      }
      if(accepted){
        filtered_events.push(event)
      }
    });


    return filtered_events
  }

  get_all_events_from_e5 = async (_account, is_syncing, web3_url, e5_address, e5) => {
    const web3 = new Web3(web3_url);
    const contractArtifact = require('./contract_abis/E5.json');
    const contractAddress = e5_address
    const contractInstance = new web3.eth.Contract(contractArtifact.abi, contractAddress);
    const address_account = _account

    var contract_addresses_events = await contractInstance.getPastEvents('e7', { fromBlock: this.get_first_block(e5), toBlock: this.get_first_block(e5)+20 }, (error, events) => {})
    var contract_addresses = contract_addresses_events[0].returnValues.p5
    if(this.e5_contract_addresses == null) this.e5_contract_addresses = {}
    this.e5_contract_addresses[e5] = contract_addresses

    const E52contractArtifact = require('./contract_abis/E52.json');
    const E52_address = contract_addresses[1];
    const E52contractInstance = new web3.eth.Contract(E52contractArtifact.abi, E52_address);

    const F5contractArtifact = require('./contract_abis/F5.json');
    const F5_address = contract_addresses[2];
    const F5contractInstance = new web3.eth.Contract(F5contractArtifact.abi, F5_address);

    const G5contractArtifact = require('./contract_abis/G5.json');
    const G5_address = contract_addresses[3];
    const G5contractInstance = new web3.eth.Contract(G5contractArtifact.abi, G5_address);

    const G52contractArtifact = require('./contract_abis/G52.json');
    const G52_address = contract_addresses[4];
    const G52contractInstance = new web3.eth.Contract(G52contractArtifact.abi, G52_address);


    const H5contractArtifact = require('./contract_abis/H5.json');
    const H5_address = contract_addresses[5];
    const H5contractInstance = new web3.eth.Contract(H5contractArtifact.abi, H5_address);

    const H52contractArtifact = require('./contract_abis/H52.json');
    const H52_address = contract_addresses[6];
    const H52contractInstance = new web3.eth.Contract(H52contractArtifact.abi, H52_address);

    if(this.from == null) this.from = {}
    var from = this.from[e5] == null ? this.get_first_block(e5) : this.from[e5] + 1
    
    var all_e5_events = await this.load_all_event_data(web3, contractInstance, 'allEvents', e5, {}, from) 
    if(is_syncing){
      this.inc_synch_progress()
    }
    await this.wait(this.state.web3_delay)
    var all_e52_events = await this.load_all_event_data(web3, E52contractInstance, 'allEvents', e5, {}, from)
    if(is_syncing){
      this.inc_synch_progress()
    }
    await this.wait(this.state.web3_delay)
    var all_f5_events = await this.load_all_event_data(web3, F5contractInstance, 'allEvents', e5, {}, from)
    if(is_syncing){
      this.inc_synch_progress()
    }
    await this.wait(this.state.web3_delay)
    var all_g5_events = await this.load_all_event_data(web3, G5contractInstance, 'allEvents', e5, {}, from)
    if(is_syncing){
      this.inc_synch_progress()
    }
    await this.wait(this.state.web3_delay)
    var all_g52_events = await this.load_all_event_data(web3, G52contractInstance, 'allEvents', e5, {}, from)
    if(is_syncing){
      this.inc_synch_progress()
    }
    await this.wait(this.state.web3_delay)
    var all_h5_events = await this.load_all_event_data(web3, H5contractInstance, 'allEvents', e5, {}, from)
    if(is_syncing){
      this.inc_synch_progress()
    }
    await this.wait(this.state.web3_delay)
    var all_h52_events = await this.load_all_event_data(web3, H52contractInstance, 'allEvents', e5, {}, from)
    if(is_syncing){
      this.inc_synch_progress()
    }
    await this.wait(this.state.web3_delay)
    console.log('loaded h52: ',e5, ' events')
    console.log('getting account data for ',e5)

    if(this.e5_events == null) this.e5_events = {}
    if(this.e52_events == null) this.e52_events = {}
    if(this.f5_events == null) this.f5_events = {}
    if(this.g5_events == null) this.g5_events = {}
    if(this.g52_events == null) this.g52_events = {}
    if(this.h5_events == null) this.h5_events = {}
    if(this.h52_events == null) this.h52_events = {}

    if(this.e5_events[e5] == null) this.e5_events[e5] = []
    if(this.e52_events[e5] == null) this.e52_events[e5] = []
    if(this.f5_events[e5] == null) this.f5_events[e5] = []
    if(this.g5_events[e5] == null) this.g5_events[e5] = []
    if(this.g52_events[e5] == null) this.g52_events[e5] = []
    if(this.h5_events[e5] == null) this.h5_events[e5] = []
    if(this.h52_events[e5] == null) this.h52_events[e5] = []

    all_e5_events.forEach(element => {
      this.e5_events[e5].push(element)
    });
    all_e52_events.forEach(element => {
      this.e52_events[e5].push(element)
    });
    all_f5_events.forEach(element => {
      this.f5_events[e5].push(element)
    });
    all_g5_events.forEach(element => {
      this.g5_events[e5].push(element)
    });
    all_g52_events.forEach(element => {
      this.g52_events[e5].push(element)
    });
    all_h5_events.forEach(element => {
      this.h5_events[e5].push(element)
    });
    all_h52_events.forEach(element => {
      this.h52_events[e5].push(element)
    });

    this.set_cookies()
    this.get_accounts_data(_account, is_syncing, web3_url, e5_address, e5)
  }






  get_wallet_data_for_specific_e5(e5){
    this.prompt_top_notification('updating your wallets balance...', 2000)
    var web3_url = this.get_web3_url_from_e5(e5)
    var account_for_e5 = this.state.accounts[e5]
    this.get_wallet_data(account_for_e5, false, web3_url, null, e5)
  }

  get_wallet_data = async (_account, is_syncing, web3_url, e5_address, e5) => {
    const web3 = new Web3(web3_url);
    const address_account = _account

    this.load_rpc_times(e5)

    var clone = structuredClone(this.state.account_balance)
    clone[e5] = 0
    if(clone[e5] == null)this.setState({account_balance: clone});

    var balance = await web3.eth.getBalance(address_account.address)
    var clone = structuredClone(this.state.account_balance)
    clone[e5] = parseInt(balance)
    this.setState({account_balance: clone});
    console.log('-----------------get_wallet_data------------------------')
    console.log(e5,' account ether balance: ',balance)

    this.load_ether_history(e5, address_account.address)

    var gasPrice = await web3.eth.getGasPrice();
    var clone = structuredClone(this.state.gas_price)
    clone[e5] = parseInt(gasPrice)
    this.setState({gas_price: clone})
    console.log('-----------------get_wallet_data------------------------')
    console.log(e5,' gas price: ',gasPrice)

    var id = await web3.eth.net.getId()
    var clone = structuredClone(this.state.chain_id)
    clone[e5] = id
    this.setState({chain_id: clone});
    if(is_syncing)this.inc_synch_progress()
    await this.wait(this.state.web3_delay)


    // var peers = await web3.eth.net.getPeerCount()
    // var clone = structuredClone(this.state.number_of_peers)
    // clone[e5] = parseInt(peers)
    // this.setState({ number_of_peers: clone});
    // console.log('number of peers: ', peers)
    // this.inc_synch_progress()

    var blockNumber = await web3.eth.getBlockNumber()
    await this.wait(this.state.web3_delay)
    var last_blocks = [];
    var count = 5
    var start = parseInt(blockNumber)-count;
    if(blockNumber < count){
      start = 0;
    }
    for (let i = start; i <= blockNumber; i++) {
      await this.wait(this.state.web3_delay)
      var block = await web3.eth.getBlock(i)
      last_blocks.push(block)
    }

    var last_blocks_clone = structuredClone(this.state.last_blocks)
    last_blocks_clone[e5] = last_blocks

    var number_of_blocks_clone = structuredClone(this.state.number_of_blocks)
    number_of_blocks_clone[e5] = blockNumber
    this.setState({last_blocks: last_blocks_clone, number_of_blocks: number_of_blocks_clone});
    if(is_syncing)this.inc_synch_progress()



    var mempool = await web3.eth.getPendingTransactions()
    var mempool_clone = structuredClone(this.state.mempool)
    mempool_clone[e5] = mempool
    this.setState({mempool: mempool_clone})

  } 

  //here
  get_accounts_data = async (_account, is_syncing, web3_url, e5_address, e5) => {
    const web3 = new Web3(web3_url);
    const contractArtifact = require('./contract_abis/E5.json');
    const contractAddress = e5_address
    const contractInstance = new web3.eth.Contract(contractArtifact.abi, contractAddress);
    const address_account = _account


    /* ---------------------------------------- CONTRACT ADDRESSES -------------------------------------- */
    var contract_addresses_events = await contractInstance.getPastEvents('e7', { fromBlock: this.get_first_block(e5), toBlock: this.get_first_block(e5)+50 }, (error, events) => {})
    var contract_addresses = contract_addresses_events[0].returnValues.p5
    var addresses_clone = structuredClone(this.state.addresses)
    addresses_clone[e5] = contract_addresses
    this.setState({addresses: addresses_clone})

    if(is_syncing){
      this.inc_synch_progress()
    }


    const E52contractArtifact = require('./contract_abis/E52.json');
    const E52_address = contract_addresses[1];
    const E52contractInstance = new web3.eth.Contract(E52contractArtifact.abi, E52_address);

    


    /* ---------------------------------------- ACCOUNT DATA ------------------------------------------- */
    var accounts = await contractInstance.methods.f167([],[address_account.address], 2).call((error, result) => {});
    console.log('account id----------------',accounts[0], 'for e5 ',e5)
    var account = accounts[0] == 0 ? 1 : accounts[0]

    var clone = structuredClone(this.state.user_account_id)
    clone[e5] = account
    this.setState({user_account_id: clone})

    if(is_syncing){
      this.inc_synch_progress()
    }





    /* ---------------------------------------- BALANCE DATA -------------------------------------- */
    await this.load_e5_balance_data(web3, contractInstance, account, e5, contract_addresses);
    this.load_pending_withdraw_event_data(web3, contractInstance, account, e5, contract_addresses)
    if(is_syncing){
      this.inc_synch_progress()
    }




    /* ---------------------------------------- EVENT DATA ------------------------------------------- */
    this.load_all_e5_runs_data(web3, contractInstance, e5, account)
    this.load_my_e5_runs_data(web3, contractInstance, e5, account)

    // if(is_syncing){
    //   this.inc_synch_progress()
    // }






    /* ---------------------------------------- CONTACTS DATA------------------------------------------- */
    this.get_contacts_data(web3, E52contractInstance, e5, account)
    // if(is_syncing){
    //   this.inc_synch_progress()
    // }








    /* ---------------------------------------- BLOCKED ACCOUNTS DATA ------------------------------------------- */
    this.get_blocked_accounts_data(web3, E52contractInstance, e5, account)
    // if(is_syncing){
    //   this.inc_synch_progress()
    // }








    /* ---------------------------------------- SECTION TAGS DATA ------------------------------------------- */
    this.get_section_tags_data(web3, E52contractInstance, e5, account)
    // if(is_syncing){
    //   this.inc_synch_progress()
    // }








    /* ---------------------------------------- ALIAS DATA------------------------------------------- */
    this.get_alias_data(E52contractInstance, e5, account, web3);
    // if(is_syncing){
    //   this.inc_synch_progress()
    // }






    /* ---------------------------------------- SUBSCRIPTION DATA ------------------------------------------- */
    const F5contractArtifact = require('./contract_abis/F5.json');
    const F5_address = contract_addresses[2];
    const F5contractInstance = new web3.eth.Contract(F5contractArtifact.abi, F5_address);

    this.get_subscription_data(contractInstance, F5contractInstance, account, web3, e5, contract_addresses, E52contractInstance)
    // if(is_syncing){
    //   this.inc_synch_progress()
    // }




    /* ---------------------------------------- CONTRACT DATA ------------------------------------------- */
    const G5contractArtifact = require('./contract_abis/G5.json');
    const G5_address = contract_addresses[3];
    const G5contractInstance = new web3.eth.Contract(G5contractArtifact.abi, G5_address);

    const G52contractArtifact = require('./contract_abis/G52.json');
    const G52_address = contract_addresses[4];
    const G52contractInstance = new web3.eth.Contract(G52contractArtifact.abi, G52_address);

    this.get_contract_data(contractInstance, account, G5contractInstance, G52contractInstance, web3, e5, contract_addresses, E52contractInstance)
    // if(is_syncing){
    //   this.inc_synch_progress()
    // }





    /* ---------------------------------------- PROPOSAL DATA ------------------------------------------- */
    this.get_proposal_data(G52contractInstance, G5contractInstance, E52contractInstance, web3, e5, contract_addresses, account)
    // if(is_syncing){
    //   this.inc_synch_progress()
    // }




    /* ---------------------------------------- TOKEN DATA ------------------------------------------- */
    const H5contractArtifact = require('./contract_abis/H5.json');
    const H5_address = contract_addresses[5];
    const H5contractInstance = new web3.eth.Contract(H5contractArtifact.abi, H5_address);

    const H52contractArtifact = require('./contract_abis/H52.json');
    const H52_address = contract_addresses[6];
    const H52contractInstance = new web3.eth.Contract(H52contractArtifact.abi, H52_address);

    this.get_token_data(contractInstance, H5contractInstance, H52contractInstance, E52contractInstance, web3, e5, contract_addresses, account)
    // if(is_syncing){
    //   this.inc_synch_progress()
    // }





    /* ---------------------------------------- POST DATA ------------------------------------------- */
    this.get_post_data(E52contractInstance, web3, e5, contract_addresses)
    // if(is_syncing){
    //   this.inc_synch_progress()
    // }

    /* ---------------------------------------- CHANNEL DATA ------------------------------------------- */
    this.get_channel_data(E52contractInstance, web3, e5, contract_addresses, account)
    // if(is_syncing){
    //   this.inc_synch_progress()
    // }

    /* ---------------------------------------- JOB DATA ------------------------------------------- */
    this.get_job_data(E52contractInstance, web3, e5, contract_addresses, account)
    // if(is_syncing){
    //   this.inc_synch_progress()
    // }

    /* ---------------------------------------- MAIL DATA ------------------------------------------- */
    this.get_sent_mail_data(E52contractInstance, e5, account, web3)
    // if(is_syncing){
    //   this.inc_synch_progress()
    // }
    
    this.get_received_mail_data(E52contractInstance, e5, account, web3);
    // if(is_syncing){
    //   this.inc_synch_progress()
    // }

    /* ---------------------------------------- STOREFRONT DATA ------------------------------------------- */  
    this.get_storefront_data(E52contractInstance, web3, e5, contract_addresses)
    // if(is_syncing){
    //   this.inc_synch_progress()
    // }

    /* ---------------------------------------- BAG DATA ------------------------------------------- */
    this.get_bag_data(contractInstance, web3, e5, contract_addresses )
    // if(is_syncing){
    //   this.inc_synch_progress()
    // }

    /* ---------------------------------------- CONTRACTOR DATA ------------------------------------------- */
    this.get_contractor_data(E52contractInstance, contract_addresses, e5, web3)
    // if(is_syncing){
    //   this.inc_synch_progress()
    // }

    this.load_run_data(contractInstance, E52contractInstance, e5, web3)


    // this.get_total_supply_of_ether(e5)

    console.log('done setting up loading data for ',e5)
    /* ---------------------------------------- ------------------------------------------- */
    /* ---------------------------------------- ------------------------------------------- */
    /* ---------------------------------------- ------------------------------------------- */
    /* ---------------------------------------- ------------------------------------------- */
  }

  load_all_e5_runs_data = async (web3, contractInstance, e5, account) => {
    var events = await this.load_event_data(web3, contractInstance, 'e4', e5, {})
    events = events.reverse()
    var clone = structuredClone(this.state.all_E5_runs)
    clone[e5] = events
    this.setState({all_E5_runs: clone});
  }

  load_my_e5_runs_data = async (web3, contractInstance, e5, account) => {
    var events = await this.load_event_data(web3, contractInstance, 'e4', e5, {p1/* sender_account_id */: account})
    events = events.reverse()
    var clone = structuredClone(this.state.E5_runs)
    clone[e5] = events
    this.setState({E5_runs: clone});
  }

  load_e5_balance_data = async (web3, contractInstance, account, e5, contract_addresses) => {
    var withdraw_balance = await contractInstance.methods.f167([account], [], 1).call((error, result) => {});
    var clone = structuredClone(this.state.withdraw_balance)
    clone[e5] = withdraw_balance[0]
    this.setState({withdraw_balance: clone})
    console.log('withdraw balance for e5: ',e5,' : ',withdraw_balance[0])

    var basic_transaction_data = await contractInstance.methods.f287([account]).call((error, result) => {});
    var clone = structuredClone(this.state.basic_transaction_data)
    clone[e5] = basic_transaction_data[0]
    this.setState({basic_transaction_data: clone})
    console.log('basic transaction data for e5: ',e5,' : ',basic_transaction_data[0])

    var E5_balance = await contractInstance.methods.f147(1).call((error, result) => {});
    var clone = structuredClone(this.state.E5_balance)
    clone[e5] = E5_balance
    this.setState({E5_balance: clone})
    console.log('E5 balance for e5: ',e5,' : ',E5_balance)


    var end_balance_of_E5 = await this.get_balance_in_exchange(3, 2, e5, contract_addresses)
    var spend_balance_of_E5 = await this.get_balance_in_exchange(5, 2, e5, contract_addresses)
    var end_balance_of_burn_account = await this.get_balance_in_exchange(3, 0, e5, contract_addresses)

    var end_balance_of_E5_clone = structuredClone(this.state.end_balance_of_E5)
    end_balance_of_E5_clone[e5] = end_balance_of_E5

    var spend_balance_of_E5_clone = structuredClone(this.state.spend_balance_of_E5)
    spend_balance_of_E5_clone[e5] = spend_balance_of_E5

    var end_balance_of_burn_account_clone = structuredClone(this.state.end_balance_of_burn_account)
    end_balance_of_burn_account_clone[e5] = end_balance_of_burn_account

    this.setState({end_balance_of_E5:end_balance_of_E5_clone, spend_balance_of_E5:spend_balance_of_E5_clone, end_balance_of_burn_account: end_balance_of_burn_account_clone})

  }

  load_pending_withdraw_event_data = async (web3, contractInstance, account, e5, contract_addresses) => {
    var withdraw_event_data = await this.load_event_data(web3, contractInstance, 'e2', e5, {p1/* sender_account_id */: account})

    var pending_withdraw_event_data = await this.load_event_data(web3, contractInstance, 'e3', e5, {p1/* receiver_account_id */: account})

    var withdraw_clone = structuredClone(this.state.withdraw_event_data)
    withdraw_clone[e5] = withdraw_event_data

    var pending_withdraw_clone = structuredClone(this.state.pending_withdraw_event_data)
    pending_withdraw_clone[e5] = pending_withdraw_event_data

    this.setState({withdraw_event_data: withdraw_clone, pending_withdraw_event_data: pending_withdraw_clone})
  }

  get_contacts_data = async (web3, E52contractInstance, e5, account) => {
    var contacts_data = await this.load_event_data(web3, E52contractInstance, 'e4', e5, {p1/* target_id */: account, p3/* context */:1})

    if(contacts_data.length > 0){
      var latest_event = contacts_data[contacts_data.length - 1];
      var contacts_data = await this.fetch_objects_data_from_ipfs_using_option(latest_event.returnValues.p4) 
      var contacts = contacts_data['contacts']

      console.log('loaded contacts for e5: ',e5,' : ',contacts.length)
      console.log(contacts)
      
      var clone = structuredClone(this.state.contacts)
      var existing_contacts = clone[e5]
      if(existing_contacts == null){
        existing_contacts = []
      }
      clone[e5] = this.combine_contacts(existing_contacts, contacts)
      if(!this.state.should_update_contacts_onchain){
        this.setState({contacts: clone})
      }
    }else{
      console.log('loaded no contacts')
      var clone = structuredClone(this.state.contacts)
      var existing_contacts = clone[e5]
      if(existing_contacts == null){
        existing_contacts = []
      }
      clone[e5] = this.combine_contacts(existing_contacts, [])
      if(!this.state.should_update_contacts_onchain) this.setState({contacts: clone})
    }
  }

  get_blocked_accounts_data = async (web3, E52contractInstance, e5, account) => {
    var blocked_contacts_data = await this.load_event_data(web3, E52contractInstance, 'e4', e5, {p1/* target_id */: account, p3/* context */:2})

    if(blocked_contacts_data.length > 0){
      var latest_event = blocked_contacts_data[blocked_contacts_data.length - 1];
      var blocked_contacts_data = await this.fetch_objects_data_from_ipfs_using_option(latest_event.returnValues.p4) 
      var loaded_blocked_accounts = blocked_contacts_data['blocked_accounts']

      console.log('loaded blocked accounts for e5: ',e5,' : ',loaded_blocked_accounts.length)
      console.log(loaded_blocked_accounts)
      
      var clone = structuredClone(this.state.blocked_accounts)
      var existing_blocked_accounts = clone[e5]
      if(existing_blocked_accounts == null){
        existing_blocked_accounts = []
      }
      clone[e5] = this.combine_contacts(existing_blocked_accounts, loaded_blocked_accounts)
      if(!this.state.should_update_blocked_accounts_onchain){
        this.setState({blocked_accounts: clone})
        console.log('setting blocked accounts from chain')
      }
    }else{
      console.log('loaded no blocked accounts')
      var clone = structuredClone(this.state.blocked_accounts)
      var existing_blocked_accounts = clone[e5]
      if(existing_blocked_accounts == null){
        existing_blocked_accounts = []
      }
      clone[e5] = this.combine_contacts(existing_blocked_accounts, [])
      if(!this.state.should_update_blocked_accounts_onchain){
        this.setState({blocked_accounts: clone})
        console.log('setting blocked accounts from chain')
      }else{
        console.log('not setting blocked accounts from chain')
      }
    }
  }

  get_section_tags_data = async (web3, E52contractInstance, e5, account) => {
    var section_tags_data_events = await this.load_event_data(web3, E52contractInstance, 'e4', e5, {p1/* target_id */: account, p3/* context */:3})


    if(section_tags_data_events.length != 0){
      var latest_event = section_tags_data_events[section_tags_data_events.length - 1];
      var section_tag_data = await this.fetch_objects_data_from_ipfs_using_option(latest_event.returnValues.p4) 
      var job_section_tags = section_tag_data['job_section_tags']
      var explore_section_tags = section_tag_data['explore_section_tags']
      
      if(!this.state.should_update_section_tags_onchain){
        this.setState({job_section_tags: job_section_tags, explore_section_tags: explore_section_tags})
      }
    }
  }

  //here
  load_ether_history = async (e5, address) =>{
    if(address.toString() == '0xB5195BA86F7a2D6AE1bFE15129Dbc9202f04B4c1') return;
    console.log('loading ether history from e5: ',e5)
    var link = ''
    var body = {}
    var e5_address_obj = {}

    if(e5 == 'E35'){
      // link = `https://etc.blockscout.com/api/v2/addresses/${address}/transactions&apikey=${process.env.REACT_APP_BLOCKSCOUT_API_KEY}`
      link = `https://etc.blockscout.com/api/v2/addresses/${address}/transactions`
      try {
        const response = await fetch(link);
        if (!response.ok) {
          throw new Error(`Failed to retrieve ${e5} address tx history data. Status: ${response}`);
        }
        const data = await response.text();
        e5_address_obj = JSON.parse(data);
      } catch (error) {
        console.log('Error fetching data: ', error)
      }
    }
    else if(e5 == 'E25'){
      // link = `https://etc.blockscout.com/api/v2/addresses/${address}/transactions&apikey=${process.env.REACT_APP_BLOCKSCOUT_API_KEY}`
      link = `https://etc.blockscout.com/api/v2/addresses/${address}/transactions`
      try {
        const response = await fetch(link);
        if (!response.ok) {
          throw new Error(`Failed to retrieve ${e5} address tx history data. Status: ${response}`);
        }
        const data = await response.text();
        e5_address_obj = JSON.parse(data);
      } catch (error) {
        console.log('Error fetching data: ', error)
      }
    }
    else if(e5 == 'E45'){
      try {
        const response = await fetch('https://api.harmony.one', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'jsonrpc': '2.0',
            'method': 'hmyv2_getTransactionsHistory',
            'params': [
              {
                'address': toBech32(address),
                'pageIndex': 0,
                'pageSize': 1000,
                'fullTx': true,
                'txType': 'ALL',
                'order': 'DESC'
              }
            ],
            'id': 1
          })
        });
        if (!response.ok) {
          throw new Error(`Failed to retrieve ${e5} address tx history data. Status: ${response}`);
        }
        const data = await response.text();
        e5_address_obj = JSON.parse(data);
        console.log('------------------------load_ether_history---------------------------')
        console.log(toBech32(address))
        console.log(e5_address_obj)
      } catch (error) {
        console.log('Error fetching data: ', error)
      }
    }
    else if(e5 == 'E55'){
      link = `https://explorer.celo.org/mainnet/api?module=account&action=tokentx&address=${address}`
      try {
        const response = await fetch(link);
        if (!response.ok) {
          throw new Error(`Failed to retrieve ${e5} address tx history data. Status: ${response}`);
        }
        const data = await response.text();
        e5_address_obj = JSON.parse(data);
        console.log('-------------------------------------E55:load_ether_history----------------------------------------')
        console.log(e5_address_obj)
        console.log(address)
      } catch (error) {
        console.log('Error fetching data: ', error)
      }
    }
    else if(e5 == 'E65'){
      link = `https://flare-explorer.flare.network/api?module=account&action=txlist&address=${address}`
      try {
        const response = await fetch(link);
        if (!response.ok) {
          throw new Error(`Failed to retrieve ${e5} address tx history data. Status: ${response}`);
        }
        const data = await response.text();
        e5_address_obj = JSON.parse(data);
        console.log('-------------------------------------E65:load_ether_history----------------------------------------')
        console.log(e5_address_obj)
        console.log(address)
      } catch (error) {
        console.log('Error fetching data: ', error)
      }
    }
    else if(e5 == 'E75'){
      var key = ''+process.env.REACT_APP_GNOSIS_API_KEY
      // link = `https://gnosis.blockscout.com/api/v2/addresses/${address}/transactions`
      link = `https://api.gnosisscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort=desc&apikey=${key}`
      try {
        const response = await fetch(link);
        if (!response.ok) {
          throw new Error(`Failed to retrieve ${e5} address tx history data. Status: ${response}`);
        }
        const data = await response.text();
        e5_address_obj = JSON.parse(data);
        console.log('-------------------------------------E75:load_ether_history----------------------------------------')
        console.log(e5_address_obj)
        console.log(address)
      } catch (error) {
        console.log('Error fetching data: ', error)
      }
    }
    else if(e5 == 'E85'){
      link = `https://explorer.fuse.io/api/v2/addresses/${address}/transactions`
      try {
        const response = await fetch(link);
        if (!response.ok) {
          throw new Error(`Failed to retrieve ${e5} address tx history data. Status: ${response}`);
        }
        const data = await response.text();
        e5_address_obj = JSON.parse(data);
        console.log('-------------------------------------E85:load_ether_history----------------------------------------')
        console.log(e5_address_obj)
        console.log(address)
      } catch (error) {
        console.log('Error fetching data: ', error)
      }
    }
    else if(e5 == 'E95'){
      var key = ''+process.env.REACT_APP_MOONBEAM_API_KEY
      link = `https://api-moonbeam.moonscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=latest&page=1&offset=10&sort=desc&apikey=${key}`
      try {
        const response = await fetch(link);
        if (!response.ok) {
          throw new Error(`Failed to retrieve ${e5} address tx history data. Status: ${response}`);
        }
        const data = await response.text();
        e5_address_obj = JSON.parse(data);
        console.log('-------------------------------------E95:load_ether_history----------------------------------------')
        console.log(e5_address_obj)
        console.log(address)
      } catch (error) {
        console.log('Error fetching data: ', error)
      }
    }
    else if(e5 == 'E105'){
      var key = ''+process.env.REACT_APP_MOONRIVER_API_KEY
      link = `https://api-moonriver.moonscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=2&sort=desc&apikey=${key}`

      try {
        const response = await fetch(link);
        if (!response.ok) {
          throw new Error(`Failed to retrieve ${e5} address tx history data. Status: ${response}`);
        }
        const data = await response.text();
        e5_address_obj = JSON.parse(data);
        console.log('-----------------------------------E105:load_ether_history--------------------------------------')
        console.log(e5_address_obj)
        console.log(address)
      } catch (error) {
        console.log('Error fetching data: ', error)
      }
    }
    else if(e5 == 'E125'){
      var key = ''+process.env.REACT_APP_POLYGONSCAN_API_KEY
      link = `https://api.polygonscan.com/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort=desc&apikey=${key}`
      try {
        const response = await fetch(link);
        if (!response.ok) {
          throw new Error(`Failed to retrieve ${e5} address tx history data. Status: ${response}`);
        }
        const data = await response.text();
        e5_address_obj = JSON.parse(data);
        console.log('-----------------------------------E125:load_ether_history--------------------------------------')
        console.log(e5_address_obj)
        console.log(address)
      } catch (error) {
        console.log('Error fetching data: ', error)
      }
    }
    else if(e5 == 'E135'){
      var key = ''+process.env.REACT_APP_BINANCE_API_KEY
      link = `https://api.bscscan.com/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort=desc&apikey=${key}`
      try {
        const response = await fetch(link);
        if (!response.ok) {
          throw new Error(`Failed to retrieve ${e5} address tx history data. Status: ${response}`);
        }
        const data = await response.text();
        e5_address_obj = JSON.parse(data);
        console.log('-----------------------------------E135:load_ether_history--------------------------------------')
        console.log(e5_address_obj)
        console.log(address)
      } catch (error) {
        console.log('Error fetching data: ', error)
      }
    }
    else if(e5 == 'E115'){
      var xdc_add = this.replace_0x_with_xdc(address)
      link = `https://xdc.blocksscan.io/api/txs/listByAccount/${xdc_add}`
      try {
        const response = await fetch(link);
        if (!response.ok) {
          throw new Error(`Failed to retrieve ${e5} address tx history data. Status: ${response}`);
        }
        const data = await response.text();
        e5_address_obj = JSON.parse(data);
        console.log('-----------------------------------E115:load_ether_history--------------------------------------')
        console.log(e5_address_obj)
        console.log(address)
      } catch (error) {
        console.log('Error fetching data: ', error)
      }
    }
    else if(e5 == 'E155'){
      link = `http://explorer-mainnet.thundercore.com/api?module=account&action=txlist&address=${address}`
      try {
        const response = await fetch(link);
        if (!response.ok) {
          throw new Error(`Failed to retrieve ${e5} address tx history data. Status: ${response}`);
        }
        const data = await response.text();
        e5_address_obj = JSON.parse(data);
        console.log('--------------------------------E155:load_ether_history-----------------------------------')
        console.log(e5_address_obj)
        console.log(address)
      } catch (error) {
        console.log('Error fetching data: ', error)
      }
    }
    else if(e5 == 'E145'){
      link=`http://explorer.energi.network/api?module=account&action=tokentx&address=${address}`
      try {
        const response = await fetch(link);
        if (!response.ok) {
          throw new Error(`Failed to retrieve ${e5} address tx history data. Status: ${response}`);
        }
        const data = await response.text();
        e5_address_obj = JSON.parse(data);
        console.log('--------------------------------E145:load_ether_history-----------------------------------')
        console.log(e5_address_obj)
        console.log(address)
      } catch (error) {
        console.log('Error fetching data: ', error)
      }
    }
    else if(e5 == 'E165'){
      link = `https://tomoscan.io/api/transaction/list?account=${address}`
      try {
        const response = await fetch(link);
        if (!response.ok) {
          throw new Error(`Failed to retrieve ${e5} address tx history data. Status: ${response}`);
        }
        const data = await response.text();
        e5_address_obj = JSON.parse(data);
        console.log('--------------------------------E145:load_ether_history-----------------------------------')
        console.log(e5_address_obj)
        console.log(address)
      } catch (error) {
        console.log('Error fetching data: ', error)
      }
    }
    else if(e5 == 'E185'){
      link = `https://eth.blockscout.com/api/v2/addresses/${address}/transactions`
      try {
        const response = await fetch(link);
        if (!response.ok) {
          throw new Error(`Failed to retrieve ${e5} address tx history data. Status: ${response}`);
        }
        const data = await response.text();
        e5_address_obj = JSON.parse(data);
      } catch (error) {
        console.log('Error fetching data: ', error)
      }
    }
    else if(e5 == 'E195'){
      link = `https://optimism.blockscout.com/api/v2/addresses/${address}/transactions`
      try {
        const response = await fetch(link);
        if (!response.ok) {
          throw new Error(`Failed to retrieve ${e5} address tx history data. Status: ${response}`);
        }
        const data = await response.text();
        e5_address_obj = JSON.parse(data);
      } catch (error) {
        console.log('Error fetching data: ', error)
      }
    }
    else if(e5 == 'E205'){
      link = `https://base.blockscout.com/api/v2/addresses/${address}/transactions`
      try {
        const response = await fetch(link);
        if (!response.ok) {
          throw new Error(`Failed to retrieve ${e5} address tx history data. Status: ${response}`);
        }
        const data = await response.text();
        e5_address_obj = JSON.parse(data);
      } catch (error) {
        console.log('Error fetching data: ', error)
      }
    }
    else if(e5 == 'E215'){
      var key = ''+process.env.REACT_APP_ARBITRUM_API_KEY
      link = `https://api.arbiscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort=desc&apikey=${key}`
      try {
        const response = await fetch(link);
        if (!response.ok) {
          throw new Error(`Failed to retrieve ${e5} address tx history data. Status: ${response}`);
        }
        const data = await response.text();
        e5_address_obj = JSON.parse(data);
        console.log('-------------------------------------E215:load_ether_history----------------------------------------')
        console.log(e5_address_obj)
        console.log(address)
      } catch (error) {
        console.log('Error fetching data: ', error)
      }
    }
    else if(e5 == 'E225'){
      link = `https://blockscout.com/astar/api?module=account&action=txlist&address=${address}`
      try {
        const response = await fetch(link);
        if (!response.ok) {
          throw new Error(`Failed to retrieve ${e5} address tx history data. Status: ${response}`);
        }
        const data = await response.text();
        e5_address_obj = JSON.parse(data);
        console.log('--------------------------------E225:load_ether_history-----------------------------------')
        console.log(e5_address_obj)
        console.log(address)
      } catch (error) {
        console.log('Error fetching data: ', error)
      }
    }
    else if(e5 == 'E235'){
      link = `https://cronos.org/explorer/api?module=account&action=txlist&address=${address}`
      try {
        const response = await fetch(link);
        if (!response.ok) {
          throw new Error(`Failed to retrieve ${e5} address tx history data. Status: ${response}`);
        }
        const data = await response.text();
        e5_address_obj = JSON.parse(data);
        console.log('--------------------------------E235:load_ether_history-----------------------------------')
        console.log(e5_address_obj)
        console.log(address)
      } catch (error) {
        console.log('Error fetching data: ', error)
      }
    }
    else if(e5 == 'E245'){
      link = `https://kavascan.com/api?module=account&action=txlist&address=${address}`
      try{
        const response = await fetch(link);
        if (!response.ok) {
          throw new Error(`Failed to retrieve ${e5} address tx history data. Status: ${response}`);
        }
        const data = await response.text();
        e5_address_obj = JSON.parse(data);
        console.log('--------------------------------E245:load_ether_history-----------------------------------')
        console.log(e5_address_obj)
        console.log(address)
      } catch (error) {
        console.log('Error fetching data: ', error)
      }
    }
    else if(e5 == 'E255'){
      link = `https://neon.blockscout.com/api/v2/addresses/${address}/transactions`
      try{
        const response = await fetch(link);
        if (!response.ok) {
          throw new Error(`Failed to retrieve ${e5} address tx history data. Status: ${response}`);
        }
        const data = await response.text();
        e5_address_obj = JSON.parse(data);
        console.log('--------------------------------E255:load_ether_history-----------------------------------')
        console.log(e5_address_obj)
        console.log(address)
      } catch (error) {
        console.log('Error fetching data: ', error)
      }
    }
    else if(e5 == 'E265'){
      link = `https://explorer-mainnet-cardano-evm.c1.milkomeda.com/api?module=account&action=txlist&address=${address}`
      try{
        const response = await fetch(link);
        if (!response.ok) {
          throw new Error(`Failed to retrieve ${e5} address tx history data. Status: ${response}`);
        }
        const data = await response.text();
        e5_address_obj = JSON.parse(data);
        console.log('--------------------------------E265:load_ether_history-----------------------------------')
        console.log(e5_address_obj)
        console.log(address)
      } catch (error) {
        console.log('Error fetching data: ', error)
      }
    }
    else if(e5 == 'E275'){
      var key = ''+process.env.REACT_APP_FANTOM_API_KEY
      link = `https://api.ftmscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort=desc&apikey=${key}`
      try {
        const response = await fetch(link);
        if (!response.ok) {
          throw new Error(`Failed to retrieve ${e5} address tx history data. Status: ${response}`);
        }
        const data = await response.text();
        e5_address_obj = JSON.parse(data);
        console.log('-------------------------------------E275:load_ether_history----------------------------------------')
        console.log(e5_address_obj)
        console.log(address)
      } catch (error) {
        console.log('Error fetching data: ', error)
      }
    }
    else if(e5 == 'E285'){
      link = `https://brisescan.com/api/v2/addresses/${address}/transactions`
      try{
        const response = await fetch(link);
        if (!response.ok) {
          throw new Error(`Failed to retrieve ${e5} address tx history data. Status: ${response}`);
        }
        const data = await response.text();
        e5_address_obj = JSON.parse(data);
        console.log('--------------------------------E285:load_ether_history-----------------------------------')
        console.log(e5_address_obj)
        console.log(address)
      } catch (error) {
        console.log('Error fetching data: ', error)
      }
    }
    else if(e5 == 'E295'){
      link = `https://explorer.syscoin.org/api?module=account&action=txlist&address=${address}`
      try{
        const response = await fetch(link);
        if (!response.ok) {
          throw new Error(`Failed to retrieve ${e5} address tx history data. Status: ${response}`);
        }
        const data = await response.text();
        e5_address_obj = JSON.parse(data);
        console.log('--------------------------------E295:load_ether_history-----------------------------------')
        console.log(e5_address_obj)
        console.log(address)
      } catch (error) {
        console.log('Error fetching data: ', error)
      }
    }
    else if(e5 == 'E305'){
      link = `https://api-beta.avascan.info/v2/network/mainnet/evm/43114/address/${address}/transactions?ecosystem=avalanche&sort=desc`

      try{
        const response = await fetch(link);
        if (!response.ok) {
          throw new Error(`Failed to retrieve ${e5} address tx history data. Status: ${response}`);
        }
        const data = await response.text();
        e5_address_obj = JSON.parse(data);
        console.log('--------------------------------E305:load_ether_history-----------------------------------')
        console.log(e5_address_obj)
        console.log(address)
      } catch (error) {
        console.log('Error fetching data: ', error)
      }
    }
    else if(e5 == 'E315'){
      link = `https://evm.findorascan.io/api?module=account&action=txlist&address=${address}`
      try{
        const response = await fetch(link);
        if (!response.ok) {
          throw new Error(`Failed to retrieve ${e5} address tx history data. Status: ${response}`);
        }
        const data = await response.text();
        e5_address_obj = JSON.parse(data);
        console.log('--------------------------------E315:load_ether_history-----------------------------------')
        console.log(e5_address_obj)
        console.log(address)
      } catch (error) {
        console.log('Error fetching data: ', error)
      }
    }
    else if(e5 == 'E325'){
      link = `https://blockscout.bellecour.iex.ec/api?module=account&action=txlist&address=${address}`
      try{
        const response = await fetch(link);
        if (!response.ok) {
          throw new Error(`Failed to retrieve ${e5} address tx history data. Status: ${response}`);
        }
        const data = await response.text();
        e5_address_obj = JSON.parse(data);
        console.log('--------------------------------E325:load_ether_history-----------------------------------')
        console.log(e5_address_obj)
        console.log(address)
      } catch (error) {
        console.log('Error fetching data: ', error)
      }
    }
    else if(e5 == 'E335'){
      link = `https://explorer.emerald.oasis.dev/api?module=account&action=txlist&address=${address}`
      try{
        const response = await fetch(link);
        if (!response.ok) {
          throw new Error(`Failed to retrieve ${e5} address tx history data. Status: ${response}`);
        }
        const data = await response.text();
        e5_address_obj = JSON.parse(data);
        console.log('--------------------------------E335:load_ether_history-----------------------------------')
        console.log(e5_address_obj)
        console.log(address)
      } catch (error) {
        console.log('Error fetching data: ', error)
      }
    }
    else if(e5 == 'E345'){
      link = `https://ozonescan.io/api?module=account&action=txlist&address=${address}`
      try{
        const response = await fetch(link);
        if (!response.ok) {
          throw new Error(`Failed to retrieve ${e5} address tx history data. Status: ${response}`);
        }
        const data = await response.text();
        e5_address_obj = JSON.parse(data);
        console.log('--------------------------------E345:load_ether_history-----------------------------------')
        console.log(e5_address_obj)
        console.log(address)
      } catch (error) {
        console.log('Error fetching data: ', error)
      }
    }
    else if(e5 == 'E355'){
      link = `https://scan.chain.pixie.xyz/api?module=account&action=txlist&address=${address}`
      try{
        const response = await fetch(link);
        if (!response.ok) {
          throw new Error(`Failed to retrieve ${e5} address tx history data. Status: ${response}`);
        }
        const data = await response.text();
        e5_address_obj = JSON.parse(data);
        console.log('--------------------------------E355:load_ether_history-----------------------------------')
        console.log(e5_address_obj)
        console.log(address)
      } catch (error) {
        console.log('Error fetching data: ', error)
      }
    }
    else if(e5 == 'E365'){
      link = `https://scan.rei.network/api?module=account&action=txlist&address=${address}`
      try{
        const response = await fetch(link);
        if (!response.ok) {
          throw new Error(`Failed to retrieve ${e5} address tx history data. Status: ${response}`);
        }
        const data = await response.text();
        e5_address_obj = JSON.parse(data);
        console.log('--------------------------------E365:load_ether_history-----------------------------------')
        console.log(e5_address_obj)
        console.log(address)
      } catch (error) {
        console.log('Error fetching data: ', error)
      }
    }
    else if(e5 == 'E385'){
      link = `https://explorer.mantle.xyz/api?module=account&action=txlist&address=${address}`
      try{
        const response = await fetch(link);
        if (!response.ok) {
          throw new Error(`Failed to retrieve ${e5} address tx history data. Status: ${response}`);
        }
        const data = await response.text();
        e5_address_obj = JSON.parse(data);
        console.log('--------------------------------E385:load_ether_history-----------------------------------')
        console.log(e5_address_obj)
        console.log(address)
      } catch (error) {
        console.log('Error fetching data: ', error)
      }
    }
    else if(e5 == 'E395'){
      link = `https://api.scan.pulsechain.com/api/v2/addresses/${address}/transactions`
      try{
        const response = await fetch(link);
        if (!response.ok) {
          throw new Error(`Failed to retrieve ${e5} address tx history data. Status: ${response}`);
        }
        const data = await response.text();
        e5_address_obj = JSON.parse(data);
        console.log('--------------------------------E395:load_ether_history-----------------------------------')
        console.log(e5_address_obj)
        console.log(address)
      } catch (error) {
        console.log('Error fetching data: ', error)
      }
    }
    else if(e5 == 'E485'){
      link = `https://explorer.energyweb.org/api?module=account&action=txlist&address=${address}`
      try{
        const response = await fetch(link);
        if (!response.ok) {
          throw new Error(`Failed to retrieve ${e5} address tx history data. Status: ${response}`);
        }
        const data = await response.text();
        e5_address_obj = JSON.parse(data);
        console.log('--------------------------------E485:load_ether_history-----------------------------------')
        console.log(e5_address_obj)
        console.log(address)
      } catch (error) {
        console.log('Error fetching data: ', error)
      }
    }
    else if(e5 == 'E495'){
      link = `https://explorer.callisto.network/api?module=account&action=txlist&address=${address}`
      try{
        const response = await fetch(link);
        if (!response.ok) {
          throw new Error(`Failed to retrieve ${e5} address tx history data. Status: ${response}`);
        }
        const data = await response.text();
        e5_address_obj = JSON.parse(data);
        console.log('--------------------------------E495:load_ether_history-----------------------------------')
        console.log(e5_address_obj)
        console.log(address)
      } catch (error) {
        console.log('Error fetching data: ', error)
      }
    }
    else if(e5 == 'E505'){
      link = `https://blockscout.com/shiden/api?module=account&action=txlist&address=${address}`
      try{
        const response = await fetch(link);
        if (!response.ok) {
          throw new Error(`Failed to retrieve ${e5} address tx history data. Status: ${response}`);
        }
        const data = await response.text();
        e5_address_obj = JSON.parse(data);
        console.log('--------------------------------E505:load_ether_history-----------------------------------')
        console.log(e5_address_obj)
        console.log(address)
      } catch (error) {
        console.log('Error fetching data: ', error)
      }
    }
    else if(e5 == 'E515'){
      link = `https://tenetscan.io/api?module=account&action=txlist&address=${address}`
      try{
        const response = await fetch(link);
        if (!response.ok) {
          throw new Error(`Failed to retrieve ${e5} address tx history data. Status: ${response}`);
        }
        const data = await response.text();
        e5_address_obj = JSON.parse(data);
        console.log('--------------------------------E515:load_ether_history-----------------------------------')
        console.log(e5_address_obj)
        console.log(address)
      } catch (error) {
        console.log('Error fetching data: ', error)
      }
    }
    else if(e5 == 'E565'){
      link = `https://evmapi.confluxscan.net/api?module=account&action=txlist&address=${address}&page=1&offset=100&sort=desc`
      try{
        const response = await fetch(link);
        if (!response.ok) {
          throw new Error(`Failed to retrieve ${e5} address tx history data. Status: ${response}`);
        }
        const data = await response.text();
        e5_address_obj = JSON.parse(data);
        console.log('--------------------------------E515:load_ether_history-----------------------------------')
        console.log(e5_address_obj)
        console.log(address)
      } catch (error) {
        console.log('Error fetching data: ', error)
      }
    }
    else if(e5 == 'E625'){
      link = `https://seeleview.net/api?module=account&action=txlist&address=${address}`
      try{
        const response = await fetch(link);
        if (!response.ok) {
          throw new Error(`Failed to retrieve ${e5} address tx history data. Status: ${response}`);
        }
        const data = await response.text();
        e5_address_obj = JSON.parse(data);
        console.log('--------------------------------E625:load_ether_history-----------------------------------')
        console.log(e5_address_obj)
        console.log(address)
      } catch (error) {
        console.log('Error fetching data: ', error)
      }
    }
    else if(e5 == 'E675'){
      link = `http://edgscan.live/api?module=account&action=txlist&address=${address}`
      try{
        const response = await fetch(link);
        if (!response.ok) {
          throw new Error(`Failed to retrieve ${e5} address tx history data. Status: ${response}`);
        }
        const data = await response.text();
        e5_address_obj = JSON.parse(data);
        console.log('--------------------------------E675:load_ether_history-----------------------------------')
        console.log(e5_address_obj)
        console.log(address)
      } catch (error) {
        console.log('Error fetching data: ', error)
      }
    }
    else if(e5 == 'E685'){
      link = `http://blockexplorer.bloxberg.org/api?module=account&action=txlist&address=${address}`
      try{
        const response = await fetch(link);
        if (!response.ok) {
          throw new Error(`Failed to retrieve ${e5} address tx history data. Status: ${response}`);
        }
        const data = await response.text();
        e5_address_obj = JSON.parse(data);
        console.log('--------------------------------E685:load_ether_history-----------------------------------')
        console.log(e5_address_obj)
        console.log(address)
      } catch (error) {
        console.log('Error fetching data: ', error)
      }
    }
    else if(e5 == 'E695'){
      link = `http://phoenixplorer.com/api?module=account&action=txlist&address=${address}`
      try{
        const response = await fetch(link);
        if (!response.ok) {
          throw new Error(`Failed to retrieve ${e5} address tx history data. Status: ${response}`);
        }
        const data = await response.text();
        e5_address_obj = JSON.parse(data);
        console.log('--------------------------------E695:load_ether_history-----------------------------------')
        console.log(e5_address_obj)
        console.log(address)
      } catch (error) {
        console.log('Error fetching data: ', error)
      }
    }
    else if(e5 == 'E705'){
      link = `http://explorer.omchain.io/api?module=account&action=txlist&address=${address}`
      try{
        const response = await fetch(link);
        if (!response.ok) {
          throw new Error(`Failed to retrieve ${e5} address tx history data. Status: ${response}`);
        }
        const data = await response.text();
        e5_address_obj = JSON.parse(data);
        console.log('--------------------------------E705:load_ether_history-----------------------------------')
        console.log(e5_address_obj)
        console.log(address)
      } catch (error) {
        console.log('Error fetching data: ', error)
      }
    }
    else if(e5 == 'E735'){
      link = `https://explorer.ecredits.com/api?module=account&action=txlist&address=${address}`
      try{
        const response = await fetch(link);
        if (!response.ok) {
          throw new Error(`Failed to retrieve ${e5} address tx history data. Status: ${response}`);
        }
        const data = await response.text();
        e5_address_obj = JSON.parse(data);
        console.log('--------------------------------E735:load_ether_history-----------------------------------')
        console.log(e5_address_obj)
        console.log(address)
      } catch (error) {
        console.log('Error fetching data: ', error)
      }
    }
    else if(e5 == 'E755'){
      link = `https://explorer.ethoprotocol.com/api?module=account&action=txlist&address=${address}`
      try{
        const response = await fetch(link);
        if (!response.ok) {
          throw new Error(`Failed to retrieve ${e5} address tx history data. Status: ${response}`);
        }
        const data = await response.text();
        e5_address_obj = JSON.parse(data);
        console.log('--------------------------------E745:load_ether_history-----------------------------------')
        console.log(e5_address_obj)
        console.log(address)
      } catch (error) {
        console.log('Error fetching data: ', error)
      }
    }
    

    var clone = structuredClone(this.state.e5_ether_tx_history)
    clone[e5] = e5_address_obj
    this.setState({e5_ether_tx_history: clone})
    
  }

  replace_0x_with_xdc(address){
    return 'xdc'+address.toString().slice(2)
  }

  //unused
  get_total_supply_of_ether = async (e5) => {
    var link = ''

    if(e5 == 'E35'){
      // link = `https://etc.blockscout.com/api/v2/stats/charts/market&apikey=${process.env.REACT_APP_BLOCKSCOUT_API_KEY}`
      link = `https://etc.blockscout.com/api/v2/stats/charts/market`
    }
    else if(e5 == 'E25'){
      // link = `https://etc.blockscout.com/api/v2/stats/charts/market&apikey=${process.env.REACT_APP_BLOCKSCOUT_API_KEY}`
      link = `https://etc.blockscout.com/api/v2/stats/charts/market`
    }

    var e5_supply_obj = {}
    try {
      const response = await fetch(link);
      if (!response.ok) {
        throw new Error(`Failed to retrieve ether supply data. Status: ${response}`);
      }
      const data = await response.text();
      e5_supply_obj = JSON.parse(data);
      
    } catch (error) {
      console.log('Error fetching data: ', error)
    }

    var clone = structuredClone(this.state.e5_ether_supply_data)
    clone[e5] = e5_supply_obj
    this.setState({e5_ether_supply_data: clone})

  }

  combine_contacts(existing_contacts, updated_contact_list){
    var new_contact_list = structuredClone(existing_contacts)

    updated_contact_list.forEach(contact => {
      if(!this.check_if_includes(new_contact_list, contact)){
        new_contact_list.push(contact)
      }
    });

    return new_contact_list
  }

  check_if_includes(array, item){
    var includes = array.find(e => e['id'] === item['id'])
    // for(var i=0; i<array.length; i++){
    //   if(array[i]['id'] == item['id']){
    //     includes = true
    //     break;
    //   }
    // }
    return includes != null
  }

  get_alias_data = async (E52contractInstance, e5, account, web3) => {
    var alias_events = await this.load_event_data(web3, E52contractInstance, 'e4', e5, {p1/* target_id */: 11})

    var my_alias_events = []
    var alias_bucket = {}
    var alias_owners = {}
    var alias_timestamp = {}
    var is_first_time = this.state.my_alias_events[e5] == null
    for(var i=0; i<alias_events.length; i++){
      var alias_string = await this.fetch_objects_data_from_ipfs_using_option(alias_events[i].returnValues.p4)
      var alias_sender = alias_events[i].returnValues.p2/* owner */
      // var context = alias_events[i].returnValues.p3

      if(alias_owners[alias_string] == null){
        console.log('setting alias: ',alias_string, ' for account: ',alias_sender)
        alias_owners[alias_string] = alias_sender
        alias_bucket[alias_sender] = alias_string 
        alias_timestamp[alias_string] = alias_events[i].returnValues.p6

        if(alias_sender == account){
          //my alias
          my_alias_events.push({'alias':alias_string, 'event':alias_events[i]})
        }
      }
      else if(alias_owners[alias_string] == alias_sender){
        //ownership was revoked
        console.log('revoking alias: ',alias_string, ' for account: ',alias_sender)
        alias_owners[alias_string] = null
        alias_bucket[alias_sender] = null
        var pos = -1
        for(var k=0; k<my_alias_events.length; k++){
          if(my_alias_events[k]['alias'] == alias_string){
            pos = k
            break
          }
        }
        if(pos != -1){
          my_alias_events.splice(pos, 1)
        }
      }
      
      if(is_first_time){
        var alias_bucket_clone = structuredClone(this.state.alias_bucket)
        alias_bucket_clone[e5] = alias_bucket

        var alias_owners_clone = structuredClone(this.state.alias_owners)
        alias_owners_clone[e5] = alias_owners

        var my_alias_events_clone = structuredClone(this.state.my_alias_events)
        my_alias_events_clone[e5] = my_alias_events

        var alias_timestamp_clone = structuredClone(this.state.alias_timestamp)
        alias_timestamp_clone[e5] = alias_timestamp

        this.setState({alias_bucket: alias_bucket_clone, alias_owners:alias_owners_clone, my_alias_events:my_alias_events_clone, alias_timestamp:alias_timestamp_clone})
      }
    }

    var alias_bucket_clone = structuredClone(this.state.alias_bucket)
    alias_bucket_clone[e5] = alias_bucket

    var alias_owners_clone = structuredClone(this.state.alias_owners)
    alias_owners_clone[e5] = alias_owners

    var my_alias_events_clone = structuredClone(this.state.my_alias_events)
    my_alias_events_clone[e5] = my_alias_events

    var alias_timestamp_clone = structuredClone(this.state.alias_timestamp)
    alias_timestamp_clone[e5] = alias_timestamp

    this.setState({alias_bucket: alias_bucket_clone, alias_owners:alias_owners_clone, my_alias_events:my_alias_events_clone, alias_timestamp:alias_timestamp_clone})

  }

  get_subscription_data = async (contractInstance, F5contractInstance, account, web3, e5, contract_addresses, E52contractInstance) => {
    var created_subscription_events = await this.load_event_data(web3, contractInstance, 'e1', e5, {p2/* object_type */:33/* subscription_object */ })

    var created_subscriptions = []
    for(var i=0; i<created_subscription_events.length; i++){
      var id = created_subscription_events[i].returnValues.p1
      created_subscriptions.push(id)
    }
    var created_subscription_data = await F5contractInstance.methods.f74(created_subscriptions).call((error, result) => {});
    var created_subscription_object_data = []
    var created_subscription_object_mapping = {}
    var is_first_time = this.state.created_subscriptions[e5] == null
    

    var account_as_list = []
    for(var i=0; i<created_subscriptions.length; i++){
      account_as_list.push([account])
    }
    var my_payments_for_all_subscriptions = created_subscriptions.length == 0 ? [] : await F5contractInstance.methods.f229(created_subscriptions, account_as_list).call((error, result) => {});

    var interactible_checker_status_values_for_all_subscriptions = created_subscriptions.length == 0 ? [] : await E52contractInstance.methods.f254(created_subscriptions,0).call((error, result) => {});

    var my_interactable_time_value_for_all_subscriptions = created_subscriptions.length == 0 ? [] : await E52contractInstance.methods.f256(created_subscriptions, account_as_list, 0,2).call((error, result) => {})

    var my_blocked_time_value_for_all_subscriptions = created_subscriptions.length == 0 ? [] : await E52contractInstance.methods.f256(created_subscriptions, account_as_list, 0,3).call((error, result) => {});


    for(var i=0; i<created_subscriptions.length; i++){
      var subscription_data = await this.fetch_objects_data(created_subscriptions[i], web3, e5, contract_addresses);
      var my_payment = my_payments_for_all_subscriptions[i]

      var paid_accounts = [];
      var paid_amounts = [];

      if(created_subscription_events[i].returnValues.p3 == account){
        //if the sender is the authority of the subscription
        var all_subscription_payment_events = await this.load_event_data(web3, F5contractInstance, 'e1', e5, {p1/* subscription_id */:created_subscriptions[i]})

        var accounts_in_focus_as_list = []
        for(var j=0; j<all_subscription_payment_events.length; j++){
          var account_in_focus = all_subscription_payment_events[j].returnValues.p2
          accounts_in_focus_as_list.push(account_in_focus)
        }

        var collectible_time_value_for_all_accounts = created_subscription_data[i][1][2/* can_cancel_subscription */] == 1? 
        await F5contractInstance.methods.f235([created_subscriptions[i]], [accounts_in_focus_as_list]).call((error, result) => {}) :
        await F5contractInstance.methods.f229([created_subscriptions[i]], [accounts_in_focus_as_list]).call((error, result) => {});

        
        for(var j=0; j<all_subscription_payment_events.length; j++){
          var account_in_focus = all_subscription_payment_events[j].returnValues.p2
          
          if(!paid_accounts.includes(account_in_focus)){
            if(created_subscription_data[i][1][2/* can_cancel_subscription */] == 1){
              var collectible_time_value = /* await F5contractInstance.methods.f235([created_subscriptions[i]], [[account_in_focus]]).call((error, result) => {}); */ collectible_time_value_for_all_accounts
              
              if(collectible_time_value[0][j] != 0){
                paid_accounts.push(account_in_focus)
                paid_amounts.push(collectible_time_value[0][j])
              }
            }
            else{
              var collectible_time_value = /* await F5contractInstance.methods.f229([created_subscriptions[i]], [[account_in_focus]]).call((error, result) => {}); */ collectible_time_value_for_all_accounts

              if(collectible_time_value[0][j] != 0){
                paid_accounts.push(account_in_focus)
                paid_amounts.push(collectible_time_value[0][j])
              }
            }
          }
        }
      }

      var moderator_data = await this.load_event_data(web3, E52contractInstance, 'e1', e5, {p1/* target_obj_id */:created_subscriptions[i], p2/* action_type */:4/* <4>modify_moderator_accounts */})
      var old_moderators = []

      for(var e=0; e<moderator_data.length; e++){
        var mod_id = moderator_data[e].returnValues.p3
        old_moderators.push(mod_id)
      }

      var mod_status_values = await E52contractInstance.methods.f255([created_subscriptions[i]], [old_moderators]).call((error, result) => {});

      var moderators = []
      for(var e=0; e<old_moderators.length; e++){
        var their_status = mod_status_values[0][e]
        if(their_status == true){
          moderators.push(old_moderators[e])
        }
      }

      var interactible_checker_status_values = /* await E52contractInstance.methods.f254([created_subscriptions[i]],0).call((error, result) => {}); */interactible_checker_status_values_for_all_subscriptions[i]

      var my_interactable_time_value = /* await E52contractInstance.methods.f256([created_subscriptions[i]], [[account]], 0,2).call((error, result) => {}); */ my_interactable_time_value_for_all_subscriptions[i]

      var my_blocked_time_value = /* await E52contractInstance.methods.f256([created_subscriptions[i]], [[account]], 0,3).call((error, result) => {}); */ my_blocked_time_value_for_all_subscriptions[i]


      var subscription_object = {'id':created_subscriptions[i], 'e5_id':created_subscriptions[i]+e5, 'data':created_subscription_data[i], 'ipfs':subscription_data, 'event':created_subscription_events[i], 'payment':my_payment/* [0] */[0], 'paid_accounts':paid_accounts, 'paid_amounts':paid_amounts, 'moderators':moderators, 'access_rights_enabled':interactible_checker_status_values[0], 'e5':e5, 'timestamp':created_subscription_events[i].returnValues.p4, 'author':created_subscription_events[i].returnValues.p3}

      if(interactible_checker_status_values/* [0] */[0] == true && (my_interactable_time_value/* [0] */[0] < Date.now()/1000 && !moderators.includes(account) && created_subscription_events[i].returnValues.p3 != account )){}
      else if(my_blocked_time_value/* [0] */[0] > Date.now()/1000){}
      else{
        created_subscription_object_data.push(subscription_object)
      }

      created_subscription_object_mapping[created_subscriptions[i]] = subscription_object

      if(is_first_time){
        var created_subscription_object_data_clone = structuredClone(this.state.created_subscriptions)
        created_subscription_object_data_clone[e5] = created_subscription_object_data
        
        var created_subscription_object_mapping_clone = structuredClone(this.state.created_subscription_object_mapping)
        created_subscription_object_mapping_clone[e5] = created_subscription_object_mapping

        this.setState({created_subscriptions: created_subscription_object_data_clone, created_subscription_object_mapping: created_subscription_object_mapping_clone})
      }
    }

    var created_subscription_object_data_clone = structuredClone(this.state.created_subscriptions)
    created_subscription_object_data_clone[e5] = created_subscription_object_data
    
    var created_subscription_object_mapping_clone = structuredClone(this.state.created_subscription_object_mapping)
    created_subscription_object_mapping_clone[e5] = created_subscription_object_mapping

    this.setState({created_subscriptions: created_subscription_object_data_clone, created_subscription_object_mapping: created_subscription_object_mapping_clone})
    
    console.log('subscription count for e5: ',e5,' : ',created_subscription_object_data.length)
  }

  get_contract_data = async (contractInstance, account, G5contractInstance, G52contractInstance, web3, e5, contract_addresses, E52contractInstance) => {
    var created_contract_events = await this.load_event_data(web3, contractInstance, 'e1', e5, {p2/* object_type */:30/* contract_obj_id */ })

    var created_contracts = [2]
    var accounts_for_expiry_time = [[account]]
    for(var i=0; i<created_contract_events.length; i++){
      var id = created_contract_events[i].returnValues.p1
      created_contracts.push(id)
      accounts_for_expiry_time.push([account])
    }

    var created_contract_data = await G5contractInstance.methods.f78(created_contracts, false).call((error, result) => {});
    var entered_timestamp_data = await G52contractInstance.methods.f266(created_contracts, accounts_for_expiry_time, 3).call((error, result) => {});
    var created_contract_object_data = []
    var created_contract_mapping = {}
    var is_first_time = this.state.created_contracts[e5] == null




    var account_as_list = []
    for(var i=0; i<created_contracts.length; i++){
      account_as_list.push([account])
    }

    var interactible_checker_status_values_for_all_contracts = created_contracts.length==0? []: await E52contractInstance.methods.f254(created_contracts,0).call((error, result) => {});

    var my_interactable_time_value_for_all_contracts = created_contracts.length==0? []: await E52contractInstance.methods.f256(created_contracts, account_as_list, 0,2).call((error, result) => {});

    var my_blocked_time_value_for_all_contracts = created_contracts.length==0? []: await E52contractInstance.methods.f256(created_contracts, account_as_list, 0,3).call((error, result) => {});




    for(var i=0; i<created_contracts.length; i++){
      var contracts_data = await this.fetch_objects_data(created_contracts[i], web3, e5, contract_addresses);
      var event = i>0 ? created_contract_events[i-1]: null
      var end_balance = await this.get_balance_in_exchange(3, created_contracts[i], e5, contract_addresses);
      var spend_balance = await this.get_balance_in_exchange(5, created_contracts[i], e5, contract_addresses);

      var entered_accounts = await this.load_event_data(web3, G52contractInstance, 'e2', e5, {p3/* action */:3/* enter_contract(3) */,p1/* contract_id */:created_contracts[i]})

      var contract_entered_accounts = []
      var archive_accounts = []
      for(var e=0; e<entered_accounts.length; e++){
        var account_entered_time = await G52contractInstance.methods.f266([created_contracts[i]], [[entered_accounts[e].returnValues.p2]], 3).call((error, result) => {});

        if(!contract_entered_accounts.includes(entered_accounts[e].returnValues.p2) && account_entered_time > Date.now()/1000){
          contract_entered_accounts.push(entered_accounts[e].returnValues.p2)
        }
        if(!archive_accounts.includes(entered_accounts[e].returnValues.p2)){
          archive_accounts.push(entered_accounts[e].returnValues.p2)
        }
      }


      var moderator_data = await this.load_event_data(web3, E52contractInstance, 'e1', e5, {p1/* target_obj_id */:created_contracts[i], p2/* action_type */:4/* <4>modify_moderator_accounts */})
      var old_moderators = []

      for(var e=0; e<moderator_data.length; e++){
        var mod_id = moderator_data[e].returnValues.p3
        old_moderators.push(mod_id)
      }

      var mod_status_values = await E52contractInstance.methods.f255([created_contracts[i]], [old_moderators]).call((error, result) => {});

      var moderators = []
      for(var e=0; e<old_moderators.length; e++){
        var their_status = mod_status_values[0][e]
        if(their_status == true){
          moderators.push(old_moderators[e])
        }
      }

      var interactible_checker_status_values = /* await E52contractInstance.methods.f254([created_contracts[i]],0).call((error, result) => {}); */interactible_checker_status_values_for_all_contracts

      var my_interactable_time_value = /* await E52contractInstance.methods.f256([created_contracts[i]], [[account]], 0,2).call((error, result) => {}); */ my_interactable_time_value_for_all_contracts

      var my_blocked_time_value =/*  await E52contractInstance.methods.f256([created_contracts[i]], [[account]], 0,3).call((error, result) => {}); */ my_blocked_time_value_for_all_contracts

      var timestamp = event == null ? 0 : event.returnValues.p4
      var author = event == null ? 0 : event.returnValues.p3
      var contract_obj = {'id':created_contracts[i], 'data':created_contract_data[i], 'ipfs':contracts_data, 'event':event, 'entry_expiry':entered_timestamp_data[i][0], 'end_balance':end_balance, 'spend_balance':spend_balance, 'participants':contract_entered_accounts, 'archive_accounts':archive_accounts, 'moderators':moderators, 'access_rights_enabled':interactible_checker_status_values[i], 'my_interactable_time_value':my_interactable_time_value[i][0], 'my_blocked_time_value':my_blocked_time_value[i][0], 'e5':e5, 'timestamp':timestamp, 'author':author, 'e5_id':created_contracts[i]+e5 }

      if(interactible_checker_status_values[0] == true && (my_interactable_time_value[i][0] < Date.now()/1000 && !moderators.includes(account) && event.returnValues.p3 != account )){
      }
      else if(my_blocked_time_value[i][0] > Date.now()/1000){

      }
      else{
        created_contract_object_data.push(contract_obj)
      }
      created_contract_mapping[created_contracts[i]] = contract_obj

      if(is_first_time){
        var created_contract_object_data_clone = structuredClone(this.state.created_contracts)
        created_contract_object_data_clone[e5] = created_contract_object_data

        var created_contract_mapping_clone = structuredClone(this.state.created_contract_mapping)
        created_contract_mapping_clone[e5] = created_contract_mapping

        this.setState({created_contracts: created_contract_object_data_clone, created_contract_mapping: created_contract_mapping_clone})
      }
    }

    var created_contract_object_data_clone = structuredClone(this.state.created_contracts)
    created_contract_object_data_clone[e5] = created_contract_object_data

    var created_contract_mapping_clone = structuredClone(this.state.created_contract_mapping)
    created_contract_mapping_clone[e5] = created_contract_mapping

    this.setState({created_contracts: created_contract_object_data_clone, created_contract_mapping: created_contract_mapping_clone})
    console.log('contract count for : ',e5, ' : ',created_contract_object_data.length)

  }

  get_proposal_data = async (G52contractInstance, G5contractInstance, E52contractInstance, web3, e5, contract_addresses, account) => {
    var contracts_ive_entered_events = await this.load_event_data(web3, G52contractInstance, 'e2', e5, {p2/* sender_acc */:account, p3/* action */:3 /* <3>enter_contract */})
    var contracts_ive_entered = []
    for(var i=0; i<contracts_ive_entered_events.length; i++){
      var contract = contracts_ive_entered_events[i].returnValues.p1
      contracts_ive_entered.push(contract)
    }

    var contracts_ive_exited_events = await this.load_event_data(web3, G52contractInstance, 'e2', e5, {p2/* sender_acc */:account, p3/* action */:11 /* <11>exit_contract */})
    for(var i=0; i<contracts_ive_exited_events.length; i++){
      var contract = contracts_ive_exited_events[i].returnValues.p1
      const index = contracts_ive_entered.indexOf(contract);
      if (index > -1) { // only splice array when item is found
          contracts_ive_entered.splice(index, 1); // 2nd parameter means remove one item only
      }
    }

    var all_force_exit_events = await this.load_event_data(web3, G52contractInstance, 'e2', e5, {p3/* action */:18 /* <18>contract_force_exit_accounts */})

    for(var i=0; i<all_force_exit_events.length; i++){
      if(all_force_exit_events[i].returnValues.p5 == account.toString()){
        var force_exit_contract_id = all_force_exit_events[i].returnValues.p1
        const index = contracts_ive_entered.indexOf(force_exit_contract_id);
        if (index > -1) { // only splice array when item is found
            contracts_ive_entered.splice(index, 1); // 2nd parameter means remove one item only
        }
      }
    }

    var my_proposals_events = []
    var my_proposal_ids = []
    for(var i=0; i<contracts_ive_entered.length; i++){
      var contracts_proposals = await this.load_event_data(web3, G5contractInstance, 'e1', e5, {p1/* contract_id */:contracts_ive_entered[i]})


      for(var j=0; j<contracts_proposals.length; j++){
        my_proposal_ids.push(parseInt(contracts_proposals[j].returnValues.p2)) //<--------issue! should be p4
        my_proposals_events.push(contracts_proposals[j])
      }

    }

    var contracts_proposals = await this.load_event_data(web3, G5contractInstance, 'e1', e5, {p1/* contract_id */:2})

    for(var i=0; i<contracts_proposals.length; i++){
      my_proposal_ids.push(parseInt(contracts_proposals[i].returnValues.p2))//<--------issue! should be p4
      my_proposals_events.push(contracts_proposals[i])
    }

    var created_proposal_object_data = []
    var created_proposal_data = await G5contractInstance.methods.f78(my_proposal_ids, false).call((error, result) => {});
    var consensus_data = await G52contractInstance.methods.f266(my_proposal_ids, [], 0).call((error, result) => {});
    var is_first_time = this.state.my_proposals[e5] == null


    var all_exchanges_in_list = []
    var depths = []
    var proposal_modify_target_types = []
    var account_as_list = []
    for(var i=0; i<my_proposal_ids.length; i++){
      all_exchanges_in_list.push([3, 5])
      depths.push(0)
      proposal_modify_target_types.push(created_proposal_data[i][1][9])
      account_as_list.push([account])
    }

    var balances = await this.get_balance_in_exchange_for_multiple_accounts(my_proposal_ids, all_exchanges_in_list, e5, contract_addresses, depths, 1)

    var proposal_modify_target_type_data = await E52contractInstance.methods.f134(proposal_modify_target_types).call((error, result) => {});

    var senders_vote_in_proposal_for_all_proposals = await G52contractInstance.methods.f237(my_proposal_ids, account_as_list).call((error, result) => {});


    for(var i=0; i<my_proposal_ids.length; i++){
      var proposals_data = await this.fetch_objects_data(my_proposal_ids[i], web3, e5, contract_addresses);
      var event = my_proposals_events[i]
      var end_balance = /* await this.get_balance_in_exchange(3, my_proposal_ids[i], e5, contract_addresses); */ balances[i][0]
      var spend_balance = /* await this.get_balance_in_exchange(5, my_proposal_ids[i], e5, contract_addresses); */ balances[i][1]

      var proposal_modify_target_type = /* await E52contractInstance.methods.f135(created_proposal_data[i][1][9]).call((error, result) => {}); */ proposal_modify_target_type_data[i]

      var senders_vote_in_proposal = /* await G52contractInstance.methods.f237([my_proposal_ids[i]], [[account]]).call((error, result) => {}); */ senders_vote_in_proposal_for_all_proposals[i]

      var proposal_voters = await this.load_event_data(web3, G52contractInstance, 'e1', e5, {p2/* consensus_id */:my_proposal_ids[i]})

      var archive_participants = []
      for(var o=0; o<proposal_voters.length; o++){
        if(!archive_participants.includes(proposal_voters[o].returnValues.p3)){
          archive_participants.push(proposal_voters[o].returnValues.p3)
        }
      }

      var obj = {'id':my_proposal_ids[i], 'data':created_proposal_data[i], 'ipfs':proposals_data, 'event':event, 'end_balance':end_balance, 'spend_balance':spend_balance, 'consensus_data':consensus_data[i], 'modify_target_type':proposal_modify_target_type, 'account_vote':senders_vote_in_proposal/* [0] */[0], 'archive_accounts':archive_participants, 'e5':e5, 'timestamp':event.returnValues.p5, 'author':event.returnValues.p3, 'e5_id':my_proposal_ids[i]+e5 }

      created_proposal_object_data.push(obj)

      if(is_first_time){
        var my_proposals_clone = structuredClone(this.state.my_proposals)
        my_proposals_clone[e5] = created_proposal_object_data
        this.setState({my_proposals: my_proposals_clone})
      }
    }

    var my_proposals_clone = structuredClone(this.state.my_proposals)
    my_proposals_clone[e5] = created_proposal_object_data
    this.setState({my_proposals: my_proposals_clone})

    console.log('proposal count for e5: ',e5,' : ',created_proposal_object_data.length)
  }

  get_token_data = async (contractInstance, H5contractInstance, H52contractInstance, E52contractInstance, web3, e5, contract_addresses, account) => {
    var created_token_events = await this.load_event_data(web3, contractInstance, 'e1', e5, {p2/* object_type */:31/* token_exchange */})
    var created_tokens = [3, 5]
    var created_token_depths = [0,0]
    var exchange_accounts = [account, account]
    for(var i=0; i<created_token_events.length; i++){
      var id = created_token_events[i].returnValues.p1
      created_tokens.push(id)
      created_token_depths.push(0)
      exchange_accounts.push(account)
    }

    var created_token_data = await H5contractInstance.methods.f86(created_tokens).call((error, result) => {});
    var token_balances = await H52contractInstance.methods.f140e(created_tokens, account, created_token_depths).call((error, result) => {});

    var accounts_exchange_data = await H5contractInstance.methods.f241(exchange_accounts, created_tokens).call((error, result) => {});
    
    var created_token_object_data = []
    var created_token_object_mapping = {}
    var is_first_time = this.state.created_tokens[e5] == null

    var account_as_list = []
    for(var i=0; i<created_tokens.length; i++){
      account_as_list.push([account])
    }

    var interactible_checker_status_values_for_all_tokens = await E52contractInstance.methods.f254(created_tokens,0).call((error, result) => {});

    var my_interactable_time_value_for_all_tokens = await E52contractInstance.methods.f256(created_tokens, account_as_list, 0,2).call((error, result) => {});

    var my_blocked_time_value_for_all_tokens = await E52contractInstance.methods.f256(created_tokens, account_as_list, 0,3).call((error, result) => {});


    for(var i=0; i<created_tokens.length; i++){
      var tokens_data = await this.fetch_objects_data(created_tokens[i], web3, e5, contract_addresses);
      var event = i>1 ? created_token_events[i-2]: null

      var depth_values = []
      for(var j=0; j<created_token_data[i][3].length; j++){
        depth_values.push(0)
      }
      var exchanges_balances = await H52contractInstance.methods.f140e(created_token_data[i][3], created_tokens[i], depth_values).call((error, result) => {});

      var moderator_data = await this.load_event_data(web3, E52contractInstance, 'e1', e5, {p1/* target_obj_id */:created_tokens[i], p2/* action_type */:4/* <4>modify_moderator_accounts */})
      var old_moderators = []

      for(var e=0; e<moderator_data.length; e++){
        var mod_id = moderator_data[e].returnValues.p3
        old_moderators.push(mod_id)
      }

      var mod_status_values = await E52contractInstance.methods.f255([created_tokens[i]], [old_moderators]).call((error, result) => {});

      var moderators = []
      for(var e=0; e<old_moderators.length; e++){
        var their_status = mod_status_values[0][e]
        if(their_status == true){
          moderators.push(old_moderators[e])
        }
      }

      var interactible_checker_status_values = /* await E52contractInstance.methods.f254([created_tokens[i]],0).call((error, result) => {}); */ interactible_checker_status_values_for_all_tokens

      var my_interactable_time_value = /* await E52contractInstance.methods.f256([created_tokens[i]], [[account]], 0,2).call((error, result) => {}); */ my_interactable_time_value_for_all_tokens

      var my_blocked_time_value = /* await E52contractInstance.methods.f256([created_tokens[i]], [[account]], 0,3).call((error, result) => {}); */ my_blocked_time_value_for_all_tokens



      var update_exchange_ratio_event_data = await this.load_event_data(web3, H5contractInstance, 'e1', e5, {p1/* exchange */: created_tokens[i]})

      var update_proportion_ratio_event_data = await this.load_event_data(web3, H5contractInstance, 'e2', e5, {p1/* exchange */: created_tokens[i]})

      var timestamp = event == null ? 0 : event.returnValues.p4
      var author = event == null ? 0 : event.returnValues.p3
      var token_obj = {'id':created_tokens[i], 'data':created_token_data[i], 'ipfs':tokens_data, 'event':event, 'balance':token_balances[i], 'account_data':accounts_exchange_data[i], 'exchanges_balances':exchanges_balances, 'moderators':moderators, 'access_rights_enabled':interactible_checker_status_values[i],'e5':e5, 'timestamp':timestamp, 'exchange_ratio_data':update_exchange_ratio_event_data, 'proportion_ratio_data':update_proportion_ratio_event_data, 'author':author, 'e5_id':created_tokens[i]+e5 }

      if(interactible_checker_status_values[i] == true && (my_interactable_time_value[i][0] < Date.now()/1000 && !moderators.includes(account) && event.returnValues.p3 != account )){

      }
      else if(my_blocked_time_value[i][0] > Date.now()/1000){

      }
      else{
        created_token_object_data.push(token_obj)
      }
      created_token_object_mapping[created_tokens[i]] = token_obj

      if(is_first_time){
        var created_tokens_clone = structuredClone(this.state.created_tokens)
        created_tokens_clone[e5] = created_token_object_data

        var created_token_object_mapping_clone = structuredClone(this.state.created_token_object_mapping)
        created_token_object_mapping_clone[e5] = created_token_object_mapping

        this.setState({created_tokens: created_tokens_clone, created_token_object_mapping: created_token_object_mapping_clone})
      }
    }

    var created_tokens_clone = structuredClone(this.state.created_tokens)
    created_tokens_clone[e5] = created_token_object_data

    var created_token_object_mapping_clone = structuredClone(this.state.created_token_object_mapping)
    created_token_object_mapping_clone[e5] = created_token_object_mapping

    this.setState({created_tokens: created_tokens_clone, created_token_object_mapping: created_token_object_mapping_clone})
    console.log('token count for e5: ',e5,' : ',created_token_object_data.length)



    var token_symbol_directory = {}
    var token_name_directory = {}
    token_symbol_directory[0] = 'wei'
    token_symbol_directory['wei'] = 0
    for(var u=0; u<created_token_object_data.length; u++){
      var token_name = created_token_object_data[u]['ipfs'] == null ? 'tokens' : created_token_object_data[u]['ipfs'].entered_symbol_text
      var token_title = created_token_object_data[u]['ipfs'] == null ? 'tokens' : created_token_object_data[u]['ipfs'].entered_title_text
      var token_id = created_token_object_data[u]['id']

      if(token_id == 3){
        token_name = 'END'
        token_title = e5
      } 
      if(token_id == 5) {
        token_name = 'SPEND'
        token_title = e5.replace('E','3')
      }
      token_symbol_directory[token_id] = token_name;
      token_symbol_directory[token_name] = token_id
      token_name_directory[e5+token_id] = token_title
    }

    var token_directory_clone = structuredClone(this.state.token_directory)
    token_directory_clone[e5] = token_symbol_directory
    this.setState({token_directory: token_directory_clone});

    var token_name_directory_clone = structuredClone(this.state.token_name_directory)
    token_name_directory_clone[e5] = token_name_directory
    this.setState({token_name_directory: token_name_directory_clone});
  }

  get_post_data = async (E52contractInstance, web3, e5, contract_addresses) => {
    var created_post_events = await this.load_event_data(web3, E52contractInstance, 'e2', e5, {p3/* item_type */: 18/* 18(post object) */})
    created_post_events = created_post_events.reverse()
    var created_posts = []
    var is_first_time = this.state.created_posts[e5] == null
    for(var i=0; i<created_post_events.length; i++){
      var id = created_post_events[i].returnValues.p2
      var hash = web3.utils.keccak256('en')
      if(created_post_events[i].returnValues.p1.toString() == hash.toString()){
        var post_data = await this.fetch_objects_data(id, web3, e5, contract_addresses);
        created_posts.push({'id':id, 'ipfs':post_data, 'event': created_post_events[i], 'e5':e5, 'timestamp':created_post_events[i].returnValues.p6, 'author':created_post_events[i].returnValues.p5, 'e5_id':id+e5})
      }

      if(is_first_time){
        var created_posts_clone = structuredClone(this.state.created_posts)
        created_posts_clone[e5] = created_posts
        this.setState({created_posts: created_posts_clone})        
      }
    }

    var created_posts_clone = structuredClone(this.state.created_posts)
    created_posts_clone[e5] = created_posts
    this.setState({created_posts: created_posts_clone})

    console.log('post count: '+created_posts.length)
  }

  get_channel_data = async (E52contractInstance, web3, e5, contract_addresses, account) => {
    var created_channel_events = await this.load_event_data(web3, E52contractInstance, 'e2', e5, {p3/* item_type */: 36/* 36(type_channel_target) */})
    created_channel_events = created_channel_events.reverse()

    var created_channel = []
    var is_first_time = this.state.created_channels[e5] == null
    for(var i=0; i<created_channel_events.length; i++){
      var id = created_channel_events[i].returnValues.p2
      var hash = web3.utils.keccak256('en')
      if(created_channel_events[i].returnValues.p1.toString() == hash.toString()){
        var channel_data = await this.fetch_objects_data(id, web3, e5, contract_addresses);

        var moderator_data = await this.load_event_data(web3, E52contractInstance, 'e1', e5, {p1/* target_obj_id */:id, p2/* action_type */:4/* <4>modify_moderator_accounts */})
        var old_moderators = []

        for(var e=0; e<moderator_data.length; e++){
          var mod_id = moderator_data[e].returnValues.p3
          old_moderators.push(mod_id)
        }

        var mod_status_values = await E52contractInstance.methods.f255([id], [old_moderators]).call((error, result) => {});

        var moderators = []
        for(var e=0; e<old_moderators.length; e++){
          var their_status = mod_status_values[0][e]
          if(their_status == true){
            moderators.push(old_moderators[e])
          }
        }

        var interactible_checker_status_values = await E52contractInstance.methods.f254([id],0).call((error, result) => {});

        var my_interactable_time_value = await E52contractInstance.methods.f256([id], [[account]], 0,2).call((error, result) => {});

        var my_blocked_time_value = await E52contractInstance.methods.f256([id], [[account]], 0,3).call((error, result) => {});

        if(interactible_checker_status_values[0] == true && (my_interactable_time_value[0][0] < Date.now()/1000 || !moderators.includes(account))){

        }
        else if(my_blocked_time_value[0][0] > Date.now()/1000){

        }
        else{
          created_channel.push({'id':id, 'ipfs':channel_data, 'event': created_channel_events[i], 'messages':[], 'moderators':moderators, 'access_rights_enabled':interactible_checker_status_values[0], 'my_interactible_time_value':my_interactable_time_value[0][0], 'my_blocked_time_value':my_blocked_time_value[0][0],'e5':e5, 'timestamp':created_channel_events[i].returnValues.p6, 'author':created_channel_events[i].returnValues.p5, 'e5_id':id+e5 });
        }
      }

      if(is_first_time){
        var created_channels_clone = structuredClone(this.state.created_channels)
        created_channels_clone[e5] = created_channel
        this.setState({created_channels: created_channels_clone})
      }
    }

    var created_channels_clone = structuredClone(this.state.created_channels)
    created_channels_clone[e5] = created_channel
    this.setState({created_channels: created_channels_clone})

    console.log('channel count: '+created_channel.length)
  }

  get_job_data = async (E52contractInstance, web3, e5, contract_addresses, account) => {
    var created_job_events = await this.load_event_data(web3, E52contractInstance, 'e2', e5, {p3/* item_type */: 17/* 17(job_object) */})
    created_job_events = created_job_events.reverse()
    var created_job = []
    var created_job_mappings = {}
    var is_first_time = this.state.created_jobs[e5] == null
    for(var i=0; i<created_job_events.length; i++){
      var id = created_job_events[i].returnValues.p2
      var hash = web3.utils.keccak256('en')
      if(created_job_events[i].returnValues.p1.toString() == hash.toString()){
        var job_data = await this.fetch_objects_data(id, web3, e5, contract_addresses);
        var job = {'id':id, 'ipfs':job_data, 'event': created_job_events[i], 'e5':e5, 'timestamp':created_job_events[i].returnValues.p6, 'author':created_job_events[i].returnValues.p5 ,'e5_id':id+e5}
        created_job.push(job)
        created_job_mappings[id] = job
      }

      if(is_first_time){
        var created_jobs_clone = structuredClone(this.state.created_jobs)
        created_jobs_clone[e5] = created_job

        var created_job_mappings_clone = structuredClone(this.state.created_job_mappings)
        created_job_mappings_clone[e5] = created_job_mappings

        this.setState({created_jobs: created_jobs_clone, created_job_mappings:created_job_mappings_clone});
      }
    }

    var my_created_job_respnse_data = await this.load_event_data(web3, E52contractInstance, 'e4', e5, {p2/* target_id */: account, p3/* context */:36})
    var my_applications = []
    // var my_contract_applications = {}
    for(var i=0; i<my_created_job_respnse_data.length; i++){
      var ipfs_data = await this.fetch_objects_data_from_ipfs_using_option(my_created_job_respnse_data[i].returnValues.p4)

      if(ipfs_data['type'] == 'job_application'){
        my_applications.push({'ipfs':ipfs_data, 'event':my_created_job_respnse_data[i], 'e5':e5, 'timestamp':my_created_job_respnse_data[i].returnValues.p6})
      }

      if(is_first_time){
        var my_applications_clone = structuredClone(this.state.my_applications)
        my_applications_clone[e5] = my_applications
        this.setState({my_applications:my_applications_clone})
      }

      // var picked_contract_id = ipfs_data['picked_contract_id']
      // var application_expiry_time = ipfs_data['application_expiry_time']
      // if(my_contract_applications[picked_contract_id] != null){
      //   if(my_contract_applications[picked_contract_id] < application_expiry_time){
      //     my_contract_applications[picked_contract_id] = application_expiry_time
      //   }
      // }else{
      //   my_contract_applications[picked_contract_id] = application_expiry_time
      // }
    }


    var created_jobs_clone = structuredClone(this.state.created_jobs)
    created_jobs_clone[e5] = created_job

    var created_job_mappings_clone = structuredClone(this.state.created_job_mappings)
    created_job_mappings_clone[e5] = created_job_mappings

    var my_applications_clone = structuredClone(this.state.my_applications)
    my_applications_clone[e5] = my_applications

    this.setState({created_jobs: created_jobs_clone, created_job_mappings:created_job_mappings_clone, my_applications:my_applications_clone, /* my_contract_applications:my_contract_applications */})
    console.log('job count: '+created_job.length)
    console.log('job applications count: '+my_applications.length)

  }

  get_sent_mail_data = async (E52contractInstance, e5, account, web3) => {
    var my_created_mail_events = await this.load_event_data(web3, E52contractInstance, 'e4', e5, {p2/* sender_acc_id */: account, p3/* context */:30})
    my_created_mail_events = my_created_mail_events

    var created_mail = []
    var mail_activity = {}
    var is_first_time = this.state.created_mail[e5] == null
    for(var i=0; i<my_created_mail_events.length; i++){
      var convo_id = my_created_mail_events[i].returnValues.p5
      var cid = my_created_mail_events[i].returnValues.p4
      
      var ipfs = await this.fetch_objects_data_from_ipfs_using_option(cid)

      if(!created_mail.includes(convo_id)){
        created_mail.push(convo_id)
        if(mail_activity[convo_id] == null){
          mail_activity[convo_id] = []
        }
      }
      var ipfs_obj = await this.fetch_and_decrypt_ipfs_object(ipfs, e5)
      mail_activity[convo_id].push({'convo_id':convo_id,'id':cid, 'event':my_created_mail_events[i], 'ipfs':ipfs_obj, 'type':'sent', 'time':my_created_mail_events[i].returnValues.p6, 'convo_with':my_created_mail_events[i].returnValues.p1, 'sender':my_created_mail_events[i].returnValues.p2, 'recipient':my_created_mail_events[i].returnValues.p1, 'e5':e5, 'timestamp':my_created_mail_events[i].returnValues.p6, 'author':my_created_mail_events[i].returnValues.p2, 'e5_id':cid})
      
      if(is_first_time){
        var created_mail_clone = structuredClone(this.state.created_mail)
        created_mail_clone[e5] = {'created_mail':created_mail, 'mail_activity':mail_activity}
        this.setState({created_mail: created_mail_clone})
      }
    }

    var created_mail_clone = structuredClone(this.state.created_mail)
    created_mail_clone[e5] = {'created_mail':created_mail, 'mail_activity':mail_activity}
    this.setState({created_mail: created_mail_clone})

    console.log('created mail count: '+created_mail.length)
  }

  get_received_mail_data = async (E52contractInstance, e5, account, web3) => {
    var my_received_mail_events = await this.load_event_data(web3, E52contractInstance, 'e4', e5, {p1/* target_id */: account, p3/* context */:30})
    my_received_mail_events = my_received_mail_events

    var received_mail = []
    var mail_activity = {}
    var is_first_time = this.state.received_mail[e5] == null
    for(var i=0; i<my_received_mail_events.length; i++){
      var convo_id = my_received_mail_events[i].returnValues.p5
      var cid = my_received_mail_events[i].returnValues.p4
      var ipfs = await this.fetch_objects_data_from_ipfs_using_option(cid)

      if(!received_mail.includes(convo_id)){
        received_mail.push(convo_id)
        if(mail_activity[convo_id] == null){
          mail_activity[convo_id] = []
        }
      }
      var ipfs_obj = await this.fetch_and_decrypt_ipfs_object(ipfs, e5)
      
      var obj = {'convo_id':convo_id,'id':cid, 'event':my_received_mail_events[i], 'ipfs':ipfs_obj, 'type':'received', 'time':my_received_mail_events[i].returnValues.p6, 'convo_with':my_received_mail_events[i].returnValues.p2, 'sender':my_received_mail_events[i].returnValues.p2, 'recipient':my_received_mail_events[i].returnValues.p1, 'e5':e5, 'timestamp':my_received_mail_events[i].returnValues.p6, 'author':my_received_mail_events[i].returnValues.p2, 'e5_id':cid}
      mail_activity[convo_id].push(obj)

      if(is_first_time){
        var received_mail_clone = structuredClone(this.state.received_mail)
        received_mail_clone[e5] = {'received_mail':received_mail, 'mail_activity':mail_activity}
        this.setState({received_mail: received_mail_clone})
      }

    }

    var received_mail_clone = structuredClone(this.state.received_mail)
    received_mail_clone[e5] = {'received_mail':received_mail, 'mail_activity':mail_activity}
    this.setState({received_mail: received_mail_clone})

    console.log('received mail count: '+received_mail.length)
  }

  get_storefront_data = async (E52contractInstance, web3, e5, contract_addresses) => {
    var created_store_events = await this.load_event_data(web3, E52contractInstance, 'e2', e5, {p3/* item_type */: 27/* 27(storefront-item) */})
    created_store_events = created_store_events.reverse()
    var created_stores = []
    var created_store_mappings = {}
    var is_first_time = this.state.created_stores[e5] == null
    for(var i=0; i<created_store_events.length; i++){
      var id = created_store_events[i].returnValues.p2
      var hash = web3.utils.keccak256('en')
      if(created_store_events[i].returnValues.p1.toString() == hash.toString()){
        var data = await this.fetch_objects_data(id, web3, e5, contract_addresses);
        if(data != null){
          var obj = {'id':id, 'ipfs':data, 'event': created_store_events[i], 'e5':e5, 'timestamp':created_store_events[i].returnValues.p6, 'author':created_store_events[i].returnValues.p5, 'e5_id':id+e5}
          created_stores.push(obj)
          created_store_mappings[id] = obj
        }
      }
      if(is_first_time){
        var created_stores_clone = structuredClone(this.state.created_stores)
        created_stores_clone[e5] = created_stores

        var created_store_mappings_clone = structuredClone(this.state.created_store_mappings)
        created_store_mappings_clone[e5] = created_store_mappings
        
        this.setState({created_stores: created_stores_clone, created_store_mappings:created_store_mappings_clone})
      }
    }

    var created_stores_clone = structuredClone(this.state.created_stores)
    created_stores_clone[e5] = created_stores

    var created_store_mappings_clone = structuredClone(this.state.created_store_mappings)
    created_store_mappings_clone[e5] = created_store_mappings
    
    this.setState({created_stores: created_stores_clone, created_store_mappings:created_store_mappings_clone})
    
    console.log('store count: '+created_stores.length)
  }

  get_bag_data = async (contractInstance, web3, e5, contract_addresses) => {
    var created_bag_events = await this.load_event_data(web3, contractInstance, 'e1', e5, {p2/* object_type */:25/* 25(storefront_bag_object) */})
    created_bag_events = created_bag_events.reverse();
    var created_bags = []
    var is_first_time = this.state.created_bags[e5] == null
    for(var i=0; i<created_bag_events.length; i++){
      var id = created_bag_events[i].returnValues.p1
      var data = await this.fetch_objects_data(id, web3, e5, contract_addresses);

      if(data != null){
        created_bags.push({'id':id, 'ipfs':data, 'event': created_bag_events[i], 'e5':e5, 'timestamp':created_bag_events[i].returnValues.p4, 'author':created_bag_events[i].returnValues.p3, 'e5_id':id+e5})
      }
      if(is_first_time){
        var created_bags_clone = structuredClone(this.state.created_bags)
        created_bags_clone[e5] = created_bags
        this.setState({created_bags: created_bags_clone})
      }
    }

    var created_bags_clone = structuredClone(this.state.created_bags)
    created_bags_clone[e5] = created_bags
    this.setState({created_bags: created_bags_clone})

    console.log('bag count: '+created_bags.length)
  }

  get_contractor_data = async (E52contractInstance, contract_addresses, e5, web3) => {
    var created_contractor_events = await this.load_event_data(web3, E52contractInstance, 'e2', e5, {p3/* item_type */: 26/* 26(contractor_object) */ })
    created_contractor_events = created_contractor_events.reverse()
    var created_contractor = []
    var is_first_time = this.state.created_contractors[e5] == null
    for(var i=0; i<created_contractor_events.length; i++){
      var id = created_contractor_events[i].returnValues.p2
      var hash = web3.utils.keccak256('en')
      if(created_contractor_events[i].returnValues.p1.toString() == hash.toString()){
        var contractor_data = await this.fetch_objects_data(id, web3, e5, contract_addresses);
        if(contractor_data != null){
          created_contractor.push({'id':id, 'ipfs':contractor_data, 'event': created_contractor_events[i], 'e5':e5, 'timestamp':created_contractor_events[i].returnValues.p6, 'author':created_contractor_events[i].returnValues.p5, 'e5_id':id+e5})
        }
      }

      if(is_first_time){
        var created_contractors_clone = structuredClone(this.state.created_contractors)
        created_contractors_clone[e5] = created_contractor
        this.setState({created_contractors: created_contractors_clone,})
      }
    }

    var created_contractors_clone = structuredClone(this.state.created_contractors)
    created_contractors_clone[e5] = created_contractor
    this.setState({created_contractors: created_contractors_clone,})

    console.log('contractor count: '+created_contractor.length)
  }

  load_run_data = async (contractInstance, E52contractInstance, e5, web3) => {
    var created_subscription_events = await this.load_event_data(web3, contractInstance, 'e1', e5, {p2/* object_type */:33/* subscription_object */ })

    var created_contract_events = await this.load_event_data(web3, contractInstance, 'e1', e5, {p2/* object_type */:30/* contract_obj_id */})

    var created_proposals_events = await this.load_event_data(web3, contractInstance, 'e1', e5, {p2/* object_type */:32/* 32(consensus_request) */})

    var created_token_events = await this.load_event_data(web3, contractInstance, 'e1', e5, {p2/* object_type */:31/* token_exchange */})

    var created_post_events = await this.load_event_data(web3, E52contractInstance, 'e2', e5, {p3/* item_type */: 18/* 18(post object) */ })

    var created_channel_events = await this.load_event_data(web3, E52contractInstance, 'e2', e5, {p3/* item_type */: 36/* 36(type_channel_target) */ })

    var created_job_events = await this.load_event_data(web3, E52contractInstance, 'e2', e5, {p3/* item_type */: 17/* 17(job_object) */})

    var created_store_events = await this.load_event_data(web3, E52contractInstance, 'e2', e5, {p3/* item_type */: 27/* 27(storefront-item) */})

    var created_bag_events = await this.load_event_data(web3, contractInstance, 'e1', e5, {p2/* object_type */:25/* 25(storefront_bag_object) */})

    var created_contractor_events = await this.load_event_data(web3, E52contractInstance, 'e2', e5, {p3/* item_type */: 26/* 26(contractor_object) */})

    var data_events = await this.load_event_data(web3, E52contractInstance, 'e4', e5, {})

    var metadata_events = await this.load_event_data(web3, E52contractInstance, 'e5', e5, {})

    var withdraw_events = await this.load_event_data(web3, contractInstance, 'e2', e5, {})

    var transaction_events = await this.load_event_data(web3, contractInstance, 'e4', e5, {})

    var obj = {'subscription':created_subscription_events, 'contract':created_contract_events, 'proposal':created_proposals_events, 'exchange':created_token_events, 'post':created_post_events, 'channel':created_channel_events, 'job':created_job_events, 'store':created_store_events, 'bag':created_bag_events, 'contractor':created_contractor_events, 'data':data_events, 'metadata':metadata_events, 'withdraw':withdraw_events, 'transaction':transaction_events}

    var all_data_clone = structuredClone(this.state.all_data)
    all_data_clone[e5] = obj
    this.setState({all_data: all_data_clone})
  }




  fetch_objects_data = async (id, web3, e5, addresses) => {
    const E52contractArtifact = require('./contract_abis/E52.json');
    const E52_address = addresses[1];
    const E52contractInstance = new web3.eth.Contract(E52contractArtifact.abi, E52_address);
    var target_id = id;
    var events = await this.load_event_data(web3, E52contractInstance, 'e5', e5, {p1/* target_obj_id */: target_id})
    if(events.length == 0) return;
    var cid = events[events.length - 1].returnValues.p4
    if(cid == 'e3' || cid == 'e2' || cid == 'e1' || cid == 'e') return;

    const response = await this.fetch_objects_data_from_ipfs_using_option(cid)
    return response

  }



  fetch_objects_data_from_ipfs_using_option = async (ecid) => {
    if(!ecid.includes('.')){
      var data = await this.fetch_object_data_from_infura(ecid)
      return data
    }
    var split_cid_array = ecid.split('.');
    var option = split_cid_array[0]
    var cid = split_cid_array[1]

    if(option == 'in'){
      var data = this.fetch_from_storage(cid)
      if(data == null){
        data = await this.fetch_object_data_from_infura(cid, 0)
        this.store_in_local_storage(cid, data)
      }
      return data
    }
    else if(option == 'we'){
      var data = this.fetch_from_storage(cid)
      if(data == null){
        data = await this.fetch_objects_data_from_web3(cid, 0)
        this.store_in_local_storage(cid, data)
      }
      return data
    }
    else if(option == 'nf'){
      var data = this.fetch_from_storage(cid)
      if(data == null){
        data = await this.fetch_objects_data_from_nft_storage(cid, 0)
        this.store_in_local_storage(cid, data)
      }
      return data
    }
  }

  store_objects_data_in_ipfs_using_option = async (data) => {
    var set_storage_option = this.state.storage_option

    if(set_storage_option == 'infura'){
      var cid = await this.store_data_in_infura(data)
      return 'in.'+cid;
    }
    else if(set_storage_option == 'web3-storage'){
      var cid = await this.store_data_in_web3(data)
      return 'we.'+cid;
    }
    else if(set_storage_option == 'nft-storage'){
      var cid = await this.store_data_in_nft_storage(data)
      return 'nf.'+cid;
    }
  }



  store_data_in_infura = async (data) => {
    const projectId = `${process.env.REACT_APP_INFURA_API_KEY}`;
    const projectSecret = `${process.env.REACT_APP_INFURA_API_SECRET}`;
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
      const added = await client.add(data)
      return added.path.toString()
    } catch (error) {
      console.log('Error uploading file: ', error)
    }
  }

  fetch_object_data_from_infura = async (cid, depth) => {
    await this.wait(this.state.ipfs_delay)
    var gateways = [
      `https://ipfs.io/ipfs/${cid}`,
      `https://gateway.ipfs.io/ipfs/${cid}`,
      `https://cloudflare-ipfs.com/ipfs/${cid}`,
      `https://dweb.link/ipfs/${cid}`,
      // `https://gateway.pinata.cloud/ipfs/${cid}`,
      `https://nftstorage.link/ipfs/${cid}`,
      `https://hardbin.com/ipfs/${cid}`,
      `https://4everland.io/ipfs/${cid}`,
      `https://cf-ipfs.com/ipfs/${cid}`,
      `https://ipfs.decentralized-content.com/ipfs/${cid}`,
      `https://ipfs.eth.aragon.network/ipfs/${cid}`,
      `https://pz-acyuix.meson.network/ipfs/${cid}`,
      `https://fleek.ipfs.io/ipfs/${cid}`,
      `https://ipfs.w3s.link/ipfs/${cid}`,
    ]
    
    await this.wait(this.state.ipfs_delay)
    var selected_gateway = gateways[Math.round(Math.random() * 12)]

    try {
      
      const response = await fetch(selected_gateway);
      if (!response.ok) {
        throw new Error(`Failed to retrieve data from IPFS. Status: ${response}`);
      }
      const data = await response.text();
      return JSON.parse(data);
      // Do something with the retrieved data
    } catch (error) {
      console.log('Error fetching infura file: ', error)

      if(depth<5){
        return this.fetch_object_data_from_infura(cid, depth+1)
      }
    }
  }



  store_data_in_web3 = async (data) => {
    const client = new Web3Storage({ token: `${process.env.REACT_APP_WEB3_STORAGE_ACCESS_TOKEN}` })

    var file = this.makeFileObjects(data);
    const cid = await client.put(file)
    return cid
  }

  makeFileObjects(data) {
    // You can create File objects from a Blob of binary data
    // see: https://developer.mozilla.org/en-US/docs/Web/API/Blob
    // Here we're just storing a JSON object, but you can store images,
    // audio, or whatever you want!
    const obj = { data: data }
    const blob = new Blob([JSON.stringify(obj)], { type: 'application/json' })

    const files = [
      new File([blob], 'bry.json'),
      new File(['contents-of-file-1'], 'plain-utf8.txt')
    ]
    return files
  }

  fetch_objects_data_from_web3 = async (cid, depth) => {
    // const client = new Web3Storage({ token: `${process.env.REACT_APP_WEB3_STORAGE_ACCESS_TOKEN}` })

    // try{
    //   const res = await client.get(cid)
    //   const files = await res.files()

    //   var file = files[0]
    //   return JSON.parse(JSON.parse(await file.text()).data);
    // }catch(e){
    //   console.log(e)
    //   return null
    // }

    var gateways = [
      `https://ipfs.io/ipfs/${cid}/bry.json`,
      `https://gateway.ipfs.io/ipfs/${cid}/bry.json`,
      `https://cloudflare-ipfs.com/ipfs/${cid}/bry.json`,
      `https://dweb.link/ipfs/${cid}/bry.json`,
      // `https://gateway.pinata.cloud/ipfs/${cid}/bry.json`,
      `https://nftstorage.link/ipfs/${cid}/bry.json`,
      `https://hardbin.com/ipfs/${cid}/bry.json`,
      `https://4everland.io/ipfs/${cid}/bry.json`,
      `https://cf-ipfs.com/ipfs/${cid}/bry.json`,
      `https://ipfs.decentralized-content.com/ipfs/${cid}/bry.json`,
      `https://ipfs.eth.aragon.network/ipfs/${cid}/bry.json`,
      `https://pz-acyuix.meson.network/ipfs/${cid}/bry.json`,
      `https://fleek.ipfs.io/ipfs/${cid}/bry.json`,
      `https://ipfs.w3s.link/ipfs/${cid}/bry.json`,
    ]
    
    await this.wait(this.state.ipfs_delay)
    var selected_gateway = gateways[Math.round(Math.random() * 11)]
    try {
      const response = await fetch(selected_gateway);
      if (!response.ok) {
        throw new Error(`Failed to retrieve data from IPFS. Status: ${response}`);
      }
      const data = await response.text();
      var json = JSON.parse((JSON.parse(data)).data);
      return json
      // Do something with the retrieved data
    } catch (error) {
      console.log('Error fetching web3.storage file: ', error)

      if(depth<5){
        return this.fetch_objects_data_from_web3(cid, depth+1)
      }
    }
    
  }




  store_data_in_nft_storage = async (data) => {
    const NFT_STORAGE_TOKEN = `${process.env.REACT_APP_NFT_STORAGE_ACCESS_TOKEN}`
    const client = new NFTStorage({ token: NFT_STORAGE_TOKEN })

    const someData = new Blob([data])
    const cid = await client.storeBlob(someData)

    return cid;
  }


  fetch_objects_data_from_nft_storage = async (cid, depth) => {
    await this.wait(this.state.ipfs_delay)
    var gateways = [
      `https://ipfs.io/ipfs/${cid}`,
      `https://gateway.ipfs.io/ipfs/${cid}`,
      `https://cloudflare-ipfs.com/ipfs/${cid}`,
      `https://dweb.link/ipfs/${cid}`,
      // `https://gateway.pinata.cloud/ipfs/${cid}`,
      `https://nftstorage.link/ipfs/${cid}`,
      `https://hardbin.com/ipfs/${cid}`,
      `https://4everland.io/ipfs/${cid}`,
      `https://cf-ipfs.com/ipfs/${cid}`,
      `https://ipfs.decentralized-content.com/ipfs/${cid}`,
      `https://ipfs.eth.aragon.network/ipfs/${cid}`,
      `https://pz-acyuix.meson.network/ipfs/${cid}`,
      `https://fleek.ipfs.io/ipfs/${cid}`,
      `https://ipfs.w3s.link/ipfs/${cid}`,
    ]
    
    await this.wait(this.state.ipfs_delay)
    var selected_gateway = gateways[Math.round(Math.random() * 12)]

    try {
      const response = await fetch(selected_gateway);
      if (!response.ok) {
        throw new Error(`Failed to retrieve data from IPFS. Status: ${response}`);
      }
      const data = await response.text();
      return JSON.parse(data);
      // Do something with the retrieved data
    } catch (error) {
      console.log('Error fetching nft storage file: ', error)

      if(depth<5){
        return this.fetch_objects_data_from_nft_storage(cid, depth+1)
      }
    }
  }



  fetch_from_storage(cid){
    if(this.gateway_traffic_cache == null){
      this.gateway_traffic_cache = {}
    }
    return this.gateway_traffic_cache[cid] 
  }

  store_in_local_storage(cid, data){
    if(this.gateway_traffic_cache == null){
      this.gateway_traffic_cache = {}
    }
    this.gateway_traffic_cache[cid] = data
  }

  wait = async (t) => {
    await this.sleep(t)
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }





  get_balance_in_exchange = async (exchange_id, account, e5, addresses) => {
      const web3 = new Web3(this.get_web3_url_from_e5(e5));
      const H52contractArtifact = require('./contract_abis/H52.json');
      const H52_address = addresses[6];
      const H52contractInstance = new web3.eth.Contract(H52contractArtifact.abi, H52_address);
      
      var token_balances = await H52contractInstance.methods.f140e([exchange_id], account, [0]).call((error, result) => {});

      return token_balances[0]
  }

  get_balance_in_exchange_for_multiple_accounts = async (exchange_ids, accounts, e5, addresses, depths, action) => {
      const web3 = new Web3(this.get_web3_url_from_e5(e5));
      const H52contractArtifact = require('./contract_abis/H52.json');
      const H52_address = addresses[6];
      const H52contractInstance = new web3.eth.Contract(H52contractArtifact.abi, H52_address);
      
      var token_balances = await H52contractInstance.methods.f270(exchange_ids, accounts, depths, 1, action).call((error, result) => {});

      return token_balances
  }







  // encrypt_data = async () => {
  //   var address = await this.get_accounts_address(1002)
  //   console.log(address)

  //   const web3 = new Web3(this.state.web3);
  //   console.log(this.state.account)
  //   const privateKey = this.state.account.privateKey
  //   var hash = web3.utils.keccak256(privateKey.toString()).slice(34)

  //   // const pubKey = secp256k1.publicKeyCreate(Uint8Array.from(this.state.account.privateKey.slice(1)), false)
  //   // const publicKey = privateKeyToPublicKey(privateKey).toString('hex')
    
  //   var data = 'hello world'
  //   var private_key_to_use = Buffer.from(hash)
  //   const publicKeyA = await ecies.getPublic(private_key_to_use);
  //   // console.log(publicKeyA)
    
  //   const encrypted_data = (await ecies.encrypt(publicKeyA, Buffer.from(data)))
  //   // console.log(encrypted_data)
  //   var string = (new Uint8Array(encrypted_data)).toString()

  //   var uint8array = Uint8Array.from(string.split(',').map(x=>parseInt(x,10)));
  //   // console.log(uint8array)
  //   var plain_text = await ecies.decrypt(private_key_to_use, uint8array)
  //   // console.log(plain_text.toString())


  //   var ciphertext = CryptoJS.AES.encrypt('my message', 'secret key 123').toString();
  //   var bytes  = CryptoJS.AES.decrypt(ciphertext, 'secret key 123');
  //   var originalText = bytes.toString(CryptoJS.enc.Utf8);
  //   // console.log(originalText)

  //   this.get_accounts_public_key(1002)
  // }

  // get_accounts_address = async (account_id) => {
  //   const web3 = new Web3(this.state.web3);
  //   const contractArtifact = require('./contract_abis/E5.json');
  //   const contractAddress = this.state.e5_address
  //   const contractInstance = new web3.eth.Contract(contractArtifact.abi, contractAddress);

  //   return await contractInstance.methods.f289(account_id).call((error, result) => {});
  // }






  get_account_public_key = async () => {
    const web3 = new Web3(this.get_selected_web3_url());
    const privateKey = this.state.accounts[this.state.selected_e5].privateKey
    var hash = web3.utils.keccak256(privateKey.toString()).slice(34)
    var private_key_to_use = Buffer.from(hash)
    const publicKeyA = await ecies.getPublic(private_key_to_use);
    var key = (new Uint8Array(publicKeyA)).toString()//oh my god

    var object_as_string = JSON.stringify({'key':key})
    var obj_cid = await this.store_objects_data_in_ipfs_using_option(object_as_string)
    return obj_cid
  }

  get_account_raw_public_key = async () => {
    const web3 = new Web3(this.get_selected_web3_url());
    const privateKey = this.state.accounts[this.state.selected_e5].privateKey
    var hash = web3.utils.keccak256(privateKey.toString()).slice(34)
    var private_key_to_use = Buffer.from(hash)
    const publicKeyA = await ecies.getPublic(private_key_to_use);
    return publicKeyA
  }

  encrypt_data_object(tx, key){
    var object_as_string = JSON.stringify(tx)
    var ciphertext = CryptoJS.AES.encrypt(object_as_string, key).toString();
    return ciphertext
  }

  get_accounts_public_key = async (account, e5) => {
    const web3 = new Web3(this.get_web3_url_from_e5(e5));
    const E52contractArtifact = require('./contract_abis/E52.json');
    console.log(this.state.addresses)
    console.log(e5)
    const E52_address = this.state.addresses[e5][1];
    const E52contractInstance = new web3.eth.Contract(E52contractArtifact.abi, E52_address);
    var events = await this.load_event_data(web3, E52contractInstance, 'e4', e5, {p1/* target_id */: account, p3/* context */:'0'})

    var filtered_events = events;

    if(filtered_events.length == 0){
      return ''
    }
    var obj_key = await this.fetch_objects_data_from_ipfs_using_option(filtered_events[filtered_events.length-1].returnValues.p4)
    var uint8array = Uint8Array.from(obj_key['key'].split(',').map(x=>parseInt(x,10))); 
    return uint8array
  }

  encrypt_key_with_accounts_public_key_hash = async (key, pub_key_hash) => {
    const encrypted_data = (await ecies.encrypt(pub_key_hash, Buffer.from(key)))
    var string = (new Uint8Array(encrypted_data)).toString()
    return string
  }

  fetch_and_decrypt_ipfs_object = async (encrypted_ipfs_obj, e5) => {
    const web3 = new Web3(this.get_web3_url_from_e5(e5));
    const privateKey = this.state.accounts[e5].privateKey
    var hash = web3.utils.keccak256(privateKey.toString()).slice(34)
    var private_key_to_use = Buffer.from(hash)

    if(encrypted_ipfs_obj == null || encrypted_ipfs_obj['recipient_data'] == null){
      return null
    }

    try{
      var encrypted_key = encrypted_ipfs_obj['recipient_data'][this.state.user_account_id[e5]]
      var uint8array = Uint8Array.from(encrypted_key.split(',').map(x=>parseInt(x,10)));
    
      var my_key = await ecies.decrypt(private_key_to_use, uint8array)
      var encrypted_object = encrypted_ipfs_obj['obj']
    
      var bytes  = CryptoJS.AES.decrypt(encrypted_object, my_key.toString());
      var originalText = bytes.toString(CryptoJS.enc.Utf8);
      return JSON.parse(originalText);
    }catch(e){
      console.log(e)
      return null
    }
    
  }







  get_objects_messages = async (id, e5) => {
    var messages = []
    for(var i=0; i<this.state.e5s['data'].length; i++){
      var focused_e5 = this.state.e5s['data'][i]
      const web3 = new Web3(this.get_web3_url_from_e5(focused_e5));
      const E52contractArtifact = require('./contract_abis/E52.json');
      if(this.state.addresses[focused_e5] != null){
        const E52_address = this.state.addresses[focused_e5][1];
        const E52contractInstance = new web3.eth.Contract(E52contractArtifact.abi, E52_address);

        var e5_id = parseInt(e5.replace('E',''))
        var created_channel_data = await this.load_event_data(web3, E52contractInstance, 'e4', focused_e5, {p1/* target_id */: 17, p3/* context */:id, p5: e5_id})

        var is_first_time = this.state.object_messages[id] == null ? true: false
        for(var j=0; j<created_channel_data.length; j++){
          var ipfs_message = await this.fetch_objects_data_from_ipfs_using_option(created_channel_data[j].returnValues.p4)
          if(ipfs_message != null){
            messages.push(ipfs_message)

            if(is_first_time){
              var clone = JSON.parse(JSON.stringify(this.state.object_messages))
              clone[id] = messages
              this.setState({object_messages: clone})
            }
          }
        }
      }
      
    }

    var clone = JSON.parse(JSON.stringify(this.state.object_messages))
    clone[id] = messages
    this.setState({object_messages: clone})
  }

  get_job_objects_responses = async (id, e5) =>{
    const web3 = new Web3(this.get_web3_url_from_e5(e5));
    const E52contractArtifact = require('./contract_abis/E52.json');
    const E52_address = this.state.addresses[e5][1];
    const E52contractInstance = new web3.eth.Contract(E52contractArtifact.abi, E52_address);

    var created_job_respnse_data = await this.load_event_data(web3, E52contractInstance, 'e4', e5, {p1/* target_id */: id, p3/* context */:36})

    var application_responses = await this.load_event_data(web3, E52contractInstance, 'e4', e5, {p1/* target_id */: id, p3/* context */:37})

    var messages = []
    var is_first_time = this.state.job_responses[id] == null ? true: false
    for(var j=0; j<created_job_respnse_data.length; j++){
      var ipfs_message = await this.fetch_objects_data_from_ipfs_using_option(created_job_respnse_data[j].returnValues.p4)
      if(ipfs_message != null){
        ipfs_message['contract'] = this.state.created_contract_mapping[e5][ipfs_message['picked_contract_id']]
        ipfs_message['id'] = created_job_respnse_data[j].returnValues.p5
        ipfs_message['job_id'] = id;
        ipfs_message['e5'] = e5


        var filtered_events = []
        for(var i=0; i<application_responses.length; i++){
          if(application_responses[i].returnValues.p5 == created_job_respnse_data[j].returnValues.p5){
            filtered_events.push(application_responses[i])
          }
        }
        if(filtered_events.length > 0){
          var last_response = filtered_events[filtered_events.length -1]
          var last_response_ipfs_obj = await this.fetch_objects_data_from_ipfs_using_option(last_response.returnValues.p4)
          // console.log(last_response_ipfs_obj)
          ipfs_message['is_response_accepted'] = last_response_ipfs_obj['accepted'];
        }else{
          ipfs_message['is_response_accepted'] = false
        }

        messages.push(ipfs_message)
        if(is_first_time){
          var clone = JSON.parse(JSON.stringify(this.state.job_responses))
          clone[id] = messages
          this.setState({job_responses: clone})
        }
      }
    }

    var clone = JSON.parse(JSON.stringify(this.state.job_responses))
    clone[id] = messages
    this.setState({job_responses: clone})

  }

  get_direct_purchase_events = async (id, e5) => {
    const web3 = new Web3(this.get_web3_url_from_e5(e5));
    const H52contractArtifact = require('./contract_abis/H52.json');
    const H52_address = this.state.addresses[e5][6];
    const H52contractInstance = new web3.eth.Contract(H52contractArtifact.abi, H52_address);

    var created_awward_data = await this.load_event_data(web3, H52contractInstance, 'e5', e5, {p3/* awward_context */: id})

    var direct_purchases = []
    var is_first_time_for_direct_purchases = this.state.direct_purchases[id] == null ? true: false
    for(var j=0; j<created_awward_data.length; j++){
      var ipfs_message = await this.fetch_objects_data_from_ipfs_using_option(created_awward_data[j].returnValues.p4)
      if(ipfs_message != null){
        direct_purchases.push(ipfs_message)
      }

      if(is_first_time_for_direct_purchases){
        var clone = JSON.parse(JSON.stringify(this.state.direct_purchases))
        clone[id] = direct_purchases
        this.setState({direct_purchases: clone})
      }
    }

    var clone = JSON.parse(JSON.stringify(this.state.direct_purchases))
    clone[id] = direct_purchases
    this.setState({direct_purchases: clone})


    const E52contractArtifact = require('./contract_abis/E52.json');
    const E52_address = this.state.addresses[e5][1];
    const E52contractInstance = new web3.eth.Contract(E52contractArtifact.abi, E52_address);

    var created_fulfilment_data = await this.load_event_data(web3, E52contractInstance, 'e4', e5, {p1/* target_id */: id})
    
    var fulfilments = {}
    var is_first_time_for_fulfilments = this.state.direct_purchase_fulfilments[id] == null ? true: false
    for(var j=0; j<created_fulfilment_data.length; j++){
      var ipfs_message = await this.fetch_objects_data_from_ipfs_using_option(created_fulfilment_data[j].returnValues.p4)
      if(ipfs_message != null){
        var signature_data = ipfs_message['signature_data']
        fulfilments[signature_data] = ipfs_message
      }

      if(is_first_time_for_fulfilments){
        var fulfilment_clone = JSON.parse(JSON.stringify(this.state.direct_purchase_fulfilments))
        fulfilment_clone[id] = fulfilments
        this.setState({direct_purchase_fulfilments: fulfilment_clone})
      }
    }

    var fulfilment_clone = JSON.parse(JSON.stringify(this.state.direct_purchase_fulfilments))
    fulfilment_clone[id] = fulfilments
    this.setState({direct_purchase_fulfilments: fulfilment_clone})
  }

  get_contractor_applications = async (id, E5) =>{
    const web3 = new Web3(this.get_web3_url_from_e5(E5));
    const E52contractArtifact = require('./contract_abis/E52.json');
    const E52_address = this.state.addresses[E5][1];
    const E52contractInstance = new web3.eth.Contract(E52contractArtifact.abi, E52_address);

    var created_job_respnse_data = await this.load_event_data(web3, E52contractInstance, 'e4', E5, {p1/* target_id */: id, p3/* context */:38})

    var application_responses = await this.load_event_data(web3, E52contractInstance, 'e4', E5, {p1/* target_id */: id, p3/* context */:39})

    var messages = []
    var is_first_time = this.state.contractor_applications[id] == null ? true: false
    for(var j=0; j<created_job_respnse_data.length; j++){
      var ipfs_message = await this.fetch_objects_data_from_ipfs_using_option(created_job_respnse_data[j].returnValues.p4)
      if(ipfs_message != null){
        ipfs_message['request_id'] = created_job_respnse_data[j].returnValues.p5
        ipfs_message['contractor_post_id'] = id;
        ipfs_message['e5'] = E5


        var filtered_events = []
        for(var i=0; i<application_responses.length; i++){
          if(application_responses[i].returnValues.p5 == created_job_respnse_data[j].returnValues.p5){
            filtered_events.push(application_responses[i])
          }
        }
        if(filtered_events.length > 0){
          var last_response = filtered_events[filtered_events.length -1]
          var last_response_ipfs_obj = await this.fetch_objects_data_from_ipfs_using_option(last_response.returnValues.p4)
          ipfs_message['is_response_accepted'] = last_response_ipfs_obj['accepted'];
          ipfs_message['contract'] = this.get_all_sorted_objects_mappings(this.state.created_contract_mapping)[last_response_ipfs_obj['contract_id']]
        }else{
          ipfs_message['is_response_accepted'] = false
        }

        messages.push(ipfs_message)
      }
      if(is_first_time){
        var clone = JSON.parse(JSON.stringify(this.state.contractor_applications))
        clone[id] = messages
        this.setState({contractor_applications: clone})
      }
    }

    var clone = JSON.parse(JSON.stringify(this.state.contractor_applications))
    clone[id] = messages
    this.setState({contractor_applications: clone})

  }

  get_all_sorted_objects_mappings(object){
        var all_objects = {}
        for(var i=0; i<this.state.e5s['data'].length; i++){
            var e5 = this.state.e5s['data'][i]
            var e5_objects = object[e5]
            var all_objects_clone = structuredClone(all_objects)
            all_objects = { ...all_objects_clone, ...e5_objects}
        }

        return all_objects
  }


  load_job_request_messages = async (contractor_id, request_id, e5) =>{
    var messages = []
    for(var i=0; i<this.state.e5s['data'].length; i++){
      var focused_e5 = this.state.e5s['data'][i]
      const web3 = new Web3(this.get_web3_url_from_e5(focused_e5));
      const E52contractArtifact = require('./contract_abis/E52.json');
      
      if(this.state.addresses[focused_e5] != null){
        const E52_address = this.state.addresses[focused_e5][1];
        const E52contractInstance = new web3.eth.Contract(E52contractArtifact.abi, E52_address);

        var created_channel_data = await this.load_event_data(web3, E52contractInstance, 'e4', focused_e5, {p1/* target_id */: 17/* shadow_object_container */, p3/* context */:contractor_id, p5/* int_data */:request_id})
        var is_first_time = this.state.object_messages[request_id] == null ? true: false
        for(var j=0; j<created_channel_data.length; j++){
          var ipfs_message = await this.fetch_objects_data_from_ipfs_using_option(created_channel_data[j].returnValues.p4)
          if(ipfs_message != null && ipfs_message['e5'] == e5){
            messages.push(ipfs_message)
          }

          if(is_first_time){
            var clone = JSON.parse(JSON.stringify(this.state.object_messages))
            clone[request_id] = messages
            this.setState({object_messages: clone})
          }
        }
      }
    }

    var clone = JSON.parse(JSON.stringify(this.state.object_messages))
    clone[request_id] = messages
    this.setState({object_messages: clone})
  }

  get_post_award_data = async (id, e5) => {
    const web3 = new Web3(this.get_web3_url_from_e5(e5));
    const H52contractArtifact = require('./contract_abis/H52.json');
    const H52_address = this.state.addresses[e5][6];
    const H52contractInstance = new web3.eth.Contract(H52contractArtifact.abi, H52_address);

    var created_awward_data = await this.load_event_data(web3, H52contractInstance, 'e5', e5, {p3/* awward_context */: id})

    var award_events = []
    var is_first_time = this.state.award_data[id] == null ? true: false
    for(var j=0; j<created_awward_data.length; j++){
      var ipfs_message = await this.fetch_objects_data_from_ipfs_using_option(created_awward_data[j].returnValues.p4)
      if(ipfs_message != null){
        award_events.push(ipfs_message)
      }

      if(is_first_time){
        var clone = JSON.parse(JSON.stringify(this.state.award_data))
        clone[id] = award_events
        this.setState({award_data: clone})
      }
    }

    var clone = JSON.parse(JSON.stringify(this.state.award_data))
    clone[id] = award_events
    this.setState({award_data: clone})
  }





  load_modify_item_data = async (modify_target, e5) => {
    const web3 = new Web3(this.get_web3_url_from_e5(e5));
    const E52contractArtifact = require('./contract_abis/E52.json');
    const E52_address = this.state.addresses[e5][1];
    const E52contractInstance = new web3.eth.Contract(E52contractArtifact.abi, E52_address);

    var modify_id = parseInt(modify_target)
    var modify_id_type = await E52contractInstance.methods.f135(modify_id).call((error, result) => {});

    if(modify_id_type == 31/* 31(token_exchange) */){
      const H5contractArtifact = require('./contract_abis/H5.json');
      const H5_address = this.state.addresses[e5][5];
      const H5contractInstance = new web3.eth.Contract(H5contractArtifact.abi, H5_address);

      var exchange_data = await H5contractInstance.methods.f85(modify_id).call((error, result) => {});
      return {'data': exchange_data, 'type':modify_id_type};
    }
    else if(modify_id_type == 33/* 33(subscription_object) */){
      const F5contractArtifact = require('./contract_abis/F5.json');
      const F5_address = this.state.addresses[e5][2];
      const F5contractInstance = new web3.eth.Contract(F5contractArtifact.abi, F5_address);

      var subscription_data = await F5contractInstance.methods.f73(modify_id).call((error, result) => {});
      return {'data': subscription_data, 'type':modify_id_type};
    }
    else{
      const G5contractArtifact = require('./contract_abis/G5.json');
      const G5_address = this.state.addresses[e5][3];
      const G5contractInstance = new web3.eth.Contract(G5contractArtifact.abi, G5_address);

      var contract_data = await G5contractInstance.methods.f77(modify_id, false).call((error, result) => {});
      return {'data': contract_data, 'type':modify_id_type};
    }
  }

  test_generate_signature= async (account) => {
    const web3 = new Web3(this.state.web3);

    var data = 'hello world'
    var address = account.address
    console.log('----------------------www----------------------')
    console.log('account address: ',address)

    web3.eth.accounts.wallet.add(account.privateKey);
    var signature = await web3.eth.sign(data, address)
    
    console.log('signature: ',signature)
    var original_address = await web3.eth.accounts.recover(data, signature)
    console.log('original address: ',original_address)


  }




  add_account_to_contacts = async (account) => {
    if(this.check_for_duplicates(account)){
      this.prompt_top_notification('A matching contact was found', 2600)
      return
    }

    var me = this.state.user_account_id[this.state.selected_e5]
    if(account == me){
      this.prompt_top_notification('You cant add yourself!', 2600)
      return
    }

    this.prompt_top_notification('Adding account ID to Contacts...', 1600)
    const web3 = new Web3(this.get_selected_web3_url());
    const contractArtifact = require('./contract_abis/E5.json');
    const contractAddress = this.get_selected_E5_contract()
    const contractInstance = new web3.eth.Contract(contractArtifact.abi, contractAddress);

    var account_address = await contractInstance.methods.f289(account).call((error, result) => {});
    var contacts_object_clone = structuredClone(this.state.contacts)
    if(contacts_object_clone[this.state.selected_e5] == null){
      contacts_object_clone[this.state.selected_e5] = []
    }
    contacts_object_clone[this.state.selected_e5].push({'id':account.toString(), 'address':account_address.toString()})

    this.setState({contacts: contacts_object_clone, should_update_contacts_onchain: true})

    var me = this;
    setTimeout(function() {
        me.set_cookies()
    }, (1 * 1000));
  }

  check_for_duplicates(account){
    var do_duplicates_exist = false
    if(this.state.contacts[this.state.selected_e5] == null){
      return do_duplicates_exist;
    }
    this.state.contacts[this.state.selected_e5].forEach(contact => {
      if(contact['id'] == account){
        do_duplicates_exist = true
      }
    });
    return do_duplicates_exist
  }
 
  add_account_to_blocked_list = async (account) => {
    if(this.check_for_blocked_duplicates(account)){
      this.prompt_top_notification('A matching blocked account was found', 2600)
      return
    }
    var me = this.state.user_account_id[this.state.selected_e5]
    if(account == me){
      this.prompt_top_notification('You cant block yourself!', 2600)
      return
    }
    this.prompt_top_notification('Adding account ID to blocked list...', 1600)
    const web3 = new Web3(this.get_selected_web3_url());
    const contractArtifact = require('./contract_abis/E5.json');
    const contractAddress = this.get_selected_E5_contract()
    const contractInstance = new web3.eth.Contract(contractArtifact.abi, contractAddress);

    var account_address = await contractInstance.methods.f289(account).call((error, result) => {});
    var blocked_object_clone = structuredClone(this.state.blocked_accounts)
    if(blocked_object_clone[this.state.selected_e5] == null){
      blocked_object_clone[this.state.selected_e5] = []
    }
    blocked_object_clone[this.state.selected_e5].push({'id':account.toString(), 'address':account_address.toString()})

    this.setState({blocked_accounts: blocked_object_clone, should_update_blocked_accounts_onchain: true})

    var me = this;
    setTimeout(function() {
      me.set_cookies()
    }, (1 * 1000));
  }

  check_for_blocked_duplicates(account){
    var do_duplicates_exist = false
    if(this.state.blocked_accounts[this.state.selected_e5] == null){
      return do_duplicates_exist
    }
    this.state.blocked_accounts[this.state.selected_e5].forEach(contact => {
      if(contact['id'] == account){
        do_duplicates_exist = true
      }
    });
    return do_duplicates_exist
  }
  






  get_contract_event_data = async (id, e5) => {
    const web3 = new Web3(this.get_web3_url_from_e5(e5));
    const G5contractArtifact = require('./contract_abis/G5.json');
    const G5_address = this.state.addresses[e5][3];
    const G5contractInstance = new web3.eth.Contract(G5contractArtifact.abi, G5_address);


    var make_proposal_event_data = await this.load_event_data(web3, G5contractInstance, 'e1', e5, {p1/* contract_id */: id})

    var modify_object_event_data = await this.load_event_data(web3, G5contractInstance, 'e2', e5, {p1/* contract_or_proposal_id */: id})

    // console.log('---------------------------get_contract_event_data-----------------------------------')
    // console.log(make_proposal_event_data)

    const G52contractArtifact = require('./contract_abis/G52.json');
    const G52_address = this.state.addresses[e5][4];
    const G52contractInstance = new web3.eth.Contract(G52contractArtifact.abi, G52_address);

    var enter_contract_event_data = await this.load_event_data(web3, G52contractInstance, 'e2', e5, {p1/* contract_id */: id , p3/* action */: 3})

    var extend_contract_event_data = await this.load_event_data(web3, G52contractInstance, 'e2', e5, {p1/* contract_id */: id , p3/* action */: 14})

    var exit_contract_event_data = await this.load_event_data(web3, G52contractInstance, 'e2', e5, {p1/* contract_id */: id , p3/* action */: 11})

    var force_exit_contract_event_data = await this.load_event_data(web3, G52contractInstance, 'e2', e5, {p1/* contract_id */: id , p3/* action */: 18})


    var contract_token_event_data = await this.get_token_event_data(id, e5);

    var clone = structuredClone(this.state.contract_events)
    clone[id] = {'modify_object':modify_object_event_data.reverse(), 'make_proposal':make_proposal_event_data.reverse(), 'enter_contract':enter_contract_event_data.reverse(), 'extend_contract':extend_contract_event_data.reverse(), 'exit_contract':exit_contract_event_data.reverse(), 'force_exit':force_exit_contract_event_data.reverse(), 'transfer':contract_token_event_data}

    this.setState({contract_events: clone})
  }

  get_token_event_data = async (id, e5) => {
    const web3 = new Web3(this.get_web3_url_from_e5(e5));
    const H52contractArtifact = require('./contract_abis/H52.json');
    const H52_address = this.state.addresses[e5][6];
    const H52contractInstance = new web3.eth.Contract(H52contractArtifact.abi, H52_address);

    var send_tokens_event_data = await this.load_event_data(web3, H52contractInstance, 'e1', e5, {p2/* sender */: id})

    var received_tokens_event_data = await this.load_event_data(web3, H52contractInstance, 'e1', e5, {p3/* receiver */: id})

    var all_events = [];
    for(var i=0; i<send_tokens_event_data.length; i++){
      all_events.push({'event':send_tokens_event_data[i], 'action':'Sent', 'timestamp':send_tokens_event_data[i].returnValues.p5})
    }
    for(var i=0; i<received_tokens_event_data.length; i++){
      all_events.push({'event':received_tokens_event_data[i], 'action':'Received', 'timestamp':received_tokens_event_data[i].returnValues.p5})
    }
    var sorted_events = this.sortByAttributeDescending(all_events, 'timestamp');

    return sorted_events;

  }

  get_proposal_event_data = async (id, e5) => {
    const web3 = new Web3(this.get_web3_url_from_e5(e5));
    const G52contractArtifact = require('./contract_abis/G52.json');
    const G52_address = this.state.addresses[e5][4];
    const G52contractInstance = new web3.eth.Contract(G52contractArtifact.abi, G52_address);

    var record_proposal_vote_event_data = await this.load_event_data(web3, G52contractInstance, 'e1', e5, {p2/* consensus_id */: id})

    var submit_proposal_event_data = await this.load_event_data(web3, G52contractInstance, 'e3', e5, {p1/* proposal_id */: id })

    var archive_proposal_event_data = await this.load_event_data(web3, G52contractInstance, 'e6', e5, {p1/* proposal_id */: id})

    var proposal_token_event_data = await this.get_token_event_data(id, e5);

    var clone = structuredClone(this.state.proposal_events)
    clone[id] = {'vote':record_proposal_vote_event_data, 'submit':submit_proposal_event_data, 'archive':archive_proposal_event_data, 'transfer':proposal_token_event_data}

    this.setState({proposal_events: clone})
  }

  get_subscription_event_data = async (id, e5) => {
    const web3 = new Web3(this.get_web3_url_from_e5(e5));
    const F5contractArtifact = require('./contract_abis/F5.json');
    const F5_address = this.state.addresses[e5][2];
    const F5contractInstance = new web3.eth.Contract(F5contractArtifact.abi, F5_address);

    var pay_subscription_event_data = await this.load_event_data(web3, F5contractInstance, 'e1', e5, {p1/* subscription_id */: id})

    var cancel_subscription_event_data = await this.load_event_data(web3, F5contractInstance, 'e2', e5, {p1/* subscription_id */: id})

    var modify_subscription_event_data = await this.load_event_data(web3, F5contractInstance, 'e5', e5, {p1/* subscription_id */: id})

    var collect_subscription_event_data = await this.load_event_data(web3, F5contractInstance, 'e4', e5, {p1/* subscription_id */: id})

    var subscription_token_event_data = await this.get_token_event_data(id, e5);

    // console.log('-------------------------modify_subscription_event_data-------------------------------')
    // console.log(modify_subscription_event_data)

    var clone = structuredClone(this.state.subscription_events)
    clone[id] = {'transfer':subscription_token_event_data, 'pay':pay_subscription_event_data.reverse(), 'cancel':cancel_subscription_event_data, 'modify':modify_subscription_event_data, 'collect':collect_subscription_event_data}

    this.setState({subscription_events: clone})


  }

  get_exchange_event_data = async (id, e5) => {
    const web3 = new Web3(this.get_web3_url_from_e5(e5));
    const H5contractArtifact = require('./contract_abis/H5.json');
    const H5_address = this.state.addresses[e5][5];
    const H5contractInstance = new web3.eth.Contract(H5contractArtifact.abi, H5_address);

    var update_exchange_ratio_event_data = await this.load_event_data(web3, H5contractInstance, 'e1', e5, {p1/* exchange */: id})

    var update_proportion_ratio_event_data = await this.load_event_data(web3, H5contractInstance, 'e2', e5, {p1/* exchange */: id})

    var modify_exchange_event_data = await this.load_event_data(web3, H5contractInstance, 'e3', e5, {p1/* exchange */: id})

    var transfer_event_data = await this.get_accounts_token_event_data(id, this.state.user_account_id[e5], e5) 
    var exchange_token_event_data = await this.get_token_event_data(id, e5);


    const H52contractArtifact = require('./contract_abis/H52.json');
    const H52_address = this.state.addresses[e5][6];
    const H52contractInstance = new web3.eth.Contract(H52contractArtifact.abi, H52_address);


    var update_balance_event_data = await this.load_event_data(web3, H52contractInstance, 'e2', e5, {p1/* exchange */: id})

    var freeze_unfreeze_event_data = await this.load_event_data(web3, H52contractInstance, 'e3', e5, {p1/* exchange */: id})

    var depth_mint_event_data = await this.load_event_data(web3, H52contractInstance, 'e6', e5, {p1/* exchange */: id})


    var clone = structuredClone(this.state.exchange_events)
    clone[id] = {'transfer':transfer_event_data, 'exchange_ratio':update_exchange_ratio_event_data.reverse(), 'proportion_ratio':update_proportion_ratio_event_data.reverse(), 'modify':modify_exchange_event_data.reverse(), 'exchange-transfer': exchange_token_event_data, 'update_balance':update_balance_event_data, 'freeze_unfreeze':freeze_unfreeze_event_data, 'depth_mint':depth_mint_event_data}

    this.setState({exchange_events: clone});
  }

  get_accounts_token_event_data = async (exchange, id, e5) => {
    const web3 = new Web3(this.get_web3_url_from_e5(e5));
    const H52contractArtifact = require('./contract_abis/H52.json');
    const H52_address = this.state.addresses[e5][6];
    const H52contractInstance = new web3.eth.Contract(H52contractArtifact.abi, H52_address);

    var send_tokens_event_data = await this.load_event_data(web3, H52contractInstance, 'e1', e5, {p1/* exchange */:exchange,  p2/* sender */: id})

    var received_tokens_event_data = await this.load_event_data(web3, H52contractInstance, 'e1', e5, {p1/* exchange */:exchange, p3/* receiver */: id})

    var all_events = [];
    for(var i=0; i<send_tokens_event_data.length; i++){
      all_events.push({'event':send_tokens_event_data[i], 'action':'Sent', 'timestamp':send_tokens_event_data[i].returnValues.p5})
    }
    for(var i=0; i<received_tokens_event_data.length; i++){
      all_events.push({'event':received_tokens_event_data[i], 'action':'Received', 'timestamp':received_tokens_event_data[i].returnValues.p5})
    }
    var sorted_events = this.sortByAttributeDescending(all_events, 'timestamp');

    return sorted_events

  }

  get_moderator_event_data = async (id, e5) => {
    const web3 = new Web3(this.get_web3_url_from_e5(e5));
    const E52contractArtifact = require('./contract_abis/E52.json');
    const E52_address = this.state.addresses[e5][1];
    const E52contractInstance = new web3.eth.Contract(E52contractArtifact.abi, E52_address);

    var modify_moderator_event_data = await this.load_event_data(web3, E52contractInstance, 'e1', e5, {p1/* target_obj_id */: id, p2/* action_type */:4})

    var enable_disable_interactible_checkers_event_data = await this.load_event_data(web3, E52contractInstance, 'e1', e5, {p1/* target_obj_id */: id, p2/* action_type */:5})

    var add_interactible_account_event_data = await this.load_event_data(web3, E52contractInstance, 'e1', e5, {p1/* target_obj_id */: id, p2/* action_type */:2})

    var block_accounts_event_data = await this.load_event_data(web3, E52contractInstance, 'e1', e5, {p1/* target_obj_id */: id, p2/* action_type */:17})

    var revoke_author_privelages_event_data = await this.load_event_data(web3, E52contractInstance, 'e1', e5, {p1/* target_obj_id */: id, p2/* action_type */:16})

    var clone = structuredClone(this.state.moderator_events)
    clone[id] = {'modify_moderator':modify_moderator_event_data, 'enable_interactible':enable_disable_interactible_checkers_event_data, 'add_interactible':add_interactible_account_event_data, 'block_account':block_accounts_event_data, 'revoke_privelages':revoke_author_privelages_event_data}

    this.setState({moderator_events: clone});
  }

  get_channel_event_data = async (id, e5) => {
    const web3 = new Web3(this.get_web3_url_from_e5(e5));
    const E52contractArtifact = require('./contract_abis/E52.json');
    const E52_address = this.state.addresses[e5][1];
    const E52contractInstance = new web3.eth.Contract(E52contractArtifact.abi, E52_address);

    var created_channel_data = await this.load_event_data(web3, E52contractInstance, 'e4', e5, {p1/* target_id */: id})

    var clone = structuredClone(this.state.channel_events)
    clone[id] = {'channel_data':created_channel_data}

    this.setState({channel_events: clone});
  }






  get_accounts_payment_information = async (id, e5, account) => {
    const web3 = new Web3(this.get_web3_url_from_e5(e5));
    const F5contractArtifact = require('./contract_abis/F5.json');
    const F5_address = this.state.addresses[e5][2];
    const F5contractInstance = new web3.eth.Contract(F5contractArtifact.abi, F5_address);

    var pay_subscription_event_data = await this.load_event_data(web3, F5contractInstance, 'e1', e5, {p1/* subscription_id */: id, p2/* sender_account_id */:account})

    var their_payment = await F5contractInstance.methods.f229([id], [[account]]).call((error, result) => {});

    var clone = structuredClone(this.state.subscription_search_result)
    clone[id+account] = {'events':pay_subscription_event_data, 'payment':their_payment[0][0]}

    this.setState({subscription_search_result: clone})

    if(pay_subscription_event_data.length == 0){
      this.prompt_top_notification('Search complete, '+pay_subscription_event_data.length+' entries found.', 2000)
    }
  }

  get_searched_account_data = async (id, typed_search) => {
    var data = []
    var data_found = false;
    for(var i=0; i<this.state.e5s['data'].length; i++){
      var e5 = this.state.e5s['data'][i]
      const web3 = new Web3(this.get_web3_url_from_e5(e5));
      const contractArtifact = require('./contract_abis/E5.json');
      const contractAddress = this.get_contract_from_e5(e5)
      const contractInstance = new web3.eth.Contract(contractArtifact.abi, contractAddress);

      const F5contractArtifact = require('./contract_abis/F5.json');
      const F5_address = this.state.addresses[e5][2];
      const F5contractInstance = new web3.eth.Contract(F5contractArtifact.abi, F5_address);

      const G52contractArtifact = require('./contract_abis/G52.json');
      const G52_address = this.state.addresses[e5][4];
      const G52contractInstance = new web3.eth.Contract(G52contractArtifact.abi, G52_address);

      const H5contractArtifact = require('./contract_abis/H5.json');
      const H5_address = this.state.addresses[e5][5];
      const H5contractInstance = new web3.eth.Contract(H5contractArtifact.abi, H5_address);

      const H52contractArtifact = require('./contract_abis/H52.json');
      const H52_address = this.state.addresses[e5][6];
      const H52contractInstance = new web3.eth.Contract(H52contractArtifact.abi, H52_address);

      var account_address = await contractInstance.methods.f289(id).call((error, result) => {});

      var alias = this.state.alias_bucket[e5][id] == null ? 'Unknown' : this.state.alias_bucket[e5][id]
      var should_include_id = true;
      if(id != typed_search){
        if(alias != typed_search){
          should_include_id = false
        }
      }

      if(account_address.toString() != '0x0000000000000000000000000000000000000000' && should_include_id){
        data_found = true
        var pending_withdraw_balance = await contractInstance.methods.f167([id], [], 1).call((error, result) => {});

        var run_data = await contractInstance.methods.f287([id]).call((error, result) => {});

        var make_object_event_data = await this.load_event_data(web3, contractInstance, 'e1', e5, {p3/* sender_account_id */: id})

        var withdraw_event_data = await this.load_event_data(web3, contractInstance, 'e2', e5, {p1/* sender_account_id */: id})

        var pending_withdraw_event_data = await this.load_event_data(web3, contractInstance, 'e3', e5, {p1/* receiver_account_id */: id})

        var transaction_event_data = await this.load_event_data(web3, contractInstance, 'e4', e5, {p1/* sender_account_id */: id})

        var pay_subscription_event_data = await this.load_event_data(web3, F5contractInstance, 'e1', e5, {p2/* sender_acc_id */: id})

        var cancel_subscription_event_data = await this.load_event_data(web3, F5contractInstance, 'e2', e5, {p2/* sender_acc_id */: id})

        var enter_contract_event_data = await this.load_event_data(web3, G52contractInstance, 'e2', e5, {p2/* sender_acc */: id , p3/* action */: 3})

        var exit_contract_event_data = await this.load_event_data(web3, G52contractInstance, 'e2', e5, {p2/* sender_acc */: id , p3/* action */: 11})

        var record_proposal_vote_event_data = await this.load_event_data(web3, G52contractInstance, 'e1', e5, {p3/* voter_account_id */: id})

        var update_exchange_ratio_event_data = await this.load_event_data(web3, H5contractInstance, 'e1', e5, {p3/* sender_account */: id })

        var contract_token_event_data = await this.get_token_event_data(id, e5);

        var ether_balance = await web3.eth.getBalance(account_address)

        var end_spend_balance = await H52contractInstance.methods.f140e([3,5], id, [0,0]).call((error, result) => {});

        var obj = {'e5':e5,'id':id,'address':account_address,'alias':alias, 'ether_balance':ether_balance, 'withdraw_balance':pending_withdraw_balance, 'run_data':run_data[0], 'make_object':make_object_event_data.reverse(), 'withdraw':withdraw_event_data.reverse(), 'pending_withdraw':pending_withdraw_event_data.reverse(),'transactions':transaction_event_data.reverse(), 'pay_subscription':pay_subscription_event_data.reverse(), 'cancel_subscription':cancel_subscription_event_data.reverse(), 'enter_contract':enter_contract_event_data.reverse(), 'exit_contract':exit_contract_event_data.reverse(),'vote':record_proposal_vote_event_data.reverse(), 'exchange_ratio':update_exchange_ratio_event_data.reverse(), 'tokens':contract_token_event_data, 'end_balance':end_spend_balance[0], 'spend_balance':end_spend_balance[1]}


        data.push(obj)
      }
    }

    if(!data_found){
      this.prompt_top_notification('Search complete, no account data found', 2000)
      return;
    }
    var clone = structuredClone(this.state.searched_accounts_data)
    clone[id] = data
    this.setState({searched_accounts_data: clone})
  }




}

export default App;
