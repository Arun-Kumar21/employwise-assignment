import getAllUsers from "@/actions/users/get-users";
import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";
import { User } from "./useAuthStore";

interface UserStoreProps {
  users: User[],
  fetchUsers: () => void;
  editUser: (email:string, updatedData: User) => void;
  deleteUser: (email: string) => void;
}


const useUserStore = create<UserStoreProps>((set) => ({
  users: [],

  fetchUsers: async () => {
    try {
      const data = await getAllUsers();
      set({users: data})
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.error);
      } else {
        toast.error("Something went wrong");
      }
    }
  },

  editUser: (email:string, updatedData: User) => {
    set((state) => ({
      users: state.users.map((user)=> user.email === email ? {...user, ...updatedData}: user)
    }))
  },

  deleteUser: (email:string) => {
    set((state) => ({
      users: state.users.filter((user) => user.email !== email),
    }))
    toast.success("User deleted successfully")
  }
}))


export default useUserStore;