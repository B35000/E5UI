// Copyright (c) 2023 Bry Onyoni
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
import React from 'react';

class Slider extends React.Component {

    state = {
        value: 0,
        animate: false,
    };

    handleNumber = (number) => {
        this.setState({value: number.target.value})
        this.props.whenNumberChanged(number)
    }

    when_button_clicked = (event) => {
        this.setState({ animate: true }, () => {
            setTimeout(() => this.setState({ animate: false }), 200); // match animation duration
        });

        let me = this;
        if(Date.now() - this.last_all_click_time < 400){
            me.props.unitDecrease()
            clearTimeout(this.all_timeout);
        }else{
            this.all_timeout = setTimeout(function() {
                clearTimeout(this.all_timeout);
                me.props.unitIncrease();
            }, 400);
        }
        this.last_all_click_time = Date.now();
    }

    render(){
        return(
            <div style={{'display': 'flex','flex-direction': 'row','margin': '20px 0px 0px 0px'}}>
                <style>{`
                    .button-click {
                        animation: clickAnim 0.2s ease;
                    }
                    @keyframes clickAnim {
                        0%   { transform: scale(1); background-color: ${this.props.theme['bar_background_color']}; }
                        50%  { transform: scale(0.95); background-color: ${this.props.theme['slider_color']}; }
                        100% { transform: scale(1); background-color: ${this.props.theme['bar_background_color']}; }
                    }
                `}</style>
                <div ref={(el) => (this.button = el)} className={this.state.animate ? 'button-click' : ''} style={{ height: 28, width: 30, 'background-color': this.props.theme['bar_background_color'], 'border-radius': '18px', 'box-shadow': '0px 0px 1px 1px '+this.props.theme['bar_shadow'], 'margin':'2px 0px 0px 0px' }} onMouseDown={(e) => this.when_button_clicked(e)}></div>

                <div style={{ height: 30, width: '100%', 'border-radius': '17px', 'box-shadow': '0px 0px 1px 1px '+this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 10px' , 'position': 'relative'}}>

                    <div className="progress" style={{ height: 30, width: '100%', 'background-color': this.props.theme['bar_background_color'] , 'z-index':'1' , 'border-radius': '17px', 'position': 'absolute'}}>
                        <div className="progress-bar" role="progressbar" style={{ width: (this.props.value/10)+"%", 'background-image': 'none','background-color': this.props.theme['slider_color'] }} aria-valuenow="5" aria-valuemin="0" aria-valuemax="10"></div>
                    </div>

                    <input type="range" value={this.props.value} min="0" max="999" className="form-range" onChange={this.handleNumber} style={{opacity: 0, width: '100%', height: 40, 'position': 'absolute', 'z-index':'10'}}/>

                </div>

                
            </div>
        )
    }


}




export default Slider;