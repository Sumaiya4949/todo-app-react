import { createContext, useCallback, useEffect, useState } from "react";
import { User } from "../types";
import axios from "axios";
import { API_VERSION } from "../utils/constants";
import { authUserVar } from "../utils/cache";

type AuthInfo = {
  setLoginStatus: (status: boolean, user: User | null) => void;
};

type PropType = {
  children: any;
};

export const AuthContext = createContext<AuthInfo>({
  setLoginStatus: () => {},
});

/**
 * React component to provide authentication context to the child component subtree
 * @param {PropType} props Props of the component
 * @returns {JSX} JSX of the auth component
 */
export const Auth = (props: PropType) => {
  const { children } = props;

  /**
   * Set user and user's login status to local storage and state
   * @description
   *  - Sets login status to local storage and state
   *  - Sets user to local storage and state
   * @param {boolean} status Flag to determine if the user is logged in
   * @param {User} user Information of currently logged user
   */
  const setLoginStatus = useCallback((status: boolean, user: User | null) => {
    localStorage.setItem("isLoggedIn", status.toString());
    localStorage.setItem("authUser", JSON.stringify(user));

    authUserVar({
      isLoggedIn: status,
      user: user,
    });
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
        let response = await axios.get(`/auth/v${API_VERSION}/who-am-i`);
        let { data } = response;
        let { user } = data;
        setLoginStatus(true, user);
      } catch (error: any) {
        setLoginStatus(false, null);
      }
    };

    fethInitialAuthUserFromDb();
  }, [setLoginStatus]);

  //JSX
  return (
    <AuthContext.Provider value={{ setLoginStatus }}>
      {children}
    </AuthContext.Provider>
  );
};
