import { createClient } from 'npm:@supabase/supabase-js@2.57.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
};

const NOTIFICATION_EMAIL = 'b53595205@gmail.com';
const FROM_EMAIL = 'Weborys <onboarding@resend.dev>';

interface LeadPayload {
  type: 'contact' | 'quote' | 'inquiry';
  full_name: string;
  email: string;
  phone?: string;
  company?: string;
  project_type?: string;
  budget?: string;
  details?: string;
  website?: string; // honeypot
}

const TYPE_LABELS: Record<string, string> = {
  contact: 'New Contact Message',
  quote: 'New Quote Request',
  inquiry: 'New Project Inquiry',
};

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function row(label: string, value: string | null | undefined): string {
  if (!value) return '';
  return `<tr>
    <td style="padding:6px 16px 6px 0;color:#94a3b8;font-size:13px;white-space:nowrap;vertical-align:top;">${escapeHtml(label)}</td>
    <td style="padding:6px 0;color:#e2e8f0;font-size:14px;vertical-align:top;">${escapeHtml(value)}</td>
  </tr>`;
}

function emailShell(heading: string, bodyContent: string, footer: string): string {
  return `<!doctype html><html><body style="margin:0;padding:0;background:#05060a;font-family:Inter,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#05060a;padding:32px 16px;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#0c0f1a;border:1px solid rgba(255,255,255,0.08);border-radius:16px;overflow:hidden;">
<tr><td style="padding:28px 32px;border-bottom:1px solid rgba(255,255,255,0.06);">
<table width="100%" cellpadding="0" cellspacing="0"><tr>
<td style="font-family:'Space Grotesk',Arial,sans-serif;font-size:20px;font-weight:700;color:#fff;letter-spacing:-0.02em;">Weborys</td>
<td align="right" style="font-size:12px;color:#22d3ee;text-transform:uppercase;letter-spacing:0.2em;font-weight:600;">${escapeHtml(heading)}</td>
</tr></table></td></tr>
<tr><td style="padding:32px;">${bodyContent}${footer}</td></tr>
</table></td></tr></table></body></html>`;
}

function buildNotificationEmail(lead: LeadPayload): { subject: string; html: string } {
  const subject = `[Weborys] ${TYPE_LABELS[lead.type] ?? 'New Lead'} — ${lead.full_name}`;
  const body = `
    <p style="margin:0 0 20px;color:#cbd5e1;font-size:15px;line-height:1.6;">A new lead was submitted through the Weborys website. Details below:</p>
    <table cellpadding="0" cellspacing="0" style="width:100%;">
      ${row('Name', lead.full_name)}
      ${row('Email', lead.email)}
      ${row('Phone', lead.phone)}
      ${row('Company', lead.company)}
      ${row('Project Type', lead.project_type)}
      ${row('Budget', lead.budget)}
      ${row('Details', lead.details)}
    </table>
    <p style="margin:24px 0 0;color:#64748b;font-size:12px;">Submitted ${new Date().toUTCString()}</p>`;
  return { subject, html: emailShell(TYPE_LABELS[lead.type] ?? 'New Lead', body, '') };
}

function buildConfirmationEmail(name: string): { subject: string; html: string } {
  const subject = 'We received your message — Weborys';
  const firstName = name.split(' ')[0] || name;
  const body = `
    <h1 style="margin:0 0 16px;color:#fff;font-size:24px;font-weight:600;font-family:'Space Grotesk',Arial,sans-serif;">Hi ${escapeHtml(firstName)},</h1>
    <p style="margin:0 0 16px;color:#cbd5e1;font-size:15px;line-height:1.7;">Thank you for reaching out to Weborys. We've received your message and our team will get back to you within one business day.</p>
    <p style="margin:0 0 24px;color:#cbd5e1;font-size:15px;line-height:1.7;">In the meantime, feel free to explore our work and services. We're excited to learn more about your project.</p>
    <table cellpadding="0" cellspacing="0"><tr><td style="background:#22d3ee;border-radius:999px;">
      <a href="https://weborys.com/portfolio" style="display:inline-block;padding:12px 24px;color:#05060a;font-size:14px;font-weight:600;text-decoration:none;">View Our Work</a>
    </td></tr></table>`;
  const footer = `<p style="margin:32px 0 0;color:#64748b;font-size:13px;line-height:1.6;border-top:1px solid rgba(255,255,255,0.06);padding-top:20px;">Weborys — Digital Studio<br/>b53595205@gmail.com · +91 9149960912</p>`;
  return { subject, html: emailShell('Message Received', body, footer) };
}

async function sendEmail(
  apiKey: string,
  to: string,
  from: string,
  subject: string,
  html: string
): Promise<boolean> {
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from, to: [to], subject, html }),
    });
    if (!res.ok) {
      console.error('Resend error:', res.status, await res.text());
      return false;
    }
    return true;
  } catch (err) {
    console.error('Resend fetch failed:', err);
    return false;
  }
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  try {
    const body = await req.json().catch(() => null);
    if (!body || typeof body !== 'object') {
      return new Response(JSON.stringify({ error: 'Invalid request body' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const lead = body as LeadPayload;

    // Honeypot: if filled, silently accept without storing to deter bots.
    if (lead.website) {
      return new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const errors: string[] = [];
    if (!lead.type || !['contact', 'quote', 'inquiry'].includes(lead.type)) {
      errors.push('Invalid lead type');
    }
    if (!lead.full_name || lead.full_name.trim().length < 2) {
      errors.push('Name is required');
    }
    if (!lead.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) {
      errors.push('Valid email is required');
    }
    if (lead.details && lead.details.length > 5000) {
      errors.push('Details too long');
    }
    if (errors.length > 0) {
      return new Response(JSON.stringify({ error: 'Validation failed', details: errors }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { auth: { persistSession: false } }
    );

    const { data: inserted, error: dbError } = await supabase
      .from('leads')
      .insert({
        type: lead.type,
        full_name: lead.full_name.trim(),
        email: lead.email.trim().toLowerCase(),
        phone: lead.phone?.trim() || null,
        company: lead.company?.trim() || null,
        project_type: lead.project_type?.trim() || null,
        budget: lead.budget?.trim() || null,
        details: lead.details?.trim() || null,
        status: 'new',
      })
      .select('id')
      .single();

    if (dbError) {
      console.error('DB insert error:', dbError);
      return new Response(JSON.stringify({ error: 'Failed to store lead' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const resendKey = Deno.env.get('RESEND_API_KEY');
    let emailSent = false;
    if (resendKey) {
      const notif = buildNotificationEmail(lead);
      const notifOk = await sendEmail(resendKey, NOTIFICATION_EMAIL, FROM_EMAIL, notif.subject, notif.html);
      const confirm = buildConfirmationEmail(lead.full_name);
      const confirmOk = await sendEmail(resendKey, lead.email, FROM_EMAIL, confirm.subject, confirm.html);
      emailSent = notifOk && confirmOk;
    } else {
      console.warn('RESEND_API_KEY not configured — lead stored but no email sent.');
    }

    return new Response(
      JSON.stringify({ ok: true, id: inserted?.id, emailSent }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    console.error('Unhandled error:', err);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
