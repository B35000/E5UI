import React, { Component } from 'react';
import ViewGroups from './../components/view_groups'
import Tags from './../components/tags';

var bigInt = require("big-integer");

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

class CoinsDetailsSection extends Component {
    
    state = {
        selected: 0,
        navigate_view_coins_list_detail_tags_object: this.navigate_view_coins_list_detail_tags_object(),
    };

    navigate_view_coins_list_detail_tags_object(){
        return{
          'i':{
              active:'e', 
          },
          'e':[
              ['xor','',0], ['e',this.props.app_state.loc['2232']/* 'details' */],[1]
          ],
        }
    }

    render(){
        return(
            <div>
                {this.render_coins_list_detail()}
            </div>
        )
    }



    render_coins_list_detail(){
        if(this.props.selected_coin_item == null){
            return(
                <div>
                    {this.render_empty_detail_object()}
                </div>
            )
        }else{
            return(
                <div>
                    {this.render_coins_details_section()}
                    <div style={{ width:'100%','padding':'0px 0px 0px 0px','margin':'0px 0px 0px 0px'}}>
                        <Tags font={this.props.app_state.font} page_tags_object={this.state.navigate_view_coins_list_detail_tags_object} tag_size={'l'} when_tags_updated={this.when_navigate_view_coins_list_detail_tags_object_updated.bind(this)} theme={this.props.theme}/>
                    </div>
                </div>
            )
        }
    }

    when_navigate_view_coins_list_detail_tags_object_updated(tag_obj){
        this.setState({navigate_view_coins_list_detail_tags_object: tag_obj})
    }

    get_item_in_array(object_array, id){
        var object = object_array.find(x => x['id'] === id);
        return object
    }


    render_coins_details_section(){
        var selected_item = this.get_selected_item(this.state.navigate_view_coins_list_detail_tags_object, this.state.navigate_view_coins_list_detail_tags_object['i'].active)
        var item = this.get_item_in_array(this.get_coins_data(), this.props.selected_coin_item)

        if(item == null){
            // console.log('item is null')
            return(
                <div>
                    {this.render_empty_detail_object()}
                </div>
            )
        }

        if(selected_item == this.props.app_state.loc['2232']/* 'details' */ || selected_item == 'e'){
            return(
                <div>
                    {this.render_coins_main_details_section(item)}
                </div>
            )
        }
    }

    render_empty_detail_object(){
        var background_color = this.props.theme['card_background_color']
        var he = this.props.height
        return(
            <div>
                <div style={{height:he, 'background-color': 'transparent', 'border-radius': '15px','padding':'10px 5px 5px 10px','display': 'flex', 'align-items':'center','justify-content':'center','margin':'0px 0px 10px 0px'}}>
                    <img alt="" src={this.props.app_state.static_assets['letter']} style={{height:70 ,width:'auto'}} />
                </div>
            </div>
        )
    }


    render_coins_main_details_section(item){
        var background_color = this.props.theme['card_background_color']
        var he = this.props.height-55
        var balance_decimal = this.get_balance_in_decimal(item)
        var balance_base_unit = this.get_balance_in_base_units(item)
        var existential_deposit_decimal = this.get_existential_deposit_decimal(item)
        var existential_deposit_base_unit = this.get_existential_deposit_base_unit(item)
        var tx_fee_decimal = this.get_transaction_fee_decimal(item)
        var tx_fee_base_units = this.get_transaction_fee_base_unit(item)

        var data = this.props.app_state.coin_data[item['symbol']]
        var per = '...'
        var type = '...'
        if(data != null){
            per = data['fee'] == null ? '...' : data['fee']['per']
            type = data['fee'] == null ? '...' : data['fee']['type']
        }
        return(
            <div style={{ 'background-color': background_color, 'border-radius': '15px','margin':'5px 10px 5px 10px', 'padding':'0px 10px 0px 10px'}}>
                <div style={{ 'overflow-y': 'auto', width:'100%', height: he, padding:'0px 0px 0px 10px'}}>
                    {this.render_detail_item('7', item['banner-icon'])}
                    {this.render_detail_item('1', item['tags'])}
                    <div style={{height: 20}}/>

                    {this.render_detail_item('3', {'title':item['name'], 'details':this.props.app_state.loc['2910']/* Coin Name' */, 'size':'l'})}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', {'title':item['symbol'], 'details':this.props.app_state.loc['2911']/* Coin Symbol' */, 'size':'l'})}
                    <div style={{height: 10}}/>

                    {this.render_detail_item('3', {'title':item['consensus_mechanism'], 'details':this.props.app_state.loc['2927a']/* Ledger Consensus Mechanism.' */, 'size':'l'})}
                    <div style={{height: 10}}/>

                    {this.render_detail_item('3', {'title':item['block_time'], 'details':this.props.app_state.loc['2927b']/* Block Time */, 'size':'l'})}
                    <div style={{height: 10}}/>

                    {this.render_detail_item('3', {'title':item['account_type'], 'details':this.props.app_state.loc['2915']/* Ledger Account Type.' */, 'size':'l'})}
                    <div style={{height: 10}}/>

                    {this.render_detail_item('3', {'title':item['ledger_age'], 'details':this.props.app_state.loc['2927c']/* Ledger Age. */, 'size':'l'})}
                    <div style={{height: 10}}/>

                    {this.render_detail_item('3', {'title':item['throughput']+' TPS', 'details':this.props.app_state.loc['2927d']/* Ledger Throughput. */, 'size':'l'})}
                    
                    {this.render_block_size_metric(item['block_size'])}
                    
                    {this.render_detail_item('0')}

                    {this.render_detail_item('3', {'title':item['decimals'].toString(), 'details':this.props.app_state.loc['2912']/* Coin Decimal.' */, 'size':'l'})}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', {'title':item['base_unit'], 'details':this.props.app_state.loc['2913']/* Base Unit Name.' */, 'size':'l'})}
                    <div style={{height: 10}}/>

                    {this.render_detail_item('3', {'title':'1 : '+number_with_commas(item['conversion']), 'details':this.props.app_state.loc['2914']/* Decimal Conversion Ratio.' */, 'size':'l'})}
                    <div style={{height: 10}}/>

                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>
                        <p style={{'color': this.props.theme['primary_text_color'], 'font-size': '11px', height: 7, 'margin':'0px 0px 20px 10px'}} className="fw-bold">{this.props.app_state.loc['2920']/* 'Existential Deposit Amount' */}</p>

                        {this.render_detail_item('2', { 'style':'s', 'title':'', 'subtitle':'', 'barwidth':this.calculate_bar_width(existential_deposit_decimal), 'number':(existential_deposit_decimal), 'barcolor':'#606060', 'relativepower':item['symbol'], })}
                       
                        {this.render_detail_item('2', { 'style':'s', 'title':'', 'subtitle':'', 'barwidth':this.calculate_bar_width(existential_deposit_base_unit), 'number':this.format_account_balance_figure(existential_deposit_base_unit), 'barcolor':'#606060', 'relativepower':item['base_unit']+'', })}
                    </div>
                    <div style={{height:10}}/>


                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>
                        <p style={{'color': this.props.theme['primary_text_color'], 'font-size': '11px', height: 7, 'margin':'0px 0px 20px 10px'}} className="fw-bold">{this.props.app_state.loc['2921']/* 'Transaction Fee Amount' */}</p>

                        {this.render_detail_item('2', { 'style':'s', 'title':'', 'subtitle':'', 'barwidth':this.calculate_bar_width(tx_fee_decimal), 'number':(tx_fee_decimal), 'barcolor':'#606060', 'relativepower':item['symbol']+' / '+(per == 'transaction' ? 'tx':per), })}
                       
                        {this.render_detail_item('2', { 'style':'s', 'title':'', 'subtitle':'', 'barwidth':this.calculate_bar_width(tx_fee_base_units), 'number':this.format_account_balance_figure(tx_fee_base_units), 'barcolor':'#606060', 'relativepower':item['base_unit']+' / '+(per == 'transaction' ? 'tx':per), })}

                        {this.render_default_fee_for_utxo_chains(item)}
                    </div>
                    <div style={{height: 10}}/>

                    {this.render_detail_item('3', {'details':per, 'title':this.props.app_state.loc['2922']/* Per' */, 'size':'l'})}
                    <div style={{height: 10}}/>

                    {this.render_detail_item('3', {'details':type, 'title':this.props.app_state.loc['2923']/* Fee Type' */, 'size':'l'})}
                    

                    {this.render_detail_item('0')}
                    {this.render_address(item)}

                    <div style={{height: 10}}/>
                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} 
                    onClick={() => this.props.view_number({'title':this.props.app_state.loc['2919']/* 'Your balance in ' */+item['base_unit'], 'number':balance_base_unit, 'relativepower':item['base_unit']})}>
                        {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['2919']/* 'Your balance in ' */+item['symbol'], 'subtitle':this.format_power_figure(balance_decimal), 'barwidth':this.calculate_bar_width(balance_decimal), 'number':(balance_decimal), 'barcolor':'#606060', 'relativepower':item['symbol'], })}

                        {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['2919']/* 'Your balance in ' */+item['base_unit'], 'subtitle':this.format_power_figure(balance_base_unit), 'barwidth':this.calculate_bar_width(balance_base_unit), 'number':this.format_account_balance_figure(balance_base_unit), 'barcolor':'#606060', 'relativepower':item['base_unit'], })}
                    </div>

                    {this.render_coin_blockexplorer_link(item)}

                    <div style={{height: 10}}/>
                    <div onClick={()=>this.update_coin_balance(item)}>
                        {this.render_detail_item('5', {'text':this.props.app_state.loc['2927f']/* 'Refresh Wallet.' */, 'action': ''})}
                    </div>

                    {this.render_detail_item('0')}

                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2924']/* 'Send/Receive ' */+item['symbol'], 'details':this.props.app_state.loc['2925']/* 'Send or receive the coin from a specified account.' */, 'size':'l'})}
                    <div style={{height:10}}/>
                    <div onClick={()=>this.open_send_receive_coin_page(item)}>
                        {this.render_detail_item('5', {'text':this.props.app_state.loc['2459']/* 'Send/Receive' */, 'action': ''})}
                    </div>

                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            </div>
        )
    }

    render_block_size_metric(block_size){
        if(block_size != '~~~'){
            return(
                <div>
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', {'title':block_size+' Mb.', 'details':this.props.app_state.loc['2927e']/* Block Size. */, 'size':'l'})}
                </div>
            )
        }
    }


    get_balance_in_decimal(item){
        var data = this.props.app_state.coin_data[item['symbol']]
        if(data != null){
            var balance = data['balance']
            if(balance == 0){
                return 0
            }else{
                return parseFloat(balance) / item['conversion']
            }
        }else{
            return 0
        }
    }

    get_balance_in_base_units(item){
        var data = this.props.app_state.coin_data[item['symbol']]
        if(data != null && data['balance'] != null){
            return bigInt(data['balance']).toString()
        }else{
            return 0
        }
    }

    get_existential_deposit_decimal(item){
        var data = this.props.app_state.coin_data[item['symbol']]
        if(data != null){
            var deposit = data['min_deposit']
            if(deposit == 0){
                return 0
            }else{
                return parseFloat(deposit) / item['conversion']
            }
        }else{
            return 0
        }
    }

    get_existential_deposit_base_unit(item){
        var data = this.props.app_state.coin_data[item['symbol']]
        if(data != null){
            var deposit = data['min_deposit']
            if(deposit == 0){
                return 0
            }else{
                return bigInt(deposit).toString()
            }
        }else{
            return 0
        } 
    }

    get_transaction_fee_decimal(item){
        var data = this.props.app_state.coin_data[item['symbol']]
        if(data != null){
            var amount = data['fee']['fee']
            if(amount == 0){
                return 0
            }else{
                var x = parseFloat(amount) / item['conversion']
                var y = parseFloat(parseInt(x * item['conversion'])) / item['conversion']
                return y
            }
        }else{
            return 0
        }
    }

    get_transaction_fee_base_unit(item){
        var data = this.props.app_state.coin_data[item['symbol']]
        if(data != null){
            var deposit = data['fee']['fee']
            if(deposit == 0){
                return 0
            }else{
                return parseInt(deposit).toString()
            }
        }else{
            return 0
        } 
    }

    render_default_fee_for_utxo_chains(item){
        if(item['symbol'] == 'BTC' || item['symbol'] == 'BCH' || item['symbol'] == 'LTC' || item['symbol'] == 'DOGE' || item['symbol'] == 'DASH'){
            var data = this.props.app_state.coin_data[item['symbol']]
            if(data == null || data['fee'] == null || data['fee']['fee'] == null) return;
            var fee = data['fee']['fee']
            var utxo_count = 1
            var default_fee = parseInt(fee * (this.get_utxo_tx_size(utxo_count, 1)))
            var defualt_fee_in_decimal = default_fee / item['conversion']
            return(
                <div>
                    <div style={{height: 10}}/>

                    {this.render_detail_item('2', { 'style':'s', 'title':'', 'subtitle':'', 'barwidth':this.calculate_bar_width(default_fee), 'number':this.format_account_balance_figure(default_fee), 'barcolor':'#606060', 'relativepower':item['base_unit']+' / '+'tx', })}

                    {this.render_detail_item('2', { 'style':'s', 'title':'', 'subtitle':'', 'barwidth':this.calculate_bar_width(defualt_fee_in_decimal), 'number':(defualt_fee_in_decimal), 'barcolor':'#606060', 'relativepower':item['symbol']+' / tx', })}
                </div>
            )
        }
    }

    get_utxo_tx_size(_in, out){
        if(_in == 0) return 0
        return (_in*148 + out*34 + 10 +- _in)
    }




    get_coins_data(){
        var list = [
            this.get_coin_info('BTC', 'Bitcoin', 'https://bafkreie2kzwwxljfs2vfnha5dey4m2mol7isouyozsmfervtqovv4dxwjy.ipfs.w3s.link/', 'satoshi', 8, 100_000_000, 'UTXO', 'Proof Of Work', '10 min.', this.get_time_difference(1231006505), 3, 1),

            this.get_coin_info('BCH', 'Bitcoin Cash', 'https://bafkreieqzh5ukzx7xkqbat6enbs6vvui45mzrdel72nrpvquggddnyqzge.ipfs.w3s.link/', 'satoshi', 8, 100_000_000, 'UTXO','Proof Of Work','10 min.', this.get_time_difference(1231006505), 60, 32),

            this.get_coin_info('LTC', 'Litecoin', 'https://bafkreibssgaxtckfjpfi3rwrhq24aapqukesjliidbuo2tefsfyvudccia.ipfs.w3s.link/', 'litoshi', 8, 100_000_000, 'UTXO','Proof Of Work', '2.5 min.', this.get_time_difference(1317972665), 56, 1),

            this.get_coin_info('DOGE', 'Dogecoin', 'https://bafkreigu2tax5e3kfiisfcx3yo4k54ly5za4p33n7cs4lvgdsrnqezkqey.ipfs.w3s.link/', 'koinu', 8, 100_000_000, 'UTXO','Proof Of Work', '1 min.', this.get_time_difference(1386338512), 30, 1),

            this.get_coin_info('DASH', 'Dash', 'https://bafkreicc4b6lb6pz2ql3iefz2graqvm5apk44jf3tjtwomdzi7pmsr3wiu.ipfs.w3s.link/', 'duff', 8, 100_000_000, 'UTXO','Proof Of Work', '2.5 min.', this.get_time_difference(1390083000), 56, 2),

            this.get_coin_info('TRX', 'Tron', 'https://bafkreibogf2z4apmef7soghheiudwel67br5nxnuq4hydtvcqppme6lsre.ipfs.w3s.link/', 'sun', 6, 1_000_000, this.props.app_state.loc['2916']/* Accounting' */, 'Delegated Proof Of Stake', '3 sec.', this.get_time_difference(1529885280), 2000, 1),

            this.get_coin_info('XRP', 'Xrp', 'https://bafkreidql7b6v2emvlcnyl7qkhbzjknyvhu33ifxogf34236mmwue6bo4y.ipfs.w3s.link/', 'drops', 6, 1_000_000, this.props.app_state.loc['2916']/* Accounting' */, 'Ripple Protocol Consensus Algorithm', '5 sec.', this.get_time_difference(1338672000), 1500, '~~~'),

            this.get_coin_info('XLM', 'Stellar', 'https://bafkreiaeipmjvsizk6sbucvudjg332iaumravdte3p6gdnotfjbxsriqre.ipfs.w3s.link/', 'stroop', 7, 10_000_000, this.props.app_state.loc['2916']/* Accounting' */, 'Stellar Consensus Protocol ', '5 sec.', this.get_time_difference(1406780800), 1000, '~~~'),

            this.get_coin_info('DOT', 'Polkadot', 'https://bafkreiewfdxotkspy37674wmlayzuurlgqrs3p4pbdzxqmysmsqpagtpk4.ipfs.w3s.link/', 'planck', 10, 10_000_000_000, this.props.app_state.loc['2916']/* Accounting' */, 'Nominated Proof of Stake', '6 sec.', this.get_time_difference(1590480213), 1000, '~~~'),

            this.get_coin_info('KSM', 'Kusama', 'https://bafkreifdhcp4hfl2hkkhfg6biz2rfyru5mzeyusqprgvcje4mbzr77kzpy.ipfs.w3s.link/', 'planck', 12, 1_000_000_000_000, this.props.app_state.loc['2916']/* Accounting' */, 'Nominated Proof of Stake', '6 sec.', this.get_time_difference(1566096000), 1000, '~~~'),

            this.get_coin_info('ALGO', 'Algorand', 'https://bafkreif2p2eskun4pvetbksltymzhvajojqxv3mlbuazizqgonz6pbrt7u.ipfs.w3s.link/', 'microalgorand', 6, 1_000_000, this.props.app_state.loc['2916']/* Accounting' */, 'Pure Proof of Stake', '4.5 sec.', this.get_time_difference(1560902400), 1000, 5),

            this.get_coin_info('XTZ', 'Tezos', 'https://bafkreif5oy6o25qilqizjchl6pf7tud76yag7ubrnbwxfahpduh5uynx5y.ipfs.w3s.link/', 'mutez', 6, 1_000_000, this.props.app_state.loc['2916']/* Accounting' */, 'Liquid Proof of Stake', '30 sec.', this.get_time_difference(1537161600), 40, 1),

            this.get_coin_info('ATOM', 'Cosmos', 'https://bafybeifoqwr7jwsvreehrrtoabeaqvoorti42gam26dfo2rxm7vv3tks7a.ipfs.w3s.link/cosmos.png', 'nanocoin', 9, 1_000_000, this.props.app_state.loc['2916']/* Accounting' */, 'Delegated Proof of Stake', '10 sec.', this.get_time_difference(1552521600), 1000, '~~~'),

            this.get_coin_info('FIL', 'Filecoin', 'https://bafybeidjiadnbmhhh5xrtjnhywj7dulx7d66ks2frq6kwwnykgryjd55bu.ipfs.w3s.link/filecoin.png', 'attoFIL', 18, 1_000_000_000_000_000_000, this.props.app_state.loc['2916']/* Accounting' */, 'Proof of Spacetime & Proof of Replication', '50 sec.', this.get_time_difference(1602729600), 7, '~~~'),

            this.get_coin_info('SOL', 'Solana', 'https://bafkreie4wh23gwfdj4b2otksmajb7dmfvtn376kv3jfivmwocutkq773ai.ipfs.w3s.link/', 'lamport', 9, 1_000_000_000, this.props.app_state.loc['2916']/* Accounting' */, 'Proof of Stake & Proof of History', '0.4 sec.', this.get_time_difference(1584372000),65_000, 2 ),

            this.get_coin_info('APT', 'Aptos', 'https://bafkreiafrdwgjayx3pjc42rfgzfclogm2ojd4hj522jnilw4std3rh4j5y.ipfs.w3s.link/', 'octa', 8, 100_000_000, this.props.app_state.loc['2916']/* Accounting' */, 'Proof Of Stake', '0.21 sec.', this.get_time_difference(1665532800), 160_000, '~~~'),
        ]
        return list
    }

    get_coin_info(symbol, name, image_url, base_unit, decimals, conversion, account_type, consensus_mechanism, block_time, ledger_age, throughput, block_size){
        return{
            'name':name,
            'id':symbol,
            'symbol':symbol,
            'base_unit':base_unit,
            'decimals':decimals,
            'conversion':conversion,
            'label':{'title':symbol, 'details':name, 'size':'l', 'image': image_url},
            'banner-icon':{'header':symbol, 'subtitle':name, 'image':image_url},
            'tags':{'active_tags':[name, 'Coin', symbol], 'index_option':'indexed'},
            'account_type':account_type,
            'consensus_mechanism':consensus_mechanism,
            'block_time':block_time,
            'ledger_age':ledger_age,
            'throughput':throughput,
            'block_size':block_size
        }
    }

    render_address(item){
        var data = this.props.app_state.coin_data[item['symbol']]
        var status = this.props.app_state.coin_data_status
        if(data != null && data['address'] != null && this.is_address_set(data['address'])){
            var address = data['address']
            return(
                <div onClick={() => this.copy_to_clipboard(address)}>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2917']/* Wallet Address.' */, 'details':address, 'size':'l'})}
                </div>
            )
        }
        else if(status == 'pending'){
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2917']/* Wallet Address.' */, 'details':this.props.app_state.loc['2926']/* Pending...' */, 'size':'l'})}
                </div>
            )
        }
        else{
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2917']/* Wallet Address.' */, 'details':this.props.app_state.loc['2918']/* Unset' */, 'size':'l'})}
                </div>
            )
        }
    }

    is_address_set(address){
        // return true
        var default_addresses = this.props.app_state.default_addresses
        if(default_addresses.includes(address)){
            return false
        }
        return true;
    }

    copy_to_clipboard(signature_data){
        navigator.clipboard.writeText(signature_data)
        this.props.notify(this.props.app_state.loc['2475']/* 'copied address to clipboard' */, 600)
    }

    open_send_receive_coin_page(item){
        var data = this.props.app_state.coin_data[item['symbol']]
        if(!this.props.app_state.has_wallet_been_set){
            this.props.open_wallet_guide_bottomsheet('action')
        }
        else if(data['address'] == null || !this.is_address_set(data['address'])){
            this.props.notify(this.props.app_state.loc['2927']/* Wait first, the wallet is pending.' */, 2800)
        }
        else{
            this.props.start_send_receive_coin_bottomsheet(item)
        }
    }

    update_coin_balance(item){
        var data = this.props.app_state.coin_data[item['symbol']]
        if(!this.props.app_state.has_wallet_been_set){
            this.props.notify(this.props.app_state.loc['2906']/* You need to set your wallet first.' */, 2000)
        }
        else if(data['address'] == null || !this.is_address_set(data['address'])){
            this.props.notify(this.props.app_state.loc['2927']/* Wait first, the wallet is pending.' */, 2800)
        }
        else{
            this.props.update_coin_balances(item['symbol'], false)
        }
        
    }





    render_coin_blockexplorer_link(item){
        var link = this.get_coin_blockexplorer_link(item)
        var data = this.props.app_state.coin_data[item['symbol']]
        // if(!this.props.app_state.has_wallet_been_set) return;
        if(data == null) return;
        if(data['address'] == null || !this.is_address_set(data['address'])) return;

        if(link != null){
            return(
                <div>
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2927h']/* View Wallet on Explorer */,'details':this.props.app_state.loc['2927i']/* View your wallet on its Blockexplorer. */, 'size':'l'})}
                    
                    <div style={{height: 10}}/>
                    {this.render_detail_item('4', {'text':link, 'textsize':'13px', 'font':'Sans-serif'})}
                </div>
            )
        }
    }

    get_coin_blockexplorer_link(item){
        var data = this.props.app_state.coin_data[item['symbol']]
        var hash = data['address']
        if(item['symbol'] == 'BTC'){
            return `https://www.blockchain.com/explorer/addresses/btc/${hash}`
        }
        else if(item['symbol'] == 'BCH'){
            return `https://www.blockchain.com/explorer/addresses/bch/${hash}`
        }
        else if(item['symbol'] == 'LTC'){
            return `https://litecoinspace.org/address/${hash}`
        }
        else if(item['symbol'] == 'DOGE'){
            return `https://blockexplorers.nownodes.io/dogecoin/address/${hash}`
        }
        else if(item['symbol'] == 'DASH'){
            return `https://blockchair.com/dash/address/${hash}`
        }
        else if(item['symbol'] == 'TRX'){
            return `https://tronscan.org/#/address/${hash}`
        }
        else if(item['symbol'] == 'XRP'){
            return `https://xrpscan.com/account/${hash}`
        }
        else if(item['symbol'] == 'XLM'){
            return `https://stellar.expert/explorer/public/account/${hash}`
        }
        else if(item['symbol'] == 'DOT'){
            return `https://polkadot.subscan.io/account/${hash}`
        }
        else if(item['symbol'] == 'KSM'){
            return `https://kusama.subscan.io/account/${hash}`
        }
        else if(item['symbol'] == 'ALGO'){
            return `https://allo.info/account/${hash}`
        }
        else if(item['symbol'] == 'XTZ'){
            return `https://tzkt.io/${hash}`
        }
        else if(item['symbol'] == 'ATOM'){
            return `https://www.mintscan.io/cosmos/address/${hash}`
        }
        else if(item['symbol'] == 'FIL'){
            return `https://filfox.info/en/address/${hash}`
        }
        else if(item['symbol'] == 'SOL'){
            return `https://explorer.solana.com/address/${hash}`
        }
        else if(item['symbol'] == 'APT'){
            return `https://explorer.aptoslabs.com/account/${hash}`
        }
    }








    render_empty_object(){
        var background_color = this.props.theme['card_background_color']
        return(
            <div style={{height:180, width:'100%', 'background-color': background_color, 'border-radius': '15px','padding':'10px 0px 0px 10px', 'max-width':'420px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                <div style={{'margin':'10px 20px 0px 0px'}}>
                    <img src={this.props.app_state.static_assets['letter']} style={{height:70 ,width:'auto'}} />
                    <p style={{'display': 'flex', 'align-items':'center','justify-content':'center', 'padding':'5px 0px 0px 7px', 'color': 'gray'}}></p>
                </div> 
            </div>
        );
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
                <ViewGroups graph_type={this.props.app_state.graph_type} font={this.props.app_state.font} item_id={item_id} object_data={object_data} theme={this.props.theme}  width={width}/>
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




export default CoinsDetailsSection;