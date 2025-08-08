// src/lib/fetchWorkouts.ts
import { supabase } from '@/lib/supabase';

export async function fetchWorkouts() {
  const { data, error } = await supabase
    .from('workouts')                  // Table name
    .select('*')                       // Select all columns
    .order('dateadded', { ascending: false }); // Sort newest first

  if (error) {
    console.error("Error fetching workouts:", error.message);
    return [];
  }

  return data;
}