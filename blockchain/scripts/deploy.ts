import { ethers } from "hardhat";

async function main() {
  console.log("Deploying DocumentVerification contract...");

  const DocumentVerification = await ethers.getContractFactory("DocumentVerification");
  const documentVerification = await DocumentVerification.deploy();

  await documentVerification.deployed();

  console.log("DocumentVerification deployed to:", documentVerification.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 