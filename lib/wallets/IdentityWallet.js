"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ethereumjs_util_1 = require("ethereumjs-util");
var ethers_1 = require("ethers");
var TLWallet_1 = require("./TLWallet");
var WalletFromEthers_1 = require("./WalletFromEthers");
var utils_1 = __importDefault(require("../utils"));
// This is the proxy initcode without the address of the owner but with added 0s so that we only need to append the address to it
var initcodeWithPadding = '0x608060405234801561001057600080fd5b506040516020806102788339810180604052602081101561003057600080fd5b5050610237806100416000396000f3fe6080604052600436106100295760003560e01c80635c60da1b1461005c578063d784d4261461008d575b600080546040516001600160a01b0390911691369082376000803683855af43d6000833e808015610058573d83f35b3d83fd5b34801561006857600080fd5b506100716100c2565b604080516001600160a01b039092168252519081900360200190f35b34801561009957600080fd5b506100c0600480360360208110156100b057600080fd5b50356001600160a01b03166100d1565b005b6000546001600160a01b031681565b6000546001600160a01b031661010e576000805473ffffffffffffffffffffffffffffffffffffffff19166001600160a01b03831617905561018f565b333014610166576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252603d8152602001806101cf603d913960400191505060405180910390fd5b6000805473ffffffffffffffffffffffffffffffffffffffff19166001600160a01b0383161790555b604080516001600160a01b038316815290517f11135eea714a7c1c3b9aebf3d31bbd295f7e7262960215e086849c191d45bddc9181900360200190a15056fe54686520696d706c656d656e746174696f6e2063616e206f6e6c79206265206368616e6765642062792074686520636f6e747261637420697473656c66a165627a7a72305820c05430d1d23a2f20ae202c4f5166b959e7e02eedd737b69d7ccdc2b9697b2b180029000000000000000000000000';
var IdentityWallet = /** @class */ (function () {
    function IdentityWallet(provider, _a) {
        var identityFactoryAddress = _a.identityFactoryAddress, identityImplementationAddress = _a.identityImplementationAddress;
        this.identityFactoryAddress = identityFactoryAddress;
        this.identityImplementationAddress = identityImplementationAddress;
        this.provider = provider;
    }
    Object.defineProperty(IdentityWallet.prototype, "address", {
        get: function () {
            if (!this.walletFromEthers) {
                throw new Error('No wallet loaded.');
            }
            return this.identityAddress;
        },
        enumerable: true,
        configurable: true
    });
    IdentityWallet.prototype.getAddress = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!this.walletFromEthers) {
                    throw new Error('No wallet loaded.');
                }
                return [2 /*return*/, this.address];
            });
        });
    };
    IdentityWallet.prototype.getWalletData = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!this.walletFromEthers) {
                    throw new Error('No wallet loaded.');
                }
                return [2 /*return*/, this.walletFromEthers.toIdentityWalletData(this.identityAddress)];
            });
        });
    };
    IdentityWallet.prototype.getBalance = function () {
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
                        return [2 /*return*/, utils_1.default.formatToAmount(utils_1.default.calcRaw(balance, 18), 18)];
                }
            });
        });
    };
    /**
     * Creates wallet data of type `identity`.
     */
    IdentityWallet.prototype.create = function () {
        return __awaiter(this, void 0, void 0, function () {
            var walletFromEthers, identityAddress;
            return __generator(this, function (_a) {
                walletFromEthers = WalletFromEthers_1.WalletFromEthers.createRandom();
                identityAddress = calculateIdentityAddress(this.identityFactoryAddress, walletFromEthers.address);
                return [2 /*return*/, walletFromEthers.toIdentityWalletData(identityAddress)];
            });
        });
    };
    /**
     * Deploys a new identity contract on the chain
     */
    IdentityWallet.prototype.deployIdentity = function () {
        return __awaiter(this, void 0, void 0, function () {
            var messageHash, signature, deployIdentityEndpoint, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        messageHash = ethers_1.utils.solidityKeccak256(['bytes1', 'bytes1', 'address', 'address'], [
                            '0x19',
                            '0x00',
                            this.identityFactoryAddress,
                            this.identityImplementationAddress
                        ]);
                        return [4 /*yield*/, this.rawSignHash(messageHash)];
                    case 1:
                        signature = _a.sent();
                        deployIdentityEndpoint = 'identities';
                        return [4 /*yield*/, this.provider.postToEndpoint(deployIdentityEndpoint, {
                                implementationAddress: this.identityImplementationAddress,
                                factoryAddress: this.identityFactoryAddress,
                                signature: signature
                            })];
                    case 2:
                        response = _a.sent();
                        if (this.address !== response.identity) {
                            throw new Error("Delegate did not deploy the right identity contract. Deployed " + response.identity + " instead of " + this.address);
                        }
                        return [2 /*return*/, this.address];
                }
            });
        });
    };
    IdentityWallet.prototype.isIdentityDeployed = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.provider.fetchEndpoint("/identities/" + this.address)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, true];
                    case 2:
                        error_1 = _a.sent();
                        if (error_1.message.includes('Status 404') &&
                            error_1.message.includes('Contract not found')) {
                            return [2 /*return*/, false];
                        }
                        else {
                            throw error_1;
                        }
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Loads given wallet data of type `identity`.
     * @param walletData Wallet data of type `identity`.
     */
    IdentityWallet.prototype.loadFrom = function (walletData) {
        return __awaiter(this, void 0, void 0, function () {
            var walletFromEthers;
            return __generator(this, function (_a) {
                TLWallet_1.verifyWalletData(walletData, TLWallet_1.WALLET_TYPE_IDENTITY, TLWallet_1.EXPECTED_VERSIONS);
                walletFromEthers = WalletFromEthers_1.WalletFromEthers.fromWalletData(walletData);
                this.walletFromEthers = walletFromEthers;
                this.identityAddress = walletData.address;
                return [2 /*return*/];
            });
        });
    };
    /**
     * Recovers wallet data from a serialized encrypted ethereum JSON keystore v3
     * (e.g. as returned by `encryptToSerializedKeystore`).
     * @param serializedEncryptedKeystore Serialized encrypted ethereum JSON keystore v3.
     * @param password Password to decrypt serialized encrypted ethereum JSON keystore v3 with.
     * @param progressCallback Callback function for decryption progress.
     */
    IdentityWallet.prototype.recoverFromEncryptedKeystore = function (serializedEncryptedKeystore, password, progressCallback) {
        return __awaiter(this, void 0, void 0, function () {
            var walletFromEthers, identityAddress;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, WalletFromEthers_1.WalletFromEthers.fromEncryptedJson(serializedEncryptedKeystore, password, typeof progressCallback === 'function' && progressCallback)];
                    case 1:
                        walletFromEthers = _a.sent();
                        identityAddress = calculateIdentityAddress(this.identityFactoryAddress, walletFromEthers.address);
                        return [2 /*return*/, walletFromEthers.toIdentityWalletData(identityAddress)];
                }
            });
        });
    };
    /**
     * Recovers wallet data from mnemonic phrase.
     * @param seed Mnemonic seed phrase.
     */
    IdentityWallet.prototype.recoverFromSeed = function (seed) {
        return __awaiter(this, void 0, void 0, function () {
            var walletFromEthers, identityAddress;
            return __generator(this, function (_a) {
                walletFromEthers = WalletFromEthers_1.WalletFromEthers.fromMnemonic(seed);
                identityAddress = calculateIdentityAddress(this.identityFactoryAddress, walletFromEthers.address);
                return [2 /*return*/, walletFromEthers.toIdentityWalletData(identityAddress)];
            });
        });
    };
    /**
     * Recovers wallet data from private key.
     * Note that mnemonic and derivation path is `undefined` here.
     * @param privateKey Private key to recover wallet data from.
     */
    IdentityWallet.prototype.recoverFromPrivateKey = function (privateKey) {
        return __awaiter(this, void 0, void 0, function () {
            var walletFromEthers, identityAddress;
            return __generator(this, function (_a) {
                walletFromEthers = new WalletFromEthers_1.WalletFromEthers(privateKey);
                identityAddress = calculateIdentityAddress(this.identityFactoryAddress, walletFromEthers.address);
                return [2 /*return*/, walletFromEthers.toIdentityWalletData(identityAddress)];
            });
        });
    };
    /**
     * Returns a `Promise` with the mnemonic seed phrase of loaded user.
     */
    IdentityWallet.prototype.showSeed = function () {
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
    IdentityWallet.prototype.exportPrivateKey = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!this.walletFromEthers) {
                    throw new Error('No wallet loaded.');
                }
                return [2 /*return*/, this.walletFromEthers.privateKey];
            });
        });
    };
    IdentityWallet.prototype.encrypt = function (msg, theirPubKey) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                throw new Error('Method not implemented.');
            });
        });
    };
    IdentityWallet.prototype.decrypt = function (encMsg, theirPubKey) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                throw new Error('Method not implemented.');
            });
        });
    };
    IdentityWallet.prototype.signMsgHash = function (msgHash) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                throw new Error('Method not implemented.');
            });
        });
    };
    IdentityWallet.prototype.signMessage = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                throw new Error('Method not implemented.');
            });
        });
    };
    /**
     * Takes a raw transaction object, turns it into a meta-transaction signed by
     * the loaded user and relays the transaction.
     * @param rawTx Raw transaction object.
     * @returns the hash of the meta-transaction
     */
    IdentityWallet.prototype.confirm = function (rawTx) {
        return __awaiter(this, void 0, void 0, function () {
            var metaTransaction;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.verifyFromField(rawTx);
                        metaTransaction = this.buildMetaTransaction(rawTx);
                        return [4 /*yield*/, this.signMetaTransaction(metaTransaction)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this.provider.sendSignedMetaTransaction(metaTransaction)];
                }
            });
        });
    };
    IdentityWallet.prototype.signMetaTransaction = function (metaTransaction) {
        return __awaiter(this, void 0, void 0, function () {
            var types, values, metaTransactionHash, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.walletFromEthers) {
                            throw new Error('No wallet loaded.');
                        }
                        types = [
                            'bytes1',
                            'bytes1',
                            'address',
                            'address',
                            'uint256',
                            'bytes32',
                            'uint64',
                            'address',
                            'uint256',
                            'bytes'
                        ];
                        values = [
                            '0x19',
                            '0x00',
                            metaTransaction.from,
                            metaTransaction.to,
                            metaTransaction.value,
                            ethers_1.utils.solidityKeccak256(['bytes'], [metaTransaction.data]),
                            metaTransaction.delegationFees,
                            metaTransaction.currencyNetworkOfFees,
                            metaTransaction.nonce,
                            metaTransaction.extraData
                        ];
                        metaTransactionHash = ethers_1.utils.solidityKeccak256(types, values);
                        _a = metaTransaction;
                        return [4 /*yield*/, this.rawSignHash(metaTransactionHash)];
                    case 1:
                        _a.signature = _b.sent();
                        return [2 /*return*/, metaTransactionHash];
                }
            });
        });
    };
    IdentityWallet.prototype.getTxInfos = function (userAddress) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.provider.getMetaTxInfos(userAddress)];
            });
        });
    };
    IdentityWallet.prototype.getMetaTxFees = function (rawTx) {
        return __awaiter(this, void 0, void 0, function () {
            var metaTx;
            return __generator(this, function (_a) {
                this.verifyFromField(rawTx);
                metaTx = this.buildMetaTransaction(rawTx);
                return [2 /*return*/, this.provider.getMetaTxFees(metaTx)];
            });
        });
    };
    /**
     * Returns a serialized encrypted ethereum JSON keystore v3.
     * @param walletData Wallet data of type `identity`.
     * @param password Password to encrypt wallet data.
     * @param progressCallback Optional encryption progress callback.
     */
    IdentityWallet.prototype.encryptToSerializedKeystore = function (walletData, password, progressCallback) {
        return __awaiter(this, void 0, void 0, function () {
            var walletFromEthers, encryptedKeystore;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        walletFromEthers = WalletFromEthers_1.WalletFromEthers.fromWalletData(walletData);
                        return [4 /*yield*/, walletFromEthers.encrypt(password, typeof progressCallback === 'function' && progressCallback)];
                    case 1:
                        encryptedKeystore = _a.sent();
                        return [2 /*return*/, encryptedKeystore];
                }
            });
        });
    };
    /**
     * Takes a string hash and signs it using the loaded wallet without appending `\x19Ethereum Signed Message:\n` to it
     * and hashing it again, contrary to what ethers.sign or ethers.signMessage does.
     * @param hash The hash to sign.
     */
    IdentityWallet.prototype.rawSignHash = function (hash) {
        return __awaiter(this, void 0, void 0, function () {
            var expectedHashLength, signingKey, signature, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        expectedHashLength = (256 / 8) * 2 + 2;
                        if (hash.length !== expectedHashLength) {
                            throw new Error("The input hash given is not a hash hex string prefixed with \"0x\": " + hash);
                        }
                        signingKey = new ethers_1.utils.SigningKey(this.walletFromEthers.privateKey);
                        _b = (_a = ethers_1.utils).joinSignature;
                        return [4 /*yield*/, signingKey.signDigest(hash)];
                    case 1:
                        signature = _b.apply(_a, [_c.sent()]);
                        return [2 /*return*/, signature];
                }
            });
        });
    };
    IdentityWallet.prototype.verifyFromField = function (rawTx) {
        if (!(rawTx.from === this.address)) {
            throw new Error("The from field of the meta-transaction has to match with the address of the identity, from: " + rawTx.from);
        }
    };
    IdentityWallet.prototype.buildMetaTransaction = function (rawTx) {
        var metaTransaction = {
            data: rawTx.data || '0x',
            extraData: '0x',
            from: rawTx.from,
            nonce: rawTx.nonce.toString(),
            to: rawTx.to,
            value: rawTx.value.toString(),
            delegationFees: (rawTx.delegationFees || 0).toString(),
            currencyNetworkOfFees: rawTx.currencyNetworkOfFees || rawTx.to
        };
        return metaTransaction;
    };
    return IdentityWallet;
}());
exports.IdentityWallet = IdentityWallet;
function calculateIdentityAddress(factoryAddress, ownerAddress) {
    if (!ethereumjs_util_1.isValidAddress(factoryAddress)) {
        throw new Error("Invalid factory address: " + factoryAddress);
    }
    if (!ethereumjs_util_1.isValidAddress(ownerAddress)) {
        throw new Error("Invalid owner address: " + ownerAddress);
    }
    var initCode = initcodeWithPadding + ownerAddress.slice(2);
    var initCodeHash = ethers_1.utils.solidityKeccak256(['bytes'], [initCode]);
    // address = keccak256( 0xff ++ address ++ salt ++ keccak256(init_code))[12:]
    var address = '0x' +
        ethers_1.utils
            .solidityKeccak256(['bytes1', 'address', 'uint', 'bytes32'], ['0xff', factoryAddress, 0, initCodeHash])
            .slice(2 + 2 * 12);
    return ethereumjs_util_1.toChecksumAddress(address);
}
exports.calculateIdentityAddress = calculateIdentityAddress;
//# sourceMappingURL=IdentityWallet.js.map