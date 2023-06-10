import React, { Component } from 'react';
import Background from './../assets/background.png'
import JobIconImg from './../assets/job_icon.png';  
import ExploreIconImg from './../assets/explore_icon.png'; 
import WalletIconImg from './../assets/wallet_icon.png'; 
import StackIconImg from './../assets/stack_icon.png';
import Letter from './../assets/letter.png'; 
import E5EmptyIcon from './../assets/e5empty_icon.png';
import AddLetter from './../assets/add_icon.png';
import EthereumTestnet from './../assets/ethereum_testnet.png';

import Tags from './../components/tags';

import CanvasJSReact from './../externals/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

var bigInt = require("big-integer");
const Web3 = require('web3');



/* numberWithCommas */
function number_with_commas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


class home_page extends Component {
    
    state = {
        page: '?',
        work_page_tags_object:this.get_main_page_tag_object('?'), 
        explore_page_tags_object:this.get_main_page_tag_object('e'), 
        wallet_page_tags_object:this.get_main_page_tag_object('w'),
    };


    /* returns the tag object used for the main page */
    get_main_page_tag_object(page){
      if(page == '?'/* jobs_section */){
        return{
          'i':{
              active:'e', 
          },
          'e':[
              ['or','',0], ['e','e.contracts', 'e.proposals','e.subscriptions'], [0]
          ],
          'contracts':[
              ['or','e',1], ['contracts','all','viewed','created','received'], [1],[1]
          ],
          'proposals':[
              ['or','e',1], ['proposals','all','received','created','voted'], [1],[1]
          ],
          'subscriptions':[
              ['or','e',1], ['subscriptions','all','paid','created'], [1],[1]
          ],
          'my':[
              ['or','',0], ['my','carts','bags'], [1],[1]
          ],
        };
      }
      else if(page == 'e'/* content_section */){
        return{
          'i':{
              active:'e', 
          },
          'e':[
              ['or','',0], ['e','e.posts','e.channels','e.E5s'], [0]
          ],
          'posts':[
              ['or','',0], ['posts','all','viewed','created'], [1],[1]
          ],
          'channels':[
              ['or','',0], ['channels','all','viewed','created'], [1],[1]
          ],
          'E5s':[
              ['or','',0], ['E5s','info ℹ️','indexdata 📊','blockexplorer 🗺️', 'tipjar 🍯'], [1],[1]
          ]
        }
      }
      else{/* wallet_section */
        return{
          'i':{
              active:'e', 
          },
          'e':[
              ['or','',0], ['e','ethers ⚗️','ends ☝️','spends 🫰'],[0]
          ],
        }
      }
      
    }

    render(){
        var size = this.props.screensize;
        var top_bar = 50;
        var middle = this.props.height-126;
        var bottom_bar = 70;
        var width = this.props.width;
        var navbar_color = '#444444';// #444444
        var background_color = '#F1F1F1';//#F1F1F1


        if(size == 'm'){
            return ( 
                <div className="row" style={{height: this.props.height, width:'101%','background-color':background_color}}>
                    <div className="col" style={{backgroundImage: `url(${Background})` , backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}>
                        <div style={{height:top_bar, width:width, 'padding':'9px 0px 0px 15px'}}>
                            {this.render_top_tag_bar(size)}
                        </div>
                        
                        <div style={{height:5}}/>
                        <div className="row" style={{height:middle, width:width, 'margin':'0px 0px 0px 3px'}}>
                            <div className="col-6">
                                {this.render_post_list_group(size)}
                            </div>
                            
                            <div className="col-6" style={{'padding':'0px 10px 0px 10px'}}>
                                {this.render_post_detail_object(size)}
                            </div>
                            
                        </div>
                        <div style={{height:5}}/>
                        <div style={{height:bottom_bar, width: '102%', 'background-color':  navbar_color, 'border-radius': '0px 0px 0px 0px', 'padding':'0px 0px 0px 0px'}}>
                            {this.render_navbar_button_group(size)}
                        </div>
                        
                    </div>
                </div>
            );
        }
        else if(size == 's'){
            return ( 
                <div style={{height: this.props.height, width:'100%','background-color':background_color, backgroundImage: `url(${Background})` , backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}>
                    <div style={{height:top_bar, width:width, 'padding':'9px 0px 0px 0px'}}>
                        {this.render_top_tag_bar(size)}
                    </div>
                    
                    <div style={{height:this.props.height-123, width:width, 'padding':'0px 5px 0px 5px'}}  >
                        {this.render_post_list_group(size)}
                    </div>
                    
                    <div style={{height:5}}/>
                    <div style={{height:bottom_bar, width:width, 'background-color': navbar_color,'display':'flex', 'align-items': 'center', 'border-radius': '0px 0px 0px 0px', 'padding':'0px 0px 0px 15px'}}>
                        {this.render_navbar_button_group(size)}
                    </div>
                </div>
            );
        }
        else{
            return(
                <div style={{height: this.props.height, width:'100%','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                    <img src={Letter} style={{height:'auto',width:'35%'}} />
                </div>
            );
        }

    }


    render_navbar_button_group(size){
        //#545454 - highlight color

        if(size == 'm'){
          return ( 
              <div className="row" style={{'padding':'0px 0px 0px 10px', height:'100%', width:'100%'}}>
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
        }
        else if(size == 's'){
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

    open_view_stack_bottomsheet(){

    }










    /* render the top bar tags with the create object button */
    render_top_tag_bar(size){
        var width = this.props.width - 80;
        if(size == 'l') width = this.props.width - 10;
        return(
            <div style={{'display': 'flex','flex-direction': 'row','padding': '0px 0px 0px 5px', height: 40,  width: '99%'}}>
                <div style={{ height: 40,  width: width}}>
                    {this.render_tag_bar_group(this.get_tag_group_option(),'l')}
                </div>
                
                <button style={{'text-decoration': 'none', 'border': 'none','background-color': 'transparent' ,'float': 'right', width: 70,'padding': '0px 0px 12px 0px', opacity:1}}>
                    {this.render_e_plus_button()}
                </button>
            </div>
        );
    }

    /* called when the eplus letter is clicked on the main page */
    when_e_plus_letter_clicked(){
      var button_target = this.get_e_plus_button_mapping();
      if(button_target != ''){
        this.open_new_object_bottomsheet();
      }
    }

    /* renders the e plus button and sets its opacity */
    render_e_plus_button(){
      var button_target = this.get_e_plus_button_mapping();
      var alpha = 1.0;
      if(button_target == ''){
        alpha = 0.2;
      }
      return(
        <img onClick={()=> this.when_e_plus_letter_clicked()} src={AddLetter} style={{height:36, width:'auto', opacity:alpha}} />
      )
    }

    /* gets the tag object id for creating new objects associated with the tag option active in the top bar */
    get_e_plus_button_mapping(){
      var active_page_tag_item = this.get_tag_group_option()['i'].active;
      var data = {'contracts':'6','jobs':'7','contractors':'8','storefronts':'9','E5tokens':'11','subscriptions':'12','posts':'13','channels':'14',};

      if(data[active_page_tag_item] == null) return ''
      return data[active_page_tag_item];
    }

    /* gets the option of tags to use depending on the bottom navbar button clicked */
    get_tag_group_option(){
      if(this.state.page == '?'){
        return this.state.work_page_tags_object
      }
      else if(this.state.page == 'e'){
        return this.state.explore_page_tags_object
      }
      else{
        return this.state.wallet_page_tags_object
      }
    }







    render_tag_bar_group(option, size){
        return(
            <div>
                <Tags page_tags_object={option} tag_size={size} when_tags_updated={this.when_tags_updated.bind(this)}/>
            </div>
        )
    }

    when_tags_updated(tag_group){
        if(this.state.page == '?'){
            return this.setState({work_page_tags_object: tag_group})
        }
        else if(this.state.page == 'e'){
            return this.setState({explore_page_tags_object: tag_group})
        }
        else{
            return this.setState({wallet_page_tags_object: tag_group})
        }
    }








    render_post_list_group(){
        var selected_page = this.state.page;
        if(selected_page == '?'){
            var selected_tag = this.state.work_page_tags_object['i'].active
            if(selected_tag == 'contracts' || selected_tag == 'e'){
                return(
                <div>{this.render_contracts_list_group()}</div>
                )
            }
            else if(selected_tag == 'proposals' ){
                return(
                <div>{this.render_proposal_list_group()}</div>
                )
            }
            else if(selected_tag == 'subscriptions' ){
                return(
                <div>{this.render_subscription_list_group()}</div>
                )
            }
        }
        else if(selected_page == 'e'){
            var selected_tag = this.state.explore_page_tags_object['i'].active
            if(selected_tag == 'E5s' || selected_tag == 'e'){
                return(
                <div>{this.render_E5s_list_group()}</div>
                )
            }
            else if(selected_tag == 'posts' ){
                return(
                <div>{this.render_posts_list_group()}</div>
                )
            }
            else if(selected_tag == 'channels' ){
                return(
                <div>{this.render_channels_list_group()}</div>
                )
            }
        }
        else if(selected_page == 'w'){
            var selected_tag = this.state.wallet_page_tags_object['i'].active
            var selected_item = this.state.wallet_page_tags_object['e'][2][0];
            var selected_option_name = this.state.wallet_page_tags_object['e'][1][selected_item];
            if(selected_option_name == 'ethers ⚗️' || selected_option_name == 'e'){
                return(
                <div>{this.render_ethers_list_group()}</div>
                )
            }
            else if(selected_option_name == 'ends ☝️' ){
                return(
                <div>{this.render_ends_list_group()}</div>
                )
            }
            else if(selected_option_name == 'spends 🫰' ){
                return(
                <div>{this.render_spends_list_group()}</div>
                )
            }
        }

    }

    
    render_contracts_list_group(){
        var middle = this.props.height-123;
        var size = this.props.size;
        if(size == 'l'){
            middle = this.props.height-80;
        }
        var items = ['0','1','2','3'];
        return ( 
            <div style={{overflow: 'auto', maxHeight: middle}}>
                <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                    {items.map((item, index) => (
                        <li style={{'padding': '5px'}}>
                            {this.render_contract_object()}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }

    render_contract_object(){
        return(
                <div style={{height:180, width:'100%', 'background-color': 'rgb(225, 225, 225,.9)', 'border-radius': '15px','padding':'10px 0px 0px 10px', 'max-width':'420px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                    <div style={{'margin':'10px 20px 0px 0px'}}>
                        <img src={Letter} style={{height:70 ,width:'auto'}} />
                        <p style={{'display': 'flex', 'align-items':'center','justify-content':'center', 'padding':'5px 0px 0px 7px', 'color': 'gray'}}></p>
                    </div>
                    
                </div>
            );
    }



    render_proposal_list_group(){
        var middle = this.props.height-123;
        var size = this.props.size;
        if(size == 'l'){
            middle = this.props.height-80;
        }
        var items = ['0','1','2','3'];
        return ( 
            <div style={{overflow: 'auto', maxHeight: middle}}>
                <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                    {items.map((item, index) => (
                        <li style={{'padding': '5px'}}>
                            {this.render_proposal_object()}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }

    render_proposal_object(){
        return(
                <div style={{height:180, width:'100%', 'background-color': 'rgb(225, 225, 225,.9)', 'border-radius': '15px','padding':'10px 0px 0px 10px', 'max-width':'420px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                    <div style={{'margin':'10px 20px 0px 0px'}}>
                        <img src={Letter} style={{height:70 ,width:'auto'}} />
                        <p style={{'display': 'flex', 'align-items':'center','justify-content':'center', 'padding':'5px 0px 0px 7px', 'color': 'gray'}}></p>
                    </div>
                    
                </div>
            );
    }


    render_subscription_list_group(){
        var middle = this.props.height-123;
        var size = this.props.size;
        if(size == 'l'){
            middle = this.props.height-80;
        }
        var items = ['0','1','2','3'];
        return ( 
            <div style={{overflow: 'auto', maxHeight: middle}}>
                <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                    {items.map((item, index) => (
                        <li style={{'padding': '5px'}}>
                            {this.render_subscription_object()}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }

    render_subscription_object(){
        return(
                <div style={{height:180, width:'100%', 'background-color': 'rgb(225, 225, 225,.9)', 'border-radius': '15px','padding':'10px 0px 0px 10px', 'max-width':'420px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                    <div style={{'margin':'10px 20px 0px 0px'}}>
                        <img src={Letter} style={{height:70 ,width:'auto'}} />
                        <p style={{'display': 'flex', 'align-items':'center','justify-content':'center', 'padding':'5px 0px 0px 7px', 'color': 'gray'}}></p>
                    </div>
                    
                </div>
            );
    }



    render_E5s_list_group(){
        var middle = this.props.height-123;
        var size = this.props.size;
        if(size == 'l'){
            middle = this.props.height-80;
        }
        var items = ['0','1','2','3'];
        return ( 
            <div style={{overflow: 'auto', maxHeight: middle}}>
                <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                    {items.map((item, index) => (
                        <li style={{'padding': '5px'}}>
                            {this.render_E5s_object()}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }

    render_E5s_object(){
        return(
                <div style={{height:180, width:'100%', 'background-color': 'rgb(225, 225, 225,.9)', 'border-radius': '15px','padding':'10px 0px 0px 10px', 'max-width':'420px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                    <div style={{'margin':'10px 20px 0px 0px'}}>
                        <img src={Letter} style={{height:70 ,width:'auto'}} />
                        <p style={{'display': 'flex', 'align-items':'center','justify-content':'center', 'padding':'5px 0px 0px 7px', 'color': 'gray'}}></p>
                    </div>
                    
                </div>
            );
    }



    render_posts_list_group(){
        var middle = this.props.height-123;
        var size = this.props.size;
        if(size == 'l'){
            middle = this.props.height-80;
        }
        var items = ['0','1','2','3'];
        return ( 
            <div style={{overflow: 'auto', maxHeight: middle}}>
                <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                    {items.map((item, index) => (
                        <li style={{'padding': '5px'}}>
                            {this.render_posts_object()}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }

    render_posts_object(){
        return(
                <div style={{height:180, width:'100%', 'background-color': 'rgb(225, 225, 225,.9)', 'border-radius': '15px','padding':'10px 0px 0px 10px', 'max-width':'420px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                    <div style={{'margin':'10px 20px 0px 0px'}}>
                        <img src={Letter} style={{height:70 ,width:'auto'}} />
                        <p style={{'display': 'flex', 'align-items':'center','justify-content':'center', 'padding':'5px 0px 0px 7px', 'color': 'gray'}}></p>
                    </div>
                    
                </div>
            );
    }



    render_channels_list_group(){
        var middle = this.props.height-123;
        var size = this.props.size;
        if(size == 'l'){
            middle = this.props.height-80;
        }
        var items = ['0','1','2','3'];
        return ( 
            <div style={{overflow: 'auto', maxHeight: middle}}>
                <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                    {items.map((item, index) => (
                        <li style={{'padding': '5px'}}>
                            {this.render_channels_object()}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }

    render_channels_object(){
        return(
                <div style={{height:180, width:'100%', 'background-color': 'rgb(225, 225, 225,.9)', 'border-radius': '15px','padding':'10px 0px 0px 10px', 'max-width':'420px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                    <div style={{'margin':'10px 20px 0px 0px'}}>
                        <img src={Letter} style={{height:70 ,width:'auto'}} />
                        <p style={{'display': 'flex', 'align-items':'center','justify-content':'center', 'padding':'5px 0px 0px 7px', 'color': 'gray'}}></p>
                    </div>
                    
                </div>
            );
    }



    render_ethers_list_group(){
        var middle = this.props.height-123;
        var size = this.props.size;
        if(size == 'l'){
            middle = this.props.height-80;
        }
        var items = this.get_ethers_data()
        return ( 
            <div style={{overflow: 'auto', maxHeight: middle}}>
                <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                    {items.map((item, index) => (
                        <li style={{'padding': '5px'}}>
                            {this.render_ethers_object(item)}
                        </li>
                    ))}
                    <div style={{'padding': '5px'}}>
                        {this.render_empty_object()}
                    </div>
                    <div style={{'padding': '5px'}}>
                        {this.render_empty_object()}
                    </div>
                </ul>
            </div>
        );
    }

    render_ethers_object(item){
        return ( 
            <div onClick={() => this.when_ether_object_clicked()} style={{height:'auto', width:'100%', 'background-color': 'rgb(225, 225, 225,.8)', 'border-radius': '15px','padding':'5px 5px 0px 0px', 'max-width':'420px', 'box-shadow': '0px 0px 1px 2px #DCDCDC'}}>
                <div style={{'padding': '5px 0px 5px 5px'}}>
                    {this.render_detail_item('1', item['tags'])}
                    <div style={{'padding': '0px 10px 0px 10px'}}>
                        {this.render_detail_item('8', item['label'])}
                    </div>
                    <div style={{height: 20}}/>
                    {this.render_detail_item('2', item['number_label'])}
                </div>         
            </div>
        );
    }

    get_ethers_data(){
        return [
            {
                'name': 'Ethereum Testnet',
                'symbol': 'ETHT',
                'image': EthereumTestnet,
                'label':{'title':'ETHT', 'details':'Ethereum Testnet', 'size':'l', 'image': EthereumTestnet},
                'tags':{'active_tags':['Ethereum', 'Ether', 'EVM', 'Chain'], 'index_option':'unindexed'},
                'number_label':this.get_blockchain_data(),
            }
        ]
    }

    get_blockchain_data(){
        return{
            'style':'s',
            'title':'',
            'subtitle':'',
            'barwidth':this.get_number_width(this.props.app_state.number_of_blocks),
            'number':`${number_with_commas(this.props.app_state.number_of_blocks)} blocks`,
            'barcolor':'#606060',
            'relativepower':'ledger size',
        }
    }

    

    get_number_width(number){
        var last_two_digits = number.toString().slice(0, 1)+'0';
        if(number > 10){
            last_two_digits = number.toString().slice(0, 2);
        }
        return last_two_digits+'%'
    }

    when_ether_object_clicked(){

    }



    render_ends_list_group(){
        var middle = this.props.height-123;
        var size = this.props.size;
        if(size == 'l'){
            middle = this.props.height-80;
        }
        var items = ['0','1','2','3'];
        return ( 
            <div style={{overflow: 'auto', maxHeight: middle}}>
                <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                    {items.map((item, index) => (
                        <li style={{'padding': '5px'}}>
                            {this.render_ends_object()}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }

    render_ends_object(){
        return(
                <div style={{height:180, width:'100%', 'background-color': 'rgb(225, 225, 225,.9)', 'border-radius': '15px','padding':'10px 0px 0px 10px', 'max-width':'420px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                    <div style={{'margin':'10px 20px 0px 0px'}}>
                        <img src={Letter} style={{height:70 ,width:'auto'}} />
                        <p style={{'display': 'flex', 'align-items':'center','justify-content':'center', 'padding':'5px 0px 0px 7px', 'color': 'gray'}}></p>
                    </div>
                    
                </div>
            );
    }



    render_spends_list_group(){
        var middle = this.props.height-123;
        var size = this.props.size;
        if(size == 'l'){
            middle = this.props.height-80;
        }
        var items = ['0','1','2','3'];
        return ( 
            <div style={{overflow: 'auto', maxHeight: middle}}>
                <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                    {items.map((item, index) => (
                        <li style={{'padding': '5px'}}>
                            {this.render_spends_object()}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }

    render_spends_object(){
        return(
                <div style={{height:180, width:'100%', 'background-color': 'rgb(225, 225, 225,.9)', 'border-radius': '15px','padding':'10px 0px 0px 10px', 'max-width':'420px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                    <div style={{'margin':'10px 20px 0px 0px'}}>
                        <img src={Letter} style={{height:70 ,width:'auto'}} />
                        <p style={{'display': 'flex', 'align-items':'center','justify-content':'center', 'padding':'5px 0px 0px 7px', 'color': 'gray'}}></p>
                    </div>
                    
                </div>
            );
    }

    render_empty_object(){
        return(
                <div style={{height:180, width:'100%', 'background-color': 'rgb(225, 225, 225,.9)', 'border-radius': '15px','padding':'10px 0px 0px 10px', 'max-width':'420px','display': 'flex', 'align-items':'center','justify-content':'center'}}>
                    <div style={{'margin':'10px 20px 0px 0px'}}>
                        <img src={Letter} style={{height:70 ,width:'auto'}} />
                        <p style={{'display': 'flex', 'align-items':'center','justify-content':'center', 'padding':'5px 0px 0px 7px', 'color': 'gray'}}></p>
                    </div>
                    
                </div>
            );
    }





    render_post_detail_object(){

    }


    /* renders the specific element in the post or detail object */
    render_detail_item(item_id, object_data){
        var background_color = 'rgb(217, 217, 217,.6)';
        var divider_color = '#BFBFBF';
        var border_radius = '7px';

        if(item_id=='0'){/* line */
            return(
                <div style={{height:'1px', 'background-color':'#C1C1C1', 'margin': '10px 20px 10px 20px'}}/>
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
                    <ul style={{'list-style': 'none', 'padding': '0px 0px 5px 0px', 'overflow':'auto', 'white-space': 'nowrap', 'border-radius': '13px', 'margin':'0px 0px 0px 0px'}}>
                      {active_tags.map((item, index) => (
                          <li style={{'display': 'inline-block', 'padding': '5px', '-ms-overflow-style': 'none', 'scrollbar-width': 'none', height:30}}>
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
            var font_size = ['14px', '11px', 17];
            if(size == 'l'){
                font_size = ['17px', '13px', 19];
            }
            if(item_id == '8'){
                var img = E5EmptyIcon;
                if(object_data != null){
                    img = object_data['image'];
                }
               return (
                <div style={{'display': 'flex','flex-direction': 'row','padding': '7px 15px 10px 15px','margin':'0px 0px 0px 0px', 'background-color': background_color,'border-radius': border_radius}}>
                    <div className="row" style={{height:'100%', width:'70%'}}>
                        <div className="col-3">
                            <img src={img} style={{height:40 ,width:'auto'}} />
                        </div>
                        <div className="col">
                            <p style={{'font-size': font_size[0],'color': '#444444','margin': '0px 0px 0px 0px','font-family': 'Sans-serif','text-decoration': 'none', height:'auto'}}>{title}</p> 
                            <p style={{'font-size': font_size[1],'color': '#747474','margin': '0px 0px 0px 0px','font-family': 'Sans-serif','text-decoration': 'none'}}>{details}</p>
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
            var default_chart_color = '#FCFCFC';//#FCFCFC(default white-ish) #444444(default dark-ish)
            var background_color= '#D5D5D5';
            var dataPoints = this.generateDataPoints(23);
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
                <div style={{'margin':'10px 10px 0px 15px','padding': '10px 10px 0px 10px', 'background-color': background_color, height:'100%', 'border-radius': border_radius}}>
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
            var header = 'E35'
            var subtitle = 'ETC'
            return(
                <div style={{height:230, width:'90%','display': 'flex', 'align-items':'center','justify-content':'center','padding':'0px 0px 0px 0px'}}>
                    <img src={E5EmptyIcon} style={{height:'100%' ,width:'auto'}} />

                    <div style={{'margin':'0px 0px 0px 0px'}}> 
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

    when_action_button_clicked(action_id){

    }

    when_tag_item_clicked(tag, pos, action_id){

    }


    

}




export default home_page;