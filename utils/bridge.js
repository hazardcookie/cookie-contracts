const xrpl = require('xrpl')
const utils = require('./utils/utils');

async function bridge(walletName, evmWalletAddress, amount) {

    const wallet = await utils.loadWalletByName(walletName);

    const transactionSetup = {
        TransactionType: 'Payment',
        Account: wallet.address,
        Amount: xrpl.xrpToDrops(amount),
        Destination: "radjmEZTb4zsyNUJGV4gcVPXrFTJAuskKa",
        Memos: [
            {
                Memo: {
                    MemoData: Buffer.from(evmWalletAddress, 'utf8').toString('hex').toUpperCase()
                }
            }
        ]
    }

    xrpl.validate(transactionSetup)
    const submit = await utils.signSubmitAndWait(transactionSetup, wallet);
    utils.saveData(submit, './data/bridgeTx.json')
    return submit
}

bridge('wallet1', '0xb5AE500B09A4ea49356C4Df330d1dBd15bA925F7', '950')
