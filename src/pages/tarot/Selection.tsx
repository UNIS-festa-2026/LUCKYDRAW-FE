import { useState, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";

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

// description 페이지의 카드 표시 크기 (w-72 h-96 = 288x384)
const TARGET_W = 288;
const TARGET_H = 384;

function shuffle(array: string[]) {
  const arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

interface ExpandingCard {
  img: string;
  // 시작 위치/크기 (뷰포트 기준)
  fromLeft: number;
  fromTop: number;
  fromW: number;
  fromH: number;
}

function TarotSelection() {
  const navigate = useNavigate();
  const [flipped, setFlipped] = useState(Array(20).fill(false));
  const shuffledCards = useMemo(() => shuffle(cardImages), []);
  const cardFrontImgRefs = useRef<(HTMLImageElement | null)[]>([]);

  // 확대 중인 카드 상태
  const [expandingCard, setExpandingCard] = useState<ExpandingCard | null>(
    null,
  );
  const [expanded, setExpanded] = useState(false);

  const handleCardClick = (idx: number) => {
    if (flipped[idx] || expandingCard) return;

    // 앞면 이미지의 현재 위치/크기 측정
    const imgEl = cardFrontImgRefs.current[idx];
    if (!imgEl) return;
    const rect = imgEl.getBoundingClientRect();

    const cardId = shuffledCards[idx].split("_")[0];
    const cardImg = `/cards/${shuffledCards[idx]}`;

    // 카드 뒤집기
    setFlipped((prev) => prev.map((f, i) => (i === idx ? true : f)));

    // 뒤집기 애니메이션(500ms) 후 확대 시작
    setTimeout(() => {
      setExpandingCard({
        img: cardImg,
        fromLeft: rect.left,
        fromTop: rect.top,
        fromW: rect.width,
        fromH: rect.height,
      });

      // 다음 tick에 expanded = true → CSS transition 트리거
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setExpanded(true);
        });
      });

      // 확대 완료 후 페이지 전환
      setTimeout(() => {
        navigate(`/tarot/description/${cardId}`, {
          state: { img: cardImg },
        });
      }, 550);
    }, 500);
  };

  // 확대 카드의 목표 위치: 화면 중앙, description과 동일한 크기
  const targetLeft =
    typeof window !== "undefined" ? window.innerWidth / 2 - TARGET_W / 2 : 0;
  const targetTop =
    typeof window !== "undefined" ? window.innerHeight / 2 - TARGET_H / 2 : 0;

  // 공유하기 핸들러
  const handleShare = () => {
    const shareUrl = `${window.location.origin}/tarot`;
    if (navigator.share) {
      navigator
        .share({
          title: "타로 카드 뽑기",
          text: "타로 카드 뽑기 페이지를 공유해요!",
          url: shareUrl,
        })
        .catch(() => {});
    } else {
      alert("이 브라우저에서는 공유 기능이 지원되지 않습니다.");
    }
  };

  return (
    <div className="bg-[#f3c9e4] min-h-screen w-full flex flex-col items-center">
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

      {/* 안내 문구 */}
      <div className="w-full max-w-[375px] flex flex-col items-center mt-16 mb-16">
        <div className="text-[#090909] text-[28px] font-bold font-['Pretendard'] text-center leading-[40px]">
          <p className="mb-0">고민에 집중하면서</p>
          <p>한 장의 카드를 뽑아주세요</p>
        </div>
      </div>

      {/* 카드 그리드 */}
      <div className="w-full max-w-[375px] grid grid-cols-5 grid-rows-4 gap-2 px-5 mb-10">
        {shuffledCards.map((img, i) => (
          <div key={i} className="w-[60px] h-[85px] perspective-[600px]">
            <button
              className="w-full h-full p-0 m-0 flex items-center justify-center overflow-visible bg-transparent border-none cursor-pointer"
              style={{ boxShadow: "none", border: "none" }}
              onClick={() => handleCardClick(i)}
              disabled={flipped[i] || !!expandingCard}
            >
              <div
                className={`relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] ${flipped[i] ? "rotate-y-180" : ""}`}
              >
                {/* 뒷면 */}
                <img
                  src="/CardBack.png"
                  alt="카드 뒷면"
                  className="w-full h-full object-cover absolute top-0 left-0 [backface-visibility:hidden]"
                />
                {/* 앞면 */}
                <img
                  ref={(el) => {
                    cardFrontImgRefs.current[i] = el;
                  }}
                  src={`/cards/${img}`}
                  alt={img.replace(/\.png$/, "")}
                  className="w-full h-full object-cover absolute top-0 left-0 [backface-visibility:hidden] rotate-y-180"
                />
              </div>
            </button>
          </div>
        ))}
      </div>

      {/* 확대 오버레이 */}
      {expandingCard && (
        <>
          {/* 배경 딤 */}
          <div
            className="fixed inset-0 z-40"
            style={{
              background: "rgba(243,201,228,0)",
              transition: "background 0.5s",
              ...(expanded ? { background: "rgba(243,201,228,0.85)" } : {}),
            }}
          />
          {/* 확대되는 카드 이미지 */}
          <img
            src={expandingCard.img}
            alt="선택 카드"
            style={{
              position: "fixed",
              zIndex: 50,
              borderRadius: 16,
              boxShadow: "0 8px 40px 0 rgba(0,0,0,0.18)",
              // 시작: 원래 카드 위치/크기
              left: expanded ? targetLeft : expandingCard.fromLeft,
              top: expanded ? targetTop : expandingCard.fromTop,
              width: expanded ? TARGET_W : expandingCard.fromW,
              height: expanded ? TARGET_H : expandingCard.fromH,
              transition:
                "left 0.5s cubic-bezier(.4,1.1,.4,1), top 0.5s cubic-bezier(.4,1.1,.4,1), width 0.5s cubic-bezier(.4,1.1,.4,1), height 0.5s cubic-bezier(.4,1.1,.4,1)",
              objectFit: "cover",
            }}
          />
        </>
      )}
    </div>
  );
}

export default TarotSelection;
