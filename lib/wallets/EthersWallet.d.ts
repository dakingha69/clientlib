import { utils as ethersUtils } from 'ethers';
import { TLProvider } from '../providers/TLProvider';
import { TLWallet } from './TLWallet';
import { Amount, EthersWalletData, MetaTransactionFees, RawTxObject, Signature, TxInfos } from '../typings';
/**
 * The EthersWallet class contains wallet related methods.
 */
export declare class EthersWallet implements TLWallet {
    provider: TLProvider;
    private walletFromEthers;
    constructor(provider: TLProvider);
    readonly address: string;
    getAddress(): Promise<string>;
    getWalletData(): Promise<EthersWalletData>;
    /**
     * Creates wallet data of type `ethers`.
     */
    create(): Promise<EthersWalletData>;
    /**
     * Deploys a new identity contract on the chain
     */
    deployIdentity(): Promise<string>;
    isIdentityDeployed(): Promise<boolean>;
    /**
     * Encrypts and serializes the given wallet data.
     * @param walletData Wallet data of type `ethers`.
     * @param password Password to encrypt wallet data with.
     * @param progressCallback Optional encryption progress callback.
     * @returns Serialized encrypted ethereum JSON keystore v3.
     */
    encryptToSerializedKeystore(walletData: EthersWalletData, password: string, progressCallback?: (progress: number) => any): Promise<string>;
    /**
     * Loads given wallet data of type `ethers`.
     * @param walletData Wallet data of type `ethers`.
     */
    loadFrom(walletData: EthersWalletData): Promise<void>;
    /**
     * Recovers wallet data from a serialized encrypted ethereum JSON keystore v3
     * (e.g. as returned by `encryptToSerializedKeystore`).
     * @param serializedEncryptedKeystore Serialized encrypted ethereum JSON keystore v3.
     * @param password Password to decrypt encrypted ethereum JSON keystore v3.
     * @param progressCallback Callback function for decryption progress.
     */
    recoverFromEncryptedKeystore(serializedEncryptedKeystore: string, password: string, progressCallback?: (progress: number) => any): Promise<EthersWalletData>;
    /**
     * Recovers wallet data from mnemonic phrase.
     * @param seed Mnemonic seed phrase.
     */
    recoverFromSeed(seed: string): Promise<EthersWalletData>;
    /**
     * Recovers wallet data from private key.
     * Note that mnemonic and derivation path is `undefined` here.
     * @param privateKey Private key to recover wallet data from.
     */
    recoverFromPrivateKey(privateKey: string): Promise<EthersWalletData>;
    /**
     * Signs given hex hash of message with loaded wallet.
     * @param msgHash Hash of message to sign.
     */
    signMsgHash(msgHash: string): Promise<Signature>;
    /**
     * Signs given message with loaded wallet.
     * @param message Message to sign.
     */
    signMessage(message: ethersUtils.Arrayish): Promise<Signature>;
    /**
     * Takes a raw transaction object, turns it into a RLP encoded hex string, signs it with
     * the loaded user and relays the transaction.
     * @param rawTx Raw transaction object.
     */
    confirm(rawTx: RawTxObject): Promise<string>;
    /**
     * Returns a `Promise` with the balance of loaded user.
     */
    getBalance(): Promise<Amount>;
    /**
     * Returns a `Promise` with the mnemonic seed phrase of loaded user.
     * Note that the returned seed is `undefined` for accounts recovered by a private key
     * or serialized encrypted keystores that were not created with `ethers`.
     */
    showSeed(): Promise<string>;
    /**
     * Returns a `Promise` with the private key of loaded user.
     */
    exportPrivateKey(): Promise<string>;
    encrypt(msg: string, theirPubKey: string): Promise<any>;
    decrypt(encMsg: any, theirPubKey: string): Promise<any>;
    getTxInfos(userAddress: string): Promise<TxInfos>;
    getMetaTxFees(rawTx: RawTxObject): Promise<MetaTransactionFees>;
}
