import { CurrencyNetwork } from './CurrencyNetwork'
import { Event } from './Event'
import { Payment } from './Payment'
import { TLProvider } from './providers/TLProvider'
import { Transaction } from './Transaction'
import { TLOptions, TxObject } from './typings'
import { User } from './User'
/**
 * The Trustline class contains all relevant methods for retrieving, creating and
 * editing trustlines.
 */
export declare class Shield {
  private currencyNetwork
  private event
  private provider
  private transaction
  private user
  private payment
  constructor(params: {
    currencyNetwork: CurrencyNetwork
    event: Event
    provider: TLProvider
    transaction: Transaction
    user: User
    payment: Payment
  })
  /**
   * ONLY FOR DEV PURPOSES
   * prepareRegisterVK
   */
  public prepareRegisterVK(
    shieldAddress: string,
    flattenedVK: string[] | number[],
    vkType: 'mint' | 'transfer' | 'burn',
    options?: TLOptions
  ): Promise<TxObject>
  public prepareMintCommitment(
    shieldAddress: string,
    proof: string[],
    inputs: string[],
    mintValue: number | string,
    commitment: string,
    options?: TLOptions
  ): Promise<TxObject>
  public prepareTransferCommitment(
    shieldAddress: string,
    proof: string[],
    inputs: string[],
    root: string,
    nullifierC: string,
    nullifierD: string,
    commitmentE: string,
    commitmentF: string,
    options?: TLOptions
  ): Promise<TxObject>
  public prepareBurnCommitment(
    shieldAddress: string,
    proof: string[],
    inputs: string[],
    root: string,
    nullifier: string,
    burnValue: string | number,
    options?: TLOptions
  ): Promise<TxObject>
}
