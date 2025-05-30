/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { p2p_FinancialAddress } from './p2p_FinancialAddress.ts';
export type p2p_BankTransferDetails = {
    amount: number;
    currency: string;
    financial_address: p2p_FinancialAddress;
    hosted_instructions_url: string;
    reference: string;
};

