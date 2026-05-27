import { useState, useEffect } from "react";

function useAuth() {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    const role = localStorage.getItem("role");

    if (token && username) {
      setUser({ username, role });
      setIsLoggedIn(true);
    }
  }, []);

  const logout = () => {
    localStorage.clear();
    setUser(null);
    setIsLoggedIn(false);
  };

  return { user, isLoggedIn, logout };
}

export default useAuth;
