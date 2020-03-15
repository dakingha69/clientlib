var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
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
import utils from './utils';
import { FeePayer, isFeePayerValue } from './typings';
/**
 * The Payment class contains all payment related functions. This includes
 * trustline transfers and normal ETH transfers.
 */
var Payment = /** @class */ (function () {
    function Payment(params) {
        this.event = params.event;
        this.user = params.user;
        this.transaction = params.transaction;
        this.currencyNetwork = params.currencyNetwork;
        this.provider = params.provider;
    }
    /**
     * Prepares ethereum transaction object for a trustlines transfer, where loaded user is sender.
     * @param networkAddress Address of a currency network.
     * @param receiverAddress Address of receiver of transfer.
     * @param value Amount to transfer in biggest unit,
     *              i.e. 1.5 if currency network has 2 decimals.
     * @param options Optional payment options. See `PaymentOptions` for more information.
     * @param options.networkDecimals Decimals of currency network can be provided manually.
     * @param options.maximumHops Max. number of hops for transfer.
     * @param options.maximumFees Max. transfer fees user is willing to pay.
     * @param options.gasPrice Custom gas price.
     * @param options.gasLimit Custom gas limit.
     * @param options.feePayer Either `sender` or `receiver`. Specifies who pays network fees.
     * @param options.extraData Extra data that will appear in the Transfer event when successful.
     */
    Payment.prototype.prepare = function (networkAddress, receiverAddress, value, options) {
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var gasPrice, gasLimit, networkDecimals, extraData, decimals, _a, path, maxFees, feePayer, _b, _c, _d, rawTx, ethFees, delegationFees, _e, _f;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        gasPrice = options.gasPrice, gasLimit = options.gasLimit, networkDecimals = options.networkDecimals, extraData = options.extraData;
                        return [4 /*yield*/, this.currencyNetwork.getDecimals(networkAddress, {
                                networkDecimals: networkDecimals
                            })];
                    case 1:
                        decimals = _g.sent();
                        _b = this.getTransferPathInfo;
                        _c = [networkAddress];
                        return [4 /*yield*/, this.user.getAddress()];
                    case 2: return [4 /*yield*/, _b.apply(this, _c.concat([_g.sent(),
                            receiverAddress,
                            value, __assign({}, options, { networkDecimals: decimals.networkDecimals })]))];
                    case 3:
                        _a = _g.sent(), path = _a.path, maxFees = _a.maxFees, feePayer = _a.feePayer;
                        if (!(path.length > 0)) return [3 /*break*/, 6];
                        _f = (_e = this.transaction).prepareContractTransaction;
                        return [4 /*yield*/, this.user.getAddress()];
                    case 4: return [4 /*yield*/, _f.apply(_e, [_g.sent(),
                            networkAddress,
                            'CurrencyNetwork',
                            // if no options are set for feePayer, the sender pays the fees.
                            feePayer === FeePayer.Receiver ? 'transferReceiverPays' : 'transfer',
                            [
                                utils.convertToHexString(utils.calcRaw(value, decimals.networkDecimals)),
                                utils.convertToHexString(new BigNumber(maxFees.raw)),
                                path,
                                extraData || '0x'
                            ],
                            {
                                gasLimit: gasLimit ? new BigNumber(gasLimit) : undefined,
                                gasPrice: gasPrice ? new BigNumber(gasPrice) : undefined
                            }])];
                    case 5:
                        _d = _g.sent(), rawTx = _d.rawTx, ethFees = _d.ethFees, delegationFees = _d.delegationFees;
                        return [2 /*return*/, {
                                ethFees: utils.convertToAmount(ethFees),
                                delegationFees: utils.convertToDelegationFees(delegationFees),
                                feePayer: feePayer,
                                maxFees: maxFees,
                                path: path,
                                rawTx: rawTx
                            }];
                    case 6: throw new Error('Could not find a path with enough capacity.');
                }
            });
        });
    };
    /**
     * Prepares a ethereum transaction object for a ETH transfer, where loaded user is the sender.
     * @param receiverAddress Address of receiver of transfer.
     * @param value Amount of ETH to transfer.
     * @param options Payment options. See `PaymentOptions` for more information.
     * @param options.gasPrice Custom gas price.
     * @param options.gasLimit Custom gas limit.
     */
    Payment.prototype.prepareEth = function (receiverAddress, value, options) {
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var gasLimit, gasPrice, _a, ethFees, rawTx, delegationFees, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        gasLimit = options.gasLimit, gasPrice = options.gasPrice;
                        _c = (_b = this.transaction).prepareValueTransaction;
                        return [4 /*yield*/, this.user.getAddress()];
                    case 1: return [4 /*yield*/, _c.apply(_b, [_d.sent(),
                            receiverAddress,
                            utils.calcRaw(value, 18),
                            {
                                gasLimit: gasLimit ? new BigNumber(gasLimit) : undefined,
                                gasPrice: gasPrice ? new BigNumber(gasPrice) : undefined
                            }])];
                    case 2:
                        _a = _d.sent(), ethFees = _a.ethFees, rawTx = _a.rawTx, delegationFees = _a.delegationFees;
                        return [2 /*return*/, {
                                ethFees: utils.convertToAmount(ethFees),
                                delegationFees: utils.convertToDelegationFees(delegationFees),
                                rawTx: rawTx
                            }];
                }
            });
        });
    };
    /**
     * Returns a path for a trustlines transfer, along with estimated fees and gas costs.
     * @param networkAddress Address of a currency network.
     * @param senderAddress Address of sender of transfer.
     * @param receiverAddress Address of receiver of transfer.
     * @param value Amount to transfer in biggest unit,
     *              i.e. 1.23 if currency network has 2 decimals.
     * @param options Payment options. See `PaymentOptions` for more information.
     * @param options.feePayer Either `sender` or `receiver`. Specifies who pays network fees.
     * @param options.networkDecimals Decimals of currency network can be provided manually.
     * @param options.maximumHops Max. number of hops for transfer.
     * @param options.maximumFees Max. transfer fees user if willing to pay.
     * @param options.extraData Extra data as used for logging purposes in the transfer. Used for estimating gas costs.
     */
    Payment.prototype.getTransferPathInfo = function (networkAddress, senderAddress, receiverAddress, value, options) {
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var networkDecimals, maximumHops, maximumFees, feePayerOption, extraData, decimals, data, endpoint, _a, fees, path, feePayer;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        networkDecimals = options.networkDecimals, maximumHops = options.maximumHops, maximumFees = options.maximumFees, feePayerOption = options.feePayer, extraData = options.extraData;
                        return [4 /*yield*/, this.currencyNetwork.getDecimals(networkAddress, {
                                networkDecimals: networkDecimals
                            })];
                    case 1:
                        decimals = _b.sent();
                        data = {
                            feePayer: feePayerOption,
                            from: senderAddress,
                            maxFees: maximumFees,
                            maxHops: maximumHops,
                            to: receiverAddress,
                            value: utils.calcRaw(value, decimals.networkDecimals).toString(),
                            extraData: extraData
                        };
                        endpoint = "networks/" + networkAddress + "/path-info";
                        return [4 /*yield*/, this.provider.postToEndpoint(endpoint, data)];
                    case 2:
                        _a = _b.sent(), fees = _a.fees, path = _a.path, feePayer = _a.feePayer;
                        if (!isFeePayerValue(feePayer)) {
                            throw Error("Unexpected feePayer value: " + feePayer);
                        }
                        return [2 /*return*/, {
                                feePayer: feePayer,
                                maxFees: utils.formatToAmount(fees, decimals.networkDecimals),
                                path: path
                            }];
                }
            });
        });
    };
    /**
     * Returns transfer event logs of loaded user in a specified currency network.
     * @param networkAddress Address of currency network.
     * @param filter Event filter object. See `EventFilterOptions` for more information.
     */
    Payment.prototype.get = function (networkAddress, filter) {
        if (filter === void 0) { filter = {}; }
        return this.event.get(networkAddress, __assign({}, filter, { type: 'Transfer' }));
    };
    /**
     * Signs a raw transaction object as returned by `prepare`
     * and sends the signed transaction.
     * @param rawTx Raw transaction object.
     */
    Payment.prototype.confirm = function (rawTx) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.transaction.confirm(rawTx)];
            });
        });
    };
    /**
     * Creates a payment request link.
     * @param networkAddress Address of a currency network.
     * @param amount Requested transfer amount.
     * @param subject Additional information for payment request.
     * @param customBase Optional custom base for link. Default `trustlines://`.
     */
    Payment.prototype.createRequest = function (networkAddress, amount, subject, customBase) {
        return __awaiter(this, void 0, void 0, function () {
            var params, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = ['paymentrequest',
                            networkAddress];
                        return [4 /*yield*/, this.user.getAddress()];
                    case 1:
                        params = _a.concat([
                            _b.sent(),
                            amount,
                            subject
                        ]);
                        return [2 /*return*/, utils.createLink(params, customBase)];
                }
            });
        });
    };
    /**
     * Retrieve the maximum spendable amount and path to user in a network
     *
     * @param networkAddress
     * @param receiverAddress
     *
     * @return {Promise<{path: any, amount: Amount}>}
     */
    Payment.prototype.getMaxAmountAndPathInNetwork = function (networkAddress, receiverAddress) {
        return __awaiter(this, void 0, void 0, function () {
            var networkDecimals, userAddress, endpoint, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.currencyNetwork.getDecimals(networkAddress)];
                    case 1:
                        networkDecimals = (_a.sent()).networkDecimals;
                        return [4 /*yield*/, this.user.getAddress()];
                    case 2:
                        userAddress = _a.sent();
                        endpoint = "networks/" + networkAddress + "/max-capacity-path-info";
                        return [4 /*yield*/, this.provider.postToEndpoint(endpoint, {
                                from: userAddress,
                                to: receiverAddress
                            })];
                    case 3:
                        result = _a.sent();
                        return [2 /*return*/, {
                                amount: utils.formatToAmount(result.capacity, networkDecimals),
                                path: result.path
                            }];
                }
            });
        });
    };
    return Payment;
}());
export { Payment };
//# sourceMappingURL=Payment.js.map