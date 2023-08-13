import React, { Component } from 'react';
import Letter from './../assets/letter.png';
import EthereumTestnet from './../assets/ethereum_testnet.png';
import ViewGroups from './../components/view_groups';

import EndImg from './../assets/end_token_icon.png';
import SpendImg from './../assets/spend_token_icon.png';
import End35 from './../assets/end35.png';


function number_with_commas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


class PostListSection extends Component {
    
    state = {
        selected: 0,
        viewed_posts:[]
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
        }
        else if(selected_page == 'e'){
            var selected_tag = this.props.explore_page_tags_object['i'].active
            if(selected_tag == 'E5s' || selected_tag == 'e'){
                return(
                <div>{this.render_E5s_list_group()}</div>
                )
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
                                <div style={{height:180, width:'100%', 'background-color': background_color, 'border-radius': '15px','padding':'10px 0px 0px 10px', 'max-width':'420px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                                    <div style={{'margin':'10px 20px 0px 0px'}}>
                                        <img src={Letter} style={{height:70 ,width:'auto'}} />
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
                <div style={{overflow: 'auto', maxHeight: middle}}>
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
        var selected_option_name = this.get_selected_item(this.props.work_page_tags_object, this.props.work_page_tags_object['i'].active)

        if(this.props.work_page_tags_object['i'].active != 'jobs'){
            return this.props.app_state.created_jobs 
        }

        if(selected_option_name == 'all'){
            return this.props.app_state.created_jobs
        }
        else if(selected_option_name == 'viewed'){
            var my_viewed_jobs = []
            for(var i=0; i<this.props.viewed_jobs.length; i++){
                my_viewed_jobs.push(this.props.app_state.created_jobs[this.props.viewed_jobs[i]])
            }
            return my_viewed_jobs
        }
        else {
            var my_jobs = []
            var myid = this.props.app_state.user_account_id
            for(var i = 0; i < this.props.app_state.created_jobs.length; i++){
                var post_author = this.props.app_state.created_jobs[i]['event'].returnValues.p5
                if(post_author.toString() == myid.toString()){
                    my_jobs.push(this.props.app_state.created_jobs[i])
                }
            }
            return my_jobs
        }
    }

    render_job_object(object, index){
        var background_color = this.props.theme['card_background_color']
        var card_shadow_color = this.props.theme['card_shadow_color']
        var item = this.format_job_item(object)
        return(
            <div onClick={() => this.when_job_item_clicked(index)} style={{height:'auto', width:'100%', 'background-color': background_color, 'border-radius': '15px','padding':'5px 5px 0px 0px', 'max-width':'420px', 'box-shadow': '0px 0px 1px 2px '+card_shadow_color}}>
                <div style={{'padding': '5px 0px 5px 5px'}}>
                    {this.render_detail_item('1', item['tags'])}
                    <div style={{height: 10}}/>
                    <div style={{'padding': '0px 0px 0px 0px'}}>
                        {this.render_detail_item('3', item['id'])}
                    </div>
                    <div style={{'padding': '20px 0px 0px 0px'}}>
                        {this.render_detail_item('2', item['age'])}
                    </div>
                    
                </div>         
            </div>
        )
    }

    format_job_item(object){
        var tags = object['ipfs'] == null ? ['Job'] : object['ipfs'].entered_indexing_tags
        var title = object['ipfs'] == null ? 'Job ID' : object['ipfs'].entered_title_text
        var age = object['event'] == null ? 0 : object['event'].returnValues.p7
        var time = object['event'] == null ? 0 : object['event'].returnValues.p6
        return {
            'tags':{'active_tags':tags, 'index_option':'indexed'},
            'id':{'title':object['id'], 'details':title, 'size':'l'},
            'age':{'style':'s', 'title':'Block Number', 'subtitle':'??', 'barwidth':this.get_number_width(age), 'number':`block ${number_with_commas(age)}`, 'barcolor':'', 'relativepower':`${this.get_time_difference(time)}`, }
        }
    }

    when_job_item_clicked(index){
        this.props.when_job_post_item_clicked(index)
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
                                <div style={{height:180, width:'100%', 'background-color': background_color, 'border-radius': '15px','padding':'10px 0px 0px 10px', 'max-width':'420px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                                    <div style={{'margin':'10px 20px 0px 0px'}}>
                                        <img src={Letter} style={{height:70 ,width:'auto'}} />
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
                <div style={{overflow: 'auto', maxHeight: middle}}>
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
        var selected_option_name = this.get_selected_item(this.props.work_page_tags_object, this.props.work_page_tags_object['i'].active)

        if(this.props.work_page_tags_object['i'].active != 'contracts'){
            return this.props.app_state.created_contracts.reverse()
        }

        if(selected_option_name == 'all'){
            return this.props.app_state.created_contracts.reverse()
        }
        else if(selected_option_name == 'viewed'){
            var my_viewed_contracts = []
            for(var i=0; i<this.props.viewed_contracts.length; i++){
                my_viewed_contracts.push(this.props.app_state.created_contracts[this.props.viewed_contracts[i]])
            }
            return my_viewed_contracts.reverse()
        }
        else if(selected_option_name == 'received'){
            return this.props.app_state.created_contracts.reverse()
        }
        else {
            var my_contracts = []
            var myid = this.props.app_state.user_account_id
            for(var i = 0; i < this.props.app_state.created_contracts.length; i++){
                var post_author = this.props.app_state.created_contracts[i]['event'] == null ? 0 : this.props.app_state.created_contracts[i]['event'].returnValues.p3
                if(post_author.toString() == myid.toString()){
                    my_contracts.push(this.props.app_state.created_contracts[i])
                }else{
                    console.log('sender not post author: author->'+post_author+', sender id->'+myid)
                }
            }
            return my_contracts.reverse()
        }
    }

    render_contract_item(object, index){
        var background_color = this.props.theme['card_background_color']
        var card_shadow_color = this.props.theme['card_shadow_color']
        var item = this.format_contract_item(object)
        return(
            <div onClick={() => this.when_contract_item_clicked(index)} style={{height:'auto', width:'100%', 'background-color': background_color, 'border-radius': '15px','padding':'5px 5px 0px 0px', 'max-width':'420px', 'box-shadow': '0px 0px 1px 2px '+card_shadow_color}}>
                <div style={{'padding': '5px 0px 5px 5px'}}>
                    {this.render_detail_item('1', item['tags'])}
                    <div style={{height: 10}}/>
                    <div style={{'padding': '0px 0px 0px 0px'}}>
                        {this.render_detail_item('3', item['id'])}
                    </div>
                    <div style={{'padding': '20px 0px 0px 0px'}}>
                        {this.render_detail_item('2', item['age'])}
                    </div>
                    
                </div>         
            </div>
        )
    }

    format_contract_item(object){
        var tags = object['ipfs'] == null ? ['Contract'] : object['ipfs'].entered_indexing_tags
        var title = object['ipfs'] == null ? 'Contract ID' : object['ipfs'].entered_title_text
        var age = object['event'] == null ? 0 : object['event'].returnValues.p5
        return {
            'tags':{'active_tags':tags, 'index_option':'indexed'},
            'id':{'title':object['id'], 'details':title, 'size':'l'},
            'age':{ 'style':'s', 'title':'', 'subtitle':'', 'barwidth':this.get_number_width(age), 'number':`${number_with_commas(age)}`, 'barcolor':'', 'relativepower':'block', }
        }
    }

    when_contract_item_clicked(index){
        this.props.when_contract_item_clicked(index)
    }



    render_proposal_list_group(){
        var middle = this.props.height-123;
        var size = this.props.size;
        if(size == 'l'){
            middle = this.props.height-80;
        }
        var items = ['0','1','2','3'];
        return ( 
            <div style={{overflow: 'auto', maxHeight: middle}}>
                <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                    {items.map((item, index) => (
                        <li style={{'padding': '5px'}}>
                            {this.render_proposal_object()}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }

    render_proposal_object(){
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
                                <div style={{height:180, width:'100%', 'background-color': background_color, 'border-radius': '15px','padding':'10px 0px 0px 10px', 'max-width':'420px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                                    <div style={{'margin':'10px 20px 0px 0px'}}>
                                        <img src={Letter} style={{height:70 ,width:'auto'}} />
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
                <div style={{overflow: 'auto', maxHeight: middle}}>
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
        // var items = this.props.app_state.created_subscriptions
        // return items.reverse()

        var selected_option_name = this.get_selected_item(this.props.work_page_tags_object, this.props.work_page_tags_object['i'].active)

        if(this.props.work_page_tags_object['i'].active != 'subscriptions'){
            return this.props.app_state.created_subscriptions.reverse()
        }

        if(selected_option_name == 'all'){
            return this.props.app_state.created_subscriptions.reverse()
        }
        else if(selected_option_name == 'viewed'){
            var my_viewed_subscriptions = []
            for(var i=0; i<this.props.viewed_subscriptions.length; i++){
                my_viewed_subscriptions.push(this.props.app_state.created_subscriptions[this.props.viewed_subscriptions[i]])
            }
            return my_viewed_subscriptions.reverse()
        }
        else if(selected_option_name == 'paid'){
            return this.props.app_state.created_subscriptions.reverse()
        }
        else {
            var my_subscriptions = []
            var myid = this.props.app_state.user_account_id
            for(var i = 0; i < this.props.app_state.created_subscriptions.length; i++){
                var post_author = this.props.app_state.created_subscriptions[i]['event'] == null ? 0 : this.props.app_state.created_subscriptions[i]['event'].returnValues.p3
                if(post_author.toString() == myid.toString()){
                    my_subscriptions.push(this.props.app_state.created_subscriptions[i])
                }else{
                    console.log('sender not post author: author->'+post_author+', sender id->'+myid)
                }
            }
            return my_subscriptions.reverse()
        }
    }

    render_subscription_object(object, index){
        var background_color = this.props.theme['card_background_color']
        var card_shadow_color = this.props.theme['card_shadow_color']
        var item = this.format_subscription_item(object)
        return(
            <div onClick={() => this.when_subscription_item_clicked(index)} style={{height:'auto', width:'100%', 'background-color': background_color, 'border-radius': '15px','padding':'5px 5px 0px 0px', 'max-width':'420px', 'box-shadow': '0px 0px 1px 2px '+card_shadow_color}}>
                <div style={{'padding': '5px 0px 5px 5px'}}>
                    {this.render_detail_item('1', item['tags'])}
                    <div style={{height: 10}}/>
                    <div style={{'padding': '0px 0px 0px 0px'}}>
                        {this.render_detail_item('3', item['id'])}
                    </div>
                    <div style={{'padding': '20px 0px 0px 0px'}}>
                        {this.render_detail_item('2', item['age'])}
                    </div>
                    
                </div>         
            </div>
        )
    }

    when_subscription_item_clicked(index){
        this.props.when_subscription_item_clicked(index)
    }

    format_subscription_item(object){
        var tags = object['ipfs'] == null ? ['Subscription'] : object['ipfs'].entered_indexing_tags
        var title = object['ipfs'] == null ? 'Subscription ID' : object['ipfs'].entered_title_text
        var age = object['event'] == null ? 0 : object['event'].returnValues.p5
        return {
            'tags':{'active_tags':tags, 'index_option':'indexed'},
            'id':{'title':object['id'], 'details':title, 'size':'l'},
            'age':{'style':'s', 'title':'', 'subtitle':'', 'barwidth':this.get_number_width(age), 'number':`${number_with_commas(age)}`, 'barcolor':'', 'relativepower':'block', }
        }
    }





    render_E5s_list_group(){
        var middle = this.props.height-123;
        var size = this.props.size;
        if(size == 'l'){
            middle = this.props.height-80;
        }
        var items = this.get_e5_data()
        return ( 
            <div style={{overflow: 'auto', maxHeight: middle}}>
                <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                    {items.map((item, index) => (
                        <li style={{'padding': '5px'}}>
                            {this.render_E5s_object(item['data'], index, item['id'])}
                        </li>
                    ))}
                    <div style={{'padding': '5px'}}>
                        {this.render_empty_object()}
                    </div>
                    <div style={{'padding': '5px'}}>
                        {this.render_empty_object()}
                    </div>
                </ul>
            </div>
        );
    }

    get_e5_data(){
        var data = []
        var contract_data = this.props.app_state.E15_contract_data
        var contract_id_data = this.props.app_state.contract_id_data
        for (let i = 0; i < contract_data.length; i++) {
            data.push({'data':contract_data[i], 'id':contract_id_data[i]})
        }
        return data
    }

    render_E5s_object(item_data, index, name){
        var background_color = this.props.theme['card_background_color']
        var card_shadow_color = this.props.theme['card_shadow_color']
        var item = this.get_e5_data_item_object(item_data, name)
        return ( 
            <div onClick={() => this.when_E5_item_clicked(index)} style={{height:'auto', width:'100%', 'background-color': background_color, 'border-radius': '15px','padding':'5px 5px 0px 0px', 'max-width':'420px', 'box-shadow': '0px 0px 1px 2px '+card_shadow_color}}>
                <div style={{'padding': '5px 0px 5px 5px'}}>
                    {this.render_detail_item('1', item['tags'])}
                    <div style={{height: 10}}/>
                    <div style={{'padding': '0px 10px 0px 10px'}}>
                        {this.render_detail_item('8', item['label'])}
                    </div>
                    <div style={{height: 10}}/>
                    <div style={{'margin':'0px 10px 0px 10px'}}>
                        {this.render_detail_item('3', item['address'])}
                    </div>
                    
                </div>         
            </div>
        );
    }

    get_e5_data_item_object(item_data, name){
        var obj = {'E35':End35}
        var add_obj = {'e35':this.props.app_state.E35_addresses[0]}
        return {
                'label':{'title':name, 'details':'Main Contract', 'size':'l', 'image': obj[name]},
                'tags':{'active_tags':['E5', 'Main', 'Contract'], 'index_option':'indexed'},
                'address':{'title':'Contract Address', 'details':add_obj['e35'], 'size':'l'}
            }
    }

    when_E5_item_clicked(index){
        this.props.when_E5_item_clicked(index)
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
                                <div style={{height:180, width:'100%', 'background-color': background_color, 'border-radius': '15px','padding':'10px 0px 0px 10px', 'max-width':'420px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                                    <div style={{'margin':'10px 20px 0px 0px'}}>
                                        <img src={Letter} style={{height:70 ,width:'auto'}} />
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
                <div style={{overflow: 'auto', maxHeight: middle}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.map((item, index) => (
                            <li style={{'padding': '5px'}}>
                                {this.render_post_object(item, index)}
                            </li>
                        ))}
                    </ul>
                </div>
            );
        }
    }

    get_post_items(){
        var selected_option_name = this.get_selected_item(this.props.explore_page_tags_object, this.props.explore_page_tags_object['i'].active)

        if(this.props.explore_page_tags_object['i'].active != 'posts'){
            return this.props.app_state.created_posts 
        }

        if(selected_option_name == 'all'){
            return this.props.app_state.created_posts
        }
        else if(selected_option_name == 'viewed'){
            var my_viewed_posts = []
            for(var i=0; i<this.props.viewed_posts.length; i++){
                my_viewed_posts.push(this.props.app_state.created_posts[this.props.viewed_posts[i]])
            }
            return my_viewed_posts
        }
        else {
            var my_posts = []
            var myid = this.props.app_state.user_account_id
            for(var i = 0; i < this.props.app_state.created_posts.length; i++){
                var post_author = this.props.app_state.created_posts[i]['event'].returnValues.p5
                if(post_author.toString() == myid.toString()){
                    my_posts.push(this.props.app_state.created_posts[i])
                }else{
                    console.log('sender not post author: author->'+post_author+', sender id->'+myid)
                }
            }
            return my_posts
        }

        
    }

    render_post_object(object, index){
        var background_color = this.props.theme['card_background_color']
        var card_shadow_color = this.props.theme['card_shadow_color']
        var item = this.format_post_item(object)
        return(
            <div onClick={() => this.when_post_item_clicked(index)} style={{height:'auto', width:'100%', 'background-color': background_color, 'border-radius': '15px','padding':'5px 5px 0px 0px', 'max-width':'420px', 'box-shadow': '0px 0px 1px 2px '+card_shadow_color}}>
                <div style={{'padding': '5px 0px 5px 5px'}}>
                    {this.render_detail_item('1', item['tags'])}
                    <div style={{height: 10}}/>
                    <div style={{'padding': '0px 0px 0px 0px'}}>
                        {this.render_detail_item('3', item['id'])}
                    </div>
                    <div style={{'padding': '20px 0px 0px 0px'}}>
                        {this.render_detail_item('2', item['age'])}
                    </div>
                    
                </div>         
            </div>
        )
    }

    format_post_item(object){
        var tags = object['ipfs'] == null ? ['Post'] : object['ipfs'].entered_indexing_tags
        var title = object['ipfs'] == null ? 'Post ID' : object['ipfs'].entered_title_text
        var age = object['event'] == null ? 0 : object['event'].returnValues.p7
        var time = object['event'] == null ? 0 : object['event'].returnValues.p6
        return {
            'tags':{'active_tags':tags, 'index_option':'indexed'},
            'id':{'title':object['id'], 'details':title, 'size':'l'},
            'age':{'style':'s', 'title':'Block Number', 'subtitle':'??', 'barwidth':this.get_number_width(age), 'number':`block ${number_with_commas(age)}`, 'barcolor':'', 'relativepower':`${this.get_time_difference(time)}`, }
        }
    }

    when_post_item_clicked(index){
        this.props.when_post_item_clicked(index)
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
                                <div style={{height:180, width:'100%', 'background-color': background_color, 'border-radius': '15px','padding':'10px 0px 0px 10px', 'max-width':'420px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                                    <div style={{'margin':'10px 20px 0px 0px'}}>
                                        <img src={Letter} style={{height:70 ,width:'auto'}} />
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
                <div style={{overflow: 'auto', maxHeight: middle}}>
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
        return(
            <div onClick={() => this.when_channel_item_clicked(index)} style={{height:'auto', width:'100%', 'background-color': background_color, 'border-radius': '15px','padding':'5px 5px 0px 0px', 'max-width':'420px', 'box-shadow': '0px 0px 1px 2px '+card_shadow_color}}>
                <div style={{'padding': '5px 0px 5px 5px'}}>
                    {this.render_detail_item('1', item['tags'])}
                    <div style={{height: 10}}/>
                    <div style={{'padding': '0px 0px 0px 0px'}}>
                        {this.render_detail_item('3', item['id'])}
                    </div>
                    <div style={{'padding': '20px 0px 0px 0px'}}>
                        {this.render_detail_item('2', item['age'])}
                    </div>
                    
                </div>         
            </div>
        )
    }

    get_channel_items(){
        var selected_option_name = this.get_selected_item(this.props.explore_page_tags_object, this.props.explore_page_tags_object['i'].active)

        if(this.props.explore_page_tags_object['i'].active != 'channels'){
            return this.props.app_state.created_channels 
        }

        if(selected_option_name == 'all'){
            return this.props.app_state.created_channels
        }
        else if(selected_option_name == 'viewed'){
            var my_viewed_channels = []
            for(var i=0; i<this.props.viewed_channels.length; i++){
                my_viewed_channels.push(this.props.app_state.created_channels[this.props.viewed_channels[i]])
            }
            return my_viewed_channels
        }
        else {
            var my_channels = []
            var myid = this.props.app_state.user_account_id
            for(var i = 0; i < this.props.app_state.created_channels.length; i++){
                var channel_author = this.props.app_state.created_channels[i]['event'].returnValues.p5
                if(channel_author.toString() == myid.toString()){
                    my_channels.push(this.props.app_state.created_channels[i])
                }
            }
            return my_channels
        }
    }

    format_channel_item(object){
        var tags = object['ipfs'] == null ? ['Post'] : object['ipfs'].entered_indexing_tags
        var title = object['ipfs'] == null ? 'Post ID' : object['ipfs'].entered_title_text
        var age = object['event'] == null ? 0 : object['event'].returnValues.p7
        var time = object['event'] == null ? 0 : object['event'].returnValues.p6
        return {
            'tags':{'active_tags':tags, 'index_option':'indexed'},
            'id':{'title':object['id'], 'details':title, 'size':'l'},
            'age':{'style':'s', 'title':'Block Number', 'subtitle':'??', 'barwidth':this.get_number_width(age), 'number':`block ${number_with_commas(age)}`, 'barcolor':'', 'relativepower':`${this.get_time_difference(time)}`, }
        }
    }

    when_channel_item_clicked(index){
        this.props.when_channel_item_clicked(index)
    }







    render_ethers_list_group(){
        var middle = this.props.height-123;
        var size = this.props.size;
        if(size == 'l'){
            middle = this.props.height-80;
        }
        var items = this.get_ethers_data()
        return ( 
            <div style={{overflow: 'auto', maxHeight: middle}}>
                <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                    {items.map((item, index) => (
                        <li style={{'padding': '5px'}}>
                            {this.render_ethers_object(item, index)}
                        </li>
                    ))}
                    <div style={{'padding': '5px'}}>
                        {this.render_empty_object()}
                    </div>
                    <div style={{'padding': '5px'}}>
                        {this.render_empty_object()}
                    </div>
                </ul>
            </div>
        );
    }

    render_ethers_object(item, index){
        var background_color = this.props.theme['card_background_color']
        var card_shadow_color = this.props.theme['card_shadow_color']
        return ( 
            <div onClick={() => this.when_ether_object_clicked(index)} style={{height:'auto', width:'100%', 'background-color': background_color, 'border-radius': '15px','padding':'5px 5px 0px 0px', 'max-width':'420px', 'box-shadow': '0px 0px 1px 2px '+card_shadow_color}}>
                <div style={{'padding': '5px 0px 5px 5px'}}>
                    {this.render_detail_item('1', item['tags'])}
                    <div style={{height: 10}}/>
                    <div style={{'padding': '0px 10px 0px 10px'}}>
                        {this.render_detail_item('8', item['label'])}
                    </div>
                    <div style={{height: 20}}/>
                    {this.render_detail_item('2', item['number_label'])}
                </div>         
            </div>
        );
    }

    get_ethers_data(){
        return [
            {
                'name': 'Ethereum Testnet',
                'symbol': 'ETHT',
                'image': EthereumTestnet,
                'label':{'title':'ETHT', 'details':'Ethereum Testnet', 'size':'l', 'image': EthereumTestnet},
                'tags':{'active_tags':['Ethereum', 'Ether', 'EVM', 'Chain'], 'index_option':'indexed'},
                'number_label':this.get_blockchain_data('s'),
                'number_label_large': this.get_blockchain_data('l'),
                'banner-icon':{'header':'ETHT', 'subtitle':'Ethereum Testnet', 'image':EthereumTestnet},
            }
        ]
    }

    get_latest_block_data(){
        if(this.props.app_state.E15last_blocks.length  ==  0){
            return null
        }
        return this.props.app_state.E15last_blocks[0];
    }

    get_blockchain_data(size){
        return{
            'style':size,
            'title':'Number of Blocks Mined',
            'subtitle':'e?',
            'barwidth':this.get_number_width(this.props.app_state.E15number_of_blocks),
            'number':`${number_with_commas(this.props.app_state.E15number_of_blocks)} blocks`,
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

    

    when_ether_object_clicked(index){
        this.props.when_ether_object_clicked(index)
    }







    render_ends_list_group(){
        var middle = this.props.height-123;
        var size = this.props.size;
        if(size == 'l'){
            middle = this.props.height-80;
        }
        var items = this.get_exchange_tokens(3)
        return ( 
            <div style={{overflow: 'auto', maxHeight: middle}}>
                <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                    {items.map((item, index) => (
                        <li onClick={() => this.when_ends_object_clicked(index)} style={{'padding': '5px'}}>
                            {this.render_ends_object(item['data'], index, item['id'])}
                        </li>
                    ))}
                    <div style={{'padding': '5px'}}>
                        {this.render_empty_object()}
                    </div>
                    <div style={{'padding': '5px'}}>
                        {this.render_empty_object()}
                    </div>
                </ul>
            </div>
        );
    }

    get_exchange_tokens(exchange_type){
        var token_exchanges = []
        var exchanges_from_sync = this.props.app_state.created_tokens
        for (let i = 0; i < exchanges_from_sync.length; i++) {
            var type = exchanges_from_sync[i]['data'][0][3/* <3>token_type */]
            if(type == exchange_type){
                token_exchanges.push({'data': exchanges_from_sync[i]['data'], 'id':exchanges_from_sync[i]['id'], 'E5': 'E35'})
            }
        }
        return token_exchanges
    }

    render_ends_object(object_array, index, token_id){
        var background_color = this.props.theme['card_background_color']
        var card_shadow_color = this.props.theme['card_shadow_color']
        var item = this.get_exchanges_data(object_array, token_id)
        return ( 
            <div  style={{height:'auto', width:'100%', 'background-color': background_color, 'border-radius': '15px','padding':'5px 5px 0px 0px', 'max-width':'420px', 'box-shadow': '0px 0px 1px 2px '+card_shadow_color}}>
                <div style={{'padding': '5px 0px 5px 5px'}}>
                    {this.render_detail_item('1', item['tags'])}
                    <div style={{height: 10}}/>
                    <div style={{'padding': '0px 10px 0px 10px'}}>
                        {this.render_detail_item('3', item['label'])}
                    </div>
                    <div style={{height: 20}}/>
                    {this.render_detail_item('2', item['number_label'])}
                </div>         
            </div>
        );
    }

    when_ends_object_clicked(index){
        this.props.when_ends_object_clicked(index)
    }

    get_exchanges_data(object_array, token_id){
        var type = object_array[0][3/* <3>token_type */] == 3 ? 'end': 'spend'
        var img = object_array[0][3/* <3>token_type */]  == 3 ? EndImg: SpendImg
        var supply = object_array[2][2/* <2>token_exchange_liquidity/total_supply */]
        return{
            'tags':{'active_tags':[''+token_id, ''+type, 'token'], 'index_option':'indexed', 'when_tapped':''},
            'label':{'title':'Token Id: '+token_id,'details':'Token Type: '+type, 'size':'l', 'image':img},
            'number_label':{'style':'s', 'title':'', 'subtitle':'', 'barwidth':this.get_number_width(supply), 'number':`${this.format_account_balance_figure(supply)}`, 'barcolor':'#606060', 'relativepower':'balance',}
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
        return ( 
            <div style={{overflow: 'auto', maxHeight: middle}}>
                <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                    {items.map((item, index) => (
                        <li onClick={() => this.when_spends_object_item_clicked(index)} style={{'padding': '5px'}}>
                            {this.render_ends_object(item['data'], index, item['id'])}
                        </li>
                    ))}
                    <div style={{'padding': '5px'}}>
                        {this.render_empty_object()}
                    </div>
                    <div style={{'padding': '5px'}}>
                        {this.render_empty_object()}
                    </div>
                </ul>
            </div>
        );
    }

    render_spends_object(object_array, index, token_id){
        var background_color = this.props.theme['card_background_color']
        var card_shadow_color = this.props.theme['card_shadow_color']
        var item = this.get_exchanges_data(object_array, token_id)
        return ( 
            <div style={{height:'auto', width:'100%', 'background-color': background_color, 'border-radius': '15px','padding':'5px 5px 0px 0px', 'max-width':'420px', 'box-shadow': '0px 0px 1px 2px '+card_shadow_color}}>
                <div style={{'padding': '5px 0px 5px 5px'}}>
                    {this.render_detail_item('1', item['tags'])}
                    <div style={{height: 10}}/>
                    <div style={{'padding': '0px 10px 0px 10px'}}>
                        {this.render_detail_item('8', item['label'])}
                    </div>
                    <div style={{height: 20}}/>
                    {this.render_detail_item('2', item['number_label'])}
                </div>         
            </div>
        );
    }

    when_spends_object_item_clicked(index){
        console.log('selected: '+index);
        this.props.when_spends_object_clicked(index)
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



    /* renders the specific element in the post or detail object */
    render_detail_item(item_id, object_data){
        return(
            <div>
                <ViewGroups item_id={item_id} object_data={object_data} open_send_receive_ether_bottomsheet={this.props.open_send_receive_ether_bottomsheet.bind(this)} theme={this.props.theme}/>
            </div>
        )

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


}




export default PostListSection;