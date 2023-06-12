import React, { Component } from 'react';

import CanvasJSReact from './../externals/canvasjs.react';
import E5EmptyIcon from './../assets/e5empty_icon.png';

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
        var background_color = 'rgb(217, 217, 217,.6)';
        var divider_color = '#BFBFBF';
        var border_radius = '7px';

        if(item_id=='0'){/* line */
            return(
                <div style={{height:'1px', 'background-color':'#C1C1C1', 'margin': '20px 20px 20px 20px'}}/>
            );
        }
        else if(item_id=='1'){/* tags */
            var active_tags = ['tag1','tag2','tag3']
            var tag_background_color = '#787878';
            
            if(object_data != null){
              active_tags = object_data['active_tags']
              if(object_data['index_option'] == 'indexed'){
                tag_background_color = '#5e5e5e';
              }
              if(object_data['active_tags'].length == 0){
                active_tags = ['e'];
              }
            }
            return (
                <div style={{'margin':'0px 0px 0px 5px','padding': '5px 0px 7px 0px', width: '97%', 'background-color': 'transparent','border-radius': border_radius}}>
                    <ul style={{'list-style': 'none', 'padding': '0px 0px 5px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '13px', 'margin':'0px 0px 0px 0px'}}>
                      {active_tags.map((item, index) => (
                          <li style={{'display': 'inline-block', 'padding': '5px 5px 5px 1px', '-ms-overflow-style': 'none', height:30}}>
                              <div style={{'background-color': tag_background_color, 'border-radius': '19px', 'box-shadow': '0px 0px 1px 1px #868686'}} onClick={()=> this.when_tag_item_clicked(item, index, object_data['when_tapped'])}>
                                <p style={{'color': 'white', 'font-size': '16px', 'padding':' 4px 17px 4px 17px', 'text-align': 'justify'}} className="text-center">{item}</p>
                            </div>
                          </li>
                      ))}
                  </ul>
                </div>
            );
        }
        else if(item_id=='2'){/* number */
            var style = object_data != null ? object_data['style']: 's'
            var title = object_data != null ? object_data['title']:'Post Block Number'
            var subtitle = object_data != null ? object_data['subtitle']:'depth'
            var barwidth = object_data != null ? object_data['barwidth']:'84%'
            var number = object_data != null ? object_data['number']:'123,445,555'
            var barcolor = object_data != null ? object_data['barcolor']:'#606060'
            var relativepower = object_data != null ? object_data['relativepower']:'500 blocks'
            if(style == 's'){
              return ( 
                  <div style={{'margin': '0px 20px 0px 20px'}}>                   
                      <div style={{ height: 2, width: "100%", 'border-radius': '5px', 'box-shadow': '0px 0px 1px 1px #CECDCD', 'margin': '0px 0px 4px 0px' }}>
                          <div className="progress" style={{ height: 2, width: "100%", 'background-color': '#BFBFBF' }}>
                              <div className="progress-bar" role="progressbar" style={{ width: barwidth, 'background-image': 'none','background-color': barcolor, 'border-radius': '0px 3px 3px 0px' }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                          </div>
                      </div>

                      <div className="row">
                          <div className="col-9" style={{'padding': '0px 0px 0px 14px' }}> 
                              <p style={{'color': '#444444', 'font-size': '10px', height: '100%'}} className="fw-bold">{number}</p>
                          </div>
                          <div className="col-3" style={{'padding': '0px 15px 0px 0px' }}>
                              <p style={{'color': '#444444', 'font-size': '9px', height: '100%', 'padding-top':' 1px'}} className="text-end">{relativepower}</p>
                          </div>
                      </div>
                  </div>
              );
            }else{
                return ( 
                    <div style={{'margin': '5px 20px 0px 15px'}}>
                        <div className="row">
                            <div className="col-9" style={{'padding': '0px 0px 0px 14px' }}> 
                            <p style={{'color': '#444444', 'font-size': '11px', height: 7}} className="fw-bold">{title}</p>
                            </div>
                            <div className="col-3" style={{'padding': '0px 15px 0px 0px' }}>
                                <p style={{'color': '#444444', 'font-size': '11px', height: 7, 'padding-top':' 0.5px'}} className="text-end">{subtitle}</p>
                            </div>
                        </div>
                        
                        <div style={{ height: 3, width: "100%", 'border-radius': '5px', 'box-shadow': '0px 0px 2px 1px #CECDCD', 'margin': '0px 0px 4px 0px' }}>
                            <div className="progress" style={{ height: 3, width: "100%", 'background-color': '#BFBFBF' }}>
                                <div className="progress-bar" role="progressbar" style={{ width: barwidth, 'background-image': 'none','background-color': barcolor, 'border-radius': '0px 3px 3px 0px' }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-9" style={{'padding': '0px 0px 0px 14px' }}> 
                                <p style={{'color': '#444444', 'font-size': '11px', height: '100%'}} className="fw-bold">{number}</p>
                            </div>
                            <div className="col-3" style={{'padding': '0px 15px 0px 0px' }}>
                                <p style={{'color': '#444444', 'font-size': '10px', height: '100%', 'padding-top':' 1px'}} className="text-end">{relativepower}</p>
                            </div>
                        </div>
                    </div>
                );
            }
        }
        else if(item_id=='3' || item_id=='8'){/* label-id */
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
            if(item_id == '8'){
                var img = E5EmptyIcon;
                if(object_data != null){
                    img = object_data['image'];
                }
               return (
                <div style={{'display': 'flex','flex-direction': 'row','padding': '10px 15px 10px 15px','margin':'0px 0px 0px 0px', 'background-color': background_color,'border-radius': border_radius}}>
                    <div className="row" style={{height:'100%', width:'70%'}}>
                        <div className="col-3">
                            <img src={img} style={{height:40 ,width:'auto'}} />
                        </div>
                        <div className="col">
                            <p style={{'font-size': font_size[0],'color': '#444444','margin': '0px 0px 0px 0px','font-family': 'Sans-serif','text-decoration': 'none', height:'auto'}}>{title}</p> 
                            <p style={{'font-size': font_size[1],'color': '#747474','margin': '0px 0px 0px 0px','font-family': 'Sans-serif','text-decoration': 'none','word-wrap': 'break-word' }}>{details}</p>
                        </div>
                    </div>
                </div>
            ); 
            }else{
                return (
                    <div style={{'display': 'flex','flex-direction': 'row','padding': '7px 15px 10px 15px','margin':'0px 0px 0px 0px', 'background-color': background_color,'border-radius': border_radius}}>
                        <div style={{height:'100%', width:'70%'}}>
                            <div>
                                {/* light mode , title: #444444, details:#BFBFBF , Sans-serif , Times New Roman  */}
                                <p style={{'font-size': font_size[0],'color': '#444444','margin': '0px 0px 0px 0px','font-family': 'Sans-serif','text-decoration': 'none', height:'auto'}}>{title}</p> 
                                <p style={{'font-size': font_size[1],'color': '#747474','margin': '0px 0px 0px 0px','font-family': 'Sans-serif','text-decoration': 'none'}}>{details}</p>
                            </div>
                        </div>
                    </div>
                );
            }
        }
        else if(item_id=='4'){/* text */
            var font = 'Sans-serif';/* Sans-serif , Times New Roman */
            var textsize = '15px';
            var text = 'some random text';
            var color = 'dark-grey';

            if(object_data!=null){
              font = object_data['font'];
              textsize = object_data['textsize'];
              text = object_data['text'];
              color = object_data['color'];
            }

            return(
                <div style={{'margin':'0px 0px 0px 0px','padding': '0px 0px 0px 0px'}}>
                    <div style={{'padding': '0px 3px 0px 3px','margin': '0px 0px 0px 0px'}} onClick={() => console.log('text-tapped')}>
                      <div style={{width: '100%','background-color': background_color, 'box-shadow': '0px 0px 0px 0px #CECDCD','margin': '0px 0px 0px 2px','padding': '5px 5px 5px 10px','border-radius': '8px' }}>
                          <p style={{'font-size': textsize,'color': color,'margin': '5px 0px 5px 0px','font-family': font,'text-decoration': 'none'}}>{this.format_text_if_empty_or_null(text)}</p>
                      </div>
                    </div>
                </div>
                
            );
        }
        else if(item_id=='5'){/* button */
            var text = 'buy'
            var action = 'none'
            if(object_data!= null){
              text = object_data['text'];
              action = object_data['action']
            }
            return(
                <div onClick={()=> this.when_action_button_clicked(action)} style={{'margin':'10px 0px 10px 5px','padding': '0px 0px 0px 0px'}}>
                    <button style={{'background-color': '#444444', 'color': 'white','border-radius': '13px', width:'100%', 'border': 'none','text-decoration': 'none','font-size': '15px','padding':'8px 0px 8px 0px','margin':'0px 0px 0px 0px','box-shadow': '0px 0px 2px 1px #CECDCD','text-transform': 'capitalize'}}>
                      {text}
                    </button>
                </div>
                
            );
        }
        else if(item_id=='6'){/* chart */
            var default_chart_color = object_data != null ? object_data['chart_color']: '#FCFCFC';//#FCFCFC(default white-ish) #444444(default dark-ish)
            var background_color= object_data != null ? object_data['background_color']: '#D5D5D5';
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
                  labelFontColor: "#292929" //#292929 #DEDEDE
              },
              axisY:{
                  labelFontSize: 10,
                  interval: 30,//size of space between labels
                  tickLength: 0,
                  gridThickness: 0.3,
                  gridColor: "#767676",
                  lineColor: "rgb(210, 210, 210,.0)",
                  labelFontColor: "#292929"//#292929 #DEDEDE
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
                        indexLabelFontColor: "#292929",
                        indexLabelFontFamily:"Sans-serif",
                        indexLabelFontWeight:"bold",
                        dataPoints: dataPoints
              }]
            }

            return(
                <div style={{'margin':'10px 10px 0px 15px','padding': '10px 10px 0px 10px', 'background-color': background_color, height:430, 'border-radius': border_radius}}>
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
                        <p style={{'font-size': '21px','color': '#444444','margin': '0px 0px 0px 0px','font-family': 'Sans-serif','text-decoration': 'none', height:30}}>{header}</p> 
                        <p style={{'font-size': '16px','color': '#747474','margin': '0px 0px 0px 0px','font-family': 'Sans-serif','text-decoration': 'none'}}>{subtitle}</p>
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
    }

    when_tag_item_clicked(tag, pos, action_id){
        if(action_id == 'when_number_picker_power_tapped'){
            this.props.when_number_picker_power_tapped(tag, pos)
        }
    }

}




export default ViewGroups;