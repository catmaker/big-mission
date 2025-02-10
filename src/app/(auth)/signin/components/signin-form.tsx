import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { signinSchema, type SigninForm } from "./signin-validation";
import { useSigninMutation } from "@/lib/mutations/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function SigninForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninForm>({
    resolver: zodResolver(signinSchema),
  });

  const { mutate, isPending } = useSigninMutation(() => {
    window.location.href = "/";
  });

  const onSubmit = (data: SigninForm) => {
    mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="username">이메일</Label>
          <Input
            id="username"
            type="email"
            placeholder="example@email.com"
            className="h-12 px-4 rounded-xl bg-white border-gray-300 focus:border-gray-500 focus:ring-0"
            {...register("username")}
            disabled={isPending}
          />

          {errors.username && (
            <p className="text-sm text-red-500 mt-1">
              {errors.username.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">비밀번호</Label>
            <Link
              href="/forgot-password"
              className="text-sm text-blue-600 hover:underline"
            >
              비밀번호 찾기
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            placeholder="비밀번호를 입력하세요"
            className="h-12 px-4 rounded-xl bg-white border-gray-300 focus:border-gray-500 focus:ring-0"
            {...register("password")}
            disabled={isPending}
          />

          {errors.password && (
            <p className="text-sm text-red-500 mt-1">
              {errors.password.message}
            </p>
          )}
        </div>
      </div>

      <div className="pt-2">
        <Button
          type="submit"
          disabled={isPending}
          className="w-full h-12 text-base bg-black hover:bg-gray-800 rounded-xl disabled:opacity-50"
        >
          {isPending ? "로그인 중..." : "로그인"}
        </Button>
      </div>

      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 text-gray-500 bg-[#fbfbfd]">또는</span>
        </div>
      </div>

      <div className="text-center">
        <p className="text-gray-600">
          계정이 없으신가요?
          <Link
            href="/signup"
            className="text-blue-600 hover:underline font-medium"
          >
            회원가입
          </Link>
        </p>
      </div>
    </form>
  );
}
