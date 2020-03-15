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
var __importStar =
  (this && this.__importStar) ||
  function(mod) {
    if (mod && mod.__esModule) return mod
    var result = {}
    if (mod != null)
      for (var k in mod)
        if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k]
    result['default'] = mod
    return result
  }
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
var ethUtils = __importStar(require('ethereumjs-util'))
var utils_1 = __importDefault(require('./utils'))
/**
 * The User class contains all user related functions, which also include wallet
 * related methods.
 */
var User = /** @class */ (function() {
  function User(params) {
    this.defaultPassword = 'ts'
    this.provider = params.provider
    this.signer = params.signer
    this.wallet = params.wallet
  }
  Object.defineProperty(User.prototype, 'address', {
    /**
     * Checksummed Ethereum address of currently loaded user/wallet.
     */
    get: function() {
      return this.wallet.address
    },
    enumerable: true,
    configurable: true
  })
  /**
   * Async `address` getter for loaded user.
   */
  User.prototype.getAddress = function() {
    return __awaiter(this, void 0, void 0, function() {
      return __generator(this, function(_a) {
        return [2 /*return*/, this.signer.getAddress()]
      })
    })
  }
  /**
   * Creates a new random wallet
   * @returns the wallet data that can be used with `loadFrom`
   */
  User.prototype.create = function() {
    return __awaiter(this, void 0, void 0, function() {
      return __generator(this, function(_a) {
        return [2 /*return*/, this.wallet.create()]
      })
    })
  }
  /**
   * Loads the given wallet data into the library
   * @param tlWalletData data of the wallet to load
   */
  User.prototype.loadFrom = function(tlWalletData) {
    return __awaiter(this, void 0, void 0, function() {
      return __generator(this, function(_a) {
        return [2 /*return*/, this.wallet.loadFrom(tlWalletData)]
      })
    })
  }
  /**
   * Returns the wallet data. Can be used with `loadFrom`
   */
  User.prototype.getWalletData = function() {
    return __awaiter(this, void 0, void 0, function() {
      return __generator(this, function(_a) {
        return [2 /*return*/, this.wallet.getWalletData()]
      })
    })
  }
  /**
   * Deploys a new identity on the chain if it has to
   */
  User.prototype.deployIdentity = function() {
    return __awaiter(this, void 0, void 0, function() {
      return __generator(this, function(_a) {
        return [2 /*return*/, this.wallet.deployIdentity()]
      })
    })
  }
  User.prototype.isIdentityDeployed = function() {
    return __awaiter(this, void 0, void 0, function() {
      return __generator(this, function(_a) {
        return [2 /*return*/, this.wallet.isIdentityDeployed()]
      })
    })
  }
  /**
   * Digitally signs a message hash with the currently loaded user/wallet.
   * @param msgHash Hash of message that should be signed.
   */
  User.prototype.signMsgHash = function(msgHash) {
    return __awaiter(this, void 0, void 0, function() {
      return __generator(this, function(_a) {
        return [2 /*return*/, this.signer.signMsgHash(msgHash)]
      })
    })
  }
  /**
   * Returns ETH balance of loaded user.
   */
  User.prototype.getBalance = function() {
    return __awaiter(this, void 0, void 0, function() {
      return __generator(this, function(_a) {
        return [2 /*return*/, this.signer.getBalance()]
      })
    })
  }
  /**
   * Encrypts a message with the public key of another user.
   * @param msg Plain text message that should get encrypted.
   * @param theirPubKey Public key of receiver of message.
   */
  User.prototype.encrypt = function(msg, theirPubKey) {
    return __awaiter(this, void 0, void 0, function() {
      return __generator(this, function(_a) {
        return [2 /*return*/, this.wallet.encrypt(msg, theirPubKey)]
      })
    })
  }
  /**
   * Decrypts an encrypted message with the private key of loaded user.
   * @param encMsg Encrypted message.
   * @param theirPubKey Public key of sender of message.
   */
  User.prototype.decrypt = function(encMsg, theirPubKey) {
    return __awaiter(this, void 0, void 0, function() {
      return __generator(this, function(_a) {
        return [2 /*return*/, this.wallet.decrypt(encMsg, theirPubKey)]
      })
    })
  }
  /**
   * Encrypts and serializes the given wallet data.
   * @param tlWalletData Wallet data to encrypt and serialize.
   * @param password Optional password to encrypt wallet with.
   *                 If not specified default password is used.
   * @param progressCallback Optional encryption progress callback.
   */
  User.prototype.encryptToSerializedKeystore = function(
    tlWalletData,
    password,
    progressCallback
  ) {
    return __awaiter(this, void 0, void 0, function() {
      return __generator(this, function(_a) {
        return [
          2 /*return*/,
          this.wallet.encryptToSerializedKeystore(
            tlWalletData,
            typeof password === 'string' ? password : this.defaultPassword,
            typeof password === 'function' ? password : progressCallback
          )
        ]
      })
    })
  }
  /**
   * Returns the 12 word seed of loaded user.
   */
  User.prototype.showSeed = function() {
    return __awaiter(this, void 0, void 0, function() {
      return __generator(this, function(_a) {
        return [2 /*return*/, this.wallet.showSeed()]
      })
    })
  }
  /**
   * Returns the private key of loaded user.
   */
  User.prototype.exportPrivateKey = function() {
    return __awaiter(this, void 0, void 0, function() {
      return __generator(this, function(_a) {
        return [2 /*return*/, this.wallet.exportPrivateKey()]
      })
    })
  }
  /**
   * Recovers wallet data from a serialized encrypted JSON keystore string
   * (e.g. as returned by `encryptToSerializedKeystore`).
   * @param serializedEncryptedKeystore Serialized standard JSON keystore.
   * @param password Password to decrypt serialized JSON keystore with.
   * @param progressCallback Optional progress callback to call on encryption progress.
   * @returns the wallet data. Can be used with `loadFrom`
   */
  User.prototype.recoverFromEncryptedKeystore = function(
    serializedEncryptedKeystore,
    password,
    progressCallback
  ) {
    return __awaiter(this, void 0, void 0, function() {
      return __generator(this, function(_a) {
        return [
          2 /*return*/,
          this.wallet.recoverFromEncryptedKeystore(
            serializedEncryptedKeystore,
            password,
            progressCallback
          )
        ]
      })
    })
  }
  /**
   * Recovers wallet data from 12 word seed phrase.
   * @param seed 12 word seed phrase string.
   * @returns the wallet data. Can be used with `loadFrom`
   */
  User.prototype.recoverFromSeed = function(seed) {
    return __awaiter(this, void 0, void 0, function() {
      return __generator(this, function(_a) {
        return [2 /*return*/, this.wallet.recoverFromSeed(seed)]
      })
    })
  }
  /**
   * Recovers wallet data from private key.
   * @param privateKey Private key to recover wallet data from.
   * @returns wallet data. Can be used with `loadFrom`
   */
  User.prototype.recoverFromPrivateKey = function(privateKey) {
    return __awaiter(this, void 0, void 0, function() {
      return __generator(this, function(_a) {
        return [2 /*return*/, this.wallet.recoverFromPrivateKey(privateKey)]
      })
    })
  }
  /**
   * Returns a shareable link which can be send to other users.
   * Contains username and address.
   * @param username Custom username.
   * @param customBase Optional custom base for link. Default `trustlines://`.
   */
  User.prototype.createLink = function(username, customBase) {
    var params = ['contact', this.address, username]
    return utils_1.default.createLink(params, customBase)
  }
  /**
   * @hidden
   * Gives some ETH to requesting address.
   * NOTE: Used only for dev purposes.
   */
  User.prototype.requestEth = function() {
    return __awaiter(this, void 0, void 0, function() {
      var options
      return __generator(this, function(_a) {
        options = {
          body: JSON.stringify({ address: this.address }),
          headers: new Headers({ 'Content-Type': 'application/json' }),
          method: 'POST'
        }
        return [
          2 /*return*/,
          this.provider.fetchEndpoint('request-ether', options)
        ]
      })
    })
  }
  /**
   * @hidden
   * Verifies a signature.
   * @param message Signed message
   * @param signature Digital signature
   */
  User.prototype.verifySignature = function(message, signature) {
    var r = ethUtils.toBuffer(signature.slice(0, 66))
    var s = ethUtils.toBuffer('0x' + signature.slice(66, 130))
    var v = ethUtils.bufferToInt(
      ethUtils.toBuffer('0x' + signature.slice(130, 132))
    )
    var m = ethUtils.sha3(JSON.stringify(message))
    var pub = ethUtils.ecrecover(m, v, r, s)
    var adr = '0x' + ethUtils.pubToAddress(pub).toString('hex')
    return message.address === adr
  }
  return User
})()
exports.User = User
//# sourceMappingURL=User.js.map
