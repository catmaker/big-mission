// src/app/test/page.tsx
"use client";

import { fetchWithAuth } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function TestPage() {
  const router = useRouter();

  const getRandomCategory = () => {
    const categories = ["FREE", "QNA", "NOTICE", "ETC"];
    const randomIndex = Math.floor(Math.random() * categories.length);
    return categories[randomIndex];
  };

  const createBulkPosts = async () => {
    const loadingToast = toast.loading("테스트 게시글을 생성하고 있습니다...");

    try {
      // 20개의 게시글 데이터 생성
      const promises = Array.from({ length: 20 }, (_, index) => {
        const formData = new FormData();

        const requestBlob = new Blob(
          [
            JSON.stringify({
              title: `테스트 게시글 ${index + 1}`,
              content: `테스트 내용 ${index + 1}`,
              category: getRandomCategory(), // 랜덤 카테고리 적용
            }),
          ],
          { type: "application/json" }
        );

        formData.append("request", requestBlob);

        return fetchWithAuth("https://front-mission.bigs.or.kr/boards", {
          method: "POST",
          body: formData,
        });
      });

      // 모든 요청을 병렬로 처리
      await Promise.all(promises);

      toast.success("20개의 게시글이 생성되었습니다!", { id: loadingToast });
      router.push("/");
    } catch (error) {
      console.error("에러:", error);
      toast.error(
        error instanceof Error ? error.message : "게시글 생성에 실패했습니다",
        { id: loadingToast }
      );
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h1 className="text-2xl font-bold mb-6">테스트 도구</h1>

        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h2 className="font-medium mb-2">대량 게시글 생성</h2>
            <p className="text-sm text-gray-600 mb-4">
              테스트용 게시글 20개를 자동으로 생성합니다.
            </p>
            <Button onClick={createBulkPosts} className="w-full">
              테스트 데이터 20개 생성
            </Button>
          </div>

          {/* 필요한 경우 다른 테스트 도구들 추가 */}
        </div>

        <div className="mt-6 pt-6 border-t">
          <Button
            variant="outline"
            onClick={() => router.push("/")}
            className="w-full"
          >
            게시판으로 돌아가기
          </Button>
        </div>
      </div>
    </div>
  );
}
