import { useParams, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const imgOpenInNew =
  "https://www.figma.com/api/mcp/asset/a598251e-988c-4397-b059-d56ecaf11279";

const cardImages = [
  "0_thefool.png",
  "1_themagician.png",
  "2_thehighpriestess.png",
  "3_theempress.png",
  "4_theemperor.png",
  "5_thehierophant.png",
  "6_thelovers.png",
  "7_thechariot.png",
  "8_strength.png",
  "9_thehermit.png",
  "10_wheeloffortune.png",
  "11_justice.png",
  "12_thehangedman.png",
  "13_death.png",
  "14_temperance.png",
  "15_thestar.png",
  "16_themoon.png",
  "17_thesun.png",
  "18_judgement.png",
  "19_theworld.png",
];

export default function TarotSDescription() {
  const { cardId } = useParams();
  // 카드 id로 이미지 파일명 찾기
  const cardIdx = Number(cardId);
  const cardImg = cardImages[cardIdx] ? `/cards/${cardImages[cardIdx]}` : undefined;

  // 카드 확대 애니메이션용
  const location = useLocation();
  const [showAnim, setShowAnim] = useState(!!location.state?.fromRect);
  const animCardRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!showAnim) return;
    // 트리거: mount 후 다음 tick에 transform 적용
    const timer = setTimeout(() => {
      if (animCardRef.current) {
        animCardRef.current.style.transform = "translate(-50%, -50%) scale(1)";
        animCardRef.current.style.opacity = "1";
      }
    }, 30);
    // 애니메이션 끝나면 실제 UI만 남김
    const endTimer = setTimeout(() => setShowAnim(false), 600);
    return () => { clearTimeout(timer); clearTimeout(endTimer); };
  }, [showAnim]);
  // 카드명 매핑 (예시)
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
  const cardName = cardNames[cardIdx] || "";
  // 예시 설명 텍스트
  const description = "이곳에 카드 설명이 들어갑니다.";

  return (
    <div className="bg-[#f3c9e4] min-h-screen w-full flex flex-col items-center relative overflow-hidden">
      {/* 카드 확대 애니메이션 */}
      {showAnim && location.state?.fromRect && location.state?.img && (
        <img
          ref={animCardRef}
          src={location.state.img}
          alt="선택 카드"
          style={{
            position: "fixed",
            left: location.state.fromRect.left + location.state.fromRect.width / 2,
            top: location.state.fromRect.top + location.state.fromRect.height / 2,
            width: location.state.fromRect.width,
            height: location.state.fromRect.height,
            zIndex: 50,
            borderRadius: 16,
            boxShadow: "0 4px 24px 0 rgba(0,0,0,0.12)",
            background: "#fff",
            transform: "translate(-50%, -50%) scale(2.2)",
            opacity: 0,
            transition: "transform 0.6s cubic-bezier(.4,1.2,.4,1), opacity 0.6s"
          }}
        />
      )}
      {/* 실제 내용 */}
      {!showAnim && (
        <>
          {/* 헤더 */}
          <div className="w-full flex items-center justify-between h-[60px] px-5 mt-0">
            <div className="flex items-center gap-1">
              <img className="size-6" src="/unis.png" alt="UNIS 로고" />
              <span className="text-[#090909] text-base font-medium font-['Pretendard'] leading-6 whitespace-nowrap">
                UNIS 중앙실전 IT창업학회
              </span>
            </div>
            <img src={imgOpenInNew} alt="open in new" className="w-6 h-6" />
          </div>
          {/* 카드 이미지 및 설명 */}
          <div className="flex flex-col items-center mt-10">
            {cardImg && (
              <img
                src={cardImg}
                alt={cardName}
                className="w-[120px] h-[170px] mb-6 rounded-xl shadow-lg bg-white"
              />
            )}
            <div className="text-[#090909] text-xl font-bold mb-2">{cardName}</div>
            <div className="text-[#090909] text-base text-center max-w-[320px] whitespace-pre-line">
              {description}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
