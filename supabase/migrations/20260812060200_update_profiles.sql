ALTER TABLE profiles
ADD COLUMN hourly_rate NUMERIC,
ADD COLUMN primary_software TEXT,
ADD COLUMN category TEXT,
ADD COLUMN portfolio_url TEXT,
ADD COLUMN rating NUMERIC DEFAULT 5.0;
