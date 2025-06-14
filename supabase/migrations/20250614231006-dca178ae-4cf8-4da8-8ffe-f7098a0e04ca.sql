
-- Create entities table for managing custom entities
CREATE TABLE public.entities (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  display_name TEXT NOT NULL,
  entity_type TEXT NOT NULL CHECK (entity_type IN ('system', 'custom')),
  description TEXT,
  category TEXT,
  parent_entity_id UUID REFERENCES public.entities(id),
  language TEXT DEFAULT 'en',
  is_composite BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  user_id UUID REFERENCES auth.users
);

-- Create entity synonyms table
CREATE TABLE public.entity_synonyms (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  entity_id UUID REFERENCES public.entities(id) ON DELETE CASCADE,
  synonym TEXT NOT NULL,
  language TEXT DEFAULT 'en',
  confidence_score FLOAT DEFAULT 1.0,
  auto_generated BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create entity relationships table for dependency mapping
CREATE TABLE public.entity_relationships (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  parent_entity_id UUID REFERENCES public.entities(id) ON DELETE CASCADE,
  child_entity_id UUID REFERENCES public.entities(id) ON DELETE CASCADE,
  relationship_type TEXT NOT NULL CHECK (relationship_type IN ('depends_on', 'extends', 'conflicts_with', 'similar_to')),
  strength FLOAT DEFAULT 1.0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create conversation logs table for smart extraction
CREATE TABLE public.conversation_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_input TEXT NOT NULL,
  detected_entities JSONB,
  missing_entities JSONB,
  confidence_scores JSONB,
  language TEXT DEFAULT 'en',
  processed BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  user_id UUID REFERENCES auth.users
);

-- Create entity analytics table for performance tracking
CREATE TABLE public.entity_analytics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  entity_id UUID REFERENCES public.entities(id) ON DELETE CASCADE,
  usage_count INTEGER DEFAULT 0,
  accuracy_score FLOAT DEFAULT 0.0,
  last_used_at TIMESTAMP WITH TIME ZONE,
  performance_data JSONB,
  date_tracked DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.entities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.entity_synonyms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.entity_relationships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversation_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.entity_analytics ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for entities
CREATE POLICY "Users can view entities" ON public.entities FOR SELECT USING (user_id = auth.uid() OR entity_type = 'system');
CREATE POLICY "Users can create entities" ON public.entities FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY "Users can update their entities" ON public.entities FOR UPDATE USING (user_id = auth.uid());
CREATE POLICY "Users can delete their entities" ON public.entities FOR DELETE USING (user_id = auth.uid());

-- Create RLS policies for entity synonyms
CREATE POLICY "Users can view synonyms" ON public.entity_synonyms FOR SELECT USING (EXISTS (SELECT 1 FROM public.entities WHERE entities.id = entity_synonyms.entity_id AND (entities.user_id = auth.uid() OR entities.entity_type = 'system')));
CREATE POLICY "Users can create synonyms" ON public.entity_synonyms FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM public.entities WHERE entities.id = entity_synonyms.entity_id AND entities.user_id = auth.uid()));
CREATE POLICY "Users can update synonyms" ON public.entity_synonyms FOR UPDATE USING (EXISTS (SELECT 1 FROM public.entities WHERE entities.id = entity_synonyms.entity_id AND entities.user_id = auth.uid()));
CREATE POLICY "Users can delete synonyms" ON public.entity_synonyms FOR DELETE USING (EXISTS (SELECT 1 FROM public.entities WHERE entities.id = entity_synonyms.entity_id AND entities.user_id = auth.uid()));

-- Create RLS policies for entity relationships
CREATE POLICY "Users can view relationships" ON public.entity_relationships FOR SELECT USING (EXISTS (SELECT 1 FROM public.entities WHERE entities.id = entity_relationships.parent_entity_id AND (entities.user_id = auth.uid() OR entities.entity_type = 'system')));
CREATE POLICY "Users can create relationships" ON public.entity_relationships FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM public.entities WHERE entities.id = entity_relationships.parent_entity_id AND entities.user_id = auth.uid()));
CREATE POLICY "Users can update relationships" ON public.entity_relationships FOR UPDATE USING (EXISTS (SELECT 1 FROM public.entities WHERE entities.id = entity_relationships.parent_entity_id AND entities.user_id = auth.uid()));
CREATE POLICY "Users can delete relationships" ON public.entity_relationships FOR DELETE USING (EXISTS (SELECT 1 FROM public.entities WHERE entities.id = entity_relationships.parent_entity_id AND entities.user_id = auth.uid()));

-- Create RLS policies for conversation logs
CREATE POLICY "Users can view their logs" ON public.conversation_logs FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Users can create logs" ON public.conversation_logs FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY "Users can update their logs" ON public.conversation_logs FOR UPDATE USING (user_id = auth.uid());
CREATE POLICY "Users can delete their logs" ON public.conversation_logs FOR DELETE USING (user_id = auth.uid());

-- Create RLS policies for entity analytics
CREATE POLICY "Users can view analytics" ON public.entity_analytics FOR SELECT USING (EXISTS (SELECT 1 FROM public.entities WHERE entities.id = entity_analytics.entity_id AND (entities.user_id = auth.uid() OR entities.entity_type = 'system')));
CREATE POLICY "Users can create analytics" ON public.entity_analytics FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM public.entities WHERE entities.id = entity_analytics.entity_id AND entities.user_id = auth.uid()));
CREATE POLICY "Users can update analytics" ON public.entity_analytics FOR UPDATE USING (EXISTS (SELECT 1 FROM public.entities WHERE entities.id = entity_analytics.entity_id AND entities.user_id = auth.uid()));

-- Create indexes for better performance
CREATE INDEX idx_entities_user_id ON public.entities(user_id);
CREATE INDEX idx_entities_type ON public.entities(entity_type);
CREATE INDEX idx_entity_synonyms_entity_id ON public.entity_synonyms(entity_id);
CREATE INDEX idx_entity_relationships_parent ON public.entity_relationships(parent_entity_id);
CREATE INDEX idx_entity_relationships_child ON public.entity_relationships(child_entity_id);
CREATE INDEX idx_conversation_logs_user_id ON public.conversation_logs(user_id);
CREATE INDEX idx_entity_analytics_entity_id ON public.entity_analytics(entity_id);
CREATE INDEX idx_entity_analytics_date ON public.entity_analytics(date_tracked);

-- Insert some default system entities
INSERT INTO public.entities (name, display_name, entity_type, description, category, language) VALUES
('sys.date-time', 'Date and Time', 'system', 'Recognizes dates, times, and date-time expressions', 'temporal', 'en'),
('sys.location', 'Location', 'system', 'Recognizes geographical locations, addresses, and place names', 'geography', 'en'),
('sys.person', 'Person', 'system', 'Recognizes person names and titles', 'people', 'en'),
('sys.number', 'Number', 'system', 'Recognizes numerical values and quantities', 'numeric', 'en'),
('sys.email', 'Email', 'system', 'Recognizes email addresses', 'contact', 'en'),
('sys.phone-number', 'Phone Number', 'system', 'Recognizes phone numbers', 'contact', 'en'),
('sys.url', 'URL', 'system', 'Recognizes web URLs and links', 'web', 'en'),
('sys.currency', 'Currency', 'system', 'Recognizes monetary amounts and currency', 'financial', 'en');
