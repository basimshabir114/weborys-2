import { useState } from 'react';
import { Save, Mail, Phone, MapPin, Globe, Facebook, Twitter, Instagram, Linkedin, Youtube, Check } from 'lucide-react';
import { useSeo } from '../../lib/seo';

interface SiteSettings {
  siteName: string;
  siteDescription: string;
  email: string;
  phone: string;
  address: string;
  socialFacebook: string;
  socialTwitter: string;
  socialInstagram: string;
  socialLinkedin: string;
  socialYoutube: string;
  metaKeywords: string;
  googleAnalyticsId: string;
}

const defaultSettings: SiteSettings = {
  siteName: 'Weborys',
  siteDescription: 'A modern digital studio crafting premium websites, web applications, and digital experiences for ambitious brands.',
  email: 'b53595205@gmail.com',
  phone: '+91 9149960912',
  address: 'India',
  socialFacebook: '',
  socialTwitter: '',
  socialInstagram: '',
  socialLinkedin: '',
  socialYoutube: '',
  metaKeywords: 'web design, web development, UI/UX, digital studio, India',
  googleAnalyticsId: '',
};

export function SettingsPanel() {
  useSeo({ title: 'Settings', noIndex: true });
  const [settings, setSettings] = useState<SiteSettings>(() => {
    const saved = localStorage.getItem('weborys_settings');
    return saved ? JSON.parse(saved) : defaultSettings;
  });
  const [saved, setSaved] = useState(false);

  const handleChange = (key: keyof SiteSettings, value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  };

  const handleSave = () => {
    localStorage.setItem('weborys_settings', JSON.stringify(settings));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">Settings</h1>
          <p className="mt-2 text-sm text-slate-400">Manage your site configuration and branding.</p>
        </div>
        <button onClick={handleSave} className="btn-primary">
          {saved ? (
            <>
              <Check className="h-4 w-4" />
              Saved!
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              Save Changes
            </>
          )}
        </button>
      </div>

      <div className="mt-8 space-y-8">
        {/* General Settings */}
        <div className="card p-6">
          <h2 className="text-lg font-semibold text-white">General</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <div>
              <label className="label">Site Name</label>
              <input
                type="text"
                value={settings.siteName}
                onChange={(e) => handleChange('siteName', e.target.value)}
                className="input mt-1.5"
              />
            </div>
            <div>
              <label className="label">Email</label>
              <div className="relative mt-1.5">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <input
                  type="email"
                  value={settings.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="input pl-10"
                />
              </div>
            </div>
            <div>
              <label className="label">Phone</label>
              <div className="relative mt-1.5">
                <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <input
                  type="tel"
                  value={settings.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  className="input pl-10"
                />
              </div>
            </div>
            <div>
              <label className="label">Location</label>
              <div className="relative mt-1.5">
                <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  value={settings.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                  className="input pl-10"
                />
              </div>
            </div>
          </div>
          <div className="mt-5">
            <label className="label">Site Description</label>
            <textarea
              value={settings.siteDescription}
              onChange={(e) => handleChange('siteDescription', e.target.value)}
              rows={3}
              className="input mt-1.5 resize-none"
            />
          </div>
        </div>

        {/* Social Media */}
        <div className="card p-6">
          <h2 className="text-lg font-semibold text-white">Social Media</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <div>
              <label className="label">Facebook</label>
              <div className="relative mt-1.5">
                <Facebook className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <input
                  type="url"
                  value={settings.socialFacebook}
                  onChange={(e) => handleChange('socialFacebook', e.target.value)}
                  className="input pl-10"
                  placeholder="https://facebook.com/..."
                />
              </div>
            </div>
            <div>
              <label className="label">Twitter/X</label>
              <div className="relative mt-1.5">
                <Twitter className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <input
                  type="url"
                  value={settings.socialTwitter}
                  onChange={(e) => handleChange('socialTwitter', e.target.value)}
                  className="input pl-10"
                  placeholder="https://x.com/..."
                />
              </div>
            </div>
            <div>
              <label className="label">Instagram</label>
              <div className="relative mt-1.5">
                <Instagram className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <input
                  type="url"
                  value={settings.socialInstagram}
                  onChange={(e) => handleChange('socialInstagram', e.target.value)}
                  className="input pl-10"
                  placeholder="https://instagram.com/..."
                />
              </div>
            </div>
            <div>
              <label className="label">LinkedIn</label>
              <div className="relative mt-1.5">
                <Linkedin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <input
                  type="url"
                  value={settings.socialLinkedin}
                  onChange={(e) => handleChange('socialLinkedin', e.target.value)}
                  className="input pl-10"
                  placeholder="https://linkedin.com/..."
                />
              </div>
            </div>
            <div>
              <label className="label">YouTube</label>
              <div className="relative mt-1.5">
                <Youtube className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <input
                  type="url"
                  value={settings.socialYoutube}
                  onChange={(e) => handleChange('socialYoutube', e.target.value)}
                  className="input pl-10"
                  placeholder="https://youtube.com/..."
                />
              </div>
            </div>
          </div>
        </div>

        {/* SEO Settings */}
        <div className="card p-6">
          <h2 className="text-lg font-semibold text-white">SEO & Analytics</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="label">Meta Keywords</label>
              <input
                type="text"
                value={settings.metaKeywords}
                onChange={(e) => handleChange('metaKeywords', e.target.value)}
                className="input mt-1.5"
                placeholder="web design, development, ..."
              />
            </div>
            <div>
              <label className="label">Google Analytics ID</label>
              <div className="relative mt-1.5">
                <Globe className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  value={settings.googleAnalyticsId}
                  onChange={(e) => handleChange('googleAnalyticsId', e.target.value)}
                  className="input pl-10"
                  placeholder="G-XXXXXXXXXX"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
