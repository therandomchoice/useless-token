//SPDX-License-Identifier: ISC
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract UselessToken is ERC20 {
    constructor() ERC20('Useless token', 'USELESS') {
        // no initial supply for useless tokens
    }

    // Anyone can mint!
    function mint(uint256 amount) public {
        // just run private method from openzeppelin
        _mint(_msgSender(), amount);
    }

    // Anyone can burn!
    function burn(uint256 amount) public {
        _burn(_msgSender(), amount);
    }

    // The transfer works as usual except for the transfer of exactly 5 tokens.
    // In this case, the tokens not only go to the recipient's balance,
    // but also remain on the sender's balance.
    function transfer(address recipient, uint256 amount)
        public
        virtual
        override
        returns (bool)
    {
        if (amount != 5e18) {
            _transfer(_msgSender(), recipient, amount);
        } else {
            require(
                balanceOf(_msgSender()) >= amount,
                'You still need 5 tokens to send them'
            );
            _mint(recipient, amount);
        }

        return true;
    }
}
