import { Contact } from './Contact'
import { CurrencyNetwork } from './CurrencyNetwork'
import { EthWrapper } from './EthWrapper'
import { Event } from './Event'
import { Exchange } from './Exchange'
import { Messaging } from './Messaging'
import { Payment } from './Payment'
import { TLProvider } from './providers/TLProvider'
import { Shield } from './Shield'
import { TLSigner } from './signers/TLSigner'
import { Transaction } from './Transaction'
import { Trustline } from './Trustline'
import { TLNetworkConfig } from './typings'
import { User } from './User'
import { TLWallet } from './wallets/TLWallet'
/**
 * The TLNetwork class is the single entry-point into the trustline-network.js library.
 * It contains all of the library's functionality and all calls to the library should be made through a TLNetwork instance.
 */
export declare class TLNetwork {
  /**
   * User instance containing all user/keystore related methods.
   */
  public user: User
  /**
   * @hidden
   * Transaction instance containing all transaction related methods.
   */
  public transaction: Transaction
  /**
   * Payment instance containing all methods for creating trustline transfers
   * and ETH transfers.
   */
  public payment: Payment
  /**
   * Trustline instance containing all methods for managing trustlines.
   */
  public trustline: Trustline
  /**
   * CurrencyNetwork instance containing all methods for retrieving currency network
   * related information.
   */
  public currencyNetwork: CurrencyNetwork
  /**
   * @hidden
   */
  public contact: Contact
  /**
   * Event instance for retrieving and formatting event logs.
   */
  public event: Event
  /**
   * Exchange instance containing all methods for making and taking orders.
   */
  public exchange: Exchange
  /**
   * @hidden
   */
  public messaging: Messaging
  /**
   * EthWrapper instance for wrapping and unwrapping ETH.
   */
  public ethWrapper: EthWrapper
  /**
   * @hidden
   */
  public web3: any
  /**
   * @hidden
   */
  public signer: TLSigner
  /**
   * @hidden
   */
  public wallet: TLWallet
  /**
   * @hidden
   */
  public provider: TLProvider
  public shield: Shield
  /**
   * Initiates a new TLNetwork instance that provides the public interface to trustlines-network library.
   * @param config Configuration object. See type `tlNetworkConfig` for more information.
   */
  constructor(config?: TLNetworkConfig)
  public setProvider(provider: TLProvider): void
  public setSigner(web3Provider: any, wallet: TLWallet): void
  public setWallet(
    walletType: string,
    provider: TLProvider,
    {
      identityFactoryAddress,
      identityImplementationAddress
    }: {
      identityFactoryAddress: any
      identityImplementationAddress: any
    }
  ): void
}
