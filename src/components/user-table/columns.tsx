import { User } from '@/store/useAuthStore';
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import {ColumnDef} from '@tanstack/react-table';

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
]