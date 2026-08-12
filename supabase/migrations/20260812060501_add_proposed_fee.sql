ALTER TABLE applications
ADD COLUMN proposed_fee NUMERIC;

ALTER TABLE profiles
RENAME COLUMN hourly_rate TO min_project_rate;
