import React, { Component } from 'react';
import ViewGroups from './../components/view_groups'
import Tags from './../components/tags';

import Letter from './../assets/letter.png'; 
import EthereumTestnet from './../assets/ethereum_testnet.png';

// import { ethToEvmos, evmosToEth } from '@evmos/address-converter'
import { from } from "@iotexproject/iotex-address-ts";

var bigInt = require("big-integer");
const { toBech32, fromBech32,} = require('@harmony-js/crypto');

function bgN(number, power) {
  return bigInt((number+"e"+power)).toString();
}

function number_with_commas(x) {
    if(x == null) x = '';
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function start_and_end(str) {
  if (str.length > 35) {
    return str.substr(0, 20) + '...' + str.substr(str.length-10, str.length);
  }
  return str;
}

class EthersDetailsSection extends Component {
    
    state = {
        selected: 0, 
        navigate_view_ethers_list_detail_tags_object: this.get_navigate_view_ethers_list_detail_tags(),
    };

    get_navigate_view_ethers_list_detail_tags(){
        return{
          'i':{
              active:'e', 
          },
          'e':[
              ['or','',0], ['e',this.props.app_state.loc['2232']/* 'details' */,this.props.app_state.loc['2448']/* 'transactions' */],[0]
          ],
        }
    }

    render(){
        return(
            <div>
                {this.render_ethers_list_detail()}
            </div>
        )
    }


    render_ethers_list_detail(){
        if(this.props.selected_ether_item == null){
            return(
                <div>
                    {this.render_empty_detail_object()}
                </div>
            )
        }else{
            return(
                <div>
                    {this.render_ether_details_section()}
                    <div style={{ width:'100%','padding':'0px 0px 0px 0px','margin':'0px 0px 0px 0px', 'max-width':'470px'}}>
                        <Tags page_tags_object={this.state.navigate_view_ethers_list_detail_tags_object} tag_size={'l'} when_tags_updated={this.when_navigate_view_ethers_list_detail_tags_object_updated.bind(this)} theme={this.props.theme}/>
                    </div>
                </div>
            )
        }
        
    }

    get_item_in_array(object_array, id){
        var object = object_array.find(x => x['id'] === id);
        return object
    }

    render_ether_details_section(){
        var selected_item = this.get_selected_item(this.state.navigate_view_ethers_list_detail_tags_object, this.state.navigate_view_ethers_list_detail_tags_object['i'].active)
        var item = this.get_item_in_array(this.get_ethers_data(), this.props.selected_ether_item)

        if(item == null){
            return(
                <div>
                    {this.render_empty_detail_object()}
                </div>
            )
        }

        if(selected_item == this.props.app_state.loc['2232']/* 'details' */ || selected_item == 'e'){
            return(
                <div>
                    {this.render_ethers_main_details_section(item)}
                </div>
            )
        }else if(selected_item == this.props.app_state.loc['2448']/* 'transactions' */){
            return(
                <div>
                    {this.render_block_history_logs(item)}
                </div>
            )
            
        }
        
    }


    render_empty_detail_object(){
        var background_color = this.props.theme['card_background_color']
        var he = this.props.height
        return(
            <div style={{height:this.props.height-45, width:'100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px','padding':'10px 0px 0px 10px', 'max-width':'420px','display': 'flex', 'align-items':'center','justify-content':'center','margin':'0px 0px 20px 0px'}}>
                <div style={{'margin':'10px 20px 0px 0px'}}>
                    <img src={Letter} style={{height:70 ,width:'auto'}} />
                    <p style={{'display': 'flex', 'align-items':'center','justify-content':'center', 'padding':'5px 0px 0px 7px', 'color': 'gray'}}></p>
                </div>
            </div>
        );
    }

    get_gas_price_from_runs(item){
        var last_events = this.props.app_state.all_E5_runs[item['e5']]
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

    render_ethers_main_details_section(item){
        var background_color = this.props.theme['card_background_color']
        var he = this.props.height-55
        
        var gas_price = this.props.app_state.gas_price[item['e5']]
        if(gas_price == null){
            gas_price = this.get_gas_price_from_runs(item)
        }
        var gas_transactions = this.props.app_state.account_balance[item['e5']] == 0 ? 0 : Math.floor((this.props.app_state.account_balance[item['e5']]/gas_price)/2_300_000)


        var e5_transactions_per_ether =  Math.floor((10**18/gas_price)/2_300_000)
        var gas_transactions_per_ether =  Math.floor((10**18/gas_price)/23_000)

        return(
            <div style={{ 'background-color': background_color, 'border-radius': '15px','margin':'5px 10px 5px 10px', 'padding':'0px 10px 0px 10px'}}>
                <div style={{ 'overflow-y': 'auto', width:'100%', height: he, padding:'0px 0px 0px 10px'}}>
                    
                    {this.render_detail_item('7', item['banner-icon'])}
                    {this.render_detail_item('1', item['tags'])}
                    <div style={{height: 20}}/>
                    
                    {this.render_wallet_status(item)}
                    <div style={{height:10}}/>
                    <div onClick={() => this.props.get_wallet_data_for_specific_e5(item['e5'])}>
                        {this.render_detail_item('5', {'text':this.props.app_state.loc['2449']/* reload wallet' */, 'action': ''})}
                    </div>
                    {this.render_detail_item('0')}
                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>
                        {this.render_detail_item('2', item['number_label_large'])}
                    </div>
                    {/* <div style={{height: 10}}/>
                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }}>
                        {this.render_detail_item('2', item['supply'])}
                    </div> */}
                    {/* {this.render_detail_item('0')} */}

                    {/* {this.render_detail_item('3', item['chain_id'])} */}
                    {/* <div style={{height: 10}}/>
                    {this.render_detail_item('3', item['peer_count'])} */}
                    <div style={{height: 10}}/>
                    {this.render_wallet_address(item, item['e5'])}
                    {this.render_detail_item('0')}

                    {/* {this.render_detail_item('3', item['gas_used_chart_data_label'])} */}
                    {/* {this.render_detail_item('6', item['gas_used_chart_data'])} */}
                    {/* <div style={{height: 10}}/>
                    {this.render_detail_item('3', item['gas_used_chart_data_average'])}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', item['highest_gas_consumed'])}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', item['lowest_gas_consumed'])}
                    {this.render_detail_item('0')} */}


                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                        {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['2450']/* 'Your Balance in Wei' */, 'subtitle':this.format_power_figure(this.props.app_state.account_balance[item['e5']]), 'barwidth':this.calculate_bar_width(this.props.app_state.account_balance[item['e5']]), 'number':this.format_account_balance_figure(this.props.app_state.account_balance[item['e5']]), 'barcolor':'#606060', 'relativepower':'wei', })}

                        {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['2451']/* 'Your Balance in Ether' */, 'subtitle':this.format_power_figure(this.props.app_state.account_balance[item['e5']]/10**18), 'barwidth':this.calculate_bar_width(this.props.app_state.account_balance[item['e5']]/10**18), 'number':(this.props.app_state.account_balance[item['e5']]/10**18), 'barcolor':'#606060', 'relativepower':'ether', })}

                        {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['2452']/* Transactions (2.3M Gas average)' */, 'subtitle':this.format_power_figure(gas_transactions), 'barwidth':this.calculate_bar_width(gas_transactions), 'number':this.format_account_balance_figure(gas_transactions), 'barcolor':'#606060', 'relativepower':this.props.app_state.loc['665']/* 'transactions' */, })}
                    </div>
                    <div style={{height:10}}/>

                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                        {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['2453']/* 'Gas Price in Wei' */, 'subtitle':this.format_power_figure(this.get_gas_price(item['e5'])), 'barwidth':this.calculate_bar_width(this.get_gas_price(item['e5'])), 'number':this.format_account_balance_figure(this.get_gas_price(item['e5'])), 'barcolor':'#606060', 'relativepower':'wei', })}

                        {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['2454']/* 'Gas Price in Gwei' */, 'subtitle':this.format_power_figure(this.get_gas_price(item['e5'])/10**9), 'barwidth':this.calculate_bar_width(this.get_gas_price(item['e5'])/10**9), 'number':(this.get_gas_price(item['e5'])/10**9), 'barcolor':'#606060', 'relativepower':'gwei', })}
                    </div>
                    <div style={{height:10}}/>


                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                        {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['2455']/* 'E5 txs/ether (2.3M Gas average)' */, 'subtitle':'', 'barwidth':this.calculate_bar_width(e5_transactions_per_ether), 'number':this.format_account_balance_figure(e5_transactions_per_ether), 'barcolor':'#606060', 'relativepower':this.props.app_state.loc['665']/* 'transactions' */, })}

                        {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['2456']/* 'Gas txs/ether (23K Gas average)' */, 'subtitle':'', 'barwidth':this.calculate_bar_width(gas_transactions_per_ether), 'number':this.format_account_balance_figure(gas_transactions_per_ether), 'barcolor':'#606060', 'relativepower':this.props.app_state.loc['665']/* 'transactions' */, })}
                    </div>
                    <div style={{height:10}}/>

                    {/* {this.render_detail_item('3', item['transaction_count_chart_data_label'])}
                    {this.render_detail_item('6', item['transaction_count_chart_data'])}
                    {this.render_detail_item('0')} */}

                    {this.render_detail_item('3', item['gas_limit'])}
                    <div style={{height: 10}}/>
                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                        {this.render_detail_item('2', item['base_fee_per_gas_unit_in_gwei'])}
                        {this.render_detail_item('2', item['base_fee_per_gas_unit'])}
                    </div>
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', item['block_time'])}
                    {this.render_detail_item('0')}
                    
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2457']/* 'Send/Receive Ether' */, 'details':this.props.app_state.loc['2458']/* 'Send or receive ether from a specified account.' */, 'size':'l'})}
                    <div style={{height:10}}/>
                    <div onClick={()=>this.open_send_receive_ether_bottomsheet(item)}>
                        {this.render_detail_item('5', {'text':this.props.app_state.loc['2459']/* 'Send/Receive' */, 'action': ''})}
                    </div>
                    {this.render_detail_item('0')}

                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2460']/* 'Node Settings' */, 'details':this.props.app_state.loc['2461']/* 'Change the remote procedure call (RPC) provider setting for making your transactions.' */, 'size':'l'})}
                    <div style={{height:10}}/>
                    <div onClick={()=>this.open_rpc_settings(item)}>
                        {this.render_detail_item('5', {'text':this.props.app_state.loc['2462']/* 'Open' */, 'action': ''})}
                    </div>
                    <div style={{height:10}}/>

                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            </div>
        )
    }

    render_wallet_status(item){
        if(this.get_gas_limit(item['e5']) == 0){
            if(this.props.app_state.wallet_status[item['e5']] == 'synchronizing'){
                return(
                    <div>
                        {this.render_detail_item('3', {'title':this.props.app_state.loc['2463']/* 'Wallet Status' */, 'details':this.props.app_state.loc['2464']/* Syncronizing wallet, please wait...' */, 'size' :'l'})}
                    </div>
                )
            }else{
                return(
                    <div>
                        {this.render_detail_item('3', {'title':this.props.app_state.loc['2463']/* 'Wallet Status' */, 'details':this.props.app_state.loc['2465']/* 'Wallet sync failed. Please reload the wallet.' */, 'size' :'l'})}
                    </div>
                )
            }
            
        }else{
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2466']/* 'Wallet Status' */, 'details':this.props.app_state.loc['2467']/* 'Syncronized.' */, 'size' :'l'})}
                </div>
            )
        }
    }


    open_send_receive_ether_bottomsheet(item){
        if(!this.props.app_state.has_wallet_been_set){
            // this.props.notify('You need to set your wallet first', 800)
            this.props.open_wallet_guide_bottomsheet('action')
        }else{
            // var item = this.get_ethers_data()[this.props.selected_ether_item];
            this.props.open_send_receive_ether_bottomsheet(item)
        }
    }

    open_rpc_settings(item){
        this.props.open_rpc_settings(item)
    }

    when_navigate_view_ethers_list_detail_tags_object_updated(tag_group){
        this.setState({navigate_view_ethers_list_detail_tags_object: tag_group})
    }

    get_ethers_data(){
        var list = [
            // this.get_token('ETHT', 'Ethereum Testnet', 'E15'),
            this.get_token('ETC', 'Ethereum Classic', 'E35'),
            this.get_token('ONE', 'Harmony', 'E45'),
            this.get_token('CELO', 'Celo', 'E55'),
            this.get_token('FLR', 'Flare', 'E65'),
            this.get_token('XDAI', 'Gnosis', 'E75'),
            this.get_token('FUSE', 'Fuse', 'E85'),
            this.get_token('GLMR', 'Moonbeam', 'E95'),
            this.get_token('MOVR', 'Moonriver', 'E105'),
            this.get_token('XDC', 'Xinfin Network', 'E115'),
            this.get_token('MATIC', 'Polygon', 'E125'),
            this.get_token('BNB', 'Binance S.C.', 'E135'),
            this.get_token('TT', 'ThunderCore', 'E155'),
            this.get_token('NRG', 'Energi', 'E145'),
            this.get_token('VIC', 'Viction', 'E165'),
            this.get_token('EVMOS', 'Evmos EVM', 'E175'),

            this.get_token('ETH', 'Ethereum', 'E185'),
            this.get_token('OETH', 'Optimism', 'E195'),
            this.get_token('BETH', 'Base', 'E205'),
            this.get_token('AETH', 'Arbitrum One', 'E215'),
            this.get_token('ASTR', 'Astar EVM', 'E225'),
            this.get_token('CRO', 'Cronos EVM', 'E235'),
            this.get_token('KAVA', 'Kava EVM', 'E245'),
            this.get_token('NEON', 'Neon EVM', 'E255'),
            this.get_token('mADA', 'Milkomeda', 'E265'),
            this.get_token('FTM', 'Fantom Opera', 'E275'),
            this.get_token('BRISE', 'Bitgert', 'E285'),
            this.get_token('SYS', 'Syscoin EVM', 'E295'),
            this.get_token('AVAX', 'Avalanche C-Chain', 'E305'),
            this.get_token('FRA', 'Findora', 'E315'),
            this.get_token('FDX', '5Dax', 'E325'),
            this.get_token('ROSE', 'Oasis Emerald', 'E335'),
            this.get_token('OZO', 'Ozone Chain', 'E345'),
            this.get_token('PIX', 'Pixie', 'E355'),
            this.get_token('REI', 'Rei Network', 'E365'),
            this.get_token('KLAY', 'Klaytn Mainnet', 'E375'),
            this.get_token('MNT', 'Mantle', 'E385'),
            this.get_token('PLS', 'Pulse Chain', 'E395'),
            this.get_token('CANTO', 'Canto', 'E405'),
            this.get_token('EOS', 'EOS EVM', 'E415'),
            this.get_token('IOTX', 'IoTeX', 'E425'),
            this.get_token('SGB', 'Songbird Canary', 'E435'),
            this.get_token('ULX', 'Ultron Mainnet', 'E445'),
            this.get_token('CET', 'CoinEx Smart Chain', 'E455'),
            this.get_token('TFUEL', 'Theta Mainnet', 'E465'),
            this.get_token('FITFI', 'Step Network', 'E475'),
            this.get_token('EWT', 'Energy Web Chain', 'E485'),
            this.get_token('CLO', 'Callisto', 'E495'),
            this.get_token('SDN', 'Shiden', 'E505'),
            this.get_token('TENET', 'Tenet', 'E515'),
            this.get_token('UBQ', 'Ubiq', 'E525'),
            this.get_token('GO', 'GoChain', 'E535'),
            this.get_token('OMAX', 'Omax Mainnet', 'E545'),
            this.get_token('WEMIX', 'Wemix3.0 Mainnet', 'E555'),
            this.get_token('CFX', 'Conflux eSpace', 'E565'),
            this.get_token('TLOS', 'Telos EVM', 'E575'),
            this.get_token('RSK', 'RSK Mainnet', 'E585'),
            this.get_token('META', 'Metadium', 'E595'),
            this.get_token('KAI', 'Kardiachain', 'E605'),
            this.get_token('CMP', 'Caduceus', 'E615'),
            this.get_token('SEELE', 'Seele', 'E625'),
            this.get_token('BTT', 'BitTorrent Chain', 'E635'),
            this.get_token('AAC', 'Double-A Chain', 'E645'),
            this.get_token('KAR', 'Karura EVM', 'E655'),
            this.get_token('ACA', 'Acala EVM', 'E665'),
            this.get_token('EDG', 'Edgeware EVM', 'E675'),
            this.get_token('BERG', 'Bloxberg', 'E685'),
            this.get_token('PHOENIX', 'Phoenix', 'E695'),
            this.get_token('OMC', 'Omchain', 'E705'),
            this.get_token('OM', 'Om', 'E715'),
            this.get_token('MINTME', 'MintMe.com Coin', 'E725'),
            this.get_token('ECS', 'eCredits', 'E735'),
            this.get_token('ELV', 'Eluv.io', 'E745'),
            this.get_token('ETHO', 'Etho Protocol', 'E755'),
            this.get_token('OLT', 'One Ledger', 'E765'),
        ]

        var sorted_list =  this.sortByAttributeDescending(list, 'name')
        var prioritized_list = []
        sorted_list.forEach(token => {
            if(this.does_account_have_balance(token['e5'])){
                prioritized_list.push(token)
            }
        });
        sorted_list.forEach(token => {
            if(!prioritized_list.includes(token)){
                prioritized_list.push(token)
            }
        });
        return prioritized_list;
    }

    does_account_have_balance(e5){
        if(this.props.app_state.account_balance[e5] != null && this.props.app_state.account_balance[e5]!=0){
            return true
        }
        return false
    }


    sortByAttributeDescending(array, attribute) {
      return array.sort((a, b) => {
          if (a[attribute] > b[attribute]) {
          return 1;
          }
          if (a[attribute] < b[attribute]) {
          return -1;
          }
          return 0;
      });
    }

    

    get_token(symbol, name, e5){
        return {
                'id':symbol,
                'name': name,
                'symbol': symbol,
                'e5': e5,
                'image': this.props.app_state.e5s[e5].ether_image,
                'label':{'title':symbol, 'details':name, 'size':'l', 'image': this.props.app_state.e5s[e5].ether_image},
                'tags':{'active_tags':[name, 'EVM', symbol], 'index_option':'indexed'},
                'number_label':this.get_blockchain_data('s', e5),
                'number_label_large': this.get_blockchain_data('l', e5),
                'banner-icon':{'header':symbol, 'subtitle':name, 'image':this.props.app_state.e5s[e5].ether_image},
                'chain_id':{'title':this.props.app_state.chain_id[e5], 'details':this.props.app_state.loc['2468']/* 'Chain ID' */, 'size' :'l'},
                'peer_count':{'title':''+this.props.app_state.number_of_peers[e5], 'details':'Number of Peers', 'size' :'l'},
                
                'gas_used_chart_data_label':{'title':'Gas Used', 'details':'Amount of gas used in the last 100 blocks', 'size' :'l'},
                'gas_used_chart_data':{'chart_color':'#FCFCFC', 'background_color':'#D5D5D5', 'dataPoints':this.get_gas_used_data_points(e5)},
                'gas_used_chart_data_average':{'title':number_with_commas(this.get_gas_used_data_point_average(e5)), 'details':'Average Gas Used in the last 100 blocks', 'size' :'l'},
                'highest_gas_consumed':{'title':number_with_commas(this.get_highest_gas_figure(e5)), 'details':'Highest amount of Gas Consumed for Last 100 Blocks', 'size' :'l'},
                'lowest_gas_consumed':{'title':number_with_commas(this.get_lowest_gas_figure(e5)), 'details':'Lowest amount of Gas Consumed for Last 100 Blocks', 'size' :'l'},

                'transaction_count_chart_data_label':{'title':'Transactions Processed', 'details':'Amount of transactions processed in the last 100 blocks', 'size' :'l'},
                'transaction_count_chart_data':{'interval':0, 'background_color':'#D5D5D5', 'dataPoints':this.get_transaction_count_data_points(e5)},
                

                'gas_limit':{'title':this.get_gas_limit(e5), 'details':this.props.app_state.loc['2469']/* 'Gas Limit per Block' */, 'size' :'l'},

                'base_fee_per_gas_unit':{ 'style':'l', 'title':this.props.app_state.loc['2470']/* Base Fee in wei' */, 'subtitle':this.format_power_figure(this.get_base_fee_in_wei(e5)), 'barwidth':this.calculate_bar_width(this.get_base_fee_in_wei(e5)), 'number':this.format_account_balance_figure(this.get_base_fee_in_wei(e5)), 'barcolor':'#606060', 'relativepower':'wei', },

                'base_fee_per_gas_unit_in_gwei':{ 'style':'l', 'title':this.props.app_state.loc['2471']/* 'Base Fee in gwei' */, 'subtitle':this.format_power_figure(this.get_base_fee_in_wei(e5)/10**9), 'barwidth':this.calculate_bar_width(this.get_base_fee_in_wei(e5)/10**9), 'number':(this.get_base_fee_in_wei(e5)/10**9), 'barcolor':'#606060', 'relativepower':'gwei', },

                'supply':{'style': 'l', 'title':'Ether Supply', 'subtitle': this.format_power_figure(this.get_supply_figure(e5)), 'barwidth': this.calculate_bar_width(this.get_supply_figure(e5)), 'number': this.format_account_balance_figure(this.get_supply_figure(e5)), 'barcolor': '', 'relativepower': 'ether',},

                'address':{'details':this.get_account_address(e5), 'title':this.props.app_state.loc['2472']/* 'Your Address' */, 'size' :'l'},
                'block_time':{'title':this.get_average_block_time_from_blocks(e5), 'details':this.props.app_state.loc['2473']/* 'Average block time for the last 5 blocks' */, 'size' :'l'},
        }
    }

    get_supply_figure(e5){
        var value = this.props.app_state.e5_ether_supply_data[e5]
        if(value == null || value['available_supply'] == null){
            return 0
        }
        return parseInt(value['available_supply'])
    }


    render_wallet_address(item, e5){
        if(this.props.app_state.has_wallet_been_set){
            return(
                <div>
                    <div onClick={() => this.copy_to_clipboard(this.get_account_address(e5))}>
                        {this.render_detail_item('3', item['address'])}
                    </div>
                    <div style={{height: 10}}/>
                </div>
            )
        }else{
            return(
                <div>
                    <div>
                        {this.render_detail_item('3', {'title':this.props.app_state.loc['2474']/* 'Wallet Address' */, 'details':this.format_address_if_harmony('0x0000000000000000000000000000000000000000', e5), 'size':'l'})}
                    </div>
                    <div style={{height: 10}}/>
                </div>
            )
        }
    }

    get_account_address(e5){
        if(this.props.app_state.accounts[e5] != null){
            return this.format_address_if_harmony(this.props.app_state.accounts[e5].address, e5);
        }
    }

    format_address_if_harmony(address, e5){
        if(e5 == 'E45'){
            return toBech32(address)
        }
        else if(e5 == 'E115'){
            return this.replace_0x_with_xdc(address)
        }
        // else if(e5 == 'E175'){
        //     return ethToEvmos(address)
        // }
        else if(e5 == 'E425'){
            return this.convert_to_iotx(address)
        }
        return address
    }

    replace_0x_with_xdc(address){
        return 'xdc'+address.toString().slice(2)
    }

    convert_to_iotx(address){
        const addr = from(address.toString());
        return addr.string();
    }

    copy_to_clipboard(signature_data){
        navigator.clipboard.writeText(signature_data)
        this.props.notify(this.props.app_state.loc['2475']/* 'copied address to clipboard' */, 600)
    }


    get_gas_price(e5){
        var gas_price = this.props.app_state.gas_price[e5]
        if(gas_price == null){
            gas_price = this.get_gas_price_from_runs(e5)
        }
        return gas_price
    }


    get_gas_price_from_runs(e5){
        var last_events = this.props.app_state.all_E5_runs[e5]
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

    get_average_block_time_from_blocks(e5){
        var blocks = this.props.app_state.last_blocks[e5]== null ? [] : this.props.app_state.last_blocks[e5]        
        var total_time = 0
        var is = 0
        for(var i=1; i<blocks.length; i++){
            var block = blocks[i];
            try{
                if(block != null && block.timestamp != null && blocks[i-1].timestamp != null){
                    let time = block.timestamp - blocks[i-1].timestamp
                    total_time += time
                    is++
                }
            }catch(e){
                // console.log(e)
            }
            
        }
        var av_time = total_time / is
        return av_time+this.props.app_state.loc['2476']/* ' seconds' */
    }














    render_block_history_logs(object){
        var middle = this.props.height-55;
        var size = this.props.screensize;
        if(size == 'm'){
            middle = this.props.height-190;
        }
        var tx_history = this.props.app_state.e5_ether_tx_history[object['e5']]

        // if(tx_history == null){
        //     return(
        //         <div style={{height: middle, 'margin':'10px 5px 0px 5px'}}>
        //             {this.render_detail_item('4', {'text':'Transaction history Unavailable', 'textsize':'15px', 'font':'Sans-serif'})}
        //         </div>
        //     )
        // }

        console.log('-----------------------render_block_history_logs---------------------------')
        console.log(tx_history)

        if(tx_history == null || this.get_txs_history_txs(tx_history, object['e5']) == null || this.get_txs_history_txs(tx_history, object['e5']).length == 0){
            var items = [0, 1]
            return(
                <div style={{height: middle, 'margin':'10px 5px 0px 5px'}}>
                    <div style={{overflow: 'auto', maxHeight: middle}}>
                        <ul style={{ 'padding': '0px 5px 0px 5px'}}>
                            {items.map((item, index) => (
                                <li style={{'padding': '2px'}}>
                                    <div style={{ height: 80, width: '100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '7px', 'padding': '10px 0px 10px 10px', 'max-width': '420px', 'display': 'flex', 'align-items': 'center', 'justify-content': 'center' }}>
                                        <div style={{ 'margin': '10px 20px 10px 0px' }}>
                                            <img src={Letter} style={{ height: 30, width: 'auto' }} />
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )
        }
        var items = [].concat(this.get_txs_history_txs(tx_history, object['e5']))
        var middle = this.props.height-55;
        return ( 
            <div style={{overflow: 'auto',height: middle, 'margin':'10px 5px 5px 0px'}}>
                <ul style={{ 'padding': '0px 5px 0px 5px', 'list-style': 'none'}}>
                    {items.map((item, index) => (
                        <div onClick={()=> this.when_tx_history_item_clicked(index)}>
                            {this.render_block_history_log_item(item, index, object['e5'])}
                        </div>
                    ))}
                </ul>
            </div>
        );
    }

    get_txs_history_txs(tx_history, e5){
        if(e5 == 'E25' || e5 == 'E35' || e5 == 'E115' || e5 == 'E85' || e5 == 'E185' || e5 == 'E195' || e5 == 'E205' || e5 == 'E255' || e5 == 'E285' || e5 == 'E305' || e5 == 'E395'){
            return tx_history['items']
        }
        else if(e5 == 'E45'){
            var data =  tx_history['result']['transactions']
            return data
        }
        else if(e5 == 'E55' || e5 == 'E65'|| e5 == 'E75' || e5 == 'E95' || e5 == 'E105' || e5 == 'E125' || e5 == 'E135' || e5 == 'E155' || e5 == 'E145' || e5 == 'E215' || e5 == 'E225' || e5 == 'E235' || e5 == 'E245' || e5 == 'E265' || e5 == 'E275' || e5 == 'E295' || e5 == 'E315' || e5 == 'E325' || e5 == 'E335' || e5 == 'E345' || e5 == 'E355' || e5 == 'E365' || e5 == 'E385' || e5 == 'E485' || e5 == 'E495'|| e5 == 'E505'|| e5 == 'E515' || e5 == 'E565' || e5 == 'E625' || e5 == 'E675' || e5 == 'E685' || e5 == 'E695' || e5 == 'E705' || e5 == 'E735' || e5 == 'E755'){
            return tx_history['result']
        }
        else if(e5 == 'E165'){
            return tx_history['data']
        }

    }


    when_tx_history_item_clicked(index){
        if (this.state.selected_tx_history_event_item == index) {
            this.setState({ selected_tx_history_event_item: null })
        } else {
            this.setState({ selected_tx_history_event_item: index })
        }
    }

    render_block_history_log_item(item, index, e5){
        var item_object = this.get_block_history_log_item_object(item, e5)
        // var to = this.get_from_value(item, e5)['to']
        // var e5_address = this.props.app_state.e5s[e5].e5_address
        // if(e5 == 'E35') e5_address = this.props.app_state.e5s['E25'].e5_address
        // if(to == e5_address){
        //     return;
        // }
        if(this.state.selected_tx_history_event_item == index){
            return ( 
                <div>
                    <div style={{'padding': '1px'}}>
                        {this.from_to_filter(item, e5)}
                        {this.render_gas_used_value(item_object, e5)}
                        <div style={{height: 2}}/>
                        <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }}>
                            {this.render_detail_item('2', item_object['gas_price'])}
                            {this.render_detail_item('2', item_object['gas_price_gwei'])}
                        </div>
                        <div style={{height: 2}}/>
                        <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }}>
                            {this.render_detail_item('2', item_object['value'])}
                            {this.render_detail_item('2', item_object['value_ether'])}
                        </div>
                        <div style={{height: 2}}/>
                        {this.render_detail_item('3', item_object['time'])}
                        <div style={{height: 2}}/>
                        {this.render_detail_item('3', item_object['block'])}
                        <div style={{ height: '1px', 'background-color': '#C1C1C1', 'margin': '10px 20px 10px 20px' }}/>
                    </div>         
                </div>
            );
        }else{
            return ( 
                <div>
                    <div style={{'padding': '1px'}}>
                        {this.from_to_filter(item, e5)}
                        <div style={{height: 2}}/>
                        <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }}>
                            {this.render_detail_item('2', item_object['value'])}
                            {/* {this.render_detail_item('2', item_object['value_ether'])} */}
                        </div>
                        <div style={{ height: '1px', 'background-color': '#C1C1C1', 'margin': '10px 20px 10px 20px' }}/>
                    </div>         
                </div>
            );
        }
        
    }

    get_gas_used(item_object, e5){
        if(e5 != 'E45'){
            return parseInt(item_object['gas_used'])
        }
        return 0
    }

    render_gas_used_value(item_object, e5){
        if(e5 != 'E45'){
            return(
                <div>
                    <div style={{height: 2}}/>
                    <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }}>
                        {this.render_detail_item('2', item_object['gas_used'])}
                    </div>
                </div>
            )
        }
    }

    get_from_value(item, e5){
        if(e5 == 'E25' || e5 == 'E35' || e5 == 'E85' || e5 == 'E185'|| e5 == 'E195' || e5 == 'E205' || e5 == 'E255' || e5 == 'E285' || e5 == 'E395'){
            var relative_time = this.get_time_difference(new Date(item['timestamp']).getTime()/1000)
            return {'from':item['from']['hash'], 'to':item['to']['hash'], 'gas_used':item['gas_used'], 'gas_price':item['gas_price'], 'value':item['value'], 'time':''+(new Date(item['timestamp'])), 'block':number_with_commas(item['block']), 'relative_time':''+(relative_time)}
        }
        else if(e5 == 'E45'){
            var relative_time = this.get_time_difference(item['timestamp'])
            return {'from':item['from'], 'to':item['to'], 'gas_used':item['gas'], 'gas_price':item['gasPrice'], 'value':item['value'], 'time':''+(new Date(item['timestamp']*1000)), 'block':number_with_commas(item['blockNumber']), 'relative_time':''+(relative_time)}
        }
        else if(e5 == 'E55' || e5 == 'E65' || e5 == 'E225' || e5 == 'E235' || e5 == 'E245' || e5 == 'E265'){
            var relative_time = this.get_time_difference(item['timeStamp'])
            return {'from':item['from'], 'to':item['to'], 'gas_used':item['gasUsed'], 'gas_price':item['gasPrice'], 'value':item['value'], 'time':''+(new Date(item['timeStamp']*1000)), 'block':number_with_commas(item['blockNumber']), 'relative_time':''+(relative_time)}
        }
        else if(e5 == 'E75' || e5 == 'E95' || e5 == 'E105' || e5 == 'E125' || e5 == 'E135'|| e5 == 'E155' || e5 == 'E145' || e5 == 'E215' || e5 == 'E275' || e5 == 'E295' || e5 == 'E315' || e5 == 'E325' || e5 == 'E335' || e5 == 'E345' || e5 == 'E355' || e5 == 'E365' || e5 == 'E385' || e5 == 'E485'|| e5 == 'E495'|| e5 == 'E505'|| e5 == 'E515' || e5 == 'E625' || e5 == 'E675' || e5 == 'E685' || e5 == 'E695' || e5 == 'E705'|| e5 == 'E735'|| e5 == 'E755'){
            var relative_time = this.get_time_difference(item['timeStamp'])
            return {'from':item['from'], 'to':item['to'], 'gas_used':item['gasUsed'], 'gas_price':item['gasPrice'], 'value':item['value'], 'time':''+(new Date(item['timeStamp']*1000)), 'block':number_with_commas(item['blockNumber']), 'relative_time':''+(relative_time)}
        }
        else if(e5 == 'E115' || e5 == 'E165'|| e5 == 'E565'){
            var relative_time = this.get_time_difference(item['timestamp'])
            return {'from':item['from'], 'to':item['to'], 'gas_used':item['gasUsed'], 'gas_price':item['gasPrice'], 'value':item['value'], 'time':''+(new Date(item['timestamp']*1000)), 'block':number_with_commas(item['blockNumber']), 'relative_time':''+(relative_time)}
        }
        else if(e5 == 'E305'){
            var relative_time = this.get_time_difference(new Date(item['timestamp']).getTime()/1000)
            return {'from':item['from'], 'to':item['to'], 'gas_used':item['gasUsed'], 'gas_price':item['gasPrice'], 'value':item['value'], 'time':''+(new Date(item['timestamp'])), 'block':number_with_commas(item['blockNumber']), 'relative_time':''+(relative_time)}
        }
    }

    from_to_filter(item, e5){
        var from = this.get_from_value(item, e5)['from']
        var to = this.get_from_value(item, e5)['to']
        if(this.format_address(from, e5) == 'You'){
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2419']/* 'To: ' */,'details':this.format_address(to, e5), 'size':'l'})}
                </div>
            )
        }else{
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2420']/* 'From: ' */,'details':this.format_address(from, e5), 'size':'l'})}
                </div>
            )
        }
    }

    get_block_history_log_item_object(item, e5){
        var from = this.get_from_value(item, e5)['from']
        var to = this.get_from_value(item, e5)['to']
        var gas_used = parseInt(this.get_from_value(item, e5)['gas_used'])
        var gas_price = parseInt(this.get_from_value(item, e5)['gas_price'])
        var value = parseInt(this.get_from_value(item, e5)['value'])
        var block = this.get_from_value(item, e5)['block']
        var time = this.get_from_value(item, e5)['time']
        var relative_time = this.get_from_value(item, e5)['relative_time']
        return{
            'from':{'title':this.props.app_state.loc['2420']/* 'From: ' */,'details':this.format_address(from, e5), 'size':'l'},
            'to':{'title':this.props.app_state.loc['2419']/* 'To: ' */,'details':this.format_address(to, e5), 'size':'l'},
            
            'gas_used':{'style': 'l', 'title':this.props.app_state.loc['2477']/* 'Gas Used' */, 'subtitle': this.format_power_figure(gas_used), 'barwidth': this.calculate_bar_width(gas_used), 'number': this.format_account_balance_figure(gas_used), 'barcolor': '', 'relativepower': 'gas',},
            
            'gas_price':{'style': 'l', 'title':this.props.app_state.loc['2478']/* 'Gas Price Paid in Wei' */, 'subtitle': this.format_power_figure(gas_price), 'barwidth': this.calculate_bar_width(gas_price), 'number': this.format_account_balance_figure(gas_price), 'barcolor': '', 'relativepower': 'wei',},
            
            'gas_price_gwei':{'style': 'l', 'title':this.props.app_state.loc['2479']/* 'Gas Price Paid in Gwei' */, 'subtitle': this.format_power_figure(gas_price/10**9), 'barwidth': this.calculate_bar_width(gas_price/10**9), 'number': gas_price/10**9, 'barcolor': '', 'relativepower': 'gwei',},
            
            'value':{'style': 'l', 'title':this.props.app_state.loc['2480']/* 'Value' */, 'subtitle': this.format_power_figure(value), 'barwidth': this.calculate_bar_width(value), 'number': this.format_account_balance_figure(value), 'barcolor': '', 'relativepower': 'wei',},

            'value_ether':{'style': 'l', 'title':this.props.app_state.loc['2480']/* 'Value' */, 'subtitle': this.format_power_figure(value/10**18), 'barwidth': this.calculate_bar_width(value/10**18), 'number': (value/10**18), 'barcolor': '', 'relativepower': 'ether',},

            'block':{ 'details': block, 'title': this.props.app_state.loc['1744']/* 'Block Number' */, 'size': 'l' },
            'time':{ 'details': time+', '+relative_time+' ago', 'title': 'Timestamp', 'size': 'l' },
        }
    }

    format_address(address, e5){
        var my_address = this.format_address_if_harmony(this.props.app_state.accounts[e5].address, e5)
        if(my_address.toString().toLowerCase() == address.toString().toLowerCase()){
            return 'You'
        }
        return start_and_end(address)
    }


    get_blockchain_data(size, e5){
        var number_of_blocks = this.props.app_state.number_of_blocks[e5] == null ? 0 : this.props.app_state.number_of_blocks[e5]
        return{
            'style':size,
            'title':this.props.app_state.loc['2481']/* 'Number of Blocks Mined' */,
            'subtitle':this.format_power_figure(number_of_blocks),
            'barwidth':this.get_number_width(number_of_blocks),
            'number':`${number_with_commas(number_of_blocks)}`,
            'barcolor':'#606060',
            'relativepower':'blocks',
        }
    }

    get_gas_used_data_points(e5){
        var xVal = 1, yVal = 0;
        var dps = [];
        var noOfDps = this.props.app_state.last_blocks[e5] == null ? 0 :this.props.app_state.last_blocks[e5].length;
        var highest_gas_figure = this.get_highest_gas_figure(e5);
        for(var i = noOfDps-1; i >= 0; i--) {
            if(this.props.app_state.last_blocks[e5][i] != null){
                var gas_used = this.props.app_state.last_blocks[e5][i].gasUsed;
                // var final_val = Math.floor((gas_used/highest_gas_figure)*100)
                var final_val = gas_used;
                if(final_val > (highest_gas_figure*0.8)){
                    yVal = final_val;
                }else{
                    yVal = (highest_gas_figure*0.9999999999999)
                }
                
                if(yVal != null && yVal != 0){
                    if(i%3 == 0 && i != 0){
                        dps.push({x: xVal,y: yVal, indexLabel: ""+number_with_commas(gas_used)});//
                    }else{
                        dps.push({x: xVal,y: yVal});//
                    }
                }
            }
            
            xVal++;
        }

        return dps;
    }


    render_empty_object(){
        var background_color = this.props.theme['card_background_color']
        return(
            <div style={{height:180, width:'100%', 'background-color': background_color, 'border-radius': '15px','padding':'10px 0px 0px 10px', 'max-width':'420px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                <div style={{'margin':'10px 20px 0px 0px'}}>
                    <img src={Letter} style={{height:70 ,width:'auto'}} />
                    <p style={{'display': 'flex', 'align-items':'center','justify-content':'center', 'padding':'5px 0px 0px 7px', 'color': 'gray'}}></p>
                </div> 
            </div>
        );
    }

    get_transaction_count_data_points(e5){
        var xVal = 1, yVal = 0;
        var dps = [];
        var noOfDps = this.props.app_state.last_blocks[e5] == null ? 0 : this.props.app_state.last_blocks[e5].length;
        for(var i = noOfDps-1; i >= 0; i--) {
            if(this.props.app_state.last_blocks[e5][i] != null){
                var transaction_count = this.props.app_state.last_blocks[e5][i].transactions.length;
                yVal = transaction_count;
                if(yVal != null){
                    if(i%20 == 0 && i != 0){
                        dps.push({x: xVal,y: yVal, indexLabel: ""+transaction_count});//
                    }else{
                        dps.push({x: xVal,y: yVal});//
                    }
                }
                
            }
            
            xVal++;
        }

        return dps;
    }   

    get_highest_gas_figure(e5){
        var highest = 0
        var noOfDps = this.props.app_state.last_blocks[e5] == null ? 0 : this.props.app_state.last_blocks[e5].length;
        for(var i = 0; i < noOfDps; i++) {
            if(this.props.app_state.last_blocks[e5][i] != null){
                if(highest < this.props.app_state.last_blocks[e5][i].gasUsed){
                    highest = this.props.app_state.last_blocks[e5][i].gasUsed;
                }
            }
            
        }
        return highest
    }

    get_lowest_gas_figure(e5){
        var lowest = 3000000000
        var noOfDps = this.props.app_state.last_blocks[e5] == null ? 0 : this.props.app_state.last_blocks[e5].length;
        for(var i = 0; i < noOfDps; i++) {
            if(this.props.app_state.last_blocks[e5][i] != null){
                if(this.props.app_state.last_blocks[e5][i].gasUsed < lowest && this.props.app_state.last_blocks[e5][i].gasUsed != 0){
                    lowest = this.props.app_state.last_blocks[e5][i].gasUsed;
                }
            }
            
        }
        return lowest
    }

    get_gas_used_data_point_average(e5){
        var noOfDps = this.props.app_state.last_blocks[e5] == null ? 0 : this.props.app_state.last_blocks[e5].length-1;
        var total = 0
        for(var i = 0; i < noOfDps; i++) {
            if(this.props.app_state.last_blocks[e5][i] != null){
                total += this.props.app_state.last_blocks[e5][i].gasUsed
            }
            
        }

        if(total == 0) return 0;
        return Math.floor(total / noOfDps)
    }

    get_latest_block_data(e5){
        if(this.props.app_state.last_blocks[e5] == null || this.props.app_state.last_blocks[e5].length  ==  0){
            return {}
        }
        return this.props.app_state.last_blocks[e5][0];
    }

    get_gas_limit(e5){
        try{
            return this.format_account_balance_figure(this.get_latest_block_data(e5).gasLimit)
        }catch(e){
            // console.log(e)
            return 0
        }
    }

    get_base_fee_in_wei(e5){
        try{
            return this.get_latest_block_data(e5).baseFeePerGas
        }catch(e){
            // console.log(e)
            return 0
        }
    }






    get_selected_item(object, option){
        var selected_item = object[option][2][0]
        var picked_item = object[option][1][selected_item];
        return picked_item
    }

    /* renders the specific element in the post or detail object */
    render_detail_item(item_id, object_data){
        var size = this.props.screensize
        var width = size == 'm' ? this.props.app_state.width/2 : this.props.app_state.width
        return(
            <div>
                <ViewGroups item_id={item_id} object_data={object_data} theme={this.props.theme}  width={width}/>
            </div>
        )

    }


    get_number_width(number){
        var last_two_digits = number.toString().slice(0, 1)+'0';
        if(number > 10){
            last_two_digits = number.toString().slice(0, 2);
        }
        return last_two_digits+'%'
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


    calculate_bar_width(num){
        if(num == null) return '0%'
        var last_two_digits = num.toString().slice(0, 1)+'0';
        if(num > 10){
            last_two_digits = num.toString().slice(0, 2);
        }
        return last_two_digits+'%'
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


}




export default EthersDetailsSection;