/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { p2p_Transaction } from '../models/p2p_Transaction.ts';
import type { CancelablePromise } from '../core/CancelablePromise.ts';
import type { BaseHttpRequest } from '../core/BaseHttpRequest.ts';
export class F2FHandoverService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Confirm the handover for this face-to-face transaction
     * Both parties should confirm the handover for a face-to-face
     * transaction. The complaints period begins when the seller
     * confirms the handover.
     * Offline access is allowed for this endpoint when the user has
     * granted the `p2p_tx:offline_confirm_handover` scope to the client
     * that is performing the request.
     *
     * @returns p2p_Transaction OK
     * @throws ApiError
     */
    public p2PConfirmHandover({
        transactionId,
    }: {
        transactionId: number,
    }): CancelablePromise<p2p_Transaction> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/p2p/transactions/{transaction_id}/confirm_handover',
            path: {
                'transaction_id': transactionId,
            },
            errors: {
                400: `Bad Request
                \`code\` can be one of the following:
                 * \`remainder_required\`
                 * \`already_complained\`
                 * \`seller_handover_already_confirmed\`
                 * \`buyer_handover_already_confirmed\`
                 * \`remainder_payment_in_review\`
                 * \`already_cancelled\`
                `,
                404: `Not Found`,
            },
        });
    }
    /**
     * Confirm the handover for this face-to-face transaction with a guest user
     * Both parties should confirm the handover for a face-to-face
     * transaction. Full users don't have access to this endpoint.
     *
     * @returns p2p_Transaction OK
     * @throws ApiError
     */
    public confirmHandoverForP2PTransactionWithGuestUser({
        transactionId,
    }: {
        transactionId: number,
    }): CancelablePromise<p2p_Transaction> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/p2p/transactions/{transactionId}/confirm_handover_with_guest_user',
            path: {
                'transactionId': transactionId,
            },
            errors: {
                400: `Bad Request
                \`code\` can be one of the following:
                 * \`remainder_required\`
                 * \`already_complained\`
                 * \`seller_handover_already_confirmed\`
                 * \`buyer_handover_already_confirmed\`
                `,
                404: `Not Found`,
            },
        });
    }
}
