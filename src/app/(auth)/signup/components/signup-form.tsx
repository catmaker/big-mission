"use client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signupValidation, type SignupForm } from "./signup-validation";
import { FormField } from "./signup-form-field";
import { authService, AuthError } from "@/lib/services/auth";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function SignupForm() {
  const router = useRouter();
  const {
    register,

    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupForm>({
    resolver: zodResolver(signupValidation),
  });

  const onSubmit = async (data: SignupForm) => {
    try {
      await authService.signup(data);
      toast.success("회원가입에 성공했습니다.");
      router.push("/signin");
    } catch (error) {
      console.error(error);
      if (error instanceof AuthError) {
        toast.error(error.message);
      } else {
        toast.error("회원가입에 실패했습니다. 다시 시도해주세요.");
      }
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`space-y-6 ${isSubmitting ? "opacity-50 pointer-events-none" : ""}`}
    >
      <div className="space-y-4">
        <FormField
          label="이메일"
          id="username"
          type="email"
          placeholder="example@email.com"
          register={register("username")}
          error={errors.username}
          disabled={isSubmitting}
        />

        <FormField
          label="이름"
          id="name"
          type="text"
          placeholder="홍길동"
          register={register("name")}
          error={errors.name}
          disabled={isSubmitting}
        />

        <FormField
          label="비밀번호"
          id="password"
          type="password"
          placeholder="8자 이상 입력해주세요"
          register={register("password")}
          error={errors.password}
          disabled={isSubmitting}
        />

        <FormField
          label="비밀번호 확인"
          id="confirmPassword"
          type="password"
          placeholder="비밀번호를 한번 더 입력해주세요"
          register={register("confirmPassword")}
          error={errors.confirmPassword}
          disabled={isSubmitting}
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
