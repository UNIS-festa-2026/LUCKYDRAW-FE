import type { ReactNode } from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

type LayoutProps = {
  children?: ReactNode;
  hideFooter?: boolean;
};

export default function Layout({ children, hideFooter = false }: LayoutProps) {
  const [currentAd, setCurrentAd] = useState(1);
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAd(Math.floor(Math.random() * 7) + 1);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // tarot 페이지면 배경색 #F3C9E4, 아니면 기존대로

  const isTarot = location.pathname.startsWith("/tarot");
  const bgStyle = isTarot ? { backgroundColor: "#F3C9E4" } : {};
  const shouldHideFooter = hideFooter || isTarot;

  return (
    <div
      className="layout-frame relative flex min-h-screen flex-col justify-between"
      style={bgStyle}
    >
      <div className="flex flex-col">
        <img src={`ad${currentAd}.png`} className="w-full bg-[#090909]" />
        <div className="layout-children p-2">{children}</div>
      </div>

      {!shouldHideFooter && (
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
