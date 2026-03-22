import { configureStore } from "@reduxjs/toolkit";
import habitReducer from "../features/habit/habitSlice";
import userReducer from "../features/user/userSlice"

export const makeStore = () => {
  return configureStore({
    reducer: {
      habit: habitReducer,
      user: userReducer

    }
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore["dispatch"];
export type AppState = ReturnType<AppStore["getState"]>;