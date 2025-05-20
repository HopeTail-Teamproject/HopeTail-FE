import { useActionData, useNavigation, redirect, useNavigate } from "react-router-dom";
import SignupForm from "../../components/auth/SingupForm";
import { useAuth } from "../../context/auth/AuthContext";

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
  const username = formData.get("username");
  const address = formData.get("address");
  const phoneNumber = formData.get("phoneNumber");

  try {
    const response = await fetch(`${process.env.VITE_API_BASE_URL}/api/account/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        username,
        address,
        phoneNumber,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.data?.errMsg || "회원가입에 실패했습니다.");
    }

    return redirect("/login");
  } catch (error) {
    console.error("회원가입 중 오류 발생:", error);
    return { error: error.message };
  }
}

function SingupPage() {
  const actionData = useActionData();
  const navigation = useNavigation();

  return (
    <SignupForm
      actionData={actionData}
      isSubmitting={navigation.state === "submitting"}
    />
  );
}

export default SingupPage;
