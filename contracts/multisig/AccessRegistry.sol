// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
contract Accessregistry{

    using SafeMath for uint256;

    event OwnerAdded(address indexed owner);
    event OwnerRemoved(address indexed owner);
    event TransferOwner(address indexed from, address indexed to);

    address admin;

    address[] public owners;

    mapping(address =>bool) public isOwner; 
    uint256 public MINIMUM_CONFIRMATIONS;


    modifier onlyAdmin(){
        require(msg.sender ==admin, "Only admin can call");
        _;
    }

    constructor(){
        admin =msg.sender;
    }

    function changeAdmin(address _admin) public onlyAdmin{
        admin  =_admin;
    }

    function getOwnerCount() public view returns(uint){
        return owners.length;    
    }

    // Only admin add a new owner to the multisig Wallet
    function addOwner(address _owner) public onlyAdmin{
        require(address(_owner)==_owner,"Invalid address");
        require(isOwner[_owner]==false,"Address already owner");
        owners.push(_owner);
        isOwner[_owner]= true;

        if((owners.length*6)%10 ==0){
            MINIMUM_CONFIRMATIONS =(owners.length*6)/10;
        }else{
            MINIMUM_CONFIRMATIONS =((owners.length*6)/10).add(1);
        }
        emit OwnerAdded(_owner);
    }

    // Only admin delete already existing owner from the multisig Wallet
    function revokeOwner(address _owner) public onlyAdmin{
        require(address(_owner)==_owner,"Invalid address");
        require(isOwner[_owner]==true,"Address not an owner");
        
        bool temp =false;
        for(uint i=0; i<owners.length; i++){
            if(temp){
                owners[i-1] =owners[i];
            }
            if(owners[i]== _owner){
                delete owners[i];
                temp =true;
            }
        } 
        delete owners[owners.length-1];
        isOwner[_owner]= false;
        owners.pop();

        if((owners.length*6)%10 ==0){
            MINIMUM_CONFIRMATIONS =(owners.length*6)/10;
        }else{
            MINIMUM_CONFIRMATIONS =((owners.length*6)/10).add(1);
        }
        emit OwnerRemoved(_owner);
    }

    // Only admin replaces an owner `_from` with another `_to`.
    function transferOwner(address _from, address _to) public onlyAdmin{
        require(address(_from)==_from,"Invalid from address");
        require(address(_to)==_to,"Invalid to address");

        require(isOwner[_from]==true,"from address is not an owner");
        require(isOwner[_to]==false,"to address is already an owner");

        for(uint i=0; i<owners.length; i++){
            if(owners[i]== _from){
                delete owners[i];
                owners[i] =_to;
                break;
            }
        } 
        emit TransferOwner(_from,_to);
    }
}
