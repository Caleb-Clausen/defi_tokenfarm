

const TokenFarm = artifacts.require('TokenFarm')
const SpiritClashToken = artifacts.require('SpiritClashToken')
const DappToken = artifacts.require('DappToken')


module.exports = async function(deployer, network, accounts) {
 	// Deploy Mock Spirit Clash Token
 	await deployer.deploy(SpiritClashToken);
 	const spiritClashToken = await SpiritClashToken.deployed();

 	// Deploy Dapp Token
 	await deployer.deploy(DappToken);
 	const dappToken = await DappToken.deployed();

 	// Deploy Token Farm
 	await deployer.deploy(TokenFarm, dappToken.address, spiritClashToken.address);
 	const tokenFarm = await TokenFarm.deployed();


 	// Transfer all tokens to TokenFarm 
   	await dappToken.transfer(tokenFarm.address, '1000000000000000000000000');


   	await spiritClashToken.transfer(accounts[1], '100000000000000000000');
};
