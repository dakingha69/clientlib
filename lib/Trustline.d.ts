import { CurrencyNetwork } from './CurrencyNetwork'
import { Event } from './Event'
import { TLProvider } from './providers/TLProvider'
import { Transaction } from './Transaction'
import {
  ClosePathObject,
  CloseTxObject,
  DecimalsOptions,
  EventFilterOptions,
  NetworkEvent,
  NetworkTrustlineEvent,
  PaymentOptions,
  RawTxObject,
  TrustlineObject,
  TrustlineUpdateOptions,
  TxObject,
  TxOptions
} from './typings'
import { User } from './User'
/**
 * The Trustline class contains all relevant methods for retrieving, creating and
 * editing trustlines.
 */
export declare class Trustline {
  private currencyNetwork
  private event
  private provider
  private transaction
  private user
  /**
   * Formats number values of trustline retrieved from the relay server.
   * @param trustline unformatted trustline
   * @param decimals decimals object of currency network
   */
  private _formatTrustline
  constructor(params: {
    currencyNetwork: CurrencyNetwork
    event: Event
    provider: TLProvider
    transaction: Transaction
    user: User
  })
  /**
   * Prepares an ethereum transaction object for creating a trustline update request.
   * Called by initiator of update request.
   * @param networkAddress Address of a currency network.
   * @param counterpartyAddress Address of counterparty who receives trustline update request.
   * @param creditlineGiven Proposed creditline limit given by initiator to counterparty,
   *                        i.e. 1.23 if network has to 2 decimals.
   * @param creditlineReceived Proposed creditline limit received by initiator from counterparty,
   *                           i.e. 1.23 if network has to 2 decimals.
   * @param options Options for creating an `updateTrustline` ethereum transaction.
   *                See type `TrustlineUpdateOptions` for more information.
   * @param options.interestRateGiven Proposed interest rate given by initiator to counterparty in % per year.
   * @param options.interestRateReceived Proposed interest rate received by initiator from counterparty in % per year.
   * @param options.isFrozen Whether we propose to freeze the trustline.
   * @param options.networkDecimals Decimals of currency network can be provided manually if known.
   * @param options.interestRateDecimals Decimals of interest rate in currency network can be provided manually if known.
   * @param options.gasLimit Custom gas limit.
   * @param options.gasPrice Custom gas price.
   */
  public prepareUpdate(
    networkAddress: string,
    counterpartyAddress: string,
    creditlineGiven: number | string,
    creditlineReceived: number | string,
    options?: TrustlineUpdateOptions
  ): Promise<TxObject>
  /**
   * Prepares an ethereum transaction object for accepting a trustline update request. Called
   * by receiver of initial update request.
   * @param networkAddress Address of a currency network.
   * @param initiatorAddress Address of user who initiated the trustline update request.
   * @param creditlineGiven Proposed creditline limit given by receiver to initiator,
   *                        i.e. 1.23 if network has to 2 decimals.
   * @param creditlineReceived Proposed creditline limit received by initiator from receiver,
   *                           i.e. 1.23 if network has to 2 decimals.
   * @param options Options for creating a ethereum transaction. See type `TLOptions` for more information.
   * @param options.interestRateGiven Proposed interest rate given by receiver to initiator in % per year.
   * @param options.interestRateReceived Proposed interest rate received by initiator from receiver in % per year.
   * @param options.isFrozen Whether we propose to freeze the trustline.
   * @param options.interestRateDecimals Decimals of interest rate in currency network can be provided manually if known.
   * @param options.decimals Decimals of currency network can be provided manually if known.
   * @param options.gasLimit Custom gas limit.
   * @param options.gasPrice Custom gas price.
   */
  public prepareAccept(
    networkAddress: string,
    initiatorAddress: string,
    creditlineGiven: number | string,
    creditlineReceived: number | string,
    options?: TrustlineUpdateOptions
  ): Promise<TxObject>
  /**
   * Prepares an ethereum transaction object for canceling / rejecting a trustline update request.
   * Called by initiator of cancel.
   * @param networkAddress Address of a currency network.
   * @param counterpartyAddress Address of counterpartyto cancel / reject the trustline update with.
   * @param options Options for creating the ethereum transaction.
   *                See type `TxOptions` for more information.
   * @param options.gasLimit Custom gas limit.
   * @param options.gasPrice Custom gas price.
   */
  public prepareCancelTrustlineUpdate(
    networkAddress: string,
    counterpartyAddress: string,
    options?: TxOptions
  ): Promise<TxObject>
  public prepareOpenCollateralized(
    gatewayAddress: string,
    collateralValue: string | number,
    givenToGatewayValue: string | number,
    options?: TxOptions
  ): Promise<TxObject>
  /**
   * Signs a raw transaction object as returned by `prepareAccept` or `prepareUpdate`
   * and sends the signed transaction.
   * @param rawTx Raw transaction object.
   */
  public confirm(rawTx: RawTxObject): Promise<any>
  /**
   * Returns all trustlines of a loaded user in all currency networks.
   */
  public getAllOfUser(): Promise<TrustlineObject[]>
  /**
   * Returns all trustlines of a loaded user in a currency network.
   * @param networkAddress Address of a currency network.
   * @param options Extra options for user, network or trustline.
   */
  public getAll(
    networkAddress: string,
    options?: {
      decimalsOptions?: DecimalsOptions
    }
  ): Promise<TrustlineObject[]>
  /**
   * Returns a trustline to a counterparty address in a specified currency network.
   * @param networkAddress Address of a currency network.
   * @param counterpartyAddress Address of counterparty of trustline.
   */
  public get(
    networkAddress: string,
    counterpartyAddress: string,
    options?: {
      decimalsOptions?: DecimalsOptions
    }
  ): Promise<TrustlineObject>
  /**
   * Returns trustline update requests of loaded user in a currency network.
   * @param networkAddress Address of a currency network.
   * @param filter Event filter object. See `EventFilterOptions` for more information.
   */
  public getRequests(
    networkAddress: string,
    filter?: EventFilterOptions
  ): Promise<NetworkTrustlineEvent[]>
  /**
   * Returns trustline update cancels of loaded user in a currency network.
   * @param networkAddress Address of a currency network.
   * @param filter Event filter object. See `EventFilterOptions` for more information.
   */
  public getTrustlineUpdateCancels(
    networkAddress: string,
    filter?: EventFilterOptions
  ): Promise<NetworkEvent[]>
  /**
   * Returns trustline updates of loaded user in a currency network. An update
   * happens when a user accepts a trustline update request.
   * @param networkAddress Address of a currency network.
   * @param filter Event filter object. See `EventFilterOptions` for more information.
   */
  public getUpdates(
    networkAddress: string,
    filter?: EventFilterOptions
  ): Promise<NetworkTrustlineEvent[]>
  /**
   * Prepares an ethereum transaction object for closing a trustline.
   * @param networkAddress Address of a currency network.
   * @param counterpartyAddress Address of counterparty to who the trustline should be settled.
   * @param options Payment options. See `PaymentOptions` for more information.
   * @param options.decimals Decimals of currency network can be provided manually.
   * @param options.maximumHops Max. number of hops for transfer.
   * @param options.maximumFees Max. transfer fees user if willing to pay.
   * @returns A transaction object for closing a trustline. See `CloseTxObject` for more information.
   */
  public prepareClose(
    networkAddress: string,
    counterpartyAddress: string,
    options?: PaymentOptions
  ): Promise<CloseTxObject>
  /**
   * Returns a path for closing a trustline between sender and counterparty.
   * @param networkAddress Address of a currency network.
   * @param senderAddress Address of sender.
   * @param counterpartyAddress Address of counterparty of trustline.
   * @param options Payment options. See `PaymentOptions` for more information.
   * @param options.networkDecimals Decimals of currency network can be provided manually.
   * @param options.maximumHops Max. number of hops for transfer.
   * @param options.maximumFees Max. transfer fees user if willing to pay.
   * @returns Relevant information for closing a trustline. See `ClosePathObject`.
   */
  public getClosePath(
    networkAddress: string,
    senderAddress: string,
    counterpartyAddress: string,
    options?: PaymentOptions
  ): Promise<ClosePathObject>
}
