// Copyright (c) 2023 - Present, Bry Onyoni
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
import ViewGroups from '../../components/view_groups'
import Tags from '../../components/tags';
import TextInput from '../../components/text_input';
import NumberPicker from '../../components/number_picker';

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import { SwipeableList, SwipeableListItem } from '@sandstreamdev/react-swipeable-list';
import '@sandstreamdev/react-swipeable-list/dist/styles.css';

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

class AssessCertificatePage extends Component {
    
    state = {
        selected: 0, new_assess_certificate_title_tags_object: this.new_assess_certificate_title_tags_object(),
        exchange_id: '', price_amount:0, price_data:[], assessment_description:''
    };


    new_assess_certificate_title_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['or','',0], ['e',this.props.app_state.loc['3118']/* 'make-assessment' *//* , this.props.app_state.loc['3118a'] *//* 'record-obligation' */], [0]
            ],
        };
    }





    set_data(item, object, model_data, certificate_ui, balance, type, fractionalized_token_exchange){
        this.setState({
            token_item: object,
            depth_item: item,
            model_data: model_data,
            e5: object['e5'],
            certificate_ui: certificate_ui,
            balance: balance,
            type: type,
            fractionalized_token_exchange: fractionalized_token_exchange,
        })
    }





    render(){
        return(
            <div style={{'padding':'10px 10px 0px 10px'}}>
                <div className="row">
                    <div className="col-11" style={{'padding': '0px 0px 0px 10px'}}>
                        <Tags font={this.props.app_state.font} page_tags_object={this.state.new_assess_certificate_title_tags_object} tag_size={'l'} when_tags_updated={this.when_new_assess_certificate_title_tags_object_updated.bind(this)} theme={this.props.theme}/>
                    </div>
                    <div className="col-1" style={{'padding': '0px 0px 0px 0px'}}>
                        <div className="text-end" style={{'padding': '0px 10px 0px 0px'}} >
                            {this.render_finish_button()}
                        </div>
                    </div>
                </div>

                <div style={{'margin':'10px 0px 0px 0px'}}>
                    {this.render_everything()}   
                </div>
                
            </div>
        )
    }

    render_finish_button(){
        const selected_item = this.get_selected_item(this.state.new_assess_certificate_title_tags_object, 'e')
        if(selected_item == this.props.app_state.loc['3118']/* 'make-assessment' */){
            return(
                <div className="text-end" onClick={()=>this.finish_making_assessment_response()}>
                    {this.render_detail_item('17', {'src':this.props.theme['close'], 'style': { height:36, width:'auto' }})}
                </div>
            )
        }
    }

    when_new_assess_certificate_title_tags_object_updated(tag_obj){
        this.setState({new_assess_certificate_title_tags_object: tag_obj})
    }

    constructor(props) {
        super(props);
        this.amount_picker = React.createRef();
    }





    render_everything(){
        const selected_item = this.get_selected_item(this.state.new_assess_certificate_title_tags_object, 'e')
        if(this.state.token_item == null) return;

        if(selected_item == 'e'){
            return this.render_general_certificate_assessment_info()
        }
        else if(selected_item == this.props.app_state.loc['3118']/* 'make-assessment' */){
            return this.render_make_certificate_assessment_info()
        }
    }


    


    render_general_certificate_assessment_info(){
        var size = this.props.app_state.size
        
        if(size == 's'){
            return(
                <div>
                    {this.render_general_certificate_assessment_data()}
                    {this.render_detail_item('0')}
                    {this.render_general_certificate_assessment_data2()}
                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_general_certificate_assessment_data()}
                        {this.render_detail_item('0')}
                        {this.render_detail_item('0')}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_general_certificate_assessment_data2()}
                    </div>
                </div>
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_general_certificate_assessment_data()}
                        {this.render_detail_item('0')}
                        {this.render_detail_item('0')}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_general_certificate_assessment_data2()}
                    </div>
                </div>
            )
        }
    }

    render_general_certificate_assessment_data(){
        const item = this.state.depth_item
        const depth = item['depth']
        const depth_data = item['depth_data']
        const ipfs = item['ipfs']
        const event = item['event']
        const time = item['time']

        const data = this.state.model_data
        const name = data['class_name']
        const maximum_supply = data['maximum_supply']
        const purchase_start_time = data['purchase_start_time']
        const purchase_end_time = data['purchase_end_time']
        const now = Date.now() / 1000

        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['3118b']/* 'Certificate Value Assessment.' */, 'details':this.props.app_state.loc['3055wn']/* 'View, assess and record the obligation value of this minted certificate.' */, 'size':'l'})}
                <div style={{height: 10}}/>

                {this.state.certificate_ui}

                <div style={{height: 10}}/>

                {this.render_detail_item('3', {'title':name, 'details':this.props.app_state.loc['3055ow']/* 'Class Name' */, 'size':'l'})}
                <div style={{height: 10}}/>

                {this.render_detail_item('3', {'title': this.props.app_state.loc['3055pi']/* '$ out of %' */.replace('$', number_with_commas(depth_data['identifier'])).replace('%', number_with_commas(maximum_supply)) , 'details':this.props.app_state.loc['3055ph']/* 'Acquired Identifier out of total' */, 'size':'l'})}
                <div style={{height: 10}}/>

                {this.render_detail_item('3', {'title':this.props.app_state.loc['3098y']/* 'Minted on $' */.replace('$', (new Date(time * 1000).toLocaleString())), 'details':this.get_time_diff((Date.now()/1000) - (parseInt(time)))+this.props.app_state.loc['1698a']/* ' ago' */, 'size':'l'})}

                {this.render_detail_item('0')}

                {this.props.app_state.is_loading_certificate_owner_obligations == true ? (
                    <div>
                        {this.render_small_skeleton_object()}
                        <div style={{height: 5}}/>
                        {this.render_small_skeleton_object()}
                    </div>
                ):(
                    <div>
                        {this.render_certificate_obligation_data()}
                    </div>
                )}

            </div>
        )
    }

    render_general_certificate_assessment_data2(){
        const item = this.state.depth_item
        const depth = item['depth']
        const object = this.state.token_item
        const unsorted_certificate_assessments = this.props.app_state.certificate_assessments[object['e5_id']]?.[depth] || [];

        const certificate_assessments = this.sortByAttributeDescending(unsorted_certificate_assessments, 'time')

        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['3118s']/* 'Certificate Assessments.' */, 'details':this.props.app_state.loc['3118t']/* 'The recorded value assessments for the certificate are shown below.' */, 'size':'l'})}
                <div style={{height: 10}}/>

                {certificate_assessments.length == 0 ? (
                    <div>
                        {this.props.app_state.is_loading_certificate_owner_obligations == true ? (
                            <div>
                                {this.render_small_skeleton_object()}
                                <div style={{height: 5}}/>
                                {this.render_small_skeleton_object()}
                            </div>
                        ):(
                            <div>
                                {this.render_empty_views(2)}
                            </div>
                        )}
                    </div>
                ):(
                    <div>
                        {certificate_assessments.map((item, index) => (
                            <div>
                                {this.render_certificate_assessment_item(item)}
                                <div style={{height: 5}}/>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        )
    }

    render_certificate_assessment_item(item){
        const account = item['alias'] == null ? item['sender_account'] : item['alias']
        const e5 = item['sender_account_e5']
        const title = this.props.app_state.loc['3118u']/* 'From $' */.replace('$', number_with_commas(account))
        const details = item['assessment_description']
        const footer = this.props.app_state.loc['3118v']/* 'Recorded On $' */.replace('$', (new Date(item['time'])).toLocaleString())
        return(
            <div onClick={() => this.when_certificate_assessment_item_clicked(item)}>
                {this.render_detail_item('3', {'title':' • '+title, 'details':details, 'size':'l', 'title_image':this.props.app_state.e5s[e5].e5_img, 'footer':footer})}
            </div>
        )
    }

    when_certificate_assessment_item_clicked(assessment_item){
        const item = this.state.depth_item
        const object = this.state.token_item
        const certificate_ui = this.state.certificate_ui
        const model_data = this.state.model_data

        const assessment_contract_e5_id = assessment_item['contract_obj']
        const contract_id = parseInt(assessment_contract_e5_id.split('E')[0])
        const contract_e5 = 'E'+assessment_contract_e5_id.split('E')[1]
        this.props.load_objects(30, [contract_id], contract_e5)

        this.props.show_dialog_bottomsheet({'assesssment':assessment_item, 'item':item, 'object':object, 'certificate_ui': certificate_ui, 'model_data':model_data}, 'show_certificate_assessment_item_details')
    }

    render_certificate_obligation_data(){
        const object = this.state.token_item
        const item = this.state.depth_item
        const object_obligation_fulfiller = item['account']

        const address_key = this.props.app_state.author_address_mapping[object['e5']][object_obligation_fulfiller]
        const author_oblication_contract_object = this.props.app_state.obligation_subscriptions[address_key] || {}
        const authors_obligation_contracts = author_oblication_contract_object['data'] || [];

        if(authors_obligation_contracts.length == 0){
            return this.render_empty_views(2)
        }

        const items = this.get_owner_obligation_contracts(authors_obligation_contracts)
        return(
            <div style={{}}>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['3118f']/* 'Obligations.' */, 'details':this.props.app_state.loc['3118g']/* 'The obligations that will be used on the certificates assessments.' */, 'size':'l'})}
                <div style={{height: 10}}/>

                <div style={{ 'padding': '0px 0px 0px 0px'}}>
                    {items.map((item, index) => (
                        <div>
                            {this.render_obligation_promise_item(item)}
                            <div style={{height: 10}}/>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    render_obligation_promise_item(item){
        const contract_id = item['contract_id']
        const contract_e5 = item['contract_e5']
        const assessors_message = this.props.app_state.loc['3118c']/* '$ assessors recognised.' */.replace('$', number_with_commas(item['assessors'].length))
        const promises = item['promises']
        return(
            <div>
                {this.render_detail_item('3', {'title':' • '+number_with_commas(contract_id), 'details':assessors_message, 'size':'l', 'title_image':this.props.app_state.e5s[contract_e5].e5_img})}
                <div style={{'margin':'3px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                    <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                        {promises.map((item, index) => (
                            <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}}>
                                {this.render_detail_item('4', {'text':this.format_proportion(item), 'textsize':'10px', 'font':this.props.app_state.font})}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        )
    }

    get_object_texts(){
        const object_texts = []
        const object = this.state.token_item
        const item = this.state.depth_item

        if(object['ipfs'].markdown != null) object_texts.push(object['ipfs'].markdown)
        if(object['ipfs'].entered_title_text != null) object_texts.push(object['ipfs'].entered_title_text);
        const indexing_tags = object['ipfs'].entered_indexing_tags || object['ipfs']['tags'] || []
        indexing_tags.forEach(tag => {
            object_texts.push(tag)
        });
        if(object['ipfs'].entered_objects != null){
            object['ipfs'].entered_objects.forEach(text_object => {
                const type = text_object['type']
                const text = type == '11' ? text_object['data']['caption']['text'] : text_object['data']['text'];
                object_texts.push(text)
            });
        }

        const ipfs = item['ipfs']
        if(ipfs['entered_objects'] != null){
            ipfs['entered_objects'].forEach(text_object => {
                const type = text_object['type']
                const text = type == '11' ? text_object['data']['caption']['text'] : text_object['data']['text'];
                object_texts.push(text)
            });
        }
        if(ipfs['markdown'] != null) object_texts.push(ipfs['markdown'])

        return object_texts
    }

    get_owner_obligation_contracts(authors_obligation_contracts){
        const items = [];
        const object_texts = this.get_object_texts()

        authors_obligation_contracts.forEach(contract => {
            const configuration = this.props.app_state.my_contract_obligation_subscription_data[contract];
            const default_certificate_ownership_obligation = configuration['ipfs'].default_certificate_ownership_obligation || 0
            const keywords = configuration['ipfs'].certificate_keywords || {}
            const default_keyword_combination = configuration['ipfs'].default_keyword_combination || 1
            const value_assessor_accounts = configuration['ipfs'].value_assessor_accounts || []

            const targeted_keywords_obligations_proportions = []
            object_texts.forEach(text_to_check => {
                const words_to_check = text_to_check.toLowerCase().split(' ');
                words_to_check.forEach(word => {
                    if(keywords[word] != null){
                        targeted_keywords_obligations_proportions.push(keywords[word])
                    }
                });
            });
            const sorted_targeted_keyword_proportions = [...targeted_keywords_obligations_proportions].sort((a, b) => (a < b ? 1 : a > b ? -1 : 0)).slice(0, default_keyword_combination)


            const { am_i_an_assessor, e5 } = this.am_i_an_assessor(value_assessor_accounts)
            const balance = this.state.balance;
            const type = this.state.type
            if(sorted_targeted_keyword_proportions.length == 0){
                items.push({
                    'contract_id': parseInt(contract.split('E')[0]),
                    'contract_e5': 'E'+contract.split('E')[1],
                    'promises':[default_certificate_ownership_obligation],
                    'assessors': value_assessor_accounts,
                    'contract':contract,
                    'am_i_an_assessor': am_i_an_assessor,
                    'my_assessor_e5': e5,
                    'type':type,
                    'balance':balance,
                })
            }
            else{
                items.push({
                    'contract_id': parseInt(contract.split('E')[0]),
                    'contract_e5': 'E'+contract.split('E')[1],
                    'promises':sorted_targeted_keyword_proportions,
                    'assessors': value_assessor_accounts,
                    'contract':contract,
                    'am_i_an_assessor': am_i_an_assessor,
                    'my_assessor_e5': e5,
                    'type':type,
                    'balance':balance,
                })
            }
        });

        return items.filter((contract_obj) => {
            return (contract_obj['am_i_an_assessor'] == true)
        }).concat(items.filter((contract_obj) => {
            return (contract_obj['am_i_an_assessor'] != true)
        }));
    }

    am_i_an_assessor(value_assessor_accounts){
        let am_i_an_assessor = false;
        let e5 = null
        value_assessor_accounts.forEach(account_obj => {
            const data = this.get_data(account_obj)
            if(this.props.app_state.user_account_id[data.e5] == data.id){
                am_i_an_assessor = true;
                e5 = data.e5
            }
        });

        return { am_i_an_assessor, e5 };
    }

    get_data(item){
        var obj = item.split(':')
        return { e5: obj[0], id: obj[1]}
    }










    render_make_certificate_assessment_info(){
        var size = this.props.app_state.size
        
        if(size == 's'){
            return(
                <div>
                    {this.render_make_certificate_assessment_data()}
                    {this.render_detail_item('0')}
                    {this.render_set_prices_list_part()}
                    {this.render_detail_item('0')}
                    {this.render_detail_item('0')}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_make_certificate_assessment_data()}
                        {this.render_detail_item('0')}
                        {this.render_detail_item('0')}
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_set_prices_list_part()}
                    </div>
                </div>
            )
        }
        else if(size == 'l'){
            return(
                <div className="row">
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_make_certificate_assessment_data()}
                        {this.render_detail_item('0')}
                        {this.render_detail_item('0')}
                    </div>
                    <div className="col-5" style={{'padding': '10px 10px 10px 10px'}}>
                        {this.render_set_prices_list_part()}
                    </div>
                </div>
            )
        }
    }

    render_make_certificate_assessment_data(){
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['3118d']/* 'Record New Assessment' */, 'details':this.props.app_state.loc['3118e']/* 'Select your contract below, then set the details for your valuation of this certificate. */, 'size':'l'})}

                {this.render_my_assessment_contracts()}

                {this.render_detail_item('0')}

                {this.render_detail_item('3', {'title':this.props.app_state.loc['3118h']/* 'Assessment Description.' */, 'details':this.props.app_state.loc['3118i']/* 'A description of the assessment you are giving the minted certificate.' */, 'size':'l'})}
                <div style={{height:10}}/>

                <TextInput font={this.props.app_state.font} height={70} placeholder={this.props.app_state.loc['3118j']/* 'Assessment Description...' */} when_text_input_field_changed={this.when_assessment_description_input_field_changed.bind(this)} text={this.state.assessment_description} theme={this.props.theme}/>
                {this.render_detail_item('10',{'font':this.props.app_state.font, 'textsize':'10px','text':this.props.app_state.loc['124']+(this.props.app_state.entered_text_max_length - this.state.assessment_description.length)})}

                {this.render_detail_item('0')}

                {this.render_detail_item('3', {'title':this.props.app_state.loc['3118k']/* 'Certificate\'s Value.' */, 'details':this.props.app_state.loc['3118l']/* 'Set and ascribe the value of the certificate according to your assessment.' */, 'size':'l'})}
                <div style={{height:10}}/>
                
                <TextInput font={this.props.app_state.font} height={30} placeholder={this.props.app_state.loc['1332d']/* 'Exchange ID' */} when_text_input_field_changed={this.when_exchange_id_input_field_changed.bind(this)} text={this.state.exchange_id} theme={this.props.theme}/>

                {this.load_token_suggestions('exchange_id')}
                <div style={{height: 10}}/>

                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.props.app_state.loc['1324']/* 'Price' */, 'number':this.state.price_amount, 'relativepower':this.props.app_state.loc['1325']/* 'tokens' */})}>
                    {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['1324']/* 'Price' */, 'subtitle':this.format_power_figure(this.state.price_amount), 'barwidth':this.calculate_bar_width(this.state.price_amount), 'number':this.format_account_balance_figure(this.state.price_amount), 'barcolor':'', 'relativepower':this.props.app_state.loc['1325']/* 'tokens' */, })}
                </div>

                <NumberPicker clip_number={this.props.app_state.clip_number} ref={this.amount_picker} font={this.props.app_state.font} number_limit={bigInt('1e'+(this.get_power_limit_for_exchange(this.state.exchange_id)+9))} when_number_picker_value_changed={this.when_price_amount.bind(this)} theme={this.props.theme} power_limit={this.get_power_limit_for_exchange(this.state.exchange_id)} pick_with_text_area={true} text_area_hint={'10000'} />

                <div style={{'padding': '5px'}} onClick={() => this.when_add_price_set()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['3118m']/* 'Add Valuation' */, 'action':''})}
                </div>

            </div>
        )
    }

    render_my_assessment_contracts(){
        const object = this.state.token_item
        const item = this.state.depth_item
        const object_obligation_fulfiller = item['account']

        const address_key = this.props.app_state.author_address_mapping[object['e5']][object_obligation_fulfiller]
        const author_oblication_contract_object = this.props.app_state.obligation_subscriptions[address_key] || {}
        const authors_obligation_contracts = author_oblication_contract_object['data'] || [];

        const items = this.get_owner_obligation_contracts(authors_obligation_contracts).filter((contract_obj) => {
            return (contract_obj['am_i_an_assessor'] == true)
        })

        const render_contract_item = (item) => {
            const contract_id = item['contract_id']
            const contract_e5 = item['contract_e5']
            const assessors_message = this.props.app_state.loc['3118c']/* '$ assessors recognised.' */.replace('$', number_with_commas(item['assessors'].length))
            const promise_text = this.props.app_state.loc['3118p']/* '$ promises.' */.replace('$', item['promises'].length)
            return(
                <div>
                    {this.render_detail_item('3', {'title':' • '+number_with_commas(contract_id), 'details':assessors_message, 'size':'s', 'title_image':this.props.app_state.e5s[contract_e5].e5_img, 'footer':promise_text})}
                </div>
            )
        }

        const when_contract_clicked = (item) => {
            this.setState({selected_obligation_contract: item})
        }
        const items2 = [0, 1]
        return(
            <div>
                <div style={{'margin':'3px 0px 0px 0px','padding': '0px 0px 0px 0px', 'background-color': 'transparent'}}>
                    <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '1px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                        {items.map((item, index) => (
                            <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}} onClick={() => when_contract_clicked(item)}>
                                {render_contract_item(item)}
                                {
                                this.state.selected_obligation_contract != null && 
                                this.state.selected_obligation_contract['contract_id'] == item['contract_id'] && 
                                this.state.selected_obligation_contract['contract_e5'] == item['contract_e5'] && 
                                (
                                    <div style={{height:'1px', 'background-color':this.props.app_state.theme['line_color'], 'margin': '3px 5px 0px 5px'}}/>
                                )}
                            </li>
                        ))}
                        {items.length == 0 && items2.map(() => (
                            <li style={{'display': 'inline-block', 'margin': '1px 2px 1px 2px', '-ms-overflow-style':'none'}}>
                                {this.render_empty_horizontal_list_item()}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        )
    }

    when_assessment_description_input_field_changed(text){
        if(text.length > this.props.app_state.entered_text_max_length) return;
        this.setState({assessment_description: text})
    }

    when_exchange_id_input_field_changed(text){
        this.setState({exchange_id: text})
        this.reset_the_number_picker()
    }

    get_power_limit_for_exchange(exchange){
        var exchange_id = this.get_token_id_from_symbol(exchange.trim())

        if(!isNaN(exchange_id) && parseInt(exchange_id) > 0 && exchange_id != '' && this.does_exchange_exist(exchange_id)){
            var target_exchange_data = this.props.app_state.created_token_object_mapping[this.props.app_state.selected_e5][exchange_id]
            var default_depth = 0;
            if(target_exchange_data != null){
                target_exchange_data = target_exchange_data['ipfs']
                if(target_exchange_data != null){
                    default_depth = target_exchange_data.default_depth == null ? 0 : target_exchange_data.default_depth
                }
            }

            return (default_depth*72)+63
        }
        else{
            return 63
        }
    }

    reset_the_number_picker(){
        var me = this;
        setTimeout(function() {
            if(me.amount_picker.current != null){
                me.amount_picker.current.reset_number_picker()
            }
        }, (1 * 1000));  
    }

    when_price_amount(amount){
        this.setState({price_amount: amount})
    }

    when_add_price_set(){
        var exchange_id = this.get_token_id_from_symbol(this.state.exchange_id.trim())
        var amount = this.state.price_amount
        if(isNaN(exchange_id) || parseInt(exchange_id) < 0 || exchange_id == '' || !this.does_exchange_exist(exchange_id)){
            this.props.notify(this.props.app_state.loc['1327']/* 'Please put a valid exchange ID.' */, 2600)
        }
        else if(amount == 0){
            this.props.notify(this.props.app_state.loc['1328']/* 'Please put a valid amount.' */, 3600)
        }
        else if(this.is_exchange_already_added(exchange_id)){
            this.props.notify(this.props.app_state.loc['1329']/* 'You cant use the same exchange twice.' */, 3600)
        }
        else{
            var price_data_clone = this.state.price_data.slice()
            price_data_clone.push({'id':exchange_id, 'amount':amount})
            this.setState({price_data: price_data_clone, exchange_id:''});
        }
    }

    is_exchange_already_added(exchange_id){
        if(this.get_item_in_array(exchange_id, this.state.price_data) == null){
            return false
        }
        return true
    }

    get_item_in_array(exchange_id, object_array){
        var object = object_array.find(x => x['id'] === exchange_id);
        return object
    }

    get_token_id_from_symbol(typed_search){
        if(!isNaN(typed_search)){
            return typed_search
        }
        var id = this.props.app_state.token_directory[this.state.e5][typed_search.toUpperCase()] == null ? typed_search : this.props.app_state.token_directory[this.state.e5][typed_search.toUpperCase()]

        return id
    }

    does_exchange_exist(exchange_id){
        if(this.props.app_state.created_token_object_mapping[this.state.e5][parseInt(exchange_id)] == null){
            return false
        }
        return true
    }

    render_set_prices_list_part(){
        var middle = this.props.height-300;
        var size = this.props.size;
        if(size == 'm'){
            middle = this.props.height-100;
        }
        var items = [].concat(this.state.price_data)

        if(items.length == 0){
            items = [0,3,0]
            return(
                <div style={{}}>
                    {this.render_empty_views(3)}
                </div>
            )
        }else{
            return(
                <div style={{}}>
                    <style>{`
                    .swipeable-list-item__content {
                        background-color: transparent !important;
                    }
                `}</style>
                    <ul style={{ 'padding': '0px 0px 0px 0px', 'list-style':'none'}}>
                        <SwipeableList>
                        {items.reverse().map((item, index) => (
                                <SwipeableListItem
                                    swipeLeft={{
                                    content: <p style={{'color': this.props.theme['primary_text_color']}}>{this.props.app_state.loc['2751']/* Delete */}</p>,
                                    action: () =>this.when_amount_clicked(item)
                                    }}>
                                    <div style={{width:'100%', /* 'background-color':this.props.theme['send_receive_ether_background_color'] */}}>
                                        <li style={{'padding': '5px'}}>
                                            <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }} onClick={() => this.props.view_number({'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[this.state.e5+item['id']], 'number':item['amount'], 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['id']]})}>
                                                {this.render_detail_item('2', { 'style':'l', 'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[this.state.e5+item['id']], 'subtitle':this.format_power_figure(item['amount']), 'barwidth':this.calculate_bar_width(item['amount']), 'number':this.format_account_balance_figure(item['amount']), 'barcolor':'', 'relativepower':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[item['id']], })}
                                            </div>
                                        </li>
                                    </div>
                                </SwipeableListItem>
                        ))}
                        </SwipeableList>
                    </ul>
                </div>
            )
        }
        
    }

    when_amount_clicked(item){
        var cloned_array = this.state.price_data.slice()
        const index = cloned_array.indexOf(item);
        if (index > -1) { // only splice array when item is found
            cloned_array.splice(index, 1); // 2nd parameter means remove one item only
        }
        this.setState({price_data: cloned_array})
    }
















    load_token_suggestions(target_type){
        var items = [].concat(this.get_suggested_tokens())
        var background_color = this.props.theme['card_background_color']
        var card_shadow_color = this.props.theme['card_shadow_color']
        return(
            <div style={{'margin':'0px 0px 0px 5px','padding': '5px 0px 7px 0px', width: '97%', 'background-color': 'transparent'}}>
                    <ul style={{'list-style': 'none', 'padding': '0px 0px 5px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '13px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                      {items.map((item, index) => (
                          <li style={{'display': 'inline-block', 'margin': '5px 5px 5px 5px', '-ms-overflow-style': 'none'}} onClick={() => this.when_price_suggestion_clicked(item, index, target_type)}>
                              {this.render_detail_item('14', item['label'])}
                          </li>
                      ))}
                  </ul>
                </div>
        )
    }

    get_suggested_tokens(){
        var items = [
            {'id':'3', 'label':{'title':this.props.app_state.loc['3078']/* END */, 'details':this.props.app_state.selected_e5, 'size':'s', 'image':this.props.app_state.e5s[this.props.app_state.selected_e5].end_image, 'img_size':30}},
            {'id':'5', 'label':{'title':this.props.app_state.loc['3079']/* SPEND */, 'details':this.props.app_state.selected_e5.replace('E', '3'), 'size':'s', 'image':this.props.app_state.e5s[this.props.app_state.selected_e5].spend_image, 'img_size':30}},
        ];
        var exchanges_from_sync = this.props.app_state.created_tokens[this.props.app_state.selected_e5]
        var sorted_token_exchange_data = []
        // var myid = this.props.app_state.user_account_id
        for (let i = 0; i < exchanges_from_sync.length; i++) {
            var exchange_e5 = exchanges_from_sync[i]['e5']
            var myid = this.props.app_state.user_account_id[exchange_e5]

            var author_account = exchanges_from_sync[i]['event'] == null ? '':exchanges_from_sync[i]['event'].returnValues.p3.toString() 
            if(author_account == myid.toString()){
                sorted_token_exchange_data.push(exchanges_from_sync[i])
            }
        }
        sorted_token_exchange_data.reverse()
        for (let i = 0; i < exchanges_from_sync.length; i++) {
            if(!sorted_token_exchange_data.includes(exchanges_from_sync[i]) && exchanges_from_sync[i]['balance'] != 0 && exchanges_from_sync[i]['event'] != null){
                sorted_token_exchange_data.push(exchanges_from_sync[i])
            }
        }

        for (let i = 0; i < sorted_token_exchange_data.length; i++) {
            items.push({'id':sorted_token_exchange_data[i]['id'], 'label':{'title':sorted_token_exchange_data[i]['ipfs'].entered_symbol_text, 'details':sorted_token_exchange_data[i]['ipfs'].entered_title_text, 'size':'s', 'image':(sorted_token_exchange_data[i]['ipfs'].token_image == null ? (sorted_token_exchange_data[i]['data'][0][3/* <3>token_type */] == 3 ? this.props.app_state.static_assets['end_img']:this.props.app_state.static_assets['spend_img']) : sorted_token_exchange_data[i]['ipfs'].token_image), 'img_size':30}})
        }

        return items;
    }

    when_price_suggestion_clicked(item, pos){
        this.setState({exchange_id: item['id'].toString()})
        this.reset_the_number_picker()
    }











    async finish_making_assessment_response(){
        const price_data = this.state.price_data;
        const assessment_description = this.state.assessment_description.trim()
        const selected_obligation_contract = this.state.selected_obligation_contract;
        const fractionalized_token_exchange = this.state.fractionalized_token_exchange;
        const object = this.state.token_item
        const item = this.state.depth_item

        if(price_data.length == 0){
            this.props.notify(this.props.app_state.loc['3118n']/* 'You need to specify some amounts first.' */, 9000)
        }
        else if(assessment_description == ''){
            this.props.notify(this.props.app_state.loc['3118o']/* 'type something' */, 3000)
        }
        else if(selected_obligation_contract == null){
            this.props.notify(this.props.app_state.loc['3118q']/* 'You havent selected the contract you represent.' */, 3000)
        }
        else{
            await this.props.emit_certificate_assessment_for_account_obligation(price_data, assessment_description, selected_obligation_contract, object, item, fractionalized_token_exchange)
        }
    }











    render_empty_horizontal_list_item(){
        var background_color = this.props.theme['view_group_card_item_background']
        return(
            <div>
                <div style={{height:57, width:85, 'background-color': background_color, 'border-radius': '8px','padding':'10px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                    <div style={{'margin':'0px 0px 0px 0px'}}>
                        <img src={this.props.app_state.theme['letter']} style={{height:20 ,width:'auto'}} />
                    </div>
                </div>
            </div>
        )
    }

    render_small_skeleton_object(){
        const styles = {
            container: {
                position: 'relative',
                width: '100%',
                height: 60,
                borderRadius: '15px',
                overflow: 'hidden',
            },
            skeletonBox: {
                width: '100%',
                height: '100%',
                borderRadius: '15px',
            },
            centerImage: {
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 'auto',
                height: 30,
                objectFit: 'contain',
                opacity: 0.9,
            },
        };
        return(
            <div>
                <SkeletonTheme baseColor={this.props.theme['loading_base_color']} highlightColor={this.props.theme['loading_highlight_color']}>
                    <div style={styles.container}>
                        <Skeleton style={styles.skeletonBox} />
                        <img src={this.props.app_state.theme['letter']} alt="" style={styles.centerImage} />
                    </div>
                </SkeletonTheme>
            </div>
        )
    }

    render_empty_object(){
        var background_color = this.props.theme['card_background_color']
        return(
                <div style={{height:160, width:'100%', 'background-color': background_color, 'border-radius': '15px','padding':'10px 0px 0px 10px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                    <div style={{'margin':'10px 20px 0px 0px'}}>
                        <img src={this.props.app_state.theme['letter']} style={{height:60 ,width:'auto'}} />
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

    get_all_sorted_objects(object){
        var all_objects = []
        for(var i=0; i<this.props.app_state.e5s['data'].length; i++){
            var e5 = this.props.app_state.e5s['data'][i]
            var e5_objects = object[e5]
            if(e5_objects != null){
                all_objects = all_objects.concat(e5_objects)
            }
        }
        return this.sortByAttributeDescending(all_objects, 'timestamp')
    }

    sortByAttributeDescending(array, attribute) {
        return array.sort((a, b) => {
            if (a[attribute] < b[attribute]) {
            return 1;
            }
            if (a[attribute] > b[attribute]) {
            return -1;
            }
            return 0;
        });
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

    /* renders the specific element in the post or detail object */
    render_detail_item(item_id, object_data){
        var uploaded_data = {}
        if(item_id == '3' || item_id == '7' || item_id == '8'|| item_id == '9' || item_id == '11' || item_id == '12' || item_id == '13' || item_id == '14') uploaded_data = this.props.app_state.uploaded_data
        return(
            <div>
                <ViewGroups token_name_thumbnail_directory={this.props.app_state?.token_name_thumbnail_directory} e5s={this.props.app_state?.e5s} uploaded_data={uploaded_data} graph_type={this.props.app_state.graph_type} font={this.props.app_state.font} item_id={item_id} object_data={object_data} theme={this.props.theme} width={this.props.app_state.width}  show_images={this.props.show_images.bind(this)}
                />
            </div>
        )

    }


    format_proportion(proportion){
        return ((proportion/10**18) * 100)+'%';
    }

    format_account_balance_figure(amount){
        if(amount == null){
            amount = 0;
        }
        if(amount < 1_000_000_000){
            return number_with_commas(amount.toString())
        }else{
            var power = amount.toLocaleString('fullwide', {useGrouping:false}).length - 9
            return number_with_commas(amount.toLocaleString('fullwide', {useGrouping:false}).substring(0, 9)) +'e'+power
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

    format_power_figure(amount){
        if(amount == null){
            amount = 0;
        }
        if(amount < 1_000_000_000){
            return 'e0'
        }
        else{
            var power = amount.toLocaleString('fullwide', {useGrouping:false}).length - 9
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

    get_time_from_now(time){
        var number_date = Math.round(parseInt(time));
        var now = Math.round(new Date().getTime()/1000);

        var diff = number_date - now;
        return this.get_time_diff(diff)
    }

    get_time_diff(diff){
        if(diff < 60){//less than 1 min
            var num = parseInt(diff)
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




export default AssessCertificatePage;