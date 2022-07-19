// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.8;

import "./PriceConverter.sol";

contract FundMe {
    using PriceConverter for uint256;
    mapping(address => uint256) public funders;
    address public immutable i_owner;
    uint256 public constant MINIMUM_USD = 10 * 10**18;
    uint256 public balance = address(this).balance;

    // 20000000000000000 minimum wei

    constructor() {
        i_owner = msg.sender;
    }

    function fund() public payable {
        require(
            msg.value.getConversionRate() >= MINIMUM_USD,
            "You need to send more"
        );
        funders[msg.sender] += msg.value;
    }

    function withdraw() public payable {
        require(msg.sender == i_owner, "You can't withdraw");
        funders[msg.sender] -= msg.value;

        // payable(msg.sender).transfer(address(this).balance);
        // bool sendSuccess = payable(msg.sender).send(address(this).balance);
        // require(sendSuccess, "Send failed");

        (bool callSuccess, ) = payable(msg.sender).call{
            value: address(this).balance
        }("");
        require(callSuccess, "Call failed");
    }

    fallback() external payable {
        fund();
    }

    receive() external payable {
        fund();
    }
}
