import React, { Component } from 'react';
import syncrhonizing_image from './../assets/synchronizing_icon.png';
import ViewGroups from './../components/view_groups'
import p2p_trust from './../assets/p2p_trust_image.png';
import unanimous_consensus from './../assets/unanimous_consensus_image.png';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class synchronizing_page extends Component {
    
    state = {
        selected: 0,
    };

    render(){
        return(
            <div>
                {this.render_synchronizing_page()}
            </div>
        )
    }

    render_synchronizing_page(){
        return(
            <div style={{}}>
                <p style={{margin:'15% 0% 3% 0%', 'text-align': 'center', color: this.props.theme['primary_text_color']}}>{this.get_sync_text()}</p>
                <div style={{width:'60%', 'display': 'block', 'margin-left': 'auto', 'margin-right': 'auto'}}>
                    {this.render_synch_bar()}
                </div>
                <img style={{width:'60%', 'display': 'block', 'margin-left': 'auto', 'margin-right': 'auto'}} src={syncrhonizing_image} alt="E5" onClick={()=> this.props.close_syncronizing_page()}/>
                
                <div style={{width:'60%', 'margin-top':'20px', 'display': 'block', 'margin-left': 'auto', 'margin-right': 'auto'}}>
                    {this.render_bottom_text()}
                </div>

                <div style={{height:50}}/>
                {this.render_detail_item('10', {'text':this.props.app_state.loc['1598b'], 'textsize':'9px', 'font':'Sans-serif'})}
            </div>
        );
    }

    get_sync_text(){
        if(this.props.sync_progress >= 99){
            return this.props.app_state.loc['1594']/* 'Synchronized.' */
        }
        else if(this.props.sync_progress == 0){
            if(this.props.app_state.is_allowed == true){
                return this.props.app_state.loc['1598a']/* 'Initializing...' */
            }
            return this.props.app_state.loc['1595']/* 'Unsynchronized.' */
        }
        else{
            return this.props.app_state.loc['1596']/* 'Synchronizing...' */
        }
    }

    render_synch_bar(){
        var bar_shadow = this.props.theme['bar_shadow'];
        var bar_color = this.props.theme['bar_color']
        var bar_background = this.props.theme['bar_background_color']
        var height = 7;
        var progress = this.props.sync_progress+'%'
        if(this.props.sync_progress >100){
            progress = '100%'
        }
        return(
            <div style={{ height: height, width: "100%", 'background-color': bar_background, 'border-radius': '5px', 'box-shadow': '0px 0px 2px 1px '+bar_shadow, 'margin': '0px 0px 4px 0px' }}>
                <div className="progress" style={{ height: height, width: progress, 'background-color': bar_background, 'border-radius': '5px' }}>
                    <div className="progress-bar" role="progressbar" style={{ width: "100%", 'background-image': 'none','background-color': bar_color, 'border-radius': '3px' }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
            </div>
        )
    }

    render_bottom_text(){
        var text_color = this.props.theme['primary_text_color']
        return(
            <div>
                <Row>
                    <Col><p style={{margin: '60% 0% 0% 0%', width:'70%', color:text_color}}>{this.props.app_state.loc['1597']/* P2P Trust */}</p></Col>
                    <Col>
                        <img style={{width:'130%', margin:'5% 0% 0% 17%'}} src={p2p_trust}/>
                    </Col>
                </Row>
                <Row style={{margin: '25% 0% 0% 0%'}}>
                    <Col><p style={{margin: '35% 0% 0% -20%', color:text_color}}>{this.props.app_state.loc['1598']/* Unanimous Consensus */}</p></Col>
                    <Col>
                        <img style={{width:'130%', margin:'5% 0% 0% 17%'}} src={unanimous_consensus} alt="Paris"/>
                    </Col>
                </Row>
            </div>
        )
    }



    /* renders the specific element in the post or detail object */
    render_detail_item(item_id, object_data){
        var size = this.props.screensize
        var width = size == 'm' ? this.props.app_state.width/2 : this.props.app_state.width
        return(
            <div>
                <ViewGroups item_id={item_id} object_data={object_data}  theme={this.props.theme} width={width}/>
            </div>
        )

    }


}




export default synchronizing_page;