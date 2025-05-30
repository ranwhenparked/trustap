/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { p2p_Transaction } from '../models/p2p_Transaction.ts';
import type { CancelablePromise } from '../core/CancelablePromise.ts';
import type { BaseHttpRequest } from '../core/BaseHttpRequest.ts';
export class F2FComplaintService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Accept a complaint for this face-to-face transaction
     * @returns p2p_Transaction OK
     * @throws ApiError
     */
    public p2PAcceptComplaint({
        transactionId,
    }: {
        transactionId: number,
    }): CancelablePromise<p2p_Transaction> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/p2p/transactions/{transaction_id}/accept_complaint',
            path: {
                'transaction_id': transactionId,
            },
            errors: {
                400: `Bad Request
                \`code\` can be one of the following:
                 * \`funds_already_released\`
                 * \`deposit_not_paid\`
                 * \`deposit_already_refunded\`
                 * \`not_complained\`
                `,
                404: `Not Found`,
            },
        });
    }
    /**
     * Submit a complaint for this face-to-face transaction
     * Offline access is allowed for this endpoint when the user has granted the `p2p_tx:offline_complain` scope to the client that is performing the request.
     * @returns p2p_Transaction OK
     * @throws ApiError
     */
    public p2PSubmitComplaint({
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
            url: '/p2p/transactions/{transaction_id}/complain',
            path: {
                'transaction_id': transactionId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request
                \`code\` can be one of the following:
                 * \`remainder_required\`
                 * \`already_complained\`
                 * \`funds_already_released\`
                 * \`complaint_period_expired\`
                `,
                404: `Not Found`,
            },
        });
    }
    /**
     * Submit a complaint for this face-to-face transaction with a guest buyer
     * @returns p2p_Transaction OK
     * @throws ApiError
     */
    public p2PSubmitComplaintWithGuestBuyer({
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
            url: '/p2p/transactions/{transaction_id}/complain_with_guest_buyer',
            path: {
                'transaction_id': transactionId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request
                \`code\` can be one of the following:
                 * \`remainder_required\`
                 * \`already_complained\`
                 * \`funds_already_released\`
                 * \`complaint_period_expired\`
                `,
                404: `Not Found`,
            },
        });
    }
    /**
     * End the complaint period for this face-to-face transaction with a guest buyer
     * @returns p2p_Transaction OK
     * @throws ApiError
     */
    public p2PEndComplaintPeriodWithGuestBuyer({
        transactionId,
    }: {
        transactionId: number,
    }): CancelablePromise<p2p_Transaction> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/p2p/transactions/{transaction_id}/end_complaint_period_with_guest_buyer',
            path: {
                'transaction_id': transactionId,
            },
            errors: {
                400: `Bad Request
                \`code\` can be one of the following:
                 * \`complaint_period_expired\`
                 * \`already_complained\`
                 * \`handover_not_confirmed\`
                 * \`funds_already_released\`
                `,
                404: `Not Found`,
            },
        });
    }
}
