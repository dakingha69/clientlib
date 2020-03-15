import { TLSigner } from '../signers/TLSigner';
import { TLWalletData } from '../typings';
/**
 * Interface for different wallet strategies.
 */
export interface TLWallet extends TLSigner {
    address: string;
    getAddress(): Promise<string>;
    showSeed(): Promise<string>;
    exportPrivateKey(): Promise<string>;
    create(): Promise<TLWalletData>;
    deployIdentity(): Promise<string>;
    isIdentityDeployed(): Promise<boolean>;
    loadFrom(tlWalletData: TLWalletData): Promise<void>;
    getWalletData(): Promise<TLWalletData>;
    recoverFromSeed(seed: string): Promise<TLWalletData>;
    recoverFromEncryptedKeystore(serializedEncryptedKeystore: string, password: string, progressCallback?: (progress: number) => any): Promise<TLWalletData>;
    recoverFromPrivateKey(privateKey: string): Promise<TLWalletData>;
    encryptToSerializedKeystore(tlWalletData: TLWalletData, password: string, progressCallback?: (progress: number) => any): Promise<string>;
    encrypt(msg: string, theirPubKey: string): Promise<any>;
    decrypt(encMsg: any, theirPubKey: string): Promise<any>;
}
export declare const TL_WALLET_VERSION = 1;
export declare const WALLET_TYPE_ETHERS = "ethers";
export declare const WALLET_TYPE_IDENTITY = "identity";
export declare const EXPECTED_VERSIONS: number[];
export declare const DEFAULT_DERIVATION_PATH = "m/44'/60'/0'/0/0";
/**
 * Checks if type and version of given wallet data are supported.
 * @param walletData Wallet data to check.
 * @param walletType Expected wallet type.
 * @param expectedVersions Expected wallet versions.
 */
export declare function verifyWalletData(walletData: TLWalletData, walletType: string, expectedVersions: number[]): void;
