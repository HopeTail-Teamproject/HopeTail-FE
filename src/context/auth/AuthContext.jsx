import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedRefreshToken = localStorage.getItem("refreshToken");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedRefreshToken && storedUser) {
      setToken(storedToken);
      setRefreshToken(storedRefreshToken);
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  // 토큰 갱신 함수
  const refreshAccessToken = async () => {
    try {
      const response = await fetch("/api/account/refresh", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          refreshToken,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setToken(data.token);
        localStorage.setItem("token", data.token);
        return true;
      } else {
        // 리프레시 토큰이 만료되었거나 유효하지 않은 경우
        logout();
        return false;
      }
    } catch (error) {
      console.error("토큰 갱신 중 오류 발생:", error);
      logout();
      return false;
    }
  };

  const login = (userData, authToken, authRefreshToken) => {
    setIsAuthenticated(true);
    setUser(userData);
    setToken(authToken);
    setRefreshToken(authRefreshToken);

    localStorage.setItem("token", authToken);
    localStorage.setItem("refreshToken", authRefreshToken);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setToken(null);
    setRefreshToken(null);

    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
  };

  const getAuthHeader = () => {
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  // 토큰 자동 갱신을 위한 useEffect
  useEffect(() => {
    if (!token || !refreshToken) return;

    let timeoutId;

    const scheduleTokenRefresh = () => {
      // 55분 후에 토큰 갱신 시도 (토큰 만료 5분 전)
      timeoutId = setTimeout(refreshAccessToken, 55 * 60 * 1000);
    };

    scheduleTokenRefresh();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [token, refreshToken]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        token,
        refreshToken,
        login,
        logout,
        getAuthHeader,
        refreshAccessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
