"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface Workout {
  id: number;
  workoutname: string;
  workoutcategory: string;
  bodycategory1: string;
  bodycategory2: string;
  dateadded: string;
}

export default function WorkoutList() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const fetchWorkouts = async () => {
    try {
      let { data, error } = await supabase
        .from("workouts")
        .select("*")
        .order("dateadded", { ascending: false }); // newest first

      if (error) throw error;
      setWorkouts(data || []);
    } catch (error) {
      console.error("Error fetching workouts:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="text-gray-500">Loading workouts...</p>;

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">All Workouts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {workouts.map((workout) => (
          <div
            key={workout.id}
            className="border rounded-lg p-4 shadow-sm hover:shadow-md transition"
          >
            <h3 className="font-bold text-lg">{workout.workoutname}</h3>
            <p className="text-sm text-gray-600">
              {workout.workoutcategory} — {workout.bodycategory1}
              {workout.bodycategory2 && `, ${workout.bodycategory2}`}
            </p>
            <p className="text-xs text-gray-400">
              Added: {new Date(workout.dateadded).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
