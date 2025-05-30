/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { basic_Pricing } from './basic_Pricing.ts';
export type P2PSingleUseListing = {
    allows_multi_use?: boolean;
    created?: string;
    creator_id?: string;
    creator_role?: string;
    currency?: string;
    deposit_pricing?: basic_Pricing;
    description?: string;
    disabled?: string;
    id: number;
    skip_remainder?: boolean;
};

