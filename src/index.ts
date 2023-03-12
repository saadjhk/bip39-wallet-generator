import { generateMnemonic } from 'bip39'
import { ethers } from 'ethers'
import prompt from 'prompt'

function onErr(err: any) {
    console.log(err);
    process.exit(1)
}

function promptCallback(err: any, result: { generate_again?: string }) {
    if (err) { return onErr(err); }

    if (result.generate_again?.toLowerCase().trim() === 'y') {
        generateWallet()
    } else if (result.generate_again?.toLowerCase().trim() === 'n') {
        process.exit(0)
    }

    prompt.get(['generate_again'], promptCallback);
}

function generateWallet() {
    const mnemonic = generateMnemonic(256)
    const wallet = ethers.Wallet.fromPhrase(mnemonic)

    console.log('Mnemonic: ' + mnemonic)
    console.log('EVM Address: ' + wallet.address)
}


prompt.start();
generateWallet();
prompt.get(['generate_again'], promptCallback);
