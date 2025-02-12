"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { NextImageComponent } from "@/components/next-image-component";
import { Spinner } from "@/components/ui/spinner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useState } from "react";
import { EditSchema, EditForm } from "./edit-validation";

interface EditFormProps {
  post: any;
  onSubmit: (data: EditForm) => void;
  onCancel: () => void;
  isSubmitting: boolean;
}

export function EditFormComponent({
  post,
  onSubmit,
  onCancel,
  isSubmitting,
}: EditFormProps) {
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<EditForm>({
    resolver: zodResolver(EditSchema),
    values: {
      title: post?.title || "",
      content: post?.content || "",
      category: post?.category || "FREE",
    },
  });

  const title = watch("title");
  const content = watch("content");
  const isDisabled = !title || !content || isSubmitting;

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewImage(url);
    }
  };

  return (
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
            <p className="text-sm text-red-500">{errors.content.message}</p>
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
          onClick={onCancel}
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
  );
}
