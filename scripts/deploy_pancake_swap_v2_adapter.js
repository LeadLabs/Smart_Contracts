const { ethers, network } = require("hardhat");
const path = require("path");
const fs = require("fs");

(async () => {
  const location = path.join(__dirname, "../exchange_adapters.json");
  const fileExists = fs.existsSync(location);

  if (!fileExists) return;
  const adapterFactory = await ethers.getContractFactory("PancakeswapAdapter");
  let adapter = await adapterFactory.deploy("Pancakeswap V2", "0x02a84c1b3BBD7401a5f7fa98a384EBC70bB5749E", 25, 215000);
  adapter = await adapter.deployed();

  const contentBuf = fs.readFileSync(location);
  const contentJSON = JSON.parse(contentBuf.toString());

  let arr = contentJSON[network.config.chainId];

  if (!arr) arr = [];

  arr.push(adapter.address);

  fs.writeFileSync(location, JSON.stringify({ ...contentJSON, [network.config.chainId]: arr }, undefined, 2));
})();
