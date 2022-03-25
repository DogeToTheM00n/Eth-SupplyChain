# Hardhat project for supply chain management on Ethereum. 

## Contracts directory structure
```
.
|-- Greeter.sol
|-- accesscontrol
|   |-- ConsumerRole.sol
|   |-- Distributor.sol
|   |-- FarmerRole.sol
|   |-- RetailerRole.sol
|   `-- Roles.library.sol
|-- multisig
|   |-- AccessRegistry.sol
|   `-- Multisigwallet.sol
`-- utils
    |-- Context.sol
    |-- Ownable.sol
    `-- Tx.data.sol

3 directories, 11 files

```

Deploy AccessRegistry contract
Deployer (admin) -> CEO of the company.

CEO -> Add, Revoke, Transfer Ownership of board of directors (owners of multisig wallet)

Update address of AccessRegistry contract in Multisigwallet contract (line 30)
Deploy Multisigwallet contract

owner of multisig wallet -> board of directors 
BOD -> proposeTransaction, confirmTransaction, executeTransaction, revokeConfirmation
Min 60% of directors need to agree for a decision to be made.
decision -> whether to add distributor `k` in our channel or not.