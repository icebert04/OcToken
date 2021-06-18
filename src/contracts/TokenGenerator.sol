pragma solidity ^0.5.0;

import "./OcToken.sol";
import "./DaiToken.sol";

contract TokenGenerator {
    string public name = "Token Generator";
    address owner;
    OcToken public ocToken;
    DaiToken public daiToken;
    
    mapping(address => uint) public sendingBalance;
    mapping(address => bool) public hasPlaced;
    mapping(address => bool) public isPlacing;


    address[] public senders;
    constructor(OcToken _ocToken, DaiToken _daiToken) public {
        ocToken = _ocToken;
        daiToken = _daiToken;
        owner = msg.sender;
    }

    // sending tokens
    function placeTokens(uint _amount) public {
        // amount greater than 0
        require(_amount > 0, "amount cannot be 0");

        daiToken.transferFrom(msg.sender, address(this), _amount);

        sendingBalance[msg.sender] = sendingBalance[msg.sender] + _amount;

        if(!hasPlaced[msg.sender]) {
            senders.push(msg.sender);
        }

            isPlacing[msg.sender] = true;
            hasPlaced[msg.sender] = true;
    }

    // refunding tokens

    function refundTokens() public {
        uint balance = sendingBalance[msg.sender];

        // Require amount greater than 0
        require(balance > 0, "balance cannot be 0");

        // Transfer Dai tokens to this contract for sending
        daiToken.transfer(msg.sender, balance);

        // Reset sending balance
        sendingBalance[msg.sender] = 0;

        // Update sending status
        isPlacing[msg.sender] = false;
    }

    // reward tokens
    function awardToken() public {
    require(msg.sender == owner, "caller must be the owner");
        for (uint i=0; i<senders.length; i++) {
            address recipient = senders[i];
            uint balance = sendingBalance[recipient];
            if(balance > 0) {
                ocToken.transfer(recipient, balance);
            }
        }
    }


}