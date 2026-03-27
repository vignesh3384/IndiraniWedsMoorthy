-- Create RSVPs table for wedding invitation responses
CREATE TABLE IF NOT EXISTS public.rsvps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  guests INTEGER NOT NULL DEFAULT 1,
  attending BOOLEAN NOT NULL,
  message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.rsvps ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (public RSVP form)
CREATE POLICY "Allow public inserts" ON public.rsvps
  FOR INSERT
  WITH CHECK (true);

-- Only allow authenticated users (admin) to view all RSVPs
CREATE POLICY "Allow authenticated users to view" ON public.rsvps
  FOR SELECT
  USING (auth.role() = 'authenticated');
