"use client";

import { useState } from "react";

type AddHabitFormProps = {
  token: string; // token del usuario para enviar al backend
  onHabitAdded: () => void; // función para actualizar la lista de hábitos después de agregar uno
};

export default function AddHabitForm({ token, onHabitAdded }: AddHabitFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleAddHabit = async () => {
    if (!title || !description) {
      alert("Por favor completa ambos campos");
      return;
    }

    try {
      const res = await fetch("http://localhost:3001/habits", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // enviamos token para autorización
        },
        body: JSON.stringify({ title, description }),
      });

      const data = await res.json();
      console.log("Respuesta agregar hábito:", data);

      if (res.ok) {
        alert("Hábito agregado!");
        setTitle("");
        setDescription("");
        onHabitAdded(); // recarga lista de hábitos
      } else {
        alert(data.message || "Error al agregar hábito");
      }
    } catch (err: any) {
      console.error("Error al agregar hábito:", err);
      alert("Error de conexión al servidor");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Habits</h2>

      <label style={styles.label}>Add New Habit</label>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={styles.input}
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ ...styles.input, height: "60px" }}
      />

      <button onClick={handleAddHabit} style={styles.button}>
        Add
      </button>
    </div>
  );
}


const styles = {
  container: {
    maxWidth: "400px",
    margin: "20px 0",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    backgroundColor: "#f0f0f0",
  },
  label: {
    fontWeight: "bold",
    display: "block",
    marginBottom: "10px",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#0070f3",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};