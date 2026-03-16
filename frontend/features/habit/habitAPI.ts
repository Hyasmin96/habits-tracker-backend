export const fetchHabits = async () => {
  const response = await fetch("http://localhost:3001/habits");

  if (!response.ok) {
    throw new Error("Failed to fetch habits");
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