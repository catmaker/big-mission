import { parseISO, format } from "date-fns";
import { ko } from "date-fns/locale";

export const formatDate = (dateString: string | undefined) => {
  if (!dateString) return "";
  try {
    const date = parseISO(dateString);
    return format(date, "PPP", { locale: ko });
  } catch (error) {
    console.error("Date formatting error:", error);
    return "날짜 정보 없음";
  }
};
