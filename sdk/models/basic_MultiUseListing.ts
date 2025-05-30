/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { basic_Pricing } from './basic_Pricing.ts';
import type { basic_Role } from './basic_Role.ts';
export type basic_MultiUseListing = {
    created: string;
    creator_id: string;
    creator_role: basic_Role;
    currency?: string;
    description?: string;
    disabled?: string;
    id: string;
    pricing?: basic_Pricing;
};

