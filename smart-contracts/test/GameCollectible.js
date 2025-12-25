const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("GameCollectible", function () {
  it("mints and sets tokenURI", async function () {
    const [owner, player] = await ethers.getSigners();
    const GameCollectible = await ethers.getContractFactory("GameCollectible");
    const contract = await GameCollectible.deploy("GameCollectible", "GCARD", "ipfs://");
    await contract.deployed();

    const tx = await contract.safeMint(player.address, "ipfs://token-metadata");
    await tx.wait();

    expect(await contract.ownerOf(1)).to.equal(player.address);
    expect(await contract.tokenURI(1)).to.equal("ipfs://token-metadata");
  });
});
