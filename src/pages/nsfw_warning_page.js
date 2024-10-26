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


    set_data(index, id, e5, object){
        this.setState({index: index, id: id, e5: e5, object: object})
    }

    render(){
        return(
            <div style={{'padding':'10px 10px 0px 10px', 'overflow-x':'hidden'}}>
                {this.render_content()}
            </div>
        )
    }


    render_everything(){
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


    render_content(){
        return(
            <div>
                <img style={{width:'90px', 'display': 'block', 'margin-left': 'auto', 'margin-right': 'auto', 'margin-top':'30px'}} src={this.props.app_state.static_assets['letter']} alt="E5"/>

                <div style={{height: 20}}/>
                {this.render_detail_item('3', {'title':this.props.app_state.loc['2742']/* Not Safe For Work Warning. */,'details':this.props.app_state.loc['2743']/*  */, 'size':'l', 'text_align':'center'})}
                
                <div style={{height: 20}}/>
                <div style={{'padding': '5px'}} onClick={()=>this.ignore_warning()}>
                    {this.render_detail_item('5', {'text':this.props.app_state.loc['2744']/* 'Proceed' */, 'action':''})}
                </div>
            </div>
        )
    }


    ignore_warning(){
        this.props.when_warning_ignored(this.state.index, this.state.id, this.state.e5, this.state.object)
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
                                    <img src={this.props.app_state.static_assets['letter']} style={{height:30 ,width:'auto'}} />
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        )
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