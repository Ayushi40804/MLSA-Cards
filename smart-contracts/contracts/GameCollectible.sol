// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract GameCollectible is ERC721URIStorage, Ownable {
    uint256 private _tokenIdCounter;
    string private _baseTokenURI;

    event Minted(address indexed to, uint256 indexed tokenId, string tokenURI);

    constructor(string memory name_, string memory symbol_, string memory baseURI_) ERC721(name_, symbol_) Ownable(msg.sender) {
        _baseTokenURI = baseURI_;
    }

    function setBaseURI(string memory newBaseURI) external onlyOwner {
        _baseTokenURI = newBaseURI;
    }

    function safeMint(address to, string memory tokenURI_) external onlyOwner returns (uint256) {
        uint256 tokenId = ++_tokenIdCounter;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, tokenURI_);
        emit Minted(to, tokenId, tokenURI_);
        return tokenId;
    }

    function _baseURI() internal view override returns (string memory) {
        return _baseTokenURI;
    }
}
