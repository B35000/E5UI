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

import CanvasJSReact from './../externals/canvasjs.react';
import E5EmptyIcon from './../assets/e5empty_icon.png';
import empty_image from './../assets/default_image_background.png'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Linkify from "linkify-react";
import Markdown from 'react-markdown'


var CanvasJSChart = CanvasJSReact.CanvasJSChart;


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

class ViewGroups extends Component {
      
    state = {
        keyboard_showing: false,
    };

    render(){
        return(
            <div>
                {this.render_detail_item(this.props.item_id, this.props.object_data)}
            </div>
        )
    }


    /* renders the specific element in the post or detail object */
    render_detail_item(item_id, object_data){
        var background_color = this.props.theme['view_group_card_item_background'];
        var border_radius = '7px';
        // var E5EmptyIcon = 'https://nftstorage.link/ipfs/bafkreib7qp2bgl3xnlgflwmqh7lsb7cwgevlr4s2n5ti4v4wi4mcfzv424'

        if(item_id=='0'){/* line */
            /* {this.render_detail_item('0')} */
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
              
            }
            return (
                <div style={{'margin':'0px 0px 0px 5px','padding': '5px 0px 7px 0px', width: '99%', 'background-color': 'transparent','border-radius': border_radius, height:'40px'}}>
                    <ul style={{'list-style': 'none', 'padding': '0px 0px 5px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '13px', 'margin':'0px 0px 5px 0px','overflow-y': 'hidden', 'scrollbar-width': 'none'}}>
                      {active_tags.map((item, index) => (
                          <li style={{'display': 'inline-block', 'padding': '5px 5px 5px 1px', '-ms-overflow-style': 'none', height:40}}>
                              <div style={{'background-color': this.get_tag_color(item, selected_tags, tag_background_color), 'border-radius': '19px', 'box-shadow': '0px 0px 1px 1px '+tag_shadow}} onClick={()=> this.when_tag_item_clicked(item, index, when_tapped)}>
                                <p style={{'color': this.props.theme['tag_text_color'], 'font-size': '14px', 'padding':' 4px 17px 4px 17px', 'text-align': 'justify', 'font-family': this.props.font}} className="text-center">{item}</p>
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
            
            if(object_data != null){
                title = object_data['title']
                details = object_data['details']
                size = object_data['size']
                padding = object_data['padding'] == null ? '10px 15px 10px 15px' : object_data['padding']
                text_align = object_data['text_align'] == null ? 'left' : object_data['text_align']
                title_image = object_data['title_image'] == null ? '' : object_data['title_image']
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
            if(item_id == '8'){
                var img = E5EmptyIcon;
                if(object_data != null){
                    img = object_data['image'];
                    if(object_data['border_radius'] != null) image_border_radius = object_data['border_radius']
                    if(object_data['image_width'] != null) image_width = object_data['image_width']
                }

               return (
                    <div style={{'display': 'flex','flex-direction': 'row','padding': '10px 15px 10px 0px','margin':'0px 0px 0px 0px', 'background-color': background_color,'border-radius': border_radius}}>
                        <div style={{'display': 'flex','flex-direction': 'row','padding': '0px 0px 0px 5px', width: '99%'}}>
                            <div>
                                <img src={this.get_image_from_file(img)} alt={title} style={{height:font_size[3] ,width:image_width, 'border-radius': image_border_radius}}/>
                            </div>
                            <div style={{'margin':'0px 0px 0px 10px'}}>
                                <p style={{'font-size': font_size[0],'color': this.props.theme['primary_text_color'],'margin': font_size[4],'font-family': this.props.font,'text-decoration': 'none', height:'auto', 'word-wrap': 'break-word'}} onClick={() => this.copy_id_to_clipboard(title)}>{title}</p> 
                                
                                <p style={{'font-size': font_size[1],'color': this.props.theme['secondary_text_color'],'margin': '0px 0px 0px 0px','font-family': this.props.font,'text-decoration': 'none', 'white-space': 'pre-line', 'word-wrap': 'break-word' }} onClick={() => this.copy_id_to_clipboard(details)}>{details}</p>
                            </div>
                        </div>
                    </div>
                ); 
            }else{
                return(
                    <div style={{'display': 'flex','flex-direction': 'row','padding': padding,'margin':'0px 0px 0px 0px', 'background-color': background_color,'border-radius': border_radius}}>
                        <div style={{height:'100%', width:'100%'}}>
                            <div>
                                <div style={{'display': 'flex','flex-direction': 'row'}}>
                                    {this.render_text_image(title_image, font_size)}
                                    <p style={{'font-size': font_size[0],'color': this.props.theme['primary_text_color'],'margin': '0px 0px 0px 0px','font-family': this.props.font,'text-decoration': 'none', height:'auto', 'word-wrap': 'break-word', 'overflow-wrap':'break-word', 'word-break': 'break-all','text-align':text_align}} onClick={() => this.copy_id_to_clipboard(title)}>{title}</p>
                                </div>

                                <p style={{'font-size': font_size[1],'color': this.props.theme['secondary_text_color'],'margin': '0px 0px 0px 0px','font-family': this.props.font,'text-decoration': 'none', 'white-space': 'pre-line', /* 'overflow-wrap':'break-word', */ 'text-align':text_align}} onClick={() => this.copy_id_to_clipboard(details)}>{details}</p>
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

            if(object_data!=null){
              font = object_data['font'];
              textsize = object_data['textsize'];
              text = object_data['text'];
            }

            return(
                <div style={{'margin':'0px 0px 0px 0px','padding': '0px 0px 0px 0px'}}>
                    <div style={{'padding': '0px 0px 0px 0px','margin': '0px 0px 0px 0px'}} onClick={() => this.copy_id_to_clipboard(text)}>
                      <div style={{width: '100%','background-color': background_color, 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 2px','padding': '5px 5px 5px 10px','border-radius': '8px' }}>
                          
                            <p style={{'font-size': textsize,'color': color,'margin': '5px 0px 5px 0px','font-family': font,'text-decoration': 'none', 'white-space': 'pre-line', 'word-wrap': 'break-word'}}><Linkify options={{target: '_blank'}}>{this.format_text_if_empty_or_null(text)}</Linkify></p>

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
            var prevent_default = false
            if(object_data!= null){
                text = object_data['text'];
                action = object_data['action']
                prevent_default = object_data['prevent_default'] == null ? false : object_data['prevent_default']
            }
            return(
                <div onClick={()=> this.when_action_button_clicked(action)} style={{'margin':'0px 0px 0px 0px','padding': '0px 0px 0px 0px'}}>
                    <button style={{'background-color': this.props.theme['button_color'], 'color': this.props.theme['button_text_color'], 'border-radius': '17px', width:'100%', 'border': 'none','text-decoration': 'none','font-size': '13px','padding':'8px 0px 8px 0px','margin':'0px 0px 0px 0px','box-shadow': '0px 0px 2px 1px '+this.props.theme['card_shadow_color'],'text-transform': 'capitalize', 'font-family': this.props.font}} onMouseDown={(e) => this.when_any_button_tapped(e, prevent_default)}>
                      {text}
                    </button>
                </div>
                
            );
        }
        else if(item_id=='6'){/* chart */
            var default_chart_color = this.props.theme['chart_color'];
            var background_color = this.props.theme['chart_background_color'];
            var dataPoints = object_data != null ? object_data['dataPoints']: this.generateDataPoints(23);
            var interval = (object_data != null) ? object_data['interval'] : 0
            var label_font_size = 10
            if(object_data != null && object_data['hide_label'] != null){
                if(object_data['hide_label']){
                    label_font_size = 0
                }
            }
            const options = {
              theme: "light1", // "light1", "dark1", "dark2"
              animationEnabled: true,
              zoomEnabled: false,
              title: {
                  text: ".",
                  fontColor: "rgb(210, 210, 210,.0)",
                  fontSize: 13
              },
              backgroundColor: background_color,//#F5F5F5
              axisX:{
                  interval: 30,//size of space between labels
                  labelFontSize: 0,
                  tickLength: 0,
                  gridThickness: 0,
                  lineColor: "rgb(210, 210, 210,.0)",
                  labelFontColor: this.props.theme['primary_text_color'] //#292929 #DEDEDE
              },
              axisY:{
                  labelFontSize: label_font_size,
                  interval: interval,//size of space between labels
                  tickLength: 0,
                  gridThickness: 0.3,
                  gridColor: this.props.theme['line_color'],//"#767676"
                  lineColor: "rgb(210, 210, 210,.0)",
                  labelFontColor: this.props.theme['primary_text_color']//#292929 #DEDEDE
              },
              toolTip:{
                  enabled: false   //enable here
              },
              height:230,
              data: [{
                        type: this.props.graph_type,//area, splineArea
                        color:default_chart_color,
                        lineThickness: 0.5,
                        fillOpacity: 1,
                        markerColor: "transparent",
                        indexLabelFontColor: this.props.theme['primary_text_color'],
                        indexLabelFontFamily:"Sans-serif",
                        indexLabelFontWeight:"bold",
                        dataPoints: dataPoints,
              }]
            }

            return(
                <div style={{'margin':'10px 0px 0px 0px','padding': '10px 10px 0px 10px', 'background-color': background_color, height:260, 'border-radius': border_radius}}>
                    <div style={{'padding':'0px 0px 10px 0px', height:250}}>
                        <div style={{'margin': '10px 0px 0px 0px'}}>
                          <div style={{ height: 200, width: '100%' ,'position': 'relative'}}>
                              <div style={{ height: 30, width: '100%', 'background-color': background_color ,'position': 'absolute', 'z-index':'3' ,'margin': '-15px 0px 0px 0px'}}/>

                              <CanvasJSChart style={{ width: '100%' , 'z-index':'2' ,'position': 'fixed'}} options = {options}/>
                              
                              <div style={{ height: 19, width: '100%', 'background-color': background_color ,'position': 'absolute', 'z-index':'3' ,'margin': '-15px 0px 0px 0px'}}/>
                          </div>
                      </div>
                    </div>
                </div>
            );
        }
        else if(item_id=='7'){/* banner-icon */
            var header = object_data != null ? object_data['header']:'E35'
            var subtitle = object_data != null ? object_data['subtitle']:'ETC'
            var img = object_data != null ? object_data['image']:E5EmptyIcon;
            var width = '180px'
            var height = '180px'
            if(object_data != null && object_data['width_height']!= null){
                width = object_data['width_height']
                height = width;
            }
            if(object_data != null && object_data['height']!= null){
                height = object_data['height']
            }

            return(
                <div style={{height:230, width:'90%','display': 'flex', 'align-items':'center','justify-content':'center','padding':'0px 0px 0px 50px'}}>
                    <img alt="" src={this.get_image_from_file(img)} style={{height: height ,width: width,'border-radius':'15%'}} />

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
            return(
                <div style={{'margin':'5px 0px 0px 10px'}}>
                    <ImageList sx={{ width: 'auto', height: 'auto' }} cols={col} rowHeight={rowHeight}>
                        {items.map((item, index) => (
                            <ImageListItem key={item.img}>
                                <div style={{}} onClick={() => this.when_image_clicked(items, index)}>
                                    <img alt="" src={this.get_image_from_file(item)} style={{width:45, height:45, 'border-radius': '50%'}} />
                                </div> 
                            </ImageListItem>
                        ))}
                    </ImageList>
                </div>
            ) 
        }
        else if(item_id=='10'){/* text2 */
            /* {this.render_detail_item('10', {'text':'', 'textsize':'', 'font':''})} */
            var font = 'Sans-serif';/* Sans-serif , Times New Roman */
            var textsize = '15px';
            var text = 'some random text';
            var color = this.props.theme['primary_text_color'];

            if(object_data!=null){
              font = object_data['font'];
              textsize = object_data['textsize'];
              text = object_data['text'];
            }

            return(
                <div style={{'margin':'0px 0px 0px 0px','padding': '0px 0px 0px 0px'}}>
                    <div style={{'padding': '0px 3px 0px 3px','margin': '0px 0px 0px 0px'}} onClick={() => this.copy_id_to_clipboard(text)}>
                        <p style={{'font-size': textsize,'color': color,'margin': '5px 0px 5px 0px','font-family': font,'text-decoration': 'none', 'white-space': 'pre-line', 'word-wrap': 'break-word'}}><Linkify options={{target: '_blank'}}>{this.format_text_if_empty_or_null(text)}</Linkify></p>

                        {/* <p style={{'font-size': textsize,'color': color,'margin': '5px 0px 5px 0px','font-family': font,'text-decoration': 'none', 'white-space': 'pre-line', 'word-wrap': 'break-word'}} dangerouslySetInnerHTML={{ __html: urlify(this.format_text_if_empty_or_null(text)) }} /> */}
                    </div>
                </div>
                
            );
        }
        else if(item_id=='11'){/* banner */
            var img = object_data != null ? object_data['image']:E5EmptyIcon;
            var caption = object_data != null ? object_data['caption']:{'text':'E5', 'textsize':'10px', 'font':'Times New Roman'}
            return(
                <div style={{width:'90%', margin:'0px 0px 0px 10px'}}>
                    <img alt="" src={this.get_image_from_file(img)} style={{height:'auto' ,width:'90%'}} />
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
            var theme = this.props.theme['markdown_theme']
            var padding = '10px 15px 10px 15px'
            return(
                <div style={{padding:'5px 10px 5px 10px', width:'100%', 'border-radius': border_radius, 'background-color':this.props.theme['view_group_card_item_background']}}>
                    <Markdown
                    components={{
                            p: ({ node, ...props }) => <p style={{ color: this.props.theme['secondary_text_color'],  'word-wrap': 'break-word' }} {...props} />,
                            h1: ({ node, ...props }) => <h1 style={{ color:this.props.theme['primary_text_color'] }} {...props} />,
                            h2: ({ node, ...props }) => <h2 style={{ color: this.props.theme['primary_text_color'] }} {...props} />,
                            h3: ({ node, ...props }) => <h3 style={{ color: this.props.theme['primary_text_color'] }} {...props} />,
                            h4: ({ node, ...props }) => <h4 style={{ color: this.props.theme['primary_text_color'] }} {...props} />,
                            h5: ({ node, ...props }) => <h5 style={{ color: this.props.theme['primary_text_color'] }} {...props} />,
                            h6: ({ node, ...props }) => <h6 style={{ color: this.props.theme['primary_text_color'] }} {...props} />,
                            li: ({ node, ...props }) => <li style={{ color: this.props.theme['secondary_text_color'] }} {...props} />,
                            a: ({ node, ...props }) => <a style={{ color: this.props.theme['secondary_text_color'] }} {...props} target="_blank" rel="noopener noreferrer" />,
                            hr: ({ node, ...props }) => <hr style={{ color: this.props.theme['line_color'] }} {...props} />,
                            br: ({ node, ...props }) => <br style={{ color: this.props.theme['line_color'] }} {...props} />,
                        }}
                    >{source}</Markdown>
                </div>
            )
        }

    }

    render_text_image(title_image, font_size){
        if(title_image != null && title_image != ''){
            return(
                <div style={{'display': 'flex','flex-direction': 'row', 'padding':'1px 0px 0px 0px'}}>
                    <img src={this.get_image_from_file(title_image)} alt={title_image} style={{height:font_size[5],width:font_size[5]}}/>
                    <div style={{width:2}}/>
                </div>
            )
        }
    }

    when_any_button_tapped(e, prevent_default){
        if(prevent_default){
            e.preventDefault()
            console.log('prevented default!')
        }
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
    }

    when_image_clicked(items, index){
        try{
            this.props.show_images(items, index)
        }catch(e){

        }
        
    }


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