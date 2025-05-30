/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { personal_VerifiableDate } from './personal_VerifiableDate.ts';
import type { personal_VerifiableIdNumber } from './personal_VerifiableIdNumber.ts';
import type { personal_VerifiablePhone } from './personal_VerifiablePhone.ts';
import type { personal_VerifiableString } from './personal_VerifiableString.ts';
export type personal_Details = {
    address_city: personal_VerifiableString;
    address_country: personal_VerifiableString;
    address_line1: personal_VerifiableString;
    address_line2: personal_VerifiableString;
    address_postal_code: personal_VerifiableString;
    address_state: personal_VerifiableString;
    dob: personal_VerifiableDate;
    id_number: personal_VerifiableIdNumber;
    name_first: personal_VerifiableString;
    name_last: personal_VerifiableString;
    phone: personal_VerifiablePhone;
};

