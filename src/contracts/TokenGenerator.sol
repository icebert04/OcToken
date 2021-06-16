pragma solidity ^0.5.0;

import "./OcToken.sol";
import "./DaiToken.sol";

contract TokenGenerator {
    string public name = "Token Generator";
    OcToken public ocToken;
    DaiToken public daiToken;

    constructor(OcToken _ocToken, DaiToken _daiToken) public {
        ocToken = _ocToken;
        daiToken = _daiToken;
    }
}