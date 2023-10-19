import React, { Component } from 'react';
import ViewGroups from './../components/view_groups'
import Tags from './../components/tags';

import Letter from './../assets/letter.png'; 
import EthereumTestnet from './../assets/ethereum_testnet.png';

var bigInt = require("big-integer");

function bgN(number, power) {
  return bigInt((number+"e"+power)).toString();
}

function number_with_commas(x) {
    if(x == null) x = '';
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
              ['or','',0], ['e','details','transactions'],[0]
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
                    <div style={{ width:'100%','padding':'0px 0px 0px 0px','margin':'0px 0px 20px 0px', 'max-width':'470px'}}>
                        <Tags page_tags_object={this.state.navigate_view_ethers_list_detail_tags_object} tag_size={'l'} when_tags_updated={this.when_navigate_view_ethers_list_detail_tags_object_updated.bind(this)} theme={this.props.theme}/>
                    </div>
                </div>
            )
        }
        
    }

    render_ether_details_section(){
        var selected_item = this.get_selected_item(this.state.navigate_view_ethers_list_detail_tags_object, this.state.navigate_view_ethers_list_detail_tags_object['i'].active)

        if(selected_item == 'details' || selected_item == 'e'){
            return(
                <div>
                    {this.render_ethers_main_details_section()}
                </div>
            )
        }else if(selected_item == 'transactions'){
            return(
                <div>
                    {this.render_block_history_logs()}
                </div>
            )
            
        }
        
    }


    render_empty_detail_object(){
        var background_color = this.props.theme['card_background_color']
        var he = this.props.height
        var size = this.props.screensize
        if(size == 'm'){
            he = this.props.height-190;
        }
        return(
            <div style={{height:he, width:'100%', 'background-color': background_color, 'border-radius': '15px','padding':'10px 0px 0px 10px', 'max-width':'420px','display': 'flex', 'align-items':'center','justify-content':'center','margin':'0px 0px 20px 0px'}}>
                    <div style={{'margin':'10px 20px 0px 0px'}}>
                        <img src={Letter} style={{height:70 ,width:'auto'}} />
                        <p style={{'display': 'flex', 'align-items':'center','justify-content':'center', 'padding':'5px 0px 0px 7px', 'color': 'gray'}}></p>
                    </div>
                    
                </div>
        );
    }

    

    render_ethers_main_details_section(){
        var background_color = this.props.theme['card_background_color']
        var he = this.props.height-60
        var item = this.get_ethers_data()[this.props.selected_ether_item];
        return(
            <div style={{ 'background-color': background_color, 'border-radius': '15px','margin':'5px 10px 5px 10px', 'padding':'0px 10px 0px 10px', 'max-width':'470px'}}>
                <div style={{ 'overflow-y': 'auto', width:'100%', height: he, padding:'0px 10px 0px 10px'}}>
                    
                    {this.render_detail_item('7', item['banner-icon'])}
                    {this.render_detail_item('1', item['tags'])}
                    <div style={{height: 20}}/>
                    <div style={{'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 0px 5px 0px','border-radius': '8px' }}>
                        {this.render_detail_item('2', item['number_label_large'])}
                    </div>
                    {this.render_detail_item('0')}

                    {this.render_detail_item('3', item['chain_id'])}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', item['peer_count'])}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', item['network_type'])}
                    {this.render_detail_item('0')}

                    {/* {this.render_detail_item('3', item['gas_used_chart_data_label'])} */}
                    {/* {this.render_detail_item('6', item['gas_used_chart_data'])} */}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', item['gas_used_chart_data_average'])}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', item['highest_gas_consumed'])}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', item['lowest_gas_consumed'])}
                    {this.render_detail_item('0')}

                    {this.render_detail_item('3', item['transaction_count_chart_data_label'])}
                    {this.render_detail_item('6', item['transaction_count_chart_data'])}
                    {this.render_detail_item('0')}

                    {this.render_detail_item('3', item['gas_limit'])}
                    <div style={{height: 10}}/>
                    {this.render_detail_item('3', item['base_fee_per_gas'])}
                    {this.render_detail_item('0')}
                    
                    {this.render_detail_item('3', {'title':'Send/Receive Ether', 'details':'Send or receive ether from a specified account.', 'size':'l'})}
                    <div style={{height:10}}/>
                    <div onClick={()=>this.open_send_receive_ether_bottomsheet()}>
                        {this.render_detail_item('5', {'text':'Send/Receive', 'action': ''})}
                    </div>
                    <div style={{height:10}}/>

                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            </div>
        )
    }


    open_send_receive_ether_bottomsheet(){
        if(!this.props.app_state.has_wallet_been_set){
            this.props.notify('You need to set your wallet first', 800)
        }else{
            var item = this.get_ethers_data()[this.props.selected_ether_item];
            this.props.open_send_receive_ether_bottomsheet(item)
        }
    }

    when_navigate_view_ethers_list_detail_tags_object_updated(tag_group){
        this.setState({navigate_view_ethers_list_detail_tags_object: tag_group})
    }

    get_ethers_data(){
        return [
            {
                'name': 'Ethereum Testnet',
                'symbol': 'ETHT',
                'e5':'E15',
                'image': EthereumTestnet,
                'label':{'title':'ETHT', 'details':'Ethereum Testnet', 'size':'l', 'image': EthereumTestnet},
                'tags':{'active_tags':['Ether', 'EVM', 'Chain'], 'index_option':'indexed'},
                'number_label':this.get_blockchain_data('s', 'E15'),
                'number_label_large': this.get_blockchain_data('l', 'E15'),
                'banner-icon':{'header':'ETHT', 'subtitle':'Ethereum Testnet', 'image':EthereumTestnet},
                'chain_id':{'title':this.props.app_state.chain_id['E15'], 'details':'Chain ID', 'size' :'l'},
                'peer_count':{'title':this.props.app_state.number_of_peers['E15'], 'details':'Number of Peers', 'size' :'l'},
                'network_type':{'title':this.props.app_state.network_type['E15'], 'details':'Network Type', 'size' :'l'},
                
                'gas_used_chart_data_label':{'title':'Gas Used', 'details':'Amount of gas used in the last 100 blocks', 'size' :'l'},
                'gas_used_chart_data':{'chart_color':'#FCFCFC', 'background_color':'#D5D5D5', 'dataPoints':this.get_gas_used_data_points('E15')},
                'gas_used_chart_data_average':{'title':number_with_commas(this.get_gas_used_data_point_average('E15')), 'details':'Average Gas Used', 'size' :'l'},
                'highest_gas_consumed':{'title':number_with_commas(this.get_highest_gas_figure('E15')), 'details':'Highest amount of Gas Consumed for Last 100 Blocks', 'size' :'l'},
                'lowest_gas_consumed':{'title':number_with_commas(this.get_lowest_gas_figure('E15')), 'details':'Lowest amount of Gas Consumed for Last 100 Blocks', 'size' :'l'},

                'transaction_count_chart_data_label':{'title':'Transactions Processed', 'details':'Amount of transactions processed in the last 100 blocks', 'size' :'l'},
                'transaction_count_chart_data':{'interval':0, 'background_color':'#D5D5D5', 'dataPoints':this.get_transaction_count_data_points('E15')},
                

                'gas_limit':{'title':number_with_commas(this.get_latest_block_data('E15').gasLimit), 'details':'Gas Limit per Block', 'size' :'l'},
                'base_fee_per_gas':{'title':number_with_commas(this.get_latest_block_data('E15').baseFeePerGas), 'details':'Base Fee per Gas Unit', 'size' :'l'},
            }
        ]
    }














    render_block_history_logs(){
        var middle = this.props.height-70;
        var size = this.props.screensize;
        if(size == 'm'){
            middle = this.props.height-190;
        }
        var items = this.props.app_state.last_blocks['E15']
        return ( 
            <div style={{overflow: 'auto',height: middle, 'margin':'0px 0px 20px 0px'}}>
                <ul style={{ 'padding': '0px 0px 0px 0px', 'list-style': 'none'}}>
                    {items.reverse().map((item, index) => (
                        <li style={{'padding': '5px'}}>
                            {this.render_block_history_log_item(item, index)}
                        </li>
                    ))}
                    <div style={{'padding': '5px'}}>
                        {this.render_empty_object()}
                    </div>
                </ul>
            </div>
        );
    }

    render_block_history_log_item(item, index){
        var item_object = this.get_block_history_log_item_object(item)
        var background_color = this.props.theme['card_background_color']
        var shadow_color = this.props.theme['card_shadow_color']
        return ( 
            <div onClick={() => console.log()} style={{height:'auto', 'background-color': 'transparent', 'border-radius': '15px','padding':'5px 5px 0px 0px', 'max-width':'420px', 'box-shadow': '0px 0px 0px 0px '+shadow_color}}>
                <div style={{'padding': '5px 5px 5px 5px'}}>
                    {this.render_detail_item('3', item_object['age'])}
                    <div style={{height: 5}}/>
                    {this.render_detail_item('3', item_object['number'])}
                    <div style={{height: 5}}/>
                    {this.render_detail_item('3', item_object['gasUsed'])}
                    <div style={{height: 5}}/>
                    {this.render_detail_item('3', item_object['miner'])}
                    <div style={{height: 5}}/>
                </div>         
            </div>
        );
    }

    get_block_history_log_item_object(item){
        return{
            'tags':{'active_tags':[this.get_time_difference(item.timestamp)+' ago'], 'indexed_option':'indexed'},
            'age':{'title':this.get_time_difference(item.timestamp),'details':'ago', 'size':'s'},
            'number':{'title':item.number,'details':' Block Number', 'size':'s'},
            'gasUsed':{'title':number_with_commas(item.gasUsed),'details':' Gas Used', 'size':'s'},
            'miner':{'details':item.miner,'title':' Transaction Miner', 'size':'s'}
        }
    }


    get_blockchain_data(size, e5){
        return{
            'style':size,
            'title':'Number of Blocks Mined',
            'subtitle':this.format_power_figure(this.props.app_state.number_of_blocks[e5]),
            'barwidth':this.get_number_width(this.props.app_state.number_of_blocks[e5]),
            'number':`${number_with_commas(this.props.app_state.number_of_blocks[e5])} blocks`,
            'barcolor':'#606060',
            'relativepower':'ledger size',
        }
    }

    get_gas_used_data_points(e5){
        var xVal = 1, yVal = 0;
        var dps = [];
        var noOfDps = this.props.app_state.last_blocks[e5].length;
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

                if(i%50 == 0 && i != 0){
                    dps.push({x: xVal,y: yVal, indexLabel: ""+number_with_commas(gas_used)});//
                }else{
                    dps.push({x: xVal,y: yVal});//
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
        var noOfDps = this.props.app_state.last_blocks[e5].length;
        for(var i = noOfDps-1; i >= 0; i--) {
            if(this.props.app_state.last_blocks[e5][i] != null){
                var transaction_count = this.props.app_state.last_blocks[e5][i].transactions.length;
                yVal = transaction_count;

                if(i%50 == 0 && i != 0){
                    dps.push({x: xVal,y: yVal, indexLabel: ""+transaction_count});//
                }else{
                    dps.push({x: xVal,y: yVal});//
                }
                
            }
            
            xVal++;
        }

        return dps;
    }   

    get_highest_gas_figure(e5){
        var highest = 0
        var noOfDps = this.props.app_state.last_blocks[e5].length;
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
        var noOfDps = this.props.app_state.last_blocks[e5].length;
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
        var noOfDps = this.props.app_state.last_blocks[e5].length-1;
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
        if(this.props.app_state.last_blocks[e5].length  ==  0){
            return []
        }
        return this.props.app_state.last_blocks[e5][0];
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
            return num+ ' sec'
        }
        else if(diff < 60*60){//less than 1 hour
            var num = Math.floor(diff/(60));
            var s = num > 1 ? 's': '';
            return num + ' min' 
        }
        else if(diff < 60*60*24){//less than 24 hours
            var num = Math.floor(diff/(60*60));
            var s = num > 1 ? 's': '';
            return num + ' hr' + s;
        }
        else if(diff < 60*60*24*7){//less than 7 days
            var num = Math.floor(diff/(60*60*24));
            var s = num > 1 ? 's': '';
            return num + ' dy' + s;
        }
        else if(diff < 60*60*24*7*53){//less than 1 year
            var num = Math.floor(diff/(60*60*24*7));
            var s = num > 1 ? 's': '';
            return num + ' wk' + s;
        }
        else {//more than a year
            var num = Math.floor(diff/(60*60*24*7*53));
            var s = num > 1 ? 's': '';
            return number_with_commas(num) + ' yr' + s;
        }
    }


    format_power_figure(amount){
        var power = 'e72'
        if(amount < bigInt('1e9')){
            power = 'e9'
        }
        else if(amount < bigInt('1e18')){
            power = 'e18'
        }
        else if(amount < bigInt('1e36')){
            power = 'e36'
        }
        else{
            power = 'e72'
        }
        return power
    }


    


}




export default EthersDetailsSection;