import React, { useState } from "react";
import { useAuthStore } from "../stores/useAuthStore";
import { Loader } from "lucide-react";

const Root = () => {
  const { signup, login, loading } = useAuthStore();

  const [state, setState] = useState("Login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("user@gmail.com");
  const [password, setPassword] = useState("12345");

  const handleLogin = (e) => {
    e.preventDefault();
    if (state === "Sign Up") {
      signup(name, email, password);
    } else {
      login(email, password);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800">{state}</h2>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className={state === "Login" ? "hidden" : ""}>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              id="name"
              placeholder="John Doe"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              placeholder="you@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-500 text-white font-semibold py-2 rounded-lg hover:bg-purple-600 transition cursor-pointer flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader className="animate-spin h-5 w-5" />
                <span>
                  {state === "Login" ? "Logging in..." : "Creating Account..."}
                </span>
              </>
            ) : state === "Login" ? (
              "Login"
            ) : (
              "Create Account"
            )}
          </button>

          {state === "Login" ? (
            <p className="text-sm text-center text-gray-500">
              Don't have an account?{" "}
              <span
                onClick={() => setState("Sign Up")}
                className="text-purple-500 hover:underline cursor-pointer"
              >
                Sign up
              </span>
            </p>
          ) : (
            <p className="text-sm text-center text-gray-500">
              Already have an account?{" "}
              <span
                onClick={() => setState("Login")}
                className="text-purple-500 hover:underline cursor-pointer"
              >
                Login
              </span>
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Root;
