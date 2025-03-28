import { User } from '@/store/useAuthStore';
import {ColumnDef} from '@tanstack/react-table';

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: "Id"
  },
  {
    accessorKey: "avatar",
    header: "Avatar"
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