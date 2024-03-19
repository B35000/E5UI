import React, { Component } from 'react';
import ViewGroups from '../../components/view_groups'
import Tags from '../../components/tags';
import TextInput from '../../components/text_input';
import NumberPicker from '../../components/number_picker';

import Letter from '../../assets/letter.png';

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

class ModifyTokenPage extends Component {
    
    state = {
        selected: 0,id:makeid(8),type:this.props.app_state.loc['997']/* 'modify-token' */, entered_indexing_tags:[this.props.app_state.loc['998']/* 'modify' */, this.props.app_state.loc['999']/* 'token' */, this.props.app_state.loc['881']/* 'authority' */],
        token_item:{'data':[[],[0,0,0,0,0,0,0], [],[],[]]}, modify_token_title_tags_object:this.get_modify_token_title_tags_object(), reconfig_items_tags_object: this.get_reconfig_items_tags_object(),

        new_token_halving_type_tags_object: this.get_new_token_halving_type_tags_object(),
        new_token_block_limit_sensitivity_tags_object: this.get_new_token_block_limit_sensitivity_tags_object(),

        reconfig_number:0, reconfig_proportion:0, reconfig_duration:0, reconfig_target_id:'',
        reconfig_values:[], new_price_number:0
    };

    get_modify_token_title_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e',this.props.app_state.loc['997']/* 'modify-token' */], [1]
            ],
        };
    }

    get_reconfig_items_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e',this.props.app_state.loc['326']/* 'Buy Limit' */,this.props.app_state.loc['327']/* 'Trust Fee' */, this.props.app_state.loc['328']/* 'Sell Limit' */, this.props.app_state.loc['329']/* 'Minimum Time Between Swap' */, this.props.app_state.loc['330']/* 'Minimum Transactions Between Swap' */, this.props.app_state.loc['331']/* 'Minimum Blocks Between Swap' */, this.props.app_state.loc['332']/* 'Minimum Entered Contracts Between Swap' */, this.props.app_state.loc['333']/* 'Minimum Transactions For First Buy' */, this.props.app_state.loc['334']/* 'Minimum Entered Contracts For First Buy' */, this.props.app_state.loc['335']/* 'Block Limit' */, this.props.app_state.loc['336']/* 'Halving type' */, this.props.app_state.loc['337']/* 'Maturity Limit' */, this.props.app_state.loc['338']/* 'Internal Block Halving Proportion' */, this.props.app_state.loc['339']/* 'Block Limit Reduction Proportion' */, this.props.app_state.loc['340']/* 'Block Reset Limit' */, this.props.app_state.loc['341']/* 'Block Limit Sensitivity' */, this.props.app_state.loc['861a']/* 'prices' */], [1]
            ],
        };
    }

    get_new_token_halving_type_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e',this.props.app_state.loc['1000']/* 'fixed' */, this.props.app_state.loc['1001']/* 'spread' */], [1]
            ],
        };
    }

    get_new_token_block_limit_sensitivity_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e','1', '2', '3', '4', '5'], [1]
            ],
        };
    }


    render(){
        return(
            <div style={{'padding':'10px 20px 0px 10px'}}>

                <div className="row">
                    <div className="col-9" style={{'padding': '5px 0px 0px 10px'}}>
                        <Tags font={this.props.app_state.font} page_tags_object={this.state.modify_token_title_tags_object} tag_size={'l'} when_tags_updated={this.when_modify_token_title_tags_object_updated.bind(this)} theme={this.props.theme}/>
                    </div>
                    <div className="col-3" style={{'padding': '0px 0px 0px 0px'}}>
                        <div style={{'padding': '5px'}} onClick={()=>this.finish()}>
                            {this.render_detail_item('5', {'text':this.props.app_state.loc['4']/* 'Finish' */, 'action':''})}
                        </div>
                    </div>
                </div>

                {this.render_everything()}

            </div>
        )
    }

    when_modify_token_title_tags_object_updated(tag_obj){
        this.setState({modify_token_title_tags_object: tag_obj})
    }


    render_everything(){
        return(
            <div>
                {this.render_detail_item('4', {'font':this.props.app_state.font, 'textsize':'13px', 'text':this.props.app_state.loc['1002']/* 'Make changes to the configuration of the token ID: ' */+this.state.token_item['id']})}

                {this.render_detail_item('0')}

                <Tags font={this.props.app_state.font} page_tags_object={this.state.reconfig_items_tags_object} tag_size={'l'} when_tags_updated={this.when_reconfig_items_tags_object_object_updated.bind(this)} theme={this.props.theme}/>
                <div style={{height:10}}/>
                {this.load_reconfig_item_selectors()}
                <div style={{height:20}}/>

                {this.load_reconfig_items()}
            </div>
        )
    }

    get_selected_item(object, option){
        var selected_item = object[option][2][0]
        var picked_item = object[option][1][selected_item];
        return picked_item
    }


    when_reconfig_items_tags_object_object_updated(tag_obj){
        this.setState({reconfig_items_tags_object: tag_obj})
        this.reset_the_number_picker()
    }

    constructor(props) {
        super(props);
        this.number_picker_ref = React.createRef();
    }


    reset_the_number_picker(){
        var me = this;
        setTimeout(function() {
            if(me.number_picker_ref.current != null){
                me.number_picker_ref.current.reset_number_picker()
            }
        }, (1 * 500));  
    }

    load_reconfig_item_selectors(){
        var selected_item = this.get_selected_item(this.state.reconfig_items_tags_object, this.state.reconfig_items_tags_object['i'].active)

        if(selected_item == 'e'){
            return(<div></div>)
        }

        if(selected_item == this.props.app_state.loc['861a']/* 'prices' */){
            return(
                <div>
                    {this.render_prices_picker()}
                </div>
            )
        }

        var properties = this.get_target_configuration(selected_item)
        var ui = properties['picker']
        if(ui == 'number'){
            return(
                <div>
                    <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                        {this.render_detail_item('2', { 'style':'l', 'title':selected_item, 'subtitle':this.format_power_figure(this.state.reconfig_number), 'barwidth':this.calculate_bar_width(this.state.reconfig_number), 'number':this.format_account_balance_figure(this.state.reconfig_number), 'barcolor':'', 'relativepower':this.props.app_state.loc['1003']/* 'units' */, })}
                    </div>

                    <div style={{height:10}}/>
                    {this.render_current_items(properties, selected_item)}

                    <NumberPicker font={this.props.app_state.font} ref={this.number_picker_ref} number_limit={bigInt('1e72')} when_number_picker_value_changed={this.when_amount_changed.bind(this)} theme={this.props.theme} power_limit={properties['powerlimit']}/>

                    <div style={{height:20}}/>
                    <div style={{'padding': '5px'}} onClick={()=>this.add_reconfiguration_item()}>
                        {this.render_detail_item('5', {'text':this.props.app_state.loc['1004']/* 'Add Change' */, 'action':''})}
                    </div>
                </div>
            )
        }
        else if(ui == 'proportion'){
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.format_proportion(this.state.reconfig_proportion), 'details':selected_item, 'size':'l'})}

                    <div style={{height:10}}/>
                    {this.render_current_items(properties, selected_item)}

                    <NumberPicker font={this.props.app_state.font} ref={this.number_picker_ref} number_limit={bigInt('1e18')} when_number_picker_value_changed={this.when_proportion_changed.bind(this)} power_limit={properties['powerlimit']} theme={this.props.theme} />

                    <div style={{height:20}}/>
                    <div style={{'padding': '5px'}} onClick={()=>this.add_reconfiguration_item()}>
                        {this.render_detail_item('5', {'text':this.props.app_state.loc['1004']/* 'Add Change' */, 'action':''})}
                    </div>
                </div>
            )
        }
        else if(ui == 'time'){
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.get_time_diff(this.state.reconfig_duration), 'details':selected_item, 'size':'l'})}

                    <div style={{height:10}}/>
                    {this.render_current_items(properties, selected_item)}

                    <NumberPicker font={this.props.app_state.font} ref={this.number_picker_ref} number_limit={bigInt('1e72')} when_number_picker_value_changed={this.when_time_changed.bind(this)} theme={this.props.theme} power_limit={properties['powerlimit']}/>
                    <div style={{height:20}}/>
                    <div style={{'padding': '5px'}} onClick={()=>this.add_reconfiguration_item()}>
                        {this.render_detail_item('5', {'text':this.props.app_state.loc['1004']/* 'Add Change' */, 'action':''})}
                    </div>
                </div>
            )
        }
        else if(ui == 'tag'){
            return(
                <div>
                    {this.load_tags_ui()}

                    <div style={{height:10}}/>
                    {this.render_current_items(properties, selected_item)}

                    <div style={{'padding': '5px'}} onClick={()=>this.add_reconfiguration_item()}>
                        {this.render_detail_item('5', {'text':this.props.app_state.loc['1004']/* 'Add Change' */, 'action':''})}
                    </div>
                </div>
            )
        }
        else if(ui == 'id'){
            return(
                <div>
                    <TextInput font={this.props.app_state.font} height={30} placeholder={this.props.app_state.loc['1005']/* 'Target ID...' */} when_text_input_field_changed={this.when_reconfig_target_id_text_input_field_changed.bind(this)} text={this.state.reconfig_target_id} theme={this.props.theme}/>

                    {this.load_account_suggestions('reconfig_target_id')}

                    <div style={{height:10}}/>
                    {this.render_current_items(properties, selected_item)}

                    <div style={{height:20}}/>
                    <div style={{'padding': '5px'}} onClick={()=>this.add_reconfiguration_item()}>
                        {this.render_detail_item('5', {'text':this.props.app_state.loc['1004']/* 'Add Change' */, 'action':''})}
                    </div>
                </div>
            )
        }
    }

    render_current_items(properties, selected_item){
        var ui = properties['picker']
        var current_value = this.state.token_item['data'][properties['position'][0]][properties['position'][1]]
        if(ui == 'number'){
            return(
                <div>
                    <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                        {this.render_detail_item('2', { 'style':'l', 'title':this.props.app_state.loc['1006']/* 'Current ' */+selected_item, 'subtitle':this.format_power_figure(current_value), 'barwidth':this.calculate_bar_width(current_value), 'number':this.format_account_balance_figure(current_value), 'barcolor':'', 'relativepower':this.props.app_state.loc['1003']/* 'units' */, })}
                    </div>
                </div>
            )
        }
        else if(ui == 'proportion'){
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.format_proportion(current_value), 'details':this.props.app_state.loc['1006']/* 'Current ' */+selected_item, 'size':'l'})}
                </div>
            )
        }
        else if(ui == 'time'){
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.get_time_diff(current_value), 'details':this.props.app_state.loc['1007']/* 'Current Value' */, 'size':'l'})}
                </div>
            )
        }
        else if(ui == 'tag'){
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.get_tag_selected_item(selected_item, current_value), 'details':this.props.app_state.loc['1007']/* 'Current Value' */, 'size':'l'})}
                </div>
            )
        }
        else if(ui == 'id'){
            return(
                <div>
                    {this.render_detail_item('3', {'title':current_value, 'details':this.props.app_state.loc['1007']/* 'Current Value' */, 'size':'l'})}
                </div>
            )
        } 
    }

    when_amount_changed(number){
        this.setState({reconfig_number: number})
    }

    when_proportion_changed(number){
        this.setState({reconfig_proportion: number})
    }

    when_time_changed(number){
        this.setState({reconfig_duration: number})
    }

    when_reconfig_target_id_text_input_field_changed(text){
        this.setState({reconfig_target_id: text})
    }

    get_target_configuration(property){
        var obj = {
            'Buy Limit':{'position':[1,0], 'picker':'number', 'powerlimit':63},
            'Trust Fee':{'position':[1,7], 'picker':'proportion', 'powerlimit':9}, 
            'Sell Limit':{'position':[1,11], 'picker':'number', 'powerlimit':63}, 
            'Minimum Time Between Swap':{'position':[1,4], 'picker':'time', 'powerlimit':63}, 
            'Minimum Transactions Between Swap':{'position':[1,2], 'picker':'number', 'powerlimit':63}, 
            'Minimum Blocks Between Swap':{'position':[1,3], 'picker':'number', 'powerlimit':63}, 
            'Minimum Entered Contracts Between Swap':{'position':[1,13], 'picker':'number', 'powerlimit':63}, 
            'Minimum Transactions For First Buy':{'position':[1,17], 'picker':'number', 'powerlimit':63}, 
            'Minimum Entered Contracts For First Buy':{'position':[1,18], 'picker':'number', 'powerlimit':63}, 
            'Block Limit':{'position':[1,1], 'picker':'number', 'powerlimit':63}, 
            'Halving type':{'position':[1,15], 'picker':'tag', 'powerlimit':63}, 
            'Maturity Limit':{'position':[1,16], 'picker':'number', 'powerlimit':63}, 
            'Internal Block Halving Proportion':{'position':[1,5], 'picker':'proportion', 'powerlimit':9}, 
            'Block Limit Reduction Proportion':{'position':[1,6], 'picker':'proportion', 'powerlimit':9}, 
            'Block Reset Limit':{'position':[1,8], 'picker':'number', 'powerlimit':63}, 
            'Block Limit Sensitivity':{'position':[1,12], 'picker':'tag', 'powerlimit':63}, 
            'Exchange Ratio X':{'position':[2,0], 'picker':'number', 'powerlimit':63}, 
            'Exchange Ratio Y':{'position':[2,1], 'picker':'number', 'powerlimit':63},
        }

        obj[this.props.app_state.loc['326']]/* 'Buy Limit' */ = {'position':[1,0], 'picker':'number', 'powerlimit':63}
        obj[this.props.app_state.loc['327']]/* 'Trust Fee' */ = {'position':[1,7], 'picker':'proportion', 'powerlimit':9}
        obj[this.props.app_state.loc['328']]/* 'Sell Limit' */ = {'position':[1,11], 'picker':'number', 'powerlimit':63} 
        obj[this.props.app_state.loc['329']]/* 'Minimum Time Between Swap' */ = {'position':[1,4], 'picker':'time', 'powerlimit':63}
        obj[this.props.app_state.loc['330']]/* 'Minimum Transactions Between Swap' */ = {'position':[1,2], 'picker':'number', 'powerlimit':63} 
        obj[this.props.app_state.loc['331']]/* 'Minimum Blocks Between Swap' */ = {'position':[1,3], 'picker':'number', 'powerlimit':63} 
        obj[this.props.app_state.loc['332']]/* 'Minimum Entered Contracts Between Swap' */ = {'position':[1,13], 'picker':'number', 'powerlimit':63} 
        obj[this.props.app_state.loc['333']]/* 'Minimum Transactions For First Buy' */ = {'position':[1,17], 'picker':'number', 'powerlimit':63} 
        obj[this.props.app_state.loc['334']]/* 'Minimum Entered Contracts For First Buy' */ = {'position':[1,18], 'picker':'number', 'powerlimit':63} 
        obj[this.props.app_state.loc['335']]/* 'Block Limit' */ = {'position':[1,1], 'picker':'number', 'powerlimit':63}
        obj[this.props.app_state.loc['336']]/* 'Halving type' */ = {'position':[1,15], 'picker':'tag', 'powerlimit':63}
        obj[this.props.app_state.loc['337']]/* 'Maturity Limit' */ = {'position':[1,16], 'picker':'number', 'powerlimit':63}
        obj[this.props.app_state.loc['338']]/* 'Internal Block Halving Proportion' */ = {'position':[1,5], 'picker':'proportion', 'powerlimit':9} 
        obj[this.props.app_state.loc['339']]/* 'Block Limit Reduction Proportion' */ = {'position':[1,6], 'picker':'proportion', 'powerlimit':9} 
        obj[this.props.app_state.loc['340']]/* 'Block Reset Limit' */ = {'position':[1,8], 'picker':'number', 'powerlimit':63} 
        obj[this.props.app_state.loc['341']]/* 'Block Limit Sensitivity' */ = {'position':[1,12], 'picker':'tag', 'powerlimit':63} 
        obj[this.props.app_state.loc['395']]/* 'Exchange Ratio X' */ = {'position':[2,0], 'picker':'number', 'powerlimit':63} 
        obj[this.props.app_state.loc['396']]/* 'Exchange Ratio Y' */ = {'position':[2,1], 'picker':'number', 'powerlimit':63}


        return obj[property]
    }


    load_tags_ui(){
        var selected_item = this.get_selected_item(this.state.reconfig_items_tags_object, this.state.reconfig_items_tags_object['i'].active)

        if(selected_item == this.props.app_state.loc['1008']/* 'Halving type' */){
            return(
                <div>
                    {this.render_detail_item('4', {'text':selected_item, 'textsize':'15px', 'font':this.props.app_state.font})}
                    
                    <div style={{height:20}}/>
                    <Tags font={this.props.app_state.font} page_tags_object={this.state.new_token_halving_type_tags_object} tag_size={'l'} when_tags_updated={this.when_new_token_halving_type_tags_object.bind(this)} theme={this.props.theme}/>
                </div>
            )
        }
        else if(selected_item == this.props.app_state.loc['1009']/* 'Block Limit Sensitivity' */){
            return(
                <div>
                    {this.render_detail_item('4', {'text':selected_item, 'textsize':'15px', 'font':this.props.app_state.font})}
                    
                    <div style={{height:20}}/>
                    <Tags font={this.props.app_state.font} page_tags_object={this.state.new_token_block_limit_sensitivity_tags_object} tag_size={'l'} when_tags_updated={this.when_new_token_block_limit_sensitivity_tags_object.bind(this)} theme={this.props.theme}/>
                </div>
            )
        }
    }


    when_new_token_halving_type_tags_object(tag_obj){
        this.setState({new_token_halving_type_tags_object: tag_obj})
    }

    when_new_token_block_limit_sensitivity_tags_object(tag_obj){
        this.setState({new_token_block_limit_sensitivity_tags_object: tag_obj})
    }


    add_reconfiguration_item(){
        var selected_item = this.get_selected_item(this.state.reconfig_items_tags_object, this.state.reconfig_items_tags_object['i'].active)

        var properties = this.get_target_configuration(selected_item)
        var ui = properties['picker']
        var position = properties['position']
        var reconfig_vaules_clone = this.state.reconfig_values.slice()

        if(ui == 'number'){
            var number = this.state.reconfig_number;
            reconfig_vaules_clone.push({'value':number, 'pos':position, 'title': selected_item, 'type':ui})
            this.setState({reconfig_values: reconfig_vaules_clone, reconfig_number:0})
            this.props.notify(this.props.app_state.loc['1010']/* 'reconfig action added!' */, 600)
        }
        else if(ui == 'proportion'){
            var number = this.state.reconfig_proportion;
            reconfig_vaules_clone.push({'value':number, 'pos':position, 'title': selected_item, 'type':ui})
            this.setState({reconfig_values: reconfig_vaules_clone, reconfig_proportion: 0})
            this.props.notify(this.props.app_state.loc['1010']/* 'reconfig action added!' */, 600)
        }
        else if(ui == 'time'){
            var number = this.state.reconfig_duration;
            reconfig_vaules_clone.push({'value':number, 'pos':position, 'title': selected_item, 'type':ui})
            this.setState({reconfig_values: reconfig_vaules_clone, reconfig_duration:0})
            this.props.notify(this.props.app_state.loc['1010']/* 'reconfig action added!' */, 600)
        }
        else if(ui == 'tag'){
            var number = this.get_tag_value()
            reconfig_vaules_clone.push({'value':number, 'pos':position, 'title': selected_item, 'type':ui})
            this.setState({reconfig_values: reconfig_vaules_clone})
            this.props.notify(this.props.app_state.loc['1010']/* 'reconfig action added!' */, 600)
        }
        else if(ui == 'id'){
            var number = this.get_typed_alias_id(this.state.reconfig_target_id.trim())
            if(isNaN(number) || parseInt(number) < 0 || number == ''){
                this.props.notify(this.props.app_state.loc['1011']/* 'please put a valid account id' */, 600)
            }
            else{
                reconfig_vaules_clone.push({'value':number, 'pos':position, 'title': selected_item, 'type':ui})
                this.setState({reconfig_values: reconfig_vaules_clone, reconfig_duration:0})
                this.props.notify(this.props.app_state.loc['1010']/* 'reconfig action added!' */, 600)
            }
        }
    }

    get_typed_alias_id(alias){
        if(!isNaN(alias)){
            return alias
        }
        var id = (this.props.app_state.alias_owners[this.state.token_item['e5']][alias] == null ? 
            alias : this.props.app_state.alias_owners[this.state.token_item['e5']][alias])

        return id
    }

    get_tag_value(){
        var selected_item = this.get_selected_item(this.state.reconfig_items_tags_object, this.state.reconfig_items_tags_object['i'].active)

        if(selected_item == this.props.app_state.loc['1008']/* 'Halving type' */){
            var item = this.get_selected_item(this.state.new_token_halving_type_tags_object, this.state.new_token_halving_type_tags_object['i'].active)
            var value = item == 'fixed' ? 0 : 1
            return value;
        }
        else if(selected_item == this.props.app_state.loc['1009']/* 'Block Limit Sensitivity' */){
            var item = this.get_selected_item(this.state.new_token_block_limit_sensitivity_tags_object, this.state.new_token_block_limit_sensitivity_tags_object['i'].active)
            var value = parseInt(item)
            return value;
        }
    }


    load_reconfig_items(){
        var middle = this.props.height-100;
        var size = this.props.size;
        if(size == 'm'){
            middle = this.props.height-100;
        }
        var items = [].concat(this.state.reconfig_values)

        if(items.length == 0){
            items = [0,3,0]
            return(
                <div style={{}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.map((item, index) => (
                            <li style={{'padding': '5px'}} onClick={()=>console.log()}>
                                <div style={{height:140, width:'100%', 'background-color': this.props.theme['card_background_color'], 'border-radius': '15px','padding':'10px 0px 0px 10px', 'max-width':'420px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                                    <div style={{'margin':'10px 20px 0px 0px'}}>
                                        <img src={Letter} style={{height:40 ,width:'auto'}} />
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }else{
            return(
                <div style={{}}>
                    <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                        {items.map((item, index) => (
                            <li style={{'padding': '5px'}} onClick={()=>this.when_added_modify_item_clicked(item)}>
                                {this.render_detail_item('3', {'title':''+item['title'], 'details':this.props.app_state.loc['1012']/* 'Modify Target' */, 'size':'l'})}
                                <div style={{height:5}}/>
                                {this.render_detail_item('3', {'title':''+item['pos'], 'details':'position', 'size':'l'})}
                                <div style={{height:5}}/>
                                {this.render_reconfig_value(item)}
                                <div style={{height:'1px', 'background-color':'#C1C1C1', 'margin': '5px 20px 5px 20px'}}/>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
    }

    render_reconfig_value(item){
        var title = item['title'];
        var ui = item['type']
        var number = item['value']
        if(ui == 'number'){
            return(
                <div>
                    <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                        {this.render_detail_item('2', { 'style':'l', 'title':title, 'subtitle':this.format_power_figure(number), 'barwidth':this.calculate_bar_width(number), 'number':this.format_account_balance_figure(number), 'barcolor':'', 'relativepower':'units', })}
                    </div>
                </div>
            )
        }
        else if(ui == 'proportion'){
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.format_proportion(number), 'details':this.props.app_state.loc['1013']/* 'proportion' */, 'size':'l'})}
                </div>
            )
        }
        else if(ui == 'time'){
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.get_time_diff(number), 'details':this.props.app_state.loc['1014']/* 'duration' */, 'size':'l'})}

                </div>
            )
        }
        else if(ui == 'tag'){
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.get_tag_selected_item(title, number), 'details':this.props.app_state.loc['1015']/* 'value: ' */+number, 'size':'l'})}
                </div>
            )
        }
        else if(ui == 'id'){
            return(
                <div>
                    {this.render_detail_item('3', {'title':number, 'details':this.props.app_state.loc['1016']/* 'target ID' */, 'size':'l'})}
                </div>
            )
        }
    }

    get_tag_selected_item(title, number){
        var obj = {'Auto Wait':{0:'no', 1:'yes'}, 'Moderator Modify Privelage':{1:'modifiable', 0:'non-modifiable'}, 'Unlimited Extend Contract Time':{1:'enabled', 0:'disabled'}, 'Bounty Limit Type':{0:'relative', 1:'absolute'}, 'Force Exit Enabled':{1:'enabled', 0:'disabled'}, 'Halving type':{0:'fixed', 1:'spread'}, 'Block Limit Sensitivity':{1:'1', 2:'2', 3:'3', 4:'4', 5:'5'}}

        obj[this.props.app_state.loc['73']]/* 'Auto Wait' */ = {0:'no', 1:'yes'}
        obj[this.props.app_state.loc['75']]/* 'Moderator Modify Privelage' */ = {1:'modifiable', 0:'non-modifiable'} 
        obj[this.props.app_state.loc['76']]/* 'Unlimited Extend Contract Time' */ = {1:'enabled', 0:'disabled'} 
        obj[this.props.app_state.loc['78']]/* 'Bounty Limit Type' */ = {0:'relative', 1:'absolute'}
        obj[this.props.app_state.loc['79']]/* 'Force Exit Enabled' */ = {1:'enabled', 0:'disabled'} 
        obj[this.props.app_state.loc['336']]/* 'Halving type' */ = {0:'fixed', 1:'spread'} 
        obj[this.props.app_state.loc['341']]/* 'Block Limit Sensitivity' */ = {1:'1', 2:'2', 3:'3', 4:'4', 5:'5'}


        return obj[title][number]
    }


    when_added_modify_item_clicked(item){
        var cloned_array = this.state.reconfig_values.slice()
        const index = cloned_array.indexOf(item);
        if (index > -1) { // only splice array when item is found
            cloned_array.splice(index, 1); // 2nd parameter means remove one item only
        }
        this.setState({reconfig_values: cloned_array})
        this.props.notify(this.props.app_state.loc['1017']/* 'reconfig action removed!' */, 600)
    }


    load_account_suggestions(type){
        var items = [].concat(this.get_suggested_accounts(type))
        var background_color = this.props.theme['card_background_color']
        var card_shadow_color = this.props.theme['card_shadow_color']
        return(
            <div style={{'margin':'0px 0px 0px 5px','padding': '5px 0px 0px 0px', width: '97%', 'background-color': 'transparent'}}>
                    <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '13px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                      {items.map((item, index) => (
                          <li style={{'display': 'inline-block', 'margin': '5px 5px 5px 5px', '-ms-overflow-style': 'none'}} onClick={() => this.when_suggestion_clicked(item, index, type)}>
                              {this.render_detail_item('3', item['label'])}
                          </li>
                      ))}
                  </ul>
                </div>
        )
    }

    get_suggested_accounts(type){
        if(type == 'reconfig_target_id'){
            return[
                {'id':'53', 'label':{'title':this.props.app_state.loc['854']/* 'My Account' */, 'details':this.props.app_state.loc['857']/* 'Account' */, 'size':'s'}},
                {'id':'2', 'label':{'title':this.props.app_state.loc['855']/* 'Main Contract' */, 'details':this.props.app_state.loc['858']/* 'Contract ID 2' */, 'size':'s'}},
                {'id':'0','label':{'title':this.props.app_state.loc['856']/* 'Burn Account' */, 'details':this.props.app_state.loc['859']/* 'Account ID 0' */, 'size':'s'}},
            ]
        }
        
    }

    when_suggestion_clicked(item, pos, type){
        if(type == 'reconfig_target_id'){
            this.setState({reconfig_target_id: item['id']})
        }
    }






    render_prices_picker(){
        return(
            <div>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['1017a']/* 'Edit token prices' */, 'details':this.props.app_state.loc['1017b']/* 'Change the prices of your token exchange' */, 'size':'l'})}
                <div style={{height:10}}/>
                {this.render_current_token_fees()}
                <div style={{height:10}}/>

                {this.render_token_picker_amount()}
            </div>
        )
    }

    render_current_token_fees(){
        var items = this.get_my_current_token_fees()
        return(
            <div style={{'margin':'0px 0px 0px 5px','padding': '5px 0px 0px 0px', width: '97%', 'background-color': 'transparent'}}>
                <ul style={{'list-style': 'none', 'padding': '0px 0px 0px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '13px', 'margin':'0px 0px 0px 0px','overflow-y': 'hidden'}}>
                    {items.map((item, index) => (
                        <li style={{'display': 'inline-block', 'margin': '5px 5px 5px 5px', '-ms-overflow-style': 'none'}} onClick={() => this.when_token_price_clicked(item, index)}>
                            {this.render_token_price_item(item, index)}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }


    get_my_current_token_fees(){
        var token = this.state.token_item
        var price_exchanges = token['data'][3]
        var price_amounts = token['data'][4]
        var fees_objects = []

        for(var i=0; i<price_exchanges.length; i++){
            fees_objects.push({'title':this.get_all_sorted_objects_mappings(this.props.app_state.token_name_directory)[this.state.e5+price_exchanges[i]], 'details':this.format_account_balance_figure(price_amounts[i])+' '+this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[price_exchanges[i]], 'subtitle':this.get_all_sorted_objects_mappings(this.props.app_state.token_directory)[price_exchanges[i]], 'pos': [4, i], 'size':'s'})
        }

        return fees_objects
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

    render_token_price_item(item, index){
        if(this.state.selected_token_price_pos == index){
            return(
                <div>
                    {this.render_detail_item('3', item)}
                    <div style={{height:'1px', 'background-color':'#C1C1C1', 'margin': '3px 5px 0px 5px'}}/>
                </div>
            )
        }else{
            return(
                <div>
                    {this.render_detail_item('3', item)}
                </div>
            )
        }
    }

    when_token_price_clicked(item, index){
        if(this.state.selected_token_price_pos == index){
            this.setState({selected_token_price: null, selected_token_price_pos: null});
        }else{
            this.setState({selected_token_price: item, selected_token_price_pos: index})
        }
    }


    render_token_picker_amount(){
        if(this.state.selected_token_price != null){
            var item = this.state.selected_token_price
            var token_price = item['title']
            var token_name = item['subtitle']
            return(
                <div>
                    <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '10px 5px 5px 5px','border-radius': '8px' }}>
                        {this.render_detail_item('2', { 'style':'l', 'title':token_price, 'subtitle':this.format_power_figure(this.state.new_price_number), 'barwidth':this.calculate_bar_width(this.state.new_price_number), 'number':this.format_account_balance_figure(this.state.new_price_number), 'barcolor':'', 'relativepower':token_name, })}
                    </div>
                    <div style={{height:10}}/>

                    <NumberPicker font={this.props.app_state.font} ref={this.number_picker_ref} number_limit={bigInt('1e72')} when_number_picker_value_changed={this.when_new_price_changed.bind(this)} theme={this.props.theme} power_limit={63}/>

                    <div style={{height:20}}/>
                    <div style={{'padding': '5px'}} onClick={()=>this.add_price_change_item()}>
                        {this.render_detail_item('5', {'text':this.props.app_state.loc['846']/* 'Add Change' */, 'action':''})}
                    </div>
                </div>
            )
        }
    }

    when_new_price_changed(amount){
        this.setState({new_price_number: amount})
    }

    add_price_change_item(){
        var token_type = this.state.token_item['data'][0][2]
        if(token_type == 0){
            this.props.notify(this.props.app_state.loc['1017c']/* 'You cant modify an exchange price if its cancellable.' */, 6600)
            return;
        }
        var item = this.state.selected_token_price
        var token_price = item['title']
        var position = item['pos']
        var number = this.state.new_price_number;
        var reconfig_vaules_clone = this.state.reconfig_values.slice()

        reconfig_vaules_clone.push({'value':number, 'pos':position, 'title':token_price, 'type':'number'})
        this.setState({reconfig_values: reconfig_vaules_clone, new_price_number:0})
        this.props.notify(this.props.app_state.loc['850']/* 'reconfig action added!' */, 1600)
    }





    set_token(token_item){
        if(this.state.token_item['id'] != token_item['id']){
            this.setState({
                selected: 0,id:makeid(8),type:this.props.app_state.loc['997']/* 'modify-token' */, entered_indexing_tags:[this.props.app_state.loc['998']/* 'modify' */, this.props.app_state.loc['999']/* 'token' */, this.props.app_state.loc['881']/* 'auth' */],
                token_item:{'data':[[],[0,0,0,0,0,0,0], [],[],[]]}, modify_token_title_tags_object:this.get_modify_token_title_tags_object(), reconfig_items_tags_object: this.get_reconfig_items_tags_object(),
                new_token_halving_type_tags_object: this.get_new_token_halving_type_tags_object(),
                new_token_block_limit_sensitivity_tags_object: this.get_new_token_block_limit_sensitivity_tags_object(),
                reconfig_number:0, reconfig_proportion:0, reconfig_duration:0, reconfig_target_id:'',
                reconfig_values:[],
            })
        }
        this.setState({token_item: token_item, e5: token_item['e5']})
    }

    finish(){
        if(this.state.reconfig_values.length == 0){
            this.props.notify(this.props.app_state.loc['897']/* 'you cant stack no changes' */, 700)
        }else{
            this.props.add_modify_token_to_stack(this.state)
            this.setState({reconfig_values:[]})
            this.props.notify(this.props.app_state.loc['18']/* 'transaction added to stack' */, 700);
        }
    }





    /* renders the specific element in the post or detail object */
    render_detail_item(item_id, object_data){
        return(
            <div>
                <ViewGroups graph_type={this.props.app_state.graph_type} font={this.props.app_state.font} item_id={item_id} object_data={object_data} theme={this.props.theme} width={this.props.app_state.width} />
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
            var power = amount.toString().length - 9
            return number_with_commas(amount.toString().substring(0, 9)) +'e'+power
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




export default ModifyTokenPage;