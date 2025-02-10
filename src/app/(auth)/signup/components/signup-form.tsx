"use client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signupSchema, type SignupForm } from "./signup-validation";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSignupMutation } from "@/lib/mutations/auth";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export function SignupForm() {
  const router = useRouter();
  const form = useForm<SignupForm>({
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
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={`space-y-6 ${isPending ? "opacity-50 pointer-events-none" : ""}`}
      >
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
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>이름</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="홍길동"
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
                    placeholder="8자 이상 입력해주세요"
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
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>비밀번호 확인</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    placeholder="비밀번호를 한번 더 입력해주세요"
                    className="h-12 px-4 rounded-xl bg-white border-gray-300 focus:border-gray-500 focus:ring-0"
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
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
    </Form>
  );
}
