import { z } from "zod";

export const writeSchema = z.object({
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

export type WriteForm = z.infer<typeof writeSchema>;
