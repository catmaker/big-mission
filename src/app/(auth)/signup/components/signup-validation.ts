import { z } from "zod";

export const signupSchema = z
  .object({
    username: z.string().email("올바른 이메일 형식이 아닙니다"),
    name: z
      .string()
      .min(2, "이름은 2글자 이상이어야 합니다")
      .max(10, "이름은 10글자 이하여야 합니다"),
    password: z
      .string()
      .min(8, "비밀번호는 8자 이상이어야 합니다")
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!%*#?&])[A-Za-z\d!%*#?&]{8,}$/,
        "비밀번호는 영문, 숫자, 특수문자(!%*#?&) 1개 이상을 포함해야 합니다"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다",
    path: ["confirmPassword"],
  });

export type SignupForm = z.infer<typeof signupSchema>;
