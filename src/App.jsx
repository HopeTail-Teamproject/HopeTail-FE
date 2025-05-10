import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./context/language/LanguageContext";

// 페이지 import
import AdoptSelect from "./pages/AdoptSelect";
import AdoptPage from "./pages/AdoptPage";
import AdoptionPage from "./pages/AdoptionPage";

import CommunityPage from "./pages/CommunityPage";
import CommunityGuideline from "./pages/CommunityGuideline";
import CommunityNewpost from "./pages/CommunityNewpost";
import CommunityPost from "./pages/CommunityPost";

import UserPage from "./pages/UserPage";
import BookmarkPage from "./pages/BookmarkPage";
import FavoritesPage from "./pages/FavoritesPage";
import FilesPage from "./pages/FilesPage";

import RehomePage from "./pages/RehomePage";
import RehomePage2 from "./pages/RehomePage2";

import ErrorPage from "./pages/ErrorPage";

// ✅ 필요하다면 main 브랜치에서 쓰이던 페이지도 import
// 예: MainPage, AboutPage, ChatPage, LoginPage, SignupPage
import MainPage from "./routes/mainPage/MainPage";
import AboutPage from "./routes/aboutPage/AboutPage";
import ChatPage from "./routes/chatPage/ChatPage";
import LoginPage from "./routes/authPage/LoginPage";
import SignupPage from "./routes/authPage/SingupPage";

import BasicLayout from "./layouts/BasicLayout";
import AuthLayout from "./layouts/AuthLayout";

function App() {
  return (
    <LanguageProvider>
      <Router>
        <Routes>
          {/* ❌ BasicLayout 없이 직접 렌더링 */}
          <Route path="/" element={<MainPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/adopt" element={<AdoptSelect />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/community/post" element={<CommunityPost />} />

          {/* ✅ BasicLayout 적용 라우트 */}
          <Route element={<BasicLayout />}>
            <Route path="/adopt/:id" element={<AdoptPage />} />
            <Route path="/adoption_Page" element={<AdoptionPage />} />

            <Route path="/community/guideline" element={<CommunityGuideline />} />
            <Route path="/community/newpost" element={<CommunityNewpost />} />

            <Route path="/user" element={<UserPage />} />
            <Route path="/bookmark" element={<BookmarkPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/files" element={<FilesPage />} />

            <Route path="/rehome" element={<RehomePage />} />
            <Route path="/rehome2" element={<RehomePage2 />} />
            <Route path="*" element={<ErrorPage />} />
          </Route>

          {/* Auth 전용 */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Route>
        </Routes>
      </Router>
    </LanguageProvider>
  );
}

export default App;
