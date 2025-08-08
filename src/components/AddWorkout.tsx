'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function AddWorkout() {
  const [workoutname, setName] = useState('');
  const [workoutcategory, setCategory] = useState('');
  const [bodycategory1, setBodycategory1] = useState('');
  const [bodycategory2, setBodycategory2] = useState('');
  const [message, setMessage] = useState('');

  const handleAdd = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { error } = await supabase.from('workouts').insert([
      {
        user_id: user?.id,
        workoutname,
        workoutcategory,
        bodycategory1,
        bodycategory2,
      },
    ]);

    if (error) setMessage('Error: ' + error.message);
    else setMessage('Workout added!');
  };

  return (
    <div className="mt-6">
      <input
        className="border p-2 mr-2"
        placeholder="Workout Name"
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="border p-2 mr-2"
        placeholder="Category"
        onChange={(e) => setCategory(e.target.value)}
      />
      <input
        className="border p-2 mr-2"
        placeholder='Body Category #1'
        onChange={(e) => setBodycategory1(e.target.value)}
        />
         <input
        className="border p-2 mr-2"
        placeholder='Body Category #2'
        onChange={(e) => setBodycategory2(e.target.value)}
        />
      <button onClick={handleAdd} className="bg-green-600 text-white px-3 py-2">
        Add Workout
      </button>
      {message && <p className="mt-2 text-sm">{message}</p>}
    </div>
  );
}
