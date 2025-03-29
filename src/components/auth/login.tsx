import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Link, useNavigate } from "react-router-dom";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import userLogin from '@/actions/login';
import { loginSchema } from "@/schema";
import { useAuthStore } from '@/store/useAuthStore';
import toast from "react-hot-toast";
import axios from "axios";
import getUserByEmail from "@/actions/users/get-userByEmail";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const login = useAuthStore((state) => state.login);

  const handleLogin = async (values: z.infer<typeof loginSchema>) => {
    try {
      setLoading(true);

      const token = await userLogin(values);

      const user = await getUserByEmail(values.email);
      
      login(user, token);
      toast.success("Successfully logged in");
    
      navigate("/dashboard");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.status === 400) {
          toast.error(error.response?.data.error);
        } 
      } else {
        toast.error("Something went wrong")
      }
    } finally {
      setLoading(false);
    } 
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-[400px] flex flex-col">
        <h1 className="text-xl font-semibold mb-4">Log in to your account</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="mitsuri@outlook.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={loading} type="submit" className="cursor-pointer">Log in</Button>
          </form>
        </Form>
         
        <Link to={"/"} className="hover:underline hover:text-blue-400 my-4">Go back to home page</Link>
      </div>
    </div>
  );
}
