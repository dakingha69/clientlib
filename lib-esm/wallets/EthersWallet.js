var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { BigNumber } from 'bignumber.js';
import { utils as ethersUtils } from 'ethers';
import { EXPECTED_VERSIONS, verifyWalletData, WALLET_TYPE_ETHERS } from './TLWallet';
import { WalletFromEthers } from './WalletFromEthers';
import utils from '../utils';
/**
 * The EthersWallet class contains wallet related methods.
 */
var EthersWallet = /** @class */ (function () {
    function EthersWallet(provider) {
        this.provider = provider;
    }
    Object.defineProperty(EthersWallet.prototype, "address", {
        ///////////////
        // Accessors //
        ///////////////
        get: function () {
            if (!this.walletFromEthers) {
                throw new Error('No wallet loaded.');
            }
            return this.walletFromEthers.address;
        },
        enumerable: true,
        configurable: true
    });
    EthersWallet.prototype.getAddress = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!this.walletFromEthers) {
                    throw new Error('No wallet loaded.');
                }
                return [2 /*return*/, this.address];
            });
        });
    };
    EthersWallet.prototype.getWalletData = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!this.walletFromEthers) {
                    throw new Error('No wallet loaded.');
                }
                return [2 /*return*/, this.walletFromEthers.toEthersWalletData()];
            });
        });
    };
    ////////////////////////
    // Creating Instances //
    ////////////////////////
    /**
     * Creates wallet data of type `ethers`.
     */
    EthersWallet.prototype.create = function () {
        return __awaiter(this, void 0, void 0, function () {
            var walletFromEthers;
            return __generator(this, function (_a) {
                walletFromEthers = WalletFromEthers.createRandom();
                return [2 /*return*/, walletFromEthers.toEthersWalletData()];
            });
        });
    };
    /**
     * Deploys a new identity contract on the chain
     */
    EthersWallet.prototype.deployIdentity = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // This does not have to deploy any identity, because it does not have it
                return [2 /*return*/, this.address];
            });
        });
    };
    EthersWallet.prototype.isIdentityDeployed = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, true];
            });
        });
    };
    /**
     * Encrypts and serializes the given wallet data.
     * @param walletData Wallet data of type `ethers`.
     * @param password Password to encrypt wallet data with.
     * @param progressCallback Optional encryption progress callback.
     * @returns Serialized encrypted ethereum JSON keystore v3.
     */
    EthersWallet.prototype.encryptToSerializedKeystore = function (walletData, password, progressCallback) {
        return __awaiter(this, void 0, void 0, function () {
            var walletFromEthers, encryptedKeystore;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        walletFromEthers = WalletFromEthers.fromWalletData(walletData);
                        return [4 /*yield*/, walletFromEthers.encrypt(password, typeof progressCallback === 'function' && progressCallback)];
                    case 1:
                        encryptedKeystore = _a.sent();
                        return [2 /*return*/, encryptedKeystore];
                }
            });
        });
    };
    /**
     * Loads given wallet data of type `ethers`.
     * @param walletData Wallet data of type `ethers`.
     */
    EthersWallet.prototype.loadFrom = function (walletData) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                verifyWalletData(walletData, WALLET_TYPE_ETHERS, EXPECTED_VERSIONS);
                this.walletFromEthers = WalletFromEthers.fromWalletData(walletData);
                return [2 /*return*/];
            });
        });
    };
    /**
     * Recovers wallet data from a serialized encrypted ethereum JSON keystore v3
     * (e.g. as returned by `encryptToSerializedKeystore`).
     * @param serializedEncryptedKeystore Serialized encrypted ethereum JSON keystore v3.
     * @param password Password to decrypt encrypted ethereum JSON keystore v3.
     * @param progressCallback Callback function for decryption progress.
     */
    EthersWallet.prototype.recoverFromEncryptedKeystore = function (serializedEncryptedKeystore, password, progressCallback) {
        return __awaiter(this, void 0, void 0, function () {
            var walletFromEthers;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, WalletFromEthers.fromEncryptedJson(serializedEncryptedKeystore, password, typeof progressCallback === 'function' && progressCallback)];
                    case 1:
                        walletFromEthers = _a.sent();
                        return [2 /*return*/, walletFromEthers.toEthersWalletData()];
                }
            });
        });
    };
    /**
     * Recovers wallet data from mnemonic phrase.
     * @param seed Mnemonic seed phrase.
     */
    EthersWallet.prototype.recoverFromSeed = function (seed) {
        return __awaiter(this, void 0, void 0, function () {
            var walletFromEthers;
            return __generator(this, function (_a) {
                walletFromEthers = WalletFromEthers.fromMnemonic(seed);
                return [2 /*return*/, walletFromEthers.toEthersWalletData()];
            });
        });
    };
    /**
     * Recovers wallet data from private key.
     * Note that mnemonic and derivation path is `undefined` here.
     * @param privateKey Private key to recover wallet data from.
     */
    EthersWallet.prototype.recoverFromPrivateKey = function (privateKey) {
        return __awaiter(this, void 0, void 0, function () {
            var walletFromEthers;
            return __generator(this, function (_a) {
                walletFromEthers = new WalletFromEthers(privateKey);
                return [2 /*return*/, walletFromEthers.toEthersWalletData()];
            });
        });
    };
    /////////////
    // Signing //
    /////////////
    /**
     * Signs given hex hash of message with loaded wallet.
     * @param msgHash Hash of message to sign.
     */
    EthersWallet.prototype.signMsgHash = function (msgHash) {
        return __awaiter(this, void 0, void 0, function () {
            var msgHashBytes;
            return __generator(this, function (_a) {
                if (!this.walletFromEthers) {
                    throw new Error('No wallet loaded.');
                }
                if (!ethersUtils.isHexString(msgHash)) {
                    throw new Error('Message hash is not a valid hex string.');
                }
                msgHashBytes = ethersUtils.arrayify(msgHash);
                return [2 /*return*/, this.signMessage(msgHashBytes)];
            });
        });
    };
    /**
     * Signs given message with loaded wallet.
     * @param message Message to sign.
     */
    EthersWallet.prototype.signMessage = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            var flatFormatSignature, _a, r, s, v;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.walletFromEthers) {
                            throw new Error('No wallet loaded.');
                        }
                        return [4 /*yield*/, this.walletFromEthers.signMessage(message)];
                    case 1:
                        flatFormatSignature = _b.sent();
                        _a = ethersUtils.splitSignature(flatFormatSignature), r = _a.r, s = _a.s, v = _a.v;
                        return [2 /*return*/, {
                                concatSig: flatFormatSignature,
                                ecSignature: { r: r, s: s, v: v }
                            }];
                }
            });
        });
    };
    /**
     * Takes a raw transaction object, turns it into a RLP encoded hex string, signs it with
     * the loaded user and relays the transaction.
     * @param rawTx Raw transaction object.
     */
    EthersWallet.prototype.confirm = function (rawTx) {
        return __awaiter(this, void 0, void 0, function () {
            var signedTransaction;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.walletFromEthers) {
                            throw new Error('No wallet loaded.');
                        }
                        return [4 /*yield*/, this.walletFromEthers.sign({
                                data: rawTx.data,
                                gasLimit: ethersUtils.bigNumberify(rawTx.gasLimit instanceof BigNumber
                                    ? rawTx.gasLimit.toString()
                                    : rawTx.gasLimit),
                                gasPrice: ethersUtils.bigNumberify(rawTx.gasPrice instanceof BigNumber
                                    ? rawTx.gasPrice.toString()
                                    : rawTx.gasPrice),
                                nonce: rawTx.nonce,
                                to: rawTx.to,
                                value: ethersUtils.bigNumberify(rawTx.value instanceof BigNumber ? rawTx.value.toString() : rawTx.value)
                            })];
                    case 1:
                        signedTransaction = _a.sent();
                        return [2 /*return*/, this.provider.sendSignedTransaction(signedTransaction)];
                }
            });
        });
    };
    /////////////
    // Account //
    /////////////
    /**
     * Returns a `Promise` with the balance of loaded user.
     */
    EthersWallet.prototype.getBalance = function () {
        return __awaiter(this, void 0, void 0, function () {
            var balance;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.walletFromEthers) {
                            throw new Error('No wallet loaded.');
                        }
                        return [4 /*yield*/, this.provider.fetchEndpoint("users/" + this.address + "/balance")];
                    case 1:
                        balance = _a.sent();
                        return [2 /*return*/, utils.formatToAmount(utils.calcRaw(balance, 18), 18)];
                }
            });
        });
    };
    /**
     * Returns a `Promise` with the mnemonic seed phrase of loaded user.
     * Note that the returned seed is `undefined` for accounts recovered by a private key
     * or serialized encrypted keystores that were not created with `ethers`.
     */
    EthersWallet.prototype.showSeed = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!this.walletFromEthers) {
                    throw new Error('No wallet loaded.');
                }
                return [2 /*return*/, this.walletFromEthers.mnemonic];
            });
        });
    };
    /**
     * Returns a `Promise` with the private key of loaded user.
     */
    EthersWallet.prototype.exportPrivateKey = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!this.walletFromEthers) {
                    throw new Error('No wallet loaded.');
                }
                return [2 /*return*/, this.walletFromEthers.privateKey];
            });
        });
    };
    /////////////////////////////
    // Encryption / Decryption //
    /////////////////////////////
    EthersWallet.prototype.encrypt = function (msg, theirPubKey) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                throw new Error('Method not implemented.');
            });
        });
    };
    EthersWallet.prototype.decrypt = function (encMsg, theirPubKey) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                throw new Error('Method not implemented.');
            });
        });
    };
    EthersWallet.prototype.getTxInfos = function (userAddress) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.provider.getTxInfos(userAddress)];
            });
        });
    };
    EthersWallet.prototype.getMetaTxFees = function (rawTx) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, {
                        delegationFees: '0',
                        currencyNetworkOfFees: ''
                    }];
            });
        });
    };
    return EthersWallet;
}());
export { EthersWallet };
//# sourceMappingURL=EthersWallet.js.map