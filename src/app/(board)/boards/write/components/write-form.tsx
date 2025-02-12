import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { writeSchema, type WriteForm } from "./write-validation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface WriteFormProps {
  onSubmit: (data: WriteForm) => Promise<void>;
}

export function WriteForm({ onSubmit }: WriteFormProps) {
  const form = useForm<WriteForm>({
    resolver: zodResolver(writeSchema),
    defaultValues: {
      title: "",
      content: "",
      file: undefined,
      category: "FREE",
    },
  });

  const {
    watch,
    formState: { isSubmitting },
  } = form;

  const title = watch("title");
  const content = watch("content");
  const isDisabled = !title || !content || isSubmitting;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-6">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-full h-12 px-4 rounded-xl bg-white border-gray-300 focus:border-gray-500 focus:ring-0">
                    <SelectValue placeholder="카테고리 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="FREE">자유게시판</SelectItem>
                    <SelectItem value="NOTICE">공지사항</SelectItem>
                    <SelectItem value="QNA">질문답변</SelectItem>
                    <SelectItem value="ETC">기타</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="제목을 입력하세요"
                    className="text-xl h-14 px-4 rounded-xl bg-white border-gray-300 focus:border-gray-500 focus:ring-0"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="내용을 입력하세요"
                    className="min-h-[400px] p-4 rounded-xl bg-white border-gray-300 focus:border-gray-500 focus:ring-0 resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="file"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-black file:text-white
                    hover:file:bg-gray-800 h-full py-4"
                    onChange={(e) => {
                      const files = e.target.files;
                      if (files?.length) {
                        field.onChange(files);
                      }
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => window.history.back()}
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
            {isSubmitting ? "작성 중..." : "작성하기"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
