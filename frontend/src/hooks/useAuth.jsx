import { useState } from "react";

export default function useAuth(url) {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const authenticate = async (credentials) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });
      const data = await response.json();

      if (!response.ok) {
        setError(data.error);
        return null;
      }

      localStorage.setItem("user", JSON.stringify(data));
      return data;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { authenticate, isLoading, error };
}