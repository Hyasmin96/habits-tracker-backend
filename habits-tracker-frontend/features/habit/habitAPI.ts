export const fetchHabits = async () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No se encontró token de usuario");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/habits`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to fetch habits");
  }

  return response.json();
};

// NUEVA FUNCIÓN PARA MARCAR DONE
export const markHabitDone = async (id: string) => {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/habits/markasdone/${id}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`, // 👈 IMPORTANTE (te faltaba)
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update habit");
  }

  return response.json();
};