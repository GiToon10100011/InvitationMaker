# 🎭 괴도키드 예고장 생성기

![image](https://github.com/user-attachments/assets/348576b7-91f7-4e51-a32f-de66f743e3c1)



## 📋 프로젝트 정보

- **개발 일자**: 2025.02.25
- **개발자**: Toon
- **배포 주소**: [https://kaitoukidinvitationmaker.web.app](https://kaitoukidinvitationmaker.web.app)

## 🎯 프로젝트 소개

### 목적 및 용도

이 프로젝트는 애니메이션 '괴도키드'의 예고장을 웹에서 쉽게 만들 수 있는 생성기입니다. 사용자가 원하는 텍스트를 입력하면 괴도키드 스타일의 예고장 이미지를 생성하고 다운로드할 수 있습니다. 간단한 UI로 누구나 쉽게 사용할 수 있도록 설계되었습니다.

### 기술 스택

#### 프론트엔드
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Ant Design](https://img.shields.io/badge/Ant_Design-0170FE?style=for-the-badge&logo=ant-design&logoColor=white)
![CSS Modules](https://img.shields.io/badge/CSS_Modules-000000?style=for-the-badge&logo=css-modules&logoColor=white)

#### 배포
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)

## ✨ 주요 기능

### 1. 텍스트 입력 및 이미지 생성

사용자가 입력한 텍스트를 예고장 템플릿에 적용하여 이미지를 생성합니다. Canvas API를 활용하여 텍스트를 이미지에 렌더링합니다.

```typescript
// src/App.tsx - 텍스트 렌더링 및 줄바꿈 처리
useEffect(() => {
  const canvas = canvasRef.current;
  if (!canvas || !fontLoaded) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const img = new Image();
  img.src = preview;
  img.onload = () => {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);

    // 폰트 설정
    ctx.font = "48px 'East Sea Dokdo'";
    ctx.fillStyle = "black";
    ctx.textAlign = "left";

    // 텍스트 영역 설정
    const textAreaWidth = canvas.width / 1.8;
    const startX = canvas.width / 10;
    const startY = canvas.height / 2.6;
    const lineHeight = 60;

    // 개선된 줄바꿈 처리
    const lines: string[] = [];
    let currentLine = "";

    // 텍스트를 문자 단위로 분리
    const characters = text.split("");

    for (let i = 0; i < characters.length; i++) {
      const char = characters[i];

      if (char === "\n") {
        lines.push(currentLine);
        currentLine = "";
        continue;
      }

      const testLine = currentLine + char;
      const metrics = ctx.measureText(testLine);

      if (metrics.width > textAreaWidth) {
        lines.push(currentLine);
        currentLine = char;
      } else {
        currentLine = testLine;
      }
    }

    // 마지막 줄 처리
    if (currentLine) {
      lines.push(currentLine);
    }

    // 모든 줄 렌더링
    lines.forEach((line, index) => {
      ctx.fillText(line, startX, startY + index * lineHeight);
    });
  };
}, [text, fontLoaded]);
```

### 2. 이미지 다운로드

생성된 예고장 이미지를 사용자의 기기에 다운로드할 수 있습니다.

```typescript
// src/App.tsx - 이미지 다운로드 기능
const handleDownload = () => {
  const canvas = canvasRef.current;
  if (!canvas) return;

  const link = document.createElement("a");
  link.download = "예고장.png";
  link.href = canvas.toDataURL();
  link.click();
};
```

### 3. 반응형 디자인

모바일과 데스크톱 환경 모두에서 최적의 사용자 경험을 제공하는 반응형 디자인을 구현했습니다.

```css
/* src/index.module.css - 반응형 스타일링 */
.container {
  margin: 0 auto;
  width: 60%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4%;
  @media (max-width: 480px) {
    width: 80%;
    gap: 3%;
    height: 120vh;
  }
}

.previewImage {
  width: 80%;
  height: 80%;
  @media (max-width: 480px) {
    width: 100%;
  }
  & img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}
```

## 🚀 프로젝트 설치 및 사용 방법

```bash
# 저장소 클론
git clone https://github.com/GiToon10100011/InvitationMaker.git

# 디렉토리 이동
cd InvitationMaker

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드 및 배포
npm run build
npm run deploy
```

```bash
# 쉘 스크립트 실행
sh setup.sh

# 권한 설정
chmod +x setup.sh
```

## 📁 프로젝트 구조

```
InvitationMaker/
├── public/                # 정적 파일
│   ├── logo.svg           # 사이트 로고
│   └── preview.jpeg       # 예고장 템플릿 이미지
├── src/
│   ├── App.tsx            # 메인 애플리케이션 컴포넌트
│   ├── index.module.css   # 스타일 모듈
│   ├── main.tsx           # 앱 진입점
│   └── vite-env.d.ts      # Vite 타입 정의
├── .firebase/             # Firebase 배포 캐시
├── .firebaserc            # Firebase 프로젝트 설정
├── firebase.json          # Firebase 호스팅 설정
├── package.json           # 프로젝트 의존성 및 스크립트
├── tsconfig.app.json      # TypeScript 앱 설정
├── tsconfig.json          # TypeScript 설정
├── tsconfig.node.json     # TypeScript 노드 설정
└── vite.config.ts         # Vite 설정
```

## 💡 배운 점

### 기술적 측면

- **Canvas API 활용**: HTML5 Canvas API를 사용하여 동적 이미지 생성 및 텍스트 렌더링 방법을 익혔습니다.
- **폰트 로딩 처리**: 웹 폰트를 명시적으로 로드하고 렌더링 타이밍을 제어하는 방법을 배웠습니다.
- **텍스트 줄바꿈 알고리즘**: 캔버스에서 텍스트 너비를 측정하고 자동 줄바꿈을 구현하는 방법을 학습했습니다.
- **반응형 UI 구현**: 다양한 화면 크기에 대응하는 반응형 레이아웃 설계 방법을 익혔습니다.

### 디자인 측면

- **사용자 친화적 UI**: 간결하고 직관적인 사용자 인터페이스 설계 방법을 연구했습니다.
- **시각적 피드백**: 사용자 액션에 대한 적절한 시각적 피드백을 제공하는 방법을 배웠습니다.
- **폰트 선택과 스타일링**: 프로젝트 컨셉에 맞는 폰트 선택과 스타일링 방법을 익혔습니다.

### 배포 측면

- **Firebase 호스팅**: Firebase를 사용한 정적 웹 애플리케이션 배포 방법을 배웠습니다.
- **빌드 최적화**: Vite를 활용한 빠른 개발 환경 구성과 최적화된 빌드 생성 방법을 익혔습니다.

## 📝 향후 개선 사항

- 텍스트 폰트, 크기, 색상 커스터마이징 옵션
- 이미지 공유 기능 (SNS 공유)
- SEO 최적화
- 에드센스 추가

## 🔗 관련 링크

- [GitHub 저장소](https://github.com/GiToon10100011/InvitationMaker)
- [개발자 GitHub](https://github.com/GiToon10100011)

---

© 2025 Toon. All Rights Reserved.
