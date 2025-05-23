import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

import BasicLayout from "./layouts/BasicLayout";
import AuthLayout from "./layouts/AuthLayout";
import ErrorLayout from "./layouts/ErrorLayout";

import MainPage from "./routes/mainPage/MainPage";
import AboutPage from "./routes/aboutPage/AboutPage";
import CareGuidePage from "./routes/careGuidePage/CareGuidePage";
import ErrorPage from "./routes/errorPage/ErrorPage";

import AdoptSelect from "./routes/adoptPage/AdoptSelect";
import AdoptPage from "./routes/adoptPage/AdoptPage";
import AdoptionPage, { action as adoptAction } from "./routes/adoptionPage/AdoptionPage";

import RehomePage from "./routes/rehomePage/RehomePage";
import RehomePage2 from "./routes/rehomePage/RehomePage2";
import RehomePage3 from "./routes/rehomePage/RehomePage3";

import CommunityPage from "./routes/communityPage/CommunityPage";
import CommunityNewpost from "./routes/communityPage/CommunityNewpost";
import CommunityGuideline from "./routes/communityPage/CommunityGuideline";
import CommunityPost from "./routes/communityPage/CommunityPost";

import UserPage from "./routes/userPage/UserPage";
import BookmarkPage from "./routes/bookmarkPage/BookmarkPage";
import FavoritesPage from "./routes/favoritesPage/FavoritesPage";
import FilesPage from "./routes/filesPage/FilesPage";
import UserProfilePage from "./routes/userPage/UserProfilePage";

import LoginPage, {
  action as loginAction,
  loader as loginLoader,
} from "./routes/authPage/LoginPage";
import SingupPage, {
  action as signupAction,
  loader as signupLoader,
} from "./routes/authPage/SingupPage";

import ChatPage from "./routes/chatPage/ChatPage";
import ChatFile from "./routes/chatPage/ChatFile/ChatFile";

import { LanguageProvider } from "./context/language/LanguageContext";
import { AuthProvider } from "./context/auth/AuthContext";

const router = createBrowserRouter(
  [
    {
      element: <BasicLayout />,
      errorElement: (
        <ErrorLayout>
          <ErrorPage />
        </ErrorLayout>
      ),
      children: [
        { index: true, element: <MainPage /> },
        { path: "about", element: <AboutPage /> },
        { path: "care-guide", element: <CareGuidePage /> },
        { path: "adopt", element: <AdoptSelect /> },
        { path: "adopt/:id", element: <AdoptPage /> },
        { path: "adopt/:id/adoption", element: <AdoptionPage />, action: adoptAction },
        { path: "adopt/:id/chat", element: <ChatPage /> },
        { path: "adopt/:id/chatfile", element: <ChatFile /> },
        { path: "rehome", element: <RehomePage /> },
        { path: "rehome/list", element: <RehomePage2 /> },
        { path: "rehome/:id", element: <RehomePage3 /> },
        {
          path: "community",
          children: [
            { index: true, element: <CommunityPage /> },
            { path: "new", element: <CommunityNewpost /> },
            { path: "guideline", element: <CommunityGuideline /> },
            { path: ":postId", element: <CommunityPost /> },
          ],
        },
        { path: "user", element: <UserPage /> },
        { path: "user/bookmark", element: <BookmarkPage /> },
        { path: "user/favorites", element: <FavoritesPage /> },
        { path: "user/files", element: <FilesPage /> },
        { path: "user/:userId", element: <UserProfilePage /> },
      ],
    },
    {
      element: <AuthLayout />,
      children: [
        {
          path: "login",
          element: <LoginPage />,
          action: loginAction,
          loader: loginLoader,
        },
        {
          path: "signup",
          element: <SingupPage />,
          action: signupAction,
          loader: signupLoader,
        },
      ],
    },
  ],
  {
    basename: "/HopeTail-FE/",
  }
);

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
