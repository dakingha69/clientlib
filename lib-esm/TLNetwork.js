import { ethers } from 'ethers'
import { Contact } from './Contact'
import { CurrencyNetwork } from './CurrencyNetwork'
import { EthWrapper } from './EthWrapper'
import { Event } from './Event'
import { Exchange } from './Exchange'
import { Messaging } from './Messaging'
import { Payment } from './Payment'
import { Shield } from './Shield'
import { Transaction } from './Transaction'
import { Trustline } from './Trustline'
import { User } from './User'
import { RelayProvider } from './providers/RelayProvider'
import { Web3Signer } from './signers/Web3Signer'
import { EthersWallet } from './wallets/EthersWallet'
import { WALLET_TYPE_ETHERS, WALLET_TYPE_IDENTITY } from './wallets/TLWallet'
import utils from './utils'
import { IdentityWallet } from './wallets/IdentityWallet'
/**
 * The TLNetwork class is the single entry-point into the trustline-network.js library.
 * It contains all of the library's functionality and all calls to the library should be made through a TLNetwork instance.
 */
var TLNetwork = /** @class */ (function() {
  /**
   * Initiates a new TLNetwork instance that provides the public interface to trustlines-network library.
   * @param config Configuration object. See type `tlNetworkConfig` for more information.
   */
  function TLNetwork(config) {
    if (config === void 0) {
      config = {}
    }
    var _a = config.protocol,
      protocol = _a === void 0 ? 'http' : _a,
      _b = config.host,
      host = _b === void 0 ? 'localhost' : _b,
      _c = config.port,
      port = _c === void 0 ? '' : _c,
      _d = config.path,
      path = _d === void 0 ? '' : _d,
      _e = config.wsProtocol,
      wsProtocol = _e === void 0 ? 'ws' : _e,
      relayApiUrl = config.relayApiUrl,
      relayWsApiUrl = config.relayWsApiUrl,
      web3Provider = config.web3Provider,
      identityFactoryAddress = config.identityFactoryAddress,
      identityImplementationAddress = config.identityImplementationAddress,
      _f = config.walletType,
      walletType = _f === void 0 ? WALLET_TYPE_ETHERS : _f
    this.setProvider(
      new RelayProvider(
        relayApiUrl || utils.buildApiUrl(protocol, host, port, path),
        relayWsApiUrl || utils.buildApiUrl(wsProtocol, host, port, path)
      )
    )
    this.setWallet(walletType, this.provider, {
      identityFactoryAddress: identityFactoryAddress,
      identityImplementationAddress: identityImplementationAddress
    })
    this.setSigner(web3Provider, this.wallet)
    this.currencyNetwork = new CurrencyNetwork(this.provider)
    this.transaction = new Transaction({
      provider: this.provider,
      signer: this.signer,
      currencyNetwork: this.currencyNetwork
    })
    this.user = new User({
      provider: this.provider,
      signer: this.signer,
      wallet: this.wallet
    })
    this.contact = new Contact({
      provider: this.provider,
      user: this.user
    })
    this.event = new Event({
      currencyNetwork: this.currencyNetwork,
      provider: this.provider,
      user: this.user
    })
    this.messaging = new Messaging({
      currencyNetwork: this.currencyNetwork,
      provider: this.provider,
      user: this.user
    })
    this.trustline = new Trustline({
      currencyNetwork: this.currencyNetwork,
      event: this.event,
      provider: this.provider,
      transaction: this.transaction,
      user: this.user
    })
    this.payment = new Payment({
      currencyNetwork: this.currencyNetwork,
      event: this.event,
      provider: this.provider,
      transaction: this.transaction,
      user: this.user
    })
    this.exchange = new Exchange({
      currencyNetwork: this.currencyNetwork,
      event: this.event,
      payment: this.payment,
      provider: this.provider,
      transaction: this.transaction,
      user: this.user
    })
    this.ethWrapper = new EthWrapper({
      provider: this.provider,
      transaction: this.transaction,
      user: this.user
    })
    this.shield = new Shield({
      currencyNetwork: this.currencyNetwork,
      event: this.event,
      provider: this.provider,
      transaction: this.transaction,
      user: this.user
    })
  }
  TLNetwork.prototype.setProvider = function(provider) {
    if (!(provider instanceof RelayProvider)) {
      throw new Error('Provider not supported.')
    }
    this.provider = provider
  }
  TLNetwork.prototype.setSigner = function(web3Provider, wallet) {
    var signer = web3Provider
      ? new Web3Signer(new ethers.providers.Web3Provider(web3Provider))
      : wallet
    if (
      !(
        signer instanceof Web3Signer ||
        signer instanceof EthersWallet ||
        signer instanceof IdentityWallet
      )
    ) {
      throw new Error('Signer not supported.')
    }
    this.signer = signer
  }
  TLNetwork.prototype.setWallet = function(walletType, provider, _a) {
    var identityFactoryAddress = _a.identityFactoryAddress,
      identityImplementationAddress = _a.identityImplementationAddress
    var wallet
    if (walletType === WALLET_TYPE_IDENTITY) {
      wallet = new IdentityWallet(provider, {
        identityFactoryAddress: identityFactoryAddress,
        identityImplementationAddress: identityImplementationAddress
      })
    } else if (walletType === WALLET_TYPE_ETHERS) {
      wallet = new EthersWallet(provider)
    } else {
      throw new Error('Wallet type given is not handled: ' + walletType)
    }
    this.wallet = wallet
  }
  return TLNetwork
})()
export { TLNetwork }
//# sourceMappingURL=TLNetwork.js.map
