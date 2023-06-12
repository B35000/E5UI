import React, { Component } from 'react';

class TextInput extends Component {
    
    state = {
        selected: 0,
        set_text:''
    };

    render(){
        return(
            <div>
                {this.render_text_input_field(this.props.height)}
            </div>
        )
    }


    /* render the text area */
    render_text_input_field(height){
      return(
        <div style={{'padding': '0px 0px 0px 0px'}}>
            <div style={{'display': 'flex', 'background-color': '#999999','flex-direction': 'row','margin': '0px 0px 0px 0px','border-radius': '0px 10px 10px 0px'}}>
                    <div style={{width: '100%','background-color': '#D2D2D2', 'box-shadow': '0px 0px 0px 0px #CECDCD','margin': '0px 0px 0px 1px','padding': '5px 5px 0px 5px','border-radius': '0px 10px 10px 0px' }}>
                       <textarea className="form-control"  rows="3" style={{height:height, 'font-size': '16px','color': '#444444','border': 'none','outline':'none','background-color':'transparent','margin': '0px 0px 5px 0px','resize': 'none', 'font-size': '12px'}} placeholder={this.props.placeholder} onChange={(event) => this.when_text_input_field_changed(event)} value={this.props.text}></textarea>
                    </div> 
            </div>
        </div>
      )
    }


    /* when text is added to the text area  */
    when_text_input_field_changed(e){
      if(this.textarea == null || this.textarea != e){
        this.textarea = e;
      }
      this.setState({set_text: this.textarea.target.value})
      this.props.when_text_input_field_changed(this.textarea.target.value)
    }


}




export default TextInput;