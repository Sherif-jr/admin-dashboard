import { createContext, useState } from "react";
import { User } from "../interfaces/User.interface";

interface authObject {
  isLoading: boolean;
  user: User | undefined;
  // eslint-disable-next-line @typescript-eslint/ban-types
  login: Function | undefined;
}

export const AuthContext = createContext<authObject>({
  isLoading: false,
  user: undefined,
  login: undefined,
});
const AuthContextProvider = (props: React.PropsWithChildren) => {
  const [isLoading, setloading] = useState<boolean>(false);
  const [user, setUser] = useState<User>();
  async function login() {
    setloading(false);
    setUser({ _id: "sadas", email: "sadas@gmail.com" });
  }
  return (
    <AuthContext.Provider value={{ isLoading, user, login }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
