// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
import "./Roles.library.sol";
import "hardhat/console.sol";

// Define a contract 'DistributorRole' to manage this role - add, remove, check
contract DistributorRole {
  using Roles for Roles.Role;
  // Define 2 events, one for Adding, and other for Removing
  event DistributorAdded(address indexed account);
  event DistributorRemoved(address indexed account);
  // Define a struct 'distributors' by inheriting from 'Roles' library, struct Role
  Roles.Role private distributors;
  // In the constructor make the address that deploys this contract the 1st distributor
  address MultisigwalletAddress;
  
  constructor() {
    _addDistributor(msg.sender);
  }
  
  // NOTE: Change this visiblity from public
  function setMultisigwalletAddress(address _multisigwalletAddress) public{
    MultisigwalletAddress=_multisigwalletAddress;
  }

  // Define a modifier that checks to see if msg.sender has the appropriate role
  modifier onlyDistributor() {
    // console.log("msg.sender",msg.sender);
    // console.log(isDistributor(msg.sender));
    require(isDistributor(msg.sender),"Invalid Role");
    _;
  }

  modifier onlyBODirector() {
        require(MultisigwalletAddress ==msg.sender,"You can not add a new distributor");
      _;                       
  }                         
  
  // Define a function 'isDistributor' to check this role
  function isDistributor(address account) public view returns (bool) {
    return distributors.has(account);
  }

  // Define a function 'addDistributor' that adds this role
  function addDistributor(address account) public onlyBODirector {
    _addDistributor(account);
  }

  // Define a function 'renounceDistributor' to renounce this role
  function renounceDistributor() public {
    _removeDistributor(msg.sender);
  }

  // Define an internal function '_addDistributor' to add this role, called by 'addDistributor'
  function _addDistributor(address account) internal {
    distributors.add(account);
    emit DistributorAdded(account);
  }

  // Define an internal function '_removeDistributor' to remove this role, called by 'removeDistributor'
  function _removeDistributor(address account) internal {
    distributors.remove(account);
    emit DistributorRemoved(account);
  }
}