import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

import BasicLayout from "./layouts/BasicLayout";
import AuthLayout from "./layouts/AuthLayout";

import MainPage from "./routes/mainPage/MainPage";
import AboutPage from "./routes/aboutPage/AboutPage";
import CareGuidePage from "./routes/careGuidePage/CareGuidePage";
import ErrorPage from "./routes/errorPage/ErrorPage";

import AdoptionPage, { action as adoptAction } from "./routes/adoptionPage/AdoptionPage";
import AdoptPage from "./routes/adoptPage/AdoptPage";

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

import LoginPage from "./routes/authPage/LoginPage";
import SingupPage from "./routes/authPage/SingupPage";

import ChatPage from "./routes/chatPage/ChatPage";

import { LanguageProvider } from "./context/language/LanguageContext";

const router = createBrowserRouter(
  [
    {
      element: <BasicLayout />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <MainPage /> },
        { path: "about", element: <AboutPage /> },
        { path: "care-guide", element: <CareGuidePage /> },
        { path: "adopt", element: <AdoptionPage />, action: adoptAction },
        { path: "adopt/:id", element: <AdoptPage /> },
        { path: "rehome", element: <RehomePage /> },
        { path: "rehome2", element: <RehomePage2 /> },
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
        { path: "bookmark", element: <BookmarkPage /> },
        { path: "favorites", element: <FavoritesPage /> },
        { path: "files", element: <FilesPage /> },
        { path: "profile/:userId", element: <UserProfilePage /> },
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
    <LanguageProvider>
      <RouterProvider router={router} />
    </LanguageProvider>
  );
}

export default App;
