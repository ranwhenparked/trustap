/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { personal_FieldType } from './personal_FieldType.ts';
import type { personal_InvalidReason } from './personal_InvalidReason.ts';
import type { personal_VerificationStatus } from './personal_VerificationStatus.ts';
export type personal_VerifiableIdNumber = {
    invalid_reason?: personal_InvalidReason;
    required_now: boolean;
    status: personal_VerificationStatus;
    type: personal_FieldType;
    validation: {
        max_length?: number;
        min_length?: number;
    };
    value: {
        provided: boolean;
    };
};

