import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../layout";
import HomeCard from "../component/HomeCard";
import ReviewCard from "../component/ReviewCard";

const mockReviews = [
  {
    id: 1,
    name: "김*민 벗",
    reward: "스타벅스",
    comment: "와 저 진짜 당첨됐어요!!!",
    variant: "pink" as const,
  },
  {
    id: 2,
    name: "이*현 벗",
    reward: "치킨",
    comment: "990원으로 치킨 받아서 개이득",
    variant: "yellow" as const,
  },
  {
    id: 3,
    name: "이*현 벗",
    reward: "치킨",
    comment: "990원으로 치킨 받아서 개이득",
    variant: "pink" as const,
  },
];

export default function Home() {
  const navigate = useNavigate();
  const [showChanceNotice, setShowChanceNotice] = useState(true);
  const [isChanceNoticeClosing, setIsChanceNoticeClosing] = useState(false);
  const [popupText, setPopupText] = useState("100% 당첨 90명 남음!");

  useEffect(() => {
    const fetchHomeStatus = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_BASE_URL;
        const response = await fetch(`${apiUrl}/api/lucky-draw/home-status`);
        const data = await response.json();

        // popup_text 업데이트
        if (data.popup_text) {
          setPopupText(data.popup_text);
        }

        // server_time 기반 시간 확인 (9시 ~ 20시)
        if (data.server_time) {
          const serverTime = new Date(data.server_time);
          const hour = serverTime.getHours();

          if (hour < 9 || hour >= 20) {
            navigate("/unavailable");
            return;
          }
        }
      } catch (error) {
        console.error("Failed to fetch home status:", error);
      }
    };

    fetchHomeStatus();
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
        작년에 400개 이상의 상품이 준비되어있다고..?
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
              {mockReviews.map((review) => (
                <ReviewCard
                  key={review.id}
                  name={review.name}
                  reward={review.reward}
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
