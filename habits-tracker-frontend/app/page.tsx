"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../Redux/store";
import { fetchHabitsThunk } from "../features/habit/habitSlice";
import HabitList from "../components/HabitList";
import ProgressBar from "../components/ProgressBar";
import LoginForm from "../components/LoginForm";
import AddHabitForm from "../components/AddHabitForm";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const [token, setToken] = useState<string | null>(null);

  // Cargar token desde localStorage al iniciar
  useEffect(() => {
    if (typeof window !== "undefined") {
      const t = localStorage.getItem("token");
      setToken(t);

      if (t) {
        dispatch(fetchHabitsThunk());
      }
    }
  }, [dispatch, token]);

  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold mb-6">Habits App</h1>

      {!token ? (
        // Mostrar formulario de login si no hay token
        <LoginForm onLogin={() => setToken(localStorage.getItem("token"))} />
      ) : (
        <>
          {/* lista de hábitos */}
          <HabitList />

          {/* Formulario para agregar nuevo hábito */}
          <AddHabitForm
            token={token}
            onHabitAdded={() => dispatch(fetchHabitsThunk())} // refresca lista después de agregar
          />
        </>
      )}
    </main>
  );
}