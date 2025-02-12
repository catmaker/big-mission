import { SignupForm } from "./components/signup-form";

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-[#fbfbfd]">
      <div className="container mx-auto px-4">
        <div className="max-w-[460px] mx-auto pt-24 pb-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-semibold tracking-tight mb-3">
              Bigs 회원가입
            </h1>
            <p className="text-gray-500 text-sm">
              이미 계정이 있으신가요?
              <a href="/signin" className="text-blue-600 hover:underline ml-1">
                로그인
              </a>
            </p>
          </div>

          <SignupForm />
        </div>
      </div>
    </div>
  );
}
