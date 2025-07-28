-- Add preferred_cities column to profiles table if it doesn't exist
DO $$ 
BEGIN 
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'profiles' 
        AND column_name = 'preferred_cities'
        AND table_schema = 'public'
    ) THEN
        ALTER TABLE public.profiles ADD COLUMN preferred_cities TEXT[];
    END IF;
END $$;