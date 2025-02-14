// Copyright (c) 2023 Bry Onyoni
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE, TITLE AND NON-INFRINGEMENT. IN NO EVENT
// SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR
// OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
// FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
// IN THE SOFTWARE.
import React, { Component } from 'react';
import ViewGroups from './../components/view_groups'
import Tags from './../components/tags';
import TextInput from './../components/text_input';

// import Letter from './../assets/letter.png';

var bigInt = require("big-integer");

function bgN(number, power) {
  return bigInt((number+"e"+power)).toString();
}

function number_with_commas(x) {
    if(x == null) x = '';
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

class RPCSettingsPage extends Component {
    
    state = {
        selected: 0, ether:null,
        get_rpc_title_tags_object:this.get_rpc_title_tags_object(), typed_rpc_url:''
    };

    get_rpc_title_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e',this.props.app_state.loc['1333']/* 'rpc-settings' */], [1]
            ],
        };
    }

    set_ether(ether){
        this.setState({ether: ether})
    }

    render(){
        return(
            <div style={{'padding':'10px 10px 0px 10px'}}>
                
                <Tags font={this.props.app_state.font} page_tags_object={this.state.get_rpc_title_tags_object} tag_size={'l'} when_tags_updated={this.when_get_rpc_title_tags_object_updated.bind(this)} theme={this.props.theme}/>

                {this.render_everything()}

            </div>
        )
    }

    when_get_rpc_title_tags_object_updated(tag_obj){
        this.setState({get_rpc_title_tags_object: tag_obj})
    }

    render_everything(){
        if(this.state.ether != null){
            var size = this.props.app_state.size

            if(size == 's'){
                return(
                    <div>
                        {this.render_content()}
                    </div>
                )
            }
            else if(size == 'm'){
                return(
                    <div className="row">
                        <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                            {this.render_content()}
                        </div>
                        <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                            {this.render_empty_views(3)}
                        </div>
                    </div>
                    
                )
            }
            else if(size == 'l'){
                return(
                    <div className="row">
                        <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                            {this.render_content()}
                        </div>
                        <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                            {this.render_empty_views(3)}
                        </div>
                    </div>
                    
                )
            }
        }
    }

    render_empty_views(size){
        var items = []
        for(var i=0; i<size; i++){
            items.push(i)
        }
        
        return(
            <div>
                <ul style={{ 'padding': '0px 0px 0px 0px', 'list-style':'none'}}>
                    {items.map((item, index) => (
                        <li style={{'padding': '2px'}}>
                            <div style={{height:60, width:'100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px','padding':'10px 0px 10px 10px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                                <div style={{'margin':'10px 20px 10px 0px'}}>
                                    <img src={this.props.app_state.theme['letter']} style={{height:30 ,width:'auto'}} />
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    render_content(){
        return(
            <div>
                {this.render_detail_item('3', {'title':'Add Provider', 'details':this.props.app_state.loc['1334']/* 'Add a RPC provider for making transactions.' */, 'size':'l'})}
                <div style={{height:10}}/>
                <div className="row" style={{width:'103%'}}>
                    <div className="col-11" style={{'margin': '0px 0px 0px 0px'}}>
                        <TextInput font={this.props.app_state.font} height={30} placeholder={this.props.app_state.loc['1335']/* 'Enter Node Url...' */} when_text_input_field_changed={this.when_typed_rpc_changed.bind(this)} text={this.state.typed_rpc_url} theme={this.props.theme}/>
                    </div>
                    <div className="col-1" style={{'padding': '0px 10px 0px 0px'}} onClick={()=>this.add_rpc()} >
                        <div className="text-end" style={{'padding': '5px 0px 0px 0px'}} >
                            <img className="text-end" src={this.props.theme['add_text']} style={{height:37, width:'auto'}} />
                        </div>
                    </div>
                </div>
                <div style={{height:20}}/>
                {this.render_added_rpcs()}
            </div>
        )
    }

    when_typed_rpc_changed(url){
        this.setState({typed_rpc_url: url})
    }


    add_rpc(){
        var typed_word = this.state.typed_rpc_url.trim()

        if(typed_word == ''){
            this.props.notify(this.props.app_state.loc['1337']/* 'Type something.' */, 1400)
        }
        else if(this.hasWhiteSpace(typed_word)){
            this.props.notify(this.props.app_state.loc['1338']/* 'Dont use whitespaces' */, 2400)
        }
        else if(!this.isValidHttpUrl(typed_word)){
            this.props.notify(this.props.app_state.loc['1339']/* 'That url is invalid.' */, 4000)
        }
        else if(this.url_exists(typed_word)){
            this.props.notify(this.props.app_state.loc['1340']/* 'That provider has already been added.' */, 5000)
        }
        else{
            this.props.add_rpc_url(typed_word, this.state.ether)
            this.props.notify(this.props.app_state.loc['1341']/* 'RPC url added.' */, 1400)
            this.setState({typed_rpc_url:''})
        }

    }

    url_exists(url){
        return this.props.app_state.e5s[this.state.ether['e5']].web3.includes(url)
    }

    isValidHttpUrl(string) {
        let url;
        
        try {
            url = new URL(string);
        } catch (_) {
            return false;  
        }

        return url.protocol === "http:" || url.protocol === "https:" || url.protocol === "wss:";
    }

    hasWhiteSpace(s) {
        return s.indexOf(' ') >= 0;
    }


    render_added_rpcs(){
        var items = [].concat(this.props.app_state.e5s[this.state.ether['e5']].web3)
        var middle = this.props.height-100;
        var size = this.props.size;
        if(size == 'm'){
            middle = this.props.height-100;
        }
        return(
            <div style={{}}>
                <ul style={{ 'padding': '0px 0px 0px 0px', 'listStyle':'none'}}>
                    {items.map((item, index) => (
                        <li style={{'padding': '2px'}} onClick={()=> this.props.when_rpc_tapped(item, index, this.state.ether)}>
                            {this.render_rpc_item(item)}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    render_rpc_item(item){
        if(this.is_item_selected(item)){
            return(
                <div>
                    {this.render_detail_item('3', {'title':''+item, 'details':''+this.get_rpc_url_data(item), 'size':'s'})}
                    <div style={{height:'1px', 'background-color':this.props.app_state.theme['line_color'], 'margin': '5px 20px 2px 20px'}}/>
                </div>
            )
        }else{
            return(
                <div>
                    {this.render_detail_item('3', {'title':''+item, 'details':''+this.get_rpc_url_data(item), 'size':'s'})}
                </div>
            )
        }
    }

    is_item_selected(item){
        var selected_rpc = this.props.app_state.e5s[this.state.ether['e5']].url
        var picked_rpc = this.props.app_state.e5s[this.state.ether['e5']].web3[selected_rpc]
        
        return item == picked_rpc
    }


    get_rpc_url_data(item){
        var data = this.props.app_state.rpc_times[item]
        if(data == null) return this.props.app_state.loc['1342']/* 'speed unkown' */
        else return data
    }
    










    /* renders the specific element in the post or detail object */
    render_detail_item(item_id, object_data){
        return(
            <div>
                <ViewGroups graph_type={this.props.app_state.graph_type} font={this.props.app_state.font} item_id={item_id} object_data={object_data} theme={this.props.theme} width={this.props.app_state.width} />
            </div>
        )

    }

}




export default RPCSettingsPage;