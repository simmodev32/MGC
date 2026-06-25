import { Resend } from 'resend';
import { RESEND_API_KEY, BOOKING_EMAIL } from '$env/static/private';

const resend = new Resend(RESEND_API_KEY);

export async function POST({ request }) {
  const formData = await request.formData();

  const name        = formData.get('name');
  const age         = formData.get('age');
  const email       = formData.get('email');
  const vehicle     = formData.get('vehicle');
  const pickupDate  = formData.get('pickupDate');
  const pickupTime  = formData.get('pickupTime');
  const returnDate  = formData.get('returnDate');
  const returnTime  = formData.get('returnTime');
  const totalPrice  = formData.get('totalPrice');
  const days        = formData.get('days');
  const permitFile  = formData.get('permit');

  if (!name || !age || !email || !vehicle || !pickupDate || !pickupTime || !returnDate || !returnTime) {
    return new Response(
      JSON.stringify({ success: false, error: 'Missing required fields.' }),
      { status: 400 }
    );
  }

  // Convert permit image to base64 for email attachment
  let attachments = [];
  if (permitFile && permitFile.size > 0) {
    const buffer = await permitFile.arrayBuffer();
    const base64 = Buffer.from(buffer).toString('base64');
    attachments.push({
      filename: permitFile.name || 'drivers-permit.jpg',
      content: base64,
    });
  }

  try {
    // Email to MGC
    await resend.emails.send({
      from: 'MGC Bookings <onboarding@resend.dev>',
      to: BOOKING_EMAIL,
      reply_to: email,
      subject: `New Booking — ${name} · ${vehicle}`,
      attachments,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #0A0A0A; padding: 24px 32px; border-radius: 8px 8px 0 0;">
            <h1 style="color: #F5A800; font-size: 1.4rem; margin: 0;">MGC Car Rental & Leasing</h1>
            <p style="color: #888; margin: 4px 0 0; font-size: 0.85rem;">New Booking Request</p>
          </div>
          <div style="background: #111111; padding: 32px; border-radius: 0 0 8px 8px; border: 1px solid #222;">

            <h2 style="color:#fff;font-size:0.9rem;text-transform:uppercase;letter-spacing:0.1em;margin:0 0 16px;">Customer</h2>
            <table style="width:100%;border-collapse:collapse;margin-bottom:28px;">
              <tr><td style="padding:10px 0;border-bottom:1px solid #222;color:#888;font-size:0.85rem;width:40%;">Name</td><td style="padding:10px 0;border-bottom:1px solid #222;color:#fff;font-size:0.85rem;">${name}</td></tr>
              <tr><td style="padding:10px 0;border-bottom:1px solid #222;color:#888;font-size:0.85rem;">Age</td><td style="padding:10px 0;border-bottom:1px solid #222;color:#fff;font-size:0.85rem;">${age}</td></tr>
              <tr><td style="padding:10px 0;border-bottom:1px solid #222;color:#888;font-size:0.85rem;">Email</td><td style="padding:10px 0;border-bottom:1px solid #222;color:#fff;font-size:0.85rem;">${email}</td></tr>
              <tr><td style="padding:10px 0;color:#888;font-size:0.85rem;">Driver's Permit</td><td style="padding:10px 0;color:#F5A800;font-size:0.85rem;">${attachments.length ? 'Attached' : 'Not provided'}</td></tr>
            </table>

            <h2 style="color:#fff;font-size:0.9rem;text-transform:uppercase;letter-spacing:0.1em;margin:0 0 16px;">Booking</h2>
            <table style="width:100%;border-collapse:collapse;margin-bottom:28px;">
              <tr><td style="padding:10px 0;border-bottom:1px solid #222;color:#888;font-size:0.85rem;width:40%;">Vehicle</td><td style="padding:10px 0;border-bottom:1px solid #222;color:#F5A800;font-size:0.85rem;">${vehicle}</td></tr>
              <tr><td style="padding:10px 0;border-bottom:1px solid #222;color:#888;font-size:0.85rem;">Pickup</td><td style="padding:10px 0;border-bottom:1px solid #222;color:#fff;font-size:0.85rem;">${pickupDate} at ${pickupTime}</td></tr>
              <tr><td style="padding:10px 0;border-bottom:1px solid #222;color:#888;font-size:0.85rem;">Return</td><td style="padding:10px 0;border-bottom:1px solid #222;color:#fff;font-size:0.85rem;">${returnDate} at ${returnTime}</td></tr>
              <tr><td style="padding:10px 0;border-bottom:1px solid #222;color:#888;font-size:0.85rem;">Duration</td><td style="padding:10px 0;border-bottom:1px solid #222;color:#fff;font-size:0.85rem;">${days} day${days > 1 ? 's' : ''}</td></tr>
              <tr><td style="padding:10px 0;color:#888;font-size:0.85rem;">Total Estimate</td><td style="padding:10px 0;color:#F5A800;font-size:1rem;font-weight:bold;">TTD ${Number(totalPrice).toLocaleString()}</td></tr>
            </table>
          </div>
          <p style="color:#555;font-size:0.75rem;text-align:center;margin-top:20px;">MGC Car Rental & Leasing · 1 (868) 396-1127</p>
        </div>
      `
    });

    // Auto-reply to customer
    await resend.emails.send({
      from: 'MGC Car Rental & Leasing <onboarding@resend.dev>',
      to: email,
      subject: 'Booking Request Received — MGC Car Rental',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #0A0A0A; padding: 24px 32px; border-radius: 8px 8px 0 0;">
            <h1 style="color: #F5A800; font-size: 1.4rem; margin: 0;">MGC Car Rental & Leasing</h1>
          </div>
          <div style="background: #111111; padding: 32px; border-radius: 0 0 8px 8px; border: 1px solid #222;">
            <p style="color:#fff;font-size:1rem;margin:0 0 16px;">Hi ${name},</p>
            <p style="color:#ccc;font-size:0.9rem;line-height:1.7;margin:0 0 16px;">
              Thank you for your booking request. Here's a summary of what we received:
            </p>
            <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
              <tr><td style="padding:10px 0;border-bottom:1px solid #222;color:#888;font-size:0.85rem;width:40%;">Vehicle</td><td style="padding:10px 0;border-bottom:1px solid #222;color:#F5A800;font-size:0.85rem;">${vehicle}</td></tr>
              <tr><td style="padding:10px 0;border-bottom:1px solid #222;color:#888;font-size:0.85rem;">Pickup</td><td style="padding:10px 0;border-bottom:1px solid #222;color:#fff;font-size:0.85rem;">${pickupDate} at ${pickupTime}</td></tr>
              <tr><td style="padding:10px 0;border-bottom:1px solid #222;color:#888;font-size:0.85rem;">Return</td><td style="padding:10px 0;border-bottom:1px solid #222;color:#fff;font-size:0.85rem;">${returnDate} at ${returnTime}</td></tr>
              <tr><td style="padding:10px 0;border-bottom:1px solid #222;color:#888;font-size:0.85rem;">Duration</td><td style="padding:10px 0;border-bottom:1px solid #222;color:#fff;font-size:0.85rem;">${days} day${days > 1 ? 's' : ''}</td></tr>
              <tr><td style="padding:10px 0;color:#888;font-size:0.85rem;">Estimated Total</td><td style="padding:10px 0;color:#F5A800;font-size:1rem;font-weight:bold;">TTD ${Number(totalPrice).toLocaleString()}</td></tr>
            </table>
            <p style="color:#ccc;font-size:0.9rem;line-height:1.7;margin:0 0 24px;">
              A member of our team will contact you within 1–2 business hours to confirm your reservation. This is an estimate only — final pricing will be confirmed by our team.
            </p>
            <p style="color:#888;font-size:0.85rem;margin:0;">
              Questions? Call us at <strong style="color:#F5A800;">1 (868) 396-1127</strong>
            </p>
          </div>
        </div>
      `
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });

  } catch (err) {
    console.error('Resend error:', err);
    return new Response(
      JSON.stringify({ success: false, error: 'Failed to send email.' }),
      { status: 500 }
    );
  }
}