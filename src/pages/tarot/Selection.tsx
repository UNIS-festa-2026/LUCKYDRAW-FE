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

function shuffle(array: string[]) {
  const arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
function TarotSelection() {
  const navigate = useNavigate();
  // 카드 앞/뒷면 상태 관리
  const [flipped, setFlipped] = useState(Array(20).fill(false));
  // 카드 이미지 랜덤 섞기 (최초 렌더링 시 고정)
  const shuffledCards = useMemo(() => shuffle(cardImages), []);
  // 각 카드의 ref 저장
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleCardClick = (idx: number) => {
    if (flipped[idx]) return;
    setFlipped((prev) => prev.map((f, i) => (i === idx ? true : f)));
    const cardId = shuffledCards[idx].split('_')[0];
    // 카드 DOM 위치/크기 측정
    const btn = cardRefs.current[idx];
    let rect: DOMRect | undefined;
    if (btn) {
      rect = btn.getBoundingClientRect();
    }
    setTimeout(() => {
      navigate(`/tarot/description/${cardId}`, {
        state: {
          fromRect: rect,
          img: `/cards/${shuffledCards[idx]}`,
        },
      });
    }, 600);
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
        <img src={imgOpenInNew} alt="open in new" className="w-6 h-6" />
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
              ref={el => (cardRefs.current[i] = el)}
              className="w-full h-full p-0 m-0 flex items-center justify-center overflow-visible bg-transparent border-none cursor-pointer"
              style={{ boxShadow: "none", border: "none" }}
              onClick={() => handleCardClick(i)}
              disabled={flipped[i]}
            >
              <div
                className={`relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] ${flipped[i] ? "rotate-y-180" : ""}`}
              >
                {/* 카드 뒷면 */}
                <img
                  src="/CardBack.png"
                  alt="카드 뒷면"
                  className="w-full h-full object-cover absolute top-0 left-0 [backface-visibility:hidden]"
                />
                {/* 카드 앞면 */}
                <img
                  src={`/cards/${img}`}
                  alt={img.replace(/\.png$/, "")}
                  className="w-full h-full object-cover absolute top-0 left-0 [backface-visibility:hidden] rotate-y-180"
                />
              </div>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TarotSelection;
