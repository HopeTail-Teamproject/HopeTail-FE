import MainAdoptPage from "../../components/adopt/MainAdoptPage";
import { redirect } from "react-router-dom";

function AdoptionPage() {
  return <MainAdoptPage />;
}

export default AdoptionPage;

export async function action({ request }) {
  const formData = await request.formData();

  // 예: 서버에 전송할 수도 있음
  // await fetch("/api/adopt", {
  //   method: "POST",
  //   body: formData,
  // });

  return redirect("/"); // <- 여기서 "/"로 이동
}
