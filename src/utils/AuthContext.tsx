import { ID } from "appwrite";
import {
  FormEvent,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router";
import { account } from "../appwriteConfig";
import { AuthContextType, Credentials, Register, user } from "./types";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<user | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    getUserOnLoad();
  }, []);

  const getUserOnLoad = async () => {
    try {
      const accountDetails = await account.get();
      setUser(accountDetails);
    } catch (error) {
      // Handle error
    }
    setLoading(false);
  };

  const handleUserLogin = async (e: FormEvent, credentials: Credentials) => {
    e.preventDefault();
    try {
      await account.createEmailSession(credentials.email, credentials.password);
      const accountDetails = await account.get();
      setUser(accountDetails);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = async () => {
    const response = await account.deleteSession("current");
    console.log("logout", response);
    setUser(null);
  };

  const handleRegister = async (e: FormEvent, credentials: Register) => {
    e.preventDefault();
    if (credentials.password !== credentials.confirmPassword) {
      alert("Passwords did not match!");
      return;
    }

    try {
      const response: user | null = await account.create(
        ID.unique(),
        credentials.email,
        credentials.password,
        credentials.name
      );
      console.log("rigistered", response);
      await account.createEmailSession(credentials.email, credentials.password);
      const accountDetails: user | null = await account.get();
      setUser(accountDetails);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const contextData: AuthContextType = {
    user,
    handleUserLogin,
    handleLogout,
    handleRegister,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? <p>Loading...</p> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;
