import Layout from "../layout";

export default function Unavailable() {
  return (
    <Layout>
      <div className="mt-20 flex w-full justify-center mb-[223px]">
        <div className="flex flex-col items-center gap-6">
          <div className="flex w-full justify-center">
            <img src="/sorryuni.svg" alt="쏘리 유니" className="w-[263px]" />
          </div>

          <div className="flex w-full justify-center">
            <img
              src="/unavailable.svg"
              alt="운영 시간 안내 카드"
              className="w-[335px]"
            />
          </div>

          <button
            type="button"
            className="inline-flex h-12 w-80 items-center justify-center rounded-[100px] border-2 border-pink-200 bg-pink-200 p-2.5"
          >
            <span className="text-xl font-bold leading-8 text-neutral-950">
              오늘의 운세 보기
            </span>
          </button>
        </div>
      </div>
    </Layout>
  );
}
