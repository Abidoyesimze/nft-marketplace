import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import hre, {ethers} from "hardhat";

describe("Nftmarket", function(){
    let Nftmarket;
    let nftmarket;
    let owner;
    let addr1;
    let addr2;
  async function deployNftmarket(){
    const [owner, addr1, addr2] = await hre.ethers.getSigners();
     const Nftmarket = await hre.ethers.getContractFactory("Nftmarket");
    const nftmarket =  await Nftmarket.deploy();
    return {owner,addr1, addr2, nftmarket}
    
  }
  describe("mintNft", function(){
  it("should mint a new NFT", async function(){
   const {owner, addr1, addr2, nftmarket} = await loadFixture (deployNftmarket);
   await nftmarket.connect(owner).mintNft();
   expect (await nftmarket.ownerOf(1)).to.equal(owner.address);
  });
  //  it("should only allow owner to mint", async function(){
  //   const {owner, addr1, addr2, nftmarket} = await loadFixture (deployNftmarket);
  //   await nftmarket.connect(owner).mintNft();
  //   await expect(nftmarket.connect(addr1).mintNft()).to.be.revertedWith("Ownable:  caller is not the owner");
   
  // })
  })
  describe("listNft", function(){
    it("should check the owner of the NFT", async function(){
      const {owner, addr1, addr2, nftmarket} = await loadFixture (deployNftmarket);
      await nftmarket.connect(owner).mintNft();
      await nftmarket.connect(owner).approve(addr1.address, 1);
      await nftmarket.connect(owner).listNft(1, ethers.parseEther("1"));
      const listing = await nftmarket.listings(1);
      expect(listing.price).to.equal(ethers.parseEther("1"));
      expect(listing.seller).to.equal(owner.address);
    });
    it("Should not allow non-owner/non-approved to list NFT", async function(){
      const {owner, addr1, addr2, nftmarket} = await loadFixture (deployNftmarket);
      await nftmarket.connect(owner).mintNft();
      await nftmarket.connect(owner).approve(addr2.address, 1);
      await expect(nftmarket.connect(addr2).listNft(1, ethers.parseEther("1"))).to.be.revertedWith("Not owner or approved");
    })
  })
   
   describe("buyNft", function(){
    it("should allow buying listed NFT", async function(){
      const {owner, addr1, addr2, nftmarket} = await loadFixture (deployNftmarket);
      await nftmarket.connect(owner).mintNft();
      await nftmarket.connect(owner).listNft(1, ethers.parseEther("1"));
      await nftmarket.connect(addr1).buyNft(1, { value: ethers.parseEther("1") });
      expect(await nftmarket.ownerOf(1)).to.equal(addr1.address);
    });
    it("should not buying with insufficient funds", async function(){
      const {owner, addr1, addr2, nftmarket} = await loadFixture (deployNftmarket);
      await nftmarket.connect(owner).mintNft();
      await nftmarket.connect(owner).listNft(1, ethers.parseEther("1"));
      await expect(nftmarket.connect(addr1).buyNft(1, { value: ethers.parseEther("0.5") }))
        .to.be.revertedWith("Insufficient payment");
    });
   
   })
});
 



  

        