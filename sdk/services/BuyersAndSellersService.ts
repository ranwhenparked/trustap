/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { users_Balances } from '../models/users_Balances.ts';
import type { users_Features } from '../models/users_Features.ts';
import type { users_GuestUser } from '../models/users_GuestUser.ts';
import type { users_TosAcceptance } from '../models/users_TosAcceptance.ts';
import type { CancelablePromise } from '../core/CancelablePromise.ts';
import type { BaseHttpRequest } from '../core/BaseHttpRequest.ts';
export class BuyersAndSellersService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Create a new guest user
     * This endpoint creates guest user which can be used as the buyer or the seller.
     * If guest user is used as the seller in a transaction, they need to be created with
     * `country_code` parameter correctly set. This is important because of currencies
     * they can use in their transactions.
     * `tos_acceptance` is the parameter which is important for disputes/chargeback and
     * represent the timestamp when Trustap ToS were accepted https://www.trustap.com/terms.
     *
     * @returns users_GuestUser Created
     * @throws ApiError
     */
    public usersCreateGuestUser({
        requestBody,
    }: {
        requestBody: {
            country_code?: string;
            email: string;
            first_name: string;
            last_name: string;
            tos_acceptance: users_TosAcceptance;
        },
    }): CancelablePromise<users_GuestUser> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/guest_users',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request
                \`code\` can be one of the following:
                 * \`email_missing\`
                 * \`first_name_missing\`
                 * \`last_name_missing\`
                 * \`tos_acceptance_ip_missing\`
                 * \`invalid_country_code\`
                 * \`invalid_email\`
                 * \`invalid_tos_acceptance_date\`
                `,
            },
        });
    }
    /**
     * Get the balance for the current user in each currency
     * @returns users_Balances OK
     * @throws ApiError
     */
    public usersGetBalances(): CancelablePromise<users_Balances> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/me/balances',
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * Get the status enabled/disabled of user's features
     * @returns users_Features OK
     * @throws ApiError
     */
    public usersGetUserFeatures(): CancelablePromise<users_Features> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/me/features',
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * Allow users to turn instant payouts feature on/off
     * @returns users_Features OK
     * @throws ApiError
     */
    public usersSetInstantPayouts({
        requestBody,
    }: {
        requestBody: {
            enabled: boolean;
        },
    }): CancelablePromise<users_Features> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/me/features/instant_payouts',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
            },
        });
    }
}
