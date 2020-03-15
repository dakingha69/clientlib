import { BigNumber } from 'bignumber.js';
import { TLProvider } from './providers/TLProvider';
import { TLSigner } from './signers/TLSigner';
import { RawTxObject, TxObjectInternal, TxOptionsInternal } from './typings';
import { CurrencyNetwork } from './CurrencyNetwork';
/**
 * The Transaction class contains functions that are needed for Ethereum transactions.
 */
export declare class Transaction {
    private signer;
    private provider;
    private currencyNetwork;
    constructor(params: {
        signer: TLSigner;
        provider: TLProvider;
        currencyNetwork: CurrencyNetwork;
    });
    /**
     * Returns transaction fees and the raw transaction object for calling a contract function.
     * @param userAddress address of user that calls the contract function
     * @param contractAddress address of deployed contract
     * @param contractName name of deployed contract
     * @param functionName name of contract function
     * @param args arguments of function in same order as in contract
     * @param options.gasPrice (optional)
     * @param options.gasLimit (optional)
     * @param options.value (optional)
     * @param options.delegationFees (optional) delegation fees for a meta transaction.
     * @param options.currencyNetworkOfFees (optional) currency network of fees for a meta transaction.
     * @returns An ethereum transaction object and the estimated transaction fees in ETH.
     */
    prepareContractTransaction(userAddress: string, contractAddress: string, contractName: string, functionName: string, args: any[], options?: TxOptionsInternal): Promise<TxObjectInternal>;
    /**
     * Returns transaction fees and raw transaction object for transferring ETH.
     * @param senderAddress address of user sending the transfer
     * @param receiverAddress address of user receiving the transfer
     * @param rawValue transfer amount in wei
     * @param gasPrice (optional)
     * @param gasLimit (optional)
     * @returns An ethereum transaction object containing and the estimated transaction fees in ETH.
     */
    prepareValueTransaction(senderAddress: string, receiverAddress: string, rawValue: BigNumber, options?: TxOptionsInternal): Promise<TxObjectInternal>;
    /**
     * Signs and sends the given transaction object.
     * @param rawTx Raw transaction object.
     */
    confirm(rawTx: RawTxObject): Promise<string>;
    /**
     * Returns delegation fees for given rawTx
     * @param rawTx the rawTx to get the delegation fees for
     * @param options.delegationFees (optional) delegation fees for a meta transaction.
     * @param options.currencyNetworkOfFees (optional) currency network of fees for a meta transaction.
     * @returns An ethereum transaction object containing and the estimated transaction fees in ETH.
     */
    private getDelegationFees;
}
