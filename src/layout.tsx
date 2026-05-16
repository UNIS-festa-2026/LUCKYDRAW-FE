import type { ReactNode } from "react";
import { useState, useEffect } from "react";

type LayoutProps = {
  children?: ReactNode;
  hideFooter?: boolean;
};

export default function Layout({ children, hideFooter = false }: LayoutProps) {
  const [currentAd, setCurrentAd] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAd(Math.floor(Math.random() * 7) + 1);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="layout-frame relative flex min-h-screen flex-col justify-between">
      <div className="flex flex-col">
        <img src={`ad${currentAd}.png`} className="w-full bg-[#090909]" />
        <div className="layout-children p-2">{children}</div>
      </div>

      {!hideFooter && (
        <div className="w-full h-8 inline-flex justify-center items-center gap-0.5">
          <img className="size-5" src="unis.png" />
          <div className="justify-start text-neutral-950 text-sm font-medium font-['Pretendard'] leading-5">
            UNIS 중앙실전 IT창업학회
          </div>
        </div>
      )}
    </div>
  );
}
