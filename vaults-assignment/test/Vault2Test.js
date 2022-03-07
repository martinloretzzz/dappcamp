const { expect } = require("chai");
const { ethers } = require("hardhat");

const parseEther = ethers.utils.parseEther;

describe("Vault 2", () => {
	beforeEach(async () => {
		Vault2 = await ethers.getContractFactory("Vault2");
		[owner] = await ethers.getSigners();
		vault2 = await Vault2.deploy();
		await vault2.deployed();
	});

	describe("mint", () => {
		it("minted tokens should be visible in the balance", async () => {
			expect(await vault2.balanceOf(owner.address)).to.equal("0");
			await vault2.mint(parseEther("2.0"), { value: parseEther("2.0") });
			expect(await vault2.balanceOf(owner.address)).to.equal(parseEther("2.0"));
		});

		it("should revert when invalid amount of ether is provided", async () => {
			await expect(vault2.mint(parseEther("2.0"), { value: parseEther("1.0") })).to.be.revertedWith(
				"Invalid ether amount"
			);
		});
	});

	describe("burn", () => {
		it("burned tokens should be reflected in the balance", async () => {
			await vault2.mint(parseEther("2.0"), { value: parseEther("2.0") });
			expect(await vault2.balanceOf(owner.address)).to.equal(parseEther("2.0"));
			await vault2.burn(parseEther("1.0"));
			expect(await vault2.balanceOf(owner.address)).to.equal(parseEther("1.0"));
		});

		it("should revert when more tokens are burned than on balance", async () => {
			await vault2.mint(parseEther("2.0"), { value: parseEther("2.0") });
			await expect(vault2.burn(parseEther("42.0"))).to.be.revertedWith("Token balance to low");
		});
	});
});
