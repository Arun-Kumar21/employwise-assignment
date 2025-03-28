import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { userRoutes } from "./routes";
import { useAuthStore } from "@/store/useAuthStore";
import { Button } from "../ui/button";

export default function UserNav () {
  const location = useLocation();
  const currentPath = location.pathname 

  const navigate = useNavigate();

  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    toast.success("Successfully logout");
    navigate("/");
  } 

  return (
    <div className="h-14 border-b px-4 flex items-center justify-between">
      <h1 className="font-semibold">Main</h1>
      <div className="flex text-sm items-center gap-x-4">
        {userRoutes.map((route) => (
          <Link to={route.path} key={route.path} className={`hover:underline ${currentPath === route.path ? "underline text-blue-400" : ""}`}>{route.label}</Link>
        ))}
        <Button variant={"link"} className="hover:text-red-400" onClick={() => handleLogout()}>Logout</Button>
      </div>
    </div>
  )
}
