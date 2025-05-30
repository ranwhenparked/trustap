/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { basic_MultiUseListing } from '../models/basic_MultiUseListing.ts';
import type { basic_Role } from '../models/basic_Role.ts';
import type { basic_Transaction } from '../models/basic_Transaction.ts';
import type { Currency } from '../models/Currency.ts';
import type { CancelablePromise } from '../core/CancelablePromise.ts';
import type { BaseHttpRequest } from '../core/BaseHttpRequest.ts';
export class OnlineMultiUseListingsService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * @deprecated
     * Create a new multi-use listing for the logged-in user
     * Multi-use listings are disabled once payment has been submitted
     * for a transaction created from it.
     * Offline access is allowed for this endpoint when the user has
     * granted the `basic_ls:offline_create` scope to the client
     * that is performing the request.
     *
     * @returns basic_MultiUseListing Created
     * @throws ApiError
     */
    public basicCreateMultiUseListing({
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
    }): CancelablePromise<basic_MultiUseListing> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/me/multi_use_listings/create',
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
    public basicDeleteMultiUseListing({
        listingId,
    }: {
        listingId: string,
    }): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/multi_use_listings/{listing_id}',
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
     * @returns basic_MultiUseListing OK
     * @throws ApiError
     */
    public basicGetMultiUseListing({
        listingId,
    }: {
        listingId: string,
    }): CancelablePromise<basic_MultiUseListing> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/multi_use_listings/{listing_id}',
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
     * @returns basic_MultiUseListing OK
     * @throws ApiError
     */
    public basicUpdateMultiUseListing({
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
    }): CancelablePromise<basic_MultiUseListing> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/multi_use_listings/{listing_id}',
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
     * `GET /charge?price=1234&currency=usd&quantity=10` (note the
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
     * @returns basic_Transaction Created
     * @throws ApiError
     */
    public basicCreateTransactionFromMultiUseListing({
        listingId,
        quantity,
        price,
        charge,
        paymentMethod,
    }: {
        listingId: string,
        quantity?: number,
        price?: number,
        charge?: number,
        paymentMethod?: string,
    }): CancelablePromise<basic_Transaction> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/multi_use_listings/{listing_id}/create_transaction',
            path: {
                'listing_id': listingId,
            },
            query: {
                'quantity': quantity,
                'price': price,
                'charge': charge,
                'payment_method': paymentMethod,
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
    public basicCreateTransactionWithGuestBuyerFromMultiUseListing({
        listingId,
    }: {
        listingId: string,
    }): CancelablePromise<basic_Transaction> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/multi_use_listings/{listing_id}/create_transaction_with_guest_buyer',
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
     * @returns basic_MultiUseListing OK
     * @throws ApiError
     */
    public basicDisableMultiUseListing({
        listingId,
    }: {
        listingId: string,
    }): CancelablePromise<basic_MultiUseListing> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/multi_use_listings/{listing_id}/disable',
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
     * @returns basic_MultiUseListing OK
     * @throws ApiError
     */
    public basicEnableMultiUseListing({
        listingId,
    }: {
        listingId: string,
    }): CancelablePromise<basic_MultiUseListing> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/multi_use_listings/{listing_id}/enable',
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
     * @returns basic_MultiUseListing OK
     * @throws ApiError
     */
    public basicSetMultiUseListingDescription({
        listingId,
        requestBody,
    }: {
        listingId: string,
        requestBody: {
            description: string;
        },
    }): CancelablePromise<basic_MultiUseListing> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/multi_use_listings/{listing_id}/set_description',
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
     * @returns basic_MultiUseListing OK
     * @throws ApiError
     */
    public basicSetMultiUseListingPricing({
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
    }): CancelablePromise<basic_MultiUseListing> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/multi_use_listings/{listing_id}/set_pricing',
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
