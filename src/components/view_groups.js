import React, { Component } from 'react';

import CanvasJSReact from './../externals/canvasjs.react';
import E5EmptyIcon from './../assets/e5empty_icon.png';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class ViewGroups extends Component {
    
    state = {
        selected: 0,
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

        if(item_id=='0'){/* line */
            /* {this.render_detail_item('0')} */
            return(
                <div style={{height:'1px', 'background-color':'#C1C1C1', 'margin': '20px 20px 20px 20px'}}/>
            );
        }
        else if(item_id=='1'){/* tags */
            /* {this.render_detail_item('1', {'active_tags':tags, 'index_option':'indexed'})} */
            var active_tags = ['tag1','tag2','tag3']
            var tag_background_color = this.props.theme['tag_background_color'];
            var tag_shadow = this.props.theme['tag_shadow'];
            var when_tapped = 'null'
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
              
            }
            return (
                <div style={{'margin':'0px 0px 0px 5px','padding': '5px 0px 7px 0px', width: '97%', 'background-color': 'transparent','border-radius': border_radius,height:45}}>
                    <ul style={{'list-style': 'none', 'padding': '0px 0px 5px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '13px', 'margin':'0px 0px 5px 0px','overflow-y': 'hidden',height:45}}>
                      {active_tags.map((item, index) => (
                          <li style={{'display': 'inline-block', 'padding': '5px 5px 5px 1px', '-ms-overflow-style': 'none', height:30}}>
                              <div style={{'background-color': tag_background_color, 'border-radius': '19px', 'box-shadow': '0px 0px 1px 1px '+tag_shadow}} onClick={()=> this.when_tag_item_clicked(item, index, when_tapped)}>
                                <p style={{'color': 'white', 'font-size': '16px', 'padding':' 4px 17px 4px 17px', 'text-align': 'justify'}} className="text-center">{item}</p>
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
                      <div style={{ height: 2, width: "100%", 'border-radius': '5px', 'box-shadow': '0px 0px 1px 1px '+this.props.theme['bar_shadow'], 'margin': '0px 0px 4px 0px' }}>
                          <div className="progress" style={{ height: 2, width: "100%", 'background-color': '#BFBFBF' }}>
                              <div className="progress-bar" role="progressbar" style={{ width: barwidth, 'background-image': 'none','background-color': barcolor, 'border-radius': '0px 3px 3px 0px' }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                          </div>
                      </div>

                      <div className="row">
                          <div className="col-9" style={{'padding': '0px 0px 0px 14px' }}> 
                              <p style={{'color': this.props.theme['primary_text_color'], 'font-size': '10px', height: '100%'}} className="fw-bold">{number}</p>
                          </div>
                          <div className="col-3" style={{'padding': '0px 15px 0px 0px' }}>
                              <p style={{'color': this.props.theme['secondary_text_color'], 'font-size': '9px', height: '100%', 'padding-top':' 1px'}} className="text-end">{relativepower}</p>
                          </div>
                      </div>
                  </div>
              );
            }else{
                return ( 
                    <div style={{'margin': '5px 20px 0px 15px'}}>
                        <div className="row">
                            <div className="col-10" style={{'padding': '0px 0px 0px 14px' }}> 
                            <p style={{'color': this.props.theme['primary_text_color'], 'font-size': '11px', height: 7}} className="fw-bold">{title}</p>
                            </div>
                            <div className="col-2" style={{'padding': '0px 15px 0px 0px' }}>
                                <p style={{'color': this.props.theme['secondary_text_color'], 'font-size': '11px', height: 7, 'padding-top':' 0.5px'}} className="text-end">{subtitle}</p>
                            </div>
                        </div>
                        
                        <div style={{ height: 3, width: "100%", 'border-radius': '5px', 'box-shadow': '0px 0px 2px 1px '+this.props.theme['bar_shadow'], 'margin': '0px 0px 4px 0px' }}>
                            <div className="progress" style={{ height: 3, width: "100%", 'background-color': '#BFBFBF' }}>
                                <div className="progress-bar" role="progressbar" style={{ width: barwidth, 'background-image': 'none','background-color': barcolor, 'border-radius': '0px 3px 3px 0px' }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-9" style={{'padding': '0px 0px 0px 14px' }}> 
                                <p style={{'color': this.props.theme['primary_text_color'], 'font-size': '11px', height: '100%'}} className="fw-bold">{number}</p>
                            </div>
                            <div className="col-3" style={{'padding': '0px 15px 0px 0px' }}>
                                <p style={{'color': this.props.theme['secondary_text_color'], 'font-size': '10px', height: '100%', 'padding-top':' 1px'}} className="text-end">{relativepower}</p>
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
            if(object_data != null){
              title = object_data['title']
              details = object_data['details']
              size = object_data['size']
            }
            var font_size = ['13px', '11px', 17];
            if(size == 'l'){
                font_size = ['17px', '13px', 19];
            }
            if(title == ''){
                title = '...'
            }
            if(details == ''){
                details = '...'
            }
            if(item_id == '8'){
                var img = E5EmptyIcon;
                if(object_data != null){
                    img = object_data['image'];
                }
               return (
                <div style={{'display': 'flex','flex-direction': 'row','padding': '10px 15px 10px 0px','margin':'0px 0px 0px 0px', 'background-color': background_color,'border-radius': border_radius}}>

                    <div style={{'display': 'flex','flex-direction': 'row','padding': '0px 0px 0px 5px', width: '99%'}}>
                        <div>
                            <img src={img} style={{height:50 ,width:'auto', 'border-radius': '50%'}} />
                        </div>
                        <div style={{'margin':'0px 0px 0px 10px'}}>
                            <p style={{'font-size': font_size[0],'color': this.props.theme['primary_text_color'],'margin': '5px 0px 0px 0px','font-family': 'Sans-serif','text-decoration': 'none', height:'auto'}}>{title}</p> 
                            <p style={{'font-size': font_size[1],'color': this.props.theme['secondary_text_color'],'margin': '0px 0px 0px 0px','font-family': 'Sans-serif','text-decoration': 'none', 'white-space': 'pre-line' }}>{details}</p>
                        </div>
                    </div>
                </div>
            ); 
            }else{
                return (
                    <div style={{'display': 'flex','flex-direction': 'row','padding': '7px 15px 10px 15px','margin':'0px 0px 0px 0px', 'background-color': background_color,'border-radius': border_radius}}>
                        <div style={{height:'100%', width:'100%'}}>
                            <div>
                                <p style={{'font-size': font_size[0],'color': this.props.theme['primary_text_color'],'margin': '0px 0px 0px 0px','font-family': 'Sans-serif','text-decoration': 'none', height:'auto'}}>{title}</p> 
                                <p style={{'font-size': font_size[1],'color': this.props.theme['secondary_text_color'],'margin': '0px 0px 0px 0px','font-family': 'Sans-serif','text-decoration': 'none', 'white-space': 'pre-line'}}>{details}</p>
                            </div>
                        </div>
                    </div>
                );
            }
        }
        else if(item_id=='4'){/* text */
            /* {this.render_detail_item('4', {'text':'', 'textsize':'', 'font':''})} */
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
                    <div style={{'padding': '0px 0px 0px 0px','margin': '0px 0px 0px 0px'}} onClick={() => console.log('text-tapped')}>
                      <div style={{width: '100%','background-color': background_color, 'box-shadow': '0px 0px 0px 0px '+this.props.theme['card_shadow_color'],'margin': '0px 0px 0px 2px','padding': '5px 5px 5px 10px','border-radius': '8px' }}>
                          <p style={{'font-size': textsize,'color': color,'margin': '5px 0px 5px 0px','font-family': font,'text-decoration': 'none', 'white-space': 'pre-line'}}>{this.format_text_if_empty_or_null(text)}</p>
                      </div>
                    </div>
                </div>
                
            );
        }
        else if(item_id=='5'){/* button */
            /* {this.render_detail_item('3', {'text':'', 'action':''})} */
            var text = 'buy'
            var action = 'none'
            if(object_data!= null){
              text = object_data['text'];
              action = object_data['action']
            }
            return(
                <div onClick={()=> this.when_action_button_clicked(action)} style={{'margin':'0px 0px 0px 0px','padding': '0px 0px 0px 0px'}}>
                    <button style={{'background-color': '#444444', 'color': 'white','border-radius': '13px', width:'100%', 'border': 'none','text-decoration': 'none','font-size': '15px','padding':'8px 0px 8px 0px','margin':'0px 0px 0px 0px','box-shadow': '0px 0px 2px 1px '+this.props.theme['card_shadow_color'],'text-transform': 'capitalize'}}>
                      {text}
                    </button>
                </div>
                
            );
        }
        else if(item_id=='6'){/* chart */
            var default_chart_color = this.props.theme['chart_color'];
            var background_color = this.props.theme['chart_background_color'];
            var dataPoints = object_data != null ? object_data['dataPoints']: this.generateDataPoints(23);
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
                  labelFontSize: 10,
                  interval: 30,//size of space between labels
                  tickLength: 0,
                  gridThickness: 0.3,
                  gridColor: "#767676",
                  lineColor: "rgb(210, 210, 210,.0)",
                  labelFontColor: this.props.theme['primary_text_color']//#292929 #DEDEDE
              },
              toolTip:{
                  enabled: false   //enable here
              },
              data: [{
                        type: "splineArea",//area
                        color:default_chart_color,
                        lineThickness: 0.5,
                        fillOpacity: 1,
                        markerColor: "transparent",
                        indexLabelFontColor: this.props.theme['primary_text_color'],
                        indexLabelFontFamily:"Sans-serif",
                        indexLabelFontWeight:"bold",
                        dataPoints: dataPoints
              }]
            }

            return(
                <div style={{'margin':'10px 0px 0px 5px','padding': '10px 10px 0px 10px', 'background-color': background_color, height:430, 'border-radius': border_radius}}>
                    <div style={{'padding':'0px 0px 10px 5px', height:420}}>
                        <div style={{'margin': '10px 0px 0px 0px'}}>
                          <div style={{ height: 300, width: '100%' ,'position': 'relative'}}>
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
            return(
                <div style={{height:230, width:'90%','display': 'flex', 'align-items':'center','justify-content':'center','padding':'0px 0px 0px 50px'}}>
                    <img src={img} style={{height:'70%' ,width:'auto'}} />

                    <div style={{'margin':'0px 0px 0px 20px'}}> 
                        <p style={{'font-size': '15px','color': this.props.theme['primary_text_color'],'margin': '0px 0px 0px 0px','font-family': 'Sans-serif','text-decoration': 'none'}}>{header}</p>
                        <p style={{'font-size': '13px','color': this.props.theme['secondary_text_color'],'margin': '0px 0px 0px 0px','font-family': 'Sans-serif','text-decoration': 'none'}}>{subtitle}</p>
                    </div>
                </div>
            );
        }
        else if(item_id =='9'){/* images-list */
            var col = Math.round(this.props.width / 45)
            var rowHeight = 45;
            var items = object_data == null ? [] :object_data['images'];
            var items_pos = object_data == null ? 0 : object_data['pos'];
            return(
                <div style={{'margin':'5px 0px 0px 0px'}}>
                    <ImageList sx={{ width: 'auto', height: 'auto' }} cols={col} rowHeight={rowHeight}>
                        {items.map((item, index) => (
                            <ImageListItem key={item.img}>
                                <div onClick={() => this.when_image_clicked(items, index)}>
                                    <img src={item} style={{height:45 ,width:45, 'border-radius': '50%'}} />
                                </div> 
                            </ImageListItem>
                        ))}
                    </ImageList>
                </div>
            ) 
        }
        else if(item_id=='10'){/* text2 */
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
                    <div style={{'padding': '0px 3px 0px 3px','margin': '0px 0px 0px 0px'}} onClick={() => console.log('text-tapped')}>
                      <p style={{'font-size': textsize,'color': color,'margin': '5px 0px 5px 0px','font-family': font,'text-decoration': 'none'}}>{this.format_text_if_empty_or_null(text)}</p>
                    </div>
                </div>
                
            );
        }

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
    }

    when_image_clicked(items, index){
        this.props.show_images(items, index)
    }

}




export default ViewGroups;