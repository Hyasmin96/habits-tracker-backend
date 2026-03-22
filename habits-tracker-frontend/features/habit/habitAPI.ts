export const fetchHabits = async () => {
  const token = localStorage.getItem("token"); // obtenemos el token
  if (!token) throw new Error("No se encontró token de usuario");

  const response = await fetch("http://localhost:3001/habits", {
    headers: {
      "Authorization": `Bearer ${token}`, // enviamos token al backend
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to fetch habits");
  }

  return response.json();
};

// NUEVA FUNCIÓN PARA MARCAR DONE
export const markHabitDone = async (id: string) => {

  const response = await fetch(
    `http://localhost:3001/habits/markasdone/${id}`,
    {
      method: "PATCH",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update habit");
  }

  return response.json();
};