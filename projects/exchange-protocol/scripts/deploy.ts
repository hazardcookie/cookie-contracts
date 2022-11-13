

const {ethers} = require("hardhat");
async function main() {
    const [deployer] = await ethers.getSigners();

    console.log(`Deploying contracts with the account: ${deployer.address}`);

    console.log(`Account balance: ${await deployer.getBalance().toString()}`);


    const factory = "0x3738f09F9f6829402b4CFbaC497c595C2d4e0fC8"
    const wXRP = "0x05a7B99A9e766e066ECF318447D31717f30721c8"
    const CookiePair = await ethers.getContractFactory("CookieRouter01");
    const cookiePair = await CookiePair.deploy(factory, wXRP);

    console.log(`Token address: ${cookiePair.address}`);
}

main().then(() => process.exit(0)).catch((error) => {
    console.error(error);
    process.exit(1);
});
