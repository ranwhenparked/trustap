/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { basic_Role } from '../models/basic_Role.ts';
import type { Currency } from '../models/Currency.ts';
import type { p2p_Currency } from '../models/p2p_Currency.ts';
import type { p2p_Role } from '../models/p2p_Role.ts';
import type { p2p_Transaction } from '../models/p2p_Transaction.ts';
import type { CancelablePromise } from '../core/CancelablePromise.ts';
import type { BaseHttpRequest } from '../core/BaseHttpRequest.ts';
export class F2FTransactionsService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Get multiple face-to-face transactions by their IDs
     * This endpoint takes a required `ids` parameter that contains a
     * comma-separated list of transaction IDs, and returns the
     * transactions corresponding to those IDs. A maximum of 50 IDs may
     * be provided, and results are returned in the order specified in
     * `ids`, and duplicates are preserved. Transactions that couldn't
     * be found will be returned as `null` values in the result array.
     * The following example request results in the `200 OK` response
     * described below, assuming that the transaction with ID `1990`
     * couldn't be found:
     *
     *
     * ``` http
     * https://dev.stage.trustap.com/api/v1/p2p/batch/transactions?ids=1309,609,1990,609
     * ```
     *
     * @returns p2p_Transaction OK
     * @throws ApiError
     */
    public getP2PTransactionsByIds({
        ids,
    }: {
        /**
         * A comma-separated list of transaction IDs
         *
         */
        ids: string,
    }): CancelablePromise<Array<p2p_Transaction>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/p2p/batch/transactions',
            query: {
                'ids': ids,
            },
            errors: {
                400: `Bad Request
                \`code\` can be one of the following:
                 * \`ids_missing\`
                 * \`invalid_id\`
                 * \`too_many_ids\`
                `,
            },
        });
    }
    /**
     * Get face-to-face transactions for the logged-in user
     * Transactions are currently sorted by ID.
     *
     * @returns p2p_Transaction OK
     * @throws ApiError
     */
    public getP2PTransactions({
        beforeId,
        afterId,
        limit = 25,
    }: {
        /**
         * Only return transactions that were created chronologically
         * before the transaction with this ID
         *
         */
        beforeId?: number,
        /**
         * Only return transactions that were created chronologically
         * after the transaction with this ID (i.e. with smaller IDs)
         *
         */
        afterId?: number,
        /**
         * The maximum number of transactions to return
         *
         */
        limit?: number,
    }): CancelablePromise<Array<p2p_Transaction>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/p2p/me/transactions',
            query: {
                'before_id': beforeId,
                'after_id': afterId,
                'limit': limit,
            },
            errors: {
                400: `Bad Request
                \`code\` can be one of the following:
                 * \`invalid_before_id\`
                 * \`invalid_after_id\`
                 * \`invalid_limit\`
                `,
            },
        });
    }
    /**
     * Create a new face-to-face transaction
     * Note that this endpoint is similar to `POST /me/transactions`
     * but takes `deposit_price` and `deposit_charge` fields instead of
     * the `price` and `charge` fields.
     * Offline access is allowed for this endpoint when the user has
     * granted the `p2p_tx:offline_create_join` scope to the client
     * that is performing the request.
     *
     * @returns p2p_Transaction Created
     * @throws ApiError
     */
    public p2PCreateTransaction({
        requestBody,
    }: {
        requestBody: {
            charge_calculator_version: number;
            client_id?: string;
            currency: Currency;
            deposit_charge: number;
            deposit_charge_seller?: number;
            deposit_price: number;
            /**
             * A description of the goods being sold.
             *
             */
            description: string;
            role: basic_Role;
            /**
             * If `skip_remainder` is `true` then this
             * transaction will move to the "confirm handover"
             * step after the deposit has been accepted.
             *
             */
            skip_remainder?: boolean;
        },
    }): CancelablePromise<p2p_Transaction> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/p2p/me/transactions',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request
                \`code\` can be one of the following:
                 * \`incorrect_calc_version\`
                 * \`incorrect_charge\`
                 * \`incorrect_charge_seller\`
                 * \`invalid_calc_version\`
                 * \`negative_price\`
                 * \`price_too_low\`
                `,
            },
        });
    }
    /**
     * Create a new face-to-face transaction with both users
     * This endpoint is an optimised call that allows a transaction to
     * be created and joined in a single request. It requires the user
     * identified by `join_user_id` to have granted the
     * `p2p_tx:offline_create_join` scope to the client that is
     * performing the request.
     *
     * Note that this endpoint is similar to `POST /me/transactions`
     * but takes `deposit_price` and `deposit_charge` fields instead of
     * the `price` and `charge` fields.
     *
     * @returns p2p_Transaction Created
     * @throws ApiError
     */
    public createAndJoinP2PTransaction({
        requestBody,
    }: {
        requestBody: {
            charge_calculator_version: number;
            creator_role: basic_Role;
            currency: Currency;
            deposit_charge: number;
            deposit_price: number;
            /**
             * A description of the goods being sold.
             *
             */
            description: string;
            /**
             * The user that will be joined to the new
             * transaction when it is created. It cannot be the
             * ID of the user making the request.
             *
             */
            join_user_id: string;
            /**
             * If `skip_remainder` is `true` then the
             * transaction will move to the "confirm handover"
             * step after the deposit has been accepted.
             *
             */
            skip_remainder: boolean;
        },
    }): CancelablePromise<p2p_Transaction> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/p2p/me/transactions/create_and_join',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request
                \`code\` can be one of the following:
                 * \`duplicate_user_id\`: The user specified by
                \`join_user_id\` is the user making the request.
                 * \`incorrect_calc_version\`
                 * \`incorrect_charge\`
                 * \`incorrect_charge_seller\`
                 * \`invalid_calc_version\`
                 * \`negative_price\`
                 * \`price_too_low\`
                `,
            },
        });
    }
    /**
     * Create a new face-to-face transaction with both users
     * This endpoint is an optimised call that allows a transaction to
     * be created and joined in a single request. It requires the
     * online user to have granted the `p2p_tx:offline_create_join` scope
     * to the client that is performing the request.
     * This endpoint allows creating a transaction with both buyer and seller
     * as guest users, or one party to be guest user and the other full user.
     *
     * @returns p2p_Transaction Created
     * @throws ApiError
     */
    public p2PCreateTransactionWithGuestUser({
        requestBody,
    }: {
        requestBody: {
            /**
             * The id of the buyer for this transaction
             * (it can be full user id or guest user id).
             *
             */
            buyer_id: string;
            charge_calculator_version: number;
            creator_role: p2p_Role;
            currency: p2p_Currency;
            deposit_charge: number;
            deposit_charge_seller?: number;
            /**
             * The `fee_multiplier` parameter is used to apply a higher percentage
             * fee based on the total price of the transaction. The percentage fee
             * is calculated multiplying the `percentage fee` by the `fee_multiplier`.
             *
             */
            deposit_fee_multiplier?: number;
            deposit_price: number;
            /**
             * A description of the goods being sold.
             *
             */
            description: string;
            /**
             * The id of the seller for this transaction
             * (it can be full user id or guest user id).
             *
             */
            seller_id: string;
            /**
             * If `skip_remainder` is `true` then the
             * transaction will move to the "confirm handover"
             * step after the deposit has been accepted.
             *
             */
            skip_remainder?: boolean;
        },
    }): CancelablePromise<p2p_Transaction> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/p2p/me/transactions/create_with_guest_user',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request
                \`code\` can be one of the following:
                 * \`incompatible_platforms\`
                 * \`no_guest_user\`
                 * \`invalid_role\`
                 * \`incorrect_charge\`
                 * \`unsupported_currency\`
                 * \`fee_multiplier_too_low\`
                 * \`negative_price\`
                 * \`price_too_low\`
                `,
            },
        });
    }
    /**
     * Get a face-to-face transaction by its ID
     * @returns p2p_Transaction OK
     * @throws ApiError
     */
    public p2PGetTransaction({
        transactionId,
    }: {
        transactionId: number,
    }): CancelablePromise<p2p_Transaction> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/p2p/transactions/{transaction_id}',
            path: {
                'transaction_id': transactionId,
            },
        });
    }
    /**
     * Claim F2F transaction for the seller
     * This endpoint allows a client to claim transactions for seller.
     * It requires to have granted the `p2p_tx:offline_claim` scope and API Key authentication.
     * The endpoint is not accessible for guests and full users.
     *
     * @returns p2p_Transaction OK
     * @throws ApiError
     */
    public p2PClaimTransactionForSeller({
        transactionId,
    }: {
        transactionId: number,
    }): CancelablePromise<p2p_Transaction> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/p2p/transactions/{transaction_id}/claim_for_seller',
            path: {
                'transaction_id': transactionId,
            },
            errors: {
                400: `Bad Request
                \`code\` can be one of the following:
                 * \`already_claimed\`
                 * \`cannot_claim_own_transaction\`
                 * \`invalid_user_platform\`
                `,
                404: `Not Found`,
            },
        });
    }
    /**
     * Join the face-to-face transaction as guest user
     * @returns p2p_Transaction OK
     * @throws ApiError
     */
    public p2PJoinWithGuest({
        transactionId,
    }: {
        transactionId: number,
    }): CancelablePromise<p2p_Transaction> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/p2p/transactions/{transaction_id}/join_with_guest',
            path: {
                'transaction_id': transactionId,
            },
            errors: {
                400: `Bad Request
                \`code\` can be one of the following:
                 * \`cannot_join_own_transaction\`
                 * \`already_cancelled\`\`
                `,
                404: `Not Found`,
            },
        });
    }
    /**
     * Get metadata for a face-to-face transaction
     * @returns any OK
     * @throws ApiError
     */
    public p2PGetTransactionMetadata({
        transactionId,
    }: {
        transactionId: number,
    }): CancelablePromise<Record<string, any>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/p2p/transactions/{transaction_id}/metadata',
            path: {
                'transaction_id': transactionId,
            },
            errors: {
                404: `Not Found`,
            },
        });
    }
    /**
     * Set metadata for a face-to-face transaction
     * @returns any OK
     * @throws ApiError
     */
    public p2PSetTransactionMetadata({
        transactionId,
        requestBody,
    }: {
        transactionId: number,
        requestBody?: Record<string, any>,
    }): CancelablePromise<Record<string, any>> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/p2p/transactions/{transaction_id}/metadata',
            path: {
                'transaction_id': transactionId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request
                \`code\` can be one of the following:
                 * \`too_many_metadata_fields\`
                 * \`value_too_long\`
                 * \`field_name_too_long\`
                 * \`empty_json\`
                 * \`json_type_not_allowed\`\`
                `,
            },
        });
    }
    /**
     * Claim F2F transaction as buyer given a claim secret
     * This endpoint allows a full user to claim a transaction
     * as buyer given a claim secret.
     *
     * @returns p2p_Transaction OK
     * @throws ApiError
     */
    public p2PClaimAsBuyer({
        secret,
    }: {
        secret: string,
    }): CancelablePromise<p2p_Transaction> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/p2p/transactions_by_claim_secret/{secret}/claim_as_buyer',
            path: {
                'secret': secret,
            },
            errors: {
                400: `Bad Request
                \`code\` can be one of the following:
                 * \`already_claimed\`
                 * \`cannot_claim_own_transaction\`
                 * \`missing_secret\`
                 * \`invalid_user_platform\`
                `,
                404: `Not Found`,
            },
        });
    }
    /**
     * Claim a F2F transaction as the seller
     * This endpoint allows a full user to claim a transaction
     * as seller given a claim secret.
     *
     * @returns p2p_Transaction OK
     * @throws ApiError
     */
    public p2PClaimTransactionAsSeller({
        secret,
    }: {
        secret: string,
    }): CancelablePromise<p2p_Transaction> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/p2p/transactions_by_claim_secret/{secret}/claim_as_seller',
            path: {
                'secret': secret,
            },
            errors: {
                400: `Bad Request
                \`code\` can be one of the following:
                 * \`missing_secret\`
                 * \`already_claimed\`
                 * \`cannot_claim_own_transaction\`
                 * \`invalid_user_platform\`
                `,
                404: `Not Found`,
            },
        });
    }
    /**
     * Get a face-to-face transaction by its join code
     * @returns p2p_Transaction OK
     * @throws ApiError
     */
    public getP2PTransactionByJoinCode({
        joinCode,
    }: {
        joinCode: string,
    }): CancelablePromise<p2p_Transaction> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/p2p/transactions_by_join_code/{joinCode}',
            path: {
                'joinCode': joinCode,
            },
            errors: {
                404: `Not Found`,
            },
        });
    }
    /**
     * Join a face-to-face transaction by its join code
     * This endpoint allows a user to join a transaction provided a join code. Offline access is allowed for this endpoint when the user has granted the `p2p_tx:offline_create_join` scope to the client that is performing the request.
     * @returns p2p_Transaction OK
     * @throws ApiError
     */
    public joinP2PTransactionByJoinCode({
        joinCode,
    }: {
        joinCode: string,
    }): CancelablePromise<p2p_Transaction> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/p2p/transactions_by_join_code/{joinCode}/join',
            path: {
                'joinCode': joinCode,
            },
            errors: {
                400: `Bad Request
                \`code\` can be one of the following:
                 * \`cannot_join_own_transaction\`
                 * \`already_cancelled\`\`
                `,
                404: `Not Found`,
            },
        });
    }
    /**
     * Reject a face-to-face transaction by its join code
     * @returns p2p_Transaction OK
     * @throws ApiError
     */
    public rejectP2PTransactionByJoinCode({
        joinCode,
    }: {
        joinCode: string,
    }): CancelablePromise<p2p_Transaction> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/p2p/transactions_by_join_code/{joinCode}/reject',
            path: {
                'joinCode': joinCode,
            },
            errors: {
                404: `Not Found`,
            },
        });
    }
}
