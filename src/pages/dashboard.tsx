import { useEffect, useState } from "react";

import UserNav from "@/components/navigation/user-nav";
import { columns } from "@/components/user-table/columns";
import { DataTable } from "@/components/user-table/data-table";
import getAllUsers from "@/actions/users/get-users";
import toast from "react-hot-toast";
import axios from "axios";

export default function DashboardPage () {
  const [usersData, setUsersData] = useState<any>([]);

  const fetchUserData = async () => {
    try {
      const data = await getAllUsers();
      setUsersData(data);
    } catch (error) {
      console.log("DATA_TABLE_ERROR:", error);
      if (axios.isAxiosError(error)) {
        if (error.status === 400) {
          toast.error(error.response?.data.error);
        }
      } else {
        toast.error("Something went wrong");
      }
    }
  }

  useEffect(() => {
    fetchUserData()
  }, [])

  return (
    <div className="min-h-screen w-full h-full">
      <UserNav />

      <div className="mx-auto w-full md:max-w-3xl my-12">
        <h1 className="my-4 text-xl font-semibold">Reqres User Record</h1>
        <DataTable columns={columns} data={usersData}/>  
      </div>
    </div>
  )
}