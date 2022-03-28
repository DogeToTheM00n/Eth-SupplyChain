const {ethers} = require("hardhat");


//  Helper function to convert ether to wei
//  10^18 wei == 1 ether
function getWei(ether){
  return ethers.utils.parseUnits(ether.toString(), "ether").toHexString();
}

async function main() {
  const [CEO,BOD1, BOD2, BOD3, farmerSigner, distributorSigner,retailerSigner,consumerSigner] =await ethers.getSigners();
  
  // console.log("CEO :",CEO.address);
  // console.log("BOD1 :",BOD1.address);
  // console.log("BOD2 :",BOD2.address);
  // console.log("BOD3 :",BOD3.address);
  // console.log("farmer :",farmer.address);
  // console.log("distributor :",distributor.address);
  // console.log("retailer :",retailer.address);
  // console.log("consumer :",consumer.address);

  const Accessregistry = await ethers.getContractFactory("Accessregistry");
  const accessregistry = await Accessregistry.deploy();
  await accessregistry.deployed();

  // console.log("Accessregistry deployed to:", accessregistry.address);

  // CEO add board of directors
  await accessregistry.addOwner(BOD1.address);
  await accessregistry.addOwner(BOD2.address);
  await accessregistry.addOwner(BOD3.address);
  
  // console.log(await accessregistry.getOwnerCount());         // bigNumber :=3

  // console.log(await accessregistry.isOwner(BOD2.address));  //true
  // console.log(await accessregistry.isOwner(CEO.address));   //false

  const Multisigwallet =await ethers.getContractFactory("Multisigwallet");

  const multisigwallet = await Multisigwallet.deploy(accessregistry.address);
  await multisigwallet.deployed();

  // CEO funds multisigwallet with 8 ethers
  const params = { to: multisigwallet.address, value: getWei(8)};
  await CEO.sendTransaction(params);

  // console.log(await multisigwallet.getBalance());  // 8 ethers

  await multisigwallet.connect(BOD1).proposeTransaction(farmerSigner.address,getWei(1),"0x00");
  // console.log(await multisigwallet.transactions(0));

  await multisigwallet.connect(BOD1).confirmTransaction(0);
  // console.log(await multisigwallet.transactions(0));

  await multisigwallet.connect(BOD2).confirmTransaction(0);
  // console.log(await multisigwallet.transactions(0));

  // console.log("Before farmer balance" ,await farmer.getBalance()); // 10000 ethers
  await multisigwallet.connect(BOD1).executeTransaction(0);
  // console.log(await multisigwallet.transactions(0)); 

  // console.log(await multisigwallet.getBalance());  // 7 ethers
  // console.log("After farmer balance",await farmer.getBalance());  // 10001 ethers

  
  
  //#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-
  //#-#-#-#-#-#-#-#-#-#-#-#-#- Deploying PriceConsumerv3 -#-#-#-#-#-#-#-#-#-
  //#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-

  // const PriceConsumerV3 =await ethers.getContractFactory("PriceConsumerV3")
  // const priceConsumerV3 = await PriceConsumerV3.deploy();
  // priceConsumerV3.deployed();

  // returns 329679367296

  // -------------------------- Deploying Entities ----------------------
  //#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-
  //#-#-#-#-#-#-#-#-#-#-#-#-#- Deploying Farmer -#-#-#-#-#-#-#-#-#-#-#-#-
  //#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-



  const Farmer =await ethers.getContractFactory("FarmerRole")
  const farmer = await Farmer.deploy();
  await farmer.deployed();
  // console.log("Farmer Role contract is deployed at :", farmer.address);

  await farmer.addFarmer(farmerSigner.address);
  // console.log(await farmer.isFarmer(farmerSigner.address));


  
  //#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-
  //#-#-#-#-#-#-#-#-#-#-#-#-#- Deploying Distributor -#-#-#-#-#-#-#-#-#-#-#-#-
  //#-#-#-#-#-#-#-#-#-#-#- and Tx.data for helper function -#-#-#-#-#-#-#-#-#-#-#-#-
  //#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-



  const Distributor =await ethers.getContractFactory("DistributorRole")
  const distributor = await Distributor.deploy();
  await distributor.deployed();
  await distributor.setMultisigwalletAddress(multisigwallet.address);

  const Helper =await ethers.getContractFactory("Helper")
  const helper = await Helper.deploy();
  await helper.deployed();

  // console.log("Distributor Role contract is deployed at :", distributor.address);
  // console.log("Helper contract is deployed at :", helper.address);

  // Add distributorSigner as a distributor
  const result = await helper.getData(distributorSigner.address);
  // console.log(result);
  const blue =await multisigwallet.connect(BOD1).proposeTransaction(distributor.address,"0",result);
  // console.log(await blue.wait());
  // console.log(await multisigwallet.transactions(1));

  await multisigwallet.connect(BOD1).confirmTransaction(1);
  await multisigwallet.connect(BOD2).confirmTransaction(1);
  await multisigwallet.connect(BOD1).executeTransaction(1);
  // console.log(await multisigwallet.transactions(1)); 

  // console.log(await distributor.isDistributor(distributorSigner.address));  // true
  


   //#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-
  //#-#-#-#-#-#-#-#-#-#-#-#-#- Deploying RetailerRole -#-#-#-#-#-#-#-#-#-#-#-#-
   //#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-


  const Retailer =await ethers.getContractFactory("RetailerRole")
  const retailer = await Retailer.deploy();
  await retailer.deployed();
  // console.log("Retailer Role contract is deployed at :", retailer.address);
  
  await retailer.addRetailer(retailerSigner.address);
  // console.log(await retailer.isRetailer(retailerSigner.address));
  



   //#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-
  //#-#-#-#-#-#-#-#-#-#-#-#-#- Deploying Consumer -#-#-#-#-#-#-#-#-#-#-#-#-
   //#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-


  const Consumer =await ethers.getContractFactory("ConsumerRole")
  const consumer = await Consumer.deploy();
  await consumer.deployed();
  // console.log("Consumer Role contract is deployed at :", consumer.address);
  
  await consumer.addConsumer(consumerSigner.address);
  // console.log(await consumer.isConsumer(consumerSigner.address));



   //#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-
   //#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-

  // Deploying supply chain contract
  const SupplyChainContract = await ethers.getContractFactory("Supplychain");
  const supplychain= await SupplyChainContract.deploy();
  supplychain.deployed();
  // console.log("Deploying supply chain contract at address ", supplychain.address);




  //-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-
  //-#-#-#-#-#-#-#-#-#-#-#-#-Testing smart contracts-#-#-#-#-#-#-#-#-#-#-#-#-#-
  //-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-

  // Farmer produce food Item

  // console.log((await (await farmer.isFarmer(CEO.address)).wait()).events[0].args);
  // console.log((await (await farmer.isFarmer(farmerSigner.address)).wait()).events[0].args);
  // console.log((await (await farmer.isFarmer(BOD2.address)).wait()).events[0].args);

  // Why the f , this not working for farmerSigner but working works perfectly fine for CEO entity
  const tx =await supplychain.connect(CEO).produceItemByFarmer(
            1,
            "Rajesh kumar",
            "Good farner",
            "44 48 01.5",
            "21 33 04.19",
            "40 kg fresh tomatos",
            120,
            "0x00",
            );
  // console.log(((await tx.wait()).events[0].args))

  // Farmer sell Item
  const tx2 = await supplychain.connect(CEO).sellItemByFarmer(1,150);
  // console.log(((await tx2.wait()).events[0].args))

  // Distributor request to buy food Item from farmer
  // console.log(await distributor.isDistributor(CEO.address));
  // console.log(await distributor.isDistributor(distributorSigner.address));
  // console.log(await distributor.isDistributor(BOD2.address));

  const tx3 = await supplychain.connect(CEO).purchaseItemByDistributor(1,{value: 200});
  // console.log(((await tx3.wait()).events[0].args));

  // Farmer ship the food item
  const tx4 = await supplychain.connect(CEO).shippedItemByFarmer(1);
  // console.log(((await tx4.wait()).events[0].args));

  // Distributor on receiving food item
  const tx5 =await supplychain.connect(CEO).receivedItemByDistributor(1);
  // console.log(((await tx5.wait()).events[0].args));

  // Distributor process  food item
  const tx6 =await supplychain.connect(CEO).processedItemByDistributor(1,6);
  // console.log(((await tx6.wait()).events[0].args));

  // Distributor packages food item
  const tx7 =await supplychain.connect(CEO).packageItemByDistributor(1);
  // console.log(((await tx7.wait()).events[0].args));
  
  //  Distributor sells food item
  const tx8 =await supplychain.connect(CEO).sellItemByDistributor(1,230);
  // console.log(((await tx8.wait()).events[0].args));

  //  Retailer purchase food item from distributor
  const tx9 =await supplychain.connect(CEO).purchaseItemByRetailer(1,{value:235});
  // console.log(((await tx9.wait()).events[0].args));
  
  //  Distributor ship packages food item
  const tx10 =await supplychain.connect(CEO).shippedItemByDistributor(1);
  // console.log(((await tx10.wait()).events[0].args));

  //  Retailer receives food item
  const tx11 =await supplychain.connect(CEO).receivedItemByRetailer(1);
  // console.log(((await tx11.wait()).events[0].args));

  //  Retailer sell food item
  const tx12 =await supplychain.connect(CEO).sellItemByRetailer(1,260);
  // console.log(((await tx12.wait()).events[0].args));

  //  Consumer purchases food item
  const tx13 =await supplychain.connect(CEO).purchaseItemByConsumer(1,{value: 260});
  // console.log(((await tx13.wait()).events[0].args));
  

  // console.log(await supplychain.connect(CEO).fetchItemBufferOne(1));
  // console.log(await supplychain.connect(CEO).fetchItemBufferTwo(1));
  // console.log(await supplychain.connect(CEO).fetchitemHistory(1));
  
  // const anEthersProvider = new ethers.providers.Web3Provider(network.provider)
  // console.log((await anEthersProvider.getBlock(27)).transactions);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
