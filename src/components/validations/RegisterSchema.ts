import { z } from "zod";

// Define the schema for registration form inputs
const registerSchema = z
  .object({
    fName: z.string().min(1, { message: "الاسم الاول مطلوب" }),
    lName: z.string().min(1, { message: "الاسم الاخير مطلوب" }),
    email: z.string().min(1, { message: "البريد الالكتروني مطلوب" }).email(),
    password: z
      .string()
      .min(8, { message: "الباسورد يجب ان يكون اكبر من 8 حروف " })
      .regex(/.*[!@#$%^&*()-+{}|[\]\\:";'<>?,./].*/, {
        message: "الباسورد يجب ان يحتوي على الاقل حرف خاص",
      }),
    confirmPassword: z.string(),
  })
  .refine((input) => input.password === input.confirmPassword, {
    message: "تأكد من تطابق كلمة السر",
    path: ["confirmPassword"],
  });

// Define TypeScript type for the form inputs
type TinputsForm = z.infer<typeof registerSchema>;

export { type TinputsForm, registerSchema };
