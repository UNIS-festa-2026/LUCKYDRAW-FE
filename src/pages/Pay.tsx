import Button from "../component/Button";
import Layout from "../layout";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Pay() {
  const navigate = useNavigate();
  const accountNumber = "카카오뱅크 3333-28-4110761";
  const [showToast, setShowToast] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleCopyAccount = async () => {
    await navigator.clipboard.writeText(accountNumber);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const handlePaymentComplete = async () => {
    setIsLoading(true);
    navigate("/loading");

    try {
      const apiUrl = import.meta.env.VITE_API_BASE_URL;
      const sessionId = crypto.randomUUID();

      const response = await fetch(`${apiUrl}/api/luckydraw/entries`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          payment_method: "BANK_TRANSFER",
          amount: 990,
          depositor_name: "홍길동",
          session_id: sessionId,
        }),
      });

      const data = await response.json();

      // 응답에 따라 페이지 이동
      if (data.result === "LOSE") {
        navigate("/kwang", { state: data });
      } else if (data.result === "WIN") {
        navigate("/draw", { state: data });
      }
    } catch (error) {
      console.error("Payment failed:", error);
      setIsLoading(false);
      // 에러 처리 (선택사항)
    }
  };

  return (
    <Layout>
      {showToast && (
        <div className="fixed left-1/2 top-28 z-30 -translate-x-1/2 px-5">
          <div className="min-w-52 p-2.5 bg-white/70 rounded-[100px] outline outline-1 outline-offset-[-1px] outline-white backdrop-blur-xs inline-flex justify-center items-center gap-2.5">
            <div className="justify-start text-neutral-950 text-base font-medium font-['Pretendard'] leading-6">
              계좌번호가 복사되었습니다.
            </div>
          </div>
        </div>
      )}
      <div className="mt-20 flex w-full justify-center mb-[223px]">
        <div className="flex flex-col items-center gap-9">
          <div className="flex w-full flex-col gap-2.5">
            <div className="self-stretch text-center justify-start text-neutral-950 text-3xl font-bold leading-10">
              단 990원의 행운!
            </div>
            <div className="self-stretch text-center justify-start text-neutral-950/80 text-base font-medium leading-6">
              990원 송금 후 완료 버튼을 누르면 바로 <br />
              당첨 결과를 확인할 수 있어요
            </div>
          </div>

          <div className="flex w-full flex-col items-center gap-3">
            <div className="inline-flex w-full items-center justify-center gap-4 rounded-2xl bg-white px-4 py-2 outline outline-[1.50px] outline-offset-[-1.50px] outline-pink-200">
              <div className="justify-start text-neutral-950 text-xl font-medium font-['Pretendard'] leading-10">
                {accountNumber}
              </div>
              <button
                type="button"
                onClick={handleCopyAccount}
                className="flex size-5 items-center justify-center"
                aria-label="계좌번호 복사"
              >
                <img src="copy.png" className="size-5" alt="" />
              </button>
            </div>
            <div className="self-stretch text-center justify-start text-neutral-500 text-base font-medium leading-6">
              받는 이 : 홍휘민
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col items-center gap-3">
        <Button onClick={handlePaymentComplete} />
        <div className="justify-start text-neutral-500 text-xs font-medium font-['Pretendard'] leading-4">
          * 이벤트 특성 상 환불이 불가합니다
          <br />* 당첨 시 송금을 확인할 예정입니다
        </div>
      </div>
    </Layout>
  );
}
