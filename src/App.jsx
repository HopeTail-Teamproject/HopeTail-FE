// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./language/LanguageContext";

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

function App() {
  return (
    <LanguageProvider>
      <Router>
        <Routes>
          <Route path="/adopt" element={<AdoptSelect />} />
          <Route path="/adopt/:id" element={<AdoptPage />} />
          <Route path="/adoption_Page" element={<AdoptionPage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/community/guideline" element={<CommunityGuideline />} />
          <Route path="/community/newpost" element={<CommunityNewpost />} />
          <Route path="/community/post" element={<CommunityPost />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/bookmark" element={<BookmarkPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/files" element={<FilesPage />} />
          <Route path="/rehome" element={<RehomePage />} />
          <Route path="/rehome2" element={<RehomePage2 />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </LanguageProvider>
  );
}

export default App;
