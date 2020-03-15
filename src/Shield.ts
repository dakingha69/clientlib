import BigNumber from 'bignumber.js'

import { CurrencyNetwork } from './CurrencyNetwork'
import { Event } from './Event'
import { TLProvider } from './providers/TLProvider'
import { Transaction } from './Transaction'
import { User } from './User'

import utils from './utils'

import {
  ClosePathObject,
  ClosePathRaw,
  CloseTxObject,
  DecimalsOptions,
  EventFilterOptions,
  FeePayer,
  isFeePayerValue,
  NetworkEvent,
  NetworkTrustlineEvent,
  PaymentOptions,
  RawTxObject,
  TLOptions,
  TrustlineObject,
  TrustlineRaw,
  TrustlineUpdateOptions,
  TxObject
} from './typings'

const VK_TYPES = ['mint', 'transfer', 'burn']

/**
 * The Trustline class contains all relevant methods for retrieving, creating and
 * editing trustlines.
 */
export class Shield {
  private currencyNetwork: CurrencyNetwork
  private event: Event
  private provider: TLProvider
  private transaction: Transaction
  private user: User

  constructor(params: {
    currencyNetwork: CurrencyNetwork
    event: Event
    provider: TLProvider
    transaction: Transaction
    user: User
  }) {
    this.event = params.event
    this.user = params.user
    this.transaction = params.transaction
    this.currencyNetwork = params.currencyNetwork
    this.provider = params.provider
  }

  /**
   * ONLY FOR DEV PURPOSES
   * prepareRegisterVK
   */
  public async prepareRegisterVK(
    shieldAddress: string,
    flattenedVK: string[] | number[],
    vkType: 'mint' | 'transfer' | 'burn',
    options: TLOptions = {}
  ): Promise<TxObject> {
    const { gasLimit, gasPrice } = options
    const funcName = 'registerVerificationKey'
    const funcArgs: any[] = [flattenedVK, VK_TYPES.indexOf(vkType)]

    const {
      rawTx,
      ethFees,
      delegationFees
    } = await this.transaction.prepareContractTransaction(
      await this.user.getAddress(),
      shieldAddress,
      'CurrencyNetworkShield',
      funcName,
      funcArgs,
      {
        gasLimit: gasLimit ? new BigNumber(gasLimit) : undefined,
        gasPrice: gasPrice ? new BigNumber(gasPrice) : undefined
      }
    )
    return {
      ethFees: utils.convertToAmount(ethFees),
      delegationFees: utils.convertToDelegationFees(delegationFees),
      rawTx
    }
  }

  public async prepareMintCommitment(
    shieldAddress: string,
    proof: string[],
    inputs: string[],
    mintValue: number | string,
    commitment: string,
    options: TLOptions = {}
  ): Promise<TxObject> {
    const { gasLimit, gasPrice } = options

    const shieldedNetwork = await this.currencyNetwork.getShieldedNetwork(
      shieldAddress
    )
    const decimals = await this.currencyNetwork.getDecimals(
      shieldedNetwork.address
    )

    const funcName = 'mint'
    const funcArgs: any[] = [
      proof.map(p => utils.convertToHexString(p)),
      inputs.map(i => utils.convertToHexString(i)),
      utils.convertToHexString(
        utils.calcRaw(mintValue, decimals.networkDecimals)
      ),
      commitment
    ]

    const {
      rawTx,
      ethFees,
      delegationFees
    } = await this.transaction.prepareContractTransaction(
      await this.user.getAddress(),
      shieldAddress,
      'CurrencyNetworkShield',
      funcName,
      funcArgs,
      {
        gasLimit: gasLimit ? new BigNumber(gasLimit) : undefined,
        gasPrice: gasPrice ? new BigNumber(gasPrice) : undefined
      }
    )
    return {
      ethFees: utils.convertToAmount(ethFees),
      delegationFees: utils.convertToDelegationFees(delegationFees),
      rawTx
    }
  }

  public async prepareTransferCommitment(
    shieldAddress: string,
    proof: string[],
    inputs: string[],
    root: string,
    nullifierC: string,
    nullifierD: string,
    commitmentE: string,
    commitmentF: string,
    options: TLOptions = {}
  ): Promise<TxObject> {
    const { gasLimit, gasPrice } = options

    const funcName = 'transfer'
    const funcArgs: any[] = [
      proof.map(p => utils.convertToHexString(p)),
      inputs.map(i => utils.convertToHexString(i)),
      root,
      nullifierC,
      nullifierD,
      commitmentE,
      commitmentF
    ]

    const {
      rawTx,
      ethFees,
      delegationFees
    } = await this.transaction.prepareContractTransaction(
      await this.user.getAddress(),
      shieldAddress,
      'CurrencyNetworkShield',
      funcName,
      funcArgs,
      {
        gasLimit: gasLimit ? new BigNumber(gasLimit) : undefined,
        gasPrice: gasPrice ? new BigNumber(gasPrice) : undefined
      }
    )
    return {
      ethFees: utils.convertToAmount(ethFees),
      delegationFees: utils.convertToDelegationFees(delegationFees),
      rawTx
    }
  }

  public async prepareBurnCommitment(
    shieldAddress: string,
    proof: string[],
    inputs: string[],
    root: string,
    nullifier: string,
    burnValue: string | number,
    payTo: string,
    options: TLOptions = {}
  ): Promise<TxObject> {
    const { gasLimit, gasPrice } = options

    const shieldedNetwork = await this.currencyNetwork.getShieldedNetwork(
      shieldAddress
    )
    const decimals = await this.currencyNetwork.getDecimals(
      shieldedNetwork.address
    )

    const funcName = 'burn'
    const funcArgs: any[] = [
      proof.map(p => utils.convertToHexString(p)),
      inputs.map(i => utils.convertToHexString(i)),
      root,
      nullifier,
      utils.convertToHexString(
        utils.calcRaw(burnValue, decimals.networkDecimals)
      ),
      payTo
    ]

    const {
      rawTx,
      ethFees,
      delegationFees
    } = await this.transaction.prepareContractTransaction(
      await this.user.getAddress(),
      shieldAddress,
      'CurrencyNetworkShield',
      funcName,
      funcArgs,
      {
        gasLimit: gasLimit ? new BigNumber(gasLimit) : undefined,
        gasPrice: gasPrice ? new BigNumber(gasPrice) : undefined
      }
    )
    return {
      ethFees: utils.convertToAmount(ethFees),
      delegationFees: utils.convertToDelegationFees(delegationFees),
      rawTx
    }
  }
}
