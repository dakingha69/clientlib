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
import * as ethUtils from 'ethereumjs-util'
import utils from './utils'
/**
 * The CurrencyNetwork class contains all functions relevant for retrieving
 * currency network related information.
 */
var CurrencyNetwork = /** @class */ (function() {
  function CurrencyNetwork(provider) {
    this.provider = provider
    this.getDecimals = this._getDecimalsCached()
  }
  CurrencyNetwork.prototype.getGatedNetwork = function(gatewayAddress) {
    return __awaiter(this, void 0, void 0, function() {
      var gateway
      return __generator(this, function(_a) {
        switch (_a.label) {
          case 0:
            return [
              4 /*yield*/,
              this.provider.fetchEndpoint('gateways/' + gatewayAddress)
            ]
          case 1:
            gateway = _a.sent()
            return [2 /*return*/, this.getInfo(gateway.gatedNetworkAddress)]
        }
      })
    })
  }
  CurrencyNetwork.prototype.getShieldedNetwork = function(shieldAddress) {
    return __awaiter(this, void 0, void 0, function() {
      var shield
      return __generator(this, function(_a) {
        switch (_a.label) {
          case 0:
            return [
              4 /*yield*/,
              this.provider.fetchEndpoint('shields/' + shieldAddress)
            ]
          case 1:
            shield = _a.sent()
            return [2 /*return*/, this.getInfo(shield.networkAddress)]
        }
      })
    })
  }
  /**
   * Returns all registered currency networks.
   */
  CurrencyNetwork.prototype.getAll = function() {
    return __awaiter(this, void 0, void 0, function() {
      var networks
      return __generator(this, function(_a) {
        switch (_a.label) {
          case 0:
            return [4 /*yield*/, this.provider.fetchEndpoint('networks')]
          case 1:
            networks = _a.sent()
            return [
              2 /*return*/,
              networks.map(function(network) {
                return __assign({}, network, {
                  defaultInterestRate: utils.formatToAmount(
                    network.defaultInterestRate,
                    network.interestRateDecimals
                  )
                })
              })
            ]
        }
      })
    })
  }
  /**
   * Returns detailed information of specific currency network.
   * @param networkAddress Address of a currency network.
   * @returns A network object with information about name, decimals, number of users and address.
   */
  CurrencyNetwork.prototype.getInfo = function(networkAddress) {
    return __awaiter(this, void 0, void 0, function() {
      var networkInfo
      return __generator(this, function(_a) {
        switch (_a.label) {
          case 0:
            return [4 /*yield*/, this._checkAddresses([networkAddress])]
          case 1:
            _a.sent()
            return [
              4 /*yield*/,
              this.provider.fetchEndpoint('networks/' + networkAddress)
            ]
          case 2:
            networkInfo = _a.sent()
            return [
              2 /*return*/,
              __assign({}, networkInfo, {
                defaultInterestRate: utils.formatToAmount(
                  networkInfo.defaultInterestRate,
                  networkInfo.interestRateDecimals
                )
              })
            ]
        }
      })
    })
  }
  /**
   * Returns all addresses of users in a currency network.
   * @param networkAddress Address of a currency network.
   */
  CurrencyNetwork.prototype.getUsers = function(networkAddress) {
    return __awaiter(this, void 0, void 0, function() {
      return __generator(this, function(_a) {
        switch (_a.label) {
          case 0:
            return [4 /*yield*/, this._checkAddresses([networkAddress])]
          case 1:
            _a.sent()
            return [
              2 /*return*/,
              this.provider.fetchEndpoint(
                'networks/' + networkAddress + '/users'
              )
            ]
        }
      })
    })
  }
  /**
   * Returns overview of a user in a specific currency network.
   * @param networkAddress Address of a currency network.
   * @param userAddress Address of a user.
   */
  CurrencyNetwork.prototype.getUserOverview = function(
    networkAddress,
    userAddress,
    options
  ) {
    if (options === void 0) {
      options = {}
    }
    return __awaiter(this, void 0, void 0, function() {
      var _a, overview, networkDecimals
      return __generator(this, function(_b) {
        switch (_b.label) {
          case 0:
            return [
              4 /*yield*/,
              this._checkAddresses([networkAddress, userAddress])
            ]
          case 1:
            _b.sent()
            return [
              4 /*yield*/,
              Promise.all([
                this.provider.fetchEndpoint(
                  'networks/' + networkAddress + '/users/' + userAddress
                ),
                this.getDecimals(networkAddress, options.decimalsOptions || {})
              ])
            ]
          case 2:
            ;(_a = _b.sent()),
              (overview = _a[0]),
              (networkDecimals = _a[1].networkDecimals)
            return [
              2 /*return*/,
              {
                balance: utils.formatToAmount(
                  overview.balance,
                  networkDecimals
                ),
                frozenBalance: utils.formatToAmount(
                  overview.frozenBalance,
                  networkDecimals
                ),
                given: utils.formatToAmount(overview.given, networkDecimals),
                leftGiven: utils.formatToAmount(
                  overview.leftGiven,
                  networkDecimals
                ),
                leftReceived: utils.formatToAmount(
                  overview.leftReceived,
                  networkDecimals
                ),
                received: utils.formatToAmount(
                  overview.received,
                  networkDecimals
                )
              }
            ]
        }
      })
    })
  }
  /**
   * Returns a mapping from network address to respective decimals.
   * @param networkAddresses List of currency networks.
   */
  CurrencyNetwork.prototype.getDecimalsMap = function(networkAddresses) {
    return __awaiter(this, void 0, void 0, function() {
      var promises, decimalsObjects
      var _this = this
      return __generator(this, function(_a) {
        switch (_a.label) {
          case 0:
            promises = networkAddresses.map(function(networkAddress) {
              return _this.getDecimals(networkAddress)
            })
            return [4 /*yield*/, Promise.all(promises)]
          case 1:
            decimalsObjects = _a.sent()
            return [
              2 /*return*/,
              networkAddresses.reduce(function(decimalsMap, networkAddress, i) {
                var _a
                return __assign(
                  {},
                  decimalsMap,
                  ((_a = {}), (_a[networkAddress] = decimalsObjects[i]), _a)
                )
              }, {})
            ]
        }
      })
    })
  }
  /**
   * Returns true or false whether given address is a registered currency network.
   * @param contractAddress Address which should be checked.
   */
  CurrencyNetwork.prototype.isNetwork = function(contractAddress) {
    return __awaiter(this, void 0, void 0, function() {
      var currencyNetworks, networkAddresses
      return __generator(this, function(_a) {
        switch (_a.label) {
          case 0:
            return [
              4 /*yield*/,
              this._checkAddresses([contractAddress])
              // TODO find another to check if given address is a currency network
            ]
          case 1:
            _a.sent()
            return [4 /*yield*/, this.getAll()]
          case 2:
            currencyNetworks = _a.sent()
            networkAddresses = currencyNetworks.map(function(c) {
              return ethUtils.toChecksumAddress(c.address)
            })
            return [
              2 /*return*/,
              networkAddresses.indexOf(
                ethUtils.toChecksumAddress(contractAddress)
              ) !== -1
            ]
        }
      })
    })
  }
  /**
   * Checks if given addresses are valid ethereum addresses.
   * @param addresses Array of addresses that should be checked.
   */
  CurrencyNetwork.prototype._checkAddresses = function(addresses) {
    return __awaiter(this, void 0, void 0, function() {
      var _i, addresses_1, address
      return __generator(this, function(_a) {
        for (_i = 0, addresses_1 = addresses; _i < addresses_1.length; _i++) {
          address = addresses_1[_i]
          if (!utils.checkAddress(address)) {
            throw new Error(address + ' is not a valid address.')
          }
        }
        return [2 /*return*/, true]
      })
    })
  }
  /**
   * Returns cached decimals of given currency network if existent and fetches if not.
   * Always overwrites cache with manually provided decimals.
   */
  CurrencyNetwork.prototype._getDecimalsCached = function() {
    var _this = this
    var decimalsCache = {}
    return function(networkAddress, decimalsOptions) {
      if (decimalsOptions === void 0) {
        decimalsOptions = {}
      }
      return __awaiter(_this, void 0, void 0, function() {
        var fetchedDecimals, error_1
        return __generator(this, function(_a) {
          switch (_a.label) {
            case 0:
              _a.trys.push([0, 4, , 5])
              return [4 /*yield*/, this._checkAddresses([networkAddress])]
            case 1:
              _a.sent()
              if (!decimalsCache[networkAddress]) {
                decimalsCache[networkAddress] = {
                  networkDecimals: undefined,
                  interestRateDecimals: undefined
                }
              }
              if (typeof decimalsOptions.networkDecimals === 'number') {
                decimalsCache[networkAddress].networkDecimals =
                  decimalsOptions.networkDecimals
              }
              if (typeof decimalsOptions.interestRateDecimals === 'number') {
                decimalsCache[networkAddress].interestRateDecimals =
                  decimalsOptions.interestRateDecimals
              }
              if (
                !(
                  typeof decimalsCache[networkAddress].networkDecimals !==
                    'number' ||
                  typeof decimalsCache[networkAddress].interestRateDecimals !==
                    'number'
                )
              )
                return [3 /*break*/, 3]
              return [4 /*yield*/, this.getInfo(networkAddress)]
            case 2:
              fetchedDecimals = _a.sent()
              if (
                typeof decimalsCache[networkAddress].networkDecimals !==
                'number'
              ) {
                decimalsCache[networkAddress].networkDecimals =
                  fetchedDecimals.decimals
              }
              if (
                typeof decimalsCache[networkAddress].interestRateDecimals !==
                'number'
              ) {
                decimalsCache[networkAddress].interestRateDecimals =
                  fetchedDecimals.interestRateDecimals
              }
              _a.label = 3
            case 3:
              return [2 /*return*/, decimalsCache[networkAddress]]
            case 4:
              error_1 = _a.sent()
              if (error_1.message.includes('Status 404')) {
                throw new Error(
                  networkAddress +
                    ' seems not to be a network address. Decimals have to be explicit.'
                )
              }
              throw error_1
            case 5:
              return [2 /*return*/]
          }
        })
      })
    }
  }
  return CurrencyNetwork
})()
export { CurrencyNetwork }
//# sourceMappingURL=CurrencyNetwork.js.map
