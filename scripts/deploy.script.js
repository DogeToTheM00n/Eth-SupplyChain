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
  // console.log("farmer :",farmerSigner.address);
  // console.log("distributor :",distributorSigner.address);
  // console.log("retailer :",retailerSigner.address);
  // console.log("consumer :",consumerSigner.address);

  const Accessregistry = await ethers.getContractFactory("Accessregistry");
  const accessregistry = await Accessregistry.deploy();
  await accessregistry.deployed();

  // console.log("Accessregistry deployed to:", accessregistry.address);

  // CEO add board of directors
  await accessregistry.addOwner(BOD1.address);
  await accessregistry.addOwner(BOD2.address);
  await accessregistry.addOwner(BOD3.address);
  
  // console.log(await accessregistry.getOwnerCount());        // bigNumber :=3

  // console.log(await accessregistry.isOwner(BOD2.address));  // true
  // console.log(await accessregistry.isOwner(CEO.address));   // false

  const Multisigwallet =await ethers.getContractFactory("Multisigwallet");

  const multisigwallet = await Multisigwallet.deploy(accessregistry.address);
  await multisigwallet.deployed();

  // CEO funds multisigwallet with 8 ethers
  const params = { to: multisigwallet.address, value: getWei(8)};
  await CEO.sendTransaction(params);

  // console.log(await multisigwallet.getBalance());  // 8 ethers

  // await multisigwallet.connect(BOD1).proposeTransaction(farmerSigner.address,getWei(1),"0x00");
  // console.log(await multisigwallet.transactions(0));

  // await multisigwallet.connect(BOD1).confirmTransaction(0);
  // console.log(await multisigwallet.transactions(0));

  // await multisigwallet.connect(BOD2).confirmTransaction(0);
  // console.log(await multisigwallet.transactions(0));

  // console.log("Before farmer balance" ,await farmerSigner.getBalance()); // 10000 ethers
  // await multisigwallet.connect(BOD1).executeTransaction(0);
  // console.log(await multisigwallet.transactions(0)); 

  // console.log(await multisigwallet.getBalance());  // 7 ethers
  // console.log("After farmer balance",await farmerSigner.getBalance());  // 10001 ethers

  
  
  // //#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-
  // //#-#-#-#-#-#-#-#-#-#-#-#-#- Deploying PriceConsumerv3 -#-#-#-#-#-#-#-#-#-
  // //#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-

  // const PriceConsumerV3 =await ethers.getContractFactory("PriceConsumerV3")
  // const priceConsumerV3 = await PriceConsumerV3.deploy();
  // await priceConsumerV3.deployed();
  // console.log("PriceConsumer contract deployed at:", priceConsumerV3.address)
  // console.log(await priceConsumerV3.getLatestPrice());
  
  // returns 329679367296

  // Deploying supply chain contract
  const SupplyChainContract = await ethers.getContractFactory("Supplychain");
  const supplychain= await SupplyChainContract.deploy();
  supplychain.deployed();
  // console.log("Deploying supply chain contract at address ", supplychain.address);
  
  await supplychain.addFarmer(farmerSigner.address,"Rahul singh","Good farmer","62.265300","-6.697290");
  
  // // -------------------------- Deploying Entities ----------------------
  // //#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-
  // //#-#-#-#-#-#-#-#-#-#-#-#-#- Deploying Farmer -#-#-#-#-#-#-#-#-#-#-#-#-
  // //#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-



  const Farmer =await ethers.getContractFactory("FarmerRole")
  const farmer = await Farmer.deploy();
  await farmer.deployed();
  // console.log("Farmer Role contract is deployed at :", farmer.address);

  // console.log("First called",await farmer.isFarmer(farmerSigner.address));
  
  
  // //#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-
  // //#-#-#-#-#-#-#-#-#-#-#-#-#- Deploying Distributor -#-#-#-#-#-#-#-#-#-#-#-#-
  // //#-#-#-#-#-#-#-#-#-#-#- and Tx.data for helper function -#-#-#-#-#-#-#-#-#-#-#-#-
  // //#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-
  
  
  const Distributor =await ethers.getContractFactory("DistributorRole")
  const distributor = await Distributor.deploy();
  await distributor.deployed();

  await supplychain.setMultisigwalletAddress(multisigwallet.address);
  
  const Helper =await ethers.getContractFactory("Helper")
  const helper = await Helper.deploy();
  await helper.deployed();

  // console.log("Distributor Role contract is deployed at :", distributor.address);
  // console.log("Helper contract is deployed at :", helper.address);
  
  // Add distributorSigner as a distributor
  const result =await helper.getData(distributorSigner.address);   
  const blue =await multisigwallet.connect(BOD1).proposeTransaction(supplychain.address,"0",result);
  await blue.wait();                                                                                                 
  
  // console.log(await multisigwallet.transactions(0));
  
  await multisigwallet.connect(BOD1).confirmTransaction(0);
  await multisigwallet.connect(BOD2).confirmTransaction(0); 

  // console.log("Blue",await distributor.isDistributor(distributorSigner.address));  // true
  const result2 =await multisigwallet.connect(BOD1).executeTransaction(0);
  // console.log("Green",await distributor.isDistributor(distributorSigner.address));  // true

  // console.log(await multisigwallet.transactions(0)); 
  
  
  
  
  //-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-
  //-#-#-#-#-#-#-#-#-#-#-#-#-#- Deploying RetailerRole -#-#-#-#-#-#-#-#-#-#-#-#-
  //-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-
  
  const Retailer =await ethers.getContractFactory("RetailerRole")
  const retailer = await Retailer.deploy();
  await retailer.deployed();
  // console.log("Retailer Role contract is deployed at :", retailer.address);
  
  await supplychain.addRetailer(retailerSigner.address);
  // console.log(await retailer.isRetailer(retailerSigner.address));
  
  
  
  
  //  //#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-
  // //#-#-#-#-#-#-#-#-#-#-#-#-#- Deploying Consumer -#-#-#-#-#-#-#-#-#-#-#-#-
  //  //#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-
  

  const Consumer =await ethers.getContractFactory("ConsumerRole")
  const consumer = await Consumer.deploy();
  await consumer.deployed();
  // console.log("Consumer Role contract is deployed at :", consumer.address);
  
  await supplychain.addConsumer(consumerSigner.address);
  // console.log(await consumer.isConsumer(consumerSigner.address));

  
  
  //#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-
  //#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-

  
  //-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-
  //-#-#-#-#-#-#-#-#-#-#-#-#-Testing smart contracts-#-#-#-#-#-#-#-#-#-#-#-#-#-
  //-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-

  // Farmer produce food Item

  // console.log((await (await farmer.isFarmer(CEO.address)).wait()).events[0].args);
  // console.log((await (await farmer.isFarmer(farmerSigner.address)).wait()).events[0].args);
  // console.log((await (await farmer.isFarmer(BOD2.address)).wait()).events[0].args);

  // NOTE TO SELF: Not working for farmerSigner but working works perfectly fine for CEO entity
  // console.log(await farmer.isFarmer(farmerSigner.address));
  const tx =await supplychain.connect(farmerSigner).produceItemByFarmer(1,"40 kg fresh tomatos",120,"0x00");

  // console.log(((await tx.wait()).events[0].args))

  // Distributor request to buy food Item from farmer

  // console.log(await distributor.isDistributor(CEO.address));
  // console.log(await distributor.isDistributor(distributorSigner.address));
  // console.log(await supplychain.isDistributor(distributorSigner.address));
  // console.log(await distributor.isDistributor(BOD2.address));

  const tx2 = await supplychain.connect(distributorSigner).purchaseItemByDistributor(1,{value: 130});
  // console.log(((await tx2.wait()).events[0].args));

  // 0x9965507d1a55bcc2695c58ba16fb37d819b0a4dc
  // 0x9965507d1a55bcc2695c58ba16fb37d819b0a4dc

  // Distributor sells food item
  const tx3 =await supplychain.connect(distributorSigner).sellItemByDistributor(1,230);
  // console.log(((await tx3.wait()).events[0].args));

  // Retailer purchase food item from distributor
  const tx4 =await supplychain.connect(retailerSigner).purchaseItemByRetailer(1,{value:235});
  // console.log(((await tx4.wait()).events[0].args));

  // Retailer sell food item
  const tx5 =await supplychain.connect(retailerSigner).processedAndPackagedItemByRetailer(1,10);
  // console.log(((await tx5.wait()).events[0].args));

  // Retailer sell food item
  const tx6 =await supplychain.connect(retailerSigner).sellItemByRetailer(1,260); 
  console.log(((await tx6.wait()).events[0].args));

  // Consumer purchases food item
  const tx7 =await supplychain.connect(consumerSigner).purchaseItemByConsumer(1,{value: 260});
  console.log(((await tx7.wait()).events[0].args));
  

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
