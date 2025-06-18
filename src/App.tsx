// import React from "react";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./App.css";

function App() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;
    video.addEventListener("loadedmetadata", () => {
      // 動画再生時間スクロール連動
      gsap.to(video, {
        currentTime: video.duration,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "bottom bottom",
          scrub: .5,
          markers: true,
        },
      });

    const tl = gsap.timeline({
            scrollTrigger: {
              trigger: container,
              start: "top top",
              end: "+=800",
              scrub: true,
              markers: true,
            },
          });

      tl.from(".first-text", { y: 30, opacity: 0, duration: 0.5 })
        .from(".second-text", { y: 30, opacity: 0, duration: 0.5 })
        .from(".third-text", { y: 30, opacity: 0, duration: 0.5 });
    });
     return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [videoRef, containerRef]);

  return (
    <>
      <div className="container w-full h-[2000vh] box-border overflow-x-hidden text-white" ref={containerRef}>
        <video
          ref={videoRef}
          src="/video/prom_video.mp4"
          muted
          playsInline
          preload="auto"
          className="fixed t-0 l-0 w-[100vw] h-[100vh] object-cover z-[-1]"
        ></video>
        <h2 className="text-[128px]">SAMPLE SPEAKER</h2>
          <p className="first-text text-[64px] text">This is first text.</p>
          <p className="second-text text-[64px] text">This is second text.</p>
          <p className="third-text text-[64px] text">This is third text.</p>
      </div>
    </>
  );
}

export default App;
