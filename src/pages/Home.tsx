import { useEffect, useState } from "react";

type Review = {
  masked_name: string;
  review: string;
};
import { useNavigate } from "react-router-dom";
import Layout from "../layout";
import HomeCard from "../component/HomeCard";
import ReviewCard from "../component/ReviewCard";

// 서버에서 받아온 후기 리스트 상태
const initialReviews = [
  {
    id: 1,
    name: "김*민 벗",
    comment: "와 저 진짜 당첨됐어요!!!",
    variant: "pink" as const,
  },
  {
    id: 2,
    name: "이*서 벗",
    comment: "우와 맛있게 먹을게요~",
    variant: "yellow" as const,
  },
];

export default function Home() {
  const navigate = useNavigate();
  const [showChanceNotice, setShowChanceNotice] = useState(true);
  const [isChanceNoticeClosing, setIsChanceNoticeClosing] = useState(false);
  const [popupText, setPopupText] = useState("100% 당첨 90명 남음!");
  const [dynamicReviews, setDynamicReviews] = useState(initialReviews);

  useEffect(() => {
    const fetchHome = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_BASE_URL;
        const response = await fetch(`${apiUrl}/api/lucky-draw/home`);
        const data = await response.json();

        // 남은 인원 텍스트
        if (typeof data.remaining_winner_slots === "number") {
          setPopupText(`100% 당첨 ${data.remaining_winner_slots}명 남음!`);
        }

        // 후기 리스트
        if (Array.isArray(data.reviews)) {
          setDynamicReviews(
            data.reviews.map((r: Review, idx: number) => ({
              id: idx + 1,
              name: r.masked_name + " 벗",
              comment: r.review,
              variant: idx % 2 === 0 ? "pink" : "yellow",
            })),
          );
        }

        // is_open 값에 따라 라우팅
        if (data.is_open === true) {
          // 이미 홈(/)이면 이동하지 않음
          if (window.location.pathname !== "/") {
            navigate("/");
          }
        } else {
          navigate("/unavailable");
          return;
        }
      } catch (error) {
        console.error("Failed to fetch home:", error);
      }
    };

    fetchHome();
  }, [navigate]);

  useEffect(() => {
    const closeTimer = window.setTimeout(() => {
      setIsChanceNoticeClosing(true);
    }, 4400);

    const removeTimer = window.setTimeout(() => {
      setShowChanceNotice(false);
    }, 5000);

    return () => {
      window.clearTimeout(closeTimer);
      window.clearTimeout(removeTimer);
    };
  }, []);

  return (
    <Layout>
      {showChanceNotice && (
        <div className="pointer-events-none fixed left-1/2 top-28 z-30 -translate-x-1/2 px-5">
          <div
            className={`min-w-56 inline-flex items-center justify-center gap-2.5 rounded-[100px] bg-white/70 p-2.5 outline outline-1 outline-offset-[-1px] outline-white backdrop-blur-xs transition-all duration-700 ${
              isChanceNoticeClosing
                ? "translate-y-1 scale-95 opacity-0"
                : "translate-y-0 scale-100 opacity-100"
            }`}
          >
            <div className="justify-start text-base font-medium leading-6 text-neutral-950">
              {popupText}
            </div>
          </div>
        </div>
      )}

      <div className="w-full justify-start text-[#090909] text-3xl font-bold leading-10">
        단돈 990원으로 <br />
        상품타자!
      </div>
      <div className="self-stretch justify-start text-[#777777] text-base font-medium leading-6">
        400개 이상의 상품이 준비되어있다고..?
      </div>
      <div className="w-full">
        <div className="h-3" />
        <HomeCard />
        <div className="h-7" />
        <div className="flex flex-col gap-2">
          <div className="justify-start text-black text-base font-medium leading-6">
            벗들의 진실된 후기
          </div>
          <div className="w-full overflow-x-auto">
            <div className="flex w-max flex-row gap-2 pb-1">
              {dynamicReviews.map((review) => (
                <ReviewCard
                  key={review.id}
                  name={review.name}
                  comment={review.comment}
                  variant={review.variant}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
