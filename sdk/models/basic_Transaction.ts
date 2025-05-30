/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { basic_Review } from './basic_Review.ts';
import type { Complaint } from './Complaint.ts';
import type { ListingType } from './ListingType.ts';
import type { OrderIssue } from './OrderIssue.ts';
import type { PostaHrTracking } from './PostaHrTracking.ts';
import type { Tracking } from './Tracking.ts';
export type basic_Transaction = {
    amount_refunded?: number;
    amount_released?: number;
    buyer_id?: string;
    cancelled?: string;
    charge: number;
    charge_international_payment?: number;
    charge_postage_buyer?: number;
    charge_postage_client?: number;
    charge_seller: number;
    claimed_by_buyer?: string;
    client_id: string;
    complained?: string;
    complaint?: Complaint;
    complaint_period_deadline?: string;
    complaint_period_ended?: string;
    created: string;
    /**
     * The currency of the transaction. Note that, at present, the
     * buyer must pay using the transaction's currency and the
     * seller will be paid in the transaction's currency.
     *
     */
    currency: string;
    delivered?: string;
    denied?: string;
    description: string;
    funds_released?: string;
    id: number;
    /**
     * If the transaction is paid via a delayed payment method,
     * such as SEPA debit, this field will be `true` until the
     * payment has fully succeeded or failed.
     *
     */
    is_payment_in_progress: boolean;
    join_code?: string;
    joined?: string;
    listing_creator_accepted?: string;
    listing_creator_rejected?: string;
    /**
     * If the transaction is created from a listing then this is
     * the ID of that listing; otherwise this property is omitted.
     *
     */
    listing_id?: string;
    listing_type?: ListingType;
    order_issue?: OrderIssue;
    order_issue_raised?: string;
    paid?: string;
    payment_accepted?: string;
    payment_refunded?: string;
    posta_hr_tracking?: PostaHrTracking;
    price: number;
    quantity: number;
    released_to_seller?: boolean;
    review?: basic_Review;
    review_flagged?: string;
    seller_id?: string;
    shippo_transaction_id?: string;
    status: string;
    tracked?: string;
    tracking?: Tracking;
    tracking_details_deadline?: string;
    tracking_details_window_started?: string;
};

