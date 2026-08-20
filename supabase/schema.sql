-- 2MKA Website Database Schema
-- Run this in your Supabase SQL Editor

-- Tables
CREATE TABLE IF NOT EXISTS portfolio_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT DEFAULT 'general',
  image_url TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE portfolio_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Portfolio policies: public can view, only admin can modify
CREATE POLICY "Public can view portfolio" ON portfolio_items FOR SELECT USING (true);
CREATE POLICY "Authenticated can insert portfolio" ON portfolio_items FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can update portfolio" ON portfolio_items FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can delete portfolio" ON portfolio_items FOR DELETE USING (auth.role() = 'authenticated');

-- Contact policies: anyone can submit, only admin can view/manage
CREATE POLICY "Authenticated can view submissions" ON contact_submissions FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Anyone can submit contact" ON contact_submissions FOR INSERT WITH CHECK (true);
CREATE POLICY "Authenticated can update submissions" ON contact_submissions FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can delete submissions" ON contact_submissions FOR DELETE USING (auth.role() = 'authenticated');
