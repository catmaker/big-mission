"use client";

import { Button } from "@/components/ui/button";
import BoardSection from "@/components/board-section";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#fbfbfd]">
      {/* 히어로 섹션 */}
      <section className="pt-32 pb-24 text-center">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto space-y-6">
            <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
              프론트엔드 게시판
            </h1>
            <p className="text-xl text-gray-600">
              간단하고 직관적인 게시판 서비스를 경험해보세요
            </p>
            <div className="pt-4">
              <Button
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-6 rounded-xl text-lg
                         transition-all duration-200 hover:shadow-lg"
                onClick={() => {
                  router.push("/boards");
                }}
              >
                시작하기
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 기능 소개 섹션 */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "게시글 작성",
                description: "마크다운 에디터로 쉽고 빠르게 글을 작성하세요",
                icon: "✍️"
              },
              {
                title: "카테고리",
                description: "공지사항, 자유게시판, Q&A 등 다양한 카테고리",
                icon: "📑"
              },
              {
                title: "이미지 첨부",
                description: "게시글에 이미지를 자유롭게 첨부할 수 있습니다",
                icon: "🖼️"
              }
            ].map((feature) => (
              <div
                key={feature.title}
                className="bg-[#fbfbfd] rounded-2xl p-8 border border-gray-100
                         transition-all duration-200 hover:shadow-md hover:border-indigo-100"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-indigo-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 최신 게시글 섹션 */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <BoardSection />
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="py-24 bg-gradient-to-r from-indigo-600 to-blue-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl font-bold">지금 바로 시작하세요</h2>
            <p className="text-indigo-100">
              간단한 회원가입으로 모든 기능을 이용할 수 있습니다
            </p>
            <Button
              className="bg-white text-indigo-600 hover:bg-indigo-50 px-8 py-6 rounded-xl text-lg
                       transition-all duration-200 hover:shadow-lg"
              onClick={() => {
                router.push("/boards");
              }}
            >
              시작하기
            </Button>
          </div>
        </div>
      </section>

    </div>
  );
}