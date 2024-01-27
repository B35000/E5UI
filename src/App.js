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
import EditProposalPage from './pages/edit_action_pages/edit_proposal_page';

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
import { locale } from 'dayjs';

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
    send_receive_bottomsheet: false, stack_bottomsheet: false, wiki_bottomsheet: false, new_object_bottomsheet: false, view_image_bottomsheet:false, new_store_item_bottomsheet:false, mint_token_bottomsheet:false, transfer_token_bottomsheet:false, enter_contract_bottomsheet: false, extend_contract_bottomsheet: false, exit_contract_bottomsheet:false, new_proposal_bottomsheet:false, vote_proposal_bottomsheet: false, submit_proposal_bottomsheet:false, pay_subscription_bottomsheet:false, cancel_subscription_bottomsheet: false,collect_subscription_bottomsheet: false, modify_subscription_bottomsheet:false, modify_contract_bottomsheet:false, modify_token_bottomsheet:false,exchange_transfer_bottomsheet:false, force_exit_bottomsheet:false, archive_proposal_bottomsheet:false, freeze_unfreeze_bottomsheet:false, authmint_bottomsheet:false, moderator_bottomsheet:false, respond_to_job_bottomsheet:false, view_application_contract_bottomsheet:false, view_transaction_bottomsheet:false, view_transaction_log_bottomsheet:false, add_to_bag_bottomsheet:false, fulfil_bag_bottomsheet:false, view_bag_application_contract_bottomsheet: false, direct_purchase_bottomsheet: false, scan_code_bottomsheet:false, send_job_request_bottomsheet:false, view_job_request_bottomsheet:false, view_job_request_contract_bottomsheet:false, withdraw_ether_bottomsheet: false, edit_object_bottomsheet:false, edit_token_bottomsheet:false, edit_channel_bottomsheet: false, edit_contractor_bottomsheet: false, edit_job_bottomsheet:false, edit_post_bottomsheet: false, edit_storefront_bottomsheet:false, give_award_bottomsheet: false, add_comment_bottomsheet:false, depthmint_bottomsheet:false, searched_account_bottomsheet: false, rpc_settings_bottomsheet:false, confirm_run_bottomsheet:false, edit_proposal_bottomsheet:false,

    syncronizing_progress:0,/* progress of the syncronize loading screen */
    account:null, size:'s', height: window.innerHeight, width: window.innerWidth, is_allowed:this.is_allowed_in_e5(),

    theme: this.get_theme_data(this.getLocale()['1593a']/* 'auto' */), storage_option:'nft-storage',
    details_orientation: this.getLocale()['1419']/* 'right' */, refresh_speed:this.getLocale()['1423']/* 'average' */, masked_content:'e', content_channeling:this.getLocale()['1233']/* 'international' */, device_language:this.get_language(), section_tags_setting:this.getLocale()['1426']/* 'all' */, visible_tabs:'e', storage_permissions: 'e', stack_optimizer: 'e',

    new_object_target: '0', edit_object_target:'0',
    account_balance:{}, stack_items:[],
    created_subscriptions:{}, all_subscriptions:{}, created_subscription_object_mapping:{},
    my_proposals:{},
    created_contracts:{}, all_contracts:{}, created_contract_mapping:{},
    created_tokens:{}, all_tokens:{}, created_token_object_mapping:{},end_balance_of_E5:{},spend_balance_of_E5:{},end_balance_of_burn_account:{},token_directory:{},
    created_posts:{},created_channels:{},
    created_jobs:{}, created_job_mappings:{}, my_applications:{}, my_bag_applications:{},
    created_mail:{}, received_mail:{},
    created_stores:{}, created_store_mappings:{}, created_bags:{}, 
    created_contractors:{},
    mint_dump_actions:[{},], contacts:{}, should_update_contacts_onchain: false, blocked_accounts:{}, should_update_blocked_accounts_onchain: false,

    web3:'https://etc.etcdesktop.com', e5_address:'0x24d7436eC90392f20AfeD800523E0d995Ec4310d',
    
    sync_steps:(80), qr_code_scanning_page:'clear_purchaase', tag_size:23, title_size:65, image_size_limit:5_000_000, ipfs_delay:90, web3_delay:400,

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
    
    e5_ether_tx_history:{}, e5_ether_supply_data:{}, index_db_size:0, calculated_gas_figures:{}, rpc_times:{}, added_providers:[], mempool:{}, token_name_directory:{}, wallet_status:{},

    loc:this.getLocale(), my_job_responses_notifications:{}, my_job_application_responses_notifications:{}, my_contractor_job_request_notifications:{}, my_token_event_notifications:{}, my_bag_responses_notifications:{}, my_bag_application_responses_notifications:{}, enter_exit_accounts_notifications:{}, my_store_direct_purchases_notifications:{}
  };


  get_e5s(){
    var others = ['E185', 'E195', 'E205', 'E215', 'E225', 'E235', 'E245', 'E255', 'E265', 'E275', 'E285', 'E295', 'E305', 'E315', 'E325', 'E335', 'E345', 'E355', 'E365', 'E375', 'E385', 'E395', 'E405', 'E415', 'E425', 'E435', 'E445', 'E455', 'E465', 'E475', 'E485', 'E495', 'E505', 'E515', 'E525', 'E535', 'E545', 'E555', 'E565', 'E575', 'E585', 'E595', 'E605', 'E615', 'E625', 'E635', 'E645', 'E655', 'E665', 'E675', 'E685', 'E695', 'E705', 'E715', 'E725', 'E735', 'E745', 'E755', 'E765']
    return{
      'data':[/* 'E15', */'E25', 'E35', 'E45', 'E55', 'E65', 'E75', 'E85', 'E95', 'E105', 'E115', 'E125', 'E135','E145', 'E155', 'E165', 'E175',].concat(others),
      'E15':{
        web3:['http://127.0.0.1:8545/'], 
        token:'ETHT',
        e5_address:'0x9E545E3C0baAB3E08CdfD552C960A1050f373042', 
        first_block:40, end_image:E35EndImg, spend_image:E35SpendImg, ether_image:EthereumTestnet, iteration:40_000, url:0, active:false, e5_img:End25Img
      },
      'E25':{
        web3:['https://etc.etcdesktop.com'], 
        token:'ETC',
        e5_address:'0xF3895fe95f423A4EBDdD16232274091a320c5284', 
        first_block:19151130, end_image:E25EndImg, spend_image:E25SpendImg, ether_image:EthereumTestnet, 
        // e5_address:'0x57d2189085D4F4e0156F70B71F0c90897836967E', 
        // first_block:18730085, end_image:E25EndImg, spend_image:E25SpendImg, ether_image:EthereumTestnet, iteration:400_000, url:0, active:true, e5_img:End25Img,

        iteration:400_000, url:0, active:true, e5_img:End25Img
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
        first_block:4910897, end_image:E95EndImg, spend_image:E95SpendImg, ether_image:glmr, iteration:10_000, url:0, active:false, e5_img:End25Img
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

  getLocale(){
    var language = this.get_language()
    var accepted_languages = ['en']
    var obj = {
      //this.props.app_state.loc['']
      //this.getLocale()['']
      'en':{
        '0':'en',
        /* enter contract page */
        '1':'enter-contract','2':'enter','3':'contract','4':'finish.','5':'Max Enter Contract Duration.','6':'Your entering duration.','7':'Entry expiry time.','8':'Set the time after which you wont participate in the contract.','9':'The entry fees charged for entering the contract.','10':'Entry Fees.','11':'The amounts you have available for entering the contract.','12':'Your balances.','13':'Token ID: ','14':'You cant pick a time before now.','15':'You cant pick a time beyond the contracts limit.','16':'Youve already entered this contract.','17':'You dont have enough tokens to enter this contract.','18':'Transaction added to stack.',
        
        /* exit contract page */
        '19':'exit-contract','20':'exit','21':'contract','22':'Max Enter Contract Duration.','23':'Exit the specific contract.','24':'Exit Contract.','25':'Entry Expiry Time.','26':'Time Remaining.','27':'block','28':'You cant exit a contract you havent entered.',
        
        '29':' sec','30':' min','31':' hr','32':' dy','33':' wk','34':' yr',
        
        /* extend enter contract page */
        '35':'extend-contract','36':'extend','37':'contract','38':'Extend Entry Expiry Time.','39':'Set the new time after which you will not participate in the contract.','40':'Max Enter Contract Duration.','41':'Max Extend Enter Contract Duration.','42':'Entry Expiry Time.','43':'Time Remaining.','44':'You cant set a time before the current expiry time.','45':'You cant set a time beyond the extend limit.','46':'You have to wait ','47':' to extend your stay.',
        
        /* force exit contract page */
        '48':'force-exit','49':'force','50':'exit','51':'accounts','52':'Run a force exit action for the contract ID: ','53':'Target Account.','54':'Set the account ID to remove.','55':'Target Account...','56':'Add Force Exit Action.','57':'That account isnt part of the contract.','58':'You cant force exit an account twice.','59':'Account ID: ','60':'Contract ID: ','61':'Force exit action removed.','62':'Account','63':'You cant stack no changes.',
        
        /* modify contract page */
        '64':'modify-contract','65':'modify','66':'contract','67':'auth','68':'Vote Bounty Split Proportion','69':'Maximum Extend Enter Contract Limit','70':'Minimum End Bounty Amount','71':'Proposal Expiry Duration Limit','72':'Maximum Enter Contract Duration','73':'Auto Wait','74':'Proposal Modify Expiry Duration Limit','75':'Moderator Modify Privelage','76':'Unlimited Extend Contract Time','77':'Maximum Proposal Expiry Submit Expiry time difference','78':'Bounty Limit Type','79':'Force Exit Enabled','80':'Minimum Spend Bounty Amount','81':'no','82':'yes','83':'modifiable','84':'non-modifiable','85':'enabled','86':'disabled','87':'relative','88':'absolute','89':'enabled','90':'disabled','91':'Make changes to the configuration of the contract ID: ','92':'units','93':'Add Change.','94':'Target ID...','95':'Current ','96':'Current Value.','97':'Reconfiguration action added.','98':'Please pute a valid account ID.','99':'Reconfiguration action added.','100':'Modify Target.','101':'Position.','102':'Proportion.','103':'Duration.','104':'Value: ','105':'Target ID','106':'Reconfiguration action removed.','107':'My Account','108':'Account',
        
        /* new channel page */
        '109':'channel','110':'e.text','111':'links','112':'images','113':'e.authorities','114':'authorities','115':'text','116':'font','117':'size','118':'moderators','119':'interactable','120':'e.font','121':'e.size','122':'Set a title for your new Channel.','123':'Enter Title...','124':'Remaining character count: ','125':'Set tags for indexing your new Channel.','126':'Enter Tag...','127':'Add.','128':'Type something.','129':'Enter one word.','130':'That tag is too long.','131':'That tag is too short.','132':'You cant enter the same word twice.','133':'Tag added.','134':'Enter your preferred text then tap add to add it.','135':'Type Something...','136':'Add Text.','137':'Edit Text.','138':'Editing Item.','139':'Search an object by its title or id, then tap it to add it to the new Channel.','140':'Search.','141':'Searching...','142':'Link removed from object.','143':'The link is already in the Channel','144':'Link added to the Channel.','145':'The grey circle stages an image. Then tap it to remove.','146':'Images larger than 5Mb will be ignored','147':'Access Rights.','148':'If enabled, access to the channel will be restricted to moderators and specified accounts.','149':'Moderator ID','150':'Set the account id for your targeted moderator.','151':'Add Moderator.','152':'Added moderator.','153':'Account ID','154':'Interactible ID','155':'Set the account id for your targeted account, and expiry time for their interactability.','156':'Add Interactable Account','157':'Added interactable account.','158':'Interactable Account ID: ','159':'Until: ','160':'Add some tags first.','161':'Add a title for your Channel.','162':'That title is too long.',
        
        /* new contract page */
        '163':'configuration','164':'entry-fees','165':'private','166':'public','167':'Set a title for your new Contract.','168':'Set tags for indexing your new Contract.','169':'Add.','170':'Enter Contract.','171':'If set to enter-contract, youll enter the contract your creating in one transaction.','172':'Preset the new contract settings based on common use cases.','173':'👥 Workgroup Contract','174':'A contract representing shared consensus within an organization or group of people.','175':'🧘 Personal Contract','176':'A contract primarily used by one person.','177':'👷🏼 Work Contract','178':'A contract used for the job and contractor markets.','179':'⚭ Life Contract','180':'A contract representing shared consensus between two or more people for an extended period of time.','181':'Workgroup contract preset has been applied.','182':'Personal contract preset has been applied.','183':'Work contract preset has been applied.','184':'Life contract preset has been applied.','185':'Create a basic E5 contract.','186':'Next.','187':'Previous.','188':'Contract Type.','189':'set the type of contract, either private or public.','190':'Note: if set to private, youll be giving new accounts access to the contract manually after its created.','191':'Vote Bounty Split Proportion (Optional).','192':'The mandatory percentage or proportion enforced on each new proposal targeting your new contract. Then, the percentage is used to calculate what each voter is set to receive based on the existing proposals balance.','193':'Vote Bounty Split Proportion.','194':'Recommended: 3% - 5%','195':'Maximum Extend Enter Contract Limit.','196':'The maximum amount of time a sender can extend their stay in your new contract.','197':'Recommended: 1 dy.','198':'Minimum End Bounty Amount (Optional).','199':'The minimum amount of end that can be used as bounty for creating a proposal for your new contract.','200':'Minimum End Bounty Amount.','201':'Minimum Spend Bounty Amount (Optional).','202':'The minimum amount of spend that can be used as bounty for new proposals targeting your new contract.','203':'Minimum Spend Bounty Amount.','204':'Maximum Enter Contract Duration.','205':'The maximum amount of time an account can enter your new contract for.','206':'Recommended: 4wks.','207':'Auto Wait.','208':'If set to yes, all new propsals sent to your new contract are automatically voted wait for each participant in the contract.','209':'Recommended: no.','210':'Proposal Modify Expiry Duration Limit.','211':'The period of time before the expiry of a proposal, during which the propsal cannot be modified.','212':'Recommended: 3 Hrs.','213':'Moderator Modify Privelage.','214':'If set to modifiable, you as a moderator can directly modify your contracts configuration.','215':'Recommended: modifiable.','216':'Unlimited Extend Contract Time.','217':'If set to enabled, you can extend your stay in this contract at any time after entry.','218':'Recommended: enabled','219':'Maximum Proposal Expiry Submit Expiry Time Difference.','220':'The maximum difference in time between the proposal expiry and submit expiry time for all proposals sent to your new contract.','221':'Recommended: at least 2wks.','222':'Bounty Limit Type.','223':'If set to absolute, the bounty limits set for end and spend will be used as is and if set to relative, the bounty limits will be set relative to the state of the network and demand.','224':'Recommended: absolute','225':'Force Exit Enabled','226':'If set to enabled, you as a moderator can force other members of the contract to exit the contract.','227':'Recommended: enabled.','228':'Proposal Expiry Duration Limit.','229':'The minimum amount of time difference that can be used while setting the expiry time for a new proposal sent to your new contract.','230':'Recommended: 1hr - 3hrs.','231':'Default Consensus Majority Limit (optional).','232':'If you prefer the contract to be consensus majority instead of unanimous, set the majority proportion here. By default, 0% and 100% means unanimous consensus.','233':'Recommended: 70% to 80%.','234':'Voter Weight Exchange.','235':'Specify an exchange that will be used to calculate voter weights for all proposals sent to your new contract.','236':'Please put a valid date and time.','237':'Exchange ID.','238':'Add an exchange by its id or name, then the desired amount. The first exchange must be the End or Spend exchange.','239':'Minimum End Contract Amount.','240':'Minimum Spend Contract Amount.','241':'Price.','242':'Add Price.','243':'Please put a valid exchange id.','244':'Please put a valid amount.','245':'The first exchange must be the End or Spend exchange.','246':'You cant use the same exchange twice.','247':'Added entry fee price.','248':'That End amount is less than the minimum required by the main contract.','249':'That Spend amount is less than the minimum required by the main contract.','250':'Please put a valid voter weight exchange id.','251':'Please add a title for your Contract.','252':'That Contract title is too long.', '252a':'Auto-Wait will be disabled if you opt for this voter weight feature.',
        
        /* new contractor page */
        '253':'contractor','254':'rates','255':'Set a title for your new contractor post. It should be task specific.','256':'Set tags for indexing your new contractor post.','257':'Search an object by its title or id, then tap it to add it to the new Contractor Post.','258':'The link is already in the Contractor Post.','259':'Link added to Contractor Post.','260':'Select an exchange by its ID.','261':'Fee per hour.','262':'Set your desired fee per hour.','263':'Add fee.','264':'Please put a valid Exchange ID.','265':'Please put a valid amount.','266':'You cant use the same exchange twice.','267':'Added your desired fee.','268':'Account 3','269':'Account 5','270':'Add at least 3 tags first.','271':'Please add a title for your Contractor Post','272':'That title is too long.', '272a':'Fee type.','272b':'Set your preferred fee type below.','272c':'Fee per job.','272d':'Set your desired fee per job.','272e':'Fees Per Job.','272f':'The amounts they charge per job.','272g':'',
        
        /* new job page */
        '273':'job','274':'targeted-pay','275':'Set a title for your new Job Post.','276':'Enter Title...','277':'Set tags for indexing your new Job Post.','278':'Enter your preferred text, then tap add to add it to the new Job Post.','279':'Search an object by its id or title, the tap it to add it to the new Job Post.','280':'Search.','281':'The link is already in the Job Post.','282':'Link added to Job Post.','283':'Select an exchange by its ID, then the desired price then click add.','284':'Add Pay.',
        
        /* new mail page */
        '285':'mail','286':'Set a title for your new encrypted mail.','287':'Set a recipient for your new Mail (Their account ID).','288':'Account ID','289':'Set tags for indexing your new Mail.','290':'Enter your preferred text, then tap add to add it to the new Mail.','291':'Search an object by its title or ID, then tap it to add it to the new mail.','292':'Enter Object ID...','293':'The link is already in the Mail.','294':'Link added to Mail.','295':'Please add a title for your new Mail.','296':'That recipient account is invalid.',
        
        /* new post page */
        '297':'post','298':'subscription-lock','299':'invisible','300':'visible','301':'Set a title for your new Post.','302':'Set tags for indexing your new Post.','303':'Post Preview (For Subscription Locked Posts).','304':'If set to visible, a preview of your new post will be shown to outsiders if subscription locked.','305':'Subscription Lock (Optional).','306':'Post exclusively to accounts that have paid the subscription you choose below.','307':'Enter your preferred text then tap add to add it.','308':'Search an object by its title or ID, then tap it to add it to the new Post.','309':'The link is already in the Post.','310':'Link added to Post.','311':'Please add a title for your new Post.',
        
        /* new proposal page */
        '312':'proposal','313':'proposal-configuration','314':'proposal-data','315':'bounty-data','316':'spend','317':'reconfig','318':'exchange-transfer','319':'subscription','320':'exchange','321':'Minimum Buy Amount','322':'Target Authority','323':'Target Beneficiary','324':'Maximum Buy Amount','325':'Minimum Cancellable Balance Amount','326':'Buy Limit','327':'Trust Fee','328':'Sell Limit','329':'Minimum Time Between Swap','330':'Minimum Transactions Between Swap','331':'Minimum Blocks Between Swap','332':'Minimum Entered Contracts Between Swap','333':'Minimum Transactions For First Buy','334':'Minimum Entered Contracts For First Buy','335':'Block Limit','336':'Halving Type','337':'Maturity Limit','338':'Internal Block Halving Proportion','339':'Block Limit Reduction Proportion','340':'Block Reset Limit','341':'Block Limit Sensitivity','342':'fixed','343':'spread','344':'Create your new proposal for contract ID: ','345':'Set tags for indexing your new Proposal.','346':'Consensus Type.','347':'Set the type of action you wish to perform with the contract through your new proposal.','348':'Proposal Expiry Time','349':'Set the time after which youre set to submit the new proposal during which no new votes can be cast.','350':'Proposal Expiry Duration Limit.','351':'Time from now.','352':'Modify Target (For Reconfiguration Action)','353':'The target object thats being modified if the consensus type is reconfig.','354':'Object ID...','355':'Consensus Submit Expiry Time.','356':'The time after which you cannot submit your new proposal.','357':'Maximum Proposal Expiry Submit Expiry Time Difference.','358':'You cant use a time before now.','359':'That submit time is invalid','360':'That proposal expiry time is less than the minimum required by the contract.','361':'Contract','362':'This Contract','363':'Main Contract','364':'Contract ID 2','365':'End Exchange','366':'Account ID 3','367':'Spend Exchange','368':'Account ID 5','369':'My Account','370':'Account','371':'End Token','372':'Spend Token','373':'Exchange ID 3','374':'Exchange ID 5','375':'Burn Account','376':'Account ID 0','377':'End Balance.','378':'Spend Balance.','379':'Spend Target.','380':'Set a target for the spend action.','381':'Target ID...','382':'Exchange.','383':'Set the token your spending.','384':'Spend Amount.','385':'Set an amount for the spend action.','386':'Picked Amount.','387':'Please put a valid spend target.','388':'Please put a valid exchange id.','389':'Please put a valid amount.','390':'Spend action added to proposal.','391':'Units','392':'Add Change.','393':'Current ','394':'Current Value','395':'Exchange Ratio X','396':'Exchange Ratio Y','397':'Reconfiguration action added.','398':'Please put a valid account ID.','399':'Position.','400':'Proportion.','401':'Duration.','402':'Value: ','403':'Target ID.','404':'Target Exchange.','405':'Set the exchange id you wish to run the exchange transfer from.','406':'Target Receiver','407':'Target Receiver...','408':'Token Targets','409':'Set the target token ID your transferring from the exchange.','410':'Token Target ID...','411':'Target Amount','412':'Add Transfer Action.','413':'Set the account set to receive the token amounts.','414':'Please put a valid exchange ID.','415':'Please put a valid receiver ID.','416':'Please put a valid token ID.','417':'Please put a valid amount.','418':'Transfer action added.','419':'Receiver ID: ','420':'The first bounty exchange should be the End or Spend Exchange.','421':'Minimum Spend Bounty Amount.','422':'Minimum End Bounty Amount.','423':'Spend Balance.','424':'End Balance.','425':'Target Amount.','426':'Add Bounty.','427':'You cant use the same exchange twice.','428':'Bounty amount added.','429':'Token ID: ','430':'Add some tags first.','431':'Add a title first.','432':'That title is too long.','433':'You need to add bounty for your new proposal.','434':'One of your token balances is insufficient for the bounty amount specified.','435':'The proposal submit expiry time youve set cant be before now.','436':'The proposal submit expiry time youve set is less than the time difference required by the contract.','437':'That proposal expiry time youve set is less than the minimum required by the contract.','438':'The proposal expiry time youve set cant be before now', '438a':'Target Authority', '438b':'Target Beneficiary', '438c':'Minimum Buy Amount', '438d':'Maximum Buy Amount', '438e':'Minimum Cancellable Balance Amount','438f':'Search an object by its title or id, then tap it to add it to the new Proposal','438g':'Link added to new Proposal Item.','438h':'Transaction Gas Limit','438i':'Enter your preferred text then tap add to add it to the new Proposal.',
        
        /* new storefront item page */
        '439':'storefront-item','440':'configuration','441':'variants','442':'invisible','443':'masked','444':'unmasked','445':'items','446':'grams','447':'kilograms','448':'ounces','449':'pounds','450':'centimeters','451':'meters','452':'inches','453':'feet','454':'mililiters','455':'liters','456':'gallons','457':'listed','458':'delisted','459':'in-stock','460':'out-of-stock','461':'Unit Denomination.','462':'Specify the denomination of the item below.','463':'Unit Denomination.','464':'Specify the denomination of the item from the tag picker below.','465':'Set denomination: ','466':'Target Payment Recipient.','467':'Set the account ID thats set to receive the purchase payments for your new item.','468':'Fulfilment Location.','469':'Set location of the pick up station for your item when its ordered using a bag and contractors.','470':'Location Details...','471':'Direct Purchase Option.','472':'If set to enabled, youll handle the shipping for the item when purchased directly by your clients.','473':'Product Chatroom.','474':'If set to disabled, senders cannot send messsages to the new storefront items product chatroom in the activity section.','475':'Product Listing.','476':'If set to delisted, the item will not be visible for purchasing.','477':'Product Stock.','478':'If set to out-of-stock, users will not be able to direct purchase or add to their bags.','479':'Fulfilment Accounts.','480':'Set the accounts involved with shipping and fulfilling direct purchase orders from clients.','481':'Direct Purchase Shipping Fee.','482':'The shipping fee you charge for shipping your item when directly purchased by your clients.','483':'tokens','484':'Price','485':'Add Price.','486':'Please put a valid exchange ID.','487':'Please put a valid amount.','488':'You cant use the same exchange twice.','489':'Added shipping price.','490':'Please put a valid account ID.','491':'Added the account.','492':'Account.','493':'My Account.','494':'Set a title for your new Storefront Item.','495':'Enter Title...','496':'Set tags for indexing your new Storefront Item.','497':'Enter your preferred text then tap add to add it to the new Storefront Item.','498':'Search an object by its title or ID, then tap it to add it to the new Storefront Item.','499':'Search.','500':'The link is already in the Storefront Item.','501':'Link added to new Storefront Item.','502':'Price per unit.','503':'Specify the price for one unit of your new items variant.','504':'Exchange ID','505':'Price','506':'tokens','507':'Add Price.','508':'Please put a valid exchange ID.','509':'Please put a valid amount.','510':'You cant use the same exchange twice.','511':'Added price.','512':'Variant Title.','513':'Set a basic description of the variant of the item your selling like a color or size option.','514':'Variant Images.','515':'You can set some images for your variant','516':'Number of Units in ','517':'You can specify the number of units of the variant that are available for sale','518':'Number of ','519':'Units','520':'Add Variant','521':'That variant description is not valid.','522':'Set a price for your variant first.','523':'You need to specify how many units are available first.','524':'Added the variant to the Storefront Item.','525':'Number of Units.','526':'Variant removed.','527':'Exchange 3','528':'Exchange 5','529':'Add some tags first.','530':'Add a title for your new Storefront Item.','531':'That title is too long.','532':'You should add some variants for your new item first.','533':'Set a valid receiver target for your Item first.','534':'Set a valid fulfilment location for your Storefront Item.','535':'You should set some fulfilment accounts for your Storefront Item.', '535a':'Exchange ID', '535b':'Enter Account ID','535c':'Set the details for a variant of your new storefront item, then tap the black circle to add it.','535d':'Editing that variant.',
        
        /* new subscription page */
        '536':'subscription','537':'configuration','538':'authorities','539':'prices','540':'false','541':'true','542':'moderators','543':'interactable','544':'enabled','545':'disabled','546':'Set a name for your new Subscription.','547':'Enter Title...','548':'Set some tags for indexing your new Subscription.','549':'Enter Tag...','550':'Add.','551':'Create a basic E5 Subscription.','552':'Next','553':'Previous','554':'Cancellable.','555':'If set to true, subscription payers can refund their subscription payments.','556':'Recommended: false.','557':'Time Unit','558':'The amount of time thats used as a unit when paying for your new subscription.','559':'Recommended: 1 min.','560':'Minimum Buy Amount.','561':'Minimum amount of time units that can be paid for your new subscription.','562':'units','563':'Recommended: at least 1','564':'Maximum Buy Amount','565':'Maximum amount of time units that can be paid for your new subscription.','566':'Minimum Cancellable Amount(For Cancellable Subscriptions)','567':'The minimum amount of time units that can be left when cancelling your new subscriptions payments.','568':'Minimum Cancellable Amount','569':'Recommended: at least 1','570':'Access Rights','571':'If enabled, access to the subscription will be restricted to moderators and specified accounts.','572':'Set the authority ID for your new subscription.','573':'Set the subscription beneficiary ID for your new subscription.','574':'moderators','575':'interactable','576':'Moderator ID','577':'Set the account id for your targeted moderator','578':'Add Moderator','579':'Account ID','580':'Interactible ID','581':'Set the account id for your targeted account, and expiry time for their interactability','582':'Add Interactible Account.','583':'Please put a valid account ID.','584':'Added interactable account.','585':'Interactible Account ID: ','586':'Until: ','587':'Exchange ID','588':'Type an exchange by its id, then the desired price and click add.','589':'Price','590':'tokens','591':'Add Price','592':'Please put a valid exchange ID.','593':'Please put a valid amount.','594':'You cant use the same exchange twice.','595':'Added price.','596':'My Account','597':'Account','598':'Add some tags first.','599':'Add a name first.','600':'That name is too long.', '600a':'Enter Authority', '600b':'Enter Beneficiary ID...',
        
        /* new token page */
        '601':'token','602':'basic','603':'custom','604':'token-authorities','605':'token-prices','606':'capped','607':'uncapped','608':'locked','609':'unlocked','610':'locked','611':'unlocked','612':'partially-custom','613':'fully-custom','614':'fixed','615':'spread','616':'enabled','617':'disabled','618':'moderators','619':'interactable','620':'Set a name for your new Token. No spaces should be used.','621':'Enter Name..','622':'Set a symbol for your new Token. No spaces should be used.','623':'Enter Symbol...','624':'Set tags for indexing your new Token.','625':'Enter Tag...','626':'Set an image for your new Token. Black picks gif, grey picks image.','627':'Use a smaller image.','628':'Preset the new tokens settings based on common use cases.','629':'📈 Stock Token','630':'A fixed supply token used for managing stake in a workgroup and raising capital inside of E5.','631':'☝️ End Token','632':'A fixed supply token with a very large supply similar to END.','633':'🫰 Spend Token','634':'A variable supply token whose supply increases as users mint from its exchange, similar to SPEND.','635':'🔧 Utility Token','636':'An uncapped, general purpose token which is bought and sold from its exchange.','637':'Stock token preset has been applied.','638':'End token preset has been applied.','639':'Spend token preset has been applied.','640':'Utility token preset has been applied.','641':'Next.','642':'Previous.','643':'Token Supply(For Capped Tokens)','644':'The supply of a capped token available for buying (for capped tokens)','645':'Token Supply','646':'tokens','647':'Recommended: 100,000,000e2','648':'Buy Limit','649':'The maximum amount of tokens that can be bought in one transaction.','650':'Trust Fee','651':'Proportion or percentage fee enforced on all contract spending that takes place using your new token.','652':'Recommended: 3.5%','653':'Sell Limit','654':'The maximum amount of your new token a sender can sell in a transaction.','655':'Create a custom E5 token.','656':'Set the token type.','657':'Capped token (with limited supply) or uncapped token (with unlimited supply)','658':'Minimum Time Between Swap','659':'The minimum amount of time a sender has to wait between making a swap for a given token.','660':'Trust Fee.','661':'Proportion or percentage fee enforced on all contract spending that takes place using token.','662':'Recommended: 3.5%','663':'Minimum Transactions Between Swap','664':'The minimum number of transactions sender has to make between swaps for your new token.','665':'transactions','666':'Minimum Blocks Between Swap','667':'The minimum number of blocks sender has to wait between making a swap for your new token.','668':'blocks','669':'Minimum Entered Contracts Between Swap','670':'The minimum amount of contracts sender should enter before interacting with your new exchange again.','671':'Minimum Transactions For First Buy','672':'The minimum number of transactions sender has to make to buy/sell your new token for the first time.','673':'contracts','674':'Minimum Entered Contracts For First Buy.','675':'The minimum number of contracts sender should have entered before first buy.','676':'Unlocked Liquidity','677':'If set to unlocked, You have direct access to the token exchanges liquidity','678':'Recommended: unlocked','679':'Unlocked Supply','680':'If set to unlocked, you can mint more of the token outside the exchange.','681':'Recommended: unlocked','682':'Fully Custom','683':'If set to fully-custom, you have full access to the token exchanges configuration','684':'Recommended: fully-custom','685':'Block Limit(For Uncapped Spend Tokens)','686':'The maximum amount of your new token that can be minted before the active mint limit is reduced using its internal block halfing proportion.','687':'Block Limit.','688':'Recommended: ','689':'Halving type (for Uncapped Spend Tokens)','690':'If set to spread, each minter receives a slightly less ammount than the previous minter in a given block.','691':'Recommended: Spread','692':'Maturity Limit(For Uncapped Spend Tokens)','693':'Amount of your token used in calculating the active block limit. If the maturity limit has not been exceeded, the active block limit used is proportionately less than its default set value.','694':'Maturity Limit','695':'Internal Block Halving(For Uncapped Spend Tokens)','696':'Proportion or percentage used in reducing the amount of spend that a sender can mint based on the block limit relative to the current block mint total.(for uncapped tokens)','697':'Internal Block Halving Proportion','698':'Recommended: 40% - 51%','699':'Block Limit Reduction(For Uncapped Spend Tokens)','700':'Proportion or percentage used in reducing the active block limit reduction proportion between blocks if block limit is exceeded in current block.(for uncapped tokens)','701':'Block Limit Reduction Proportion','702':'Recommended: 65% - 91%','703':'Block Reset Limit(For Uncapped Spend Tokens)','704':'The maximum number of blocks that are counted while reseting active block limit reduction proportion value when multiple blocks have passed without a mint event taking place.','705':'Block Reset Limit','706':'Recommended: 3','707':'Block Limit Sensitivity (for Uncapped Spend Tokens)','708':'The sensitivity of your new exchange to increasing demand','709':'Recommended: 2','710':'Exchange Ratio X','711':'The buy output exchange ratio X for your new token','712':'Exchange Ratio X:Y','713':'Exchange Ratio Y','714':'The buy input exchange ratio Y for your new token','715':'Access Rights','716':'If enabled, access to the exchange will be restricted to moderators and specified accounts','717':'Exchange Authority ID','718':'The account set to control the exchange','719':'Set Exchange Authority ID','720':'Trust Fee Target ID','721':'The account set to receive trust fee when collected from contract spend actions','722':'Set Trust Fee Target ID','723':'My Account','724':'Account','725':'Moderator ID','726':'Moderator ID','727':'Set the account id for your targeted moderator.','728':'Add Moderator','729':'Please put a valid account ID.','730':'Added the account as a moderator.','731':'Account ID','732':'Interactable ID','733':'Set the account id for your targeted account, and expiry time for their interactability','734':'Add Interactable Account','735':'Please put a valid account id','736':'Added interactable account.','737':'Exchange ID','738':'The an exchange by its id, then the desired price and click add.','739':'Price.','740':'Add Price.','741':'Please put a valid exchange ID.','742':'Please put a valid amount.','743':'You cant use the same exchange twice','744':'Added your set price.','745':'Add some tags first.','746':'Please add a name for your token.','747':'Please add a symbol for your token.','748':'That token name is too long.','749':'That token name is invalid.','750':'That token symbol is invalid.','751':'','752':'That token symbol is already in use.','752a':'That token symbol is too long.',
        
        /* edit pages */
        '753':'edit-channel','754':'unlocked','755':'locked','756':'tokens','757':'Add some tags first.','758':'Add a title fro your job post.','759':'That title is too long.','760':'job','761':'edit-token','762':'edit-channel','763':'edit-contractor','764':'edit-job','765':'edit-post','766':'edit-storefront-item','767':'edit-token',
        
        /* archive proposals page */
        '768':'archive','769':'object','770':'archive-object','771':'Archive your specified contract or proposal ID:','772':'The number of participants in the proposal /contract.','773':'End Bounty Balance','774':'Spend Bounty Balance','775':'Bounty Exchanges','776':'Specify Bounty Exchange to collect the contracts/proposals remaining balance','777':'Target Exchange ID...','778':'Add Bounty Exchange.','779':'Please put a valid exchange ID.','780':'You cant include the same exchange more than once.','781':'Exchange Added.','782':'Default depth 0',
        
        /* submit proposal page */
        '783':'submit','784':'proposal','785':'submit-proposal','786':'Click finish to submit the proposal.','787':' WAIT votes.','788':' YES votes.','789':' NO votes.','790':'Proposal Expiry time.','791':'Proposal expiry time from now.','792':'Proposal Submit Expiry time.','793':'Proposal submit expiry time from now.','794':'You cant submit this proposal yet.','795':'You cant submit this proposal.',
        
        /* vote proposal page */
        '796':'vote','797':'proposal','798':'vote','799':'bounties','800':'wait','801':'yes','802':'no','803':'Cast your vote in proposal ID: ','804':'Your On-Chain recorded vote.','805':'Voter Weight Exchange.','806':'Voter Weight Balance.','807':'units','808':'None','809':'Yes','810':'Wait','811':'No','812':'End Bounty Balance','813':'Spend Bounty Balance','814':'Targeted Bounty Exchanges','815':'Specify which exchanges you wish to collect bounty from. You can only collect bounty while voting for the very first time.','816':'Target Exchange ID...','817':'Add Bounty Exchange','818':'Please put a valid exchange ID.','819':'You cant include the same exchange more than once.','820':'Bounty Exchange ID: ',
        
        /* cancel subscription page */
        '821':'cancel-subscription','822':'cancel','823':'subscription','824':'Cancel the subscription ID: ','825':'Remaining Subscription Time','826':'Time Units To Cancel','827':'Token ID: ','828':'Please set a valid time unit amount.',
        
        /* collect subscription page */
        '829':'collect-subscription','830':'collect','831':'subscription','832':'payments','833':'Collect token payments for the subscription ID: ','834':'Total Collectible Time','835':'Total Collectible Time Units','836':'Token ID: ','837':'Account ID: ','838':'Collectible time: ','839':'You cant collect no time units.',
        
        /* modify subscription page */
        '840':'modify-subscription','841':'modify','842':'subscription','843':'authority','844':'Make changes to the configuration of the subscription ID: ','845':'units','846':'Add Change','847':'Target ID...','848':'Current ','849':'Current Value','850':'Reconfiguration action added.','851':'Please put a valid account ID.','852':'position','853':'Target ID','854':'My Account','855':'Main Contract','856':'Burn Account','857':'Account','858':'Contract ID 2','859':'Account ID 0','860':'Reconfiguration action removed.','861':'Please add some reconfiguration actions first.',
        
        /* pay subscription page */
        '862':'pay-subscription','863':'pay','864':'subscription','865':'Pay for the subscription ID: ','866':'Time Unit','867':'Time Units','868':'Total Debit Amount','869':'The amount youll pay for the subscription payment is shown below','870':'The amounts you have available for paying the subscription.','871':'Your balances.','872':'Token ID: ','873':'Minimum Buy Amount.','874':'time-units','875':'Maximum Buy Amount','876':'Set a valid time unit amount.','877':'The amount youve set is less than the minimum requirement.','878':'The amount youve set exceeds the maximum that you can pay for.','879':'Your token balance is insufficient for that time unit purchase.',
        
        /* authmint page */
        '880':'authmint','881':'authority','882':'mint','883':'token','884':'Auth-Mint your token ','885':' for a specified target.','886':'Set the recipient of the authmint action.','887':'Account ID','888':'Recipient','889':'Set the amount to authmint.','890':'Action Amount.','891':'Transfer Amount.','892':'Add Action.','893':'Please put a valid account ID.','893a':'Please put a valid amount.','894':'Auth-mint action added.','895':'Target Recipient ID: ','896':'Action removed.','897':'You cant stack no changes.',
        
        /* depthmint page */
        '898':'depthmint','899':'depth','900':'Depth-Mint your token ','901':' for a specified target.','902':'Set the recipient of the depth-mint action.','903':'Recipient','904':'Account ID','905':'Set the amount to depth-mint.','906':'Depth-mint action added.',
        
        /* exchange transfer page */
        '907':'exchange-transfer','908':'exchange','909':'transfer','910':'Run an exchange transfer for: ','911':'Target Receiver','912':'Set the account set to receive the token amounts.','913':'Target Receiver...','914':'Token Targets','915':'Set the targeted token ID your transfering from the exchange.','916':'Token Target ID...','917':'Targeted Amount.','918':'units','919':'Add Transfer Action.','920':'Please put a valid receiver ID.','921':'Please put a valid token ID.','922':'Please put a valid amount.','923':'Transfer action added.','924':'Receiver ID: ','925':'Transfer action removed.','926':'End Token','927':'Spend Token','928':'Exchange ID 3','929':'Exchange ID 5',
        
        /* freeze-unfreeze page */
        '930':'freeze/unfreeze','931':'freeze','932':'unfreeze','933':'account','934':'Freeze or Unfreeze the token ','935':' for a specified set of accounts.','936':'Set the account to be frozen or unfrozen.','937':'Account ID','938':'Set the amount to freeze or unfreeze.','939':'Action Amount.','940':'Transfer Amount','941':'Add Action','942':'Please put a valid account ID.','943':'Please put a valid amount.','944':'Action added.','945':'Action removed.',
        
        /* mint-dump token page */
        '946':'buy-sell','947':'mint','948':'dump','949':'mint-buy','950':'dump-sell','951':'Buy or Sell the specified token','952':'Your Balance','953':'Set the recipient of the mint/dump action.','954':'Recipient of action','955':'Recipient ID','956':'Set the amount(the aggregate of the buy tokens) of tokens your submitting for the mint-buy action.','957':'Amount for action','958':'Amount','959':'Buy Limit','960':'Sell Limit','961':'Set Maximum','962':'The amount you get when selling the token','963':'Receive Amount.','964':'Token ID: ','965':'The amount youll probably get from the buy action','966':'Receive Amount.','967':'Amount set to submit for the buy action.','968':'Fees for Action','969':'The amounts you have available for buying the token.','970':'Your balances','971':'My Account','972':'Account','973':'The transaction will revert if you dont receive your tokens specified in the range set below.','974':'Upper Lower Bounds (optional)','975':'Upper Bound','976':'Lower Bound','977':'Please put a valid account ID.','978':'Please put a valid amount.','979':'That amount is too low.','980':'You dont have enough tokens for that sell action.','981':'You dont have enough tokens to buy that much.','982':'You cant interact with the same exchange twice in one run.','983':'The amount youve set exceeds the maximum buy amount enforced by the exchange.','984':'The amount youve set exceeds the maximum sell amount enforced by the exchange.','985':'You need to enter ','986':' more contracts first.','987':'You need to make ','988':' more runs first.','989':'You need to wait ','990':' more blocks.','991':'You need to wait about ','992':' first.','993':'You need to make ','994':' more runs first.','995':'You need to enter ','996':' more contracts first','996a':'tokens','996b':'Set the amount of tokens your submitting for the dump-sell action','996c':'','996d':'','996e':'','996f':'',
        
        /* modify token page */
        '997':'modify-token','998':'modify','999':'token','1000':'fixed','1001':'spread','1002':'Make changes to the configuration of the token ID: ','1003':'units','1004':'Add Change','1005':'Target ID...','1006':'Current ','1007':'Current Value','1008':'Halving type','1009':'Block Limit Sensitivity','1010':'Reconfig action added.','1011':'Please put a valid account ID.','1012':'Modify Target','1013':'proportion','1014':'duration','1015':'value: ','1016':'target ID','1017':'Reconfig action removed.',
        
        /* transfer token page */
        '1018':'transfer','1019':'send','1020':'Transfer the specified token.','1021':'Your Balance','1022':'Your Balance after Set Transfers','1023':'Set the recipient of the transfer action.','1024':'Recipient of action.','1025':'Recipient ID','1026':'Amount to transfer to the speicified target account.','1027':'Amount for Transfer.','1028':'Set Maximum','1029':'Add Transaction','1030':'Please put a valid account ID.','1031':'Please put a valid amount.','1032':'You dont have enough tokens to add that transaction.','1033':'','1034':'Transaction added.','1035':'Recipient account: ','1036':'Transaction removed.','1037':'Transfer Amount',
        
        /* add comment page */
        '1038':'Detailed message.','1039':'Enter Message...','1040':'You need to make at least 1 transaction to participate.','1041':'Type something.','1042':'Message added to stack.',
        
        /* add to bag page */
        '1043':'add-to-bag','1044':'add','1045':'bag','1046':'storefront-item','1047':'items','1048':'Item Variants','1049':'Pick the variant you want to purchase','1050':'Amount in ','1051':'Purchase Amounts','1052':'This is the final amount for the price of the items your buying.','1053':'Number of Units','1054':'','1055':'The most you can add is ','1056':'Pick one variant first.','1057':'Please specify an amount of the item your adding.','1058':'Transaction added to stack.',
        
        /* clear purchase page */
        '1059':'verify-signature','1060':'generate-signature','1061':'Generate Fulfilment Signature','1062':'Create a signature to finalize the fulfilment transaction.','1063':'Quantity: ','1064':'Sender Account ID: ','1065':'Signature','1066':'Copy to Clipboard','1067':'Copied signature to clipboard.','1068':'Receive Fulfilment Signature','1069':'Receive a fulfilment signature to verify the items delivery.','1070':'Variant ID: ','1071':'Quantity: ','1072':'Sender Account ID: ','1073':'Paste Signature','1074':'Alternatively, you can paste the signature in the input field below','1075':'Open Scanner','1076':'Scan for the signature using a built in scanner.','1077':'Please paste a signature to finish here.','1078':'The signature you received is invalid.',
        
        /* confirm run page */
        '1079':'Transaction Confirmation','1080':'Are you sure you want to make this run?','1081':'','1082':'','1083':'Transaction Stack Size','1084':'Gas Limit','1085':'gas','1086':'Estimated Gas to be Consumed','1087':'Gas Price in Gwei','1088':'Gas Price in wei','1089':'Wallet Impact','1090':'proportion','1091':'Run Expiry Duration','1092':'Run Transactions','1092a':'confirm-run','1092b':'transactions',
        
        /* direct purchase page */
        '1093':'direct-purchase','1094':'direct','1095':'purchase','1096':'buy','1097':'Fulfilment Location','1098':'Set the delivery location, and be sure to be specific to avoid shipping issues','1099':'Shipping Details...','1100':'Item Variants','1101':'Pick the variant you want to purchase','1102':'Amount in ','1103':'Purchase Amounts','1104':'This is the final amount for the price of the items your buying.','1105':'Your balances','1106':'This is how much you have available for the direct purchase.','1107':'Number of Units','1108':'Number of Units','1109':'Pick one variant first.','1110':'Please specify an amount of the item your adding.','1111':'The most you can add is ','1112':'Please specify a shipping adress.','1113':'Your balance is insufficient to fulfil that direct purchase.','1114':'items',
        
        /* filter section */
        '1115':'search-filter','1116':'You can search an object by its ID or its title.','1117':'Enter Object ID or Title...','1118':'Search','1119':'You can filter objects using their tags.','1120':'Enter tag...','1121':'Add','1122':'','1123':'Clear Search','1124':'Type something.','1125':'Enter one word.',
        
        /* fulfil bag page */
        '1126':'bag-response','1127':'respond','1128':'fulfil','1129':'bag','1130':'contract','1131':'expiry-time','1132':'amount','1133':'prepaid','1134':'postpaid','1135':'Select the contract youll be using. If you have no contracts, first create one then youll see it here.','1136':'block','1137':'Select an expiry time for your fulfilment application.','1138':'Prepaid or Postpaid','1139':'Set the payment option you prefer for the application','1140':'Estimated Delivery time','1141':'Set the estimated amount of time youll take to deliver the items in the bag','1142':'Estimated Delivery time','1143':'Exchange ID','1144':'Select an exchange by its id, then the desired price and click add.','1145':'Price','1146':'tokens','1147':'Add Price','1148':'Please put a valid exchange ID.','1149':'Please put a valid amount.','1150':'Added price.','1151':'Account 3','1152':'Account 5','1153':'You need to pick a contract first.','1154':'You cant set an expiry time thats less than fifteen minutes from now.',
        
        /* give award page */
        '1155':'award','1156':'give','1157':'reward','1158':'message','1159':'award-tier','1160':'custom-amounts','1161':'Add a award message for your new award. Mind the character limit.','1163':'Type something...','1164':'Award Tiers','1165':'Pick an award tier you wish to send to the post author.','1166':'Total Amount','1167':'The total amount of SPEND youll be including in the award.','1168':'Total amount of SPEND','1169':'Your Spend Balance','1170':'Multiplier','1162':'Multiply the award your sending to the post author.','1171':'Gold','1172':'Diamond','1173':'Silver','1174':'Oil','1175':'Wood','1176':'Beer','1177':'Corn','1178':'Beef','1179':'Chocolate','1180':'Exchange ID','1181':'Select an exchange by its id, then the desired amount and click add.','1182':'Amount','1183':'tokens','1184':'Add Amount','1185':'Please put a valid exchange ID.','1186':'Please put a valid amount.','1187':'Added amount.','1188':'Account 3','1189':'Account 5','1190':'Please pick an award tier.','1191':'You have to leave a message.','1192':'That message is too short.','1193':'That message is too long.','1194':'You dont have enough Spend to give that award.','1195':'One of your token balances is insufficient for the award amounts specified.',
        
        /* homepage */
        '1196':'jobs','1197':'contracts','1198':'contractors','1199':'proposals','1200':'subscriptions','1201':'mail','1202':'all','1203':'viewed','1204':'created','1205':'applied','1206':'entered','1207':'paid','1208':'received','1209':'sent','1210':'active','1211':'my-proposals','1212':'E5s','1213':'posts','1214':'channels','1215':'storefront','1216':'bags','1217':'ethers ⚗️','1218':'ends ☝️','1219':'spends 🫰','1220':'info ℹ️','1221':'blockexplorer 🗺️','1222':'pinned','1223':'Work Contracts','1224':'Explore','1225':'Deployed E5s','1226':'Wallet','1227':'Coin & Tokens','1228':'Stack','1229':'Runs on e','1230':'','1231':'local','1232':'language','1233':'international','1234':'First set your wallet to follow that tag.','1235':'Bag Pinned.','1236':'Bag Unpinned.','1237':'Channel Pinned.','1238':'Channel Unpinned.','1239':'Item Pinned.','1240':'Item Unpinned.','1241':'Post Pinned.','1242':'Post Unpinned.','1243':'Subscription Pinned.','1244':'Subscription Unpinned.','1245':'Proposal Pinned.','1246':'Proposal Unpinned.','1247':'Contractor Pinned.','1248':'Contractor Unpinned.','1249':'Contract Pinned.','1250':'Contract Unpinned.','1251':'Job Pinned.','1252':'Job Unpinned.','1253':'Confirmation.','1254':'Add To Contacts Confirmation.','1255':'Confirm that you want to add the account ','1256':' to your contacts','1257':'Add to Contacts','1258':'E5tokens','1259':'externals','1260':'stack-data','1261':'settings-data','1262':'account-data','1263':'events','1264':'moderator-events','1264a':'That link is unavailable.',
        
        /* moderator page */
        '1265':'access-rights-settings','1266':'access','1267':'rights','1268':'settings','1269':'moderators','1270':'access-rights','1271':'block-accounts','1272':'private','1273':'public','1274':'Moderator','1275':'Add or Remove a moderator by their account ID.','1276':'Account ID...','1277':'Add/Remove Moderator','1278':'Enable/Disable Access Rights','1279':'Enable or Disable access rights to make the object public or private.','1280':'Current access rights settings.','1281':'Enable/Disable','1282':'Revoke Authors Moderator Privelages.','1283':'Click Disable to disable moderator privelages for the author of the object. This action cannot be undone.','1284':'Revoke','1285':'Access Rights: Enabled','1286':'Access Rights: Disabled','1287':'Please put a valid account ID.','1288':'Action added.','1289':'The thing is already private.','1290':'The thing is already public.','1291':'You cant do that twice.','1292':'Access Rights','1293':'Add/Remove an interactable account by their account ID.','1294':'Time from now','1295':'Add account setting','1296':'Please put a valid account ID.','1297':'Block Accounts','1298':'Deny an account access to your object','1299':'Add Blocked Account','1291e':'Please put a valid account ID.','1292e':' action: ','1293e':'Target: ','1294e':' action.','1295e':'Target: Revoke Privelages','1296e':', time from now: ','1297e':', time from now: ','1298e':'Action removed.','1299e':'Account','1300':'You cant stack no changes.',
        
        /* post preview page */
        '1301':'Subscription Locked','1302':'You need to pay those subscriptions first before you can view the full post.','1303':'Subscriptions to pay.','1304':'Pin the post to your feed','1305':'Pin Post','1306':'Pin/Unpin Post',
        
        /* respond to job page */
        '1307':'job-response','1308':'respond','1309':'job','1310':'ad','1311':'contract','1312':'expiry-time','1313':'amount','1314':'prepaid','1315':'postpaid','1316':'Select the contract youll be using. If you have no contracts, first create one then youll see it here.','1317':'block','1318':'Select an expiry time for your application','1319':'Prepaid or Postpaid','1320':'Set the payment option you prefer for the application.','1321':'Exchange ID','1322':'Select an exchange by its id, then the desired price and click add.','1323':'','1324':'Price','1325':'tokens','1326':'Add Price','1327':'Please put a valid exchange ID.','1328':'Please put a valid amount.','1329':'You cant use the same exchange twice.','1330':'Added price.','1331':'You need to pick a contract first.','1332':'You cant set an expiry time thats less than fifteen minutes from now.',
        
        /* rpc settings page */
        '1333':'rpc-settings','1334':'Add a RPC provider for making transactions.','1335':'Enter Node Url...','1336':'Add','1337':'Type something.','1338':'Dont use whitespaces','1339':'That url is invalid.','1340':'That provider has already been added.','1341':'RPC url added.','1342':'Speed unkown.',
        
        /* scan qr page */
        '1343':'Finish Scan','1344':'Scan something first.',
        
        /* send job request page */
        '1345':'Set some details for your new Job request. It should be task specific.','1346':'Enter Details...','1347':'Select the contract youll be using. If you have no contracts, first create one then youll see it here.','1348':'block','1349':'Select an expiry time for your job request.','1350':'Prepaid or Postpaid','1351':'Set the payment option you prefer for the job request.','1352':'Requested Pay','1353':'Select an exchange by its id, then the desired price and click add','1354':'Exchange ID','1355':'Price','1356':'tokens','1357':'Add Pay.','1358':'Please put a valid exchange ID.','1359':'Please put a valid amount.','1360':'Added price.','1361':'Account 3','1362':'Account 5','1363':'job-request','1364':'send','1365':'job','1366':'request','1367':'You cant set an expiry time thats less than fifteen minutes from now.','1368':'You need to set a description for the job request.',
        
        /* send receive ether page */
        '1369':'send','1370':'receive','1371':'Send Ether using the address shown below.','1372':'Sender Wallet Address','1373':'Receiver Wallet Address','1374':'Set Receiver Address Here','1375':'Balance in Wei','1376':'Balance in Ether','1377':'Transactions (2.3M Gas average)','1378':'transactions','1379':'Gas Price','1380':'Gas Price in Gwei.','1381':'Amount to Send.','1382':'Set the amount to send in the number picker below.','1383':'Picked Amount In Ether and Wei.','1384':'Set Maximum','1385':'Transaction Gas Price','1386':'Set the gas price for your transaction below.','1387':'Picked Gas Price in Ether and Gwei.','1388':'Send Ether to Address','1389':'Maximum amount set.','1390':'Open Scanner','1391':'Scan for an address using a built in scanner','1392':'Scan','1393':'Send Ether Confirmation','1394':'Confirm that you want to send Ether to the targeted recipient','1395':'Picked Amount In Ether and Wei','1396':'Sender Wallet Address','1397':'Receiver Wallet Address','1398':'Send Ether','1399':'Value in Ether and Wei ','1400':'Receive Ether using the address shown below','1401':'Wallet Address','1402':'Copy to Clipboard','1403':'Copied to clipboard.','1404':'Your ether balance is insufficient to fulfil that transaction.','1405':'running your send transaction...','1406':'Please set a valid amount.','1407':'Please set a valid recipient.',
        
        /* stack */
        '1408':'stack 📥','1409':'history 📜','1410':'settings ⚙️','1411':'wallet 👛','1412':'alias 🏷️','1413':'contacts 👤','1414':'blacklisted 🚫','1415':'','1416':'all-time','1417':'light','1418':'dark','1419':'right','1420':'left','1421':'sluggish','1422':'slow','1423':'average','1424':'fast','1425':'hide','1426':'all','1427':'filtered','1428':'enabled','1429':'Transaction Gas Limit','1430':'units','1431':'The gas budget for your next run with E5. The default is set to 5.3 million gas. You can auto-set the value to be the estimated gas to be comsumed.','1432':'Auto-Set Gas Limit','1433':'Transaction Gas Price','1434':'The gas price for your next run with E5. The default is set to the amount set by the network.','1435':'','1436':'','1437':'Run Expiry Duration','1438':'The duration of time after which your transaction will be reverted if it stays too long in the mempool. The default duration used is 1 hour.','1439':'Estimated Time.','1440':'Age: ','1441':'Gas Consumed.','1442':'Clear Transactions.','1443':'Confirm Action.','1444':'Confirm.','1445':'Confirm Clear Stack Action.','1446':'Stack ID ','1447':'Type','1448':'Balance in Wei','1449':'Balance in Ether','1450':'Number of Stacked Transactions','1451':'Storage Space Utilized','1452':'Estimated Gas To Be Consumed','1453':'Wallet Impact','1454':'Gas Price','1455':'Gas Price in Gwei','1456':'Run ','1457':' Transactions','1458':'Gas Prices','1459':'The gas price data recorded on your selected E5 over time.','1460':'Y-Axis: Gas Prices in Gwei','1461':'X-Axis: Time','1462':' ago','1463':'Mempool Metrics','1464':'Below is some useful information about the state of the mempool for your selected E5s ether.','1465':'Mempool size','1466':'Top 20% Average','1467':'The average gas price offered for the top 20% transactions set to be included in the next blocks.','1468':'Gas prices in wei','1469':'Gas prices in gwei','1470':'Bottom 20% Average','1471':'The average gas price offered for the bottom 20% transactions least likely to be included in the next blocks.','1472':'Gas Price Average','1473':'The average gas price offered for all transactions in the mempool.','1474':'E5 Transactions Count','1475':'The total number of E5 transactions in the mempool and in the top 20% transactions set for the next set of blocks.','1476':'Total E5 Transaction Count','1477':'Top 20% Transaction Count','1478':'E5 Mempool Dominance','1479':'Percentage of E5 transactions in the mempool, and in the top 20% transactions set for the next set of blocks.','1480':'E5 Dominance','1481':'E5 Top 20% Dominance','1482':'proportion','1483':'Value Transfer','1484':'The total amount of value transfer thats pending in the mempool.','1485':'Value in wei','1486':'Value in ether','1487':'Add some transactions first.','1488':'Value Transfer into E5','1489':'The total amount of ether going into E5 thats pending in the mempool.','1490':'That transaction gas limit is too low.','1491':'That transcaction is too large, please reduce your stack size.','1492':'Set a gas limit above ','1493':' gas','1494':'Calculating your stacks gas figure...','1495':'e is already running a transaction for you.','1496':'Running your transactions...','1497':'bag-response','1498':'accept-bag-application','1499':'direct-purchase','1500':'clear-purchase','1501':'bag-messages','1502':'storefront-messages','1503':'contractor','1504':'accept-job-request','1505':'job-request-messages','1506':'alias','1507':'unalias','1508':'re-alias','1509':'mail-messages','1510':'channel-messages','1511':'post-messages','1512':'job-response','1513':'accept-job-application','1514':'job-messages','1515':'proposal-messages','1516':'storefront-bag','1517':'That transaction gas limit is too low.','1518':'That transaction is too large, please reduce your stack size.','1519':'Set a gas limit above ','1520':' gas','1521':'Add some transactions first.','1522':'Issue With Run','1523':'Theres an issue with your Balance.','1524':'You need more ether to run your transactions.','1525':'Wallet Balance in Ether and Wei','1526':'Required Balance in Ether and Wei','1527':'','1528':'App Theme','1529':'Set the look and feel of E5.','1530':'Preferred E5','1531':'Set the E5 you prefer to use','1532':'Clear Browser Cache','1533':'Delete browser data such as your pins and viewed history.','1534':'Clear Cache','1535':'Preferred Refresh Speed','1536':'Set the background refresh speed for E5. Fast consumes more data.','1537':'Hide Masked Content','1538':'Hide masked content sent from your blocked accounts','1539':'Content Channeling','1540':'Set which channeling option your content and feed is directed to.','1541':'Content Filter','1542':'If set to filtered, the content including the tags you follow will be prioritized in your feed.','1543':'Content Tabs','1544':'If set to enabled, tabs that help keep track of viewing history will be shown above an objects details.','1545':'Preserve State (cookies)','1546':'If set to enabled, the state of E5 including your stack and settings will be preserved in memory.','1547':'Stack Optimizer (Experimental)','1548':'If set to enabled, similar transactions will be bundled together to consume less gas during runtime.','1549':'Cache cleared.','1550':'Wallet Address','1551':'Wallet Seed','1552':'Set your preferred seed. Type a word then click add to add a word, or tap the word to remove','1553':'Enter word...','1554':'Wallet Salt','1555':'Set the preferred salt for your wallet','1556':'Wallet Thyme','1557':'Set the preferred thyme for your wallet','1558':'Set Wallet','1559':'Set your wallets seed.','1560':'Please set a salt.','1561':'Your wallet has been set. Synchronizing...','1562':'Type something.','1563':'Enter one word.','1564':'Copied address to clipboard.','1565':'Add Contact','1566':'You can add a contact manually using their Contact ID.','1567':'Enter Account ID...','1568':'Add','1569':'That ID is not valid','1570':'','1571':'Please set your wallet first.','1572':'Copied ID to clipboard.','1573':'Add Blocked Account','1574':'Block an accounts content from being visible in your feed.','1575':'Enter Account ID...','1576':'That ID is not valid.','1577':'Please set your wallet first.','1578':'Reserve Alias','1579':'Reserve an alias for your account ID','1580':'Enter New Alias Name...','1581':'Reserve','1582':'alias','1583':'Stacked Alias','1584':'Alias Unknown','1585':'Alias: ','1586':'That alias is too long.','1587':'That alias is too short.','1588':'You need to make at least 1 transaction to reserve an alias.','1589':'That alias has already been reserved.','1590':'That word is reserved, you cant use it.','1591':'Unknown','1592':'Alias Unknown','1593':'Reserved ', '1593a':'auto', '1593b':'Wallet Balance in Ether and Wei.', '1593c':'Estimate Transaction Gas.', '1593d':'🔔.Notifications', '1593e':'My Notifications.', '1593f':'All your important notifications are shown below.', '1593g':'',
        
        /* synchonizing page */
        '1594':'Synchronized.','1595':'Unsynchronized.','1596':'Synchronizing...','1597':'Peer to Peer Trust','1598':'Unanimous Consensus', '1598a':'Initializing...','1598b':'This webapp uses cookies. Please enable them in the settings page for the best experience.',
        
        /* view application contract page */
        '1599':'accept-job-application','1600':'accept','1601':'application','1602':'applications-contract','1603':'The contract they applied with is shown below.','1604':'Expiry time from now: ','1605':'Contract ID: ','1606':'Sender ID: ','1607':'Accept application','1608':'Accept the job application and enter their contract(This action cant be undone)','1609':'Accept and Enter','1610':'Applicants Requested Pay','1611':'Below is the applicants requested pay in their respective token denominations.','1612':'Block ID','1613':'Vote Bounty Split Proportion','1614':'Minimum End Bounty Amount','1615':'Max Enter Contract Duration','1616':'Auto Wait For All Proposals For All Voters','1617':'Proposal Modify Expiry Duration Limit','1618':'Can Modify Contract As Moderator','1619':'Can Extend Enter Contract At Any Time','1620':'Maximum Proposal Expiry Submit Expiry Time Difference','1621':'Bounty Limit Type','1622':'Contract Force Exit','1623':'Entry Fees','1624':' tokens used','1625':'Consensus Majority Proportion','1626':'Voter Weight Exchange','1627':'Your Voter Weight','1628':'units','1629':'Enabled','1630':'Disabled','1631':'Token ID: ','1632':'The application has already expired.',
        
        /* view bag application page */
        '1633':'accept-bag-application','1634':'accept','1635':'fulfilment','1636':'application','1637':'applications-contract','1638':'The contract they applied with is shown below.','1639':'Expiry time from now: ','1640':'Estimated Delivery Time','1641':'Contract ID: ','1642':'Sender ID: ','1643':'Accept application','1644':'Accept the bag fulfilment application and enter their contract(This action cant be undone)','1645':'Applicants Requested Pay','1646':'Below is the applicants requested pay in their respective token denominations.',
        
        /* view job request contract page */
        '1647':'view-job-request-contract','1648':'view','1649':'response','1650':'view-contract','1651':'The contractors contract is shown below.','1652':'Entry Exipry Time','1653':'Time remaining','1654':'Your time in the contract has exipred.','1655':'','1656':'','1657':'','1658':'','1659':'','1660':'','1661':'','1662':'','1663':'Youre not part of the contract','1664':'Enter Contract','1665':'Enter the contract sent from the contractor','1666':'Enter Contract',
        
        /* view job request */
        '1667':'accept-job-request','1668':'accept','1669':'job','1670':'request','1671':'channel-structure','1672':'comment-structure','1673':'contract','1674':'activity','1675':'activity','1676':'contract','1677':'activity','1678':'Expiry time from now: ','1679':'Payment Option','1680':'Job Description','1681':'Sender ID','1682':'Accepted','1683':'Set Pay','1684':'The requested pay for the job','1685':'','1686':'Payment Option','1687':'Sender ID','1688':'Job Description','1689':'Set Pay','1690':'The amounts youll be receiving for the job.','1691':'Select the contract youll be using. If you have no contracts, first create one then youll see it here.','1692':'Copied message to clipboard.','1693':'responses','1694':'You','1695':'Type something first.','1696':'You need to make at least 1 transaction to participate.','1697':'Message added to stack.','1698':'The contractor Accepted the job request.','1698a':' ago.','1698b':' In ','1698c':'The job request has already expired.',
        
        /* view searched account */
        '1699':'main-data','1700':'subscription-data','1701':'contract-data','1702':'exchange-data','1703':'creations','1704':'withdraws','1705':'pending-withdraws','1706':'runs','1707':'payments','1708':'cancellations','1709':'entries','1710':'exits','1711':'votes','1712':'swaps','1713':'transfers','1714':'Address','1715':'Ether Balance in Ether','1716':'Ether Balance in Wei','1717':'Last Transaction Block','1718':'Last Transaction age','1719':'Number of entered contracts','1720':'Number of E5 runs','1721':'Balance Search','1722':'Search the accounts balance in a specified exchange','1723':'Exchange ID or Symbol...','1724':'Balance','1725':'Transaction Runs','1726':'hart containing the total number of E5 runs theyve made over time.','1727':'Y-Axis: Total Runs Made','1728':'X-Axis: Time','1729':'job object','1730':'post object','1731':'shadow object','1732':'storefront bag object','1733':'contractor object','1734':'storefront item object','1735':'storefront object','1736':'account object','1737':'contract object','1738':'token exchange object','1739':'consensus object','1740':'subscription object','1741':'custom object','1742':'channel object','1743':'Object ID','1744':'Block Number','1745':'transaction ID','1746':'Amount in Wei','1747':'Amount in Ether','1748':'Age','1749':'Amount Added in Wei','1750':'Transaction ID','1751':'Transaction Stack Size','1752':'Estimated Gas Consumed','1753':'Included Wei','1754':'Gas Price Paid','1755':'Coinbase (Miner)','1756':'Subscription ID','1757':'Time Units: ','1758':'Subscription ID:  ','1759':'Contract ID','1760':'Contract ID: ','1761':'Proposal ID','1762':'Contract ID: ','1763':'Exchange ID','1764':'Amount Swapped','1765':'Updted Token Exchange Liquidity','1766':'Updated Exchange Ratio X','1767':'Updated Exchange Ratio Y','1768':'Updated Exchange Ratios X:Y','1769':'','1770':'Action: ',
        
        /* view transaction log */
        '1771':'Timestamp','1772':'Transaction Age','1773':'Transaction Block','1774':'Transaction Stack Size','1775':'Gas Consumed','1776':'Sender Account ID','1777':'Sender Account Address','1778':'Included Value in Ether','1779':'Included Value in Wei','1780':'Coinbase Address',
        
        /* view transaction page */
        '1781':'view-transaction','1782':'Stack ID: ','1783':'Type:','1784':'Delete the transaction completely','1785':'Delete','1786':'Confirm Delete Action','1787':'Are you sure?','1788':'Make some changes to the transaction.','1789':'Edit','1790':'If set to shown, the transaction will be included during a run','1791':'If set to hidden, the transaction will be ignored when running your transactions','1792':'Show Transaction','1793':'Hide Transaction','1794':'The transaction is Hidden','1795':'The transaction is Shown','1796':'status','1797':'Item deleted from stack.','1798':'transaction shown','1799':'transaction hidden','1800':'The set access rights setting for your new contract.','1801':'Moderator Accounts','1802':'Youve set ','1803':' moderators','1804':'Interactable Accounts','1805':' accounts','1806':'For ','1807':'The set access rights setting for your new token.','1808':'Capped','1809':'Uncapped','1810':'2 (Main Contract)','1811':'Fixed','1812':'Spread','1813':'Token Identifier','1814':'Token Type','1814':'Unlocked Supply','1815':'Unlocked Liquidity','1816':'Fully Custom','1817':'Mint Limit','1818':'Authority: ','1819':'Exchange Authority Identifier','1820':'Target: ','1821':'Trust Fee Target Identifier','1822':'Mint/Burn Token','1823':'Authority Mint Limit (percentage of supply)','1824':'Current Block Mint Total','1825':'Active Block Limit Reduction Proportion','1826':'The set access rights setting for your new contract','1827':'non-cancellable','1828':'cancellable','1829':'Block ID','1830':'Authority ID','1831':'Minimum Buy Amount','1832':'time-units','1833':'Subscription Type','1834':'Maximum Buy Amount','1835':'time-units','1836':'Minimum Cancellable Amount','1837':'Time Unit','1838':'Remaining Subscription Time','1839':'Subscription Beneficiary','1840':'Entry Fees','1841':' tokens used','1842':'Price Amounts','1843':'The amounts you are offering for the job.','1844':'The set access rights setting for your new channel','1845':'The items variant details are shown below','1846':'Number of Units','1847':'Your account ID: ','1848':'Amount','1849':'Your Balance','1850':'Selected Action','1851':'Target Recipient Account','1852':'Enter Contract Until: ','1853':'Entry Exipry Time','1854':'Time remaining','1855':'Below are the individual transfer actions.','1856':'Transfer actions','1857':'recipient account: ','1858':'Extend Stay In Contract Until: ','1859':'New Exipry Time','1860':'Time remaining','1861':'Consensus Type','1862':'Proposal Expiry time','1863':'Proposal expiry time from now','1864':'Proposal Submit Expiry time','1865':'Proposal submit expiry time from now','1866':'','1867':'','1868':'','1869':'','1870':'','1871':'','1872':'','1873':'','1874':'Contract Authority ID','1875':'Modify Target','1876':'target: ','1877':', token ID: ','1878':'Modify Target','1879':'position','1880':'units','1881':'proportion','1882':'duration','1883':'value: ','1884':'target ID','1885':'tokens','1886':'Receiver ID: ','1887':'Your set vote for the proposal','1888':'Bounty Exchange ID: ','1889':'Time Units','1890':'Token ID: ','1891':'Time Unit','1892':'Time Units To Cancel','1893':'Total Collectible Time','1894':'Total Collectible Time Units','1895':'Token ID: ','1896':'Modify Subscription Action','1897':' action added','1898':'Modify Target','1899':'position','1900':'Modify Contract Action','1901':' actions added','1902':'Modify Target','1903':'position','1904':'units','1905':'Modify Token Exchange Action','1906':' actions added','1907':'Modify Target','1908':'position','1909':'Exchange Transfer Action','1910':'Receiver ID:','1911':'Force Exit Action','1912':'Archive Action','1913':' bounty exchanges included','1914':'Bounty Exchange ID: ','1915':'Default depth 0','1916':'Freeze/Unfreeze Action','1917':' actions included','1918':'Target Account ID: ','1919':'Authmint Actions','1920':'Target Recipient ID: ','1921':'Access Rights Actions','1922':' actions included','1923':'Target: ','1924':'Target: Revoke Moderator Privelages','1925':', time from now: ','1926':' messages included','1927':'Selected Contract','1928':'The contract you picked for the application action','1929':'Selected Expiry Time','1930':'The expiry time you picked for the application action','1931':'Set Prices','1932':'The amounts youre youll be charging for the job','1933':' items','1934':'in your bag.','1935':'items','1936':' units in ','1937':'Edit','1938':'Selected Contract','1939':'The contract you picked for the fulfilment action','1940':'Selected Expiry Time','1941':'The expiry time you picked for the fulfilment action','1942':'Estimated Delivery time','1943':'The payment option you prefer','1944':'The amounts youre youll be charging for the bag fulfilment','1945':'Contract ID: ','1946':'Sender ID: ','1947':'Expiry time from now: ','1948':'Shipping Details','1949':'Number of Units ordered in ','1950':'Number of Units','1951':'Purchase Amounts','1952':'This is the final amount for the price of the item your buying','1953':'Shipping Fee','1954':'The charged shipping fee for buying the items','1955':'Collected Signatures','1956':'Below are the collected signatures from your direct purchases','1957':'Delete','1958':'Variant ID: ','1959':'Received Signature','1960':'The expiry time you picked for the application action','1961':'Set Description','1962':'Set Prices','1963':'The amounts youll be charging for the job','1964':'Selected Contract','1965':'The contract you picked for the job.','1966':'Set Description','1967':'Set Prices','1968':'The amounts youll be receiving for the job','1969':'Reset Alias.','1970':'Price Amounts','1971':'The amounts you are offering for the job.','1972':'Item Variants','1973':'The items variant details are shown below','1974':'Multiplier','1975':'message:','1976':'Total amount of spend','1977':'Custom Amounts','1978':'Your included custom amounts for the award action.','1979':'Depth-mint Actions',
        
        /* wiki page */
        '1980':'One more step.','1981':'You need to set your wallet and fill it with some ether','1982':'The wallet section is in the settings-data...','1983':'Under the Wallet tag...','1984':'Then afterwards fill it with the E5s ether of your choice','1985':'Action Required','1986':'You need to set your wallet first','1987':'The wallet section is in the stack page...','1988':'In the settings-data section...','1989':'Under the Wallet tag...',
        
        /* withdraw ether page */
        '1990':'withdraw-ether','1991':'pending-withdraws','1992':'withdraw-history','1993':'withdraw-ether','1994':'Withdraw','1995':'withdraw-ether','1996':'pending-withdraws','1997':'withdraw-history','1998':'Your withdraw balance is shown below','1999':'Withdraw balance','2000':'Withdraw balance in Wei','2001':'Withdraw balance in Ether','2002':'Impact','2003':'Receiver Wallet Address','2004':'Set Receiver Address Here','2005':'Set My Address','2006':'Withdraw Transaction Expiry Duration','2007':'The duration of time after which your withdrawal transaction will be reverted if it stays too long in the mempool. The default duration used is 1 hour.','2008':'Estimated Time.','2009':'Transaction Gas Price','2010':'The gas price for your next run with E5. The default is set to the amount set by the network.','2011':'Transaction Gas Price in Wei','2012':'Transaction Gas Price in Gwei','2013':'Network Gas Price in Wei','2014':'Network Gas Price in Gwei','2015':'Please set your wallet first.','2016':'Please set a valid receiver','2017':'You cant withdraw 0 ether.','2018':'Withdraw Ether Confirmation','2019':'Confirm that you want to withdraw Ether to the set address','2020':'Withdraw balance in Wei','2021':'Withdraw balance in Ether','2022':'Target Wallet Address','2023':'Withdraw Ether','2024':'Copied address to clipboard','2025':'transaction ID','2026':'target','2027':'Amount Added in Wei',
        
        /* bag details section */
        '2028':'metadata','2029':'responses','2030':'activity','2031':'Pin the bag for future reference.','2032':'Pin the Bag Order.','2033':'','2034':'','2035':'','2036':'','2037':'','2038':'','2039':'','2040':'','2041':'','2042':'Pin/Unpin Bag','2043':'Fulfil the delivery request for the sender account','2044':'Fulfil Bag','2045':'Sender Account','2046':'Bag ID: ','2047':'ago','2048':'Store ID:','2049':' ordered.','2050':'Variant Description','2051':'Pick-up Location','2052':'In ','2053':'Bag Responses','2054':'Expiry time from now: ','2055':'Contract ID: ','2056':'Sender ID: ','2057':'Accepted','2058':'The bag owner picked this fulfilment application','2059':'Expiry time from now: ','2060':'Contract ID: ','2061':'Sender ID: ','2062':'Shopping Bag Acivity','2063':'Copied message to clipboard.','2064':' responses',
        
        /* channel details section */
        '2065':'moderator-events','2066':'modify-moderators','2067':'interactable-checkers','2068':'interactable-accounts','2069':'block-accounts','2070':'Author','2071':'Channel Locked','2072':'Channel activity has been restricted to existing participants','2073':'Channel Unlocked','2074':'','2075':'Channel activity is not restricted to existing participants','2076':'Pin the channel to your feed','2077':'Pin Channel','2078':'Pin/Unpin Channel','2079':'Perform Moderator Actions','2080':'Set an accounts access rights, moderator privelages or block an account.','2081':'Perform Action','2082':'Edit Channel Post','2083':'Change the basic details for your Channel','2084':'Edit','2085':'Author Moderator Privelages Disabled','2086':'Author of Object is not a Moderator by default','2087':'Author Moderator Privelages Enabled','2088':'Author of Object is a Moderator by default','2089':'Channel Traffic','2090':'Chart containing the total number of messages made over time.','2091':'Y-Axis: Total Messages Made','2092':'X-Axis: Time','2093':'Total Channel Messages','2094':'messages','2095':'','2096':'','2097':'','2098':'','2099':'','2100':'You cant do that. The channel is access restricted.','2101':'You cant do that. Youve been blocked from the channel for ','2101':'The channel has been locked by its moderators.','2102':'In Channel','2103':'Channel Modify Moderator Events','2104':'Not Moderator','2105':'Moderator','2106':'Targeted Account','2107':'Moderator Account','2108':'Authority value','2109':'Channel Access Rights Settings Events','2110':'Access Rights Disabled(Public)','2111':'Access Rights Enabled(Private)','2112':'Access Rights Status','2113':'Moderator Account','2114':'Channel Account Access Settings Events','2115':'Targeted Account','2116':'Moderator Account','2117':'Until: ',
        
        /* contract details section */
        '2118':'details','2119':'events','2120':'moderator-events','2121':'transfers','2122':'create-proposal','2123':'modify-contract','2124':'Channel Blocked Account Events','2125':'enter-contract','2126':'extend-contract-stay','2127':'exit-contract','2128':'force-exit-accounts','2129':'Participant Accounts','2130':'The accounts that have entered the contract.','2131':'Pin the contract to your feed','2132':'Pin Contract','2134':'Pin/Unpin Contract','2135':'Author Moderator Privelages Disabled','2136':'','2137':'Author of Object is not a Moderator by default','2138':'Author Moderator Privelages Enabled','2139':'Author of Object is a Moderator by default','2140':'Enabled','2141':'Disabled','2142':'Enter a contract to participate in its consensus','2143':'Enter Contract','2144':'Enter','2145':'Max Extend Enter Contract Limit','2146':'Extend your stay in the contract','2147':'Extend Stay','2148':'Extend','2149':'Send a proposal to the contract to perform a specified action','2150':'Send Proposal','2151':'Send','2152':'Send a proposal to the contract to perform a specified action.','2153':'','2154':'','2155':'','2156':'','2157':'','2158':'Send Proposal','2159':'Exit from the contract and no longer participate in its consensus','2160':'Exit Contract','2161':'Exit','2162':'Entry Exipry Time','2163':'Time remaining','2164':'Your time in the contract has exipred, you have to enter it again.','2165':'Youre not part of the contract','2166':'Modify Contract','2167':'Modify the configuration of the contract directly.','2168':'Force Exit Accounts','2169':'Remove an account from the contract directly.','2170':'Archive Contract','2171':'Delete the contracts data to free up space in the blockchain','2172':'Perform Moderator Actions','2173':'Set an accounts access rights, moderator privelages or block an account','2174':'Perform Action','2175':'In Contract ','2176':'Created Proposal Events','2177':'Modify Proposal Events','2178':'Proposer Account ID','2179':'Modifier','2180':'Spend Proposal','2181':'Reconfiguration Proposal','2182':'Exchange-Transfer','2183':'Targeted Modify Item','2184':'target ID','2185':'In Contract ','2186':'Enter Contract Events','2187':'Search account ID...','2188':'Entering Account ID','2189':'Entry Expiry','2190':'Extend Contract Stay Events','2191':'Extending Account ID','2192':'Entry Expiry','2193':'Exit Contract Events','2194':'Exiting Account ID','2195':'Force Exit Contract Events','2196':'Moderator Account ID','2197':'Exiting Account ID','2198':'Age','2199':'Contract Transfer Events','2200':'Token ID:  ','2201':', depth: ','2202':'Contract Modify Moderator Events','2203':'Authority value','2204':'Contract Access Rights Settings Events','2205':'Access Rights Status','2206':'Block Number','2207':'Contract  Account Access Settings Events','2208':'Until: ','2209':'Contract Blocked Account Events','2210':'','2211':'Not Moderator','2212':'Moderator','2213':'Targeted Account','2214':'Moderator Account',
        
        /* contractor detail section */
        '2215':'details','2216':'job-requests','2217':'Fees Per Hour','2218':'The amounts they charge per hour for their work.','2219':'Send Job Request.','2220':'Send a job request to the contractor to do a job for you.','2221':'Send Request','2222':'Pin the contractor to your feed.','2223':'Pin Contractor','2224':'Pin/Unpin Contractor','2225':'Edit Contractor Post','2226':'Change the basic details for your Contractor Post','2227':'Perform Action','2228':'Job Requests','2229':'Job Description','2230':'Accepted','2231':'Expiry time from now: ',
        
        /* E5 details section */
        '2232':'details','2233':'End Balance of Burn Account','2234':'E5 Ether balance in Ether','2235':'E5 Ether balance in Wei','2236':'Last Transaction Block','2237':'Last Transaction age','2238':'Number of entered contracts','2239':'Number of E5 runs','2240':'Withdraw balance','2241':'Withdraw your Ether to a specified address','2242':'Withdraw Ether','2243':'Withdraw','2244':'E5','2245':'Main','2246':'E5 Address:','2247':'Vote Bounty Split Proportion','2248':'Minimum End Contract Amount','2249':'E5 block invocation Limit','2250':'E5 time invocation Limit','2251':'Minimum Entered Contracts for Consensus Participation','2252':'','2253':'Tag Indexing Limit','2254':'Minimum Transaction Count for Consensus Particiation','2255':'Gas Anchor Price','2256':'Transaction Gas Reduction Proportion','2257':'Transaction Gas Anchor Price','2258':'Transaction Gas Lower Limit','2259':'Absolute Proposal Expiry Duration Limit','2260':'Primary Transaction Account','2261':'Primary Account Transaction Period','2262':'Subscriptions Created','2263':'Chart containing the total number of subscriptions made over time.','2264':'','2265':'','2266':'','2267':'','2269e':'Y-Axis: Total Subscriptions Made','2269':'X-Axis: Time','2270':'Total Subscriptions','2271':'subscriptions','2272':'Contracts Created','2273':'Chart containing the total number of contracts made over time.','2274':'Y-Axis: Total Contracts Made','2275':'X-Axis: Time','2276':'Total Contracts','2277':'contracts','2278':'Proposals Created','2279':'Chart containing the total number of proposals made over time.','2280':'Y-Axis: Total Proposals Made','2281':'Total Proposals','2282':'proposals','2283':'Exchanges Created','2284':'Chart containing the total number of exchanges made over time.','2285':'Y-Axis: Total Exchanges Made','2286':'Total Exchanges','2287':'exchanges','2288':'Indexed Posts Created','2289':'Chart containing the total number of indexed posts made over time.','2290':'Y-Axis: Total Posts Made','2291':'Total Posts','2292':'posts','2293':'Indexed Channels Created','2294':'Chart containing the total number of indexed channels made over time.','2295':'Y-Axis: Total Channels Made','2296':'Total Channels','2297':'channels','2298':'Indexed Jobs Created','2299':'Chart containing the total number of indexed jobs made over time.','2300':'Y-Axis: Total Jobs Made','2301':'Total Jobs','2302':'jobs','2303':'Indexed Storefront Items Created','2304':'Chart containing the total number of indexed storefront items made over time.','2305':'Y-Axis: Total Storefront Items Made','2306':'Total Storefront Items','2307':'','2308':'Bags Created','2309':'Chart containing the total number of bags made over time.','2310':'Y-Axis: Total Bags Made','2311':'Total Bags','2312':'bags','2313':'Indexed Contractors Created','2314':'Chart containing the total number of indexed contractors made over time.','2315':'Y-Axis: Total Contractor Posts','2316':'Total Contractor Posts','2317':'Data Throughput','2318':'Chart containing the data throughput over time.','2319':'Y-Axis: Total Data Events','2320':'Total Data Events','2321':'Metadata Throughput','2322':'Chart containing the total number of metadata events made over time.','2323':'Y-Axis: Total Metadata Events','2324':'Total Metadata Events','2325':'events','2326':'Withdrawn Ether','2327':'The total amount of ether thats been withdrawn from the E5 over time.','2328':'Y-Axis: Total Withdrawn Ether','2329':'Deposited Ether','2330':'The total amount of ether thats been deposited into the E5 over time.','2331':'Y-Axis: Total Deposited Ether','2332':'Transaction Runs','2333':'Chart containing the total number of E5 runs made over time.','2334':'Y-Axis: Total Runs Made','2335':'Total Runs','2336':'runs',
        
        /* end detail section */
        '2337':'transfers','2338':'exchange-transfers','2339':'updated-balances','2340':'updated-exchange-ratios','2341':'modify-exchange','2342':'freeze-unfreeze','2343':'depth-mints','2344':'Buy or Sell the token for a specified account.','2345':'Buy/Sell','2346':'Transfer some tokens to  a specified account','2347':'Transfer','2348':'The exchanges balance for each of the tokens used to buy ','2349':'Buy Token Liquidity','2350':'','2351':'Author Moderator Privelages Disabled','2352':'Author of Object is not a Moderator by default','2353':'Author Moderator Privelages Enabled','2354':'Author of Object is a Moderator by default','2355':'The amount you get when selling one unit of the token','2356':'Token Price','2357':'Last Swap Block','2358':'Last Swap Age','2359':'Last Swap Transactions Count','2360':'Last Entered Contracts Count','2361':'Modify Token','2362':'Modify the configuration of the exchange directly.','2363':'Exchange Transfer','2364':'Transfer tokens from the exchanges account to a specified target.','2365':'Run Transfers','2366':'Freeze/Unfreeze Tokens','2367':'Freeze or unfreeze a given accounts balance.','2368':'Freeze/Unfreeze','2369':'Perform Moderator Actions','2370':'Perform Action','2371':'Edit Token Post','2372':'Change the basic details for your Token Post','2373':'Perform Action','2374':'0 (Burn Account)','2375':'ID: ','2376':'Token Identifier','2377':'Token Type','2378':'Block Number','2379':'Exchanges Liquidity','2380':'Buy/Sell Token','2381':'Tokens Total Supply','2382':'The Market Capitalization of the token in its respective denominations.','2383':'Token Market Cap','2384':'Depth-Mint Tokens','2385':'Mint your token from outside its exchange.','2386':'Depth-Mint','2387':'Y-Aggregate','2388':'Chart containing the y-aggregate of ','2389':' over time.','2390':'Y-Axis: Y-aggregate','2391':'X-Axis: Time','2392':'Total Transactions','2393':'Chart containing the total number of buy/sell transactions over time.','2394':'Y-Axis: Total Transactions','2395':'Total Transactions','2396':'Exchange Liquidity','2397':'Chart containing the total supply of ','2398':' in the exchange over time.','2399':'Y-Axis: Exchange Liquidity','2400':'Action','2401':'Amount Swapped','2402':'Updted Token Exchange Liquidity','2403':'Updated Exchange Ratio X','2404':'Updated Exchange Ratio Y','2405':'Updated Exchange Ratios X:Y','2406':'Set an accounts access rights, moderator privelages or block an account','2407':'In Exchange ','2408':'Updated Exchange Ratio Events','2409':'Buy','2410':'Sell','2411':'Swapping Account ID','2412':'Your Transfer Events','2413':'Action: ','2414':'Exchange Modification Events','2415':'Modifier','2416':'Targeted Modify Item','2417':'target ID','2418':'Exchange Transfer Events','2419':'To: ','2420':'From: ','2421':'Action: ','2422':'New Balance ','2423':'Action: Freeze','2424':'Action: Unfreeze','2425':'Amount, depth: ','2426':'Exchange Modify Moderator Events','2427':'Not Moderator','2428':'Moderator','2429':'Targeted Account','2430':'Moderator Account','2431':'Authority value','2432':'','2432':'Exchange Access Rights Settings Events','2433':'Access Rights Disabled(Public)','2434':'Access Rights Enabled(Private)','2435':'Access Rights Status','2436':'Moderator Account','2437':'Exchange  Account Access Settings Events','2438':'Targeted Account','2439':'Moderator Account','2440':'In Exchange ','2441':'Exchange  Blocked Account Events','2442':'Targeted Account','2443':'Moderator Account','2444':'Exchange  Depth-Mint Events','2445':'Targeted Receiver','2446':'Moderator Sender','2447':'Amount, depth: ', '2447a':'Your Wallets Dominance', '2447b':'', '2447c':'', '2447d':'',
        
        /* ethers details section */
        '2448':'transactions','2449':'Reload wallet.','2450':'Your Balance in Wei','2451':'Your Balance in Ether','2452':'Transactions (2.3M Gas average)','2453':'Gas Price in Wei','2454':'Gas Price in Gwei','2455':'E5 txs/ether (2.3M Gas average)','2456':'Gas txs/ether (23K Gas average)','2457':'Send/Receive Ether','2458':'Send or receive ether from a specified account.','2459':'Send/Receive','2460':'Node Settings','2461':'Change the remote procedure call (RPC) provider setting for making your transactions.','2462':'Open','2463':'Wallet Status','2464':'Syncronizing wallet, please wait...','2465':'Wallet sync failed. Please reload the wallet.','2466':'Wallet Status','2467':'Syncronized.','2468':'Chain ID','2469':'Gas Limit per Block','2470':'Base Fee in wei','2471':'Base Fee in gwei','2472':'Your Address','2473':'Average block time for the last 5 blocks','2474':'Wallet Address','2475':'copied address to clipboard','2476':' seconds','2477':'Gas Used','2478':'Gas Price Paid in Wei','2479':'Gas Price Paid in Gwei','2480':'Value','2481':'Number of Blocks Mined',
        
        /* job details section */
        '2482':'Job Offers','2483':'The amounts they are offering for the job.','2484':'Apply for the job','2485':'Respond to the ad with a contract and apply for the job.','2486':'Apply','2487':'Pin the job to your feed.','2488':'Pin Job','2489':'Pin/Unpin Job','2490':'Edit Job Post','2491':'Change the basic details for your Job Post','2492':'Perform Action','2493':'Block Number','2494':'age','2495':'ago','2496':'In ','2497':'Job Responses','2498':'Expiry time from now: ','2499':'Contract ID: ','2500':'Sender ID: ','2501':'Accepted','2502':'The job owner picked this application','2503':'Expiry time from now: ','2504':'Contract ID: ','2505':'Sender ID: ','2506':'Copied message to clipboard','2507':'responses','2507a':'Reply',
        
        /* list section */
        '2508':'That ID is not valid.','2509':'Searching...','2509a':'Enter Name or Symbol...',
        
        /* mail details section */
        '2510':'data','2512':' with ','2513':'Conversation.',
        
        /* post detail section */
        '2514':'awards','2515':'Pin the post to your feed','2516':'Pin Post','2517':'Pin/Unpin Post','2518':'Edit Indexed Post','2519':'Change the basic details for your Indexed Post','2520':'Perform Action','2521':'Give Award','2522':'Send a tip to the posts author','2523':'Send Award','2524':'In ','2525':'Awards.','2526':'Comments.',
        
        /* proposal details section */
        '2527':'proposal-actions','2528':'Consensus Achieved.','2529':'Status','2530':'Consensus Pending.','2531':'Pin the proposal to your feed','2532':'Pin Proposal','2533':'Pin/Unpin Proposal','2534':'Vote in Proposal','2535':'Cast a vote in this proposal and collect some bounty.','2536':'Vote Proposal','2537':'Submit Proposal','2538':'Submit the proposal to perform its actions','2539':'Proposal Submitted','2540':'The proposal has been submitted by its author.','2541':'Proposal Unsubmitted','2542':'The proposal has not been submitted by its author.','2543':'Proposal Archived','2544':'The proposal has been archived by its author.','2545':'Proposal Not Archived','2546':'The proposal has not been archived by its author','2547':'Archive Proposal','2548':'Delete the proposals data to free up space in the blockchain','2549':'Age of Proposal','2550':'Consensus Majority Target Proportion','2551':'Proposal Transfer Events','2552':'In Proposal ','2553':', depth: ','2554':'Proposal Vote Events','2555':'Yes!','2556':'Wait..','2557':'No.','2558':'Contract ID', '2258a':'Edit Proposal', '2258b':'Change the basic details of your Proposal.',
        
        /* spend details section */
        '2559':'updated-proportion-ratios','2560':'Mint or Dump the token for a specified account.','2561':'Mint/Dump','2562':'Make a token transfer to a specified account.','2563':'Send/Transfer','2564':'The exchanges balance for each of the tokens used to buy ','2565':'Buy Token Liquidity','2566':'Author Moderator Privelages Disabled','2567':'Author of Object is not a Moderator by default','2568':'Author Moderator Privelages Enabled','2569':'Author of Object is a Moderator by default','2570':'The amount you get when selling one unit of the token.','2571':'Token Price','2572':'Modify Exchanage','2573':'AuthMint Tokens','2574':'Bypass the exchanges restrictions and mint your token as an authority','2575':'AuthMint','2576':'Set an accounts access rights, moderator privelages or block an account','2577':'Chart containing the block limit reduction proportion over time.','2578':'Y-Axis: Proportion','2579':'Circulating Supply','2580':'Total Supply','2581':'Y-Axis: Total Supply','2582':'Total Transactions','2583':'Chart containing the total number of buy/sell transactions over time.','2584':'Y-Axis: Total Transactions','2585':'X-Axis: Time','2586':'Exchange Mint Limit Proportion Ratio Events','2587':'Tokens Received','2588':'Updated Active Limit','2589':'Exchange Modification Events','2590':'Targeted Modify Item','2591':'Exchange Transfer Events','2592':'Update Balance Events','2593':'Receiver Account','2594':'Freeze-Unfreeze Events','2595':'Action: Freeze','2596':'Action: Unfreeze','2597':'Authority Account','2598':'Exchange Modify Moderator Events','2599':'Exchange Account Access Settings Events','2600':'Targeted Account','2601':'Moderator Account','2602':'Exchange Blocked Account Events','2602a':'Active Mint Limit.',
        
        /* storefront details section */
        '2603':'direct-purchases','2604':'unfulfilled','2605':'fulfilled','2606':'Set Denomination','2607':'Author Seller','2608':'Target Payment Recipient','2609':'Fulfilment Accounts','2610':'The accounts involved with shipping and fulfilling direct purchase orders from clients.','2611':'Fulfilment Location','2612':' variants','2613':'To choose from.','2614':'Pin the storefront item to your feed.','2615':'Pin Item','2616':'Pin/Unpin Item','2617':'Activity Section Enabled','2618':'You can leave a product review message in the activity section','2619':'Activity Section Disabled','2620':'The activity section has been disabled by the storefront owner.','2621':'In Stock','2622':'The item is available for purchasing.','2623':'Out of Stock','2624':'The item is not available for purchasing.','2625':'Add the item to your shopping bag.','2626':'Add to Bag','2627':'Purchase the item directly from the seller.','2628':'Direct Purchase','2629':'Purchase','2630':'Edit Storefront Post','2631':'Change the basic details for your Storefront Post','2632':'Edit Item','2633':'Block Number','2634':'Direct Purchases','2635':', Sender Account ID: ','2636':'Fulfilent Signature: ','2637':', Client ID: ','2638':'Clear Purchase','2639':'Fulfilment Signature: ','2640':'Signature Data: ','2641':'Signature Address: ','2642':'The activity section has been disabled.',
        
        /* subscription details section */
        '2643':'search','2644':'payments','2645':'cancellations','2646':'collections','2647':'modifications','2648':'Pay Subscription','2649':'Pay for the subscription for your account','2650':'Pin the subscription to your feed','2651':'Pin Subscription','2652':'Pin/Unpin Subscription','2653':'Author Moderator Privelages Disabled','2654':'Author of Object is not a Moderator by default','2655':'Author Moderator Privelages Enabled','2656':'Author of Object is a Moderator by default','2657':'Cancel Subscription','2658':'Cancel your subscription payment and receive your tokens back','2659':'Collect Subscription','2660':'Collect the subscription payments from the subscription account','2661':'Modify Subscription','2662':'Modify the configuration of the subscription.','2663':'Perform Moderator Actions','2664':'Set an accounts access rights, moderator privelages or block an account','2665':'Perform Action','2666':'In Subscription ','2667':'Subscription Transfer Events','2668':'Pay Subscription Events','2669':'Search account ID...','2670':'Paying Account','2671':'Cancel Subscription Events','2672':'Cancelling Account','2673':'Collect Subscription Events','2674':'Collecting Account','2675':'Total Time Units Collected','2676':'units','2677':'Modify Subscription Events','2678':'Subscription Modify Moderator Events','2679':'Subscription Access Rights Settings Events','2680':'Subscription Account Access Settings Events','2681':'Subscription Blocked Account Events','2682':'Search Subscription Payment','2683':'Remaining Subscription Time','2684':'Remaining Time Units (As of Now)','2685':'time-units','2686':'Latest Payment Time','2687':'Latest Payment Block','2688':'First Payment Time','2689':'First Payment Block','2690':'Highest Time Units Paid For ','2691':'Lowest Time Units Paid For ','2692':'Time Units Paid For','2693':'Chart containing the amount in time units that have been accumulated.','2694':'Y-Axis: Time Units','2695':'X-Axis: Time',
        
        /* App page */
        '2696':'comment','2697':'review','2698':'Stack cleared.','2699':'Your next run might fail with its current stack.','2700':'Run complete. Synchronizing...','2701':'Your transaction was reverted.','2702':'Contact Deleted','2703':'You cant do that more than once.','2704':'Transaction added to stack.','2705':'You cant do that more than once.','2706':'unalias','2707':'unreserve','2708':'identification','2709':'Unreserve transaction added to stack','2710':'re-alias','2711':'You cant do that more than once.','2712':'reserve','2713':'Reset transaction added to stack','2714':'Blocked account removed','2715':'Your account was blocked from entering the contract.','2716':'cart','2717':'clear','2718':'finalize','2719':'purchase','2720':'The contract owner hasnt granted you access to their contract yet.','2721':'Your account was blocked from entering the contract','2722':'Withdrawing your ether...','2723':'withdraw complete!','2724':'Withdraw failed. Something went wrong','2725':'milliseconds','2726':'offline','2727':'syncronized.','2728':'Send complete.','2729':'send failed, ','2730':'Reloading your wallet...','2731':'A matching blocked account was found','2732':'You cant block yourself!','2733':'Adding account ID to blocked list...','2734':'A matching contact was found','2735':'You cant add yourself.','2736':'Adding account ID to Contacts...','2737':'Search complete, no account data found','2738':'Not available in your region yet.',
        
        
        '2739':'edit-proposal','2740':'midnight','2741':'','2742':'','2743':'','2744':'','2745':'','2746':'','2747':'','2748':'','2749':'','2750':'','2751':'','2752':'','2753':'','2754':'','2755':'','2756':'','2757':'','2758':'','2759':'','2760':'','2761':'','2762':'','2763':'','2764':'','2765':'','2766':'','2767':'','2768':'','2769':'','2770':'','2771':'','2772':'','2773':'','2774':'','2775':'','2776':'','2777':'','2778':'','2779':'','2780':'','2781':'','2782':'','2783':'','2784':'','2785':'','2786':'','2787':'','2788':'','2789':'','2790':'','2791':'','2792':'','2793':'','2794':'','2795':'','2796':'','2797':'','2798':'','2799':'','2800':'','2801':'','2802':'','2803':'','2804':'','2805':'','2806':'','2807':'','2808':'','2809':'','2810':'','2811':'','2812':'','2813':'','2814':'','2815':'','2816':'','2817':'','2818':'','2819':'','2820':'','2821':'','2822':'','2823':'','2824':'','2825':'','2826':'','2827':'','2828':'','2829':'','2830':'','2831':'','2832':'','2833':'','2834':'','2835':'','2836':'','2837':'','2838':'','2839':'','2840':'','2841':'','2843':'','2844':'','2845':'','2846':'','2847':'','2848':'','2849':'','2850':'','2851':'','2852':'','2852':'','2853':'','2854':'','2855':'','2856':'','2857':'','2858':'','2859':'','2860':'','2861':'','2862':'','2863':'','2864':'','2865':'','2866':'','2867':'','2868':'','2869':'','2870':'','2871':'','2872':'','2873':'','2874':'','2875':'','2876':'','2877':'','2878':'','2879':'','2880':'','2881':'','2882':'','2883':'','2884':'','2885':'','2886':'','2887':'','2888':'','2889':'','2890':'','2891':'','2892':'','2893':'','2894':'','2895':'','2896':'','2897':'','2898':'','2899':'','2900':'','2901':'','2902':'','2903':'','2904':'','2905':'','2906':'','2907':'','2908':'','2909':'','2910':'','2911':'','2912':'','2913':'','2914':'','2915':'','':'','':'','':'','':'','':'','':'','':'','':'','':'','':'','':'','':'','':'','':'','':'',
      }
      //this.props.app_state.loc['']
    }

    if(!accepted_languages.includes(language)) return obj['en']
    return obj[language]
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
    this.edit_proposal_page = React.createRef();
  }

  componentDidMount() {
    console.log("mounted");
    
    /* listens for when the window is resized */
    window.addEventListener("resize", this.resize.bind(this));
    this.resize();

    /* var me = this;
    setTimeout(function() {
  
    }, (1 * 500)); */

    var me = this;
    setTimeout(function() {
      me.load_cookies();
    }, (1 * 500));
    

    var me = this;
    setTimeout(function() {
      me.load_e5_data();
      me.reset_background_sync()

      me.get_key()
      me.init_db()
    }, (1 * 2000));
    
  }

  /* called when the component is unmounted or closed */
  componentWillUnmount() {
    console.log("unmounted");
    window.removeEventListener("resize", this.resize.bind(this));

    clearInterval(this.interval);

    this.set_cookies()
  }

  reset_background_sync(){
    if(this.interval != null)clearInterval(this.interval);
    var obj = {'sluggish':1000_000, 'slow':500_000, 'average':100_000, 'fast':40_000}
    obj[this.getLocale()['1421']/* sluggish */] = 1000_000
    obj[this.getLocale()['1422']/* slow */] = 500_000
    obj[this.getLocale()['1423']/* average */] = 100_000
    obj[this.getLocale()['1424']/* fast */] = 40_000

    var me = this;
    setTimeout(function() {
      me.interval = setInterval(() => me.background_sync(), obj[me.state.refresh_speed]);
    }, (1 * 100));
    
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

    if(this.state.storage_permissions == this.getLocale()['1428']/* 'enabled' */){
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

      // from:this.from,
      // e5_events:this.e5_events,
      // e52_events:this.e52_events,
      // f5_events:this.f5_events,
      // g5_events:this.g5_events,
      // g52_events:this.g52_events,
      // h5_events:this.h5_events,
      // h52_events:this.h52_events,

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

    console.log(timeZoneCityToCountry)

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
    var web3_url = this.get_web3_url_from_e5('E25')
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
        console.log(`Failed to delete data in db: `, e);
      }
      await db.data.add({ id, data });
      
    } catch (error) {
      console.log(`Failed to do something in db: `,error);
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

  is_allowed_in_e5(){
    return true
    var obj = ['United States', 'Kenya']
    var user_country = this.get_country()

    if(!obj.includes(user_country)){
      var me = this;
      setTimeout(function() {
          me.prompt_top_notification(me.getLocale()['2738']/* 'Not available in your region yet.' */, 100000)
      }, (2 * 1000));
      
      return false
    }
    return true
  }









  background_sync(){
    if(this.state.accounts[this.state.selected_e5] != null){
      // this.get_accounts_data(this.state.account, false, this.state.web3, this.state.e5_address)
      if(this.is_allowed_in_e5()) this.start_get_accounts_data(false)
    }

    this.reset_theme()
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
    
    this.setState({height: window.innerHeight, width: window.innerWidth});
    console.log('------------------------------resize--------------------------------')
    console.log('width: ',window.innerWidth, ' height: ', window.innerHeight)

    
    var me = this;
    setTimeout(function() {
        me.setState({size:me.getScreenSize()})
    }, (1 * 1000));
  }

  /* gets the screensize in three categories, small medium and large */
  getScreenSize() {
      var width = this.state.width;
      var height = this.state.height;

      if(width<350 || height <550){
          return 's';
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
              return 's';
          }
          return 's';
          
      }

  }

  get_theme_data(theme){
    //this.props.theme['']
    if(theme == this.getLocale()['1417']/* 'light' */){
      return{
        'name':this.getLocale()['1417']/* 'light' */,
        'bar_shadow':'#CECDCD','bar_color':'#444444', 'bar_background_color':'#919191','nav_bar_color':'#444444', 'button_color':'#444444',
        
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
    else if(theme == this.getLocale()['1418']/* 'dark' */){
      return{
        'name':this.getLocale()['1418']/* 'dark' */,
        'bar_shadow':'#919191','bar_color':'white', 'bar_background_color':'#919191','nav_bar_color':'#444444','button_color':'#444444',
        
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
    else if(theme == this.getLocale()['2740']/* midnight */){
      return{
        'name':this.getLocale()['2740']/* midnight */,
        'bar_shadow':'#919191','bar_color':'white', 'bar_background_color':'#919191','nav_bar_color':'#1a1a1a','button_color':'#171717',
        
        'homepage_background_color':'#050505','syncronizing_page_background_color':'#050505','send_receive_ether_background_color':'#050505','send_receive_ether_overlay_background':'#303030','send_receive_ether_overlay_shadow':'#303030',

        'primary_text_color':'white', 'secondary_text_color':'#e6e6e6',
        
        'navbar_button_selected_color':'#333333','card_background_color':'rgb(20, 20, 20,.9)', 'primary_navbar_text_color':'white','secondary_navbar_text_color':'#e6e6e6','card_shadow_color':'#212121',

        'view_group_card_item_background':'#1a1a1a','tag_background_color':'#303030', 'indexed_tag_background':'#242424', 'tag_shadow':'#303030',

        'chart_color':'#1a1a1a','chart_background_color':'#0a0a0a',

        'number_picker_label_color':'#171717','number_picker_label_shadow':'#262626',
        'number_picker_power_color':'white','number_picker_power_shadow_color':'#CECDCD','number_picker_label_text_color':'#878787', 
        
        'slider_color':'white','toast_background_color':'#171717', 'calendar_color':'dark', 'alert_icon':AlertIconDark, 'add_icon':AddIconDark, 'text_input_background':'rgb(217, 217, 217,.6)', 'text_input_color':'#393e46', 'messsage_reply_background':'black'
      }
    }
    else if(theme == this.getLocale()['1593a']/* 'auto' */){
      var obj = this.get_theme_data(this.get_time_of_day_theme())
      obj['name'] = this.getLocale()['1593a']/* 'auto' */

      return obj
    }
  }

  get_time_of_day_theme(){
    var hour = new Date().getHours() 
    if(hour >= 18 || hour < 7){
      if(hour >= 23 || hour < 4){
        return this.getLocale()['2740']/* midnight */
      }
      return this.getLocale()['1418']/* 'dark' */
    }else{
      return this.getLocale()['1417']/* 'light' */
    }
  }

  reset_theme(){
    this.setState({theme: this.get_theme_data(this.state.theme['name'])})
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
          {this.render_edit_proposal_object_bottomsheet()}
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

  set_cookies_after_stack_action(stack_items, should_keep_stack_open){
    var me = this;
    var is_stack_open = this.state.stack_bottomsheet2
    this.setState({stack_bottomsheet2: true});
    setTimeout(function() { 
      if(me.stack_page.current!= null){
        me.stack_page.current?.run_transactions(true)
      } 
      me.set_cookies()

      setTimeout(function() {
        if(!is_stack_open) me.setState({stack_bottomsheet2: false});
      }, (1 * 1500));
    }, (1 * 1000));
  }

  add_mail_to_stack_object(message){
    var stack = this.state.stack_items.slice()
    var pos = -1
    for(var i=0; i<stack.length; i++){
      if(stack[i].type == this.getLocale()['1509']/* 'mail-messages' */ && stack[i].e5 == message['e5']){
        pos = i
        break;
      }
    }
    if(pos == -1){
      var tx = {selected: 0, id: makeid(8), type:this.getLocale()['1509']/* 'mail-messages' */, entered_indexing_tags:[this.getLocale()['1369']/* 'send' */, this.getLocale()['1201']/* 'mail' */], messages_to_deliver:[], e5:message['e5']}
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
      if(stack[i].type == this.getLocale()['1510']/* 'channel-messages' */ && stack[i].e5 == this.state.selected_e5){
        pos = i
        break;
      }
    }
    if(pos == -1){
      var tx = {selected: 0, id: makeid(8), type:this.getLocale()['1510']/* 'channel-messages' */, entered_indexing_tags:[this.getLocale()['1369']/* 'send' */, this.getLocale()['109']/* 'channel' */,this.getLocale()['2094']/* 'messages' */], messages_to_deliver:[], e5:this.state.selected_e5}
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
      if(stack[i].type == this.getLocale()['1511']/* 'post-messages' */ && stack[i].e5 == this.state.selected_e5){
        pos = i
        break;
      }
    }
    if(pos == -1){
      var tx = {selected: 0, id: makeid(8), type:this.getLocale()['1511']/* 'post-messages' */, entered_indexing_tags:[this.getLocale()['1019']/* 'send' */, this.getLocale()['297']/* 'post' */,this.getLocale()['2696']/* 'comment' */], messages_to_deliver:[], e5:this.state.selected_e5}
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
      if(stack[i].type == this.getLocale()['1514']/* 'job-messages' */ && stack[i].e5 == this.state.selected_e5){
        pos = i
        break;
      }
    }
    if(pos == -1){
      var tx = {selected: 0, id: makeid(8), type:this.getLocale()['1514']/* 'job-messages' */, entered_indexing_tags:[this.getLocale()['1019']/* 'send' */, this.getLocale()['1309']/* 'job' */,this.getLocale()['2696']/* 'comment' */], messages_to_deliver:[], e5:this.state.selected_e5}
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
      if(stack[i].type == this.getLocale()['1515']/* 'proposal-messages' */ && stack[i].e5 == this.state.selected_e5){
        pos = i
        break;
      }
    }
    if(pos == -1){
      var tx = {selected: 0, id: makeid(8), type:this.getLocale()['1515']/* 'proposal-messages' */, entered_indexing_tags:[this.getLocale()['1019']/* 'send' */, this.getLocale()['1309']/* 'job' */,this.getLocale()['2696']/* 'comment' */], messages_to_deliver:[], e5:this.state.selected_e5}
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
      if(stack[i].type == this.getLocale()['1501']/* 'bag-messages' */ && stack[i].e5 == this.state.selected_e5){
        pos = i
        break;
      }
    }
    if(pos == -1){
      var tx = {selected: 0, id: makeid(8), type:this.getLocale()['1501']/* 'bag-messages' */, entered_indexing_tags:[this.getLocale()['1019']/* 'send' */, this.getLocale()['1045']/* 'bag' */,this.getLocale()['2696']/* 'comment' */], messages_to_deliver:[], e5:this.state.selected_e5}
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
      if(stack[i].type == this.getLocale()['1502']/* 'storefront-messages' */ && stack[i].e5 == this.state.selected_e5){
        pos = i
        break;
      }
    }
    if(pos == -1){
      var tx = {selected: 0, id: makeid(8), type:this.getLocale()['1502']/* 'storefront-messages' */, entered_indexing_tags:[this.getLocale()['1019']/* 'send' */, this.getLocale()['1215']/* 'storefront' */,this.getLocale()['1158']/* 'message' */,this.getLocale()['2697']/* 'review' */], messages_to_deliver:[], e5:this.state.selected_e5}
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
    this.setState({visible_tabs: this.getLocale()['1428']/* 'enabled' */})
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
            <Syncronizing_page sync_progress={this.state.syncronizing_progress} app_state={this.state} theme={this.state.theme} close_syncronizing_page={this.close_syncronizing_page.bind(this)} />
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
    if(this.state.send_receive_bottomsheet2 != true) return;
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
    if(this.state.send_receive_bottomsheet == true){
      //closing
      this.send_receive_bottomsheet = this.send_receive_ether_page.current?.state;
     
      this.setState({send_receive_bottomsheet: !this.state.send_receive_bottomsheet});
      var me = this;
      setTimeout(function() {
        me.setState({send_receive_bottomsheet2: false});
      }, (1 * 1000));
    }else{
      //opening
      this.setState({send_receive_bottomsheet2: true});
      var me = this;
      setTimeout(function() {
        me.setState({send_receive_bottomsheet: !me.state.send_receive_bottomsheet});
        
        if(me.send_receive_bottomsheet != null){
          me.send_receive_ether_page.current?.setState(me.send_receive_bottomsheet)
        }
      }, (1 * 100));
    }
    
  }

  start_send_receive_ether_bottomsheet(item){
    this.open_send_receive_ether_bottomsheet()
    var me = this;
    setTimeout(function() {
      if(me.send_receive_ether_page.current != null){
        me.send_receive_ether_page.current.set_object(item)
      } 
    }, (1 * 500));
    
  }





  render_stack_bottomsheet(){
    // if(this.state.stack_bottomsheet2 != true) return;
    var background_color = this.state.theme['send_receive_ether_background_color'];
    var size = this.getScreenSize();
    return(
      <SwipeableBottomSheet  overflowHeight={0} marginTop={0} onChange={this.open_stack_bottomsheet.bind(this)} open={this.state.stack_bottomsheet} style={{'z-index':'5'}} bodyStyle={{'background-color': 'transparent'}} overlayStyle={{'background-color': this.state.theme['send_receive_ether_overlay_background'],'box-shadow': '0px 0px 0px 0px '+this.state.theme['send_receive_ether_overlay_shadow']}}>
          <div style={{ height: this.state.height-60, 'background-color': background_color, 'border-style': 'solid', 'border-color': this.state.theme['send_receive_ether_overlay_background'], 'border-radius': '1px 1px 0px 0px', 'border-width': '0px', 'box-shadow': '0px 0px 2px 1px '+this.state.theme['send_receive_ether_overlay_shadow'],'margin': '0px 0px 0px 0px', 'overflow-y':'auto'}}>
              <StackPage ref={this.stack_page} app_state={this.state} size={size} theme={this.state.theme} when_device_theme_changed={this.when_device_theme_changed.bind(this)} when_details_orientation_changed={this.when_details_orientation_changed.bind(this)} notify={this.prompt_top_notification.bind(this)} when_wallet_data_updated2={this.when_wallet_data_updated2.bind(this)} height={this.state.height} run_transaction_with_e={this.run_transaction_with_e.bind(this)} store_data_in_infura={this.store_data_in_infura.bind(this)} get_accounts_public_key={this.get_accounts_public_key.bind(this)} encrypt_data_object={this.encrypt_data_object.bind(this)} encrypt_key_with_accounts_public_key_hash={this.encrypt_key_with_accounts_public_key_hash.bind(this)} get_account_public_key={this.get_account_public_key.bind(this)} get_account_raw_public_key={this.get_account_raw_public_key.bind(this)} view_transaction={this.view_transaction.bind(this)} show_hide_stack_item={this.show_hide_stack_item.bind(this)} show_view_transaction_log_bottomsheet={this.show_view_transaction_log_bottomsheet.bind(this)} add_account_to_contacts={this.add_account_to_contacts.bind(this)} remove_account_from_contacts={this.remove_account_from_contacts.bind(this)} add_alias_transaction_to_stack={this.add_alias_transaction_to_stack.bind(this)} unreserve_alias_transaction_to_stack={this.unreserve_alias_transaction_to_stack.bind(this)} reset_alias_transaction_to_stack={this.reset_alias_transaction_to_stack.bind(this)} when_selected_e5_changed={this.when_selected_e5_changed.bind(this)} when_storage_option_changed={this.when_storage_option_changed.bind(this)} store_objects_data_in_ipfs_using_option={this.store_objects_data_in_ipfs_using_option.bind(this)} lock_run={this.lock_run.bind(this)} open_wallet_guide_bottomsheet={this.open_wallet_guide_bottomsheet.bind(this)} clear_cache={this.clear_cache.bind(this)} when_refresh_speed_changed={this.when_refresh_speed_changed.bind(this)} remove_account_from_blocked_accounts={this.remove_account_from_blocked_accounts.bind(this)} add_account_to_blocked_list={this.add_account_to_blocked_list.bind(this)} when_masked_data_setting_changed={this.when_masked_data_setting_changed.bind(this)} when_content_channeling_changed={this.when_content_channeling_changed.bind(this)} when_content_language_changed={this.when_content_language_changed.bind(this)} when_content_filter_setting_changed={this.when_content_filter_setting_changed.bind(this)} when_tabs_setting_changed={this.when_tabs_setting_changed.bind(this)} when_storage_permission_setting_changed={this.when_storage_permission_setting_changed.bind(this)} calculate_gas_with_e={this.calculate_gas_with_e.bind(this)} get_wallet_data_for_specific_e5={this.get_wallet_data_for_specific_e5.bind(this)} show_confirm_run_bottomsheet={this.show_confirm_run_bottomsheet.bind(this)} when_stack_optimizer_setting_changed={this.when_stack_optimizer_setting_changed.bind(this)} clear_transaction_stack={this.clear_transaction_stack.bind(this)} open_object_in_homepage={this.open_object_in_homepage.bind(this)}/>
          </div>
      </SwipeableBottomSheet>
    )
  }



  open_stack_bottomsheet(){
    if(this.state.stack_bottomsheet == true){
      //closing
      this.stack_bottomsheet = this.stack_page.current?.state;

      this.setState({stack_bottomsheet: !this.state.stack_bottomsheet});
      var me = this;
      setTimeout(function() {
        me.setState({stack_bottomsheet2: false});
      }, (1 * 1000));
    }else{
      //opening
      this.setState({stack_bottomsheet2: true});
      var me = this;
      setTimeout(function() {
        if(me.state != null){
          me.setState({stack_bottomsheet: !me.state.stack_bottomsheet});

          if(me.stack_bottomsheet != null){
            me.stack_page.current?.setState(me.stack_bottomsheet)
          }
        }
      }, (1 * 200));
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

  clear_transaction_stack(){
    this.setState({stack_items: []})
    this.prompt_top_notification(this.getLocale()['2698']/* 'stack cleared.' */, 1700)
  }


  open_object_in_homepage(target, e5, type){
    this.open_stack_bottomsheet()
    if(this.homepage.current != null){
      this.homepage.current?.open_notification_link(target, e5, type)
    }
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
          me.prompt_top_notification(me.getLocale()['2699']/* 'Your next run might fail with its current stack' */, 4000)
        }
        var clone = structuredClone(me.state.calculated_gas_figures)
        clone[me.state.selected_e5] = gasAmount
        me.setState({calculated_gas_figures: clone})
    });
  }

  run_transaction_with_e = async (strs, ints, adds, run_gas_limit, wei, delete_pos_array, _run_gas_price, run_expiry_duration) => {
    const web3 = new Web3(this.get_selected_web3_url());
    const contractArtifact = require('./contract_abis/E5.json');
    const contractAddress = this.get_selected_E5_contract()
    const contractInstance = new web3.eth.Contract(contractArtifact.abi, contractAddress); 
    const me = this

    var now = await contractInstance.methods.f147(2).call((error, result) => {})
    var run_expiry_time = now + run_expiry_duration

    var v5/* t_limits */ = [100000000000000, run_expiry_time];
    var network_gp = await web3.eth.getGasPrice()
    var run_gas_price = (_run_gas_price == null || _run_gas_price == 0 || _run_gas_price > 100**18) ? network_gp : _run_gas_price
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
          this.prompt_top_notification(this.getLocale()['2700']/* 'run complete!' */, 2600)
        }).on('error', (error) => {
          console.error('Transaction error:', error);
          var clone = structuredClone(this.state.is_running)
          clone[this.state.selected_e5] = false
          me.setState({is_running: clone})
          this.prompt_top_notification(this.getLocale()['2701']/* Your transaction was reverted.' */, 9500)
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
    this.prompt_top_notification(this.getLocale()['2702']/* 'Contact Deleted' */, 1700)

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
        this.prompt_top_notification(this.getLocale()['2703']/* 'You cant do that more than once.' */, 4000)
        existing_alias_transaction = true
        break;
      }
    }
    if(!existing_alias_transaction){
      stack_clone.push({id: makeid(8), e5:this.state.selected_e5, type:'alias', entered_indexing_tags:['alias', 'reserve', 'identification'], alias:id})
      this.prompt_top_notification(this.getLocale()['2704']/* 'Transaction added to stack.' */, 1600)
      this.setState({stack_items: stack_clone})
      this.set_cookies_after_stack_action(stack_clone)
    }
  }

  unreserve_alias_transaction_to_stack(id){
    var stack_clone = this.state.stack_items.slice()
    var existing_alias_transaction = false
    for(var i=0; i<stack_clone.length; i++){
      if(stack_clone[i].type == 'unalias'){
        this.prompt_top_notification(this.getLocale()['2705']/* 'You cant do that more than once.' */, 1000)
        existing_alias_transaction = true
        break;
      }
    }
    if(!existing_alias_transaction){
      stack_clone.push({id: makeid(8), e5:this.state.selected_e5, type:this.getLocale()['2706']/* 'unalias' */, entered_indexing_tags:[this.getLocale()['2706']/* 'unalias' */, this.getLocale()['2707']/* 'unreserve' */, this.getLocale()['2708']/* identification' */], alias:id['alias']})
      this.prompt_top_notification(this.getLocale()['2709']/* 'Unreserve transaction added to stack.' */, 2000)
      this.setState({stack_items: stack_clone})
      this.set_cookies_after_stack_action(stack_clone)
    }
  }

  reset_alias_transaction_to_stack(id){
    var stack_clone = this.state.stack_items.slice()
    var existing_alias_transaction = false
    for(var i=0; i<stack_clone.length; i++){
      if(stack_clone[i].type == this.getLocale()['2710']/* 're-alias' */){
        this.prompt_top_notification(this.getLocale()['2711']/* 'You cant do that more than once.' */, 4000)
        existing_alias_transaction = true
        break;
      }
    }
    if(!existing_alias_transaction){
      stack_clone.push({id: makeid(8), e5:this.state.selected_e5, type:this.getLocale()['2710']/* 're-alias' */, entered_indexing_tags:[this.getLocale()['2710']/* 're-alias' */, this.getLocale()['2712']/* 'reserve' */, this.getLocale()['2708']/* 'identification' */], alias:id['alias']})
      this.prompt_top_notification(this.getLocale()['2713']/* 'Reset transaction added to stack' */, 1000)
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
    this.prompt_top_notification(this.getLocale()['2714']/* 'Blocked account removed' */, 1700)
    
    var me = this;
    setTimeout(function() {
      me.set_cookies()
    }, (1 * 1000));
  }











  render_wiki_bottomsheet(){
    if(this.state.wiki_bottomsheet2 != true) return;
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
    if(this.state.wiki_bottomsheet == true){
      //closing
      this.wiki_bottomsheet = this.wiki_page.current?.state;

      this.setState({wiki_bottomsheet: !this.state.wiki_bottomsheet});
      var me = this;
      setTimeout(function() {
        me.setState({wiki_bottomsheet2: false});
      }, (1 * 1000));
    }else{
      //opening
      this.setState({wiki_bottomsheet2: true});
      var me = this;
      setTimeout(function() {
        if(me.state != null){
          me.setState({wiki_bottomsheet: !me.state.wiki_bottomsheet});

          if(me.wiki_bottomsheet != null){
            me.wiki_page.current?.setState(me.wiki_bottomsheet)
          }
        }
      }, (1 * 200));
    }
  }


  open_wallet_guide_bottomsheet(option){
    this.open_wiki_bottomsheet()
    var me = this;
    setTimeout(function() {
      if(me.wiki_page.current != null){
      me.wiki_page.current?.set(option)
    }
    }, (1 * 500));
    
  }




  render_new_object_bottomsheet(){
    if(this.state.new_object_bottomsheet2 != true) return;
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
    if(this.state.new_object_bottomsheet == true){
      //closing
      
      this.new_object_bottomsheet_new_job_page = this.new_job_page.current?.state;
      this.new_object_bottomsheet_new_token_page = this.new_token_page.current?.state;
      this.new_object_bottomsheet_new_subscription_page = this.new_subscription_page.current?.state;
      this.new_object_bottomsheet_new_contract_page = this.new_contract_page.current?.state;
      this.new_object_bottomsheet_new_post_page = this.new_post_page.current?.state;
      this.new_object_bottomsheet_new_channel_page = this.new_channel_page.current?.state;
      this.new_object_bottomsheet_new_storefront_item_page = this.new_storefront_item_page.current?.state;
      this.new_object_bottomsheet_new_mail_page = this.new_mail_page.current?.state;
      this.new_object_bottomsheet_new_contractor_page = this.new_contractor_page.current?.state;

      this.setState({new_object_bottomsheet: !this.state.new_object_bottomsheet});
      var me = this;
      setTimeout(function() {
        me.setState({new_object_bottomsheet2: false});
      }, (1 * 1000));
    }else{
      //opening
      this.setState({new_object_bottomsheet2: true});
      var me = this;
      setTimeout(function() {
        if(me.state != null){
          me.setState({new_object_bottomsheet: !me.state.new_object_bottomsheet});

          if(me.new_object_bottomsheet_new_job_page != null){
            me.new_job_page.current?.setState(me.new_object_bottomsheet_new_job_page)
          }
          if(me.new_object_bottomsheet_new_token_page != null){
            me.new_token_page.current?.setState(me.new_object_bottomsheet_new_token_page)
          }
          if(me.new_object_bottomsheet_new_subscription_page != null){
            me.new_subscription_page.current?.setState(me.new_object_bottomsheet_new_subscription_page)
          }
          if(me.new_object_bottomsheet_new_contract_page != null){
            me.new_contract_page.current?.setState(me.new_object_bottomsheet_new_contract_page)
          }
          if(me.new_object_bottomsheet_new_post_page != null){
            me.new_post_page.current?.setState(me.new_object_bottomsheet_new_post_page)
          }
          if(me.new_object_bottomsheet_new_channel_page != null){
            me.new_channel_page.current?.setState(me.new_object_bottomsheet_new_channel_page)
          }
          if(me.new_object_bottomsheet_new_storefront_item_page != null){
            me.new_storefront_item_page.current?.setState(me.new_object_bottomsheet_new_storefront_item_page)
          }
          if(me.new_object_bottomsheet_new_mail_page != null){
            me.new_mail_page.current?.setState(me.new_object_bottomsheet_new_mail_page)
          }
          if(me.new_object_bottomsheet_new_contractor_page != null){
            me.new_contractor_page.current?.setState(me.new_object_bottomsheet_new_contractor_page)
          }
        }
      }, (1 * 200));
    }
  }

  open_new_object(target){
    this.open_new_object_bottomsheet()
    this.setState({new_object_target: target});
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
    this.open_new_object_bottomsheet()
    var me = this;
    setTimeout(function() {
      me.new_job_page.current.set_fileds_for_edit_action(obj)
      me.new_job_page.current.set_action('edit')
    }, (1 * 500));
    
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
    if(this.state.edit_token_bottomsheet2 != true) return;
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
    if(this.state.edit_token_bottomsheet == true){
      //closing
      this.edit_token_bottomsheet = this.edit_token_page.current?.state;

      this.setState({edit_token_bottomsheet: !this.state.edit_token_bottomsheet});
      var me = this;
      setTimeout(function() {
        me.setState({edit_token_bottomsheet2: false});
      }, (1 * 1000));
    }else{
      //opening
      this.setState({edit_token_bottomsheet2: true});
      var me = this;
      setTimeout(function() {
        if(me.state != null){
          me.setState({edit_token_bottomsheet: !me.state.edit_token_bottomsheet});

          if(me.edit_token_bottomsheet != null){
            me.edit_token_page.current?.setState(me.edit_token_bottomsheet)
          }
        }
      }, (1 * 200));
    }
  }

  open_edit_token_object(target, object){
    this.open_edit_token_bottomsheet()
    var me = this;
    setTimeout(function() {
      if(me.edit_token_page.current){
      me.edit_token_page.current?.setState(object['ipfs'])
      me.edit_token_page.current?.set_edit_data()
      me.edit_token_page.current?.setState({object_id: object['id']})
      me.edit_token_page.current?.set_token_symbol(object['ipfs'].entered_symbol_text)
    }
    }, (1 * 500));
    
  }








  render_edit_channel_object_bottomsheet(){
    if(this.state.edit_channel_bottomsheet2 != true) return;
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
    if(this.state.edit_channel_bottomsheet == true){
      //closing
      this.edit_channel_bottomsheet = this.edit_channel_page.current?.state;

      this.setState({edit_channel_bottomsheet: !this.state.edit_channel_bottomsheet});
      var me = this;
      setTimeout(function() {
        me.setState({edit_channel_bottomsheet2: false});
      }, (1 * 1000));
    }else{
      //opening
      this.setState({edit_channel_bottomsheet2: true});
      var me = this;
      setTimeout(function() {
        if(me.state != null){
          me.setState({edit_channel_bottomsheet: !me.state.edit_channel_bottomsheet});
          
          if(me.edit_channel_bottomsheet != null){
            me.edit_channel_page.current?.setState(me.edit_channel_bottomsheet)
          }
        }
      }, (1 * 200));
    }
  }

  open_edit_channel_object(target, object){
    this.open_edit_channel_bottomsheet()
    var me = this;
    setTimeout(function() {
      if(me.edit_channel_page.current){
      me.edit_channel_page.current?.setState(object['ipfs'])
      me.edit_channel_page.current?.set_edit_data()
      me.edit_channel_page.current?.setState({object_id: object['id']})
    }
    }, (1 * 500));
    
  }













  render_edit_contractor_object_bottomsheet(){
    if(this.state.edit_contractor_bottomsheet2 != true) return;
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
    if(this.state.edit_contractor_bottomsheet == true){
      //closing
      this.edit_contractor_bottomsheet = this.edit_contractor_page.current?.state;

      this.setState({edit_contractor_bottomsheet: !this.state.edit_contractor_bottomsheet});
      var me = this;
      setTimeout(function() {
        me.setState({edit_contractor_bottomsheet2: false});
      }, (1 * 1000));
    }else{
      //opening
      this.setState({edit_contractor_bottomsheet2: true});
      var me = this;
      setTimeout(function() {
        if(me.state != null){
          me.setState({edit_contractor_bottomsheet: !me.state.edit_contractor_bottomsheet});

          if(me.edit_contractor_bottomsheet != null){
            me.edit_contractor_page.current?.setState(me.edit_contractor_bottomsheet)
          }
        }
      }, (1 * 200));
    }
  }

  open_edit_contractor_object(target, object){
    this.open_edit_contractor_bottomsheet()
    var me = this;
    setTimeout(function() {
      if(me.edit_contractor_page.current){
      me.edit_contractor_page.current?.setState(object['ipfs'])
      me.edit_contractor_page.current?.setState({type:me.getLocale()['763']/* 'edit-contractor' */})
      me.edit_contractor_page.current?.setState({object_id: object['id']})
      me.edit_contractor_page.current?.set()
    }
    }, (1 * 500));
    
  }










  render_edit_job_object_bottomsheet(){
    if(this.state.edit_job_bottomsheet2 != true) return;
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
    if(this.state.edit_job_bottomsheet == true){
      //closing
      this.edit_job_bottomsheet = this.edit_job_page.current?.state;

      this.setState({edit_job_bottomsheet: !this.state.edit_job_bottomsheet});
      var me = this;
      setTimeout(function() {
        me.setState({edit_job_bottomsheet2: false});
      }, (1 * 1000));
    }else{
      //opening
      this.setState({edit_job_bottomsheet2: true});
      var me = this;
      setTimeout(function() {
        if(me.state != null){
          me.setState({edit_job_bottomsheet: !me.state.edit_job_bottomsheet});

          if(me.edit_job_bottomsheet != null){
            me.edit_job_page.current?.setState(me.edit_job_bottomsheet)
          }
        }
      }, (1 * 200));
    }
  }

  open_edit_job_object(target, object){
    this.open_edit_job_bottomsheet()
    var me = this;
    setTimeout(function() {
      if(me.edit_job_page.current){
      me.edit_job_page.current?.setState(object['ipfs'])
      me.edit_job_page.current?.setState({type:me.getLocale()['764']/* 'edit-job' */})
      me.edit_job_page.current?.setState({object_id: object['id']})
      me.edit_job_page.current?.set()
    }
    }, (1 * 500));
    
  }










  render_edit_post_object_bottomsheet(){
    if(this.state.edit_post_bottomsheet2 != true) return;
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
    if(this.state.edit_post_bottomsheet == true){
      //closing
      this.edit_post_bottomsheet = this.edit_post_page.current?.state;

      this.setState({edit_post_bottomsheet: !this.state.edit_post_bottomsheet});
      var me = this;
      setTimeout(function() {
        me.setState({edit_post_bottomsheet2: false});
      }, (1 * 1000));
    }else{
      //opening
      this.setState({edit_post_bottomsheet2: true});
      var me = this;
      setTimeout(function() {
        if(me.state != null){
          me.setState({edit_post_bottomsheet: !me.state.edit_post_bottomsheet});
          if(me.edit_post_bottomsheet != null){
            me.edit_post_page.current?.setState(me.edit_post_bottomsheet)
          }
        }
      }, (1 * 200));
    }
  }

  open_edit_post_object(target, object){
    this.open_edit_post_bottomsheet()
    var me = this;
    setTimeout(function() {
      if(me.edit_post_page.current){
      me.edit_post_page.current?.setState(object['ipfs'])
      me.edit_post_page.current?.setState({type:me.getLocale()['765']/* 'edit-post' */})
      me.edit_post_page.current?.setState({object_id: object['id']})
      me.edit_post_page.current?.set()
    }
    }, (1 * 500));
    
  }










  render_edit_storefront_object_bottomsheet(){
    if(this.state.edit_storefront_bottomsheet2 != true) return;
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
    if(this.state.edit_storefront_bottomsheet == true){
      //closing
      this.edit_storefront_bottomsheet = this.edit_storefront_page.current?.state;

      this.setState({edit_storefront_bottomsheet: !this.state.edit_storefront_bottomsheet});
      var me = this;
      setTimeout(function() {
        me.setState({edit_storefront_bottomsheet2: false});
      }, (1 * 1000));
    }else{
      //opening
      this.setState({edit_storefront_bottomsheet2: true});
      var me = this;
      setTimeout(function() {
        if(me.state != null){
          me.setState({edit_storefront_bottomsheet: !me.state.edit_storefront_bottomsheet});
          
          if(me.edit_storefront_bottomsheet != null){
            me.edit_storefront_page.current?.setState(me.edit_storefront_bottomsheet)
          }
        }
      }, (1 * 200));
    }
  }

  open_edit_storefront_object(target, object){
    this.open_edit_storefront_bottomsheet()
    var me = this;
    setTimeout(function() {
      if(me.edit_storefront_page.current){
      me.edit_storefront_page.current?.setState(object['ipfs'])
      me.edit_storefront_page.current?.setState({type:me.getLocale()['766']/* 'edit-storefront' */})
      me.edit_storefront_page.current?.setState({object_id: object['id']})
      me.edit_storefront_page.current?.set()
    }
    }, (1 * 500));
    
  }











  render_edit_proposal_object_bottomsheet(){
    if(this.state.edit_proposal_bottomsheet2 != true) return;
    var background_color = this.state.theme['send_receive_ether_background_color'];
    var size = this.getScreenSize();
    return(
      <SwipeableBottomSheet  overflowHeight={0} marginTop={0} onChange={this.open_edit_proposal_bottomsheet.bind(this)} open={this.state.edit_proposal_bottomsheet} style={{'z-index':'5'}} bodyStyle={{'background-color': 'transparent'}} overlayStyle={{'background-color': this.state.theme['send_receive_ether_overlay_background'],'box-shadow': '0px 0px 0px 0px '+this.state.theme['send_receive_ether_overlay_shadow']}}>
          <div style={{ height: this.state.height-60, 'background-color': background_color, 'border-style': 'solid', 'border-color': this.state.theme['send_receive_ether_overlay_background'], 'border-radius': '1px 1px 0px 0px', 'border-width': '0px', 'box-shadow': '0px 0px 2px 1px '+this.state.theme['send_receive_ether_overlay_shadow'],'margin': '0px 0px 0px 0px', 'overflow-y':'auto'}}>
              <div>
                <EditProposalPage ref={this.edit_proposal_page} app_state={this.state} size={size} height={this.state.height} theme={this.state.theme} notify={this.prompt_top_notification.bind(this)} when_add_edit_object_to_stack={this.when_add_edit_object_to_stack.bind(this)}/>
              </div>
          </div>
      </SwipeableBottomSheet>
    )
  }

  open_edit_proposal_bottomsheet(){
    if(this.state.edit_proposal_bottomsheet == true){
      //closing
      this.edit_proposal_bottomsheet = this.edit_proposal_page.current?.state;

      this.setState({edit_proposal_bottomsheet: !this.state.edit_proposal_bottomsheet});
      var me = this;
      setTimeout(function() {
        me.setState({edit_proposal_bottomsheet2: false});
      }, (1 * 1000));
    }else{
      //opening
      this.setState({edit_proposal_bottomsheet2: true});
      var me = this;
      setTimeout(function() {
        if(me.state != null){
          me.setState({edit_proposal_bottomsheet: !me.state.edit_proposal_bottomsheet});
          if(me.edit_proposal_bottomsheet != null){
            me.edit_proposal_page.current?.setState(me.edit_proposal_bottomsheet)
          }
        }
      }, (1 * 200));
    }
  }

  open_edit_proposal_object(target, object){
    this.open_edit_proposal_bottomsheet()
    var me = this;
    setTimeout(function() {
      if(me.edit_proposal_page.current){
        me.edit_proposal_page.current?.setState(object['ipfs'])
        me.edit_proposal_page.current?.setState({type:me.getLocale()['2739']/* 'edit-proposal' */})
        me.edit_proposal_page.current?.setState({object_id: object['id']})
        me.edit_proposal_page.current?.set_edit_data()
      }
    }, (1 * 500));
    
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
    else if(target == '2'){
      this.open_edit_proposal_object(target, object)
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
    if(this.state.mint_token_bottomsheet2 != true) return;
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
    if(this.state.mint_token_bottomsheet == true){
      //closing
      this.mint_token_bottomsheet = this.new_mint_dump_token_page.current?.state;

      this.setState({mint_token_bottomsheet: !this.state.mint_token_bottomsheet});
      var me = this;
      setTimeout(function() {
        me.setState({mint_token_bottomsheet2: false});
      }, (1 * 1000));
    }else{
      //opening
      this.setState({mint_token_bottomsheet2: true});
      var me = this;
      setTimeout(function() {
        if(me.state != null){
          me.setState({mint_token_bottomsheet: !me.state.mint_token_bottomsheet});
          
          if(me.mint_token_bottomsheet != null){
            me.new_mint_dump_token_page.current?.setState(me.mint_token_bottomsheet)
          }
        }
        
      }, (1 * 200));
    }
  }

  show_mint_token_bottomsheet(mint_burn_token_item){
    this.open_mint_token_bottomsheet()
    var me = this;
    setTimeout(function() {
      if(me.new_mint_dump_token_page.current != null){
      me.new_mint_dump_token_page.current.set_token(mint_burn_token_item)
    }
    }, (1 * 500));
      
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
    if(this.state.transfer_token_bottomsheet2 != true) return;
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
    if(this.state.transfer_token_bottomsheet == true){
      //closing
      this.transfer_token_bottomsheet = this.new_transfer_token_page.current?.state;

      this.setState({transfer_token_bottomsheet: !this.state.transfer_token_bottomsheet});
      var me = this;
      setTimeout(function() {
        me.setState({transfer_token_bottomsheet2: false});
      }, (1 * 1000));
    }else{
      //opening
      this.setState({transfer_token_bottomsheet2: true});
      var me = this;
      setTimeout(function() {
        if(me.state != null){
          me.setState({transfer_token_bottomsheet: !me.state.transfer_token_bottomsheet});
          if(me.transfer_token_bottomsheet != null){
            me.new_transfer_token_page.current?.setState(me.transfer_token_bottomsheet)
          }

        }
      }, (1 * 200));
    }
  }

  show_transfer_bottomsheet(token_item){
    this.open_transfer_token_bottomsheet()
    var me = this;
    setTimeout(function() {
      if(me.new_transfer_token_page.current != null){
      me.new_transfer_token_page.current.set_token(token_item)
    }
    }, (1 * 500));
    
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
    if(this.state.enter_contract_bottomsheet2 != true) return;
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
    if(this.state.enter_contract_bottomsheet == true){
      //closing
      this.enter_contract_bottomsheet = this.enter_contract_page.current?.state;

      this.setState({enter_contract_bottomsheet: !this.state.enter_contract_bottomsheet});
      var me = this;
      setTimeout(function() {
        me.setState({enter_contract_bottomsheet2: false});
      }, (1 * 1000));
    }else{
      //opening
      this.setState({enter_contract_bottomsheet2: true});
      var me = this;
      setTimeout(function() {
        if(me.state != null){
          me.setState({enter_contract_bottomsheet: !me.state.enter_contract_bottomsheet});

          if(me.enter_contract_bottomsheet != null){
            me.enter_contract_page.current?.setState(me.enter_contract_bottomsheet)
          }
        }
      }, (1 * 200));
    }
  }

  show_enter_contract_bottomsheet(contract_item, job_acceptance_action_state_object){
    this.open_enter_contract_bottomsheet()
    var me = this;
    setTimeout(function() {
      if(me.enter_contract_page.current != null){
      me.enter_contract_page.current.set_contract(contract_item, job_acceptance_action_state_object)
    }
    }, (1 * 500));
    
  }

  enter_contract(state_obj, job_acceptance_action_state_object){
    var stack_clone = this.state.stack_items.slice()
    if(job_acceptance_action_state_object != null) {
      stack_clone.push(job_acceptance_action_state_object)
    }
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
    if(this.state.extend_contract_bottomsheet2 != true) return;
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
    if(this.state.extend_contract_bottomsheet == true){
      //closing
      this.extend_contract_bottomsheet = this.extend_contract_page.current?.state;

      this.setState({extend_contract_bottomsheet: !this.state.extend_contract_bottomsheet});
      var me = this;
      setTimeout(function() {
        me.setState({extend_contract_bottomsheet2: false});
      }, (1 * 1000));
    }else{
      //opening
      this.setState({extend_contract_bottomsheet2: true});
      var me = this;
      setTimeout(function() {
        if(me.state != null){
          me.setState({extend_contract_bottomsheet: !me.state.extend_contract_bottomsheet});

          if(me.extend_contract_bottomsheet != null){
            me.extend_contract_page.current?.setState(me.extend_contract_bottomsheet)
          }
        }
      }, (1 * 200));
    }
  }

  show_extend_contract_bottomsheet(contract_item){
    this.open_extend_contract_bottomsheet()
    var me = this;
    setTimeout(function() {
      if(me.extend_contract_page.current != null){
      me.extend_contract_page.current.set_contract(contract_item)
    }
    }, (1 * 500));
    
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
    if(this.state.exit_contract_bottomsheet2 != true) return;
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
    if(this.state.exit_contract_bottomsheet == true){
      //closing
      this.exit_contract_bottomsheet = this.exit_contract_page.current?.state;

      this.setState({exit_contract_bottomsheet: !this.state.exit_contract_bottomsheet});
      var me = this;
      setTimeout(function() {
        me.setState({exit_contract_bottomsheet2: false});
      }, (1 * 1000));
    }else{
      //opening
      this.setState({exit_contract_bottomsheet2: true});
      var me = this;
      setTimeout(function() {
        if(me.state != null){
          me.setState({exit_contract_bottomsheet: !me.state.exit_contract_bottomsheet});

          if(me.exit_contract_bottomsheet != null){
            me.exit_contract_page.current?.setState(me.exit_contract_bottomsheet)
          }
        }
      }, (1 * 200));
    }
  }

  show_exit_contract_bottomsheet(contract_item){
    this.open_exit_contract_bottomsheet()
    var me = this;
    setTimeout(function() {
      if(me.exit_contract_page.current != null){
      me.exit_contract_page.current.set_contract(contract_item)
    }
    }, (1 * 500));
    
  }

  exit_contract(state){
    var stack_clone = this.state.stack_items.slice()
    stack_clone.push(state)
    this.setState({stack_items: stack_clone})
    this.set_cookies_after_stack_action(stack_clone)
  }





  //new proposal
  render_new_proposal_bottomsheet(){
    if(this.state.new_proposal_bottomsheet2 != true) return;
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
    if(this.state.new_proposal_bottomsheet == true){
      //closing
      this.new_proposal_bottomsheet = this.new_proposal_page.current?.state;

      this.setState({new_proposal_bottomsheet: !this.state.new_proposal_bottomsheet});
      var me = this;
      setTimeout(function() {
        me.setState({new_proposal_bottomsheet2: false});
      }, (1 * 1000));
    }else{
      //opening
      this.setState({new_proposal_bottomsheet2: true});
      var me = this;
      setTimeout(function() {
        if(me.state != null){
          me.setState({new_proposal_bottomsheet: !me.state.new_proposal_bottomsheet});

          if(me.new_proposal_bottomsheet != null){
            me.new_proposal_page.current?.setState(me.new_proposal_bottomsheet)
          }
        }
      }, (1 * 200));
    }
  }

  show_new_proposal_bottomsheet(contract_item){
    this.open_new_proposal_bottomsheet()
    var me = this;
    setTimeout(function() {
      if(me.new_proposal_page.current != null){
        me.new_proposal_page.current.reset_state()
        me.new_proposal_page.current.set_contract(contract_item)
      }
    }, (1 * 500));
    

    
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
    if(this.state.vote_proposal_bottomsheet2 != true) return;
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
    if(this.state.vote_proposal_bottomsheet == true){
      //closing
      this.vote_proposal_bottomsheet = this.vote_proposal_page.current?.state;

      this.setState({vote_proposal_bottomsheet: !this.state.vote_proposal_bottomsheet});
      var me = this;
      setTimeout(function() {
        me.setState({vote_proposal_bottomsheet2: false});
      }, (1 * 1000));
    }else{
      //opening
      this.setState({vote_proposal_bottomsheet2: true});
      var me = this;
      setTimeout(function() {
        if(me.state != null){
          me.setState({vote_proposal_bottomsheet: !me.state.vote_proposal_bottomsheet});
          
          if(me.vote_proposal_bottomsheet != null){
            me.vote_proposal_page.current?.setState(me.vote_proposal_bottomsheet)
          }
        }
      }, (1 * 200));
    }
  }


  show_vote_proposal_bottomsheet(proposal_item){
    this.open_vote_proposal_bottomsheet()
    var me = this;
    setTimeout(function() {
      if(me.vote_proposal_page.current != null){
      me.vote_proposal_page.current.set_proposal(proposal_item)
    }
    }, (1 * 500));
    
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
    if(this.state.submit_proposal_bottomsheet2 != true) return;
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
    if(this.state.submit_proposal_bottomsheet == true){
      //closing
      this.submit_proposal_bottomsheet = this.submit_proposal_page.current?.state;

      this.setState({submit_proposal_bottomsheet: !this.state.submit_proposal_bottomsheet});
      var me = this;
      setTimeout(function() {
        me.setState({submit_proposal_bottomsheet2: false});
      }, (1 * 1000));
    }else{
      //opening
      this.setState({submit_proposal_bottomsheet2: true});
      var me = this;
      setTimeout(function() {
        if(me.state != null){
          me.setState({submit_proposal_bottomsheet: !me.state.submit_proposal_bottomsheet});

          if(me.submit_proposal_bottomsheet != null){
            me.submit_proposal_page.current?.setState(me.submit_proposal_bottomsheet)
          }
        }
      }, (1 * 200));
    }
  }

  show_submit_proposal_bottomsheet(proposal_item){
    this.open_submit_proposal_bottomsheet()
    var me = this;
    setTimeout(function() {
      if(me.submit_proposal_page.current != null){
      me.submit_proposal_page.current.set_proposal(proposal_item)
    }
    }, (1 * 500));
    

  }


  add_submit_proposal_action_to_stack(state_obj){
    var stack_clone = this.state.stack_items.slice()      
    stack_clone.push(state_obj)
    this.setState({stack_items: stack_clone})
    this.set_cookies_after_stack_action(stack_clone)
  }














  render_pay_subscription_bottomsheet(){
    if(this.state.pay_subscription_bottomsheet2 != true) return;
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
    if(this.state.pay_subscription_bottomsheet == true){
      //closing
      this.pay_subscription_bottomsheet = this.pay_subscription_page.current?.state;

      this.setState({pay_subscription_bottomsheet: !this.state.pay_subscription_bottomsheet});
      var me = this;
      setTimeout(function() {
        me.setState({pay_subscription_bottomsheet2: false});
      }, (1 * 1000));
    }else{
      //opening
      this.setState({pay_subscription_bottomsheet2: true});
      var me = this;
      setTimeout(function() {
        if(me.state != null){
          me.setState({pay_subscription_bottomsheet: !me.state.pay_subscription_bottomsheet});

          if(me.pay_subscription_bottomsheet != null){
            me.pay_subscription_page.current?.setState(me.pay_subscription_bottomsheet)
          }
        }
      }, (1 * 200));
    }
  }

  show_pay_subscription_bottomsheet(subscription_item){
    this.open_pay_subscription_bottomsheet()
    var me = this;
    setTimeout(function() {
      if(me.pay_subscription_page.current != null){
      me.pay_subscription_page.current.set_subscription(subscription_item)
    }
    }, (1 * 500));
    
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
    if(this.state.cancel_subscription_bottomsheet2 != true) return;
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
    if(this.state.cancel_subscription_bottomsheet == true){
      //closing
      this.cancel_subscription_bottomsheet = this.cancel_subscription_page.current?.state;

      this.setState({cancel_subscription_bottomsheet: !this.state.cancel_subscription_bottomsheet});
      var me = this;
      setTimeout(function() {
        me.setState({cancel_subscription_bottomsheet2: false});
      }, (1 * 1000));
    }else{
      //opening
      this.setState({cancel_subscription_bottomsheet2: true});
      var me = this;
      setTimeout(function() {
        if(me.state != null){
          me.setState({cancel_subscription_bottomsheet: !me.state.cancel_subscription_bottomsheet});

          if(me.cancel_subscription_bottomsheet != null){
            me.cancel_subscription_page.current?.setState(me.cancel_subscription_bottomsheet)
          }
        }
      }, (1 * 200));
    }
  }

  show_cancel_subscription_bottomsheet(subscription_item){
    this.open_cancel_subscription_bottomsheet()
    var me = this;
    setTimeout(function() {
      if(me.cancel_subscription_page.current != null){
      me.cancel_subscription_page.current.set_subscription(subscription_item)
    }
    }, (1 * 500));
    
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
    if(this.state.collect_subscription_bottomsheet2 != true) return;
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
    if(this.state.collect_subscription_bottomsheet == true){
      //closing
      this.collect_subscription_bottomsheet = this.collect_subscription_page.current?.state;

      this.setState({collect_subscription_bottomsheet: !this.state.collect_subscription_bottomsheet});
      var me = this;
      setTimeout(function() {
        me.setState({collect_subscription_bottomsheet2: false});
      }, (1 * 1000));
    }else{
      //opening
      this.setState({collect_subscription_bottomsheet2: true});
      var me = this;
      setTimeout(function() {
        if(me.state != null){
          me.setState({collect_subscription_bottomsheet: !me.state.collect_subscription_bottomsheet});

          if(me.collect_subscription_bottomsheet != null){
            me.collect_subscription_page.current?.setState(me.collect_subscription_bottomsheet)
          }
        }
      }, (1 * 200));
    }
  }

  show_collect_subscription_bottomsheet(subscription_item){
    this.open_collect_subscription_bottomsheet()
    var me = this;
    setTimeout(function() {
      if(me.collect_subscription_page.current != null){
      me.collect_subscription_page.current.set_subscription(subscription_item)
    }
    }, (1 * 500));
    
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
    if(this.state.modify_subscription_bottomsheet2 != true) return;
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
    if(this.state.modify_subscription_bottomsheet == true){
      //closing
      this.modify_subscription_bottomsheet = this.modify_subscription_page.current?.state;

      this.setState({modify_subscription_bottomsheet: !this.state.modify_subscription_bottomsheet});
      var me = this;
      setTimeout(function() {
        me.setState({modify_subscription_bottomsheet2: false});
      }, (1 * 1000));
    }else{
      //opening
      this.setState({modify_subscription_bottomsheet2: true});
      var me = this;
      setTimeout(function() {
        if(me.state != null){
          me.setState({modify_subscription_bottomsheet: !me.state.modify_subscription_bottomsheet});

          if(me.modify_subscription_bottomsheet != null){
            me.modify_subscription_page.current?.setState(me.modify_subscription_bottomsheet)
          }
        }
      }, (1 * 200));
    }
  }

  show_modify_subscription_bottomsheet(subscription_item){
    this.open_modify_subscription_bottomsheet()
    var me = this;
    setTimeout(function() {
      if(me.modify_subscription_page.current != null){
      me.modify_subscription_page.current.set_subscription(subscription_item)
    }
    }, (1 * 500));
    
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
    if(this.state.modify_contract_bottomsheet2 != true) return;
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
    if(this.state.modify_contract_bottomsheet == true){
      //closing
      this.modify_contract_bottomsheet = this.modify_contract_page.current?.state;

      this.setState({modify_contract_bottomsheet: !this.state.modify_contract_bottomsheet});
      var me = this;
      setTimeout(function() {
        me.setState({modify_contract_bottomsheet2: false});
      }, (1 * 1000));
    }else{
      //opening
      this.setState({modify_contract_bottomsheet2: true});
      var me = this;
      setTimeout(function() {
        if(me.state != null){
          me.setState({modify_contract_bottomsheet: !me.state.modify_contract_bottomsheet});

          if(me.modify_contract_bottomsheet != null){
            me.modify_contract_page.current?.setState(me.modify_contract_bottomsheet)
          }
        }
      }, (1 * 200));
    }
  }

  show_modify_contract_bottomsheet(contract_item){
    this.open_modify_contract_bottomsheet()
    var me = this;
    setTimeout(function() {
      if(me.modify_contract_page.current != null){
      me.modify_contract_page.current.set_contract(contract_item)
    }
    }, (1 * 500));
    
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
    if(this.state.modify_token_bottomsheet2 != true) return;
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
    if(this.state.modify_token_bottomsheet == true){
      //closing
      this.modify_token_bottomsheet = this.modify_token_page.current?.state;

      this.setState({modify_token_bottomsheet: !this.state.modify_token_bottomsheet});
      var me = this;
      setTimeout(function() {
        me.setState({modify_token_bottomsheet2: false});
      }, (1 * 1000));
    }else{
      //opening
      this.setState({modify_token_bottomsheet2: true});
      var me = this;
      setTimeout(function() {
        if(me.state != null){
          me.setState({modify_token_bottomsheet: !me.state.modify_token_bottomsheet});

          if(me.modify_token_bottomsheet != null){
            me.modify_token_page.current?.setState(me.modify_token_bottomsheet)
          }
        }
      }, (1 * 200));
    }
  }

  show_modify_token_bottomsheet(token_item){
    this.open_modify_token_bottomsheet()
    var me = this;
    setTimeout(function() {
      if(me.modify_token_page.current != null){
      me.modify_token_page.current.set_token(token_item)
    }
    }, (1 * 500));
    

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
    if(this.state.exchange_transfer_bottomsheet2 != true) return;
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
    if(this.state.exchange_transfer_bottomsheet == true){
      //closing
      this.exchange_transfer_bottomsheet = this.exchange_transfer_page.current?.state;

      this.setState({exchange_transfer_bottomsheet: !this.state.exchange_transfer_bottomsheet});
      var me = this;
      setTimeout(function() {
        me.setState({exchange_transfer_bottomsheet2: false});
      }, (1 * 1000));
    }else{
      //opening
      this.setState({exchange_transfer_bottomsheet2: true});
      var me = this;
      setTimeout(function() {
        if(me.state != null){
          me.setState({exchange_transfer_bottomsheet: !me.state.exchange_transfer_bottomsheet});

          if(me.exchange_transfer_bottomsheet != null){
            me.exchange_transfer_page.current?.setState(me.exchange_transfer_bottomsheet)
          }
        }
      }, (1 * 200));
    }
  }

  show_exchange_transfer_bottomsheet(token_item){
    this.open_exchange_transfer_bottomsheet()
    var me = this;
    setTimeout(function() {
      if(me.exchange_transfer_page.current != null){
      me.exchange_transfer_page.current.set_token(token_item)
    }
    }, (1 * 500));
    

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
    if(this.state.force_exit_bottomsheet2 != true) return;
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
    if(this.state.force_exit_bottomsheet == true){
      //closing
      this.force_exit_bottomsheet = this.force_exit_page.current?.state;

      this.setState({force_exit_bottomsheet: !this.state.force_exit_bottomsheet});
      var me = this;
      setTimeout(function() {
        me.setState({force_exit_bottomsheet2: false});
      }, (1 * 1000));
    }else{
      //opening
      this.setState({force_exit_bottomsheet2: true});
      var me = this;
      setTimeout(function() {
        if(me.state != null){
          me.setState({force_exit_bottomsheet: !me.state.force_exit_bottomsheet});

          if(me.force_exit_bottomsheet != null){
            me.force_exit_page.current?.setState(me.force_exit_bottomsheet)
          }
        }
      }, (1 * 200));
    }
  }

  show_force_exit_bottomsheet(contract_item){
    this.open_force_exit_bottomsheet()
    var me = this;
    setTimeout(function() {
      if(me.force_exit_page.current != null){
      me.force_exit_page.current.set_contract(contract_item)
    }
    }, (1 * 500));
    

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
    if(this.state.archive_proposal_bottomsheet2 != true) return;
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
    if(this.state.archive_proposal_bottomsheet == true){
      //closing
      this.archive_proposal_bottomsheet = this.archive_proposal_page.current?.state;

      this.setState({archive_proposal_bottomsheet: !this.state.archive_proposal_bottomsheet});
      var me = this;
      setTimeout(function() {
        me.setState({archive_proposal_bottomsheet2: false});
      }, (1 * 1000));
    }else{
      //opening
      this.setState({archive_proposal_bottomsheet2: true});
      var me = this;
      setTimeout(function() {
        if(me.state != null){
          me.setState({archive_proposal_bottomsheet: !me.state.archive_proposal_bottomsheet});

          if(me.archive_proposal_bottomsheet != null){
            me.archive_proposal_page.current?.setState(me.archive_proposal_bottomsheet)
          }
        }
      }, (1 * 200));
    }
  }

  show_archive_proposal_bottomsheet(proposal_item){
    this.open_archive_proposal_bottomsheet()
    var me = this;
    setTimeout(function() {
      if(me.archive_proposal_page.current != null){
      me.archive_proposal_page.current.set_object(proposal_item)
    }
    }, (1 * 500));
    

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
    if(this.state.freeze_unfreeze_bottomsheet2 != true) return;
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
     if(this.state.freeze_unfreeze_bottomsheet == true){
      //closing
      this.freeze_unfreeze_bottomsheet = this.freeze_unfreeze_page.current?.state;

      this.setState({freeze_unfreeze_bottomsheet: !this.state.freeze_unfreeze_bottomsheet});
      var me = this;
      setTimeout(function() {
        me.setState({freeze_unfreeze_bottomsheet2: false});
      }, (1 * 1000));
    }else{
      //opening
      this.setState({freeze_unfreeze_bottomsheet2: true});
      var me = this;
      setTimeout(function() {
        if(me.state != null){
          me.setState({freeze_unfreeze_bottomsheet: !me.state.freeze_unfreeze_bottomsheet});

          if(me.freeze_unfreeze_bottomsheet != null){
            me.freeze_unfreeze_page.current?.setState(me.freeze_unfreeze_bottomsheet)
          }
        }
      }, (1 * 200));
    }
  }

  show_freeze_unfreeze_bottomsheet(token_item){
    this.open_freeze_unfreeze_bottomsheet()
    var me = this;
    setTimeout(function() {
      if(me.freeze_unfreeze_page.current != null){
      me.freeze_unfreeze_page.current.set_token(token_item)
    }
    }, (1 * 500));
    

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
    if(this.state.authmint_bottomsheet2 != true) return;
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
    if(this.state.authmint_bottomsheet == true){
      //closing
      this.authmint_bottomsheet = this.authmint_page.current?.state;

      this.setState({authmint_bottomsheet: !this.state.authmint_bottomsheet});
      var me = this;
      setTimeout(function() {
        me.setState({authmint_bottomsheet2: false});
      }, (1 * 1000));
    }else{
      //opening
      this.setState({authmint_bottomsheet2: true});
      var me = this;
      setTimeout(function() {
        if(me.state != null){
          me.setState({authmint_bottomsheet: !me.state.authmint_bottomsheet});

          if(me.authmint_bottomsheet != null){
            me.authmint_page.current?.setState(me.authmint_bottomsheet)
          }
        }
      }, (1 * 200));
    }
  }

  show_authmint_bottomsheet(token_item){
    this.open_authmint_bottomsheet()
    var me = this;
    setTimeout(function() {
      if(me.authmint_page.current != null){
      me.authmint_page.current.set_token(token_item)
    }
    }, (1 * 500));
    

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
    if(this.state.moderator_bottomsheet2 != true) return;
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
    if(this.state.moderator_bottomsheet == true){
      //closing
      this.moderator_bottomsheet = this.moderator_page.current?.state;

      this.setState({moderator_bottomsheet: !this.state.moderator_bottomsheet});
      var me = this;
      setTimeout(function() {
        me.setState({moderator_bottomsheet2: false});
      }, (1 * 1000));
    }else{
      //opening
      this.setState({moderator_bottomsheet2: true});
      var me = this;
      setTimeout(function() {
        if(me.state != null){
          me.setState({moderator_bottomsheet: !me.state.moderator_bottomsheet});

          if(me.moderator_bottomsheet != null){
            me.moderator_page.current?.setState(me.moderator_bottomsheet)
          }
        }
      }, (1 * 200));
    }
  }

  show_moderator_bottomsheet(item){
    this.open_moderator_bottomsheet()
    var me = this;
    setTimeout(function() {
      if(me.moderator_page.current != null){
      me.moderator_page.current.set_object(item)
    }
    }, (1 * 500));
    

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
    if(this.state.respond_to_job_bottomsheet2 != true) return;
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
    if(this.state.respond_to_job_bottomsheet == true){
      //closing
      this.respond_to_job_bottomsheet = this.respond_to_job_page.current?.state;

      this.setState({respond_to_job_bottomsheet: !this.state.respond_to_job_bottomsheet});
      var me = this;
      setTimeout(function() {
        me.setState({respond_to_job_bottomsheet2: false});
      }, (1 * 1000));
    }else{
      //opening
      this.setState({respond_to_job_bottomsheet2: true});
      var me = this;
      setTimeout(function() {
        if(me.state != null){
          me.setState({respond_to_job_bottomsheet: !me.state.respond_to_job_bottomsheet});

          if(me.respond_to_job_bottomsheet != null){
            me.respond_to_job_page.current?.setState(me.respond_to_job_bottomsheet)
          }
        }
      }, (1 * 200));
    }
  }

  show_respond_to_job_bottomsheet(item){
    this.open_respond_to_job_bottomsheet()
    var me = this;
    setTimeout(function() {
      if(me.respond_to_job_page.current != null){
      me.respond_to_job_page.current.set_object(item)
    }
    }, (1 * 500));
    

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
    if(this.state.view_application_contract_bottomsheet2 != true) return;
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
    if(this.state.view_application_contract_bottomsheet == true){
      //closing
      this.view_application_contract_bottomsheet = this.view_application_contract_page.current?.state;

      this.setState({view_application_contract_bottomsheet: !this.state.view_application_contract_bottomsheet});
      var me = this;
      setTimeout(function() {
        me.setState({view_application_contract_bottomsheet2: false});
      }, (1 * 1000));
    }else{
      //opening
      this.setState({view_application_contract_bottomsheet2: true});
      var me = this;
      setTimeout(function() {
        if(me.state != null){
          me.setState({view_application_contract_bottomsheet: !me.state.view_application_contract_bottomsheet});

          if(me.view_application_contract_bottomsheet != null){
            me.view_application_contract_page.current?.setState(me.view_application_contract_bottomsheet)
          }
        }
      }, (1 * 200));
    }
  }

  show_view_application_contract_bottomsheet(item){
    this.open_view_application_contract_bottomsheet()
    var me = this;
    setTimeout(function() {
      if(me.view_application_contract_page.current != null){
      me.view_application_contract_page.current.set_object(item)
    }
    }, (1 * 500));
    

  }


  add_job_acceptance_action_to_stack(state_obj){
    var contract = state_obj.application_item['contract']
    if(contract['access_rights_enabled'] == true && (contract['my_interactable_time_value'] < Date.now()/1000 && !contract['moderators'].includes(this.state.user_account_id[contract['e5']]))){
      this.prompt_top_notification('The contract owner hasnt granted you access to their contract yet', 4000)
    }
    else if(contract['my_blocked_time_value'] > Date.now()/1000){
      this.prompt_top_notification(this.getLocale()['2715']/* 'Your account was blocked from entering the contract.' */, 4000)
    }
    else{
      this.show_enter_contract_bottomsheet(state_obj.application_item['contract'], state_obj)
      this.open_view_application_contract_bottomsheet()
    }
  }











  render_view_transaction_bottomsheet(){
    if(this.state.view_transaction_bottomsheet2 != true) return;
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
    if(this.state.view_transaction_bottomsheet == true){
      //closing
      this.view_transaction_bottomsheet = this.view_transaction_page.current?.state;

      this.setState({view_transaction_bottomsheet: !this.state.view_transaction_bottomsheet});
      var me = this;
      setTimeout(function() {
        me.setState({view_transaction_bottomsheet2: false});
      }, (1 * 1000));
    }else{
      //opening
      this.setState({view_transaction_bottomsheet2: true});
      var me = this;
      setTimeout(function() {
        if(me.state != null){
          me.setState({view_transaction_bottomsheet: !me.state.view_transaction_bottomsheet});

          if(me.view_transaction_bottomsheet != null){
            me.view_transaction_page.current?.setState(me.view_transaction_bottomsheet)
          }
        }
      }, (1 * 200));
    }
  }

  show_view_transaction_bottomsheet(item, index){
    this.open_view_transaction_bottomsheet()
    var me = this;
    setTimeout(function() {
      if(me.view_transaction_page.current != null){
      me.view_transaction_page.current.set_transaction(item, index)
    }
    }, (1 * 500));
    

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
    if(tx.type == this.getLocale()['1130']/* 'contract' */){
        this.open_new_object('1')
        var me = this;
        setTimeout(function() {
          if(me.new_contract_page.current){
            me.new_contract_page.current?.set_state(tx)
          }
        }, (1 * 500));
        
    }
    else if(tx.type == this.getLocale()['601']/* 'token' */){
        this.open_new_object('8')
        var me = this;
        setTimeout(function() {
          if(me.new_token_page.current){
          me.new_token_page.current?.set_state(tx)
        }
        }, (1 * 500));
        
    }
    else if(tx.type == this.getLocale()['823']/* 'subscription' */){
        this.open_new_object('3')
        var me = this;
        setTimeout(function() {
          if(me.new_subscription_page.current){
          me.new_subscription_page.current?.set_state(tx)
        }
        }, (1 * 500));
        
    }
    else if(tx.type == this.getLocale()['297']/* 'post' */){
        this.open_new_object('6')
        var me = this;
        setTimeout(function() {
          if(me.new_post_page.current){
          me.new_post_page.current?.setState(tx)
        }
        }, (1 * 500));
        
    }
    else if(tx.type == this.getLocale()['760']/* 'job' */){
        this.open_new_object('0')
        var me = this;
        setTimeout(function() {
          if(me.new_job_page.current){
          me.new_job_page.current?.setState(tx)
        }
        }, (1 * 500));
        
    }
    else if(tx.type == this.getLocale()['109']/* 'channel' */){
        this.open_new_object('7')
        var me = this;
        setTimeout(function() {
          if(me.new_channel_page.current){
          me.new_channel_page.current?.setState(tx)
        }
        }, (1 * 500));
        
    }
    else if(tx.type == this.getLocale()['439']/* 'storefront-item' */){
        this.open_new_object('4')
        var me = this;
        setTimeout(function() {
          if(me.new_storefront_item_page.current){
          me.new_storefront_item_page.current?.setState(tx)
        }
        }, (1 * 500));
        
    }
    else if(tx.type == this.getLocale()['946']/* 'buy-sell' */){
      this.open_mint_token_bottomsheet()
      var me = this;
        setTimeout(function() {
          if(me.new_mint_dump_token_page.current){
        me.new_mint_dump_token_page.current?.setState(tx)
      }
        }, (1 * 500));
      
    }
    else if(tx.type == this.getLocale()['1018']/* 'transfer' */){
      this.open_transfer_token_bottomsheet()
      var me = this;
        setTimeout(function() {
          if(me.new_transfer_token_page.current){
            me.new_transfer_token_page.current?.setState(tx)
          }
        }, (1 * 500));
      
    }
    else if(tx.type == this.getLocale()['2125']/* 'enter-contract' */){
      this.open_enter_contract_bottomsheet()
      var me = this;
        setTimeout(function() {
          if(me.enter_contract_page.current){
            me.enter_contract_page.current?.setState(tx)
          }
        }, (1 * 500));
       
    }
    else if(tx.type == this.getLocale()['35']/* 'extend-contract' */){
      this.open_extend_contract_bottomsheet()
      var me = this;
        setTimeout(function() {
          if(me.extend_contract_page.current){
        me.extend_contract_page.current?.setState(tx)
      }
        }, (1 * 500));
       
    }
    else if(tx.type == this.getLocale()['312']/* 'proposal' */){
      this.open_new_proposal_bottomsheet()
      var me = this;
        setTimeout(function() {
          if(me.new_proposal_page.current){
        me.new_proposal_page.current?.setState(tx)
      }
        }, (1 * 500));
       
    }
    else if(tx.type == this.getLocale()['796']/* 'vote' */){
      this.open_vote_proposal_bottomsheet()
      var me = this;
        setTimeout(function() {
          if(me.vote_proposal_page.current){
        me.vote_proposal_page.current?.setState(tx)
      }
        }, (1 * 500));
      
    }
    else if(tx.type == this.getLocale()['862']/* 'pay-subscription' */){
      this.open_pay_subscription_bottomsheet()
      var me = this;
        setTimeout(function() {
          if(me.pay_subscription_page.current){
        me.pay_subscription_page.current?.setState(tx)
      } 
        }, (1 * 500));
      
    }
    else if(tx.type == this.getLocale()['821']/* 'cancel-subscription' */){
      this.open_cancel_subscription_bottomsheet()
      var me = this;
        setTimeout(function() {
          if(me.cancel_subscription_page.current){
        me.cancel_subscription_page.current?.setState(tx)
      }
        }, (1 * 500));
      
    }
    else if(tx.type == this.getLocale()['840']/* 'modify-subscription' */){
        this.open_modify_subscription_bottomsheet()
        var me = this;
        setTimeout(function() {
          if(me.modify_subscription_page.current){
          me.modify_subscription_page.current?.setState(tx)
        }
        }, (1 * 500));
        
    }   
    else if(tx.type == this.getLocale()['2123']/* 'modify-contract' */){
        this.open_modify_contract_bottomsheet()
        var me = this;
        setTimeout(function() {
          if(me.modify_contract_page.current){
          me.modify_contract_page.current?.setState(tx)
        }
        }, (1 * 500));
        
    }
    else if(tx.type == this.getLocale()['997']/* 'modify-token' */){
        this.open_modify_token_bottomsheet()
        var me = this;
        setTimeout(function() {
          if(me.modify_token_page.current){
          me.modify_token_page.current?.setState(tx)
        }
        }, (1 * 500));
        
    }
    else if(tx.type == this.getLocale()['318']/* 'exchange-transfer' */){
        this.open_exchange_transfer_bottomsheet()
        var me = this;
        setTimeout(function() {
          if(me.exchange_transfer_page.current){
          me.exchange_transfer_page.current?.setState(tx)
        }
        }, (1 * 500));
        
    }
    else if(tx.type == this.getLocale()['48']/* 'force-exit' */){
        this.open_force_exit_bottomsheet()
        var me = this;
        setTimeout(function() {
          if(me.force_exit_page.current){
          me.force_exit_page.current?.setState(tx)
        }
        }, (1 * 500));
        
    }
    else if(tx.type == this.getLocale()['768']/* 'archive' */){
        this.open_archive_proposal_bottomsheet()
        var me = this;
        setTimeout(function() {
          if(me.archive_proposal_page.current){
          me.archive_proposal_page.current?.setState(tx)
        }
        }, (1 * 500));
        
    }
    else if(tx.type == this.getLocale()['930']/* 'freeze/unfreeze' */){
        this.open_freeze_unfreeze_bottomsheet()
        var me = this;
        setTimeout(function() {
          if(me.freeze_unfreeze_page.current){
          me.freeze_unfreeze_page.current?.setState(tx)
        }
        }, (1 * 500));
        
    }
    else if(tx.type == this.getLocale()['880']/* 'authmint' */){
        this.open_authmint_bottomsheet()
        var me = this;
        setTimeout(function() {
          if(me.authmint_page.current){
          me.authmint_page.current?.setState(tx)
        }
        }, (1 * 500));
        
    }
    else if(tx.type == this.getLocale()['1265']/* 'access-rights-settings' */){
        this.open_moderator_bottomsheet()
        var me = this;
        setTimeout(function() {
          if(me.moderator_page.current){
          me.moderator_page.current?.setState(tx)
        }
        }, (1 * 500));
          
    }
    else if(tx.type == this.getLocale()['285']/* 'mail' */){
        this.open_new_object('5')
        var me = this;
        setTimeout(function() {
          if(me.new_mail_page.current){
          me.new_mail_page.current?.setState(tx)
        }
        }, (1 * 500));
         
    }  
    else if(tx.type == this.getLocale()['1307']/* 'job-response' */){
        this.open_respond_to_job_bottomsheet()
        var me = this;
        setTimeout(function() {
          if(me.respond_to_job_page.current){
          me.respond_to_job_page.current?.setState(tx)
        }
        }, (1 * 500));
           
    }
    else if(tx.type == this.getLocale()['1499']/* 'direct-purchase' */){
      this.open_direct_purchase_bottomsheet()
      var me = this;
        setTimeout(function() {
          if(me.direct_purchase_page.current){
        me.direct_purchase_page.current?.setState(tx)
      }
        }, (1 * 500));
       
    }
    else if(tx.type == this.getLocale()['1503']/* 'contractor' */){
      this.open_new_object('9')
      var me = this;
        setTimeout(function() {
          if(me.new_contractor_page.current){
          me.new_contractor_page.current?.setState(tx)
        }
        }, (1 * 500));
        
      
    }
    else if(tx.type == this.getLocale()['1363']/* 'job-request' */){
        this.open_send_job_request_bottomsheet()
        var me = this;
        setTimeout(function() {
          if(me.send_job_request_page.current){
          me.send_job_request_page.current?.setState(tx)
        }
        }, (1 * 500));
         
    }
    else if(tx.type == this.getLocale()['753']/* 'edit-channel' */){
      this.open_edit_channel_bottomsheet()
      var me = this;
        setTimeout(function() {
          if(me.edit_channel_page.current){
        me.edit_channel_page.current?.setState(tx)
      }
        }, (1 * 500));
      
    }
    else if(tx.type == this.getLocale()['763']/* 'edit-contractor' */){
      this.open_edit_contractor_bottomsheet()
      var me = this;
        setTimeout(function() {
          if(me.edit_contractor_page.current){
        me.edit_contractor_page.current?.setState(tx)
      }
        }, (1 * 500));
      
    }
    else if(tx.type == this.getLocale()['764']/* 'edit-job' */){
        this.open_edit_job_bottomsheet()
        var me = this;
        setTimeout(function() {
          if(me.edit_job_page.current){
          me.edit_job_page.current?.setState(tx)
        }
        }, (1 * 500));
        
    }
    else if(tx.type == this.getLocale()['765']/* 'edit-post' */){
        this.open_edit_post_bottomsheet()
        var me = this;
        setTimeout(function() {
          if(me.edit_post_page.current){
          me.edit_post_page.current?.setState(tx)
        }
        }, (1 * 500));
        
    }
    else if(tx.type == this.getLocale()['766']/* 'edit-storefront' */){
        this.open_edit_storefront_bottomsheet()
        var me = this;
        setTimeout(function() {
          if(me.edit_storefront_page.current){
          me.edit_storefront_page.current?.setState(tx)
        }
        }, (1 * 500));
        
    }
    else if(tx.type == this.getLocale()['761']/* 'edit-token' */){
        this.open_edit_token_bottomsheet()
        var me = this;
        setTimeout(function() {
          if(me.edit_token_page.current){
          me.edit_token_page.current?.setState(tx)
        }
        }, (1 * 500));
        
    }
    else if(tx.type == this.getLocale()['2739']/* 'edit-proposal' */){
      this.open_edit_proposal_bottomsheet()
      var me = this;
        setTimeout(function() {
          if(me.edit_proposal_page.current){
        me.edit_proposal_page.current?.setState(tx)
      }
        }, (1 * 500));
      
    }
    else if(tx.type == this.getLocale()['898']/* 'depthmint' */){
        this.open_depthmint_bottomsheet()
        var me = this;
        setTimeout(function() {
          if(me.depthmint_page.current){
          me.depthmint_page.current?.setState(tx)
        }
        }, (1 * 500));
        
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
      if(stack[pos].messages_to_deliver.length == 0){
        stack.splice(pos, 1)
        this.open_view_transaction_bottomsheet()
      }
      this.setState({stack_items: stack})
      this.set_cookies_after_stack_action(stack)
    }
  }

  when_edit_bag_item_tapped(item){
    this.open_add_to_bag_bottomsheet()
    var me = this;
    setTimeout(function() {
      if(me.add_to_bag_page.current != null){
        me.add_to_bag_page.current.setState(item)
      }
    }, (1 * 500));
    
  }

  delete_bag_item(item){
    var stack = this.state.stack_items.slice() 
    var pos = -1
    for(var i=0; i<stack.length; i++){
      if(stack[i].type == this.getLocale()['1516']/* 'storefront-bag' */){
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
    if(this.state.view_transaction_log_bottomsheet2 != true) return;
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
    if(this.state.view_transaction_log_bottomsheet == true){
      //closing
      this.view_transaction_log_bottomsheet = this.view_transaction_page.current?.state;

      this.setState({view_transaction_log_bottomsheet: !this.state.view_transaction_log_bottomsheet});
      var me = this;
      setTimeout(function() {
        me.setState({view_transaction_log_bottomsheet2: false});
      }, (1 * 1000));
    }else{
      //opening
      this.setState({view_transaction_log_bottomsheet2: true});
      var me = this;
      setTimeout(function() {
        if(me.state != null){
          me.setState({view_transaction_log_bottomsheet: !me.state.view_transaction_log_bottomsheet});

          if(me.view_transaction_log_bottomsheet != null){
            me.view_transaction_page.current?.setState(me.view_transaction_log_bottomsheet)
          }
        }
      }, (1 * 200));
    }
  }

  show_view_transaction_log_bottomsheet(item){
    this.open_view_transaction_log_bottomsheet()
    var me = this;
    setTimeout(function() {
      if(me.view_transaction_log_page.current != null){
        me.view_transaction_log_page.current.set_transaction(item)
      }
    }, (1 * 500));
    
  }










  render_add_to_bag_bottomsheet(){
    if(this.state.add_to_bag_bottomsheet2 != true) return;
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
    if(this.state.add_to_bag_bottomsheet == true){
      //closing
      this.add_to_bag_bottomsheet = this.add_to_bag_page.current?.state;

      this.setState({add_to_bag_bottomsheet: !this.state.add_to_bag_bottomsheet});
      var me = this;
      setTimeout(function() {
        me.setState({add_to_bag_bottomsheet2: false});
      }, (1 * 1000));
    }else{
      //opening
      this.setState({add_to_bag_bottomsheet2: true});
      var me = this;
      setTimeout(function() {
        if(me.state != null){
          me.setState({add_to_bag_bottomsheet: !me.state.add_to_bag_bottomsheet});

          if(me.add_to_bag_bottomsheet != null){
            me.add_to_bag_page.current?.setState(me.add_to_bag_bottomsheet)
          }
        }
      }, (1 * 200));
    }
  }

  show_add_to_bag_bottomsheet(item){
    this.open_add_to_bag_bottomsheet()
    var me = this;
    setTimeout(function() {
      if(me.add_to_bag_page.current != null){
        me.add_to_bag_page.current.set_transaction(item)
      }
    }, (1 * 500));
    
  }

  add_bag_item_to_bag_in_stack(state_obj){
    var stack = this.state.stack_items.slice() 
    var pos = -1
    var storefront_item_content_channeling = state_obj.storefront_item['ipfs'].content_channeling_setting
    for(var i=0; i<stack.length; i++){
      if(stack[i].type == this.getLocale()['1516']/* 'storefront-bag' */ && stack[i].e5 == state_obj.e5 && stack[i].content_channeling_setting == storefront_item_content_channeling){
        pos = i
        break;
      }
    }
    if(pos == -1){
      var tx = {selected: 0, id: makeid(8), type:this.getLocale()['1516']/* 'storefront-bag' */, entered_indexing_tags:[this.getLocale()['1215']/* 'storefront' */, this.getLocale()['1045']/* 'bag' */, this.getLocale()['2716']/* 'cart' */], items_to_deliver:[], e5: state_obj.e5, content_channeling_setting: this.state.content_channeling, device_language_setting: this.state.device_language, device_country: this.state.device_country}
      
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
    if(this.state.fulfil_bag_bottomsheet2 != true) return;
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
    if(this.state.fulfil_bag_bottomsheet == true){
      //closing
      this.fulfil_bag_bottomsheet = this.fulfil_bag_page.current?.state;
  
      this.setState({fulfil_bag_bottomsheet: !this.state.fulfil_bag_bottomsheet});
      var me = this;
      setTimeout(function() {
        me.setState({fulfil_bag_bottomsheet2: false});
      }, (1 * 1000));
    }else{
      //opening
      this.setState({fulfil_bag_bottomsheet2: true});
      var me = this;
      setTimeout(function() {
        if(me.state != null){
          me.setState({fulfil_bag_bottomsheet: !me.state.fulfil_bag_bottomsheet});

          if(me.fulfil_bag_bottomsheet != null){
            me.fulfil_bag_page.current?.setState(me.fulfil_bag_bottomsheet)
          }
        }
      }, (1 * 200));
    }
  }

  show_fulfil_bag_bottomsheet(item){
    this.open_fulfil_bag_bottomsheet()
    var me = this;
    setTimeout(function() {
      if(me.fulfil_bag_page.current != null){
        me.fulfil_bag_page.current.set_bag(item)
      }
    }, (1 * 500));
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
    if(this.state.view_bag_application_contract_bottomsheet2 != true) return;
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
    if(this.state.view_bag_application_contract_bottomsheet == true){
      //closing
      this.view_bag_application_contract_bottomsheet = this.view_bag_application_contract_page.current?.state;

      this.setState({view_bag_application_contract_bottomsheet: !this.state.view_bag_application_contract_bottomsheet});
      var me = this;
      setTimeout(function() {
        me.setState({view_bag_application_contract_bottomsheet2: false});
      }, (1 * 1000));
    }else{
      //opening
      this.setState({view_bag_application_contract_bottomsheet2: true});
      var me = this;
      setTimeout(function() {
        if(me.state != null){
          me.setState({view_bag_application_contract_bottomsheet: !me.state.view_bag_application_contract_bottomsheet});

          if(me.view_bag_application_contract_bottomsheet != null){
            me.view_bag_application_contract_page.current?.setState(me.view_bag_application_contract_bottomsheet)
          }
        }
      }, (1 * 200));
    }
  }

  show_view_bag_application_contract_bottomsheet(item){
    this.open_view_bag_application_contract_bottomsheet()
    var me = this;
    setTimeout(function() {
      if(me.view_bag_application_contract_page.current != null){
        me.view_bag_application_contract_page.current.set_object(item)
      }
    }, (1 * 500));
    
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
    if(this.state.direct_purchase_bottomsheet2 != true) return;
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
    if(this.state.direct_purchase_bottomsheet == true){
      //closing
      this.direct_purchase_bottomsheet = this.direct_purchase_page.current?.state;

      this.setState({direct_purchase_bottomsheet: !this.state.direct_purchase_bottomsheet});
      var me = this;
      setTimeout(function() {
        me.setState({direct_purchase_bottomsheet2: false});
      }, (1 * 1000));
    }else{
      //opening
      this.setState({direct_purchase_bottomsheet2: true});
      var me = this;
      setTimeout(function() {
        if(me.state != null){
          me.setState({direct_purchase_bottomsheet: !me.state.direct_purchase_bottomsheet});

          if(me.direct_purchase_bottomsheet != null){
            me.direct_purchase_page.current?.setState(me.direct_purchase_bottomsheet)
          }
        }
      }, (1 * 200));
    }
  }

  show_direct_purchase_bottomsheet(item){
    this.open_direct_purchase_bottomsheet()
    var me = this;
    setTimeout(function() {
      if(me.direct_purchase_page.current != null){
        me.direct_purchase_page.current.set_object(item)
      }
    }, (1 * 500));

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
    if(this.state.clear_purchase_bottomsheet2 != true) return;
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
    if(this.state.clear_purchase_bottomsheet == true){
      //closing
      this.clear_purchase_bottomsheet = this.clear_purchase_page.current?.state;

      this.setState({clear_purchase_bottomsheet: !this.state.clear_purchase_bottomsheet});
      var me = this;
      setTimeout(function() {
        me.setState({clear_purchase_bottomsheet2: false});
      }, (1 * 1000));
    }else{
      //opening
      this.setState({clear_purchase_bottomsheet2: true});
      var me = this;
      setTimeout(function() {
        if(me.state != null){
          me.setState({clear_purchase_bottomsheet: !me.state.clear_purchase_bottomsheet});

          if(me.clear_purchase_bottomsheet != null){
            me.clear_purchase_page.current?.setState(me.clear_purchase_bottomsheet)
          }
        }
      }, (1 * 200));
    }
  }

  show_clear_purchase_bottomsheet(item, client_type, storefront){
    this.open_clear_purchase_bottomsheet()
    var me = this;
    setTimeout(function() {
      if(me.clear_purchase_page.current != null){
        me.clear_purchase_page.current.set_object(item, client_type, storefront)
      }
    }, (1 * 500));

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
      if(stack[i].type == this.getLocale()['1500']/* 'clear-purchase' */){
        pos = i
        break;
      }
    }
    if(pos == -1){
      var tx = {selected: 0, e5:state_obj.order_storefront['e5'], id: makeid(8), type: this.getLocale()['1500']/* 'clear-purchase' */, entered_indexing_tags:[this.getLocale()['2717']/* 'clear' */, this.getLocale()['2718']/* 'finalize' */, this.getLocale()['2719']/* 'purchase' */], items_to_clear:[]}
      tx.items_to_clear.push(state_obj)
      stack.push(tx)
    }else{
      stack[pos].items_to_clear.push(state_obj)
    }
    this.setState({stack_items: stack})
    this.set_cookies_after_stack_action(stack)
  }








  render_send_job_request_bottomsheet(){
    if(this.state.send_job_request_bottomsheet2 != true) return;
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
    if(this.state.send_job_request_bottomsheet == true){
      //closing
      this.send_job_request_bottomsheet = this.send_job_request_page.current?.state;

      this.setState({send_job_request_bottomsheet: !this.state.send_job_request_bottomsheet});
      var me = this;
      setTimeout(function() {
        me.setState({send_job_request_bottomsheet2: false});
      }, (1 * 1000));
    }else{
      //opening
      this.setState({send_job_request_bottomsheet2: true});
      var me = this;
      setTimeout(function() {
        if(me.state != null){
          me.setState({send_job_request_bottomsheet: !me.state.send_job_request_bottomsheet});

          if(me.send_job_request_bottomsheet != null){
            me.send_job_request_page.current?.setState(me.send_job_request_bottomsheet)
          }
        }
      }, (1 * 200));
    }
  }

  open_send_job_request_ui(item){
    this.open_send_job_request_bottomsheet()
    var me = this;
    setTimeout(function() {
      if(me.send_job_request_page.current != null){
        me.send_job_request_page.current.set_object(item)
      }
    }, (1 * 500));
    

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
    if(this.state.view_job_request_bottomsheet2 != true) return;
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
    if(this.state.view_job_request_bottomsheet == true){
      //closing
      this.view_job_request_bottomsheet = this.view_job_request_page.current?.state;

      this.setState({view_job_request_bottomsheet: !this.state.view_job_request_bottomsheet});
      var me = this;
      setTimeout(function() {
        me.setState({view_job_request_bottomsheet2: false});
      }, (1 * 1000));
    }else{
      //opening
      this.setState({view_job_request_bottomsheet2: true});
      var me = this;
      setTimeout(function() {
        if(me.state != null){
          me.setState({view_job_request_bottomsheet: !me.state.view_job_request_bottomsheet});

          if(me.view_job_request_bottomsheet != null){
            me.view_job_request_page.current?.setState(me.view_job_request_bottomsheet)
          }
        }
      }, (1 * 200));
    }
  }

  open_view_job_request_ui(item, object){
    this.open_view_job_request_bottomsheet()
    var me = this;
    setTimeout(function() {
      if(me.view_job_request_page.current != null){
        me.view_job_request_page.current.set_object(item, object)
      }
    }, (1 * 500));
    
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
      if(stack[i].type == this.getLocale()['1505']/* 'job-request-messages' */ && stack[i].e5 == this.state.selected_e5){
        pos = i
        break;
      }
    }
    if(pos == -1){
      var tx = {selected: 0, id: makeid(8), type:this.getLocale()['1505']/* 'job-request-messages' */, entered_indexing_tags:[this.getLocale()['1019']/* 'send' */,this.getLocale()['1309']/* 'job' */,this.getLocale()['1366']/* 'request' */], messages_to_deliver:[], e5: this.state.selected_e5}
      tx.messages_to_deliver.push(message)
      stack.push(tx)
    }else{
      stack[pos].messages_to_deliver.push(message)
    }
    this.setState({stack_items: stack})
    this.set_cookies_after_stack_action(stack)
  }











  render_view_job_request_contract_bottomsheet(){
    if(this.state.view_job_request_contract_bottomsheet2 != true) return;
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
    if(this.state.view_job_request_contract_bottomsheet == true){
      //closing
      this.view_job_request_contract_bottomsheet = this.view_job_request_page.current?.state;

      this.setState({view_job_request_contract_bottomsheet: !this.state.view_job_request_contract_bottomsheet});
      var me = this;
      setTimeout(function() {
        me.setState({view_job_request_contract_bottomsheet2: false});
      }, (1 * 1000));
    }else{
      //opening
      this.setState({view_job_request_contract_bottomsheet2: true});
      var me = this;
      setTimeout(function() {
        if(me.state != null){
          me.setState({view_job_request_contract_bottomsheet: !me.state.view_job_request_contract_bottomsheet});

          if(me.view_job_request_contract_bottomsheet != null){
            me.view_job_request_page.current?.setState(me.view_job_request_contract_bottomsheet)
          }
        }
      }, (1 * 200));
    }
  }

  show_view_job_request_contract_bottomsheet(item){
    this.open_view_job_request_contract_bottomsheet()
    var me = this;
    setTimeout(function() {
      if(me.view_job_request_contract_page.current != null){
        me.view_job_request_contract_page.current.set_object(item)
      }
    }, (1 * 500));
    
  }

  add_job_request_action_to_stack(state_obj){
    var contract = state_obj.contract_data
    if(contract['access_rights_enabled'] == true && (contract['my_interactable_time_value'] < Date.now()/1000 && !contract['moderators'].includes(this.state.user_account_id[contract['e5']]))){
      this.prompt_top_notification(this.getLocale()['2720']/* The contract owner hasnt granted you access to their contract yet.' */, 5000)
    }
    else if(contract['my_blocked_time_value'] > Date.now()/1000){
      this.prompt_top_notification(this.getLocale()['2721']/* 'Your account was blocked from entering the contract' */, 4000)
    }
    else{
      this.show_enter_contract_bottomsheet(state_obj.contract_data)
      this.open_view_job_request_contract_bottomsheet()
    }
    
  }



















  render_withdraw_ether_bottomsheet(){
    if(this.state.withdraw_ether_bottomsheet2 != true) return;
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
    if(this.state.withdraw_ether_bottomsheet == true){
      //closing
      this.withdraw_ether_bottomsheet = this.withdraw_ether_page.current?.state;

      this.setState({withdraw_ether_bottomsheet: !this.state.withdraw_ether_bottomsheet});
      var me = this;
      setTimeout(function() {
        me.setState({withdraw_ether_bottomsheet2: false});
      }, (1 * 1000));
    }else{
      //opening
      this.setState({withdraw_ether_bottomsheet2: true});
      var me = this;
      setTimeout(function() {
        if(me.state != null){
          me.setState({withdraw_ether_bottomsheet: !me.state.withdraw_ether_bottomsheet});

          if(me.withdraw_ether_bottomsheet != null){
            me.withdraw_ether_page.current?.setState(me.withdraw_ether_bottomsheet)
          }
        }
      }, (1 * 200));
    }
  }

  show_withdraw_ether_bottomsheet(item){
    this.open_withdraw_ether_bottomsheet()
    var me = this;
    setTimeout(function() {
      if(me.withdraw_ether_page.current != null){
        me.withdraw_ether_page.current.set_object(item)
      }
    }, (1 * 500)); 
    
  }

  withdraw_ether_to_address = async (target_recipient_address, e5, run_expiry_duration, _run_gas_price) =>{
    this.prompt_top_notification(this.getLocale()['2722']/* 'withdrawing your ether...' */, 1000)

    const web3 = new Web3(this.get_selected_web3_url());
    const contractArtifact = require('./contract_abis/E5.json');
    const contractAddress = this.state.addresses[e5][0]
    const contractInstance = new web3.eth.Contract(contractArtifact.abi, contractAddress); 
    const me = this
    const gasPrice = await web3.eth.getGasPrice();
    var run_gas_price = (_run_gas_price == 0 || _run_gas_price == null || _run_gas_price > 100**18) ? gasPrice : _run_gas_price
    
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
          this.prompt_top_notification(this.getLocale()['2723']/* 'withdraw complete!' */, 600)
        }) .on('error', (error) => {
          console.error('Transaction error:', error);
          this.prompt_top_notification(this.getLocale()['2724']/* 'Withdraw failed. Something went wrong' */, 4500)
        });
    })

  }

  update_withdraw_balance(e5){
    var clone = structuredClone(this.state.withdraw_balance)
    clone[e5] = 0
    this.setState({withdraw_balance: clone})
  }













  render_give_award_bottomsheet(){
    if(this.state.give_award_bottomsheet2 != true) return;
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
    if(this.state.give_award_bottomsheet == true){
      //closing
      this.give_award_bottomsheet = this.give_award_page.current?.state;

      this.setState({give_award_bottomsheet: !this.state.give_award_bottomsheet});
      var me = this;
      setTimeout(function() {
        me.setState({give_award_bottomsheet2: false});
      }, (1 * 1000));
    }else{
      //opening
      this.setState({give_award_bottomsheet2: true});
      var me = this;
      setTimeout(function() {
        if(me.state != null){
          me.setState({give_award_bottomsheet: !me.state.give_award_bottomsheet});

          if(me.give_award_bottomsheet != null){
            me.give_award_page.current?.setState(me.give_award_bottomsheet)
          }
        }
      }, (1 * 200));
    }
  }

  show_give_award_bottomsheet(item){
    this.open_give_award_bottomsheet()
    var me = this;
    setTimeout(function() {
      if(me.give_award_page.current != null){
        me.give_award_page.current?.set_post(item)
      }
    }, (1 * 500));
    
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
    if(this.state.add_comment_bottomsheet2 != true) return;
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
    if(this.state.add_comment_bottomsheet == true){
      //closing
      this.add_comment_bottomsheet = this.add_comment_page.current?.state;

      this.setState({add_comment_bottomsheet: !this.state.add_comment_bottomsheet});
      var me = this;
      setTimeout(function() {
        me.setState({add_comment_bottomsheet2: false});
      }, (1 * 1000));
    }else{
      //opening
      this.setState({add_comment_bottomsheet2: true});
      var me = this;
      setTimeout(function() {
        if(me.state != null){
          me.setState({add_comment_bottomsheet: !me.state.add_comment_bottomsheet});

          if(me.add_comment_bottomsheet != null){
            me.add_comment_page.current?.setState(me.add_comment_bottomsheet)
          }
        }
      }, (1 * 200));
    }
  }

  show_add_comment_bottomsheet(object, focused_message_id, page, contractor_object){
    this.open_add_comment_bottomsheet()
    var me = this;
    setTimeout(function() {
      if(me.add_comment_page.current != null){
        me.add_comment_page.current.set_comment_data(object, focused_message_id, page, contractor_object)
      }
    }, (1 * 500));
    
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
    if(this.state.depthmint_bottomsheet2 != true) return;
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
    if(this.state.depthmint_bottomsheet == true){
      //closing
      this.depthmint_bottomsheet = this.depthmint_page.current?.state;

      this.setState({depthmint_bottomsheet: !this.state.depthmint_bottomsheet});
      var me = this;
      setTimeout(function() {
        me.setState({depthmint_bottomsheet2: false});
      }, (1 * 1000));
    }else{
      //opening
      this.setState({depthmint_bottomsheet2: true});
      var me = this;
      setTimeout(function() {
        if(me.state != null){
          me.setState({depthmint_bottomsheet: !me.state.depthmint_bottomsheet});

          if(me.depthmint_bottomsheet != null){
            me.depthmint_page.current?.setState(me.depthmint_bottomsheet)
          }
        }
      }, (1 * 200));
    }
  }

  show_depthmint_bottomsheet(token_item){
    this.open_depthmint_bottomsheet()
    var me = this;
    setTimeout(function() {
      if(me.depthmint_page.current != null){
        me.depthmint_page.current.set_token(token_item)
      }
    }, (1 * 500));
    

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
    if(this.state.searched_account_bottomsheet2 != true) return;
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
    if(this.state.searched_account_bottomsheet == true){
      //closing
      this.searched_account_bottomsheet = this.searched_account_page.current?.state;
      
      this.setState({searched_account_bottomsheet: !this.state.searched_account_bottomsheet});
      var me = this;
      setTimeout(function() {
        me.setState({searched_account_bottomsheet2: false});
      }, (1 * 1000));
    }else{
      //opening
      this.setState({searched_account_bottomsheet2: true});
      var me = this;
      setTimeout(function() {
        if(me.state != null){
          me.setState({searched_account_bottomsheet: !me.state.searched_account_bottomsheet});

          if(me.searched_account_bottomsheet != null){
            me.searched_account_page.current?.setState(me.searched_account_bottomsheet)
          }
        }
      }, (1 * 200));
    }
  }

  when_searched_account_clicked(item, searched_id){
    this.open_searched_account_bottomsheet()

    var me = this;
    setTimeout(function() {
      if(me.searched_account_page.current != null){
        me.searched_account_page.current?.set_searched_item(item, searched_id)
      }
    }, (1 * 500));
    

  }

  perform_searched_account_balance_search = async (exchange_id, id, e5) => {
    var balance = await this.get_balance_in_exchange(exchange_id, id, e5, this.state.addresses[e5])
    var clone = structuredClone(this.state.searched_account_exchange_balances);
    clone[exchange_id+id+e5] = balance
    this.setState({searched_account_exchange_balances: clone})
  }









  render_rpc_settings_bottomsheet(){
    if(this.state.rpc_settings_bottomsheet2 != true) return;
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
    if(this.state.rpc_settings_bottomsheet == true){
      //closing
      this.rpc_settings_bottomsheet = this.rpc_settings_page.current?.state;

      this.setState({rpc_settings_bottomsheet: !this.state.rpc_settings_bottomsheet});
      var me = this;
      setTimeout(function() {
        me.setState({rpc_settings_bottomsheet2: false});
      }, (1 * 1000));
    }else{
      //opening
      this.setState({rpc_settings_bottomsheet2: true});
      var me = this;
      setTimeout(function() {
        if(me.state != null){
          me.setState({rpc_settings_bottomsheet: !me.state.rpc_settings_bottomsheet});

          if(me.rpc_settings_bottomsheet != null){
            me.rpc_settings_page.current?.setState(me.rpc_settings_bottomsheet)
          }
        }
      }, (1 * 200));
    }
  }

  show_rpc_settings_bottomsheet(ether){
    this.open_rpc_settings_bottomsheet()
    var me = this;
    setTimeout(function() {
      if(me.rpc_settings_page.current != null){
        me.rpc_settings_page.current.set_ether(ether)
      }
    }, (1 * 500));
    

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
        clone[url] = ''+time+' '+this.getLocale()['2725']/* milliseconds */
        this.setState({rpc_times: clone})
      }else{
        var clone = structuredClone(this.state.rpc_times)
        clone[url] = this.getLocale()['2726']/* 'offline' */
        this.setState({rpc_times: clone})
      }
    }

  }













  render_confirm_run_bottomsheet(){
    if(this.state.confirm_run_bottomsheet2 != true) return;
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
    if(this.state.confirm_run_bottomsheet == true){
      //closing
      this.confirm_run_bottomsheet = this.confirm_run_page.current?.state;

      this.setState({confirm_run_bottomsheet: !this.state.confirm_run_bottomsheet});
      var me = this;
      setTimeout(function() {
        me.setState({confirm_run_bottomsheet2: false});
      }, (1 * 1000));
    }else{
      //opening
      this.setState({confirm_run_bottomsheet2: true});
      var me = this;
      setTimeout(function() {
        if(me.state != null){
          me.setState({confirm_run_bottomsheet: !me.state.confirm_run_bottomsheet});

          if(me.confirm_run_bottomsheet != null){
            me.confirm_run_page.current?.setState(me.confirm_run_bottomsheet)
          }
        }
      }, (1 * 200));
    }
  }

  show_confirm_run_bottomsheet(data){
    this.open_confirm_run_bottomsheet()
    var me = this;
    setTimeout(function() {
      if(me.confirm_run_page.current != null){
        me.confirm_run_page.current.set_data(data)
      }
    }, (1 * 500));
    

  }

  start_run(){
    this.open_confirm_run_bottomsheet()
    if(this.stack_page.current != null){
      this.stack_page.current?.run_transactions(false)
    }
  }














  render_scan_code_bottomsheet(){
    if(this.state.scan_code_bottomsheet2 != true) return;
    var background_color = this.state.theme['send_receive_ether_background_color'];
    var size = this.getScreenSize();
    return(
      <SwipeableBottomSheet  overflowHeight={0} marginTop={0} onChange={this.open_scan_code_bottomsheet.bind(this)} open={this.state.scan_code_bottomsheet} style={{'z-index':'5'}} bodyStyle={{'background-color': 'transparent'}} overlayStyle={{'background-color': this.state.theme['send_receive_ether_overlay_background'],'box-shadow': '0px 0px 0px 0px '+this.state.theme['send_receive_ether_overlay_shadow']}}>
          <div style={{ height: this.state.height-90, 'background-color': background_color, 'border-style': 'solid', 'border-color': this.state.theme['send_receive_ether_overlay_background'], 'border-radius': '1px 1px 0px 0px', 'border-width': '0px', 'box-shadow': '0px 0px 2px 1px '+this.state.theme['send_receive_ether_overlay_shadow'],'margin': '0px 0px 0px 0px', 'overflow-y':'auto'}}>  
            <ScanQrPage ref={this.scan_code_page} app_state={this.state} size={size} height={this.state.height} theme={this.state.theme} notify={this.prompt_top_notification.bind(this)} finish_scan={this.finish_scan.bind(this)}/>
          </div>
      </SwipeableBottomSheet>
    )
  }

  open_scan_code_bottomsheet(){
    if(this.state.scan_code_bottomsheet == true){
      //closing
      this.scan_code_bottomsheet = this.scan_code_page.current?.state;

      this.setState({scan_code_bottomsheet: !this.state.scan_code_bottomsheet});
      var me = this;
      setTimeout(function() {
        me.setState({scan_code_bottomsheet2: false});
      }, (1 * 1000));
    }else{
      //opening
      this.setState({scan_code_bottomsheet2: true});
      var me = this;
      setTimeout(function() {
        if(me.state != null){
          me.setState({scan_code_bottomsheet: !me.state.scan_code_bottomsheet});

          if(me.scan_code_bottomsheet != null){
            me.scan_code_page.current?.setState(me.scan_code_bottomsheet)
          }
        }
      }, (1 * 200));
    }
  }

  show_scan_code_bottomsheet(option){
    this.open_scan_code_bottomsheet()
    var me = this;
    setTimeout(function() {
      if(me.scan_code_page.current != null){
        me.scan_code_page.current.set_page(option)
      }
    }, (1 * 500));
    
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
    if(this.state.view_image_bottomsheet2 != true) return;
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
      if(this.state.view_image_bottomsheet == true){
      //closing
      this.setState({view_image_bottomsheet: !this.state.view_image_bottomsheet});
      var me = this;
      setTimeout(function() {
        me.setState({view_image_bottomsheet2: false});
      }, (1 * 1000));
    }else{
      //opening
      this.setState({view_image_bottomsheet2: true});
      var me = this;
      setTimeout(function() {
        if(me.state != null){
          me.setState({view_image_bottomsheet: !me.state.view_image_bottomsheet});
        }
      }, (1 * 200));
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

    if(this.is_allowed_in_e5()){
      // this.get_browser_cache_size_limit()
      this.when_wallet_data_updated(['(32)'], 0, '', true) 
    } 
    
  }

  inc_synch_progress(){
    const steps = this.state.sync_steps;
    const incr_count = 100/steps;
    if(this.state.syncronizing_progress+incr_count >= 99 && this.state.should_keep_synchronizing_bottomsheet_open == true){
      this.prompt_top_notification(this.getLocale()['2727']/* 'syncronized.' */, 1000);
      this.setState({should_keep_synchronizing_bottomsheet_open: false})
    }
    this.setState({syncronizing_progress:this.state.syncronizing_progress+incr_count})

  }

  send_ether_to_target(recipientAddress, amount, gasPrice, state, e5){
    const web3 = new Web3(this.get_web3_url_from_e5(e5));
    const me = this;

    web3.eth.accounts.wallet.add(state.accounts[e5].privateKey);
    var gas_price = (gasPrice == null || gasPrice == 0 || gasPrice > 100**18) ? 10**9 : gasPrice

    web3.eth.sendTransaction({
      from: state.accounts[e5].address,
      to: recipientAddress,
      value: amount.toString(),
      gas: 50000,
      gasPrice: gas_price.toString() // Adjust gas price as needed
    }).on('transactionHash', function (hash) {
      me.start_get_accounts_data(false)
      me.prompt_top_notification(this.getLocale()['2728']/* 'Send complete.' */, 1600)

    })
    .on('error', function (error) {
      console.error('Failed to send transaction:', error);
      if(error == 'Error: Invalid JSON RPC response: {}'){
        me.start_get_accounts_data(false)
        me.prompt_top_notification(this.getLocale()['2728']/* 'send complete!' */, 15600)
      }else{
        me.prompt_top_notification(this.getLocale()['2729']/* 'send failed, ' */+error, 16000)
      }
    });
  }






  when_wallet_data_updated2(added_tags, set_salt, selected_item, is_synching){
    var seed = added_tags.join(' | ') + set_salt + selected_item;
    // this.generate_account_for_each_e5(seed)
    this.generate_one_account_for_all_e5s(seed)

    var me = this
    setTimeout(function() {
        me.start_get_accounts_data(is_synching)
    }, (3 * 1000));

    this.setState({has_wallet_been_set: true})
  }

  generate_one_account_for_all_e5s(seed){
    var _accounts = {}
    var e5 = this.state.e5s['data'][0]
    var web3_url = this.get_web3_url_from_e5(e5)
    var account = this.get_account_from_seed(seed, web3_url)
    for(var i=0; i<this.state.e5s['data'].length; i++){
      var focused_e5 = this.state.e5s['data'][i];
      _accounts[focused_e5] = {privateKey:account.privateKey, address: account.address}
    }
    console.log(_accounts)
    this.setState({accounts: _accounts})
  }


  when_wallet_data_updated(added_tags, set_salt, selected_item, is_synching){   
    var seed = added_tags.join(' | ') + set_salt + selected_item;
    // this.generate_account_for_each_e5(seed)
    this.generate_one_account_for_all_e5s(seed)
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

      if(accepted == true){
        for (const key in filter) {
          if(filter[key] instanceof Array){
            if(!filter[key].includes(event['returnValues'][key])){
              accepted = false
            }
          }else{
            if(event['returnValues'][key] != filter[key]){
              accepted = false
            }
          }
          
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
    await this.get_accounts_data(_account, is_syncing, web3_url, e5_address, e5)

  }






  get_wallet_data_for_specific_e5(e5){
    this.prompt_top_notification(this.getLocale()['2730']/* 'reloading your wallet...' */, 2000)
    var web3_url = this.get_web3_url_from_e5(e5)
    var account_for_e5 = this.state.accounts[e5]
    this.get_wallet_data(account_for_e5, false, web3_url, null, e5)
  }

  get_wallet_data = async (_account, is_syncing, web3_url, e5_address, e5) => {
    const web3 = new Web3(web3_url);
    const address_account = _account

    var wallet_status_clone = structuredClone(this.state.wallet_status)
    wallet_status_clone[e5] = 'synchronizing'
    this.setState({wallet_status: wallet_status_clone})


    this.load_rpc_times(e5)

    var clone = structuredClone(this.state.account_balance)
    clone[e5] = 0
    if(clone[e5] == null)this.setState({account_balance: clone});

    var balance = await web3.eth.getBalance(address_account.address)
    var clone = structuredClone(this.state.account_balance)
    clone[e5] = parseInt(balance)
    this.setState({account_balance: clone});
    if(is_syncing)this.inc_synch_progress()
   

    this.load_ether_history(e5, address_account.address)

    var gasPrice = await web3.eth.getGasPrice();
    var clone = structuredClone(this.state.gas_price)
    clone[e5] = parseInt(gasPrice)
    this.setState({gas_price: clone})
    if(is_syncing)this.inc_synch_progress()

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



    var wallet_status_clone = structuredClone(this.state.wallet_status)
    wallet_status_clone[e5] = 'done'
    this.setState({wallet_status: wallet_status_clone})

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
    this.get_storefront_data(E52contractInstance, web3, e5, contract_addresses, H52contractInstance, account)
    // if(is_syncing){
    //   this.inc_synch_progress()
    // }

    /* ---------------------------------------- BAG DATA ------------------------------------------- */
    this.get_bag_data(contractInstance, web3, e5, contract_addresses, E52contractInstance, account)
    // if(is_syncing){
    //   this.inc_synch_progress()
    // }

    /* ---------------------------------------- CONTRACTOR DATA ------------------------------------------- */
    this.get_contractor_data(E52contractInstance, contract_addresses, e5, web3, account)
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

      created_subscription_object_mapping[created_subscriptions[i]+e5] = subscription_object

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


    var enter_exit_accounts_notifications = []

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

      
      if(contract_obj['author'] == account){
        for(var e=0; e<entered_accounts.length; e++){
          enter_exit_accounts_notifications.push({'type':'contract_entry_notification', 'event':entered_accounts[e], 'e5':e5, 'timestamp':entered_accounts[e].returnValues.p7})
        }

        var exited_accounts = await this.load_event_data(web3, G52contractInstance, 'e2', e5, {p3/* action */:11/* exit_contract(11) */,p1/* contract_id */:created_contracts[i]})
        for(var e=0; e<exited_accounts.length; e++){
          enter_exit_accounts_notifications.push({'type':'contract_exit_notification', 'event':exited_accounts[e],'e5':e5, 'timestamp':exited_accounts[e].returnValues.p7})
        }
      }

      if(is_first_time){
        var created_contract_object_data_clone = structuredClone(this.state.created_contracts)
        created_contract_object_data_clone[e5] = created_contract_object_data

        var created_contract_mapping_clone = structuredClone(this.state.created_contract_mapping)
        created_contract_mapping_clone[e5] = created_contract_mapping

        var enter_exit_accounts_notifications_clone = structuredClone(this.state.enter_exit_accounts_notifications)
        enter_exit_accounts_notifications_clone[e5] = enter_exit_accounts_notifications
        

        this.setState({created_contracts: created_contract_object_data_clone, created_contract_mapping: created_contract_mapping_clone, enter_exit_accounts_notifications: enter_exit_accounts_notifications_clone})
      }
    }

    var created_contract_object_data_clone = structuredClone(this.state.created_contracts)
    created_contract_object_data_clone[e5] = created_contract_object_data

    var created_contract_mapping_clone = structuredClone(this.state.created_contract_mapping)
    created_contract_mapping_clone[e5] = created_contract_mapping

    var enter_exit_accounts_notifications_clone = structuredClone(this.state.enter_exit_accounts_notifications)
    enter_exit_accounts_notifications_clone[e5] = enter_exit_accounts_notifications


    this.setState({created_contracts: created_contract_object_data_clone, created_contract_mapping: created_contract_mapping_clone, enter_exit_accounts_notifications: enter_exit_accounts_notifications_clone})
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
    token_name_directory[e5+'0'] = this.state.e5s[e5].token
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


    //load my received token events
    var received_tokens_event_data = await this.load_event_data(web3, H52contractInstance, 'e1', e5, {p3/* receiver */: account})
    var my_token_event_notifications_data = []
    for(var i=0; i<received_tokens_event_data.length; i++){
      my_token_event_notifications_data.push({'type':'token_event_notification', 'event':received_tokens_event_data[i], 'e5':e5, 'timestamp':received_tokens_event_data[i].returnValues.p5})
    }


    var token_directory_clone = structuredClone(this.state.token_directory)
    token_directory_clone[e5] = token_symbol_directory

    var token_name_directory_clone = structuredClone(this.state.token_name_directory)
    token_name_directory_clone[e5] = token_name_directory

    var my_token_event_notifications_clone = structuredClone(this.state.my_token_event_notifications)
    my_token_event_notifications_clone[e5] = my_token_event_notifications_data

    this.setState({token_directory: token_directory_clone, token_name_directory: token_name_directory_clone, my_token_event_notifications: my_token_event_notifications_clone});
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
    var my_jobs = []
    var my_job_ids = []
    var is_first_time = this.state.created_jobs[e5] == null
    for(var i=0; i<created_job_events.length; i++){
      var id = created_job_events[i].returnValues.p2
      var hash = web3.utils.keccak256('en')
      if(created_job_events[i].returnValues.p1.toString() == hash.toString()){
        var job_data = await this.fetch_objects_data(id, web3, e5, contract_addresses);
        var job = {'id':id, 'ipfs':job_data, 'event': created_job_events[i], 'e5':e5, 'timestamp':created_job_events[i].returnValues.p6, 'author':created_job_events[i].returnValues.p5 ,'e5_id':id+e5}
        created_job.push(job)
        created_job_mappings[id] = job

        if(job['author'] == account){
          my_jobs.push(job)
          my_job_ids.push(job['id'])
        }
      }

      if(is_first_time){
        var created_jobs_clone = structuredClone(this.state.created_jobs)
        created_jobs_clone[e5] = created_job

        var created_job_mappings_clone = structuredClone(this.state.created_job_mappings)
        created_job_mappings_clone[e5] = created_job_mappings

        this.setState({created_jobs: created_jobs_clone, created_job_mappings:created_job_mappings_clone});
      }
    }

    //my job applications
    var my_created_job_respnse_data = await this.load_event_data(web3, E52contractInstance, 'e4', e5, {p2/* target_id */: account, p3/* context */:36})
    var my_applications = []
    var my_application_targets = []
    var my_application_int_data = []
    for(var i=0; i<my_created_job_respnse_data.length; i++){
      var ipfs_data = await this.fetch_objects_data_from_ipfs_using_option(my_created_job_respnse_data[i].returnValues.p4)

      if(ipfs_data['type'] == 'job_application'){
        my_applications.push({'ipfs':ipfs_data, 'event':my_created_job_respnse_data[i], 'e5':e5, 'timestamp':my_created_job_respnse_data[i].returnValues.p6})
        my_application_targets.push(my_created_job_respnse_data[i].returnValues.p1)
        my_application_int_data.push(my_created_job_respnse_data[i].returnValues.p5)
      }

      if(is_first_time){
        var my_applications_clone = structuredClone(this.state.my_applications)
        my_applications_clone[e5] = my_applications
        this.setState({my_applications:my_applications_clone})
      }
    }

    //------------ my job application responses
    var my_accepted_applications_events = await this.load_event_data(web3, E52contractInstance, 'e4', e5, {p1/* target_id */: my_application_targets, p3/* context */:37})
    var my_accepted_applications = []
    for(var i=0; i<my_accepted_applications_events.length; i++){
      if(my_application_int_data.includes(my_accepted_applications_events[i].returnValues.p5)){
        my_accepted_applications.push({'type':'my_job_application_response_notification', 'event':my_accepted_applications_events[i], 'e5':e5, 'timestamp':my_accepted_applications_events[i].returnValues.p6})

        if(is_first_time){
          var my_job_application_responses_clone = structuredClone(this.state.my_job_application_responses_notifications)
          my_job_application_responses_clone[e5] = my_accepted_applications
          this.setState({my_job_application_responses_notifications: my_job_application_responses_clone})
        }
      }
    }

    //------------ when someone responds to my job
    var my_job_responses = await this.load_event_data(web3, E52contractInstance, 'e4', e5, {p1/* target_id */: my_job_ids, p3/* context */:36})
    var notifications = []
    for(var i=0; i<my_job_responses.length; i++){
      var ipfs_data = await this.fetch_objects_data_from_ipfs_using_option(my_job_responses[i].returnValues.p4)
      if(ipfs_data['type'] == 'job_application'){
        notifications.push({'type':'job_response_notification', 'ipfs':ipfs_data, 'event':my_job_responses[i], 'e5':e5, 'timestamp':my_job_responses[i].returnValues.p6})
      }

      if(is_first_time){
        var my_received_applications_clone = structuredClone(this.state.my_job_responses_notifications)
        my_received_applications_clone[e5] = notifications
        this.setState({my_job_responses_notifications: my_received_applications_clone})
      }
    }


    var created_jobs_clone = structuredClone(this.state.created_jobs)
    created_jobs_clone[e5] = created_job

    var created_job_mappings_clone = structuredClone(this.state.created_job_mappings)
    created_job_mappings_clone[e5] = created_job_mappings

    var my_applications_clone = structuredClone(this.state.my_applications)
    my_applications_clone[e5] = my_applications

    var my_received_applications_clone = structuredClone(this.state.my_job_responses_notifications)
    my_received_applications_clone[e5] = notifications

    var my_job_application_responses_clone = structuredClone(this.state.my_job_application_responses_notifications)
    my_job_application_responses_clone[e5] = my_accepted_applications

    this.setState({created_jobs: created_jobs_clone, created_job_mappings:created_job_mappings_clone, my_applications:my_applications_clone, my_job_responses_notifications: my_received_applications_clone, my_job_application_responses_notifications: my_job_application_responses_clone})
    
    console.log(e5, 'job count: '+created_job.length)
    console.log(e5, 'job applications count: '+my_applications.length)
    

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

  get_storefront_data = async (E52contractInstance, web3, e5, contract_addresses, H52contractInstance, account) => {
    var created_store_events = await this.load_event_data(web3, E52contractInstance, 'e2', e5, {p3/* item_type */: 27/* 27(storefront-item) */})
    created_store_events = created_store_events.reverse()
    var created_stores = []
    var created_store_mappings = {}
    var my_stores = []
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

          if(obj['author'] == account){
            my_stores.push(id)
          }
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


    var my_store_direct_purchases = await this.load_event_data(web3, H52contractInstance, 'e5', e5, {p3/* awward_context */: my_stores})
    var my_store_direct_purchases_notifications = []
    for(var i=0; i<my_store_direct_purchases.length; i++){
      my_store_direct_purchases_notifications.push({'type':'direct_purchase_notification', 'event':my_store_direct_purchases[i], 'e5':e5, 'timestamp':my_store_direct_purchases[i].returnValues.p5})
    }


    var created_stores_clone = structuredClone(this.state.created_stores)
    created_stores_clone[e5] = created_stores

    var created_store_mappings_clone = structuredClone(this.state.created_store_mappings)
    created_store_mappings_clone[e5] = created_store_mappings

    var my_store_direct_purchases_notifications_clone = structuredClone(this.state.my_store_direct_purchases_notifications)
    my_store_direct_purchases_notifications_clone[e5] = my_store_direct_purchases_notifications
    
    this.setState({created_stores: created_stores_clone, created_store_mappings:created_store_mappings_clone, my_store_direct_purchases_notifications: my_store_direct_purchases_notifications_clone})
    
    console.log('store count: '+created_stores.length)
  }

  get_bag_data = async (contractInstance, web3, e5, contract_addresses, E52contractInstance, account) => {
    var created_bag_events = await this.load_event_data(web3, contractInstance, 'e1', e5, {p2/* object_type */:25/* 25(storefront_bag_object) */})
    created_bag_events = created_bag_events.reverse();
    var created_bags = []
    var my_created_bag_ids = []
    var is_first_time = this.state.created_bags[e5] == null
    for(var i=0; i<created_bag_events.length; i++){
      var id = created_bag_events[i].returnValues.p1
      var data = await this.fetch_objects_data(id, web3, e5, contract_addresses);

      if(data != null){
        var bag = {'id':id, 'ipfs':data, 'event': created_bag_events[i], 'e5':e5, 'timestamp':created_bag_events[i].returnValues.p4, 'author':created_bag_events[i].returnValues.p3, 'e5_id':id+e5}
        created_bags.push(bag)

        if(bag['author'] == account){
          my_created_bag_ids.push(id)
        }
      }
      if(is_first_time){
        var created_bags_clone = structuredClone(this.state.created_bags)
        created_bags_clone[e5] = created_bags
        this.setState({created_bags: created_bags_clone})
      }
    }


    //------------ when someone responds to my bag
    var my_bag_responses = await this.load_event_data(web3, E52contractInstance, 'e4', e5, {p1/* target_id */: my_created_bag_ids, p3/* context */:36})
    var notifications = []
    for(var i=0; i<my_bag_responses.length; i++){
      var ipfs_data = await this.fetch_objects_data_from_ipfs_using_option(my_bag_responses[i].returnValues.p4)

      if(ipfs_data['type'] == 'bag_application'){
        notifications.push({'type':'bag_response_notification', 'ipfs':ipfs_data, 'event':my_bag_responses[i], 'e5':e5, 'timestamp':my_bag_responses[i].returnValues.p6})
      }

      if(is_first_time){
        var my_received_applications_clone = structuredClone(this.state.my_bag_responses_notifications)
        my_received_applications_clone[e5] = notifications
        this.setState({my_bag_responses_notifications: my_received_applications_clone})
      }
    }



    //my bag applications
    var my_created_job_respnse_data = await this.load_event_data(web3, E52contractInstance, 'e4', e5, {p2/* target_id */: account, p3/* context */:36})
    var my_applications = []
    var my_application_targets = []
    var my_application_int_data = []
    for(var i=0; i<my_created_job_respnse_data.length; i++){
      var ipfs_data = await this.fetch_objects_data_from_ipfs_using_option(my_created_job_respnse_data[i].returnValues.p4)

      if(ipfs_data['type'] == 'bag_application'){
        my_applications.push({'ipfs':ipfs_data, 'event':my_created_job_respnse_data[i], 'e5':e5, 'timestamp':my_created_job_respnse_data[i].returnValues.p6})
        my_application_targets.push(my_created_job_respnse_data[i].returnValues.p1)
        my_application_int_data.push(my_created_job_respnse_data[i].returnValues.p5)
      }

      if(is_first_time){
        var my_applications_clone = structuredClone(this.state.my_bag_applications)
        my_applications_clone[e5] = my_applications
        this.setState({my_bag_applications: my_applications_clone})
      }
    }


    //------------ my bag application responses
    var my_accepted_applications_events = await this.load_event_data(web3, E52contractInstance, 'e4', e5, {p1/* target_id */: my_application_targets, p3/* context */:37})
    console.log('my_accepted_applications_events: ', my_accepted_applications_events)
    var my_accepted_applications = []
    for(var i=0; i<my_accepted_applications_events.length; i++){
      if(my_application_int_data.includes(my_accepted_applications_events[i].returnValues.p5)){
        my_accepted_applications.push({'type':'my_bag_application_response_notification', 'event':my_accepted_applications_events[i], 'e5':e5, 'timestamp':my_accepted_applications_events[i].returnValues.p6})

        if(is_first_time){
          var my_job_application_responses_clone = structuredClone(this.state.my_bag_application_responses_notifications)
          my_job_application_responses_clone[e5] = my_accepted_applications
          this.setState({my_bag_application_responses_notifications: my_job_application_responses_clone})
        }
      }
    }





    var created_bags_clone = structuredClone(this.state.created_bags)
    created_bags_clone[e5] = created_bags

    var my_received_applications_clone = structuredClone(this.state.my_bag_responses_notifications)
    my_received_applications_clone[e5] = notifications

    var my_applications_clone = structuredClone(this.state.my_bag_applications)
    my_applications_clone[e5] = my_applications

    var my_job_application_responses_clone = structuredClone(this.state.my_bag_application_responses_notifications)
    my_job_application_responses_clone[e5] = my_accepted_applications

    this.setState({created_bags: created_bags_clone, my_bag_responses_notifications: my_received_applications_clone, my_bag_applications: my_applications_clone, my_bag_application_responses_notifications: my_job_application_responses_clone})

    console.log(e5, ' bag count: '+created_bags.length)
  }

  get_contractor_data = async (E52contractInstance, contract_addresses, e5, web3, account) => {
    var created_contractor_events = await this.load_event_data(web3, E52contractInstance, 'e2', e5, {p3/* item_type */: 26/* 26(contractor_object) */ })
    created_contractor_events = created_contractor_events.reverse()
    var created_contractor = []
    var my_contractor_posts = []
    var is_first_time = this.state.created_contractors[e5] == null
    for(var i=0; i<created_contractor_events.length; i++){
      var id = created_contractor_events[i].returnValues.p2
      var hash = web3.utils.keccak256('en')
      if(created_contractor_events[i].returnValues.p1.toString() == hash.toString()){
        var contractor_data = await this.fetch_objects_data(id, web3, e5, contract_addresses);
        if(contractor_data != null){
          var post = {'id':id, 'ipfs':contractor_data, 'event': created_contractor_events[i], 'e5':e5, 'timestamp':created_contractor_events[i].returnValues.p6, 'author':created_contractor_events[i].returnValues.p5, 'e5_id':id+e5}
          created_contractor.push(post)

          if(post['author'] == account){
            my_contractor_posts.push(id)
          }
        }
      }

      if(is_first_time){
        var created_contractors_clone = structuredClone(this.state.created_contractors)
        created_contractors_clone[e5] = created_contractor
        this.setState({created_contractors: created_contractors_clone,})
      }
    }


    var my_contractor_job_requests = await this.load_event_data(web3, E52contractInstance, 'e4', e5, {p1/* target_id */: my_contractor_posts, p3/* context */:38})
    var my_contractor_job_request_notifications = []
    for(var i=0; i<my_contractor_job_requests.length; i++){
      my_contractor_job_request_notifications.push({'type':'contractor_request_notification', 'event':my_contractor_job_requests[i], 'e5':e5, 'timestamp':my_contractor_job_requests[i].returnValues.p6})
    }

    var created_contractors_clone = structuredClone(this.state.created_contractors)
    created_contractors_clone[e5] = created_contractor

    var my_contractor_job_request_notifications_clone = structuredClone(this.state.my_contractor_job_request_notifications)
    my_contractor_job_request_notifications_clone[e5] = my_contractor_job_request_notifications

    this.setState({created_contractors: created_contractors_clone, my_contractor_job_request_notifications: my_contractor_job_request_notifications_clone})

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



  store_data_in_infura = async (_data) => {
    var data = this.encrypt_storage_data(_data)
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
      var data = await response.text();
      data = this.decrypt_storage_data(data)
      return JSON.parse(data);
      // Do something with the retrieved data
    } catch (error) {
      console.log('Error fetching infura file: ', error)

      if(depth<5){
        return this.fetch_object_data_from_infura(cid, depth+1)
      }
    }
  }



  store_data_in_web3 = async (_data) => {
    var data = this.encrypt_storage_data(_data)
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
      var data = await response.text();
      data = this.decrypt_storage_data(data)
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




  store_data_in_nft_storage = async (_data) => {
    var data = this.encrypt_storage_data(_data)
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
      var data = await response.text();
      data = this.decrypt_storage_data(data)
      return JSON.parse(data);
      // Do something with the retrieved data
    } catch (error) {
      console.log('Error fetching nft storage file: ', error)

      if(depth<5){
        return this.fetch_objects_data_from_nft_storage(cid, depth+1)
      }
    }
  }




  encrypt_storage_data(data){
    const APP_KEY = `${process.env.REACT_APP_APPKEY_API_KEY}`
    var ciphertext = CryptoJS.AES.encrypt(data, APP_KEY).toString();
    return ciphertext
  }

  decrypt_storage_data(data){
    const APP_KEY = `${process.env.REACT_APP_APPKEY_API_KEY}`
    try{
      var bytes  = CryptoJS.AES.decrypt(data, APP_KEY);
      var originalText = bytes.toString(CryptoJS.enc.Utf8);
      return originalText
    }catch(e){
      return data
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
            ipfs_message['time'] = created_channel_data[j].returnValues.p6
            if(!messages.includes(ipfs_message))messages.push(ipfs_message)

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
      if(ipfs_message != null && this.state.created_contract_mapping[e5][ipfs_message['picked_contract_id']]){
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
      this.prompt_top_notification(this.getLocale()['2734']/* 'A matching contact was found' */, 3600)
      return
    }

    var me = this.state.user_account_id[this.state.selected_e5]
    if(account == me){
      this.prompt_top_notification(this.getLocale()['2735']/* 'You cant add yourself.' */, 3600)
      return
    }

    this.prompt_top_notification(this.getLocale()['2736']/* 'Adding account ID to Contacts...' */, 3600)
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
      this.prompt_top_notification(this.getLocale()['2731']/* 'A matching blocked account was found' */, 2600)
      return
    }
    var me = this.state.user_account_id[this.state.selected_e5]
    if(account == me){
      this.prompt_top_notification(this.getLocale()['2732']/* 'You cant block yourself!' */, 2600)
      return
    }
    this.prompt_top_notification(this.getLocale()['2733']/* 'Adding account ID to blocked list...' */, 1600)
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
    

    var me = this;
    setTimeout(function() {
      me.setState({contract_events: clone})
    }, (1 * 200));
    
  }

  get_token_event_data = async (id, e5) => {
    const web3 = new Web3(this.get_web3_url_from_e5(e5));
    const H52contractArtifact = require('./contract_abis/H52.json');
    const H52_address = this.state.addresses[e5][6];
    const H52contractInstance = new web3.eth.Contract(H52contractArtifact.abi, H52_address);

    var send_tokens_event_data = await this.load_event_data(web3, H52contractInstance, 'e1', e5, {p2/* sender */: id})

    var received_tokens_event_data = await this.load_event_data(web3, H52contractInstance, 'e1', e5, {p3/* receiver */: id})

    console.log('get_token_event_data',send_tokens_event_data)
    console.log('get_token_event_data',received_tokens_event_data)

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
    clone[id] = {'transfer':transfer_event_data, 'exchange_ratio':update_exchange_ratio_event_data.reverse(), 'proportion_ratio':update_proportion_ratio_event_data.reverse(), 'modify':modify_exchange_event_data.reverse(), 'exchange-transfer': exchange_token_event_data, 'update_balance':update_balance_event_data.reverse(), 'freeze_unfreeze':freeze_unfreeze_event_data.reverse(), 'depth_mint':depth_mint_event_data.reverse()}

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
      if(this.state.e5s[e5].active == true){
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
          console.log('searched account found!')
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

          console.log('loaded obj data: ', obj)
          data.push(obj)
        }
      }
    }

    if(!data_found){
      this.prompt_top_notification(this.getLocale()['2737']/* 'Search complete, no account data found' */, 5000)
      return;
    }
    console.log('data: ,', this.state.searched_accounts_data)
    var clone = structuredClone(this.state.searched_accounts_data)
    clone[id] = data
    this.setState({searched_accounts_data: clone})

    var me = this;
    setTimeout(function() {
      console.log('data: ,', me.state.searched_accounts_data)
    }, (1 * 1000));
    
  }




}

export default App;
