-- Phase 1: Authentication System Overhaul
-- First, create a profiles table for additional user data
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  name TEXT NOT NULL,
  email_updates BOOLEAN DEFAULT false,
  business_type TEXT,
  target_area TEXT,
  current_leads INTEGER,
  target_leads INTEGER,
  business_description TEXT,
  specific_requests TEXT,
  telegram_id TEXT,
  filter_request TEXT,
  profession TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for user access to their own profile
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Create function to update timestamps (if not exists)
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
NEW.updated_at = now();
RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
DROP TRIGGER IF EXISTS update_profiles_updated_at ON public.profiles;
CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create trigger to automatically create profile when user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, name, email_updates)
  VALUES (
    NEW.id, 
    COALESCE(NEW.raw_user_meta_data->>'name', ''),
    COALESCE((NEW.raw_user_meta_data->>'email_updates')::boolean, false)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Phase 2: Fix RLS policies on existing tables
-- Enable RLS on tables that don't have it
ALTER TABLE public.real_estate_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.real_estate_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.classified_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."Groups" ENABLE ROW LEVEL SECURITY;

-- Create restrictive policies for real estate groups (read-only for authenticated users)
CREATE POLICY "Authenticated users can view real estate groups" 
ON public.real_estate_groups 
FOR SELECT 
TO authenticated 
USING (true);

-- Create restrictive policies for real estate posts (read-only for authenticated users)
CREATE POLICY "Authenticated users can view real estate posts" 
ON public.real_estate_posts 
FOR SELECT 
TO authenticated 
USING (true);

-- Create restrictive policies for classified posts (read-only for authenticated users)
CREATE POLICY "Authenticated users can view classified posts" 
ON public.classified_posts 
FOR SELECT 
TO authenticated 
USING (true);

-- Create restrictive policies for Groups (read-only for authenticated users)
CREATE POLICY "Authenticated users can view groups" 
ON public."Groups" 
FOR SELECT 
TO authenticated 
USING (true);

-- Update existing overly permissive policies
-- Drop the public read policy for Clients table
DROP POLICY IF EXISTS "Allow public read for login" ON public."Clients";

-- Create secure policy for Clients table
CREATE POLICY "Authenticated users can view their own client data" 
ON public."Clients" 
FOR SELECT 
TO authenticated 
USING (email = (SELECT email FROM auth.users WHERE id = auth.uid()));

-- Update Client_post_match policies to require authentication
DROP POLICY IF EXISTS "Allow public read for login" ON public."Client_post_match";
DROP POLICY IF EXISTS "Allow public update for click tracking" ON public."Client_post_match";

CREATE POLICY "Authenticated users can view their own matches" 
ON public."Client_post_match" 
FOR SELECT 
TO authenticated 
USING (client_id = (SELECT id FROM public."Clients" WHERE email = (SELECT email FROM auth.users WHERE id = auth.uid())));

CREATE POLICY "Authenticated users can update their own matches" 
ON public."Client_post_match" 
FOR UPDATE 
TO authenticated 
USING (client_id = (SELECT id FROM public."Clients" WHERE email = (SELECT email FROM auth.users WHERE id = auth.uid())));

-- Update Group_Posts policy
DROP POLICY IF EXISTS "Allow public read for login" ON public."Group_Posts";

CREATE POLICY "Authenticated users can view group posts" 
ON public."Group_Posts" 
FOR SELECT 
TO authenticated 
USING (true);