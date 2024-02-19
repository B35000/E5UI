import React, { Component } from 'react';
import ViewGroups from './../components/view_groups'
import Tags from './../components/tags';
import TextInput from './../components/text_input';
import QRCode from "react-qr-code";


var bigInt = require("big-integer");

function bgN(number, power) {
  return bigInt((number+"e"+power)).toString();
}

function number_with_commas(x) {
    if(x == null) x = '';
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

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

function start_and_end(str) {
  if (str.length > 35) {
    return str.substr(0, 20) + '...' + str.substr(str.length-10, str.length);
  }
  return str;
}

class ClearPurchasePage extends Component {
    
    state = {
        selected: 0, id: makeid(8), order_data:{'variant_id':''}, order_storefront:{ipfs:{variants:[]}}, client_type: 'order_owner', clear_purchase_title_tags_object: this.get_verify_signature_title_tags_object(), received_signature: '', signature_data:''
    };
 

    get_verify_signature_title_tags_object(){
         return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e',this.props.app_state.loc['1059']/* 'verify-signature' */], [1]
            ],
        };
    }


    get_generate_signature_title_tag_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e',this.props.app_state.loc['1060']/* 'generate-signature' */], [1]
            ],
        };
    }


    render(){
        return(
            <div style={{'padding':'10px 10px 0px 10px'}}>
                <div className="row">
                    <div className="col-9" style={{'padding': '5px 0px 0px 10px'}}>
                        <Tags font={this.props.app_state.font} page_tags_object={this.state.clear_purchase_title_tags_object} tag_size={'l'} when_tags_updated={this.when_clear_purchase_title_tags_object_updated.bind(this)} theme={this.props.theme}/>
                    </div>
                    <div className="col-3" style={{'padding': '0px 0px 0px 0px'}}>
                        {this.render_finish_button_if_storefront_owner()}
                    </div>
                </div>


                {this.render_everything()}

            </div>
        )
    }


    render_finish_button_if_storefront_owner(){
        if(this.state.client_type == 'storefront_owner'){
            return(
                <div style={{'padding': '5px'}} onClick={()=>this.finish_clearing_purchase_action()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['4']/* 'Finish' */, 'action':''})}
                </div>
            )
        }
    }

    when_clear_purchase_title_tags_object_updated(tag_obj){
        this.setState({clear_purchase_title_tags_object: tag_obj})
    }



    render_everything(){
        var selected_item = this.get_selected_item(this.state.clear_purchase_title_tags_object, this.state.clear_purchase_title_tags_object['i'].active)

        if(selected_item == this.props.app_state.loc['1060']/* 'generate-signature' */){
            return(
                <div>
                    {this.render_generate_signature_part()}
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['1059']/* 'verify-signature' */){
            return(
                <div>
                    {this.verify_signature_part()}
                </div>
            )
        }
    }

    get_selected_item(object, option){
        var selected_item = object[option][2][0]
        var picked_item = object[option][1][selected_item];
        return picked_item
    }




    generate_signature_from_signature_data = async (data) =>{
        var signature_data = await this.props.generate_signature(data)
        this.setState({signature_data: signature_data})
    }


    render_generate_signature_part(){
        var item = this.state.order_data
        var variant_description = this.get_variant_from_id(item['variant_id'])==null?'':this.get_variant_from_id(item['variant_id'])['variant_description']
        return(
            <div>
                {this.render_detail_item('3', {'size':'l', 'title':this.props.app_state.loc['1061']/* 'Generate Fulfilment Signature' */, 'details':this.props.app_state.loc['1062']/* 'Create a signature to finalize the fulfilment transaction.' */ })}
                <div style={{height:5}}/>

                {this.render_detail_item('3', {'size':'s', 'title':'Variant ID: '+item['variant_id'], 'details':variant_description})}
                <div style={{height:5}}/>

                {this.render_detail_item('3', {'size':'s', 'details':this.props.app_state.loc['1063']/* 'Quantity: ' */+this.format_account_balance_figure(item['purchase_unit_count']), 'title': this.props.app_state.loc['1064']/* 'Sender Account ID: ' */+item['sender_account']})}
                
                {this.render_detail_item('0')}


                <QRCode
                    size={200}
                    style={{ height: "auto", width: "70%" ,'margin':'0% 0% 0% 15%'}}
                    value={this.state.signature_data}
                    viewBox={`0 0 100 100`}
                />
                <div style={{height:5}}/>
                <p style={{'margin':'5% 0% 0% 44%', 'color':this.props.theme['primary_text_color']}}>Qr Code</p>
                <div style={{height:5}}/>
                {this.render_detail_item('3', {'size':'s', 'title':this.props.app_state.loc['1065']/* 'Signature' */, 'details':start_and_end(this.state.signature_data) })}
                
                <div style={{'padding': '5px'}} onClick={()=>this.copy_to_clipboard(this.state.signature_data)}>
                    {this.render_detail_item('5',{'text':this.props.app_state.loc['1066']/* 'Copy to Clipboard' */, 'action':''})}
                </div>
                <div style={{height:10}}/>
            </div>
        )
    }

    copy_to_clipboard(signature_data){
        navigator.clipboard.writeText(signature_data)
        this.props.notify(this.props.app_state.loc['1067']/* 'copied signature to clipboard!' */, 600)
    }

    get_variant_from_id(variant_id){
        var object = this.state.order_storefront

        for(var i=0; i<object['ipfs'].variants.length; i++){
            if(object['ipfs'].variants[i]['variant_id'] == variant_id){
                return object['ipfs'].variants[i]
            }
        }
    }



    



    verify_signature_part(){
        var item = this.state.order_data
        var variant_description = this.get_variant_from_id(item['variant_id'])==null?'':this.get_variant_from_id(item['variant_id'])['variant_description']
        return(
            <div>
                {this.render_detail_item('3', {'size':'s', 'title':this.props.app_state.loc['1068']/* 'Receive Fulfilment Signature' */, 'details':this.props.app_state.loc['1069']/* 'receive a fulfilment signature to verify the items delivery' */ })}
                <div style={{height:5}}/>

                {this.render_detail_item('3', {'size':'s', 'title':this.props.app_state.loc['1070']/* 'Variant ID: ' */+item['variant_id'], 'details':variant_description})}
                <div style={{height:5}}/>

                {this.render_detail_item('3', {'size':'s', 'details':this.props.app_state.loc['1071']/* 'Quantity: ' */+this.format_account_balance_figure(item['purchase_unit_count']), 'title': this.props.app_state.loc['1072']/* 'Sender Account ID: ' */+item['sender_account']})}
                <div style={{height:5}}/>
                
                {this.render_detail_item('0')}
                {/* {this.render_qr_code_scanner()}
                {this.render_detail_item('0')} */}

                {this.render_detail_item('3', {'size':'s', 'title':this.props.app_state.loc['1073']/* 'Paste Signature' */, 'details':this.props.app_state.loc['1074']/* 'Alternatively, you can paste the signature in the input field below' */ })}
                <div style={{height:5}}/>

                <TextInput font={this.props.app_state.font} height={70} placeholder={this.props.app_state.loc['1073']/* 'Paste Signature' */} when_text_input_field_changed={this.when_received_signature_changed.bind(this)} text={this.state.received_signature} theme={this.props.theme}/>
                <div style={{height: 10}} theme={this.props.theme}/>

                {this.render_detail_item('4', {'text':start_and_end(this.state.received_signature), 'textsize':'13px', 'font':this.props.app_state.font})}
            </div>
        )
    }

    

    when_received_signature_changed(text){
        this.setState({received_signature: text})
    }

    render_qr_code_scanner(){
        return(
            <div>
                {this.render_detail_item('3', {'size':'s', 'title':this.props.app_state.loc['1075']/* 'Open Scanner' */, 'details':this.props.app_state.loc['1076']/* 'Scan for the signature using a built in scanner' */})}
                <div style={{height:10}}/>
                <div style={{'padding': '5px'}} onClick={()=>this.start_scan()}>
                    {this.render_detail_item('5',{'text':this.props.app_state.loc['1075']/* 'Scan' */, 'action':''})}
                </div>
            </div>
        )
    }

    start_scan(){
        this.props.start_scan('clear_purchase_page')
    }

    set_scan_data(data){
        this.setState({received_signature:data})
    }



    set_object(item, client_type, order_storefront){
        if(item['variant_id'] != this.state.order_data['variant_id']){
            this.setState({
                selected: 0, id: makeid(8), order_data:{'variant_id':''}, order_storefront:{variants:[]}, client_type: 'order_owner', clear_purchase_title_tags_object: this.get_verify_signature_title_tags_object(), received_signature: '',
            })
        }
        this.setState({order_data: item, client_type: client_type, order_storefront: order_storefront, e5: order_storefront['e5']})

        if(client_type == 'storefront_owner'){
            this.setState({clear_purchase_title_tags_object: this.get_verify_signature_title_tags_object()})
        }else{
            this.setState({clear_purchase_title_tags_object: this.get_generate_signature_title_tag_object()})
            this.generate_signature_from_signature_data(item['signature_data'])
        }
    }



    finish_clearing_purchase_action = async () => {
        var scanned_signature = this.state.received_signature.trim()
        var item = this.state.order_data
        var client_address = item['sender_address']
        var signature_data = item['signature_data']
        
        var valid_signature = await this.props.confirm_signature(scanned_signature, signature_data, client_address)
        if(scanned_signature == ''){
            this.props.notify(this.props.app_state.loc['1077']/* 'Please paste a signature to finish here.' */, 3800)
        }
        else if(!valid_signature){
            this.props.notify(this.props.app_state.loc['1078']/* 'The signature you received is invalid.' */, 4800)
        }else{
            this.props.add_clearing_purchase_action_to_stack(this.state)
            this.setState({received_signature: ''})
            this.props.notify(this.props.app_state.loc['18']/* 'Transaction added to stack.' */, 800)
        }
    }










    /* renders the specific element in the post or detail object */
    render_detail_item(item_id, object_data){
        return(
            <div>
                <ViewGroups font={this.props.app_state.font} item_id={item_id} object_data={object_data} theme={this.props.theme} width={this.props.app_state.width} />
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

    format_proportion(proportion){
        return ((proportion/10**18) * 100)+'%';
    }


}




export default ClearPurchasePage;