import { ethers } from 'ethers'
import {
  Amount,
  MetaTransactionFees,
  RawTxObject,
  Signature,
  TxInfos
} from '../typings'
import { TLSigner } from './TLSigner'
/**
 * The Web3Signer class contains functions for signing transactions with a web3 provider.
 */
export declare class Web3Signer implements TLSigner {
  public address: string
  private signer
  private web3Provider
  constructor(web3Provider: ethers.providers.Web3Provider)
  /**
   * Returns `Promise` with address of signer.
   */
  public getAddress(): Promise<string>
  /**
   * Returns `Promise` with balance of signer.
   */
  public getBalance(): Promise<Amount>
  /**
   * Signs a transaction and returns `Promise` with transaction hash.
   * @param rawTx Raw transaction object.
   */
  public confirm(rawTx: RawTxObject): Promise<string>
  /**
   * Signs the given message and returns `Promise` with signature.
   * @param message Message to sign.
   */
  public signMessage(message: string | ArrayLike<number>): Promise<Signature>
  /**
   * Signs the given message hash and return `Promise` with signature.
   * @param msgHash Hash of message to sign.
   */
  public signMsgHash(msgHash: string): Promise<Signature>
  public getTxInfos(userAddress: string): Promise<TxInfos>
  public getMetaTxFees(rawTx: RawTxObject): Promise<MetaTransactionFees>
}
