CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
DECLARE
  assigned_role public.user_role;
BEGIN
  IF new.raw_user_meta_data->>'role' = 'admin' THEN
    assigned_role := 'admin'::public.user_role;
  ELSIF new.raw_user_meta_data->>'role' = 'editor' THEN
    assigned_role := 'editor'::public.user_role;
  ELSE
    assigned_role := 'client'::public.user_role;
  END IF;

  INSERT INTO public.profiles (id, full_name, avatar_url, role)
  VALUES (
    new.id, 
    new.raw_user_meta_data->>'full_name', 
    new.raw_user_meta_data->>'avatar_url', 
    assigned_role
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
