import { useMutation } from "@tanstack/react-query";

interface AuthCredentials {
  username: string;
  password: string;
}

interface SignUpResponse {
  message: string;
}

interface SignInResponse {
  accessToken: string;
}

const API_BASE_URL = "http://localhost:3000";

// Sign Up Hook
export function useSignUp() {
  return useMutation<
    SignUpResponse,
    Error,
    AuthCredentials
  >({
    mutationFn: async (
      credentials: AuthCredentials
    ): Promise<SignUpResponse> => {
      const response = await fetch(
        `${API_BASE_URL}/auth/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(
          error.message ||
            `HTTP error! status: ${response.status}`
        );
      }

      // Return a success message since the endpoint returns void
      return { message: "Account created successfully" };
    },
  });
}

// Sign In Hook
export function useSignIn() {
  return useMutation<
    SignInResponse,
    Error,
    AuthCredentials
  >({
    mutationFn: async (
      credentials: AuthCredentials
    ): Promise<SignInResponse> => {
      const response = await fetch(
        `${API_BASE_URL}/auth/signin`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(
          error.message ||
            `HTTP error! status: ${response.status}`
        );
      }

      const data = await response.json();

      // Store the access token in localStorage
      if (data.accessToken) {
        localStorage.setItem(
          "accessToken",
          data.accessToken
        );
      }

      return data;
    },
  });
}

// Logout Hook (clears token)
export function useLogout() {
  return () => {
    localStorage.removeItem("accessToken");
  };
}

// Get stored token
export function getAccessToken(): string | null {
  return localStorage.getItem("accessToken");
}

// Check if user is authenticated
export function isAuthenticated(): boolean {
  return !!getAccessToken();
}
