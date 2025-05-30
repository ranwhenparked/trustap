import { TrustapSDK } from '../src';

/**
 * Basic usage example for the Trustap SDK
 * This demonstrates common operations you'll perform with the SDK
 */

async function basicUsageExample() {
  // Initialize the SDK
  const trustap = new TrustapSDK({
    clientId: 'your-client-id',
    clientSecret: 'your-client-secret',
    apiKey: 'your-api-key',
    environment: 'staging' // Use 'production' for live transactions
  });

  try {
    // 1. Get charge calculation (this can be done without authentication using API key)
    console.log('🔍 Getting charge calculation...');
    const chargeResponse = await trustap.getCharge({
      currency: 'eur',
      price: 1234, // €12.34 in cents
      payment_method: 'card'
    });

    if (chargeResponse.error) {
      console.error('❌ Failed to get charge:', chargeResponse.error.message);
      return;
    }

    console.log('✅ Charge calculated:', {
      price: chargeResponse.data!.price,
      charge: chargeResponse.data!.charge,
      currency: chargeResponse.data!.currency
    });

    // 2. Authenticate (required for most operations)
    console.log('\n🔐 Authenticating...');
    const authResponse = await trustap.authenticate('your-username', 'your-password');

    if (authResponse.error) {
      console.error('❌ Authentication failed:', authResponse.error.message);
      return;
    }

    console.log('✅ Authenticated successfully');

    // 3. Create a guest user
    console.log('\n👤 Creating guest user...');
    const guestUserResponse = await trustap.createGuestUser({
      email: 'john.doe@example.com',
      first_name: 'John',
      last_name: 'Doe',
      country_code: 'IE',
      tos_acceptance: {
        ip: '127.0.0.1',
        unix_timestamp: Math.floor(Date.now() / 1000)
      }
    });

    if (guestUserResponse.error) {
      console.error('❌ Failed to create guest user:', guestUserResponse.error.message);
      return;
    }

    console.log('✅ Guest user created:', guestUserResponse.data!.email);

    // 4. Create a transaction
    console.log('\n💰 Creating transaction...');
    const transactionResponse = await trustap.createTransaction({
      role: 'seller',
      currency: 'eur',
      price: 1234,
      description: 'Soccer match ticket',
      charge: chargeResponse.data!.charge,
      charge_calculator_version: chargeResponse.data!.charge_calculator_version
    });

    if (transactionResponse.error) {
      console.error('❌ Failed to create transaction:', transactionResponse.error.message);
      return;
    }

    console.log('✅ Transaction created:', {
      id: transactionResponse.data!.id,
      status: transactionResponse.data!.status,
      join_code: transactionResponse.data!.join_code
    });

    // 5. Get user balances
    console.log('\n💳 Getting user balances...');
    const balancesResponse = await trustap.getUserBalances();

    if (balancesResponse.error) {
      console.error('❌ Failed to get balances:', balancesResponse.error.message);
      return;
    }

    console.log('✅ User balances:', balancesResponse.data!);

    // 6. Get notifications
    console.log('\n🔔 Getting notifications...');
    const notificationsResponse = await trustap.getNotifications({
      page: 1,
      per_page: 5
    });

    if (notificationsResponse.error) {
      console.error('❌ Failed to get notifications:', notificationsResponse.error.message);
      return;
    }

    console.log('✅ Recent notifications:', notificationsResponse.data!.length);

    // 7. Create a P2P transaction
    console.log('\n🤝 Creating P2P transaction...');
    const p2pChargeResponse = await trustap.getP2PCharge({
      currency: 'eur',
      deposit_price: 1234,
      skip_remainder: false
    });

    if (p2pChargeResponse.data) {
      const p2pTransactionResponse = await trustap.createP2PTransaction({
        currency: 'eur',
        deposit_price: 1234,
        description: 'Concert ticket exchange',
        deposit_charge: p2pChargeResponse.data.charge,
        charge_calculator_version: p2pChargeResponse.data.charge_calculator_version
      });

      if (p2pTransactionResponse.error) {
        console.error('❌ Failed to create P2P transaction:', p2pTransactionResponse.error.message);
      } else {
        console.log('✅ P2P transaction created:', {
          id: p2pTransactionResponse.data!.id,
          status: p2pTransactionResponse.data!.status
        });
      }
    }

  } catch (error) {
    console.error('💥 Unexpected error:', error);
  }
}

// Run the example
if (require.main === module) {
  basicUsageExample().catch(console.error);
}

export { basicUsageExample };
