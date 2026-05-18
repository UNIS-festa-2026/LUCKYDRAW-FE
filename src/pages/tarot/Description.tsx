import { useParams, useNavigate } from "react-router-dom";
import { useState, useRef } from "react";

const imgOpenInNew =
  "https://www.figma.com/api/mcp/asset/a598251e-988c-4397-b059-d56ecaf11279";

const cardImages = [
  "0.png",
  "1.png",
  "2.png",
  "3.png",
  "4.png",
  "5.png",
  "6.png",
  "7.png",
  "8.png",
  "9.png",
  "10.png",
  "11.png",
  "12.png",
  "13.png",
  "14.png",
  "15.png",
  "16.png",
  "17.png",
  "18.png",
  "19.png",
];

const cardNames = [
  "The Fool",
  "The Magician",
  "The High Priestess",
  "The Empress",
  "The Emperor",
  "The Hierophant",
  "The Lovers",
  "The Chariot",
  "Strength",
  "The Hermit",
  "Wheel of Fortune",
  "Justice",
  "The Hanged Man",
  "Death",
  "Temperance",
  "The Star",
  "The Moon",
  "The Sun",
  "Judgement",
  "The World",
];

export default function TarotDescription() {
  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "타로 카드 결과",
          text: "내 타로 카드 결과를 공유해요!",
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      alert("이 브라우저에서는 공유 기능이 지원되지 않습니다.");
    }
  };

  const navigate = useNavigate();
  const { cardId } = useParams();
  const cardIdx = Number(cardId);
  const cardImg = cardImages[cardIdx]
    ? `/cards/${cardImages[cardIdx]}`
    : undefined;
  const cardName = cardNames[cardIdx] || "";

  const [showToast, setShowToast] = useState(false);
  const downloadRef = useRef<HTMLAnchorElement>(null);

  const handleSaveImage = async () => {
    try {
      const fileName = `이미지 저장 section (${cardIdx}).png`;
      const response = await fetch(`/cards/${fileName}`);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error("에러:", e);
    }
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  return (
    <div className="bg-[#f3c9e4] min-h-screen w-full flex flex-col items-center relative overflow-hidden">
      {/* 헤더 */}
      <div className="w-full flex items-center justify-between h-[60px] px-5 mt-0">
        <div className="flex items-center gap-1">
          <img className="size-6" src="/unis.png" alt="UNIS 로고" />
          <span className="text-[#090909] text-base font-medium font-['Pretendard'] leading-6 whitespace-nowrap">
            UNIS 중앙실전 IT창업학회
          </span>
        </div>
        <button
          onClick={handleShare}
          className="w-6 h-6 p-0 bg-transparent border-none cursor-pointer"
        >
          <img src={imgOpenInNew} alt="공유하기" className="w-6 h-6" />
        </button>
      </div>

      {/* 카드 이미지 및 설명 */}
      <div className="flex flex-col items-center mt-5">
        {cardImg && (
          <>
            <div className="w-72 h-96 bg-yellow-50 rounded-[19.90px] outline outline-2 outline-offset-[-2px] outline-neutral-950 inline-flex justify-center items-center mb-6">
              <img
                src={cardImg}
                alt={cardName}
                className="w-72 h-96 rounded-3xl"
              />
            </div>
            <div className="self-stretch text-center justify-center text-neutral-950 text-xl font-bold font-['Pretendard'] leading-8 mt-7">
              계획대로 안되지만 더 재밌어질 거예요
            </div>
            <div className="self-stretch text-center justify-center text-neutral-950 text-base font-medium font-['Pretendard'] leading-6 mt-1">
              오늘은 평소에 안 하던 선택이 더 잘 맞아요.
              <br />
              눈에 띄는 부스에 가보세요!
            </div>
          </>
        )}
      </div>

      {/* 토스트 모달 - 화면 정중앙 */}
      {showToast && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            pointerEvents: "none",
          }}
        >
          <div className="px-16 py-3 bg-neutral-950 rounded-xl outline outline-1 outline-offset-[-1px] outline-yellow-50 inline-flex flex-col justify-center items-center">
            <div className="text-center text-yellow-50 text-base font-medium font-['Pretendard'] leading-6">
              이미지가 저장되었습니다.
            </div>
          </div>
        </div>
      )}

      {/* 하단 액션 영역 */}
      <div
        className="w-full max-w-[430px] px-5 flex justify-center items-center gap-2 fixed left-1/2"
        style={{ bottom: 20, transform: "translateX(-50%)" }}
      >
        <button
          type="button"
          className="bg-[#f9f7e8] border-2 border-[#090909] flex items-center justify-center p-[10px] rounded-[16px] size-[60px] shrink-0"
          onClick={handleSaveImage}
        >
          <div className="relative shrink-0 size-[32px]">
            <img
              alt="download"
              className="absolute block inset-0 max-w-none size-full"
              src="https://www.figma.com/api/mcp/asset/dd83cfe6-aa4c-4560-bca1-370b9e407b16"
            />
          </div>
        </button>
        <a ref={downloadRef} style={{ display: "none" }} />
        <button
          type="button"
          className="bg-[#090909] border-2 border-[#090909] flex h-[60px] items-center justify-center p-[10px] rounded-[16px] min-w-[165px] flex-grow w-full"
          onClick={() => navigate("/")}
        >
          <div className="flex flex-col items-center justify-end leading-[0] text-center w-full">
            <div
              className="font-['Pretendard'] font-bold text-[#f9f7e8] text-[20px] h-[24px] flex items-center justify-center w-full"
              style={{ lineHeight: "34px" }}
            >
              럭키드로우 하러 가기
            </div>
            <div
              className="font-['Pretendard'] font-medium text-[10px] text-[rgba(249,247,232,0.8)] h-[16px] flex items-center justify-center w-full"
              style={{ lineHeight: "1.4" }}
            >
              당신의 운세로 할 수 있는 최고의 선택!
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}
