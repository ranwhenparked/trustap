/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { p2p_Transaction } from '../models/p2p_Transaction.ts';
import type { CancelablePromise } from '../core/CancelablePromise.ts';
import type { BaseHttpRequest } from '../core/BaseHttpRequest.ts';
export class F2FCancelService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Cancel this face-to-face transaction with a description
     * If a transaction is cancelled after the deposit has been paid
     * then the deposit (excluding the Trustap fee) will be returned to
     * the buyer.
     * Offline access is allowed for this endpoint when the user has
     * granted the `p2p_tx:offline_cancel` scope to the client
     * that is performing the request.
     *
     * @returns p2p_Transaction OK
     * @throws ApiError
     */
    public p2PCancelWithDescription({
        transactionId,
        requestBody,
    }: {
        transactionId: number,
        requestBody: {
            description: string;
        },
    }): CancelablePromise<p2p_Transaction> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/p2p/transactions/{transaction_id}/cancel_with_description',
            path: {
                'transaction_id': transactionId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request
                \`code\` can be one of the following:
                 * \`second_party_not_joined\`
                 * \`already_cancelled\`
                 * \`remainder_already_paid\`
                 * \`handover_already_confirmed\`
                `,
                404: `Not Found`,
            },
        });
    }
    /**
     * Cancel this face-to-face transaction with a description with guest user
     * If a transaction is cancelled after the deposit has been paid
     * then the deposit (excluding the Trustap fee) will be returned to
     * the buyer.
     *
     * @returns p2p_Transaction OK
     * @throws ApiError
     */
    public p2PCancelP2PTransactionWithDescriptionAsGuest({
        transactionId,
        requestBody,
    }: {
        transactionId: number,
        requestBody: {
            description: string;
        },
    }): CancelablePromise<p2p_Transaction> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/p2p/transactions/{transaction_id}/cancel_with_description_with_guest_user',
            path: {
                'transaction_id': transactionId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request
                \`code\` can be one of the following:
                 * \`missing_description\`
                 * \`empty_description\`
                 * \`already_cancelled\`
                 * \`remainder_already_paid\`
                 * \`handover_already_confirmed\`
                `,
                404: `Not Found`,
            },
        });
    }
}
