// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
// Use this helper contract to get abi encoded data to pass in a transaction
contract Helper{
    function getData(address _account) external pure returns(bytes memory){
        return abi.encodeWithSignature("addDistributor(address)", _account);
    }
}