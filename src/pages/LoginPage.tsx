import { ChangeEvent, useEffect, useState } from "react";
import { useAuth } from "../utils/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
    const { user, handleUserLogin } = useAuth();
    const navigate = useNavigate();
    const [detail, setDetail] = useState({ email: "", password: "" });

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, []);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setDetail({ ...detail, [e.target.name]: e.target.value });
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4">Sign In</h2>
                <form
                    onSubmit={(e) => {
                        handleUserLogin(e, detail);
                    }}
                >
                    <div className="mb-4">
                        <label
                            htmlFor="email-address"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Email address
                        </label>
                        <input
                            id="email-address"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            className="mt-1 px-4 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Email address"
                            value={detail.email}
                            onChange={(e) => {
                                handleInputChange(e);
                            }}
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            placeholder="Enter your password"
                            className="mt-1 px-4 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            value={detail.password}
                            onChange={(e) => {
                                handleInputChange(e);
                            }}
                        />
                    </div>

                    <div className="mb-6">
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                        >
                            Sign in
                        </button>
                    </div>
                </form>
                <p>
                    Don't have an account? Register{" "}
                    <Link to="/register" className="text-blue-500">
                        here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
