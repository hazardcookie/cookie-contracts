const fs = require('fs');
const axios = require('axios');

// Create data folder if none exists
if (! fs.existsSync('./data')) {
    console.log('Creating data folder. Wallet.json will be here.')
    fs.mkdirSync('data')
}

// Create wallet.json file in data folder if none exists
if (! fs.existsSync('./data/wallets.json')) {
    console.log('Creating ./data/wallets.json file. New wallets will be stored here automatically.')
    fs.writeFileSync('./data/wallets.json', JSON.stringify({}))
}


// Load wallets.json file for use incase it contains wallets already
const Wallets = require('../../data/wallets.json');

// Function to submit request to AMM devnet faucet
async function createWallet() {
    const faucet = "https://faucet.devnet.rippletest.net/accounts"

    const requestConfig = {
        method: 'post',
        url: faucet,
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try {
        const response = await axios(requestConfig);
        console.log(response.data.account)
        return response.data.account;
    } catch (error) {
        console.log(error);
    }
}

// Creates 5 wallets and appends them to ./data/wallets.json
async function setupAndSaveWallets() {

    const WalletData = Wallets
    const WalletCount = Object.keys(Wallets).length
    const calculatedWalletNumber = WalletCount + 5

    let loopCount = 1
    for (let i = WalletCount + 1; i <= calculatedWalletNumber; ++ i) {
        console.log(`Creating wallet ${loopCount} out of 5`)
        WalletData['wallet' + i] = await createWallet()
        loopCount += 1
    }

    // Save JSON to file.
    // Save json to file
    async function saveData(data, path) {
        const preparedData = JSON.stringify(data, null, 2);
        fs.writeFile(path, preparedData, (err) => {
            if (err) 
                throw err;
            

            console.log('Data written to file');
        });
    }

    saveData(WalletData, 'data/wallets.json');
    console.log('Wallets created and saved. Check ./data/wallets.json to view them!')
}

setupAndSaveWallets();
