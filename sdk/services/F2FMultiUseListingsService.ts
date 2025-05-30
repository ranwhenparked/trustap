/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { basic_Role } from '../models/basic_Role.ts';
import type { Currency } from '../models/Currency.ts';
import type { p2p_Transaction } from '../models/p2p_Transaction.ts';
import type { P2PMultiUseListing } from '../models/P2PMultiUseListing.ts';
import type { CancelablePromise } from '../core/CancelablePromise.ts';
import type { BaseHttpRequest } from '../core/BaseHttpRequest.ts';
export class F2FMultiUseListingsService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * @deprecated
     * Create a new multi-use, face-to-face listing for the logged-in
     * user
     *
     * Multi-use listings can be used to create transactions.
     * Offline access is allowed for this endpoint when the user has
     * granted the `p2p_ls:offline_create` scope to the client
     * that is performing the request.
     *
     * @returns P2PMultiUseListing Created
     * @throws ApiError
     */
    public createP2PMultiUseListingWithDetails({
        requestBody,
    }: {
        requestBody: {
            /**
             * The `charge_calculator_version` value returned from a request to `/p2p/charge`.
             */
            charge_calculator_version: number;
            /**
             * The `charge_seller` value returned from a request to
             * `/p2p/charge`.
             *
             */
            charge_seller?: number;
            currency: Currency;
            /**
             * The `charge` value returned from a request to
             * `/p2p/charge`.
             *
             */
            deposit_charge: number;
            /**
             * The price of the goods being sold, in the
             * `currency`'s smallest unit.  The `charge` value
             * should correspond to the Trustap charge created
             * with this price, otherwise this request will
             * fail with a `400` error.
             *
             */
            deposit_price: number;
            /**
             * A description of the goods being sold.
             *
             */
            description: string;
            role: basic_Role;
            /**
             * If `skip_remainder` is `true` then the
             * transaction will move to the "confirm handover"
             * step after the deposit has been accepted.
             *
             */
            skip_remainder?: boolean;
        },
    }): CancelablePromise<P2PMultiUseListing> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/p2p/me/multi_use_listings/create',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request
                \`code\` can be one of the following:
                 * \`invalid_role\`: '' is not a valid role
                `,
            },
        });
    }
    /**
     * @deprecated
     * Delete this listing
     * @returns void
     * @throws ApiError
     */
    public deleteP2PMultiUseListing({
        listingId,
    }: {
        listingId: number,
    }): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/p2p/multi_use_listings/{listingId}',
            path: {
                'listingId': listingId,
            },
            errors: {
                404: `Not Found`,
            },
        });
    }
    /**
     * @deprecated
     * Get a listing by its ID
     * @returns P2PMultiUseListing OK
     * @throws ApiError
     */
    public getP2PMultiUseListing({
        listingId,
    }: {
        listingId: number,
    }): CancelablePromise<P2PMultiUseListing> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/p2p/multi_use_listings/{listingId}',
            path: {
                'listingId': listingId,
            },
            errors: {
                404: `Not Found`,
            },
        });
    }
    /**
     * @deprecated
     * Patch listing properties
     * @returns P2PMultiUseListing OK
     * @throws ApiError
     */
    public patchP2PMultiUseListing({
        listingId,
        requestBody,
    }: {
        listingId: number,
        requestBody: {
            /**
             * The `charge_calculator_version` value returned from a request to `/p2p/charge`.
             */
            charge_calculator_version?: number;
            currency?: Currency;
            /**
             * The `charge` value returned from a request to
             * `/p2p/charge`.
             *
             */
            deposit_charge?: number;
            /**
             * The deposit price of the goods being sold, in
             * the `currency`'s smallest unit.  The `charge`
             * value should correspond to the Trustap charge
             * created with this price, otherwise this request
             * will fail with a `400` error.
             *
             */
            deposit_price?: number;
            description?: string;
            skip_remainder?: boolean;
        },
    }): CancelablePromise<P2PMultiUseListing> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/p2p/multi_use_listings/{listingId}',
            path: {
                'listingId': listingId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request
                \`code\` can be one of the following:
                 * \`empty_body\`: The request body is empty.
                `,
                404: `Not Found`,
            },
        });
    }
    /**
     * @deprecated
     * Create a transaction from this listing
     * Calling `/create_transaction` with no parameters will create a
     * new transaction with the details provided by the listing.
     *
     * The optional `quantity` parameter can be passed to create a
     * transaction for a multiple of the original listing. In this
     * case, the `price` and `charge` for the new transaction will also
     * need to be passed.
     *
     * As an example, consider a listing for a chair with a price of
     * `1234` `EUR`. If a user wants to buy 10 of these in a single
     * transaction then the charge for the total can be retrieved using
     * `GET /p2p/charge?price=1234&currency=usd&quantity=10` (note the
     * addition of the optional quantity parameter at the end). This
     * will return a `price` of `12340` and an associated `charge`.
     * These new values must then be passed to `/create_transaction`
     * with `quantity=10`, which will create a new transaction with the
     * new pricing information. The new transaction will also include a
     * `quantity` field, which doesn't have a functional effect on the
     * transaction, but is included for informational purposes.
     *
     * Note that this functionality is not available for single-use
     * listings, from which only singular transactions may be created.
     *
     * Offline access is allowed for this endpoint when the user has
     * granted the `p2p_tx:offline_create_join` scope to the client
     * that is performing the request.
     *
     * @returns p2p_Transaction OK
     * @throws ApiError
     */
    public createTransactionFromP2PMultiUseListing({
        listingId,
        quantity,
        price,
        charge,
    }: {
        listingId: number,
        quantity?: number,
        price?: number,
        charge?: number,
    }): CancelablePromise<p2p_Transaction> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/p2p/multi_use_listings/{listingId}/create_transaction',
            path: {
                'listingId': listingId,
            },
            query: {
                'quantity': quantity,
                'price': price,
                'charge': charge,
            },
            errors: {
                400: `Bad Request
                \`code\` can be one of the following:
                 * \`listing_is_disabled\`
                 * \`is_listing_creator\`: The current user created this
                listing.
                `,
                404: `Not Found`,
            },
        });
    }
    /**
     * @deprecated
     * Disable this listing
     * Calling `/create_transaction` on a disabled listing will return
     * a `400` response.
     * Offline access is allowed for this endpoint when the user has
     * granted the `p2p_ls:offline_update` scope to the client
     * that is performing the request.
     *
     * @returns P2PMultiUseListing OK
     * @throws ApiError
     */
    public disableP2PMultiUseListing({
        listingId,
    }: {
        listingId: number,
    }): CancelablePromise<P2PMultiUseListing> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/p2p/multi_use_listings/{listingId}/disable',
            path: {
                'listingId': listingId,
            },
            errors: {
                404: `Not Found`,
            },
        });
    }
    /**
     * @deprecated
     * Enable this listing
     * Offline access is allowed for this endpoint when the user has granted the `p2p_ls:offline_update` scope to the client that is performing the request.
     * @returns P2PMultiUseListing OK
     * @throws ApiError
     */
    public enableP2PMultiUseListing({
        listingId,
    }: {
        listingId: number,
    }): CancelablePromise<P2PMultiUseListing> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/p2p/multi_use_listings/{listingId}/enable',
            path: {
                'listingId': listingId,
            },
            errors: {
                404: `Not Found`,
            },
        });
    }
    /**
     * @deprecated
     * Set pricing for this listing
     * Offline access is allowed for this endpoint when the user has granted the `p2p_ls:offline_update` scope to the client that is performing the request.
     * @returns P2PMultiUseListing OK
     * @throws ApiError
     */
    public setP2PMultiUseListingPricing({
        listingId,
        requestBody,
    }: {
        listingId: number,
        requestBody: {
            /**
             * The `charge_calculator_version` value returned from a request to `/p2p/charge`.
             */
            charge_calculator_version: number;
            currency: Currency;
            /**
             * The `charge` value returned from a request to
             * `/p2p/charge`.
             *
             */
            deposit_charge: number;
            /**
             * The deposit price of the goods being sold, in
             * the `currency`'s smallest unit.  The `charge`
             * value should correspond to the Trustap charge
             * created with this price, otherwise this request
             * will fail with a `400` error.
             *
             */
            deposit_price: number;
        },
    }): CancelablePromise<P2PMultiUseListing> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/p2p/multi_use_listings/{listingId}/set_deposit_pricing',
            path: {
                'listingId': listingId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                404: `Not Found`,
            },
        });
    }
    /**
     * @deprecated
     * Set the description for this listing
     * Offline access is allowed for this endpoint when the user has granted the `p2p_ls:offline_update` scope to the client that is performing the request.
     * @returns P2PMultiUseListing OK
     * @throws ApiError
     */
    public setP2PMultiUseListingDescription({
        listingId,
        requestBody,
    }: {
        listingId: number,
        requestBody: {
            description: string;
        },
    }): CancelablePromise<P2PMultiUseListing> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/p2p/multi_use_listings/{listingId}/set_description',
            path: {
                'listingId': listingId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                404: `Not Found`,
            },
        });
    }
    /**
     * @deprecated
     * Set skip remainder for this listing
     * Offline access is allowed for this endpoint when the user has granted the `p2p_ls:offline_update` scope to the client that is performing the request.
     * @returns P2PMultiUseListing OK
     * @throws ApiError
     */
    public setP2PMultiUseListingSkipRemainder({
        listingId,
        requestBody,
    }: {
        listingId: number,
        requestBody: {
            skip_remainder: boolean;
        },
    }): CancelablePromise<P2PMultiUseListing> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/p2p/multi_use_listings/{listingId}/set_skip_remainder',
            path: {
                'listingId': listingId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                404: `Not Found`,
            },
        });
    }
}
