import { CurrencyNetwork } from './CurrencyNetwork';
import { Event } from './Event';
import { TLProvider } from './providers/TLProvider';
import { Transaction } from './Transaction';
import { User } from './User';
import { EventFilterOptions, NetworkTransferEvent, PathObject, PaymentOptions, PaymentTxObject, RawTxObject, TxObject } from './typings';
/**
 * The Payment class contains all payment related functions. This includes
 * trustline transfers and normal ETH transfers.
 */
export declare class Payment {
    private currencyNetwork;
    private event;
    private provider;
    private transaction;
    private user;
    constructor(params: {
        event: Event;
        user: User;
        transaction: Transaction;
        currencyNetwork: CurrencyNetwork;
        provider: TLProvider;
    });
    /**
     * Prepares ethereum transaction object for a trustlines transfer, where loaded user is sender.
     * @param networkAddress Address of a currency network.
     * @param receiverAddress Address of receiver of transfer.
     * @param value Amount to transfer in biggest unit,
     *              i.e. 1.5 if currency network has 2 decimals.
     * @param options Optional payment options. See `PaymentOptions` for more information.
     * @param options.networkDecimals Decimals of currency network can be provided manually.
     * @param options.maximumHops Max. number of hops for transfer.
     * @param options.maximumFees Max. transfer fees user is willing to pay.
     * @param options.gasPrice Custom gas price.
     * @param options.gasLimit Custom gas limit.
     * @param options.feePayer Either `sender` or `receiver`. Specifies who pays network fees.
     * @param options.extraData Extra data that will appear in the Transfer event when successful.
     */
    prepare(networkAddress: string, receiverAddress: string, value: number | string, options?: PaymentOptions): Promise<PaymentTxObject>;
    /**
     * Prepares a ethereum transaction object for a ETH transfer, where loaded user is the sender.
     * @param receiverAddress Address of receiver of transfer.
     * @param value Amount of ETH to transfer.
     * @param options Payment options. See `PaymentOptions` for more information.
     * @param options.gasPrice Custom gas price.
     * @param options.gasLimit Custom gas limit.
     */
    prepareEth(receiverAddress: string, value: number | string, options?: PaymentOptions): Promise<TxObject>;
    /**
     * Returns a path for a trustlines transfer, along with estimated fees and gas costs.
     * @param networkAddress Address of a currency network.
     * @param senderAddress Address of sender of transfer.
     * @param receiverAddress Address of receiver of transfer.
     * @param value Amount to transfer in biggest unit,
     *              i.e. 1.23 if currency network has 2 decimals.
     * @param options Payment options. See `PaymentOptions` for more information.
     * @param options.feePayer Either `sender` or `receiver`. Specifies who pays network fees.
     * @param options.networkDecimals Decimals of currency network can be provided manually.
     * @param options.maximumHops Max. number of hops for transfer.
     * @param options.maximumFees Max. transfer fees user if willing to pay.
     * @param options.extraData Extra data as used for logging purposes in the transfer. Used for estimating gas costs.
     */
    getTransferPathInfo(networkAddress: string, senderAddress: string, receiverAddress: string, value: number | string, options?: PaymentOptions): Promise<PathObject>;
    /**
     * Returns transfer event logs of loaded user in a specified currency network.
     * @param networkAddress Address of currency network.
     * @param filter Event filter object. See `EventFilterOptions` for more information.
     */
    get(networkAddress: string, filter?: EventFilterOptions): Promise<NetworkTransferEvent[]>;
    /**
     * Signs a raw transaction object as returned by `prepare`
     * and sends the signed transaction.
     * @param rawTx Raw transaction object.
     */
    confirm(rawTx: RawTxObject): Promise<any>;
    /**
     * Creates a payment request link.
     * @param networkAddress Address of a currency network.
     * @param amount Requested transfer amount.
     * @param subject Additional information for payment request.
     * @param customBase Optional custom base for link. Default `trustlines://`.
     */
    createRequest(networkAddress: string, amount: number, subject: string, customBase?: string): Promise<string>;
    /**
     * Retrieve the maximum spendable amount and path to user in a network
     *
     * @param networkAddress
     * @param receiverAddress
     *
     * @return {Promise<{path: any, amount: Amount}>}
     */
    getMaxAmountAndPathInNetwork(networkAddress: string, receiverAddress: string): Promise<any>;
}
