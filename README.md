# kimerin.com — 포트폴리오 사이트

> **현재 상태 (2026-09-22)**: 도메인 `kimerin.com`은 Cloudflare에서 구매 완료. 로컬 빌드 확인 완료, git 초기 커밋 완료.
> 남은 단계는 아래 **3번(GitHub에 올리기)** 과 **4-2, 4-3(Pages 호스팅 + 도메인 연결)** 입니다. 4-1(도메인 구매)은 이미 끝났으니 건너뜁니다.

Astro로 만든 정적 포트폴리오 사이트입니다. Music / Arts / Project 세 카테고리로 나뉘어 있고,
활동 하나를 추가할 때는 마크다운 파일 하나만 만들면 됩니다.

---

## 0. 준비물 (처음 한 번만)

1. **Node.js** 설치 — https://nodejs.org 에서 LTS 버전 다운로드 후 설치
2. **Git** 설치 — https://git-scm.com/downloads
3. **GitHub 계정** — https://github.com 가입
4. **Cloudflare 계정** — https://dash.cloudflare.com 가입 (도메인 구매 + 호스팅을 여기서 한 번에)
5. 코드 편집기 — VS Code 추천 (https://code.visualstudio.com)

---

## 1. 내 컴퓨터에서 실행해보기

이 폴더를 원하는 위치에 두고 터미널(맥: 터미널 앱 / 윈도우: PowerShell)에서:

```bash
cd kimerin.com      # 이 폴더로 이동
npm install         # 필요한 패키지 설치 (처음 한 번)
npm run dev         # 개발 서버 실행
```

브라우저에서 http://localhost:4321 을 열면 사이트가 보입니다. 파일을 고치면 바로 반영됩니다.
종료는 터미널에서 `Ctrl + C`.

---

## 2. 내용 채우기

### 기본 정보 — `src/site.config.ts`
이름, 소개 문장, 이메일, SNS 링크, 카테고리 설명을 여기서 바꿉니다.

### About 페이지 — `src/pages/about.astro`
자기소개, 경력, 학력 등을 자유롭게 씁니다.

### 활동 추가 — `src/content/{music|arts|project}/파일명.md`
`src/content/project/_template.md` 를 복사해서 해당 카테고리 폴더에 넣고 파일명을 바꿉니다.
파일명이 곧 URL이 됩니다. (예: `src/content/music/musical-hamlet.md` → `kimerin.com/music/musical-hamlet`)
영문 소문자와 하이픈(-)만 쓰는 걸 권장합니다.

```markdown
---
title: "뮤지컬 〈햄릿〉 작곡"          # 제목
date: 2025-11-01                     # 날짜 (최신순 정렬 기준)
summary: "창작 뮤지컬 넘버 12곡 작곡"  # 목록에 보이는 한 줄
role: "Composer"                     # 역할 (선택)
tags: ["Musical", "Composition"]     # 태그 (선택)
cover: /images/hamlet.jpg            # 대표 이미지 (선택, public/images/에 넣기)
link: https://linkedin.com/...       # 외부 링크 (선택)
video: https://youtube.com/watch?v=… # 유튜브 영상 (선택, 페이지 상단에 자동 임베드)
featured: true                       # true면 홈 Featured에 노출
draft: false                         # true면 사이트에 숨김
---

본문은 마크다운으로 자유롭게. 소제목(##), 목록(-), 이미지(![](/images/x.jpg)), 링크 모두 가능.
```

### 이미지
`public/images/` 폴더에 넣고 `/images/파일명.jpg` 로 참조합니다. 웹용으로 1600px 이하, 500KB 이하로 줄여서 넣는 걸 권장합니다.

### 디자인
색상, 폰트, 여백은 `src/styles/global.css` 상단의 `:root` 변수만 바꿔도 대부분 조절됩니다.

---

## 3. GitHub에 올리기 (처음 한 번)

1. GitHub에서 **New repository** → 이름 `kimerin.com` (Private 가능) → Create
2. 터미널에서 이 폴더 안에서:

```bash
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/<내아이디>/kimerin.com.git
git push -u origin main
```

이후 수정할 때마다:

```bash
git add .
git commit -m "Add new work"
git push
```

push하면 아래 4번에서 연결한 Cloudflare가 자동으로 새 버전을 배포합니다(1~2분).

---

## 4. 도메인 구매 + 호스팅 (Cloudflare)

### 4-1. 도메인 구매 — 유일한 비용
- Cloudflare 대시보드 → **Domain Registration → Register Domains** → `kimerin.com` 검색 → 구매
- 비용: .com 기준 연 약 **$10~11** (원가 판매, 마진 없음). 결제는 **Visa/Master 카드 또는 PayPal**.
  국내 카드도 해외결제 가능한 카드면 됩니다. 1년마다 자동 갱신(끄기 가능).
- 해외결제가 어렵다면 **가비아(gabia.com)** 에서 구매 후 → 4-3의 "다른 곳에서 산 도메인" 방법으로 연결.

### 4-2. 호스팅 — 무료 (Workers 방식, 현재 사용 중)
Cloudflare 대시보드의 "Connect to Git"은 기본으로 **Workers** 프로젝트를 만듭니다. 레포에 있는 `wrangler.jsonc`가
`dist` 폴더를 정적 에셋으로 배포하도록 설정돼 있으니, 대시보드에서 **빌드 명령만** 넣어주면 됩니다.

1. Workers & Pages → `kimerin` 프로젝트 → **Settings → Build** (또는 Build configuration)
2. **Build command**: `npm run build`  ← 이게 비어 있으면 "Could not detect a directory containing static files" 에러가 납니다
3. **Deploy command**: `npx wrangler deploy` (기본값 그대로)
4. 저장 후 **Deployments → Retry deployment** (또는 새로 push) → 1~2분 뒤 `kimerin.<계정>.workers.dev` 주소로 열립니다.

(예전 방식인 Pages 프로젝트로 만들 경우: Framework preset **Astro**, Build command `npm run build`, Output directory `dist`.)

### 4-3. 도메인 연결
- 프로젝트 → **Settings → Domains & Routes → Add → Custom domain** → `kimerin.com` 입력 → Add domain
  (Pages 프로젝트라면 **Custom domains → Set up a custom domain**)
- 같은 방법으로 `www.kimerin.com` 도 추가 (www로 들어와도 열리게)
- 도메인이 Cloudflare에 있으면 DNS 레코드가 **자동으로 추가**되고 몇 분 내 HTTPS까지 완료됩니다.

**다른 곳(가비아 등)에서 산 도메인이라면:**
Cloudflare 대시보드 → **Add a domain** → `kimerin.com` 입력 → Free 플랜 → Cloudflare가 알려주는 네임서버 2개를
가비아 "네임서버 설정"에 입력 → 반영(최대 24시간) 후 위의 Custom domains 단계 진행.

---

## 5. 비용 정리

| 항목 | 비용 |
|---|---|
| 도메인 kimerin.com | 연 약 $10~11 (Cloudflare) 또는 연 1~2만 원대 (가비아) |
| 호스팅 (Cloudflare Pages) | 무료 |
| GitHub | 무료 |
| HTTPS 인증서 | 무료 (자동) |

---

## 폴더 구조

```
kimerin.com/
├── public/              # 그대로 서빙되는 파일 (이미지, 파비콘)
│   └── images/
├── src/
│   ├── content/         # ★ 활동 마크다운 파일
│   │   ├── music/
│   │   ├── arts/
│   │   └── project/
│   ├── pages/           # 페이지 (홈, 카테고리, 상세, About)
│   ├── layouts/         # 공통 레이아웃 (헤더/푸터)
│   ├── components/      # 목록 컴포넌트
│   ├── styles/          # 전체 스타일
│   ├── site.config.ts   # ★ 사이트 기본 정보
│   └── content.config.ts# 콘텐츠 스키마
└── astro.config.mjs
```
