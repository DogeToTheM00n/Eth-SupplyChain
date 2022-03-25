// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
import "./Roles.library.sol";

contract ConsumerRole {
  using Roles for Roles.Role;
  Roles.Role private consumers;
  
  event ConsumerAdded(address indexed account);
  event ConsumerRemoved(address indexed account);

  constructor() {
    _addConsumer(msg.sender);
  }

  modifier onlyConsumer() {
    require(isConsumer(msg.sender));
    _;
  }

  function isConsumer(address account) public view returns (bool) {
    return consumers.hasRole(account);
  }
  
  function addConsumer(address account) public onlyConsumer {
    _addConsumer(account);
  }
  
  function renounceConsumer(address account) public {
    _removeConsumer(account);
  }

  function _addConsumer(address account) internal {
    consumers.addRole(account);
    emit ConsumerAdded(account);
  }
  
  function _removeConsumer(address account) internal {
    consumers.remove(account);
    emit ConsumerRemoved(account);
  }
}