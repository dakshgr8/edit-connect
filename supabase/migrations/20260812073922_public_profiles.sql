DROP POLICY IF EXISTS "Allow all authenticated users to view profiles" ON profiles;
CREATE POLICY "Public profiles are viewable by everyone" ON profiles FOR SELECT USING (true);
