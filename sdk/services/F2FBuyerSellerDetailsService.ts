/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UserDetails } from '../models/UserDetails.ts';
import type { CancelablePromise } from '../core/CancelablePromise.ts';
import type { BaseHttpRequest } from '../core/BaseHttpRequest.ts';
export class F2FBuyerSellerDetailsService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Get the Stripe client secret for this face-to-face transaction
     *
     * This endpoint is used for the asynchronous payment flow using
     * Stripe. The `client_secret` returned from this endpoint should
     * be passed to
     * [stripe.confirmCardPayment](https://stripe.com/docs/stripe-js/reference#stripe-confirm-card-payment)
     * to start the payment process.
     *
     * @returns any OK
     * @throws ApiError
     */
    public p2PGetRemainderStripeClientSecretForTransaction({
        transactionId,
    }: {
        transactionId: number,
    }): CancelablePromise<{
        client_secret: string;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/p2p/transactions/{transaction_id}/remainder_stripe_client_secret',
            path: {
                'transaction_id': transactionId,
            },
            errors: {
                400: `Bad Request
                \`code\` can be one of the following:
                 * \`missing_pricing\`: Pricing details have not yet been
                added to this transaction.
                 * \`no_client_secret\`
                `,
                403: `Forbidden
                \`code\` can be one of the following:
                 * \`not_buyer\`
                `,
                404: `Not Found`,
            },
        });
    }
    /**
     * Get the details for the Stripe publishable key that is in use for this face-to-face transaction
     *
     * Returns the Publishable Key for the Stripe Platform
     * which is hosting this transaction.
     *
     * @returns any OK
     * @throws ApiError
     */
    public p2PGetStripePublishableKeyForTransaction({
        transactionId,
    }: {
        transactionId: number,
    }): CancelablePromise<{
        publishable_key: string;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/p2p/transactions/{transaction_id}/stripe_publishable_key',
            path: {
                'transaction_id': transactionId,
            },
            errors: {
                400: `Bad Request
                \`code\` can be one of the following:
                 * \`invalid_id\`
                `,
                403: `Forbidden
                \`code\` can be one of the following:
                 * \`not_buyer\`
                 * \`not_seller\`
                `,
                404: `Not Found`,
            },
        });
    }
    /**
     * Get the details of the buyer from this face-to-face transaction
     * @returns UserDetails OK
     * @throws ApiError
     */
    public getBuyerDetailsFromP2PTransaction({
        transactionId,
    }: {
        transactionId: number,
    }): CancelablePromise<UserDetails> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/p2p/transactions/{transactionId}/buyer_details',
            path: {
                'transactionId': transactionId,
            },
            errors: {
                404: `Not Found`,
            },
        });
    }
    /**
     * Get the Stripe client secret for this face-to-face transaction
     *
     * This endpoint is used for the asynchronous payment flow using
     * Stripe. The `client_secret` returned from this endpoint should
     * be passed to
     * [stripe.confirmCardPayment](https://stripe.com/docs/stripe-js/reference#stripe-confirm-card-payment)
     * to start the payment process.
     *
     * @returns any OK
     * @throws ApiError
     */
    public getDepositStripeClientSecretForP2PTransaction({
        transactionId,
    }: {
        transactionId: number,
    }): CancelablePromise<{
        client_secret: string;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/p2p/transactions/{transactionId}/deposit_stripe_client_secret',
            path: {
                'transactionId': transactionId,
            },
            errors: {
                400: `Bad Request
                \`code\` can be one of the following:
                 * \`deposit_already_paid\`
                `,
                403: `Forbidden
                \`code\` can be one of the following:
                 * \`not_buyer\`
                `,
                404: `Not Found`,
            },
        });
    }
    /**
     * Get the details of the seller from this face-to-face transaction
     * @returns UserDetails OK
     * @throws ApiError
     */
    public getSellerDetailsFromP2PTransaction({
        transactionId,
    }: {
        transactionId: number,
    }): CancelablePromise<UserDetails> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/p2p/transactions/{transactionId}/seller_details',
            path: {
                'transactionId': transactionId,
            },
            errors: {
                404: `Not Found`,
            },
        });
    }
}
