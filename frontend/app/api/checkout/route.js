import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// This is a placeholder key. The user will need to add their actual SECRERT key to .env.local 
// STRIPE_SECRET_KEY=sk_test_...
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder', {
    apiVersion: '2023-10-16',
});

export async function POST(req) {
    try {
        const { items, shippingDetails } = await req.json();

        if (!items || items.length === 0) {
            return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
        }

        // Format items for Stripe Checkout Session
        const lineItems = items.map((item) => {
            // Assuming item.price comes in as a string like "$90.00", we need it in cents "9000"
            const unitAmount = Math.round(parseFloat(item.price.replace(/[^0-9.]/g, '')) * 100);

            return {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: item.name,
                        images: [item.image.startsWith('http') ? item.image : `${process.env.NEXTAUTH_URL}/${item.image}`],
                    },
                    unit_amount: unitAmount,
                },
                quantity: item.quantity,
            };
        });

        // Create Stripe Checkout Session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `${process.env.NEXTAUTH_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXTAUTH_URL}/checkout`,
            metadata: {
                customerName: `${shippingDetails?.firstName} ${shippingDetails?.lastName}`,
                email: shippingDetails?.email || 'N/A'
            }
        });

        return NextResponse.json({ url: session.url });
    } catch (error) {
        console.error('Stripe error:', error);
        return NextResponse.json(
            { error: 'Error creating checkout session. Please ensure you have added a valid STRIPE_SECRET_KEY to .env.local' },
            { status: 500 }
        );
    }
}
