import AuthProvider from "@/context/AuthProvider.jsx";
import {Suspense} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingPage from "../pages/loading/LoadingPage.jsx";


export function AppRouter (){


  return(
    <AuthProvider>
      <Suspense fallback={<LoadingPage />}>
        <Router>
          <Routes>
              <Route path="/" element={<LoadingPage />} />

          </Routes>
        </Router>
      </Suspense>

    </AuthProvider>
  );
}
