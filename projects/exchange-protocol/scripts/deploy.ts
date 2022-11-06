const {ethers} = require("hardhat");
async function main() {
    const [deployer] = await ethers.getSigners();

    console.log(`Deploying contracts with the account: ${deployer.address}`);

    console.log(`Account balance: ${await deployer.getBalance().toString()}`);


    const factory = "0x0205a49e3fb8e740a37b97698ffd552473685988"
    const wXRP = "0xd624e3934d489ae4a08673d73d6a17e7cc428d83"
    const CookiePair = await ethers.getContractFactory("CookieRouter");
    const cookiePair = await CookiePair.deploy(factory, wXRP);

    console.log(`Token address: ${cookiePair.address}`);
}

main().then(() => process.exit(0)).catch((error) => {
    console.error(error);
    process.exit(1);
});
