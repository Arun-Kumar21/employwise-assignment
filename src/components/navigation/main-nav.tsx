import { Link, useLocation } from "react-router-dom";

import { useAuthStore } from "@/store/useAuthStore";

export default function MainNav ({header} : {header?:string}) {
  const location = useLocation()
  const currentPath = location.pathname

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <div className="h-14 border-b px-4 flex items-center justify-between">
      <h1 className="font-semibold">{header ? header : "Reqres"}</h1>
      <div className="flex text-sm items-center gap-x-4">
        <Link to={"/"} className={`hover:underline ${currentPath === "/" && "text-blue-400"}`}>Home</Link>

        {isAuthenticated ? (
          <Link to={'/dashboard'} className="hover:underline">Dashboard</Link>
        ): (
          <Link to={'/login'} className="hover:underline">login</Link>
        )}
      </div>
    </div>
  )
}