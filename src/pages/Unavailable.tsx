import Layout from "../layout";

export default function Unavailable() {
  return (
    <Layout>
      <div className="relative mx-auto h-[703px] w-full max-w-96 overflow-hidden bg-yellow-50">
        <div className="absolute left-1/2 top-[123px] z-20 w-[263px] -translate-x-1/2">
          <img src="/sorryuni.svg" alt="쏘리 유니" className="w-full" />
        </div>

        <div className="absolute left-1/2 top-[213px] z-10 w-[335px] -translate-x-1/2">
          <img
            src="/unavailable.svg"
            alt="운영 시간 안내 카드"
            className="w-full"
          />
        </div>

        <div className="absolute left-0 top-[536px] flex w-full items-center justify-center px-5">
          <button
            type="button"
            className="flex h-12 flex-1 items-center justify-center rounded-[100px] border-[1.5px] border-pink-200 bg-pink-200 px-2.5"
          >
            <span className="text-base font-medium leading-6 text-neutral-950">
              오늘의 운세 보기
            </span>
          </button>
        </div>
      </div>
    </Layout>
  );
}
