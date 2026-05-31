import z from "zod"

export const registerUserSchema = z
  .object({
    username: z.string().min(1, "Username is required").max(50, "Too long username"),
    email: z.email("Invalid email").max(50, "Too long email"),
    password: z.string("Password is required").min(8, "Must be at least 8 characters").max(50, "Too long password"),
    confirmPassword: z
      .string("Repeat password is required")
      .min(8, "Must be at least 8 characters")
      .max(50, "Too long password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "Passwords don`t match",
    path: ["confirmPassword"],
  })

export type RegisterUserSchema = z.output<typeof registerUserSchema>
