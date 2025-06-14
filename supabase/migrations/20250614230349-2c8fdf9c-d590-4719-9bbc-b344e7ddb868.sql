
-- Create a table to store generated intents
CREATE TABLE public.intents (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users,
  display_name TEXT NOT NULL,
  description TEXT,
  domain TEXT,
  language TEXT DEFAULT 'en',
  phrase_count INTEGER DEFAULT 10,
  tone TEXT,
  complexity TEXT,
  include_entities BOOLEAN DEFAULT true,
  include_variations BOOLEAN DEFAULT true,
  include_negatives BOOLEAN DEFAULT false,
  entity_types TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create a table to store training phrases
CREATE TABLE public.training_phrases (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  intent_id UUID REFERENCES public.intents(id) ON DELETE CASCADE NOT NULL,
  text TEXT NOT NULL,
  confidence DECIMAL(3,2),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create a table to store entities within training phrases
CREATE TABLE public.phrase_entities (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  phrase_id UUID REFERENCES public.training_phrases(id) ON DELETE CASCADE NOT NULL,
  entity_type TEXT NOT NULL,
  value TEXT NOT NULL,
  start_index INTEGER NOT NULL,
  end_index INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security (RLS)
ALTER TABLE public.intents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.training_phrases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.phrase_entities ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for intents table
CREATE POLICY "Users can view their own intents" 
  ON public.intents 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own intents" 
  ON public.intents 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own intents" 
  ON public.intents 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own intents" 
  ON public.intents 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Create RLS policies for training_phrases table
CREATE POLICY "Users can view training phrases of their intents" 
  ON public.training_phrases 
  FOR SELECT 
  USING (EXISTS (
    SELECT 1 FROM public.intents 
    WHERE intents.id = training_phrases.intent_id 
    AND intents.user_id = auth.uid()
  ));

CREATE POLICY "Users can create training phrases for their intents" 
  ON public.training_phrases 
  FOR INSERT 
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.intents 
    WHERE intents.id = training_phrases.intent_id 
    AND intents.user_id = auth.uid()
  ));

CREATE POLICY "Users can update training phrases of their intents" 
  ON public.training_phrases 
  FOR UPDATE 
  USING (EXISTS (
    SELECT 1 FROM public.intents 
    WHERE intents.id = training_phrases.intent_id 
    AND intents.user_id = auth.uid()
  ));

CREATE POLICY "Users can delete training phrases of their intents" 
  ON public.training_phrases 
  FOR DELETE 
  USING (EXISTS (
    SELECT 1 FROM public.intents 
    WHERE intents.id = training_phrases.intent_id 
    AND intents.user_id = auth.uid()
  ));

-- Create RLS policies for phrase_entities table
CREATE POLICY "Users can view entities of their training phrases" 
  ON public.phrase_entities 
  FOR SELECT 
  USING (EXISTS (
    SELECT 1 FROM public.training_phrases tp
    JOIN public.intents i ON i.id = tp.intent_id
    WHERE tp.id = phrase_entities.phrase_id 
    AND i.user_id = auth.uid()
  ));

CREATE POLICY "Users can create entities for their training phrases" 
  ON public.phrase_entities 
  FOR INSERT 
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.training_phrases tp
    JOIN public.intents i ON i.id = tp.intent_id
    WHERE tp.id = phrase_entities.phrase_id 
    AND i.user_id = auth.uid()
  ));

CREATE POLICY "Users can update entities of their training phrases" 
  ON public.phrase_entities 
  FOR UPDATE 
  USING (EXISTS (
    SELECT 1 FROM public.training_phrases tp
    JOIN public.intents i ON i.id = tp.intent_id
    WHERE tp.id = phrase_entities.phrase_id 
    AND i.user_id = auth.uid()
  ));

CREATE POLICY "Users can delete entities of their training phrases" 
  ON public.phrase_entities 
  FOR DELETE 
  USING (EXISTS (
    SELECT 1 FROM public.training_phrases tp
    JOIN public.intents i ON i.id = tp.intent_id
    WHERE tp.id = phrase_entities.phrase_id 
    AND i.user_id = auth.uid()
  ));

-- Create indexes for better performance
CREATE INDEX idx_intents_user_id ON public.intents(user_id);
CREATE INDEX idx_training_phrases_intent_id ON public.training_phrases(intent_id);
CREATE INDEX idx_phrase_entities_phrase_id ON public.phrase_entities(phrase_id);
