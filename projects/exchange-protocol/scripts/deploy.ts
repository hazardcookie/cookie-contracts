

const {ethers} = require("hardhat");
async function main() {
    const [deployer] = await ethers.getSigners();

    console.log(`Deploying contracts with the account: ${deployer.address}`);

    console.log(`Account balance: ${await deployer.getBalance().toString()}`);


    const factory = "0xc9c39D86C4dC749172a94A5543ae3c02B8402d6B"
    const wXRP = "0xd3009Cc3f9BFdFE79DeE6cfdA8411c882ffaC6A9"
    const wallet = "0xBc416004c100C3f889e0d4ecAC6C94F095021dcA"
    const CookiePair = await ethers.getContractFactory("brick");
    const cookiePair = await CookiePair.deploy();

    console.log(`Token address: ${cookiePair.address}`);
}

main().then(() => process.exit(0)).catch((error) => {
    console.error(error);
    process.exit(1);
});
