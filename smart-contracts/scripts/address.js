const hre = require("hardhat");

async function main() {
  const accounts = await hre.ethers.getSigners();
  console.log("Signer address:", accounts[0].address);
}

main().catch((e) => { console.error(e); process.exitCode = 1; });
