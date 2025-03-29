import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import HomePage from "./pages/home";
import LoginPage from "./components/auth/login";

import { useAuthStore } from "./store/useAuthStore";
import DashboardPage from "./pages/dashboard";
import ProfilePage from "./pages/profile";
import UserDetailPage from "./pages/user-details";
import UserNav from "./components/navigation/user-nav";
import MainNav from "./components/navigation/main-nav";
import useUserStore from "./store/useUserStore";
import { useEffect } from "react";

export default function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const { fetchUsers } = useUserStore();

  useEffect(() => {
    fetchUsers()
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <>
        <MainNav />
        <HomePage />
      </>,
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
      path: "/user/profile",
      element: isAuthenticated ? <>
        <UserNav />
      <ProfilePage /></> : <Navigate to={'/login'} />,
    },
    {
      path: "/users/:email",
      element: <>
        <MainNav header={"User Detail"}/>
        <UserDetailPage />
      </>
    }
  ]);

  return (
    <div>
      <Toaster />
      <RouterProvider router={router} />
    </div>
  );
}
