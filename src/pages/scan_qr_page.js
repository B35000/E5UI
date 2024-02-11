import React, { Component } from 'react';
import ViewGroups from './../components/view_groups'
import Tags from './../components/tags';
import Html5QrcodePlugin from '../externals/Html5QrcodePlugin'

var bigInt = require("big-integer");

function bgN(number, power) {
  return bigInt((number+"e"+power)).toString();
}

function number_with_commas(x) {
    if(x == null) x = '';
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

class ScanQrPage extends Component {
    
    state = {
        selected: 0, received_data:'', page:''
    };

    constructor(props) {
        super(props);

        // This binding is necessary to make `this` work in the callback.
        this.onNewScanResult = this.onNewScanResult.bind(this);
    }

    set_page(page){
        this.setState({page: page})
    }

    render(){
        return(
            <div style={{padding:'15px 15px 0px 15px'}}>
                <Html5QrcodePlugin
                        fps={10}
                        qrbox={253}
                        disableFlip={false}
                        qrCodeSuccessCallback={this.onNewScanResult}/>

                <div style={{height:10}}/>
                {this.render_detail_item('4', {'text':this.state.received_data, 'textsize':'11px', 'font':this.props.app_state.font})}
                <div style={{height:10}}/>

                <div style={{'padding': '5px'}} onClick={()=>this.finish_scan()}>
                    {this.render_detail_item('5',{'text':this.props.app_state.loc['1343']/* 'Finish Scan' */, 'action':''})}
                </div>
            </div>
        )
    }

    onNewScanResult(decodedText, decodedResult) {
        // Handle the result here.
        this.setState({received_data: decodedText})
    }


    finish_scan(){
        if(this.state.received_data == ''){
            this.props.notify(this.props.app_state.loc['1344']/* 'Scan something first.' */, 3500)
            return;
        }
        this.props.finish_scan(this.state.received_data, this.state.page)
    }


    /* renders the specific element in the post or detail object */
    render_detail_item(item_id, object_data){
        return(
            <div>
                <ViewGroups font={this.props.app_state.font} item_id={item_id} object_data={object_data} theme={this.props.theme} width={this.props.app_state.width} />
            </div>
        )

    }

}




export default ScanQrPage;