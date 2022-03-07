const { expect, assert } = require("chai");
const { ethers } = require("hardhat");

describe("Example3", function () {
  const BASE_GAS = 25000;
  let example;

  const amount = 100;

  beforeEach("deploy contract", async () => {
    const Example = await ethers.getContractFactory("Example3");
    example = await Example.deploy();
    
    await example.deployed();
  });

  it("should return correct values for sender and owner amounts", async function () {
    let amountForSender;
    let amountForOwner;

    const result = await example.getOwnerMargin(amount);
    amountForSender = result.amountForSender.toNumber();
    amountForOwner = result.amountForOwner.toNumber();

    expect(amountForOwner).to.equal(30);
    expect(amountForSender).to.equal(70);
  });

  it("should pass the gas test", async function() {
    const currentGas = (await example.estimateGas.getOwnerMargin(amount)).toNumber();
    assert(currentGas < BASE_GAS);
  });
});
