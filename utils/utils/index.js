const xrpl = require('xrpl')
const fs = require("fs");

// Helper function for submiting transactions to the AMM devnet
async function signSubmitAndWait(transaction, wallet) {
    const client = new xrpl.Client("wss://s.devnet.rippletest.net:51233");
    await client.connect();


    const ts_prepared = await client.autofill(transaction);
    const ts_signed = wallet.sign(ts_prepared);

    console.log(`Submitting ${transaction.TransactionType} transaction.`);
    const ts_result = await client.submitAndWait(ts_signed.tx_blob);
    
    if (ts_result.result.meta.TransactionResult == "tesSUCCESS") {
        console.log(`Transaction succeeded: https://devnet.xrpl.org/transactions/${ts_signed.hash}`)
        client.disconnect();
        return ts_result
    } else {
        console.log(`Error sending transaction: ${ts_result.result.meta.TransactionResult}`)
        client.disconnect();
        return ts_result.result.meta.TransactionResult
    } 
}

// Helper Function to load a wallets by it's seed.
// Locates seed by searching for wallet name in ./data/wallets.json
async function loadWalletByName(name) {
    try {
        const walletLoad = fs.readFileSync('./utils/data/wallets.json');
        const Wallet = JSON.parse(walletLoad);
        const loadWalletFromSeed = xrpl.Wallet.fromSeed(Wallet[name].secret)
        
        return loadWalletFromSeed
    } catch (e) {
        console.log(`Error while loading wallet: ${e}`)
    }
}

// Helper function for converting domain names into hex values
// Domain names are used in a variety of xrpl transactions
function domainToHex(domain_input) {
    return Buffer.from(domain_input, 'utf8').toString('hex').toUpperCase();
}

// Save json to file
async function saveData(data, path) {
    const preparedData = JSON.stringify(data, null, 2);
    fs.writeFile(path, preparedData, (err) => {
        if (err) 
            throw err;
        console.log('Data written to file');
    });
}

exports.signSubmitAndWait = signSubmitAndWait;
exports.loadWalletByName = loadWalletByName;
exports.domainToHex = domainToHex;
exports.saveData = saveData;