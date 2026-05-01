import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
   <Routes>
   <Route path="/landing-page" element={<LandingPage />}/>
   <Route path="/dashboard" element={<MainLayout />}>
    <Route index element={<Dashboard />}/>
    </Route>
   </Routes>
  );
}

export default App;