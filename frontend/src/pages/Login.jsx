import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import { useAuthStore } from "../store/authStore";

import MainLayout from "../components/layout/MainLayout";

import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Card from "../components/ui/Card";

export default function Login() {
  const navigate = useNavigate();

  const { login, signup, loading, token } = useAuthStore();

  const [isSignup, setIsSignup] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Redirect if already authenticated
  useEffect(() => {
    if (token) {
      navigate("/dashboard", { replace: true });
    }
  }, [token, navigate]);

  // Handle input change
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Submit form
  const handleSubmit = async () => {
    const { name, email, password } = formData;

    // Validation
    if (!email || !password) {
      return toast.error("Please fill all fields");
    }

    if (isSignup && !name) {
      return toast.error("Please enter your name");
    }

    if (password.length < 6) {
      return toast.error(
        "Password must be at least 6 characters"
      );
    }

    // SIGNUP
   if (isSignup) {

  const res =
    await signup(
      name,
      email,
      password
    );

  if (res.success) {

    toast.success(
      "Account created successfully"
    );

    setIsSignup(false);

    setFormData({
      name: "",
      email,
      password: "",
    });

    return;
  }

  toast.error(res.message);

  return;
}
    // LOGIN
    const res = await login(email, password);

    if (res.success) {
      toast.success("Login successful");

      navigate("/dashboard", { replace: true });
    } else {
      toast.error(res.message);
    }
  };

  return (
    <MainLayout>

      <div className="min-h-screen flex items-center justify-center px-4">

        <div className="relative z-10 w-full max-w-md">

          <Card
            className="p-8 rounded-2xl
            shadow-[0_0_40px_rgba(59,130,246,0.2)]"
          >

            {/* Logo */}
            <div className="flex justify-center mb-4">

              <img
                src="/pingo-thinking.png"
                alt="Pingo"
                className="w-16 animate-breathe
                drop-shadow-[0_0_20px_rgba(59,130,246,0.7)]"
              />

            </div>

            {/* Title */}
            <h2
              className="text-2xl font-bold mb-6 text-center
              transition-all duration-300
              hover:scale-105
              hover:drop-shadow-[0_0_20px_rgba(96,165,250,0.8)]"
            >
              {isSignup ? "Create Account" : "Login"}
            </h2>

            {/* Form */}
            <div className="space-y-4">

              {isSignup && (
                <Input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                />
              )}

              <Input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />

              <Input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />

              <Button
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading
                  ? "Please wait..."
                  : isSignup
                  ? "Sign Up"
                  : "Login"}
              </Button>

            </div>

            {/* Toggle */}
            <p className="mt-6 text-sm text-center text-gray-400">

              {isSignup
                ? "Already have an account?"
                : "Don’t have an account?"}{" "}

              <button
                onClick={() => setIsSignup(!isSignup)}
                className="text-blue-400 font-medium transition
                hover:underline
                hover:drop-shadow-[0_0_10px_rgba(96,165,250,0.7)]"
              >
                {isSignup ? "Login" : "Sign up"}
              </button>

            </p>

          </Card>

        </div>
      </div>

    </MainLayout>
  );
}