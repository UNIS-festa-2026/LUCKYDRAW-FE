import { useEffect, useRef, useState } from "react";

const SIGNATURE_STORAGE_KEY = "couponSignatureV1";

export default function Coupon() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawingRef = useRef(false);
  const [hasSignature, setHasSignature] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.floor(rect.width * dpr);
    canvas.height = Math.floor(rect.height * dpr);

    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    context.scale(dpr, dpr);
    context.lineCap = "round";
    context.lineJoin = "round";
    context.lineWidth = 2.4;
    context.strokeStyle = "#1f1f1f";

    const saved = window.localStorage.getItem(SIGNATURE_STORAGE_KEY);
    if (!saved) {
      return;
    }

    const signatureImage = new Image();
    signatureImage.onload = () => {
      context.clearRect(0, 0, rect.width, rect.height);
      context.drawImage(signatureImage, 0, 0, rect.width, rect.height);
      setHasSignature(true);
      setHasDrawn(true);
    };
    signatureImage.src = saved;
  }, []);

  const getContext = () => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return null;
    }
    return canvas.getContext("2d");
  };

  const getCanvasPoint = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return { x: 0, y: 0 };
    }
    const rect = canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (hasSignature) {
      return;
    }
    const context = getContext();
    if (!context) {
      return;
    }

    const { x, y } = getCanvasPoint(event);
    isDrawingRef.current = true;
    setHasDrawn(true);
    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(x + 0.01, y + 0.01);
    context.stroke();
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (hasSignature || !isDrawingRef.current) {
      return;
    }
    const context = getContext();
    if (!context) {
      return;
    }

    const { x, y } = getCanvasPoint(event);
    context.lineTo(x, y);
    context.stroke();
  };

  const handlePointerUp = () => {
    if (hasSignature) {
      return;
    }
    isDrawingRef.current = false;
  };

  const handleComplete = () => {
    if (hasSignature || !hasDrawn) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    window.localStorage.setItem(
      SIGNATURE_STORAGE_KEY,
      canvas.toDataURL("image/png"),
    );
    setHasSignature(true);
  };

  return (
    <div className="relative mx-auto h-[783px] w-full max-w-96 overflow-hidden bg-[#f9f7e8]">
      <div className="absolute left-0 top-[677px] inline-flex w-96 flex-col items-center justify-start">
        <button
          type="button"
          onClick={handleComplete}
          disabled={!hasDrawn || hasSignature}
          className="inline-flex h-[52px] w-[335px] items-center justify-center gap-2.5 rounded-[100px] bg-[#e7f5ea] p-2.5 outline outline-2 outline-offset-[-2px] outline-[#bddccb]"
        >
          <div className="text-center text-xl font-bold leading-8 text-neutral-950">
            쿠폰 사용 완료
          </div>
        </button>

        <div className="inline-flex w-full items-center justify-center gap-2.5 px-24 py-2.5">
          <div className="text-center text-xs font-medium leading-4 text-neutral-500">
            쿠폰 사용 불가 시 연락 바랍니다
            <br />
            010-4550-8535
          </div>
        </div>
      </div>

      <div className="absolute left-0 top-0 inline-flex h-[60px] w-96 items-center justify-center px-5">
        <div className="flex items-center justify-start gap-1">
          <img className="size-6" src="/unis.png" alt="UNIS 로고" />
          <div className="text-base font-medium leading-6 text-neutral-950">
            UNIS 중앙실전 IT창업학회
          </div>
        </div>
      </div>

      <div className="absolute left-0 top-[108px] inline-flex w-96 flex-col items-center justify-start gap-6">
        <div className="flex w-[335px] flex-col items-center justify-start gap-4">
          <div className="w-full text-center text-xl font-bold leading-[34px] text-neutral-950">
            해당 부스에서만 사용이 가능해요
          </div>

          <div className="w-full drop-shadow-[0px_2px_3px_rgba(0,0,0,0.15)]">
            <img src="/coupon1.png" alt="부스 쿠폰" className="w-full" />
          </div>
        </div>

        <div className="flex w-full flex-col items-center justify-start gap-2">
          <div className="w-full text-center text-xl font-medium leading-10 text-neutral-950/80">
            부스 운영자 사인 영역
          </div>

          <div className="flex w-[334px] flex-col items-center justify-start gap-3">
            <div className="relative inline-flex h-[106px] w-full items-center justify-center rounded-xl bg-[#fefefe] outline outline-2 outline-offset-[-1px] outline-[#bddccb]">
              {!hasSignature && (
                <div className="pointer-events-none absolute text-center text-xs font-medium leading-4 text-neutral-500">
                  운영자가 이곳에 사인합니다
                </div>
              )}
              <canvas
                ref={canvasRef}
                className={`h-full w-full rounded-xl ${hasSignature ? "cursor-not-allowed" : "cursor-crosshair"}`}
                style={{ touchAction: "none" }}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerLeave={handlePointerUp}
              />
            </div>

            <div className="w-full text-center text-xs font-medium leading-4 text-neutral-500">
              부스 운영자는 사인 후 완료 버튼을 눌러주세요
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
