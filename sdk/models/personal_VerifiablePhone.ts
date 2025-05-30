/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { personal_FieldType } from './personal_FieldType.ts';
import type { personal_InvalidReason } from './personal_InvalidReason.ts';
import type { personal_VerificationStatus } from './personal_VerificationStatus.ts';
export type personal_VerifiablePhone = {
    invalid_reason?: personal_InvalidReason;
    required_now: boolean;
    status: personal_VerificationStatus;
    type: personal_FieldType;
    validation: {
        number_min_length?: number;
    };
    value: {
        dial_code: string;
        /**
         * This field is mostly non-functional, but is instead used to render the phone number for the user. This field is necessary because different countries may use the same dial code (for example, the US and Canada).
         */
        dial_code_country: string;
        number: string;
    };
};

