//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Token is ERC20("TOKEN", "TOKN") {
    constructor() {
        _mint(msg.sender, 1000);
    }
}

contract Vault1 {
    mapping(address => mapping(address => uint256)) balances; // user => token => amount

    function balance(address tokenAddress) public view returns (uint256) {
        return balances[msg.sender][tokenAddress];
    }

    // `function deposit(_amount)` - Should take in deposit amount. Assume that the contract is pre-approved to transfer that amount
    function deposit(address tokenAddress, uint256 amount) public {
        IERC20(tokenAddress).transferFrom(msg.sender, address(this), amount);
        balances[msg.sender][tokenAddress] += amount;
    }

    // `function withdraw(_amount)` - Should allow users to withdraw amount lesser than or equal to what they have deposited
    function withdraw(address tokenAddress, uint256 amount) public {
        require(
            balances[msg.sender][tokenAddress] >= amount,
            "Balance too low"
        );
        IERC20(tokenAddress).transfer(msg.sender, amount);
        balances[msg.sender][tokenAddress] -= amount;
    }
}
