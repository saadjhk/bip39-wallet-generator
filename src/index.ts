import { generateMnemonic } from 'bip39'
import { ethers } from 'ethers'

const mnemonic = generateMnemonic()
const wallet = ethers.Wallet.fromPhrase(mnemonic)
console.log(wallet.address)