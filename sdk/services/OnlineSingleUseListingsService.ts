/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { basic_Role } from '../models/basic_Role.ts';
import type { basic_SingleUseListing } from '../models/basic_SingleUseListing.ts';
import type { basic_Transaction } from '../models/basic_Transaction.ts';
import type { Currency } from '../models/Currency.ts';
import type { CancelablePromise } from '../core/CancelablePromise.ts';
import type { BaseHttpRequest } from '../core/BaseHttpRequest.ts';
export class OnlineSingleUseListingsService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * @deprecated
     * Create a new single-use listing for the logged-in user
     * Single-use listings are disabled once payment has been submitted
     * for a transaction created from it.
     * Offline access is allowed for this endpoint when the user has
     * granted the `basic_ls:offline_create` scope to the client
     * that is performing the request.
     *
     * @returns basic_SingleUseListing Created
     * @throws ApiError
     */
    public basicCreateSingleUseListing({
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
             * The `charge_seller` value returned from a request to
             * `/charge`.
             *
             */
            charge_seller?: number;
            currency: Currency;
            /**
             * A description of the goods being sold.
             *
             */
            description: string;
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
    }): CancelablePromise<basic_SingleUseListing> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/me/single_use_listings/create',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request
                \`code\` can be one of the following:
                 * \`invalid_role\`: '' is not a valid role
                 * \`incorrect_charge\`
                 * \`incorrect_charge_seller\`
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
    public basicDeleteSingleUseListing({
        listingId,
    }: {
        listingId: string,
    }): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/single_use_listings/{listing_id}',
            path: {
                'listing_id': listingId,
            },
            errors: {
                404: `Not Found`,
            },
        });
    }
    /**
     * @deprecated
     * Get a listing by its ID
     * @returns basic_SingleUseListing OK
     * @throws ApiError
     */
    public basicGetSingleUseListing({
        listingId,
    }: {
        listingId: string,
    }): CancelablePromise<basic_SingleUseListing> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/single_use_listings/{listing_id}',
            path: {
                'listing_id': listingId,
            },
            errors: {
                404: `Not Found`,
            },
        });
    }
    /**
     * @deprecated
     * Patch listing properties
     * @returns basic_SingleUseListing OK
     * @throws ApiError
     */
    public basicUpdateSingleUseListing({
        listingId,
        requestBody,
    }: {
        listingId: string,
        requestBody: {
            /**
             * The `charge` value returned from a request to
             * `/charge`.
             *
             */
            charge?: number;
            /**
             * The `charge_calculator_version` value returned from a request to `/charge`.
             */
            charge_calculator_version?: number;
            /**
             * The `charge_seller` value returned from a request to
             * `/charge`.
             *
             */
            charge_seller?: number;
            currency?: Currency;
            description?: string;
            /**
             * The price of the goods being sold, in the
             * `currency`'s smallest unit.  The `charge` value
             * should correspond to the Trustap charge created
             * with this price, otherwise this request will
             * fail with a `400` error.
             *
             */
            price?: number;
        },
    }): CancelablePromise<basic_SingleUseListing> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/single_use_listings/{listing_id}',
            path: {
                'listing_id': listingId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request
                \`code\` can be one of the following:
                 * \`empty_body\`: The request body is empty.
                 * \`partial_pricing\`: When updating a pricing field, all 3 of
                \`currency\`, \`price\` and \`charge\` must be supplied.
                `,
                404: `Not Found`,
            },
        });
    }
    /**
     * @deprecated
     * Create a transaction from this listing
     * @returns basic_Transaction Created
     * @throws ApiError
     */
    public basicCreateTransactionFromSingleUseListing({
        listingId,
    }: {
        listingId: string,
    }): CancelablePromise<basic_Transaction> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/single_use_listings/{listing_id}/create_transaction',
            path: {
                'listing_id': listingId,
            },
            errors: {
                400: `Bad Request
                \`code\` can be one of the following:
                 * \`listing_is_disabled\`
                 * \`no_listing_currency\`: The source listing doesn't
                have a currency.
                 * \`no_listing_price\`: The source listing doesn't
                have pricing.
                 * \`no_listing_descr\`: The source listing doesn't have
                a description.
                 * \`is_listing_creator\`: The current user created this
                listing.
                `,
                404: `Not Found`,
            },
        });
    }
    /**
     * @deprecated
     * Create a transaction from this listing
     * @returns basic_Transaction Created
     * @throws ApiError
     */
    public basicCreateTransactionWithGuestBuyerFromSingleUseListing({
        listingId,
    }: {
        listingId: string,
    }): CancelablePromise<basic_Transaction> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/single_use_listings/{listing_id}/create_transaction_with_guest_buyer',
            path: {
                'listing_id': listingId,
            },
            errors: {
                400: `Bad Request
                \`code\` can be one of the following:
                 * \`listing_is_disabled\`
                 * \`no_listing_currency\`: The source listing doesn't
                have a currency.
                 * \`no_listing_price\`: The source listing doesn't
                have pricing.
                 * \`no_listing_descr\`: The source listing doesn't have
                a description.
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
     *
     * @returns basic_SingleUseListing OK
     * @throws ApiError
     */
    public basicDisableSingleUseListing({
        listingId,
    }: {
        listingId: string,
    }): CancelablePromise<basic_SingleUseListing> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/single_use_listings/{listing_id}/disable',
            path: {
                'listing_id': listingId,
            },
            errors: {
                404: `Not found`,
            },
        });
    }
    /**
     * @deprecated
     * Enable this listing
     * @returns basic_SingleUseListing OK
     * @throws ApiError
     */
    public basicEnableSingleUseListing({
        listingId,
    }: {
        listingId: string,
    }): CancelablePromise<basic_SingleUseListing> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/single_use_listings/{listing_id}/enable',
            path: {
                'listing_id': listingId,
            },
            errors: {
                404: `Not found`,
            },
        });
    }
    /**
     * @deprecated
     * Set description for this listing
     * @returns basic_SingleUseListing OK
     * @throws ApiError
     */
    public basicSetSingleUseListingDescription({
        listingId,
        requestBody,
    }: {
        listingId: string,
        requestBody: {
            description: string;
        },
    }): CancelablePromise<basic_SingleUseListing> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/single_use_listings/{listing_id}/set_description',
            path: {
                'listing_id': listingId,
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
     * Set pricing for this listing
     * @returns basic_SingleUseListing OK
     * @throws ApiError
     */
    public basicSetSingleUseListingPricing({
        listingId,
        requestBody,
    }: {
        listingId: string,
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
             * The `charge_seller` value returned from a
             * request to `/charge`.
             *
             */
            charge_seller?: number;
            currency: Currency;
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
    }): CancelablePromise<basic_SingleUseListing> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/single_use_listings/{listing_id}/set_pricing',
            path: {
                'listing_id': listingId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                404: `Not Found`,
            },
        });
    }
}
