import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, X, Star, Loader2, AlertCircle, ExternalLink } from 'lucide-react';
import {
  adminFetchProjects,
  adminCreateProject,
  adminUpdateProject,
  adminDeleteProject,
} from '../../lib/data';
import type { Project, ProjectInput } from '../../lib/types';
import { slugify, cx } from '../../lib/utils';

const EMPTY: ProjectInput = {
  slug: '',
  title: '',
  description: '',
  long_description: '',
  category: 'Web Design',
  technologies: [],
  screenshots: [],
  live_url: '',
  featured: false,
  published: false,
  client: '',
  year: null,
};

export function ProjectsPanel() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState<Project | null>(null);
  const [showForm, setShowForm] = useState(false);

  const load = () => {
    setLoading(true);
    adminFetchProjects()
      .then(setProjects)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const onNew = () => { setEditing(null); setShowForm(true); };
  const onEdit = (p: Project) => { setEditing(p); setShowForm(true); };

  const onDelete = async (id: string) => {
    if (!confirm('Delete this project? This cannot be undone.')) return;
    try {
      await adminDeleteProject(id);
      load();
    } catch (e) {
      alert(e instanceof Error ? e.message : 'Delete failed');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">Projects</h1>
          <p className="mt-2 text-sm text-slate-400">Manage your portfolio projects.</p>
        </div>
        <button onClick={onNew} className="btn-primary">
          <Plus className="h-4 w-4" />
          New Project
        </button>
      </div>

      {error && (
        <div className="mt-6 flex items-start gap-3 rounded-2xl border border-error-500/20 bg-error-500/5 p-4">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-error-400" />
          <p className="text-sm text-error-400">{error}</p>
        </div>
      )}

      {loading ? (
        <div className="mt-8 flex justify-center"><Loader2 className="h-6 w-6 animate-spin text-slate-500" /></div>
      ) : (
        <div className="mt-8 space-y-3">
          {projects.length === 0 && (
            <p className="rounded-2xl border border-white/[0.06] bg-ink-900/40 p-8 text-center text-sm text-slate-400">
              No projects yet. Click "New Project" to add your first one.
            </p>
          )}
          {projects.map((p) => (
            <div key={p.id} className="flex items-center gap-4 rounded-2xl border border-white/[0.06] bg-ink-900/40 p-4">
              <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-ink-800">
                {p.screenshots[0] ? (
                  <img src={p.screenshots[0]} alt={p.title} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-white/20">
                    {p.title.charAt(0)}
                  </div>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="truncate text-sm font-semibold text-white">{p.title}</h3>
                  {p.featured && <Star className="h-3.5 w-3.5 shrink-0 fill-gold-400 text-gold-400" />}
                </div>
                <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                  <span>{p.category}</span>
                  <span className={cx('rounded-full px-2 py-0.5', p.published ? 'bg-success-500/15 text-success-400' : 'bg-white/[0.04] text-slate-400')}>
                    {p.published ? 'Published' : 'Draft'}
                  </span>
                  {p.live_url && (
                    <a href={p.live_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-cosmic-300 hover:underline">
                      <ExternalLink className="h-3 w-3" /> Live
                    </a>
                  )}
                </div>
              </div>
              <div className="flex shrink-0 gap-2">
                <button onClick={() => onEdit(p)} className="rounded-lg border border-white/10 p-2 text-slate-300 transition-colors hover:bg-white/[0.06] hover:text-white">
                  <Pencil className="h-4 w-4" />
                </button>
                <button onClick={() => onDelete(p.id)} className="rounded-lg border border-white/10 p-2 text-slate-300 transition-colors hover:bg-error-500/10 hover:text-error-400">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <ProjectForm
          project={editing}
          onClose={() => setShowForm(false)}
          onSaved={() => { setShowForm(false); load(); }}
        />
      )}
    </div>
  );
}

function ProjectForm({ project, onClose, onSaved }: { project: Project | null; onClose: () => void; onSaved: () => void }) {
  const [form, setForm] = useState<ProjectInput>(project ? {
    slug: project.slug, title: project.title, description: project.description,
    long_description: project.long_description, category: project.category,
    technologies: project.technologies, screenshots: project.screenshots,
    live_url: project.live_url, featured: project.featured, published: project.published,
    client: project.client, year: project.year,
  } : EMPTY);
  const [techInput, setTechInput] = useState('');
  const [shotInput, setShotInput] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = <K extends keyof ProjectInput>(k: K, v: ProjectInput[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const addTech = () => {
    const t = techInput.trim();
    if (t && !form.technologies.includes(t)) {
      set('technologies', [...form.technologies, t]);
    }
    setTechInput('');
  };
  const removeTech = (t: string) => set('technologies', form.technologies.filter((x) => x !== t));

  const addShot = () => {
    const s = shotInput.trim();
    if (s) set('screenshots', [...form.screenshots, s]);
    setShotInput('');
  };
  const removeShot = (s: string) => set('screenshots', form.screenshots.filter((x) => x !== s));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const payload = { ...form, slug: form.slug || slugify(form.title) };
      if (project) {
        await adminUpdateProject(project.id, payload);
      } else {
        await adminCreateProject(payload);
      }
      onSaved();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed');
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto bg-ink-950/80 p-4 backdrop-blur-sm sm:p-8">
      <div className="my-auto w-full max-w-2xl rounded-3xl border border-white/[0.08] bg-ink-900 p-6 sm:p-8">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">{project ? 'Edit Project' : 'New Project'}</h2>
          <button onClick={onClose} className="rounded-lg p-2 text-slate-400 hover:bg-white/[0.06] hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        {error && (
          <div className="mt-5 flex items-start gap-3 rounded-2xl border border-error-500/20 bg-error-500/5 p-4">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-error-400" />
            <p className="text-sm text-error-400">{error}</p>
          </div>
        )}

        <form onSubmit={onSubmit} className="mt-6 space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="label">Title *</label>
              <input required className="input" value={form.title} onChange={(e) => set('title', e.target.value)} />
            </div>
            <div>
              <label className="label">Slug</label>
              <input className="input" value={form.slug} placeholder="auto-generated" onChange={(e) => set('slug', e.target.value)} />
            </div>
          </div>

          <div>
            <label className="label">Short Description *</label>
            <textarea required rows={2} className="input resize-none" value={form.description} onChange={(e) => set('description', e.target.value)} />
          </div>

          <div>
            <label className="label">Long Description</label>
            <textarea rows={5} className="input resize-none" value={form.long_description ?? ''} onChange={(e) => set('long_description', e.target.value)} placeholder="Full project description (plain text)" />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="label">Category *</label>
              <select className="input" value={form.category} onChange={(e) => set('category', e.target.value)}>
                {['Web Design', 'Web Development', 'UI/UX Design', 'E-Commerce', 'Web Application', 'Landing Page'].map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="label">Year</label>
              <input type="number" className="input" value={form.year ?? ''} onChange={(e) => set('year', e.target.value ? Number(e.target.value) : null)} />
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="label">Client</label>
              <input className="input" value={form.client ?? ''} onChange={(e) => set('client', e.target.value)} />
            </div>
            <div>
              <label className="label">Live URL</label>
              <input className="input" value={form.live_url ?? ''} onChange={(e) => set('live_url', e.target.value)} placeholder="https://..." />
            </div>
          </div>

          {/* Technologies */}
          <div>
            <label className="label">Technologies</label>
            <div className="flex gap-2">
              <input className="input flex-1" value={techInput} onChange={(e) => setTechInput(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addTech(); } }} placeholder="Add a technology..." />
              <button type="button" onClick={addTech} className="btn-ghost shrink-0">Add</button>
            </div>
            {form.technologies.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {form.technologies.map((t) => (
                  <span key={t} className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-slate-300">
                    {t}
                    <button type="button" onClick={() => removeTech(t)} className="text-slate-500 hover:text-error-400"><X className="h-3 w-3" /></button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Screenshots */}
          <div>
            <label className="label">Screenshot URLs</label>
            <div className="flex gap-2">
              <input className="input flex-1" value={shotInput} onChange={(e) => setShotInput(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addShot(); } }} placeholder="https://image-url..." />
              <button type="button" onClick={addShot} className="btn-ghost shrink-0">Add</button>
            </div>
            {form.screenshots.length > 0 && (
              <div className="mt-3 space-y-2">
                {form.screenshots.map((s, i) => (
                  <div key={i} className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-ink-950/40 p-2">
                    <img src={s} alt="" className="h-10 w-16 shrink-0 rounded object-cover" />
                    <span className="flex-1 truncate text-xs text-slate-400">{s}</span>
                    <button type="button" onClick={() => removeShot(s)} className="text-slate-500 hover:text-error-400"><X className="h-4 w-4" /></button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex gap-6">
            <label className="flex items-center gap-2.5 text-sm text-slate-300">
              <input type="checkbox" checked={form.featured} onChange={(e) => set('featured', e.target.checked)} className="h-4 w-4 rounded border-white/20 bg-ink-950 text-cosmic-400 focus:ring-cosmic-400/40" />
              Featured
            </label>
            <label className="flex items-center gap-2.5 text-sm text-slate-300">
              <input type="checkbox" checked={form.published} onChange={(e) => set('published', e.target.checked)} className="h-4 w-4 rounded border-white/20 bg-ink-950 text-cosmic-400 focus:ring-cosmic-400/40" />
              Published
            </label>
          </div>

          <div className="flex justify-end gap-3 border-t border-white/[0.06] pt-5">
            <button type="button" onClick={onClose} className="btn-ghost">Cancel</button>
            <button type="submit" disabled={saving} className="btn-primary">
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              {project ? 'Save Changes' : 'Create Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
