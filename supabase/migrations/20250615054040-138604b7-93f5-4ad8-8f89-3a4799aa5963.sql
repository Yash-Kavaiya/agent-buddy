
-- Add only the missing foreign key constraints (skip existing ones)
DO $$ 
BEGIN
    -- Check and add conversation_logs user_id foreign key if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'conversation_logs_user_id_fkey'
    ) THEN
        ALTER TABLE conversation_logs ADD CONSTRAINT conversation_logs_user_id_fkey 
          FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;
    END IF;

    -- Check and add entities user_id foreign key if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'entities_user_id_fkey'
    ) THEN
        ALTER TABLE entities ADD CONSTRAINT entities_user_id_fkey 
          FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;
    END IF;

    -- Check and add entity_analytics entity_id foreign key if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'entity_analytics_entity_id_fkey'
    ) THEN
        ALTER TABLE entity_analytics ADD CONSTRAINT entity_analytics_entity_id_fkey 
          FOREIGN KEY (entity_id) REFERENCES entities(id) ON DELETE CASCADE;
    END IF;

    -- Check and add entity_relationships parent_entity_id foreign key if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'entity_relationships_parent_entity_id_fkey'
    ) THEN
        ALTER TABLE entity_relationships ADD CONSTRAINT entity_relationships_parent_entity_id_fkey 
          FOREIGN KEY (parent_entity_id) REFERENCES entities(id) ON DELETE CASCADE;
    END IF;

    -- Check and add entity_relationships child_entity_id foreign key if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'entity_relationships_child_entity_id_fkey'
    ) THEN
        ALTER TABLE entity_relationships ADD CONSTRAINT entity_relationships_child_entity_id_fkey 
          FOREIGN KEY (child_entity_id) REFERENCES entities(id) ON DELETE CASCADE;
    END IF;

    -- Check and add entity_synonyms entity_id foreign key if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'entity_synonyms_entity_id_fkey'
    ) THEN
        ALTER TABLE entity_synonyms ADD CONSTRAINT entity_synonyms_entity_id_fkey 
          FOREIGN KEY (entity_id) REFERENCES entities(id) ON DELETE CASCADE;
    END IF;

    -- Check and add intents user_id foreign key if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'intents_user_id_fkey'
    ) THEN
        ALTER TABLE intents ADD CONSTRAINT intents_user_id_fkey 
          FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;
    END IF;

    -- Check and add training_phrases intent_id foreign key if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'training_phrases_intent_id_fkey'
    ) THEN
        ALTER TABLE training_phrases ADD CONSTRAINT training_phrases_intent_id_fkey 
          FOREIGN KEY (intent_id) REFERENCES intents(id) ON DELETE CASCADE;
    END IF;

    -- Check and add phrase_entities phrase_id foreign key if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'phrase_entities_phrase_id_fkey'
    ) THEN
        ALTER TABLE phrase_entities ADD CONSTRAINT phrase_entities_phrase_id_fkey 
          FOREIGN KEY (phrase_id) REFERENCES training_phrases(id) ON DELETE CASCADE;
    END IF;
END $$;

-- Create RLS policies that are missing (using DROP POLICY IF EXISTS to avoid conflicts)

-- Conversation logs policies
DROP POLICY IF EXISTS "Users can view their own conversation logs" ON conversation_logs;
CREATE POLICY "Users can view their own conversation logs" 
  ON conversation_logs FOR SELECT 
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can create their own conversation logs" ON conversation_logs;
CREATE POLICY "Users can create their own conversation logs" 
  ON conversation_logs FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own conversation logs" ON conversation_logs;
CREATE POLICY "Users can update their own conversation logs" 
  ON conversation_logs FOR UPDATE 
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own conversation logs" ON conversation_logs;
CREATE POLICY "Users can delete their own conversation logs" 
  ON conversation_logs FOR DELETE 
  USING (auth.uid() = user_id);

-- Entities policies
DROP POLICY IF EXISTS "Users can view entities" ON entities;
CREATE POLICY "Users can view entities" 
  ON entities FOR SELECT 
  USING (auth.uid() = user_id OR entity_type = 'system');

DROP POLICY IF EXISTS "Users can create their own entities" ON entities;
CREATE POLICY "Users can create their own entities" 
  ON entities FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own entities" ON entities;
CREATE POLICY "Users can update their own entities" 
  ON entities FOR UPDATE 
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own entities" ON entities;
CREATE POLICY "Users can delete their own entities" 
  ON entities FOR DELETE 
  USING (auth.uid() = user_id);

-- Entity analytics policies
DROP POLICY IF EXISTS "Users can view analytics for their entities" ON entity_analytics;
CREATE POLICY "Users can view analytics for their entities" 
  ON entity_analytics FOR SELECT 
  USING (EXISTS (
    SELECT 1 FROM entities 
    WHERE entities.id = entity_analytics.entity_id 
    AND (entities.user_id = auth.uid() OR entities.entity_type = 'system')
  ));

DROP POLICY IF EXISTS "Users can create analytics for their entities" ON entity_analytics;
CREATE POLICY "Users can create analytics for their entities" 
  ON entity_analytics FOR INSERT 
  WITH CHECK (EXISTS (
    SELECT 1 FROM entities 
    WHERE entities.id = entity_analytics.entity_id 
    AND entities.user_id = auth.uid()
  ));

DROP POLICY IF EXISTS "Users can update analytics for their entities" ON entity_analytics;
CREATE POLICY "Users can update analytics for their entities" 
  ON entity_analytics FOR UPDATE 
  USING (EXISTS (
    SELECT 1 FROM entities 
    WHERE entities.id = entity_analytics.entity_id 
    AND entities.user_id = auth.uid()
  ));

-- Entity relationships policies
DROP POLICY IF EXISTS "Users can view relationships for their entities" ON entity_relationships;
CREATE POLICY "Users can view relationships for their entities" 
  ON entity_relationships FOR SELECT 
  USING (EXISTS (
    SELECT 1 FROM entities 
    WHERE entities.id = entity_relationships.parent_entity_id 
    AND (entities.user_id = auth.uid() OR entities.entity_type = 'system')
  ));

DROP POLICY IF EXISTS "Users can create relationships for their entities" ON entity_relationships;
CREATE POLICY "Users can create relationships for their entities" 
  ON entity_relationships FOR INSERT 
  WITH CHECK (EXISTS (
    SELECT 1 FROM entities 
    WHERE entities.id = entity_relationships.parent_entity_id 
    AND entities.user_id = auth.uid()
  ));

DROP POLICY IF EXISTS "Users can update relationships for their entities" ON entity_relationships;
CREATE POLICY "Users can update relationships for their entities" 
  ON entity_relationships FOR UPDATE 
  USING (EXISTS (
    SELECT 1 FROM entities 
    WHERE entities.id = entity_relationships.parent_entity_id 
    AND entities.user_id = auth.uid()
  ));

DROP POLICY IF EXISTS "Users can delete relationships for their entities" ON entity_relationships;
CREATE POLICY "Users can delete relationships for their entities" 
  ON entity_relationships FOR DELETE 
  USING (EXISTS (
    SELECT 1 FROM entities 
    WHERE entities.id = entity_relationships.parent_entity_id 
    AND entities.user_id = auth.uid()
  ));

-- Entity synonyms policies
DROP POLICY IF EXISTS "Users can view synonyms for their entities" ON entity_synonyms;
CREATE POLICY "Users can view synonyms for their entities" 
  ON entity_synonyms FOR SELECT 
  USING (EXISTS (
    SELECT 1 FROM entities 
    WHERE entities.id = entity_synonyms.entity_id 
    AND (entities.user_id = auth.uid() OR entities.entity_type = 'system')
  ));

DROP POLICY IF EXISTS "Users can create synonyms for their entities" ON entity_synonyms;
CREATE POLICY "Users can create synonyms for their entities" 
  ON entity_synonyms FOR INSERT 
  WITH CHECK (EXISTS (
    SELECT 1 FROM entities 
    WHERE entities.id = entity_synonyms.entity_id 
    AND entities.user_id = auth.uid()
  ));

DROP POLICY IF EXISTS "Users can update synonyms for their entities" ON entity_synonyms;
CREATE POLICY "Users can update synonyms for their entities" 
  ON entity_synonyms FOR UPDATE 
  USING (EXISTS (
    SELECT 1 FROM entities 
    WHERE entities.id = entity_synonyms.entity_id 
    AND entities.user_id = auth.uid()
  ));

DROP POLICY IF EXISTS "Users can delete synonyms for their entities" ON entity_synonyms;
CREATE POLICY "Users can delete synonyms for their entities" 
  ON entity_synonyms FOR DELETE 
  USING (EXISTS (
    SELECT 1 FROM entities 
    WHERE entities.id = entity_synonyms.entity_id 
    AND entities.user_id = auth.uid()
  ));

-- Intents policies
DROP POLICY IF EXISTS "Users can view their own intents" ON intents;
CREATE POLICY "Users can view their own intents" 
  ON intents FOR SELECT 
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can create their own intents" ON intents;
CREATE POLICY "Users can create their own intents" 
  ON intents FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own intents" ON intents;
CREATE POLICY "Users can update their own intents" 
  ON intents FOR UPDATE 
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own intents" ON intents;
CREATE POLICY "Users can delete their own intents" 
  ON intents FOR DELETE 
  USING (auth.uid() = user_id);

-- Training phrases policies
DROP POLICY IF EXISTS "Users can view training phrases for their intents" ON training_phrases;
CREATE POLICY "Users can view training phrases for their intents" 
  ON training_phrases FOR SELECT 
  USING (EXISTS (
    SELECT 1 FROM intents 
    WHERE intents.id = training_phrases.intent_id 
    AND intents.user_id = auth.uid()
  ));

DROP POLICY IF EXISTS "Users can create training phrases for their intents" ON training_phrases;
CREATE POLICY "Users can create training phrases for their intents" 
  ON training_phrases FOR INSERT 
  WITH CHECK (EXISTS (
    SELECT 1 FROM intents 
    WHERE intents.id = training_phrases.intent_id 
    AND intents.user_id = auth.uid()
  ));

DROP POLICY IF EXISTS "Users can update training phrases for their intents" ON training_phrases;
CREATE POLICY "Users can update training phrases for their intents" 
  ON training_phrases FOR UPDATE 
  USING (EXISTS (
    SELECT 1 FROM intents 
    WHERE intents.id = training_phrases.intent_id 
    AND intents.user_id = auth.uid()
  ));

DROP POLICY IF EXISTS "Users can delete training phrases for their intents" ON training_phrases;
CREATE POLICY "Users can delete training phrases for their intents" 
  ON training_phrases FOR DELETE 
  USING (EXISTS (
    SELECT 1 FROM intents 
    WHERE intents.id = training_phrases.intent_id 
    AND intents.user_id = auth.uid()
  ));

-- Phrase entities policies
DROP POLICY IF EXISTS "Users can view phrase entities for their training phrases" ON phrase_entities;
CREATE POLICY "Users can view phrase entities for their training phrases" 
  ON phrase_entities FOR SELECT 
  USING (EXISTS (
    SELECT 1 FROM training_phrases tp
    JOIN intents i ON i.id = tp.intent_id
    WHERE tp.id = phrase_entities.phrase_id 
    AND i.user_id = auth.uid()
  ));

DROP POLICY IF EXISTS "Users can create phrase entities for their training phrases" ON phrase_entities;
CREATE POLICY "Users can create phrase entities for their training phrases" 
  ON phrase_entities FOR INSERT 
  WITH CHECK (EXISTS (
    SELECT 1 FROM training_phrases tp
    JOIN intents i ON i.id = tp.intent_id
    WHERE tp.id = phrase_entities.phrase_id 
    AND i.user_id = auth.uid()
  ));

DROP POLICY IF EXISTS "Users can update phrase entities for their training phrases" ON phrase_entities;
CREATE POLICY "Users can update phrase entities for their training phrases" 
  ON phrase_entities FOR UPDATE 
  USING (EXISTS (
    SELECT 1 FROM training_phrases tp
    JOIN intents i ON i.id = tp.intent_id
    WHERE tp.id = phrase_entities.phrase_id 
    AND i.user_id = auth.uid()
  ));

DROP POLICY IF EXISTS "Users can delete phrase entities for their training phrases" ON phrase_entities;
CREATE POLICY "Users can delete phrase entities for their training phrases" 
  ON phrase_entities FOR DELETE 
  USING (EXISTS (
    SELECT 1 FROM training_phrases tp
    JOIN intents i ON i.id = tp.intent_id
    WHERE tp.id = phrase_entities.phrase_id 
    AND i.user_id = auth.uid()
  ));
