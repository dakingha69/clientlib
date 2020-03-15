"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FeePayer;
(function (FeePayer) {
    FeePayer["Sender"] = "sender";
    FeePayer["Receiver"] = "receiver";
})(FeePayer = exports.FeePayer || (exports.FeePayer = {}));
function isFeePayerValue(feePayer) {
    if (Object.keys(FeePayer)
        .map(function (k) { return FeePayer[k]; })
        .indexOf(feePayer) === -1) {
        return false;
    }
    return true;
}
exports.isFeePayerValue = isFeePayerValue;
//# sourceMappingURL=typings.js.map