import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    // ConvertKit integration
    const convertKitApiKey = process.env.CONVERTKIT_API_KEY;
    const convertKitFormId = process.env.CONVERTKIT_FORM_ID;

    if (convertKitApiKey && convertKitFormId) {
      const res = await fetch(`https://api.convertkit.com/v3/forms/${convertKitFormId}/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ api_key: convertKitApiKey, email }),
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
          body: JSON.stringify({ email_address: email, status: 'pending' }),
        }
      );

      if (!res.ok) {
        const body = await res.json();
        if (body.title !== 'Member Exists') throw new Error('Mailchimp subscription failed');
      }
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Newsletter subscription error:', err);
    return NextResponse.json({ error: 'Subscription failed' }, { status: 500 });
  }
}
