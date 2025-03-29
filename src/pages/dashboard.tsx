import UserNav from "@/components/navigation/user-nav";
import { columns } from "@/components/user-table/columns";
import { DataTable } from "@/components/user-table/data-table";
import useUserStore from "@/store/useUserStore";

export default function DashboardPage () {
  /*
  const [usersData, setUsersData] = useState<any>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); 

  const fetchUserDataByPage = async () => {
    try {
      const res = await getUserByPage(page);
      setUsersData(res.data);
      setTotalPages(res.total_pages)
    } catch (error) {
      console.log("DATA_TABLE_ERROR:", error);
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.error);
      } else {
        toast.error("Something went wrong");
      }
    }
  }

  useEffect(() => {
    fetchUserDataByPage()
  }, [page])

  */

  const {users} = useUserStore();

  return (
    <div className="min-h-screen w-full h-full">
      <UserNav />

      <div className="mx-auto p-2 w-full md:max-w-3xl my-12">
        <h1 className="my-4 text-xl font-semibold">Reqres User Record</h1>
        <DataTable columns={columns} data={users}/>  
      </div>
    </div>
  )
}