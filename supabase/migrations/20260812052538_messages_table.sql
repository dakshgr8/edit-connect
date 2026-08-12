-- Create Chats Table
CREATE TABLE chats (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  editor_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(client_id, editor_id, project_id)
);

-- Create Messages Table
CREATE TABLE messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  chat_id UUID REFERENCES chats(id) ON DELETE CASCADE NOT NULL,
  sender_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  read_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE chats ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- RLS Policies for Chats
CREATE POLICY "Users can view their own chats" ON chats 
  FOR SELECT USING (auth.uid() = client_id OR auth.uid() = editor_id);

CREATE POLICY "Users can insert chats they are part of" ON chats 
  FOR INSERT WITH CHECK (auth.uid() = client_id OR auth.uid() = editor_id);

-- RLS Policies for Messages
CREATE POLICY "Users can view messages in their chats" ON messages 
  FOR SELECT USING (
    auth.uid() IN (SELECT client_id FROM chats WHERE id = chat_id) OR 
    auth.uid() IN (SELECT editor_id FROM chats WHERE id = chat_id)
  );

CREATE POLICY "Users can insert messages in their chats" ON messages 
  FOR INSERT WITH CHECK (
    auth.uid() = sender_id AND (
      auth.uid() IN (SELECT client_id FROM chats WHERE id = chat_id) OR 
      auth.uid() IN (SELECT editor_id FROM chats WHERE id = chat_id)
    )
  );

-- Function to setup realtime
ALTER PUBLICATION supabase_realtime ADD TABLE messages;
