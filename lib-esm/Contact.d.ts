import { TLProvider } from './providers/TLProvider'
import { User } from './User'
export declare class Contact {
  private user
  private provider
  constructor(params: { user: User; provider: TLProvider })
  public getAll(networkAddress: string): Promise<string[]>
  /**
   * Creates sharable contact link.
   * @param address Address of contact to share.
   * @param username Name of contact to share.
   * @param customBase Optional custom base for link. Default `trustlines://`.
   */
  public createLink(
    address: string,
    username: string,
    customBase?: string
  ): string
}
