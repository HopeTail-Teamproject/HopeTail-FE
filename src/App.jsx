import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import MainPage from "./routes/mainPage/MainPage";
import BasicLayout from "./layouts/BasicLayout";
import AuthLayout from "./layouts/AuthLayout";
import LoginPage, { action as loginAction } from "./routes/authPage/LoginPage";
import SingupPage, { action as signupAction } from "./routes/authPage/SingupPage";
import AboutPage from "./routes/aboutPage/AboutPage";
import AdoptionPage, { action as adoptAction } from "./routes/adoptionPage/AdoptionPage";
import CareGuidePage from "./routes/careGuidePage/CareGuidePage";
import ChatPage from "./routes/chatPage/ChatPage";
import { LanguageProvider } from "./context/language/LanguageContext";
import { AuthProvider } from "./context/auth/AuthContext";

const router = createBrowserRouter(
  [
    {
      element: <BasicLayout />,
      children: [
        { index: true, element: <MainPage /> },
        { path: "about", element: <AboutPage /> },
        { path: "adopt", element: <AdoptionPage />, action: adoptAction },
        { path: "care-guide", element: <CareGuidePage /> },
        { path: "chat", element: <ChatPage /> },
      ],
    },
    {
      element: <AuthLayout />,
      children: [
        { path: "login", element: <LoginPage />, action: loginAction },
        { path: "signup", element: <SingupPage />, action: signupAction },
      ],
    },
  ],
  {
    basename: "/HopeTail-FE",
  }
);

function App() {
  return (
    <>
      <LanguageProvider>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </LanguageProvider>
    </>
  );
}

export default App;
