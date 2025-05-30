/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { p2p_Cancellation } from './p2p_Cancellation.ts';
import type { p2p_Complaint } from './p2p_Complaint.ts';
import type { p2p_ListingType } from './p2p_ListingType.ts';
import type { p2p_Pricing } from './p2p_Pricing.ts';
import type { p2p_Review } from './p2p_Review.ts';
export type p2p_Transaction = {
    buyer_handover_confirmed?: string;
    buyer_id?: string;
    buyer_is_guest?: boolean;
    cancellation?: p2p_Cancellation;
    cancelled?: string;
    claimed_by_buyer?: string;
    claimed_by_seller?: string;
    client_id: string;
    complained?: string;
    complaint?: p2p_Complaint;
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
    deposit_accepted?: string;
    deposit_paid?: string;
    deposit_pricing: p2p_Pricing;
    deposit_refunded?: string;
    deposit_review?: p2p_Review;
    deposit_review_flagged?: string;
    description: string;
    funds_released?: string;
    id: number;
    /**
     * If the deposit is paid via a delayed payment method,
     * such as SEPA debit, this field will be `true` until the
     * payment has fully succeeded or failed.
     *
     */
    is_deposit_payment_in_progress: boolean;
    /**
     * If the remainder is paid via a delayed payment method,
     * such as SEPA debit, this field will be `true` until the
     * payment has fully succeeded or failed.
     *
     */
    is_remainder_payment_in_progress: boolean;
    join_code?: string;
    joined?: string;
    /**
     * If the transaction is created from a listing then this is
     * the ID of that listing; otherwise this property is omitted.
     *
     */
    listing_id?: string;
    listing_type?: p2p_ListingType;
    order_issue_raised?: string;
    priced?: string;
    pricing?: p2p_Pricing;
    quantity: number;
    refunded?: string;
    rejected?: string;
    relased_to_seller?: string;
    released_to_seller?: boolean;
    remainder_paid?: string;
    remainder_review?: p2p_Review;
    remainder_review_flagged?: string;
    remainder_skipped?: string;
    seller_handover_confirmed?: string;
    seller_id?: string;
    seller_is_guest?: boolean;
    /**
     * If `skip_remainder` is `true` then this transaction will
     * move to the "confirm handover" step after the deposit has
     * been accepted.
     *
     */
    skip_remainder: boolean;
    status: string;
};

