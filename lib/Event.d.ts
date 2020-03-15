import { Observable } from 'rxjs/Observable'
import { CurrencyNetwork } from './CurrencyNetwork'
import { TLProvider } from './providers/TLProvider'
import {
  AnyEvent,
  AnyEventRaw,
  DecimalsOptions,
  EventFilterOptions,
  ReconnectingWSOptions
} from './typings'
import { User } from './User'
/**
 * The Event class contains all methods related to retrieving event logs.
 */
export declare class Event {
  private currencyNetwork
  private provider
  private user
  /**
   * Returns unique addresses from a list of event logs and maps to whether the address
   * is a CurrencyNetwork or Token contract.
   * @param events trustlines network events
   */
  private _getUniqueAddressesMap
  constructor(params: {
    currencyNetwork: CurrencyNetwork
    provider: TLProvider
    user: User
  })
  /**
   * @hidden
   * Returns event logs of loaded user in a specified currency network.
   * @param networkAddress Address of a currency network.
   * @param filter Event filter object. See `EventFilterOptions` for more information.
   * @param filter.type Available event types are `Transfer`, `TrustlineUpdateRequest` and `TrustlineUpdate`.
   * @param filter.fromBlock Start of block range for event logs.
   */
  public get<T>(
    networkAddress: string,
    filter?: EventFilterOptions,
    options?: {
      decimalsOptions?: DecimalsOptions
    }
  ): Promise<T[]>
  /**
   * Returns event logs of loaded user in all currency networks.
   * @param filter Event filter object. See `EventFilterOptions` for more information.
   * @param filter.type Available event types are:
   *                    CurrencyNetwork -> `Transfer`, `TrustlineUpdateRequest` and `TrustlineUpdate`
   *                    EthWrapper -> `Transfer`, `Deposit` and `Withdrawal`
   *                    Exchange -> `LogFill` and `LogCancel`
   * @param filter.fromBlock Start of block range for event logs.
   */
  public getAll(filter?: EventFilterOptions): Promise<AnyEvent[]>
  /**
   * @hidden
   */
  public updateStream(
    reconnectingOptions?: ReconnectingWSOptions
  ): Observable<any>
  /**
   * Fetches decimals for given event logs and formats them so that all numerical
   * values are `Amount` objects.
   * @param rawEvents trustlines network events
   */
  public setDecimalsAndFormat(rawEvents: AnyEventRaw[]): Promise<any[]>
  /**
   * Returns a mapping from address to decimals
   * @param addressesMap mapping from address to whether given address is a CurrencyNetwork
   *                     or Token contract.
   */
  public getDecimalsMap(addressesMap: object): Promise<object>
}
