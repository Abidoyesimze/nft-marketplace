// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Nftmarket is ERC721, Ownable(msg.sender) {
    uint256 private _nextTokenId;
    

    struct Listing {
        uint256 price;
        address seller;
    }

    mapping(uint256 => Listing) public listings;

    event NFTMinted(uint256 tokenId, address owner);
    event NFTListed(uint256 tokenId, uint256 price, address owner);
    event NFTSold(uint256 tokenId, uint256 price, address buyer, address seller);

    constructor() ERC721("Nftmarket", "NFTM") {
        _nextTokenId = 1;
    }

    function mintNft() public onlyOwner returns (uint256) {
        uint256 tokenId = _nextTokenId;
        _safeMint(msg.sender, tokenId);
        _nextTokenId++;
        emit NFTMinted(tokenId, msg.sender);
        return tokenId;
    }

    function listNft(uint256 tokenId, uint256 price) public {
        // Ensure the sender is the owner of the NFT or has been approved to manage it
        require(ownerOf(tokenId) == msg.sender, "Not owner or approved");
        require(price > 0, "Price must be greater than zero");

        listings[tokenId] = Listing(price, msg.sender);
        emit NFTListed(tokenId, price, msg.sender);
    }

    function buyNft(uint256 tokenId) public payable {
        Listing memory listing = listings[tokenId];
        require(listing.price > 0, "NFT not for sale");
        require(msg.value >= listing.price, "Insufficient payment");

        // Delete listing first to avoid reentrancy attacks
        delete listings[tokenId];

        // Transfer the NFT
        _transfer(listing.seller, msg.sender, tokenId);

        // Pay the seller
        payable(listing.seller).transfer(listing.price);

        // Emit sale event
        emit NFTSold(tokenId, listing.price, msg.sender, listing.seller);

        // Refund overpayment, if any
        if (msg.value > listing.price) {
            payable(msg.sender).transfer(msg.value - listing.price);
        }
    }
}
