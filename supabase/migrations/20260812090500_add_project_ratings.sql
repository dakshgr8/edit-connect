ALTER TABLE projects ADD COLUMN editor_id UUID REFERENCES profiles(id) ON DELETE SET NULL;
ALTER TABLE projects ADD COLUMN rating INTEGER CHECK (rating >= 1 AND rating <= 5);
ALTER TABLE projects ADD COLUMN review_comment TEXT;
