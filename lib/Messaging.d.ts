import { Observable } from 'rxjs/Observable';
import { CurrencyNetwork } from './CurrencyNetwork';
import { TLProvider } from './providers/TLProvider';
import { User } from './User';
import { DecimalsOptions, PaymentRequestMessage, ReconnectingWSOptions, UsernameMessage } from './typings';
export declare class Messaging {
    private user;
    private currencyNetwork;
    private provider;
    constructor(params: {
        currencyNetwork: CurrencyNetwork;
        provider: TLProvider;
        user: User;
    });
    /**
     * Sends a payment request to given `counterParty` and returns created payment request.
     * @param networkAddress Address of currency network.
     * @param counterPartyAddress Address of counter party.
     * @param value Requested payment amount.
     * @param subject Optional subject of payment request.
     */
    paymentRequest(networkAddress: string, counterPartyAddress: string, value: number | string, subject?: string, options?: {
        decimalsOptions?: DecimalsOptions;
    }): Promise<PaymentRequestMessage>;
    /**
     * Returns a websocket observable that can be subscribed to.
     */
    messageStream(reconnectingOptions?: ReconnectingWSOptions): Observable<any>;
    /**
     * Sends the given username to the specified counter party via messaging.
     * @param username Username to send.
     * @param counterPartyAddress Address of counter party.
     */
    sendUsernameToCounterparty(username: string, counterpartyAddress: string): Promise<UsernameMessage>;
}
