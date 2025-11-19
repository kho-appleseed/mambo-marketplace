import Stripe from 'stripe'

// Initialize Stripe with error handling
let stripe;
try {
  if (!process.env.STRIPE_SECRET_KEY) {
    console.error('⚠️  Missing STRIPE_SECRET_KEY environment variable. Please add it to your .env.local file.');
    console.error('   See .env.local.example for reference.');
  } else {
    stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  }
} catch (error) {
  console.error('Error initializing Stripe:', error);
}

export default async function handler(req, res) {
  if (!stripe) {
    return res.status(500).json({ 
      error: 'Stripe is not configured. Please add STRIPE_SECRET_KEY to your .env.local file.' 
    });
  }

  if (req.method === 'POST') {
    try {
      // Create Checkout Sessions from body params.
      const params = {
        submit_type: 'pay',
        mode: 'payment',
        payment_method_types: ['card'],
        billing_address_collection: 'auto',
        shipping_options: [
            { shipping_rate: 'shr_1ManfCElySj9aFpFwls6tNsI'},
            { shipping_rate: 'shr_1MangiElySj9aFpFpLl2T4gb'},
        ],
        line_items: req.body.map(item => {
            const img = item.image[0].asset._ref
            const newImg = img
                .replace('image-', 'https://cdn.sanity.io/images/ecxekts7/production/')
                .replace('-webp', '.webp')
            
            return {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: item.name,
                        images: [newImg],
                    },
                    unit_amount: item.price * 100,
                },
                adjustable_quantity: {
                    enabled: true,
                    minimum: 1
                },
                quantity: item.quantity
            }
        }),
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/?canceled=true`,
      }

      const session = await stripe.checkout.sessions.create(params);
    //   res.redirect(303, session.url);
        res.status(200).json(session)
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}