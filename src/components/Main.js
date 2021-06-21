    import React, { Component } from 'react'
    import dai from '../dai.png'
    import octo from '../OcToken.png'
    class Main extends Component {

    render() {
        return (
        <div id="content">

        <section>
            
            <div id="title">
            
            <h1><b>Oc</b>Token</h1>
            <p>The safest yeild farm on the ETH Blockchain</p>

            </div>
            
        
            <table className="  table table-borderless text-muted text-center">
            <thead>
                <tr>
                <th scope="col">Tokens Sent <span className="token"><img height='40'  src={dai} alt="token of DAI" /></span></th>
                <th scope="col">Tokens Earned <span className="token"><img height='40'  src={octo} alt="token of OCTO" /></span></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <td>
                {window.web3.utils.fromWei(this.props.sendingBalance, 'Ether')}<b> DAI </b>
                </td>
                <td>
                {window.web3.utils.fromWei(this.props.ocTokenBalance, 'Ether')}<b> OCTO</b>
                </td>
                </tr>
            </tbody>
            </table>
        </section>
            
        
        <section>
        <ul className="main-grid">
            <li id="send">
        <div className="card mb-4">
        
            <div className="card-body">

                    <form onSubmit={(event) => {
                    event.preventDefault()
                    let amount
                    amount = this.input.value.toString()
                    amount = window.web3.utils.toWei(amount, 'Ether')
                    this.props.placeTokens(amount)
                }}>
                <div>
                    <label className="float-left"><b>Send Tokens</b></label>
                    <span className="float-right text-muted">
                    Balance: {window.web3.utils.fromWei(this.props.daiTokenBalance, 'Ether')}
                    </span>
                </div>
                <div className="input-group mb-4">
                    <input
                    type="text"
                    ref={(input) => { this.input = input }}
                    className="form-control form-control-lg"
                    placeholder="0"
                    required />
                    <div className="input-group-append">
                    <div className="input-group-text">
                        <img src={dai} height='32' alt=""/>
                        &nbsp;&nbsp;&nbsp; DAI
                    </div>
                    </div>
                </div>
                <button type="submit" className="button btn-block btn-lg">SEND!</button>
                </form>
            </div>
        </div>
        </li>

        <li id="refund">
            <div id="refund" className="card mb-4">
            
                <div className="card-body">
                <div>
                    <label className="float-left"><b>Withdraw Tokens</b></label>
                </div>
                <div className="input-group mb-4">
                <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="100"
                    readOnly/>
                    <div className="input-group-append">
                    <div className="input-group-text">
                        <img src={dai} height='32' alt=""/>
                        &nbsp;&nbsp;&nbsp; DAI
                    </div>
                    </div>
                </div>
            <button
            type="submit"
            className="button btn-block btn-lg"
            onClick={(event) => {
            event.preventDefault()
                this.props.refundTokens()
                }}>
                Refund...
                </button>
                </div>
            </div> 
        </li>
    </ul>
        
        

        </section>
        
        
        </div>
        );
    }
}

    export default Main;
