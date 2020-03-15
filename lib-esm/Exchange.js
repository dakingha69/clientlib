var __assign =
  (this && this.__assign) ||
  Object.assign ||
  function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i]
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p]
    }
    return t
  }
var __awaiter =
  (this && this.__awaiter) ||
  function(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value))
        } catch (e) {
          reject(e)
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value))
        } catch (e) {
          reject(e)
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : new P(function(resolve) {
              resolve(result.value)
            }).then(fulfilled, rejected)
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next())
    })
  }
var __generator =
  (this && this.__generator) ||
  function(thisArg, body) {
    var _ = {
        label: 0,
        sent: function() {
          if (t[0] & 1) throw t[1]
          return t[1]
        },
        trys: [],
        ops: []
      },
      f,
      y,
      t,
      g
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === 'function' &&
        (g[Symbol.iterator] = function() {
          return this
        }),
      g
    )
    function verb(n) {
      return function(v) {
        return step([n, v])
      }
    }
    function step(op) {
      if (f) throw new TypeError('Generator is already executing.')
      while (_)
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y['return']
                  : op[0]
                  ? y['throw'] || ((t = y['return']) && t.call(y), 0)
                  : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t
          if (((y = 0), t)) op = [op[0] & 2, t.value]
          switch (op[0]) {
            case 0:
            case 1:
              t = op
              break
            case 4:
              _.label++
              return { value: op[1], done: false }
            case 5:
              _.label++
              y = op[1]
              op = [0]
              continue
            case 7:
              op = _.ops.pop()
              _.trys.pop()
              continue
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0
                continue
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1]
                break
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1]
                t = op
                break
              }
              if (t && _.label < t[2]) {
                _.label = t[2]
                _.ops.push(op)
                break
              }
              if (t[2]) _.ops.pop()
              _.trys.pop()
              continue
          }
          op = body.call(thisArg, _)
        } catch (e) {
          op = [6, e]
          y = 0
        } finally {
          f = t = 0
        }
      if (op[0] & 5) throw op[1]
      return { value: op[0] ? op[1] : void 0, done: true }
    }
  }
import { BigNumber } from 'bignumber.js'
import { ethers } from 'ethers'
import utils from './utils'
import { FeePayer } from './typings'
var CURRENCY_NETWORK = 'CurrencyNetwork'
var TOKEN = 'Token'
var ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'
var DEFAULT_GAS_LIMIT_TAKE_ORDER = 600000
/**
 * The Exchange class contains all methods for making/taking orders, retrieving the orderbook
 * and more.
 */
var Exchange = /** @class */ (function() {
  function Exchange(params) {
    this.event = params.event
    this.user = params.user
    this.transaction = params.transaction
    this.currencyNetwork = params.currencyNetwork
    this.payment = params.payment
    this.provider = params.provider
  }
  /**
   * Returns all known exchange contract addresses.
   */
  Exchange.prototype.getExAddresses = function() {
    return this.provider.fetchEndpoint('/exchange/exchanges')
  }
  /**
   * Returns a specific order by its hash.
   * @param orderHash keccak-256 hash of order.
   * @param options See `OrderOptions` for more details.
   * @param options.makerTokenDecimals Decimals of maker token can be provided manually.
   *                                   NOTE: If maker token is NOT a currency network, then decimals have to be explicitly given.
   * @param options.takerTokenDecimals Decimals of taker token can be provided manually.
   *                                   NOTE: If taker token is NOT a currency network, then decimals have to be explicitly given.
   */
  Exchange.prototype.getOrderByHash = function(orderHash, options) {
    if (options === void 0) {
      options = {}
    }
    return __awaiter(this, void 0, void 0, function() {
      var makerTokenDecimals,
        takerTokenDecimals,
        order,
        _a,
        makerDecimals,
        takerDecimals
      return __generator(this, function(_b) {
        switch (_b.label) {
          case 0:
            ;(makerTokenDecimals = options.makerTokenDecimals),
              (takerTokenDecimals = options.takerTokenDecimals)
            return [
              4 /*yield*/,
              this.provider.fetchEndpoint('exchange/order/' + orderHash)
            ]
          case 1:
            order = _b.sent()
            return [
              4 /*yield*/,
              Promise.all([
                this.currencyNetwork.getDecimals(order.makerTokenAddress, {
                  networkDecimals: makerTokenDecimals
                }),
                this.currencyNetwork.getDecimals(order.takerTokenAddress, {
                  networkDecimals: takerTokenDecimals
                })
              ])
            ]
          case 2:
            ;(_a = _b.sent()),
              (makerDecimals = _a[0].networkDecimals),
              (takerDecimals = _a[1].networkDecimals)
            return [
              2 /*return*/,
              this._formatOrderRaw(order, makerDecimals, takerDecimals)
            ]
        }
      })
    })
  }
  /**
   * Returns orders that match given query parameters.
   * @param query See `OrdersQuery` for more information.
   * @param query.exchangeContractAddress Orders for this exchange address.
   * @param query.tokenAddress Orders where `makerTokenAddress` or `takerTokenAddress` is `tokenAddress`.
   * @param query.makerTokenAddress Orders with specified makerTokenAddress.
   * @param query.takerTokenAddress Orders with specified takerTokenAddress.
   * @param query.maker Orders with specified maker address.
   * @param query.taker Orders with specified taker address.
   * @param query.trader Orders where `maker` or `taker` is `trader`.
   */
  Exchange.prototype.getOrders = function(query) {
    if (query === void 0) {
      query = {}
    }
    return __awaiter(this, void 0, void 0, function() {
      var queryEndpoint, orders, addressesMap, decimalsMap
      var _this = this
      return __generator(this, function(_a) {
        switch (_a.label) {
          case 0:
            queryEndpoint = utils.buildUrl('exchange/orders', {
              exchangeContractAddress: query.exchangeContractAddress,
              feeRecipient: query.feeRecipient,
              maker: query.maker,
              makerTokenAddress: query.makerTokenAddress,
              taker: query.taker,
              takerTokenAddress: query.takerTokenAddress,
              tokenAddress: query.tokenAddress,
              trader: query.trader
            })
            return [4 /*yield*/, this.provider.fetchEndpoint(queryEndpoint)]
          case 1:
            orders = _a.sent()
            addressesMap = this._getUniqueTokenAddresses(orders)
            return [4 /*yield*/, this.event.getDecimalsMap(addressesMap)]
          case 2:
            decimalsMap = _a.sent()
            return [
              2 /*return*/,
              orders.map(function(order) {
                return _this._formatOrderRaw(
                  order,
                  decimalsMap[order.makerTokenAddress],
                  decimalsMap[order.takerTokenAddress]
                )
              })
            ]
        }
      })
    })
  }
  /**
   * Returns the orderbook for a given token pair.
   * @param baseTokenAddress Address of base token.
   * @param quoteTokenAddress Address of quote token.
   * @param options See `OrderbookOptions` for more details.
   * @param options.baseTokenDecimals Decimals of base token can be provided manually.
   *                                  NOTE: If base token is NOT a currency network, then decimals have to be explicitly given.
   * @param options.quoteTokenDecimals Decimals of quote token can be provided manually.
   *                                   NOTE: If quote token is NOT a currency network, then decimals have to be explicitly given.
   */
  Exchange.prototype.getOrderbook = function(
    baseTokenAddress,
    quoteTokenAddress,
    options
  ) {
    if (options === void 0) {
      options = {}
    }
    return __awaiter(this, void 0, void 0, function() {
      var baseTokenDecimals,
        quoteTokenDecimals,
        _a,
        baseDecimals,
        quoteDecimals,
        params,
        endpoint,
        orderbook,
        asks,
        bids
      var _this = this
      return __generator(this, function(_b) {
        switch (_b.label) {
          case 0:
            ;(baseTokenDecimals = options.baseTokenDecimals),
              (quoteTokenDecimals = options.quoteTokenDecimals)
            return [
              4 /*yield*/,
              Promise.all([
                this.currencyNetwork.getDecimals(baseTokenAddress, {
                  networkDecimals: baseTokenDecimals
                }),
                this.currencyNetwork.getDecimals(quoteTokenAddress, {
                  networkDecimals: quoteTokenDecimals
                })
              ])
            ]
          case 1:
            ;(_a = _b.sent()),
              (baseDecimals = _a[0].networkDecimals),
              (quoteDecimals = _a[1].networkDecimals)
            params = {
              baseTokenAddress: baseTokenAddress,
              quoteTokenAddress: quoteTokenAddress
            }
            endpoint = utils.buildUrl('exchange/orderbook', params)
            return [4 /*yield*/, this.provider.fetchEndpoint(endpoint)]
          case 2:
            orderbook = _b.sent()
            ;(asks = orderbook.asks), (bids = orderbook.bids)
            return [
              2 /*return*/,
              {
                asks: asks.map(function(a) {
                  return _this._formatOrderRaw(a, baseDecimals, quoteDecimals)
                }),
                bids: bids.map(function(b) {
                  return _this._formatOrderRaw(b, quoteDecimals, baseDecimals)
                })
              }
            ]
        }
      })
    })
  }
  /**
   * Creates an order and posts it to the relay server. If successful, the method returns the created order.
   * @param exchangeContractAddress Address of exchange contract.
   * @param makerTokenAddress Address of token the maker (loaded user) is offering.
   * @param takerTokenAddress Address of token the maker (loaded user) is requesting from the taker.
   * @param makerTokenValue Amount of token the maker (loaded user) is offering.
   * @param takerTokenValue Amount of token the maker (loaded user) is requesting from the taker.
   * @param options See `ExchangeOptions` for more information.
   * @param options.makerTokenDecimals Decimals of maker token can be provided manually.
   *                                   NOTE: If maker token is NOT a currency network, then decimals have to be explicitly given.
   * @param options.takerTokenDecimals Decimals of taker token can be provided manually.
   *                                   NOTE: If taker token is NOT a currency network, then decimals have to be explicitly given.
   * @param options.expirationUnixTimestampSec Date on when the order will expire in UNIX time.
   */
  Exchange.prototype.makeOrder = function(
    exchangeContractAddress,
    makerTokenAddress,
    takerTokenAddress,
    makerTokenValue,
    takerTokenValue,
    options
  ) {
    if (options === void 0) {
      options = {}
    }
    return __awaiter(this, void 0, void 0, function() {
      var makerTokenDecimals,
        takerTokenDecimals,
        _a,
        expirationUnixTimestampSec,
        _b,
        makerDecimals,
        takerDecimals,
        orderRaw,
        _c,
        orderWithFees,
        orderHash,
        ecSignature,
        signedOrderRaw
      return __generator(this, function(_d) {
        switch (_d.label) {
          case 0:
            ;(makerTokenDecimals = options.makerTokenDecimals),
              (takerTokenDecimals = options.takerTokenDecimals),
              (_a = options.expirationUnixTimestampSec),
              (expirationUnixTimestampSec = _a === void 0 ? 2524604400 : _a)
            return [
              4 /*yield*/,
              Promise.all([
                this.currencyNetwork.getDecimals(makerTokenAddress, {
                  networkDecimals: makerTokenDecimals
                }),
                this.currencyNetwork.getDecimals(takerTokenAddress, {
                  networkDecimals: takerTokenDecimals
                })
              ])
            ]
          case 1:
            ;(_b = _d.sent()),
              (makerDecimals = _b[0].networkDecimals),
              (takerDecimals = _b[1].networkDecimals)
            _c = {
              availableMakerTokenAmount: utils
                .calcRaw(makerTokenValue, makerDecimals)
                .toString(),
              availableTakerTokenAmount: utils
                .calcRaw(takerTokenValue, takerDecimals)
                .toString(),
              cancelledMakerTokenAmount: '0',
              cancelledTakerTokenAmount: '0',
              exchangeContractAddress: exchangeContractAddress,
              expirationUnixTimestampSec: expirationUnixTimestampSec.toString(),
              feeRecipient: ZERO_ADDRESS,
              filledMakerTokenAmount: '0',
              filledTakerTokenAmount: '0'
            }
            return [4 /*yield*/, this.user.getAddress()]
          case 2:
            orderRaw = ((_c.maker = _d.sent()),
            (_c.makerFee = '0'),
            (_c.makerTokenAddress = ethers.utils.getAddress(makerTokenAddress)),
            (_c.makerTokenAmount = utils
              .calcRaw(makerTokenValue, makerDecimals)
              .toString()),
            (_c.salt = Math.floor(Math.random() * 1000000000).toString()),
            (_c.taker = ZERO_ADDRESS),
            (_c.takerFee = '0'),
            (_c.takerTokenAddress = ethers.utils.getAddress(takerTokenAddress)),
            (_c.takerTokenAmount = utils
              .calcRaw(takerTokenValue, takerDecimals)
              .toString()),
            _c)
            return [4 /*yield*/, this._getFees(orderRaw)]
          case 3:
            orderWithFees = _d.sent()
            orderHash = this._getOrderHashHex(orderWithFees)
            return [4 /*yield*/, this.user.signMsgHash(orderHash)]
          case 4:
            ecSignature = _d.sent().ecSignature
            signedOrderRaw = __assign({}, orderWithFees, {
              ecSignature: ecSignature
            })
            return [
              4 /*yield*/,
              this._postRequest('/exchange/order', signedOrderRaw)
            ]
          case 5:
            _d.sent()
            return [
              2 /*return*/,
              this._formatOrderRaw(signedOrderRaw, makerDecimals, takerDecimals)
            ]
        }
      })
    })
  }
  /**
   * Prepares an ethereum transaction object for taking an order.
   * @param signedOrder The order to take as returned by `getOrderbook`, `getOrders` or `getOrderByHash`.
   * @param fillTakerTokenValue Amount of tokens the taker (loaded user) wants to fill.
   * @param options See `ExchangeTxOptions` for more information.
   * @param options.gasLimit Custom gas limit.
   * @param options.gasPrice Custom gas price.
   * @param options.makerTokenDecimals Decimals of maker token can be provided manually.
   *                                   NOTE: If maker token is NOT a currency network, then decimals have to be explicitly given.
   * @param options.takerTokenDecimals Decimals of taker token can be provided manually.
   *                                   NOTE: If taker token is NOT a currency network, then decimals have to be explicitly given.
   */
  Exchange.prototype.prepTakeOrder = function(
    signedOrder,
    fillTakerTokenValue,
    options
  ) {
    if (options === void 0) {
      options = {}
    }
    return __awaiter(this, void 0, void 0, function() {
      var exchangeContractAddress,
        maker,
        makerTokenAddress,
        takerTokenAddress,
        makerTokenAmount,
        takerTokenAmount,
        ecSignature,
        gasLimit,
        gasPrice,
        makerTokenDecimals,
        takerTokenDecimals,
        _a,
        makerDecimals,
        takerDecimals,
        _b,
        makerPathObj,
        takerPathObj,
        _c,
        _d,
        _e,
        _f,
        _g,
        _h,
        _j,
        orderAddresses,
        orderValues,
        _k,
        rawTx,
        ethFees,
        _l,
        _m
      return __generator(this, function(_o) {
        switch (_o.label) {
          case 0:
            ;(exchangeContractAddress = signedOrder.exchangeContractAddress),
              (maker = signedOrder.maker),
              (makerTokenAddress = signedOrder.makerTokenAddress),
              (takerTokenAddress = signedOrder.takerTokenAddress),
              (makerTokenAmount = signedOrder.makerTokenAmount),
              (takerTokenAmount = signedOrder.takerTokenAmount),
              (ecSignature = signedOrder.ecSignature)
            ;(gasLimit = options.gasLimit),
              (gasPrice = options.gasPrice),
              (makerTokenDecimals = options.makerTokenDecimals),
              (takerTokenDecimals = options.takerTokenDecimals)
            return [
              4 /*yield*/,
              Promise.all([
                this.currencyNetwork.getDecimals(makerTokenAddress, {
                  networkDecimals: makerTokenDecimals
                }),
                this.currencyNetwork.getDecimals(takerTokenAddress, {
                  networkDecimals: takerTokenDecimals
                })
              ])
            ]
          case 1:
            ;(_a = _o.sent()),
              (makerDecimals = _a[0].networkDecimals),
              (takerDecimals = _a[1].networkDecimals)
            _d = (_c = Promise).all
            _e = this._getPathObj
            _f = [makerTokenAddress, maker]
            return [4 /*yield*/, this.user.getAddress()]
          case 2:
            _g = [
              _e.apply(
                this,
                _f.concat([
                  _o.sent(),
                  this._getPartialAmount(
                    fillTakerTokenValue,
                    takerTokenAmount.value,
                    makerTokenAmount.value
                  ),
                  { networkDecimals: makerDecimals }
                ])
              )
            ]
            _h = this._getPathObj
            _j = [takerTokenAddress]
            return [4 /*yield*/, this.user.getAddress()]
          case 3:
            return [
              4 /*yield*/,
              _d.apply(_c, [
                _g.concat([
                  _h.apply(
                    this,
                    _j.concat([
                      _o.sent(),
                      maker,
                      fillTakerTokenValue,
                      {
                        networkDecimals: takerDecimals
                      }
                    ])
                  )
                ])
              ])
            ]
          case 4:
            ;(_b = _o.sent()), (makerPathObj = _b[0]), (takerPathObj = _b[1])
            orderAddresses = this._getOrderAddresses(signedOrder)
            orderValues = this._getOrderValues(signedOrder)
            if (
              (makerPathObj.path.length === 0 && makerPathObj.isNetwork) ||
              (takerPathObj.path.length === 0 && takerPathObj.isNetwork)
            ) {
              throw new Error('Could not find a path with enough capacity')
            }
            _m = (_l = this.transaction).prepareContractTransaction
            return [4 /*yield*/, this.user.getAddress()]
          case 5:
            return [
              4 /*yield*/,
              _m.apply(_l, [
                _o.sent(),
                exchangeContractAddress,
                'Exchange',
                'fillOrderTrustlines',
                [
                  orderAddresses,
                  orderValues,
                  utils.convertToHexString(
                    utils.calcRaw(fillTakerTokenValue, takerDecimals)
                  ),
                  makerPathObj.path,
                  takerPathObj.path,
                  ecSignature.v,
                  ecSignature.r,
                  ecSignature.s
                ],
                {
                  gasLimit: gasLimit
                    ? new BigNumber(gasLimit)
                    : new BigNumber(DEFAULT_GAS_LIMIT_TAKE_ORDER)
                        .multipliedBy(1.5)
                        .integerValue(),
                  gasPrice: gasPrice ? new BigNumber(gasPrice) : undefined
                }
              ])
            ]
          case 6:
            ;(_k = _o.sent()), (rawTx = _k.rawTx), (ethFees = _k.ethFees)
            return [
              2 /*return*/,
              {
                ethFees: utils.convertToAmount(ethFees),
                makerMaxFees: makerPathObj.maxFees,
                makerPath: makerPathObj.path,
                rawTx: rawTx,
                takerMaxFees: takerPathObj.maxFees,
                takerPath: takerPathObj.path
              }
            ]
        }
      })
    })
  }
  /**
   * Prepares an ethereum transaction for cancelling an order.
   * @param signedOrder The order to cancel as returned by `getOrderbook`, `getOrders` or `getOrderByHash`.
   * @param cancelTakerTokenValue Amount of tokens the maker (loaded user) wants to cancel.
   * @param options See `ExchangeTxOptions` for more information.
   * @param options.gasLimit Custom gas limit.
   * @param options.gasPrice Custom gas price.
   * @param options.makerTokenDecimals Decimals of maker token can be provided manually.
   *                                   NOTE: If maker token is NOT a currency network, then decimals have to be explicitly given.
   * @param options.takerTokenDecimals Decimals of taker token can be provided manually.
   *                                   NOTE: If taker token is NOT a currency network, then decimals have to be explicitly given.
   */
  Exchange.prototype.prepCancelOrder = function(
    signedOrder,
    cancelTakerTokenValue,
    options
  ) {
    if (options === void 0) {
      options = {}
    }
    return __awaiter(this, void 0, void 0, function() {
      var exchangeContractAddress,
        takerTokenAddress,
        gasLimit,
        gasPrice,
        takerTokenDecimals,
        takerDecimals,
        orderAddresses,
        orderValues,
        _a,
        rawTx,
        ethFees,
        _b,
        _c
      return __generator(this, function(_d) {
        switch (_d.label) {
          case 0:
            ;(exchangeContractAddress = signedOrder.exchangeContractAddress),
              (takerTokenAddress = signedOrder.takerTokenAddress)
            ;(gasLimit = options.gasLimit),
              (gasPrice = options.gasPrice),
              (takerTokenDecimals = options.takerTokenDecimals)
            return [
              4 /*yield*/,
              this.currencyNetwork.getDecimals(takerTokenAddress, {
                networkDecimals: takerTokenDecimals
              })
            ]
          case 1:
            takerDecimals = _d.sent().networkDecimals
            orderAddresses = this._getOrderAddresses(signedOrder)
            orderValues = this._getOrderValues(signedOrder)
            _c = (_b = this.transaction).prepareContractTransaction
            return [4 /*yield*/, this.user.getAddress()]
          case 2:
            return [
              4 /*yield*/,
              _c.apply(_b, [
                _d.sent(),
                exchangeContractAddress,
                'Exchange',
                'cancelOrder',
                [
                  orderAddresses,
                  orderValues,
                  utils.convertToHexString(
                    utils.calcRaw(cancelTakerTokenValue, takerDecimals)
                  )
                ],
                {
                  gasLimit: gasLimit ? new BigNumber(gasLimit) : undefined,
                  gasPrice: gasPrice ? new BigNumber(gasPrice) : undefined
                }
              ])
            ]
          case 3:
            ;(_a = _d.sent()), (rawTx = _a.rawTx), (ethFees = _a.ethFees)
            return [
              2 /*return*/,
              {
                ethFees: utils.convertToAmount(ethFees),
                rawTx: rawTx
              }
            ]
        }
      })
    })
  }
  /**
   * Signs a raw transaction object as returned by `prepCancelOrder` or `prepFillOrder`
   * and sends the signed transaction.
   * @param rawTx Raw transaction object.
   */
  Exchange.prototype.confirm = function(rawTx) {
    return __awaiter(this, void 0, void 0, function() {
      return __generator(this, function(_a) {
        return [2 /*return*/, this.transaction.confirm(rawTx)]
      })
    })
  }
  /**
   * Returns event logs of the Exchange contract for the loaded user.
   * @param exchangeAddress Address of Exchange contract.
   * @param filter Event filter object. See `EventFilterOptions` for more information.
   * @param filter.type Available event types are `LogFill` and `LogCancel`.
   * @param filter.fromBlock Start of block range for event logs.
   */
  Exchange.prototype.getLogs = function(exchangeAddress, filter) {
    if (filter === void 0) {
      filter = {}
    }
    return __awaiter(this, void 0, void 0, function() {
      var baseUrl, _a, parameterUrl, rawEvents, formattedEvents
      return __generator(this, function(_b) {
        switch (_b.label) {
          case 0:
            _a = 'exchange/' + exchangeAddress + '/users/'
            return [4 /*yield*/, this.user.getAddress()]
          case 1:
            baseUrl = _a + _b.sent() + '/events'
            parameterUrl = utils.buildUrl(baseUrl, filter)
            return [4 /*yield*/, this.provider.fetchEndpoint(parameterUrl)]
          case 2:
            rawEvents = _b.sent()
            return [4 /*yield*/, this.event.setDecimalsAndFormat(rawEvents)]
          case 3:
            formattedEvents = _b.sent()
            return [2 /*return*/, formattedEvents]
        }
      })
    })
  }
  /**
   * Returns a path for a transfer and an empty path if given token address is not a currency network.
   * @param tokenAddress Address of token.
   * @param from Address of sender of transfer.
   * @param to Address of receiver of transfer.
   * @param value Amount to transfer.
   * @param options See `TLOptions` for more information.
   * @param options.decimals Decimals of token can be provided manually.
   *                         NOTE: If token address is NOT a currency network, then decimals have to be explicit.
   */
  Exchange.prototype._getPathObj = function(
    tokenAddress,
    from,
    to,
    value,
    options
  ) {
    return __awaiter(this, void 0, void 0, function() {
      var networkDecimals, isNetwork
      return __generator(this, function(_a) {
        switch (_a.label) {
          case 0:
            networkDecimals = options.networkDecimals
            return [4 /*yield*/, this.currencyNetwork.isNetwork(tokenAddress)]
          case 1:
            isNetwork = _a.sent()
            if (isNetwork) {
              return [
                2 /*return*/,
                this.payment.getTransferPathInfo(
                  tokenAddress,
                  from,
                  to,
                  value,
                  {
                    networkDecimals: networkDecimals
                  }
                )
              ]
            }
            return [
              2 /*return*/,
              {
                feePayer: FeePayer.Sender,
                isNetwork: false,
                maxFees: utils.formatToAmount(0, networkDecimals),
                path: []
              }
            ]
        }
      })
    })
  }
  /**
   * Helper function to retrieve all addresses of a given order and return them as an array:
   * `[ makerAddress, takerAddress, makerTokenAddress, takerTokenAddress, feeRecipientAddress ]`
   * @param order Order object to retrieve addresses from.
   */
  Exchange.prototype._getOrderAddresses = function(order) {
    return [
      order.maker,
      ZERO_ADDRESS,
      order.makerTokenAddress,
      order.takerTokenAddress,
      order.feeRecipient
    ]
  }
  /**
   * Helper function to retrieve all values of a given order and return them as an array.
   * `[ makerTokenAmount, takerTokenAmount, makeFee, takerFee, expirationUnixTimestampSec, salt ]`
   * @param order Order object to retrieve values from.
   */
  Exchange.prototype._getOrderValues = function(order) {
    return [
      utils.convertToHexString(new BigNumber(order.makerTokenAmount.raw)),
      utils.convertToHexString(new BigNumber(order.takerTokenAmount.raw)),
      utils.convertToHexString(new BigNumber('0')),
      utils.convertToHexString(new BigNumber('0')),
      utils.convertToHexString(new BigNumber(order.expirationUnixTimestampSec)),
      utils.convertToHexString(new BigNumber(order.salt))
    ]
  }
  /**
   * Calculates partial value given a numerator and denominator.
   * @param numerator Numerator.
   * @param denominator Denominator.
   * @param target Target to calculate partial of.
   */
  Exchange.prototype._getPartialAmount = function(
    numerator,
    denominator,
    target
  ) {
    var bnNumerator = new BigNumber(numerator)
    var bnDenominator = new BigNumber(denominator)
    var bnTarget = new BigNumber(target)
    return bnNumerator
      .times(bnTarget)
      .dividedBy(bnDenominator)
      .toNumber()
  }
  /**
   * Returns fees of a given order.
   * @param order Unformatted Order object as returned by relay.
   */
  Exchange.prototype._getFees = function(order) {
    // NOTE: Fees are disabled for now
    return Promise.resolve(
      __assign({}, order, {
        feeRecipient: ZERO_ADDRESS,
        makerFee: '0',
        takerFee: '0'
      })
    )
  }
  /**
   * Sends a POST request to given `path` with given `payload`.
   * @param path Endpoint to send request to.
   * @param payload Body of POST request.
   */
  Exchange.prototype._postRequest = function(path, payload) {
    return this.provider.postToEndpoint(path, payload)
  }
  /**
   * Return keccak-256 hash of given order.
   * @param order Order object.
   */
  Exchange.prototype._getOrderHashHex = function(order) {
    var orderParts = [
      {
        type: 'address',
        value: order.exchangeContractAddress
      },
      {
        type: 'address',
        value: order.maker
      },
      {
        type: 'address',
        value: order.taker
      },
      {
        type: 'address',
        value: order.makerTokenAddress
      },
      {
        type: 'address',
        value: order.takerTokenAddress
      },
      {
        type: 'address',
        value: order.feeRecipient
      },
      {
        type: 'uint256',
        value: order.makerTokenAmount
      },
      {
        type: 'uint256',
        value: order.takerTokenAmount
      },
      {
        type: 'uint256',
        value: order.makerFee
      },
      {
        type: 'uint256',
        value: order.takerFee
      },
      {
        type: 'uint256',
        value: order.expirationUnixTimestampSec
      },
      {
        type: 'uint256',
        value: order.salt
      }
    ]
    var types = orderParts.map(function(part) {
      return part.type
    })
    var values = orderParts.map(function(part) {
      return part.value
    })
    var hash = ethers.utils.solidityKeccak256(types, values)
    return hash
  }
  /**
   * Formats number values of given order to Amount objects and calculates the hash of given order.
   * @param signedOrderRaw Signed order object unformatted.
   * @param makerDecimals Decimals of maker token.
   * @param takerDecimals Decimals of taker token.
   */
  Exchange.prototype._formatOrderRaw = function(
    signedOrderRaw,
    makerDecimals,
    takerDecimals
  ) {
    return __assign({}, signedOrderRaw, {
      availableMakerTokenAmount: utils.formatToAmount(
        signedOrderRaw.availableMakerTokenAmount,
        makerDecimals
      ),
      availableTakerTokenAmount: utils.formatToAmount(
        signedOrderRaw.availableTakerTokenAmount,
        takerDecimals
      ),
      cancelledMakerTokenAmount: utils.formatToAmount(
        signedOrderRaw.cancelledMakerTokenAmount,
        makerDecimals
      ),
      cancelledTakerTokenAmount: utils.formatToAmount(
        signedOrderRaw.cancelledTakerTokenAmount,
        takerDecimals
      ),
      filledMakerTokenAmount: utils.formatToAmount(
        signedOrderRaw.filledMakerTokenAmount,
        makerDecimals
      ),
      filledTakerTokenAmount: utils.formatToAmount(
        signedOrderRaw.filledTakerTokenAmount,
        takerDecimals
      ),
      hash: this._getOrderHashHex(signedOrderRaw),
      makerFee: utils.formatToAmount(signedOrderRaw.makerFee, makerDecimals),
      makerTokenAmount: utils.formatToAmount(
        signedOrderRaw.makerTokenAmount,
        makerDecimals
      ),
      takerFee: utils.formatToAmount(signedOrderRaw.takerFee, takerDecimals),
      takerTokenAmount: utils.formatToAmount(
        signedOrderRaw.takerTokenAmount,
        takerDecimals
      )
    })
  }
  /**
   * Helper function for filtering all unique addresses from an array of orders.
   * It also maps the unique addresses to whether it is a currency network or a token.
   * @param orders Unformatted orders as returned by the relay.
   */
  Exchange.prototype._getUniqueTokenAddresses = function(orders) {
    var _this = this
    return orders.reduce(function(result, order) {
      var makerTokenAddress = order.makerTokenAddress,
        takerTokenAddress = order.takerTokenAddress
      if (!result[makerTokenAddress]) {
        result[makerTokenAddress] = _this.currencyNetwork.isNetwork(
          makerTokenAddress
        )
          ? CURRENCY_NETWORK
          : TOKEN
      }
      if (!result[takerTokenAddress]) {
        result[takerTokenAddress] = _this.currencyNetwork.isNetwork(
          takerTokenAddress
        )
          ? CURRENCY_NETWORK
          : TOKEN
      }
      return result
    }, {})
  }
  return Exchange
})()
export { Exchange }
//# sourceMappingURL=Exchange.js.map
