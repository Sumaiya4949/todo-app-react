import { makeVar } from "@apollo/client";
import { AuthUser, TodoType } from "../types";

const initialAuthUserStr = localStorage.getItem("authUser");
const initialAuthUser =
  initialAuthUserStr && initialAuthUserStr !== "null"
    ? JSON.parse(initialAuthUserStr)
    : null;

// Reactive variable to save auth state
export const authUserVar = makeVar<AuthUser>({
  isLoggedIn: localStorage.getItem("isLoggedIn") === "true",
  user: initialAuthUser,
});

export const myTodosVar = makeVar<TodoType[]>([]);
