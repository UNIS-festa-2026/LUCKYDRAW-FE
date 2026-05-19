import { Link } from "react-router-dom";
import Layout from "../../layout";

export default function TarotHome() {
  return (
    <Layout>
      <div className="w-full max-w-[384px] mx-auto relative bg-tarot overflow-hidden flex flex-col items-center pt-8 pb-[80px]">
        {/* 상단 텍스트 */}
        <div className="flex flex-col items-center gap-3 w-full">
          <div className="text-center text-neutral-950 text-4xl font-bold leading-10 font-['Pretendard']">
            유니콘의 예언
          </div>
          <div className="text-center text-neutral-950 text-xl font-medium leading-10 font-['Pretendard']">
            유니콘이 벗의 특별한 오늘을 알고 있대!
          </div>
        </div>
        {/* 유니콘 이미지 + 로고: 20px 간격 */}
        <div className="flex flex-col items-center gap-[20px] w-full mt-8">
          <img className="w-64 h-72" src="TarotHome.svg" alt="타로 유니콘" />
          <div className="w-full inline-flex justify-center items-center gap-0.5">
            <img className="size-6" src="unis.png" alt="UNIS 로고" />
            <div className="text-neutral-950 text-base font-medium leading-6">
              UNIS 중앙실전 IT창업학회
            </div>
          </div>
        </div>

        {/* 하단 버튼: fixed로 하단 25px 고정 */}
        <div
          className="w-full max-w-[384px] px-5 fixed left-1/2"
          style={{ bottom: 25, transform: "translateX(-50%)" }}
        >
          <Link
            to="/tarot/selection"
            className="w-full p-2.5 rounded-2xl outline outline-2 outline-offset-[-2px] outline-neutral-950 flex justify-center items-center gap-2.5"
          >
            <div className="text-center text-neutral-950 text-xl font-bold font-['Pretendard'] leading-8">
              타로 보러가기
            </div>
          </Link>
        </div>
      </div>
    </Layout>
  );
}
