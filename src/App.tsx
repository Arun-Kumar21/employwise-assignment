import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import HomePage from "./pages/home";
import LoginPage from "./components/auth/login";

import { useAuthStore } from "./store/useAuthStore";
import DashboardPage from "./pages/dashboard";

export default function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/login",
      element: isAuthenticated ? <Navigate to={'/dashboard'} /> : <LoginPage/>,
    },
    {
      path: "/dashboard",
      element: isAuthenticated ? <DashboardPage /> : <Navigate to={'/login'}/>
    },
    {
      path: "/user",
      element: isAuthenticated ? <></> : <Navigate to={'/login'} />,
    },
  ]);

  return (
    <div>
      <Toaster />
      <RouterProvider router={router} />
    </div>
  );
}
