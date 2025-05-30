/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { personal_FieldType } from './personal_FieldType.ts';
import type { personal_InvalidReason } from './personal_InvalidReason.ts';
import type { personal_Validation } from './personal_Validation.ts';
import type { personal_VerificationStatus } from './personal_VerificationStatus.ts';
export type personal_VerifiableString = {
    invalid_reason?: personal_InvalidReason;
    required_now: boolean;
    status: personal_VerificationStatus;
    type: personal_FieldType;
    validation: personal_Validation;
    value: string;
};

