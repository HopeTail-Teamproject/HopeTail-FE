import { useActionData, useNavigation, redirect, useNavigate } from "react-router-dom";
import LoginForm from "../../components/auth/LoginForm";
import { useAuth } from "../../context/auth/AuthContext";
import { useEffect } from "react";

export async function loader() {
  const token = localStorage.getItem("token");
  if (token) {
    alert("이미 로그인되어 있습니다.");
    return redirect("/");
  }
  return null;
}

export async function action({ request }) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const rememberMe = formData.get("rememberMe") === "on";

  try {
    const response = await fetch(`${process.env.VITE_API_BASE_URL}/api/account/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        rememberMe,
      }),
    });

    const data = await response.json();
    console.log("로그인 응답:", data);

    if (response.ok) {
      return {
        success: true,
        user: { email: data.data.accessToken.email },
        token: data.data.accessToken.token,
        refreshToken: data.data.refreshToken?.token || null,
      };
    } else {
      return {
        success: false,
        error: data.message || "로그인에 실패했습니다.",
      };
    }
  } catch (error) {
    console.error("로그인 중 오류 발생:", error);
    return {
      success: false,
      error: "서버 오류가 발생했습니다.",
    };
  }
}

function LoginPage() {
  const actionData = useActionData();
  const navigation = useNavigation();
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    if (actionData?.success && actionData?.token) {
      login(actionData.user, actionData.token, actionData.refreshToken);
      navigate("/", { replace: true });
    }
  }, [actionData, login, navigate]);

  return (
    <LoginForm actionData={actionData} isSubmitting={navigation.state === "submitting"} />
  );
}

export default LoginPage;
