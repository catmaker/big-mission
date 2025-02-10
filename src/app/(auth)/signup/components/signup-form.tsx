"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const signupSchema = z
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

type SignupForm = z.infer<typeof signupSchema>;

export function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupForm) => {
    try {
      const response = await fetch(
        "https://front-mission.bigs.or.kr/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("회원가입에 실패했습니다");
      }

      window.location.href = "/signin";
    } catch (error) {
      console.error(error);
      alert("회원가입에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <FormField
          label="이메일"
          id="username"
          type="email"
          placeholder="example@email.com"
          register={register("username")}
          error={errors.username}
        />

        <FormField
          label="이름"
          id="name"
          type="text"
          placeholder="홍길동"
          register={register("name")}
          error={errors.name}
        />

        <FormField
          label="비밀번호"
          id="password"
          type="password"
          placeholder="8자 이상 입력해주세요"
          register={register("password")}
          error={errors.password}
        />

        <FormField
          label="비밀번호 확인"
          id="confirmPassword"
          type="password"
          placeholder="비밀번호를 한번 더 입력해주세요"
          register={register("confirmPassword")}
          error={errors.confirmPassword}
        />
      </div>

      <div className="pt-4">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-12 text-base bg-[#0076DF] hover:bg-[#2e91e7] rounded-xl disabled:opacity-50"
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center gap-2">
              <Spinner className="h-5 w-5 text-white" />
              <span>가입하기</span>
            </div>
          ) : (
            "가입하기"
          )}
        </Button>
      </div>

      <p className="text-sm text-gray-500 text-center pt-6">
        가입하면
        <a href="#" className="text-blue-600 hover:underline ml-1">
          이용약관
        </a>
        과
        <a href="#" className="text-blue-600 hover:underline ml-1">
          개인정보 처리방침
        </a>
        에 동의하게 됩니다.
      </p>
    </form>
  );
}

function FormField({
  label,
  id,
  type,
  placeholder,
  register,
  error,
}: {
  label: string;
  id: string;
  type: string;
  placeholder: string;
  register: any;
  error?: any;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        className="h-12 px-4 rounded-xl bg-white border-gray-300 focus:border-gray-500 focus:ring-0"
        {...register}
      />
      {error && <p className="text-sm text-red-500 mt-1">{error.message}</p>}
    </div>
  );
}
