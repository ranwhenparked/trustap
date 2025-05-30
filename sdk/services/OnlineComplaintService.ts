/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { basic_Transaction } from '../models/basic_Transaction.ts';
import type { CancelablePromise } from '../core/CancelablePromise.ts';
import type { BaseHttpRequest } from '../core/BaseHttpRequest.ts';
export class OnlineComplaintService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Accept complaint for this online transaction
     * @returns basic_Transaction OK
     * @throws ApiError
     */
    public basicAcceptComplaint({
        transactionId,
    }: {
        transactionId: number,
    }): CancelablePromise<basic_Transaction> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/transactions/{transaction_id}/accept_complaint',
            path: {
                'transaction_id': transactionId,
            },
            errors: {
                400: `Bad Request
                \`code\` can be one of the following:
                 * \`funds_already_released\`
                 * \`not_paid\`
                 * \`not_complained\`
                `,
                403: `Forbidden
                \`code\` can be one of the following:
                 * \`not_seller\`
                `,
                404: `Not Found`,
            },
        });
    }
    /**
     * Submit a detailed complaint for this online transaction
     * @returns basic_Transaction OK
     * @throws ApiError
     */
    public basicSubmitComplaintWithDescription({
        transactionId,
        requestBody,
    }: {
        transactionId: number,
        requestBody: {
            description: string;
        },
    }): CancelablePromise<basic_Transaction> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/transactions/{transaction_id}/complain_with_description',
            path: {
                'transaction_id': transactionId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request
                \`code\` can be one of the following:
                 * \`empty_complaint_description\`
                 * \`already_complained\`
                 * \`unconfirmed_delivery\`: The complaint period for
                this transaction has not yet started.
                 * \`complaint_period_ended_prematurely\`: The buyer has
                already ended the complaint period.
                 * \`complaint_period_expired\`
                 * \`funds_already_released\`
                 * \`invalid_id\`
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
     * Submit a detailed complaint for this online transaction for the guest buyer using `Trustap-User`
     * @returns basic_Transaction OK
     * @throws ApiError
     */
    public basicSubmitComplaintWithGuestBuyer({
        transactionId,
        requestBody,
        trustapUser,
    }: {
        transactionId: number,
        requestBody: {
            description: string;
        },
        /**
         * Required in client flows, where you make API calls on behalf of another Trustap user.
         */
        trustapUser?: string,
    }): CancelablePromise<basic_Transaction> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/transactions/{transaction_id}/complain_with_guest_buyer',
            path: {
                'transaction_id': transactionId,
            },
            headers: {
                'Trustap-User': trustapUser,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request
                \`code\` can be one of the following:
                 * \`empty_complaint_description\`
                 * \`already_complained\`
                 * \`unconfirmed_delivery\`: The complaint period for
                this transaction has not yet started.
                 * \`complaint_period_ended_prematurely\`: The buyer has
                already ended the complaint period.
                 * \`complaint_period_expired\`
                 * \`funds_already_released\`
                 * \`invalid_id\`
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
     * End the complaint period for this online transaction
     * @returns basic_Transaction OK
     * @throws ApiError
     */
    public basicEndComplaintPeriod({
        transactionId,
    }: {
        transactionId: number,
    }): CancelablePromise<basic_Transaction> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/transactions/{transaction_id}/end_complaint_period',
            path: {
                'transaction_id': transactionId,
            },
            errors: {
                400: `Bad Request
                \`code\` can be one of the following:
                 * \`complaint_period_expired\`
                 * \`already_complained\`
                 * \`complaint_period_ended_prematurely\`
                 * \`invalid_id\`
                 * \`unconfirmed_delivery\`: The complaint period for
                this transaction has not yet started.
                `,
                403: `Forbidden
                \`code\` can be one of the following:
                 * \`not_buyer\`
                `,
                404: `Not Found`,
            },
        });
    }
}
