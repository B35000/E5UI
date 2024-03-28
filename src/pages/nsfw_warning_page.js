import React, { Component } from 'react';
import ViewGroups from './../components/view_groups'
import Tags from './../components/tags';
// import Letter from './../assets/letter.png'; 

var bigInt = require("big-integer");

function bgN(number, power) {
  return bigInt((number+"e"+power)).toString();
}

function number_with_commas(x) {
    if(x == null) x = '';
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

class NsfwPage extends Component {
    
    state = {
        selected: 0, index: null, id: null, e5: null,
    };


    set_data(index, id, e5){
        this.setState({index: index, id: id, e5: e5})
    }

    render(){
        return(
            <div style={{'padding':'10px 10px 0px 10px', 'overflow-x':'hidden'}}>
                <img style={{width:'30%', 'display': 'block', 'margin-left': 'auto', 'margin-right': 'auto', 'margin-top':'10%'}} src={this.props.app_state.static_assets['letter']} alt="E5"/>

                <div style={{height: 40}}/>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['2742']/* Not Safe For Work Warning. */,'details':this.props.app_state.loc['2743']/*  */, 'size':'l', 'text_align':'center'})}
                
                <div style={{height: 20}}/>
                <div style={{'padding': '5px'}} onClick={()=>this.ignore_warning()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['2744']/* 'Proceed' */, 'action':''})}
                </div>
            </div>
        )
    }


    ignore_warning(){
        this.props.when_warning_ignored(this.state.index, this.state.id, this.state.e5)
    }









    /* renders the specific element in the post or detail object */
    render_detail_item(item_id, object_data){
        var size = this.props.screensize
        var width = size == 'm' ? this.props.app_state.width/2 : this.props.app_state.width
        return(
            <div>
                <ViewGroups graph_type={this.props.app_state.graph_type} font={this.props.app_state.font} item_id={item_id} object_data={object_data}  theme={this.props.theme} width={width}/>
            </div>
        )

    }


}




export default NsfwPage;