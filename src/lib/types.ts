// Shared domain types for Weborys

export type ProjectCategory =
  | 'Web Design'
  | 'Web Development'
  | 'UI/UX Design'
  | 'E-Commerce'
  | 'Web Application'
  | 'Landing Page';

export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  long_description: string | null;
  category: ProjectCategory | string;
  technologies: string[];
  screenshots: string[];
  live_url: string | null;
  featured: boolean;
  published: boolean;
  client: string | null;
  year: number | null;
  created_at: string;
  updated_at: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  cover_image: string | null;
  featured: boolean;
  published: boolean;
  reading_time: number | null;
  author: string | null;
  meta_title: string | null;
  meta_description: string | null;
  created_at: string;
  updated_at: string;
}

export type LeadType = 'contact' | 'quote' | 'inquiry';
export type LeadStatus = 'new' | 'contacted' | 'archived';

export interface Lead {
  id: string;
  type: LeadType;
  full_name: string;
  email: string;
  phone: string | null;
  company: string | null;
  project_type: string | null;
  budget: string | null;
  details: string | null;
  status: LeadStatus;
  created_at: string;
  updated_at: string;
}

export interface ProjectInput {
  slug: string;
  title: string;
  description: string;
  long_description?: string | null;
  category: string;
  technologies: string[];
  screenshots: string[];
  live_url?: string | null;
  featured: boolean;
  published: boolean;
  client?: string | null;
  year?: number | null;
}

export interface BlogInput {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  cover_image?: string | null;
  featured: boolean;
  published: boolean;
  author?: string | null;
  meta_title?: string | null;
  meta_description?: string | null;
}

export interface LeadInput {
  type: LeadType;
  full_name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  project_type?: string | null;
  budget?: string | null;
  details?: string | null;
}
