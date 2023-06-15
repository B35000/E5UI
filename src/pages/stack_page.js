import React, { Component } from 'react';
import Tags from './../components/tags';
import ViewGroups from './../components/view_groups'
import TextInput from './../components/text_input';
import NumberPicker from './../components/number_picker';

var bigInt = require("big-integer");

function number_with_commas(x) {
    if(x == null) x = '';
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function bgN(number, power) {
  return bigInt((number+"e"+power)).toString();
}

class StackPage extends Component {
    
    state = {
        selected: 0,
        get_stack_page_tags_object: this.get_stack_page_tags_object(),
        get_themes_tags_object: this.get_theme_tags_object(),
        get_orientation_tags_object: this.get_orientation_tags_object(),
        get_wallet_thyme_tags_object:this.get_wallet_thyme_tags_object(),
        typed_word:'',
        added_tags:[],
        set_salt: 0
    };

    get_stack_page_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['or','',0], ['e','run','settings', 'wallet'], [0]
            ],
        };
        
    }

    get_theme_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['or','',0], ['e','light','dark'], [1]
            ],
        };
        
    }

    get_orientation_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['or','',0], ['e','right','left'], [1]
            ],
        };
        
    }


    get_wallet_thyme_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['or','',0], ['e','a','e','i','o','u','?','$','%','#','!'], [1]
            ],
        };
    }





    render(){
        return(
            <div style={{'margin':'10px 0px 0px 10px'}}>
                <Tags page_tags_object={this.state.get_stack_page_tags_object} tag_size={'l'} when_tags_updated={this.when_stack_tags_updated.bind(this)} theme={this.props.theme}/>
                
                <div style={{'margin':'20px 0px 0px 0px'}}>
                    {this.render_everything()}   
                </div>
                
            </div>
        )
    }

    when_stack_tags_updated(tag_group){
        this.setState({get_stack_page_tags_object: tag_group})
    }


    render_everything(){
        var selected_item = this.get_selected_item(this.state.get_stack_page_tags_object, this.state.get_stack_page_tags_object['i'].active)

        if(selected_item == 'run' || selected_item == 'e'){
            return(
                <div>
                    
                </div>
            )    
        }
        else if(selected_item == 'settings'){
            return(
                <div>
                    {this.render_settings_section()}
                </div>
            ) 
        }
        else if(selected_item == 'wallet'){
            return(
                <div>
                    {this.render_wallet_settings_section()}
                </div>
            ) 
        }
    }

    get_selected_item(object, option){
        var selected_item = object[option][2][0]
        var picked_item = object[option][1][selected_item];
        return picked_item
    }



    render_settings_section(){
        var size = this.props.size

        if(size == 's'){
            return(
                <div>
                    {this.render_settings_details()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row" style={{'padding': '0px 0px 0px 0px'}}>
                    <div className="col-6" style={{'padding': '0px 0px 0px 0px'}}>
                        {this.render_settings_details()}
                    </div>
                    <div className="col-6">
                        
                    </div>
                </div>
                
            )
        }
        
    }

    render_settings_details(){
        return(
            <div>
                <div style={{height: 10}}/>
                <div style={{'padding': '0px 0px 0px 10px'}}>

                    {this.render_detail_item('3',{'title':'App Theme', 'details':'Set the look and feel of E5.', 'size':'l'})}
                    <div style={{height: 10}}/>

                    <Tags page_tags_object={this.state.get_themes_tags_object} tag_size={'l'} when_tags_updated={this.when_theme_tags_updated.bind(this)} theme={this.props.theme}/>

                    {this.render_detail_item('0')}


                    {this.render_detail_item('3',{'title':'Orientation (for larger screens)', 'details':'Set the orientation for viewing a posts details', 'size':'l'})}
                    <div style={{height: 10}}/>

                    <Tags page_tags_object={this.state.get_orientation_tags_object} tag_size={'l'} when_tags_updated={this.when_details_orientation_changed.bind(this)} theme={this.props.theme}/>

                    {this.render_detail_item('0')}

                </div>
            </div>
        )
    }

    when_theme_tags_updated(tag_group){
        this.setState({get_themes_tags_object: tag_group})

        var selected_item = this.get_selected_item(this.state.get_themes_tags_object, this.state.get_themes_tags_object['i'].active)

        if(selected_item == 'e'){
            selected_item = 'light'
        }

        this.props.when_device_theme_changed(selected_item)
    }


    when_details_orientation_changed(tag_group){
        
        this.setState({get_orientation_tags_object: tag_group})
        var selected_item = this.get_selected_item(this.state.get_orientation_tags_object, this.state.get_orientation_tags_object['i'].active)

        if(selected_item == 'e'){
            selected_item = 'right'
        }

        this.props.when_details_orientation_changed(selected_item)
    }






    render_wallet_settings_section(){
        var size = this.props.size

        if(size == 's'){
            return(
                <div style={{'padding': '0px 30px 0px 0px', 'margin':'0px 0px 0px 0px'}}>
                    {this.render_detail_item('4',{'font':'Sans-serif', 'textsize':'15px', 'text':'Set the seed and salt for your preferred wallet', 'color':'dark-grey'})}
                    <div style={{height: 20}}/>

                    {this.render_set_wallet_data()}
                    {this.render_detail_item('0')}

                    {this.render_wallet_settings_part()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row" style={{'padding': '0px 10px 0px 0px'}}>
                    {this.render_detail_item('4',{'font':'Sans-serif', 'textsize':'15px', 'text':'Set the seed and salt for your preferred wallet', 'color':'dark-grey'})}
                    <div style={{height: 20}}/>

                    <div className="col-6" style={{'padding': '0px 0px 0px 20px'}}>
                        {this.render_wallet_settings_part()}
                    </div>
                    <div className="col-6">
                        {this.render_set_wallet_data()}
                    </div>
                </div>
                
            )
        }
    }


    render_wallet_settings_part(){
        return(
            <div>
                {this.render_detail_item('3',{'title':'Wallet Seed', 'details':'Set your preferred seed. Type a word then click add to add a word, or tap the word to remove', 'size':'l'})}
                <div style={{height: 10}}/>
                
                <TextInput height={30} placeholder={'Enter word...'} when_text_input_field_changed={this.when_text_input_field_changed.bind(this)} text={this.state.typed_word} theme={this.props.theme}/>

                {this.render_detail_item('1',{'active_tags':this.state.added_tags, 'indexed_option':'indexed', 'when_tapped':'delete_entered_seed_word'})}
                {this.render_detail_item('5',{'text':'Add Word','action':'when_add_word_button_tapped'})}

                {this.render_detail_item('0')}

                {this.render_detail_item('3',{'title':'Wallet Salt', 'details':'Set the preferred salt for your wallet', 'size':'l'})}
                <NumberPicker number_limit={bigInt('1e72')} when_number_picker_value_changed={this.when_new_salt_figure_set.bind(this)} theme={this.props.theme} power_limit={63}/>

                {this.render_detail_item('0')}

                {this.render_detail_item('3',{'title':'Wallet Thyme', 'details':'Set the preferred thyme for your wallet', 'size':'l'})}
                <Tags page_tags_object={this.state.get_wallet_thyme_tags_object} tag_size={'l'} when_tags_updated={this.when_thyme_tags_updated.bind(this)} theme={this.props.theme}/>
                {this.render_detail_item('0')}

                {this.render_detail_item('5',{'text':'Set Wallet','action':'when_set_wallet_button_tapped'})}
                {this.render_detail_item('0')}
                {this.render_detail_item('0')}
            </div>
        )
    }

    when_thyme_tags_updated(tag_group){
        this.setState({get_wallet_thyme_tags_object: tag_group})
    }

    when_new_salt_figure_set(number){
        this.setState({set_salt: number})
    }

    when_set_wallet_button_tapped(){
        var selected_item = this.get_selected_item(this.state.get_wallet_thyme_tags_object, this.state.get_wallet_thyme_tags_object['i'].active)

        if(selected_item == 'e'){
            selected_item = 'a'
        }

        if(this.state.added_tags.length == 0){
            this.props.notify('set your wallets seed', 600)
        }
        else if(this.state.set_salt == 0){
            this.props.notify('set a salt', 200)
        }
        else{
            this.props.when_wallet_data_updated(this.state.added_tags, this.state.set_salt, selected_item)
        }
        
    }


    when_text_input_field_changed(text){
        this.setState({typed_word: text})
    }

    when_add_word_button_tapped(){
        var typed_word = this.state.typed_word.trim();

        if(typed_word == ''){
            this.props.notify('type something!', 400)
        }
        else if(this.hasWhiteSpace(typed_word)){
            this.props.notify('enter one word!', 400)
        }
        else{
            var cloned_seed_array = this.state.added_tags.slice()
            cloned_seed_array.push(typed_word)
            this.setState({added_tags: cloned_seed_array, typed_word:''})
            this.props.notify('word added!', 200)
        }
    }

    delete_entered_seed_word(word, pos){
        var cloned_seed_array = this.state.added_tags.slice()
        const index = cloned_seed_array.indexOf(word);
        if (index > -1) { // only splice array when item is found
            cloned_seed_array.splice(index, 1); // 2nd parameter means remove one item only
        }
        this.setState({added_tags: cloned_seed_array})
        this.props.notify('word removed', 200)
    }

    hasWhiteSpace(s) {
        return s.indexOf(' ') >= 0;
    }


    render_set_wallet_data(){
        return(
            <div>
                
                {this.render_detail_item('3', {'title':'Wallet Address', 'details':this.get_account_address(), 'size':'s'})}
                <div style={{height: 10}}/>

                <div style={{'background-color': this.props.theme['card_background_color'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 0px','padding': '20px 0px 5px 0px','border-radius': '8px' }}>
                        <p style={{'color': this.props.theme['primary_text_color'], 'font-size': '11px', height: 7, 'margin':'0px 0px 20px 20px'}} className="fw-bold">Wallet Balance in Ether and Wei</p>
                        {this.render_detail_item('2', this.get_balance_amount_in_wei())}
                        {this.render_detail_item('2', this.get_balance_amount_in_ether())}
                </div>
                
                
            </div>
        )
    }

    get_account_address(){
        if(this.props.app_state.account != null){
            return this.props.app_state.account.address;
        }
    }

    get_balance_amount_in_wei(){
        return{
            'style':'s',
            'title':'',
            'subtitle':'',
            'barwidth':this.calculate_bar_width(this.props.app_state.account_balance),
            'number':this.format_account_balance_figure(this.props.app_state.account_balance),
            'barcolor':'#606060',
            'relativepower':'wei',
        }
    }


    get_balance_amount_in_ether(){
        return{
            'style':'s',
            'title':'',
            'subtitle':'',
            'barwidth':this.calculate_bar_width(this.props.app_state.account_balance/10**18),
            'number':this.format_account_balance_figure(this.props.app_state.account_balance/10**18),
            'barcolor':'#606060',
            'relativepower':'ether',
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

    calculate_bar_width(amount){
        var figure = ''
        if(amount == null){
            amount = 0
        }
        if(amount < bigInt('1e9')){
            figure = Math.round((amount.toString().length * 100) / bigInt('1e9').toString().length)
        }
        else if(amount < bigInt('1e18')){
            figure = Math.round((amount.toString().length * 100) / bigInt('1e18').toString().length)
        }
        else if(amount < bigInt('1e36')){
            figure = Math.round((amount.toString().length * 100) / bigInt('1e36').toString().length)
        }
        else{
            figure = Math.round((amount.toString().length * 100) / bigInt('1e72').toString().length)
        }

        return figure+'%'
    }





    /* renders the specific element in the post or detail object */
    render_detail_item(item_id, object_data){
        return(
            <div>
                <ViewGroups item_id={item_id} object_data={object_data} theme={this.props.theme} when_add_word_button_tapped={this.when_add_word_button_tapped.bind(this)} delete_entered_seed_word={this.delete_entered_seed_word.bind(this)} when_set_wallet_button_tapped={this.when_set_wallet_button_tapped.bind(this)}/>
            </div>
        )

    }


}




export default StackPage;