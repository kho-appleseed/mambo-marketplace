import { loadStripe } from "@stripe/stripe-js"

let stripePromise;

const getStripe = () => {
    if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
        console.error('Missing NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY environment variable. Please add it to your .env.local file.');
        return null;
    }
    
    if (!stripePromise) {
        stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
    }

    return stripePromise
}

export default getStripe