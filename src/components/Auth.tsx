import { createContext, useCallback, useEffect, useState } from "react";
import { User } from "../types";
import axios from "axios";

type AuthInfo = {
  isLoggedIn: boolean;
  setLoginStatus: (status: boolean, user: User | null) => void;
  user: User | null;
};

type PropType = {
  children: any;
};

export const AuthContext = createContext<AuthInfo>({
  isLoggedIn: false,
  setLoginStatus: () => {},
  user: null,
});

export const Auth = (props: PropType) => {
  const { children } = props;

  const initialLoginState = localStorage.getItem("isLoggedIn") === "true";

  const initialAuthUserStateStr = localStorage.getItem("authUser");

  const initialAuthUserState =
    initialAuthUserStateStr && initialAuthUserStateStr !== "null"
      ? JSON.parse(initialAuthUserStateStr)
      : null;

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(initialLoginState);
  const [authUser, setAuthUser] = useState<User | null>(initialAuthUserState);

  /**
   * Set user and user's login status to local storage and state
   * @description
   *  - Sets login status to local storage and state
   *  - Sets user to local storage and state
   * @param {boolean} status Flag to determine if the user is logged in
   * @param {User} user Information of currently logged user
   */
  const setLoginStatus = useCallback((status: boolean, user: User | null) => {
    setIsLoggedIn(status);
    setAuthUser(user);
    localStorage.setItem("isLoggedIn", status.toString());
    localStorage.setItem("authUser", JSON.stringify(user));
  }, []);

  /**
   * Effect to fetch currently logged in user from server
   * @description
   *  - Fetches currently logged in user from server
   *  - Saves login status and auth user information
   *  - If error occurs
   *    - Erase saved auth user information
   */
  useEffect(() => {
    const fethInitialAuthUserFromDb = async () => {
      try {
        let response = await axios.get("/auth/who-am-i");
        let { data } = response;
        let { user } = data;
        setLoginStatus(true, user);
      } catch (error: any) {
        setLoginStatus(false, null);
      }
    };

    fethInitialAuthUserFromDb();
  }, [setLoginStatus]);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, setLoginStatus, user: authUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
