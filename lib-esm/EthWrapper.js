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
import BigNumber from 'bignumber.js'
import utils from './utils'
var ETH_DECIMALS = 18
/**
 * The class EthWrapper contains all methods for depositing, withdrawing and transferring wrapped ETH.
 */
var EthWrapper = /** @class */ (function() {
  function EthWrapper(params) {
    this.provider = params.provider
    this.transaction = params.transaction
    this.user = params.user
  }
  /**
   * Returns all known ETH wrapper contract addresses from the relay server.
   */
  EthWrapper.prototype.getAddresses = function() {
    return this.provider.fetchEndpoint('exchange/eth')
  }
  /**
   * Returns the amount of already wrapped ETH on the given ETH wrapper contract.
   * @param ethWrapperAddress Address of ETH wrapper contract.
   */
  EthWrapper.prototype.getBalance = function(ethWrapperAddress) {
    return __awaiter(this, void 0, void 0, function() {
      var endpoint, _a, balance
      return __generator(this, function(_b) {
        switch (_b.label) {
          case 0:
            _a = 'tokens/' + ethWrapperAddress + '/users/'
            return [4 /*yield*/, this.user.getAddress()]
          case 1:
            endpoint = _a + _b.sent() + '/balance'
            return [4 /*yield*/, this.provider.fetchEndpoint(endpoint)]
          case 2:
            balance = _b.sent()
            return [2 /*return*/, utils.formatToAmount(balance, ETH_DECIMALS)]
        }
      })
    })
  }
  /**
   * Prepares an ethereum transaction object for transferring wrapped ETH where the
   * loaded user is the sender.
   * @param ethWrapperAddress Address of ETH wrapper contract.
   * @param receiverAddress Address of receiver of transfer.
   * @param value Amount of wrapped ETH to transfer.
   * @param options Transaction options. See `TxOptions` for more information.
   * @param options.gasPrice Custom gas price.
   * @param options.gasLimit Custom gas limit.
   */
  EthWrapper.prototype.prepTransfer = function(
    ethWrapperAddress,
    receiverAddress,
    value,
    options
  ) {
    if (options === void 0) {
      options = {}
    }
    return __awaiter(this, void 0, void 0, function() {
      var gasPrice, gasLimit, _a, rawTx, ethFees, _b, _c
      return __generator(this, function(_d) {
        switch (_d.label) {
          case 0:
            ;(gasPrice = options.gasPrice), (gasLimit = options.gasLimit)
            _c = (_b = this.transaction).prepareContractTransaction
            return [4 /*yield*/, this.user.getAddress()]
          case 1:
            return [
              4 /*yield*/,
              _c.apply(_b, [
                _d.sent(),
                ethWrapperAddress,
                'UnwEth',
                'transfer',
                [
                  receiverAddress,
                  utils.convertToHexString(utils.calcRaw(value, ETH_DECIMALS))
                ],
                {
                  gasLimit: gasPrice ? new BigNumber(gasLimit) : undefined,
                  gasPrice: gasPrice ? new BigNumber(gasPrice) : undefined
                }
              ])
            ]
          case 2:
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
   * Prepares an ethereum transaction object for depositing/wrapping ETH.
   * @param ethWrapperAddress Address of ETH wrapper contract.
   * @param value Amount of ETH to deposit/wrap.
   * @param options Transaction options. See `TxOptions` for more information.
   * @param options.gasPrice Custom gas price.
   * @param options.gasLimit Custom gas limit.
   */
  EthWrapper.prototype.prepDeposit = function(
    ethWrapperAddress,
    value,
    options
  ) {
    if (options === void 0) {
      options = {}
    }
    return __awaiter(this, void 0, void 0, function() {
      var gasPrice, gasLimit, _a, rawTx, ethFees, _b, _c
      return __generator(this, function(_d) {
        switch (_d.label) {
          case 0:
            ;(gasPrice = options.gasPrice), (gasLimit = options.gasLimit)
            _c = (_b = this.transaction).prepareContractTransaction
            return [4 /*yield*/, this.user.getAddress()]
          case 1:
            return [
              4 /*yield*/,
              _c.apply(_b, [
                _d.sent(),
                ethWrapperAddress,
                'UnwEth',
                'deposit',
                [],
                {
                  gasLimit: gasPrice ? new BigNumber(gasLimit) : undefined,
                  gasPrice: gasPrice ? new BigNumber(gasPrice) : undefined,
                  value: new BigNumber(utils.calcRaw(value, ETH_DECIMALS))
                }
              ])
            ]
          case 2:
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
   * Prepares an ethereum transaction object for withdrawing/unwrapping ETH.
   * @param ethWrapperAddress Address of ETH wrapper contract.
   * @param value Amount of ETH to withdraw/unwrap.
   * @param options Transaction options. See `TxOptions` for more information.
   * @param options.gasPrice Custom gas price.
   * @param options.gasLimit Custom gas limit.
   */
  EthWrapper.prototype.prepWithdraw = function(
    ethWrapperAddress,
    value,
    options
  ) {
    if (options === void 0) {
      options = {}
    }
    return __awaiter(this, void 0, void 0, function() {
      var gasPrice, gasLimit, _a, rawTx, ethFees, _b, _c
      return __generator(this, function(_d) {
        switch (_d.label) {
          case 0:
            ;(gasPrice = options.gasPrice), (gasLimit = options.gasLimit)
            _c = (_b = this.transaction).prepareContractTransaction
            return [4 /*yield*/, this.user.getAddress()]
          case 1:
            return [
              4 /*yield*/,
              _c.apply(_b, [
                _d.sent(),
                ethWrapperAddress,
                'UnwEth',
                'withdraw',
                [utils.convertToHexString(utils.calcRaw(value, ETH_DECIMALS))],
                {
                  gasLimit: gasLimit ? new BigNumber(gasLimit) : undefined,
                  gasPrice: gasPrice ? new BigNumber(gasPrice) : undefined
                }
              ])
            ]
          case 2:
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
   * Signs a raw transaction object as returned by `prepTransfer`, `prepDeposit` or `prepWithdraw`
   * and sends the signed transaction.
   * @param rawTx Raw transaction object.
   */
  EthWrapper.prototype.confirm = function(rawTx) {
    return __awaiter(this, void 0, void 0, function() {
      return __generator(this, function(_a) {
        return [2 /*return*/, this.transaction.confirm(rawTx)]
      })
    })
  }
  /**
   * Returns event logs of the ETH wrapper contract for the loaded user.
   * @param ethWrapperAddress Address of the ETH wrapper contract.
   * @param filter Event filter object. See `EventFilterOptions` for more information.
   * @param filter.type Available event types are `Transfer`, `Deposit` and `Withdrawal`.
   * @param filter.fromBlock Start of block range for event logs.
   */
  EthWrapper.prototype.getLogs = function(ethWrapperAddress, filter) {
    if (filter === void 0) {
      filter = {}
    }
    return __awaiter(this, void 0, void 0, function() {
      var type, fromBlock, baseUrl, _a, events
      return __generator(this, function(_b) {
        switch (_b.label) {
          case 0:
            ;(type = filter.type), (fromBlock = filter.fromBlock)
            _a = 'tokens/' + ethWrapperAddress + '/users/'
            return [4 /*yield*/, this.user.getAddress()]
          case 1:
            baseUrl = _a + _b.sent() + '/events'
            return [
              4 /*yield*/,
              this.provider.fetchEndpoint(
                utils.buildUrl(baseUrl, { type: type, fromBlock: fromBlock })
              )
            ]
          case 2:
            events = _b.sent()
            return [
              2 /*return*/,
              events.map(function(event) {
                return utils.formatEvent(event, ETH_DECIMALS, 0)
              })
            ]
        }
      })
    })
  }
  return EthWrapper
})()
export { EthWrapper }
//# sourceMappingURL=EthWrapper.js.map
