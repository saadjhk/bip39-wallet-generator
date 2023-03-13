import { generateMnemonic } from 'bip39'
import { program } from 'commander';
import { ethers } from 'ethers'
import { createInterface } from 'readline';
import { Writable } from 'stream';

let shouldBeMuted = false;

var mutableStdout = new Writable({
    write: function (chunk, encoding, callback) {
        if (!shouldBeMuted)
            process.stdout.write(chunk, encoding);
        callback();
    }
});

const rl = createInterface({
    input: process.stdin,
    output: mutableStdout,
    terminal: true
})

program
    .name('bip39-wallet-utils')
    .description('CLI to work with BIP39 wallets')
    .version('0.0.0');

program.command('generate_mnemonic')
    .description('Generate a wallet mnemonic')
    .option('-k, --key-strength <key_strength>', 'Strength of the phrase', '128')
    .action((args) => {
        const mnemonic = generateMnemonic(
            Number(args.keyStrength)
        )
        const wallet = ethers.Wallet.fromPhrase(mnemonic)

        console.log('Mnemonic: ' + mnemonic)
        console.log('EVM Address: ' + wallet.address)
        process.exit(0)
    });

program.command('generate_publickey')
    .description('Generate a wallet mnemonic')
    .action((_args) => {
        rl.question('Enter Mnemonic: ', (a) => {
            const wallet = ethers.Wallet.fromPhrase(a)
            console.log('\nAddress: ' + wallet.address)
            process.exit(0)
        })
        shouldBeMuted = true
    });

program.parse();