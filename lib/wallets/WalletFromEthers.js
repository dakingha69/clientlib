"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
Object.defineProperty(exports, "__esModule", { value: true });
var ethers_1 = require("ethers");
var TLWallet_1 = require("./TLWallet");
/**
 * This is a wrapper class for `ethers.Wallet`. It allows us to customize some of the methods provided by
 * `ethers.Wallet`. We also use this to add some conversion methods adapted to our internal types.
 */
var WalletFromEthers = /** @class */ (function (_super) {
    __extends(WalletFromEthers, _super);
    function WalletFromEthers(privateKey, mnemonic) {
        var _this = this;
        var signingKeyFromEthers = new ethers_1.ethers.utils.SigningKey(privateKey);
        // @ts-ignore
        signingKeyFromEthers.mnemonic = mnemonic;
        // @ts-ignore
        signingKeyFromEthers.path = TLWallet_1.DEFAULT_DERIVATION_PATH;
        _this = _super.call(this, signingKeyFromEthers) || this;
        return _this;
    }
    WalletFromEthers.fromWalletData = function (walletData) {
        var signingKey = walletData.meta.signingKey;
        var privateKey = signingKey.privateKey, mnemonic = signingKey.mnemonic;
        return new this(privateKey, mnemonic);
    };
    WalletFromEthers.createRandom = function () {
        var _a = _super.createRandom.call(this), privateKey = _a.privateKey, mnemonic = _a.mnemonic;
        return new this(privateKey, mnemonic);
    };
    WalletFromEthers.fromEncryptedJson = function (encryptedJson, password, progressCallback) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, privateKey, mnemonic;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, _super.fromEncryptedJson.call(this, encryptedJson, password, progressCallback)];
                    case 1:
                        _a = _b.sent(), privateKey = _a.privateKey, mnemonic = _a.mnemonic;
                        return [2 /*return*/, new this(privateKey, mnemonic)];
                }
            });
        });
    };
    WalletFromEthers.fromMnemonic = function (mnemonic) {
        var privateKey = _super.fromMnemonic.call(this, mnemonic).privateKey;
        return new this(privateKey, mnemonic);
    };
    WalletFromEthers.prototype.toEthersWalletData = function () {
        return {
            address: this.address,
            version: TLWallet_1.TL_WALLET_VERSION,
            type: TLWallet_1.WALLET_TYPE_ETHERS,
            meta: {
                signingKey: {
                    mnemonic: this.mnemonic,
                    privateKey: this.privateKey
                }
            }
        };
    };
    WalletFromEthers.prototype.toIdentityWalletData = function (identityAddress) {
        return {
            address: identityAddress,
            version: TLWallet_1.TL_WALLET_VERSION,
            type: TLWallet_1.WALLET_TYPE_IDENTITY,
            meta: {
                signingKey: {
                    mnemonic: this.mnemonic,
                    privateKey: this.privateKey
                }
            }
        };
    };
    return WalletFromEthers;
}(ethers_1.ethers.Wallet));
exports.WalletFromEthers = WalletFromEthers;
//# sourceMappingURL=WalletFromEthers.js.map