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
                {this.render_sync_page()}
            </div>
        )
    }


    render_sync_page(){
        var h = this.props.app_state.height-100
        var size = this.props.app_state.size
        var image_width = '250px'
        if(size == 's') image_width = '200px'
        return(
            <div style={{width:'100%', height:h,'display': 'flex', 'align-items':'center','justify-content':'center'}}>
                <div>
                    <p style={{'text-align': 'center', color: this.props.theme['primary_text_color'], 'font-family': this.props.app_state.font}}>{this.get_sync_text()}</p>
                    <div style={{width:'200px', 'display': 'block', 'margin-left': 'auto', 'margin-right': 'auto'}}>
                        {this.render_synch_bar()}
                    </div>
                    <img style={{width:image_width, 'display': 'block', 'margin-left': 'auto', 'margin-right': 'auto'}} src={'https://nftstorage.link/ipfs/bafkreiaszixz3iclvzxocneibrmppoazemylhb5ynki5sownn7n2bub4m4'} alt="E5" onClick={()=> this.props.close_syncronizing_page()}/>
                </div>
            </div>
        )
    }

    render_synchronizing_page(){
        return(
            <div style={{}}>
                <p style={{margin:'15% 0% 2% 0%', 'text-align': 'center', color: this.props.theme['primary_text_color'], 'font-family': this.props.app_state.font, 'font-size':'11px'}}>{this.get_sync_text()}</p>
                <div style={{width:'40%', 'display': 'block', 'margin-left': 'auto', 'margin-right': 'auto'}}>
                    {this.render_synch_bar()}
                </div>
                <img style={{width:'46%', 'display': 'block', 'margin-left': 'auto', 'margin-right': 'auto'}} src={'https://nftstorage.link/ipfs/bafkreiaszixz3iclvzxocneibrmppoazemylhb5ynki5sownn7n2bub4m4'} alt="E5" onClick={()=> this.props.close_syncronizing_page()}/>
                
                {/* <div style={{width:'60%', 'margin-top':'20px', 'display': 'block', 'margin-left': 'auto', 'margin-right': 'auto'}}>
                    {this.render_bottom_text()}
                </div> */}

                {this.render_bottom_text2()}

                <div style={{'margin-top':'4%'}}/>
                {this.render_detail_item('10', {'text':this.props.app_state.loc['1598b'], 'textsize':'10px', 'font':this.props.app_state.font})}
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
        var height = 5;
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

    render_bottom_text2(){
        return(
            <div style={{'margin-top':'15%'}}>
                {this.render_detail_item('8', {'title':this.props.app_state.loc['1597']/* Peer to Peer Trust. */,'details':this.props.app_state.loc['1598c']/* For securing all your transactions. */, 'size':'l', 'image':'https://nftstorage.link/ipfs/bafkreihmpljj34hqnmf5dcwj6k42dt63olobl2krglhcdhnq3ucoxz3mlu', 'border_radius':'0%'})}
                
                <div style={{height:5}}/>
                {this.render_detail_item('8', {'title':this.props.app_state.loc['1598']/* Unanimous Consensus. */,'details':this.props.app_state.loc['1598d']/* For securing all your Money. */, 'size':'l', 'image':'https://nftstorage.link/ipfs/bafkreifwdbjrdhnis6a3xgoh2qgyy4dveg3glgih5rhe32253dm3l3ejoa', 'border_radius':'0%'})}
            </div>
        )
    }

    render_bottom_text(){
        var text_color = this.props.theme['primary_text_color']
        return(
            <div style={{'margin':'0% 5% 0% 0%'}}>
                <Row>
                    <Col><p style={{margin: '50% 0% 0% 0%', width:'70%', color:text_color}}>{this.props.app_state.loc['1597']/* P2P Trust */}</p></Col>
                    <Col>
                        <img style={{width:'130%', margin:'5% 0% 0% 12%'}} src={p2p_trust}/>
                    </Col>
                </Row>
                <Row style={{margin: '25% 0% 0% 0%'}}>
                    <Col><p style={{margin: '40% 0% 0% -20%', color:text_color}}>{this.props.app_state.loc['1598']/* Unanimous Consensus */}</p></Col>
                    <Col>
                        <img style={{width:'130%', margin:'5% 0% 0% 12%'}} src={unanimous_consensus} alt="Paris"/>
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
                <ViewGroups graph_type={this.props.app_state.graph_type} font={this.props.app_state.font} item_id={item_id} object_data={object_data}  theme={this.props.theme} width={width}/>
            </div>
        )

    }


}




export default synchronizing_page;