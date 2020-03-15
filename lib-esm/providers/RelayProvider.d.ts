import { Observable } from 'rxjs/Observable'
import {
  Amount,
  MetaTransaction,
  MetaTransactionFees,
  ReconnectingWSOptions,
  TxInfos
} from '../typings'
import { TLProvider } from './TLProvider'
export declare class RelayProvider implements TLProvider {
  public relayApiUrl: string
  public relayWsApiUrl: string
  constructor(relayApiUrl: string, relayWsApiUrl: string)
  /**
   * Returns a JSON response from the REST API of the relay server.
   * @param endpoint Endpoint to fetch.
   * @param options Optional fetch options.
   */
  public fetchEndpoint<T>(endpoint: string, options?: object): Promise<T>
  public postToEndpoint<T>(endpoint: string, data: any): Promise<T>
  /**
   * Creates a websocket stream connection to the relay server.
   * @param endpoint Websocket stream endpoint to connect to.
   * @param functionName Function to call on connection.
   * @param args Function arguments.
   * @param reconnectOnError Optional flag whether to try reconnecting web socket.
   */
  public createWebsocketStream(
    endpoint: string,
    functionName: string,
    args: object,
    reconnectingOptions?: ReconnectingWSOptions
  ): Observable<any>
  /**
   * Returns needed information for creating an ethereum transaction.
   * @param address Address of user creating the transaction
   * @returns Information for creating an ethereum transaction for the given user address.
   *          See type `TxInfos` for more details.
   */
  public getTxInfos(address: string): Promise<TxInfos>
  /**
   * Returns needed information for creating a meta transaction.
   * @param address Address of user creating the transaction
   * @returns Information for creating an ethereum transaction for the given identity address.
   *          See type `TxInfos` for more details.
   */
  public getMetaTxInfos(address: string): Promise<TxInfos>
  /**
   * Returns the fees the provider would be willing to pay for the transaction
   * @param metaTransaction Meta transaction to be relayed
   * @returns The fees value and currency network of fees for given meta transaction
   */
  public getMetaTxFees(
    metaTransaction: MetaTransaction
  ): Promise<MetaTransactionFees>
  /**
   * Returns balance of given address.
   * @param address Address to determine balance for.
   */
  public getBalance(address: string): Promise<Amount>
  /**
   * Returns the version of the currently configured relay server.
   * @returns Version of relay in the format `<name>/vX.X.X`.
   */
  public getRelayVersion(): Promise<string>
  /**
   * Send the given _signedTransaction_ to a relay server to execute it on the
   * blockchain and returns a `Promise` with the transaction hash.
   * @param signedTransaction
   */
  public sendSignedTransaction(signedTransaction: string): Promise<string>
  /**
   * Send the given signed meta-transaction to a relay server to execute it on the
   * blockchain and returns a `Promise` with the transaction hash.
   * @param signedMetaTransaction Signed meta-transaction to be sent to the relay server
   * @returns The hash of the transaction sent by the relay server, not to be confused with the hash of the meta-transaction
   */
  public sendSignedMetaTransaction(
    signedMetaTransaction: MetaTransaction
  ): Promise<string>
}
