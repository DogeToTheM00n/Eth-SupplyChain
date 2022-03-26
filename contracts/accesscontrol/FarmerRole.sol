// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
import "./Roles.library.sol";

contract FarmerRole {
  using Roles for Roles.Role;   
  Roles.Role private farmers;

  event FarmerAdded(address indexed account);
  event FarmerRemoved(address indexed account);

  constructor(){
    _addFarmer(msg.sender);
  }

  modifier onlyFarmer() {
    require(isFarmer(msg.sender));
    _;
  }

  function isFarmer(address account) public view returns (bool) {
    return farmers.hasRole(account);
  }

  function addFarmer(address account) public onlyFarmer {
    _addFarmer(account);
  }

  function renounceFarmer() public {
    _removeFarmer(msg.sender);
  }

   function _addFarmer(address account) internal {
    farmers.addRole(account);
    emit FarmerAdded(account);
  }

 function _removeFarmer(address account) internal {
    farmers.remove(account);
    emit FarmerRemoved(account);
  }
}