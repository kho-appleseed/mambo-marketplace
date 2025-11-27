# Architecture Updates - Custom Payment Gateway & Chinese Partner Integration

## Key Changes Based on Your Requirements

### 1. Custom Payment Gateway Integration
- **Your Gateway**: You have a custom payment gateway
- **Integration**: Need to integrate with your existing gateway API
- **No Stripe Dependency**: Can remove or keep as fallback option

### 2. Chinese Partner Product Integration
- **External Product Source**: Products come from Chinese partner
- **API Integration**: Need to sync products from partner's system
- **Inventory Sync**: Real-time or batch sync of product data

---

## Updated Architecture

### Payment Gateway Integration

#### Current State
- Stripe integration exists
- Can keep as fallback or remove

#### Required Changes

1. **Payment Gateway Service Layer**
```javascript
// lib/paymentGateway.js
class PaymentGateway {
  constructor() {
    this.baseUrl = process.env.PAYMENT_GATEWAY_URL;
    this.apiKey = process.env.PAYMENT_GATEWAY_API_KEY;
  }

  async createPayment(orderData) {
    // Integrate with your custom gateway
    const response = await fetch(`${this.baseUrl}/payments`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        amount: orderData.total,
        currency: 'USD',
        orderId: orderData.orderNumber,
        customerId: orderData.customerId,
        items: orderData.items,
        // Add any other required fields for your gateway
      })
    });
    return response.json();
  }

  async verifyPayment(paymentId) {
    // Verify payment status
  }

  async processRefund(paymentId, amount) {
    // Process refunds
  }
}
```

2. **Update Stripe API Route**
```javascript
// pages/api/payment.js (new unified payment endpoint)
import PaymentGateway from '@/lib/paymentGateway';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const paymentGateway = new PaymentGateway();
      const payment = await paymentGateway.createPayment(req.body);
      
      res.status(200).json(payment);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
```

3. **Payment Gateway Configuration**
```javascript
// lib/paymentConfig.js
export const paymentMethods = {
  CUSTOM_GATEWAY: {
    name: 'Tapseed Payment Gateway',
    enabled: true,
    handler: 'custom'
  },
  STRIPE: {
    name: 'Stripe',
    enabled: process.env.ENABLE_STRIPE === 'true', // Optional fallback
    handler: 'stripe'
  },
  MOBILE_MONEY: {
    name: 'Mobile Money',
    enabled: true,
    handler: 'mobileMoney'
  },
  WALLET: {
    name: 'Tapseed Wallet',
    enabled: true,
    handler: 'wallet'
  }
};
```

---

## Chinese Partner Product Integration

### Architecture Options

#### Option A: API Sync (Recommended)
- Products stored in Chinese partner's system
- Sync via API (real-time or scheduled)
- Cache in your database for performance

#### Option B: Webhook Integration
- Partner sends product updates via webhooks
- Real-time product updates
- Requires webhook endpoint

#### Option C: Hybrid Approach
- Initial bulk import
- Ongoing API sync for updates
- Webhooks for critical changes (price, stock)

### Recommended: Hybrid Approach

### 1. Product Sync Service

```javascript
// lib/productSync.js
class ProductSyncService {
  constructor() {
    this.partnerApiUrl = process.env.CHINESE_PARTNER_API_URL;
    this.apiKey = process.env.CHINESE_PARTNER_API_KEY;
  }

  // Sync products from Chinese partner
  async syncProducts() {
    try {
      // Fetch products from partner API
      const products = await this.fetchProductsFromPartner();
      
      // Transform to your schema format
      const transformedProducts = products.map(product => 
        this.transformProduct(product)
      );
      
      // Sync to Sanity or your database
      await this.saveProducts(transformedProducts);
      
      return { success: true, count: transformedProducts.length };
    } catch (error) {
      console.error('Product sync error:', error);
      throw error;
    }
  }

  async fetchProductsFromPartner() {
    const response = await fetch(`${this.partnerApiUrl}/products`, {
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      }
    });
    return response.json();
  }

  transformProduct(partnerProduct) {
    return {
      // Map partner product fields to your schema
      name: partnerProduct.product_name || partnerProduct.name,
      sku: partnerProduct.sku || partnerProduct.product_code,
      price: partnerProduct.price,
      wholesalePrice: partnerProduct.wholesale_price,
      stockQuantity: partnerProduct.stock || partnerProduct.quantity,
      images: partnerProduct.images || [],
      details: partnerProduct.description,
      category: this.mapCategory(partnerProduct.category),
      vendor: 'chinese-partner', // Reference to vendor
      externalId: partnerProduct.id, // Keep reference to partner's ID
      lastSynced: new Date().toISOString()
    };
  }

  async saveProducts(products) {
    // Save to Sanity or your database
    // Can use Sanity client for bulk operations
  }
}
```

### 2. Product Schema Updates

```javascript
// sanity_ecommerce/schemas/product.js - Updated
export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    // ... existing fields ...
    
    // External source tracking
    {
      name: 'externalId',
      title: 'External Product ID',
      type: 'string',
      description: 'ID from Chinese partner system'
    },
    {
      name: 'source',
      title: 'Product Source',
      type: 'string',
      options: {
        list: ['chinese_partner', 'local', 'other']
      },
      initialValue: 'chinese_partner'
    },
    {
      name: 'lastSynced',
      title: 'Last Synced',
      type: 'datetime',
      description: 'Last time product was synced from external source'
    },
    {
      name: 'syncStatus',
      title: 'Sync Status',
      type: 'string',
      options: {
        list: ['synced', 'pending', 'error']
      }
    },
    
    // Vendor reference (Chinese partner)
    {
      name: 'vendor',
      title: 'Vendor/Supplier',
      type: 'reference',
      to: [{ type: 'vendor' }],
      validation: Rule => Rule.required()
    },
    
    // SKU and inventory
    {
      name: 'sku',
      title: 'SKU',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'stockQuantity',
      title: 'Stock Quantity',
      type: 'number',
      initialValue: 0
    },
    
    // Pricing
    {
      name: 'wholesalePrice',
      title: 'Wholesale Price (B2B)',
      type: 'number'
    },
    {
      name: 'retailPrice',
      title: 'Retail Price (B2C)',
      type: 'number'
    },
    {
      name: 'price', // Keep for backward compatibility
      title: 'Price',
      type: 'number'
    }
  ]
}
```

### 3. Sync API Endpoint

```javascript
// pages/api/sync/products.js
import ProductSyncService from '@/lib/productSync';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Verify admin authentication
      const isAdmin = await verifyAdmin(req);
      if (!isAdmin) {
        return res.status(403).json({ error: 'Unauthorized' });
      }

      const syncService = new ProductSyncService();
      const result = await syncService.syncProducts();
      
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
```

### 4. Scheduled Sync Job

```javascript
// lib/cronJobs.js or use Vercel Cron / AWS EventBridge
export async function syncProductsJob() {
  const syncService = new ProductSyncService();
  await syncService.syncProducts();
}

// Schedule: Every hour or as needed
// Can use: Vercel Cron, node-cron, or external scheduler
```

### 5. Webhook Endpoint (Optional)

```javascript
// pages/api/webhooks/partner-products.js
export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Verify webhook signature
      const isValid = verifyWebhookSignature(req);
      if (!isValid) {
        return res.status(401).json({ error: 'Invalid signature' });
      }

      const { event, data } = req.body;
      
      switch (event) {
        case 'product.created':
        case 'product.updated':
          await syncSingleProduct(data.productId);
          break;
        case 'product.deleted':
          await deleteProduct(data.productId);
          break;
        case 'inventory.updated':
          await updateInventory(data.productId, data.quantity);
          break;
      }
      
      res.status(200).json({ received: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
```

---

## Updated Data Flow

### Product Flow
```
Chinese Partner System
    ↓ (API Sync / Webhook)
Product Sync Service
    ↓
Sanity CMS / Database
    ↓
Marketplace Frontend
```

### Payment Flow
```
Customer Checkout
    ↓
Your Custom Payment Gateway
    ↓
Payment Confirmation
    ↓
Order Creation
    ↓
Settlement Engine
```

---

## Implementation Checklist

### Payment Gateway Integration
- [ ] Document your payment gateway API endpoints
- [ ] Create payment gateway service class
- [ ] Update checkout flow to use your gateway
- [ ] Implement payment verification
- [ ] Add refund handling
- [ ] Test payment flows
- [ ] Remove or deprecate Stripe (if not needed)

### Chinese Partner Integration
- [ ] Get API documentation from Chinese partner
- [ ] Understand product data structure
- [ ] Create product sync service
- [ ] Map partner fields to your schema
- [ ] Set up scheduled sync job
- [ ] Implement webhook endpoint (if available)
- [ ] Handle inventory updates
- [ ] Add error handling and retry logic
- [ ] Create admin sync dashboard

---

## Environment Variables Needed

```env
# Payment Gateway
PAYMENT_GATEWAY_URL=https://your-gateway.com/api
PAYMENT_GATEWAY_API_KEY=your_api_key
PAYMENT_GATEWAY_SECRET=your_secret

# Chinese Partner
CHINESE_PARTNER_API_URL=https://partner-api.com
CHINESE_PARTNER_API_KEY=partner_api_key
CHINESE_PARTNER_WEBHOOK_SECRET=webhook_secret

# Optional: Stripe (if keeping as fallback)
STRIPE_SECRET_KEY=sk_... (optional)
ENABLE_STRIPE=false
```

---

## Questions to Clarify

1. **Payment Gateway**:
   - What's the API structure?
   - What payment methods does it support?
   - Does it handle mobile money?
   - Does it support wallets?
   - What's the settlement process?

2. **Chinese Partner**:
   - What's the API endpoint structure?
   - How often should we sync?
   - Do they support webhooks?
   - What's the product data format?
   - How do we handle inventory updates?
   - What about pricing updates?
   - Do they have real-time stock levels?

3. **Integration Details**:
   - Authentication method (API key, OAuth, etc.)?
   - Rate limits?
   - Error handling requirements?
   - Data format (JSON, XML)?

---

## Next Steps

1. **Get API Documentation**
   - Payment gateway API docs
   - Chinese partner API docs

2. **Create Integration Services**
   - Payment gateway service
   - Product sync service

3. **Update Schemas**
   - Add external product tracking
   - Update product schema for partner data

4. **Build Sync Infrastructure**
   - Scheduled sync jobs
   - Webhook endpoints
   - Error handling

5. **Test Integration**
   - Test payment flows
   - Test product sync
   - Test inventory updates

Would you like me to:
1. Create the payment gateway integration service?
2. Build the product sync service?
3. Update the product schema for external products?
4. Set up the sync infrastructure?

Let me know which you'd like to start with, or if you can share the API documentation, I can create more specific implementations.

