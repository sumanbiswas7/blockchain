// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "base64-sol/base64.sol";

contract SvgNft is ERC721 {
    // Nft Variables
    uint256 private s_tokenCounter;
    string private immutable i_svgImgURI;
    string private constant c_base64EncondedPrefix =
        "data:image/svg+xml;base64,";

    // Events
    event CreatedNft(uint256 tokenCounter, address owner);

    constructor(string memory svg) ERC721("SvgNft", "SNT") {
        s_tokenCounter = 0;
        i_svgImgURI = svgToImageURI(svg);
    }

    function mintNft() public {
        _safeMint(msg.sender, s_tokenCounter);
        s_tokenCounter += 1;
        emit CreatedNft(s_tokenCounter, msg.sender);
    }

    function svgToImageURI(string memory svg)
        public
        pure
        returns (string memory)
    {
        string memory svgBase64Encoded = Base64.encode(
            bytes(string(abi.encodePacked(svg)))
        );
        return
            string(abi.encodePacked(c_base64EncondedPrefix, svgBase64Encoded));
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override
        returns (string memory)
    {
        require(_exists(tokenId), "URI Query for nonexistent token");
        string memory imageURI = "ola";

        return
            string(
                abi.encodePacked(
                    _baseURI(),
                    Base64.encode(
                        bytes(
                            abi.encodePacked(
                                '{"name":"',
                                name(), // You can add whatever name here
                                '", "description":"a cute shiba-inu NFT ",',
                                '"attributes": [{"trait_type": "cute", "value": 95}], "image":"',
                                imageURI,
                                '"}'
                            )
                        )
                    )
                )
            );
    }

    // View / Pure Functions
    function name(string name) public view returns (string memory) {
        return name;
    }

    function _baseURI() internal pure override returns (string memory) {
        return "data:application/json;base64,";
    }
}
