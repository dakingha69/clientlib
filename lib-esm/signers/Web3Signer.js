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
import { ethers } from 'ethers';
import * as utils from '../utils';
/**
 * The Web3Signer class contains functions for signing transactions with a web3 provider.
 */
var Web3Signer = /** @class */ (function () {
    function Web3Signer(web3Provider) {
        this.web3Provider = web3Provider;
        this.signer = web3Provider.getSigner();
    }
    /**
     * Returns `Promise` with address of signer.
     */
    Web3Signer.prototype.getAddress = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!this.signer) {
                    throw new Error('No signer set.');
                }
                return [2 /*return*/, this.signer.getAddress()];
            });
        });
    };
    /**
     * Returns `Promise` with balance of signer.
     */
    Web3Signer.prototype.getBalance = function () {
        return __awaiter(this, void 0, void 0, function () {
            var balance;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.signer) {
                            throw new Error('No signer set.');
                        }
                        return [4 /*yield*/, this.signer.getBalance()];
                    case 1:
                        balance = (_a.sent()).toString();
                        return [2 /*return*/, {
                                decimals: 18,
                                raw: balance,
                                value: utils.calcValue(balance, 18).toString()
                            }];
                }
            });
        });
    };
    /**
     * Signs a transaction and returns `Promise` with transaction hash.
     * @param rawTx Raw transaction object.
     */
    Web3Signer.prototype.confirm = function (rawTx) {
        return __awaiter(this, void 0, void 0, function () {
            var hash;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.signer) {
                            throw new Error('No signer set.');
                        }
                        return [4 /*yield*/, this.signer.sendTransaction({
                                data: rawTx.data,
                                gasLimit: ethers.utils.bigNumberify(rawTx.gasLimit instanceof BigNumber
                                    ? rawTx.gasLimit.toString()
                                    : rawTx.gasLimit),
                                gasPrice: ethers.utils.bigNumberify(rawTx.gasPrice instanceof BigNumber
                                    ? rawTx.gasPrice.toString()
                                    : rawTx.gasPrice),
                                nonce: rawTx.nonce,
                                to: rawTx.to,
                                value: ethers.utils.bigNumberify(rawTx.value instanceof BigNumber ? rawTx.value.toString() : rawTx.value)
                            })];
                    case 1:
                        hash = (_a.sent()).hash;
                        return [2 /*return*/, hash];
                }
            });
        });
    };
    /**
     * Signs the given message and returns `Promise` with signature.
     * @param message Message to sign.
     */
    Web3Signer.prototype.signMessage = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            var flatSignature, _a, r, s, v;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.signer) {
                            throw new Error('No signer set.');
                        }
                        return [4 /*yield*/, this.signer.signMessage(message)];
                    case 1:
                        flatSignature = _b.sent();
                        _a = ethers.utils.splitSignature(flatSignature), r = _a.r, s = _a.s, v = _a.v;
                        return [2 /*return*/, {
                                concatSig: flatSignature,
                                ecSignature: { r: r, s: s, v: v }
                            }];
                }
            });
        });
    };
    /**
     * Signs the given message hash and return `Promise` with signature.
     * @param msgHash Hash of message to sign.
     */
    Web3Signer.prototype.signMsgHash = function (msgHash) {
        return __awaiter(this, void 0, void 0, function () {
            var msgHashBytes;
            return __generator(this, function (_a) {
                if (!this.signer) {
                    throw new Error('No signer set.');
                }
                if (!ethers.utils.isHexString(msgHash)) {
                    throw new Error('Message hash is not a valid hex string.');
                }
                msgHashBytes = ethers.utils.arrayify(msgHash);
                return [2 /*return*/, this.signMessage(msgHashBytes)];
            });
        });
    };
    Web3Signer.prototype.getTxInfos = function (userAddress) {
        return __awaiter(this, void 0, void 0, function () {
            var balanceString, nonce, gasPriceString, gasPrice, balance;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.web3Provider.getBalance(userAddress)];
                    case 1:
                        balanceString = (_a.sent()).toString();
                        return [4 /*yield*/, this.web3Provider.getTransactionCount(userAddress)];
                    case 2:
                        nonce = _a.sent();
                        return [4 /*yield*/, this.web3Provider.getGasPrice()];
                    case 3:
                        gasPriceString = (_a.sent()).toString();
                        gasPrice = new BigNumber(gasPriceString);
                        balance = new BigNumber(balanceString);
                        return [2 /*return*/, { balance: balance, gasPrice: gasPrice, nonce: nonce }];
                }
            });
        });
    };
    Web3Signer.prototype.getMetaTxFees = function (rawTx) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, {
                        delegationFees: '0',
                        currencyNetworkOfFees: ''
                    }];
            });
        });
    };
    return Web3Signer;
}());
export { Web3Signer };
//# sourceMappingURL=Web3Signer.js.map