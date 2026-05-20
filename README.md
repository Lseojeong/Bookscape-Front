# ✈️ Bookscape

<div align="center">
  <img width="2880" height="1620" alt="Image" src="https://github.com/user-attachments/assets/20c6ad1c-09d4-47c3-8778-9df688d48b9f" />
  <img src="https://img.shields.io/badge/프로젝트 기간-2026.04.20 ~ 2026.05.22-5eead4?style=flat&logo=&logoColor=white" />
</div>

<br/>
<br/>

## 📍 프로젝트 소개

**Bookscape**는 Book(예약)과 Landscape(지도/공간)의 합성어로, **지도 위의 풍경 속에서 경험을 탐색하고 예약한다**는 의미를 담고 있습니다. 직관적인 UI를 통해 체험 탐색부터 예약, 관리까지 모든 흐름을 한눈에 확인할 수 있도록 돕는 서비스입니다.

[✈️ Bookscape 바로가기 >](https://bookscape-team1.vercel.app/) <br>
[💻 시연 영상 >](https://www.youtube.com/watch?v=2wVANUuWwLk) <br>
[📊 PPT >](https://www.figma.com/deck/A39EYvkNr7w11omsTYrF7T/Bookscape_PPT?node-id=8-142&t=g7L6ReCNk4PL1I3c-0&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1)

## 👥 팀원 소개

<!-- prettier-ignore -->
| <img src="https://github.com/hyewon0457.png" width="120"/> | <img src="https://github.com/bitna0a.png" width="120"/> | <img src="https://github.com/luneyeo.png" width="120"/> | <img src="https://github.com/Lseojeong.png" width="120"/> | <img src="https://github.com/da1eun.png" width="120"/> |
| :---: | :---: | :---: | :---: | :---: |
| [김혜원](https://github.com/hyewon0457) | [남빛나](https://github.com/bitna0a) | [여수경](https://github.com/luneyeo) | [이서정](https://github.com/Lseojeong) | [정다은](https://github.com/da1eun) |

## 🗓️ R&R

<!-- prettier-ignore -->
| 이름 | 담당 |
|------------|------|
| 🚩이서정(팀장) | **공통 컴포넌트**<br>드롭다운, empty 화면, 모달, 헤더, 공통 레이아웃 <br><br>**페이지 & 기능**<br>마이페이지 - 예약 내역 & 내 체험 관리, 404 페이지, 500 페이지, 카카오 인증, 알림 기능<br><br>**공통 훅/기능**<br>무한 스크롤, 스켈레톤 UI<br><br>**기타**<br>인프라, 초기 세팅, 피그마 리디자인 |
| 김혜원 | **공통 컴포넌트**<br>사이드바, 타이틀, 푸터, state 뱃지, 마이페이지 레이아웃 <br><br>**페이지 & 기능**<br>마이페이지 - 내 정보 수정 & 예약 현황<br><br>**기타**<br>fetch 함수 세팅 |
| 남빛나 | **공통 컴포넌트**<br>버튼, 인풋, 필터 버튼, Textarea<br><br>**페이지 & 기능**<br>마이페이지 - 내 체험 등록 & 내 체험 수정, 카카오 우편번호 주소 검색 기능 <br><br>**공통 훅/기능**<br>유효성 검사, 메타 태그 정의<br><br>**기타**<br>Gemini 코드 리뷰 설정 |
| 여수경 | **공통 컴포넌트**<br>검색 인풋, 프로필, 가격/인, 체험 카드(인기 체험, 예약 내역, 체험 관리)<br><br>**페이지 & 기능**<br>로그인 & 회원가입 페이지, 메인 & 검색 화면, 체험 목록 페이지<br><br>**공통 훅/기능**<br>스켈레톤 UI<br><br>**기타**<br>Tailwind CSS 설정, fetch 함수 세팅 |
| 정다은 | **공통 컴포넌트**<br>토스트, 페이지네이션, 로고, 탭바, 페이지 헤더<br><br>**페이지 & 기능**<br>체험 상세 페이지, 카카오톡 공유 기능<br><br>**기타**<br>Storybook 설정 |

---

## 🖥️ 화면 미리보기

> 모든 화면은 **PC / Tablet / Mobile** 반응형을 고려해 구현했습니다.

<!-- prettier-ignore -->
|메인 페이지(/)|
|:---:|
|<img width="800" alt="Image" src="https://github.com/user-attachments/assets/a0db0083-9b74-4a22-b0b2-087d4dd0fcd6" />|
|카테고리 / 인기 체험 / 검색을 통한 체험 탐색|

<!-- prettier-ignore -->
|회원가입 & 로그인(/signup,/login)|
|:---:|
|<img width="800" alt="Image" src="https://github.com/user-attachments/assets/369bffd1-95ef-42b1-acaa-d6e0e807981b" />|
|일반 회원가입 및 로그인 - 유효성 검사, 카카오 소셜 로그인|

<!-- prettier-ignore -->
|체험 리스트(/activities)|
|:---:|
|<img width="800" alt="Image" src="https://github.com/user-attachments/assets/d892511e-67e5-4087-8660-3fab7109a694" /> <img width="800" alt="Image" src="https://github.com/user-attachments/assets/00432502-9a01-415f-917c-89edce42b8ee" />|
|카테고리 필터 / 가격 정렬 / 키워드 검색|

<!-- prettier-ignore -->
|체험 상세 페이지(/activity/[id])|
|:---:|
|<img width="800" alt="Image" src="https://github.com/user-attachments/assets/2c9caab2-b5cd-4048-8c39-f6a4610a4296" /> <img width="800" alt="Image" src="https://github.com/user-attachments/assets/2af9e694-3c8a-4101-969e-ea1c6afa07c9" />|
|체험 정보 & 후기, 예약, 카카오톡 공유|

<!-- prettier-ignore -->
|알림|
|:---:|
|<img width="891" height="504" alt="Image" src="https://github.com/user-attachments/assets/8866dd2e-c44b-4b12-8156-3e6dfb82e26e" />|
|예약 신청 / 승인 / 거절 알림 실시간 확인 & 삭제|

<!-- prettier-ignore -->
|내 정보(/mypage/info)|
|:---:|
|<img width="800" alt="Image" src="https://github.com/user-attachments/assets/76adf7b8-6e7b-4cb8-ae5b-b07fae355db2" />|
|프로필 이미지 / 닉네임 / 비밀번호 변경|

<!-- prettier-ignore -->
|예약 내역(/mypage/reservation-list)|
|:---:|
|<img width="800" alt="Image" src="https://github.com/user-attachments/assets/71d4e8bb-6cf5-4416-87e1-9dd3024205f9" /> <img width="800" alt="Image" src="https://github.com/user-attachments/assets/62b592e3-cde0-4c55-94b3-3d76db5e5797" />|
|예약 상태별 확인, 예약 취소, 후기 작성|

<!-- prettier-ignore -->
|내 체험 관리(/mypage/activity)|
|:---:|
|<img width="800" alt="Image" src="https://github.com/user-attachments/assets/2d8b0107-0fdd-4868-9f76-26de7da91202" />|
|등록한 체험 목록 확인 / 체험 삭제|

<!-- prettier-ignore -->
|체험 등록 & 수정(/activity/new, /activity/[id]/edit)|
|:---:|
|<img width="800" alt="Image" src="https://github.com/user-attachments/assets/ade16764-05b2-4866-bce6-a4c2f036cb83" /> <img width="800" alt="Image" src="https://github.com/user-attachments/assets/c1cec7ef-80eb-474d-bef8-3d5235e0dd0c" />|
|체험 등록 - 체험 정보 입력, 카카오 우편번호 주소 검색, 이미지 업로드, 예약 스케줄 등록 / 체험 수정|

<!-- prettier-ignore -->
|예약 현황(/mypage/reservation-status)|
|:---:|
|<img width="800" alt="Image" src="https://github.com/user-attachments/assets/7fff7712-8aee-4364-96c4-98289cb503f5" />|
|캘린더로 예약 현황 확인 / 예약 승인 & 거절|

---

## 🛠️ 기술 스택

### ⚡ Frontend & Development

![Next.js](https://img.shields.io/badge/Next.js_16-F5F5F5?style=flat-square&logo=nextdotjs&logoColor=000000)
![React](https://img.shields.io/badge/React-EAF6FB?style=flat-square&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-E8F1FB?style=flat-square&logo=typescript&logoColor=3178C6)
![Turbopack](https://img.shields.io/badge/Turbopack-F3F0FF?style=flat-square&logo=turbopack&logoColor=000000)

### 🎨 Styling & UI

![TailwindCSS](https://img.shields.io/badge/TailwindCSS_v4-E6FFFA?style=flat-square&logo=tailwindcss&logoColor=38B2AC)
![tailwind-merge](https://img.shields.io/badge/tailwind--merge-F5F5F5?style=flat-square)
![CVA](https://img.shields.io/badge/CVA-F5F5F5?style=flat-square)
![clsx](https://img.shields.io/badge/clsx-F5F5F5?style=flat-square)

### 🗂️ State Management

![Zustand](https://img.shields.io/badge/Zustand-FFF7ED?style=flat-square&logo=zustand&logoColor=000000)
![TanStack Query](https://img.shields.io/badge/TanStack_Query-FFF1F2?style=flat-square&logo=reactquery&logoColor=FF4154)

### 📝 Form & Validation

![React Hook Form](https://img.shields.io/badge/React_Hook_Form-FCE7F3?style=flat-square&logo=reacthookform&logoColor=EC5990)
![Zod](https://img.shields.io/badge/Zod-EFF6FF?style=flat-square&logo=zod&logoColor=3068B7)

### 🧩 UI Library & SDK

![Storybook](https://img.shields.io/badge/Storybook-FFF1F2?style=flat-square&logo=storybook&logoColor=FF4785)
![embla-carousel](https://img.shields.io/badge/embla--carousel-EFF6FF?style=flat-square)
![react-day-picker](https://img.shields.io/badge/react--day--picker-FCE7F3?style=flat-square)
![Kakao Map](https://img.shields.io/badge/Kakao_Map-FEF9C3?style=flat-square&logo=kakao&logoColor=000000)
![Kakao Postcode](https://img.shields.io/badge/Kakao_Postcode-FEF9C3?style=flat-square&logo=kakao&logoColor=000000)
![Kakao Share](https://img.shields.io/badge/Kakao_Share-FEF9C3?style=flat-square&logo=kakao&logoColor=000000)
![Lottie](https://img.shields.io/badge/Lottie-E6FFFA?style=flat-square&logo=lottiefiles&logoColor=00C4CC)

### 🧹 Code Quality

![ESLint](https://img.shields.io/badge/ESLint-EDE9FE?style=flat-square&logo=eslint&logoColor=4B32C3)
![Prettier](https://img.shields.io/badge/Prettier-FFF7ED?style=flat-square&logo=prettier&logoColor=F7B93E)
![Husky](https://img.shields.io/badge/Husky-F5F5F5?style=flat-square)
![Commitlint](https://img.shields.io/badge/Commitlint-F5F5F5?style=flat-square)

### 🖼️ Assets

![SVGR](https://img.shields.io/badge/SVGR-FFF4E5?style=flat-square)
![SVGO](https://img.shields.io/badge/SVGO-FFF4E5?style=flat-square&logo=svgo&logoColor=000000)

### 📦 Package Manager

![pnpm](https://img.shields.io/badge/pnpm-FEF9C3?style=flat-square&logo=pnpm&logoColor=F69220)

### 🚀 Deploy & CI/CD

![Vercel](https://img.shields.io/badge/Vercel-F5F5F5?style=flat-square&logo=vercel&logoColor=000000)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-F5F5F5?style=flat-square&logo=githubactions&logoColor=2088FF)

### 🤝 Collaboration Tools

![GitHub](https://img.shields.io/badge/GitHub-F5F5F5?style=flat-square&logo=github&logoColor=000000)
![Discord](https://img.shields.io/badge/Discord-EDE9FE?style=flat-square&logo=discord&logoColor=5865F2)
![Notion](https://img.shields.io/badge/Notion-F5F5F5?style=flat-square&logo=notion&logoColor=000000)
![Figma](https://img.shields.io/badge/Figma-FFF1F2?style=flat-square&logo=figma&logoColor=F24E1E)

---

## 🗂️ 폴더 구조

```python
📁 src
├── 📁 app                    # 페이지 라우팅 (Next.js App Router)
│   ├── 📁 (private)          # 로그인 필요 라우트 그룹
│   │   ├── 📁 activity
│   │   └── 📁 mypage
│   ├── 📁 (public)           # 공개 라우트 그룹
│   │   ├── 📁 (auth)
│   │   └── 📁 (explore)
│   ├── 📁 api                # BFF Route Handlers
│   │   ├── 📁 activities
│   │   ├── 📁 auth
│   │   ├── 📁 my-activities
│   │   ├── 📁 my-notifications
│   │   ├── 📁 my-reservations
│   │   ├── 📁 oauth
│   │   └── 📁 users
│   ├── robots.ts
│   └── sitemap.ts
│
├── 📁 features               # 도메인별 기능
│   ├── 📁 auth
│   ├── 📁 my-page
│   ├── 📁 notification
│   ├── 📁 reservation
│   └── 📁 user
│
└── 📁 shared                 # 공통 재사용 요소
    ├── 📁 apis  ( base, bff )
    ├── 📁 assets  ( fonts, icons, images, logo, lotties )
    ├── 📁 constants
    ├── 📁 hooks
    ├── 📁 providers
    ├── 📁 stores
    ├── 📁 styles
    ├── 📁 types
    ├── 📁 ui                 # 공통 UI 컴포넌트
    └── 📁 utils
```

---
