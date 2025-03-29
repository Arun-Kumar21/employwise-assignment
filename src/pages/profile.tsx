import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { userFormSchema } from "@/schema";
import { useAuthStore, User } from "@/store/useAuthStore";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useUserStore from "@/store/useUserStore";

export default function ProfilePage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {user, updateUser} = useAuthStore();
  const { users, editUser } = useUserStore();

  
  if (!user) {
    navigate("/");
    return null;
  }

  const currentUser = users.find((u) => u.email === user.email)

  if (!currentUser) {
    navigate("/")
    return null;
  }

  const form = useForm<z.infer<typeof userFormSchema>>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      firstname: currentUser?.first_name,
      lastname: currentUser?.last_name,
      email: currentUser?.email,
    },
  });

  const handleFormEdit = async (values: z.infer<typeof userFormSchema>) => {
    try {
      setLoading(true);

      const res = await axios.put(`${import.meta.env.VITE_SERVER_URL}/api/users/${user.id}`, {
        email: values.email,
        first_name: values.firstname,
        last_name: values.lastname
      });

      const updateDetails: User = {
        id: user.id,
        email: values.email,
        first_name: values.firstname,
        last_name: values.lastname,
        avatar: user.avatar
      } 

      editUser(currentUser.email, updateDetails);
      updateUser({id: user.id, avatar: user.avatar, email:values.email, first_name: values.firstname, last_name: values.lastname});

      if (res.status === 200) {
        toast.success("Details updated successfully")
        navigate("/dashboard");
      }

    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.status === 400) {
          toast.error(error.response?.data.error);
        }
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-2 w-full flex flex-col items-center justify-center">
      <h1 className="text-xl font-semibold mt-4">Edit your profile</h1>

      <div className="w-full sm:w-[400px] my-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleFormEdit)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="firstname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={loading} type="submit" className="cursor-pointer">
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
