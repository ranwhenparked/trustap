/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Currency } from '../models/Currency.ts';
import type { p2p_BankTransferDetails } from '../models/p2p_BankTransferDetails.ts';
import type { p2p_Charge } from '../models/p2p_Charge.ts';
import type { p2p_DepositPaymentMethod } from '../models/p2p_DepositPaymentMethod.ts';
import type { p2p_Transaction } from '../models/p2p_Transaction.ts';
import type { CancelablePromise } from '../core/CancelablePromise.ts';
import type { BaseHttpRequest } from '../core/BaseHttpRequest.ts';
export class F2FPaymentService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Get the Trustap fee for a face-to-face transaction
     * This returns the Trustap fee, in the `currency`'s smallest unit,
     * for a transaction involving goods with the supplied `price`. See
     * [the Stripe
     * documentation](https://stripe.com/docs/currencies#zero-decimal)
     * for more details.
     *
     * @returns p2p_Charge OK
     * @throws ApiError
     */
    public p2PGetCharge({
        currency,
        price,
        feeMultiplier,
        quantity,
        paymentMethod,
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
         * be `/p2p/charge?price=1234&currency=usd`.
         *
         */
        price: number,
        /**
         * The `fee_multiplier` parameter is used to apply a higher percentage
         * fee based on the total price of the transaction. The percentage fee
         * is calculated multiplying the `percentage fee` by the `fee_multiplier`.
         *
         */
        feeMultiplier?: number,
        /**
         * When creating transactions from a multi-use listing, the
         * `quantity` parameter can be provided in order to generate a
         * charge for the given price multiplied by the given quantity.
         * See `/p2p/multi_use_listings/{listingId}/create_transaction`
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
    }): CancelablePromise<p2p_Charge> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/p2p/charge',
            query: {
                'currency': currency,
                'price': price,
                'fee_multiplier': feeMultiplier,
                'quantity': quantity,
                'payment_method': paymentMethod,
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
     * Update the description, currency, price and/or charge of this face-to-face transaction
     * @returns p2p_Transaction OK
     * @throws ApiError
     */
    public updateF2FTransaction({
        transactionId,
        requestBody,
    }: {
        transactionId: number,
        requestBody: {
            currency?: Currency;
            deposit_charge?: number;
            deposit_price?: number;
            /**
             * A description of the goods being sold.
             *
             */
            description?: string;
        },
    }): CancelablePromise<p2p_Transaction> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/p2p/transactions/{transaction_id}',
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
     * Accept the deposit for this face-to-face transaction as a guest seller
     * @returns p2p_Transaction OK
     * @throws ApiError
     */
    public p2PAcceptDepositWithGuestSeller({
        transactionId,
    }: {
        transactionId: number,
    }): CancelablePromise<p2p_Transaction> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/p2p/transactions/{transaction_id}/accept_deposit_with_guest_seller',
            path: {
                'transaction_id': transactionId,
            },
            errors: {
                403: `Forbidden
                \`code\` can be one of the following:
                 * \`not_seller\`
                 * \`subject_is_not_guest_user\`
                 * \`deposit_not_paid\`
                 * \`deposit_already_accepted\`
                `,
                404: `Not Found`,
            },
        });
    }
    /**
     * Get the bank transfer details for a face-to-face transaction which payment method is `bank_transfer`
     *
     * @returns p2p_BankTransferDetails OK
     * @throws ApiError
     */
    public p2PGetBankTransferDetails({
        transactionId,
    }: {
        transactionId: number,
    }): CancelablePromise<p2p_BankTransferDetails> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/p2p/transactions/{transaction_id}/bank_transfer_details',
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
     * Set the payment details and process a payment for this face-to-face transaction
     * with this user's balance
     *
     * @returns p2p_Transaction OK
     * @throws ApiError
     */
    public p2PPayDepositWithBalanceForTransaction({
        transactionId,
    }: {
        transactionId: number,
    }): CancelablePromise<p2p_Transaction> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/p2p/transactions/{transaction_id}/pay_deposit_with_balance',
            path: {
                'transaction_id': transactionId,
            },
            errors: {
                400: `Bad Request
                \`code\` can be one of the following:
                 * \`already_paid\`
                 * \`insufficient_funds\`
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
     * Set the payment details and process a payment for this face-to-face transaction
     * with this user's balance
     *
     * @returns p2p_Transaction OK
     * @throws ApiError
     */
    public p2PPayRemainderWithBalanceForTransaction({
        transactionId,
    }: {
        transactionId: number,
    }): CancelablePromise<p2p_Transaction> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/p2p/transactions/{transaction_id}/pay_remainder_with_balance',
            path: {
                'transaction_id': transactionId,
            },
            errors: {
                400: `Bad Request
                \`code\` can be one of the following:
                 * \`missing_pricing\`
                 * \`remainder_already_paid\`
                 * \`already_cancelled\`
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
     * Set deposit payment method for this face-to-face transaction
     * Set deposit payment method for face-to-face transaction. Values can be `card`,
     * `bank_transfer`, `p24`, `sepa` and `fpx`.
     *
     * @returns p2p_Transaction OK
     * @throws ApiError
     */
    public p2PSetDepositPaymentMethod({
        transactionId,
        requestBody,
    }: {
        transactionId: number,
        requestBody: p2p_DepositPaymentMethod,
    }): CancelablePromise<p2p_Transaction> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/p2p/transactions/{transaction_id}/set_deposit_payment_method',
            path: {
                'transaction_id': transactionId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request
                \`code\` can be one of the following:
                 * \`invalid_payment_method\`
                 * \`deposit_already_paid\`
                `,
            },
        });
    }
    /**
     * Accept the deposit for this face-to-face transaction
     * Offline access is allowed for this endpoint when the user has granted the `p2p_tx:offline_accept_deposit` scope to the client that is performing the request.
     * @returns p2p_Transaction OK
     * @throws ApiError
     */
    public acceptDepositForP2PTransaction({
        transactionId,
    }: {
        transactionId: number,
    }): CancelablePromise<p2p_Transaction> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/p2p/transactions/{transactionId}/accept_deposit',
            path: {
                'transactionId': transactionId,
            },
            errors: {
                403: `Forbidden
                \`code\` can be one of the following:
                 * \`not_seller\`
                `,
                404: `Not Found`,
            },
        });
    }
    /**
     * Set the total price for this face-to-face transaction
     * `price` is the total price of the item, and thus includes the
     * price already paid for the deposit.
     *
     * Note that this endpoint will return a `remainder_too_low`
     * response if the difference between the total price and the
     * deposit price is too low.
     * Offline access is allowed for this endpoint when the user has
     * granted the `p2p_tx:offline_set_price` scope to the client
     * that is performing the request.
     *
     * @returns p2p_Transaction OK
     * @throws ApiError
     */
    public setPriceForP2PTransaction({
        transactionId,
        requestBody,
    }: {
        transactionId: number,
        requestBody: {
            /**
             * The `charge` value returned from a request to
             * `/p2p/charge`.
             *
             */
            charge: number;
            /**
             * The `charge_calculator_version` value returned from a request to `/p2p/charge`.
             */
            charge_calculator_version: number;
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
    }): CancelablePromise<p2p_Transaction> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/p2p/transactions/{transactionId}/set_price',
            path: {
                'transactionId': transactionId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request
                \`code\` can be one of the following:
                 * \`currency_mismatch\`: Pricing currency is different
                to the transaction's currency.
                 * \`remainder_already_skipped\`
                 * \`remainder_too_low\`: The difference between the
                total price of this transaction isn't larger than
                the deposit price.
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
     * Skip the remainder for this face-to-face transaction
     * This will skip the remainder payment of this transaction, and
     * the total price of the transaction will not need to be set. Note
     * that this must be done before the total price of the transaction
     * is set using `/set_price`.
     *
     * @returns p2p_Transaction OK
     * @throws ApiError
     */
    public skipRemainderForP2PTransaction({
        transactionId,
    }: {
        transactionId: number,
    }): CancelablePromise<p2p_Transaction> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/p2p/transactions/{transactionId}/skip_remainder',
            path: {
                'transactionId': transactionId,
            },
            errors: {
                400: `Bad Request
                \`code\` can be one of the following:
                 * \`price_already_set\`
                `,
                403: `Forbidden
                \`code\` can be one of the following:
                 * \`not_seller\`
                `,
                404: `Not Found`,
            },
        });
    }
}
