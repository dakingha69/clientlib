import { CurrencyNetwork } from './CurrencyNetwork';
import { Event } from './Event';
import { TLProvider } from './providers/TLProvider';
import { Transaction } from './Transaction';
import { User } from './User';
import { TLOptions, TxObject } from './typings';
/**
 * The Trustline class contains all relevant methods for retrieving, creating and
 * editing trustlines.
 */
export declare class Shield {
    private currencyNetwork;
    private event;
    private provider;
    private transaction;
    private user;
    constructor(params: {
        currencyNetwork: CurrencyNetwork;
        event: Event;
        provider: TLProvider;
        transaction: Transaction;
        user: User;
    });
    /**
     * ONLY FOR DEV PURPOSES
     * prepareRegisterVK
     */
    prepareRegisterVK(shieldAddress: string, flattenedVK: string[] | number[], vkType: 'mint' | 'transfer' | 'burn', options?: TLOptions): Promise<TxObject>;
    prepareMintCommitment(shieldAddress: string, proof: string[], inputs: string[], mintValue: number | string, commitment: string, options?: TLOptions): Promise<TxObject>;
    prepareTransferCommitment(shieldAddress: string, proof: string[], inputs: string[], root: string, nullifierC: string, nullifierD: string, commitmentE: string, commitmentF: string, options?: TLOptions): Promise<TxObject>;
    prepareBurnCommitment(shieldAddress: string, proof: string[], inputs: string[], root: string, nullifier: string, burnValue: string | number, payTo: string, options?: TLOptions): Promise<TxObject>;
}
