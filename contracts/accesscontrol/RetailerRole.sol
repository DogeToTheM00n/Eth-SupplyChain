// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
import "./Roles.library.sol";

contract RetailerRole {
  using Roles for Roles.Role;
  Roles.Role private retailers;
  event RetailerAdded(address indexed account);
  event RetailerRemoved(address indexed account);
  
  constructor() {
    _addRetailer(msg.sender);
  }

  modifier onlyRetailer() {
     require(isRetailer(msg.sender));
    _;
  }

  function isRetailer(address account) public view returns (bool) {
    return retailers.hasRole(account);
  }

  function addRetailer(address account) public onlyRetailer {
    _addRetailer(account);
  }

  function renounceRetailer() public {
    _removeRetailer(msg.sender);
  }

  function _addRetailer(address account) internal {
    retailers.addRole(account);
    emit RetailerAdded(account);
  }
  
  function _removeRetailer(address account) internal {
    retailers.remove(account);
    emit RetailerRemoved(account);
  }
}