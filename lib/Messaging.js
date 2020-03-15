'use strict'
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
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
var fromPromise_1 = require('rxjs/observable/fromPromise')
var utils_1 = __importDefault(require('./utils'))
var Messaging = /** @class */ (function() {
  function Messaging(params) {
    this.user = params.user
    this.currencyNetwork = params.currencyNetwork
    this.provider = params.provider
  }
  /**
   * Sends a payment request to given `counterParty` and returns created payment request.
   * @param networkAddress Address of currency network.
   * @param counterPartyAddress Address of counter party.
   * @param value Requested payment amount.
   * @param subject Optional subject of payment request.
   */
  Messaging.prototype.paymentRequest = function(
    networkAddress,
    counterPartyAddress,
    value,
    subject,
    options
  ) {
    if (options === void 0) {
      options = {}
    }
    return __awaiter(this, void 0, void 0, function() {
      var decimals,
        type,
        paymentRequest,
        _a,
        _b,
        _c,
        _d,
        _e,
        _f,
        _g,
        _h,
        _j,
        _k,
        _l
      return __generator(this, function(_m) {
        switch (_m.label) {
          case 0:
            return [
              4 /*yield*/,
              this.currencyNetwork.getDecimals(
                networkAddress,
                options.decimalsOptions || {}
              )
            ]
          case 1:
            decimals = _m.sent()
            type = 'PaymentRequest'
            _a = {
              type: type,
              networkAddress: networkAddress
            }
            return [4 /*yield*/, this.user.getAddress()]
          case 2:
            paymentRequest = ((_a.from = _m.sent()),
            (_a.to = counterPartyAddress),
            (_a.amount = utils_1.default.formatToAmount(
              utils_1.default.calcRaw(value, decimals.networkDecimals),
              decimals.networkDecimals
            )),
            (_a.subject = subject),
            (_a.nonce = utils_1.default.generateRandomNumber(20).toNumber()),
            _a)
            _c = (_b = this.provider).postToEndpoint
            _d = ['messages/' + counterPartyAddress]
            _e = {
              type: type
            }
            _g = (_f = JSON).stringify
            _h = [{}, paymentRequest]
            _j = {}
            return [4 /*yield*/, this.user.getAddress()]
          case 3:
            return [
              4 /*yield*/,
              _c.apply(
                _b,
                _d.concat([
                  ((_e.message = _g.apply(_f, [
                    __assign.apply(
                      void 0,
                      _h.concat([
                        ((_j.counterParty = _m.sent()),
                        (_j.direction = 'received'),
                        (_j.user = counterPartyAddress),
                        _j)
                      ])
                    )
                  ])),
                  _e)
                ])
              )
            ]
          case 4:
            _m.sent()
            _k = [{}, paymentRequest]
            _l = { counterParty: counterPartyAddress, direction: 'sent' }
            return [4 /*yield*/, this.user.getAddress()]
          case 5:
            return [
              2 /*return*/,
              __assign.apply(void 0, _k.concat([((_l.user = _m.sent()), _l)]))
            ]
        }
      })
    })
  }
  /**
   * Returns a websocket observable that can be subscribed to.
   */
  Messaging.prototype.messageStream = function(reconnectingOptions) {
    var _this = this
    return fromPromise_1
      .fromPromise(this.user.getAddress())
      .flatMap(function(userAddress) {
        return _this.provider
          .createWebsocketStream(
            '/streams/messages',
            'listen',
            {
              type: 'all',
              user: userAddress
            },
            reconnectingOptions
          )
          .mergeMap(function(data) {
            if (data.type) {
              return [data]
            }
            return Promise.resolve(
              __assign({}, JSON.parse(data.message), {
                timestamp: data.timestamp
              })
            )
          })
      })
  }
  /**
   * Sends the given username to the specified counter party via messaging.
   * @param username Username to send.
   * @param counterPartyAddress Address of counter party.
   */
  Messaging.prototype.sendUsernameToCounterparty = function(
    username,
    counterpartyAddress
  ) {
    return __awaiter(this, void 0, void 0, function() {
      var type, usernameMessage, _a
      return __generator(this, function(_b) {
        switch (_b.label) {
          case 0:
            type = 'Username'
            _a = {
              type: type
            }
            return [4 /*yield*/, this.user.getAddress()]
          case 1:
            usernameMessage = ((_a.from = _b.sent()),
            (_a.to = counterpartyAddress),
            (_a.username = username),
            _a)
            return [
              4 /*yield*/,
              this.provider.postToEndpoint('messages/' + counterpartyAddress, {
                type: type,
                message: JSON.stringify(
                  __assign({}, usernameMessage, { direction: 'received' })
                )
              })
            ]
          case 2:
            _b.sent()
            return [
              2 /*return*/,
              __assign({}, usernameMessage, { direction: 'sent' })
            ]
        }
      })
    })
  }
  return Messaging
})()
exports.Messaging = Messaging
//# sourceMappingURL=Messaging.js.map
