/*
# Weborys — Core schema (projects, blog_posts, leads)

## Overview
Creates the production data model for the Weborys digital studio website:
portfolio projects, blog posts, and inbound leads from the contact forms.

## New Tables

### projects
Portfolio showcase entries. Each project has a slug (unique), title, short +
long descriptions, category, technologies (text[]), screenshots (text[] of URLs),
optional live URL, featured flag, published flag, optional client name + year.
- `id` uuid PK
- `slug` text unique not null — URL path for the project detail page
- `title` text not null
- `description` text not null — short card description
- `long_description` text — full detail page body (markdown)
- `category` text not null
- `technologies` text[] default '{}'
- `screenshots` text[] default '{}' — image URLs
- `live_url` text
- `featured` boolean default false
- `published` boolean default false
- `client` text
- `year` int
- `created_at` / `updated_at` timestamptz

### blog_posts
Articles for the blog. Slug unique, title, excerpt, content (markdown),
category, tags (text[]), optional cover image, featured + published flags,
reading time, author, optional SEO meta overrides.
- `id` uuid PK
- `slug` text unique not null
- `title` text not null
- `excerpt` text not null
- `content` text not null — markdown body
- `category` text not null
- `tags` text[] default '{}'
- `cover_image` text
- `featured` boolean default false
- `published` boolean default false
- `reading_time` int
- `author` text
- `meta_title` text — optional SEO override
- `meta_description` text — optional SEO override
- `created_at` / `updated_at` timestamptz

### leads
Inbound form submissions (contact, quote request, project inquiry).
- `id` uuid PK
- `type` text not null — 'contact' | 'quote' | 'inquiry'
- `full_name` text not null
- `email` text not null
- `phone` text
- `company` text
- `project_type` text
- `budget` text
- `details` text
- `status` text not null default 'new' — 'new' | 'contacted' | 'archived'
- `created_at` / `updated_at` timestamptz

## Security (RLS)

All tables have RLS enabled.

### projects
- Public (anon + authenticated) SELECT only on `published = true` rows.
- Authenticated full CRUD (admin manages all rows, published or not).

### blog_posts
- Public SELECT only on `published = true` rows.
- Authenticated full CRUD.

### leads
- Public INSERT only (anyone can submit a lead via the contact forms).
- Authenticated full CRUD (admin manages leads). No public SELECT — leads are
  private to the admin.

## Indexes
- projects: slug (unique), published, featured, category
- blog_posts: slug (unique), published, featured, category, created_at desc
- leads: status, type, created_at desc

## Notes
1. Admin management is gated by Supabase Auth (authenticated role). The admin
   dashboard uses email/password sign-in. No custom auth tables.
2. Leads are never publicly readable — only authenticated admins can view them.
3. `updated_at` auto-updates via triggers.
*/

-- ============ projects ============
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  long_description text,
  category text NOT NULL,
  technologies text[] NOT NULL DEFAULT '{}',
  screenshots text[] NOT NULL DEFAULT '{}',
  live_url text,
  featured boolean NOT NULL DEFAULT false,
  published boolean NOT NULL DEFAULT false,
  client text,
  year int,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_published_projects" ON projects;
CREATE POLICY "public_read_published_projects" ON projects FOR SELECT
  TO anon, authenticated USING (published = true);

DROP POLICY IF EXISTS "auth_select_all_projects" ON projects;
CREATE POLICY "auth_select_all_projects" ON projects FOR SELECT
  TO authenticated USING (true);

DROP POLICY IF EXISTS "auth_insert_projects" ON projects;
CREATE POLICY "auth_insert_projects" ON projects FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "auth_update_projects" ON projects;
CREATE POLICY "auth_update_projects" ON projects FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_delete_projects" ON projects;
CREATE POLICY "auth_delete_projects" ON projects FOR DELETE
  TO authenticated USING (true);

CREATE INDEX IF NOT EXISTS idx_projects_published ON projects (published);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects (featured);
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects (category);

-- ============ blog_posts ============
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  excerpt text NOT NULL,
  content text NOT NULL,
  category text NOT NULL,
  tags text[] NOT NULL DEFAULT '{}',
  cover_image text,
  featured boolean NOT NULL DEFAULT false,
  published boolean NOT NULL DEFAULT false,
  reading_time int,
  author text,
  meta_title text,
  meta_description text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_published_posts" ON blog_posts;
CREATE POLICY "public_read_published_posts" ON blog_posts FOR SELECT
  TO anon, authenticated USING (published = true);

DROP POLICY IF EXISTS "auth_select_all_posts" ON blog_posts;
CREATE POLICY "auth_select_all_posts" ON blog_posts FOR SELECT
  TO authenticated USING (true);

DROP POLICY IF EXISTS "auth_insert_posts" ON blog_posts;
CREATE POLICY "auth_insert_posts" ON blog_posts FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "auth_update_posts" ON blog_posts;
CREATE POLICY "auth_update_posts" ON blog_posts FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_delete_posts" ON blog_posts;
CREATE POLICY "auth_delete_posts" ON blog_posts FOR DELETE
  TO authenticated USING (true);

CREATE INDEX IF NOT EXISTS idx_posts_published ON blog_posts (published);
CREATE INDEX IF NOT EXISTS idx_posts_featured ON blog_posts (featured);
CREATE INDEX IF NOT EXISTS idx_posts_category ON blog_posts (category);
CREATE INDEX IF NOT EXISTS idx_posts_created_at ON blog_posts (created_at DESC);

-- ============ leads ============
CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL CHECK (type IN ('contact', 'quote', 'inquiry')),
  full_name text NOT NULL,
  email text NOT NULL,
  phone text,
  company text,
  project_type text,
  budget text,
  details text,
  status text NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'archived')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Public can INSERT leads (form submissions). No public SELECT/UPDATE/DELETE.
DROP POLICY IF EXISTS "public_insert_leads" ON leads;
CREATE POLICY "public_insert_leads" ON leads FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "auth_select_leads" ON leads;
CREATE POLICY "auth_select_leads" ON leads FOR SELECT
  TO authenticated USING (true);

DROP POLICY IF EXISTS "auth_update_leads" ON leads;
CREATE POLICY "auth_update_leads" ON leads FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_delete_leads" ON leads;
CREATE POLICY "auth_delete_leads" ON leads FOR DELETE
  TO authenticated USING (true);

CREATE INDEX IF NOT EXISTS idx_leads_status ON leads (status);
CREATE INDEX IF NOT EXISTS idx_leads_type ON leads (type);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads (created_at DESC);

-- ============ updated_at triggers ============
CREATE OR REPLACE FUNCTION weborys_set_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_projects_updated_at ON projects;
CREATE TRIGGER trg_projects_updated_at BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION weborys_set_updated_at();

DROP TRIGGER IF EXISTS trg_posts_updated_at ON blog_posts;
CREATE TRIGGER trg_posts_updated_at BEFORE UPDATE ON blog_posts
  FOR EACH ROW EXECUTE FUNCTION weborys_set_updated_at();

DROP TRIGGER IF EXISTS trg_leads_updated_at ON leads;
CREATE TRIGGER trg_leads_updated_at BEFORE UPDATE ON leads
  FOR EACH ROW EXECUTE FUNCTION weborys_set_updated_at();
