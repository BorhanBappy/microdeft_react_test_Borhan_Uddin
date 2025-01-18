import { useState } from "react";
import axios from "axios";

export default function Login() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };
  console.log(credentials);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://react-interview.crd4lc.easypanel.host/api/login",
        credentials
      );
      const users = response.data;

      const user = users.find(
        (u) =>
          u.email === credentials.email && u.password === credentials.password
      );

      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        alert("Login successful!");
      } else {
        setError("Invalid username or password.");
      }
    } catch (err) {
      setError("Network error. Try again later.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center text-gray-700">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-600"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Enter your username"
              value={credentials.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={credentials.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none"
          >
            Login
          </button>
        </form>
        {error && <p className="text-sm text-red-600 text-center">{error}</p>}
        <div className="text-sm text-center text-gray-600">
          Don't have an account?{" "}
        </div>
      </div>
    </div>
  );
}
