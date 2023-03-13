import { generateMnemonic } from 'bip39'
import { program } from 'commander';
import { ethers } from 'ethers'

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
    });

program.command('generate_publickey')
    .description('Generate a wallet mnemonic')
    .requiredOption('-m, --mnemonic <phrase>', 'Mnemonic phrase')
    .action((args) => {
        const wallet = ethers.Wallet.fromPhrase(args.mnemonic)
        console.log('EVM Address: ' + wallet.address)
    });

program.parse();