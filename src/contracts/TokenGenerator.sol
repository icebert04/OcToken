pragma solidity ^0.5.0;

import "./DaiToken.sol";
import "./OcToken.sol";

contract TokenGenerator {
    //code...
    string public name = "OcToken Generator";
    OcToken public ocToken;
    DaiToken public daiToken;

    constructor(OcToken _ocToken, DaiToken _daiToken) public {
        OcToken = _ocToken;
        DaiToken = _daiToken;
    }
}
    