import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Tipo de un hábito
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
  status: "idle" | "loading" | "success" | "failed";
  error: string | null;
};

const initialState: HabitState = {
  habits: [],
  status: "idle",
  error: null,
};

// Thunk para obtener hábitos del usuario con token
export const fetchHabitsThunk = createAsyncThunk<
  Habit[], 
  void,
  { rejectValue: string }
>("habit/fetchHabits", async (_, { rejectWithValue }) => {
  try {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;

    if (!token) throw new Error("No token found");

    const response = await fetch(
  `${process.env.NEXT_PUBLIC_API_URL}/habits`,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

    if (!response.ok) {
      const err = await response.json();
      return rejectWithValue(err.message || "Error fetching habits");
    }

    const data = await response.json();
    console.log("HABITS RESPONSE:", data);
    return data;
  } catch (error: any) {
    console.error("FETCH HABITS ERROR:", error);
    return rejectWithValue(error.message || "Unknown error");
  }
});

// Thunk para marcar hábito como hecho
export const markHabitDoneThunk = createAsyncThunk<
  { habit: Habit; action: string },
  string, 
  { rejectValue: string }
>("habit/markHabitDone", async (id, { rejectWithValue }) => {
  try {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;

    if (!token) throw new Error("No token found");

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/habits/markasdone/${id}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const err = await response.json();
      return rejectWithValue(err.message || "Error marking habit");
    }

    return await response.json();
  } catch (error: any) {
    console.error("MARK HABIT DONE ERROR:", error);
    return rejectWithValue(error.message || "Unknown error");
  }
});


const habitSlice = createSlice({
  name: "habit",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // FETCH HABITS
    builder
      .addCase(fetchHabitsThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchHabitsThunk.fulfilled, (state, action) => {
        state.status = "success";
        state.habits = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchHabitsThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch habits";
        state.habits = [];
      });

    // MARK HABIT DONE
    builder
      .addCase(markHabitDoneThunk.fulfilled, (state, action) => {
        const { habit, action: result } = action.payload;
        const index = state.habits.findIndex((h) => h._id === habit._id);
        if (index !== -1) {
          state.habits[index] = { ...habit, lastAction: result };
        }
      })
      .addCase(markHabitDoneThunk.rejected, (state, action) => {
        state.error = action.payload || "Failed to mark habit as done";
      });
  },
});

export default habitSlice.reducer;