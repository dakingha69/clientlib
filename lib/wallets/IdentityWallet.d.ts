import { utils as ethersUtils } from 'ethers'
import { TLProvider } from '../providers/TLProvider'
import {
  Amount,
  IdentityWalletData,
  MetaTransaction,
  MetaTransactionFees,
  RawTxObject,
  Signature,
  TxInfos
} from '../typings'
import { TLWallet } from './TLWallet'
export declare class IdentityWallet implements TLWallet {
  public provider: TLProvider
  public readonly address: string
  private walletFromEthers
  private identityAddress
  private identityFactoryAddress
  private identityImplementationAddress
  /**
   * Takes a string hash and signs it using the loaded wallet without appending `\x19Ethereum Signed Message:\n` to it
   * and hashing it again, contrary to what ethers.sign or ethers.signMessage does.
   * @param hash The hash to sign.
   */
  private rawSignHash
  private verifyFromField
  private buildMetaTransaction
  constructor(
    provider: TLProvider,
    {
      identityFactoryAddress,
      identityImplementationAddress
    }: {
      identityFactoryAddress: any
      identityImplementationAddress: any
    }
  )
  public getAddress(): Promise<string>
  public getWalletData(): Promise<IdentityWalletData>
  public getBalance(): Promise<Amount>
  /**
   * Creates wallet data of type `identity`.
   */
  public create(): Promise<IdentityWalletData>
  /**
   * Deploys a new identity contract on the chain
   */
  public deployIdentity(): Promise<string>
  public isIdentityDeployed(): Promise<boolean>
  /**
   * Loads given wallet data of type `identity`.
   * @param walletData Wallet data of type `identity`.
   */
  public loadFrom(walletData: IdentityWalletData): Promise<void>
  /**
   * Recovers wallet data from a serialized encrypted ethereum JSON keystore v3
   * (e.g. as returned by `encryptToSerializedKeystore`).
   * @param serializedEncryptedKeystore Serialized encrypted ethereum JSON keystore v3.
   * @param password Password to decrypt serialized encrypted ethereum JSON keystore v3 with.
   * @param progressCallback Callback function for decryption progress.
   */
  public recoverFromEncryptedKeystore(
    serializedEncryptedKeystore: string,
    password: string,
    progressCallback?: (progress: number) => any
  ): Promise<IdentityWalletData>
  /**
   * Recovers wallet data from mnemonic phrase.
   * @param seed Mnemonic seed phrase.
   */
  public recoverFromSeed(seed: string): Promise<IdentityWalletData>
  /**
   * Recovers wallet data from private key.
   * Note that mnemonic and derivation path is `undefined` here.
   * @param privateKey Private key to recover wallet data from.
   */
  public recoverFromPrivateKey(privateKey: string): Promise<IdentityWalletData>
  /**
   * Returns a `Promise` with the mnemonic seed phrase of loaded user.
   */
  public showSeed(): Promise<string>
  /**
   * Returns a `Promise` with the private key of loaded user.
   */
  public exportPrivateKey(): Promise<string>
  public encrypt(msg: string, theirPubKey: string): Promise<any>
  public decrypt(encMsg: any, theirPubKey: string): Promise<any>
  public signMsgHash(msgHash: string): Promise<Signature>
  public signMessage(message: ethersUtils.Arrayish): Promise<Signature>
  /**
   * Takes a raw transaction object, turns it into a meta-transaction signed by
   * the loaded user and relays the transaction.
   * @param rawTx Raw transaction object.
   * @returns the hash of the meta-transaction
   */
  public confirm(rawTx: RawTxObject): Promise<string>
  public signMetaTransaction(metaTransaction: MetaTransaction): Promise<string>
  public getTxInfos(userAddress: string): Promise<TxInfos>
  public getMetaTxFees(rawTx: RawTxObject): Promise<MetaTransactionFees>
  /**
   * Returns a serialized encrypted ethereum JSON keystore v3.
   * @param walletData Wallet data of type `identity`.
   * @param password Password to encrypt wallet data.
   * @param progressCallback Optional encryption progress callback.
   */
  public encryptToSerializedKeystore(
    walletData: IdentityWalletData,
    password: string,
    progressCallback?: (progress: number) => any
  ): Promise<string>
}
export declare function calculateIdentityAddress(
  factoryAddress: string,
  ownerAddress: string
): any
