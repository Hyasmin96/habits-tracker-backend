"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, AppState } from "../Redux/store";
import { markHabitDoneThunk } from "../features/habit/habitSlice";

export default function HabitList() {
  const dispatch = useDispatch<AppDispatch>();
  const habits = useSelector((state: AppState) => state.habit.habits);

  
  useEffect(() => {
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("token")
        : null;

    console.log("TOKEN:", token);
  }, []);

  const handleDone = (id: string) => {
    dispatch(markHabitDoneThunk(id));
  };

  if (!Array.isArray(habits)) {
    return <p>No hay hábitos disponibles</p>;
  }

  return (
    <div className="space-y-6">
      {habits.map((habit) => {
        const progress = Math.min((habit.days / 66) * 100, 100);

        return (
          <div key={habit._id} className="p-4 border rounded-lg shadow-sm space-y-3">
            <h2 className="text-lg font-semibold">{habit.title}</h2>
            <p className="text-gray-600">{habit.description}</p>

            <p className="text-sm">
              {habit.days} / 66 days
            </p>

            <div className="w-full bg-gray-200 h-3 rounded">
              <div
                className="bg-green-500 h-3 rounded"
                style={{ width: `${progress}%` }}
              />
            </div>

            <button
              onClick={() => handleDone(habit._id)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Done
            </button>

            {habit.lastAction === "alreadyDone" && (
              <p className="text-yellow-600 text-sm">
                Already marked as done today
              </p>
            )}

            {habit.lastAction === "continued" && (
              <p className="text-green-600 text-sm">
                Well done! Another day completed
              </p>
            )}

            {habit.lastAction === "started" && (
              <p className="text-blue-600 text-sm">
                Habit started
              </p>
            )}

            {habit.lastAction === "restarted" && (
              <p className="text-red-600 text-sm">
                Habit restarted
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}