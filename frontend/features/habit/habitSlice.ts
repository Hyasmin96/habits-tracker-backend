import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export type Habit = {
  _id: string;
  title: string;
  description: string;
  createdAt: string;
  days: number;
  lastDone: string | null;
  lastAction?: string;
};

type HabitState = {
  habits: Habit[];
};

const initialState: HabitState = {
  habits: [],
};

// GET habits
export const fetchHabitsThunk = createAsyncThunk(
  "habit/fetchHabits",
  async () => {
    const response = await fetch("http://localhost:3001/habits");
    return await response.json();
  }
);

// PATCH mark as done
export const markHabitDoneThunk = createAsyncThunk(
  "habit/markHabitDone",
  async (id: string) => {
    const response = await fetch(
      `http://localhost:3001/habits/markasdone/${id}`,
      {
        method: "PATCH",
      }
    );

    return await response.json();
  }
);

const habitSlice = createSlice({
  name: "habit",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    // cargar hábitos
    builder.addCase(
      fetchHabitsThunk.fulfilled,
      (state, action: PayloadAction<Habit[]>) => {
        state.habits = action.payload;
      }
    );

    // marcar hábito como hecho
    builder.addCase(markHabitDoneThunk.fulfilled, (state, action) => {
      const { habit, action: result } = action.payload;

      const index = state.habits.findIndex(
        (h) => h._id === habit._id
      );

      if (index !== -1) {
        state.habits[index] = {
          ...habit,
          lastAction: result,
        };
      }
    });
  },
});

export default habitSlice.reducer;