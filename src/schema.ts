import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().min(3).email('Email must be atleast 3 character long.'),
  password: z.string().min(8, "Password must be atleast 8 character long.")
})
