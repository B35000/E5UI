/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/heading-has-content */
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
// import Keyboard from "react-keyboard";

// import CanvasJSReact from './../externals/canvasjs.react';
import E5EmptyIcon from './../assets/e5empty_icon.png';
import empty_image from './../assets/default_image_background.png'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Linkify from "linkify-react";
import Markdown from 'react-markdown'

import Rating from 'react-rating';
import { FaStar } from 'react-icons/fa';

import { Chart as ChartJS, CategoryScale, LogarithmicScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend, } from 'chart.js';
import { Line } from 'react-chartjs-2';


var bigInt = require("big-integer");

// Register Chart.js components
ChartJS.register( CategoryScale, LinearScale, LogarithmicScale, PointElement, LineElement, Title, Tooltip, Filler, Legend );

// var CanvasJSChart = CanvasJSReact.CanvasJSChart; //no longer used


function urlify(text) {
    var urlRegex = /(https?:\/\/[^\s]+)/g;
    
    return text.replace(urlRegex, function(url) {
        var hyperlink = url;
        if(!hyperlink.match('^https?:\/\/')){
            hyperlink = 'http://' + hyperlink;
        }
        return '<a className="blue" href="' + url + '" target="_blank">' + url + '</a>'

    })
    // or alternatively
    
}

function number_with_commas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

class ViewGroups extends Component {
      
    state = {
        keyboard_showing: false,
        animate: false,
    
    };

    constructor(props) {
        super(props);
        this.chart = React.createRef()
    }

    componentDidUpdate(prevProps){
        if (prevProps.object_data !== this.props.object_data) {
            if (this.chart.current && this.props.item_id == '6') {
                if(this.props.object_data['always_update_chart_plugins'] == true){
                    this.update_chart_plugins(this.props.object_data)
                }
                else if(prevProps.theme['primary_text_color'] != this.props.theme['primary_text_color']){
                    this.update_chart_plugins(this.props.object_data)
                }
            }
        }
    }

    render(){
        return(
            <div>
                {this.render_detail_item(this.props.item_id, this.props.object_data)}
            </div>
        )
    }

    linkifyOptions = {
        render: {
            url: ({ attributes, content }) => (
                <a
                {...attributes}
                onClick={(e) => this.handleLinkClick(e.target.href, e)}
                style={{ color: this.props.theme['secondary_text_color'], cursor: "pointer" }}
                className="custom-link"
                >
                {content}
                </a>
            )
        }
    };


    /* renders the specific element in the post or detail object */
    render_detail_item(item_id, object_data){
        var background_color = this.props.theme['view_group_card_item_background'];
        var border_radius = '7px';
        // var E5EmptyIcon = 'https://nftstorage.link/ipfs/bafkreib7qp2bgl3xnlgflwmqh7lsb7cwgevlr4s2n5ti4v4wi4mcfzv424'

        if(item_id=='0'){/* line */
            /* {this.render_detail_item('0')} */
            
            // return(
            //     <div style={{ display: 'flex', alignItems: 'center', 'margin': '20px 20px 20px 20px' }}>
            //         <div style={{ flex: 1, height: '1px', backgroundColor: this.props.theme['line_color'] }} />
            //         <span style={{ margin: '0 1px', color:this.props.theme['primary_text_color'], 'font-size':'10px', 'translate': '0px -1px' }}>e</span>
            //         <div style={{ flex: 1, height: '1px', backgroundColor: this.props.theme['line_color'] }} />
            //     </div>
            // )
            return(
                <div style={{height:'1px', 'background-color':this.props.theme['line_color'], 'margin': '20px 20px 20px 20px', 'border-radius': '1px'}}/>
            );
        }
        else if(item_id=='1'){/* tags */
            /* {this.render_detail_item('1', {'active_tags':tags, 'index_option':'indexed'})} */
            var active_tags = ['tag1','tag2','tag3']
            var tag_background_color = this.props.theme['tag_background_color'];
            var tag_shadow = this.props.theme['tag_shadow'];
            var when_tapped = 'null'
            var selected_tags = []
            var masked = false;
            if(object_data != null || object_data['active_tags'] != null){
              active_tags = object_data['active_tags']
              if(object_data['index_option'] == 'indexed'){
                tag_background_color = this.props.theme['indexed_tag_background'];
              }
              if(object_data['when_tapped'] != null){
                when_tapped = object_data['when_tapped']
              }
              if(object_data['active_tags'].length == 0){
                active_tags = ['e'];
                when_tapped = 'null'
              }
              if(object_data['selected_tags'] != null && object_data['selected_tags'].length != 0){
                selected_tags = object_data['selected_tags']
              }
              if(object_data['masked'] != null){
                masked = object_data['masked']
              }
            }
            return (
                <div style={{'margin':'0px 0px 0px 5px','padding': '5px 0px 7px 0px', width: '99%', 'background-color': 'transparent','border-radius': border_radius, height:'40px'}}>
                    <ul style={{'list-style': 'none', 'padding': '0px 0px 5px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '13px', 'margin':'0px 0px 5px 0px','overflow-y': 'hidden', 'scrollbar-width': 'none'}}>
                      {active_tags.map((item, index) => (
                          <li style={{'display': 'inline-block', 'padding': '5px 5px 5px 1px', '-ms-overflow-style': 'none', height:40}}>
                              <div style={{'background-color': this.get_tag_color(item, selected_tags, tag_background_color), 'border-radius': '19px', 'box-shadow': '0px 0px 1px 1px '+tag_shadow}} onClick={()=> this.when_tag_item_clicked(item, index, when_tapped)}>
                                <p style={{'color': this.props.theme['tag_text_color'], 'font-size': '14px', 'padding':' 4px 17px 4px 17px', 'text-align': 'justify', 'font-family': this.props.font}} className="text-center">{this.mask_item_if_enabled(masked, item)}</p>
                            </div>
                          </li>
                      ))}
                  </ul>
                </div>
            );
        }
        else if(item_id=='2'){/* number */
            //'':{'style':'','title':'', 'subtitle':'', 'barwidth':'', 'number':'', 'relativepower':''},
            /* {this.render_detail_item('3', {'style':'','title':'', 'subtitle':'', 'barwidth':'', 'number':'', 'relativepower':''})} */
            var style = object_data != null ? object_data['style']: 'l'
            var title = object_data != null ? object_data['title']:'Post Block Number'
            var subtitle = object_data != null ? object_data['subtitle']:'depth'
            var barwidth = object_data != null ? object_data['barwidth']:'84%'
            var number = object_data != null ? object_data['number']:'123,445,555'
            var barcolor = this.props.theme['bar_color']
            var relativepower = object_data != null ? object_data['relativepower']:'500 blocks'
            
            if(number == 0){
                number = '000'
            }

            if(style == 's'){
              return ( 
                  <div style={{'margin': '0px 10px 0px 10px'}}>
                      <div style={{ height: 3, width: "100%", 'border-radius': '5px', 'box-shadow': '0px 0px 1px 1px '+this.props.theme['bar_shadow'], 'margin': '0px 0px 4px 0px' }}>
                          <div className="progress" style={{ height: 3, width: "100%", 'background-color': this.props.theme['linebar_background_color'] }}>
                              <div className="progress-bar" role="progressbar" style={{ width: barwidth, 'background-image': 'none','background-color': barcolor, 'border-radius': '0px 3px 3px 0px' }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                          </div>
                      </div>

                      <div className="row">
                          <div className="col-9" style={{'padding': '0px 0px 0px 14px' }}> 
                              <p style={{'color': this.props.theme['primary_text_color'], 'font-size': '10px', height: '100%', 'font-family': this.props.font}} className="fw-bold">{number}</p>
                          </div>
                          <div className="col-3" style={{'padding': '0px 15px 0px 0px' }}>
                              <p style={{'color': this.props.theme['secondary_text_color'], 'font-size': '9px', height: '100%', 'padding-top':' 1px', 'font-family': this.props.font}} className="text-end">{relativepower}</p>
                          </div>
                      </div>
                  </div>
              );
            }else{
                return (
                    <div style={{'margin': '5px 20px 0px 15px'}}>
                        <div className="row">
                            <div className="col-10" style={{'padding': '0px 0px 0px 14px' }}> 
                            <p style={{'color': this.props.theme['primary_text_color'], 'font-size': '11px', height: 7, 'font-family': this.props.font}} className="fw-bold">{title}</p>
                            </div>
                            <div className="col-2" style={{'padding': '0px 15px 0px 0px' }}>
                                <p style={{'color': this.props.theme['secondary_text_color'], 'font-size': '11px', height: 7, 'padding-top':' 0.5px', 'font-family': this.props.font}} className="text-end">{subtitle}</p>
                            </div>
                        </div>
                        
                        <div style={{ height: 3, width: "100%", 'border-radius': '5px', 'box-shadow': '0px 0px 2px 1px '+this.props.theme['bar_shadow'], 'margin': '0px 0px 4px 0px' }}>
                            <div className="progress" style={{ height: 3, width: "100%", 'background-color': this.props.theme['linebar_background_color'] }}>
                                <div className="progress-bar" role="progressbar" style={{ width: barwidth, 'background-image': 'none','background-color': barcolor, 'border-radius': '0px 3px 3px 0px' }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-9" style={{'padding': '0px 0px 0px 14px' }}> 
                                <p style={{'color': this.props.theme['primary_text_color'], 'font-size': '11px', height: '100%', 'font-family': this.props.font}} className="fw-bold">{number}</p>
                            </div>
                            <div className="col-3" style={{'padding': '0px 15px 0px 0px' }}>
                                <p style={{'color': this.props.theme['secondary_text_color'], 'font-size': '10px', height: '100%', 'padding-top':' 1px', 'font-family': this.props.font}} className="text-end">{relativepower}</p>
                            </div>
                        </div>
                    </div>
                );
            }
        }
        else if(item_id=='3' || item_id=='8'){/* label-id */
            /* {this.render_detail_item('3', {'title':'', 'details':'', 'size':'l'})} */
            var title = 'Author';
            var details = 'e25885';
            var size = 'l';
            var padding = '10px 15px 10px 15px'
            var image_border_radius = '50%'
            var text_align = 'left'
            var title_image = ''
            var word_wrap_value = 'normal'
            var word_wrap_value2 = 'normal'
            var text_image_border_radius = '0px'
            var blur_image = false
            if(object_data != null){
                title = object_data['title']
                details = object_data['details']
                size = object_data['size']
                padding = object_data['padding'] == null ? '10px 15px 10px 15px' : object_data['padding']
                text_align = object_data['text_align'] == null ? 'left' : object_data['text_align']
                title_image = object_data['title_image'] == null ? '' : object_data['title_image']
                word_wrap_value = this.longest_word_length(object_data['details']) > 53 ? 'break-word' : 'normal'
                word_wrap_value2 = this.longest_word_length(object_data['title']) > 53 ? 'break-word' : 'normal'
                text_image_border_radius = object_data['text_image_border_radius'] != null ? object_data['text_image_border_radius'] : '0px'
            }
            var font_size = ['11px', '9px', 16, 33, '1px 0px 0px 0px', 17];
            if(size == 'l'){
                font_size = ['15px', '12px', 19, 50, '5px 0px 0px 0px', 21];
            }
            var image_width = font_size[3]
            if(title == '' || title == null){
                title = '...'
            }
            if(details == ''){
                details = '...'
            }
            const parts = details.split(' ');
            const box_shadow = this.props.theme['highlight_text_background'] == true ? '0px 0px 0px 0px '+this.props.theme['card_shadow_color'] : '0px 0px 0px 0px '+this.props.theme['card_shadow_color']
            if(item_id == '8'){
                var img = E5EmptyIcon;
                if(object_data != null){
                    img = object_data['image'];
                    if(object_data['border_radius'] != null) image_border_radius = object_data['border_radius'];
                    if(object_data['image_width'] != null) image_width = object_data['image_width'];
                    if(object_data['blur_image'] != null) blur_image = object_data['blur_image'];
                }
                
                const text_width = object_data != null && object_data['includes_subtitle_text'] == true ? '70%' : '99%'
                const subtitle = object_data != null && object_data['subtitle'] == null ? '' : object_data['subtitle']
                const subdetails = object_data != null && object_data['subdetails'] == null ? '' : object_data['subdetails']

               return (
                    <div style={{'display': 'flex','flex-direction': 'row','padding': '10px 15px 10px 0px','margin':'0px 0px 0px 0px', 'background-color': background_color,'border-radius': border_radius, 'box-shadow': box_shadow}}>
                        <div style={{'display': 'flex','flex-direction': 'row','padding': '0px 0px 0px 5px', width: '99%'}}>
                            <div>
                                {this.render_label_id_image(blur_image, img, title, font_size, image_width, image_border_radius, object_data)}
                            </div>
                            <div style={{'margin':'0px 0px 0px 10px', width: '99%'}} onClick={() => this.when_detail_eight_clicked(object_data['text_click'], object_data['object'])}>
                                <div style={{width: '99%', 'display': 'flex','flex-direction': 'row',}}>
                                    <p style={{'font-size': font_size[0],'color': this.props.theme['primary_text_color'],'margin': font_size[4],'font-family': this.props.font,'text-decoration': 'none', height:'auto', 'word-wrap': word_wrap_value2, width: text_width}} onClick={() => this.copy_id_to_clipboard(title)}>{title}</p> 

                                    {/* <p className="text-end" style={{'font-size': '8px','color': this.props.theme['primary_text_color'],'margin': font_size[4],'font-family': this.props.font,'text-decoration': 'none', height:'auto', 'word-wrap': word_wrap_value2}} onClick={() => this.copy_id_to_clipboard(title)}>{subtitle}</p>  */}
                                </div>
                                <div style={{width: '99%', 'display': 'flex','flex-direction': 'row'}}>
                                    <p style={{'font-size': font_size[1],'color': this.props.theme['secondary_text_color'],'margin': '0px 0px 0px 0px','font-family': this.props.font,'text-decoration': 'none', 'white-space': 'pre-line', 'word-wrap': word_wrap_value, width: text_width }} onClick={() => this.copy_id_to_clipboard(details)}>{
                                        parts.map((part, index) => {
                                            return <span style={{ color: this.props.theme['secondary_text_color'], 'font-family': font,'text-decoration': 'none', 'white-space': 'pre-line', 'word-wrap': word_wrap_value }} key={index}>{this.mask_word_if_censored(part)}{index == parts.length-1 ? '':' '}</span>;
                                        })
                                    }</p>
                                    {/* <p className="text-end" style={{'font-size': '8px','color': this.props.theme['secondary_text_color'],'margin': font_size[4],'font-family': this.props.font,'text-decoration': 'none', height:'auto', 'word-wrap': word_wrap_value}} onClick={() => this.copy_id_to_clipboard(title)}>{subdetails}</p>  */}
                                </div>
                            </div>
                        </div>
                    </div>
                ); 
            }else{
                return(
                    <div style={{'display': 'flex','flex-direction': 'row','padding': padding,'margin':'0px 0px 0px 0px', 'background-color': background_color,'border-radius': border_radius, 'box-shadow': box_shadow}}>
                        <div style={{height:'100%', width:'100%'}}>
                            <div>
                                <div style={{'display': 'flex','flex-direction': 'row'}}>
                                    {this.render_text_image(title_image, font_size, text_image_border_radius)}
                                    <p style={{'font-size': font_size[0],'color': this.props.theme['primary_text_color'],'margin': '0px 0px 0px 0px','font-family': this.props.font,'text-decoration': 'none', height:'auto', 'word-wrap': word_wrap_value2,'text-align':text_align}} onClick={() => this.copy_id_to_clipboard(title)}>{title}</p>
                                </div>

                                <p style={{'font-size': font_size[1],'color': this.props.theme['secondary_text_color'],'margin': '0px 0px 0px 0px','font-family': this.props.font,'text-decoration': 'none', 'white-space': 'pre-line', 'word-wrap': word_wrap_value, 'text-align':text_align}} onClick={() => this.copy_id_to_clipboard(details)}>{
                                    parts.map((part, index) => {
                                        return <span style={{ color: this.props.theme['secondary_text_color'], 'font-family': font,'text-decoration': 'none', 'white-space': 'pre-line', 'word-wrap': word_wrap_value }} key={index}>{this.mask_word_if_censored(part)}{index == parts.length-1 ? '':' '}</span>;
                                    })
                                    }</p>
                            </div>
                        </div>
                    </div>
                );
            }
        }
        else if(item_id=='4'){/* text */
            /* {this.render_detail_item('4', {'text':'', 'textsize':'', 'font':''})} */
            var font = 'Sans-serif';/* Sans-serif , Times New Roman, ComicSans */
            var textsize = '15px';
            var text = 'some random text';
            var color = this.props.theme['primary_text_color'];
            var word_wrap_value = 'normal'
            if(object_data!=null){
              font = object_data['font'];
              textsize = object_data['textsize'];
              text = object_data['text'];
              word_wrap_value = this.longest_word_length(object_data['text']) > 53 ? 'break-word' : 'normal'
            }

            text = this.format_text_if_empty_or_null(text)
            const parts = this.split_text(text)
            return(
                <div style={{'margin':'0px 0px 0px 0px','padding': '0px 0px 0px 0px'}}>
                    <div style={{'padding': '0px 0px 0px 0px','margin': '0px 0px 0px 0px'}} onClick={() => this.copy_id_to_clipboard(text)}>
                      <div style={{width: '100%','background-color': background_color, 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 2px','padding': '5px 10px 5px 10px','border-radius': '8px' }}>
                          
                            <p style={{'font-size': textsize,'color': color,'margin': '5px 0px 5px 0px','font-family': font,'text-decoration': 'none', 'white-space': 'pre-line', 'word-wrap': word_wrap_value}}>
                                <Linkify options={this.linkifyOptions} /* options={{target: '_blank'}} */>
                                    {
                                        parts.map((part, index) => {
                                            const num = parseInt(part, 10);
                                            const isId = !isNaN(num) && num > 1000;
                                            if (isId) {
                                                return (
                                                    <span
                                                        key={index}
                                                        style={{ textDecoration: "underline", cursor: "pointer", color: color }}
                                                        onClick={() => this.when_e5_link_tapped(num)}>
                                                            {part}
                                                    </span>
                                                );
                                            }
                                            return <span style={{ color: color, 'font-family': font,'text-decoration': 'none', 'white-space': 'pre-line', 'word-wrap': word_wrap_value }} key={index}>{this.mask_word_if_censored(part)}</span>;
                                        })
                                    }
                                </Linkify>
                            </p>

                          {/* <p style={{'font-size': textsize,'color': color,'margin': '5px 0px 5px 0px','font-family': font,'text-decoration': 'none', 'white-space': 'pre-line', 'word-wrap': 'break-word'}} dangerouslySetInnerHTML={{ __html: urlify(this.format_text_if_empty_or_null(text)) }} />
                           */}
                      </div>
                    </div>
                </div>
                
            );
        }
        else if(item_id=='5'){/* button */
            /* {this.render_detail_item('5', {'text':'', 'action':''})} */
            var text = 'buy'
            var action = 'none'
            var text_transform = 'capitalize'
            var prevent_default = false
            var opacity = 1.0
            if(object_data!= null){
                text = object_data['text'];
                action = object_data['action']
                prevent_default = object_data['prevent_default'] == null ? false : object_data['prevent_default']
                text_transform = object_data['text_transform'] == null ? 'capitalize' : object_data['text_transform']
                opacity = object_data['opacity'] == null ? 1.0 : object_data['opacity']
            }
            return(
                <div /* onClick={()=> this.when_action_button_clicked(action)} */ style={{'margin':'0px 0px 0px 0px','padding': '0px 0px 0px 0px'}}>
                    <style>{`
                        .button-click {
                            animation: clickAnim 0.2s ease;
                        }
                        @keyframes clickAnim {
                            0%   { transform: scale(1); }
                            50%  { transform: scale(0.95); }
                            100% { transform: scale(1); }
                        }
                    `}</style>
                    <button ref={(el) => (this.button = el)} className={this.state.animate ? 'button-click' : ''} style={{'background-color': this.props.theme['button_color'], 'color': this.props.theme['button_text_color'], 'border-radius': '17px', width:'100%', 'border': 'none','text-decoration': 'none','font-size': '13px','padding':'8px 0px 8px 0px','margin':'0px 0px 0px 0px','box-shadow': '0px 0px 2px 1px '+this.props.theme['card_shadow_color'],'text-transform': text_transform, 'font-family': this.props.font, transition: 'background-color 0.3s ease'}} onMouseDown={(e) => this.when_any_button_tapped(e, prevent_default, action, opacity)}>
                      {text}
                    </button>
                </div>  
            );
        }
        else if(item_id=='6'){/* chart */
            var default_chart_color = this.props.theme['chart_color'];
            var background_color = this.props.theme['chart_background_color'];
            
            var start_time = object_data != null && object_data['start_time'] != null ? object_data['start_time'] : Date.now() - (1000*60*60*24*7*72)
            var end_time = object_data != null && object_data['end_time'] != null ? object_data['end_time'] : Date.now()
            const scale = object_data != null && object_data['scale'] != null ? object_data['scale'] : 1
            const chart_type = object_data != null && object_data['type'] != null ? object_data['type'] : 'linear'/* 'logarithmic' */
            
            const dataPoints = object_data != null ? 
            this.format_generated_data_points(object_data['dataPoints'], parseInt(start_time), parseInt(end_time)) : 
            this.format_generated_data_points(this.generateDataPoints(23), parseInt(start_time), parseInt(end_time));

            var interval = (object_data != null) ? object_data['interval'] : 0
            var label_font_size = 10
            if(object_data != null && object_data['hide_label'] != null){
                if(object_data['hide_label']){
                    label_font_size = 0
                }
            }
            var line_tension = this.props.graph_type == 1 ? 0.95 : 0.4

            const defaultConfig = {
                chartColor: default_chart_color,
                chartBackgroundColor: background_color,
                gridColor: this.props.theme['line_color'],
                labelFontColor: this.props.theme['primary_text_color'],
                gridLineWidth: 0.3,
                labelFontSize: 10,
                data: dataPoints,
                x_axis_label_count: 4,
                y_axis_label_count: 3,
                display_y_axis_labels: true,
                labelFontSizeX: 10,
                labelFontSizeY: label_font_size,
                line_tension: line_tension
            };

            const getChartData = () => {
                const config = { ...defaultConfig };
                
                // Create gradient for the fill area
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                const gradient = ctx.createLinearGradient(0, 0, 0, 250); // 250 is approximate chart height
                
                // Add color stops: top (1.0 opacity) to bottom (0.6 opacity)
                gradient.addColorStop(0, `${config.chartColor}FF`); // 100% opacity (FF in hex)
                gradient.addColorStop(0.75, `${config.chartColor}FF`);
                gradient.addColorStop(0.8, `${config.chartColor}33`);
                gradient.addColorStop(1, `${config.chartColor}33`);
                /* 
                    FF = 100% opacity
                    CC = 80% opacity
                    99 = 60% opacity
                    66 = 40% opacity
                    33 = 20% opacity
                    00 = 0% opacity
                */

                return {
                    labels: config.data.map(item => item.x),
                    datasets: [
                        {
                            data: config.data.map(item => item.y),
                            borderColor: config.chartColor,
                            backgroundColor: config.chartColor, //gradient, config.chartColor
                            fill: true,
                            tension: config.line_tension, // Smooth curve
                            borderWidth: 0,
                            pointBackgroundColor: config.chartColor,
                            pointBorderColor: '#ffffff',
                            pointBorderWidth: 0,
                            pointRadius: 0,
                            pointHoverRadius: 0,
                        },
                    ],
                };
            };

            const getChartOptions = () => {
                const config = { ...defaultConfig };
                
                return {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false, // No legend
                        },
                        title: {
                            display: false, // No title
                        },
                        tooltip: {
                            enabled: false
                        },
                    },
                    scales: {
                        x: {
                            display: true,
                            grid: {
                                display: true,
                                color: config.gridColor,
                                lineWidth: config.gridLineWidth,
                            },
                            ticks: {
                                maxTicksLimit: config.x_axis_label_count,
                                color: config.labelFontColor,
                                font: {
                                    size: config.labelFontSizeX,
                                },
                            },
                        },
                        y: {
                            type: chart_type,
                            display: config.display_y_axis_labels,
                            afterDataLimits: (scale) => {
                                // Add 10% padding to the top
                                const range = scale.max - scale.min;
                                scale.max = scale.max + (range * 0.01);
                                // Optionally add padding to bottom too
                                // scale.min = scale.min - (range * 0.1);
                            },
                            grid: {
                                display: true,
                                color: config.gridColor,
                                lineWidth: config.gridLineWidth,
                            },
                            ticks: {
                                maxTicksLimit: config.y_axis_label_count,
                                color: config.labelFontColor,
                                font: {
                                    size: config.labelFontSizeY,
                                },
                                callback: function(value, index, ticks) {
                                    if(value.toString().includes('.')){
                                        return (value * scale).toString()
                                    }
                                    const final_value = bigInt(value).multiply(scale)
                                    if(bigInt(final_value).lesser(bigInt(1_000_000))){
                                        return number_with_commas(final_value.toString())
                                    }else{
                                        var power = final_value.toString().length - 3
                                        return number_with_commas(final_value.toString().substring(0, 3)) +'e'+power
                                    }
                                }
                            },
                        },
                    },
                    elements: {
                        point: {
                            hoverBackgroundColor: config.chartColor,
                        },
                    },
                    interaction: {
                        mode: 'nearest',
                        axis: 'x',
                        intersect: false,
                    },
                };
            };

            const getIndexLabelPlugin = () => {
                const config = { ...defaultConfig };
                
                return {
                    id: 'indexLabels',
                    afterDatasetsDraw: (chart) => {
                        const ctx = chart.ctx;
                        config.data.forEach((item, index) => {
                            if (item.label != null) {
                                const meta = chart.getDatasetMeta(0);
                                const point = meta.data[index];
                                
                                if (point != null) {
                                    ctx.save();
                                    ctx.fillStyle = config.labelFontColor;
                                    ctx.font = `bold ${config.labelFontSize}px Arial`;
                                    ctx.textAlign = 'center';
                                    ctx.textBaseline = 'bottom';
                                    
                                    // Position label above the point
                                    ctx.fillText(item.label, point.x, point.y - 10);
                                    ctx.restore();
                                }
                            }
                        });
                    },
                };
            };

            return(
                <div style={{'margin':'10px 0px 0px 0px','padding': '10px 10px 0px 10px', 'background-color': background_color, height:260, 'border-radius': border_radius}}>
                    <div style={{'padding':'0px 0px 10px 0px', height: 'calc(100% - 1px)', position: 'relative'}}>
                        <Line ref={this.chart} data={getChartData()} options={getChartOptions()} plugins={[getIndexLabelPlugin()]} />
                    </div>
                </div>
            )

            // const options = {
            //   theme: "light1", // "light1", "dark1", "dark2"
            //   animationEnabled: true,
            //   zoomEnabled: false,
            //   title: {
            //       text: ".",
            //       fontColor: "rgb(210, 210, 210,.0)",
            //       fontSize: 13
            //   },
            //   backgroundColor: background_color,//#F5F5F5
            //   axisX:{
            //     interval: 30,//size of space between labels
            //     labelFontSize: label_font_size,
            //     tickLength: 0,
            //     gridThickness: 0,
            //     gridColor: this.props.theme['line_color'],//"#767676"
            //     lineColor: "rgb(210, 210, 210,.0)",
            //     labelFontColor: this.props.theme['primary_text_color'], //#292929 #DEDEDE
            //     // labelFormatter: function(e){
            //     //     return  "x: " + e.value;
            //     // }
            //   },
            //   axisY:{
            //     labelFontSize: label_font_size,
            //     interval: interval,//size of space between labels
            //     tickLength: 0,
            //     gridThickness: 0.3,
            //     gridColor: this.props.theme['line_color'],//"#767676"
            //     lineColor: "rgb(210, 210, 210,.0)",
            //     labelFontColor: this.props.theme['primary_text_color'],//#292929 #DEDEDE
            //     //   stripLines: [{
            //     //         startValue:45,
			// 	//         endValue:55, // The Y value for the line
            //     //         label: "Gucci",
            //     //         color: "red",
            //     //         labelFontColor: "red",
            //     //         labelPlacement: "inside",
            //     //         thickness: 0.9,
            //     //         labelBackgroundColor:'transparent',
            //     //         opacity:0.2,
            //     //         showOnTop: true,
            //     //     }],
            //   },
            //   toolTip:{
            //       enabled: false   //enable here
            //   },
            //   height:230,
            //   data: [{
            //             type: this.props.graph_type,//area, splineArea
            //             color:default_chart_color,
            //             lineThickness: 0.5,
            //             fillOpacity: 1,
            //             markerColor: "transparent",
            //             indexLabelFontColor: this.props.theme['primary_text_color'],
            //             indexLabelFontFamily:"Sans-serif",
            //             indexLabelFontWeight:"bold",
            //             dataPoints: dataPoints,
            //   }]
            // }

            // return(
            //     <div style={{'margin':'10px 0px 0px 0px','padding': '10px 10px 0px 10px', 'background-color': background_color, height:260, 'border-radius': border_radius}}>
            //         <div style={{'padding':'0px 0px 10px 0px', height:250}}>
            //             <div style={{'margin': '10px 0px 0px 0px'}}>
            //               <div style={{ height: 200, width: '100%' ,'position': 'relative'}}>
            //                   <div style={{ height: 30, width: '100%', 'background-color': background_color ,'position': 'absolute', 'z-index':'3' ,'margin': '-15px 0px 0px 0px'}}/>

            //                   <CanvasJSChart style={{ width: '100%' , 'z-index':'2' ,'position': 'fixed'}} options = {options}/>
                              
            //                   <div style={{ height: 19, width: '100%', 'background-color': background_color, 'opacity':1.0,'position': 'absolute', 'z-index':'3' ,'margin': '-15px 0px 0px 0px'}}/>
            //               </div>
            //           </div>
            //         </div>
            //     </div>
            // );
        }
        else if(item_id=='7'){/* banner-icon */
            var header = object_data != null ? object_data['header']:'E35'
            var subtitle = object_data != null ? object_data['subtitle']:'ETC'
            var img = object_data != null ? object_data['image']:E5EmptyIcon;
            var width = '180px'
            var height = '180px'
            var border_radius = '14%'
            if(object_data != null && object_data['width_height']!= null){
                width = object_data['width_height']
                height = width;
            }
            if(object_data != null && object_data['height']!= null){
                height = object_data['height']
            }
            if(object_data != null && object_data['border_radius']!= null){
                border_radius = object_data['border_radius']
            }

            return(
                <div style={{height:230, width:'90%','display': 'flex', 'align-items':'center','justify-content':'center','padding':'0px 0px 0px 50px'}}>
                    <img alt="" src={this.get_image_from_file(img)} style={{height: height ,width: width,'border-radius':border_radius}} />

                    <div style={{'margin':'0px 0px 0px 20px'}}> 
                        <p style={{'font-size': '15px','color': this.props.theme['primary_text_color'],'margin': '0px 0px 0px 0px','font-family': this.props.font,'text-decoration': 'none'}}>{header}</p>
                        <p style={{'font-size': '13px','color': this.props.theme['secondary_text_color'],'margin': '0px 0px 0px 0px','font-family': this.props.font,'text-decoration': 'none'}}>{subtitle}</p>
                    </div>
                </div>
            );
        }
        else if(item_id =='9'){/* images-list */
            /* {this.render_detail_item('9', {'images':[], 'pos':0})}*/
            var col = Math.round(this.props.width / 45)
            var rowHeight = 45;
            var items = object_data == null ? [] :object_data['images'];
            var items_pos = object_data == null ? 0 : object_data['pos'];

            if(items.length == 0) return;
            return (
                <div style={{'margin':'0px 0px 0px 1px','padding': '0px 0px 0px 0px', width: '99%', 'background-color': 'transparent','border-radius': border_radius, height:'auto'}}>
                    <ul style={{'list-style': 'none', 'padding': '0px 0px 1px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '13px', 'margin':'0px 0px 5px 0px','overflow-y': 'hidden', 'scrollbar-width': 'none'}}>
                      {items.map((item, index) => (
                          <li style={{'display': 'inline-block', 'padding': '5px 5px 5px 1px', '-ms-overflow-style': 'none', height:'auto'}} onClick={() => this.when_image_clicked(items, index)}>
                            <img alt="" src={this.get_image_from_file(item)} style={{width:'auto', height:90, 'border-radius': '10px'}} />
                          </li>
                      ))}
                    </ul>
                </div>
            );
            // return(
            //     <div style={{'margin':'5px 0px 0px 10px'}}>
            //         <ImageList sx={{ width: 'auto', height: 'auto' }} cols={col} rowHeight={rowHeight}>
            //             {items.map((item, index) => (
            //                 <ImageListItem key={item.img}>
            //                     <div style={{}} onClick={() => this.when_image_clicked(items, index)}>
            //                         <img alt="" src={this.get_image_from_file(item)} style={{width:45, height:45, 'border-radius': '50%'}} />
            //                     </div>
            //                 </ImageListItem>
            //             ))}
            //         </ImageList>
            //     </div>
            // ) 
        }
        else if(item_id=='10'){/* text2 */
            /* {this.render_detail_item('10', {'text':'', 'textsize':'', 'font':''})} */
            var font = 'Sans-serif';/* Sans-serif , Times New Roman */
            var textsize = '15px';
            var text = 'some random text';
            var color = this.props.theme['primary_text_color'];
            var word_wrap_value = 'normal'
            if(object_data!=null){
              font = object_data['font'];
              textsize = object_data['textsize'];
              text = object_data['text'];
              word_wrap_value = this.longest_word_length(object_data['text']) > 53 ? 'break-all' : 'normal'
            }

            return(
                <div style={{'margin':'0px 0px 0px 0px','padding': '0px 0px 0px 0px'}}>
                    <div style={{'padding': '0px 3px 0px 3px','margin': '0px 0px 0px 0px'}} onClick={() => this.copy_id_to_clipboard(text)}>
                        <p style={{'font-size': textsize,'color': color,'margin': '5px 0px 5px 0px','font-family': font,'text-decoration': 'none', 'white-space': 'pre-line', 'word-wrap': word_wrap_value}}><Linkify options={this.linkifyOptions} /* options={{target: '_blank'}} */>{this.format_text_if_empty_or_null(text)}</Linkify></p>

                        {/* <p style={{'font-size': textsize,'color': color,'margin': '5px 0px 5px 0px','font-family': font,'text-decoration': 'none', 'white-space': 'pre-line', 'word-wrap': 'break-word'}} dangerouslySetInnerHTML={{ __html: urlify(this.format_text_if_empty_or_null(text)) }} /> */}
                    </div>
                </div>
            );
        }
        else if(item_id=='11'){/* banner */
            var img = object_data != null ? object_data['image']:E5EmptyIcon;
            var caption = object_data != null ? object_data['caption']:{'text':'E5', 'textsize':'10px', 'font':'Times New Roman'}
            var image_border_radius = '9px'
            return(
                <div style={{width:'90%', margin:'0px 0px 0px 10px'}}>
                    <img alt="" src={this.get_image_from_file(img)} style={{height:'auto' ,width:'90%', 'border-radius': image_border_radius}} />
                    {this.render_detail_item('10', caption)}
                </div>
            )
        }
        else if(item_id=='12'){/* image_label */
            /* {this.render_detail_item('3', {'title':'', details:'', image: img, 'size':'l'})} */
            var title = 'Author';
            var details = 'e25885';
            var size = 'l';
            var image_border_radius = '9px'
            var img_size = 45
            if(object_data != null){
                title = object_data['title']
                details = object_data['details']
                size = object_data['size']
            }
            var font_size = ['12px', '10px', 16];
            if(size == 'l'){
                font_size = ['17px', '13px', 19];
            }
            if(title == ''){
                title = '...'
            }
            if(details == ''){
                details = '...'
            }
            var img = E5EmptyIcon;
            if(object_data != null){
                img = object_data['image'];
            }
            if(object_data != null && object_data['img_size'] != null){
                img_size = object_data['img_size']
                if(object_data['border_radius'] != null) image_border_radius = object_data['border_radius']
            }
            return (
                <div style={{'display': 'flex','flex-direction': 'row','padding': '5px 15px 5px 0px','margin':'0px 0px 0px 0px', 'background-color': background_color,'border-radius': border_radius}}>
                    <div style={{'display': 'flex','flex-direction': 'row','padding': '0px 0px 0px 5px'}}>
                        <div style={{'margin':'0px 0px 0px 0px'}}>
                            <img alt="" src={this.get_image_from_file(img)} style={{height:img_size ,width:img_size, 'border-radius': image_border_radius}} />
                        </div>
                        <div style={{'margin':'3px 0px 0px 5px'}}>
                            <p style={{'font-size': font_size[0],'color': this.props.theme['primary_text_color'],'margin': '5px 0px 0px 0px','font-family': this.props.font,'text-decoration': 'none', height:'auto', 'word-wrap': 'break-word'}} onClick={() => this.copy_id_to_clipboard(title)}>{title}</p> 
                            
                            <p style={{'font-size': font_size[1],'color': this.props.theme['secondary_text_color'],'margin': '0px 0px 0px 0px','font-family': this.props.font,'text-decoration': 'none', 'white-space': 'pre-line', 'word-wrap': 'break-word' }} onClick={() => this.copy_id_to_clipboard(details)}>{details}</p>
                        </div>
                    </div>
                </div>
            ); 
        }
        else if(item_id=='13'){/* markdown preview */
            /* {this.render_detail_item('13', {'source':''})}  */
            var source = object_data == null ? '' : object_data['source']
            var padding = '10px 15px 10px 15px'
            var word_wrap_value = this.longest_word_length(source) > 53 ? 'break-word' : 'normal'
            return(
                <div style={{padding:'5px 10px 5px 10px', width:'100%', 'border-radius': border_radius, 'background-color':this.props.theme['view_group_card_item_background']}}>
                    <Markdown
                    components={{
                            // p: ({ node, ...props }) => <p style={{ color: this.props.theme['secondary_text_color'],  'word-wrap': word_wrap_value }} {...props} />,

                            p: ({ node, ...props }) => {
                                console.log('markdown',props.children)
                                const text = props.children

                                const processed = typeof text === "string" ? this.split_text(text).map((part, i) => (!isNaN(parseInt(part)) && parseInt(part) > 1000) ? (
                                        <span key={i} style={{ textDecoration: "underline", cursor: "pointer", color: this.props.theme['secondary_text_color']}} onClick={() => this.when_e5_link_tapped(parseInt(part))}>
                                            {part}
                                        </span>
                                    ) : (
                                        <React.Fragment key={i}>{this.mask_word_if_censored(part)}</React.Fragment>
                                    )
                                ) : props.children;

                                return (
                                    <p style={{ color: this.props.theme['secondary_text_color'], wordWrap: word_wrap_value }}>{processed}</p>
                                );
                            },

                            h1: ({ node, ...props }) => <h1 style={{ color:this.props.theme['primary_text_color'] }} {...props} />,
                            h2: ({ node, ...props }) => <h2 style={{ color: this.props.theme['primary_text_color'] }} {...props} />,
                            h3: ({ node, ...props }) => <h3 style={{ color: this.props.theme['primary_text_color'] }} {...props} />,
                            h4: ({ node, ...props }) => <h4 style={{ color: this.props.theme['primary_text_color'] }} {...props} />,
                            h5: ({ node, ...props }) => <h5 style={{ color: this.props.theme['primary_text_color'] }} {...props} />,
                            h6: ({ node, ...props }) => <h6 style={{ color: this.props.theme['primary_text_color'] }} {...props} />,
                            li: ({ node, ...props }) => <li style={{ color: this.props.theme['secondary_text_color'] }} {...props} />,
                            a: ({ node, ...props }) => <a style={{ color: this.props.theme['secondary_text_color'] }} {...props} onClick={(e) => this.handleLinkClick(e, props.href)} /* target="_blank" rel="noopener noreferrer" */ />,
                            hr: ({ node, ...props }) => <hr style={{ color: this.props.theme['line_color'] }} {...props} />,
                            br: ({ node, ...props }) => <br style={{ color: this.props.theme['line_color'] }} {...props} />,
                        }}
                    >{source}</Markdown>
                </div>
            )
        }
        else if(item_id=='14'){/* coin item */
            var border_radius = '7px';
            var title = 'Author';
            var details = 'e25885';
            var size = 'l';
            var img_size = 45
            if(object_data != null){
                title = object_data['title']
                details = object_data['details']
                size = object_data['size']
            }
            var font_size = ['12px', '10px', 16];
            if(size == 'l'){
                font_size = ['17px', '13px', 19];
            }
            if(title == ''){
                title = '...'
            }
            if(details == ''){
                details = '...'
            }
            var img = E5EmptyIcon;
            if(object_data != null){
                img = object_data['image'];
            }
            if(object_data != null && object_data['img_size'] != null){
                img_size = object_data['img_size']
            }
            return (
                <div style={{'display': 'flex','flex-direction': 'row','padding': '5px 15px 5px 0px','margin':'0px 0px 0px 0px', 'background-color': background_color,'border-radius': border_radius}}>
                    <div style={{'display': 'flex','flex-direction': 'row','padding': '0px 0px 0px 5px'}}>
                        <div style={{'margin':'0px 0px 0px 0px'}}>
                            <img alt="" src={img} style={{height:img_size ,width:img_size, 'border-radius':'6px'}} />
                        </div>
                        <div style={{'margin':'0px 0px 0px 5px'}}>
                            <p style={{'font-size': font_size[0],'color': this.props.theme['primary_text_color'],'margin': '0px 0px 0px 0px','font-family': this.props.font,'text-decoration': 'none', height:'auto', 'word-wrap': 'break-word'}}>{title}</p> 
                            
                            <p style={{'font-size': font_size[1],'color': this.props.theme['secondary_text_color'],'margin': '0px 0px 0px 0px','font-family': this.props.font,'text-decoration': 'none', 'white-space': 'pre-line', 'word-wrap': 'break-word' }}>{details}</p>
                        </div>
                    </div>
                </div>
            );
        }
        else if(item_id=='15'){/* rating */
            var rating = object_data == null ? 5.0 : object_data['rating']
            var rating_total = object_data == null ? 10.0 : object_data['rating_total']
            var message = object_data == null ? null : object_data['message']
            var percentage = this.props.rating_denomination == 'percentage' ? Math.floor((rating/rating_total) * 100)+'%' : rating
            if(rating_total == 10.0){
                rating = (rating/rating_total) * 5
            }
            return(
                <div style={{ width: '100%', display: 'flex', alignItems: 'center', 'margin': '0px 0px 0px 0px' }}>
                    <Rating 
                        initialRating={rating}
                        step={1}
                        fractions={10}
                        stop={5}
                        emptySymbol={<FaStar color={this.props.theme['bar_background_color']} size={20} />}
                        fullSymbol={<FaStar color={this.props.theme['bar_color']} size={20} />}
                        readonly={true}
                    />
                    {rating > 0 && (
                        <p style={{ 'margin': '4px 0px 0px 7px', color: this.props.theme['primary_text_color'], 'font-family': this.props.font, 'font-size': '14px' }} className="fw-bold">{percentage}</p>
                    )}
                    {message && (
                        <p style={{ 'margin': '4px 0px 0px 7px', color: this.props.theme['secondary_text_color'], 'font-family': this.props.font, 'font-size': '14px' }}> • {message}</p>
                    )}
                </div>
            )
        }
        else if(item_id=='16'){/* line with message */
            var message = object_data == null ? 'e' : object_data['message']
            return(
                <div style={{ display: 'flex', alignItems: 'center', 'margin': '2px 20px 2px 20px' }}>
                    <div style={{ flex: 1, height: '1px', backgroundColor: this.props.theme['line_color'] }} />
                    <span style={{ margin: '0 1px', color:this.props.theme['primary_text_color'], 'font-size':'10px', 'translate': '0px -1px' }}>{message}</span>
                    <div style={{ flex: 1, height: '1px', backgroundColor: this.props.theme['line_color'] }} />
                </div>
            )
        }
    }

    update_chart_plugins(object_data){
        var start_time = object_data != null && object_data['start_time'] != null ? object_data['start_time'] : Date.now() - (1000*60*60*24*7*72)
        var end_time = object_data != null && object_data['end_time'] != null ? object_data['end_time'] : Date.now()

        const dataPoints = object_data != null ? 
        this.format_generated_data_points(object_data['dataPoints'], parseInt(start_time), parseInt(end_time)) : 
        this.format_generated_data_points(this.generateDataPoints(23), parseInt(start_time), parseInt(end_time));

        const defaultConfig = {
            gridColor: this.props.theme['line_color'],
            labelFontColor: this.props.theme['primary_text_color'],
            gridLineWidth: 0.3,
            labelFontSize: 10,
            data: dataPoints,
            x_axis_label_count: 4,
            y_axis_label_count: 3,
            display_y_axis_labels: true,
            labelFontSizeX: 10,
        };

        const getIndexLabelPlugin = () => {
            const config = { ...defaultConfig };
            
            return {
                id: 'indexLabels',
                afterDatasetsDraw: (chart) => {
                    const ctx = chart.ctx;
                    config.data.forEach((item, index) => {
                        if (item.label != null) {
                            const meta = chart.getDatasetMeta(0);
                            const point = meta.data[index];
                            
                            if (point != null) {
                                ctx.save();
                                ctx.fillStyle = config.labelFontColor;
                                ctx.font = `bold ${config.labelFontSize}px Arial`;
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'bottom';
                                
                                // Position label above the point
                                ctx.fillText(item.label, point.x, point.y - 10);
                                ctx.restore();
                            }
                        }
                    });
                },
            };
        };

        this.chart.current.config.plugins.splice(0, 1)
        this.chart.current.config.plugins.push(getIndexLabelPlugin())
        this.chart.current.update();
    }

    render_label_id_image(blur_image, img, title, font_size, image_width, image_border_radius, object_data){
        if(blur_image == true){
            return(
                <div>
                    <img src={this.get_image_from_file(img)} alt={title} style={{height:font_size[3] ,width:image_width, 'border-radius': image_border_radius, 'filter': 'blur(3px)', '-webkit-filter': 'blur(3px)'}} onClick={() => this.when_detail_eight_clicked(object_data['image_click'], object_data['object'])}/>
                </div>
            )
        }else{
            return(
                <div>
                    <img src={this.get_image_from_file(img)} alt={title} style={{height:font_size[3] ,width:image_width, 'border-radius': image_border_radius}} onClick={() => this.when_detail_eight_clicked(object_data['image_click'], object_data['object'])}/>
                </div>
            )
        }
    }

    split_text(text){
        if(text == null) return []
        var split = text.split(' ')
        var final_string = []
        split.forEach((word, index) => {
            final_string.push(word)
            if(split.length-1 != index){
                final_string.push(' ')
            }
        });
        return final_string
    }

    when_detail_eight_clicked(id, object){
        if(id == 'when_audio_image_clicked'){
            this.props.when_audio_image_clicked(object)
        }
        else if(id == 'when_audio_text_clicked'){
            this.props.when_audio_text_clicked(object)
        }
        else if(id == 'when_video_image_clicked'){
            this.props.when_video_image_clicked(object)
        }
        else if(id == 'when_video_text_clicked'){
            this.props.when_video_text_clicked(object)
        }
    }

    process_source(source){
        const parts = source.split(' ');
        var final_string = ''
        parts.forEach((word, index) => {
            final_string = final_string + this.mask_word_if_censored(word) + (index == parts.length-1 ? '':' ')
        });
        return final_string
    }

    mask_word_if_censored(word){
        var all_censored_phrases = this.props.censored_keyword_phrases == null ? [] : this.props.censored_keyword_phrases
        
        if(all_censored_phrases.includes(word.toLowerCase().replace(/[^\p{L}\p{N} ]/gu, ''))){
            if (word == null || word.length <= 1) return word; // nothing to mask
            return word[0] + '*'.repeat(word.length - 1);
        }else{
            return word
        }
    }

    when_e5_link_tapped(id){
        this.props.when_e5_link_tapped(id)
    }

    mask_item_if_enabled(masked, item){
        if(masked == true){
            if (item == null || item.length <= 1) return item; // nothing to mask
            return item[0] + '*'.repeat(item.length - 1);
        }else{
            return this.mask_word_if_censored(item)
        }
    }

    render_text_image(title_image, font_size, text_image_border_radius){
        if(title_image != null && title_image != ''){
            return(
                <div style={{'display': 'flex','flex-direction': 'row', 'padding':'1px 0px 0px 0px'}}>
                    <img src={this.get_image_from_file(title_image)} alt={title_image} style={{height:font_size[5],width:font_size[5], 'border-radius':text_image_border_radius}}/>
                    <div style={{width:2}}/>
                </div>
            )
        }
    }

    when_any_button_tapped(e, prevent_default, action, opacity){
        if(opacity != 1.0){
            return;
        }
        if(prevent_default){
            e.preventDefault()
            console.log('prevented default!')
        }

        this.setState({ animate: true }, () => {
            setTimeout(() => this.setState({ animate: false }), 200); // match animation duration
        });
        this.when_action_button_clicked(action)
    }

    get_tag_color(tag, selected_tags, tag_background_color){
        if(selected_tags.includes(tag)){
            return 'black'
        }
        return tag_background_color
    }

    copy_id_to_clipboard(text){
        let me = this;
        if(Date.now() - this.last_all_click_time < 200){
            //double tap
            // me.copy_id_to_clipboard(item['id'])
            navigator.clipboard.writeText(text)
            clearTimeout(this.all_timeout);
        }else{
            this.all_timeout = setTimeout(function() {
                clearTimeout(this.all_timeout);
                // single tap
                
            }, 200);
        }
        this.last_all_click_time = Date.now();
        // navigator.clipboard.writeText(text)
    }

    longest_word_length(text) {
        if(text == null) {
            return 0
        }
        return text.toString()
            .split(/\s+/) // Split by whitespace (handles multiple spaces & newlines)
            .reduce((maxLength, word) => Math.max(maxLength, word.length), 0);
    }


    format_text_if_empty_or_null(text){
        if(text == '' || text == null){
            return '...';
        }else{
            return text;
        }
    }

    /* generates points in an array for showing in the canvas object */
    generateDataPoints(noOfDps) {
      var xVal = 1, yVal = 100;
      var dps = [];
      for(var i = 0; i < noOfDps; i++) {
        yVal = yVal +  Math.round(5 + Math.random() *(-5-5));
        if(i%7 == 0 && i != 0){
            dps.push({x: xVal,y: yVal, indexLabel: ""+yVal});//
        }else{
            dps.push({x: xVal,y: yVal});//
        }
        xVal++;
      }
          // yVal = yVal +  Math.round(5 + Math.random() *(-5-5));
          // dps.push({x: 101, y: yVal,  indexLabel: "900e3"});
      return dps;
    }

    /* generates points in an array for showing in the canvas object */
    format_generated_data_points(dps, start_time, end_time) {
        const new_dps = []
        const diffMs = end_time - start_time
        const time_chunk_period = diffMs / (dps.length - 1)
        dps.forEach(dp => {
            const period_of_x = start_time + (dp.x * time_chunk_period)
            const final_x = this.formatTimestamp(period_of_x, diffMs)
            const new_label = dp['indexLabel'] == null ? null : dp['indexLabel'].replace('transactions', this.props.transactions_text) || 'transactions'
            new_dps.push({x: final_x, y: dp.y, label: new_label})
        });
        return new_dps
    }

    formatTimestamp(timestamp, diffMs) {
        const date = new Date(timestamp);
        const oneDay = 24 * 60 * 60 * 1000;
        const oneWeek = 604_800_000;
        const oneYear = 31_556_952_000; // rough (ignores leap years)

        if (diffMs < oneDay) {
            // Less than a day → show hours + minutes
            return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        } 
        else if (diffMs < oneWeek) {
            // Less than a week → show weekday + hour
            return date.toLocaleDateString([], { weekday: "short" }) + " " +
                date.toLocaleTimeString([], { hour: "2-digit" });
        } 
        else if (diffMs < oneYear) {
            // Less than a year → show month + day
            return date.toLocaleDateString([], { month: "short", day: "numeric" });
        } 
        else if (diffMs < oneYear * 2) {
            // About a year → show month + year
            return date.toLocaleDateString([], { month: "short", year: "numeric" });
        } 
        else {
            // Multiple years → just show year
            return date.getFullYear().toString();
        }
    }

    when_action_button_clicked(action_id){
        if(action_id == 'send_receive_ether'){
            this.props.open_send_receive_ether_bottomsheet()
        }
        else if(action_id == 'copy_to_clipboard'){
            this.props.copy_to_clipboard()
        }
        else if(action_id == 'send_ether'){
            this.props.when_send_ether_button_tapped()
        }
        else if(action_id == 'set_receiver_address'){
            this.props.when_set_receiver_address_button_tapped()
        }
        else if(action_id == 'confirm_send_ether'){
            this.props.when_send_ether_confirmation_received()
        }
        else if(action_id == 'when_add_word_button_tapped'){
            this.props.when_add_word_button_tapped()
        }
        else if(action_id == 'when_set_wallet_button_tapped'){
            this.props.when_set_wallet_button_tapped()
        }
        else if(action_id == 'open_wiki'){
            this.props.open_wiki()
        }
        else if(action_id == 'add_indexing_tag'){
            this.props.add_indexing_tag_for_new_job()
        }
        else if(action_id == 'when_add_text_button_tapped'){
            this.props.when_add_text_button_tapped()
        }
    }

    when_tag_item_clicked(tag, pos, action_id){
        if(action_id == 'when_number_picker_power_tapped'){
            this.props.when_number_picker_power_tapped(tag, pos)
        }
        else if(action_id == 'delete_entered_seed_word'){
            this.props.delete_entered_seed_word(tag, pos)
        }
        else if(action_id == 'delete_entered_tag_word'){
            this.props.delete_entered_tag(tag, pos)
        }
        else if(action_id == 'delete_added_tag'){
            this.props.delete_added_tag(tag, pos)
        }
        else if(action_id == 'select_deselect_tag'){
            this.props.select_deselect_tag(tag, pos)
        }
        else if(action_id == 'when_contract_exchange_tapped'){
            this.props.when_contract_exchange_tapped(tag, pos, this.props.object)
        }
        else if(action_id == 'when_view_account_exchange_tapped'){
            this.props.when_view_account_exchange_tapped(tag, pos)
        }
        else if(action_id == 'when_city_selected'){
            this.props.when_city_selected(tag, pos)
        }
        else if(action_id == 'when_language_selected'){
            this.props.when_language_selected(tag, pos)
        }
        else if(action_id == 'when_dialer_country_selected'){
            this.props.when_dialer_country_selected(tag, pos)
        }
        else if(action_id == 'when_dialer_included_country_selected'){
            this.props.when_dialer_included_country_selected(tag, pos)
        }
        else if(action_id == 'when_dialer_dark_emblem_country_selected'){
            this.props.when_dialer_dark_emblem_country_selected(tag, pos)
        }
        else if(action_id == 'when_add_translation_language_tapped'){
            this.props.when_add_translation_language_tapped(tag, pos)
        }
        else if(action_id == 'when_spend_country_selected'){
            this.props.when_spend_country_selected(tag, pos)
        }
        else if(action_id == 'when_spend_included_country_selected'){
            this.props.when_spend_included_country_selected(tag, pos)
        }
        else if(action_id == 'when_typed_moderator_country_selected'){
            this.props.when_typed_moderator_country_selected(tag, pos)
        }
    }

    when_image_clicked(items, index){
        try{
            this.props.show_images(items, index)
        }catch(e){

        }
        
    }

    handleLinkClick = (url, e) => {
        e.preventDefault(); // stop normal navigation
        this.props.show_view_iframe_link_bottomsheet(url)
    };


    get_image_from_file(ecid){
        try{
            if(ecid == null) return empty_image
            if(!ecid.startsWith('image')) return ecid
            var ecid_obj = this.get_cid_split(ecid)
            if(this.props.uploaded_data[ecid_obj['filetype']] == null) return empty_image
            var data = this.props.uploaded_data[ecid_obj['filetype']][ecid_obj['full']]
            if(data == null) return empty_image
            return data['data']
        }catch(e){
            console.log(e)
            console.log('view_groups',ecid)
            return empty_image
        }
        
        
    }

    get_cid_split(ecid){
        var split_cid_array = ecid.split('_');
        var filetype = split_cid_array[0]
        var cid_with_storage = split_cid_array[1]
        var cid = cid_with_storage
        var storage = 'ch'
        if(cid_with_storage.includes('.')){
            var split_cid_array2 = cid_with_storage.split('.')
            cid = split_cid_array2[0]
            storage = split_cid_array2[1]
        }

        return{'filetype':filetype, 'cid':cid, 'storage':storage, 'full':ecid}
    }

}




export default ViewGroups;