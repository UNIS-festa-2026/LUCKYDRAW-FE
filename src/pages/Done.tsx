import { useNavigate } from "react-router-dom";

export default function Done() {
  const navigate = useNavigate();

  // 공유하기 핸들러
  const handleShare = () => {
    const shareUrl = window.location.origin + "/";
    if (navigator.share) {
      navigator
        .share({
          title: "럭키드로우 신청 완료!",
          text: "럭키드로우 이벤트에 참여해보세요!",
          url: shareUrl,
        })
        .catch(() => {});
    } else {
      alert("이 브라우저에서는 공유 기능이 지원되지 않습니다.");
    }
  };

  return (
    <div className="relative mx-auto h-[783px] w-full max-w-96 overflow-hidden">
      <div className="absolute left-0 top-[616px] inline-flex w-96 flex-col items-center justify-start gap-4">
        <div className="flex w-full flex-col items-center justify-start gap-3">
          <div className="inline-flex w-full items-center justify-start gap-3 px-5">
            <button
              type="button"
              className="flex h-12 flex-1 items-center justify-center gap-2.5 rounded-[100px] bg-white/50 p-2.5 outline outline-[1.5px] outline-offset-[-1.5px] outline-pink-300/60"
              onClick={handleShare}
            >
              <div className="text-center text-base font-medium leading-6 text-neutral-950">
                친구한테 공유하기
              </div>
            </button>

            <button
              type="button"
              className="flex h-12 flex-1 items-center justify-center gap-2.5 rounded-[100px] bg-pink-200 p-2.5 outline outline-[1.5px] outline-offset-[-1.5px] outline-pink-200"
              onClick={() => navigate("/tarot")}
            >
              <div className="text-center text-base font-medium leading-6 text-neutral-950">
                오늘의 운세 보기
              </div>
            </button>
          </div>
        </div>

        <div className="text-center text-xs font-medium leading-4 text-neutral-500">
          상품을 받지 못할 시 연락 바랍니다.
          <br />
          010-4550-8535
        </div>
      </div>

      <div className="absolute left-0 top-0 inline-flex h-14 w-full items-center justify-center px-5">
        <div className="flex items-center justify-start gap-1">
          <img className="size-6" src="/unis.png" alt="UNIS 로고" />
          <div className="text-base font-medium leading-6 text-neutral-950">
            UNIS 중앙실전 IT창업학회
          </div>
        </div>
      </div>

      <img
        className="absolute left-1/2 top-[134px] w-[335px] -translate-x-1/2"
        src="/done.svg"
        alt="신청 완료 안내"
      />
    </div>
  );
}
