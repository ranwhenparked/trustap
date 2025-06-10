/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseHttpRequest } from './core/BaseHttpRequest.ts.ts';
import { FetchHttpRequest } from './core/FetchHttpRequest.ts.ts';
import type { OpenAPIConfig } from './core/OpenAPI.ts.ts';
import { BuyersAndSellersService } from './services/BuyersAndSellersService.ts.ts';
import { ClientsService } from './services/ClientsService.ts.ts';
import { F2FBuyerSellerDetailsService } from './services/F2FBuyerSellerDetailsService.ts.ts';
import { F2FCancelService } from './services/F2FCancelService.ts.ts';
import { F2FComplaintService } from './services/F2FComplaintService.ts.ts';
import { F2FHandoverService } from './services/F2FHandoverService.ts.ts';
import { F2FMultiUseListingsService } from './services/F2FMultiUseListingsService.ts.ts';
import { F2FPaymentService } from './services/F2FPaymentService.ts.ts';
import { F2FSingleUseListingsService } from './services/F2FSingleUseListingsService.ts.ts';
import { F2FTransactionsService } from './services/F2FTransactionsService.ts.ts';
import { NotificationsService } from './services/NotificationsService.ts.ts';
import { OnlineBuyerSellerDetailsService } from './services/OnlineBuyerSellerDetailsService.ts.ts';
import { OnlineCancelService } from './services/OnlineCancelService.ts.ts';
import { OnlineComplaintService } from './services/OnlineComplaintService.ts.ts';
import { OnlineMultiUseListingsService } from './services/OnlineMultiUseListingsService.ts.ts';
import { OnlinePaymentService } from './services/OnlinePaymentService.ts.ts';
import { OnlineShippingService } from './services/OnlineShippingService.ts.ts';
import { OnlineSingleUseListingsService } from './services/OnlineSingleUseListingsService.ts.ts';
import { OnlineTransactionsService } from './services/OnlineTransactionsService.ts.ts';
import { PersonalService } from './services/PersonalService.ts.ts';
type HttpRequestConstructor = new (config: OpenAPIConfig) => BaseHttpRequest;
export class TrustapClient {
    public readonly buyersAndSellers: BuyersAndSellersService;
    public readonly clients: ClientsService;
    public readonly f2FBuyerSellerDetails: F2FBuyerSellerDetailsService;
    public readonly f2FCancel: F2FCancelService;
    public readonly f2FComplaint: F2FComplaintService;
    public readonly f2FHandover: F2FHandoverService;
    public readonly f2FMultiUseListings: F2FMultiUseListingsService;
    public readonly f2FPayment: F2FPaymentService;
    public readonly f2FSingleUseListings: F2FSingleUseListingsService;
    public readonly f2FTransactions: F2FTransactionsService;
    public readonly notifications: NotificationsService;
    public readonly onlineBuyerSellerDetails: OnlineBuyerSellerDetailsService;
    public readonly onlineCancel: OnlineCancelService;
    public readonly onlineComplaint: OnlineComplaintService;
    public readonly onlineMultiUseListings: OnlineMultiUseListingsService;
    public readonly onlinePayment: OnlinePaymentService;
    public readonly onlineShipping: OnlineShippingService;
    public readonly onlineSingleUseListings: OnlineSingleUseListingsService;
    public readonly onlineTransactions: OnlineTransactionsService;
    public readonly personal: PersonalService;
    public readonly request: BaseHttpRequest;
    constructor(config?: Partial<OpenAPIConfig>, HttpRequest: HttpRequestConstructor = FetchHttpRequest) {
        this.request = new HttpRequest({
            BASE: config?.BASE ?? 'https://dev.stage.trustap.com/api/v1',
            VERSION: config?.VERSION ?? '0.1.0',
            WITH_CREDENTIALS: config?.WITH_CREDENTIALS ?? false,
            CREDENTIALS: config?.CREDENTIALS ?? 'include',
            TOKEN: config?.TOKEN,
            USERNAME: config?.USERNAME,
            PASSWORD: config?.PASSWORD,
            HEADERS: config?.HEADERS,
            ENCODE_PATH: config?.ENCODE_PATH,
        });
        this.buyersAndSellers = new BuyersAndSellersService(this.request);
        this.clients = new ClientsService(this.request);
        this.f2FBuyerSellerDetails = new F2FBuyerSellerDetailsService(this.request);
        this.f2FCancel = new F2FCancelService(this.request);
        this.f2FComplaint = new F2FComplaintService(this.request);
        this.f2FHandover = new F2FHandoverService(this.request);
        this.f2FMultiUseListings = new F2FMultiUseListingsService(this.request);
        this.f2FPayment = new F2FPaymentService(this.request);
        this.f2FSingleUseListings = new F2FSingleUseListingsService(this.request);
        this.f2FTransactions = new F2FTransactionsService(this.request);
        this.notifications = new NotificationsService(this.request);
        this.onlineBuyerSellerDetails = new OnlineBuyerSellerDetailsService(this.request);
        this.onlineCancel = new OnlineCancelService(this.request);
        this.onlineComplaint = new OnlineComplaintService(this.request);
        this.onlineMultiUseListings = new OnlineMultiUseListingsService(this.request);
        this.onlinePayment = new OnlinePaymentService(this.request);
        this.onlineShipping = new OnlineShippingService(this.request);
        this.onlineSingleUseListings = new OnlineSingleUseListingsService(this.request);
        this.onlineTransactions = new OnlineTransactionsService(this.request);
        this.personal = new PersonalService(this.request);
    }
}