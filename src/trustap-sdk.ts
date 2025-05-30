import { TrustapHttpClient } from './http-client';
import {
    ApiResponse,
    AuthTokens,
    Balance,
    BankTransferDetails,
    BasicTransaction,
    CarrierFacility,
    Charge,
    CreateGuestUserRequest,
    CreateP2PTransactionRequest,
    CreateTransactionRequest,
    CreateTransactionWithGuestUserRequest,
    GetChargeParams,
    GetNotificationsParams,
    GetP2PChargeParams,
    GetTransactionsParams,
    MultiUseListing,
    Notification,
    P2PMultiUseListing,
    P2PSingleUseListing,
    P2PTransaction,
    ProfilePayoutStatus,
    TrustapConfig,
    User
} from './types';

export class TrustapSDK {
  private httpClient: TrustapHttpClient;

  constructor(config: TrustapConfig) {
    this.httpClient = new TrustapHttpClient(config);
  }

  // Authentication methods
  public async authenticate(username: string, password: string): Promise<ApiResponse<AuthTokens>> {
    return this.httpClient.authenticate(username, password);
  }

  public async refreshToken(): Promise<ApiResponse<AuthTokens>> {
    return this.httpClient.refreshToken();
  }

  public setTokens(tokens: AuthTokens): void {
    this.httpClient.setTokens(tokens);
  }

  public getTokens(): AuthTokens | null {
    return this.httpClient.getTokens();
  }

  public async clearTokens(): Promise<void> {
    return this.httpClient.clearTokens();
  }

  // Charge calculation methods
  /**
   * Get the Trustap fee for an online transaction
   */
  public async getCharge(params: GetChargeParams): Promise<ApiResponse<Charge>> {
    return this.httpClient.get<Charge>('/charge', params, { useApiKey: true });
  }

  /**
   * Get the Trustap fee for a P2P transaction
   */
  public async getP2PCharge(params: GetP2PChargeParams): Promise<ApiResponse<Charge>> {
    return this.httpClient.get<Charge>('/p2p/charge', params);
  }

  // Transaction methods - Basic (Online)
  /**
   * Get multiple online transactions by their IDs
   */
  public async getTransactionsByIds(ids: number[]): Promise<ApiResponse<(BasicTransaction | null)[]>> {
    return this.httpClient.get<(BasicTransaction | null)[]>('/batch/transactions', {
      ids: ids.join(',')
    });
  }

  /**
   * Get paginated list of online transactions
   */
  public async getTransactions(params?: GetTransactionsParams): Promise<ApiResponse<BasicTransaction[]>> {
    return this.httpClient.get<BasicTransaction[]>('/transactions', params);
  }

  /**
   * Create a new online transaction
   */
  public async createTransaction(request: CreateTransactionRequest): Promise<ApiResponse<BasicTransaction>> {
    return this.httpClient.post<BasicTransaction>('/transactions', request);
  }

  /**
   * Create and join an online transaction
   */
  public async createAndJoinTransaction(request: CreateTransactionRequest): Promise<ApiResponse<BasicTransaction>> {
    return this.httpClient.post<BasicTransaction>('/transactions/create_and_join', request);
  }

  /**
   * Create an online transaction with a guest user
   */
  public async createTransactionWithGuestUser(
    request: CreateTransactionWithGuestUserRequest
  ): Promise<ApiResponse<BasicTransaction>> {
    return this.httpClient.post<BasicTransaction>('/transactions/with_guest_user', request);
  }

  // Transaction methods - P2P
  /**
   * Get multiple P2P transactions by their IDs
   */
  public async getP2PTransactionsByIds(ids: number[]): Promise<ApiResponse<(P2PTransaction | null)[]>> {
    return this.httpClient.get<(P2PTransaction | null)[]>('/p2p/batch/transactions', {
      ids: ids.join(',')
    });
  }

  /**
   * Get paginated list of P2P transactions
   */
  public async getP2PTransactions(params?: GetTransactionsParams): Promise<ApiResponse<P2PTransaction[]>> {
    return this.httpClient.get<P2PTransaction[]>('/p2p/transactions', params);
  }

  /**
   * Get a specific P2P transaction by ID
   */
  public async getP2PTransaction(id: number): Promise<ApiResponse<P2PTransaction>> {
    return this.httpClient.get<P2PTransaction>(`/p2p/transactions/${id}`);
  }

  /**
   * Create a new P2P transaction
   */
  public async createP2PTransaction(request: CreateP2PTransactionRequest): Promise<ApiResponse<P2PTransaction>> {
    return this.httpClient.post<P2PTransaction>('/p2p/transactions', request);
  }

  /**
   * Create and join a P2P transaction
   */
  public async createAndJoinP2PTransaction(request: CreateP2PTransactionRequest): Promise<ApiResponse<P2PTransaction>> {
    return this.httpClient.post<P2PTransaction>('/p2p/transactions/create_and_join', request);
  }

  /**
   * Accept deposit for a P2P transaction
   */
  public async acceptP2PDeposit(transactionId: number): Promise<ApiResponse<void>> {
    return this.httpClient.post<void>(`/p2p/transactions/${transactionId}/accept_deposit`);
  }

  /**
   * Cancel a P2P transaction with description
   */
  public async cancelP2PTransaction(transactionId: number, description: string): Promise<ApiResponse<void>> {
    return this.httpClient.post<void>(`/p2p/transactions/${transactionId}/cancel`, { description });
  }

  /**
   * Confirm handover for P2P transaction
   */
  public async confirmP2PHandover(transactionId: number): Promise<ApiResponse<void>> {
    return this.httpClient.post<void>(`/p2p/transactions/${transactionId}/confirm_handover`);
  }

  /**
   * Get bank transfer details for P2P transaction
   */
  public async getP2PBankTransferDetails(transactionId: number): Promise<ApiResponse<BankTransferDetails>> {
    return this.httpClient.get<BankTransferDetails>(`/p2p/transactions/${transactionId}/bank_transfer_details`);
  }

  // User methods
  /**
   * Create a guest user
   */
  public async createGuestUser(request: CreateGuestUserRequest): Promise<ApiResponse<User>> {
    return this.httpClient.post<User>('/guest_users', request);
  }

  /**
   * Get user balances
   */
  public async getUserBalances(): Promise<ApiResponse<Balance[]>> {
    return this.httpClient.get<Balance[]>('/user/balances');
  }

  /**
   * Get supported registration countries for the current client
   */
  public async getSupportedRegistrationCountries(): Promise<ApiResponse<string[]>> {
    return this.httpClient.get<string[]>('/client/supported_registration_countries');
  }

  /**
   * Get profile payout status
   */
  public async getProfilePayoutStatus(): Promise<ApiResponse<ProfilePayoutStatus>> {
    return this.httpClient.get<ProfilePayoutStatus>('/user/profile/payout_status');
  }

  // Listing methods - Basic (Online)
  /**
   * Create a multi-use listing
   */
  public async createMultiUseListing(request: CreateTransactionRequest): Promise<ApiResponse<MultiUseListing>> {
    return this.httpClient.post<MultiUseListing>('/multi_use_listings', request);
  }

  /**
   * Get a multi-use listing by ID
   */
  public async getMultiUseListing(id: number): Promise<ApiResponse<MultiUseListing>> {
    return this.httpClient.get<MultiUseListing>(`/multi_use_listings/${id}`);
  }

  /**
   * Update a multi-use listing
   */
  public async updateMultiUseListing(id: number, request: Partial<CreateTransactionRequest>): Promise<ApiResponse<MultiUseListing>> {
    return this.httpClient.patch<MultiUseListing>(`/multi_use_listings/${id}`, request);
  }

  /**
   * Delete a multi-use listing
   */
  public async deleteMultiUseListing(id: number): Promise<ApiResponse<void>> {
    return this.httpClient.delete<void>(`/multi_use_listings/${id}`);
  }

  /**
   * Create transaction from multi-use listing
   */
  public async createTransactionFromMultiUseListing(id: number, quantity?: number): Promise<ApiResponse<BasicTransaction>> {
    return this.httpClient.post<BasicTransaction>(`/multi_use_listings/${id}/create_transaction`, { quantity });
  }

  /**
   * Enable a multi-use listing
   */
  public async enableMultiUseListing(id: number): Promise<ApiResponse<void>> {
    return this.httpClient.post<void>(`/multi_use_listings/${id}/enable`);
  }

  /**
   * Disable a multi-use listing
   */
  public async disableMultiUseListing(id: number): Promise<ApiResponse<void>> {
    return this.httpClient.post<void>(`/multi_use_listings/${id}/disable`);
  }

  // Listing methods - P2P
  /**
   * Create a P2P multi-use listing
   */
  public async createP2PMultiUseListing(request: CreateP2PTransactionRequest): Promise<ApiResponse<P2PMultiUseListing>> {
    return this.httpClient.post<P2PMultiUseListing>('/p2p/multi_use_listings', request);
  }

  /**
   * Get a P2P multi-use listing by ID
   */
  public async getP2PMultiUseListing(id: number): Promise<ApiResponse<P2PMultiUseListing>> {
    return this.httpClient.get<P2PMultiUseListing>(`/p2p/multi_use_listings/${id}`);
  }

  /**
   * Update a P2P multi-use listing
   */
  public async updateP2PMultiUseListing(id: number, request: Partial<CreateP2PTransactionRequest>): Promise<ApiResponse<P2PMultiUseListing>> {
    return this.httpClient.patch<P2PMultiUseListing>(`/p2p/multi_use_listings/${id}`, request);
  }

  /**
   * Delete a P2P multi-use listing
   */
  public async deleteP2PMultiUseListing(id: number): Promise<ApiResponse<void>> {
    return this.httpClient.delete<void>(`/p2p/multi_use_listings/${id}`);
  }

  /**
   * Create a P2P single-use listing
   */
  public async createP2PSingleUseListing(request: CreateP2PTransactionRequest): Promise<ApiResponse<P2PSingleUseListing>> {
    return this.httpClient.post<P2PSingleUseListing>('/p2p/single_use_listings', request);
  }

  /**
   * Get a P2P single-use listing by ID
   */
  public async getP2PSingleUseListing(id: number): Promise<ApiResponse<P2PSingleUseListing>> {
    return this.httpClient.get<P2PSingleUseListing>(`/p2p/single_use_listings/${id}`);
  }

  // Notification methods
  /**
   * Get paginated list of notifications
   */
  public async getNotifications(params?: GetNotificationsParams): Promise<ApiResponse<Notification[]>> {
    return this.httpClient.get<Notification[]>('/notifications', params);
  }

  /**
   * Get a specific notification by ID
   */
  public async getNotification(id: number): Promise<ApiResponse<Notification>> {
    return this.httpClient.get<Notification>(`/notifications/${id}`);
  }

  /**
   * Mark a notification as read
   */
  public async markNotificationAsRead(id: number): Promise<ApiResponse<void>> {
    return this.httpClient.post<void>(`/notifications/${id}/mark_as_read`);
  }

  // Utility methods
  /**
   * Get carrier facility options
   */
  public async getCarrierFacilityOptions(countryCode: string): Promise<ApiResponse<CarrierFacility[]>> {
    return this.httpClient.get<CarrierFacility[]>('/carrier_facility_options', { country_code: countryCode });
  }
} 