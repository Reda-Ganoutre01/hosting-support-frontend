import AuthProvider from "@/context/AuthProvider.jsx";
import {Suspense} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoadingPage } from "../pages/loading/LoadingPage.jsx";

import HomePage from "../pages/HomePage.jsx";
import LoginPage from "../pages/LoginPage.jsx";

export function AppRouter (){
  return(
    <AuthProvider>
      <Suspense fallback={<LoadingPage />}>
        <Router>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<HomePage />} />
          </Routes>
        </Router>
      </Suspense>
    </AuthProvider>
  );
}
