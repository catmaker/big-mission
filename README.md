# BIGS 프론트엔드 개발자 과제

## 프로젝트 소개

BIGS 프론트엔드 개발자 채용 과제로 제작된 게시판 웹 애플리케이션입니다.

## 배포 링크

[배포 링크](https://front-mission.vercel.app/)

## 프로젝트 실행 방법

```bash
git clone https://github.com/catmaker/big-mission.git
cd big-mission
npm install
npm run dev
```

## 기술 스택

- React
- Next.js
- TypeScript
- MobX
- React Query
- axios
- Tailwind CSS
- Shadcn UI
- React Hook Form
- React Table

## 주요 기능

- 회원가입 및 로그인
- 게시글 CRUD
- 반응형 디자인
- 페이지네이션

## 구현 내용

- 사용자 인증
  - 회원가입
  - 로그인/로그아웃
  - 사용자 정보 표시
- 게시판 기능
  - 게시글 목록 조회
  - 카테고리별 게시글 목록 조회
  - 최신순 정렬
  - 게시글 작성
  - 게시글 수정/삭제
  - 페이지네이션

## 프로젝트 구조

```bash
big-mission/
├── public/
├── src/
│ ├── app/
│ ├── components/
│ ├── hooks/
│ ├── lib/
│ ├── providers/
│ ├── stores/
│ ├── types/
│ ├── utils/
├── .gitignore
├── package.json
├── tsconfig.json
├── next.config.mjs
├── tailwind.config.ts
├── postcss.config.mjs
├── README.md
```
