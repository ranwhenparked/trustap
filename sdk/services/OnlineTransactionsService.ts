/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { basic_Feature } from '../models/basic_Feature.ts';
import type { basic_Role } from '../models/basic_Role.ts';
import type { basic_Transaction } from '../models/basic_Transaction.ts';
import type { Currency } from '../models/Currency.ts';
import type { CancelablePromise } from '../core/CancelablePromise.ts';
import type { BaseHttpRequest } from '../core/BaseHttpRequest.ts';
export class OnlineTransactionsService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Get multiple online transactions by their IDs
     * This endpoint takes a required `ids` parameter that contains a
     * comma-separated list of transaction IDs, and returns the
     * transactions corresponding to those IDs. A maximum of 50 IDs may
     * be provided, results are returned in the order specified in
     * `ids`, and duplicates are preserved. Transactions that couldn't
     * be found will be returned as `null` values in the result array.
     * The following example request results in the `200 OK` response
     * described below, assuming that the transaction with ID `1990`
     * couldn't be found:
     *
     * ``` http
     * https://dev.stage.trustap.com/api/v1/batch/transactions?ids=1309,609,1990,609
     * ```
     *
     * @returns basic_Transaction OK
     * @throws ApiError
     */
    public basicGetTransactionsByIds({
        ids,
    }: {
        /**
         * A comma-separated list of transaction IDs
         *
         */
        ids: string,
    }): CancelablePromise<Array<basic_Transaction>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/batch/transactions',
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
     * Get online transactions for the logged-in user
     * Transactions are currently sorted by ID.
     *
     * @returns basic_Transaction OK
     * @throws ApiError
     */
    public basicGetTransactions({
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
    }): CancelablePromise<Array<basic_Transaction>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/me/transactions',
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
     * Create a new online transaction
     * A request to this endpoint must be preceded by a call to
     * `/charge` with the price of the goods specified in `price`.
     *
     * @returns basic_Transaction Created
     * @throws ApiError
     */
    public basicCreateTransaction({
        requestBody,
    }: {
        requestBody: {
            /**
             * The `charge` value returned from a request to
             * `/charge`.
             *
             */
            charge: number;
            /**
             * The `charge_calculator_version` value returned from a request to `/charge`.
             */
            charge_calculator_version: number;
            /**
             * The seller `charge` value returned from a
             * request to `/charge`.
             *
             */
            charge_seller?: number;
            client_id?: string;
            /**
             * The currency that the `price` is specified in.
             *
             */
            currency: string;
            /**
             * A description of the goods being sold.
             *
             */
            description: string;
            /**
             * `features` contains flags that modify the
             * transaction flow.
             *
             */
            features?: Array<basic_Feature>;
            /**
             * The price of the goods being sold, in the
             * `currency`'s smallest unit.  The `charge` value
             * should correspond to the Trustap charge created
             * with this price, otherwise this request will
             * fail with a `400` error.
             *
             */
            price: number;
            role: basic_Role;
        },
    }): CancelablePromise<basic_Transaction> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/me/transactions',
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
     * Create a new online transaction with both users
     * This endpoint is an optimised call that allows a transaction to
     * be created and joined in a single request. It requires the user
     * identified by `join_user_id` to have granted the
     * `basic_tx:offline_create_join` scope to the client that is
     * performing the request.
     *
     * @returns basic_Transaction Created
     * @throws ApiError
     */
    public basicCreateAndJoinTransaction({
        requestBody,
    }: {
        requestBody: {
            /**
             * The `charge` value returned from a request to
             * `/charge`.
             *
             */
            charge: number;
            /**
             * The `charge_calculator_version` value returned from a request to `/charge`.
             */
            charge_calculator_version: number;
            /**
             * The seller `charge` value returned from a request to
             * `/charge`.
             *
             */
            charge_seller?: number;
            client_id?: string;
            creator_role: basic_Role;
            /**
             * The currency that the `price` is specified in.
             *
             */
            currency: string;
            /**
             * A description of the goods being sold.
             *
             */
            description: string;
            /**
             * `features` contains flags that modify the
             * transaction flow.
             *
             */
            features?: Array<basic_Feature>;
            /**
             * The user that will be joined to the new
             * transaction when it is created. It cannot be the
             * ID of the user making the request.
             *
             */
            join_user_id: string;
            /**
             * The custom `postage_fee` for the transaction.
             */
            postage_fee?: number;
            /**
             * The price of the goods being sold, in the
             * `currency`'s smallest unit.  The `charge` value
             * should correspond to the Trustap charge created
             * with this price, otherwise this request will
             * fail with a `400` error.
             *
             */
            price: number;
        },
    }): CancelablePromise<basic_Transaction> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/me/transactions/create_and_join',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request
                \`code\` can be one of the following:
                 * \`invalid_join_user_id\`
                 * \`duplicate_user_id\`: The user specified by
                \`join_user_id\` is the user making the request.
                 * \`incorrect_calc_version\`
                 * \`incorrect_charge\`
                 * \`incorrect_charge_seller\`
                 * \`unsupported_currency\`
                 * \`user_not_owned_by_client\`
                 * \`invalid_calc_version\`
                 * \`negative_price\`
                 * \`price_too_low\`
                 * \`user_already_joined\`
                 * \`already_cancelled\`
                 * \`feature_not_found\`
                `,
            },
        });
    }
    /**
     * Create a new online transaction with both users
     * This endpoint is an optimised call that allows a transaction to
     * be created and joined in a single request. It requires the
     * online user to have granted the `basic_tx:offline_create_join` scope
     * to the client that is performing the request.
     * This endpoint allows creating a transaction with both buyer and seller
     * as guest or full users, or one party to be guest user and the other full user.
     *
     * @returns basic_Transaction Created
     * @throws ApiError
     */
    public basicCreateTransactionWithGuestUser({
        requestBody,
    }: {
        requestBody: {
            /**
             * The id of the buyer for this transaction
             * (it can be full user id or guest user id).
             *
             */
            buyer_id: string;
            /**
             * The `charge` value returned from a request to
             * `/charge`.
             *
             */
            charge: number;
            /**
             * The `charge_calculator_version` value returned from a request to `/charge`.
             */
            charge_calculator_version: number;
            /**
             * The seller `charge` value returned from a
             * request to `/charge`.
             *
             */
            charge_seller?: number;
            client_id?: string;
            creator_role: basic_Role;
            currency: Currency;
            /**
             * A description of the goods being sold.
             *
             */
            description: string;
            /**
             * `features` contains flags that modify the
             * transaction flow.
             *
             */
            features?: Array<basic_Feature>;
            /**
             * The custom `postage fee`, this fee only applies in the case
             * `postage fee feature flag` is enabled.
             *
             */
            postage_fee?: number;
            /**
             * The price of the goods being sold, in the
             * `currency`'s smallest unit.  The `charge` value
             * should correspond to the Trustap charge created
             * with this price, otherwise this request will
             * fail with a `400` error.
             *
             */
            price: number;
            /**
             * The id of the seller for this transaction
             * (it can be full user id or guest user id).
             *
             */
            seller_id: string;
        },
    }): CancelablePromise<basic_Transaction> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/me/transactions/create_with_guest_user',
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
                 * \`incompatible_countries\`
                 * \`unsupported_currency\`
                 * \`invalid_role\`
                 * \`no_guest_user\`
                `,
            },
        });
    }
    /**
     * Get an online transaction using a join code
     * @returns basic_Transaction OK
     * @throws ApiError
     */
    public basicGetTransactionByJoinCode({
        joinCode,
    }: {
        joinCode: string,
    }): CancelablePromise<basic_Transaction> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/transactions',
            query: {
                'join_code': joinCode,
            },
            errors: {
                400: `Bad Request
                \`code\` can be one of the following:
                 * \`join_code_missing\`
                `,
                404: `Not Found`,
            },
        });
    }
    /**
     * Join an online transaction using a join code
     * A transaction can't be joined using its ID, because only the
     * buyer and seller of a transaction can access a transaction using
     * its ID.
     *
     * @returns basic_Transaction OK
     * @throws ApiError
     */
    public basicJoinTransaction({
        joinCode,
    }: {
        joinCode: string,
    }): CancelablePromise<basic_Transaction> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/transactions',
            query: {
                'join_code': joinCode,
            },
            errors: {
                400: `Bad Request
                \`code\` can be one of the following:
                 * \`join_code_missing\`
                `,
                404: `Not Found`,
            },
        });
    }
    /**
     * Reject an online transaction by its join code
     * A transaction can't be rejected using its ID, because only the
     * buyer and seller of a transaction can access a transaction using
     * its ID.
     *
     * @returns basic_Transaction OK
     * @throws ApiError
     */
    public basicRejectTransactionByJoinCode({
        joinCode,
    }: {
        joinCode: string,
    }): CancelablePromise<basic_Transaction> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/transactions-by-join-code/{join_code}/reject',
            path: {
                'join_code': joinCode,
            },
            errors: {
                400: `Bad Request`,
                404: `Not Found`,
            },
        });
    }
    /**
     * Get an online transaction by its ID
     * @returns basic_Transaction OK
     * @throws ApiError
     */
    public basicGetTransaction({
        transactionId,
    }: {
        transactionId: number,
    }): CancelablePromise<basic_Transaction> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/transactions/{transaction_id}',
            path: {
                'transaction_id': transactionId,
            },
            errors: {
                400: `Bad Request
                \`code\` can be one of the following:
                 * \`invalid_id\`
                `,
                404: `Not Found`,
            },
        });
    }
    /**
     * Allow this listing-based transaction to proceed
     *
     * "Listing transactions" are transactions created from listings
     * (using the `/create_transaction` endpoints for listings).
     * Listings transactions for online transactions must be accepted
     * by the creator of the listing using
     * `/accept_listing_transaction` in order to proceed.
     * Offline access is allowed for this endpoint when the user has
     * granted the `basic_ls:offline_accept_listing` scope to the client
     * that is performing the request.
     *
     * @returns basic_Transaction OK
     * @throws ApiError
     */
    public basicAcceptListingTransaction({
        transactionId,
    }: {
        transactionId: number,
    }): CancelablePromise<basic_Transaction> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/transactions/{transaction_id}/accept_listing_transaction',
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
                `,
                403: `Forbidden
                \`code\` can be one of the following:
                 * \`not_creator\`
                `,
                404: `Not Found`,
            },
        });
    }
    /**
     * Claim online transactions for sellers on behalf of the buyer
     * This endpoint allows a client's claim transactions for sellers on behalf of the buyer.
     * It requires to have granted the `basic_tx:offline_claim` scope and API Key authentication.
     * The endpoint is not accessible for guests and full users.
     *
     * @returns basic_Transaction OK
     * @throws ApiError
     */
    public basicClaimTransactionForBuyer({
        transactionId,
    }: {
        transactionId: number,
    }): CancelablePromise<basic_Transaction> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/transactions/{transaction_id}/claim_for_buyer',
            path: {
                'transaction_id': transactionId,
            },
            errors: {
                400: `Bad Request
                \`code\` can be one of the following:
                 * \`already_claimed\`
                 * \`cannot_claim_own_transaction\`
                `,
                404: `Not Found`,
            },
        });
    }
    /**
     * Claim online transactions for sellers on behalf of the seller
     * This endpoint allows a client's claim transactions for sellers on behalf of the seller.
     * It requires to have granted the `basic_tx:offline_claim` scope and API Key authentication.
     * The endpoint is not accessible for guests and full users.
     *
     * @returns basic_Transaction OK
     * @throws ApiError
     */
    public basicClaimTransactionForSeller({
        transactionId,
    }: {
        transactionId: number,
    }): CancelablePromise<basic_Transaction> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/transactions/{transaction_id}/claim_for_seller',
            path: {
                'transaction_id': transactionId,
            },
            errors: {
                400: `Bad Request
                \`code\` can be one of the following:
                 * \`already_claimed\`
                 * \`cannot_claim_own_transaction\`
                `,
                404: `Not Found`,
            },
        });
    }
    /**
     * Submit a detailed order issue for this online transaction
     * @returns basic_Transaction OK
     * @throws ApiError
     */
    public basicSubmitOrderIssue({
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
            url: '/transactions/{transaction_id}/submit_order_issue',
            path: {
                'transaction_id': transactionId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request
                \`code\` can be one of the following:
                 * \`delivery_already_set\`
                 * \`tracking_not_added\`
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
     * Claim for an online transaction as buyer given a claim secret
     * This endpoint allows a full user to claim for a transaction
     * as buyer given a claim secret.
     *
     * @returns basic_Transaction OK
     * @throws ApiError
     */
    public basicClaimAsBuyer({
        secret,
    }: {
        secret: string,
    }): CancelablePromise<basic_Transaction> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/transactions_by_claim_secret/{secret}/claim_as_buyer',
            path: {
                'secret': secret,
            },
            errors: {
                400: `Bad Request
                \`code\` can be one of the following:
                 * \`already_claimed\`
                 * \`cannot_claim_own_transaction\`
                 * \`missing_secret\`
                `,
                404: `Not Found`,
            },
        });
    }
}
