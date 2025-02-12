import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-24 flex justify-center items-center h-screen">
      <div className="p-6">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-semibold">게시글을 찾을 수 없습니다</h1>
          <p className="text-gray-500">
            요청하신 게시글이 존재하지 않거나 삭제되었을 수 있습니다.
          </p>
          <Button asChild variant="outline">
            <Link href="/boards">게시판으로 돌아가기</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
