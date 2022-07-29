// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";

// Errors
error RandomNFT__RandomBreedError();
error RandomNFT__LowPriceError(uint256 mintFee);
error RandomNFT__WithdrawError();

contract RandomNft is VRFConsumerBaseV2, ERC721URIStorage, Ownable {
    // Enums
    enum Breed {
        SHIBA_INU,
        HUSKY,
        BULLDOG
    }

    // Events
    event NftMinted(Breed breed, address minter);
    event NftRequested(uint256 requestId, address requester);

    // Chainlink VRF variables
    VRFCoordinatorV2Interface private immutable i_vrfCoordinator;
    uint64 private immutable i_subscriptionId;
    bytes32 private immutable i_gasLane;
    uint32 private immutable i_callbackGasLimit;
    uint32 private constant c_numWords = 1;
    uint16 private constant c_requestConfirmations = 3;

    // VRF helpers
    mapping(uint256 => address) public s_requestIdToSender;

    // NFT variables
    uint256 public s_tokenCounter;
    string[] internal s_dogTokenUris;
    uint256 private immutable i_mintFee;

    constructor(
        address vrfCoordinatorV2,
        uint64 subscriptionId,
        bytes32 gasLane,
        uint32 callbackGasLimit,
        string[] memory dogTokenUris,
        uint256 mintFee
    ) VRFConsumerBaseV2(vrfCoordinatorV2) ERC721("RandomNFT", "IRN") {
        i_vrfCoordinator = VRFCoordinatorV2Interface(vrfCoordinatorV2);
        i_subscriptionId = subscriptionId;
        i_gasLane = gasLane;
        i_callbackGasLimit = callbackGasLimit;
        s_dogTokenUris = dogTokenUris;
        i_mintFee = mintFee;
        s_tokenCounter = 0;
    }

    function requestNft() public payable returns (uint256 requestId) {
        if (msg.value < i_mintFee) revert RandomNFT__LowPriceError(i_mintFee);
        requestId = i_vrfCoordinator.requestRandomWords(
            i_gasLane,
            i_subscriptionId,
            c_requestConfirmations,
            i_callbackGasLimit,
            c_numWords
        );
        s_requestIdToSender[requestId] = msg.sender;
        emit NftRequested(requestId, msg.sender);
    }

    function fulfillRandomWords(uint256 requestId, uint256[] memory randomWords)
        internal
        override
    {
        address nftOwner = s_requestIdToSender[requestId];
        uint256 tokenId = s_tokenCounter;

        uint256 rng = randomWords[0] % 100;
        Breed dogBreed = getDogBreedFromRng(rng);
        s_tokenCounter++;
        _safeMint(nftOwner, tokenId);
        _setTokenURI(tokenId, s_dogTokenUris[uint256(dogBreed)]);
        emit NftMinted(dogBreed, nftOwner);
    }

    function getDogBreedFromRng(uint256 chanceNum)
        private
        pure
        returns (Breed)
    {
        uint256 cumulativeSum = 0;
        uint8[3] memory chanceArray = getChanceArray();

        for (uint8 i = 0; i < chanceArray.length; i++) {
            if (
                chanceNum >= cumulativeSum &&
                chanceNum < cumulativeSum + chanceArray[i]
            ) {
                return Breed(i);
            }
            cumulativeSum += chanceArray[i];
        }
        revert RandomNFT__RandomBreedError();
    }

    function withdraw() public onlyOwner {
        uint256 amount = address(this).balance;
        (bool sucess, ) = payable(msg.sender).call{value: amount}("");
        if (!sucess) revert RandomNFT__WithdrawError();
    }

    // Pure / Getter functions
    function getChanceArray() public pure returns (uint8[3] memory) {
        return [10, 40, 100];
    }

    function getMintFee() public view returns (uint256) {
        return i_mintFee;
    }

    function getDogUris(uint256 index) public view returns (string memory) {
        return s_dogTokenUris[index];
    }

    function getTokenId() public view returns (uint256) {
        return s_tokenCounter;
    }
}
