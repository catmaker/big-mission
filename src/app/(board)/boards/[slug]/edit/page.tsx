"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { z } from "zod";
import { fetchWithAuth } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { NextImageComponent } from "@/components/next-image-component";
import { Spinner } from "@/components/ui/spinner";
import { useState, useEffect } from "react";
import Image from "next/image";

const editSchema = z.object({
  title: z
    .string()

    .min(1, "제목을 입력해주세요")
    .max(100, "제목은 100자 이내로 입력해주세요"),
  content: z
    .string()
    .min(1, "내용을 입력해주세요")
    .max(2000, "내용은 2000자 이내로 입력해주세요"),
  category: z.enum(["NOTICE", "FREE", "QNA", "ETC"]).default("FREE"),
  file: z.instanceof(FileList).optional(),
});

type EditForm = z.infer<typeof editSchema>;

export default function BoardEditPage({
  params,
}: {
  params: { slug: string };
}) {
  const router = useRouter();
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const { data: post, isLoading } = useQuery({
    queryKey: ["board", params.slug],
    queryFn: async () => {
      const response = await fetchWithAuth(
        `https://front-mission.bigs.or.kr/boards/${params.slug}`
      );
      return response.json();
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<EditForm>({
    resolver: zodResolver(editSchema),
    values: {
      title: post?.title || "",
      content: post?.content || "",
      category: post?.category || "FREE",
    },
  });

  const title = watch("title");
  const content = watch("content");

  const isDisabled = !title || !content || isSubmitting;

  const onSubmit = async (data: EditForm) => {
    const loadingToast = toast.loading("게시글을 수정하고 있습니다...");

    try {
      const formData = new FormData();

      const requestBlob = new Blob(
        [
          JSON.stringify({
            title: data.title,
            content: data.content,
            category: data.category,
          }),
        ],
        { type: "application/json" }
      );
      formData.append("request", requestBlob);

      if (data.file?.[0]) {
        formData.append("file", data.file[0]);
      }

      const response = await fetchWithAuth(
        `https://front-mission.bigs.or.kr/boards/${params.slug}`,
        {
          method: "PATCH",
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "게시글 수정에 실패했습니다");
      }

      toast.success("게시글이 수정되었습니다!", { id: loadingToast });
      router.push(`/boards/${params.slug}`);
    } catch (error) {
      console.error("에러:", error);
      toast.error(
        error instanceof Error ? error.message : "게시글 수정에 실패했습니다",
        { id: loadingToast }
      );
    }
  };
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewImage(url);
    }
  };

  const cleanPreviewImage = () => {
    if (previewImage) {
      URL.revokeObjectURL(previewImage);
      setPreviewImage(null);
    }
  };
  useEffect(() => {
    return () => {
      cleanPreviewImage();
    };
  }, []);
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#fbfbfd] py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-[800px] mx-auto py-12">
            <div className="mb-8">
              <Skeleton className="h-10 w-48" />
              <Skeleton className="h-6 w-72 mt-2" />
            </div>

            <div className="space-y-8">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Skeleton className="h-12 w-full rounded-xl" />
                </div>

                <div className="space-y-2">
                  <Skeleton className="h-14 w-full rounded-xl" />
                </div>

                <div className="space-y-2">
                  <Skeleton className="h-[400px] w-full rounded-xl" />
                </div>

                <div className="space-y-2">
                  <Skeleton className="h-14 w-full rounded-xl" />
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <Skeleton className="h-11 w-24 rounded-xl" />
                <Skeleton className="h-11 w-24 rounded-xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fbfbfd] py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-[800px] mx-auto py-12">
          <div className="mb-8">
            <h1 className="text-3xl font-semibold tracking-tight">
              게시글 수정
            </h1>
            <p className="mt-2 text-gray-500">게시글 내용을 수정해주세요</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <select
                  {...register("category")}
                  className="block w-full h-12 px-4 rounded-xl bg-white focus:border-gray-500 focus:ring-0"
                >
                  <option value="FREE">자유게시판</option>
                  <option value="NOTICE">공지사항</option>
                  <option value="QNA">질문답변</option>
                  <option value="ETC">기타</option>
                </select>
              </div>

              <div className="space-y-2">
                <Input
                  placeholder="제목을 입력하세요"
                  className="text-xl h-14 px-4 rounded-xl bg-white border-gray-300 focus:border-gray-500 focus:ring-0"
                  {...register("title")}
                />
                {errors.title && (
                  <p className="text-sm text-red-500">{errors.title.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Textarea
                  placeholder="내용을 입력하세요"
                  className="min-h-[400px] p-4 rounded-xl bg-white border-gray-300 focus:border-gray-500 focus:ring-0 resize-none"
                  {...register("content")}
                />
                {errors.content && (
                  <p className="text-sm text-red-500">
                    {errors.content.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                {previewImage ? (
                  <div className="mb-4">
                    <p className="text-sm text-gray-500 mb-2">
                      새로운 이미지 미리보기:
                    </p>
                    <div className="flex justify-center">
                      <Image
                        src={previewImage}
                        alt="미리보기"
                        width={0}
                        height={0}
                        sizes="(max-width: 768px) 100vw, 800px"
                        className="w-full h-auto object-contain max-w-3xl"
                        style={{ maxHeight: "800px" }}
                      />
                    </div>
                  </div>
                ) : post?.imageUrl ? (
                  <div className="mb-4">
                    <p className="text-sm text-gray-500 mb-2">현재 이미지:</p>
                    <div className="flex justify-center">
                      <NextImageComponent path={post.imageUrl} />
                    </div>
                  </div>
                ) : null}

                <Input
                  type="file"
                  accept="image/*"
                  className="block w-full text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-black file:text-white
          hover:file:bg-gray-800 h-full py-4"
                  {...register("file", {
                    onChange: handleImageChange,
                  })}
                />
                {errors.file && (
                  <p className="text-sm text-red-500">{errors.file.message}</p>
                )}
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                className="px-6 h-11 rounded-xl"
              >
                취소
              </Button>
              <Button
                type="submit"
                disabled={isDisabled}
                className={`px-6 h-11 rounded-xl ${
                  isDisabled
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-black hover:bg-gray-800"
                }`}
              >
                {isSubmitting ? <Spinner className="w-4 h-4" /> : "수정하기"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
