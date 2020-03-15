'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.TL_WALLET_VERSION = 1
exports.WALLET_TYPE_ETHERS = 'ethers'
exports.WALLET_TYPE_IDENTITY = 'identity'
exports.EXPECTED_VERSIONS = [1]
exports.DEFAULT_DERIVATION_PATH = "m/44'/60'/0'/0/0"
/**
 * Checks if type and version of given wallet data are supported.
 * @param walletData Wallet data to check.
 * @param walletType Expected wallet type.
 * @param expectedVersions Expected wallet versions.
 */
function verifyWalletData(walletData, walletType, expectedVersions) {
  if (walletData.type !== walletType) {
    throw new Error(
      'The wallet data given is of the wrong type: ' +
        walletData.type +
        ', expected: ' +
        walletType
    )
  }
  if (expectedVersions.indexOf(walletData.version) === -1) {
    throw new Error(
      'The wallet data version given is not handled: version ' +
        walletData.version +
        ', expected one of: ' +
        expectedVersions
    )
  }
}
exports.verifyWalletData = verifyWalletData
//# sourceMappingURL=TLWallet.js.map
