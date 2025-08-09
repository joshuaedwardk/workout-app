"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import AddWorkout from "@/components/AddWorkout";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [workouts, setWorkouts] = useState<any[]>([]);

  // ✅ Fetch user
  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });
  }, []);

  // ✅ Fetch workouts from Supabase
  useEffect(() => {
    async function fetchWorkouts() {
      const { data, error } = await supabase
        .from("workouts")
        .select("*")
        .order("dateadded", { ascending: false }); // use dateadded instead of created_at

      if (error) {
        console.error("Error fetching workouts:", error.message);
      } else {
        setWorkouts(data || []);
      }
    }

    fetchWorkouts();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl text-violet-700 font-bold">Welcome to Your Dashboard</h1>
      {user ? (
        <>
          <p className="mt-2">Logged in as {user.email}</p>

          {/* Workout input form */}
          <AddWorkout />

          {/* ✅ Workout list */}
          <div className="p-4 max-w-md mx-auto">
            <h2 className="text-xl font-semibold mb-2">All Workouts</h2>
            {workouts.length > 0 ? (
              <ul className="space-y-2">
                {workouts.map((w) => (
                  <li
                    key={w.id}
                    className="border p-2 rounded shadow-sm bg-white"
                  >
                    <strong>{w.workoutname}</strong> — {w.workoutcategory}
                    {w.bodycategory1 && ` | ${w.bodycategory1}`}
                    {w.bodycategory2 && `, ${w.bodycategory2}`}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No workouts found.</p>
            )}
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
