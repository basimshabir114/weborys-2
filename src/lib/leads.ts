import { supabase, SUPABASE_URL, SUPABASE_ANON_KEY } from './supabase';
import type { Lead, LeadInput, LeadStatus } from './types';

// Public: submit a lead via the edge function (stores + sends email).
export async function submitLead(input: LeadInput): Promise<{ ok: boolean; emailSent: boolean }> {
  const endpoint = `${SUPABASE_URL}/functions/v1/contact-lead`;
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    },
    body: JSON.stringify(input),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Request failed' }));
    throw new Error((err as { error?: string }).error || `Request failed (${res.status})`);
  }
  const data = (await res.json()) as { ok: boolean; emailSent?: boolean };
  if (!data || data.ok !== true) {
    throw new Error('Unexpected response from server');
  }
  return { ok: true, emailSent: data.emailSent ?? false };
}

// Admin (authenticated) queries
export async function adminFetchLeads(): Promise<Lead[]> {
  const { data, error } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return (data ?? []) as Lead[];
}

export async function adminUpdateLeadStatus(id: string, status: LeadStatus): Promise<void> {
  const { error } = await supabase.from('leads').update({ status }).eq('id', id);
  if (error) throw error;
}

export async function adminDeleteLead(id: string): Promise<void> {
  const { error } = await supabase.from('leads').delete().eq('id', id);
  if (error) throw error;
}
