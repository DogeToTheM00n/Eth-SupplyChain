# Hardhat project for supply chain management on Ploygon. 

## Contracts directory structure
```
.
|-- Greeter.sol
|-- Supplychain.sol
|-- accesscontrol
|   |-- ConsumerRole.sol
|   |-- DistributorRole.sol
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

3 directories, 12 files

```

Deploy AccessRegistry contract <br></br>
Deployer (admin) -> CEO of the company.<br></br>
CEO -> Add, Revoke, Transfer Ownership of board of directors (owners of multisig wallet) <br></br>
Update address of AccessRegistry contract in Multisigwallet contract (line 30) <br></br>
Deploy Multisigwallet contract <br></br>
Owner of multisig wallet -> board of directors <br></br>
BOD -> proposeTransaction, confirmTransaction, executeTransaction, revokeConfirmation<br></br>
Min 60% of directors need to agree for a decision to be made.<br></br>
Decision -> whether to add distributor `k` in our channel or not. <br></br>
