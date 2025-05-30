// Core API Types
export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, any>;
}

export interface ApiResponse<T = any> {
  data?: T;
  error?: ApiError;
}

// Basic Types
export type Currency = string;
export type Role = 'buyer' | 'seller';

// Charge Types
export interface Charge {
  /** The Trustap fee that the buyer will pay, in the currency's smallest unit */
  charge: number;
  /** The version of the Trustap charge calculator used */
  charge_calculator_version: number;
  /** Postage fee charged to buyer when handling postage labels */
  charge_postage_buyer?: number;
  /** Postage fee charged to client */
  charge_postage_client?: number;
  /** The Trustap fee that the seller will pay, in the currency's smallest unit */
  charge_seller: number;
  /** Transaction currency */
  currency: Currency;
  /** Transaction price */
  price: number;
}

// User Types
export interface UserDetailsName {
  first_name: string;
  last_name: string;
}

export interface UserDetails {
  email: string;
  name?: UserDetailsName;
  phone?: string;
}

export interface TosAcceptance {
  ip: string;
  unix_timestamp: number;
}

export interface CreateGuestUserRequest {
  country_code?: string;
  email: string;
  first_name: string;
  last_name: string;
  tos_acceptance: TosAcceptance;
}

export interface User {
  id: string;
  email: string;
  name?: UserDetailsName;
  phone?: string;
  country_code?: string;
  created?: string;
  is_guest?: boolean;
}

// Address Types
export interface ShippingDetailsAddress {
  city: string;
  country: string;
  line1: string;
  line2: string;
  postal_code: string;
  state: string;
}

export interface ShippingDetails {
  address: ShippingDetailsAddress;
  name: string;
  phone: string;
}

// Pricing Types
export interface Pricing {
  /** The price of the goods, in the currency's smallest unit */
  price: number;
  /** The Trustap fee, in the currency's smallest unit */
  charge: number;
}

// Transaction Types
export interface BasicTransaction {
  id: number;
  currency: Currency;
  description: string;
  pricing: Pricing;
  status: string;
  created: string;
  buyer_id?: string;
  seller_id?: string;
  buyer_is_guest?: boolean;
  seller_is_guest?: boolean;
  join_code?: string;
  joined?: string;
  priced?: string;
  cancelled?: string;
  funds_released?: string;
  client_id: string;
}

export interface P2PTransaction {
  id: number;
  currency: Currency;
  description: string;
  deposit_pricing: Pricing;
  pricing?: Pricing;
  status: string;
  skip_remainder: boolean;
  quantity: number;
  created: string;
  buyer_id?: string;
  seller_id?: string;
  buyer_is_guest?: boolean;
  seller_is_guest?: boolean;
  join_code?: string;
  joined?: string;
  priced?: string;
  deposit_paid?: string;
  deposit_accepted?: string;
  remainder_paid?: string;
  remainder_skipped?: string;
  seller_handover_confirmed?: string;
  cancelled?: string;
  funds_released?: string;
  complaint_period_deadline?: string;
  complaint_period_ended?: string;
  is_deposit_payment_in_progress: boolean;
  is_remainder_payment_in_progress: boolean;
  client_id: string;
  listing_id?: string;
  listing_type?: ListingType;
}

// Listing Types
export type ListingType = 'multi_use' | 'single_use';

export interface MultiUseListing {
  id: number;
  currency: Currency;
  description: string;
  pricing: Pricing;
  role: Role;
  created: string;
  creator_id: string;
  disabled?: string;
}

export interface SingleUseListing {
  id: number;
  currency: Currency;
  description: string;
  pricing: Pricing;
  role: Role;
  created: string;
  creator_id: string;
  disabled?: string;
  allows_multi_use: boolean;
}

export interface P2PMultiUseListing {
  id: number;
  currency?: string;
  description?: string;
  deposit_pricing?: Pricing;
  created?: string;
  creator_id?: string;
  creator_role?: string;
  skip_remainder?: boolean;
}

export interface P2PSingleUseListing {
  id: number;
  currency?: string;
  description?: string;
  deposit_pricing?: Pricing;
  created?: string;
  creator_id?: string;
  creator_role?: string;
  skip_remainder?: boolean;
  allows_multi_use: boolean;
  disabled?: string;
}

// Create Transaction Types
export interface CreateTransactionRequest {
  role: Role;
  currency: Currency;
  price: number;
  description: string;
  charge: number;
  charge_calculator_version: number;
  charge_seller?: number;
}

export interface CreateTransactionWithGuestUserRequest extends CreateTransactionRequest {
  guest_user: CreateGuestUserRequest;
}

export interface CreateP2PTransactionRequest {
  currency: Currency;
  deposit_price: number;
  description: string;
  deposit_charge: number;
  charge_calculator_version: number;
  skip_remainder?: boolean;
}

// Bank Transfer Types
export interface FinancialAddress {
  account_holder_name: string;
  account_number: string;
  bank_name: string;
  routing_number?: string;
  sort_code?: string;
  iban?: string;
  bic?: string;
}

export interface BankTransferDetails {
  amount: number;
  currency: Currency;
  financial_address: FinancialAddress;
  hosted_instructions_url: string;
  reference: string;
}

// Notification Types
export interface Notification {
  id: number;
  created: string;
  user_id: string;
  description: string;
  target: string;
  read?: string;
}

// Carrier Types
export interface CarrierFacility {
  delivery_type: string;
  name: string;
  postal_code: string;
  address: string;
  city: string;
  code?: string;
}

// Tracking Types
export interface Tracking {
  carrier: string;
  tracking_code: string;
}

// Balance Types
export interface Balance {
  currency: Currency;
  amount: number;
}

// Profile Types
export interface ProfilePayoutStatus {
  status: 'complete' | 'verifying' | 'due';
}

// Payment Method Types
export type PaymentMethod = 'card' | 'bank_transfer' | 'sepa_debit' | 'instant_bank_transfer';

// Query Parameters
export interface GetTransactionsParams {
  page?: number;
  per_page?: number;
  status?: string;
  role?: Role;
}

export interface GetChargeParams {
  currency: Currency;
  price: number;
  quantity?: number;
  payment_method?: PaymentMethod;
  use_hr_post?: boolean;
  postage_fee?: number;
}

export interface GetP2PChargeParams {
  currency: Currency;
  deposit_price: number;
  skip_remainder?: boolean;
  payment_method?: PaymentMethod;
}

export interface GetNotificationsParams {
  page?: number;
  per_page?: number;
  unread_only?: boolean;
}

// API Configuration Types
export interface TrustapConfig {
  baseUrl?: string;
  clientId?: string;
  clientSecret?: string;
  apiKey?: string;
  environment?: 'staging' | 'production';
}

export interface AuthTokens {
  access_token: string;
  refresh_token?: string;
  expires_in?: number;
  token_type?: string;
} 