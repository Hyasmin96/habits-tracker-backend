"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../Redux/store";
import { fetchHabitsThunk } from "../features/habit/habitSlice";
import HabitList from "../components/HabitList";
import ProgressBar from "../components/ProgressBar";

export default function Home() {

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchHabitsThunk());
  }, [dispatch]);

  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold mb-6">Habits</h1>

      <HabitList />
    </main>
  );
}