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
import { motion, AnimatePresence } from "framer-motion";

function getOS() {
  if(iOS()) return 'iOS'
  const userAgent = window.navigator.userAgent,
      platform = window.navigator?.userAgentData?.platform || window.navigator.platform,
      macosPlatforms = ['macOS', 'Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
      windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
      iosPlatforms = ['iPhone', 'iPad', 'iPod'];
  let os = null;

  if (macosPlatforms.indexOf(platform) !== -1) {
    os = 'Mac OS';
  } else if (iosPlatforms.indexOf(platform) !== -1) {
    os = 'iOS';
  } else if (windowsPlatforms.indexOf(platform) !== -1) {
    os = 'Windows';
  } else if (/Android/.test(userAgent)) {
    os = 'Android';
  } else if (/Linux/.test(platform)) {
    os = 'Linux';
  }

  return os;
}

function iOS() {
  return [
    'iPad Simulator',
    'iPhone Simulator',
    'iPod Simulator',
    'iPad',
    'iPhone',
    'iPod'
  ].includes(navigator.platform)
  // iPad on iOS 13 detection
  || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
}

class Slider extends React.Component {

    state = {
        value: 0,
        animate: false,
        has_interacted: false,
    };

    constructor(props){
        super(props);
        this.sliderContainerRef = React.createRef();
    }

    

    handleNumber = (number) => {
        this.setState({value: number.target.value, has_interacted: true})
        this.props.whenNumberChanged(number)
    }

    handleSliderClick = (event) => {
        if(getOS() != 'iOS') return;
        const container = this.sliderContainerRef.current;
        if (!container) return;

        const rect = container.getBoundingClientRect();
        const clickPosition = event.clientX - rect.left;
        const percentage = clickPosition / rect.width;
        const newValue = Math.round(percentage * 999); // max is 999
        
        // Clamp value between 0 and 999
        const clampedValue = Math.max(0, Math.min(999, newValue));
        
        // Create synthetic event to match expected format
        const syntheticEvent = {
            target: {
                value: clampedValue
            }
        };
        
        this.setState({value: clampedValue, has_interacted: true});
        this.props.whenNumberChanged(syntheticEvent);
    }

    handleTouchStart = (event) => {
        event.stopPropagation();
        if(getOS() != 'iOS') return;
        const container = this.sliderContainerRef.current;
        if (!container) return;


        const touch = event.touches[0];
        const rect = container.getBoundingClientRect();
        const touchPosition = touch.clientX - rect.left;
        const percentage = touchPosition / rect.width;
        const newValue = Math.round(percentage * 999);
        
        // Clamp value between 0 and 999
        const clampedValue = Math.max(0, Math.min(999, newValue));
        
        // Create synthetic event to match expected format
        const syntheticEvent = {
            target: {
                value: clampedValue
            }
        };
        
        this.setState({value: clampedValue, has_interacted: true});
        this.props.whenNumberChanged(syntheticEvent);
    }

    when_button_clicked = (event) => {
        // this.setState({ animate: true }, () => {
        //     setTimeout(() => this.setState({ animate: false, has_interacted: true }), 200); // match animation duration
        // });

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
        const value_to_use = this.props.value
        return(
            <div style={{'display': 'flex','flex-direction': 'row','margin': '20px 0px 0px 0px', cursor: 'pointer'}}>
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
                <AnimatePresence initial={true}>
                    <motion.div key={'slider_button'} initial={{ opacity: 0, scale:0.95 }} animate={{ opacity: 1, scale:1 }} exit={{ opacity: 0, scale:0.95 }} transition={{ duration: 0.3 }} onClick={() => console.log()} whileTap={{ scale: 0.75, transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1.0] } }} style={{}}>
                        <div ref={(el) => (this.button = el)} /* className={this.state.animate ? 'button-click' : ''} */ style={{ height: 28, width: 30, 'background-color': this.props.theme['bar_background_color'], 'border-radius': '18px', 'box-shadow': '0px 0px 1px 1px '+this.props.theme['bar_shadow'], 'margin':'2px 0px 0px 0px', cursor: 'pointer' }} onMouseDown={(e) => this.when_button_clicked(e)}></div>
                    </motion.div>
                </AnimatePresence>

                <div ref={this.sliderContainerRef} onClick={this.handleSliderClick} onTouchStart={this.handleTouchStart} style={{ height: 30, width: '100%', 'border-radius': '17px', 'box-shadow': '0px 0px 1px 1px '+this.props.theme['card_shadow_color'], 'margin': '0px 0px 0px 10px' , 'position': 'relative', cursor: 'pointer'}}>

                    <div className="progress" style={{ height: 30, width: '100%', 'background-color': this.props.theme['bar_background_color'] , 'z-index':'1' , 'border-radius': '17px', 'position': 'absolute'}}>
                        <div className="progress-bar" role="progressbar" style={{ width: (value_to_use/10)+"%", 'background-image': 'none','background-color': this.props.theme['slider_color'] }} aria-valuenow="5" aria-valuemin="0" aria-valuemax="10"></div>
                    </div>

                    <input type="range" /* onTouchStart={(e) => e.stopPropagation()} onTouchMove={(e) => e.stopPropagation()} onTouchEnd={(e) => e.stopPropagation()}  */value={value_to_use} min="0" max="999" className="form-range" onChange={this.handleNumber} style={{opacity: 0, width: '100%', height: 40, 'position': 'absolute', 'z-index':'10'}}/>

                </div>

                
            </div>
        )
    }


}




export default Slider;