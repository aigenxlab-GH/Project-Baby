import { NextRequest, NextResponse } from 'next/server';
import { rateLimit } from '@/lib/rate-limit';

export async function POST(req: NextRequest) {
  // Rate limit: 5 subscriptions per IP per minute
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  const { success } = rateLimit(ip, { limit: 5, windowMs: 60_000 });

  if (!success) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429 }
    );
  }

  try {
    const body = await req.json();
    const { email } = body;

    if (!email || typeof email !== 'string' || !email.includes('@') || email.length > 254) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    const sanitizedEmail = email.trim().toLowerCase();

    // ConvertKit integration
    const convertKitApiKey = process.env.CONVERTKIT_API_KEY;
    const convertKitFormId = process.env.CONVERTKIT_FORM_ID;

    if (convertKitApiKey && convertKitFormId) {
      const res = await fetch(`https://api.convertkit.com/v3/forms/${convertKitFormId}/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ api_key: convertKitApiKey, email: sanitizedEmail }),
      });

      if (!res.ok) {
        throw new Error('ConvertKit subscription failed');
      }
    }

    // Mailchimp fallback
    const mailchimpApiKey = process.env.MAILCHIMP_API_KEY;
    const mailchimpListId = process.env.MAILCHIMP_LIST_ID;
    const mailchimpServer = process.env.MAILCHIMP_SERVER_PREFIX || 'us1';

    if (!convertKitApiKey && mailchimpApiKey && mailchimpListId) {
      const res = await fetch(
        `https://${mailchimpServer}.api.mailchimp.com/3.0/lists/${mailchimpListId}/members`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${mailchimpApiKey}`,
          },
          body: JSON.stringify({ email_address: sanitizedEmail, status: 'pending' }),
        }
      );

      if (!res.ok) {
        const errorBody = await res.json();
        if (errorBody.title !== 'Member Exists') throw new Error('Mailchimp subscription failed');
      }
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Newsletter subscription error:', err);
    return NextResponse.json({ error: 'Subscription failed. Please try again.' }, { status: 500 });
  }
}
