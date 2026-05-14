import { Link } from "react-router-dom";

type ButtonProps = {
  onClick?: () => void;
  to?: string;
};

const buttonClassName =
  "inline-flex h-12 w-80 items-center justify-center gap-2.5 rounded-[100px] bg-pink-200 p-2.5 outline outline-2 outline-offset-[-2px] outline-pink-200";

export default function Button({ onClick, to }: ButtonProps) {
  if (to) {
    return (
      <Link to={to} className={buttonClassName}>
        <div className="text-center justify-start text-neutral-950 text-xl font-bold font-['Pretendard'] leading-8">
          송금 완료
        </div>
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={buttonClassName}>
      <div className="text-center justify-start text-neutral-950 text-xl font-bold font-['Pretendard'] leading-8">
        송금 완료
      </div>
    </button>
  );
}
