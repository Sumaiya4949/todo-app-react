import { User } from "../types";

export const saveAuthDataToLocalStorage = (
  status: boolean,
  user: User | null
) => {
  localStorage.setItem("isLoggedIn", status.toString());
  localStorage.setItem("authUser", JSON.stringify(user));
};
