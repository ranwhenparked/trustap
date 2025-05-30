/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type p2p_Charge = {
    /**
     * The Trustap fee that the buyer will pay, in the `currency`'s
     * smallest unit, for a queried amount. See [the Stripe
     * documentation](https://stripe.com/docs/currencies#zero-decimal)
     * for more details.
     *
     */
    charge: number;
    /**
     * The version of the Trustap charge calculator that was used
     * to calculate this charge.
     *
     * This property is present for error-handling purposes. The
     * Trustap API allows apps and users to query how much Trustap
     * will charge for a transaction before creating a transaction.
     * Trustap then requires the queried charge to be provided when
     * creating a transaction or listing. At this point the charge
     * is calculated again and checked against the provided charge,
     * to ensure that the charge calculated for the new resource is
     * the same as the one shown to the user. In the unlikely event
     * that the Trustap charge calculator used to calculate the
     * charge has been updated, then the
     * `charge_calculator_version` property will be used to return
     * an `incorrect_calc_version` to the API client, which will
     * indicate that the `/charge` endpoint should be queried again
     * to get the newest charge value.
     *
     */
    charge_calculator_version: number;
    /**
     * The Trustap fee that the seller will pay, in the
     * `currency`'s smallest unit, for a queried amount. See [the
     * Stripe
     * documentation](https://stripe.com/docs/currencies#zero-decimal)
     * for more details.
     *
     */
    charge_seller: number;
    currency: string;
    price: number;
};

