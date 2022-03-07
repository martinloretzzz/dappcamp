//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Vault2 is ERC20 {
    constructor() ERC20("VAULT", "VAULT") {}

    // `function mint(_amount)` - A payable function which should take ether and mint equal amount of `VAULT` tokens.
    function mint(uint256 amount) public payable {
        require(msg.value == amount, "Invalid ether amount");
        _mint(msg.sender, msg.value);
    }

    // `function burn(_amount)` - Should allow users to burn their tokens and get equal amount of ether back.
    function burn(uint256 amount) public {
        require(balanceOf(msg.sender) >= amount, "Token balance to low");
        _burn(msg.sender, amount);
        payable(msg.sender).transfer(amount);
    }
}
