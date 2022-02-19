import Web3 from "web3";
import React,{ Component } from "react";
import detectEthereumProvider from '@metamask/detect-provider';
import sendEth from '../abis/sendEthcontract.json';
class App extends Component{
    async componentDidMount(){
        await this.loadDidMount();
        await this.loadDataBlock();
    }
    async loadDidMount(){
        const provider = await detectEthereumProvider();
        //modern browsers
        // if ther is a provider, then lets console.log that its working and access the window from
        // the doc to set web3 to the provider
        if(provider){
            console.log('ethereum wallet connected');
            window.web3 = new Web3(provider);
        }else{
            //if no etheeym provider
            window.alert('no ethereum wallet detected. Install a wallet provider like Metamask or Trustwallet ');
        }
    }
    constructor(props){
        super(props);
        this.state = {
            account: '',
            contract: null,
            web3: null
        }
    }
    async loadDataBlock(){
        const web3 = window.web3;
        this.setState({web3})
        const accounts = await web3.eth.requestAccounts();
        this.setState({account: accounts[0]})
        console.log(accounts);
        const networkId = await web3.eth.net.getId();
        const networkData = sendEth.networks[networkId];
        if(networkData){
            const abis = sendEth.abi;
            var address = networkData.address;
            var contract = new web3.eth.Contract(abis,address);
            this.setState({contract: contract});
            
        }else{
            window.alert('Smart contract not deployed');
        }
    }
    transfer= async (to,value) =>{
        
        value = this.state.web3.utils.toWei(value,'ether');
        console.log(to +' value:'+ value);
        await this.state.contract.methods.transfer(to,value).send({from: this.state.account});
    }
    render(){
        return(
            <div>
                {console.log('Account is' +this.state.account)}
                <header>Hellow world</header>
                <form onSubmit={ (event)=>{event.preventDefault(); 
                             
                            const _to = this.to.value; 
                            const _value = this.value.value;
                            this.transfer(_to,_value) }}>
                    <input type='text' ref={(address)=>{this.to=address}} placeholder='Enter address to send eth'/>
                    <input type='text' placeholder="enter value to send" ref={(value)=>{this.value=value}}/>
                    <input style={{margin: '6px'}}  className='btn btn-primary btn-black' value='Send' type='submit'/>
                </form>
            </div>
        )
    }
}
export default App;