import React, { Component } from 'react';
import Tags from './../components/tags';
import ViewGroups from './../components/view_groups'

class StackPage extends Component {
    
    state = {
        selected: 0,
        get_stack_page_tags_object: this.get_stack_page_tags_object(),
        get_themes_tags_object:this.get_theme_tags_object(),
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
                ['or','',0], ['e','basic-light','basic-dark'], [0]
            ],
        };
        
    }

    render(){
        return(
            <div style={{'margin':'10px 0px 0px 10px'}}>
                <Tags page_tags_object={this.state.get_stack_page_tags_object} tag_size={'l'} when_tags_updated={this.when_stack_tags_updated.bind(this)} theme={this.props.theme}/>
                
                <div style={{'margin':'20px 0px 0px 20px'}}>
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
        }else if(size == 'm'){
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
                <div style={{'padding': '0px 0px 0px 0px'}}>
                    {this.render_detail_item('3')}
                    <div style={{height: 10}}/>
                    <Tags page_tags_object={this.state.get_themes_tags_object} tag_size={'l'} when_tags_updated={this.when_theme_tags_updated.bind(this)} theme={this.props.theme}/>
                    {this.render_detail_item('0')}
                </div>
            </div>
        )
    }

    when_theme_tags_updated(tag_group){
        this.setState({get_themes_tags_object: tag_group})
    }


    /* renders the specific element in the post or detail object */
    render_detail_item(item_id, object_data){
        return(
            <div>
                <ViewGroups item_id={item_id} object_data={object_data} theme={this.props.theme}/>
            </div>
        )

    }


}




export default StackPage;