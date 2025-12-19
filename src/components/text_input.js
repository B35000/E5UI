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
import React, { Component } from 'react';
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

class TextInput extends Component {
  state = {
    selected: 0,
    set_text:'',
    input_type: this.props.type || 'text',
  };

  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
  }

  componentDidUpdate(prevProps){
    if(prevProps.text != this.props.text && this.props.text == '' && this.inputRef.current != null){
      this.adjustTextareaHeight(this.inputRef.current);
    }
  }

  render(){
    return(
      <div>
        {this.render_text_input_field()}
      </div>
    )
  }


  /* render the text area */
  render_text_input_field(){
    var os = getOS()
    var f = os == 'iOS' ? '16px' : '13px'
    const box_shadow = this.props.theme['highlight_text_background'] == true || true ? '0px 0px 1px 1px '+this.props.theme['card_shadow_color'] : '0px 0px 0px 0px '+this.props.theme['card_shadow_color']
    return(
      <div style={{'padding': '0px 0px 0px 0px'}}>
        <AnimatePresence initial={true}>
            <motion.div key={'text_area'} initial={{ opacity: 0, scale:0.95 }} animate={{ opacity: 1, scale:1 }} exit={{ opacity: 0, scale:0.95 }} transition={{ duration: 0.3 }} style={{}}>
                 <div style={{'display': 'flex', 'background-color': this.props.theme['secondary_text_color'], 'box-shadow': box_shadow,'flex-direction': 'row','margin': '0px 0px 0px 0px','border-radius': '0px 11px 11px 0px'}}>
                    {this.render_textarea_or_input(f)}
                  </div>
            </motion.div>
        </AnimatePresence>
       
      </div>
    )
  }

  render_textarea_or_input(f){
    var height = this.props.height
    if(height < 0 || this.props.adjust_height == false){
      var text_type = this.state.input_type == null ? 'text' : this.state.input_type
      var step = text_type == 'number' ? 'any' : ''
      return(
        <div style={{width: '100%','background-color': this.props.theme['text_input_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 1px','padding': '5px 5px 0px 5px','border-radius': '0px 10px 10px 0px' }} onClick={() => this.when_textarea_clicked()}>
          <style>
            {`
              .form-control::placeholder {
                color: ${this.props.theme['text_input_color']};
                opacity: 0.6; /* Ensures visibility in some browsers */
              }
            `}
          </style>
            <input ref={this.inputRef} className="form-control" step={step}  type={text_type} style={{'color': this.props.theme['text_input_color'],'border': 'none','outline':'none','background-color':'transparent','margin': '0px 0px 5px 0px','resize': 'none', 'font-size': f,'font-family':this.props.font, 'boxShadow': "none", 'borderColor': this.props.theme['text_input_color']}} placeholder={this.props.placeholder} onChange={(event) => this.when_text_input_field_changed(event)} value={this.props.text}></input>
        </div> 
      )
    }else{
      return(
        <div style={{width: '100%','background-color': this.props.theme['text_input_background'], 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 1px','padding': '5px 5px 0px 5px','border-radius': '0px 10px 10px 0px' }}>
          <style>
            {`
              .form-control::placeholder {
                color: ${this.props.theme['text_input_color']};
                opacity: 0.6; /* Ensures visibility in some browsers */
              }
            `}
          </style>
            <textarea ref={this.inputRef} className="form-control" rows="1" style={{height: height,'color': this.props.theme['text_input_color'],'border': 'none','outline':'none','background-color':'transparent','margin': '0px 0px 5px 0px','resize': 'none', 'font-size': f,'font-family':this.props.font, 'boxShadow': "none", 'borderColor': this.props.theme['text_input_color']}} placeholder={this.props.placeholder} onInput={(event) => this.adjustHeight(event)} onChange={(event) => this.when_text_input_field_changed(event)} value={this.props.text}></textarea>
        </div> 
      )
    }
  }

  /* when text is added to the text area  */
  when_text_input_field_changed(e){
    if(this.textarea == null || this.textarea != e){
      this.textarea = e;
    }
    this.setState({set_text: this.textarea.target.value})
    this.props.when_text_input_field_changed(this.textarea.target.value)
  }

  when_textarea_clicked = (event) => {
    let me = this;
    if(Date.now() - this.last_all_click_time < 400){
        me.change_text_area_type()
        clearTimeout(this.all_timeout);
    }else{
        this.all_timeout = setTimeout(function() {
          clearTimeout(this.all_timeout);
        }, 400);
    }
    this.last_all_click_time = Date.now();
  }

  change_text_area_type(){
    if(this.state.input_type == 'password'){
      this.setState({ input_type: 'text' }, () => {
        // After state is updated and DOM re-renders, move cursor to the end
        const input = this.inputRef.current;
        if (input) {
          const length = input.value.length;
          input.setSelectionRange(length, length);
        }
      });
    }else{
      if(this.props.type == 'password'){
        this.setState({ input_type: 'password' }, () => {
          // After state is updated and DOM re-renders, move cursor to the end
          const input = this.inputRef.current;
          if (input) {
            const length = input.value.length;
            input.setSelectionRange(length, length);
          }
        });
      }
    }
  }

  adjustHeight(event) {
    const textarea = event.target;
    if(textarea.scrollHeight < 270 && this.props.adjust_height != false && textarea.scrollHeight > this.props.height){
      textarea.style.height = 'auto'; // reset first
      textarea.style.height = textarea.scrollHeight + 'px'; // set to scrollHeight
      try{
        this.props.when_text_input_field_height_changed(parseInt(textarea.scrollHeight))
      }catch(e){
        console.log(e)
      }
    }
  }

  adjustTextareaHeight(textarea) {
    if (textarea.scrollHeight < 270 && this.props.adjust_height !== false && textarea.scrollHeight > this.props.height) {
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";
      try{
        this.props.when_text_input_field_height_changed(parseInt(textarea.scrollHeight, 10));
      }catch(e){
        console.log(e)
      }
    }
  }


}




export default TextInput;