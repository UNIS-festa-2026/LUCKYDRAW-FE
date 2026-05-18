import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../layout";

type LoadingStep = {
  shapeSrc: string;
  shapeClassName: string;
  shapeInsetClassName: string;
  glowLeftA: string;
  glowLeftB: string;
  glowSize: string;
  glowColor: string;
};

const loadingSteps: LoadingStep[] = [
  {
    shapeSrc: "/step=1.svg",
    shapeClassName: "left-[62px] top-[11px] size-[45px]",
    shapeInsetClassName: "inset-[-25%]",
    glowLeftA: "50%",
    glowLeftB: "50%",
    glowSize: "30.6px",
    glowColor: "#a3e635",
  },
  {
    shapeSrc: "/step=2.svg",
    shapeClassName: "left-[34px] top-[11px] h-[45px] w-[102px]",
    shapeInsetClassName: "inset-[-12.5%_-5.56%]",
    glowLeftA: "calc(50% - 19px)",
    glowLeftB: "calc(50% + 21px)",
    glowSize: "25.5px",
    glowColor: "#facc15",
  },
  {
    shapeSrc: "/step=3.svg",
    shapeClassName: "left-[25px] top-[11px] h-[45px] w-[119px]",
    shapeInsetClassName: "inset-[-25%_-9.52%]",
    glowLeftA: "calc(50% - 28px)",
    glowLeftB: "calc(50% + 26px)",
    glowSize: "22.7px",
    glowColor: "#fb923c",
  },
  {
    shapeSrc: "/step=4.svg",
    shapeClassName: "left-[6px] top-[11px] h-[45px] w-[159px]",
    shapeInsetClassName: "inset-[-25%_-7.14%]",
    glowLeftA: "calc(50% - 60px)",
    glowLeftB: "calc(50% + 61px)",
    glowSize: "17px",
    glowColor: "#f87171",
  },
  {
    shapeSrc: "/step=5.svg",
    shapeClassName: "left-[25px] top-[11px] h-[45px] w-[119px]",
    shapeInsetClassName: "inset-[-25%_-9.52%]",
    glowLeftA: "calc(50% - 28px)",
    glowLeftB: "calc(50% + 26px)",
    glowSize: "22.7px",
    glowColor: "#fb923c",
  },
  {
    shapeSrc: "/step=6.svg",
    shapeClassName: "left-[34px] top-[11px] h-[45px] w-[102px]",
    shapeInsetClassName: "inset-[-12.5%_-5.56%]",
    glowLeftA: "calc(50% - 19px)",
    glowLeftB: "calc(50% + 21px)",
    glowSize: "25.5px",
    glowColor: "#facc15",
  },
  {
    shapeSrc: "/step=7.svg",
    shapeClassName: "left-[62px] top-[11px] size-[45px]",
    shapeInsetClassName: "inset-[-12.5%]",
    glowLeftA: "calc(50% - 1px)",
    glowLeftB: "calc(50% - 1px)",
    glowSize: "30.6px",
    glowColor: "#a3e635",
  },
];

export default function Loading() {
  const navigate = useNavigate();
  const [stepIndex, setStepIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);

  useEffect(() => {
    const redirect = window.setTimeout(() => navigate("/draw"), 3000);
    return () => window.clearTimeout(redirect);
  }, [navigate]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setStepIndex((cur) => {
        setPrevIndex(cur);
        return cur === loadingSteps.length - 1 ? 0 : cur + 1;
      });
    }, 200);

    return () => {
      window.clearInterval(timer);
    };
  }, []);

  const currentStep = loadingSteps[stepIndex];
  const prevStep = prevIndex !== null ? loadingSteps[prevIndex] : null;

  return (
    <Layout>
      <div className="mt-[176px] flex w-full flex-col items-center">
        <div className="flex w-full justify-center text-center text-neutral-950 text-3xl font-bold leading-10">
          과연 결과는?
        </div>

        <div className="loading-indicator relative mt-20 h-[68px] w-[170px] overflow-hidden bg-[#f9f7e8]">
          <div
            className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[12px] blur-[1px]"
            style={{
              left: currentStep.glowLeftA,
              width: currentStep.glowSize,
              height: currentStep.glowSize,
              background: currentStep.glowColor,
              transition:
                "left 180ms ease, width 180ms ease, height 180ms ease, background 180ms ease",
            }}
          />
          <div
            className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[12px] blur-[1px]"
            style={{
              left: currentStep.glowLeftB,
              width: currentStep.glowSize,
              height: currentStep.glowSize,
              background: currentStep.glowColor,
              transition:
                "left 180ms ease, width 180ms ease, height 180ms ease, background 180ms ease",
            }}
          />
          {/* 이전 step: fade-out */}
          {prevStep && (
            <div
              className={`absolute ${prevStep.shapeClassName}`}
              style={{
                opacity: 0,
                transition:
                  "opacity 180ms ease, left 180ms ease, width 180ms ease",
              }}
            >
              <div className={`absolute ${prevStep.shapeInsetClassName}`}>
                <img
                  alt=""
                  className="block size-full max-w-none"
                  src={prevStep.shapeSrc}
                  style={{ background: "transparent" }}
                />
              </div>
            </div>
          )}
          {/* 현재 step: fade-in */}
          <div
            className={`absolute ${currentStep.shapeClassName}`}
            style={{
              opacity: 1,
              transition:
                "opacity 180ms ease, left 180ms ease, width 180ms ease",
            }}
          >
            <div className={`absolute ${currentStep.shapeInsetClassName}`}>
              <img
                alt=""
                className="block size-full max-w-none"
                src={currentStep.shapeSrc}
                style={{ background: "transparent" }}
              />
            </div>
          </div>
          {/* PNG 투명도 문제 해결: 불필요한 blend 배경 제거 */}
        </div>
      </div>
    </Layout>
  );
}
