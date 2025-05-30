/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DocumentVerification } from '../models/DocumentVerification.ts';
import type { personal_BankDetails } from '../models/personal_BankDetails.ts';
import type { personal_DebitAccount } from '../models/personal_DebitAccount.ts';
import type { personal_Details } from '../models/personal_Details.ts';
import type { personal_InstantPayoutBalance } from '../models/personal_InstantPayoutBalance.ts';
import type { personal_PayoutAttempt } from '../models/personal_PayoutAttempt.ts';
import type { personal_VerificationSessionLastError } from '../models/personal_VerificationSessionLastError.ts';
import type { ProfilePayoutStatus } from '../models/ProfilePayoutStatus.ts';
import type { CancelablePromise } from '../core/CancelablePromise.ts';
import type { BaseHttpRequest } from '../core/BaseHttpRequest.ts';
export class PersonalService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Create an account session and retrieve the client secret for it
     * @returns any OK
     * @throws ApiError
     */
    public personalGetAccountSession(): CancelablePromise<{
        client_secret: string;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/me/account_session',
        });
    }
    /**
     * Get debit account details
     * @returns personal_DebitAccount OK
     * @throws ApiError
     */
    public personalGetDebitAccount(): CancelablePromise<personal_DebitAccount> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/me/debit_account',
        });
    }
    /**
     * Set debit account details
     * @returns personal_DebitAccount OK
     * @throws ApiError
     */
    public personalSetDebitAccount({
        requestBody,
    }: {
        requestBody: {
            bank_details?: personal_BankDetails;
            bank_token?: string;
            card_details?: string;
            type: 'bank' | 'bank_token' | 'card';
        },
    }): CancelablePromise<personal_DebitAccount> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/me/debit_account',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request
                \`code\` can be one of the following:
                 * \`routing_number_invalid\`: The routing number is invalid.
                 * \`account_number_invalid\`: The account number is invalid.
                 * \`parameter_missing\`: Parameter is missing.
                 * \`invalid_account_type\`: The given debit account type is invalid.
                 * \`bank_account_unusable\`: The bank account is unusable.
                 * \`bank_details_missing\`: The bank details are missing.
                 * \`bank_token_missing\`: The bank token is missing.
                 * \`card_details_missing\`: The card details are missing.
                `,
            },
        });
    }
    /**
     * Get instant payout balance
     * @returns personal_InstantPayoutBalance OK
     * @throws ApiError
     */
    public personalGetInstantPayoutBalance(): CancelablePromise<personal_InstantPayoutBalance> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/me/instant_payout_balance',
        });
    }
    /**
     * Get the payout attempts that have occurred for this account
     * Payout attempts are returned in reverse chronological order -
     * the first attempt in the returned array will be the most recent
     * payout attempt.
     *
     * @returns personal_PayoutAttempt OK
     * @throws ApiError
     */
    public personalGetPayoutAttempts(): CancelablePromise<Array<personal_PayoutAttempt>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/me/payout_attempts',
        });
    }
    /**
     * Get the verification status for the front side of the secondary identity document
     * @returns DocumentVerification OK
     * @throws ApiError
     */
    public getAdditionalIdentityDocumentVerificationStatus(): CancelablePromise<DocumentVerification> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/me/personal/additional_identity_document/verification_status',
        });
    }
    /**
     * Get the verification status for the back side of the secondary identity document
     * @returns DocumentVerification OK
     * @throws ApiError
     */
    public getAdditionalIdentityDocumentBackVerificationStatus(): CancelablePromise<DocumentVerification> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/me/personal/additional_identity_document_back/verification_status',
        });
    }
    /**
     * Get personal details for the local user
     * @returns personal_Details OK
     * @throws ApiError
     */
    public personalGetDetails(): CancelablePromise<personal_Details> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/me/personal/details',
        });
    }
    /**
     * Set personal details for the local user
     * @returns personal_Details OK
     * @throws ApiError
     */
    public personalSetDetails({
        requestBody,
    }: {
        requestBody: {
            address_city?: string;
            address_line1?: string;
            address_line2?: string;
            address_postal_code?: string;
            address_state?: string;
            dob?: {
                day: number;
                month: number;
                year: number;
            };
            /**
             * The full ID number for this user.
             */
            id_number?: string | null;
            name_first?: string;
            name_last?: string;
            phone?: {
                dial_code: string;
                /**
                 * This field is mostly non-functional, but is instead used to render the dial code for the user. This field is necessary because different countries may use the same dial code (for example, the US and Canada).
                 */
                dial_code_country: string;
                number: string;
            } | null;
        },
    }): CancelablePromise<personal_Details> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/me/personal/details',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get the verification status for the front side of the primary identity document
     * @returns DocumentVerification OK
     * @throws ApiError
     */
    public getIdentityDocumentVerificationStatus(): CancelablePromise<DocumentVerification> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/me/personal/identity_document/verification_status',
        });
    }
    /**
     * Get the verification status for the back side of the primary identity document
     * @returns DocumentVerification OK
     * @throws ApiError
     */
    public getIdentityDocumentBackVerificationStatus(): CancelablePromise<DocumentVerification> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/me/personal/identity_document_back/verification_status',
        });
    }
    /**
     * Get the details for the Stripe publishable key the user is linked to
     *
     * Returns the Publishable Key for the Stripe Platform
     * which the user is linked to.
     *
     * @returns any OK
     * @throws ApiError
     */
    public getStripePublishableKeyForUser(): CancelablePromise<{
        publishable_key?: string;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/me/personal/stripe_publishable_key',
        });
    }
    /**
     * Get the status of a user's ability to accept payouts
     *
     * This endpoint requires
     * the user identified by the `Trustap-User` header to have granted the `profile`
     * scope to the client that is performing the request. Offline access is allowed for this endpoint when the user has
     * granted the `profile` scope to the client
     * that is performing the request.
     *
     * @returns ProfilePayoutStatus OK
     * @throws ApiError
     */
    public getProfilePayoutStatus({
        trustapUser,
    }: {
        /**
         * Required in client flows, where you make API calls on behalf of another Trustap user.
         */
        trustapUser?: string,
    }): CancelablePromise<ProfilePayoutStatus> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/me/profile/payout_status',
            headers: {
                'Trustap-User': trustapUser,
            },
        });
    }
    /**
     * Add a new payout method to the current account using a payment method ID
     * @returns personal_DebitAccount OK
     * @throws ApiError
     */
    public personalAddStripeFinancialConnectionsAccount({
        requestBody,
    }: {
        requestBody: {
            payment_method_id: string;
        },
    }): CancelablePromise<personal_DebitAccount> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/me/stripe_financial_connections/add_account',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get the ownership details from the given SetupIntent using Stripe Financial Connections
     * @returns any OK
     * @throws ApiError
     */
    public personalGetStripeFinancialConnectionsOwnership({
        setupIntentId,
    }: {
        setupIntentId: string,
    }): CancelablePromise<{
        email: string;
        name: string;
        raw_address: string;
        raw_phone: string;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/me/stripe_financial_connections/ownership',
            query: {
                'setup_intent_id': setupIntentId,
            },
            errors: {
                409: `Conflict
                \`code\` can be one of the following:
                 * \`unconfirmed_setup_intent\`: The given SetupIntent has not
                been confirmed
                `,
            },
        });
    }
    /**
     * Get a SetupIntent ID and secret for starting a Stripe Financial
     * Connections session
     *
     * @returns any OK
     * @throws ApiError
     */
    public personalPrepareStripeFinancialConnectionsAccount(): CancelablePromise<{
        setup_intent_client_secret: string;
        setup_intent_id: string;
    }> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/me/stripe_financial_connections/prepare_account',
        });
    }
    /**
     * Create verification method and message if not available
     *
     * @returns any OK
     * @throws ApiError
     */
    public personalGetVerificationMethod(): CancelablePromise<{
        message: string;
        verification_method: string;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/me/verification_method',
        });
    }
    /**
     * Create verification session and retrieve client secret for it
     *
     * Offline access is allowed for this endpoint when the user has granted the `profile` scope to the client that is performing the request.
     * @returns any OK
     * @throws ApiError
     */
    public personalGetVerificationSession(): CancelablePromise<{
        verification_session_client_secret: string;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/me/verification_session',
            errors: {
                400: `Bad Request
                \`code\` can be one of the following:
                 * \`stripe_identity_not_available\`: stripe identity is currently not available for this account.
                `,
            },
        });
    }
    /**
     * Create verification session for native apps that use Stripe native SDK
     * Creates verification session for native apps that use Stripe native SDK,
     * and returns it's `Verification Session ID` with appropriate `Ephemeral Key`.
     * Offline access is allowed for this endpoint when the user has
     * granted the `profile` scope to the client that is performing the request.
     *
     * @returns any OK
     * @throws ApiError
     */
    public personalGetVerificationSessionNative(): CancelablePromise<{
        ephemeral_key: string;
        verification_session_id: string;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/me/verification_session_native',
            errors: {
                400: `Bad Request
                \`code\` can be one of the following:
                 * \`stripe_identity_not_available\`: stripe identity is currently not available for this account.
                `,
            },
        });
    }
    /**
     * Get verification status of the user
     *
     * Offline access is allowed for this endpoint when the user has granted the `profile` scope to the client that is performing the request.
     * @returns any OK
     * @throws ApiError
     */
    public personalGetVerificationStatus(): CancelablePromise<{
        verification_session_id: string;
        verification_session_last_error?: personal_VerificationSessionLastError;
        verification_session_status: string;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/me/verification_status',
        });
    }
}
