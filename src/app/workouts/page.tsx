"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Workout = {
  id: string;
  workoutname: string;
  workoutcategory: string;
  bodycategory1: string;
  bodycategory2: string;
  dateadded: string;
};

export default function WorkoutsPage() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWorkouts();
  }, []);

  async function fetchWorkouts() {
    setLoading(true);

    const { data, error } = await supabase
      .from("workouts")
      .select("id, workoutname, workoutcategory, bodycategory1, bodycategory2, dateadded")
      .order("workoutcategory", { ascending: true })
      .order("dateadded", { ascending: false })

    if (error) {
      console.error("Error fetching workouts:", error.message);
    } else {
      setWorkouts(data || []);
    }

    setLoading(false);
  }

  // Group workouts by workoutcategory
  const groupedWorkouts = workouts.reduce((groups: Record<string, Workout[]>, workout) => {
    if (!groups[workout.workoutcategory]) {
      groups[workout.workoutcategory] = [];
    }
    groups[workout.workoutcategory].push(workout);
    return groups;
  }, {});

  if (loading) {
    return <p className="p-4">Loading workouts...</p>;
  }

  if (workouts.length === 0) {
    return <p className="p-4">No workouts found. Add some first!</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Workouts</h1>

      {Object.entries(groupedWorkouts).map(([category, items]) => (
        <div key={category} className="mb-6">
          <h2 className="text-xl font-semibold mb-2">{category}</h2>
          <ul className="space-y-2">
            {items.map((workout) => (
              <li
                key={workout.id}
                className="p-3 bg-white shadow rounded"
              >
                <div className="font-medium">{workout.workoutname}</div>
                <div className="text-sm text-gray-600">
                  Body Category 1: {workout.bodycategory1 || "—"}
                </div>
                <div className="text-sm text-gray-600">
                  Body Category 2: {workout.bodycategory2 || "—"}
                </div>
                <small className="text-gray-500">
                  Added: {new Date(workout.dateadded).toLocaleDateString()}
                </small>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
