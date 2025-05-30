/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { basic_Role } from '../models/basic_Role.ts';
import type { Currency } from '../models/Currency.ts';
import type { p2p_Transaction } from '../models/p2p_Transaction.ts';
import type { P2PSingleUseListing } from '../models/P2PSingleUseListing.ts';
import type { CancelablePromise } from '../core/CancelablePromise.ts';
import type { BaseHttpRequest } from '../core/BaseHttpRequest.ts';
export class F2FSingleUseListingsService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * @deprecated
     * Create a new single-use, face-to-face listing for the logged-in
     * user
     *
     * Single-use listings are disabled once the remainder has been
     * paid for a transaction created from it.
     * Offline access is allowed for this endpoint when the user has
     * granted the `p2p_ls:offline_create` scope to the client
     * that is performing the request.
     *
     * @returns P2PSingleUseListing Created
     * @throws ApiError
     */
    public createP2PSingleUseListingWithDetails({
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
             * The deposit price of the goods being sold, in
             * the `currency`'s smallest unit.  The `charge`
             * value should correspond to the Trustap charge
             * created with this price, otherwise this request
             * will fail with a `400` error.
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
    }): CancelablePromise<P2PSingleUseListing> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/p2p/me/single_use_listings/create',
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
    public deleteP2PSingleUseListing({
        listingId,
    }: {
        listingId: number,
    }): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/p2p/single_use_listings/{listingId}',
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
     * @returns P2PSingleUseListing OK
     * @throws ApiError
     */
    public getP2PSingleUseListing({
        listingId,
    }: {
        listingId: number,
    }): CancelablePromise<P2PSingleUseListing> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/p2p/single_use_listings/{listingId}',
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
     * @returns P2PSingleUseListing OK
     * @throws ApiError
     */
    public patchP2PSingleUseListing({
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
    }): CancelablePromise<P2PSingleUseListing> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/p2p/single_use_listings/{listingId}',
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
     * Offline access is allowed for this endpoint when the user has granted the `p2p_tx:offline_create_join` scope to the client that is performing the request.
     * @returns p2p_Transaction OK
     * @throws ApiError
     */
    public createTransactionFromP2PSingleUseListing({
        listingId,
    }: {
        listingId: number,
    }): CancelablePromise<p2p_Transaction> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/p2p/single_use_listings/{listingId}/create_transaction',
            path: {
                'listingId': listingId,
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
     * @returns P2PSingleUseListing OK
     * @throws ApiError
     */
    public disableP2PSingleUseListing({
        listingId,
    }: {
        listingId: number,
    }): CancelablePromise<P2PSingleUseListing> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/p2p/single_use_listings/{listingId}/disable',
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
     * @returns P2PSingleUseListing OK
     * @throws ApiError
     */
    public enableP2PSingleUseListing({
        listingId,
    }: {
        listingId: number,
    }): CancelablePromise<P2PSingleUseListing> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/p2p/single_use_listings/{listingId}/enable',
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
     * @returns P2PSingleUseListing OK
     * @throws ApiError
     */
    public setP2PSingleUseListingPricing({
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
    }): CancelablePromise<P2PSingleUseListing> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/p2p/single_use_listings/{listingId}/set_deposit_pricing',
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
     * @returns P2PSingleUseListing OK
     * @throws ApiError
     */
    public setP2PSingleUseListingDescription({
        listingId,
        requestBody,
    }: {
        listingId: number,
        requestBody: {
            description: string;
        },
    }): CancelablePromise<P2PSingleUseListing> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/p2p/single_use_listings/{listingId}/set_description',
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
