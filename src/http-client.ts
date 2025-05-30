import { getStorage } from './storage';
import { ApiError, ApiResponse, AuthTokens, TrustapConfig } from './types';

export interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  headers?: Record<string, string>;
  body?: any;
  useAuth?: boolean;
  useApiKey?: boolean;
}

export class TrustapHttpClient {
  private config: TrustapConfig;
  private tokens: AuthTokens | null = null;

  constructor(config: TrustapConfig) {
    this.config = {
      baseUrl: config.environment === 'production' 
        ? 'https://dev.trustap.com/api/v1'
        : 'https://dev.stage.trustap.com/api/v1',
      ...config
    };
    this.loadTokensFromStorage();
  }

  private async loadTokensFromStorage(): Promise<void> {
    try {
      const storage = await getStorage();
      const tokensJson = await storage.getItem('trustap_tokens');
      if (tokensJson) {
        this.tokens = JSON.parse(tokensJson);
      }
    } catch (error) {
      console.warn('Failed to load tokens from storage:', error);
    }
  }

  private async saveTokensToStorage(tokens: AuthTokens): Promise<void> {
    try {
      const storage = await getStorage();
      await storage.setItem('trustap_tokens', JSON.stringify(tokens));
      this.tokens = tokens;
    } catch (error) {
      console.warn('Failed to save tokens to storage:', error);
    }
  }

  public async clearTokens(): Promise<void> {
    try {
      const storage = await getStorage();
      await storage.removeItem('trustap_tokens');
      this.tokens = null;
    } catch (error) {
      console.warn('Failed to clear tokens from storage:', error);
    }
  }

  public setTokens(tokens: AuthTokens): void {
    this.saveTokensToStorage(tokens);
  }

  public getTokens(): AuthTokens | null {
    return this.tokens;
  }

  private async buildHeaders(options: RequestOptions = {}): Promise<Record<string, string>> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...options.headers
    };

    if (options.useApiKey && this.config.apiKey) {
      // API Key auth uses Basic auth with API key as username
      const credentials = btoa(`${this.config.apiKey}:`);
      headers['Authorization'] = `Basic ${credentials}`;
    } else if (options.useAuth !== false && this.tokens?.access_token) {
      headers['Authorization'] = `Bearer ${this.tokens.access_token}`;
    }

    return headers;
  }

  private buildUrl(endpoint: string, params?: Record<string, any>): string {
    const url = new URL(endpoint, this.config.baseUrl);
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, String(value));
        }
      });
    }

    return url.toString();
  }

  private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    const contentType = response.headers.get('content-type');
    const isJson = contentType?.includes('application/json');

    if (!response.ok) {
      let error: ApiError;
      
      if (isJson) {
        try {
          const errorData = await response.json();
          error = {
            code: errorData.code || 'unknown_error',
            message: errorData.message || `HTTP ${response.status}: ${response.statusText}`,
            details: errorData
          };
        } catch {
          error = {
            code: 'parse_error',
            message: `Failed to parse error response (HTTP ${response.status})`
          };
        }
      } else {
        error = {
          code: 'http_error',
          message: `HTTP ${response.status}: ${response.statusText}`
        };
      }

      return { error };
    }

    if (response.status === 204 || !isJson) {
      return { data: null as unknown as T };
    }

    try {
      const data = await response.json();
      return { data };
    } catch {
      return {
        error: {
          code: 'parse_error',
          message: 'Failed to parse response JSON'
        }
      };
    }
  }

  public async request<T>(
    endpoint: string, 
    options: RequestOptions = {},
    params?: Record<string, any>
  ): Promise<ApiResponse<T>> {
    try {
      const url = this.buildUrl(endpoint, params);
      const headers = await this.buildHeaders(options);

      const requestInit: RequestInit = {
        method: options.method || 'GET',
        headers,
      };

      if (options.body && options.method !== 'GET') {
        requestInit.body = JSON.stringify(options.body);
      }

      const response = await fetch(url, requestInit);
      return await this.handleResponse<T>(response);
    } catch (error) {
      return {
        error: {
          code: 'network_error',
          message: error instanceof Error ? error.message : 'Network request failed'
        }
      };
    }
  }

  public async get<T>(
    endpoint: string, 
    params?: Record<string, any>,
    options: Omit<RequestOptions, 'method'> = {}
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'GET' }, params);
  }

  public async post<T>(
    endpoint: string, 
    body?: any,
    options: Omit<RequestOptions, 'method' | 'body'> = {}
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'POST', body });
  }

  public async put<T>(
    endpoint: string, 
    body?: any,
    options: Omit<RequestOptions, 'method' | 'body'> = {}
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'PUT', body });
  }

  public async patch<T>(
    endpoint: string, 
    body?: any,
    options: Omit<RequestOptions, 'method' | 'body'> = {}
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'PATCH', body });
  }

  public async delete<T>(
    endpoint: string, 
    options: Omit<RequestOptions, 'method'> = {}
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' });
  }

  // OAuth2 helper methods
  public async authenticate(username: string, password: string): Promise<ApiResponse<AuthTokens>> {
    const credentials = btoa(`${this.config.clientId}:${this.config.clientSecret}`);
    
    const response = await this.request<AuthTokens>('/oauth/token', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${credentials}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        grant_type: 'password',
        username,
        password
      }).toString(),
      useAuth: false
    });

    if (response.data) {
      await this.saveTokensToStorage(response.data);
    }

    return response;
  }

  public async refreshToken(): Promise<ApiResponse<AuthTokens>> {
    if (!this.tokens?.refresh_token) {
      return {
        error: {
          code: 'no_refresh_token',
          message: 'No refresh token available'
        }
      };
    }

    const credentials = btoa(`${this.config.clientId}:${this.config.clientSecret}`);
    
    const response = await this.request<AuthTokens>('/oauth/token', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${credentials}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: this.tokens.refresh_token
      }).toString(),
      useAuth: false
    });

    if (response.data) {
      await this.saveTokensToStorage(response.data);
    }

    return response;
  }
} 