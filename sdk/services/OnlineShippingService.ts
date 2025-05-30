/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { basic_CarrierFacility } from '../models/basic_CarrierFacility.ts';
import type { basic_DeliveryDetails } from '../models/basic_DeliveryDetails.ts';
import type { basic_DistanceUnit } from '../models/basic_DistanceUnit.ts';
import type { basic_MassUnit } from '../models/basic_MassUnit.ts';
import type { basic_PickUpDetails } from '../models/basic_PickUpDetails.ts';
import type { basic_ShipmentLabel } from '../models/basic_ShipmentLabel.ts';
import type { basic_ShippoAddress } from '../models/basic_ShippoAddress.ts';
import type { basic_ShippoParcel } from '../models/basic_ShippoParcel.ts';
import type { basic_ShippoRate } from '../models/basic_ShippoRate.ts';
import type { basic_ShippoShippingRatesResponse } from '../models/basic_ShippoShippingRatesResponse.ts';
import type { basic_Transaction } from '../models/basic_Transaction.ts';
import type { Carrier } from '../models/Carrier.ts';
import type { ShippingDetails } from '../models/ShippingDetails.ts';
import type { ShippoLabelDetails } from '../models/ShippoLabelDetails.ts';
import type { CancelablePromise } from '../core/CancelablePromise.ts';
import type { BaseHttpRequest } from '../core/BaseHttpRequest.ts';
export class OnlineShippingService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Get the list of facilities for a given carrier
     * @returns basic_CarrierFacility OK
     * @throws ApiError
     */
    public basicGetCarrierFacilityOptions({
        carrierId,
        requestBody,
    }: {
        carrierId: string,
        requestBody: {
            /**
             * ISO 3166-1 alpha-2 country code.
             *
             */
            country_code: string;
            /**
             * The type of delivery or collection method we want to get options from.
             * `delivery_type` can be one of the following:
             * * `parcel_locker`
             * * `post_office`
             *
             */
            delivery_type: string;
            /**
             * Filter text that is used to search available facilities.
             * It can include `City`, `Postal Code` or a string contained within Facility name.
             *
             */
            search_text: string;
        },
    }): CancelablePromise<Array<basic_CarrierFacility>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/me/carriers/{carrier_id}/facilities',
            path: {
                'carrier_id': carrierId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request
                \`code\` can be one of the following:
                 * \`invalid_carrier\`
                 * \`invalid_delivery_type\`
                `,
            },
        });
    }
    /**
     * Get the list of Shippo shipping rates available
     * This returns the list of Shippo shipping rates available
     * for the addreses provided i.e sender's address and recipient's
     * address.
     *
     * @returns basic_ShippoShippingRatesResponse OK
     * @throws ApiError
     */
    public basicGetShippoShippingRates({
        requestBody,
    }: {
        requestBody: {
            currency: string;
            customs_certify?: boolean;
            customs_certify_signer?: string;
            customs_description?: string;
            customs_eel_pfc?: string;
            customs_incoterm?: string;
            customs_mass_unit?: string;
            customs_net_weight?: number;
            customs_non_delivery_option?: 'return' | 'abandon';
            customs_origin_country?: string;
            customs_quantity?: number;
            customs_value_amount?: string;
            customs_value_currency?: string;
            parcel_distance_unit: basic_DistanceUnit;
            parcel_height: number;
            parcel_length: number;
            parcel_mass_unit: basic_MassUnit;
            parcel_weight: number;
            parcel_width: number;
            recipient_city: string;
            recipient_country: string;
            recipient_full_name: string;
            recipient_phone: string;
            recipient_state: string;
            recipient_street_1: string;
            recipient_street_2?: string;
            recipient_zip_code: string;
            sender_city: string;
            sender_country: string;
            sender_full_name: string;
            sender_phone: string;
            sender_state: string;
            sender_street_1: string;
            sender_street_2?: string;
            sender_zip_code: string;
        },
    }): CancelablePromise<basic_ShippoShippingRatesResponse> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/shippo_shipping_rates',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request
                \`code\` can be one of the following:
                 * \`missing_shipment_details\`
                `,
            },
        });
    }
    /**
     * Get the supported carriers
     * This returns the carriers that are currently supported for
     * automated tracking in the online model. The carrier `name`
     * should be shown to users but the `code` should be submitted to
     * the `/track` endpoint when submitting tracking details.
     * Likewise, when showing a transaction to the user, the `carrier`
     * field stored with the transaction should be used to index these
     * carriers and show the human-readable name of the carrier to the
     * user, if this index is found.
     *
     * @returns Carrier OK
     * @throws ApiError
     */
    public getSupportedCarriers(): CancelablePromise<Array<Carrier>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/supported_carriers',
        });
    }
    /**
     * Confirm delivery for this online transaction
     * This endpoint allows the buyer to manually confirm the delivery of the
     * item in the case that the state of the transaction was not updated
     * asynchronously by Trustap.
     *
     * @returns basic_Transaction OK
     * @throws ApiError
     */
    public basicConfirmDelivery({
        transactionId,
    }: {
        transactionId: number,
    }): CancelablePromise<basic_Transaction> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/transactions/{transaction_id}/confirm_delivery',
            path: {
                'transaction_id': transactionId,
            },
            errors: {
                400: `Bad Request
                \`code\` can be one of the following:
                 * \`tracking_not_added\`
                 * \`delivery_already_set\`
                 * \`invalid_id\`
                `,
                403: `Forbidden
                \`code\` can be one of the following:
                 * \`not_buyer\`
                `,
                404: `Not Found`,
            },
        });
    }
    /**
     * Confirm delivery for this online transaction
     * This endpoint allows the client to manually confirm the delivery
     * on behalf of the guest buyer specified in the header as `Trustap-User`.
     *
     * @returns basic_Transaction OK
     * @throws ApiError
     */
    public basicConfirmDeliveryWithGuestBuyer({
        transactionId,
        trustapUser,
    }: {
        transactionId: number,
        /**
         * Required in client flows, where you make API calls on behalf of another Trustap user.
         */
        trustapUser?: string,
    }): CancelablePromise<basic_Transaction> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/transactions/{transaction_id}/confirm_delivery_with_guest_buyer',
            path: {
                'transaction_id': transactionId,
            },
            headers: {
                'Trustap-User': trustapUser,
            },
            errors: {
                400: `Bad Request
                \`code\` can be one of the following:
                 * \`tracking_not_added\`
                 * \`delivery_already_set\`
                 * \`invalid_id\`
                `,
                403: `Forbidden
                \`code\` can be one of the following:
                 * \`not_buyer\`
                `,
                404: `Not Found`,
            },
        });
    }
    /**
     * Set a delivery point for HR posta
     * @returns basic_DeliveryDetails OK
     * @throws ApiError
     */
    public basicSetDeliveryPoint({
        transactionId,
        requestBody,
    }: {
        transactionId: number,
        requestBody: {
            carrier: string;
            city: string;
            delivery_center_code: string;
            delivery_type: 'parcel_locker' | 'postal_office';
            email: string;
            full_name: string;
            house_number: string;
            house_number_suffix?: string;
            phone: string;
            postal_code: string;
            street: string;
        },
    }): CancelablePromise<basic_DeliveryDetails> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/transactions/{transaction_id}/delivery_point',
            path: {
                'transaction_id': transactionId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request
                \`code\` can be one of the following:
                 * \`empty_join_code\`
                 * \`empty_name\`
                 * \`empty_phone\`
                 * \`empty_email\`
                 * \`empty_street\`
                 * \`empty_house_number\`
                 * \`empty_postal_code\`
                 * \`empty_city\`
                 * \`empty_delivery_center_code\`
                 * \`empty_delivery_type\`
                 * \`empty_carrier\`
                 * \`unsupported_carrier\`
                 * \`unsupported_delivery_type\`
                `,
            },
        });
    }
    /**
     * Extend tracking details submission deadline for this online transaction
     * This endpoint allows the buyer to extend the tracking details
     * submission deadline for the seller.
     *
     * @returns basic_Transaction OK
     * @throws ApiError
     */
    public basicExtendTrackingDeadlineForTransaction({
        transactionId,
    }: {
        transactionId: number,
    }): CancelablePromise<basic_Transaction> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/transactions/{transaction_id}/extend_tracking_deadline',
            path: {
                'transaction_id': transactionId,
            },
            errors: {
                400: `Bad Request
                \`code\` can be one of the following:
                 * \`invalid_id\`
                 * \`tracking_already_added\`
                 * \`payment_details_not_added\`
                 * \`tracking_submission_window_not_started\`
                `,
                403: `Forbidden
                \`code\` can be one of the following:
                 * \`not_buyer\`
                `,
                404: `Not Found`,
            },
        });
    }
    /**
     * Generate a shipment label for this online transaction's parcel
     * This endpoint returns a PDF containing the label for the
     * transaction's parcel. Both sender and recipient details
     * have to be submitted before making a call to this endpoint.
     *
     * @returns basic_ShipmentLabel OK
     * @throws ApiError
     */
    public basicGenerateShipmentLabel({
        transactionId,
        carrier,
    }: {
        transactionId: number,
        carrier: string,
    }): CancelablePromise<basic_ShipmentLabel> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/transactions/{transaction_id}/generate_shipment_label',
            path: {
                'transaction_id': transactionId,
            },
            query: {
                'carrier': carrier,
            },
            errors: {
                400: `Bad Request
                \`code\` can be one of the following:
                 * \`pick_up_details_missing\`
                 * \`drop_off_details_missing\`
                `,
                403: `Forbidden
                \`code\` can be one of the following:
                 * \`not_seller\`
                `,
                404: `Not Found`,
            },
        });
    }
    /**
     * Set a pick up point for carrier (i.e HR posta)
     * @returns basic_PickUpDetails OK
     * @throws ApiError
     */
    public basicSetPickUpPoint({
        transactionId,
        requestBody,
    }: {
        transactionId: number,
        requestBody: {
            carrier: string;
            city: string;
            delivery_type: 'parcel_locker' | 'postal_office';
            email: string;
            full_name: string;
            house_number: string;
            house_number_suffix?: string;
            phone: string;
            pick_up_center_code: string;
            postal_code: string;
            street: string;
        },
    }): CancelablePromise<basic_PickUpDetails> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/transactions/{transaction_id}/pick_up_point',
            path: {
                'transaction_id': transactionId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request
                \`code\` can be one of the following:
                 * \`empty_join_code\`
                 * \`empty_full_name\`
                 * \`empty_phone\`
                 * \`empty_email\`
                 * \`empty_street\`
                 * \`empty_house_number\`
                 * \`empty_postal_code\`
                 * \`empty_city\`
                 * \`empty_pick_up_center_code\`
                 * \`empty_delivery_type\`
                 * \`empty_carrier\`
                 * \`unsupported_carrier\`
                 * \`unsupported_delivery_type\`
                `,
            },
        });
    }
    /**
     * Get the shipping details of the buyer from this online transaction
     * @returns ShippingDetails OK
     * @throws ApiError
     */
    public basicGetShippingDetailsFromTransaction({
        transactionId,
    }: {
        transactionId: number,
    }): CancelablePromise<ShippingDetails> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/transactions/{transaction_id}/shipping_details',
            path: {
                'transaction_id': transactionId,
            },
            errors: {
                404: `Not Found`,
            },
        });
    }
    /**
     * Post the shipping details of the buyer from this online transaction
     * @returns ShippingDetails OK
     * @throws ApiError
     */
    public basicSetShippingDetails({
        transactionId,
        requestBody,
    }: {
        transactionId: number,
        requestBody: {
            address_line_1?: string;
            address_line_2?: string;
            city?: string;
            country: string;
            name: string;
            phone?: string;
            postal_code?: string;
            state?: string;
        },
    }): CancelablePromise<ShippingDetails> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/transactions/{transaction_id}/shipping_details',
            path: {
                'transaction_id': transactionId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request
                \`code\` can be one of the following:
                 * \`empty_name\`
                 * \`empty_country\`
                `,
                404: `Not Found`,
            },
        });
    }
    /**
     * Set the sender's or recipient's address for Shippo shipment
     * @returns basic_ShippoAddress OK
     * @throws ApiError
     */
    public basicSetShippoAddress({
        transactionId,
        requestBody,
    }: {
        transactionId: number,
        requestBody: {
            city: string;
            country: string;
            full_name: string;
            is_sender_address: boolean;
            phone: string;
            state: string;
            street_1: string;
            street_2?: string;
            zip_code: string;
        },
    }): CancelablePromise<basic_ShippoAddress> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/transactions/{transaction_id}/shippo_address',
            path: {
                'transaction_id': transactionId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request
                \`code\` can be one of the following:
                 * \`missing_tx_feature\`
                `,
            },
        });
    }
    /**
     * Send a customs declaration for this online transaction's shipment
     * @returns void
     * @throws ApiError
     */
    public basicSetShippoCustomsDeclaration({
        transactionId,
        requestBody,
    }: {
        transactionId: number,
        requestBody: {
            certify: boolean;
            certify_signer: string;
            description: string;
            eel_pfc?: string;
            incoterm?: string;
            mass_unit: string;
            net_weight: number;
            non_delivery_option: 'return' | 'abandon';
            origin_country: string;
            quantity: number;
            value_amount: string;
            value_currency: string;
        },
    }): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/transactions/{transaction_id}/shippo_customs_declaration',
            path: {
                'transaction_id': transactionId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request
                \`code\` can be one of the following:
                 * \`missing_tx_feature\`
                 * \`customs_declaration_already_submitted\`
                 * \`nothing_to_declare\`
                `,
            },
        });
    }
    /**
     * Set Shippo parcel details for this online transaction
     * @returns basic_ShippoParcel OK
     * @throws ApiError
     */
    public basicSetShippoParcelDetails({
        transactionId,
        requestBody,
    }: {
        transactionId: number,
        requestBody: {
            distance_unit: basic_DistanceUnit;
            height: number;
            length: number;
            mass_unit: basic_DistanceUnit;
            /**
             * Date the shipment will be tendered to the carrier.
             * Must be in the format 2014-01-18T00:35:03.463Z
             *
             */
            shipment_date: string;
            weight: number;
            width: number;
        },
    }): CancelablePromise<basic_ShippoParcel> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/transactions/{transaction_id}/shippo_parcel_details',
            path: {
                'transaction_id': transactionId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request
                \`code\` can be one of the following:
                 * \`missing_tx_feature\`
                 * \`wrong_shipment_date_format\`
                `,
            },
        });
    }
    /**
     * Get Shippo generated label details for this online transaction
     * @returns ShippoLabelDetails OK
     * @throws ApiError
     */
    public basicGetShippoShippingLabel({
        transactionId,
    }: {
        transactionId: number,
    }): CancelablePromise<ShippoLabelDetails> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/transactions/{transaction_id}/shippo_shipping_label',
            path: {
                'transaction_id': transactionId,
            },
            errors: {
                400: `Bad Request
                \`code\` can be one of the following:
                 * \`transaction_not_tracked\`
                `,
            },
        });
    }
    /**
     * Set Shippo shipping rate for this online transaction
     * Set Shippo shipping rate for the transaction.
     * This rate will be used to purchase the Shippo label once the
     * transaction is paid. Shipment ID can be provided as an optional parameter,
     * depending on the flow which is used to obtain it.
     *
     * @returns void
     * @throws ApiError
     */
    public basicSetShippoShippingRate({
        transactionId,
        requestBody,
    }: {
        transactionId: number,
        requestBody: {
            rate_id: string;
            shipment_id?: string;
        },
    }): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/transactions/{transaction_id}/shippo_shipping_rate',
            path: {
                'transaction_id': transactionId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request
                \`code\` can be one of the following:
                 * \`missing_tx_feature\`
                `,
            },
        });
    }
    /**
     * Get Shippo shipping rates based on the sender's and recipient's address and parcel details
     * @returns basic_ShippoRate OK
     * @throws ApiError
     */
    public basicGetShippoShippingRatesForTransaction({
        transactionId,
    }: {
        transactionId: number,
    }): CancelablePromise<Array<basic_ShippoRate>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/transactions/{transaction_id}/shippo_shipping_rates',
            path: {
                'transaction_id': transactionId,
            },
            errors: {
                400: `Bad Request
                \`code\` can be one of the following:
                 * \`missing_tx_feature\`
                 * \`missing_shipment_details\`
                 * \`customs_declaration_required\`
                `,
            },
        });
    }
    /**
     * Set postal tracking details for this online transaction
     * After the tracking information has been submitted then the state
     * of the transaction will be updated asynchronously by Trustap
     * once the delivery of the item has been confirmed, at which point
     * the `delivered` field of the transaction will be set.
     * Offline access is allowed for this endpoint when the user has
     * granted the `basic_tx:offline_track` scope to the client
     * that is performing the request.
     *
     * @returns basic_Transaction OK
     * @throws ApiError
     */
    public basicTrackTransaction({
        transactionId,
        requestBody,
    }: {
        transactionId: number,
        requestBody: {
            carrier: string;
            tracking_code: string;
        },
    }): CancelablePromise<basic_Transaction> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/transactions/{transaction_id}/track',
            path: {
                'transaction_id': transactionId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request
                \`code\` can be one of the following:
                 * \`invalid_id\`
                 * \`empty_carrier\`
                 * \`empty_tracking_code\`
                 * \`tracking_already_added\`
                 * \`payment_details_not_added\`
                 * \`tracking_details_deadline_expired\`
                 * \`already_cancelled\`
                `,
                403: `Forbidden
                \`code\` can be one of the following:
                 * \`not_seller\`
                `,
                404: `Not Found`,
            },
        });
    }
    /**
     * Set postal tracking details for this online transaction
     * Add tracking details for the guest seller specified
     * in the header as `Trustap-User`.
     *
     * @returns basic_Transaction OK
     * @throws ApiError
     */
    public basicTrackTransactionWithGuestSeller({
        transactionId,
        requestBody,
        trustapUser,
    }: {
        transactionId: number,
        requestBody: {
            carrier: string;
            tracking_code: string;
        },
        /**
         * Required in client flows, where you make API calls on behalf of another Trustap user.
         */
        trustapUser?: string,
    }): CancelablePromise<basic_Transaction> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/transactions/{transaction_id}/track_with_guest_seller',
            path: {
                'transaction_id': transactionId,
            },
            headers: {
                'Trustap-User': trustapUser,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request
                \`code\` can be one of the following:
                 * \`invalid_id\`
                 * \`empty_carrier\`
                 * \`empty_tracking_code\`
                 * \`tracking_already_added\`
                 * \`payment_details_not_added\`
                 * \`tracking_details_deadline_expired\`
                 * \`already_cancelled\`
                `,
                403: `Forbidden
                \`code\` can be one of the following:
                 * \`not_seller\`
                `,
                404: `Not Found`,
            },
        });
    }
}
