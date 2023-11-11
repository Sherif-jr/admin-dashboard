import { createContext, useState, useEffect, useMemo } from "react";
import { Admin } from "../interfaces/Admin.interface";
import { useCookies } from "react-cookie";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import axiosInstance from "../util/query/axiosInstance";

interface authObject {
  isLoading: boolean;
  token: string;
  user: Admin | undefined;
  login: (values: {
    email: string;
    password: string;
  }) => Promise<{ message: string; success: boolean }>;
  logOut: () => void;
}

export const AuthContext = createContext<authObject>({
  isLoading: false,
  token: undefined,
  user: undefined,
  login: undefined,
  logOut: undefined,
});
const AuthContextProvider = (props: React.PropsWithChildren) => {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [token, setToken] = useState<string>(cookies.token);
  const [isLoading, setLoading] = useState<boolean>(false);

  const user = useMemo(() => {
    if (token) {
      const decodedUser: Admin = jwtDecode(token);
      console.log(decodedUser);

      return decodedUser;
    } else {
      console.log("now no user");
      return undefined;
    }
  }, [token]);

  const login = async (values: {
    email: string;
    password: string;
  }): Promise<{
    message: string;
    success: boolean;
  }> => {
    setLoading(true);
    try {
      // this is a POST request to the /admin/login endpoint with the email and password object.
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/admin/login`,
        values
      );

      // Get the token from the response data & save it to the cookies and the state
      const token = data.token;
      setCookie("token", token, {
        path: "/",
        maxAge: 86400, // Expires after 1 day (in milliseconds)
        sameSite: true,
      });
      setLoading(false);
      return { message: "Logged in successfully!", success: true };
    } catch (error) {
      console.error(error);
      setLoading(false);
      return { message: error.message, success: false };
    }
  };

  const logOut = async () => {
    // Remove the token from the cookies and the state
    removeCookie("token", { path: "/" });
  };
  useEffect(() => {
    //keep sync between cookies and state, ensuring that scheduling upddates not reflecting the current auth state
    setToken(cookies.token);
  }, [cookies.token]);
  useEffect(() => {
    axiosInstance.defaults.headers.common["Authorization"] = token ? token : "";
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, isLoading, user, login, logOut }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
