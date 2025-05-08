import { HashRouter as Router } from "react-router-dom";
import "./App.css";
import MainPage from "./routes/mainPage/MainPage";
import BasicLayout from "./layouts/BasicLayout";
import AuthLayout from "./layouts/AuthLayout";
import LoginPage from "./routes/authPage/LoginPage";
import SingupPage from "./routes/authPage/SingupPage";
import AboutPage from "./routes/aboutPage/AboutPage";
import AdoptionPage, { action as adoptAction } from "./routes/adoptionPage/AdoptionPage";
import CareGuidePage from "./routes/careGuidePage/CareGuidePage";
import ChatPage from "./routes/chatPage/ChatPage";
import { LanguageProvider } from "./context/language/LanguageContext";

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
        { path: "login", element: <LoginPage /> },
        { path: "signup", element: <SingupPage /> },
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
        <RouterProvider router={router} />
      </LanguageProvider>
    </>
  );
}

export default App;
