import { utils as ethersUtils } from 'ethers'
import { TLProvider } from '../providers/TLProvider'
import {
  Amount,
  EthersWalletData,
  MetaTransactionFees,
  RawTxObject,
  Signature,
  TxInfos
} from '../typings'
import { TLWallet } from './TLWallet'
/**
 * The EthersWallet class contains wallet related methods.
 */
export declare class EthersWallet implements TLWallet {
  public provider: TLProvider
  public readonly address: string
  private walletFromEthers
  constructor(provider: TLProvider)
  public getAddress(): Promise<string>
  public getWalletData(): Promise<EthersWalletData>
  /**
   * Creates wallet data of type `ethers`.
   */
  public create(): Promise<EthersWalletData>
  /**
   * Deploys a new identity contract on the chain
   */
  public deployIdentity(): Promise<string>
  public isIdentityDeployed(): Promise<boolean>
  /**
   * Encrypts and serializes the given wallet data.
   * @param walletData Wallet data of type `ethers`.
   * @param password Password to encrypt wallet data with.
   * @param progressCallback Optional encryption progress callback.
   * @returns Serialized encrypted ethereum JSON keystore v3.
   */
  public encryptToSerializedKeystore(
    walletData: EthersWalletData,
    password: string,
    progressCallback?: (progress: number) => any
  ): Promise<string>
  /**
   * Loads given wallet data of type `ethers`.
   * @param walletData Wallet data of type `ethers`.
   */
  public loadFrom(walletData: EthersWalletData): Promise<void>
  /**
   * Recovers wallet data from a serialized encrypted ethereum JSON keystore v3
   * (e.g. as returned by `encryptToSerializedKeystore`).
   * @param serializedEncryptedKeystore Serialized encrypted ethereum JSON keystore v3.
   * @param password Password to decrypt encrypted ethereum JSON keystore v3.
   * @param progressCallback Callback function for decryption progress.
   */
  public recoverFromEncryptedKeystore(
    serializedEncryptedKeystore: string,
    password: string,
    progressCallback?: (progress: number) => any
  ): Promise<EthersWalletData>
  /**
   * Recovers wallet data from mnemonic phrase.
   * @param seed Mnemonic seed phrase.
   */
  public recoverFromSeed(seed: string): Promise<EthersWalletData>
  /**
   * Recovers wallet data from private key.
   * Note that mnemonic and derivation path is `undefined` here.
   * @param privateKey Private key to recover wallet data from.
   */
  public recoverFromPrivateKey(privateKey: string): Promise<EthersWalletData>
  /**
   * Signs given hex hash of message with loaded wallet.
   * @param msgHash Hash of message to sign.
   */
  public signMsgHash(msgHash: string): Promise<Signature>
  /**
   * Signs given message with loaded wallet.
   * @param message Message to sign.
   */
  public signMessage(message: ethersUtils.Arrayish): Promise<Signature>
  /**
   * Takes a raw transaction object, turns it into a RLP encoded hex string, signs it with
   * the loaded user and relays the transaction.
   * @param rawTx Raw transaction object.
   */
  public confirm(rawTx: RawTxObject): Promise<string>
  /**
   * Returns a `Promise` with the balance of loaded user.
   */
  public getBalance(): Promise<Amount>
  /**
   * Returns a `Promise` with the mnemonic seed phrase of loaded user.
   * Note that the returned seed is `undefined` for accounts recovered by a private key
   * or serialized encrypted keystores that were not created with `ethers`.
   */
  public showSeed(): Promise<string>
  /**
   * Returns a `Promise` with the private key of loaded user.
   */
  public exportPrivateKey(): Promise<string>
  public encrypt(msg: string, theirPubKey: string): Promise<any>
  public decrypt(encMsg: any, theirPubKey: string): Promise<any>
  public getTxInfos(userAddress: string): Promise<TxInfos>
  public getMetaTxFees(rawTx: RawTxObject): Promise<MetaTransactionFees>
}
