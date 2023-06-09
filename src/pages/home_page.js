import React, { Component } from 'react';
import Background from './../assets/background.png'
import JobIconImg from './../assets/job_icon.png';  
import ExploreIconImg from './../assets/explore_icon.png'; 
import WalletIconImg from './../assets/wallet_icon.png'; 
import StackIconImg from './../assets/stack_icon.png';

class home_page extends Component {
    
    state = {
        page: '?',
    };

    render(){
        var size = this.props.screensize;
        var top_bar = 50;
        var middle = this.props.height-126;
        var bottom_bar = 76;
        var width = this.props.width;
        var navbar_color = '#444444';// #444444
        var background_color = '#F1F1F1';//#F1F1F1


        if(size == 'l'){
        return ( 
            <div className="row" style={{height: this.state.height, width:'102%', 'background-color':background_color}}>
                <div className="col-1" style={{'margin':'20px 20px 20px 15px'}}>
                    <div style={{height:15, width:90, 'background-color': '#F7F7F7','border-radius': '20px 20px 0px 0px','border-width':'0px', 'border-color':'#AAAAAA', 'border-style': 'solid solid hidden solid'}}/>
                    <div style={{height:15, width:90, 'background-color': navbar_color, opacity:0.2}}/>
                    <div style={{height:15, width:90, 'background-color': navbar_color, opacity:0.4}}/>
                    <div style={{height:15, width:90, 'background-color': navbar_color, opacity:0.6}}/>
                    <div style={{height:(this.state.height-100), width:90, 'background-color':  navbar_color,'border-radius': '0px 0px 20px 20px'}}>
                        {this.render_navbar_button_group(size)}
                    </div>
                </div>

                <div className="col" style={{backgroundImage: `url(${Background})` , backgroundRepeat: 'no-repeat', backgroundSize: 'cover', height:this.props.height}} >
                    <div style={{height:top_bar, width:'99%', 'padding':'9px 0px 0px 5px'}}>
                        {this.render_top_tag_bar(size)}
                    </div>
                    
                    
                    <div className="row" style={{height:(middle+50), width:'97%'}}>
                        <div className="col-5" style={{height: (window.screen.availHeight-60)}}>
                            {this.render_post_list_group(size)}
                        </div>
                        
                        <div className="col" style={{height:(middle+50), width:'97%'}}>
                            {this.render_post_detail_object(size)}
                        </div>
                        
                    </div>
                </div>   
            </div>
        );
      }
    }


    render_navbar_button_group(size){
        //#545454 - highlight color
        if(size == 'l'){
            return ( 
                <div style={{height: '100%', width:'100%', padding:'5px 0px 0px 0px'}}>      
                  <div style={{height:'1px', 'background-color':'#7E7E7E', 'margin': '0px 80% 0px 0px'}}/>
                  <div style={{'background-color':this.get_navbar_normal_or_highlighted_button_background('?'), padding:'0px 5px 0px 0px'}} onClick={() => this.when_bottom_navbar_button_clicked('?')}>
                      {this.render_navbar_button('s', '1px 0px 10px 5px', JobIconImg, 'auto', '60px','5px 12px 0px 11px','????','44 tabs open')} 
                  </div>
                

                  <div style={{height:'1px', 'background-color':'transparent', 'margin': '20px 12px 5px 0px'}}/>
                  <div style={{'background-color':this.get_navbar_normal_or_highlighted_button_background('e'), padding:'0px 5px 0px 0px'}} onClick={() => this.when_bottom_navbar_button_clicked('e')}>
                      {this.render_navbar_button('s', '0px 0px 10px 5px', ExploreIconImg, 'auto', '50px','5px 11px 0px 10px','Explore','44 tabs open')}
                      
                  </div>
                

                  <div style={{height:'1px', 'background-color':'transparent', 'margin': '20px 12px 5px 0px'}}/>
                  <div style={{'background-color':this.get_navbar_normal_or_highlighted_button_background('w'), padding:'0px 5px 0px 0px'}} onClick={() => this.when_bottom_navbar_button_clicked('w')}>
                    {this.render_navbar_button('s', '0px 0px 10px 5px', WalletIconImg, 'auto', '55px','5px 10px 6px 10px','Stack','3 wallets open')}
                      
                  </div>
                

                  <div style={{height:'1px', 'background-color':'transparent', 'margin': '10px 12px '+(window.screen.availHeight-495)+'px 0px'}} />
                    <div style={{'background-color':'transparent', padding:'0px 5px 0px 0px'}} onClick={() => this.when_bottom_navbar_button_clicked('s')}>
                        {this.render_navbar_button('s', '0px 0px 0px 5px', StackIconImg, 'auto', '50px','1px 11px 2px 12px','Stack','5 transactions')}
                    </div>
                  <div style={{height:'20px', 'background-color':'transparent', 'margin': '0px 12px 5px 0px'}}/>
            </div>
                
            );
        }
        else if(size == 'm'){
          return ( 
              <div className="row" style={{'padding':'0px 0px 0px 10px', height:'100%'}}>
                  <div className="col" style={{'background-color': this.get_navbar_normal_or_highlighted_button_background('?'),'padding':'5px 0px 0px 30px', 'border-radius': '0px 0px 0px 0px'}} onClick={()=> this.when_bottom_navbar_button_clicked('?')}>
                      {this.render_navbar_button('l','1px 0px 0px 12px', JobIconImg, 'auto', '70px','3px 12px 3px 19px','????','44 tabs open')}
                  </div>

                  <div className="col" style={{'padding':'5px 0px 0px 30px','background-color': this.get_navbar_normal_or_highlighted_button_background('e')}} onClick={() => this.when_bottom_navbar_button_clicked('e')}>
                    {this.render_navbar_button('l','2px 0px 0px 3px', ExploreIconImg, 'auto', '60px','5px 11px 0px 20px','Explore','44 tabs open')}
                  </div>

                  <div className="col" style={{'padding':'5px 0px 0px 30px', 'background-color': this.get_navbar_normal_or_highlighted_button_background('w')}} onClick={() => this.when_bottom_navbar_button_clicked('w')}>
                    {this.render_navbar_button('l','2px 0px 0px 15px', WalletIconImg, 'auto', '70px','5px 10px 6px 17px','Wallet','3 wallets open')}
                  </div>
                  
                  <div className="col" style={{'padding':'5px 0px 0px 30px'}} onClick={() => this.when_bottom_navbar_button_clicked('s')}>
                    {this.render_navbar_button('l','2px 0px 0px 5px', StackIconImg, 'auto', '59px','3px 11px 2px 12px','Stack','6 transactions')}
                  </div>
              </div>
          );
        }else if(size == 's'){
          return(
            <div className="row" style={{'padding':'0px 0px 0px 0px','display':'flex', 'align-items': 'center', height:'100%', width:'100%'}}>
                  <div className="col" style={{height: '100%', width:'100%', padding:'0px 0px 0px 0px', 'background-color': this.get_navbar_normal_or_highlighted_button_background('?'),'border-radius': '1px 0px 0px 0px'}} onClick={() => this.when_bottom_navbar_button_clicked('?')}>
                      {this.render_navbar_button('s','0px 0px 0px 0px', JobIconImg, 'auto', '38px','5px 0px 0px 0px','????','44 tabs')}
                  </div>

                  <div className="col" style={{height: '100%', width:'100%', padding:'0px 0px 0px 1px', 'background-color': this.get_navbar_normal_or_highlighted_button_background('e')}} onClick={() => this.when_bottom_navbar_button_clicked('e')}>
                      {this.render_navbar_button('s','0px 0px 0px 0px', ExploreIconImg, 'auto', '30px','5px 0px 0px 0px','????','44 tabs')}
                  </div>

                  <div className="col" style={{height: '100%', width:'100%', padding:'0px 0px 0px 1px', 'background-color': this.get_navbar_normal_or_highlighted_button_background('w')}} onClick={() => this.when_bottom_navbar_button_clicked('w')}>
                    {this.render_navbar_button('s','0px 0px 0px 0px', WalletIconImg, 'auto', '42px','6px 0px 0px 0px','Wallet','44 tabs')}
                      
                  </div>

                  <div className="col" style={{height: '100%', width:'100%', padding:'5px 0px 0px 1px'}} onClick={() => this.when_bottom_navbar_button_clicked('s')}>
                    {this.render_navbar_button('s','0px 0px 0px 0px', StackIconImg, 'auto', '30px','3px 0px 0px 0px','Stack','44 tabs')}
                  </div>
              </div>
          );
        }
    }

    /* returns if button selected is highlighted */
    get_navbar_normal_or_highlighted_button_background(val){
      var color = 'transparent';
        if(val == this.state.page){
            color = '#545454';
        }
        return color;
    }
    /* called when a bottom navbar item has been clicked */
    when_bottom_navbar_button_clicked(item){
        if(item == 's'){
            console.log('stack item clicked');
            this.open_view_stack_bottomsheet();
        }
        else {
            this.setState({page: item});
        }
    }

    render_navbar_button(icontype, text_padding, img, img_height, img_width, img_padding, title, tabs){
      if(icontype == 's' || icontype == 'xs'){
            return (
                <div style={{height:'100%', width:'93%', 'padding':text_padding, 'text-align':'center', 'background-color':'transparent'}}>
                    <img src={img} style={{height:img_height,width:img_width, padding: img_padding}} />

                    <p style={{'font-size': '12px','color': 'white','margin': '0px 0px 0px 0px','font-family': 'Sans-serif','text-decoration': 'none', 'text-shadow': '-1px -1px 2px #BABABA'}}>{title}</p>

                    <p style={{'font-size': '8px','color': '#D1D1D1','margin': '0px 0px 0px 0px','font-family': 'Sans-serif','text-decoration': 'none', 'font-weight': 'bold'}} className="text-capitalize">{tabs}</p>
                </div>
            );
        }else{
            return ( 
                <div className="row" style={{ width:'100%', 'padding':'7px 0px 0px 10px', 'border-radius': '0px 0px 0px 0px'}}>
                    <div className="col-3" style={{'padding':'0px 0px 10px 0px'}}>
                        <div style={{height:'7%', width:'100%'}}>
                            <img src={img} style={{height:img_height,width:img_width, padding: img_padding}} />
                        </div>
                    </div>
                    <div className="col" style={{'padding':'0px 0px 0px 10px'}}>
                        <div style={{height:'7%', width:'100%', 'padding':text_padding}}>
                            <p style={{'font-size': '18px','color': 'white','margin': '0px 0px 0px 0px','font-family': 'Sans-serif','text-decoration': 'none', 'text-shadow': '-1px -1px 2px #BABABA'}}>{title}</p> 
                            <p style={{'font-size': '10px','color': '#D1D1D1','margin': '-5px 0px 0px 0px','font-family': 'Sans-serif','text-decoration': 'none', 'font-weight': 'bold'}} className="text-capitalize">{tabs}</p>
                        </div>
                    </div>
                </div> 
            );
        }
    }


    render_top_tag_bar(){

    }


    render_post_list_group(){

    }

    render_post_detail_object(){

    }

}




export default home_page;