import { Button, Input, Steps } from "antd";
import preview from "./preview.jpeg";
import styles from "./index.module.css";
import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";

function App() {
  const isMobile = useMediaQuery({ query: "(max-width: 480px)" });
  const [text, setText] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    // 폰트 로딩을 명시적으로 처리
    const loadFont = async () => {
      try {
        await document.fonts.load("48px 'East Sea Dokdo'");
        setFontLoaded(true);
      } catch (error) {
        console.error("Font loading failed:", error);
        setFontLoaded(true); // 폰트 로딩 실패시에도 진행
      }
    };

    loadFont();
  }, []);

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

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement("a");
    link.download = "예고장.png";
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>괴도키드 예고장 생성기</h1>
      <Steps
        size="small"
        current={1}
        items={[
          {
            title: "텍스트 입력",
            status: "process",
          },
          {
            title: "생성하기 버튼 클릭",
            status: "process",
          },
          {
            title: "완료!",
            status: "process",
          },
        ]}
      />
      <Input.TextArea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="예고장에 들어갈 텍스트를 입력해주세요!"
        rows={isMobile ? 6 : 3}
        autoSize={{ minRows: isMobile ? 6 : 3, maxRows: isMobile ? 6 : 3 }}
      />
      <Button type="primary" onClick={handleDownload}>
        생성하기
      </Button>
      <div className={styles.preview}>
        <h2 className={styles.previewTitle}>예고장 미리보기</h2>
        <div className={styles.previewImage}>
          <canvas ref={canvasRef} style={{ maxWidth: "100%" }} />
        </div>
      </div>
      <div className={styles.copyright}>
        &copy; Copyright by <a href="https://github.com/GiToon10100011">Toon</a>{" "}
        2025 All Rights Reserved.
      </div>
    </div>
  );
}

export default App;
