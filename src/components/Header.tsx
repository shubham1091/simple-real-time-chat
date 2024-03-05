import { LogIn, LogOut } from "react-feather";
import { Link } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";

const Header = () => {
    const { user, handleLogout } = useAuth();

    return (
        <div className="flex items-center justify-between py-4 px-8 bg-gray-800 text-white">
            <div>
                <h1 className="text-lg font-bold">Your Chat App</h1>
            </div>
            <div>
                {user ? (
                    <>
                        <span className="mr-4">Welcome {user.name}</span>
                        <LogOut
                            className="w-6 h-6 cursor-pointer"
                            onClick={handleLogout}
                        />
                    </>
                ) : (
                    <Link to="/login" className="flex items-center">
                        <LogIn className="w-6 h-6 mr-1" />
                        <span>Login</span>
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Header;
