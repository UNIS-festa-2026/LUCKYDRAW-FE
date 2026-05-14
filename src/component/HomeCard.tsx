import { Link } from "react-router-dom";

export default function HomeCard() {
  return (
    <div className="relative w-full aspect-[5/6] overflow-hidden rounded-[20px] border-2 border-pink-200 bg-red-50">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[17.5%] top-[36.5%] w-16 h-44 bg-gradient-to-b from-orange-50/30 to-pink-200/30" />
      </div>

      <svg
        className="relative z-10 block h-full w-full"
        viewBox="0 0 343 405"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="홈카드"
        role="img"
      >
        <image
          href="/HomeCard.svg"
          width="343"
          height="405"
          preserveAspectRatio="none"
        />

        <foreignObject x="26" y="334" width="290" height="50">
          <Link
            to="/pay"
            className="block h-full w-full cursor-pointer rounded-[25px] bg-transparent focus:outline-none"
            aria-label="응모하기"
          />
        </foreignObject>
      </svg>
    </div>
  );
}
