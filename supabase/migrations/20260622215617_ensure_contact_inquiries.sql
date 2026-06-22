CREATE TABLE IF NOT EXISTS contact_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  contact_number text,
  company text,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_inquiries ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'contact_inquiries' AND policyname = 'Anyone can submit contact inquiries'
  ) THEN
    CREATE POLICY "Anyone can submit contact inquiries"
      ON contact_inquiries FOR INSERT TO anon WITH CHECK (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'contact_inquiries' AND policyname = 'Authenticated users can read contact inquiries'
  ) THEN
    CREATE POLICY "Authenticated users can read contact inquiries"
      ON contact_inquiries FOR SELECT TO authenticated USING (true);
  END IF;
END $$;
