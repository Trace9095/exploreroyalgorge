import { Resend } from 'resend'

let _resend: Resend | null = null

function getResend(): Resend {
  if (!_resend) {
    const key = process.env['RESEND_API_KEY']
    if (!key) throw new Error('RESEND_API_KEY is not set')
    _resend = new Resend(key)
  }
  return _resend
}

const FROM = 'Explore Royal Gorge <hello@exploreroyalgorge.com>'
const ADMIN = process.env['ADMIN_EMAIL'] ?? 'CEO@epicai.ai'

// ─── Listing request: notify admin ────────────────────────────────────────

export async function sendListingRequestNotification(data: {
  businessName: string
  contactName: string
  contactEmail: string
  contactPhone?: string
  businessWebsite?: string
  tier: string
  message?: string
}) {
  const resend = getResend()
  await resend.emails.send({
    from: FROM,
    to: ADMIN,
    subject: `New Listing Request: ${data.businessName}`,
    html: `
      <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto; background: #0D1117; color: #E6EDF3; padding: 32px; border-radius: 12px;">
        <div style="border-left: 4px solid #D4A853; padding-left: 16px; margin-bottom: 24px;">
          <h1 style="color: #D4A853; margin: 0 0 4px;">New Listing Request</h1>
          <p style="color: #8B949E; margin: 0;">exploreroyalgorge.com</p>
        </div>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; color: #8B949E; width: 140px;">Business</td><td style="padding: 8px 0; color: #E6EDF3; font-weight: 600;">${data.businessName}</td></tr>
          <tr><td style="padding: 8px 0; color: #8B949E;">Contact</td><td style="padding: 8px 0; color: #E6EDF3;">${data.contactName}</td></tr>
          <tr><td style="padding: 8px 0; color: #8B949E;">Email</td><td style="padding: 8px 0; color: #E6EDF3;"><a href="mailto:${data.contactEmail}" style="color: #D4A853;">${data.contactEmail}</a></td></tr>
          ${data.contactPhone ? `<tr><td style="padding: 8px 0; color: #8B949E;">Phone</td><td style="padding: 8px 0; color: #E6EDF3;">${data.contactPhone}</td></tr>` : ''}
          ${data.businessWebsite ? `<tr><td style="padding: 8px 0; color: #8B949E;">Website</td><td style="padding: 8px 0; color: #E6EDF3;">${data.businessWebsite}</td></tr>` : ''}
          <tr><td style="padding: 8px 0; color: #8B949E;">Tier</td><td style="padding: 8px 0; color: #D4A853; font-weight: 600; text-transform: uppercase;">${data.tier}</td></tr>
        </table>
        ${data.message ? `<div style="margin-top: 16px; padding: 16px; background: #161B22; border-radius: 8px; color: #8B949E;">${data.message}</div>` : ''}
        <div style="margin-top: 24px;"><a href="https://exploreroyalgorge.com/admin/requests" style="display: inline-block; background: #D4A853; color: #0D1117; padding: 12px 24px; border-radius: 8px; font-weight: 600; text-decoration: none;">View in Admin</a></div>
      </div>
    `,
  })
}

// ─── Listing request: confirm to user ─────────────────────────────────────

export async function sendListingRequestConfirmation(data: {
  businessName: string
  contactName: string
  contactEmail: string
  tier: string
}) {
  const resend = getResend()
  await resend.emails.send({
    from: FROM,
    to: data.contactEmail,
    subject: `We received your listing request for ${data.businessName}`,
    html: `
      <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto; background: #0D1117; color: #E6EDF3; padding: 32px; border-radius: 12px;">
        <div style="border-left: 4px solid #D4A853; padding-left: 16px; margin-bottom: 24px;">
          <h1 style="color: #D4A853; margin: 0 0 4px;">Request Received</h1>
          <p style="color: #8B949E; margin: 0;">Explore Royal Gorge</p>
        </div>
        <p>Hi ${data.contactName},</p>
        <p style="color: #8B949E;">We've received your listing request for <strong style="color: #E6EDF3;">${data.businessName}</strong> and will review it within 1–2 business days.</p>
        <div style="margin: 24px 0; padding: 16px; background: #161B22; border-radius: 8px; border: 1px solid #30363D;">
          <p style="margin: 0 0 4px; color: #8B949E; font-size: 12px;">REQUESTED TIER</p>
          <p style="margin: 0; color: #D4A853; font-weight: 600; text-transform: uppercase;">${data.tier}</p>
        </div>
        <p style="color: #8B949E; font-size: 14px;">Questions? Reply to this email or reach us at hello@exploreroyalgorge.com</p>
        <p style="color: #8B949E;">The Explore Royal Gorge Team</p>
      </div>
    `,
  })
}

// ─── Claim notification ───────────────────────────────────────────────────

export async function sendClaimNotification(data: {
  businessSlug: string
  contactName: string
  contactEmail: string
  tier: string
}) {
  const resend = getResend()
  await resend.emails.send({
    from: FROM,
    to: ADMIN,
    subject: `New Claim Submission: ${data.businessSlug} (${data.tier})`,
    html: `
      <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto; background: #0D1117; color: #E6EDF3; padding: 32px; border-radius: 12px;">
        <h1 style="color: #D4A853;">New Claim Submission</h1>
        <p><strong>Business:</strong> ${data.businessSlug}</p>
        <p><strong>Contact:</strong> ${data.contactName} — ${data.contactEmail}</p>
        <p><strong>Tier:</strong> <span style="color: #D4A853;">${data.tier}</span></p>
      </div>
    `,
  })
}
