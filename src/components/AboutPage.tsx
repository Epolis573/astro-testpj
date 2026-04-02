import { useRef } from "react";
import usePageInitAnimation from "../hooks/usePageInitAnimation";

const backgroundImage =
  "https://res.cloudinary.com/dq7ewnq1z/image/upload/v1774864031/twitter_2038172660216279526-crop_wtsm72.gif";

export default function AboutPage() {
  const pageRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  usePageInitAnimation({
    pageRef,
    contentRef,
    direction: "bottom",
  });

  return (
    <div ref={pageRef} className="relative">
      {/* ── Page content ── */}
      <main
        className="relative min-h-screen overflow-hidden bg-black text-white"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div className="absolute inset-0 bg-black/35" />
        <div
          className="absolute inset-y-0 left-0 hidden bg-white/10 backdrop-blur-[10px] sm:block"
          style={{
            width: "min(58vw, 48rem)",
            WebkitBackdropFilter: "blur(10px)",
            maskImage:
              "linear-gradient(to right, black 0%, black 65%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, black 0%, black 65%, transparent 100%)",
          }}
        />
        <div
          className="absolute inset-y-0 left-0 hidden sm:block"
          style={{
            width: "min(58vw, 48rem)",
            background:
              "linear-gradient(to right, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.35) 50%, transparent 100%)",
          }}
        />

        <div className="relative z-10 flex min-h-screen items-center px-8 py-14 sm:px-12 lg:px-20">
          <div ref={contentRef} className="max-w-[36rem] space-y-7">
            {/* ── Subtitle ── */}
            <p
              data-page-init-item
              className="text-sm uppercase tracking-[0.38em] text-white/70"
            >
              About
            </p>

            {/* ── Divider ── */}
            <div data-page-init-divider className="h-px w-24 bg-white/25" />

            {/* ── Body paragraphs ── */}
            <div className="space-y-4">
              <p
                data-page-init-item
                className="max-w-[34rem] text-sm leading-8 text-white/76 sm:text-base"
              >
                フロントエンド領域のエンジニアとして、動きのある体験やカスタムUIの
                設計・実装を行っています。
              </p>
              <p
                data-page-init-item
                className="max-w-[34rem] text-sm leading-8 text-white/76 sm:text-base"
              >
                このプロジェクトでは、シネマティックなギャラリーのランディングページを
                テーマに、スタッガー演出や全画面トランジション、没入感のある動きを形にしています。
              </p>
              <p
                data-page-init-item
                className="max-w-[34rem] text-sm leading-8 text-white/76 sm:text-base"
              >
                ウェブアニメーションや空気感のあるインタラクション、細部まで磨き込んだ
                UIを探求するのが好きです。
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
