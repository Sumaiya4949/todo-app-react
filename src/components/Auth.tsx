import { createContext, useState } from "react";

type AuthInfo = {
  isLoggedIn: boolean;
  setLoginStatus: (status: boolean) => void;
};

type PropType = {
  children: any;
};

export const AuthContext = createContext<AuthInfo>({
  isLoggedIn: false,
  setLoginStatus: () => {},
});

export const Auth = (props: PropType) => {
  const { children } = props;

  const initialLoginState = localStorage.getItem("isLoggedIn") === "true";

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(initialLoginState);

  const setLoginStatus = (status: boolean) => {
    setIsLoggedIn(status);
    localStorage.setItem("isLoggedIn", status.toString());
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, setLoginStatus }}>
      {children}
    </AuthContext.Provider>
  );
};
