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
import BigNumber from 'bignumber.js'
import utils from './utils'
var VK_TYPES = ['mint', 'transfer', 'burn']
/**
 * The Trustline class contains all relevant methods for retrieving, creating and
 * editing trustlines.
 */
var Shield = /** @class */ (function() {
  function Shield(params) {
    this.event = params.event
    this.user = params.user
    this.transaction = params.transaction
    this.currencyNetwork = params.currencyNetwork
    this.provider = params.provider
    this.payment = params.payment
  }
  /**
   * ONLY FOR DEV PURPOSES
   * prepareRegisterVK
   */
  Shield.prototype.prepareRegisterVK = function(
    shieldAddress,
    flattenedVK,
    vkType,
    options
  ) {
    if (options === void 0) {
      options = {}
    }
    return __awaiter(this, void 0, void 0, function() {
      var gasLimit,
        gasPrice,
        funcName,
        funcArgs,
        _a,
        rawTx,
        ethFees,
        delegationFees,
        _b,
        _c
      return __generator(this, function(_d) {
        switch (_d.label) {
          case 0:
            ;(gasLimit = options.gasLimit), (gasPrice = options.gasPrice)
            funcName = 'registerVerificationKey'
            funcArgs = [flattenedVK, VK_TYPES.indexOf(vkType)]
            _c = (_b = this.transaction).prepareContractTransaction
            return [4 /*yield*/, this.user.getAddress()]
          case 1:
            return [
              4 /*yield*/,
              _c.apply(_b, [
                _d.sent(),
                shieldAddress,
                'CurrencyNetworkShield',
                funcName,
                funcArgs,
                {
                  gasLimit: gasLimit ? new BigNumber(gasLimit) : undefined,
                  gasPrice: gasPrice ? new BigNumber(gasPrice) : undefined
                }
              ])
            ]
          case 2:
            ;(_a = _d.sent()),
              (rawTx = _a.rawTx),
              (ethFees = _a.ethFees),
              (delegationFees = _a.delegationFees)
            return [
              2 /*return*/,
              {
                ethFees: utils.convertToAmount(ethFees),
                delegationFees: utils.convertToDelegationFees(delegationFees),
                rawTx: rawTx
              }
            ]
        }
      })
    })
  }
  Shield.prototype.prepareMintCommitment = function(
    shieldAddress,
    proof,
    inputs,
    mintValue,
    commitment,
    options
  ) {
    if (options === void 0) {
      options = {}
    }
    return __awaiter(this, void 0, void 0, function() {
      var gasLimit,
        gasPrice,
        shieldedNetwork,
        decimals,
        gateway,
        path,
        _a,
        _b,
        _c,
        funcName,
        funcArgs,
        _d,
        rawTx,
        ethFees,
        delegationFees,
        _e,
        _f
      return __generator(this, function(_g) {
        switch (_g.label) {
          case 0:
            ;(gasLimit = options.gasLimit), (gasPrice = options.gasPrice)
            return [
              4 /*yield*/,
              this.currencyNetwork.getShieldedNetwork(shieldAddress)
            ]
          case 1:
            shieldedNetwork = _g.sent()
            return [
              4 /*yield*/,
              this.currencyNetwork.getDecimals(shieldedNetwork.address)
            ]
          case 2:
            decimals = _g.sent()
            return [
              4 /*yield*/,
              this.currencyNetwork.getGateway(shieldedNetwork.address)
            ]
          case 3:
            gateway = _g.sent()
            _b = (_a = this.payment).getTransferPathInfo
            _c = [shieldedNetwork.address]
            return [4 /*yield*/, this.user.getAddress()]
          case 4:
            return [
              4 /*yield*/,
              _b.apply(
                _a,
                _c.concat([
                  _g.sent(),
                  gateway.address,
                  mintValue,
                  __assign({}, options, {
                    networkDecimals: decimals.networkDecimals
                  })
                ])
              )
            ]
          case 5:
            path = _g.sent().path
            if (path.length === 0) {
              throw new Error('No path to mint')
            }
            funcName = 'mint'
            funcArgs = [
              proof.map(function(p) {
                return utils.convertToHexString(p)
              }),
              inputs.map(function(i) {
                return utils.convertToHexString(i)
              }),
              utils.convertToHexString(
                utils.calcRaw(mintValue, decimals.networkDecimals)
              ),
              commitment,
              path
            ]
            _f = (_e = this.transaction).prepareContractTransaction
            return [4 /*yield*/, this.user.getAddress()]
          case 6:
            return [
              4 /*yield*/,
              _f.apply(_e, [
                _g.sent(),
                shieldAddress,
                'CurrencyNetworkShield',
                funcName,
                funcArgs,
                {
                  gasLimit: gasLimit ? new BigNumber(gasLimit) : undefined,
                  gasPrice: gasPrice ? new BigNumber(gasPrice) : undefined
                }
              ])
            ]
          case 7:
            ;(_d = _g.sent()),
              (rawTx = _d.rawTx),
              (ethFees = _d.ethFees),
              (delegationFees = _d.delegationFees)
            return [
              2 /*return*/,
              {
                ethFees: utils.convertToAmount(ethFees),
                delegationFees: utils.convertToDelegationFees(delegationFees),
                rawTx: rawTx
              }
            ]
        }
      })
    })
  }
  Shield.prototype.prepareTransferCommitment = function(
    shieldAddress,
    proof,
    inputs,
    root,
    nullifierC,
    nullifierD,
    commitmentE,
    commitmentF,
    options
  ) {
    if (options === void 0) {
      options = {}
    }
    return __awaiter(this, void 0, void 0, function() {
      var gasLimit,
        gasPrice,
        funcName,
        funcArgs,
        _a,
        rawTx,
        ethFees,
        delegationFees,
        _b,
        _c
      return __generator(this, function(_d) {
        switch (_d.label) {
          case 0:
            ;(gasLimit = options.gasLimit), (gasPrice = options.gasPrice)
            funcName = 'transfer'
            funcArgs = [
              proof.map(function(p) {
                return utils.convertToHexString(p)
              }),
              inputs.map(function(i) {
                return utils.convertToHexString(i)
              }),
              root,
              nullifierC,
              nullifierD,
              commitmentE,
              commitmentF
            ]
            _c = (_b = this.transaction).prepareContractTransaction
            return [4 /*yield*/, this.user.getAddress()]
          case 1:
            return [
              4 /*yield*/,
              _c.apply(_b, [
                _d.sent(),
                shieldAddress,
                'CurrencyNetworkShield',
                funcName,
                funcArgs,
                {
                  gasLimit: gasLimit ? new BigNumber(gasLimit) : undefined,
                  gasPrice: gasPrice ? new BigNumber(gasPrice) : undefined
                }
              ])
            ]
          case 2:
            ;(_a = _d.sent()),
              (rawTx = _a.rawTx),
              (ethFees = _a.ethFees),
              (delegationFees = _a.delegationFees)
            return [
              2 /*return*/,
              {
                ethFees: utils.convertToAmount(ethFees),
                delegationFees: utils.convertToDelegationFees(delegationFees),
                rawTx: rawTx
              }
            ]
        }
      })
    })
  }
  Shield.prototype.prepareBurnCommitment = function(
    shieldAddress,
    proof,
    inputs,
    root,
    nullifier,
    burnValue,
    options
  ) {
    if (options === void 0) {
      options = {}
    }
    return __awaiter(this, void 0, void 0, function() {
      var gasLimit,
        gasPrice,
        shieldedNetwork,
        decimals,
        gateway,
        path,
        _a,
        _b,
        _c,
        funcName,
        funcArgs,
        _d,
        rawTx,
        ethFees,
        delegationFees,
        _e,
        _f
      return __generator(this, function(_g) {
        switch (_g.label) {
          case 0:
            ;(gasLimit = options.gasLimit), (gasPrice = options.gasPrice)
            return [
              4 /*yield*/,
              this.currencyNetwork.getShieldedNetwork(shieldAddress)
            ]
          case 1:
            shieldedNetwork = _g.sent()
            return [
              4 /*yield*/,
              this.currencyNetwork.getDecimals(shieldedNetwork.address)
            ]
          case 2:
            decimals = _g.sent()
            return [
              4 /*yield*/,
              this.currencyNetwork.getGateway(shieldedNetwork.address)
            ]
          case 3:
            gateway = _g.sent()
            _b = (_a = this.payment).getTransferPathInfo
            _c = [shieldedNetwork.address, gateway.address]
            return [4 /*yield*/, this.user.getAddress()]
          case 4:
            return [
              4 /*yield*/,
              _b.apply(
                _a,
                _c.concat([
                  _g.sent(),
                  burnValue,
                  __assign({}, options, {
                    networkDecimals: decimals.networkDecimals
                  })
                ])
              )
            ]
          case 5:
            path = _g.sent().path
            if (path.length === 0) {
              throw new Error('No path to burn')
            }
            funcName = 'burn'
            funcArgs = [
              proof.map(function(p) {
                return utils.convertToHexString(p)
              }),
              inputs.map(function(i) {
                return utils.convertToHexString(i)
              }),
              root,
              nullifier,
              utils.convertToHexString(
                utils.calcRaw(burnValue, decimals.networkDecimals)
              ),
              path
            ]
            _f = (_e = this.transaction).prepareContractTransaction
            return [4 /*yield*/, this.user.getAddress()]
          case 6:
            return [
              4 /*yield*/,
              _f.apply(_e, [
                _g.sent(),
                shieldAddress,
                'CurrencyNetworkShield',
                funcName,
                funcArgs,
                {
                  gasLimit: gasLimit ? new BigNumber(gasLimit) : undefined,
                  gasPrice: gasPrice ? new BigNumber(gasPrice) : undefined
                }
              ])
            ]
          case 7:
            ;(_d = _g.sent()),
              (rawTx = _d.rawTx),
              (ethFees = _d.ethFees),
              (delegationFees = _d.delegationFees)
            return [
              2 /*return*/,
              {
                ethFees: utils.convertToAmount(ethFees),
                delegationFees: utils.convertToDelegationFees(delegationFees),
                rawTx: rawTx
              }
            ]
        }
      })
    })
  }
  return Shield
})()
export { Shield }
//# sourceMappingURL=Shield.js.map
