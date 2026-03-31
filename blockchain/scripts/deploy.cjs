// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
const hre = require("hardhat");

async function main() {
  console.log("Deploying DocumentVerification contract...");

  // Get the Contract Factory
  const DocumentVerification = await hre.ethers.getContractFactory("DocumentVerification");
  
  // Deploy it
  try {
    console.log("Starting deployment...");
    const contract = await DocumentVerification.deploy();
    console.log("Waiting for deployment transaction to be mined...");
    
    // This approach works with both older and newer versions of ethers
    let contractAddress;
    if (contract.address) {
      // Older ethers version
      contractAddress = contract.address;
    } else if (contract.getAddress) {
      // Newer ethers version
      contractAddress = await contract.getAddress();
    } else {
      // Fallback
      await contract.deployed();
      contractAddress = contract.address;
    }
    
    console.log(`DocumentVerification deployed to: ${contractAddress}`);
  } catch (error) {
    console.error("Error during deployment:", error);
    throw error;
  }
}

// Execute the deployment
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Deployment failed:", error);
    process.exit(1);
  }); 