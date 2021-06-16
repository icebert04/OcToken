const DaiToken = artifacts.require('DaiToken')
const OcToken = artifacts.require('OcToken')
const TokenGenerator = artifacts.require('TokenGenerator')

require('chai')
    .use(require('chai-as-promised'))
    .should()

    function tokens(n) {
        return web3.utils.toWei(n, 'ether');
    }

    contract('TokenGenerator', ([owner, investor])=> {
    let daiToken, ocToken, tokenGenerator

    before(async () => {
        // contracts
        daiToken = await DaiToken.new()
        ocToken = await OcToken.new()
        tokenGenerator = await TokenGenerator.new(ocToken.address, daiToken.address)

        await ocToken.transfer(tokenGenerator.address, tokens('1000000'))

        await daiToken.transfer(investor, tokens('100'), { from: owner })
    })

        describe('DAI deployment', async () => {
        it('has a name', async () => {
            const name = await daiToken.name()
            assert.equal(name, 'DAI Token')
        })
    })

    describe('Octo Token deployment', async () => {
        it('has a name', async () => {
            const name = await ocToken.name()
            assert.equal(name, 'Octo Token')
        })
    })

        describe('Token Generator deployment', async () => {
        it('has a name', async () => {
            const name = await tokenGenerator.name()
            assert.equal(name, 'Token Generator')
        })
    
        it('contract has tokens', async () => {
            let balance = await ocToken.balanceOf(tokenGenerator.address)
            assert.equal(balance.toString(), tokens('1000000'))
        })

    })
})
