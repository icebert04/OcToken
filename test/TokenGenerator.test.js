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

    describe('Generating tokens', async () => {
        it('rewards investors for sending Dai tokens', async () => {
            let result

            result = await daiToken.balanceOf(investor)
            assert.equal(result.toString(), tokens('100'), 'investor DAI wallet balance correct before sending')
        // Send DAI Tokens
            await daiToken.approve(tokenGenerator.address, tokens('100'), { from: investor })
            await tokenGenerator.placeTokens(tokens('100'), { from: investor })

        // Check result
            result = await daiToken.balanceOf(investor)
            assert.equal(result.toString(), tokens('0'), 'investor DAI wallet balance correct after sending')

            result = await daiToken.balanceOf(tokenGenerator.address)
            assert.equal(result.toString(), tokens('100'), 'Token Generator DAI balance correct after sending')

            result = await tokenGenerator.sendingBalance(investor)
            assert.equal(result.toString(), tokens('100'), 'investor sending balance correct after sending')

            result = await tokenGenerator.isPlacing(investor)
            assert.equal(result.toString(), 'true', 'investor sending status correct after sending')

            // Reward Tokens
            await tokenGenerator.awardToken({ from: owner })

            // Check balances after the rewards
            result = await ocToken.balanceOf(investor)
            assert.equal(result.toString(), tokens('100'), 'investor Octo Token wallet balance correct after the rewards')

            // Ensure that only onwer can reward tokens
            await tokenGenerator.awardToken({ from: investor }).should.be.rejected;

            // refund tokens
            await tokenGenerator.refundTokens({ from: investor })

            // Check results after refunding
            result = await daiToken.balanceOf(investor)
            assert.equal(result.toString(), tokens('100'), 'investor DAI wallet balance correct after sending')

            result = await daiToken.balanceOf(tokenGenerator.address)
            assert.equal(result.toString(), tokens('0'), 'Token Generator DAI balance correct after sending')

            result = await tokenGenerator.sendingBalance(investor)
            assert.equal(result.toString(), tokens('0'), 'investor balance correct after sending')

            result = await tokenGenerator.isPlacing(investor)
            assert.equal(result.toString(), 'false', 'investor sending status correct after sending')
        })
    })

})
