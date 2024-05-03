import React, { Component } from 'react';

class tags extends Component {
    
    state = {
        selected: 0,
        scroll_pos:{}
    };

    constructor(props) {
        super(props)
        this.myRef = React.createRef()   // Create a ref object 
    }

    /* returns an emoji used in displaying the tag item */
    tag_item_emoji_modifier(item){
      var items = {'contracts':'📑', 'jobs':'💼', 'contractors':'👷🏻‍♀️', 'storefront':'🏪','subscriptions':'🎫', 'posts':'📰','channels':'📡','E5s':'🗿','E5tokens':'🪙','externals':'🌕', 'proposals':'🧎', 'mail':'📬', 'bags':'🛍', 'stack-data':'🧱', 'settings-data':'🛠️', 'account-data':'🔐', 'events':'🎊', 'moderator-events':'🧑‍⚖️'}

      if(this.props.app_state != null){
          items[this.props.app_state.loc['1197']/* contracts */] = '📑'
          items[this.props.app_state.loc['1196']/* jobs */] = '💼'
          items[this.props.app_state.loc['1198']/* contractors */] = '👷🏻‍♀️'
          items[this.props.app_state.loc['1215']/* storefront */] = '🏪'
          items[this.props.app_state.loc['1200']/* subscriptions */] = '🎫'
          items[this.props.app_state.loc['1213']/* posts */] = '📰'
          items[this.props.app_state.loc['1214']/* channels */] = '📡'
          items[this.props.app_state.loc['1212']/* E5s */] = '🗿'
          items[this.props.app_state.loc['1258']/* E5tokens */] = '🪙'
          items[this.props.app_state.loc['1259']/* externals */] = '🌕'
          items[this.props.app_state.loc['1199']/* proposals */] = '🧎'
          items[this.props.app_state.loc['1201']/* mail */] = '📬'
          items[this.props.app_state.loc['1216']/* bags */] = '🛍'
          items[this.props.app_state.loc['1260']/* stack-data */] = '🧱'
          items[this.props.app_state.loc['1261']/* settings-data */] = '🛠️'
          items[this.props.app_state.loc['1262']/* account-data */] = '🔐'
          items[this.props.app_state.loc['1263']/* events */] = '🎊'
          items[this.props.app_state.loc['1264']/* moderator-events */] = '🧑‍⚖️'
      }
      
      if(items[item] != null) return items[item];
      else return null;
    }

    componentDidUpdate(){
        // this.myRef.current?.scrollTo({top: 0 });
    }

    handleScroll = (event, id) => {
        var pos = event.currentTarget.scrollLeft
        var page_data = this.props.page_tags_object;
        var active = page_data['i'].active;
        var clone = structuredClone(this.state.scroll_pos)
        clone[active] = pos;
        this.setState({scroll_pos: clone})
    };

    render(){
        var page_data = this.props.page_tags_object;
        var tag_size = this.props.tag_size;
        if(page_data == null){
            return (<div></div>);
        }
        var active = page_data['i'].active;
        var active_tag_group_data = page_data[active];
        var active_tags = active_tag_group_data[1/* tag_names */];
        var selected = active_tag_group_data[2/* option_data */];

        var prev_item_tag = page_data[active][0/* config */][1/* previous_item */];/* the previous tag option data group name */
        if(prev_item_tag != ''){
            var prev_item_pos = page_data[active][0/* config */][2/* previous_item_pos */];/* the previous tag option data group name's position */
            var prev_item = page_data[prev_item_tag][1/* tag_options */][prev_item_pos];/* the previous item tag name */

            if(prev_item.startsWith('v.')){
                if(page_data[prev_item_tag+active] == null){
                    selected = [0];
                }else{
                    selected = page_data[prev_item_tag+active];
                }
                
            }
        }//
        return(
            <div style={{'margin':'0px 0px 0px 5px','padding': '0px 0px 7px 0px', width: '97%', 'background-color': 'transparent','border-radius': '8px', height:'40px'}}>
                    <ul ref={this.myRef} onScroll={event => this.handleScroll(event)} style={{'list-style': 'none', 'padding': '0px 0px 5px 0px', 'overflow': 'auto', 'white-space': 'nowrap', 'border-radius': '13px', 'margin':'0px 0px 5px 0px','overflow-y': 'hidden', 'scrollbar-width': 'none', '-webkit-overflow-scrolling': 'touch'}}>
                      {active_tags.map((item, index) => (
                          <li style={{'display': 'inline-block', 'padding': '5px 5px 5px 1px', '-ms-overflow-style': 'none', height:30}}>
                              {this.render_tag_button(index,selected,item,tag_size)}
                          </li>
                      ))}
                  </ul>
            </div>
        );
    }


    /* renders the tag button item */
    render_tag_button(index, selected, text, tag_size){
        var background = this.props.theme['tag_background_color'];//#444444,  #5B5B5B
        var txt = text+'';
        if(txt.startsWith('a.') || txt.startsWith('e.')|| txt.startsWith('v.')){
            background = this.props.theme['indexed_tag_background'];
        }

        if(index == 0){
            background = 'black';
        }
        if(selected != null){
            if(selected == index){
                background = 'black';
            }
        }

        var font = this.props.font

        if(tag_size == 's'){
            return ( 
                <div onClick={() => this.when_tag_button_clicked(index)} style={{'background-color': background, 'border-radius': '19px', 'box-shadow': '0px 0px 1px 1px '+this.props.theme['tag_shadow']}}>
                    <p style={{'color': this.props.theme['tag_text_color'], 'font-size': '12px', 'padding':' 4px 17px 4px 17px', 'text-align': 'justify', 'font-family': font}} className="text-center">{this.final_text(txt,index)}</p>
                </div>
            );
        }else{
            return ( 
                <div onClick={() => this.when_tag_button_clicked(index)} style={{'background-color': background, 'border-radius': '19px', 'box-shadow': '0px 0px 1px 1px '+this.props.theme['tag_shadow']}}>
                    <p style={{'color': this.props.theme['tag_text_color'], 'font-size': '14px', 'padding':' 3px 17px 4px 17px', 'text-align': 'justify','text-shadow': '-1px -1px 3px #A1A1A1', 'font-family': font}} className="text-center">{this.final_text(txt,index)}</p>
                </div>
            );
        }
    }

    /* removes e. and a. modifier and emoji */
    tag_without_emoji_and_modifier(text){
      var final = text;
      if(text.startsWith('e.') || text.startsWith('v.') || text.startsWith('a.')){
          final = text.substring(2,text.length);
      }
      return final;
    }

    /* gets the final version of the text in a tag item with its icon emoji */
    final_text(text, index){
      var final = text;
      if(text.startsWith('v.') || text.startsWith('a.')){
          var char = 'e.'
          var subfinal = 'e.'+text.substring(2,text.length);
          
          if(this.tag_item_emoji_modifier(subfinal) != null){
              char = this.tag_item_emoji_modifier(subfinal);
          }
          final = char+text.substring(2,text.length);
      }
      else if(index == 0){
          if(final != 'e'){
              var char = 'e.'
              if(this.tag_item_emoji_modifier(final) != null){
                  char = this.tag_item_emoji_modifier(final)+' .';
              }
              final = char+final;
          }
      }

      var subfinal = ''+final;
      if(final.startsWith('v.') || final.startsWith('e.') || final.startsWith('a.')){
          subfinal = final.substring(2,final.length);
          var char = 'e.'
          if(this.tag_item_emoji_modifier(subfinal) != null){
              char = this.tag_item_emoji_modifier(subfinal)+' .';
          }
          final = char+subfinal;
      }

      return ''+final;
    }


    /* called when a tag button is tapped */
    when_tag_button_clicked(pos){
      var page_data = this.props.page_tags_object;
      var active = page_data['i'].active;
      var clone = {};
      var clicked_tag_name = page_data[active][1/* tag_options */][pos];
      var is_moving_down_option = false
      for (var key in page_data) {
          if (page_data.hasOwnProperty(key)) {
              clone[key] = page_data[key];
          }
      }

      if(pos == 0){
          //going up
          if(page_data[active][0/* config */][1/* previous_item */] != ''){
              //get the previous option
              var prev = page_data[active][0/* config */][1/* previous_item */];
              //set the previous option to empty
              clone[active][0/* config */][1/* previous_item */] = '';
              clone['i'].active = prev;
          }
      }
      else{
          //going down or option selected
          var selected_text = page_data[active][1/* tag_options */][pos];/* the tag that was clicked on */
          var selected_tag_option = this.tag_without_emoji_and_modifier(selected_text);/* the tag that was clicked on without e. or v. modifier */
          if(selected_text.startsWith('e.') || selected_text.startsWith('v.')){
              //entering sub-options
              //set the previous item and its position in the selected option's config array
              clone[selected_tag_option][0/* config */][1/* previous_item */] = active;/* set the current active item as the previous item selected in the selected tag option data group */
              clone[selected_tag_option][0/* config */][2/* previous_item_pos */] = pos;/* set the selected item's position in its respective tag option data group */
              clone['i'].active = selected_tag_option;/* set the selected item */
              is_moving_down_option = true
          }
          else if(selected_text.startsWith('a.')){
              //action detected
          }
          else{
              //setting an option in list
              //set the option in the array
              var options_type = clone[active][0/* config */][0/* type */];/* the option selection type used in the tag option data group  */
              var prev_item_tag = clone[active][0/* config */][1/* previous_item */];/* the previous tag option data group name */
              var prev_item_pos = clone[active][0/* config */][2/* previous_item_pos */];/* the previous tag option data group name's position */
              var prev_item = '';

              if(prev_item_tag != ''){
                  prev_item = clone[prev_item_tag][1/* tag_options */][prev_item_pos];/* the previous item tag name */
              }

              if(options_type == 'or'){
                  //set the option picked
                  if(prev_item.startsWith('v.')){
                      clone[prev_item_tag][3/* chain_options */][0] = pos;/* record the selected tag position in the chain options array */
                      clone[prev_item_tag+active] = pos;
                  }
                  else{
                      if(clone[active][2/* selected_options */][0] != pos){
                          clone[active][2/* selected_options */][0] = pos;/* record the selected tag position in the selected options array */
                      }else{
                          clone[active][2/* selected_options */][0] = 0;
                      }
                  } 
              }
              if(options_type == 'xor'){
                  //set the option picked
                  if(prev_item.startsWith('v.')){
                      clone[prev_item_tag][3/* chain_options */][0] = pos;/* record the selected tag position in the chain options array */
                      clone[prev_item_tag+active] = pos;
                  }
                  else{
                      if(clone[active][2/* selected_options */][0] != pos){
                          clone[active][2/* selected_options */][0] = pos;/* record the selected tag position in the selected options array */
                      }
                  } 
              }
              else if(options_type == 'and'){
                  var array_pos = 2/* selected_options */;
                  var modify_item = active;
                  
                  if(prev_item.startsWith('v.')){
                      if(clone[prev_item_tag+active] == null){
                          clone[prev_item_tag+active] = [pos];
                      }else{
                          if(clone[prev_item_tag+active].includes(pos)){
                              //option is being unselected
                              var index_of_pos = clone[prev_item_tag+active].indexOf(pos);
                              clone[prev_item_tag+active].splice(index_of_pos,1);
                          }else{
                              //option is bein selected
                              clone[prev_item_tag+active].push(pos);
                          } 
                      }
                  }else{
                      if(clone[modify_item][array_pos].includes(pos)){
                          //option is being unselected
                          var index_of_pos = clone[modify_item][array_pos].indexOf(pos);
                          clone[modify_item][array_pos].splice(index_of_pos,1);
                      }else{
                          //option is bein selected
                          clone[modify_item][array_pos].push(pos);
                      }
                  }

                  
              }
          } 
      }
      
    this.props.when_tags_updated(clone);

    var me = this;
    setTimeout(function() {
        var active = clone['i'].active;
        var position = me.state.scroll_pos[active];
        if(is_moving_down_option){ 
            position = 0;
        }
        if(position != null){
            me.myRef.current?.scrollTo(position, 0);
        }
    }, (1 * 10));
    }


}




export default tags;