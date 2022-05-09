import { createContext, useEffect, useState } from "react";
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

  const setLoginStatus = (status: boolean, user: User | null) => {
    setIsLoggedIn(status);
    setAuthUser(user);
    localStorage.setItem("isLoggedIn", status.toString());
    localStorage.setItem("authUser", JSON.stringify(user));
  };

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
  }, []);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, setLoginStatus, user: authUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
