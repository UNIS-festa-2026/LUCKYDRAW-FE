type ReviewCardVariant = "pink" | "yellow";

type ReviewCardProps = {
  name: string;
  comment: string;
  variant?: ReviewCardVariant;
};

const variantClassName: Record<ReviewCardVariant, string> = {
  pink: "bg-red-50 border-pink-200",
  yellow: "bg-yellow-50 border-amber-200",
};

export default function ReviewCard({
  name,
  comment,
  variant = "pink",
}: ReviewCardProps) {
  return (
    <div className="relative h-20 w-44 shrink-0">
      <div
        className={`w-44 h-20 left-0 top-0 absolute rounded-2xl border-[1.50px] ${variantClassName[variant]}`}
      ></div>
      <div className="left-[20px] top-[46px] absolute justify-start text-neutral-950 text-xs font-medium font-['Pretendard'] leading-4">
        {comment}
      </div>
      <div
        data-style="Avatar"
        className="absolute left-[20px] top-[14px] flex size-6 items-center justify-center overflow-hidden rounded-[100px] bg-white"
      >
        <img src="Avatar.png" className="size-4" />
      </div>
      <div className="left-[52px] top-[17.50px] absolute justify-start text-neutral-950 text-xs font-medium font-['Pretendard'] leading-4">
        {name}
      </div>
    </div>
  );
}
