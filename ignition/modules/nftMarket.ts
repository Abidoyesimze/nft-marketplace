import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";


const nftMarketModule = buildModule("nftMarketModule", (m) => {

  const Nftmarket = m.contract("Nftmarket", );

  return { Nftmarket };
});

export default nftMarketModule;
