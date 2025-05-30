# Trustap TypeScript SDK

A React Native compatible TypeScript SDK for the Trustap API. This SDK provides a clean, type-safe interface for interacting with all Trustap API endpoints including transactions, listings, users, and payments.

## Features

- ✅ **React Native Compatible** - Works seamlessly in React Native apps
- ✅ **TypeScript First** - Full type safety with comprehensive TypeScript definitions
- ✅ **Modern API** - Promise-based with async/await support
- ✅ **Automatic Token Management** - Handles authentication tokens automatically
- ✅ **Error Handling** - Consistent error handling across all endpoints
- ✅ **Storage Fallback** - Uses AsyncStorage when available, falls back gracefully

## Installation

```bash
npm install trustap-sdk

# For React Native projects, also install AsyncStorage
npm install @react-native-async-storage/async-storage
```

## Quick Start

```typescript
import { TrustapSDK } from 'trustap-sdk';

// Initialize the SDK
const trustap = new TrustapSDK({
  clientId: 'your-client-id',
  clientSecret: 'your-client-secret',
  apiKey: 'your-api-key', // Optional, for API key authentication
  environment: 'staging' // or 'production'
});

// Get Trustap fee for a transaction
const chargeResponse = await trustap.getCharge({
  currency: 'eur',
  price: 1234, // Price in cents
  payment_method: 'card'
});

if (chargeResponse.data) {
  console.log('Trustap fee:', chargeResponse.data.charge);
}

// Create a transaction
const transaction = await trustap.createTransaction({
  role: 'seller',
  currency: 'eur',
  price: 1234,
  description: 'Soccer ticket',
  charge: chargeResponse.data!.charge,
  charge_calculator_version: chargeResponse.data!.charge_calculator_version
});
```

## Authentication

The SDK supports both OAuth2 and API Key authentication:

### OAuth2 Authentication

```typescript
// Authenticate with username/password
const authResponse = await trustap.authenticate('username', 'password');

if (authResponse.data) {
  // Tokens are automatically stored and used for subsequent requests
  console.log('Authenticated successfully');
}

// Refresh tokens when needed
const refreshResponse = await trustap.refreshToken();

// Clear stored tokens
await trustap.clearTokens();
```

### API Key Authentication

Some endpoints (like `/charge`) can be accessed directly with an API key:

```typescript
const trustap = new TrustapSDK({
  apiKey: 'your-api-key',
  environment: 'staging'
});

// This will use API key authentication automatically
const chargeResponse = await trustap.getCharge({
  currency: 'eur',
  price: 1234
});
```

## API Reference

### Charge Calculation

```typescript
// Get charge for online transaction
const charge = await trustap.getCharge({
  currency: 'eur',
  price: 1234,
  payment_method: 'card',
  quantity: 1
});

// Get charge for P2P transaction
const p2pCharge = await trustap.getP2PCharge({
  currency: 'eur',
  deposit_price: 1234,
  skip_remainder: false
});
```

### Transactions

```typescript
// Online Transactions
const transactions = await trustap.getTransactions({ page: 1, per_page: 20 });
const transaction = await trustap.createTransaction(transactionData);
const transactionWithGuest = await trustap.createTransactionWithGuestUser({
  ...transactionData,
  guest_user: {
    email: 'guest@example.com',
    first_name: 'John',
    last_name: 'Doe',
    tos_acceptance: {
      ip: '127.0.0.1',
      unix_timestamp: Math.floor(Date.now() / 1000)
    }
  }
});

// P2P Transactions
const p2pTransactions = await trustap.getP2PTransactions();
const p2pTransaction = await trustap.getP2PTransaction(12345);
const newP2PTransaction = await trustap.createP2PTransaction({
  currency: 'eur',
  deposit_price: 1234,
  description: 'Concert ticket',
  deposit_charge: 78,
  charge_calculator_version: 5
});

// P2P Transaction Actions
await trustap.acceptP2PDeposit(transactionId);
await trustap.confirmP2PHandover(transactionId);
await trustap.cancelP2PTransaction(transactionId, 'Buyer changed mind');
```

### Listings

```typescript
// Multi-use Listings
const listing = await trustap.createMultiUseListing(listingData);
const retrievedListing = await trustap.getMultiUseListing(listingId);
await trustap.updateMultiUseListing(listingId, updateData);
await trustap.deleteMultiUseListing(listingId);

// Create transaction from listing
const transactionFromListing = await trustap.createTransactionFromMultiUseListing(
  listingId, 
  2 // quantity
);

// P2P Listings
const p2pListing = await trustap.createP2PMultiUseListing(p2pListingData);
const p2pSingleListing = await trustap.createP2PSingleUseListing(p2pListingData);
```

### Users

```typescript
// Create guest user
const guestUser = await trustap.createGuestUser({
  email: 'guest@example.com',
  first_name: 'John',
  last_name: 'Doe',
  country_code: 'IE',
  tos_acceptance: {
    ip: '127.0.0.1',
    unix_timestamp: Math.floor(Date.now() / 1000)
  }
});

// Get user information
const balances = await trustap.getUserBalances();
const payoutStatus = await trustap.getProfilePayoutStatus();
const countries = await trustap.getSupportedRegistrationCountries();
```

### Notifications

```typescript
// Get notifications
const notifications = await trustap.getNotifications({
  page: 1,
  per_page: 20,
  unread_only: true
});

// Mark as read
await trustap.markNotificationAsRead(notificationId);
```

### Utilities

```typescript
// Get carrier facilities
const facilities = await trustap.getCarrierFacilityOptions('IE');

// Get bank transfer details
const bankDetails = await trustap.getP2PBankTransferDetails(transactionId);
```

## Error Handling

The SDK uses a consistent error handling pattern. All methods return an `ApiResponse<T>` object:

```typescript
const response = await trustap.getTransaction(12345);

if (response.error) {
  console.error('Error:', response.error.message);
  console.error('Code:', response.error.code);
  console.error('Details:', response.error.details);
} else {
  console.log('Transaction:', response.data);
}
```

Common error codes include:
- `network_error` - Network connectivity issues
- `parse_error` - Failed to parse response
- `http_error` - HTTP status error
- `no_refresh_token` - No refresh token available

## Type Safety

The SDK provides comprehensive TypeScript types for all API entities:

```typescript
import type { 
  BasicTransaction, 
  P2PTransaction, 
  Charge, 
  User,
  ApiResponse 
} from 'trustap-sdk';

function handleTransaction(transaction: BasicTransaction) {
  // Full type safety and autocompletion
  console.log(transaction.id, transaction.status, transaction.currency);
}
```

## Configuration

```typescript
interface TrustapConfig {
  baseUrl?: string;           // Custom base URL (optional)
  clientId?: string;          // OAuth2 client ID
  clientSecret?: string;      // OAuth2 client secret
  apiKey?: string;           // API key for direct access
  environment?: 'staging' | 'production'; // Environment
}
```

## React Native Integration

The SDK automatically detects React Native environments and uses AsyncStorage for token persistence. If AsyncStorage is not available, it falls back to memory storage with a warning.

```typescript
// In a React Native component
import { TrustapSDK } from 'trustap-sdk';

const App = () => {
  const [trustap] = useState(() => new TrustapSDK({
    clientId: 'your-client-id',
    clientSecret: 'your-client-secret',
    environment: 'staging'
  }));

  // Use the SDK throughout your app
  const handlePayment = async () => {
    const charge = await trustap.getCharge({
      currency: 'eur',
      price: 1234
    });
    // Handle charge...
  };

  return (
    // Your React Native UI
  );
};
```

## Development

```bash
# Install dependencies
npm install

# Build the SDK
npm run build

# Watch for changes during development
npm run dev

# Clean build directory
npm run clean
```

## License

MIT

## Support

For API questions and support, please contact Trustap support at support@trustap.com or refer to the [Trustap API documentation](https://dev.stage.trustap.com/docs). # trustap
