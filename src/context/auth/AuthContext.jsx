import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // 초기 로드 시 자동 로그인 체크
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const storedToken = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");
        const storedRefreshToken = localStorage.getItem("refreshToken");

        if (storedToken && storedUser) {
          // 저장된 토큰으로 상태 설정
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
          setRefreshToken(storedRefreshToken);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("자동 로그인 체크 중 오류:", error);
        logout();
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // 토큰 갱신 함수
  const refreshAccessToken = async () => {
    try {
      // localStorage에서 refresh 토큰 확인
      const storedRefreshToken = localStorage.getItem("refreshToken");

      const response = await fetch(
        `${process.env.VITE_API_BASE_URL}/api/account/auth/refresh`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(storedRefreshToken && { Authorization: `Bearer ${storedRefreshToken}` }),
          },
        }
      );

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

  const login = async (userData, authToken, refreshTokenValue) => {
    try {
      console.log("로그인 시도:", { userData, authToken, refreshTokenValue });

      // Access 토큰은 항상 localStorage에 저장
      localStorage.setItem("token", authToken);
      localStorage.setItem("user", JSON.stringify(userData));

      // refreshToken이 null이 아닐 때만 localStorage에 저장
      // (rememberMe가 true일 때는 서버에서 null로 반환되므로 저장되지 않음)
      if (refreshTokenValue) {
        localStorage.setItem("refreshToken", refreshTokenValue);
      }

      // 상태 업데이트
      setIsAuthenticated(true);
      setUser(userData);
      setToken(authToken);
      setRefreshToken(refreshTokenValue);
    } catch (error) {
      console.error("로그인 처리 중 오류:", error);
      throw error;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setToken(null);
    setRefreshToken(null);

    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");

    // 쿠키에서 refreshToken 삭제 (서버 설정과 동일한 형식으로 삭제)
    const pastDate = new Date(0).toISOString();
    document.cookie = `refreshToken=; path=/; domain=localhost; expires=${pastDate}`;
  };

  const getAuthHeader = () => {
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  // 토큰 자동 갱신을 위한 useEffect
  useEffect(() => {
    if (!token) return;

    let timeoutId;

    const scheduleTokenRefresh = () => {
      // 55분 후에 토큰 갱신 시도 (토큰 만료 5분 전)
      timeoutId = setTimeout(refreshAccessToken, 55 * 60 * 1000);
    };

    scheduleTokenRefresh();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [token]);

  if (isLoading) {
    return <div>Loading...</div>; // 또는 로딩 컴포넌트
  }

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
