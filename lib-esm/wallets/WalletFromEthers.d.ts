import { ethers } from 'ethers'
import { EthersWalletData, IdentityWalletData } from '../typings'
/**
 * This is a wrapper class for `ethers.Wallet`. It allows us to customize some of the methods provided by
 * `ethers.Wallet`. We also use this to add some conversion methods adapted to our internal types.
 */
export declare class WalletFromEthers extends ethers.Wallet {
  static fromWalletData(
    walletData: EthersWalletData | IdentityWalletData
  ): WalletFromEthers
  static createRandom(): WalletFromEthers
  static fromEncryptedJson(
    encryptedJson: string,
    password: string,
    progressCallback?: (progress: number) => any
  ): Promise<WalletFromEthers>
  static fromMnemonic(mnemonic: string): WalletFromEthers
  constructor(privateKey: string, mnemonic?: string)
  toEthersWalletData(): EthersWalletData
  toIdentityWalletData(identityAddress: string): IdentityWalletData
}
