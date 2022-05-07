import { createContext, useState } from "react";

type AuthInfo = {
  isLoggedIn: boolean;
};

type PropType = {
  children: any;
};

const AuthContext = createContext<AuthInfo>({
  isLoggedIn: false,
});

export const Auth = (props: PropType) => {
  const { children } = props;

  const [isLoggedIn, setLoggedIn] = useState<boolean>(false);

  return (
    <AuthContext.Provider value={{ isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};
