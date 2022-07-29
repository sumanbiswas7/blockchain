// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract BasicNft is ERC721 {
    // storage variables
    uint256 private s_tokenId;
    string public constant TOKEN_URI =
        "ipfs://QmWdVnNGYaMVCwAfRbGEmkWJrKtgoGCPppU7AvnyUpGVH2?filename=cute-dog.json";

    constructor() ERC721("Dogie", "doge") {
        s_tokenId = 122323213199;
    }

    // functions
    function mintNft() public returns (uint256) {
        _safeMint(msg.sender, s_tokenId);
        s_tokenId++;
        return s_tokenId;
    }

    // view & pure functions
    function tokenURI() public pure returns (string memory) {
        return TOKEN_URI;
    }

    function getTokenId() public view returns (uint256) {
        return s_tokenId;
    }
}
