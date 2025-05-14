import { useActionData, useNavigation, redirect } from "react-router-dom";
import LoginForm from "../../components/auth/LoginForm";
import { useAuth } from "../../context/auth/AuthContext";

export async function action({ request }) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const rememberMe = formData.get("remember") === "on";

  try {
    const response = await fetch("/api/account/auth", {
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

    if (response.ok) {
      const data = await response.json();
      return { ...data, redirectTo: "/" };
    } else {
      const error = await response.json();
      return error;
    }
  } catch (error) {
    return { success: false, error: "서버 오류가 발생했습니다." };
  }
}

function LoginPage() {
  const actionData = useActionData();
  const navigation = useNavigation();
  const auth = useAuth();

  if (actionData?.redirectTo) {
    const { user, token, refreshToken, redirectTo } = actionData;
    auth.login(user, token, refreshToken);
    return redirect(redirectTo);
  }

  return (
    <LoginForm actionData={actionData} isSubmitting={navigation.state === "submitting"} />
  );
}

export default LoginPage;
