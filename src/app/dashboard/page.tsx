"use client"; // 👈 This tells Next.js to render this component on the client-side (required for hooks and supabase JS)

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import AddWorkout from "@/components/AddWorkout"; // ✅ Make sure this file exists

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Welcome to Your Dashboard</h1>
      {user ? (
        <>
          <p className="mt-2">Logged in as {user.email}</p>

          {/* ✅ This renders the workout input form */}
          <AddWorkout />

          {/* You can eventually list workouts here too */}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
