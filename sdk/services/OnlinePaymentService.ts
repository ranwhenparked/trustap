/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { basic_BankTransferDetails } from '../models/basic_BankTransferDetails.ts';
import type { basic_Charge } from '../models/basic_Charge.ts';
import type { basic_Transaction } from '../models/basic_Transaction.ts';
import type { CancelablePromise } from '../core/CancelablePromise.ts';
import type { BaseHttpRequest } from '../core/BaseHttpRequest.ts';
export class OnlinePaymentService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Get the Trustap fee for an online transaction
     * This returns the Trustap fee, in the `currency`'s smallest unit,
     * for a transaction involving goods with the supplied `price`. See
     * [the Stripe
     * documentation](https://stripe.com/docs/currencies#zero-decimal)
     * for more details.
     *
     * @returns basic_Charge OK
     * @throws ApiError
     */
    public basicGetCharge({
        currency,
        price,
        quantity,
        paymentMethod,
        useHrPost,
        postageFee,
    }: {
        /**
         * The currency that the `price` is specified in.
         *
         */
        currency: string,
        /**
         * The price of the goods being sold in this transaction, in
         * the `currency`'s smallest unit. For example, if a trading
         * card is being sold for $12.34 (with `currency` as `usd`),
         * then the request for the charge for this transaction would
         * be `/charge?price=1234&currency=usd`.
         *
         */
        price: number,
        /**
         * When creating transactions from a multi-use listing, the
         * `quantity` parameter can be provided in order to generate a
         * charge for the given price multiplied by the given quantity.
         * See `/multi_use_listings/{listingId}/create_transaction`
         * for more details.
         *
         */
        quantity?: number,
        /**
         * The payment method that will be used to pay for the
         * transaction. This is necessary because different payment
         * methods may result in different fees.
         *
         * The default value is `card`.
         *
         */
        paymentMethod?: string,
        useHrPost?: boolean,
        /**
         * The custom `postage_fee` for the transaction.
         */
        postageFee?: number,
    }): CancelablePromise<basic_Charge> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/charge',
            query: {
                'currency': currency,
                'price': price,
                'quantity': quantity,
                'payment_method': paymentMethod,
                'use_hr_post': useHrPost,
                'postage_fee': postageFee,
            },
            errors: {
                400: `Bad Request
                \`code\` can be one of the following:
                 * \`currency_missing\`
                 * \`invalid_price\`
                 * \`negative_price\`
                 * \`price_too_low\`
                 * \`unsupported_currency\`
                `,
            },
        });
    }
    /**
     * Update the description, currency, price and/or charge of an online transaction
     * @returns basic_Transaction OK
     * @throws ApiError
     */
    public updateTransaction({
        transactionId,
        requestBody,
    }: {
        transactionId: number,
        requestBody: {
            /**
             * The `charge` value returned from a request to
             * `/charge`.
             *
             */
            charge?: number;
            /**
             * The `charge_seller` value returned from a
             * request to `/charge`.
             *
             */
            charge_seller?: number;
            currency?: string;
            /**
             * A description of the goods being sold.
             *
             */
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
    }): CancelablePromise<basic_Transaction> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/transactions/{transaction_id}',
            path: {
                'transaction_id': transactionId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request
                \`code\` can be one of the following:
                 * \`invalid_id\`
                 * \`second_party_already_joined\`
                 * \`values_not_changed\`
                `,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * Enable the seller to accept payment for an online transaction
     * This endpoint lets the seller accept payment and is accessible only if the seller
     * has granted a feature `require_seller_acceptance`.
     * Offline access is allowed for this endpoint when the user has
     * granted the `basic_tx:offline_accept_payment` scope to the client
     * that is performing the request.
     *
     * @returns basic_Transaction OK
     * @throws ApiError
     */
    public basicAcceptPayment({
        transactionId,
    }: {
        transactionId: number,
    }): CancelablePromise<basic_Transaction> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/transactions/{transaction_id}/accept_payment',
            path: {
                'transaction_id': transactionId,
            },
            errors: {
                400: `Bad Request
                \`code\` can be one of the following:
                 * \`missing_required_feature\`
                 * \`payment_already_accepted\`
                 * \`transaction_not_paid_yet\`
                `,
                404: `Not Found`,
            },
        });
    }
    /**
     * Enable payment acceptance for the seller using `Trustap-User` for an online transaction
     * This endpoint allows payment acceptance for the seller specified in the
     * header as `Trustap-User`.
     *
     * @returns basic_Transaction OK
     * @throws ApiError
     */
    public basicAcceptPaymentWithGuestSeller({
        transactionId,
        trustapUser,
    }: {
        transactionId: number,
        /**
         * Required in client flows, where you make API calls on behalf of another Trustap user.
         */
        trustapUser?: string,
    }): CancelablePromise<basic_Transaction> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/transactions/{transaction_id}/accept_payment_with_guest_seller',
            path: {
                'transaction_id': transactionId,
            },
            headers: {
                'Trustap-User': trustapUser,
            },
            errors: {
                400: `Bad Request
                \`code\` can be one of the following:
                 * \`missing_required_feature\`
                 * \`payment_already_accepted\`
                 * \`missing_shippo_shipping_rate_id\`
                 * \`transaction_not_paid_yet\`
                `,
                404: `Not Found`,
            },
        });
    }
    /**
     * Get bank transfer details for an online transaction which payment method is `bank_transfer`
     *
     * @returns basic_BankTransferDetails OK
     * @throws ApiError
     */
    public basicGetBankTransferDetails({
        transactionId,
    }: {
        transactionId: number,
    }): CancelablePromise<basic_BankTransferDetails> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/transactions/{transaction_id}/bank_transfer_details',
            path: {
                'transaction_id': transactionId,
            },
            errors: {
                400: `Bad Request
                \`code\` can be one of the following:
                 * \`payment_method_not_bank_transfer\`
                `,
            },
        });
    }
    /**
     * Get the Trustap fee for an online transaction
     * This returns the Trustap fee, in the `currency`'s smallest unit,
     * for a transaction involving goods with the supplied `price`. See
     * [the Stripe
     * documentation](https://stripe.com/docs/currencies#zero-decimal)
     * for more details.
     *
     * @returns basic_Charge OK
     * @throws ApiError
     */
    public basicGetChargeForTransaction({
        transactionId,
        price,
        quantity,
        paymentMethod,
    }: {
        transactionId: number,
        /**
         * The price of the goods being sold in this transaction, in
         * the `currency`'s smallest unit. For example, if a trading
         * card is being sold for $12.34 (with `currency` as `usd`),
         * then the request for the charge for this transaction would
         * be `/charge?price=1234&currency=usd`.
         *
         */
        price: number,
        /**
         * When creating transactions from a multi-use listing, the
         * `quantity` parameter can be provided in order to generate a
         * charge for the given price multiplied by the given quantity.
         * See `/multi_use_listings/{listingId}/create_transaction`
         * for more details.
         *
         */
        quantity?: number,
        /**
         * The payment method that will be used to pay for the
         * transaction. This is necessary because different payment
         * methods may result in different fees.
         *
         * The default value is `card`.
         *
         */
        paymentMethod?: string,
    }): CancelablePromise<basic_Charge> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/transactions/{transaction_id}/charge',
            path: {
                'transaction_id': transactionId,
            },
            query: {
                'price': price,
                'quantity': quantity,
                'payment_method': paymentMethod,
            },
            errors: {
                400: `Bad Request
                \`code\` can be one of the following:
                 * \`invalid_payment_method\`
                 * \`unsupported_currency\`
                 * \`currency_missing\`
                 * \`invalid_price\`
                 * \`negative_price\`
                 * \`price_too_low\`
                `,
            },
        });
    }
    /**
     * Set the payment details and process a payment for this online transaction
     * with this user's balance
     *
     * @returns basic_Transaction OK
     * @throws ApiError
     */
    public basicPayWithBalanceForTransaction({
        transactionId,
    }: {
        transactionId: number,
    }): CancelablePromise<basic_Transaction> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/transactions/{transaction_id}/pay_with_balance',
            path: {
                'transaction_id': transactionId,
            },
            errors: {
                400: `Bad Request
                \`code\` can be one of the following:
                 * \`already_paid\`
                 * \`insufficient_funds\`
                 * \`not_accepted\`: This transaction was created from a
                listing but the listing's creator has not yet
                accepted this transaction.
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
     * Set the payment method to be used for this online transaction
     *
     * Different payment methods incur different rates, so the payment
     * method to be used for a transaction must be set before the
     * payment is made. This requires retrieving the charge associated
     * with the payment method using
     * `GET /transactions/{transaction_id}/charge`, and passing the
     * generated charge as a parameter to this endpoint.
     *
     * @returns basic_Transaction OK
     * @throws ApiError
     */
    public basicSetPaymentMethodForTransaction({
        transactionId,
        requestBody,
    }: {
        transactionId: number,
        requestBody: {
            /**
             * The `charge` value returned from a request to
             * `/charge`.
             *
             */
            charge: number;
            /**
             * The `charge_seller` value returned from a request to
             * `/charge`.
             *
             */
            charge_seller?: number;
            currency: string;
            payment_method?: string;
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
            url: '/transactions/{transaction_id}/set_payment_method',
            path: {
                'transaction_id': transactionId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request
                \`code\` can be one of the following:
                 * \`invalid_payment_method\`
                 * \`unsupported_currency\`
                 * \`currency_missing\`
                 * \`incorrect_charge\`
                 * \`incorrect_charge_seller\`
                 * \`incorrect_price\`
                 * \`incorrect_currency\`
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
