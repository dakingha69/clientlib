import { TLProvider } from './providers/TLProvider'
import { TLSigner } from './signers/TLSigner'
import { Amount, Signature, TLWalletData } from './typings'
import { TLWallet } from './wallets/TLWallet'
/**
 * The User class contains all user related functions, which also include wallet
 * related methods.
 */
export declare class User {
  /**
   * Checksummed Ethereum address of currently loaded user/wallet.
   */
  public readonly address: string
  private provider
  private signer
  private wallet
  private defaultPassword
  constructor(params: {
    provider: TLProvider
    signer: TLSigner
    wallet: TLWallet
  })
  /**
   * Async `address` getter for loaded user.
   */
  public getAddress(): Promise<string>
  /**
   * Creates a new random wallet
   * @returns the wallet data that can be used with `loadFrom`
   */
  public create(): Promise<TLWalletData>
  /**
   * Loads the given wallet data into the library
   * @param tlWalletData data of the wallet to load
   */
  public loadFrom(tlWalletData: TLWalletData): Promise<void>
  /**
   * Returns the wallet data. Can be used with `loadFrom`
   */
  public getWalletData(): Promise<TLWalletData>
  /**
   * Deploys a new identity on the chain if it has to
   */
  public deployIdentity(): Promise<string>
  public isIdentityDeployed(): Promise<boolean>
  /**
   * Digitally signs a message hash with the currently loaded user/wallet.
   * @param msgHash Hash of message that should be signed.
   */
  public signMsgHash(msgHash: string): Promise<Signature>
  /**
   * Returns ETH balance of loaded user.
   */
  public getBalance(): Promise<Amount>
  /**
   * Encrypts a message with the public key of another user.
   * @param msg Plain text message that should get encrypted.
   * @param theirPubKey Public key of receiver of message.
   */
  public encrypt(msg: string, theirPubKey: string): Promise<any>
  /**
   * Decrypts an encrypted message with the private key of loaded user.
   * @param encMsg Encrypted message.
   * @param theirPubKey Public key of sender of message.
   */
  public decrypt(encMsg: any, theirPubKey: string): Promise<any>
  /**
   * Encrypts and serializes the given wallet data.
   * @param tlWalletData Wallet data to encrypt and serialize.
   * @param password Optional password to encrypt wallet with.
   *                 If not specified default password is used.
   * @param progressCallback Optional encryption progress callback.
   */
  public encryptToSerializedKeystore(
    tlWalletData: TLWalletData,
    password?: string | ((progress: number) => void),
    progressCallback?: (progress: number) => void
  ): Promise<string>
  /**
   * Returns the 12 word seed of loaded user.
   */
  public showSeed(): Promise<string>
  /**
   * Returns the private key of loaded user.
   */
  public exportPrivateKey(): Promise<string>
  /**
   * Recovers wallet data from a serialized encrypted JSON keystore string
   * (e.g. as returned by `encryptToSerializedKeystore`).
   * @param serializedEncryptedKeystore Serialized standard JSON keystore.
   * @param password Password to decrypt serialized JSON keystore with.
   * @param progressCallback Optional progress callback to call on encryption progress.
   * @returns the wallet data. Can be used with `loadFrom`
   */
  public recoverFromEncryptedKeystore(
    serializedEncryptedKeystore: string,
    password: string,
    progressCallback?: (progress: number) => any
  ): Promise<TLWalletData>
  /**
   * Recovers wallet data from 12 word seed phrase.
   * @param seed 12 word seed phrase string.
   * @returns the wallet data. Can be used with `loadFrom`
   */
  public recoverFromSeed(seed: string): Promise<TLWalletData>
  /**
   * Recovers wallet data from private key.
   * @param privateKey Private key to recover wallet data from.
   * @returns wallet data. Can be used with `loadFrom`
   */
  public recoverFromPrivateKey(privateKey: string): Promise<TLWalletData>
  /**
   * Returns a shareable link which can be send to other users.
   * Contains username and address.
   * @param username Custom username.
   * @param customBase Optional custom base for link. Default `trustlines://`.
   */
  public createLink(username: string, customBase?: string): string
  /**
   * @hidden
   * Gives some ETH to requesting address.
   * NOTE: Used only for dev purposes.
   */
  public requestEth(): Promise<string>
  /**
   * @hidden
   * Verifies a signature.
   * @param message Signed message
   * @param signature Digital signature
   */
  public verifySignature(message: any, signature: string): boolean
}
