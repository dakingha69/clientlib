'use strict'
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
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
var bignumber_js_1 = require('bignumber.js')
var ethers_1 = require('ethers')
var utils_1 = __importDefault(require('../utils'))
var RelayProvider = /** @class */ (function() {
  function RelayProvider(relayApiUrl, relayWsApiUrl) {
    this.relayApiUrl = relayApiUrl
    this.relayWsApiUrl = relayWsApiUrl
  }
  /**
   * Returns a JSON response from the REST API of the relay server.
   * @param endpoint Endpoint to fetch.
   * @param options Optional fetch options.
   */
  RelayProvider.prototype.fetchEndpoint = function(endpoint, options) {
    return __awaiter(this, void 0, void 0, function() {
      var trimmedEndpoint
      return __generator(this, function(_a) {
        trimmedEndpoint = utils_1.default.trimUrl(endpoint)
        return [
          2 /*return*/,
          utils_1.default.fetchUrl(
            this.relayApiUrl + '/' + trimmedEndpoint,
            options
          )
        ]
      })
    })
  }
  RelayProvider.prototype.postToEndpoint = function(endpoint, data) {
    return __awaiter(this, void 0, void 0, function() {
      var options
      return __generator(this, function(_a) {
        options = {
          body: JSON.stringify(data),
          headers: { 'Content-Type': 'application/json' },
          method: 'POST'
        }
        return [2 /*return*/, this.fetchEndpoint(endpoint, options)]
      })
    })
  }
  /**
   * Creates a websocket stream connection to the relay server.
   * @param endpoint Websocket stream endpoint to connect to.
   * @param functionName Function to call on connection.
   * @param args Function arguments.
   * @param reconnectOnError Optional flag whether to try reconnecting web socket.
   */
  RelayProvider.prototype.createWebsocketStream = function(
    endpoint,
    functionName,
    args,
    reconnectingOptions
  ) {
    var trimmedEndpoint = utils_1.default.trimUrl(endpoint)
    return utils_1.default.websocketStream(
      this.relayWsApiUrl + '/' + trimmedEndpoint,
      functionName,
      args,
      reconnectingOptions
    )
  }
  /**
   * Returns needed information for creating an ethereum transaction.
   * @param address Address of user creating the transaction
   * @returns Information for creating an ethereum transaction for the given user address.
   *          See type `TxInfos` for more details.
   */
  RelayProvider.prototype.getTxInfos = function(address) {
    return __awaiter(this, void 0, void 0, function() {
      var _a, nonce, gasPrice, balance
      return __generator(this, function(_b) {
        switch (_b.label) {
          case 0:
            return [
              4 /*yield*/,
              this.fetchEndpoint('users/' + address + '/txinfos')
            ]
          case 1:
            ;(_a = _b.sent()),
              (nonce = _a.nonce),
              (gasPrice = _a.gasPrice),
              (balance = _a.balance)
            return [
              2 /*return*/,
              {
                balance: new bignumber_js_1.BigNumber(balance),
                gasPrice: new bignumber_js_1.BigNumber(gasPrice),
                nonce: nonce
              }
            ]
        }
      })
    })
  }
  /**
   * Returns needed information for creating a meta transaction.
   * @param address Address of user creating the transaction
   * @returns Information for creating an ethereum transaction for the given identity address.
   *          See type `TxInfos` for more details.
   */
  RelayProvider.prototype.getMetaTxInfos = function(address) {
    return __awaiter(this, void 0, void 0, function() {
      var _a, identity, nextNonce, balance
      return __generator(this, function(_b) {
        switch (_b.label) {
          case 0:
            return [4 /*yield*/, this.fetchEndpoint('/identities/' + address)]
          case 1:
            ;(_a = _b.sent()),
              (identity = _a.identity),
              (nextNonce = _a.nextNonce),
              (balance = _a.balance)
            return [
              2 /*return*/,
              {
                balance: new bignumber_js_1.BigNumber(balance),
                gasPrice: new bignumber_js_1.BigNumber(0),
                nonce: nextNonce
              }
            ]
        }
      })
    })
  }
  /**
   * Returns the fees the provider would be willing to pay for the transaction
   * @param metaTransaction Meta transaction to be relayed
   * @returns The fees value and currency network of fees for given meta transaction
   */
  RelayProvider.prototype.getMetaTxFees = function(metaTransaction) {
    return __awaiter(this, void 0, void 0, function() {
      var potentialDelegationFees, delegationFees, currencyNetworkOfFees
      return __generator(this, function(_a) {
        switch (_a.label) {
          case 0:
            return [
              4 /*yield*/,
              this.postToEndpoint('/meta-transaction-fees', {
                metaTransaction: metaTransaction
              })
            ]
          case 1:
            potentialDelegationFees = _a.sent()
            delegationFees = '0'
            currencyNetworkOfFees = ''
            if (potentialDelegationFees.length) {
              // For now just get the first possible fee given by the relay server
              // Could be changed later to show the possible fees to the user and let it decide
              delegationFees = potentialDelegationFees[0].delegationFees
              currencyNetworkOfFees =
                potentialDelegationFees[0].currencyNetworkOfFees
            }
            return [
              2 /*return*/,
              {
                delegationFees: delegationFees,
                currencyNetworkOfFees: currencyNetworkOfFees
              }
            ]
        }
      })
    })
  }
  /**
   * Returns balance of given address.
   * @param address Address to determine balance for.
   */
  RelayProvider.prototype.getBalance = function(address) {
    return __awaiter(this, void 0, void 0, function() {
      var balance
      return __generator(this, function(_a) {
        switch (_a.label) {
          case 0:
            return [
              4 /*yield*/,
              this.fetchEndpoint('users/' + address + '/balance')
            ]
          case 1:
            balance = _a.sent()
            return [
              2 /*return*/,
              utils_1.default.formatToAmount(
                utils_1.default.calcRaw(balance, 18),
                18
              )
            ]
        }
      })
    })
  }
  /**
   * Returns the version of the currently configured relay server.
   * @returns Version of relay in the format `<name>/vX.X.X`.
   */
  RelayProvider.prototype.getRelayVersion = function() {
    return __awaiter(this, void 0, void 0, function() {
      return __generator(this, function(_a) {
        return [2 /*return*/, this.fetchEndpoint('version')]
      })
    })
  }
  /**
   * Send the given _signedTransaction_ to a relay server to execute it on the
   * blockchain and returns a `Promise` with the transaction hash.
   * @param signedTransaction
   */
  RelayProvider.prototype.sendSignedTransaction = function(signedTransaction) {
    return __awaiter(this, void 0, void 0, function() {
      return __generator(this, function(_a) {
        return [
          2 /*return*/,
          this.postToEndpoint('relay', {
            rawTransaction: ethers_1.ethers.utils.hexlify(signedTransaction)
          })
        ]
      })
    })
  }
  /**
   * Send the given signed meta-transaction to a relay server to execute it on the
   * blockchain and returns a `Promise` with the transaction hash.
   * @param signedMetaTransaction Signed meta-transaction to be sent to the relay server
   * @returns The hash of the transaction sent by the relay server, not to be confused with the hash of the meta-transaction
   */
  RelayProvider.prototype.sendSignedMetaTransaction = function(
    signedMetaTransaction
  ) {
    return __awaiter(this, void 0, void 0, function() {
      return __generator(this, function(_a) {
        return [
          2 /*return*/,
          this.postToEndpoint('relay-meta-transaction', {
            metaTransaction: signedMetaTransaction
          })
        ]
      })
    })
  }
  return RelayProvider
})()
exports.RelayProvider = RelayProvider
//# sourceMappingURL=RelayProvider.js.map
