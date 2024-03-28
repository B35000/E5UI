import React, { Component } from 'react';
import ViewGroups from './../components/view_groups'
import Tags from './../components/tags';

// import SettingsDataImage from './../assets/settings_data_image.png';
// import WalletDataImage from './../assets/wallet_data_image.png';
// import SendEtherDataImage from './../assets/send_ether_data_image.png';
// import OpenStackDataImage from './../assets/open_stack_data_image.png';

class WikiPage extends Component {
    
    state = {
        selected: 0,
        get_wiki_page_tags_object: this.get_wiki_page_tags_object(),
    };

    get_wiki_page_tags_object(){
        return{
            'i':{
                active:'e', 
            },
            'e':[
                ['or','',0], ['e','contracts', 'exchanges', 'subscriptions'], [0]
            ],
        };
    }

    set(option){
        this.setState({option: option})
    }

    render(){
        return(
            <div style={{'margin':'10px 10px 0px 10px'}}>
                {/* <Tags font={this.props.app_state.font} page_tags_object={this.state.get_wiki_page_tags_object} tag_size={'l'} when_tags_updated={this.when_wiki_tags_updated.bind(this)} theme={this.props.theme}/>
                
                <div style={{'margin':'20px 0px 0px 0px'}}>
                    {this.render_everything()}   
                </div> */}

                {this.render_option()}
                
            </div>
        )
    }


    render_option(){
        if(this.state.option == 'one'){
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['1980']/* 'One more step' */, 'details':this.props.app_state.loc['1981']/* 'You need to set your wallet and fill it with some ether' */, 'size':'l'})}
                    {this.render_detail_item('0')}

                    {this.render_detail_item('4', {'text':this.props.app_state.loc['1982']/* The wallet section is in the settings-data...' */, 'textsize':'12px', 'font':this.props.app_state.font})}
                    <div style={{height: 20}}/>
                    <img style={{width:'90%', 'display': 'block', 'margin-left': 'auto', 'margin-right': 'auto'}} src={'https://nftstorage.link/ipfs/bafkreiea2ghodwkrscl5stf73tnzrvlopmbgy3jtngjdcwcncv5tbkcauy'} alt="E5"/>
                    <div style={{height: 30}}/>

                    {this.render_detail_item('4', {'text':this.props.app_state.loc['1983']/* 'Under the Wallet tag...' */, 'textsize':'12px', 'font':this.props.app_state.font})}
                    <div style={{height: 20}}/>
                    <img style={{width:'90%', 'display': 'block', 'margin-left': 'auto', 'margin-right': 'auto'}} src={'https://nftstorage.link/ipfs/bafkreia6f7vzmxsq2olbfqmlgromkow5kenoa53nmutzwb5upisgz7ls5u'} alt="E5"/>
                    <div style={{height: 30}}/>


                    {this.render_detail_item('4', {'text':this.props.app_state.loc['1984']/* 'Then afterwards fill it with the E5s ether of your choice' */, 'textsize':'12px', 'font':this.props.app_state.font})}
                    <div style={{height: 20}}/>
                    <img style={{width:'90%', 'display': 'block', 'margin-left': 'auto', 'margin-right': 'auto'}} src={'https://nftstorage.link/ipfs/bafkreic2g67litsuomu6n7nqy7ydbbpzdtplhf6lt7d2cfknfpq7vwkhpi'} alt="E5"/>
                    <div style={{height: 20}}/>
                </div>
            )
        }
        else if(this.state.option == 'action'){
            return(
                <div>
                    {this.render_detail_item('3', {'title':this.props.app_state.loc['1985']/* 'Action Required' */, 'details':this.props.app_state.loc['1986']/* 'You need to set your wallet first' */, 'size':'l'})}
                    {this.render_detail_item('0')}

                    {this.render_detail_item('4', {'text':this.props.app_state.loc['1987']/* 'The wallet section is in the stack page...' */, 'textsize':'12px', 'font':this.props.app_state.font})}
                    <div style={{height: 20}}/>
                    <img style={{width:'90%', 'display': 'block', 'margin-left': 'auto', 'margin-right': 'auto'}} src={'https://nftstorage.link/ipfs/bafkreicb7gvqlpahbd6yhpok55dntagzzjixln7t2jpzy2mxrd4jqf26ae'} alt="E5"/>
                    <div style={{height: 30}}/>

                    {this.render_detail_item('4', {'text':this.props.app_state.loc['1988']/* 'In the settings-data section...' */, 'textsize':'12px', 'font':this.props.app_state.font})}
                    <div style={{height: 20}}/>
                    <img style={{width:'90%', 'display': 'block', 'margin-left': 'auto', 'margin-right': 'auto'}} src={'https://nftstorage.link/ipfs/bafkreiea2ghodwkrscl5stf73tnzrvlopmbgy3jtngjdcwcncv5tbkcauy'} alt="E5"/>
                    <div style={{height: 30}}/>

                    {this.render_detail_item('4', {'text':this.props.app_state.loc['1989']/* 'Under the Wallet tag...' */, 'textsize':'12px', 'font':this.props.app_state.font})}
                    <div style={{height: 20}}/>
                    <img style={{width:'90%', 'display': 'block', 'margin-left': 'auto', 'margin-right': 'auto'}} src={'https://nftstorage.link/ipfs/bafkreia6f7vzmxsq2olbfqmlgromkow5kenoa53nmutzwb5upisgz7ls5u'} alt="E5"/>
                    <div style={{height: 30}}/>

                </div>
            )
        }
    }

    when_wiki_tags_updated(tag_group){
        this.setState({get_wiki_page_tags_object: tag_group})

    }

    render_everything(){
        var selected_item = this.get_selected_item(this.state.get_wiki_page_tags_object, this.state.get_wiki_page_tags_object['i'].active)

        if(selected_item == 'contracts' || selected_item == 'e'){
            return(
                <div>
                    {this.render_contracts_wiki()}
                </div>
            )    
        }
        else if(selected_item == 'exchanges'){
            return(
                <div>
                    {this.render_exchanges_wiki()}
                </div>
            ) 
        }
        else if(selected_item == 'subscriptions'){
            return(
                <div>
                    {this.render_subscriptions_wiki()}
                </div>
            ) 
        }
    }

    get_selected_item(object, option){
        var selected_item = object[option][2][0]
        var picked_item = object[option][1][selected_item];
        return picked_item
    }


    render_contracts_wiki(){
        var size = this.props.size

        if(size == 's'){
            return(
                <div>
                    {this.contract_wiki_part()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row" style={{'padding': '0px 0px 0px 0px'}}>
                    <div className="col-7" style={{'padding': '0px 0px 0px 0px'}}>
                        {this.contract_wiki_part()}
                    </div>
                    <div className="col-5">
                        
                    </div>
                </div>
                
            )
        }
    }

    contract_wiki_part(){
        var items = this.get_contract_wiki_data()
        const sortedData = this.sortByAttributeAscending(items, 'title');
        return(
            <div style={{overflow: 'auto', maxHeight: this.props.height-130}}>
                <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                    {sortedData.map((item, index) => (
                        <li style={{'padding': '5px'}}>
                            {this.render_detail_item('3', item)}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    sortByAttributeAscending(array, attribute) {
        return array.sort((a, b) => {
            if (a[attribute] < b[attribute]) {
            return -1;
            }
            if (a[attribute] > b[attribute]) {
            return 1;
            }
            return 0;
        });
    }

    sortByAttributeDescending(array, attribute) {
        return array.sort((a, b) => {
            if (a[attribute] < b[attribute]) {
            return 1;
            }
            if (a[attribute] > b[attribute]) {
            return -1;
            }
            return 0;
        });
    }

    get_contract_wiki_data(){
        return[
            {'title':'Vote Bounty Split Proportion', 'details':'the mandatory percentage or proportion enforced on each new proposal targeting a contract. Then the percentage is used to calculate what each voter is set to receive based on the existing proposals balance.', 'size':'l'},

            {'title':'Maximum Extend Enter Contract Limit', 'details':'the maximum amount of time a sender can extend their stay in a given contract.', 'size':'l'},

            {'title':'Minimum End Contract Amount', 'details':'the minimum amount of end that can be used as an entry amount in all created contracts.', 'size':'l'},

            {'title':'Minimum End Vote Bounty Amount', 'details':'the minimum amount of time difference that can be used while setting the expiry time for a new proposal.', 'size':'l'},

            {'title':'Proposal Expiry Duration Limit', 'details':'', 'size':'l'},

            {'title':'Maximum Enter Contract Duration', 'details':'maximum amount of time a sender can enter a specific contract for.', 'size':'l'},

            {'title':'Consensus Majority Limit', 'details':'the default majority limit used in creating new proposals which target majority consensus instead of unanimous consensus', 'size':'l'},

            {'title':'Auto Wait for all Voters', 'details':'If yes, all new proposals sent to a given contract are automatically voted wait for each participant in the contract.', 'size':'l'},

            {'title':'Minimum Spend Contract Amount', 'details':'the minimum amount of spend that can be set as an entry amount for entering all contracts.', 'size':'l'},

            {'title':'Minimum Spend Bounty Amount', 'details':'the minimum amount of spend that can be used as bounty for new proposals targeting a given contract.', 'size':'l'},

            {'title':'Transaction Gas Limit', 'details':'the maximum amount of gas a sender can consume in a transaction sent to E5.', 'size':'l'},

            {'title':'Contract Block Invocation Limit', 'details':'The minimum number of blocks a sender has to wait before making another transaction in E5.', 'size':'l'},

            {'title':'Contract Time Invocation Limit', 'details':'The minimum amount of time a sender has to wait before making another transaction in E5.', 'size':'l'},

            {'title':'Minimum Entered Contracts', 'details':'minimum amount of entered contracts before sender can participate in consensus proposals sent to main contract.', 'size':'l'},

            {'title':'Contract Exipry Time', 'details':'the time after which no new senders can enter and no new proposals can be sent to a given contract.', 'size':'l'},

            {'title':'Tag Indexing Limit', 'details':'the maximum amount of objects of a given type that can be indexed in one transaction.', 'size':'l'},

            {'title':'Minimum Transaction Count', 'details':'the minimum amount of transactions that a sender has to have made before participating in consensus proposals sent to the main contract.', 'size':'l'},

            {'title':'Gas Anchor Price', 'details':'A gas price set thats used in calculating the active Minimum End Contract Amount while creating new contracts.', 'size':'l'},

            {'title':'Transaction Gas Reduction Proportion', 'details':'the proportion or percentage used in calculating the maximum amount of gas fees that can be paid for a given transaction.', 'size':'l'},

            {'title':'Transaction Gas Anchor Price', 'details':'gas price thats used in calculating the maximum amount of gas fees that can be paid in a given transaction, given the amount of gas being consumed.', 'size':'l'},

            {'title':'Transaction Gas Lower Limit', 'details':'the mimimum amount of gas beyond which any amount of gas fee can be paid for its transaction.', 'size':'l'},

            {'title':'Proposal Modify Expiry Duration Limit', 'details':'the period of time before the expiry of a proposal during which the proposal cannot be modified', 'size':'l'},

            {'title':'Can Modify Contract As Moderator', 'details':'if set to 1, sender can directly modify a contract if they are a moderator of the contract.', 'size':'l'},

            {'title':'Can Extend Enter Contract At Any Time', 'details':'if set to 1, sender can extend their stay in a contract at anytime and not necessarily when their time in the contract is about to end', 'size':'l'},

            {'title':'Absolute Proposal Expiry Duration Limit', 'details':'the minimum amount of time that can be defined by a contract as the proposal expiry duration limit for all proposals sent to it', 'size':'l'},

            {'title':'Allow External Buy Proposals', 'details':'if set to 1, the contract can receive buy proposals from senders that are not part of the contract.', 'size':'l'},

            {'title':'Invite Only E5', 'details':'if set to 1, all runs are restricted to addresses that already have an account in the E5. In order for a new address to start using the E5, an account must be created for it by another existing account.', 'size':'l'},

            {'title':'Default Voter Weight Exchange', 'details':'the default exchange used for calculating vote weights for all proposals sent to the contract', 'size':'l'},

            {'title':'Default Voter Weight Exchange Depth', 'details':'the default exchange depth used for calculating vote weights for all proposals sent to the contract', 'size':'l'},

            {'title':'Mandatory Voter Weight', 'details':'if set to yes, senders have to specify the voter weight exchange id set in the contract config in the proposals sent to the contract', 'size':'l'},

            {'title':'Maximum Proposal Expiry Submit Expiry Time Difference', 'details':'the maximum difference in time between the proposal expiry and submit expiry time.', 'size':'l'},

            {'title':'Bounty Limit Type', 'details':'if 0, the minimum amount of end or spend enforced by the contract to be used as bounty for proposals will be measured and adjusted relative to the gas price and demand for spend. If 1, the minumum amounts specified by the contract will be used as is', 'size':'l'},

            {'title':'Force Exit Enabled', 'details':'if set to 1, contract moderators can force accounts to exit the contract.', 'size':'l'},

            {'title':'Primary Transaction Account', 'details':'an account that is required to run transactions to keep E5 online.', 'size':'l'},

            {'title':'Primary Account Transaction Period', 'details':'the minimum amount of time the primary_tx_account is required to not run a transaction before E5 becomes offline. This can help prevent forced unanimous consensus attacks from miners.', 'size':'l'},
        ]
    }




    render_exchanges_wiki(){
        var size = this.props.size

        if(size == 's'){
            return(
                <div>
                    {this.exchanges_wiki_part()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row" style={{'padding': '0px 0px 0px 0px'}}>
                    <div className="col-7" style={{'padding': '0px 0px 0px 0px'}}>
                        {this.exchanges_wiki_part()}
                    </div>
                    <div className="col-5">
                        
                    </div>
                </div>
                
            )
        }
    }

    exchanges_wiki_part(){
        var items = this.get_exchanges_wiki_data()
        const sortedData = this.sortByAttributeAscending(items, 'title');
        return(
            <div style={{overflow: 'auto', maxHeight: this.props.height-130}}>
                <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                    {sortedData.map((item, index) => (
                        <li style={{'padding': '5px'}}>
                            {this.render_detail_item('3', item)}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    get_exchanges_wiki_data(){
        return[
            {'title':'Exchange Buy Limit', 'details':'the maximum amount of tokens that can be bought in one transaction.', 'size':'l'},

            {'title':'Block Limit', 'details':'the maximum amount of spend that can be minted before the active mint limit is reduced using its internal_block_halfing_proportion.', 'size':'l'},

            {'title':'Minimum Transactions Between Swap', 'details':'the minimum number of transactions sender has to make between swaps for a given token.', 'size':'l'},

            {'title':'Minimum Blocks Between Swap', 'details':'the minimum number of blocks sender has to wait between making a swap for a given token.', 'size':'l'},

            {'title':'Minimum Time Between Swap', 'details':'the minimum amount of time a sender has to wait between making a swap for a given token.', 'size':'l'},

            {'title':'Internal Block Halving Proportion', 'details':'proportion or percentage used in reducing the amount of spend that a sender can mint based on the block limit relative to the current block mint total.', 'size':'l'},

            {'title':'Block Limit Reduction Proportion', 'details':'proportion or percentage used in reducing the Active Block Limit Reduction Proportion  between blocks if block_limit is exceeded in current block.', 'size':'l'},

            {'title':'Trust Fee Proportion', 'details':'proportion or percentage fee enforced on all contract spending that takes place using token.', 'size':'l'},

            {'title':'Block Reset Limit', 'details':'the maximum number of blocks that are counted while reseting Active Block Limit Reduction Proportion value when multiple blocks have passed without a mint event taking place.', 'size':'l'},

            {'title':'Exchange Authority', 'details':'the account that has the exclusive permission to modify a given exchange.', 'size':'l'},

            {'title':'Trust Fee Target', 'details':'the account set to receive trust fees paid from spending its tokens in a contract.', 'size':'l'},

            {'title':'Exchange Amount Sell Limit', 'details':'maximum amount of tokens sender can sell in a transaction.', 'size':'l'},

            {'title':'Block Limit Sensitivity', 'details':'value used to amplify the proportion used to update the Active Block Limit Reduction Proportion when block limit in current block has been exceeded.', 'size':'l'},

            {'title':'Minimum Entered Contracts Between Swap', 'details':'the minimum amount of contracts sender should enter before interacting with an exchange again.', 'size':'l'},

            {'title':'Authority Mint Limit', 'details':'the proportion or percentage used in caluclating the maximum amount of spend an authority can mint using the auth-mint action and the tokens total supply.', 'size':'l'},

            {'title':'Block Halving Type', 'details':'0(Fixed), meaning each minter receives the same amount of spend while minting depending on the block_limit and factor being used. 1(Spread), meaning each minter receives a slightly less ammount than the previous minter.', 'size':'l'},

            {'title':'Maturity Limit', 'details':'Amount of spend used in calculating the active block limit. If the maturity limit has not been exceeded, the active block limit used is less than its default set value.', 'size':'l'},

            {'title':'Minimum Transactions For First Buy', 'details':'The minimum number of transactions sender has to make to buy/sell a token for the first time.', 'size':'l'},

            {'title':'Minimum Entered Contracts For First Buy', 'details':'The minimum number of contracts sender should have entered before first buy.', 'size':'l'},

            {'title':'Token Exchange Liquidity', 'details':'The supply of a capped token available for buying. total_supply: The total number of uncapped tokens that have been minted or bought.', 'size':'l'},

            {'title':'Parent Token Balance', 'details':'The amount in parent tokens the exchange has received while buying its token.', 'size':'l'},

            {'title':'Current Block Mint Total', 'details':'The total amount of tokens that have been minted in current block.', 'size':'l'},

            {'title':'Active Mint Block', 'details':'The last block in which tokens were minted.', 'size':'l'},

            {'title':'Active Block Limit Reduction Proportion', 'details':'proportion or percentage used in calculating the amount of tokens that can be minted. It changes with demand for the token.', 'size':'l'},

            {'title':'Default Depth', 'details':'depth used while buing or selling a token.', 'size':'l'},
        ]
    }




    render_subscriptions_wiki(){
        var size = this.props.size

        if(size == 's'){
            return(
                <div>
                    {this.subscriptions_wiki_part()}
                </div>
            )
        }
        else if(size == 'm'){
            return(
                <div className="row" style={{'padding': '0px 0px 0px 0px'}}>
                    <div className="col-7" style={{'padding': '0px 0px 0px 0px'}}>
                        {this.subscriptions_wiki_part()}
                    </div>
                    <div className="col-5">
                        
                    </div>
                </div>
                
            )
        }
    }

    subscriptions_wiki_part(){
        var items = this.get_subscriptions_wiki_data()
        const sortedData = this.sortByAttributeAscending(items, 'title');
        return(
            <div style={{overflow: 'auto', maxHeight: this.props.height-130}}>
                <ul style={{ 'padding': '0px 0px 0px 0px'}}>
                    {sortedData.map((item, index) => (
                        <li style={{'padding': '5px'}}>
                            {this.render_detail_item('3', item)}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    get_subscriptions_wiki_data(){
        return[
            {'title':'Target Authority Id', 'details':'Account that controlls changes and receives subscription payments made.', 'size':'l'},

            {'title':'Minimum Buy Amount', 'details':'Minimum amount that can be paid for a subscription.', 'size':'l'},

            {'title':'Cancellable Subscription', 'details':'If true, sender can refund paid subscriptions.', 'size':'l'},

            {'title':'Maximum Buy Amount', 'details':'Maximum amount that can be paid for a subscription.', 'size':'l'},

            {'title':'Minumum Cancellable Balance Amount', 'details':'the minimum amount of time that can be left when cancelling a subscription payment', 'size':'l'},

            {'title':'Time Unit', 'details':'the amount of time thats used as a unit when paying for a subscription', 'size':'l'},
        ]
    }


    /* renders the specific element in the post or detail object */
    render_detail_item(item_id, object_data){
        return(
            <div>
                <ViewGroups graph_type={this.props.app_state.graph_type} font={this.props.app_state.font} item_id={item_id} object_data={object_data} theme={this.props.theme} />
            </div>
        )

    }

}




export default WikiPage;