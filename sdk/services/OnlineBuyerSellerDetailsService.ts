/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UserDetails } from '../models/UserDetails.ts';
import type { CancelablePromise } from '../core/CancelablePromise.ts';
import type { BaseHttpRequest } from '../core/BaseHttpRequest.ts';
export class OnlineBuyerSellerDetailsService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Get details of the buyer from this online transaction
     * @returns UserDetails OK
     * @throws ApiError
     */
    public basicGetBuyerDetails({
        transactionId,
    }: {
        transactionId: number,
    }): CancelablePromise<UserDetails> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/transactions/{transaction_id}/buyer_details',
            path: {
                'transaction_id': transactionId,
            },
            errors: {
                404: `Not Found`,
            },
        });
    }
    /**
     * Get details of the seller from this online transaction
     * @returns UserDetails OK
     * @throws ApiError
     */
    public basicGetSellerDetails({
        transactionId,
    }: {
        transactionId: number,
    }): CancelablePromise<UserDetails> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/transactions/{transaction_id}/seller_details',
            path: {
                'transaction_id': transactionId,
            },
            errors: {
                404: `Not Found`,
            },
        });
    }
    /**
     * Get the Stripe client secret for this online transaction
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
    public getStripeClientSecretForTransaction({
        transactionId,
    }: {
        transactionId: number,
    }): CancelablePromise<{
        client_secret: string;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/transactions/{transaction_id}/stripe_client_secret',
            path: {
                'transaction_id': transactionId,
            },
            errors: {
                400: `Bad Request
                \`code\` can be one of the following:
                 * \`already_paid\`
                 * \`invalid_id\`
                 * \`not_accepted\`: This transaction was created from a
                listing but the listing's creator has not yet
                accepted this transaction.
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
     * Get the details for the Stripe publishable key that is in use for this online transaction
     *
     * Returns the Publishable Key for the Stripe Platform
     * which is hosting this transaction.
     *
     * @returns any OK
     * @throws ApiError
     */
    public basicGetStripePublishableKeyForTransaction({
        transactionId,
    }: {
        transactionId: number,
    }): CancelablePromise<{
        publishable_key: string;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/transactions/{transaction_id}/stripe_publishable_key',
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
}
