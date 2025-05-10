import SingupForm from "../../components/auth/SingupForm";
import { redirect, useActionData, useNavigation } from "react-router-dom";

export async function action({ request }) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const username = formData.get("username");
  const address = formData.get("address");
  const phoneNumber = formData.get("phone");

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

    if (response.ok) {
      return redirect("/login");
    } else {
      const error = await response.json();
      return error;
    }
  } catch (error) {
    return {
      httpStatus: "INTERNAL_SERVER_ERROR",
      code: 500,
      data: {
        errMsg: "서버 오류가 발생했습니다.",
      },
    };
  }
}

function SingupPage() {
  const actionData = useActionData();
  const navigation = useNavigation();

  return (
    <SingupForm
      actionData={actionData}
      isSubmitting={navigation.state === "submitting"}
    />
  );
}

export default SingupPage;
