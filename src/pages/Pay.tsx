import Button from "../component/Button";
import Layout from "../layout";

export default function Pay() {
  const accountNumber = "카카오뱅크 3333-28-4110761";

  const handleCopyAccount = async () => {
    await navigator.clipboard.writeText(accountNumber);
  };

  return (
    <Layout>
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
        <Button to="/loading" />
        <div className="justify-start text-neutral-500 text-xs font-medium font-['Pretendard'] leading-4">
          * 이벤트 특성 상 환불이 불가합니다
          <br />* 당첨 시 송금을 확인할 예정입니다
        </div>
      </div>
    </Layout>
  );
}
