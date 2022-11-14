const xrpl = require('xrpl')
const utils = require('./utils');

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
    utils.saveData(submit, './utils/data/bridgeTx.json')
    return submit
}

bridge('wallet2', '0xBc416004c100C3f889e0d4ecAC6C94F095021dcA', '950')
