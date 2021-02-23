pragma solidity >=0.5.0;


import "./DappToken.sol";
import "./SpiritClashToken.sol";

/**
 * The TokenFarm contract does this and that...
 */
contract TokenFarm {
 	// These get stored on the blockchain
 	// Owner is the person who deployes the contract
 	address public owner;
 	string public name = "Dapp Token Farm";
 	DappToken public dappToken;
 	SpiritClashToken public spiritclashtoken;

	
	// people that have ever staked	
 	address[] public stakers;
 	mapping (address => uint) public stakingBalance;
 	// Checks to see if the person has staked
 	mapping (address => bool) hasStaked;
 	mapping (address => bool) isStaking;



	// This is passing in addresses, I can find them manually
  constructor(DappToken _dapptoken, SpiritClashToken _spiritclashtoken ) public {
    dappToken = _dapptoken;
    spiritclashtoken = _spiritclashtoken;
    owner = msg.sender;
  }

 // 1. Stakes Tokens(Deposit)
 function stakeTokens   (uint _amount) public payable {
 	// Require amount greater than 0
 	require(_amount > 0, "amount cannot be 0");
 	

 	// Transfer Mock Dai tokens to this contract for staking
 	spiritclashtoken.transferFrom(msg.sender, address(this), _amount);

 	// Update staking balance
 	stakingBalance[msg.sender] = stakingBalance[msg.sender] + _amount;

 		// Add users to stakers array *only* if they havent staked already
 	if(!hasStaked[msg.sender]) {
 		stakers.push(msg.sender);
 	}

 	// Update staking status
 	hasStaked[msg.sender] = true;
 	isStaking[msg.sender] = true;
 	
 }
 
 //  Unstaking Tokens(Withdraw)

 	function unstakeTokens ()  public {
 		// Fetch staking balance
 		uint balance = stakingBalance[msg.sender];
 		// Require amount greater then 0

 		require (balance > 0, "staking balance cannot be 0");

 		// Transfer Mock spirit clash tokens to this contract for staking
 		spiritclashtoken.transfer(msg.sender, balance);

 		// Reset staking balance
 		stakingBalance[msg.sender] = 0;

 		// Update staking status
 		isStaking[msg.sender] = false;
 	}
 

 //  Issuing Tokens

 	function issueTokens()  public {
 		// Only the owner can call this function
 		require (msg.sender == owner, "caller must be the owner");
 		

 		// Issue tokens to stakers
 		for(uint i=0; i <stakers.length; i++){
 			// grab their address starting one by one
 			address recipient = stakers[i];
 			// fetch their balance
 			uint balance = stakingBalance[recipient];

 			// make sure they have more then a zero balance
 			if(balance > 0){
 				dappToken.transfer(recipient, balance);
 			}
 			

 		}
 		
 	}
 	

}


