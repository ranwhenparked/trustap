/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { basic_Transaction } from '../models/basic_Transaction.ts';
import type { CancelablePromise } from '../core/CancelablePromise.ts';
import type { BaseHttpRequest } from '../core/BaseHttpRequest.ts';
export class OnlineCancelService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Cancel this online transaction
     * Transaction can be cancelled until it's paid or if the feature
     * `RequireSellerAcceptance` is present, it can be cancelled
     * until it's tracked.
     * Offline access is allowed for this endpoint when the user has
     * granted the `basic_tx:offline_cancel` scope to the client
     * that is performing the request.
     *
     * @returns basic_Transaction OK
     * @throws ApiError
     */
    public basicCancelTransaction({
        transactionId,
    }: {
        transactionId: number,
    }): CancelablePromise<basic_Transaction> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/transactions/{transaction_id}/cancel',
            path: {
                'transaction_id': transactionId,
            },
            errors: {
                400: `Bad Request
                \`code\` can be one of the following:
                 * \`invalid_id\`
                 * \`already_paid\`
                 * \`already_cancelled\`
                 * \`tracking_already_added\`
                `,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * Cancel this online transaction with a guest user
     * This endpoint cancels a transaction for the user specified in the header
     * as `Trustap-User`.
     * Transaction can be cancelled until it's paid or if the feature
     * `RequireSellerAcceptance` is present, it can be cancelled until it's tracked.
     *
     * @returns basic_Transaction OK
     * @throws ApiError
     */
    public basicCancelTransactionWithGuestUser({
        transactionId,
        trustapUser,
    }: {
        transactionId: number,
        /**
         * Required in client flows, where you make API calls on behalf of another Trustap user.
         */
        trustapUser?: string,
    }): CancelablePromise<basic_Transaction> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/transactions/{transaction_id}/cancel_with_guest_user',
            path: {
                'transaction_id': transactionId,
            },
            headers: {
                'Trustap-User': trustapUser,
            },
            errors: {
                400: `Bad Request
                \`code\` can be one of the following:
                 * \`invalid_id\`
                 * \`already_paid\`
                 * \`already_cancelled\`
                 * \`tracking_already_added\`
                `,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * Cancel this listing-based transaction
     *
     * "Listing transactions" are transactions created from listings
     * (using the `/create_transaction` endpoints for listings).
     * Listings transactions for online transactions must be accepted
     * by the creator of the listing using
     * `/accept_listing_transaction` in order to proceed. This endpoint
     * instead rejects the listing transaction.
     *
     * @returns basic_Transaction OK
     * @throws ApiError
     */
    public basicRejectListingTransaction({
        transactionId,
    }: {
        transactionId: number,
    }): CancelablePromise<basic_Transaction> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/transactions/{transaction_id}/reject_listing_transaction',
            path: {
                'transaction_id': transactionId,
            },
            errors: {
                400: `Bad Request
                \`code\` can be one of the following:
                 * \`no_listing\`: This transaction wasn't created from a
                listing
                 * \`already_accepted\`
                 * \`already_rejected\`
                 * \`second_party_not_joined\`
                `,
                403: `Forbidden
                \`code\` can be one of the following:
                 * \`not_creator\`
                `,
                404: `Not Found`,
            },
        });
    }
}
