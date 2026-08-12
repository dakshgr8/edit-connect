-- Create ENUMS
CREATE TYPE user_role AS ENUM ('client', 'editor', 'admin');
CREATE TYPE project_status AS ENUM ('open', 'in_progress', 'completed', 'cancelled');
CREATE TYPE application_status AS ENUM ('pending', 'accepted', 'rejected');

-- Create Profiles Table (extends auth.users)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  role user_role NOT NULL DEFAULT 'client',
  full_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create Projects Table
CREATE TABLE projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  budget NUMERIC NOT NULL,
  status project_status DEFAULT 'open',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create Applications Table
CREATE TABLE applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE NOT NULL,
  editor_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  cover_letter TEXT,
  status application_status DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(project_id, editor_id)
);

-- Enable RLS (Row Level Security)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

-- Simple Policies for MVP (Allow all for authenticated users)
CREATE POLICY "Allow all authenticated users to view profiles" ON profiles FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Users can insert their own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Anyone can view open projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Clients can insert projects" ON projects FOR INSERT WITH CHECK (auth.uid() = client_id);
CREATE POLICY "Clients can update own projects" ON projects FOR UPDATE USING (auth.uid() = client_id);

CREATE POLICY "Anyone involved can view applications" ON applications FOR SELECT USING (auth.uid() = editor_id OR auth.uid() IN (SELECT client_id FROM projects WHERE id = project_id));
CREATE POLICY "Editors can insert applications" ON applications FOR INSERT WITH CHECK (auth.uid() = editor_id);
CREATE POLICY "Clients can update application status" ON applications FOR UPDATE USING (auth.uid() IN (SELECT client_id FROM projects WHERE id = project_id));

-- Trigger to automatically create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url, role)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url', COALESCE((new.raw_user_meta_data->>'role')::user_role, 'client'));
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
