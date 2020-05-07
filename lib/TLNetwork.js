'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
var ethers_1 = require('ethers')
var Contact_1 = require('./Contact')
var CurrencyNetwork_1 = require('./CurrencyNetwork')
var EthWrapper_1 = require('./EthWrapper')
var Event_1 = require('./Event')
var Exchange_1 = require('./Exchange')
var Messaging_1 = require('./Messaging')
var Payment_1 = require('./Payment')
var Shield_1 = require('./Shield')
var Transaction_1 = require('./Transaction')
var Trustline_1 = require('./Trustline')
var User_1 = require('./User')
var RelayProvider_1 = require('./providers/RelayProvider')
var Web3Signer_1 = require('./signers/Web3Signer')
var EthersWallet_1 = require('./wallets/EthersWallet')
var TLWallet_1 = require('./wallets/TLWallet')
var utils_1 = __importDefault(require('./utils'))
var IdentityWallet_1 = require('./wallets/IdentityWallet')
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
      walletType = _f === void 0 ? TLWallet_1.WALLET_TYPE_ETHERS : _f
    this.setProvider(
      new RelayProvider_1.RelayProvider(
        relayApiUrl || utils_1.default.buildApiUrl(protocol, host, port, path),
        relayWsApiUrl ||
          utils_1.default.buildApiUrl(wsProtocol, host, port, path)
      )
    )
    this.setWallet(walletType, this.provider, {
      identityFactoryAddress: identityFactoryAddress,
      identityImplementationAddress: identityImplementationAddress
    })
    this.setSigner(web3Provider, this.wallet)
    this.currencyNetwork = new CurrencyNetwork_1.CurrencyNetwork(this.provider)
    this.transaction = new Transaction_1.Transaction({
      provider: this.provider,
      signer: this.signer,
      currencyNetwork: this.currencyNetwork
    })
    this.user = new User_1.User({
      provider: this.provider,
      signer: this.signer,
      wallet: this.wallet
    })
    this.contact = new Contact_1.Contact({
      provider: this.provider,
      user: this.user
    })
    this.event = new Event_1.Event({
      currencyNetwork: this.currencyNetwork,
      provider: this.provider,
      user: this.user
    })
    this.messaging = new Messaging_1.Messaging({
      currencyNetwork: this.currencyNetwork,
      provider: this.provider,
      user: this.user
    })
    this.trustline = new Trustline_1.Trustline({
      currencyNetwork: this.currencyNetwork,
      event: this.event,
      provider: this.provider,
      transaction: this.transaction,
      user: this.user
    })
    this.payment = new Payment_1.Payment({
      currencyNetwork: this.currencyNetwork,
      event: this.event,
      provider: this.provider,
      transaction: this.transaction,
      user: this.user
    })
    this.exchange = new Exchange_1.Exchange({
      currencyNetwork: this.currencyNetwork,
      event: this.event,
      payment: this.payment,
      provider: this.provider,
      transaction: this.transaction,
      user: this.user
    })
    this.ethWrapper = new EthWrapper_1.EthWrapper({
      provider: this.provider,
      transaction: this.transaction,
      user: this.user
    })
    this.shield = new Shield_1.Shield({
      currencyNetwork: this.currencyNetwork,
      event: this.event,
      provider: this.provider,
      transaction: this.transaction,
      user: this.user,
      payment: this.payment
    })
  }
  TLNetwork.prototype.setProvider = function(provider) {
    if (!(provider instanceof RelayProvider_1.RelayProvider)) {
      throw new Error('Provider not supported.')
    }
    this.provider = provider
  }
  TLNetwork.prototype.setSigner = function(web3Provider, wallet) {
    var signer = web3Provider
      ? new Web3Signer_1.Web3Signer(
          new ethers_1.ethers.providers.Web3Provider(web3Provider)
        )
      : wallet
    if (
      !(
        signer instanceof Web3Signer_1.Web3Signer ||
        signer instanceof EthersWallet_1.EthersWallet ||
        signer instanceof IdentityWallet_1.IdentityWallet
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
    if (walletType === TLWallet_1.WALLET_TYPE_IDENTITY) {
      wallet = new IdentityWallet_1.IdentityWallet(provider, {
        identityFactoryAddress: identityFactoryAddress,
        identityImplementationAddress: identityImplementationAddress
      })
    } else if (walletType === TLWallet_1.WALLET_TYPE_ETHERS) {
      wallet = new EthersWallet_1.EthersWallet(provider)
    } else {
      throw new Error('Wallet type given is not handled: ' + walletType)
    }
    this.wallet = wallet
  }
  return TLNetwork
})()
exports.TLNetwork = TLNetwork
//# sourceMappingURL=TLNetwork.js.map
