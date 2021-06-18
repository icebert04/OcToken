const TokenGenerator = artifacts.require('TokenGenerator')

module.exports = async function(callback) {
    let tokenGenerator = await TokenGenerator.deployed()
    await tokenGenerator.awardToken()
    // Code goes here...
    console.log("Tokens issued!")
    callback()
}