const OcToken = artifacts.require('OcToken')
const DaiToken = artifacts.require('DaiToken')
const TokenGenerator = artifacts.require("TokenGenerator");

module.exports = function(deployer, network, accounts) {
    await deployer.deploy(DaiToken)
    const daiToken = await DaiToken.deployed()

    await deployer.deploy(OcToken)
    const ocToken = await OcToken.deployed()

    await deployer.deploy(TokenGenerator, ocToken.address, daiToken.address)
    const tokenGenerator = await TokenGenerator.deployed()

    // Transfer all tokens to TokenGenerator (1 million)
    await ocToken.transfer(tokenGenerator.address, '1000000000000000000000000')

      // Transfer 100 DAI tokens to investor
    await daiToken.transfer(accounts[1], '100000000000000000000')
};
