import { utils as ethersUtils } from 'ethers';
import { TLProvider } from '../providers/TLProvider';
import { TLWallet } from './TLWallet';
import { Amount, IdentityWalletData, MetaTransaction, MetaTransactionFees, RawTxObject, Signature, TxInfos } from '../typings';
export declare class IdentityWallet implements TLWallet {
    provider: TLProvider;
    private walletFromEthers;
    private identityAddress;
    private identityFactoryAddress;
    private identityImplementationAddress;
    constructor(provider: TLProvider, { identityFactoryAddress, identityImplementationAddress }: {
        identityFactoryAddress: any;
        identityImplementationAddress: any;
    });
    readonly address: string;
    getAddress(): Promise<string>;
    getWalletData(): Promise<IdentityWalletData>;
    getBalance(): Promise<Amount>;
    /**
     * Creates wallet data of type `identity`.
     */
    create(): Promise<IdentityWalletData>;
    /**
     * Deploys a new identity contract on the chain
     */
    deployIdentity(): Promise<string>;
    isIdentityDeployed(): Promise<boolean>;
    /**
     * Loads given wallet data of type `identity`.
     * @param walletData Wallet data of type `identity`.
     */
    loadFrom(walletData: IdentityWalletData): Promise<void>;
    /**
     * Recovers wallet data from a serialized encrypted ethereum JSON keystore v3
     * (e.g. as returned by `encryptToSerializedKeystore`).
     * @param serializedEncryptedKeystore Serialized encrypted ethereum JSON keystore v3.
     * @param password Password to decrypt serialized encrypted ethereum JSON keystore v3 with.
     * @param progressCallback Callback function for decryption progress.
     */
    recoverFromEncryptedKeystore(serializedEncryptedKeystore: string, password: string, progressCallback?: (progress: number) => any): Promise<IdentityWalletData>;
    /**
     * Recovers wallet data from mnemonic phrase.
     * @param seed Mnemonic seed phrase.
     */
    recoverFromSeed(seed: string): Promise<IdentityWalletData>;
    /**
     * Recovers wallet data from private key.
     * Note that mnemonic and derivation path is `undefined` here.
     * @param privateKey Private key to recover wallet data from.
     */
    recoverFromPrivateKey(privateKey: string): Promise<IdentityWalletData>;
    /**
     * Returns a `Promise` with the mnemonic seed phrase of loaded user.
     */
    showSeed(): Promise<string>;
    /**
     * Returns a `Promise` with the private key of loaded user.
     */
    exportPrivateKey(): Promise<string>;
    encrypt(msg: string, theirPubKey: string): Promise<any>;
    decrypt(encMsg: any, theirPubKey: string): Promise<any>;
    signMsgHash(msgHash: string): Promise<Signature>;
    signMessage(message: ethersUtils.Arrayish): Promise<Signature>;
    /**
     * Takes a raw transaction object, turns it into a meta-transaction signed by
     * the loaded user and relays the transaction.
     * @param rawTx Raw transaction object.
     * @returns the hash of the meta-transaction
     */
    confirm(rawTx: RawTxObject): Promise<string>;
    signMetaTransaction(metaTransaction: MetaTransaction): Promise<string>;
    getTxInfos(userAddress: string): Promise<TxInfos>;
    getMetaTxFees(rawTx: RawTxObject): Promise<MetaTransactionFees>;
    /**
     * Returns a serialized encrypted ethereum JSON keystore v3.
     * @param walletData Wallet data of type `identity`.
     * @param password Password to encrypt wallet data.
     * @param progressCallback Optional encryption progress callback.
     */
    encryptToSerializedKeystore(walletData: IdentityWalletData, password: string, progressCallback?: (progress: number) => any): Promise<string>;
    /**
     * Takes a string hash and signs it using the loaded wallet without appending `\x19Ethereum Signed Message:\n` to it
     * and hashing it again, contrary to what ethers.sign or ethers.signMessage does.
     * @param hash The hash to sign.
     */
    private rawSignHash;
    private verifyFromField;
    private buildMetaTransaction;
}
export declare function calculateIdentityAddress(factoryAddress: string, ownerAddress: string): any;
