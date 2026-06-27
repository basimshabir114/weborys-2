import { useEffect, useState } from 'react';
import { Trash2, Loader2, AlertCircle, Mail, Phone, Building2, X, Check } from 'lucide-react';
import { adminFetchLeads, adminUpdateLeadStatus, adminDeleteLead } from '../../lib/leads';
import type { Lead, LeadStatus } from '../../lib/types';
import { cx, formatDate } from '../../lib/utils';

const STATUS_STYLES: Record<LeadStatus, string> = {
  new: 'bg-gold-400/15 text-gold-400 ring-gold-400/20',
  contacted: 'bg-cosmic-400/15 text-cosmic-300 ring-cosmic-400/20',
  archived: 'bg-white/[0.04] text-slate-400 ring-white/10',
};

const TYPE_LABELS: Record<string, string> = {
  contact: 'Contact',
  quote: 'Quote Request',
  inquiry: 'Project Inquiry',
};

export function LeadsPanel() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<LeadStatus | 'all'>('all');
  const [selected, setSelected] = useState<Lead | null>(null);

  const load = () => {
    setLoading(true);
    adminFetchLeads()
      .then(setLeads)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const onStatusChange = async (id: string, status: LeadStatus) => {
    try {
      await adminUpdateLeadStatus(id, status);
      setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
      if (selected?.id === id) setSelected((s) => (s ? { ...s, status } : s));
    } catch (e) {
      alert(e instanceof Error ? e.message : 'Update failed');
    }
  };

  const onDelete = async (id: string) => {
    if (!confirm('Delete this lead? This cannot be undone.')) return;
    try {
      await adminDeleteLead(id);
      setLeads((prev) => prev.filter((l) => l.id !== id));
      if (selected?.id === id) setSelected(null);
    } catch (e) {
      alert(e instanceof Error ? e.message : 'Delete failed');
    }
  };

  const filtered = filter === 'all' ? leads : leads.filter((l) => l.status === filter);
  const counts = {
    all: leads.length,
    new: leads.filter((l) => l.status === 'new').length,
    contacted: leads.filter((l) => l.status === 'contacted').length,
    archived: leads.filter((l) => l.status === 'archived').length,
  };

  return (
    <div>
      <div>
        <h1 className="text-2xl font-semibold text-white">Leads</h1>
        <p className="mt-2 text-sm text-slate-400">Manage contact form submissions and inquiries.</p>
      </div>

      {error && (
        <div className="mt-6 flex items-start gap-3 rounded-2xl border border-error-500/20 bg-error-500/5 p-4">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-error-400" />
          <p className="text-sm text-error-400">{error}</p>
        </div>
      )}

      {/* Filter tabs */}
      <div className="mt-6 flex flex-wrap gap-2">
        {(['all', 'new', 'contacted', 'archived'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cx(
              'rounded-full px-4 py-2 text-sm font-medium capitalize transition-colors',
              filter === f
                ? 'bg-cosmic-400 text-ink-950'
                : 'border border-white/10 text-slate-300 hover:bg-white/[0.04] hover:text-white'
            )}
          >
            {f} ({counts[f]})
          </button>
        ))}
      </div>

      {loading ? (
        <div className="mt-8 flex justify-center"><Loader2 className="h-6 w-6 animate-spin text-slate-500" /></div>
      ) : filtered.length === 0 ? (
        <p className="mt-8 rounded-2xl border border-white/[0.06] bg-ink-900/40 p-8 text-center text-sm text-slate-400">
          No leads in this category.
        </p>
      ) : (
        <div className="mt-6 space-y-3">
          {filtered.map((lead) => (
            <div key={lead.id} className="rounded-2xl border border-white/[0.06] bg-ink-900/40 p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-sm font-semibold text-white">{lead.full_name}</h3>
                    <span className={cx('rounded-full px-2 py-0.5 text-2xs font-medium uppercase tracking-wider ring-1', STATUS_STYLES[lead.status])}>
                      {lead.status}
                    </span>
                    <span className="rounded-full bg-white/[0.04] px-2 py-0.5 text-2xs text-slate-400">
                      {TYPE_LABELS[lead.type] ?? lead.type}
                    </span>
                  </div>
                  <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
                    <a href={`mailto:${lead.email}`} className="inline-flex items-center gap-1.5 hover:text-cosmic-300">
                      <Mail className="h-3 w-3" /> {lead.email}
                    </a>
                    {lead.phone && (
                      <a href={`tel:${lead.phone}`} className="inline-flex items-center gap-1.5 hover:text-cosmic-300">
                        <Phone className="h-3 w-3" /> {lead.phone}
                      </a>
                    )}
                    {lead.company && (
                      <span className="inline-flex items-center gap-1.5">
                        <Building2 className="h-3 w-3" /> {lead.company}
                      </span>
                    )}
                    <span>{formatDate(lead.created_at)}</span>
                  </div>
                  {lead.details && (
                    <p className="mt-3 text-sm text-slate-400 line-clamp-2">{lead.details}</p>
                  )}
                </div>
                <div className="flex shrink-0 gap-2">
                  <button onClick={() => setSelected(lead)} className="rounded-lg border border-white/10 px-3 py-2 text-xs font-medium text-slate-300 transition-colors hover:bg-white/[0.06] hover:text-white">
                    View
                  </button>
                  {lead.status === 'new' && (
                    <button onClick={() => onStatusChange(lead.id, 'contacted')} className="rounded-lg border border-cosmic-400/20 bg-cosmic-400/10 px-3 py-2 text-xs font-medium text-cosmic-300 transition-colors hover:bg-cosmic-400/20">
                      <Check className="h-3.5 w-3.5" />
                    </button>
                  )}
                  <button onClick={() => onDelete(lead.id)} className="rounded-lg border border-white/10 p-2 text-slate-300 transition-colors hover:bg-error-500/10 hover:text-error-400">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Detail drawer */}
      {selected && (
        <div className="fixed inset-0 z-[60] flex justify-end bg-ink-950/60 backdrop-blur-sm" onClick={() => setSelected(null)}>
          <div
            className="h-full w-full max-w-md overflow-y-auto border-l border-white/[0.08] bg-ink-900 p-6 animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">Lead Details</h2>
              <button onClick={() => setSelected(null)} className="rounded-lg p-2 text-slate-400 hover:bg-white/[0.06] hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-6 space-y-5">
              <div>
                <p className="text-xs text-slate-500">Name</p>
                <p className="mt-1 text-sm text-white">{selected.full_name}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Email</p>
                <a href={`mailto:${selected.email}`} className="mt-1 block text-sm text-cosmic-300 hover:underline">{selected.email}</a>
              </div>
              {selected.phone && (
                <div>
                  <p className="text-xs text-slate-500">Phone</p>
                  <a href={`tel:${selected.phone}`} className="mt-1 block text-sm text-cosmic-300 hover:underline">{selected.phone}</a>
                </div>
              )}
              {selected.company && (
                <div>
                  <p className="text-xs text-slate-500">Company</p>
                  <p className="mt-1 text-sm text-white">{selected.company}</p>
                </div>
              )}
              {selected.project_type && (
                <div>
                  <p className="text-xs text-slate-500">Project Type</p>
                  <p className="mt-1 text-sm text-white">{selected.project_type}</p>
                </div>
              )}
              {selected.budget && (
                <div>
                  <p className="text-xs text-slate-500">Budget</p>
                  <p className="mt-1 text-sm text-white">{selected.budget}</p>
                </div>
              )}
              {selected.details && (
                <div>
                  <p className="text-xs text-slate-500">Details</p>
                  <p className="mt-1 whitespace-pre-line text-sm text-slate-300">{selected.details}</p>
                </div>
              )}
              <div>
                <p className="text-xs text-slate-500">Submitted</p>
                <p className="mt-1 text-sm text-white">{formatDate(selected.created_at)}</p>
              </div>

              <div className="border-t border-white/[0.06] pt-5">
                <p className="label">Status</p>
                <div className="flex gap-2">
                  {(['new', 'contacted', 'archived'] as LeadStatus[]).map((s) => (
                    <button
                      key={s}
                      onClick={() => onStatusChange(selected.id, s)}
                      className={cx(
                        'flex-1 rounded-xl px-3 py-2 text-xs font-medium capitalize transition-colors',
                        selected.status === s
                          ? 'bg-cosmic-400 text-ink-950'
                          : 'border border-white/10 text-slate-300 hover:bg-white/[0.04]'
                      )}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <button onClick={() => onDelete(selected.id)} className="btn-ghost w-full text-error-400 hover:bg-error-500/10 hover:border-error-500/20">
                <Trash2 className="h-4 w-4" />
                Delete Lead
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
