const { expect } = require("chai");
const { ethers } = require("hardhat");

const deployContract = async (contractName) => {
	Token = await ethers.getContractFactory(contractName);
	token = await Token.deploy();
	await token.deployed();
	return token;
};

describe("Vault 1", () => {
	beforeEach(async () => {
		[owner] = await ethers.getSigners();

		token1 = await deployContract("Token");
		token2 = await deployContract("Token");
		vault1 = await deployContract("Vault1");

		await token1.approve(vault1.address, 500);
		await token2.approve(vault1.address, 20000);
	});

	describe("deposit", () => {
		it("deposit Token1", async () => {
			await vault1.deposit(token1.address, 250);
			expect(await vault1.balance(token1.address)).to.equal(250);
			expect(await token1.balanceOf(owner.address)).to.equal(750);
		});

		it("deposit a mix of Token1 and Token2", async () => {
			await vault1.deposit(token2.address, 500);
			await vault1.deposit(token1.address, 250);

			expect(await vault1.balance(token2.address)).to.equal(500);
			expect(await token2.balanceOf(owner.address)).to.equal(500);

			expect(await vault1.balance(token1.address)).to.equal(250);
			expect(await token1.balanceOf(owner.address)).to.equal(750);
		});

		it("deposit amount larger than approved", async () => {
			await vault1.deposit(token1.address, 500);
			await expect(vault1.deposit(token1.address, 250)).to.be.revertedWith("ERC20: insufficient allowance");
		});

		it("deposit amount larger than available", async () => {
			await expect(vault1.deposit(token1.address, 15000)).to.be.revertedWith("ERC20: insufficient allowance");
		});
	});

	describe("withdraw", () => {
		it("withdraw Token1", async () => {
			await vault1.deposit(token1.address, 500);
			await expect(vault1.withdraw(token1.address, 1000)).to.be.revertedWith("Balance too low");
			await vault1.withdraw(token1.address, 200);

			expect(await vault1.balance(token1.address)).to.equal(300);
			expect(await token1.balanceOf(owner.address)).to.equal(700);
		});

		it("withdraw Token2 which is not deposited", async () => {
			await expect(vault1.withdraw(token2.address, 1000)).to.be.revertedWith("Balance too low");
		});
	});
});
