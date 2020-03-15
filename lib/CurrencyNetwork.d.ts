import { TLProvider } from './providers/TLProvider'
import {
  DecimalsMap,
  DecimalsObject,
  DecimalsOptions,
  NetworkDetails,
  UserOverview
} from './typings'
/**
 * The CurrencyNetwork class contains all functions relevant for retrieving
 * currency network related information.
 */
export declare class CurrencyNetwork {
  /**
   * Returns general and interest rate decimals for given currency network.
   * @param networkAddress Currency network to get decimals for.
   * @param decimalsOptions Optional provided decimals if known.
   */
  public getDecimals: (
    networkAddress: string,
    decimalsOptions?: DecimalsOptions
  ) => Promise<DecimalsObject>
  private provider
  /**
   * Checks if given addresses are valid ethereum addresses.
   * @param addresses Array of addresses that should be checked.
   */
  private _checkAddresses
  /**
   * Returns cached decimals of given currency network if existent and fetches if not.
   * Always overwrites cache with manually provided decimals.
   */
  private _getDecimalsCached
  constructor(provider: TLProvider)
  public getGatedNetwork(gatewayAddress: string): Promise<NetworkDetails>
  public getShieldedNetwork(shieldAddress: string): Promise<NetworkDetails>
  /**
   * Returns all registered currency networks.
   */
  public getAll(): Promise<NetworkDetails[]>
  /**
   * Returns detailed information of specific currency network.
   * @param networkAddress Address of a currency network.
   * @returns A network object with information about name, decimals, number of users and address.
   */
  public getInfo(networkAddress: string): Promise<NetworkDetails>
  /**
   * Returns all addresses of users in a currency network.
   * @param networkAddress Address of a currency network.
   */
  public getUsers(networkAddress: string): Promise<string[]>
  /**
   * Returns overview of a user in a specific currency network.
   * @param networkAddress Address of a currency network.
   * @param userAddress Address of a user.
   */
  public getUserOverview(
    networkAddress: string,
    userAddress: string,
    options?: {
      decimalsOptions?: DecimalsOptions
    }
  ): Promise<UserOverview>
  /**
   * Returns a mapping from network address to respective decimals.
   * @param networkAddresses List of currency networks.
   */
  public getDecimalsMap(networkAddresses: string[]): Promise<DecimalsMap>
  /**
   * Returns true or false whether given address is a registered currency network.
   * @param contractAddress Address which should be checked.
   */
  public isNetwork(contractAddress: string): Promise<boolean>
}
