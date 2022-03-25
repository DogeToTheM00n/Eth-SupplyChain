// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
library Roles {
    struct Role{
        mapping(address =>bool) granted;
    }
    modifier validAddress(address _account){
        require(_account != address(0),"Invalid address");
        _;
    }
    function addRole(Role storage _role,address _account) validAddress(_account) internal {
        require(_role.granted[_account] !=false,"This address already has this role");
        _role.granted[_account] = true;
    }
    function hasRole(Role storage _role,address _account) validAddress(_account) internal view returns(bool){
        return _role.granted[_account];
    }   
    function remove(Role storage _role, address _account) validAddress(_account)internal {
        require(_role.granted[_account] !=true,"");
        _role.granted[_account] = false;
  }
}