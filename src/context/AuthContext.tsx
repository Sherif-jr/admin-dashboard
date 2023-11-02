import { createContext, useState, useEffect } from "react";
import { User } from "../interfaces/User.interface";

interface authObject {
  isLoading: boolean;
  user: User | undefined;
  login: (user: User) => void;
  logOut: () => void;
}

export const AuthContext = createContext<authObject>({
  isLoading: false,
  user: undefined,
  login: undefined,
  logOut: undefined,
});
const AuthContextProvider = (props: React.PropsWithChildren) => {
  const [isLoading, setloading] = useState<boolean>(true);
  const [user, setUser] = useState<User>();

  function login(user: User): void {
    setloading(true);
    localStorage.setItem("test-loggedIn", JSON.stringify(user));
    setUser({
      _id: user._id,
      email: user.email,
      role: "Website Admin",
      name: "Abdelrhman Sherif",
    });

    setloading(false);
  }
  function logOut() {
    setloading(true);
    setUser(undefined);
    localStorage.removeItem("test-loggedIn");
    setloading(false);
  }

  useEffect(() => {
    setloading(true);
    const existingUser: string = localStorage.getItem("test-loggedIn");
    if (existingUser) {
      const parsedUser: User = JSON.parse(existingUser);
      setUser({
        _id: parsedUser._id,
        email: parsedUser.email,
        role: "Website Admin",
        name: "Abdelrhman Sherif",
      });
    }
    setloading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ isLoading, user, login, logOut }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
