// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
// Import the library 'Roles'
import "./Roles.library.sol";
import "hardhat/console.sol";
// Define a contract 'FarmerRole' to manage this role - add, remove, check
contract FarmerRole {
  
  using Roles for Roles.Role;

  struct FarmerInfo{
    string originFarmName;
    string originFarmInformation;
    string  originFarmLatitude; 
    string  originFarmLongitude; 
  }
  
  mapping(address =>FarmerInfo) public aboutFarmer;

  // Define 2 events, one for Adding, and other for Removing
  event FarmerAdded(address indexed account, string indexed originFarmName, string indexed originFarmInformation, string originFarmLatitude, string originFarmLongitude);
  event FarmerRemoved(address indexed account);

  // Define a struct 'farmers' by inheriting from 'Roles' library, struct Role
  Roles.Role private farmers;

  // In the constructor make the address that deploys this contract the 1st farmer
  constructor() {
    _addFarmer(msg.sender,"Admin","Default farmer","","");
  }

  // Define a modifier that checks to see if msg.sender has the appropriate role
  modifier onlyFarmer() {
    require(isFarmer(msg.sender));
    _;
  } 

  // Define a function 'isFarmer' to check this role
  function isFarmer(address account) public view virtual returns (bool) {
    return farmers.has(account);
  } 

  // Define a function 'addFarmer' that adds this role                                                                                                                                               
  function addFarmer(address account, string memory _originFarmName, string memory _originFarmInformation, string memory _originFarmLatitude, string memory _originFarmLongitude) public onlyFarmer {
    _addFarmer(account, _originFarmName, _originFarmInformation, _originFarmLatitude, _originFarmLongitude);
  }

  // Define a function 'renounceFarmer' to renounce this role
  function renounceFarmer() public {
    _removeFarmer(msg.sender);
  }

  // Define an internal function '_addFarmer' to add this role, called by 'addFarmer'
  function _addFarmer(address account, string memory _originFarmName, string memory _originFarmInformation, string memory _originFarmLatitude, string memory _originFarmLongitude) internal {
    farmers.add(account);
    FarmerInfo memory farmerinfo =FarmerInfo({
      originFarmName: _originFarmName,
      originFarmInformation: _originFarmInformation, 
      originFarmLatitude: _originFarmLatitude, 
      originFarmLongitude: _originFarmLongitude
    });
    aboutFarmer[account]= farmerinfo;
    emit FarmerAdded(account,_originFarmName,_originFarmInformation, _originFarmLatitude, _originFarmLongitude);
  }

  // Define an internal function '_removeFarmer' to remove this role, called by 'removeFarmer'
  function _removeFarmer(address account) internal {
    farmers.remove(account);
    emit FarmerRemoved(account);
  }
}