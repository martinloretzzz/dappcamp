const { expect, assert } = require("chai");
const { ethers } = require("hardhat");

describe("Example1", function () {
  const BASE_GAS = 202000;
  
  it("should have correct values of day, amount and ownerAddr defined", async function () {
    const Example = await ethers.getContractFactory("Example1");
    const example = await Example.deploy();
    
    await example.deployed();
    
    const day = await example.day();
    const amount = await example.amount();
    const ownerAddr = await example.ownerAddr();

    expect(day).to.equal(10);
    expect(amount).to.equal(1000);
    expect(ownerAddr).to.equal("0x4e653b730367e303D30d8FB39d7350D07a60dfD6");
  });

  it("should pass the gas test", async function() {
    const Example = await ethers.getContractFactory("Example1");
    const example = await Example.deploy();

    const gasLimit = example.deployTransaction.gasLimit;
    assert(gasLimit < BASE_GAS);
  });
});
