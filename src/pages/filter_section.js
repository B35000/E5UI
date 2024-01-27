import React, { Component } from 'react';
import ViewGroups from './../components/view_groups'
import Tags from './../components/tags';
import TextInput from './../components/text_input';

var bigInt = require("big-integer");

function bgN(number, power) {
  return bigInt((number+"e"+power)).toString();
}

function number_with_commas(x) {
    if(x == null) x = '';
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

class FilterSection extends Component {
    
    state = {
        selected: 0, filter_section_title_tags_obj: this.get_filter_section_title_tags_obj(),
        typed_searched_word:'', added_tags:[]
    };


    set_data(typed_searched_word, added_tags){
        this.setState({typed_searched_word: typed_searched_word, added_tags:added_tags})
    }


    get_filter_section_title_tags_obj(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['xor','',0], ['e',this.props.app_state.loc['1115']/* 'search-filter' */], [1]
            ],
        };
    }

    render(){
        return(
            <div style={{'padding':'10px 10px 0px 10px'}}>
                <Tags page_tags_object={this.state.filter_section_title_tags_obj} tag_size={'l'} when_tags_updated={this.when_filter_section_title_tags_obj_updated.bind(this)} theme={this.props.theme}/>
                
                <div style={{height:10}}/>
                {this.render_everything()}
            </div>
        )
    }

    when_filter_section_title_tags_obj_updated(tag_obj){
        this.setState({filter_section_title_tags_obj:tag_obj})
    }

    get_selected_item(object, option){
        var selected_item = object[option][2][0]
        var picked_item = object[option][1][selected_item];
        return picked_item
    }






    render_everything(){
        var selected_item = this.get_selected_item(this.state.filter_section_title_tags_obj, this.state.filter_section_title_tags_obj['i'].active)

        if(selected_item == this.props.app_state.loc['1115']/* 'search-filter' */){
            return(
                <div>
                    {this.render_search_part()}
                </div>
            )    
        }
    }


    render_search_part(){
        return(
            <div>
                {/* {this.render_detail_item('3', {'title':'Search Object', 'details':'You can search an object by its ID or its title.', 'size':'l'})} */}
                {this.render_detail_item('4', {'text':this.props.app_state.loc['1116']/* 'You can search an object by its ID or its title.' */, 'textsize':'13px', 'font':'Sans-serif'})}
                <div style={{height: 10}}/>

                <div className="row" style={{width:'103%'}}>
                    <div className="col-9" style={{'margin': '0px 0px 0px 0px'}}>
                        <TextInput height={30} placeholder={this.props.app_state.loc['1117']/* 'Enter Object ID or Title...' */} when_text_input_field_changed={this.when_search_input_field_changed.bind(this)} text={this.state.typed_searched_word} theme={this.props.theme}/>
                    </div>
                    <div className="col-3" style={{'padding': '0px 10px 0px 0px'}} onClick={()=> this.search_object()} >
                        {this.render_detail_item('5',{'text':this.props.app_state.loc['1118']/* 'Search' */,'action':''})}
                    </div>
                </div>
                <div style={{height: 10}}/>



                {this.render_detail_item('0')}

                {this.render_detail_item('4', {'text':this.props.app_state.loc['1119']/* 'You can filter objects using their tags.' */, 'textsize':'13px', 'font':'Sans-serif'})}
                <div style={{height: 10}}/>
                
                <div className="row" style={{width:'103%'}}>
                    <div className="col-9" style={{'margin': '0px 0px 0px 0px'}}>
                        <TextInput height={30} placeholder={this.props.app_state.loc['1120']/* 'Enter tag...' */} when_text_input_field_changed={this.when_tag_input_field_changed.bind(this)} text={this.state.typed_tag} theme={this.props.theme}/>
                    </div>
                    <div className="col-3" style={{'padding': '0px 10px 0px 0px'}} onClick={()=> this.add_tag()}>
                        {this.render_detail_item('5',{'text':this.props.app_state.loc['1121']/* 'Add' */,'action':'', 'prevent_default':true})}
                    </div>
                </div>

                {this.render_detail_item('1',{'active_tags':this.state.added_tags, 'indexed_option':'indexed', 'when_tapped':'delete_added_tag'})}

                <div style={{height: 20}}/>

                <div style={{'padding': '0px 0px 0px 0px'}} onClick={()=> this.clear_search()} >
                    {this.render_detail_item('5',{'text':this.props.app_state.loc['1123']/* 'Clear Search' */,'action':''})}
                </div>
            </div>
        )
    }

    when_search_input_field_changed(text){
        this.setState({typed_searched_word: text})
    }

    when_tag_input_field_changed(text){
        this.setState({typed_tag: text})
    }

    search_object(){
        var typed_word = this.state.typed_searched_word.trim();

        if(typed_word == ''){
            this.props.notify(this.props.app_state.loc['1124']/* 'Type something.' */, 1400)
        }else{
            this.props.when_search_button_tapped(typed_word)
        }
    }

    clear_search(){
        this.props.when_search_button_tapped('')
        this.props.when_add_tags_button_tapped([])

        // var me = this;
        // setTimeout(function() {    
        //     me.props.reset_scroll_height()
        // }, (1 * 100));
    }

    add_tag(){
        var typed_word = this.state.typed_tag.trim();

        if(typed_word == ''){
            this.props.notify(this.props.app_state.loc['1124']/* 'Type something.' */, 1400)
        }
        else if(this.hasWhiteSpace(typed_word)){
            this.props.notify(this.props.app_state.loc['1125']/* 'Enter one word.' */, 1400)
        }
        else{
            var cloned_seed_array = this.state.added_tags.slice()
            cloned_seed_array.push(typed_word)
            this.setState({added_tags: cloned_seed_array, typed_tag:''})
            this.props.when_add_tags_button_tapped(cloned_seed_array)
        }
    }

    hasWhiteSpace(s) {
        return s.indexOf(' ') >= 0;
    }

    delete_added_tag(tag, pos){
        var cloned_seed_array = this.state.added_tags.slice()
        const index = cloned_seed_array.indexOf(tag);
        if (index > -1) { // only splice array when item is found
            cloned_seed_array.splice(index, 1); // 2nd parameter means remove one item only
        }
        this.setState({added_tags: cloned_seed_array})
        this.props.when_add_tags_button_tapped(cloned_seed_array)
    }


    /* renders the specific element in the post or detail object */
    render_detail_item(item_id, object_data){
        return(
            <div>
                <ViewGroups item_id={item_id} object_data={object_data} theme={this.props.theme} width={this.props.app_state.width} delete_added_tag={this.delete_added_tag.bind(this)} />
            </div>
        )

    }

}




export default FilterSection;