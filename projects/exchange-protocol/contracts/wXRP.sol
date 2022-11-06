// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract wXRP is ERC20 {
    constructor() ERC20("Wrapped XRP", "wXRP") {}

    function mint() external payable {
        _mint(msg.sender, msg.value);
    }

    function burn(uint256 _amount) external {
        require(balanceOf(msg.sender) >= _amount, "Insufficient balance");
        _burn(msg.sender, _amount);
    }
}