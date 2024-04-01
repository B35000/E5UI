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

class SuccessfulSend extends Component {
    
    state = {
        selected: 0,
        data: null,
    };

    set_data(data){
        this.setState({data: data})
    }

    render(){
        if(this.state.data == null) return;
        var data = this.state.data
        return(
            <div style={{'padding':'10px 10px 0px 10px', 'overflow-x':'hidden'}}>
                <img style={{width:'30%', 'display': 'block', 'margin-left': 'auto', 'margin-right': 'auto', 'margin-top':'4%'}} src={this.props.app_state.static_assets['done_icon']} alt="E5"/>
                <div style={{height: 25}}/>

                {this.render_detail_item('3', {'title':this.props.app_state.loc['2786']/* Transaction Broadcasted.*/,'details':this.props.app_state.loc['2787']/* Your transaction was successfuly broadcasted to the rest of the network. */, 'size':'l'})}

                <div style={{height: 10}}/>
                {this.render_detail_item('3',{'details':''+data['tx'].from, 'title':this.props.app_state.loc['2788']/* 'From Your Address' */,'size':'l'})}

                <div style={{height: 10}}/>
                {this.render_detail_item('3',{'details':''+data['tx'].to, 'title':this.props.app_state.loc['2789']/* 'Recipient Address' */,'size':'l'})}

                <div style={{height: 10}}/>
                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['2790']/* 'Amount Sent in Wei.' */, 'number':(data['tx'].value/1), 'relativepower':'wei'})}>
                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['2790']/* 'Amount Sent in Wei.' */, 'subtitle':this.format_power_figure(data['tx'].value/1), 'barwidth':this.calculate_bar_width(data['tx'].value/1), 'number':this.format_account_balance_figure(data['tx'].value/1), 'barcolor':'', 'relativepower':'wei', })}

                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['2791']/* Amount Sent in Ether.' */, 'subtitle':this.format_power_figure(parseInt(data['tx'].value)/10**18), 'barwidth':this.calculate_bar_width(parseInt(data['tx'].value)/10**18), 'number':(parseInt(data['tx'].value)/10**18), 'barcolor':'', 'relativepower':'ether', })}
                </div>

                {this.render_detail_item('0')}

                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['2792']/* 'Transaction Gas.' */, 'number':(data['tx'].gas/1), 'relativepower':'gas'})}>
                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['2792']/* 'Transaction Gas.' */, 'subtitle':this.format_power_figure(data['tx'].gas/1), 'barwidth':this.calculate_bar_width(data['tx'].gas/1), 'number':this.format_account_balance_figure(data['tx'].gas/1), 'barcolor':'', 'relativepower':'gas', })}
                </div>
                <div style={{height: 10}}/>

                {this.render_gas_or_priority_figure()}
                
                {this.render_detail_item('3',{'details':start_and_end(data['hash']), 'title':this.props.app_state.loc['2799']/* 'Transaction Hash.' */,'size':'l'})}
                

                <div style={{height: 10}}/>
                <div style={{'padding': '5px'}} onClick={()=> this.copy_to_clipboard()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['2801']/* 'Copy Transaction Hash.' */, 'action':''})}
                </div>

                {this.render_blockexplorer_link()}

                {this.render_detail_item('0')}
                {this.render_detail_item('0')}
            </div>
        )
    }

    copy_to_clipboard(){
        var data = this.state.data
        var hash = data['hash']
        navigator.clipboard.writeText(hash)
        this.props.notify(this.props.app_state.loc['1403']/* 'copied to clipboard!' */, 600)
    }

    render_blockexplorer_link(){
        var link = this.get_blockexplorer_link()
        if(link != null){
            return(
                <div>
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['2802']/* Track Your Transaction. */,'details':this.props.app_state.loc['2803']/* You can track the status of your transaction from the chain blockexplorer. */, 'size':'l'})}
                    
                    <div style={{height: 10}}/>
                    {this.render_detail_item('4', {'text':link, 'textsize':'13px', 'font':'Sans-serif'})}
                </div>
            )
        }
    }

    get_blockexplorer_link(){
        var data = this.state.data
        var hash = data['hash']
        var e5 = data['e5']

        if(e5 == 'E25' || e5 == 'E35'){
            return `https://etc.blockscout.com/tx/${hash}`
        }else if(e5 == 'E45'){
            return `https://explorer.harmony.one/tx/${hash}`
        }else if(e5 == 'E55'){
            return `https://explorer.celo.org/mainnet/tx/${hash}`
        }else if(e5 == 'E65'){
            return `https://flare-explorer.flare.network/tx/${hash}`
        }else if(e5 == 'E75'){
            return `https://gnosisscan.io/tx/${hash}`
        }else if(e5 == 'E85'){
            return `https://explorer.fuse.io/tx/${hash}`
        }else if(e5 == 'E95'){
            return `https://moonscan.io/tx/${hash}`
        }else if(e5 == 'E105'){
            return `https://moonriver.moonscan.io/tx/${hash}`
        }else if(e5 == 'E115'){
            return `https://xdc.blocksscan.io/txs/${hash}`
        }else if(e5 == 'E125'){
            return `https://polygonscan.com/tx/${hash}`
        }else if(e5 == 'E135'){
            return `https://bscscan.com/tx/${hash}`
        }else if(e5 == 'E145'){
            return null
        }else if(e5 == 'E155'){
            return `https://explorer-mainnet.thundercore.com/tx/${hash}`
        }else if(e5 == 'E165'){
            return `https://www.tomoscan.io/tx/${hash}`
        }else if(e5 == 'E175'){
            return `https://escan.live/tx/${hash}`
        }else if(e5 == 'E185'){
            return `https://etherscan.io/tx/${hash}`
        }else if(e5 == 'E195'){
            return `https://optimistic.etherscan.io/tx/${hash}`
        }else if(e5 == 'E205'){
            return `https://basescan.org/tx/${hash}`
        }else if(e5 == 'E215'){
            return `https://arbiscan.io/tx/${hash}`
        }else if(e5 == 'E225'){
            return `https://astar.subscan.io/tx/${hash}`
        }else if(e5 == 'E235'){
            return `https://cronoscan.com/tx/${hash}`
        }else if(e5 == 'E245'){
            return `https://kavascan.com/tx/${hash}`
        }else if(e5 == 'E255'){
            return `https://neon.blockscout.com/tx/${hash}`
        }else if(e5 == 'E265'){
            return `https://explorer-mainnet-cardano-evm.c1.milkomeda.com/tx/${hash}`
        }else if(e5 == 'E275'){
            return `https://ftmscan.com/tx/${hash}`
        }else if(e5 == 'E285'){
            return `https://brisescan.com/tx/${hash}`
        }else if(e5 == 'E295'){
            return `https://explorer.syscoin.org/tx/${hash}`
        }else if(e5 == 'E305'){
            return `https://snowtrace.io/tx/${hash}`
        }else if(e5 == 'E315'){
            return `https://evm.findorascan.io/tx/${hash}`
        }else if(e5 == 'E325'){
            return `https://blockscout-bellecour.iex.ec/tx/${hash}`
        }else if(e5 == 'E335'){
            return `https://explorer.oasis.io/mainnet/emerald/tx/${hash}`
        }else if(e5 == 'E345'){
            return `https://ozonescan.io/tx/${hash}`
        }else if(e5 == 'E355'){
            return `https://scan.chain.pixie.xyz/tx/${hash}/token-transfers`
        }else if(e5 == 'E365'){
            return `https://scan.rei.network/tx/${hash}`
        }else if(e5 == 'E375'){
            return `https://klaytnscope.com/tx/${hash}`
        }else if(e5 == 'E385'){
            return `https://explorer.mantle.xyz/tx/${hash}`
        }else if(e5 == 'E395'){
            return `https://pulsescan.app/#/tx/${hash}`
        }else if(e5 == 'E405'){
            return `https://canto.dex.guru/tx/${hash}`
        }else if(e5 == 'E415'){
            return `https://explorer.evm.eosnetwork.com/tx/${hash}`
        }else if(e5 == 'E425'){
            return `https://iotexscan.io/tx/${hash}`
        }else if(e5 == 'E435'){
            return `https://songbird-explorer.flare.network/tx/${hash}`
        }else if(e5 == 'E445'){
            return `https://explorer.ultron-dev.io/transactions/${hash}`
        }else if(e5 == 'E455'){
            return `https://www.coinex.net/tx/${hash}`
        }else if(e5 == 'E465'){
            return `https://thetascan.io/hash/?hash=${hash}`
        }else if(e5 == 'E475'){
            return `https://stepscan.io/tx/${hash}`
        }else if(e5 == 'E485'){
            return `https://explorer.energyweb.org/tx/${hash}`
        }else if(e5 == 'E495'){
            return null
        }else if(e5 == 'E505'){
            return `https://shiden.blockscout.com/tx/${hash}`
        }else if(e5 == 'E515'){
            return `https://tenetscan.io/tx/${hash}`
        }else if(e5 == 'E525'){
            return `https://ubiqscan.io/tx/${hash}`
        }else if(e5 == 'E535'){
            return `https://explorer.gochain.io/tx/${hash}`
        }else if(e5 == 'E545'){
            return `https://www.omaxray.com/tx/${hash}`
        }else if(e5 == 'E555'){
            return `https://explorer.wemix.com/tx/${hash}`
        }else if(e5 == 'E565'){
            return `https://confluxscan.io/transaction/${hash}`
        }else if(e5 == 'E575'){
            return `https://www.teloscan.io/tx/${hash}`
        }else if(e5 == 'E585'){
            return `https://explorer.rootstock.io/tx/${hash}`
        }else if(e5 == 'E595'){
            return `https://explorer.metadium.com/tx/${hash}`
        }else if(e5 == 'E605'){
            return `https://explorer.kardiachain.io/tx/${hash}`
        }else if(e5 == 'E615'){
            return `https://mainnet.scan.caduceus.foundation/tx/${hash}`
        }else if(e5 == 'E625'){
            return `https://seeleview.net/tx/${hash}`
        }else if(e5 == 'E635'){
            return `https://scan.bt.io/#/transaction/${hash}`
        }else if(e5 == 'E645'){
            return `https://scan.acuteangle.com/tx/${hash}`
        }else if(e5 == 'E655'){
            return `https://karura.subscan.io/extrinsic/${hash}`
        }else if(e5 == 'E665'){
            return `https://acala.subscan.io/extrinsic/${hash}`
        }else if(e5 == 'E675'){
            return null
        }else if(e5 == 'E685'){
            return `https://blockexplorer.bloxberg.org/tx/${hash}`
        }else if(e5 == 'E695'){
            return `https://phoenixplorer.com/tx/${hash}`
        }else if(e5 == 'E705'){
            return `https://explorer.omchain.io/tx/${hash}`
        }else if(e5 == 'E715'){
            return `https://evm-explorer.omplatform.com/tx/${hash}`
        }else if(e5 == 'E725'){
            return `https://www.mintme.com/explorer/tx/${hash}`
        }else if(e5 == 'E735'){
            return `https://explorer.ecredits.com/tx/${hash}`
        }else if(e5 == 'E745'){
            return `https://explorer.contentfabric.io/tx/${hash}`
        }else if(e5 == 'E755'){
            return `https://explorer.ethoprotocol.com/tx/${hash}`
        }else if(e5 == 'E765'){
            return `https://mainnet-explorer.oneledger.network/tx/${hash}`
        }
    }

    render_gas_or_priority_figure(){
        var data = this.state.data
        var e5 = data['e5']
        if(this.props.app_state.e5s[e5].type == '1559'){
            return(
                <div>
                    <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                        {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['2794']/* 'Max Priority Fee Per Gas in Wei.' */, 'subtitle':this.format_power_figure(data['tx'].maxPriorityFeePerGas/1), 'barwidth':this.calculate_bar_width(data['tx'].maxPriorityFeePerGas/1), 'number':this.format_account_balance_figure(data['tx'].maxPriorityFeePerGas/1), 'barcolor':'', 'relativepower':'wei', })}

                        {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['2797']/* 'Max Priority Fee Per Gas in Gwei.' */, 'subtitle':this.format_power_figure(parseInt(data['tx'].maxPriorityFeePerGas)/10**9), 'barwidth':this.calculate_bar_width(parseInt(data['tx'].maxPriorityFeePerGas)/10**9), 'number':(parseInt(data['tx'].maxPriorityFeePerGas)/10**9), 'barcolor':'', 'relativepower':'gwei', })}
                    </div>
                    <div style={{height: 10}}/>

                    <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                        {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['2795']/* 'Max Fee per Gas Set in Wei.' */, 'subtitle':this.format_power_figure(data['tx'].maxFeePerGas/1), 'barwidth':this.calculate_bar_width(data['tx'].maxFeePerGas/1), 'number':this.format_account_balance_figure(data['tx'].maxFeePerGas/1), 'barcolor':'', 'relativepower':'wei', })}

                        {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['2798']/* 'Max Fee per Gas Set in Gwei.' */, 'subtitle':this.format_power_figure(parseInt(data['tx'].maxFeePerGas)/10**9), 'barwidth':this.calculate_bar_width(parseInt(data['tx'].maxFeePerGas)/10**9), 'number':(parseInt(data['tx'].maxFeePerGas)/10**9), 'barcolor':'', 'relativepower':'gwei', })}
                    </div>
                    <div style={{height: 10}}/>
                </div>
            )
        }else{
            return(
                <div>
                    <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                        {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['2793']/* 'Gas Price Set in Wei.' */, 'subtitle':this.format_power_figure(data['tx'].gasPrice/1), 'barwidth':this.calculate_bar_width(data['tx'].gasPrice/1), 'number':this.format_account_balance_figure(data['tx'].gasPrice/1), 'barcolor':'', 'relativepower':'wei', })}

                        {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['2796']/* 'Gas Price Set in Gwei.' */, 'subtitle':this.format_power_figure(parseInt(data['tx'].gasPrice)/10**9), 'barwidth':this.calculate_bar_width(parseInt(data['tx'].gasPrice)/10**9), 'number':(parseInt(data['tx'].gasPrice)/10**9), 'barcolor':'', 'relativepower':'gwei', })}
                    </div>
                    <div style={{height: 10}}/>
                </div>
            )
        }
    }


    /* renders the specific element in the post or detail object */
    render_detail_item(item_id, object_data){
        var size = this.props.screensize
        var width = size == 'm' ? this.props.app_state.width/2 : this.props.app_state.width
        return(
            <div>
                <ViewGroups graph_type={this.props.app_state.graph_type} font={this.props.app_state.font} item_id={item_id} object_data={object_data}  theme={this.props.theme} width={width}/>
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

    get_number_width(number){
        var last_two_digits = number.toString().slice(0, 1)+'0';
        if(number > 10){
            last_two_digits = number.toString().slice(0, 2);
        }
        return last_two_digits+'%'
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

    format_proportion(proportion){
        return ((proportion/10**18) * 100)+'%';
    }

    /* gets a formatted time diffrence from now to a given time */
    get_time_difference(time){
        var number_date = Math.round(parseInt(time));
        var now = Math.round(new Date().getTime()/1000);

        var diff = now > number_date ? now - number_date : number_date - now
        return this.get_time_diff(diff)
    }

    get_time_from_now(time){
        var number_date = Math.round(parseInt(time));
        var now = Math.round(new Date().getTime()/1000);

        var diff = number_date - now;
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

}




export default SuccessfulSend;