-- Fix security warnings by adding search_path to functions
-- Fix Function Search Path Mutable warnings

-- Update existing functions with secure search path
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
NEW.updated_at = now();
RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = '';

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
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = '';

-- Update the existing get_unmatched_group_posts function to fix search path
CREATE OR REPLACE FUNCTION public.get_unmatched_group_posts(client_id_input bigint)
RETURNS SETOF "Group_Posts"
LANGUAGE sql
SECURITY DEFINER
SET search_path = ''
AS $function$
  select gp.*
  from public."Group_Posts" gp
  where NOT EXISTS (
    select 1
    from public."Client_post_match" cpm
    where cpm.post_id = gp.id
      and cpm.client_id = client_id_input
  )
  order by gp.scanned_at desc;
$function$;