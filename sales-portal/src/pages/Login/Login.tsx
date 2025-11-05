import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSignIn, useSignUp } from "../../hooks/useAuth";
import { LoginInput } from "./components/LoginInput";
import { LockIcon, UserIcon } from "./icons";

interface LoginFormData {
  username: string;
  password: string;
}

interface FormErrors {
  username?: string;
  password?: string;
}

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginFormData>({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const signUpMutation = useSignUp();
  const signInMutation = useSignIn();

  const isLoading =
    signUpMutation.isPending || signInMutation.isPending;

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.username) {
      newErrors.username = "Username is required";
    } else if (formData.username.length < 3) {
      newErrors.username =
        "Username must be at least 3 characters long";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password =
        "Password must be at least 6 characters long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    signUpMutation.mutate(formData, {
      onSuccess: (data) => {
        navigate("/sales");
      },
      onError: (error) => {},
    });
  };

  const handleLogin = async () => {
    if (!validateForm()) {
      return;
    }

    signInMutation.mutate(formData, {
      onSuccess: (_data) => {
        navigate("/sales");
      },
      onError: (error) => {},
    });
  };

  return (
    <main className="min-h-screen flex">
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-20 xl:px-24 bg-white">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <header className="mb-8">
            <img
              src="./UrbanChain.jpg"
              alt="Urban Chain Logo"
            />
          </header>

          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              GET STARTED
            </h1>
            <p className="text-gray-600">
              Welcome - Let's create your account
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <LoginInput
              label="Login"
              id="username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="hi@urbanchain.co.uk"
              disabled={isLoading}
              error={errors.username}
              icon={UserIcon}
            />

            <LoginInput
              label="Password"
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="A secure Password!"
              disabled={isLoading}
              error={errors.password}
              icon={LockIcon}
            />

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-4 px-4 border border-transparent rounded-lg text-lg font-medium text-white transition-colors ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-teal-500 hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
              }`}
            >
              {isLoading ? "Signing Up..." : "Sign Up"}
            </button>
          </form>

          {(signUpMutation.error ||
            signInMutation.error) && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">
                {signUpMutation.error?.message ||
                  signInMutation.error?.message}
              </p>
            </div>
          )}

          {(signUpMutation.isSuccess ||
            signInMutation.isSuccess) && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-600">
                {signUpMutation.isSuccess
                  ? "Sign up successful!"
                  : "Login successful!"}
              </p>
            </div>
          )}

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <button
                type="button"
                className={`w-full py-4 px-4 cursor-pointer border border-transparent rounded-lg text-lg font-medium text-white transition-colors ${
                  isLoading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gray-400 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                }`}
                onClick={handleLogin}
                disabled={isLoading}
              >
                Login with current credentials
              </button>
            </p>
          </div>
        </div>
      </div>

      <img
        className="rounded-xl"
        src="/src/assets/energyMarket.png"
      ></img>
    </main>
  );
};

export default Login;
