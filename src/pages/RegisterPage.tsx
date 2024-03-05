import { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";
import { Register } from "../utils/types";

const RegisterPage = () => {
    const [credentials, setCredentials] = useState<Register>({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const { handleRegister } = useAuth();

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4">Register</h2>
                <form
                    onSubmit={(e) => {
                        handleRegister(e, credentials);
                    }}
                >
                    <div className="mb-4">
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Name
                        </label>
                        <input
                            id="name"
                            required
                            type="text"
                            name="name"
                            value={credentials.name}
                            placeholder="Enter your name..."
                            onChange={(e) => {
                                handleInputChange(e);
                            }}
                            className="mt-1 px-4 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Email
                        </label>
                        <input
                            id="email"
                            required
                            type="email"
                            name="email"
                            placeholder="Enter your email..."
                            value={credentials.email}
                            onChange={(e) => {
                                handleInputChange(e);
                            }}
                            className="mt-1 px-4 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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
                            required
                            type="password"
                            name="password"
                            placeholder="Enter a password..."
                            value={credentials.password}
                            onChange={(e) => {
                                handleInputChange(e);
                            }}
                            className="mt-1 px-4 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div className="mb-6">
                        <label
                            htmlFor="confirmPassword"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Confirm Password
                        </label>
                        <input
                            id="confirmPassword"
                            required
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm your password..."
                            value={credentials.confirmPassword}
                            onChange={(e) => {
                                handleInputChange(e);
                            }}
                            className="mt-1 px-4 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div className="mb-6">
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                        >
                            Register
                        </button>
                    </div>
                </form>

                <p>
                    Already have an account? Login{" "}
                    <Link to="/login" className="text-blue-500">
                        here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;
