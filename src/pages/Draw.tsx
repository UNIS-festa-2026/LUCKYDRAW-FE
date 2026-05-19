import { useState, type ChangeEvent } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { prizeNameToImageFile } from "../utils/prizeImage";

export default function Draw() {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    review: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      // entryId는 location.state에서 받아옴
      const entryId = location.state?.entry_id;
      if (!entryId) {
        alert("entry_id가 없습니다. 다시 시도해 주세요.");
        return;
      }
      const apiUrl = import.meta.env.VITE_API_BASE_URL;
      const response = await fetch(
        `${apiUrl}/api/lucky-draw/entries/${entryId}/winner-info`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );
      if (!response.ok) {
        throw new Error("서버 오류");
      }
      navigate("/done");
    } catch (e) {
      alert("정보 제출에 실패했습니다. 다시 시도해 주세요.");
    }
  };

  // 상품명 및 이미지 처리
  const prizeName = location.state?.prize?.name;
  const prizeImgSrc = prizeName
    ? prizeNameToImageFile(prizeName)
    : "/sb5000.png";
  const prizeAlt = prizeName || "스타벅스 5000원 쿠폰";

  return (
    <div className="relative mx-auto h-[783px] w-full max-w-[375px] overflow-hidden bg-[#F9F7E8]">
      <div className="absolute left-0 top-0 inline-flex h-14 w-full items-center justify-center px-5">
        <div className="inline-flex items-center justify-start gap-1">
          <img className="size-6" src="/unis.png" alt="UNIS 로고" />
          <div className="text-base font-medium leading-6 text-neutral-950">
            UNIS 중앙실전 IT창업학회
          </div>
        </div>
      </div>

      <div className="absolute left-0 top-24 inline-flex w-full flex-col items-center justify-start gap-6">
        <div className="text-center text-[40px] font-bold leading-10 text-neutral-950">
          당첨!!
        </div>

        <div className="relative h-[181px] w-[335px]">
          <img
            src={prizeImgSrc}
            alt={prizeAlt}
            className="h-full w-full object-contain"
          />
        </div>

        <div className="flex w-full flex-col items-start justify-start gap-5 px-5">
          <div className="flex w-full flex-col items-start justify-start gap-0.5">
            <div className="w-full text-xl font-bold leading-[34px] text-neutral-950">
              선물 배달을 위한 마지막 단계!
            </div>
            <div className="w-full text-xs font-medium leading-4 text-neutral-500">
              입력하신 정보를 통해 상품을 전달드립니다!
            </div>
          </div>

          <div className="flex w-full flex-col items-end justify-start gap-5">
            <div className="flex w-full flex-col items-start justify-start gap-5">
              <div className="inline-flex w-full items-center justify-start gap-8">
                <div className="min-w-[80px] text-base font-medium leading-6 text-neutral-950">
                  이름 <span className="text-red-500">*</span>
                </div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="이화벗"
                  className="min-w-0 flex-1 rounded-lg border border-zinc-100 bg-white px-3 py-3 text-xs font-medium leading-4 text-neutral-950 placeholder-neutral-600 focus:outline-none focus:ring-0 focus:border-zinc-100"
                />
              </div>

              <div className="inline-flex w-full items-center justify-start gap-8">
                <div className="min-w-[80px] text-base font-medium leading-6 text-neutral-950">
                  전화번호 <span className="text-red-500">*</span>
                </div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="010-0000-0000"
                  className="min-w-0 flex-1 rounded-lg border border-zinc-100 bg-white px-3 py-3 text-xs font-medium leading-4 text-neutral-950 placeholder-neutral-950 focus:outline-none focus:ring-0 focus:border-zinc-100"
                />
              </div>

              <div className="inline-flex w-full items-center justify-start gap-8">
                <div className="text-base font-medium leading-6 text-neutral-950">
                  한 줄 후기 <span className="text-red-500">*</span>
                </div>
                <input
                  type="text"
                  name="review"
                  value={formData.review}
                  onChange={handleChange}
                  placeholder="한 줄 후기를 작성해주세요."
                  className="min-w-0 flex-1 rounded-lg border border-zinc-100 bg-white px-3 py-3 text-xs font-medium leading-4 text-neutral-950 placeholder-neutral-950 focus:outline-none focus:ring-0 focus:border-zinc-100"
                />
              </div>
            </div>

            <div className="flex flex-col items-end gap-0 mt-1">
              <div className="text-xs font-medium text-red-500">
                * 필수 입력 항목입니다
              </div>
              <button
                type="button"
                onClick={handleSubmit}
                className="mt-5 inline-flex items-center justify-center gap-2.5 rounded-[50px] bg-pink-200 px-4 py-1"
              >
                <div className="text-center text-base font-medium leading-6 text-neutral-950">
                  입력 완료
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute left-0 top-[755px] inline-flex w-full flex-col items-start justify-start">
        <div className="flex w-full flex-col items-center justify-start">
          <div className="w-full text-center text-xs font-medium leading-4 text-neutral-500">
            새로고침 시 다시 접근이 어려울 수 있어요.
          </div>
        </div>
      </div>
    </div>
  );
}
