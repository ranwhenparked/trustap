import type { paths } from "./generated/types.ts";

/**
 * Face-to-face (F2F / p2p) transaction endpoints from the Trustap OpenAPI spec.
 *
 * Values intentionally include the `/api/v1` prefix because the generated
 * OpenAPI paths include it and the default SDK base URLs point at the Trustap
 * host root (for example, `https://dev.stage.trustap.com`).
 */
export const TRUSTAP_F2F_PATHS = {
  batchTransactions: "/api/v1/p2p/batch/transactions",
  charge: "/api/v1/p2p/charge",
  clientTimelines: "/api/v1/p2p/clients/{client_id}/timelines",
  createListingWithSeller: "/api/v1/p2p/listings/create_with_seller",
  transactions: "/api/v1/p2p/me/transactions",
  createAndJoinTransaction: "/api/v1/p2p/me/transactions/create_and_join",
  createWithGuestUser: "/api/v1/p2p/me/transactions/create_with_guest_user",
  transaction: "/api/v1/p2p/transactions/{transaction_id}",
  acceptComplaint: "/api/v1/p2p/transactions/{transaction_id}/accept_complaint",
  acceptDeposit: "/api/v1/p2p/transactions/{transaction_id}/accept_deposit",
  acceptDepositWithGuestSeller:
    "/api/v1/p2p/transactions/{transaction_id}/accept_deposit_with_guest_seller",
  bankTransferDetails:
    "/api/v1/p2p/transactions/{transaction_id}/bank_transfer_details",
  billingDetails: "/api/v1/p2p/transactions/{transaction_id}/billing_details",
  buyerDetails: "/api/v1/p2p/transactions/{transaction_id}/buyer_details",
  cancelWithDescription:
    "/api/v1/p2p/transactions/{transaction_id}/cancel_with_description",
  cancelWithDescriptionWithGuestUser:
    "/api/v1/p2p/transactions/{transaction_id}/cancel_with_description_with_guest_user",
  transactionCharge: "/api/v1/p2p/transactions/{transaction_id}/charge",
  claimForBuyer: "/api/v1/p2p/transactions/{transaction_id}/claim_for_buyer",
  claimForSeller: "/api/v1/p2p/transactions/{transaction_id}/claim_for_seller",
  complain: "/api/v1/p2p/transactions/{transaction_id}/complain",
  complainWithGuestBuyer:
    "/api/v1/p2p/transactions/{transaction_id}/complain_with_guest_buyer",
  confirmDelivery: "/api/v1/p2p/transactions/{transaction_id}/confirm_delivery",
  confirmDeliveryWithGuestBuyer:
    "/api/v1/p2p/transactions/{transaction_id}/confirm_delivery_with_guest_buyer",
  confirmHandover: "/api/v1/p2p/transactions/{transaction_id}/confirm_handover",
  confirmHandoverWithGuestUser:
    "/api/v1/p2p/transactions/{transaction_id}/confirm_handover_with_guest_user",
  depositStripeClientSecret:
    "/api/v1/p2p/transactions/{transaction_id}/deposit_stripe_client_secret",
  endComplaintPeriod:
    "/api/v1/p2p/transactions/{transaction_id}/end_complaint_period",
  endComplaintPeriodWithGuestBuyer:
    "/api/v1/p2p/transactions/{transaction_id}/end_complaint_period_with_guest_buyer",
  joinWithGuest: "/api/v1/p2p/transactions/{transaction_id}/join_with_guest",
  metadata: "/api/v1/p2p/transactions/{transaction_id}/metadata",
  sellerDetails: "/api/v1/p2p/transactions/{transaction_id}/seller_details",
  setDepositPaymentMethod:
    "/api/v1/p2p/transactions/{transaction_id}/set_deposit_payment_method",
  stripePublishableKey:
    "/api/v1/p2p/transactions/{transaction_id}/stripe_publishable_key",
  setPrice: "/api/v1/p2p/transactions/{transactionId}/set_price",
  skipRemainder: "/api/v1/p2p/transactions/{transactionId}/skip_remainder",
  claimAsBuyerByClaimSecret:
    "/api/v1/p2p/transactions_by_claim_secret/{secret}/claim_as_buyer",
  claimAsSellerByClaimSecret:
    "/api/v1/p2p/transactions_by_claim_secret/{secret}/claim_as_seller",
  transactionByJoinCode: "/api/v1/p2p/transactions_by_join_code/{join_code}",
  joinByJoinCode: "/api/v1/p2p/transactions_by_join_code/{join_code}/join",
} as const satisfies Record<string, keyof paths>;

export type TrustapF2FPath =
  (typeof TRUSTAP_F2F_PATHS)[keyof typeof TRUSTAP_F2F_PATHS];

type OpenApiF2FPath = Extract<keyof paths, `/api/v1/p2p/${string}`>;
type AssertAllF2FPathsCovered<T extends never> = T;
type _AllF2FPathsCovered = AssertAllF2FPathsCovered<
  Exclude<OpenApiF2FPath, TrustapF2FPath>
>;
