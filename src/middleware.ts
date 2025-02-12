import { NextResponse, type NextRequest } from "next/server";

function parseJwt(token: string) {
  try {
    const base64Payload = token.split(".")[1];
    const payload = Buffer.from(base64Payload, "base64").toString("utf-8");
    return JSON.parse(payload);
  } catch (e) {
    console.error("토큰 파싱 에러:", e);
    return null;
  }
}

export async function middleware(request: NextRequest) {
  console.log("=== 미들웨어 실행 ===");

  const protectedPaths = ["/boards"];
  const isProtectedPath = protectedPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  );

  if (!isProtectedPath) {
    return NextResponse.next();
  }

  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  if (!accessToken || !refreshToken) {
    console.log("❌ 토큰 없음");
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  // 토큰 디코딩 (로그용)
  const tokenData = parseJwt(accessToken);
  console.log("토큰 페이로드:", tokenData);

  // 토큰이 있으면 일단 통과시켜야 함 여기서 막으면 중복 검증으로 인해 로그인 페이지로 이동함
  console.log("✅ 토큰 확인됨 - 통과");
  return NextResponse.next();
}

export const config = {
  matcher: ["/boards/:path*"],
};
