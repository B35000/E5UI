import React from 'react';

class Slider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
        };
    }

    handleNumber = (number) => {
        this.setState({value: number.target.value})
        this.props.whenNumberChanged(number)
    }

    when_button_clicked = (event) => {
        let me = this;
        if(Date.now() - this.last_all_click_time < 200){
            me.props.unitDecrease()
            clearTimeout(this.all_timeout);
        }else{
            this.all_timeout = setTimeout(function() {
                clearTimeout(this.all_timeout);
                me.props.unitIncrease();
            }, 200);
        }
        this.last_all_click_time = Date.now();
    }

    render(){
        return(
            <div style={{'display': 'flex','flex-direction': 'row','margin': '20px 0px 0px 0px'}}>
                <div style={{ height: 30, width: 30, 'background-color': '#999999', 'border-radius': '15px', 'box-shadow': '0px 0px 1px 1px #CECDCD' }} onClick={(e) => this.when_button_clicked(e)}></div>

                <div style={{ height: 30, width: '100%', 'border-radius': '17px', 'box-shadow': '0px 0px 1px 1px #CECDCD', 'margin': '0px 0px 0px 10px' , 'position': 'relative'}}>

                    <div className="progress" style={{ height: 30, width: '100%', 'background-color': '#999999' , 'z-index':'1' , 'border-radius': '17px', 'position': 'absolute'}}>
                        <div className="progress-bar" role="progressbar" style={{ width: (this.props.value/10)+"%", 'background-image': 'none','background-color': 'white' }} aria-valuenow="5" aria-valuemin="0" aria-valuemax="10"></div>
                    </div>

                    <input type="range" value={this.props.value} min="0" max="999" className="form-range" onChange={this.handleNumber} style={{opacity: 0, width: '100%', height: 40, 'position': 'absolute', 'z-index':'10'}}/>

                </div>

                
            </div>
        )
    }


}




export default Slider;