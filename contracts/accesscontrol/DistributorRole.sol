// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
import "./Roles.library.sol";

contract DistributorRole {
  using Roles for Roles.Role;
  Roles.Role private distributors;
  
  event DistributorAdded(address indexed account);
  event DistributorRemoved(address indexed account);

  // Address of the Multi sig contract
  address MultisigwalletAddress;
  
  // NOTE: Change this visiblity from public
  function setMultisigwalletAddress(address _multisigwalletAddress) public{
    MultisigwalletAddress=_multisigwalletAddress;
  }

  constructor() {}
  
  modifier onlyBODirector() {
        require(MultisigwalletAddress ==msg.sender,"You can not add a new distributor");
      _;
  }
  
  // Define a modifier that checks to see if msg.sender has the appropriate role

  modifier onlyDistributor() {
    require(isDistributor(msg.sender));
    _;
  }


  function isDistributor(address account) public view returns (bool) {
    return distributors.hasRole(account);
  }

  function addDistributor(address account) public onlyBODirector {
    _addDistributor(account);
  }

  function renounceDistributor() public {
    _removeDistributor(msg.sender);
  }

  function _addDistributor(address account) internal {
    distributors.addRole(account);
    emit DistributorAdded(account);
  }

  function _removeDistributor(address account) internal {
    distributors.remove(account);
    emit DistributorRemoved(account);
  }
}