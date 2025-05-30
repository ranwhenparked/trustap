/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { personal_DateValidation } from './personal_DateValidation.ts';
import type { personal_FieldType } from './personal_FieldType.ts';
import type { personal_InvalidReason } from './personal_InvalidReason.ts';
import type { personal_VerificationStatus } from './personal_VerificationStatus.ts';
export type personal_VerifiableDate = {
    invalid_reason?: personal_InvalidReason;
    required_now: boolean;
    status: personal_VerificationStatus;
    type: personal_FieldType;
    validation: personal_DateValidation;
    value: {
        day: number;
        month: number;
        year: number;
    };
};

