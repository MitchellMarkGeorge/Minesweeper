import { jwtDecode } from "jwt-decode";
import {
  PropsWithChildren,
  createContext,
  useEffect,
  useState,
} from "react";
import auth from "../services/auth";
import { User } from "../services/auth/types";
import {
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
  USER_KEY,
} from "../utils/constants";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  signUp: (username: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  isLoading: true,
  login: () => Promise.resolve(),
  signOut: () => Promise.resolve(),
  signUp: () => Promise.resolve(),
});

type Props = PropsWithChildren;

export const AuthProvider = ({ children }: Props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuthentication = async () => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);

    if (accessToken) {
      const decodedToken = jwtDecode(accessToken);
      const { exp: tokenExpiration } = decodedToken;
      const nowInSeconds = Date.now() / 1000;

      if (tokenExpiration && tokenExpiration < nowInSeconds) {
        await refreshToken();
      } else {
        setIsAuthenticated(true);
        const authenticatedUser = localStorage.getItem(USER_KEY);
        if (authenticatedUser) {
          setUser(JSON.parse(authenticatedUser));
        }
      }
    } else {
      setIsAuthenticated(false);
      setUser(null);
    }
    setIsLoading(true);
  };

  const refreshToken = async () => {
    try {
      const response = await auth.refreshToken();
      if (response.status === 200) {
        localStorage.setItem(ACCESS_TOKEN_KEY, response.data.access);
        setIsAuthenticated(true);
        const authenticatedUser = localStorage.getItem(USER_KEY);
        if (authenticatedUser) {
          setUser(JSON.parse(authenticatedUser));
        }
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (error) {
      console.error(error);
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  useEffect(() => {
    checkAuthentication().catch(() => {
      setIsLoading(false);
      setIsAuthenticated(false);
      setUser(null);
    });
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const response = await auth.logIn(username, password);
      const { access_token, refresh_token, user_id } = response.data;
      const authenticatedUser = { id: user_id, username };
      localStorage.setItem(ACCESS_TOKEN_KEY, access_token);
      localStorage.setItem(REFRESH_TOKEN_KEY, refresh_token);
      setIsAuthenticated(true);
      setUser(authenticatedUser);
      localStorage.setItem(USER_KEY, JSON.stringify(authenticatedUser));
    } catch (error) {
      console.error(error);
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  const signUp = async (username: string, password: string) => {
    try {
      const response = await auth.signUp(username, password);
      const { access_token, refresh_token, user_id } = response.data;
      const authenticatedUser = { id: user_id, username };
      localStorage.setItem(ACCESS_TOKEN_KEY, access_token);
      localStorage.setItem(REFRESH_TOKEN_KEY, refresh_token);
      setIsAuthenticated(true);
      setUser(authenticatedUser);
      localStorage.setItem(USER_KEY, JSON.stringify(authenticatedUser));
    } catch (error) {
      console.error(error);
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  const signOut = async () => {
    try {
      await auth.signOut();
      localStorage.clear();
      setIsAuthenticated(false);
      setUser(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        login,
        signOut,
        signUp,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
