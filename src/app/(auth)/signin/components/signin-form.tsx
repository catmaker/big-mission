import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { signinSchema, type SigninForm } from "./signin-validation";
import { useSigninMutation } from "@/lib/mutations/auth";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export function SigninForm() {
  const form = useForm<SigninForm>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { mutate, isPending } = useSigninMutation(() => {
    console.log("로그인 성공");
    console.log("localStorage 상태:", {
      accessToken: localStorage.getItem("accessToken"),
      refreshToken: localStorage.getItem("refreshToken"),
    });
    console.log("쿠키 상태:", document.cookie);

    setTimeout(() => {
      window.location.href = "/";
    }, 500);
  });

  const onSubmit = (data: SigninForm) => {
    console.log("로그인 시도:", data);
    mutate(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>이메일</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    placeholder="example@email.com"
                    className="h-12 px-4 rounded-xl bg-white border-gray-300 focus:border-gray-500 focus:ring-0"
                    disabled={isPending}
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
                <FormLabel>비밀번호</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    placeholder="비밀번호를 입력하세요"
                    className="h-12 px-4 rounded-xl bg-white border-gray-300 focus:border-gray-500 focus:ring-0"
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="pt-2">
          <Button
            type="submit"
            disabled={isPending}
            className="w-full h-12 text-base bg-black hover:bg-gray-800 rounded-xl disabled:opacity-50"
          >
            {isPending ? (
              <>
                <Spinner className="w-4 h-4 mr-2" />
              </>
            ) : (
              "로그인"
            )}
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
              className="text-blue-600 hover:underline font-medium ml-1"
            >
              회원가입
            </Link>
          </p>
        </div>
      </form>
    </Form>
  );
}
