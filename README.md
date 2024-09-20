NFT Marketplace Smart Contract
This project implements a simple NFT (Non-Fungible Token) marketplace smart contract on the Ethereum blockchain. The contract allows for minting, listing, and selling of NFTs.
Features

Mint new NFTs (restricted to contract owner)
List NFTs for sale
Purchase listed NFTs
Built on the ERC721 standard

Technologies Used

Solidity ^0.8.24
OpenZeppelin Contracts (ERC721, Ownable)

Prerequisites

Node.js and npm
Hardhat (for compilation and deployment)
An Ethereum wallet (e.g., MetaMask)

Setup

Clone the repository:
Copygit clone [repository-url]
cd nft-marketplace

Install dependencies:
npm install

Compile the contract:
npx hardhat compile


Deployment
Deploy the contract:
Deployed to Lisk-sepolia network.
npx hardhat deploy ignition/nftMarket.ts --network 

Note the deployed contract address for future interactions.

Contract Functions
mintNft()
Mints a new NFT. Can only be called by the contract owner.
listNft(uint256 tokenId, uint256 price)
Lists an NFT for sale. Can only be called by the token owner or an approved address.
buyNft(uint256 tokenId)
Purchases a listed NFT. The buyer must send the correct amount of Ether with the transaction.
Events

NFTMinted(uint256 tokenId, address owner)
NFTListed(uint256 tokenId, uint256 price, address owner)
NFTSold(uint256 tokenId, uint256 price, address buyer, address seller)

Security Considerations

This contract has not been audited. Use at your own risk.
Ensure proper access control when interacting with the contract.
Always verify the price and details of an NFT before purchasing.

Future Improvements

Implement royalties for original creators
Add auction functionality
Integrate with a decentralized file storage system for NFT metadata

