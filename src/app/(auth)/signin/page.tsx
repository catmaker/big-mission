"use client";

import { SigninForm } from "./components/signin-form";

export default function SigninPage() {
  return (
    <div className="min-h-screen bg-[#fbfbfd]">
      <div className="container mx-auto px-4">
        <div className="max-w-[380px] mx-auto pt-24 pb-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-semibold tracking-tight mb-3">
              로그인
            </h1>
            <p className="text-gray-500 text-sm">Bigs에 오신 것을 환영합니다</p>
          </div>

          <SigninForm />
        </div>
      </div>
    </div>
  );
}
