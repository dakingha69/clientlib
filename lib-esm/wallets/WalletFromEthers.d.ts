import { ethers } from 'ethers'
import { EthersWalletData, IdentityWalletData } from '../typings'
/**
 * This is a wrapper class for `ethers.Wallet`. It allows us to customize some of the methods provided by
 * `ethers.Wallet`. We also use this to add some conversion methods adapted to our internal types.
 */
export declare class WalletFromEthers extends ethers.Wallet {
  public static fromWalletData(
    walletData: EthersWalletData | IdentityWalletData
  ): WalletFromEthers
  public static createRandom(): WalletFromEthers
  public static fromEncryptedJson(
    encryptedJson: string,
    password: string,
    progressCallback?: (progress: number) => any
  ): Promise<WalletFromEthers>
  public static fromMnemonic(mnemonic: string): WalletFromEthers
  constructor(privateKey: string, mnemonic?: string)
  public toEthersWalletData(): EthersWalletData
  public toIdentityWalletData(identityAddress: string): IdentityWalletData
}
