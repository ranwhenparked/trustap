/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type ProfilePayoutStatus = {
    /**
     * Payout status will be one of the following:
     * - `complete`: The user has completed their profile and payment information,
     * and can accept payouts.
     * - `verifying`: The user has submitted profile and payment information, which
     * is currently being verified.
     * - `due`: The user has not adequately filled out their payment information,
     * or may need to update or ammend the provided information before they can
     * accept payouts.
     *
     */
    status: 'complete' | 'verifying' | 'due';
};

