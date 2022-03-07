const { expect, assert } = require("chai");
const { ethers } = require("hardhat");

describe("Example2", function () {
  const BASE_GAS = 48000;
  let example;

  const arr = [3, 5, 7, 9, 12, 31];
  const sum = arr.reduce((a, b) => a + b, 0);

  beforeEach("deploy contract", async () => {
    const Example = await ethers.getContractFactory("Example2");
    example = await Example.deploy();
    
    await example.deployed();
  });

  it("should have correct value of counter after function call", async function () {
    let prevCounter = await example.counter();
    example.incrementBy(arr);

    const currCounter = await example.counter();

    expect(currCounter).to.equal(prevCounter + sum);
  });

  it("should pass the gas test", async function() {
    const currentGas = (await example.estimateGas.incrementBy(arr)).toNumber();
    assert(currentGas < BASE_GAS);
  });
});
