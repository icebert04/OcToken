import React, { Component } from 'react'
import Navbar from './Navbar'
import OcToken from '../abis/OcToken.json'
import DaiToken from '../abis/DaiToken.json'
import TokenGenerator from '../abis/TokenGenerator.json'
import './App.css'
import Main from './Main'
import Web3 from 'web3'

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadBlockchainData() {
    const web3 = window.web3
  
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })

    const networkId = await web3.eth.net.getId()

    // Load DaiToken
    const daiTokenData = DaiToken.networks[networkId]
    if(daiTokenData) {
      const daiToken = new web3.eth.Contract(DaiToken.abi, daiTokenData.address)
      this.setState({ daiToken })
      let daiTokenBalance = await daiToken.methods.balanceOf(this.state.account).call()
      this.setState({ daiTokenBalance: daiTokenBalance.toString() })
      console.log({ balance: daiTokenBalance })
    } else {
      window.alert('DaiToken contract not deployed to detected network.')
    }
  
      // Load OcToken
    const ocTokenData = OcToken.networks[networkId]
    if(ocTokenData) {
      const ocToken = new web3.eth.Contract(OcToken.abi, ocTokenData.address)
      this.setState({ ocToken })
      let ocTokenBalance = await ocToken.methods.balanceOf(this.state.account).call()
      this.setState({ ocTokenBalance: ocTokenBalance.toString() })
    } else {
      window.alert('OcToken contract not deployed to detected network.')
    }

      // Load TokenGenerator
    const tokenGeneratorData = TokenGenerator.networks[networkId]
    if(tokenGeneratorData) {
      const tokenGenerator = new web3.eth.Contract(TokenGenerator.abi, tokenGeneratorData.address)
      this.setState({ tokenGenerator })
      let sendingBalance = await tokenGenerator.methods.sendingBalance(this.state.account).call()
      this.setState({ sendingBalance: sendingBalance.toString() })
    } else {
      window.alert('TokenGenerator contract not deployed to detected network.')
    }

    this.setState({ loading: false })
  }
  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

placeTokens = (amount) => {
    this.setState({ loading: true })
    this.state.daiToken.methods.approve(this.state.tokenGenerator._address, amount).send({ from: this.state.account }).on('transactionHash', (hash) => {
      this.state.tokenGenerator.methods.placeTokens(amount).send({ from: this.state.account }).on('transactionHash', (hash) => {
        this.setState({ loading: false })
      })
    })
  }
    refundTokens = (amount) => {
    this.setState({ loading: true })
    this.state.tokenGenerator.methods.refundTokens().send({ from: this.state.account }).on('transactionHash', (hash) => {
      this.setState({ loading: false })
    })
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '0x0',
      daiToken: {},
      ocToken: {},
      tokenGenerator: {},
      daiTokenBalance: '0',
      ocTokenBalance: '0',
      sendingBalance: '0',
      loading: true
    }
  }

  render() {
    let content 
    if(this.state.loading) {
      content = <p id="loader" className="text-center">Loading...</p>
    } else {
      content = <Main 
        daiTokenBalance={this.state.daiTokenBalance}
        ocTokenBalance={this.state.ocTokenBalance}
        sendingBalance={this.state.sendingBalance}
        placeTokens={this.placeTokens}
        refundTokens={this.refundTokens}
      />
    }
  
    return (
      <div>
        <Navbar account={this.state.account} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '1000px' }}>
              <div className="content mr-auto ml-auto">
            
                {content}

              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
