import React, { Component } from 'react';
import syncrhonizing_image from './../assets/synchronizing_icon.png';
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
        var text_color = this.props.theme['primary_text_color']
        return(
            <div style={{}}>
                <p style={{margin:'15% 0% 3% 40%', color: text_color}}>{this.get_sync_text()}</p>
                <div style={{width:'60%', margin:'0% 0% 0% 20%'}}>
                    {this.render_synch_bar()}
                </div>
                <img style={{width:'40%', margin:'5% 0% 0% 28%'}} src={syncrhonizing_image} alt="Paris"/>
                <div style={{width:'60%', margin:'20% 0% 0% 15%'}}>
                    {this.render_bottom_text()}
                </div>
            </div>
        );
    }

    get_sync_text(){
        if(this.props.sync_progress >= 100){
            return 'synchronized.'
        }else{
            return 'Synchronizing...'
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
                    <Col><p style={{margin: '25% 0% 0% 0%', width:'70%', color:text_color}}>Peer to Peer Trust</p></Col>
                    <Col>
                        <img style={{width:'130%', margin:'5% 0% 0% 17%'}} src={p2p_trust} alt="Paris"/>
                    </Col>
                </Row>
                <Row style={{margin: '25% 0% 0% 0%'}}>
                    <Col><p style={{margin: '25% 0% 0% 0%', color:text_color}}>Unanimous Consensus</p></Col>
                    <Col>
                        <img style={{width:'130%', margin:'5% 0% 0% 17%'}} src={unanimous_consensus} alt="Paris"/>
                    </Col>
                </Row>
            </div>
        )
    }


}




export default synchronizing_page;