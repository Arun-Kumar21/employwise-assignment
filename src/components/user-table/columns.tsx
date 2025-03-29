import { useAuthStore, User } from '@/store/useAuthStore';
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import {ColumnDef} from '@tanstack/react-table';
import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { EllipsisVertical } from 'lucide-react';
import { DropdownMenuContent } from '@/components/ui/dropdown-menu';
import { useNavigate } from 'react-router-dom';
import useUserStore from '@/store/useUserStore';

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: "Id"
  },
  {
    accessorKey: "avatar",
    header: "Avatar",
    cell : ({ row }) => (
      <Avatar>
        <AvatarImage src={row.getValue("avatar")}/>
      </Avatar>
    )
  },
  {
    accessorKey: "first_name",
    header: "First Name"
  },
  {
    accessorKey: "last_name",
    header: "Last Name"
  },
  {
    accessorKey: "email",
    header: "Email"
  }, 
  {
    accessorKey: "action",
    header: "Action",
    cell: ({row}) =>{ 
      const user = useAuthStore((state) => state.user)
      const navigate = useNavigate();

      const { deleteUser } = useUserStore();

      return (
      <DropdownMenu>
        <DropdownMenuTrigger className='bg-zinc-200 p-2 rounded-md hover:bg-zinc-300 cursor-pointer'>
          <EllipsisVertical size={18}/>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => navigate(`/users/${row.getValue("email")}`)}>View Profile</DropdownMenuItem>
          {row.getValue("email") === user?.email && (
            <DropdownMenuItem onClick={() => navigate("/user/profile")}>Edit Profile</DropdownMenuItem>
          )}
          {row.getValue("email") !== user?.email && (
            <DropdownMenuItem onClick={()=>deleteUser(row.getValue("email"))} className='text-red-500'>Delete User</DropdownMenuItem>
          )} 
        </DropdownMenuContent>
      </DropdownMenu>
    )}
  }
]