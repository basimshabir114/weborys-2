import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, X, Loader2, AlertCircle, Star } from 'lucide-react';
import {
  adminFetchPosts,
  adminCreatePost,
  adminUpdatePost,
  adminDeletePost,
} from '../../lib/data';
import type { BlogPost, BlogInput } from '../../lib/types';
import { slugify, cx, estimateReadingTime, formatDate } from '../../lib/utils';

const EMPTY: BlogInput = {
  slug: '',
  title: '',
  excerpt: '',
  content: '',
  category: 'Design',
  tags: [],
  cover_image: '',
  featured: false,
  published: false,
  author: 'Weborys',
  meta_title: '',
  meta_description: '',
};

export function BlogPanel() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [showForm, setShowForm] = useState(false);

  const load = () => {
    setLoading(true);
    adminFetchPosts()
      .then(setPosts)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const onNew = () => { setEditing(null); setShowForm(true); };
  const onEdit = (p: BlogPost) => { setEditing(p); setShowForm(true); };

  const onDelete = async (id: string) => {
    if (!confirm('Delete this blog post? This cannot be undone.')) return;
    try {
      await adminDeletePost(id);
      load();
    } catch (e) {
      alert(e instanceof Error ? e.message : 'Delete failed');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">Blog Posts</h1>
          <p className="mt-2 text-sm text-slate-400">Manage your blog articles.</p>
        </div>
        <button onClick={onNew} className="btn-primary">
          <Plus className="h-4 w-4" />
          New Post
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
          {posts.length === 0 && (
            <p className="rounded-2xl border border-white/[0.06] bg-ink-900/40 p-8 text-center text-sm text-slate-400">
              No posts yet. Click "New Post" to write your first article.
            </p>
          )}
          {posts.map((p) => (
            <div key={p.id} className="flex items-center gap-4 rounded-2xl border border-white/[0.06] bg-ink-900/40 p-4">
              <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-ink-800">
                {p.cover_image ? (
                  <img src={p.cover_image} alt={p.title} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-white/20">{p.title.charAt(0)}</div>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="truncate text-sm font-semibold text-white">{p.title}</h3>
                  {p.featured && <Star className="h-3.5 w-3.5 shrink-0 fill-gold-400 text-gold-400" />}
                </div>
                <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                  <span>{p.category}</span>
                  <span>·</span>
                  <span>{formatDate(p.created_at)}</span>
                  <span className={cx('rounded-full px-2 py-0.5', p.published ? 'bg-success-500/15 text-success-400' : 'bg-white/[0.04] text-slate-400')}>
                    {p.published ? 'Published' : 'Draft'}
                  </span>
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
        <PostForm post={editing} onClose={() => setShowForm(false)} onSaved={() => { setShowForm(false); load(); }} />
      )}
    </div>
  );
}

function PostForm({ post, onClose, onSaved }: { post: BlogPost | null; onClose: () => void; onSaved: () => void }) {
  const [form, setForm] = useState<BlogInput>(post ? {
    slug: post.slug, title: post.title, excerpt: post.excerpt, content: post.content,
    category: post.category, tags: post.tags, cover_image: post.cover_image,
    featured: post.featured, published: post.published, author: post.author,
    meta_title: post.meta_title, meta_description: post.meta_description,
  } : EMPTY);
  const [tagInput, setTagInput] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = <K extends keyof BlogInput>(k: K, v: BlogInput[K]) => setForm((f) => ({ ...f, [k]: v }));

  const addTag = () => {
    const t = tagInput.trim().toLowerCase();
    if (t && !form.tags.includes(t)) set('tags', [...form.tags, t]);
    setTagInput('');
  };
  const removeTag = (t: string) => set('tags', form.tags.filter((x) => x !== t));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const payload = {
        ...form,
        slug: form.slug || slugify(form.title),
        reading_time: estimateReadingTime(form.content),
      };
      if (post) {
        await adminUpdatePost(post.id, payload);
      } else {
        await adminCreatePost(payload);
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
          <h2 className="text-xl font-semibold text-white">{post ? 'Edit Post' : 'New Post'}</h2>
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
            <label className="label">Excerpt *</label>
            <textarea required rows={2} className="input resize-none" value={form.excerpt} onChange={(e) => set('excerpt', e.target.value)} placeholder="Short summary shown in the blog list..." />
          </div>

          <div>
            <label className="label">Content (Markdown) *</label>
            <textarea required rows={10} className="input resize-none font-mono text-sm" value={form.content} onChange={(e) => set('content', e.target.value)} placeholder={'## Heading\n\nWrite your article in markdown...\n\n- Use lists\n- **bold** and *italic*\n- `inline code`\n\n```\ncode blocks\n```'} />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="label">Category *</label>
              <input required className="input" value={form.category} onChange={(e) => set('category', e.target.value)} placeholder="Design, Development, etc." />
            </div>
            <div>
              <label className="label">Author</label>
              <input className="input" value={form.author ?? ''} onChange={(e) => set('author', e.target.value)} />
            </div>
          </div>

          <div>
            <label className="label">Cover Image URL</label>
            <input className="input" value={form.cover_image ?? ''} onChange={(e) => set('cover_image', e.target.value)} placeholder="https://..." />
          </div>

          {/* Tags */}
          <div>
            <label className="label">Tags</label>
            <div className="flex gap-2">
              <input className="input flex-1" value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addTag(); } }} placeholder="Add a tag..." />
              <button type="button" onClick={addTag} className="btn-ghost shrink-0">Add</button>
            </div>
            {form.tags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {form.tags.map((t) => (
                  <span key={t} className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-slate-300">
                    #{t}
                    <button type="button" onClick={() => removeTag(t)} className="text-slate-500 hover:text-error-400"><X className="h-3 w-3" /></button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* SEO */}
          <div className="rounded-2xl border border-white/[0.06] bg-ink-950/40 p-5">
            <h3 className="text-2xs font-semibold uppercase tracking-ultra text-slate-500">SEO (optional)</h3>
            <div className="mt-4 space-y-4">
              <div>
                <label className="label">Meta Title</label>
                <input className="input" value={form.meta_title ?? ''} onChange={(e) => set('meta_title', e.target.value)} placeholder="Defaults to post title" />
              </div>
              <div>
                <label className="label">Meta Description</label>
                <textarea rows={2} className="input resize-none" value={form.meta_description ?? ''} onChange={(e) => set('meta_description', e.target.value)} placeholder="Defaults to excerpt" />
              </div>
            </div>
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
              {post ? 'Save Changes' : 'Create Post'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
