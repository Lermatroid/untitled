import { createContext, useContext } from "react";
import { type User } from "firebase/auth";

interface AuthContextType {
	currentUser: User | null;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
	return useContext(AuthContext);
};

export default AuthContext;
