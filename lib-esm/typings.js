export var FeePayer
;(function(FeePayer) {
  FeePayer['Sender'] = 'sender'
  FeePayer['Receiver'] = 'receiver'
})(FeePayer || (FeePayer = {}))
export function isFeePayerValue(feePayer) {
  if (
    Object.keys(FeePayer)
      .map(function(k) {
        return FeePayer[k]
      })
      .indexOf(feePayer) === -1
  ) {
    return false
  }
  return true
}
//# sourceMappingURL=typings.js.map
