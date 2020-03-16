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
var _this = this
import axios from 'axios'
import { BigNumber } from 'bignumber.js'
import * as ethUtils from 'ethereumjs-util'
import ReconnectingWebSocket from 'reconnecting-websocket'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/mergeMap'
import { Observable } from 'rxjs/Observable'
import JsonRPC from 'simple-jsonrpc-js'
import NodeWebSocket from 'ws'
if (
  typeof module !== 'undefined' &&
  module.exports &&
  typeof crypto === 'undefined'
) {
  // crypto not available
  console.warn('Random numbers will not be cryptographically secure')
} else {
  BigNumber.config({ CRYPTO: true })
}
/**
 * Returns a `Promise` with a JSON object from given URL.
 * @param url
 * @param options (optional)
 */
export var fetchUrl = function(url, options) {
  return __awaiter(_this, void 0, void 0, function() {
    var _a, status, data
    return __generator(this, function(_b) {
      switch (_b.label) {
        case 0:
          return [4 /*yield*/, axios(__assign({ url: url }, options))]
        case 1:
          ;(_a = _b.sent()), (status = _a.status), (data = _a.data)
          if (status !== 200) {
            throw new Error(
              'Error fetching ' +
                url +
                ' | Status ' +
                status +
                ' | ' +
                data.message
            )
          } else {
            return [2 /*return*/, data]
          }
          return [2 /*return*/]
      }
    })
  })
}
/**
 * Returns an Observable for a websocket stream.
 * @param url URL to open websocket stream to.
 * @param functionName Name of function to call on opened websocket.
 * @param args Arguments for above function.
 * @param reconnectionOptions Options to specify [reconnecting-websocket](https://github.com/pladaria/reconnecting-websocket#available-options)
 */
export var websocketStream = function(
  url,
  functionName,
  args,
  reconnectingOptions
) {
  if (reconnectingOptions === void 0) {
    reconnectingOptions = {}
  }
  return Observable.create(function(observer) {
    var options = __assign(
      {
        WebSocket: global.WebSocket ? undefined : NodeWebSocket,
        minReconnectionDelay: 1,
        reconnectOnError: true
      },
      reconnectingOptions
    )
    var ws = new ReconnectingWebSocket(url, undefined, options)
    var jrpc = new JsonRPC()
    jrpc.toStream = function(message) {
      ws.send(message)
    }
    ws.onmessage = function(e) {
      jrpc.messageHandler(e.data)
    }
    ws.onerror = function(e) {
      var error = new Error(e.message)
      if (options.reconnectOnError) {
        // Allows observer to act on web socket errors while trying to reconnect
        observer.next({
          type: 'WebSocketError',
          error: error,
          retryCount: ws.retryCount
        })
      } else {
        observer.error(error)
      }
    }
    ws.onopen = function() {
      observer.next({ type: 'WebsocketOpen' })
      jrpc.call(functionName, args).then(function(subscriptionId) {
        jrpc.on('subscription_' + subscriptionId, ['event'], function(event) {
          observer.next(event)
        })
      })
      if (functionName === 'listen') {
        jrpc.call('getMissedMessages', args).then(function(events) {
          events.map(function(event) {
            observer.next(event)
          })
        })
      }
    }
    return function() {
      ws.close(1000, '')
    }
  })
}
/**
 * Encodes URI components and returns a URL.
 * @param baseUrl base URL
 * @param params (optional) parameters for queries
 */
export var buildUrl = function(baseUrl, params) {
  if (Array.isArray(params)) {
    return params.reduce(
      function(acc, param, i) {
        return (
          '' +
          acc +
          encodeURIComponent(param) +
          (i === params.length - 1 ? '' : '/')
        )
      },
      baseUrl.endsWith('/') ? baseUrl : baseUrl + '/'
    )
  }
  if (typeof params === 'object') {
    var paramKeys = Object.keys(params)
    return paramKeys
      .filter(function(key) {
        return params[key]
      })
      .reduce(
        function(acc, paramKey) {
          return (
            '' +
            acc +
            (acc.indexOf('?') === -1 ? '?' : '&') +
            paramKey +
            '=' +
            encodeURIComponent(params[paramKey])
          )
        },
        baseUrl.endsWith('/') ? baseUrl.slice(0, baseUrl.length - 1) : baseUrl
      )
  }
  return baseUrl
}
/**
 * Returns a `trustlines://` link.
 * @param params Parameters of link.
 * @param customBase Optional custom base instead of `trustlines://`.
 */
export var createLink = function(params, customBase) {
  var base = customBase || 'trustlines://'
  return buildUrl(base, params)
}
/**
 * Returns the smallest representation of a number.
 * @param value Representation of number in biggest unit.
 * @param decimals Number of decimals.
 */
export var calcRaw = function(value, decimals) {
  var factor = new BigNumber(10).exponentiatedBy(decimals)
  return new BigNumber(value).multipliedBy(factor)
}
/**
 * Returns the biggest representation of a number.
 * @param raw Representation of number in smallest unit.
 * @param decimals Number of decimals.
 */
export var calcValue = function(raw, decimals) {
  var divisor = new BigNumber(10).exponentiatedBy(decimals)
  return new BigNumber(raw).dividedBy(divisor)
}
/**
 * Formats number into an AmountInternal object which is intended for internal use.
 * @param raw Representation of number in smallest unit.
 * @param decimals Number of decimals.
 */
export var formatToAmountInternal = function(raw, decimals) {
  return {
    decimals: decimals,
    raw: new BigNumber(raw),
    value: calcValue(raw, decimals)
  }
}
/**
 * Converts an AmountInternal to Amount object.
 * @param amount AmountInternal object.
 */
export var convertToAmount = function(amount) {
  return __assign({}, amount, {
    raw: amount.raw.toString(),
    value: amount.value.toString()
  })
}
/**
 * Formats raw representation of number into a Amount object.
 * @param raw Representation of number in smallest unit.
 * @param decimals Number of decimals.
 */
export var formatToAmount = function(raw, decimals) {
  return {
    decimals: decimals,
    raw: new BigNumber(raw).toString(),
    value: calcValue(raw, decimals).toFixed()
  }
}
/**
 * Formats number into an AmountInternal object which is intended for internal use.
 * @param raw Representation of number in smallest unit.
 * @param decimals Number of decimals.
 * @param currencyNetworkOfFees the currency network corresponding to the delegation fees
 */
export var formatToDelegationFeesInternal = function(
  raw,
  decimals,
  currencyNetworkOfFees
) {
  return {
    decimals: decimals,
    raw: new BigNumber(raw),
    value: calcValue(raw, decimals),
    currencyNetworkOfFees: currencyNetworkOfFees
  }
}
/**
 * Formats number into an AmountInternal object which is intended for internal use.
 * @param delegationFees DelegationFeesInternal object.
 */
export var convertToDelegationFees = function(delegationFees) {
  return __assign({}, delegationFees, {
    raw: delegationFees.raw.toString(),
    value: delegationFees.value.toString()
  })
}
/**
 * Formats the number values of a raw event returned by the relay.
 * @param event raw event
 * @param networkDecimals decimals of currency network
 * @param interestRateDecimals interest rate decimals of currency network
 */
export var formatEvent = function(
  event,
  networkDecimals,
  interestRateDecimals
) {
  // key names whose values are numerics and should get formatted
  var keys = [
    'amount',
    'balance',
    'given',
    'received',
    'leftGiven',
    'leftReceived',
    'interestRateGiven',
    'interestRateReceived'
  ]
  for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
    var key = keys_1[_i]
    if (event[key]) {
      event[key] = formatToAmount(
        event[key],
        key.includes('interestRate') ? interestRateDecimals : networkDecimals
      )
    }
  }
  return event
}
/**
 * Formats the number values of a raw Exchange event as returned by the relay.
 * @param exchangeEvent raw exchange event: `LogFill` or `LogCancel`
 * @param makerDecimals decimals in maker token
 * @param takerDecimals decimals in taker token
 */
export var formatExchangeEvent = function(
  exchangeEvent,
  makerDecimals,
  takerDecimals
) {
  if (exchangeEvent.type === 'LogFill') {
    var fillEventRaw = exchangeEvent
    return __assign({}, fillEventRaw, {
      filledMakerAmount: formatToAmount(
        fillEventRaw.filledMakerAmount,
        makerDecimals
      ),
      filledTakerAmount: formatToAmount(
        fillEventRaw.filledTakerAmount,
        takerDecimals
      )
    })
  } else if (exchangeEvent.type === 'LogCancel') {
    var cancelEventRaw = exchangeEvent
    return __assign({}, cancelEventRaw, {
      cancelledMakerAmount: formatToAmount(
        cancelEventRaw.cancelledMakerAmount,
        makerDecimals
      ),
      cancelledTakerAmount: formatToAmount(
        cancelEventRaw.cancelledTakerAmount,
        takerDecimals
      )
    })
  }
  throw new Error('Provided event is not a ExchangeEvent!')
}
/**
 * Checks if given address is a valid address
 * @param address ethereum address
 */
export var checkAddress = function(address) {
  if (/[A-Z]/.test(address)) {
    return ethUtils.isValidChecksumAddress(address)
  } else {
    return ethUtils.isValidAddress(address)
  }
}
/**
 * Converts eth to wei
 * @param value value in eth
 */
export var convertEthToWei = function(value) {
  var eth = new BigNumber(value)
  var wei = new BigNumber(1000000000000000000)
  return eth.times(wei).toNumber()
}
/**
 * Returns the hexdecimal representation of given decimal string. The value has to be an integer.
 * @param decimalStr Decimal string representation of number.
 */
export var convertToHexString = function(decimalStr) {
  var bigNumber = new BigNumber(decimalStr)
  if (!bigNumber.isInteger()) {
    // Non integers values can not be processed by ethereum
    throw new Error('Can not convert non integer: ' + bigNumber.toString())
  }
  var hexStr = bigNumber.toString(16)
  return ethUtils.addHexPrefix(hexStr)
}
/**
 * Generates a random number with specified decimals.
 * @param decimals Decimals which determine size of generated number.
 */
export var generateRandomNumber = function(decimals) {
  var random = BigNumber.random(decimals + 1)
  var one = new BigNumber(1)
  while (random === one) {
    random = BigNumber.random(decimals + 1)
  }
  return random.multipliedBy(new BigNumber(10).pow(decimals)).integerValue()
}
/**
 * Checks if given string is a valid url.
 * @param str String to check.
 */
export var isURL = function(str) {
  var pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
    'i'
  ) // fragment locator
  return pattern.test(str)
}
/**
 * Returns URL by concatenating protocol, host, port and path.
 * @param protocol relay api endpoint protocol
 * @param host relay api host address
 * @param port relay api port
 * @param path relay api base endpoint
 */
export var buildApiUrl = function(protocol, host, port, path) {
  return (
    protocol +
    '://' +
    host +
    (port && ':' + port) +
    (path && '/' + trimUrl(path))
  )
}
/**
 * Adds a slash to the endpoint if it does not start with it.
 * @param endpoint Endpoint to format.
 */
export var formatEndpoint = function(endpoint) {
  if (endpoint[0] !== '/') {
    return '/' + endpoint
  }
  return endpoint
}
/**
 * Trims url from slashes.
 * @param url URL to be trimmed from slashes.
 */
export var trimUrl = function(url) {
  return url
    .split('/')
    .filter(function(split) {
      return split
    })
    .join('/')
}
export default {
  buildApiUrl: buildApiUrl,
  buildUrl: buildUrl,
  calcRaw: calcRaw,
  calcValue: calcValue,
  checkAddress: checkAddress,
  convertEthToWei: convertEthToWei,
  convertToAmount: convertToAmount,
  convertToHexString: convertToHexString,
  convertToDelegationFees: convertToDelegationFees,
  createLink: createLink,
  fetchUrl: fetchUrl,
  formatEndpoint: formatEndpoint,
  formatEvent: formatEvent,
  formatExchangeEvent: formatExchangeEvent,
  formatToAmount: formatToAmount,
  formatToAmountInternal: formatToAmountInternal,
  formatToDelegationFeesInternal: formatToDelegationFeesInternal,
  generateRandomNumber: generateRandomNumber,
  isURL: isURL,
  trimUrl: trimUrl,
  websocketStream: websocketStream
}
//# sourceMappingURL=utils.js.map
