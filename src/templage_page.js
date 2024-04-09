import React, { Component } from 'react';
import ViewGroups from './../components/view_groups'
import Tags from './../components/tags';

var bigInt = require("big-integer");

function bgN(number, power) {
  return bigInt((number+"e"+power)).toString();
}

function number_with_commas(x) {
    if(x == null) x = '';
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

class template extends Component {
    
    state = {
        selected: 0,
    };

    render(){
        return(
            <div>
                e
                <div className="row">
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                    
                    </div>
                    <div className="col-6" style={{'padding': '10px 10px 10px 10px'}}>
                        
                    </div>
                </div>
            </div>
        )
    }


}




export default template;