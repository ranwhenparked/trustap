/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise.ts';
import type { BaseHttpRequest } from '../core/BaseHttpRequest.ts';
export class ClientsService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Get supported registration countries for the current client
     * @returns string OK
     * @throws ApiError
     */
    public clientGetSupportedRegistrationCountries(): CancelablePromise<Array<string>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/client/supported_registration_countries',
        });
    }
}
