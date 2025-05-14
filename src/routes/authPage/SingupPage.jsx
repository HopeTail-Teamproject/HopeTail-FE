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
    const response = await fetch("/api/account/create", {
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

    const data = await response.json();
    console.log("회원가입 응답:", data);

    if (response.ok) {
      return { success: true };
    } else {
      return {
        success: false,
        error: data.message || "회원가입에 실패했습니다.",
      };
    }
  } catch (error) {
    console.error("회원가입 중 오류 발생:", error);
    return {
      success: false,
      error: "서버 오류가 발생했습니다.",
    };
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
