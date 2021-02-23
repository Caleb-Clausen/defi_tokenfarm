const TokenFarm = artifacts.require('TokenFarm')
const SpiritClashToken = artifacts.require('SpiritClashToken')
const DappToken = artifacts.require('DappToken')

require('chai')
.use(require('chai-as-promised'))
.should()

function tokens(n) {
	return web3.utils.toWei(n, 'ether');
}

contract('TokenFarm', (accounts) =>{
	let owner = accounts[0]
	let investor = accounts[1]

	let spiritClashToken, dappToken, tokenFarm
	

before(async()=>{
	// load contracts 
	spiritClashToken = await SpiritClashToken.new()
	dappToken = await DappToken.new()
	tokenFarm = await TokenFarm.new(dappToken.address, spiritClashToken.address)

	// Transfer all DappTokens to the tokenfarm(1 million )
	await dappToken.transfer(tokenFarm.address, tokens('1000000'))
	// Send tokens to investor
	await spiritClashToken.transfer(investor, tokens('100'), {from: owner})
})


// Write tests here...




describe('SpiritClashToken', async () => {
it('has a name', async () =>{
	const name = await spiritClashToken.name()
	assert.equal(name, 'Mock Spirit Clash Token')
 })
})

describe('Dapp Token Deployment', async () => {
it('has a name', async () =>{
	const name = await dappToken.name()
	assert.equal(name, 'DApp Token')
 })
})

describe('Token Farm Deployment', async () => {
it('has a name', async () =>{
	const name = await tokenFarm.name()
	assert.equal(name, 'Dapp Token Farm')
 })

it('contact has tokens', async () =>{
	let balance = await dappToken.balanceOf(tokenFarm.address)
	assert.equal(balance.toString(), tokens('1000000'))
 })
})

describe('Onwer and investor', async () => {
it('Onwer and investor', async () =>{
	assert.equal(owner, '0xfB691C8B0B2cba335D2dE84BA468FdE841a7Bfc1')
	assert.equal(investor, '0xD1Dfa9e8D4A96e6d32B2fC9FB28E590b6a6290EA')
 })
})

 describe('famring tokens', async () =>{
 	it('rewards investors for staking Spirit Clash Tokens',async() =>{
 		let result

 		// Check investor balance before  staking
 		result = await spiritClashToken.balanceOf(investor)
 		assert.equal(result.toString(), tokens('100'), 'investor Mock SpiritClashToken balance correct before staking')

 		// Stake Mock Spirit ClashTokens
 		await spiritClashToken.approve(tokenFarm.address, tokens('100'), {from: investor})
 		
 		await tokenFarm.stakeTokens(tokens('100'), {from: investor})

 		// Check staking results
 		result = await spiritClashToken.balanceOf(investor)
 		assert.equal(result.toString(), tokens('0'), 'investor Mock Spirit Clash Token wallet balance correct after staking')

 		
 		 result = await spiritClashToken.balanceOf(tokenFarm.address)
 		 assert.equal(result.toString(), tokens('100'), 'Token Farm Mock Spirit Clash Token wallet balance correct after staking')

 		 result = await tokenFarm.isStaking(investor)
 		 assert.equal(result.toString(), 'true', 'investor staking status is correct after staking')

 		// // Issue Tokens
 		// await tokenfarm.issueTokens({from: owner})

 		// // Check balances after issuance
 		// result = await dappToken.balanceOf(investor)
 		// assert.equal(result.toString(), tokens('100'), 'investor DApp Token wallet balance correct after issuance')


 		// // Ensure that only owner can issue tokens
 		// await tokenFarm.issueTokens({from: investor}).should.be.rejected;

 	})
 })


})