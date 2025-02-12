"use client";

import { Button } from "@/components/ui/button";
import BoardSection from "@/components/board-section";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#fbfbfd]">
      {/* 히어로 섹션 */}
      <section className="pt-24 pb-16 text-center">
        <div className="space-y-4">
          <h1 className="text-5xl font-semibold tracking-tight">
            Community Board
          </h1>
          <p className="text-xl text-gray-500">
            Share your thoughts with the world.
          </p>
        </div>
      </section>

      {/* 카테고리 섹션 */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {["General", "Notice", "Question"].map((category) => (
              <div
                key={category}
                className="bg-[#fbfbfd] rounded-2xl p-8 cursor-pointer 
                         transition-all duration-200 hover:shadow-lg hover:-translate-y-1"
              >
                <h3 className="text-2xl font-semibold mb-4">{category}</h3>
                <p className="text-gray-500">
                  Explore posts in {category.toLowerCase()} category
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* 게시판 섹션 */}
      <BoardSection />

      {/* CTA 섹션 */}
      <section className="py-20 bg-black text-white text-center">
        <div className="container mx-auto px-4">
          <div className="space-y-6">
            <h2 className="text-4xl font-semibold">Ready to join?</h2>
            <p className="text-xl text-gray-400">
              Start sharing your thoughts with our community
            </p>
            <Button
              className="bg-white text-black hover:bg-gray-100 mt-4 
                       transition-colors duration-200"
            >
              Get Started
            </Button>
          </div>
        </div>
      </section>
      {/* 푸터 */}
      <Footer />
    </div>
  );
}
