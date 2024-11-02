import { Models } from "appwrite";

export type user = Models.User<Models.Preferences>;

export interface Credentials {
  email: string;
  password: string;
  name?: string; // Optional for registration
}

export interface Register {
  email: string;
  password: string;
  name: string;
  confirmPassword: string;
}

export interface AuthContextType {
  user: user | null;
  handleUserLogin: (
    e: React.FormEvent,
    credentials: Credentials
  ) => Promise<void>;
  handleLogout: () => Promise<void>;
  handleRegister: (e: React.FormEvent, credentials: Register) => Promise<void>;
}
