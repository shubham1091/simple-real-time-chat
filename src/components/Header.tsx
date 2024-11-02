import { LogIn, LogOut, MessageCircle } from "react-feather";
import { Link } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";

export const Header = () => {
  const { user, handleLogout } = useAuth();

  return (
    <header className="sticky top-0 z-50 backdrop-blur-sm bg-gray-900/90 border-b border-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo and App Name */}
          <Link
            to="/"
            className="flex items-center space-x-2 text-white hover:text-blue-400 transition-colors"
          >
            <MessageCircle className="w-6 h-6" />
            <span className="text-lg font-semibold tracking-tight">
              ChatSpace
            </span>
          </Link>

          {/* User Section */}
          <div className="flex items-center">
            {user ? (
              <div className="flex items-center space-x-4">
                {/* User Avatar */}
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                    <span className="text-sm font-medium text-white">
                      {user.name[0].toUpperCase()}
                    </span>
                  </div>
                  <div className="hidden sm:block">
                    <p className="text-sm font-medium text-white">
                      {user.name}
                    </p>
                    <p className="text-xs text-gray-400">Online</p>
                  </div>
                </div>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition-all"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="hidden sm:inline text-sm">Logout</span>
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              >
                <LogIn className="w-5 h-5" />
                <span className="text-sm font-medium">Sign In</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
