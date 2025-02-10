"use client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signupSchema, type SignupForm } from "./signup-validation";
import { FormField } from "./signup-form-field";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { useSignupMutation } from "@/lib/mutations/auth";

export function SignupForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: "",
      name: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { mutate: signup, isPending } = useSignupMutation(() => {
    router.push("/signin");
  });

  const onSubmit = (data: SignupForm) => {
    signup(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`space-y-6 ${isPending ? "opacity-50 pointer-events-none" : ""}`}
    >
      <div className="space-y-4">
        <FormField
          label="이메일"
          id="username"
          type="email"
          placeholder="example@email.com"
          register={register("username")}
          error={errors.username}
          disabled={isPending}
        />

        <FormField
          label="이름"
          id="name"
          type="text"
          placeholder="홍길동"
          register={register("name")}
          error={errors.name}
          disabled={isPending}
        />

        <FormField
          label="비밀번호"
          id="password"
          type="password"
          placeholder="8자 이상 입력해주세요"
          register={register("password")}
          error={errors.password}
          disabled={isPending}
        />

        <FormField
          label="비밀번호 확인"
          id="confirmPassword"
          type="password"
          placeholder="비밀번호를 한번 더 입력해주세요"
          register={register("confirmPassword")}
          error={errors.confirmPassword}
          disabled={isPending}
        />
      </div>

      <div className="pt-4">
        <Button
          type="submit"
          disabled={isPending}
          className="w-full h-12 text-base bg-[#0076DF] hover:bg-[#2e91e7] rounded-xl disabled:opacity-50"
        >
          {isPending ? (
            <div className="flex items-center justify-center gap-2">
              <Spinner className="h-5 w-5 text-white" />
            </div>
          ) : (
            "가입하기"
          )}
        </Button>
      </div>

      <p className="text-sm text-gray-500 text-center pt-6">
        가입하면
        <Link href="/terms" className="text-blue-600 hover:underline ml-1">
          이용약관
        </Link>
        과
        <Link href="/privacy" className="text-blue-600 hover:underline ml-1">
          개인정보 처리방침
        </Link>
        에 동의하게 됩니다.
      </p>
    </form>
  );
}
