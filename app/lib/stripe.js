import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2023-10-16',
});

export async function createCheckoutSession({ listingId, listingTitle, price, buyerEmail, sellerId, successUrl, cancelUrl }) {
    try {
        // Convert price to cents (Stripe uses smallest currency unit)
        const priceInCents = Math.round(price * 100);

        // Calculate platform fee (5%)
        const platformFee = Math.round(priceInCents * 0.05);

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'eur',
                        product_data: {
                            name: listingTitle,
                            description: `Achat sur ProOccaz - Annonce #${listingId}`,
                        },
                        unit_amount: priceInCents,
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: successUrl,
            cancel_url: cancelUrl,
            customer_email: buyerEmail,
            metadata: {
                listingId,
                sellerId,
                platformFee: platformFee.toString(),
            },
            // Enable automatic tax calculation (optional)
            // automatic_tax: { enabled: true },
        });

        return { success: true, sessionId: session.id, url: session.url };
    } catch (error) {
        console.error('Stripe checkout error:', error);
        return { success: false, error: error.message };
    }
}

export async function retrieveCheckoutSession(sessionId) {
    try {
        const session = await stripe.checkout.sessions.retrieve(sessionId, {
            expand: ['payment_intent', 'line_items'],
        });
        return { success: true, session };
    } catch (error) {
        console.error('Retrieve session error:', error);
        return { success: false, error: error.message };
    }
}

export async function constructWebhookEvent(payload, signature) {
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!webhookSecret) {
        console.warn('Stripe webhook secret not configured');
        return null;
    }

    try {
        return stripe.webhooks.constructEvent(payload, signature, webhookSecret);
    } catch (error) {
        console.error('Webhook signature verification failed:', error);
        return null;
    }
}

export { stripe };
