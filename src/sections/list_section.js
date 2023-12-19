import React, { Component } from 'react';
import Letter from './../assets/letter.png';
import EthereumTestnet from './../assets/ethereum_testnet.png';
import ViewGroups from './../components/view_groups';
import TextInput from './../components/text_input';

import EndImg from './../assets/end_token_icon.png';
import SpendImg from './../assets/spend_token_icon.png';
import End35 from './../assets/end35.png';
import End25 from './../assets/E25.png';


var bigInt = require("big-integer");

function number_with_commas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function start_and_end(str) {
  if (str.length > 35) {
    return str.substr(0, 20) + '...' + str.substr(str.length-10, str.length);
  }
  return str;
}

class PostListSection extends Component {
    
    state = {
        selected: 0,
        viewed_posts:[],
        scroll_positions:{}, typed_search_id:'', searched_account:'', typed_search_ether_id:'',
    };


    render(){
        return(
            <div>
                {this.render_post_list_group()}
            </div>
        )
    }

    render_post_list_group(){
        var selected_page = this.props.page;
        if(selected_page == '?'){
            var selected_tag = this.props.work_page_tags_object['i'].active
            if(selected_tag == 'jobs' || selected_tag == 'e'){
                return(
                <div>{this.render_jobs_list_group()}</div>
                )
            }
            else if(selected_tag == 'contracts'){
                return(
                <div>{this.render_contracts_list_group()}</div>
                )
            }
            else if(selected_tag == 'proposals' ){
                return(
                <div>{this.render_proposal_list_group()}</div>
                )
            }
            else if(selected_tag == 'subscriptions' ){
                return(
                <div>{this.render_subscription_list_group()}</div>
                )
            }
            else if(selected_tag == 'mail'){
                return(
                <div>{this.render_mail_list_group()}</div>
                )
            }
            else if(selected_tag == 'contractors'){
                return(
                <div>{this.render_contractor_list_group()}</div>
                )
            }
            
        }
        else if(selected_page == 'e'){
            var selected_tag = this.props.explore_page_tags_object['i'].active
            if(selected_tag == 'E5s' || selected_tag == 'e'){
                var selected_item = this.get_selected_item(this.props.explore_page_tags_object, selected_tag)

                if(selected_item == 'blockexplorer 🗺️'){
                    return(
                        <div>
                            {this.render_search_user_data()}
                        </div>
                    )
                }
                else{
                    return(
                        <div>{this.render_E5s_list_group()}</div>
                    )
                }
            }
            else if(selected_tag == 'posts' ){
                return(
                <div>{this.render_posts_list_group()}</div>
                )
            }
            else if(selected_tag == 'channels' ){
                return(
                <div>{this.render_channels_list_group()}</div>
                )
            }
            else if(selected_tag == 'storefront'){
                return(
                <div>{this.render_storefront_item_list_group()}</div>
                )
            }
            else if(selected_tag == 'bags'){
                return(
                <div>{this.render_bag_item_list_group()}</div>
                )
            }
        }
        else if(selected_page == 'w'){
            var selected_option_name = this.get_selected_item(this.props.wallet_page_tags_object, this.props.wallet_page_tags_object['i'].active)

            if(selected_option_name == 'ethers ⚗️' || selected_option_name == 'e'){
                return(
                <div>{this.render_ethers_list_group()}</div>
                )
            }
            else if(selected_option_name == 'ends ☝️' ){
                return(
                <div>{this.render_ends_list_group()}</div>
                )
            }
            else if(selected_option_name == 'spends 🫰' ){
                return(
                <div>{this.render_spends_list_group()}</div>
                )
            }
        }

    }

    get_selected_item(object, option){
        var selected_item = object[option][2][0]
        var picked_item = object[option][1][selected_item];
        return picked_item
    }

    is_object_sender_blocked(object){
        var blocked_account_obj = this.get_all_sorted_objects(this.props.app_state.blocked_accounts)
        var blocked_accounts = []
        blocked_account_obj.forEach(account => {
            if(!blocked_accounts.includes(account['id'])){
                blocked_accounts.push(account['id'])
            }
        });

        if(blocked_accounts.includes(object['author'])){
            return true
        }
        return false
    }

    get_all_sorted_objects(object){
        var all_objects = []
        for(var i=0; i<this.props.app_state.e5s['data'].length; i++){
            var e5 = this.props.app_state.e5s['data'][i]
            var e5_objects = object[e5]
            if(e5_objects != null){
                all_objects = all_objects.concat(e5_objects)
            }
        }

        return all_objects
    }


    constructor(props) {
        super(props);
        this.jobs_list = React.createRef();
        this.contract_list = React.createRef();
        this.contractor_list = React.createRef();
        this.proposal_list = React.createRef();
        this.subscription_list = React.createRef();
        this.mail_list = React.createRef();

        this.e5_list = React.createRef();
        this.searched_account_list = React.createRef();
        this.post_list = React.createRef();
        this.channel_list = React.createRef();
        this.storefront_list = React.createRef();
        this.bag_list = React.createRef();

        this.ether_list = React.createRef();
        this.end_list = React.createRef();
        this.spend_list = React.createRef();
    }


    handleScroll = (event, id) => {
        var pos = event.currentTarget.scrollTop
        this.props.set_page_scroll(pos)
    };

    set_jobs_list(pos){
        this.jobs_list.current?.scrollTo(0, pos);
    }

    set_contract_list(pos){
        this.contract_list.current?.scrollTo(0, pos);
    }

    set_contractor_list(pos){
        this.contractor_list.current?.scrollTo(0, pos);
    }

    set_proposal_list(pos){
        this.proposal_list.current?.scrollTo(0, pos);
    }

    set_subscription_list(pos){
        this.subscription_list.current?.scrollTo(0, pos);
    }

    set_mail_list(pos){
        this.mail_list.current?.scrollTo(0, pos);
    }



    set_e5_list(pos){
        this.e5_list.current?.scrollTo(0, pos);
    }

    set_searched_account_list(pos){
        this.searched_account_list.current?.scrollTo(0, pos)
    }

    set_post_list(pos){
        this.post_list.current?.scrollTo(0, pos);
    }

    set_channel_list(pos){
        this.channel_list.current?.scrollTo(0, pos);
    }

    set_storefront_list(pos){
        this.storefront_list.current?.scrollTo(0, pos);
    }

    set_bag_list(pos){
        this.bag_list.current?.scrollTo(0, pos);
    }



    set_ether_list(pos){
        this.ether_list.current?.scrollTo(0, pos);
    }

    set_end_list(pos){
        this.end_list.current?.scrollTo(0, pos);
    }

    set_spend_list(pos){
        this.spend_list.current?.scrollTo(0, pos);
    }




    render_jobs_list_group(){
       var background_color = this.props.theme['card_background_color']
        var middle = this.props.height-123;
        var size = this.props.size;
        if(size == 'l'){
            middle = this.props.height-80;
        }
        var items = this.get_job_items()

        if(items.length == 0){
            items = ['0','1'];
            return ( 
                <div style={{overflow: 'auto', maxHeight: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.map((item, index) => (
                            <li style={{'padding': '5px'}}>
                                <div style={{height:160, width:'100%', 'background-color': background_color, 'border-radius': '15px','padding':'10px 0px 0px 10px', 'max-width':'420px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                                    <div style={{'margin':'10px 20px 0px 0px'}}>
                                        <img src={Letter} style={{height:60 ,width:'auto'}} />
                                        <p style={{'display': 'flex', 'align-items':'center','justify-content':'center', 'padding':'5px 0px 0px 7px', 'color': 'gray'}}></p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            );
        }else{
            var background_color = this.props.theme['card_background_color']
            var card_shadow_color = this.props.theme['card_shadow_color']
            return (
                <div ref={this.jobs_list} onScroll={event => this.handleScroll(event)} style={{overflow: 'auto', maxHeight: middle}} >
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.map((item, index) => (
                            <li style={{'padding': '5px'}}>
                                {this.render_job_object(item, index)}
                            </li>
                        ))}
                    </ul>
                </div>
            );
        } 
    }

    get_job_items(){
        return this.props.get_job_items()
    }

    render_job_object(object, index){
        var background_color = this.props.theme['card_background_color']
        var card_shadow_color = this.props.theme['card_shadow_color']
        var item = this.format_job_item(object)
        if(this.is_object_sender_blocked(object)){
            return(
                <div>
                    {this.render_empty_object()}
                </div>
            )
        }
        return(
            <div style={{height:'auto', width:'100%', 'background-color': background_color, 'border-radius': '15px','padding':'5px 5px 0px 0px', 'max-width':'420px', 'box-shadow': '0px 0px 1px 2px '+card_shadow_color}}>
                <div style={{'padding': '0px 0px 0px 5px'}}>
                    {this.render_detail_item('1', item['tags'])}
                    <div style={{height: 10}}/>
                    <div onClick={() => this.when_job_item_clicked(index, object)}>
                        <div style={{'padding': '0px 0px 0px 0px'}} >
                            {this.render_detail_item('3', item['id'])}
                        </div>
                        <div style={{'padding': '20px 0px 0px 0px'}}>
                            {this.render_detail_item('2', item['age'])}
                        </div>
                    </div>
                </div>         
            </div>
        )
    }

    format_job_item(object){
        var tags = object['ipfs'] == null ? ['Job'] : [object['e5']].concat(object['ipfs'].entered_indexing_tags)
        var title = object['ipfs'] == null ? 'Job ID' : object['ipfs'].entered_title_text
        var age = object['event'] == null ? 0 : object['event'].returnValues.p7
        var time = object['event'] == null ? 0 : object['event'].returnValues.p6
        return {
            'tags':{'active_tags':tags, 'index_option':'indexed', 'selected_tags':this.props.app_state.job_section_tags, 'when_tapped':'select_deselect_tag'},
            'id':{'title':object['id'], 'details':title, 'size':'l'},
            'age':{'style':'s', 'title':'Block Number', 'subtitle':'??', 'barwidth':this.get_number_width(age), 'number':`block ${number_with_commas(age)}`, 'barcolor':'', 'relativepower':`${this.get_time_difference(time)}`, }
        }
    }

    when_job_item_clicked(index, object){
        this.props.when_job_post_item_clicked(index, object['id'], object['e5'])
    }



    
    render_contracts_list_group(){
        var background_color = this.props.theme['card_background_color']
        var middle = this.props.height-123;
        var size = this.props.size;
        if(size == 'l'){
            middle = this.props.height-80;
        }
        var items = this.get_contract_items()

        if(items.length == 0){
            items = ['0','1'];
            return ( 
                <div style={{overflow: 'auto', maxHeight: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.map((item, index) => (
                            <li style={{'padding': '5px'}}>
                                <div style={{height:160, width:'100%', 'background-color': background_color, 'border-radius': '15px','padding':'10px 0px 0px 10px', 'max-width':'420px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                                    <div style={{'margin':'10px 20px 0px 0px'}}>
                                        <img src={Letter} style={{height:60 ,width:'auto'}} />
                                        <p style={{'display': 'flex', 'align-items':'center','justify-content':'center', 'padding':'5px 0px 0px 7px', 'color': 'gray'}}></p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            );
        }else{
            var background_color = this.props.theme['card_background_color']
            var card_shadow_color = this.props.theme['card_shadow_color']
            return ( 
                <div ref={this.contract_list} onScroll={event => this.handleScroll(event)} style={{overflow: 'auto', maxHeight: middle}} >
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.map((item, index) => (
                            <li style={{'padding': '5px'}}>
                                {this.render_contract_item(item, index)}
                            </li>
                        ))}
                    </ul>
                </div>
            );
        }
        
    }

    get_contract_items(){
        return this.props.get_contract_items()
    }

    render_contract_item(object, index){
        var background_color = this.props.theme['card_background_color']
        var card_shadow_color = this.props.theme['card_shadow_color']
        var item = this.format_contract_item(object)
        if(this.is_object_sender_blocked(object)){
            return(
                <div>
                    {this.render_empty_object()}
                </div>
            )
        }
        return(
            <div style={{height:'auto', width:'100%', 'background-color': background_color, 'border-radius': '15px','padding':'5px 5px 0px 0px', 'max-width':'420px', 'box-shadow': '0px 0px 1px 2px '+card_shadow_color}}>
                <div style={{'padding': '0px 0px 0px 5px'}}>
                    {this.render_detail_item('1', item['tags'])}
                    <div style={{height: 10}}/>
                    <div style={{'padding': '0px 0px 0px 0px'}} onClick={() => this.when_contract_item_clicked(index, object)}>
                        {this.render_detail_item('3', item['id'])}
                    </div>
                    <div style={{'padding': '20px 0px 0px 0px'}} onClick={() => this.when_contract_item_clicked(index, object)}>
                        {this.render_detail_item('2', item['age'])}
                    </div>
                    
                </div>         
            </div>
        )
    }

    format_contract_item(object){
        var tags = object['ipfs'] == null ? [object['e5'], 'Contract'] : [object['e5']].concat(object['ipfs'].entered_indexing_tags)
        var title = object['ipfs'] == null ? 'Contract ID' : object['ipfs'].entered_title_text
        var age = object['event'] == null ? 0 : object['event'].returnValues.p5
        var id_text = ''+object['id']
        if(object['id'] == 2) id_text = 'Main Contract'
        return {
            'tags':{'active_tags':tags, 'index_option':'indexed', 'selected_tags':this.props.app_state.job_section_tags, 'when_tapped':'select_deselect_tag'},
            'id':{'title':id_text, 'details':title, 'size':'l'},
            'age':{ 'style':'s', 'title':'', 'subtitle':'', 'barwidth':this.get_number_width(age), 'number':`${number_with_commas(age)}`, 'barcolor':'', 'relativepower':'block', }
        }
    }

    when_contract_item_clicked(index, object){
        this.props.when_contract_item_clicked(index, object['id'], object['e5'])
    }






    render_proposal_list_group(){
        var background_color = this.props.theme['card_background_color']
        var card_shadow_color = this.props.theme['card_shadow_color']

        var middle = this.props.height-123;
        var size = this.props.size;
        if(size == 'l'){
            middle = this.props.height-80;
        }
        var items = this.get_my_proposals()

        if(items.length == 0){
            items = ['0','1'];
            return ( 
                <div style={{overflow: 'auto', maxHeight: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.map((item, index) => (
                            <li style={{'padding': '5px'}}>
                                <div style={{height:160, width:'100%', 'background-color': background_color, 'border-radius': '15px','padding':'10px 0px 0px 10px', 'max-width':'420px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                                    <div style={{'margin':'10px 20px 0px 0px'}}>
                                        <img src={Letter} style={{height:60 ,width:'auto'}} />
                                        <p style={{'display': 'flex', 'align-items':'center','justify-content':'center', 'padding':'5px 0px 0px 7px', 'color': 'gray'}}></p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            );
        }else{
            return (
                <div ref={this.proposal_list} onScroll={event => this.handleScroll(event)} style={{overflow: 'auto', maxHeight: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.map((item, index) => (
                            <li style={{'padding': '5px'}}>
                                {this.render_proposal_object(item, index)}
                            </li>
                        ))}
                    </ul>
                </div>
            );
        }
    }

    render_proposal_object(object, index){
        var background_color = this.props.theme['card_background_color']
        var card_shadow_color = this.props.theme['card_shadow_color']
        var item = this.format_proposal_item(object)
        // if(this.is_object_sender_blocked(object)){
        //     return(
        //         <div>
        //             {this.render_empty_object()}
        //         </div>
        //     )
        // }
        return(
            <div  style={{height:'auto', width:'100%', 'background-color': background_color, 'border-radius': '15px','padding':'5px 5px 0px 0px', 'max-width':'420px', 'box-shadow': '0px 0px 1px 2px '+card_shadow_color}}>
                <div style={{'padding': '0px 0px 0px 5px'}}>
                    {this.render_detail_item('1', item['tags'])}
                    <div style={{height: 10}}/>
                    <div style={{'padding': '0px 0px 0px 0px'}} onClick={() => this.when_proposal_item_clicked(index, object)}>
                        {this.render_detail_item('3', item['id'])}
                    </div>
                    <div style={{'padding': '20px 0px 0px 0px'}} onClick={() => this.when_proposal_item_clicked(index, object)}>
                        {this.render_detail_item('2', item['age'])}
                    </div>
                    
                </div>         
            </div>
        )
    }

    get_my_proposals(){
        return this.props.get_proposal_items()
    }

    format_proposal_item(object){
        var tags = object['ipfs'] == null ? ['Proposal'] : [object['e5']].concat(object['ipfs'].entered_indexing_tags)
        var title = object['ipfs'] == null ? 'Proposal ID' : object['ipfs'].entered_title_text
        var age = object['event'] == null ? 0 : object['event'].returnValues.p6
        var time = object['event'] == null ? 0 : object['event'].returnValues.p5
        return {
            'tags':{'active_tags':tags, 'index_option':'indexed', 'selected_tags':this.props.app_state.job_section_tags, 'when_tapped':'select_deselect_tag'},
            'id':{'title':object['id'], 'details':title, 'size':'l'},
            'age':{'style':'s', 'title':'', 'subtitle':'', 'barwidth':this.get_number_width(age), 'number':`${number_with_commas(age)}`, 'barcolor':'', 'relativepower':`${this.get_time_difference(time)}`, }
        }
    }

    when_proposal_item_clicked(index, object){
        this.props.when_proposal_item_clicked(index, object['id'], object['e5'])
    }







    render_subscription_list_group(){
        var background_color = this.props.theme['card_background_color']
        var middle = this.props.height-123;
        var size = this.props.size;
        if(size == 'l'){
            middle = this.props.height-80;
        }
        var items = this.get_subscription_items()

        if(items.length == 0){
            items = ['0','1'];
            return ( 
                <div style={{overflow: 'auto', maxHeight: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.map((item, index) => (
                            <li style={{'padding': '5px'}}>
                                <div style={{height:160, width:'100%', 'background-color': background_color, 'border-radius': '15px','padding':'10px 0px 0px 10px', 'max-width':'420px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                                    <div style={{'margin':'10px 20px 0px 0px'}}>
                                        <img src={Letter} style={{height:60 ,width:'auto'}} />
                                        <p style={{'display': 'flex', 'align-items':'center','justify-content':'center', 'padding':'5px 0px 0px 7px', 'color': 'gray'}}></p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            );
        }else{
            var background_color = this.props.theme['card_background_color']
            var card_shadow_color = this.props.theme['card_shadow_color']
            return ( 
                <div ref={this.subscription_list} onScroll={event => this.handleScroll(event)} style={{overflow: 'auto', maxHeight: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.map((item, index) => (
                            <li style={{'padding': '5px'}}>
                                {this.render_subscription_object(item, index)}
                            </li>
                        ))}
                    </ul>
                </div>
            );
        }
    }

    get_subscription_items(){
        return this.props.get_subscription_items()
    }


    render_subscription_object(object, index){
        var background_color = this.props.theme['card_background_color']
        var card_shadow_color = this.props.theme['card_shadow_color']
        var item = this.format_subscription_item(object)
        if(this.is_object_sender_blocked(object)){
            return(
                <div>
                    {this.render_empty_object()}
                </div>
            )
        }
        return(
            <div  style={{height:'auto', width:'100%', 'background-color': background_color, 'border-radius': '15px','padding':'5px 5px 0px 0px', 'max-width':'420px', 'box-shadow': '0px 0px 1px 2px '+card_shadow_color}}>
                <div style={{'padding': '0px 0px 0px 5px'}}>
                    {this.render_detail_item('1', item['tags'])}
                    <div style={{height: 10}}/>
                    <div style={{'padding': '0px 0px 0px 0px'}} onClick={() => this.when_subscription_item_clicked(index, object)}>
                        {this.render_detail_item('3', item['id'])}
                    </div>
                    <div style={{'padding': '20px 0px 0px 0px'}} onClick={() => this.when_subscription_item_clicked(index, object)}>
                        {this.render_detail_item('2', item['age'])}
                    </div>
                    
                </div>         
            </div>
        )
    }

    when_subscription_item_clicked(index, object){
        this.props.when_subscription_item_clicked(index, object['id'], object['e5'])
    }

    format_subscription_item(object){
        var tags = object['ipfs'] == null ? ['Subscription'] : [object['e5']].concat(object['ipfs'].entered_indexing_tags)
        var title = object['ipfs'] == null ? 'Subscription ID' : object['ipfs'].entered_title_text
        var age = object['event'] == null ? 0 : object['event'].returnValues.p5
        var time = object['event'] == null ? 0 : object['event'].returnValues.p4
        return {
            'tags':{'active_tags':tags, 'index_option':'indexed', 'selected_tags':this.props.app_state.job_section_tags, 'when_tapped':'select_deselect_tag'},
            'id':{'title':object['id'], 'details':title, 'size':'l'},
            'age':{'style':'s', 'title':'', 'subtitle':'', 'barwidth':this.get_number_width(age), 'number':`${number_with_commas(age)}`, 'barcolor':'', 'relativepower':`${this.get_time_difference(time)}`, }
        }
    }





    render_mail_list_group(){
        var background_color = this.props.theme['card_background_color']
        var middle = this.props.height-123;
        var size = this.props.size;
        if(size == 'l'){
            middle = this.props.height-80;
        }
        var items = this.get_mail_items()

        if(items.length == 0){
            items = ['0','1'];
            return( 
                <div style={{overflow: 'auto', maxHeight: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.map((item, index) => (
                            <li style={{'padding': '5px'}}>
                                <div style={{height:160, width:'100%', 'background-color': background_color, 'border-radius': '15px','padding':'10px 0px 0px 10px', 'max-width':'420px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                                    <div style={{'margin':'10px 20px 0px 0px'}}>
                                        <img src={Letter} style={{height:60 ,width:'auto'}} />
                                        <p style={{'display': 'flex', 'align-items':'center','justify-content':'center', 'padding':'5px 0px 0px 7px', 'color': 'gray'}}></p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            );
        }else{
            var background_color = this.props.theme['card_background_color']
            var card_shadow_color = this.props.theme['card_shadow_color']
            return (
                <div ref={this.mail_list} onScroll={event => this.handleScroll(event)} style={{overflow: 'auto', maxHeight: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.map((item, index) => (
                            <li style={{'padding': '5px'}}>
                                {this.render_mail_object_or_null(item, index)}
                            </li>
                        ))}
                    </ul>
                </div>
            );
        }
    }

    get_mail_items(){
        return this.props.get_mail_items()
    }

    render_mail_object_or_null(object, index){
        if(object['ipfs'] == null){
            return(
                <div>
                    {this.render_empty_object()}
                </div>
            )
        }else{
            return(
                <div>
                    {this.render_mail_object(object, index)}
                </div>
            )
        }
    }

    render_mail_object(object, index){
        var background_color = this.props.theme['card_background_color']
        var card_shadow_color = this.props.theme['card_shadow_color']
        var item = this.format_mail_item(object)
        if(this.is_object_sender_blocked(object)){
            return(
                <div>
                    {this.render_empty_object()}
                </div>
            )
        }
        return(
            <div  style={{height:'auto', width:'100%', 'background-color': background_color, 'border-radius': '15px','padding':'5px 5px 0px 0px', 'max-width':'420px', 'box-shadow': '0px 0px 1px 2px '+card_shadow_color}}>
                <div style={{'padding': '0px 0px 0px 5px'}}>
                    {this.render_detail_item('1', item['tags'])}
                    <div style={{height: 10}}/>
                    <div style={{'padding': '0px 0px 0px 0px'}} onClick={() => this.when_mail_item_clicked(index, object)}>
                        {this.render_detail_item('3', item['author_title'])}
                    </div>
                    <div style={{'padding': '15px 0px 0px 0px'}} onClick={() => this.when_mail_item_clicked(index, object)}>
                        {this.render_detail_item('2', item['age'])}
                    </div>
                    
                </div>         
            </div>
        )
    }

    when_mail_item_clicked(item, object){
        this.props.when_mail_item_clicked(item, object['id'])
    }

    format_mail_item(object){
        var tags_to_use = [object['type']];
        var tags = object['ipfs'] == null ? ['Mail'] : [object['e5']].concat(object['ipfs'].entered_indexing_tags)
        var final_tags = tags_to_use.concat(tags)
        var details = object['ipfs'] == null ? 'Mail ID' : object['ipfs'].entered_title_text
        var age = object['event'] == null ? 0 : object['event'].returnValues.p7
        var time = object['event'] == null ? 0 : object['event'].returnValues.p6
        var myid = this.props.app_state.user_account_id[object['e5']]
        if(myid == null) myid = 1;
        var sender = object['event'].returnValues.p2
        var recipient = object['event'].returnValues.p1
        var title = 'From '+ this.get_sender_title_text(sender, object)
        if(myid == sender){
            title = 'To '+ this.get_sender_title_text(recipient, object)
        }
        return {
            'tags':{'active_tags':final_tags, 'index_option':'indexed', 'selected_tags':this.props.app_state.job_section_tags, 'when_tapped':'select_deselect_tag'},
            'id':{'textsize':'14px', 'text':details, 'font':'Sans-serif'},
            'author_title':{'title':title, 'details':details, 'size':'l'},
            'age':{'style':'s', 'title':'Block Number', 'subtitle':'??', 'barwidth':this.get_number_width(age), 'number':`block ${number_with_commas(age)}`, 'barcolor':'', 'relativepower':`${this.get_time_difference(time)}`, }
        }
    }

    get_sender_title_text(sender, object){
        // var object = this.get_mail_items()[this.props.selected_mail_item];
        if(sender == this.props.app_state.user_account_id[object['e5']]){
            return 'You'
        }else{
            var alias = (this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[sender] == null ? sender : this.get_all_sorted_objects_mappings(this.props.app_state.alias_bucket)[sender])
            return alias
        }
    }






    render_contractor_list_group(){
        var background_color = this.props.theme['card_background_color']
        var middle = this.props.height-123;
        var size = this.props.size;
        if(size == 'l'){
            middle = this.props.height-80;
        }
        var items = this.get_contractor_items()

        if(items.length == 0){
            items = ['0','1'];
            return ( 
                <div style={{overflow: 'auto', maxHeight: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.map((item, index) => (
                            <li style={{'padding': '5px'}}>
                                <div style={{height:160, width:'100%', 'background-color': background_color, 'border-radius': '15px','padding':'10px 0px 0px 10px', 'max-width':'420px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                                    <div style={{'margin':'10px 20px 0px 0px'}}>
                                        <img src={Letter} style={{height:60 ,width:'auto'}} />
                                        <p style={{'display': 'flex', 'align-items':'center','justify-content':'center', 'padding':'5px 0px 0px 7px', 'color': 'gray'}}></p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            );
        }
        else{
            var background_color = this.props.theme['card_background_color']
            var card_shadow_color = this.props.theme['card_shadow_color']
            return ( 
                <div ref={this.contractor_list} onScroll={event => this.handleScroll(event)} style={{overflow: 'auto', maxHeight: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.map((item, index) => (
                            <li style={{'padding': '5px'}}>
                                {this.render_contractor_object(item, index)}
                            </li>
                        ))}
                    </ul>
                </div>
            );
        }
    }


    get_contractor_items(){
        return this.props.get_contractor_items()
    }

    render_contractor_object(object, index){
        var background_color = this.props.theme['card_background_color']
        var card_shadow_color = this.props.theme['card_shadow_color']
        var item = this.format_contractor_item(object)
        if(this.is_object_sender_blocked(object)){
            return(
                <div>
                    {this.render_empty_object()}
                </div>
            )
        }
        return(
            <div style={{height:'auto', width:'100%', 'background-color': background_color, 'border-radius': '15px','padding':'5px 5px 0px 0px', 'max-width':'420px', 'box-shadow': '0px 0px 1px 2px '+card_shadow_color}}>
                <div style={{'padding': '0px 0px 0px 5px'}}>
                    {this.render_detail_item('1', item['tags'])}
                    <div style={{height: 10}}/>
                    <div style={{'padding': '0px 0px 0px 0px'}} onClick={() => this.when_contractor_item_clicked(index, object)}>
                        {this.render_detail_item('3', item['id'])}
                    </div>
                    <div style={{'padding': '20px 0px 0px 0px'}} onClick={() => this.when_contractor_item_clicked(index, object)}>
                        {this.render_detail_item('2', item['age'])}
                    </div>
                    
                </div>         
            </div>
        )
    }

    format_contractor_item(object){
        var tags = object['ipfs'] == null ? ['Contractor'] : [object['e5']].concat(object['ipfs'].entered_indexing_tags)
        var title = object['ipfs'] == null ? 'Contractor ID' : object['ipfs'].entered_title_text
        var age = object['event'] == null ? 0 : object['event'].returnValues.p7
        var time = object['event'] == null ? 0 : object['event'].returnValues.p6
        return {
            'tags':{'active_tags':tags, 'index_option':'indexed', 'selected_tags':this.props.app_state.job_section_tags, 'when_tapped':'select_deselect_tag'},
            'id':{'title':object['id'], 'details':title, 'size':'l'},
            'age':{'style':'s', 'title':'Block Number', 'subtitle':'??', 'barwidth':this.get_number_width(age), 'number':`block ${number_with_commas(age)}`, 'barcolor':'', 'relativepower':`${this.get_time_difference(time)}`, }
        }
    }

    when_contractor_item_clicked(index, object){
        this.props.when_contractor_post_item_clicked(index, object['id'], object['e5'])
    }






    render_E5s_list_group(){
        var background_color = this.props.theme['card_background_color']
        var middle = this.props.height-123;
        var size = this.props.size;
        if(size == 'l'){
            middle = this.props.height-80;
        }
        var items = this.get_e5_data()

        if(items.length == 0){
            items = ['0','1'];
            return (
                <div style={{overflow: 'auto', maxHeight: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.map((item, index) => (
                            <li style={{'padding': '1px 5px 1px 5px'}}>
                                {this.render_small_empty_object()}
                            </li>
                        ))}
                    </ul>
                </div>
            );
        }
        return (
            <div ref={this.e5_list} onScroll={event => this.handleScroll(event)} style={{overflow: 'auto', maxHeight: middle}}>
                <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                    {items.map((item, index) => (
                        <li style={{'padding': '1px 5px 1px 5px'}}>
                            {this.render_E5s_object(item['data'], index, item['id'])}
                        </li>
                    ))}
                    {/* <div style={{'padding': '1px 5px 1px 5px'}}>
                        {this.render_small_empty_object()}
                    </div> */}
                </ul>
            </div>
        );
    }

    get_e5_data(){
        return this.props.get_e5_data()
    }

    render_E5s_object(item_data, index, name){
        var background_color = this.props.theme['card_background_color']
        var card_shadow_color = this.props.theme['card_shadow_color']
        var item = this.get_e5_data_item_object(item_data, name)
        var is_active = this.props.app_state.e5s[name].active
        if(!is_active){
            return(
                <div>
                    {this.render_small_empty_object()}
                </div>
            )
        }
        return ( 
            // <div onClick={() => this.when_E5_item_clicked(index, name)} style={{height:'auto', width:'100%', 'background-color': background_color, 'border-radius': '15px','padding':'5px 5px 0px 0px', 'max-width':'420px', 'box-shadow': '0px 0px 1px 2px '+card_shadow_color}}>
            //     <div style={{'padding': '0px 0px 0px 5px'}}>
            //         {this.render_detail_item('1', item['tags'])}
            //         <div style={{height: 10}}/>
            //         <div style={{'padding': '0px 10px 0px 10px'}}>
            //             {this.render_detail_item('8', item['label'])}
            //         </div>
            //         <div style={{height: 10}}/>
            //         <div style={{'margin':'0px 10px 0px 10px'}}>
            //             {this.render_detail_item('10', item['address'])}
            //         </div>
            //         <div style={{height: 10}}/>
            //     </div>         
            // </div>
            <div onClick={() => this.when_E5_item_clicked(index, name)}>
                {this.render_detail_item('8', item['data'])}
            </div>
        );
    }

    get_address(e5){
        return this.props.app_state.addresses[e5] == null ? '0x0000000000000000000000000000000000000000' : this.props.app_state.addresses[e5][0]
    }

    get_e5_data_item_object(item_data, name){
        var image = this.props.app_state.e5s[name].e5_img
        return {
                'label':{'title':name, 'details':'Main Contract', 'size':'l', 'image': image},
                'tags':{'active_tags':['E5', 'Main', 'Contract'], 'index_option':'indexed'},
                'address':{'font':'Sans-serif', 'text':this.get_address(name), 'textsize':'12px'},
                'data':{'title':name, 'details':start_and_end(this.get_address(name)), 'size':'l', 'image': image, 'border_radius':'0%'}
            }
    }

    when_E5_item_clicked(index, name){
        this.props.when_E5_item_clicked(index, name)
    }







    render_search_user_data(){
        return(
            <div>
                <div className="row" style={{ padding: '5px 10px 0px 10px', width:'103%' }}>
                    <div className="col-9" style={{'margin': '0px 0px 0px 0px'}}>
                        <TextInput height={25} placeholder={'Enter ID or Alias...'} when_text_input_field_changed={this.when_text_input_field_changed.bind(this)} text={this.state.typed_search_id} theme={this.props.theme}/>
                    </div>
                    <div className="col-3" style={{'padding': '0px 0px 0px 0px'}} onClick={()=> this.perform_search()}>
                        {this.render_detail_item('5',{'text':'Search','action':''})}
                    </div>
                </div>
                <div style={{height: 10}}/>
                {this.render_search_results()}
            </div>
        )
    }


    when_text_input_field_changed(text){
        this.setState({typed_search_id: text})
    }


    perform_search(){
        var typed_search = this.state.typed_search_id.trim()
        var typed_account = this.get_typed_alias_id(typed_search)

        if(typed_account == ''){
            this.props.notify('type something!', 800)
        }
        else if(isNaN(typed_account)){
            this.props.notify('that ID is not valid', 800)
        }
        else if(parseInt(typed_account) < 1001){
            this.props.notify('that ID is not valid', 800)
        }else{
            this.props.notify('searching...', 1000)
            this.setState({searched_account: typed_account})
            this.props.get_searched_account_data(typed_account, typed_search)
        }
    }

    get_typed_alias_id(alias){
        if(!isNaN(alias)){
            return alias
        }
        var id = (this.props.app_state.alias_owners[this.props.app_state.selected_e5][alias] == null ? alias : this.props.app_state.alias_owners[this.props.app_state.selected_e5][alias])

        return id
    }

    get_search_results(){
        var data = this.props.app_state.searched_accounts_data[this.state.searched_account]
        if(data == null) return []
        return data
    }

    render_search_results(){
        var middle = this.props.height-153;
        var size = this.props.size;
        if(size == 'l'){
            middle = this.props.height-80;
        }
        var items = this.get_search_results()
        if(items.length == 0){
            items = ['0','1'];
            return (
                <div style={{overflow: 'auto', maxHeight: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.map((item, index) => (
                            <li style={{'padding': '1px'}}>
                                {this.render_small_empty_object()}
                            </li>
                        ))}
                    </ul>
                </div>
            );
        }else{
            return(
                <div ref={this.searched_account_list} onScroll={event => this.handleScroll(event)} style={{overflow: 'auto', maxHeight: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.map((item, index) => (
                            <li style={{'padding': '1px'}}>
                                {this.render_searched_account_item(item)}
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
    }

    render_searched_account_item(item){
        var address = item['address']
        var ether_balance = item['ether_balance']
        var e5 = item['e5']
        var e5_img = this.props.app_state.e5s[e5].end_image
        var alias = item['alias']
        
        return(
            <div onClick={() => this.props.when_searched_account_clicked(item, this.state.searched_account)}>
                {this.render_detail_item('8', {'title':alias+': '+this.state.searched_account, 'details':start_and_end(address), 'size':'l', 'image':e5_img})}
                {/* <div style={{height: 3}}/>
                <div style={{ 'background-color': this.props.theme['view_group_card_item_background'], 'box-shadow': '0px 0px 0px 0px ' + this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 0px', 'padding': '10px 5px 5px 5px', 'border-radius': '8px' }}>
                    {this.render_detail_item('2', { 'style': 'l', 'title':'Ether Balance in Wei', 'subtitle': this.format_power_figure(ether_balance), 'barwidth': this.calculate_bar_width(ether_balance), 'number': this.format_account_balance_figure(ether_balance), 'barcolor': '', 'relativepower': 'wei', })}
                </div>
                <div style={{height:'1px', 'background-color':'#C1C1C1', 'margin': '10px 20px 10px 20px'}}/> */}
            </div>
        )
    }



    render_small_empty_object(){
        return(
            <div>
                <div style={{ height: 75, width: '100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '7px', 'padding': '10px 0px 10px 10px', 'max-width': '420px', 'display': 'flex', 'align-items': 'center', 'justify-content': 'center' }}>
                    <div style={{ 'margin': '10px 20px 10px 0px' }}>
                        <img src={Letter} style={{ height: 30, width: 'auto' }} />
                    </div>
                </div>
            </div>
        )
    }











    
    render_posts_list_group(){
        var background_color = this.props.theme['card_background_color']
        var middle = this.props.height-123;
        var size = this.props.size;
        if(size == 'l'){
            middle = this.props.height-80;
        }
        var items = this.get_post_items()

        if(items.length == 0){
            items = ['0','1'];
            return ( 
                <div style={{overflow: 'auto', maxHeight: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.map((item, index) => (
                            <li style={{'padding': '5px'}}>
                                <div style={{height:160, width:'100%', 'background-color': background_color, 'border-radius': '15px','padding':'10px 0px 0px 10px', 'max-width':'420px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                                    <div style={{'margin':'10px 20px 0px 0px'}}>
                                        <img src={Letter} style={{height:60 ,width:'auto'}} />
                                        <p style={{'display': 'flex', 'align-items':'center','justify-content':'center', 'padding':'5px 0px 0px 7px', 'color': 'gray'}}></p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            );
        }else{
            var background_color = this.props.theme['card_background_color']
            var card_shadow_color = this.props.theme['card_shadow_color']
            return ( 
                <div ref={this.post_list} onScroll={event => this.handleScroll(event)} style={{overflow: 'auto', maxHeight: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.map((item, index) => (
                            <li style={{'padding': '5px'}}>
                                {this.render_post_object_if_locked(item, index)}
                            </li>
                        ))}
                    </ul>
                </div>
            );
        }
    }

    get_post_items(){
        return this.props.get_post_items()
    }


    render_post_object_if_locked(item, index){
        var required_subscriptions = item['ipfs'].selected_subscriptions
        if(this.check_if_sender_has_paid_subscriptions(required_subscriptions)){
            return this.render_post_object(item, index)
        }
        else{
            return(
                <div>
                    <div style={{height:160, width:'100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px','padding':'10px 0px 0px 10px', 'max-width':'420px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                        <div style={{'margin':'10px 20px 0px 0px'}}>
                            <img src={Letter} style={{height:60 ,width:'auto'}} />
                            <p style={{'display': 'flex', 'align-items':'center','justify-content':'center', 'padding':'5px 0px 0px 7px', 'color': 'gray', 'font-size': '13px'}}>locked</p>
                        </div>
                    </div>
                </div>
            )
        }
    }

    check_if_sender_has_paid_subscriptions(required_subscriptions){
        var has_sender_paid_all_subs = true
        required_subscriptions.forEach(subscription_id => {
            var subscription_item = this.get_all_sorted_objects_mappings(this.props.app_state.created_subscription_object_mapping)[subscription_id]
            if(subscription_item['payment'] == 0){
                has_sender_paid_all_subs = false
            }
        });

        return has_sender_paid_all_subs
    }

    get_all_sorted_objects_mappings(object){
        var all_objects = {}
        for(var i=0; i<this.props.app_state.e5s['data'].length; i++){
            var e5 = this.props.app_state.e5s['data'][i]
            var e5_objects = object[e5]
            var all_objects_clone = structuredClone(all_objects)
            all_objects = { ...all_objects_clone, ...e5_objects}
        }

        return all_objects
    }

    render_post_object(object, index){
        var background_color = this.props.theme['card_background_color']
        var card_shadow_color = this.props.theme['card_shadow_color']
        var item = this.format_post_item(object)
        if(this.is_object_sender_blocked(object)){
            return(
                <div>
                    {this.render_empty_object()}
                </div>
            )
        }
        return(
            <div  style={{height:'auto', width:'100%', 'background-color': background_color, 'border-radius': '15px','padding':'5px 5px 0px 0px', 'max-width':'420px', 'box-shadow': '0px 0px 1px 2px '+card_shadow_color}}>
                <div style={{'padding': '0px 0px 0px 5px'}}>
                    {this.render_detail_item('1', item['tags'])}
                    <div style={{height: 10}}/>
                    <div style={{'padding': '0px 0px 0px 0px'}} onClick={() => this.when_post_item_clicked(index, object)}>
                        {this.render_detail_item('3', item['id'])}
                    </div>
                    <div style={{'padding': '20px 0px 0px 0px'}} onClick={() => this.when_post_item_clicked(index, object)}>
                        {this.render_detail_item('2', item['age'])}
                    </div>
                    
                </div>         
            </div>
        )
    }

    format_post_item(object){
        var tags = object['ipfs'] == null ? ['Post'] : [object['e5']].concat(object['ipfs'].entered_indexing_tags)
        var title = object['ipfs'] == null ? 'Post ID' : object['ipfs'].entered_title_text
        var age = object['event'] == null ? 0 : object['event'].returnValues.p7
        var time = object['event'] == null ? 0 : object['event'].returnValues.p6
        return {
            'tags':{'active_tags':tags, 'index_option':'indexed', 'selected_tags':this.props.app_state.explore_section_tags, 'when_tapped':'select_deselect_tag'},
            'id':{'title':object['id'], 'details':title, 'size':'l'},
            'age':{'style':'s', 'title':'Block Number', 'subtitle':'??', 'barwidth':this.get_number_width(age), 'number':`block ${number_with_commas(age)}`, 'barcolor':'', 'relativepower':`${this.get_time_difference(time)}`, }
        }
    }

    when_post_item_clicked(index, object){
        this.props.when_post_item_clicked(index, object['id'], object['e5'])
    }





    render_channels_list_group(){
        var background_color = this.props.theme['card_background_color']
        var middle = this.props.height-123;
        var size = this.props.size;
        if(size == 'l'){
            middle = this.props.height-80;
        }
        var items = this.get_channel_items()

        if(items.length == 0){
            items = ['0','1'];
            return ( 
                <div style={{overflow: 'auto', maxHeight: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.map((item, index) => (
                            <li style={{'padding': '5px'}}>
                                <div style={{height:160, width:'100%', 'background-color': background_color, 'border-radius': '15px','padding':'10px 0px 0px 10px', 'max-width':'420px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                                    <div style={{'margin':'10px 20px 0px 0px'}}>
                                        <img src={Letter} style={{height:60 ,width:'auto'}} />
                                        <p style={{'display': 'flex', 'align-items':'center','justify-content':'center', 'padding':'5px 0px 0px 7px', 'color': 'gray'}}></p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            );
        }else{
            var background_color = this.props.theme['card_background_color']
            var card_shadow_color = this.props.theme['card_shadow_color']
            return ( 
                <div ref={this.channel_list} onScroll={event => this.handleScroll(event)} style={{overflow: 'auto', maxHeight: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.map((item, index) => (
                            <li style={{'padding': '5px'}}>
                                {this.render_channel_object(item, index)}
                            </li>
                        ))}
                    </ul>
                </div>
            );
        }
    }

    render_channel_object(object, index){
        var background_color = this.props.theme['card_background_color']
        var card_shadow_color = this.props.theme['card_shadow_color']
        var item = this.format_channel_item(object)
        if(this.is_object_sender_blocked(object)){
            return(
                <div>
                    {this.render_empty_object()}
                </div>
            )
        }
        return(
            <div  style={{height:'auto', width:'100%', 'background-color': background_color, 'border-radius': '15px','padding':'5px 5px 0px 0px', 'max-width':'420px', 'box-shadow': '0px 0px 1px 2px '+card_shadow_color}}>
                <div style={{'padding': '0px 0px 0px 5px'}}>
                    {this.render_detail_item('1', item['tags'])}
                    <div style={{height: 10}}/>
                    <div style={{'padding': '0px 0px 0px 0px'}} onClick={() => this.when_channel_item_clicked(index, object)}>
                        {this.render_detail_item('3', item['id'])}
                    </div>
                    <div style={{'padding': '20px 0px 0px 0px'}} onClick={() => this.when_channel_item_clicked(index, object)}>
                        {this.render_detail_item('2', item['age'])}
                    </div>
                    
                </div>         
            </div>
        )
    }

    get_channel_items(){
        return this.props.get_channel_items()
    }

    format_channel_item(object){
        var tags = object['ipfs'] == null ? ['Post'] : [object['e5']].concat(object['ipfs'].entered_indexing_tags)
        var title = object['ipfs'] == null ? 'Post ID' : object['ipfs'].entered_title_text
        var age = object['event'] == null ? 0 : object['event'].returnValues.p7
        var time = object['event'] == null ? 0 : object['event'].returnValues.p6
        return {
            'tags':{'active_tags':tags, 'index_option':'indexed', 'selected_tags':this.props.app_state.explore_section_tags, 'when_tapped':'select_deselect_tag'},
            'id':{'title':object['id'], 'details':title, 'size':'l'},
            'age':{'style':'s', 'title':'Block Number', 'subtitle':'??', 'barwidth':this.get_number_width(age), 'number':`block ${number_with_commas(age)}`, 'barcolor':'', 'relativepower':`${this.get_time_difference(time)}`, }
        }
    }

    when_channel_item_clicked(index, object){
        this.props.when_channel_item_clicked(index, object['id'], object['e5'])
    }






    render_storefront_item_list_group(){
        var background_color = this.props.theme['card_background_color']
        var middle = this.props.height-123;
        var size = this.props.size;
        if(size == 'l'){
            middle = this.props.height-80;
        }
        var items = this.get_storefront_items()

        if(items.length == 0){
            items = ['0','1'];
            return ( 
                <div style={{overflow: 'auto', maxHeight: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.map((item, index) => (
                            <li style={{'padding': '5px'}}>
                                <div style={{height:160, width:'100%', 'background-color': background_color, 'border-radius': '15px','padding':'10px 0px 0px 10px', 'max-width':'420px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                                    <div style={{'margin':'10px 20px 0px 0px'}}>
                                        <img src={Letter} style={{height:60 ,width:'auto'}} />
                                        <p style={{'display': 'flex', 'align-items':'center','justify-content':'center', 'padding':'5px 0px 0px 7px', 'color': 'gray'}}></p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            );
        }else{
            var background_color = this.props.theme['card_background_color']
            var card_shadow_color = this.props.theme['card_shadow_color']
            return ( 
                <div ref={this.storefront_list} onScroll={event => this.handleScroll(event)} style={{overflow: 'auto', maxHeight: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.map((item, index) => (
                            <li style={{'padding': '5px'}}>
                                {this.render_storefront_object(item, index)}
                            </li>
                        ))}
                    </ul>
                </div>
            );
        }
    }

    get_storefront_items(){
        return this.props.get_storefront_items()
    }

    render_storefront_object(object, index){
        var background_color = this.props.theme['card_background_color']
        var card_shadow_color = this.props.theme['card_shadow_color']
        var item = this.format_storefront_item(object)
        if(this.is_object_sender_blocked(object) || !this.is_item_listed(object)){
            return(
                <div>
                    {this.render_empty_object()}
                </div>
            )
        }
        return(
            <div  style={{height:'auto', width:'100%', 'background-color': background_color, 'border-radius': '15px','padding':'5px 5px 0px 0px', 'max-width':'420px', 'box-shadow': '0px 0px 1px 2px '+card_shadow_color}}>
                <div style={{'padding': '0px 0px 0px 5px'}}>
                    {this.render_detail_item('1', item['tags'])}
                    <div style={{height: 10}}/>
                    <div style={{'padding': '0px 0px 0px 0px'}} onClick={() => this.when_storefront_item_clicked(index, object)}>
                        {this.render_detail_item('3', item['id'])}
                    </div>
                    {this.render_storefront_item_images(object)}
                    <div style={{'padding': '20px 0px 0px 0px'}} onClick={() => this.when_storefront_item_clicked(index, object)}>
                        {this.render_detail_item('2', item['age'])}
                    </div>
                    
                </div>         
            </div>
        )
    }

    format_storefront_item(object){
        var tags = object['ipfs'] == null ? ['Storefront'] : [object['e5']].concat(object['ipfs'].entered_indexing_tags)
        var title = object['ipfs'] == null ? 'Storefront ID' : object['ipfs'].entered_title_text
        var age = object['event'] == null ? 0 : object['event'].returnValues.p7
        var time = object['event'] == null ? 0 : object['event'].returnValues.p6
        return {
            'tags':{'active_tags':tags, 'index_option':'indexed', 'selected_tags':this.props.app_state.explore_section_tags, 'when_tapped':'select_deselect_tag'},
            'id':{'title':object['id'], 'details':title, 'size':'l'},
            'age':{'style':'s', 'title':'Block Number', 'subtitle':'??', 'barwidth':this.get_number_width(age), 'number':`block ${number_with_commas(age)}`, 'barcolor':'', 'relativepower':`${this.get_time_difference(time)}`, }
        }
    }

    when_storefront_item_clicked(index, object){
        this.props.when_storefront_post_item_clicked(index, object['id'], object['e5'])
    }

    is_item_listed(object){
        if(object['ipfs'].get_storefront_item_listing_option == null) return true

        var selected_option = this.get_selected_item(object['ipfs'].get_storefront_item_listing_option, 'e')
        var myid = this.props.app_state.user_account_id[object['e5']]
        if(myid == null) myid = 1
        if(selected_option == 'delisted' && object['event'].returnValues.p5 != myid){
            return false
        }
        return true
    }

    render_storefront_item_images(object){
        var items = object['ipfs'].entered_image_objects
        if(items == null || items.length == 0) return;

        return(
            <div style={{'margin':'0px 0px 0px 5px','padding': '5px 0px 0px 0px', width: '97%', 'background-color': 'transparent'}}>
                <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '13px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                    {items.map((item, index) => (
                        <li style={{'display': 'inline-block', 'margin': '5px 5px 5px 5px', '-ms-overflow-style': 'none'}}>
                            <img src={item} style={{height:45 ,width:45, 'border-radius': '50%'}} onClick={() => this.when_image_tapped(items, index)}/>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    when_image_tapped(items, index){
        this.props.when_view_image_clicked(index, items)
    }








    render_bag_item_list_group(){
        var background_color = this.props.theme['card_background_color']
        var middle = this.props.height-123;
        var size = this.props.size;
        if(size == 'l'){
            middle = this.props.height-80;
        }
        var items = this.get_bag_items()

        if(items.length == 0){
            items = ['0','1'];
            return ( 
                <div style={{overflow: 'auto', maxHeight: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.map((item, index) => (
                            <li style={{'padding': '5px'}}>
                                <div style={{height:160, width:'100%', 'background-color': background_color, 'border-radius': '15px','padding':'10px 0px 0px 10px', 'max-width':'420px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                                    <div style={{'margin':'10px 20px 0px 0px'}}>
                                        <img src={Letter} style={{height:60 ,width:'auto'}} />
                                        <p style={{'display': 'flex', 'align-items':'center','justify-content':'center', 'padding':'5px 0px 0px 7px', 'color': 'gray'}}></p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            );
        }else{
            var background_color = this.props.theme['card_background_color']
            var card_shadow_color = this.props.theme['card_shadow_color']
            return ( 
                <div ref={this.bag_list} onScroll={event => this.handleScroll(event)} style={{overflow: 'auto', maxHeight: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.map((item, index) => (
                            <li style={{'padding': '5px'}}>
                                {this.render_bag_object(item, index)}
                            </li>
                        ))}
                    </ul>
                </div>
            );
        } 
    }

    get_bag_items(){
        return this.props.get_bag_items()
    }

    render_bag_object(object, index){
        var background_color = this.props.theme['card_background_color']
        var card_shadow_color = this.props.theme['card_shadow_color']
        var item = this.format_bag_item(object)
        if(this.is_object_sender_blocked(object)){
            return(
                <div>
                    {this.render_empty_object()}
                </div>
            )
        }
        return(
            <div style={{height:'auto', width:'100%', 'background-color': background_color, 'border-radius': '15px','padding':'5px 5px 0px 0px', 'max-width':'420px', 'box-shadow': '0px 0px 1px 2px '+card_shadow_color}}>
                <div style={{'padding': '0px 0px 0px 5px'}}>
                    {/* {this.render_detail_item('1', item['tags'])} */}
                    {/* <div style={{height: 10}}/> */}
                    <div style={{'padding': '0px 0px 0px 0px'}} onClick={() => this.when_bag_item_clicked(index, object)}>
                        {this.render_detail_item('3', item['id'])}
                    </div>
                    <div style={{padding:'0px 0px 0px 0px'}}>
                        {this.render_images(object)}
                    </div>
                    <div style={{'padding': '20px 0px 0px 0px'}} onClick={() => this.when_bag_item_clicked(index, object)}>
                        {this.render_detail_item('2', item['age'])}
                    </div>
                    
                </div>         
            </div>
        )
    }

    render_images(object){
        var items = this.get_bag_images(object)
        return(
            <div style={{'margin':'0px 0px 0px 5px','padding': '5px 0px 0px 0px', width: '97%', 'background-color': 'transparent'}}>
                <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '13px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                    {items.map((item, index) => (
                        <li style={{'display': 'inline-block', 'margin': '5px 5px 5px 5px', '-ms-overflow-style': 'none'}}>
                            <img src={item} style={{height:45 ,width:45, 'border-radius': '50%'}} onClick={() => this.when_image_tapped(items, index)}/>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    format_bag_item(object){
        var tags = [object['event'].returnValues.p3]
        var title = object['ipfs'] == null ? '' : object['ipfs']['bag_orders'].length+' item(s) ordered'
        var age = object['event'] == null ? 0 : object['event'].returnValues.p5
        var time = object['event'] == null ? 0 : object['event'].returnValues.p4
        return {
            'tags':{'active_tags':tags, 'index_option':'indexed'},
            'id':{'title':object['id'], 'details':title, 'size':'l'},
            'age':{'style':'s', 'title':'Block Number', 'subtitle':'??', 'barwidth':this.get_number_width(age), 'number':`block ${number_with_commas(age)}`, 'barcolor':'', 'relativepower':`${this.get_time_difference(time)} ago`, },
        }
    }

    get_bag_images(object){
        var images = []
        if(this.props.app_state.created_store_mappings[object['e5']] == null) return images;

        for(var i=0; i<object['ipfs']['bag_orders'].length; i++){
            var variant_id = object['ipfs']['bag_orders'][i]['storefront_variant_id']
            var bag_storefront_id = object['ipfs']['bag_orders'][i]['storefront_item_id']
            var storefront = this.props.app_state.created_store_mappings[object['e5']][bag_storefront_id]
            var variant_in_store = this.get_variant_object_from_storefront(storefront, variant_id)

            var variant_images = variant_in_store['image_data']['data']
            if(variant_images['images'].length != 0){
                images.push(variant_images['images'][0])
            }
        }

        return images

    }

    get_variant_object_from_storefront(storefront, id){
        for(var i=0; i<storefront['ipfs'].variants.length; i++){
            if(storefront['ipfs'].variants[i]['variant_id'] == id){
                return storefront['ipfs'].variants[i]
            }
        }
    }

    when_bag_item_clicked(index, object){
        this.props.when_bag_post_item_clicked(index, object['id'], object['e5'])
    }







    render_ethers_list_group(){
        var middle = this.props.height-123;
        var size = this.props.size;
        if(size == 'l'){
            middle = this.props.height-80;
        }
        var items = this.get_ethers_data()
        if(items.length == 0){
            items = ['0','1'];
            return (
                <div>
                    <div style={{ 'margin': '5px 5px 5px 5px'}}>
                        <TextInput height={25} placeholder={'Enter Name or Symbol...'} when_text_input_field_changed={this.when_search_ether_input_field_changed.bind(this)} text={this.state.typed_search_ether_id} theme={this.props.theme}/>
                    </div>
                    <div style={{overflow: 'auto', maxHeight: middle}}>
                        <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                            {items.map((item, index) => (
                                <li style={{'padding': '1px 5px 1px 5px'}}>
                                    {this.render_small_empty_object()}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            );
        }

        return ( 
            <div>
                <div style={{ 'margin': '5px 5px 5px 5px'}}>
                    <TextInput height={25} placeholder={'Enter Name or Symbol...'} when_text_input_field_changed={this.when_search_ether_input_field_changed.bind(this)} text={this.state.typed_search_ether_id} theme={this.props.theme}/>
                </div>

                <div ref={this.ether_list} onScroll={event => this.handleScroll(event)} style={{overflow: 'auto', maxHeight: middle-40}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.map((item, index) => (
                            <li style={{'padding': '1px 5px 1px 5px'}}>
                                {this.render_ethers_object(item, index)}
                            </li>
                        ))}
                        {/* <div style={{'padding': '1px 5px 1px 5px'}}>
                            {this.render_small_empty_object()}
                        </div> */}
                    </ul>
                </div>
            </div>
        );
    }

    when_search_ether_input_field_changed(text){
        this.setState({typed_search_ether_id: text})
    }

    render_ethers_object(item, index){
        var background_color = this.props.theme['card_background_color']
        var card_shadow_color = this.props.theme['card_shadow_color']
        return ( 
            // <div onClick={() => this.when_ether_object_clicked(index, item)} style={{height:'auto', width:'100%', 'background-color': background_color, 'border-radius': '15px','padding':'5px 5px 0px 0px', 'max-width':'420px', 'box-shadow': '0px 0px 1px 2px '+card_shadow_color}}>
            //     <div style={{'padding': '0px 0px 0px 5px'}}>
            //         {this.render_detail_item('1', item['tags'])}
            //         <div style={{height: 10}}/>
            //         <div style={{'padding': '0px 10px 0px 10px'}}>
            //             {this.render_detail_item('8', item['label'])}
            //         </div>
            //         <div style={{height: 20}}/>
            //         {this.render_detail_item('2', item['number_label'])}
            //     </div>         
            // </div>
            <div onClick={() => this.when_ether_object_clicked(index, item)}>
                {this.render_detail_item('8', item['label'])}
            </div>
        );
    }

    get_ethers_data(){
        var list = [
            // this.get_token_data('ETHT', 'Ethereum Testnet', 'E15'),
            this.get_token_data('ETC', 'Ethereum Classic', 'E35'),
            this.get_token_data('ONE', 'Harmony', 'E45'),
            this.get_token_data('CELO', 'Celo', 'E55'),
            this.get_token_data('FLR', 'Flare', 'E65'),
            this.get_token_data('XDAI', 'Gnosis', 'E75'),
            this.get_token_data('FUSE', 'Fuse', 'E85'),
            this.get_token_data('GLMR', 'Moonbeam', 'E95'),
            this.get_token_data('MOVR', 'Moonriver', 'E105'),
            this.get_token_data('XDC', 'Xinfin Network', 'E115'),
            this.get_token_data('MATIC', 'Polygon', 'E125'),
            this.get_token_data('BNB', 'Binance Smart Chain', 'E135'),
            this.get_token_data('TT', 'ThunderCore', 'E155'),
            this.get_token_data('NRG', 'Energi', 'E145'),
            this.get_token_data('VIC', 'Viction', 'E165'),
            this.get_token_data('EVMOS', 'Evmos EVM', 'E175'),

            this.get_token_data('ETH', 'Ethereum', 'E185'),
            this.get_token_data('OETH', 'Optimism', 'E195'),
            this.get_token_data('BETH', 'Base', 'E205'),
            this.get_token_data('AETH', 'Arbitrum One', 'E215'),
            this.get_token_data('ASTR', 'Astar EVM', 'E225'),
            this.get_token_data('CRO', 'Cronos EVM', 'E235'),
            this.get_token_data('KAVA', 'Kava EVM', 'E245'),
            this.get_token_data('NEON', 'Neon EVM', 'E255'),
            this.get_token_data('mADA', 'Milkomeda', 'E265'),
            this.get_token_data('FTM', 'Fantom Opera', 'E275'),
            this.get_token_data('BRISE', 'Bitgert', 'E285'),
            this.get_token_data('SYS', 'Syscoin EVM', 'E295'),
            this.get_token_data('AVAX', 'Avalanche C-Chain', 'E305'),
            this.get_token_data('FRA', 'Findora', 'E315'),
            this.get_token_data('FDX', '5Dax', 'E325'),
            this.get_token_data('ROSE', 'Oasis Emerald', 'E335'),
            this.get_token_data('OZO', 'Ozone Chain', 'E345'),
            this.get_token_data('PIX', 'Pixie', 'E355'),
            this.get_token_data('REI', 'Rei Network', 'E365'),
            this.get_token_data('KLAY', 'Klaytn Mainnet Cypress', 'E375'),
            this.get_token_data('MNT', 'Mantle', 'E385'),
            this.get_token_data('PLS', 'Pulse Chain', 'E395'),
            this.get_token_data('CANTO', 'Canto', 'E405'),
            this.get_token_data('EOS', 'EOS EVM', 'E415'),
            this.get_token_data('IOTX', 'IoTeX', 'E425'),
            this.get_token_data('SGB', 'Songbird Canary Network', 'E435'),
            this.get_token_data('ULX', 'Ultron Mainnet', 'E445'),
            this.get_token_data('CET', 'CoinEx Smart Chain', 'E455'),
            this.get_token_data('TFUEL', 'Theta Mainnet', 'E465'),
            this.get_token_data('FITFI', 'Step Network', 'E475'),
            this.get_token_data('EWT', 'Energy Web Chain', 'E485'),
            this.get_token_data('CLO', 'Callisto', 'E495'),
            this.get_token_data('SDN', 'Shiden', 'E505'),
            this.get_token_data('TENET', 'Tenet', 'E515'),
            this.get_token_data('UBQ', 'Ubiq', 'E525'),
            this.get_token_data('GO', 'GoChain', 'E535'),
            this.get_token_data('OMAX', 'Omax Mainnet', 'E545'),
            this.get_token_data('WEMIX', 'Wemix3.0 Mainnet', 'E555'),
            this.get_token_data('CFX', 'Conflux eSpace', 'E565'),
            this.get_token_data('TLOS', 'Telos EVM', 'E575'),
            this.get_token_data('RSK', 'RSK Mainnet', 'E585'),
            this.get_token_data('META', 'Metadium', 'E595'),
            this.get_token_data('KAI', 'Kardiachain', 'E605'),
            this.get_token_data('CMP', 'Caduceus', 'E615'),
            this.get_token_data('SEELE', 'Seele', 'E625'),
            this.get_token_data('BTT', 'BitTorrent Chain', 'E635'),
            this.get_token_data('AAC', 'Double-A Chain', 'E645'),
            this.get_token_data('KAR', 'Karura EVM', 'E655'),
            this.get_token_data('ACA', 'Acala EVM', 'E665'),
            this.get_token_data('EDG', 'Edgeware EVM', 'E675'),
            this.get_token_data('BERG', 'Bloxberg', 'E685'),
            this.get_token_data('PHOENIX', 'Phoenix', 'E695'),
            this.get_token_data('OMC', 'Omchain', 'E705'),
            this.get_token_data('OM', 'Om', 'E715'),
            this.get_token_data('MINTME', 'MintMe.com Coin', 'E725'),
            this.get_token_data('ECS', 'eCredits', 'E735'),
            this.get_token_data('ELV', 'Eluv.io', 'E745'),
            this.get_token_data('ETHO', 'Etho Protocol', 'E755'),
            this.get_token_data('OLT', 'One Ledger', 'E765'),
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

        
        if(this.state.typed_search_ether_id == '') return prioritized_list;
        else{
            var filtered_list = []
            prioritized_list.forEach(token => {
                var name = token['name']
                var symbol = token['id']
                var typed_word = this.state.typed_search_ether_id.toLowerCase()
                if(name.toLowerCase().startsWith(typed_word) || symbol.toLowerCase().startsWith(typed_word)){
                    filtered_list.push(token)
                }
            });
            return filtered_list;
        }
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

    get_token_data(symbol, name,  e5){
        return {
                'id':symbol,
                'e5':e5,
                'name': name,
                'symbol': symbol,
                'image': this.props.app_state.e5s[e5].ether_image,
                'label':{'title':symbol, 'details':name, 'size':'l', 'image': this.props.app_state.e5s[e5].ether_image},
                'tags':{'active_tags':[name, 'EVM', symbol], 'index_option':'indexed'},
                'number_label':this.get_blockchain_data('s', e5),
                'number_label_large': this.get_blockchain_data('l', e5),
                'banner-icon':{'header':symbol, 'subtitle':name, 'image':this.props.app_state.e5s[e5].ether_image},
            }
    }

    get_blockchain_data(size, e5){
        var number_of_blocks = this.props.app_state.number_of_blocks[e5]
        if(number_of_blocks == null){
            number_of_blocks = 0
        }
        return{
            'style':size,
            'title':'Number of Blocks Mined',
            'subtitle':this.format_power_figure(number_of_blocks),
            'barwidth':this.get_number_width(number_of_blocks),
            'number':`${number_with_commas(number_of_blocks)} blocks`,
            'barcolor':'#606060',
            'relativepower':'ledger size',
        }
    }

    get_number_width(number){
        var last_two_digits = number.toString().slice(0, 1)+'0';
        if(number > 10){
            last_two_digits = number.toString().slice(0, 2);
        }
        return last_two_digits+'%'
    }

    

    when_ether_object_clicked(index, item){
        this.props.when_ether_object_clicked(index, item['id'])
    }







    render_ends_list_group(){
        var middle = this.props.height-123;
        var size = this.props.size;
        if(size == 'l'){
            middle = this.props.height-80;
        }
        var items = this.get_exchange_tokens(3)

        if(items.length == 0){
            items = ['0','1'];
            return ( 
                <div style={{overflow: 'auto', maxHeight: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.map((item, index) => (
                            <li style={{'padding': '5px'}}>
                                {this.render_small_empty_object()}
                            </li>
                        ))}
                    </ul>
                </div>
            );
        }
        return ( 
            <div ref={this.end_list} onScroll={event => this.handleScroll(event)} style={{overflow: 'auto', maxHeight: middle}}>
                <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                    {items.map((item, index) => (
                        <div>
                            {this.render_ends_object(item['data'], index, item['id'], item['img'], item)}
                        </div>
                    ))}
                    {/* <div style={{'padding': '1px 5px 1px 5px'}}>
                        {this.render_small_empty_object()}
                    </div> */}
                </ul>
            </div>
        );
    }

    get_exchange_tokens(exchange_type){
        return this.props.get_exchange_tokens(exchange_type)
    }

    render_ends_object(object_array, index, token_id, img, object){
        var background_color = this.props.theme['card_background_color']
        var card_shadow_color = this.props.theme['card_shadow_color']
        var item = this.get_exchanges_data(object_array, token_id, img, object)
        if(this.is_object_sender_blocked(object)){
            return(
                <div>
                    {this.render_empty_object()}
                </div>
            )
        }
        var is_active = this.props.app_state.e5s[object['e5']].active
        if(!is_active){
            return(
                <div></div>
            )
        }
        return ( 
            // <div  style={{height:'auto', width:'100%', 'background-color': background_color, 'border-radius': '15px','padding':'5px 5px 0px 0px', 'max-width':'420px', 'box-shadow': '0px 0px 1px 2px '+card_shadow_color}}>
            //     <div style={{'padding': '0px 0px 0px 5px'}}>
            //         {this.render_detail_item('1', item['tags'])}
            //         <div style={{height: 10}}/>
            //         <div style={{'padding': '0px 10px 0px 10px'}}>
            //             {this.render_detail_item('8', item['label'])}
            //         </div>
            //         <div style={{height: 20}}/>
            //         {this.render_detail_item('2', item['number_label'])}
            //     </div>         
            // </div>
            <div style={{'padding': '1px 5px 1px 5px'}} onClick={() => this.when_ends_object_clicked(index, object)}>
                {this.render_detail_item('8', item['label'])}
            </div>
        );
    }

    when_ends_object_clicked(index, item){
        this.props.when_ends_object_clicked(index, item['id'], item['e5'])
    }

    get_exchanges_data(object_array, token_id, img, item){
        var type = object_array[0][3/* <3>token_type */] == 3 ? 'END': 'SPEND'
        var supply = object_array[2][2/* <2>token_exchange_liquidity/total_supply */]
        var active_tags = item['ipfs'] == null ? [''+type, 'token'] : item['ipfs'].entered_indexing_tags
        var name = item['ipfs'] == null ? 'Token ID: '+token_id : item['ipfs'].entered_title_text
        if(token_id == 3){
            // var obj = {'E15':'E15', 'E25':'E25', 'E35':'E35'}
            name = item['e5']
        } else if(token_id == 5){
            // var obj = {'E15':'315', 'E25':'325', 'E35':'335'}
            // name = obj[item['e5']]
            name = item['e5'].replace('E','3')
        }
        var symbol = item['ipfs'] == null ? ''+type : item['ipfs'].entered_symbol_text
        var image = item['ipfs'] == null ? img : item['ipfs'].token_image
        var balance = item['balance']
        return{
            'tags':{'active_tags':[item['e5'], token_id].concat(active_tags), 'index_option':'indexed', 'when_tapped':''},
            'label':{'title':name,'details':symbol, 'size':'l', 'image':image},
            'number_label':{'style':'s', 'title':'', 'subtitle':'', 'barwidth':this.get_number_width(balance), 'number':`${this.format_account_balance_figure(balance)}`, 'barcolor':'#606060', 'relativepower':'balance',}
        }
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



    render_spends_list_group(){
        var middle = this.props.height-123;
        var size = this.props.size;
        if(size == 'l'){
            middle = this.props.height-80;
        }
        var items = this.get_exchange_tokens(5)

        if(items.length == 0){
            items = ['0','1'];
            return ( 
                <div style={{overflow: 'auto', maxHeight: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.map((item, index) => (
                            <li style={{'padding': '5px'}}>
                                {this.render_small_empty_object()}
                            </li>
                        ))}
                    </ul>
                </div>
            );
        }

        return ( 
            <div ref={this.spend_list} onScroll={event => this.handleScroll(event)} style={{overflow: 'auto', maxHeight: middle}}>
                <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                    {items.map((item, index) => (
                        <div>
                            {this.render_spends_object(item['data'], index, item['id'], item['img'], item)}
                        </div>
                    ))}
                    {/* <div style={{'padding': '1px 5px 1px 5px'}}>
                        {this.render_small_empty_object()}
                    </div> */}
                </ul>
            </div>
        );
    }

    render_spends_object(object_array, index, token_id, img, object){
        var background_color = this.props.theme['card_background_color']
        var card_shadow_color = this.props.theme['card_shadow_color']
        var item = this.get_exchanges_data(object_array, token_id, img, object)
        if(this.is_object_sender_blocked(object)){
            return(
                <div>
                    {this.render_empty_object()}
                </div>
            )
        }
        var is_active = this.props.app_state.e5s[object['e5']].active
        if(!is_active){
            return;
        }
        return (
            // <div style={{height:'auto', width:'100%', 'background-color': background_color, 'border-radius': '15px','padding':'5px 5px 0px 0px', 'max-width':'420px', 'box-shadow': '0px 0px 1px 2px '+card_shadow_color}}>
            //     <div style={{'padding': '0px 0px 0px 5px'}}>
            //         {this.render_detail_item('1', item['tags'])}
            //         <div style={{height: 10}}/>
            //         <div style={{'padding': '0px 10px 0px 10px'}}>
            //             {this.render_detail_item('8', item['label'])}
            //         </div>
            //         <div style={{height: 20}}/>
            //         {this.render_detail_item('2', item['number_label'])}
            //     </div>         
            // </div>
            <div style={{'padding': '1px 5px 1px 5px'}} onClick={() => this.when_spends_object_item_clicked(index, object)}>
                {this.render_detail_item('8', item['label'])}
            </div>
        );
    }

    when_spends_object_item_clicked(index, item){
        this.props.when_spends_object_clicked(index, item['id'], item['e5'])
    }






    render_empty_object(){
        var background_color = this.props.theme['card_background_color']
        return(
                <div style={{height:160, width:'100%', 'background-color': background_color, 'border-radius': '15px','padding':'10px 0px 0px 10px', 'max-width':'420px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                    <div style={{'margin':'10px 20px 0px 0px'}}>
                        <img src={Letter} style={{height:60 ,width:'auto'}} />
                        <p style={{'display': 'flex', 'align-items':'center','justify-content':'center', 'padding':'5px 0px 0px 7px', 'color': 'gray'}}></p>
                    </div>
                </div>
            );
    }



    /* renders the specific element in the post or detail object */
    render_detail_item(item_id, object_data){
        return(
            <div>
                <ViewGroups item_id={item_id} object_data={object_data} width={this.props.width} theme={this.props.theme} show_images={this.show_images.bind(this)} select_deselect_tag={this.select_deselect_tag.bind(this)}/>
            </div>
        )

    }

    show_images(){

    }

    select_deselect_tag(tag, pos){
        this.props.select_deselect_tag(tag, pos)
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


}




export default PostListSection;