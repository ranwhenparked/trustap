/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Optional error information if there was an error in the verification session.
 *
 */
export type personal_VerificationSessionLastError = {
    code: 'abandoned' | 'consent_declined' | 'country_not_supported' | 'device_not_supported' | 'document_expired' | 'document_type_not_supported' | 'document_unverified_other' | 'email_unverified_other' | 'email_verification_declined' | 'id_number_insufficient_document_data' | 'id_number_mismatch' | 'id_number_unverified_other' | 'phone_unverified_other' | 'phone_verification_declined' | 'selfie_document_missing_photo' | 'selfie_face_mismatch' | 'selfie_manipulated' | 'selfie_unverified_other' | 'under_supported_age';
    /**
     * Explanation or description related to the error code.
     *
     */
    reason: string;
};

