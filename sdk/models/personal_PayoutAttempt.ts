/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type personal_PayoutAttempt = {
    amount: number;
    arrival_date: number;
    created_date: number;
    failure_code?: 'account_closed' | 'account_frozen' | 'bank_account_restricted' | 'bank_ownership_changed' | 'could_not_process' | 'debit_not_authorized' | 'declined' | 'insufficient_funds' | 'invalid_account_number' | 'incorrect_account_holder_name' | 'incorrect_account_holder_address' | 'incorrect_account_holder_tax_id' | 'invalid_currency' | 'no_account' | 'unsupported_card';
    status: 'paid' | 'pending' | 'in_transit' | 'canceled' | 'failed';
};

