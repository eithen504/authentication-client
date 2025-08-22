import React, { useState, type FormEvent } from "react";
import { toast } from "sonner";

const RegisterPage: React.FC = () => {
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [token, setToken] = useState<string>("")
    const [fullname, setFullname] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [formType, setFormType] = useState<"validateUser" | "verifyEmail" | "RegisterUser">("RegisterUser")

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // prevent page reload

        setIsLoading(true);

        if (formType == "validateUser") {
            try {
                const response = await fetch("https://authentication-server-terl.onrender.com/api/v1/user/validate-user", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ username, email }), // Include required fields from ValidateUserRequest
                    credentials: "include", // to send cookies if your API uses them
                });

                if (!response.ok) {
                    const data = await response.json();
                    toast.error(data.detail || "Error occurred")
                } else {
                    toast.success("Verification Token Sent Successfully To Your Email.")
                    setFormType("verifyEmail")
                }
            } catch (error) {
                console.error("Error:", error);
                toast.error("Something went wrong")
            } finally {
                setIsLoading(false);
            }

        }

        if (formType == "verifyEmail") {
            try {
                const response = await fetch("https://authentication-server-terl.onrender.com/api/v1/user/verify-email", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email, token }),
                    credentials: "include", // to send cookies if your API uses them
                });

                if (!response.ok) {
                    const data = await response.json();
                    toast.error(data.detail || "Error occurred")
                } else {
                    toast.success("Now Please Register.")
                    setFormType("RegisterUser")
                }
            } catch (error) {
                console.error("Error:", error);
                toast.error("Something went wrong")
            } finally {
                setIsLoading(false);
            }

        }

        if (formType == "RegisterUser") {
            try {
                const response = await fetch("https://authentication-server-terl.onrender.com/api/v1/user/register-user", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ username, email, fullname, password }),
                    credentials: "include", // to send cookies if your API uses them
                });

                if (!response.ok) {
                    const data = await response.json();
                    toast.error(data.detail || "Error occurred")
                } else {
                    toast.success("Welcome To Our App.")
                }
            } catch (error) {
                console.error("Error:", error);
                toast.error("Something went wrong")
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <div className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-center text-white">Validate</h2>
                <form onSubmit={onSubmit}>
                    {
                        formType == "validateUser" ? (
                            <>
                                <div className="mb-4">
                                    <label className="block text-gray-300 mb-2" htmlFor="username">Username</label>
                                    <input
                                        type="text"
                                        id="username"
                                        name="username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-700 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter your username"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-gray-300 mb-2" htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-700 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter your email"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 cursor-pointer text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    {isLoading ? "Validating..." : "Validate"}
                                </button>
                            </>
                        ) : (
                            formType == "verifyEmail" ? (
                                <>
                                    <div className="mb-4">
                                        <label className="block text-gray-300 mb-2" htmlFor="token">Token</label>
                                        <input
                                            type="text"
                                            id="token"
                                            name="token"
                                            value={token}
                                            onChange={(e) => setToken(e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-700 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Enter your token"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full bg-blue-600 cursor-pointer text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        {isLoading ? "Verifying Email..." : "Verify Email"}
                                    </button>
                                </>
                            ) : (
                                <>
                                    <div className="mb-4">
                                        <label className="block text-gray-300 mb-2" htmlFor="fullname">Fullname</label>
                                        <input
                                            type="text"
                                            id="fullname"
                                            name="fullname"
                                            value={fullname}
                                            onChange={(e) => setFullname(e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-700 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Enter your fullname"
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label className="block text-gray-300 mb-2" htmlFor="password">Password</label>
                                        <input
                                            type="text"
                                            id="password"
                                            name="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-700 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Enter your password"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full bg-blue-600 cursor-pointer text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        {isLoading ? "Verifying Email..." : "Verify Email"}
                                    </button>
                                </>
                            )
                        )
                    }
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
