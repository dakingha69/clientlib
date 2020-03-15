export var TL_WALLET_VERSION = 1;
export var WALLET_TYPE_ETHERS = 'ethers';
export var WALLET_TYPE_IDENTITY = 'identity';
export var EXPECTED_VERSIONS = [1];
export var DEFAULT_DERIVATION_PATH = "m/44'/60'/0'/0/0";
/**
 * Checks if type and version of given wallet data are supported.
 * @param walletData Wallet data to check.
 * @param walletType Expected wallet type.
 * @param expectedVersions Expected wallet versions.
 */
export function verifyWalletData(walletData, walletType, expectedVersions) {
    if (walletData.type !== walletType) {
        throw new Error("The wallet data given is of the wrong type: " + walletData.type + ", expected: " + walletType);
    }
    if (expectedVersions.indexOf(walletData.version) === -1) {
        throw new Error("The wallet data version given is not handled: version " + walletData.version + ", expected one of: " + expectedVersions);
    }
}
//# sourceMappingURL=TLWallet.js.map