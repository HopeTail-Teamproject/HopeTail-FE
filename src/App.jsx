import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./context/language/LanguageContext";

import MainPage from "./routes/mainPage/MainPage";
import BasicLayout from "./layouts/BasicLayout";
import AuthLayout from "./layouts/AuthLayout";
import LoginPage from "./routes/authPage/LoginPage";
import SignupPage from "./routes/authPage/SingupPage";
import AboutPage from "./routes/aboutPage/AboutPage";
import AdoptionPage from "./routes/adoptionPage/AdoptionPage";
import CareGuidePage from "./routes/careGuidePage/CareGuidePage";
import ChatPage from "./routes/chatPage/ChatPage";

import AdoptSelect from "./routes/adoptPage/AdoptSelect";
import AdoptPage from "./routes/adoptPage/AdoptPage";

import CommunityPage from "./routes/communityPage/CommunityPage";
import CommunityGuideline from "./routes/communityPage/CommunityGuideline";
import CommunityNewpost from "./routes/communityPage/CommunityNewpost";
import CommunityPost from "./routes/communityPage/CommunityPost";

import UserPage from "./routes/userPage/UserPage";  
import BookmarkPage from "./routes/bookmarkPage/BookmarkPage";
import FavoritesPage from "./routes/favoritesPage/FavoritesPage";
import FilesPage from "./routes/filesPage/FilesPage";

import RehomePage from "./routes/rehomePage/RehomePage";
import RehomePage2 from "./routes/rehomePage/RehomePage2";

import ErrorPage from "./routes/errorPage/ErrorPage";

function App() {
  return (
    <LanguageProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/adopt" element={<AdoptSelect />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/community/post" element={<CommunityPost />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/care-guide" element={<CareGuidePage />} />
          <Route path="/chat" element={<ChatPage />} />

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
        </Routes>
      </Router>
    </LanguageProvider>
  );
}

export default App;
