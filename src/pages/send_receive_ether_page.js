import React, { Component } from 'react';
import Tags from './../components/tags';
import ViewGroups from './../components/view_groups'
import QRCode from "react-qr-code";
import NumberPicker from './../components/number_picker';

class SendReceiveEtherPage extends Component {
    
    state = {
        selected: 0,
        send_receive_ether_page_tags_object: this.get_send_receive_ether_page_tags_object(),
    };

    get_send_receive_ether_page_tags_object(){
        return{
          'i':{
              active:'e', 
          },
          'e':[
              ['or','',0], ['e','send', 'receive'], [0]
          ],
        };
    }

    render(){
        var selected_item = this.get_selected_item(this.state.send_receive_ether_page_tags_object, this.state.send_receive_ether_page_tags_object['i'].active)

        if(selected_item == 'send' || selected_item == 'e'){
            return(
                <div>
                    <div style={{'margin':'20px 0px 0px 20px'}}>
                        {this.render_top_tag_bar_group()}
                        {this.render_send_ether_ui()}
                    </div>
                    
                </div>
            )
        }else{
            return(
                <div>
                    <div style={{'margin':'20px 0px 0px 20px'}}>
                        {this.render_top_tag_bar_group()}
                        {this.render_receive_ether_ui()}
                    </div>

                </div>
            )
        }
        
    }


    get_selected_item(object, option){
        var selected_item = object[option][2][0]
        var picked_item = object[option][1][selected_item];
        return picked_item
    }


    render_top_tag_bar_group(){
        return(
            <div>
                <Tags page_tags_object={this.state.send_receive_ether_page_tags_object} tag_size={'l'} when_tags_updated={this.when_tags_updated.bind(this)}/>
            </div>
        )
    }


    when_tags_updated(tag_group){
        this.setState({send_receive_ether_page_tags_object: tag_group})
    }


    render_send_ether_ui(){
        return(
            <div style={{'padding':'10px 30px 0px 0px', width:'100%'}}>
                <div className="row">
                    <div className="col-6">
                        {this.render_detail_item('4',{'font':'Sans-serif', 'textsize':'15px', 'text':'Send Ether using the address shown below', 'color':'dark-grey'})}
                        <div style={{height: 10}}/>
                        {this.render_detail_item('3', {'title':'Wallet Address', 'details':this.get_account_address(), 'size':'l'})}
                        <div style={{height: 10}}/>
                        <div style={{'background-color': 'rgb(217, 217, 217,.6)', 'box-shadow': '0px 0px 0px 0px #CECDCD','margin': '0px 0px 0px 0px','padding': '10px 5px 5px 10px','border-radius': '8px' }}>
                            {this.render_detail_item('2', this.get_number_balance_object())}
                        </div>
                        
                        {this.render_number_picker()}
                    </div>
                    <div className="col-6">

                    </div>
                </div>
                
            </div>
        )
    }

    get_account_address(){
        if(this.props.app_state.account != null){
            return this.props.app_state.account.address;
        }
    }

    get_number_balance_object(){
        return{
            'style':'l',
            'title':'Balance in Ether',
            'subtitle':'wei',
            'barwidth':'59%',
            'number':'130,000,000',
            'barcolor':'#606060',
            'relativepower':'e8',
        }
    }

    render_number_picker(){
        return(
            <div>
                <NumberPicker/>
            </div>
        )
    }


    render_receive_ether_ui(){
        return(
            <div style={{'padding':'10px 30px 0px 0px', width:'85%'}}>
                {this.render_detail_item('4',{'font':'Sans-serif', 'textsize':'15px', 'text':'Receive Ether using the address shown below', 'color':'dark-grey'})}
                <div style={{height: 10}}/>
                {this.render_detail_item('3', {'title':'Wallet Address', 'details':this.get_account_address(), 'size':'l'})}
                {this.render_detail_item('5',{'text':'Copy to Clipboard', 'action':'copy_to_clipboard'})}
                <div style={{height: this.props.height, width:'100%','display': 'flex', 'align-items':'center','justify-content':'center', 'margin':'30px 0px 0px 0px'}}>
                    <QRCode
                        size={100}
                        style={{ height: "auto", maxWidth: "100%", width: "50%" }}
                        value={this.get_account_address()}
                        viewBox={`0 0 100 100`}
                    />
                    
                </div>
                <p style={{'margin':'5% 0% 0% 47%'}}>Qr Code</p>
                
            </div>
        )
    }




    /* renders the specific element in the post or detail object */
    render_detail_item(item_id, object_data){
        return(
            <div>
                <ViewGroups item_id={item_id} object_data={object_data} copy_to_clipboard={this.copy_address_to_clipboard.bind(this)}/>
            </div>
        )

    }

    copy_address_to_clipboard(){
        console.log('copied to clipboard')
        navigator.clipboard.writeText(this.props.app_state.account.address)
        this.props.notify('copied to clipboard!', 600)
    }


}




export default SendReceiveEtherPage;