import { useState } from 'react';
import { Plus, Trash2, Star, Edit2, X, Check } from 'lucide-react';
import { useSeo } from '../../lib/seo';
import { cx } from '../../lib/utils';

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  rating: number;
}

const defaultTestimonials: Testimonial[] = [
  { id: '1', quote: 'Weborys transformed our digital presence entirely. The attention to detail and craft is unlike anything we have worked with before.', author: 'Rahul Sharma', role: 'CEO, TechStart Solutions', rating: 5 },
  { id: '2', quote: 'They did not just build us a website — they built us a competitive advantage. Our conversions doubled within the first quarter.', author: 'Priya Patel', role: 'Founder, StyleBazaar', rating: 5 },
  { id: '3', quote: 'The level of polish in the final product exceeded every expectation. It feels like a million-dollar brand experience.', author: 'Amit Kumar', role: 'Director, CloudServe India', rating: 5 },
];

export function TestimonialsPanel() {
  useSeo({ title: 'Testimonials', noIndex: true });
  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => {
    const saved = localStorage.getItem('weborys_testimonials');
    return saved ? JSON.parse(saved) : defaultTestimonials;
  });
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<Testimonial>>({});

  const saveToStorage = (data: Testimonial[]) => {
    localStorage.setItem('weborys_testimonials', JSON.stringify(data));
    setTestimonials(data);
  };

  const handleAdd = () => {
    const newTestimonial: Testimonial = {
      id: Date.now().toString(),
      quote: form.quote || '',
      author: form.author || '',
      role: form.role || '',
      rating: form.rating || 5,
    };
    saveToStorage([newTestimonial, ...testimonials]);
    setForm({});
  };

  const handleEdit = (t: Testimonial) => {
    setEditing(t.id);
    setForm(t);
  };

  const handleSave = () => {
    if (!editing) return;
    saveToStorage(testimonials.map((t) => (t.id === editing ? { ...t, ...form } : t)));
    setEditing(null);
    setForm({});
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this testimonial?')) {
      saveToStorage(testimonials.filter((t) => t.id !== id));
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">Testimonials</h1>
          <p className="mt-2 text-sm text-slate-400">Manage client testimonials displayed on your site.</p>
        </div>
      </div>

      {/* Add New Form */}
      <div className="mt-8 card p-6">
        <h2 className="text-lg font-medium text-white">Add New Testimonial</h2>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="label">Quote</label>
            <textarea
              value={form.quote || ''}
              onChange={(e) => setForm((p) => ({ ...p, quote: e.target.value }))}
              rows={3}
              className="input mt-1.5 resize-none"
              placeholder="What did the client say?"
            />
          </div>
          <div>
            <label className="label">Author Name</label>
            <input
              type="text"
              value={form.author || ''}
              onChange={(e) => setForm((p) => ({ ...p, author: e.target.value }))}
              className="input mt-1.5"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="label">Role / Company</label>
            <input
              type="text"
              value={form.role || ''}
              onChange={(e) => setForm((p) => ({ ...p, role: e.target.value }))}
              className="input mt-1.5"
              placeholder="CEO, Company Name"
            />
          </div>
          <div>
            <label className="label">Rating</label>
            <div className="mt-2 flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setForm((p) => ({ ...p, rating: i + 1 }))}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={cx(
                      'h-6 w-6',
                      (form.rating || 5) > i ? 'fill-gold-400 text-gold-400' : 'text-slate-600'
                    )}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
        <button onClick={handleAdd} className="btn-primary mt-5">
          <Plus className="h-4 w-4" />
          Add Testimonial
        </button>
      </div>

      {/* Testimonials List */}
      <div className="mt-8 space-y-4">
        {testimonials.map((t) => (
          <div key={t.id} className="card p-6">
            {editing === t.id ? (
              <div className="space-y-4">
                <textarea
                  value={form.quote}
                  onChange={(e) => setForm((p) => ({ ...p, quote: e.target.value }))}
                  rows={3}
                  className="input resize-none"
                />
                <div className="grid gap-4 sm:grid-cols-2">
                  <input
                    type="text"
                    value={form.author}
                    onChange={(e) => setForm((p) => ({ ...p, author: e.target.value }))}
                    className="input"
                    placeholder="Author"
                  />
                  <input
                    type="text"
                    value={form.role}
                    onChange={(e) => setForm((p) => ({ ...p, role: e.target.value }))}
                    className="input"
                    placeholder="Role"
                  />
                </div>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setForm((p) => ({ ...p, rating: i + 1 }))}
                    >
                      <Star
                        className={cx(
                          'h-5 w-5',
                          (form.rating || 5) > i ? 'fill-gold-400 text-gold-400' : 'text-slate-600'
                        )}
                      />
                    </button>
                  ))}
                </div>
                <div className="flex gap-2">
                  <button onClick={handleSave} className="btn-primary">
                    <Check className="h-4 w-4" />
                    Save
                  </button>
                  <button onClick={() => { setEditing(null); setForm({}); }} className="btn-ghost">
                    <X className="h-4 w-4" />
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-gold-400 text-gold-400" />
                    ))}
                  </div>
                  <p className="mt-3 text-slate-300">{t.quote}</p>
                  <div className="mt-4">
                    <div className="text-sm font-medium text-white">{t.author}</div>
                    <div className="text-xs text-slate-500">{t.role}</div>
                  </div>
                </div>
                <div className="flex shrink-0 gap-2">
                  <button
                    onClick={() => handleEdit(t)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.06] text-slate-400 transition-colors hover:bg-white/[0.04] hover:text-white"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(t.id)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-error-500/20 text-slate-400 transition-colors hover:bg-error-500/10 hover:text-error-400"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
